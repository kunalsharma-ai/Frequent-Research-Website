// Build 78.3: admin accounts, passwords, MFA (TOTP), sessions, roles and permissions.
//
// Accounts   admin_users     { _id "u_…", email, name, mobile, department, designation, role, grants, status,
//                              pw (scrypt), mfa { secret, on, last }, recovery [sha256], invite { hash, exp, kind },
//                              failed, lockUntil, created, by, lastLogin }
//            status: invited → active; suspended (can be reactivated) ; deactivated (kept for the record)
// Sessions   admin_sessions  { _id sha256(token), user, created, exp, last, ip, ua, revoked, stepUp }
// Roles      admin_roles     { _id, name, perms { module: [actions] }, builtIn, note }
// There are no default credentials: the first Super Admin is made with `npm run admin -- create-super-admin`
// (tools/admin.js) on the server, and every later admin joins by invitation.
import crypto from 'node:crypto';
import { config } from '../config.js';
import { col } from '../db.js';

/* ---- modules and actions ----------------------------------------------------------------------------------------- */
export const ACTIONS = ['view', 'create', 'edit', 'delete', 'publish', 'approve', 'export', 'manage', 'configure'];
// each module = one area of the website or the panel, with the content keys it owns (see keyModule)
export const MODULES = {
  dashboard: { label: 'Dashboard', actions: ['view'] },
  pages: { label: 'Pages, sections & page texts', actions: ['view', 'create', 'edit', 'delete', 'publish', 'approve'], paths: true },
  menus: { label: 'Header, footer menus & logos', actions: ['view', 'edit', 'publish', 'approve'] },
  seo: { label: 'SEO: titles, descriptions, redirects', actions: ['view', 'edit', 'publish', 'approve'], paths: true },
  legal: { label: 'Legal & policies', actions: ['view', 'edit', 'publish', 'approve'] },
  blog: { label: 'Blogs, case studies & card designs', actions: ['view', 'create', 'edit', 'delete', 'publish', 'approve'] },
  company: { label: 'Company: team, testimonials, certifications, associations, careers page, gallery, contact', actions: ['view', 'create', 'edit', 'delete', 'publish', 'approve'] },
  products: { label: 'Products, portals, downloads, PDFs, Accounts & Finance prices', actions: ['view', 'create', 'edit', 'delete', 'publish', 'approve'] },
  panels: { label: 'Panel books & panel numbers (all countries)', actions: ['view', 'create', 'edit', 'delete', 'publish', 'approve'] },
  forms: { label: 'Forms & their fields', actions: ['view', 'edit', 'publish', 'approve'] },
  enquiries: { label: 'Enquiries, RFQs, downloads, live chat, reviews', actions: ['view', 'edit', 'delete', 'export', 'manage'] },
  careers: { label: 'Careers applications, CVs & SampCrew', actions: ['view', 'edit', 'delete', 'export'] },
  marketing: { label: 'Contacts, emails, newsletters, social media, AI', actions: ['view', 'create', 'edit', 'delete', 'publish', 'export'] },
  media: { label: 'Media library: pictures, logos, videos, documents', actions: ['view', 'create', 'edit', 'delete'] },
  settings: { label: 'Site settings, banners, celebrations, WhatsApp & chat', actions: ['view', 'edit', 'publish', 'approve'] },
  integrations: { label: 'Connections & API keys (saved encrypted in the database)', actions: ['view', 'configure'] },
  activity: { label: 'Activity log & visits', actions: ['view', 'export'] },
  onboarding: { label: 'Client & vendor onboarding: every submission, MSAs / agreements, documents, bank details, renewals and the form fields', actions: ['view', 'create', 'edit', 'delete', 'export', 'configure'] },
  users: { label: 'Admins, roles & permissions', actions: ['view', 'create', 'edit', 'delete', 'manage'] },
};
const ALL = Object.fromEntries(Object.entries(MODULES).map(([m, d]) => [m, d.actions]));
const pick = (o) => Object.fromEntries(Object.entries(o).map(([m, a]) => [m, a === '*' ? MODULES[m].actions : a]));
// the eight starting roles; the Super Admin can change every role but Super Admin, and add new ones
export const BUILTIN_ROLES = [
  { _id: 'super', name: 'Super Admin', note: 'Everything, including admins, roles and approvals.', perms: ALL },
  { _id: 'website', name: 'Website Admin', note: 'Pages, menus, SEO, legal pages and forms. Publishes website changes.', perms: pick({ dashboard: '*', pages: '*', menus: '*', seo: '*', legal: '*', forms: '*', media: ['view', 'create', 'edit'], settings: ['view'], activity: ['view'] }) },
  { _id: 'content', name: 'Content Admin', note: 'Writes blogs, case studies, team, testimonials, products and page texts. Changes go to approval.', perms: pick({ dashboard: '*', blog: ['view', 'create', 'edit'], company: ['view', 'create', 'edit'], products: ['view', 'create', 'edit'], pages: ['view', 'edit'], media: ['view', 'create', 'edit'] }) },
  { _id: 'marketing', name: 'Marketing Admin', note: 'Contacts, email templates, automations, newsletters, social media and the AI writer. Suggests blog posts.', perms: pick({ dashboard: '*', marketing: '*', blog: ['view', 'create', 'edit'], seo: ['view'], enquiries: ['view'], media: ['view', 'create'] }) },
  { _id: 'hr', name: 'HR Admin', note: 'Careers applications and CVs, SampCrew, the careers page and team members (team changes go to approval).', perms: pick({ dashboard: '*', careers: '*', company: ['view', 'edit'], media: ['view', 'create'] }) },
  { _id: 'business', name: 'Business Admin', note: 'Enquiries and RFQs (assign, follow up, export), live chat, reviews, client & vendor onboarding, panel books, products and prices.', perms: pick({ dashboard: '*', enquiries: '*', panels: '*', products: '*', onboarding: ['view', 'create', 'edit', 'export'], forms: ['view'], marketing: ['view'], media: ['view', 'create'] }) },
  { _id: 'it', name: 'IT Admin', note: 'Connections and keys, media library, site settings, activity log. Sees admins; cannot publish content.', perms: pick({ dashboard: '*', integrations: '*', media: '*', settings: ['view', 'edit'], activity: '*', users: ['view'] }) },
  { _id: 'viewer', name: 'Viewer', note: 'Looks only. No personal data (enquiries, CVs, contacts).', perms: pick({ dashboard: '*', pages: ['view'], menus: ['view'], seo: ['view'], legal: ['view'], blog: ['view'], company: ['view'], products: ['view'], panels: ['view'], forms: ['view'] }) },
];

