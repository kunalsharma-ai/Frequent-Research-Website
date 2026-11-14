/*
 * IT & Development kit (build 33) — the business-first technology narrative.
 * Prefix TX_ (sections) and TXV_ (signature hero visuals); styles in src/styles/it-tx.css (prefix tx-).
 * "Build for the business. Design for the user. Engineer for what comes next."
 * Content rules: no team details, no case studies, no example/illustrative boxes, no invented numbers,
 * no partnership or certification claims, no security/uptime/performance guarantees.
 * Every visual is keyboard-usable where interactive and respects reduced motion (rlCycle / ppR).
 */
import * as ee from 'react';
import { usePageMeta } from '../../app/SiteApp.jsx';
import { DK_PARENT_IT, DM_Faq, DM_Strip, PP_Head, PpI, PpL, dmMeta, dmSchema, ppGo, ppIn, ppIt, ppR } from './shared.jsx';
import { DK_Cards, DK_Final, DK_Hero, DK_Problems, DK_Sec, DK_Statement, DK_Tabs } from './kit.jsx';
import { DK_Guide } from './kit2.jsx';
import { RL_AiLayer, RL_Beyond, RL_Loop, rlCycle } from './kit4.jsx';

const TX_MOTTO = ["Build for the business.", "Design for the user.", "Engineer for what comes next."];
const TX_PHIL = [
  ["Understand", "search"],
  ["Design", "compass"],
  ["Engineer", "cpu"],
  ["Connect", "layers"],
  ["Intelligence", "bulb"],
  ["Measure", "bars"],
  ["Evolve", "refresh"],
];
const txPhil = (texts) => TX_PHIL.map(([t, ic], k) => [t, ic, texts[k]]);
const TX_AI_CHAIN = ["Requirement", "AI assistance", "Human review", "Architecture", "Engineering", "Testing", "Deployment", "Monitoring", "Learning"];
const TX_HUMAN = [
  ["Architecture", "Structure, trade-offs and long-term fit."],
  ["Business logic", "Rules that reflect how the business works."],
  ["Security and privacy", "Access, data handling and risk."],
  ["Validation", "Facts, outputs and edge cases checked."],
  ["Product direction", "What gets built — and what doesn't."],
  ["Final approval", "Nothing ships without human sign-off."],
];
const txRing = (n, r = 38, start = -90) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((start + (360 / n) * k) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });

/* Shared hero-visual frame (no "example" badge — a native product-window chrome instead). */
function TXV_Frame({ label, cls, children, v, refEl }) {
  return (
    <div ref={refEl} className={"tx-v " + cls + (v ? " is-in" : "")}>
      <div className="tx-v__top" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{label}</span>
      </div>
      {children}
    </div>
  );
}

/* ── Hub — a central digital product connected around one path ─────────────────────── */
const TXV_HUB = [
  ["Experience", "compass"],
  ["Application", "grid"],
  ["Integration", "layers"],
  ["Data", "database"],
  ["AI", "bulb"],
  ["Analytics", "bars"],
  ["Evolution", "refresh"],
];
function TXV_Hub() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(TXV_HUB.length, 1500, v);
  const P = txRing(TXV_HUB.length, 38);
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-hub" label="Digital product system">
      <div className="tx-hub__map">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="38" className="tx-hub__ring" />
          {P.map(([x, y], k) => (
            <line key={k} x1="50" y1="50" x2={x} y2={y} className={k <= on ? "is-on" : ""} />
          ))}
        </svg>
        <div className="tx-hub__core">
          <b>Digital product</b>
          <small>{TXV_HUB[on][0]}</small>
        </div>
        {TXV_HUB.map(([t, ic], k) => (
          <button
            key={t}
            type="button"
            className={"tx-hub__n" + (k === on ? " is-on" : k < on ? " is-done" : "")}
            style={{ left: P[k][0] + "%", top: P[k][1] + "%" }}
            onClick={() => pick(k)}
            aria-pressed={k === on}
          >
            <PpI n={ic} s={14} />
            {t}
          </button>
        ))}
      </div>
      <p className="tx-v__cap" aria-live="polite">
        Experience → Application → Integration → Data → AI → Analytics → Evolution
      </p>
    </TXV_Frame>
  );
}

