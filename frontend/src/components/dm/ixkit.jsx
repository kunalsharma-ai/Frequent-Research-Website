/*
 * IX kit (build 42) — interactive section system for the rethought IT & Development pages
 * (CRM, ERP, Custom Business Applications, UI/UX Design, API Development & Integration) and the Market Research hub.
 * Every section explains with a visual: graphs, flows, layers, matrices, dashboards, decision trees, timelines.
 * Shapes and states only — no invented numbers, results, clients, partnerships or certifications.
 * Motion: CSS keyframes + IntersectionObserver (ppIn); everything is static under prefers-reduced-motion.
 * Prefix IX_ ; styles in src/styles/it-ix.css (prefix ix-).
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { INDUSTRIES } from '../../app/data/industries.jsx';
import { DK_PARENT_IT, PP_Head, PpI, PpL, dmSchema, ppGo, ppIn, ppIt, ppR } from './shared.jsx';

/* ── Extra icons (24×24 stroke) — falls back to the site icon set (PpI) ─────────────── */
const IX_P = {
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1.2 1.2M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.2-1.2",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  bolt: "M13 3 5 13h6l-1 8 8-10h-6l1-8z",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  chat: "M5 5h14v10H9l-4 4z",
  cal: "M5 6h14v14H5zM5 10h14M9 4v4M15 4v4",
  doc: "M7 3h7l4 4v14H7zM14 3v4h4M10 12h5M10 16h5",
  truck: "M3 7h11v9H3zM14 10h4l3 3v3h-7M7 18.5a1.5 1.5 0 1 0 0-.1M17 18.5a1.5 1.5 0 1 0 0-.1",
  coin: "M12 4a8 8 0 1 0 0 16 8 8 0 1 0 0-16M12 8v8M9.5 10h4a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3h4",
  factory: "M3 20V10l5 3V10l5 3V6h4v14zM3 20h18",
  cart: "M4 5h2l2 10h10l2-7H7M9 19.5a1 1 0 1 0 0-.1M17 19.5a1 1 0 1 0 0-.1",
  cloud: "M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z",
  code: "M9 8l-4 4 4 4M15 8l4 4-4 4M13 6l-2 12",
  key: "M14 10a4 4 0 1 0-1.2 2.8L20 20M17 17l2-2",
  eye: "M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12zM12 9.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 1 0 0-5",
  bell: "M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15zM10 20a2 2 0 0 0 4 0",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  branch: "M6 4v10M6 14a3 3 0 1 0 0 .1M18 8a3 3 0 1 0 0-.1M18 8c0 5-6 4-12 6",
  gauge: "M4 16a8 8 0 1 1 16 0M12 16l4-5M8 20h8",
  layout: "M4 4h16v16H4zM4 9h16M10 9v11",
  pen: "M4 20l1-5L15 5l4 4L9 19zM13 7l4 4",
  palette: "M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-1.2-1-1.4-1-2.4 0-.8.7-1.5 1.6-1.5H17a4 4 0 0 0 4-4c0-4.7-4-8.5-9-8.5zM7.5 11.5h.1M10 7.5h.1M15 7.5h.1",
  access: "M12 4.5a1.5 1.5 0 1 0 0 .1M5 8l7 2 7-2M12 10v5l-3 5M12 15l3 5",
  mic: "M12 3a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM6 11a6 6 0 0 0 12 0M12 17v4",
  inbox: "M4 13l3-8h10l3 8v6H4zM4 13h5l1 2h4l1-2h5",
  star: "M12 3l2.7 5.6 6.1.8-4.4 4.3 1 6.1L12 17l-5.4 2.8 1-6.1L3.2 9.4l6.1-.8z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  home: "M4 11l8-7 8 7v9h-5v-6H9v6H4z",
  leaf: "M5 19C5 10 11 5 20 4c0 9-5 15-14 15zM5 19l8-8",
  car: "M5 16l1.5-5h11L19 16M4 16h16v3H4zM7.5 19v1M16.5 19v1M8 13.5h.1M16 13.5h.1",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 21V5M8 7h7",
  film: "M4 5h16v14H4zM8 5v14M16 5v14M4 9h4M4 15h4M16 9h4M16 15h4",
  shirt: "M8 4l4 2 4-2 4 3-2 3-2-1v11H8V9l-2 1-2-3z",
  signal: "M5 19v-3M9 19v-6M13 19V9M17 19V5",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  landmark: "M3 9l9-5 9 5zM5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18",
  pill: "M10.5 4.5a4.2 4.2 0 0 1 6 6l-6 6a4.2 4.2 0 0 1-6-6zM7.5 7.5l6 6",
  cross: "M9 4h6v5h5v6h-5v5H9v-5H4V9h5z",
  wheat: "M12 21V9M12 9c-3 0-4-2-4-5 3 0 4 2 4 5zM12 9c3 0 4-2 4-5-3 0-4 2-4 5zM12 14c-3 0-4-2-4-5 3 0 4 2 4 5zM12 14c3 0 4-2 4-5-3 0-4 2-4 5z",
  zapflow: "M4 12h4l2-5 4 10 2-5h4",
  api: "M7 8l-4 4 4 4M17 8l4 4-4 4M10 17l4-10",
  webhook: "M9 15a4 4 0 1 1 3-6.5M12 8.5l3 5.5M15 14a4 4 0 1 1-1 4H8M8 18a1 1 0 1 0 0-.1",
  layers3: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17.5l9 5 9-5",
  queue: "M4 6h12M4 12h16M4 18h9",
  play: "M8 5v14l11-7z",
  replay: "M4 12a8 8 0 1 0 2.3-5.6M4 4v5h5",
  cursor: "M5 3l14 7-6 2-2 6z",
  hand: "M8 11V5.5a1.5 1.5 0 0 1 3 0V10M11 10V4.5a1.5 1.5 0 0 1 3 0V10M14 10V6a1.5 1.5 0 0 1 3 0v7c0 4-3 7-6.5 7S5 17 4 14l-1.5-3.5a1.5 1.5 0 0 1 2.6-1.4L8 13",
  type: "M5 6V4h14v2M12 4v16M9 20h6",
  contrast: "M12 3a9 9 0 1 0 0 18 9 9 0 1 0 0-18M12 3v18",
  focus: "M4 8V4h4M16 4h4v4M20 16v4h-4M8 20H4v-4M9 12h6",
  ruler: "M4 16 16 4l4 4L8 20zM8 12l2 2M11 9l2 2M14 6l2 2",
  wand: "M5 19 15 9M14 4v3M19 9h-3M17.5 5.5l-2 2M11 5l.5 1.5M19 13l-1.5-.5",
  search2: "M11 4a7 7 0 1 0 0 14 7 7 0 1 0 0-14M20 20l-4-4",
};
function IX_I({ n, s = 18 }) {
  const d = IX_P[n];
  if (!d) return <PpI n={n} s={s} />;
  return (
    <svg className="ix-ico" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

/* auto-advance helper: cycles 0..n-1 every ms while visible and not paused (static under reduced motion) */
function ixCycle(n, v, ms, paused) {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || paused || ppR() || n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(t);
  }, [v, paused, n, ms]);
  return [i, setI];
}

