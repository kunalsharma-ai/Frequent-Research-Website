/*
 * Cloud & DevOps Services — /services/it-development/cloud-and-devops-services (existing URL, unchanged)
 * Build 44 rethink: "Cloud is not a destination. It's an operating environment."
 * Signature visuals (page-specific, prefix CDO_): layered infrastructure stack with a live deployment path, manual vs
 * engineered delivery lanes, chevron CI/CD pipeline, one blueprint → three environments, infrastructure switchboard,
 * resilience heartbeat, right-sizing cost panel, scaling simulation, AI workload path, maturity staircase.
 * No team block, no example engagement, no invented numbers, uptime, savings, partnerships or certifications.
 * IT & Development only — no market-research positioning.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Numbered, V4_Rail, V4_Statement, V4_Tags, V4_TechLine, v4Pick } from '../components/dm/v44kit.jsx';

const CDO_URL = "/services/it-development/cloud-and-devops-services";
const CDO_TITLE = "Cloud & DevOps Services and CI/CD | Frequent Research";
const CDO_DESC = "Cloud & DevOps services that automate releases, make production visible and keep cloud costs in check on AWS, Azure or Google Cloud, ready for AI workloads.";
const CDO_FORM = "cloud-project";

const CDO_FAQ = [
  ["What are Cloud & DevOps Services?", "The architecture, automation and operations that let software run reliably in the cloud: environments, CI/CD pipelines, monitoring, security controls, backup and cost management."],
  ["Can you migrate an existing application to AWS, Azure or Google Cloud?", "Yes. Migration starts with dependencies, data and downtime requirements, then moves the application with minimal change or modernises the parts where that is worth it."],
  ["Can you improve the cloud environment we already have?", "Yes. An infrastructure review looks at architecture, deployments, monitoring, security and spend, and recommends the changes with the clearest business value."],
  ["Do you set up CI/CD and deployment automation?", "Yes — automated build, test, security checks and deployment, so releases become routine rather than risky manual events."],
  ["Can you help control cloud costs?", "Yes. Right-sizing, idle-resource clean-up, environment scheduling, storage lifecycle rules and cost visibility keep spend aligned with real workload needs; we do not promise a fixed saving."],
  ["Can the infrastructure support AI applications?", "Yes. AI workloads need scalable compute, secure data access, APIs, background processing, monitoring and cost controls, and these can be designed in from the start."],
  ["Do you provide backup and disaster recovery planning?", "Yes — backup strategy, recovery planning and restore testing, scoped to the recovery needs you agree for each system."],
  ["Can you work alongside our existing development team?", "Yes. Pipelines, infrastructure code and documentation are set up so your team can own and extend them."],
];

/* ── hero: layered infrastructure with a live deployment path ─────────────────────────── */
const CDO_PATH = [
  ["Developer", 0], ["Git / source", 0], ["CI/CD", 1], ["Build", 1], ["Test", 1], ["Security check", 1], ["Deploy", 2], ["Cloud", 2], ["Observe", 3], ["Improve", 3],
];
const CDO_PLATES = [
  ["Application layer", ["Users", "Application", "API"]],
  ["Delivery layer", ["CI/CD", "Security", "Analytics"]],
  ["Cloud layer", ["Compute", "Database", "AI"]],
];
function CDO_Stack() {
  const [ref, v] = ppIn(0.2);
  const [i] = ixCycle(CDO_PATH.length, v, 1500, false);
  const layer = CDO_PATH[i][1];
  return (
    <figure ref={ref} className={"cdo-stack" + (v ? " is-in" : "")} aria-label="Infrastructure diagram: an application layer, a delivery layer and a cloud layer stacked above each other, with a deployment moving from developer and source control through CI/CD, build, test and security checks to deployment, cloud, observation and improvement.">
      <div className="cdo-stack__iso" aria-hidden="true">
        {CDO_PLATES.map(([t, chips], k) => (
          <div key={t} className={"cdo-plate cdo-plate--" + k + (layer === k ? " is-on" : "")} style={{ "--k": k }}>
            <div className="cdo-plate__face">
              {chips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            <b className="cdo-plate__t">{t}</b>
          </div>
        ))}
        <i className={"cdo-stack__ops" + (layer === 3 ? " is-on" : "")}>Monitoring · Observability</i>
        <i className="cdo-stack__drop" key={i} style={{ "--l": Math.min(layer, 2) }} />
      </div>
      <ol className="cdo-stack__path">
        {CDO_PATH.map(([t], k) => (
          <li key={t} className={k === i ? "is-on" : k < i ? "is-done" : ""}>
            {t}
          </li>
        ))}
      </ol>
      <figcaption className="cdo-stack__cap">
        <span className="v4-live" aria-hidden="true" /> {CDO_PATH[i][0]}
      </figcaption>
    </figure>
  );
}

/* ── problem: manual lane vs engineered lane ─────────────────────────────────────────── */
const CDO_MANUAL = [["Code", ""], ["Manual build", "w"], ["Manual testing", "w"], ["Manual deployment", "w"], ["Production", ""], ["Something breaks", "b"], ["Investigated by hand", "w"], ["Customer impact", "b"]];
const CDO_AUTO = [["Code", ""], ["Automated build", "o"], ["Automated test", "o"], ["Security checks", "o"], ["Automated deployment", "o"], ["Observe", "o"], ["Alert", "o"], ["Respond", "o"], ["Improve", "o"]];
function CDO_Lanes() {
  const [ref, v] = ppIn(0.25);
  const Lane = ({ t, s, steps, cls }) => (
    <div className={"cdo-lane " + cls}>
      <div className="cdo-lane__h">
        <b>{t}</b>
        <small>{s}</small>
      </div>
      <ol>
        {steps.map(([x, st], k) => (
          <li key={x + k} className={st ? "is-" + st : ""} style={{ "--k": k }}>
            {x}
          </li>
        ))}
      </ol>
      <i className="cdo-lane__run" aria-hidden="true" />
    </div>
  );
  return (
    <div ref={ref} className={"cdo-lanes" + (v ? " is-in" : "")}>
      <Lane t="Manual path" s="Every release depends on people remembering steps" steps={CDO_MANUAL} cls="cdo-lane--m" />
      <Lane t="Engineered path" s="Repeatable, observed, improved" steps={CDO_AUTO} cls="cdo-lane--a" />
    </div>
  );
}

/* ── CI/CD chevron pipeline ──────────────────────────────────────────────────────────── */
const CDO_PIPE = [
  ["Code", "branch", "Every change starts in version control."],
  ["Build", "box", "Consistent application artefacts, every time."],
  ["Test", "check", "Catch issues before production does."],
  ["Security", "shield", "Checks introduced before release, not after."],
  ["Artefact", "layers", "One versioned package promoted across environments."],
  ["Deploy", "rocket", "Less manual release work, safer rollbacks."],
  ["Monitor", "eye", "Understand what happens after the deployment."],
  ["Feedback", "refresh", "Signals flow back into the next change."],
];
function CDO_Pipe() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(CDO_PIPE.length, v, 1700);
  return (
    <div ref={ref} className={"cdo-pipe" + (v ? " is-in" : "")}>
      <ol className="cdo-pipe__row" role="list">
        {CDO_PIPE.map(([t, ic], k) => (
          <li key={t} className={(k <= i ? "is-done" : "") + (k === i ? " is-on" : "")}>
            <button type="button" aria-pressed={k === i} onClick={() => pick(k)} onMouseEnter={() => pick(k)}>
              <IX_I n={ic} s={18} />
              <span>{t}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="cdo-pipe__say" aria-live="polite">
        <b>{CDO_PIPE[i][0]}.</b> {CDO_PIPE[i][2]}
      </p>
    </div>
  );
}

/* ── infrastructure as code: one blueprint, three environments ───────────────────────── */
function CDO_Blueprint() {
  const [drift, setDrift] = ee.useState(false);
  const envs = ["Development", "Staging", "Production"];
  return (
    <div className={"cdo-bp" + (drift ? " is-drift" : "")}>
      <div className="cdo-bp__src">
        <small>Infrastructure blueprint · version-controlled</small>
        <pre className="v4-mono" aria-label="Infrastructure-as-code blueprint describing network, compute, database, secrets and monitoring">
          {"network:    private + public subnets\ncompute:    containers, autoscaling\ndatabase:   managed, encrypted, backed up\nsecrets:    vault reference, no plain text\nmonitoring: logs, metrics, alerts"}
        </pre>
      </div>
      <ul className="cdo-bp__envs">
        {envs.map((e, k) => {
          const bad = drift && k === 1;
          return (
            <li key={e} className={bad ? "is-bad" : "is-ok"} style={{ "--k": k }}>
              <b>{e}</b>
              <span className={"v4-st " + (bad ? "v4-st--warn" : "v4-st--ok")}>{bad ? "Configuration drift" : "Matches blueprint"}</span>
              {bad && <small>A manual change made here and never recorded.</small>}
            </li>
          );
        })}
      </ul>
      <div className="cdo-bp__toggle" role="group" aria-label="Compare environments">
        <button type="button" aria-pressed={!drift} onClick={() => setDrift(false)}>
          Provisioned from code
        </button>
        <button type="button" aria-pressed={drift} onClick={() => setDrift(true)}>
          Configured by hand
        </button>
      </div>
    </div>
  );
}

/* ── control room: infrastructure switchboard (states, not metrics) ──────────────────── */
const CDO_SW = [
  ["Reliability", "pulse", ["Healthy", "ok"], ["Attention", "warn"]],
  ["Deployment", "rocket", ["Ready", "ok"], ["In progress", "info"]],
  ["Security", "shield", ["Protected", "ok"], ["Review", "warn"]],
  ["Cost", "coin", ["Controlled", "ok"], ["Review", "warn"]],
  ["Scaling", "trend", ["Stable", "ok"], ["Adaptive", "info"]],
  ["AI workloads", "spark", ["Ready", "ok"], ["Deploying", "vio"]],
];
function CDO_Switch() {
  const [ref, v] = ppIn(0.25);
  const [t] = ixCycle(12, v, 1400, false);
  return (
    <div ref={ref} className={"cdo-sw" + (v ? " is-in" : "")}>
      <div className="cdo-sw__bar">
        <span className="v4-live" aria-hidden="true" /> Infrastructure control room
      </div>
      <ul>
        {CDO_SW.map(([n, ic, a, b], k) => {
          const alt = (t + k * 5) % 12 < 3;
          const s = alt ? b : a;
          return (
            <li key={n}>
              <IX_I n={ic} s={18} />
              <b>{n}</b>
              <span className={"cdo-sw__tg" + (alt ? " is-alt" : "")} aria-hidden="true">
                <i />
              </span>
              <span className={"v4-st v4-st--" + s[1]}>{s[0]}</span>
            </li>
          );
        })}
      </ul>
      <p className="cdo-sw__foot">One view across reliability, delivery, security, cost, scale and AI — so attention goes where it is needed.</p>
    </div>
  );
}

/* ── resilience heartbeat ────────────────────────────────────────────────────────────── */
const CDO_RES = [
  ["Prevent", "Fault-aware architecture, redundancy, tested backups."],
  ["Detect", "Alerts on symptoms that matter to users."],
  ["Respond", "Runbooks and clear ownership when something fails."],
  ["Recover", "Restore from a known-good state, then verify."],
  ["Learn", "Post-incident review feeds the next improvement."],
];
function CDO_Pulse() {
  const [ref, v] = ppIn(0.3);
  return (
    <div ref={ref} className={"cdo-pulse" + (v ? " is-in" : "")}>
      <svg viewBox="0 0 1000 160" preserveAspectRatio="none" aria-hidden="true">
        <path className="cdo-pulse__base" d="M0 80 H1000" />
        <path className="cdo-pulse__line" d="M0 80 H150 l20-30 20 60 20-30 H330 l14 0 18 66 22-120 20 54 H560 l10-14 12 14 H760 l14-24 14 24 H1000" />
      </svg>
      <ol>
        {CDO_RES.map(([t, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <b>{t}</b>
            <span>{d}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── FinOps: right-sizing panel ──────────────────────────────────────────────────────── */
const CDO_COST = [["Compute", 92, 54], ["Storage", 80, 60], ["Database", 74, 58], ["Network", 50, 42], ["AI workloads", 88, 63], ["Environments", 96, 48]];
function CDO_Cost() {
  const [fit, setFit] = ee.useState(false);
  return (
    <div className={"cdo-cost" + (fit ? " is-fit" : "")}>
      <div className="cdo-cost__h">
        <b>Cloud cost control panel</b>
        <button type="button" className="ix-replay" aria-pressed={fit} onClick={() => setFit(!fit)}>
          {fit ? "Show unmanaged" : "Right-size it"}
        </button>
      </div>
      <ul>
        {CDO_COST.map(([n, a, b]) => (
          <li key={n}>
            <span>{n}</span>
            <div className="cdo-cost__bar" aria-hidden="true">
              <i style={{ width: (fit ? b + 6 : a) + "%" }} />
              <em style={{ width: b + "%" }} />
            </div>
            <span className={"v4-st " + (fit ? "v4-st--ok" : "v4-st--warn")}>{fit ? "Fitted" : "Over-provisioned"}</span>
          </li>
        ))}
      </ul>
      <p className="cdo-cost__k">
        <i className="cdo-cost__sw cdo-cost__sw--p" /> Provisioned <i className="cdo-cost__sw cdo-cost__sw--u" /> Actually used — shapes, not your figures.
      </p>
    </div>
  );
}

/* ── scaling simulation ─────────────────────────────────────────────────────────────── */
const CDO_LOAD = [
  ["Low traffic", 2, "Capacity scaled in — nothing idle that you pay for."],
  ["Medium", 4, "Capacity follows demand with headroom."],
  ["High traffic", 8, "Scaled out automatically, then back in when the peak passes."],
];
function CDO_Scale() {
  const [i, setI] = ee.useState(1);
  return (
    <div className="cdo-scale">
      <div className="cdo-scale__tabs" role="group" aria-label="Traffic level">
        {CDO_LOAD.map(([t], k) => (
          <button key={t} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className="cdo-scale__nodes" aria-label={CDO_LOAD[i][1] + " application instances running"}>
        {Array.from({ length: 8 }).map((_, k) => (
          <i key={k} className={k < CDO_LOAD[i][1] ? "is-on" : ""} style={{ "--k": k }} />
        ))}
      </div>
      <p aria-live="polite">{CDO_LOAD[i][2]}</p>
      <ul className="cdo-scale__bal">
        <li>Performance</li>
        <li>Reliability</li>
        <li>Cost</li>
      </ul>
    </div>
  );
}

/* ── AI workload path ───────────────────────────────────────────────────────────────── */
const CDO_AI = [["User", "user"], ["AI application", "spark"], ["API / application layer", "api"], ["AI services", "cpu"], ["Data / storage", "database"], ["Cloud infrastructure", "cloud"], ["Monitoring + security", "eye"]];
function CDO_AIPath() {
  const [ref, v] = ppIn(0.3);
  return (
    <ol ref={ref} className={"cdo-ai" + (v ? " is-in" : "")} aria-label="AI workload path from the user through the AI application, API layer, AI services, data and cloud infrastructure, wrapped by monitoring and security">
      {CDO_AI.map(([t, ic], k) => (
        <li key={t} style={{ "--k": k }}>
          <span>
            <IX_I n={ic} s={16} />
          </span>
          {t}
        </li>
      ))}
    </ol>
  );
}

/* ── maturity staircase ─────────────────────────────────────────────────────────────── */
const CDO_MAT = [
  ["Manual", "Servers and releases handled by hand; knowledge lives with individuals."],
  ["Automated", "Pipelines and infrastructure code make change repeatable."],
  ["Observable", "Logs, metrics and alerts explain what production is doing."],
  ["Reliable", "Recovery is planned and tested; failure is contained."],
  ["Optimised", "Capacity and cost follow real demand."],
  ["Intelligent", "Automation and AI-assisted signals surface issues and opportunities early."],
];
function CDO_Ladder() {
  const [ref, v] = ppIn(0.25);
  const [i, pick] = v4Pick(CDO_MAT.length, v, 2200);
  return (
    <div ref={ref} className={"cdo-lad" + (v ? " is-in" : "")}>
      <ol className="cdo-lad__steps">
        {CDO_MAT.map(([t], k) => (
          <li key={t} style={{ "--k": k }} className={(k <= i ? "is-up" : "") + (k === i ? " is-on" : "")}>
            <button type="button" aria-pressed={k === i} onClick={() => pick(k)}>
              <span>{t}</span>
            </button>
          </li>
        ))}
      </ol>
      <p className="cdo-lad__say" aria-live="polite">
        <b>{CDO_MAT[i][0]}:</b> {CDO_MAT[i][1]}
      </p>
    </div>
  );
}

/* ── modernisation routes ───────────────────────────────────────────────────────────── */
function CDO_Routes() {
  const R = [
    ["Rehost", "Move with minimal change where the application already works well.", 1],
    ["Refactor", "Improve the architecture where business value justifies it.", 2],
    ["Rebuild", "Replace components that have become a real limitation.", 3],
  ];
  return (
    <div className="cdo-routes">
      <ol className="cdo-routes__mig" aria-label="Migration path">
        {["Assess", "Map dependencies", "Modernise where needed", "Migrate", "Validate", "Optimise"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
      <ul className="cdo-routes__opts">
        {R.map(([t, d, n]) => (
          <li key={t}>
            <b>{t}</b>
            <p>{d}</p>
            <span className="cdo-routes__eff" aria-label={"Level of change: " + ["", "low", "medium", "high"][n]}>
              {[1, 2, 3].map((x) => (
                <i key={x} className={x <= n ? "is-on" : ""} />
              ))}
              <small>change</small>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── platforms (no logos, no partner claims) ────────────────────────────────────────── */
function CDO_Clouds() {
  const C = [
    ["AWS", "Scalable infrastructure, application deployment, storage, networking, monitoring and automation."],
    ["Microsoft Azure", "Cloud environments for business workloads, identity-aware architectures and application hosting."],
    ["Google Cloud", "Application infrastructure, data-intensive workloads and cloud-native services."],
  ];
  return (
    <ul className="cdo-clouds">
      {C.map(([t, d], k) => (
        <li key={t} style={{ "--k": k }}>
          <IX_I n="cloud" s={22} />
          <b>{t}</b>
          <p>{d}</p>
        </li>
      ))}
    </ul>
  );
}

function CDO_Page() {
  usePageMeta("Cloud & DevOps Services", CDO_DESC);
  dmMeta(CDO_URL, CDO_TITLE, CDO_DESC);
  ixSchema("cdo", {
    url: CDO_URL,
    crumb: "Cloud & DevOps Services",
    name: "Cloud & DevOps Services",
    serviceType: "Cloud infrastructure and DevOps services",
    schemaDesc:
      "Cloud & DevOps services: cloud architecture on AWS, Microsoft Azure and Google Cloud, cloud migration and modernisation, CI/CD and release automation, infrastructure as code, containers, observability and monitoring, reliability engineering, backup and disaster recovery planning, cloud security, cost optimisation and infrastructure for AI workloads.",
    faq: CDO_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p cdo-svc">
      <V4_Hero
        id="cdo-h1"
        crumb="Cloud & DevOps Services"
        variant="split"
        kicker="Cloud & DevOps Services · Infrastructure engineering"
        h1="Infrastructure That Moves at the Speed of Your Business."
        lead="Cloud & DevOps services from Frequent Research make releases routine, production visible and cloud spend deliberate. We engineer the environment around how your application needs to run — on AWS, Azure or Google Cloud — and keep it ready for AI workloads."
        cta={["Plan My Cloud Architecture", CDO_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["See the delivery pipeline", "cdo-pipe-h"]}
        points={["AWS, Azure & Google Cloud", "Automated CI/CD", "Observability & reliability", "AI-ready infrastructure"]}
      >
        <CDO_Stack />
      </V4_Hero>

      <V4_Statement
        id="cdo-say-h"
        tone="off"
        kicker="The big idea"
        text="Cloud is not a destination. It's an operating environment."
        accent="operating environment"
        sub="Moving an application to the cloud is one step. A mature environment connects all of these — and the business feels the difference when one is missing."
        chips={["Architecture", "Automation", "Security", "Observability", "Reliability", "Cost", "Performance", "AI readiness"]}
      />

      <IX_Sec id="cdo-prob-h" tone="light" k="The real problem isn't the cloud" t="Moving to the cloud doesn't automatically make software better." s="Slow, anxious releases and production surprises usually come from the path between code and customer — not from the hosting provider.">
        <CDO_Lanes />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-prom-h" tone="dark" k="Our central promise" t="We don't just move applications to the cloud. We engineer the environment around how the application needs to run.">
        <div className="cdo-prom">
          <p>
            Every recommendation starts from the workload. Not every project needs every component — the right design is the one that matches how the application is used, changed and recovered.
          </p>
          <ul aria-label="What the architecture considers">
            {["Workload", "Traffic patterns", "Application architecture", "Data", "Security", "Deployment frequency", "Availability", "Recovery", "Monitoring", "Cost", "Future growth", "AI workloads"].map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </IX_Sec>

      <IX_Sec id="cdo-pipe-h" tone="light" k="DevOps automation" t="Automate the path from code to production." s="Select a stage — or watch a change travel through the pipeline.">
        <CDO_Pipe />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-iac-h" tone="off" k="Infrastructure as code" t="Less configuration drift. More repeatability." s="The same version-controlled blueprint builds development, staging and production — so “it worked in staging” means something.">
        <CDO_Blueprint />
        <p className="ix-note">
          Containers, Kubernetes, serverless and microservices are used where the workload needs them — not because they are fashionable. References: <PpX href="https://kubernetes.io/docs/home/">Kubernetes documentation</PpX>, <PpX href="https://docs.docker.com/">Docker documentation</PpX>.
        </p>
      </IX_Sec>

      <IX_Sec id="cdo-obs-h" tone="ink" k="Observability" t="You can't improve what you can't see." s="Application health, infrastructure health, deployments, resource use and alerts in one place. Conceptual states — never invented uptime or client metrics." wide>
        <CDO_Switch />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-rel-h" tone="light" k="Reliability engineering" t="Reliability is not a feature added after deployment. It is an architectural decision.">
        <CDO_Pulse />
        <p className="ix-note">Backup strategy, recovery planning and restore testing are scoped per system; recovery times are agreed, never assumed.</p>
      </IX_Sec>

      <IX_Sec id="cdo-cost-h" tone="off" k="Cloud economics" t="Cloud growth should not mean cost growth without control." s="Right-sizing, idle-resource detection, environment scheduling, storage lifecycle rules and cost allocation — balanced against performance and reliability.">
        <div className="cdo-econ">
          <CDO_Cost />
          <CDO_Scale />
        </div>
      </IX_Sec>

      <IX_Sec id="cdo-ai-h" tone="light" k="Cloud + DevOps + AI" t="AI needs infrastructure it can actually run on.">
        <div className="cdo-aiw">
          <CDO_AIPath />
          <div className="cdo-aiw__txt">
            <p>Modern AI applications need scalable compute, secure data access, APIs, model services, search and vector infrastructure, background processing, workload isolation, cost controls, automated deployment and governance.</p>
            <h3>AI-assisted operations, used with care</h3>
            <ul>
              <li><b>Monitoring</b> that surfaces unusual behaviour.</li>
              <li><b>Log intelligence</b> that finds patterns across large volumes.</li>
              <li><b>Incident assistance</b> for engineers investigating issues.</li>
              <li><b>Capacity and cost signals</b> that flag changing workloads and unusual spend.</li>
            </ul>
            <p className="ix-note">AI-assisted, not autonomous: engineers decide what changes in production.</p>
          </div>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-mod-h" tone="off" k="Migration & modernisation" t="Move to the cloud without moving the chaos with you." s="The right answer is not always the newest architecture. It is the architecture that makes business sense.">
        <CDO_Routes />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-mat-h" tone="light" k="Infrastructure maturity" t="DevOps maturity is more than having CI/CD." s="Where is your environment today — and what is the next sensible step?">
        <CDO_Ladder />
      </IX_Sec>

      <IX_Sec id="cdo-why-h" tone="dark" k="Why Frequent Research" t="We optimise how the infrastructure supports the product and the business — not infrastructure in isolation.">
        <V4_Numbered
          items={[
            ["Business-first infrastructure", "Technology decisions follow business requirements, not popularity."],
            ["Architecture before migration", "Dependencies and workloads are understood before anything moves."],
            ["Automation as a default", "Repeated technical work becomes repeatable automation where practical."],
            ["AI-ready thinking", "Environments designed with AI and intelligent automation workloads in mind."],
            ["Security from the beginning", "Access, secrets, monitoring and governance are part of the architecture."],
            ["Cost-aware engineering", "Scale and performance without uncontrolled spend."],
            ["Transparent ownership", "Your code, configuration and documentation stay yours, as agreed."],
            ["Built to be maintained", "Infrastructure that stays understandable after the first release."],
          ]}
        />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-tech-h" tone="light" k="Cloud platforms & technology" t="Selected technologies, based on what the workload requires.">
        <CDO_Clouds />
        <V4_TechLine
          groups={[
            ["Containers", ["Docker", "Kubernetes", "Serverless"]],
            ["Delivery", ["CI/CD pipelines", "Release workflows", "Infrastructure as Code"]],
            ["Observe", ["Logs", "Metrics", "Alerts", "Tracing"]],
            ["Security", ["IAM", "Secrets", "Encryption", "Network controls"]],
            ["Applications", ["React", "Next.js", "Node.js", "Python", "PHP / Laravel"]],
            ["Mobile", ["Flutter", "React Native"]],
          ]}
          note="Platform names describe experience with these technologies; no partner status or certification is implied."
        />
      </IX_Sec>

      <IX_Sec lv={3} id="cdo-ind-h" tone="off" k="Industries" t="Where infrastructure decisions carry the most weight." s="Capability examples, not claims about specific clients.">
        <V4_Tags
          items={[
            ["Manufacturing", "factory", "ERP, operations, analytics and connected devices", "manufacturing"],
            ["Retail", "cart", "E-commerce, payments, inventory and peak traffic", "retail"],
            ["Financial Services", "coin", "Applications, APIs, security and data", "financial-services"],
            ["Healthcare", "cross", "Availability, access control and data protection", "healthcare"],
            ["Education", "book", "Portals, seasonal load and content delivery", "education"],
            ["Media", "film", "Streaming, publishing and traffic spikes", "mass-media"],
            ["Telecommunications", "signal", "Platforms, provisioning and observability", "telecommunications"],
            ["Information Technology", "cpu", "SaaS platforms, multi-tenant scale and CI/CD", "it"],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="cdo-faq"
        title="Cloud & DevOps services: common questions"
        items={CDO_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration</PpL>, <PpL to={ppIt("ai-and-automation-solutions")}>AI &amp; automation</PpL>, <PpL to={ppIt("software-testing-and-qa")}>software testing &amp; QA</PpL>, <PpL to={ppIt("cybersecurity-services")}>cybersecurity</PpL> and <PpL to={ppIt("application-maintenance-and-support")}>application maintenance</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/cloud-devops-services-guide" title="Cloud and DevOps Services: Reliable Hosting, Faster Releases and Lower Risk" text="How pipelines, monitoring and cost control work together." />

      <V4_Close
        id="cdo-close-h"
        kicker="Review my infrastructure"
        title="Build the infrastructure your next stage of growth needs."
        text="Tell us where releases slow down, what keeps you up during deployments and where the cloud bill surprises you. We'll map the environment and the changes worth making first."
        cta={["Discuss My Cloud & DevOps Requirements", CDO_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Architecture and dependency review", "CI/CD and release automation plan", "Monitoring, backup and recovery gaps", "Cost and right-sizing opportunities"]}
      />

      <DM_Form
        id={CDO_FORM}
        kicker="IT project consultation"
        title="Plan My Cloud Architecture"
        sub="A few short questions about your platform and the infrastructure challenge help us recommend the right next step."
        type="Cloud & DevOps Enquiry"
        service="Cloud & DevOps Services"
        icon="cloud"
        submitLabel="Discuss My Cloud Requirements"
        successTitle="Thank you. Your cloud & DevOps request has been sent."
        siteLabel="Existing website or application (optional)"
        msgLabel="Infrastructure challenge / message (optional)"
        msgPh="Current hosting, release process, incidents, cost concerns, deadlines — whatever helps"
        nextSteps={["We review your platform and the challenge you described.", "We contact you to understand workloads and constraints.", "You get a recommended approach and next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you need?", label: "Project type", options: ["New cloud setup", "Cloud migration", "Infrastructure modernisation", "DevOps automation / CI/CD", "Cloud cost optimisation", "Monitoring & observability", "Cloud security", "AI infrastructure", "Maintenance & support"] },
          { k: "platform", t: "Platform", q: "Where does it run today?", label: "Current cloud / platform", multi: true, options: ["AWS", "Microsoft Azure", "Google Cloud", "On-premise / data centre", "Shared or VPS hosting", "Not sure"] },
          { k: "challenge", t: "Challenge", q: "What is the main infrastructure challenge?", label: "Infrastructure challenge", multi: true, options: ["Slow or risky releases", "Production incidents", "Rising cloud costs", "Poor visibility", "Scaling problems", "Security gaps", "Depends on one person"] },
        ]}
      />

      <V4_Rail
        id="cdo-rel-h2"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["API Development & Integration", "api-development-and-integration", "Connect cloud services and applications."],
          ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation running on solid infrastructure."],
          ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Data platforms in the cloud."],
          ["Software Testing & QA", "software-testing-and-qa", "Automated tests inside the pipeline."],
          ["Cybersecurity Services", "cybersecurity-services", "Cloud security reviews and hardening."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "Keep production applications healthy."],
          ["Custom Software Development", "custom-software-development", "Software designed for its environment."],
        ]}
      />
    </div>
  );
}

export { CDO_Page };
