/*
 * Website Maintenance & Support — /services/it-development/website-maintenance-and-support (existing URL, unchanged)
 * Build 44 rethink: "Proactive website care" — online is not the same as healthy.
 * Signature visuals (prefix WMS_): website health browser mock-up, waterline (visible vs hidden problems),
 * segmented health framework, ticket loop vs reliability clock, maintenance checklist board, signal triage inbox,
 * network waterfall (before/after optimisation), security equation, SEO domino chain, journey test runner,
 * backup→restore check, change ripples, support-model selector. No uptime, PageSpeed, ranking or traffic claims.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppGo, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Rail, V4_Statement, v4Pick } from '../components/dm/v44kit.jsx';

const WMS_URL = "/services/it-development/website-maintenance-and-support";
const WMS_TITLE = "Website Maintenance & Support Services | Frequent Research";
const WMS_DESC = "Website maintenance and support that keeps your site fast, secure, search-ready and converting — proactive monitoring, updates and fixes from Frequent Research.";
const WMS_FORM = "website-care";

const WMS_FAQ = [
  ["What does website maintenance and support include?", "Updates and patching, monitoring, backups with restore checks, performance and technical SEO care, content changes, bug fixes and validation of key journeys such as forms and checkout."],
  ["Do you maintain WordPress websites?", "Yes — core, theme and plugin updates, compatibility checks, backups, security updates and performance care, alongside custom, React and Next.js websites."],
  ["Can you support a website built by another agency?", "Yes. We start with a health review of the code, hosting, dependencies and integrations before taking over."],
  ["How do you make sure an update doesn't break something else?", "Changes are tested on a copy first, and critical journeys — navigation, forms, checkout, analytics — are re-validated after release."],
  ["Will maintenance protect our search rankings?", "We protect the technical foundations search engines rely on — redirects, metadata, canonicals, sitemaps and speed — but no one can honestly guarantee rankings."],
  ["Do you offer different support models?", "Yes: reactive support when something breaks, proactive scheduled care, or continuous management for websites central to sales and marketing."],
  ["How is AI used in website maintenance?", "AI assists with log and error summaries, content and metadata checks, broken-link detection and prioritisation; people decide and validate every change."],
];

/* ── hero: website health browser mock-up ────────────────────────────────────────────── */
const WMS_PARTS = [["Navigation", "nav"], ["Hero & content", "hero"], ["Images", "img"], ["Enquiry form", "form"], ["Scripts", "js"], ["Analytics", "an"]];
const WMS_CYCLE = ["Detect", "Understand", "Fix", "Validate", "Monitor"];
function WMS_Browser() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(30, v, 800, false);
  const issue = Math.floor(t / 5) % WMS_PARTS.length;
  const st = t % 5; // 0 detect .. 4 monitor
  return (
    <figure ref={ref} className={"wms-br" + (v ? " is-in" : "")} aria-label="A website shown as a living system: navigation, content, images, the enquiry form, scripts and analytics are continuously checked; when an issue is detected it is understood, fixed, validated and monitored.">
      <div className="wms-br__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="v4-mono">yourwebsite.com</span>
      </div>
      <div className="wms-br__page" aria-hidden="true">
        {WMS_PARTS.map(([n, c], k) => {
          const bad = k === issue && st < 3;
          return (
            <div key={n} className={"wms-br__p wms-br__p--" + c + (bad ? " is-bad" : k === issue ? " is-fixed" : "")}>
              <span className={"wms-br__dot" + (bad ? " is-bad" : "")} />
              <small>{n}</small>
            </div>
          );
        })}
      </div>
      <ol className="wms-br__cyc">
        {WMS_CYCLE.map((c, k) => (
          <li key={c} className={k === st ? "is-on" : k < st ? "is-done" : ""}>
            {c}
          </li>
        ))}
      </ol>
      <figcaption className="wms-br__cap">
        <span className={"v4-st " + (st < 3 ? "v4-st--warn" : "v4-st--ok")}>{st < 3 ? WMS_PARTS[issue][0] + " · " + WMS_CYCLE[st] : "Healthy"}</span>
      </figcaption>
    </figure>
  );
}

