/* Build 65 update 22 — home-hero celebration banner (CB22) and the intro splash (SP22).
 *
 * CB22_Banner sits at the top of the home hero, right under the menu bar. It is static (it never slides or rotates
 * with the hero) and it only exists on a special day: the calendar comes from GET /api/celebrations?year= (the super admin
 * copy, server/index.js) and falls back to /data/celebrations.json (generated from Kunal's workbook by
 * tools/celebrations/make_celebrations.py). On any other day it renders nothing at all.
 * Every event has a motif, and every motif has its own animated scene, colour grade and particles (CB22_ART, CB22_FX).
 * Loops animate transform and opacity only.
 *
 * Which day is "today": the calendar's timezone (Asia/Kolkata by default). For checks and previews the date can be
 * pinned with ?celebration-date=YYYY-MM-DD (in the address or after the #/route) or window.__FR_TODAY.
 *
 * SP22_Intro is the full-screen "evolve" intro shown once per browser session before the site. Clicking the round
 * logo, or anywhere on the intro (or Enter / Space / Esc / "Skip intro"), opens the site with an opening sound
 * (update 23; silent when sound is switched off in the menu bar or footer). It is skipped for bots and automated browsers
 * unless ?intro=1 is in the address.
 */
import * as ee from 'react';
import * as ci from 'react-dom';
import { frsPlay } from './Floaters.jsx';
import { FRL_FR } from './Logos13.jsx';
import { Planet81 } from '../../design81/planet81.jsx';
import { pc5FlagUrl, pc5UseFlags } from '../../data/PanelCountries65.jsx';
import { CB22_ICONS } from '../../data/Icons22.jsx';
import { CB22_FEST, CB22_FXK, CB22_IconArt, CB22_PALS } from './Festivals22.jsx';

const CB22_TZ = "Asia/Kolkata";
const CB22_RANK = { major: 3, high: 2, medium: 1 };
const CB22_CAT = {
  "Festival (India)": "Festival",
  "Global Festival / Holiday": "Festival",
  "Global Observance (UN / International)": "World day",
  "National / Commemorative Day (India)": "National day",
  "Healthcare & Wellness": "Health day",
  "Finance, Banking & Tax": "Finance date",
  "IT & Technology": "Technology day",
  "Digital Marketing & E-commerce": "Marketing day",
  "Sports & Mega Events": "Sport",
  "Market Research & Consumer Insights": "Research day",
  "Industry Event / Conference": "Industry event",
};
/* motif → colour grade (c1 main, c2 second, c3 accent) */
const CB22_PAL = {
  waves: ["#9FE7DC", "#2F6BFF", "#0E9C88"],
  diya: ["#FFC27A", "#D99A2B", "#C8577E"],
  colours: ["#C8577E", "#FFC27A", "#6D4AFF"],
  bonfire: ["#FFC27A", "#D99A2B", "#C8577E"],
  kite: ["#FFC27A", "#9FE7DC", "#2F6BFF"],
  crescent: ["#D99A2B", "#9FE7DC", "#6D4AFF"],
  lantern: ["#C8577E", "#D99A2B", "#FFC27A"],
  xmas: ["#0E9C88", "#D99A2B", "#C8577E"],
  tricolour: ["#FF9933", "#FFFFFF", "#138808"],
  fireworks: ["#D99A2B", "#C8577E", "#9FE7DC"],
  leaf: ["#0E9C88", "#9FE7DC", "#D99A2B"],
  ribbon: ["#C8577E", "#FFC27A", "#6D4AFF"],
  sport: ["#2F6BFF", "#D99A2B", "#9FE7DC"],
  coins: ["#D99A2B", "#FFC27A", "#0E9C88"],
  tech: ["#2F6BFF", "#9FE7DC", "#6D4AFF"],
  sale: ["#C8577E", "#D99A2B", "#6D4AFF"],
  survey: ["#2F6BFF", "#0E9C88", "#D99A2B"],
  hearts: ["#C8577E", "#FFC27A", "#6D4AFF"],
  book: ["#2F6BFF", "#D99A2B", "#FFC27A"],
  lotus: ["#C8577E", "#FFC27A", "#D99A2B"],
  dove: ["#9FE7DC", "#2F6BFF", "#FFC27A"],
  halloween: ["#FFC27A", "#6D4AFF", "#D99A2B"],
  globe: ["#2F6BFF", "#9FE7DC", "#6D4AFF"],
};

