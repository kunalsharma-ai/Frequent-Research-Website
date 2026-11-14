/*
 * Application Maintenance & Support — /services/it-development/application-maintenance-and-support (existing URL;
 * the brief's "/application-maintenance-support" would be a URL change, so the established slug is kept).
 * Build 44 rethink: "Software isn't finished when it goes live. That's when its real operational life begins."
 * An application continuity and improvement partner — between support and modernisation.
 * Signature visuals (prefix AMS_): living application architecture, health-decline curve with recovery, after-go-live
 * metro line, continuity orbit, fix-and-close loop vs diagnose-and-prevent, care-map folders, AI diagnostic console,
 * health equaliser, rotating "Protect" statement, modernisation path finder, severity framework.
 * Severity levels are a framework agreed per contract — no invented response times, uptime or 24/7 claims.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Rail, V4_Tags, V4_TechLine, v4Pick } from '../components/dm/v44kit.jsx';

const AMS_URL = "/services/it-development/application-maintenance-and-support";
const AMS_TITLE = "Application Maintenance & Support | Frequent Research";
const AMS_DESC = "Application maintenance and support that fixes root causes, keeps software secure and performant, and modernises ageing systems without rebuilding everything.";
const AMS_FORM = "app-support";

const AMS_FAQ = [
  ["What does application maintenance and support include?", "Corrective, preventive, adaptive and perfective maintenance: incident investigation and fixes, dependency and security updates, performance improvement, enhancements, monitoring and planned modernisation."],
  ["Why does an application need maintenance after launch?", "Users, data, integrations, browsers, operating systems and threats keep changing; without maintenance, small issues accumulate into technical debt and disruption."],
  ["Can you support an application built by another company?", "Yes. We start with an application health review — code, architecture, dependencies, documentation and environments — before taking responsibility."],
  ["Can you maintain legacy applications?", "Yes. Old technology isn't automatically bad technology; we assess business value and technical condition before recommending to maintain, improve, modernise or replace."],
  ["Can maintenance include new features?", "Yes. Enhancements and workflow improvements are planned and tested so they don't destabilise what already works."],
  ["Can you modernise an application instead of rebuilding it?", "Often, yes — through refactoring, framework upgrades, API modernisation or re-platforming, chosen by business case rather than by default."],
  ["Do you offer AI-assisted monitoring and support?", "Yes — AI-assisted incident classification, log pattern detection and knowledge assistance, with engineers validating anything that touches a business-critical system."],
  ["Can you work alongside our internal IT team?", "Yes. Hybrid support adds engineering capacity or specialist skills to your team without replacing it."],
];

/* ── hero: living application ────────────────────────────────────────────────────────── */
const AMS_NODES = [["Frontend", 18, 20, "layout"], ["APIs", 50, 12, "api"], ["Integrations", 82, 20, "link"], ["Database", 18, 80, "database"], ["Cloud", 50, 88, "cloud"], ["Monitoring", 82, 80, "eye"]];
function AMS_Living() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(24, v, 700, false);
  const sick = Math.floor(t / 8) % 3 === 1 ? 1 : Math.floor(t / 8) % 3 === 2 ? 3 : -1;
  const ph = t % 8; // 0-2 warning, 3-4 intervention, 5-7 healthy
  const bad = sick >= 0 && ph < 3;
  const fix = sick >= 0 && (ph === 3 || ph === 4);
  return (
    <figure ref={ref} className={"ams-live" + (v ? " is-in" : "")} aria-label="A living application: frontend, APIs, integrations, database, cloud and monitoring connected around the application core; when a warning appears on one component, Frequent Research investigates and restores it to healthy.">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {AMS_NODES.map(([n, x, y]) => (
          <line key={n} x1="50" y1="50" x2={x} y2={y} className="ams-live__l" />
        ))}
      </svg>
      <div className="ams-live__core">
        <b>Your application</b>
        <span className={"v4-st " + (bad ? "v4-st--warn" : fix ? "v4-st--info" : "v4-st--ok")}>{bad ? "Warning" : fix ? "Engineer on it" : "Healthy"}</span>
      </div>
      {AMS_NODES.map(([n, x, y, ic], k) => (
        <div key={n} className={"ams-live__n" + (k === sick && bad ? " is-bad" : k === sick && fix ? " is-fix" : "")} style={{ left: x + "%", top: y + "%", "--k": k }}>
          <IX_I n={ic} s={18} />
          <b>{n}</b>
        </div>
      ))}
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <i key={k} className="ams-live__p" style={{ "--x": AMS_NODES[k][1] + "%", "--y": AMS_NODES[k][2] + "%", "--k": k }} aria-hidden="true" />
      ))}
    </figure>
  );
}

