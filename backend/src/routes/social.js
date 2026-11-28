// Build 78: social media from the super admin. Write a post once, pick the platforms, post now with one click or
// schedule it. The AI social media manager (autopilot) drafts a calendar of posts on its own; they wait for approval
// unless approval is switched off. Each platform needs its own key in .env (docs/go-live/12-MARKETING-AND-KEYS.md):
//   Facebook page   FB_PAGE_ID, FB_PAGE_TOKEN          Instagram business  IG_USER_ID (+ FB_PAGE_TOKEN or IG_TOKEN)
//   LinkedIn page   LINKEDIN_AUTHOR_URN, LINKEDIN_TOKEN X (Twitter)        X_API_KEY, X_API_SECRET, X_ACCESS_TOKEN, X_ACCESS_SECRET
//   Anything else (YouTube, Pinterest, Threads, WhatsApp channel, Google Business …): SOCIAL_WEBHOOK, a Zapier / Make /
//   Buffer hook that receives { text, link, image, video, platforms } and posts it.
//   GET  /api/v1/admin/social/status        which platforms are connected
//   GET  /api/v1/admin/social/posts         ?status=    ;  POST (create)  ;  PUT /:id  ;  DELETE /:id
//   POST /api/v1/admin/social/posts/:id/publish     post it now to its platforms
//   POST /api/v1/admin/social/posts/:id/approve     approve an AI draft (it is then scheduled)
//   GET/PUT /api/v1/admin/social/autopilot         { on, approve, everyDays, platforms, themes, hour }
//   POST /api/v1/admin/social/autopilot/run        draft the next two weeks now
import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from '../config.js';
import { col } from '../db.js';
import { getContent, putContent } from './content.js';
import { ah, audit, clean, newId, requireAdmin } from '../lib/util.js';
import { aiReady, aiWrite } from '../lib/ai.js';

export const socialRouter = Router();
const S = () => config.social;
// version from Connections & keys (FB_GRAPH_VERSION) or .env, read on every call so a change applies without a restart
const graph = () => 'https://graph.facebook.com/' + S().graphVersion;
export const PLATFORMS = ['facebook', 'instagram', 'linkedin', 'x', 'webhook'];
export const socialStatus = () => ({
  facebook: !!(S().facebook.pageId && S().facebook.token),
  instagram: !!(S().instagram.userId && S().instagram.token),
  linkedin: !!(S().linkedin.author && S().linkedin.token),
  x: !!(S().x.key && S().x.secret && S().x.token && S().x.tokenSecret),
  webhook: !!S().webhook,
});

async function call(url, opts) {
  const r = await fetch(url, { ...opts, signal: AbortSignal.timeout(30000) });
  const t = await r.text();
  let j = {}; try { j = JSON.parse(t); } catch {}
  if (!r.ok) throw new Error(`${r.status} ${(j.error && (j.error.message || j.error)) || j.detail || j.message || t.slice(0, 200)}`);
  return j;
}
const form = (o) => new URLSearchParams(Object.entries(o).filter(([, v]) => v != null && v !== ''));
const abs = (u) => (u && u.startsWith('/') ? config.publicUrl + u : u || '');

