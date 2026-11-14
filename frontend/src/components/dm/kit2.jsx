/*
 * Digital Marketing section kit, part 2 — generic versions of visuals first built for the
 * Online Reputation Management page, plus a few new ones, so later pages share them instead of copying.
 * Depends on shared.jsx + kit.jsx. Styles: online-reputation-management.css (rm- classes) and dm-kit2.css (dk2-).
 *
 *   DK_Status   — qualitative status framework (no numbers): rows placed on a level track
 *   DK_Tree     — yes/no decision tree
 *   DK_DoDont   — two-column "won't / will" or "don't / do" panel
 *   DK_Guide    — guide / resource block linking to an existing blog guide
 *   DK_Pyramid  — stacked tiers (bottom-up reveal); tiers listed top first
 *   DK_Console  — auto-advancing stepper with a status panel (stops on user interaction)
 *   DK_Signals  — example signal feed routed through a pipeline
 *   DK_Anatomy  — stylised page with hotspots; each block explains its job
 *   DK_Split    — two-state toggle (before/after, A/B, basic/smarter) with a shared caption
 *   DK_Gap      — funnel with a highlighted gap between stages
 *
 * Content rules as kit.jsx: no team details, no invented numbers, example visuals labelled as examples.
 */
import * as ee from 'react';
import { PP_Head, PpI, PpL, ppGo, ppIn, ppR } from './shared.jsx';
import { DK_Sec } from './kit.jsx';

/* Qualitative status framework. levels: [label, cls][] where cls ∈ s|w|n|c ; rows: [title, icon, levelIndex][] */
function DK_Status({ id, kicker, title, sub, levels, rows, dashTitle, note, tone = "off", headShort }) {
  const [ref, v] = ppIn(0.25);
  const n = levels.length;
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rm-hl` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container rm-hl__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <ul className="rm-legend">
            {levels.map(([t, c]) => (
              <li key={t} className={"rm-st rm-st--" + c}>
                <i aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="rm-hl__dash" style={{ "--n": n }}>
          <div className="rm-hl__top" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>{dashTitle}</b>

          </div>
          <div className="rm-hl__head" aria-hidden="true">
            <span>Area</span>
            <span className="rm-hl__hq">
              {(headShort || levels.map((l) => l[0])).map((t) => (
                <i key={t}>{t}</i>
              ))}
            </span>
            <span>Status</span>
          </div>
          <ul className="rm-hl__rows">
            {rows.map(([t, ic, s], k) => (
              <li key={t} style={{ "--k": k, "--s": s }}>
                <b>
                  <PpI n={ic} s={14} />
                  {t}
                </b>
                <span className={"rm-hl__track rm-hl__track--" + levels[s][1]} aria-hidden="true">
                  {levels.map((l) => (
                    <i key={l[0]} />
                  ))}
                  <em />
                </span>
                <span className={"rm-st rm-st--" + levels[s][1]}>
                  <i aria-hidden="true" />
                  {levels[s][0]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* Decision tree. items: [question, yesText, icon, yesLabel?][] ; start, end: strings */
function DK_Tree({ id, kicker, title, sub, start, items, end, tone = "off", startIcon = "megaphone" }) {
  const [ref, v] = ppIn(0.25);
  const [on, setOn] = ee.useState(-1);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rm-tree` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center />
        <div className="rm-tree__start">
          <PpI n={startIcon} s={16} />
          {start}
        </div>
        <ol className="rm-tree__list">
          {items.map(([q, a, ic, yl], k) => (
            <li key={q} style={{ "--k": k }} className={on === k ? "is-on" : ""} onMouseEnter={() => setOn(k)} onMouseLeave={() => setOn(-1)}>
              <button type="button" className="rm-tree__q" onFocus={() => setOn(k)} onBlur={() => setOn(-1)} onClick={() => setOn(k)}>
                <span>
                  <PpI n={ic} s={15} />
                </span>
                {q}
              </button>
              <span className="rm-tree__yes">
                <em>{yl || "Yes"}</em>
                {a}
              </span>
              {(k < items.length - 1 || end) && (
                <span className="rm-tree__no" aria-hidden="true">
                  {items[k][4] || "No"} ↓
                </span>
              )}
            </li>
          ))}
        </ol>
        {end && <div className="rm-tree__end">{end}</div>}
      </div>
    </section>
  );
}

/* Two columns: no = [title, items[]], yes = [title, items[]] */