/* ── dates and data ──────────────────────────────────────────────────────────────────── */
function cb22Pinned() {
  try {
    const qs = [location.search, location.hash.includes("?") ? location.hash.slice(location.hash.indexOf("?")) : ""];
    for (const q of qs) {
      const v = q && new URLSearchParams(q).get("celebration-date");
      if (v && /^\d{4}-\d{2}-\d{2}$/.test(v)) return v;
    }
    if (typeof window.__FR_TODAY === "string" && /^\d{4}-\d{2}-\d{2}$/.test(window.__FR_TODAY)) return window.__FR_TODAY;
  } catch (e) {}
  return "";
}
function cb22Today(tz) {
  const pin = cb22Pinned();
  if (pin) return pin;
  try {
    return new Intl.DateTimeFormat("en-CA", { timeZone: tz || CB22_TZ, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  } catch (e) {
    return new Date().toISOString().slice(0, 10);
  }
}
/* update 24: one calendar file per year (2026 from Kunal's sheet, 2027+ from tools/celebrations/make_years.py), so a
   visitor downloads only the year that is showing. The super admin copy (/api/celebrations?year=) wins; the static
   /data/celebrations-YYYY.json is the fallback, then the original /data/celebrations.json. */
const cb22P = {};
/* build 74: calendars that have arrived, by year, so the banner can be drawn together with the rest of the first screen */
const cb22D = {};
const cb22Ok = (d) => (d && Array.isArray(d.events) ? d : Promise.reject(new Error("bad calendar")));
/* build 82.2: no API in the offline preview (file://, content://), so it is not asked (no console errors there) */
const cb22Get = (u) => /^\/api\//.test(u) && !/^https?:$/.test(location.protocol) ? Promise.reject(new Error("offline")) : fetch(u, { headers: { Accept: "application/json" } }).then((r) => (r.ok && /json/.test(r.headers.get("content-type") || "") ? r.json() : Promise.reject(new Error(r.status)))).then(cb22Ok);
const cb22Load = (year) => {
  const y = /^\d{4}$/.test(String(year)) ? String(year) : cb22Today().slice(0, 4);
  return (
    cb22P[y] ||
    (cb22P[y] = (() => {
      /* build 74: the admin's calendar and the built-in one are asked for at the same time (not one after the other),
         so the banner can appear sooner; the admin's copy still wins when it has days */
      const own = cb22Get("/data/celebrations-" + y + ".json").catch(() => cb22Get("/data/celebrations.json"));
      own.catch(() => {});
      return cb22Get("/api/v1/celebrations?year=" + y)
        .catch(() => own)
        .catch(() => null)
        .then((d) => ((cb22D[y] = d), d));
    })())
  );
};
/* today's events, best first. date "YYYY-MM-DD", or "*-MM-DD" for every year; optional "until" for a multi-day event */
function cb22Pick(data, day) {
  if (!data || !day || data.enabled === false) return null;
  const md = day.slice(4);
  const list = data.events.filter((e) => e && e.show !== false && e.name && (e.date === day || e.date === "*" + md || (e.until && e.date <= day && day <= e.until)));
  if (!list.length) return null;
  list.sort((a, b) => (CB22_RANK[b.importance] || 1) - (CB22_RANK[a.importance] || 1));
  const top = list[0];
  const also = (top.also || []).concat(list.slice(1).map((e) => ({ name: e.title || e.name, flags: e.flags || [], motif: e.motif })));
  return { ...top, also: also.slice(0, 3) };
}
const cb22Long = (day) => {
  try {
    return new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(day + "T12:00:00Z"));
  } catch (e) {
    return day;
  }
};
/* stable pseudo-random numbers so particles keep their places between renders */
const cb22R = (i, s) => {
  const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ── particle glyphs (viewBox 0 0 20 20) ─────────────────────────────────────────────── */
const CB22_G = {
  dot: <circle cx="10" cy="10" r="5" />,
  ember: <circle cx="10" cy="10" r="3.4" />,
  spark: <path d="M10 0l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />,
  snow: <path d="M10 1v18M2.2 5.5l15.6 9M2.2 14.5l15.6-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />,
  heart: <path d="M10 18S1 12.2 1 6.6A4.6 4.6 0 0 1 10 4.4a4.6 4.6 0 0 1 9 2.2C19 12.2 10 18 10 18z" />,
  leaf: <path d="M3 17C3 8 9 3 18 2c-1 9-6 15-15 15zm0 0l8-8" />,
  petal: <ellipse cx="10" cy="10" rx="4" ry="8.5" />,
  coin: (
    <>
      <circle cx="10" cy="10" r="8" />
      <circle cx="10" cy="10" r="5" fill="none" stroke="rgba(11,20,55,.35)" strokeWidth="1.6" />
    </>
  ),
  bit: <path d="M4 4h5v5H4zM11 11h5v5h-5zM11 4h5v2h-5zM4 14h5v2H4z" />,
  confetti: <rect x="6" y="2" width="8" height="16" rx="2" />,
  wave: <path d="M0 11c3.3-5 6.7-5 10 0s6.7 5 10 0" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
  bird: <path d="M0 9c4-4 7-3 10 2 3-5 6-6 10-2-4-1-7 1-10 5C7 10 4 8 0 9z" />,
  bat: <path d="M10 8c1-2 2-2 3 0 2-2 5-3 7-1-2 0-3 2-3 4-1-1-3-1-4 1-1-1-2-1-3-1s-2 0-3 1c-1-2-3-2-4-1 0-2-1-4-3-4 2-2 5-1 7 1 1-2 2-2 3 0z" />,
  lamp: <path d="M7 3h6l3 5v6l-3 4H7l-3-4V8z" />,
  kite: <path d="M10 1l7 8-7 10-7-10z" />,
  letter: <path d="M4 17L10 3l6 14M6.6 11h6.8" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />,
  ball: <circle cx="10" cy="10" r="6.5" />,
  tag: <path d="M2 10l8-8h8v8l-8 8zM14 6.2a1.3 1.3 0 1 0 0 .01" />,
  check: <path d="M3 10.5l4.5 4.5L17 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />,
  burst: (
    <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M10 1v4M10 15v4M1 10h4M15 10h4M3.6 3.6l2.8 2.8M13.6 13.6l2.8 2.8M3.6 16.4l2.8-2.8M13.6 6.4l2.8-2.8" />
    </g>
  ),
  powder: <circle cx="10" cy="10" r="9" />,
};
/* motif → particles: g glyph(s), k animation kind, n count */
const CB22_FX = {
  waves: { g: ["wave", "dot"], k: "drift", n: 14 },
  diya: { g: ["ember", "spark"], k: "rise", n: 18 },
  colours: { g: ["powder", "dot"], k: "burst", n: 16 },
  bonfire: { g: ["ember", "spark"], k: "rise", n: 18 },
  kite: { g: ["kite", "dot"], k: "sway", n: 9 },
  crescent: { g: ["spark", "dot"], k: "twinkle", n: 18 },
  lantern: { g: ["lamp", "ember"], k: "rise", n: 12 },
  xmas: { g: ["snow", "dot"], k: "fall", n: 22 },
  tricolour: { g: ["confetti", "petal"], k: "fall", n: 20 },
  fireworks: { g: ["burst", "spark"], k: "burst", n: 12 },
  leaf: { g: ["leaf", "dot"], k: "fall", n: 14 },
  ribbon: { g: ["heart", "spark"], k: "rise", n: 12 },
  sport: { g: ["confetti", "ball"], k: "fall", n: 16 },
  coins: { g: ["coin", "spark"], k: "fall", n: 14 },
  tech: { g: ["bit", "dot"], k: "rise", n: 16 },
  sale: { g: ["tag", "confetti"], k: "fall", n: 14 },
  survey: { g: ["check", "dot"], k: "rise", n: 12 },
  hearts: { g: ["heart", "dot"], k: "rise", n: 16 },
  book: { g: ["letter", "spark"], k: "drift", n: 12 },
  lotus: { g: ["petal", "dot"], k: "fall", n: 14 },
  dove: { g: ["bird", "dot"], k: "fly", n: 8 },
  halloween: { g: ["bat", "dot"], k: "fly", n: 9 },
  globe: { g: ["spark", "dot"], k: "twinkle", n: 16 },
};
function CB22_Fx({ motif, spec, icon }) {
  const f = spec || CB22_FX[motif] || CB22_FX.globe;
  const out = [];
  for (let i = 0; i < f.n; i++) {
    const g = f.g[i % 3 === 2 ? 1 : 0];
    const st = {
      "--x": (4 + cb22R(i, 1) * 92).toFixed(1) + "%",
      "--y": (8 + cb22R(i, 2) * 80).toFixed(1) + "%",
      "--s": (0.55 + cb22R(i, 3) * 0.9).toFixed(2),
      "--d": (-cb22R(i, 4) * 9).toFixed(2) + "s",
      "--t": (5 + cb22R(i, 5) * 6).toFixed(2) + "s",
      "--dx": ((cb22R(i, 6) - 0.5) * 70).toFixed(0) + "px",
      "--r": ((cb22R(i, 7) - 0.5) * 540).toFixed(0) + "deg",
    };
    out.push(
      <i key={i} className={"cb22-p cb22-p--" + f.k + " cb22-p--c" + (i % 3)} style={st}>
        {g === "__icon" && icon ? (
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {cb22IconNodes(icon)}
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor">
            {CB22_G[g]}
          </svg>
        )}
      </i>
    );
  }
  return (
    <div className="cb22__fx" aria-hidden="true">
      {out}
    </div>
  );
}

/* ── the main scene for each motif (viewBox 0 0 120 120). Classes animate; colours come from --c1/--c2/--c3. ── */
const CB22_ART = {
  waves: () => (
    <>
      <circle className="cb22a-glow" cx="84" cy="36" r="16" fill="var(--c1)" opacity=".25" />
      <circle cx="84" cy="36" r="9" fill="var(--c1)" opacity=".85" />
      <clipPath id="cb22-wv">
        <circle cx="60" cy="60" r="52" />
      </clipPath>
      <g clipPath="url(#cb22-wv)">
        <path className="cb22a-wave cb22a-wave--1" d="M-60 70c15-9 30-9 45 0s30 9 45 0 30-9 45 0 30 9 45 0 30-9 45 0 30 9 45 0V130H-60z" fill="var(--c2)" opacity=".55" />
        <path className="cb22a-wave cb22a-wave--2" d="M-60 82c15-8 30-8 45 0s30 8 45 0 30-8 45 0 30 8 45 0 30-8 45 0 30 8 45 0V130H-60z" fill="var(--c3)" opacity=".7" />
        <path className="cb22a-wave cb22a-wave--3" d="M-60 94c15-7 30-7 45 0s30 7 45 0 30-7 45 0 30 7 45 0 30-7 45 0 30 7 45 0V130H-60z" fill="var(--c1)" opacity=".55" />
        <g className="cb22a-bob">
          <path d="M52 66h16l-3 9H55z" fill="#fff" />
          <path d="M60 46v20M60 47l10 11H60" stroke="#fff" strokeWidth="2" fill="rgba(255,255,255,.75)" strokeLinejoin="round" />
        </g>
      </g>
      <circle cx="60" cy="60" r="52" fill="none" stroke="var(--c1)" strokeOpacity=".5" strokeWidth="1.5" />
    </>
  ),
  diya: () => (
    <>
      <g className="cb22a-spin-slow" opacity=".55">
        {Array.from({ length: 12 }, (_, i) => (
          <circle key={i} cx={60 + 46 * Math.cos((i * Math.PI) / 6)} cy={62 + 46 * Math.sin((i * Math.PI) / 6)} r={i % 2 ? 2.4 : 3.6} fill={i % 2 ? "var(--c3)" : "var(--c1)"} />
        ))}
      </g>
      <circle className="cb22a-glow" cx="60" cy="50" r="26" fill="var(--c1)" opacity=".28" />
      <g className="cb22a-flame">
        <path d="M60 22c9 12 11 20 5 28-3 4-7 4-10 0-6-8-4-16 5-28z" fill="var(--c1)" />
        <path d="M60 34c4 6 5 10 2 14-1 2-3 2-4 0-3-4-2-8 2-14z" fill="#fff" opacity=".9" />
      </g>
      <path d="M28 62c8 18 56 18 64 0z" fill="var(--c2)" />
      <path d="M28 62c8 18 56 18 64 0" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="1.5" />
      <path d="M38 70c7 6 37 6 44 0" fill="none" stroke="var(--c3)" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="60" cy="86" rx="22" ry="3" fill="#000" opacity=".25" />
    </>
  ),
  colours: () => (
    <>
      {[
        [40, 46, 20, "var(--c1)"],
        [78, 40, 18, "var(--c2)"],
        [62, 74, 22, "var(--c3)"],
        [34, 80, 12, "#9FE7DC"],
        [88, 78, 13, "var(--c2)"],
      ].map(([x, y, r, c], i) => (
        <g key={i} className="cb22a-puff" style={{ "--k": i }}>
          <circle cx={x} cy={y} r={r} fill={c} opacity=".85" />
          <circle cx={x + r * 0.7} cy={y - r * 0.6} r={r * 0.35} fill={c} opacity=".7" />
          <circle cx={x - r * 0.8} cy={y + r * 0.4} r={r * 0.25} fill={c} opacity=".6" />
        </g>
      ))}
    </>
  ),
  bonfire: () => (
    <>
      <circle className="cb22a-glow" cx="60" cy="64" r="34" fill="var(--c1)" opacity=".22" />
      <g className="cb22a-flame">
        <path d="M60 24c16 18 20 32 10 46H50C40 56 46 42 60 24z" fill="var(--c3)" />
        <path d="M60 38c10 12 12 20 6 32H54c-6-12-4-20 6-32z" fill="var(--c1)" />
        <path d="M60 52c4 6 5 10 2 18h-4c-3-8-2-12 2-18z" fill="#fff" opacity=".85" />
      </g>
      <path d="M34 92l52-14M34 78l52 14" stroke="#8a5a2b" strokeWidth="8" strokeLinecap="round" />
    </>
  ),
  kite: () => (
    <>
      <path d="M68 70C80 92 96 98 112 104" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.2" strokeDasharray="3 3" />
      <g className="cb22a-sway">
        <path d="M60 14l26 30-26 30-26-30z" fill="var(--c1)" />
        <path d="M60 14v60M34 44h52" stroke="var(--c3)" strokeWidth="2.2" />
        <path d="M60 14l26 30H60z" fill="var(--c2)" opacity=".85" />
        <path d="M60 74c-4 8 4 12 0 20s4 12 0 18" fill="none" stroke="var(--c2)" strokeWidth="1.6" />
        <path d="M56 86l8-4-2 8zM56 100l8-4-2 8z" fill="var(--c3)" />
      </g>
    </>
  ),
  crescent: () => (
    <>
      <circle className="cb22a-glow" cx="52" cy="54" r="34" fill="var(--c1)" opacity=".2" />
      <path className="cb22a-rock" d="M66 18a38 38 0 1 0 0 72A30 30 0 1 1 66 18z" fill="var(--c1)" />
      <path className="cb22a-twinkle" d="M88 30l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" fill="#fff" />
      <g className="cb22a-swing">
        <path d="M92 52v14" stroke="var(--c1)" strokeWidth="1.5" />
        <path d="M86 66h12l3 6v12l-3 6H86l-3-6V72z" fill="var(--c3)" />
        <rect x="88" y="72" width="8" height="12" rx="2" fill="var(--c1)" className="cb22a-blink" />
      </g>
    </>
  ),
  lantern: () => (
    <>
      {[
        [38, 18, 1],
        [72, 8, 1.25],
        [96, 30, 0.85],
      ].map(([x, y, s], i) => (
        <g key={i} className="cb22a-swing" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
          <path d={`M${x} ${y}v${12 * s}`} stroke="var(--c2)" strokeWidth="1.4" />
          <ellipse className="cb22a-glow" cx={x} cy={y + 34 * s} rx={26 * s} ry={24 * s} fill="var(--c3)" opacity=".2" />
          <ellipse cx={x} cy={y + 34 * s} rx={16 * s} ry={20 * s} fill="var(--c1)" />
          <path d={`M${x - 16 * s} ${y + 34 * s}h${32 * s}M${x} ${y + 14 * s}v${40 * s}`} stroke="var(--c2)" strokeWidth="1.2" opacity=".7" />
          <rect x={x - 7 * s} y={y + 12 * s} width={14 * s} height={4 * s} rx="1" fill="var(--c2)" />
          <rect x={x - 7 * s} y={y + 52 * s} width={14 * s} height={4 * s} rx="1" fill="var(--c2)" />
          <path d={`M${x} ${y + 56 * s}v${10 * s}`} stroke="var(--c2)" strokeWidth="2" />
        </g>
      ))}
    </>
  ),
  xmas: () => (
    <>
      <path d="M60 22L84 56H72L92 84H28l20-28H36z" fill="var(--c1)" />
      <path d="M60 22L84 56H72L92 84H60z" fill="#000" opacity=".12" />
      <rect x="54" y="84" width="12" height="12" rx="2" fill="#8a5a2b" />
      {[
        [52, 48, "var(--c3)"],
        [68, 62, "var(--c2)"],
        [46, 72, "var(--c2)"],
        [74, 78, "var(--c3)"],
        [60, 66, "#fff"],
        [40, 80, "#fff"],
      ].map(([x, y, c], i) => (
        <circle key={i} className="cb22a-blink" style={{ "--k": i }} cx={x} cy={y} r="3.4" fill={c} />
      ))}
      <path className="cb22a-twinkle cb22a-spin" d="M60 8l3.5 8.5 9 1-7 5.5 2.5 8.5L60 26l-8 5.5 2.5-8.5-7-5.5 9-1z" fill="var(--c2)" />
      <rect x="80" y="86" width="16" height="12" rx="2" fill="var(--c3)" className="cb22a-hop" />
      <path d="M88 86v12M80 92h16" stroke="var(--c2)" strokeWidth="2" />
    </>
  ),
  tricolour: () => (
    <>
      <path d="M26 14v94" stroke="#cbd5e1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="26" cy="13" r="3" fill="var(--c2)" />
      <g className="cb22a-flag">
        <path d="M28 18c18-6 36 6 54 0s22-4 30 0v18c-8-4-12-6-30 0s-36-6-54 0z" fill="var(--c1)" />
        <path d="M28 36c18-6 36 6 54 0s22-4 30 0v18c-8-4-12-6-30 0s-36-6-54 0z" fill="var(--c2)" />
        <path d="M28 54c18-6 36 6 54 0s22-4 30 0v18c-8-4-12-6-30 0s-36-6-54 0z" fill="var(--c3)" />
        <g className="cb22a-spin" style={{ transformBox: "view-box", transformOrigin: "68px 45px" }}>
          <circle cx="68" cy="45" r="7" fill="none" stroke="#000080" strokeWidth="1.4" />
          {Array.from({ length: 12 }, (_, i) => (
            <path key={i} d={`M68 45l${(7 * Math.cos((i * Math.PI) / 6)).toFixed(2)} ${(7 * Math.sin((i * Math.PI) / 6)).toFixed(2)}`} stroke="#000080" strokeWidth=".8" />
          ))}
        </g>
      </g>
    </>
  ),
  fireworks: () => (
    <>
      {[
        [40, 40, 26, "var(--c1)"],
        [84, 34, 20, "var(--c2)"],
        [70, 80, 22, "var(--c3)"],
      ].map(([x, y, r, c], i) => (
        <g key={i} className="cb22a-pop" style={{ "--k": i, transformBox: "view-box", transformOrigin: `${x}px ${y}px` }}>
          {Array.from({ length: 12 }, (_, j) => {
            const a = (j * Math.PI) / 6;
            return <path key={j} d={`M${(x + r * 0.35 * Math.cos(a)).toFixed(1)} ${(y + r * 0.35 * Math.sin(a)).toFixed(1)}L${(x + r * Math.cos(a)).toFixed(1)} ${(y + r * Math.sin(a)).toFixed(1)}`} stroke={c} strokeWidth="2.4" strokeLinecap="round" />;
          })}
          <circle cx={x} cy={y} r="3" fill="#fff" />
        </g>
      ))}
    </>
  ),
  leaf: () => (
    <>
      <path d="M14 104c20-10 72-10 92 0" fill="none" stroke="var(--c2)" strokeOpacity=".5" strokeWidth="2" />
      <g className="cb22a-sway" style={{ transformBox: "view-box", transformOrigin: "60px 100px" }}>
        <path d="M60 100V54" stroke="var(--c1)" strokeWidth="3" strokeLinecap="round" />
        <path d="M60 64C38 64 26 48 26 26c22 0 34 14 34 38z" fill="var(--c1)" />
        <path d="M60 56c0-22 12-36 36-36 0 22-14 36-36 36z" fill="var(--c2)" />
        <path d="M60 64L36 36M60 56l26-26" stroke="#fff" strokeOpacity=".5" strokeWidth="1.4" />
      </g>
      <circle className="cb22a-twinkle" cx="96" cy="72" r="4" fill="var(--c3)" />
    </>
  ),
  ribbon: () => (
    <>
      <circle className="cb22a-halo" cx="60" cy="56" r="40" fill="none" stroke="var(--c1)" strokeWidth="2" />
      <circle className="cb22a-halo cb22a-halo--2" cx="60" cy="56" r="40" fill="none" stroke="var(--c2)" strokeWidth="2" />
      <g className="cb22a-breathe">
        <path d="M60 50C44 30 46 14 60 14s16 16 0 36zM60 50L38 96l12-2 6 10 4-30M60 50l22 46-12-2-6 10-4-30" fill="var(--c1)" />
        <path d="M60 50C44 30 46 14 60 14" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
      </g>
    </>
  ),
  sport: () => (
    <>
      <ellipse className="cb22a-shadow" cx="60" cy="102" rx="20" ry="4" fill="#000" opacity=".3" />
      <g className="cb22a-bounce">
        <circle cx="60" cy="50" r="24" fill="#fff" />
        <path d="M60 38l9 6-3 11H54l-3-11z" fill="#0B1437" />
        <path d="M60 26v12M69 44l12-4M66 55l7 10M54 55l-7 10M51 44l-12-4" stroke="#0B1437" strokeWidth="2" />
      </g>
      <path className="cb22a-twinkle" d="M96 22l2 6 6 2-6 2-2 6-2-6-6-2 6-2z" fill="var(--c2)" />
    </>
  ),
  coins: () => (
    <>
      {[0, 1, 2].map((i) => (
        <rect key={i} className="cb22a-bar" style={{ "--k": i }} x={18 + i * 16} y={56 - i * 14} width="11" height={44 + i * 14} rx="3" fill={i === 2 ? "var(--c3)" : "var(--c2)"} opacity={0.5 + i * 0.2} />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <ellipse key={i} cx="86" cy={98 - i * 8} rx="16" ry="5" fill="var(--c1)" stroke="#7a5414" strokeWidth="1" />
      ))}
      <g className="cb22a-drop">
        <circle cx="86" cy="40" r="12" fill="var(--c1)" stroke="#7a5414" strokeWidth="1.5" />
        <path d="M81 36h10M81 40h10M84 36c6 0 6 8 0 8l7 6" fill="none" stroke="#7a5414" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </>
  ),
  tech: () => (
    <>
      <g className="cb22a-spin-slow" style={{ transformBox: "view-box", transformOrigin: "60px 60px" }}>
        <circle cx="60" cy="60" r="46" fill="none" stroke="var(--c2)" strokeOpacity=".45" strokeDasharray="4 6" />
        <circle cx="106" cy="60" r="4" fill="var(--c2)" />
        <circle cx="14" cy="60" r="3" fill="var(--c3)" />
      </g>
      {Array.from({ length: 4 }, (_, i) => (
        <path key={i} d={`M${44 + i * 10} 30v10M${44 + i * 10} 80v10M30 ${44 + i * 10}h10M80 ${44 + i * 10}h10`} stroke="var(--c2)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <rect x="38" y="38" width="44" height="44" rx="8" fill="#0B1437" stroke="var(--c1)" strokeWidth="2.5" />
      <rect className="cb22a-breathe" x="50" y="50" width="20" height="20" rx="4" fill="var(--c1)" />
      <path d="M55 60h10M60 55v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  sale: () => (
    <>
      <g className="cb22a-swing" style={{ transformBox: "view-box", transformOrigin: "40px 18px" }}>
        <path d="M40 18v10" stroke="#fff" strokeWidth="1.4" />
        <path d="M24 28h32l8 10v34l-8 10H24z" fill="var(--c1)" />
        <circle cx="32" cy="36" r="3" fill="#0B1437" />
        <text x="40" y="66" textAnchor="middle" fontSize="20" fontWeight="800" fill="#fff" fontFamily="system-ui,sans-serif">%</text>
      </g>
      <g className="cb22a-hop" style={{ "--k": 1 }}>
        <path d="M70 52h34l-4 46H74z" fill="var(--c2)" />
        <path d="M78 52v-6a9 9 0 0 1 18 0v6" fill="none" stroke="var(--c2)" strokeWidth="3" />
        <path d="M80 66h18" stroke="#fff" strokeOpacity=".6" strokeWidth="2" />
      </g>
    </>
  ),
  survey: () => (
    <>
      <rect x="30" y="20" width="60" height="80" rx="8" fill="#fff" />
      <rect x="46" y="14" width="28" height="12" rx="4" fill="var(--c1)" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <path className="cb22a-tick" style={{ "--k": i }} d={`M40 ${44 + i * 18}l5 5 9-10`} fill="none" stroke="var(--c2)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="60" y={42 + i * 18} width={22 - i * 4} height="5" rx="2.5" fill="#cbd5e1" />
        </g>
      ))}
    </>
  ),
  hearts: () => (
    <>
      <g className="cb22a-orbit" style={{ transformBox: "view-box", transformOrigin: "60px 58px" }}>
        <path d="M100 58s-8-5-8-10a4 4 0 0 1 8-2 4 4 0 0 1 8 2c0 5-8 10-8 10z" fill="var(--c2)" />
        <path d="M20 58s-6-4-6-8a3 3 0 0 1 6-1.5 3 3 0 0 1 6 1.5c0 4-6 8-6 8z" fill="var(--c3)" />
      </g>
      <path className="cb22a-beat" d="M60 96S22 72 22 46a19 19 0 0 1 38-6 19 19 0 0 1 38 6c0 26-38 50-38 50z" fill="var(--c1)" />
      <path d="M38 40a10 10 0 0 1 10-8" fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  book: () => (
    <>
      <path d="M14 34c16-6 32-6 46 4 14-10 30-10 46-4v58c-16-6-32-6-46 4-14-10-30-10-46-4z" fill="#fff" />
      <path d="M60 38v58" stroke="#cbd5e1" strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <path key={i} d={`M22 ${48 + i * 9}h28M70 ${48 + i * 9}h28`} stroke="#cbd5e1" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <path className="cb22a-page" d="M60 38c10-7 24-8 40-4v58c-16-4-30-3-40 4z" fill="var(--c2)" opacity=".92" />
      <path d="M14 34c16-6 32-6 46 4 14-10 30-10 46-4" fill="none" stroke="var(--c1)" strokeWidth="2.5" />
    </>
  ),
  lotus: () => (
    <>
      <ellipse className="cb22a-ripple" cx="60" cy="92" rx="40" ry="8" fill="none" stroke="var(--c2)" strokeWidth="1.6" />
      <ellipse className="cb22a-ripple cb22a-ripple--2" cx="60" cy="92" rx="40" ry="8" fill="none" stroke="var(--c1)" strokeWidth="1.6" />
      {[-62, -32, 32, 62].map((a, i) => (
        <path key={i} className="cb22a-petal" style={{ "--a": a + "deg", "--k": i }} d="M60 88C48 70 50 46 60 30c10 16 12 40 0 58z" fill={i % 3 ? "var(--c1)" : "var(--c2)"} opacity=".85" />
      ))}
      <path d="M60 88C48 70 50 46 60 26c10 20 12 42 0 62z" fill="var(--c1)" />
      <path d="M60 88C55 70 56 50 60 36" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <circle className="cb22a-glow" cx="60" cy="56" r="30" fill="var(--c3)" opacity=".18" />
    </>
  ),
  dove: () => (
    <>
      <g className="cb22a-glide">
        <path d="M30 64c10-4 24-4 36 2l20-6-8 10c6 6 4 14-6 16-18 4-34-6-42-22z" fill="#fff" />
        <path className="cb22a-wing" d="M50 62C46 44 56 30 74 22c-2 16-8 30-24 40z" fill="var(--c1)" />
        <circle cx="80" cy="64" r="1.8" fill="#0B1437" />
        <path d="M86 60l8-1-6 5z" fill="var(--c3)" />
        <path d="M92 62c6 2 10 6 12 10M98 66l4-4M101 70l5-1" stroke="var(--c3)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      </g>
    </>
  ),
  halloween: () => (
    <>
      <path d="M60 30c-2-6 0-10 6-12" stroke="#0E9C88" strokeWidth="4" fill="none" strokeLinecap="round" />
      <ellipse cx="44" cy="64" rx="18" ry="30" fill="var(--c1)" />
      <ellipse cx="76" cy="64" rx="18" ry="30" fill="var(--c1)" />
      <ellipse cx="60" cy="64" rx="18" ry="32" fill="var(--c3)" />
      <g className="cb22a-blink" style={{ "--k": 0 }}>
        <path d="M44 56l8-8 8 8zM68 56l8-8 8 8z" fill="#3a1f00" />
        <path d="M40 74c10 10 30 10 40 0l-6 2-4-4-4 4-4-4-4 4-4-4-4 4z" fill="#3a1f00" />
      </g>
      <path className="cb22a-flap" d="M94 22c1-3 3-3 4 0 3-3 7-4 10-1-3 0-4 3-4 5-2-1-4-1-6 1-1-1-2-1-4-1s-3 0-4 1c-2-2-4-2-6-1 0-2-1-5-4-5 3-3 7-2 10 1z" fill="var(--c2)" />
    </>
  ),
  globe: () => (
    <>
      <circle cx="60" cy="60" r="38" fill="var(--c1)" opacity=".3" />
      <clipPath id="cb22-gl">
        <circle cx="60" cy="60" r="38" />
      </clipPath>
      <g clipPath="url(#cb22-gl)">
        <g className="cb22a-meridian">
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse key={i} cx={22 + i * 19} cy="60" rx="9" ry="38" fill="none" stroke="var(--c2)" strokeOpacity=".7" strokeWidth="1.3" />
          ))}
        </g>
        <path d="M22 48h76M22 72h76M30 36h60M30 84h60" stroke="var(--c2)" strokeOpacity=".45" strokeWidth="1.2" />
      </g>
      <circle cx="60" cy="60" r="38" fill="none" stroke="var(--c2)" strokeWidth="2" />
      <g className="cb22a-spin-slow" style={{ transformBox: "view-box", transformOrigin: "60px 60px" }}>
        <ellipse cx="60" cy="60" rx="54" ry="16" fill="none" stroke="var(--c3)" strokeOpacity=".7" strokeWidth="1.5" transform="rotate(-20 60 60)" />
        <circle cx="110" cy="42" r="4" fill="var(--c3)" />
      </g>
    </>
  ),
};

