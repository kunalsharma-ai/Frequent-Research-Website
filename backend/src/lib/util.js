import crypto from 'node:crypto';
import { config } from '../config.js';
import { col, dbReady } from '../db.js';
import { ipFields } from './geo.js';

// plain text: no control characters, no tags, single spaces, at most `max` characters
export const clean = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u001F\u007F-\u009F]/g, ' ').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim().slice(0, max) : '');
export const NAME = /^[\p{L}][\p{L} .'’-]*$/u;
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const hashIp = (ip) => crypto.createHash('sha256').update(String(ip) + config.secret).digest('hex').slice(0, 16);
export const newId = (prefix) => prefix + crypto.randomBytes(6).toString('hex');

// in-memory rate limit: `max` requests per `ms` for each key (route + client IP)
const hits = new Map();
export function rateLimit(name, max, ms, message = 'Too many requests. Please try again later.') {
  return (req, res, next) => {
    const key = name + ':' + req.ip, now = Date.now();
    const a = (hits.get(key) || []).filter((t) => now - t < ms);
    a.push(now); hits.set(key, a);
    if (a.length > max) return res.status(429).json({ ok: false, error: message });
    next();
  };
}
setInterval(() => { const now = Date.now(); for (const [k, a] of hits) if (!a.some((t) => now - t < 3600e3)) hits.delete(k); }, 600e3).unref();

// ---- admin sign-in (build 78.3: personal accounts, see lib/auth.js and routes/users.js) ----------------------------
// Every /admin request carries "Authorization: Bearer <session token>". The session must be live (12 hours at most,
// 2 hours without use), its admin active. req.admin = { user, session }. Permissions are checked by lib/access.js.
const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');
const SESSION_IDLE = 2 * 3600e3;
export async function sessionUser(req) {
  if (req.admin !== undefined) return req.admin;
  req.admin = null;
  const h = String(req.headers.authorization || '');
  const t = h.startsWith('Bearer ') ? h.slice(7).trim() : '';
  if (!t || t.length > 200 || !dbReady()) return null;
  const s = await col('admin_sessions').findOne({ _id: sha(t) });
  const now = Date.now();
  if (!s || s.revoked || +s.exp < now || now - +s.last > SESSION_IDLE) return null;
  const u = await col('admin_users').findOne({ _id: s.user });
  if (!u || u.status !== 'active') return null;
  if (now - +s.last > 60e3) col('admin_sessions').updateOne({ _id: s._id }, { $set: { last: new Date() } }).catch(() => {});
  req.admin = { user: u, session: s };
  return req.admin;
}
export async function requireAdmin(req, res, next) {
  try {
    if (await sessionUser(req)) return next();
    res.status(401).json({ ok: false, error: 'Please sign in again.' });
  } catch (e) { next(e); }
}

// every super admin change is written to the audit collection (shown under "Activity" in the admin panel)
export async function audit(req, action, target, detail = {}) {
  if (!dbReady()) return;
  try {
    const u = req.admin && req.admin.user;
    const actor = u ? { id: u._id, email: u.email, name: u.name, role: u.role } : req.actor || null;
    await col('audit').insertOne({ at: new Date(), action, target: String(target || '').slice(0, 200), detail, actor, ip: hashIp(req.ip), ...ipFields(req), ua: clean(req.headers['user-agent'], 200) });
  } catch (e) { console.error('[audit]', e.message); }
}

// async route wrapper: a rejected promise goes to the error handler instead of crashing the process
export const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// keep what a form sent, as plain values, without secrets (captcha, password, token fields are dropped)
export const plain = (v, d = 0) => {
  if (d > 4) return '';
  if (typeof v === 'string') return v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').slice(0, 4000);
  if (typeof v === 'number' || typeof v === 'boolean') return v;
  if (Array.isArray(v)) return v.slice(0, 40).map((x) => plain(x, d + 1));
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v).slice(0, 60)) if (!/captcha|password|token|^\$|\./i.test(k)) o[k.slice(0, 60)] = plain(v[k], d + 1); return o; }
  return '';
};

// CSV cell; a leading = + - @ is prefixed with ' so spreadsheet apps never run it as a formula
export const csvCell = (v) => { let t = v == null ? '' : v instanceof Date ? v.toISOString() : typeof v === 'object' ? JSON.stringify(v) : String(v); if (/^[=+\-@]/.test(t)) t = "'" + t; return '"' + t.replace(/"/g, '""') + '"'; };
export const toCsv = (cols, rows) => '﻿' + cols.join(',') + '\n' + rows.map((r) => cols.map((c) => csvCell(r[c])).join(',')).join('\n');

// paging for admin lists: ?limit=&skip=
export const page = (req, max = 500) => ({ limit: Math.min(max, Math.max(1, +req.query.limit || 100)), skip: Math.max(0, +req.query.skip || 0) });
