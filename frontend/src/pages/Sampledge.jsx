/*
 * Sampledge — /products/sampledge (existing URL, unchanged). Build 45.
 * Product page for Sampledge, the research project & sample management workspace. Prefix SAM_.
 * Positioned as software only: no Frequent Research market research, panel or fieldwork services are promoted here.
 *
 * Truthfulness rules followed on this page:
 *  - Capabilities are limited to what the supplied Sampledge interface screens and the existing site copy show
 *    (projects, bids, companies, quotas/target groups, devices, respondent security checks, vendor/client dashboards,
 *    clicks/completes/terminates/over-quotas/drop-outs, reconciliation/invoicing/payment status, five report types with
 *    custom columns, users, roles, activity logs, e-mail accounts, countries & settings, API-key access for vendors).
 *  - No customer logos, counts, ROI, reviews, testimonials, certifications or awards.
 *  - Automation examples and AI directions are labelled as such; the dashboard mock-up is a concept view with states, not data.
 *  - Prices are the ones supplied (INR, taxes extra). No billing-period or currency toggles (not confirmed).
 * Images: real interface screens cropped from the supplied composites (UI only — the light promo artwork with unverified panel
 * counts and certification badges is not used). Placeholders "__IMG:sampledge/<file>__" are inlined by scripts/overlay.config.js;
 * the static build (scripts/prerender.js) moves them into /assets/img/.
 * Styles: src/styles/sampledge.css (sam-).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppGo, ppIn, ppR } from '../components/dm/shared.jsx';
import { ixCycle } from '../components/dm/ixkit.jsx';
import { v4Pick } from '../components/dm/v44kit.jsx';
import { FRK_I, FRK_SamLogo } from '../components/site/FrKit.jsx';

const SAM_URL = "/products/sampledge";
const SAM_TITLE = "Sample Management Software for Research Teams | Sampledge";
const SAM_DESC = "Sampledge is sample management software for research teams: projects, quotas, suppliers, live fieldwork, reconciliation and reports in one workspace.";
const SAM_FORM = "sampledge-demo";

/* interface screens: [src, width, height, alt] */
const SAM_IMG = {
  pm: ["__IMG:sampledge/pm-dashboard__", 1291, 875, "Sampledge project dashboard showing client, vendor and project totals with revenue, cost, profit, clicks, completes, reconciled, invoice and payment status cards"],
  vendor: ["__IMG:sampledge/vendor-dashboard__", 1240, 1154, "Sampledge vendor dashboard with clicks, completes, terminates, over-quota and drop-out cards above a list of projects and their live, hold, test or closed status"],
  create: ["__IMG:sampledge/create-project__", 1309, 782, "Sampledge Create Project form with project information, countries and target groups, allowed devices and a list of respondent security checks"],
  bid: ["__IMG:sampledge/bid-management__", 1440, 452, "Sampledge bid management table listing bids with client, project name, bid date, status and expiry date"],
  company: ["__IMG:sampledge/manage-company__", 1240, 729, "Sampledge company list showing clients and vendors with category, origin country, status and actions"],
  addco: ["__IMG:sampledge/add-company__", 1143, 640, "Sampledge Add Company form with basic information, company type, office address, contact persons, terms and conditions and taxes"],
  overall: ["__IMG:sampledge/overall-report__", 1280, 508, "Sampledge overall report filters for client, vendor, project and salesperson with selectable report columns"],
  conversion: ["__IMG:sampledge/conversion-report__", 1283, 443, "Sampledge conversion report filters for project, vendor, response status, conversion status and country"],
  clicks: ["__IMG:sampledge/clicks-report__", 1280, 412, "Sampledge clicks report filters for vendor, response status, project and country with selectable columns"],
  roles: ["__IMG:sampledge/role-management__", 1295, 429, "Sampledge role management list with roles such as marketplace, client, vendor, bidding and admin and a description of each role's permissions"],
  logs: ["__IMG:sampledge/activity-logs__", 1243, 572, "Sampledge activity log listing each event with timestamp, user, role, category, IP address and success or failure"],
  countries: ["__IMG:sampledge/countries-settings__", 1246, 463, "Sampledge settings screen with tabs for countries, departments, currencies, industries, project types, service categories and taxes"],
};
const SAM_MARK = "__IMG:sampledge/mark__";

const SAM_FAQ = [
  ["What is Sampledge?", "Sampledge is sample management software and a research operations workspace. It brings research projects, bids, quotas, sample suppliers, live fieldwork status, respondent and incentive records, reconciliation and reporting into one place, instead of separate spreadsheets and email threads."],
  ["Who is Sampledge for?", "Research agencies, fieldwork companies, panel and sample organisations, and in-house insights teams that run surveys with several countries, quotas or suppliers and need one clear view of every project."],
  ["How does Sampledge handle quotas?", "Each project is set up with its countries and target groups. As respondents arrive, completes, terminates, over-quotas and drop-outs are tracked by project and supplier, so you can see which cells are filling and which need attention while fieldwork is live."],
  ["Can I manage multiple sample suppliers in Sampledge?", "Yes. Vendors are managed as companies alongside clients, each project can draw on several suppliers, and the vendor dashboard and vendor report show clicks, completes, terminates and conversion by supplier — which also simplifies reconciliation."],
  ["What dashboards and reports does Sampledge include?", "A project dashboard, a bidding dashboard and a vendor dashboard, plus overall, client, vendor, conversion and click reports. Reports can be filtered by client, vendor, project, country or salesperson, with the columns you choose."],
  ["Does Sampledge integrate with other tools?", "Sampledge supports API-key access so vendors can retrieve survey information for their projects, and marketplace integration is included on the Pro and Premium plans. Which survey platforms and tools connect for your setup, and how, is confirmed during your demo."],
  ["How much does Sampledge cost?", "Sampledge pricing is published on the Sampledge website at www.sampledge.com/pricing, where you can compare plans, billing periods and currencies. For a custom plan, request a demo and the team will walk you through the options."],
  ["Is Sampledge a vendor management system?", "For sample suppliers, yes — that part of a vendor management system (VMS) is built in. Vendors are held as company records with their contacts, terms and taxes, each project can draw on several of them, API keys let a vendor retrieve survey information for its own projects, and the vendor dashboard and vendor report show clicks, completes, terminates and conversion by supplier through to reconciliation. It is a research VMS rather than a general staffing or procurement one."],
  ["Which data collection methods does Sampledge support?", "Sampledge runs the operations around your fieldwork rather than scripting the questionnaire, so it is not tied to one data gathering method. Primary data collection through online surveys is the common case — survey links, quotas, devices and respondent checks per project — and the same project record carries studies run by telephone, face-to-face or mobile, because what it tracks is countries, target groups, suppliers, response status and reconciliation rather than the instrument itself."],
  ["How does Sampledge compare with a general market research platform?", "Most market research platforms are built around writing and fielding a questionnaire. Sampledge is built around everything surrounding it: bids, projects, quotas, sample suppliers, respondent quality, live fieldwork status, reconciliation, invoicing and reporting. Teams typically keep the market survey software they already use and run the operations in Sampledge, which is why it is better described as a sample database management system and research operations workspace than as customer research software or a survey tool."],
  ["Does Sampledge do software billing and invoicing?", "It does project billing: reconciled completes per supplier, invoice pending, invoiced and payment received, with revenue, cost and profit on the project dashboard, plus Billing & Credits for the workspace itself. The scope is research projects, suppliers and clients — so if you are looking for retail store billing software, retail invoice software or medical invoicing software for a shop, clinic or practice, Sampledge is not that product and will not replace one. For a research agency invoicing studies rather than products over a counter, the billing is built in."],
  ["Can Sampledge show fieldwork and respondent location in real time?", "Yes. Live fieldwork tracking shows clicks, completes, terminates, over-quotas and drop-outs updating by project and by supplier while a study is in field, so quota cells that are filling or stalling are visible without asking anyone. Real-time location is handled as a quality control rather than a tracking feature: geolocation and timezone checks confirm a respondent is answering from the country a project is targeting, and the result is recorded against the response."],
  ["Which market research tools does Sampledge replace?", "None of the scripting ones. Teams keep the survey tool they already use — paid or one of the free market research tools — and run operations in Sampledge. As a marketing analysis tool it is deliberately narrow: it reports on projects, suppliers, conversion and cost rather than campaigns. The AI tools for market research that get the most use are the ones reading clean, structured operational data, which is what Sampledge is built to keep; the directions we are exploring are listed on this page and labelled as not available today."],
  ["How do I request a Sampledge demo?", "Use the demo request on this page: choose what you want to explore, your team size and what you want to improve, then add your contact details. We reply within one working day to arrange a walkthrough."],
];

