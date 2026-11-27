// Sampforce (the sales app) connection: every lead, enquiry and form sent on the website, as the super admin sees it,
// for Sampforce to PULL (API key) or RECEIVE (signed webhook). Guide for the Sampforce developers:
// docs/go-live/29-SAMPFORCE-API.md.
//
// Pull (Authorization: Bearer sfk_…, a key made in the super admin under System › Sampforce):
//   GET   /api/v1/sampforce/ping                     is the key good, which rights it has
//   GET   /api/v1/sampforce/forms                    every form type with its number of submissions
//   GET   /api/v1/sampforce/leads                    enquiries, downloads, chat leads (+ careers with careers:read)
//                                                    ?type=&category=&status=&formKey=&email=&q=&since=&until=&updatedSince=&order=&limit=&cursor=
//   GET   /api/v1/sampforce/leads/:id                one lead
//   PATCH /api/v1/sampforce/leads/:id                { status, stage, owner, sampforceId, note }   (leads:write)
//   GET   /api/v1/sampforce/contacts                 one row per email address (newsletter sign-ups included) ?subscribed=&since=&updatedSince=…
//   GET   /api/v1/sampforce/contacts/:email
//   GET   /api/v1/sampforce/reviews                  reviews written on the website ?status=&since=…
//   GET   /api/v1/sampforce/reviews/:id
// Push: SAMPFORCE_WEBHOOK_URL + SAMPFORCE_WEBHOOK_SECRET (Connections & keys). Events lead.created, lead.updated,
//   newsletter.subscribed, review.created (careers.created only when listed in SAMPFORCE_WEBHOOK_EVENTS). Each POST is
//   signed: X-Sampforce-Signature: t=<unix seconds>,v1=<hex HMAC-SHA256 of "<t>.<raw body>">. Failed deliveries are
//   tried again (1 min … 12 h, 8 tries); the super admin shows each delivery and can send again.
// Admin (System › Sampforce): GET /admin/sampforce ; POST /admin/sampforce/keys ; DELETE /admin/sampforce/keys/:id ;
//   POST /admin/sampforce/test ; POST /admin/sampforce/outbox/retry ; POST /admin/sampforce/backfill
import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from '../config.js';
import { col } from '../db.js';
import { ah, audit, clean, EMAIL, hashIp, newId, requireAdmin } from '../lib/util.js';
import { escapeRe } from './admin.js';
import { categoryOf, LEAD_STATUS } from './leads.js';
import { cvLink } from './integrations.js';

export const sampforceRouter = Router();

export const SF_SCOPES = {
  'leads:read': 'Read every enquiry, download form and live chat lead',
  'contacts:read': 'Read contacts (one per email) and newsletter sign-ups',
  'reviews:read': 'Read reviews written on the website',
  'careers:read': 'Read careers applications, with a 7-day link to the CV',
  'leads:write': 'Send status, stage, owner and the Sampforce id back to the website',
};
export const SF_DEFAULT_SCOPES = ['leads:read', 'contacts:read', 'reviews:read', 'leads:write'];
export const SF_EVENTS = ['lead.created', 'lead.updated', 'newsletter.subscribed', 'review.created', 'careers.created'];
const DEFAULT_EVENTS = ['lead.created', 'lead.updated', 'newsletter.subscribed', 'review.created'];
const FORM_NAMES = { enquiry: 'Enquiry form', download: 'Download form', 'resource-download': 'Resource download form', 'case-study-download': 'Case study download form', chat: 'Live chat', careers: 'Careers application' };

const KEYS = () => col('sampforce_keys');
const OUT = () => col('sampforce_outbox');
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const normIp = (ip) => String(ip || '').replace(/^::ffff:/, '');
const iso = (d) => (d ? new Date(d).toISOString() : null);

