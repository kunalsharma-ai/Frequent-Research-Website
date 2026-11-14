/*
 * Floating WhatsApp button (build 52). Prefix FRW_. Styles: src/styles/floaters.css (fw-).
 * Replaces the base "WhatsApp Support" pill (DM) with a compact round button on the RIGHT, stacked above the live-chat
 * launcher. Same link as before (c5(): wa.me/<Ct.whatsapp> with the site's prefilled message). Motion: a soft breathing
 * glow, two sonar rings and a small "hello" wiggle every few seconds; a label slides out on hover/focus. It hides
 * while the chat panel is open (html.fc-is-open) and all motion stops for prefers-reduced-motion.
 */
/* Off-screen sections pause their CSS animations (perf.css: .frp-off). Mounted once, with the WhatsApp button,
   which is on every page. A MutationObserver picks up sections added by route changes. */
import * as ee from 'react';
import { CONTACT, whatsappUrl } from '../../app/data/site.jsx';
import { BR_IMG } from '../../app/shared/Brand.jsx';
import { FRK_I, FRK_LOGO_FULL } from './FrKit.jsx';
import { K5_Globals } from './Kit65.jsx';
import { FRL_Plate } from './Logos13.jsx';
import { FRD_Dock } from './Hero58.jsx';

function FRP_usePerf() {
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const root = document.getElementById("root");
    if (!root) return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.target.classList.toggle("frp-off", !e.isIntersecting)), { rootMargin: "150px 0px" });
    const seen = new WeakSet();
    const scan = () =>
      root.querySelectorAll("section, footer, .vt, .page-hero").forEach((el) => {
        if (!seen.has(el)) {
          seen.add(el);
          io.observe(el);
        }
      });
    scan();
    let t = 0;
    const mo = new MutationObserver(() => {
      clearTimeout(t);
      t = setTimeout(scan, 250);
    });
    mo.observe(root, { childList: true, subtree: true });
    return () => {
      clearTimeout(t);
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
/* build 55 — native cursor inside forms and dialogs. The base site draws a decorative cursor ring; over form fields
   it sat on top of the text caret. While the pointer is inside a form, dialog, chat or country list the ring is hidden
   and the normal system cursors are used (html.cur-native, styles in gate.css). */
function FRP_useNativeCursor() {
  ee.useEffect(() => {
    const html = document.documentElement;
    let on = false;
    const mv = (e) => {
      const t = e.target;
      const want = !!(t && t.closest && t.closest("form,[role=dialog],.fg-ov,.rv-ov,.fc,.cc-pop,input,textarea,select"));
      if (want !== on) {
        on = want;
        html.classList.toggle("cur-native", on);
      }
    };
    document.addEventListener("pointerover", mv, { passive: true });
    return () => document.removeEventListener("pointerover", mv);
  }, []);
}

/* sound helpers (welcome + review notification) — see build 57 note below */
const FRS_KEY = "fr-sound";
const frsGet = (s, k) => {
  try {
    return window[s].getItem(k);
  } catch (e) {
    return null;
  }
};
const frsSet = (s, k, v) => {
  try {
    window[s].setItem(k, v);
  } catch (e) {}
};
let frsCtx = null;
/* build 57 — sounds (synthesised with Web Audio; no audio files):
     "welcome"  sweet, soft three-note bell (G5 · B5 · D6) with a gentle shimmer and long fade, once per session when
                the site opens — no pop-up card. Browsers block audio until the visitor interacts, so if it can't play
                straight away it plays on the first click or key press.
     "review"   bright two-note glass "ding" with a sparkle, when the Rate & Review notification slides in.
   Off switch: the "Sound on/off" button in the footer (localStorage "fr-sound" = "off"). */
const frsOn = () => frsGet("localStorage", FRS_KEY) !== "off";
/* update 23: one place to switch sound on/off; every switch (menu bar + footer) listens for "fr-sound" */
function frsSetOn(n) {
  frsSet("localStorage", FRS_KEY, n ? "on" : "off");
  try {
    window.dispatchEvent(new CustomEvent("fr-sound", { detail: !!n }));
  } catch (e) {}
}
function frsUseOn() {
  const [on, setOn] = ee.useState(() => frsOn());
  ee.useEffect(() => {
    const h = (e) => setOn(!!e.detail);
    const st = (e) => e.key === FRS_KEY && setOn(frsOn());
    window.addEventListener("fr-sound", h);
    window.addEventListener("storage", st);
    return () => (window.removeEventListener("fr-sound", h), window.removeEventListener("storage", st));
  }, []);
  return on;
}
function frsCtxGet() {
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return null;
  frsCtx = frsCtx || new AC();
  return frsCtx;
}
function frsBell(c, out, t, f, dur, vol) {
  /* a soft bell: fundamental + gentle overtones, quick attack, long exponential fade, tiny vibrato */
  [
    [1, 1],
    [2, 0.28],
    [3.01, 0.08],
  ].forEach(([mul, v]) => {
    const o = c.createOscillator(),
      g = c.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(f * mul, t);
    const lfo = c.createOscillator(),
      lg = c.createGain();
    lfo.frequency.value = 5.2;
    lg.gain.value = f * mul * 0.003;
    lfo.connect(lg).connect(o.frequency);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol * v, t + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out);
    o.start(t);
    lfo.start(t);
    o.stop(t + dur + 0.05);
    lfo.stop(t + dur + 0.05);
  });
}
function frsPlay(kind = "welcome") {
  try {
    window.__frsLast = Date.now();
    if (!frsOn()) return Promise.resolve(false);
    const c = frsCtxGet();
    if (!c) return Promise.resolve(false);
    const play = () => {
      const t = c.currentTime + 0.03;
      const master = c.createGain();
      master.gain.value = kind === "intro" ? 0.1 : kind === "review" ? 0.08 : kind === "tab" || kind === "tick" ? 0.05 : kind === "pick" || kind === "region" || kind === "seg" ? 0.055 : 0.06;
      const lp = c.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = kind === "review" ? 6000 : 3800;
      const delay = c.createDelay(1),
        fb = c.createGain();
      delay.delayTime.value = kind === "welcome" || kind === "intro" ? 0.22 : 0.12;
      fb.gain.value = kind === "welcome" || kind === "intro" || kind === "review" ? 0.28 : 0.12;
      delay.connect(fb).connect(delay);
      master.connect(lp);
      lp.connect(c.destination);
      master.connect(delay);
      delay.connect(lp);
      if (kind === "intro") {
        /* update 23: opening sound when the intro is clicked: a soft airy whoosh that rises into a warm chord
           and a bright five-note bell cascade (G major), about 2.5 s with a long shimmer tail */
        const n = Math.floor(c.sampleRate * 1.2),
          buf = c.createBuffer(1, n, c.sampleRate),
          d = buf.getChannelData(0);
        for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
        const src = c.createBufferSource(),
          bp = c.createBiquadFilter(),
          wg = c.createGain();
        src.buffer = buf;
        bp.type = "bandpass";
        bp.Q.value = 0.9;
        bp.frequency.setValueAtTime(300, t);
        bp.frequency.exponentialRampToValueAtTime(4200, t + 0.75);
        wg.gain.setValueAtTime(0.0001, t);
        wg.gain.exponentialRampToValueAtTime(0.55, t + 0.45);
        wg.gain.exponentialRampToValueAtTime(0.0001, t + 1.15);
        src.connect(bp).connect(wg).connect(master);
        src.start(t);
        src.stop(t + 1.2);
        /* warm pad underneath */
        [196, 246.9, 293.7].forEach((f) => {
          const o = c.createOscillator(),
            g = c.createGain();
          o.type = "triangle";
          o.frequency.value = f;
          g.gain.setValueAtTime(0.0001, t + 0.2);
          g.gain.exponentialRampToValueAtTime(0.18, t + 0.7);
          g.gain.exponentialRampToValueAtTime(0.0001, t + 2.6);
          o.connect(g).connect(master);
          o.start(t + 0.2);
          o.stop(t + 2.7);
        });
        [784, 987.8, 1174.7, 1568, 1975.5].forEach((f, i) => frsBell(c, master, t + 0.45 + i * 0.09, f, 1.4 + i * 0.15, 0.7 - i * 0.08));
        [2637, 3136].forEach((f, i) => frsBell(c, master, t + 1.0 + i * 0.07, f, 0.6, 0.16));
      } else if (kind === "pick") {
        /* panel books (update 11): opening a country — a bright rising three-note chime */
        frsBell(c, master, t, 1174.7, 0.35, 0.6);
        frsBell(c, master, t + 0.05, 1568, 0.35, 0.5);
        frsBell(c, master, t + 0.1, 2349.3, 0.45, 0.35);
      } else if (kind === "region") {
        /* opening a region or the entire panel — a quick upward arpeggio */
        [784, 987.8, 1174.7, 1568, 1975.5].forEach((f, i) => frsBell(c, master, t + i * 0.045, f, 0.5, 0.42 - i * 0.05));
      } else if (kind === "seg") {
        /* switching healthcare segment — a soft two-tone "shift" */
        frsBell(c, master, t, 659.3, 0.5, 0.6);
        frsBell(c, master, t + 0.09, 987.8, 0.6, 0.5);
      } else if (kind === "tick") {
        /* small interactions (filters, search, sort) */
        frsBell(c, master, t, 1760, 0.18, 0.4);
      } else if (kind === "tab") {
        /* update 8: a short, soft two-note pluck when a panel or product tab is picked */
        frsBell(c, master, t, 1046.5, 0.32, 0.55);
        frsBell(c, master, t + 0.06, 1568, 0.28, 0.3);
      } else if (kind === "review") {
        frsBell(c, master, t, 1318.5, 0.7, 0.9);
        frsBell(c, master, t + 0.13, 1975.5, 0.9, 0.8);
        [2637, 3136, 3951].forEach((f, i) => frsBell(c, master, t + 0.26 + i * 0.05, f, 0.35, 0.18));
      } else {
        frsBell(c, master, t, 784, 1.6, 0.8);
        frsBell(c, master, t + 0.16, 987.8, 1.6, 0.7);
        frsBell(c, master, t + 0.32, 1174.7, 2.0, 0.75);
      }
      return true;
    };
    if (c.state === "running") return Promise.resolve(play());
    return c.resume().then(() => (c.state === "running" ? play() : false)).catch(() => false);
  } catch (e) {
    return Promise.resolve(false);
  }
}
/* welcome sound only — no notification card */
function FRS_Welcome() {
  ee.useEffect(() => {
    if (frsGet("sessionStorage", "fr-hi") || navigator.webdriver || !frsOn()) return undefined;
    let done = false;
    const tryPlay = () => {
      /* update 23: while the intro is on screen its own opening sound replaces the welcome bell */
      if (window.__sp22Open) return Promise.resolve(false);
      if (frsGet("sessionStorage", "fr-hi")) return Promise.resolve((done = true), off());
      return frsPlay("welcome").then((ok) => {
        if (ok) {
          done = true;
          frsSet("sessionStorage", "fr-hi", "1");
          off();
        }
      });
    };
    const gesture = () => !done && tryPlay();
    const off = () => ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.removeEventListener(ev, gesture, true));
    const t = setTimeout(tryPlay, 900);
    ["pointerdown", "keydown", "touchstart"].forEach((ev) => window.addEventListener(ev, gesture, true));
    return () => (clearTimeout(t), off());
  }, []);
  return null;
}
/* footer switch */
function FRS_Toggle() {
  const on = frsUseOn();
  const flip = () => {
    const n = !on;
    frsSetOn(n);
    if (n) frsPlay("welcome");
  };
  return (
    <button type="button" className={"ft-sound" + (on ? " is-on" : "")} onClick={flip} aria-pressed={on}>
      <FRK_I n={on ? "sound" : "mute"} s={14} /> Sound {on ? "on" : "off"}
    </button>
  );
}