/* update 22b: Tabler icon outline (CB22_ICONS, src/data/Icons22.jsx) as SVG children of a 24×24 box */
function cb22IconNodes(name) {
  const n = CB22_ICONS[name];
  return n ? n.map(([t, a], i) => ee.createElement(t, { key: i, ...a })) : null;
}
/* which scene a day uses: its own festival scene, its own icon scene, or (older data) its motif */
function cb22Scene(ev) {
  const fest = ev.scene ? CB22_FEST[ev.scene] : null;
  if (fest) return { kind: "scene", pal: fest.pal, fx: fest.fx, Art: fest.art };
  if (ev.icon && ev.icon[0] && CB22_ICONS[ev.icon[0]]) {
    const a = ev.anim || {};
    return { kind: "icon", pal: CB22_PALS[(a.pal || 0) % CB22_PALS.length], fx: { g: ["__icon", (CB22_FX[ev.motif] || CB22_FX.globe).g[0]], k: CB22_FXK[(a.fx || 0) % CB22_FXK.length], n: 14 }, Art: () => <CB22_IconArt ev={ev} /> };
  }
  return { kind: "motif", pal: CB22_PAL[ev.motif] || CB22_PAL.globe, fx: null, Art: CB22_ART[ev.motif] || CB22_ART.globe };
}
function CB22_Art({ motif, Art }) {
  const A = Art || CB22_ART[motif] || CB22_ART.globe;
  return (
    <div className="cb22__art" aria-hidden="true">
      <span className="cb22__halo" />
      <svg viewBox="0 0 120 120" width="120" height="120">
        <A />
      </svg>
    </div>
  );
}
function CB22_Mini({ motif }) {
  const f = CB22_FX[motif] || CB22_FX.globe;
  return (
    <svg className="cb22__mini" viewBox="0 0 20 20" width="14" height="14" fill="currentColor" aria-hidden="true">
      {CB22_G[f.g[0]]}
    </svg>
  );
}
function CB22_Flag({ iso, flags, k }) {
  const svg = flags && flags[iso];
  if (flags && !svg) return null; // no HD flag for this country: leave it out rather than show an empty box
  return (
    <span className="cb22__flag" style={{ "--k": k }} title={iso}>
      {svg ? <img src={pc5FlagUrl(svg)} alt={iso + " flag"} width="48" height="36" decoding="async" /> : <i className="cb22__flag-wait" />}
    </span>
  );
}

