// Build 82.9 (Kunal, 21 Nov: "full SEO optimization with AI catalogs"): machine-readable catalogs for AI search
// assistants and search engines, made from the finished pages in dist (run after seo-pass.cjs, before compress.cjs).
//
//   /catalog.json      every service (by team), Sampledge product and research panel: name, address, description
//   /llms-full.txt     the readable text of every page (llms.txt standard, long form); llms.txt links to it
//   /robots.txt        AI search and assistant robots named and allowed (GPTBot, OAI-SearchBot, ChatGPT-User,
//                      ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended, …), the
//                      catalogs listed; /api and /admin stay closed
//   structured data    an OfferCatalog (schema.org) of the services on home, All services and each team page, and of
//                      the products on the Products page, linked to the Organization (@id …/#organization)
// Safe to run more than once (it replaces what it added before).
// Usage: node scripts/ai-catalog.cjs [dist] [--origin https://www.frequentresearch.com]
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2);
const dist = path.resolve(args.find((a) => !a.startsWith('--') && args[args.indexOf(a) - 1] !== '--origin') || 'dist');
const ORIGIN = (args.includes('--origin') ? args[args.indexOf('--origin') + 1] : 'https://www.frequentresearch.com').replace(/\/$/, '');
const ORG_ID = ORIGIN + '/#organization';
const TODAY = new Date().toISOString().slice(0, 10);

const decode = (s) => String(s).replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n)).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16))).replace(/&amp;/g, '&');
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? (e.name === 'admin' || e.name === 'assets' ? [] : walk(path.join(d, e.name))) : [path.join(d, e.name)]));
const ldTag = (o) => `<script type="application/ld+json" data-fr-ai="catalog">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`;
const name = (t) => decode(t).replace(/\s*[|–—]\s*Frequent Research.*$/i, '').replace(/\s+\|\s+.*$/, '').trim();

// ---------- read every page ----------
const pages = new Map();
for (const f of walk(dist)) {
  if (!f.endsWith('index.html')) continue;
  const rel = path.relative(dist, path.dirname(f)).split(path.sep).join('/');
  const route = rel ? '/' + rel : '/';
  const html = fs.readFileSync(f, 'utf8');
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const i = html.indexOf('<div class="prerender"');
  let text = '';
  if (i >= 0) {
    // the readable copy of the page made by prerender.cjs: headings and paragraphs become lines of text
    const body = html.slice(i, html.indexOf('</body>', i) > 0 ? html.indexOf('</body>', i) : undefined);
    text = decode(body.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '')
      .replace(/<h([1-6])[^>]*>/g, (_, n) => '\n\n' + '#'.repeat(Math.min(6, +n + 1)) + ' ')
      .replace(/<li[^>]*>/g, '\n- ').replace(/<(p|div|section|article|tr|br)[^>]*>/g, '\n').replace(/<[^>]+>/g, ' '))
      .replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  }
  pages.set(route, { route, file: f, title: decode(title), name: name(title), desc: decode(desc), text });
}
if (!pages.size) throw new Error('ai-catalog: no pages in ' + dist);

// ---------- the catalog ----------
const url = (r) => ORIGIN + (r === '/' ? '/' : r);
const item = (p) => ({ name: p.name, url: url(p.route), description: p.desc });
const under = (base, depth) => [...pages.values()].filter((p) => p.route.startsWith(base + '/') && p.route.split('/').length === depth).sort((a, b) => a.route.localeCompare(b.route));
const teams = under('/services', 3).map((v) => ({ ...item(v), services: under(v.route, 4).map(item) }));
const seenP = new Set();
const products = under('/products', 3).map(item).sort((a, b) => a.url.length - b.url.length).filter((p) => !seenP.has(p.name) && seenP.add(p.name)).sort((a, b) => a.url.localeCompare(b.url)); // one entry per product (an old address can show the same product)
const panels = under('/portals', 3).map(item);
const catalog = {
  '@about': 'Machine-readable catalog of Frequent Research services, products and research panels. Made from the website pages.',
  organization: { name: 'Frequent Research', legalName: 'Fieldwork Solutions Pvt. Ltd.', url: ORIGIN + '/', email: 'info@frequentresearch.com', telephone: '+91-81782-00573', address: 'Mangolpur Kalan, New Delhi 110085, India', llms: ORIGIN + '/llms.txt' },
  updated: TODAY,
  teams, products, panels,
  counts: { teams: teams.length, services: teams.reduce((n, t) => n + t.services.length, 0), products: products.length, panels: panels.length },
};
fs.writeFileSync(path.join(dist, 'catalog.json'), JSON.stringify(catalog, null, 1));

