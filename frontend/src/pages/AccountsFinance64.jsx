/* =====================================================================================================================
 * Build 64 — Accounts & Finance service pages, "motion edition".
 *
 * Every A&F service page (AFS_Page in AccountsFinance.jsx) is now drawn by the X4_* sections below. The content still
 * comes only from the service records (src/data/AccountsFinance63a–d.jsx) — nothing new is invented here: counts, prices
 * and inclusions are read from the records, and every chart is drawn from those same figures (activities per
 * capability, plan prices, inclusions per plan). Decorative motion carries no data.
 *
 * Variety: each service gets its own combination of section treatments (X4_FLAVOUR below), so no two pages share the
 * same layout sequence, on top of each service's own palette (af63.css tokens, .ag--<theme>).
 *
 * Motion safety rules (the build-63 pages could leave steps half-faded):
 *  - content is only hidden for its entrance once the page is running (.x4.is-live) and the section has not yet been
 *    seen; search engines, no-JS and reduced-motion visitors always get the final state;
 *  - every entrance finishes within ~1.8 s and 2.6 s after a section is seen the "is-done" class removes all entrance
 *    animations, so nothing can stay stuck part-way (for example when the tab is in the background);
 *  - looping motion is transform/opacity only and is paused off screen by the site's motion governor (Motion.jsx).
 * =================================================================================================================== */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { RC_useInView } from '../app/shared/Reveal.jsx';
import { PpL } from '../components/dm/shared.jsx';
import { React_Frag } from '../components/dm/ixkit.jsx';
import { frkReduce } from '../components/site/FrKit.jsx';
import { AF_SVC } from '../data/AccountsFinance.jsx';
import { AG_OFFER_NOTE } from '../data/AccountsFinance63a.jsx';
import { AGL_Brief, AGL_Docs, AGL_LABS } from './AccountsFinanceLabs.jsx';
import { AGV } from './AccountsFinanceVisuals.jsx';
import { AF_FORM, AF_HUB, AF_I, AF_OFFERS, AF_TIERS, AF_UNIT, AG_Cell, AG_FLOW_TH, AG_Form, AG_Tip, afBy, afInr, afUrl, afVars, agIndIc, agPick, agPriceTxt, agRxVis, agSplitHl, agTo } from './AccountsFinance.jsx';

const X4_THEMES = ["ledger", "observatory", "journey", "gst", "tds", "payroll", "foresight", "blueprint", "founder", "signal", "futures", "archive", "cockpit", "capital", "observe", "evidence", "studio"];
const X4_FACTS = ["odo", "rings", "blocks"];
const X4_PROB = ["flip", "deck", "bridge"];
const X4_CAPS = ["bars", "donut", "cover", "bento"];
const X4_PROC = ["road", "stairs", "belt", "dial"];
const X4_PLANS = ["flip", "podium", "pass"];
const X4_OFF = ["coupons", "coins"];
function x4Flavour(th) {
  const i = Math.max(0, X4_THEMES.indexOf(th));
  return {
    facts: X4_FACTS[i % 3],
    prob: X4_PROB[(i + 1) % 3],
    caps: X4_CAPS[i % 4],
    proc: X4_PROC[(i + 1) % 4],
    plans: X4_PLANS[(i + 2) % 3],
    off: X4_OFF[i % 2],
    ind: i % 2,
  };
}
const x4Pad = (k) => String(k + 1).padStart(2, "0");

/* ---------- hooks ---------- */
function x4Live() {
  /* true once the page runs in a browser that allows motion */
  const [on, setOn] = ee.useState(false);
  ee.useEffect(() => {
    if (!frkReduce()) setOn(true);
  }, []);
  return on;
}
function x4Count(to, on) {
  const [v, setV] = ee.useState(to);
  const st = ee.useRef(0);
  ee.useEffect(() => {
    if (st.current === 0 && !frkReduce() && to > 0) {
      st.current = 1;
      setV(0);
    }
  }, []);
  ee.useEffect(() => {
    if (!on || st.current !== 1) return;
    st.current = 2;
    let raf = 0,
      t0 = 0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1500);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    const safety = setTimeout(() => setV(to), 2400);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(safety);
      setV(to);
    };
  }, [on]);
  return v;
}
/* pointer tilt for 3D cards: sets --rx/--ry/--mx/--my on the element */
function x4Tilt(max) {
  const m = max || 8;
  return {
    onPointerMove: (e) => {
      if (e.pointerType !== "mouse" || frkReduce()) return;
      const el = e.currentTarget,
        r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width,
        y = (e.clientY - r.top) / r.height;
      el.style.setProperty("--ry", ((x - 0.5) * m).toFixed(2) + "deg");
      el.style.setProperty("--rx", ((0.5 - y) * m).toFixed(2) + "deg");
      el.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
      el.style.setProperty("--my", (y * 100).toFixed(1) + "%");
    },
    onPointerLeave: (e) => {
      const el = e.currentTarget;
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    },
  };
}
/* auto-advance while visible, not hovered/focused and motion allowed */
function x4Auto(n, on, ms, set) {
  const hold = ee.useRef(false);
  ee.useEffect(() => {
    if (!on || n < 2 || frkReduce()) return;
    const t = setInterval(() => {
      if (!hold.current && !document.hidden) set((k) => (k + 1) % n);
    }, ms);
    return () => clearInterval(t);
  }, [on, n]);
  return {
    onPointerEnter: () => (hold.current = true),
    onPointerLeave: () => (hold.current = false),
    onFocus: () => (hold.current = true),
    onBlur: () => (hold.current = false),
  };
}

/* ---------- shared pieces ---------- */
function X4_Sec({ id, cls, hid, dk, alt, children }) {
  const [ref, v] = RC_useInView(0.06);
  const [done, setDone] = ee.useState(false);
  ee.useEffect(() => {
    if (!v) return;
    const t = setTimeout(() => setDone(true), 2600);
    return () => clearTimeout(t);
  }, [v]);
  return (
    <section ref={ref} id={id} className={"x4-sec " + cls + (dk ? " is-dk" : alt ? " is-alt" : "") + (v ? " is-in" : "") + (done ? " is-done" : "")} aria-labelledby={hid}>
      {children(v)}
    </section>
  );
}
function X4_Head({ k, h, p, id, c, ic, children }) {
  return (
    <div className={"x4-head" + (c ? " x4-head--c" : "")}>
      {k && (
        <span className="x4-kick rv">
          <i aria-hidden="true">
            <AF_I n={ic || "spark"} s={13} />
          </i>
          {k}
        </span>
      )}
      <h2 id={id} className="rv" style={{ "--k": 1 }}>
        {h}
      </h2>
      {p && (
        <p className="rv" style={{ "--k": 2 }}>
          {p}
        </p>
      )}
      {children}
    </div>
  );
}
function X4_Note({ t, c }) {
  if (!t) return null;
  return (
    <p className={"x4-note rv" + (c ? " x4-note--c" : "")}>
      <AF_I n="flag" s={14} />
      {t}
    </p>
  );
}
/* animated donut (SVG) — segs: [{v, on}] ; draws on view */
function X4_Donut({ segs, on, size, sel, onPick, label, center }) {
  const S = size || 220,
    R = S / 2 - 16,
    C = 2 * Math.PI * R;
  const tot = segs.reduce((n, s) => n + s.v, 0) || 1;
  let acc = 0;
  return (
    <svg className={"x4-donut" + (on ? " is-on" : "")} viewBox={`0 0 ${S} ${S}`} width={S} height={S} role={onPick ? undefined : "img"} aria-label={label}>
      <circle cx={S / 2} cy={S / 2} r={R} className="x4-donut__bg" />
      <circle cx={S / 2} cy={S / 2} r={R + 11} className="x4-donut__tick" />
      {segs.map((s, k) => {
        const len = (s.v / tot) * C;
        const off = acc;
        acc += len;
        return (
          <circle
            key={k}
            cx={S / 2}
            cy={S / 2}
            r={R}
            className={"x4-donut__seg" + (sel === k ? " is-sel" : "")}
            style={{ "--len": Math.max(0, len - 2.5).toFixed(2), "--off": (-off).toFixed(2), "--c": C.toFixed(2), "--k": k, "--hue": k }}
            onClick={onPick ? () => onPick(k) : undefined}
            aria-hidden="true"
          />
        );
      })}
      {center}
    </svg>
  );
}

