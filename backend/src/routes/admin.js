// Activity log and the dashboard numbers (sign-in and accounts: routes/users.js, build 78.3).
//   GET  /api/v1/admin/audit          every admin change and sign-in, newest first (?limit=&skip=&q=&actor=&action=)
//   GET  /api/v1/admin/stats?days=30  visits, leads, downloads, reviews and chats for the dashboard
//   GET  /api/v1/admin/overview       admins, content waiting for approval, new enquiries and applications, recent activity
import { readFileSync } from 'node:fs';
import { Router } from 'express';
import { col } from '../db.js';
import { ah, page, requireAdmin, clean } from '../lib/util.js';
import { can } from '../lib/auth.js';

export const adminRouter = Router();

// build 78.5: the API page in the admin: is everything up, which version, how big is the data
//   GET  /api/v1/admin/system   version, uptime, Node, memory, database answer time, documents per collection
const VERSION = JSON.parse(readFileSync(new URL('../../package.json', import.meta.url), 'utf8')).version;
const STARTED = Date.now();
adminRouter.get('/admin/system', requireAdmin, ah(async (req, res) => {
  const t0 = performance.now();
  let db = false;
  try { await col('content').estimatedDocumentCount(); db = true; } catch { /* reported below */ }
  const ms = Math.round(performance.now() - t0);
  const names = ['leads', 'contacts', 'reviews', 'chats', 'visits', 'content', 'content_drafts', 'audit', 'admin_users', 'mail_queue', 'campaigns', 'social_posts', 'files.files', 'settings_keys'];
  const counts = db ? Object.fromEntries(await Promise.all(names.map(async (n) => [n, await col(n).estimatedDocumentCount().catch(() => null)]))) : {};
  const m = process.memoryUsage();
  res.json({ ok: true, version: VERSION, node: process.version, uptime: Math.round((Date.now() - STARTED) / 1000), db, dbMs: ms, memoryMb: Math.round(m.rss / 1048576), counts, at: new Date() });
}));

adminRouter.get('/admin/audit', requireAdmin, ah(async (req, res) => {
  const { limit, skip } = page(req, 1000);
  const q = clean(req.query.q, 80);
  const f = q ? { $or: [{ action: { $regex: escapeRe(q), $options: 'i' } }, { target: { $regex: escapeRe(q), $options: 'i' } }, { 'actor.email': { $regex: escapeRe(q), $options: 'i' } }] } : {};
  if (req.query.actor) { const a = clean(req.query.actor, 160); f[a.includes('@') ? 'actor.email' : 'actor.id'] = a.toLowerCase().includes('@') ? a.toLowerCase() : a; }
  if (req.query.action) f.action = { $regex: '^' + escapeRe(clean(req.query.action, 40)) };
  const [rows, total] = await Promise.all([col('audit').find(f).sort({ at: -1 }).skip(skip).limit(limit).toArray(), col('audit').countDocuments(f)]);
  res.json({ ok: true, total, rows: rows.map(({ _id, ...r }) => ({ id: String(_id), ...r })) });
}));

export const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const dayKey = (d) => d.toISOString().slice(0, 10);

