/*
 * Build 82.5 (Kunal, 13 Nov): one video template of its own for every page of the website (Page video component).
 *
 * A template is a design description that the player (src/public/fr-page-video.js) draws: layout, animated scene,
 * 3D object, colours, icons, flags, and the page's own words (kicker, headline, tagline, three key points, a number).
 * makeTemplate() builds it from the page itself (address, title, sections), so each design fits the page's topic.
 * The 995 pages of the build are made once by tools/make-page-video-templates.js into data/page-video-templates.json;
 * pages added later in the admin get theirs on the fly. The super admin can change every part of every template
 * (MongoDB collection page_video_templates, one document per page, _id = path); "Back to the generated design" removes it.
 */
import { readFileSync } from 'node:fs';

export const LAYOUTS = [
  ['showcase', 'Showcase: words left, framed video right (build 82.6)'], ['showcase-rev', 'Showcase reversed: framed video left, words right'],
  ['cinema', 'Cinema: full picture, words bottom left'], ['split', 'Split: words left, scene right'],
  ['split-rev', 'Split reversed: scene left, words right'], ['center', 'Centre stage'], ['card', 'Floating 3D card'],
  ['poster', 'Poster: big headline on top'], ['magazine', 'Magazine cover with big number'], ['orbit', 'Orbit: icons circle the play button'],
  ['ticker', 'Ticker: moving keyword band'], ['window', 'Device window'], ['stack', '3D stacked panels'], ['spotlight', 'Spotlight'],
];
export const SCENES = [
  ['aurora', 'Aurora light'], ['particles', 'Rising particles'], ['grid', '3D grid floor'], ['waves', 'Waves'],
  ['bubbles', 'Bubbles'], ['rays', 'Light rays'], ['hexes', 'Honeycomb'], ['worldmap', 'World map dots'],
  ['stars', 'Star field'], ['ribbons', 'Silk ribbons'], ['bokeh', 'Bokeh lights'], ['circuit', 'Circuit lines'],
  ['pulse', 'Heartbeat line'], ['rings', 'Ripple rings'], ['mesh', 'Moving colour mesh'], ['bars', 'Rising bars'],
];
export const OBJECTS = [
  ['globe', '3D globe'], ['cube', '3D cube'], ['gyro', 'Gyroscope rings'], ['chart3d', '3D bar chart'],
  ['slabs', 'Glass slabs'], ['coins', 'Coin stack'], ['phone', 'Phone'], ['document', 'Document'],
  ['pyramid', 'Pyramid'], ['atom', 'Atom orbit'],
];
export const ICONS = ['chart', 'pie', 'survey', 'users', 'usercheck', 'globe', 'pin', 'phone', 'mail', 'chat', 'megaphone',
  'target', 'search', 'rocket', 'code', 'cpu', 'cloud', 'shield', 'lock', 'database', 'mobile', 'cart', 'truck', 'factory',
  'leaf', 'car', 'plane', 'home', 'building', 'bank', 'coin', 'rupee', 'calculator', 'receipt', 'file', 'download', 'book',
  'cap', 'heart', 'stethoscope', 'pill', 'flask', 'bulb', 'trophy', 'star', 'camera', 'play', 'film', 'calendar',
  'briefcase', 'handshake', 'award', 'zap', 'drop', 'food', 'shirt', 'tv', 'game', 'bed', 'sun', 'sprout', 'tree',
  'ship', 'music', 'news', 'gear', 'robot', 'flag', 'ballot', 'scale', 'fish', 'flower', 'hammer', 'oil', 'chip', 'link'];
export const MOTIONS = ['calm', 'lively', 'bold'];
// build 82.6: the frame around the video screen and the small live card beside it (showcase layouts)
export const FRAMES = [
  ['bubble', 'Speech bubble'], ['tablet', 'Tablet'], ['laptop', 'Laptop'], ['tv', 'TV on a stand'], ['browser', 'Browser window'],
  ['phone', 'Phone (landscape)'], ['polaroid', 'Polaroid photo'], ['film', 'Film strip'], ['scanner', 'Scanner corners'], ['gift', 'Gift ribbon'],
  ['post', 'Social media post'], ['ticket', 'Cinema ticket'], ['folder', 'Case file folder'], ['neon', 'Neon glow'], ['stack', 'Stacked cards'],
  ['glass', 'Glass panel'], ['cinema', 'Theatre curtains'],
];
export const PROPS = [
  ['survey', 'Survey question'], ['chart', 'Rising chart'], ['chat', 'Chat bubbles'], ['ledger', 'Ledger'], ['calendar', 'Calendar'],
  ['stars', 'Star rating'], ['gauge', 'Score gauge'], ['code', 'Code editor'], ['funnel', 'Sales funnel'], ['shield', 'Security shield'],
  ['checklist', 'Checklist'], ['pie', 'Pie chart'], ['search', 'Search results'], ['social', 'Social post'], ['receipt', 'Filed return'],
  ['none', 'No card'],
];
const IDS = (a) => a.map((x) => x[0]);

let COUNTRIES = [];
try { COUNTRIES = JSON.parse(readFileSync(new URL('../data/countries.json', import.meta.url), 'utf8')); } catch (e) { COUNTRIES = []; }
const ISO = new Set(COUNTRIES.map((c) => c[0]));