// which module owns a content key
const KEY_MODULE = {
  'page-blocks': 'pages', 'page-sections': 'pages', 'custom-pages': 'pages', texts: 'pages', images: 'pages', links: 'pages', 'image-alts': 'pages', 'page-videos': 'pages',
  'menu-main': 'menus', 'menu-about': 'menus', 'menu-downloads': 'menus', 'footer-company': 'menus', 'footer-start': 'menus', 'footer-legal': 'menus', logos: 'menus',
  seo: 'seo',
  legal: 'legal', 'legal-company': 'legal',
  blogs: 'blog', cases: 'blog', 'card-templates': 'blog',
  team: 'company', 'team-photos': 'company', testimonials: 'company', certifications: 'company', associations: 'company', 'onboarding-links': 'company', leadership: 'company', 'home-stats': 'pages', design79: 'pages', careers: 'company', gallery: 'company', contact: 'company',
  products: 'products', portals: 'products', 'af-services': 'products', downloads: 'products', pdfs: 'products',
  panels: 'panels',
  forms: 'forms', 'forms-mail': 'forms',
  'mail-templates': 'marketing', 'mail-automations': 'marketing', 'mail-settings': 'marketing', 'mail-schedule-state': 'marketing', 'social-autopilot': 'marketing',
  settings: 'settings', banners: 'settings', celebrations: 'settings', notes: 'settings', chat: 'settings',
};
export function keyModule(k) {
  k = String(k || '');
  if (KEY_MODULE[k]) return KEY_MODULE[k];
  if (k.startsWith('data:panel-books/')) return 'panels';
  if (k.startsWith('data:celebrations') || k.startsWith('celebrations:')) return 'settings';
  if (k.startsWith('data:')) return 'products';
  return 'settings';
}
// keys whose top-level entries are page addresses ("/about-us"), so access can be given page by page
export const PATH_KEYS = new Set(['texts', 'page-blocks', 'page-sections', 'seo', 'custom-pages']);

/* ---- permission checks ------------------------------------------------------------------------------------------- */
const roleCache = { at: 0, map: null };
export async function roles() {
  if (roleCache.map && Date.now() - roleCache.at < 5000) return roleCache.map;
  const saved = await col('admin_roles').find({}).toArray();
  const map = new Map(BUILTIN_ROLES.map((r) => [r._id, { ...r, builtIn: true }]));
  for (const r of saved) if (r._id !== 'super') map.set(r._id, { ...(map.get(r._id) || {}), ...r, builtIn: map.has(r._id) });
  roleCache.map = map; roleCache.at = Date.now();
  return map;
}
export const rolesChanged = () => { roleCache.map = null; };

