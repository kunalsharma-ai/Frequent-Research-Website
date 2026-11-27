// Page views for the admin dashboard (no cookies). Visitors are counted by a salted hash of the IP; the IP address itself
// (sealed when DATA_KEY is set) and the country are kept for the admin Visits table only (GitHub #15).
//   POST /api/v1/track   { path, ref }   sent by the website with navigator.sendBeacon on every page change
//   GET  /api/v1/admin/visits?days=7&path=   recent page views (admin)
import { Router } from 'express';
import { col } from '../db.js';
import { ah, clean, hashIp, page, rateLimit, requireAdmin } from '../lib/util.js';
import { ipFields, ipOpen } from '../lib/geo.js';

const BOT = /bot|crawl|spider|slurp|preview|headless|lighthouse|pingdom|uptime/i;

export const trackRouter = Router();

trackRouter.post('/track', rateLimit('tr', 600, 3600e3), ah(async (req, res) => {
  let b = req.body;
  if (typeof b === 'string') { try { b = JSON.parse(b); } catch { b = {}; } }
  const ua = String(req.headers['user-agent'] || '');
  const path = clean(b && b.path, 300);
  if (!path.startsWith('/') || path.startsWith('/admin') || BOT.test(ua)) return res.status(204).end();
  let ref = clean(b.ref, 300);
  try { ref = ref ? new URL(ref).hostname : ''; } catch { ref = ''; }
  if (ref && ref === String(req.headers.host || '').split(':')[0]) ref = '';
  const at = new Date();
  await col('visits').insertOne({ at, day: at.toISOString().slice(0, 10), path: path.split('?')[0].split('#')[0], ref, ip: hashIp(req.ip), ...ipFields(req), mobile: /Mobi|Android|iPhone/i.test(ua), lang: clean(b.lang, 12) });
  res.status(204).end();
}));

trackRouter.get('/admin/visits', requireAdmin, ah(async (req, res) => {
  const days = Math.min(400, Math.max(1, +req.query.days || 7));
  const f = { at: { $gte: new Date(Date.now() - days * 86400e3) } };
  if (req.query.path) f.path = String(req.query.path);
  const { limit, skip } = page(req, 1000);
  const [rows, total] = await Promise.all([col('visits').find(f, { projection: { _id: 0 } }).sort({ at: -1 }).skip(skip).limit(limit).toArray(), col('visits').countDocuments(f)]);
  res.json({ ok: true, total, visits: rows.map(({ ipAddr, ...v }) => ({ ...v, ipAddress: ipOpen(ipAddr) })) });
}));