/* ---- shapes Sampforce gets --------------------------------------------------------------------------------------- */
// fields that have their own place in the answer, or must never leave the website (IP, browser, internal ids)
const KNOWN = new Set(['_id', 'at', 'kind', 'status', 'category', 'ip', 'ipAddr', 'ua', 'cv', 'hr', 'assignee', 'assigneeName', 'assigned', 'updated', 'note', 'extra', 'formKey', 'sampforce', 'type', 'name', 'first', 'last', 'email', 'phone', 'countryCode', 'country', 'company', 'designation', 'service', 'timeline', 'message', 'resource', 'title', 'interest', 'department', 'experience', 'page', 'consent', 'newsletter', 'website']);
const s = (v) => (v == null ? '' : typeof v === 'string' ? v : String(v));

export function sfLead(l) {
  const name = s(l.name || [l.first, l.last].filter(Boolean).join(' ')).trim();
  const other = {};
  for (const [k, v] of Object.entries(l)) if (!KNOWN.has(k) && v !== '' && v != null) other[k] = v;
  const extra = l.extra && typeof l.extra === 'object' ? l.extra : {};
  const o = {
    id: l._id,
    object: 'lead',
    type: l.kind,
    category: categoryOf(l),
    status: l.status || 'new',
    createdAt: iso(l.at),
    updatedAt: iso(l.updated || l.at),
    form: { key: l.formKey || l.kind, name: s(l.type) || FORM_NAMES[l.kind] || s(l.kind) },
    contact: {
      name, firstName: s(l.first) || name.split(' ')[0] || '', lastName: s(l.last) || name.split(' ').slice(1).join(' '),
      email: s(l.email), phone: s(l.phone), countryCode: s(l.countryCode), country: s(l.country), company: s(l.company),
      designation: s(l.designation || extra.Designation || extra.designation),
    },
    enquiry: { service: s(l.service), timeline: s(l.timeline), message: s(l.message), resource: s(l.resource), title: s(l.title), interest: s(l.interest) },
    page: s(l.page),
    consent: l.consent === true || l.consent === 'true' || l.consent === 'on' || l.newsletter === true,
    extraFields: extra,
    otherFields: other,
    owner: s(l.assigneeName),
    adminNote: s(l.note),
    sampforce: l.sampforce || null,
  };
  if (l.kind === 'careers') {
    o.careers = { department: s(l.department), experience: s(l.experience), hr: l.hr ? { system: l.hr.system, stage: l.hr.stage || '', ok: !!l.hr.ok } : null };
    o.cv = l.cv && l.cv.id ? { name: l.cv.name, size: l.cv.size, url: cvLink(l._id), urlExpires: iso(Date.now() + 7 * 86400e3) } : null;
  }
  return o;
}

export const sfContact = (c) => ({
  id: c._id, object: 'contact', email: c.email || c._id, name: s(c.name), phone: s(c.phone), company: s(c.company), country: s(c.country), designation: s(c.designation),
  subscribed: !!c.subscribed, subscribedAt: iso(c.consentAt), unsubscribedAt: iso(c.unsubscribed),
  forms: c.forms || [], services: c.services || [], sources: c.sources || [], tags: c.tags || [], leads: c.leads || 0,
  createdAt: iso(c.created), updatedAt: iso(c.updated || c.created), lastActivityAt: iso(c.last),
});

export const sfReview = (r) => ({
  id: r._id, object: 'review', status: r.status, rating: r.rating, review: s(r.review), services: r.services || [], reply: s(r.reply),
  contact: { name: [r.first, r.last].filter(Boolean).join(' '), firstName: s(r.first), lastName: s(r.last), email: s(r.email), phone: s(r.phone), countryCode: s(r.countryCode), company: s(r.company), designation: s(r.designation), country: s(r.country) },
  page: s(r.page), createdAt: iso(r.date), updatedAt: iso(r.updated || r.date),
});

/* ---- API keys ---------------------------------------------------------------------------------------------------- */
const fails = new Map(); // wrong keys per IP: 20 in 15 minutes locks that IP out for the rest of the 15 minutes
setInterval(() => { const now = Date.now(); for (const [k, f] of fails) if (now - f.t > 15 * 60e3) fails.delete(k); }, 300e3).unref();