/* ------------------------------------------------------------------ helpers ------------------------------------- */
const hash = (s) => { let h = 2166136261; for (const ch of String(s)) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
const hsl = (h, s, l) => {
  h = ((h % 360) + 360) % 360; s /= 100; l /= 100;
  const k = (n) => (n + h / 30) % 12, a = s * Math.min(l, 1 - l);
  const f = (n) => Math.round(255 * (l - a * Math.max(-1, Math.min(k(n) - 3, 9 - k(n), 1))));
  return '#' + [f(0), f(8), f(4)].map((x) => x.toString(16).padStart(2, '0')).join('');
};
const lum = (hex) => { const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; };
export const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
const cut = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); if (s.length <= n) return s; const t = s.slice(0, n - 1); const i = t.lastIndexOf(' '); return (i > n * 0.6 ? t.slice(0, i) : t).replace(/[,;:\-–—]$/, '') + '…'; };
const firstSentence = (s, n) => { s = String(s || '').replace(/\s+/g, ' ').trim(); const m = s.match(/^(.{30,}?[.!?])(\s|$)/); return cut(m ? m[1] : s, n); };
const titleCase = (s) => String(s || '').replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bAnd\b/g, 'and').replace(/\bOf\b/g, 'of');
const cleanTitle = (t) => String(t || '').split(' | ')[0].replace(/\s+—\s+Frequent Research$/, '').trim();

/* ------------------------------------------------------------------ what the page is about ----------------------- */
const LINES = {
  mr: { label: 'Market Research', hue: 222, icons: ['survey', 'chart', 'users', 'target'] },
  dm: { label: 'Digital Marketing', hue: 330, icons: ['megaphone', 'target', 'chart', 'mobile'] },
  it: { label: 'IT & Development', hue: 262, icons: ['code', 'cpu', 'cloud', 'shield'] },
  af: { label: 'Accounts & Finance', hue: 152, icons: ['calculator', 'rupee', 'receipt', 'chart'] },
};
const lineOf = (s) => {
  s = s.toLowerCase();
  const score = {
    af: (s.match(/\b(gst|tds|tax|itr|payroll|account|bookkeep|audit|finance|financial|cfo|budget|mis|invoice|billing|valuation|compliance)/g) || []).length,
    it: (s.match(/\b(erp|crm|software|app|application|website|web|cloud|devops|api|automation|ai\b|dashboard|portal|platform|cyber|saas|e-commerce development|digital twin|system)/g) || []).length,
    dm: (s.match(/\b(marketing|seo|ads|ppc|social|campaign|leads?|brand|content|influencer|email|whatsapp|reputation|conversion|funnel|ecommerce|e-commerce)/g) || []).length,
    mr: (s.match(/\b(research|survey|panel|respondents?|insights?|cati|qualitative|quantitative|focus group|study|sample|opinion|data collection|tracking|segmentation|u&a)/g) || []).length,
  };
  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][1] ? Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] : 'mr';
};
// industries of /industries-case-studies/<industry>: colour hue and icons
const INDUSTRY = {
  advertising: [330, ['megaphone', 'tv', 'target']], aerospace: [205, ['plane', 'rocket', 'gear']], agriculture: [98, ['sprout', 'leaf', 'sun']],
  arms: [28, ['shield', 'target', 'gear']], automotive: [4, ['car', 'gear', 'factory']], broadcasting: [285, ['tv', 'news', 'camera']],
  chemical: [168, ['flask', 'drop', 'factory']], construction: [36, ['hammer', 'building', 'truck']], 'creative-services': [312, ['bulb', 'camera', 'star']],
  cultural: [20, ['music', 'star', 'building']], defense: [140, ['shield', 'flag', 'plane']], education: [45, ['cap', 'book', 'bulb']],
  'electric-power': [52, ['zap', 'bulb', 'factory']], electronics: [190, ['chip', 'cpu', 'mobile']], energy: [40, ['sun', 'zap', 'oil']],
  entertainment: [300, ['film', 'music', 'star']], fashion: [338, ['shirt', 'star', 'cart']], film: [356, ['film', 'camera', 'award']],
  'financial-services': [214, ['bank', 'coin', 'chart']], fishing: [195, ['fish', 'ship', 'drop']], floral: [325, ['flower', 'leaf', 'sun']],
  food: [18, ['food', 'leaf', 'cart']], gambling: [276, ['game', 'coin', 'star']], government: [222, ['ballot', 'flag', 'building']],
  healthcare: [174, ['stethoscope', 'heart', 'pill']], horticulture: [110, ['flower', 'sprout', 'leaf']], hospitality: [24, ['bed', 'food', 'star']],
  'industrial-robots': [200, ['robot', 'gear', 'factory']], 'information-services': [230, ['database', 'search', 'cloud']], insurance: [205, ['shield', 'handshake', 'file']],
  'internet-services': [250, ['cloud', 'link', 'globe']], it: [262, ['code', 'cpu', 'cloud']], leisure: [180, ['sun', 'game', 'star']],
  manufacturing: [30, ['factory', 'gear', 'truck']], 'mass-media': [292, ['news', 'tv', 'megaphone']], meat: [8, ['food', 'truck', 'factory']],
  mining: [34, ['hammer', 'truck', 'gear']], music: [280, ['music', 'star', 'play']], 'news-media': [228, ['news', 'tv', 'mobile']],
  'petroleum-oil-gas': [26, ['oil', 'drop', 'factory']], pharmaceutical: [186, ['pill', 'flask', 'heart']], 'professional-services': [218, ['briefcase', 'handshake', 'chart']],
  publishing: [16, ['book', 'news', 'file']], 'pulp-and-paper': [88, ['tree', 'file', 'factory']], 'real-estate': [30, ['home', 'building', 'pin']],
  retail: [345, ['cart', 'shirt', 'coin']], semiconductor: [196, ['chip', 'cpu', 'zap']], shipbuilding: [206, ['ship', 'hammer', 'gear']],
  software: [258, ['code', 'cloud', 'cpu']], sport: [130, ['trophy', 'star', 'target']], steel: [215, ['hammer', 'factory', 'gear']],
  telecommunications: [240, ['phone', 'link', 'mobile']], textile: [320, ['shirt', 'factory', 'star']], tobacco: [24, ['leaf', 'factory', 'scale']],
  transport: [44, ['truck', 'plane', 'ship']], 'video-games': [272, ['game', 'star', 'trophy']], water: [196, ['drop', 'leaf', 'factory']],
  wood: [30, ['tree', 'hammer', 'home']],
};
// words in the page that call for an icon (first matches win)
const WORD_ICONS = [
  [/\bgst\b|invoice|receipt|billing/i, 'receipt'], [/\btax|\bitr\b|\btds\b/i, 'calculator'], [/\bpayroll\b|\bsalar/i, 'users'], [/\bcfo\b|forecast|budget/i, 'chart'],
  [/\baudit|\bcompliance\b/i, 'shield'], [/\binvest|\bwealth\b/i, 'coin'], [/bookkeep|\baccounting\b/i, 'book'], [/\brupees?\b|₹|\binr\b/i, 'rupee'],
  [/\bseo\b|\bsearch(es)?\b/i, 'search'], [/google ads|\bppc\b|\bperformance\b/i, 'target'], [/\bsocial\b/i, 'chat'], [/\bemails?\b|newsletter/i, 'mail'], [/whatsapp/i, 'phone'],
  [/\binfluencer/i, 'star'], [/\bvideos?\b/i, 'film'], [/\bcontent\b/i, 'file'], [/\breputation\b|\breviews?\b/i, 'award'], [/\bleads?\b/i, 'target'], [/e-?commerce|\bshop/i, 'cart'],
  [/\banalytics\b|\bdashboards?\b|\breport/i, 'chart'], [/\bautomation\b|\bai\b|\bartificial\b/i, 'robot'], [/\bcloud\b|devops/i, 'cloud'], [/\bcyber|\bsecurity\b/i, 'lock'],
  [/mobile app|android|ios\b/i, 'mobile'], [/\bwebsites?\b|\bweb app/i, 'code'], [/\berp\b|\bcrm\b/i, 'database'], [/\bapis?\b|\bintegration\b/i, 'link'], [/\btesting\b|\bqa\b/i, 'usercheck'],
  [/\bui\b|\bux\b|\bdesign\b/i, 'bulb'], [/\bcati\b|telephon|\bcalls?\b/i, 'phone'], [/qualitative|focus group|interview/i, 'chat'], [/quantitative|\bsurveys?\b/i, 'survey'],
  [/\bpanels?\b/i, 'users'], [/\bhealth|\bhcps?\b|\bdoctors?\b|\bpatients?\b|caregiver/i, 'stethoscope'], [/pharma/i, 'pill'], [/\boffline\b|\bfieldwork\b/i, 'pin'],
  [/\bglobal\b|\bworld\b|\bcountries\b/i, 'globe'], [/data processing|coding|tabulation/i, 'database'], [/\binsights?\b/i, 'bulb'], [/\bconsult/i, 'handshake'],
  [/\bcareers?\b|\bjobs?\b|\bhiring\b/i, 'briefcase'], [/\bteams?\b|\bpeople\b/i, 'users'], [/\bjourney\b|\bhistory\b|milestone/i, 'calendar'], [/\bawards?\b|certif|\biso\b/i, 'award'],
  [/privacy|data protection|gdpr|cookie/i, 'lock'], [/\bterms\b|ethic|esomar/i, 'scale'], [/\bgallery\b|\bphotos?\b/i, 'camera'], [/\bdownloads?\b|brochure|\bpdf\b/i, 'download'],
  [/government|public opinion|election|citizen/i, 'ballot'], [/\bcontact\b|\bconnect\b|\btalk\b/i, 'mail'], [/\bblog\b|\bguides?\b|\barticles?\b/i, 'book'],
];