/* ── Website — Digital Business Ecosystem: Page → Experience → Business interface ─────── */
const TXV_WEB_N = [
  ["Search", "search", 1],
  ["Content", "file", 1],
  ["Forms", "clipboard", 1],
  ["Customer journey", "map", 1],
  ["CRM", "database", 2],
  ["Analytics", "bars", 2],
  ["E-commerce", "tag", 2],
  ["APIs", "layers", 2],
  ["Automation", "refresh", 2],
];
const TXV_WEB_M = [
  ["Page", "A set of pages that describe the company."],
  ["Experience", "Search, content, forms and journeys that help people understand and act."],
  ["Business interface", "Connected to CRM, analytics, commerce, APIs and automation — part of how the business runs."],
];
function TXV_Website() {
  const [ref, v] = ppIn(0.05);
  const [m, pick] = rlCycle(3, 2600, v);
  const P = txRing(TXV_WEB_N.length, 39);
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-web" label="Digital business ecosystem">
      <div className="tx-seg" role="group" aria-label="Website role">
        {TXV_WEB_M.map(([t], k) => (
          <button key={t} type="button" className={m === k ? "is-on" : ""} aria-pressed={m === k} onClick={() => pick(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className={"tx-web__map is-m" + m}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {P.map(([x, y], k) => (
            <line key={k} x1="50" y1="50" x2={x} y2={y} className={TXV_WEB_N[k][2] <= m ? "is-on" : ""} />
          ))}
        </svg>
        <div className="tx-web__site">
          <i />
          <i />
          <i />
          <b>Website</b>
        </div>
        {TXV_WEB_N.map(([t, ic, lv], k) => (
          <span key={t} className={"tx-web__n" + (lv <= m ? " is-on" : "")} style={{ left: P[k][0] + "%", top: P[k][1] + "%", "--k": k }}>
            <PpI n={ic} s={12} />
            {t}
          </span>
        ))}
      </div>
      <p className="tx-v__cap" aria-live="polite">
        <b>{TXV_WEB_M[m][0]}:</b> {TXV_WEB_M[m][1]}
      </p>
    </TXV_Frame>
  );
}

/* ── Web application — Workflow Transformation Engine ─────────────────────────────── */
const TXV_WF_IN = [
  ["Spreadsheet", "grid"],
  ["Email", "msg"],
  ["Manual task", "clipboard"],
  ["Approval", "check"],
  ["Phone call", "phone"],
];
const TXV_WF_OUT = [
  ["Application", "grid"],
  ["Role", "user"],
  ["Action", "target"],
  ["Rule", "sliders"],
  ["Data", "database"],
  ["Dashboard", "bars"],
];
function TXV_Workflow() {
  const [ref, v] = ppIn(0.05);
  const [s, pick] = rlCycle(TXV_WF_OUT.length + 2, 1100, v);
  const built = s >= 1;
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-wf" label="Workflow transformation engine">
      <div className={"tx-wf__in" + (built ? " is-built" : "")}>
        <ul className="tx-wf__mess" aria-label="Disconnected work">
          {TXV_WF_IN.map(([t, ic], k) => (
            <li key={t} style={{ "--k": k }}>
              <PpI n={ic} s={13} />
              {t}
            </li>
          ))}
        </ul>
        <div className="tx-wf__gate" aria-hidden="true">
          <i />
        </div>
        <ol className="tx-wf__out" aria-label="Structured product">
          {TXV_WF_OUT.map(([t, ic], k) => (
            <li key={t} className={k < s ? "is-on" : ""} style={{ "--k": k }}>
              <PpI n={ic} s={13} />
              {t}
            </li>
          ))}
        </ol>
      </div>
      <div className="tx-seg tx-seg--sm" role="group" aria-label="View">
        <button type="button" className={!built ? "is-on" : ""} aria-pressed={!built} onClick={() => pick(0)}>
          Disconnected work
        </button>
        <button type="button" className={built ? "is-on" : ""} aria-pressed={built} onClick={() => pick(TXV_WF_OUT.length)}>
          Structured product
        </button>
      </div>
    </TXV_Frame>
  );
}

/* ── Mobile — Mobile Journey Simulator ─────────────────────────────────────────────── */
const TXV_MB = [
  ["Open", "Fast start, last state remembered", [0]],
  ["Authenticate", "Secure sign-in", [0, 1, 2]],
  ["Discover", "Content for this moment", [0, 1, 2, 3]],
  ["Act", "One clear task", [0, 1, 2, 3]],
  ["Confirm", "Instant feedback", [0, 1, 2]],
  ["Notify", "A relevant, timely update", [2, 1, 0]],
  ["Return", "Pick up where they left off", [0, 4]],
];
const TXV_MB_SYS = [
  ["Mobile", "phone"],
  ["API", "layers"],
  ["Backend", "cpu"],
  ["Data", "database"],
  ["Analytics", "bars"],
];
function TXV_Mobile() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(TXV_MB.length, 1600, v);
  const S = TXV_MB[on];
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-mb" label="Mobile journey simulator">
      <div className="tx-mb__in">
        <div className="tx-mb__phone">
          <div className="tx-mb__screen" key={on} aria-live="polite">
            <small>
              {String(on + 1).padStart(2, "0")} / {String(TXV_MB.length).padStart(2, "0")}
            </small>
            <b>{S[0]}</b>
            <span>{S[1]}</span>
            <i className="tx-mb__bar" />
            <i className="tx-mb__bar tx-mb__bar--s" />
            <em className={"tx-mb__btn tx-mb__btn--" + on}>{on === 5 ? "New update" : on === 4 ? "Done ✓" : "Continue"}</em>
          </div>
          <ol className="tx-mb__dots">
            {TXV_MB.map(([t], k) => (
              <li key={t}>
                <button type="button" className={k === on ? "is-on" : ""} aria-label={t} aria-pressed={k === on} onClick={() => pick(k)} />
              </li>
            ))}
          </ol>
        </div>
        <ol className="tx-mb__sys" aria-label="Systems involved in this step">
          {TXV_MB_SYS.map(([t, ic], k) => (
            <li key={t} className={S[2].includes(k) ? "is-on" : ""}>
              <PpI n={ic} s={14} />
              {t}
            </li>
          ))}
        </ol>
      </div>
    </TXV_Frame>
  );
}

/* ── E-commerce — Commerce Engine ───────────────────────────────────────────────────── */
const TXV_CE = [
  ["Catalog", "box"],
  ["Discovery", "search"],
  ["Cart", "tag"],
  ["Checkout", "clipboard"],
  ["Payment", "shield"],
  ["Order", "check"],
  ["Fulfilment", "map"],
  ["Customer", "user"],
];
function TXV_Commerce() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(TXV_CE.length + 1, 1000, v);
  const back = on >= TXV_CE.length;
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-ce" label="Commerce engine">
      <ol className="tx-ce__track">
        {TXV_CE.map(([t, ic], k) => (
          <li key={t} className={k === on ? "is-on" : k < on ? "is-done" : ""} style={{ "--k": k }}>
            <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
              <span>
                <PpI n={ic} s={15} />
              </span>
              {t}
            </button>
          </li>
        ))}
      </ol>
      <div className={"tx-ce__back" + (back ? " is-on" : "")} aria-live="polite">
        <i aria-hidden="true" />
        <b>Analytics</b>
        <span aria-hidden="true">→</span>
        <b>Optimisation</b>
        <small>{back ? "What happened feeds what improves next." : "Product data moves through the system…"}</small>
      </div>
    </TXV_Frame>
  );
}

