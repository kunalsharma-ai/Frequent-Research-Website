// Build 82: new client onboarding and new vendor onboarding in the super admin.
// The two onboarding portals (their own containers: onboarding-portals/client and onboarding-portals/vendor) send every
// completed submission here, signed, next to their own copy and the SampBidx forward. The super admin sees, edits, adds
// and deletes every detail (company, addresses, tax, contacts, bank, capabilities, MSAs / agreements, documents, POC,
// renewals) and changes the forms themselves (Form fields): the portals read that set-up from here when they open.
//
//   POST   /api/v1/integrations/onboarding/:kind       a portal backend delivers one submission (kind client | vendor)
//                                                      X-FR-Onboarding-Signature: t=<unix>,v1=<hex HMAC-SHA256("<t>.<body>")>
//                                                      with ONBOARDING_SECRET (Connections & keys). Same ref twice = no change.
//   GET    /api/v1/onboarding/form/:kind               the form set-up for the portal (public, no personal data)
//   GET    /api/v1/admin/onboarding?kind=&q=&status=&poc=&expiring=&limit=&skip=&format=csv
//   GET    /api/v1/admin/onboarding/:id                one submission with everything
//   POST   /api/v1/admin/onboarding                    { kind, data, status } add one by hand
//   PUT    /api/v1/admin/onboarding/:id                { data, status, tags, owner } change it (every changed detail is logged)
//   DELETE /api/v1/admin/onboarding/:id                delete it with its files (asks for the authenticator code)
//   POST   /api/v1/admin/onboarding/:id/notes          { text } internal note
//   POST   /api/v1/admin/onboarding/:id/files?name=&label=&field=   the file as the body: add a document
//   GET    /api/v1/admin/onboarding/:id/files/:fid     download one document / signed agreement
//   DELETE /api/v1/admin/onboarding/:id/files/:fid
//   GET    /api/v1/admin/onboarding-renewals?kind=&days=   every agreement with its expiry, soonest first
//   GET    /api/v1/admin/onboarding-forms/:kind        { config, catalogue } ;  PUT { config }  (Configure right)
import crypto from 'node:crypto';
import { Router, raw } from 'express';
import { ObjectId } from 'mongodb';
import { config } from '../config.js';
import { col, files } from '../db.js';
import { ah, audit, clean, toCsv } from '../lib/util.js';
import { blind, openBytes, openData, sealBytes, sealData } from '../lib/vault.js';
import { CATALOGUE, CUSTOM_TYPES, DEFAULT_POCS, LOCKED, PRACTICES, emptySubmission } from '../lib/onboardingFields.js';
import { escapeRe } from './admin.js';

export const onboardingRouter = Router();

const KINDS = new Set(['client', 'vendor']);
export const STATUSES = ['new', 'in-review', 'approved', 'active', 'on-hold', 'rejected', 'expired', 'archived'];
const REF = /^FR-(MSA|VEN)-\d{4}-[A-Z0-9]{4,12}$/;
const OB = () => col('onboarding');
const oid = (s) => (/^[a-f0-9]{24}$/.test(String(s)) ? new ObjectId(String(s)) : null);
const who = (req) => (req.admin && req.admin.user ? { id: req.admin.user._id, email: req.admin.user.email, name: req.admin.user.name } : { name: 'portal' });
const bad = (res, error, status = 400) => res.status(status).json({ ok: false, error });

