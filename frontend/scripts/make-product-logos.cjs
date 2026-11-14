// Build 68: writes src/data/SampledgeLogos65.jsx from the product sites' own logo files (src/products/<id>/assets/brand).
// Usage: node scripts/make-product-logos.cjs
// Every id, class and keyframe name inside each SVG gets a per-logo prefix, and every style rule is scoped to that logo,
// so seven animated logos can sit on one page without touching each other or the rest of the site.
//   logo  full lock-up for light backgrounds    dark  full lock-up for dark backgrounds    mark  the icon alone
const fs = require('fs'), path = require('path');
const postcss = require('postcss');
const root = path.join(__dirname, '..');
const P = path.join(root, 'src/products');
const FILES = {
  sampcode: { logo: 'sampcode-logo-light.svg', dark: 'sampcode-logo-dark.svg', mark: 'sampcode-icon.svg' },
  sampbidx: { logo: 'sampbidx-logo-light.svg', dark: 'sampbidx-logo-dark.svg', mark: 'sampbidx-icon.svg' },
  samptrek: { logo: 'samptrek-logo-light.svg', dark: 'samptrek-logo-dark.svg', mark: 'samptrek-icon.svg' },
  sampaudience: { logo: 'sampaudience-logo-on-light.svg', dark: 'sampaudience-logo-on-dark.svg', mark: 'sampaudience-icon.svg' },
  sampforce: { logo: 'sampforce-logo-light.svg', dark: 'sampforce-logo-dark.svg', mark: 'sampforce-icon.svg' },
  // Talk2Tax supplied only the on-dark lock-up: the light one swaps the word colours the way the other products do
  talk2tax: { logo: 'talk2tax-logo-on-dark.svg', dark: 'talk2tax-logo-on-dark.svg', mark: 'talk2tax-icon.svg', lightFrom: true },
  sampcrew: { logo: 'sampcrew-logo-light.svg', dark: 'sampcrew-logo-dark.svg', mark: 'sampcrew-icon.svg' },
};
const toLight = (s) => s.replace(/(<linearGradient id="wfx"[^>]*>)<stop offset="0" stop-color="#5EEAD4"><\/stop><stop offset="1" stop-color="#0EA5E9"><\/stop>/, '$1<stop offset="0" stop-color="#0EA5E9"></stop><stop offset="1" stop-color="#1D4ED8"></stop>').replace(/fill="#FFFFFF"/g, 'fill="#0F1B4C"').replace(/fill="#CBD5E1"/g, 'fill="#475569"').replace(/fill="#94A3B8"/g, 'fill="#64748B"');

function scope(svg, ns) {
  svg = svg.replace(/<\?xml[^>]*>\s*/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<title>[\s\S]*?<\/title>/g, '').trim();
  const ids = new Set([...svg.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
  const classes = new Set();
  for (const m of svg.matchAll(/\sclass="([^"]+)"/g)) m[1].split(/\s+/).filter(Boolean).forEach((c) => classes.add(c));
  const frames = new Set();
  // styles
  svg = svg.replace(/<style([^>]*)>([\s\S]*?)<\/style>/g, (all, attrs, css) => {
    const ast = postcss.parse(css);
    ast.walkAtRules(/keyframes$/i, (r) => { frames.add(r.params.trim()); });
    ast.walkRules((rule) => {
      const p = rule.parent;
      if (p && p.type === 'atrule' && /keyframes$/i.test(p.name)) return;
      rule.selector = rule.selector
        .split(',')
        .map((sel) => {
          sel = sel.trim().replace(/\.([A-Za-z_][\w-]*)/g, (m, c) => (classes.add(c), '.' + ns + '-' + c)).replace(/#([A-Za-z_][\w-]*)/g, (m, i) => (ids.has(i) ? '#' + ns + '-' + i : m));
          return /^svg\b/.test(sel) ? sel.replace(/^svg/, 'svg.' + ns) : '.' + ns + ' ' + sel;
        })
        .join(',');
    });
    ast.walkAtRules(/keyframes$/i, (r) => { r.params = ns + '-' + r.params.trim(); });
    ast.walkDecls(/^(animation|animation-name)$/i, (d) => {
      d.value = d.value.replace(/[A-Za-z_][\w-]*/g, (w) => (frames.has(w) ? ns + '-' + w : w));
    });
    ast.walkDecls((d) => { d.value = d.value.replace(/url\(#([^)]+)\)/g, (m, i) => (ids.has(i) ? 'url(#' + ns + '-' + i + ')' : m)); });
    return '<style' + attrs + '>' + ast.toString().replace(/\s*\n\s*/g, '') + '</style>';
  });
  svg = svg.replace(/(\s)id="([^"]+)"/g, (m, sp, i) => sp + 'id="' + ns + '-' + i + '"');
  svg = svg.replace(/url\(#([^)]+)\)/g, (m, i) => (ids.has(i) ? 'url(#' + ns + '-' + i + ')' : m));
  svg = svg.replace(/((?:xlink:)?href)="#([^"]+)"/g, (m, a, i) => (ids.has(i) ? a + '="#' + ns + '-' + i + '"' : m));
  svg = svg.replace(/(\s)class="([^"]+)"/g, (m, sp, v) => sp + 'class="' + v.split(/\s+/).filter(Boolean).map((c) => ns + '-' + c).join(' ') + '"');
  // root element: our class, no fixed size, hidden from assistive tech (the wrapper carries the name)
  svg = svg.replace(/^<svg\b([^>]*)>/, (m, a) => {
    a = a.replace(/\s(width|height|role|aria-label|aria-hidden|focusable)="[^"]*"/g, '');
    if (/\sclass="/.test(a)) a = a.replace(/\sclass="([^"]*)"/, (mm, v) => ' class="' + ns + ' ' + v + '"');
    else a = ' class="' + ns + '"' + a;
    return '<svg' + a + ' aria-hidden="true" focusable="false">';
  });
  return svg;
}

const out = {};
for (const [id, f] of Object.entries(FILES)) {
  const dir = path.join(P, id, 'assets/brand');
  const read = (n) => fs.readFileSync(path.join(dir, n), 'utf8');
  out[id] = {
    logo: scope(f.lightFrom ? toLight(read(f.logo)) : read(f.logo), 'sxl-' + id + '-l'),
    dark: scope(read(f.dark), 'sxl-' + id + '-d'),
    mark: scope(read(f.mark), 'sxl-' + id + '-m'),
  };
}
const file = path.join(root, 'src/data/SampledgeLogos65.jsx');
fs.writeFileSync(file, `/*
 * Sampledge product logos (build 68). Prefix PR5_LOGO. Made by scripts/make-product-logos.cjs from each product site's own
 * logo files (src/products/<id>/assets/brand); every id, class and animation inside a logo carries that logo's prefix.
 */
const PR5_LOGOS = ${JSON.stringify(out)};

export { PR5_LOGOS };
`);
console.log('logos written', file, Object.keys(out).join(', '), (fs.statSync(file).size / 1024).toFixed(0) + ' KB');