/* ── Custom software — Business workflow → digital product ──────────────────────────── */
const TXV_CS_BEFORE = [
  ["Manual", 18, 22],
  ["Disconnected", 70, 18],
  ["Repetitive", 26, 70],
  ["Difficult to track", 74, 66],
];
const TXV_CS_AFTER = [
  ["Rules", "sliders"],
  ["Workflow", "shuffle"],
  ["Interface", "grid"],
  ["Automation", "refresh"],
  ["Data", "database"],
  ["Dashboard", "bars"],
];
function TXV_Process() {
  const [ref, v] = ppIn(0.05);
  const [m, pick] = rlCycle(2, 3000, v);
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-cs" label="Business workflow → digital product">
      <div className="tx-seg tx-seg--sm" role="group" aria-label="View">
        <button type="button" className={m === 0 ? "is-on" : ""} aria-pressed={m === 0} onClick={() => pick(0)}>
          Current process
        </button>
        <button type="button" className={m === 1 ? "is-on" : ""} aria-pressed={m === 1} onClick={() => pick(1)}>
          Digital product
        </button>
      </div>
      <div className={"tx-cs__stage is-m" + m}>
        <div className="tx-cs__mess" aria-hidden={m === 1}>
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M18 22 C 60 0, 30 60, 70 18 S 10 90, 26 70 S 90 40, 74 66 S 40 20, 18 22" />
            <path d="M70 18 C 90 50, 50 50, 26 70" />
          </svg>
          {TXV_CS_BEFORE.map(([t, x, y]) => (
            <span key={t} style={{ left: x + "%", top: y + "%" }}>
              {t}
            </span>
          ))}
        </div>
        <ol className="tx-cs__prod" aria-hidden={m === 0}>
          {TXV_CS_AFTER.map(([t, ic], k) => (
            <li key={t} style={{ "--k": k }}>
              <PpI n={ic} s={14} />
              {t}
            </li>
          ))}
        </ol>
      </div>
      <p className="tx-v__cap">
        <b>Don't adapt the business to the software.</b> Build software around the business.
      </p>
    </TXV_Frame>
  );
}

