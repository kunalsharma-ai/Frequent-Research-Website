/* =====================================================================================================================
 * Build 65 — Accounts & Finance service pages, complete redesign. Prefix AF5_. Styles: src/styles/af65.css (af5-).
 *
 * Every A&F service page (AFS_Page) is drawn by AF5_Body. Content comes only from the service records
 * (src/data/AccountsFinance63a–d.jsx and AF_SVC) — prices, inclusions, counts and lists are read, never invented.
 *
 * Each service looks different in three ways:
 *  1. family world (AF5_WORLD): Books = ledger paper + serif, Tax = compliance grid + grotesk, Planning = night chart +
 *     sans, Strategy = boardroom black + gold serif — each with its own section backgrounds, card shapes and headings;
 *  2. the service's own palette (g.pal) and hero illustration (AGV[g.th]);
 *  3. a per-service layout recipe (af5Recipe): facts as odometer tiles or gauge rings, process as a rail or a wheel,
 *     capabilities chart as bars or a donut, plans as a 3D carousel or a podium.
 * Motion: entrances only start once the page runs (.af5.is-live) and the section is seen; everything is in its final
 * state for search engines, no-JS and reduced motion. No text is ever hidden behind an unfinished animation.
 * The interactive labs, FAQ, enquiry form, quote section and the special sections (principles, AI, receive, value,
 * security, review, brief, docs, strip) are reused from build 64 (AccountsFinance64.jsx).
 * =================================================================================================================== */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { PpL } from '../components/dm/shared.jsx';
import { frkReduce } from '../components/site/FrKit.jsx';
import { K5_Count, k5Observe, k5Sfx, k5Tilt } from '../components/site/Kit65.jsx';
import { AF_FAM, AF_SVC } from '../data/AccountsFinance.jsx';
import { AG_OFFER_NOTE } from '../data/AccountsFinance63a.jsx';
import { AGV } from './AccountsFinanceVisuals.jsx';
import { AF_FORM, AF_HUB, AF_I, AF_OFFERS, AF_TIERS, AF_UNIT, AG_Form, AG_Tip, afBy, afInr, afUrl, agPick, agSplitHl, agTo } from './AccountsFinance.jsx';
import { X4_Cmp, X4_Faq, X4_Quote, X4_SECTIONS, X4_THEMES, x4CapList, x4Flavour } from './AccountsFinance64.jsx';

const AF5_WORLD = { books: "paper", tax: "grid", plan: "night", strat: "board" };
function af5Recipe(th) {
  const i = Math.max(0, X4_THEMES.indexOf(th));
  return { facts: i % 2 ? "rings" : "odo", proc: i % 3 === 1 ? "wheel" : "rail", caps: i % 2 ? "donut" : "bars", plans: i % 3 === 2 ? "podium" : "carousel", prob: i % 2 ? "flip" : "split" };
}
function af5In(t = 0.15) {
  const ref = ee.useRef(null);
  const [v, setV] = ee.useState(false);
  ee.useEffect(() => k5Observe(ref.current, () => setV(true)), []);
  return [ref, v];
}
function AF5_Sec({ id, cls, hid, children }) {
  const [ref, v] = af5In();
  return (
    <section ref={ref} id={id} className={"af5-sec " + (cls || "") + (v ? " is-in" : "")} aria-labelledby={hid}>
      {typeof children === "function" ? children(v) : children}
    </section>
  );
}
function AF5_Head({ k, h, p, id, ic, c }) {
  return (
    <header className={"af5-head" + (c ? " af5-head--c" : "")}>
      {k && (
        <span className="af5-kick">
          <AF_I n={ic || "spark"} s={13} />
          {k}
        </span>
      )}
      <h2 id={id}>{h}</h2>
      {p && <p>{p}</p>}
    </header>
  );
}
/* rolling digits: each digit is a vertical strip that settles on its value */
function AF5_Roll({ v, on }) {
  const s = afInr(v);
  return (
    <span className={"af5-roll" + (on ? " is-on" : "")} aria-label={s} translate="no">
      {s.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="af5-roll__d" style={{ "--n": +ch, "--i": i }} aria-hidden="true">
            <span>{"0123456789".split("").map((x) => <i key={x}>{x}</i>)}</span>
          </span>
        ) : (
          <span key={i} className="af5-roll__s" aria-hidden="true">
            {ch}
          </span>
        )
      )}
    </span>
  );
}