const LEGAL = /^\/(cookie-policy|data-protection|privacy-policy|privacy-data-protection|terms-conditions|research-ethics|esomar-37)$/;
const COMPANY = /^\/(about-us|our-team|our-journey|our-reach|careers|gallery|rates-reviews|connect|lets-talk)$/;

function classify(path, text) {
  const seg = path.split('/').filter(Boolean);
  if (path === '/') return { family: 'brand', kicker: 'Frequent Research', hue: 222, icons: ['globe', 'chart', 'code', 'calculator'], line: 'mr' };
  if (seg[0] === 'services') {
    const map = { 'market-research': 'mr', 'digital-marketing': 'dm', 'it-development': 'it', 'accounts-finance': 'af' };
    const line = map[seg[1]] || lineOf(text);
    return { family: 'service', line, hue: LINES[line].hue, icons: LINES[line].icons, kicker: seg.length > 2 ? LINES[line].label + ' service' : seg.length === 2 ? LINES[line].label : 'Our services' };
  }
  if (seg[0] === 'industries-case-studies') {
    const ind = INDUSTRY[seg[1]];
    if (!seg[1]) return { family: 'industry', line: 'mr', hue: 200, icons: ['factory', 'globe', 'chart'], kicker: 'Industries & case studies' };
    const line = lineOf(text);
    return { family: seg[2] ? 'case' : 'industry', line, industry: seg[1], hue: ind ? ind[0] : hash(seg[1]) % 360, icons: [...(ind ? ind[1] : ['factory']), ...LINES[line].icons.slice(0, 1)], kicker: seg[2] ? 'Case study · ' + titleCase(seg[1]) : titleCase(seg[1]) + ' · industry' };
  }
  if (seg[0] === 'downloads') {
    if (/panel-books$/.test(seg[1] || '')) {
      const kind = seg[1].split('-')[0];
      const hue = kind === 'healthcare' ? 172 : kind === 'business' ? 214 : 28;
      return { family: 'panel-book', line: 'mr', panelKind: kind, country: seg[2] || '', hue, icons: [kind === 'healthcare' ? 'stethoscope' : kind === 'business' ? 'briefcase' : 'users', 'download', 'globe'], kicker: titleCase(kind) + ' panel book' + (seg[2] ? ' · ' + (seg[2] === 'all-countries' ? 'All countries' : titleCase(seg[2])) : '') };
    }
    return { family: 'download', line: lineOf(text), hue: 236, icons: ['download', 'file', 'award'], kicker: 'Downloads' + (seg[1] ? ' · ' + titleCase(seg[1]) : '') };
  }
  if (seg[0] === 'blog') { const line = seg[1] ? lineOf(text) : 'mr'; return { family: 'blog', line, hue: seg[1] ? LINES[line].hue : 200, icons: seg[1] ? ['book', ...LINES[line].icons.slice(0, 2)] : ['book', 'bulb', 'news'], kicker: seg[1] ? 'Blog · ' + LINES[line].label : 'Guides & insights' }; }
  if (seg[0] === 'products') return { family: 'product', line: 'it', hue: 248 + (hash(seg[1] || 'x') % 70), icons: ['rocket', 'cpu', 'chart'], kicker: seg[1] ? 'Sampledge product' : 'Products' };
  if (seg[0] === 'portals') return { family: 'portal', line: 'mr', hue: seg[1] === 'myhealthopinions' ? 174 : seg[1] === 'turn2opinion' ? 262 : seg[1] === 'myfrequentrewards' ? 32 : 220, icons: ['users', 'trophy', 'mobile'], kicker: seg[1] ? 'Research panel' : 'Our research panels' };
  if (seg[0] === 'government-opinion-research') return { family: 'gov', line: 'mr', hue: 222, icons: ['ballot', 'flag', 'building'], kicker: 'Government & public opinion research' };
  if (LEGAL.test(path)) return { family: 'trust', line: 'mr', hue: 210, icons: ['shield', 'lock', 'scale'], kicker: 'Trust & privacy' };
  if (COMPANY.test(path)) return { family: 'company', line: 'mr', hue: 222, icons: ['users', 'globe', 'handshake'], kicker: 'Frequent Research' };
  const line = lineOf(text);
  return { family: 'page', line, hue: LINES[line].hue, icons: LINES[line].icons, kicker: 'Frequent Research' };
}

