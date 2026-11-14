/*
 * Accounts & Finance service pages — build 63. Prefix AG_ (sections), AF_ (shared helpers also used by the hub).
 * Styles: src/styles/af63.css (ag- / agl- / agv-), hub styles stay in src/styles/accounts-finance.css (af- / afh-).
 *
 * Each of the 17 services renders AFS_Page (routed by scripts/overlay.config.js → afRoutes, URLs unchanged:
 * /services/accounts-finance/<slug>). Content lives in src/data/AccountsFinance63{a,b,c,d}.jsx (AGS[slug]); prices,
 * comparison rows and the catalogue activity lists stay in src/data/AccountsFinance.jsx (AF_SVC).
 * Every service has its own creative concept (g.th): palette, typography, hero visual (AGV_*, AccountsFinanceVisuals.jsx),
 * signature lab (AGL_*, AccountsFinanceLabs.jsx) and its own variant of each section, chosen by data (mode keys).
 *
 * Rules kept from the briefs: nothing promises savings, refunds, approvals, turnaround times or results; illustrative
 * visuals say so; essential text never depends on hover; the enquiry form only shows success after the server confirms.
 * Motion: transform / opacity loops only, inside <section>s (paused off screen by the motion governor); reduced motion
 * shows the still composition.
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { navGo } from '../app/nav.jsx';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { phoneDialCode } from '../app/shared/CoreParts.jsx';
import { RC_useInView } from '../app/shared/Reveal.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { FM_Area, FM_Check, FM_Chips, FM_Input, FM_PRIV, FM_Phone, FM_Success, fmNextUid, fmPost, fmUse } from '../app/shared/Forms.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Form, PpL, dmMeta, ppGo } from '../components/dm/shared.jsx';
import { React_Frag } from '../components/dm/ixkit.jsx';
import { AF_SVC } from '../data/AccountsFinance.jsx';
import { AGS, AG_OFFER_NOTE } from '../data/AccountsFinance63a.jsx';
import { AGL_Brief, AGL_Docs, AGL_LABS } from './AccountsFinanceLabs.jsx';
import { AGV } from './AccountsFinanceVisuals.jsx';
import { X4_Body } from './AccountsFinance64.jsx';
import { AF5_Body } from './AccountsFinance65.jsx';
import { FMV } from '../app/shared/SiteEffects.jsx';

const AF_HUB = "/services/accounts-finance";
const AF_PARENT = ["Accounts & Finance", AF_HUB];
const afUrl = (s) => `${AF_HUB}/${s}`;
const AF_MOVED = { "business-valuation": "corporate-finance-advisory", "financial-modelling": "financial-planning-and-advisory" };
const afBy = (s) => AF_SVC.find((x) => x.s === s);
const afInr = (n) => "₹" + Number(n).toLocaleString("en-IN");
const AF_UNIT = { month: "/month", year: "/year", return: "/return", project: "/project" };
const AF_TIERS = ["Essential", "Growth", "Premium"];
const AF_FORM = "af-form";

/* removed services → their new home (in-app; the static build answers with a 301) */
function AF_Redirect({ to }) {
  ee.useEffect(() => {
    navGo(to, true);
  }, [to]);
  return null;
}

/* ---------- icons (24 grid, stroke) ---------- */
const AF_P = {
  ledger: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7M8 11h7M8 15h4",
  shield: "M12 3l7 3v6c0 4.5-3 7.6-7 9-4-1.4-7-4.5-7-9V6zM9 12l2 2 4-4",
  form: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h4M10 9h2",
  receipt: "M6 3h12v18l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5L6 21zM9 8h6M9 12h6M9 16h3",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v5M16 3v5M8 14h3",
  people: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM3 20c0-3.3 2.7-6 6-6s6 2.7 6 6M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14c2 .7 3 2.8 3 6",
  compass: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM15.5 8.5l-2 5-5 2 2-5z",
  bank: "M3 9l9-5 9 5M5 10v7M9.5 10v7M14.5 10v7M19 10v7M3 20h18",
  rocket: "M12 3c3 2 4.5 5 4.5 9l-2 4h-5l-2-4c0-4 1.5-7 4.5-9zM12 9.5a1.5 1.5 0 1 0 0-.1M9.5 16l-2 4 3-1.5M14.5 16l2 4-3-1.5",
  dash: "M3 4h18v12H3zM8 20h8M12 16v4M7 12v-2M11 12V8M15 12v-3",
  bars: "M4 20h16M6 17v-5M10 17V8M14 17v-7M18 17V5",
  check: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6",
  gauge: "M4 17a8 8 0 1 1 16 0M12 17l4-5M7 17h1M16 17h1M12 9v1",
  pie: "M12 3v9h9a9 9 0 1 1-9-9zM15 3.5A9 9 0 0 1 20.5 9H15z",
  coins: "M8 8c3 0 5-1 5-2s-2-2-5-2-5 1-5 2 2 2 5 2zM3 6v8c0 1 2 2 5 2M13 6v3M3 10c0 1 2 2 5 2M16 20c3 0 5-1 5-2v-6c0-1-2-2-5-2s-5 1-5 2v6c0 1 2 2 5 2zM11 15c0 1 2 2 5 2s5-1 5-2",
  lens: "M10.5 18a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15zM16 16l5 5M7.5 10.5h6",
  gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
  tick: "M5 12.5l4.5 4.5L19 7",
  cross: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  gift: "M4 10h16v10H4zM3 7h18v3H3zM12 7v13M12 7c-1.5-3-5-3-5-1s3 1 5 1zm0 0c1.5-3 5-3 5-1s-3 1-5 1z",
  percent: "M19 5L5 19M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  doc: "M7 3h10v18H7zM10 8h4M10 12h4M10 16h2",
  users: "M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM2 20c0-3 2.7-5 6-5s6 2 6 5M14 15.3c.6-.2 1.3-.3 2-.3 3.3 0 6 2 6 5",
  building: "M5 21V4h10v17M15 9h4v12M8 8h1M11 8h1M8 12h1M11 12h1M8 16h1M11 16h1M3 21h18",
  rupee: "M7 4h10M7 8h10M7 4c5 0 7 1.5 7 4s-2.5 4-7 4l7 8",
  phone: "M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  parcel: "M3 7l9-4 9 4v10l-9 4-9-4zM3 7l9 4 9-4M12 11v10M7.5 5l9 4",
  factory: "M3 21V10l5 3V10l5 3V10l5 3V4h3v17zM7 17h2M12 17h2M17 17h2",
  store: "M4 9l1.5-5h13L20 9M4 9h16v2a3 3 0 0 1-5.3 2 3 3 0 0 1-5.4 0A3 3 0 0 1 4 11zM5 13v8h14v-8M10 21v-5h4v5",
  route: "M6 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM18 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 15V9a3 3 0 0 1 3-3h4M18 9v6a3 3 0 0 1-3 3h-4",
  truck: "M2 6h12v10H2zM14 9h4l3 3v4h-7M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z",
  case: "M3 8h18v12H3zM9 8V5h6v3M3 13h18",
  nodes: "M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM5 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM19 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM12 7v5M12 12l-6 4M12 12l6 4",
  med: "M9 3h6v6h6v6h-6v6H9v-6H3V9h6z",
  bed: "M3 18V6M3 13h18v5M21 18v-5a3 3 0 0 0-3-3h-7v3M7 11.5a1.5 1.5 0 1 0 0-.1",
  ship: "M4 15l2 5h12l2-5H4zM6 15V9h12v6M12 4v5M9 9V6h6v3",
  growth: "M3 20h18M5 16l5-5 3 3 6-7M15 7h4v4",
  target: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM12 12h.01",
  scale: "M12 4v16M5 20h14M4 8h16M7 8l-3 6a3 3 0 0 0 6 0zM17 8l-3 6a3 3 0 0 0 6 0z",
};
function AF_I({ n, s = 20, className }) {
  return (
    <svg className={"af-ic" + (className ? " " + className : "")} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={AF_P[n] || AF_P.spark} />
    </svg>
  );
}
const afVars = (d) => ({ "--c1": d.pal[0], "--c2": d.pal[1], "--c0": d.pal[2] });

/* ---------- prices ---------- */
function AF_Price({ d, k, small, noFrom }) {
  const p = d.pr;
  if (!p) return <span className="af-price af-price--q">Custom quote</span>;
  return (
    <span className={"af-price" + (small ? " af-price--sm" : "")}>
      {p.from && !noFrom && <em>Starting from</em>}
      <b>{afInr(p.a[k || 0])}</b>
      <i>{AF_UNIT[p.u] || ""}</i>
    </span>
  );
}
const agPriceTxt = (d, k) => (!d.pr ? "Custom quote" : (d.pr.from ? "Starting from " : "") + afInr(d.pr.a[k || 0]) + AF_UNIT[d.pr.u]);

/* ---------- prefill: any CTA can pre-select the plan / areas / note in the enquiry form ---------- */
function agPrefill(detail) {
  try {
    window.__agPre = detail;
    window.dispatchEvent(new CustomEvent("ag-prefill", { detail }));
  } catch (e) {}
}
const agPick = (detail) => (e) => {
  agPrefill(detail || {});
  ppGo(AF_FORM)(e);
};
const agTo = (id) => (e) => ppGo(id)(e);

