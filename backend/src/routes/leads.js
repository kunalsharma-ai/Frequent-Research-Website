// Every enquiry form, download form and careers application on the website (docs/go-live/09-FORMS.md).
//   POST /api/v1/enquiry, /resource-download, /case-study-download, /download   -> { ok, id }
//   POST /api/v1/careers           multipart form with the CV in "resume" (PDF / DOC / DOCX, max 5 MB)
//   GET  /api/v1/admin/leads       saved leads, newest first (?kind=&status=&q=&from=&to=&limit=&skip=&format=csv)
//   GET  /api/v1/admin/leads/:id   one lead
//   PATCH  /api/v1/admin/leads/:id { status, note }   status: new | contacted | qualified | won | lost | spam
//   DELETE /api/v1/admin/leads/:id
// Leads are stored in MongoDB ("leads") and, when LEAD_WEBHOOK is set, also POSTed there as JSON.
import { Router } from 'express';
import busboy from 'busboy';
import { ObjectId } from 'mongodb';
import { config } from '../config.js';
import { col, files } from '../db.js';
import { ah, audit, clean, EMAIL, hashIp, newId, page, plain, rateLimit, requireAdmin, toCsv } from '../lib/util.js';
import { can } from '../lib/auth.js';
import { mailReady, sendMail } from '../lib/mailer.js';
import { escapeRe } from './admin.js';
import { onLead } from './marketing.js';
import { sendToSampcrew } from './integrations.js';
import { sfEmit, sfLead } from './sampforce.js';

const KINDS = ['enquiry', 'download', 'case-study-download', 'resource-download'];
export const LEAD_STATUS = ['new', 'contacted', 'qualified', 'won', 'lost', 'spam'];

export async function saveLead(req, kind, body, extra = {}) {
  const lead = { _id: newId('l_'), at: new Date(), kind, status: 'new', ip: hashIp(req.ip), ua: clean(req.headers['user-agent'], 200), ...plain(body), ...extra };
  delete lead.website;
  // build 78: form fields the super admin added arrive as `extra` (a JSON string when the form sends a file, app/cms78.jsx)
  if (typeof lead.extra === 'string') { try { lead.extra = JSON.parse(lead.extra); } catch { lead.extra = { note: clean(lead.extra, 2000) }; } }
  if (lead.extra && (typeof lead.extra !== 'object' || Array.isArray(lead.extra))) delete lead.extra;
  else if (lead.extra) lead.extra = Object.fromEntries(Object.entries(lead.extra).slice(0, 30).map(([k, v]) => [clean(k, 80).replace(/[.$]/g, '_'), clean(Array.isArray(v) ? v.join(', ') : String(v ?? ''), 2000)]));
  if (lead.formKey) lead.formKey = clean(lead.formKey, 80);
  if (lead.email) lead.email = clean(lead.email, 160).toLowerCase();
  await col('leads').insertOne(lead);
  console.log(`[leads] ${lead._id} ${kind} ${String(lead.email || '').replace(/^(.).*@/, '$1***@')}`);
  if (config.leadWebhook) {
    const { _id, ...rest } = lead;
    fetch(config.leadWebhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: _id, ...rest }), signal: AbortSignal.timeout(8000) })
      .catch((e) => console.error('[leads] webhook failed:', e.message));
  }
  // build 78: contact list, automatic emails (reply, team alert, follow-ups) and, for careers, SampCrew
  onLead(lead).catch(() => {});
  if (kind === 'careers') sendToSampcrew(lead).catch((e) => console.error('[sampcrew]', e.message));
  // Sampforce (sales app): the lead goes out on the signed webhook when one is set (routes/sampforce.js)
  sfEmit(kind === 'careers' ? 'careers.created' : 'lead.created', sfLead(lead));
  return lead;
}

const valid = (b, res) => {
  if (!b || typeof b !== 'object' || Array.isArray(b)) { res.status(400).json({ ok: false, error: 'Invalid request.' }); return false; }
  if (b.website) { res.json({ ok: true }); return false; } // honeypot: pretend success
  if (!EMAIL.test(clean(b.email, 160))) { res.status(422).json({ ok: false, error: 'Enter a valid email.' }); return false; }
  return true;
};