// preferred designs per family (the first free combination in this order wins, so each family keeps its own look)
const PREF = {
  brand: [['cinema', 'center', 'orbit'], ['worldmap', 'aurora', 'stars'], ['globe', 'atom', 'gyro']],
  service: [['split', 'card', 'stack', 'window', 'magazine', 'orbit', 'split-rev', 'spotlight', 'poster', 'center', 'ticker', 'cinema'], null, null],
  case: [null, null, null],
  industry: [['magazine', 'poster', 'cinema', 'split'], null, null],
  'panel-book': [['split', 'split-rev', 'card', 'magazine', 'stack', 'center', 'poster', 'window', 'orbit', 'cinema', 'ticker', 'spotlight'], ['worldmap', 'stars', 'aurora', 'rings', 'particles', 'mesh', 'bokeh', 'grid'], ['globe', 'document', 'slabs', 'gyro']],
  download: [['window', 'card', 'stack'], ['grid', 'hexes', 'mesh'], ['document', 'slabs']],
  blog: [['poster', 'magazine', 'card', 'split', 'ticker', 'spotlight', 'split-rev', 'center'], null, null],
  product: [['window', 'stack', 'orbit', 'spotlight'], ['circuit', 'grid', 'stars', 'mesh'], ['phone', 'cube', 'atom', 'slabs']],
  portal: [['orbit', 'card', 'window', 'split'], ['bubbles', 'bokeh', 'pulse', 'aurora'], ['phone', 'coins', 'atom']],
  gov: [['center', 'magazine'], ['rays', 'worldmap'], ['pyramid', 'globe']],
  trust: [['center', 'card', 'window', 'split', 'spotlight', 'poster', 'stack'], ['hexes', 'grid', 'rings', 'circuit', 'mesh', 'aurora', 'rays'], ['cube', 'slabs', 'pyramid', 'document', 'gyro']],
  company: [['cinema', 'orbit', 'stack', 'spotlight', 'magazine', 'split', 'center', 'card', 'poster'], ['bokeh', 'aurora', 'worldmap', 'stars', 'ribbons', 'rays', 'particles', 'mesh', 'rings'], ['atom', 'globe', 'gyro', 'slabs', 'pyramid', 'cube']],
  page: [null, null, null],
};
const LINE_SCENES = { mr: ['particles', 'worldmap', 'bars', 'rings', 'bokeh'], dm: ['ribbons', 'bubbles', 'rays', 'mesh', 'bokeh'], it: ['circuit', 'grid', 'hexes', 'stars', 'particles'], af: ['bars', 'grid', 'waves', 'aurora', 'mesh'] };
const LINE_OBJECTS = { mr: ['chart3d', 'globe', 'atom', 'gyro'], dm: ['phone', 'pyramid', 'gyro', 'slabs'], it: ['cube', 'slabs', 'atom', 'phone'], af: ['coins', 'chart3d', 'document', 'slabs'] };
const FRAME_PREF = {
  brand: ['cinema', 'neon', 'glass'], service: null, case: ['folder', 'scanner', 'stack', 'browser', 'tablet', 'glass', 'polaroid', 'film'], industry: ['film', 'polaroid', 'tv', 'stack'],
  'panel-book': ['tablet', 'glass', 'stack', 'bubble', 'browser', 'neon'], download: ['folder', 'tablet', 'stack'], blog: ['browser', 'polaroid', 'post', 'film', 'laptop', 'stack'],
  product: ['laptop', 'phone', 'browser', 'neon'], portal: ['bubble', 'phone', 'gift', 'neon'], gov: ['folder', 'tv', 'scanner'], trust: ['scanner', 'glass', 'folder', 'browser'],
  company: ['polaroid', 'film', 'cinema', 'bubble', 'glass', 'tv', 'stack', 'ticket', 'neon'], page: null,
};
const LINE_FRAMES = { mr: ['bubble', 'tablet', 'glass', 'scanner', 'tv', 'stack'], dm: ['post', 'phone', 'neon', 'ticket', 'bubble', 'gift'], it: ['laptop', 'browser', 'phone', 'neon', 'glass', 'tablet'], af: ['folder', 'tablet', 'glass', 'browser', 'stack', 'laptop'] };
const LINE_PROPS = { mr: ['survey', 'chart', 'pie', 'checklist', 'stars', 'gauge'], dm: ['social', 'funnel', 'search', 'chart', 'chat', 'stars'], it: ['code', 'shield', 'checklist', 'chart', 'chat', 'gauge'], af: ['ledger', 'receipt', 'calendar', 'pie', 'chart', 'checklist'] };
const FAMILY_PROPS = { portal: ['survey', 'stars', 'chat'], 'panel-book': ['survey', 'pie', 'chart'], trust: ['shield', 'checklist'], gov: ['pie', 'survey', 'checklist'], company: ['stars', 'calendar', 'chat', 'chart'], blog: ['search', 'checklist', 'chart'], download: ['checklist', 'pie'], case: ['chart', 'checklist', 'gauge', 'pie'] };
// the italic second line of the headline (like "Get rewarded.") and the main button, per kind of page
const EM = {
  mr: ['Answers you can act on.', 'Real people, real answers.', 'Insight you can trust.', 'Data that decides.', 'From question to clarity.'],
  dm: ['Growth you can measure.', 'Seen, clicked, chosen.', 'Reach the right people.', 'Campaigns that convert.', 'More leads, less waste.'],
  it: ['Built to scale.', 'Software that just works.', 'Ship faster, safer.', 'Engineered for growth.', 'Ideas into products.'],
  af: ['Numbers you can trust.', 'Books in order, always.', 'Compliance made calm.', 'Clarity in every rupee.', 'Finance without the fuss.'],
};
const EM_FAMILY = {
  brand: ['One partner. Four ways to grow.'], 'panel-book': ['Real people, ready to answer.', 'Profiled and verified.', 'Reach them in days.'], portal: ['Share your opinion. Get rewarded.', 'Your voice counts.'],
  gov: ['Hear every citizen.', 'Evidence for policy.'], trust: ['Your data, protected.', 'Clear rules, kept.'], company: ['Meet the people behind the answers.', 'Since 2015, across 55 markets.', 'Built on trust.'],
  blog: ['Explained in minutes.', 'The short version, on video.'], download: ['Free to download.', 'Everything in one file.'], product: ['By Sampledge.', 'Built for researchers.'],
  case: ['Results that held up.', 'What we did, and what changed.', 'From brief to decision.'], industry: ['Insight for your sector.', 'Sector knowledge, on video.'],
};
const LINK = {
  brand: ['Start a project', '/lets-talk'], service: ['Get a proposal', '/lets-talk'], case: ['Start a similar project', '/lets-talk'], industry: ['Talk to a sector expert', '/lets-talk'],
  'panel-book': ['Request this panel', '/lets-talk'], download: ['Ask for a copy', '/lets-talk'], blog: ['Talk to an expert', '/lets-talk'], product: ['Book a demo', '/lets-talk'],
  portal: ['Join the panel', ''], gov: ['Plan a study', '/lets-talk'], trust: ['Ask a question', '/lets-talk'], company: ['Let\'s talk', '/lets-talk'], page: ['Let\'s talk', '/lets-talk'],
};
const PORTAL_LINKS = { turn2opinion: ['Join Turn2Opinion', 'https://www.turn2opinion.com'], myhealthopinions: ['Join MyHealthOpinions', 'https://www.myhealthopinions.com'], myfrequentrewards: ['Join MyFrequentRewards', 'https://www.myfrequentrewards.com'] };
const HEALTH = /health|hcp|pharma|patient|doctor|caregiver|clinic|hospital/i;

