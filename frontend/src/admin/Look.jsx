/*
 * Build 78.3: the admin panel's look. Light / dark theme, soft sounds, the animated Frequent Research logo, the 3D sign-in
 * scene, a colour mood per area and counting numbers. Everything here is for /admin only; the website is not touched.
 * Its styles (styles/admin783.css) are injected as <style> by AdminApp, so the site's stylesheet stays the same.
 */
import * as ee from 'react';
import { FRL_FR } from '../components/site/Logos13.jsx';
import { admApi } from './api.jsx';

const LS = (k, d) => { try { return localStorage.getItem(k) ?? d; } catch (e) { return d; } };
const LSset = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };

/* ---- theme: light, dark or follow the computer ------------------------------------------------------------------- */
const sysDark = () => typeof matchMedia === "function" && matchMedia("(prefers-color-scheme: dark)").matches;
function applyTheme(pref) {
  const t = pref === "auto" ? (sysDark() ? "dark" : "light") : pref;
  document.documentElement.setAttribute("data-adm-theme", t);
  return t;
}
// build 78.4: one shared value for every component, and saved with the admin's account (it follows them everywhere)
const stores = {};
function useShared(key, def, save) {
  const s = (stores[key] ||= { v: LS(key, def), subs: new Set() });
  const [v, setV] = ee.useState(s.v);
  ee.useEffect(() => { const f = () => setV(s.v); s.subs.add(f); return () => s.subs.delete(f); }, []);
  const set = (x, { remote = true } = {}) => { if (x === s.v) return; s.v = x; LSset(key, x); s.subs.forEach((f) => f()); if (remote && save) save(x); };
  return [v, set];
}
const savePref = (body) => admApi("/admin/account/prefs", { method: "PUT", body }).catch(() => {});
function useAdmTheme() {
  const [pref, setPref] = useShared("fr-adm-theme", "light", (theme) => savePref({ theme }));
  ee.useEffect(() => {
    applyTheme(pref);
    if (pref !== "auto" || typeof matchMedia !== "function") return;
    const mq = matchMedia("(prefers-color-scheme: dark)"), h = () => applyTheme("auto");
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [pref]);
  return [pref, setPref];
}

/* ---- sound: soft bells made in the browser (no files), only after a click, switch in the menu ---------------------- */
let ctx = null;
const soundOn = () => LS("fr-adm-sound", "on") === "on";
function bell(c, out, t, f, dur, vol) {
  for (const [m, v] of [[1, 1], [2, 0.25], [3.01, 0.07]]) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = "sine"; o.frequency.setValueAtTime(f * m, t);
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol * v, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
  }
}
const NOTES = {
  nav: [[880, 0, 0.18, 0.35]],
  open: [[523.3, 0, 0.9, 0.5], [659.3, 0.09, 0.9, 0.45], [784, 0.18, 1, 0.45], [1046.5, 0.3, 1.3, 0.35]],
  ok: [[659.3, 0, 0.5, 0.45], [987.8, 0.1, 0.7, 0.4]],
  err: [[311.1, 0, 0.5, 0.5], [261.6, 0.12, 0.7, 0.45]],
  draft: [[587.3, 0, 0.6, 0.4], [740, 0.12, 0.6, 0.35], [880, 0.24, 0.9, 0.35]],
  ask: [[740, 0, 0.5, 0.4], [740, 0.16, 0.6, 0.35]],
  toggle: [[1174.7, 0, 0.15, 0.3]],
};
function admSfx(kind = "nav") {
  try {
    if (!soundOn()) return;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    ctx = ctx || new AC();
    if (ctx.state === "suspended") ctx.resume();
    const master = ctx.createGain();
    master.gain.value = kind === "nav" || kind === "toggle" ? 0.05 : 0.08;
    const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 4200;
    master.connect(lp).connect(ctx.destination);
    const t = ctx.currentTime + 0.02;
    for (const [f, at, dur, v] of NOTES[kind] || NOTES.nav) bell(ctx, master, t + at, f, dur, v);
  } catch (e) {}
}
function useAdmSound() {
  const [on, setOn] = ee.useState(soundOn());
  const set = (v) => { LSset("fr-adm-sound", v ? "on" : "off"); setOn(v); if (v) admSfx("toggle"); };
  return [on, set];
}

