// Build 57 — writes llms.txt (https://llmstxt.org) for AI assistants and search tools.
// usage: node scripts/make-llms.cjs dist [--origin URL]
// Reads the page list from <wwwDir>/prerender-report.json (written by prerender.cjs) so every link points at a page that
// really exists; the company summary at the top is kept in this file. Also writes a copy to public/llms.txt.
const fs = require('fs'), path = require('path');
const argv = process.argv.slice(2);
const dir = path.resolve(argv[0] || 'dist');
const oi = argv.indexOf('--origin');
const ORIGIN = (oi >= 0 ? argv[oi + 1] : 'https://www.frequentresearch.com').replace(/\/$/, '');
const rep = JSON.parse(fs.readFileSync(path.join(dir, 'prerender-report.json'), 'utf8'));
const pages = rep.pages.map((p) => ({ route: p.route, title: (p.title || '').replace(/\s*\|\s*Frequent Research.*$/i, '').trim() }));
const by = (re) => pages.filter((p) => re.test(p.route));
const line = (p, note) => `- [${p.title || p.route}](${ORIGIN}${p.route === '/' ? '/' : p.route})${note ? ': ' + note : ''}`;
const pick = (route) => pages.find((p) => p.route === route);
const L = [];
L.push('# Frequent Research');
L.push('');
L.push('> Frequent Research (Frequent Research Fieldwork Solutions Pvt. Ltd., New Delhi, India) is a market research and fieldwork company that also runs digital marketing, IT & development, and accounts & finance teams. It operates its own research panels (Turn2Opinion, MyFrequentRewards, MyHealthOpinions), builds research software (Sampledge), and is certified to ISO 20252:2019, ISO 9001:2015 and ISO/IEC 27001:2013, and is an ESOMAR member.');
L.push('');
L.push('Key facts:');
L.push('- Four teams: Market Research, Digital Marketing, IT & Development, Accounts & Finance.');
L.push('- Research panels: Turn2Opinion (consumers and business professionals), MyFrequentRewards (consumers and professionals), MyHealthOpinions (healthcare professionals, patients and caregivers).');
L.push('- Products: the Sampledge product family, seven products: SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax and SampCrew, each with its own page at /products/<name>.');
L.push('- Contact: info@frequentresearch.com · +91 81782 00573 (also WhatsApp) · Mangolpur Kalan, New Delhi 110085, India.');
L.push('- Panel sizes by country are published in the downloadable panel books; historical figures on the Our Journey page are milestones, not current panel sizes.');
L.push('');
const sec = (title, list) => { if (!list.length) return; L.push('## ' + title); L.push(''); list.forEach((x) => L.push(x)); L.push(''); };
sec('Company', ['/', '/about-us', '/our-journey', '/our-reach', '/our-team', '/rates-reviews', '/esomar-37', '/research-ethics', '/careers', '/gallery', '/connect'].map(pick).filter(Boolean).map((p) => line(p)));
sec('Services', by(/^\/services(\/[^/]+)?$/).map((p) => line(p)));
sec('Service pages', by(/^\/services\/[^/]+\/[^/]+$/).map((p) => line(p)));
sec('Products', by(/^\/products/).map((p) => line(p)));
sec('Research panels', by(/^\/portals/).map((p) => line(p)));
sec('Government & public-sector research', by(/^\/government-opinion-research/).map((p) => line(p)));
sec('Industries & case studies', by(/^\/industries-case-studies(\/[^/]+)?$/).map((p) => line(p)));
sec('Resources', ['/downloads', '/blog', '/lets-talk'].map(pick).filter(Boolean).map((p) => line(p)));
L.push('## Optional');
L.push('');
by(/^\/blog\//).forEach((p) => L.push(line(p)));
by(/^\/industries-case-studies\/[^/]+\/[^/]+$/).slice(0, 200).forEach((p) => L.push(line(p)));
['/privacy-policy', '/cookie-policy', '/terms-conditions', '/data-protection'].map(pick).filter(Boolean).forEach((p) => L.push(line(p)));
L.push('');
const out = L.join('\n');
fs.writeFileSync(path.join(dir, 'llms.txt'), out);
fs.writeFileSync(path.join(__dirname, '..', 'public', 'llms.txt'), out);
console.log('llms.txt:', out.split('\n').length, 'lines,', (out.length / 1024).toFixed(0) + 'KB');
