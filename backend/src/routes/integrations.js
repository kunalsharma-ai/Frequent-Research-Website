// Build 78: the AI assistant, the SampCrew (HR) link for careers applications, live chat downloads and the
// "Connections & keys" overview of every key the server has (never the key itself).
//   POST /api/v1/admin/ai/write                 { kind, brief, tone, length, platforms, extra } -> { data }
//   GET  /api/v1/admin/integrations             what is connected (email, AI, social platforms, SampCrew, webhooks)
//   POST /api/v1/admin/integrations/sampcrew/send/:leadId     send (again) one application to SampCrew
//   POST /api/v1/integrations/sampcrew/webhook  SampCrew tells us a candidate's stage   (X-SampCrew-Signature: hex HMAC-SHA256 of the body)
//   GET  /api/v1/integrations/sampcrew/cv/:leadId?exp=&sig=   SampCrew downloads the CV (signed link, 7 days)
//   GET  /api/v1/admin/chats/export?format=csv|json         every conversation;  GET /admin/chats/:id/export?format=txt|csv|json
import crypto from 'node:crypto';
import express, { Router } from 'express';
import { ObjectId } from 'mongodb';
import { config } from '../config.js';
import { col, files } from '../db.js';
import { ah, audit, clean, rateLimit, requireAdmin, toCsv } from '../lib/util.js';
import { AI_KINDS, aiReady, aiWrite } from '../lib/ai.js';
import { mailStatus } from '../lib/mailer.js';
import { socialStatus } from './social.js';
import { canSave, checkValue, isKey, keyStatus, saveKeys } from '../lib/keystore.js';
import { requireStepUpMw } from './users.js';

export const integrationsRouter = Router();

/* ---- AI ----------------------------------------------------------------------------------------------------------- */
integrationsRouter.get('/admin/ai/kinds', requireAdmin, (req, res) => res.json({ ok: true, ready: aiReady(), model: config.ai.model, kinds: AI_KINDS }));
integrationsRouter.post('/admin/ai/write', requireAdmin, rateLimit('ai', 120, 3600e3, 'Too many AI requests this hour.'), ah(async (req, res) => {
  const b = req.body || {};
  try {
    const r = await aiWrite({ kind: String(b.kind || ''), brief: b.brief, tone: clean(b.tone, 100), length: clean(b.length, 100), platforms: Array.isArray(b.platforms) ? b.platforms.map((p) => clean(p, 30)) : [], extra: typeof b.extra === 'string' ? b.extra : b.extra ? JSON.stringify(b.extra) : '' });
    await audit(req, 'ai-write', b.kind, { out: r.usage && r.usage.output_tokens });
    res.json({ ok: true, data: r.data, model: r.model });
  } catch (e) { res.status(e.status || 500).json({ ok: false, error: e.status ? e.message : 'The AI service did not answer: ' + String(e.message).slice(0, 200) }); }
}));

/* ---- SampCrew ----------------------------------------------------------------------------------------------------- */
const SC = () => config.sampcrew;
export const sampcrewReady = () => !!(SC().url && SC().key);
const cvSig = (id, exp) => crypto.createHmac('sha256', config.secret + '|cv').update(id + '.' + exp).digest('hex');
const cvLink = (id) => { const exp = Date.now() + 7 * 86400e3; return `${config.publicUrl}/api/v1/integrations/sampcrew/cv/${id}?exp=${exp}&sig=${cvSig(id, exp)}`; };