/* ================= Hero ================= */
const X4_TOK = ["rupee", "bars", "pie", "shield", "calendar", "doc", "coins", "gauge"];
function X4_Hero({ g, d }) {
  const H = g.hero;
  const V = AGV[g.th] || null;
  const flow = AG_FLOW_TH[g.th];
  const tilt = x4Tilt(7);
  return (
    <section className="x4-hero is-dk" aria-labelledby="ag-h1">
      <div className="x4-hero__bg" aria-hidden="true">
        <i className="x4-aur x4-aur--1" />
        <i className="x4-aur x4-aur--2" />
        <i className="x4-aur x4-aur--3" />
        <i className="x4-hero__grid" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((k) => (
          <b key={k} className="x4-spark" style={{ "--k": k }} />
        ))}
      </div>
      <div className="container x4-hero__in">
        <div className="x4-hero__copy">
          <nav className="ag-crumbs x4-crumbs" aria-label="Breadcrumb">
            <PpL to="/services">Services</PpL>
            <span aria-hidden="true">/</span>
            <PpL to={AF_HUB}>Accounts &amp; Finance</PpL>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{d.n}</span>
          </nav>
          <span className="x4-eb">
            <i aria-hidden="true">
              <AF_I n={d.ic} s={15} />
            </i>
            {H.eb}
            <s aria-hidden="true" />
          </span>
          <HeroH1 id="ag-h1" className="x4-h1">
            {agSplitHl(H.h1, H.hl)}
          </HeroH1>
          <p className="x4-hero__sub">{H.sub}</p>
          {H.body && <p className="x4-hero__body">{H.body}</p>}
          <div className="x4-hero__ctas">
            <a className="x4-btn x4-btn--ac x4-btn--lg" href={"#" + AF_FORM} onClick={agPick({})}>
              <span>Book a Free 20-Minute Consultation</span> <AF_I n="arrow" s={17} />
            </a>
            <a className="x4-btn x4-btn--ghost x4-btn--lg" href="#ag-plans" onClick={agTo("ag-plans")}>
              <span>{H.c2 || "See Plans & Pricing"}</span>
            </a>
          </div>
          <div className="x4-hero__price">
            <span className="x4-hero__pic" aria-hidden="true">
              <AF_I n="rupee" s={18} />
            </span>
            <span>
              <b>{H.price}</b>
              {H.pnote && <small>{H.pnote}</small>}
            </span>
          </div>
          {H.trust && <p className="x4-hero__trust">{H.trust}</p>}
          {H.micro && (
            <ul className={"x4-micro" + (flow ? " is-flow" : "")} aria-label={flow ? "How the work flows" : "Highlights"}>
              {H.micro.map((m, k) => (
                <li key={m} style={{ "--k": k }}>
                  {m}
                </li>
              ))}
            </ul>
          )}
          {H.goals && (
            <ul className="x4-goals">
              {H.goals.map((m, k) => (
                <li key={m} style={{ "--k": k }}>
                  <AF_I n="target" s={14} />
                  {m}
                </li>
              ))}
            </ul>
          )}
          {H.microNote && <p className="x4-hero__fine">{H.microNote}</p>}
          {H.note && <p className="x4-hero__quote">{H.note}</p>}
        </div>
        <div className="x4-hero__stage">
          <div className="x4-hero__orbit" aria-hidden="true">
            {X4_TOK.map((n, k) => (
              <span key={n} className="x4-tok" style={{ "--k": k }}>
                <AF_I n={n} s={18} />
              </span>
            ))}
          </div>
          <div className="x4-hero__frame" {...tilt}>
            <i className="x4-hero__glare" aria-hidden="true" />
            {V && <V g={g} d={d} />}
          </div>
          <p className="x4-hero__cap">
            <AF_I n="flag" s={12} />
            {H.cap}
          </p>
        </div>
      </div>
      <span className="x4-hero__cue" aria-hidden="true">
        <i />
      </span>
    </section>
  );
}