/* ── SaaS — layered product-to-platform architecture ──────────────────────────────── */
const TXV_SA = [
  ["Idea", "bulb"],
  ["User", "user"],
  ["Product experience", "compass"],
  ["Tenant", "box"],
  ["Identity", "shield"],
  ["Data", "database"],
  ["Billing", "tag"],
  ["Integrations", "layers"],
  ["Analytics", "bars"],
  ["AI", "cpu"],
  ["Continuous improvement", "refresh"],
];
function TXV_Saas() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(TXV_SA.length, 1100, v);
  const [t, setT] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const h = setInterval(() => setT((x) => (x + 1) % 3), 2400);
    return () => clearInterval(h);
  }, [v]);
  return (
    <TXV_Frame refEl={ref} v={v} cls="tx-sa" label="SaaS product engine">
      <div className="tx-sa__in">
        <ol className="tx-sa__stack">
          {TXV_SA.map(([n, ic], k) => (
            <li key={n} className={k === on ? "is-on" : k < on ? "is-done" : ""} style={{ "--k": k }}>
              <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
                <PpI n={ic} s={13} />
                {n}
              </button>
            </li>
          ))}
        </ol>
        <div className="tx-sa__ten" aria-label="Tenants share one product, with separated data">
          {["Tenant A", "Tenant B", "Tenant C"].map((n, k) => (
            <span key={n} className={k === t ? "is-on" : ""}>
              <PpI n="box" s={12} />
              {n}
            </span>
          ))}
          <small>One product · separated tenants</small>
        </div>
      </div>
    </TXV_Frame>
  );
}

/* ── Sections ───────────────────────────────────────────────────────────────────────── */

