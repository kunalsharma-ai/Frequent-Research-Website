// Build 82.1: encryption at rest for the most sensitive onboarding data.
//
// - Tax and bank numbers (GSTIN, PAN, TAN, Udyam, tax ID, account numbers, IFSC, SWIFT, IBAN, routing, sort code,
//   account holder, bank and branch) are stored in MongoDB as "enc:v1:<iv.tag.ciphertext>" (AES-256-GCM), so a copy of
//   the database alone does not show them. The admin sees them as normal text.
// - Every onboarding document (signed agreements, KYC files, logos) is stored encrypted in GridFS the same way.
// - Search by GSTIN / PAN / tax ID / account number / IBAN still works (exact match) through a keyed hash ("blind
//   index") kept in sum.ids, never the number itself.
//
// The key: DATA_KEY in .env (a long random string, e.g. `openssl rand -hex 32`). When DATA_KEY is not set the key comes
// from KEYS_SECRET, else REVIEW_SECRET. KEEP THE VALUE SAFE AND BACKED UP: without it this data cannot be read.
// Changing the key: put the old value in DATA_KEY_OLD and the new one in DATA_KEY, then run
// `npm run admin -- reseal-onboarding` once; afterwards DATA_KEY_OLD can be removed.
import crypto from 'node:crypto';

const derive = (base, label) => crypto.createHash('sha256').update(label + '|' + base).digest();
const baseSecret = () => process.env.DATA_KEY || process.env.KEYS_SECRET || process.env.REVIEW_SECRET || '';
export const vaultOn = () => !!baseSecret();
export const vaultSource = () => (process.env.DATA_KEY ? 'DATA_KEY' : process.env.KEYS_SECRET ? 'KEYS_SECRET' : process.env.REVIEW_SECRET ? 'REVIEW_SECRET' : '');
const keys = () => {
  const out = [];
  if (baseSecret()) out.push(derive(baseSecret(), 'fr-data'));
  if (process.env.DATA_KEY_OLD) out.push(derive(process.env.DATA_KEY_OLD, 'fr-data'));
  return out;
};

const PREFIX = 'enc:v1:';
export const isSealed = (v) => typeof v === 'string' && v.startsWith(PREFIX);

export function sealText(v) {
  if (typeof v !== 'string' || !v || isSealed(v) || !vaultOn()) return v;
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', keys()[0], iv);
  const ct = Buffer.concat([c.update(v, 'utf8'), c.final()]);
  return PREFIX + [iv, c.getAuthTag(), ct].map((b) => b.toString('base64url')).join('.');
}
export function openText(v) {
  if (!isSealed(v)) return v;
  const [iv, tag, ct] = v.slice(PREFIX.length).split('.').map((s) => Buffer.from(s, 'base64url'));
  for (const k of keys()) {
    try { const d = crypto.createDecipheriv('aes-256-gcm', k, iv); d.setAuthTag(tag); return Buffer.concat([d.update(ct), d.final()]).toString('utf8'); } catch { /* next key */ }
  }
  return '[cannot be read: the encryption key changed]';
}

// files: [12-byte iv][16-byte tag][ciphertext]
export function sealBytes(buf) {
  if (!vaultOn()) return { data: buf, enc: '' };
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', keys()[0], iv);
  const ct = Buffer.concat([c.update(buf), c.final()]);
  return { data: Buffer.concat([iv, c.getAuthTag(), ct]), enc: 'v1' };
}
export function openBytes(buf) {
  const iv = buf.subarray(0, 12), tag = buf.subarray(12, 28), ct = buf.subarray(28);
  for (const k of keys()) {
    try { const d = crypto.createDecipheriv('aes-256-gcm', k, iv); d.setAuthTag(tag); return Buffer.concat([d.update(ct), d.final()]); } catch { /* next key */ }
  }
  throw Object.assign(new Error('This file cannot be read: the encryption key changed.'), { status: 409 });
}

// keyed hash for exact-match search, so the numbers themselves never sit in an index
export const norm = (v) => String(v || '').toUpperCase().replace(/[\s\-./]/g, '');
export function blind(v) {
  const n = norm(v);
  if (n.length < 4 || !vaultOn()) return '';
  return crypto.createHmac('sha256', derive(baseSecret(), 'fr-index')).update(n).digest('base64url').slice(0, 32);
}

// which onboarding paths are sealed, and which of them can be searched
export const SENSITIVE = ['tax.gstin', 'tax.pan', 'tax.tan', 'tax.udyam', 'tax.taxId',
  'commercial.bank.holder', 'commercial.bank.bankName', 'commercial.bank.branch', 'commercial.bank.accountNo', 'commercial.bank.accountNo2',
  'commercial.bank.ifsc', 'commercial.bank.swift', 'commercial.bank.iban', 'commercial.bank.routing', 'commercial.bank.sortCode'];
export const SEARCHABLE = ['tax.gstin', 'tax.pan', 'tax.tan', 'tax.taxId', 'tax.udyam', 'commercial.bank.accountNo', 'commercial.bank.iban'];

const get = (o, p) => p.split('.').reduce((x, k) => (x && typeof x === 'object' ? x[k] : undefined), o);
const set = (o, p, v) => { const ks = p.split('.'), last = ks.pop(); const t = ks.reduce((x, k) => (x && typeof x === 'object' ? x[k] : undefined), o); if (t && typeof t === 'object' && last in t) t[last] = v; };

// a copy of the details with the sensitive values sealed, and the search hashes
export function sealData(data) {
  if (!data || typeof data !== 'object') return { data, ids: [] };
  const d = structuredClone(data), ids = [];
  for (const p of SEARCHABLE) { const v = openText(get(d, p)); const h = typeof v === 'string' ? blind(v) : ''; if (h) ids.push(h); }
  for (const p of SENSITIVE) { const v = get(d, p); if (typeof v === 'string' && v) set(d, p, sealText(v)); }
  return { data: d, ids: [...new Set(ids)] };
}
// the details as the admin sees them
export function openData(data) {
  if (!data || typeof data !== 'object') return data;
  const d = structuredClone(data);
  for (const p of SENSITIVE) { const v = get(d, p); if (isSealed(v)) set(d, p, openText(v)); }
  return d;
}