// a page address pattern: "/blog/*" covers every blog post, "*" every page
export const pathMatch = (pat, p) => pat === '*' || pat === p || (pat.endsWith('/*') && (p === pat.slice(0, -2) || p.startsWith(pat.slice(0, -1))));

// can this admin do `action` in `module` (optionally on one content key or one page)?
// Without `whole`, a grant limited to some keys or pages still counts for opening that area (menus, the route guard).
// With `whole: true` (every save, publish and approval), a limited grant counts only for the keys and pages it names.
export function canSync(u, R, module, action, { key, path, whole = false } = {}) {
  if (!u || u.status !== 'active') return false;
  if (u.role === 'super') return true;
  const role = R.get(u.role);
  if (role && (role.perms[module] || []).includes(action)) return true;
  for (const g of u.grants || []) {
    if (g.module !== module || !(g.actions || []).includes(action)) continue;
    const keys = g.keys || [], paths = g.paths || [];
    if (!keys.length && !paths.length) return true;
    if (key === undefined && path === undefined) { if (whole) continue; return true; } // scoped grant: opening the section only
    if (key !== undefined && keys.includes(key) && (path === undefined ? !whole || !paths.length : !paths.length || paths.some((p) => pathMatch(p, path)))) return true;
    if (path !== undefined && paths.some((p) => pathMatch(p, path)) && (!keys.length || key === undefined || keys.includes(key))) return true;
  }
  return false;
}
export async function can(u, module, action, scope) { return canSync(u, await roles(), module, action, scope); }
// every module × action this admin has (whole modules); scoped grants listed separately
export async function effective(u) {
  const R = await roles();
  const out = {};
  for (const [m, d] of Object.entries(MODULES)) { const a = d.actions.filter((x) => canSync(u, R, m, x)); if (a.length) out[m] = a; }
  return out;
}

/* ---- passwords ---------------------------------------------------------------------------------------------------- */
const SCRYPT = { N: 32768, r: 8, p: 1, maxmem: 96 * 1024 * 1024 };
export function hashPassword(pw) {
  const salt = crypto.randomBytes(16);
  const h = crypto.scryptSync(String(pw).normalize('NFKC'), salt, 64, SCRYPT);
  return `scrypt$${SCRYPT.N}$${SCRYPT.r}$${SCRYPT.p}$${salt.toString('base64url')}$${h.toString('base64url')}`;
}
export function checkPassword(pw, stored) {
  const [alg, N, r, p, salt, h] = String(stored || '').split('$');
  if (alg !== 'scrypt' || !salt || !h) { crypto.scryptSync('x', 'decoy-salt', 64, SCRYPT); return false; } // same time either way
  const want = Buffer.from(h, 'base64url');
  const got = crypto.scryptSync(String(pw).normalize('NFKC'), Buffer.from(salt, 'base64url'), want.length, { N: +N, r: +r, p: +p, maxmem: SCRYPT.maxmem });
  return crypto.timingSafeEqual(want, got);
}
const COMMON = ['password', 'qwerty', '123456', 'letmein', 'welcome', 'admin', 'frequent', 'research', 'iloveyou', 'monkey', 'dragon', 'abc123'];
// 12+ characters, three of: lower, upper, digit, symbol; not built from the email or a common word
export function passwordProblem(pw, email = '') {
  pw = String(pw || '');
  if (pw.length < 12) return 'Use at least 12 characters.';
  if (pw.length > 200) return 'Use at most 200 characters.';
  const kinds = [/[a-z]/, /[A-Z]/, /\d/, /[^A-Za-z0-9]/].filter((re) => re.test(pw)).length;
  if (kinds < 3) return 'Mix at least three of: small letters, capitals, numbers, symbols.';
  const low = pw.toLowerCase(), local = String(email).split('@')[0].toLowerCase();
  if (local.length >= 3 && low.includes(local)) return 'Do not use your email name in the password.';
  if (COMMON.some((w) => low.replace(/[^a-z]/g, '') === w || low.startsWith(w + '1') || low === w + '!')) return 'This password is too common.';
  if (/(.)\1{3,}/.test(pw)) return 'Avoid repeating the same character.';
  return '';
}

