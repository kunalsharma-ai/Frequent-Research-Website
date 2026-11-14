// Build 78.4: connection keys saved (encrypted) in the database from the admin panel. Run: npm test.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.WORKERS = '0';
process.env.KEYS_SECRET = 'test-keys-secret-0123456789';
delete process.env.ANTHROPIC_API_KEY;
const { connectDb, closeDb, dropDb, col } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { config } = await import('../src/config.js');
const { loadKeys } = await import('../src/lib/keystore.js');
const { makeAdmin } = await import('./helpers.js');
let server, B, sup, viewer;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test784_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  sup = await makeAdmin(B, { email: 'keys.owner@frequentresearch.com', name: 'Owner' });
  viewer = await makeAdmin(B, { email: 'keys.viewer@frequentresearch.com', role: 'viewer' });
});
after(async () => { server.close(); await dropDb(); await closeDb(); });
const put = (h, values) => fetch(B + '/api/v1/admin/integrations/keys', { method: 'PUT', headers: { 'content-type': 'application/json', ...h }, body: JSON.stringify({ values }) });
const fresh = (a) => col('admin_sessions').updateMany({ user: a.id }, { $set: { stepUp: new Date() } });

test('keys: saved encrypted, never shown, win over .env, can be removed', async () => {
  await col('admin_sessions').updateMany({ user: sup.id }, { $unset: { stepUp: 1 } });
  const r0 = await put(sup.headers, { ANTHROPIC_API_KEY: 'sk-ant-test-1234567890abcd' });
  assert.equal(r0.status, 403); assert.equal((await r0.json()).stepUp, true);
  await fresh(sup);
  // a viewer may not
  await fresh(viewer);
  assert.equal((await put(viewer.headers, { AI_MODEL: 'claude-opus-5-5' })).status, 403);
  // bad names and values
  assert.equal((await put(sup.headers, { MONGODB_URI: 'x' })).status, 400);
  assert.equal((await put(sup.headers, { PUBLIC_URL: 'not a url' })).status, 422);
  const r = await put(sup.headers, { ANTHROPIC_API_KEY: 'sk-ant-test-1234567890abcd', MAIL_FROM: 'Frequent Research <hello@frequentresearch.com>' });
  assert.equal(r.status, 200);
  const body = await r.json();
  assert.ok(!JSON.stringify(body).includes('1234567890abcd'), 'the secret never comes back');
  const k = body.keys.find((x) => x.key === 'ANTHROPIC_API_KEY');
  assert.equal(k.source, 'database'); assert.equal(k.hint, '…abcd'); assert.equal(k.value, '');
  assert.equal(body.keys.find((x) => x.key === 'MAIL_FROM').value, 'Frequent Research <hello@frequentresearch.com>');
  // stored encrypted
  const row = await col('settings_keys').findOne({ _id: 'ANTHROPIC_API_KEY' });
  assert.ok(row.box && row.box.ct); assert.ok(!JSON.stringify(row).includes('1234567890abcd'));
  // live at once
  assert.equal(config.ai.key, 'sk-ant-test-1234567890abcd');
  assert.equal(config.mail.from, 'Frequent Research <hello@frequentresearch.com>');
  // the log has names only
  const log = await col('audit').find({ action: 'set-keys' }).toArray();
  assert.ok(log.length && !JSON.stringify(log).includes('1234567890abcd'));
  // a database value wins over .env; removing it falls back to .env
  process.env.AI_MODEL = 'claude-sonnet-5-5';
  await put(sup.headers, { AI_MODEL: 'claude-opus-5-5' });
  assert.equal(config.ai.model, 'claude-opus-5-5');
  await put(sup.headers, { AI_MODEL: null, ANTHROPIC_API_KEY: null });
  assert.equal(config.ai.model, 'claude-sonnet-5-5'); assert.equal(config.ai.key, '');
  delete process.env.AI_MODEL;
  // a different KEYS_SECRET cannot read saved secrets (they show as broken, nothing crashes)
  await put(sup.headers, { SMTP_PASS: 'mailbox-password-xyz' });
  process.env.KEYS_SECRET = 'another-secret';
  await loadKeys();
  assert.equal(config.mail.smtp.pass, '');
  const st = await (await fetch(B + '/api/v1/admin/integrations', { headers: sup.headers })).json();
  assert.equal(st.keys.find((x) => x.key === 'SMTP_PASS').broken, true);
  process.env.KEYS_SECRET = 'test-keys-secret-0123456789';
  await loadKeys();
  assert.equal(config.mail.smtp.pass, 'mailbox-password-xyz');
});

test('every admin can add and remove their own photo', async () => {
  const webp = 'data:image/webp;base64,' + Buffer.concat([Buffer.from('RIFF'), Buffer.alloc(4), Buffer.from('WEBPVP8 '), Buffer.alloc(40)]).toString('base64');
  const send = (h, photo, method = 'PUT') => fetch(B + '/api/v1/admin/account/photo', { method, headers: { 'content-type': 'application/json', ...h }, body: method === 'PUT' ? JSON.stringify({ photo }) : undefined });
  assert.equal((await send(viewer.headers, 'data:text/html;base64,PGgxPg==')).status, 400);
  assert.equal((await send(viewer.headers, 'data:image/png;base64,' + Buffer.from('not a png at all').toString('base64'))).status, 400);
  assert.equal((await send(viewer.headers, 'data:image/webp;base64,' + 'A'.repeat(210000))).status, 413);
  assert.equal((await send(viewer.headers, webp)).status, 200);
  const me = await (await fetch(B + '/api/v1/admin/me', { headers: viewer.headers })).json();
  assert.equal(me.user.photo, webp);
  assert.equal((await send(viewer.headers, null, 'DELETE')).status, 200);
  assert.equal((await (await fetch(B + '/api/v1/admin/me', { headers: viewer.headers })).json()).user.photo, '');
});

test('each admin keeps their own colour palette and theme', async () => {
  const p = (body) => fetch(B + '/api/v1/admin/account/prefs', { method: 'PUT', headers: { 'content-type': 'application/json', ...viewer.headers }, body: JSON.stringify(body) });
  assert.equal((await p({ palette: 'rainbow' })).status, 400);
  assert.equal((await p({ palette: 'sunset', theme: 'dark' })).status, 200);
  const me = await (await fetch(B + '/api/v1/admin/me', { headers: viewer.headers })).json();
  assert.deepEqual(me.user.prefs, { palette: 'sunset', theme: 'dark' });
});

test('API page: system status for admins with Connections view only', async () => {
  const r = await (await fetch(B + '/api/v1/admin/system', { headers: sup.headers })).json();
  assert.equal(r.ok, true); assert.equal(r.db, true); assert.match(r.version, /^\d+\.\d+\.\d+$/); assert.equal(typeof r.counts.leads, 'number');
  assert.equal((await fetch(B + '/api/v1/admin/system', { headers: viewer.headers })).status, 403);
});
