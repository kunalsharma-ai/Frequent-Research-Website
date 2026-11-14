/*
 * Digital Growth kit (build 34) — "Digital Growth, Built Around the Business."
 * Prefix DG_ (sections) and DGV_ (signature hero visuals); styles in src/styles/dm-growth.css (prefix dg-).
 * Each service page composes these differently so no two pages share the same structure.
 * Content rules: no market-research positioning, no team details, no case studies, no example/illustrative
 * boxes, no invented numbers. Visuals show shapes and relationships only. Every interactive element is
 * keyboard-usable and respects reduced motion (rlCycle / ppR). Radial visuals fall back to lists on phones.
 */
import * as ee from 'react';
import { PP_Head, PpI, PpL, ppDm, ppGo, ppIn, ppR } from './shared.jsx';
import { DK_Sec } from './kit.jsx';
import { rlCycle } from './kit4.jsx';

const DG_MOTTO = ["Turn attention into action.", "Turn data into better decisions."];
const dgRing = (n, r = 40, start = -90) =>
  Array.from({ length: n }, (_, k) => {
    const a = ((start + (360 / n) * k) * Math.PI) / 180;
    return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
  });

/* ── Hero visuals ─────────────────────────────────────────────────────────────────── */

/* Parent page — Digital Growth Control Room. nodes: [label, icon, related idx[], note][] */
const DGV_CR = [
  ["Audience", "users", [1, 2, 6], "Who matters, and what moves them to act."],
  ["Brand", "award", [0, 2, 5], "The story the business wants to be known for."],
  ["Content", "file", [1, 3, 5], "Useful material people search for and share."],
  ["Search", "search", [2, 10, 7], "Being found at the moment of need."],
  ["Media", "megaphone", [0, 4, 7], "Paid reach placed behind evidence."],
  ["Social", "msg", [1, 2, 0], "Conversation that builds brand momentum."],
  ["CRM", "database", [0, 9, 7], "Relationships that continue after the first click."],
  ["Analytics", "bars", [8, 3, 4], "Signals that explain what is working."],
  ["AI", "bulb", [7, 9, 2], "Pattern-finding and acceleration, with people deciding."],
  ["Automation", "refresh", [6, 8, 10], "The right next step, triggered at the right time."],
  ["Experience", "compass", [3, 6, 9], "Pages and journeys that make the next action obvious."],
];
function DGV_ControlRoom() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_CR.length, 1900, v);
  const P = dgRing(DGV_CR.length, 39);
  const rel = DGV_CR[on][2];
  return (
    <div ref={ref} className={"dg-cr" + (v ? " is-in" : "")}>
      <div className="dg-cr__map">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="39" className="dg-cr__orbit" />
          {P.map(([x, y], k) => (
            <line key={k} x1="50" y1="50" x2={x} y2={y} className={k === on ? "is-on" : rel.includes(k) ? "is-rel" : ""} />
          ))}
          {rel.map((r) => (
            <line key={"r" + r} x1={P[on][0]} y1={P[on][1]} x2={P[r][0]} y2={P[r][1]} className="dg-cr__link" />
          ))}
        </svg>
        <div className="dg-cr__core">
          <small>Centre of every decision</small>
          <b>Business objective</b>
        </div>
        <ul className="dg-cr__nodes">
          {DGV_CR.map(([t, ic], k) => (
            <li key={t} style={{ "--x": P[k][0] + "%", "--y": P[k][1] + "%" }}>
              <button type="button" className={k === on ? "is-on" : rel.includes(k) ? "is-rel" : ""} onClick={() => pick(k)} onMouseEnter={() => pick(k)} onFocus={() => pick(k)} aria-pressed={k === on}>
                <PpI n={ic} s={13} />
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="dg-cr__cap" aria-live="polite">
        <b>{DGV_CR[on][0]}</b> {DGV_CR[on][3]} <em>Connected to {rel.map((r) => DGV_CR[r][0]).join(", ")}.</em>
      </p>
    </div>
  );
}

/* SEO — Search Landscape: six layers a search journey passes through. */
const DGV_SL = [
  ["Intent", "target", "Why the person is searching."],
  ["Query", "search", "The words they actually use."],
  ["Content", "file", "The page that answers the question."],
  ["Technical health", "cpu", "Whether search engines can read it."],
  ["Authority", "award", "Whether the source deserves trust."],
  ["Experience", "compass", "Whether the visit leads somewhere."],
];
function DGV_Search() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_SL.length, 1700, v);
  return (
    <div ref={ref} className={"dg-sl" + (v ? " is-in" : "")}>
      <div className="dg-sl__q" aria-hidden="true">
        <PpI n="search" s={14} />
        <span key={on}>{["how do I choose…", "which option suits…", "provider for…", "pricing for…", "compare…", "book a…"][on]}</span>
        <i />
      </div>
      <ol className="dg-sl__land">
        {DGV_SL.map(([t, ic, d], k) => (
          <li key={t} className={k === on ? "is-on" : k < on ? "is-past" : ""} style={{ "--k": k }}>
            <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
              <span className="dg-sl__plate" aria-hidden="true" />
              <b>
                <PpI n={ic} s={13} />
                {t}
              </b>
              <small>{d}</small>
            </button>
          </li>
        ))}
      </ol>
      <p className="dg-sl__foot">Visibility is built layer by layer — not keyword by keyword.</p>
    </div>
  );
}

