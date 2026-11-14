/*
 * UI/UX Design — /services/it-development/ui-ux-design (URL unchanged; previously the generic service template)
 * Build 42 rethink: "Good design doesn't decorate complexity. It removes it." / "We design the path, not just the screen."
 * Page-specific visuals (prefix UXD_): complexity → clarity hero, friction diagnostic, Human + AI interface,
 * enterprise before/after slider, design-system playground, data → signal, responsive priorities, accessibility controls, UX audit map.
 * No case studies, team details, example boxes, invented numbers, awards, partnerships or certifications.
 * No market-research positioning — this is an IT & Development page.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppGo, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Band, IX_Chain, IX_Final, IX_Guide, IX_Hero, IX_I, IX_Industries, IX_Matrix, IX_Motto, IX_Related, IX_Sec, IX_Stack, IX_Timeline, IX_Why, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';

const UXD_URL = "/services/it-development/ui-ux-design";
const UXD_TITLE = "UI/UX Design for Complex Products | Frequent Research";
const UXD_DESC = "UI/UX design that makes complex products feel simple: workflow-driven UX, design systems, data-heavy and AI interfaces, built to be engineered and to scale.";
const UXD_FORM = "uxd-project";

const UXD_FAQ = [
  ["What does your UI/UX Design service include?", "UX strategy, user journeys, information architecture, wireframes, prototypes, UI design, design systems, accessibility and developer handoff — scoped to the product and the problem."],
  ["What is the difference between UI and UX design?", "UX design shapes how a product works — the path, structure and interactions that help people reach a goal; UI design shapes how it looks and feels on screen. Good products need both working together."],
  ["Can you redesign an existing website or application?", "Yes. We usually start with a UX review to find where users struggle, then redesign the paths, structure and interface that matter most."],
  ["Can you design UX for complex business software?", "Yes — dashboards, ERP and CRM interfaces, admin tools, approval systems and other information-heavy products, designed around roles, priorities and real tasks."],
  ["Do you design mobile applications?", "Yes — iOS, Android and cross-platform experiences designed for the context of use, not simply a shrunken desktop layout."],
  ["Can you design AI-powered product experiences?", "Yes — assistants, AI search, recommendations and human-in-the-loop workflows designed for transparency, control and useful outcomes."],
  ["Do you provide design systems and developer handoff?", "Yes. Component libraries, tokens, patterns and documentation are delivered so developers can build consistently and the product can grow."],
  ["Can you work with our existing development team?", "Yes. Design can be handed to your developers with specifications and support, or carried through development, QA and enhancement by Frequent Research."],
];

/* ── Hero visual: complexity → clarity ──────────────────────────────────────────────── */
const UXD_PH = ["Complexity", "Structure", "Hierarchy", "Interaction", "Clarity"];
function UXD_Clarity() {
  const [ref, v] = ppIn(0.05);
  const [user, setUser] = ee.useState(false);
  const [p, setP] = ixCycle(UXD_PH.length, v, 1900, user);
  const frags = [
    ["bell", "3 alerts"],
    ["doc", "Form · 14 fields"],
    ["grid", "Table · 22 columns"],
    ["flag", "Warning"],
    ["queue", "Menu"],
    ["mail", "Notification"],
    ["database", "Raw data"],
    ["check", "Action?"],
  ];
  return (
    <figure ref={ref} className={"uxd-cl uxd-cl--p" + p + (v ? " is-in" : "")} aria-label="An interface moves from complexity to clarity: scattered alerts, forms, tables and menus become a structured screen with one clear next action.">
      <div className="uxd-cl__stage">
        <div className="uxd-cl__frags" aria-hidden="true">
          {frags.map(([ic, t], k) => (
            <span key={t} className="uxd-cl__f" style={{ "--k": k }}>
              <IX_I n={ic} s={13} />
              {t}
            </span>
          ))}
        </div>
        <div className="uxd-cl__screen" aria-hidden="true">
          <div className="uxd-cl__nav">
            <i />
            <i />
            <i />
          </div>
          <div className="uxd-cl__main">
            <b className="uxd-cl__h">Approve supplier invoice</b>
            <span className="uxd-cl__meta">Matched to order · ready for review</span>
            <div className="uxd-cl__rows">
              <i />
              <i />
              <i />
            </div>
            <div className="uxd-cl__cta">
              <em>Approve</em>
              <em className="g">Ask a question</em>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="uxd-cl__steps" role="group" aria-label="Design stages">
        {UXD_PH.map((t, k) => (
          <button
            key={t}
            type="button"
            className={k === p ? "is-on" : k < p ? "is-done" : ""}
            aria-pressed={k === p}
            onClick={() => {
              setUser(true);
              setP(k);
            }}
          >
            {t}
          </button>
        ))}
      </figcaption>
    </figure>
  );
}