/* ================= Facts ================= */
function X4_Odo({ s }) {
  /* rolling digits; non-digits stay still */
  return (
    <b className="x4-odo" translate="no" aria-label={s}>
      {s.split("").map((ch, k) =>
        /\d/.test(ch) ? (
          <span key={k} className="x4-odo__d" style={{ "--d": +ch, "--k": k }} aria-hidden="true">
            <span>
              {"0123456789".split("").map((x) => (
                <i key={x}>{x}</i>
              ))}
            </span>
          </span>
        ) : (
          <span key={k} className="x4-odo__s" aria-hidden="true">
            {ch}
          </span>
        )
      )}
    </b>
  );
}
function X4_Num({ s, on }) {
  const m = /^(\D*)(\d[\d,]*)(.*)$/.exec(s || "");
  const to = m ? +m[2].replace(/,/g, "") : 0;
  const v = x4Count(to, on);
  if (!m) return <b translate="no">{s}</b>;
  return (
    <b translate="no" aria-label={s}>
      <span aria-hidden="true">
        {m[1]}
        {m[2].indexOf(",") >= 0 ? v.toLocaleString("en-IN") : v}
        {m[3]}
      </span>
    </b>
  );
}
const X4_FACT_IC = ["layers", "check", "rupee", "route", "calendar", "doc"];
function X4_FactsList({ items, mode, on }) {
  return (
    <ul className={"x4-facts__list x4-facts--" + mode}>
      {items.map(([n, t], k) => (
        <li key={t} className="rv" style={{ "--k": k + 1 }}>
          {mode === "rings" && (
            <svg className="x4-ring" viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="52" className="x4-ring__bg" />
              <circle cx="60" cy="60" r="52" className="x4-ring__fg" />
              <circle cx="60" cy="60" r="58" className="x4-ring__dash" />
            </svg>
          )}
          {mode === "blocks" && (
            <span className="x4-blk" aria-hidden="true">
              <i />
              <i />
              <AF_I n={X4_FACT_IC[k % X4_FACT_IC.length]} s={22} />
            </span>
          )}
          {mode === "odo" ? <X4_Odo s={n} /> : <X4_Num s={n} on={on} />}
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}
function X4_Facts({ g, fl }) {
  const F = g.facts;
  return (
    <X4_Sec cls={"x4-facts x4-facts-sec--" + fl.facts} hid="ag-facts-h" alt>
      {(on) => (
        <div className="container">
          <h2 id="ag-facts-h" className={F.h ? "x4-facts__h rv" : "af-sr"}>
            {F.h || "The service at a glance"}
          </h2>
          <X4_FactsList items={F.items} mode={fl.facts} on={on} />
          {F.note && <p className="x4-facts__note rv">{F.note}</p>}
        </div>
      )}
    </X4_Sec>
  );
}
/* ITR readiness strip */
function X4_Strip({ g, fl }) {
  const S = g.strip;
  return (
    <X4_Sec cls="x4-strip" hid="ag-strip-h" alt>
      {(on) => (
        <div className="container">
          <div className="x4-strip__top">
            <h2 id="ag-strip-h" className="rv">
              {S.h}
            </h2>
            <span className="agl-tag">{S.label}</span>
          </div>
          <ol className="x4-strip__route" style={{ "--n": S.stages.length }}>
            <i className="x4-strip__file" aria-hidden="true">
              <AF_I n="doc" s={16} />
            </i>
            {S.stages.map((t, k) => (
              <li key={t} className="rv" style={{ "--k": k }}>
                <span>{k + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <X4_FactsList items={S.facts} mode={fl.facts} on={on} />
          <p className="x4-facts__note rv">{S.note}</p>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Problems ================= */
const X4_PROB_IC = ["lens", "calendar", "receipt", "shield", "gauge", "layers", "clock", "compass"];
function X4_Prob({ g, fl }) {
  const P = g.prob;
  const L = P.L || ["The challenge", "How we help", "Value"];
  const [flip, setFlip] = ee.useState({});
  const [on, setOn] = ee.useState(0);
  const n = P.items.length;
  const mode = fl.prob;
  return (
    <X4_Sec cls={"x4-prob x4-prob--" + mode} hid="ag-prob-h">
      {(vis) => {
        return (
          <div className="container">
            <X4_Head k={P.k !== P.h ? P.k : "The challenge"} h={P.h} p={P.p} id="ag-prob-h" ic="target" />
            {mode === "flip" && (
              <ul className="x4-flips">
                {P.items.map((it, k) => {
                  const f = !!flip[k];
                  return (
                    <li key={it[0]} className={"x4-flip rv" + (f ? " is-flip" : "")} style={{ "--k": k }}>
                      <div className="x4-flip__in">
                        <div className="x4-flip__f">
                          <span className="x4-flip__ic" aria-hidden="true">
                            <AF_I n={X4_PROB_IC[k % X4_PROB_IC.length]} s={26} />
                          </span>
                          <span className="x4-flip__n">{x4Pad(k)}</span>
                          <h3>{it[0]}</h3>
                          <p>
                            <em>{L[0]}</em>
                            {it[1]}
                          </p>
                        </div>
                        <div className="x4-flip__b">
                          <span className="x4-flip__ok" aria-hidden="true">
                            <AF_I n="check" s={26} />
                          </span>
                          <p>
                            <em>{L[1]}</em>
                            {it[2]}
                          </p>
                          {it[3] && (
                            <p>
                              <em>{L[2]}</em>
                              {it[3]}
                            </p>
                          )}
                        </div>
                      </div>
                      <button type="button" className="x4-flip__btn" aria-pressed={f} onClick={() => setFlip((x) => ({ ...x, [k]: !x[k] }))}>
                        <AF_I n="refresh" s={14} />
                        {f ? L[0] : L[1]}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
            {mode === "deck" && <X4_Deck P={P} L={L} on={on} setOn={setOn} vis={vis} />}
            {mode === "bridge" && (
              <ol className="x4-bridges">
                {P.items.map((it, k) => (
                  <li key={it[0]} className="x4-bridge rv" style={{ "--k": k }}>
                    <div className="x4-bridge__p">
                      <span className="x4-bridge__n">{x4Pad(k)}</span>
                      <h3>{it[0]}</h3>
                      <p>
                        <em>{L[0]}</em>
                        {it[1]}
                      </p>
                    </div>
                    <span className="x4-bridge__arc" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <AF_I n="arrow" s={18} />
                    </span>
                    <div className="x4-bridge__s">
                      <p>
                        <em>{L[1]}</em>
                        {it[2]}
                      </p>
                      {it[3] && (
                        <p className="x4-bridge__v">
                          <em>{L[2]}</em>
                          {it[3]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        );
      }}
    </X4_Sec>
  );
}
function X4_Deck({ P, L, on, setOn, vis }) {
  const n = P.items.length;
  const hold = x4Auto(n, vis, 6500, setOn);
  const it = P.items[on];
  return (
    <div className="x4-deck rv" {...hold}>
      <div className="x4-deck__tabs" role="tablist" aria-label={P.h}>
        {P.items.map((x, k) => (
          <button key={x[0]} type="button" role="tab" id={"x4-dt" + k} aria-selected={on === k} aria-controls="x4-dp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
            <span>{x4Pad(k)}</span>
            <b>{x[0]}</b>
            <i aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="x4-deck__stage">
        {P.items.map((x, k) => {
          const pos = (k - on + n) % n;
          return <span key={x[0]} className="x4-deck__ghost" style={{ "--p": pos }} aria-hidden="true" />;
        })}
        <div className="x4-deck__card" id="x4-dp" role="tabpanel" aria-labelledby={"x4-dt" + on} key={on}>
          <span className="x4-deck__n" aria-hidden="true">
            {x4Pad(on)}
          </span>
          <h3>{it[0]}</h3>
          <div className="x4-deck__cols">
            <p className="x4-deck__p">
              <em>{L[0]}</em>
              {it[1]}
            </p>
            <p className="x4-deck__a">
              <em>{L[1]}</em>
              {it[2]}
            </p>
          </div>
          {it[3] && (
            <p className="x4-deck__v">
              <em>{L[2]}</em>
              {it[3]}
            </p>
          )}
          <span className="x4-deck__bar" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}

/* ================= Capabilities ================= */
function x4CapList(g, d) {
  const C = g.caps;
  const list = C.list.map((c, i) => ({ i, n: c[0], c: c[1], desc: c[2], acts: Array.isArray(c[3]) ? c[3] : c[3] === null ? (d.caps[i] ? d.caps[i][1] : null) : null, own: Array.isArray(c[3]), sum: c[3] === "summary" }));
  const grp = {};
  if (C.groups) C.groups.forEach(([gl, ix], gi) => ix.forEach((i) => (grp[i] = [gl, gi])));
  list.forEach((x) => (x.g = grp[x.i] || null));
  const order = C.groups ? C.groups.flatMap(([, ix]) => ix) : list.map((x) => x.i);
  return { list, order, total: list.reduce((n, x) => n + x.c, 0), max: Math.max.apply(null, list.map((x) => x.c)) };
}
function X4_CapDetail({ x, total, C, on }) {
  const share = total ? x.c / total : 0;
  return (
    <div className="x4-cd" key={x.i}>
      <div className="x4-cd__top">
        <X4_Donut
          segs={[{ v: x.c }, { v: Math.max(0, total - x.c) }]}
          on={on}
          size={112}
          label={x.c + " of " + total + " listed activities"}
          center={
            <text x="56" y="62" textAnchor="middle" className="x4-donut__t">
              {Math.round(share * 100)}%
            </text>
          }
        />
        <div>
          <span className="x4-cd__no">Capability {x4Pad(x.i)}</span>
          <h3>{x.n}</h3>
          <span className="x4-cd__badge">
            {x.c} activities · {x.c} of {total}
          </span>
          {x.g && <span className="x4-cd__grp">{x.g[0]}</span>}
        </div>
      </div>
      <p className="x4-cd__d">{x.desc}</p>
      {x.acts && (
        <>
          <p className="x4-cd__lt">{x.own ? "Activities" : "Activities in our service catalogue"}</p>
          <ul className="x4-cd__acts">
            {x.acts.map((a, j) => (
              <li key={a} style={{ "--j": j }}>
                <AF_I n="tick" s={14} />
                {a}
              </li>
            ))}
          </ul>
        </>
      )}
      {x.sum && <p className="x4-cd__lt">Capability summary — the detailed activity list is confirmed during the engagement.</p>}
      <p className="x4-cd__scope">
        <AF_I n="flag" s={13} />
        {C.out ? C.out + " " : ""}Activities included in your engagement depend on the selected plan and written scope.
      </p>
      <a className="x4-link" href={"#" + AF_FORM} onClick={agPick({ areas: [x.n] })}>
        {x.i === 0 ? "Discuss " + x.n : "Discuss This Requirement"} <AF_I n="arrow" s={14} />
      </a>
    </div>
  );
}
const X4_CAP_IC = ["ledger", "receipt", "bank", "doc", "calendar", "gauge", "bars", "shield", "lens", "coins", "pie", "people", "compass", "layers", "gear"];
function X4_Caps({ g, d, fl }) {
  const C = g.caps;
  const { list, order, total, max } = x4CapList(g, d);
  const [on, setOn] = ee.useState(order[0]);
  const btns = ee.useRef([]);
  const mode = fl.caps;
  const key = (e, i) => {
    const p = order.indexOf(i);
    const map = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let t = null;
    if (map[e.key]) t = order[(p + map[e.key] + order.length) % order.length];
    else if (e.key === "Home") t = order[0];
    else if (e.key === "End") t = order[order.length - 1];
    if (t == null) return;
    e.preventDefault();
    setOn(t);
    btns.current[t] && btns.current[t].focus();
  };
  const bp = (x) => ({
    type: "button",
    ref: (el) => (btns.current[x.i] = el),
    id: "ag-cb" + x.i,
    "aria-pressed": on === x.i,
    "aria-controls": "x4-capd",
    onClick: () => setOn(x.i),
    onKeyDown: (e) => key(e, x.i),
  });
  const cur = list[on] || list[0];
  const seq = order.map((i) => list[i]);
  return (
    <X4_Sec cls={"x4-caps x4-caps--" + mode} hid="ag-caps-h" dk>
      {(vis) => (
        <div className="container">
          <X4_Head k="Capabilities" h={C.h} p={C.p} id="ag-caps-h" ic="layers">
            <p className="x4-caps__sum rv" style={{ "--k": 3 }}>
              <span>
                <b>{list.length}</b> capability areas
              </span>
              <span>
                <b>{total}</b> listed activities
              </span>
            </p>
          </X4_Head>
          {mode === "cover" ? (
            <div className="x4-cover rv">
              <div className="x4-cover__track" style={{ "--n": seq.length }}>
                {seq.map((x, k) => {
                  const pos = k - order.indexOf(cur.i);
                  return (
                    <button key={x.i} {...bp(x)} className={"x4-cover__card" + (on === x.i ? " is-on" : "")} style={{ "--p": pos, "--a": Math.abs(pos) }} tabIndex={Math.abs(pos) > 3 ? -1 : 0}>
                      <span className="x4-cover__ic" aria-hidden="true">
                        <AF_I n={X4_CAP_IC[x.i % X4_CAP_IC.length]} s={24} />
                      </span>
                      <span className="x4-cover__no">{x4Pad(x.i)}</span>
                      <b>{x.n}</b>
                      <span className="x4-cover__c">{x.c} activities</span>
                    </button>
                  );
                })}
              </div>
              <div className="x4-cover__nav">
                <button type="button" aria-label="Previous capability" onClick={() => setOn(order[(order.indexOf(cur.i) - 1 + order.length) % order.length])}>
                  <AF_I n="arrow" s={18} className="is-back" />
                </button>
                <span translate="no">
                  {x4Pad(order.indexOf(cur.i))} / {x4Pad(order.length - 1)}
                </span>
                <button type="button" aria-label="Next capability" onClick={() => setOn(order[(order.indexOf(cur.i) + 1) % order.length])}>
                  <AF_I n="arrow" s={18} />
                </button>
              </div>
              <div id="x4-capd" className="x4-caps__panel" role="region" aria-live="polite" aria-label={cur.n}>
                <X4_CapDetail x={cur} total={total} C={C} on={vis} />
              </div>
            </div>
          ) : (
            <div className="x4-caps__grid">
              <div className={"x4-caps__pick rv x4-pick--" + mode}>
                {mode === "donut" && (
                  <div className="x4-caps__chart">
                    <X4_Donut
                      segs={list.map((x) => ({ v: x.c }))}
                      on={vis}
                      size={260}
                      sel={on}
                      onPick={(k) => setOn(k)}
                      label={"Activities per capability area: " + list.map((x) => x.n + " " + x.c).join(", ")}
                      center={
                        <>
                          <text x="130" y="124" textAnchor="middle" className="x4-donut__t">
                            {cur.c}
                          </text>
                          <text x="130" y="148" textAnchor="middle" className="x4-donut__s">
                            of {total} activities
                          </text>
                        </>
                      }
                    />
                  </div>
                )}
                <div className="x4-caps__list" style={{ "--max": max }}>
                  {seq.map((x, k) => (
                    <React_Frag key={x.i}>
                      {x.g && (k === 0 || seq[k - 1].g[1] !== x.g[1]) && (
                        <span className="x4-caps__grp" aria-hidden="true">
                          <i>{String.fromCharCode(65 + x.g[1])}</i>
                          {x.g[0]}
                        </span>
                      )}
                      <button {...bp(x)} className={"x4-cap" + (on === x.i ? " is-on" : "")} style={{ "--k": k, "--v": x.c, "--hue": x.i }}>
                        {mode === "bento" && (
                          <span className="x4-cap__ic" aria-hidden="true">
                            <AF_I n={X4_CAP_IC[x.i % X4_CAP_IC.length]} s={20} />
                          </span>
                        )}
                        {mode === "donut" && <i className="x4-cap__sw" aria-hidden="true" />}
                        <span className="x4-cap__no">{x4Pad(x.i)}</span>
                        <span className="x4-cap__t">{x.n}</span>
                        <span className="x4-cap__c" aria-label={x.c + " activities"}>
                          {x.c}
                        </span>
                        {mode === "bars" && <i className="x4-cap__bar" aria-hidden="true" />}
                      </button>
                    </React_Frag>
                  ))}
                </div>
              </div>
              <div id="x4-capd" className="x4-caps__panel rv" style={{ "--k": 2 }} role="region" aria-live="polite" aria-label={cur.n}>
                <X4_CapDetail x={cur} total={total} C={C} on={vis} />
              </div>
            </div>
          )}
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Principles ================= */
function X4_Principles({ g }) {
  const P = g.principles;
  const [on, setOn] = ee.useState(0);
  return (
    <X4_Sec cls={"x4-prin" + (P.route ? " x4-prin--route" : "")} hid="ag-prin-h" alt>
      {(vis) => (
        <div className="container">
          <X4_Head k={P.k} h={P.h} id="ag-prin-h" ic="compass" />
          {P.flow && (
            <div className="x4-pipe rv" aria-label="How records move through the workflow">
              <ol>
                {P.flow.map((t, k) => (
                  <li key={t} style={{ "--k": k }}>
                    <span>{t}</span>
                  </li>
                ))}
              </ol>
              <div className="x4-pipe__layer">
                <em>{P.layerT}</em>
                {P.layer.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          )}
          {P.route ? (
            <div className="x4-route rv">
              <div className="x4-route__nodes" role="tablist" aria-label="Principles">
                {P.items.map(([t], k) => (
                  <button key={t} type="button" role="tab" id={"ag-pr" + k} aria-selected={on === k} aria-controls="ag-prp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                    <span>{x4Pad(k)}</span>
                    <b>{t}</b>
                  </button>
                ))}
              </div>
              <div className="x4-route__panel" role="tabpanel" id="ag-prp" aria-labelledby={"ag-pr" + on} key={on}>
                <span className="x4-route__no" aria-hidden="true">
                  {x4Pad(on)}
                </span>
                <h3>{P.items[on][0]}</h3>
                <p>{P.items[on][1]}</p>
              </div>
            </div>
          ) : (
            <ol className="x4-dominoes">
              {P.items.map(([t, p], k) => (
                <li key={t} className="rv" style={{ "--k": k }}>
                  <span className="x4-dominoes__n">{x4Pad(k)}</span>
                  <h3>{t}</h3>
                  <p>{p}</p>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Responsible AI / technology ================= */
function X4_Ai({ g }) {
  const A = g.ai;
  const [on, setOn] = ee.useState(0);
  return (
    <X4_Sec cls="x4-ai" hid="ag-ai-h">
      {() => (
        <div className="container">
          <X4_Head k={A.k} h={A.h} p={A.p} id="ag-ai-h" ic="gear" />
          <ul className="x4-ai__grid">
            {A.items.map(([ic, t, p], k) => (
              <li key={t} className="rv" style={{ "--k": k }}>
                <span className="x4-ai__ic" aria-hidden="true">
                  <AF_I n={ic} s={24} />
                  <i />
                </span>
                <h3>{t}</h3>
                <p>{p}</p>
              </li>
            ))}
          </ul>
          {A.flow && (
            <ol className="x4-pipe x4-pipe--solo rv" aria-label="From documents to return preparation">
              {A.flow.map((t, k) => (
                <li key={t} style={{ "--k": k }}>
                  <span>{t}</span>
                </li>
              ))}
            </ol>
          )}
          {A.map && (
            <div className="x4-amap rv">
              <div className="x4-amap__nav" role="tablist" aria-label="Scenario map">
                {A.map.map(([t], k) => (
                  <button key={t} type="button" role="tab" aria-selected={on === k} aria-controls="ag-aimp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                    <span>{k + 1}</span>
                    {t}
                  </button>
                ))}
              </div>
              <div className="x4-amap__p" id="ag-aimp" role="tabpanel" key={on}>
                <p>
                  <em>What happens</em>
                  {A.map[on][1]}
                </p>
                <i aria-hidden="true">
                  <AF_I n="arrow" s={18} />
                </i>
                <p>
                  <em>How it is checked</em>
                  {A.map[on][2]}
                </p>
              </div>
            </div>
          )}
          <p className="x4-ai__note rv">
            <AF_I n="shield" s={16} />
            {A.note}
          </p>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Process ================= */
function X4_Proc({ g, fl }) {
  const P = g.proc;
  const n = P.steps.length;
  const L = P.L || [];
  const [on, setOn] = ee.useState(0);
  const rich = P.steps.some((s) => s[2] && s[2].length);
  let mode = P.mode === "cycle" ? "dial" : fl.proc;
  if (mode === "dial" && P.mode !== "cycle") mode = "belt";
  if (mode === "stairs" && !rich && P.steps.some((s) => s[1])) mode = "road";
  const phaseOf = (k) => (P.phases ? P.phases.find(([, i]) => i === k) : null);
  return (
    <X4_Sec cls={"x4-proc x4-proc--" + mode} hid="ag-proc-h" alt={mode !== "dial"}>
      {(vis) => {
        const step = (s, k, extra) => (
          <li key={s[0]} className={"x4-st rv" + (on === k ? " is-on" : "") + (k < on ? " is-past" : "")} style={{ "--k": k, "--n": n }}>
            {phaseOf(k) && <em className="x4-st__ph">{phaseOf(k)[0]}</em>}
            <button type="button" className="x4-st__btn" aria-pressed={on === k} aria-controls={rich ? "x4-stp" : undefined} onClick={() => setOn(k)}>
              <span className="x4-st__dot">{x4Pad(k)}</span>
              <b>{s[0]}</b>
            </button>
            {s[1] && !rich && <p>{s[1]}</p>}
            {extra}
          </li>
        );
        return (
          <div className="container">
            <X4_Head k={n + "-step process"} h={P.h} p={P.p} id="ag-proc-h" ic="route" />
            {mode === "road" && (
              <ol className="x4-road" style={{ "--n": n }}>
                <i className="x4-road__line" aria-hidden="true">
                  <s />
                </i>
                {P.steps.map((s, k) => step(s, k))}
              </ol>
            )}
            {mode === "stairs" && (
              <ol className="x4-stairs" style={{ "--n": n }}>
                {P.steps.map((s, k) =>
                  step(
                    s,
                    k,
                    <span className="x4-stairs__blk" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                  )
                )}
              </ol>
            )}
            {mode === "belt" && (
              <div className="x4-belt">
                <i className="x4-belt__rail" aria-hidden="true" />
                <ol className="x4-belt__track" style={{ "--n": n }}>
                  {P.steps.map((s, k) => step(s, k))}
                </ol>
              </div>
            )}
            {mode === "dial" && <X4_Dial P={P} n={n} on={on} setOn={setOn} vis={vis} step={step} />}
            {rich && (
              <div className="x4-stp rv" id="x4-stp" role="region" aria-live="polite" key={on}>
                <span className="x4-stp__meta">
                  Stage {on + 1} of {n}
                </span>
                <h3>{P.steps[on][0]}</h3>
                <dl>
                  <div>
                    <dt>{L[0] || "What happens"}</dt>
                    <dd>{P.steps[on][1]}</dd>
                  </div>
                  {(P.steps[on][2] || []).map((x, j) => (
                    <div key={j}>
                      <dt>{L[j + 1]}</dt>
                      <dd>{x}</dd>
                    </div>
                  ))}
                </dl>
                <div className="x4-stp__nav">
                  <button type="button" disabled={on === 0} onClick={() => setOn(on - 1)}>
                    ← Previous stage
                  </button>
                  <button type="button" disabled={on === n - 1} onClick={() => setOn(on + 1)}>
                    Next stage →
                  </button>
                </div>
              </div>
            )}
            {P.resp && (
              <ul className="x4-resp">
                {P.resp.map(([w, t], k) => (
                  <li key={k} className="rv" style={{ "--k": k }}>
                    <b>{w}</b>
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <X4_Note t={P.note} />
          </div>
        );
      }}
    </X4_Sec>
  );
}
function X4_Dial({ P, n, on, setOn, vis, step }) {
  const hold = x4Auto(n, vis, 3200, setOn);
  return (
    <div className="x4-dial" {...hold}>
      <div className="x4-dial__ring rv" aria-hidden="true" style={{ "--a": (on / n) * 360 + "deg" }}>
        <i className="x4-dial__track" />
        {P.steps.map((s, k) => (
          <span key={k} className={"x4-dial__pin" + (k === on ? " is-on" : "") + (k < on ? " is-past" : "")} style={{ "--t": (k / n) * 360 + "deg" }}>
            <b>{k + 1}</b>
          </span>
        ))}
        <i className="x4-dial__hand" />
        <span className="x4-dial__core">
          <b>Monthly</b>
          <span>payroll cycle</span>
          <em translate="no">
            {on + 1}/{n}
          </em>
        </span>
      </div>
      <ol className="x4-dial__list">{P.steps.map((s, k) => step(s, k))}</ol>
    </div>
  );
}

/* ================= Plans & pricing ================= */
function X4_Price({ v, on, from, unit }) {
  const x = x4Count(v, on);
  return (
    <div className="x4-price">
      {from && <em>Starting from</em>}
      <b translate="no" aria-label={afInr(v)}>
        <span aria-hidden="true">{afInr(x)}</span>
      </b>
      <i>{unit}</i>
    </div>
  );
}
function X4_Tier({ g, d, k, names, on, sug, mode, maxInc }) {
  const P = g.plans,
    p = d.pr;
  const [flip, setFlip] = ee.useState(false);
  const fRef = ee.useRef(null),
    bRef = ee.useRef(null),
    moved = ee.useRef(false);
  ee.useEffect(() => {
    if (!moved.current) return;
    const el = flip ? bRef.current : fRef.current;
    el && el.focus({ preventScroll: true });
  }, [flip]);
  const turn = (v) => () => {
    moved.current = true;
    setFlip(v);
  };
  const inc = P.inc[k];
  const tilt = x4Tilt(6);
  return (
    <article className={"x4-tier x4-tier--" + k + (k === 1 ? " is-pop" : "") + (flip ? " is-flip" : "") + (sug ? " is-sug" : "")} aria-labelledby={"ag-tier-" + k} style={{ "--k": k, "--h": (p.a[k] / p.a[2]).toFixed(3) }}>
      {mode === "podium" && (
        <span className="x4-tier__ped" aria-hidden="true">
          <i />
        </span>
      )}
      <div className="x4-tier__tilt" {...tilt}>
        <div className="x4-tier__in">
          <div className="x4-tier__f">
            <div className="x4-tier__top">
              <h3 id={"ag-tier-" + k}>{names[k]}</h3>
              {k === 1 && (
                <span className="x4-tier__pop">
                  <AF_I n="spark" s={12} />
                  Most popular
                </span>
              )}
              {sug && k !== 1 && <span className="x4-tier__pop x4-tier__pop--sug">Suggested</span>}
            </div>
            <p className="x4-tier__best">{P.best[k]}</p>
            <X4_Price v={p.a[k]} on={on} from={p.from} unit={AF_UNIT[p.u]} />
            <small className="x4-tier__gst">+ applicable GST</small>
            {P.monthly && <small className="x4-tier__eq">≈ {afInr((p.a[k] / 12).toFixed(2))}/month equivalent, for comparison only</small>}
            {mode === "pass" && (
              <span className="x4-tier__perf" aria-hidden="true">
                <i />
              </span>
            )}
            <div className="x4-tier__meter" aria-hidden="true">
              <span>
                <i style={{ "--w": (inc.length / maxInc).toFixed(3) }} />
              </span>
              <em>{inc.length} inclusions</em>
            </div>
            <ul className="x4-tier__list">
              {inc.slice(0, 3).map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  <AF_I n="tick" s={14} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="x4-tier__acts">
              <a className={"x4-btn " + (k === 1 ? "x4-btn--ac" : "x4-btn--line")} href={"#" + AF_FORM} onClick={agPick({ plan: k })}>
                <span>Choose {names[k]}</span>
              </a>
              {inc.length > 3 && (
                <button type="button" className="x4-tier__flipbtn" aria-expanded={flip} aria-controls={"x4-tb" + k} onClick={turn(true)} ref={fRef}>
                  <AF_I n="refresh" s={14} />
                  See all {inc.length} inclusions
                </button>
              )}
            </div>
          </div>
          <div className="x4-tier__b" id={"x4-tb" + k}>
            <div className="x4-tier__top">
              <b className="x4-tier__bn">{names[k]}</b>
              <span className="x4-tier__bp" translate="no">
                {afInr(p.a[k])}
                {AF_UNIT[p.u]}
              </span>
            </div>
            <ul className="x4-tier__list x4-tier__list--all">
              {inc.map((x, j) => (
                <li key={x} style={{ "--j": j }}>
                  <AF_I n="tick" s={14} />
                  <span>{x}</span>
                </li>
              ))}
            </ul>
            <div className="x4-tier__acts">
              <a className={"x4-btn " + (k === 1 ? "x4-btn--ac" : "x4-btn--line")} href={"#" + AF_FORM} onClick={agPick({ plan: k })} tabIndex={flip ? 0 : -1}>
                <span>Choose {names[k]}</span>
              </a>
              <button type="button" className="x4-tier__flipbtn" onClick={turn(false)} tabIndex={flip ? 0 : -1} ref={bRef}>
                <AF_I n="refresh" s={14} />
                Back to summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
function X4_Ladder({ d, names, on }) {
  const p = d.pr;
  return (
    <div className="x4-ladder rv" role="img" aria-label={"Plan prices: " + names.map((t, k) => t + " " + afInr(p.a[k]) + AF_UNIT[p.u]).join(", ")}>
      {names.map((t, k) => (
        <div key={t} className={"x4-ladder__c" + (k === 1 ? " is-pop" : "")} style={{ "--h": (p.a[k] / p.a[2]).toFixed(3), "--k": k }}>
          <span className="x4-ladder__v" translate="no">
            {afInr(p.a[k])}
          </span>
          <i />
          <b>{t}</b>
        </div>
      ))}
    </div>
  );
}
function X4_Cmp({ g, d, names, on }) {
  const p = d.pr;
  const rows = [[p.u === "return" ? "Price per return" : "Price", ...p.a.map((x) => (p.from ? "From " : "") + afInr(x) + AF_UNIT[p.u])]].concat(p.rows, g.plans.addRows || []);
  const [col, setCol] = ee.useState(1);
  return (
    <div className="x4-cmp rv">
      <div className="x4-cmp__head">
        <h3>Compare every feature</h3>
        <div className="x4-cmp__pick" role="group" aria-label="Highlight a plan">
          {names.map((t, k) => (
            <button key={t} type="button" aria-pressed={col === k} className={col === k ? "is-on" : ""} onClick={() => setCol(k)}>
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="x4-cmp__wrap" tabIndex={0} aria-label={d.n + ": plan comparison (scrolls sideways on small screens)"}>
        <table className={"x4-cmp__t is-col" + col}>
          <caption className="af-sr">{d.n}: plan comparison</caption>
          <thead>
            <tr>
              <th scope="col">Feature</th>
              {names.map((t, k) => (
                <th key={t} scope="col" className={"c" + k}>
                  {t}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, j) => (
              <tr key={r[0]} style={{ "--j": j }}>
                <th scope="row">{r[0]}</th>
                {[1, 2, 3].map((k) => (
                  <td key={k} className={"c" + (k - 1)}>
                    <AG_Cell v={r[k]} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="x4-cmp__f">Plan comparison from our published service packages. Anything not listed is confirmed in your engagement scope.</p>
    </div>
  );
}
function X4_Plans({ g, d, fl }) {
  const P = g.plans;
  const p = d.pr;
  const [vol, setVol] = ee.useState(null);
  const [sit, setSit] = ee.useState(null);
  if (P.mode === "quote" || !p) return <X4_Quote g={g} d={d} />;
  const names = P.names || AF_TIERS;
  const mode = fl.plans;
  const maxInc = Math.max.apply(null, P.inc.map((x) => x.length));
  const sitHit = sit != null ? P.sit.opts[sit] : null;
  let sug = -1;
  if (vol != null && P.vol.opts[vol][1] >= 0) sug = P.vol.opts[vol][1];
  if (sitHit && sitHit[1].length) sug = sitHit[1][0];
  return (
    <X4_Sec id="ag-plans" cls={"x4-plans x4-plans--" + mode} hid="ag-plans-h" dk>
      {(on) => (
        <>
          <div className="x4-plans__fx" aria-hidden="true">
            <i className="x4-plans__floor" />
            <i className="x4-plans__beam x4-plans__beam--1" />
            <i className="x4-plans__beam x4-plans__beam--2" />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
              <b key={k} className="x4-coin" style={{ "--k": k }}>
                ₹
              </b>
            ))}
          </div>
          <div className="container">
            <X4_Head k="Plans & pricing" h={P.h} p={P.p} id="ag-plans-h" c ic="rupee" />
            {P.tips && (
              <p className="x4-plans__tips rv">
                <span>Terms:</span>
                {P.tips.map(([t, x]) => (
                  <AG_Tip key={t} t={t} p={x} />
                ))}
              </p>
            )}
            {(P.vol || P.sit) && (
              <div className="x4-finder rv">
                {P.vol && (
                  <fieldset>
                    <legend>
                      <AF_I n="gauge" s={16} />
                      {P.vol.q}
                    </legend>
                    <div>
                      {P.vol.opts.map(([t], k) => (
                        <button key={t} type="button" className={"x4-chip" + (vol === k ? " is-on" : "")} aria-pressed={vol === k} onClick={() => setVol(k)}>
                          {t}
                        </button>
                      ))}
                    </div>
                    {vol != null && P.vol.opts[vol][1] < 0 && (
                      <p className="x4-finder__msg" role="status">
                        {P.vol.more}{" "}
                        <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Transaction volume: more than 600 per month." })}>
                          Request a tailored quote
                        </a>
                      </p>
                    )}
                    <small>{P.vol.note}</small>
                  </fieldset>
                )}
                {P.sit && (
                  <fieldset>
                    <legend>
                      <AF_I n="compass" s={16} />
                      {P.sit.q}
                    </legend>
                    <div>
                      {P.sit.opts.map(([t], k) => (
                        <button key={t} type="button" className={"x4-chip" + (sit === k ? " is-on" : "")} aria-pressed={sit === k} onClick={() => setSit(k)}>
                          {t}
                        </button>
                      ))}
                    </div>
                    {sitHit && (
                      <p className="x4-finder__msg" role="status">
                        {sitHit[2]}{" "}
                        {!sitHit[1].length && (
                          <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Filing situation: " + sitHit[0] + "." })}>
                            Discuss My Filing Requirements
                          </a>
                        )}
                      </p>
                    )}
                    <small>{P.sit.note}</small>
                  </fieldset>
                )}
              </div>
            )}
            {mode === "podium" && <X4_Ladder d={d} names={names} on={on} />}
            <div className={"x4-tiers x4-tiers--" + mode}>
              {[0, 1, 2].map((k) => (
                <div key={k} className="x4-tiers__slot rv" style={{ "--k": k }}>
                  <X4_Tier g={g} d={d} k={k} names={names} on={on} sug={sug === k} mode={mode} maxInc={maxInc} />
                </div>
              ))}
            </div>
            {P.tailored && (
              <p className="x4-plans__tail rv">
                {P.tailored}{" "}
                <a href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Tailored requirement." })}>
                  Discuss a Tailored Requirement <AF_I n="arrow" s={13} />
                </a>
              </p>
            )}
            {mode !== "podium" && <X4_Ladder d={d} names={names} on={on} />}
            <X4_Cmp g={g} d={d} names={names} on={on} />
            <X4_Note t={P.note || "Prices exclude GST and applicable government or third-party fees. Final scope is confirmed in writing."} c />
          </div>
        </>
      )}
    </X4_Sec>
  );
}
function X4_Quote({ g, d }) {
  const P = g.plans;
  const [flip, setFlip] = ee.useState({});
  return (
    <X4_Sec id="ag-plans" cls="x4-plans x4-plans--quote" hid="ag-plans-h" dk>
      {() => (
        <>
          <div className="x4-plans__fx" aria-hidden="true">
            <i className="x4-plans__floor" />
            <i className="x4-plans__beam x4-plans__beam--1" />
          </div>
          <div className="container">
            <X4_Head k="How pricing works" h={P.h} p={P.p} id="ag-plans-h" c ic="rupee" />
            <span className="x4-quote__tag rv">Custom quote · written before work begins</span>
            <ol className="x4-qf">
              {P.factors.map(([t, p], k) => {
                const f = !!flip[k];
                return (
                  <li key={t} className={"x4-qf__it rv" + (f ? " is-flip" : "")} style={{ "--k": k }}>
                    <div className="x4-qf__in">
                      <div className="x4-qf__f">
                        <span>{x4Pad(k)}</span>
                        <b>{t}</b>
                      </div>
                      <div className="x4-qf__b">
                        <p>{p}</p>
                      </div>
                    </div>
                    <button type="button" aria-pressed={f} onClick={() => setFlip((x) => ({ ...x, [k]: !x[k] }))}>
                      <AF_I n="refresh" s={13} />
                      {f ? "Back" : "Why it matters"}
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="x4-quote">
              <div className="x4-quote__side rv">
                <h3>What happens before you commit?</h3>
                <ul>
                  {P.before.map((t, k) => (
                    <li key={t} style={{ "--j": k }}>
                      <AF_I n="tick" s={15} />
                      {t}
                    </li>
                  ))}
                </ul>
                <a className="x4-btn x4-btn--ac x4-btn--lg" href={"#" + AF_FORM} onClick={agPick({ plan: 0 })}>
                  <span>{P.cta}</span> <AF_I n="arrow" s={16} />
                </a>
              </div>
              <div className="x4-quote__also rv" style={{ "--k": 1 }}>
                {P.also.map(([s, t], k) => {
                  const x = afBy(s);
                  return (
                    <PpL key={s} to={afUrl(s)} className="x4-quote__card" style={{ "--k": k }}>
                      <span>{t}</span>
                      <b>{agPriceTxt(x)}</b>
                      <em>
                        View Plans <AF_I n="arrow" s={13} />
                      </em>
                    </PpL>
                  );
                })}
                <small>{P.alsoNote}</small>
              </div>
            </div>
          </div>
        </>
      )}
    </X4_Sec>
  );
}

/* ================= What you receive ================= */
function X4_Receive({ g }) {
  const R = g.receive;
  return (
    <X4_Sec cls={"x4-rcv x4-rcv--" + R.kind} hid="ag-rcv-h">
      {() => (
        <div className="container x4-rcv__grid">
          <div>
            <X4_Head k={R.k} h={R.h} id="ag-rcv-h" ic="doc" />
            <ul className="x4-rcv__list">
              {R.items.map((t, k) => (
                <li key={t} className="rv" style={{ "--k": k }}>
                  <AF_I n="doc" s={15} />
                  {t}
                </li>
              ))}
            </ul>
            {R.states && (
              <dl className="x4-rcv__states">
                {R.states.map(([t, p], k) => (
                  <div key={t} className="rv" style={{ "--k": k }}>
                    <dt>{t}</dt>
                    <dd>{p}</dd>
                  </div>
                ))}
              </dl>
            )}
            {R.cal && (
              <ol className="x4-rcv__cal" aria-label="Sample reporting calendar">
                {R.cal.map((t, k) => (
                  <li key={t} className="rv" style={{ "--k": k }}>
                    {t}
                  </li>
                ))}
              </ol>
            )}
            <X4_Note t={R.note} />
          </div>
          <div className="x4-rcv__dev rv" style={{ "--k": 2 }}>
            <i className="x4-rcv__sheet" aria-hidden="true" />
            <i className="x4-rcv__sheet x4-rcv__sheet--2" aria-hidden="true" />
            {agRxVis(R)}
          </div>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Value / security / review ================= */
function X4_Value({ g }) {
  const V = g.value;
  const [on, setOn] = ee.useState(0);
  return (
    <X4_Sec cls="x4-val" hid="ag-val-h" alt>
      {(vis) => {
        return (
          <div className="container">
            <X4_Head k={V.k} h={V.h} id="ag-val-h" ic="growth" />
            <X4_Accordion items={V.items} on={on} setOn={setOn} vis={vis} />
            <X4_Note t={V.note} />
          </div>
        );
      }}
    </X4_Sec>
  );
}
function X4_Accordion({ items, on, setOn, vis }) {
  const hold = x4Auto(items.length, vis, 5000, setOn);
  return (
    <ul className="x4-acc rv" {...hold}>
      {items.map(([t, p], k) => (
        <li key={t} className={on === k ? "is-on" : ""} style={{ "--k": k }}>
          <button type="button" aria-expanded={on === k} aria-controls={"x4-acc" + k} onClick={() => setOn(k)}>
            <span className="x4-acc__n">{x4Pad(k)}</span>
            <b>{t}</b>
          </button>
          <div className="x4-acc__p" id={"x4-acc" + k}>
            <p>{p}</p>
          </div>
          <i className="x4-acc__bar" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
function X4_Security({ g }) {
  const S = g.security;
  return (
    <X4_Sec cls="x4-secu" hid="ag-secu-h" dk>
      {() => (
        <div className="container x4-secu__in">
          <div>
            <div className="x4-vault rv" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>
                <AF_I n="lock" s={40} />
              </span>
            </div>
            <X4_Head k="Security, confidentiality & accountability" h={S.h} id="ag-secu-h" ic="lock" />
          </div>
          <div>
            <ul className="x4-secu__list">
              {S.items.map((t, k) => (
                <li key={t} className="rv" style={{ "--k": k }}>
                  <AF_I n="shield" s={17} />
                  {t}
                </li>
              ))}
            </ul>
            <X4_Note t={S.note} />
          </div>
        </div>
      )}
    </X4_Sec>
  );
}
function X4_Review({ g }) {
  const R = g.review;
  return (
    <X4_Sec cls="x4-rev" hid="ag-rev-h" alt>
      {() => (
        <div className="container">
          <X4_Head k={R.k} h={R.h} id="ag-rev-h" ic="lens">
            <span className="agl-tag">{R.label}</span>
          </X4_Head>
          <div className="x4-rev__ws">
            {R.panels.map(([t, s], k) => (
              <div key={t} className="x4-rev__p rv" style={{ "--k": k }}>
                <span className="x4-rev__n">{k + 1}</span>
                <b>{t}</b>
                <span className={"x4-rev__s x4-rev__s--" + k}>{s}</span>
                <i aria-hidden="true" />
                <i aria-hidden="true" />
              </div>
            ))}
          </div>
          <p className="x4-rev__states rv">
            Example states:{" "}
            {R.states.map((s, k) => (
              <span key={s} style={{ "--k": k }}>
                {s}
              </span>
            ))}
          </p>
          <X4_Note t={R.note} />
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Labs, briefs, documents (tools from AccountsFinanceLabs.jsx) ================= */
function X4_Lab({ g, d }) {
  const L = g.lab;
  const C = AGL_LABS[L.type];
  if (!C) return null;
  return (
    <X4_Sec cls={"x4-lab ag-lab--" + L.type} hid="ag-lab-h" alt>
      {() => (
        <>
          <i className="x4-lab__grid" aria-hidden="true" />
          <div className="container">
            <X4_Head k={L.k} h={L.h} p={L.p} id="ag-lab-h" ic="gauge" />
            <div className="x4-lab__tool rv" style={{ "--k": 3 }}>
              <span className="x4-lab__lamp" aria-hidden="true">
                <i />
                <i />
                <i />
                <b>Interactive tool</b>
              </span>
              <C g={g} d={d} />
            </div>
          </div>
        </>
      )}
    </X4_Sec>
  );
}
function X4_Brief({ g }) {
  const B = g.brief;
  return (
    <X4_Sec cls="x4-brief" hid="ag-brief-h">
      {() => (
        <div className="container x4-brief__in">
          <X4_Head k={B.k} h={B.h} p={B.p} id="ag-brief-h" ic="form" />
          <div className="x4-lab__tool rv" style={{ "--k": 2 }}>
            <AGL_Brief g={g} />
          </div>
        </div>
      )}
    </X4_Sec>
  );
}
function X4_Docs({ g }) {
  const D = g.docs;
  return (
    <X4_Sec cls="x4-docs" hid="ag-docs-h" alt>
      {() => (
        <div className="container">
          <X4_Head k={D.k} h={D.h} p={D.p} id="ag-docs-h" ic="doc" />
          <div className="x4-lab__tool rv" style={{ "--k": 2 }}>
            <AGL_Docs g={g} />
          </div>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Industries / audiences ================= */
function X4_Ind({ g, fl }) {
  const I = g.ind;
  const icon = (n, p) => (I.mode === "icons" ? p : agIndIc(n));
  const items = I.items.map(([n, p]) => ({ n, p: I.mode === "icons" ? null : p, ic: icon(n, p) }));
  const hasP = items.some((x) => x.p);
  const mode = I.mode === "explorer" ? "explorer" : hasP ? (fl.ind ? "explorer" : "cards") : fl.ind ? "marquee" : "hex";
  const [on, setOn] = ee.useState(0);
  return (
    <X4_Sec cls={"x4-ind x4-ind--" + mode} hid="ag-ind-h">
      {() => (
        <div className="container">
          <X4_Head k="Who we support" h={I.h} p={I.p} id="ag-ind-h" ic="users" />
          {mode === "explorer" && (
            <div className="x4-indx rv">
              <div className="x4-indx__tabs" role="tablist" aria-label="Who we support">
                {items.map((x, k) => (
                  <button key={x.n} type="button" role="tab" aria-selected={on === k} aria-controls="ag-indp" className={on === k ? "is-on" : ""} onClick={() => setOn(k)}>
                    <AF_I n={x.ic} s={17} />
                    {x.n}
                  </button>
                ))}
              </div>
              <div className="x4-indx__panel" id="ag-indp" role="tabpanel" key={on}>
                <span className="x4-indx__big" aria-hidden="true">
                  <AF_I n={items[on].ic} s={46} />
                  <i />
                  <i />
                </span>
                <h3>{items[on].n}</h3>
                {items[on].p && <p>{items[on].p}</p>}
                <a className="x4-link" href={"#" + AF_FORM} onClick={agPick({ note: "Business type: " + items[on].n + "." })}>
                  Discuss your requirements <AF_I n="arrow" s={14} />
                </a>
              </div>
            </div>
          )}
          {mode === "cards" && (
            <ul className="x4-indc">
              {items.map((x, k) => (
                <li key={x.n} className="rv" style={{ "--k": k }} {...x4Tilt(10)}>
                  <span className="x4-indc__ic" aria-hidden="true">
                    <AF_I n={x.ic} s={22} />
                  </span>
                  <b>{x.n}</b>
                  {x.p && <em>{x.p}</em>}
                </li>
              ))}
            </ul>
          )}
          {mode === "hex" && (
            <ul className="x4-hex">
              {items.map((x, k) => (
                <li key={x.n} className="rv" style={{ "--k": k }}>
                  <span className="x4-hex__ic" aria-hidden="true">
                    <AF_I n={x.ic} s={24} />
                  </span>
                  <b>{x.n}</b>
                </li>
              ))}
            </ul>
          )}
          {mode === "marquee" && (
            <div className="x4-mq rv">
              <ul className="af-sr">
                {items.map((x) => (
                  <li key={x.n}>{x.n}</li>
                ))}
              </ul>
              {[0, 1].map((r) => (
                <div key={r} className={"x4-mq__row x4-mq__row--" + r} aria-hidden="true">
                  <div className="x4-mq__t">
                    {[0, 1].map((rep) =>
                      items
                        .filter((_, k) => k % 2 === r || items.length < 8)
                        .map((x) => (
                          <span key={rep + x.n}>
                            <AF_I n={x.ic} s={18} />
                            {x.n}
                          </span>
                        ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <X4_Note t={I.note} />
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Scope ================= */
function X4_Scope({ g }) {
  const S = g.scope;
  return (
    <X4_Sec cls="x4-scope" hid="ag-scope-h" alt>
      {() => (
        <div className="container">
          <X4_Head k="Scope" h={S.h} id="ag-scope-h" ic="parcel" />
          <div className="x4-scope__grid">
            <div className="x4-scope__in rv">
              <div className="x4-box" aria-hidden="true">
                <i className="x4-box__back" />
                <i className="x4-box__lid x4-box__lid--l" />
                <i className="x4-box__lid x4-box__lid--r" />
                <i className="x4-box__front" />
                <b className="x4-box__item" style={{ "--k": 0 }} />
                <b className="x4-box__item" style={{ "--k": 1 }} />
                <b className="x4-box__item" style={{ "--k": 2 }} />
              </div>
              <h3>
                <AF_I n="tick" s={18} />
                {S.delT || "Key deliverables"}
              </h3>
              <ul>
                {S.del.map((t, k) => (
                  <li key={t} style={{ "--j": k }}>
                    <AF_I n="check" s={16} />
                    {t}
                  </li>
                ))}
              </ul>
              {S.delNote && <p>{S.delNote}</p>}
            </div>
            <div className="x4-scope__out rv" style={{ "--k": 1 }}>
              <h3>
                <AF_I n="cross" s={18} />
                {S.niT || "Not included"}
              </h3>
              <ul>
                {S.ni.map((t, k) => (
                  <li key={t} style={{ "--j": k }}>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              {S.niNote && <p>{S.niNote}</p>}
              {S.links && (
                <p className="x4-scope__links">
                  Related services:{" "}
                  {S.links.map(([s, t], k) => (
                    <React_Frag key={s}>
                      {k > 0 && " · "}
                      <PpL to={afUrl(s)}>{t}</PpL>
                    </React_Frag>
                  ))}
                </p>
              )}
            </div>
          </div>
          {S.boundary && (
            <p className="x4-scope__b rv">
              <AF_I n="scale" s={20} />
              {S.boundary}
            </p>
          )}
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Offers ================= */
function X4_Offers({ g, fl }) {
  const O = g.offers || {};
  const [flip, setFlip] = ee.useState({});
  const mode = fl.off;
  return (
    <X4_Sec cls={"x4-off x4-off--" + mode} hid="ag-off-h">
      {() => (
        <div className="container">
          <X4_Head k="Commercial offers" h={O.h || "Offers"} id="ag-off-h" ic="gift" />
          <ul className="x4-off__list">
            {AF_OFFERS.map(([ic, t, b, c], k) => {
              const f = !!flip[k];
              return (
                <li key={t} className={"x4-cp rv" + (f ? " is-flip" : "")} style={{ "--k": k }}>
                  <div className="x4-cp__in">
                    <div className="x4-cp__f">
                      <span className="x4-cp__ic" aria-hidden="true">
                        <AF_I n={ic} s={22} />
                      </span>
                      <span className="x4-cp__t">{t}</span>
                      <b>{b}</b>
                      <i className="x4-cp__shine" aria-hidden="true" />
                    </div>
                    <div className="x4-cp__b">
                      <span className="x4-cp__t">Eligibility</span>
                      <p>{c}</p>
                    </div>
                  </div>
                  <button type="button" aria-pressed={f} onClick={() => setFlip((x) => ({ ...x, [k]: !x[k] }))}>
                    <AF_I n="refresh" s={13} />
                    {f ? "Show the offer" : "Eligibility"}
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="x4-off__note rv">{AG_OFFER_NOTE}</p>
          {O.annual && <p className="x4-off__note rv">{O.annual}</p>}
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= FAQ ================= */
function X4_Faq({ g, items }) {
  const F = g.faq;
  const [open, setOpen] = ee.useState(() => items.map((_, k) => k === 0));
  const [q, setQ] = ee.useState("");
  const ql = q.trim().toLowerCase();
  const vis = items.map(([a, b]) => !ql || (a + " " + b).toLowerCase().includes(ql));
  const nVis = vis.filter(Boolean).length;
  return (
    <X4_Sec id="af-faq" cls="x4-faq" hid="ag-faq-h" alt>
      {() => (
        <div className="container x4-faq__in">
          <div className="x4-faq__side">
            <X4_Head k="FAQ" h={F.h} id="ag-faq-h" ic="lens" />
            <div className="x4-faq__bub rv" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <p className="x4-faq__count rv">{items.length} answers</p>
            {F.search && (
              <label className="x4-faq__search rv">
                <AF_I n="lens" s={17} />
                <span className="af-sr">Search the questions</span>
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the questions" />
              </label>
            )}
            <div className="x4-faq__all rv">
              <button type="button" onClick={() => setOpen(items.map(() => true))}>
                Expand all
              </button>
              <button type="button" onClick={() => setOpen(items.map(() => false))}>
                Collapse all
              </button>
            </div>
            <div className="x4-faq__ctas rv">
              <a className="x4-btn x4-btn--ac" href={"#" + AF_FORM} onClick={agPick({})}>
                <span>{(F.ctas && F.ctas[0]) || "Ask About Your Requirement"}</span>
              </a>
              <PpL to="/lets-talk" className="x4-btn x4-btn--line">
                <span>{(F.ctas && F.ctas[1]) || "Talk to a Specialist"}</span>
              </PpL>
            </div>
          </div>
          <div>
            {ql && (
              <p className="x4-faq__res" role="status">
                {nVis ? `${nVis} matching ${nVis === 1 ? "question" : "questions"}` : "No matching questions — try another word, or ask us directly."}
              </p>
            )}
            <ul className="x4-faq__list">
              {items.map(([a, b], k) => {
                const o = open[k] || (ql && vis[k]);
                return (
                  <li key={a} className={"rv" + (o ? " is-open" : "") + (vis[k] ? "" : " is-off")} style={{ "--k": k }}>
                    <h3>
                      <button type="button" aria-expanded={!!o} aria-controls={"ag-fa" + k} onClick={() => setOpen((p) => p.map((x, j) => (j === k ? !o : x)))}>
                        <span className="x4-faq__q" aria-hidden="true">
                          Q
                        </span>
                        <span>{a}</span>
                        <i aria-hidden="true" />
                      </button>
                    </h3>
                    <div id={"ag-fa" + k} className="x4-faq__a" hidden={!o}>
                      <p>{b}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Related ================= */
function X4_Rel({ g }) {
  const R = g.rel;
  return (
    <X4_Sec cls="x4-rel" hid="ag-rel-h">
      {() => (
        <div className="container">
          <X4_Head k="Related services" h={R.h} id="ag-rel-h" ic="nodes" />
          <ul className="x4-rel__list">
            {R.items.map(([s, desc], k) => {
              const x = afBy(s);
              if (!x) return null;
              return (
                <li key={s} className="rv" style={{ ...afVars(x), "--k": k }}>
                  <PpL to={afUrl(s)} className="x4-rel__c" {...x4Tilt(10)}>
                    <i className="x4-rel__glow" aria-hidden="true" />
                    <span className="x4-rel__ic" aria-hidden="true">
                      <AF_I n={x.ic} s={24} />
                    </span>
                    <b>{x.n}</b>
                    <span className="x4-rel__d">{desc}</span>
                    <span className="x4-rel__f">
                      <em>{agPriceTxt(x)}</em>
                      <span>
                        Explore <AF_I n="arrow" s={14} />
                      </span>
                    </span>
                  </PpL>
                </li>
              );
            })}
          </ul>
          {R.note && <p className="x4-note x4-note--c">{R.note}</p>}
          <p className="x4-rel__all">
            <PpL to={AF_HUB}>
              See all {AF_SVC.length} Accounts &amp; Finance services <AF_I n="arrow" s={14} />
            </PpL>
          </p>
        </div>
      )}
    </X4_Sec>
  );
}

/* ================= Final conversion ================= */
function X4_Fin({ g, d }) {
  const F = g.fin;
  return (
    <X4_Sec cls="x4-fin" hid="ag-fin-h" dk>
      {() => (
        <>
          <div className="x4-fin__fx" aria-hidden="true">
            <i className="x4-aur x4-aur--1" />
            <i className="x4-aur x4-aur--2" />
            <span className="x4-fin__coin">
              <b>₹</b>
              <b>₹</b>
            </span>
            <i className="x4-fin__ring" />
            <i className="x4-fin__ring x4-fin__ring--2" />
          </div>
          <div className="container x4-fin__in">
            <span className="x4-fin__ic rv" aria-hidden="true">
              <AF_I n={d.ic} s={26} />
            </span>
            <h2 id="ag-fin-h" className="rv" style={{ "--k": 1 }}>
              {F.h}
            </h2>
            <p className="rv" style={{ "--k": 2 }}>
              {F.p}
            </p>
            <div className="x4-fin__ctas rv" style={{ "--k": 3 }}>
              <a className="x4-btn x4-btn--ac x4-btn--lg" href={"#" + AF_FORM} onClick={agPick({})}>
                <span>{F.c1}</span> <AF_I n="arrow" s={17} />
              </a>
              <a className="x4-btn x4-btn--ghost x4-btn--lg" href={/compare|quote/i.test(F.c2) ? "#ag-plans" : "#" + AF_FORM} onClick={/compare/i.test(F.c2) ? agTo("ag-plans") : agPick({ plan: /quote/i.test(F.c2) ? 0 : undefined })}>
                <span>{F.c2}</span>
              </a>
              {F.c3 && (
                <a className="x4-link" href={"#" + AF_FORM} onClick={agPick({ plan: -1, note: "Tailored requirement." })}>
                  {F.c3} <AF_I n="arrow" s={14} />
                </a>
              )}
            </div>
            <ul className="x4-fin__pts">
              {F.pts.map((t, k) => (
                <li key={t} className="rv" style={{ "--k": k + 4 }}>
                  <AF_I n="tick" s={15} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </X4_Sec>
  );
}

/* ================= Page body ================= */
const X4_SECTIONS = { facts: X4_Facts, strip: X4_Strip, prob: X4_Prob, caps: X4_Caps, principles: X4_Principles, ai: X4_Ai, proc: X4_Proc, plans: X4_Plans, receive: X4_Receive, value: X4_Value, ind: X4_Ind, scope: X4_Scope, offers: X4_Offers, security: X4_Security, review: X4_Review, lab: X4_Lab, brief: X4_Brief, docs: X4_Docs, rel: X4_Rel, fin: X4_Fin };
function X4_Body({ g, d, faq }) {
  const live = x4Live();
  const fl = x4Flavour(g.th);
  return (
    <div className={"ag x4 ag--" + g.th + (live ? " is-live" : "")} data-af={d.s} data-x4={[fl.facts, fl.prob, fl.caps, fl.proc, fl.plans, fl.off].join(" ")}>
      {g.order.map((k) => {
        if (k === "hero") return <X4_Hero key={k} g={g} d={d} />;
        if (k === "faq") return <X4_Faq key={k} g={g} items={faq} />;
        if (k === "form") return null;
        const C = X4_SECTIONS[k];
        if (!C || (k !== "offers" && !g[k])) return null;
        return <C key={k} g={g} d={d} fl={fl} />;
      })}
      <AG_Form g={g} d={d} />
    </div>
  );
}

export { X4_Body, X4_Cmp, X4_Faq, X4_Quote, X4_SECTIONS, X4_THEMES, x4CapList, x4Flavour };
