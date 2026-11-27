// Sampforce (sales app) API: keys, pulling leads / contacts / reviews, writing back, and the signed webhook.
// Run: npm test   (needs MongoDB: MONGODB_URI, default mongodb://127.0.0.1:27017; uses a throw-away database)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import crypto from 'node:crypto';

process.env.REVIEW_SECRET = 'test-secret';
const { connectDb, closeDb, dropDb, col } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { config } = await import('../src/config.js');
const { sfWork } = await import('../src/routes/sampforce.js');
const { makeAdmin, code } = await import('./helpers.js');

let server, B, hook, H;
const got = []; // webhook deliveries Sampforce received
let hookFail = false;
const admin = {};
let adminSecret = '';
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test_sf_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  await new Promise((ok) => {
    hook = http.createServer((req, res) => {
      let body = ''; req.on('data', (c) => { body += c; });
      req.on('end', () => { got.push({ headers: req.headers, body }); res.writeHead(hookFail ? 500 : 200).end('{}'); });
    }).listen(0, () => { H = `http://127.0.0.1:${hook.address().port}/hook`; ok(); });
  });
  const a = await makeAdmin(B, { email: 'super@frequentresearch.com', name: 'Test Super' });
  Object.assign(admin, a.headers); adminSecret = a.secret;
});
after(async () => { server.close(); hook.close(); await dropDb(); await closeDb(); });