function CB22_Card({ ev, day, onClose, closing, secs }) {
  const flags = pc5UseFlags();
  const sc = cb22Scene(ev);
  const pal = sc.pal;
  const fl = (ev.flags || []).slice(0, 4);
  const title = ev.title || ev.name;
  /* the countdown only runs while the banner is on screen, so it never closes (and moves the page) while the visitor
     is reading further down */
  const box = ee.useRef(null);
  const [away, setAway] = ee.useState(false);
  ee.useEffect(() => {
    const el = box.current;
    if (!el || typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(([e]) => setAway(!e.isIntersecting), { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <aside
      ref={box}
      className={(away ? "is-away " : "") + "cb22 cb22--" + (CB22_ART[ev.motif] ? ev.motif : "globe") + " cb22--" + (ev.importance || "medium") + " cb22--k-" + sc.kind + (ev.scene ? " cb22--s-" + ev.scene : "") + (closing ? " is-closing" : "")}
      aria-label={"Today: " + title}
      style={{ "--c1": pal[0], "--c2": pal[1], "--c3": pal[2] }}
    >
      <span className="cb22__grade" aria-hidden="true" />
      <span className="cb22__sheen" aria-hidden="true" />
      {!ev.solemn && (/festival/i.test(ev.category || "") || ev.importance === "major") ? (
        <span className="cb22__bunting" aria-hidden="true">
          {Array.from({ length: 26 }, (_, i) => (
            <i key={i} style={{ "--k": i }} />
          ))}
        </span>
      ) : null}
      <CB22_Fx motif={ev.motif} spec={sc.fx} icon={ev.icon && ev.icon[0]} />
      <CB22_Art motif={ev.motif} Art={sc.Art} />
      <div className="cb22__copy">
        <p className="cb22__eye">
          <span className="cb22__live" aria-hidden="true" />
          <span>Today</span>
          <span className="cb22__date">{cb22Long(day)}</span>
          <span className="cb22__cat">{CB22_CAT[ev.category] || ev.category || "Special day"}</span>
        </p>
        <p className="cb22__t">{title}</p>
        {ev.message ? <p className="cb22__m">{ev.message}</p> : null}
      </div>
      <div className="cb22__side">
        <div className="cb22__flags">
          {fl.map((iso, k) => (
            <CB22_Flag key={iso} iso={iso} flags={flags} k={k} />
          ))}
          {ev.global || !fl.length ? (
            <span className="cb22__world" style={{ "--k": fl.length }}>
              <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <circle cx="12" cy="12" r="9.5" />
                <path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" />
              </svg>
              Worldwide
            </span>
          ) : null}
        </div>
        {ev.also && ev.also.length ? (
          <div className="cb22__also">
            <b>Also today</b>
            {ev.also.map((a, i) => (
              <span key={i} className="cb22__chip" style={{ "--k": i }}>
                {a.flags && a.flags[0] && flags && flags[a.flags[0]] ? <img src={pc5FlagUrl(flags[a.flags[0]])} alt="" width="18" height="13" /> : <CB22_Mini motif={a.motif} />}
                {a.name}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {/* build 72 (Kunal): the banner shows for 10 seconds; this bar counts down and pauses while the visitor points at
          or tabs into the banner, then the banner leaves by itself */}
      <span className="cb22__timer" aria-hidden="true">
        <i style={{ animationDuration: secs + "s" }} onAnimationEnd={(e) => e.target === e.currentTarget && onClose()} />
      </span>
      <button type="button" className="cb22__x" onClick={onClose} aria-label={"Hide " + title}>
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
    </aside>
  );
}

/* build 72 (Kunal, 6 Nov): every visit shows today's banner again; it stays 10 seconds (the countdown pauses while the
   visitor points at it), then leaves with its closing animation and does not come back until the site is opened again */
const CB22_SECS = 10;
let cb22Gone = false;
const cb22Still = () => {
  try {
    return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
};
/* build 74: main.jsx waits briefly for today's calendar before the home page's first render (at most a moment) */
const cb22Ready = (ms) => Promise.race([cb22Load(), new Promise((ok) => setTimeout(ok, ms || 600))]);
function CB22_Banner() {
  const [day, setDay] = ee.useState(() => cb22Today());
  const [data, setData] = ee.useState(() => cb22D[day.slice(0, 4)] || null);
  const [gone, setGone] = ee.useState(cb22Gone);
  const [closing, setClosing] = ee.useState(false);
  const year = day.slice(0, 4);
  ee.useEffect(() => {
    let on = true;
    cb22Load(year).then((d) => on && d && setData((o) => (o === d ? o : d))); /* reloads on 1 January for the new year */
    return () => {
      on = false;
    };
  }, [year]);
  ee.useEffect(() => {
    const tz = (data && data.timezone) || CB22_TZ;
    setDay(cb22Today(tz));
    const t = setInterval(() => setDay(cb22Today(tz)), 60000); // the banner appears / disappears at midnight
    return () => clearInterval(t);
  }, [data]);
  const ev = ee.useMemo(() => cb22Pick(data, day), [data, day]);
  const secs = Math.max(3, Math.min(120, +((data && data.seconds) || CB22_SECS)));
  const close = ee.useCallback(() => {
    setClosing((c) => {
      if (c) return c;
      setTimeout(() => {
        cb22Gone = true;
        setGone(true);
        setClosing(false);
      }, 700);
      return true;
    });
  }, []);
  /* with reduced motion the countdown bar does not move, so a plain timer closes the banner */
  ee.useEffect(() => {
    if (!ev || gone || !cb22Still()) return undefined;
    const t = setTimeout(close, secs * 1000);
    return () => clearTimeout(t);
  }, [ev, gone, secs, close]);
  if (!ev || gone) return null;
  return (
    <div className={"cb22-wrap" + (closing ? " is-closing" : "")}>
      <CB22_Card ev={ev} day={day} onClose={close} closing={closing} secs={secs} />
    </div>
  );
}
/* build 72: start fetching the calendar as soon as the script runs, not after the page has been drawn */
if (typeof window !== "undefined" && typeof fetch === "function") {
  try {
    cb22Load();
  } catch (e) {}
}

/* ── intro splash ─────────────────────────────────────────────────────────────────────── */
const SP22_KEY = "fr-intro22";
const SP22_ENG = [
  { k: "mr", t: "Market Research", v: "Understand better", c: "#2F6BFF" },
  { k: "dm", t: "Digital Marketing", v: "Grow faster", c: "#6D4AFF" },
  { k: "it", t: "IT Development", v: "Build smarter", c: "#0E9C88" },
  { k: "af", t: "Accounts & Finance", v: "Manage with confidence", c: "#D99A2B" },
];
function sp22Should() {
  try {
    const q = location.search + (location.hash.includes("?") ? "&" + location.hash.split("?")[1] : "");
    const p = new URLSearchParams(q.replace(/^\?/, ""));
    if (p.get("intro") === "1" || window.__FR_INTRO === true) return true;
    if (p.get("intro") === "0" || window.__FR_INTRO === false) return false;
    // build 75: no intro on phones (lighter first screen)
    if (window.matchMedia && window.matchMedia("(max-width: 767px)").matches) return false;
    if (navigator.webdriver || /bot|crawl|spider|slurp|lighthouse|headless|preview/i.test(navigator.userAgent || "")) return false;
    return !sessionStorage.getItem(SP22_KEY);
  } catch (e) {
    return false;
  }
}
function SP22_Intro() {
  const [show, setShow] = ee.useState(() => (typeof window !== "undefined" ? sp22Should() : false));
  const [out, setOut] = ee.useState(false);
  const btn = ee.useRef(null);
  const gone = ee.useRef(false);
  const leave = ee.useCallback(() => {
    if (gone.current) return; /* the logo, Skip and the backdrop all call this; only the first counts */
    gone.current = true;
    try {
      sessionStorage.setItem(SP22_KEY, "1");
      sessionStorage.setItem("fr-hi", "1"); /* update 23: the opening sound replaces the welcome bell */
    } catch (e) {}
    /* update 23: opening sound (silent when the visitor has switched sound off) */
    frsPlay("intro");
    setOut(true);
    setTimeout(() => setShow(false), 1000);
  }, []);
  ee.useEffect(() => {
    if (!show) return;
    const h = document.documentElement;
    h.classList.add("sp22-lock");
    window.__sp22Open = true;
    const t = setTimeout(() => btn.current && btn.current.focus({ preventScroll: true }), 300);
    const key = (e) => {
      /* update 23: any key that means "go" opens the site */
      if (e.key === "Escape" || e.key === "Enter" || e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        leave();
      }
    };
    window.addEventListener("keydown", key);
    /* update 26: the intro opens the site by itself after 5 seconds if nobody clicks (the countdown starts once the
       tab is actually visible, so a page opened in a background tab still shows its intro) */
    let auto = 0;
    const arm = () => {
      if (!auto && !document.hidden) auto = setTimeout(leave, 5000);
    };
    arm();
    document.addEventListener("visibilitychange", arm);
    return () => {
      clearTimeout(t);
      clearTimeout(auto);
      document.removeEventListener("visibilitychange", arm);
      window.__sp22Open = false;
      h.classList.remove("sp22-lock");
      window.removeEventListener("keydown", key);
    };
  }, [show, leave]);
  ee.useEffect(() => {
    if (out) document.documentElement.classList.remove("sp22-lock");
  }, [out]);
  if (!show) return null;
  /* build 81.1 (Kunal, 12 Nov: "another attractive animated intro"): a jump through space; the Frequent Research planet
     rises with the four teams as moons, the logo lands on it, the name builds letter by letter, and a click (or 5 s)
     zooms into the site. Styles: design81/hx81.css (.i81*). */
  const warp = [];
  for (let i = 0; i < 28; i++) warp.push(<i key={i} style={{ "--a": (i * 360) / 28 + cb22R(i, 9) * 8 + "deg", "--d": (cb22R(i, 10) * 0.6).toFixed(2) + "s" }} />);
  const node = (
    <div className={"i81" + (out ? " is-out" : "")} onClick={leave} role="dialog" aria-modal="true" aria-label="Welcome to Frequent Research">
      <i className="i81__stars" aria-hidden="true" />
      <i className="i81__stars i81__stars--2" aria-hidden="true" />
      <div className="i81__warp" aria-hidden="true">{warp}</div>
      <div className="i81__stage">
        <Planet81 labels />
        <button ref={btn} type="button" className="i81__logo" onClick={leave} aria-label="Enter the Frequent Research website">
          <FRL_FR kind="icon" calm tilt={0} alt="" />
        </button>
      </div>
      <div className="i81__copy">
        <p className="i81__brand" aria-label="Frequent Research">
          {"Frequent Research".split("").map((ch, i) => <span key={i} aria-hidden="true" style={{ "--i": i }}>{ch === " " ? "\u00a0" : ch}</span>)}
        </p>
        <p className="i81__line">
          {SP22_ENG.map((e, i) => <span key={e.k} style={{ "--i": i, "--c": e.c }}>{e.v}</span>)}
        </p>
        <p className="i81__hint">Tap anywhere to enter</p>
        <span className="i81__timer" aria-hidden="true"><i /></span>
      </div>
      <button type="button" className="i81__skip" onClick={leave}>
        Skip intro
      </button>
    </div>
  );
  return typeof ci !== "undefined" && ci.createPortal ? ci.createPortal(node, document.body) : node;
}

export { CB22_ART, CB22_Banner, CB22_G, cb22IconNodes, cb22Ready, SP22_Intro };