/* ── Friction diagnostic: symptom → real cause ───────────────────────────────────────── */
function UXD_Diag({ items }) {
  const [o, setO] = ee.useState(-1);
  return (
    <ul className="uxd-dg">
      {items.map(([s, c, ic], k) => (
        <li key={s} style={{ "--k": k }}>
          <button type="button" className={o === k ? "is-on" : ""} aria-expanded={o === k} onClick={() => setO(o === k ? -1 : k)} onMouseEnter={() => setO(k)} onMouseLeave={() => setO(-1)}>
            <span className="uxd-dg__s">
              <IX_I n={ic} s={16} />
              {s}
            </span>
            <span className="uxd-dg__c">
              <small>Real cause</small>
              {c}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ── Human + AI interface ────────────────────────────────────────────────────────────── */
function UXD_HumanAI() {
  const [ref, v] = ppIn(0.3);
  const [s] = ixCycle(4, v, 1600, false);
  const [act, setAct] = ee.useState("");
  const loop = ["AI assists", "Human evaluates", "Human decides", "System acts"];
  return (
    <div ref={ref} className={"uxd-ha" + (v ? " is-in" : "")}>
      <div className="uxd-ha__model">
        <div className="uxd-ha__row uxd-ha__row--h">
          <b>Human</b>
          {["Intent", "Context", "Judgement", "Decision", "Approval"].map((x, k) => (
            <span key={x} style={{ "--k": k }}>
              {x}
            </span>
          ))}
        </div>
        <div className="uxd-ha__mid" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="uxd-ha__row uxd-ha__row--a">
          <b>AI</b>
          {["Suggestion", "Summary", "Prediction", "Classification", "Recommendation"].map((x, k) => (
            <span key={x} style={{ "--k": k }}>
              {x}
            </span>
          ))}
        </div>
        <ol className="uxd-ha__loop">
          {loop.map((x, k) => (
            <li key={x} className={k === s ? "is-on" : ""}>
              {x}
            </li>
          ))}
        </ol>
      </div>
      <div className="uxd-ha__card">
        <small>
          <IX_I n="spark" s={13} /> AI-assisted suggestion
        </small>
        <b>Prioritise the three overdue supplier queries first.</b>
        <p>They block month-end close. Based on open tickets and invoice status you can access.</p>
        <span className="uxd-ha__src">
          <IX_I n="doc" s={12} /> Sources shown · Limitations stated
        </span>
        <div className="uxd-ha__btns" role="group" aria-label="Respond to the suggestion">
          {["Accept", "Edit", "Reject"].map((x) => (
            <button key={x} type="button" aria-pressed={act === x} className={act === x ? "is-on" : ""} onClick={() => setAct(x)}>
              {x}
            </button>
          ))}
        </div>
        <p className="uxd-ha__res" aria-live="polite">
          {act === "Accept" ? "Applied — and logged so the decision can be reviewed." : act === "Edit" ? "Opened for editing before anything changes." : act === "Reject" ? "Dismissed. Your feedback improves future suggestions." : "The person stays in control of what happens next."}
        </p>
      </div>
    </div>
  );
}

/* ── Enterprise before / after slider ────────────────────────────────────────────────── */
function UXD_Before() {
  const [x, setX] = ee.useState(52);
  return (
    <div className="uxd-ba" style={{ "--x": x + "%" }}>
      <div className="uxd-ba__pane uxd-ba__pane--before" aria-hidden="true">
        <div className="uxd-ba__bar">
          {Array.from({ length: 9 }, (_, k) => (
            <em key={k} />
          ))}
        </div>
        <div className="uxd-ba__alerts">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="uxd-ba__table">
          {Array.from({ length: 8 }, (_, r) => (
            <div key={r}>
              {Array.from({ length: 9 }, (_, c) => (
                <i key={c} />
              ))}
            </div>
          ))}
        </div>
        <span className="uxd-ba__tag">Before</span>
      </div>
      <div className="uxd-ba__pane uxd-ba__pane--after" aria-hidden="true">
        <div className="uxd-ba__sum">
          <span>
            <b>Needs your attention</b>
            <em className="hot">2 approvals</em>
          </span>
          <span>
            <b>On track</b>
            <em>Everything else</em>
          </span>
        </div>
        <div className="uxd-ba__list">
          {["Approve purchase request", "Review delayed shipment", "Confirm supplier change"].map((t, k) => (
            <div key={t} style={{ "--k": k }}>
              <i className={"ix-dot ix-dot--" + (k ? "warn" : "hot")} />
              <span>{t}</span>
              <em>{k ? "Review" : "Approve"}</em>
            </div>
          ))}
        </div>
        <span className="uxd-ba__tag uxd-ba__tag--a">After</span>
      </div>
      <i className="uxd-ba__handle" aria-hidden="true" />
      <label className="pp-sr" htmlFor="uxd-ba-r">
        Compare the cluttered screen with the redesigned screen
      </label>
      <input id="uxd-ba-r" className="uxd-ba__range" type="range" min="5" max="95" value={x} onChange={(e) => setX(+e.target.value)} />
    </div>
  );
}

/* ── Jobs to be done ─────────────────────────────────────────────────────────────────── */
function UXD_Jobs({ jobs }) {
  const [j, setJ] = ee.useState(0);
  const cur = jobs[j];
  return (
    <div className="uxd-jb">
      <div className="uxd-jb__tabs" role="group" aria-label="Choose a task">
        {jobs.map((x, k) => (
          <button key={x[0]} type="button" aria-pressed={j === k} className={j === k ? "is-on" : ""} onClick={() => setJ(k)}>
            <IX_I n={x[1]} s={15} />
            {x[0]}
          </button>
        ))}
      </div>
      <ol className="uxd-jb__flow" key={j} aria-live="polite">
        {[
          ["Intent", "target", cur[2]],
          ["Friction", "flag", cur[3]],
          ["Better UX", "wand", cur[4]],
          ["Outcome", "check", cur[5]],
        ].map(([t, ic, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <span className="uxd-jb__ic">
              <IX_I n={ic} s={17} />
            </span>
            <small>{t}</small>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Design-system playground ───────────────────────────────────────────────────────── */
const UXD_ACC = [
  ["Royal", "#0B22A8"],
  ["Teal", "#0E9C88"],
  ["Coral", "#D9454F"],
  ["Violet", "#5B3CC4"],
];
function UXD_DS() {
  const [a, setA] = ee.useState(0);
  const [dense, setDense] = ee.useState(false);
  const [radius, setRadius] = ee.useState(1);
  return (
    <div className={"uxd-ds" + (dense ? " is-dense" : "")} style={{ "--acc": UXD_ACC[a][1], "--rad": [4, 12, 20][radius] + "px" }}>
      <div className="uxd-ds__tokens">
        <div className="uxd-ds__group">
          <small>Colour token</small>
          <div className="uxd-ds__sw" role="group" aria-label="Accent colour">
            {UXD_ACC.map(([n, c], k) => (
              <button key={n} type="button" aria-pressed={a === k} aria-label={n} className={a === k ? "is-on" : ""} style={{ background: c }} onClick={() => setA(k)} />
            ))}
          </div>
        </div>
        <div className="uxd-ds__group">
          <small>Radius token</small>
          <div className="uxd-ds__seg" role="group" aria-label="Corner radius">
            {["Sharp", "Soft", "Round"].map((n, k) => (
              <button key={n} type="button" aria-pressed={radius === k} className={radius === k ? "is-on" : ""} onClick={() => setRadius(k)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="uxd-ds__group">
          <small>Density</small>
          <div className="uxd-ds__seg" role="group" aria-label="Density">
            {["Comfortable", "Compact"].map((n, k) => (
              <button key={n} type="button" aria-pressed={dense === !!k} className={dense === !!k ? "is-on" : ""} onClick={() => setDense(!!k)}>
                {n}
              </button>
            ))}
          </div>
        </div>
        <ul className="uxd-ds__atoms" aria-label="Components in the system">
          {["Typography", "Colour", "Spacing", "Buttons", "Forms", "Navigation", "Tables", "Cards", "Alerts", "Modals", "Charts", "States"].map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="uxd-ds__screen" aria-label="A screen assembled from the design system — change a token and every component follows">
        <div className="uxd-ds__top">
          <b>Orders</b>
          <span className="uxd-ds__btn">New order</span>
        </div>
        <div className="uxd-ds__alert">
          <IX_I n="bell" s={14} /> Two orders need a delivery date.
        </div>
        <div className="uxd-ds__field">
          <small>Search</small>
          <span>Customer, order or product</span>
        </div>
        <div className="uxd-ds__rows">
          {["Order · awaiting dispatch", "Order · ready to invoice", "Order · on hold"].map((t, k) => (
            <div key={t}>
              <span>{t}</span>
              <em className={k === 2 ? "w" : ""}>{k === 2 ? "Review" : "Open"}</em>
            </div>
          ))}
        </div>
        <div className="uxd-ds__chart" aria-hidden="true">
          {[40, 70, 55, 85, 60, 75].map((h, k) => (
            <i key={k} style={{ height: h + "%" }} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Data → signal ───────────────────────────────────────────────────────────────────── */
function UXD_Signal() {
  const [ref, v] = ppIn(0.3);
  const hot = [7, 23, 41];
  return (
    <div ref={ref} className={"uxd-sg" + (v ? " is-in" : "")}>
      <div className="uxd-sg__noise" aria-hidden="true">
        {Array.from({ length: 56 }, (_, k) => (
          <i key={k} className={hot.includes(k) ? "is-hot" : ""} style={{ "--k": k }} />
        ))}
      </div>
      <ol className="uxd-sg__steps">
        {[
          ["Signal", "What matters?", "eye"],
          ["Priority", "What changed?", "flag"],
          ["Action", "What needs attention?", "bell"],
          ["Decision", "What should I do next?", "check"],
        ].map(([t, q, ic], k) => (
          <li key={t} style={{ "--k": k }}>
            <span className="uxd-sg__ic">
              <IX_I n={ic} s={16} />
            </span>
            <b>{t}</b>
            <span>{q}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ── Responsive priorities ───────────────────────────────────────────────────────────── */
function UXD_Devices() {
  const [d, setD] = ee.useState(0);
  const names = ["Desktop", "Tablet", "Mobile"];
  const notes = ["Full context: navigation, filters, detail and comparison side by side.", "Focused panels: list and detail, touch-friendly targets, fewer simultaneous controls.", "One job at a time: the next action first, thumb-reachable, readable and quick."];
  return (
    <div className="uxd-dv">
      <div className="uxd-dv__tabs" role="group" aria-label="Choose a device">
        {names.map((n, k) => (
          <button key={n} type="button" aria-pressed={d === k} className={d === k ? "is-on" : ""} onClick={() => setD(k)}>
            <IX_I n={["layout", "grid", "phone"][k]} s={15} />
            {n}
          </button>
        ))}
      </div>
      <div className={"uxd-dv__frame uxd-dv__frame--" + d} aria-hidden="true">
        <div className="uxd-dv__side">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="uxd-dv__list">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="uxd-dv__detail">
          <b />
          <i />
          <i />
          <em>Next action</em>
        </div>
      </div>
      <p className="uxd-dv__note" aria-live="polite">
        <b>{names[d]}:</b> {notes[d]}
      </p>
    </div>
  );
}

/* ── Accessibility controls ──────────────────────────────────────────────────────────── */
const UXD_A11Y = [
  ["contrast", "High contrast", "contrast"],
  ["large", "Larger text", "type"],
  ["focus", "Visible focus", "focus"],
  ["errors", "Clear form errors", "flag"],
  ["calm", "Reduced motion", "eyeoff"],
];
function UXD_A11y() {
  const [on, setOn] = ee.useState({ focus: true, errors: true });
  const cls = Object.keys(on)
    .filter((k) => on[k])
    .map((k) => " is-" + k)
    .join("");
  return (
    <div className="uxd-ay">
      <ul className="uxd-ay__sw">
        {UXD_A11Y.map(([k, t, ic]) => (
          <li key={k}>
            <button type="button" role="switch" aria-checked={!!on[k]} onClick={() => setOn((x) => ({ ...x, [k]: !x[k] }))}>
              <IX_I n={ic} s={16} />
              <span>{t}</span>
              <i aria-hidden="true" />
            </button>
          </li>
        ))}
      </ul>
      <div className={"uxd-ay__pv" + cls} aria-hidden="true">
        <b>Request a callback</b>
        <span className="uxd-ay__lbl">Work email</span>
        <span className="uxd-ay__in uxd-ay__in--bad">name@company</span>
        <span className="uxd-ay__err">Enter a complete email address, like name@company.com</span>
        <span className="uxd-ay__lbl">Preferred time</span>
        <span className="uxd-ay__in">Tomorrow morning</span>
        <span className="uxd-ay__btn">Send request</span>
      </div>
    </div>
  );
}

/* ── UX audit map ───────────────────────────────────────────────────────────────────── */
function UXD_Audit({ areas, formId }) {
  const [a, setA] = ee.useState(0);
  return (
    <div className="uxd-au">
      <ul className="uxd-au__ring" role="group" aria-label="Diagnostic areas">
        {areas.map(([t, ic], k) => (
          <li key={t} style={{ "--a": (k * 360) / areas.length + "deg" }}>
            <button type="button" aria-pressed={a === k} className={a === k ? "is-on" : ""} onClick={() => setA(k)} onMouseEnter={() => setA(k)}>
              <IX_I n={ic} s={16} />
              <span>{t}</span>
            </button>
          </li>
        ))}
        <li className="uxd-au__core" aria-hidden="true">
          <IX_I n="search2" s={22} />
          <b>Your product</b>
        </li>
      </ul>
      <div className="uxd-au__d" aria-live="polite">
        <small>Diagnostic question</small>
        <b>{areas[a][2]}</b>
        <p>{areas[a][3]}</p>
        <a href={"#" + formId} onClick={ppGo(formId)} className="btn pp-btn">
          Request a UX Review <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function UXD_Page() {
  usePageMeta("UI/UX Design", UXD_DESC);
  dmMeta(UXD_URL, UXD_TITLE, UXD_DESC);
  ixSchema("uxd", {
    url: UXD_URL,
    crumb: "UI/UX Design",
    name: "UI/UX Design",
    serviceType: "UI/UX design",
    schemaDesc:
      "UI/UX design for complex digital products: UX strategy, user journeys, information architecture, interaction design, UI design for web, SaaS, enterprise and mobile applications, dashboard and data UX, AI product experiences with human control, design systems, accessibility, UX audits and developer handoff aligned with engineering.",
    faq: UXD_FAQ,
  });
  return (
    <div className="pp sm dk ix-page uxd-svc">
      <IX_Hero
        id="uxd-h1"
        crumb="UI/UX Design"
        kicker="UI/UX Design · Product thinking + engineering reality"
        h1="UI/UX Design That Makes Complex Digital Products Feel Simple"
        lead="Frequent Research combines product thinking, UX strategy, interface design, AI-aware experiences and engineering understanding to create products that are easier to navigate, easier to operate and easier to scale."
        cta={["Design My Product", UXD_FORM]}
        cta2={["Discuss My UX Challenge", UXD_FORM]}
        cta3={["Explore our design approach", "uxd-path-h"]}
        points={["Workflow before wireframe", "Design systems that scale", "AI that people trust", "Ready to engineer"]}
      >
        <UXD_Clarity />
      </IX_Hero>

      <IX_Band tone="off" micro={["Clarity over decoration", "Fewer decisions, better decisions", "Design for real products"]} text="Good design doesn't decorate complexity. It removes it." />

      <IX_Sec id="uxd-prob-h" tone="light" k="The real UX problem" t="Most interface problems aren't visual problems." s="Hover or tap a symptom to see the cause behind it. We solve the reason behind the friction — not just the appearance of it.">
        <UXD_Diag
          items={[
            ["Users can't find what they need", "Information architecture problem", "search2"],
            ["Users don't know what to do next", "Interaction problem", "help"],
            ["Users abandon complicated forms", "Flow problem", "doc"],
            ["Teams rely on training to use the software", "Usability problem", "book"],
            ["Every screen looks different", "Design-system problem", "grid"],
            ["AI gives answers users don't trust", "AI interaction problem", "spark"],
            ["Managers can't understand the dashboard", "Information-design problem", "bars"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-path-h" tone="dark" k="Our philosophy" t="We design the path, not just the screen." s="Every interface answers six questions. Select a step.">
        <IX_Timeline
          id="uxd-tl1"
          stages={[
            ["Goal", "What does the user need to accomplish?", "target"],
            ["Context", "What does the user already know — and where are they?", "compass"],
            ["Decision", "What information do they need to decide?", "help"],
            ["Action", "What should they do next, and is it obvious?", "cursor"],
            ["Feedback", "How does the system respond and confirm?", "bell"],
            ["Outcome", "Did they accomplish the goal, without help?", "check"],
          ]}
          note="Understand the user. Clarify the workflow. Structure the information. Design the interaction. Make intelligence understandable."
        />
      </IX_Sec>

      <IX_Sec id="uxd-sys-h" tone="off" k="UX as a business system" t="Design for real business work." s="UI/UX shouldn't sit at the end of development. It should shape how the product itself is structured.">
        <IX_Chain
          items={[
            ["Business objective", "target"],
            ["User need", "user"],
            ["Workflow", "shuffle"],
            ["Information architecture", "branch"],
            ["Interaction", "cursor"],
            ["Visual language", "palette"],
            ["Technology", "code"],
            ["Business outcome", "trend"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-what-h" tone="light" k="What we design" t="An experience architecture — not a list of wireframes." s="What we design → the problem it solves → why it matters.">
        <IX_Matrix
          id="uxd-mx"
          cats={[
            { t: "Digital products", icon: "box", problem: "Features grow faster than the experience can hold them.", value: "A product structure that stays clear as capability grows.", items: [["SaaS platforms", "Onboarding, core workflow and settings that people can find."], "Web applications", "Mobile applications", ["Enterprise applications", "Role-based priorities instead of every option on every screen."], "Customer portals", "Employee portals"] },
            { t: "Business interfaces", icon: "sliders", problem: "Operational tools assume people will learn their way around.", value: "Interfaces that follow the job, so training is the exception.", items: [["Dashboards", "Built around decisions, not every available number."], ["Workflow applications", "Each step clear, with status and ownership."], "Admin platforms", "Operational systems", "Reporting interfaces"] },
            { t: "Customer experiences", icon: "user", problem: "Customers drop out of journeys that feel uncertain.", value: "Clear paths that build confidence from first visit to repeat use.", items: ["Websites", ["Product journeys", "Each step explains what happens next."], ["Onboarding", "The first useful moment, reached quickly."], "Account areas", "Self-service experiences"] },
            { t: "Mobile experiences", icon: "phone", problem: "Desktop layouts squeezed onto small screens.", value: "Experiences designed for the moment of use.", items: ["iOS", "Android", "Cross-platform apps", ["Responsive experiences", "Priorities that change with the device, not just the width."]] },
            { t: "Complex data", icon: "bars", problem: "Dense tables and charts hide what matters.", value: "From data to signal to action.", items: ["Dashboards", "Analytics", ["Tables", "Sorting, density and actions designed for real volumes."], ["Filters & search", "Find the record in seconds."], "Reporting", "Information-heavy interfaces"] },
            { t: "AI experiences", icon: "spark", problem: "An AI button that nobody trusts or understands.", value: "AI woven into the task, with transparency and control.", items: ["AI assistants", "Conversational interfaces", ["AI search", "Answers with sources and limits made clear."], "Recommendations", "Intelligent workflows", ["Human-in-the-loop interfaces", "Review, edit, accept or reject before anything happens."]] },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-ai-h" tone="ink" k="AI-powered UX" t="Designing for AI is not the same as adding an AI button." s="The future of UX isn't less interface. It's better interface intelligence.">
        <UXD_HumanAI />
        <ul className="uxd-aip">
          {[
            ["AI transparency", "eye", "Users know when AI is involved."],
            ["Human control", "hand", "Review, modify, accept or reject."],
            ["Confidence & context", "compass", "Relevance and limitations made clear."],
            ["Conversational interfaces", "chat", "Where conversation genuinely helps the task."],
            ["AI-assisted workflows", "shuffle", "Inside the workflow, not a separate tool."],
            ["Intelligent recommendations", "spark", "Helpful, never overwhelming."],
            ["Explainable feedback", "doc", "Sources and reasoning where appropriate."],
            ["Error & uncertainty states", "flag", "Designed for when AI is unsure or wrong."],
          ].map(([t, ic, d], k) => (
            <li key={t} style={{ "--k": k }}>
              <IX_I n={ic} s={16} />
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </IX_Sec>

      <IX_Sec id="uxd-ent-h" tone="light" k="UX for complex business software" t="Enterprise software doesn't have to feel like enterprise software." s="Drag the handle: dense tables, scattered alerts and twenty actions become role-based priorities, progressive disclosure and clear next steps — for ERP, CRM, dashboards, internal tools and approval systems.">
        <UXD_Before />
      </IX_Sec>

      <IX_Sec id="uxd-job-h" tone="off" k="Design for the job to be done" t="Start with the task, not the screen." s="Choose a task to see how better UX removes the friction.">
        <UXD_Jobs
          jobs={[
            ["Approve a request", "check", "Decide quickly with the right context.", "Details spread across email, attachments and another system.", "Everything needed to decide on one screen, with the decision as the primary action.", "Faster, more confident approvals."],
            ["Find a customer", "search2", "Get to the right record immediately.", "Search that only works with exact names.", "Forgiving search across names, emails, companies and recent activity.", "Seconds instead of minutes."],
            ["Review an exception", "flag", "Understand what went wrong and fix it.", "An error code without an explanation.", "A plain-language reason, the likely fix and who to ask.", "Exceptions resolved, not escalated."],
            ["Create an order", "cart", "Complete it correctly the first time.", "Long forms asking for information the system already has.", "Smart defaults, inline validation and only the fields that matter.", "Fewer errors and corrections."],
            ["Understand performance", "bars", "Know if things are on track.", "A wall of charts with no hierarchy.", "Headline status first, detail on demand, change highlighted.", "Clear answers for managers."],
            ["Upload a document", "doc", "Submit it and move on.", "Unclear formats and silent failures.", "Clear requirements, progress and confirmation.", "Fewer support requests."],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-ds-h" tone="light" k="Design systems" t="One product. One visual language. Room to grow." s="Change a token — every component follows. A design system is not a library of pretty components; it is the operating language of a digital product.">
        <UXD_DS />
      </IX_Sec>

      <IX_Sec id="uxd-data-h" tone="dark" k="Designing for data" t="More data doesn't automatically create more clarity." s="Dashboard design, KPI hierarchy, visualisation, tables, filtering, drill-downs and alerts — designed to answer four questions.">
        <UXD_Signal />
      </IX_Sec>

      <IX_Sec id="uxd-flow-h" tone="off" k="UX for workflows" t="Good UX removes friction at every step of a workflow." s="Approvals, onboarding, employee requests, document workflows, order processing and service requests.">
        <IX_Chain
          items={[
            ["Start", "play", "Obvious entry point"],
            ["Input", "type", "Only what's needed"],
            ["Validation", "check", "Inline, helpful"],
            ["Decision", "compass", "Context visible"],
            ["Approval", "users", "Right person, notified"],
            ["Action", "bolt", "One clear step"],
            ["Confirmation", "bell", "Status, not silence"],
            ["Completion", "target", "Done — and recorded"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-mob-h" tone="light" k="Mobile UX" t="Designed for context, not just screen size." s="Thumb-friendly interaction, simplified navigation, focused actions, offline and permission states where relevant.">
        <UXD_Devices />
      </IX_Sec>

      <IX_Sec id="uxd-a11y-h" tone="off" k="Accessibility as product quality" t="Accessible design isn't a compliance checkbox. It's better product design." s="Toggle the controls. Contrast, readable type, visible focus, clear errors and reduced motion help more people in more situations.">
        <UXD_A11y />
        <p className="ix-note">
          Guided by <PpX href="https://www.w3.org/WAI/standards-guidelines/wcag/">W3C WCAG</PpX>; no legal compliance is claimed on this page.
        </p>
      </IX_Sec>

      <IX_Sec id="uxd-why-h" tone="light" k="Why Frequent Research" t="Why Frequent Research for UI/UX Design?">
        <IX_Why
          items={[
            ["UX + engineering thinking", "code", "Design decisions consider implementation reality, performance and maintenance — so what's designed can be built."],
            ["Business-first design", "target", "Interfaces connected to business goals, workflows and outcomes."],
            ["AI-aware experience design", "spark", "AI designed into the interaction model, not added as decoration."],
            ["Design systems that scale", "grid", "Reusable patterns that support product growth."],
            ["Complex information, made clear", "bars", "Data-heavy interfaces structured around decisions."],
            ["Human + machine interaction", "hand", "Designed for people working alongside automation and AI."],
            ["Product continuity", "refresh", "Design carries through development, QA and enhancement."],
            ["Ownership", "key", "Design assets and documentation remain usable by you."],
          ]}
        />
      </IX_Sec>

      <IX_Motto id="uxd-moto-h" kicker="Our UX motto" quote="Make complexity understandable. Make interaction effortless. Make technology useful." sub="We design around what people need to accomplish — not around what software happens to make possible." lines={["Clarity over decoration.", "Workflow before wireframe.", "Consistency without monotony.", "AI should feel understandable.", "Design for evolution."]} />

      <IX_Sec id="uxd-val-h" tone="dark" k="What better UX changes inside a business" t="Clearer interfaces start a chain reaction.">
        <IX_Chain
          items={[
            ["Clearer interfaces", "layout"],
            ["Less confusion", "help"],
            ["Faster task completion", "clock"],
            ["Fewer avoidable errors", "check"],
            ["Better adoption", "users"],
            ["Better use of the product", "trend"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-audit-h" tone="light" k="UX audit" t="Something feels wrong with the product. Let's find where." s="Seven areas we examine in a UX review. Select one.">
        <UXD_Audit
          formId={UXD_FORM}
          areas={[
            ["Navigation", "queue", "Can users find what they need?", "We trace the paths people take to their most common goals and where they get lost."],
            ["Information", "doc", "Is the right information presented at the right time?", "We look at what each screen shows, what it hides, and what people actually use."],
            ["Interaction", "cursor", "Are actions obvious?", "We review primary actions, labels, states and the cost of mistakes."],
            ["Consistency", "grid", "Does the product behave predictably?", "We check patterns, components and terminology across the product."],
            ["Accessibility", "access", "Can different users interact effectively?", "Contrast, keyboard use, focus, forms and screen-reader structure."],
            ["Performance perception", "clock", "Does the interface communicate status clearly?", "Loading, saving and error states that keep people informed."],
            ["AI interaction", "spark", "Do users understand and trust AI-assisted features?", "Transparency, control, uncertainty states and feedback loops."],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-pipe-h" tone="off" k="UX → UI → development" t="Design doesn't disappear after the design file." s="Select a stage.">
        <IX_Timeline
          id="uxd-tl2"
          stages={[
            ["UX strategy", "Goals, users and success criteria.", "target"],
            ["Information architecture", "Structure, navigation and content.", "branch"],
            ["Wireframes", "Layout and flow before visual polish.", "layout"],
            ["Interaction", "States, feedback and micro-interactions.", "cursor"],
            ["UI design", "Visual language across platforms.", "palette"],
            ["Design system", "Components, tokens and documentation.", "grid"],
            ["Prototype", "Tested before it's built.", "play"],
            ["Handoff", "Specifications developers can implement.", "code"],
            ["Implementation & QA", "Design reviewed in the real product.", "check"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="uxd-cap-h" tone="light" k="Core UI/UX capabilities" t="A capability map, from strategy to accessibility.">
        <IX_Stack
          groups={[
            ["UX strategy", "compass", ["User journeys", "Information architecture", "Task flows", "Workflow mapping", "Usability analysis"]],
            ["Interaction design", "cursor", ["Wireframes", "Prototypes", "Interaction patterns", "Micro-interactions", "Navigation design"]],
            ["UI design", "palette", ["Visual systems", "Responsive interfaces", "Mobile UI", "Web application UI", "Enterprise UI"]],
            ["Design systems", "grid", ["Component libraries", "Design tokens", "Patterns", "Documentation"]],
            ["Product design", "box", ["SaaS", "Dashboards", "Internal tools", "Business applications", "Mobile products"]],
            ["AI UX", "spark", ["AI assistants", "AI search", "Recommendations", "Conversational interfaces", "Human-in-the-loop workflows"]],
            ["Accessibility", "access", ["Accessible interaction", "Contrast", "Keyboard navigation", "Inclusive patterns"]],
            ["Build alignment", "code", ["React", "Next.js", "Flutter", "React Native", "HTML / CSS", "Design tooling agreed with your team"]],
          ]}
          note={
            <>
              References we design with: <PpX href="https://m3.material.io/">Material Design</PpX>, <PpX href="https://developer.apple.com/design/human-interface-guidelines/">Apple Human Interface Guidelines</PpX>, <PpX href="https://fluent2.microsoft.design/">Microsoft Fluent</PpX>. No partnerships or certifications are implied.
            </>
          }
        />
      </IX_Sec>

      <IX_Sec id="uxd-ind-h" tone="off" k="Industries" t="UX patterns change with the complexity of the business." s="Choose an industry to see a typical UX need." center>
        <IX_Industries
          items={[
            ["Manufacturing", "factory", "shop-floor interfaces that work with gloves, noise and limited time."],
            ["Retail", "cart", "store and catalogue tools built for speed."],
            ["Logistics", "truck", "dispatch screens prioritising exceptions."],
            ["Healthcare", "cross", "calm, error-resistant interfaces with clear permissions."],
            ["Pharmaceutical", "pill", "document-heavy workflows with clear status."],
            ["Financial Services", "coin", "trustworthy journeys with careful disclosure."],
            ["Agriculture", "wheat", "mobile data capture in the field."],
            ["Automotive", "car", "service and dealer workflows."],
            ["Energy", "bolt", "field inspections and asset dashboards."],
            ["Education", "book", "simple journeys for students, parents and staff."],
            ["Real Estate", "home", "project and customer portals."],
            ["Food & Beverage", "leaf", "quality and batch workflows."],
            ["Telecommunications", "signal", "self-service and support journeys."],
            ["Information Technology", "cpu", "complex admin and developer tools."],
            ["Government", "landmark", "accessible public-facing services."],
            ["Media", "film", "content production and approval tools."],
            ["Fashion", "shirt", "visual commerce and product journeys."],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="uxd-faq"
        title="UI/UX design: common questions"
        items={UXD_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("web-application-development")}>web applications</PpL>, <PpL to={ppIt("mobile-app-development")}>mobile apps</PpL>, <PpL to={ppIt("data-analytics-and-dashboard-development")}>dashboards</PpL>. Further reading from <PpX href="https://www.nngroup.com/articles/">Nielsen Norman Group</PpX>.
          </>
        }
      />

      <IX_Guide to="/blog/ui-ux-design-guide" title="UI/UX design guide" text="Research, structure, interaction and accessibility for products people can actually use." />

      <IX_Final
        id="uxd-final-h"
        kicker="Start with the experience — not the screen"
        title="Your users shouldn't have to learn how to work around your software."
        text="Tell us where users struggle, where workflows get complicated or where the product feels harder than it should. We'll help turn those friction points into a clearer experience."
        cta={["Design My Product", UXD_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["Request a UX Review", UXD_FORM]}
        flow={["Goal", "Context", "Decision", "Action", "Feedback", "Outcome"]}
        sig="We don't design interfaces for screens. We design experiences for people trying to get something done."
      />

      <DM_Form
        id={UXD_FORM}
        kicker="IT project consultation"
        title="Design My Product"
        sub="UX before visual polish · design aligned with development · clear deliverables · design systems where useful."
        type="UI/UX Design Enquiry"
        service="UI/UX Design"
        icon="compass"
        submitLabel="Discuss My UX Challenge"
        successTitle="Thank you. Your UI/UX request has been sent."
        siteLabel="Existing product or website (optional)"
        msgLabel="Message (optional)"
        msgPh="Users, key tasks, where they struggle, timelines — whatever helps"
        nextSteps={["We review your product and challenge.", "We contact you to understand users and tasks.", "You get a recommended approach — review, redesign or new design."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you need?", label: "Project type", options: ["New product design", "Website UX/UI", "Web application UX/UI", "Mobile app UX/UI", "SaaS product design", "Enterprise application design", "UX audit", "Product redesign", "Design system", "AI product experience", "Dashboard / data UX", "Other"] },
          { k: "platform", t: "Platform", q: "Which platforms?", label: "Platforms", multi: true, options: ["Website", "Web application", "iOS", "Android", "SaaS", "Enterprise software", "AI product"] },
          { k: "challenge", t: "Challenge", q: "What is the main UX challenge?", label: "Main UX challenge", multi: true, options: ["Users can't find things", "Complex workflows", "Low adoption", "Inconsistent screens", "Data-heavy dashboards", "AI features users don't trust", "Accessibility", "Starting from scratch"] },
        ]}
      />

      <IX_Sec id="uxd-rel-h" tone="dark" k="Related IT & Development services" t="Connected services">
        <IX_Related
          items={[
            ["IT & Development", "", "All business technology services."],
            ["Custom Business Applications", "custom-business-applications", "Purpose-built tools with clear workflows."],
            ["Web Application Development", "web-application-development", "Turn designs into working applications."],
            ["Mobile App Development", "mobile-app-development", "Mobile experiences, designed and built."],
            ["CRM Development", "crm-development", "CRM interfaces people want to use."],
            ["ERP Development", "erp-development", "Role-based ERP experiences."],
            ["AI & Automation Solutions", "ai-and-automation-solutions", "AI features designed with people in control."],
            ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Dashboards built around decisions."],
            ["Software Testing & QA", "software-testing-and-qa", "Usability and accessibility checked in the build."],
          ]}
          base={(s) => (s ? ppIt(s) : "/services/it-development")}
        />
      </IX_Sec>
    </div>
  );
}

export { UXD_Page };