const keyOut = (k) => ({ id: k._id, name: k.name, prefix: k.prefix, scopes: k.scopes, ips: k.ips || [], created: k.created, by: k.by, expires: k.expires || null, lastUsed: k.lastUsed || null, revoked: !!k.revoked, revokedAt: k.revokedAt || null });

// any = list of scopes, one of them is enough
function requireKey(any = []) {
  return ah(async (req, res, next) => {
    const ip = normIp(req.ip), f = fails.get(ip);
    if (f && f.n >= 20 && Date.now() - f.t < 15 * 60e3) return res.status(429).json({ ok: false, error: 'Too many wrong keys from this address. Try again in 15 minutes.' });
    const h = String(req.headers.authorization || '');
    const raw = h.startsWith('Bearer ') ? h.slice(7).trim() : String(req.headers['x-api-key'] || '').trim();
    const k = /^sfk_[A-Za-z0-9_-]{30,80}$/.test(raw) ? await KEYS().findOne({ hash: sha(raw) }) : null;
    if (!k || k.revoked || (k.expires && +new Date(k.expires) < Date.now())) {
      const g = f && Date.now() - f.t < 15 * 60e3 ? f : { n: 0, t: Date.now() };
      g.n++; fails.set(ip, g);
      res.set('WWW-Authenticate', 'Bearer realm="sampforce"');
      return res.status(401).json({ ok: false, error: k && k.revoked ? 'This API key was revoked.' : k ? 'This API key has expired.' : 'Missing or wrong API key.' });
    }
    if (k.ips && k.ips.length && !k.ips.includes(ip)) return res.status(403).json({ ok: false, error: 'This API key cannot be used from this IP address.' });
    if (any.length && !any.some((x) => k.scopes.includes(x))) return res.status(403).json({ ok: false, error: `This API key does not have the ${any.join(' or ')} right.` });
    fails.delete(ip);
    req.sf = k;
    if (!k.lastUsed || Date.now() - +new Date(k.lastUsed) > 60e3) KEYS().updateOne({ _id: k._id }, { $set: { lastUsed: new Date(), lastIp: hashIp(req.ip) } }).catch(() => {});
    next();
  });
}
const has = (req, scope) => req.sf.scopes.includes(scope);

/* ---- paging: oldest first by default, so a sync can walk forward and keep the last cursor ------------------------- */
const enc = (t, id) => Buffer.from(JSON.stringify([+new Date(t), id])).toString('base64url');
function dec(c) { try { const [t, id] = JSON.parse(Buffer.from(String(c), 'base64url').toString('utf8')); return Number.isFinite(t) && typeof id === 'string' ? { t: new Date(t), id } : null; } catch { return null; } }
const when = (v) => { if (!v) return null; const t = Date.parse(String(v)); return Number.isFinite(t) ? new Date(t) : undefined; };