/* ---- helpers ------------------------------------------------------------------------------------------------------ */
// plain JSON only: no functions, no keys starting with $ or containing dots (MongoDB operators), limited depth and size
function sanitise(v, depth = 0) {
  if (depth > 12) return null;
  if (v === null || typeof v === 'boolean') return v;
  if (typeof v === 'number') return Number.isFinite(v) ? v : null;
  if (typeof v === 'string') return v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').slice(0, 20000);
  if (Array.isArray(v)) return v.slice(0, 500).map((x) => sanitise(x, depth + 1));
  if (typeof v === 'object') {
    const out = {};
    for (const [k, x] of Object.entries(v).slice(0, 400)) {
      if (!k || k.startsWith('$') || k.includes('.') || k.length > 80 || k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
      if (x !== undefined) out[k] = sanitise(x, depth + 1);
    }
    return out;
  }
  return null;
}
// every leaf: [['company.legalName', 'Acme'], ['contacts.management.0.email', 'a@b.co'], …]
export function flatten(v, pre = '', out = []) {
  if (v && typeof v === 'object' && !(v instanceof Date)) {
    const entries = Array.isArray(v) ? v.map((x, i) => [String(i), x]) : Object.entries(v);
    if (!entries.length) out.push([pre, Array.isArray(v) ? '' : '']);
    for (const [k, x] of entries) flatten(x, pre ? pre + '.' + k : k, out);
  } else if (pre) out.push([pre, v]);
  return out;
}
export function changedPaths(a, b) {
  const A = new Map(flatten(a || {})), B = new Map(flatten(b || {}));
  const out = [];
  for (const [k, v] of B) if (!A.has(k) || JSON.stringify(A.get(k)) !== JSON.stringify(v)) out.push(k);
  for (const k of A.keys()) if (!B.has(k)) out.push(k);
  return out;
}
// the fields lists and searches use, kept next to the full details
function summary(kind, d) {
  const ag = Array.isArray(d.agreements) ? d.agreements : [];
  const exp = ag.map((a) => a && a.expiryISO).filter((x) => /^\d{4}-\d{2}-\d{2}$/.test(x || '')).sort();
  const email = (d.sign && d.sign.email) || (d.contacts && d.contacts.signatory && d.contacts.signatory.email) || (d.contacts && d.contacts.management && d.contacts.management[0] && d.contacts.management[0].email) || (d.address && d.address.email) || '';
  return {
    company: clean(d.company && d.company.legalName, 200), trade: clean(d.company && d.company.tradeName, 200),
    country: clean(d.company && d.company.country, 4), region: clean(d.region, 10),
    poc: clean((d.poc && (d.poc.name || d.poc.custom || d.poc.id)) || '', 80), email: clean(email, 200).toLowerCase(),
    types: kind === 'vendor' && Array.isArray(d.types) ? d.types.map((t) => clean(t, 20)) : undefined,
    services: kind === 'client' && d.company && Array.isArray(d.company.services) ? d.company.services.slice(0, 60).map((s) => clean(typeof s === 'string' ? s : s && (s.name || s.id), 80)) : undefined,
    agreementCount: ag.length, nextExpiry: exp[0] || '', lastExpiry: exp[exp.length - 1] || '',
  };
}
const newRef = (kind) => `${CATALOGUE[kind].refPrefix}-${new Date().getFullYear()}-${crypto.randomBytes(5).toString('hex').toUpperCase().slice(0, 8)}`;
const docLabel = (kind, field) => {
  if (field.startsWith('agreement_')) { const c = field.slice(10); return 'Signed agreement: ' + (PRACTICES[c] || c); }
  if (field === 'logo') return 'Company logo';
  if (field === 'signature') return 'Signature';
  const id = field.replace(/^doc_/, '');
  const d = CATALOGUE[kind].docs.find((x) => x.id === id);
  return d ? d.label : id.replace(/^x_/, '').replace(/[-_]/g, ' ');
};
async function putFile(ref, kind, f, by) {
  const sealed = sealBytes(f.data); // build 82.1: stored encrypted
  const up = files().openUploadStream(String(f.name || 'file').replace(/[^\w .()-]/g, '_').slice(0, 150) || 'file', {
    metadata: { contentType: f.type || 'application/octet-stream', folder: 'onboarding', public: false, onboarding: ref, kind, field: f.field, by, enc: sealed.enc, size: f.data.length },
  });
  await new Promise((ok, no) => { up.on('finish', ok); up.on('error', no); up.end(sealed.data); });
  return { id: String(up.id), field: f.field, label: f.label || docLabel(kind, f.field), name: f.name, type: f.type, size: f.data.length, sha256: crypto.createHash('sha256').update(f.data).digest('hex'), at: new Date(), by };
}
export const readAll = (id) => new Promise((ok, no) => { const parts = []; files().openDownloadStream(id).on('data', (c) => parts.push(c)).on('error', no).on('end', () => ok(Buffer.concat(parts))); });
const pub = (r) => { if (!r) return r; const { ids, ...sum } = r.sum || {}; return { id: r._id, kind: r.kind, status: r.status, source: r.source, received: r.received, updated: r.updated, tags: r.tags || [], owner: r.owner || '', ...sum }; };
// build 82.1: details go to MongoDB with tax and bank numbers encrypted (lib/vault.js) and come back readable
const stored = (kind, data) => { const s = sealData(data); return { data: s.data, sum: { ...summary(kind, data), ids: s.ids } }; };

/* ---- the form set-up ---------------------------------------------------------------------------------------------- */
export async function formConfig(kind) {
  const doc = await col('onboarding_forms').findOne({ _id: kind });
  return (doc && doc.data) || {};
}
// what the admin may save: only known built-in paths, documents and steps; extra fields with a safe id
function checkForm(kind, c) {
  const cat = CATALOGUE[kind], known = new Set(cat.fields.map((f) => f.path)), docs = new Set(cat.docs.map((d) => d.id));
  const s = (v, n) => clean(v, n);
  const opts = (o) => (Array.isArray(o) ? o.slice(0, 300).map((x) => (typeof x === 'string' ? s(x, 120) : x && typeof x === 'object' ? { value: s(x.value ?? x.label, 120), label: s(x.label ?? x.value, 160) } : '')).filter((x) => x && (typeof x === 'string' || x.value)) : undefined);
  const out = { fields: {}, docs: {}, steps: {}, custom: [], pocs: undefined, notice: s(c && c.notice, 600) };
  for (const [p, v] of Object.entries((c && c.fields) || {})) {
    if (!known.has(p) || !v || typeof v !== 'object') continue;
    const o = {};
    if (v.hidden === true && !LOCKED.has(p)) o.hidden = true;
    if (v.required === true || (v.required === false && !LOCKED.has(p))) o.required = v.required;
    for (const k of ['label', 'placeholder', 'hint', 'info']) if (typeof v[k] === 'string' && v[k].trim()) o[k] = s(v[k], k === 'info' ? 600 : 200);
    const op = opts(v.options); if (op && op.length) o.options = op;
    o.step = cat.fields.find((f) => f.path === p).step;
    if (Object.keys(o).length > 1) out.fields[p] = o;
  }
  for (const [id, v] of Object.entries((c && c.docs) || {})) {
    if (!docs.has(id) || !v || typeof v !== 'object') continue;
    const o = {};
    if (v.hidden === true) o.hidden = true;
    if (typeof v.required === 'boolean') o.required = v.required;
    for (const k of ['label', 'hint', 'info']) if (typeof v[k] === 'string' && v[k].trim()) o[k] = s(v[k], k === 'info' ? 600 : 200);
    if (Object.keys(o).length) out.docs[id] = o;
  }
  for (const [i, v] of Object.entries((c && c.steps) || {})) {
    if (!(+i >= 0 && +i < cat.steps.length) || !v) continue;
    const o = {};
    if (typeof v.title === 'string' && v.title.trim()) o.title = s(v.title, 60);
    if (typeof v.desc === 'string' && v.desc.trim()) o.desc = s(v.desc, 200);
    if (Object.keys(o).length) out.steps[i] = o;
  }
  const ids = new Set();
  for (const f of ((c && c.custom) || []).slice(0, 120)) {
    const id = s(f && f.id, 40).toLowerCase().replace(/[^a-z0-9_-]/g, '');
    if (!id || ids.has(id) || !CUSTOM_TYPES.includes(f.type)) continue;
    ids.add(id);
    const step = Math.max(0, Math.min(cat.steps.length - 2, Math.round(+f.step || 0)));
    out.custom.push({ id, type: f.type, step, label: s(f.label, 160) || id, required: f.required === true, hidden: f.hidden === true, placeholder: s(f.placeholder, 160), hint: s(f.hint, 300), section: s(f.section, 120), options: ['select', 'multiselect', 'radio'].includes(f.type) ? opts(f.options) || [] : undefined });
  }
  if (Array.isArray(c && c.pocs)) {
    const seen = new Set();
    out.pocs = c.pocs.slice(0, 40).map((p) => ({ id: s(p && p.id, 30).toLowerCase().replace(/[^a-z0-9-]/g, '') || s(p && p.name, 30).toLowerCase().replace(/[^a-z0-9]+/g, '-'), name: s(p && p.name, 80), email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((p && p.email) || '') ? s(p.email, 200) : '' }))
      .filter((p) => p.id && p.name && !seen.has(p.id) && seen.add(p.id));
    if (!out.pocs.length) out.pocs = undefined;
  }
  return out;
}

// public: what the portal needs to draw the form (never personal data, never POC emails)
onboardingRouter.get('/onboarding/form/:kind', ah(async (req, res) => {
  const kind = String(req.params.kind);
  if (!KINDS.has(kind)) return bad(res, 'Unknown form', 404);
  const c = await formConfig(kind);
  res.set({ 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=60' });
  res.json({ ok: true, kind, version: c.version || 0, updated: c.updated || null, fields: c.fields || {}, docs: c.docs || {}, steps: c.steps || {}, custom: (c.custom || []).filter((f) => !f.hidden), pocs: c.pocs ? c.pocs.map(({ id, name }) => ({ id, name })) : undefined, notice: c.notice || '' });
}));

/* ---- a portal delivers a submission ------------------------------------------------------------------------------- */
export function verifySignature(secret, header, rawBody, now = Date.now()) {
  const m = /^t=(\d{9,12}),v1=([a-f0-9]{64})$/.exec(String(header || '').trim());
  if (!secret || !m) return false;
  if (Math.abs(now / 1000 - +m[1]) > 300) return false;
  const want = crypto.createHmac('sha256', secret).update(m[1] + '.').update(rawBody).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(want), Buffer.from(m[2]));
}

onboardingRouter.post('/integrations/onboarding/:kind', raw({ type: () => true, limit: '90mb' }), ah(async (req, res) => {
  const kind = String(req.params.kind);
  if (!KINDS.has(kind)) return bad(res, 'Unknown kind', 404);
  const secret = config.onboarding.secret;
  if (!secret) return bad(res, 'Onboarding is not connected: set ONBOARDING_SECRET in Connections & keys.', 503);
  const body = Buffer.isBuffer(req.body) ? req.body : Buffer.from('');
  if (!verifySignature(secret, req.get('x-fr-onboarding-signature'), body)) return bad(res, 'Bad or old signature', 401);
  let p;
  try { p = JSON.parse(body.toString('utf8')); } catch { return bad(res, 'Not JSON'); }
  if (!p || !REF.test(String(p.ref || '')) || (kind === 'vendor') !== String(p.ref).startsWith('FR-VEN-')) return bad(res, 'Bad reference', 422);
  if (await OB().findOne({ _id: p.ref }, { projection: { _id: 1 } })) return res.json({ ok: true, duplicate: true, ref: p.ref });
  const { files: incoming = [], ...rest } = p;
  const data = sanitise(rest);
  delete data.version;
  if (data.commercial && data.commercial.bank) delete data.commercial.bank.accountNo2;
  const saved = [], missing = [];
  for (const f of Array.isArray(incoming) ? incoming.slice(0, 60) : []) {
    const field = clean(f && f.field, 60);
    if (!field) continue;
    if (!f.data) { missing.push({ field, name: clean(f.name, 150), size: +f.size || 0, sha256: clean(f.sha256, 64), note: 'too large to send: kept on the portal server' }); continue; }
    const buf = Buffer.from(String(f.data), 'base64');
    if (f.sha256 && crypto.createHash('sha256').update(buf).digest('hex') !== f.sha256) return bad(res, `File ${field} does not match its SHA-256`, 422);
    const xm = field.startsWith('doc_x_') && Array.isArray(data.extraMeta) ? data.extraMeta.find((m) => m && 'doc_x_' + m.id === field) : null;
    saved.push(await putFile(p.ref, kind, { field, name: clean(f.name, 150) || field, type: clean(f.type, 100), data: buf, label: xm ? clean(xm.label, 160) : undefined }, 'portal'));
  }
  const now = new Date();
  const doc = { _id: p.ref, kind, status: 'new', source: 'portal', ...stored(kind, data), files: saved, missingFiles: missing, notes: [], history: [{ at: now, by: { name: 'portal' }, action: 'received' }], received: now, updated: now };
  try { await OB().insertOne(doc); }
  catch (e) { if (e.code === 11000) return res.json({ ok: true, duplicate: true, ref: p.ref }); throw e; }
  // a renewal marks the agreement it renews
  if (data.renewalOf) await OB().updateOne({ 'data.agreements.ref': String(data.renewalOf) }, { $set: { 'data.agreements.$.renewedBy': p.ref, updated: now }, $push: { history: { at: now, by: { name: 'portal' }, action: 'renewed by ' + p.ref } } });
  await audit({ ip: req.ip, headers: req.headers, admin: null, actor: { name: kind + ' onboarding portal' } }, 'onboarding-received', p.ref, { kind, company: doc.sum.company, files: saved.length });
  res.status(201).json({ ok: true, ref: p.ref, files: saved.length });
}));

/* ---- admin: lists ------------------------------------------------------------------------------------------------- */
const listFilter = (req) => {
  const f = {};
  const kind = String(req.query.kind || '');
  if (KINDS.has(kind)) f.kind = kind;
  if (STATUSES.includes(String(req.query.status || ''))) f.status = String(req.query.status);
  const poc = clean(req.query.poc, 80); if (poc) f['sum.poc'] = { $regex: '^' + escapeRe(poc), $options: 'i' };
  const country = clean(req.query.country, 4); if (country) f['sum.country'] = country.toUpperCase();
  const q = clean(req.query.q, 100);
  if (q) { const re = { $regex: escapeRe(q), $options: 'i' }; f.$or = [{ _id: re }, { 'sum.company': re }, { 'sum.trade': re }, { 'sum.email': re }, { 'sum.poc': re }, { 'data.agreements.ref': re }]; const h = blind(q); if (h) f.$or.push({ 'sum.ids': h }); } // tax / bank numbers: exact match on the keyed hash
  const days = +req.query.expiring;
  if (days > 0) f['sum.nextExpiry'] = { $gte: new Date().toISOString().slice(0, 10), $lte: new Date(Date.now() + days * 864e5).toISOString().slice(0, 10) };
  return f;
};

onboardingRouter.get('/admin/onboarding', ah(async (req, res) => {
  const f = listFilter(req);
  if (req.query.format === 'csv') {
    const rows = await OB().find(f).sort({ received: -1 }).limit(20000).toArray();
    const base = ['ref', 'kind', 'status', 'received', 'updated', 'source', 'company', 'country', 'poc', 'email', 'agreements', 'nextExpiry', 'files', 'notes'];
    const extra = new Set();
    const flat = rows.map((r) => {
      r.data = openData(r.data);
      const o = { ref: r._id, kind: r.kind, status: r.status, received: r.received && r.received.toISOString(), updated: r.updated && r.updated.toISOString(), source: r.source, company: r.sum.company, country: r.sum.country, poc: r.sum.poc, email: r.sum.email,
        agreements: (r.data.agreements || []).map((a) => `${a.code} ${a.ref} → ${a.expiryISO}`).join('; '), nextExpiry: r.sum.nextExpiry, files: (r.files || []).map((x) => x.label + ': ' + x.name).join('; '), notes: (r.notes || []).map((n) => n.text).join(' | ') };
      for (const [k, v] of flatten(r.data)) { if (k.startsWith('agreements.')) continue; extra.add(k); o[k] = Array.isArray(v) ? v.join('; ') : v; }
      return o;
    });
    res.set({ 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="${(req.query.kind || 'onboarding')}-onboarding-${new Date().toISOString().slice(0, 10)}.csv"` });
    await audit(req, 'onboarding-export', String(req.query.kind || 'all'), { rows: rows.length });
    return res.send(toCsv([...base, ...[...extra].sort()], flat));
  }
  const limit = Math.min(500, Math.max(1, +req.query.limit || 100)), skip = Math.max(0, +req.query.skip || 0);
  const [rows, total, by] = await Promise.all([
    OB().find(f, { projection: { data: 0, history: 0 } }).sort({ received: -1 }).skip(skip).limit(limit).toArray(),
    OB().countDocuments(f),
    OB().aggregate([{ $match: KINDS.has(String(req.query.kind)) ? { kind: String(req.query.kind) } : {} }, { $group: { _id: '$status', n: { $sum: 1 } } }]).toArray(),
  ]);
  const soon = new Date(Date.now() + 30 * 864e5).toISOString().slice(0, 10), today = new Date().toISOString().slice(0, 10);
  const expiring = await OB().countDocuments({ ...(KINDS.has(String(req.query.kind)) ? { kind: String(req.query.kind) } : {}), 'sum.nextExpiry': { $gte: today, $lte: soon } });
  res.json({ ok: true, total, rows: rows.map((r) => ({ ...pub(r), files: (r.files || []).length, notes: (r.notes || []).length })), counts: Object.fromEntries(by.map((x) => [x._id, x.n])), expiring30: expiring, statuses: STATUSES });
}));

onboardingRouter.get('/admin/onboarding-renewals', ah(async (req, res) => {
  const kind = String(req.query.kind || '');
  const days = Math.min(3650, Math.max(1, +req.query.days || 365));
  const until = new Date(Date.now() + days * 864e5).toISOString().slice(0, 10);
  const rows = await OB().find({ ...(KINDS.has(kind) ? { kind } : {}), 'data.agreements.0': { $exists: true } }, { projection: { kind: 1, status: 1, sum: 1, 'data.agreements': 1, 'data.sign': 1 } }).limit(5000).toArray();
  const today = new Date().toISOString().slice(0, 10);
  const out = [];
  for (const r of rows) for (const a of r.data.agreements || []) {
    if (!a || !a.expiryISO || a.expiryISO > until) continue;
    const left = Math.round((Date.parse(a.expiryISO) - Date.parse(today)) / 864e5);
    out.push({ id: r._id, kind: r.kind, status: r.status, company: r.sum.company, poc: r.sum.poc, email: (r.data.sign && r.data.sign.email) || r.sum.email, code: a.code, title: a.title || PRACTICES[a.code] || a.code, ref: a.ref, effective: a.effective, expiryISO: a.expiryISO, daysLeft: left, renewedBy: a.renewedBy || '', state: a.renewedBy ? 'renewed' : left < 0 ? 'expired' : left <= 30 ? 'due' : 'ok' });
  }
  out.sort((a, b) => a.expiryISO.localeCompare(b.expiryISO));
  res.json({ ok: true, rows: out });
}));

/* ---- admin: one submission ---------------------------------------------------------------------------------------- */
const one = async (id) => { const r = await OB().findOne({ _id: String(id) }); if (r) r.data = openData(r.data); return r; };
onboardingRouter.get('/admin/onboarding/:id', ah(async (req, res) => {
  const r = await one(req.params.id);
  if (!r) return bad(res, 'Not found', 404);
  res.json({ ok: true, item: { ...pub(r), data: r.data, files: r.files || [], missingFiles: r.missingFiles || [], notes: r.notes || [], history: (r.history || []).slice(-200) } });
}));

onboardingRouter.post('/admin/onboarding', ah(async (req, res) => {
  const b = req.body || {};
  const kind = String(b.kind || '');
  if (!KINDS.has(kind)) return bad(res, 'Choose client or vendor');
  const data = sanitise({ ...emptySubmission(kind), ...(b.data && typeof b.data === 'object' ? b.data : {}) });
  if (!clean(data.company && data.company.legalName, 200)) return bad(res, kind === 'vendor' ? 'Enter the vendor\'s legal name.' : 'Enter the client\'s legal name.', 422);
  let ref = REF.test(String(b.ref || '')) && String(b.ref).startsWith(CATALOGUE[kind].refPrefix) ? String(b.ref) : newRef(kind);
  if (await one(ref)) ref = newRef(kind);
  data.ref = ref;
  const now = new Date();
  const doc = { _id: ref, kind, status: STATUSES.includes(b.status) ? b.status : 'new', source: 'admin', ...stored(kind, data), files: [], missingFiles: [], notes: [], history: [{ at: now, by: who(req), action: 'added in the admin' }], received: now, updated: now, tags: [], owner: '' };
  await OB().insertOne(doc);
  await audit(req, 'onboarding-add', ref, { kind, company: doc.sum.company });
  res.status(201).json({ ok: true, id: ref, item: pub(doc) });
}));

onboardingRouter.put('/admin/onboarding/:id', ah(async (req, res) => {
  const r = await one(req.params.id);
  if (!r) return bad(res, 'Not found', 404);
  const b = req.body || {}, set = {}, now = new Date();
  const hist = [];
  if (b.data !== undefined) {
    if (!b.data || typeof b.data !== 'object' || Array.isArray(b.data)) return bad(res, 'Bad details');
    const data = sanitise(b.data);
    data.ref = r._id;
    if (!clean(data.company && data.company.legalName, 200)) return bad(res, 'The legal name cannot be empty.', 422);
    const changed = changedPaths(r.data, data);
    if (changed.length) { Object.assign(set, stored(r.kind, data)); hist.push({ at: now, by: who(req), action: 'edited', changes: changed.slice(0, 300) }); }
  }
  if (b.status !== undefined && b.status !== r.status) {
    if (!STATUSES.includes(b.status)) return bad(res, 'Unknown status');
    set.status = b.status; hist.push({ at: now, by: who(req), action: `status ${r.status} → ${b.status}` });
  }
  if (Array.isArray(b.tags)) set.tags = [...new Set(b.tags.map((t) => clean(t, 40)).filter(Boolean))].slice(0, 30);
  if (b.owner !== undefined) set.owner = clean(b.owner, 120);
  if (Array.isArray(b.fileLabels)) {
    const labels = new Map(b.fileLabels.map((x) => [String(x && x.id), clean(x && x.label, 160)]));
    set.files = (r.files || []).map((f) => (labels.get(f.id) ? { ...f, label: labels.get(f.id) } : f));
  }
  if (!Object.keys(set).length) return res.json({ ok: true, unchanged: true });
  set.updated = now;
  await OB().updateOne({ _id: r._id }, { $set: set, ...(hist.length ? { $push: { history: { $each: hist, $slice: -500 } } } : {}) });
  await audit(req, 'onboarding-edit', r._id, { kind: r.kind, status: set.status, changes: hist.flatMap((h) => h.changes || []).slice(0, 50) });
  res.json({ ok: true, changes: hist.flatMap((h) => h.changes || []).length });
}));

onboardingRouter.delete('/admin/onboarding/:id', ah(async (req, res) => {
  const r = await one(req.params.id);
  if (!r) return bad(res, 'Not found', 404);
  for (const f of r.files || []) { const id = oid(f.id); if (id) await files().delete(id).catch(() => {}); }
  await OB().deleteOne({ _id: r._id });
  await audit(req, 'onboarding-delete', r._id, { kind: r.kind, company: r.sum && r.sum.company, files: (r.files || []).length });
  res.json({ ok: true });
}));

onboardingRouter.post('/admin/onboarding/:id/notes', ah(async (req, res) => {
  const text = clean((req.body || {}).text, 4000);
  if (!text) return bad(res, 'Write a note first');
  const note = { id: crypto.randomBytes(5).toString('hex'), at: new Date(), by: who(req), text };
  const u = await OB().updateOne({ _id: String(req.params.id) }, { $push: { notes: note }, $set: { updated: new Date() } });
  if (!u.matchedCount) return bad(res, 'Not found', 404);
  await audit(req, 'onboarding-note', String(req.params.id));
  res.status(201).json({ ok: true, note });
}));
onboardingRouter.delete('/admin/onboarding/:id/notes/:nid', ah(async (req, res) => {
  const u = await OB().updateOne({ _id: String(req.params.id) }, { $pull: { notes: { id: String(req.params.nid) } } });
  if (!u.modifiedCount) return bad(res, 'Not found', 404);
  await audit(req, 'onboarding-note-delete', String(req.params.id));
  res.json({ ok: true });
}));

const DOC_TYPES = /^(application\/pdf|image\/(jpeg|png|webp|gif|heic|heif|svg\+xml)|application\/(zip|msword|vnd\.openxmlformats-officedocument\.(wordprocessingml\.document|spreadsheetml\.sheet|presentationml\.presentation)|vnd\.ms-excel|vnd\.ms-powerpoint)|text\/(csv|plain))$/;
onboardingRouter.post('/admin/onboarding/:id/files', raw({ type: () => true, limit: Math.max(config.uploadMb, 20) + 'mb' }), ah(async (req, res) => {
  const r = await one(req.params.id);
  if (!r) return bad(res, 'Not found', 404);
  const type = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!DOC_TYPES.test(type)) return bad(res, 'Use a PDF, picture, Word, Excel, PowerPoint, CSV, TXT or ZIP file.', 415);
  if (!Buffer.isBuffer(req.body) || !req.body.length) return bad(res, 'Empty file');
  const field = clean(req.query.field, 50).replace(/[^\w-]/g, '') || 'doc_x_admin';
  const f = await putFile(r._id, r.kind, { field, name: clean(req.query.name, 150) || 'document', type, data: req.body, label: clean(req.query.label, 160) || undefined }, who(req).email || 'admin');
  await OB().updateOne({ _id: r._id }, { $push: { files: f, history: { at: new Date(), by: who(req), action: 'added file ' + f.name } }, $set: { updated: new Date() } });
  await audit(req, 'onboarding-file-add', r._id, { name: f.name, size: f.size });
  res.status(201).json({ ok: true, file: f });
}));

onboardingRouter.get('/admin/onboarding/:id/files/:fid', ah(async (req, res) => {
  const r = await one(req.params.id);
  const f = r && (r.files || []).find((x) => x.id === String(req.params.fid));
  const id = f && oid(f.id);
  const meta = id && (await col('files.files').findOne({ _id: id }));
  if (!meta) return bad(res, 'Not found', 404);
  const type = meta.metadata?.contentType || 'application/octet-stream';
  const inline = req.query.inline === '1' && /^(application\/pdf|image\/(jpeg|png|webp|gif))$/.test(type);
  res.set({ 'Content-Type': type, 'Content-Length': meta.length, 'Cache-Control': 'no-store', 'Content-Security-Policy': "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'", 'Content-Disposition': `${inline ? 'inline' : 'attachment'}; filename="${String(f.name || meta.filename).replace(/["\\\r\n]/g, '')}"` });
  if (meta.metadata?.enc) { const buf = openBytes(await readAll(id)); res.set('Content-Length', buf.length); return res.end(buf); }
  files().openDownloadStream(id).on('error', () => res.destroy()).pipe(res);
}));

onboardingRouter.delete('/admin/onboarding/:id/files/:fid', ah(async (req, res) => {
  const r = await one(req.params.id);
  const f = r && (r.files || []).find((x) => x.id === String(req.params.fid));
  if (!f) return bad(res, 'Not found', 404);
  const id = oid(f.id); if (id) await files().delete(id).catch(() => {});
  await OB().updateOne({ _id: r._id }, { $pull: { files: { id: f.id } }, $push: { history: { at: new Date(), by: who(req), action: 'deleted file ' + f.name } }, $set: { updated: new Date() } });
  await audit(req, 'onboarding-file-delete', r._id, { name: f.name });
  res.json({ ok: true });
}));

/* ---- admin: the forms --------------------------------------------------------------------------------------------- */
onboardingRouter.get('/admin/onboarding-forms/:kind', ah(async (req, res) => {
  const kind = String(req.params.kind);
  if (!KINDS.has(kind)) return bad(res, 'Unknown form', 404);
  const c = await formConfig(kind);
  res.json({ ok: true, config: { fields: {}, docs: {}, steps: {}, custom: [], notice: '', ...c, pocs: c.pocs || DEFAULT_POCS }, catalogue: { ...CATALOGUE[kind], locked: [...LOCKED], customTypes: CUSTOM_TYPES, empty: emptySubmission(kind), statuses: STATUSES, practices: PRACTICES } });
}));

onboardingRouter.put('/admin/onboarding-forms/:kind', ah(async (req, res) => {
  const kind = String(req.params.kind);
  if (!KINDS.has(kind)) return bad(res, 'Unknown form', 404);
  const before = await formConfig(kind);
  const c = checkForm(kind, (req.body || {}).config || {});
  c.version = (before.version || 0) + 1;
  c.updated = new Date().toISOString();
  await col('onboarding_forms').updateOne({ _id: kind }, { $set: { data: c, updated: new Date(), by: who(req).email }, $push: { history: { $each: [{ at: new Date(), by: who(req).email, data: before }], $slice: -50 } } }, { upsert: true });
  await audit(req, 'onboarding-form', kind, { version: c.version, fields: Object.keys(c.fields).length, custom: c.custom.length });
  res.json({ ok: true, config: c });
}));
