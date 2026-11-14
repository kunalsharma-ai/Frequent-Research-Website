/*
 * Build 79, new design: small motion helpers shared by the new home page and the platform pages.
 *   R            reveal on scroll (one shared IntersectionObserver; CSS in d79.css: .d79-r / .is-in)
 *   Count        number that counts up when it comes into view
 *   Magnet       button that leans towards the pointer
 *   Tilt         card that tilts in 3D under the pointer, with a moving glare
 *   Marquee      endless sideways strip (CSS animation, pauses on hover and off screen)
 *   Rotator      words that flip one after another (each word is its own text, so the super admin can change it)
 *   Stage        the 3D scene of a page: a still picture first, the live three.js scene on desktops once the visitor
 *                starts to use the page (Scene3D.js is a separate download)
 *   d79Sfx       the interface sounds of each world (obeys the footer's Sound on/off switch, Kit65 k5Sfx)
 * Phones and "reduce motion" get the calm version: entrances play once, nothing loops (html.d79-calm).
 */
import * as ee from 'react';
import { k5Sfx } from '../components/site/Kit65.jsx';

export const d79Calm = () => {
  try {
    /* build 79.2 (Kunal, 10 Nov: "give me actual moving animation in all hero pages"): only "reduce motion" calms the
       heroes now; phones and the home page's fast first screen get the full animation once the site has started */
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
};
export const d79Sfx = (kind) => k5Sfx("d79-" + kind);

/* ---- reveal on scroll ---- */
let IO = null;
const seen = new WeakMap();
function io() {
  if (IO || typeof window === "undefined" || !("IntersectionObserver" in window)) return IO;
  IO = new IntersectionObserver(
    (es) => es.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      const f = seen.get(e.target);
      f && f();
      IO.unobserve(e.target);
    }),
    { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
  );
  return IO;
}
export function useIn(onIn) {
  const ref = ee.useRef(null);
  const [inView, set] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current, o = io();
    if (!el) return undefined;
    if (!o) { el.classList.add("is-in"); set(true); onIn && onIn(); return undefined; }
    seen.set(el, () => { set(true); onIn && onIn(); });
    o.observe(el);
    return () => o.unobserve(el);
  }, []);
  return [ref, inView];
}
export function R({ as = "div", className = "", d = 0, fx = "up", children, ...rest }) {
  const [ref] = useIn();
  return ee.createElement(as, { ref, className: `d79-r d79-r--${fx} ${className}`, style: d ? { "--d": d + "ms", ...(rest.style || {}) } : rest.style, ...rest }, children);
}

