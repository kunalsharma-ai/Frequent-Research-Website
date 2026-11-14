/*
 * Build 65 shared kit. Prefix K5_ (components) / k5 (helpers). Styles: src/styles/kit65.css (k5-).
 *
 *  k5Since / K5_Since      time since formal establishment (26 September 2017), as years · months · days · h · m · s
 *  K5_Countdown            animated "years we have completed" counter + countdown to the next anniversary
 *                          (variant "hero" = the big Our Journey board, "home" = the compact home-page band)
 *  K5_Rv                   scroll reveal (one shared IntersectionObserver for the whole page)
 *  K5_Count                number that counts up when seen
 *  K5_Tilt                 pointer-driven 3D tilt (CSS variables only, no React re-render)
 *  K5_Words                headline revealed word by word, with highlighted words in gradient ink
 *  K5_Field                light canvas particle field (drawn only while visible, 30 fps, DPR ≤ 1.5)
 *  K5_VideoBtn             the red "Watch our videos" button at the top of every page → YouTube channel
 *  k5Sfx / K5_Sfx          interface sounds (theme switch, WhatsApp, Rate & Review, panels, Let's Talk), Web Audio only,
 *                          obeys the footer Sound on/off switch (localStorage fr-sound)
 *
 * Motion rules (same as build 64): content is visible without JavaScript and for reduced-motion visitors; entrance
 * states are applied only once html.k5-live is set, loops are transform/opacity only and are paused off screen by
 * Motion.jsx.
 */
import * as ee from 'react';
import { useLocation } from 'react-router-dom';
import { PORTALS } from '../../app/data/site.jsx';
import { HmLink } from '../../app/shared/HomeShared.jsx';
import { panelLogo } from '../../app/shared/PanelMark.jsx';
import { FRK_I, FRK_P, frkReduce } from './FrKit.jsx';
import { frsCtxGet, frsOn } from './Floaters.jsx';
import { VD21_Button } from './Video21.jsx';
import { SP22_Intro } from './Celebrate22.jsx';

const K5_EST = { y: 2017, m: 8, d: 26 }; /* incorporation: 26 September 2017 (month is 0-based) */
const K5_ROOTS = 2015;
const K5_YT = "https://www.youtube.com/@frequentresearch";
const K5_SAMPLEDGE = "https://www.sampledge.com/";
const k5Reduce = () => frkReduce();

(function k5Boot() {
  try {
    if (typeof document === "undefined") return;
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rm && !navigator.webdriver) document.documentElement.classList.add("k5-live");
    else if (!rm && /[?&]k5live=1/.test(location.search + location.hash)) document.documentElement.classList.add("k5-live");
  } catch (e) {}
})();

/* ── time since establishment ─────────────────────────────────────────────────────────── */
function k5Since(now = new Date()) {
  const s = new Date(K5_EST.y, K5_EST.m, K5_EST.d, 0, 0, 0);
  let y = now.getFullYear() - s.getFullYear();
  let m = now.getMonth() - s.getMonth();
  let d = now.getDate() - s.getDate();
  if (d < 0) {
    m -= 1;
    d += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
  }
  if (m < 0) {
    y -= 1;
    m += 12;
  }
  const next = new Date(now.getFullYear(), K5_EST.m, K5_EST.d);
  if (next <= now) next.setFullYear(next.getFullYear() + 1);
  const prev = new Date(next.getFullYear() - 1, K5_EST.m, K5_EST.d);
  const left = next - now;
  return {
    y,
    m,
    d,
    h: now.getHours(),
    mi: now.getMinutes(),
    se: now.getSeconds(),
    days: Math.floor((now - s) / 864e5),
    nextN: next.getFullYear() - K5_EST.y,
    nextDate: next,
    left: { d: Math.floor(left / 864e5), h: Math.floor((left / 36e5) % 24), mi: Math.floor((left / 6e4) % 60), se: Math.floor((left / 1e3) % 60) },
    pct: (now - prev) / (next - prev),
    rootsY: now.getFullYear() - K5_ROOTS,
  };
}
const k5Ord = (n) => n + (["th", "st", "nd", "rd"][(n % 100 >> 3) ^ 1 && n % 10] || "th");
function k5UseClock(ms = 1000) {
  const [t, setT] = ee.useState(() => new Date());
  ee.useEffect(() => {
    let id = 0;
    const tick = () => {
      if (!document.hidden) setT(new Date());
      id = setTimeout(tick, ms - (Date.now() % ms) + 5);
    };
    id = setTimeout(tick, ms - (Date.now() % ms) + 5);
    return () => clearTimeout(id);
  }, [ms]);
  return t;
}

