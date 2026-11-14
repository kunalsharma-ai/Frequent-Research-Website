/*
 * Accounts & Finance hub — /services/accounts-finance (URL unchanged). Build 62. Prefix AFH_ (styles: accounts-finance.css).
 * Replaces the generic vertical template for this vertical only (that template carried an unverified client scenario).
 * Sections: orbit hero (17 services around a gold coin), service families, price explorer, bundles, launch offers,
 * before/after, process, commercial terms, FAQ, consultation form. Data: AF_SVC / AF_FAM (src/data/AccountsFinance.jsx).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { RC_useInView } from '../app/shared/Reveal.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, PpL, dmMeta, ppGo } from '../components/dm/shared.jsx';
import { AF_FAM, AF_SVC } from '../data/AccountsFinance.jsx';
import { AF_FORM, AF_Final, AF_FormBlock, AF_HUB, AF_I, AF_Offers, AF_Price, AF_Process, AF_TIERS, AF_UNIT, afBy, afInr, afUrl, afVars } from './AccountsFinance.jsx';
import { AF5_HubStage } from './AccountsFinance65.jsx';

const AFH_DESC = "Accounting, bookkeeping, GST, TDS, ITR, payroll, MIS, budgeting, Virtual CFO, corporate finance and due diligence services for Indian businesses — 17 services with clear plans from ₹999.";
const AFH_PAL = { pal: ["#C9A227", "#F5D77A", "#0B1030"] };
const AFH_FAMC = { books: ["#0F9D7A", "#7FE3C4"], tax: ["#D97706", "#FCD34D"], plan: ["#0B9AA5", "#8EF0F5"], strat: ["#C9A227", "#FFE08A"] };
const AFH_BUNDLES = [
  { n: "Startup Launch", p: 4499, was: 4997, s: ["accounting-and-bookkeeping-services", "gst-services", "tds-services"], tier: "Essential", ic: "rocket", for: "New businesses that need clean books and on-time GST and TDS from day one." },
  { n: "Business Growth", p: 12999, was: 16997, s: ["accounting-and-bookkeeping-services", "gst-services", "mis-and-financial-reporting"], tier: "Growth", ic: "bars", for: "Growing SMEs that want compliance handled and monthly numbers they can act on.", pop: true },
  { n: "Finance Leadership", p: 49999, was: 59997, s: ["virtual-cfo-services", "mis-and-financial-reporting", "financial-planning-and-advisory"], tier: "Growth", ic: "gauge", for: "Scaling companies that need CFO-level direction, reporting and planning together." },
];
const AFH_TERMS = [
  ["calendar", "Billing", "Monthly retainers are billed in advance; projects through agreed milestones."],
  ["layers", "Scope", "Transaction, employee, entity, GSTIN, reporting-period and consultation limits are stated in writing."],
  ["plus", "Additional work", "Historical cleanup, notices, revisions beyond scope, urgent work and extra entities are quoted separately."],
  ["users", "Your part", "Complete, accurate information and approvals within the agreed timelines."],
  ["clock", "Support", "Business-hours support, with response times confirmed in each agreement."],
  ["shield", "Professional requirements", "Statutory audit, certification and regulated investment advice are handled only by appropriately authorised professionals."],
  ["receipt", "Fees and software", "Prices exclude GST, government fees, software subscriptions and third-party charges unless quoted."],
  ["lock", "Confidentiality", "Secure document handling and restricted access to your financial information."],
];
const AFH_FAQ_EXTRA = [
  ["How much do your accounts and finance services cost?", "Each service has three plans — Essential, Growth and Premium — shown on its page in Indian rupees, excluding GST, government and third-party fees. Plans start from ₹999 per return for ITR filing and ₹1,499 a month for GST. Complex services such as Virtual CFO, Corporate Finance Advisory and Due Diligence show starting prices that are confirmed after a scoping call."],
  ["Can I combine services?", "Yes. Two non-overlapping services receive 5% off the combined monthly fees and three receive 10%, or you can choose a ready-made bundle such as Startup Launch, Business Growth or Finance Leadership. Discounts do not stack."],
  ["What happened to the Business Valuation and Financial Modelling pages?", "Valuation analysis support is now part of Corporate Finance Advisory, and three-statement and scenario models are part of Financial Planning & Advisory. Regulated or certified valuations are carried out only by appropriately registered valuers."],
];


function AFH_Hero({ a }) {
  const min = Math.min(...AF_SVC.filter((d) => d.pr).map((d) => d.pr.a[0]));
  return (
    <section className="af-hero afh-hero" style={afVars(AFH_PAL)} aria-labelledby="afh-h1">
      <div className="af-hero__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="container af-hero__grid">
        <div className="af-hero__copy">
          <nav className="af-crumbs" aria-label="Breadcrumb"><PpL to="/services">Services</PpL><span aria-hidden="true">/</span><span aria-current="page">Accounts &amp; Finance</span></nav>
          <span className="af-eyebrow"><AF_I n="pie" s={16} />Accounts &amp; Finance</span>
          <HeroH1 id="afh-h1"><span className="af-hero__hl">Accounts &amp; Finance</span> services that bring clarity to every number</HeroH1>
          <p className="af-hero__sub">{a.intro}</p>
          <div className="af-hero__ctas">
            <a className="af-btn af-btn--gold" href={"#" + AF_FORM} onClick={ppGo(AF_FORM)}>Book a free 20-minute consultation <AF_I n="arrow" s={16} /></a>
            <a className="af-btn af-btn--ghost" href="#afh-fam" onClick={ppGo("afh-fam")}>Explore {AF_SVC.length} services</a>
          </div>
          <ul className="afh-hero__facts">
            <li><b>{AF_SVC.length}</b><span>finance services</span></li>
            <li><b>3</b><span>clear plans each</span></li>
            <li><b>{afInr(min)}</b><span>plans from</span></li>
            <li><b>20 min</b><span>free discovery call</span></li>
          </ul>
        </div>
        <div className="af-hero__stage afh-hero__stage"><AF5_HubStage /></div>
      </div>
    </section>
  );
}

function AFH_Families() {
  const [ref, v] = RC_useInView(0.1);
  const fams = Object.keys(AF_FAM);
  return (
    <section ref={ref} id="afh-fam" className={"afh-fam" + (v ? " is-in" : "")} aria-labelledby="afh-fam-h">
      <div className="container">
        <div className="af-head af-head--c">
          <span className="af-kick">Four teams of expertise</span>
          <h2 id="afh-fam-h">Every finance need, organised into four families</h2>
          <p>From daily books to boardroom decisions — choose a service to see its capabilities, process and plans.</p>
        </div>
        <div className="afh-fam__grid">
          {fams.map((f, k) => {
            const list = AF_SVC.filter((d) => d.fam === f);
            const [c1, c2] = AFH_FAMC[f];
            return (
              <div key={f} className={"afh-drawer afh-drawer--" + f} style={{ "--c1": c1, "--c2": c2, "--k": k }}>
                <div className="afh-drawer__h">
                  <span className="afh-drawer__n">{String(k + 1).padStart(2, "0")}</span>
                  <h3>{AF_FAM[f][0]}</h3>
                  <p>{AF_FAM[f][1]}</p>
                </div>
                <ul>
                  {list.map((d) => (
                    <li key={d.s} style={afVars(d)}>
                      <PpL to={afUrl(d.s)} className="afh-svc">
                        <span className="afh-svc__ic"><AF_I n={d.ic} s={18} /></span>
                        <span className="afh-svc__t"><b>{d.n}</b><small>{d.pos}</small></span>
                        <span className="afh-svc__p"><AF_Price d={d} small /></span>
                        <AF_I n="arrow" s={16} className="afh-svc__go" />
                      </PpL>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AFH_Explorer() {
  const priced = AF_SVC.filter((d) => d.pr);
  const [s, setS] = ee.useState(priced[0].s);
  const [ref, v] = RC_useInView(0.2);
  const d = afBy(s);
  const mx = Math.log10(d.pr.a[2] * 1.15);
  const h = (x) => Math.max(0.18, Math.log10(x) / mx);
  return (
    <section ref={ref} className={"afh-ex" + (v ? " is-in" : "")} style={afVars(d)} aria-labelledby="afh-ex-h">
      <div className="container afh-ex__grid">
        <div>
          <div className="af-head af-head--light">
            <span className="af-kick">Price explorer</span>
            <h2 id="afh-ex-h">Transparent plans, side by side</h2>
            <p>Pick a service to compare its Essential, Growth and Premium plans. Prices in INR, excluding GST.</p>
          </div>
          <div className="afh-ex__chips" role="radiogroup" aria-label="Choose a service">
            {priced.map((x) => (
              <button key={x.s} type="button" role="radio" aria-checked={x.s === s} className={x.s === s ? "is-on" : ""} style={afVars(x)} onClick={() => setS(x.s)}>
                <AF_I n={x.ic} s={14} />{x.t}
              </button>
            ))}
          </div>
        </div>
        <div className="afh-ex__board" aria-live="polite">
          <div className="afh-ex__title"><span className="afh-ex__ic"><AF_I n={d.ic} s={22} /></span><b>{d.n}</b>{d.pr.from && <em>starting prices</em>}</div>
          <div className="afh-ex__bars">
            {AF_TIERS.map((t, k) => (
              <div key={t + s} className={"afh-ex__bar" + (k === 1 ? " is-pop" : "")} style={{ "--h": h(d.pr.a[k]), "--k": k }}>
                <span className="afh-ex__v"><b>{afInr(d.pr.a[k])}</b><i>{AF_UNIT[d.pr.u]}</i></span>
                <span className="afh-ex__col"><i /></span>
                <span className="afh-ex__t">{t}</span>
                <small>{d.pr.best[k]}</small>
              </div>
            ))}
          </div>
          <PpL to={afUrl(d.s) } className="afh-ex__go">Compare every feature of {d.n} <AF_I n="arrow" s={14} /></PpL>
        </div>
      </div>
    </section>
  );
}

function AFH_Bundles() {
  const [ref, v] = RC_useInView(0.2);
  return (
    <section ref={ref} className={"afh-bun" + (v ? " is-in" : "")} aria-labelledby="afh-bun-h">
      <div className="container">
        <div className="af-head af-head--c">
          <span className="af-kick">Bundles</span>
          <h2 id="afh-bun-h">Better together: three ready-made bundles</h2>
          <p>Monthly bundles that combine the services businesses most often need at each stage. Limits of each underlying plan apply.</p>
        </div>
        <ul className="afh-bun__list">
          {AFH_BUNDLES.map((b, k) => (
            <li key={b.n} className={"afh-bundle" + (b.pop ? " is-pop" : "")} style={{ "--k": k }}>
              {b.pop && <span className="af-tier__pop"><AF_I n="spark" s={13} />Most popular</span>}
              <div className="afh-bundle__stack" aria-hidden="true">
                {b.s.map((x, j) => {
                  const d = afBy(x);
                  return <span key={x} style={{ ...afVars(d), "--j": j }}><AF_I n={d.ic} s={16} />{d.t}</span>;
                })}
              </div>
              <h3><AF_I n={b.ic} s={20} />{b.n}</h3>
              <p className="afh-bundle__for">{b.for}</p>
              <div className="afh-bundle__price">
                <span className="af-price"><b>{afInr(b.p)}</b><i>/month</i></span>
                <s>{afInr(b.was)}</s>
                <em>Save {afInr(b.was - b.p)} a month</em>
              </div>
              <ul>
                {b.s.map((x) => (
                  <li key={x}><AF_I n="tick" s={14} /><PpL to={afUrl(x)}>{b.tier} {afBy(x).n}</PpL></li>
                ))}
              </ul>
              <a className={"af-btn " + (b.pop ? "af-btn--gold" : "af-btn--line")} href={"#" + AF_FORM} onClick={ppGo(AF_FORM)}>Ask about {b.n}</a>
            </li>
          ))}
        </ul>
        <p className="afh-bun__note">Bundle prices exclude GST. Individual-plan totals are shown for comparison.</p>
      </div>
    </section>
  );
}

function AFH_OffersSec() {
  return (
    <section className="afh-off" aria-labelledby="afh-off-h">
      <div className="container">
        <div className="af-head af-head--c">
          <span className="af-kick">Launch offers</span>
          <h2 id="afh-off-h">A little extra when you start with us</h2>
        </div>
        <AF_Offers />
      </div>
    </section>
  );
}

function AFH_Shift({ a }) {
  const [after, setAfter] = ee.useState(true);
  return (
    <section className="afh-shift" aria-labelledby="afh-shift-h">
      <div className="container afh-shift__grid">
        <div className="af-head">
          <span className="af-kick">Why it matters</span>
          <h2 id="afh-shift-h">From chasing numbers to steering with them</h2>
          <div className="afh-shift__tog" role="group" aria-label="Compare">
            <button type="button" aria-pressed={!after} className={!after ? "is-on" : ""} onClick={() => setAfter(false)}>Without a finance partner</button>
            <button type="button" aria-pressed={after} className={after ? "is-on" : ""} onClick={() => setAfter(true)}>With Frequent Research</button>
          </div>
        </div>
        <div className={"afh-shift__card" + (after ? " is-after" : "")}>
          <div className="afh-shift__face afh-shift__face--b" aria-hidden={after}>
            <span className="afh-shift__tag"><AF_I n="cross" s={16} />The usual story</span>
            <p>{a.problem}</p>
          </div>
          <div className="afh-shift__face afh-shift__face--a" aria-hidden={!after}>
            <span className="afh-shift__tag"><AF_I n="tick" s={16} />What changes</span>
            <p>{a.solution}</p>
            <ul>{(a.benefits || []).map((b) => <li key={b}><AF_I n="tick" s={14} />{b}</li>)}</ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AFH_Terms() {
  return (
    <section className="afh-terms" aria-labelledby="afh-terms-h">
      <div className="container">
        <div className="af-head af-head--c">
          <span className="af-kick">No surprises</span>
          <h2 id="afh-terms-h">Clear commercial terms</h2>
          <p>How every engagement works — written into your proposal before work begins.</p>
        </div>
        <ul className="afh-terms__grid">
          {AFH_TERMS.map(([ic, t, d], k) => (
            <li key={t} style={{ "--k": k }}>
              <span className="afh-terms__ic"><AF_I n={ic === "plus" ? "spark" : ic} s={20} /></span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function AFH_Page({ a }) {
  usePageMeta("Accounts & Finance Services", AFH_DESC);
  dmMeta(AF_HUB, "Accounts & Finance Services India | Bookkeeping, GST, TDS, Payroll, Virtual CFO | Frequent Research", AFH_DESC);
  const faq = [...(a.faqs || []).map((f) => [f.q, f.a]), ...AFH_FAQ_EXTRA];
  useJsonLd("afh", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Accounts & Finance Services",
        description: AFH_DESC,
        url: `${location.origin}${AF_HUB}`,
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        mainEntity: { "@type": "ItemList", itemListElement: AF_SVC.map((d, k) => ({ "@type": "ListItem", position: k + 1, name: d.n, url: `${location.origin}${afUrl(d.s)}` })) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${location.origin}/services` },
          { "@type": "ListItem", position: 3, name: "Accounts & Finance", item: `${location.origin}${AF_HUB}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map(([q, an]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: an } })) },
    ],
  });
  const proc = { pal: AFH_PAL.pal, steps: (a.process || []).map((p) => p.t) };
  return (
    <div className="af-page af-page--hub">
      <AFH_Hero a={a} />
      <AFH_Families />
      <AFH_Explorer />
      <AFH_Bundles />
      <AFH_OffersSec />
      <AFH_Shift a={a} />
      {proc.steps.length > 0 && <AF_Process d={proc} />}
      <AFH_Terms />
      <DM_Faq id="afh-faq" title="Accounts & Finance: frequently asked questions" items={faq} />
      <AF_Final />
      <AF_FormBlock />
    </div>
  );
}

export { AFH_Page };
