// Everything the super admin changes without a new website build, stored in MongoDB ("content", one document per
// key, every earlier version kept in "content_history" so any change can be undone).
//   GET    /api/v1/site                       all public content in one answer (the website reads it on start)
//   GET    /api/v1/content/:key               one public key
//   GET    /api/v1/celebrations?year=YYYY     special days for the home-page banner (no events = use the built-in calendar)
//   GET    /api/v1/gallery                    gallery photo and video links
//   GET    /api/v1/admin/content              every key with its last change
//   GET    /api/v1/admin/content/:key         one key (also private ones)
//   PUT    /api/v1/admin/content/:key         replace it: { data }
//   DELETE /api/v1/admin/content/:key         remove it (the website goes back to what it ships with)
//   GET    /api/v1/admin/content/:key/history earlier versions;  POST …/history/:n/restore puts one back
//   PUT    /api/v1/admin/celebrations?year=YYYY and PUT /api/v1/admin/gallery: the same as before build 67
import { Router } from 'express';
import { col } from '../db.js';
import { ah, audit, clean, newId, requireAdmin } from '../lib/util.js';
import { PATH_KEYS, can, keyModule, roles, canSync, MODULES } from '../lib/auth.js';
import { mailReady, sendMail } from '../lib/mailer.js';
import { config } from '../config.js';

// what each key holds (shown in the admin panel). public: sent to every visitor in /site.
export const KEYS = {
  settings: { public: true, label: 'Site settings: contacts, WhatsApp, live chat, social links, header, footer, logos' },
  numbers: { public: true, label: 'Numbers shown on the site: panel sizes, countries, projects, years' },
  texts: { public: true, label: 'Text changes: any sentence on the website and what it should say instead' },
  pages: { public: true, label: 'Page titles and descriptions (SEO) per address' },
  team: { public: true, label: 'Team members and photos (Our team page)' },
  testimonials: { public: true, label: 'Client testimonials' },
  blogs: { public: true, label: 'Blog posts: new posts and changes to existing ones' },
  pricing: { public: true, label: 'Prices and plans' },
  'af-services': { public: true, label: 'Accounts & Finance services: prices, plans, offers and every text on those pages' },
  pdfs: { public: true, label: 'PDF downloads replaced by an uploaded file: { "File name.pdf": "/api/v1/files/…" }' },
  panels: { public: true, label: 'Panel books: panel numbers per country' },
  forms: { public: true, label: 'Form fields: labels, choices, required fields, thank-you messages' },
  logos: { public: true, label: 'Client and brand logos' },
  banners: { public: true, label: 'Announcement bar and pop-ups' },
  gallery: { public: true, label: 'Gallery photos and videos', heavy: true },
  contact: { public: true, label: 'Company name, email, phone, WhatsApp number and message, address, social links' },
  images: { public: true, label: 'Picture changes: any picture on the website and the uploaded one that replaces it' },
  links: { public: true, label: 'Link changes: any link (also PDF downloads) and where it should go instead' },
  'team-photos': { public: true, label: 'Team photos (one per team member)' },
  certifications: { public: true, label: 'Certifications and memberships' },
  'onboarding-links': { public: true, label: 'Onboarding links: new client and new vendor form addresses, texts and steps shown on the website' },
  associations: { public: true, label: 'Associations and memberships (ESOMAR, MSME…): logo, link, text' },
  leadership: { public: true, label: 'Leadership messages (home page and Our Team): name, role, email, LinkedIn, photo and message of each director' },
  'home-stats': { public: true, label: 'Home page numbers: value, sign (+ or %) and label of each number' },
  design79: { public: true, label: 'Hero slides: the texts, buttons and tickers of the home, platform and All services heroes' },
  seo: { public: true, label: 'SEO per page: title, description, keywords, canonical, social sharing, schema, no-index; and redirects ("_redirects")' },
  'image-alts': { public: true, label: 'Alt text of pictures: { "picture address": "alt text" }' },
  downloads: { public: true, label: 'Downloads list' },
  careers: { public: true, label: 'Careers: open roles and hiring text' },
  portals: { public: true, label: 'Panel portals (MyFrequentRewards, MyHealthOpinions, Turn2Opinion)' },
  'page-videos': { public: true, label: 'Page videos: the YouTube video, design and texts the red YouTube button shows on each page' },
  // build 78
  'custom-pages': { public: true, label: 'New pages made in the admin (any address, built from sections), with their menu places' },
  'page-blocks': { public: true, label: 'New sections added to existing pages: { "/path": [blocks] }' },
  'page-sections': { public: true, label: 'Sections of existing pages hidden, restyled or with custom CSS: { "/path": { hide, style, css } }' },
  menus: { public: true, label: 'Header and footer menus: extra links, renamed or hidden items, per menu' },
  products: { public: true, label: 'Sampledge products: every text and number, new products' },
  cases: { public: true, label: 'Case studies per industry: changes and new case studies' },
  logos: { public: true, label: 'Logos: header, footer, favicon, portals, products, certifications (uploaded replacements)' },
  'card-templates': { public: true, label: 'Design templates for blog and case study cards' },
  'menu-main': { public: true, label: 'Main menu bar items' },
  'menu-about': { public: true, label: 'About menu items' },
  'menu-downloads': { public: true, label: 'Downloads menu items' },
  'footer-company': { public: true, label: 'Footer: Company links' },
  'footer-start': { public: true, label: 'Footer: Get started links' },
  'footer-legal': { public: true, label: 'Footer: legal links' },
  legal: { public: true, label: 'Legal pages: privacy, cookie, terms, data protection, research ethics' },
  'legal-company': { public: true, label: 'Company details on the legal pages (name, address, email, last updated)' },
  'forms-mail': { public: false, label: 'Per form: team addresses alerted, reply template, reply on/off' },
  'mail-templates': { public: false, label: 'Email templates (admin copies and new ones)' },
  'mail-automations': { public: false, label: 'Email automations: replies, alerts, follow-ups, newsletters' },
  'mail-settings': { public: false, label: 'Email settings: logo shown in emails' },
  'mail-schedule-state': { public: false, label: 'When each periodic newsletter last went out' },
  'social-autopilot': { public: false, label: 'AI social media manager settings' },
  celebrations: { public: false, label: 'Celebration calendar (every year)' },
  notes: { public: false, label: 'Private notes for the admin team' },
};
// data:<file> replaces one of the website's data files (public/data/<file>, e.g. data:panel-books/b2c/india.json)
const KEY = /^(celebrations:\d{4}|data:[a-z0-9][a-z0-9/_.-]{0,150}\.json|[a-z][a-z0-9-]{1,40})$/;
const isData = (k) => k.startsWith('data:') && !k.includes('..');
const isPublic = (k) => isData(k) || !!(KEYS[k] && KEYS[k].public);