/* one digit cell that flips when its value changes */
function K5_Digit({ v }) {
  return (
    <span className="k5-dg">
      <b key={v}>{v}</b>
    </span>
  );
}
function K5_Unit({ n, label, pad = 2, tone }) {
  const s = String(n).padStart(pad, "0");
  return (
    <span className={"k5-unit" + (tone ? " k5-unit--" + tone : "")}>
      <span className="k5-unit__n" aria-hidden="true">
        {s.split("").map((c, i) => (
          <K5_Digit key={i} v={c} />
        ))}
      </span>
      <span className="k5-unit__l">{label}</span>
    </span>
  );
}

function K5_Countdown({ variant = "home" }) {
  const now = k5UseClock(1000);
  const t = k5Since(now);
  const big = variant === "hero";
  const r = 54,
    C = 2 * Math.PI * r;
  const label = `${t.y} years, ${t.m} months and ${t.d} days since Frequent Research was formally established on 26 September 2017.`;
  return (
    <div className={"k5-cd k5-cd--" + variant} role="group" aria-label="Years we have completed">
      <span className="frk-sr">{label}</span>
      <div className="k5-cd__main" aria-hidden="true">
        <div className="k5-cd__badge">
          <svg viewBox="0 0 128 128" className="k5-cd__ring">
            <defs>
              <linearGradient id={"k5cdg-" + variant} x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#FFD166" />
                <stop offset=".5" stopColor="#FF5DA2" />
                <stop offset="1" stopColor="#38BDF8" />
              </linearGradient>
            </defs>
            <circle cx="64" cy="64" r={r} className="k5-cd__track" />
            <circle cx="64" cy="64" r={r} className="k5-cd__arc" stroke={`url(#k5cdg-${variant})`} strokeDasharray={C} strokeDashoffset={C * (1 - t.pct)} />
          </svg>
          <span className="k5-cd__yrs">
            <b>{t.y}</b>
            <small>years</small>
          </span>
          <i className="k5-cd__spark" />
          <i className="k5-cd__spark k5-cd__spark--2" />
          <i className="k5-cd__spark k5-cd__spark--3" />
        </div>
        <div className="k5-cd__units">
          <K5_Unit n={t.y} label="Years" tone="a" />
          <K5_Unit n={t.m} label="Months" tone="b" />
          <K5_Unit n={t.d} label="Days" tone="c" />
          {/* build 82.3 (Kunal): hours and minutes on the home clock too */}
          <K5_Unit n={t.h} label="Hours" tone="d" />
          <K5_Unit n={t.mi} label="Minutes" tone="e" />
          <K5_Unit n={t.se} label="Seconds" tone="f" />
        </div>
      </div>
      <div className="k5-cd__foot">
        <span className="k5-cd__chip">
          <FRK_I n="calendar" s={14} /> Est. 26 Sep 2017 · roots in {K5_ROOTS}
        </span>
        <span className="k5-cd__chip k5-cd__chip--next">
          <FRK_I n="trophy" s={14} /> {k5Ord(t.nextN)} anniversary in <b>{t.left.d}</b> days
          {big ? ` ${String(t.left.h).padStart(2, "0")}h ${String(t.left.mi).padStart(2, "0")}m ${String(t.left.se).padStart(2, "0")}s` : ""}
        </span>
        <span className="k5-cd__chip k5-cd__chip--days">
          <FRK_I n="clock" s={14} /> <b>{t.days.toLocaleString("en-IN")}</b> days of delivery
        </span>
      </div>
    </div>
  );
}