export const leadsRouter = Router();
const limit = rateLimit('ld', 20, 3600e3, 'Too many requests from this connection. Please try again later.');

for (const kind of KINDS) {
  leadsRouter.post('/' + kind, limit, ah(async (req, res, next) => {
    if (config.dev) { console.log('[dev]', req.path, JSON.stringify(req.body).slice(0, 500)); return res.json({ ok: true, message: 'Received (local test, nothing was sent).' }); }
    if (!config.leads) return next(); // LEADS=off: another service answers these paths
    if (!valid(req.body, res)) return;
    const lead = await saveLead(req, kind, req.body);
    res.json({ ok: true, id: lead._id, message: 'Thank you. Our team will get back to you shortly.' });
  }));
}

// careers: fields plus one CV file, read with busboy; the CV goes to GridFS (private: only the super admin can open it)
const CV_TYPES = { 'application/pdf': '.pdf', 'application/msword': '.doc', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx' };
leadsRouter.post('/careers', rateLimit('cv', 6, 3600e3, 'Too many applications from this connection. Please try again later.'), (req, res, next) => {
  if (!/multipart\/form-data/i.test(req.headers['content-type'] || '')) return res.status(400).json({ ok: false, error: 'Invalid request.' });
  let bb;
  try { bb = busboy({ headers: req.headers, limits: { fileSize: 5 * 1024 * 1024, files: 1, fields: 40, fieldSize: 8000 } }); } catch { return res.status(400).json({ ok: false, error: 'Invalid request.' }); }
  const fields = {}; let fileP = null, tooBig = false, badType = false;
  bb.on('field', (k, v) => { if (Object.keys(fields).length < 40) fields[k.slice(0, 60)] = v; });
  bb.on('file', (name, stream, info) => {
    const type = CV_TYPES[info.mimeType] ? info.mimeType : /\.pdf$/i.test(info.filename) ? 'application/pdf' : /\.docx$/i.test(info.filename) ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' : /\.doc$/i.test(info.filename) ? 'application/msword' : '';
    if (name !== 'resume' || !type) { badType = true; stream.resume(); return; }
    const fname = clean(info.filename, 120).replace(/[^\w .()-]/g, '_') || 'cv' + CV_TYPES[type];
    const up = files().openUploadStream(fname, { metadata: { contentType: type, folder: 'careers', public: false, by: 'visitor' } });
    stream.on('limit', () => { tooBig = true; });
    fileP = new Promise((ok, bad) => { up.on('finish', () => ok({ id: String(up.id), name: fname, size: up.length || 0 })); up.on('error', bad); });
    stream.pipe(up);
  });
  bb.on('error', next);
  bb.on('close', () => (async () => {
    const f = fileP ? await fileP : null;
    const drop = async () => { if (f) await files().delete(new ObjectId(f.id)).catch(() => {}); };
    if (tooBig) { await drop(); return res.status(413).json({ ok: false, error: 'The CV is larger than 5 MB.' }); }
    if (badType) { await drop(); return res.status(422).json({ ok: false, error: 'Attach your CV as a PDF, DOC or DOCX file.' }); }
    if (config.dev) { await drop(); console.log('[dev] careers', JSON.stringify(fields).slice(0, 500)); return res.json({ ok: true, message: 'Received (local test, nothing was sent).' }); }
    if (!valid(fields, res)) return drop();
    if (!f) return res.status(422).json({ ok: false, error: 'Attach your CV.' });
    const lead = await saveLead(req, 'careers', fields, { cv: f });
    res.json({ ok: true, id: lead._id, message: 'Thank you. Our hiring team will be in touch.' });
  })().catch(next));
  req.pipe(bb);
});

// ---- admin ---------------------------------------------------------------------------------------------------------
const COLS = ['at', 'kind', 'category', 'status', 'assigneeName', 'type', 'name', 'first', 'last', 'email', 'company', 'designation', 'country', 'countryCode', 'phone', 'service', 'timeline', 'department', 'experience', 'message', 'resource', 'title', 'page', 'note', 'id'];

// build 78.3: enquiry types for follow-up, and who may see which leads (Business: enquiries; HR: careers applications)
export const CATEGORIES = ['service', 'rfq', 'partnership', 'contact', 'download', 'chat', 'careers', 'other'];
export const categoryOf = (l) => l.category || (l.kind === 'careers' ? 'careers' : /download|case-study|panel/.test(l.kind || '') ? 'download' : /chat/.test(l.kind || '') ? 'chat' : /partner/i.test(String(l.service || l.type || '')) ? 'partnership' : /quote|rfq|proposal/i.test(String(l.type || l.message || '').slice(0, 300)) ? 'rfq' : l.kind === 'contact' ? 'contact' : 'service');
async function kindScope(req) {
  const u = req.admin.user;
  const [enq, car] = await Promise.all([can(u, 'enquiries', 'view'), can(u, 'careers', 'view')]);
  return enq && car ? {} : enq ? { kind: { $ne: 'careers' } } : car ? { kind: 'careers' } : { _id: null };
}
const mayTouch = async (req, l, action) => can(req.admin.user, l.kind === 'careers' ? 'careers' : 'enquiries', action);
function leadFilter(req) {
  const f = {};
  if (req.query.kind) f.kind = String(req.query.kind);
  if (req.query.category) f.category = String(req.query.category);
  if (req.query.assignee) f.assignee = req.query.assignee === 'me' ? req.admin.user._id : req.query.assignee === 'none' ? { $in: [null, ''] } : String(req.query.assignee);
  if (req.query.status) f.status = String(req.query.status) === 'new' ? { $in: ['new', null] } : String(req.query.status);
  const from = Date.parse(req.query.from), to = Date.parse(req.query.to);
  if (from || to) f.at = { ...(from ? { $gte: new Date(from) } : {}), ...(to ? { $lte: new Date(to + 86400e3 - 1) } : {}) };
  const q = clean(req.query.q, 80);
  if (q) { const re = { $regex: escapeRe(q), $options: 'i' }; f.$or = ['email', 'name', 'first', 'last', 'company', 'message', 'phone', 'country', 'service', 'resource', 'title'].map((k) => ({ [k]: re })); }
  return f;
}
const out = ({ _id, ...l }) => ({ id: _id, ...l });

leadsRouter.get('/admin/leads', requireAdmin, ah(async (req, res) => {
  const sc = await kindScope(req);
  const f0 = leadFilter(req);
  const f = sc.kind && f0.kind ? { ...f0, $and: [{ kind: f0.kind }, { kind: sc.kind }] } : { ...f0, ...sc };
  if (f.$and) delete f.kind;
  if (req.query.format === 'csv') {
    const all = (await col('leads').find(f).sort({ at: -1 }).limit(50000).toArray()).map(out);
    await audit(req, 'export-leads', 'leads', { rows: all.length });
    return res.type('text/csv; charset=utf-8').attachment('leads.csv').send(toCsv(COLS, all));
  }
  const { limit: n, skip } = page(req);
  const [rows, total, kinds] = await Promise.all([col('leads').find(f).sort({ at: -1 }).skip(skip).limit(n).toArray(), col('leads').countDocuments(f), col('leads').distinct('kind', sc)]);
  res.json({ ok: true, total, kinds, categories: CATEGORIES, leads: rows.map((l) => out({ ...l, category: categoryOf(l) })) });
}));

// build 78.3: colleagues a lead can be given to (active admins who can see that kind of lead)
leadsRouter.get('/admin/leads/assignees', requireAdmin, ah(async (req, res) => {
  const mod = req.query.kind === 'careers' ? 'careers' : 'enquiries';
  const all = await col('admin_users').find({ status: 'active' }, { projection: { name: 1, email: 1, role: 1, grants: 1, status: 1 } }).sort({ name: 1 }).toArray();
  const out = [];
  for (const u of all) if (await can(u, mod, 'view')) out.push({ id: u._id, name: u.name, email: u.email });
  res.json({ ok: true, admins: out, canAssign: await can(req.admin.user, mod, mod === 'careers' ? 'edit' : 'manage') });
}));

leadsRouter.get('/admin/leads/:id', requireAdmin, ah(async (req, res) => {
  const l = await col('leads').findOne({ _id: String(req.params.id) });
  if (!l) return res.status(404).json({ ok: false });
  if (!(await mayTouch(req, l, 'view'))) return res.status(403).json({ ok: false, error: 'You do not have access to this.' });
  res.json({ ok: true, lead: out({ ...l, category: categoryOf(l) }) });
}));

leadsRouter.patch('/admin/leads/:id', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, set = {};
  const l = await col('leads').findOne({ _id: String(req.params.id) });
  if (!l) return res.status(404).json({ ok: false });
  if (!(await mayTouch(req, l, 'edit'))) return res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  if (b.status != null) { if (!LEAD_STATUS.includes(b.status)) return res.status(400).json({ ok: false, error: 'Unknown status' }); set.status = b.status; }
  if (b.note != null) set.note = clean(b.note, 2000);
  if (b.category != null) { if (!CATEGORIES.includes(b.category)) return res.status(400).json({ ok: false, error: 'Unknown type' }); set.category = b.category; }
  let assignee = null;
  if (b.assignee != null) {
    // assigning a lead to someone needs the manage right; the person must be an active admin who may see it
    if (b.assignee && !(await can(req.admin.user, l.kind === 'careers' ? 'careers' : 'enquiries', l.kind === 'careers' ? 'edit' : 'manage'))) return res.status(403).json({ ok: false, error: 'Assigning needs the manage right on enquiries.' });
    if (b.assignee) {
      assignee = await col('admin_users').findOne({ _id: String(b.assignee), status: 'active' });
      if (!assignee || !(await can(assignee, l.kind === 'careers' ? 'careers' : 'enquiries', 'view'))) return res.status(400).json({ ok: false, error: 'This admin cannot see this lead.' });
      set.assignee = assignee._id; set.assigneeName = assignee.name; set.assigned = new Date();
    } else { set.assignee = null; set.assigneeName = ''; }
  }
  if (!Object.keys(set).length) return res.status(400).json({ ok: false, error: 'Nothing to change' });
  set.updated = new Date();
  const r = await col('leads').updateOne({ _id: String(req.params.id) }, { $set: set });
  if (!r.matchedCount) return res.status(404).json({ ok: false });
  await audit(req, 'update-lead', req.params.id, set);
  col('leads').findOne({ _id: String(req.params.id) }).then((x) => x && sfEmit('lead.updated', sfLead(x))).catch(() => {});
  if (assignee && assignee._id !== req.admin.user._id && mailReady()) sendMail({ to: assignee.email, subject: 'A lead was assigned to you: ' + String(l.name || l.email || l.kind).slice(0, 60), text: `${req.admin.user.name} assigned you a ${l.kind} from ${l.name || ''} <${l.email || ''}>.\n\n${config.publicUrl}/admin/leads` }).catch(() => {});
  res.json({ ok: true });
}));

leadsRouter.delete('/admin/leads/:id', requireAdmin, ah(async (req, res) => {
  const l0 = await col('leads').findOne({ _id: String(req.params.id) });
  if (!l0) return res.status(404).json({ ok: false });
  if (!(await mayTouch(req, l0, 'delete'))) return res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  const l = await col('leads').findOneAndDelete({ _id: String(req.params.id) });
  if (!l) return res.status(404).json({ ok: false });
  if (l.cv && l.cv.id) await files().delete(new ObjectId(l.cv.id)).catch(() => {});
  await audit(req, 'delete-lead', req.params.id, { email: l.email, kind: l.kind });
  res.json({ ok: true });
}));
