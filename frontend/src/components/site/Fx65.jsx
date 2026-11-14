import { frsCtxGet, frsOn } from './Floaters.jsx';
import { FRI_BY } from './I18n.jsx';
/*
 * Language and theme switch effects — build 65 update 4. Prefix FX5_ / fx5 (styles: src/styles/fx65.css).
 *
 *   fx5Lang(code)        full-screen scene when a visitor picks a language (called from friPick in I18n.jsx, alongside
 *                        the language's own motif from LangSound.jsx). Every language gets its own mix of: reveal shape
 *                        (from where they clicked), particle motion, flag-tinted colours, glyphs from its own script,
 *                        its native name in a letter cascade and a welcome line in that language. The page underneath
 *                        settles in with a short zoom/blur as the scene lifts.
 *   fx5Theme(t, origin)  sky scene for the light/dark switch (called from frtSet in Theme.jsx inside the View
 *                        Transition, so it is revealed by the circle): sunrise rays and warm motes for light, moonrise,
 *                        twinkling stars and a shooting star for dark, plus a soft air sweep sound.
 *   Reduced motion: a short cross-fade with the name only. Sounds follow the site sound switch (frsOn).
 */
const FX5_WELCOME = {
  en: "Welcome", "zh-CN": "欢迎", "zh-TW": "歡迎", es: "Bienvenido", hi: "स्वागत है", ar: "أهلاً وسهلاً", pt: "Bem-vindo",
  fr: "Bienvenue", de: "Willkommen", ja: "ようこそ", ko: "환영합니다", ru: "Добро пожаловать", id: "Selamat datang",
  it: "Benvenuto", tr: "Hoş geldiniz", vi: "Chào mừng", th: "ยินดีต้อนรับ", nl: "Welkom", pl: "Witamy", bn: "স্বাগতম",
  ur: "خوش آمدید", fa: "خوش آمدید", he: "ברוכים הבאים", ms: "Selamat datang", fil: "Maligayang pagdating", sw: "Karibu",
  uk: "Ласкаво просимо", ro: "Bun venit", el: "Καλώς ήρθατε", cs: "Vítejte", sv: "Välkommen", hu: "Üdvözöljük",
  da: "Velkommen", fi: "Tervetuloa", no: "Velkommen", ta: "நல்வரவு", te: "స్వాగతం", mr: "स्वागत आहे", gu: "સ્વાગત છે",
  kn: "ಸ್ವಾಗತ", ml: "സ്വാഗതം", pa: "ਜੀ ਆਇਆਂ ਨੂੰ", ne: "स्वागत छ", si: "ආයුබෝවන්", km: "សូមស្វាគមន៍", lo: "ຍິນດີຕ້ອນຮັບ",
  af: "Welkom", sq: "Mirë se vini", hy: "Բարի գալուստ", az: "Xoş gəlmisiniz", eu: "Ongi etorri", be: "Сардэчна запрашаем",
  bs: "Dobro došli", bg: "Добре дошли", ca: "Benvinguts", hr: "Dobro došli", eo: "Bonvenon", et: "Tere tulemast",
  lv: "Laipni lūdzam", lt: "Sveiki atvykę", sk: "Vitajte", sl: "Dobrodošli", sr: "Добродошли", mk: "Добредојдовте",
  ka: "მოგესალმებით", kk: "Қош келдіңіз", is: "Velkomin", ga: "Fáilte", cy: "Croeso", gl: "Benvidos", mt: "Merħba",
  lb: "Wëllkomm", zu: "Siyakwamukela", xh: "Wamkelekile", so: "Soo dhawoow", uz: "Xush kelibsiz", ha: "Barka da zuwa",
};
/* calm, flag-derived colours for the language's main country (first two = glow, third = accent) */
const FX5_COL = {
  en: ["#2B59D9", "#C8102E", "#F2F5FF"], "zh-CN": ["#DE2910", "#FFDE00", "#FF8A65"], "zh-TW": ["#0E3E9E", "#E3342F", "#FFFFFF"],
  es: ["#C60B1E", "#FFC400", "#FFE08A"], hi: ["#FF9933", "#138808", "#FFFFFF"], ar: ["#007A3D", "#C9A227", "#FFFFFF"],
  pt: ["#009C3B", "#FFDF00", "#3E7BFA"], fr: ["#0055A4", "#EF4135", "#FFFFFF"], de: ["#DD0000", "#FFCE00", "#3A3A3A"],
  ja: ["#BC002D", "#F7C8D0", "#FFFFFF"], ko: ["#0047A0", "#CD2E3A", "#FFFFFF"], ru: ["#0039A6", "#D52B1E", "#FFFFFF"],
  id: ["#CE1126", "#F5F5F5", "#FF8A8A"], it: ["#009246", "#CE2B37", "#FFFFFF"], tr: ["#E30A17", "#FFFFFF", "#FF8A8A"],
  vi: ["#DA251D", "#FFCD00", "#FFE38A"], th: ["#2D2A4A", "#A51931", "#F4F5F8"], nl: ["#AE1C28", "#21468B", "#FFFFFF"],
  pl: ["#DC143C", "#F5F5F5", "#FF9AA9"], bn: ["#006A4E", "#F42A41", "#FFFFFF"], ur: ["#01411C", "#FFFFFF", "#7AD39B"],
  fa: ["#239F40", "#DA0000", "#FFFFFF"], he: ["#0038B8", "#FFFFFF", "#8FB0FF"], ms: ["#010066", "#CC0001", "#FFCC00"],
  fil: ["#0038A8", "#CE1126", "#FCD116"], sw: ["#1EB53A", "#00A3DD", "#FCD116"], uk: ["#0057B7", "#FFD700", "#FFE88A"],
  ro: ["#002B7F", "#FCD116", "#CE1126"], el: ["#0D5EAF", "#FFFFFF", "#8FC1FF"], cs: ["#11457E", "#D7141A", "#FFFFFF"],
  sv: ["#006AA7", "#FECC00", "#FFE680"], hu: ["#CD2A3E", "#436F4D", "#FFFFFF"], da: ["#C8102E", "#FFFFFF", "#FF8A99"],
  fi: ["#002F6C", "#FFFFFF", "#8FB3FF"], no: ["#BA0C2F", "#00205B", "#FFFFFF"], ta: ["#FF9933", "#138808", "#FFD27F"],
  te: ["#FF9933", "#138808", "#FFD27F"], mr: ["#FF9933", "#138808", "#FFD27F"], gu: ["#FF9933", "#138808", "#FFD27F"],
  kn: ["#FF9933", "#138808", "#FFD27F"], ml: ["#FF9933", "#138808", "#FFD27F"], pa: ["#FF9933", "#138808", "#FFD27F"],
  ne: ["#DC143C", "#003893", "#FFFFFF"], si: ["#8D153A", "#FFB700", "#00534E"], my: ["#FECB00", "#34B233", "#EA2839"],
  km: ["#032EA1", "#E00025", "#FFFFFF"], lo: ["#CE1126", "#002868", "#FFFFFF"], af: ["#007749", "#FFB81C", "#DE3831"],
};
const FX5_STYLES = ["ripple", "curtain", "diamond", "wave", "shutter", "bloom", "ink", "sweep"];
const FX5_PAL = [
  ["#2B59D9", "#00BFA6", "#F2F5FF"], ["#6D4AFF", "#00D9FF", "#F2F5FF"], ["#0E9C88", "#F4B942", "#FFFFFF"],
  ["#4169E1", "#F4B942", "#FFFFFF"], ["#C2416B", "#4169E1", "#FFFFFF"], ["#00806F", "#6D4AFF", "#FFFFFF"],
];
const fx5Hash = (s) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
};
const FX5_RTL = /[֐-׿؀-ۿݐ-ݿހ-޿]/;
/* scripts whose letters join or stack: animate whole words so the shaping stays intact */
const FX5_JOIN = /[֐-׿؀-ۿݐ-޿ऀ-෿฀-໿က-႟ក-៿ሀ-፿]/;
function fx5Style(code, name) {
  if (/^(zh|ja)/.test(code)) return "ink";
  if (code === "ko") return "shutter";
  if (FX5_RTL.test(name)) return "sweep";
  if (/[ऀ-෿]/.test(name)) return "bloom";
  if (/[฀-໿က-႟ក-៿]/.test(name)) return "wave";
  if (/[Ѐ-ӿ]/.test(name)) return "curtain";
  return FX5_STYLES[fx5Hash(code) % 6];
}
function fx5Graphemes(s) {
  try {
    if (typeof Intl !== "undefined" && Intl.Segmenter) return Array.from(new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s), (x) => x.segment);
  } catch (e) {}
  return Array.from(s);
}
const fx5Reduce = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/* where the visitor last pressed: the scene grows from there */
let fx5At = null;
if (typeof window !== "undefined") window.addEventListener("pointerdown", (e) => (fx5At = [e.clientX, e.clientY, performance.now()]), true);
function fx5Origin() {
  if (fx5At && performance.now() - fx5At[2] < 4000) return [fx5At[0], fx5At[1]];
  return [window.innerWidth - 120, 40];
}
/* soft air sweep, tuned per scene */
function fx5Whoosh(f0, f1, dur = 0.9, vol = 0.05, pan = 0) {
  try {
    if (typeof frsOn === "function" && !frsOn()) return;
    const c = typeof frsCtxGet === "function" ? frsCtxGet() : null;
    if (!c) return;
    const n = Math.floor(c.sampleRate * dur);
    const buf = c.createBuffer(1, n, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / n);
    const src = c.createBufferSource();
    src.buffer = buf;
    const bp = c.createBiquadFilter();
    bp.type = "bandpass";
    bp.Q.value = 1.4;
    const t = c.currentTime + 0.01;
    bp.frequency.setValueAtTime(f0, t);
    bp.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + dur * 0.35);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let out = g;
    if (c.createStereoPanner) {
      const p = c.createStereoPanner();
      p.pan.setValueAtTime(-pan, t);
      p.pan.linearRampToValueAtTime(pan, t + dur);
      g.connect(p);
      out = p;
    }
    src.connect(bp).connect(g);
    out.connect(c.destination);
    src.start(t);
    src.stop(t + dur + 0.05);
  } catch (e) {}
}
/* particle field on a canvas; motion depends on the scene style */
function fx5Field(cv, opt) {
  const ctx = cv.getContext("2d");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth,
    H = window.innerHeight;
  cv.width = W * dpr;
  cv.height = H * dpr;
  ctx.scale(dpr, dpr);
  const [ox, oy] = opt.o;
  const N = opt.n || 70;
  const rnd = (a, b) => a + Math.random() * (b - a);
  const P = Array.from({ length: N }, (_, i) => {
    const a = (i / N) * Math.PI * 2 + rnd(-0.2, 0.2);
    const s = opt.style;
    const p = { g: opt.glyphs.length ? opt.glyphs[i % opt.glyphs.length] : "", c: opt.cols[i % opt.cols.length], sz: rnd(12, opt.style === "ink" ? 44 : 30), d: rnd(0, 0.35), a, r0: rnd(0, 30), rot: rnd(-0.6, 0.6), dot: i % 3 === 0 };
    if (s === "sweep") Object.assign(p, { x: opt.rtl ? W + rnd(0, 200) : -rnd(0, 200), y: rnd(0, H), vx: (opt.rtl ? -1 : 1) * rnd(W * 0.8, W * 1.4) });
    else if (s === "curtain") Object.assign(p, { x: rnd(0, W), y: H + rnd(0, 120), vy: -rnd(H * 0.7, H * 1.2) });
    else if (s === "shutter") Object.assign(p, { x: rnd(0, W), y: -rnd(0, 160), vy: rnd(H * 0.7, H * 1.2) });
    else if (s === "wave") Object.assign(p, { x: -rnd(0, W * 0.4), y: rnd(H * 0.15, H * 0.85), vx: rnd(W * 0.9, W * 1.3), ph: rnd(0, 6.28) });
    else if (s === "ink") Object.assign(p, { x: rnd(0, W), y: rnd(0, H), vx: rnd(-40, 40), vy: rnd(-60, -10) });
    return p;
  });
  const T = opt.dur;
  let raf = 0;
  const t0 = performance.now();
  const frame = (now) => {
    const t = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    const life = Math.min(1, t / T);
    for (const p of P) {
      const k = Math.max(0, Math.min(1, (t - p.d) / (T - p.d)));
      if (k <= 0) continue;
      const e = 1 - Math.pow(1 - k, 3);
      let x, y, rot = p.rot * k;
      const R = Math.hypot(W, H) * 0.62;
      switch (opt.style) {
        case "ripple":
          x = ox + Math.cos(p.a) * (p.r0 + R * e);
          y = oy + Math.sin(p.a) * (p.r0 + R * e);
          break;
        case "diamond": {
          const q = Math.round(p.a / (Math.PI / 2)) * (Math.PI / 2) + Math.PI / 4;
          const aa = q + (p.a - q) * 0.25;
          x = ox + Math.cos(aa) * (p.r0 + R * e);
          y = oy + Math.sin(aa) * (p.r0 + R * e);
          break;
        }
        case "bloom": {
          const aa = p.a + e * 2.4;
          const rr = p.r0 + R * 0.85 * e;
          x = ox + Math.cos(aa) * rr;
          y = oy + Math.sin(aa) * rr;
          rot = aa;
          break;
        }
        case "wave":
          x = p.x + p.vx * e;
          y = p.y + Math.sin(p.ph + e * 9) * 40;
          break;
        case "sweep":
          x = p.x + p.vx * e;
          y = p.y + Math.sin(e * 3 + p.a) * 18;
          break;
        case "curtain":
        case "shutter":
          x = p.x + Math.sin(e * 5 + p.a) * 14;
          y = p.y + p.vy * e;
          break;
        default: /* ink */
          x = p.x + p.vx * e;
          y = p.y + p.vy * e;
      }
      const al = Math.sin(Math.PI * k) * (1 - life * 0.25);
      ctx.save();
      ctx.globalAlpha = Math.max(0, al) * (opt.style === "ink" ? 0.55 : 0.9);
      ctx.translate(x, y);
      ctx.rotate(rot);
      if (p.dot || !p.g) {
        ctx.fillStyle = p.c;
        ctx.shadowColor = p.c;
        ctx.shadowBlur = 14;
        ctx.beginPath();
        ctx.arc(0, 0, p.sz * 0.09, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = p.c;
        ctx.font = `700 ${p.sz}px Inter, "Noto Sans", system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.g, 0, 0);
      }
      ctx.restore();
    }
    if (t < T) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return () => cancelAnimationFrame(raf);
}
let fx5Busy = null;
function fx5Lang(code) {
  if (typeof document === "undefined" || !document.body) return;
  const L = typeof FRI_BY !== "undefined" && FRI_BY[code];
  if (!L) return;
  if (fx5Busy) fx5Busy();
  const rm = fx5Reduce();
  const o = fx5Origin();
  const name = L.name;
  const style = fx5Style(code, name);
  const rtl = !!L.rtl;
  const h = fx5Hash(code);
  const cols = FX5_COL[code] || FX5_PAL[h % FX5_PAL.length];
  const welcome = FX5_WELCOME[code] || "";
  const d = document.documentElement;
  const el = document.createElement("div");
  el.className = "fx5-lang fx5-lang--" + style + (rm ? " fx5-rm" : "");
  el.setAttribute("aria-hidden", "true");
  el.style.setProperty("--c1", cols[0]);
  el.style.setProperty("--c2", cols[1]);
  el.style.setProperty("--c3", cols[2]);
  el.style.setProperty("--x", o[0] + "px");
  el.style.setProperty("--y", o[1] + "px");
  el.style.setProperty("--px", ((o[0] / window.innerWidth) * 100).toFixed(1) + "%");
  el.style.setProperty("--py", ((o[1] / window.innerHeight) * 100).toFixed(1) + "%");
  const join = FX5_JOIN.test(name);
  const units = join ? name.split(/(\s+)/) : fx5Graphemes(name);
  const letters = units.map((u, i) => (/^\s+$/.test(u) ? " " : `<span style="--i:${i}">${u.replace(/[<&]/g, "")}</span>`)).join("");
  el.innerHTML =
    (style === "shutter" ? '<div class="fx5-blinds">' + "<i></i>".repeat(7) + "</div>" : "") +
    '<div class="fx5-lang__bg"></div><canvas class="fx5-lang__cv"></canvas>' +
    `<div class="fx5-lang__txt" dir="${rtl ? "rtl" : "ltr"}" lang="${code}">` +
    `<div class="fx5-lang__ring"></div>` +
    `<b class="fx5-lang__name">${letters}</b>` +
    (welcome ? `<span class="fx5-lang__hi">${welcome}</span>` : "") +
    `<small class="fx5-lang__en" dir="ltr">${L.en.replace(/[<&]/g, "")}</small></div>`;
  document.body.appendChild(el);
  const glyphs = fx5Graphemes((name + welcome).replace(/\s+/g, "")).filter((g) => g.trim());
  let stop = () => {};
  if (!rm) {
    stop = fx5Field(el.querySelector("canvas"), { o, style, rtl, glyphs, cols: [cols[2], "#FFFFFF", fx5Mix(cols[0], "#FFFFFF", 0.45), fx5Mix(cols[1], "#FFFFFF", 0.4)], dur: 1.9, n: window.innerWidth < 700 ? 44 : 78 });
    const pan = (o[0] / window.innerWidth) * 2 - 1;
    const f = 300 + (h % 7) * 120;
    fx5Whoosh(f, f * (style === "curtain" ? 5 : style === "shutter" ? 0.5 : 3.2), 0.95, 0.045, rtl ? -0.6 : pan * 0.6);
  }
  requestAnimationFrame(() => el.classList.add("is-in"));
  const hold = rm ? 700 : 1250;
  const t1 = setTimeout(() => {
    el.classList.add("is-out");
    d.classList.add("fx5-settle");
    if (!rm) fx5Whoosh(2400, 700, 0.6, 0.025, 0);
  }, hold);
  const t2 = setTimeout(() => done(), hold + (rm ? 300 : 800));
  const done = () => {
    clearTimeout(t1);
    clearTimeout(t2);
    stop();
    el.remove();
    setTimeout(() => d.classList.remove("fx5-settle"), 50);
    fx5Busy = null;
  };
  fx5Busy = done;
}
function fx5Mix(a, b, t) {
  const p = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
  const A = p(a),
    B = p(b);
  return "#" + A.map((v, i) => Math.round(v + (B[i] - v) * t).toString(16).padStart(2, "0")).join("");
}
/* light / dark sky */
function fx5Theme(t, origin) {
  if (typeof document === "undefined" || !document.body || fx5Reduce()) return;
  const o = origin || fx5Origin();
  const dark = t === "dark";
  const old = document.querySelector(".fx5-sky");
  if (old) old.remove();
  const el = document.createElement("div");
  el.className = "fx5-sky fx5-sky--" + (dark ? "dark" : "light");
  el.setAttribute("aria-hidden", "true");
  el.style.setProperty("--x", o[0] + "px");
  el.style.setProperty("--y", o[1] + "px");
  el.innerHTML = dark
    ? '<canvas class="fx5-sky__cv"></canvas><i class="fx5-moon"></i><i class="fx5-shoot"></i><i class="fx5-shoot fx5-shoot--2"></i>'
    : '<canvas class="fx5-sky__cv"></canvas><i class="fx5-sun"></i><i class="fx5-rays"></i><i class="fx5-flare"></i>';
  document.body.appendChild(el);
  const cv = el.querySelector("canvas");
  const ctx = cv.getContext("2d");
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = window.innerWidth,
    H = window.innerHeight;
  cv.width = W * dpr;
  cv.height = H * dpr;
  ctx.scale(dpr, dpr);
  const n = W < 700 ? 90 : 190;
  const P = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * (dark ? 2 : 3.4) + 0.5, d: Math.random() * 0.7, tw: Math.random() * 6.28, vy: dark ? 0 : -(20 + Math.random() * 60) }));
  const t0 = performance.now();
  const T = 1.7;
  let raf = 0;
  const frame = (now) => {
    const s = (now - t0) / 1000;
    ctx.clearRect(0, 0, W, H);
    for (const p of P) {
      const dist = Math.hypot(p.x - o[0], p.y - o[1]) / Math.hypot(W, H);
      const k = Math.max(0, Math.min(1, (s - p.d * 0.4 - dist * 0.6) / 0.9));
      if (k <= 0) continue;
      const a = Math.sin(Math.PI * k) * (dark ? 0.6 + 0.4 * Math.sin(p.tw + s * 14) : 0.7);
      ctx.globalAlpha = Math.max(0, a);
      if (dark) {
        ctx.fillStyle = "#E8EEFF";
        ctx.shadowColor = "#9FB6FF";
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        if (p.r > 1.5) {
          ctx.fillRect(p.x - p.r * 3, p.y - 0.4, p.r * 6, 0.8);
          ctx.fillRect(p.x - 0.4, p.y - p.r * 3, 0.8, p.r * 6);
        }
      } else {
        ctx.fillStyle = "#FFD27A";
        ctx.shadowColor = "#FFB547";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(p.x, p.y + p.vy * k, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    if (s < T) raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  requestAnimationFrame(() => el.classList.add("is-in"));
  const pan = (o[0] / W) * 2 - 1;
  dark ? fx5Whoosh(1800, 320, 1.1, 0.035, pan * 0.5) : fx5Whoosh(260, 2600, 1, 0.035, pan * 0.5);
  setTimeout(() => el.classList.add("is-out"), 1250);
  setTimeout(() => {
    cancelAnimationFrame(raf);
    el.remove();
  }, 1900);
}

export { fx5Lang, fx5Theme };