/* home band: the counter with a short line about the four teams */
function K5_HomeYears() {
  return (
    <section className="k5-hy" aria-labelledby="k5-hy-h">
      <div className="k5-hy__bg" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="container k5-hy__in">
        <div className="k5-hy__copy">
          <span className="k5-eyebrow">
            <FRK_I n="trophy" s={14} /> Our milestone clock
          </span>
          <h2 id="k5-hy-h">
            Years of <em>trust</em>, counting <span className="k5-ink">every second.</span>
          </h2>
          <p>From research fieldwork in 2015 to four expert teams today — Market Research, Digital Marketing, IT &amp; Development and Accounts &amp; Finance — under one roof.</p>
          <HmLink to="/our-journey" className="k5-btn k5-btn--glow">
            Explore our journey <FRK_I n="arrow" s={16} />
          </HmLink>
        </div>
        <K5_Countdown variant="home" />
      </div>
    </section>
  );
}

/* ── reveal on scroll: one shared observer ───────────────────────────────────────────── */
const K5_OBS = { io: null, cb: new WeakMap() };
function k5Observe(el, cb, margin = "0px 0px -8% 0px") {
  if (!el) return () => {};
  if (typeof IntersectionObserver === "undefined") {
    cb();
    return () => {};
  }
  if (!K5_OBS.io)
    K5_OBS.io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            const f = K5_OBS.cb.get(e.target);
            K5_OBS.io.unobserve(e.target);
            K5_OBS.cb.delete(e.target);
            f && f();
          }
        }),
      { rootMargin: margin, threshold: 0.12 }
    );
  K5_OBS.cb.set(el, cb);
  K5_OBS.io.observe(el);
  return () => {
    K5_OBS.io && K5_OBS.io.unobserve(el);
    K5_OBS.cb.delete(el);
  };
}
function k5UseIn() {
  const ref = ee.useRef(null);
  const [v, setV] = ee.useState(false);
  ee.useEffect(() => k5Observe(ref.current, () => setV(true)), []);
  return [ref, v];
}
/* <K5_Rv a="up|left|right|zoom|flip|blur|tilt" d={index}> — class-only, no state per element */
function K5_Rv({ as = "div", a = "up", d = 0, className = "", style, children, ...rest }) {
  const ref = ee.useRef(null);
  ee.useEffect(() => k5Observe(ref.current, () => ref.current && ref.current.classList.add("is-in")), []);
  return ee.createElement(as, { ref, className: `k5-rv k5-rv--${a} ${className}`, style: { "--d": d, ...(style || {}) }, ...rest }, children);
}
/* section wrapper that marks itself .is-in (children use CSS for their own entrances) */
function K5_Sec({ as = "section", className = "", children, ...rest }) {
  const ref = ee.useRef(null);
  ee.useEffect(() => k5Observe(ref.current, () => ref.current && ref.current.classList.add("is-in"), "0px 0px -12% 0px"), []);
  return ee.createElement(as, { ref, className: "k5-sec " + className, ...rest }, children);
}

function K5_Count({ to, dur = 1400, suffix = "", prefix = "", fmt }) {
  const ref = ee.useRef(null);
  const final = prefix + (fmt ? fmt(to) : Number(to).toLocaleString("en-IN")) + suffix;
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || k5Reduce()) return undefined;
    /* keep the final number's width while counting, so the text around it does not re-wrap on every frame */
    const w = el.getBoundingClientRect().width;
    if (w) {
      el.style.display = "inline-block";
      el.style.minWidth = Math.ceil(w) + "px";
    }
    let raf = 0;
    const off = k5Observe(el, () => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        const n = Math.round(to * e);
        el.textContent = prefix + (fmt ? fmt(n) : n.toLocaleString("en-IN")) + suffix;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    return () => (off(), cancelAnimationFrame(raf));
  }, [to]);
  return <span ref={ref}>{final}</span>;
}

/* pointer tilt: sets --rx/--ry/--mx/--my on the element; reset on leave */
function k5Tilt(max = 10) {
  return {
    onPointerMove: (e) => {
      if (e.pointerType !== "mouse") return;
      const el = e.currentTarget,
        r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5,
        y = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", (x * max).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-y * max).toFixed(2) + "deg");
      el.style.setProperty("--mx", ((x + 0.5) * 100).toFixed(1) + "%");
      el.style.setProperty("--my", ((y + 0.5) * 100).toFixed(1) + "%");
    },
    onPointerLeave: (e) => {
      const el = e.currentTarget;
      el.style.setProperty("--ry", "0deg");
      el.style.setProperty("--rx", "0deg");
    },
  };
}
function K5_Tilt({ as = "div", max = 10, className = "", children, ...rest }) {
  return ee.createElement(as, { className: "k5-tilt " + className, ...k5Tilt(max), ...rest }, children);
}