/* ---------- small shared pieces ---------- */
function AG_Head({ k, h, p, id, center, children }) {
  return (
    <div className={"ag-head" + (center ? " ag-head--c" : "")}>
      {k && <span className="ag-kick">{k}</span>}
      <h2 id={id}>{h}</h2>
      {p && <p>{p}</p>}
      {children}
    </div>
  );
}
function AG_Sec({ id, cls, hid, children, inView = true }) {
  const [ref, v] = RC_useInView(0.12);
  return (
    <section ref={ref} id={id} className={"ag-sec " + cls + (v || !inView ? " is-in" : "")} aria-labelledby={hid}>
      {children}
    </section>
  );
}
const AG_IND_IC = [
  [/startup|founder|entrepreneur|early-stage/i, "rocket"],
  [/manufactur/i, "factory"],
  [/e-?commerce|online/i, "parcel"],
  [/retail/i, "store"],
  [/wholesale|distribut/i, "route"],
  [/logistic/i, "truck"],
  [/export|import/i, "ship"],
  [/\bit\b|tech|saas|software/i, "nodes"],
  [/health/i, "med"],
  [/hospitality/i, "bed"],
  [/construct|real estate/i, "building"],
  [/professional|consult|agenc|freelanc|self-employ|independent/i, "case"],
  [/educat/i, "doc"],
  [/financ|investor|capital gain/i, "bank"],
  [/multi|enterprise|large|scaling/i, "layers"],
  [/salar|employee|bpo|team|founder-led/i, "people"],
  [/small|sme|msme|medium|growing/i, "growth"],
  [/project/i, "calendar"],
  [/income source/i, "layers"],
];
const agIndIc = (n) => (AG_IND_IC.find(([re]) => re.test(n)) || [0, "target"])[1];
const agSplitHl = (t, hl) => {
  const i = hl ? t.indexOf(hl) : -1;
  return i < 0 ? t : (
    <>
      {t.slice(0, i)}
      <span className="ag-hl">{hl}</span>
      {t.slice(i + hl.length)}
    </>
  );
};
const AG_FLOW_TH = { ledger: 1, observatory: 1, journey: 1, tds: 1, blueprint: 1, studio: 1, archive: 1 };

