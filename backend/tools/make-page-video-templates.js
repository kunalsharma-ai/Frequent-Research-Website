// Build 82.5: makes src/data/page-video-templates.json, one video template of its own for every page of the website.
// Usage (from backend/): node tools/make-page-video-templates.js ../frontend/dist
// Reads the build's page index (dist/data/site-index.json + site-index/*.json: every section's title and texts) and
// src/data/site-pages.json, takes each page's own words (headline, line under it, description, key points, a number,
// countries) and lets makeTemplate() (src/lib/pageTemplates.js) choose a design of its own for it.
// Run it again after many new pages; pages added in the admin get a template on the fly.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { makeTemplate, contrast, statOf } from '../src/lib/pageTemplates.js';

const dist = process.argv[2] || '../frontend/dist';
const pages = JSON.parse(readFileSync(new URL('../src/data/site-pages.json', import.meta.url), 'utf8'));
const COUNTRIES = JSON.parse(readFileSync(new URL('../src/data/countries.json', import.meta.url), 'utf8'));
const idxFile = join(dist, 'data', 'site-index.json');
if (!existsSync(idxFile)) { console.error('No ' + idxFile + ': build the website first (npm run release in frontend/).'); process.exit(1); }
const idx = JSON.parse(readFileSync(idxFile, 'utf8'));
const byPath = new Map(idx.pages.map((p) => [p.path, p]));