const MOTIFS = ['waves', 'diya', 'colours', 'bonfire', 'kite', 'crescent', 'lantern', 'xmas', 'tricolour', 'fireworks', 'leaf', 'ribbon', 'sport', 'coins', 'tech', 'sale', 'survey', 'hearts', 'book', 'lotus', 'dove', 'halloween', 'globe'];
const DAY = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;

export function celebrationsError(b) {
  if (!b || typeof b !== 'object' || !Array.isArray(b.events)) return 'Body must be { "events": [...] }';
  if (b.events.length > 5000) return 'Too many events';
  if ('enabled' in b && typeof b.enabled !== 'boolean') return 'enabled must be true or false';
  if (b.timezone && (typeof b.timezone !== 'string' || !/^[A-Za-z_]+\/[A-Za-z_\/+-]+$|^UTC$/.test(b.timezone))) return 'timezone must look like Asia/Kolkata';
  for (const [i, e] of b.events.entries()) {
    const at = `events[${i}]: `;
    if (!e || typeof e !== 'object') return at + 'not an object';
    if (!/^(\d{4}|\*)-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/.test(e.date || '')) return at + 'date must be YYYY-MM-DD (or *-MM-DD for every year)';
    if (typeof e.name !== 'string' || !e.name.trim() || e.name.length > 160) return at + 'name is required (max 160 characters)';
    if (e.until && !DAY.test(e.until)) return at + 'until must be YYYY-MM-DD';
    if (e.motif && !MOTIFS.includes(e.motif)) return at + 'unknown motif ' + e.motif;
    if (e.flags && (!Array.isArray(e.flags) || e.flags.some((f) => !/^[A-Z]{2}$/.test(f)))) return at + 'flags must be ISO codes like "IN"';
    if (e.scene && (typeof e.scene !== 'string' || !/^[a-z0-9-]{2,40}$/.test(e.scene))) return at + 'scene must be an id like "diwali"';
    if (e.icon && (!Array.isArray(e.icon) || e.icon.length > 2 || e.icon.some((x) => typeof x !== 'string' || !/^[a-z0-9-]{1,40}$/.test(x)))) return at + 'icon must be [main, accent] icon names';
    if (e.message && (typeof e.message !== 'string' || e.message.length > 300)) return at + 'message max 300 characters';
  }
  return '';
}