/* ================= Hero ================= */
function AG_Hero({ g, d }) {
  const H = g.hero;
  const V = AGV[g.th] || null;
  const flow = AG_FLOW_TH[g.th];
  return (
    <section className="ag-hero" aria-labelledby="ag-h1">
      <div className="ag-hero__bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container ag-hero__grid">
        <div className="ag-hero__copy">
          <nav className="ag-crumbs" aria-label="Breadcrumb">
            <PpL to="/services">Services</PpL>
            <span aria-hidden="true">/</span>
            <PpL to={AF_HUB}>Accounts &amp; Finance</PpL>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{d.n}</span>
          </nav>
          <span className="ag-eb">
            <i aria-hidden="true">
              <AF_I n={d.ic} s={15} />
            </i>
            {H.eb}
          </span>
          <HeroH1 id="ag-h1">{agSplitHl(H.h1, H.hl)}</HeroH1>
          <p className="ag-hero__sub">{H.sub}</p>
          {H.body && <p className="ag-hero__body">{H.body}</p>}
          <div className="ag-hero__ctas">
            <a className="ag-btn ag-btn--ac ag-btn--lg" href={"#" + AF_FORM} onClick={agPick({})}>
              Book a Free 20-Minute Consultation <AF_I n="arrow" s={17} />
            </a>
            <a className="ag-btn ag-btn--ghost ag-btn--lg" href="#ag-plans" onClick={agTo("ag-plans")}>
              {H.c2 || "See Plans & Pricing"}
            </a>
          </div>
          <div className="ag-hero__price">
            <b>{H.price}</b>
            {H.pnote && <small>{H.pnote}</small>}
          </div>
          {H.trust && <p className="ag-hero__trust">{H.trust}</p>}
          {H.micro && (
            <ul className={"ag-hero__micro" + (flow ? " is-flow" : "")} aria-label={flow ? "How the work flows" : "Highlights"}>
              {H.micro.map((m, k) => (
                <li key={m} style={{ "--k": k }}>
                  {m}
                </li>
              ))}
            </ul>
          )}
          {H.goals && (
            <ul className="ag-hero__goals">
              {H.goals.map((m) => (
                <li key={m}>
                  <AF_I n="target" s={14} />
                  {m}
                </li>
              ))}
            </ul>
          )}
          {H.microNote && <p className="ag-hero__fine">{H.microNote}</p>}
          {H.note && <p className="ag-hero__quote">{H.note}</p>}
        </div>
        <div className="ag-hero__stage">
          {V && <V g={g} d={d} />}
          <p className="ag-hero__cap">
            <AF_I n="flag" s={12} />
            {H.cap}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ================= Facts strip ================= */
function AG_Facts({ g }) {
  const F = g.facts;
  return (
    <AG_Sec cls="ag-facts" hid="ag-facts-h">
      <div className="container">
        <h2 id="ag-facts-h" className={F.h ? "ag-facts__h" : "af-sr"}>
          {F.h || "The service at a glance"}
        </h2>
        <ul className="ag-facts__list">
          {F.items.map(([n, t], k) => (
            <li key={t} style={{ "--k": k }}>
              <b translate="no">{n}</b>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        {F.note && <p className="ag-facts__note">{F.note}</p>}
      </div>
    </AG_Sec>
  );
}

/* ITR readiness strip */
function AG_Strip({ g }) {
  const S = g.strip;
  return (
    <AG_Sec cls="ag-strip" hid="ag-strip-h">
      <div className="container">
        <div className="ag-strip__top">
          <h2 id="ag-strip-h">{S.h}</h2>
          <span className="agl-tag">{S.label}</span>
        </div>
        <ol className="ag-strip__route">
          {S.stages.map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              <span>{k + 1}</span>
              {t}
            </li>
          ))}
        </ol>
        <ul className="ag-facts__list ag-strip__facts">
          {S.facts.map(([n, t]) => (
            <li key={t}>
              <b translate="no">{n}</b>
              <span>{t}</span>
            </li>
          ))}
        </ul>
        <p className="ag-facts__note">{S.note}</p>
      </div>
    </AG_Sec>
  );
}

/* ================= Problems ================= */
function AG_Motif({ m }) {
  return (
    <span className={"agm agm--" + m} aria-hidden="true">
      <i />
      <i />
      <i />
      <i />
    </span>
  );
}
function AG_Prob({ g }) {
  const P = g.prob;
  const [on, setOn] = ee.useState(0);
  const L = P.L || ["The challenge", "How we help", "Value"];
  const sel = P.mode === "select" || P.mode === "split";
  const body = (it) => (
    <>
      <p className="ag-prob__p">
        <em>{L[0]}</em>
        {it[1]}
      </p>
      <p className="ag-prob__a">
        <em>{L[1]}</em>
        {it[2]}
      </p>
      {it[3] && (
        <p className="ag-prob__v">
          <em>{L[2]}</em>
          {it[3]}
        </p>
      )}
    </>
  );
  return (
    <AG_Sec cls={"ag-prob ag-prob--" + P.mode + (P.dark ? " is-dark" : "")} hid="ag-prob-h">
      <div className="container">
        <AG_Head k={P.k !== P.h ? P.k : null} h={P.h} p={P.p} id="ag-prob-h" />
        {sel ? (
          <div className="ag-prob__sel" style={{ "--n": P.items.length }}>
            {P.items.map((it, k) => (
              <div key={it[0]} className="ag-prob__it">
                <button type="button" id={"ag-pb" + k} className={"ag-prob__btn" + (on === k ? " is-on" : "")} aria-expanded={on === k} aria-controls={"ag-pp" + k} onClick={() => setOn(k)}>
                  <span className="ag-prob__n">{String(k + 1).padStart(2, "0")}</span>
                  <b>{it[0]}</b>
                </button>
                <div id={"ag-pp" + k} className={"ag-prob__panel" + (on === k ? "" : " is-off")} role="region" aria-labelledby={"ag-pb" + k}>
                  <h3>{it[0]}</h3>
                  {body(it)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <ul className="ag-prob__grid">
            {P.items.map((it, k) => (
              <li key={it[0]} style={{ "--k": k }} className={k === 0 && P.mode === "feature" ? "is-feat" : ""}>
                {P.motifs && <AG_Motif m={P.motifs[k]} />}
                <span className="ag-prob__n">{String(k + 1).padStart(2, "0")}</span>
                <h3>{it[0]}</h3>
                {body(it)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </AG_Sec>
  );
}

/* ================= Capabilities ================= */
function AG_Caps({ g, d }) {
  const C = g.caps;
  const [on, setOn] = ee.useState(0);
  const list = C.list.map((c, i) => ({ i, n: c[0], c: c[1], desc: c[2], acts: Array.isArray(c[3]) ? c[3] : c[3] === null ? (d.caps[i] ? d.caps[i][1] : null) : null, own: Array.isArray(c[3]), sum: c[3] === "summary" }));
  const seq = C.groups ? C.groups.flatMap(([gl, ix], gi) => [{ gl, gi }].concat(ix.map((i) => list[i]))) : list;
  const total = list.reduce((n, x) => n + x.c, 0);
  const btns = ee.useRef([]);
  const order = seq.filter((x) => !x.gl).map((x) => x.i);
  const key = (e, i) => {
    const p = order.indexOf(i);
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let t = null;
    if (map[e.key]) t = order[(p + map[e.key] + order.length) % order.length];
    else if (e.key === "Home") t = order[0];
    else if (e.key === "End") t = order[order.length - 1];
    if (t == null) return;
    e.preventDefault();
    setOn(t);
    btns.current[t] && btns.current[t].focus();
  };
  return (
    <AG_Sec cls={"ag-caps ag-caps--" + C.mode} hid="ag-caps-h">
      <div className="container">
        <AG_Head k="Capabilities" h={C.h} p={C.p} id="ag-caps-h">
          <p className="ag-caps__sum">
            <b>{list.length}</b> capability areas · <b>{total}</b> listed activities
          </p>
        </AG_Head>
        <div className="ag-caps__grid">
          {seq.map((x) =>
            x.gl ? (
              <span key={"g" + x.gi} className="ag-caps__grp" aria-hidden="true">
                <i>{String.fromCharCode(65 + x.gi)}</i>
                {x.gl}
              </span>
            ) : (
              <div key={x.i} className="ag-caps__it">
                <button type="button" ref={(el) => (btns.current[x.i] = el)} id={"ag-cb" + x.i} className={"ag-caps__btn" + (on === x.i ? " is-on" : "")} aria-expanded={on === x.i} aria-controls={"ag-cp" + x.i} onClick={() => setOn(x.i)} onKeyDown={(e) => key(e, x.i)}>
                  <span className="ag-caps__no">{String(x.i + 1).padStart(2, "0")}</span>
                  <span className="ag-caps__t">{x.n}</span>
                  <span className="ag-caps__c" aria-label={x.c + " activities"}>
                    {x.c}
                  </span>
                </button>
                <div id={"ag-cp" + x.i} role="region" aria-labelledby={"ag-cb" + x.i} className={"ag-caps__panel" + (on === x.i ? "" : " is-off")}>
                  <div className="ag-caps__ph">
                    <span className="ag-caps__big" aria-hidden="true">
                      {String(x.i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3>{x.n}</h3>
                      <span className="ag-caps__badge">{x.c} activities</span>
                    </div>
                  </div>
                  <p className="ag-caps__d">{x.desc}</p>
                  {x.acts && (
                    <>
                      <p className="ag-caps__lt">{x.own ? "Activities" : "Activities in our service catalogue"}</p>
                      <ul className="ag-caps__acts">
                        {x.acts.map((a, j) => (
                          <li key={a} style={{ "--j": j }}>
                            <AF_I n="tick" s={14} />
                            {a}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                  {x.sum && <p className="ag-caps__lt">Capability summary — the detailed activity list is confirmed during the engagement.</p>}
                  <p className="ag-caps__scope">
                    <AF_I n="flag" s={13} />
                    {C.out ? C.out + " " : ""}Activities included in your engagement depend on the selected plan and written scope.
                  </p>
                  <a className="ag-link" href={"#" + AF_FORM} onClick={agPick({ areas: [x.n] })}>
                    {x.i === 0 ? "Discuss " + x.n : "Discuss This Requirement"} <AF_I n="arrow" s={14} />
                  </a>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </AG_Sec>
  );
}

/* ================= Principles (bookkeeping model, tax approach) ================= */
function AG_Principles({ g }) {
  const P = g.principles;
  const [on, setOn] = ee.useState(0);
  return (
    <AG_Sec cls={"ag-prin" + (P.route ? " ag-prin--route" : "")} hid="ag-prin-h">
      <div className="container">
        <AG_Head k={P.k} h={P.h} id="ag-prin-h" />
        {P.flow && (
          <div className="ag-prin__flow" aria-label="How records move through the workflow">
            <ol>
              {P.flow.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
            <div className="ag-prin__layer">
              <em>{P.layerT}</em>
              {P.layer.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        )}
        {P.route ? (
          <div className="ag-prin__route">
            <div className="ag-prin__nodes" role="tablist" aria-label="Principles">
              {P.items.map(([t], k) => (
                <button key={t} type="button" role="tab" id={"ag-pr" + k} aria-selected={on === k} aria-controls="ag-prp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                  <span>{String(k + 1).padStart(2, "0")}</span>
                  <b>{t}</b>
                </button>
              ))}
            </div>
            <div className="ag-prin__panel" role="tabpanel" id="ag-prp" aria-labelledby={"ag-pr" + on} aria-live="polite">
              <span className="ag-prin__no">Principle {String(on + 1).padStart(2, "0")}</span>
              <h3>{P.items[on][0]}</h3>
              <p>{P.items[on][1]}</p>
            </div>
          </div>
        ) : (
          <ol className="ag-prin__list">
            {P.items.map(([t, p], k) => (
              <li key={t} style={{ "--k": k }}>
                <span>{String(k + 1).padStart(2, "0")}</span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ol>
        )}
      </div>
    </AG_Sec>
  );
}

/* ================= Responsible AI / technology ================= */
function AG_Ai({ g }) {
  const A = g.ai;
  const [on, setOn] = ee.useState(0);
  return (
    <AG_Sec cls="ag-ai" hid="ag-ai-h">
      <div className="container">
        <AG_Head k={A.k} h={A.h} p={A.p} id="ag-ai-h" />
        <ul className="ag-ai__grid">
          {A.items.map(([ic, t, p], k) => (
            <li key={t} style={{ "--k": k }}>
              <span className="ag-ai__ic">
                <AF_I n={ic} s={22} />
              </span>
              <h3>{t}</h3>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        {A.flow && (
          <ol className="ag-ai__flow" aria-label="From documents to return preparation">
            {A.flow.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        )}
        {A.map && (
          <div className="ag-ai__map">
            <div className="ag-ai__mnav" role="tablist" aria-label="Scenario map">
              {A.map.map(([t], k) => (
                <button key={t} type="button" role="tab" aria-selected={on === k} aria-controls="ag-aimp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                  <span>{k + 1}</span>
                  {t}
                </button>
              ))}
            </div>
            <div className="ag-ai__mp" id="ag-aimp" role="tabpanel" aria-live="polite">
              <p>
                <em>What happens</em>
                {A.map[on][1]}
              </p>
              <p>
                <em>How it is checked</em>
                {A.map[on][2]}
              </p>
            </div>
          </div>
        )}
        <p className="ag-ai__note">
          <AF_I n="shield" s={16} />
          {A.note}
        </p>
      </div>
    </AG_Sec>
  );
}

/* ================= Process ================= */
function AG_Proc({ g }) {
  const P = g.proc;
  const [on, setOn] = ee.useState(0);
  const mode = P.mode;
  const base = mode === "select" ? "select" : mode === "cycle" ? "cycle" : mode === "trail" || mode === "agenda" ? "trail" : "rail";
  const n = P.steps.length;
  const L = P.L || [];
  const phaseOf = (k) => (P.phases ? P.phases.filter(([, i]) => i <= k).slice(-1)[0] : null);
  return (
    <AG_Sec cls={"ag-proc ag-proc--" + base + " ag-proc--" + mode} hid="ag-proc-h">
      <div className="container">
        <AG_Head k={n + "-step process"} h={P.h} p={P.p} id="ag-proc-h" />
        {base === "select" ? (
          <div className="ag-proc__sel" style={{ "--n": n }}>
            {P.steps.map((s, k) => (
              <div key={s[0]} className="ag-proc__it">
                <button type="button" id={"ag-sb" + k} className={"ag-proc__btn" + (on === k ? " is-on" : "") + (k < on ? " is-past" : "")} aria-expanded={on === k} aria-controls={"ag-sp" + k} onClick={() => setOn(k)}>
                  <span className="ag-proc__dot">{k + 1}</span>
                  <b>{s[0]}</b>
                </button>
                <div id={"ag-sp" + k} role="region" aria-labelledby={"ag-sb" + k} className={"ag-proc__panel" + (on === k ? "" : " is-off")}>
                  <span className="ag-proc__meta">
                    Stage {k + 1} of {n}
                  </span>
                  <h3>{s[0]}</h3>
                  <dl>
                    <div>
                      <dt>{L[0] || "What happens"}</dt>
                      <dd>{s[1]}</dd>
                    </div>
                    {(s[2] || []).map((x, j) => (
                      <div key={j}>
                        <dt>{L[j + 1]}</dt>
                        <dd>{x}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
          </div>
        ) : base === "cycle" ? (
          <div className="ag-proc__cyc">
            <ol className="ag-proc__ring" style={{ "--n": n }}>
              {P.steps.map((s, k) => (
                <li key={s[0]} style={{ "--k": k }}>
                  <span>{k + 1}</span>
                  <b>{s[0]}</b>
                </li>
              ))}
            </ol>
            <div className="ag-proc__core" aria-hidden="true">
              <b>Monthly</b>
              <span>payroll cycle</span>
            </div>
          </div>
        ) : (
          <ol className="ag-proc__track" style={{ "--n": n }}>
            {P.steps.map((s, k) => {
              const ph = phaseOf(k);
              return (
                <li key={s[0]} style={{ "--k": k }} className={ph && ph[1] === k ? "is-ph" : ""}>
                  {ph && ph[1] === k && <em className="ag-proc__ph">{ph[0]}</em>}
                  <span className="ag-proc__dot">{String(k + 1).padStart(2, "0")}</span>
                  <b>{s[0]}</b>
                  {s[1] && <p>{s[1]}</p>}
                </li>
              );
            })}
          </ol>
        )}
        {P.resp && (
          <ul className="ag-proc__resp">
            {P.resp.map(([w, t], k) => (
              <li key={k}>
                <b>{w}</b>
                {t}
              </li>
            ))}
          </ul>
        )}
        {P.note && (
          <p className="ag-note">
            <AF_I n="flag" s={14} />
            {P.note}
          </p>
        )}
      </div>
    </AG_Sec>
  );
}

/* ================= Plans & pricing ================= */
function AG_Tip({ t, p }) {
  const [o, setO] = ee.useState(false);
  const id = "ag-tip-" + t.replace(/\W+/g, "").toLowerCase();
  return (
    <span className={"ag-tip" + (o ? " is-on" : "")}>
      <button type="button" aria-expanded={o} aria-controls={id} onClick={() => setO((x) => !x)} onBlur={() => setO(false)}>
        {t} <i aria-hidden="true">?</i>
      </button>
      <span id={id} role="note" className={o ? "" : "is-off"}>
        {p}
      </span>
    </span>
  );
}
function AG_Cell({ v }) {
  if (v === "✓")
    return (
      <span className="ag-y">
        <AF_I n="tick" s={16} />
        <span className="af-sr">Included</span>
      </span>
    );
  if (v === "—")
    return (
      <span className="ag-n">
        —<span className="af-sr">Not included</span>
      </span>
    );
  return <span>{v}</span>;
}
function AG_Cmp({ g, d, names }) {
  const [all, setAll] = ee.useState(false);
  const p = d.pr;
  const rows = [[p.u === "return" ? "Price per return" : "Price", ...p.a.map((x) => (p.from ? "From " : "") + afInr(x) + AF_UNIT[p.u])]].concat(p.rows, g.plans.addRows || []);
  return (
    <div className="ag-cmp">
      <button type="button" className="ag-cmp__btn" aria-expanded={all} aria-controls="ag-cmp-t" onClick={() => setAll((x) => !x)}>
        {all ? "Hide the full comparison" : "Compare All Features"} <AF_I n="arrow" s={14} className={all ? "is-up" : ""} />
      </button>
      <div id="ag-cmp-t" className={"ag-cmp__wrap" + (all ? "" : " is-off")}>
        <table className="ag-cmp__t">
          <caption className="af-sr">{d.n}: plan comparison</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {names.map((t, k) => (
                <th key={t} scope="col" className={k === 1 ? "is-pop" : ""}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                <th scope="row">{r[0]}</th>
                {[1, 2, 3].map((k) => (
                  <td key={k} data-l={names[k - 1]} className={k === 2 ? "is-pop" : ""}>
                    <AG_Cell v={r[k]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className="ag-cmp__f">Plan comparison from our published service packages. Anything not listed is confirmed in your engagement scope.</p>
      </div>
    </div>
  );
}
function AG_Tier({ g, d, k, names, cls }) {
  const P = g.plans,
    p = d.pr;
  return (
    <article className={"ag-tier ag-tier--" + k + (k === 1 ? " is-pop" : "") + (cls ? " " + cls : "")} aria-labelledby={"ag-tier-" + k} style={{ "--k": k }}>
      {k === 1 && (
        <span className="ag-tier__pop">
          <AF_I n="spark" s={13} />
          Most popular
        </span>
      )}
      <h3 id={"ag-tier-" + k}>{names[k]}</h3>
      <p className="ag-tier__best">{P.best[k]}</p>
      <div className="ag-tier__price">
        {p.from && <em>Starting from</em>}
        <b translate="no">{afInr(p.a[k])}</b>
        <i>{AF_UNIT[p.u]}</i>
        <small>+ applicable GST</small>
        {P.monthly && <small className="ag-tier__eq">≈ {afInr((p.a[k] / 12).toFixed(2))}/month equivalent, for comparison only</small>}
      </div>
      <ul>
        {P.inc[k].map((x) => (
          <li key={x}>
            <AF_I n="tick" s={15} />
            <span>{x}</span>
          </li>
        ))}
      </ul>
      <a className={"ag-btn " + (k === 1 ? "ag-btn--ac" : "ag-btn--line")} href={"#" + AF_FORM} onClick={agPick({ plan: k })}>
        Choose {AF_TIERS[k]}
      </a>
    </article>
  );
}
function AG_Plans({ g, d }) {
  const P = g.plans;
  const p = d.pr;
  const [sel, setSel] = ee.useState(1);
  const [vol, setVol] = ee.useState(null);
  const [sit, setSit] = ee.useState(null);
  if (P.mode === "quote" || !p) return <AG_Quote g={g} d={d} />;
  const names = P.names || AF_TIERS;
  const spectrum = P.mode === "spectrum" || P.mode === "selector";
  const sitHit = sit != null ? P.sit.opts[sit] : null;
  return (
    <AG_Sec id="ag-plans" cls={"ag-plans ag-plans--" + P.mode + (spectrum ? " ag-plans--sp" : "")} hid="ag-plans-h">
      <div className="container">
        <AG_Head k="Plans & pricing" h={P.h} p={P.p} id="ag-plans-h" center={!spectrum} />
        {P.tips && (
          <p className="ag-plans__tips">
            Terms:{" "}
            {P.tips.map(([t, x]) => (
              <AG_Tip key={t} t={t} p={x} />
            ))}
          </p>
        )}
        {spectrum ? (
          <div className="ag-spec">
            {P.vol && (
              <fieldset className="ag-spec__vol">
                <legend>{P.vol.q}</legend>
                <div>
                  {P.vol.opts.map(([t, z], k) => (
                    <button key={t} type="button" className={"agl-chip" + (vol === k ? " is-on" : "")} aria-pressed={vol === k} onClick={() => (setVol(k), z >= 0 && setSel(z))}>
                      {t}
                    </button>
                  ))}
                </div>
                {vol != null && P.vol.opts[vol][1] < 0 && (
                  <p className="ag-spec__msg" role="status">
                    {P.vol.more}{" "}
                    <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Transaction volume: more than 600 per month." })}>
                      Request a tailored quote
                    </a>
                  </p>
                )}
                <small>{P.vol.note}</small>
              </fieldset>
            )}
            {P.sit && (
              <fieldset className="ag-spec__vol">
                <legend>{P.sit.q}</legend>
                <div>
                  {P.sit.opts.map(([t], k) => (
                    <button key={t} type="button" className={"agl-chip" + (sit === k ? " is-on" : "")} aria-pressed={sit === k} onClick={() => (setSit(k), P.sit.opts[k][1].length && setSel(P.sit.opts[k][1][0]))}>
                      {t}
                    </button>
                  ))}
                </div>
                {sitHit && (
                  <p className="ag-spec__msg" role="status">
                    {sitHit[2]}{" "}
                    {!sitHit[1].length && (
                      <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Filing situation: " + sitHit[0] + "." })}>
                        Discuss My Filing Requirements
                      </a>
                    )}
                  </p>
                )}
                <small>{P.sit.note}</small>
              </fieldset>
            )}
            <div className="ag-spec__scale" role="radiogroup" aria-label="Plans">
              <i className="ag-spec__rail" aria-hidden="true">
                <s style={{ transform: `translateX(${sel * 100}%)` }} />
              </i>
              {names.map((t, k) => (
                <button key={t} type="button" role="radio" aria-checked={sel === k} className={"ag-spec__z ag-spec__z--" + k + (sel === k ? " is-on" : "") + (sitHit && sitHit[1].includes(k) ? " is-hint" : "")} onClick={() => setSel(k)}>
                  <span>{t}</span>
                  <b translate="no">{afInr(p.a[k])}</b>
                  <em>{AF_UNIT[p.u]}</em>
                  {k === 1 && <small>Most popular</small>}
                </button>
              ))}
            </div>
            <AG_Tier g={g} d={d} k={sel} names={names} cls="ag-tier--panel" key={sel} />
          </div>
        ) : (
          <div className="ag-tiers">
            {[0, 1, 2].map((k) => (
              <AG_Tier key={k} g={g} d={d} k={k} names={names} />
            ))}
          </div>
        )}
        {P.tailored && (
          <p className="ag-plans__tail">
            {P.tailored}{" "}
            <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Tailored requirement." })}>
              Discuss a Tailored Requirement <AF_I n="arrow" s={13} />
            </a>
          </p>
        )}
        <AG_Cmp g={g} d={d} names={names} />
        <p className="ag-note ag-note--c">
          <AF_I n="flag" s={14} />
          {P.note || "Prices exclude GST and applicable government or third-party fees. Final scope is confirmed in writing."}
        </p>
      </div>
    </AG_Sec>
  );
}
function AG_Quote({ g, d }) {
  const P = g.plans;
  return (
    <AG_Sec id="ag-plans" cls="ag-plans ag-plans--quote" hid="ag-plans-h">
      <div className="container">
        <AG_Head k="How pricing works" h={P.h} p={P.p} id="ag-plans-h" />
        <div className="ag-quote">
          <div className="ag-quote__main">
            <span className="ag-quote__tag">Custom quote · written before work begins</span>
            <ol className="ag-quote__f">
              {P.factors.map(([t, p], k) => (
                <li key={t} style={{ "--k": k }}>
                  <span>{String(k + 1).padStart(2, "0")}</span>
                  <b>{t}</b>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
            <a className="ag-btn ag-btn--ac ag-btn--lg" href={"#" + AF_FORM} onClick={agPick({ plan: 0 })}>
              {P.cta} <AF_I n="arrow" s={16} />
            </a>
          </div>
          <div className="ag-quote__side">
            <h3>What happens before you commit?</h3>
            <ul>
              {P.before.map((t) => (
                <li key={t}>
                  <AF_I n="tick" s={15} />
                  {t}
                </li>
              ))}
            </ul>
            {P.also.map(([s, t]) => {
              const x = afBy(s);
              return (
                <PpL key={s} to={afUrl(s)} className="ag-quote__also">
                  <span>{t}</span>
                  <b>{agPriceTxt(x)}</b>
                  <em>
                    View Plans <AF_I n="arrow" s={13} />
                  </em>
                </PpL>
              );
            })}
            <small>{P.alsoNote}</small>
          </div>
        </div>
      </div>
    </AG_Sec>
  );
}

/* ================= What you receive (illustrative previews) ================= */
function agRxVis(R) {
  let vis;
  if (R.kind === "report")
    vis = (
      <div className="ag-rx ag-rx--report" aria-hidden="true">
        <div className="ag-rx__bar">
          <b>Monthly bookkeeping summary</b>
          <span className="ag-rx__demo">{R.label}</span>
        </div>
        <div className="ag-rx__tiles">
          <span><em>Records updated</em><b>Demo · 214 entries</b></span>
          <span><em>Bank reconciliation</em><b>Demo · 3 matched, 1 open</b></span>
          <span><em>Outstanding items</em><b>Demo · 4 to review</b></span>
        </div>
        <div className="ag-rx__row">
          <div className="ag-rx__pl"><em>Profit &amp; loss (where agreed)</em>{[0.72, 0.55, 0.64, 0.8, 0.6, 0.86].map((h, k) => <i key={k} style={{ "--h": h }} />)}</div>
          <div className="ag-rx__age"><em>Receivables / payables ageing</em>{["0–30", "31–60", "61–90", "90+"].map((t, k) => <p key={t}><span>{t}</span><i style={{ "--w": [0.8, 0.45, 0.25, 0.12][k] }} /></p>)}</div>
        </div>
        <ul className="ag-rx__gaps"><li>Demo: missing receipt — supplier invoice</li><li>Demo: unmatched bank line — clarification requested</li></ul>
      </div>
    );
  else if (R.kind === "taxdoc")
    vis = (
      <div className="ag-rx ag-rx--doc" aria-hidden="true">
        <span className="ag-rx__stamp">{R.label}</span>
        <b className="ag-rx__title">Tax planning summary</b>
        <p className="ag-rx__meta">Prepared for: sample client · Financial year: as applicable</p>
        {["Income and deduction considerations", "Regime comparison — assumptions stated", "Advance tax view (where included)", "Prioritised next steps", "Questions for qualified review"].map((t, k) => (
          <div key={t} className="ag-rx__line">
            <em>{String(k + 1).padStart(2, "0")}</em>
            <span>{t}</span>
            <i />
            {k === 1 && <s>Assumptions listed</s>}
          </div>
        ))}
      </div>
    );
  else
    vis = (
      <div className="ag-rx ag-rx--itr" aria-hidden="true">
        <span className="ag-rx__stamp">{R.label}</span>
        <b className="ag-rx__title">Computation cover · Assessment year (illustrative)</b>
        <div className="ag-rx__cols">
          <div>{["Income information", "Deductions", "Tax statements", "Computation"].map((t) => <p key={t}><AF_I n="check" s={13} />{t}</p>)}</div>
          <div className="ag-rx__state">{R.states.map(([t], k) => <span key={t} className={k === 0 ? "is-on" : ""}>{t}</span>)}</div>
        </div>
      </div>
    );
  return vis;
}
function AG_Receive({ g }) {
  const R = g.receive;
  const vis = agRxVis(R);
  return (
    <AG_Sec cls={"ag-rcv ag-rcv--" + R.kind} hid="ag-rcv-h">
      <div className="container ag-rcv__grid">
        <div>
          <AG_Head k={R.k} h={R.h} id="ag-rcv-h" />
          <ul className="ag-rcv__list">
            {R.items.map((t) => (
              <li key={t}>
                <AF_I n="doc" s={15} />
                {t}
              </li>
            ))}
          </ul>
          {R.states && (
            <dl className="ag-rcv__states">
              {R.states.map(([t, p]) => (
                <div key={t}>
                  <dt>{t}</dt>
                  <dd>{p}</dd>
                </div>
              ))}
            </dl>
          )}
          {R.cal && (
            <ol className="ag-rcv__cal" aria-label="Sample reporting calendar">
              {R.cal.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ol>
          )}
          <p className="ag-note">
            <AF_I n="flag" s={14} />
            {R.note}
          </p>
        </div>
        {vis}
      </div>
    </AG_Sec>
  );
}

/* ================= Value / security / review workspace ================= */
function AG_Value({ g }) {
  const V = g.value;
  const [on, setOn] = ee.useState(0);
  return (
    <AG_Sec cls="ag-val" hid="ag-val-h">
      <div className="container">
        <AG_Head k={V.k} h={V.h} id="ag-val-h" />
        <ul className="ag-val__grid">
          {V.items.map(([t, p], k) => (
            <li key={t} className={on === k ? "is-on" : ""} style={{ "--k": k }}>
              <button type="button" aria-pressed={on === k} onClick={() => setOn(k)}>
                <span className="ag-val__n">{String(k + 1).padStart(2, "0")}</span>
                <b>{t}</b>
              </button>
              <p>{p}</p>
            </li>
          ))}
        </ul>
        <p className="ag-note">
          <AF_I n="flag" s={14} />
          {V.note}
        </p>
      </div>
    </AG_Sec>
  );
}
function AG_Security({ g }) {
  const S = g.security;
  return (
    <AG_Sec cls="ag-secu" hid="ag-secu-h">
      <div className="container ag-secu__in">
        <div>
          <span className="ag-secu__lock" aria-hidden="true">
            <AF_I n="lock" s={34} />
          </span>
          <AG_Head k="Security, confidentiality & accountability" h={S.h} id="ag-secu-h" />
        </div>
        <div>
          <ul>
            {S.items.map((t) => (
              <li key={t}>
                <AF_I n="shield" s={16} />
                {t}
              </li>
            ))}
          </ul>
          <p className="ag-note">
            <AF_I n="flag" s={14} />
            {S.note}
          </p>
        </div>
      </div>
    </AG_Sec>
  );
}
function AG_Review({ g }) {
  const R = g.review;
  return (
    <AG_Sec cls="ag-rev" hid="ag-rev-h">
      <div className="container">
        <AG_Head k={R.k} h={R.h} id="ag-rev-h">
          <span className="agl-tag">{R.label}</span>
        </AG_Head>
        <div className="ag-rev__ws">
          {R.panels.map(([t, s], k) => (
            <div key={t} className="ag-rev__p" style={{ "--k": k }}>
              <span className="ag-rev__n">{k + 1}</span>
              <b>{t}</b>
              <span className={"ag-rev__s ag-rev__s--" + k}>{s}</span>
              <i aria-hidden="true" />
              <i aria-hidden="true" />
            </div>
          ))}
        </div>
        <p className="ag-rev__states">
          Example states:{" "}
          {R.states.map((s) => (
            <span key={s}>{s}</span>
          ))}
        </p>
        <p className="ag-note">
          <AF_I n="flag" s={14} />
          {R.note}
        </p>
      </div>
    </AG_Sec>
  );
}

/* ================= Labs, briefs, documents ================= */
function AG_Lab({ g, d }) {
  const L = g.lab;
  const C = AGL_LABS[L.type];
  if (!C) return null;
  return (
    <AG_Sec cls={"ag-lab ag-lab--" + L.type} hid="ag-lab-h">
      <div className="container">
        <AG_Head k={L.k} h={L.h} p={L.p} id="ag-lab-h" />
        <C g={g} d={d} />
      </div>
    </AG_Sec>
  );
}
function AG_Brief({ g }) {
  const B = g.brief;
  return (
    <AG_Sec cls="ag-brief" hid="ag-brief-h">
      <div className="container ag-brief__in">
        <AG_Head k={B.k} h={B.h} p={B.p} id="ag-brief-h" />
        <AGL_Brief g={g} />
      </div>
    </AG_Sec>
  );
}
function AG_Docs({ g }) {
  const D = g.docs;
  return (
    <AG_Sec cls="ag-docs" hid="ag-docs-h">
      <div className="container">
        <AG_Head k={D.k} h={D.h} p={D.p} id="ag-docs-h" />
        <AGL_Docs g={g} />
      </div>
    </AG_Sec>
  );
}

/* ================= Industries / audiences ================= */
function AG_Ind({ g }) {
  const I = g.ind;
  const [on, setOn] = ee.useState(0);
  const items = I.items;
  return (
    <AG_Sec cls={"ag-ind ag-ind--" + I.mode} hid="ag-ind-h">
      <div className="container">
        <AG_Head k="Who we support" h={I.h} p={I.p} id="ag-ind-h" />
        {I.mode === "explorer" ? (
          <div className="ag-ind__ex">
            <div className="ag-ind__tabs" role="tablist" aria-label="Who we support">
              {items.map(([n], k) => (
                <button key={n} type="button" role="tab" aria-selected={on === k} aria-controls="ag-indp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                  <AF_I n={agIndIc(n)} s={18} />
                  {n}
                </button>
              ))}
            </div>
            <div className="ag-ind__panel" id="ag-indp" role="tabpanel" aria-live="polite">
              <span className="ag-ind__big" aria-hidden="true">
                <AF_I n={agIndIc(items[on][0])} s={40} />
              </span>
              <h3>{items[on][0]}</h3>
              <p>{items[on][1]}</p>
              <a className="ag-link" href={"#" + AF_FORM} onClick={agPick({ note: "Business type: " + items[on][0] + "." })}>
                Discuss your requirements <AF_I n="arrow" s={14} />
              </a>
            </div>
          </div>
        ) : I.mode === "spectrum" ? (
          <ol className="ag-ind__line">
            {items.map(([n, p], k) => (
              <li key={n} style={{ "--k": k }}>
                <span className="ag-ind__dot" aria-hidden="true" />
                <b>{n}</b>
                {p && <p>{p}</p>}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="ag-ind__mosaic">
            {items.map(([n, p, ic], k) => (
              <li key={n} style={{ "--k": k }} className={p ? "has-p" : ""}>
                <span className="ag-ind__ic" aria-hidden="true">
                  <AF_I n={I.mode === "icons" ? p : agIndIc(n)} s={22} />
                </span>
                <b>{n}</b>
                {p && I.mode !== "icons" && <em>{p}</em>}
              </li>
            ))}
          </ul>
        )}
        {I.note && (
          <p className="ag-note">
            <AF_I n="flag" s={14} />
            {I.note}
          </p>
        )}
      </div>
    </AG_Sec>
  );
}

/* ================= Scope (deliverables / exclusions) ================= */
function AG_Scope({ g }) {
  const S = g.scope;
  return (
    <AG_Sec cls="ag-scope" hid="ag-scope-h">
      <div className="container">
        <AG_Head k="Scope" h={S.h} id="ag-scope-h" />
        <div className="ag-scope__grid">
          <div className="ag-scope__c ag-scope__c--y">
            <h3>
              <AF_I n="tick" s={18} />
              {S.delT || "Key deliverables"}
            </h3>
            <ul>
              {S.del.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {S.delNote && <p>{S.delNote}</p>}
          </div>
          <div className="ag-scope__c ag-scope__c--n">
            <h3>
              <AF_I n="cross" s={18} />
              {S.niT || "Not included"}
            </h3>
            <ul>
              {S.ni.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            {S.niNote && <p>{S.niNote}</p>}
            {S.links && (
              <p className="ag-scope__links">
                Related services:{" "}
                {S.links.map(([s, t], k) => (
                  <React_Frag key={s}>
                    {k > 0 && " · "}
                    <PpL to={afUrl(s)}>{t}</PpL>
                  </React_Frag>
                ))}
              </p>
            )}
          </div>
        </div>
        {S.boundary && (
          <p className="ag-scope__b">
            <AF_I n="scale" s={18} />
            {S.boundary}
          </p>
        )}
      </div>
    </AG_Sec>
  );
}

/* ================= Offers ================= */
const AF_OFFERS = [
  ["gift", "New client welcome", "Free 20-minute discovery consultation", "One per new client"],
  ["calendar", "Annual commitment", "10% off eligible monthly retainers", "12-month agreement"],
  ["rocket", "Startup advantage", "10% off selected Essential packages", "Businesses in their first two years"],
  ["layers", "Two-service bundle", "5% off combined monthly fees", "Eligible, non-overlapping services"],
  ["layers", "Three-service bundle", "10% off combined monthly fees", "Eligible, non-overlapping services"],
  ["users", "Referral reward", "₹500 service credit", "After the referred client's first paid engagement"],
];
function AF_Offers({ compact }) {
  return (
    <div className={"af-offers" + (compact ? " af-offers--c" : "")}>
      <ul>
        {AF_OFFERS.map(([ic, t, b, c], k) => (
          <li key={t} style={{ "--k": k }} className="af-ticket">
            <span className="af-ticket__ic">
              <AF_I n={ic} s={20} />
            </span>
            <span className="af-ticket__t">{t}</span>
            <b>{b}</b>
            <small>{c}</small>
          </li>
        ))}
      </ul>
      <p className="af-offers__note">Offers do not stack. Eligibility is confirmed in your proposal.</p>
    </div>
  );
}
function AG_Offers({ g }) {
  const O = g.offers || {};
  return (
    <AG_Sec cls={"ag-off ag-off--" + (O.mode || "rows")} hid="ag-off-h">
      <div className="container">
        <AG_Head k="Commercial offers" h={O.h || "Offers"} id="ag-off-h" />
        <ul className="ag-off__list">
          {AF_OFFERS.map(([ic, t, b, c], k) => (
            <li key={t} style={{ "--k": k }}>
              <span className="ag-off__ic" aria-hidden="true">
                <AF_I n={ic} s={18} />
              </span>
              <b>{t}</b>
              <span className="ag-off__b">{b}</span>
              <small>Eligibility: {c}</small>
            </li>
          ))}
        </ul>
        <p className="ag-off__note">{AG_OFFER_NOTE}</p>
        {O.annual && <p className="ag-off__note">{O.annual}</p>}
      </div>
    </AG_Sec>
  );
}

/* ================= FAQ (expand / collapse all, optional search) ================= */
function AG_Faq({ g, items }) {
  const F = g.faq;
  const [open, setOpen] = ee.useState(() => items.map((_, k) => k === 0));
  const [q, setQ] = ee.useState("");
  const ql = q.trim().toLowerCase();
  const vis = items.map(([a, b]) => !ql || (a + " " + b).toLowerCase().includes(ql));
  const nVis = vis.filter(Boolean).length;
  return (
    <AG_Sec id="af-faq" cls="ag-faq" hid="ag-faq-h">
      <div className="container ag-faq__in">
        <div className="ag-faq__side">
          <AG_Head k="FAQ" h={F.h} id="ag-faq-h" />
          <p className="ag-faq__count">{items.length} answers</p>
          {F.search && (
            <label className="ag-faq__search">
              <AF_I n="lens" s={17} />
              <span className="af-sr">Search the questions</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the questions" />
            </label>
          )}
          <div className="ag-faq__all">
            <button type="button" className="agl-link" onClick={() => setOpen(items.map(() => true))}>
              Expand all
            </button>
            <button type="button" className="agl-link" onClick={() => setOpen(items.map(() => false))}>
              Collapse all
            </button>
          </div>
          <div className="ag-faq__ctas">
            <a className="ag-btn ag-btn--ac" href={"#" + AF_FORM} onClick={agPick({})}>
              {(F.ctas && F.ctas[0]) || "Ask About Your Requirement"}
            </a>
            <PpL to="/lets-talk" className="ag-btn ag-btn--line">
              {(F.ctas && F.ctas[1]) || "Talk to a Specialist"}
            </PpL>
          </div>
        </div>
        <div>
          {ql && (
            <p className="ag-faq__res" role="status">
              {nVis ? `${nVis} matching ${nVis === 1 ? "question" : "questions"}` : "No matching questions — try another word, or ask us directly."}
            </p>
          )}
          <ul className="ag-faq__list">
            {items.map(([a, b], k) => {
              const o = open[k] || (ql && vis[k]);
              return (
                <li key={a} className={(o ? "is-open" : "") + (vis[k] ? "" : " is-off")}>
                  <h3>
                    <button type="button" aria-expanded={!!o} aria-controls={"ag-fa" + k} onClick={() => setOpen((p) => p.map((x, j) => (j === k ? !o : x)))}>
                      <span>{a}</span>
                      <i aria-hidden="true" />
                    </button>
                  </h3>
                  <div id={"ag-fa" + k} className={"ag-faq__a" + (o ? "" : " is-off")}>
                    <p>{b}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </AG_Sec>
  );
}

/* ================= Related ================= */
function AG_Rel({ g }) {
  const R = g.rel;
  return (
    <AG_Sec cls={"ag-rel ag-rel--" + (R.mode || "grid")} hid="ag-rel-h">
      <div className="container">
        <AG_Head k="Related services" h={R.h} id="ag-rel-h" />
        <ul className="ag-rel__list">
          {R.items.map(([s, desc], k) => {
            const x = afBy(s);
            if (!x) return null;
            return (
              <li key={s} style={{ ...afVars(x), "--k": k }}>
                <PpL to={afUrl(s)} className="ag-rel__c">
                  <span className="ag-rel__ic" aria-hidden="true">
                    <AF_I n={x.ic} s={22} />
                  </span>
                  <b>{x.n}</b>
                  <span className="ag-rel__d">{desc}</span>
                  <span className="ag-rel__f">
                    <em>{agPriceTxt(x)}</em>
                    <span>
                      Explore <AF_I n="arrow" s={14} />
                    </span>
                  </span>
                </PpL>
              </li>
            );
          })}
        </ul>
        {R.note && <p className="ag-note ag-note--c">{R.note}</p>}
        <p className="ag-rel__all">
          <PpL to={AF_HUB}>
            See all {AF_SVC.length} Accounts &amp; Finance services <AF_I n="arrow" s={14} />
          </PpL>
        </p>
      </div>
    </AG_Sec>
  );
}

/* ================= Final conversion ================= */
function AG_Fin({ g }) {
  const F = g.fin;
  return (
    <AG_Sec cls="ag-fin" hid="ag-fin-h">
      <div className="ag-fin__art" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className="container ag-fin__in">
        <h2 id="ag-fin-h">{F.h}</h2>
        <p>{F.p}</p>
        <div className="ag-fin__ctas">
          <a className="ag-btn ag-btn--ac ag-btn--lg" href={"#" + AF_FORM} onClick={agPick({})}>
            {F.c1} <AF_I n="arrow" s={17} />
          </a>
          <a className="ag-btn ag-btn--ghost ag-btn--lg" href={/compare|quote/i.test(F.c2) ? "#ag-plans" : "#" + AF_FORM} onClick={/compare/i.test(F.c2) ? agTo("ag-plans") : agPick({ plan: /quote/i.test(F.c2) ? 0 : undefined })}>
            {F.c2}
          </a>
          {F.c3 && (
            <a className="ag-link" href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Tailored requirement." })}>
              {F.c3} <AF_I n="arrow" s={14} />
            </a>
          )}
        </div>
        <ul className="ag-fin__pts">
          {F.pts.map((t) => (
            <li key={t}>
              <AF_I n="tick" s={15} />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </AG_Sec>
  );
}

/* ================= Three-step enquiry form ================= */
function AG_Form({ g, d }) {
  const F = g.form || {};
  const p = d.pr;
  const plans = F.plans || (p ? AF_TIERS.map((t, k) => `${t} — ${p.from ? "from " : ""}${afInr(p.a[k])}${AF_UNIT[p.u]}`).concat("Not sure yet") : ["Custom quote", "Not sure yet"]);
  const areas = F.areas || g.caps.list.map((c) => c[0]);
  const B = F.b || [];
  const uid = ee.useMemo(fmNextUid, []);
  const len = (n, req) => (v) => ((v || "").trim().length > n ? `Keep this under ${n} characters.` : req && !(v || "").trim() ? "Please fill this in." : "");
  const rules = { plan: FMV.pick("an option"), areas: () => "", org: FMV.org, biz: len(100), desc: len(1000), name: FMV.name, email: FMV.email, phone: (ph) => (ph && (ph.number || "").trim() ? FMV.phone(ph) : ""), consent: FMV.consent };
  const blank = { plan: "", areas: [], org: "", biz: "", desc: "", name: "", email: "", phone: { country: "IN", number: "", otherCode: "" }, consent: false, website: "" };
  B.forEach((b) => {
    rules[b.k] = b.type === "text" ? len(200, !b.optional) : b.optional ? () => "" : FMV.pick(b.type === "multi" ? "at least one option" : "an option");
    blank[b.k] = b.type === "multi" ? [] : "";
  });
  const f = fmUse(blank, rules);
  f.uid = uid;
  const names = F.steps || ["Plan", "Business", "Contact"];
  const STEPS = [
    { t: names[0], q: F.q1 || "Which plan interests you?", keys: ["plan", "areas"] },
    { t: names[1], q: "Tell us about your business", keys: ["org", "biz"].concat(B.map((b) => b.k), ["desc"]) },
    { t: names[2], q: "Where should we reach you?", keys: ["name", "email", "phone", "consent"] },
  ];
  const [step, setStep] = ee.useState(0),
    [st, setSt] = ee.useState("idle"),
    [msg, setMsg] = ee.useState(""),
    [shake, setShake] = ee.useState(0);
  const last = STEPS.length - 1;
  const fRef = ee.useRef(f);
  fRef.current = f;
  ee.useEffect(() => {
    const on = (e) => {
      const x = (e && e.detail) || {};
      const ff = fRef.current;
      if (x.plan != null) {
        const v = x.plan === -1 ? plans[plans.length - 1] : plans[x.plan];
        if (v) ff.set("plan")(v);
      }
      let desc = ff.v.desc || "";
      const add = (t) => {
        if (t && desc.indexOf(t) < 0) desc = (desc ? desc + "\n" : "") + t;
      };
      if (x.areas && x.areas.length) {
        const ok = x.areas.filter((a) => areas.includes(a));
        if (ok.length) ff.set("areas")(Array.from(new Set((ff.v.areas || []).concat(ok))));
        const rest = x.areas.filter((a) => !areas.includes(a));
        if (rest.length) add("Interested in: " + rest.join(", ") + ".");
      }
      if (x.note) add(x.note);
      if (desc !== (ff.v.desc || "")) ff.set("desc")(desc.slice(0, 1000));
      setSt("idle");
      setStep(0);
    };
    window.addEventListener("ag-prefill", on);
    return () => window.removeEventListener("ag-prefill", on);
  }, []);
  const next = () => {
    if (f.check(STEPS[step].keys).length) return setShake((x) => x + 1);
    setStep((s) => Math.min(last, s + 1));
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return; /* honeypot */
    if (step < last) return next();
    for (let n = 0; n <= last; n++)
      if (f.check(STEPS[n].keys).length) {
        setStep(n);
        setShake((x) => x + 1);
        return;
      }
    if (st === "sending") return;
    setSt("sending");
    const extra = { Plan: f.v.plan, [F.areaLabel || "Areas of interest"]: (f.v.areas || []).join(", ") || "(not provided)", "Business type": f.v.biz.trim() || "(not provided)" };
    B.forEach((b) => (extra[b.label] = (Array.isArray(f.v[b.k]) ? f.v[b.k].join(", ") : (f.v[b.k] || "").trim()) || "(not provided)"));
    const r = await fmPost("/api/v1/enquiry", {
      type: "Accounts & Finance Enquiry",
      name: f.v.name.trim(),
      email: f.v.email.trim(),
      company: f.v.org.trim(),
      countryCode: f.v.phone.number ? phoneDialCode(f.v.phone) : "",
      phone: f.v.phone.number,
      service: d.n,
      message: (f.v.desc || "").trim() || "(no message)",
      extra,
      website: f.v.website,
      page: window.location.href,
    });
    if (r.ok) {
      setSt("sent");
      setMsg("");
    } else if (r.preview) {
      setSt("preview");
      setMsg("");
    } else {
      setSt("failed");
      setMsg(r.error || "Your request could not be sent. Please try again, or email us.");
    }
  };
  const pct = st === "sent" ? 100 : Math.round((step / STEPS.length) * 100);
  return (
    <section className="ag-form" id={AF_FORM} aria-labelledby="ag-form-h">
      <div className="container ag-form__in">
        <div className="ag-form__side">
          <span className="ag-kick">Free 20-minute consultation</span>
          <h2 id="ag-form-h">Discuss {d.n}</h2>
          <p>Tell us where you are today. We'll recommend a suitable plan and confirm the scope in writing before any work begins — no obligation.</p>
          <ol className="ag-form__how">
            <li>We review your requirement.</li>
            <li>We get in touch to discuss the scope.</li>
            <li>You receive a recommended plan and a written scope.</li>
          </ol>
          <p className="ag-form__priv">
            <AF_I n="lock" s={14} />
            {F.privacy || "Please don't send passwords, bank details or confidential financial documents with this enquiry."}
          </p>
        </div>
        <div className="fm ag-fm">
          <div className="fm-top">
            <span className="fm-top__ic" aria-hidden="true">
              <AF_I n={d.ic} s={22} />
            </span>
            <div className="fm-top__t">
              <b>{st === "sent" ? "Request received" : st === "preview" ? "Preview only — not sent" : STEPS[step].q}</b>
              <small>
                Step {step + 1} of {STEPS.length} — {STEPS[step].t}
              </small>
            </div>
            <span className="fm-top__pct" aria-hidden="true">
              {pct}%
            </span>
            <i className="fm-top__bar" aria-hidden="true">
              <b style={{ width: pct + "%" }} />
            </i>
          </div>
          {st === "sent" ? (
            <FM_Success
              title="Thank you. Your enquiry has been sent."
              onAgain={() => {
                f.reset(blank);
                setStep(0);
                setSt("idle");
              }}
              again="Send another request"
            >
              <ol className="fm-next">
                <li>We review your requirement.</li>
                <li>We contact you to discuss the scope.</li>
                <li>You receive a recommended plan and a written scope.</li>
              </ol>
            </FM_Success>
          ) : st === "preview" ? (
            <div className="ag-form__pv" role="status">
              <p>
                <b>Your details passed every check, but this copy of the website isn't connected to our enquiry system, so nothing was sent.</b> On the live website this form goes straight to our team.
              </p>
              <button type="button" className="ag-btn ag-btn--line" onClick={() => setSt("idle")}>
                Back to the form
              </button>
            </div>
          ) : (
            <form className="fm-form" onSubmit={submit} noValidate>
              <ol className="fm-steps">
                {STEPS.map((s, n) => (
                  <li key={s.t} className={(n === step ? "is-on " : "") + (n < step ? "is-done" : "")}>
                    <button type="button" aria-current={n === step ? "step" : undefined} onClick={() => (n < step ? setStep(n) : n === step + 1 ? next() : null)}>
                      <span>{n < step ? <AF_I n="tick" s={12} /> : n + 1}</span>
                      {s.t}
                    </button>
                  </li>
                ))}
              </ol>
              <div className="fm-pane" key={step + "-" + shake} data-shake={shake > 0 ? "1" : undefined}>
                {step === 0 && (
                  <div className="fm-grid">
                    <FM_Chips f={f} k="plan" label={F.q1 || "Which plan interests you?"} options={plans} req />
                    <FM_Chips f={f} k="areas" label={(F.areaLabel || "Areas of interest") + " (optional)"} options={areas} multi />
                    <p className="ag-form__hint">Selecting an area doesn't mean it is included in every plan — scope is confirmed in your proposal.</p>
                  </div>
                )}
                {step === 1 && (
                  <div className="fm-grid">
                    <FM_Input f={f} k="org" label="Business name" icon="box" req auto="organization" max={100} />
                    <FM_Input f={f} k="biz" label="Business type or industry (optional)" icon="file" max={100} />
                    {B.map((b) =>
                      b.type === "text" ? (
                        <FM_Input key={b.k} f={f} k={b.k} label={b.label + (b.optional ? " (optional)" : "")} icon="file" req={!b.optional} ph={b.ph} max={200} full />
                      ) : (
                        <FM_Chips key={b.k} f={f} k={b.k} label={b.label + (b.optional ? " (optional)" : "")} options={b.options} multi={b.type === "multi"} req={!b.optional} />
                      )
                    )}
                    <FM_Area f={f} k="desc" label="Brief description of your requirement (optional)" ph="A sentence or two is enough." min={0} max={1000} req={false} rows={3} />
                  </div>
                )}
                {step === 2 && (
                  <div className="fm-grid">
                    <FM_Input f={f} k="name" label="Contact name" icon="user" req auto="name" max={60} />
                    <FM_Input f={f} k="email" label="Business email" icon="msg" type="email" req auto="email" max={160} />
                    <FM_Phone f={f} label="Phone number (optional)" req={false} />
                    <FM_Check f={f}>
                      I agree that Frequent Research may contact me about this request. See our <HmLink to={FM_PRIV}>Privacy Policy</HmLink>.
                    </FM_Check>
                  </div>
                )}
              </div>
              <input className="hp" tabIndex={-1} autoComplete="off" value={f.v.website} onChange={f.set("website")} aria-hidden="true" />
              {st === "failed" && (
                <p className="fm-fail" role="alert">
                  {msg}
                </p>
              )}
              <div className="fm-nav">
                {step > 0 && (
                  <button type="button" className="fm-back" onClick={() => setStep((s) => s - 1)}>
                    ← Back
                  </button>
                )}
                {step < last ? (
                  <button key="step-next" type="button" className="btn btn--primary btn--lg fm-go" onClick={next}>
                    Continue <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button key="step-send" type="submit" className="btn btn--primary btn--lg fm-go" disabled={st === "sending"}>
                    {st === "sending" ? (
                      <>
                        <i className="fm-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {F.submit || "Request My Consultation"} <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

/* ================= Page ================= */
const AG_SECTIONS = { facts: AG_Facts, strip: AG_Strip, prob: AG_Prob, caps: AG_Caps, principles: AG_Principles, ai: AG_Ai, proc: AG_Proc, plans: AG_Plans, receive: AG_Receive, value: AG_Value, ind: AG_Ind, scope: AG_Scope, offers: AG_Offers, security: AG_Security, review: AG_Review, lab: AG_Lab, brief: AG_Brief, docs: AG_Docs, rel: AG_Rel, fin: AG_Fin };
function AFS_Page({ n }) {
  const d = afBy(n.slug);
  const g = d ? AGS[d.s] : null;
  const seo = g ? g.seo : d ? d.meta : ["", ""];
  usePageMeta(seo[0].replace(/\s*\|\s*Frequent Research\s*$/, ""), seo[1]);
  dmMeta(d ? afUrl(d.s) : AF_HUB, seo[0], seo[1]);
  if (!d || !g) return null;
  const faq = g.faq.items;
  useJsonLd("afs", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: d.n,
        serviceType: d.n,
        description: seo[1],
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        areaServed: "India",
        url: `${location.origin}${afUrl(d.s)}`,
        ...(d.pr
          ? {
              offers: AF_TIERS.map((t, k) => ({
                "@type": "Offer",
                name: `${t} plan`,
                price: String(d.pr.a[k]),
                priceCurrency: "INR",
                description: `${d.pr.from ? "Starting from " : ""}${afInr(d.pr.a[k])}${AF_UNIT[d.pr.u]}, excluding GST`,
              })),
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: AF_PARENT[0], item: `${location.origin}${AF_HUB}` },
          { "@type": "ListItem", position: 3, name: d.n, item: `${location.origin}${afUrl(d.s)}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
  /* build 64: the motion-edition sections (AccountsFinance64.jsx) draw the page; the AG_* sections remain as a fallback */
  return <AF5_Body g={g} d={d} faq={faq} />; /* build 65 redesign */
  return <X4_Body g={g} d={d} faq={faq} />;
  return (
    <div className={"ag ag--" + g.th} data-af={d.s}>
      {g.order.map((k) => {
        if (k === "hero") return <AG_Hero key={k} g={g} d={d} />;
        if (k === "faq") return <AG_Faq key={k} g={g} items={faq} />;
        if (k === "form") return null;
        const C = AG_SECTIONS[k];
        if (!C || (k !== "offers" && !g[k])) return null;
        return <C key={k} g={g} d={d} />;
      })}
      <AG_Form g={g} d={d} />
    </div>
  );
}

/* ---------- kept for the Accounts & Finance hub (AccountsFinanceHub.jsx) ---------- */
function AF_Process({ d }) {
  const [ref, v] = RC_useInView(0.25);
  const n = d.steps.length;
  return (
    <section ref={ref} className={"af-proc" + (v ? " is-in" : "")} style={{ ...afVars(d), "--n": n }} aria-labelledby="af-proc-h">
      <div className="container">
        <div className="af-head af-head--c af-head--light">
          <span className="af-kick">How we work</span>
          <h2 id="af-proc-h">A clear {n}-step process</h2>
          <p>Every engagement follows the same disciplined path, so you always know what happens next and what we need from you.</p>
        </div>
        <ol className="af-proc__track">
          <li className="af-proc__rail" aria-hidden="true">
            <i />
          </li>
          {d.steps.map((s, k) => (
            <li key={s} className="af-proc__s" style={{ "--k": k }}>
              <span className="af-proc__dot">
                <b>{k + 1}</b>
              </span>
              <span className="af-proc__t">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function AF_FormBlock() {
  return (
    <DM_Form
      id={AF_FORM}
      kicker="Free 20-minute consultation"
      title="Discuss Your Finance Requirement"
      sub="Tell us where you are today. We'll recommend the right plan and confirm the scope in writing — no obligation."
      type="Accounts & Finance Enquiry"
      service="Accounts & Finance"
      icon="pie"
      submitLabel="Request My Consultation"
      successTitle="Thank you. Your finance enquiry has been sent."
      msgLabel="Anything we should know? (optional)"
      msgPh="For example: monthly transactions, number of employees, GSTINs, deadlines or the decision you are planning."
      nextSteps={["We review your requirement.", "We contact you to discuss the scope.", "You receive a recommended plan and a written scope."]}
      chips={[
        { k: "svc", t: "Service", q: "What do you need help with?", label: "Service", multi: true, options: ["Bookkeeping & accounting", "GST / TDS", "Income tax / ITR", "Payroll", "MIS & reporting", "Planning & forecasting", "Virtual CFO", "Corporate finance / due diligence", "Not sure yet"] },
        { k: "stage", t: "Business", q: "Which best describes you?", label: "Business type", options: ["Individual / freelancer", "Startup", "SME", "Established company", "Other"] },
      ]}
    />
  );
}
function AF_Final() {
  return (
    <section className="af-final" aria-labelledby="af-final-h">
      <div className="container af-final__in">
        <div className="af-final__coin" aria-hidden="true">
          <span>₹</span>
        </div>
        <div>
          <h2 id="af-final-h">Clarity in every number starts with one conversation</h2>
          <p>Book a free 20-minute discovery call. We'll understand your requirement, recommend a plan and confirm the scope in writing before any work begins.</p>
        </div>
        <a className="af-btn af-btn--gold" href={"#" + AF_FORM} onClick={ppGo(AF_FORM)}>
          Book my free call <AF_I n="arrow" s={16} />
        </a>
      </div>
    </section>
  );
}

export { AFS_Page, AF_FORM, AF_Final, AF_FormBlock, AF_HUB, AF_I, AF_MOVED, AF_OFFERS, AF_Offers, AF_P, AF_Price, AF_Process, AF_Redirect, AF_TIERS, AF_UNIT, AG_Cell, AG_FLOW_TH, AG_Form, AG_Tip, afBy, afInr, afUrl, afVars, agIndIc, agPick, agPriceTxt, agRxVis, agSplitHl, agTo };
