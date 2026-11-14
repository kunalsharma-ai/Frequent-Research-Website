/*
 * FR kit (build 51) — shared helpers for the build-51 overlay modules. Prefix FRK_ / frk.
 * Styles: src/styles/fr-kit.css (prefix frk-).
 *
 *  - FRK_V        the four service "worlds" (colour, gradient, icon) used by reviews, FAQs, brochures, PDFs
 *  - FRK_I        a small stroke-icon set (independent of the base RC_I list)
 *  - frkCountry   country lookup on the site's country list `PHONE_COUNTRIES` (flag sprite index, calling code)
 *  - FRK_Country  searchable country select with flags (portal popover, keyboard accessible)
 *  - FRK_Captcha  CAPTCHA: server challenge from GET /api/captcha when the backend has it, otherwise a
 *                 locally drawn challenge (client-side only — see README "CAPTCHA")
 *  - frkPost      JSON POST with a "preview" result when there is no backend (same contract as fmPost)
 *  - FRK_SamLogo  animated Sampledge logo (SVG mark + wordmark image with a light sweep)
 *  - FRK_Emblem   the round Frequent Research emblem as an image (used as a watermark on pages)
 *  - frkPdf       a small layer over the bundled jsPDF (`dt`) for branded, watermarked PDFs
 * Nothing here is downloaded at runtime: images are inlined at build (moved to /assets/img by prerender).
 */
import { frPdf } from '../../app/pdf.js';
import * as ee from 'react';
import { PHONE_COUNTRIES, phoneError } from '../../app/data/phoneCountries.jsx';
import { RC_useInView } from '../../app/shared/Reveal.jsx';
import { CC_Flag, CC_Picker, ccPortal } from './CountryPicker.jsx';
import { FRL_FR } from './Logos13.jsx';

const FRK_EMBLEM = "__IMG:brand/fr-emblem__";
const FRK_EMBLEM_SM = "__IMG:brand/fr-emblem-sm__";
const FRK_LOGO_FULL = "__IMG:brand/fr-full__";
const FRK_LOGO_T2O = "__IMG:brand/turn2opinion__";
const FRK_LOGO_MFR = "__IMG:brand/myfrequentrewards__";
const FRK_LOGO_MHO = "__IMG:brand/myhealthopinions__";
const FRK_LOGO_SAM_WHITE = "__IMG:brand/sampledge-white__";
const FRK_SAM_LIGHT = "__IMG:sampledge/logo-light__"; /* white wordmark, for dark backgrounds */
const FRK_SAM_DARK = "__IMG:sampledge/logo-dark__"; /* navy wordmark, for light backgrounds */