/* ---- TOTP (authenticator apps, RFC 6238: 6 digits, 30 seconds) --------------------------------------------------- */
const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
export const newTotpSecret = () => { const b = crypto.randomBytes(20); let bits = '', out = ''; for (const x of b) bits += x.toString(2).padStart(8, '0'); for (let i = 0; i + 5 <= bits.length; i += 5) out += B32[parseInt(bits.slice(i, i + 5), 2)]; return out; };
function b32bytes(s) { let bits = ''; for (const c of String(s).replace(/=+$/, '').toUpperCase()) { const v = B32.indexOf(c); if (v < 0) continue; bits += v.toString(2).padStart(5, '0'); } const out = []; for (let i = 0; i + 8 <= bits.length; i += 8) out.push(parseInt(bits.slice(i, i + 8), 2)); return Buffer.from(out); }
export function totp(secret, step = Math.floor(Date.now() / 30000)) {
  const msg = Buffer.alloc(8); msg.writeBigUInt64BE(BigInt(step));
  const h = crypto.createHmac('sha1', b32bytes(secret)).update(msg).digest();
  const o = h[h.length - 1] & 15;
  return String(((h.readUInt32BE(o) & 0x7fffffff) % 1e6)).padStart(6, '0');
}
// the step that matched (now ± 30 s), or -1; `last` stops a code being used twice
export function totpCheck(secret, code, last = -1) {
  const c = String(code || '').replace(/\s/g, '');
  if (!/^\d{6}$/.test(c) || !secret) return -1;
  const now = Math.floor(Date.now() / 30000);
  for (const s of [now, now - 1, now + 1]) if (s > last && crypto.timingSafeEqual(Buffer.from(totp(secret, s)), Buffer.from(c))) return s;
  return -1;
}
export const otpauthUrl = (secret, email) => `otpauth://totp/${encodeURIComponent('Frequent Research Admin:' + email)}?secret=${secret}&issuer=${encodeURIComponent('Frequent Research Admin')}&algorithm=SHA1&digits=6&period=30`;
export const newRecoveryCodes = () => Array.from({ length: 10 }, () => crypto.randomBytes(5).toString('hex').replace(/(.{5})/, '$1-'));
export const sha = (s) => crypto.createHash('sha256').update(String(s)).digest('hex');

/* ---- invitations and setup links ---------------------------------------------------------------------------------- */
export const INVITE_MS = 72 * 3600e3;
export function newInvite(kind = 'invite') {
  const token = crypto.randomBytes(32).toString('base64url');
  return { token, invite: { hash: sha(token), exp: new Date(Date.now() + (kind === 'setup' ? 24 * 3600e3 : INVITE_MS)), kind } };
}
export const setupLink = (token) => `${config.publicUrl}/admin/setup?t=${encodeURIComponent(token)}`;
export const emailAllowed = (email) => {
  const d = String(email || '').toLowerCase().split('@')[1] || '';
  const allow = config.adminDomains;
  return allow.includes('*') || allow.includes(d);
};

/* ---- sessions ---------------------------------------------------------------------------------------------------- */
export const SESSION_MS = 12 * 3600e3, IDLE_MS = 2 * 3600e3, STEP_MS = 10 * 60e3;
export async function newSession(user, req) {
  const token = crypto.randomBytes(32).toString('base64url');
  const now = new Date();
  await col('admin_sessions').insertOne({ _id: sha(token), user: user._id, created: now, last: now, exp: new Date(now.getTime() + SESSION_MS), ip: req ? sha(req.ip + config.secret).slice(0, 16) : '', ua: req ? String(req.headers['user-agent'] || '').slice(0, 200) : '', revoked: false, stepUp: now });
  return { token, expires: new Date(now.getTime() + SESSION_MS).toISOString() };
}
export async function revokeSessions(userId, except) {
  const f = { user: userId, revoked: false };
  if (except) f._id = { $ne: except };
  const r = await col('admin_sessions').updateMany(f, { $set: { revoked: true, revokedAt: new Date() } });
  return r.modifiedCount;
}
// short-lived signed ticket between the password step and the MFA step (5 minutes)
const tsign = (s) => crypto.createHmac('sha256', config.secret + '|mfa').update(s).digest('base64url');
export const mfaTicket = (userId) => { const exp = Date.now() + 5 * 60e3; const s = `${userId}.${exp}`; return `${s}.${tsign(s)}`; };
export function mfaTicketUser(t) {
  const [id, exp, sig] = String(t || '').split('.');
  if (!id || !exp || !sig || Date.now() > +exp) return '';
  const want = tsign(`${id}.${exp}`);
  return want.length === sig.length && crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig)) ? id : '';
}
// what the panel may know about an admin (never the password, MFA secret or codes)
export const publicUser = (u) => u && ({ id: u._id, email: u.email, name: u.name, photo: u.photo || '', prefs: u.prefs || {}, mobile: u.mobile || '', department: u.department || '', designation: u.designation || '', role: u.role, grants: u.grants || [], status: u.status, mfa: !!(u.mfa && u.mfa.on), created: u.created, by: u.by || '', lastLogin: u.lastLogin || null, invited: u.invite ? { exp: u.invite.exp, kind: u.invite.kind } : null, recoveryLeft: (u.recovery || []).length });