/* ── waterline ───────────────────────────────────────────────────────────────────────── */
const WMS_WATER = [
  ["Website loads", "…but pages are slow"],
  ["Form exists", "…but submissions fail"],
  ["Content is published", "…but metadata is outdated"],
  ["Plugin updated", "…but another feature breaks"],
  ["Traffic increases", "…but performance drops"],
  ["Redesign completed", "…but redirects lose search visibility"],
];
function WMS_Water() {
  const [ref, v] = ppIn(0.3);
  return (
    <div ref={ref} className={"wms-water" + (v ? " is-in" : "")}>
      <div className="wms-water__above">
        {WMS_WATER.map(([a], k) => (
          <span key={a} style={{ "--k": k }}>
            <IX_I n="check" s={14} /> {a}
          </span>
        ))}
      </div>
      <div className="wms-water__line" aria-hidden="true">
        <i />
      </div>
      <div className="wms-water__below">
        {WMS_WATER.map(([a, b], k) => (
          <span key={a} style={{ "--k": k }}>
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── website health framework ────────────────────────────────────────────────────────── */
const WMS_HEALTH = [
  ["Performance", "gauge", "Healthy", "Needs review"],
  ["Security", "shield", "Protected", "Review required"],
  ["SEO", "search2", "Healthy", "Technical attention"],
  ["Content", "doc", "Current", "Update needed"],
  ["Conversion", "target", "Working", "Needs validation"],
  ["Infrastructure", "cloud", "Stable", "Review required"],
  ["Analytics", "bars", "Connected", "Validate"],
  ["Dependencies", "layers", "Current", "Update required"],
];
function WMS_Health() {
  const [flip, setFlip] = ee.useState({ 1: true, 7: true });
  return (
    <ul className="wms-health">
      {WMS_HEALTH.map(([n, ic, a, b], k) => {
        const f = !!flip[k];
        return (
          <li key={n} className={f ? "is-warn" : "is-ok"}>
            <button type="button" aria-pressed={f} onClick={() => setFlip({ ...flip, [k]: !f })}>
              <span className="wms-health__ic">
                <IX_I n={ic} s={18} />
              </span>
              <b>{n}</b>
              <span className="wms-health__seg" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span className={"v4-st " + (f ? "v4-st--warn" : "v4-st--ok")}>{f ? b : a}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

/* ── ticket loop vs reliability clock ────────────────────────────────────────────────── */
const WMS_LOOP = [
  ["Watch", "Monitor important website signals."],
  ["Detect", "Spot technical, performance, security or UX anomalies."],
  ["Prioritise", "Decide what actually matters to the business."],
  ["Improve", "Apply the fix, update or optimisation."],
  ["Validate", "Check the change didn't create another problem."],
  ["Learn", "Use recurring patterns to improve future maintenance."],
];
function WMS_Clock() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(WMS_LOOP.length, v, 2200);
  return (
    <div ref={ref} className="wms-clock">
      <div className="wms-clock__face">
        <i className="wms-clock__hand" style={{ transform: "rotate(" + i * 60 + "deg)" }} aria-hidden="true" />
        {WMS_LOOP.map(([t], k) => (
          <button key={t} type="button" className={"wms-clock__n" + (k === i ? " is-on" : "")} aria-pressed={k === i} style={{ "--a": k * 60 + "deg" }} onClick={() => pick(k)}>
            <span>{t}</span>
          </button>
        ))}
        <b className="wms-clock__c">
          Website
          <br />
          reliability loop
        </b>
      </div>
      <div className="wms-clock__side">
        <p className="wms-clock__say" aria-live="polite">
          <span className="v4-mono">{String(i + 1).padStart(2, "0")}</span> <b>{WMS_LOOP[i][0]}.</b> {WMS_LOOP[i][1]}
        </p>
        <div className="wms-clock__vs">
          <small>Traditional ticket support</small>
          <p>Issue appears → client notices → client reports → developer fixes → close</p>
          <small>Continuous website reliability</small>
          <p>Website signals → risk identified → priority assessed → improvement made → quality validated → monitored</p>
        </div>
      </div>
    </div>
  );
}

/* ── maintenance checklist board ─────────────────────────────────────────────────────── */
const WMS_BOARD = [
  ["Reliability", ["Uptime monitoring", "Error monitoring", "Functional checks"]],
  ["Performance", ["Core Web Vitals awareness", "Asset optimisation", "Caching", "Script review"]],
  ["Security", ["Updates & patching", "Access review", "Backup validation"]],
  ["Content", ["Page & media updates", "Navigation & CTAs", "Landing pages"]],
  ["SEO health", ["Metadata", "Redirects", "Broken links", "Sitemap & structured data"]],
  ["Technical", ["Dependency & framework updates", "API & integration checks", "Hosting coordination"]],
  ["QA", ["Regression checks", "Form validation", "Cross-browser & responsive"]],
  ["AI & automation", ["Anomaly detection assistance", "Content QA", "Issue summaries"]],
];
function WMS_Board() {
  const [ref, v] = ppIn(0.2);
  return (
    <div ref={ref} className={"wms-board" + (v ? " is-in" : "")}>
      {WMS_BOARD.map(([t, xs], k) => (
        <div key={t} className="wms-board__col" style={{ "--k": k }}>
          <b>{t}</b>
          <ul>
            {xs.map((x, j) => (
              <li key={x} style={{ "--j": j }}>
                <i aria-hidden="true" /> {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ── AI triage: many signals, few decisions ──────────────────────────────────────────── */
function WMS_Triage() {
  const [ref, v] = ppIn(0.3);
  const RAW = ["404 on /services/old-page", "LCP regression on mobile home", "Form webhook timeout ×3", "Meta description missing ×12", "Plugin update available ×5", "Image > 1 MB on blog", "JS error in checkout", "SSL renews in 20 days", "Broken outbound link ×7"];
  const OUT = [
    ["Fix today", "bad", "Checkout JS error and form webhook timeouts — revenue and leads at risk."],
    ["This week", "warn", "Mobile home-page speed regression; redirect for the retired page."],
    ["Scheduled", "info", "Plugin updates on staging first; metadata and image clean-up."],
  ];
  return (
    <div ref={ref} className={"wms-tri" + (v ? " is-in" : "")}>
      <ul className="wms-tri__raw v4-mono" aria-label="Raw website signals">
        {RAW.map((r, k) => (
          <li key={r} style={{ "--k": k }}>
            {r}
          </li>
        ))}
      </ul>
      <div className="wms-tri__mid" aria-hidden="true">
        <IX_I n="spark" s={20} />
        <span>AI-assisted analysis</span>
        <small>Summarise · cluster · prioritise</small>
        <em>Human validation</em>
      </div>
      <ul className="wms-tri__out" aria-label="Prioritised actions">
        {OUT.map(([t, s, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <span className={"v4-st v4-st--" + s}>{t}</span>
            <p>{d}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── network waterfall ───────────────────────────────────────────────────────────────── */
const WMS_RES = [["Server response", 0, 18, 0, 10], ["HTML", 18, 8, 10, 6], ["CSS", 24, 16, 15, 8], ["Fonts", 34, 22, 20, 8], ["JavaScript", 30, 40, 18, 18], ["Images", 40, 46, 24, 20], ["Third-party scripts", 50, 44, 36, 14], ["APIs", 56, 20, 40, 12]];
function WMS_Waterfall() {
  const [opt, setOpt] = ee.useState(false);
  return (
    <div className={"wms-wf" + (opt ? " is-opt" : "")}>
      <div className="wms-wf__rows" aria-hidden="true">
        {WMS_RES.map(([n, s1, w1, s2, w2]) => (
          <div key={n} className="wms-wf__r">
            <span>{n}</span>
            <div>
              <i style={{ left: (opt ? s2 : s1) + "%", width: (opt ? w2 : w1) + "%" }} />
            </div>
          </div>
        ))}
        <div className="wms-wf__axis">
          <span>Page requested</span>
          <span>Page usable</span>
        </div>
      </div>
      <div className="wms-wf__side">
        <p aria-live="polite">{opt ? "Images resized, scripts deferred, fonts preloaded, caching on, third-party scripts reviewed — the page becomes usable much earlier." : "Unoptimised images, render-blocking scripts and third-party tags pile up as the site changes."}</p>
        <div className="aia-hand__tg" role="group" aria-label="Optimisation">
          <button type="button" aria-pressed={!opt} onClick={() => setOpt(false)}>
            Neglected
          </button>
          <button type="button" aria-pressed={opt} onClick={() => setOpt(true)}>
            Maintained
          </button>
        </div>
        <p className="ix-note">
          Shapes, not a promised score. Guidance: <PpX href="https://web.dev/articles/vitals">web.dev Core Web Vitals</PpX>.
        </p>
      </div>
    </div>
  );
}

/* ── SEO domino chain ────────────────────────────────────────────────────────────────── */
function WMS_Domino() {
  const [safe, setSafe] = ee.useState(false);
  const D = ["New page", "URL change", "Redirect issue", "Indexing problem", "Traffic impact"];
  return (
    <div className={"wms-dom" + (safe ? " is-safe" : " is-fall")}>
      <ol>
        {D.map((d, k) => (
          <li key={d} style={{ "--k": k }} className={safe && k >= 2 ? "is-stop" : ""}>
            <span>{safe && k === 2 ? "Redirect mapped" : d}</span>
          </li>
        ))}
      </ol>
      <div className="aia-hand__tg" role="group" aria-label="Maintenance approach">
        <button type="button" aria-pressed={!safe} onClick={() => setSafe(false)}>
          Change without SEO checks
        </button>
        <button type="button" aria-pressed={safe} onClick={() => setSafe(true)}>
          SEO-aware maintenance
        </button>
      </div>
      <p className="wms-dom__list">Broken links · redirects · metadata · canonical tags · sitemap · robots directives · structured data · indexability · duplicate URLs · internal links</p>
    </div>
  );
}

/* ── journey test runner ─────────────────────────────────────────────────────────────── */
function WMS_Runner() {
  const [ref, v] = ppIn(0.35);
  const [t] = ixCycle(10, v, 700, false);
  const S = ["Landing page", "Navigation", "Service page", "Call to action", "Form submit", "Confirmation", "Analytics event"];
  return (
    <div ref={ref} className="wms-run v4-mono" aria-label="Automated journey test: landing page, navigation, service page, call to action, form submission, confirmation and analytics event are checked after every change.">
      <div className="wms-run__h">$ run journey-test --after-release</div>
      <ol>
        {S.map((s, k) => {
          const failed = k === 4 && t >= 5 && t < 8;
          const done = k < t || (k === 4 && t >= 8);
          return (
            <li key={s} className={failed ? "is-bad" : done ? "is-ok" : ""}>
              <span>{failed ? "✕" : done ? "✓" : "·"}</span> {s}
              {k === 4 && t >= 8 && <em> fixed: webhook URL updated, re-tested</em>}
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── change ripples ──────────────────────────────────────────────────────────────────── */
function WMS_Ripple() {
  const I = ["UX", "SEO", "Performance", "Security", "Analytics", "Integrations", "Mobile", "Forms"];
  return (
    <div className="wms-rip" role="img" aria-label="A single website change ripples out to UX, SEO, performance, security, analytics, integrations, mobile and forms — each is validated before release.">
      <i />
      <i />
      <i />
      <b>Change</b>
      {I.map((x, k) => {
        const a = (k / I.length) * 2 * Math.PI;
        return (
          <span key={x} style={{ left: 50 + 40 * Math.cos(a) + "%", top: 50 + 40 * Math.sin(a) + "%", "--k": k }}>
            {x}
          </span>
        );
      })}
    </div>
  );
}

/* ── support models ──────────────────────────────────────────────────────────────────── */
const WMS_MODELS = [
  ["Reactive support", "For occasional fixes and updates when something breaks.", ["Bug fixes on request", "Content updates", "Emergency help"]],
  ["Proactive care", "Scheduled maintenance and regular technical attention.", ["Everything in reactive", "Scheduled updates & backups", "Monitoring & health checks", "Performance and SEO checks"]],
  ["Continuous management", "For websites central to marketing, leads or e-commerce.", ["Everything in proactive", "Ongoing improvements", "Journey testing after changes", "Change planning & reporting"]],
];
function WMS_Models() {
  const [i, setI] = ee.useState(1);
  return (
    <div className="wms-mod">
      <div className="wms-mod__track" role="group" aria-label="Support model">
        {WMS_MODELS.map(([t], k) => (
          <button key={t} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
            {t}
          </button>
        ))}
        <i style={{ transform: "translateX(" + i * 100 + "%)" }} aria-hidden="true" />
      </div>
      <div className="wms-mod__d" aria-live="polite">
        <p>{WMS_MODELS[i][1]}</p>
        <ul>
          {WMS_MODELS[i][2].map((x) => (
            <li key={x}>
              <IX_I n="check" s={14} /> {x}
            </li>
          ))}
        </ul>
        <a href={"#" + WMS_FORM} onClick={ppGo(WMS_FORM)} className="btn pp-btn">
          Find the right support model →
        </a>
      </div>
    </div>
  );
}

function WMS_Page() {
  usePageMeta("Website Maintenance & Support", WMS_DESC);
  dmMeta(WMS_URL, WMS_TITLE, WMS_DESC);
  ixSchema("wms", {
    url: WMS_URL,
    crumb: "Website Maintenance & Support",
    name: "Website Maintenance & Support",
    serviceType: "Website maintenance and support",
    schemaDesc:
      "Website maintenance and support: monitoring, updates and patching, WordPress and CMS maintenance, backups with restore validation, performance and Core Web Vitals care, technical SEO maintenance, content updates, bug fixing, journey and form testing after changes, security-aware maintenance, AI-assisted issue triage and flexible support models.",
    faq: WMS_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p wms-svc">
      <V4_Hero
        id="wms-h1"
        crumb="Website Maintenance & Support"
        variant="split"
        kicker="Website Maintenance & Support · Proactive website care"
        h1="Don't Just Keep Your Website Online. Keep It Performing."
        lead="Website maintenance & support from Frequent Research continuously watches, maintains, protects and improves your website — so small technical issues never quietly become business problems."
        cta={["Request Website Support", WMS_FORM]}
        cta2={["Assess My Website", WMS_FORM]}
        points={["Performance", "Security", "Technical SEO", "Content", "AI-assisted monitoring", "Continuous improvement"]}
        cls="wms-hero"
      >
        <WMS_Browser />
      </V4_Hero>

      <IX_Sec id="wms-water-h" tone="light" k="Online doesn't always mean healthy" t="A website can be online and still be failing." s="Availability is not the same as health. The costly problems sit below the waterline.">
        <WMS_Water />
      </IX_Sec>

      <IX_Sec lv={3} id="wms-health-h" tone="off" k="Website health framework" t="Eight areas, each with a clear state." s="Click an area to see how its state is described. A framework for reviews — not a live monitoring product.">
        <WMS_Health />
      </IX_Sec>

      <IX_Sec id="wms-loop-h" tone="light" k="Maintenance that thinks beyond the ticket" t="The Frequent Research website reliability loop.">
        <WMS_Clock />
      </IX_Sec>

      <V4_Statement id="wms-say-h" tone="navy" kicker="What better maintenance protects" text="Your website is part of your business infrastructure." accent="business infrastructure" sub="Revenue journeys, customer trust, search visibility, marketing performance, security posture, engineering efficiency, brand experience and business continuity all run through it." chips={["Revenue", "Customer trust", "Search visibility", "Marketing performance", "Security posture", "Engineering efficiency", "Brand experience", "Continuity"]} />

      <IX_Sec id="wms-cap-h" tone="light" k="Capability map" t="What website care actually covers." wide>
        <WMS_Board />
      </IX_Sec>

      <IX_Sec id="wms-ai-h" tone="ink" k="AI-assisted website intelligence" t="Use AI for the repetitive signals. Keep humans in control of the decisions." s="Error logs, performance signals, content changes, broken links, metadata and dependencies — summarised and prioritised, then validated by people." wide>
        <WMS_Triage />
      </IX_Sec>

      <IX_Sec id="wms-perf-h" tone="light" k="Performance" t="Fast is not a design preference. It is part of the experience." s="Performance should be reviewed continuously as the website changes.">
        <WMS_Waterfall />
      </IX_Sec>

      <IX_Sec lv={3} id="wms-sec-h" tone="dark" k="Security + maintenance" t="Every update changes the security equation.">
        <p className="wms-eq" aria-label="CMS plus plugins plus dependencies plus third-party integrations plus user access plus hosting plus APIs equals changing security exposure">
          {["CMS", "Plugins", "Dependencies", "Integrations", "User access", "Hosting", "APIs"].map((x) => (
            <span key={x}>{x}</span>
          ))}
          <b>Changing security exposure</b>
        </p>
        <p className="wms-sec__t">
          Software and dependency updates, security patching, access reviews, backup validation, configuration review and security monitoring where supported. For deeper assessments, see <PpL to={ppIt("cybersecurity-services")}>cybersecurity services</PpL>.
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="wms-seo-h" tone="off" k="Technical SEO maintenance" t="A website change can create an SEO problem without anyone noticing." s={<>Protect the technical foundations search engines rely on — no ranking promises. Reference: <PpX href="https://developers.google.com/search/docs">Google Search Central</PpX>.</>}>
        <WMS_Domino />
      </IX_Sec>

      <IX_Sec lv={3} id="wms-qa-h" tone="light" k="Functionality validation" t="A website can look perfect while a critical journey is broken.">
        <div className="wms-qa">
          <WMS_Runner />
          <div>
            <p>Login, search, checkout, contact forms, downloads, bookings, API interactions and lead submissions — the journeys that matter are re-tested after changes.</p>
            <p>
              Backed by our <PpL to={ppIt("software-testing-and-qa")}>software testing &amp; QA</PpL> practice.
            </p>
            <ol className="wms-bk" aria-label="Backup and recovery">
              {["Website", "Backup", "Restore validation", "Recovery readiness"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ol>
            <p className="ix-note">A backup only matters if you can recover from it — restore checks are part of the plan where included in scope.</p>
          </div>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="wms-chg-h" tone="off" k="Change management" t="Small website changes can create large downstream effects." s="Change → potential impact → validate → release.">
        <div className="wms-chg">
          <WMS_Ripple />
          <div className="wms-chg__txt">
            <h3>Content maintenance that respects the whole site</h3>
            <p>Page and text updates, images, new sections, CTAs, navigation, landing pages, product and policy updates — made with UX, SEO, performance, responsiveness and technical integrity in mind.</p>
            <h3>The platforms your website already runs on</h3>
            <p>WordPress maintenance (core, theme and plugin updates, compatibility checks), custom websites, React and Next.js, Node.js, PHP / Laravel, headless architectures, APIs and cloud environments. No platform partnership is implied.</p>
          </div>
        </div>
      </IX_Sec>

      <IX_Sec id="wms-mod-h" tone="light" k="Flexible maintenance models" t="Choose the level of care your website needs." s="No fixed price cards — the right model depends on how central the website is to your business.">
        <WMS_Models />
      </IX_Sec>

      <IX_Sec lv={3} id="wms-eco-h" tone="dark" k="Maintenance backed by engineering" t="A website issue may not actually be a website issue.">
        <div className="wms-eco">
          <p>It may be an API, hosting, database, dependency, security, front-end, performance, analytics or third-party integration problem. Because Frequent Research also builds software, APIs and cloud environments, the problem is approached across the whole stack.</p>
          <ul>
            {[
              ["Website development", "website-development"],
              ["API & integration", "api-development-and-integration"],
              ["Cloud & DevOps", "cloud-and-devops-services"],
              ["Software testing & QA", "software-testing-and-qa"],
              ["Cybersecurity", "cybersecurity-services"],
              ["Application maintenance", "application-maintenance-and-support"],
              ["AI & automation", "ai-and-automation-solutions"],
              ["IT consulting", "it-consulting"],
            ].map(([t, s]) => (
              <li key={s}>
                <PpL to={ppIt(s)}>{t}</PpL>
              </li>
            ))}
          </ul>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="wms-ind-h" tone="light" k="Industries" t="Website priorities by sector." s="Short priorities — not claims about specific clients.">
        <table className="wms-ind">
          <tbody>
            {[
              ["Financial Services", "Trust, security, forms and customer journeys", "financial-services"],
              ["Healthcare", "Availability, accessibility and information integrity", "healthcare"],
              ["Retail", "Product discovery, checkout and performance", "retail"],
              ["Manufacturing", "B2B information, lead generation and integrations", "manufacturing"],
              ["Education", "Admissions content, forms and peak periods", "education"],
              ["Real Estate", "Listings, enquiries and media-heavy pages", "real-estate"],
            ].map(([t, d, s]) => (
              <tr key={t}>
                <th>
                  <PpL to={"/industries-case-studies/" + s}>{t}</PpL>
                </th>
                <td>{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </IX_Sec>

      <DM_Faq
        id="wms-faq"
        title="Website maintenance & support: common questions"
        items={WMS_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("website-development")}>website development</PpL>, <PpL to={ppIt("software-testing-and-qa")}>QA</PpL>, <PpL to={ppIt("cybersecurity-services")}>cybersecurity</PpL> and <PpL to={ppIt("application-maintenance-and-support")}>application maintenance</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/website-maintenance-support-guide" title="Website Maintenance and Support: Keeping Your Website Fast, Secure and Working Every Day" text="What to check, how often, and what to automate." />

      <V4_Close
        id="wms-close-h"
        variant="light"
        kicker="Assess my website"
        title="Your website should keep working while your business keeps moving."
        text="Tell us what is changing, what is breaking or what you want to improve. We'll recommend the right maintenance and support model for your website."
        cta={["Assess My Website", WMS_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Health review across eight areas", "Priorities by business impact", "Right support model", "Clear monthly rhythm"]}
      />

      <DM_Form
        id={WMS_FORM}
        kicker="IT project consultation"
        title="Request Website Support"
        sub="A few short questions about your website and what you need help with."
        type="Website Maintenance Enquiry"
        service="Website Maintenance & Support"
        icon="globe"
        submitLabel="Discuss Website Support"
        successTitle="Thank you. Your website support request has been sent."
        siteLabel="Website URL (optional)"
        msgLabel="What is changing or breaking? (optional)"
        msgPh="Recent problems, planned changes, hosting, update frequency — whatever helps"
        nextSteps={["We look at your website and the request you described.", "We contact you to agree priorities.", "You get a recommended support model and next step."]}
        chips={[
          { k: "need", t: "Need", q: "What do you need help with?", label: "Help needed", multi: true, options: ["Website maintenance", "Website support", "Performance optimisation", "Security updates", "WordPress maintenance", "Technical SEO maintenance", "Content updates", "Bug fixing", "Redesign support", "API / integration maintenance", "Cloud / hosting support", "Ongoing website management", "Other"] },
          { k: "type", t: "Website", q: "What type of website is it?", label: "Website type", options: ["Corporate website", "E-commerce", "WordPress", "React / Next.js", "Custom website", "Web application", "SaaS", "Other"] },
          { k: "challenge", t: "Challenge", q: "What is the current challenge?", label: "Current challenge", multi: true, options: ["Website slow", "Security concerns", "Broken functionality", "Frequent updates required", "SEO / technical issues", "Content changes", "Hosting / infrastructure", "General support"] },
        ]}
      />

      <V4_Rail
        id="wms-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["Website Development", "website-development", "Rebuilds and new features."],
          ["Software Testing & QA", "software-testing-and-qa", "Journey testing after changes."],
          ["Cybersecurity Services", "cybersecurity-services", "Deeper security assessment."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "For web applications and portals."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Hosting, caching and deployments."],
          ["API Development & Integration", "api-development-and-integration", "Forms, CRMs and connected tools."],
          ["IT Consulting", "it-consulting", "Plan the website roadmap."],
        ]}
      />
    </div>
  );
}

export { WMS_Page };