// a careers application goes to SampCrew as a candidate: POST {SAMPCREW_API_URL}/candidates (Bearer SAMPCREW_API_KEY)
export async function sendToSampcrew(lead) {
  if (!sampcrewReady() || lead.kind !== 'careers') return null;
  const body = {
    source: 'frequentresearch.com', externalId: lead._id, appliedAt: lead.at,
    name: lead.name || [lead.first, lead.last].filter(Boolean).join(' '), email: lead.email, phone: lead.phone || '', countryCode: lead.countryCode || '',
    department: lead.department || lead.role || '', position: lead.position || lead.role || lead.department || '', experience: lead.experience || '', location: lead.location || lead.country || '',
    message: lead.message || '', linkedin: lead.linkedin || '', extra: lead.extra || {},
    cv: lead.cv ? { name: lead.cv.name, size: lead.cv.size, url: cvLink(lead._id) } : null,
  };
  let hr;
  try {
    const r = await fetch(SC().url + '/candidates', { method: 'POST', headers: { Authorization: 'Bearer ' + SC().key, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(20000) });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(`${r.status} ${j.error || j.message || ''}`);
    hr = { system: 'SampCrew', id: String(j.id || j.candidateId || ''), stage: j.stage || 'applied', sent: new Date(), ok: true };
  } catch (e) { hr = { system: 'SampCrew', ok: false, error: String(e.message).slice(0, 300), sent: new Date() }; }
  await col('leads').updateOne({ _id: lead._id }, { $set: { hr } });
  return hr;
}

integrationsRouter.post('/admin/integrations/sampcrew/send/:id', requireAdmin, ah(async (req, res) => {
  if (!sampcrewReady()) return res.status(503).json({ ok: false, error: 'SampCrew is not connected: add SAMPCREW_API_URL and SAMPCREW_API_KEY in Connections & keys.' });
  const l = await col('leads').findOne({ _id: String(req.params.id), kind: 'careers' });
  if (!l) return res.status(404).json({ ok: false, error: 'Application not found' });
  const hr = await sendToSampcrew(l);
  await audit(req, 'sampcrew-send', l._id, { ok: hr && hr.ok });
  res.status(hr && hr.ok ? 200 : 502).json({ ok: !!(hr && hr.ok), hr, error: hr && hr.error });
}));

integrationsRouter.get('/integrations/sampcrew/cv/:id', ah(async (req, res) => {
  const id = String(req.params.id), exp = +req.query.exp || 0, sig = String(req.query.sig || '');
  const good = exp > Date.now() && sig.length === 64 && crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(cvSig(id, exp)));
  if (!good) return res.status(403).json({ ok: false, error: 'Link expired' });
  const l = await col('leads').findOne({ _id: id, kind: 'careers' });
  if (!l || !l.cv || !l.cv.id) return res.status(404).json({ ok: false });
  const f = await files().find({ _id: new ObjectId(l.cv.id) }).next();
  if (!f) return res.status(404).json({ ok: false });
  res.set({ 'Content-Type': (f.metadata && f.metadata.contentType) || 'application/octet-stream', 'Content-Disposition': `attachment; filename="${String(f.filename).replace(/"/g, '')}"` });
  files().openDownloadStream(f._id).pipe(res);
}));

// SampCrew -> us: { externalId, stage, status, note, interviewAt }  (raw body, signed with SAMPCREW_WEBHOOK_SECRET)
integrationsRouter.post('/integrations/sampcrew/webhook', express.raw({ type: () => true, limit: '64kb' }), ah(async (req, res) => {
  if (!SC().webhookSecret) return res.status(404).json({ ok: false });
  const raw = Buffer.isBuffer(req.body) ? req.body : Buffer.from(typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {}));
  const sig = String(req.headers['x-sampcrew-signature'] || '').replace(/^sha256=/, '');
  const want = crypto.createHmac('sha256', SC().webhookSecret).update(raw).digest('hex');
  if (sig.length !== want.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(want))) return res.status(401).json({ ok: false });
  let b; try { b = JSON.parse(raw.toString('utf8')); } catch { return res.status(400).json({ ok: false }); }
  const set = { 'hr.stage': clean(b.stage || b.status, 60), 'hr.note': clean(b.note, 1000), 'hr.updated': new Date() };
  if (b.interviewAt) set['hr.interviewAt'] = clean(String(b.interviewAt), 40);
  const stageToStatus = { hired: 'won', rejected: 'lost', withdrawn: 'lost', interview: 'qualified', shortlisted: 'qualified', screening: 'contacted' };
  const st = stageToStatus[String(b.stage || b.status || '').toLowerCase()];
  if (st) set.status = st;
  const r = await col('leads').updateOne({ _id: clean(b.externalId, 40), kind: 'careers' }, { $set: set });
  res.json({ ok: true, matched: r.matchedCount });
}));

/* ---- overview of keys ------------------------------------------------------------------------------------------- */
integrationsRouter.get('/admin/integrations', requireAdmin, ah(async (req, res) => {
  const env = process.env;
  res.json({
    ok: true,
    publicUrl: config.publicUrl,
    mail: mailStatus(),
    ai: { ready: aiReady(), model: config.ai.model },
    social: socialStatus(),
    sampcrew: { ready: sampcrewReady(), webhook: !!SC().webhookSecret, url: SC().url ? SC().url.replace(/^(https:\/\/[^/]+).*/, '$1/…') : '' },
    leadWebhook: !!config.leadWebhook,
    canSave: canSave(),
    keys: keyStatus(),
  });
}));

