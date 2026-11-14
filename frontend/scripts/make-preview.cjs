// Single-file OFFLINE PREVIEW: one HTML file that opens by double-click (file://), for review only.
// Not for production: deploy the frontend container (or the dist folder) instead.
// Usage (after `npm run build`): node scripts/make-preview.cjs [dist] [dist-preview/frequent-research-preview.html]
//
// Inlines the built JavaScript, stylesheet and every /assets file, embeds public/data and the language files, and adds
// a tiny fetch shim that answers /data/… from the embedded copy. API calls (/api/…) are left alone: with no backend the
// forms use their built-in preview behaviour (nothing is sent) and the CAPTCHA its browser-only mode.
// FR_PREVIEW_TODAY=YYYY-MM-DD shows the celebration banner of that day.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const dist = path.resolve(process.argv[2] || path.join(root, 'dist'));
const out = path.resolve(process.argv[3] || path.join(root, 'dist-preview/frequent-research-preview.html'));
const shell = fs.existsSync(path.join(dist, '.shell.html')) ? path.join(dist, '.shell.html') : path.join(dist, 'index.html');
let html = fs.readFileSync(shell, 'utf8');

const MIME = { '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.gif': 'image/gif', '.css': 'text/css', '.mp4': 'video/mp4', '.woff2': 'font/woff2' };
const uri = (f) => 'data:' + MIME[path.extname(f)] + ';base64,' + fs.readFileSync(f).toString('base64');
const assets = (text) => text.replace(/\/(assets|media)\/[A-Za-z0-9._\/-]+\.(webp|png|jpe?g|svg|gif|css|mp4|woff2)/g, (m) => { const f = path.join(dist, m); return fs.existsSync(f) ? uri(f) : m; });

// runtime data and language files
const files = {};
(function walk(d, rel) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f), r = rel ? rel + '/' + f : f;
    if (fs.statSync(p).isDirectory()) walk(p, r);
    else if (f.endsWith('.json')) files['data/' + r] = JSON.parse(fs.readFileSync(p, 'utf8'));
  }
})(path.join(dist, 'data'), '');
const i18n = {};
for (const f of fs.readdirSync(path.join(dist, 'i18n'))) { const m = /^([A-Za-z-]+)\.[0-9a-f]{10}\.json$/.exec(f); if (m) i18n[m[1]] = JSON.parse(fs.readFileSync(path.join(dist, 'i18n', f), 'utf8')); }
const safe = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const today = /^\d{4}-\d{2}-\d{2}$/.test(process.env.FR_PREVIEW_TODAY || '') ? `\nwindow.__FR_TODAY=${JSON.stringify(process.env.FR_PREVIEW_TODAY)};` : '';
const shim = `<script>/* offline preview: answers /data/... from embedded copies (scripts/make-preview.cjs) */
window.__FR_PREVIEW_DATA=${safe(files)};
window.__FRI_INLINE=${safe(i18n)};${today}
(function(){var D=window.__FR_PREVIEW_DATA,f=window.fetch;window.fetch=function(u,o){var s=typeof u==="string"?u:(u&&u.url)||"";var m=/(?:^|\\/)(data\\/[^?#]+\\.json)/.exec(s);if(m&&D[m[1]])return Promise.resolve(new Response(JSON.stringify(D[m[1]]),{status:200,headers:{"Content-Type":"application/json"}}));return f.apply(this,arguments)}})();
</script>
`;

// built stylesheet and script, inlined
html = html.replace(/<link rel="stylesheet" crossorigin href="([^"]+)"\s*\/?>/g, (m, href) => `<style>${assets(fs.readFileSync(path.join(dist, href), 'utf8'))}</style>`);
html = html.replace(/<link rel="modulepreload"[^>]*>/g, '');
let js = '';
const inline = (m, src) => { js = assets(fs.readFileSync(path.join(dist, src), 'utf8')).replace(/<\/script/gi, '<\\/script'); return '<!--app-->'; };
html = html.replace(/<script type="module" crossorigin src="([^"]+)"><\/script>/, inline);
// build 67: the cms loader (vite/fr-site.js) starts the app script; the preview has no API, so it runs at once
html = html.replace(/<script id="fr-cms">\/\* cms loader \*\/\(function\(\)\{var S="([^"]+)"[\s\S]*?<\/script>/, inline);
if (!js) throw new Error('app script not found in ' + shell);
html = html.replace('<!--app-->', () => shim + '<script type="module">' + js + '</script>');
html = html.replace(/window\.__FR_DARK="([^"]+)"/, (m, href) => `window.__FR_DARK=${JSON.stringify(uri(path.join(dist, href)))}`);
html = html.replace(/href="\/favicon\.png"/, () => `href="${uri(path.join(dist, 'favicon.png'))}"`);
// the old-link boot script is for real servers only (the preview, opened from file://, uses #/ addresses: app/nav.jsx)
html = html.replace(/<script>\/\* old #\/ addresses[\s\S]*?<\/script>/, '');
html = assets(html);
html = html.replace('<head>', '<head>\n<meta name="robots" content="noindex" /><!-- offline preview copy -->');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log('preview written', out, (html.length / 1048576).toFixed(2) + 'MB', Object.keys(files).length + ' data files embedded');