/* ── health decline and recovery ─────────────────────────────────────────────────────── */
function AMS_Decay() {
  const [care, setCare] = ee.useState(false);
  const L = ["Slow pages", "Recurring bugs", "Outdated dependencies", "Manual workarounds", "Integration failures", "Security gaps", "Technical debt", "User frustration", "Business disruption"];
  return (
    <div className={"ams-decay" + (care ? " is-care" : "")}>
      <svg viewBox="0 0 900 260" aria-hidden="true">
        <defs>
          <linearGradient id="ams-g" x1="0" x2="1">
            <stop offset="0" stopColor="#159A6B" />
            <stop offset=".55" stopColor="#D98A0B" />
            <stop offset="1" stopColor="#D9434B" />
          </linearGradient>
        </defs>
        <path className="ams-decay__bad" d="M0 40 C 120 44, 200 60, 300 90 S 520 150, 620 180 S 820 230, 900 240" />
        <path className="ams-decay__good" d="M0 40 C 120 44, 200 60, 300 86 S 420 70, 520 58 S 760 46, 900 40" />
      </svg>
      <ol className="ams-decay__l">
        {L.map((x, k) => (
          <li key={x} style={{ "--k": k }}>
            {x}
          </li>
        ))}
      </ol>
      <p className="ams-decay__model" aria-live="polite">
        {care ? (
          <>
            <b>Monitor → Detect → Diagnose → Fix → Improve → Modernise.</b> Health recovers and stays there.
          </>
        ) : (
          <>
            <b>Reactive maintenance:</b> each issue is small; together they become business disruption.
          </>
        )}
      </p>
      <div className="aia-hand__tg" role="group" aria-label="Maintenance model">
        <button type="button" aria-pressed={!care} onClick={() => setCare(false)}>
          Reactive only
        </button>
        <button type="button" aria-pressed={care} onClick={() => setCare(true)}>
          Continuous care
        </button>
      </div>
    </div>
  );
}

/* ── after go-live metro line ────────────────────────────────────────────────────────── */
const AMS_LIFE = [["Build", "Application created"], ["Launch", "Users begin using it"], ["Learn", "Real-world behaviour appears"], ["Adapt", "Requirements change"], ["Optimise", "Performance and usability improve"], ["Modernise", "Architecture evolves"], ["Extend", "New capabilities are introduced"]];
function AMS_Metro() {
  const [ref, v] = ppIn(0.3);
  return (
    <ol ref={ref} className={"ams-metro" + (v ? " is-in" : "")} tabIndex={0} aria-label="Application lifecycle after go-live">
      {AMS_LIFE.map(([t, d], k) => (
        <li key={t} style={{ "--k": k }} className={k === 1 ? "is-live" : ""}>
          <span className="ams-metro__st" aria-hidden="true" />
          <b>{t}</b>
          <em>{d}</em>
        </li>
      ))}
    </ol>
  );
}