/* ---- the animated Frequent Research logo ---------------------------------------------------------------------------- */
function AdmLogo({ size = 40, big = false }) {
  return (
    <span className={"adm783-logo" + (big ? " adm783-logo--big" : "")} style={{ "--s": size + "px" }} aria-hidden={big ? undefined : "true"}>
      <i className="adm783-logo__orbit" /><i className="adm783-logo__orbit adm783-logo__orbit--2" /><i className="adm783-logo__glow" />
      <span className="adm783-logo__mark"><FRL_FR kind="icon" calm={!big} rich={big} tilt={big ? 12 : 0} alt="Frequent Research" /></span>
    </span>
  );
}

/* ---- the sign-in scene: a moving perspective floor, floating glass shapes, light orbs and drifting sparks ------------ */
const WORDS = ["pages and sections", "blogs and case studies", "panel books for every country", "enquiries and leads", "newsletters and social posts", "who may do what"];
function AdmScene() {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => { const t = setInterval(() => setI((x) => (x + 1) % WORDS.length), 2600); return () => clearInterval(t); }, []);
  const sparks = ee.useMemo(() => Array.from({ length: 28 }, (_, k) => ({ l: (k * 37) % 100, d: 6 + ((k * 13) % 9), dl: -((k * 7) % 11), s: 2 + (k % 3) })), []);
  return (
    <div className="adm783-scene" aria-hidden="true">
      <i className="adm783-orb adm783-orb--a" /><i className="adm783-orb adm783-orb--b" /><i className="adm783-orb adm783-orb--c" />
      <div className="adm783-floor"><i /></div>
      <div className="adm783-shapes">
        <span className="adm783-cube adm783-cube--1"><b /><b /><b /><b /><b /><b /></span>
        <span className="adm783-cube adm783-cube--2"><b /><b /><b /><b /><b /><b /></span>
        <span className="adm783-ring adm783-ring--1" /><span className="adm783-ring adm783-ring--2" />
        <span className="adm783-globe"><i /><i /><i /></span>
      </div>
      {sparks.map((p, k) => <i key={k} className="adm783-spark" style={{ left: p.l + "%", animationDuration: p.d + "s", animationDelay: p.dl + "s", width: p.s, height: p.s }} />)}
      <div className="adm783-tag">
        <small>Frequent Research · Super Admin</small>
        <p>One place to run <span key={i} className="adm783-word">{WORDS[i]}</span></p>
      </div>
    </div>
  );
}

/* ---- colour mood per area -------------------------------------------------------------------------------------------- */
const MOOD = {
  "": "overview", visits: "overview", activity: "system",
  "client-onboarding": "inbox", "vendor-onboarding": "inbox", "onboarding-links": "website", leadership: "people", "page-videos": "website", "web-videos": "website", "home-stats": "website", design79: "website",
  leads: "inbox", contacts: "marketing", chat: "inbox", reviews: "inbox",
  pages: "website", "new-pages": "website", menus: "website", edit: "website", logos: "website", legal: "website", seo: "website",
  settings: "content", contact: "content", team: "people", testimonials: "content", blogs: "content", cards: "content", cases: "content", products: "content", portals: "content",
  careers: "people", downloads: "content", certifications: "content", associations: "content", af: "content", panels: "content", pdfs: "content", forms: "website", videos: "website", celebrations: "content", gallery: "content",
  emails: "marketing", automations: "marketing", newsletters: "marketing", social: "marketing", ai: "marketing",
  api: "system", keys: "system", files: "system", content: "system",
  approvals: "access", users: "access", roles: "access", account: "access",
};
const admMood = (sec) => MOOD[sec] || "overview";

