/* Build 65 update 13 — the new animated brand logos (Kunal, 1 November 2026): Frequent Research full logo and icon,
   Turn2Opinion, MyFrequentRewards and MyHealthOpinions (logo + heart mark). Artwork and choreography come from the
   six animated logo files Kunal sent (fx layer engine for Frequent Research; the T2O / MFR / MHO site logos). Layer
   images live in public/images/brand13/; the static images (PDFs, fallbacks) are public/images/brand/*.webp.
   Every logo sits on a coloured "pearl" plate (FRL_Plate), never on a plain white background.
   Loops that repaint (filter glows, gloss sweeps) play a few times and rest ("calm"); hover plays them again; all loops
   pause while the logo is off screen. */
import * as ee from 'react';
import { cmsLogo } from '../../app/cms78.jsx';
import { LDR_IMG } from '../../app/pages/OurTeamPage.jsx';
import { FRK_EMBLEM } from './FrKit.jsx';
import { PR5_SITE } from '../../data/Sampledge65.jsx';
import { frsPlay } from './Floaters.jsx';

const FRL_IMG = {
  fBase: "__IMG:brand13/fr-f-base__",
  fSwa: "__IMG:brand13/fr-f-swa__",
  fSwb: "__IMG:brand13/fr-f-swb__",
  fF: "__IMG:brand13/fr-f-f__",
  fDiv: "__IMG:brand13/fr-f-div__",
  t1: "__IMG:brand13/fr-f-t1__",
  t2: "__IMG:brand13/fr-f-t2__",
  t3: "__IMG:brand13/fr-f-t3__",
  t4: "__IMG:brand13/fr-f-t4__",
  t5: "__IMG:brand13/fr-f-t5__",
  t6: "__IMG:brand13/fr-f-t6__",
  t7: "__IMG:brand13/fr-f-t7__",
  t8: "__IMG:brand13/fr-f-t8__",
  iBase: "__IMG:brand13/fr-i-base__",
  iSwa: "__IMG:brand13/fr-i-swa__",
  iSwb: "__IMG:brand13/fr-i-swb__",
  iF: "__IMG:brand13/fr-i-f__",
  t2o: "__IMG:brand13/t2o__",
  mfr: "__IMG:brand13/mfr__",
  fullDk: "__IMG:brand13/fr-full-dk__",
  t2oDk: "__IMG:brand13/t2o-dk__",
  mfrDk: "__IMG:brand13/mfr-dk__",
};
/* night versions (light lettering) of the layers that carry navy ink, used when a logo floats on a dark background */
const FRL_DK = {
  t1: "__IMG:brand13/fr-f-t1-dk__",
  t2: "__IMG:brand13/fr-f-t2-dk__",
  t3: "__IMG:brand13/fr-f-t3-dk__",
  t4: "__IMG:brand13/fr-f-t4-dk__",
  t5: "__IMG:brand13/fr-f-t5-dk__",
  t6: "__IMG:brand13/fr-f-t6-dk__",
  t7: "__IMG:brand13/fr-f-t7-dk__",
  t8: "__IMG:brand13/fr-f-t8-dk__",
  fDiv: "__IMG:brand13/fr-f-div-dk__",
  fSwa: "__IMG:brand13/fr-f-swa-dk__",
  fSwb: "__IMG:brand13/fr-f-swb-dk__",
  iSwa: "__IMG:brand13/fr-i-swa-dk__",
  iSwb: "__IMG:brand13/fr-i-swb-dk__",
  /* build 82.3 (Kunal): on dark backgrounds the globe inside the emblem is see-through (no white disc) */
  fBase: "__IMG:brand13/fr-f-base-dk__",
  iBase: "__IMG:brand13/fr-i-base-dk__",
};
const frlSrc = (k, dark) => (dark && FRL_DK[k]) || FRL_IMG[k];