// OAuth 1.0a for X (user context)
function xAuth(method, url) {
  const x = S().x, p = { oauth_consumer_key: x.key, oauth_nonce: crypto.randomBytes(16).toString('hex'), oauth_signature_method: 'HMAC-SHA1', oauth_timestamp: Math.floor(Date.now() / 1000), oauth_token: x.token, oauth_version: '1.0' };
  const enc = (s) => encodeURIComponent(s).replace(/[!'()*]/g, (c) => '%' + c.charCodeAt(0).toString(16).toUpperCase());
  const base = [method, enc(url), enc(Object.keys(p).sort().map((k) => `${enc(k)}=${enc(String(p[k]))}`).join('&'))].join('&');
  p.oauth_signature = crypto.createHmac('sha1', `${enc(x.secret)}&${enc(x.tokenSecret)}`).update(base).digest('base64');
  return 'OAuth ' + Object.keys(p).sort().map((k) => `${enc(k)}="${enc(String(p[k]))}"`).join(', ');
}

const ADAPTERS = {
  async facebook(p, text) {
    const { pageId, token } = S().facebook;
    if (p.image) return { id: (await call(`${graph()}/${pageId}/photos`, { method: 'POST', body: form({ url: abs(p.image), caption: text + (p.link ? '\n' + abs(p.link) : ''), access_token: token }) })).post_id };
    if (p.video) return { id: (await call(`${graph()}/${pageId}/videos`, { method: 'POST', body: form({ file_url: abs(p.video), description: text, access_token: token }) })).id };
    return { id: (await call(`${graph()}/${pageId}/feed`, { method: 'POST', body: form({ message: text, link: abs(p.link), access_token: token }) })).id };
  },
  async instagram(p, text) {
    const { userId, token } = S().instagram;
    if (!p.image && !p.video) throw new Error('Instagram needs a picture or a video');
    const c = await call(`${graph()}/${userId}/media`, { method: 'POST', body: form(p.video ? { media_type: 'REELS', video_url: abs(p.video), caption: text, access_token: token } : { image_url: abs(p.image), caption: text, access_token: token }) });
    // videos take a while to process: wait up to about 2 minutes
    for (let i = 0; p.video && i < 24; i++) { const s = await call(`${graph()}/${c.id}?fields=status_code&access_token=${encodeURIComponent(token)}`, {}); if (s.status_code === 'FINISHED') break; if (s.status_code === 'ERROR') throw new Error('Instagram could not process the video'); await new Promise((r) => setTimeout(r, 5000)); }
    return { id: (await call(`${graph()}/${userId}/media_publish`, { method: 'POST', body: form({ creation_id: c.id, access_token: token }) })).id };
  },
  async linkedin(p, text) {
    const { author, token } = S().linkedin;
    const body = { author, commentary: text, visibility: 'PUBLIC', distribution: { feedDistribution: 'MAIN_FEED', targetEntities: [], thirdPartyDistributionChannels: [] }, lifecycleState: 'PUBLISHED', isReshareDisabledByAuthor: false };
    if (p.link) body.content = { article: { source: abs(p.link), title: clean(p.title || text, 200) } };
    const r = await fetch('https://api.linkedin.com/rest/posts', { method: 'POST', headers: { Authorization: 'Bearer ' + token, 'Content-Type': 'application/json', 'LinkedIn-Version': S().linkedinVersion, 'X-Restli-Protocol-Version': '2.0.0' }, body: JSON.stringify(body), signal: AbortSignal.timeout(30000) });
    if (!r.ok) throw new Error(`${r.status} ${(await r.text()).slice(0, 200)}`);
    return { id: r.headers.get('x-restli-id') || '' };
  },
  async x(p, text) {
    const url = 'https://api.x.com/2/tweets';
    const t = (text + (p.link ? ' ' + abs(p.link) : '')).slice(0, 280);
    return { id: ((await call(url, { method: 'POST', headers: { Authorization: xAuth('POST', url), 'Content-Type': 'application/json' }, body: JSON.stringify({ text: t }) })).data || {}).id };
  },
  async webhook(p, text) {
    await call(S().webhook, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text, link: abs(p.link), image: abs(p.image), video: abs(p.video), platforms: p.platforms, perPlatform: p.perPlatform || {}, id: p._id }) });
    return { id: 'sent' };
  },
};

export async function publishPost(p) {
  const st = socialStatus(), results = { ...(p.results || {}) };
  await col('social_posts').updateOne({ _id: p._id }, { $set: { status: 'publishing' } });
  for (const pl of p.platforms || []) {
    if (results[pl] && results[pl].ok) continue;
    if (!st[pl]) { results[pl] = { ok: false, error: 'not connected', at: new Date() }; continue; }
    const text = (p.perPlatform && p.perPlatform[pl]) || p.text;
    try { const r = await ADAPTERS[pl](p, text); results[pl] = { ok: true, id: r.id || '', at: new Date() }; }
    catch (e) { results[pl] = { ok: false, error: String(e.message).slice(0, 300), at: new Date() }; }
  }
  const oks = Object.values(results).filter((r) => r.ok).length, all = (p.platforms || []).length;
  const status = oks === all ? 'posted' : oks ? 'partial' : 'failed';
  await col('social_posts').updateOne({ _id: p._id }, { $set: { results, status, posted: new Date() } });
  return { status, results };
}

