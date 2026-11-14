/*
 * Market research quality process page (build 65, update 4). Prefix QP5_. Styles: src/styles/quality65.css (qp5-).
 *   /downloads/quality-process/market-research
 * One page for the market research quality process (not split by country). Content: src/data/Quality65.jsx.
 * Sections: observatory hero (canvas globe with the three panel hubs), five pillars round a shield, the three panels,
 * the 12-step respondent journey (fills as you scroll), audiences (B2B org network, B2C cards, healthcare network /
 * patient journey / caregiver path), the 18-checkpoint shield, the illustrative 0–200 score gauge with live factor
 * sliders, a respondent-history demo, the three-stage validation pipeline, rewards wallet demo, member dashboards
 * (schematic), client reporting demo, privacy flow, improvement ring, FAQ and the PDF download (QualityPdf65.jsx).
 * Everything that is demo data says so on screen. Works without animation (reduced motion / lite mode).
 */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { FRK_EMBLEM_SM } from '../components/site/FrKit.jsx';
import { K5_Count, K5_P, K5_Rv, K5_Sec, K5_Words, k5Reduce, k5Tilt } from '../components/site/Kit65.jsx';
import { FRL_Plate } from '../components/site/Logos13.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { PC5_P } from '../data/PanelCountries65.jsx';
import { QP5_B2B, QP5_B2C, QP5_BANDS, QP5_DASH, QP5_FACTORS, QP5_FAQ, QP5_FLAG_NOTE, QP5_FLOW, QP5_HC, QP5_HERO, QP5_HISTORY, QP5_JOURNEY, QP5_OUTCOMES, QP5_PANELS, QP5_PILLARS, QP5_PIPE, QP5_POINTS, QP5_PRIVACY, QP5_REPORT, QP5_REWARDS, QP5_RING, QP5_SCORE_NOTE, QP5_SHIELD, QP5_SHOTS, QP5_WALLET } from '../data/Quality65.jsx';
import { qp5Book } from '../components/site/QualityPdf65.jsx';

const qp5Ic = (n) => PC5_P[n] || K5_P[n] || K5_P.spark;
function QP5_I({ n, s = 22, sw = 1.8, className = "" }) {
  return (
    <svg className={"qp5-i " + className} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={qp5Ic(n)} />
    </svg>
  );
}
const qp5Go = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
};
const QP5_PATH = "/downloads/quality-process/market-research";

