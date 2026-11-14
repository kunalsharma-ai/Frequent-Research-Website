/*
 * Page video component (build 82.4 "Video web component", renamed and extended in build 82.5, Kunal 13 Nov).
 * Super admin › Pages › Page video component. For every website page: the video (URL, title, description, template,
 * icon, poster, on/off, custom fields) and, new in 82.5, the page's OWN video template: a design made for that page
 * (layout, animated scene, 3D object, colours, icons, flags, the page's words) that the ready-made player draws.
 *
 * Public (no sign-in, read-only, CORS open, cached 60 s). /api/v1/web-videos… still answers the same (old name).
 *   GET /api/v1/page-videos?page=/about-us        the page's video (null when none) and its template
 *   GET /api/v1/page-videos                       every page that has a published video
 *   GET /api/v1/page-videos/config                generic templates, icons, custom fields, layouts, scenes, objects
 *   GET /api/v1/page-videos/templates             every page's template (summary); ?page=/x for one in full
 *   GET /api/v1/page-videos/player.js             the ready-made player: <fr-page-video></fr-page-video>
 *   GET /api/v1/page-videos/flags.webp, world-dots.webp   pictures the player uses
 * Admin (signed in, rights area "pages"; /admin/web-videos/… works too):
 *   GET    /admin/page-videos                     all pages, search and filter
 *   GET|PUT|DELETE /admin/page-videos/item?path=/x          one page's video
 *   POST   /admin/page-videos/import              many pages at once (CSV / JSON rows)
 *   GET    /admin/page-videos/export              CSV (?as=json)
 *   GET|PUT /admin/page-videos/settings           generic templates, icons, custom fields
 *   POST   /admin/page-videos/pages               add page URLs
 *   GET    /admin/page-videos/templates           every page's template (search, filter)
 *   GET|PUT|DELETE /admin/page-videos/templates/item?path=/x   one page's template: read, change, back to generated
 * Collections: web_videos (_id = path), web_video_settings (config, pages), page_video_templates (_id = path: the
 * admin's changes to the generated template). Generated templates: data/page-video-templates.json
 * (tools/make-page-video-templates.js).
 */
import { readFileSync } from 'node:fs';
import { makeTemplate, cleanTemplatePatch, mergeTemplate, readability, LAYOUTS, SCENES, OBJECTS, ICONS, MOTIONS, FRAMES, PROPS } from '../lib/pageTemplates.js';
import { Router } from 'express';
import { col } from '../db.js';
import { ah, audit, clean, toCsv } from '../lib/util.js';

export const pageVideosRouter = Router();
export const webVideosRouter = pageVideosRouter; // old name (build 82.4)
const A = (p) => [p.replace('{x}', 'page-videos'), p.replace('{x}', 'web-videos')]; // every route answers on both names

// every page of the website at build time (995 pages, from the build's site index); new pages are added by the admin
let SITE_PAGES = [];
try { SITE_PAGES = JSON.parse(readFileSync(new URL('../data/site-pages.json', import.meta.url), 'utf8')); } catch (e) { SITE_PAGES = []; }