/* headline: words rise in; words wrapped in *stars* get the gradient ink */
function K5_Words({ text, as = "h1", className = "", id }) {
  const parts = String(text).split(/(\*[^*]+\*)/).filter(Boolean);
  let k = 0;
  return ee.createElement(
    as,
    { className: "k5-words " + className, id },
    parts.map((p, i) => {
      const hi = /^\*.*\*$/.test(p);
      const ws = (hi ? p.slice(1, -1) : p).split(/(\s+)/);
      return ws.map((w, j) =>
        /^\s+$/.test(w) || !w ? (
          w
        ) : (
          <span key={i + "-" + j} className={"k5-w" + (hi ? " k5-ink" : "")} style={{ "--w": k++ }}>
            <span>{w}</span>
          </span>
        )
      );
    })
  );
}

/* light particle field — dots that drift and link when close. Drawn only while on screen and not idle. */
function K5_Field({ colors = ["#7CF3E1", "#A78BFA", "#FFD166"], n = 46, link = 110, className = "" }) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const cv = ref.current;
    if (!cv || k5Reduce()) return undefined;
    const ctx = cv.getContext("2d");
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    let W = 0,
      H = 0,
      raf = 0,
      vis = false,
      last = 0;
    const pts = [];
    const size = () => {
      const r = cv.getBoundingClientRect();
      W = r.width;
      H = r.height;
      cv.width = Math.max(1, W * dpr);
      cv.height = Math.max(1, H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    size();
    const cnt = W < 600 ? Math.round(n * 0.55) : n;
    for (let i = 0; i < cnt; i++) pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, r: 1 + Math.random() * 2.2, c: colors[i % colors.length] });
    const draw = (t) => {
      raf = 0;
      if (!vis) return;
      if (t - last > 32 && !window.__frStill) {
        last = t;
        ctx.clearRect(0, 0, W, H);
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
        }
        ctx.lineWidth = 0.6;
        for (let i = 0; i < pts.length; i++)
          for (let j = i + 1; j < pts.length; j++) {
            const a = pts[i],
              b = pts[j],
              dx = a.x - b.x,
              dy = a.y - b.y,
              d2 = dx * dx + dy * dy;
            if (d2 < link * link) {
              ctx.globalAlpha = 0.28 * (1 - Math.sqrt(d2) / link);
              ctx.strokeStyle = a.c;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        for (const p of pts) {
          ctx.globalAlpha = 0.85;
          ctx.fillStyle = p.c;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 6.283);
          ctx.fill();
        }
      }
      raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      vis = e.isIntersecting && !document.hidden;
      if (vis && !raf) raf = requestAnimationFrame(draw);
    });
    io.observe(cv);
    const ro = new ResizeObserver(size);
    ro.observe(cv);
    return () => (io.disconnect(), ro.disconnect(), cancelAnimationFrame(raf), (vis = false));
  }, []);
  return <canvas ref={ref} className={"k5-field " + className} aria-hidden="true" />;
}

