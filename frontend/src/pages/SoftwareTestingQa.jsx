/*
 * Software Testing & QA — /services/it-development/software-testing-and-qa (existing URL, unchanged)
 * Build 44 rethink: "Quality is not the final checkpoint. It is an engineering layer built into the product."
 * Signature visuals (prefix QA_): quality control grid with a scanning beam, eight animated failure types, AI→engineer
 * funnel, periodic table of quality dimensions, release confidence engine with a verdict light, release train through
 * quality gates, load simulation, cross-device journey wall, concentric protection rings, cost-of-quality balance,
 * scrolling principles band. No invented defect counts, coverage or speed percentages; no team or case studies.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Numbered, V4_Rail, V4_TechLine } from '../components/dm/v44kit.jsx';

const QA_URL = "/services/it-development/software-testing-and-qa";
const QA_TITLE = "Software Testing & QA Services | Frequent Research";
const QA_DESC = "Software testing and QA that prioritises business risk: automated regression, API, performance and cross-device testing, plus AI-assisted analysis.";
const QA_FORM = "qa-project";

const QA_FAQ = [
  ["What does your Software Testing & QA service include?", "Risk-based test planning, functional and exploratory testing, automated regression, API and integration testing, performance, cross-device and accessibility checks, and quality reporting before each release."],
  ["Do you provide both manual and automated testing?", "Yes. Automation covers repeatable checks; experienced testers focus on judgement, exploration and the journeys where mistakes are expensive."],
  ["Can you test an existing website or application?", "Yes — including software built by another team. We start by mapping critical journeys and the areas of highest risk."],
  ["Can you build automated regression testing into our pipeline?", "Yes. Automated web and API suites can run in your CI/CD pipeline on every change and report clearly when something breaks."],
  ["Can you test APIs and third-party integrations?", "Yes — behaviour, contracts, authentication, error responses, data consistency and edge cases across the connected systems."],
  ["How is AI used in software testing?", "AI assists with scenario discovery, test-data generation, failure clustering, flaky-test detection and result summaries; engineers validate what matters before anything ships."],
  ["Do you provide performance testing?", "Yes — load, stress and scalability testing that shows how the system behaves as users and traffic grow, before your customers find out."],
  ["Can QA continue throughout ongoing development?", "Yes. Continuous testing can run alongside every sprint and release rather than as a phase at the end."],
];

/* ── hero: quality control grid ──────────────────────────────────────────────────────── */
const QA_CELLS = [["Web", "globe"], ["Mobile", "mobile"], ["API", "api"], ["Database", "database"], ["Cloud", "cloud"], ["Payments", "coin"], ["Integrations", "link"], ["User journeys", "user"]];
const QA_STATES = [["Validated", "ok"], ["Monitored", "info"], ["Attention", "warn"], ["Defect found", "bad"]];
const QA_RUN = ["Code", "Test", "Detect", "Analyse", "Fix", "Validate", "Release"];
function QA_Grid() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(28, v, 900, false);
  const st = (k) => {
    if (t < 8) return k < t ? 0 : -1;
    const s = (t + k * 5) % 13;
    return s === 0 ? 3 : s < 3 ? 2 : s < 6 ? 1 : 0;
  };
  const step = Math.min(QA_RUN.length - 1, Math.floor((t % 14) / 2));
  return (
    <figure ref={ref} className={"qa-grid" + (v ? " is-in" : "")} aria-label="Quality control grid: a digital product at the centre surrounded by web, mobile, API, database, cloud, payments, integrations and user journeys, each scanned and marked validated, monitored, needing attention or with a defect found.">
      <div className="qa-grid__board">
        {QA_CELLS.map(([n, ic], k) => {
          const s = st(k);
          return (
            <div key={n} className={"qa-cell" + (s >= 0 ? " is-" + QA_STATES[s][1] : "")} style={{ "--k": k }}>
              <IX_I n={ic} s={18} />
              <b>{n}</b>
              <small>{s >= 0 ? QA_STATES[s][0] : "Queued"}</small>
            </div>
          );
        })}
        <div className="qa-grid__core">
          <IX_I n="layers" s={22} />
          <b>Your digital product</b>
        </div>
        <i className="qa-grid__beam" aria-hidden="true" />
      </div>
      <ol className="qa-grid__run" aria-hidden="true">
        {QA_RUN.map((x, k) => (
          <li key={x} className={k < step ? "is-done" : k === step ? "is-on" : ""}>
            {x}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ── eight kinds of failure ──────────────────────────────────────────────────────────── */
const QA_FAIL = [
  ["Slow", "slow", "It technically works, but users give up waiting."],
  ["Fragile", "fragile", "A small change breaks another workflow."],
  ["Inconsistent", "incon", "It behaves differently on another device or browser."],
  ["Silent", "silent", "An integration fails and nobody is told."],
  ["Repetitive", "repeat", "Manual regression eats the release window."],
  ["Hidden", "hidden", "The problem only appears under real-world load."],
  ["Confusing", "confuse", "The feature works; the experience does not."],
  ["Risky", "risky", "Data handling or access control has a weak point."],
];
function QA_Failures() {
  const [ref, v] = ppIn(0.2);
  return (
    <ul ref={ref} className={"qa-fail" + (v ? " is-in" : "")}>
      {QA_FAIL.map(([t, fx, d], k) => (
        <li key={t} style={{ "--k": k }}>
          <i className={"qa-fx qa-fx--" + fx} aria-hidden="true">
            <span />
            <span />
          </i>
          <b>{t}</b>
          <p>{d}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── AI finds patterns, engineers decide ─────────────────────────────────────────────── */
function QA_Funnel() {
  const [ref, v] = ppIn(0.3);
  const AI = ["Detect", "Generate", "Compare", "Cluster", "Summarise", "Prioritise"];
  const HU = ["Validate", "Investigate", "Challenge", "Reproduce", "Assess risk", "Decide"];
  return (
    <div ref={ref} className={"qa-fun" + (v ? " is-in" : "")}>
      <div className="qa-fun__tier qa-fun__tier--ai">
        <small>AI layer</small>
        <ul>
          {AI.map((x, k) => (
            <li key={x} style={{ "--k": k }}>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="qa-fun__neck" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="qa-fun__tier qa-fun__tier--hu">
        <small>QA engineering layer</small>
        <ul>
          {HU.map((x, k) => (
            <li key={x} style={{ "--k": k }}>
              {x}
            </li>
          ))}
        </ul>
      </div>
      <div className="qa-fun__out">Higher-confidence releases</div>
    </div>
  );
}

/* ── periodic table of quality ───────────────────────────────────────────────────────── */
const QA_EL = [
  ["Fn", "Functional", "Does it work?"], ["Us", "Usability", "Does it make sense?"], ["Pf", "Performance", "Does it stay responsive?"], ["Sc", "Security", "Can it withstand common risks?"], ["Cp", "Compatibility", "Does it work everywhere it should?"],
  ["In", "Integration", "Do systems talk correctly?"], ["Ax", "Accessibility", "Can everyone use it?"], ["Rl", "Reliability", "Does it behave consistently?"], ["Au", "Automation", "Can repetitive checks run themselves?"], ["Rq", "Release quality", "Is it ready to ship?"],
];
function QA_Table() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="qa-pt">
      <ul className="qa-pt__grid">
        {QA_EL.map(([s, n], k) => (
          <li key={s}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className={"qa-pt__el qa-pt__el--" + (k % 5)}>
              <small className="v4-mono">{String(k + 1).padStart(2, "0")}</small>
              <b>{s}</b>
              <span>{n}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="qa-pt__q" aria-live="polite">
        <b>{QA_EL[i][1]}</b> — {QA_EL[i][2]}
      </p>
    </div>
  );
}

/* ── capability tabs ─────────────────────────────────────────────────────────────────── */
const QA_CAPS = [
  ["Functional quality", ["Functional testing", "End-to-end testing", "Regression testing", "Smoke & sanity testing", "Exploratory testing", "User journey validation"]],
  ["Automation", ["Web automation", "API automation", "Regression automation", "CI/CD test automation", "Cross-browser automation", "Automated test reporting"]],
  ["Performance", ["Load testing", "Stress testing", "Scalability testing", "Response-time validation", "Concurrency testing", "Performance regression"]],
  ["API & integration", ["REST API testing", "GraphQL where applicable", "Contract validation", "Authentication testing", "Error handling", "Third-party validation"]],
  ["Mobile & web", ["iOS and Android", "Device and OS coverage", "Cross-browser", "Responsive behaviour", "Accessibility checks", "Network conditions"]],
  ["AI-assisted quality", ["Test generation assistance", "Defect pattern analysis", "Test prioritisation", "Intelligent regression selection", "Failure summarisation", "Flaky-test identification"]],
];
function QA_Caps() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="qa-caps">
      <div className="qa-caps__tabs" role="tablist" aria-label="Quality engineering capabilities">
        {QA_CAPS.map(([t], k) => (
          <button key={t} type="button" role="tab" id={"qa-cap-t" + k} aria-selected={k === i} aria-controls="qa-cap-p" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="qa-caps__list" role="tabpanel" id="qa-cap-p" aria-labelledby={"qa-cap-t" + i} key={i}>
        {QA_CAPS[i][1].map((x, k) => (
          <li key={x} style={{ "--k": k }}>
            <IX_I n="check" s={14} /> {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── release confidence engine ───────────────────────────────────────────────────────── */
const QA_VERDICT = [["Release", "ok", "All gates green; known risks accepted."], ["Investigate", "warn", "A failure pattern needs a closer look."], ["Fix first", "bad", "A critical journey is broken."]];
function QA_Engine() {
  const [ref, v] = ppIn(0.3);
  const [t] = ixCycle(6, v, 2000, false);
  const d = QA_VERDICT[t % 2 === 0 ? 0 : t === 1 ? 1 : t === 3 ? 2 : 0];
  const C = [
    ["Input", ["Code", "Requirements", "APIs", "Data", "User journeys"]],
    ["Quality signals", ["Functional", "Performance", "Security", "Compatibility", "Integration"]],
    ["Intelligence", ["Risk analysis", "Failure patterns", "Regression priority", "AI assistance"]],
  ];
  return (
    <div ref={ref} className={"qa-eng" + (v ? " is-in" : "")}>
      {C.map(([h, xs], k) => (
        <div key={h} className="qa-eng__col" style={{ "--k": k }}>
          <small>{h}</small>
          <ul>
            {xs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      ))}
      <div className={"qa-eng__dec qa-eng__dec--" + d[1]} aria-live="polite">
        <small>Decision</small>
        <span className="qa-eng__lights" aria-hidden="true">
          <i className="r" />
          <i className="a" />
          <i className="g" />
        </span>
        <b>{d[0]}</b>
        <em>{d[2]}</em>
      </div>
    </div>
  );
}

/* ── release train through quality gates ─────────────────────────────────────────────── */
function QA_Gates() {
  const [ref, v] = ppIn(0.3);
  const [t] = ixCycle(7, v, 1200, false);
  const G = ["Functional confidence", "Regression confidence", "Integration confidence", "Performance confidence", "Release confidence"];
  return (
    <div ref={ref} className="qa-gates">
      <div className="qa-gates__track" aria-hidden="true">
        <i className="qa-gates__train" style={{ left: Math.min(t, 6) * (100 / 6) + "%" }} />
      </div>
      <ol>
        {G.map((g, k) => (
          <li key={g} className={k < t ? "is-open" : ""}>
            <span aria-hidden="true" />
            <b className="v4-mono">Gate {String(k + 1).padStart(2, "0")}</b>
            {g}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── load simulation ─────────────────────────────────────────────────────────────────── */
function QA_Load() {
  const [u, setU] = ee.useState(1);
  const L = [
    ["Normal day", "Responsive", "ok", "Baseline behaviour recorded."],
    ["Campaign peak", "Slowing", "warn", "Response time climbs; the database is the bottleneck."],
    ["Launch spike", "Errors appear", "bad", "Found in testing, fixed before customers see it."],
  ];
  const c = L[u];
  return (
    <div className="qa-load">
      <div className="qa-load__ctl">
        <label htmlFor="qa-load-r">Simulated users</label>
        <input id="qa-load-r" type="range" min="0" max="2" step="1" value={u} onChange={(e) => setU(+e.target.value)} aria-valuetext={c[0]} />
        <div className="qa-load__ticks" aria-hidden="true">
          {L.map(([t]) => (
            <span key={t}>{t}</span>
          ))}
        </div>
      </div>
      <div className={"qa-load__sys is-" + c[2]} aria-live="polite">
        <div className="qa-load__users" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, k) => (
            <i key={k} className={k < [5, 11, 18][u] ? "is-on" : ""} />
          ))}
        </div>
        <div className="qa-load__meters">
          {[["Response time", [25, 60, 90][u]], ["Resource utilisation", [30, 70, 96][u]], ["Errors", [2, 12, 60][u]]].map(([n, w]) => (
            <span key={n}>
              <small>{n}</small>
              <i style={{ width: w + "%" }} />
            </span>
          ))}
        </div>
        <p>
          <span className={"v4-st v4-st--" + c[2]}>{c[1]}</span> {c[3]}
        </p>
      </div>
    </div>
  );
}

/* ── cross-device journey wall ───────────────────────────────────────────────────────── */
function QA_Devices() {
  const [ref, v] = ppIn(0.3);
  const [i] = ixCycle(4, v, 1600, false);
  const D = [["Desktop", "Chrome · Windows"], ["Laptop", "Safari · macOS"], ["Tablet", "Safari · iPadOS"], ["Mobile", "Chrome · Android"]];
  const J = ["Search", "Product", "Basket", "Checkout"];
  return (
    <div ref={ref} className="qa-dev">
      {D.map(([d, b], k) => (
        <div key={d} className={"qa-dev__d qa-dev__d--" + k + (k === i ? " is-on" : "")}>
          <div className="qa-dev__scr" aria-hidden="true">
            <i />
            <i />
            <b>{J[k]}</b>
            {k === i && <em>✓</em>}
          </div>
          <strong>{d}</strong>
          <small>{b}</small>
        </div>
      ))}
    </div>
  );
}

/* ── what QA protects: concentric rings ──────────────────────────────────────────────── */
function QA_Rings() {
  const R = [
    ["Customer experience", "Revenue workflows", "Brand trust"],
    ["Data integrity", "Integrations", "Performance"],
    ["Release velocity", "Operational continuity"],
  ];
  return (
    <div className="qa-rings" role="img" aria-label="Your digital product at the centre, protected by rings: customer experience, revenue workflows and brand trust; data integrity, integrations and performance; release velocity and operational continuity.">
      {R.map((ring, k) => (
        <div key={k} className={"qa-rings__r qa-rings__r--" + k}>
          {ring.map((x, j) => (
            <span key={x} style={{ "--a": (j * 360) / ring.length + k * 40 + "deg" }}>
              <em>{x}</em>
            </span>
          ))}
        </div>
      ))}
      <b className="qa-rings__c">Your digital product</b>
      <p className="qa-rings__m" aria-hidden="true">
        {R.flat().map((x) => (
          <span key={x}>{x}</span>
        ))}
      </p>
    </div>
  );
}

/* ── cost of quality balance ─────────────────────────────────────────────────────────── */
function QA_Balance() {
  const [now, setNow] = ee.useState(true);
  return (
    <div className={"qa-bal" + (now ? " is-now" : " is-later")}>
      <div className="qa-bal__beam" aria-hidden="true">
        <i />
      </div>
      <div className="qa-bal__pans">
        <div>
          <b>Invest in quality</b>
          <ul>
            {["Automation", "Early validation", "Risk prioritisation", "Regression coverage", "Observability"].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <div>
          <b>Pay for defects later</b>
          <ul>
            {["Customer complaints", "Emergency fixes", "Release delays", "Rework", "Lost trust", "Engineering disruption"].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="aia-hand__tg" role="group" aria-label="Where the cost lands">
        <button type="button" aria-pressed={now} onClick={() => setNow(true)}>
          Planned quality
        </button>
        <button type="button" aria-pressed={!now} onClick={() => setNow(false)}>
          Defects found by users
        </button>
      </div>
    </div>
  );
}

function QA_Page() {
  usePageMeta("Software Testing & QA", QA_DESC);
  dmMeta(QA_URL, QA_TITLE, QA_DESC);
  ixSchema("qa", {
    url: QA_URL,
    crumb: "Software Testing & QA",
    name: "Software Testing & QA",
    serviceType: "Software testing and quality assurance",
    schemaDesc:
      "Software testing and quality assurance: risk-based test strategy, functional, exploratory and end-to-end testing, automated regression in CI/CD, API and integration testing, performance and load testing, cross-browser, mobile and accessibility testing, security-aware testing, AI-assisted test analysis and continuous quality engineering.",
    faq: QA_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p qa-svc">
      <V4_Hero
        id="qa-h1"
        crumb="Software Testing & QA"
        variant="split"
        kicker="Software Testing & QA · Quality engineering"
        h1="Find the Risk Before Your Users Find the Bug."
        lead="Software testing & QA from Frequent Research treats quality as an engineering layer, not a final checkpoint: risk-based coverage, automation for what repeats, AI-assisted analysis and experienced judgement — so every release ships with evidence, not hope."
        cta={["Plan My QA Strategy", QA_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["See the quality gates", "qa-gate-h"]}
        points={["AI-assisted test intelligence", "Automation & regression coverage", "Performance & reliability testing", "Continuous quality engineering"]}
      >
        <QA_Grid />
      </V4_Hero>

      <IX_Sec id="qa-fail-h" tone="off" k="A bug is only one type of failure" t="Not every quality problem looks like a bug." center>
        <QA_Failures />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-mod-h" tone="light" k="Traditional QA vs quality engineering" t="Quality is not a test phase. It's part of the product.">
        <div className="qa-vs">
          <div>
            <small>Traditional QA</small>
            <p className="qa-vs__flow">Build → Test → Fix → Release</p>
            <ul>
              {["Test cases", "Manual execution", "Bug list", "Retest", "Release"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <div>
            <small>Quality engineering</small>
            <p className="qa-vs__flow">Design for quality → Automate → Validate → Observe → Learn → Improve → Release</p>
            <ul>
              {["Risk signals", "Automated coverage", "AI-assisted prioritisation", "Failure intelligence", "Continuous validation", "Release confidence"].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
        <p className="ix-note">Traditional testing still matters. Quality engineering adds earlier detection, automation and evidence to it.</p>
      </IX_Sec>

      <IX_Sec id="qa-ai-h" tone="dark" k="Human + AI quality model" t="AI finds patterns. Engineers decide what matters." s="AI accelerates QA work — generating scenarios, clustering failures, summarising runs. Engineering judgement still decides what blocks a release.">
        <QA_Funnel />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-pt-h" tone="light" k="Testing intelligence map" t="Ten dimensions of product quality." s="Pick an element.">
        <QA_Table />
      </IX_Sec>

      <IX_Sec id="qa-usp-h" tone="off" k="Why Frequent Research" t="We don't just test software. We challenge its weak points.">
        <V4_Numbered
          lead="Business-risk-based testing: not everything is tested equally. Coverage follows risk → impact → confidence."
          items={[
            ["Risk before volume", "Revenue, transactions, data, workflows and integrations get the deepest coverage."],
            ["Quality engineering, not just execution", "Requirements → architecture → code → API → UI → integration → deployment → production."],
            ["AI-assisted, engineer-led", "Scenario discovery, failure clustering, flaky-test detection and impact analysis — validated by people."],
            ["Real user journeys", "Testing follows how people actually buy, book, sign up and work."],
            ["Built with the engineering team", "Testing sits beside development, APIs, cloud and DevOps — not at the end of the line."],
            ["Evidence you can read", "Clear quality signals and release blockers instead of long, undifferentiated bug lists."],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="qa-cap-h" tone="light" k="Capabilities" t="A quality engineering capability system.">
        <QA_Caps />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-eng-h" tone="ink" k="The release confidence engine" t="Every release ends with a decision — make it an informed one." wide>
        <QA_Engine />
      </IX_Sec>

      <IX_Sec id="qa-gate-h" tone="light" k="Quality gates & continuous testing" t="Quality follows the product through every release." s="Commit → build → automated tests → API validation → regression → performance → quality signals → release → production monitoring → feedback. No fake percentages — gates open on agreed criteria.">
        <QA_Gates />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-perf-h" tone="off" k="Performance testing" t="Find out how it behaves under load — before launch day does." s="Move the slider. Conceptual behaviour, not measured results.">
        <QA_Load />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-dev-h" tone="light" k="Cross-device experience" t="One journey. Every screen it has to work on." s="Consistency, usability and functionality across browsers, operating systems and devices.">
        <QA_Devices />
      </IX_Sec>

      <IX_Sec lv={3} id="qa-api-h" tone="dark" k="API, integration & security-aware testing" t="QA validates the whole chain — not just the screen.">
        <div className="qa-chain">
          <ol aria-label="Connected chain under test">
            {["Application", "API layer", "External services", "Database", "Cloud"].map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ol>
          <div className="qa-chain__cols">
            <div>
              <b>Integration quality</b>
              <p>API behaviour, data consistency, authentication, error responses, integration workflows, edge cases and contract expectations.</p>
              <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration →</PpL>
            </div>
            <div>
              <b>Security-aware testing</b>
              <p>Authentication and authorisation flows, session handling, input validation, error exposure, access-control scenarios and sensitive-data handling. A complement to — not a replacement for — security testing.</p>
              <PpL to={ppIt("cybersecurity-services")}>Cybersecurity services →</PpL>
            </div>
          </div>
        </div>
      </IX_Sec>

      <IX_Sec id="qa-prot-h" tone="light" k="What Frequent Research protects" t="Software quality protects more than code.">
        <div className="qa-protect">
          <QA_Rings />
          <ul className="qa-val">
            {[
              ["Release confidence", "Know what was validated before you ship."],
              ["Lower production risk", "Critical failures found earlier."],
              ["Faster releases", "Repeatable checks automated."],
              ["Better customer experience", "Usability and compatibility issues caught first."],
              ["More stable integrations", "APIs and connected systems validated."],
              ["Smarter quality decisions", "Quality signals and AI-assisted analysis."],
            ].map(([t, d]) => (
              <li key={t}>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="qa-cost-h" tone="off" k="The economics of quality" t="Quality has a cost. So does poor quality." center>
        <QA_Balance />
      </IX_Sec>

      <div className="qa-band" aria-label="Quality principles">
        <div className="qa-band__track">
          {[0, 1].map((r) => (
            <p key={r} aria-hidden={r === 1}>
              <span>Test the business journey, not just the button</span>
              <span>Automate repetition, not judgement</span>
              <span>Prioritise risk, not test-case volume</span>
              <span>Use AI to accelerate analysis, not replace engineering judgement</span>
              <span>Find failures before they become incidents</span>
              <span>Treat quality as continuous infrastructure</span>
            </p>
          ))}
        </div>
      </div>

      <IX_Sec lv={3} id="qa-tech-h" tone="light" k="Tools & lifecycle" t="Tools grouped by purpose, chosen per product.">
        <V4_TechLine
          groups={[
            ["Web automation", ["Playwright", "Selenium", "Cypress"]],
            ["API testing", ["Postman", "REST", "GraphQL"]],
            ["Languages", ["JavaScript / TypeScript", "Python", "Node.js"]],
            ["CI/CD", ["Git-based workflows", "Pipeline test stages"]],
            ["Cloud", ["AWS", "Azure", "Google Cloud"]],
            ["AI-assisted", ["Scenario generation", "Failure clustering", "Result summaries"]],
          ]}
          note="Tools are selected for each product; no vendor certification is implied. Reference: OWASP Web Security Testing Guide for security-aware checks."
        />
        <p className="dad-life qa-life" aria-label="QA lifecycle">
          {["Understand the product", "Map critical journeys", "Identify risk", "Design coverage", "Automate what repeats", "Validate what matters", "Analyse quality signals", "Release with confidence", "Improve"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      </IX_Sec>

      <DM_Faq
        id="qa-faq"
        title="Software testing & QA: common questions"
        items={QA_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL>, <PpL to={ppIt("web-application-development")}>web application development</PpL>, <PpL to={ppIt("mobile-app-development")}>mobile app development</PpL> and <PpL to={ppIt("application-maintenance-and-support")}>application maintenance</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/software-testing-qa-guide" title="Software Testing and QA: Catching Problems Before Your Customers Do" text="Risk-based testing, automation and release readiness explained." />

      <V4_Close
        id="qa-close-h"
        kicker="Assess my QA requirements"
        title="Before you ship it, challenge it."
        text="Tell us what you're building, where quality is getting hard to manage, or which part of the release process needs stronger validation. We'll shape the right QA strategy."
        cta={["Assess My QA Requirements", QA_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Critical journeys and risks mapped", "Automation candidates identified", "Quality gates agreed", "Clear release evidence"]}
      />

      <DM_Form
        id={QA_FORM}
        kicker="IT project consultation"
        title="Plan My QA Strategy"
        sub="A few short questions about your product and the quality challenge help us recommend the right testing approach."
        type="Software Testing & QA Enquiry"
        service="Software Testing & QA"
        icon="check"
        submitLabel="Discuss My Testing Strategy"
        successTitle="Thank you. Your QA request has been sent."
        siteLabel="Existing website or app URL (optional)"
        msgLabel="Main quality challenge / testing requirement (optional)"
        msgPh="Technology, release frequency, known problem areas, deadlines — whatever helps"
        nextSteps={["We review the product and challenge you described.", "We contact you to map critical journeys and risks.", "You get a recommended QA approach and next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you need?", label: "Project type", options: ["New product QA", "Existing product testing", "QA automation", "Regression testing", "Performance testing", "API testing", "Mobile testing", "QA modernisation", "Ongoing QA support"] },
          { k: "platform", t: "Platform", q: "What needs testing?", label: "Platforms", multi: true, options: ["Website", "Web app", "iOS", "Android", "API", "SaaS", "Cloud", "AI application", "Other"] },
          { k: "challenge", t: "Challenge", q: "What is the main quality challenge?", label: "Main quality challenge", multi: true, options: ["Bugs reaching customers", "Slow manual regression", "Unstable integrations", "Performance under load", "Cross-device issues", "No test automation", "Unclear release readiness"] },
        ]}
      />

      <V4_Rail
        id="qa-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["API Development & Integration", "api-development-and-integration", "Well-designed APIs are easier to test."],
          ["AI & Automation Solutions", "ai-and-automation-solutions", "Testing automations and AI outputs."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Tests inside the delivery pipeline."],
          ["Cybersecurity Services", "cybersecurity-services", "Deeper security assessment."],
          ["Custom Software Development", "custom-software-development", "Quality designed in from the start."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "Regression checks after every fix."],
          ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Validated data and reports."],
        ]}
      />
    </div>
  );
}

export { QA_Page };