const SECTIONS = ['festivals', 'awards', 'birthdays'];
const httpsUrl = (u) => typeof u === 'string' && u.length <= 2000 && (/^https:\/\/[^\s"'<>]+$/i.test(u) || /^\/api\/v1\/files\/[a-f0-9]{24}(\/[^\s"'<>]*)?$/.test(u));
export function galleryError(b) {
  if (!b || typeof b !== 'object' || !Array.isArray(b.items)) return 'Body must be { "items": [...] }';
  if (b.items.length > 3000) return 'Too many items (max 3000)';
  const ids = new Set();
  for (const [i, it] of b.items.entries()) {
    const at = `items[${i}]: `;
    if (!it || typeof it !== 'object') return at + 'not an object';
    if (!SECTIONS.includes(it.section)) return at + 'section must be one of ' + SECTIONS.join(', ');
    if (!['photo', 'video'].includes(it.type)) return at + 'type must be "photo" or "video"';
    if (!httpsUrl(it.url)) return at + 'url must be an https:// link or an uploaded file';
    if (it.thumb && !httpsUrl(it.thumb)) return at + 'thumb must be an https:// link or an uploaded file';
    if (it.id != null && (typeof it.id !== 'string' || !/^[\w-]{1,64}$/.test(it.id))) return at + 'id must be letters, digits, - or _';
    if (it.id) { if (ids.has(it.id)) return at + 'duplicate id ' + it.id; ids.add(it.id); }
    for (const [k, max] of [['title', 120], ['caption', 300], ['album', 60], ['person', 80]]) if (it[k] != null && (typeof it[k] !== 'string' || it[k].length > max)) return at + k + ' max ' + max + ' characters';
    if (it.date && !DAY.test(it.date)) return at + 'date must be YYYY-MM-DD';
    for (const k of ['featured', 'show']) if (k in it && typeof it[k] !== 'boolean') return at + k + ' must be true or false';
  }
  return '';
}

// no script-like values anywhere in admin content (it is shown on the public site)
function unsafe(v, d = 0) {
  if (d > 12) return 'Too deeply nested';
  if (typeof v === 'string') return /<\s*(script|iframe|object|embed)\b|^\s*javascript:|<[^>]*\son\w+\s*=/i.test(v) ? 'Scripts are not allowed in content' : '';
  if (Array.isArray(v)) { for (const x of v) { const e = unsafe(x, d + 1); if (e) return e; } return ''; }
  if (v && typeof v === 'object') { for (const [k, x] of Object.entries(v)) { if (k.startsWith('$') || k.includes('\u0000')) return 'Invalid field name ' + k; const e = unsafe(x, d + 1); if (e) return e; } }
  return '';
}

function contentError(key, data) {
  if (data === undefined) return 'Body must be { "data": … }';
  if (key.startsWith('celebrations')) return celebrationsError(data);
  if (key === 'gallery') return galleryError(data);
  if (JSON.stringify(data).length > 6e6) return 'Too large (max 6 MB of text)';
  return unsafe(data);
}

export async function getContent(key) {
  const d = await col('content').findOne({ _id: key });
  return d ? d.data : undefined;
}

export async function putContent(req, key, data) {
  const now = new Date();
  const old = await col('content').findOne({ _id: key });
  if (old) await col('content_history').insertOne({ key, at: old.updated || now, data: old.data, replaced: now });
  await col('content').replaceOne({ _id: key }, { _id: key, data, updated: now, size: JSON.stringify(data).length }, { upsert: true });
  await audit(req, old ? 'update-content' : 'create-content', key, { size: JSON.stringify(data).length });
}

export const contentRouter = Router();

contentRouter.get('/site', ah(async (req, res) => {
  const [rows, files, alts] = await Promise.all([
    col('content').find({ _id: { $in: Object.keys(KEYS).filter((k) => isPublic(k) && !KEYS[k].heavy) } }).toArray(),
    col('content').find({ _id: { $regex: '^data:' } }, { projection: { updated: 1 } }).toArray(),
    // build 78.3: alt text written in the media library goes with the picture wherever it is used
    col('files.files').find({ 'metadata.public': true, 'metadata.alt': { $nin: ['', null] } }, { projection: { filename: 1, metadata: 1 } }).limit(5000).toArray(),
  ]);
  const content = {}; let updated = 0;
  for (const r of rows) { content[r._id] = r.data; updated = Math.max(updated, +r.updated || 0); }
  if (alts.length) content['image-alts'] = { ...Object.fromEntries(alts.map((f) => [`/api/v1/files/${f._id}`, f.metadata.alt])), ...(isObjV(content['image-alts']) ? content['image-alts'] : {}) };
  // data files the admin replaced: the website asks for these from /api/v1/content/data:<file> instead of /data/<file>
  const dataFiles = Object.fromEntries(files.map((f) => [f._id.slice(5), +f.updated || 0]));
  // no-cache: browsers revalidate every time (a 304 when nothing changed), so an admin change shows on the next page load
  res.set('Cache-Control', 'no-cache').json({ ok: true, updated: updated ? new Date(updated).toISOString() : null, content, dataFiles });
}));

contentRouter.get('/content/:key', ah(async (req, res) => {
  const k = String(req.params.key);
  if (!isPublic(k)) return res.status(404).json({ ok: false, error: 'Not found' });
  const data = await getContent(k);
  if (data === undefined) return res.status(404).json({ ok: false, error: 'Not set' });
  res.set('Cache-Control', 'public, max-age=60').json({ ok: true, data });
}));

const yearOf = (req) => (/^\d{4}$/.test(String(req.query.year || '')) ? String(req.query.year) : '');
const hasYear = (cal, y) => cal && Array.isArray(cal.events) && cal.events.some((e) => e && typeof e.date === 'string' && (e.date.startsWith(y + '-') || e.date.startsWith('*-')));

contentRouter.get('/celebrations', ah(async (req, res) => {
  const y = yearOf(req);
  // order: the admin copy for that year, then the admin's single calendar if it has days in that year
  let cal = y ? await getContent('celebrations:' + y) : undefined;
  if (!cal) { const all = await getContent('celebrations'); if (all && (!y || hasYear(all, y))) cal = all; }
  // build 74: 200 with no events (not a 404), so browsers log no error; the website then uses its built-in calendar
  if (!cal) return res.set('Cache-Control', 'public, max-age=300').json({ ok: false, events: null });
  res.set('Cache-Control', 'public, max-age=300').json(cal);
}));

contentRouter.put('/admin/celebrations', requireAdmin, ah(async (req, res) => {
  const y = yearOf(req), b = req.body;
  const bad = celebrationsError(b) || (y && b.events.some((e) => !e.date.startsWith(y + '-') && !e.date.startsWith('*-')) ? `every date must be in ${y} (or *-MM-DD)` : '');
  if (bad) return res.status(400).json({ ok: false, error: bad });
  await putContent(req, y ? 'celebrations:' + y : 'celebrations', b);
  res.json({ ok: true, year: y || null, events: b.events.length });
}));

contentRouter.get('/gallery', ah(async (req, res) => {
  res.set('Cache-Control', 'public, max-age=60').json((await getContent('gallery')) || { version: 1, items: [] });
}));

contentRouter.put('/admin/gallery', requireAdmin, ah(async (req, res) => {
  const g = req.body, bad = galleryError(g);
  if (bad) return res.status(400).json({ ok: false, error: bad });
  await putContent(req, 'gallery', { version: 1, updated: new Date().toISOString().slice(0, 10), items: g.items });
  res.json({ ok: true, items: g.items.length });
}));

// ---- generic admin content, with permissions and approvals (build 78.3) -----------------------------------------------
const keyOk = (req, res) => { const k = String(req.params.key); if (!KEY.test(k)) { res.status(400).json({ ok: false, error: 'Key must be lower-case letters, digits and -' }); return ''; } return k; };
const isObjV = (x) => x && typeof x === 'object' && !Array.isArray(x);
const labelOf = (k) => (KEYS[k] || KEYS[k.split(':')[0]] || {}).label || k;

// the entries of a page-keyed value: { "/path" or "*": value }. custom-pages is a list of pages with a path each;
// in texts a plain string is a change on every page ("*"); in seo "_redirects" belongs to every page.
function entries(key, data) {
  const out = new Map();
  if (key === 'custom-pages') { for (const p of Array.isArray(data) ? data : []) if (p && p.path) out.set(String(p.path), p); return out; }
  for (const [k, v] of Object.entries(isObjV(data) ? data : {})) {
    if (key === 'texts' && typeof v === 'string') { const m = out.get('*') || {}; m[k] = v; out.set('*', m); continue; }
    out.set(k.startsWith('/') ? k : '*', k.startsWith('/') ? v : { ...(out.get('*') || {}), [k]: v });
  }
  return out;
}
const J = (x) => JSON.stringify(x === undefined ? null : x);
// the page addresses a change touches (texts, page-blocks, page-sections, seo, custom-pages)
function changedPaths(key, before, after) {
  const a = entries(key, before), b = entries(key, after), out = [];
  for (const p of new Set([...a.keys(), ...b.keys()])) if (J(a.get(p)) !== J(b.get(p))) out.push(p);
  return out;
}
// put the changed pages of `draft` (compared with `base`) onto the live value
function mergePaths(key, live, base, draft) {
  const paths = changedPaths(key, base, draft);
  const L = entries(key, live), D = entries(key, draft);
  for (const p of paths) { if (D.has(p)) L.set(p, D.get(p)); else L.delete(p); }
  if (key === 'custom-pages') return [...L.values()];
  const out = {};
  for (const [p, v] of L) { if (p === '*') Object.assign(out, v); else out[p] = v; }
  return out;
}

// may this admin do `action` on this key, for this change?
async function keyAllowed(u, key, action, before, after) {
  const m = keyModule(key), R = await roles();
  if (canSync(u, R, m, action, { whole: true })) return { ok: true, module: m };
  if (PATH_KEYS.has(key) && after !== undefined) {
    const paths = changedPaths(key, before, after);
    const deny = paths.filter((p) => !canSync(u, R, m, action, { key, path: p }));
    return deny.length ? { ok: false, module: m, deny } : { ok: !!paths.length || canSync(u, R, m, action, { key, whole: true }), module: m };
  }
  return { ok: canSync(u, R, m, action, { key, whole: true }), module: m };
}
const viewAllowed = async (u, key) => { const m = keyModule(key); return (await can(u, m, 'view', { key })) || (await can(u, m, 'edit', { key })) || (await can(u, m, 'view')); };
const D = () => col('content_drafts');
const OPEN = ['draft', 'submitted', 'under_review', 'rejected', 'approved'];

contentRouter.get('/admin/content', requireAdmin, ah(async (req, res) => {
  const rows = await col('content').find({}, { projection: { data: 0 } }).toArray();
  const have = new Map(rows.map((r) => [r._id, r]));
  const u = req.admin.user, out = [];
  for (const k of [...new Set([...Object.keys(KEYS), ...have.keys()])].sort()) {
    if (!(await viewAllowed(u, k))) continue;
    out.push({ key: k, label: labelOf(k), module: keyModule(k), public: isPublic(k), set: have.has(k), updated: have.get(k)?.updated || null, size: have.get(k)?.size || 0 });
  }
  res.json({ ok: true, keys: out });
}));

contentRouter.get('/admin/content/:key', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  const u = req.admin.user;
  const m = keyModule(k);
  const scoped = PATH_KEYS.has(k) && (u.grants || []).some((g) => g.module === m && (g.paths || []).length);
  if (!(await viewAllowed(u, k)) && !scoped) return res.status(403).json({ ok: false, error: 'You do not have access to this.' });
  const d = await col('content').findOne({ _id: k });
  const mine = await D().findOne({ key: k, author: u._id, status: { $in: OPEN } }, { sort: { updated: -1 } });
  const canPublish = await can(u, m, 'publish', { key: k, whole: true });
  // the author keeps working on their own draft until it is published
  res.json({ ok: true, key: k, set: !!(d || mine), data: mine ? mine.data : d ? d.data : null, updated: d ? d.updated : null, module: m, canPublish, draft: mine ? { id: mine._id, status: mine.status, note: mine.note || '', updated: mine.updated } : null });
}));

