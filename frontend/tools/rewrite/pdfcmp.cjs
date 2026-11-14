// Generate the same PDFs on two QA builds (FR_QA_HOOK=1) and compare them, ignoring creation date and file ID.
// Usage: node pdfcmp.cjs http://127.0.0.1:4193 http://127.0.0.1:4194 outdir
const { chromium } = require('playwright'); const fs = require('fs');
const LEAD = '({name:"Test Person",email:"test@example.com",company:"Example Ltd",phone:"+91 9876543210",country:"India",role:"Researcher"})';
const JOBS = [
  ['consumer-us', `dlxBook("b2c","united-states").then(b=>pp5PanelBook(b,${LEAD}))`],
  ['case-overlay', `NI("retail").then(c=>frpCaseStudy(c[0],{name:"Retail",slug:"retail"},${LEAD}))`],
  ['b2b-germany', `dlxBook("b2b","germany").then(b=>pp5PanelBook(b,${LEAD}))`],
  ['hc-hcp', `fp5Health("hcp",${LEAD})`],
  ['quality-mr', `fp5Quality("market-research",${LEAD})`],
  ['quality-dm', `fp5Quality("digital-marketing",${LEAD})`],
  ['quality-af', `fp5Quality("accounts-finance",${LEAD})`],
  ['brochure', `frpBrochure(VERTICALS[0].slug,${LEAD})`],
  ['company', `frpCompany(${LEAD})`],
];
// the readable-names step renamed some helpers; NEW maps old names to the current ones for the second build
const NEW = (e) => e.replace(/\bNI\(/g, 'loadCases(');
const norm = (b) => b.toString('latin1').replace(/\/CreationDate \(D:[^)]*\)/g, '').replace(/\/ModDate \(D:[^)]*\)/g, '').replace(/\/ID \[[^\]]*\]/g, '');
(async () => {
  const [A, B, out] = process.argv.slice(2); fs.mkdirSync(out, { recursive: true });
  const b = await chromium.launch(); const res = {};
  for (const base of [A, B]) { const side = base === B ? NEW : (e) => e;
    const ctx = await b.newContext({ acceptDownloads: true, timezoneId: 'Asia/Kolkata' });
    await ctx.addInitScript(() => { const D = Date; const t0 = new D('2026-11-05T10:00:00Z').getTime(); globalThis.Date = class extends D { constructor(...a) { super(...(a.length ? a : [t0])); } static now() { return t0; } }; });
    const p = await ctx.newPage(); p.on('pageerror', e => console.log('ERR', base, e.message));
    await p.goto(base + '/#/', { waitUntil: 'load' }); await p.waitForTimeout(2500);
    for (const [k, e] of JOBS) {
      const dl = p.waitForEvent('download', { timeout: 90000 }).catch(() => null);
      const r = await p.evaluate(x => Promise.resolve(window.__frQA(x)).then(() => 'ok', er => 'E ' + er.message), side(e));
      const d = await dl; const f = `${out}/${base.slice(-4)}-${k}.pdf`;
      if (d) await d.saveAs(f);
      (res[k] = res[k] || []).push(d ? fs.readFileSync(f) : null); if (r !== 'ok') console.log(k, base, r);
    }
    await ctx.close();
  }
  for (const [k, [x, y]] of Object.entries(res)) console.log(k.padEnd(16), x && y ? (norm(x) === norm(y) ? 'IDENTICAL' : 'DIFFERENT') : 'missing', x?.length, y?.length);
  await b.close();
})();