/* inline icon set for the build-65 pages (stroke icons, 24 px grid) */
const K5_P = {
  mr: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4M8 12l2 2 4-4",
  dm: "M4 13V9l11-5v16L4 15zM15 8a4 4 0 0 1 0 8M7 15l1.5 5h3L10 15",
  it: "M3 5h18v11H3zM8 20h8M12 16v4M9 9l-2 2 2 2M15 9l2 2-2 2",
  af: "M4 20h16M6 20V10M10 20V6M14 20v-8M18 20V4M4 8l5-4 4 3 7-5",
  rocket: "M12 15l-3-3c1-4 4-8 9-9-1 5-5 8-9 9M9 12l-4 1 2-4M12 15l-1 4 4-2M7 17l-3 3",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  compass: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM15.5 8.5l-2 5-5 2 2-5z",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2 2 4-4",
  bolt: "M13 2L4 14h7l-1 8 9-12h-7z",
  globe: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3.5 6",
  spark: "M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5M3 17l9 5 9-5",
  chart: "M4 20V4M4 20h16M8 16l4-5 3 3 5-7",
  coin: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM9 9.5c0-1 1.3-1.8 3-1.8s3 .8 3 1.8-1 1.5-3 2-3 1-3 2 1.3 1.8 3 1.8 3-.8 3-1.8M12 6.5v11",
  cpu: "M7 7h10v10H7zM10 10h4v4h-4zM9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4",
  target: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2",
  handshake: "M3 12l4-4 4 2 3-2 4 1 3 3M7 8l-4 4 5 5 2-1 2 2 2-1 2 1 3-4M11 10l-2 3 2 1 3-3",
  leaf: "M5 19c0-8 6-14 15-14-1 9-7 15-15 14zM5 19l7-7",
  play: "M8 5l11 7-11 7z",
  pin: "M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21zM12 7a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5z",
  star: "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z",
  check: "M5 12.5l4.2 4.2L19 7",
  arrow: "M5 12h14M13 6l6 6-6 6",
  book: "M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19V5M8 7h7",
  doc: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  camera: "M4 8h3l2-3h6l2 3h3v11H4zM12 10a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7z",
  gift: "M4 10h16v4H4zM6 14h12v7H6zM12 10v11M12 10c-2 0-4-1-4-3s3-2 4 3c1-5 4-5 4-3s-2 3-4 3",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  sun: "M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM12 1v3M12 20v3M1 12h3M20 12h3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  mic: "M12 3a3 3 0 0 1 3 3v6a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  grad: "M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6",
  clock: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  search: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4",
  kanban: "M4 4h16v16H4zM9 4v16M15 4v16M6 7h1M11 7h2M17 7h1M6 10h1M11 10h2",
  funnel: "M3 4h18l-7 8v6l-4 2v-8z",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3",
  id: "M3 5h18v14H3zM8 10a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM5 17c.5-1.5 1.6-2.3 3-2.3s2.5.8 3 2.3M14 9h4M14 13h4",
  bid: "M14 3l7 7-3 3-7-7zM4 20l7-7M11 6l7 7M3 21h8",
  wand: "M15 4V2M15 10V8M11 6H9M21 6h-2M17.8 3.2l-1.4 1.4M17.8 8.8l-1.4-1.4M3 21l11-11",
};
function K5_I({ n, s = 22, className = "", sw = 1.8 }) {
  const d = K5_P[n] || FRK_P[n] || K5_P.spark;
  return (
    <svg className={"k5-i " + className} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}

/* ── red video button (every page) ────────────────────────────────────────────────────── */
function K5_VideoBtn() {
  return <VD21_Button />;
  const [top, setTop] = ee.useState(76);
  const [dock, setDock] = ee.useState(false);
  const loc = typeof useLocation === "function" ? useLocation() : { pathname: "" };
  ee.useEffect(() => {
    const h = document.querySelector(".header");
    const fit = () => setTop(h ? h.offsetHeight + 14 : 76);
    fit();
    let raf = 0;
    const sc = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setDock(window.scrollY > 520);
      });
    };
    window.addEventListener("scroll", sc, { passive: true });
    window.addEventListener("resize", fit);
    return () => (window.removeEventListener("scroll", sc), window.removeEventListener("resize", fit));
  }, [loc.pathname]);
  return (
    <>
      <a className="k5-vb" style={{ top }} href={K5_YT} target="_blank" rel="noopener noreferrer" data-sfx="video" aria-label="Watch our videos on the Frequent Research YouTube channel (opens in a new tab)">
        <span className="k5-vb__orb" aria-hidden="true">
          <i className="k5-vb__ring" />
          <i className="k5-vb__ring k5-vb__ring--2" />
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
          </svg>
        </span>
        <span className="k5-vb__txt" aria-hidden="true">
          <b>Watch our story</b>
          <small>
            <span className="k5-vb__eq">
              <i />
              <i />
              <i />
              <i />
            </span>
            Videos on YouTube
          </small>
        </span>
      </a>
      <a className={"k5-vb-mini" + (dock ? " is-on" : "")} href={K5_YT} target="_blank" rel="noopener noreferrer" data-sfx="video" tabIndex={dock ? 0 : -1} aria-hidden={!dock} aria-label="Watch our videos on YouTube (opens in a new tab)">
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <path d="M8 5.5v13l10.5-6.5z" fill="currentColor" />
        </svg>
        <span>Videos</span>
      </a>
    </>
  );
}