const frkReduce = () => typeof window !== "undefined" && ((window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const frkIn = (t = 0.2) => RC_useInView(t);
let FRK_UID = 0;
const frkUid = (p = "frk") => p + "-" + ++FRK_UID;

/* ── the four service worlds ─────────────────────────────────────────────────────────── */
const FRK_V = {
  "market-research": { k: "mr", name: "Market Research", short: "Research", c1: "#1E5BFF", c2: "#22D3EE", deep: "#071A6B", soft: "#E8F0FF", ink: "#0A1E7A", ic: "lens", rgb: [30, 91, 255] },
  "digital-marketing": { k: "dm", name: "Digital Marketing", short: "Digital", c1: "#F0457E", c2: "#FF9F43", deep: "#5B0B33", soft: "#FFEAF1", ink: "#8A1240", ic: "spark", rgb: [240, 69, 126] },
  "it-development": { k: "it", name: "IT & Development", short: "Technology", c1: "#7C4DFF", c2: "#2EE6A6", deep: "#1B0B5E", soft: "#F0EBFF", ink: "#3A1C9C", ic: "code", rgb: [124, 77, 255] },
  "accounts-finance": { k: "af", name: "Finance & Accounts", short: "Finance", c1: "#0F9D74", c2: "#F4C152", deep: "#053B2C", soft: "#E6F7F1", ink: "#0A5C45", ic: "coin", rgb: [15, 157, 116] },
};
const FRK_VKEYS = Object.keys(FRK_V);
const frkV = (slug) => FRK_V[slug] || FRK_V["market-research"];
const frkVStyle = (slug) => {
  const v = frkV(slug);
  return { "--v1": v.c1, "--v2": v.c2, "--vd": v.deep, "--vs": v.soft, "--vi": v.ink };
};
/* vertical from the current path, for components that sit inside a service page */
const frkVFromPath = (p) => {
  const m = /\/services\/([a-z-]+)/.exec(p || (typeof location !== "undefined" ? location.pathname + location.hash : ""));
  return m && FRK_V[m[1]] ? m[1] : null;
};
/* stable small hash, used to vary art per item (blog covers, FAQ hues) */
const frkHash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < (s || "").length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};

/* ── icons ───────────────────────────────────────────────────────────────────────────── */
const FRK_P = {
  lens: "M11 4a7 7 0 1 1 0 14 7 7 0 0 1 0-14zM20 20l-4-4",
  spark: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M14 5l-4 14",
  coin: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM9 9.5c0-1 1.3-1.8 3-1.8s3 .8 3 1.8-1 1.5-3 2-3 1-3 2 1.3 1.8 3 1.8 3-.8 3-1.8M12 6.5v11",
  star: "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4L2.8 9.5l6.4-.8z",
  check: "M5 12.5l4.2 4.2L19 7",
  x: "M6 6l12 12M18 6L6 18",
  arrow: "M5 12h14M13 6l6 6-6 6",
  back: "M19 12H5M11 6l-6 6 6 6",
  down: "M12 4v12M6 11l6 6 6-6M5 20h14",
  file: "M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8zM14 3v5h5M9 13h6M9 17h4",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
  phone: "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
  globe: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18",
  building: "M4 21V5l8-2v18M12 7l8 3v11M8 8v.01M8 12v.01M8 16v.01M16 13v.01M16 17v.01M2 21h20",
  brief: "M4 8h16v11H4zM9 8V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V8M4 13h16M11 13v2h2v-2",
  badge: "M12 3l2.4 1.8 3 .2.8 2.9 2.1 2.1-1 2.8 1 2.8-2.1 2.1-.8 2.9-3 .2L12 21l-2.4-1.8-3-.2-.8-2.9L3.7 14l1-2.8-1-2.8 2.1-2.1.8-2.9 3-.2z",
  chat: "M4 5h16v11H9l-5 4z",
  send: "M4 12l16-8-6 16-2.5-6.5z",
  refresh: "M20 11a8 8 0 1 0-2.3 5.7M20 4v7h-7",
  shield: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6z",
  lock: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  clock: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7v5l3 2",
  map: "M9 4l6 2 5-2v14l-5 2-6-2-5 2V6zM9 4v14M15 6v14",
  target: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zM12 11a1 1 0 1 1 0 2 1 1 0 0 1 0-2",
  users: "M9 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7zM2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 6.5M18 14a6 6 0 0 1 3.5 6",
  bars: "M5 20V10M10 20V4M15 20v-7M20 20v-11",
  pie: "M12 3v9h9a9 9 0 1 1-9-9zM15 3.5A9 9 0 0 1 20.5 9H15z",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  bulb: "M9 18h6M10 21h4M12 3a6 6 0 0 1 3.5 10.9c-.6.5-1 1.2-1 2V16h-5v-.1c0-.8-.4-1.5-1-2A6 6 0 0 1 12 3z",
  flag: "M5 21V4M5 4h11l-2 4 2 4H5",
  rocket: "M12 15l-3-3c1-4 4-8 9-9-1 5-5 8-9 9M9 12l-4 1 2-4M12 15l-1 4 4-2M7 17l-3 3",
  quote: "M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6",
  play: "M8 5l11 7-11 7z",
  pause: "M8 5v14M16 5v14",
  sound: "M4 9v6h4l5 4V5L8 9zM16.5 9a4 4 0 0 1 0 6M19 6.5a7.5 7.5 0 0 1 0 11",
  mute: "M4 9v6h4l5 4V5L8 9zM17 9l4 6M21 9l-4 6",
  minus: "M5 12h14",
  plus: "M12 5v14M5 12h14",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 21h8M9 17h6",
  heart: "M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z",
  link: "M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1",
  info: "M12 3a9 9 0 1 1 0 18 9 9 0 0 1 0-18zM12 11v6M12 7.5v.01",
  eye: "M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z",
  grid: "M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z",
  whatsapp: "M4 20l1.3-4A8 8 0 1 1 8 18.7zM9 8.5c.3 2.6 2.4 5 5.2 5.8l1.3-1.3 2 1-.5 1.6c-4 .3-8.3-3.6-8.5-7.6L10 7.5l1 2z",
};
function FRK_I({ n, s = 20, className = "", sw = 1.8 }) {
  const d = FRK_P[n] || FRK_P.info;
  return (
    <svg className={"frk-i " + className} width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  );
}
const FRK_Stars = ({ n = 5, s = 16, label = true }) => (
  <span className="frk-stars" role={label ? "img" : undefined} aria-label={label ? `${n} out of 5 stars` : undefined} aria-hidden={label ? undefined : "true"}>
    {[1, 2, 3, 4, 5].map((i) => (
      <svg key={i} viewBox="0 0 24 24" width={s} height={s} className={i <= Math.round(n) ? "is-on" : ""} aria-hidden="true">
        <path d={FRK_P.star} />
      </svg>
    ))}
  </span>
);

/* ── countries ──────────────────────────────────────────────────────────────────────── */
const frkList = () => PHONE_COUNTRIES;
const frkCountry = (iso) => frkList().find((o) => o.iso === iso) || null;
const frkCountryByName = (name) => {
  const n = (name || "").trim().toLowerCase();
  if (!n) return null;
  return frkList().find((o) => o.name.toLowerCase() === n) || frkList().find((o) => o.name.toLowerCase().startsWith(n)) || null;
};
const FRK_Flag = ({ iso, title }) => {
  const c = frkCountry(iso);
  return (
    <span className="frk-flag" title={title ? (c ? c.name : iso) : undefined}>
      <CC_Flag fi={c ? c.fi : -1} />
    </span>
  );
};
const frkNorm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");

/* searchable country select (name + flag). value = ISO code or "". */
function FRK_Country({ id, value, onChange, onBlur, invalid, describedBy, placeholder = "Select your country" }) {
  const list = frkList().filter((o) => !o.other);
  const cur = list.find((o) => o.iso === value) || null;
  const [open, setOpen] = ee.useState(false);
  const [q, setQ] = ee.useState("");
  const [act, setAct] = ee.useState(0);
  const [pos, setPos] = ee.useState(null);
  const btn = ee.useRef(null),
    pop = ee.useRef(null),
    inp = ee.useRef(null),
    ul = ee.useRef(null);
  const lid = (id || "frk-cty") + "-list";
  const items = ee.useMemo(() => {
    const n = frkNorm(q.trim());
    if (!n) return [{ head: "Popular" }, ...list.filter((o) => o.top), { head: "All countries" }, ...list.filter((o) => !o.top)];
    return list.filter((o) => frkNorm(o.name).includes(n) || o.iso.toLowerCase() === n);
  }, [q]);
  const opts = items.filter((x) => !x.head);
  const place = () => {
    const b = btn.current;
    if (!b) return;
    const r = b.getBoundingClientRect(),
      vw = window.innerWidth,
      vh = window.innerHeight;
    const w = Math.min(Math.max(r.width, 260), vw - 24);
    const left = Math.max(12, Math.min(r.left, vw - w - 12));
    const below = vh - r.bottom;
    const up = below < 280 && r.top > below;
    setPos({ left, width: w, maxHeight: Math.max(200, Math.min(380, (up ? r.top : below) - 16)), top: up ? undefined : r.bottom + 6, bottom: up ? vh - r.top + 6 : undefined });
  };
  const close = (focus) => {
    setOpen(false);
    if (focus && btn.current) btn.current.focus();
  };
  const choose = (o) => {
    onChange(o.iso);
    close(true);
    onBlur && onBlur();
  };
  ee.useEffect(() => {
    if (!open) return;
    setAct(q ? 0 : Math.max(0, opts.findIndex((o) => o.iso === value)));
  }, [open, q]);
  ee.useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inp.current && inp.current.focus(), 10);
    const away = (e) => {
      if ((pop.current && pop.current.contains(e.target)) || (btn.current && btn.current.contains(e.target))) return;
      close(false);
    };
    const re = () => place();
    document.addEventListener("mousedown", away, true);
    document.addEventListener("touchstart", away, true);
    window.addEventListener("resize", re);
    window.addEventListener("scroll", re, true);
    return () => {
      clearTimeout(t);
      document.removeEventListener("mousedown", away, true);
      document.removeEventListener("touchstart", away, true);
      window.removeEventListener("resize", re);
      window.removeEventListener("scroll", re, true);
    };
  }, [open]);
  ee.useEffect(() => {
    if (!open || !ul.current) return;
    const el = ul.current.querySelector('[data-i="' + act + '"]');
    if (el && el.scrollIntoView) el.scrollIntoView({ block: "nearest" });
  }, [act, open]);
  const onKey = (e) => {
    if (e.key === "ArrowDown") (e.preventDefault(), setAct((a) => Math.min(opts.length - 1, a + 1)));
    else if (e.key === "ArrowUp") (e.preventDefault(), setAct((a) => Math.max(0, a - 1)));
    else if (e.key === "Enter") (e.preventDefault(), opts[act] && choose(opts[act]));
    else if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) e.nativeEvent.stopImmediatePropagation();
      close(true);
    } else if (e.key === "Tab") close(false);
  };
  let n = -1;
  return (
    <>
      <button
        ref={btn}
        id={id}
        type="button"
        className={"frk-cty" + (cur ? " has-v" : "") + (invalid ? " is-bad" : "")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy}
        onClick={() => (open ? close(false) : (place(), setQ(""), setOpen(true)))}
        onKeyDown={(e) => {
          if ((e.key === "ArrowDown" || e.key === "ArrowUp") && !open) {
            e.preventDefault();
            place();
            setOpen(true);
          }
        }}
      >
        {cur ? <CC_Flag fi={cur.fi} /> : <FRK_I n="globe" s={18} />}
        <span className="frk-cty__v">{cur ? cur.name : placeholder}</span>
        <i className="frk-cty__caret" aria-hidden="true" />
      </button>
      {open &&
        pos &&
        ccPortal(
          <div ref={pop} className="cc-pop frk-cty-pop" style={pos} onKeyDown={onKey}>
            <div className="cc-pop__search">
              <FRK_I n="lens" s={16} />
              <input
                ref={inp}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search country"
                aria-label="Search country"
                role="combobox"
                aria-expanded="true"
                aria-controls={lid}
                aria-autocomplete="list"
                aria-activedescendant={opts[act] ? lid + "-" + opts[act].iso : undefined}
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <ul ref={ul} id={lid} className="cc-pop__list" role="listbox" aria-label="Countries">
              {items.map((o, i) => {
                if (o.head)
                  return (
                    <li key={"h" + i} className="cc-pop__head" role="presentation">
                      {o.head}
                    </li>
                  );
                n++;
                const idx = n;
                return (
                  <li
                    key={o.iso}
                    id={lid + "-" + o.iso}
                    data-i={idx}
                    role="option"
                    aria-selected={o.iso === value}
                    className={"cc-opt" + (idx === act ? " is-act" : "") + (o.iso === value ? " is-sel" : "")}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      choose(o);
                    }}
                    onMouseEnter={() => setAct(idx)}
                  >
                    <CC_Flag fi={o.fi} />
                    <span className="cc-opt__name">{o.name}</span>
                  </li>
                );
              })}
              {!opts.length && (
                <li className="cc-pop__none" role="presentation">
                  No country matches “{q}”.
                </li>
              )}
            </ul>
          </div>
        )}
    </>
  );
}

