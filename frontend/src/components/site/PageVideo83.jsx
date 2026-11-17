/*
 * Build 83: "Studio 83", the page-video window with a design of its own for every page (Kunal, 16 Nov).
 * Same format as before (words, numbered highlights, "Request a quote" and Subscribe on one side, the framed video on
 * the other), with a design generated per page (data/pv83Looks.js): palette (country pages: their flag), local pattern,
 * frame, layout, fonts, highlight style, colour grading, 3D icon tiles or illustration, and music.
 *
 * What plays: the page's YouTube / Vimeo link or uploaded MP4 (set in the super admin), else the closest parent page's
 * video, else the page's own animated video (five scenes with captions and generated music, about 20 seconds).
 * Classic designs (build 70) still open in components/site/PageVideo69.jsx when the admin picks one.
 * Prefix PV83_ / pv83- (styles: styles/pagevideo83.css). Loops animate transform/opacity only; reduced motion stops them.
 */
import * as ee from 'react';
import * as ci from 'react-dom';
import { Link, useInRouterContext } from 'react-router-dom';
import {
  Activity, Award, BadgeCheck, Banknote, Bot, BookOpen, Briefcase, Building2, Calculator, Calendar, Camera, ChartBar, ChartLine, ChartPie,
  ClipboardCheck, ClipboardList, Cloud, Code, Coins, Compass, Cpu, Database, Download, Factory, FileText, Fingerprint, Flag, Gauge, Gift, Globe,
  GraduationCap, Handshake, Headphones, Heart, HeartPulse, Hospital, Landmark, Layers, Lightbulb, Lock, Mail, Megaphone, MessageCircle, Mic,
  Microscope, Monitor, Newspaper, Package, Palette, Percent, PenTool, PiggyBank, Pill, Plane, QrCode, Receipt, Rocket, Scale, Search, Server,
  Shield, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Smile, Sparkles, Star, Stethoscope, Store, Target, ThumbsUp, TrendingUp, Truck,
  Users, Utensils, Video, Vote, Wallet, Wheat, Workflow, Zap,
} from 'lucide-react';
import { PV_Theatre } from './PageVideo69.jsx';
import '../../styles/pagevideo83.css';
import { pv83Look, pv83Lum, pv83Mix, pv83MotifUrl } from '../../data/pv83Looks.js';
import { PV83_BY_ISO, PV83_PANELS } from '../../data/pv83Countries.js';
import { pv83ForPath, pv83Studio } from '../../data/PageVideos83.js';
import { pc5Flags, pc5FlagUrl } from '../../data/PanelCountries65.jsx';
import logoImg from '../../assets/images/brand26/fr-full26.webp';
import mrImg from '../../assets/images/d79/mr-light.webp';
import dmImg from '../../assets/images/d79/dm-light.webp';
import itImg from '../../assets/images/d79/it-light.webp';
import afImg from '../../assets/images/d79/af-light.webp';
import globeImg from '../../assets/images/d79/globe-light.webp';
import abImg from '../../assets/images/about17/ab17-hero.webp';
import d82a from '../../assets/images/d82/markets.webp';
import d82b from '../../assets/images/d82/projects.webp';
import d82c from '../../assets/images/d82/clients.webp';

const IC = { Activity, Award, BadgeCheck, Banknote, Bot, BookOpen, Briefcase, Building2, Calculator, Calendar, Camera, ChartBar, ChartLine, ChartPie, ClipboardCheck, ClipboardList, Cloud, Code, Coins, Compass, Cpu, Database, Download, Factory, FileText, Fingerprint, Flag, Gauge, Gift, Globe, GraduationCap, Handshake, Headphones, Heart, HeartPulse, Hospital, Landmark, Layers, Lightbulb, Lock, Mail, Megaphone, MessageCircle, Mic, Microscope, Monitor, Newspaper, Package, Palette, Percent, PenTool, PiggyBank, Pill, Plane, QrCode, Receipt, Rocket, Scale, Search, Server, Shield, ShieldCheck, ShoppingBag, ShoppingCart, Smartphone, Smile, Sparkles, Star, Stethoscope, Store, Target, ThumbsUp, TrendingUp, Truck, Users, Utensils, Video, Vote, Wallet, Wheat, Workflow, Zap };
const PV83_ICON_NAMES = Object.keys(IC);
const Ico = ({ n, s = 24 }) => { const C = IC[n] || Sparkles; return <C size={s} strokeWidth={2} aria-hidden="true" focusable="false" />; };
const PHOTOS = { mr: mrImg, dm: dmImg, it: itImg, af: afImg, fr: abImg, globe: globeImg, x: [d82a, d82b, d82c] };
const PV_CHANNEL = "https://www.youtube.com/@frequentresearch";
const reduce = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
const two = (n) => String(Math.max(1, Math.min(99, +n || 1))).padStart(2, "0");
const pvPoint = (p, i) => { const m = String(p).match(/^\s*([^·]{1,14}?)\s*·\s*(.+)$/); return m ? [m[1], m[2]] : [two(i + 1), String(p)]; };