export const DEFAULT_SETTINGS = {
  templates: [
    { id: 'page', label: "This page's own design (ready-made player)" },
    { id: 'default', label: 'Default player' },
    { id: 'card', label: 'Card with title and description' },
    { id: 'hero', label: 'Large hero video' },
    { id: 'floating', label: 'Floating button with pop-up' },
    { id: 'inline', label: 'Inline in the page' },
    { id: 'modal', label: 'Opens in a pop-up' },
  ],
  icons: [
    { id: 'play', label: 'Play' },
    { id: 'youtube', label: 'YouTube' },
    { id: 'film', label: 'Film' },
    { id: 'camera', label: 'Camera' },
    { id: 'info', label: 'Info' },
  ],
  // custom fields the admin adds: { key, label, type, options?, required?, help? }
  fields: [],
};
// the page's own templates: made once for the 995 pages of the build, on the fly for pages added later
let GENERATED = {};
try { GENERATED = JSON.parse(readFileSync(new URL('../data/page-video-templates.json', import.meta.url), 'utf8')).templates || {}; } catch (e) { GENERATED = {}; }
const USED = new Set(Object.values(GENERATED).map((t) => t.frame + '|' + t.prop + '|' + t.scene)); // build 82.6: frame|card|scene is what makes a design its own
const EXTRA = new Map();
function generated(path, title) {
  if (GENERATED[path]) return GENERATED[path];
  if (!EXTRA.has(path)) EXTRA.set(path, makeTemplate({ path, title: title || '' }, USED));
  return EXTRA.get(path);
}
async function templateOf(path, title) {
  const o = await col('page_video_templates').findOne({ _id: path });
  return mergeTemplate(generated(path, title), o && o.patch);
}
const OPTIONS = { layouts: LAYOUTS.map(([id, label]) => ({ id, label })), scenes: SCENES.map(([id, label]) => ({ id, label })), objects: OBJECTS.map(([id, label]) => ({ id, label })), frames: FRAMES.map(([id, label]) => ({ id, label })), props: PROPS.map(([id, label]) => ({ id, label })), icons: ICONS, motions: MOTIONS };
const PUB_DIR = new URL('../public/', import.meta.url);
const FILES = { 'player.js': ['fr-page-video.js', 'text/javascript; charset=utf-8', 300], 'flags.webp': ['flags-sprite.webp', 'image/webp', 2592000], 'world-dots.webp': ['world-dots.webp', 'image/webp', 2592000] };
const FILE_CACHE = {};
export const FIELD_TYPES = ['text', 'textarea', 'url', 'number', 'select', 'toggle', 'date', 'color', 'image'];