adminRouter.get('/admin/stats', requireAdmin, ah(async (req, res) => {
  const days = Math.min(400, Math.max(1, +req.query.days || 30));
  const since = new Date(Date.now() - days * 86400e3);
  const today = new Date(); today.setUTCHours(0, 0, 0, 0);
  const [visitsByDay, topPages, topRefs, visitTotal, visitToday, leadsByKind, leadsByDay, leadTotal, leadNew, topResources, reviewCounts, chatOpen, chatTotal] = await Promise.all([
    col('visits').aggregate([{ $match: { at: { $gte: since } } }, { $group: { _id: '$day', n: { $sum: 1 }, people: { $addToSet: '$ip' } } }, { $project: { n: 1, people: { $size: '$people' } } }, { $sort: { _id: 1 } }]).toArray(),
    col('visits').aggregate([{ $match: { at: { $gte: since } } }, { $group: { _id: '$path', n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 50 }]).toArray(),
    col('visits').aggregate([{ $match: { at: { $gte: since }, ref: { $nin: ['', null] } } }, { $group: { _id: '$ref', n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 20 }]).toArray(),
    col('visits').countDocuments({ at: { $gte: since } }),
    col('visits').countDocuments({ at: { $gte: today } }),
    col('leads').aggregate([{ $match: { at: { $gte: since } } }, { $group: { _id: '$kind', n: { $sum: 1 } } }, { $sort: { n: -1 } }]).toArray(),
    col('leads').aggregate([{ $match: { at: { $gte: since } } }, { $group: { _id: { $dateToString: { date: '$at', format: '%Y-%m-%d' } }, n: { $sum: 1 } } }, { $sort: { _id: 1 } }]).toArray(),
    col('leads').countDocuments({}),
    col('leads').countDocuments({ status: { $in: [null, 'new'] } }),
    col('leads').aggregate([{ $match: { at: { $gte: since }, kind: { $ne: 'enquiry' } } }, { $group: { _id: { $ifNull: ['$resource', { $ifNull: ['$title', '$kind'] }] }, n: { $sum: 1 } } }, { $sort: { n: -1 } }, { $limit: 20 }]).toArray(),
    col('reviews').aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray(),
    col('chats').countDocuments({ status: 'open' }),
    col('chats').countDocuments({}),
  ]);
  // every day in the range, also the days with nothing, so the dashboard chart has no gaps
  const series = [];
  const vmap = new Map(visitsByDay.map((d) => [d._id, d])), lmap = new Map(leadsByDay.map((d) => [d._id, d.n]));
  for (let t = Date.now() - (days - 1) * 86400e3; t <= Date.now(); t += 86400e3) {
    const k = dayKey(new Date(t)); const v = vmap.get(k);
    series.push({ day: k, visits: v ? v.n : 0, visitors: v ? v.people : 0, leads: lmap.get(k) || 0 });
  }
  res.json({
    ok: true, days, series,
    visits: { total: visitTotal, today: visitToday, pages: topPages.map((p) => ({ path: p._id, n: p.n })), referrers: topRefs.map((p) => ({ ref: p._id, n: p.n })) },
    leads: { total: leadTotal, unread: leadNew, byKind: leadsByKind.map((k) => ({ kind: k._id, n: k.n })), resources: topResources.map((k) => ({ name: k._id, n: k.n })) },
    reviews: Object.fromEntries(reviewCounts.map((r) => [r._id, r.n])),
    chats: { open: chatOpen, total: chatTotal },
  });
}));

// build 78.3: the central dashboard (what each number shows depends on what the admin may see)
adminRouter.get('/admin/overview', requireAdmin, ah(async (req, res) => {
  const u = req.admin.user;
  const week = new Date(Date.now() - 7 * 86400e3);
  const [seeUsers, seeEnq, seeCareers, seeActivity] = await Promise.all([can(u, 'users', 'view'), can(u, 'enquiries', 'view'), can(u, 'careers', 'view'), can(u, 'activity', 'view')]);
  const out = { ok: true };
  if (seeUsers) {
    const rows = await col('admin_users').aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray();
    const by = Object.fromEntries(rows.map((r) => [r._id, r.n]));
    out.admins = { total: rows.reduce((a, r) => a + r.n, 0), active: by.active || 0, invited: by.invited || 0, suspended: by.suspended || 0, deactivated: by.deactivated || 0 };
  }
  const drafts = await col('content_drafts').aggregate([{ $group: { _id: '$status', n: { $sum: 1 } } }]).toArray();
  out.content = Object.fromEntries(drafts.map((r) => [r._id, r.n]));
  out.content.published = await col('content').countDocuments({});
  out.pages = { custom: ((await col('content').findOne({ _id: 'custom-pages' }))?.data || []).length || 0 };
  if (seeEnq) out.enquiries = { week: await col('leads').countDocuments({ at: { $gte: week }, kind: { $ne: 'careers' } }), open: await col('leads').countDocuments({ kind: { $ne: 'careers' }, status: { $in: [null, 'new'] } }), mine: await col('leads').countDocuments({ assignee: u._id, status: { $nin: ['won', 'lost', 'spam'] } }) };
  if (seeCareers) out.careers = { week: await col('leads').countDocuments({ at: { $gte: week }, kind: 'careers' }), open: await col('leads').countDocuments({ kind: 'careers', status: { $in: [null, 'new'] } }) };
  if (seeActivity) out.recent = (await col('audit').find({}).sort({ at: -1 }).limit(12).toArray()).map(({ _id, ip, ua, ...r }) => r);
  res.json(out);
}));