/* ── sounds ───────────────────────────────────────────────────────────────────────────── */
function k5Tone(c, out, t, f, dur, vol, type = "sine", glide) {
  const o = c.createOscillator(),
    g = c.createGain();
  o.type = type;
  o.frequency.setValueAtTime(f, t);
  if (glide) o.frequency.exponentialRampToValueAtTime(glide, t + dur * 0.8);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + 0.012);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g).connect(out);
  o.start(t);
  o.stop(t + dur + 0.05);
}
const K5_SFX_LAST = {};
function k5Sfx(kind) {
  try {
    if (!frsOn()) return;
    const now = performance.now();
    if (K5_SFX_LAST[kind] && now - K5_SFX_LAST[kind] < 250) return;
    K5_SFX_LAST[kind] = now;
    const c = frsCtxGet();
    if (!c) return;
    const go = () => {
      const t = c.currentTime + 0.02;
      const m = c.createGain();
      m.gain.value = 0.07;
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 7000;
      m.connect(lp).connect(c.destination);
      switch (kind) {
        case "dark": /* night: a soft descending glass glissando + low hum */
          [1568, 1319, 1047, 784].forEach((f, i) => k5Tone(c, m, t + i * 0.07, f, 0.5, 0.5));
          k5Tone(c, m, t + 0.05, 196, 0.9, 0.35, "triangle");
          break;
        case "light": /* day: rising sparkle */
          [784, 988, 1175, 1568, 2093].forEach((f, i) => k5Tone(c, m, t + i * 0.055, f, 0.45, 0.45));
          break;
        case "whatsapp": /* bubble pop */
          k5Tone(c, m, t, 420, 0.16, 0.9, "sine", 980);
          k5Tone(c, m, t + 0.09, 1320, 0.18, 0.35);
          break;
        case "review": /* star twinkle */
          [1760, 2217, 2637].forEach((f, i) => k5Tone(c, m, t + i * 0.06, f, 0.35, 0.45, "triangle"));
          break;
        case "panel": /* coin */
          k5Tone(c, m, t, 988, 0.09, 0.6, "square");
          k5Tone(c, m, t + 0.08, 1319, 0.42, 0.5, "square");
          break;
        case "talk": /* warm chord */
          [523.3, 659.3, 784, 1046.5].forEach((f, i) => k5Tone(c, m, t + i * 0.035, f, 0.9, 0.32, "triangle"));
          break;
        case "flip": /* card turn: a short swish and a soft landing tick */
          k5Tone(c, m, t, 900, 0.12, 0.35, "triangle", 300);
          k5Tone(c, m, t + 0.11, 1480, 0.08, 0.3);
          break;
        case "video": /* "tape start" whoosh up */
          k5Tone(c, m, t, 220, 0.35, 0.5, "sawtooth", 880);
          k5Tone(c, m, t + 0.2, 1046.5, 0.4, 0.3);
          break;
        case "d79-tick": /* build 79 home hero: a light glass tap */
          k5Tone(c, m, t, 1760, 0.06, 0.3, "sine", 2349);
          break;
        case "d79-go": /* build 79 home hero: rising two-note lift */
          k5Tone(c, m, t, 659.3, 0.18, 0.4, "triangle", 988);
          k5Tone(c, m, t + 0.1, 1318.5, 0.3, 0.32);
          break;
        default: /* soft tick */
          k5Tone(c, m, t, 1200, 0.08, 0.35);
      }
    };
    if (c.state === "running") go();
    else c.resume().then(go).catch(() => {});
  } catch (e) {}
}
/* one delegated listener for every sound trigger, including base components we have no source for */
const K5_SFX_MAP = [
  ["[data-sfx]", (el) => el.getAttribute("data-sfx")],
  [".fw, .frd__i--wa, a[href*='wa.me/'], a[href*='api.whatsapp.com']", () => "whatsapp"],
  [".rv-fab, .rv-toast button, [data-review-open]", () => "review"],
  [".fe-switch button, .fe-join, .fe-panels a, .fe-more", () => "panel"],
  ["a[href$='/lets-talk'], a[href*='/lets-talk?'], a[href*='#/lets-talk'], .frd__i--go", () => "talk"],
];
function K5_Sfx() {
  ee.useEffect(() => {
    const on = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      for (const [sel, kind] of K5_SFX_MAP) {
        const el = t.closest(sel);
        if (el) {
          k5Sfx(kind(el));
          return;
        }
      }
    };
    document.addEventListener("click", on, true);
    return () => document.removeEventListener("click", on, true);
  }, []);
  return null;
}
/* build 65: a click on any panel logo or on the Sampledge logo opens that brand's website, wherever the logo sits
   (menus, footer, home, portals, compiled base pages included). Text next to a logo keeps its own link. */