/* update 23: sound on/off switch in the menu bar, next to the theme button. Same setting as the footer switch. */
function FRS_HeadToggle() {
  const on = frsUseOn();
  const flip = () => {
    const n = !on;
    frsSetOn(n);
    if (n) frsPlay("tab");
  };
  const lab = on ? "Sound is on. Turn sound off" : "Sound is off. Turn sound on";
  return (
    <button type="button" className={"frt-btn frs-hbtn" + (on ? " is-on" : " is-off")} onClick={flip} aria-pressed={on} aria-label={lab} title={on ? "Sound on" : "Sound off"}>
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9.5h3.2L12 5.5v13l-4.8-4H4z" fill="currentColor" fillOpacity=".18" />
        <g className="frs-hbtn__w">
          <path d="M15.5 9a4.2 4.2 0 0 1 0 6" />
          <path d="M18.2 6.6a7.6 7.6 0 0 1 0 10.8" />
        </g>
        <g className="frs-hbtn__x">
          <path d="M16 9.5l5 5M21 9.5l-5 5" />
        </g>
      </svg>
    </button>
  );
}

/* build 56 — smooth mode for slower devices. For ~2.5 s after the first load the frame rate is sampled; if the device
   can't keep up (under ~45 fps), reports little memory, or asks to save data, html.fr-lite is set for the rest of the
   visit: looping decorative animations play once and stop, and backdrop blur is switched off (perf.css). Content,
   layout and one-off entrance animations are unchanged. Test with ?lite=1 (force on) or ?lite=0 (force off). */