/* [class, left, top, width, height, image, transform-origin, shine] — positions in % of the artwork */
const FRL_FULL = {
  ar: "1486 / 797",
  label: "Frequent Research — Fieldwork Solutions Private Limited. An ISO certified company: 20252:2019, 9001:2015, 27001:2013",
  layers: [
    ["l-base", 0.2692, 0.5019, 39.1655, 78.4191, "fBase", "51.14% 50.88%"],
    ["l-swoosh-top", 3.0283, 0.6274, 29.004, 37.5157, "fSwa", "59.55% 106.02%"],
    ["l-swoosh-bottom", 29.3405, 54.4542, 9.1521, 16.4366, "fSwb", "-98.78% -85.51%"],
    ["l-f", 2.2207, 21.7064, 22.8802, 49.4354, "fF", null, 1],
    ["l-divider", 41.1171, 5.8971, 0.5384, 69.3852, "fDiv"],
    ["l-t-frequent", 45.2221, 9.4103, 54.5087, 14.1782, "t1", null, 1],
    ["l-t-research", 44.9529, 28.2309, 54.2396, 12.4216, "t2", null, 1],
    ["l-t-rule", 44.8856, 43.5383, 54.3742, 4.5169, "t3"],
    ["l-t-tagline", 45.3567, 50.3137, 54.2396, 5.0188, "t4"],
    ["l-t-quality", 44.8856, 59.5985, 54.4415, 5.8971, "t5"],
    ["l-t-fieldwork", 45.0202, 68.5069, 54.1723, 5.8971, "t6"],
    ["l-t-iso", 2.3553, 85.3199, 94.4818, 5.1443, "t7"],
    ["l-t-numbers", 15.2086, 94.4793, 71.0633, 5.0188, "t8"],
  ],
  nodes: [[23.76, 7, "b"], [20.86, 16.06, "s"], [27.46, 19.7, "b"], [31.63, 14.81, "s"], [37.89, 22.58, "b"], [34.52, 30.74, "s"], [29.41, 35.38, "b"], [38.16, 47.43, "b"]],
  nodeD: "2.1%",
  orbit: [0.6, 0.3, 39.4, 80.2],
  sparks: [[3.5, 12, 1.8, "2.6s", "#7fb0ff"], [39.5, 74, 1.6, "3.6s", "#ffffff"], [98, 6, 1.5, "4.4s", "#9ec0ff"], [62, 83, 1.3, "5.2s", "#9ec0ff"]],
};
const FRL_ICON = {
  ar: "560 / 594",
  label: "Frequent Research",
  layers: [
    ["l-base", 0.7143, 0.6734, 98.5714, 98.6532, "iBase", "50% 50%"],
    ["l-swoosh-top", 7.5, 0.8418, 70.7143, 45.2862, "iSwa", "60.10% 108.55%"],
    ["l-swoosh-bottom", 73.3929, 68.6869, 22.5, 20.202, "iSwb", "-103.97% -92.50%"],
    ["l-f", 5.5357, 27.7778, 56.4286, 61.2795, "iF", null, 1],
  ],
  nodes: [[58.57, 9.3, "b"], [51.3, 20.9, "s"], [68.35, 24.9, "b"], [78.6, 19, "s"], [94.6, 29, "b"], [86.4, 39.9, "s"], [73.5, 44.2, "b"], [95, 59.8, "b"]],
  nodeD: "5%",
  orbit: [1.5, 1.2, 97, 97.6],
  sparks: [[12, 14, 5, "2.4s", "#7fb0ff"], [97, 82, 4, "3.3s", "#ffffff"], [40, 4, 3.5, "4.1s", "#bcd4ff"], [6, 70, 3.5, "5s", "#ffffff"]],
};
/* update 26 (Kunal, 5 Nov 2026): the full logo loses the tagline, the "quality you expect" line and the ISO lines, and the
   wordmark grows. Two layouts (artwork pixels; the stills are made by tools/brand26/make_logo26.py with the same numbers):
   "full" keeps "Fieldwork Solutions Private Limited" under the wordmark (footer, large copies); "head" is the menu-bar
   layout with an even bigger wordmark. */