/* ── validation (shared rules) ──────────────────────────────────────────────────────── */
const FRK_RX_NAME = /^[\p{L}][\p{L} .'’-]*$/u;
const FRK_DISPOSABLE = /@(mailinator|guerrillamail|10minutemail|tempmail|yopmail|trashmail|sharklasers|getnada|dispostable|maildrop)\./i;
const frkRule = {
  first: (v) => {
    const s = (v || "").trim();
    if (!s) return "Enter your first name.";
    if (s.length < 2) return "Your first name needs at least 2 letters.";
    if (s.length > 40) return "Keep this under 40 characters.";
    return FRK_RX_NAME.test(s) ? "" : "Use letters only (spaces, dots, apostrophes and hyphens are fine).";
  },
  last: (v, req) => {
    const s = (v || "").trim();
    if (!s) return req ? "Enter your last name." : "";
    if (s.length > 40) return "Keep this under 40 characters.";
    return FRK_RX_NAME.test(s) ? "" : "Use letters only.";
  },
  email: (v) => {
    const e = (v || "").trim();
    if (!e) return "Enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) || e.length > 160) return "Enter a valid email, like name@company.com.";
    if (FRK_DISPOSABLE.test(e)) return "Please use a permanent work or personal email.";
    return "";
  },
  country: (v) => (v ? "" : "Choose your country."),
  phone: (p, req) => {
    const num = ((p && p.number) || "").trim();
    if (!num) return req ? "Enter your phone number." : "";
    return phoneError(p.country, num, p.otherCode || "");
  },
  text: (v, max, label, req) => {
    const s = (v || "").trim();
    if (!s) return req ? `Enter your ${label}.` : "";
    return s.length > max ? `Keep this under ${max} characters.` : "";
  },
};
const frkPhoneCode = (p) => {
  const c = frkCountry(p && p.country);
  if (!c) return "";
  return c.other ? "+" + String(p.otherCode || "").replace(/^\+/, "") : c.code;
};
/* plain-text clamp for anything we echo back or store locally */
const frkText = (v, max) =>
  typeof v === "string"
    ? v
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
        .replace(/<[^>]*>/g, "")
        .replace(/\s+/g, " ")
        .trim()
        .slice(0, max)
    : "";

/* JSON POST. { ok:true, j } | { ok:false, error, errors } | { preview:true } (no backend: HTML 404 / network error) */
async function frkPost(url, body) {
  try {
    const r = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(body) });
    const isJson = (r.headers.get("content-type") || "").includes("json");
    const j = isJson ? await r.json().catch(() => ({})) : {};
    if (r.ok && j.ok !== false && isJson) return { ok: true, j };
    if (!isJson || r.status === 404 || r.status === 405 || r.status === 501) return { preview: true };
    return { ok: false, error: j.error || "Your request could not be sent.", errors: j.errors, status: r.status };
  } catch (e) {
    return { preview: true };
  }
}
const frkStore = {
  get(k, d = null) {
    try {
      const v = localStorage.getItem(k);
      return v == null ? d : JSON.parse(v);
    } catch (e) {
      return d;
    }
  },
  set(k, v) {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  },
};
/* details a visitor already typed into one of our gated forms (download, case study, review) */
const FRK_LEAD_KEY = "fr-lead-v1";
const frkLead = () => frkStore.get(FRK_LEAD_KEY, null);
const frkSaveLead = (v) => frkStore.set(FRK_LEAD_KEY, { first: v.first, last: v.last, email: v.email, country: v.country, company: v.company, designation: v.designation, phone: v.phone });

