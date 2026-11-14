#!/usr/bin/env node
// One-time move from the old file storage (build 66 and earlier) into MongoDB.
//   node tools/import-files.js /path/to/old/data        (MONGODB_URI / MONGODB_DB as for the server)
//   docker compose run --rm -v fr-data:/old backend node tools/import-files.js /old
// Reads reviews.json, leads.jsonl, celebrations.json, celebrations-YYYY.json and gallery.json. Safe to run twice:
// rows that are already in the database (same id) are skipped and content keys already set are left alone.
import fs from 'node:fs';
import path from 'node:path';
import { connectDb, col, closeDb } from '../src/db.js';

const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) { console.error('Usage: node tools/import-files.js <old DATA_DIR>'); process.exit(1); }
const read = (f) => { try { return fs.readFileSync(path.join(dir, f), 'utf8'); } catch { return null; } };
await connectDb();
let n = { reviews: 0, leads: 0, content: 0, skipped: 0 };

const rv = read('reviews.json');
if (rv) for (const r of JSON.parse(rv)) {
  const { id, ...rest } = r;
  if (!id) continue;
  const res = await col('reviews').updateOne({ _id: id }, { $setOnInsert: { ...rest, email: String(rest.email || '').toLowerCase(), date: new Date(rest.date || Date.now()) } }, { upsert: true });
  res.upsertedCount ? n.reviews++ : n.skipped++;
}

const ld = read('leads.jsonl');
if (ld) for (const line of ld.split('\n').filter(Boolean)) {
  let l; try { l = JSON.parse(line); } catch { continue; }
  const { id, ...rest } = l;
  if (!id) continue;
  const res = await col('leads').updateOne({ _id: id }, { $setOnInsert: { status: 'new', ...rest, at: new Date(rest.at || Date.now()) } }, { upsert: true });
  res.upsertedCount ? n.leads++ : n.skipped++;
}

for (const f of fs.readdirSync(dir)) {
  const m = f.match(/^(celebrations(?:-(\d{4}))?|gallery)\.json$/);
  if (!m) continue;
  const key = m[1] === 'gallery' ? 'gallery' : m[2] ? 'celebrations:' + m[2] : 'celebrations';
  const res = await col('content').updateOne({ _id: key }, { $setOnInsert: { data: JSON.parse(read(f)), updated: new Date(), size: 0 } }, { upsert: true });
  res.upsertedCount ? n.content++ : n.skipped++;
}

console.log(`Imported ${n.reviews} reviews, ${n.leads} leads, ${n.content} content items (${n.skipped} already there).`);
await closeDb();
