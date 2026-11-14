/*
 * AI & Automation Solutions — /services/it-development/ai-and-automation-solutions (existing URL, unchanged)
 * Build 44 rethink: "Don't automate tasks. Redesign how work moves." Automation should remove friction, not judgement.
 * Signature visuals (prefix AIA_): intelligent business flow with a human-review branch, messy→intelligent workflow morph,
 * automation opportunity wheel, stacked automation slabs, capability scroller, operations queue board, AI/human handoff,
 * three-tier integration bus, document→data extraction, knowledge assistant, maturity slider, improvement loop.
 * No team block, no example engagement, no invented ROI, accuracy, savings, clients or proprietary models.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIn, ppIt, ppR } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Duo, V4_Hero, V4_Rail, V4_Statement, V4_Tags, V4_TechLine, v4Pick } from '../components/dm/v44kit.jsx';

const AIA_URL = "/services/it-development/ai-and-automation-solutions";
const AIA_TITLE = "AI & Automation Solutions for Business | Frequent Research";
const AIA_DESC = "AI & automation solutions that remove repetitive steps, connect CRM, ERP and documents, and keep people in control of the decisions that matter most to you.";
const AIA_FORM = "ai-project";

const AIA_FAQ = [
  ["What does Frequent Research provide under AI & Automation Solutions?", "Workflow automation, AI-assisted document and email processing, knowledge assistants, intelligent routing, system integration and the monitoring around them — designed around how your business actually works."],
  ["Which business processes can be automated with AI?", "Processes with repeatable steps and plenty of information to read, classify or route — such as invoices, enquiries, approvals, onboarding, ticket triage and reporting — are usually the strongest candidates."],
  ["Can you connect automation with our existing CRM or ERP?", "Yes. Automation is connected through APIs, webhooks or, where nothing else is possible, RPA, so the systems you already use keep working together."],
  ["Do we need to replace our existing software?", "Usually not. We connect, extend and automate around existing systems first, and recommend replacement only when there is a clear business case."],
  ["Can AI automation include human approval steps?", "Yes. Review, approval, override and escalation paths are designed in wherever a decision carries business risk."],
  ["Can you automate document and email processing?", "Yes. Documents and emails can be read, classified, extracted and validated, with uncertain cases routed to a person rather than guessed."],
  ["How do you decide whether a workflow needs AI or traditional automation?", "If the rules are clear, rules-based automation is simpler and cheaper; AI earns its place where information is unstructured, varied or needs interpretation."],
  ["Can you maintain and improve the automation after launch?", "Yes. Monitoring, exception reviews and regular improvements keep automations working as rules, data and integrations change."],
];

/* ── hero: intelligent business flow ─────────────────────────────────────────────────── */
const AIA_FLOW = [["Business event", "bolt"], ["Data captured", "database"], ["AI + rules", "spark"], ["Decision", "branch"], ["Automation", "zapflow"], ["Action", "check"]];
function AIA_Flow() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(14, v, 900, false);
  const i = t % 7;
  const human = t >= 7 && i >= 3; // every second run, the decision is routed to a person
  return (
    <figure ref={ref} className={"aia-flow" + (v ? " is-in" : "") + (human ? " is-human" : "")} aria-label="Intelligent business flow: a business event is captured as data, interpreted by AI and business rules, turned into a decision, automated and actioned — with uncertain decisions routed to human review.">
      <ol className="aia-flow__nodes">
        {AIA_FLOW.map(([n, ic], k) => (
          <li key={n} className={(k < i ? "is-done" : "") + (k === i ? " is-on" : "")} style={{ "--k": k }}>
            <span>
              <IX_I n={ic} s={18} />
            </span>
            <b>{n}</b>
          </li>
        ))}
      </ol>
      <div className="aia-flow__human" aria-hidden="true">
        <span>
          <IX_I n="user" s={16} />
        </span>
        <b>Human review</b>
        <small>{human ? "Low confidence — sent to a person" : "Only when needed"}</small>
      </div>
      <figcaption className="aia-flow__st">
        <span className={"v4-st " + (human ? "v4-st--warn" : "v4-st--ok")}>{human ? "Needs review" : i === 6 ? "Automated" : "Running"}</span>
      </figcaption>
    </figure>
  );
}

