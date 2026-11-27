// Build 78: contacts, email templates, automations and newsletters.
//   Every form, download, careers application and chat adds or updates a contact (MongoDB "contacts", one per email).
//   Automations send the right template on their own: an instant reply to every form (by form and service), an alert to
//   the team, follow-ups after an enquiry, a welcome to new subscribers and, when switched on, a periodic newsletter.
//   Newsletters (campaigns) go to a segment of subscribed contacts, now or at a set time. Emails wait in "mail_queue"
//   and a background worker sends them at MAIL_PER_MINUTE. Marketing emails only go to people who ticked consent or
//   subscribed, and every one carries an unsubscribe link.
//
//   POST /api/v1/newsletter                      { email, name?, consent: true }  public sign-up
//   GET  /api/v1/mail/unsubscribe?e=&t=          one-click unsubscribe page;  GET /api/v1/mail/o/:id.gif  open pixel
//   GET  /api/v1/admin/marketing/stats           contacts, people per form and service, queue, last campaigns
//   GET  /api/v1/admin/contacts                  ?q=&form=&service=&subscribed=&format=csv ; PATCH/DELETE /:email ; POST /import
//   GET  /api/v1/admin/mail/templates            built-in + admin templates and the designs;  PUT { templates }
//   POST /api/v1/admin/mail/preview              { template, vars } -> { subject, html }
//   POST /api/v1/admin/mail/test                 { template, to }
//   GET/PUT /api/v1/admin/mail/automations
//   GET  /api/v1/admin/campaigns ; POST (create) ; PUT /:id ; POST /:id/send { at? } ; POST /:id/cancel ; DELETE /:id
//   GET  /api/v1/admin/mail/queue                ?status=   ;  POST /admin/mail/queue/retry
//   POST /api/v1/admin/mail/queue/cancel         stop every queued email ; POST /admin/mail/queue/:id/cancel ; POST /admin/mail/queue/:id/send (send now)
import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from '../config.js';
import { col } from '../db.js';
import { getContent, putContent } from './content.js';
import { ah, audit, clean, EMAIL, newId, rateLimit, requireAdmin, toCsv } from '../lib/util.js';
import { mailReady, mailStatus, sendMail } from '../lib/mailer.js';
import { BUILTIN_TEMPLATES, DESIGNS, renderTemplate, replyFor } from '../lib/mailtpl.js';
import { escapeRe } from './admin.js';
import { sfContact, sfEmit } from './sampforce.js';

export const marketingRouter = Router();

const unsubToken = (email) => crypto.createHmac('sha256', config.secret + '|unsub').update(String(email).toLowerCase()).digest('base64url').slice(0, 22);
const unsubUrl = (email) => `${config.publicUrl}/api/v1/mail/unsubscribe?e=${encodeURIComponent(email)}&t=${unsubToken(email)}`;
const uniq = (a) => [...new Set(a.filter(Boolean))];

/* ---- templates and automations ---------------------------------------------------------------------------------- */
export async function getTemplates() {
  const saved = (await getContent('mail-templates')) || [];
  const byId = new Map(BUILTIN_TEMPLATES.map((t) => [t.id, { ...t }]));
  for (const t of Array.isArray(saved) ? saved : []) if (t && t.id) byId.set(t.id, { ...(byId.get(t.id) || {}), ...t, builtIn: byId.has(t.id) && byId.get(t.id).builtIn });
  return [...byId.values()];
}
const templateById = async (id) => (await getTemplates()).find((t) => t.id === id);

export const BUILTIN_AUTOMATIONS = [
  { id: 'auto-reply', name: 'Instant reply to every form (the template follows the form and the service)', on: true, trigger: { type: 'lead', kinds: [], match: '' }, audience: 'person', steps: [{ days: 0, template: 'auto' }], marketing: false },
  { id: 'team-alert', name: 'Alert the team about every new lead (MAIL_NOTIFY and the addresses set per form)', on: true, trigger: { type: 'lead', kinds: [], match: '' }, audience: 'team', steps: [{ days: 0, template: 'notify-team' }], marketing: false },
  { id: 'enquiry-follow-up', name: 'Follow up enquiries after 3 and 10 days (people who ticked consent)', on: true, trigger: { type: 'lead', kinds: ['enquiry'], match: '' }, audience: 'person', steps: [{ days: 3, template: 'followup-1' }, { days: 10, template: 'followup-2' }], marketing: true },
  { id: 'welcome', name: 'Welcome new newsletter subscribers', on: true, trigger: { type: 'subscribe' }, audience: 'person', steps: [{ days: 0, template: 'welcome-newsletter' }], marketing: true },
  { id: 'monthly-newsletter', name: 'Monthly newsletter to every subscriber (1st of the month, 10:00 India time)', on: false, trigger: { type: 'schedule', every: 'month', day: 1, hour: 10 }, audience: 'segment', segment: {}, steps: [{ days: 0, template: 'newsletter-monthly' }], marketing: true },
];
export async function getAutomations() {
  const saved = (await getContent('mail-automations')) || [];
  const byId = new Map(BUILTIN_AUTOMATIONS.map((a) => [a.id, { ...a, builtIn: true }]));
  for (const a of Array.isArray(saved) ? saved : []) if (a && a.id) byId.set(a.id, { ...(byId.get(a.id) || {}), ...a, builtIn: byId.has(a.id) });
  return [...byId.values()];
}

