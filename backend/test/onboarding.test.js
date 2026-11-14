// Build 82: client & vendor onboarding in the super admin. Run: npm test (needs MongoDB, see api.test.js)
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';

process.env.REVIEW_SECRET = 'test-secret';
process.env.PUBLISH_MODE = 'auto';
process.env.ONBOARDING_SECRET = 'onboarding-test-secret-0123456789abcdef';
const { connectDb, closeDb, dropDb } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { makeAdmin, code } = await import('./helpers.js');
let server, B, sup, biz, viewer;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test_ob_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  sup = await makeAdmin(B, { email: 'super@frequentresearch.com', name: 'Test Super' });
  biz = await makeAdmin(B, { email: 'biz@frequentresearch.com', name: 'Biz', role: 'business' });
  viewer = await makeAdmin(B, { email: 'view@frequentresearch.com', name: 'Viewer', role: 'viewer' });
});
after(async () => { server.close(); await dropDb(); await closeDb(); });

const sign = (raw, secret = process.env.ONBOARDING_SECRET, t = Math.floor(Date.now() / 1000)) => `t=${t},v1=${crypto.createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex')}`;
const deliver = (kind, payload, sig) => { const raw = JSON.stringify(payload); return fetch(`${B}/api/v1/integrations/onboarding/${kind}`, { method: 'POST', headers: { 'content-type': 'application/json', 'x-fr-onboarding-signature': sig ?? sign(raw) }, body: raw }); };
const api = (who, method, p, body) => fetch(B + '/api/v1' + p, { method, headers: { 'content-type': 'application/json', ...who.headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const j = async (r) => (await r).json();

const pdf = Buffer.from('%PDF-1.4 signed MSA');
const client = {
  version: 1, ref: 'FR-MSA-2026-ABC123', submittedAt: '2026-11-12T10:00:00Z',
  poc: { id: 'kunal', custom: '', name: 'Kunal Sharma' }, region: 'IN',
  company: { country: 'IN', legalName: 'Acme Insights Private Limited', industry: 'FMCG', services: ['Online surveys'] },
  address: { registered: { line1: '1 Main Road', city: 'New Delhi', state: 'Delhi', postal: '110001', country: 'IN' }, billingSame: true },
  tax: { gstin: '07AAACA1234A1Z5', pan: 'AAACA1234A' },
  contacts: { management: [{ name: 'Asha Rao', email: 'asha@acme.in' }], finance: { name: 'Ravi', email: 'ap@acme.in' } },
  commercial: { paymentTerms: '30', currency: 'INR' },
  sign: { name: 'Asha Rao', email: 'asha@acme.in', tz: 'Asia/Kolkata' },
  extra: { gst_note: 'Exempt in SEZ' },
  agreements: [{ practice: 'mr', code: 'MR', title: 'Market Research', ref: 'FR-MR-2026-XYZ1', expiryISO: '2027-11-11', effective: '12 November 2026', expiry: '11 November 2027' }],
  files: [{ field: 'agreement_MR', name: 'MSA_MR.pdf', type: 'application/pdf', size: pdf.length, sha256: crypto.createHash('sha256').update(pdf).digest('hex'), data: pdf.toString('base64') },
    { field: 'doc_big', name: 'huge.zip', type: 'application/zip', size: 40e6, sha256: 'a'.repeat(64) }],
};

test('a portal delivery needs the right signature, is stored once and shows in the admin', async () => {
  assert.equal((await deliver('client', client, 't=1,v1=' + 'a'.repeat(64))).status, 401);
  assert.equal((await deliver('client', client, sign(JSON.stringify(client), 'wrong'))).status, 401);
  assert.equal((await deliver('client', client, sign(JSON.stringify(client), undefined, Math.floor(Date.now() / 1000) - 900))).status, 401);
  assert.equal((await deliver('vendor', client)).status, 422); // client ref on the vendor door
  const r = await deliver('client', client);
  assert.equal(r.status, 201);
  assert.equal((await j(deliver('client', client))).duplicate, true);
  const list = await j(api(sup, 'GET', '/admin/onboarding?kind=client'));
  assert.equal(list.total, 1);
  assert.equal(list.rows[0].company, 'Acme Insights Private Limited');
  assert.equal(list.rows[0].nextExpiry, '2027-11-11');
  assert.equal(list.rows[0].poc, 'Kunal Sharma');
  const one = (await j(api(sup, 'GET', '/admin/onboarding/FR-MSA-2026-ABC123'))).item;
  assert.equal(one.data.tax.gstin, '07AAACA1234A1Z5');
  assert.equal(one.data.extra.gst_note, 'Exempt in SEZ');
  assert.equal(one.files.length, 1);
  assert.equal(one.files[0].label, 'Signed agreement: Market Research');
  assert.equal(one.missingFiles[0].field, 'doc_big');
  const dl = await fetch(`${B}/api/v1/admin/onboarding/FR-MSA-2026-ABC123/files/${one.files[0].id}`, { headers: sup.headers });
  assert.equal(Buffer.from(await dl.arrayBuffer()).toString(), '%PDF-1.4 signed MSA');
  // not in the media library, not public
  assert.equal((await fetch(`${B}/api/v1/files/${one.files[0].id}`)).status, 404);
  assert.ok(!(await j(api(sup, 'GET', '/admin/files'))).files.some((f) => f.id === one.files[0].id));
  // search by the whole GSTIN (exact: it is stored encrypted) and by agreement reference
  assert.equal((await j(api(sup, 'GET', '/admin/onboarding?q=07AAACA1234A1Z5'))).total, 1);
  assert.equal((await j(api(sup, 'GET', '/admin/onboarding?q=07AAACA'))).total, 0);
  assert.equal((await j(api(sup, 'GET', '/admin/onboarding?q=FR-MR-2026-XYZ1'))).total, 1);
});

test('edit every detail, status, notes and documents; changes are logged; CSV has every field', async () => {
  const id = 'FR-MSA-2026-ABC123';
  const item = (await j(api(sup, 'GET', '/admin/onboarding/' + id))).item;
  const data = { ...item.data, company: { ...item.data.company, tradeName: 'Acme' }, contacts: { ...item.data.contacts, references: [{ company: 'Ref Co', email: 'r@ref.co' }] } };
  data.agreements[0].expiryISO = '2027-12-31';
  const r = await j(api(sup, 'PUT', '/admin/onboarding/' + id, { data, status: 'approved', tags: ['key account'] }));
  assert.equal(r.ok, true);
  const after = (await j(api(sup, 'GET', '/admin/onboarding/' + id))).item;
  assert.equal(after.data.company.tradeName, 'Acme');
  assert.equal(after.data.company.$where, undefined);
  assert.equal(after.status, 'approved');
  assert.equal(after.nextExpiry, '2027-12-31');
  const edit = after.history.find((h) => h.action === 'edited');
  assert.ok(edit.changes.includes('company.tradeName') && edit.changes.includes('agreements.0.expiryISO'));
  assert.equal((await api(sup, 'PUT', '/admin/onboarding/' + id, { data: { ...data, company: { legalName: '' } } })).status, 422);
  // notes
  const n = await j(api(sup, 'POST', `/admin/onboarding/${id}/notes`, { text: 'Called the client' }));
  assert.equal(n.note.text, 'Called the client');
  // a document added in the admin
  const up = await j(fetch(`${B}/api/v1/admin/onboarding/${id}/files?name=extra.pdf&label=Signed%20NDA`, { method: 'POST', headers: { ...sup.headers, 'content-type': 'application/pdf' }, body: Buffer.from('%PDF nda') }));
  assert.equal(up.file.label, 'Signed NDA');
  assert.equal((await fetch(`${B}/api/v1/admin/onboarding/${id}/files?name=x.html`, { method: 'POST', headers: { ...sup.headers, 'content-type': 'text/html' }, body: '<b>' })).status, 415);
  assert.equal((await api(sup, 'DELETE', `/admin/onboarding/${id}/files/${up.file.id}`)).status, 200);
  // CSV export (an export asks for the authenticator code)
  await api(sup, 'POST', '/admin/step-up', { code: code(sup.secret, 1) });
  const csv = await (await fetch(`${B}/api/v1/admin/onboarding?kind=client&format=csv`, { headers: sup.headers })).text();
  assert.match(csv, /tax\.gstin/);
  assert.match(csv, /07AAACA1234A1Z5/);
  assert.match(csv, /extra\.gst_note/);
  // renewals list
  const ren = await j(api(sup, 'GET', '/admin/onboarding-renewals?kind=client&days=800'));
  assert.equal(ren.rows[0].ref, 'FR-MR-2026-XYZ1');
});

test('add by hand and delete (with the authenticator code)', async () => {
  const r = await j(api(sup, 'POST', '/admin/onboarding', { kind: 'vendor', data: { company: { legalName: 'Atlas Panels LLC' }, types: ['sample'], commercial: { bank: { accountNo: '1234567890' } } } }));
  assert.match(r.id, /^FR-VEN-\d{4}-/);
  const it = (await j(api(sup, 'GET', '/admin/onboarding/' + r.id))).item;
  assert.equal(it.data.commercial.bank.accountNo, '1234567890');
  assert.ok(Array.isArray(it.data.caps.sample.countries)); // the empty form shape is filled in
  assert.equal((await api(sup, 'POST', '/admin/onboarding', { kind: 'vendor', data: {} })).status, 422);
  assert.equal((await api(sup, 'DELETE', '/admin/onboarding/' + r.id)).status, 200); // step-up done in the test above
  assert.equal((await api(sup, 'GET', '/admin/onboarding/' + r.id)).status, 404);
});

test('roles: Business Admin edits but cannot delete or change the form; Viewer sees nothing', async () => {
  assert.equal((await api(biz, 'GET', '/admin/onboarding')).status, 200);
  assert.equal((await api(biz, 'DELETE', '/admin/onboarding/FR-MSA-2026-ABC123')).status, 403);
  assert.equal((await api(biz, 'PUT', '/admin/onboarding-forms/client', { config: {} })).status, 403);
  assert.equal((await api(viewer, 'GET', '/admin/onboarding')).status, 403);
  assert.equal((await api(viewer, 'GET', '/admin/onboarding/FR-MSA-2026-ABC123')).status, 403);
});

test('form set-up: saved by the admin, checked, and served to the portal without POC emails', async () => {
  const g = await j(api(sup, 'GET', '/admin/onboarding-forms/client'));
  assert.ok(g.catalogue.fields.some((f) => f.path === 'tax.gstin'));
  assert.equal(g.config.pocs.length, 4);
  const config = {
    fields: { 'tax.tan': { hidden: true }, 'company.linkedin': { required: true, label: 'LinkedIn URL' }, 'company.legalName': { hidden: true, required: false, label: 'Legal name' }, 'not.a.field': { hidden: true }, 'company.employees': { options: ['1-10', { value: '11+', label: '11 or more' }] } },
    docs: { profile: { required: true }, nope: { hidden: true } },
    steps: { 0: { title: 'Your company' } },
    custom: [{ id: 'SEZ Unit!', type: 'radio', step: 1, label: 'SEZ unit?', options: ['Yes', 'No'], required: true }, { id: 'x', type: 'script' }, { id: 'hidden1', type: 'text', hidden: true }],
    pocs: [{ id: 'kunal', name: 'Kunal Sharma', email: 'kunal@frequentresearch.com' }, { name: 'New Person' }],
  };
  const s = await j(api(sup, 'PUT', '/admin/onboarding-forms/client', { config }));
  assert.equal(s.ok, true);
  assert.deepEqual(s.config.fields['tax.tan'], { hidden: true, step: 1 });
  assert.equal(s.config.fields['company.legalName'].hidden, undefined); // locked: cannot be hidden or optional
  assert.equal(s.config.fields['company.legalName'].label, 'Legal name');
  assert.equal(s.config.fields['not.a.field'], undefined);
  assert.equal(s.config.docs.nope, undefined);
  assert.equal(s.config.custom.length, 2);
  assert.equal(s.config.custom[0].id, 'sezunit');
  const pub = await j(fetch(B + '/api/v1/onboarding/form/client'));
  assert.equal(pub.fields['company.linkedin'].required, true);
  assert.equal(pub.steps[0].title, 'Your company');
  assert.equal(pub.custom.length, 1); // hidden extra field not sent
  assert.deepEqual(pub.pocs, [{ id: 'kunal', name: 'Kunal Sharma' }, { id: 'new-person', name: 'New Person' }]);
  assert.equal(pub.version, 1);
  assert.equal((await fetch(B + '/api/v1/onboarding/form/other')).status, 404);
});

// build 82.1: tax/bank numbers and documents are encrypted in MongoDB, readable in the admin, searchable by exact value
test('sensitive onboarding data is encrypted at rest', async () => {
  const { col } = await import('../src/db.js');
  const raw = await col('onboarding').findOne({ _id: 'FR-MSA-2026-ABC123' });
  assert.match(raw.data.tax.gstin, /^enc:v1:/);
  assert.match(raw.data.tax.pan, /^enc:v1:/);
  assert.ok(!JSON.stringify(raw).includes('AAACA1234A'), 'the PAN must not appear in clear anywhere in the record');
  assert.equal(raw.data.company.legalName, 'Acme Insights Private Limited'); // ordinary details stay searchable
  const s = await j(api(sup, 'GET', '/admin/onboarding?kind=client&q=' + encodeURIComponent('aaaca 1234a')));
  assert.equal(s.total, 1, 'exact PAN search still finds the record');
  assert.ok(!('ids' in s.rows[0]), 'search hashes never leave the server');
  const one = (await j(api(sup, 'GET', '/admin/onboarding/FR-MSA-2026-ABC123'))).item;
  const f = one.files.find((x) => x.field === 'agreement_MR');
  const { ObjectId } = await import('mongodb');
  const chunks = await col('files.chunks').find({ files_id: new ObjectId(f.id) }).toArray();
  const stored = Buffer.concat(chunks.map((c) => c.data.buffer));
  assert.ok(!stored.includes(Buffer.from('%PDF')), 'the document is not stored in clear');
  const dl = await fetch(`${B}/api/v1/admin/onboarding/FR-MSA-2026-ABC123/files/${f.id}`, { headers: sup.headers });
  assert.equal(Buffer.from(await dl.arrayBuffer()).toString(), '%PDF-1.4 signed MSA');
  const dl2 = await fetch(`${B}/api/v1/admin/files/${f.id}`, { headers: sup.headers });
  assert.equal(Buffer.from(await dl2.arrayBuffer()).toString(), '%PDF-1.4 signed MSA');
  // an edit keeps the numbers encrypted
  const d = structuredClone(one.data); d.tax.pan = 'AAACA9999A';
  assert.equal((await api(sup, 'PUT', '/admin/onboarding/FR-MSA-2026-ABC123', { data: d })).status, 200);
  const raw2 = await col('onboarding').findOne({ _id: 'FR-MSA-2026-ABC123' });
  assert.match(raw2.data.tax.pan, /^enc:v1:/);
  assert.equal((await j(api(sup, 'GET', '/admin/onboarding/FR-MSA-2026-ABC123'))).item.data.tax.pan, 'AAACA9999A');
});

test('request bodies with MongoDB operator keys are refused', async () => {
  const r = await fetch(`${B}/api/v1/admin/login`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ email: { $ne: '' }, password: { $gt: '' } }) });
  assert.equal(r.status, 400);
  const r2 = await api(sup, 'PUT', '/admin/onboarding/FR-MSA-2026-ABC123', { data: { company: { legalName: 'X', $where: '1' } } });
  assert.equal(r2.status, 400);
  assert.equal(r.headers.get('x-frame-options'), 'DENY');
});