async function notifyApprovers(draft) {
  if (!mailReady()) return;
  try {
    const R = await roles();
    const all = await col('admin_users').find({ status: 'active', _id: { $ne: draft.author } }).toArray();
    const to = all.filter((x) => canSync(x, R, draft.module, 'approve') || canSync(x, R, draft.module, 'approve', { key: draft.key })).map((x) => x.email).slice(0, 20);
    if (!to.length) return;
    const link = `${config.publicUrl}/admin/approvals`;
    await sendMail({ to: to.join(','), subject: `Waiting for your approval: ${labelOf(draft.key).slice(0, 60)}`, text: `${draft.authorName} sent a change for approval (${labelOf(draft.key)}). Review it: ${link}`, html: `<p>${String(draft.authorName).replace(/[<>&]/g, '')} sent a change for approval: <b>${labelOf(draft.key).replace(/[<>&]/g, '')}</b>.</p><p><a href="${link}">Review it in the admin panel</a></p>` });
  } catch (e) { console.warn('[approvals] mail', e.message); }
}

contentRouter.put('/admin/content/:key', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  const data = req.body && req.body.data;
  const bad = contentError(k, data);
  if (bad) return res.status(400).json({ ok: false, error: bad });
  const u = req.admin.user;
  const live = await col('content').findOne({ _id: k });
  const before = live ? live.data : undefined;
  const asDraft = !!(req.body && req.body.draft);
  const pub = await keyAllowed(u, k, 'publish', before, data);
  if (pub.ok && !asDraft) {
    await putContent(req, k, data);
    // an open draft of this admin for this key is now done
    await D().updateMany({ key: k, author: u._id, status: { $in: OPEN } }, { $set: { status: 'published', updated: new Date() }, $push: { history: { at: new Date(), by: u.email, status: 'published', note: 'published directly' } } });
    return res.json({ ok: true, key: k, published: true });
  }
  const ed = (await keyAllowed(u, k, 'edit', before, data)).ok || (await keyAllowed(u, k, 'create', before, data)).ok;
  if (!ed) {
    const why = pub.deny && pub.deny.length ? ' (not yours: ' + pub.deny.slice(0, 5).join(', ') + ')' : '';
    return res.status(403).json({ ok: false, error: 'You do not have permission to change this' + why + '.' });
  }
  // edit without publish: the change waits for approval (one open draft per admin and key)
  const now = new Date();
  const status = asDraft ? 'draft' : 'submitted';
  const ex = await D().findOne({ key: k, author: u._id, status: { $in: OPEN } });
  const paths = PATH_KEYS.has(k) ? changedPaths(k, ex ? ex.base : before, data) : [];
  const draft = ex
    ? { ...ex, data, status, updated: now, paths, note: '' }
    : { _id: newId('d_'), key: k, module: keyModule(k), data, base: before === undefined ? null : before, baseUpdated: live ? live.updated : null, author: u._id, authorName: u.name, authorEmail: u.email, status, created: now, updated: now, paths, history: [] };
  draft.history = [...(draft.history || []), { at: now, by: u.email, status, note: ex ? 'changed' : 'created' }].slice(-50);
  await D().replaceOne({ _id: draft._id }, draft, { upsert: true });
  await audit(req, 'draft-' + status, k, { id: draft._id, paths: paths.slice(0, 20) });
  if (status === 'submitted') notifyApprovers(draft);
  res.json({ ok: true, key: k, draft: true, id: draft._id, status });
}));