const FRL_IMG26 = { full: "__IMG:brand26/fr-full26__", fullDk: "__IMG:brand26/fr-full26-dk__", head: "__IMG:brand26/fr-head26__", headDk: "__IMG:brand26/fr-head26-dk__" };
function frl26(W, text, sparks) {
  const H = 634, X = (v) => +((v / W) * 100).toFixed(4), Y = (v) => +((v / H) * 100).toFixed(4);
  /* old artwork % (1486 x 797) -> new artwork % (emblem pixels unchanged) */
  const ox = (v) => X((v / 100) * 1486), oy = (v) => Y((v / 100) * 797);
  const SZ = { t1: [810, 113], t2: [806, 99], t6: [805, 47] };
  return {
    ar: W + " / " + H,
    ratio: W / H,
    label: "Frequent Research — Fieldwork Solutions Private Limited",
    layers: [
      ["l-base", X(4), Y(4), X(582), Y(625), "fBase", "51.14% 50.88%"],
      ["l-swoosh-top", X(45), Y(5), X(431), Y(299), "fSwa", "59.55% 106.02%"],
      ["l-swoosh-bottom", X(436), Y(434), X(136), Y(131), "fSwb", "-98.78% -85.51%"],
      ["l-f", X(33), Y(173), X(340), Y(394), "fF", null, 1],
      ["l-divider", X(611), Y(50), X(8), Y(534), "fDiv"],
    ].concat(text.map(([k, x, y, sc]) => [k === "t1" ? "l-t-frequent" : k === "t2" ? "l-t-research" : "l-t-fieldwork", X(x), Y(y), X(SZ[k][0] * sc), Y(SZ[k][1] * sc), k, null, k === "t6" ? 0 : 1])),
    nodes: FRL_FULL.nodes.map(([x, y, t]) => [ox(x), oy(y), t]),
    nodeD: X(31.2) + "%",
    orbit: [ox(0.6), oy(0.3), ox(39.4), oy(80.2)],
    halo: [X(4), Y(4), X(582), Y(625)],
    sparks: [[ox(3.5), oy(12), 1.8 * 1486 / W, "2.6s", "#7fb0ff"], [ox(39.5), oy(74), 1.6 * 1486 / W, "3.6s", "#ffffff"]].concat(sparks.map(([x, y, s, d, c]) => [X(x), Y(y), s * 1486 / W, d, c])),
  };
}
const FRL_FULL26 = frl26(1697, [["t1", 672, 108, 1.25], ["t2", 668, 295, 1.25], ["t6", 669, 469, 1.25]], [[1676, 104, 1.5, "4.4s", "#9ec0ff"], [1180, 560, 1.3, "5.2s", "#9ec0ff"]]);
const FRL_HEAD26 = frl26(1899, [["t1", 672, 132, 1.5], ["t2", 668, 357, 1.5]], [[1880, 128, 1.5, "4.4s", "#9ec0ff"], [1300, 540, 1.3, "5.2s", "#9ec0ff"]]);
const frlMask = (src) => `url(${src})`;

/* arms a logo: plays the entrance when it first scrolls into view, pauses loops off screen, small 3D tilt on hover */
function frlUseArm(tilt) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.classList.add("is-in", "fx-reduced");
      return undefined;
    }
    el.classList.add("fx-armed");
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (es) =>
          es.forEach((e) => {
            if (e.isIntersecting) {
              el.classList.add("is-in");
              el.classList.remove("fx-paused");
            } else if (el.classList.contains("is-in")) el.classList.add("fx-paused");
          }),
        { threshold: 0.15 }
      );
      io.observe(el);
    } else el.classList.add("is-in");
    const fine = tilt && window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (ev) => {
      const r = el.getBoundingClientRect();
      const px = (ev.clientX - r.left) / r.width - 0.5,
        py = (ev.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--ry", (px * tilt).toFixed(2) + "deg");
      el.style.setProperty("--rx", (-py * tilt).toFixed(2) + "deg");
      el.classList.add("is-tilting");
    };
    const leave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
      el.classList.remove("is-tilting");
    };
    if (fine) {
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    }
    return () => {
      io && io.disconnect();
      if (fine) {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      }
    };
  }, [tilt]);
  return ref;
}

