#!/usr/bin/env node
// Build 78.3: admin accounts from the server's command line. There is no public sign-up and no default password.
//
//   npm run admin -- create-super-admin --email you@frequentresearch.com --name "Your Name"
//        Makes the first Super Admin and gives a one-time setup link (24 hours): set a strong password, then scan the
//        authenticator code. Refuses once an active Super Admin exists, so it cannot be used to take over the panel.
//   npm run admin -- recover --email someone@frequentresearch.com
//        Lost phone / password / recovery codes: signs the person out everywhere, removes their password and
//        authenticator, and gives a new one-time setup link. Role and page rights stay the same.
//   npm run admin -- list
//        Every admin account with role, status and last sign-in.
//
// In Docker: docker compose exec backend npm run admin -- create-super-admin --email … --name …
// The link is emailed when email is set up; it is always printed here too (only people with server access see it).
import { ObjectId } from 'mongodb';
import { connectDb, col, closeDb } from '../src/db.js';
import { provisionAdmin, sendSetup } from '../src/routes/users.js';
import { config } from '../src/config.js';

const [cmd, ...rest] = process.argv.slice(2);
const opt = {};
for (let i = 0; i < rest.length; i++) if (rest[i].startsWith('--')) opt[rest[i].slice(2)] = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true;

const USAGE = `Usage:
  npm run admin -- create-super-admin --email <official email> --name "<full name>"
  npm run admin -- recover --email <email>
  npm run admin -- list
  npm run admin -- reseal-onboarding     (build 82.1: encrypt onboarding data and documents with the current DATA_KEY)`;

async function main() {
  if (!['create-super-admin', 'recover', 'list', 'reseal-onboarding'].includes(cmd)) { console.log(USAGE); return 1; }
  await connectDb();
  if (cmd === 'reseal-onboarding') return reseal();
  const U = col('admin_users');
  if (cmd === 'list') {
    const rows = await U.find({}).sort({ created: 1 }).toArray();
    if (!rows.length) console.log('No admin accounts yet. Run create-super-admin.');
    for (const u of rows) console.log([u.email.padEnd(38), String(u.role).padEnd(10), String(u.status).padEnd(12), u.mfa && u.mfa.on ? 'MFA on ' : 'no MFA ', u.lastLogin ? new Date(u.lastLogin).toISOString().slice(0, 16) : 'never'].join(' '));
    return 0;
  }
  if (!opt.email || opt.email === true) { console.log(USAGE); return 1; }
  let r;
  if (cmd === 'create-super-admin') {
    const active = await U.countDocuments({ role: 'super', status: 'active' });
    if (active) {
      console.error('An active Super Admin already exists. First setup is closed.\nAsk a Super Admin to invite new people in the admin (Users & roles), or use "recover" for a lost account.');
      return 2;
    }
    const pending = await U.findOne({ email: String(opt.email).toLowerCase() });
    if (pending && pending.role !== 'super') { console.error('That email already has a different admin account.'); return 2; }
    r = await provisionAdmin({ email: opt.email, name: opt.name === true ? '' : opt.name, role: 'super', by: 'server setup', kind: 'setup' });
  } else {
    const u = await U.findOne({ email: String(opt.email).toLowerCase() });
    if (!u) { console.error('No admin account with that email.'); return 2; }
    r = await provisionAdmin({ email: u.email, name: u.name, role: u.role, by: 'server recovery', kind: 'reset' });
  }
  await col('audit').insertOne({ at: new Date(), action: cmd === 'recover' ? 'recover-admin' : 'create-super-admin', target: r.user.email, actor: { email: 'server command line' }, detail: { role: r.user.role } });
  const mail = await sendSetup(r.user, r.token, cmd === 'recover' ? 'reset' : 'setup');
  console.log(`\n${cmd === 'recover' ? 'Access reset' : 'Super Admin created'} for ${r.user.email}.`);
  console.log(mail.sent ? 'The setup link was emailed.' : 'Email is not set up' + (mail.error ? ' (' + mail.error + ')' : '') + ', so give this link to the person directly.');
  console.log(`\nOne-time setup link (expires in ${cmd === 'recover' ? '72' : '24'} hours):\n${r.link}\n`);
  if (!/^https:/.test(config.publicUrl)) console.log('Note: PUBLIC_URL is not an https address. Set it in .env so the link points at the live admin.');
  return 0;
}

// build 82.1: (re)encrypt every onboarding record and document with the current key (DATA_KEY_OLD still opens old ones)
async function reseal() {
  const { vaultOn, vaultSource, openData, sealData, openBytes, sealBytes } = await import('../src/lib/vault.js');
  const { files } = await import('../src/db.js');
  const { readAll } = await import('../src/routes/onboarding.js');
  if (!vaultOn()) { console.log('Set DATA_KEY (or KEYS_SECRET / REVIEW_SECRET) first.'); return 1; }
  let recs = 0, docs = 0;
  for (const r of await col('onboarding').find({}).toArray()) {
    const s = sealData(openData(r.data));
    await col('onboarding').updateOne({ _id: r._id }, { $set: { data: s.data, 'sum.ids': s.ids } }); recs++;
    for (const f of r.files || []) {
      const meta = /^[a-f0-9]{24}$/.test(String(f.id)) ? await col('files.files').findOne({ _id: new ObjectId(String(f.id)) }) : null;
      if (!meta) continue;
      const plain = meta.metadata?.enc ? openBytes(await readAll(meta._id)) : await readAll(meta._id);
      const sealed = sealBytes(plain);
      // replace in place: delete the old chunks, write the new ones under the same id
      await files().delete(meta._id);
      const up2 = files().openUploadStreamWithId(meta._id, meta.filename, { metadata: { ...meta.metadata, enc: sealed.enc, size: plain.length } });
      await new Promise((ok, no) => { up2.on('finish', ok); up2.on('error', no); up2.end(sealed.data); });
      docs++;
    }
  }
  console.log(`Encrypted ${recs} onboarding records and ${docs} documents with the key from ${vaultSource()}.`);
  return 0;
}

let code = 1;
try { code = await main(); } catch (e) { console.error(e.message); }
await closeDb().catch(() => {});
process.exit(code);