/* ---- approvals: draft → submitted → under review → approved / rejected → published (or archived) -------------------- */
const summary = (d) => ({ id: d._id, key: d.key, label: labelOf(d.key), module: d.module, moduleLabel: (MODULES[d.module] || {}).label || d.module, author: d.authorName, authorEmail: d.authorEmail, status: d.status, created: d.created, updated: d.updated, paths: d.paths || [], note: d.note || '', reviewer: d.reviewerName || '' });
async function mayApprove(u, d) {
  if (!u || u._id === d.author) return false;
  if (await can(u, d.module, 'approve', { key: d.key, whole: true })) return true;
  if ((d.paths || []).length) { for (const p of d.paths) if (!(await can(u, d.module, 'approve', { key: d.key, path: p }))) return false; return true; }
  return false;
}
async function mayPublish(u, d) {
  if (await can(u, d.module, 'publish', { key: d.key, whole: true })) return true;
  if ((d.paths || []).length) { for (const p of d.paths) if (!(await can(u, d.module, 'publish', { key: d.key, path: p }))) return false; return true; }
  return false;
}

contentRouter.get('/admin/approvals', requireAdmin, ah(async (req, res) => {
  const u = req.admin.user;
  const st = String(req.query.status || 'open');
  const f = st === 'open' ? { status: { $in: ['submitted', 'under_review', 'approved', 'rejected', 'draft'] } } : st === 'all' ? {} : { status: st };
  const rows = await D().find(f).sort({ updated: -1 }).limit(500).toArray();
  const out = [];
  for (const d of rows) {
    const mine = d.author === u._id;
    const approver = await mayApprove(u, d), publisher = await mayPublish(u, d);
    if (!mine && !approver && !publisher) continue;
    if (!mine && d.status === 'draft') continue; // a draft not yet sent is private
    out.push({ ...summary(d), mine, canApprove: approver, canPublish: publisher });
  }
  res.json({ ok: true, items: out });
}));