/* the Frequent Research logo (kind "full") or icon (kind "icon") */
function FRL_FR({ kind = "full", calm = false, tilt, alt, dark = false, rich = false }) {
  /* update 18 (speed): small copies (header, footer, chat, badges) keep the entrance, float and shine but skip the
     tiny nodes, sparks, comet orbit and glows, which cost most of the page's animation work and are invisible at that size.
     Big showcase copies pass rich. */
  const D = kind === "icon" ? FRL_ICON : kind === "head" ? FRL_HEAD26 : FRL_FULL26;
  const stat = kind === "icon" ? FRK_EMBLEM : kind === "head" ? (dark ? FRL_IMG26.headDk : FRL_IMG26.head) : dark ? FRL_IMG26.fullDk : FRL_IMG26.full;
  const big = kind !== "icon";
  const ref = frlUseArm(tilt == null ? (kind === "icon" ? 10 : 6) : tilt);
  return (
    <span ref={ref} role="img" aria-label={alt || D.label} className={"frlx fx-fr " + (kind === "icon" ? "fx-fr-icon" : "fx-fr-main fx-fr26 fx-fr26--" + kind) + (calm ? " fx-calm" : "") + (rich ? " fx-rich" : " fx-lite")} style={big ? { "--ar": D.ar, "--ratio": D.ratio.toFixed(4) } : { "--ar": D.ar }}>
      <span className="fx-tilt">
        <span className="fx-float">
          {big ? <span className="fx26-halo fx-anim" style={{ left: D.halo[0] + "%", top: D.halo[1] + "%", width: D.halo[2] + "%", height: D.halo[3] + "%" }} aria-hidden="true" /> : null}
          <img className="fx-static" src={stat} alt="" aria-hidden="true" draggable="false" decoding="async" />
          {D.layers.map(([c, l, t, w, h, im, to, sh]) => (
            <span key={c} className={"fx-layer fx-anim " + c} style={{ left: l + "%", top: t + "%", width: w + "%", height: h + "%", transformOrigin: to || undefined }} aria-hidden="true">
              <img src={frlSrc(im, dark)} alt="" draggable="false" decoding="async" />
              {sh ? <span className="fx-lshine" style={{ "--lmask": frlMask(FRL_IMG[im]) }} /> : null}
            </span>
          ))}
          {big ? (
            <span className="fx26-ring fx-anim" style={{ left: D.halo[0] + "%", top: D.halo[1] + "%", width: D.halo[2] + "%", height: D.halo[3] + "%" }} aria-hidden="true">
              <i />
            </span>
          ) : null}
          {big ? <span className="fx26-star fx-anim" style={{ left: D.sparks[2][0] + "%", top: D.sparks[2][1] + "%" }} aria-hidden="true" /> : null}
          {(rich ? D.nodes : []).map(([x, y, t], i) => (
            <span key={"n" + i} className={"fx-node fx-anim fx-node--" + t} style={{ left: x + "%", top: y + "%", "--d": D.nodeD, "--i": i, "--start": "1.25s" }} aria-hidden="true" />
          ))}
          {rich ? (<svg className="fx-orbit fx-anim" viewBox="0 0 100 100" preserveAspectRatio="none" style={{ left: D.orbit[0] + "%", top: D.orbit[1] + "%", width: D.orbit[2] + "%", height: D.orbit[3] + "%", "--speed": "6s", "--sw": 3 }} aria-hidden="true" focusable="false">
            {[["#2b6cff", 0], ["#9ec0ff", -50]].map(([c, ph]) => (
              <g key={ph} style={{ "--c": c, "--phase": ph }}>
                <ellipse className="fx-comet-tail" cx="50" cy="50" rx="49" ry="49" pathLength="100" />
                <ellipse className="fx-comet-head" cx="50" cy="50" rx="49" ry="49" pathLength="100" />
              </g>
            ))}
          </svg>) : null}
          {(rich ? D.sparks : []).map(([x, y, s, d, c], i) => (
            <span key={"s" + i} className="fx-spark fx-anim" style={{ left: x + "%", top: y + "%", "--s": s + "%", "--delay": d, "--c": c }} aria-hidden="true" />
          ))}
          <span className="fx-shine fx-anim" style={{ "--mask": frlMask(stat) }} aria-hidden="true" />
        </span>
      </span>
    </span>
  );
}