const K5_LOGO_SEL = "img.mega__logo, .footer__panel img, .fe-panels__logo img, .drawer__portal img, img[alt$=' logo'], .frk-sam";
function k5LogoUrl(el) {
  if (el.closest(".frk-sam")) return K5_SAMPLEDGE;
  const ps = Array.isArray(PORTALS) ? PORTALS : [];
  const img = el.closest("img");
  if (!img) return null;
  const src = img.getAttribute("src") || "";
  const alt = img.getAttribute("alt") || "";
  const host = (img.closest("a, [aria-label]") || img).getAttribute("aria-label") || "";
  const p = ps.find((x) => (src && src === panelLogo(x)) || alt.indexOf(x.name) === 0 || host === x.name);
  if (p) return p.url;
  if (/^sampledge/i.test(alt)) return K5_SAMPLEDGE;
  return null;
}
function K5_LogoLinks() {
  ee.useEffect(() => {
    const on = (e) => {
      const t = e.target;
      if (!t || !t.closest || e.button > 0) return;
      const el = t.closest(K5_LOGO_SEL);
      if (!el) return;
      const url = k5LogoUrl(el);
      if (!url) return;
      const a = el.closest("a");
      if (a && a.href && a.href.indexOf(url.replace(/\/$/, "")) === 0) return; /* already links there */
      e.preventDefault();
      e.stopPropagation();
      window.open(url, "_blank", "noopener");
    };
    document.addEventListener("click", on, true);
    return () => document.removeEventListener("click", on, true);
  }, []);
  return null;
}
/* build 65: accessibility pass for markup from older builds. Icons with no label are hidden from screen readers,
   charts get a role and a label, and any image that still lacks alt gets one from its file name. */
const K5_CHART_RE = /(gauge|trend|donut|chart|spark|ring|meter|graph)/i;
function k5Human(s) {
  return String(s || "").replace(/\.[a-z0-9]+(\?.*)?$/i, "").split("/").pop().replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()).trim();
}
function k5A11yPass(root) {
  root.querySelectorAll("svg:not([aria-hidden]):not([aria-label]):not([aria-labelledby]):not([role])").forEach((s) => {
    if (s.querySelector("title")) return;
    const host = s.parentElement && String(s.parentElement.className || "");
    const m = host.match(K5_CHART_RE);
    if (m && s.getBoundingClientRect().width > 40) {
      const card = s.closest("figure,article,section,div");
      const h = card && card.querySelector("h2,h3,h4,b,strong,figcaption");
      s.setAttribute("role", "img");
      s.setAttribute("aria-label", (h && h.textContent.trim().slice(0, 80)) || k5Human(m[1]) + " chart");
    } else {
      s.setAttribute("aria-hidden", "true");
      s.setAttribute("focusable", "false");
    }
  });
  root.querySelectorAll("img:not([alt])").forEach((i) => i.setAttribute("alt", k5Human(i.getAttribute("src")) || ""));
}
function K5_A11y() {
  ee.useEffect(() => {
    let t = 0;
    const idle = window.requestIdleCallback || ((f) => setTimeout(f, 200));
    const run = () => { t = 0; idle(() => k5A11yPass(document.body)); };
    const mo = new MutationObserver(() => { if (!t) t = setTimeout(run, 400); });
    run();
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); clearTimeout(t); };
  }, []);
  return null;
}
function K5_Globals() {
  return (
    <>
      <K5_Sfx />
      <K5_LogoLinks />
      <K5_A11y />
      <K5_VideoBtn />
      <SP22_Intro />
    </>
  );
}

export { K5_Count, K5_Countdown, K5_Field, K5_Globals, K5_HomeYears, K5_I, K5_P, K5_Rv, K5_Sec, K5_Tilt, K5_Words, K5_YT, k5Observe, k5Reduce, k5Sfx, k5Tilt, k5UseIn };