/* decided before the first render, so components that read the reduce-motion helpers at mount already see it */
(function frpLiteBoot() {
  try {
    const m = /[?&]lite=([01])/.exec(location.search + location.hash);
    const on = m ? m[1] === "1" : sessionStorage.getItem("fr-lite") === "1";
    if (on) {
      window.__frLite = true;
      document.documentElement.classList.add("fr-lite");
    }
  } catch (e) {}
})();
function FRP_useLite() {
  ee.useEffect(() => {
    const html = document.documentElement;
    let forced = null;
    try {
      const m = /[?&]lite=([01])/.exec(location.search + location.hash);
      if (m) forced = m[1] === "1";
    } catch (e) {}
    const set = (on) => (html.classList.toggle("fr-lite", !!on), (window.__frLite = !!on));
    if (forced !== null) return set(forced), undefined;
    try {
      const s = sessionStorage.getItem("fr-lite");
      if (s) return set(s === "1"), undefined;
    } catch (e) {}
    const nav = navigator || {};
    if ((nav.connection && nav.connection.saveData) || (nav.deviceMemory && nav.deviceMemory <= 2)) {
      set(true);
      return undefined;
    }
    let raf = 0,
      frames = 0,
      t0 = 0,
      stop = false;
    const start = setTimeout(() => {
      const tick = (t) => {
        if (stop) return;
        if (!t0) t0 = t;
        frames++;
        if (t - t0 < 2500) raf = requestAnimationFrame(tick);
        else {
          const fps = (frames * 1000) / (t - t0);
          const lite = document.visibilityState === "visible" && fps < 45;
          set(lite);
          try {
            sessionStorage.setItem("fr-lite", lite ? "1" : "0");
          } catch (e) {}
        }
      };
      raf = requestAnimationFrame(tick);
    }, 1200);
    return () => {
      stop = true;
      clearTimeout(start);
      cancelAnimationFrame(raf);
    };
  }, []);
}