/* ── CAPTCHA ─────────────────────────────────────────────────────────────────────────────
   Server mode: GET /api/captcha → { ok, id, svg }  (svg = the challenge picture, answer kept server-side,
   signed into `id`). The form sends { captchaId, captcha } and the backend verifies it.
   Local mode (no endpoint): a 5-character code drawn on a canvas, checked in the browser. That stops casual
   bots on a static preview but is NOT a security control — production needs the server mode (README). */
const FRK_CAPTCHA_URL = "/api/v1/captcha";
const FRK_CAP_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function frkDrawCaptcha(canvas, code) {
  const ctx = canvas.getContext("2d");
  const W = (canvas.width = 168),
    H = (canvas.height = 56);
  const g = ctx.createLinearGradient(0, 0, W, H);
  g.addColorStop(0, "#EEF3FF");
  g.addColorStop(1, "#F7EEFF");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 7; i++) {
    ctx.strokeStyle = `hsla(${(i * 47) % 360},70%,55%,.35)`;
    ctx.lineWidth = 1 + Math.random() * 1.5;
    ctx.beginPath();
    ctx.moveTo(Math.random() * W, Math.random() * H);
    ctx.bezierCurveTo(Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H, Math.random() * W, Math.random() * H);
    ctx.stroke();
  }
  [...code].forEach((ch, i) => {
    ctx.save();
    ctx.translate(18 + i * 30, 30 + (Math.random() * 10 - 5));
    ctx.rotate((Math.random() - 0.5) * 0.55);
    ctx.font = `800 ${26 + Math.floor(Math.random() * 6)}px Manrope, system-ui, sans-serif`;
    ctx.fillStyle = ["#0B22A8", "#7C4DFF", "#C2185B", "#0F7A5C", "#1E5BFF"][i % 5];
    ctx.textBaseline = "middle";
    ctx.fillText(ch, 0, 0);
    ctx.restore();
  });
  for (let i = 0; i < 60; i++) {
    ctx.fillStyle = `rgba(20,25,61,${Math.random() * 0.25})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1.4, 1.4);
  }
}
function FRK_Captcha({ id, value, onChange, error, onBlur, tone = "light" }) {
  const [mode, setMode] = ee.useState("load"); /* load | server | local */
  const [svg, setSvg] = ee.useState("");
  const [cid, setCid] = ee.useState("");
  const [n, setN] = ee.useState(0);
  const code = ee.useRef("");
  const cv = ee.useRef(null);
  ee.useEffect(() => {
    let live = true;
    setMode("load");
    fetch(FRK_CAPTCHA_URL + "?t=" + Date.now(), { headers: { Accept: "application/json" }, cache: "no-store" })
      .then((r) => ((r.headers.get("content-type") || "").includes("json") && r.ok ? r.json() : null))
      .then((j) => {
        if (!live) return;
        if (j && j.ok && j.id && typeof j.svg === "string" && /^<svg[\s>]/.test(j.svg.trim())) {
          setSvg(frkSafeSvg(j.svg));
          setCid(j.id);
          setMode("server");
        } else setMode("local");
      })
      .catch(() => live && setMode("local"));
    return () => {
      live = false;
    };
  }, [n]);
  ee.useEffect(() => {
    if (mode !== "local") return;
    let c = "";
    const a = new Uint32Array(5);
    (window.crypto || window.msCrypto).getRandomValues(a);
    a.forEach((x) => (c += FRK_CAP_CHARS[x % FRK_CAP_CHARS.length]));
    code.current = c;
    if (cv.current) frkDrawCaptcha(cv.current, c);
  }, [mode, n]);
  ee.useEffect(() => {
    onChange({ answer: value ? value.answer : "", id: cid, mode, ok: mode === "local" ? (value && value.answer || "").trim().toUpperCase() === code.current : null });
  }, [cid, mode, n]);
  const set = (e) => {
    const answer = e.target.value.replace(/\s/g, "").slice(0, 8);
    onChange({ answer, id: cid, mode, ok: mode === "local" ? answer.toUpperCase() === code.current : null });
  };
  const eid = id + "-err";
  return (
    <div className={"frk-cap frk-cap--" + tone + (error ? " is-bad" : "")}>
      <div className="frk-cap__pic" aria-hidden="true">
        {mode === "server" ? <span className="frk-cap__svg" dangerouslySetInnerHTML={{ __html: svg }} /> : mode === "local" ? <canvas ref={cv} width="168" height="56" /> : <span className="frk-cap__load" />}
      </div>
      <button type="button" className="frk-cap__new" onClick={() => setN((x) => x + 1)} aria-label="Show a new security code">
        <FRK_I n="refresh" s={18} />
      </button>
      <label className="frk-cap__in">
        <span className="frk-sr">Type the characters shown in the picture</span>
        <input
          id={id}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          placeholder="Type the code"
          value={(value && value.answer) || ""}
          onChange={set}
          onBlur={onBlur}
          aria-invalid={!!error}
          aria-describedby={error ? eid : undefined}
          maxLength={8}
        />
      </label>
      {error && (
        <em className="frk-err" id={eid} role="alert">
          {error}
        </em>
      )}
    </div>
  );
}
const frkCaptchaErr = (c) => {
  if (!c || !(c.answer || "").trim()) return "Type the security code shown.";
  if (c.mode === "local" && !c.ok) return "That code doesn't match. Try again or tap ↻ for a new one.";
  if (c.mode === "load") return "The security code is still loading.";
  return "";
};
/* the server SVG comes from our own endpoint; still, only allow plain shapes and text */
const frkSafeSvg = (s) => (/<(script|foreignObject|iframe|image)|on\w+=|javascript:/i.test(s) ? "" : s);

/* ── field shell ─────────────────────────────────────────────────────────────────────── */
function FRK_Field({ id, label, req, error, hint, icon, children, full, ok }) {
  return (
    <div className={"frk-f" + (full ? " frk-f--full" : "") + (error ? " is-bad" : ok ? " is-ok" : "")}>
      <label className="frk-f__l" htmlFor={id}>
        {label}
        {req ? (
          <b className="frk-req" aria-hidden="true">
            *
          </b>
        ) : (
          <small className="frk-opt">optional</small>
        )}
      </label>
      <div className="frk-f__box">
        {icon && <FRK_I n={icon} s={18} className="frk-f__ic" />}
        {children}
        {ok && !error && <FRK_I n="check" s={16} className="frk-f__ok" />}
      </div>
      {error ? (
        <em className="frk-err" id={id + "-err"} role="alert">
          {error}
        </em>
      ) : hint ? (
        <small className="frk-hint">{hint}</small>
      ) : null}
    </div>
  );
}
/* phone number with flag + calling code (uses the site picker) */
function FRK_Phone({ id, value, onChange, onBlur, error }) {
  const cty = frkCountry(value.country) || {};
  return (
    <div className={"frk-phone" + (error ? " is-bad" : "")}>
      <CC_Picker value={value.country} onChange={(iso) => onChange({ ...value, country: iso, otherCode: "" })} label="Phone country code" />
      {cty.other && <input className="frk-phone__cc" type="text" inputMode="tel" aria-label="Country code" placeholder="+" value={value.otherCode || ""} onChange={(e) => onChange({ ...value, otherCode: e.target.value })} maxLength={5} />}
      <input id={id} type="tel" inputMode="tel" autoComplete="tel-national" value={value.number} onChange={(e) => onChange({ ...value, number: e.target.value })} onBlur={onBlur} aria-invalid={!!error} aria-describedby={error ? id + "-err" : undefined} maxLength={20} placeholder="Phone number" />
    </div>
  );
}

/* generic gated-download form state: fields → errors → submit. `req` lists required keys. */
function frkUseForm(initial, rules) {
  const [v, setV] = ee.useState(initial);
  const [touched, setT] = ee.useState({});
  const [forced, setF] = ee.useState(false);
  const err = (k) => (rules[k] ? rules[k](v[k], v) : "");
  const show = (k) => ((touched[k] || forced) && err(k)) || "";
  const ok = (k) => (touched[k] || forced) && !err(k) && !!v[k] && (typeof v[k] !== "object" || v[k].number || v[k].answer || Array.isArray(v[k]) && v[k].length);
  const set = (k) => (x) => setV((o) => ({ ...o, [k]: x && x.target ? (x.target.type === "checkbox" ? x.target.checked : x.target.value) : x }));
  // an untouched empty field stays neutral when the visitor tabs past it; Continue / Send flags it (touch / check)
  const filled = (x) => (x && typeof x === "object" && !Array.isArray(x) ? !!(x.number || x.answer) : Array.isArray(x) ? x.length > 0 : x !== "" && x != null && x !== false);
  const blur = (k) => () => { if (filled(v[k])) setT((o) => ({ ...o, [k]: true })); };
  const check = () => {
    setF(true);
    return Object.keys(rules).filter((k) => err(k));
  };
  /* build 55: validate only some fields (multi-step forms) — marks them touched and returns the failing keys */
  const touch = (ks) => {
    setT((o) => {
      const n = { ...o };
      ks.forEach((k) => (n[k] = true));
      return n;
    });
    return ks.filter((k) => err(k));
  };
  return { v, setV, set, blur, show, ok, err, check, touch };
}

/* ── brand marks ─────────────────────────────────────────────────────────────────────── */
function FRK_Emblem({ className = "", size = 120, spin }) {
  return (
    <span className={"frk-emb" + (spin ? " frk-emb--spin" : "") + " " + className} style={{ "--s": size + "px" }} aria-hidden="true">
      <i className="frk-emb__ring" />
      <span className="frk-emb__live" style={{ "--h": "calc(var(--s) * 1.02)" }}>
          <FRL_FR kind="icon" tilt={8} rich />
        </span>
    </span>
  );
}
/* Animated Sampledge logo: the mark is drawn in SVG (gradient tile, ring, three orbiting dots); the
   wordmark is the supplied logo artwork (public/images/sampledge/logo-*.webp) cropped to the word, with a light
   sweep masked to the letters. tone: "light" text on dark
   backgrounds (default) or "dark" text on light backgrounds. */
function FRK_SamLogo({ tone = "light", h = 34, word = true, className = "", label = "Sampledge" }) {
  const uid = ee.useMemo(() => frkUid("sam"), []);
  return (
    <span className={"frk-sam frk-sam--" + tone + " " + className} style={{ "--h": h + "px" }} role="img" aria-label={label}>
      <svg className="frk-sam__mark" viewBox="0 0 64 64" aria-hidden="true">
        <defs>
          <linearGradient id={uid + "g"} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#0BC5FF" />
            <stop offset=".55" stopColor="#2F6BFF" />
            <stop offset="1" stopColor="#7B4DFF" />
          </linearGradient>
          <radialGradient id={uid + "s"} cx=".3" cy=".2" r=".9">
            <stop offset="0" stopColor="#fff" stopOpacity=".45" />
            <stop offset=".6" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect className="frk-sam__tile" x="2" y="2" width="60" height="60" rx="16" fill={`url(#${uid}g)`} />
        <rect x="2" y="2" width="60" height="60" rx="16" fill={`url(#${uid}s)`} />
        <g className="frk-sam__core">
          <circle cx="29" cy="36" r="14" fill="none" stroke="#fff" strokeWidth="6.5" />
          <circle cx="29" cy="36" r="5.6" fill="#fff" className="frk-sam__dot" />
        </g>
        <g className="frk-sam__orbit">
          <circle cx="39.5" cy="17" r="4" fill="#fff" />
          <circle cx="47" cy="23.5" r="5.4" fill="#fff" />
          <circle cx="48.5" cy="33.5" r="3.4" fill="#fff" />
        </g>
      </svg>
      {word && <span className="frk-sam__word" aria-hidden="true" style={{ "--m": `url(${tone === "dark" ? FRK_SAM_DARK : FRK_SAM_LIGHT})` }} />}
    </span>
  );
}