// ---------- schema.org OfferCatalog on the overview pages ----------
const offer = (s, type) => ({ '@type': 'Offer', itemOffered: { '@type': type, name: s.name, url: s.url, description: s.description, ...(type === 'Service' ? { provider: { '@id': ORG_ID }, areaServed: 'Worldwide' } : { brand: { '@type': 'Brand', name: 'Sampledge' } }) } });
const teamCat = (t) => ({ '@type': 'OfferCatalog', name: t.name, url: t.url, itemListElement: t.services.map((s) => offer(s, 'Service')) });
const allCat = { '@context': 'https://schema.org', '@type': 'OfferCatalog', '@id': ORIGIN + '/#catalog', name: 'Frequent Research services', url: ORIGIN + '/services', provider: { '@id': ORG_ID }, itemListElement: teams.map(teamCat) };
const prodCat = { '@context': 'https://schema.org', '@type': 'OfferCatalog', '@id': ORIGIN + '/products#catalog', name: 'Sampledge products', url: ORIGIN + '/products', provider: { '@id': ORG_ID }, itemListElement: products.map((p) => offer(p, 'SoftwareApplication')) };
const add = (route, obj) => {
  const p = pages.get(route); if (!p) return;
  let h = fs.readFileSync(p.file, 'utf8').replace(/<script type="application\/ld\+json" data-fr-ai="catalog">[\s\S]*?<\/script>\n?/g, '');
  h = h.replace('</head>', ldTag(obj) + '\n</head>');
  fs.writeFileSync(p.file, h);
};
add('/', allCat);
add('/services', allCat);
for (const t of teams) add(new URL(t.url).pathname, { '@context': 'https://schema.org', ...teamCat(t), provider: { '@id': ORG_ID } });
add('/products', prodCat);

// ---------- llms-full.txt and the links in llms.txt ----------
// lines repeated on many pages (menu, footer, buttons) are left out, so each page keeps only its own text
const freq = new Map();
for (const p of pages.values()) for (const ln of new Set(p.text.split('\n'))) freq.set(ln, (freq.get(ln) || 0) + 1);
const common = (ln) => ln.length > 0 && freq.get(ln) > Math.max(20, pages.size * 0.05);
for (const p of pages.values()) p.text = p.text.split('\n').filter((ln) => !common(ln)).join('\n').replace(/\n{3,}/g, '\n\n').trim();
const order = [...pages.values()].sort((a, b) => (a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route)));
const full = ['# Frequent Research: full text of the website', '', `> Every page of ${ORIGIN}, as plain text, for AI assistants and search tools. Updated ${TODAY}. Short index: ${ORIGIN}/llms.txt. Service catalog: ${ORIGIN}/catalog.json`, '']
  .concat(order.filter((p) => p.text).map((p) => `\n---\n\n## ${p.name}\n\nURL: ${url(p.route)}\n${p.desc ? 'Summary: ' + p.desc + '\n' : ''}\n${p.text.replace(/^#\s/gm, '### ')}\n`));
fs.writeFileSync(path.join(dist, 'llms-full.txt'), full.join('\n'));
const lp = path.join(dist, 'llms.txt');
if (fs.existsSync(lp)) {
  let l = fs.readFileSync(lp, 'utf8').replace(/\n## AI catalogs\n[\s\S]*?(?=\n## |$)/, '');
  l = l.trimEnd() + `\n\n## AI catalogs\n\n- [Full text of every page](${ORIGIN}/llms-full.txt): the whole website as plain text\n- [Service and product catalog](${ORIGIN}/catalog.json): ${catalog.counts.services} services in ${catalog.counts.teams} teams, ${catalog.counts.products} products, ${catalog.counts.panels} research panels (JSON)\n- [Sitemap](${ORIGIN}/sitemap.xml)\n`;
  fs.writeFileSync(lp, l);
}

// ---------- robots.txt: AI robots named and allowed ----------
const AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'PerplexityBot', 'Perplexity-User', 'Google-Extended', 'Applebot-Extended', 'Applebot', 'Bingbot', 'Googlebot', 'meta-externalagent', 'Amazonbot', 'DuckAssistBot', 'MistralAI-User', 'cohere-ai'];
const rp = path.join(dist, 'robots.txt');
let r = fs.existsSync(rp) ? fs.readFileSync(rp, 'utf8') : 'User-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n';
r = r.replace(/\n# AI search and assistants[\s\S]*?# end AI\n/, '\n');
const sm = (r.match(/^Sitemap:.*$/m) || ['Sitemap: ' + ORIGIN + '/sitemap.xml'])[0];
r = r.replace(/^Sitemap:.*\n?/m, '').trimEnd();
r += `\n\n# AI search and assistants: welcome to read the public pages (build 82.9)\n${AI_BOTS.map((b) => `User-agent: ${b}`).join('\n')}\nAllow: /\nDisallow: /api/\nDisallow: /admin\n# AI catalogs: ${ORIGIN}/llms.txt  ${ORIGIN}/llms-full.txt  ${ORIGIN}/catalog.json\n# end AI\n\n${sm}\n`;
fs.writeFileSync(rp, r);

console.log(`ai-catalog: ${pages.size} pages, ${catalog.counts.services} services in ${catalog.counts.teams} teams, ${products.length} products, ${panels.length} panels; llms-full.txt ${(fs.statSync(path.join(dist, 'llms-full.txt')).size / 1048576).toFixed(1)} MB`);