/* ── continuity orbit ────────────────────────────────────────────────────────────────── */
const AMS_LOOP = [
  ["Observe", "Health, errors, performance and usage signals.", "Problems noticed late.", "Early warning."],
  ["Understand", "Dependencies, usage patterns and business impact.", "Blind changes to production.", "Informed decisions."],
  ["Stabilise", "Critical defects and recurring incidents resolved.", "Repeated disruption.", "A dependable baseline."],
  ["Optimise", "Speed, reliability and resource efficiency.", "Slow, costly software.", "Faster, leaner applications."],
  ["Secure", "Dependencies, configuration and practices kept under review.", "Ageing components become exposure.", "Lower risk."],
  ["Automate", "Repetitive operational tasks reduced.", "Engineers stuck on routine work.", "Time for improvement."],
  ["Enhance", "Features added without destabilising the application.", "Change that breaks things.", "Safe evolution."],
  ["Modernise", "Ageing components replaced strategically.", "Big-bang rebuilds.", "A longer useful life."],
];
function AMS_Orbit() {
  const [ref, v] = ppIn(0.25);
  const [i, pick] = v4Pick(AMS_LOOP.length, v, 2400);
  const l = AMS_LOOP[i];
  return (
    <div ref={ref} className={"ams-orb" + (v ? " is-in" : "")}>
      <div className="ams-orb__sys">
        <i className="ams-orb__path" aria-hidden="true" />
        <i className="ams-orb__pulse" aria-hidden="true" style={{ "--a": i * 45 + "deg" }} />
        <b className="ams-orb__core">Application</b>
        {AMS_LOOP.map(([t], k) => {
          const a = (k / AMS_LOOP.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <button key={t} type="button" className={"ams-orb__n" + (k === i ? " is-on" : "")} aria-pressed={k === i} style={{ left: 50 + 44 * Math.cos(a) + "%", top: 50 + 40 * Math.sin(a) + "%" }} onClick={() => pick(k)}>
              {t}
            </button>
          );
        })}
      </div>
      <dl className="ams-orb__d" aria-live="polite" key={i}>
        <div>
          <dt>What we do</dt>
          <dd>{l[1]}</dd>
        </div>
        <div>
          <dt>Problem addressed</dt>
          <dd>{l[2]}</dd>
        </div>
        <div>
          <dt>Value to you</dt>
          <dd>{l[3]}</dd>
        </div>
      </dl>
    </div>
  );
}

/* ── fix & close vs diagnose & prevent ───────────────────────────────────────────────── */
function AMS_Root() {
  const [ref, v] = ppIn(0.3);
  return (
    <div ref={ref} className={"ams-root" + (v ? " is-in" : "")}>
      <div className="ams-root__l">
        <small>Fix &amp; close</small>
        <div className="ams-root__loop" aria-hidden="true">
          {["Ticket", "Quick fix", "Close", "Problem returns"].map((x, k) => (
            <span key={x} style={{ "--k": k }}>
              {x}
            </span>
          ))}
          <i className="ams-root__bug" />
        </div>
        <p>Ticket volume becomes the measure. The same bug keeps coming back.</p>
      </div>
      <div className="ams-root__r">
        <small>Diagnose &amp; prevent</small>
        <ol>
          {["Signal", "Impact assessment", "Root cause", "Permanent correction", "Monitoring", "Prevention"].map((x, k) => (
            <li key={x} style={{ "--k": k }}>
              {x}
            </li>
          ))}
        </ol>
        <p>Fewer recurring incidents, healthier systems, safer releases.</p>
      </div>
    </div>
  );
}