function FRW_WhatsApp() {
  FRP_usePerf();
  FRP_useLite();
  FRP_useNativeCursor();
  const href = whatsappUrl();
  const phone = CONTACT.phone;
  return (
    <>
    <FRS_Welcome />
    <FRD_Dock />
    <K5_Globals />
    <a className="fw" href={href} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp support: chat with us on ${phone}`}>
      <span className="fw__label" aria-hidden="true">
        <b>WhatsApp us</b>
        <small>Usually replies fast</small>
      </span>
      <span className="fw__orb" aria-hidden="true">
        <i className="fw__ring" />
        <i className="fw__ring fw__ring--2" />
        <svg viewBox="0 0 32 32" width="28" height="28">
          <path
            fill="currentColor"
            d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.6a10.6 10.6 0 0 1-5.4-1.5l-.4-.2-3.9 1 1-3.8-.2-.4A10.6 10.6 0 1 1 16 26.6zm5.8-7.9c-.3-.2-1.9-.9-2.2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.7 8.7 0 0 1-4.3-3.8c-.3-.6.3-.5.9-1.7.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6a1.2 1.2 0 0 0-.9.4 3.7 3.7 0 0 0-1.1 2.7 6.4 6.4 0 0 0 1.3 3.4 14.7 14.7 0 0 0 5.6 5c2.1.9 2.9 1 3.9.8a3.3 3.3 0 0 0 2.2-1.5 2.7 2.7 0 0 0 .2-1.5c-.1-.2-.3-.3-.6-.4z"
          />
        </svg>
        <em className="fw__dot" />
      </span>
    </a>
    </>
  );
}

/* The full Frequent Research logo (white-background lockup, base BR_IMG.lockup) on a white plate, with a light sweep,
   a slow conic halo and a small 3D tilt on hover. Used in the footer, chat, review dialog and Scan & Connect. */
function FRK_Logo({ h = 56, className = "", label = "Frequent Research" }) {
  return <FRL_Plate k="fr" h={h} calm alt={label} className={"frk-logo13 " + className} />;
  const src = BR_IMG.lockup ? BR_IMG.lockup : FRK_LOGO_FULL;
  return (
    <span className={"frk-logo " + className} style={{ "--h": h + "px" }}>
      <i className="frk-logo__halo" aria-hidden="true" />
      <span className="frk-logo__plate">
        <img src={src} alt={label} width="613" height="248" loading="lazy" decoding="async" />
        <i className="frk-logo__sheen" aria-hidden="true" />
      </span>
    </span>
  );
}

export { FRK_Logo, FRS_HeadToggle, FRS_Toggle, FRW_WhatsApp, frsCtxGet, frsOn, frsPlay };