contentRouter.get('/admin/approvals/:id', requireAdmin, ah(async (req, res) => {
  const d = await D().findOne({ _id: clean(req.params.id, 40) });
  if (!d) return res.status(404).json({ ok: false, error: 'Not found' });
  const u = req.admin.user;
  const mine = d.author === u._id, approver = await mayApprove(u, d), publisher = await mayPublish(u, d);
  if (!mine && !approver && !publisher) return res.status(403).json({ ok: false, error: 'You do not have access to this.' });
  const live = await col('content').findOne({ _id: d.key });
  const pick = (v) => { if (!PATH_KEYS.has(d.key) || !(d.paths || []).length) return v; const E = entries(d.key, v); return Object.fromEntries((d.paths || []).map((p) => [p, E.get(p) === undefined ? null : E.get(p)])); };
  res.json({ ok: true, item: { ...summary(d), history: d.history || [], mine, canApprove: approver, canPublish: publisher, conflict: !!(live && d.baseUpdated && +live.updated > +d.baseUpdated) }, proposed: pick(d.data), live: pick(live ? live.data : null), base: pick(d.base) });
}));

const ACTS = {
  submit: { from: ['draft', 'rejected'], to: 'submitted', who: 'author' },
  withdraw: { from: ['submitted', 'under_review'], to: 'draft', who: 'author' },
  review: { from: ['submitted'], to: 'under_review', who: 'approver' },
  approve: { from: ['submitted', 'under_review'], to: 'approved', who: 'approver' },
  reject: { from: ['submitted', 'under_review', 'approved'], to: 'rejected', who: 'approver' },
  publish: { from: ['approved'], to: 'published', who: 'publisher' },
  archive: { from: ['draft', 'rejected', 'submitted', 'under_review', 'approved'], to: 'archived', who: 'any' },
};
contentRouter.post('/admin/approvals/:id/:act', requireAdmin, ah(async (req, res) => {
  const A = ACTS[req.params.act];
  if (!A) return res.status(404).json({ ok: false, error: 'Not found' });
  const d = await D().findOne({ _id: clean(req.params.id, 40) });
  if (!d) return res.status(404).json({ ok: false, error: 'Not found' });
  const u = req.admin.user, b = req.body || {};
  const mine = d.author === u._id;
  const approver = await mayApprove(u, d), publisher = await mayPublish(u, d);
  const ok = A.who === 'author' ? mine : A.who === 'approver' ? approver : A.who === 'publisher' ? publisher && (approver || d.status === 'approved') : mine || approver;
  if (!ok) return res.status(403).json({ ok: false, error: A.who === 'approver' && mine ? 'You cannot approve your own change.' : 'You do not have permission for this.' });
  if (!A.from.includes(d.status)) return res.status(400).json({ ok: false, error: `This change is ${d.status.replace('_', ' ')}; it cannot be ${req.params.act}ed now.` });
  const note = clean(b.note, 1000);
  if (req.params.act === 'reject' && !note) return res.status(400).json({ ok: false, error: 'Say what should change (a short note for the author).' });
  const now = new Date();
  let to = A.to;
  // approve and publish in one step when the approver may also publish
  const alsoPublish = req.params.act === 'approve' && b.publish && publisher;
  if (req.params.act === 'publish' || alsoPublish) {
    const live = await col('content').findOne({ _id: d.key });
    const conflict = live && d.baseUpdated && +live.updated > +d.baseUpdated;
    let value = d.data;
    if (conflict && PATH_KEYS.has(d.key)) value = mergePaths(d.key, live.data, d.base, d.data); // only this draft's pages change
    else if (conflict && !b.force) return res.status(409).json({ ok: false, conflict: true, error: 'The live version changed after this draft was made. Publishing would overwrite those changes. Publish anyway?' });
    const bad = contentError(d.key, value);
    if (bad) return res.status(400).json({ ok: false, error: bad });
    req.actor = { id: u._id, email: u.email };
    await putContent(req, d.key, value);
    to = 'published';
  }
  const set = { status: to, updated: now, note: note || (to === 'approved' || to === 'published' ? '' : d.note || '') };
  if (A.who === 'approver' || to === 'published') { set.reviewer = u._id; set.reviewerName = u.name; }
  await D().updateOne({ _id: d._id }, { $set: set, $push: { history: { $each: [{ at: now, by: u.email, status: to, note }], $slice: -50 } } });
  await audit(req, 'approval-' + req.params.act + (alsoPublish ? '+publish' : ''), d.key, { id: d._id, author: d.authorEmail, note: note || undefined });
  if (to === 'submitted') notifyApprovers(d);
  if (['rejected', 'approved', 'published'].includes(to) && mailReady() && d.authorEmail) {
    sendMail({ to: d.authorEmail, subject: `Your change was ${to}: ${labelOf(d.key).slice(0, 60)}`, text: `${u.name} marked your change (${labelOf(d.key)}) as ${to}.${note ? '\n\nNote: ' + note : ''}\n\n${config.publicUrl}/admin/approvals` }).catch(() => {});
  }
  res.json({ ok: true, status: to });
}));