/* section shell: tone light | off | dark | ink ; heading via PP_Head */
function IX_Sec({ id, tone = "light", cls = "", k, t, s, center, children, wide, lv }) {
  const [ref, v] = ppIn(0.12);
  const dark = tone === "dark" || tone === "ink";
  return (
    <section ref={ref} className={"ix-sec ix-sec--" + tone + " " + cls + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className={"container" + (wide ? " ix-wide" : "")}>
        {t && <PP_Head k={k} id={id} t={t} s={s} light={dark} center={center} lv={lv} />}
        {typeof children === "function" ? children(v) : children}
      </div>
    </section>
  );
}

/* ── HERO ───────────────────────────────────────────────────────────────────────────── */
function IX_Hero({ id, crumb, parent = DK_PARENT_IT, kicker, h1, lead, cta, cta2, cta3, points, children, cls = "" }) {
  const go = (x) => (x && x[1] ? ppGo(x[1]) : undefined);
  return (
    <section className={"ix-hero " + cls} aria-labelledby={id}>
      <div className="ix-hero__bg" aria-hidden="true">
        <i className="ix-hero__grid" />
        <i className="ix-hero__glow" />
        <i className="ix-hero__glow ix-hero__glow--2" />
      </div>
      <div className="container ix-hero__in">
        <div className="ix-hero__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <PpL to={parent[1]}>{parent[0]}</PpL>
            </span>
            <span>
              <span aria-current="page">{crumb}</span>
            </span>
          </nav>
          <span className="pp-kick">{kicker}</span>
          <HeroH1 id={id}>{h1}</HeroH1>
          <p className="ix-hero__lead">{lead}</p>
          <div className="pp-ctas">
            <a href={"#" + cta[1]} onClick={go(cta)} className="btn btn--lg pp-btn">
              {cta[0]} <span aria-hidden="true">→</span>
            </a>
            {cta2 && (
              <a href={"#" + cta2[1]} onClick={go(cta2)} className="btn btn--lg sm-btn-outline">
                {cta2[0]}
              </a>
            )}
          </div>
          {cta3 && (
            <a className="ix-hero__text" href={"#" + cta3[1]} onClick={go(cta3)}>
              {cta3[0]} <span aria-hidden="true">→</span>
            </a>
          )}
          {points && (
            <ul className="ix-hero__pts">
              {points.map((p, k) => (
                <li key={p} style={{ "--k": k }}>
                  <IX_I n="check" s={14} />
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="ix-hero__vis">{children}</div>
      </div>
    </section>
  );
}

/* ── GRAPH — living relationship map: centre + orbit nodes, cross-links, travelling data, journey card ─ */
function IX_Graph({ center, centerIcon = "target", nodes, links = [], journey, title, label, api }) {
  const [ref, v] = ppIn(0.05);
  const [hov, setHov] = ee.useState(-1);
  const [j] = ixCycle(journey ? journey.length : 0, v, 1700, hov >= 0);
  const n = nodes.length;
  const pos = nodes.map((_, k) => {
    const a = (-90 + (k * 360) / n) * (Math.PI / 180);
    return [50 + 39 * Math.cos(a), 50 + 37 * Math.sin(a)];
  });
  const lit = new Set();
  const litLinks = new Set();
  if (hov >= 0) {
    lit.add(hov);
    links.forEach(([a, b], i) => {
      if (a === hov || b === hov) {
        lit.add(a);
        lit.add(b);
        litLinks.add(i);
      }
    });
  } else if (journey && v) {
    (journey[j][1] || []).forEach((x) => lit.add(x));
  }
  const cur = journey ? journey[j] : null;
  return (
    <figure ref={ref} className={"ix-graph" + (v ? " is-in" : "") + (hov >= 0 ? " is-hov" : "")} aria-label={label || title}>
      <div className="ix-graph__stage">
        <svg className="ix-graph__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
          {pos.map(([x, y], k) => (
            <line key={"c" + k} x1="50" y1="50" x2={x} y2={y} className={"ix-graph__spoke" + (lit.has(k) ? " is-lit" : "")} vectorEffect="non-scaling-stroke" />
          ))}
          {links.map(([a, b], i) => (
            <line key={"l" + i} x1={pos[a][0]} y1={pos[a][1]} x2={pos[b][0]} y2={pos[b][1]} className={"ix-graph__link" + (litLinks.has(i) ? " is-lit" : "")} vectorEffect="non-scaling-stroke" />
          ))}
        </svg>
        {pos.map(([x, y], k) => (
          <i key={"d" + k} className="ix-graph__dot" aria-hidden="true" style={{ "--x1": "50%", "--y1": "50%", "--x2": x + "%", "--y2": y + "%", "--d": (k * 0.37) % 3 + "s" }} />
        ))}
        <div className="ix-graph__core" aria-hidden="true">
          <span className="ix-graph__pulse" />
          <IX_I n={centerIcon} s={22} />
          <b>{center}</b>
        </div>
        {nodes.map(([t, ic, tip], k) => (
          <button
            key={t}
            type="button"
            className={"ix-graph__node" + (lit.has(k) ? " is-lit" : "")}
            style={{ left: pos[k][0] + "%", top: pos[k][1] + "%", "--k": k }}
            onMouseEnter={() => setHov(k)}
            onMouseLeave={() => setHov(-1)}
            onFocus={() => setHov(k)}
            onBlur={() => setHov(-1)}
            aria-label={t + (tip ? ": " + tip : "")}
          >
            <span className="ix-graph__ic">
              <IX_I n={ic} s={16} />
            </span>
            <span className="ix-graph__t">{t}</span>
            {tip && api && <span className="ix-graph__tip">{tip}</span>}
          </button>
        ))}
      </div>
      {journey && (
        <figcaption className="ix-graph__card">
          <small>{title}</small>
          <ol className="ix-graph__journey">
            {journey.map(([t], k) => (
              <li key={t + k} className={k === j && hov < 0 ? "is-on" : k < j && hov < 0 ? "is-done" : ""}>
                {t}
              </li>
            ))}
          </ol>
          <span className="pp-sr" aria-live="polite">
            {cur && hov < 0 ? cur[0] : ""}
          </span>
        </figcaption>
      )}
    </figure>
  );
}

/* ── FRAGMENT — disconnected tools become one connected flow ───────────────────────── */
const IX_SCATTER = [
  [14, 20],
  [44, 12],
  [78, 22],
  [86, 58],
  [62, 84],
  [26, 80],
  [8, 52],
  [50, 46],
  [34, 50],
];
function IX_Fragment({ tools, issues, hub = "Connected flow", labels = ["Disconnected", "Connected"], caption }) {
  const [ref, v] = ppIn(0.25);
  const [user, setUser] = ee.useState(false);
  const [on, setOn] = ixCycle(2, v, 4200, user);
  const n = tools.length;
  const ring = tools.map((_, k) => {
    const a = (-90 + (k * 360) / n) * (Math.PI / 180);
    return [50 + 38 * Math.cos(a), 50 + 36 * Math.sin(a)];
  });
  const P = on ? ring : IX_SCATTER;
  const pick = (x) => {
    setUser(true);
    setOn(x);
  };
  return (
    <div ref={ref} className={"ix-frag" + (on ? " is-on" : "") + (v ? " is-in" : "")}>
      <div className="ix-frag__toggle" role="group" aria-label="Show the business">
        {labels.map((l, k) => (
          <button key={l} type="button" aria-pressed={on === k} className={on === k ? "is-on" : ""} onClick={() => pick(k)}>
            {l}
          </button>
        ))}
      </div>
      <div className="ix-frag__stage" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="ix-frag__svg">
          <g className="ix-frag__broken">
            {tools.slice(0, -1).map((_, k) => (
              <line key={k} x1={IX_SCATTER[k][0]} y1={IX_SCATTER[k][1]} x2={IX_SCATTER[k + 1][0]} y2={IX_SCATTER[k + 1][1]} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
          <g className="ix-frag__joined">
            {ring.map(([x, y], k) => (
              <line key={k} x1="50" y1="50" x2={x} y2={y} vectorEffect="non-scaling-stroke" />
            ))}
          </g>
        </svg>
        {tools.slice(0, -1).map((_, k) => (
          <b key={"x" + k} className="ix-frag__x" style={{ left: (IX_SCATTER[k][0] + IX_SCATTER[k + 1][0]) / 2 + "%", top: (IX_SCATTER[k][1] + IX_SCATTER[k + 1][1]) / 2 + "%" }}>
            ×
          </b>
        ))}
        <div className="ix-frag__hub">
          <IX_I n="layers3" s={20} />
          <span>{hub}</span>
        </div>
        {tools.map(([t, ic], k) => (
          <span key={t} className="ix-frag__tool" style={{ left: P[k][0] + "%", top: P[k][1] + "%", "--k": k }}>
            <IX_I n={ic} s={15} />
            {t}
          </span>
        ))}
        {ring.map(([x, y], k) => (
          <i key={"p" + k} className="ix-frag__dot" style={{ "--x1": x + "%", "--y1": y + "%", "--x2": "50%", "--y2": "50%", "--d": k * 0.31 + "s" }} />
        ))}
      </div>
      <ul className="ix-frag__issues">
        {issues.map(([t, ic, fixed], k) => (
          <li key={t} style={{ "--k": k }}>
            <span className="ix-frag__ic">
              <IX_I n={on ? "check" : ic} s={15} />
            </span>
            <b>{on && fixed ? fixed : t}</b>
          </li>
        ))}
      </ul>
      {caption && <p className="ix-frag__cap">{caption}</p>}
      <p className="pp-sr">{(on ? labels[1] : labels[0]) + ": " + tools.map((x) => x[0]).join(", ")}</p>
    </div>
  );
}

/* ── TWO FLOWS — traditional vs intelligent workflow, steps revealed in sequence ──────── */
function IX_Flows({ cols }) {
  const [ref, v] = ppIn(0.3);
  const [run, setRun] = ee.useState(0);
  return (
    <div ref={ref} className={"ix-flows" + (v ? " is-in" : "")} key={run}>
      {cols.map((c, ci) => (
        <div key={c.t} className={"ix-flows__col ix-flows__col--" + (c.tone || (ci ? "smart" : "old"))}>
          <div className="ix-flows__head">
            <IX_I n={c.icon || (ci ? "spark" : "clipboard")} s={18} />
            <b>{c.t}</b>
            {c.s && <small>{c.s}</small>}
          </div>
          <ol>
            {c.steps.map((s, k) => {
              const [t, tag] = Array.isArray(s) ? s : [s];
              return (
                <li key={t} style={{ "--k": k + ci * 0.5 }}>
                  <i aria-hidden="true" />
                  <span>{t}</span>
                  {tag && <em>{tag}</em>}
                </li>
              );
            })}
          </ol>
          {c.foot && <p className="ix-flows__foot">{c.foot}</p>}
        </div>
      ))}
      <button type="button" className="ix-replay" onClick={() => setRun((x) => x + 1)}>
        <IX_I n="replay" s={14} /> Replay
      </button>
    </div>
  );
}

/* ── MATRIX — capability ecosystem: category tabs → problem → value, capability chips with benefits ─ */
function IX_Matrix({ id, cats }) {
  const [c, setC] = ee.useState(0);
  const [it, setIt] = ee.useState(-1);
  const cat = cats[c];
  const hint = it >= 0 ? cat.items[it] : null;
  return (
    <div className="ix-mx">
      <div className="ix-mx__tabs" role="tablist" aria-label="Capability areas">
        {cats.map((x, k) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            id={id + "-t" + k}
            aria-selected={c === k}
            aria-controls={id + "-p"}
            tabIndex={c === k ? 0 : -1}
            className={c === k ? "is-on" : ""}
            onClick={() => {
              setC(k);
              setIt(-1);
            }}
            onKeyDown={(e) => {
              const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
              if (!d) return;
              e.preventDefault();
              const n = (k + d + cats.length) % cats.length;
              setC(n);
              setIt(-1);
              const el = document.getElementById(id + "-t" + n);
              if (el) el.focus();
            }}
          >
            <IX_I n={x.icon} s={17} />
            <span>{x.t}</span>
          </button>
        ))}
      </div>
      <div className="ix-mx__panel" role="tabpanel" id={id + "-p"} aria-labelledby={id + "-t" + c} key={c}>
        <div className="ix-mx__flow">
          <div>
            <small>The problem</small>
            <p>{cat.problem}</p>
          </div>
          <span className="ix-mx__arrow" aria-hidden="true">
            →
          </span>
          <div>
            <small>What changes</small>
            <p>{cat.value}</p>
          </div>
        </div>
        <ul className="ix-mx__items">
          {cat.items.map((x, k) => {
            const [t, b] = Array.isArray(x) ? x : [x];
            return (
              <li key={t} style={{ "--k": k }}>
                <button type="button" className={it === k ? "is-on" : ""} onMouseEnter={() => b && setIt(k)} onFocus={() => b && setIt(k)} onClick={() => b && setIt(it === k ? -1 : k)} aria-describedby={b ? id + "-b" : undefined}>
                  <i aria-hidden="true" />
                  {t}
                  {b && <span aria-hidden="true">+</span>}
                </button>
              </li>
            );
          })}
        </ul>
        <p className="ix-mx__benefit" id={id + "-b"} aria-live="polite">
          {hint && Array.isArray(hint) ? (
            <>
              <b>{hint[0]}</b> — {hint[1]}
            </>
          ) : (
            <span className="ix-mx__muted">Hover or tap a capability marked + to see what it changes for the business.</span>
          )}
        </p>
      </div>
    </div>
  );
}

/* ── LAYERS — architecture stack revealed layer by layer; select a layer for its role ───── */
function IX_Layers({ layers, up = "Information flows up", down = "Actions flow down" }) {
  const [ref, v] = ppIn(0.2);
  const [a, setA] = ee.useState(-1);
  const [auto] = ixCycle(layers.length, v, 2400, a >= 0);
  const cur = a >= 0 ? a : auto;
  return (
    <div ref={ref} className={"ix-ly" + (v ? " is-in" : "")}>
      <div className="ix-ly__stack">
        <span className="ix-ly__spine ix-ly__spine--up" aria-hidden="true">
          <i />
          <i />
          <em>{up}</em>
        </span>
        <span className="ix-ly__spine ix-ly__spine--down" aria-hidden="true">
          <i />
          <i />
          <em>{down}</em>
        </span>
        {layers.map((l, k) => (
          <button key={l.t} type="button" className={"ix-ly__l" + (cur === k ? " is-on" : "")} style={{ "--k": k }} onMouseEnter={() => setA(k)} onFocus={() => setA(k)} onClick={() => setA(k)} aria-pressed={cur === k}>
            <span className="ix-ly__name">
              <IX_I n={l.icon} s={17} />
              {l.t}
            </span>
            <span className="ix-ly__items">
              {l.items.map((x) => (
                <em key={x}>{x}</em>
              ))}
            </span>
          </button>
        ))}
      </div>
      <div className="ix-ly__note" aria-live="polite">
        <small>{String(cur + 1).padStart(2, "0") + " / " + String(layers.length).padStart(2, "0")}</small>
        <b>{layers[cur].t}</b>
        <p>{layers[cur].note}</p>
      </div>
    </div>
  );
}

/* ── ASK — AI capability cards + natural-language query console (typed, with result rows) ─ */
function IX_Ask({ cards, queries, note, console: cLabel = "Ask the system" }) {
  const [ref, v] = ppIn(0.25);
  const [sel, setSel] = ee.useState(0);
  const [q, setQ] = ixCycle(queries.length, v, 5200, false);
  const [typed, setTyped] = ee.useState("");
  ee.useEffect(() => {
    const full = queries[q][0];
    if (!v || ppR()) {
      setTyped(full);
      return;
    }
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      i++;
      setTyped(full.slice(0, i));
      if (i >= full.length) clearInterval(t);
    }, 32);
    return () => clearInterval(t);
  }, [q, v]);
  const done = typed.length >= queries[q][0].length;
  return (
    <div ref={ref} className={"ix-ask" + (v ? " is-in" : "")}>
      <ul className="ix-ask__cards">
        {cards.map(([t, ic, d], k) => (
          <li key={t}>
            <button type="button" className={sel === k ? "is-on" : ""} aria-expanded={sel === k} onClick={() => setSel(k)} onMouseEnter={() => setSel(k)}>
              <span className="ix-ask__ic">
                <IX_I n={ic} s={18} />
              </span>
              <b>{t}</b>
              <p>{d}</p>
            </button>
          </li>
        ))}
      </ul>
      <div className="ix-ask__console" aria-label={cLabel}>
        <div className="ix-ask__bar">
          <IX_I n="search2" s={16} />
          <span className="ix-ask__q">
            {typed}
            <i className="ix-ask__caret" aria-hidden="true" />
          </span>
        </div>
        <ul className={"ix-ask__res" + (done ? " is-done" : "")} aria-live="polite">
          {done &&
            queries[q][1].map((r, k) => (
              <li key={r} style={{ "--k": k }}>
                <i aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
        </ul>
        <div className="ix-ask__foot">
          <span>
            <IX_I n="spark" s={13} /> AI-assisted
          </span>
          <span>
            <IX_I n="user" s={13} /> Reviewed by people
          </span>
          <span>
            <IX_I n="lock" s={13} /> Permission-aware
          </span>
        </div>
        <div className="ix-ask__dots" role="group" aria-label="Choose a question">
          {queries.map((x, k) => (
            <button key={k} type="button" className={k === q ? "is-on" : ""} aria-label={x[0]} aria-pressed={k === q} onClick={() => setQ(k)} />
          ))}
        </div>
      </div>
      {note && <p className="ix-note ix-ask__note">{note}</p>}
    </div>
  );
}

/* ── VS — side-by-side comparison with a highlight switch ─────────────────────────────── */
function IX_VS({ left, right, rows, quote }) {
  const [ref, v] = ppIn(0.25);
  const [side, setSide] = ee.useState(1);
  return (
    <div ref={ref} className={"ix-vs ix-vs--" + side + (v ? " is-in" : "")}>
      <div className="ix-vs__switch" role="group" aria-label="Highlight a column">
        <button type="button" aria-pressed={side === 0} onClick={() => setSide(0)}>
          {left}
        </button>
        <button type="button" aria-pressed={side === 1} onClick={() => setSide(1)}>
          {right}
        </button>
        <i aria-hidden="true" />
      </div>
      <table className="ix-vs__t">
        <thead>
          <tr>
            <th scope="col">{left}</th>
            <th scope="col" aria-hidden="true" />
            <th scope="col">{right}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([a, b], k) => (
            <tr key={a} style={{ "--k": k }}>
              <td>{a}</td>
              <td aria-hidden="true" className="ix-vs__arr">
                →
              </td>
              <td>{b}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {quote && <p className="ix-vs__quote">{quote}</p>}
    </div>
  );
}

/* ── TREE — consultative yes/no decision path ─────────────────────────────────────────── */
function IX_Tree({ id, nodes, final, formId, cta = "Talk it through" }) {
  const [path, setPath] = ee.useState([]);
  const [res, setRes] = ee.useState(null);
  const cur = path.length;
  const answer = (yes) => {
    const n = nodes[cur];
    const p = [...path, yes];
    setPath(p);
    if (!yes) setRes(n.no);
    else if (cur + 1 >= nodes.length) setRes(final);
  };
  const reset = () => {
    setPath([]);
    setRes(null);
  };
  return (
    <div className="ix-tree">
      <ol className="ix-tree__path" aria-label="Your answers">
        {nodes.map((n, k) => (
          <li key={k} className={k < cur ? (path[k] ? "is-yes" : "is-no") : k === cur && !res ? "is-cur" : ""}>
            <span>{k + 1}</span>
            <em>{n.s || n.q}</em>
          </li>
        ))}
      </ol>
      <div className="ix-tree__box" aria-live="polite">
        {!res ? (
          <div className="ix-tree__q" key={cur}>
            <small>
              Question {cur + 1} of {nodes.length}
            </small>
            <h3 id={id + "-q"}>{nodes[cur].q}</h3>
            <div className="ix-tree__btns" role="group" aria-labelledby={id + "-q"}>
              <button type="button" className="btn pp-btn" onClick={() => answer(true)}>
                Yes
              </button>
              <button type="button" className="btn sm-btn-outline" onClick={() => answer(false)}>
                No
              </button>
            </div>
          </div>
        ) : (
          <div className={"ix-tree__res" + (res === final ? " is-final" : "")} key="r">
            <span className="ix-tree__ic">
              <IX_I n={res === final ? "spark" : "compass"} s={22} />
            </span>
            <small>Our view</small>
            <h3>{res[0]}</h3>
            <p>{res[1]}</p>
            <div className="ix-tree__btns">
              {formId && (
                <a href={"#" + formId} onClick={ppGo(formId)} className="btn pp-btn">
                  {cta} <span aria-hidden="true">→</span>
                </a>
              )}
              <button type="button" className="btn sm-btn-outline" onClick={reset}>
                <IX_I n="replay" s={14} /> Start again
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ROLES — role tabs change a dashboard mock-up (states and shapes, no figures) ─────── */
function IX_Widget({ w, k }) {
  const kind = w.kind || "list";
  return (
    <div className={"ix-w ix-w--" + kind} style={{ "--k": k }}>
      <div className="ix-w__h">
        <IX_I n={w.icon || "grid"} s={14} />
        <b>{w.t}</b>
      </div>
      {kind === "bars" && (
        <div className="ix-w__bars" aria-hidden="true">
          {[62, 80, 48, 90, 70, 56, 84].map((h, i) => (
            <i key={i} style={{ "--h": h + "%", "--i": i }} />
          ))}
        </div>
      )}
      {kind === "spark" && (
        <svg className="ix-w__spark" viewBox="0 0 120 40" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30 C15 26 22 32 36 22 S60 12 74 18 98 8 120 6" />
          <path className="ix-w__area" d="M0 30 C15 26 22 32 36 22 S60 12 74 18 98 8 120 6 V40 H0z" />
        </svg>
      )}
      {kind === "ring" && (
        <div className="ix-w__ring" aria-hidden="true">
          <svg viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15.9" />
            <circle cx="21" cy="21" r="15.9" className="a" />
            <circle cx="21" cy="21" r="15.9" className="b" />
          </svg>
        </div>
      )}
      {w.items && (
        <ul className="ix-w__list">
          {w.items.map((x, i) => {
            const [t, lv] = Array.isArray(x) ? x : [x];
            return (
              <li key={t} style={{ "--i": i }}>
                <i className={"ix-dot ix-dot--" + (lv || "ok")} aria-hidden="true" />
                <span>{t}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
function IX_Roles({ id, roles, app = "Workspace" }) {
  const [r, setR] = ee.useState(0);
  const role = roles[r];
  return (
    <div className="ix-roles">
      <div className="ix-roles__tabs" role="tablist" aria-label="Choose a role">
        {roles.map((x, k) => (
          <button
            key={x.t}
            type="button"
            role="tab"
            id={id + "-r" + k}
            aria-selected={r === k}
            aria-controls={id + "-rp"}
            tabIndex={r === k ? 0 : -1}
            className={r === k ? "is-on" : ""}
            onClick={() => setR(k)}
            onKeyDown={(e) => {
              const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
              if (!d) return;
              e.preventDefault();
              const n = (k + d + roles.length) % roles.length;
              setR(n);
              const el = document.getElementById(id + "-r" + n);
              if (el) el.focus();
            }}
          >
            <IX_I n={x.icon} s={16} />
            {x.t}
          </button>
        ))}
      </div>
      <div className="ix-roles__app" role="tabpanel" id={id + "-rp"} aria-labelledby={id + "-r" + r}>
        <div className="ix-roles__top" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>
            {app} · {role.t}
          </span>
        </div>
        <p className="ix-roles__focus">
          <IX_I n="target" s={14} /> {role.focus}
        </p>
        <div className="ix-roles__grid" key={r}>
          {role.widgets.map((w, k) => (
            <IX_Widget key={w.t} w={w} k={k} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── ECOSYSTEM — a core with connected clusters and travelling data packets ───────────── */
function IX_Eco({ center, centerIcon = "layers3", groups }) {
  const [ref, v] = ppIn(0.2);
  const [h, setH] = ee.useState(-1);
  const n = groups.length;
  const pos = groups.map((_, k) => {
    const a = (-90 + (k * 360) / n) * (Math.PI / 180);
    return [50 + 36 * Math.cos(a), 50 + 34 * Math.sin(a)];
  });
  return (
    <div ref={ref} className={"ix-eco" + (v ? " is-in" : "") + (h >= 0 ? " is-hov" : "")}>
      <svg className="ix-eco__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {pos.map(([x, y], k) => (
          <line key={k} x1="50" y1="50" x2={x} y2={y} className={h === k ? "is-lit" : ""} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {pos.map(([x, y], k) => (
        <React_Frag key={"pk" + k}>
          <i className="ix-eco__pk" aria-hidden="true" style={{ "--x1": "50%", "--y1": "50%", "--x2": x + "%", "--y2": y + "%", "--d": k * 0.45 + "s" }} />
          <i className="ix-eco__pk ix-eco__pk--in" aria-hidden="true" style={{ "--x1": x + "%", "--y1": y + "%", "--x2": "50%", "--y2": "50%", "--d": k * 0.45 + 1.4 + "s" }} />
        </React_Frag>
      ))}
      <div className="ix-eco__core">
        <span className="ix-graph__pulse" aria-hidden="true" />
        <IX_I n={centerIcon} s={22} />
        <b>{center}</b>
      </div>
      <ul className="ix-eco__groups">
        {groups.map((g, k) => (
          <li key={g.t} className={"ix-eco__g" + (h === k ? " is-on" : "")} style={{ "--x": pos[k][0] + "%", "--y": pos[k][1] + "%", "--k": k }} onMouseEnter={() => setH(k)} onMouseLeave={() => setH(-1)}>
            <b>
              <IX_I n={g.icon} s={15} />
              {g.t}
            </b>
            <span>{g.items.join(" · ")}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
const React_Frag = ({ children }) => <>{children}</>;

/* ── STACK — technology grouped by purpose ───────────────────────────────────────────── */
function IX_Stack({ groups, note }) {
  return (
    <div className="ix-stack">
      {groups.map(([t, ic, items, why], k) => (
        <div key={t} className="ix-stack__row" style={{ "--k": k }}>
          <div className="ix-stack__h">
            <span className="ix-stack__ic">
              <IX_I n={ic} s={18} />
            </span>
            <b>{t}</b>
            {why && <p>{why}</p>}
          </div>
          <ul>
            {items.map((x, i) => (
              <li key={x} style={{ "--i": i }}>
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
      {note && <p className="ix-note">{note}</p>}
    </div>
  );
}

/* ── TRUST — shield emblem with control items ───────────────────────────────────────── */
function IX_Trust({ items, center = "Security & control", note }) {
  const half = Math.ceil(items.length / 2);
  const col = (arr, off) => (
    <ul className="ix-trust__col">
      {arr.map(([t, ic, d], k) => (
        <li key={t} style={{ "--k": k + off }}>
          <span className="ix-trust__ic">
            <IX_I n={ic} s={17} />
          </span>
          <div>
            <b>{t}</b>
            {d && <p>{d}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="ix-trust">
      {col(items.slice(0, half), 0)}
      <div className="ix-trust__seal" aria-hidden="true">
        <i className="ix-trust__ring" />
        <i className="ix-trust__ring ix-trust__ring--2" />
        <span>
          <IX_I n="shield" s={34} />
          <b>{center}</b>
        </span>
      </div>
      {col(items.slice(half), half)}
      {note && <p className="ix-note ix-trust__note">{note}</p>}
    </div>
  );
}

/* ── WHY — distinctive pillars in a bento layout ─────────────────────────────────────── */
function IX_Why({ items }) {
  return (
    <ul className="ix-why">
      {items.map(([t, ic, d], k) => (
        <li key={t} className={"ix-why__c" + (k === 0 ? " ix-why__c--lead" : "")} style={{ "--k": k }}>
          <span className="ix-why__n">{String(k + 1).padStart(2, "0")}</span>
          <span className="ix-why__ic">
            <IX_I n={ic} s={20} />
          </span>
          <b>{t}</b>
          <p>{d}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── MOTTO — large typographic moment, lines lit in sequence ──────────────────────────── */
function IX_Motto({ id, kicker = "Our philosophy", quote, lines, sub }) {
  const [ref, v] = ppIn(0.3);
  const [i] = ixCycle(lines.length, v, 1800, false);
  return (
    <section ref={ref} className={"ix-motto" + (v ? " is-in" : "")} aria-labelledby={id}>
      <div className="ix-motto__bg" aria-hidden="true">
        {Array.from({ length: 14 }, (_, k) => (
          <i key={k} style={{ "--k": k }} />
        ))}
      </div>
      <div className="container ix-motto__in">
        <span className="pp-kick pp-kick--light">{kicker}</span>
        <h2 id={id}>{quote}</h2>
        {sub && <p className="ix-motto__sub">{sub}</p>}
        <ul className="ix-motto__lines">
          {lines.map((l, k) => (
            <li key={l} className={k === i ? "is-on" : ""} style={{ "--k": k }}>
              {l}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── OUTCOMES — large outcome cards, each with its own small animation ────────────────── */
function IX_Anim({ kind }) {
  if (kind === "less")
    return (
      <span className="ix-an ix-an--less" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <i key={i} style={{ "--i": i }} />
        ))}
      </span>
    );
  if (kind === "see")
    return (
      <span className="ix-an ix-an--see" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    );
  if (kind === "fast")
    return (
      <span className="ix-an ix-an--fast" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
    );
  if (kind === "link")
    return (
      <span className="ix-an ix-an--link" aria-hidden="true">
        <i />
        <i />
        <i />
        <b />
      </span>
    );
  if (kind === "decide")
    return (
      <span className="ix-an ix-an--decide" aria-hidden="true">
        <i />
        <i />
        <i />
        <em />
      </span>
    );
  return (
    <span className="ix-an ix-an--pulse" aria-hidden="true">
      <i />
    </span>
  );
}
function IX_Outcomes({ items }) {
  return (
    <ul className="ix-out">
      {items.map(([t, ic, d, kind], k) => (
        <li key={t} style={{ "--k": k }}>
          <IX_Anim kind={kind} />
          <span className="ix-out__ic">
            <IX_I n={ic} s={18} />
          </span>
          <b>{t}</b>
          <p>{d}</p>
        </li>
      ))}
    </ul>
  );
}

/* ── CHAIN — cause → effect chain lit in sequence ────────────────────────────────────── */
function IX_Chain({ items, vertical }) {
  const [ref, v] = ppIn(0.3);
  const [i] = ixCycle(items.length, v, 1300, false);
  return (
    <ol ref={ref} className={"ix-chain" + (vertical ? " ix-chain--v" : "") + (v ? " is-in" : "")}>
      {items.map(([t, ic, d], k) => (
        <li key={t} className={k <= i ? "is-on" : ""} style={{ "--k": k }}>
          <span className="ix-chain__ic">
            <IX_I n={ic} s={18} />
          </span>
          <b>{t}</b>
          {d && <p>{d}</p>}
        </li>
      ))}
    </ol>
  );
}

/* ── TIMELINE — horizontal stages with progress; select any stage ─────────────────────── */
function IX_Timeline({ id, stages, note }) {
  const [ref, v] = ppIn(0.3);
  const [user, setUser] = ee.useState(false);
  const [a, setA] = ixCycle(stages.length, v, 2200, user);
  return (
    <div ref={ref} className={"ix-tl" + (v ? " is-in" : "")} style={{ "--n": stages.length, "--a": a }}>
      <div className="ix-tl__rail" aria-hidden="true">
        <i style={{ width: (a / (stages.length - 1)) * 100 + "%" }} />
      </div>
      <ol className="ix-tl__list">
        {stages.map(([t, d, ic], k) => (
          <li key={t} className={(k === a ? "is-on" : "") + (k < a ? " is-done" : "")}>
            <button
              type="button"
              aria-pressed={k === a}
              aria-controls={id + "-d"}
              onClick={() => {
                setUser(true);
                setA(k);
              }}
            >
              <span className="ix-tl__n">
                <IX_I n={ic || "check"} s={16} />
              </span>
              <b>{t}</b>
              <small>{String(k + 1).padStart(2, "0")}</small>
            </button>
          </li>
        ))}
      </ol>
      <p className="ix-tl__d" id={id + "-d"} aria-live="polite">
        <b>{stages[a][0]}.</b> {stages[a][1]}
      </p>
      {note && <p className="ix-tl__note">{note}</p>}
    </div>
  );
}

/* ── EVENT — one business event cascades through connected actions ───────────────────── */
function IX_Event({ trigger, steps, note, done = "Every connected record updated" }) {
  const [ref, v] = ppIn(0.3);
  const [k, setK] = ee.useState(-1);
  const [run, setRun] = ee.useState(0);
  ee.useEffect(() => {
    if (!v) return;
    if (ppR()) {
      setK(steps.length);
      return;
    }
    setK(-1);
    let i = -1;
    const t = setInterval(() => {
      i++;
      setK(i);
      if (i >= steps.length) clearInterval(t);
    }, 650);
    return () => clearInterval(t);
  }, [v, run, steps.length]);
  return (
    <div ref={ref} className={"ix-ev" + (v ? " is-in" : "")}>
      <div className={"ix-ev__trigger" + (k >= 0 ? " is-on" : "")}>
        <span className="ix-ev__bolt">
          <IX_I n={trigger[1]} s={22} />
        </span>
        <div>
          <small>Trigger</small>
          <b>{trigger[0]}</b>
        </div>
      </div>
      <ol className="ix-ev__steps">
        {steps.map(([t, ic, who], i) => (
          <li key={t} className={i < k ? "is-done" : i === k ? "is-on" : ""} style={{ "--i": i }}>
            <span className="ix-ev__ic">
              <IX_I n={i < k ? "check" : ic} s={15} />
            </span>
            <b>{t}</b>
            {who && <em>{who}</em>}
          </li>
        ))}
      </ol>
      <div className={"ix-ev__done" + (k >= steps.length ? " is-on" : "")} aria-live="polite">
        <IX_I n="check" s={16} /> {k >= steps.length ? done : "Running…"}
        <button type="button" className="ix-replay" onClick={() => setRun((x) => x + 1)}>
          <IX_I n="replay" s={14} /> Replay
        </button>
      </div>
      {note && <p className="ix-ev__note">{note}</p>}
    </div>
  );
}

/* ── OPTIONS — consultative approach cards (configure / extend / build …) ─────────────── */
function IX_Options({ items, foot, start = 1 }) {
  const [s, setS] = ee.useState(start);
  return (
    <div className="ix-opt">
      <ul className="ix-opt__list">
        {items.map((o, k) => (
          <li key={o.t}>
            <button type="button" className={s === k ? "is-on" : ""} aria-pressed={s === k} onClick={() => setS(k)} onMouseEnter={() => setS(k)}>
              <span className="ix-opt__tag">{o.tag}</span>
              <span className="ix-opt__ic">
                <IX_I n={o.icon} s={22} />
              </span>
              <b>{o.t}</b>
              <p>{o.d}</p>
              {o.best && (
                <ul>
                  {o.best.map((x) => (
                    <li key={x}>
                      <IX_I n="check" s={13} />
                      {x}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          </li>
        ))}
      </ul>
      {foot && <p className="ix-opt__foot">{foot}</p>}
    </div>
  );
}

/* ── CONTROL ROOM — live-feeling operations dashboard with an Attention Required panel ── */
function IX_Control({ app = "Control room", tiles, attention, insights }) {
  const [ref, v] = ppIn(0.2);
  const [i] = ixCycle(insights ? insights.length : 0, v, 3200, false);
  return (
    <div ref={ref} className={"ix-cr" + (v ? " is-in" : "")}>
      <div className="ix-cr__top" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{app}</span>
        <em>
          <i className="ix-dot ix-dot--ok" /> Live view
        </em>
      </div>
      <div className="ix-cr__body">
        <ul className="ix-cr__tiles">
          {tiles.map(([t, ic, kind], k) => (
            <li key={t} style={{ "--k": k }}>
              <div className="ix-w__h">
                <IX_I n={ic} s={14} />
                <b>{t}</b>
              </div>
              <IX_Widget w={{ t: "", kind: kind || "spark" }} k={k} />
            </li>
          ))}
        </ul>
        <aside className="ix-cr__att" aria-label="Attention required">
          <b className="ix-cr__att-h">
            <i className="ix-dot ix-dot--hot" aria-hidden="true" /> Attention required
          </b>
          <ul>
            {attention.map(([t, ic, lv], k) => (
              <li key={t} style={{ "--k": k }} className={"is-" + (lv || "warn")}>
                <IX_I n={ic} s={15} />
                <span>{t}</span>
              </li>
            ))}
          </ul>
          {insights && (
            <div className="ix-cr__ai" aria-live="polite">
              <small>
                <IX_I n="spark" s={12} /> AI-assisted insight
              </small>
              <p key={i}>{insights[i]}</p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

/* ── SERVICES — compact service → problem → value cards ──────────────────────────────── */
function IX_Services({ items }) {
  return (
    <ul className="ix-svc">
      {items.map(([t, p, val, ic], k) => (
        <li key={t} style={{ "--k": k }}>
          <span className="ix-svc__ic">
            <IX_I n={ic || "box"} s={18} />
          </span>
          <b>{t}</b>
          <p className="ix-svc__p">
            <small>Solves</small>
            {p}
          </p>
          <p className="ix-svc__v">
            <small>Value</small>
            {val}
          </p>
        </li>
      ))}
    </ul>
  );
}

/* ── INDUSTRIES — compact icon chips; hover/tap shows a typical need ──────────────────── */
function IX_Industries({ items, lead = "Choose an industry" }) {
  const [a, setA] = ee.useState(-1);
  const all = INDUSTRIES;
  const to = (t) => {
    const m = all.find((x) => x.name && x.name.toLowerCase().startsWith(t.toLowerCase().split(" ")[0]));
    return m ? "/industries-case-studies/" + m.slug : null;
  };
  return (
    <div className="ix-ind">
      <ul className="ix-ind__chips">
        {items.map(([t, ic, use], k) => {
          const href = to(t);
          const inner = (
            <>
              <IX_I n={ic} s={16} />
              {t}
            </>
          );
          return (
            <li key={t} style={{ "--k": k }} onMouseEnter={() => setA(k)} onFocus={() => setA(k)}>
              {href ? (
                <PpL to={href} className={a === k ? "is-on" : ""}>
                  {inner}
                </PpL>
              ) : (
                <button type="button" className={a === k ? "is-on" : ""} onClick={() => setA(k)}>
                  {inner}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      <p className="ix-ind__use" aria-live="polite">
        {a >= 0 ? (
          <>
            <b>{items[a][0]}</b> — {items[a][2]}
          </>
        ) : (
          <span className="ix-mx__muted">{lead}</span>
        )}
      </p>
    </div>
  );
}

/* ── RELATED — connected IT & Development services ───────────────────────────────────── */
function IX_Related({ items, base = ppIt }) {
  return (
    <ul className="ix-rel">
      {items.map(([t, slug, why], k) => (
        <li key={t} style={{ "--k": k }}>
          <PpL to={base(slug)}>
            <b>{t}</b>
            <span>{why}</span>
            <em aria-hidden="true">→</em>
          </PpL>
        </li>
      ))}
    </ul>
  );
}

/* ── TIERS — staged transformation (record → connect → understand; old → better → new …) ─ */
function IX_Tiers({ cols, final, variant = "" }) {
  const [ref, v] = ppIn(0.25);
  return (
    <div ref={ref} className={"ix-tiers " + (variant ? "ix-tiers--" + variant : "") + (v ? " is-in" : "")}>
      <ol className="ix-tiers__cols" style={{ "--n": cols.length }}>
        {cols.map((c, k) => (
          <li key={c.t} style={{ "--k": k }} className={k === cols.length - 1 ? "is-last" : ""}>
            <span className="ix-tiers__n">{c.n || String(k + 1).padStart(2, "0")}</span>
            <span className="ix-tiers__ic">
              <IX_I n={c.icon} s={20} />
            </span>
            <b>{c.t}</b>
            {c.s && <small>{c.s}</small>}
            {c.items && (
              <ul>
                {c.items.map((x, i) => (
                  <li key={x} style={{ "--i": i }}>
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ol>
      {final && <p className="ix-tiers__final">{final}</p>}
    </div>
  );
}

/* ── PINS — a business flow with the questions asked at each point ────────────────────── */
function IX_Pins({ flow, pins }) {
  const [ref, v] = ppIn(0.3);
  const [h, setH] = ee.useState(-1);
  const [auto] = ixCycle(pins.length, v, 2600, h >= 0);
  const a = h >= 0 ? h : auto;
  return (
    <div ref={ref} className={"ix-pins" + (v ? " is-in" : "")}>
      <ol className="ix-pins__flow" style={{ "--n": flow.length }}>
        {flow.map((t, k) => (
          <li key={t} className={pins[a][0] === k ? "is-on" : ""} style={{ "--k": k }}>
            <i aria-hidden="true" />
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <ul className="ix-pins__qs">
        {pins.map(([at, q, ic], k) => (
          <li key={q}>
            <button type="button" className={a === k ? "is-on" : ""} onMouseEnter={() => setH(k)} onMouseLeave={() => setH(-1)} onFocus={() => setH(k)} onBlur={() => setH(-1)}>
              <IX_I n={ic || "help"} s={15} />
              <span>{q}</span>
              <em>{flow[at]}</em>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── FINAL — closing CTA with data flowing toward the button ──────────────────────────── */
function IX_Final({ id, kicker, title, text, cta, cta2, cta3, flow, sig }) {
  return (
    <section className="ix-final" aria-labelledby={id}>
      <div className="ix-final__flow" aria-hidden="true">
        {(flow || []).map((t, k) => (
          <span key={t} style={{ "--k": k, "--n": flow.length }}>
            {t}
          </span>
        ))}
      </div>
      <div className="container ix-final__in">
        {kicker && <span className="pp-kick pp-kick--light">{kicker}</span>}
        <h2 id={id}>{title}</h2>
        <p>{text}</p>
        <div className="pp-ctas pp-ctas--c">
          <a href={"#" + cta[1]} onClick={ppGo(cta[1])} className="btn btn--lg pp-btn ix-final__btn">
            {cta[0]} <span aria-hidden="true">→</span>
          </a>
          {cta2 && (
            <PpL to={cta2[1]} className="btn btn--lg pp-btn-ghost">
              {cta2[0]}
            </PpL>
          )}
          {cta3 && (
            <a href={"#" + cta3[1]} onClick={ppGo(cta3[1])} className="btn btn--lg pp-btn-ghost">
              {cta3[0]}
            </a>
          )}
        </div>
        {sig && <p className="ix-final__sig">{sig}</p>}
      </div>
    </section>
  );
}

/* ── BAND — a large-typography statement between sections ─────────────────────────────── */
function IX_Band({ text, sub, tone = "off", micro }) {
  const [ref, v] = ppIn(0.4);
  return (
    <div ref={ref} className={"ix-band ix-band--" + tone + (v ? " is-in" : "")}>
      <div className="container">
        {micro && (
          <ul className="ix-band__micro">
            {micro.map((m, k) => (
              <li key={m} style={{ "--k": k }}>
                {m}
              </li>
            ))}
          </ul>
        )}
        <p className="ix-band__t">{text}</p>
        {sub && <p className="ix-band__s">{sub}</p>}
      </div>
    </div>
  );
}

/* ── GUIDE — one editorial card linking an existing guide ─────────────────────────────── */
function IX_Guide({ to, title, text, tag = "Guide" }) {
  return (
    <div className="ix-guide">
      <div className="container">
        <PpL to={to} className="ix-guide__c">
          <span className="ix-guide__tag">
            <IX_I n="book" s={14} /> {tag}
          </span>
          <b>{title}</b>
          <span>{text}</span>
          <em aria-hidden="true">Read the guide →</em>
        </PpL>
      </div>
    </div>
  );
}

/* shared schema helper for these pages */
function ixSchema(key, c) {
  dmSchema(key, { path: c.url, crumb: c.crumb, parent: c.parent || DK_PARENT_IT, name: c.name, serviceType: c.serviceType, description: c.schemaDesc, faq: c.faq });
}

export { IX_Ask, IX_Band, IX_Chain, IX_Control, IX_Eco, IX_Event, IX_Final, IX_Flows, IX_Fragment, IX_Graph, IX_Guide, IX_Hero, IX_I, IX_Industries, IX_Layers, IX_Matrix, IX_Motto, IX_Options, IX_Outcomes, IX_Pins, IX_Related, IX_Roles, IX_Sec, IX_Services, IX_Stack, IX_Tiers, IX_Timeline, IX_Tree, IX_Trust, IX_VS, IX_Why, React_Frag, ixCycle, ixSchema };
