// Build 82.4: videos for the video web component. Run: npm test (needs MongoDB, like api.test.js).
import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';

process.env.WORKERS = '0';
const { connectDb, closeDb, dropDb } = await import('../src/db.js');
const { createApp } = await import('../src/app.js');
const { makeAdmin } = await import('./helpers.js');
let server, B, sup, viewer;
before(async () => {
  await connectDb(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017', 'fr_test824_' + process.pid);
  await new Promise((ok) => { server = createApp().listen(0, () => { B = `http://127.0.0.1:${server.address().port}`; ok(); }); });
  sup = await makeAdmin(B, { email: 'owner824@frequentresearch.com' });
  viewer = await makeAdmin(B, { email: 'viewer824@frequentresearch.com', role: 'viewer' });
});
after(async () => { server.close(); await dropDb(); await closeDb(); });

const req = (method, p, body, headers = {}) => fetch(B + p, { method, headers: { 'content-type': 'application/json', ...headers }, body: body === undefined ? undefined : JSON.stringify(body) });
const j = async (r) => (await r).json();

test('every website page is listed in the admin', async () => {
  const d = await j(req('GET', '/api/v1/admin/web-videos?limit=2000', undefined, sup.headers));
  assert.ok(d.pages >= 995, 'pages ' + d.pages);
  assert.ok(d.rows.some((r) => r.path === '/about-us'));
  assert.equal(d.withVideo, 0);
  assert.equal((await req('GET', '/api/v1/admin/web-videos')).status, 401);
});

test('custom fields, save, public read, hide, import, export, delete', async () => {
  // custom fields
  let r = await req('PUT', '/api/v1/admin/web-videos/settings', { settings: { templates: [{ id: 'card', label: 'Card' }, { id: 'hero', label: 'Hero' }], icons: [{ id: 'play', label: 'Play' }], fields: [{ key: 'ctaText', label: 'Button text', type: 'text' }, { key: 'autoplay', label: 'Autoplay', type: 'toggle' }, { key: 'url', label: 'x' }] } }, sup.headers);
  assert.equal(r.status, 400); // "url" is a standard field
  r = await req('PUT', '/api/v1/admin/web-videos/settings', { settings: { templates: [{ id: 'card', label: 'Card' }, { id: 'hero', label: 'Hero' }], icons: [{ id: 'play', label: 'Play' }], fields: [{ key: 'ctaText', label: 'Button text', type: 'text' }, { key: 'autoplay', label: 'Autoplay', type: 'toggle' }] } }, sup.headers);
  assert.equal(r.status, 200);
  // a viewer may look but not save
  assert.equal((await req('GET', '/api/v1/admin/web-videos/item?path=/about-us', undefined, viewer.headers)).status, 200);
  assert.equal((await req('PUT', '/api/v1/admin/web-videos/item?path=/about-us', { video: { url: 'https://youtu.be/x' } }, viewer.headers)).status, 403);
  // bad link refused
  assert.equal((await req('PUT', '/api/v1/admin/web-videos/item?path=/about-us', { video: { url: 'javascript:alert(1)' } }, sup.headers)).status, 400);
  // save
  r = await j(req('PUT', '/api/v1/admin/web-videos/item?path=https://www.frequentresearch.com/about-us/', { video: { url: 'https://www.youtube.com/watch?v=zMY_KjJ8j0s', title: 'About <b>us</b>', description: 'Who we are', template: 'card', icon: 'play' }, custom: { ctaText: 'Watch', autoplay: 'true' } }, sup.headers));
  assert.equal(r.ok, true);
  assert.equal(r.entry.path, '/about-us');
  // public
  const p = await fetch(B + '/api/v1/web-videos?page=/about-us');
  assert.equal(p.headers.get('access-control-allow-origin'), '*');
  const pv = await p.json();
  assert.equal(pv.video.url, 'https://www.youtube.com/watch?v=zMY_KjJ8j0s');
  assert.equal(pv.video.title, 'About us');
  assert.equal(pv.video.template, 'card');
  assert.deepEqual(pv.video.custom, { ctaText: 'Watch', autoplay: true });
  assert.equal((await j(fetch(B + '/api/v1/web-videos?page=/careers'))).video, null);
  assert.equal((await j(fetch(B + '/api/v1/web-videos'))).count, 1);
  const cfg = await j(fetch(B + '/api/v1/web-videos/config'));
  assert.equal(cfg.fields.length, 2);
  // switched off: hidden from the public
  await req('PUT', '/api/v1/admin/web-videos/item?path=/about-us', { video: { url: 'https://youtu.be/zMY_KjJ8j0s' }, enabled: false }, sup.headers);
  assert.equal((await j(fetch(B + '/api/v1/web-videos?page=/about-us'))).video, null);
  // import (rows from a CSV)
  const im = await j(req('POST', '/api/v1/admin/web-videos/import', { rows: [{ path: '/careers', url: 'https://youtu.be/DqoNpGmpcqc', title: 'Careers', template: 'hero', ctaText: 'Join us' }, { path: '/x', url: 'ftp://bad' }, { url: 'https://youtu.be/a' }] }, sup.headers));
  assert.equal(im.saved, 1);
  assert.equal(im.errors.length, 2);
  assert.equal((await j(fetch(B + '/api/v1/web-videos?page=/careers'))).video.custom.ctaText, 'Join us');
  // export
  const ex = await req('GET', '/api/v1/admin/web-videos/export', undefined, sup.headers);
  assert.equal(ex.status, 200);
  const csv = await ex.text();
  assert.match(csv.split('\n')[0], /path,pageTitle,url,title,description,template,icon,poster,enabled,ctaText,autoplay/);
  assert.match(csv, /DqoNpGmpcqc/);
  // a new page
  assert.equal((await j(req('POST', '/api/v1/admin/web-videos/pages', { pages: [{ path: '/new-landing', title: 'New landing' }, '/about-us'] }, sup.headers))).added, 1);
  assert.ok((await j(req('GET', '/api/v1/admin/web-videos?q=new-landing', undefined, sup.headers))).rows.some((x) => x.path === '/new-landing'));
  // delete
  await req('DELETE', '/api/v1/admin/web-videos/item?path=/careers', undefined, sup.headers);
  assert.equal((await j(fetch(B + '/api/v1/web-videos?page=/careers'))).video, null);
});

// Build 82.5: renamed to Page video component; every page has its own template; the ready-made player
test('page video component: new name, page templates, player, template changes', async () => {
  // the new name answers like the old one, with the page's own template
  const p = await fetch(B + '/api/v1/page-videos?page=/about-us');
  assert.equal(p.status, 200);
  const pv = await p.json();
  assert.ok(pv.template && pv.template.id === 'pv-about-us');
  for (const k of ['layout', 'frame', 'prop', 'scene', 'object', 'palette', 'headline', 'em', 'kicker', 'icons', 'flags', 'cta', 'link', 'chips', 'subscribe']) assert.ok(k in pv.template, k);
  // every page has a template, and no two pages share a design
  const all = await j(fetch(B + '/api/v1/page-videos/templates'));
  assert.ok(all.count >= 995);
  const keys = new Set(all.templates.map((t) => t.frame + '|' + t.prop + '|' + t.scene)); // build 82.6: frame, live card and scene
  assert.ok(all.templates.every((t) => /^showcase/.test(t.layout)), 'every page uses the showcase style');
  assert.equal(keys.size, all.count);
  // player and its pictures
  const js = await fetch(B + '/api/v1/page-videos/player.js');
  assert.equal(js.status, 200);
  assert.match(js.headers.get('content-type'), /javascript/);
  assert.match(await js.text(), /customElements\.define\('fr-page-video'/);
  assert.equal((await fetch(B + '/api/v1/page-videos/flags.webp')).headers.get('content-type'), 'image/webp');
  assert.equal((await fetch(B + '/api/v1/web-videos/world-dots.webp')).status, 200);
  // config lists the design options
  const cfg = await j(fetch(B + '/api/v1/page-videos/config'));
  assert.equal(cfg.design.layouts.length, 14);
  assert.equal(cfg.design.frames.length, 17);
  assert.ok(cfg.design.props.length >= 15);
  assert.ok(cfg.templates.some((t) => t.id === 'page'));
  // admin: list, change, refuse bad values, viewer may not change, back to generated
  const list = await j(req('GET', '/api/v1/admin/page-videos/templates?q=about-us', undefined, sup.headers));
  assert.ok(list.rows.some((r) => r.page === '/about-us'));
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { layout: 'orbit' }, viewer.headers)).status, 403);
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { layout: 'nope' }, sup.headers)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { palette: { accent: 'red' } }, sup.headers)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { flags: ['XX'] }, sup.headers)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { image: 'javascript:alert(1)' }, sup.headers)).status, 400);
  const ch = await j(req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { layout: 'orbit', headline: 'Who <b>we</b> are', icons: ['users', 'globe'], flags: ['in', 'GB'], palette: { accent: '#ff5500' } }, sup.headers));
  assert.equal(ch.ok, true);
  assert.equal(ch.template.headline, 'Who we are');
  const after = (await j(fetch(B + '/api/v1/page-videos?page=/about-us'))).template;
  assert.equal(after.layout, 'orbit'); assert.equal(after.palette.accent, '#ff5500'); assert.deepEqual(after.flags, ['IN', 'GB']); assert.equal(after.edited, true);
  const item = await j(req('GET', '/api/v1/admin/page-videos/templates/item?path=/about-us', undefined, sup.headers));
  assert.deepEqual(Object.keys(item.changes).sort(), ['flags', 'headline', 'icons', 'layout', 'palette']);
  // build 82.6 fields: frame, live card, italic line, button, tags, subscribe
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { frame: 'nope' }, sup.headers)).status, 400);
  assert.equal((await req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { link: { label: 'Go', to: 'javascript:x' } }, sup.headers)).status, 400);
  const c2 = await j(req('PUT', '/api/v1/admin/page-videos/templates/item?path=/about-us', { frame: 'ticket', prop: 'stars', em: 'Get rewarded.', subline: 'A line', chips: ['Free to join', '55 markets'], subscribe: false, link: { label: 'Join now', to: '/lets-talk' } }, sup.headers));
  assert.equal(c2.ok, true);
  const t2 = (await j(fetch(B + '/api/v1/page-videos?page=/about-us'))).template;
  assert.equal(t2.frame, 'ticket'); assert.equal(t2.prop, 'stars'); assert.equal(t2.em, 'Get rewarded.'); assert.equal(t2.subline, 'A line');
  assert.deepEqual(t2.chips, ['Free to join', '55 markets']); assert.equal(t2.subscribe, false); assert.deepEqual(t2.link, { label: 'Join now', to: '/lets-talk' });
  await req('DELETE', '/api/v1/admin/page-videos/templates/item?path=/about-us', undefined, sup.headers);
  assert.notEqual((await j(fetch(B + '/api/v1/page-videos?page=/about-us'))).template.edited, true);
  // a page added in the admin gets a template of its own at once
  await req('POST', '/api/v1/admin/page-videos/pages', { pages: [{ path: '/campaign-2027', title: 'Campaign 2027' }] }, sup.headers);
  const nt = (await j(fetch(B + '/api/v1/page-videos?page=/campaign-2027'))).template;
  assert.equal(nt.id, 'pv-campaign-2027');
  assert.ok(!keys.has(nt.layout + '|' + nt.scene + '|' + nt.object));
  // a video saved without a template uses the page's own design
  const sv = await j(req('PUT', '/api/v1/admin/page-videos/item?path=/careers', { video: { url: 'https://youtu.be/DqoNpGmpcqc' } }, sup.headers));
  assert.equal(sv.entry.video.template, 'page');
});

test('the super admin preview uses the same player as the website', async () => {
  const { readFileSync, existsSync } = await import('node:fs');
  const site = new URL('../src/public/fr-page-video.js', import.meta.url), admin = new URL('../../frontend/src/admin/pagevideo-player.js', import.meta.url);
  if (!existsSync(admin)) return; // backend shipped on its own
  assert.equal(readFileSync(admin, 'utf8'), readFileSync(site, 'utf8'), 'copy backend/src/public/fr-page-video.js to frontend/src/admin/pagevideo-player.js');
});
