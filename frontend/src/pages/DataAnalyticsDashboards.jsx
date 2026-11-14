/*
 * Data Analytics & Dashboard Development — /services/it-development/data-analytics-and-dashboard-development (existing URL)
 * Build 44 rethink: "A dashboard is not the product. Better business decisions are the product."
 * Signature visuals (prefix DAD_): data lens (sources → intelligence layer → outputs), dashboard failure pins,
 * morphing data journey, before/after reveal slider, capability honeycomb, role-based dashboard, AI signal annotations,
 * five-column architecture flow, "X over Y" principles, growth columns, governance chain.
 * Values in mock-ups are labels and shapes, never figures presented as client results.
 * No team block, no example engagement, no market-research positioning.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Rail, V4_Statement, V4_Tags, V4_TechLine, v4Pick } from '../components/dm/v44kit.jsx';

const DAD_URL = "/services/it-development/data-analytics-and-dashboard-development";
const DAD_TITLE = "Data Analytics & Dashboard Development | Frequent Research";
const DAD_DESC = "Data analytics and dashboard development that connects CRM, ERP, finance and operations data into one trusted view, with AI-assisted alerts that prompt action.";
const DAD_FORM = "analytics-project";

const DAD_FAQ = [
  ["What does Data Analytics & Dashboard Development include?", "Connecting your data sources, cleaning and modelling the data, agreeing KPI definitions, building dashboards and automated reports, and adding alerts or AI-assisted analysis where it helps decisions."],
  ["Can you build dashboards from our existing business data?", "Yes. We start from the systems and spreadsheets you already have and connect them, rather than asking you to replace them."],
  ["Can you combine CRM, ERP, SaaS and database data?", "Yes — through APIs, database connections and data pipelines that bring the sources into one consistent model."],
  ["Can dashboards be real-time or near real-time?", "Where the source systems allow it, yes; we recommend the refresh rate each decision actually needs, because real-time is not always worth the cost."],
  ["Can AI be added to analytics dashboards?", "Yes — anomaly detection, forecasting, plain-language summaries and intelligent alerts can be added where the data supports them, with people making the final call."],
  ["Do you build custom dashboards or use BI tools such as Power BI?", "Both. Power BI suits many organisations; custom dashboard applications make sense when analytics must live inside your product or workflow."],
  ["Can you maintain and extend the analytics after launch?", "Yes. Data models, pipelines and dashboards are documented and can be monitored, maintained and extended as KPIs and sources change."],
];

/* ── hero: the data lens ─────────────────────────────────────────────────────────────── */
const DAD_SRC = ["CRM", "ERP", "Finance", "Sales", "Marketing", "Operations", "Product", "Cloud", "Customer", "Applications"];
const DAD_OUT = ["Executive dashboard", "Operational dashboard", "Predictive analytics", "Alerts", "Automated reports", "AI insights", "Business actions"];
function DAD_Lens() {
  const [ref, v] = ppIn(0.15);
  const [i] = ixCycle(DAD_OUT.length, v, 1500, false);
  const ys = (n, k) => 8 + (k * 84) / (n - 1);
  return (
    <figure ref={ref} className={"dad-lens" + (v ? " is-in" : "")} aria-label="Data from CRM, ERP, finance, sales, marketing, operations, product, cloud, customer and application systems flows into one data intelligence layer, which feeds executive and operational dashboards, predictive analytics, alerts, automated reports, AI insights and business actions.">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {DAD_SRC.map((s, k) => (
          <path key={s} className="dad-lens__in" style={{ "--k": k }} d={`M17 ${ys(DAD_SRC.length, k)} C 34 ${ys(DAD_SRC.length, k)}, 34 50, 44 50`} />
        ))}
        {DAD_OUT.map((s, k) => (
          <path key={s} className={"dad-lens__out" + (k === i ? " is-on" : "")} d={`M56 50 C 66 50, 66 ${ys(DAD_OUT.length, k)}, 81 ${ys(DAD_OUT.length, k)}`} />
        ))}
      </svg>
      <ul className="dad-lens__src">
        {DAD_SRC.map((s, k) => (
          <li key={s} style={{ "--k": k }}>
            {s}
          </li>
        ))}
      </ul>
      <div className="dad-lens__core">
        <i aria-hidden="true" />
        <b>Data intelligence layer</b>
        <small>Connect · model · analyse</small>
      </div>
      <ul className="dad-lens__out-l">
        {DAD_OUT.map((s, k) => (
          <li key={s} className={k === i ? "is-on" : ""}>
            {s}
          </li>
        ))}
      </ul>
    </figure>
  );
}