/* the HD flag of a country (public/data/flags-hd.json), else stripes in its colours */
function useFlag(iso) {
  const [src, setSrc] = ee.useState("");
  ee.useEffect(() => {
    let on = true;
    if (!iso) return undefined;
    pc5Flags().then((f) => on && f && f[iso] && setSrc(pc5FlagUrl(f[iso]))).catch(() => {});
    return () => { on = false; };
  }, [iso]);
  return src;
}
function FlagArt({ iso, wave }) {
  const src = useFlag(iso), c = PV83_BY_ISO[iso];
  const stripes = c ? "linear-gradient(180deg," + c.flag.map((x, i) => `${x} ${(i * 100) / c.flag.length}% ${((i + 1) * 100) / c.flag.length}%`).join(",") + ")" : "#ccc";
  return (
    <span className={"pv83-flag" + (wave ? " is-wave" : "")} aria-hidden="true">
      {Array.from({ length: wave ? 8 : 1 }, (_, i) => (
        <i key={i} style={{ "--i": i, backgroundImage: src ? `url("${src}")` : stripes, backgroundSize: wave ? "800% 100%" : "cover", backgroundPosition: wave ? `${(i * 100) / 7}% 0` : "center" }} />
      ))}
    </span>
  );
}

/* panel sizes for the numbers scene (public/data/panel-books/index.json) */
let ixP = null;
const panelIndex = () => ixP || (ixP = fetch("/data/panel-books/index.json").then((r) => (r.ok ? r.json() : {})).catch(() => ({})));
function usePanelSize(iso, panel) {
  const [n, setN] = ee.useState(0);
  ee.useEffect(() => {
    let on = true;
    if (!iso || !panel) return undefined;
    panelIndex().then((ix) => {
      const keys = panel === "hc" ? ["hcp", "caregivers", "patients"] : [panel];
      const sum = keys.reduce((a, k) => a + (((ix[k] || []).find((x) => x.iso === iso) || {}).panel || 0), 0);
      if (on) setN(sum);
    });
    return () => { on = false; };
  }, [iso, panel]);
  return n;
}
function Count({ to, run }) {
  const [v, setV] = ee.useState(0);
  ee.useEffect(() => {
    if (!run || !to) return undefined;
    if (reduce()) { setV(to); return undefined; }
    let raf, t0;
    const f = (t) => { t0 = t0 || t; const k = Math.min(1, (t - t0) / 1600); setV(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(f); };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{v.toLocaleString("en-US")}</>;
}

/* ---- the words of the poster: "Reach REAL / Consumers" ---- */
function posterWords(e, look) {
  const K = look.panel ? PV83_PANELS[look.panel] : null;
  if (K) { const w = K.verb.split(" "); return [w.slice(0, -1).join(" ") || w[0], w.length > 1 ? w[w.length - 1] : "", K.em]; }
  const t = String(e.title || e.page || "").trim(), em = String(e.em || "").trim().replace(/[.!]$/, "");
  const w = t.split(/\s+/);
  if (em) return [t, "", em];
  return [w.slice(0, Math.max(1, w.length - 1)).join(" "), "", w.length > 1 ? w[w.length - 1] : ""];
}

/* ---- the illustration on the right of the poster ---- */
function Illus({ look, e, run }) {
  const icons = look.icons || [];
  const size = usePanelSize(look.country, look.panel);
  switch (look.illus) {
    case "flag":
      return look.country ? <div className="pv83-ill pv83-ill--flag"><FlagArt iso={look.country} wave /><span className="pv83-ill__pole" /></div> : null;
    case "globe":
      return (
        <div className="pv83-ill pv83-ill--globe">
          <span className="pv83-globe"><i /><i /><i /><b />{look.country ? <em><FlagArt iso={look.country} /></em> : null}</span>
          {icons.slice(0, 3).map((n, i) => <span key={n} className="pv83-chip3d" style={{ "--i": i }}><Ico n={n} s={18} /></span>)}
        </div>
      );
    case "stats":
      return (
        <div className="pv83-ill pv83-ill--stats">
          <span className="pv83-stat"><b>{size ? <Count to={size} run={run} /> : look.country ? "…" : "55"}</b><small>{size ? "panel members" : "countries"}</small></span>
          <span className="pv83-bars3d">{[0.45, 0.7, 0.55, 0.9, 0.75].map((h, i) => <i key={i} style={{ "--h": h, "--i": i }} />)}</span>
          {look.country ? <span className="pv83-stat__flag"><FlagArt iso={look.country} /></span> : <span className="pv83-chip3d" style={{ "--i": 1 }}><Ico n={icons[0]} s={18} /></span>}
        </div>
      );
    case "photo":
      return (
        <div className={"pv83-ill pv83-ill--photo pv83-grade--" + look.grade}>
          <img src={e.coverUrl && e.cover === "image" ? e.coverUrl : PHOTOS[e.fam] || PHOTOS.fr} alt="" loading="lazy" decoding="async" />
          <span className="pv83-chip3d" style={{ "--i": 0 }}><Ico n={icons[0]} s={18} /></span>
        </div>
      );
    case "orbit":
      return (
        <div className="pv83-ill pv83-ill--orbit">
          <span className="pv83-core"><Ico n={icons[0]} s={44} /></span>
          <span className="pv83-orbit">{icons.slice(1, 5).map((n, i) => <span key={n} style={{ "--i": i }}><Ico n={n} s={20} /></span>)}</span>
        </div>
      );
    default:
      return (
        <div className="pv83-ill pv83-ill--tiles">
          {icons.slice(0, 4).map((n, i) => <span key={n + i} className={"pv83-tile pv83-tile--" + i} style={{ "--i": i }}><Ico n={n} s={i === 0 ? 46 : 24} /></span>)}
        </div>
      );
  }
}

/* ---- the cover (the reference format: logo card, number, tag, big words, play button, label, illustration) ---- */
function Poster({ e, look, onPlay, label }) {
  const [l1, hi, l2] = posterWords(e, look);
  const K = look.panel ? PV83_PANELS[look.panel] : null;
  const tag = K ? K.label : e.kind === "panel" ? "Panel" : e.eyebrow || e.group || "Frequent Research";
  const thumb = e.cover === "thumb" && e.video && e.video.kind === "yt" ? "https://i.ytimg.com/vi/" + e.video.id + "/maxresdefault.jpg" : e.cover === "image" && e.coverUrl ? e.coverUrl : "";
  return (
    <button type="button" className={"pv83-poster" + (thumb ? " has-img" : "")} onClick={onPlay} aria-label={label}>
      {thumb ? <img className="pv83-poster__img" src={thumb} alt="" onError={(x) => (x.currentTarget.style.display = "none")} /> : (
        <>
          <span className="pv83-poster__bg" aria-hidden="true"><i /><i /><i /><i /><i /></span>
          <span className="pv83-poster__logo" aria-hidden="true"><img src={logoImg} alt="" width="120" height="40" /></span>
          <span className="pv83-poster__num" aria-hidden="true">{two(e.num)}</span>
          <span className="pv83-poster__words" aria-hidden="true">
            <span className="pv83-poster__tag"><i />{tag}</span>
            <span className={"pv83-poster__h" + ((l1 + hi + l2).length > 30 ? " is-long" : (l1 + hi + l2).length > 20 ? " is-mid" : "")}>
              <span>{l1}{hi ? <> <mark>{hi}</mark></> : null}</span>
              {l2 ? <span><mark className={hi ? "is-2" : "is-hi"}>{l2}</mark></span> : null}
            </span>
          </span>
          <span className="pv83-poster__art" aria-hidden="true"><Illus look={look} e={e} run /></span>
          <span className="pv83-poster__cap" aria-hidden="true"><small>{e.eyebrow || e.group}</small>{e.page}</span>
        </>
      )}
      <span className="pv83-play" aria-hidden="true"><i /><i /><svg viewBox="0 0 24 24" width="34" height="34"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor" /></svg></span>
    </button>
  );
}

/* ---- generated music for the animated video (Web Audio; nothing is downloaded) ---- */
const SCALES = { major: [0, 2, 4, 7, 9, 12, 14, 16], lydian: [0, 2, 4, 6, 7, 11, 12, 14], dorian: [0, 2, 3, 5, 7, 9, 10, 12], minor: [0, 2, 3, 5, 7, 8, 10, 12], penta: [0, 2, 4, 7, 9, 12, 14, 16], insen: [0, 1, 5, 7, 10, 12, 13, 17], raga: [0, 1, 4, 5, 7, 8, 11, 12], hijaz: [0, 1, 4, 5, 7, 8, 10, 12], phryg: [0, 1, 3, 5, 7, 8, 10, 12], pelog: [0, 1, 3, 7, 8, 12, 13, 15] };
function music(look, seconds) {
  const AC = typeof window !== "undefined" && (window.AudioContext || window.webkitAudioContext);
  if (!AC) return null;
  const ctx = new AC(), out = ctx.createGain(), seed = look.seed || 1;
  out.gain.value = 0.0001; out.connect(ctx.destination);
  const moods = { bright: [112, "triangle", 0.11], calm: [78, "sine", 0.12], drive: [124, "square", 0.05], epic: [92, "sawtooth", 0.045] };
  const [bpm, wave, vol] = moods[look.mood] || moods.bright;
  const sc = SCALES[look.scale] || SCALES.major, root = 196 * Math.pow(2, (seed % 7) / 12), beat = 60 / bpm, t0 = ctx.currentTime + 0.08;
  const note = (f, t, d, v, w = wave) => { const o = ctx.createOscillator(), g = ctx.createGain(); o.type = w; o.frequency.value = f; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(v, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + d); o.connect(g); g.connect(out); o.start(t); o.stop(t + d + 0.05); };
  const hz = (k) => root * Math.pow(2, k / 12);
  const prog = [0, 5, 3, 4].map((x) => (x + seed) % 4);
  for (let b = 0, t = t0; t < t0 + seconds - 0.5; b++, t += beat / 2) {
    const bar = Math.floor(b / 8), ch = [0, 3, 1, 4][prog[bar % 4]];
    note(hz(sc[(ch + [0, 2, 4, 2, 5, 4, 2, 1][(b + seed) % 8]) % sc.length] + 12), t, beat * 0.9, vol);
    if (b % 8 === 0) [0, 2, 4].forEach((k) => note(hz(sc[(ch + k) % sc.length] - 12), t, beat * 4, vol * 0.55, "sine"));
    if ((look.mood === "drive" || look.mood === "epic") && b % 2 === 0) { note(55, t, 0.18, 0.25, "sine"); }
  }
  out.gain.setValueAtTime(0.0001, t0); out.gain.exponentialRampToValueAtTime(0.9, t0 + 1); out.gain.setValueAtTime(0.9, t0 + seconds - 1.5); out.gain.exponentialRampToValueAtTime(0.0001, t0 + seconds);
  return { ctx, out, stop: () => { try { out.gain.cancelScheduledValues(ctx.currentTime); out.gain.setValueAtTime(0.0001, ctx.currentTime); ctx.close(); } catch (x) {} }, mute: (m) => { try { out.gain.cancelScheduledValues(ctx.currentTime); out.gain.setTargetAtTime(m ? 0.0001 : 0.9, ctx.currentTime, 0.05); } catch (x) {} } };
}

/* ---- the animated video: five scenes, about 20 seconds ---- */
const SCENE_MS = 4200;
function Motion({ e, look, onEnd }) {
  const c = look.country ? PV83_BY_ISO[look.country] : null, K = look.panel ? PV83_PANELS[look.panel] : null;
  const pts = (Array.isArray(e.points) ? e.points : []).filter(Boolean).slice(0, 4);
  const size = usePanelSize(look.country, look.panel);
  const [s, setS] = ee.useState(0), [pause, setPause] = ee.useState(false), [mute, setMute] = ee.useState(e.sound === false || pv83Studio().sound === false), [run, setRun] = ee.useState(1);
  const snd = ee.useRef(null);
  const N = 5;
  ee.useEffect(() => {
    snd.current = music(look, (N * SCENE_MS) / 1000);
    if (snd.current && mute) snd.current.mute(true);
    return () => snd.current && snd.current.stop();
  }, [run]);
  ee.useEffect(() => { if (snd.current) snd.current.mute(mute || pause); try { pause ? snd.current.ctx.suspend() : snd.current.ctx.resume(); } catch (x) {} }, [mute, pause]);
  ee.useEffect(() => {
    if (pause || s >= N) return undefined;
    const id = setTimeout(() => setS((x) => x + 1), SCENE_MS);
    return () => clearTimeout(id);
  }, [s, pause]);
  const done = s >= N;
  const [l1, hi, l2] = posterWords(e, look);
  const caption = [
    c ? c.hello + " " + c.name + "!" : "Frequent Research presents",
    [e.title, e.em].filter(Boolean).join(" "),
    c && size ? size.toLocaleString("en-US") + " " + (K ? K.who : "members") + " in " + c.name : e.lede,
    pts.join(" · "),
    (e.cta && e.cta.label) || "Talk to our team",
  ][Math.min(s, N - 1)];
  const scene = Math.min(s, N - 1);
  return (
    <div className={"pv83-motion is-s" + scene + (pause ? " is-paused" : "")} aria-label={"Animated video: " + (e.page || "")}>
      <div className="pv83-motion__bg" aria-hidden="true"><i /><i /><i /></div>
      <div className="pv83-scene" key={scene + ":" + run} aria-hidden="true">
        {scene === 0 && (
          <div className="pv83-sc pv83-sc--hello">
            {c ? <span className="pv83-sc__flag"><FlagArt iso={c.iso} wave /></span> : <span className="pv83-sc__logo"><img src={logoImg} alt="" /></span>}
            <b>{c ? c.hello : "Frequent Research"}</b>
            <small>{c ? c.name + " · " + (K ? K.label : "") : "presents"}</small>
          </div>
        )}
        {scene === 1 && (
          <div className="pv83-sc pv83-sc--title">
            <small>{e.eyebrow || e.group}</small>
            <b>{String(l1).split(" ").map((w, i) => <span key={i} style={{ "--i": i }}>{w} </span>)}{hi ? <mark style={{ "--i": 3 }}>{hi}</mark> : null}</b>
            {l2 ? <b className="is-2"><mark style={{ "--i": 4 }}>{l2}</mark></b> : null}
          </div>
        )}
        {scene === 2 && (
          <div className="pv83-sc pv83-sc--facts">
            {c ? (
              <>
                <b className="pv83-sc__big"><Count to={size || 0} run /></b>
                <small>{K ? "profiled " + K.who : "panel members"}</small>
                <span className="pv83-ticker"><span>{[...c.cities, ...c.cities].map((x, i) => <i key={i}>{x}</i>)}</span></span>
              </>
            ) : (
              <>
                <span className="pv83-sc__ic">{(look.icons || []).slice(0, 3).map((n, i) => <span key={n} style={{ "--i": i }}><Ico n={n} s={30} /></span>)}</span>
                <p>{e.lede}</p>
              </>
            )}
          </div>
        )}
        {scene === 3 && (
          <div className="pv83-sc pv83-sc--points">
            {(pts.length ? pts : [e.page]).map((p, i) => <span key={i} style={{ "--i": i }}><em><Ico n={(look.icons || [])[i % (look.icons || [1]).length]} s={20} /></em>{String(p).replace(/^[^·]{1,14}·\s*/, "")}</span>)}
          </div>
        )}
        {scene === 4 && (
          <div className="pv83-sc pv83-sc--cta">
            <span className="pv83-sc__logo"><img src={logoImg} alt="" /></span>
            <b>{(e.cta && e.cta.label) || "Talk to our team"} →</b>
            <small>frequentresearch.com</small>
            <span className="pv83-sc__yt">▶ Subscribe @frequentresearch</span>
          </div>
        )}
      </div>
      <p className="pv83-motion__cc" aria-live="polite">{caption}</p>
      <div className="pv83-motion__bar" aria-hidden="true">{Array.from({ length: N }, (_, i) => <i key={i} className={i < s ? "is-done" : i === s ? "is-on" : ""} style={{ animationDuration: SCENE_MS + "ms" }} />)}</div>
      <div className="pv83-motion__ctl">
        {done ? (
          <button type="button" onClick={() => { setS(0); setRun((x) => x + 1); }}>↻ Replay</button>
        ) : (
          <button type="button" onClick={() => setPause(!pause)} aria-pressed={pause}>{pause ? "▶ Play" : "❚❚ Pause"}</button>
        )}
        <button type="button" onClick={() => setMute(!mute)} aria-pressed={mute}>{mute ? "🔇 Sound off" : "🔊 Sound on"}</button>
        {onEnd ? <button type="button" onClick={onEnd}>✕ Close</button> : null}
      </div>
    </div>
  );
}

/* ---- the screen: cover until play, then the video (YouTube, Vimeo, MP4) or the animated video ---- */
function Screen({ e, look }) {
  const [play, setPlay] = ee.useState(false);
  ee.useEffect(() => setPlay(false), [e.id]);
  const v = e.video, title = [e.title, e.em].filter(Boolean).join(" ") || e.page;
  let inner;
  if (!play) inner = <Poster e={e} look={look} onPlay={() => setPlay(true)} label={(v ? "Play the video: " : "Play the animated video: ") + title} />;
  else if (!v) inner = <Motion e={e} look={look} onEnd={() => setPlay(false)} />;
  else if (v.kind === "yt") inner = <iframe title={title} src={"https://www.youtube-nocookie.com/embed/" + encodeURIComponent(v.id) + "?autoplay=1&rel=0&modestbranding=1&playsinline=1" + (v.start ? "&start=" + v.start : "")} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen />;
  else if (v.kind === "vimeo") inner = <iframe title={title} src={"https://player.vimeo.com/video/" + encodeURIComponent(v.id) + "?autoplay=1&dnt=1"} allow="autoplay; fullscreen; picture-in-picture" allowFullScreen />;
  else inner = <video src={v.src} controls autoPlay playsInline poster={e.cover === "image" && e.coverUrl ? e.coverUrl : undefined} />;
  return <div className={"pv83-screen" + (v && v.tall && play ? " is-tall" : "")}>{inner}</div>;
}

function Frame({ look, e, children }) {
  const c = look.country ? PV83_BY_ISO[look.country] : null;
  const f = look.frame;
  return (
    <div className={"pv83-frame pv83-frame--" + f}>
      {f === "postcard" ? <span className="pv83-stamp" aria-hidden="true">{c ? <FlagArt iso={c.iso} /> : <Ico n={(look.icons || [])[0]} s={22} />}<small>{c ? c.iso : "FR"}</small></span> : null}
      {f === "postcard" ? <span className="pv83-postmark" aria-hidden="true">{c ? c.cities[0] : "New Delhi"} · {new Date().getFullYear()}</span> : null}
      {f === "boarding" ? <span className="pv83-pass" aria-hidden="true"><b>IN</b><Plane size={16} /><b>{c ? c.iso : "WW"}</b><small>{c ? c.cities[0].toUpperCase() : "WORLDWIDE"} · GATE {two(e.num)}</small></span> : null}
      {f === "tv" ? <span className="pv83-knobs" aria-hidden="true"><i /><i /></span> : null}
      {f === "neon" ? <span className="pv83-neon" aria-hidden="true">{look.country ? (c ? c.hello : "") : "On air"}</span> : null}
      {f === "billboard" ? <span className="pv83-posts" aria-hidden="true"><i /><i /></span> : null}
      {f === "polaroid" ? <span className="pv83-polcap" aria-hidden="true">{e.page}</span> : null}
      {children}
    </div>
  );
}

/* ---- the words beside the video ---- */
function Info({ e, look, onClose, others, onPick }) {
  const pts = (Array.isArray(e.points) ? e.points : []).filter(Boolean);
  const cta = e.cta && e.cta.label && e.cta.to ? e.cta : null;
  const ext = cta && /^https?:/i.test(cta.to);
  const c = look.country ? PV83_BY_ISO[look.country] : null;
  const inRouter = useInRouterContext(); // the admin preview has no router
  return (
    <div className="pv83-info">
      <span className="pv83-eye">
        <svg viewBox="0 0 28 20" width="20" height="14" aria-hidden="true"><rect width="28" height="20" rx="5.5" fill="#fff" /><path d="M11 5.6v8.8l7.6-4.4z" fill="#E62117" /></svg>
        {c ? <span className="pv83-eye__flag"><FlagArt iso={c.iso} /></span> : null}
        {e.eyebrow || e.page}
      </span>
      <h2 id="pv83-h" className="pv83-h">{e.title} {e.em ? <em>{e.em}</em> : null}</h2>
      {e.lede ? <p className="pv83-lede">{e.lede}</p> : null}
      {pts.length ? (
        <ul className={"pv83-pts pv83-pts--" + look.points}>
          {pts.map((p, i) => { const [b, s] = pvPoint(p, i); return <li key={i} style={{ "--i": i, "--w": 1 - i * 0.17 }}><b>{look.points === "tiles" ? <Ico n={(look.icons || [])[i % Math.max(1, (look.icons || []).length)]} s={18} /> : b}</b><span>{s}</span><i aria-hidden="true" /></li>; })}
        </ul>
      ) : null}
      <div className="pv83-cta">
        {cta ? (ext || !inRouter ? <a className="pv83-btn pv83-btn--main" href={cta.to} target={ext ? "_blank" : undefined} rel="noopener noreferrer">{cta.label} →</a> : <Link className="pv83-btn pv83-btn--main" to={cta.to} onClick={onClose}>{cta.label} →</Link>) : null}
        <a className="pv83-btn pv83-btn--yt" href={PV_CHANNEL} target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 28 20" width="22" height="16" aria-hidden="true"><rect width="28" height="20" rx="5.5" fill="#fff" /><path d="M11 5.6v8.8l7.6-4.4z" fill="#E62117" /></svg> Subscribe</a>
      </div>
      {others.length ? (
        <div className="pv83-more"><small>Also on this page</small>{others.map((o) => <button key={o.id} type="button" onClick={() => onPick(o)}>▶ {o.page}</button>)}</div>
      ) : null}
    </div>
  );
}

/* the CSS variables of a look */
const darkOn = (c, ink) => { let x = c, k = 0; while (k++ < 10 && pv83Lum(x) > 0.3) x = pv83Mix(x, ink || "#000", 0.16); return x; };
function lookStyle(look) {
  const p = look.pal || {};
  return { "--h1": darkOn(p.a2, p.pink), "--h2": darkOn(p.a, p.pink), "--bg": p.bg, "--bg2": p.bg2, "--a": p.a, "--a2": p.a2, "--p1": p.p1, "--p2": p.p2, "--pink": p.pink, "--soft": pv83Mix(p.a || "#fff", p.bg || "#000", 0.82), "--motif": pv83MotifUrl(look.motif, p.a, p.a2), "--motif2": pv83MotifUrl(look.motif, pv83Mix(p.a, p.p1, 0.35), pv83Mix(p.a2, p.p1, 0.35)), "--tilt": (look.tilt || 0) + "deg" };
}
/* an imported template file can set the design of a page: look.pack = its id */
function lookOf(e) {
  const studio = pv83Studio();
  const own = e.look && typeof e.look === "object" ? e.look : {};
  const packs = Array.isArray(e.packs) ? e.packs : studio.packs; // the admin preview passes its unsaved templates
  const pack = own.pack && Array.isArray(packs) ? packs.find((x) => x && x.id === own.pack) : null;
  const base = pv83Look({ path: e.path, name: e.page, kind: e.kind, fam: e.fam, country: e.country, panel: e.panel }, e.n);
  return pv83Look({ path: e.path, name: e.page, kind: e.kind, fam: e.fam, country: e.country, panel: e.panel }, e.n, { ...(pack ? pack.look || {} : {}), ...own, icons: (own.icons && own.icons.length ? own.icons : pack && pack.look && pack.look.icons) || base.icons });
}

/* the whole window (same behaviour as the build-70 one: Esc closes, focus stays inside, the page does not scroll) */
function PV83_Window({ list, onClose, inline }) {
  const [cur, setCur] = ee.useState(list[0]);
  ee.useEffect(() => setCur(list[0]), [list]);
  const box = ee.useRef(null);
  ee.useEffect(() => {
    if (inline) return undefined;
    const prev = document.activeElement;
    document.documentElement.classList.add("vd21-lock");
    const k = (ev) => {
      if (ev.key === "Escape") onClose();
      if (ev.key === "Tab" && box.current) {
        const f = [...box.current.querySelectorAll("a[href],button:not([disabled]),iframe,video")];
        if (!f.length) return;
        const a = f[0], z = f[f.length - 1];
        if (ev.shiftKey && document.activeElement === a) (ev.preventDefault(), z.focus());
        else if (!ev.shiftKey && document.activeElement === z) (ev.preventDefault(), a.focus());
      }
    };
    window.addEventListener("keydown", k);
    setTimeout(() => { const b = box.current && box.current.querySelector(".pv83-poster"); (b || box.current) && (b || box.current).focus(); }, 60);
    return () => { document.documentElement.classList.remove("vd21-lock"); window.removeEventListener("keydown", k); try { prev && prev.focus && prev.focus(); } catch (x) {} };
  }, []);
  const e = cur, look = lookOf(e);
  const others = list.filter((o) => o !== e);
  const node = (
    <div className={"pv83" + (inline ? " is-inline" : "") + " pv83--" + look.layout + " pv83-font--" + look.font + " pv83-g--" + look.grade + (reduce() ? " is-still" : "")} style={lookStyle(look)} role={inline ? undefined : "dialog"} aria-modal={inline ? undefined : "true"} aria-labelledby="pv83-h" onMouseDown={(ev) => !inline && ev.target === ev.currentTarget && onClose()}>
      <div className="pv83-bg" aria-hidden="true">
        <i className="pv83-bg__motif" /><i className="pv83-bg__glow" /><i className="pv83-bg__glow pv83-bg__glow--2" />
        {(look.icons || []).slice(0, 5).map((n, i) => <span key={n + i} className="pv83-float" style={{ "--i": i }}><Ico n={n} s={22} /></span>)}
      </div>
      {!inline ? <button type="button" className="pv83-x" onClick={onClose} aria-label="Close the video">×</button> : null}
      <div className="pv83-wrap" ref={box} tabIndex={-1} key={e.id} onMouseDown={(ev) => !inline && ev.target === ev.currentTarget && onClose()}>
        <Info e={e} look={look} onClose={onClose} others={others} onPick={setCur} />
        <div className="pv83-stage"><Frame look={look} e={e}><Screen e={e} look={look} /></Frame></div>
      </div>
    </div>
  );
  return inline || !ci.createPortal ? node : ci.createPortal(node, document.body);
}

/* the window for a page: Studio 83, or the build-70 design when the admin chose a classic one */
function PV83_Theatre({ list, onClose }) {
  const main = list[0];
  if (main && main.template !== "x83" && main.video && main.video.kind === "yt") return <PV_Theatre list={list.filter((x) => x.video && x.video.kind === "yt")} onClose={onClose} />;
  return <PV83_Window list={list} onClose={onClose} />;
}

export { PV83_ICON_NAMES, PV83_Theatre, pv83ForPath, PV83_Window, lookOf as pv83LookOf, Poster as PV83_Poster, lookStyle as pv83LookStyle };