/* ---- AI social media manager ------------------------------------------------------------------------------------ */
export async function autopilotDraft(req, cfg, days = 14) {
  if (!aiReady()) throw Object.assign(new Error('Add ANTHROPIC_API_KEY to switch on the AI social media manager.'), { status: 503 });
  const every = Math.max(1, +cfg.everyDays || 2), n = Math.max(1, Math.round(days / every));
  const platforms = (cfg.platforms && cfg.platforms.length ? cfg.platforms : PLATFORMS.filter((x) => x !== 'webhook'));
  const { data } = await aiWrite({ kind: 'social-plan', brief: `Plan ${n} posts for the next ${days} days, one every ${every} days, for ${platforms.join(', ')}. Themes to rotate: ${(cfg.themes || 'market research tips, our panels in 55 countries, Turn2Opinion / MyFrequentRewards / MyHealthOpinions sign-ups, Sampledge products, digital marketing, IT & development, accounts & finance, blog posts, case studies, careers').toString()}. Link each post to the most relevant page of frequentresearch.com (relative path like /blog or /portals/turn2opinion).`, platforms });
  const base = new Date(); base.setUTCHours((+cfg.hour || 11) - 5, 30, 0, 0); // India time
  const rows = (data.posts || []).slice(0, 60).map((x, i) => ({
    _id: newId('sp_'), text: [x.text, (x.hashtags || []).map((h) => (h.startsWith('#') ? h : '#' + h)).join(' ')].filter(Boolean).join('\n\n'), link: x.link || '', image: '', video: '', imageIdea: x.imageIdea || '', topic: x.topic || '',
    platforms: (x.platforms && x.platforms.length ? x.platforms : platforms).filter((p) => PLATFORMS.includes(p)), at: new Date(base.getTime() + Math.max(1, +x.day || (i + 1) * every) * 86400e3),
    status: cfg.approve === false ? 'scheduled' : 'approval', source: 'ai', created: new Date(),
  }));
  if (rows.length) await col('social_posts').insertMany(rows);
  if (req) await audit(req, 'social-autopilot', 'social', { drafted: rows.length });
  return rows.length;
}

let busy = false;
async function workSocial() {
  if (busy) return; busy = true;
  try {
    for (const p of await col('social_posts').find({ status: 'scheduled', at: { $lte: new Date() } }).limit(10).toArray()) await publishPost(p);
    const cfg = (await getContent('social-autopilot')) || {};
    if (cfg.on && aiReady()) {
      const ahead = await col('social_posts').countDocuments({ status: { $in: ['scheduled', 'approval'] }, at: { $gte: new Date() } });
      const last = cfg.lastRun ? +new Date(cfg.lastRun) : 0;
      if (ahead < 3 && Date.now() - last > 20 * 3600e3) {
        await col('content').updateOne({ _id: 'social-autopilot' }, { $set: { 'data.lastRun': new Date().toISOString() } });
        await autopilotDraft(null, cfg).catch((e) => console.error('[social] autopilot', e.message));
      }
    }
  } catch (e) { console.error('[social] worker', e.message); }
  busy = false;
}
export const startSocialWorker = () => { setInterval(workSocial, 60000).unref(); };

