/*
 * Section kit, part 3 — visuals first built for the IT & Development service pages
 * (Website, Custom Software, Web Application, Mobile App and E-commerce Development).
 * Prefix DK3_ ; styles in src/styles/it-kit.css (prefix k3-).
 *
 * Content rules: these visuals never show invented scores, results, prices or live data.
 * Status dashboards show example states only, and say so.
 */
import * as ee from 'react';
import { PP_Head, PpI, ppIn, ppR } from './shared.jsx';
import { DK_Sec } from './kit.jsx';

/* 3D layered stack. layers: [name, icon, items[], note?][] — top layer first. */
function DK3_Stack({ id, kicker, title, sub, layers, note, tone = "light" }) {
  const [on, setOn] = ee.useState(0);
  const n = layers.length;
  const L = layers[on];
  return (
    <DK_Sec tone={tone} className="k3-stk" label={id}>
      <div className="k3-stk__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} />
          <ol className="k3-stk__list" role="tablist" aria-label={title}>
            {layers.map(([t, ic], k) => (
              <li key={t} role="presentation">
                <button type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)} onMouseEnter={() => setOn(k)} onFocus={() => setOn(k)}>
                  <span>
                    <PpI n={ic} s={15} />
                  </span>
                  <em>{String(k + 1).padStart(2, "0")}</em>
                  {t}
                </button>
              </li>
            ))}
          </ol>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="k3-stk__vis">
          <div className="k3-stk__iso" aria-hidden="true" style={{ "--n": n }}>
            {layers.map(([t, ic], k) => (
              <div key={t} className={"k3-stk__l" + (on === k ? " is-on" : "")} style={{ "--j": n - 1 - k, "--k": k }} onMouseEnter={() => setOn(k)}>
                <b>{String(k + 1).padStart(2, "0")}</b>
                <i />
              </div>
            ))}
          </div>
          <div className="k3-stk__pane" role="tabpanel" key={on} aria-live="polite">
            <h3>
              <PpI n={L[1]} s={16} />
              {L[0]}
            </h3>
            <div>
              {L[2].map((x, k) => (
                <span key={x} style={{ "--k": k }}>
                  {x}
                </span>
              ))}
            </div>
            {L[3] && <p>{L[3]}</p>}
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

/* SVG arc on the gauge circle (centre 60,62, r 50), angles in degrees, 180 = left. */

/* Core Web Vitals gauges. metrics: [abbr, name, measures, goodText, poorText][]
   Thresholds are Google's published bands; no value is shown — the site has not been measured. */

/* Audit radar with no score. axes: [label, whatWeReview][] */

/* Technology constellation: pick a requirement and the relevant technology lights up.
   groups: [groupName, techs[]][] ; needs: [label, techs[], note][] */
function DK3_Tech({ id, kicker, title, sub, groups, needs, note, tone = "dark" }) {
  const [on, setOn] = ee.useState(0);
  const N = needs[on];
  return (
    <DK_Sec tone={tone} className="k3-tech" label={id}>
      <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
      <div className="k3-tech__needs" role="tablist" aria-label="Choose a requirement">
        {needs.map(([t], k) => (
          <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className="k3-tech__grid" role="tabpanel" aria-live="polite">
        {groups.map(([g, techs], k) => (
          <div key={g} className="k3-tech__g" style={{ "--k": k }}>
            <h3>{g}</h3>
            <ul>
              {techs.map((t) => (
                <li key={t} className={N[1].includes(t) ? "is-on" : ""}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="k3-tech__why" key={on}>
        <PpI n="bulb" s={15} /> {N[2]}
      </p>
      {note && <p className="dk-note">{note}</p>}
    </DK_Sec>
  );
}

/* Scope / cost-driver explorer. drivers: [label, icon, weight 1-3, text][] — shows relative scope, never a price. */

/* Roadmap lanes. lanes: [name, sub, items[]][] */

/* Quality pipeline: stages run one after another in a looping example run. stages: [name, icon, text][] */
function DK3_Pipe({ id, kicker, title, sub, stages, note, tone = "dark", runLabel = "Pipeline run" }) {
  const [ref, v] = ppIn(0.3);
  const [at, setAt] = ee.useState(ppR() ? stages.length : 0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const i = setInterval(() => setAt((x) => (x >= stages.length + 2 ? 0 : x + 1)), 900);
    return () => clearInterval(i);
  }, [v, stages.length]);
  return (
    <section ref={ref} className={`dk-sec dk-sec--${tone} k3-pp` + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="container">
        <PP_Head k={kicker} id={id} t={title} s={sub} light={tone === "dark"} center />
        <div className="k3-pp__bar" aria-hidden="true">
          <span>{runLabel}</span>
          <b>{at >= stages.length ? "All checks passed — ready to release" : "Running: " + stages[at][0]}</b>
        </div>
        <ol className="k3-pp__row" style={{ "--n": stages.length }}>
          {stages.map(([t, ic, d], k) => (
            <li key={t} className={k < at ? "is-done" : k === at ? "is-run" : ""} style={{ "--k": k }}>
              <span className="k3-pp__n">
                {k < at ? (
                  <svg viewBox="0 0 16 16" aria-hidden="true">
                    <path d="M3 8.5l3.2 3L13 4.5" />
                  </svg>
                ) : (
                  <PpI n={ic} s={16} />
                )}
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        {note && <p className="dk-note">{note}</p>}
      </div>
    </section>
  );
}

/* Role-based access preview. roles: [role, icon, text][] ; modules: [name, icon][] ; access: number[][] (module indexes per role) */
function DK3_Roles({ id, kicker, title, sub, roles, modules, access, appName = "Application", note, tone = "off" }) {
  const [on, setOn] = ee.useState(0);
  const A = access[on];
  return (
    <DK_Sec tone={tone} className="k3-rl" label={id}>
      <div className="k3-rl__in">
        <div>
          <PP_Head k={kicker} id={id} t={title} s={sub} />
          <div className="k3-rl__roles" role="tablist" aria-label="Choose a role">
            {roles.map(([t, ic], k) => (
              <button key={t} type="button" role="tab" aria-selected={on === k} className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                <PpI n={ic} s={14} />
                {t}
              </button>
            ))}
          </div>
          <p className="k3-rl__d" key={on}>
            {roles[on][2]}
          </p>
          {note && <p className="dk-note">{note}</p>}
        </div>
        <div className="k3-rl__app" role="tabpanel" aria-live="polite">
          <div className="k3-rl__top" aria-hidden="true">
            <i />
            <i />
            <i />
            <b>{appName}</b>
            <span>Signed in as {roles[on][0]}</span>
          </div>
          <ul className="k3-rl__mods">
            {modules.map(([t, ic], k) => {
              const ok = A.includes(k);
              return (
                <li key={t} className={ok ? "is-ok" : "is-no"} style={{ "--k": k }}>
                  <PpI n={ok ? ic : "eyeoff"} s={15} />
                  <b>{t}</b>
                  <small>{ok ? "Access" : "No access"}</small>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </DK_Sec>
  );
}

/* "What are you building?" selector. options: [label, icon, headline, includes[], route, linkTo?, linkLabel?][] */

/* Problem → cause → response rows that "repair" on hover/focus. rows: [problem, cause, response, icon][] */

export { DK3_Pipe, DK3_Roles, DK3_Stack, DK3_Tech };