/* Performance — Campaign Flight Deck: instruments, relative only. */
const DGV_FD = [
  ["Audience", "users", 72],
  ["Creative", "bulb", 58],
  ["Channel", "megaphone", 64],
  ["Budget allocation", "sliders", 46],
  ["Landing experience", "compass", 54],
  ["Signals", "bars", 80],
  ["Conversion events", "target", 62],
  ["Optimisation", "refresh", 70],
];
function DGV_FlightDeck() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_FD.length, 1400, v);
  return (
    <div ref={ref} className={"dg-fd" + (v ? " is-in" : "")}>
      <div className="dg-fd__top" aria-hidden="true">
        <span>
          <i /> Campaign flight deck
        </span>
        <em>Live loop</em>
      </div>
      <div className="dg-fd__in">
        <ul className="dg-fd__inst">
          {DGV_FD.map(([t, ic, w], k) => (
            <li key={t} className={k === on ? "is-on" : ""}>
              <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
                <PpI n={ic} s={13} />
                <span>{t}</span>
                <i aria-hidden="true">
                  <b style={{ width: (k === on ? Math.min(96, w + 18) : w) + "%" }} />
                </i>
              </button>
            </li>
          ))}
        </ul>
        <div className="dg-fd__radar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span className="dg-fd__sweep" />
          <b style={{ "--a": on * 45 + "deg" }} />
          <small>{DGV_FD[on][0]}</small>
        </div>
      </div>
      <p className="dg-fd__cap">Relative signal strength shown as shape only — no figures, no promises.</p>
    </div>
  );
}

/* Social — Conversation Constellation. content types light audience/conversation nodes. */
const DGV_CC_N = [
  ["Brand", 50, 50],
  ["Content", 22, 26],
  ["Audience", 78, 24],
  ["Conversation", 84, 64],
  ["Community", 52, 86],
  ["Advocacy", 16, 70],
];
const DGV_CC_T = [
  ["Short video", [1, 2, 3]],
  ["Carousel", [1, 2, 4]],
  ["Live session", [3, 4, 5]],
  ["Thought post", [1, 3, 5]],
  ["Community reply", [3, 4, 5]],
];
function DGV_Constellation() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_CC_T.length, 2100, v);
  const lit = DGV_CC_T[on][1];
  return (
    <div ref={ref} className={"dg-cc" + (v ? " is-in" : "")}>
      <div className="dg-cc__sky">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {DGV_CC_N.slice(1).map(([, x, y], k) => (
            <line key={k} x1="50" y1="50" x2={x} y2={y} className={lit.includes(k + 1) ? "is-on" : ""} />
          ))}
          {lit.slice(0, -1).map((a, k) => (
            <line key={"t" + k} x1={DGV_CC_N[a][1]} y1={DGV_CC_N[a][2]} x2={DGV_CC_N[lit[k + 1]][1]} y2={DGV_CC_N[lit[k + 1]][2]} className="dg-cc__trail" />
          ))}
        </svg>
        {DGV_CC_N.map(([t, x, y], k) => (
          <span key={t} className={"dg-cc__star" + (k === 0 ? " is-core" : lit.includes(k) ? " is-on" : "")} style={{ "--x": x + "%", "--y": y + "%" }}>
            {t}
          </span>
        ))}
      </div>
      <div className="dg-cc__types" role="group" aria-label="Content type">
        {DGV_CC_T.map(([t], k) => (
          <button key={t} type="button" className={k === on ? "is-on" : ""} aria-pressed={k === on} onClick={() => pick(k)} onMouseEnter={() => pick(k)}>
            {t}
          </button>
        ))}
      </div>
    </div>
  );
}