/* ── why dashboards fail: pins on a good-looking dashboard ───────────────────────────── */
const DAD_PINS = [
  ["Too many KPIs", 14, 18], ["No agreed metric definitions", 52, 14], ["Updated too late", 84, 20], ["No context", 30, 46],
  ["No drill-down", 66, 48], ["Manual refreshes", 88, 62], ["Disconnected sources", 12, 72], ["No ownership", 40, 80],
  ["No action layer", 62, 84], ["No alerting", 82, 86], ["No governance", 24, 30],
];
function DAD_Fails() {
  const [fix, setFix] = ee.useState(false);
  return (
    <div className={"dad-fail" + (fix ? " is-fix" : "")}>
      <div className="dad-fail__screen" aria-hidden="true">
        <div className="dad-fail__kpis">
          {Array.from({ length: fix ? 4 : 12 }).map((_, k) => (
            <i key={k} />
          ))}
        </div>
        <div className="dad-fail__charts">
          <i />
          <i />
          <i />
        </div>
        {!fix &&
          DAD_PINS.map(([t, x, y], k) => (
            <span key={t} className="dad-fail__pin" style={{ left: x + "%", top: y + "%", "--k": k }}>
              {t}
            </span>
          ))}
        {fix && (
          <div className="dad-fail__act">
            <b>Revenue below plan in two regions</b>
            <span>Owner notified · drill-down ready · next step suggested</span>
          </div>
        )}
      </div>
      <div className="dad-fail__side">
        <p>{fix ? "Fewer KPIs, one definition each, refreshed when the decision needs it — and an owner, an alert and a next step." : "Eleven warning signs that hide behind good-looking charts."}</p>
        <div className="aia-hand__tg" role="group" aria-label="Dashboard view">
          <button type="button" aria-pressed={!fix} onClick={() => setFix(false)}>
            Decorative dashboard
          </button>
          <button type="button" aria-pressed={fix} onClick={() => setFix(true)}>
            Decision-oriented
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── morphing data journey ───────────────────────────────────────────────────────────── */
const DAD_STEPS = [
  ["Sources", "CRM · ERP · SaaS · APIs · databases · files"],
  ["Connect", "Pipelines, APIs, ETL / ELT"],
  ["Clean & model", "Validation, transformation, business logic"],
  ["Understand", "KPIs, trends, segments, anomalies"],
  ["Visualise", "Executive, operational, financial and product views"],
  ["Predict", "Forecasts and AI signals"],
  ["Act", "Alerts, automation, workflow, decisions"],
];
function DAD_Art({ k }) {
  if (k === 0)
    return (
      <div className="dad-art dad-art--files">
        {["crm_export.csv", "erp_orders", "finance.xlsx", "app events", "ads API"].map((f) => (
          <span key={f} className="v4-mono">
            {f}
          </span>
        ))}
      </div>
    );
  if (k === 1)
    return (
      <div className="dad-art dad-art--pipes">
        {[0, 1, 2, 3].map((x) => (
          <i key={x} style={{ "--k": x }} />
        ))}
        <b>Warehouse</b>
      </div>
    );
  if (k === 2)
    return (
      <table className="dad-art dad-art--tbl v4-mono">
        <tbody>
          {[["customer_id", "✓"], ["region", "✓ standardised"], ["order_value", "✓ currency set"], ["duplicates", "removed"]].map(([a, b]) => (
            <tr key={a}>
              <td>{a}</td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  if (k === 3)
    return (
      <div className="dad-art dad-art--kpi">
        {[["Revenue", "▲ above plan"], ["Margin", "● steady"], ["Churn", "▼ watch"]].map(([a, b]) => (
          <span key={a}>
            <small>{a}</small>
            <b>{b}</b>
          </span>
        ))}
      </div>
    );
  if (k === 4)
    return (
      <div className="dad-art dad-art--bars">
        {[40, 62, 55, 78, 70, 90].map((h, x) => (
          <i key={x} style={{ height: h + "%", "--k": x }} />
        ))}
      </div>
    );
  if (k === 5)
    return (
      <svg className="dad-art dad-art--fc" viewBox="0 0 200 90" aria-hidden="true">
        <path d="M0 70 L30 60 L60 64 L90 46 L120 50" />
        <path className="is-fc" d="M120 50 L150 38 L180 32 L200 26" />
        <path className="is-band" d="M120 50 L150 30 L200 14 L200 40 L150 48 Z" />
      </svg>
    );
  return (
    <div className="dad-art dad-art--act">
      <span className="v4-st v4-st--warn">Alert</span>
      <b>Stock cover below threshold in two warehouses</b>
      <span className="v4-st v4-st--ok">Reorder task created</span>
    </div>
  );
}
function DAD_Journey() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(DAD_STEPS.length, v, 2300);
  return (
    <div ref={ref} className={"dad-jr" + (v ? " is-in" : "")}>
      <ol className="dad-jr__tabs">
        {DAD_STEPS.map(([t], k) => (
          <li key={t}>
            <button type="button" aria-pressed={k === i} className={k < i ? "is-done" : ""} onClick={() => pick(k)}>
              <span className="v4-mono">{String(k + 1).padStart(2, "0")}</span> {t}
            </button>
          </li>
        ))}
      </ol>
      <div className="dad-jr__card" aria-live="polite">
        <div className="dad-jr__txt">
          <b>{DAD_STEPS[i][0]}</b>
          <span>{DAD_STEPS[i][1]}</span>
        </div>
        <div className="dad-jr__art" key={i} aria-hidden="true">
          <DAD_Art k={i} />
        </div>
      </div>
    </div>
  );
}

/* ── before / after reveal ───────────────────────────────────────────────────────────── */
function DAD_Reveal() {
  const [p, setP] = ee.useState(50);
  const B = ["Spreadsheet dependency", "Multiple versions of the truth", "Manual reporting", "Delayed decisions", "Hidden anomalies", "Fragmented systems", "Static reporting"];
  const A = ["One trusted business view", "Automated reporting", "Faster decision cycles", "Timely visibility", "Intelligent alerts", "Connected data", "Predictive, action-oriented insight"];
  return (
    <div className="dad-rev" style={{ "--p": p + "%" }}>
      <div className="dad-rev__pane dad-rev__pane--b">
        <small>Before</small>
        <ul>
          {B.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="dad-rev__pane dad-rev__pane--a" aria-hidden={p > 95}>
        <small>After</small>
        <ul>
          {A.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
      <i className="dad-rev__handle" aria-hidden="true" />
      <label className="pp-sr" htmlFor="dad-rev-r">
        Compare before and after
      </label>
      <input id="dad-rev-r" type="range" min="0" max="100" value={p} onChange={(e) => setP(+e.target.value)} />
    </div>
  );
}

/* ── capability honeycomb ────────────────────────────────────────────────────────────── */
const DAD_CAPS = [
  ["Business intelligence", "bars", ["KPI frameworks", "Executive dashboards", "Management dashboards", "Operational dashboards", "Performance reporting"]],
  ["Data analytics", "search2", ["Descriptive", "Diagnostic", "Predictive", "Exploratory", "Advanced analytics"]],
  ["Dashboard development", "layout", ["Custom dashboards", "Interactive dashboards", "Real-time dashboards", "Role-based views", "Mobile-responsive"]],
  ["Data engineering", "database", ["Data pipelines", "ETL / ELT", "Data integration", "Data modelling", "Data quality"]],
  ["AI analytics", "spark", ["Anomaly detection", "Forecasting", "Natural-language insights", "Automated summaries", "Predictive signals"]],
  ["Reporting automation", "refresh", ["Automated reports", "Scheduled reporting", "KPI alerts", "Exception reporting", "Executive summaries"]],
];
function DAD_Hex() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="dad-hex">
      <ul className="dad-hex__grid">
        {DAD_CAPS.map(([t, ic], k) => (
          <li key={t} style={{ "--k": k }}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
              <IX_I n={ic} s={20} />
              <span>{t}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="dad-hex__d" aria-live="polite">
        <b>{DAD_CAPS[i][0]}</b>
        <ul>
          {DAD_CAPS[i][2].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── role-based dashboard ────────────────────────────────────────────────────────────── */
const DAD_ROLES = [
  ["C-suite", "What should I know?", ["kpi", "ai"]],
  ["Business leaders", "Where are we performing?", ["kpi", "region"]],
  ["Managers", "Where is performance changing?", ["trend", "region"]],
  ["Operations", "What needs attention now?", ["alerts"]],
  ["Analysts", "What is driving the change?", ["trend", "region"]],
  ["AI layer", "What should we investigate next?", ["ai", "trend"]],
];
function DAD_Dash() {
  const [ref, v] = ppIn(0.25);
  const [i, pick] = v4Pick(DAD_ROLES.length, v, 3000);
  const on = (w) => (DAD_ROLES[i][2].includes(w) ? " is-hi" : "");
  return (
    <div ref={ref} className={"dad-dash" + (v ? " is-in" : "")}>
      <div className="dad-dash__roles" role="group" aria-label="Choose a role">
        {DAD_ROLES.map(([r], k) => (
          <button key={r} type="button" aria-pressed={k === i} onClick={() => pick(k)}>
            {r}
          </button>
        ))}
      </div>
      <p className="dad-dash__q" aria-live="polite">
        “{DAD_ROLES[i][1]}”
      </p>
      <div className="dad-dash__ui" aria-label="Conceptual dashboard with KPI cards, a trend with an anomaly and a forecast, regional performance, alerts and an AI insight panel. Labels only — no client figures.">
        <div className={"dad-w dad-w--kpi" + on("kpi")}>
          {[["Revenue", "Above plan", "ok"], ["Margin", "Steady", "info"], ["Customers", "Growing", "ok"], ["Churn", "Watch", "warn"]].map(([a, b, c]) => (
            <span key={a}>
              <small>{a}</small>
              <b className={"v4-st v4-st--" + c}>{b}</b>
            </span>
          ))}
        </div>
        <div className={"dad-w dad-w--trend" + on("trend")}>
          <small>Trend · forecast</small>
          <svg viewBox="0 0 300 110" aria-hidden="true">
            <path className="dad-w__ln" d="M0 80 L40 70 L80 74 L120 58 L160 64 L200 30 L240 46" />
            <path className="dad-w__fc" d="M240 46 L270 38 L300 30" />
            <circle cx="200" cy="30" r="6" className="dad-w__an" />
          </svg>
          <em>Anomaly flagged</em>
        </div>
        <div className={"dad-w dad-w--region" + on("region")}>
          <small>Regional performance</small>
          {[["North", 82], ["South", 64], ["East", 48], ["West", 71]].map(([r, w]) => (
            <span key={r}>
              <b>{r}</b>
              <i style={{ width: w + "%" }} />
            </span>
          ))}
        </div>
        <div className={"dad-w dad-w--alerts" + on("alerts")}>
          <small>Alerts</small>
          <span className="v4-st v4-st--warn">Late orders rising</span>
          <span className="v4-st v4-st--bad">Stock-out risk</span>
          <span className="v4-st v4-st--ok">Payments on track</span>
        </div>
        <div className={"dad-w dad-w--ai" + on("ai")}>
          <small>
            <IX_I n="spark" s={14} /> AI insight
          </small>
          <p>Growth is concentrated in two regions; the dip in the East follows a supplier delay. Worth reviewing reorder timing.</p>
        </div>
      </div>
    </div>
  );
}

/* ── AI signal annotations ───────────────────────────────────────────────────────────── */
const DAD_AI = [
  ["Detect", "Unusual behaviour is highlighted on the series."],
  ["Explain", "Contributing segments and signals are surfaced."],
  ["Predict", "Likely movement is projected with a range."],
  ["Summarise", "The change is written in executive-ready language."],
  ["Alert", "The right person is told when it matters."],
  ["Recommend", "Areas worth attention are suggested — people decide."],
];
function DAD_Signal() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(DAD_AI.length, v, 2400);
  return (
    <div ref={ref} className={"dad-sig dad-sig--" + i}>
      <div className="dad-sig__chart" aria-hidden="true">
        <svg viewBox="0 0 400 160">
          <path className="dad-sig__band" d="M300 70 L400 40 L400 100 L300 86 Z" />
          <path className="dad-sig__ln" d="M0 110 L50 100 L100 104 L150 90 L200 96 L230 52 L260 92 L300 78" />
          <path className="dad-sig__fc" d="M300 78 L350 66 L400 60" />
          <circle className="dad-sig__dot" cx="230" cy="52" r="8" />
        </svg>
        <div className="dad-sig__note">
          {i === 1 && <span>Driven by: Region East · Product line B</span>}
          {i === 3 && <span>“Orders spiked mid-month after a promotion, then returned to trend.”</span>}
          {i === 4 && <span>Sent to: Sales operations lead</span>}
          {i === 5 && <span>Suggested: review promotion stock allocation</span>}
        </div>
      </div>
      <ol className="dad-sig__steps">
        {DAD_AI.map(([t, d], k) => (
          <li key={t}>
            <button type="button" aria-pressed={k === i} onClick={() => pick(k)}>
              <b>{t}</b>
              <span>{d}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── architecture columns ────────────────────────────────────────────────────────────── */
function DAD_Arch() {
  const [ref, v] = ppIn(0.25);
  const C = [
    ["Data sources", ["CRM", "ERP", "Finance", "Marketing", "Sales", "Product", "Operations", "SaaS", "APIs", "Databases"]],
    ["Data layer", ["Connect", "Transform", "Validate", "Model"]],
    ["Intelligence layer", ["Analytics", "AI", "Forecasting", "Anomaly detection"]],
    ["Experience layer", ["Dashboards", "Reports", "Alerts", "Executive views", "Operational views"]],
    ["Business action", ["Decide", "Automate", "Optimise", "Respond"]],
  ];
  return (
    <div ref={ref} className={"dad-arch" + (v ? " is-in" : "")}>
      {C.map(([t, items], k) => (
        <div key={t} className="dad-arch__col" style={{ "--k": k }}>
          <b>{t}</b>
          <ul>
            {items.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {k < C.length - 1 && <i className="dad-arch__flow" aria-hidden="true" />}
        </div>
      ))}
    </div>
  );
}

function DAD_Page() {
  usePageMeta("Data Analytics & Dashboard Development", DAD_DESC);
  dmMeta(DAD_URL, DAD_TITLE, DAD_DESC);
  ixSchema("dad", {
    url: DAD_URL,
    crumb: "Data Analytics & Dashboard Development",
    name: "Data Analytics & Dashboard Development",
    serviceType: "Business intelligence, data analytics and dashboard development",
    schemaDesc:
      "Data analytics and dashboard development: KPI frameworks, executive, management and operational dashboards, custom and Power BI dashboards, data pipelines, ETL/ELT, data modelling and quality, predictive analytics, AI-assisted anomaly detection, forecasting and summaries, automated reporting and alerts, governance and ongoing enhancement.",
    faq: DAD_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p dad-svc">
      <V4_Hero
        id="dad-h1"
        crumb="Data Analytics & Dashboard Development"
        variant="stack"
        kicker="Data Analytics & Dashboard Development"
        h1="Turn Business Data Into Decisions That Move the Business."
        lead="Your CRM, ERP, finance and operations systems already know what is happening. Our data analytics and dashboard development connects them into one trusted view — with alerts and AI-assisted analysis that point to the next action."
        cta={["Discuss My Analytics Requirement", DAD_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        points={["One business view", "AI-aware analytics", "Custom BI & dashboards", "Automated decision reporting"]}
      >
        <DAD_Lens />
      </V4_Hero>

      <V4_Statement id="dad-say-h" tone="light" kicker="Our philosophy" text="A dashboard is not the product. Better business decisions are the product." accent="Better business decisions" sub="More data does not automatically mean better decisions. The value comes from connecting the right data to the right business question — and making the next step obvious." />

      <IX_Sec id="dad-fail-h" tone="off" k="Why dashboards fail" t="A dashboard can still fail even when it looks beautiful.">
        <DAD_Fails />
      </IX_Sec>

      <IX_Sec id="dad-jr-h" tone="light" k="The data journey" t="From data fragments to decision intelligence." s="Seven stages, one card — watch the data change shape, or pick a stage.">
        <DAD_Journey />
      </IX_Sec>

      <IX_Sec lv={3} id="dad-rev-h" tone="dark" k="Before & after" t="What changes when your data becomes intelligent?" s="Drag the handle.">
        <DAD_Reveal />
      </IX_Sec>

      <IX_Sec id="dad-usp-h" tone="light" k="Why Frequent Research" t="We don't build dashboards. We build decision infrastructure.">
        <div className="dad-usp">
          <p className="dad-usp__lead">We begin with the decisions that are difficult, slow or invisible today — then design the data and analytics architecture around them.</p>
          <ul>
            {[
              ["Business-first analytics architecture", "compass", "Decisions first, charts second."],
              ["From raw data to business context", "layers", "Data → KPI → context → signal → action."],
              ["AI-aware analytics", "spark", "Anomalies, forecasts, summaries and alerts — where the data supports them."],
              ["Analytics connected to action", "bolt", "Not just “revenue dropped”: what changed, where, why it may have changed, and who should act."],
              ["Executive + operational visibility", "users", "Views designed around decisions, not departments."],
              ["Data ecosystem thinking", "link", "CRM, ERP, SaaS, APIs, databases, spreadsheets and cloud platforms connected."],
              ["Engineering + analytics together", "code", "Data architecture, software engineering, APIs, cloud, AI and UX in one team."],
              ["Ownership and maintainability", "key", "Documented models, tested pipelines and analytics you can extend."],
            ].map(([t, ic, d]) => (
              <li key={t}>
                <span>
                  <IX_I n={ic} s={18} />
                </span>
                <b>{t}</b>
                <em>{d}</em>
              </li>
            ))}
          </ul>
        </div>
      </IX_Sec>

      <IX_Sec id="dad-cap-h" tone="off" k="Capabilities" t="Data analytics and dashboard development, end to end." s="Choose a capability.">
        <DAD_Hex />
      </IX_Sec>

      <IX_Sec lv={3} id="dad-dash-h" tone="light" k="One dashboard is not one user" t="Different people need different intelligence." s="Choose a role and see which part of the dashboard answers their question. Conceptual labels — no client data." wide>
        <DAD_Dash />
      </IX_Sec>

      <IX_Sec id="dad-ai-h" tone="ink" k="The AI analytics layer" t="Don't just see the number. Understand the signal." s="AI supports human decisions; it does not replace business judgement.">
        <DAD_Signal />
      </IX_Sec>

      <IX_Sec lv={3} id="dad-arch-h" tone="light" k="Analytics architecture" t="Five layers between your systems and a better decision." wide>
        <DAD_Arch />
      </IX_Sec>

      <IX_Sec lv={3} id="dad-pr-h" tone="off" k="Visualisation principles" t="What makes a dashboard genuinely useful.">
        <ul className="dad-over">
          {[
            ["Signal", "decoration", "Every chart answers a business question."],
            ["Context", "complexity", "Understandable without an analyst sitting beside it."],
            ["Action", "observation", "Important changes lead to an action or an investigation."],
            ["Hierarchy", "clutter", "Critical KPIs get visual priority."],
            ["Consistency", "confusion", "One definition per metric, across the organisation."],
            ["Accessibility", "aesthetics", "Usable across devices and roles."],
          ].map(([a, b, d]) => (
            <li key={a}>
              <p>
                <b>{a}</b> <span>over {b}</span>
              </p>
              <em>{d}</em>
            </li>
          ))}
        </ul>
      </IX_Sec>

      <IX_Sec id="dad-gov-h" tone="light" k="Security, governance & scale" t="Analytics you can trust today — and grow tomorrow.">
        <div className="dad-gov">
          <ol className="dad-chain" aria-label="Governance controls">
            {["Access control", "Data validation", "Encryption", "Permissions", "Monitoring", "Auditability"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
          <ol className="dad-grow" aria-label="How the architecture evolves">
            {[
              ["Today", 1, "Core sources and the first dashboards"],
              ["Growth", 2, "More users and more sources"],
              ["Complexity", 3, "New KPIs, business units and integrations"],
              ["Scale", 4, "Larger volumes, cloud scaling, new reporting needs"],
            ].map(([t, n, d]) => (
              <li key={t}>
                <span aria-hidden="true">
                  {Array.from({ length: n }).map((_, k) => (
                    <i key={k} />
                  ))}
                </span>
                <b>{t}</b>
                <em>{d}</em>
              </li>
            ))}
          </ol>
        </div>
        <p className="ix-note">
          Role-based access, secure APIs, environment separation and audit trails as standard. No compliance certification is implied. Reference: <PpX href="https://learn.microsoft.com/power-bi/">Microsoft Power BI documentation</PpX>.
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="dad-tech-h" tone="dark" k="Technology & delivery" t="Organised by role, chosen for the decision.">
        <V4_TechLine
          groups={[
            ["Data", ["SQL", "Cloud databases", "Pipelines", "ETL / ELT"]],
            ["Analytics", ["Power BI", "Python", "Custom dashboards"]],
            ["Application", ["React", "Next.js", "Node.js", "PHP / Laravel"]],
            ["Cloud", ["AWS", "Microsoft Azure", "Google Cloud"]],
            ["AI", ["AI/ML services", "Forecasting", "Anomaly detection"]],
            ["Integration", ["REST APIs", "OpenAPI", "Webhooks"]],
          ]}
          note="Technology is selected per project; no vendor partnership or certification is implied."
        />
        <p className="dad-life" aria-label="Delivery lifecycle">
          {["Business questions", "Data landscape", "Intelligence architecture", "Dashboard experience", "Validation", "Deployment", "Continuous intelligence"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="dad-ind-h" tone="light" k="Industries" t="Analytics priorities by sector." s="Relevant contexts — not claims about specific clients.">
        <V4_Tags
          items={[
            ["Manufacturing", "factory", "Production, quality and operational visibility", "manufacturing"],
            ["Retail", "cart", "Sales, inventory and customer performance", "retail"],
            ["Healthcare", "cross", "Operational and performance analytics", "healthcare"],
            ["Financial Services", "coin", "Risk, revenue and portfolio visibility", "financial-services"],
            ["Energy", "bolt", "Assets, consumption and field operations", "energy"],
            ["Education", "book", "Admissions, outcomes and operations", "education"],
            ["Telecommunications", "signal", "Network, churn and service performance", "telecommunications"],
            ["Food & Beverage", "leaf", "Demand, distribution and stock", "food"],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="dad-faq"
        title="Data analytics & dashboards: common questions"
        items={DAD_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration</PpL>, <PpL to={ppIt("ai-and-automation-solutions")}>AI &amp; automation</PpL>, <PpL to={ppIt("crm-development")}>CRM</PpL>, <PpL to={ppIt("erp-development")}>ERP</PpL> and <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/data-analytics-dashboard-development-guide" title="Data Analytics and Dashboard Development: Seeing Your Business Performance in One Place" text="Choosing KPIs, connecting sources and keeping dashboards trusted." />

      <V4_Close
        id="dad-close-h"
        kicker="Build my analytics solution"
        title="Your data is already generating signals. Let's make them useful."
        text="Tell us what data you have, which decisions are difficult today and what visibility the business needs. We'll shape the right analytics architecture and dashboard experience."
        cta={["Build My Analytics Solution", DAD_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Decisions and KPIs agreed first", "Sources mapped and connected", "Dashboards designed per role", "Alerts and AI where they help"]}
      />

      <DM_Form
        id={DAD_FORM}
        kicker="IT project consultation"
        title="Discuss My Analytics Requirement"
        sub="A few short questions about your data and the decisions you want to improve help us suggest the right approach."
        type="Data Analytics & Dashboard Enquiry"
        service="Data Analytics & Dashboard Development"
        icon="bars"
        submitLabel="Discuss My Analytics Project"
        successTitle="Thank you. Your analytics request has been sent."
        siteLabel="Existing website or application (optional)"
        msgLabel="Business challenge / analytics requirement (optional)"
        msgPh="Current systems and data sources, the decisions you want to improve, reporting pain points — whatever helps"
        nextSteps={["We review your data sources and the challenge you described.", "We contact you to agree the key decisions and KPIs.", "You get a recommended analytics approach and next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you need?", label: "Project type", options: ["New analytics platform", "Dashboard development", "BI implementation", "Data integration", "Analytics modernisation", "AI analytics", "Reporting automation", "Maintenance & enhancement"] },
          { k: "platform", t: "Data", q: "Which data and platforms are involved?", label: "Data / platforms", multi: true, options: ["Power BI", "Custom dashboard", "SQL / database", "Cloud", "CRM", "ERP", "SaaS", "API", "AI / ML", "Spreadsheets", "Other"] },
          { k: "challenge", t: "Challenge", q: "What is the main challenge?", label: "Business challenge", multi: true, options: ["Manual reporting", "Multiple versions of the truth", "Data in disconnected systems", "Slow decisions", "No alerts or early warnings", "Dashboards nobody uses"] },
        ]}
      />

      <V4_Rail
        id="dad-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["API Development & Integration", "api-development-and-integration", "Reliable pipelines from every source."],
          ["AI & Automation Solutions", "ai-and-automation-solutions", "Turn insight into automated action."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Data platforms that scale."],
          ["CRM Development", "crm-development", "Customer data you can analyse."],
          ["ERP Development", "erp-development", "Operational data in one model."],
          ["Software Testing & QA", "software-testing-and-qa", "Validated data and dashboards."],
          ["IT Consulting", "it-consulting", "Decide the analytics roadmap."],
        ]}
      />
    </div>
  );
}

export { DAD_Page };
