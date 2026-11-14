#!/usr/bin/env node
// Build 78.3: database backup without extra tools (mongodump is better when you have it; see go-live doc 13).
//   npm run backup -- /backups                 writes /backups/fr-YYYY-MM-DD-HHMM/ (one .ejson file per collection,
//                                              uploaded files included) and keeps the newest 14 backups
//   npm run backup -- restore /backups/fr-2026-11-09-0300 --yes
//                                              puts a backup back (replaces what is in the database now)
// Admin sessions are never backed up, so a restored database signs everyone out.
import fs from 'node:fs';
import path from 'node:path';
import { BSON } from 'mongodb';
const { EJSON } = BSON;
import { connectDb, closeDb } from '../src/db.js';

const args = process.argv.slice(2);
const SKIP = new Set(['admin_sessions', 'rate_limits']);
const KEEP = 14;

async function backup(root) {
  const db = await connectDb();
  const stamp = new Date().toISOString().slice(0, 16).replace('T', '-').replace(':', '');
  const dir = path.join(root, 'fr-' + stamp);
  fs.mkdirSync(dir, { recursive: true });
  const names = (await db.listCollections().toArray()).map((c) => c.name).filter((n) => !SKIP.has(n) && !n.startsWith('system.'));
  let total = 0;
  for (const n of names) {
    const out = fs.createWriteStream(path.join(dir, n + '.ejson'));
    let c = 0;
    for await (const doc of db.collection(n).find({})) { out.write(EJSON.stringify(doc, { relaxed: false }) + '\n'); c++; }
    await new Promise((ok) => out.end(ok));
    console.log(n.padEnd(28), c);
    total += c;
  }
  fs.writeFileSync(path.join(dir, 'BACKUP.json'), JSON.stringify({ at: new Date(), collections: names, documents: total }, null, 2));
  const old = fs.readdirSync(root).filter((d) => /^fr-\d{4}-\d\d-\d\d-\d{4}$/.test(d)).sort().reverse().slice(KEEP);
  for (const d of old) fs.rmSync(path.join(root, d), { recursive: true, force: true });
  console.log(`\nBackup written to ${dir} (${total} documents).${old.length ? ` Removed ${old.length} old backup(s).` : ''}`);
}

async function restore(dir) {
  if (!fs.existsSync(path.join(dir, 'BACKUP.json'))) throw new Error('Not a backup folder: ' + dir);
  const db = await connectDb();
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.ejson'))) {
    const n = f.slice(0, -6);
    const docs = fs.readFileSync(path.join(dir, f), 'utf8').split('\n').filter(Boolean).map((l) => EJSON.parse(l, { relaxed: false }));
    await db.collection(n).deleteMany({});
    for (let i = 0; i < docs.length; i += 500) await db.collection(n).insertMany(docs.slice(i, i + 500));
    console.log(n.padEnd(28), docs.length);
  }
  await db.collection('admin_sessions').deleteMany({});
  console.log('\nRestored. Everyone has to sign in again.');
}

let code = 0;
try {
  if (args[0] === 'restore') {
    if (!args[1] || !args.includes('--yes')) { console.log('Usage: npm run backup -- restore <backup folder> --yes'); code = 1; }
    else await restore(args[1]);
  } else if (args[0]) await backup(args[0]);
  else { console.log('Usage: npm run backup -- <folder>   |   npm run backup -- restore <backup folder> --yes'); code = 1; }
} catch (e) { console.error(e.message); code = 1; }
await closeDb().catch(() => {});
process.exit(code);