/* ---- numbers that count up when a card appears ------------------------------------------------------------------------ */
function AdmCount({ n }) {
  const [v, setV] = ee.useState(0);
  ee.useEffect(() => {
    const to = Number(n) || 0;
    if (!to || (typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches)) { setV(to); return; }
    let raf, t0;
    const step = (t) => { t0 = t0 || t; const k = Math.min(1, (t - t0) / 900); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [n]);
  return <>{v.toLocaleString()}</>;
}

/* ---- the switches in the menu ------------------------------------------------------------------------------------------ */
function AdmSwitches() {
  const [pref, setPref] = useAdmTheme();
  const [on, setOn] = useAdmSound();
  const [pop, setPop] = ee.useState(false);
  useAdmPalette();
  const next = { light: "dark", dark: "auto", auto: "light" };
  const lbl = { light: "☀ Light", dark: "☾ Dark", auto: "◐ Auto" };
  return (
    <div className="adm783-sw">
      <button type="button" onClick={() => { setPref(next[pref]); admSfx("toggle"); }} title="Theme: light, dark, or the same as your computer" aria-label={"Theme: " + pref}>{lbl[pref]}</button>
      <button type="button" onClick={() => setOn(!on)} aria-pressed={on} title="Sounds on or off">{on ? "♪ Sound on" : "♪ Sound off"}</button>
      <button type="button" className="adm784-palbtn" onClick={() => setPop(!pop)} aria-expanded={pop} title="Colour palette for the whole panel">🎨 Colours</button>
      {pop && <div className="adm784-palpop"><AdmPalettes compact onPick={() => setTimeout(() => setPop(false), 350)} /></div>}
    </div>
  );
}

/* ---- build 78.4: colour palettes each admin can choose for the whole panel -------------------------------------------- */
// [id, name, line, mood, mood2, deep, menu top, menu bottom]. "areas" keeps a colour family per area.
const ADM_PALETTES = [
  ["areas", "Frequent Research", "Every area its own colours", "#2F6BFF", "#6D4AFF", "#0B1437", "#0B1437", "#0A1130"],
  ["ocean", "Ocean", "Deep sea blue and lagoon", "#1E7FE0", "#0EA5B7", "#04263D", "#062238", "#04182A"],
  ["aurora", "Aurora", "Northern lights on a night sky", "#0E9C88", "#6D4AFF", "#071E2A", "#0A1F2E", "#140F33"],
  ["sunset", "Sunset", "Coral and warm gold", "#E0605A", "#D99A2B", "#3A1020", "#2A0C1A", "#3A1A10"],
  ["forest", "Forest", "Calm greens and moss", "#2F8F6B", "#7BA05B", "#0B2A1F", "#0B2A1F", "#071A14"],
  ["plum", "Royal plum", "Violet, plum and rose", "#8E44AD", "#C8577E", "#24102E", "#24102E", "#170A1F"],
  ["graphite", "Graphite", "Quiet greys with a blue spark", "#4B5563", "#2F6BFF", "#111827", "#111827", "#0B0F19"],
  ["rosegold", "Rose gold", "Soft rose and champagne", "#C8577E", "#D9A07A", "#2E1520", "#2E1520", "#1E0E15"],
  ["midnight", "Midnight neon", "Electric violet and cyan", "#6D4AFF", "#00B3D6", "#0A0A23", "#0A0A23", "#060616"],
  ["saffron", "Saffron", "Saffron, marigold and teal", "#E07B1F", "#0E9C88", "#2B1606", "#2B1606", "#1B0E04"],
];
function applyPalette(id) { document.documentElement.setAttribute("data-adm-pal", ADM_PALETTES.some((p) => p[0] === id) ? id : "areas"); }
function useAdmPalette() {
  const [pal, setPal] = useShared("fr-adm-pal", "areas", (palette) => savePref({ palette }));
  ee.useEffect(() => { applyPalette(pal); }, [pal]);
  return [pal, setPal];
}
// what the account says wins (another computer may have changed it)
function admApplyPrefs(prefs) {
  if (!prefs) return;
  for (const [key, v] of [["fr-adm-pal", prefs.palette], ["fr-adm-theme", prefs.theme]]) {
    if (!v) continue;
    const s = (stores[key] ||= { v: LS(key, v), subs: new Set() });
    if (s.v !== v) { s.v = v; LSset(key, v); s.subs.forEach((f) => f()); }
  }
  applyPalette(stores["fr-adm-pal"] ? stores["fr-adm-pal"].v : "areas");
  if (prefs.theme) applyTheme(prefs.theme);
}
function AdmPalettes({ compact = false, onPick }) {
  const [pal, setPal] = useAdmPalette();
  return (
    <div className={"adm784-pals" + (compact ? " adm784-pals--sm" : "")} role="radiogroup" aria-label="Colour palette">
      {ADM_PALETTES.map(([id, name, line, a, b, c, s1, s2], i) => (
        <button key={id} type="button" role="radio" aria-checked={pal === id} className={"adm784-pal" + (pal === id ? " is-on" : "")} style={{ "--a": a, "--b": b, "--c": c, "--s1": s1, "--s2": s2, "--i": i }} onClick={() => { setPal(id); admSfx("toggle"); onPick && onPick(id); }}>
          <span className="adm784-pal__sw" aria-hidden="true"><i /><i /><i /></span>
          <b>{name}</b>{!compact && <small>{line}</small>}
        </button>
      ))}
    </div>
  );
}

/* ---- build 78.4: an admin's face: their photo, or their initials on a colour of their own ------------------------------ */
const admInitials = (s) => String(s || "?").split(/[\s@.]+/).filter(Boolean).slice(0, 2).map((x) => x[0].toUpperCase()).join("");
const hue = (s) => { let h = 0; for (const c of String(s || "")) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 6; };
function AdmFace({ user, size = 36, ring = false }) {
  const u = user || {};
  return (
    <span className={"adm784-face" + (ring ? " adm784-face--ring" : "")} data-c={hue(u.email || u.name)} style={{ "--fs": size + "px" }} aria-hidden="true">
      {u.photo ? <img src={u.photo} alt="" width={size} height={size} decoding="async" /> : <b>{admInitials(u.name || u.email)}</b>}
    </span>
  );
}
// a chosen picture -> a 256 px square WebP (centre crop), small enough to keep with the account
async function admMakePhoto(file) {
  if (!file || !/^image\/(jpeg|png|webp|gif|avif|heic|heif)$/i.test(file.type || "")) throw new Error("Please choose a picture (JPG, PNG or WebP).");
  if (file.size > 25e6) throw new Error("This picture is larger than 25 MB.");
  const img = await createImageBitmap(file).catch(() => { throw new Error("This picture cannot be opened. Please try a JPG or PNG."); });
  const S = 256, c = document.createElement("canvas"); c.width = c.height = S;
  const k = Math.min(img.width, img.height), x = (img.width - k) / 2, y = (img.height - k) / 2.6;
  const g = c.getContext("2d"); g.imageSmoothingQuality = "high"; g.drawImage(img, x, Math.max(0, y), k, k, 0, 0, S, S);
  let out = c.toDataURL("image/webp", 0.86);
  if (!out.startsWith("data:image/webp")) out = c.toDataURL("image/jpeg", 0.86);
  return out;
}

export { ADM_PALETTES, AdmCount, AdmFace, AdmPalettes, admApplyPrefs, useAdmPalette, AdmLogo, admInitials, admMakePhoto, AdmScene, AdmSwitches, admMood, admSfx, useAdmTheme };