/* Turn2Opinion: halo arc and ripples behind the "2", float and light sweep */
function FRL_T2O({ calm = false, alt = "Turn2Opinion", dark = false }) {
  const ref = frlUseArm(0);
  return (
    <span ref={ref} className={"frl-t2o logo" + (calm ? " fx-calm" : "")} role="img" aria-label={alt}>
      <span className="logo-stage">
        <span className="logo-halo" aria-hidden="true">
          <span className="logo-halo-ring" />
          <span className="logo-ripple r1" />
          <span className="logo-ripple r2" />
        </span>
        <img src={dark ? FRL_IMG.t2oDk : FRL_IMG.t2o} alt="" width="640" height="195" decoding="async" />
        <span className="logo-shine" style={{ "--logo-mask": frlMask(FRL_IMG.t2o) }} aria-hidden="true" />
      </span>
    </span>
  );
}

/* MyFrequentRewards: the MFR coin rolls in and flips, the wordmark wipes in, orbit ring with a comet, star twinkle */
function FRL_MFR({ calm = false, alt = "MyFrequentRewards", dark = false }) {
  const ref = frlUseArm(0);
  return (
    <span ref={ref} className={"frl-mfr blogo" + (calm ? " is-calm" : "")} role="img" aria-label={alt}>
      <img className="blogo-word" src={dark ? FRL_IMG.mfrDk : FRL_IMG.mfr} alt="" width="365" height="89" decoding="async" />
      <span className="blogo-ring" aria-hidden="true">
        <span>
          <i />
        </span>
      </span>
      <span className="blogo-mono" style={{ "--logo": frlMask(FRL_IMG.mfr) }} aria-hidden="true" />
      <span className="blogo-star" aria-hidden="true" />
      <span className="blogo-shine" style={{ "--logo": frlMask(FRL_IMG.mfr) }} aria-hidden="true" />
    </span>
  );
}