/* ── care map folders ────────────────────────────────────────────────────────────────── */
const AMS_CARE = [
  ["Corrective", "Fix what is broken", ["Bug fixing", "Defect resolution", "Production issue investigation", "Regression fixes", "Incident resolution"]],
  ["Preventive", "Stop the next problem", ["Dependency updates", "Technical debt reduction", "Code quality improvement", "Performance monitoring", "Security hygiene", "Infrastructure checks"]],
  ["Adaptive", "Keep up with change", ["OS and browser compatibility", "API changes", "Third-party service changes", "Cloud environment changes", "Platform updates"]],
  ["Perfective", "Make it better", ["UX improvements", "Feature enhancements", "Performance improvements", "Workflow optimisation", "Reporting improvements"]],
  ["Modernisation", "Evolve the architecture", ["Legacy application assessment", "Framework upgrades", "API modernisation", "Cloud migration support", "Modularisation and refactoring"]],
  ["Support", "Run it day to day", ["Incident management", "Application monitoring", "Root-cause analysis", "Release support", "User-impact assessment"]],
];
function AMS_Care() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="ams-care">
      <div className="ams-care__tabs" role="tablist" aria-label="Application care map">
        {AMS_CARE.map(([t], k) => (
          <button key={t} type="button" role="tab" id={"ams-care-t" + k} aria-selected={k === i} aria-controls="ams-care-p" tabIndex={k === i ? 0 : -1} onClick={() => setI(k)} style={{ "--k": k }}>
            {t}
          </button>
        ))}
      </div>
      <div className="ams-care__p" role="tabpanel" id="ams-care-p" aria-labelledby={"ams-care-t" + i} style={{ "--k": i }}>
        <b>{AMS_CARE[i][1]}</b>
        <ul>
          {AMS_CARE[i][2].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ── AI diagnostic console ───────────────────────────────────────────────────────────── */
const AMS_DIAG = [
  ["logs", "12:04:31 WARN  order-service  timeout calling inventory-api (2.8s)"],
  ["logs", "12:04:33 WARN  order-service  timeout calling inventory-api (3.1s)"],
  ["pattern", "Pattern detected: timeouts cluster after each nightly stock import"],
  ["anomaly", "Anomaly: inventory-api latency outside its usual range since Tuesday"],
  ["cause", "Suggested cause: missing index on stock_movements after last release"],
  ["review", "Engineer review: confirmed on staging, migration prepared"],
  ["done", "Resolution: index added, latency back to normal, alert threshold tuned"],
];
function AMS_Console() {
  const [ref, v] = ppIn(0.3);
  const [t] = ixCycle(AMS_DIAG.length + 3, v, 1100, false);
  const n = Math.min(t + 1, AMS_DIAG.length);
  return (
    <div ref={ref} className="ams-con" aria-label="AI-assisted diagnostic console: application logs show repeated timeouts; AI detects a pattern and an anomaly and suggests a probable cause; an engineer reviews and confirms; the issue is resolved.">
      <div className="ams-con__bar">
        <i />
        <i />
        <i />
        <span>diagnostics · AI-assisted, engineer-validated</span>
      </div>
      <ol className="v4-mono">
        {AMS_DIAG.slice(0, n).map(([k, l]) => (
          <li key={l} className={"is-" + k}>
            <span>{k}</span> {l}
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── health equaliser ────────────────────────────────────────────────────────────────── */
const AMS_HEALTH = [
  ["Reliability", 1, "How consistently the application behaves."],
  ["Performance", 0, "How efficiently users and systems interact with it."],
  ["Security", 2, "How well application risks are managed."],
  ["Maintainability", 1, "How easily engineers can safely change it."],
  ["Scalability", 0, "How well it handles future demand."],
  ["Observability", 1, "How clearly teams can see what is happening."],
  ["Technical debt", 2, "How much accumulated complexity slows change."],
];
const AMS_LV = [["Healthy", "ok"], ["Watch", "info"], ["Attention", "warn"], ["Critical", "bad"]];
function AMS_Eq() {
  const [i, setI] = ee.useState(2);
  return (
    <div className="ams-eq">
      <ul className="ams-eq__bars">
        {AMS_HEALTH.map(([t, lv], k) => (
          <li key={t}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)} className={"is-" + AMS_LV[lv][1]}>
              <span className="ams-eq__col" aria-hidden="true">
                {[3, 2, 1, 0].map((x) => (
                  <i key={x} className={x <= 3 - lv ? "is-on" : ""} />
                ))}
              </span>
              <b>{t}</b>
              <small>{AMS_LV[lv][0]}</small>
            </button>
          </li>
        ))}
      </ul>
      <p className="ams-eq__d" aria-live="polite">
        <b>{AMS_HEALTH[i][0]}:</b> {AMS_HEALTH[i][2]} <span className={"v4-st v4-st--" + AMS_LV[AMS_HEALTH[i][1]][1]}>{AMS_LV[AMS_HEALTH[i][1]][0]}</span>
      </p>
      <p className="ix-note">An application health view of the kind clients can monitor — levels, not invented percentages.</p>
    </div>
  );
}

/* ── rotating Protect statement ──────────────────────────────────────────────────────── */
const AMS_PROT = [
  ["Revenue", "Less disruption to business-critical applications."],
  ["Productivity", "Less friction from slow or unreliable systems."],
  ["Technology investment", "A longer useful life where modernising beats replacing."],
  ["User experience", "Issues fixed before customers, staff and partners feel them."],
  ["Future development", "Less technical debt making every change expensive."],
  ["Business agility", "Applications that keep adapting as requirements evolve."],
];
function AMS_Protect() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(AMS_PROT.length, v, 2200);
  return (
    <div ref={ref} className="ams-prot">
      <p className="ams-prot__big" aria-live="polite">
        Protect <span key={i}>{AMS_PROT[i][0]}.</span>
      </p>
      <p className="ams-prot__s">{AMS_PROT[i][1]}</p>
      <div className="ams-prot__dots" role="group" aria-label="What maintenance protects">
        {AMS_PROT.map(([t], k) => (
          <button key={t} type="button" aria-pressed={k === i} onClick={() => pick(k)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ── modernisation path finder ───────────────────────────────────────────────────────── */
const AMS_QS = [
  ["Is the application stable and fit for purpose?", "Maintain", null],
  ["Is the internal structure making changes slow or risky?", "Refactor", null],
  ["Is the technology platform becoming unsupported?", "Re-platform", null],
  ["Is the architecture itself limiting growth?", "Re-architect", null],
  ["Is replacement economically justified?", "Replace", "Keep improving what you have"],
];
const AMS_OUT = {
  Maintain: "Stable and fit for purpose: keep it healthy with preventive care.",
  Refactor: "Improve the internal architecture without changing what users see.",
  "Re-platform": "Move to a more suitable framework, runtime or cloud environment.",
  "Re-architect": "Change the underlying structure — modules, services, data — in planned stages.",
  Replace: "Move to a new application when continued maintenance no longer makes sense.",
  "Keep improving what you have": "Replacement isn't justified yet: modernise in steps and revisit later.",
};
function AMS_Path() {
  const [q, setQ] = ee.useState(0);
  const [res, setRes] = ee.useState(null);
  const answer = (yes) => {
    const [, y, last] = AMS_QS[q];
    if (yes) setRes(y);
    else if (q === AMS_QS.length - 1) setRes(last);
    else setQ(q + 1);
  };
  return (
    <div className="ams-path">
      <ol className="ams-path__trail" aria-hidden="true">
        {AMS_QS.map(([, y], k) => (
          <li key={y} className={res === y ? "is-res" : k < q ? "is-no" : k === q && !res ? "is-on" : ""}>
            {y}
          </li>
        ))}
      </ol>
      {!res ? (
        <div className="ams-path__q" aria-live="polite">
          <small>
            Question {q + 1} of {AMS_QS.length}
          </small>
          <b>{AMS_QS[q][0]}</b>
          <div>
            <button type="button" className="btn pp-btn" onClick={() => answer(true)}>
              Yes
            </button>
            <button type="button" className="btn v4-btn-line" onClick={() => answer(false)}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div className="ams-path__q ams-path__q--res" aria-live="polite">
          <small>Likely direction</small>
          <b>{res}</b>
          <p>{AMS_OUT[res]}</p>
          <button type="button" className="ix-replay" onClick={() => (setRes(null), setQ(0))}>
            Start again
          </button>
        </div>
      )}
    </div>
  );
}

function AMS_Page() {
  usePageMeta("Application Maintenance & Support", AMS_DESC);
  dmMeta(AMS_URL, AMS_TITLE, AMS_DESC);
  ixSchema("ams", {
    url: AMS_URL,
    crumb: "Application Maintenance & Support",
    name: "Application Maintenance & Support",
    serviceType: "Application maintenance and support",
    schemaDesc:
      "Application maintenance and support: corrective, preventive, adaptive and perfective maintenance, incident management and root-cause analysis, application monitoring, dependency and security updates, performance optimisation, enhancements, legacy application support, modernisation (refactor, re-platform, re-architect) and AI-assisted diagnostics, with reactive, proactive, hybrid and managed support models.",
    faq: AMS_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p ams-svc">
      <V4_Hero
        id="ams-h1"
        crumb="Application Maintenance & Support"
        variant="split"
        kicker="Application Maintenance & Support · Continuity and improvement"
        h1="Keep Your Software Running. Keep Your Business Moving."
        lead="Application maintenance & support from Frequent Research goes beyond bug fixes: monitoring, root-cause fixes, security hygiene, performance work and planned modernisation for the software your business already depends on."
        cta={["Assess My Application", AMS_FORM]}
        cta2={["Request Application Support", AMS_FORM]}
        points={["Root cause over repeat fixes", "AI-assisted diagnostics", "Modernise without rebuilding", "Support for apps built elsewhere"]}
        cls="ams-hero"
      >
        <AMS_Living />
      </V4_Hero>

      <IX_Sec id="ams-dec-h" tone="light" k="Why applications degrade" t="Most applications don't fail overnight." s="They accumulate small problems. Switch the model to see the difference.">
        <AMS_Decay />
      </IX_Sec>

      <IX_Sec lv={3} id="ams-life-h" tone="off" k="After go-live" t="Go-live is not the finish line." s="We support the entire operational life of the application — not just the release date.">
        <AMS_Metro />
      </IX_Sec>

      <IX_Sec id="ams-orb-h" tone="dark" k="The application continuity loop" t="Maintain today. Modernise tomorrow." s="Select a stage to see what we do, the problem it addresses and the value it creates.">
        <AMS_Orbit />
      </IX_Sec>

      <IX_Sec id="ams-root-h" tone="light" k="Root cause over repeated fixes" t="If the same bug keeps coming back, it isn't a support success.">
        <AMS_Root />
      </IX_Sec>

      <IX_Sec id="ams-care-h" tone="off" k="Application care map" t="Application maintenance that goes beyond bug fixes.">
        <AMS_Care />
      </IX_Sec>

      <IX_Sec id="ams-ai-h" tone="light" k="AI-assisted application support" t="AI can make support smarter. It shouldn't make support careless." s="Incident classification, log pattern detection, knowledge assistance, early-warning signals and automation of repetitive requests — with engineers validating every change to business-critical systems.">
        <AMS_Console />
      </IX_Sec>

      <IX_Sec lv={3} id="ams-eq-h" tone="off" k="Application health framework" t="Seven dimensions of a healthy application.">
        <AMS_Eq />
      </IX_Sec>

      <IX_Sec lv={3} id="ams-prot-h" tone="dark" k="Business value" t="Maintenance should protect more than software.">
        <AMS_Protect />
      </IX_Sec>

      <IX_Sec id="ams-mod-h" tone="light" k="Modernisation without rebuilding everything" t="Modernisation doesn't always mean starting again." s="Answer a few questions to see the likely direction. The right answer is not always rebuild.">
        <AMS_Path />
        <div className="ams-legacy">
          <b>Old technology isn't automatically bad technology.</b>
          <p>Some legacy applications are stable, valuable and deeply embedded in operations. We weigh business criticality, technical condition, integration complexity, security, maintainability, operational dependency and future requirements — then recommend <em>maintain</em>, <em>improve</em>, <em>modernise</em> or <em>replace</em>.</p>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="ams-sup-h" tone="off" k="Support models & severity" t="Not every incident deserves the same response.">
        <div className="ams-sup">
          <ul className="ams-sev">
            {[
              ["Critical", "Business-critical outage", "Immediate attention"],
              ["High", "Major functionality affected", "Priority response"],
              ["Medium", "Limited business impact", "Planned resolution"],
              ["Low", "Minor defect or enhancement", "Scheduled improvement"],
            ].map(([t, d, r]) => (
              <li key={t} className={"ams-sev--" + t.toLowerCase()}>
                <b>{t}</b>
                <span>{d}</span>
                <em>{r}</em>
              </li>
            ))}
            <li className="ams-sev__n">Severity framework; response commitments are agreed per contract.</li>
          </ul>
          <dl className="ams-models">
            {[
              ["Reactive support", "Issue resolution when problems occur."],
              ["Proactive application care", "Monitoring and preventive maintenance."],
              ["Continuous improvement", "Regular, planned enhancements."],
              ["Modernisation support", "Structured evolution of ageing applications."],
              ["Managed application support", "A dedicated external application support capability."],
              ["Hybrid support", "Extra engineering capacity or specialist skills beside your IT team."],
            ].map(([t, d]) => (
              <div key={t}>
                <dt>{t}</dt>
                <dd>{d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="ams-tech-h" tone="light" k="Applications & technology we support" t="Web, mobile, SaaS and the business systems in between.">
        <p className="ams-apps">
          {["Web applications", "Mobile applications", "SaaS platforms", "CRM systems", "ERP applications", "Customer portals", "Employee portals", "Business dashboards", "Workflow applications", "API-driven platforms", "Custom business applications", "E-commerce platforms"].map((x) => (
            <span key={x}>{x}</span>
          ))}
        </p>
        <V4_TechLine
          groups={[
            ["Front end", ["React", "Next.js"]],
            ["Back end", ["Node.js", "PHP / Laravel", "Python"]],
            ["Mobile", ["Flutter", "React Native"]],
            ["Cloud", ["AWS", "Azure", "Google Cloud"]],
            ["Integration & data", ["REST APIs", "Third-party integrations", "Databases", "Dashboards"]],
            ["AI", ["AI-assisted diagnostics", "Automation"]],
          ]}
          note="No official partnership or certification is implied."
        />
        <V4_Tags
          items={[
            ["Healthcare", "cross", "Availability, integrations, workflows and security", "healthcare"],
            ["Manufacturing", "factory", "Operational applications and production workflows", "manufacturing"],
            ["Financial Services", "coin", "Business-critical systems, integration and reliability", "financial-services"],
            ["Retail", "cart", "Customer-facing apps, commerce and back-end workflows", "retail"],
          ]}
          note="Common application challenges by sector — not claims about specific clients."
        />
      </IX_Sec>

      <DM_Faq
        id="ams-faq"
        title="Application maintenance & support: common questions"
        items={AMS_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("custom-software-development")}>custom software</PpL>, <PpL to={ppIt("web-application-development")}>web applications</PpL>, <PpL to={ppIt("mobile-app-development")}>mobile apps</PpL>, <PpL to={ppIt("saas-development")}>SaaS</PpL> and <PpL to={ppIt("it-consulting")}>IT consulting</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/application-maintenance-support-guide" title="Application Maintenance and Support: Keeping Business Software Reliable as It Grows" text="What good maintenance covers and how to plan modernisation." />

      <V4_Close
        id="ams-close-h"
        variant="light"
        kicker="Talk to an application specialist"
        title="Your application is already an investment. Keep it working like one."
        text="Tell us what the application does, what keeps going wrong and where it needs to go next. We'll recommend the right support model and the first improvements."
        cta={["Assess My Application", AMS_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Application health review", "Recurring issues traced to root cause", "Security and dependency hygiene", "A modernisation path, if needed"]}
      />

      <DM_Form
        id={AMS_FORM}
        kicker="IT project consultation"
        title="Request Application Support"
        sub="A few short questions about your application and what you need."
        type="Application Maintenance Enquiry"
        service="Application Maintenance & Support"
        icon="refresh"
        submitLabel="Discuss My Application"
        successTitle="Thank you. Your application support request has been sent."
        siteLabel="Application or website URL (optional)"
        msgLabel="What is happening with the application? (optional)"
        msgPh="Technology, who built it, recurring issues, planned changes — whatever helps"
        nextSteps={["We review the application and challenge you described.", "We contact you to understand its architecture and priorities.", "You get a recommended support model and next step."]}
        chips={[
          { k: "need", t: "Need", q: "What do you need?", label: "Support need", options: ["Ongoing maintenance", "Bug fixing & incident support", "Performance improvement", "Security & dependency updates", "Feature enhancements", "Legacy application support", "Modernisation", "Hybrid support for our team"] },
          { k: "app", t: "Application", q: "What kind of application?", label: "Application type", multi: true, options: ["Web application", "Mobile app", "SaaS platform", "CRM / ERP", "Customer or employee portal", "Dashboard", "E-commerce platform", "Other"] },
          { k: "challenge", t: "Challenge", q: "What is the main challenge?", label: "Main challenge", multi: true, options: ["Recurring bugs", "Slow performance", "Outdated dependencies", "Built by another team", "No documentation", "Hard to add features", "Security concerns"] },
        ]}
      />

      <V4_Rail
        id="ams-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["Website Maintenance & Support", "website-maintenance-and-support", "Care for marketing websites."],
          ["Software Testing & QA", "software-testing-and-qa", "Regression testing after every fix."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Monitoring and reliable releases."],
          ["Cybersecurity Services", "cybersecurity-services", "Security reviews and hardening."],
          ["API Development & Integration", "api-development-and-integration", "Fix fragile integrations."],
          ["Custom Software Development", "custom-software-development", "When it is time to rebuild."],
          ["IT Consulting", "it-consulting", "Decide maintain, modernise or replace."],
        ]}
      />
    </div>
  );
}

export { AMS_Page };
