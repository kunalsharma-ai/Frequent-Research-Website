// Run: npm test   (needs MongoDB: MONGODB_URI, default mongodb://127.0.0.1:27017; uses a throw-away database)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.REVIEW_SECRET = 'test-secret';
process.env.PUBLISH_MODE = 'auto';
const { connectDb, closeDb, dropDb } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { makeAdmin } = await import('./helpers.js');
let server, B;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  Object.assign(admin, (await makeAdmin(B, { email: 'super@frequentresearch.com', name: 'Test Super' })).headers);
});
after(async () => { server.close(); await dropDb(); await closeDb(); });

const admin = {}; // a real Super Admin session, made in before()
const req = (method, p, body, headers = {}) => fetch(B + p, { method, headers: { 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const post = (p, body, h) => req('POST', p, body, h);
const json = async (r) => (await r).json();

test('enquiry lead is saved, listed, updated and exported as CSV', async () => {
  const r = await post('/api/v1/enquiry', { name: 'Test', email: 'A@b.co', message: '=SUM(1)', captcha: 'drop me' });
  assert.equal(r.status, 200);
  const { id } = await r.json();
  const list = await json(fetch(B + '/api/v1/admin/leads?q=a@b.co', { headers: admin }));
  assert.equal(list.total, 1);
  assert.equal(list.leads[0].email, 'a@b.co');
  assert.equal((await req('PATCH', '/api/v1/admin/leads/' + id, { status: 'contacted', note: 'called' }, admin)).status, 200);
  const csv = await (await fetch(B + '/api/v1/admin/leads?format=csv', { headers: admin })).text();
  assert.match(csv, /"a@b.co"/);
  assert.match(csv, /"'=SUM\(1\)"/);
  assert.match(csv, /"contacted"/);
  assert.doesNotMatch(csv, /drop me/);
});

test('old /api/ addresses still answer, marked deprecated', async () => {
  const r = await post('/api/resource-download', { email: 'x@y.co', resource: 'Brochure' });
  assert.equal(r.status, 200);
  assert.equal(r.headers.get('deprecation'), 'true');
});

test('invalid email and honeypot', async () => {
  assert.equal((await post('/api/v1/resource-download', { email: 'nope' })).status, 422);
  assert.deepEqual(await json(post('/api/v1/resource-download', { email: 'x@y.co', website: 'bot' })), { ok: true });
});

test('careers application with a CV', async () => {
  const fd = new FormData();
  fd.append('name', 'Ravi Kumar'); fd.append('email', 'ravi@ex.com'); fd.append('department', 'Market Research');
  fd.append('resume', new Blob(['%PDF-1.4 test'], { type: 'application/pdf' }), 'cv.pdf');
  const r = await fetch(B + '/api/v1/careers', { method: 'POST', body: fd });
  assert.equal(r.status, 200);
  const l = (await json(fetch(B + '/api/v1/admin/leads?kind=careers', { headers: admin }))).leads[0];
  assert.equal(l.cv.name, 'cv.pdf');
  assert.equal((await fetch(B + '/api/v1/files/' + l.cv.id)).status, 404); // CVs are private
  assert.equal(await (await fetch(B + '/api/v1/admin/files/' + l.cv.id, { headers: admin })).text(), '%PDF-1.4 test');
  const bad = new FormData(); bad.append('email', 'a@b.co'); bad.append('resume', new Blob(['x'], { type: 'text/html' }), 'x.html');
  assert.equal((await fetch(B + '/api/v1/careers', { method: 'POST', body: bad })).status, 422);
});

test('admin endpoints need a sign-in; the old shared password is gone', async () => {
  assert.equal((await fetch(B + '/api/v1/admin/leads')).status, 401);
  assert.equal((await req('PUT', '/api/v1/admin/gallery', {})).status, 401);
  assert.equal((await post('/api/v1/admin/login', { username: 'admin', password: 'test-token' })).status, 401);
  assert.equal((await post('/api/v1/admin/login', { email: 'super@frequentresearch.com', password: 'wrong' })).status, 401);
  assert.equal((await fetch(B + '/api/v1/admin/me', { headers: admin })).status, 200);
  assert.equal((await fetch(B + '/api/v1/admin/me', { headers: { authorization: admin.authorization + 'x' } })).status, 401);
  const log = await json(fetch(B + '/api/v1/admin/audit', { headers: admin }));
  assert.ok(log.rows.some((r) => r.action === 'login-failed'));
});

test('review with a solved CAPTCHA is published once; admin can edit it', async () => {
  const c = await json(fetch(B + '/api/v1/captcha'));
  const code = [...c.svg.matchAll(/<text x="(\d+)"[^>]*>(\w)<\/text>/g)].sort((a, b) => a[1] - b[1]).map((m) => m[2]).join('');
  const body = { name: 'Asha Rao', email: 'asha@ex.com', company: 'Acme', country: 'IN', services: ['market-research'], rating: 5, review: 'Great team and very responsive work.', consent: true, captchaId: c.id, captcha: code };
  const r = await post('/api/v1/reviews', body);
  assert.equal(r.status, 201);
  const { review } = await r.json();
  assert.equal(review.first, 'Asha');
  assert.equal((await post('/api/v1/reviews', body)).status, 422); // the same CAPTCHA cannot be used twice
  assert.equal((await json(fetch(B + '/api/v1/reviews/summary'))).counts[5], 1);
  assert.equal((await req('PATCH', '/api/v1/admin/reviews/' + review.id, { reply: 'Thank you!' }, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/reviews'))).reviews[0].reply, 'Thank you!');
  assert.equal((await post('/api/v1/admin/reviews/' + review.id, { action: 'hide' }, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/reviews'))).reviews.length, 0);
});

test('celebrations and gallery admin copies', async () => {
  { const r = await fetch(B + '/api/v1/celebrations?year=2027'); assert.equal(r.status, 200); assert.equal((await r.json()).events, null); }
  assert.equal((await req('PUT', '/api/v1/admin/celebrations?year=2027', { events: [{ date: '2028-01-01', name: 'x' }] }, admin)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/celebrations?year=2027', { events: [{ date: '2027-01-26', name: 'Republic Day' }] }, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/celebrations?year=2027'))).events.length, 1);
  assert.equal((await req('PUT', '/api/v1/admin/gallery', { items: [{ section: 'awards', type: 'photo', url: 'https://example.com/a.jpg' }] }, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/gallery'))).items.length, 1);
});

test('site content: save, read publicly, history and restore', async () => {
  assert.equal((await req('PUT', '/api/v1/admin/content/settings', { data: { whatsapp: { number: '918178200573' } } }, admin)).status, 200);
  assert.equal((await req('PUT', '/api/v1/admin/content/settings', { data: { whatsapp: { number: '911111111111' } } }, admin)).status, 200);
  assert.equal((await req('PUT', '/api/v1/admin/content/texts', { data: { a: '<script>x</script>' } }, admin)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/content/notes', { data: 'private' }, admin)).status, 200);
  const site = await json(fetch(B + '/api/v1/site'));
  assert.equal(site.content.settings.whatsapp.number, '911111111111');
  assert.equal(site.content.notes, undefined);
  assert.equal((await fetch(B + '/api/v1/content/notes')).status, 404);
  const h = await json(fetch(B + '/api/v1/admin/content/settings/history', { headers: admin }));
  assert.equal(h.versions.length, 1);
  assert.equal((await post('/api/v1/admin/content/settings/history/0/restore', {}, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/content/settings'))).data.whatsapp.number, '918178200573');
});

test('uploads: public files are served, bad types refused', async () => {
  const png = Buffer.from('89504e470d0a1a0a', 'hex');
  const up = await json(fetch(B + '/api/v1/admin/files?name=logo.png&folder=logos', { method: 'POST', headers: { ...admin, 'content-type': 'image/png' }, body: png }));
  assert.ok(up.ok);
  const g = await fetch(B + up.url);
  assert.equal(g.status, 200);
  assert.equal(g.headers.get('content-type'), 'image/png');
  assert.equal((await fetch(B + '/api/v1/admin/files', { method: 'POST', headers: { ...admin, 'content-type': 'text/html' }, body: '<b>' })).status, 415);
  assert.equal((await json(fetch(B + '/api/v1/admin/files?folder=logos', { headers: admin }))).files.length, 1);
  assert.equal((await req('DELETE', '/api/v1/admin/files/' + up.id, undefined, admin)).status, 200);
  assert.equal((await fetch(B + up.url)).status, 404);
});

test('live chat: visitor starts, admin replies, visitor sees the reply', async () => {
  const s = await json(post('/api/v1/chat/start', { name: 'Mia Chen', email: 'mia@ex.com', message: 'Do you cover Vietnam?' }));
  assert.ok(s.id && s.token);
  assert.equal(s.messages[0].text, 'Do you cover Vietnam?');
  assert.equal((await post(`/api/v1/chat/${s.id}/message`, { token: 'bad', text: 'hi' })).status, 404);
  assert.equal((await post(`/api/v1/chat/${s.id}/message`, { token: s.token, text: 'Consumers, 500 people' })).status, 200);
  const list = await json(fetch(B + '/api/v1/admin/chats?status=open', { headers: admin }));
  assert.equal(list.chats[0].unread, 2);
  assert.equal((await post(`/api/v1/admin/chats/${s.id}/reply`, { text: 'Yes, we do.' }, admin)).status, 200);
  const m = await json(fetch(B + `/api/v1/chat/${s.id}/messages?token=${s.token}&since=2`));
  assert.deepEqual(m.messages.map((x) => [x.from, x.text]), [['visitor', 'Consumers, 500 people'], ['agent', 'Yes, we do.']]);
  assert.equal((await json(fetch(B + '/api/v1/admin/leads?kind=chat', { headers: admin }))).total, 1);
});

test('page views are counted for the dashboard', async () => {
  for (const p of ['/', '/services', '/']) assert.equal((await fetch(B + '/api/v1/track', { method: 'POST', headers: { 'content-type': 'text/plain' }, body: JSON.stringify({ path: p, ref: 'https://www.google.com/' }) })).status, 204);
  const s = await json(fetch(B + '/api/v1/admin/stats?days=7', { headers: admin }));
  assert.equal(s.visits.total, 3);
  assert.equal(s.visits.pages[0].path, '/');
  assert.equal(s.visits.referrers[0].ref, 'www.google.com');
  assert.ok(s.leads.total >= 3);
  assert.equal(s.series.length, 7);
});

test('admin visits and activity show the IP address and country (GitHub #15, #16)', async () => {
  assert.equal((await fetch(B + '/api/v1/track', { method: 'POST', headers: { 'content-type': 'text/plain', 'x-forwarded-for': '203.0.113.9', 'cf-ipcountry': 'IN' }, body: JSON.stringify({ path: '/ip-test' }) })).status, 204);
  const v = await json(fetch(B + '/api/v1/admin/visits?path=/ip-test', { headers: admin }));
  assert.equal(v.visits[0].ipAddress, '203.0.113.9');
  assert.equal(v.visits[0].country, 'IN');
  assert.equal(v.visits[0].ipAddr, undefined);
  const { col } = await import('../src/db.js');
  const raw = await col('visits').findOne({ path: '/ip-test' });
  assert.ok(raw.ipAddr.length > 20 && !raw.ipAddr.includes('203.0.113.9'), 'the address is stored sealed');
  const a = await json(fetch(B + '/api/v1/admin/audit?limit=5', { headers: admin }));
  assert.ok(a.rows.length);
  assert.ok('ipAddress' in a.rows[0] && typeof a.rows[0].ipAddress === 'string');
});

test('health check reports the database', async () => {
  assert.deepEqual(await json(fetch(B + '/healthz')), { ok: true, db: true });
});

test('a website data file can be replaced (panel numbers)', async () => {
  const k = encodeURIComponent('data:panel-books/b2c/india.json');
  assert.equal((await req('PUT', '/api/v1/admin/content/' + k, { data: { panel: 5000000 } }, admin)).status, 200);
  assert.equal((await json(fetch(B + '/api/v1/content/' + k))).data.panel, 5000000);
  assert.ok((await json(fetch(B + '/api/v1/site'))).dataFiles['panel-books/b2c/india.json'] > 0);
  assert.equal((await req('PUT', '/api/v1/admin/content/' + encodeURIComponent('data:../x.json'), { data: {} }, admin)).status, 400);
});