// build 78.4: save or remove keys in the database. Body { values: { NAME: "value" | null } }. Secrets are encrypted.
integrationsRouter.put('/admin/integrations/keys', requireAdmin, requireStepUpMw, ah(async (req, res) => {
  if (!canSave()) return res.status(503).json({ ok: false, error: 'Set KEYS_SECRET (or REVIEW_SECRET) in the server .env first: it encrypts the saved keys.' });
  const v = (req.body && req.body.values) || {};
  if (typeof v !== 'object' || Array.isArray(v) || !Object.keys(v).length) return res.status(400).json({ ok: false, error: 'Nothing to change' });
  const values = {};
  for (const [k, x] of Object.entries(v)) {
    if (!isKey(k)) return res.status(400).json({ ok: false, error: `${k.slice(0, 40)} is not a key the website uses` });
    if (x === null) { values[k] = null; continue; }
    const bad = checkValue(k, x);
    if (bad) return res.status(422).json({ ok: false, error: `${k} ${bad}`, field: k });
    values[k] = x;
  }
  const done = await saveKeys(values, req.admin.user.email || req.admin.user._id);
  // the log has the names only, never a value
  await audit(req, 'set-keys', 'integrations', { saved: done.filter((k) => values[k] !== null), removed: done.filter((k) => values[k] === null) });
  res.json({ ok: true, keys: keyStatus() });
}));

/* ---- live chat downloads -------------------------------------------------------------------------------------- */
const who = (m) => ({ visitor: 'Visitor', agent: 'Frequent Research', bot: 'Assistant' }[m.from] || m.from);
const when = (d) => (d ? new Date(d).toISOString().replace('T', ' ').slice(0, 19) + ' UTC' : '');
function chatText(c) {
  const head = [`Conversation ${c._id}`, `Visitor: ${c.name || ''} <${c.email || ''}> ${c.phone || ''} ${c.country || ''}`, `Page: ${c.page || ''}`, `Started: ${when(c.started)}   Status: ${c.status}`, ''];
  const pre = (c.transcript || []).map((m) => `[before hand-over] ${who(m)}: ${m.text}`);
  return [...head, ...pre, ...(pre.length ? [''] : []), ...(c.messages || []).map((m) => `${when(m.at)}  ${who(m)}: ${m.text}`)].join('\n');
}
const rowsOf = (c) => [...(c.transcript || []).map((m) => ({ chat: c._id, name: c.name, email: c.email, at: '', from: who(m), text: m.text, part: 'assistant' })), ...(c.messages || []).map((m) => ({ chat: c._id, name: c.name, email: c.email, at: m.at, from: who(m), text: m.text, part: 'live' }))];

integrationsRouter.get('/admin/chats/export', requireAdmin, ah(async (req, res) => {
  const f = req.query.status ? { status: String(req.query.status) } : {};
  const all = await col('chats').find(f, { projection: { token: 0 } }).sort({ started: -1 }).limit(5000).toArray();
  await audit(req, 'export-chats', 'chats', { n: all.length });
  if (req.query.format === 'json') return res.attachment('live-chats.json').json(all.map(({ _id, ...c }) => ({ id: _id, ...c })));
  if (req.query.format === 'txt') return res.type('text/plain; charset=utf-8').attachment('live-chats.txt').send(all.map(chatText).join('\n\n' + '-'.repeat(60) + '\n\n'));
  res.type('text/csv; charset=utf-8').attachment('live-chats.csv').send(toCsv(['chat', 'name', 'email', 'at', 'from', 'part', 'text'], all.flatMap(rowsOf)));
}));
integrationsRouter.get('/admin/chats/:id/export', requireAdmin, ah(async (req, res) => {
  const c = await col('chats').findOne({ _id: String(req.params.id) }, { projection: { token: 0 } });
  if (!c) return res.status(404).json({ ok: false });
  const fmt = String(req.query.format || 'txt');
  if (fmt === 'json') return res.attachment(`chat-${c._id}.json`).json({ id: c._id, ...c, _id: undefined });
  if (fmt === 'csv') return res.type('text/csv; charset=utf-8').attachment(`chat-${c._id}.csv`).send(toCsv(['chat', 'name', 'email', 'at', 'from', 'part', 'text'], rowsOf(c)));
  res.type('text/plain; charset=utf-8').attachment(`chat-${c._id}.txt`).send(chatText(c));
}));