/* ── manual workflow → intelligent workflow (morph) ──────────────────────────────────── */
const AIA_MESS = [["Email", 8, 22], ["Spreadsheet", 54, 8], ["Manual checking", 30, 50], ["Copy / paste", 72, 40], ["Approval", 14, 76], ["Another system", 58, 72], ["Human follow-up", 84, 82]];
const AIA_NEAT = ["Trigger", "Data captured", "AI classification", "Business rule", "Automated action", "Exception to a person", "Dashboard / notification"];
function AIA_Morph() {
  const [ref, v] = ppIn(0.35);
  const [on, setOn] = ee.useState(false);
  const [touched, setTouched] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || touched) return;
    const t = setTimeout(() => setOn(true), ppR() ? 0 : 1600);
    return () => clearTimeout(t);
  }, [v, touched]);
  return (
    <div ref={ref} className={"aia-morph" + (on ? " is-on" : "")}>
      <div className="aia-morph__tg" role="group" aria-label="Workflow view">
        <button type="button" aria-pressed={!on} onClick={() => (setTouched(true), setOn(false))}>
          Before: manual
        </button>
        <button type="button" aria-pressed={on} onClick={() => (setTouched(true), setOn(true))}>
          After: intelligent
        </button>
      </div>
      <div className="aia-morph__stage">
        <svg className="aia-morph__mess" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          <path d="M12 26 C40 0 60 30 58 12 S20 60 34 54 76 20 76 44 10 60 18 80 70 50 62 76 90 60 88 86" />
        </svg>
        <i className="aia-morph__line" aria-hidden="true" />
        <ol aria-live="polite">
          {AIA_MESS.map(([m, x, y], k) => (
            <li key={m} style={{ "--x": x + "%", "--y": y + "%", "--k": k }} className={k === 5 ? "is-ex" : ""}>
              <span className="aia-morph__a">{m}</span>
              <span className="aia-morph__b">{AIA_NEAT[k]}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/* ── automation opportunity wheel ────────────────────────────────────────────────────── */
const AIA_WHEEL = [
  ["Capture", "inbox", ["Documents", "Emails", "Forms", "Files", "APIs", "System events"]],
  ["Understand", "eye", ["Classification", "Extraction", "Summarisation", "Validation", "Entity recognition"]],
  ["Decide", "branch", ["Business rules", "AI recommendations", "Prioritisation", "Routing", "Risk signals"]],
  ["Act", "bolt", ["Create records", "Send notifications", "Update systems", "Generate documents", "Assign tasks"]],
  ["Monitor", "gauge", ["Exceptions", "Failures", "SLA signals", "Costs", "Human intervention"]],
];
function aiaArc(k, n, r1, r2) {
  const a0 = (k / n) * 2 * Math.PI - Math.PI / 2 + 0.03,
    a1 = ((k + 1) / n) * 2 * Math.PI - Math.PI / 2 - 0.03;
  const p = (r, a) => [50 + r * Math.cos(a), 50 + r * Math.sin(a)].map((x) => x.toFixed(2)).join(" ");
  return `M${p(r2, a0)} A${r2} ${r2} 0 0 1 ${p(r2, a1)} L${p(r1, a1)} A${r1} ${r1} 0 0 0 ${p(r1, a0)} Z`;
}
function AIA_Wheel() {
  const [ref, v] = ppIn(0.3);
  const [i, pick] = v4Pick(AIA_WHEEL.length, v, 2600);
  const s = AIA_WHEEL[i];
  return (
    <div ref={ref} className={"aia-wheel" + (v ? " is-in" : "")}>
      <div className="aia-wheel__c">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {AIA_WHEEL.map(([t], k) => (
            <path key={t} d={aiaArc(k, AIA_WHEEL.length, 30, 48)} className={k === i ? "is-on" : ""} style={{ "--k": k }} />
          ))}
        </svg>
        <div className="aia-wheel__mid">
          <IX_I n={s[1]} s={22} />
          <b>{s[0]}</b>
        </div>
        {AIA_WHEEL.map(([t], k) => {
          const a = ((k + 0.5) / AIA_WHEEL.length) * 2 * Math.PI - Math.PI / 2;
          return (
            <button key={t} type="button" className={"aia-wheel__lbl" + (k === i ? " is-on" : "")} aria-pressed={k === i} style={{ left: 50 + 39 * Math.cos(a) + "%", top: 50 + 39 * Math.sin(a) + "%" }} onClick={() => pick(k)}>
              {t}
            </button>
          );
        })}
      </div>
      <ul className="aia-wheel__list" aria-live="polite" key={i}>
        {s[2].map((x, k) => (
          <li key={x} style={{ "--k": k }}>
            {x}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── the automation stack (slabs) ────────────────────────────────────────────────────── */
const AIA_STACK = [
  ["Data", "Documents, databases, APIs, events"],
  ["Intelligence", "Classification, extraction, prediction, recommendations"],
  ["Business logic", "Rules, permissions, approvals, policies"],
  ["Automation", "Workflow, orchestration, integrations, actions"],
  ["Experience", "Dashboards, applications, alerts, employee interfaces"],
  ["Governance", "Security, audit, monitoring, human oversight"],
];
function AIA_Slabs() {
  const [i, setI] = ee.useState(1);
  return (
    <ol className="aia-slabs">
      {AIA_STACK.map(([t, d], k) => (
        <li key={t} style={{ "--k": k }} className={k === i ? "is-on" : ""}>
          <button type="button" aria-expanded={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            <span className="v4-mono">{String(k + 1).padStart(2, "0")}</span>
            <b>{t}</b>
            <em>{d}</em>
          </button>
        </li>
      ))}
    </ol>
  );
}

/* ── where AI becomes useful: scroller ───────────────────────────────────────────────── */
const AIA_USES = [
  ["Intelligent document processing", "PDF invoice → supplier, amount, due date → approval route"],
  ["AI knowledge assistants", "Question → answer from your policies → source link"],
  ["Workflow decisions", "Request → priority + next action suggested"],
  ["Email processing", "Inbox → classified → correct workflow started"],
  ["Data extraction", "Unstructured file → structured record"],
  ["Predictive signals", "History → demand change or risk flagged"],
  ["Customer operations", "Case → suggested reply + relevant context"],
  ["Ticket & case routing", "Issue → right team, first time"],
  ["AI-assisted reporting", "Operational data → plain-language summary + alert"],
];
function AIA_Uses() {
  return (
    <ul className="aia-uses" tabIndex={0} aria-label="Practical AI capabilities (scroll horizontally)">
      {AIA_USES.map(([t, f], k) => (
        <li key={t}>
          <span className="aia-uses__n v4-mono">{String(k + 1).padStart(2, "0")}</span>
          <b>{t}</b>
          <code className="v4-mono">{f}</code>
        </li>
      ))}
    </ul>
  );
}

/* ── operations queue board (the intelligent operations layer) ───────────────────────── */
const AIA_COLS = [["Automated", "ok"], ["Monitoring", "info"], ["Needs review", "warn"], ["Human approval", "vio"], ["Exception", "bad"]];
const AIA_JOBS = ["Invoice #A", "Lead enquiry", "Refund request", "Contract PDF", "Support ticket", "Order update", "Onboarding form"];
function AIA_Board() {
  const [ref, v] = ppIn(0.25);
  const [t] = ixCycle(40, v, 1300, false);
  const col = (j) => {
    const s = (t + j * 3) % 10;
    return s < 4 ? 0 : s < 6 ? 1 : s < 7 ? 2 : s < 9 ? 3 : 4;
  };
  return (
    <div ref={ref} className={"aia-board" + (v ? " is-in" : "")}>
      <div className="aia-board__bar">
        <span className="v4-live" aria-hidden="true" /> Intelligent operations layer
        <span className="aia-board__h">Workflows · AI decisions · approvals · integrations</span>
      </div>
      <div className="aia-board__cols">
        {AIA_COLS.map(([c, st], ci) => (
          <div key={c} className="aia-board__col">
            <span className={"v4-st v4-st--" + st}>{c}</span>
            <ul>
              {AIA_JOBS.map((j, k) => (col(k) === ci ? <li key={j}>{j}</li> : null))}
            </ul>
          </div>
        ))}
      </div>
      <p className="aia-board__foot">States, not invented percentages: every item is either handled automatically, watched, or put in front of the right person.</p>
    </div>
  );
}

/* ── AI + human handoff ──────────────────────────────────────────────────────────────── */
function AIA_Handoff() {
  const [over, setOver] = ee.useState(false);
  const steps = [
    ["ai", "AI detects", "Unusual credit request"],
    ["ai", "AI recommends", "Approve with a lower limit"],
    ["hu", "Person reviews", "Context the model cannot see"],
    ["hu", over ? "Person overrides" : "Person approves", over ? "Escalates to finance" : "Confirms the recommendation"],
    ["sys", "System executes", over ? "Escalation task created" : "Limit applied in ERP"],
    ["sys", "Outcome feeds improvement", over ? "Override reason logged for the next model review" : "Decision logged for audit"],
  ];
  return (
    <div className={"aia-hand" + (over ? " is-over" : "")}>
      <div className="aia-hand__lanes" aria-hidden="true">
        <span>AI</span>
        <span>People</span>
        <span>Systems</span>
      </div>
      <ol>
        {steps.map(([l, t, d], k) => (
          <li key={k} className={"is-" + l} style={{ "--k": k }}>
            <b>{t}</b>
            <span>{d}</span>
          </li>
        ))}
      </ol>
      <div className="aia-hand__tg" role="group" aria-label="Reviewer decision">
        <button type="button" aria-pressed={!over} onClick={() => setOver(false)}>
          Reviewer approves
        </button>
        <button type="button" aria-pressed={over} onClick={() => setOver(true)}>
          Reviewer overrides
        </button>
      </div>
    </div>
  );
}

/* ── three-tier integration bus ──────────────────────────────────────────────────────── */
function AIA_Bus() {
  const [ref, v] = ppIn(0.3);
  const top = ["CRM", "ERP", "Website", "Mobile app", "Database", "Email", "Cloud", "APIs", "Documents", "Internal tools"];
  const bottom = ["Employees", "Customers", "Managers", "Systems"];
  return (
    <div ref={ref} className={"aia-bus" + (v ? " is-in" : "")}>
      <ul className="aia-bus__row">
        {top.map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ul>
      <div className="aia-bus__core">
        <b>Intelligent automation layer</b>
        <span>AI · Rules · Workflow engine</span>
      </div>
      <ul className="aia-bus__row aia-bus__row--b">
        {bottom.map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── document → workflow-ready data ──────────────────────────────────────────────────── */
const AIA_FIELDS = [["Supplier", "Matched to vendor record", 1], ["Invoice date", "Read from header", 1], ["PO reference", "Matched to open PO", 1], ["Amount", "Unclear scan", 0], ["Due date", "30 days", 1]];
function AIA_Doc() {
  const [ref, v] = ppIn(0.35);
  return (
    <div ref={ref} className={"aia-doc" + (v ? " is-in" : "")} role="img" aria-label="A scanned invoice with five highlighted fields. Four are extracted into a structured record automatically; the amount is unclear, so it is flagged for human review before the approval rule runs.">
      <div className="aia-doc__paper" aria-hidden="true">
        <i />
        <i />
        {AIA_FIELDS.map(([f], k) => (
          <span key={f} style={{ "--k": k }} className={"aia-doc__hl" + (AIA_FIELDS[k][2] ? "" : " is-low")} />
        ))}
        <i />
        <i />
      </div>
      <ol className="aia-doc__steps" aria-hidden="true">
        {["OCR / extraction", "Classification", "Validation", "AI interpretation", "Business rule", "Action"].map((s, k) => (
          <li key={s} style={{ "--k": k }}>
            {s}
          </li>
        ))}
      </ol>
      <table className="aia-doc__tbl" aria-hidden="true">
        <tbody>
          {AIA_FIELDS.map(([f, val, ok], k) => (
            <tr key={f} style={{ "--k": k }} className={ok ? "" : "is-low"}>
              <th>{f}</th>
              <td>{val}</td>
              <td>
                <span className={"v4-st " + (ok ? "v4-st--ok" : "v4-st--warn")}>{ok ? "Extracted" : "Human review"}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ── knowledge assistant ─────────────────────────────────────────────────────────────── */
function AIA_Ask() {
  const [ref, v] = ppIn(0.4);
  return (
    <div ref={ref} className={"aia-ask" + (v ? " is-in" : "")}>
      <div className="aia-ask__src" aria-label="Knowledge sources">
        {["Policies", "SOPs", "Knowledge base", "Contracts", "Internal systems"].map((s) => (
          <span key={s}>{s}</span>
        ))}
      </div>
      <div className="aia-ask__win">
        <p className="aia-ask__q">
          <IX_I n="user" s={14} /> Can a customer on the annual plan get a pro-rated refund?
        </p>
        <div className="aia-ask__a">
          <p>Yes, within the first 30 days of renewal, pro-rated to the unused months. After 30 days, refunds need a manager's approval.</p>
          <div className="aia-ask__meta">
            <span>Source: Refund policy · section 4</span>
            <span>Next action: start refund request</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── maturity slider ─────────────────────────────────────────────────────────────────── */
const AIA_MAT = [
  ["Manual", "People move information between systems."],
  ["Connected", "Systems exchange information directly."],
  ["Automated", "Rules trigger repeatable actions."],
  ["Intelligent", "AI assists classification, prediction and decision support."],
  ["Adaptive", "The system keeps surfacing exceptions, patterns and improvement opportunities."],
];
function AIA_Maturity() {
  const [i, setI] = ee.useState(2);
  return (
    <div className="aia-mat" style={{ "--p": i / (AIA_MAT.length - 1) }}>
      <label htmlFor="aia-mat-r" className="pp-sr">
        Automation maturity stage
      </label>
      <input id="aia-mat-r" type="range" min="0" max={AIA_MAT.length - 1} step="1" value={i} onChange={(e) => setI(+e.target.value)} aria-valuetext={AIA_MAT[i][0]} />
      <ol className="aia-mat__ticks" aria-hidden="true">
        {AIA_MAT.map(([t], k) => (
          <li key={t} className={k <= i ? "is-on" : ""}>
            <button type="button" tabIndex={-1} onClick={() => setI(k)}>
              {t}
            </button>
          </li>
        ))}
      </ol>
      <p className="aia-mat__say" aria-live="polite">
        <span className="v4-mono">Stage {String(i + 1).padStart(2, "0")}</span> <b>{AIA_MAT[i][0]}.</b> {AIA_MAT[i][1]}
      </p>
    </div>
  );
}

/* ── improvement loop ────────────────────────────────────────────────────────────────── */
function AIA_Loop() {
  const L = ["Automation creates data", "Data creates visibility", "Visibility creates insight", "Insight improves decisions", "Decisions improve workflows", "Better workflows, better automation"];
  return (
    <ol className="aia-loop">
      {L.map((t, k) => (
        <li key={t} style={{ "--k": k }}>
          {t}
        </li>
      ))}
    </ol>
  );
}

function AIA_Page() {
  usePageMeta("AI & Automation Solutions", AIA_DESC);
  dmMeta(AIA_URL, AIA_TITLE, AIA_DESC);
  ixSchema("aia", {
    url: AIA_URL,
    crumb: "AI & Automation Solutions",
    name: "AI & Automation Solutions",
    serviceType: "AI and business process automation",
    schemaDesc:
      "AI & automation solutions: business process and workflow automation, AI-assisted document and email processing, knowledge assistants, intelligent routing and decision support, RPA for legacy systems, CRM and ERP integration, human-in-the-loop approvals, monitoring and governance, and continuous improvement after launch.",
    faq: AIA_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p aia-svc">
      <V4_Hero
        id="aia-h1"
        crumb="AI & Automation Solutions"
        variant="dark"
        kicker="AI & Automation Solutions"
        h1="Turn Business Friction Into Intelligent Automation."
        lead="Frequent Research designs AI & automation solutions around how work actually moves through your business — removing repetitive steps, connecting the systems you already use and keeping people in control of the decisions that matter."
        cta={["Identify My Automation Opportunities", AIA_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["See a workflow transform", "aia-morph-h"]}
        points={["Automate repetitive work", "Connect disconnected systems", "Surface better decisions", "Keep humans in control"]}
      >
        <AIA_Flow />
      </V4_Hero>

      <IX_Sec id="aia-morph-h" tone="light" k="The first question" t="Your business doesn't need more AI. It needs fewer unnecessary steps." s="When people spend hours moving information between inboxes, spreadsheets and systems, the problem is not a lack of software — it is the friction between them.">
        <AIA_Morph />
      </IX_Sec>

      <V4_Statement id="aia-say-h" tone="navy" kicker="Our approach" text="Don't automate tasks. Redesign how work moves." accent="how work moves" sub="We follow every workflow from trigger to outcome and ask what should happen automatically, what still needs judgement, where information gets stuck and what must stay under human control." chips={["Trigger", "Data", "Decision", "Action", "Exception", "Human review", "Outcome"]} />

      <IX_Sec id="aia-map-h" tone="off" k="What we actually automate" t="An automation opportunity map — not a list of tools." s="Choose a stage to see where automation and AI can take work off people's desks." center>
        <AIA_Wheel />
      </IX_Sec>

      <IX_Sec id="aia-diff-h" tone="light" k="Why Frequent Research is different" t="AI that works inside the business, not beside it.">
        <V4_Duo
          items={[
            ["Start with the friction", "Start with “where can we use AI?”", "Where is the business losing time, visibility, consistency or decision quality? The intervention follows."],
            ["AI and software engineering together", "AI as a stand-alone feature", "Applications, databases, APIs, CRM, ERP, authentication and dashboards designed around the AI."],
            ["Human-in-the-loop by design", "Every decision automated", "People review, approve, override, escalate and correct — and the system learns from exceptions."],
            ["Automation that evolves", "Brittle one-off scripts", "Built to change as rules, data, models, integrations and teams change."],
            ["Visible operations", "Silent automations", "Monitoring, exceptions and human review make hidden risk visible."],
            ["Your technology, your control", "Lock-in", "Source code, workflows, integrations, documentation and credentials stay with you."],
          ]}
        />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-stack-h" tone="dark" k="AI is not the whole automation stack" t="Six layers make automation dependable. AI is one of them." s="Select a layer.">
        <AIA_Slabs />
      </IX_Sec>

      <IX_Sec id="aia-use-h" tone="light" k="Where AI becomes useful" t="Practical AI, described by what goes in and what comes out." s="Scroll the capabilities. No proprietary model claims — we use established AI services and build the software around them.">
        <AIA_Uses />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-ops-h" tone="ink" k="The intelligent operations layer" t="See what is automated, what is waiting and what needs a person." wide>
        <AIA_Board />
      </IX_Sec>

      <IX_Sec id="aia-hand-h" tone="off" k="Human + AI" t="The best automation is not AI versus people. It is AI with the right people." s="Switch the reviewer's decision and follow what the system does next.">
        <AIA_Handoff />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-bus-h" tone="light" k="Connected systems" t="Automation should connect the business, not create another island." s={<>Integration runs through APIs and webhooks first; see <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration</PpL>.</>}>
        <AIA_Bus />
        <p className="aia-rpa">
          <b>Where does RPA fit?</b> Robotic process automation is useful when deterministic, repetitive steps still depend on legacy or hard-to-integrate systems. We combine RPA with APIs, AI and business rules rather than treating it as the answer to every problem.
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="aia-doc-h" tone="off" k="Document intelligence" t="Turn unstructured information into workflow-ready data." s="Invoices, purchase orders, contracts, forms, applications, emails and reports. Extraction is never assumed to be perfect — uncertain fields go to a person.">
        <AIA_Doc />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-ask-h" tone="light" k="AI knowledge assistants" t="Put business knowledge where people need it." s="Answers grounded in your own documents, with the source and the next action — less time searching, not fewer people.">
        <AIA_Ask />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-mat-h" tone="off" k="Automation maturity" t="From manual hand-offs to adaptive operations." s="Drag the slider to see each stage.">
        <AIA_Maturity />
      </IX_Sec>

      <IX_Sec id="aia-val-h" tone="dark" k="Business value" t="What changes when the workflow gets smarter.">
        <ul className="aia-val">
          {[
            ["Less manual work", "Fewer repetitive operational steps."],
            ["Faster response", "Information and actions move without waiting."],
            ["Better visibility", "Know what is happening without chasing updates."],
            ["Fewer handoffs", "Less movement between people and systems."],
            ["Better consistency", "Repeatable rules, applied reliably."],
            ["Smarter decisions", "Useful information at the point of action."],
            ["Easier scaling", "More capacity without more manual steps."],
            ["Controlled automation", "Approvals and judgement stay where they belong."],
          ].map(([t, d], k) => (
            <li key={t} style={{ "--k": k }}>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
        <AIA_Loop />
      </IX_Sec>

      <IX_Sec lv={3} id="aia-gov-h" tone="light" k="Responsible AI & governance" t="Automation with an audit trail.">
        <div className="aia-gov">
          {["Human oversight", "Access control", "Data protection", "Permission management", "Logging & auditability", "Exception handling", "Output validation", "Secure integrations", "Clear ownership"].map((t) => (
            <span key={t}>
              <IX_I n="check" s={14} /> {t}
            </span>
          ))}
        </div>
        <p className="ix-note">
          We do not claim certifications for AI systems. Useful references: <PpX href="https://www.nist.gov/itl/ai-risk-management-framework">NIST AI Risk Management Framework</PpX>.
        </p>
        <V4_TechLine
          groups={[
            ["AI / data", ["Python", "AI/ML APIs", "Document intelligence", "Data processing"]],
            ["Applications", ["React", "Next.js", "Node.js", "PHP / Laravel"]],
            ["Mobile", ["Flutter", "React Native"]],
            ["Cloud", ["AWS", "Azure", "Google Cloud"]],
            ["Integration", ["REST APIs", "Webhooks", "System integrations", "RPA where needed"]],
          ]}
        />
        <p className="aia-proc" aria-label="How an engagement runs">
          {["Identify friction", "Map the workflow", "Find automation opportunities", "Choose AI where it adds value", "Connect systems", "Automate with controls", "Measure and improve"].map((t, k) => (
            <span key={t}>
              <em className="v4-mono">{k + 1}</em>
              {t}
            </span>
          ))}
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="aia-ind-h" tone="off" k="Industries" t="Potential applications by sector." s="Where these patterns tend to apply — not claims about specific clients.">
        <V4_Tags
          items={[
            ["Financial Services", "coin", "Onboarding, document checks, case routing", "financial-services"],
            ["Healthcare", "cross", "Scheduling, forms, knowledge access", "healthcare"],
            ["Manufacturing", "factory", "Orders, procurement, quality records", "manufacturing"],
            ["Retail", "cart", "Order exceptions, returns, customer queries", "retail"],
            ["Real Estate", "home", "Leads, documents, approvals", "real-estate"],
            ["Education", "book", "Admissions, enquiries, approvals", "education"],
            ["Government", "landmark", "Applications, correspondence, records", "government"],
            ["Information Technology", "cpu", "Ticket triage, onboarding, reporting", "it"],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="aia-faq"
        title="AI & automation: common questions"
        items={AIA_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("crm-development")}>CRM</PpL> and <PpL to={ppIt("erp-development")}>ERP development</PpL>, <PpL to={ppIt("data-analytics-and-dashboard-development")}>data analytics &amp; dashboards</PpL>, <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL> and <PpL to={ppIt("it-consulting")}>IT consulting</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/ai-automation-solutions-guide" title="AI and Automation for Businesses: Practical Uses That Save Time and Improve Decisions" text="Choosing the right workflows and keeping people in control." />

      <V4_Close
        id="aia-close-h"
        variant="light"
        kicker="Map my business workflow"
        title="Find the work your business should stop doing manually."
        text="Share the workflow, the systems involved or the operational problem. We'll show where automation or AI creates real value — and where it doesn't."
        cta={["Discuss Your Automation Opportunity", AIA_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Workflow mapped from trigger to outcome", "AI only where it earns its place", "Human approval points defined", "Systems and integrations identified"]}
      />

      <DM_Form
        id={AIA_FORM}
        kicker="IT project consultation"
        title="Identify My Automation Opportunities"
        sub="A few short questions about the workflow and the systems involved help us suggest where to start."
        type="AI & Automation Enquiry"
        service="AI & Automation Solutions"
        icon="spark"
        submitLabel="Discuss My Automation Project"
        successTitle="Thank you. Your AI & automation request has been sent."
        siteLabel="Existing website or application (optional)"
        msgLabel="What would you like to automate? (optional)"
        msgPh="The current challenge, the steps people repeat, volumes, systems involved — whatever helps"
        nextSteps={["We review the workflow and systems you described.", "We contact you to map the process end to end.", "You get the automation opportunities we would start with."]}
        chips={[
          { k: "need", t: "Need", q: "What do you need?", label: "Your need", options: ["AI automation", "Workflow automation", "AI document processing", "AI assistant", "System integration", "RPA", "Process automation", "AI analytics", "Custom automation", "Other"] },
          { k: "systems", t: "Systems", q: "Which systems are involved?", label: "Existing systems", multi: true, options: ["CRM", "ERP", "Accounting software", "Website", "Mobile app", "Internal software", "Cloud platform", "Database", "Email / documents", "Other"] },
          { k: "challenge", t: "Challenge", q: "What is the main challenge?", label: "Current business challenge", multi: true, options: ["Too much manual data entry", "Slow approvals", "Information stuck in documents or email", "Disconnected systems", "No visibility of work in progress", "Inconsistent decisions"] },
        ]}
      />

      <V4_Rail
        id="aia-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["API Development & Integration", "api-development-and-integration", "The connections automation runs on."],
          ["Custom Software Development", "custom-software-development", "Applications built around the workflow."],
          ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Visibility from automation data."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Infrastructure for AI workloads."],
          ["Software Testing & QA", "software-testing-and-qa", "Testing automations and AI outputs."],
          ["Cybersecurity Services", "cybersecurity-services", "Secure access for automated systems."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "Keep automations healthy after launch."],
        ]}
      />
    </div>
  );
}

export { AIA_Page };