/* ── small icon set (stroke icons, 24 grid) ─────────────────────────────────────────── */
const SAM_P = {
  project: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  quota: "M12 3a9 9 0 1 0 9 9M12 7a5 5 0 1 0 5 5M12 11.2a.8.8 0 1 0 .8.8M20.5 3.5L12 12",
  supplier: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 19v-1a4 4 0 0 0-3-3.9M16 5.1a3 3 0 0 1 0 5.8",
  live: "M3 12h4l3-7 4 14 3-7h4",
  record: "M4 5h16v14H4zM9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4M6 16c.6-1.6 1.7-2.3 3-2.3s2.4.7 3 2.3M14.5 9H18M14.5 13H18",
  scale: "M12 3v17M5 7h14M5 7l-3 6a3 3 0 0 0 6 0zM19 7l-3 6a3 3 0 0 0 6 0zM8 20h8",
  chart: "M4 20V11M10 20V5M16 20v-6M21 20H3",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  plug: "M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z",
  check: "M5 12.5l4.2 4L19 7",
  zoom: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M20.5 20.5l-4.5-4.5M11 8v6M8 11h6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z",
  arrow: "M5 12h14M13 6l6 6-6 6",
  close: "M6 6l12 12M18 6L6 18",
  globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3",
  layers: "M12 3l9 5-9 5-9-5zM3 12.5l9 5 9-5M3 16.5l9 5 9-5",
  bid: "M4 20h10M7 16l9-9M13 4l7 7M11 6l7 7M9.5 13.5l-5 5",
  sheet: "M4 4h16v16H4zM4 9.5h16M4 15h16M10 4v16",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  eye: "M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6",
  list: "M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01",
  device: "M3 5h14v10H3zM7 19h6M10 15v4M19 9h2v10h-4v-2",
};
function SAM_Ico({ n, s = 18 }) {
  return (
    <svg className="sam-ico" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={SAM_P[n] || SAM_P.spark} />
    </svg>
  );
}
function SAM_Shot({ k, cls = "", eager, ...rest }) {
  const [src, w, h, alt] = SAM_IMG[k];
  return <img className={"sam-shot " + cls} src={src} width={w} height={h} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" {...rest} />;
}
/* section heading: kicker, title, optional sub; tone "dark" switches to light text */
function SAM_Head({ id, k, t, s, center, dark, accent }) {
  return (
    <div className={"sam-head" + (center ? " sam-head--c" : "") + (dark ? " sam-head--dark" : "")} style={accent ? { "--acc": accent } : undefined}>
      {k && <span className="sam-head__k">{k}</span>}
      <h2 id={id}>{t}</h2>
      {s && <p className="sam-head__s">{s}</p>}
    </div>
  );
}
const SAM_Btn = ({ to, children, cls = "" }) =>
  to.charAt(0) === "/" ? (
    <PpL to={to} className={"sam-btn " + cls}>
      {children}
    </PpL>
  ) : (
    <a href={"#" + to} onClick={ppGo(to)} className={"sam-btn " + cls}>
      {children}
    </a>
  );