/* ---- numbers ---- */
export function Count({ value, suffix = "", prefix = "", dur = 1800 }) {
  // shows the real number in the page's HTML (search engines, the ready-made first screen); counts up from 0 when it
  // comes into view
  const [n, setN] = ee.useState(value);
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || d79Calm() || !("IntersectionObserver" in window)) return undefined;
    let raf = 0, done = false;
    const o = new IntersectionObserver(([e]) => {
      if (done) return;
      if (!e.isIntersecting) return setN(0);
      done = true; o.disconnect();
      const t0 = performance.now();
      const step = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        setN(Math.round(value * (1 - Math.pow(1 - k, 4))));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    });
    o.observe(el);
    return () => (o.disconnect(), cancelAnimationFrame(raf));
  }, [value]);
  return (
    <span ref={ref} className="d79-count">
      {prefix}
      {value >= 1900 && value <= 2100 ? n : n.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

/* ---- pointer effects (desktop mice only) ---- */
const fine = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
export function useMagnet(strength = 0.28) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || !fine() || d79Calm()) return undefined;
    const mv = (e) => {
      const r = el.getBoundingClientRect();
      el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * strength}px, ${(e.clientY - r.top - r.height / 2) * strength}px)`;
    };
    const out = () => (el.style.transform = "");
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", out);
    return () => (el.removeEventListener("pointermove", mv), el.removeEventListener("pointerleave", out));
  }, []);
  return ref;
}
export function Magnet({ as: As = "a", className = "", sfx, children, ...rest }) {
  const ref = useMagnet();
  return (
    <As ref={ref} className={"d79-magnet " + className} data-sfx={sfx ? "d79-" + sfx : undefined} {...rest}>
      <span className="d79-magnet__in">{children}</span>
    </As>
  );
}
export function useTilt(max = 10) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || !fine() || d79Calm()) return undefined;
    let raf = 0;
    const mv = (e) => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--rx", ((0.5 - y) * max).toFixed(2) + "deg");
        el.style.setProperty("--ry", ((x - 0.5) * max).toFixed(2) + "deg");
        el.style.setProperty("--gx", (x * 100).toFixed(1) + "%");
        el.style.setProperty("--gy", (y * 100).toFixed(1) + "%");
      });
    };
    const out = () => { cancelAnimationFrame(raf); el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); };
    el.addEventListener("pointermove", mv);
    el.addEventListener("pointerleave", out);
    return () => (el.removeEventListener("pointermove", mv), el.removeEventListener("pointerleave", out));
  }, []);
  return ref;
}

/* ---- strips and words ---- */
export function Marquee({ children, speed = 40, reverse = false, className = "", label }) {
  return (
    <div className={"d79-mq " + className} style={{ "--sp": speed + "s" }} aria-label={label} role={label ? "region" : undefined}>
      <div className={"d79-mq__track" + (reverse ? " is-rev" : "")}>
        <div className="d79-mq__set">{children}</div>
        <div className="d79-mq__set" aria-hidden="true">{children}</div>
      </div>
    </div>
  );
}
export function Rotator({ words, every = 2200, className = "" }) {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (d79Calm() || words.length < 2) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % words.length), every);
    return () => clearInterval(t);
  }, [words.length, every]);
  return (
    <span className={"d79-rot " + className}>
      {words.map((w, k) => (
        <span key={k} className={"d79-rot__w" + (k === i ? " is-on" : k === (i + words.length - 1) % words.length ? " is-out" : "")} aria-hidden={k !== i}>
          {w}
        </span>
      ))}
    </span>
  );
}

/* ---- the 3D stage ---- */
const POSTERS = {
  globe: ["__IMG:d79/globe-light__", "__IMG:d79/globe-dark__"],
  mr: ["__IMG:d79/mr-light__", "__IMG:d79/mr-dark__"],
  dm: ["__IMG:d79/dm-light__", "__IMG:d79/dm-dark__"],
  it: ["__IMG:d79/it-light__", "__IMG:d79/it-dark__"],
  af: ["__IMG:d79/af-light__", "__IMG:d79/af-dark__"],
};
export const posterOf = (k) => POSTERS[k] || POSTERS.globe;
const glOk = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch (e) {
    return false;
  }
};
const theme = () => (document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light");
// the live scene waits for the visitor's first real input (or a quiet moment), so the first screen opens fast
function whenUsed(fn, idleMs) {
  let done = false;
  const evs = ["pointerdown", "keydown", "wheel", "touchstart", "mousemove"];
  const go = (e) => {
    if (done) return;
    if (e && e.type === "mousemove" && !(e.movementX || e.movementY)) return;
    done = true;
    evs.forEach((n) => window.removeEventListener(n, go, true));
    clearTimeout(t);
    fn();
  };
  evs.forEach((n) => window.addEventListener(n, go, { capture: true, passive: true }));
  const t = setTimeout(go, idleMs);
  return () => { done = true; clearTimeout(t); evs.forEach((n) => window.removeEventListener(n, go, true)); };
}
export function Stage({ kind, className = "", alt = "", idle = 2500, eager = false }) {
  const box = ee.useRef(null), cv = ee.useRef(null);
  const [live, setLive] = ee.useState(false);
  ee.useEffect(() => {
    if (d79Calm() || !glOk() || window.__FR_SHELL_SNAP) return undefined;
    let s = null, dead = false;
    const start = () => import("./Scene3D.js").then((m) => {
      if (dead || !cv.current) return;
      s = m.mountScene(cv.current, kind, { theme: theme() });
      requestAnimationFrame(() => !dead && setLive(true));
    }).catch(() => {});
    // the 3D scene starts on the visitor's first real input (mouse, touch, key, wheel), so the page still opens fast
    const stop = eager ? (start(), () => {}) : whenUsed(start, 2e9);
    const onTheme = (e) => s && s.setTheme(e.detail || theme());
    window.addEventListener("fr-theme", onTheme);
    return () => { dead = true; stop(); window.removeEventListener("fr-theme", onTheme); s && s.dispose(); };
  }, [kind]);
  const [lt, dk] = POSTERS[kind] || POSTERS.globe;
  return (
    <div ref={box} className={"d79-stage d79-stage--" + kind + (live ? " is-live" : "") + " " + className} aria-hidden={alt ? undefined : "true"}>
      <img className="d79-stage__pic d79-stage__pic--lt" src={lt} alt={alt} width="800" height="700" fetchpriority="high" decoding="async" />
      <img className="d79-stage__pic d79-stage__pic--dk" src={dk} alt="" width="800" height="700" decoding="async" />
      <canvas ref={cv} className="d79-stage__gl" />
    </div>
  );
}

/* ---- page-wide: scroll progress bar and the pointer light ---- */
export function useScrollVars(ref) {
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        el.style.setProperty("--sp", h > 0 ? (scrollY / h).toFixed(4) : 0);
      });
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);
}
export function useSpot(ref) {
  ee.useEffect(() => {
    const el = ref.current;
    if (!el || !fine() || d79Calm()) return undefined;
    const mv = (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    };
    el.addEventListener("pointermove", mv);
    return () => el.removeEventListener("pointermove", mv);
  }, []);
}