// returns { and: [filters], sort, limit, order } or sends a 400
function listArgs(req, res, field) {
  const q = req.query, and = [];
  const order = String(q.order || 'asc') === 'desc' ? 'desc' : 'asc';
  const limit = Math.min(500, Math.max(1, Math.floor(+q.limit) || 100));
  const since = when(q.since), until = when(q.until), upd = when(q.updatedSince);
  if (since === undefined || until === undefined || upd === undefined) { res.status(400).json({ ok: false, error: 'since, until and updatedSince must be dates, e.g. 2026-11-27 or 2026-11-27T09:30:00Z.' }); return null; }
  if (since) and.push({ [field]: { $gte: since } });
  if (until) and.push({ [field]: { $lt: until } });
  if (upd) and.push({ $or: [{ [field]: { $gte: upd } }, { updated: { $gte: upd } }] });
  if (q.cursor) {
    const c = dec(q.cursor);
    if (!c) { res.status(400).json({ ok: false, error: 'The cursor is not valid. Start again without it.' }); return null; }
    const op = order === 'desc' ? '$lt' : '$gt';
    and.push({ $or: [{ [field]: { [op]: c.t } }, { [field]: c.t, _id: { [op]: c.id } }] });
  }
  const dir = order === 'desc' ? -1 : 1;
  return { and, sort: { [field]: dir, _id: dir }, limit, order };
}
async function sendPage(res, collection, a, field, shape) {
  const f = a.and.length ? { $and: a.and } : {};
  const rows = await col(collection).find(f).sort(a.sort).limit(a.limit + 1).toArray();
  const more = rows.length > a.limit, items = rows.slice(0, a.limit);
  const last = items[items.length - 1];
  res.json({ ok: true, count: items.length, hasMore: more, nextCursor: more && last ? enc(last[field], last._id) : null, data: items.map(shape) });
}
const list = (v) => String(v || '').split(',').map((x) => x.trim()).filter(Boolean).slice(0, 20);

/* ---- pull endpoints ---------------------------------------------------------------------------------------------- */
sampforceRouter.get('/sampforce/ping', requireKey(), (req, res) => res.json({ ok: true, key: { name: req.sf.name, prefix: req.sf.prefix, scopes: req.sf.scopes }, time: new Date().toISOString(), version: 'v1' }));

// which leads this key may see: leads:read = everything except careers; careers:read = careers
function kindScope(req) {
  const l = has(req, 'leads:read'), c = has(req, 'careers:read');
  return l && c ? null : l ? { kind: { $ne: 'careers' } } : { kind: 'careers' };
}

sampforceRouter.get('/sampforce/forms', requireKey(['leads:read', 'careers:read']), ah(async (req, res) => {
  const sc = kindScope(req);
  const rows = await col('leads').aggregate([...(sc ? [{ $match: sc }] : []), { $group: { _id: { kind: '$kind', formKey: '$formKey', type: '$type' }, count: { $sum: 1 }, first: { $min: '$at' }, last: { $max: '$at' } } }, { $sort: { count: -1 } }, { $limit: 1000 }]).toArray();
  res.json({
    ok: true,
    data: rows.map((r) => ({ type: r._id.kind, formKey: r._id.formKey || r._id.kind, name: r._id.type || FORM_NAMES[r._id.kind] || r._id.kind, count: r.count, firstAt: iso(r.first), lastAt: iso(r.last) })),
    types: Object.entries(FORM_NAMES).filter(([k]) => (k === 'careers' ? has(req, 'careers:read') : has(req, 'leads:read'))).map(([type, name]) => ({ type, name })),
    statuses: LEAD_STATUS,
  });
}));

sampforceRouter.get('/sampforce/leads', requireKey(['leads:read', 'careers:read']), ah(async (req, res) => {
  const a = listArgs(req, res, 'at');
  if (!a) return;
  const sc = kindScope(req);
  if (sc) a.and.push(sc);
  const q = req.query;
  if (q.type) a.and.push({ kind: { $in: list(q.type) } });
  if (q.formKey) a.and.push({ $or: [{ formKey: { $in: list(q.formKey) } }, { kind: { $in: list(q.formKey) } }] });
  if (q.status) { const st = list(q.status); a.and.push(st.includes('new') ? { $or: [{ status: { $in: st } }, { status: null }] } : { status: { $in: st } }); }
  if (q.email) a.and.push({ email: clean(String(q.email), 160).toLowerCase() });
  const term = clean(String(q.q || ''), 80);
  if (term) { const re = { $regex: escapeRe(term), $options: 'i' }; a.and.push({ $or: ['email', 'name', 'first', 'last', 'company', 'message', 'phone', 'country', 'service', 'resource', 'title', 'type'].map((k) => ({ [k]: re })) }); }
  // category is worked out for older leads that never had one saved: filter those after reading
  if (q.category) {
    const cats = list(q.category);
    const f = a.and.length ? { $and: a.and } : {};
    const out = [];
    const cur = col('leads').find(f).sort(a.sort);
    for await (const l of cur) { if (cats.includes(categoryOf(l))) out.push(l); if (out.length > a.limit) break; }
    const more = out.length > a.limit, items = out.slice(0, a.limit), last = items[items.length - 1];
    return res.json({ ok: true, count: items.length, hasMore: more, nextCursor: more && last ? enc(last.at, last._id) : null, data: items.map(sfLead) });
  }
  await sendPage(res, 'leads', a, 'at', sfLead);
}));