/* MyHealthOpinions: beating heart with a heartbeat line, gloss and sparkles (vector) */
let frlUid = 0;
function FRL_MHO({ calm = false, alt = "MyHealthOpinions", dark = false }) {
  const ref = frlUseArm(0);
  const id = ee.useMemo(() => "frlh" + ++frlUid, []);
  const heart = "M38 70C30 63 6 49 6 28 6 15 16 7 27 7c6 0 9 3 11 7 2-4 5-7 11-7 11 0 21 8 21 21 0 21-24 35-32 42z";
  return (
    <span ref={ref} className={"frl-mho vlogo" + (calm ? " is-calm" : "") + (dark ? " on-dark" : "")}>
      <svg viewBox="0 0 372 80" role="img" aria-label={alt}>
        <defs>
          <linearGradient id={id + "h"} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#c8102e" />
            <stop offset=".45" stopColor="#ef3b2d" />
            <stop offset=".8" stopColor="#f7931e" />
            <stop offset="1" stopColor="#ffc93c" />
          </linearGradient>
          <linearGradient id={id + "b"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--logo-b1)" }} />
            <stop offset="1" style={{ stopColor: "var(--logo-b2)" }} />
          </linearGradient>
          <linearGradient id={id + "o"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e3631c" />
            <stop offset=".5" stopColor="#f7931e" />
            <stop offset="1" stopColor="#d96a26" />
          </linearGradient>
          <linearGradient id={id + "g"} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={id + "c"}>
            <path d={heart} />
          </clipPath>
        </defs>
        <g className="vl-heart">
          <path d="M23 59 13 75l20-9z" fill={`url(#${id}h)`} />
          <path d={heart} fill={`url(#${id}h)`} stroke="#fff" strokeWidth="2.5" />
          <path d="M11 20C4 36 9 54 24 63" fill="none" stroke="#2f80c4" strokeWidth="3.5" strokeLinecap="round" />
          <g clipPath={`url(#${id}c)`}>
            <rect className="vl-gloss" x="-40" y="0" width="28" height="80" fill={`url(#${id}g)`} transform="skewX(-20)" />
            <ellipse cx="26" cy="20" rx="12" ry="7" fill="#fff" opacity=".22" />
          </g>
          <path className="vl-ecg" d="M7 38h16l4-8 5 19 6-30 5 24 3-7h23" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" pathLength="100" />
        </g>
        <g fill="#f08a2c" className="vl-sparks">
          <path className="vs vs1" d="M76 6h3v4h4v3h-4v4h-3v-4h-4v-3h4z" />
          <path className="vs vs2" d="M86 1h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
          <path className="vs vs3" d="M70 17h2v3h3v2h-3v3h-2v-3h-3v-2h3z" />
          <circle className="vs vs4" cx="90" cy="14" r="1.6" />
        </g>
        <text x="84" y="57" className="vl-word" fontFamily="Manrope, 'Inter Variable', system-ui, sans-serif" fontWeight="800" fontSize="35" letterSpacing="-1">
          <tspan fill={`url(#${id}b)`}>MyHealth</tspan>
          <tspan fill={`url(#${id}o)`}>Opinions</tspan>
        </text>
      </svg>
    </span>
  );
}

/* MyHealthOpinions heart mark on its own */

/* brand keys: fr (full logo), icon, t2o, mfr, mho */
const FRL_TONE = { fr: "fr", icon: "fr", t2o: "t2o", mfr: "mfr", mho: "mho" };
const frlKey = (s) => {
  const k = String(s || "").toLowerCase();
  return /turn2|t2o/.test(k) ? "t2o" : /reward|mfr/.test(k) ? "mfr" : /health|mho/.test(k) ? "mho" : k === "icon" ? "icon" : "fr";
};
function FRL_Logo({ k, calm, alt, dark }) {
  const key = frlKey(k);
  return key === "t2o" ? <FRL_T2O calm={calm} alt={alt} dark={dark} /> : key === "mfr" ? <FRL_MFR calm={calm} alt={alt} dark={dark} /> : key === "mho" ? <FRL_MHO calm={calm} alt={alt} dark={dark} /> : <FRL_FR kind={key === "icon" ? "icon" : "full"} calm={calm} alt={alt} dark={dark} />;
}

/* Is the surface behind this element dark? Walks up to the first painted background (colour or first gradient stop). */
function frlIsDark(el) {
  for (let e = el && el.parentElement; e && e !== document.documentElement; e = e.parentElement) {
    const cs = getComputedStyle(e);
    let m = null;
    if (cs.backgroundImage && cs.backgroundImage.indexOf("gradient") > -1) m = cs.backgroundImage.match(/rgba?\(([^)]+)\)/);
    if (!m) {
      const c = cs.backgroundColor.match(/rgba?\(([^)]+)\)/);
      if (c && (c[1].split(",")[3] === undefined || parseFloat(c[1].split(",")[3]) > 0.5)) m = c;
    }
    if (m) {
      const v = m[1].split(",").map(parseFloat);
      if (v[3] !== undefined && v[3] < 0.35) continue;
      return (0.2126 * v[0] + 0.7152 * v[1] + 0.0722 * v[2]) / 255 < 0.42;
    }
  }
  return document.documentElement.getAttribute("data-theme") === "dark";
}
/* tracks the surface: re-checks on theme switch and after the page has painted */
function frlUseSurface(ref, force) {
  const [dk, setDk] = ee.useState(force === true);
  ee.useEffect(() => {
    if (force === true || force === false) return undefined;
    const run = () => ref.current && setDk(frlIsDark(ref.current));
    run();
    const t1 = setTimeout(run, 400),
      t2 = setTimeout(run, 1600);
    let mo = null;
    if ("MutationObserver" in window) {
      mo = new MutationObserver(() => setTimeout(run, 60));
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      mo && mo.disconnect();
    };
  }, [force]);
  return force === true ? true : force === false ? false : dk;
}