const N = (s) => String(s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
const words = (s) => String(s || '').trim().split(/\s+/).filter(Boolean);
const emojiStrip = (s) => String(s || '').replace(/[\p{Extended_Pictographic}\u{FE0F}\u{200D}]/gu, '').replace(/\s+/g, ' ').trim();
const halves = (s) => { const w = words(s); if (w.length % 2 === 0 && w.length) { const a = w.slice(0, w.length / 2).join(' '), b = w.slice(w.length / 2).join(' '); if (N(a) === N(b)) return a; } return s; };
const ALIAS = { uae: 'AE', usa: 'US', us: 'US', uk: 'GB', 'united kingdom': 'GB', 'united states': 'US', ksa: 'SA', 'saudi arabia': 'SA', 'south korea': 'KR', korea: 'KR', russia: 'RU', vietnam: 'VN', 'hong kong': 'HK', 'the netherlands': 'NL', europe: '' };
const CTA = /^(request|book|whatsapp|get |talk|start|contact|download|discuss|join|see |watch|explore|meet|view|read|share|apply|sign|call|send|try|learn more|researchers:)/i;
const LINE_OF = { 'market research': 'mr', research: 'mr', 'digital marketing': 'dm', marketing: 'dm', 'it & development': 'it', 'it and development': 'it', technology: 'it', 'accounts & finance': 'af', 'finance & accounts': 'af', 'accounts and finance': 'af', finance: 'af' };

// spaces lost between the h1's parts ("Automotiveresearch, …"): put one back where a part of the page ends and the next begins
function repair(title, texts) {
  const parts = [...new Set(texts.filter((t) => t.length >= 3))];
  let out = title;
  for (const p of parts) {
    const k = out.indexOf(p);
    if (k < 0) continue;
    const e = k + p.length, L = (c) => /\p{L}/u.test(c || '');
    if (L(out[e]) && !L(out[k - 1]) && parts.some((q) => q !== p && out.slice(e).startsWith(q.slice(0, Math.min(q.length, 6))))) out = out.slice(0, e) + ' ' + out.slice(e);
    else if (L(out[k - 1]) && !L(out[e]) && parts.some((q) => q !== p && out.slice(0, k).endsWith(q.slice(-Math.min(q.length, 6))))) out = out.slice(0, k) + ' ' + out.slice(k);
  }
  return out;
}

// the headline as people see it: the h1's text pieces joined with spaces (textContent glues "We turn" + "questions")
function headlineOf(title, texts) {
  const target = N(title);
  if (!target) return { pieces: [] };
  for (let i = 0; i < texts.length; i++) {
    if (!target.startsWith(N(texts[i])) || !N(texts[i])) continue;
    let acc = '';
    for (let j = i; j < texts.length && j < i + 40; j++) {
      acc += N(texts[j]);
      if (acc === target) return { pieces: texts.slice(i, j + 1), end: j };
      if (!target.startsWith(acc)) break;
    }
  }
  return { pieces: [] };
}

function facts(p, sections) {
  const s0 = sections[0] || { title: '', texts: [] };
  const all = sections.flatMap((s) => s.texts);
  const t0 = s0.texts;
  const seg = p.path.split('/').filter(Boolean);
  // 1. headline (and the line under it, when the h1 holds both)
  const hm = headlineOf(s0.title, t0);
  let headline = '', subline = '', end = -1;
  if (hm.pieces.length) {
    let pcs = hm.pieces.map(emojiStrip).filter((x) => /[\p{L}\p{N}]/u.test(x));
    pcs = pcs.filter((x, i) => i === 0 || N(x) !== N(pcs[i - 1]));
    const last = pcs[pcs.length - 1];
    if (pcs.length > 1 && /^[A-Z]/.test(last) && (words(last).length >= 3 || (pcs.length === 2 && words(last).length >= 2)) && /[.!?]$/.test(last)) { subline = last; pcs = pcs.slice(0, -1); }
    headline = pcs.join(' ').replace(/\s+([,.!?:;])/g, '$1');
    end = hm.end;
  } else {
    const known = all.join(' ');
    headline = repair(emojiStrip(String(s0.title || '').replace(/\p{L}+/gu, (w) => (known.includes(w) ? w : w.replace(/([a-z])([A-Z])/g, '$1 $2')))), t0);
    // a sentence of the page at the end of the h1 is the line under the headline
    const tail = t0.find((t) => /^[A-Z]/.test(t) && words(t).length >= 3 && /[.!?]$/.test(t) && headline.endsWith(t) && headline.length > t.length + 2);
    if (tail) { subline = tail; headline = headline.slice(0, -tail.length).trim(); }
    end = t0.lastIndexOf(subline || t0.find((t) => headline.endsWith(t)) || '');
  }
  headline = halves(headline);
  const short = String(p.title || '').split(' | ')[0].replace(/\s+—\s+Frequent Research$/, '').trim();
  if (headline.length < 12 && seg[0] === 'services' && t0[3] && N(t0[3]).includes(N(headline)) && t0[3].length < 70) headline = t0[3];
  if (!headline) headline = short;
  // 2. description: the first long sentence after the headline
  const rest = end >= 0 ? t0.slice(end + 1) : t0.slice(4);
  const okDesc = (t) => t.length > 60 && t !== subline && /^[A-Z0-9“"]/.test(t) && !/\.,/.test(t);
  const desc = rest.find(okDesc) || all.find((t) => okDesc(t) && t.length > 80) || '';
  const di = rest.indexOf(desc);
  // 3. the page's line of work, as it names itself (case studies, blog posts)
  let line;
  if ((seg[0] === 'blog' && seg[1]) || (seg[0] === 'industries-case-studies' && seg[2])) for (const t of t0.slice(0, 12)) { const k = LINE_OF[String(t).toLowerCase()]; if (k) { line = k; break; } }
  // 4. key points and a number, by kind of page
  let points = [], stat, flags;
  const pairs = (list, labels) => { const out = {}; for (let i = 0; i < list.length - 1; i++) if (labels.includes(list[i]) && !out[list[i]]) out[list[i]] = list[i + 1]; return out; };
  if (seg[0] === 'industries-case-studies' && seg[2]) {
    const kv = pairs(t0, ['Region', 'Scope', 'Timeline', 'Markets', 'Sample', 'Audience', 'Method', 'Duration']);
    const client = rest[0] && rest[0] !== 'Region' && rest[0].length < 90 ? rest[0] : '';
    points = ['Scope', 'Timeline', 'Region', 'Markets', 'Sample', 'Method'].filter((k) => kv[k]).slice(0, 3).map((k) => k + ': ' + kv[k]);
    const NUM = /^(\d[\d,.]*\+?)\s+([a-z]+(?:[ -][a-z]+){0,3})/i;
    const sc = String(kv.Scope || '').match(NUM) || String(kv.Timeline || '').match(NUM);
    stat = sc ? { value: sc[1], label: sc[2].trim().toLowerCase().replace(/(\s+(per|of|and|in|with|across|for|a|the))+$/i, '') } : null;
    flags = [...new Set([kv.Markets, kv.Region].join(',').split(/,|&| and /).map((x) => x.trim().toLowerCase()).map((x) => ALIAS[x] || (COUNTRIES.find((c) => c[1].toLowerCase() === x) || [])[0]).filter(Boolean))];
    if (!flags.length && /india|pan-india|\b(delhi|mumbai|pune|bengaluru|gujarat|punjab|maharashtra|kerala|tamil|karnataka|haryana|rajasthan|uttar|bihar|bengal|hyderabad|chennai|kolkata)\b/i.test(kv.Region || '')) flags = ['IN'];
    const where = kv.Region ? (/^pan-india$/i.test(kv.Region) ? ' across India' : ' in ' + kv.Region) : '';
    if (client) return { headline, subline, desc: 'For ' + client.charAt(0).toLowerCase() + client.slice(1) + where + '.', points, stat, flags, line };
  } else if (seg[0] === 'industries-case-studies') {
    for (let i = 0; i < t0.length - 1 && points.length < 3; i++) if (/^0\d$/.test(t0[i])) { const x = [t0[i + 1], t0[i + 2]].find((y) => y && y.length > 24 && y.length < 90); if (x && !points.includes(x)) points.push(x); }
  } else if (/panel-books$/.test(seg[1] || '')) {
    const sx = sections.find((s) => /numbers/i.test(s.title)) || { texts: [] };
    const st = sx.texts;
    for (let i = 0; i < st.length - 1; i++) if (/^\d[\d,.]*%?$/.test(st[i]) && !/^in$/i.test(st[i - 1] || '')) {
      let lab = st[i + 1]; if (st[i + 2] && /^[a-z]/.test(st[i + 2]) && st[i + 2].length < 30) lab += ' ' + st[i + 2];
      if (!/^\d/.test(lab) && lab.length <= 40) { if (!stat && !/%/.test(st[i])) stat = { value: st[i], label: lab.toLowerCase() }; else if (points.length < 3) points.push(st[i] + ' ' + lab); }
    }
    const region = t0.find((t) => /^(Asia|Europe|Middle East|Africa|North America|South America|Latin America|Oceania|Americas|Asia Pacific|Middle East & Africa)/.test(t));
    if (region && points.length < 3) points.unshift('Region: ' + region);
    if (seg[2]) subline = (seg[1].split('-')[0].replace(/^./, (c) => c.toUpperCase())) + ' panel book';
    if (seg[2] === 'all-countries') headline = 'All countries';
    if (stat === undefined) stat = statOf(all);
    if (/^(Profile distributions|Whole numbers|Each segment)/.test(desc) || !desc) {
      const kind = { business: 'business professionals', consumer: 'consumers', healthcare: 'healthcare professionals' }[seg[1].split('-')[0]] || 'panel members';
      const where = seg[2] === 'all-countries' ? 'across all our countries' : 'in ' + headline;
      return { headline, subline, desc: (stat ? stat.value + ' profiled ' + kind : 'Profiled ' + kind) + ' ' + where + ', ready for your next study.', points, stat, flags, line };
    }
  } else if (seg[0] === 'blog' && seg[1]) {
    const toc = sections.find((s) => /in this article|contents/i.test(s.title));
    if (toc) points = toc.texts.filter((t) => t.length > 8 && t.length < 80 && !/^in this article$/i.test(t) && !/^\d+$/.test(t)).slice(0, 3);
  } else if (seg[0] === 'services' || seg[0] === 'products' || seg[0] === 'government-opinion-research' || seg[0] === 'portals') {
    for (const t of rest.slice(di + 1, di + 30)) { if (CTA.test(t)) { if (points.length) break; continue; } if (t.length >= 12 && t.length <= 80 && !/[•●▲✓·]/.test(t) && /^[A-Z0-9]/.test(t) && t !== subline && t !== desc && !points.includes(t)) points.push(t); if (points.length >= 3) break; }
  }
  if (!points.length) points = sections.slice(1).map((s) => s.title).filter((t) => t && t.length > 3);
  if (stat === undefined) stat = statOf(t0.concat(all.slice(0, 200)));
  return { headline, subline, desc, points, stat, flags, line };
}

const used = new Set(), out = {};
let indexed = 0;
for (const p of pages) {
  const ix = byPath.get(p.path);
  let sections = [];
  if (ix) try { sections = JSON.parse(readFileSync(join(dist, 'data', 'site-index', ix.file), 'utf8')).sections || []; indexed++; } catch (e) { sections = []; }
  const f = sections.length ? facts(p, sections) : {};
  out[p.path] = makeTemplate({ path: p.path, title: p.title, h1: f.headline, subline: f.subline, desc: f.desc, points: f.points, stat: f.stat, flags: f.flags && f.flags.length ? f.flags : undefined, line: f.line, texts: sections.flatMap((s) => s.texts) }, used);
}
const list = Object.values(out);
const keys = new Set(list.map((t) => t.frame + '|' + t.prop + '|' + t.scene));
const low = list.filter((t) => Math.min(contrast(t.palette.ink, t.palette.bg1), contrast(t.palette.ink, t.palette.bg2)) < 4.5);
if (keys.size !== list.length) { console.error('two pages got the same design'); process.exit(1); }
writeFileSync(new URL('../src/data/page-video-templates.json', import.meta.url), JSON.stringify({ built: new Date().toISOString(), count: list.length, templates: out }));
console.log(`page video templates: ${list.length} pages (${indexed} read from the site index), ${keys.size} different designs, ${low.length} with low contrast, ` +
  `${list.filter((t) => t.flags.length).length} with flags, ${list.filter((t) => t.points.length).length} with key points, ${list.filter((t) => t.stat).length} with a number`);