async function leadFor(req, res) {
  const l = await col('leads').findOne({ _id: clean(String(req.params.id), 40) });
  const ok = l && (l.kind === 'careers' ? has(req, 'careers:read') : has(req, 'leads:read'));
  if (!ok) { res.status(404).json({ ok: false, error: 'Lead not found.' }); return null; }
  return l;
}
sampforceRouter.get('/sampforce/leads/:id', requireKey(['leads:read', 'careers:read']), ah(async (req, res) => {
  const l = await leadFor(req, res);
  if (l) res.json({ ok: true, data: sfLead(l) });
}));

// Sampforce tells the website what happened to a lead. Shown in the super admin next to the lead.
sampforceRouter.patch('/sampforce/leads/:id', requireKey(['leads:write']), ah(async (req, res) => {
  const b = req.body;
  if (!b || typeof b !== 'object' || Array.isArray(b)) return res.status(400).json({ ok: false, error: 'Send a JSON object.' });
  if (!has(req, 'leads:read') && !has(req, 'careers:read')) return res.status(403).json({ ok: false, error: 'This API key also needs leads:read.' });
  const l = await leadFor(req, res);
  if (!l) return;
  const set = {};
  if (b.status != null) { if (!LEAD_STATUS.includes(b.status)) return res.status(422).json({ ok: false, error: 'status must be one of ' + LEAD_STATUS.join(', ') }); set.status = b.status; }
  for (const [k, max] of [['stage', 80], ['owner', 120], ['sampforceId', 80], ['note', 2000], ['url', 500]]) if (b[k] != null) set['sampforce.' + k] = clean(String(b[k]), max);
  if (set['sampforce.url'] && !/^https:\/\//.test(set['sampforce.url'])) return res.status(422).json({ ok: false, error: 'url must start with https://' });
  if (!Object.keys(set).length) return res.status(400).json({ ok: false, error: 'Nothing to change. Send status, stage, owner, sampforceId, note or url.' });
  set['sampforce.updated'] = new Date(); set.updated = new Date();
  await col('leads').updateOne({ _id: l._id }, { $set: set });
  req.actor = { id: req.sf._id, name: 'Sampforce · ' + req.sf.name, role: 'api' };
  await audit(req, 'sampforce-update-lead', l._id, Object.fromEntries(Object.entries(set).filter(([k]) => k !== 'sampforce.note' && k !== 'updated')));
  res.json({ ok: true, data: sfLead(await col('leads').findOne({ _id: l._id })) });
}));

sampforceRouter.get('/sampforce/contacts', requireKey(['contacts:read']), ah(async (req, res) => {
  const a = listArgs(req, res, 'created');
  if (!a) return;
  if (req.query.subscribed === 'true' || req.query.subscribed === '1') a.and.push({ subscribed: true });
  if (req.query.subscribed === 'false' || req.query.subscribed === '0') a.and.push({ subscribed: { $ne: true } });
  if (req.query.source) a.and.push({ sources: { $in: list(req.query.source) } });
  await sendPage(res, 'contacts', a, 'created', sfContact);
}));
sampforceRouter.get('/sampforce/contacts/:email', requireKey(['contacts:read']), ah(async (req, res) => {
  const e = clean(String(req.params.email), 160).toLowerCase();
  const c = EMAIL.test(e) ? await col('contacts').findOne({ _id: e }) : null;
  if (!c) return res.status(404).json({ ok: false, error: 'Contact not found.' });
  res.json({ ok: true, data: sfContact(c) });
}));

sampforceRouter.get('/sampforce/reviews', requireKey(['reviews:read']), ah(async (req, res) => {
  const a = listArgs(req, res, 'date');
  if (!a) return;
  if (req.query.status) a.and.push({ status: { $in: list(req.query.status) } });
  await sendPage(res, 'reviews', a, 'date', sfReview);
}));
sampforceRouter.get('/sampforce/reviews/:id', requireKey(['reviews:read']), ah(async (req, res) => {
  const r = await col('reviews').findOne({ _id: clean(String(req.params.id), 40) });
  if (!r) return res.status(404).json({ ok: false, error: 'Review not found.' });
  res.json({ ok: true, data: sfReview(r) });
}));

/* ---- push (webhook) ---------------------------------------------------------------------------------------------- */
export const sfWebhookReady = () => !!(config.sampforce && config.sampforce.webhookUrl && config.sampforce.webhookSecret);
const eventsOn = () => (config.sampforce.events.length ? config.sampforce.events.filter((e) => SF_EVENTS.includes(e)) : DEFAULT_EVENTS);
const BACKOFF = [60e3, 5 * 60e3, 15 * 60e3, 60 * 60e3, 3 * 3600e3, 6 * 3600e3, 12 * 3600e3]; // then failed (8 tries)
export const sfSign = (secret, t, body) => crypto.createHmac('sha256', secret).update(t + '.' + body).digest('hex');

// called when a lead / sign-up / review is saved or changed; never throws, never slows the visitor's answer
export async function sfEmit(event, data, { force = false, start = true } = {}) {
  try {
    if (!sfWebhookReady() || (!force && !eventsOn().includes(event))) return null;
    const d = { _id: newId('evt_'), event, created: new Date(), status: 'pending', tries: 0, nextAt: new Date(), ref: data && data.id, data };
    await OUT().insertOne(d);
    if (start) deliver(d._id).catch(() => {});
    return d._id;
  } catch (e) { console.error('[sampforce] emit', e.message); return null; }
}

async function deliver(id) {
  const d = await OUT().findOneAndUpdate({ _id: id, status: 'pending' }, { $set: { status: 'sending', lockedAt: new Date() } }, { returnDocument: 'after' });
  if (!d) return null;
  const body = JSON.stringify({ id: d._id, event: d.event, createdAt: iso(d.created), attempt: d.tries + 1, data: d.data });
  const t = Math.floor(Date.now() / 1000);
  let code = 0, err = '';
  try {
    const r = await fetch(config.sampforce.webhookUrl, {
      method: 'POST', redirect: 'error', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/json', 'User-Agent': 'FR-Website-Sampforce/1', 'X-Sampforce-Event': d.event, 'X-Sampforce-Delivery': d._id, 'X-Sampforce-Signature': `t=${t},v1=${sfSign(config.sampforce.webhookSecret, t, body)}` },
      body,
    });
    code = r.status;
    if (!r.ok) err = `HTTP ${r.status} ${clean(await r.text().catch(() => ''), 200)}`.trim();
  } catch (e) { err = clean(String(e.message || e), 300); }
  const tries = d.tries + 1;
  const set = err
    ? { status: tries >= BACKOFF.length + 1 ? 'failed' : 'pending', tries, lastCode: code, lastError: err, lastTry: new Date(), nextAt: new Date(Date.now() + (BACKOFF[tries - 1] || 0)) }
    : { status: 'sent', tries, lastCode: code, lastError: '', lastTry: new Date(), sentAt: new Date() };
  await OUT().updateOne({ _id: d._id }, { $set: set, $unset: { lockedAt: '' } });
  return { ok: !err, code, error: err };
}

export async function sfWork() {
  // a delivery stuck in "sending" (server restarted mid-way) goes back to the queue
  await OUT().updateMany({ status: 'sending', lockedAt: { $lt: new Date(Date.now() - 2 * 60e3) } }, { $set: { status: 'pending' }, $unset: { lockedAt: '' } });
  if (!sfWebhookReady()) return;
  // at most ~25 seconds a run, so runs every 30 seconds do not pile up
  const t0 = Date.now();
  while (Date.now() - t0 < 25e3) {
    const due = await OUT().find({ status: 'pending', nextAt: { $lte: new Date() } }, { projection: { _id: 1 } }).sort({ nextAt: 1 }).limit(25).toArray();
    if (!due.length) break;
    for (const d of due) { await deliver(d._id); if (Date.now() - t0 >= 25e3) break; }
  }
}
let working = false;
export function startSampforceWorker() {
  setInterval(() => { if (working) return; working = true; sfWork().catch((e) => console.error('[sampforce]', e.message)).finally(() => { working = false; }); }, 30e3).unref();
}

/* ---- super admin: System › Sampforce ---------------------------------------------------------------------------- */
sampforceRouter.get('/admin/sampforce', requireAdmin, ah(async (req, res) => {
  const [keys, counts, recent] = await Promise.all([
    KEYS().find({}).sort({ created: -1 }).limit(200).toArray(),
    OUT().aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray(),
    OUT().find({}, { projection: { data: 0 } }).sort({ created: -1 }).limit(30).toArray(),
  ]);
  const url = config.sampforce.webhookUrl;
  res.json({
    ok: true,
    baseUrl: config.publicUrl + '/api/v1/sampforce',
    scopes: SF_SCOPES, defaultScopes: SF_DEFAULT_SCOPES, events: SF_EVENTS,
    keys: keys.map(keyOut),
    webhook: { ready: sfWebhookReady(), url: url ? url.replace(/^(https:\/\/[^/?#]+).*/, '$1/…') : '', secret: !!config.sampforce.webhookSecret, events: eventsOn() },
    outbox: Object.fromEntries(counts.map((c) => [c._id, c.n])),
    recent: recent.map((d) => ({ id: d._id, event: d.event, ref: d.ref || '', status: d.status, tries: d.tries, lastCode: d.lastCode || 0, lastError: d.lastError || '', created: d.created, sentAt: d.sentAt || null, nextAt: d.status === 'pending' ? d.nextAt : null })),
  });
}));

sampforceRouter.post('/admin/sampforce/keys', requireAdmin, ah(async (req, res) => {
  const b = req.body || {};
  const name = clean(b.name, 80);
  if (name.length < 2) return res.status(422).json({ ok: false, error: 'Give the key a name, e.g. "Sampforce production".' });
  const scopes = Array.isArray(b.scopes) && b.scopes.length ? [...new Set(b.scopes.map(String))] : SF_DEFAULT_SCOPES;
  const bad = scopes.find((x) => !SF_SCOPES[x]);
  if (bad) return res.status(422).json({ ok: false, error: `${clean(bad, 40)} is not a right. Use: ${Object.keys(SF_SCOPES).join(', ')}` });
  const ips = (Array.isArray(b.ips) ? b.ips : list(b.ips)).map((x) => normIp(clean(String(x), 60))).filter(Boolean).slice(0, 20);
  if (ips.some((x) => !/^[0-9a-f:.]+$/i.test(x))) return res.status(422).json({ ok: false, error: 'IP addresses: write them like 203.0.113.10, separated by commas.' });
  const days = Math.floor(+b.expiresDays || 0);
  const raw = 'sfk_' + crypto.randomBytes(30).toString('base64url');
  const k = { _id: newId('ak_'), name, prefix: raw.slice(0, 10), hash: sha(raw), scopes, ips, created: new Date(), by: req.admin.user.email || req.admin.user._id, expires: days > 0 ? new Date(Date.now() + days * 86400e3) : null, revoked: false };
  await KEYS().insertOne(k);
  await audit(req, 'sampforce-key-create', k._id, { name, scopes, ips: ips.length, expires: k.expires });
  res.json({ ok: true, key: raw, item: keyOut(k), note: 'Copy this key now: it is shown only once.' });
}));

sampforceRouter.delete('/admin/sampforce/keys/:id', requireAdmin, ah(async (req, res) => {
  const r = await KEYS().findOneAndUpdate({ _id: String(req.params.id), revoked: { $ne: true } }, { $set: { revoked: true, revokedAt: new Date(), revokedBy: req.admin.user.email } }, { returnDocument: 'after' });
  if (!r) return res.status(404).json({ ok: false, error: 'Key not found or already revoked.' });
  await audit(req, 'sampforce-key-revoke', r._id, { name: r.name });
  res.json({ ok: true, item: keyOut(r) });
}));

sampforceRouter.post('/admin/sampforce/test', requireAdmin, ah(async (req, res) => {
  if (!sfWebhookReady()) return res.status(503).json({ ok: false, error: 'Add SAMPFORCE_WEBHOOK_URL and SAMPFORCE_WEBHOOK_SECRET in Connections & keys first.' });
  const id = await sfEmit('ping', { id: 'test', message: 'Test from the website super admin', by: req.admin.user.name || '', at: new Date().toISOString() }, { force: true, start: false });
  const r = (id && (await deliver(id))) || { ok: false, error: 'Could not queue the test.' };
  // a test that failed is not tried again by itself
  if (id && !r.ok) await OUT().updateOne({ _id: id }, { $set: { status: 'failed' } });
  await audit(req, 'sampforce-test', id, { ok: r.ok });
  res.status(r.ok ? 200 : 502).json({ ok: r.ok, code: r.code || 0, error: r.ok ? '' : r.error || 'No answer from Sampforce.' });
}));

sampforceRouter.post('/admin/sampforce/outbox/retry', requireAdmin, ah(async (req, res) => {
  const b = req.body || {};
  const f = b.id ? { _id: String(b.id), status: { $in: ['failed', 'pending'] } } : { status: 'failed' };
  const r = await OUT().updateMany(f, { $set: { status: 'pending', nextAt: new Date(), tries: 0 } });
  await audit(req, 'sampforce-retry', b.id || 'failed', { n: r.modifiedCount });
  sfWork().catch(() => {});
  res.json({ ok: true, queued: r.modifiedCount });
}));

// send leads that came in before the webhook was set up (lead.created, marked backfill: true), at most 5,000 a time
sampforceRouter.post('/admin/sampforce/backfill', requireAdmin, ah(async (req, res) => {
  if (!sfWebhookReady()) return res.status(503).json({ ok: false, error: 'Add SAMPFORCE_WEBHOOK_URL and SAMPFORCE_WEBHOOK_SECRET in Connections & keys first.' });
  const b = req.body || {};
  const since = when(b.since);
  if (since === undefined) return res.status(422).json({ ok: false, error: 'since must be a date, e.g. 2026-11-01.' });
  const careers = eventsOn().includes('careers.created');
  const f = { ...(since ? { at: { $gte: since } } : {}), ...(careers ? {} : { kind: { $ne: 'careers' } }) };
  const rows = await col('leads').find(f).sort({ at: 1 }).limit(5000).toArray();
  const now = new Date();
  const docs = rows.map((l, i) => ({ _id: newId('evt_'), event: l.kind === 'careers' ? 'careers.created' : 'lead.created', created: now, status: 'pending', tries: 0, nextAt: new Date(+now + i * 200), ref: l._id, backfill: true, data: { ...sfLead(l), backfill: true } }));
  if (docs.length) await OUT().insertMany(docs);
  await audit(req, 'sampforce-backfill', since ? iso(since) : 'all', { n: docs.length });
  sfWork().catch(() => {});
  res.json({ ok: true, queued: docs.length, more: rows.length === 5000 });
}));