/* Update 15 (Kunal): Turn2Opinion, MyFrequentRewards, MyHealthOpinions and the icon go back on the tinted plate
   (calmer than update 13); the Frequent Research full logo becomes a clear lockup: animated emblem + live wordmark. */
function FRL_Plate({ k, h = 56, calm, alt, className = "", flat, dark }) {
  /* build 78: a logo uploaded in the super admin (Logos, or a new portal's own logo) replaces the drawn one */
  const up = k && k !== "fr" && k !== "icon" ? cmsLogo("portal:" + String(k).toLowerCase()) : "";
  if (up) return <span className={"frl-plate frl-plate--img " + (flat ? "frl-plate--flat " : "") + className} style={{ "--h": h + "px" }}><img className="cms-logo" src={up} alt={alt || ""} /></span>;
  const key = frlKey(k);
  if (key === "fr") return <FRL_Lock h={h} calm={calm} alt={alt} dark={dark} className={className} />;
  return (
    <span className={"frl-plate frl-plate--" + FRL_TONE[key] + " frl-plate--k-" + key + (flat ? " frl-plate--flat" : "") + " " + className} style={{ "--h": h + "px" }}>
      <i className="frl-plate__rim" aria-hidden="true" />
      <span className="frl-plate__in">
        <FRL_Logo k={key} calm={calm} alt={alt} />
      </span>
    </span>
  );
}
/* Frequent Research lockup: the animated emblem beside a crisp, readable wordmark (text, so it stays sharp at any size) */
function FRL_Lock({ h = 56, calm, alt, dark, className = "" }) {
  const ref = ee.useRef(null);
  const dk = frlUseSurface(ref, dark);
  return (
    <span ref={ref} className={"frl-lock" + (dk ? " is-dark" : " is-light") + (h >= 70 ? " frl-lock--tag" : "") + " " + className} style={{ "--h": h + "px" }} role="img" aria-label={alt || "Frequent Research"}>
      <span className="frl-lock__mark">
        <FRL_FR kind="icon" calm={calm} tilt={0} alt="" />
      </span>
      <span className="frl-lock__t" aria-hidden="true">
        <b className="frl-lock__a">Frequent</b>
        <b className="frl-lock__b">Research</b>
      </span>
    </span>
  );
}

/* header / footer lockup (replaces the base cS → BR_Logo) */
function FRL_Lockup({ light }) {
  /* update 16 (Kunal): the header shows the full Frequent Research logo again, top-left */
  const ref = ee.useRef(null);
  const dk = frlUseSurface(ref, light ? false : undefined);
  const up = !light && cmsLogo("header");
  if (up) return <span ref={ref} className="frl-headfull cms-logo-wrap"><img className="cms-logo cms-logo--header" src={up} alt="Frequent Research" /></span>;
  if (!light)
    return (
      <span ref={ref} className="frl-headfull" style={{ "--h": "64px" }}>
        <FRL_FR kind="head" calm tilt={4} dark={dk} />
      </span>
    );
  return <FRL_Plate k="fr" h={68} calm className="frl-foot" />;
}
/* research panel logos (replaces base BR_Panel for the three communities) */
const FRL_PANEL_H = { foot: 38, sm: 40, md: 46, lg: 58, hero: 62 };
function FRL_Panel({ p, size = "md", className = "" }) {
  const key = frlKey(p && (p.slug || p.name));
  return <FRL_Plate k={key} h={FRL_PANEL_H[size] || 38} calm={size === "foot"} alt={p && p.name ? p.name + " logo" : undefined} className={"frl-pl frl-pl--" + size + " " + className} />;
}

