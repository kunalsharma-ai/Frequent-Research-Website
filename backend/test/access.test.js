// Build 78.3: admin accounts, MFA, roles, page-by-page access, approvals. Run: npm test (needs MongoDB, like api.test.js).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.WORKERS = '0';
const { connectDb, closeDb, dropDb, col } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { makeAdmin, signIn, code, PASSWORD } = await import('./helpers.js');
const { provisionAdmin } = await import('../src/routes/users.js');
let server, B, sup;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test783_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  sup = await makeAdmin(B, { email: 'owner@frequentresearch.com', name: 'Owner' });
});
after(async () => { server.close(); await dropDb(); await closeDb(); });

const req = (method, p, body, headers = {}) => fetch(B + p, { method, headers: { 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const j = async (r) => (await r).json();

test('setup link: works once, needs a strong password and an authenticator code', async () => {
  const { token } = await provisionAdmin({ email: 'new.super@frequentresearch.com', name: 'New', role: 'super' });
  assert.equal((await j(fetch(B + '/api/v1/admin/setup/' + token))).step, 'password');
  assert.equal((await req('POST', `/api/v1/admin/setup/${token}/password`, { password: 'password123' })).status, 400);
  const pw = await j(req('POST', `/api/v1/admin/setup/${token}/password`, { password: PASSWORD }));
  assert.match(pw.otpauth, /^otpauth:\/\/totp\//);
  assert.equal((await req('POST', `/api/v1/admin/setup/${token}/mfa`, { code: '000000' })).status, 400);
  const done = await j(req('POST', `/api/v1/admin/setup/${token}/mfa`, { code: code(pw.secret, -1) }));
  assert.equal(done.recovery.length, 10);
  assert.equal((await fetch(B + '/api/v1/admin/setup/' + token)).status, 404); // used up
  assert.equal((await req('POST', `/api/v1/admin/setup/${token}/password`, { password: PASSWORD })).status, 404);
  // other domains are refused
  await assert.rejects(provisionAdmin({ email: 'x@gmail.com', name: 'X' }));
});

test('sign-in needs password and MFA; recovery codes work once; wrong passwords lock the account', async () => {
  const a = await makeAdmin(B, { email: 'signin@frequentresearch.com', role: 'viewer' });
  const first = await j(req('POST', '/api/v1/admin/login', { email: a.email, password: PASSWORD }));
  assert.equal(first.mfa, true);
  assert.equal(first.token, undefined); // no session before the code
  assert.equal((await req('POST', '/api/v1/admin/login/mfa', { ticket: first.ticket, code: '123456' })).status, 401);
  const ok = await j(req('POST', '/api/v1/admin/login/mfa', { ticket: first.ticket, code: code(a.secret) }));
  assert.ok(ok.token);
  // the same code cannot be used again
  const again = await j(req('POST', '/api/v1/admin/login', { email: a.email, password: PASSWORD }));
  assert.equal((await req('POST', '/api/v1/admin/login/mfa', { ticket: again.ticket, code: code(a.secret) })).status, 401);
  const rc = await j(req('POST', '/api/v1/admin/login/mfa', { ticket: again.ticket, recovery: a.recovery[0] }));
  assert.ok(rc.token);
  const third = await j(req('POST', '/api/v1/admin/login', { email: a.email, password: PASSWORD }));
  assert.equal((await req('POST', '/api/v1/admin/login/mfa', { ticket: third.ticket, recovery: a.recovery[0] })).status, 401);
  // log out ends the session
  assert.equal((await req('POST', '/api/v1/admin/logout', {}, { authorization: 'Bearer ' + rc.token })).status, 200);
  assert.equal((await fetch(B + '/api/v1/admin/me', { headers: { authorization: 'Bearer ' + rc.token } })).status, 401);
  // lockout
  const l = await makeAdmin(B, { email: 'lock@frequentresearch.com', role: 'viewer' });
  for (let i = 0; i < 5; i++) await req('POST', '/api/v1/admin/login', { email: l.email, password: 'Wrong-password-1!' });
  assert.equal((await req('POST', '/api/v1/admin/login', { email: l.email, password: PASSWORD })).status, 429);
});

test('invite an admin: the right rights only, and no privilege escalation', async () => {
  const inv = await j(req('POST', '/api/v1/admin/users', { email: 'mkt@frequentresearch.com', name: 'Meera', role: 'marketing', department: 'Marketing', designation: 'Manager', mobile: '+91 90000 00000' }, sup.headers));
  assert.ok(inv.ok, inv.error);
  assert.match(inv.link, /\/admin\/setup\?t=/); // no mail on the test server, so the link comes back
  assert.equal((await req('POST', '/api/v1/admin/users', { email: 'a@gmail.com', name: 'A', role: 'viewer' }, sup.headers)).status, 400);
  const t = new URL(inv.link).searchParams.get('t');
  const pw = await j(req('POST', `/api/v1/admin/setup/${t}/password`, { password: PASSWORD }));
  const done = await j(req('POST', `/api/v1/admin/setup/${t}/mfa`, { code: code(pw.secret, -1) }));
  const mk = { authorization: 'Bearer ' + done.token };
  // marketing: contacts yes; admins, enquiry changes, gallery, site settings no
  assert.equal((await fetch(B + '/api/v1/admin/contacts', { headers: mk })).status, 200);
  assert.equal((await fetch(B + '/api/v1/admin/users', { headers: mk })).status, 403);
  assert.equal((await req('PUT', '/api/v1/admin/gallery', { items: [] }, mk)).status, 403);
  assert.equal((await req('PUT', '/api/v1/admin/content/settings', { data: {} }, mk)).status, 403);
  assert.equal((await fetch(B + '/api/v1/admin/some-new-thing', { headers: mk })).status, 403); // unknown = Super Admin only
  const me = await j(fetch(B + '/api/v1/admin/me', { headers: mk }));
  assert.equal(me.roleName, 'Marketing Admin');
  assert.ok(me.perms.marketing.includes('publish'));
  // an IT admin who can see admins cannot make one, and a users manager cannot make a Super Admin
  const it = await makeAdmin(B, { email: 'it@frequentresearch.com', role: 'it', grants: [{ module: 'users', actions: ['create', 'manage'], keys: [], paths: [] }] });
  assert.equal((await req('POST', '/api/v1/admin/users', { email: 'boss@frequentresearch.com', name: 'Boss', role: 'super' }, it.headers)).status, 403);
  assert.equal((await req('POST', '/api/v1/admin/users', { email: 'web@frequentresearch.com', name: 'Web', role: 'website' }, it.headers)).status, 403);
  assert.equal((await req('POST', '/api/v1/admin/users', { email: 'v@frequentresearch.com', name: 'V', role: 'viewer' }, it.headers)).status, 403); // viewer has page rights IT does not
  // suspend: the session stops at once
  await req('POST', `/api/v1/admin/users/${done.user.id}/suspend`, {}, sup.headers);
  assert.equal((await fetch(B + '/api/v1/admin/contacts', { headers: mk })).status, 401);
  const log = await j(fetch(B + '/api/v1/admin/audit?actor=owner@frequentresearch.com', { headers: sup.headers }));
  assert.ok(log.rows.some((r) => r.action === 'admin-suspend' && r.actor.email === 'owner@frequentresearch.com'));
  // the last Super Admin cannot be suspended
  const others = await j(fetch(B + '/api/v1/admin/users?role=super&status=active', { headers: sup.headers }));
  for (const u of others.users) if (u.email !== sup.email) await req('POST', `/api/v1/admin/users/${u.id}/suspend`, {}, sup.headers);
  assert.equal((await req('PATCH', `/api/v1/admin/users/${sup.id}`, { role: 'viewer' }, sup.headers)).status, 403);
});

test('page-by-page access: a blog writer changes only blog pages, and changes wait for approval', async () => {
  const w = await makeAdmin(B, { email: 'writer@frequentresearch.com', role: 'viewer', grants: [{ module: 'pages', actions: ['view', 'edit'], keys: [], paths: ['/blog/*'] }] });
  // a change on a blog page is saved as a draft for approval, not published
  const d = await j(req('PUT', '/api/v1/admin/content/texts', { data: { '/blog/cati-india': { 'Old line': 'New line' } } }, w.headers));
  assert.equal(d.draft, true);
  assert.equal(d.status, 'submitted');
  assert.equal((await col('content').findOne({ _id: 'texts' })), null);
  // a change on another page is refused
  const no = await req('PUT', '/api/v1/admin/content/texts', { data: { '/blog/cati-india': { 'Old line': 'New line' }, '/about-us': { a: 'b' } } }, w.headers);
  assert.equal(no.status, 403);
  assert.match((await no.json()).error, /about-us/);
  // a grant on some pages never counts for the whole area
  assert.equal((await req('PUT', '/api/v1/admin/content/page-sections', { data: { '/': { hero: { hide: true } } } }, w.headers)).status, 403);
  // the writer cannot approve their own change; the Super Admin approves and publishes
  assert.equal((await req('POST', `/api/v1/admin/approvals/${d.id}/approve`, {}, w.headers)).status, 403);
  const q = await j(fetch(B + '/api/v1/admin/approvals', { headers: sup.headers }));
  assert.ok(q.items.some((x) => x.id === d.id && x.canApprove));
  const one = await j(fetch(B + '/api/v1/admin/approvals/' + d.id, { headers: sup.headers }));
  assert.deepEqual(one.proposed, { '/blog/cati-india': { 'Old line': 'New line' } });
  assert.equal((await req('POST', `/api/v1/admin/approvals/${d.id}/reject`, {}, sup.headers)).status, 400); // a note is needed
  assert.equal((await req('POST', `/api/v1/admin/approvals/${d.id}/approve`, { publish: true }, sup.headers)).status, 200);
  assert.deepEqual((await col('content').findOne({ _id: 'texts' })).data, { '/blog/cati-india': { 'Old line': 'New line' } });
  // meanwhile someone else changed another page; publishing a second blog draft keeps that change
  await req('PUT', '/api/v1/admin/content/texts', { data: { '/blog/cati-india': { 'Old line': 'New line' }, '/blog/online-panels': { x: 'y' } } }, w.headers);
  const d2 = (await j(fetch(B + '/api/v1/admin/approvals', { headers: sup.headers }))).items.find((x) => x.status === 'submitted');
  await req('PUT', '/api/v1/admin/content/texts', { data: { '/blog/cati-india': { 'Old line': 'New line' }, '/contact-us': { c: 'd' } } }, sup.headers);
  assert.equal((await req('POST', `/api/v1/admin/approvals/${d2.id}/approve`, {}, sup.headers)).status, 200);
  assert.equal((await req('POST', `/api/v1/admin/approvals/${d2.id}/publish`, {}, sup.headers)).status, 200);
  const live = (await col('content').findOne({ _id: 'texts' })).data;
  assert.deepEqual(Object.keys(live).sort(), ['/blog/cati-india', '/blog/online-panels', '/contact-us']);
  // rollback is there for publishers
  const h = await j(fetch(B + '/api/v1/admin/content/texts/history', { headers: sup.headers }));
  assert.ok(h.versions.length >= 2);
});

test('sensitive actions ask for the authenticator again after 10 minutes', async () => {
  const a = await makeAdmin(B, { email: 'stepup@frequentresearch.com', role: 'business' });
  await col('admin_sessions').updateMany({ user: a.id }, { $set: { stepUp: new Date(Date.now() - 11 * 60e3) } });
  const r = await fetch(B + '/api/v1/admin/leads?format=csv', { headers: a.headers });
  assert.equal(r.status, 403);
  assert.equal((await r.json()).stepUp, true);
  assert.equal((await req('POST', '/api/v1/admin/step-up', { code: '111111' }, a.headers)).status, 401);
  assert.equal((await req('POST', '/api/v1/admin/step-up', { code: code(a.secret) }, a.headers)).status, 200);
  assert.equal((await fetch(B + '/api/v1/admin/leads?format=csv', { headers: a.headers })).status, 200);
});

test('enquiries: assign to a colleague, filter by type; careers CVs only for HR', async () => {
  await req('POST', '/api/v1/enquiry', { name: 'Client', email: 'client@ex.com', message: 'Need 500 CATI interviews', form: 'rfq' });
  const biz = await makeAdmin(B, { email: 'biz@frequentresearch.com', role: 'business' });
  const list = await j(fetch(B + '/api/v1/admin/leads', { headers: biz.headers }));
  const lead = list.leads[0];
  assert.ok(lead.category);
  const p = await j(req('PATCH', '/api/v1/admin/leads/' + lead.id, { assignee: biz.id, status: 'contacted' }, biz.headers));
  assert.ok(p.ok, p.error);
  const mine = await j(fetch(B + '/api/v1/admin/leads?assignee=me', { headers: biz.headers }));
  assert.equal(mine.total, 1);
  // careers application: HR sees the CV, Business does not
  const fd = new FormData();
  fd.append('name', 'Asha'); fd.append('email', 'asha@ex.com'); fd.append('department', 'Operations');
  fd.append('resume', new Blob(['%PDF-1.4 cv'], { type: 'application/pdf' }), 'cv.pdf');
  await fetch(B + '/api/v1/careers', { method: 'POST', body: fd });
  const hr = await makeAdmin(B, { email: 'hr@frequentresearch.com', role: 'hr' });
  const cv = (await j(fetch(B + '/api/v1/admin/leads?kind=careers', { headers: hr.headers }))).leads[0].cv;
  assert.equal((await fetch(B + '/api/v1/admin/files/' + cv.id, { headers: hr.headers })).status, 200);
  assert.equal((await fetch(B + '/api/v1/admin/files/' + cv.id, { headers: biz.headers })).status, 403);
  assert.equal((await j(fetch(B + '/api/v1/admin/leads?kind=careers', { headers: biz.headers }))).total, 0);
});

test('media: alt text and replacing a picture keeps its link', async () => {
  const png = Buffer.from('89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c4890000000d4944415478da6364f8ffbf1e0005fe02fea7d6a5cf0000000049454e44ae426082', 'hex');
  const up = await j(fetch(B + '/api/v1/admin/files?name=team.png&folder=team', { method: 'POST', headers: { ...sup.headers, 'content-type': 'image/png' }, body: png }));
  assert.equal((await req('PATCH', '/api/v1/admin/files/' + up.id, { alt: 'Our team in Noida' }, sup.headers)).status, 200);
  const rep = await j(fetch(B + '/api/v1/admin/files/' + up.id, { method: 'PUT', headers: { ...sup.headers, 'content-type': 'image/webp' }, body: Buffer.from('RIFF0000WEBPVP8 ') }));
  assert.equal(rep.id, up.id);
  const f = (await j(fetch(B + '/api/v1/admin/files?folder=team', { headers: sup.headers }))).files[0];
  assert.equal(f.alt, 'Our team in Noida');
  assert.equal(f.type, 'image/webp');
});

test('build 82.3: leadership, home numbers and hero texts save and reach the public site', async () => {
  const data = {
    leadership: { edit: { manish: { role: 'Managing Director' } } },
    'home-stats': { edit: { markets: { value: 60 } } },
    design79: { home: { line1: 'From one question' } },
  };
  for (const [k, v] of Object.entries(data)) {
    const r = await req('PUT', '/api/v1/admin/content/' + k, { data: v }, sup.headers);
    assert.equal(r.status, 200, k);
  }
  const site = await j(fetch(B + '/api/v1/site'));
  assert.equal(site.content.leadership.edit.manish.role, 'Managing Director');
  assert.equal(site.content['home-stats'].edit.markets.value, 60);
  assert.equal(site.content.design79.home.line1, 'From one question');
});