/* ---- admin -------------------------------------------------------------------------------------------------------- */
const out = ({ _id, ...p }) => ({ id: _id, ...p });
const postBody = (b) => {
  const o = { text: String(b.text || '').slice(0, 5000), link: clean(b.link, 500), image: clean(b.image, 1000), video: clean(b.video, 1000), title: clean(b.title, 200),
    platforms: (Array.isArray(b.platforms) ? b.platforms : []).filter((p) => PLATFORMS.includes(p)), perPlatform: {} };
  if (b.perPlatform && typeof b.perPlatform === 'object') for (const p of PLATFORMS) if (typeof b.perPlatform[p] === 'string' && b.perPlatform[p].trim()) o.perPlatform[p] = b.perPlatform[p].slice(0, 5000);
  if (b.at) { const d = new Date(b.at); if (!isNaN(d)) o.at = d; }
  return o;
};
socialRouter.get('/admin/social/status', requireAdmin, (req, res) => res.json({ ok: true, platforms: socialStatus(), ai: aiReady() }));
socialRouter.get('/admin/social/posts', requireAdmin, ah(async (req, res) => {
  const f = req.query.status ? { status: String(req.query.status) } : {};
  const rows = await col('social_posts').find(f).sort({ at: -1, created: -1 }).limit(300).toArray();
  res.json({ ok: true, posts: rows.map(out), platforms: socialStatus() });
}));
socialRouter.post('/admin/social/posts', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, o = postBody(b);
  if (!o.text.trim()) return res.status(400).json({ ok: false, error: 'Write the post' });
  if (!o.platforms.length) return res.status(400).json({ ok: false, error: 'Choose at least one platform' });
  const p = { _id: newId('sp_'), ...o, status: b.now ? 'publishing' : o.at ? 'scheduled' : 'draft', source: 'manual', created: new Date() };
  await col('social_posts').insertOne(p);
  await audit(req, 'social-' + (b.now ? 'post' : 'create'), p._id, { platforms: p.platforms });
  if (b.now) return res.json({ ok: true, id: p._id, ...(await publishPost(p)) });
  res.json({ ok: true, id: p._id });
}));
socialRouter.put('/admin/social/posts/:id', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, o = postBody(b);
  const set = { ...o, updated: new Date() };
  if (b.status && ['draft', 'scheduled', 'approval'].includes(b.status)) set.status = b.status;
  const r = await col('social_posts').updateOne({ _id: String(req.params.id), status: { $in: ['draft', 'scheduled', 'approval', 'failed', 'partial'] } }, { $set: set });
  if (!r.matchedCount) return res.status(409).json({ ok: false, error: 'A posted post cannot be changed' });
  res.json({ ok: true });
}));
socialRouter.post('/admin/social/posts/:id/approve', requireAdmin, ah(async (req, res) => {
  const r = await col('social_posts').updateOne({ _id: String(req.params.id), status: 'approval' }, { $set: { status: 'scheduled', approved: new Date() } });
  if (!r.matchedCount) return res.status(404).json({ ok: false });
  await audit(req, 'social-approve', req.params.id);
  res.json({ ok: true });
}));
socialRouter.post('/admin/social/posts/:id/publish', requireAdmin, ah(async (req, res) => {
  const p = await col('social_posts').findOne({ _id: String(req.params.id) });
  if (!p) return res.status(404).json({ ok: false });
  await audit(req, 'social-post', p._id, { platforms: p.platforms });
  res.json({ ok: true, ...(await publishPost(p)) });
}));
socialRouter.delete('/admin/social/posts/:id', requireAdmin, ah(async (req, res) => {
  await col('social_posts').deleteOne({ _id: String(req.params.id) });
  await audit(req, 'social-delete', req.params.id);
  res.json({ ok: true });
}));
socialRouter.get('/admin/social/autopilot', requireAdmin, ah(async (req, res) => res.json({ ok: true, autopilot: (await getContent('social-autopilot')) || { on: false, approve: true, everyDays: 2, hour: 11, platforms: [], themes: '' }, ai: aiReady() })));
socialRouter.put('/admin/social/autopilot', requireAdmin, ah(async (req, res) => {
  const b = req.body || {};
  const v = { on: !!b.on, approve: b.approve !== false, everyDays: Math.min(14, Math.max(1, +b.everyDays || 2)), hour: Math.min(22, Math.max(6, +b.hour || 11)), platforms: (b.platforms || []).filter((p) => PLATFORMS.includes(p)), themes: clean(b.themes, 1500), lastRun: b.lastRun || null };
  await putContent(req, 'social-autopilot', v);
  res.json({ ok: true });
}));
socialRouter.post('/admin/social/autopilot/run', requireAdmin, ah(async (req, res) => {
  const cfg = (await getContent('social-autopilot')) || {};
  try { res.json({ ok: true, drafted: await autopilotDraft(req, { ...cfg, ...(req.body || {}) }, +(req.body && req.body.days) || 14) }); }
  catch (e) { res.status(e.status || 500).json({ ok: false, error: e.message }); }
}));