/* The Frequent Research Difference — numbered differentiators. items: [title, icon, what, whyItMatters][] */
function TX_Diff({ id, kicker = "The Frequent Research difference", title, sub, items, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const I = items[on];
  return (
    <DK_Sec tone={tone} className="tx-df" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
      <div className="tx-df__in">
        <ol className="tx-df__list" role="tablist" aria-label={title}>
          {items.map(([t, ic], k) => (
            <li key={t} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                <em>{String(k + 1).padStart(2, "0")}</em>
                <PpI n={ic} s={15} />
                {t}
              </button>
            </li>
          ))}
        </ol>
        <div className="tx-df__pane" role="tabpanel" key={on} aria-live="polite">
          <span className="tx-df__no" aria-hidden="true">
            {String(on + 1).padStart(2, "0")}
          </span>
          <h3>{I[0]}</h3>
          <p>{I[2]}</p>
          <div className="tx-df__why">
            <small>Why it matters</small>
            <p>{I[3]}</p>
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Before → after transformation with a value chain. */
function TX_Shift({ id, kicker = "Business value", title, sub, before, after, chain, beforeLabel = "Before", afterLabel = "After", tone = "off" }) {
  const [ref, v] = ppIn(0.3);
  const [m, setM] = ee.useState(0);
  ee.useEffect(() => {
    if (!v) return;
    if (ppR()) return setM(1);
    const t = setTimeout(() => setM(1), 900);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} tx-sh` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="tx-seg tx-seg--c" role="group" aria-label="Compare">
          <button type="button" className={m === 0 ? "is-on" : ""} aria-pressed={m === 0} onClick={() => setM(0)}>
            {beforeLabel}
          </button>
          <button type="button" className={m === 1 ? "is-on" : ""} aria-pressed={m === 1} onClick={() => setM(1)}>
            {afterLabel}
          </button>
        </div>
        <div className={"tx-sh__in is-m" + m}>
          <ul className="tx-sh__col tx-sh__col--b" aria-label={beforeLabel}>
            {before.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ul>
          <div className="tx-sh__arrow" aria-hidden="true">
            <i />
          </div>
          <ul className="tx-sh__col tx-sh__col--a" aria-label={afterLabel}>
            {after.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                <PpI n="check" s={13} />
                {t}
              </li>
            ))}
          </ul>
        </div>
        {chain && (
          <ol className="tx-chain">
            {chain.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}

/* Build vs buy vs extend vs integrate vs modernize. options: [title, icon, whenItFits, signals[], watchOut][] */
function TX_Decide({ id, kicker = "Decision framework", title, sub, options, core, tone = "dark" }) {
  const [on, setOn] = ee.useState(3);
  const O = options[on];
  return (
    <DK_Sec tone={tone} className="tx-dc" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="tx-dc__spec" aria-hidden="true">
        <span>Use what exists</span>
        <i style={{ "--p": (on / (options.length - 1)) * 100 + "%" }} />
        <span>Create something new</span>
      </div>
      <div className="tx-dc__opts" role="tablist" aria-label={title}>
        {options.map(([t, ic], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <PpI n={ic} s={16} />
            {t}
          </button>
        ))}
      </div>
      <div className="tx-dc__pane" role="tabpanel" key={on} aria-live="polite">
        <div>
          <small>When it fits</small>
          <h3>{O[2]}</h3>
          <ul>
            {O[3].map((x, k) => (
              <li key={x} style={{ "--k": k }}>
                <PpI n="check" s={13} />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <p className="tx-dc__watch">
          <b>Watch for:</b> {O[4]}
        </p>
      </div>
      {core && <p className="tx-dc__core">{core}</p>}
    </DK_Sec>
  );
}

/* Integration hub — software rarely works alone. nodes: [label, icon, why][] */
function TX_Hub({ id, kicker = "Integration-aware development", title, sub, center = "Digital product", nodes, flow = ["Connect", "Synchronize", "Automate", "Measure"], note, tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(nodes.length, 2200, v);
  const P = txRing(nodes.length, 40);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} tx-hb` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container tx-hb__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <ol className="tx-chain tx-chain--l">
            {flow.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          <div className="tx-hb__pane" key={on} aria-live="polite">
            <b>
              {center} ↔ {nodes[on][0]}
            </b>
            <p>{nodes[on][2]}</p>
          </div>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="tx-hb__map">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {P.map(([x, y], k) => (
              <g key={k} className={k === on ? "is-on" : ""}>
                <line x1="50" y1="50" x2={x} y2={y} />
                <circle r="1.2" className="tx-hb__pk">
                  {k === on && !ppR() && <animateMotion dur="1.4s" repeatCount="indefinite" path={`M50,50 L${x},${y} L50,50`} />}
                </circle>
              </g>
            ))}
          </svg>
          <div className="tx-hb__core">
            <PpI n="cpu" s={18} />
            {center}
          </div>
          {nodes.map(([t, ic], k) => (
            <button key={t} type="button" className={"tx-hb__n" + (k === on ? " is-on" : "")} style={{ left: P[k][0] + "%", top: P[k][1] + "%" }} onClick={() => pick(k)} aria-pressed={k === on}>
              <PpI n={ic} s={13} />
              {t}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Assurance tabs: security / quality / performance / accessibility / observability.
   tabs: [label, icon, headline, kind ("flow"|"layers"|"cols"|"chips"), data, note?][] */
function TX_Assure({ id, kicker = "Built-in, not bolted on", title, sub, tabs, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const T = tabs[on];
  return (
    <DK_Sec tone={tone} className="tx-as" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="tx-as__tabs" role="tablist" aria-label={title}>
        {tabs.map(([t, ic], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <PpI n={ic} s={15} />
            {t}
          </button>
        ))}
      </div>
      <div className="tx-as__pane" role="tabpanel" key={on}>
        <h3>{T[2]}</h3>
        {T[3] === "flow" && (
          <ol className="tx-as__flow">
            {T[4].map((x, k) => (
              <li key={x} style={{ "--k": k }}>
                <em>{String(k + 1).padStart(2, "0")}</em>
                {x}
              </li>
            ))}
          </ol>
        )}
        {T[3] === "layers" && (
          <ol className="tx-as__layers">
            {T[4].map((x, k) => (
              <li key={x} style={{ "--k": k, "--w": 100 - k * (40 / T[4].length) + "%" }}>
                {x}
              </li>
            ))}
          </ol>
        )}
        {T[3] === "cols" && (
          <div className="tx-as__cols">
            {T[4].map(([h, items]) => (
              <div key={h}>
                <b>{h}</b>
                <ul>
                  {items.map((x, k) => (
                    <li key={x} style={{ "--k": k }}>
                      <PpI n="check" s={12} />
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        {T[3] === "chips" && (
          <div className="tx-as__chips">
            {T[4].map(([x, ic], k) => (
              <span key={x} style={{ "--k": k }}>
                <PpI n={ic} s={14} />
                {x}
              </span>
            ))}
          </div>
        )}
        {T[5] && <p className="tx-as__note">{T[5]}</p>}
      </div>
    </DK_Sec>
  );
}

/* Conceptual product dashboard — shapes only, never numbers. tiles: [label, icon, kind ("spark"|"bars"|"ring"|"dots")][] */
const TX_SPARK = ["M0,18 L10,14 L20,15 L30,9 L40,11 L50,6 L60,8 L70,4", "M0,10 L10,12 L20,8 L30,13 L40,9 L50,11 L60,7 L70,9", "M0,16 L10,15 L20,12 L30,12 L40,8 L50,9 L60,5 L70,6"];
function TX_Dash({ id, kicker = "Product analytics", title, sub, tiles, modes = ["Build", "Observe", "Learn"], tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [m, pick] = rlCycle(modes.length, 2600, v);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} tx-db` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="tx-seg tx-seg--c tx-seg--dark" role="group" aria-label="Stage">
          {modes.map((t, k) => (
            <button key={t} type="button" className={m === k ? "is-on" : ""} aria-pressed={m === k} onClick={() => pick(k)}>
              {t}
            </button>
          ))}
        </div>
        <div className={"tx-db__ui is-m" + m} role="img" aria-label={"Conceptual product dashboard showing " + tiles.map((t) => t[0]).join(", ") + ". Shapes only — no real data."}>
          {tiles.map(([t, ic, kind], k) => (
            <div key={t} className="tx-db__t" style={{ "--k": k }}>
              <span>
                <PpI n={ic} s={13} />
                {t}
              </span>
              {kind === "spark" && (
                <svg viewBox="0 0 70 20" preserveAspectRatio="none">
                  <path d={TX_SPARK[k % 3]} />
                </svg>
              )}
              {kind === "bars" && (
                <div className="tx-db__bars">
                  {[40, 65, 50, 80, 60, 72].map((h, j) => (
                    <i key={j} style={{ height: h + "%" }} />
                  ))}
                </div>
              )}
              {kind === "ring" && <i className="tx-db__ring" />}
              {kind === "dots" && (
                <div className="tx-db__dots">
                  {Array.from({ length: 12 }, (_, j) => (
                    <i key={j} className={j % 5 === 3 ? "is-alt" : ""} />
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p className="tx-db__cap">Conceptual interface — shapes only, no real data.</p>
      </div>
    </section>
  );
}

/* Launch is a milestone. loop: labels; keep: post-launch chain. */
const TX_LOOP = ["Launch", "Observe", "Learn", "Prioritize", "Improve", "Release", "Measure", "Repeat"];
const TX_KEEP = ["Maintain", "Monitor", "Secure", "Improve", "Integrate", "Expand", "Modernize"];
function TX_Evolve({ id, kicker = "Product evolution", title = "Launch Is a Milestone. Not the Finish Line.", sub, loop = TX_LOOP, keep = TX_KEEP, keepTitle = "Keep the product moving", areas, tone = "light" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(loop.length, 1300, v);
  const P = txRing(loop.length, 40);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} tx-ev` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container tx-ev__in">
        <div className="tx-ev__ring">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <circle cx="50" cy="50" r="40" />
            <circle cx="50" cy="50" r="40" className="tx-ev__arc" style={{ strokeDashoffset: 251 - (251 * (on + 1)) / loop.length }} />
          </svg>
          {loop.map((t, k) => (
            <button key={t} type="button" className={"tx-ev__n" + (k === on ? " is-on" : "")} style={{ left: P[k][0] + "%", top: P[k][1] + "%" }} onClick={() => pick(k)} aria-pressed={k === on}>
              {t}
            </button>
          ))}
          <b className="tx-ev__c">{loop[on]}</b>
        </div>
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <h3 className="tx-ev__kt">{keepTitle}</h3>
          <ol className="tx-chain tx-chain--l">
            {keep.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          {areas && (
            <div className="tx-ev__areas">
              {areas.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Business value map. items: [title, icon, text][] */
function TX_Value({ id, kicker = "Business value", title = "From Technology Investment to Business Capability", sub, items, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  return (
    <DK_Sec tone={tone} className="tx-vl" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <ul className="tx-vl__grid">
        {items.map(([t, ic, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <button type="button" className={on === k ? "is-on" : ""} aria-expanded={on === k} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
              <span>
                <PpI n={ic} s={18} />
              </span>
              <b>{t}</b>
              <small>{d}</small>
            </button>
          </li>
        ))}
      </ul>
    </DK_Sec>
  );
}

/* "What are you trying to make possible?" — a consultation-style decision. options: [need, icon, service, slug, why, starting[]][] */
function TX_Make({ id, kicker = "Start with the outcome", title, sub, options, tone = "light", cta, formId }) {
  const [on, setOn] = ee.useState(0);
  const O = options[on];
  return (
    <DK_Sec tone={tone} className="tx-mk" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="tx-mk__in">
        <ul className="tx-mk__needs" role="tablist" aria-label={title}>
          {options.map(([t, ic], k) => (
            <li key={t} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                <PpI n={ic} s={15} />“{t}”
              </button>
            </li>
          ))}
        </ul>
        <div className="tx-mk__route" role="tabpanel" key={on} aria-live="polite">
          <ol className="tx-mk__path" aria-hidden="true">
            <li>Your need</li>
            <li>Product direction</li>
            <li>{O[2]}</li>
          </ol>
          <h3>{O[2]}</h3>
          <p>{O[4]}</p>
          <div className="tx-mk__start">
            <small>Often starts with</small>
            {O[5].map((x, k) => (
              <span key={x} style={{ "--k": k }}>
                {x}
              </span>
            ))}
          </div>
          <div className="tx-mk__act">
            {O[3] && (
              <PpL to={ppIt(O[3])} className="btn pp-btn">
                Explore {O[2]} <span aria-hidden="true">→</span>
              </PpL>
            )}
            {cta && (
              <a href={"#" + formId} onClick={ppGo(formId)} className="dk-card__link">
                {cta} →
              </a>
            )}
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Six connected product paths over a shared foundation. products: [title, icon, slug, foundationIdx[], text][]; foundation: [label, icon][] */
function TX_Products({ id, kicker = "Six connected capabilities", title, sub, products, foundation, current, tone = "dark" }) {
  const start = Math.max(0, products.findIndex((p) => p[2] === current));
  const [on, setOn] = ee.useState(start);
  const O = products[on];
  const P = txRing(products.length, 38, -90);
  return (
    <DK_Sec tone={tone} className="tx-pr" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="tx-pr__in">
        <div className="tx-pr__map">
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {P.map(([x, y], k) => (
              <line key={k} x1="50" y1="50" x2={x} y2={y} className={k === on ? "is-on" : ""} />
            ))}
          </svg>
          <div className="tx-pr__core">Digital product</div>
          {products.map(([t, ic, slug], k) => (
            <button key={t} type="button" className={"tx-pr__n" + (k === on ? " is-on" : "") + (slug === current ? " is-cur" : "")} style={{ left: P[k][0] + "%", top: P[k][1] + "%" }} onClick={() => setOn(k)} aria-pressed={k === on}>
              <PpI n={ic} s={14} />
              {t}
            </button>
          ))}
        </div>
        <div className="tx-pr__pane" key={on} aria-live="polite">
          <h3>{O[0]}</h3>
          <p>{O[4]}</p>
          <small>Path through the shared foundation</small>
          <ul className="tx-pr__fd">
            {foundation.map(([t, ic], k) => (
              <li key={t} className={O[3].includes(k) ? "is-on" : ""}>
                <PpI n={ic} s={13} />
                {t}
              </li>
            ))}
          </ul>
          {O[2] !== current && (
            <PpL to={ppIt(O[2])} className="dk-card__link">
              Explore {O[0]} →
            </PpL>
          )}
        </div>
      </div>
    </DK_Sec>
  );
}
const TX_FOUND = [
  ["API", "layers"],
  ["Data", "database"],
  ["Cloud", "globe"],
  ["Security", "shield"],
  ["AI", "bulb"],
  ["Analytics", "bars"],
];
const TX_PRODUCTS = [
  ["Website", "globe", "website-development", [0, 2, 3, 5], "A digital business experience — discovery, content, conversion and connected systems."],
  ["Web Application", "grid", "web-application-development", [0, 1, 2, 3, 5], "Workflows turned into a product people can use, with roles, rules and data visibility."],
  ["Mobile", "phone", "mobile-app-development", [0, 1, 3, 5], "Experiences built around the moment of use, connected to a secure backend."],
  ["E-commerce", "tag", "e-commerce-development", [0, 1, 2, 3, 4, 5], "The commerce system behind the transaction — catalogue to fulfilment."],
  ["Custom Software", "cpu", "custom-software-development", [0, 1, 3, 4, 5], "Software built around the way the business actually works."],
  ["SaaS", "box", "saas-development", [0, 1, 2, 3, 4, 5], "A product built to keep improving — tenants, billing, integrations and AI."],
];

/* ── TX_Page — shared service-page structure ───────────────────────────────────────────
   Hero → motto → capability strip → challenge → difference → business value → signature visuals →
   capabilities → philosophy → AI → integrations → assurance → evolution → why this approach →
   related → FAQ → guide → final CTA → form. Sections are optional where they don't help. */
function TX_Page({ c }) {
  usePageMeta(c.maTitle, c.desc);
  dmMeta(c.url, c.title, c.desc);
  dmSchema(c.key, { path: c.url, crumb: c.crumb, parent: DK_PARENT_IT, name: c.name, serviceType: c.serviceType, description: c.schemaDesc, faq: c.faq });
  const P = c.pfx;
  const h = c.hero;
  return (
    <div className={"pp sm dk k3 tx " + (c.cls || c.pfx + "-svc")}>
      <DK_Hero id={P + "-h1"} parent={DK_PARENT_IT} crumb={c.crumb} kicker={h.kicker} title={h.h1} tag={h.tag} lead={h.lead} primary={[h.cta, c.formId]} secondary={h.cta2} secondaryGo={P + "-loop-h"} trust={h.trust}>
        {h.vis}
      </DK_Hero>
      <DK_Statement id={P + "-stmt"} tone="off" quote={c.statement || TX_MOTTO.join(" ")} flow={c.statementFlow || TX_PHIL.map((x) => x[0])} />
      <DM_Strip caps={c.caps} label={c.crumb + " capabilities"} />
      {c.problem && <DK_Problems id={P + "-prob-h"} kicker="The business challenge" title={c.problem.title} sub={c.problem.sub} items={c.problem.items} />}
      {c.diff && <TX_Diff id={P + "-df-h"} title={c.diff.title} sub={c.diff.sub} items={c.diff.items} />}
      {c.shift && <TX_Shift id={P + "-val-h"} {...c.shift} />}
      {c.visuals}
      {c.capabilities && <DK_Tabs id={P + "-cap-h"} tone="light" kicker="Capabilities" title={c.capabilities.title} sub={c.capabilities.sub} layers={c.capabilities.layers} note={c.capabilities.note} />}
      <RL_Loop id={P + "-loop-h"} kicker="How Frequent Research thinks about technology" title={c.loop.title} sub={c.loop.sub || "Not a seven-step process — a way of making technology decisions. Select a stage."} center={c.loop.center || "Build · Design · Engineer"} stages={txPhil(c.loop.texts)} />
      {c.ai && <RL_AiLayer id={P + "-ai-h"} title={c.ai.title} sub={c.ai.sub} ai={c.ai.ai} human={c.ai.human || TX_HUMAN} chain={c.ai.chain || TX_AI_CHAIN} />}
      {c.integrate && <TX_Hub id={P + "-int-h"} {...c.integrate} />}
      {c.after}
      {c.assure && <TX_Assure id={P + "-as-h"} title={c.assure.title} sub={c.assure.sub} tabs={c.assure.tabs} />}
      {c.evolve && <TX_Evolve id={P + "-ev-h"} {...c.evolve} />}
      {c.why && <DK_Cards id={P + "-why-h"} tone="off" kicker="Why this approach matters" title={c.why.title} sub={c.why.sub} cols={3} items={c.why.items} />}
      {c.products && <TX_Products id={P + "-pr-h"} title={c.products.title} sub={c.products.sub} products={TX_PRODUCTS} foundation={TX_FOUND} current={c.slug} />}
      {c.related && <RL_Beyond id={P + "-rel-h"} kicker="Connected services" title={c.related.title} sub={c.related.sub} center={c.related.center || c.crumb} links={c.related.links} />}
      <DM_Faq id={P + "-faq"} title={c.faqTitle} items={c.faq} aside={c.faqAside} />
      {c.guide && <DK_Guide id={P + "-guide-h"} {...c.guide} />}
      {c.guideNode}
      <DK_Final
        id={P + "-final-h"}
        sig={TX_MOTTO.join(" ")}
        sigText={c.final.sigText}
        title={c.final.title}
        text={c.final.text}
        buttons={[h.cta, "Explore IT & Development"]}
        to2="/services/it-development"
        formId={c.formId}
      />
      {c.formNode}
    </div>
  );
}

export { TXV_Commerce, TXV_Hub, TXV_Mobile, TXV_Process, TXV_Saas, TXV_Website, TXV_Workflow, TX_AI_CHAIN, TX_Assure, TX_Dash, TX_Decide, TX_Diff, TX_Evolve, TX_FOUND, TX_HUMAN, TX_Hub, TX_Make, TX_PRODUCTS, TX_Page, TX_Products, TX_Shift, TX_Value, txPhil };