/* update 26 (Kunal, 5 Nov 2026), photo replaced in build 73 (7 Nov, navy blazer portrait): portrait of Manish Arora for the CEO message (leadership section and its picker) */
try {
  /* build 82.1 (Kunal, 12 Nov): all leadership photos replaced by the new constellation portraits */
  LDR_IMG.manish = "__IMG:team82/ldr-manish__";
  LDR_IMG.sachin = "__IMG:team82/ldr-sachin__";
  LDR_IMG.devashish = "__IMG:team82/ldr-devashish__";
  /* build 82.1: the Meet our Team card now uses the new circle portrait set in GALPage.jsx (team82) */
} catch (e) {}

/* small animated emblem for avatars, chat button and badges */
function FRL_Mark({ s = 32, className = "" }) {
  return (
    <span className={"frl-mark " + className} style={{ "--h": s + "px" }} aria-hidden="true">
      <FRL_FR kind="icon" calm tilt={0} />
    </span>
  );
}

/* update 14 — the new header's night sky: drifting aurora light, a star field and a travelling light along the edge */
const FRL_EXT = { t2o: "https://www.turn2opinion.com/", mfr: "https://www.myfrequentrewards.com/", mho: "https://www.myhealthopinions.com/" };
const FRL_EXT_SEL = ".frl-plate--k-t2o,.frl-plate--k-mfr,.frl-plate--k-mho,.frl-t2o,.frl-mfr,.frl-mho,.heartmark,.pr5-lg,.pr5-lgx,.frk-sam,.sam-hero__logo";
function frlExtUrl(t) {
  const c = " " + (t.className && t.className.baseVal !== undefined ? t.className.baseVal : t.className) + " ";
  if (/ (frl-plate--k-t2o|frl-t2o) /.test(c)) return FRL_EXT.t2o;
  if (/ (frl-plate--k-mfr|frl-mfr) /.test(c)) return FRL_EXT.mfr;
  if (/ (frl-plate--k-mho|frl-mho|heartmark) /.test(c)) return FRL_EXT.mho;
  return PR5_SITE;
}
const FRS_TAB_SEL = '.hd14 .nav__link,.hd14 .mega a,.drawer a,.drawer__link,.drawer summary,[role="tab"],[aria-selected],[class*="__tab"],[class*="-tab"]:is(button,a),.tabs button,.hz-tabs button';
function HD14_Sky() {
  ee.useEffect(() => {
    const on = (e) => {
      const t = e.target && e.target.closest && e.target.closest(FRS_TAB_SEL);
      if (!t) return;
      const t0 = Date.now();
      setTimeout(() => {
        if ((window.__frsLast || 0) < t0 - 5) frsPlay("tab");
      }, 40);
    };
    /* update 16 (Kunal): a click on any partner-brand logo goes straight to that brand's own website */
    const ext = (e) => {
      const t = e.target && e.target.closest && e.target.closest(FRL_EXT_SEL);
      if (!t || (e.button && e.button !== 0)) return;
      const u = frlExtUrl(t);
      if (!u) return;
      e.preventDefault();
      e.stopPropagation();
      window.open(u, "_blank", "noopener,noreferrer");
    };
    document.addEventListener("click", ext, true);
    document.addEventListener("click", on, true);
    return () => {
      document.removeEventListener("click", on, true);
      document.removeEventListener("click", ext, true);
    };
  }, []);
  return (
    <span className="hd14-sky" aria-hidden="true">
      <i className="hd14-aur hd14-aur--a" />
      <i className="hd14-aur hd14-aur--b" />
      <i className="hd14-aur hd14-aur--c" />
      <i className="hd14-stars" />
      <i className="hd14-edge">
        <b />
      </i>
    </span>
  );
}

export { FRL_FR, FRL_Lockup, FRL_Mark, FRL_Panel, FRL_Plate, HD14_Sky };