/* ---- contacts ----------------------------------------------------------------------------------------------------- */
const formOf = (lead) => lead.formKey || lead.kind;
export async function upsertContact(lead, { subscribe = false, source = '' } = {}) {
  const email = clean(lead.email, 160).toLowerCase();
  if (!EMAIL.test(email)) return null;
  const now = new Date();
  const consent = subscribe || lead.consent === true || lead.consent === 'true' || lead.consent === 'on' || lead.newsletter === true;
  const name = clean(lead.name || [lead.first, lead.last].filter(Boolean).join(' '), 120);
  const set = { updated: now, last: now };
  for (const k of ['phone', 'company', 'country', 'designation']) if (lead[k]) set[k] = clean(String(lead[k]), 120);
  if (name) set.name = name;
  if (consent) { set.subscribed = true; set.consentAt = now; }
  const add = { forms: formOf(lead), services: clean(lead.service || lead.resource || lead.title || '', 160) || undefined, sources: source || lead.kind };
  const r = await col('contacts').findOneAndUpdate({ _id: email }, {
    $set: set,
    $setOnInsert: { email, created: now, ...(consent ? {} : { subscribed: false }) },
    $addToSet: Object.fromEntries(Object.entries(add).filter(([, v]) => v)),
    $inc: { leads: lead.kind ? 1 : 0 },
  }, { upsert: true, returnDocument: 'after' });
  return r;
}

const matchSeg = (seg = {}) => {
  const f = { subscribed: true };
  if (Array.isArray(seg.forms) && seg.forms.length) f.forms = { $in: seg.forms };
  if (Array.isArray(seg.services) && seg.services.length) f.services = { $in: seg.services.map((s) => new RegExp(escapeRe(s), 'i')) };
  if (Array.isArray(seg.tags) && seg.tags.length) f.tags = { $in: seg.tags };
  if (Array.isArray(seg.countries) && seg.countries.length) f.country = { $in: seg.countries };
  return f;
};

/* ---- the queue ---------------------------------------------------------------------------------------------------- */
async function enqueue(items) {
  if (!items.length) return 0;
  await col('mail_queue').insertMany(items.map((x) => ({ _id: newId('q_'), status: 'queued', tries: 0, created: new Date(), ...x })));
  return items.length;
}
const varsOf = (lead = {}, contact = {}) => {
  const v = {};
  for (const k of ['name', 'first', 'last', 'email', 'company', 'phone', 'country', 'service', 'resource', 'title', 'page', 'message', 'department', 'designation', 'type', 'kind']) {
    const x = lead[k] != null && lead[k] !== '' ? lead[k] : contact[k];
    if (x != null && typeof x !== 'object') v[k] = String(x).slice(0, 1000);
  }
  if (!v.name && (lead.first || lead.last)) v.name = [lead.first, lead.last].filter(Boolean).join(' ');
  if (!v.service) v.service = lead.resource || lead.title || lead.type || 'our services';
  if (!v.resource) v.resource = lead.title || 'your download';
  if (!v.title) v.title = lead.resource || '';
  return v;
};
const matchLead = (a, lead) => {
  const t = a.trigger || {};
  if (Array.isArray(t.kinds) && t.kinds.length && !t.kinds.includes(lead.kind) && !t.kinds.includes(lead.formKey)) return false;
  if (t.match) { const hay = `${lead.service || ''} ${lead.type || ''} ${lead.page || ''} ${lead.formKey || ''} ${lead.resource || ''}`.toLowerCase(); if (!String(t.match).toLowerCase().split(/\s*,\s*/).some((m) => m && hay.includes(m))) return false; }
  return true;
};

