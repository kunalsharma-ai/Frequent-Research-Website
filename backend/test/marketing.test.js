// Build 78: contacts, email automations, newsletters, social posts, chat downloads, SampCrew, AI.
// Run: npm test (needs MongoDB, like api.test.js). No email, social or AI keys are set, so nothing leaves the machine.
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

process.env.REVIEW_SECRET = 'test-secret';
process.env.MAIL_NOTIFY = 'team@example.com';
process.env.SAMPCREW_WEBHOOK_SECRET = 'sc-secret';
process.env.WORKERS = '0';
const { connectDb, closeDb, dropDb, col } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { makeAdmin } = await import('./helpers.js');
let server, B;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test78_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  Object.assign(admin, (await makeAdmin(B, { email: 'super78@frequentresearch.com', name: 'Test Super' })).headers);
});
after(async () => { server.close(); await dropDb(); await closeDb(); });

const admin = {}; // a real Super Admin session, made in before()
const req = (method, p, body, headers = {}) => fetch(B + p, { method, headers: { 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const j = async (r) => (await r).json();
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

test('a form adds a contact and queues the reply, the team alert and (with consent) the follow-ups', async () => {
  await req('POST', '/api/v1/enquiry', { name: 'Asha Rao', email: 'Asha@Example.com', service: 'Consumer panel', consent: true, formKey: 'mr-enquiry', extra: { budget: '5 lakh' } });
  await req('POST', '/api/v1/resource-download', { first: 'Ravi', last: 'K', email: 'ravi@example.com', resource: 'India Consumer Panel Book' });
  await wait(150);
  const q = await col('mail_queue').find({}).toArray();
  const asha = q.filter((x) => x.to === 'asha@example.com').map((x) => x.template).sort();
  assert.deepEqual(asha, ['followup-1', 'followup-2', 'reply-market-research']);
  assert.ok(q.some((x) => x.to === 'team@example.com' && x.template === 'notify-team'));
  const ravi = q.filter((x) => x.to === 'ravi@example.com').map((x) => x.template);
  assert.deepEqual(ravi, ['reply-download']); // no consent: no marketing follow-ups
  const st = await j(fetch(B + '/api/v1/admin/marketing/stats', { headers: admin }));
  assert.equal(st.contacts.total, 2);
  assert.equal(st.contacts.subscribed, 1);
  assert.ok(st.forms.some((f) => f.form === 'mr-enquiry' && f.people === 1));
  const lead = (await j(fetch(B + '/api/v1/admin/leads?q=asha', { headers: admin }))).leads[0];
  assert.equal(lead.extra.budget, '5 lakh');
});

test('templates: list, preview with the sample person, save an edited copy', async () => {
  const t = await j(fetch(B + '/api/v1/admin/mail/templates', { headers: admin }));
  assert.ok(t.templates.length >= 14 && t.designs.length >= 10);
  const p = await j(req('POST', '/api/v1/admin/mail/preview', { template: 'reply-enquiry' }, admin));
  assert.match(p.subject, /Kunal/);
  assert.match(p.html, /<!doctype html>/);
  const edited = { ...t.templates.find((x) => x.id === 'reply-enquiry'), subject: 'Hello {{first}}' };
  assert.equal((await req('PUT', '/api/v1/admin/mail/templates', { templates: [edited, { id: 'my-offer', name: 'Offer', subject: 'Offer', design: 'spotlight', heading: 'Hi', body: 'x' }] }, admin)).status, 200);
  const t2 = await j(fetch(B + '/api/v1/admin/mail/templates', { headers: admin }));
  assert.equal(t2.templates.find((x) => x.id === 'reply-enquiry').subject, 'Hello {{first}}');
  assert.ok(t2.templates.find((x) => x.id === 'my-offer'));
  const test1 = await req('POST', '/api/v1/admin/mail/test', { template: 'my-offer', to: 'me@example.com' }, admin);
  assert.equal(test1.status, 503); // no email provider in tests
});

test('newsletter sign-up, campaign to subscribers, unsubscribe', async () => {
  assert.equal((await req('POST', '/api/v1/newsletter', { email: 'sub@example.com' })).status, 422); // consent needed
  assert.equal((await req('POST', '/api/v1/newsletter', { email: 'sub@example.com', name: 'Sub', consent: true })).status, 200);
  assert.ok(await col('mail_queue').findOne({ to: 'sub@example.com', template: 'welcome-newsletter' }));
  const c = await j(req('POST', '/api/v1/admin/campaigns', { name: 'November', template: 'newsletter-monthly', segment: {} }, admin));
  const s = await j(req('POST', `/api/v1/admin/campaigns/${c.id}/send`, {}, admin));
  assert.equal(s.audience, 2); // asha (consent) + sub
  const list = await j(fetch(B + '/api/v1/admin/campaigns', { headers: admin }));
  assert.equal(list.campaigns[0].stats.queued, 2);
  // unsubscribe link from the email
  const { createHmac } = crypto;
  const tok = createHmac('sha256', 'test-secret|unsub').update('sub@example.com').digest('base64url').slice(0, 22);
  assert.equal((await fetch(B + '/api/v1/mail/unsubscribe?e=sub@example.com&t=bad')).status, 400);
  assert.equal((await fetch(B + `/api/v1/mail/unsubscribe?e=sub@example.com&t=${tok}`)).status, 200);
  assert.equal((await col('contacts').findOne({ _id: 'sub@example.com' })).subscribed, false);
  const csv = await (await fetch(B + '/api/v1/admin/contacts?format=csv', { headers: admin })).text();
  assert.match(csv, /asha@example.com/);
});

test('automations can be changed and validated', async () => {
  const a = await j(fetch(B + '/api/v1/admin/mail/automations', { headers: admin }));
  assert.ok(a.automations.find((x) => x.id === 'auto-reply').on);
  const off = a.automations.map((x) => (x.id === 'enquiry-follow-up' ? { ...x, on: false } : x));
  assert.equal((await req('PUT', '/api/v1/admin/mail/automations', { automations: off }, admin)).status, 200);
  assert.equal((await req('PUT', '/api/v1/admin/mail/automations', { automations: [{ id: 'x', trigger: { type: 'lead' }, steps: [] }] }, admin)).status, 400);
  await req('POST', '/api/v1/enquiry', { name: 'Neo', email: 'neo@example.com', service: 'SEO', consent: true });
  await wait(150);
  const q = (await col('mail_queue').find({ to: 'neo@example.com' }).toArray()).map((x) => x.template);
  assert.deepEqual(q, ['reply-digital-marketing']);
});

test('social posts: draft, one-click post reports platforms that are not connected', async () => {
  const st = await j(fetch(B + '/api/v1/admin/social/status', { headers: admin }));
  assert.equal(st.platforms.facebook, false);
  assert.equal((await req('POST', '/api/v1/admin/social/posts', { text: 'Hi', platforms: [] }, admin)).status, 400);
  const p = await j(req('POST', '/api/v1/admin/social/posts', { text: 'New panel book', link: '/downloads', platforms: ['facebook', 'linkedin'], now: true }, admin));
  assert.equal(p.status, 'failed');
  assert.equal(p.results.facebook.error, 'not connected');
  const ai = await req('POST', '/api/v1/admin/social/autopilot/run', {}, admin);
  assert.equal(ai.status, 503);
});

test('AI assistant says what it needs when no key is set', async () => {
  const r = await req('POST', '/api/v1/admin/ai/write', { kind: 'blog', brief: 'CATI in India' }, admin);
  assert.equal(r.status, 503);
  assert.match((await r.json()).error, /ANTHROPIC_API_KEY/);
});

test('live chat download (one conversation and all) and the keys overview', async () => {
  const s = await j(req('POST', '/api/v1/chat/start', { name: 'Mia', email: 'mia@example.com', message: 'Need CATI', transcript: [{ from: 'visitor', text: 'hello' }] }));
  await req('POST', `/api/v1/admin/chats/${s.id}/reply`, { text: 'Sure, how many interviews?' }, admin);
  const txt = await (await fetch(B + `/api/v1/admin/chats/${s.id}/export?format=txt`, { headers: admin })).text();
  assert.match(txt, /Frequent Research: Sure, how many interviews\?/);
  assert.match(txt, /\[before hand-over\] Visitor: hello/);
  const csv = await (await fetch(B + '/api/v1/admin/chats/export?format=csv', { headers: admin })).text();
  assert.match(csv, /Need CATI/);
  const k = await j(fetch(B + '/api/v1/admin/integrations', { headers: admin }));
  assert.equal(k.ai.ready, false);
  assert.ok(k.keys.find((x) => x.key === 'MAIL_NOTIFY').set);
});

test('SampCrew stage updates are accepted only with the right signature', async () => {
  const id = (await col('leads').insertOne({ _id: 'l_hr1', kind: 'careers', email: 'c@example.com', at: new Date(), status: 'new' })).insertedId;
  const body = JSON.stringify({ externalId: id, stage: 'interview', note: 'Round 1 Friday' });
  const bad = await fetch(B + '/api/v1/integrations/sampcrew/webhook', { method: 'POST', headers: { 'content-type': 'application/json', 'x-sampcrew-signature': 'x'.repeat(64) }, body });
  assert.equal(bad.status, 401);
  const sig = crypto.createHmac('sha256', 'sc-secret').update(body).digest('hex');
  const ok = await j(fetch(B + '/api/v1/integrations/sampcrew/webhook', { method: 'POST', headers: { 'content-type': 'application/json', 'x-sampcrew-signature': sig }, body }));
  assert.equal(ok.matched, 1);
  const l = await col('leads').findOne({ _id: 'l_hr1' });
  assert.equal(l.hr.stage, 'interview');
  assert.equal(l.status, 'qualified');
});

test('new public content keys reach the website; private ones do not', async () => {
  await req('PUT', '/api/v1/admin/content/custom-pages', { data: [{ path: '/p/offer', title: 'Offer', blocks: [] }] }, admin);
  await req('PUT', '/api/v1/admin/content/forms-mail', { data: { 'mr-enquiry': { notify: 'boss@example.com' } } }, admin);
  const site = await j(fetch(B + '/api/v1/site'));
  assert.equal(site.content['custom-pages'][0].path, '/p/offer');
  assert.equal(site.content['forms-mail'], undefined);
  assert.equal((await req('PUT', '/api/v1/admin/content/page-blocks', { data: { '/': [{ type: 'html', html: '<script>alert(1)</script>' }] } }, admin)).status, 400);
});

test('extra form fields are kept (also when they arrive as a JSON string) and keys are made safe', async () => {
  await req('POST', '/api/v1/enquiry', { name: 'Ex', email: 'ex@example.com', formKey: 'diwali-offer', extra: JSON.stringify({ 'Budget (Rs.)': '5 lakh', Size: ['a', 'b'] }) });
  const l = await col('leads').findOne({ email: 'ex@example.com' });
  assert.deepEqual(l.extra, { 'Budget (Rs_)': '5 lakh', Size: 'a, b' });
  assert.equal(l.formKey, 'diwali-offer');
});

test('queued emails can be stopped one by one or all at once (GitHub #11)', async () => {
  const mk = (id) => ({ _id: id, to: 'queue@example.com', template: 'welcome-newsletter', vars: {}, status: 'queued', tries: 0, created: new Date(), sendAt: new Date(Date.now() + 3600e3) });
  await col('mail_queue').insertMany([mk('q_t1'), mk('q_t2'), mk('q_t3')]);
  assert.equal((await req('POST', '/api/v1/admin/mail/queue/q_t1/cancel', {}, admin)).status, 200);
  assert.equal((await col('mail_queue').findOne({ _id: 'q_t1' })).status, 'cancelled');
  assert.equal((await req('POST', '/api/v1/admin/mail/queue/q_t1/cancel', {}, admin)).status, 409);
  const all = await j(req('POST', '/api/v1/admin/mail/queue/cancel', {}, admin));
  assert.ok(all.n >= 2);
  assert.equal(await col('mail_queue').countDocuments({ _id: { $in: ['q_t2', 'q_t3'] }, status: 'cancelled' }), 2);
  // no email provider is set in tests, so "send now" says so and leaves the email as it was
  const s = await req('POST', '/api/v1/admin/mail/queue/q_t2/send', {}, admin);
  assert.equal(s.status, 503);
  assert.equal((await col('mail_queue').findOne({ _id: 'q_t2' })).status, 'cancelled');
  assert.equal((await req('POST', '/api/v1/admin/mail/queue/q_t2/cancel', {})).status, 401);
});