const rotate = (arr, n) => arr.slice(n % arr.length).concat(arr.slice(0, n % arr.length));
const orderFrom = (pref, all, h) => { const p = pref ? rotate(pref, h % pref.length) : []; return [...p, ...rotate(all.filter((x) => !p.includes(x)), (h >>> 7) % all.length)]; };

// country flags: the panel book's country, else countries the page names (max 6)
const COUNTRY_RE = COUNTRIES.filter((c) => c[1].length > 3).map((c) => [c[0], new RegExp('\\b' + c[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i')]);
const TOP = ['IN', 'US', 'GB', 'DE', 'FR', 'AE', 'SG', 'AU', 'CA', 'JP', 'BR', 'ZA'];
function flagsOf(path, cls, text) {
  if (cls.family === 'panel-book') {
    if (!cls.country || cls.country === 'all-countries') return TOP.slice(0, 8);
    const name = cls.country.replace(/-/g, ' ');
    const c = COUNTRIES.find((x) => x[1].toLowerCase() === name) || COUNTRIES.find((x) => x[1].toLowerCase().startsWith(name)) || COUNTRIES.find((x) => name.includes(x[1].toLowerCase()));
    return c ? [c[0]] : [];
  }
  if (/our-reach|government|panel|global/.test(path) || cls.family === 'brand') {
    const found = COUNTRY_RE.filter(([, re]) => re.test(text)).map(([iso]) => iso);
    const out = [...new Set(found)].slice(0, 6);
    return out.length >= 2 ? out : cls.family === 'brand' || /our-reach/.test(path) ? TOP.slice(0, 6) : out;
  }
  const found = [...new Set(COUNTRY_RE.filter(([, re]) => re.test(text)).map(([iso]) => iso))];
  return found.length && found.length <= 6 ? found.slice(0, 4) : [];
}

// build 82.6: no gold, yellow or brown backgrounds (Kunal's colour rule). A background hue in that band moves to the
// site's navy-blue range; warm topics keep their warm accent colours on top.
const bgHue = (x) => { const n = ((x % 360) + 360) % 360; return n >= 25 && n <= 75 ? 222 + (n - 50) : x; };
function paletteOf(path, cls, h) {
  const jitter = ((h >>> 3) % 31) - 15;
  const base = cls.hue + jitter;
  const scheme = (h >>> 11) % 4; // 0 analogous, 1 complementary, 2 triad, 3 split
  const off = [38, 180, 120, 150][scheme];
  const light = cls.family === 'trust' ? (h % 3 !== 0) : ((h >>> 5) % 9 === 0);
  let p;
  if (light) {
    p = { tone: 'light', bg1: hsl(bgHue(base), 55, 97), bg2: hsl(bgHue(base + 20), 60, 90), ink: hsl(base, 55, 12), muted: hsl(base, 22, 34), accent: hsl(base, 78, 42), accent2: hsl(base + off, 72, 46), glow: hsl(base + off / 2, 90, 70) };
  } else {
    p = { tone: 'dark', bg1: hsl(bgHue(base), 62, 7 + ((h >>> 9) % 5)), bg2: hsl(bgHue(base + off / 3), 70, 18 + ((h >>> 13) % 7)), ink: '#ffffff', muted: hsl(base, 30, 82), accent: hsl(base + 8, 88, 58), accent2: hsl(base + off, 86, 62), glow: hsl(base + off / 2, 95, 66) };
  }
  // keep the words readable (WCAG AA 4.5:1 for small text) on both background colours
  for (const k of ['bg1', 'bg2']) if (contrast(p.ink, p[k]) < 7) p[k] = light ? hsl(bgHue(base), 50, 96) : hsl(bgHue(base), 60, 9);
  if (contrast(p.muted, p.bg2) < 4.5) p.muted = light ? hsl(base, 30, 26) : hsl(base, 25, 88);
  // build 82.6: the accent colour now carries the italic headline line and the step bars: keep it readable too
  for (let l = light ? 42 : 58; contrast(p.accent, p.bg1) < 4.5 || contrast(p.accent, p.bg2) < 3.2; l += light ? -3 : 3) { if (l < 18 || l > 86) break; p.accent = hsl(base + 8, light ? 78 : 88, l); }
  return p;
}

// a number worth showing big ("55+ markets", "35,933 profiled professionals"); dates, steps and counters are left out
const STAT_WORDS = /^(countries|markets|panelists|panellists|members|professionals|profiled|clients|projects|years|services|languages|respondents|surveys|experts|industries|case studies|cases|teams|team members|doctors|patients|hcps|cities|states|regions|products|keywords|min read|minutes|months|weeks|days|showrooms|stores|outlets|branches|users|downloads|interviews|completes|hospitals|dealers|farmers|students|schools|sites|plants)/i;
export function statOf(texts) {
  for (let i = 0; i < Math.min(texts.length, 160); i++) {
    const t = String(texts[i] || '').trim();
    let m = t.match(/^(\d[\d,.]*(?:\+|%|k|m)?\+?)\s+([a-z][a-z &-]{2,30})$/i);
    if (m && STAT_WORDS.test(m[2])) return { value: m[1], label: m[2] };
    m = t.match(/^(\d[\d,.]*(?:\+|%|k|m)?\+?)$/i);
    const nx = String(texts[i + 1] || '').trim();
    if (m && nx.length <= 30 && /^[a-z]/.test(nx) && STAT_WORDS.test(nx) && !/^0\d$/.test(m[1]) && !/^(in|of|step|section)$/i.test(String(texts[i - 1] || '').trim())) return { value: m[1], label: nx };
  }
  return null;
}
const GENERIC = /^(faq|faqs|frequently asked|related|get in touch|contact us|let'?s talk|share|more\b|read more|you may also like|other |our clients|testimonials?|start a project|ready to|on this page|in this article|keep reading|chapters|policies|want results|industry overview|download sections|have a question|questions and answers|.*: questions and answers|next on|hear from|writing the next|table of contents|contents)/i;
const CTA = {
  brand: 'Watch our story', service: 'Watch how it works', case: 'Play the case study', industry: 'Watch the industry story', 'panel-book': 'See this panel', download: 'Watch the overview',
  blog: 'Watch the 2-minute version', product: 'See it in action', portal: 'Watch the panel tour', gov: 'Watch the briefing', trust: 'Watch: how we protect you', company: 'Meet us on video', page: 'Watch the video',
};

const emOf = (cls, path, head, sub, h) => {
  const s = String(sub || '').trim();
  if (s && s.length <= 42 && s.toLowerCase() !== head.toLowerCase() && !/[:|]$/.test(s)) return /[.!?]$/.test(s) ? s : s + '.';
  const seg = path.split('/')[2];
  if (cls.family === 'portal' && seg) return EM_FAMILY.portal[0];
  const pool = EM_FAMILY[cls.family] || EM[cls.line] || EM.mr;
  return pool[h % pool.length];
};
const linkOf = (cls, path) => {
  const seg = path.split('/')[2];
  if (cls.family === 'portal') { const l = PORTAL_LINKS[seg]; return l ? { label: l[0], to: l[1] } : { label: 'See our panels', to: '/portals' }; }
  const l = LINK[cls.family] || LINK.page; return { label: l[0], to: l[1] || '/lets-talk' };
};
const FAMILY_CHIP = { 'panel-book': 'Verified panel', portal: 'Free to join', case: 'Case study', blog: 'Guide', download: 'Free download', product: 'By Sampledge', gov: 'Public opinion', trust: 'Your data, safe', company: 'Since 2015', brand: 'Four services', industry: 'Sector insight' };
const chipsOf = (cls, stat, points, flags) => {
  const c = [];
  if (stat && stat.value) c.push(cut(stat.value + ' ' + (stat.label || ''), 24));
  if (flags && flags.length > 1 && !/countr|market/i.test(c.join(' '))) c.push(flags.length + ' countries');
  c.push(FAMILY_CHIP[cls.family] || (LINES[cls.line] ? LINES[cls.line].label : 'Frequent Research'));
  if (c.length < 3) c.push('On video');
  return [...new Set(c)].slice(0, 3);
};

/**
 * page: { path, title, h1?, desc?, points?: string[], texts?: string[] }
 * used: a Set of design keys already taken (layout|scene|object), so each page gets a combination of its own
 */
export function makeTemplate(page, used = new Set()) {
  const path = page.path || '/';
  const texts = Array.isArray(page.texts) ? page.texts : [];
  const headline0 = cleanTitle(page.h1 || page.title || titleCase(path.split('/').pop() || 'Frequent Research'));
  const text = [path.replace(/[-/]/g, ' '), page.title, page.h1, page.desc, ...(page.points || []), ...texts.slice(0, 80)].join(' ');
  const cls = classify(path, text);
  if (page.line && LINES[page.line] && (cls.family === 'case' || (cls.family === 'blog' && path !== '/blog'))) { // the line the page itself names
    cls.line = page.line;
    if (cls.family === 'blog') { cls.hue = LINES[page.line].hue; cls.kicker = 'Blog · ' + LINES[page.line].label; cls.icons = ['book', ...LINES[page.line].icons.slice(0, 2)]; }
    else { cls.kicker = cls.kicker + ' · ' + LINES[page.line].label; cls.icons = [...cls.icons.slice(0, 3), LINES[page.line].icons[0]]; }
  }
  const h = hash(path);
  const healthy = HEALTH.test(path + ' ' + headline0);
  const [pl, ps, po] = PREF[cls.family] || PREF.page;
  const scenePref = ps || (healthy ? ['pulse', 'bubbles', 'rings', 'aurora'] : LINE_SCENES[cls.line] || null);
  const objPref = po || (cls.family === 'case' && cls.industry && /financial|insurance|bank/.test(cls.industry) ? ['coins', 'chart3d'] : healthy ? ['atom', 'gyro', 'slabs'] : LINE_OBJECTS[cls.line] || null);
  // build 82.6: every page gets the showcase style (words beside a framed video); frame, live card and scene make it
  // its own: walk the preferred orders together so the first free combination stays close to the page's topic
  const framePref = FRAME_PREF[cls.family] || LINE_FRAMES[cls.line] || null;
  const propPref = (healthy ? ['gauge', 'checklist', 'survey'] : null) || FAMILY_PROPS[cls.family] || LINE_PROPS[cls.line] || null;
  const PROP_IDS = IDS(PROPS).filter((x) => x !== 'none');
  const F = orderFrom(framePref, IDS(FRAMES), h >>> 2), PR = orderFrom(propPref, PROP_IDS, h >>> 6), S = orderFrom(scenePref, IDS(SCENES), h >>> 4);
  const O = orderFrom(objPref, IDS(OBJECTS), h >>> 8);
  let pick = null;
  outer: for (let depth = 0; depth < F.length + PR.length + S.length; depth++) {
    for (let i = 0; i <= depth && i < F.length; i++) for (let j = 0; j <= depth - i && j < PR.length; j++) {
      const k = depth - i - j; if (k >= S.length) continue;
      const key = F[i] + '|' + PR[j] + '|' + S[k];
      if (!used.has(key)) { pick = [F[i], PR[j], S[k]]; break outer; }
    }
  }
  if (!pick) pick = [F[0], PR[0], S[0]];
  used.add(pick.join('|'));
  const layout = (h >>> 12) % 3 === 0 ? 'showcase-rev' : 'showcase';
  const icons = [];
  for (const i of cls.icons) if (!icons.includes(i)) icons.push(i);
  for (const [re, i] of WORD_ICONS) { if (icons.length >= 6) break; if (re.test(headline0 + ' ' + (page.desc || '')) && !icons.includes(i)) icons.push(i); }
  const points = [];
  for (const p of page.points || []) { const t = cut(p, 54); if (t && !GENERIC.test(t) && t.toLowerCase() !== headline0.toLowerCase() && !points.includes(t)) points.push(t); if (points.length >= 3) break; }
  const stat = page.stat !== undefined ? page.stat : statOf(texts);
  const id = 'pv-' + (path === '/' ? 'home' : path.slice(1).replace(/\//g, '--')).slice(0, 110);
  const tpl = {
    id, page: path, name: cut(headline0, 70), family: cls.family, line: cls.line,
    layout, frame: pick[0], prop: pick[1], scene: pick[2], object: O[0], motion: MOTIONS[cls.family === 'trust' || cls.family === 'download' ? 0 : cls.family === 'product' || cls.line === 'dm' ? 1 + ((h >>> 2) % 2) : (h >>> 2) % 3],
    palette: paletteOf(path, cls, h),
    kicker: cut(cls.kicker, 60), headline: cut(headline0, 90), subline: cut(page.subline || '', 90), tagline: firstSentence(page.desc || '', 170), points,
    stat, icons: icons.filter((i) => ICONS.includes(i)).slice(0, 6), flags: (page.flags || flagsOf(path, cls, [page.h1, page.desc, ...(page.points || [])].join(' '))).filter((c) => ISO.has(c)).slice(0, 8),
    cta: CTA[cls.family] || CTA.page, image: '', imageAlt: '',
    em: emOf(cls, path, headline0, page.subline, h), link: linkOf(cls, path), subscribe: true, screenText: '', chips: null,
  };
  tpl.chips = chipsOf(cls, tpl.stat, tpl.points, tpl.flags);
  return tpl;
}

/* ------------------------------------------------------------------ admin changes -------------------------------- */
const HEX = /^#[0-9a-f]{6}$/i;
const str = (x, n) => (typeof x === 'string' ? x.replace(/<[^>]*>/g, '').replace(/[\u0000-\u001F\u007F]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, n) : '');
const link = (u) => { const s = String(u || '').trim(); if (!s) return ''; if (/^\/[^/]/.test(s)) return s.slice(0, 1000); try { const x = new URL(s); return x.protocol === 'https:' ? x.href.slice(0, 1000) : null; } catch (e) { return null; } };

// an admin's change to a template, checked field by field; returns { patch } or { error }
export function cleanTemplatePatch(b) {
  const p = {};
  const pick = (k, list) => { if (b[k] === undefined) return; if (!IDS(list).includes(b[k])) throw new Error(`"${b[k]}" is not a ${k}.`); p[k] = b[k]; };
  try {
    pick('layout', LAYOUTS); pick('scene', SCENES); pick('object', OBJECTS); pick('frame', FRAMES); pick('prop', PROPS);
    if (b.motion !== undefined) { if (!MOTIONS.includes(b.motion)) throw new Error('Motion must be calm, lively or bold.'); p.motion = b.motion; }
    for (const [k, n] of [['name', 70], ['kicker', 60], ['headline', 120], ['subline', 120], ['tagline', 240], ['cta', 40], ['imageAlt', 160], ['em', 60], ['screenText', 60]]) if (b[k] !== undefined) p[k] = str(b[k], n);
    if (b.points !== undefined) p.points = (Array.isArray(b.points) ? b.points : String(b.points).split('\n')).map((x) => str(x, 70)).filter(Boolean).slice(0, 4);
    if (b.icons !== undefined) { const a = (Array.isArray(b.icons) ? b.icons : String(b.icons).split(/[,\s]+/)).filter(Boolean); const bad = a.find((i) => !ICONS.includes(i)); if (bad) throw new Error(`"${bad}" is not an icon.`); p.icons = [...new Set(a)].slice(0, 6); }
    if (b.flags !== undefined) { const a = (Array.isArray(b.flags) ? b.flags : String(b.flags).split(/[,\s]+/)).map((x) => String(x).toUpperCase()).filter(Boolean); const bad = a.find((i) => !ISO.has(i)); if (bad) throw new Error(`"${bad}" is not a country code (two letters, e.g. IN, US).`); p.flags = [...new Set(a)].slice(0, 8); }
    if (b.chips !== undefined) p.chips = (Array.isArray(b.chips) ? b.chips : String(b.chips).split(/\n|,/)).map((x) => str(x, 26)).filter(Boolean).slice(0, 3);
    if (b.subscribe !== undefined) p.subscribe = b.subscribe !== false && b.subscribe !== 'false';
    if (b.link !== undefined) { const l = b.link || {}; const to = link(l.to); if (to === null) throw new Error('The button link must start with / or https://.'); p.link = l.label && to ? { label: str(l.label, 40), to } : null; }
    if (b.image !== undefined) { const u = link(b.image); if (u === null) throw new Error('The picture must be an https:// link or a file uploaded to the site.'); p.image = u; }
    if (b.stat !== undefined) p.stat = b.stat && (b.stat.value || b.stat.label) ? { value: str(b.stat.value, 14), label: str(b.stat.label, 32) } : null;
    if (b.palette !== undefined) {
      const pal = {};
      for (const k of ['bg1', 'bg2', 'ink', 'muted', 'accent', 'accent2', 'glow']) if (b.palette[k] !== undefined) { if (!HEX.test(b.palette[k])) throw new Error(`Colour "${k}" must look like #12ab34.`); pal[k] = b.palette[k].toLowerCase(); }
      if (b.palette.tone !== undefined) pal.tone = b.palette.tone === 'light' ? 'light' : 'dark';
      p.palette = pal;
    }
  } catch (e) { return { error: e.message }; }
  return { patch: p };
}

export const mergeTemplate = (base, patch) => (patch ? { ...base, ...patch, palette: { ...base.palette, ...(patch.palette || {}) }, edited: true } : base);

// a warning (not an error) when the admin's colours make the words hard to read
export function readability(t) {
  const c = Math.min(contrast(t.palette.ink, t.palette.bg1), contrast(t.palette.ink, t.palette.bg2));
  return c < 4.5 ? `The headline colour is hard to read on this background (contrast ${c.toFixed(1)}:1, at least 4.5:1 is advised).` : '';
}