/* Content — Content Intelligence Map: a knowledge graph around one audience question. */
const DGV_CM = [
  ["Intent", ["Learn", "Compare", "Decide"]],
  ["Topic", ["Core topic", "Sub-questions"]],
  ["Format", ["Guide", "Video", "Checklist"]],
  ["Content", ["Answer", "Proof", "Next step"]],
  ["Distribution", ["Search", "Social", "Email"]],
  ["Interaction", ["Reads", "Saves", "Replies"]],
  ["Learning", ["What to expand", "What to retire"]],
];
function DGV_ContentMap() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_CM.length, 1800, v);
  const P = dgRing(DGV_CM.length, 36);
  return (
    <div ref={ref} className={"dg-km" + (v ? " is-in" : "")}>
      <div className="dg-km__graph">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {P.map(([x, y], k) => (
            <line key={k} x1="50" y1="50" x2={x} y2={y} className={k === on ? "is-on" : ""} />
          ))}
        </svg>
        <div className="dg-km__q">
          <small>Audience question</small>
          <b>“Which option is right for us?”</b>
        </div>
        <ul className="dg-km__br">
          {DGV_CM.map(([t], k) => (
            <li key={t} style={{ "--x": P[k][0] + "%", "--y": P[k][1] + "%" }}>
              <button type="button" className={k === on ? "is-on" : ""} aria-pressed={k === on} onClick={() => pick(k)} onMouseEnter={() => pick(k)}>
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="dg-km__leaf" aria-live="polite" key={on}>
        <b>{DGV_CM[on][0]}</b>
        {DGV_CM[on][1].map((x, k) => (
          <span key={x} style={{ "--k": k }}>
            {x}
          </span>
        ))}
      </div>
    </div>
  );
}

/* Email / CRM — Customer Journey Orbit with behavioural signals. */
const DGV_JO = [
  ["Entry", "Signs up from a guide download"],
  ["Welcome", "Opens the welcome message"],
  ["Engage", "Clicks a product comparison"],
  ["Convert", "Requests a quote"],
  ["Retain", "Uses the onboarding series"],
  ["Reactivate", "Goes quiet — a different message is tried"],
];
function DGV_Orbit() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(DGV_JO.length, 1700, v);
  const P = dgRing(DGV_JO.length, 40, -90);
  return (
    <div ref={ref} className={"dg-jo" + (v ? " is-in" : "")}>
      <div className="dg-jo__sys">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <ellipse cx="50" cy="50" rx="40" ry="40" className="dg-jo__path" />
          {!ppR() &&
            [0, 1, 2].map((k) => (
              <circle key={k} r="1.1" className="dg-jo__p">
                <animateMotion dur="9s" begin={-k * 3 + "s"} repeatCount="indefinite" path="M50,10 A40,40 0 1,1 49.9,10" />
              </circle>
            ))}
        </svg>
        <div className="dg-jo__core">
          <small>Next message decided by</small>
          <b>Behaviour</b>
        </div>
        <ul className="dg-jo__st">
          {DGV_JO.map(([t], k) => (
            <li key={t} style={{ "--x": P[k][0] + "%", "--y": P[k][1] + "%" }}>
              <button type="button" className={k === on ? "is-on" : k < on ? "is-done" : ""} aria-pressed={k === on} onClick={() => pick(k)}>
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <p className="dg-jo__sig" aria-live="polite" key={on}>
        <i aria-hidden="true" />
        <span>Signal</span> {DGV_JO[on][1]}
      </p>
    </div>
  );
}

/* ── Sections ─────────────────────────────────────────────────────────────────────── */

/* Editorial manifesto: large statements revealed one by one. */
function DG_Manifesto({ id, kicker, lines, sub, chain, tone = "light" }) {
  const [ref, v] = ppIn(0.3);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-mf` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        {kicker && <span className="pp-kick">{kicker}</span>}
        <h2 id={id} className="dg-mf__lines">
          {lines.map((l, k) => (
            <span key={l} style={{ "--k": k }}>
              {l}
            </span>
          ))}
        </h2>
        {sub && <p className="dg-mf__sub">{sub}</p>}
        {chain && (
          <ol className="dg-chain">
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

/* Generic model vs how we operate — two tracks with a travelling marker. */
function DG_Contrast({ id, kicker = "How we operate", title, sub, generic, ours, genericLabel = "The usual agency model", oursLabel = "How Frequent Research operates", note, tone = "off" }) {
  const [ref, v] = ppIn(0.3);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-ct` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="dg-ct__track dg-ct__track--g">
          <small>{genericLabel}</small>
          <ol>
            {generic.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="dg-ct__track dg-ct__track--o">
          <small>{oursLabel}</small>
          <ol>
            {ours.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          <i className="dg-ct__run" aria-hidden="true" />
        </div>
        {note && <p className="dg-ct__note">{note}</p>}
      </div>
    </section>
  );
}

/* Digital Growth Engine — donut of segments. stages: [title, icon, line][] */
function DG_Engine({ id, kicker = "The Frequent Research Digital Growth Engine", title, sub, stages, tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(stages.length, 2400, v);
  const n = stages.length;
  const seg = (k) => {
    const a0 = ((k * 360) / n - 90 + 1.4) * (Math.PI / 180);
    const a1 = (((k + 1) * 360) / n - 90 - 1.4) * (Math.PI / 180);
    const R = 46,
      r = 30;
    const p = (rad, a) => [50 + rad * Math.cos(a), 50 + rad * Math.sin(a)];
    const [x0, y0] = p(R, a0),
      [x1, y1] = p(R, a1),
      [x2, y2] = p(r, a1),
      [x3, y3] = p(r, a0);
    return `M${x0},${y0} A${R},${R} 0 0,1 ${x1},${y1} L${x2},${y2} A${r},${r} 0 0,0 ${x3},${y3} Z`;
  };
  const S = stages[on];
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-en` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container dg-en__in">
        <div className="dg-en__wheel">
          <svg viewBox="0 0 100 100" role="group" aria-label={title}>
            {stages.map(([t], k) => (
              <path key={t} d={seg(k)} className={k === on ? "is-on" : k < on ? "is-done" : ""} tabIndex={0} role="button" aria-label={String(k + 1).padStart(2, "0") + " " + t} aria-pressed={k === on} onClick={() => pick(k)} onMouseEnter={() => pick(k)} onFocus={() => pick(k)} onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), pick(k))} />
            ))}
          </svg>
          <div className="dg-en__hub" aria-live="polite">
            <em>{String(on + 1).padStart(2, "0")}</em>
            <b>{S[0]}</b>
          </div>
        </div>
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <div className="dg-en__pane" key={on}>
            <PpI n={S[1]} s={20} />
            <div>
              <b>
                {String(on + 1).padStart(2, "0")} — {S[0]}
              </b>
              <p>{S[2]}</p>
            </div>
          </div>
          <ol className="dg-en__list">
            {stages.map(([t], k) => (
              <li key={t}>
                <button type="button" className={k === on ? "is-on" : ""} onClick={() => pick(k)}>
                  {String(k + 1).padStart(2, "0")} {t}
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* Business value rail — verbs along a line with a moving highlight. items: [verb, line][] */
function DG_ValueRail({ id, kicker = "What changes for the business", title, sub, items, tone = "light" }) {
  const [ref, v] = ppIn(0.3);
  const [on, pick] = rlCycle(items.length, 1600, v);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-vr` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <ol className="dg-vr__rail" style={{ "--p": (on / (items.length - 1)) * 100 + "%", "--n": items.length }}>
          {items.map(([t, d], k) => (
            <li key={t} className={k === on ? "is-on" : k < on ? "is-done" : ""}>
              <button type="button" onClick={() => pick(k)} onMouseEnter={() => pick(k)} aria-pressed={k === on}>
                <i aria-hidden="true" />
                <b>{t}</b>
                <small>{d}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* "What does the business need?" — command-line style decision. options: [need, [[service, slug]], why][] */
function DG_Need({ id, kicker = "Business first, channel second", title, sub, options, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const O = options[on];
  return (
    <DK_Sec tone={tone} className="dg-nd" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="dg-nd__in">
        <ul className="dg-nd__opts" role="tablist" aria-label={title}>
          {options.map(([t], k) => (
            <li key={t} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                <span aria-hidden="true">›</span> {t}
              </button>
            </li>
          ))}
        </ul>
        <div className="dg-nd__term" role="tabpanel" key={on} aria-live="polite">
          <div className="dg-nd__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>recommendation</span>
          </div>
          <p className="dg-nd__in1">
            <span>need</span> “{O[0]}”
          </p>
          <p className="dg-nd__why">{O[2]}</p>
          <div className="dg-nd__svc">
            {O[1].map(([t, s]) => (
              <PpL key={t} to={s.startsWith("/") ? s : ppDm(s)} className="dg-nd__chip">
                {t} <span aria-hidden="true">→</span>
              </PpL>
            ))}
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* AI-Assisted Marketing Lab — three stages, tokens flowing. */
function DG_AiLab({ id, kicker = "AI-assisted. Human-led.", title = "AI Can Find the Signal. People Decide What It Means.", sub, ai, human, action, tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(3, 2600, v);
  const cols = [
    ["AI support", "cpu", ai],
    ["Human judgement", "users", human],
    ["Action", "rocket", action],
  ];
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-ai` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="dg-ai__lab">
          {cols.map(([t, ic, items], k) => (
            <div key={t} className={"dg-ai__col" + (k === on ? " is-on" : "")} onMouseEnter={() => pick(k)}>
              <button type="button" className="dg-ai__h" aria-pressed={k === on} onClick={() => pick(k)}>
                <PpI n={ic} s={16} />
                {t}
              </button>
              <ul>
                {items.map((x, j) => (
                  <li key={x} style={{ "--k": j }}>
                    {x}
                  </li>
                ))}
              </ul>
              {k < 2 && <i className="dg-ai__flow" aria-hidden="true" />}
            </div>
          ))}
        </div>
        <ol className="dg-chain dg-chain--dark">
          {["Signal", "AI assistance", "Human interpretation", "Action", "Measurement", "Learning"].map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Marketing + technology — layered architecture around the customer. layers: [layerName, [[item, icon]]][] */
function DG_TechStack({ id, kicker = "Marketing + technology", title, sub, layers, note, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  return (
    <DK_Sec tone={tone} className="dg-ts" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="dg-ts__cust" aria-hidden="true">
        <PpI n="user" s={18} /> Customer
      </div>
      <ol className="dg-ts__layers">
        {layers.map(([t, items, d], k) => (
          <li key={t} className={k === on ? "is-on" : ""} onMouseEnter={() => setOn(k)}>
            <button type="button" className="dg-ts__lab" aria-expanded={k === on} onClick={() => setOn(k)}>
              {t}
            </button>
            <div className="dg-ts__items">
              {items.map(([x, ic]) => (
                <span key={x}>
                  <PpI n={ic} s={13} />
                  {x}
                </span>
              ))}
            </div>
            {k === on && <p className="dg-ts__d">{d}</p>}
          </li>
        ))}
      </ol>
      {note && <p className="dg-ts__note">{note}</p>}
    </DK_Sec>
  );
}

/* Signals — "Look beyond the dashboard". signals: [name, question, icon, amplitude 1-5][] */
function DG_Signals({ id, kicker = "Signal intelligence", title = "Look Beyond the Dashboard", sub, signals, tone = "dark" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(signals.length, 1800, v);
  const amp = signals[on][3];
  const wave = Array.from({ length: 41 }, (_, k) => `${k * 5},${30 - Math.sin(k * 0.55 + on) * amp * 4.5}`).join(" ");
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-sg` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <svg className="dg-sg__wave" viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
          <polyline points={wave} />
        </svg>
        <ol className="dg-sg__flow">
          {signals.map(([t, q, ic], k) => (
            <li key={t} className={k === on ? "is-on" : ""}>
              <button type="button" onClick={() => pick(k)} onMouseEnter={() => pick(k)} aria-pressed={k === on}>
                <PpI n={ic} s={15} />
                <b>{t}</b>
                <small>{q}</small>
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Vanity vs value — metrics only make sense with context. pairs: [vanity, signal][] */
function DG_Vanity({ id, kicker = "Context over vanity", title, sub, pairs, note, tone = "light" }) {
  const [ctx, setCtx] = ee.useState(false);
  const [ref, v] = ppIn(0.4);
  ee.useEffect(() => {
    if (!v) return;
    if (ppR()) return setCtx(true);
    const t = setTimeout(() => setCtx(true), 1100);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-vv` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <button type="button" className="dg-vv__tog" aria-pressed={ctx} onClick={() => setCtx(!ctx)}>
          <i aria-hidden="true" />
          {ctx ? "Context added" : "Add business context"}
        </button>
        <div className={"dg-vv__in" + (ctx ? " is-ctx" : "")}>
          <div className="dg-vv__col">
            <small>Activity metrics</small>
            <ul>
              {pairs.map(([a]) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="dg-vv__mid" aria-hidden="true">
            {pairs.map((_, k) => (
              <i key={k} style={{ "--k": k }} />
            ))}
          </div>
          <div className="dg-vv__col dg-vv__col--v">
            <small>Business signals</small>
            <ul>
              {pairs.map(([, b], k) => (
                <li key={b} style={{ "--k": k }}>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {note && <p className="dg-vv__note">{note}</p>}
      </div>
    </section>
  );
}

/* The Growth Loop — circular, orbiting marker. steps: string[] */
function DG_Loop({ id, kicker = "The growth loop", title, sub, steps, tone = "off" }) {
  const [ref, v] = ppIn(0.25);
  const [on, pick] = rlCycle(steps.length, 1300, v);
  const P = dgRing(steps.length, 37);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-lp` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container dg-lp__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <ol className="dg-lp__list">
            {steps.map((t, k) => (
              <li key={t} className={k === on ? "is-on" : ""}>
                <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
                  {t}
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="dg-lp__ring" aria-hidden="true">
          <svg viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="41" />
            <circle cx="50" cy="50" r="41" className="dg-lp__arc" style={{ strokeDashoffset: 258 - (258 * (on + 1)) / steps.length }} />
          </svg>
          {steps.map((t, k) => (
            <span key={t} className={k === on ? "is-on" : k < on ? "is-done" : ""} style={{ "--x": P[k][0] + "%", "--y": P[k][1] + "%" }}>
              {t}
            </span>
          ))}
          <b>{steps[on]}</b>
        </div>
      </div>
    </section>
  );
}

/* Why Frequent Research — each differentiator with its own motif. items: [title, text, motif][] */
function DG_Motif({ m }) {
  if (m === "split")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="8" y="16" width="44" height="48" rx="8" className="a" />
        <path d="M60 40 H72" className="l" />
        <rect x="76" y="10" width="36" height="16" rx="5" className="b" />
        <rect x="76" y="32" width="36" height="16" rx="5" className="b" />
        <rect x="76" y="54" width="36" height="16" rx="5" className="b" />
      </svg>
    );
  if (m === "bridge")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <circle cx="18" cy="40" r="10" className="a" />
        <circle cx="102" cy="40" r="10" className="a" />
        <path d="M28 40 C 50 10, 70 70, 92 40" className="l" />
      </svg>
    );
  if (m === "dual")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <circle cx="44" cy="40" r="26" className="b" />
        <circle cx="76" cy="40" r="26" className="b" />
        <path d="M60 18 V62" className="l" />
      </svg>
    );
  if (m === "stack")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        {[0, 1, 2, 3].map((k) => (
          <rect key={k} x={20 + k * 6} y={12 + k * 15} width={80 - k * 12} height="11" rx="4" className={k === 0 ? "a" : "b"} />
        ))}
      </svg>
    );
  if (m === "hand")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <rect x="10" y="24" width="34" height="32" rx="8" className="b" />
        <path d="M44 40 H76" className="l" />
        <circle cx="94" cy="40" r="16" className="a" />
      </svg>
    );
  if (m === "signal")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        <polyline points="6,60 26,52 40,58 56,30 70,40 86,16 112,22" className="l" />
        <circle cx="86" cy="16" r="5" className="a" />
      </svg>
    );
  if (m === "web")
    return (
      <svg viewBox="0 0 120 80" aria-hidden="true">
        {[
          [20, 18],
          [100, 18],
          [20, 62],
          [100, 62],
        ].map(([x, y], k) => (
          <g key={k}>
            <path d={`M60 40 L${x} ${y}`} className="l" />
            <circle cx={x} cy={y} r="7" className="b" />
          </g>
        ))}
        <circle cx="60" cy="40" r="11" className="a" />
      </svg>
    );
  return (
    <svg viewBox="0 0 120 80" aria-hidden="true">
      <circle cx="60" cy="40" r="28" className="l" />
      <circle cx="88" cy="40" r="6" className="a" />
    </svg>
  );
}
function DG_Why({ id, kicker = "Why Frequent Research", title, sub, items, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const I = items[on];
  return (
    <DK_Sec tone={tone} className="dg-wy" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
      <div className="dg-wy__in">
        <ol className="dg-wy__list" role="tablist" aria-label={title}>
          {items.map(([t], k) => (
            <li key={t} role="presentation">
              <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                <em>{String(k + 1).padStart(2, "0")}</em>
                {t}
              </button>
            </li>
          ))}
        </ol>
        <div className="dg-wy__card" role="tabpanel" key={on} aria-live="polite">
          <div className={"dg-wy__motif dg-wy__motif--" + I[2]}>
            <DG_Motif m={I[2]} />
          </div>
          <h3>{I[0]}</h3>
          <p>{I[1]}</p>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Digital Marketing Operating System — a boot sequence of layers. layers: [name, line][] */
function DG_OS({ id, kicker = "The digital marketing operating system", title, sub, layers, tone = "dark" }) {
  const [ref, v] = ppIn(0.3);
  const [at, setAt] = ee.useState(ppR() ? layers.length : 0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    setAt(0);
    const t = setInterval(() => setAt((x) => (x >= layers.length ? x : x + 1)), 380);
    return () => clearInterval(t);
  }, [v, layers.length]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-os` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container dg-os__in">
        <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
        <div className="dg-os__win">
          <div className="dg-os__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>growth-os</span>
          </div>
          <ol>
            {layers.map(([t, d], k) => (
              <li key={t} className={k < at ? "is-on" : ""}>
                <em>{k < at ? "✓" : "·"}</em>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <p className="dg-os__out">{at >= layers.length ? "→ Business learning: the next decision starts better informed." : "…"}</p>
        </div>
      </div>
    </section>
  );
}

/* Closing statement — "Marketing that learns". */
function DG_Close({ id, title, text, chain, lines, cta, formId, cta2, to2 }) {
  return (
    <section className="dg-cl" aria-labelledby={id}>
      <div className="container">
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        {chain && (
          <ol className="dg-chain dg-chain--dark">
            {chain.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        )}
        {lines && (
          <p className="dg-cl__lines">
            {lines.map((l) => (
              <span key={l}>{l}</span>
            ))}
          </p>
        )}
        <p className="dg-cl__motto">
          {DG_MOTTO.map((m) => (
            <b key={m}>{m}</b>
          ))}
        </p>
        <div className="pp-ctas pp-ctas--c">
          <a href={"#" + formId} onClick={ppGo(formId)} className="btn btn--lg pp-btn">
            {cta} <span aria-hidden="true">→</span>
          </a>
          {cta2 && (
            <PpL to={to2} className="btn btn--lg pp-btn-ghost">
              {cta2}
            </PpL>
          )}
        </div>
      </div>
    </section>
  );
}

/* Frequent Research Advantage — editorial statement with points. style: "split" | "dark" | "rule" */
function DG_Advantage({ id, kicker = "The Frequent Research advantage", title, claim, points, style = "split" }) {
  return (
    <DK_Sec tone={style === "dark" ? "dark" : "light"} className={"dg-ad dg-ad--" + style} label={id}>
      <div className="dg-ad__in">
        <div className="dg-ad__head">
          <span className="pp-kick">{kicker}</span>
          <h2 id={id}>{title}</h2>
          {claim && <p className="dg-ad__claim">{claim}</p>}
        </div>
        <ol className="dg-ad__pts">
          {points.map(([t, d], k) => (
            <li key={t} style={{ "--k": k }}>
              <em>{String(k + 1).padStart(2, "0")}</em>
              <b>{t}</b>
              <p>{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </DK_Sec>
  );
}

/* "What this changes for your business" — styles: "ribbons" | "tiles" | "ticks" | "split" */
function DG_Changes({ id, kicker = "What this changes for your business", title, sub, items, style = "tiles", tone = "off" }) {
  return (
    <DK_Sec tone={tone} className={"dg-ch dg-ch--" + style} label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center={style !== "split"} light={tone === "dark"} />
      <ul className="dg-ch__list">
        {items.map(([t, d, ic], k) => (
          <li key={t} style={{ "--k": k }}>
            {ic && (
              <span className="dg-ch__ic">
                <PpI n={ic} s={17} />
              </span>
            )}
            <b>{t}</b>
            <p>{d}</p>
          </li>
        ))}
      </ul>
    </DK_Sec>
  );
}

/* "How we operate" — principles. styles: "numbers" | "quotes" | "cols" */
function DG_Operate({ id, kicker = "How we operate", title, sub, items, style = "numbers", tone = "light" }) {
  return (
    <DK_Sec tone={tone} className={"dg-op dg-op--" + style} label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center={style === "quotes"} />
      <ol className="dg-op__list">
        {items.map(([t, d], k) => (
          <li key={t} style={{ "--k": k }}>
            <em aria-hidden="true">{style === "quotes" ? "“" : String(k + 1).padStart(2, "0")}</em>
            <b>{t}</b>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </DK_Sec>
  );
}

/* Capabilities as an accordion (one open at a time). items: [title, value, includes[]][] */
function DG_Accordion({ id, kicker = "What we do", title, sub, items, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  return (
    <DK_Sec tone={tone} className="dg-acc" label={id}>
      <div className="dg-acc__in">
        <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
        <ul className="dg-acc__list">
          {items.map(([t, d, inc], k) => (
            <li key={t} className={on === k ? "is-on" : ""}>
              <h3>
                <button type="button" aria-expanded={on === k} onClick={() => setOn(on === k ? -1 : k)}>
                  <em>{String(k + 1).padStart(2, "0")}</em>
                  {t}
                  <i aria-hidden="true" />
                </button>
              </h3>
              {on === k && (
                <div className="dg-acc__body">
                  <p>{d}</p>
                  <div>
                    {inc.map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </DK_Sec>
  );
}

/* AI in this service — compact paired list. pairs: [aiDoes, humanDecides][] */
function DG_AiPairs({ id, kicker = "AI-assisted. Human-led.", title, sub, pairs, tone = "off" }) {
  return (
    <DK_Sec tone={tone} className="dg-ap" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="dg-ap__head" aria-hidden="true">
        <span>
          <PpI n="cpu" s={14} /> AI assists
        </span>
        <span>
          <PpI n="users" s={14} /> We decide
        </span>
      </div>
      <ul className="dg-ap__list">
        {pairs.map(([a, h], k) => (
          <li key={a} style={{ "--k": k }}>
            <span className="dg-ap__a">{a}</span>
            <i aria-hidden="true" />
            <span className="dg-ap__h">{h}</span>
          </li>
        ))}
      </ul>
    </DK_Sec>
  );
}

/* SEO — topic cluster explorer. clusters: [intent, hub, spokes[]][] */
function DG_Clusters({ id, kicker, title, sub, clusters, tone = "dark" }) {
  const [on, setOn] = ee.useState(0);
  const C = clusters[on];
  const P = dgRing(C[2].length, 36, -60);
  return (
    <DK_Sec tone={tone} className="dg-cl2" label={id}>
      <div className="dg-cl2__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <div className="dg-cl2__tabs" role="tablist" aria-label="Search intent">
            {clusters.map(([t], k) => (
              <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="dg-cl2__map" key={on}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            {P.map(([x, y], k) => (
              <line key={k} x1="50" y1="50" x2={x} y2={y} />
            ))}
          </svg>
          <b className="dg-cl2__hub">{C[1]}</b>
          <ul>
            {C[2].map((t, k) => (
              <li key={t} style={{ "--x": P[k][0] + "%", "--y": P[k][1] + "%", "--k": k }}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Performance — budget allocation concept: pick an objective, bars re-balance (relative shapes only). */
function DG_Allocate({ id, kicker, title, sub, channels, objectives, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const O = objectives[on];
  return (
    <DK_Sec tone={tone} className="dg-al" label={id}>
      <div className="dg-al__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <div className="dg-al__obj" role="tablist" aria-label="Business objective">
            {objectives.map(([t], k) => (
              <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                {t}
              </button>
            ))}
          </div>
          <p className="dg-al__why" key={on}>
            {O[2]}
          </p>
        </div>
        <ul className="dg-al__bars" aria-label={"Relative emphasis for " + O[0]}>
          {channels.map(([t, ic], k) => (
            <li key={t}>
              <span>
                <PpI n={ic} s={13} />
                {t}
              </span>
              <i>
                <b style={{ width: O[1][k] + "%" }} />
              </i>
            </li>
          ))}
          <li className="dg-al__note">Relative emphasis only — real allocation follows the evidence.</li>
        </ul>
      </div>
    </DK_Sec>
  );
}

/* Social — momentum vs spikes (shape-only chart). */
function DG_Momentum({ id, kicker, title, sub, notes, tone = "dark" }) {
  const [ref, v] = ppIn(0.3);
  const [m, setM] = ee.useState(1);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dg-mo` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container dg-mo__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <div className="dg-mo__seg" role="group" aria-label="Pattern">
            <button type="button" className={m === 0 ? "is-on" : ""} aria-pressed={m === 0} onClick={() => setM(0)}>
              Campaign spikes
            </button>
            <button type="button" className={m === 1 ? "is-on" : ""} aria-pressed={m === 1} onClick={() => setM(1)}>
              Brand momentum
            </button>
          </div>
          <p className="dg-mo__note" key={m}>
            {notes[m]}
          </p>
        </div>
        <svg className={"dg-mo__chart is-m" + m} viewBox="0 0 200 100" role="img" aria-label={m ? "A line that rises steadily over time" : "A line with isolated spikes that fall back to the baseline"}>
          <line x1="0" y1="90" x2="200" y2="90" className="base" />
          <polyline className="spk" points="0,88 20,86 28,30 36,86 70,87 80,22 90,86 130,87 140,34 150,86 200,87" />
          <polyline className="mom" points="0,88 25,82 50,76 75,68 100,58 125,50 150,40 175,30 200,22" />
        </svg>
      </div>
    </section>
  );
}

/* Content — question type → format and distribution. rows: [questionType, example, formats[], channels[]][] */
function DG_Formats({ id, kicker, title, sub, rows, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const R = rows[on];
  return (
    <DK_Sec tone={tone} className="dg-fm" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
      <div className="dg-fm__in">
        <div className="dg-fm__qs" role="tablist" aria-label="Question type">
          {rows.map(([t, ex], k) => (
            <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
              <b>{t}</b>
              <small>“{ex}”</small>
            </button>
          ))}
        </div>
        <div className="dg-fm__out" role="tabpanel" key={on} aria-live="polite">
          <div>
            <small>Formats that answer it</small>
            {R[2].map((x, k) => (
              <span key={x} style={{ "--k": k }}>
                {x}
              </span>
            ))}
          </div>
          <div>
            <small>Where it should travel</small>
            {R[3].map((x, k) => (
              <span key={x} className="ch" style={{ "--k": k }}>
                {x}
              </span>
            ))}
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Email — behaviour → next message simulator. rows: [behaviour, icon, subject, why][] */
function DG_NextMessage({ id, kicker, title, sub, rows, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const R = rows[on];
  return (
    <DK_Sec tone={tone} className="dg-nm" label={id}>
      <div className="dg-nm__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <ul className="dg-nm__beh" role="tablist" aria-label="Customer behaviour">
            {rows.map(([t, ic], k) => (
              <li key={t} role="presentation">
                <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                  <PpI n={ic} s={14} />
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="dg-nm__mail" role="tabpanel" key={on} aria-live="polite">
          <div className="dg-nm__mh">
            <i />
            <span>Next message</span>
          </div>
          <b>{R[2]}</b>
          <i className="dg-nm__ln" />
          <i className="dg-nm__ln dg-nm__ln--s" />
          <p>
            <small>Why this one:</small> {R[3]}
          </p>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Connected services — a slim row of next steps. links: [title, why, slug][] */
function DG_Next({ id, kicker = "Connected services", title, links, tone = "light" }) {
  return (
    <DK_Sec tone={tone} className="dg-nx" label={id}>
      <div className="dg-nx__in">
        <PP_Head k={kicker} id={id} t={title} light={tone === "dark"} />
        <ul className="dg-nx__list">
          {links.map(([t, why, s], k) => (
            <li key={t} style={{ "--k": k }}>
              <PpL to={ppDm(s)}>
                <b>{t}</b>
                <span>{why}</span>
                <em aria-hidden="true">→</em>
              </PpL>
            </li>
          ))}
        </ul>
      </div>
    </DK_Sec>
  );
}

export { DGV_Constellation, DGV_ContentMap, DGV_ControlRoom, DGV_FlightDeck, DGV_Orbit, DGV_Search, DG_Accordion, DG_Advantage, DG_AiLab, DG_AiPairs, DG_Allocate, DG_Changes, DG_Close, DG_Clusters, DG_Contrast, DG_Engine, DG_Formats, DG_Loop, DG_Manifesto, DG_Momentum, DG_Need, DG_Next, DG_NextMessage, DG_OS, DG_Operate, DG_Signals, DG_TechStack, DG_ValueRail, DG_Vanity, DG_Why };