/* ── 1. hero: 3D platform stage assembled from the supplied product artwork ──────────── */
/* Real Sampledge screens cut from the supplied product artwork: [src, width, height, alt]. */
import { SAM_HERO } from '../data/samHero.jsx';
/* floating screen: [key, depth class, colour role, label] */
const SAM_HERO_LAYERS = [
  ["bidding", "bd", "al", "Bidding Dashboard"],
  ["vendor", "vn", "sm", "Vendor Dashboard"],
  ["create", "cp", "an", "Create Project"],
];
/* platform areas shown beside the headline: [icon, label, colour role] */
const SAM_HERO_CAPS = [
  ["project", "Project Management", "pj"],
  ["sheet", "Survey Programming", "an"],
  ["supplier", "Sample Management", "sm"],
  ["list", "Administration", "pj"],
  ["globe", "Fieldwork & Tracking", "q"],
  ["scale", "Billing & Credits", "al"],
  ["chart", "Data & Reporting", "al"],
  ["shield", "Security & Compliance", "q"],
  ["spark", "Analytics & Insights", "an"],
];
const SAM_SIGNALS = [
  ["pj", "project", "Project configured", "Countries, target groups and checks set"],
  ["sm", "supplier", "Supplier link live", "Respondents arriving from a new source"],
  ["al", "quota", "Quota cell nearly full", "Time to cap or redirect the source"],
  ["q", "scale", "Ready to reconcile", "Final completes agreed with the supplier"],
  ["an", "chart", "Client report generated", "Columns chosen, filters applied"],
];
function SAM_HeroImg({ k, cls }) {
  const [src, w, h, alt] = SAM_HERO[k];
  return <img className={cls} src={src} width={w} height={h} alt={alt} loading="eager" decoding="async" fetchpriority={k === "pm" ? "high" : undefined} />;
}
/* The stage tilts with the pointer (pointer devices only, and never under reduced motion). */
function SAM_Stage() {
  const [ref, v] = ppIn(0.12);
  const [i] = ixCycle(SAM_SIGNALS.length, v, 2800, false);
  const [p, setP] = ee.useState([0, 0]);
  const move = (e) => {
    if (ppR() || e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    setP([((e.clientX - r.left) / r.width - 0.5).toFixed(3), ((e.clientY - r.top) / r.height - 0.5).toFixed(3)]);
  };
  const sig = SAM_SIGNALS[i];
  return (
    <figure ref={ref} className={"sam-stage" + (v ? " is-in" : "")} onPointerMove={move} onPointerLeave={() => setP([0, 0])} style={{ "--px": p[0], "--py": p[1] }}>
      <div className="sam-stage__glow" aria-hidden="true" />
      <div className="sam-stage__grid" aria-hidden="true" />
      <div className="sam-stage__3d">
        <div className="sam-win sam-win--pm sam-win--pj">
          <span className="sam-win__tag">PM Dashboard</span>
          <span className="sam-win__fr">
            <SAM_HeroImg k="pm" cls="sam-win__img" />
            <span className="sam-stage__beam" aria-hidden="true" />
          </span>
        </div>
        {SAM_HERO_LAYERS.map(([k, d, c, t], n) => (
          <div key={k} className={"sam-win sam-win--" + d + " sam-win--" + c} style={{ "--n": n }}>
            <span className="sam-win__tag">{t}</span>
            <span className="sam-win__fr">
              <SAM_HeroImg k={k} cls="sam-win__img" />
            </span>
          </div>
        ))}
        <span className="sam-stage__orb sam-stage__orb--1" aria-hidden="true" />
        <span className="sam-stage__orb sam-stage__orb--2" aria-hidden="true" />
        <span className="sam-stage__orb sam-stage__orb--3" aria-hidden="true" />
      </div>
      <p className={"sam-pulse sam-pulse--" + sig[0]} aria-live="polite">
        <span className="sam-pulse__dot" aria-hidden="true" />
        <span className="sam-pulse__ic" aria-hidden="true">
          <SAM_Ico n={sig[1]} s={15} />
        </span>
        <span>
          <b>{sig[2]}</b>
          <small>{sig[3]}</small>
        </span>
      </p>
      <figcaption className="sam-stage__cap">Real Sampledge screens · sample project data</figcaption>
    </figure>
  );
}
function SAM_Hero() {
  const [ref, v] = ppIn(0.05);
  return (
    <section className={"sam-hero" + (v ? " is-in" : "")} aria-labelledby="sam-h1" ref={ref}>
      <div className="sam-hero__bg" aria-hidden="true">
        <i />
        <i />
        <i />
        <u />
      </div>
      <div className="container sam-hero__in">
        <div className="sam-hero__copy">
          <nav className="crumbs sam-crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <PpL to="/products">Products</PpL>
            </span>
            <span>
              <span aria-current="page">Sampledge</span>
            </span>
          </nav>
          <FRK_SamLogo h={42} className="sam-hero__logo" />
          <p className="sam-hero__kick">Smarter research. Deeper insights.</p>
          <HeroH1 id="sam-h1">
            Research Project &amp; Sample Management, <em>Re-engineered.</em>
          </HeroH1>
          <p className="sam-hero__lead">
            Sampledge is an intelligent operations workspace for research project and sample management. Projects, bids, quotas, suppliers, live fieldwork, reconciliation and
            reporting — in one place, instead of a dozen spreadsheets.
          </p>
          <ul className="sam-hero__caps" aria-label="What the platform covers">
            {SAM_HERO_CAPS.map(([ic, t, c], k) => (
              <li key={t} className={"sam-cap-chip sam-cap-chip--" + c} style={{ "--k": k }}>
                <span className="sam-cap-chip__ic">
                  <SAM_Ico n={ic} s={15} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="sam-hero__ctas">
            <SAM_Btn to={SAM_FORM} cls="sam-btn--glow">
              Request a Sampledge Demo
            </SAM_Btn>
            <SAM_Btn to="sam-tour" cls="sam-btn--line">
              Explore the Platform
            </SAM_Btn>
          </div>
          <a className="sam-hero__how" href="#sam-flow" onClick={ppGo("sam-flow")}>
            See how Sampledge works <span aria-hidden="true">→</span>
          </a>
        </div>
        <SAM_Stage />
      </div>
    </section>
  );
}

/* ── 2. operational problem: spreadsheet sprawl → one workspace ─────────────────────── */
const SAM_SHEETS = [
  ["Quota tracker_v7.xlsx", "Quotas", "sm"],
  ["Supplier links (final).xlsx", "Suppliers", "sm"],
  ["Incentives_March.xlsx", "Incentive records", "sm"],
  ["Invoice log.xlsx", "Invoicing", "q"],
  ["Country plan.xlsx", "Countries", "pj"],
  ["Respondent IDs.csv", "Respondent records", "sm"],
  ["Terminates & OQ.xlsx", "Live fieldwork", "al"],
  ["Bid tracker.xlsx", "Bids", "pj"],
  ["Client update.docx", "Client reports", "an"],
  ["Reconciliation_FINAL2.xlsx", "Reconciliation", "q"],
  ["Vendor contacts.xlsx", "Companies", "pj"],
  ["Report draft.pptx", "Reports", "an"],
];
/* scattered positions [left %, top %, rotate deg] */
const SAM_SCATTER = [
  [2, 6, -7], [38, 2, 4], [70, 9, -3], [10, 30, 5], [48, 24, -9], [74, 36, 6],
  [0, 58, -4], [30, 50, 8], [60, 60, -6], [16, 80, 3], [46, 78, -2], [72, 84, 7],
];
function SAM_Sprawl() {
  const [ref, v] = ppIn(0.35);
  const [one, setOne] = ee.useState(false);
  const touched = ee.useRef(false);
  ee.useEffect(() => {
    if (!v || touched.current || ppR()) return;
    const t = setTimeout(() => setOne(true), 2400);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <section className="sam-sec sam-prob" aria-labelledby="sam-prob-h">
      <div className="container sam-prob__in">
        <div className="sam-prob__copy">
          <SAM_Head id="sam-prob-h" k="The operational problem" t="Research Operations Shouldn't Live in 12 Spreadsheets." s="Quotas in one file, supplier links in another, incentives and invoices somewhere else. Every update is copied by hand, and nobody is quite sure which version is current." />
          <ul className="sam-prob__qs">
            {["Which quota sheet is the latest?", "Has this supplier already been told to stop?", "Do our completes match the supplier's?", "What do we tell the client this afternoon?"].map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
          <button
            type="button"
            className="sam-prob__btn"
            aria-pressed={one}
            onClick={() => {
              touched.current = true;
              setOne(!one);
            }}
          >
            <SAM_Ico n={one ? "sheet" : "layers"} s={16} />
            {one ? "Show the spreadsheet sprawl" : "Bring it into one workspace"}
          </button>
        </div>
        <div ref={ref} className={"sam-spr" + (one ? " is-one" : "")} role="img" aria-label={one ? "Twelve separate files now sit as modules inside one Sampledge workspace: quotas, suppliers, incentives, invoicing, countries, respondent records, live fieldwork, bids, client reports, reconciliation, companies and reports." : "Twelve scattered files — quota trackers, supplier links, incentive sheets, invoice logs, reconciliation workbooks and report drafts — each kept separately."}>
          <div className="sam-spr__ws" aria-hidden="true">
            <span className="sam-spr__bar">
              <img src={SAM_MARK} width="256" height="256" alt="" />
              Sampledge workspace
            </span>
          </div>
          {SAM_SHEETS.map(([f, m, c], k) => {
            const [x, y, r] = SAM_SCATTER[k];
            return (
              <span
                key={f}
                className={"sam-spr__f sam-spr__f--" + c}
                aria-hidden="true"
                style={{ "--x": x + "%", "--y": y + "%", "--r": r + "deg", "--c3": k % 3, "--r3": Math.floor(k / 3), "--c2": k % 2, "--r2": Math.floor(k / 2), "--k": k }}
              >
                <i />
                <span className="sam-spr__file">{f}</span>
                <span className="sam-spr__mod">{m}</span>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ── 3. connected ecosystem: orbit around one control layer ─────────────────────────── */
const SAM_ORBIT = [
  ["Clients", "Companies, contacts, terms and taxes in one record.", "pj"],
  ["Bids", "From drafted to submitted, won or lost — with expiry dates.", "pj"],
  ["Projects", "Work orders, categories, countries and target groups.", "pj"],
  ["Quotas", "Target groups and cells that fill as respondents arrive.", "sm"],
  ["Suppliers", "Vendors and the sample they send to each project.", "sm"],
  ["Surveys", "Survey links that respondents pass through.", "sm"],
  ["Respondents", "Clicks, completes, terminates, over-quotas and drop-outs.", "al"],
  ["Quality checks", "Duplicate, geolocation, fingerprint and other checks.", "q"],
  ["Invoices", "Reconciled counts, invoices and payments received.", "q"],
  ["Reports", "Overall, client, vendor, conversion and click reports.", "an"],
];
function SAM_Eco() {
  const [ref, v] = ppIn(0.25);
  const [a, setA] = ee.useState(-1);
  const [auto] = ixCycle(SAM_ORBIT.length, v && a < 0, 2200, false);
  const cur = a >= 0 ? a : auto;
  const n = SAM_ORBIT.length;
  const pos = (k) => {
    const ang = ((k / n) * 360 - 90) * (Math.PI / 180);
    return [50 + 40 * Math.cos(ang), 50 + 40 * Math.sin(ang)];
  };
  return (
    <section className="sam-sec sam-eco" aria-labelledby="sam-eco-h">
      <div className="container sam-eco__in">
        <div ref={ref} className={"sam-orb" + (v ? " is-in" : "")}>
          <svg className="sam-orb__svg" viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" className="sam-orb__ring" />
            <circle cx="50" cy="50" r="26" className="sam-orb__ring sam-orb__ring--in" />
            {SAM_ORBIT.map((o, k) => {
              const [x, y] = pos(k);
              return <line key={o[0]} x1="50" y1="50" x2={x} y2={y} className={"sam-orb__ln sam-orb__ln--" + o[2] + (k === cur ? " is-on" : "")} />;
            })}
          </svg>
          <div className="sam-orb__core" aria-hidden="true">
            <img src={SAM_MARK} width="256" height="256" alt="" />
            <b>Sampledge</b>
            <small>control layer</small>
          </div>
          {SAM_ORBIT.map(([t, d, c], k) => {
            const [x, y] = pos(k);
            return (
              <button
                key={t}
                type="button"
                className={"sam-orb__n sam-orb__n--" + c + (k === cur ? " is-on" : "")}
                style={{ left: x + "%", top: y + "%" }}
                aria-pressed={k === cur}
                onMouseEnter={() => setA(k)}
                onFocus={() => setA(k)}
                onClick={() => setA(k)}
              >
                {t}
              </button>
            );
          })}
        </div>
        <div className="sam-eco__copy">
          <SAM_Head id="sam-eco-h" k="Connected ecosystem" t="One Control Layer for the Work Behind the Work." s="Everything a research project depends on — clients, bids, suppliers, respondents, quality checks, invoices and reports — connected to the same project record." />
          <div className={"sam-eco__card sam-eco__card--" + SAM_ORBIT[cur][2]} aria-live="polite">
            <span>{String(cur + 1).padStart(2, "0")}</span>
            <b>{SAM_ORBIT[cur][0]}</b>
            <p>{SAM_ORBIT[cur][1]}</p>
          </div>
          <p className="sam-eco__note">Change something in one place and every view that depends on it — dashboards, reports, reconciliation — works from the same numbers.</p>
        </div>
      </div>
    </section>
  );
}

/* ── 4. capability map: periodic-table style board ──────────────────────────────────── */
const SAM_CAPS = [
  ["Pc", "Project Control", "pj", "project", "Create a project once and run it from one record.", ["Client, work order, category and project type", "Countries, target groups, LOI, incidence and CPI", "Live, hold, test and closed status for every project"], "Projects & bids"],
  ["Qi", "Quota Intelligence", "sm", "quota", "See every quota cell filling in real time.", ["Target groups per country", "Completes and over-quotas tracked against each cell", "Early sight of cells that are lagging or nearly full"], "Dashboards"],
  ["Sm", "Supplier Management", "sm", "supplier", "Run several sample suppliers without losing track.", ["Vendors managed as companies alongside clients", "Per-supplier clicks, completes, terminates and conversion", "Vendor dashboard and vendor report"], "Companies"],
  ["Lf", "Live Fieldwork Visibility", "al", "live", "Know what is happening in field right now.", ["Clicks, completes, terminates, over-quotas and drop-outs", "Status by project and by supplier", "Problems visible before someone has to ask"], "Dashboards"],
  ["Rr", "Respondent & Incentive Records", "sm", "record", "Keep respondent activity and incentives traceable.", ["Respondent status recorded against each project", "Incentive records kept with the project", "One reference when questions come later"], null],
  ["Rc", "Reconciliation", "q", "scale", "Close projects without a week of spreadsheet matching.", ["Reconciled completes per supplier", "Invoice pending, invoiced and payment received", "Revenue, cost and profit on the project dashboard"], "Dashboards"],
  ["Rd", "Reporting & Dashboards", "an", "chart", "Answer the client and your own team from the same data.", ["Project, bidding and vendor dashboards", "Overall, client, vendor, conversion and click reports", "Filters and the report columns you choose"], "Reports"],
  ["Wa", "Workflow Automation", "al", "bolt", "Let routine steps follow rules, not reminders.", ["Rules built around project events", "Status changes and notifications without chasing", "Rules agreed for your setup during onboarding"], null],
  ["Ap", "API Connectivity", "pj", "plug", "Share project information with the systems that need it.", ["API-key access for vendors to retrieve survey information", "Marketplace integration on Pro and Premium plans", "Connections confirmed for your setup in the demo"], "Administration"],
  ["Ms", "Multi-Layer Security", "q", "shield", "Protect access, activity and respondent quality.", ["Role-based access and user management", "Activity logs with user, role, IP address and result", "Respondent checks set per project"], "Administration"],
];
const SAM_LEGEND = [["pj", "Project"], ["sm", "Sample"], ["q", "Quality"], ["al", "Alert"], ["an", "Analytics"]];
function SAM_Caps({ onTour }) {
  const [ref, v] = ppIn(0.2);
  const [i, pick] = v4Pick(SAM_CAPS.length, v, 3200);
  const c = SAM_CAPS[i];
  return (
    <section className="sam-sec sam-caps" aria-labelledby="sam-caps-h">
      <div className="container">
        <SAM_Head id="sam-caps-h" k="Capability map" t="Ten Capabilities. One Operational Picture." s="Choose a capability to see what it covers. Colours show what each one is about." />
        <ul className="sam-legend" aria-label="Colour key">
          {SAM_LEGEND.map(([k, t]) => (
            <li key={k} className={"sam-legend--" + k}>
              <i aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
        <div ref={ref} className="sam-caps__in">
          <div className="sam-pt" role="tablist" aria-label="Sampledge capabilities">
            {SAM_CAPS.map(([sym, t, col, ic], k) => (
              <button key={t} type="button" role="tab" id={"sam-cap-t" + k} aria-selected={k === i} aria-controls="sam-cap-p" className={"sam-pt__el sam-pt__el--" + col + (k === i ? " is-on" : "")} onClick={() => pick(k)} style={{ "--k": k }}>
                <small>{String(k + 1).padStart(2, "0")}</small>
                <b aria-hidden="true">{sym}</b>
                <span>{t}</span>
              </button>
            ))}
          </div>
          <div className={"sam-cap sam-cap--" + c[2]} id="sam-cap-p" role="tabpanel" aria-labelledby={"sam-cap-t" + i} key={i}>
            <span className="sam-cap__ic">
              <SAM_Ico n={c[3]} s={26} />
            </span>
            <h3>{c[1]}</h3>
            <p className="sam-cap__lead">{c[4]}</p>
            <ul>
              {c[5].map((x) => (
                <li key={x}>
                  <SAM_Ico n="check" s={15} />
                  {x}
                </li>
              ))}
            </ul>
            {c[6] && (
              <a href="#sam-tour" className="sam-cap__see" onClick={(e) => onTour(e, c[6])}>
                See it in the interface <span aria-hidden="true">→</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 4b. inside Sampledge: layered interface showcase with zoom ─────────────────────── */
const SAM_TOUR = [
  ["Dashboards", "Where the day starts: what is live, what is filling and what needs a decision.", [["pm", "Project dashboard", "Clients, vendors and projects at a glance, with revenue, cost, profit, clicks, completes, reconciled, invoice and payment status."], ["vendor", "Vendor dashboard", "Clicks, completes, terminates, over-quotas and drop-outs, above every project and its current status."]]],
  ["Projects & bids", "Set a project up properly once, and keep every bid moving.", [["create", "Create project", "Project information, countries and target groups, allowed devices and the respondent checks to apply."], ["bid", "Bid management", "Every bid with its client, project, status and expiry date, through to won bids."]]],
  ["Companies", "Clients and suppliers kept as proper records, not contact sheets.", [["company", "Manage companies", "Clients and vendors in one list, with category, origin country and status."], ["addco", "Add company", "Basic information, company type, office addresses, contact persons, terms and taxes."]]],
  ["Reports", "Five report types, filtered your way, with the columns you need.", [["overall", "Overall report", "Filter by client, vendor, project or salesperson and choose the report columns."], ["conversion", "Conversion report", "Response and conversion status by project, vendor and country."], ["clicks", "Clicks report", "Click-level detail by vendor, response status, project and country."]]],
  ["Administration", "Who can do what, what happened and how the workspace is set up.", [["roles", "Role management", "Roles such as admin, bidding, client, vendor and marketplace, each with its own permissions."], ["logs", "Activity logs", "Every login and change with time, user, role, category, IP address and result."], ["countries", "Countries & settings", "Countries, departments, currencies, industries, project types, service categories and taxes."]]],
];
function SAM_Tour({ tab, setTab }) {
  const [s, setS] = ee.useState(0);
  const [zoom, setZoom] = ee.useState(null);
  const dlg = ee.useRef(null);
  const g = SAM_TOUR[tab];
  const screens = g[2];
  const cur = Math.min(s, screens.length - 1);
  ee.useEffect(() => setS(0), [tab]);
  ee.useEffect(() => {
    const d = dlg.current;
    if (!d) return;
    if (zoom && !d.open && d.showModal) d.showModal();
    if (!zoom && d.open) d.close();
  }, [zoom]);
  return (
    <section className="sam-sec sam-tour" id="sam-tour" aria-labelledby="sam-tour-h">
      <div className="container">
        <SAM_Head id="sam-tour-h" k="Inside Sampledge" t="The Platform, Screen by Screen." s="Real screens from the Sampledge interface. Client and project names are blurred. Select a screen to bring it forward, or zoom in to read it." dark />
        <div className="sam-tour__tabs" role="tablist" aria-label="Interface areas">
          {SAM_TOUR.map(([t], k) => (
            <button key={t} type="button" role="tab" id={"sam-tour-t" + k} aria-selected={k === tab} aria-controls="sam-tour-p" className={k === tab ? "is-on" : ""} onClick={() => setTab(k)}>
              {t}
            </button>
          ))}
        </div>
        <div className="sam-tour__in" id="sam-tour-p" role="tabpanel" aria-labelledby={"sam-tour-t" + tab}>
          <div className="sam-tour__copy">
            <p className="sam-tour__lead">{g[1]}</p>
            <ol className="sam-tour__list">
              {screens.map(([k, t, d], n) => (
                <li key={k}>
                  <button type="button" className={n === cur ? "is-on" : ""} aria-pressed={n === cur} onClick={() => setS(n)}>
                    <b>{t}</b>
                    <span>{d}</span>
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <div className={"sam-tour__stack sam-tour__stack--" + screens.length} key={tab}>
            {screens.map(([k, t], n) => {
              const depth = (n - cur + screens.length) % screens.length;
              return (
                <div key={k} className={"sam-tour__card" + (depth === 0 ? " is-front" : "")} style={{ "--d": depth }} aria-hidden={depth !== 0}>
                  <div className="sam-tour__chrome" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                    <span>{t}</span>
                  </div>
                  <SAM_Shot k={k} />
                  {depth === 0 ? (
                    <button type="button" className="sam-tour__zoom" onClick={() => setZoom(k)}>
                      <SAM_Ico n="zoom" s={16} />
                      Zoom to read
                    </button>
                  ) : (
                    <button type="button" className="sam-tour__pick" tabIndex={-1} onClick={() => setS(n)}>
                      <span className="sr-only">Show {t}</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <dialog ref={dlg} className="sam-zoom" aria-label="Enlarged Sampledge screen" onClose={() => setZoom(null)} onClick={(e) => e.target === dlg.current && setZoom(null)}>
        {zoom && (
          <div className="sam-zoom__in">
            <div className="sam-zoom__bar">
              <b>{(SAM_TOUR.flatMap((x) => x[2]).find((x) => x[0] === zoom) || [])[1]}</b>
              <button type="button" onClick={() => setZoom(null)} aria-label="Close enlarged screen">
                <SAM_Ico n="close" s={18} />
              </button>
            </div>
            <div className="sam-zoom__img">
              <SAM_Shot k={zoom} eager />
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}

/* ── 5. workflow: metro line with eight stations ────────────────────────────────────── */
const SAM_FLOW = [
  ["Create", "pj", "Set up the project: client, work order, category, countries and target groups."],
  ["Configure", "pj", "Define quotas, LOI, incidence and CPI, the devices allowed and the respondent checks to run."],
  ["Connect", "sm", "Attach suppliers and survey links. Each vendor sees only what its role allows."],
  ["Collect", "sm", "Respondents arrive from every source and are recorded as clicks, completes, terminates and over-quotas."],
  ["Monitor", "al", "Watch progress by project, supplier and country while fieldwork is live."],
  ["Validate", "q", "Duplicate, geolocation, fingerprint and other checks keep the sample clean."],
  ["Reconcile", "q", "Agree final counts with each supplier, then move invoicing and payment forward."],
  ["Report", "an", "Run overall, client, vendor, conversion and click reports with the columns you choose."],
];
function SAM_Flow() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(SAM_FLOW.length, v, 2400);
  return (
    <section className="sam-sec sam-flow" id="sam-flow" aria-labelledby="sam-flow-h">
      <div className="container">
        <SAM_Head id="sam-flow-h" k="How Sampledge works" t="Eight Stations, One Line From Brief to Close." s="Every project follows the same line, so nothing waits in someone's inbox between stages." center />
        <div ref={ref} className="sam-metro" style={{ "--i": i, "--n": SAM_FLOW.length }}>
          <div className="sam-metro__track" aria-hidden="true">
            <i className="sam-metro__fill" />
            <i className="sam-metro__train" />
          </div>
          <ol className="sam-metro__st">
            {SAM_FLOW.map(([t, c], k) => (
              <li key={t} className={"sam-metro__s sam-metro__s--" + c + (k === i ? " is-on" : k < i ? " is-done" : "")}>
                <button type="button" aria-pressed={k === i} onClick={() => pick(k)}>
                  <i aria-hidden="true" />
                  <small>{String(k + 1).padStart(2, "0")}</small>
                  <b>{t.toUpperCase()}</b>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className={"sam-metro__d sam-metro__d--" + SAM_FLOW[i][1]} aria-live="polite" key={i}>
          <b>{SAM_FLOW[i][0]}</b>
          <p>{SAM_FLOW[i][2]}</p>
        </div>
      </div>
    </section>
  );
}

/* ── 6. live operations: concept dashboard (states only, no data) ───────────────────── */
const SAM_ALERTS = [
  ["al", "quota", "Quota cell nearly full", "Country 2 · 35–44", "Cap or redirect the source"],
  ["al", "live", "Terminate rate rising", "Supplier C", "Check the screener and link"],
  ["q", "check", "Completes verified", "Supplier A", "Ready to reconcile"],
  ["an", "chart", "Client report ready", "Weekly status", "Share the latest view"],
  ["sm", "supplier", "New supplier link connected", "Supplier D", "Test before going live"],
  ["pj", "project", "Project moved to live", "Brand tracker wave", "Monitoring has started"],
];
const SAM_CELLS = [
  ["Country 1 · 18–34", 100, "q", "Full"],
  ["Country 1 · 35–54", 68, "pj", "On track"],
  ["Country 2 · 18–34", 92, "al", "Nearly full"],
  ["Country 2 · 35–44", 95, "al", "Nearly full"],
  ["Country 3 · All", 22, "al", "Lagging"],
];
const SAM_SUP = [["Supplier A", "q", "Healthy"], ["Supplier B", "q", "Healthy"], ["Supplier C", "al", "Watch"], ["Supplier D", "sm", "Testing"]];
function SAM_Ops() {
  const [ref, v] = ppIn(0.25);
  const [t] = ixCycle(SAM_ALERTS.length, v, 2600, false);
  const order = SAM_ALERTS.map((_, k) => SAM_ALERTS[(t + k) % SAM_ALERTS.length]);
  return (
    <section className="sam-sec sam-ops" aria-labelledby="sam-ops-h">
      <div className="container">
        <div className="sam-ops__top">
          <SAM_Head id="sam-ops-h" k="Live operations" t="Know What Needs Attention Before Someone Has to Ask." s="Instead of opening every file to find the problem, the problems come to you — ranked by what needs a decision first." />
        </div>
        <div ref={ref} className={"sam-dash" + (v ? " is-in" : "")} role="img" aria-label="Concept view of a live operations board: an attention queue with nearly full quota cells, a rising terminate rate and a report ready to share; quota cells shown as full, on track, nearly full or lagging; and suppliers marked healthy, watch or testing.">
          <div className="sam-dash__bar" aria-hidden="true">
            <span>
              <i className="v4-live" /> Operations board
            </span>
            <em>Concept view · sample states, not live data</em>
          </div>
          <div className="sam-dash__grid" aria-hidden="true">
            <div className="sam-dash__q">
              <h3 className="sam-dash__t">Attention queue</h3>
              <ul>
                {order.slice(0, 4).map(([c, ic, a, w, n], k) => (
                  <li key={a} className={"sam-dash__a sam-dash__a--" + c + (k === 0 ? " is-top" : "")}>
                    <span className="sam-dash__ic">
                      <SAM_Ico n={ic} s={15} />
                    </span>
                    <span>
                      <b>{a}</b>
                      <small>
                        {w} · {n}
                      </small>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sam-dash__cells">
              <h3 className="sam-dash__t">Quota cells</h3>
              <ul>
                {SAM_CELLS.map(([n, p, c, s]) => (
                  <li key={n} className={"sam-dash__cell sam-dash__cell--" + c}>
                    <span>{n}</span>
                    <i>
                      <b style={{ "--w": p + "%" }} />
                    </i>
                    <em>{s}</em>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sam-dash__sup">
              <h3 className="sam-dash__t">Suppliers</h3>
              <ul>
                {SAM_SUP.map(([n, c, s], k) => (
                  <li key={n} className={"sam-dash__s sam-dash__s--" + c}>
                    <b>{n}</b>
                    <svg viewBox="0 0 80 24" aria-hidden="true">
                      <path d={["M0 18 L14 14 L28 15 L42 10 L56 11 L70 7 L80 8", "M0 16 L14 15 L28 12 L42 12 L56 9 L70 9 L80 6", "M0 10 L14 11 L28 13 L42 12 L56 16 L70 18 L80 20", "M0 20 L20 20 L40 18 L60 17 L80 15"][k]} />
                    </svg>
                    <em>{s}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 7. automation: rule builder (WHEN / IF / THEN / NOTIFY / UPDATE / TRIGGER) ─────── */
const SAM_RULE_PARTS = [
  ["WHEN", "pj", ["a quota cell reaches its target", "a supplier's terminate rate rises", "fieldwork is marked complete", "a bid is won"]],
  ["IF", "sm", ["other cells are still open", "it stays above the agreed level", "all quotas are met", "the client record is complete"]],
  ["THEN", "q", ["close the cell for every supplier", "pause that supplier's link", "lock completes for reconciliation", "create the project from the bid"]],
  ["NOTIFY", "al", ["the project owner", "the supplier and project owner", "the finance team", "the bidding team"]],
  ["UPDATE", "an", ["quota status", "supplier status", "project status to closed", "bid status to won"]],
  ["TRIGGER", "pj", ["redirect over-quota respondents", "a quality review task", "the client report", "project set-up"]],
];
const SAM_PRESETS = [["Protect a quota", [0, 0, 0, 0, 0, 0]], ["Watch supplier quality", [1, 1, 1, 1, 1, 1]], ["Close out fieldwork", [2, 2, 2, 2, 2, 2]], ["Won bid to project", [3, 3, 3, 3, 3, 3]]];
function SAM_Rules() {
  const [sel, setSel] = ee.useState(SAM_PRESETS[0][1]);
  const preset = SAM_PRESETS.findIndex((p) => p[1].every((x, k) => x === sel[k]));
  return (
    <section className="sam-sec sam-rules" aria-labelledby="sam-rules-h">
      <div className="container sam-rules__in">
        <div className="sam-rules__copy">
          <SAM_Head id="sam-rules-h" k="Workflow automation" t="Rules Instead of Reminders." s="Describe the routine once — what happens, under which condition, who hears about it and what moves next. Build a rule below." dark />
          <div className="sam-rules__pre" role="group" aria-label="Example rules">
            {SAM_PRESETS.map(([t, v], k) => (
              <button key={t} type="button" aria-pressed={preset === k} className={preset === k ? "is-on" : ""} onClick={() => setSel(v)}>
                {t}
              </button>
            ))}
          </div>
          <p className="sam-rules__note">These examples show the kind of operational rules Sampledge is designed around. Which automations are set up for your workspace is agreed during your demo and onboarding.</p>
        </div>
        <div className="sam-rule">
          {SAM_RULE_PARTS.map(([k, c, opts], n) => (
            <label key={k} className={"sam-rule__row sam-rule__row--" + c} style={{ "--k": n }}>
              <span className="sam-rule__k">{k}</span>
              <select
                value={sel[n]}
                onChange={(e) => {
                  const x = sel.slice();
                  x[n] = +e.target.value;
                  setSel(x);
                }}
              >
                {opts.map((o, j) => (
                  <option key={o} value={j}>
                    {o}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <p className="sam-rule__out" aria-live="polite">
            <SAM_Ico n="bolt" s={16} />
            <span>
              When {SAM_RULE_PARTS[0][2][sel[0]]}, if {SAM_RULE_PARTS[1][2][sel[1]]}: {SAM_RULE_PARTS[2][2][sel[2]]}, notify {SAM_RULE_PARTS[3][2][sel[3]]}, update {SAM_RULE_PARTS[4][2][sel[4]]} and trigger {SAM_RULE_PARTS[5][2][sel[5]]}.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 8. AI-ready: foundations today, directions on the horizon ──────────────────────── */
const SAM_GROUND = [["Structured project records", "Every project, quota, supplier and respondent status in consistent fields."], ["Complete activity history", "Who did what, and when, recorded in the activity log."], ["One source for reporting", "Dashboards and reports read from the same data."], ["API access", "Information can be shared with other systems through API keys."]];
const SAM_HORIZON = ["Earlier warnings on cells that are likely to lag", "Suggested supplier mix based on past project performance", "Plain-language questions about project data", "Flags on unusual response patterns"];
function SAM_Ahead() {
  const [ref, v] = ppIn(0.3);
  return (
    <section className="sam-sec sam-ahead" aria-labelledby="sam-ahead-h">
      <div className="container">
        <SAM_Head id="sam-ahead-h" k="Where Sampledge is heading" t="AI Needs Clean Operations First. That's Where We Started." s="Useful AI depends on structured, trustworthy operational data. That foundation is what Sampledge is built on today." center />
        <div ref={ref} className={"sam-hz" + (v ? " is-in" : "")}>
          <div className="sam-hz__now">
            <span className="sam-hz__tag sam-hz__tag--now">In Sampledge today</span>
            <ul>
              {SAM_GROUND.map(([t, d], k) => (
                <li key={t} style={{ "--k": k }}>
                  <SAM_Ico n="check" s={15} />
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="sam-hz__sky" aria-hidden="true">
            <svg viewBox="0 0 400 200" preserveAspectRatio="none">
              <path d="M0 190 C120 180 220 120 400 20" className="sam-hz__path" />
            </svg>
            <i className="sam-hz__sun" />
          </div>
          <div className="sam-hz__next">
            <span className="sam-hz__tag sam-hz__tag--next">Directions we are exploring</span>
            <ul>
              {SAM_HORIZON.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  <SAM_Ico n="spark" s={15} />
                  {t}
                </li>
              ))}
            </ul>
            <p>Not available today. Shared to show direction, not as a commitment or a release date.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 9. integrations: patch bay with generic connection types ───────────────────────── */
const SAM_PORTS = [
  ["Survey platforms", "Survey links respondents pass through, set per project.", "sm", "list"],
  ["Sample suppliers", "Vendor links and redirects tracked by status.", "sm", "supplier"],
  ["Vendor API access", "API keys let vendors retrieve survey information for their projects.", "pj", "plug"],
  ["Marketplace", "Marketplace integration on the Pro and Premium plans.", "an", "layers"],
  ["Reports & exports", "Reports with the columns you choose, ready to share.", "q", "chart"],
];
function SAM_Plug() {
  const [ref, v] = ppIn(0.3);
  const [a, setA] = ee.useState(-1);
  return (
    <section className="sam-sec sam-plug" aria-labelledby="sam-plug-h">
      <div className="container sam-plug__in">
        <div className="sam-plug__copy">
          <SAM_Head id="sam-plug-h" k="Connections" t="Built to Sit in the Middle of Your Stack." s="Sampledge connects the places sample comes from and the places results go — without another layer of copying." />
          <p className="sam-plug__note">We don't list tool names here. Which survey platforms, suppliers and systems connect for your setup, and how, is confirmed during your demo.</p>
        </div>
        <div ref={ref} className={"sam-bay" + (v ? " is-in" : "")}>
          <ul className="sam-bay__ports">
            {SAM_PORTS.map(([t, d, c, ic], k) => (
              <li key={t} className={"sam-bay__p sam-bay__p--" + c + (a === k ? " is-on" : "")} style={{ "--k": k }} onMouseEnter={() => setA(k)} onMouseLeave={() => setA(-1)} tabIndex={0} onFocus={() => setA(k)} onBlur={() => setA(-1)}>
                <span className="sam-bay__ic">
                  <SAM_Ico n={ic} s={18} />
                </span>
                <span>
                  <b>{t}</b>
                  <small>{d}</small>
                </span>
              </li>
            ))}
          </ul>
          <svg className="sam-bay__cables" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {SAM_PORTS.map((p, k) => {
              const y = 10 + k * 20;
              return <path key={p[0]} className={"sam-bay__c sam-bay__c--" + p[2] + (a === k ? " is-on" : "")} d={`M0 ${y} C 50 ${y}, 50 50, 100 50`} style={{ "--k": k }} />;
            })}
          </svg>
          <div className="sam-bay__hub" aria-hidden="true">
            <img src={SAM_MARK} width="256" height="256" alt="" />
            <b>Sampledge</b>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 10. audiences: expanding panels ────────────────────────────────────────────────── */
const SAM_WHO = [
  ["Research Agencies", "pj", "Several clients, several projects, one small operations team.", ["One view of every live project", "Bids, projects and client reports linked", "Clean reconciliation before invoicing"]],
  ["Fieldwork Companies", "sm", "Delivering for other agencies under tight timelines.", ["Quota cells tracked across suppliers", "Live status to share with the commissioning agency", "Respondent checks applied consistently"]],
  ["Panel & Sample Organisations", "q", "Sending sample into many projects at once.", ["Clicks, completes and terminates by project", "Role-based access for vendors and clients", "Faster agreement on final counts"]],
  ["In-House Insights Teams", "an", "Running research with external suppliers, inside a larger business.", ["Visibility without chasing suppliers", "Consistent records across studies", "Reports ready for internal stakeholders"]],
];
function SAM_Who() {
  const [a, setA] = ee.useState(0);
  return (
    <section className="sam-sec sam-who" aria-labelledby="sam-who-h">
      <div className="container">
        <SAM_Head id="sam-who-h" k="Who Sampledge is for" t="Built for the Teams That Keep Research Moving." dark />
        <div className="sam-who__row">
          {SAM_WHO.map(([t, c, d, pts], k) => (
            <div key={t} className={"sam-who__p sam-who__p--" + c + (a === k ? " is-on" : "")} onMouseEnter={() => setA(k)}>
              <h3>
                <button type="button" aria-expanded={a === k} aria-controls={"sam-who-" + k} onClick={() => setA(k)} onFocus={() => setA(k)}>
                  <small>{String(k + 1).padStart(2, "0")}</small>
                  <span>{t}</span>
                </button>
              </h3>
              <div className="sam-who__body" id={"sam-who-" + k}>
                <p>{d}</p>
                <ul>
                  {pts.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 11. use cases: vertical tabs with a small diagram each ─────────────────────────── */
const SAM_CASES = [
  ["Multi-Country Studies", "globe", "One project, several countries, each with its own target groups and suppliers.", ["Countries and target groups set in the project", "Progress by country while fieldwork is live", "One reconciliation across every market"]],
  ["Complex Quota Projects", "quota", "Interlocking cells where one full cell can quietly break the design.", ["Every cell visible as it fills", "Over-quotas tracked, not discovered later", "Cells that lag surfaced early"]],
  ["Multi-Supplier Fieldwork", "supplier", "Several vendors feeding one project, each with its own links and counts.", ["Per-supplier clicks, completes and terminates", "Vendor dashboard and vendor report", "Final counts agreed supplier by supplier"]],
  ["B2B & Specialist Audiences", "shield", "Low incidence and high cost per complete, so every respondent matters.", ["Incidence, LOI and CPI tracked per target group", "Prescreening and gate checks before the survey", "Duplicate and fingerprint checks on each response"]],
  ["Client Reporting", "chart", "Clients want to know where things stand — usually today.", ["Client report filtered to their projects", "The columns they care about, nothing else", "No more hand-built status spreadsheets"]],
];
function SAM_CaseArt({ k }) {
  if (k === 0)
    return (
      <div className="sam-art sam-art--geo">
        {["Country 1", "Country 2", "Country 3", "Country 4"].map((c, n) => (
          <span key={c} style={{ "--w": [86, 64, 92, 40][n] + "%", "--k": n }}>
            <b>{c}</b>
            <i />
          </span>
        ))}
      </div>
    );
  if (k === 1)
    return (
      <div className="sam-art sam-art--grid">
        {Array.from({ length: 16 }, (_, n) => (
          <i key={n} className={[3, 9].includes(n) ? "is-full" : [6, 14].includes(n) ? "is-low" : ""} style={{ "--k": n }} />
        ))}
      </div>
    );
  if (k === 2)
    return (
      <div className="sam-art sam-art--lanes">
        {["A", "B", "C", "D"].map((c, n) => (
          <span key={c} style={{ "--k": n }}>
            <b>Supplier {c}</b>
            <i />
          </span>
        ))}
        <em>Project</em>
      </div>
    );
  if (k === 3)
    return (
      <div className="sam-art sam-art--funnel">
        {["Arrivals", "Prescreen", "Gate check", "Quality checks", "Completes"].map((c, n) => (
          <span key={c} style={{ "--w": 100 - n * 16 + "%", "--k": n }}>
            {c}
          </span>
        ))}
      </div>
    );
  return (
    <div className="sam-art sam-art--report">
      <span className="sam-art__h">Client report</span>
      {["Project", "Country", "Completes", "Status"].map((c, n) => (
        <span key={c} className="sam-art__r" style={{ "--k": n }}>
          <b>{c}</b>
          <i />
        </span>
      ))}
    </div>
  );
}
function SAM_Cases() {
  const [ref, v] = ppIn(0.25);
  const [i, pick] = v4Pick(SAM_CASES.length, v, 4200);
  const c = SAM_CASES[i];
  return (
    <section className="sam-sec sam-cases" aria-labelledby="sam-cases-h">
      <div className="container">
        <SAM_Head id="sam-cases-h" k="Use cases" t="Made for the Projects Spreadsheets Struggle With." />
        <div ref={ref} className="sam-cases__in">
          <div className="sam-cases__tabs" role="tablist" aria-label="Use cases" aria-orientation="vertical">
            {SAM_CASES.map(([t, ic], k) => (
              <button key={t} type="button" role="tab" id={"sam-case-t" + k} aria-selected={k === i} aria-controls="sam-case-p" className={k === i ? "is-on" : ""} onClick={() => pick(k)}>
                <SAM_Ico n={ic} s={18} />
                {t}
              </button>
            ))}
          </div>
          <div className="sam-cases__p" id="sam-case-p" role="tabpanel" aria-labelledby={"sam-case-t" + i} key={i}>
            <div className="sam-cases__txt">
              <h3>{c[0]}</h3>
              <p>{c[2]}</p>
              <ul>
                {c[3].map((x) => (
                  <li key={x}>
                    <SAM_Ico n="check" s={15} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <div className="sam-cases__art" aria-hidden="true">
              <SAM_CaseArt k={i} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 12. before / after slider ──────────────────────────────────────────────────────── */
function SAM_Compare() {
  const [x, setX] = ee.useState(50);
  return (
    <section className="sam-sec sam-cmp" aria-labelledby="sam-cmp-h">
      <div className="container">
        <SAM_Head id="sam-cmp-h" k="Before and after" t="Same Project. Two Very Different Afternoons." s="Drag the handle to compare running a project from files and inboxes with running it in Sampledge." center />
        <div className="sam-cmp__frame" style={{ "--x": x + "%" }}>
          <div className="sam-cmp__side sam-cmp__side--before" aria-hidden="true">
            <span className="sam-cmp__lbl">Before</span>
            <ul className="sam-cmp__mail">
              {["RE: RE: FW: updated quotas??", "Supplier B — are we still live?", "Completes don't match (urgent)", "Client asking for status again", "Which reconciliation file is final?"].map((m, k) => (
                <li key={m} style={{ "--k": k }}>
                  <i />
                  {m}
                </li>
              ))}
            </ul>
            <div className="sam-cmp__xl">
              {Array.from({ length: 24 }, (_, k) => (
                <i key={k} className={[5, 11, 14, 20].includes(k) ? "is-err" : ""} />
              ))}
            </div>
            <span className="sam-cmp__note">Quota_v9_FINAL(2).xlsx</span>
          </div>
          <div className="sam-cmp__side sam-cmp__side--after" aria-hidden="true">
            <span className="sam-cmp__lbl">With Sampledge</span>
            <ul className="sam-cmp__rows">
              {[["Project live", "pj"], ["Quota cells on track", "q"], ["Supplier C on watch", "al"], ["Reconciliation ready", "q"], ["Client report shared", "an"]].map(([m, c]) => (
                <li key={m} className={"sam-cmp__r--" + c}>
                  <i />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <i className="sam-cmp__handle" aria-hidden="true" />
          <input className="sam-cmp__range" type="range" min="0" max="100" value={x} onChange={(e) => setX(+e.target.value)} aria-label="Compare before and after Sampledge" aria-valuetext={x < 35 ? "Showing mostly with Sampledge" : x > 65 ? "Showing mostly before Sampledge" : "Showing both"} />
        </div>
        <div className="sam-cmp__sr">
          <p>
            <b>Before:</b> quota updates by email, separate spreadsheets for each supplier, mismatched completes and repeated status requests from the client.
          </p>
          <p>
            <b>With Sampledge:</b> one project record showing live status, quota cells, supplier health, reconciliation and the client report.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── 13. business value: friction ledger ────────────────────────────────────────────── */
const SAM_LESS = ["Copying numbers between files", "Chasing suppliers for status", "Version conflicts on quota sheets", "Disputes over final counts", "Building status updates by hand"];
const SAM_MORE = ["One record per project", "Live view of every source", "Consistent respondent checks", "A clear trail of who changed what", "Time back for the research itself"];
function SAM_Value() {
  const [ref, v] = ppIn(0.3);
  return (
    <section className="sam-sec sam-val" aria-labelledby="sam-val-h">
      <div className="container">
        <div ref={ref} className={"sam-ledger" + (v ? " is-in" : "")}>
          <div className="sam-ledger__h">
            <span className="sam-head__k">Business value</span>
            <h2 id="sam-val-h">
              Less Operational Friction. <em>More Control.</em>
            </h2>
          </div>
          <div className="sam-ledger__col sam-ledger__col--less">
            <h3>
              <span aria-hidden="true">−</span> Less
            </h3>
            <ul>
              {SAM_LESS.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  <s>{t}</s>
                </li>
              ))}
            </ul>
          </div>
          <div className="sam-ledger__col sam-ledger__col--more">
            <h3>
              <span aria-hidden="true">+</span> More
            </h3>
            <ul>
              {SAM_MORE.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 14. security: concentric layers ────────────────────────────────────────────────── */
const SAM_LAYERS = [
  ["Access", "lock", "Who can see and do what.", ["Role-based access — admin, bidding, client, vendor, marketplace and more", "User management with per-user roles", "Permissions described for every role"]],
  ["Accountability", "eye", "What happened, and who did it.", ["Activity logs for logins and changes", "Time, user, role, category and IP address recorded", "Success or failure shown for each event"]],
  ["Respondent quality", "shield", "Checks applied to every respondent, set per project.", ["Gate survey and prescreening", "URL protection, geolocation and CAPTCHA", "Duplicate detection and browser fingerprinting", "Browser language, timezone tracking, TOR detection and cookie validation"]],
  ["Configuration", "device", "Rules that shape each project before fieldwork starts.", ["Allowed devices — desktop, mobile and tablet", "Countries and target groups per project", "Managed e-mail accounts and workspace settings"]],
];
function SAM_Shield() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(SAM_LAYERS.length, v, 3400);
  const l = SAM_LAYERS[i];
  return (
    <section className="sam-sec sam-sec-sh" aria-labelledby="sam-sh-h">
      <div className="container sam-sh__in">
        <div ref={ref} className="sam-rings">
          {SAM_LAYERS.map(([t], k) => (
            <button key={t} type="button" className={"sam-rings__r sam-rings__r--" + k + (k === i ? " is-on" : "")} style={{ "--k": k }} aria-pressed={k === i} onClick={() => pick(k)}>
              <span>{t}</span>
            </button>
          ))}
          <span className="sam-rings__core" aria-hidden="true">
            <SAM_Ico n="shield" s={28} />
          </span>
        </div>
        <div className="sam-sh__copy">
          <SAM_Head id="sam-sh-h" k="Security" t="Security in Layers, Not Promises." s="The protections below are visible in the product today. Choose a layer." dark />
          <div className="sam-sh__card" aria-live="polite" key={i}>
            <span className="sam-sh__ic">
              <SAM_Ico n={l[1]} s={20} />
            </span>
            <h3>{l[0]}</h3>
            <p>{l[2]}</p>
            <ul>
              {l[3].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <p className="sam-sh__note">Need security details for a vendor review? Ask for them when you request your demo.</p>
        </div>
      </div>
    </section>
  );
}

/* ── 15. pricing (build 65): prices live on the Sampledge website only ───────────────── */
/* Build 65 removed the plan towers and currency table. Every pricing question goes to SAM_APP so the site can never
   show a price that differs from what Sampledge actually charges. */
const SAM_APP = "https://www.sampledge.com/pricing";
function SAM_Price() {
  const [ref, v] = ppIn(0.12);
  return (
    <section className={"sam-sec pr5-sp" + (v ? " is-in" : "")} id="sam-pricing" aria-labelledby="sam-price-h" ref={ref}>
      <div className="container pr5-sp__in">
        <div className="pr5-sp__art" aria-hidden="true">
          <i className="pr5-sp__ring" />
          <i className="pr5-sp__ring pr5-sp__ring--2" />
          <span className="pr5-sp__tag">
            <FRK_I n="coin" s={30} />
          </span>
        </div>
        <div className="pr5-sp__txt">
          <span className="pr5-sp__k">Pricing</span>
          <h2 id="sam-price-h">Plans and prices are on the Sampledge website.</h2>
          <p>Compare plans, billing periods and currencies on sampledge.com, where pricing is always current. Need a custom plan? Ask for a demo and we will walk you through it.</p>
          <div className="pr5-sp__ctas">
            <a className="sam-btn sam-btn--glow" href={SAM_APP} target="_blank" rel="noopener noreferrer">
              See Sampledge pricing <span className="sr-only">(opens sampledge.com in a new tab)</span>
            </a>
            <SAM_Btn to={SAM_FORM} cls="sam-btn--line">
              Request a demo
            </SAM_Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── 17. Frequent Research + Sampledge: origin line ─────────────────────────────────── */
const SAM_STORY = [
  ["Operational experience", "Associated with the research industry since 2017, our team has handled the daily work of research operations: quotas, suppliers, deadlines and reconciliation."],
  ["Product thinking", "The same friction kept returning — too many spreadsheets, too little visibility and too much time spent chasing status."],
  ["Technology", "Our IT & Development team turned those workflows into software, one operational problem at a time."],
  ["Sampledge", "A workspace designed by people who have lived the problem it solves."],
];
function SAM_Story() {
  const [ref, v] = ppIn(0.3);
  return (
    <section className="sam-sec sam-story" aria-labelledby="sam-story-h">
      <div className="container">
        <SAM_Head id="sam-story-h" k="Frequent Research + Sampledge" t="Built From Inside Research Operations." s="Sampledge is developed by Frequent Research." />
        <ol ref={ref} className={"sam-story__line" + (v ? " is-in" : "")}>
          {SAM_STORY.map(([t, d], k) => (
            <li key={t} style={{ "--k": k }} className={k === SAM_STORY.length - 1 ? "is-last" : ""}>
              <i aria-hidden="true">{k === SAM_STORY.length - 1 ? <img src={SAM_MARK} width="256" height="256" alt="" /> : k + 1}</i>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ── 18. philosophy ─────────────────────────────────────────────────────────────────── */
const SAM_PRINCIPLES = [
  ["Visibility Before Assumptions", "See the real state of a project before deciding what to do about it."],
  ["Automation Where It Adds Value", "Automate the routine; leave the judgement calls to people."],
  ["Control Without Complexity", "Powerful enough for complex projects, simple enough to use every day."],
  ["Data Before Decisions", "Every decision rests on one set of numbers everyone can see."],
  ["Human Judgment Where It Matters", "The software surfaces the issue; your team decides the answer."],
];
function SAM_Ethos() {
  const [ref, v] = ppIn(0.3);
  return (
    <section className="sam-sec sam-ethos" aria-labelledby="sam-ethos-h">
      <div className="container">
        <div className="sam-ethos__q">
          <span className="sam-head__k">Our philosophy</span>
          <h2 id="sam-ethos-h">
            Technology should remove operational friction — <em>not create another layer of work.</em>
          </h2>
        </div>
        <ol ref={ref} className={"sam-ethos__list" + (v ? " is-in" : "")}>
          {SAM_PRINCIPLES.map(([t, d], k) => (
            <li key={t} style={{ "--k": k }} className={"sam-ethos__i sam-ethos__i--" + ["pj", "al", "sm", "an", "q"][k]}>
              <small>{String(k + 1).padStart(2, "0")}</small>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <p className={"sam-ethos__line" + (v ? " is-in" : "")}>
          {["Less chasing.", "Less reconciling.", "Less guessing."].map((t, k) => (
            <span key={t} style={{ "--k": k }}>
              {t}{" "}
            </span>
          ))}
          <strong style={{ "--k": 3 }}>More control.</strong>
        </p>
      </div>
    </section>
  );
}

/* ── 19. final call to action ───────────────────────────────────────────────────────── */
function SAM_Close() {
  return (
    <section className="sam-close" aria-labelledby="sam-close-h">
      <div className="sam-close__bg" aria-hidden="true">
        {Array.from({ length: 6 }, (_, k) => (
          <i key={k} style={{ "--k": k }} />
        ))}
      </div>
      <div className="container sam-close__in">
        <img src={SAM_MARK} width="256" height="256" alt="" className="sam-close__mark" />
        <h2 id="sam-close-h">Your Projects Are Moving. Your Operations Should Move With Them.</h2>
        <p>See Sampledge with your own kind of project in mind — countries, quotas, suppliers and the reports your clients expect.</p>
        <div className="sam-close__ctas">
          <SAM_Btn to={SAM_FORM} cls="sam-btn--glow">
            Request a Sampledge Demo
          </SAM_Btn>
          <a className="sam-btn sam-btn--line" href={SAM_APP} target="_blank" rel="noopener noreferrer">
            View Pricing <span className="sr-only">(opens sampledge.com in a new tab)</span>
          </a>
        </div>
        <p className="sam-close__links">
          <PpL to="/products">All products</PpL>
          <PpL to="/about-us">About Frequent Research</PpL>
          <PpL to="/lets-talk?type=demo">Let's talk</PpL>
        </p>
      </div>
    </section>
  );
}

/* ── page ───────────────────────────────────────────────────────────────────────────── */
function SAM_Page() {
  usePageMeta("Sampledge", SAM_DESC);
  dmMeta(SAM_URL, SAM_TITLE, SAM_DESC);
  useJsonLd("sampledge", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "Sampledge",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Sample management software",
        operatingSystem: "Web browser",
        description:
          "Sampledge is research project and sample management software: projects and bids, quotas and target groups, sample supplier management, live fieldwork status, respondent quality checks, reconciliation, dashboards and reports, role-based access and activity logs.",
        url: `${location.origin}${SAM_URL}`,
        publisher: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        offers: { "@type": "Offer", url: SAM_APP, availability: "https://schema.org/InStock" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Products", item: `${location.origin}/products` },
          { "@type": "ListItem", position: 3, name: "Sampledge", item: `${location.origin}${SAM_URL}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: SAM_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
  const [tab, setTab] = ee.useState(0);
  const toTour = (e, name) => {
    const k = SAM_TOUR.findIndex((g) => g[0] === name);
    if (k >= 0) setTab(k);
    ppGo("sam-tour")(e);
  };
  return (
    <div className="pp sm sam">
      <SAM_Hero />
      <SAM_Sprawl />
      <SAM_Eco />
      <SAM_Caps onTour={toTour} />
      <SAM_Tour tab={tab} setTab={setTab} />
      <SAM_Flow />
      <SAM_Ops />
      <SAM_Rules />
      <SAM_Ahead />
      <SAM_Plug />
      <SAM_Who />
      <SAM_Cases />
      <SAM_Compare />
      <SAM_Value />
      <SAM_Shield />
      <SAM_Price />
      <DM_Form
        id={SAM_FORM}
        kicker="Sampledge demo"
        title="Request a Sampledge Demo"
        sub="Three quick questions so the walkthrough focuses on your projects."
        type="Sampledge Demo Request"
        service="Sampledge"
        icon="target"
        submitLabel="Request a Sampledge Demo"
        successTitle="Thank you. Your Sampledge demo request has been sent."
        siteLabel="Website (optional)"
        msgLabel="Anything we should know before the demo? (optional)"
        msgPh="Typical project types, countries, number of suppliers, tools you use today"
        nextSteps={["We review what you want to explore.", "We contact you within one working day to book a time.", "You get a walkthrough built around your kind of projects."]}
        chips={[
          { k: "explore", t: "Explore", q: "What would you like to explore?", label: "Areas to explore", multi: true, options: ["Project management", "Bid management", "Quota tracking", "Supplier management", "Live fieldwork monitoring", "Respondent quality checks", "Reconciliation & invoicing", "Dashboards & reports", "Users, roles & activity logs", "API & marketplace", "Pricing & plans", "The full platform"] },
          { k: "team", t: "Team", q: "How big is the team that would use Sampledge?", label: "Team size", options: ["Just me", "2–10", "11–50", "50+"] },
          { k: "improve", t: "Improve", q: "What do you most want to improve?", label: "Improvement goals", multi: true, options: ["Fewer spreadsheets", "Quota visibility", "Supplier coordination", "Faster reconciliation", "Client reporting", "Access control & audit trail", "Respondent quality", "Something else"] },
        ]}
      />
      <SAM_Story />
      <SAM_Ethos />
      <div id="sam-faq">
        <DM_Faq id="sam-faq-h" title="Sampledge: Frequently Asked Questions" items={SAM_FAQ} />
      </div>
      <SAM_Close />
    </div>
  );
}

export { SAM_HERO, SAM_Page };