// called by saveLead for every new form, download, careers application and chat
export async function onLead(lead) {
  try {
    const contact = await upsertContact(lead);
    // per-form email settings (private: the team addresses never go to the website)
    const fm = (await getContent('forms-mail')) || {};
    const fc = fm[lead.formKey] || fm[lead.kind] || {};
    const autos = (await getAutomations()).filter((a) => a.on && a.trigger && a.trigger.type === 'lead' && matchLead(a, lead));
    const now = Date.now(), items = [], v = varsOf(lead, contact || {});
    for (const a of autos) {
      if (a.id === 'auto-reply' && fc.autoReply === false) continue;
      const to = a.audience === 'team' ? uniq([...config.mail.notify, ...String(fc.notify || '').split(/[,; ]+/)]).filter((e) => EMAIL.test(e)) : [lead.email];
      if (a.marketing && !(contact && contact.subscribed)) continue;
      for (const s of a.steps || []) {
        const tpl = s.template === 'auto' ? (fc.replyTemplate || replyFor(lead)) : s.template;
        for (const t of to) items.push({ to: t, template: tpl, vars: { ...v, kind: lead.kind }, sendAt: new Date(now + (+s.days || 0) * 86400e3), automation: a.id, lead: lead._id, marketing: !!a.marketing });
      }
    }
    await enqueue(items.filter((x) => EMAIL.test(x.to)));
  } catch (e) { console.error('[mail] onLead', e.message); }
}

async function onSubscribe(contact) {
  const autos = (await getAutomations()).filter((a) => a.on && a.trigger && a.trigger.type === 'subscribe');
  const items = [];
  for (const a of autos) for (const s of a.steps || []) items.push({ to: contact.email, template: s.template, vars: varsOf({}, contact), sendAt: new Date(Date.now() + (+s.days || 0) * 86400e3), automation: a.id, marketing: true });
  await enqueue(items);
}

async function startCampaign(c, at) {
  const rows = await col('contacts').find(matchSeg(c.segment), { projection: { email: 1, name: 1, company: 1, country: 1 } }).toArray();
  const t0 = Math.max(Date.now(), +new Date(at || Date.now()) || Date.now()), gap = 60000 / config.mail.perMinute;
  await enqueue(rows.map((r, i) => ({ to: r.email, template: c.template, inline: c.inline || null, vars: varsOf({}, r), sendAt: new Date(t0 + i * gap), campaign: c._id, marketing: true })));
  await col('campaigns').updateOne({ _id: c._id }, { $set: { status: 'sending', started: new Date(), audience: rows.length } });
  return rows.length;
}