/* ── PDF layer over the bundled jsPDF ───────────────────────────────────────────────────
   frkPdf() resolves to a helper with the page frame (watermark, header, footer) and a few drawing primitives.
   jsPDF's standard fonts are WinAnsi only, so all text goes through frkPdfText (smart quotes, dashes, ₹ …). */
const frkPdfText = (s) =>
  String(s == null ? "" : s)
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, "-")
    .replace(/…/g, "...")
    .replace(/₹/g, "Rs ")
    .replace(/•/g, "-")
    .replace(/ /g, " ")
    .replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ]/g, "");
const frkImg = (src) =>
  new Promise((res, rej) => {
    const im = new Image();
    im.onload = () => {
      const c = document.createElement("canvas");
      c.width = im.naturalWidth;
      c.height = im.naturalHeight;
      c.getContext("2d").drawImage(im, 0, 0);
      res({ data: c.toDataURL("image/png"), w: im.naturalWidth, h: im.naturalHeight });
    };
    im.onerror = rej;
    im.src = src;
  });
const frkHex = (h) => {
  const m = /^#?([0-9a-f]{6})$/i.exec(h || "");
  const n = m ? parseInt(m[1], 16) : 0;
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};
const frkMix = (a, b, t) => a.map((x, i) => Math.round(x + (b[i] - x) * t));
async function frkPdf({ title, kind, lead, accent = "#1E5BFF", accent2 = "#22D3EE" }) {
  const dt = await frPdf(); /* build 72: jsPDF loads on the first download */
  const [emb, full] = await Promise.all([frkImg(FRK_EMBLEM), frkImg(FRK_LOGO_FULL).catch(() => null)]);
  const doc = new dt({ unit: "mm", format: "a4", compress: true });
  const W = 210,
    H = 297,
    M = 16,
    CW = W - M * 2;
  const A = frkHex(accent),
    A2 = frkHex(accent2),
    NAVY = [7, 16, 79],
    INK = [24, 30, 58],
    MUTED = [96, 104, 128],
    LINE = [222, 227, 238];
  const T = frkPdfText;
  const st = { y: 0, page: 1 };
  const grad = (x, y, w, h, c1, c2, steps = 48, vertical = false) => {
    for (let i = 0; i < steps; i++) {
      doc.setFillColor(...frkMix(c1, c2, i / (steps - 1)));
      if (vertical) doc.rect(x, y + (h * i) / steps, w, h / steps + 0.3, "F");
      else doc.rect(x + (w * i) / steps, y, w / steps + 0.3, h, "F");
    }
  };
  const watermark = (op = 0.07) => {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: op }));
    const s = 132;
    doc.addImage(emb.data, "PNG", (W - s) / 2, (H - s * (emb.h / emb.w)) / 2 + 8, s, s * (emb.h / emb.w), "frk-emb", "FAST");
    doc.restoreGraphicsState();
  };
  const header = () => {
    grad(0, 0, W, 2.2, A, A2);
    doc.addImage(emb.data, "PNG", M, 7, 9, 9 * (emb.h / emb.w), "frk-emb", "FAST");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(...NAVY);
    doc.text("FREQUENT RESEARCH", M + 11.5, 11.2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("Insights | Analytics | Growth", M + 11.5, 14.6);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(...A);
    doc.text(T(kind || "").toUpperCase(), W - M, 11.2, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...MUTED);
    doc.text(T(title).slice(0, 80), W - M, 14.6, { align: "right" });
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(M, 19, W - M, 19);
    return 27;
  };
  const footer = (i, n) => {
    doc.setDrawColor(...LINE);
    doc.setLineWidth(0.3);
    doc.line(M, H - 15, W - M, H - 15);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text("Frequent Research Fieldwork Solutions Pvt. Ltd.  |  info@frequentresearch.com  |  +91 81782 00573  |  www.frequentresearch.com", M, H - 10.5);
    if (lead && lead.first) {
      const who = T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? ", " + lead.company : ""} on ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}`);
      doc.text(who, M, H - 6.8);
    }
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...A);
    doc.text(`${i} / ${n}`, W - M, H - 10.5, { align: "right" });
  };
  const newPage = () => {
    doc.addPage();
    st.page++;
    watermark();
    st.y = header();
  };
  const need = (h) => {
    if (st.y + h > H - 22) newPage();
  };
  const para = (s, { size = 10, color = INK, lh = 5, width = CW, x = M, bold = false } = {}) => {
    doc.setFont("helvetica", bold ? "bold" : "normal");
    doc.setFontSize(size);
    doc.setTextColor(...color);
    for (const line of doc.splitTextToSize(T(s), width)) {
      need(lh);
      doc.text(line, x, st.y);
      st.y += lh;
    }
  };
  const h2 = (s, sub) => {
    need(sub ? 20 : 15);
    st.y += 3;
    grad(M, st.y - 5, 1.6, 7, A, A2, 8, true);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13.5);
    doc.setTextColor(...NAVY);
    doc.text(T(s), M + 4.5, st.y);
    st.y += 6;
    if (sub) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.6);
      doc.setTextColor(...MUTED);
      doc.text(doc.splitTextToSize(T(sub), CW - 5), M + 4.5, st.y);
      st.y += 5 * doc.splitTextToSize(T(sub), CW - 5).length;
    }
    st.y += 1;
  };
  /* horizontal bar list: rows [[label, value(0-100)]] */
  const bars = (rows, { max, color = A, color2 = A2, labelW = 70, rowH = 6.2, unit = "%" } = {}) => {
    const mx = max || Math.max(1, ...rows.map((r) => r[1]));
    const bw = CW - labelW - 16;
    rows.forEach(([lab, val], i) => {
      need(rowH + 0.5);
      const y = st.y;
      if (i % 2 === 0) {
        doc.setFillColor(247, 249, 253);
        doc.rect(M, y - 4.3, CW, rowH, "F");
      }
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(...INK);
      const l = doc.splitTextToSize(T(lab), labelW - 2)[0];
      doc.text(l, M + 1.5, y);
      doc.setFillColor(232, 236, 246);
      doc.roundedRect(M + labelW, y - 3, bw, 3.2, 1.2, 1.2, "F");
      const w = Math.max(0.8, (bw * val) / mx);
      grad(M + labelW, y - 3, w, 3.2, color, color2, Math.max(2, Math.round(w / 3)));
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text(`${Math.round(val * 10) / 10}${unit}`, W - M - 1, y, { align: "right" });
      st.y += rowH;
    });
    st.y += 2;
  };
  /* donut chart with legend; rows [[label, value]] */
  const PAL = [A, A2, [255, 159, 67], [240, 69, 126], [124, 77, 255], [15, 157, 116], [244, 193, 82], [91, 140, 255], [46, 230, 166], [255, 107, 107]];
  const donut = (rows, { r = 22, x = M + 26, legendX = M + 58, title: dtitle } = {}) => {
    const total = rows.reduce((s, r2) => s + r2[1], 0) || 1;
    const hgt = Math.max(2 * r + 8, rows.length * 5.6 + 8);
    need(hgt);
    const cy = st.y + r + 2;
    let a0 = -Math.PI / 2;
    rows.forEach(([, v], i) => {
      const a1 = a0 + (v / total) * Math.PI * 2;
      const seg = Math.max(2, Math.ceil(((a1 - a0) * 180) / Math.PI / 6));
      const pts = [[x, cy]];
      for (let k = 0; k <= seg; k++) {
        const a = a0 + ((a1 - a0) * k) / seg;
        pts.push([x + r * Math.cos(a), cy + r * Math.sin(a)]);
      }
      doc.setFillColor(...PAL[i % PAL.length]);
      const rel = pts.slice(1).map((p, k) => [p[0] - pts[k][0], p[1] - pts[k][1]]);
      doc.lines(rel, pts[0][0], pts[0][1], [1, 1], "F", true);
      a0 = a1;
    });
    doc.setFillColor(255, 255, 255);
    doc.circle(x, cy, r * 0.58, "F");
    if (dtitle) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...NAVY);
      doc.text(doc.splitTextToSize(T(dtitle), r * 1.05), x, cy - 1, { align: "center" });
    }
    let ly = st.y + 5;
    rows.forEach(([lab, v], i) => {
      doc.setFillColor(...PAL[i % PAL.length]);
      doc.roundedRect(legendX, ly - 2.8, 3.2, 3.2, 0.8, 0.8, "F");
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.2);
      doc.setTextColor(...INK);
      doc.text(doc.splitTextToSize(T(lab), CW - (legendX - M) - 22)[0], legendX + 5.5, ly);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...NAVY);
      doc.text(`${Math.round((v / total) * 1000) / 10}%`, W - M - 1, ly, { align: "right" });
      ly += 5.6;
    });
    st.y += hgt + 2;
  };
  const chips = (list, { color = A } = {}) => {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    let x = M;
    need(8);
    list.forEach((c) => {
      const t = T(c);
      const w = doc.getTextWidth(t) + 7;
      if (x + w > W - M) {
        x = M;
        st.y += 7.5;
        need(8);
      }
      doc.setFillColor(...frkMix(color, [255, 255, 255], 0.86));
      doc.roundedRect(x, st.y - 4.4, w, 6.2, 3, 3, "F");
      doc.setTextColor(...frkMix(color, [0, 0, 0], 0.25));
      doc.text(t, x + 3.5, st.y);
      x += w + 2.5;
    });
    st.y += 8;
  };
  /* key/value tiles in a row: [[label, value], …] */
  const tiles = (list, { cols = list.length, h = 19 } = {}) => {
    need(h + 3);
    const gap = 3,
      w = (CW - gap * (cols - 1)) / cols;
    list.forEach(([lab, val], i) => {
      const x = M + (i % cols) * (w + gap),
        y = st.y + Math.floor(i / cols) * (h + gap);
      doc.setFillColor(...frkMix(A, [255, 255, 255], 0.92));
      doc.setDrawColor(...frkMix(A, [255, 255, 255], 0.7));
      doc.roundedRect(x, y, w, h, 2.5, 2.5, "FD");
      grad(x, y, 1.4, h, A, A2, 6, true);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(...A);
      doc.text(T(lab).toUpperCase(), x + 4.5, y + 6);
      doc.setFontSize(10);
      doc.setTextColor(...NAVY);
      const vl = doc.splitTextToSize(T(val), w - 7);
      doc.text(vl.slice(0, 2), x + 4.5, y + 11.5);
    });
    st.y += Math.ceil(list.length / cols) * (h + gap) + 2;
  };
  /* cover page: full-bleed gradient, emblem, title block */
  const cover = ({ eyebrow, big, sub, meta = [], flag }) => {
    grad(0, 0, W, H, NAVY, frkMix(A, NAVY, 0.35), 90, true);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.16 }));
    doc.addImage(emb.data, "PNG", W - 150, 70, 190, 190 * (emb.h / emb.w), "frk-emb", "FAST");
    doc.restoreGraphicsState();
    // light rings
    doc.setDrawColor(...A2);
    doc.setLineWidth(0.4);
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.35 }));
    [34, 56, 80].forEach((r) => doc.circle(W + 6, -6, r, "S"));
    doc.restoreGraphicsState();
    grad(0, H - 9, W, 9, A, A2);
    if (full) {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(M, 18, 64, 34, 4, 4, "F");
      doc.addImage(full.data, "PNG", M + 3, 20, 58, 58 * (full.h / full.w), "frk-full", "FAST");
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...A2);
    doc.text(T(eyebrow || "").toUpperCase(), M, 112);
    doc.setFontSize(30);
    doc.setTextColor(255, 255, 255);
    let y = 126;
    doc.splitTextToSize(T(big), CW - 10).slice(0, 4).forEach((l) => {
      doc.text(l, M, y);
      y += 12;
    });
    if (sub) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(12);
      doc.setTextColor(206, 216, 255);
      doc.splitTextToSize(T(sub), CW - 20).slice(0, 4).forEach((l) => {
        doc.text(l, M, y + 2);
        y += 6.4;
      });
    }
    y += 10;
    meta.forEach(([k, v], i) => {
      const x = M + (i % 3) * 60,
        yy = y + Math.floor(i / 3) * 20;
      doc.setDrawColor(...A2);
      doc.setLineWidth(0.5);
      doc.line(x, yy, x + 10, yy);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.setTextColor(...A2);
      doc.text(T(k).toUpperCase(), x, yy + 5);
      doc.setFontSize(12.5);
      doc.setTextColor(255, 255, 255);
      doc.text(doc.splitTextToSize(T(v), 56).slice(0, 2), x, yy + 11);
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(190, 200, 240);
    doc.text("ISO 20252:2019  |  ISO 9001:2015  |  ISO/IEC 27001:2013  |  ESOMAR member", M, H - 16);
    if (lead && lead.first) doc.text(T(`Prepared for ${lead.first}${lead.last ? " " + lead.last : ""}${lead.company ? " - " + lead.company : ""}`), W - M, H - 16, { align: "right" });
  };
  const startBody = () => {
    doc.addPage();
    st.page++;
    watermark();
    st.y = header();
  };
  const finish = (fname) => {
    const n = doc.getNumberOfPages();
    for (let i = 2; i <= n; i++) {
      doc.setPage(i);
      footer(i, n);
    }
    doc.setProperties({ title: T(title), subject: T(kind), author: "Frequent Research", creator: "frequentresearch.com" });
    doc.save(fname);
    return "ok";
  };
  return { doc, W, H, M, CW, A, A2, NAVY, INK, MUTED, LINE, T, st, grad, watermark, header, need, para, h2, bars, donut, chips, tiles, cover, startBody, newPage, finish, PAL };
}
const frkFile = (s) => frkPdfText(s).replace(/[\\/:*?"<>|]+/g, "-").replace(/\s+/g, " ").trim();

export { FRK_Captcha, FRK_Country, FRK_EMBLEM, FRK_EMBLEM_SM, FRK_Emblem, FRK_Field, FRK_Flag, FRK_I, FRK_LOGO_FULL, FRK_LOGO_MFR, FRK_LOGO_MHO, FRK_LOGO_SAM_WHITE, FRK_LOGO_T2O, FRK_P, FRK_Phone, FRK_SamLogo, FRK_Stars, FRK_V, FRK_VKEYS, frkCaptchaErr, frkCountry, frkCountryByName, frkFile, frkHash, frkHex, frkImg, frkIn, frkLead, frkMix, frkNorm, frkPdf, frkPdfText, frkPhoneCode, frkPost, frkReduce, frkRule, frkSaveLead, frkStore, frkText, frkUid, frkUseForm, frkV, frkVFromPath, frkVStyle };
