// One-file SUPER ADMIN DEMO: the offline preview (make-preview.cjs) with a pretend backend (admin-demo-mock.js) that
// opens the admin panel with sample data. For showing the panel only; it never talks to a server.
// Usage (after make-preview.cjs): node scripts/make-admin-demo.cjs [dist-preview/frequent-research-preview.html] [out]
const fs = require('fs'), path = require('path');
const src = process.argv[2] || path.join(__dirname, '../dist-preview/frequent-research-preview.html');
const out = process.argv[3] || path.join(__dirname, '../dist-preview/frequent-research-admin-demo.html');
let html = fs.readFileSync(src, 'utf8');
(async () => {
// build 78: the email templates, designs and automations the backend ships with, and a ready-made preview of each
let demoMail = { templates: [], designs: [], automations: [], previews: {} };
try {
  const { pathToFileURL } = require('url');
  const tpl = await import(pathToFileURL(path.join(__dirname, '../../backend/src/lib/mailtpl.js')).href);
  let autos = [];
  try { autos = (await import(pathToFileURL(path.join(__dirname, '../../backend/src/routes/marketing.js')).href)).BUILTIN_AUTOMATIONS; } catch (e) { console.warn('automations not included:', e.message); }
  const vars = { name: 'Kunal Sharma', first: 'Kunal', email: 'kunal@example.com', company: 'Example Ltd', service: 'Consumer panel research', resource: 'India Consumer Panel Book', title: 'Sample case study', page: '/lets-talk', message: 'We need 1,000 completes in India.', unsubscribe: '#unsubscribe' };
  const previews = {};
  for (const t of tpl.BUILTIN_TEMPLATES) { const r = tpl.renderTemplate(t, vars, {}); previews[t.id] = { subject: r.subject, html: r.html }; }
  demoMail = { templates: tpl.BUILTIN_TEMPLATES, designs: tpl.DESIGNS, automations: autos, previews };
} catch (e) { console.warn('email templates not included in the demo:', e.message); }
// build 78.1: every page's content (scripts/site-index.cjs, written by `npm run release` into dist/data), so
// "Pages & sections" shows it offline too
const dataDir = process.env.FR_SITE_INDEX_DIR || path.join(__dirname, '../dist/data'); // FR_SITE_INDEX_DIR: a data/ folder from a deploy build
const idxDir = path.join(dataDir, 'site-index'), idxList = path.join(dataDir, 'site-index.json');
let siteIndex = null;
if (fs.existsSync(idxList)) {
  siteIndex = { list: JSON.parse(fs.readFileSync(idxList, 'utf8')), files: {} };
  for (const f of fs.readdirSync(idxDir)) if (f.endsWith('.json')) siteIndex.files[f] = JSON.parse(fs.readFileSync(path.join(idxDir, f), 'utf8'));
} else console.warn('admin demo: no dist/data/site-index.json (run npm run release first); Pages & sections will not list page content');
// build 82: sample client & vendor onboarding records and both form set-ups
const obFile = path.join(__dirname, 'admin-demo-onboarding.json');
const demoOb = fs.existsSync(obFile) ? fs.readFileSync(obFile, 'utf8') : '{"forms":{},"records":[]}';
// build 82.5: every page's own video design and the pictures the player uses
let demoPv = { templates: {}, options: {} }, pvFiles = {};
try {
  const { pathToFileURL } = require('url');
  const pt = await import(pathToFileURL(path.join(__dirname, '../../backend/src/lib/pageTemplates.js')).href);
  const lab = (a) => a.map(([id, label]) => ({ id, label }));
  demoPv = { templates: JSON.parse(fs.readFileSync(path.join(__dirname, '../../backend/src/data/page-video-templates.json'), 'utf8')).templates, options: { layouts: lab(pt.LAYOUTS), scenes: lab(pt.SCENES), objects: lab(pt.OBJECTS), frames: lab(pt.FRAMES), props: lab(pt.PROPS), icons: pt.ICONS, motions: pt.MOTIONS } };
  const pub = path.join(__dirname, '../../backend/src/public');
  pvFiles = { 'flags.webp': 'data:image/webp;base64,' + fs.readFileSync(path.join(pub, 'flags-sprite.webp')).toString('base64'), 'world-dots.webp': 'data:image/webp;base64,' + fs.readFileSync(path.join(pub, 'world-dots.webp')).toString('base64') };
} catch (e) { console.warn('page video designs not included in the demo:', e.message); }
const mock = ('window.__FR_PV=' + JSON.stringify(demoPv) + ';\nwindow.FR_PAGE_VIDEO_FILES=' + JSON.stringify(pvFiles) + ';\n' + 'window.__FR_DEMO_OB=' + demoOb + ';\n' + 'window.__FR_DEMO_MAIL=' + JSON.stringify(demoMail) + ';\n' + (siteIndex ? 'window.__FR_SITE_INDEX=' + JSON.stringify(siteIndex) + ';\n' : '') + fs.readFileSync(path.join(__dirname, 'admin-demo-mock.js'), 'utf8')).replace(/<\/script/gi, '<\\/script');
const i = html.indexOf('<head>');
if (i < 0) throw new Error('no <head> in ' + src);
html = html.slice(0, i + 6) + '\n<script>' + mock + '</script>\n' + html.slice(i + 6);
// the admin logo: a file on the server, inlined here
const ico = 'data:image/png;base64,' + fs.readFileSync(path.join(__dirname, '../public/favicon.png')).toString('base64');
html = html.split('src:`/favicon.png`').join('src:`' + ico + '`');
html = html.replace(/<title>[^<]*<\/title>/, '<title>Admin demo | Frequent Research</title>');
fs.writeFileSync(out, html);
console.log('admin demo written', out, (html.length / 1048576).toFixed(2) + 'MB');
})();