const normPath = (p) => {
  let s = String(p || '').trim();
  try { if (/^https?:\/\//i.test(s)) s = new URL(s).pathname; } catch (e) { /* keep */ }
  s = s.split('#')[0].split('?')[0];
  if (!s.startsWith('/')) s = '/' + s;
  s = s.replace(/\/{2,}/g, '/');
  if (s.length > 1) s = s.replace(/\/$/, '');
  return s.slice(0, 300);
};
const okUrl = (u) => {
  const s = String(u || '').trim();
  if (!s) return '';
  if (s.startsWith('/')) return s.slice(0, 1000); // a file uploaded to the site (/api/v1/files/…)
  try { const x = new URL(s); return /^https?:$/.test(x.protocol) ? x.href.slice(0, 1000) : null; } catch (e) { return null; }
};
const keyOk = (k) => /^[a-zA-Z][a-zA-Z0-9_-]{0,39}$/.test(k);

async function getSettings() {
  const d = await col('web_video_settings').findOne({ _id: 'config' });
  const s = d && d.data ? d.data : {};
  let templates = Array.isArray(s.templates) && s.templates.length ? s.templates : DEFAULT_SETTINGS.templates;
  if (!templates.some((t) => t.id === 'page')) templates = [DEFAULT_SETTINGS.templates[0], ...templates]; // settings saved before 82.5
  return { templates, icons: Array.isArray(s.icons) && s.icons.length ? s.icons : DEFAULT_SETTINGS.icons, fields: Array.isArray(s.fields) ? s.fields : [] };
}

// a saved entry checked against the settings; returns { entry } or { error }
function cleanEntry(body, settings, path) {
  const b = body && typeof body === 'object' ? body : {};
  const v = b.video && typeof b.video === 'object' ? b.video : b;
  const url = okUrl(v.url);
  if (url === null) return { error: 'The video URL must start with https:// (or be a file uploaded to the site).' };
  const template = clean(v.template || 'page', 40);
  const icon = clean(v.icon || '', 300);
  const video = {
    url,
    title: clean(v.title, 200),
    description: typeof v.description === 'string' ? v.description.replace(/<[^>]*>/g, '').replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, 4000) : '',
    template: settings.templates.some((t) => t.id === template) ? template : 'page',
    icon: /^(https?:\/\/|\/)/.test(icon) ? (okUrl(icon) || '') : settings.icons.some((t) => t.id === icon) ? icon : (icon ? 'play' : ''),
    poster: okUrl(v.poster) || '',
  };
  const custom = {};
  const cin = b.custom && typeof b.custom === 'object' ? b.custom : {};
  for (const f of settings.fields) {
    const x = cin[f.key];
    if (x === undefined || x === null || x === '') { if (f.required && video.url) return { error: `Please fill in "${f.label}".` }; continue; }
    if (f.type === 'number') { const n = Number(x); if (!Number.isFinite(n)) return { error: `"${f.label}" must be a number.` }; custom[f.key] = n; }
    else if (f.type === 'toggle') custom[f.key] = x === true || x === 'true' || x === 1 || x === '1' || x === 'yes';
    else if (f.type === 'url' || f.type === 'image') { const u = okUrl(x); if (u === null) return { error: `"${f.label}" must be a link starting with https://.` }; custom[f.key] = u; }
    else if (f.type === 'select') { const s = clean(String(x), 200); if (Array.isArray(f.options) && f.options.length && !f.options.includes(s)) return { error: `"${f.label}" must be one of: ${f.options.join(', ')}.` }; custom[f.key] = s; }
    else if (f.type === 'textarea') custom[f.key] = String(x).replace(/<[^>]*>/g, '').trim().slice(0, 4000);
    else custom[f.key] = clean(String(x), 1000);
  }
  return { entry: { _id: path, path, video, custom, enabled: b.enabled === undefined ? true : !!b.enabled } };
}

// what the web component receives
const publicView = (d) => ({ page: d.path, url: d.video.url, title: d.video.title, description: d.video.description, template: d.video.template, icon: d.video.icon, poster: d.video.poster || '', custom: d.custom || {}, updatedAt: d.updatedAt });
const pub = (res) => res.set({ 'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*', 'Cross-Origin-Resource-Policy': 'cross-origin' });

/* ---------------------------------------------------------------- public ---------------------------------------- */
pageVideosRouter.options([...A('/{x}'), ...A('/{x}/config'), ...A('/{x}/templates')], (req, res) => { res.set({ 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400' }); res.status(204).end(); });

pageVideosRouter.get(A('/{x}/config'), ah(async (req, res) => {
  const s = await getSettings();
  pub(res).json({ ok: true, templates: s.templates, icons: s.icons, fields: s.fields.map((f) => ({ key: f.key, label: f.label, type: f.type, options: f.options || [] })), design: OPTIONS });
}));

// the ready-made player and its pictures
pageVideosRouter.get(Object.keys(FILES).flatMap((n) => A('/{x}/' + n)), (req, res) => {
  const name = req.path.split('/').pop(), f = FILES[name];
  if (!FILE_CACHE[name]) FILE_CACHE[name] = readFileSync(new URL(f[0], PUB_DIR));
  res.set({ 'Content-Type': f[1], 'Cache-Control': `public, max-age=${f[2]}`, 'Access-Control-Allow-Origin': '*', 'Cross-Origin-Resource-Policy': 'cross-origin' }).send(FILE_CACHE[name]);
});

// every page's own template
pageVideosRouter.get(A('/{x}/templates'), ah(async (req, res) => {
  pub(res);
  if (req.query.page !== undefined) { const path = normPath(req.query.page); return res.json({ ok: true, page: path, template: await templateOf(path) }); }
  const pages = await allPages();
  const over = new Map((await col('page_video_templates').find({}).toArray()).map((d) => [d._id, d.patch]));
  const list = [...pages.values()].map((p) => { const t = mergeTemplate(generated(p.path, p.title), over.get(p.path)); return { page: p.path, id: t.id, name: t.name, layout: t.layout, frame: t.frame, prop: t.prop, scene: t.scene, object: t.object, tone: t.palette.tone, edited: !!t.edited }; });
  res.json({ ok: true, count: list.length, templates: list });
}));

pageVideosRouter.get(A('/{x}'), ah(async (req, res) => {
  pub(res);
  if (req.query.page !== undefined) {
    const path = normPath(req.query.page);
    const d = await col('web_videos').findOne({ _id: path });
    const t = await templateOf(path);
    return res.json({ ok: true, page: path, video: d && d.enabled && d.video && d.video.url ? publicView(d) : null, template: t });
  }
  const list = await col('web_videos').find({ enabled: true, 'video.url': { $nin: ['', null] } }).sort({ _id: 1 }).toArray();
  res.json({ ok: true, count: list.length, videos: list.map((d) => ({ ...publicView(d), templateId: generated(d.path).id })) });
}));

/* ---------------------------------------------------------------- admin ----------------------------------------- */
const who = (req) => (req.admin && req.admin.user ? { id: req.admin.user._id, email: req.admin.user.email, name: req.admin.user.name } : null);

async function allPages() {
  const extra = await col('web_video_settings').findOne({ _id: 'pages' });
  const map = new Map(SITE_PAGES.map((p) => [p.path, { path: p.path, title: p.title || '' }]));
  for (const p of (extra && extra.pages) || []) if (!map.has(p.path)) map.set(p.path, { path: p.path, title: p.title || '', added: true });
  return map;
}

pageVideosRouter.get(A('/admin/{x}'), ah(async (req, res) => {
  const pages = await allPages();
  const saved = await col('web_videos').find({}).toArray();
  for (const d of saved) if (!pages.has(d.path)) pages.set(d.path, { path: d.path, title: '', added: true });
  const byPath = new Map(saved.map((d) => [d.path, d]));
  let rows = [...pages.values()].map((p) => { const d = byPath.get(p.path); return { path: p.path, pageTitle: p.title, added: !!p.added, video: d ? d.video : null, custom: d ? d.custom : {}, enabled: d ? !!d.enabled : false, updatedAt: d ? d.updatedAt : null, updatedBy: d ? d.updatedBy : null }; });
  const q = String(req.query.q || '').toLowerCase().trim();
  if (q) rows = rows.filter((r) => (r.path + ' ' + r.pageTitle + ' ' + (r.video ? r.video.title + ' ' + r.video.url : '')).toLowerCase().includes(q));
  if (req.query.has === 'with') rows = rows.filter((r) => r.video && r.video.url);
  if (req.query.has === 'without') rows = rows.filter((r) => !(r.video && r.video.url));
  rows.sort((a, b) => (a.path === '/' ? -1 : b.path === '/' ? 1 : a.path.localeCompare(b.path)));
  const total = rows.length, withVideo = saved.filter((d) => d.video && d.video.url).length;
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 100, 1), 2000), skip = Math.max(parseInt(req.query.skip, 10) || 0, 0);
  res.json({ ok: true, total, pages: pages.size, withVideo, rows: rows.slice(skip, skip + limit) });
}));

pageVideosRouter.get(A('/admin/{x}/item'), ah(async (req, res) => {
  const path = normPath(req.query.path);
  const d = await col('web_videos').findOne({ _id: path });
  const p = (await allPages()).get(path);
  res.json({ ok: true, path, pageTitle: p ? p.title : '', entry: d || null, settings: await getSettings() });
}));

pageVideosRouter.put(A('/admin/{x}/item'), ah(async (req, res) => {
  const path = normPath(req.query.path || (req.body && req.body.path));
  const r = cleanEntry(req.body, await getSettings(), path);
  if (r.error) return res.status(400).json({ ok: false, error: r.error });
  const e = { ...r.entry, updatedAt: new Date(), updatedBy: who(req) };
  await col('web_videos').replaceOne({ _id: path }, e, { upsert: true });
  await audit(req, 'page-video.save', path, { url: e.video.url, enabled: e.enabled });
  res.json({ ok: true, entry: e });
}));

pageVideosRouter.delete(A('/admin/{x}/item'), ah(async (req, res) => {
  const path = normPath(req.query.path);
  await col('web_videos').deleteOne({ _id: path });
  await col('web_video_settings').updateOne({ _id: 'pages' }, { $pull: { pages: { path } } });
  await audit(req, 'page-video.delete', path);
  res.json({ ok: true });
}));

pageVideosRouter.post(A('/admin/{x}/import'), ah(async (req, res) => {
  const rows = Array.isArray(req.body && req.body.rows) ? req.body.rows.slice(0, 5000) : [];
  const settings = await getSettings();
  const done = [], errors = [];
  for (const [i, row] of rows.entries()) {
    if (!row || typeof row !== 'object') continue;
    const rawPath = row.path || row.page || row.pageUrl || row['page url'];
    if (!rawPath) { errors.push({ row: i + 1, error: 'No page URL' }); continue; }
    const path = normPath(rawPath);
    // a flat row (CSV): url,title,description,template,icon,poster,enabled + custom field keys
    const custom = { ...(row.custom || {}) };
    for (const f of settings.fields) if (row[f.key] !== undefined) custom[f.key] = row[f.key];
    const body = { video: row.video || { url: row.url || row.videoUrl || row['video url'], title: row.title || row.videoTitle, description: row.description, template: row.template, icon: row.icon, poster: row.poster }, custom, enabled: row.enabled === undefined || row.enabled === '' ? true : !/^(false|0|no|off)$/i.test(String(row.enabled)) };
    const r = cleanEntry(body, settings, path);
    if (r.error) { errors.push({ row: i + 1, path, error: r.error }); continue; }
    await col('web_videos').replaceOne({ _id: path }, { ...r.entry, updatedAt: new Date(), updatedBy: who(req) }, { upsert: true });
    done.push(path);
  }
  await audit(req, 'page-video.import', done.length + ' pages', { errors: errors.length });
  res.json({ ok: true, saved: done.length, errors });
}));

pageVideosRouter.get(A('/admin/{x}/export'), ah(async (req, res) => {
  const settings = await getSettings();
  const pages = await allPages();
  const saved = new Map((await col('web_videos').find({}).toArray()).map((d) => [d.path, d]));
  for (const k of saved.keys()) if (!pages.has(k)) pages.set(k, { path: k, title: '' });
  const keys = settings.fields.map((f) => f.key);
  const cols = ['path', 'pageTitle', 'url', 'title', 'description', 'template', 'icon', 'poster', 'enabled', ...keys];
  const rows = [...pages.values()].map((p) => { const d = saved.get(p.path); const v = (d && d.video) || {}; const c = (d && d.custom) || {}; return { path: p.path, pageTitle: p.title, url: v.url || '', title: v.title || '', description: v.description || '', template: v.template || '', icon: v.icon || '', poster: v.poster || '', enabled: d ? String(!!d.enabled) : '', ...Object.fromEntries(keys.map((k) => [k, c[k] === undefined ? '' : c[k]])) }; });
  if (req.query.as === 'json') return res.json({ ok: true, rows });
  res.set({ 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="page-videos.csv"' }).send(toCsv(cols, rows));
}));

pageVideosRouter.get(A('/admin/{x}/settings'), ah(async (req, res) => {
  res.json({ ok: true, settings: await getSettings(), fieldTypes: FIELD_TYPES, defaults: DEFAULT_SETTINGS });
}));

pageVideosRouter.put(A('/admin/{x}/settings'), ah(async (req, res) => {
  const s = (req.body && req.body.settings) || req.body || {};
  const list = (a, max) => (Array.isArray(a) ? a.slice(0, max) : []);
  const ids = new Set();
  const opt = (x) => { const id = clean(String(x.id || ''), 40).replace(/[^a-zA-Z0-9_-]/g, '-'); if (!id || ids.has(id)) return null; ids.add(id); const o = { id, label: clean(x.label || id, 80) }; const u = okUrl(x.url); if (u) o.url = u; return o; };
  const templates = list(s.templates, 60).map(opt).filter(Boolean); ids.clear();
  const icons = list(s.icons, 100).map(opt).filter(Boolean);
  const keys = new Set(), fields = [];
  for (const f of list(s.fields, 50)) {
    const key = String(f && f.key || '').trim();
    if (!keyOk(key)) return res.status(400).json({ ok: false, error: `Field key "${key}" must start with a letter and use only letters, numbers, - or _ (max 40).` });
    if (['url', 'title', 'description', 'template', 'icon', 'poster', 'path', 'page', 'enabled'].includes(key)) return res.status(400).json({ ok: false, error: `"${key}" is already a standard field.` });
    if (keys.has(key)) return res.status(400).json({ ok: false, error: `Two fields use the key "${key}".` });
    keys.add(key);
    const type = FIELD_TYPES.includes(f.type) ? f.type : 'text';
    fields.push({ key, label: clean(f.label || key, 80), type, options: type === 'select' ? list(f.options, 50).map((o) => clean(String(o), 100)).filter(Boolean) : [], required: !!f.required, help: clean(f.help || '', 200) });
  }
  if (!templates.length) return res.status(400).json({ ok: false, error: 'Keep at least one template.' });
  const data = { templates, icons, fields };
  await col('web_video_settings').replaceOne({ _id: 'config' }, { _id: 'config', data, updatedAt: new Date(), updatedBy: who(req) }, { upsert: true });
  await audit(req, 'page-video.settings', 'config', { templates: templates.length, icons: icons.length, fields: fields.length });
  res.json({ ok: true, settings: data });
}));

pageVideosRouter.post(A('/admin/{x}/pages'), ah(async (req, res) => {
  const known = await allPages();
  const add = [];
  for (const p of (Array.isArray(req.body && req.body.pages) ? req.body.pages.slice(0, 2000) : [])) {
    const path = normPath(typeof p === 'string' ? p : p && p.path);
    if (!path || known.has(path)) continue;
    known.set(path, true);
    add.push({ path, title: clean(typeof p === 'object' && p ? p.title : '', 200) });
  }
  if (add.length) await col('web_video_settings').updateOne({ _id: 'pages' }, { $push: { pages: { $each: add } } }, { upsert: true });
  await audit(req, 'page-video.pages', add.length + ' added');
  res.json({ ok: true, added: add.length });
}));

/* ---------------------------------------------------------------- admin: every page's own template ------------- */
pageVideosRouter.get(A('/admin/{x}/templates'), ah(async (req, res) => {
  const pages = await allPages();
  const over = new Map((await col('page_video_templates').find({}).toArray()).map((d) => [d._id, d]));
  let rows = [...pages.values()].map((p) => { const o = over.get(p.path); const t = mergeTemplate(generated(p.path, p.title), o && o.patch); return { ...t, pageTitle: p.title, updatedAt: o ? o.updatedAt : null, updatedBy: o ? o.updatedBy : null }; });
  const q = String(req.query.q || '').toLowerCase().trim();
  if (q) rows = rows.filter((r) => (r.page + ' ' + r.pageTitle + ' ' + r.headline + ' ' + r.kicker).toLowerCase().includes(q));
  for (const k of ['layout', 'frame', 'prop', 'scene', 'object', 'family']) if (req.query[k]) rows = rows.filter((r) => r[k] === req.query[k]);
  if (req.query.edited === 'yes') rows = rows.filter((r) => r.edited);
  rows.sort((a, b) => (a.page === '/' ? -1 : b.page === '/' ? 1 : a.page.localeCompare(b.page)));
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 24, 1), 2000), skip = Math.max(parseInt(req.query.skip, 10) || 0, 0);
  res.json({ ok: true, total: rows.length, edited: over.size, options: OPTIONS, rows: rows.slice(skip, skip + limit) });
}));

pageVideosRouter.get(A('/admin/{x}/templates/item'), ah(async (req, res) => {
  const path = normPath(req.query.path);
  const p = (await allPages()).get(path);
  const o = await col('page_video_templates').findOne({ _id: path });
  const base = generated(path, p && p.title);
  const t = mergeTemplate(base, o && o.patch);
  const d = await col('web_videos').findOne({ _id: path });
  res.json({ ok: true, path, pageTitle: p ? p.title : '', template: t, generated: base, changes: o ? o.patch : null, video: d && d.video && d.video.url ? publicView(d) : null, options: OPTIONS, warning: readability(t) });
}));

pageVideosRouter.put(A('/admin/{x}/templates/item'), ah(async (req, res) => {
  const path = normPath(req.query.path || (req.body && req.body.path));
  const body = (req.body && (req.body.template || req.body)) || {};
  const r = cleanTemplatePatch(body);
  if (r.error) return res.status(400).json({ ok: false, error: r.error });
  const p = (await allPages()).get(path);
  const base = generated(path, p && p.title);
  // keep only what differs from the generated design, so later improvements of the generator still reach the rest
  const patch = {};
  for (const [k, v] of Object.entries(r.patch)) {
    if (k === 'palette') { const pal = {}; for (const [c, x] of Object.entries(v)) if (base.palette[c] !== x) pal[c] = x; if (Object.keys(pal).length) patch.palette = pal; }
    else if (JSON.stringify(base[k]) !== JSON.stringify(v)) patch[k] = v;
  }
  if (!Object.keys(patch).length) await col('page_video_templates').deleteOne({ _id: path });
  else await col('page_video_templates').replaceOne({ _id: path }, { _id: path, patch, updatedAt: new Date(), updatedBy: who(req) }, { upsert: true });
  await audit(req, 'page-video.template', path, { fields: Object.keys(patch) });
  const t = mergeTemplate(base, Object.keys(patch).length ? patch : null);
  res.json({ ok: true, template: t, warning: readability(t) });
}));

pageVideosRouter.delete(A('/admin/{x}/templates/item'), ah(async (req, res) => {
  const path = normPath(req.query.path);
  await col('page_video_templates').deleteOne({ _id: path });
  await audit(req, 'page-video.template-reset', path);
  const p = (await allPages()).get(path);
  res.json({ ok: true, template: generated(path, p && p.title) });
}));