// one email from the queue: sent, skipped (unsubscribed) or tried again later; returns the new status
async function sendOne(q, tpls, mailSet) {
  try {
    if (q.marketing) { const c = await col('contacts').findOne({ _id: q.to }); if (!c || c.subscribed === false) { await col('mail_queue').updateOne({ _id: q._id }, { $set: { status: 'skipped', reason: 'unsubscribed' } }); return 'skipped'; } }
    const t = q.inline || tpls.find((x) => x.id === q.template);
    if (!t) throw new Error('template ' + q.template + ' not found');
    const pixel = `${config.publicUrl}/api/v1/mail/o/${q._id}.gif`;
    const r = renderTemplate(t, { ...q.vars, unsubscribe: q.marketing ? unsubUrl(q.to) : '' }, { pixel, logo: mailSet.logo });
    const headers = q.marketing ? { 'List-Unsubscribe': `<${unsubUrl(q.to)}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' } : {};
    const s = await sendMail({ to: q.to, subject: r.subject, html: r.html, text: r.text, headers });
    await col('mail_queue').updateOne({ _id: q._id }, { $set: { status: 'sent', sent: new Date(), providerId: s.id || '', subject: r.subject } });
    await col('contacts').updateOne({ _id: q.to }, { $set: { lastMail: new Date() }, $inc: { mails: 1 } });
    return 'sent';
  } catch (e) {
    const tries = (q.tries || 0) + 1, status = tries >= 3 ? 'failed' : 'queued';
    await col('mail_queue').updateOne({ _id: q._id }, { $set: { status, error: String(e.message).slice(0, 300), sendAt: new Date(Date.now() + tries * 10 * 60e3) }, $inc: { tries: 1 } });
    return status;
  }
}

let working = false;
async function workQueue() {
  if (working || !mailReady()) return;
  working = true;
  try {
    const due = await col('mail_queue').find({ status: 'queued', sendAt: { $lte: new Date() } }).sort({ sendAt: 1 }).limit(Math.ceil(config.mail.perMinute / 4)).toArray();
    const tpls = due.length ? await getTemplates() : [];
    const mailSet = (await getContent('mail-settings')) || {};
    for (const q of due) await sendOne(q, tpls, mailSet);
    // campaigns that have nothing left to send are done
    const sending = await col('campaigns').find({ status: 'sending' }).toArray();
    for (const c of sending) if (!(await col('mail_queue').countDocuments({ campaign: c._id, status: 'queued' }))) await col('campaigns').updateOne({ _id: c._id }, { $set: { status: 'sent', finished: new Date() } });
  } catch (e) { console.error('[mail] worker', e.message); }
  working = false;
}

// scheduled campaigns and periodic newsletters (times are India time)
const ist = (d = new Date()) => new Date(d.getTime() + 5.5 * 3600e3);
async function workSchedules() {
  try {
    for (const c of await col('campaigns').find({ status: 'scheduled', sendAt: { $lte: new Date() } }).toArray()) await startCampaign(c, c.sendAt);
    const now = ist(), state = (await getContent('mail-schedule-state')) || {};
    let changed = false;
    for (const a of (await getAutomations()).filter((x) => x.on && x.trigger && x.trigger.type === 'schedule')) {
      const t = a.trigger, key = t.every === 'week' ? `${now.getUTCFullYear()}-w${Math.floor((now - Date.UTC(now.getUTCFullYear(), 0, 1)) / 6048e5)}` : `${now.getUTCFullYear()}-${now.getUTCMonth() + 1}`;
      const dayOk = t.every === 'week' ? now.getUTCDay() === (+t.day || 1) % 7 : now.getUTCDate() === (+t.day || 1);
      if (!dayOk || now.getUTCHours() < (+t.hour || 10) || state[a.id] === key) continue;
      const c = { _id: newId('cm_'), name: `${a.name} (${key})`, template: a.steps[0] && a.steps[0].template, segment: a.segment || {}, status: 'draft', created: new Date(), automation: a.id };
      await col('campaigns').insertOne(c);
      await startCampaign(c);
      state[a.id] = key; changed = true;
    }
    if (changed) await col('content').updateOne({ _id: 'mail-schedule-state' }, { $set: { data: state, updated: new Date() } }, { upsert: true });
  } catch (e) { console.error('[mail] schedules', e.message); }
}

export function startMailWorkers() {
  setInterval(workQueue, 15000).unref();
  setInterval(workSchedules, 5 * 60e3).unref();
  setTimeout(workSchedules, 20000).unref();
}

/* ---- public ------------------------------------------------------------------------------------------------------- */
marketingRouter.post('/newsletter', rateLimit('nl', 10, 3600e3), ah(async (req, res) => {
  const b = req.body || {};
  if (b.website) return res.json({ ok: true });
  const email = clean(b.email, 160).toLowerCase();
  if (!EMAIL.test(email)) return res.status(422).json({ ok: false, error: 'Enter a valid email.' });
  if (b.consent !== true && b.consent !== 'true' && b.consent !== 'on') return res.status(422).json({ ok: false, error: 'Please tick the box to agree to receive our emails.' });
  const before = await col('contacts').findOne({ _id: email });
  const c = await upsertContact({ email, name: clean(b.name, 120), service: clean(b.topic, 120) }, { subscribe: true, source: 'newsletter' });
  if (!before || !before.subscribed) { await onSubscribe(c); if (c) sfEmit('newsletter.subscribed', sfContact(c)); }
  res.json({ ok: true, message: 'Thank you! Please look out for our next newsletter.' });
}));

const page = (t, p) => `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${t}</title></head><body style="font:16px/1.6 Arial,sans-serif;background:#EEF2FB;color:#0B1437;display:grid;place-items:center;min-height:100vh;margin:0"><main style="background:#fff;border-radius:20px;padding:40px;max-width:460px;box-shadow:0 10px 30px rgba(11,20,55,.1)"><h1 style="margin:0 0 12px;font-size:24px">${t}</h1><p>${p}</p><p><a href="${config.publicUrl}" style="color:#2F6BFF">Back to frequentresearch.com</a></p></main></body></html>`;
const unsub = ah(async (req, res) => {
  const e = clean(req.query.e, 160).toLowerCase(), t = String(req.query.t || '');
  const ok = EMAIL.test(e) && t.length === 22 && crypto.timingSafeEqual(Buffer.from(t), Buffer.from(unsubToken(e)));
  if (!ok) return res.status(400).type('html').send(page('Link not valid', 'This unsubscribe link is not complete. Reply to any of our emails and we will remove you by hand.'));
  await col('contacts').updateOne({ _id: e }, { $set: { subscribed: false, unsubscribed: new Date() } });
  res.type('html').send(page('You are unsubscribed', `We will not send marketing emails to ${e.replace(/</g, '')} any more. Replies to your own enquiries still reach you.`));
});
marketingRouter.get('/mail/unsubscribe', unsub);
marketingRouter.post('/mail/unsubscribe', unsub); // one-click from the inbox (List-Unsubscribe-Post)

const GIF = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');
marketingRouter.get('/mail/o/:id.gif', ah(async (req, res) => {
  col('mail_queue').updateOne({ _id: String(req.params.id), opened: { $exists: false } }, { $set: { opened: new Date() } }).catch(() => {});
  res.set('Cache-Control', 'no-store').type('gif').send(GIF);
}));

/* ---- admin -------------------------------------------------------------------------------------------------------- */
marketingRouter.get('/admin/marketing/stats', requireAdmin, ah(async (req, res) => {
  const [total, subscribed, byForm, byService, byCountry, queue, campaigns, leadPeople] = await Promise.all([
    col('contacts').countDocuments({}),
    col('contacts').countDocuments({ subscribed: true }),
    col('contacts').aggregate([{ $unwind: '$forms' }, { $group: { _id: '$forms', n: { $sum: 1 } } }, { $sort: { n: -1 } }]).toArray(),
    col('contacts').aggregate([{ $unwind: '$services' }, { $group: { _id: '$services', n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 40 }]).toArray(),
    col('contacts').aggregate([{ $match: { country: { $nin: [null, ''] } } }, { $group: { _id: '$country', n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 20 }]).toArray(),
    col('mail_queue').aggregate([{ $group: { _id: '$status', n: { $sum: 1 }, opened: { $sum: { $cond: [{ $ifNull: ['$opened', false] }, 1, 0] } } } }]).toArray(),
    col('campaigns').find({}).sort({ created: -1 }).limit(10).toArray(),
    col('leads').aggregate([{ $match: { email: { $nin: [null, ''] } } }, { $group: { _id: { $ifNull: ['$formKey', '$kind'] }, people: { $addToSet: '$email' }, n: { $sum: 1 } } }, { $project: { n: 1, people: { $size: '$people' } } }, { $sort: { people: -1 } }]).toArray(),
  ]);
  res.json({ ok: true, mail: mailStatus(), contacts: { total, subscribed, byForm: byForm.map((x) => ({ form: x._id, n: x.n })), byService: byService.map((x) => ({ service: x._id, n: x.n })), byCountry: byCountry.map((x) => ({ country: x._id, n: x.n })) },
    forms: leadPeople.map((x) => ({ form: x._id, submissions: x.n, people: x.people })),
    queue: Object.fromEntries(queue.map((q) => [q._id, q.n])), opened: queue.reduce((a, q) => a + q.opened, 0),
    campaigns: campaigns.map(({ _id, inline, ...c }) => ({ id: _id, ...c })) });
}));

const contactFilter = (req) => {
  const f = {}, q = clean(req.query.q, 80);
  if (q) { const re = { $regex: escapeRe(q), $options: 'i' }; f.$or = ['email', 'name', 'company', 'country', 'phone'].map((k) => ({ [k]: re })); }
  if (req.query.form) f.forms = String(req.query.form);
  if (req.query.service) f.services = { $regex: escapeRe(String(req.query.service)), $options: 'i' };
  if (req.query.tag) f.tags = String(req.query.tag);
  if (req.query.subscribed === 'yes') f.subscribed = true;
  if (req.query.subscribed === 'no') f.subscribed = { $ne: true };
  return f;
};
const outC = ({ _id, ...c }) => ({ id: _id, ...c });
marketingRouter.get('/admin/contacts', requireAdmin, ah(async (req, res) => {
  const f = contactFilter(req);
  if (req.query.format === 'csv') {
    const all = (await col('contacts').find(f).sort({ last: -1 }).limit(100000).toArray()).map((c) => ({ ...c, forms: (c.forms || []).join('; '), services: (c.services || []).join('; '), tags: (c.tags || []).join('; ') }));
    await audit(req, 'export-contacts', 'contacts', { rows: all.length });
    return res.type('text/csv; charset=utf-8').attachment('contacts.csv').send(toCsv(['email', 'name', 'company', 'phone', 'country', 'subscribed', 'forms', 'services', 'tags', 'leads', 'mails', 'created', 'last'], all));
  }
  const limit = Math.min(500, +req.query.limit || 100), skip = Math.max(0, +req.query.skip || 0);
  const [rows, total] = await Promise.all([col('contacts').find(f).sort({ last: -1 }).skip(skip).limit(limit).toArray(), col('contacts').countDocuments(f)]);
  res.json({ ok: true, total, contacts: rows.map(outC) });
}));
marketingRouter.patch('/admin/contacts/:email', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, set = {};
  if (typeof b.subscribed === 'boolean') set.subscribed = b.subscribed;
  if (Array.isArray(b.tags)) set.tags = b.tags.map((t) => clean(t, 40)).filter(Boolean).slice(0, 30);
  if (b.note != null) set.note = clean(b.note, 2000);
  if (!Object.keys(set).length) return res.status(400).json({ ok: false, error: 'Nothing to change' });
  const r = await col('contacts').updateOne({ _id: String(req.params.email).toLowerCase() }, { $set: set });
  if (!r.matchedCount) return res.status(404).json({ ok: false });
  await audit(req, 'update-contact', req.params.email, set);
  res.json({ ok: true });
}));
marketingRouter.delete('/admin/contacts/:email', requireAdmin, ah(async (req, res) => {
  await col('contacts').deleteOne({ _id: String(req.params.email).toLowerCase() });
  await col('mail_queue').deleteMany({ to: String(req.params.email).toLowerCase(), status: 'queued' });
  await audit(req, 'delete-contact', req.params.email);
  res.json({ ok: true });
}));
// rows: [{ email, name, company, country, tags }] (from a spreadsheet); only people who agreed to receive emails
marketingRouter.post('/admin/contacts/import', requireAdmin, ah(async (req, res) => {
  const rows = Array.isArray(req.body && req.body.rows) ? req.body.rows.slice(0, 20000) : [];
  let n = 0;
  for (const r of rows) {
    const c = await upsertContact({ email: r.email, name: r.name, company: r.company, country: r.country }, { subscribe: !!(req.body.subscribed), source: 'import' });
    if (c) { n++; if (Array.isArray(r.tags) || typeof r.tags === 'string') await col('contacts').updateOne({ _id: c._id }, { $addToSet: { tags: { $each: (Array.isArray(r.tags) ? r.tags : String(r.tags).split(/[;,]/)).map((t) => clean(t, 40)).filter(Boolean) } } }); }
  }
  await audit(req, 'import-contacts', 'contacts', { rows: n });
  res.json({ ok: true, imported: n });
}));

marketingRouter.get('/admin/mail/templates', requireAdmin, ah(async (req, res) => {
  res.json({ ok: true, templates: await getTemplates(), designs: DESIGNS, builtIn: BUILTIN_TEMPLATES.map((t) => t.id), mail: mailStatus(), settings: (await getContent('mail-settings')) || {} });
}));
marketingRouter.put('/admin/mail/templates', requireAdmin, ah(async (req, res) => {
  const list = Array.isArray(req.body && req.body.templates) ? req.body.templates : null;
  if (!list) return res.status(400).json({ ok: false, error: 'Body must be { templates: [...] }' });
  for (const t of list) if (!t || !/^[a-z0-9-]{2,60}$/.test(t.id || '') || typeof t.subject !== 'string') return res.status(400).json({ ok: false, error: 'Every template needs an id (a-z, 0-9, -) and a subject' });
  await putContent(req, 'mail-templates', list.map(({ builtIn, ...t }) => t));
  if (req.body.settings && typeof req.body.settings === 'object') await putContent(req, 'mail-settings', req.body.settings);
  res.json({ ok: true });
}));
const sample = { name: 'Kunal Sharma', first: 'Kunal', email: 'kunal@example.com', company: 'Example Ltd', service: 'Consumer panel research', resource: 'India Consumer Panel Book', title: 'Understanding readers of a fiction imprint', department: 'Market Research', page: '/lets-talk', phone: '+91 98765 43210', kind: 'enquiry', message: 'We need 1,000 completes in India.' };
marketingRouter.post('/admin/mail/preview', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, t = b.template && typeof b.template === 'object' ? b.template : await templateById(String(b.template || ''));
  if (!t) return res.status(404).json({ ok: false, error: 'Template not found' });
  const set = (await getContent('mail-settings')) || {};
  const r = renderTemplate(t, { ...sample, ...(b.vars || {}), unsubscribe: '#unsubscribe' }, { logo: set.logo });
  res.json({ ok: true, subject: r.subject, html: r.html, text: r.text });
}));
marketingRouter.post('/admin/mail/test', requireAdmin, rateLimit('mtest', 30, 3600e3), ah(async (req, res) => {
  const b = req.body || {}, to = clean(b.to, 160).toLowerCase();
  if (!EMAIL.test(to)) return res.status(422).json({ ok: false, error: 'Enter the address to send the test to.' });
  const t = b.template && typeof b.template === 'object' ? b.template : await templateById(String(b.template || ''));
  if (!t) return res.status(404).json({ ok: false, error: 'Template not found' });
  const set = (await getContent('mail-settings')) || {};
  const r = renderTemplate(t, { ...sample, email: to, unsubscribe: unsubUrl(to) }, { logo: set.logo });
  try { await sendMail({ to, subject: '[Test] ' + r.subject, html: r.html, text: r.text }); }
  catch (e) { return res.status(503).json({ ok: false, error: e.message }); }
  await audit(req, 'mail-test', to, { template: t.id });
  res.json({ ok: true });
}));

marketingRouter.get('/admin/mail/automations', requireAdmin, ah(async (req, res) => res.json({ ok: true, automations: await getAutomations(), mail: mailStatus() })));
marketingRouter.put('/admin/mail/automations', requireAdmin, ah(async (req, res) => {
  const list = Array.isArray(req.body && req.body.automations) ? req.body.automations : null;
  if (!list) return res.status(400).json({ ok: false, error: 'Body must be { automations: [...] }' });
  for (const a of list) {
    if (!a || !/^[a-z0-9-]{2,60}$/.test(a.id || '') || !a.trigger || !['lead', 'subscribe', 'schedule'].includes(a.trigger.type)) return res.status(400).json({ ok: false, error: 'Every automation needs an id and a trigger (lead, subscribe or schedule)' });
    if (!Array.isArray(a.steps) || !a.steps.length || a.steps.some((s) => !s || !s.template || !(+s.days >= 0) || +s.days > 365)) return res.status(400).json({ ok: false, error: `"${a.name || a.id}": every step needs a template and a delay of 0 to 365 days` });
  }
  await putContent(req, 'mail-automations', list.map(({ builtIn, ...a }) => a));
  res.json({ ok: true });
}));

marketingRouter.get('/admin/campaigns', requireAdmin, ah(async (req, res) => {
  const rows = await col('campaigns').find({}).sort({ created: -1 }).limit(200).toArray();
  const ids = rows.map((r) => r._id);
  const st = await col('mail_queue').aggregate([{ $match: { campaign: { $in: ids } } }, { $group: { _id: { c: '$campaign', s: '$status' }, n: { $sum: 1 }, o: { $sum: { $cond: [{ $ifNull: ['$opened', false] }, 1, 0] } } } }]).toArray();
  const stats = {};
  for (const s of st) { const o = (stats[s._id.c] ||= { opened: 0 }); o[s._id.s] = s.n; o.opened += s.o; }
  res.json({ ok: true, campaigns: rows.map(({ _id, ...c }) => ({ id: _id, ...c, stats: stats[_id] || {} })) });
}));
const campaignBody = (b) => ({ name: clean(b.name, 160) || 'Newsletter', template: clean(b.template, 60), inline: b.inline && typeof b.inline === 'object' ? b.inline : null, segment: b.segment && typeof b.segment === 'object' ? b.segment : {} });
marketingRouter.post('/admin/campaigns', requireAdmin, ah(async (req, res) => {
  const c = { _id: newId('cm_'), ...campaignBody(req.body || {}), status: 'draft', created: new Date() };
  if (!c.template && !c.inline) return res.status(400).json({ ok: false, error: 'Choose a template' });
  await col('campaigns').insertOne(c);
  await audit(req, 'create-campaign', c._id, { name: c.name });
  res.json({ ok: true, id: c._id });
}));
marketingRouter.put('/admin/campaigns/:id', requireAdmin, ah(async (req, res) => {
  const r = await col('campaigns').updateOne({ _id: String(req.params.id), status: { $in: ['draft', 'scheduled'] } }, { $set: { ...campaignBody(req.body || {}), updated: new Date() } });
  if (!r.matchedCount) return res.status(409).json({ ok: false, error: 'Only drafts and scheduled newsletters can be changed' });
  res.json({ ok: true });
}));
marketingRouter.post('/admin/campaigns/:id/count', requireAdmin, ah(async (req, res) => res.json({ ok: true, n: await col('contacts').countDocuments(matchSeg((req.body || {}).segment)) })));
marketingRouter.post('/admin/campaigns/:id/send', requireAdmin, ah(async (req, res) => {
  const c = await col('campaigns').findOne({ _id: String(req.params.id) });
  if (!c) return res.status(404).json({ ok: false });
  if (!['draft', 'scheduled'].includes(c.status)) return res.status(409).json({ ok: false, error: 'This newsletter was already sent' });
  const at = req.body && req.body.at ? new Date(req.body.at) : null;
  if (at && !isNaN(at) && at > new Date(Date.now() + 60e3)) {
    await col('campaigns').updateOne({ _id: c._id }, { $set: { status: 'scheduled', sendAt: at } });
    await audit(req, 'schedule-campaign', c._id, { at });
    return res.json({ ok: true, scheduled: at });
  }
  const n = await startCampaign(c);
  await audit(req, 'send-campaign', c._id, { audience: n });
  res.json({ ok: true, audience: n, mailReady: mailReady() });
}));
marketingRouter.post('/admin/campaigns/:id/cancel', requireAdmin, ah(async (req, res) => {
  const id = String(req.params.id);
  const q = await col('mail_queue').deleteMany({ campaign: id, status: 'queued' });
  await col('campaigns').updateOne({ _id: id }, { $set: { status: 'cancelled', cancelled: new Date() } });
  await audit(req, 'cancel-campaign', id, { removed: q.deletedCount });
  res.json({ ok: true, removed: q.deletedCount });
}));
marketingRouter.delete('/admin/campaigns/:id', requireAdmin, ah(async (req, res) => {
  const id = String(req.params.id);
  await col('mail_queue').deleteMany({ campaign: id, status: 'queued' });
  await col('campaigns').deleteOne({ _id: id });
  await audit(req, 'delete-campaign', id);
  res.json({ ok: true });
}));

marketingRouter.get('/admin/mail/queue', requireAdmin, ah(async (req, res) => {
  const f = req.query.status ? { status: String(req.query.status) } : {};
  const rows = await col('mail_queue').find(f, { projection: { vars: 0, inline: 0 } }).sort({ sendAt: -1 }).limit(Math.min(500, +req.query.limit || 200)).toArray();
  res.json({ ok: true, mail: mailStatus(), rows: rows.map(({ _id, ...r }) => ({ id: _id, ...r })) });
}));
marketingRouter.post('/admin/mail/queue/retry', requireAdmin, ah(async (req, res) => {
  const r = await col('mail_queue').updateMany({ status: 'failed' }, { $set: { status: 'queued', tries: 0, sendAt: new Date() } });
  res.json({ ok: true, n: r.modifiedCount });
}));
// GitHub #11: stop queued emails, and send any email by hand
marketingRouter.post('/admin/mail/queue/cancel', requireAdmin, ah(async (req, res) => {
  const r = await col('mail_queue').updateMany({ status: 'queued' }, { $set: { status: 'cancelled', cancelled: new Date() } });
  await audit(req, 'cancel-mail', 'all queued', { n: r.modifiedCount });
  res.json({ ok: true, n: r.modifiedCount });
}));
marketingRouter.post('/admin/mail/queue/:id/cancel', requireAdmin, ah(async (req, res) => {
  const id = String(req.params.id);
  const r = await col('mail_queue').updateOne({ _id: id, status: 'queued' }, { $set: { status: 'cancelled', cancelled: new Date() } });
  if (!r.modifiedCount) return res.status(409).json({ ok: false, error: 'This email is not waiting in the queue any more.' });
  await audit(req, 'cancel-mail', id);
  res.json({ ok: true });
}));
marketingRouter.post('/admin/mail/queue/:id/send', requireAdmin, rateLimit('msend', 120, 3600e3), ah(async (req, res) => {
  const id = String(req.params.id);
  if (!mailReady()) return res.status(503).json({ ok: false, error: 'Email sending is not set up yet (Settings › Connections).' });
  // claim the email so the background worker does not send it at the same time
  const q = await col('mail_queue').findOneAndUpdate({ _id: id, status: { $in: ['queued', 'cancelled', 'failed'] } }, { $set: { status: 'sending', tries: 0 } }, { returnDocument: 'after' });
  if (!q) return res.status(409).json({ ok: false, error: 'This email was already sent or is being sent.' });
  const status = await sendOne(q, await getTemplates(), (await getContent('mail-settings')) || {});
  await audit(req, 'send-mail', id, { status });
  res.json({ ok: status === 'sent', status, error: status === 'sent' ? undefined : 'Not sent; see the note in the email log.' });
}));
