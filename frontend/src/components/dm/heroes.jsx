/*
 * Service-specific hero visuals for the Digital Marketing pages (build 32). Prefix HV_ ; styles in
 * src/styles/dm-heroes.css (prefix hv-). Every visual is a methodology illustration: example labels only,
 * no real data, no metrics presented as results. Each is keyboard-usable where interactive and
 * respects reduced motion (rlCycle / ppR).
 */
import * as ee from 'react';
import { PpI, ppIn, ppR } from './shared.jsx';
import { rlCycle } from './kit4.jsx';

/* Shared frame: label + "Example" chip. */
function HV_Frame({ label, chip = null, cls, children, v, refEl }) {
  return (
    <div ref={refEl} className={"hv " + cls + (v ? " is-in" : "")}>
      <div className="hv__top">
        <span>{label}</span>
        {chip && <em>{chip}</em>}
      </div>
      {children}
    </div>
  );
}

/* 1 · SEO — Search Intelligence Map: audience questions cluster around search intents. */

/* 2 · PPC — Intent-to-Budget Flow: the same budget spread evenly vs placed behind evidence (relative only). */
const HV_PPC_ROWS = [
  ["High purchase intent", "target", 25, 46],
  ["Commercial research", "search", 25, 30],
  ["Early research", "file", 25, 19],
  ["Low-fit searches", "eyeoff", 25, 5],
];
function HV_IntentBudget() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(2, 3000, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-ppc" label="Intent-to-budget flow" chip="Relative, not real spend">
      <div className="hv-ppc__tabs" role="group" aria-label="Budget view">
        {["Spread evenly", "Behind evidence"].map((t, k) => (
          <button key={t} type="button" aria-pressed={on === k} className={on === k ? "is-on" : ""} onClick={() => pick(k)}>
            {t}
          </button>
        ))}
      </div>
      <ul className="hv-ppc__rows">
        {HV_PPC_ROWS.map(([t, ic, a, b]) => (
          <li key={t}>
            <b>
              <PpI n={ic} s={14} />
              {t}
            </b>
            <span className="hv-ppc__bar" aria-hidden="true">
              <i style={{ width: (on ? b : a) * 2 + "%" }} />
            </span>
          </li>
        ))}
      </ul>
      <ol className="hv-chain">
        {["Search intent", "Audience segment", "Ad message", "Landing page", "Conversion", "Business signal"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 3 · Social — Audience Conversation Network. */

/* 4 · Social advertising — Audience × Creative Matrix. */
const HV_AC_AUD = ["Audience A · price-conscious", "Audience B · quality-first", "Audience C · time-poor"];
const HV_AC_MSG = ["Message A · value", "Message B · proof", "Message C · speed"];
function HV_AudCreative() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(3, 1800, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-ac" label="Audience × creative matrix">
      <div className="hv-ac__grid" role="table" aria-label="Audiences matched to messages">
        <span role="columnheader" />
        {HV_AC_MSG.map((m) => (
          <span key={m} role="columnheader" className="hv-ac__h">
            {m}
          </span>
        ))}
        {HV_AC_AUD.map((a, r) => (
          <ee.Fragment key={a}>
            <button type="button" role="rowheader" className={"hv-ac__a" + (r === on ? " is-on" : "")} onClick={() => pick(r)} aria-pressed={r === on}>
              {a}
            </button>
            {HV_AC_MSG.map((m, c) => (
              <span key={m} role="cell" className={"hv-ac__c" + (c === r ? " is-fit" : "") + (r === on ? " is-row" : "")}>
                {c === r ? "Match" : ""}
              </span>
            ))}
          </ee.Fragment>
        ))}
      </div>
      <ol className="hv-chain">
        {["Performance signals", "Learning", "Optimisation"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 5 · Content — Insight-to-Content Engine. */

/* 6 · Performance — Performance Learning Loop over the journey. */

/* 7 · Lead generation — ICP-to-Qualified-Lead Journey (gates narrow the field). */
const HV_LF = [
  ["Market", 18],
  ["ICP", 13],
  ["Audience", 10],
  ["Intent", 7],
  ["Lead", 5],
  ["Qualified", 3],
];
function HV_LeadFunnel() {
  const [ref, v] = ppIn(0.05);
  const [on] = rlCycle(HV_LF.length, 1100, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-lf" label="ICP-to-qualified-lead journey" chip="Shapes, not counts">
      <ol className="hv-lf__gates">
        {HV_LF.map(([t, n], k) => (
          <li key={t} className={(k <= on ? "is-on " : "") + (k === HV_LF.length - 1 ? "is-last" : "")} style={{ "--w": 100 - k * 11 + "%" }}>
            <b>{t}</b>
            <span aria-hidden="true">
              {Array.from({ length: n }, (_, j) => (
                <i key={j} />
              ))}
            </span>
          </li>
        ))}
      </ol>
      <p className="hv-lf__back">↺ Sales feedback refines the ICP</p>
    </HV_Frame>
  );
}

/* 8 · B2B — Buying Committee Journey: roles join the journey at different stages. */
const HV_BC_ST = ["Research", "Shortlist", "Evaluate", "Decide"];
const HV_BC_R = [
  ["Champion", 0, "Needs a solution"],
  ["User", 0, "Day-to-day fit"],
  ["Influencer", 1, "Shapes criteria"],
  ["Technical evaluator", 2, "Proof it works"],
  ["Finance", 2, "Investment case"],
  ["Procurement", 3, "Terms and risk"],
  ["Decision maker", 3, "Final approval"],
];
function HV_Committee() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(HV_BC_ST.length, 2000, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-bc" label="Buying committee journey">
      <div className="hv-bc__grid">
        {HV_BC_ST.map((s, k) => (
          <div key={s} className={"hv-bc__col" + (k === on ? " is-on" : "") + (k < on ? " is-done" : "")}>
            <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
              <em>{String(k + 1).padStart(2, "0")}</em>
              {s}
            </button>
            <ul>
              {HV_BC_R.filter((r) => r[1] === k).map(([t, , n]) => (
                <li key={t}>
                  <b>{t}</b>
                  <small>{n}</small>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ol className="hv-chain">
        {["Business", "Buying committee", "Information needs", "Touchpoints", "Content", "Lead", "Sales journey"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 9 · Email — Lifecycle Communication Flow with a behaviour branch. */

/* 11 · Influencer — Influence Relevance Matrix: reach lens vs relevance lens. */
const HV_IR = [
  ["Creator A", 82, 22],
  ["Creator B", 68, 70],
  ["Creator C", 30, 84],
  ["Creator D", 18, 40],
  ["Creator E", 48, 58],
  ["Creator F", 90, 50],
];
function HV_Relevance() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(2, 3000, v);
  const hit = (x, y) => (on === 0 ? x > 60 : y > 55);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-ir" label="Influence relevance matrix">
      <div className="hv-ir__tabs" role="group" aria-label="Selection lens">
        {["Reach lens", "Relevance lens"].map((t, k) => (
          <button key={t} type="button" aria-pressed={on === k} className={on === k ? "is-on" : ""} onClick={() => pick(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className={"hv-ir__plot" + (on ? " is-rel" : "")}>
        <i className="hv-ir__zone" aria-hidden="true" />
        <span className="hv-ir__y">Audience relevance ↑</span>
        <span className="hv-ir__x">Reach →</span>
        {HV_IR.map(([t, x, y]) => (
          <span key={t} className={"hv-ir__d" + (hit(x, y) ? " is-on" : "")} style={{ left: x + "%", bottom: y + "%" }}>
            {t}
          </span>
        ))}
      </div>
      <p className="hv-note">{on === 0 ? "Reach alone picks the biggest audiences." : "Relevance picks the audiences that fit your customer."}</p>
    </HV_Frame>
  );
}

/* 12 · Video — Insight-to-Story Pipeline (storyboard frames with a playhead). */
const HV_VS = [
  ["Insight", "What the audience needs to understand"],
  ["Story", "The narrative that answers it"],
  ["Script", "Words, visuals, structure"],
  ["Video", "Produced for the platform"],
  ["Distribution", "Where the audience watches"],
  ["Behaviour", "Watch time, actions"],
  ["Learning", "What to make next"],
];
function HV_Storyboard() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(HV_VS.length, 1400, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-vs" label="Insight-to-story pipeline">
      <ol className="hv-vs__strip">
        {HV_VS.map(([t, d], k) => (
          <li key={t} className={(k === on ? "is-on " : "") + (k < on ? "is-done" : "")}>
            <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
              <span className="hv-vs__frame" aria-hidden="true">
                <i />
              </span>
              <b>{t}</b>
            </button>
          </li>
        ))}
      </ol>
      <div className="hv-vs__bar" aria-hidden="true">
        <i style={{ width: ((on + 1) / HV_VS.length) * 100 + "%" }} />
      </div>
      <p className="hv-note" aria-live="polite">
        <b>{HV_VS[on][0]}:</b> {HV_VS[on][1]}
      </p>
    </HV_Frame>
  );
}

/* 13 · E-commerce — Commerce Journey with behavioural signals. */
const HV_CJ = [
  ["Discover", "Search term"],
  ["Consider", "Filters used"],
  ["Product", "Reviews read"],
  ["Cart", "Cart abandoned?"],
  ["Checkout", "Payment choice"],
  ["Purchase", "Order value"],
  ["Repeat", "Return visit"],
];
function HV_Commerce() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(HV_CJ.length, 1300, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-cj" label="Commerce journey">
      <ol className="hv-cj__track" style={{ "--p": on / (HV_CJ.length - 1) }}>
        {HV_CJ.map(([t, s], k) => (
          <li key={t} className={(k === on ? "is-on " : "") + (k < on ? "is-done" : "")}>
            <small className="hv-cj__sig">{s}</small>
            <button type="button" onClick={() => pick(k)} aria-pressed={k === on}>
              <i aria-hidden="true" />
              {t}
            </button>
          </li>
        ))}
      </ol>
      <p className="hv-note">Behavioural signals show where shoppers hesitate — and why they come back.</p>
    </HV_Frame>
  );
}

/* 14 · Landing page — Conversion Anatomy: each element reveals its purpose. */
const HV_LA = [
  ["Headline", "Matches the promise that brought the visitor here.", "hd"],
  ["Answer", "Answers the visitor's question before asking for anything.", "an"],
  ["Proof", "Trust signals that remove doubt.", "pr"],
  ["Objections", "Addresses the reasons people hesitate.", "ob"],
  ["Call to action", "One clear next step.", "ct"],
  ["Form", "Only the fields that are really needed.", "fm"],
];
function HV_Anatomy() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(HV_LA.length, 1800, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-la" label="Conversion anatomy">
      <div className="hv-la__in">
        <div className="hv-la__page" aria-hidden="true">
          {HV_LA.map(([, , c], k) => (
            <i key={c} className={"hv-la__b hv-la__b--" + c + (k === on ? " is-on" : "")} />
          ))}
        </div>
        <ol className="hv-la__list">
          {HV_LA.map(([t], k) => (
            <li key={t}>
              <button type="button" className={k === on ? "is-on" : ""} onClick={() => pick(k)} aria-pressed={k === on}>
                <em>{k + 1}</em>
                {t}
              </button>
            </li>
          ))}
        </ol>
      </div>
      <p className="hv-note" aria-live="polite">
        <b>{HV_LA[on][0]}:</b> {HV_LA[on][1]}
      </p>
    </HV_Frame>
  );
}

/* 15 · Consulting — Decision Intelligence Framework. */
const HV_DF_OPT = ["Option A · fix conversion first", "Option B · enter a new segment", "Option C · rebalance channels"];
function HV_Decision() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(3, 2400, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-df" label="Decision intelligence framework">
      <div className="hv-df__q">
        <small>Business question</small>
        <b>Where should next year's marketing investment go?</b>
      </div>
      <ul className="hv-df__ev">
        {["Audience evidence", "Market data", "Channel performance", "Customer feedback"].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <ul className="hv-df__opt">
        {HV_DF_OPT.map((t, k) => (
          <li key={t}>
            <button type="button" className={k === on ? "is-on" : ""} onClick={() => pick(k)} aria-pressed={k === on}>
              {t}
            </button>
          </li>
        ))}
      </ul>
      <ol className="hv-chain">
        {["Decision", "Activation", "Measurement"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 16 · ORM — Perception Intelligence Map: themes sized by volume, coloured by sentiment (example). */
const HV_PM = [
  ["Delivery speed", 22, 30, 3, "n"],
  ["Product quality", 68, 26, 4, "p"],
  ["Support response", 38, 64, 4, "n"],
  ["Pricing", 80, 64, 2, "m"],
  ["Ease of use", 14, 74, 2, "p"],
  ["Returns", 64, 84, 2, "m"],
];
function HV_Perception() {
  const [ref, v] = ppIn(0.05);
  const [on, pick] = rlCycle(HV_PM.length, 1600, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-pm" label="Perception intelligence map">
      <div className="hv-pm__map">
        {HV_PM.map(([t, x, y, s, c], k) => (
          <button key={t} type="button" className={"hv-pm__b hv-pm__b--" + c + (k === on ? " is-on" : "")} style={{ left: x + "%", top: y + "%", "--s": s }} onClick={() => pick(k)} aria-pressed={k === on}>
            {t}
          </button>
        ))}
      </div>
      <ul className="hv-pm__legend">
        <li className="is-p">Positive</li>
        <li className="is-m">Mixed</li>
        <li className="is-n">Negative</li>
      </ul>
      <ol className="hv-chain">
        {["Voice of customer", "Sentiment", "Themes", "Risk", "Response", "Improvement"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 17 · Automation — Trigger-to-Action Workflow with a decision branch. */
function HV_Workflow() {
  const [ref, v] = ppIn(0.05);
  const [on] = rlCycle(6, 1100, v);
  const N = [
    ["Signal", "Visited pricing page twice", "s"],
    ["Decision", "In target segment and consented?", "d"],
    ["Yes → action", "Send the relevant comparison guide", "y"],
    ["No → wait", "Hold; keep listening for intent", "w"],
    ["Response", "Opened and clicked", "r"],
    ["Next signal", "Sales alert or next journey step", "x"],
  ];
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-wf" label="Trigger-to-action workflow">
      <div className="hv-wf__grid">
        {N.map(([t, d, c], k) => (
          <div key={t} className={"hv-wf__n hv-wf__n--" + c + (k === on ? " is-on" : "") + (k < on ? " is-done" : "")}>
            <small>{t}</small>
            <b>{d}</b>
          </div>
        ))}
      </div>
      <p className="hv-note">Automation without strategy simply creates more messages.</p>
    </HV_Frame>
  );
}

/* 18 · Analytics — Digital Intelligence Control Room (example interface, no numbers). */
const HV_CR = [
  ["Traffic", "spark"],
  ["Engagement", "bars"],
  ["Audience", "donut"],
  ["Conversion funnel", "funnel"],
  ["Anomaly", "alert"],
  ["Channel trends", "lines"],
];
function HV_ControlRoom() {
  const [ref, v] = ppIn(0.05);
  const [on] = rlCycle(HV_CR.length, 1500, v);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-cr" label="Digital intelligence control room" chip="Interface shapes only — no real data">
      <div className="hv-cr__grid">
        {HV_CR.map(([t, k2], k) => (
          <div key={t} className={"hv-cr__tile hv-cr__tile--" + k2 + (k === on ? " is-on" : "")}>
            <small>{t}</small>
            <span className="hv-cr__viz" aria-hidden="true">
              {k2 === "bars" || k2 === "funnel"
                ? [70, 48, 86, 60, 40].map((h, j) => <i key={j} style={{ "--h": (k2 === "funnel" ? 100 - j * 18 : h) + "%" }} />)
                : k2 === "alert"
                ? <b>Unusual drop detected — investigate</b>
                : <i />}
            </span>
          </div>
        ))}
      </div>
      <ol className="hv-chain">
        {["Data", "Behaviour", "Insight", "Decision"].map((t, k) => (
          <li key={t} style={{ "--k": k }}>
            {t}
          </li>
        ))}
      </ol>
    </HV_Frame>
  );
}

/* 19 · Audit — Digital Health Map (example statuses). */
const HV_HM = [
  ["Market", 0],
  ["Audience", 2],
  ["Positioning", 1],
  ["Search", 0],
  ["Content", 1],
  ["Paid media", 2],
  ["Social", 1],
  ["Website", 0],
  ["Landing pages", 1],
  ["Conversion", 2],
  ["Analytics", 1],
  ["Automation", 2],
  ["CRM alignment", 1],
  ["Customer journey", 2],
  ["AI opportunities", 2],
  ["Measurement", 1],
];
const HV_HM_S = [
  ["Healthy", "h"],
  ["Needs attention", "a"],
  ["Opportunity", "o"],
];
function HV_HealthMap() {
  const [ref, v] = ppIn(0.05);
  const [n, setN] = ee.useState(ppR() ? HV_HM.length : 0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setN(i);
      if (i >= HV_HM.length) clearInterval(t);
    }, 140);
    return () => clearInterval(t);
  }, [v]);
  return (
    <HV_Frame refEl={ref} v={v} cls="hv-hm" label="Digital health map" chip="Statuses only — no scores">
      <ul className="hv-hm__grid">
        {HV_HM.map(([t, s], k) => (
          <li key={t} className={k < n ? "is-" + HV_HM_S[s][1] : ""}>
            {t}
            <span className="pp-sr"> — {HV_HM_S[s][0]}</span>
          </li>
        ))}
      </ul>
      <ul className="hv-hm__legend">
        {HV_HM_S.map(([t, c]) => (
          <li key={t} className={"is-" + c}>
            {t}
          </li>
        ))}
      </ul>
    </HV_Frame>
  );
}

export { HV_Anatomy, HV_AudCreative, HV_Commerce, HV_Committee, HV_ControlRoom, HV_Decision, HV_HealthMap, HV_IntentBudget, HV_LeadFunnel, HV_Perception, HV_Relevance, HV_Storyboard, HV_Workflow };