/* ── hero: observatory globe ──────────────────────────────────────────────────────── */
function QP5_Globe({ onHub }) {
  const ref = ee.useRef(null);
  const [hot, setHot] = ee.useState(-1);
  ee.useEffect(() => {
    const cv = ref.current;
    if (!cv) return undefined;
    const x = cv.getContext("2d");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0,
      H = 0,
      raf = 0,
      vis = true,
      t0 = performance.now();
    const size = () => {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = W * dpr;
      cv.height = H * dpr;
      x.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    /* fibonacci sphere of respondent nodes */
    const N = 260;
    const pts = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2,
        r = Math.sqrt(1 - y * y),
        th = i * 2.39996;
      pts.push([Math.cos(th) * r, y, Math.sin(th) * r, Math.random()]);
    }
    const hubs = [
      [0.55, -0.35, 0.76, "#4C8DFF"],
      [-0.7, 0.1, 0.7, "#9B7BFF"],
      [0.1, 0.62, 0.78, "#22D3B6"],
    ];
    const links = [];
    for (let i = 0; i < 70; i++) links.push([Math.floor(Math.random() * N), i % 3, Math.random()]);
    const proj = (p, a, R, cx, cy) => {
      const ca = Math.cos(a),
        sa = Math.sin(a);
      const X = p[0] * ca + p[2] * sa,
        Z = -p[0] * sa + p[2] * ca;
      const tilt = 0.32,
        Y = p[1] * Math.cos(tilt) - Z * Math.sin(tilt),
        Z2 = p[1] * Math.sin(tilt) + Z * Math.cos(tilt);
      const s = 1 / (1.9 - Z2 * 0.6);
      return [cx + X * R * s * 1.4, cy + Y * R * s * 1.4, Z2];
    };
    const still = k5Reduce();
    let mx = 0,
      my = 0;
    const mv = (e) => {
      const r = cv.getBoundingClientRect();
      mx = (e.clientX - r.left) / r.width - 0.5;
      my = (e.clientY - r.top) / r.height - 0.5;
    };
    cv.parentElement.addEventListener("pointermove", mv);
    const draw = (now) => {
      const t = (now - t0) / 1000;
      const a = still ? 0.6 : t * 0.14 + mx * 0.6;
      const R = Math.min(W, H) * 0.36,
        cx = W / 2 + mx * 12,
        cy = H / 2 + my * 10;
      x.clearRect(0, 0, W, H);
      const g = x.createRadialGradient(cx - R * 0.3, cy - R * 0.4, R * 0.1, cx, cy, R * 1.3);
      g.addColorStop(0, "rgba(64,120,255,.28)");
      g.addColorStop(0.6, "rgba(10,40,90,.18)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      x.fillStyle = g;
      x.beginPath();
      x.arc(cx, cy, R * 1.3, 0, Math.PI * 2);
      x.fill();
      /* orbit rings */
      x.strokeStyle = "rgba(0,217,255,.16)";
      x.lineWidth = 1;
      [1.18, 1.36].forEach((k, i) => {
        x.beginPath();
        x.ellipse(cx, cy, R * k, R * k * 0.3, -0.25 + i * 0.5, 0, Math.PI * 2);
        x.stroke();
      });
      const P = pts.map((p) => proj(p, a, R, cx, cy));
      const HP = hubs.map((h) => proj(h, a, R, cx, cy));
      /* links from respondents to hubs, with travelling particles */
      links.forEach(([i, h, ph]) => {
        const p = P[i],
          q = HP[h];
        if (p[2] < -0.2 && q[2] < -0.2) return;
        const al = 0.08 + Math.max(0, p[2]) * 0.18;
        x.strokeStyle = hubs[h][3] + Math.round(al * 255).toString(16).padStart(2, "0");
        x.beginPath();
        const mxp = (p[0] + q[0]) / 2,
          myp = (p[1] + q[1]) / 2 - 18;
        x.moveTo(p[0], p[1]);
        x.quadraticCurveTo(mxp, myp, q[0], q[1]);
        x.stroke();
        if (!still) {
          const k = (t * 0.35 + ph) % 1;
          const bx = (1 - k) * (1 - k) * p[0] + 2 * (1 - k) * k * mxp + k * k * q[0],
            by = (1 - k) * (1 - k) * p[1] + 2 * (1 - k) * k * myp + k * k * q[1];
          x.fillStyle = "rgba(255,255,255,.85)";
          x.beginPath();
          x.arc(bx, by, 1.4, 0, Math.PI * 2);
          x.fill();
        }
      });
      P.forEach(([px, py, z], i) => {
        const tw = 0.5 + 0.5 * Math.sin(t * 2 + pts[i][3] * 9);
        x.fillStyle = z > 0 ? `rgba(160,220,255,${0.35 + z * 0.55})` : `rgba(120,150,220,${0.12 + (z + 1) * 0.1})`;
        x.beginPath();
        x.arc(px, py, z > 0 ? 1.3 + z * 1.2 + (pts[i][3] > 0.93 ? tw * 1.6 : 0) : 0.9, 0, Math.PI * 2);
        x.fill();
        if (pts[i][3] > 0.97 && z > 0.2) {
          x.strokeStyle = `rgba(0,191,166,${0.6 * (1 - tw)})`;
          x.beginPath();
          x.arc(px, py, 3 + tw * 9, 0, Math.PI * 2);
          x.stroke();
        }
      });
      HP.forEach(([px, py, z], i) => {
        const pulse = still ? 0.5 : (t * 0.8 + i * 0.33) % 1;
        x.strokeStyle = hubs[i][3];
        x.globalAlpha = 1 - pulse;
        x.beginPath();
        x.arc(px, py, 10 + pulse * 26, 0, Math.PI * 2);
        x.stroke();
        x.globalAlpha = 1;
        x.fillStyle = hubs[i][3];
        x.beginPath();
        x.arc(px, py, 7 + Math.max(0, z) * 3, 0, Math.PI * 2);
        x.fill();
        x.fillStyle = "#fff";
        x.beginPath();
        x.arc(px, py, 2.6, 0, Math.PI * 2);
        x.fill();
        const el = cv.parentElement.querySelector(`[data-hub="${i}"]`);
        if (el) el.style.transform = `translate(${px}px,${py}px)`;
      });
      if (!still && vis) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (vis) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    raf = requestAnimationFrame(draw);
    const rs = () => (size(), still && requestAnimationFrame(draw));
    window.addEventListener("resize", rs);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", rs);
      cv.parentElement && cv.parentElement.removeEventListener("pointermove", mv);
    };
  }, []);
  return (
    <div className="qp5-globe">
      <canvas ref={ref} aria-hidden="true" />
      {QP5_PANELS.map((p, i) => (
        <button key={p.k} type="button" data-hub={i} className={"qp5-hub" + (hot === i ? " is-hot" : "")} style={{ "--c": p.c }} onMouseEnter={() => setHot(i)} onMouseLeave={() => setHot(-1)} onFocus={() => setHot(i)} onBlur={() => setHot(-1)} onClick={() => onHub(p.k)} aria-label={`${p.t}: ${p.aud}. Go to the panel`}>
          <span className="qp5-hub__card">
            <b>{p.t}</b>
            <small>{p.aud}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

function QP5_Hero({ onGet }) {
  return (
    <header className="qp5-hero">
      <div className="qp5-hero__sky" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container qp5-hero__in">
        <div className="qp5-hero__txt">
          <nav className="qp5-crumbs" aria-label="Breadcrumb">
            <HmLink to="/downloads">Downloads</HmLink> <span aria-hidden="true">/</span> <HmLink to="/downloads/quality-process">Quality process</HmLink> <span aria-hidden="true">/</span> <span aria-current="page">Market research</span>
          </nav>
          <span className="qp5-kick">
            <QP5_I n="shield" s={15} /> Market research · quality process
          </span>
          <K5_Words as="h1" className="qp5-hero__h" text={QP5_HERO.h} />
          <p className="qp5-hero__sub">{QP5_HERO.sub}</p>
          <p className="qp5-hero__d">{QP5_HERO.d}</p>
          <div className="qp5-hero__cta">
            <button type="button" className="qp5-btn qp5-btn--glow" onClick={() => qp5Go("qp5-pillars")}>
              Explore our quality framework <QP5_I n="arrow" s={16} />
            </button>
            <HmLink to="/lets-talk" className="qp5-btn qp5-btn--ghost">
              Request a quality consultation
            </HmLink>
            <button type="button" className="qp5-btn qp5-btn--line" onClick={onGet}>
              <QP5_I n="down" s={16} /> Download the PDF
            </button>
          </div>
          <ul className="qp5-hero__stats" aria-label="At a glance">
            <li>
              <b>
                <K5_Count to={3} />
              </b>
              <span>specialised panels</span>
            </li>
            <li>
              <b>
                <K5_Count to={12} />
              </b>
              <span>journey stages</span>
            </li>
            <li>
              <b>
                <K5_Count to={18} />
              </b>
              <span>quality checkpoints</span>
            </li>
            <li>
              <b>
                <K5_Count to={5} />
              </b>
              <span>quality pillars</span>
            </li>
          </ul>
        </div>
        <QP5_Globe onHub={(k) => qp5Go("qp5-panel-" + k)} />
      </div>
      <svg className="qp5-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40C240 80 480 0 720 30s480 50 720 10v40H0z" />
      </svg>
    </header>
  );
}

/* ── sticky chapter nav ──────────────────────────────────────────────────────────── */
const QP5_NAV = [
  ["qp5-pillars", "Pillars"],
  ["qp5-panels", "Panels"],
  ["qp5-journey", "Journey"],
  ["qp5-aud", "Audiences"],
  ["qp5-shield", "18 checks"],
  ["qp5-score", "Quality score"],
  ["qp5-pipe", "Validation"],
  ["qp5-rewards", "Rewards"],
  ["qp5-report", "Reporting"],
  ["qp5-privacy", "Privacy"],
  ["qp5-faq", "FAQ"],
];
function QP5_Nav() {
  const [on, setOn] = ee.useState("");
  ee.useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    QP5_NAV.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return (
    <nav className="qp5-nav" aria-label="On this page">
      <div className="container qp5-nav__in">
        {QP5_NAV.map(([id, t]) => (
          <a key={id} href={"#" + id} className={on === id ? "is-on" : ""} onClick={(e) => (e.preventDefault(), qp5Go(id))}>
            {t}
          </a>
        ))}
      </div>
    </nav>
  );
}

function QP5_Head({ k, h, em, d, id }) {
  return (
    <div className="qp5-head">
      <span className="qp5-kick">{k}</span>
      <h2 id={id}>
        {h} {em ? <em>{em}</em> : null}
      </h2>
      {d ? <p>{d}</p> : null}
    </div>
  );
}

/* ── pillars round a shield ──────────────────────────────────────────────────────── */
function QP5_Pillars() {
  const [open, setOpen] = ee.useState(0);
  return (
    <K5_Sec className="qp5-sec qp5-pillars" id="qp5-pillars" aria-labelledby="qp5-pillars-h">
      <div className="container">
        <QP5_Head id="qp5-pillars-h" k="Our quality philosophy" h="Quality is not a final check." em="It is built into every stage." />
        <div className="qp5-pil">
          <div className="qp5-pil__core" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <defs>
                <linearGradient id="qp5-shg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#00D9FF" />
                  <stop offset="1" stopColor="#4169E1" />
                </linearGradient>
              </defs>
              {[92, 76, 60].map((r, i) => (
                <circle key={r} cx="100" cy="100" r={r} className={"qp5-pil__ring qp5-pil__ring--" + i} />
              ))}
              <path className="qp5-pil__shield" d="M100 46l40 15v30c0 26-17 46-40 56-23-10-40-30-40-56V61z" fill="url(#qp5-shg)" />
              <path d="M84 98l11 11 22-24" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" className="qp5-pil__tick" />
            </svg>
          </div>
          <ol className="qp5-pil__list">
            {QP5_PILLARS.map((p, i) => (
              <K5_Rv as="li" a={i % 2 ? "right" : "left"} d={i} key={p.t} className={"qp5-pil__card" + (open === i ? " is-open" : "")} style={{ "--i": i }}>
                <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                  <span className="qp5-pil__n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="qp5-pil__ic">
                    <QP5_I n={p.ic} s={22} />
                  </span>
                  <span className="qp5-pil__t">
                    <b>{p.t}</b>
                    <small>{p.d}</small>
                  </span>
                  <QP5_I n="arrow" s={16} className="qp5-pil__chev" />
                </button>
                <div className="qp5-pil__more" hidden={open !== i}>
                  <p>{p.more}</p>
                </div>
              </K5_Rv>
            ))}
          </ol>
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── three panels ────────────────────────────────────────────────────────────────── */
function QP5_Panels() {
  return (
    <K5_Sec className="qp5-sec qp5-panels" id="qp5-panels" aria-labelledby="qp5-panels-h">
      <div className="container">
        <QP5_Head id="qp5-panels-h" k="Three-panel ecosystem" h="Three research communities." em="Specialised audience expertise." d="Each panel is run for the audience it serves, with its own recruitment, profiling and quality steps, and all three follow the same quality framework." />
        <div className="qp5-pan">
          {QP5_PANELS.map((p, i) => (
            <K5_Rv as="article" a="flip" d={i} key={p.k} id={"qp5-panel-" + p.k} className="qp5-pan__card" style={{ "--c": p.c }} {...k5Tilt(6)}>
              <div className="qp5-pan__top">
                <span className="qp5-pan__logo">
                  <FRL_Plate k={p.k} h={40} alt={p.t + " logo"} />
                </span>
                <span className="qp5-pan__aud">{p.aud}</span>
              </div>
              <p className="qp5-pan__d">{p.d}</p>
              <div className="qp5-pan__flow" aria-hidden="true">
                {[0, 1, 2, 3].map((k) => (
                  <i key={k} style={{ "--k": k }} />
                ))}
              </div>
              <ul className="qp5-pan__pts">
                {p.pts.map((x) => (
                  <li key={x}>
                    <QP5_I n="check" s={13} /> {x}
                  </li>
                ))}
              </ul>
              <a className="qp5-pan__go" href={p.url} target="_blank" rel="noopener noreferrer">
                Visit {p.t} <QP5_I n="arrow" s={14} />
              </a>
            </K5_Rv>
          ))}
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── 12-step journey, fills as you scroll ────────────────────────────────────────── */
function QP5_Journey() {
  const ref = ee.useRef(null);
  const [p, setP] = ee.useState(0);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const v = (window.innerHeight * 0.55 - r.top) / r.height;
        setP(Math.max(0, Math.min(1, v)));
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => (window.removeEventListener("scroll", on), cancelAnimationFrame(raf));
  }, []);
  const act = Math.min(11, Math.floor(p * 12));
  return (
    <K5_Sec className="qp5-sec qp5-journey" id="qp5-journey" aria-labelledby="qp5-journey-h">
      <div className="container">
        <QP5_Head id="qp5-journey-h" k="Respondent journey" h="From recruitment to" em="research-ready respondents." d="Twelve stages every member passes through. Scroll and follow the signal as it moves from one checkpoint to the next." />
        <ol className="qp5-jr" ref={ref} style={{ "--p": p }}>
          <span className="qp5-jr__rail" aria-hidden="true">
            <i />
            <b />
          </span>
          {QP5_JOURNEY.map((s, i) => (
            <li key={s.t} className={"qp5-jr__s" + (i <= act ? " is-on" : "") + (i === act ? " is-now" : "") + (i % 2 ? " is-r" : "")}>
              <span className="qp5-jr__dot" aria-hidden="true">
                <QP5_I n={s.ic} s={20} />
              </span>
              <div className="qp5-jr__card">
                <span className="qp5-jr__n">Stage {String(i + 1).padStart(2, "0")}</span>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </K5_Sec>
  );
}

/* ── audiences: B2B / B2C / healthcare ───────────────────────────────────────────── */
function QP5_B2BSec() {
  const [r, setR] = ee.useState(0);
  const R = QP5_B2B.roles;
  return (
    <div className="qp5-aud__pane">
      <div className="qp5-aud__txt">
        <h3>{QP5_B2B.h}</h3>
        <p>{QP5_B2B.d}</p>
        <ol className="qp5-steps">
          {QP5_B2B.steps.map((s, i) => (
            <li key={s} style={{ "--i": i }}>
              <span>{String(i + 1).padStart(2, "0")}</span> {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="qp5-orgw">
      <div className="qp5-org">
        <svg viewBox="0 0 400 400" className="qp5-org__svg" aria-hidden="true">
          {R.map((x, i) => {
            const a = (i / R.length) * Math.PI * 2 - Math.PI / 2;
            return <line key={i} x1="200" y1="200" x2={200 + Math.cos(a) * 150} y2={200 + Math.sin(a) * 150} className={i === r ? "is-on" : ""} />;
          })}
          <circle cx="200" cy="200" r="150" className="qp5-org__orbit" />
        </svg>
        <div className="qp5-org__core">
          <QP5_I n="brief" s={26} />
          <b>B2B</b>
        </div>
        {R.map((x, i) => {
          const a = (i / R.length) * Math.PI * 2 - Math.PI / 2;
          return (
            <button key={x.t} type="button" className={"qp5-org__n" + (i === r ? " is-on" : "")} style={{ left: 50 + Math.cos(a) * 37.5 + "%", top: 50 + Math.sin(a) * 37.5 + "%" }} onClick={() => setR(i)} aria-pressed={i === r}>
              <QP5_I n={x.ic} s={18} />
              <span>{x.t}</span>
            </button>
          );
        })}
      </div>
        <div className="qp5-org__info" aria-live="polite">
          <b>{R[r].t}</b>
          <span>Qualified on</span>
          <ul>
            {R[r].a.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <p className="qp5-note">{QP5_B2B.note}</p>
      </div>
    </div>
  );
}
function QP5_B2CSec() {
  return (
    <div className="qp5-aud__pane">
      <div className="qp5-aud__txt">
        <h3>{QP5_B2C.h}</h3>
        <p>{QP5_B2C.d}</p>
        <ol className="qp5-steps">
          {QP5_B2C.steps.map((s, i) => (
            <li key={s} style={{ "--i": i }}>
              <span>{String(i + 1).padStart(2, "0")}</span> {s}
            </li>
          ))}
        </ol>
      </div>
      <div className="qp5-cons">
        <div className="qp5-cons__core" aria-hidden="true">
          <QP5_I n="people" s={30} />
          <b>B2C</b>
        </div>
        <ul className="qp5-cons__cards">
          {QP5_B2C.cards.map(([t, ic], i) => (
            <li key={t} style={{ "--i": i, "--n": QP5_B2C.cards.length }}>
              <span>
                <QP5_I n={ic} s={18} />
              </span>
              {t}
            </li>
          ))}
        </ul>
        <p className="qp5-note">{QP5_B2C.note}</p>
      </div>
    </div>
  );
}
function QP5_Health() {
  const [s, setS] = ee.useState(0);
  const x = QP5_HC[s];
  return (
    <div className="qp5-aud__pane qp5-hc">
      <div className="qp5-aud__txt">
        <h3>Specialised recruitment for healthcare research</h3>
        <div className="qp5-hc__tabs" role="tablist" aria-label="Healthcare audiences">
          {QP5_HC.map((h, i) => (
            <button key={h.k} type="button" role="tab" aria-selected={s === i} className={s === i ? "is-on" : ""} onClick={() => setS(i)}>
              <QP5_I n={h.ic} s={16} /> {h.t}
            </button>
          ))}
        </div>
        <p>{x.d}</p>
        <ul className="qp5-hc__pts">
          {x.pts.map((p) => (
            <li key={p}>
              <QP5_I n="check" s={13} /> {p}
            </li>
          ))}
        </ul>
      </div>
      <div className={"qp5-hc__viz qp5-hc__viz--" + x.k} key={x.k}>
        <svg className="qp5-hc__ecg" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 30h170l14-20 18 40 16-34 10 14h120l14-20 18 40 16-34 10 14h194" />
        </svg>
        {x.k === "hcp" ? (
          <div className="qp5-net">
            <span className="qp5-net__core">
              <QP5_I n="stetho" s={28} />
            </span>
            {x.nodes.map((n, i) => (
              <span key={n} className="qp5-net__n" style={{ "--a": (i / x.nodes.length) * 360 + "deg", "--i": i }}>
                <i>{n}</i>
              </span>
            ))}
          </div>
        ) : (
          <ol className="qp5-path">
            {x.nodes.map((n, i) => (
              <li key={n} style={{ "--i": i }}>
                <span>{i + 1}</span>
                {n}
              </li>
            ))}
          </ol>
        )}
        <p className="qp5-note">{x.note}</p>
      </div>
    </div>
  );
}
function QP5_Aud() {
  const [t, setT] = ee.useState(0);
  const tabs = [
    ["B2B professionals", "brief"],
    ["B2C consumers", "people"],
    ["Healthcare", "pulse"],
  ];
  return (
    <K5_Sec className="qp5-sec qp5-aud" id="qp5-aud" aria-labelledby="qp5-aud-h">
      <div className="container">
        <QP5_Head id="qp5-aud-h" k="Recruitment by audience" h="Different people," em="different checks." d="Business professionals, consumers and healthcare audiences are recruited and qualified in their own way." />
        <div className="qp5-aud__tabs" role="tablist" aria-label="Audience">
          {tabs.map(([l, ic], i) => (
            <button key={l} type="button" role="tab" aria-selected={t === i} className={t === i ? "is-on" : ""} onClick={() => setT(i)}>
              <QP5_I n={ic} s={18} /> {l}
            </button>
          ))}
        </div>
        <div className="qp5-aud__stage" key={t}>
          {t === 0 ? <QP5_B2BSec /> : t === 1 ? <QP5_B2CSec /> : <QP5_Health />}
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── 18-checkpoint shield ────────────────────────────────────────────────────────── */
function QP5_Shield() {
  const [n, setN] = ee.useState(0);
  const c = QP5_SHIELD[n];
  const N = QP5_SHIELD.length;
  return (
    <K5_Sec className="qp5-sec qp5-dark qp5-shield" id="qp5-shield" aria-labelledby="qp5-shield-h">
      <div className="container">
        <QP5_Head id="qp5-shield-h" k="Multi-layer validation" h="Eighteen checkpoints." em="One objective: reliable participation." d="Pick any checkpoint to see where it applies and what it helps catch. The checkpoints are layered, so no single check carries the whole load." />
        <div className="qp5-sh">
          <div className="qp5-sh__ring">
            <svg viewBox="0 0 400 400" aria-hidden="true">
              <circle cx="200" cy="200" r="168" className="qp5-sh__orbit" />
              <circle cx="200" cy="200" r="124" className="qp5-sh__orbit qp5-sh__orbit--2" />
              <path className="qp5-sh__shape" d="M200 104l76 28v56c0 50-32 88-76 106-44-18-76-56-76-106v-56z" />
              <path className="qp5-sh__shape qp5-sh__shape--in" d="M200 128l56 21v41c0 37-24 65-56 78-32-13-56-41-56-78v-41z" />
              <text x="200" y="206" textAnchor="middle" className="qp5-sh__num">
                {String(n + 1).padStart(2, "0")}
              </text>
              <text x="200" y="232" textAnchor="middle" className="qp5-sh__of">
                of 18
              </text>
            </svg>
            {QP5_SHIELD.map((s, i) => {
              const a = (i / N) * Math.PI * 2 - Math.PI / 2;
              return (
                <button key={s[0]} type="button" className={"qp5-sh__n" + (i === n ? " is-on" : "")} style={{ left: 50 + Math.cos(a) * 42 + "%", top: 50 + Math.sin(a) * 42 + "%", "--i": i }} onClick={() => setN(i)} aria-pressed={i === n} aria-label={s[0]}>
                  <QP5_I n={s[4]} s={16} />
                </button>
              );
            })}
          </div>
          <div className="qp5-sh__info" aria-live="polite">
            <span className="qp5-sh__stage">{c[1]}</span>
            <h3>{c[0]}</h3>
            <dl>
              <dt>What it does</dt>
              <dd>{c[2]}</dd>
              <dt>Risk it helps identify</dt>
              <dd>{c[3]}</dd>
            </dl>
            <div className="qp5-sh__pager">
              <button type="button" onClick={() => setN((n + N - 1) % N)} aria-label="Previous checkpoint">
                <QP5_I n="arrow" s={16} className="qp5-flip" />
              </button>
              <button type="button" onClick={() => setN((n + 1) % N)} aria-label="Next checkpoint">
                <QP5_I n="arrow" s={16} />
              </button>
            </div>
            <ul className="qp5-sh__all">
              {QP5_SHIELD.map((s, i) => (
                <li key={s[0]}>
                  <button type="button" className={i === n ? "is-on" : ""} onClick={() => setN(i)}>
                    {s[0]}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── quality score gauge (illustrative) ──────────────────────────────────────────── */
const qp5Band = (v) => QP5_BANDS.find((b) => v >= b[0] && v <= b[1]) || QP5_BANDS[0];
function QP5_Gauge({ v }) {
  const a = (Math.min(200, Math.max(0, v)) / 200) * 180;
  const arc = (from, to) => {
    const p = (d) => [150 + 120 * Math.cos(Math.PI - (d / 200) * Math.PI), 150 - 120 * Math.sin(Math.PI - (d / 200) * Math.PI)];
    const [x1, y1] = p(from),
      [x2, y2] = p(to);
    return `M${x1} ${y1}A120 120 0 0 1 ${x2} ${y2}`;
  };
  const b = qp5Band(v);
  return (
    <svg viewBox="0 0 300 180" className="qp5-gauge" role="img" aria-label={`Illustrative score ${v} of 200: ${b[2]}`}>
      {QP5_BANDS.map((x) => (
        <path key={x[0]} d={arc(x[0] + 0.6, x[1] + (x[1] === 200 ? 0 : 0.4))} stroke={x[3]} className="qp5-gauge__band" />
      ))}
      {[0, 50, 100, 150, 200].map((t) => {
        const r = Math.PI - (t / 200) * Math.PI;
        return (
          <text key={t} x={150 + 96 * Math.cos(r)} y={150 - 96 * Math.sin(r) + 4} textAnchor="middle" className="qp5-gauge__tick">
            {t}
          </text>
        );
      })}
      <g className="qp5-gauge__needle" style={{ transform: `rotate(${a - 90}deg)` }}>
        <path d="M150 150L146 70 150 52 154 70z" />
      </g>
      <circle cx="150" cy="150" r="9" className="qp5-gauge__hub" />
      <text x="150" y="128" textAnchor="middle" className="qp5-gauge__v">
        {v}
      </text>
      <text x="150" y="174" textAnchor="middle" className="qp5-gauge__b" fill={b[3]}>
        {b[2]}
      </text>
    </svg>
  );
}
function QP5_Score() {
  const [f, setF] = ee.useState(() => QP5_FACTORS.map((x, i) => Math.round(x[1] * [0.84, 0.8, 0.71, 0.77, 0.64, 0.8, 0.75, 0.6][i])));
  const v = f.reduce((a, b) => a + b, 0);
  return (
    <K5_Sec className="qp5-sec qp5-score" id="qp5-score" aria-labelledby="qp5-score-h">
      <div className="container">
        <QP5_Head id="qp5-score-h" k="Respondent quality scoring" h="Quality is earned" em="through participation history." d="Move the sliders to see how an illustrative respondent's score changes. Each factor contributes up to a set number of points, and the total falls into a band." />
        <div className="qp5-sc">
          <div className="qp5-sc__dial">
            <QP5_Gauge v={v} />
            <ul className="qp5-sc__bands">
              {QP5_BANDS.map((b) => (
                <li key={b[0]} className={qp5Band(v) === b ? "is-on" : ""} style={{ "--c": b[3] }}>
                  <i />
                  <b>
                    {b[0]}–{b[1]}
                  </b>{" "}
                  {b[2]}
                </li>
              ))}
            </ul>
          </div>
          <div className="qp5-sc__f">
            {QP5_FACTORS.map(([t, mx, ic], i) => (
              <label key={t} className="qp5-sc__row" style={{ "--w": (f[i] / mx) * 100 + "%" }}>
                <span className="qp5-sc__ic">
                  <QP5_I n={ic} s={16} />
                </span>
                <span className="qp5-sc__t">{t}</span>
                <input type="range" min="0" max={mx} value={f[i]} onChange={(e) => setF((o) => o.map((y, k) => (k === i ? +e.target.value : y)))} aria-label={`${t}, up to ${mx} points`} />
                <b>
                  {f[i]}
                  <small>/{mx}</small>
                </b>
              </label>
            ))}
          </div>
        </div>
        <div className="qp5-sc__pts">
          {QP5_POINTS.map(([t, d, ic], i) => (
            <div key={t} className={"qp5-sc__pt qp5-sc__pt--" + i}>
              <QP5_I n={ic} s={22} />
              <b>{t}</b>
              <p>{d}</p>
            </div>
          ))}
          <span className="qp5-sc__neq" aria-hidden="true">
            ≠
          </span>
        </div>
        <p className="qp5-disc">
          <QP5_I n="spark" s={14} /> {QP5_SCORE_NOTE} Completing a survey does not add a fixed number of quality points.
        </p>
      </div>
    </K5_Sec>
  );
}

/* ── respondent history demo ─────────────────────────────────────────────────────── */
function QP5_History() {
  const T = QP5_HISTORY.trend;
  const mx = 200,
    w = 520,
    h = 180;
  const pts = T.map((v, i) => [20 + (i / (T.length - 1)) * (w - 40), h - 20 - (v / mx) * (h - 40)]);
  const line = pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join("");
  return (
    <K5_Sec className="qp5-sec qp5-hist" aria-labelledby="qp5-hist-h">
      <div className="container">
        <QP5_Head id="qp5-hist-h" k="Historical participation" h="Evaluated over time," em="not from one response alone." />
        <div className="qp5-hi">
          <div className="qp5-hi__chart qp5-glass">
            <div className="qp5-hi__top">
              <b>Illustrative quality trend</b>
              <span className="qp5-demo">Demo data</span>
            </div>
            <svg viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Illustrative quality score rising from 96 to 153 over twelve months">
              {[50, 100, 150].map((g) => (
                <line key={g} x1="20" x2={w - 20} y1={h - 20 - (g / mx) * (h - 40)} y2={h - 20 - (g / mx) * (h - 40)} className="qp5-hi__grid" />
              ))}
              <path d={line + `L${pts[pts.length - 1][0]} ${h - 20}L20 ${h - 20}Z`} className="qp5-hi__area" />
              <path d={line} className="qp5-hi__line" pathLength="1" />
              {pts.map((p, i) => (
                <circle key={i} cx={p[0]} cy={p[1]} r="3.5" className="qp5-hi__pt" style={{ "--i": i }} />
              ))}
              {QP5_HISTORY.months.map((m, i) => (
                <text key={m} x={pts[i][0]} y={h - 4} textAnchor="middle" className="qp5-hi__m">
                  {m}
                </text>
              ))}
            </svg>
          </div>
          <div className="qp5-hi__log qp5-glass">
            <b>Participation timeline</b>
            <ul>
              {QP5_HISTORY.events.map(([t, s, d], i) => (
                <li key={i} className={"is-" + s} style={{ "--i": i }}>
                  <i aria-hidden="true" />
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ul className="qp5-hi__ind">
            {QP5_HISTORY.indicators.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </div>
        <p className="qp5-disc">
          <QP5_I n="spark" s={14} /> {QP5_HISTORY.note}
        </p>
      </div>
    </K5_Sec>
  );
}

/* ── validation pipeline ─────────────────────────────────────────────────────────── */
function QP5_Pipe() {
  return (
    <K5_Sec className="qp5-sec qp5-dark qp5-pipe" id="qp5-pipe" aria-labelledby="qp5-pipe-h">
      <div className="container">
        <QP5_Head id="qp5-pipe-h" k="Survey quality validation" h="Every response matters." em="So does the quality behind it." />
        <div className="qp5-pp">
          <div className="qp5-pp__tube" aria-hidden="true">
            {Array.from({ length: 7 }).map((_, i) => (
              <i key={i} style={{ "--i": i }} />
            ))}
          </div>
          {QP5_PIPE.map((s, i) => (
            <K5_Rv a="up" d={i} key={s.t} className="qp5-pp__st">
              <span className="qp5-pp__ic">
                <QP5_I n={s.ic} s={24} />
              </span>
              <h3>{s.t}</h3>
              <ul>
                {s.pts.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </K5_Rv>
          ))}
        </div>
        <div className="qp5-out">
          {QP5_OUTCOMES.map(([t, d, c], i) => (
            <K5_Rv a="zoom" d={i} key={t} className="qp5-out__c" style={{ "--c": c }}>
              <b>{t}</b>
              <p>{d}</p>
            </K5_Rv>
          ))}
        </div>
        <p className="qp5-disc">
          <QP5_I n="shield" s={14} /> {QP5_FLAG_NOTE}
        </p>
      </div>
    </K5_Sec>
  );
}

/* ── rewards wallet demo ─────────────────────────────────────────────────────────── */
function QP5_Rewards() {
  return (
    <K5_Sec className="qp5-sec qp5-rew" id="qp5-rewards" aria-labelledby="qp5-rew-h">
      <div className="container qp5-rw">
        <div>
          <QP5_Head id="qp5-rew-h" k="Rewards and redemption" h="Rewarding genuine participation" em="through transparent processes." d="Rewards are released for validated participation, and every redemption claim is reviewed before payment, under each panel's published rules." />
          <ol className="qp5-steps qp5-steps--rw">
            {QP5_REWARDS.map((s, i) => (
              <li key={s} style={{ "--i": i }}>
                <span>{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ol>
        </div>
        <div className="qp5-wallet">
          <div className="qp5-wallet__card">
            <span className="qp5-demo">Demonstration</span>
            <small>Reward balance</small>
            <b>
              <K5_Count to={1200} /> <i>points</i>
            </b>
            <div className="qp5-wallet__bar" aria-hidden="true">
              <i style={{ "--w": "68%" }} />
            </div>
            <small>Example progress towards a redemption threshold</small>
            <span className="qp5-wallet__chip" aria-hidden="true" />
          </div>
          <ul className="qp5-wallet__tx">
            {QP5_WALLET.rows.map(([t, a, s], i) => (
              <li key={i} style={{ "--i": i }}>
                <span>{t}</span>
                <b className={a.startsWith("-") ? "is-out" : ""}>{a}</b>
                <em>{s}</em>
              </li>
            ))}
          </ul>
          <ol className="qp5-wallet__st">
            {QP5_WALLET.status.map((s, i) => (
              <li key={s} className={i < 2 ? "is-done" : i === 2 ? "is-now" : ""}>
                <i />
                {s}
              </li>
            ))}
          </ol>
          <p className="qp5-disc">{QP5_WALLET.note}</p>
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── member dashboards (schematic) ───────────────────────────────────────────────── */
function QP5_Dash() {
  const [d, setD] = ee.useState(0);
  const x = QP5_DASH[d];
  const shot = QP5_SHOTS.find((s) => s.panel === x.k);
  const P = QP5_PANELS.find((p) => p.k === x.k);
  return (
    <K5_Sec className="qp5-sec qp5-dash" aria-labelledby="qp5-dash-h">
      <div className="container">
        <QP5_Head id="qp5-dash-h" k="The member's side" h="See research from a" em="panelist's perspective." />
        <div className="qp5-db__tabs" role="tablist" aria-label="Panel dashboards">
          {QP5_DASH.map((p, i) => (
            <button key={p.k} type="button" role="tab" aria-selected={d === i} className={d === i ? "is-on" : ""} onClick={() => setD(i)}>
              {p.t}
            </button>
          ))}
        </div>
        <div className="qp5-db" style={{ "--c": P.c }} key={x.k}>
          <div className="qp5-db__browser">
            <div className="qp5-db__bar" aria-hidden="true">
              <i />
              <i />
              <i />
              <span>{P.url.replace("https://", "")}</span>
            </div>
            {shot ? (
              <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" />
            ) : (
              <div className="qp5-db__ui" aria-hidden="true">
                <aside>
                  <FRL_Plate k={x.k} h={26} flat />
                  {x.items.map((it, i) => (
                    <span key={it} className={i === 0 ? "is-on" : ""} />
                  ))}
                </aside>
                <main>
                  <span className="qp5-db__h" />
                  <div className="qp5-db__tiles">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="qp5-db__row" />
                  <span className="qp5-db__row" />
                  <span className="qp5-db__row qp5-db__row--s" />
                </main>
              </div>
            )}
          </div>
          <ol className="qp5-db__call">
            {x.items.map((it, i) => (
              <li key={it} style={{ "--i": i }}>
                <span>{i + 1}</span>
                {it}
              </li>
            ))}
          </ol>
        </div>
        <p className="qp5-disc">{shot ? "Screenshot of the member dashboard." : "Schematic illustration of the member dashboard, not a screenshot."}</p>
      </div>
    </K5_Sec>
  );
}

/* ── client reporting demo ───────────────────────────────────────────────────────── */
function QP5_Report() {
  const F = QP5_REPORT.funnel;
  const mx = F[0][1];
  const M = QP5_REPORT.mix;
  let acc = 0;
  const cols = ["#4169E1", "#9AA6C7", "#00BFA6", "#F4B942"];
  return (
    <K5_Sec className="qp5-sec qp5-report" id="qp5-report" aria-labelledby="qp5-rep-h">
      <div className="container">
        <QP5_Head id="qp5-rep-h" k="Client quality reporting" h="Transparent reporting" em="for better decisions." d="Every project closes with a reconciled field report, so the delivered count can be traced back through each stage." />
        <div className="qp5-rp">
          <div className="qp5-rp__fun qp5-glass">
            <div className="qp5-hi__top">
              <b>Fieldwork funnel</b>
              <span className="qp5-demo">Demo data</span>
            </div>
            {F.map(([t, v], i) => (
              <div key={t} className="qp5-rp__lvl" style={{ "--w": (v / mx) * 100 + "%", "--i": i }}>
                <span>{t}</span>
                <b>{v.toLocaleString("en-US")}</b>
              </div>
            ))}
          </div>
          <div className="qp5-rp__mix qp5-glass">
            <div className="qp5-hi__top">
              <b>Outcome mix</b>
              <span className="qp5-demo">Demo data</span>
            </div>
            <svg viewBox="0 0 120 120" role="img" aria-label={M.map((m) => m[0] + " " + m[1] + "%").join(", ")}>
              {M.map(([t, v], i) => {
                const el = <circle key={t} cx="60" cy="60" r="44" pathLength="100" strokeDasharray={`${v} ${100 - v}`} strokeDashoffset={-acc + 25} stroke={cols[i]} className="qp5-rp__seg" />;
                acc += v;
                return el;
              })}
              <text x="60" y="58" textAnchor="middle" className="qp5-rp__v">
                50%
              </text>
              <text x="60" y="72" textAnchor="middle" className="qp5-rp__l">
                completes
              </text>
            </svg>
            <ul>
              {M.map(([t, v], i) => (
                <li key={t}>
                  <i style={{ background: cols[i] }} />
                  {t} <b>{v}%</b>
                </li>
              ))}
            </ul>
          </div>
          <ul className="qp5-rp__cats">
            {QP5_REPORT.cats.map((c, i) => (
              <li key={c} style={{ "--i": i }}>
                <QP5_I n="check" s={13} /> {c}
              </li>
            ))}
          </ul>
        </div>
        <p className="qp5-disc">{QP5_REPORT.note}</p>
      </div>
    </K5_Sec>
  );
}

/* ── privacy flow ────────────────────────────────────────────────────────────────── */
function QP5_Privacy() {
  return (
    <K5_Sec className="qp5-sec qp5-dark qp5-priv" id="qp5-privacy" aria-labelledby="qp5-priv-h">
      <div className="container">
        <QP5_Head id="qp5-priv-h" k="Privacy and security" h="Respecting respondent privacy." em="Protecting research information." />
        <ol className="qp5-flow" aria-label="How information flows">
          {QP5_FLOW.map((t, i) => (
            <li key={t} style={{ "--i": i }}>
              <span>
                <QP5_I n={["user", "layers", "lock", "chart"][i]} s={22} />
              </span>
              {t}
            </li>
          ))}
          <i className="qp5-flow__pkt" aria-hidden="true" />
        </ol>
        <ul className="qp5-pv">
          {QP5_PRIVACY.map(([t, d, ic], i) => (
            <K5_Rv as="li" a="up" d={i % 4} key={t}>
              <QP5_I n={ic} s={20} />
              <b>{t}</b>
              <p>{d}</p>
            </K5_Rv>
          ))}
        </ul>
      </div>
    </K5_Sec>
  );
}

/* ── continuous improvement ring ─────────────────────────────────────────────────── */
function QP5_Ring() {
  const [s, setS] = ee.useState(0);
  const N = QP5_RING.length;
  return (
    <K5_Sec className="qp5-sec qp5-ring" aria-labelledby="qp5-ring-h">
      <div className="container qp5-rg">
        <div>
          <QP5_Head id="qp5-ring-h" k="Continuous improvement" h="Improving quality through" em="continuous evaluation." d="A governance cycle that keeps turning: what we learn on one project changes how the next one is run." />
          <div className="qp5-rg__info" aria-live="polite">
            <span>
              Stage {s + 1} of {N}
            </span>
            <h3>{QP5_RING[s][0]}</h3>
            <p>{QP5_RING[s][1]}</p>
          </div>
        </div>
        <div className="qp5-rg__wheel" style={{ "--r": (-s * 360) / N + "deg" }}>
          <div className="qp5-rg__spin">
            {QP5_RING.map(([t, , ic], i) => (
              <button key={t} type="button" className={"qp5-rg__n" + (i === s ? " is-on" : "")} style={{ "--a": (i * 360) / N + "deg" }} onClick={() => setS(i)} aria-pressed={i === s}>
                <span>
                  <QP5_I n={ic} s={18} />
                  <small>{t}</small>
                </span>
              </button>
            ))}
          </div>
          <div className="qp5-rg__core" aria-hidden="true">
            <QP5_I n="layers" s={30} />
          </div>
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── FAQ ─────────────────────────────────────────────────────────────────────────── */
function QP5_Faq() {
  const [q, setQ] = ee.useState("");
  const [o, setO] = ee.useState(0);
  const L = QP5_FAQ.filter(([a, b]) => !q || (a + " " + b).toLowerCase().includes(q.toLowerCase()));
  return (
    <K5_Sec className="qp5-sec qp5-faq" id="qp5-faq" aria-labelledby="qp5-faq-h">
      <div className="container">
        <QP5_Head id="qp5-faq-h" k="Questions" h="Frequently asked questions" em="about quality and recruitment." />
        <label className="qp5-faq__s">
          <QP5_I n="search" s={18} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search the questions" aria-label="Search the questions" />
          <span>{L.length} of {QP5_FAQ.length}</span>
        </label>
        <div className="qp5-faq__list">
          {L.map(([a, b], i) => (
            <div key={a} className={"qp5-faq__i" + (o === i ? " is-open" : "")}>
              <h3>
                <button type="button" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>
                  {a}
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div hidden={o !== i}>
                <p>{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </K5_Sec>
  );
}

/* ── CTA + PDF ───────────────────────────────────────────────────────────────────── */
function QP5_Get({ onGet }) {
  return (
    <section className="qp5-get" aria-labelledby="qp5-get-h">
      <div className="container qp5-get__in">
        <div className="qp5-get__book" aria-hidden="true" {...k5Tilt(10)}>
          <span className="qp5-get__spine" />
          <span className="qp5-get__front">
            <img src={FRK_EMBLEM_SM} alt="" className="qp5-get__wm" />
            <QP5_I n="shield" s={44} />
            <b>Quality process</b>
            <small>Market research</small>
            <em>
              <i />
              <i />
              <i />
            </em>
          </span>
        </div>
        <div>
          <span className="qp5-kick">Take it with you</span>
          <h2 id="qp5-get-h">Confidence in research begins with confidence in your sample.</h2>
          <p>Get the whole market research quality process as a branded PDF: the pillars, the 12-stage journey, all 18 checkpoints, the illustrative scoring model, validation, rewards, reporting, privacy and the FAQ.</p>
          <div className="qp5-hero__cta">
            <button type="button" className="qp5-btn qp5-btn--glow" onClick={onGet}>
              <QP5_I n="down" s={16} /> Download the quality process PDF
            </button>
            <HmLink to="/lets-talk" className="qp5-btn qp5-btn--ghost">
              Discuss your research requirements
            </HmLink>
          </div>
          <small className="qp5-get__note">You'll be asked for your details for each download.</small>
        </div>
      </div>
    </section>
  );
}

function QP5_Page() {
  const [gate, setGate] = ee.useState(false);
  dmMeta(QP5_PATH, "Market Research Quality Process | Respondent Recruitment & Validation | Frequent Research", "How Frequent Research recruits, profiles and validates respondents across Turn2Opinion, MyFrequentRewards and MyHealthOpinions: 12-stage journey, 18 quality checkpoints, scoring, validation and reporting.");
  ee.useEffect(() => window.scrollTo(0, 0), []);
  const get = () => setGate(true);
  return (
    <div className="qp5">
      <QP5_Hero onGet={get} />
      <QP5_Nav />
      <QP5_Pillars />
      <QP5_Panels />
      <QP5_Journey />
      <QP5_Aud />
      <QP5_Shield />
      <QP5_Score />
      <QP5_History />
      <QP5_Pipe />
      <QP5_Rewards />
      <QP5_Dash />
      <QP5_Report />
      <QP5_Privacy />
      <QP5_Ring />
      <QP5_Faq />
      <QP5_Get onGet={get} />
      {gate && (
        <FRG_Gate
          world="market-research"
          kind="Quality process"
          title="Market research quality process"
          sub="Turn2Opinion · MyFrequentRewards · MyHealthOpinions"
          icon="shield"
          resource={{ type: "quality-process", key: "quality-market-research", title: "Market research quality process" }}
          extra={{ doc: "quality-market-research" }}
          onUnlock={(lead) => qp5Book(lead)}
          onClose={() => setGate(false)}
        />
      )}
    </div>
  );
}

export { QP5_I, QP5_Page, qp5Band, qp5Ic };