/* ---------------- hero ---------------- */
function AF5_Hero({ g, d }) {
  const H = g.hero;
  const V = AGV[g.th] || null;
  const tilt = k5Tilt(6);
  return (
    <section className="af5-hero" aria-labelledby="ag-h1">
      <div className="af5-hero__bg" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="af5-hero__pat" />
      </div>
      <div className="container af5-hero__in">
        <div className="af5-hero__copy">
          <nav className="af5-crumbs" aria-label="Breadcrumb">
            <PpL to="/services">Services</PpL>
            <span aria-hidden="true">/</span>
            <PpL to={AF_HUB}>Accounts &amp; Finance</PpL>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{d.n}</span>
          </nav>
          <span className="af5-eb">
            <span className="af5-eb__ic" aria-hidden="true">
              <AF_I n={d.ic} s={15} />
            </span>
            {H.eb}
          </span>
          <HeroH1 id="ag-h1" className="af5-h1">
            {agSplitHl(H.h1, H.hl)}
          </HeroH1>
          <p className="af5-hero__sub">{H.sub}</p>
          {H.body && <p className="af5-hero__body">{H.body}</p>}
          <div className="af5-hero__ctas">
            <a className="af5-btn af5-btn--ac" href={"#" + AF_FORM} onClick={agPick({})}>
              Book a Free 20-Minute Consultation <AF_I n="arrow" s={16} />
            </a>
            <a className="af5-btn af5-btn--ghost" href="#ag-plans" onClick={agTo("ag-plans")}>
              {H.c2 || "See Plans & Pricing"}
            </a>
          </div>
          {H.price && (
            <div className="af5-hero__price">
              <span className="af5-hero__coin" aria-hidden="true">
                <AF_I n="rupee" s={18} />
              </span>
              <span>
                <b>{H.price}</b>
                {H.pnote && <small>{H.pnote}</small>}
              </span>
            </div>
          )}
          {H.micro && (
            <ul className="af5-micro" aria-label="Highlights">
              {H.micro.map((m, k) => (
                <li key={m} style={{ "--k": k }}>
                  {m}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="af5-hero__stage">
          <div className="af5-hero__frame" {...tilt}>
            {V && <V g={g} d={d} />}
          </div>
          {H.cap && <p className="af5-hero__cap">{H.cap}</p>}
        </div>
      </div>
    </section>
  );
}

/* ---------------- facts: odometer tiles or gauge rings ---------------- */
function AF5_Facts({ g, rc }) {
  const F = g.facts;
  if (!F || !F.items) return null;
  const max = Math.max.apply(null, F.items.map(([n]) => parseFloat(n) || 0)) || 1;
  return (
    <AF5_Sec cls={"af5-facts af5-facts--" + rc.facts} hid="af5-facts-h">
      {(on) => (
        <div className="container">
          <h2 id="af5-facts-h" className="af-sr">
            {F.h || "At a glance"}
          </h2>
          <ul className="af5-facts__list">
            {F.items.map(([n, l], k) => {
              const num = parseFloat(n);
              return (
                <li key={l} style={{ "--k": k, "--p": isNaN(num) ? 1 : Math.max(0.25, Math.sqrt(num / max)) }}>
                  {rc.facts === "rings" && (
                    <svg className="af5-ring" viewBox="0 0 80 80" aria-hidden="true">
                      <circle cx="40" cy="40" r="32" />
                      <circle cx="40" cy="40" r="32" pathLength="100" />
                    </svg>
                  )}
                  <b>{isNaN(num) ? n : <K5_Count to={num} />}</b>
                  <span>{l}</span>
                </li>
              );
            })}
          </ul>
          {F.note && <p className="af5-fine">{F.note}</p>}
        </div>
      )}
    </AF5_Sec>
  );
}

/* ---------------- problems: flip deck or split list ---------------- */
function AF5_Prob({ g, rc }) {
  const P = g.prob;
  const L = P.L || ["The challenge", "How we help", "Business value"];
  const [open, setOpen] = ee.useState(0);
  return (
    <AF5_Sec cls={"af5-prob af5-prob--" + rc.prob} hid="af5-prob-h">
      <div className="container">
        <AF5_Head k={P.k || "The challenge"} h={P.h} p={P.p} id="af5-prob-h" ic="target" />
        {rc.prob === "flip" ? (
          <ul className="af5-flips">
            {P.items.map((it, k) => (
              <AF5_FlipCard key={it[0]} it={it} k={k} L={L} />
            ))}
          </ul>
        ) : (
          <div className="af5-split">
            <ol className="af5-split__nav">
              {P.items.map((it, k) => (
                <li key={it[0]}>
                  <button type="button" className={open === k ? "is-on" : ""} aria-pressed={open === k} onClick={() => setOpen(k)}>
                    <span>{String(k + 1).padStart(2, "0")}</span>
                    {it[0]}
                  </button>
                </li>
              ))}
            </ol>
            <div className="af5-split__card" key={open} aria-live="polite">
              <h3>{P.items[open][0]}</h3>
              <div className="af5-split__cols">
                {P.items[open].slice(1).map((t, j) =>
                  t ? (
                    <div key={j} className={"af5-split__c af5-split__c--" + j}>
                      <span>
                        <AF_I n={["cross", "check", "growth"][j] || "check"} s={14} /> {L[j]}
                      </span>
                      <p>{t}</p>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </AF5_Sec>
  );
}
function AF5_FlipCard({ it, k, L }) {
  const [f, setF] = ee.useState(false);
  return (
    <li className={"af5-flip" + (f ? " is-flip" : "")} style={{ "--k": k }}>
      <button type="button" className="af5-flip__in" aria-pressed={f} onClick={() => (setF(!f), k5Sfx("flip"))}>
        <span className="af5-flip__f">
          <em>{String(k + 1).padStart(2, "0")}</em>
          <b>{it[0]}</b>
          <span>{it[1]}</span>
          <small>
            <AF_I n="refresh" s={13} /> {L[1]}
          </small>
        </span>
        <span className="af5-flip__b">
          <b>{L[1]}</b>
          <span>{it[2]}</span>
          {it[3] && (
            <small>
              <AF_I n="growth" s={13} /> {it[3]}
            </small>
          )}
        </span>
      </button>
    </li>
  );
}

/* ---------------- capabilities: chart + detail ---------------- */
function AF5_Caps({ g, d, rc }) {
  const C = g.caps;
  const { list, total, max } = x4CapList(g, d);
  const [on, setOn] = ee.useState(0);
  const x = list[on];
  const R = 15.9155;
  let acc = 0;
  return (
    <AF5_Sec cls={"af5-caps af5-caps--" + rc.caps} hid="af5-caps-h">
      <div className="container">
        <AF5_Head k="Capabilities" h={C.h} p={C.p} id="af5-caps-h" ic="layers" />
        <div className="af5-caps__grid">
          <div className="af5-caps__chart">
            {rc.caps === "donut" ? (
              <div className="af5-donut">
                <svg viewBox="0 0 42 42" role="img" aria-label={`${list.length} capability areas, ${total} activities`}>
                  {list.map((c, k) => {
                    const p = (c.c / total) * 100;
                    const off = 25 - acc;
                    acc += p;
                    return (
                      <circle key={c.n} cx="21" cy="21" r={R} className={on === k ? "is-on" : ""} style={{ "--k": k, "--h": (k * 360) / list.length }} strokeDasharray={`${Math.max(0, p - 0.8)} ${100 - Math.max(0, p - 0.8)}`} strokeDashoffset={off} onClick={() => setOn(k)} />
                    );
                  })}
                </svg>
                <span className="af5-donut__c">
                  <b>{Math.round((x.c / total) * 100)}%</b>
                  <small>of listed activities</small>
                </span>
              </div>
            ) : null}
            <ul className="af5-bars" role="list">
              {list.map((c, k) => (
                <li key={c.n}>
                  <button type="button" className={on === k ? "is-on" : ""} aria-pressed={on === k} onClick={() => setOn(k)} style={{ "--w": c.c / max, "--k": k, "--h": (k * 360) / list.length }}>
                    <span className="af5-bars__n">{c.n}</span>
                    <span className="af5-bars__t">
                      <i />
                    </span>
                    <b>{c.c}</b>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <article className="af5-capd" key={on} aria-live="polite">
            <span className="af5-capd__k">
              Capability {String(on + 1).padStart(2, "0")} · {x.c} activities
            </span>
            <h3>{x.n}</h3>
            {x.desc && <p>{x.desc}</p>}
            {x.acts && (
              <ul className="af5-capd__acts">
                {x.acts.map((a, j) => (
                  <li key={a} style={{ "--j": j }}>
                    <AF_I n="tick" s={13} />
                    {a}
                  </li>
                ))}
              </ul>
            )}
            <a className="af5-link" href={"#" + AF_FORM} onClick={agPick({ area: x.n })}>
              Discuss {x.n} <AF_I n="arrow" s={13} />
            </a>
          </article>
        </div>
      </div>
    </AF5_Sec>
  );
}

/* ---------------- process: rail or wheel (tiles when the steps carry titles only) ---------------- */
const AF5_STEP_IC = ["lens", "doc", "layers", "check", "gear", "shield", "flag", "growth"];
function AF5_Proc({ g, rc }) {
  const P = g.proc;
  const n = P.steps.length;
  const [on, setOn] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  const [ref, vis] = af5In();
  ee.useEffect(() => {
    if (!vis || hold || frkReduce()) return undefined;
    const t = setInterval(() => !document.hidden && setOn((x) => (x + 1) % n), 3600);
    return () => clearInterval(t);
  }, [vis, hold, n]);
  const s = P.steps[on];
  const brief = !P.steps.some((x) => x[1]);
  if (brief)
    return (
      <section ref={ref} className={"af5-sec af5-proc af5-proc--tiles" + (vis ? " is-in" : "")} aria-labelledby="af5-proc-h" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)}>
        <div className="container">
          <AF5_Head k={`${n}-step process`} h={P.h} p={P.p} id="af5-proc-h" ic="route" />
          <ol className="af5-tiles">
            {P.steps.map((st, k) => (
              <li key={st[0]} className={(k === on ? "is-on" : "") + (k < on ? " is-done" : "")} style={{ "--k": k }} onClick={() => setOn(k)}>
                <span className="af5-tiles__n">{String(k + 1).padStart(2, "0")}</span>
                <span className="af5-tiles__ic" aria-hidden="true">
                  <AF_I n={AF5_STEP_IC[k % AF5_STEP_IC.length]} s={22} />
                </span>
                <b>{st[0]}</b>
                <i className="af5-tiles__arrow" aria-hidden="true" />
              </li>
            ))}
          </ol>
          {P.note && <p className="af5-fine">{P.note}</p>}
        </div>
      </section>
    );
  return (
    <section ref={ref} className={"af5-sec af5-proc af5-proc--" + rc.proc + (vis ? " is-in" : "")} aria-labelledby="af5-proc-h" onPointerEnter={() => setHold(true)} onPointerLeave={() => setHold(false)} onFocusCapture={() => setHold(true)}>
      <div className="container">
        <AF5_Head k={`${n}-step process`} h={P.h} p={P.p} id="af5-proc-h" ic="route" />
        <div className="af5-proc__grid">
          <ol className="af5-proc__steps" style={{ "--n": n, "--on": on }}>
            {P.steps.map((st, k) => (
              <li key={st[0]} style={{ "--k": k }}>
                <button type="button" className={(k === on ? "is-on" : "") + (k < on ? " is-done" : "")} aria-pressed={k === on} onClick={() => setOn(k)}>
                  <span className="af5-proc__dot">{k < on ? <AF_I n="tick" s={14} /> : k + 1}</span>
                  <span className="af5-proc__t">{st[0]}</span>
                </button>
              </li>
            ))}
            <i className="af5-proc__fill" aria-hidden="true" />
          </ol>
          <article className="af5-proc__card" key={on} aria-live="polite">
            <span className="af5-proc__big" aria-hidden="true">
              {String(on + 1).padStart(2, "0")}
            </span>
            <h3>{s[0]}</h3>
            <p>{s[1]}</p>
            {Array.isArray(s[2]) && (
              <dl>
                {["What we do", "What we need", "What you get"].map((t, j) =>
                  s[2][j] ? (
                    <div key={t}>
                      <dt>{t}</dt>
                      <dd>{s[2][j]}</dd>
                    </div>
                  ) : null
                )}
              </dl>
            )}
            <span className="af5-proc__bar" aria-hidden="true">
              <i style={{ width: ((on + 1) / n) * 100 + "%" }} />
            </span>
          </article>
        </div>
        {P.note && <p className="af5-fine">{P.note}</p>}
      </div>
    </section>
  );
}

/* ---------------- plans & pricing ---------------- */
function AF5_Plan({ g, d, k, names, on, cur, setCur, sug, maxInc }) {
  const P = g.plans,
    p = d.pr;
  const [all, setAll] = ee.useState(false);
  const inc = P.inc[k];
  const pos = k - cur;
  return (
    <article className={"af5-plan af5-plan--" + k + (k === 1 ? " is-pop" : "") + (pos === 0 ? " is-cur" : "") + (sug ? " is-sug" : "")} style={{ "--pos": pos, "--k": k }} aria-labelledby={"ag-tier-" + k} onClick={() => pos !== 0 && setCur(k)}>
      <div className="af5-plan__glow" aria-hidden="true" />
      <header className="af5-plan__top">
        <h3 id={"ag-tier-" + k}>{names[k]}</h3>
        {k === 1 && (
          <span className="af5-plan__pop">
            <AF_I n="spark" s={12} /> Most popular
          </span>
        )}
        {sug && k !== 1 && <span className="af5-plan__pop af5-plan__pop--sug">Suggested</span>}
      </header>
      <p className="af5-plan__best">{P.best ? P.best[k] : ""}</p>
      <div className="af5-plan__price">
        {p.from && <em>Starting from</em>}
        <AF5_Roll v={p.a[k]} on={on} />
        <i>{AF_UNIT[p.u]}</i>
      </div>
      <small className="af5-plan__gst">+ applicable GST</small>
      {P.monthly && <small className="af5-plan__eq">≈ {afInr((p.a[k] / 12).toFixed(2))}/month equivalent, for comparison only</small>}
      <div className="af5-plan__meter" aria-hidden="true">
        <svg viewBox="0 0 36 36">
          <circle cx="18" cy="18" r="15.9" />
          <circle cx="18" cy="18" r="15.9" pathLength="100" style={{ "--p": (inc.length / maxInc) * 100 }} />
        </svg>
        <span>
          <b>{inc.length}</b> inclusions
        </span>
      </div>
      <ul className="af5-plan__list">
        {(all ? inc : inc.slice(0, 4)).map((x, j) => (
          <li key={x} style={{ "--j": j }}>
            <AF_I n="tick" s={14} />
            <span>{x}</span>
          </li>
        ))}
      </ul>
      {inc.length > 4 && (
        <button type="button" className="af5-plan__more" aria-expanded={all} onClick={(e) => (e.stopPropagation(), setAll(!all))}>
          {all ? "Show fewer" : `Show all ${inc.length}`}
        </button>
      )}
      <a className={"af5-btn " + (k === 1 ? "af5-btn--ac" : "af5-btn--line")} href={"#" + AF_FORM} onClick={agPick({ plan: k })}>
        Choose {names[k]} <AF_I n="arrow" s={15} />
      </a>
    </article>
  );
}
function AF5_Plans({ g, d, rc }) {
  const P = g.plans;
  const p = d.pr;
  const [vol, setVol] = ee.useState(null);
  const [sit, setSit] = ee.useState(null);
  const [cur, setCur] = ee.useState(1);
  if (P.mode === "quote" || !p) return <X4_Quote g={g} d={d} />;
  const names = P.names || AF_TIERS;
  const maxInc = Math.max.apply(null, P.inc.map((x) => x.length));
  const sitHit = sit != null && P.sit ? P.sit.opts[sit] : null;
  let sug = -1;
  if (vol != null && P.vol.opts[vol][1] >= 0) sug = P.vol.opts[vol][1];
  if (sitHit && sitHit[1].length) sug = sitHit[1][0];
  const pickVol = (k) => {
    setVol(k);
    const s = P.vol.opts[k][1];
    if (s >= 0) setCur(s);
  };
  const pickSit = (k) => {
    setSit(k);
    const s = P.sit.opts[k][1];
    if (s.length) setCur(s[0]);
  };
  return (
    <AF5_Sec id="ag-plans" cls={"af5-plans af5-plans--" + rc.plans} hid="ag-plans-h">
      {(on) => (
        <>
          <div className="af5-plans__fx" aria-hidden="true">
            {[0, 1, 2, 3, 4, 5].map((k) => (
              <b key={k} style={{ "--k": k }}>
                ₹
              </b>
            ))}
          </div>
          <div className="container">
            <AF5_Head k="Plans & pricing" h={P.h} p={P.p} id="ag-plans-h" ic="rupee" c />
            {P.tips && (
              <p className="af5-plans__tips">
                <span>Terms:</span>
                {P.tips.map(([t, x]) => (
                  <AG_Tip key={t} t={t} p={x} />
                ))}
              </p>
            )}
            {(P.vol || P.sit) && (
              <div className="af5-finder">
                {P.vol && (
                  <fieldset>
                    <legend>
                      <AF_I n="gauge" s={16} /> {P.vol.q}
                    </legend>
                    <div>
                      {P.vol.opts.map(([t], k) => (
                        <button key={t} type="button" className={vol === k ? "is-on" : ""} aria-pressed={vol === k} onClick={() => pickVol(k)}>
                          {t}
                        </button>
                      ))}
                    </div>
                    {vol != null && P.vol.opts[vol][1] < 0 && (
                      <p role="status">
                        {P.vol.more}{" "}
                        <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Transaction volume: more than 600 per month." })}>
                          Request a tailored quote
                        </a>
                      </p>
                    )}
                    {P.vol.note && <small>{P.vol.note}</small>}
                  </fieldset>
                )}
                {P.sit && (
                  <fieldset>
                    <legend>
                      <AF_I n="compass" s={16} /> {P.sit.q}
                    </legend>
                    <div>
                      {P.sit.opts.map(([t], k) => (
                        <button key={t} type="button" className={sit === k ? "is-on" : ""} aria-pressed={sit === k} onClick={() => pickSit(k)}>
                          {t}
                        </button>
                      ))}
                    </div>
                    {sitHit && (
                      <p role="status">
                        {sitHit[2]}{" "}
                        {!sitHit[1].length && (
                          <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Filing situation: " + sitHit[0] + "." })}>
                            Discuss My Filing Requirements
                          </a>
                        )}
                      </p>
                    )}
                    {P.sit.note && <small>{P.sit.note}</small>}
                  </fieldset>
                )}
              </div>
            )}
            <div className="af5-tabs" role="group" aria-label="Bring a plan to the front">
              {names.map((t, k) => (
                <button key={t} type="button" className={cur === k ? "is-on" : ""} aria-pressed={cur === k} onClick={() => setCur(k)}>
                  {t}
                  <small translate="no">{afInr(p.a[k])}</small>
                </button>
              ))}
            </div>
            <div className="af5-deck">
              {[0, 1, 2].map((k) => (
                <AF5_Plan key={k} g={g} d={d} k={k} names={names} on={on} cur={cur} setCur={setCur} sug={sug === k} maxInc={maxInc} />
              ))}
            </div>
            {P.tailored && (
              <p className="af5-plans__tail">
                {P.tailored}{" "}
                <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Tailored requirement." })}>
                  Discuss a Tailored Requirement <AF_I n="arrow" s={13} />
                </a>
              </p>
            )}
            <div className="af5-ladder" role="img" aria-label={"Plan prices: " + names.map((t, k) => t + " " + afInr(p.a[k]) + AF_UNIT[p.u]).join(", ")}>
              {names.map((t, k) => (
                <div key={t} className={"af5-ladder__c" + (cur === k ? " is-on" : "")} style={{ "--h": (p.a[k] / p.a[2]).toFixed(3), "--k": k }}>
                  <span translate="no">{afInr(p.a[k])}</span>
                  <i />
                  <b>{t}</b>
                </div>
              ))}
            </div>
            <X4_Cmp g={g} d={d} names={names} on={on} />
            <p className="af5-fine af5-fine--c">{P.note || "Prices exclude GST and applicable government or third-party fees. Final scope is confirmed in writing."}</p>
          </div>
        </>
      )}
    </AF5_Sec>
  );
}

/* ---------------- scope ---------------- */
function AF5_Scope({ g }) {
  const S = g.scope;
  if (!S) return null;
  return (
    <AF5_Sec cls="af5-scope" hid="af5-scope-h">
      <div className="container">
        <AF5_Head k="Scope" h={S.h || "Deliverables and exclusions"} id="af5-scope-h" ic="doc" />
        <div className="af5-scope__grid">
          <div className="af5-scope__card af5-scope__card--in">
            <h3>
              <span>
                <AF_I n="check" s={16} />
              </span>
              What you receive
            </h3>
            <ul>
              {S.del.map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  <AF_I n="tick" s={14} />
                  {x}
                </li>
              ))}
            </ul>
            {S.delNote && <small>{S.delNote}</small>}
          </div>
          <div className="af5-scope__card af5-scope__card--out">
            <h3>
              <span>
                <AF_I n="cross" s={16} />
              </span>
              Not included
            </h3>
            <ul>
              {S.ni.map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  <AF_I n="cross" s={13} />
                  {x}
                </li>
              ))}
            </ul>
            {S.niNote && <small>{S.niNote}</small>}
          </div>
        </div>
        {S.boundary && <p className="af5-fine">{S.boundary}</p>}
      </div>
    </AF5_Sec>
  );
}

/* ---------------- offers: tear-off coupons ---------------- */
function AF5_Offers({ g }) {
  const O = g.offers || {};
  return (
    <AF5_Sec cls="af5-offers" hid="af5-off-h">
      <div className="container">
        <AF5_Head k="Commercial offers" h={O.h || "Offers and commercial benefits"} id="af5-off-h" ic="gift" />
        <ul className="af5-coupons">
          {AF_OFFERS.map(([ic, t, b, c], k) => (
            <li key={t} style={{ "--k": k }}>
              <span className="af5-coupons__ic" aria-hidden="true">
                <AF_I n={ic} s={20} />
              </span>
              <span className="af5-coupons__body">
                <small>{t}</small>
                <b>{b}</b>
                <em>{c}</em>
              </span>
            </li>
          ))}
        </ul>
        <p className="af5-fine">{O.note || AG_OFFER_NOTE}</p>
      </div>
    </AF5_Sec>
  );
}

/* ---------------- industries ---------------- */
const AF5_IND_IC = [
  [/retail|store|e-?commerce/i, "store"],
  [/manufactur|factory|industrial/i, "factory"],
  [/logistic|transport|distribution|wholesale/i, "truck"],
  [/health|clinic|medical|pharma/i, "med"],
  [/hospitality|hotel|travel/i, "bed"],
  [/export|import|trade/i, "ship"],
  [/tech|saas|software|it\b/i, "nodes"],
  [/real estate|construction|property/i, "building"],
  [/startup|founder|early/i, "rocket"],
  [/professional|consult|agenc|services/i, "case"],
  [/sme|small|growing|business/i, "growth"],
  [/fund|invest|capital|raise/i, "coins"],
];
const af5IndIc = (t) => (AF5_IND_IC.find(([r]) => r.test(t)) || [0, "building"])[1];
function AF5_Ind({ g }) {
  const I = g.ind;
  return (
    <AF5_Sec cls="af5-ind" hid="af5-ind-h">
      <div className="container">
        <AF5_Head k="Who we support" h={I.h} p={I.p} id="af5-ind-h" ic="users" />
        <ul className="af5-ind__grid">
          {I.items.map(([t, x], k) => (
            <li key={t} style={{ "--k": k }}>
              <span className="af5-ind__ic" aria-hidden="true">
                <AF_I n={af5IndIc(t)} s={20} />
              </span>
              <b>{t}</b>
              {x && <small>{x}</small>}
            </li>
          ))}
        </ul>
        {I.note && <p className="af5-fine">{I.note}</p>}
      </div>
    </AF5_Sec>
  );
}

/* ---------------- related + final call ---------------- */
function AF5_Rel({ g }) {
  const R = g.rel;
  if (!R || !R.items) return null;
  return (
    <AF5_Sec cls="af5-rel" hid="af5-rel-h">
      <div className="container">
        <AF5_Head k="Related services" h={R.h} id="af5-rel-h" ic="nodes" />
        <ul className="af5-rel__grid">
          {R.items.map(([s, t], k) => {
            const r = afBy(s);
            if (!r) return null;
            return (
              <li key={s} style={{ "--k": k, "--r1": r.pal[0], "--r2": r.pal[1] }}>
                <PpL to={afUrl(s)}>
                  <span className="af5-rel__ic" aria-hidden="true">
                    <AF_I n={r.ic} s={20} />
                  </span>
                  <b>{r.n}</b>
                  <span>{t}</span>
                  {r.pr && (
                    <em translate="no">
                      From {afInr(r.pr.a[0])}
                      {AF_UNIT[r.pr.u]}
                    </em>
                  )}
                </PpL>
              </li>
            );
          })}
        </ul>
      </div>
    </AF5_Sec>
  );
}
function AF5_Fin({ g }) {
  const F = g.fin;
  return (
    <section className="af5-fin" aria-labelledby="af5-fin-h">
      <div className="af5-fin__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container af5-fin__in">
        <h2 id="af5-fin-h">{F.h}</h2>
        <p>{F.p}</p>
        {F.pts && (
          <ul>
            {F.pts.map((x) => (
              <li key={x}>
                <AF_I n="tick" s={14} /> {x}
              </li>
            ))}
          </ul>
        )}
        <div className="af5-fin__ctas">
          <a className="af5-btn af5-btn--ac" href={"#" + AF_FORM} onClick={agPick({})}>
            {F.c1 || "Book My Free Call"} <AF_I n="arrow" s={16} />
          </a>
          <PpL className="af5-btn af5-btn--ghost" to="/lets-talk">
            Let's talk
          </PpL>
        </div>
      </div>
    </section>
  );
}

const AF5_SECTIONS = { facts: AF5_Facts, prob: AF5_Prob, caps: AF5_Caps, proc: AF5_Proc, plans: AF5_Plans, scope: AF5_Scope, offers: AF5_Offers, ind: AF5_Ind, rel: AF5_Rel, fin: AF5_Fin };
function AF5_Body({ g, d, faq }) {
  const [live, setLive] = ee.useState(false);
  ee.useEffect(() => {
    if (!frkReduce()) setLive(true);
  }, []);
  const rc = af5Recipe(g.th);
  const world = AF5_WORLD[d.fam] || "grid";
  const st = { "--a1": g.pal[0], "--a2": g.pal[1], "--a3": g.pal[2] };
  return (
    <div className={"ag x4 af5 af5--" + world + " ag--" + g.th + (live ? " is-live" : "")} data-af={d.s} style={st}>
      {g.order.map((k) => {
        if (k === "hero") return <AF5_Hero key={k} g={g} d={d} />;
        if (k === "faq") return <X4_Faq key={k} g={g} items={faq} />;
        if (k === "form") return null;
        const C = AF5_SECTIONS[k] || X4_SECTIONS[k];
        if (!C || (k !== "offers" && !g[k])) return null;
        return <C key={k} g={g} d={d} rc={rc} fl={x4Flavour(g.th)} />;
      })}
      <AG_Form g={g} d={d} />
    </div>
  );
}

/* ---------------- hub hero stage (replaces the crowded build-62 orbit, whose labels overlapped) ----------------
   Four family cards stacked in 3D; each lists its services as icons and its lowest published starting price. */
function AF5_HubStage() {
  const fams = Object.keys(AF_FAM);
  return (
    <div className="af5-hub" aria-hidden="true">
      <span className="af5-hub__coin">₹</span>
      {fams.map((f, k) => {
        const list = AF_SVC.filter((d) => d.fam === f);
        const pr = list.filter((d) => d.pr).map((d) => d.pr.a[0]);
        const c = list[0].pal;
        return (
          <div key={f} className="af5-hub__card" style={{ "--k": k, "--c1": c[0], "--c2": c[1] }}>
            <span className="af5-hub__n">{String(k + 1).padStart(2, "0")}</span>
            <b>{AF_FAM[f][0]}</b>
            <span className="af5-hub__ics">
              {list.map((d) => (
                <i key={d.s}>
                  <AF_I n={d.ic} s={14} />
                </i>
              ))}
            </span>
            <small>
              {list.length} services{pr.length ? " · from " + afInr(Math.min.apply(null, pr)) : ""}
            </small>
          </div>
        );
      })}
    </div>
  );
}

export { AF5_Body, AF5_HubStage };