contentRouter.delete('/admin/content/:key', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  // "back to the original" removes the live value: it needs delete and publish on the whole area
  const m = keyModule(k);
  if (!((await can(req.admin.user, m, 'delete') || await can(req.admin.user, m, 'edit')) && await can(req.admin.user, m, 'publish'))) return res.status(403).json({ ok: false, error: 'Going back to the original needs the publish right on this area.' });
  const old = await col('content').findOneAndDelete({ _id: k });
  if (old) { await col('content_history').insertOne({ key: k, at: old.updated, data: old.data, replaced: new Date(), deleted: true }); await audit(req, 'delete-content', k); }
  res.json({ ok: true });
}));

contentRouter.get('/admin/content/:key/history', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  if (!(await viewAllowed(req.admin.user, k))) return res.status(403).json({ ok: false, error: 'You do not have access to this.' });
  const rows = await col('content_history').find({ key: k }, { projection: { data: 0 } }).sort({ replaced: -1 }).limit(100).toArray();
  res.json({ ok: true, versions: rows.map((r, i) => ({ n: i, at: r.at, replaced: r.replaced, deleted: !!r.deleted })) });
}));

contentRouter.get('/admin/content/:key/history/:n', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  if (!(await viewAllowed(req.admin.user, k))) return res.status(403).json({ ok: false, error: 'You do not have access to this.' });
  const [v] = await col('content_history').find({ key: k }).sort({ replaced: -1 }).skip(Math.max(0, +req.params.n || 0)).limit(1).toArray();
  if (!v) return res.status(404).json({ ok: false });
  res.json({ ok: true, data: v.data, at: v.at });
}));

contentRouter.post('/admin/content/:key/history/:n/restore', requireAdmin, ah(async (req, res) => {
  const k = keyOk(req, res); if (!k) return;
  // rollback to an earlier published version: publish right on the whole area
  if (!(await can(req.admin.user, keyModule(k), 'publish'))) return res.status(403).json({ ok: false, error: 'Rolling back needs the publish right on this area.' });
  const [v] = await col('content_history').find({ key: k }).sort({ replaced: -1 }).skip(Math.max(0, +req.params.n || 0)).limit(1).toArray();
  if (!v) return res.status(404).json({ ok: false });
  await putContent(req, k, v.data);
  await audit(req, 'restore-content', k, { from: v.at });
  res.json({ ok: true });
}));