const req = (method, p, body, headers = {}) => fetch(B + p, { method, headers: { 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const json = async (r) => (await r).json();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
// making a key asks for the authenticator code: confirm once, then make it
async function makeKey(body) {
  let r = await req('POST', '/api/v1/admin/sampforce/keys', body, admin);
  if (r.status === 403) {
    const j = await r.json();
    assert.equal(j.stepUp, true);
    assert.equal((await req('POST', '/api/v1/admin/step-up', { code: code(adminSecret, 1) }, admin)).status, 200);
    r = await req('POST', '/api/v1/admin/sampforce/keys', body, admin);
  }
  assert.equal(r.status, 200);
  return r.json();
}

let KEY, READONLY;
test('a key is made in the super admin, shown once, stored only as a hash', async () => {
  const j = await makeKey({ name: 'Sampforce production' });
  assert.match(j.key, /^sfk_[A-Za-z0-9_-]{40}$/);
  assert.deepEqual(j.item.scopes, ['leads:read', 'contacts:read', 'reviews:read', 'leads:write']);
  KEY = { authorization: 'Bearer ' + j.key };
  const row = await col('sampforce_keys').findOne({ _id: j.item.id });
  assert.equal(row.hash.length, 64);
  assert.ok(!JSON.stringify(row).includes(j.key));
  const list = await json(fetch(B + '/api/v1/admin/sampforce', { headers: admin }));
  assert.equal(list.keys.length, 1);
  assert.ok(!JSON.stringify(list).includes(j.key));
  READONLY = { 'x-api-key': (await makeKey({ name: 'Reports', scopes: ['leads:read'] })).key };
});

test('wrong, missing and revoked keys are refused', async () => {
  assert.equal((await fetch(B + '/api/v1/sampforce/leads')).status, 401);
  assert.equal((await fetch(B + '/api/v1/sampforce/leads', { headers: { authorization: 'Bearer sfk_' + 'x'.repeat(40) } })).status, 401);
  const p = await json(fetch(B + '/api/v1/sampforce/ping', { headers: KEY }));
  assert.equal(p.ok, true);
  assert.equal(p.key.name, 'Sampforce production');
  // a key without contacts:read cannot read contacts
  assert.equal((await fetch(B + '/api/v1/sampforce/contacts', { headers: READONLY })).status, 403);
  // an admin session is not a Sampforce key, and a Sampforce key is not an admin session
  assert.equal((await fetch(B + '/api/v1/sampforce/leads', { headers: admin })).status, 401);
  assert.equal((await fetch(B + '/api/v1/admin/leads', { headers: KEY })).status, 401);
});

test('every form arrives in Sampforce, oldest first, with paging and filters', async () => {
  await req('POST', '/api/v1/enquiry', { type: 'Contact form', name: 'Asha Rao', email: 'Asha@Example.com', company: 'Acme', phone: '98100', countryCode: '+91', service: 'Online surveys', message: 'Need 500 completes', page: 'https://x/contact', extra: { Budget: '5k' }, captcha: 'never' });
  await req('POST', '/api/v1/resource-download', { name: 'Ben', email: 'ben@example.com', resource: 'Panel book' });
  await req('POST', '/api/v1/case-study-download', { name: 'Cy', email: 'cy@example.com', title: 'Healthcare study' });
  await req('POST', '/api/v1/newsletter', { email: 'news@example.com', name: 'Nia', consent: true });
  const all = await json(fetch(B + '/api/v1/sampforce/leads', { headers: KEY }));
  assert.equal(all.count, 3);
  assert.deepEqual(all.data.map((l) => l.type), ['enquiry', 'resource-download', 'case-study-download']);
  const a = all.data[0];
  assert.equal(a.object, 'lead');
  assert.equal(a.contact.email, 'asha@example.com');
  assert.equal(a.contact.firstName, 'Asha');
  assert.equal(a.contact.lastName, 'Rao');
  assert.equal(a.form.name, 'Contact form');
  assert.equal(a.enquiry.service, 'Online surveys');
  assert.equal(a.extraFields.Budget, '5k');
  assert.equal(a.status, 'new');
  // private details never leave the website
  const txt = JSON.stringify(all);
  assert.doesNotMatch(txt, /"ip"|ipAddr|never|"ua"/);
  // paging
  const p1 = await json(fetch(B + '/api/v1/sampforce/leads?limit=2', { headers: KEY }));
  assert.equal(p1.count, 2); assert.equal(p1.hasMore, true);
  const p2 = await json(fetch(B + '/api/v1/sampforce/leads?limit=2&cursor=' + p1.nextCursor, { headers: KEY }));
  assert.equal(p2.count, 1); assert.equal(p2.hasMore, false); assert.equal(p2.data[0].type, 'case-study-download');
  // filters
  assert.equal((await json(fetch(B + '/api/v1/sampforce/leads?type=enquiry', { headers: KEY }))).count, 1);
  assert.equal((await json(fetch(B + '/api/v1/sampforce/leads?category=download', { headers: KEY }))).count, 2);
  assert.equal((await json(fetch(B + '/api/v1/sampforce/leads?q=acme', { headers: KEY }))).count, 1);
  assert.equal((await json(fetch(B + '/api/v1/sampforce/leads?since=2999-01-01', { headers: KEY }))).count, 0);
  assert.equal((await fetch(B + '/api/v1/sampforce/leads?since=yesterday', { headers: KEY })).status, 400);
  const forms = await json(fetch(B + '/api/v1/sampforce/forms', { headers: KEY }));
  assert.equal(forms.data.reduce((n, f) => n + f.count, 0), 3);
  // contacts (newsletter sign-ups included)
  const c = await json(fetch(B + '/api/v1/sampforce/contacts?subscribed=true', { headers: KEY }));
  assert.ok(c.data.some((x) => x.email === 'news@example.com' && x.subscribed));
  assert.equal((await json(fetch(B + '/api/v1/sampforce/contacts/news@example.com', { headers: KEY }))).data.name, 'Nia');
});

test('careers applications stay hidden without careers:read', async () => {
  await col('leads').insertOne({ _id: 'l_job1', at: new Date(), kind: 'careers', status: 'new', name: 'Job Seeker', email: 'job@example.com', department: 'IT' });
  const l = await json(fetch(B + '/api/v1/sampforce/leads', { headers: KEY }));
  assert.ok(!l.data.some((x) => x.type === 'careers'));
  assert.equal((await fetch(B + '/api/v1/sampforce/leads/l_job1', { headers: KEY })).status, 404);
  const hr = { authorization: 'Bearer ' + (await makeKey({ name: 'HR', scopes: ['careers:read'] })).key };
  const h = await json(fetch(B + '/api/v1/sampforce/leads', { headers: hr }));
  assert.deepEqual(h.data.map((x) => x.type), ['careers']);
});

test('Sampforce sends status, owner and its own id back; the super admin sees it', async () => {
  const { data } = await json(fetch(B + '/api/v1/sampforce/leads?type=enquiry', { headers: KEY }));
  const id = data[0].id;
  assert.equal((await req('PATCH', '/api/v1/sampforce/leads/' + id, { status: 'maybe' }, KEY)).status, 422);
  assert.equal((await req('PATCH', '/api/v1/sampforce/leads/' + id, { status: 'qualified' }, READONLY)).status, 403);
  const r = await json(req('PATCH', '/api/v1/sampforce/leads/' + id, { status: 'qualified', stage: 'Proposal', owner: 'Riya', sampforceId: 'SF-1001' }, KEY));
  assert.equal(r.data.status, 'qualified');
  assert.equal(r.data.sampforce.sampforceId, 'SF-1001');
  const adm = await json(fetch(B + '/api/v1/admin/leads/' + id, { headers: admin }));
  assert.equal(adm.lead.status, 'qualified');
  assert.equal(adm.lead.sampforce.owner, 'Riya');
  // updatedSince finds leads that changed after a time, even when they were made earlier
  const later = await json(fetch(B + '/api/v1/sampforce/leads?updatedSince=' + encodeURIComponent(new Date(Date.now() - 2000).toISOString()), { headers: KEY }));
  assert.ok(later.data.some((x) => x.id === id));
});

test('reviews can be read', async () => {
  await col('reviews').insertOne({ _id: 'r_1', status: 'published', first: 'Rae', last: 'K', email: 'rae@example.com', company: 'Co', country: 'IN', services: ['x'], rating: 5, review: 'Great work on our study.', date: new Date() });
  const r = await json(fetch(B + '/api/v1/sampforce/reviews', { headers: KEY }));
  assert.equal(r.data[0].rating, 5);
  assert.equal(r.data[0].contact.email, 'rae@example.com');
});

test('the webhook pushes each new lead, signed, and tries again after a failure', async () => {
  config.sampforce.webhookUrl = H; config.sampforce.webhookSecret = 'whsec-test';
  got.length = 0;
  await req('POST', '/api/v1/enquiry', { name: 'Dev', email: 'dev@example.com', message: 'Hello' });
  for (let i = 0; i < 40 && !got.length; i++) await wait(50);
  assert.equal(got.length, 1);
  const g = got[0], body = JSON.parse(g.body);
  assert.equal(g.headers['x-sampforce-event'], 'lead.created');
  assert.equal(body.event, 'lead.created');
  assert.equal(body.data.contact.email, 'dev@example.com');
  const [, t, v1] = /^t=(\d+),v1=([0-9a-f]{64})$/.exec(g.headers['x-sampforce-signature']);
  assert.equal(v1, crypto.createHmac('sha256', 'whsec-test').update(t + '.' + g.body).digest('hex'));
  // Sampforce is down: the delivery waits and is sent again
  hookFail = true; got.length = 0;
  await req('POST', '/api/v1/enquiry', { name: 'Eve', email: 'eve@example.com', message: 'Hello' });
  for (let i = 0; i < 40 && !got.length; i++) await wait(50);
  await wait(100);
  const d = await col('sampforce_outbox').findOne({ 'data.contact.email': 'eve@example.com' });
  assert.equal(d.status, 'pending'); assert.equal(d.tries, 1); assert.match(d.lastError, /500/);
  hookFail = false;
  await col('sampforce_outbox').updateOne({ _id: d._id }, { $set: { nextAt: new Date() } });
  await sfWork();
  assert.equal((await col('sampforce_outbox').findOne({ _id: d._id })).status, 'sent');
  // the test button
  const tb = await json(req('POST', '/api/v1/admin/sampforce/test', {}, admin));
  assert.equal(tb.ok, true);
  const ov = await json(fetch(B + '/api/v1/admin/sampforce', { headers: admin }));
  assert.equal(ov.webhook.ready, true);
  assert.ok(ov.recent.length >= 3);
  assert.ok(!JSON.stringify(ov).includes('whsec-test'));
  config.sampforce.webhookUrl = ''; config.sampforce.webhookSecret = '';
});

test('a revoked key stops working at once', async () => {
  const ov = await json(fetch(B + '/api/v1/admin/sampforce', { headers: admin }));
  const k = ov.keys.find((x) => x.name === 'Sampforce production');
  assert.equal((await req('DELETE', '/api/v1/admin/sampforce/keys/' + k.id, undefined, admin)).status, 200);
  const r = await fetch(B + '/api/v1/sampforce/ping', { headers: KEY });
  assert.equal(r.status, 401);
  assert.match((await r.json()).error, /revoked/);
});