/* Guide block. cover: [small, title, line] ; to: blog path */
function DK_Guide({ id, kicker = "In-depth guide", title, cover, topics, to, label = "Read the guide" }) {
  return (
    <DK_Sec tone="off" className="rm-gd" label={id}>
      <div className="rm-gd__in">
        <div className="rm-gd__cover" aria-hidden="true">
          <small>{cover[0]}</small>
          <b>{cover[1]}</b>
          <span>{cover[2]}</span>
          <i />
          <i />
          <i />
        </div>
        <div>
          <PP_Head k={kicker} id={id} t={title} />
          <ul className="rm-gd__topics">
            {topics.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ul>
          <PpL to={to} className="btn btn--lg pp-btn">
            {label} <span aria-hidden="true">→</span>
          </PpL>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Stacked tiers, widest at the bottom. tiers: [title, text][] top first (max 6) */

/* Auto-advancing stepper. steps: [title, text][] ; caps: string[] (optional chips) */
function DK_Console({ id, kicker, title, sub, steps, caps, cols = 4, tone = "dark", stageLabel = "Stage" }) {
  const [ref, v] = ppIn(0.3);
  const [on, setOn] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || ppR()) return;
    const i = setInterval(() => setOn((x) => (x + 1) % steps.length), 1900);
    return () => clearInterval(i);
  }, [v, hold, steps.length]);
  const pick = (k) => () => {
    setHold(true);
    setOn(k);
  };
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rm-cr dk2-con dk2-con--${tone}` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
        <div className="rm-cr__console">
          <div className="rm-cr__status" aria-live="polite">
            <i aria-hidden="true" />
            <small>
              {stageLabel} {String(on + 1).padStart(2, "0")} / {steps.length}
            </small>
            <b>{steps[on][0]}</b>
            <p>{steps[on][1]}</p>
          </div>
          <ol className="rm-cr__steps" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
            {steps.map(([t], k) => (
              <li key={t}>
                <button type="button" className={(k === on ? "is-on " : "") + (k < on ? "is-done" : "")} aria-pressed={k === on} onClick={pick(k)} onFocus={pick(k)}>
                  <span>{String(k + 1).padStart(2, "0")}</span>
                  {t}
                </button>
              </li>
            ))}
          </ol>
        </div>
        {caps && (
          <div className="dk-chips__row rm-cr__caps">
            {caps.map((t, k) => (
              <span key={t} style={{ "--k": k }}>
                <PpI n="check" s={13} />
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* Example signal feed routed through a pipeline. feed: [signal, icon, outcome][] ; pipe: string[] */
function DK_Signals({ id, kicker, title, sub, feed, pipe, engine, label = "Signals — not live data", tone = "light", after }) {
  const [ref, v] = ppIn(0.3);
  const [t, setT] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const i = setInterval(() => setT((x) => x + 1), 950);
    return () => clearInterval(i);
  }, [v]);
  const cur = Math.floor(t / pipe.length) % feed.length;
  const st = t % pipe.length;
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} rm-mon` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container rm-mon__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <ul className="dk-os__list">
            {feed.map(([s, , a]) => (
              <li key={s}>
                <b>{s}</b> → {a}
              </li>
            ))}
          </ul>
          {after}
        </div>
        <div className="rm-mon__vis" aria-hidden="true">
          <div className="rm-mon__feed">
            <small>{label}</small>
            <ul>
              {feed.map(([s, ic], k) => (
                <li key={s} className={k === cur ? "is-on" : ""}>
                  <i>
                    <PpI n={ic} s={13} />
                  </i>
                  {s}
                  {k === cur && <em>New</em>}
                </li>
              ))}
            </ul>
          </div>
          <div className="rm-mon__eng">
            <b>{engine}</b>
            <ol>
              {pipe.map((p, k) => (
                <li key={p} className={k === st ? "is-on" : k < st ? "is-done" : ""}>
                  {p}
                </li>
              ))}
            </ol>
            <p key={cur + "-" + (st === pipe.length - 1)}>{st === pipe.length - 1 ? feed[cur][2] : feed[cur][0]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Stylised page with hotspots. blocks: [label, job, question, icon, size?][] (size: "lg" | "sm") */
function DK_Anatomy({ id, kicker, title, sub, blocks, pageLabel = "Page structure", tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const B = blocks[on];
  return (
    <DK_Sec tone={tone} className="dk2-an" label={id}>
      <div className="dk2-an__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="dk2-an__call" aria-live="polite" key={on}>
            <span>
              <PpI n={B[3]} s={16} />
            </span>
            <div>
              <small>{B[0]}</small>
              <b>{B[1]}</b>
              <p>{B[2]}</p>
            </div>
          </div>
        </div>
        <div className="dk2-an__page">
          <div className="dk2-an__bar" aria-hidden="true">
            <i />
            <i />
            <i />
            <span>{pageLabel}</span>
          </div>
          <ol className="dk2-an__blocks">
            {blocks.map(([l, j, , ic, sz], k) => (
              <li key={l} className={sz ? "dk2-an__b--" + sz : ""}>
                <button type="button" className={on === k ? "is-on" : ""} aria-pressed={on === k} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                  <span className="dk2-an__lbl">
                    <PpI n={ic} s={13} />
                    {l}
                  </span>
                  <span className="dk2-an__job">{j}</span>
                  <i aria-hidden="true" />
                </button>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Two-state toggle. states: [label, title, items[], note?][2] ; render items as a vertical flow */
function DK_Split({ id, kicker, title, sub, states, caption, tone = "light", auto = true }) {
  const [ref, v] = ppIn(0.3);
  const [on, setOn] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!auto || !v || hold || ppR()) return;
    const i = setInterval(() => setOn((x) => 1 - x), 3200);
    return () => clearInterval(i);
  }, [v, hold, auto]);
  const S = states[on];
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} dk2-sp` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} center light={tone === "dark"} />
        <div className="dk2-sp__tabs" role="tablist" aria-label={title}>
          {states.map(([l], k) => (
            <button
              key={l}
              type="button"
              role="tab"
              aria-selected={on === k}
              className={on === k ? "is-on" : ""}
              onClick={() => {
                setHold(true);
                setOn(k);
              }}
            >
              {l}
            </button>
          ))}
        </div>
        <div className={"dk2-sp__panel dk2-sp__panel--" + on} role="tabpanel" key={on}>
          <h3>{S[1]}</h3>
          <ol>
            {S[2].map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
          {S[3] && <p>{S[3]}</p>}
        </div>
        {caption && <p className="dk2-sp__cap">{caption}</p>}
      </div>
    </section>
  );
}

/* Funnel with a highlighted gap. before: [title, items[]][] ; gap: [title, text] ; after: string[] */

/* 2×2 priority matrix. quads: [label, sub, text, icon, cls][4] in reading order (top-left, top-right, bottom-left, bottom-right);
   cls ∈ r|e|m|w. axes: [yLabel, xLabel] */
function DK_Quad({ id, kicker, title, sub, quads, axes, note, start = 1, tone = "light" }) {
  const [on, setOn] = ee.useState(start);
  const Q = quads[on];
  return (
    <DK_Sec tone={tone} className="rm-mx" label={id}>
      <div className="rm-mx__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="rm-mx__detail" aria-live="polite" key={on}>
            <small>{Q[1]}</small>
            <h3>{Q[0]}</h3>
            <p>{Q[2]}</p>
          </div>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="rm-mx__chart">
          <span className="rm-mx__y" aria-hidden="true">
            {axes[0]} →
          </span>
          <div className="rm-mx__grid" role="group" aria-label={title}>
            {quads.map(([t, s2, , ic, c], k) => (
              <button
                key={t}
                type="button"
                className={"rm-mx__q rm-mx__q--" + c + (on === k ? " is-on" : "")}
                aria-pressed={on === k}
                onClick={() => setOn(k)}
                onMouseEnter={() => setOn(k)}
                onFocus={() => setOn(k)}
              >
                <span>
                  <PpI n={ic} s={16} />
                </span>
                <b>{t}</b>
                <small>{s2}</small>
              </button>
            ))}
          </div>
          <span className="rm-mx__x" aria-hidden="true">
            {axes[1]} →
          </span>
        </div>
      </div>
    </DK_Sec>
  );
}

/* Yes/no self-assessment. Counts only the visitor's own answers — no invented score. */
function DK_Quiz({ id, kicker, title, sub, questions, threshold = 2, result, cta, formId, tone = "off", count = "no" }) {
  const [a, setA] = ee.useState({});
  const answered = Object.keys(a).length;
  const no = Object.values(a).filter((x) => x === count).length;
  const done = answered === questions.length;
  return (
    <DK_Sec tone={tone} className="dk2-qz" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} center />
      <ol className="dk2-qz__list">
        {questions.map((q, k) => (
          <li key={q} className={a[k] ? "is-" + a[k] : ""}>
            <span className="dk2-qz__q">
              <em>{String(k + 1).padStart(2, "0")}</em>
              {q}
            </span>
            <span className="dk2-qz__btns" role="group" aria-label={q}>
              {["yes", "no"].map((v) => (
                <button key={v} type="button" aria-pressed={a[k] === v} onClick={() => setA((o) => ({ ...o, [k]: v }))}>
                  {v === "yes" ? "Yes" : "No"}
                </button>
              ))}
            </span>
          </li>
        ))}
      </ol>
      <div className="dk2-qz__res" aria-live="polite">
        {done ? (
          <p>
            <b>{no >= threshold ? result[0] : result[1]}</b> You answered “{count === "yes" ? "Yes" : "No"}” to {no} of {questions.length}.
          </p>
        ) : (
          <p>
            Answered {answered} of {questions.length}. {result[2]}
          </p>
        )}
        <a href={"#" + formId} onClick={ppGo(formId)} className="btn btn--lg pp-btn">
          {cta} <span aria-hidden="true">→</span>
        </a>
      </div>
    </DK_Sec>
  );
}

export { DK_Anatomy, DK_Console, DK_Guide, DK_Quad, DK_Quiz, DK_Signals, DK_Split, DK_Status, DK_Tree };
