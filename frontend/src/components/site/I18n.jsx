/*
 * Languages — build 58. Prefix FRI_. Styles: src/styles/i18n.css (fri-).
 *
 * A language button sits in the header on every page (desktop and mobile). Visitors can read the site in 130+ languages.
 *
 * How the text is translated, best source first:
 *   1. Our own dictionaries  src/i18n/dict/<code>.json  ({"English text": "translation"}), hand-translated. The build
 *      writes cache-busted copies to public/i18n/<code>.<hash>.json and injects the list into FRI_DICTS. They load
 *      only when that language is picked, need no outside service and also work in mainland China.
 *   2. The translator built into the visitor's browser (Chrome/Edge "Translator" API, on-device, free) for anything
 *      the dictionary does not cover, when the browser has it.
 *   3. Google's free website translator (translate.google.com/translate_a/element.js), loaded only when a visitor
 *      picks a language and neither of the above covers the page. It is blocked in mainland China; there the site
 *      keeps our own translations and English for the rest.
 *
 * Text is swapped in place (text nodes + placeholder/aria-label/title/alt), so React keeps working; a MutationObserver
 * translates new content (route changes, dialogs, chat) before it is painted. English is always restored exactly.
 * Elements with translate="no", class "notranslate" or data-fri-skip are never translated (brand names, language
 * names, people's names in reviews).
 *
 * Choice: ?lang=<code> in any URL (good for campaigns, e.g. /?lang=zh-CN) > the visitor's saved choice > their browser
 * language when we have our own dictionary for it (with a one-tap "English" toast) > English.
 */
import * as ee from 'react';
import { frlPlay } from './LangSound.jsx';
import { fx5Lang } from './Fx65.jsx';
import { ccPortal } from './CountryPicker.jsx';
import { FRK_I } from './FrKit.jsx';

/* [code, Google code, native name, English name, right-to-left] */
const FRI_LANGS = [
  ["en", "en", "English", "English"],
  ["zh-CN", "zh-CN", "简体中文", "Chinese (Simplified)"],
  ["zh-TW", "zh-TW", "繁體中文", "Chinese (Traditional)"],
  ["es", "es", "Español", "Spanish"],
  ["hi", "hi", "हिन्दी", "Hindi"],
  ["ar", "ar", "العربية", "Arabic", 1],
  ["pt", "pt", "Português", "Portuguese"],
  ["fr", "fr", "Français", "French"],
  ["de", "de", "Deutsch", "German"],
  ["ja", "ja", "日本語", "Japanese"],
  ["ko", "ko", "한국어", "Korean"],
  ["ru", "ru", "Русский", "Russian"],
  ["id", "id", "Bahasa Indonesia", "Indonesian"],
  ["it", "it", "Italiano", "Italian"],
  ["tr", "tr", "Türkçe", "Turkish"],
  ["vi", "vi", "Tiếng Việt", "Vietnamese"],
  ["th", "th", "ไทย", "Thai"],
  ["nl", "nl", "Nederlands", "Dutch"],
  ["pl", "pl", "Polski", "Polish"],
  ["bn", "bn", "বাংলা", "Bengali"],
  ["ur", "ur", "اردو", "Urdu", 1],
  ["fa", "fa", "فارسی", "Persian", 1],
  ["he", "iw", "עברית", "Hebrew", 1],
  ["ms", "ms", "Bahasa Melayu", "Malay"],
  ["fil", "tl", "Filipino", "Filipino"],
  ["sw", "sw", "Kiswahili", "Swahili"],
  ["uk", "uk", "Українська", "Ukrainian"],
  ["ro", "ro", "Română", "Romanian"],
  ["el", "el", "Ελληνικά", "Greek"],
  ["cs", "cs", "Čeština", "Czech"],
  ["sv", "sv", "Svenska", "Swedish"],
  ["hu", "hu", "Magyar", "Hungarian"],
  ["da", "da", "Dansk", "Danish"],
  ["fi", "fi", "Suomi", "Finnish"],
  ["no", "no", "Norsk", "Norwegian"],
  ["ta", "ta", "தமிழ்", "Tamil"],
  ["te", "te", "తెలుగు", "Telugu"],
  ["mr", "mr", "मराठी", "Marathi"],
  ["gu", "gu", "ગુજરાતી", "Gujarati"],
  ["kn", "kn", "ಕನ್ನಡ", "Kannada"],
  ["ml", "ml", "മലയാളം", "Malayalam"],
  ["pa", "pa", "ਪੰਜਾਬੀ", "Punjabi"],
  ["or", "or", "ଓଡ଼ିଆ", "Odia"],
  ["as", "as", "অসমীয়া", "Assamese"],
  ["ne", "ne", "नेपाली", "Nepali"],
  ["si", "si", "සිංහල", "Sinhala"],
  ["my", "my", "မြန်မာ", "Burmese"],
  ["km", "km", "ខ្មែរ", "Khmer"],
  ["lo", "lo", "ລາວ", "Lao"],
  ["af", "af", "Afrikaans", "Afrikaans"],
  ["sq", "sq", "Shqip", "Albanian"],
  ["am", "am", "አማርኛ", "Amharic"],
  ["hy", "hy", "Հայերեն", "Armenian"],
  ["ay", "ay", "Aymar aru", "Aymara"],
  ["az", "az", "Azərbaycan", "Azerbaijani"],
  ["bm", "bm", "Bamanankan", "Bambara"],
  ["eu", "eu", "Euskara", "Basque"],
  ["be", "be", "Беларуская", "Belarusian"],
  ["bho", "bho", "भोजपुरी", "Bhojpuri"],
  ["bs", "bs", "Bosanski", "Bosnian"],
  ["bg", "bg", "Български", "Bulgarian"],
  ["ca", "ca", "Català", "Catalan"],
  ["ceb", "ceb", "Cebuano", "Cebuano"],
  ["ny", "ny", "Chichewa", "Chichewa"],
  ["co", "co", "Corsu", "Corsican"],
  ["hr", "hr", "Hrvatski", "Croatian"],
  ["dv", "dv", "ދިވެހި", "Dhivehi", 1],
  ["doi", "doi", "डोगरी", "Dogri"],
  ["eo", "eo", "Esperanto", "Esperanto"],
  ["et", "et", "Eesti", "Estonian"],
  ["ee", "ee", "Eʋegbe", "Ewe"],
  ["fy", "fy", "Frysk", "Frisian"],
  ["gl", "gl", "Galego", "Galician"],
  ["ka", "ka", "ქართული", "Georgian"],
  ["gn", "gn", "Avañe'ẽ", "Guarani"],
  ["ht", "ht", "Kreyòl ayisyen", "Haitian Creole"],
  ["ha", "ha", "Hausa", "Hausa"],
  ["haw", "haw", "ʻŌlelo Hawaiʻi", "Hawaiian"],
  ["hmn", "hmn", "Hmoob", "Hmong"],
  ["is", "is", "Íslenska", "Icelandic"],
  ["ig", "ig", "Igbo", "Igbo"],
  ["ilo", "ilo", "Ilokano", "Ilocano"],
  ["ga", "ga", "Gaeilge", "Irish"],
  ["jv", "jw", "Basa Jawa", "Javanese"],
  ["kk", "kk", "Қазақ", "Kazakh"],
  ["rw", "rw", "Kinyarwanda", "Kinyarwanda"],
  ["gom", "gom", "कोंकणी", "Konkani"],
  ["kri", "kri", "Krio", "Krio"],
  ["ku", "ku", "Kurdî", "Kurdish (Kurmanji)"],
  ["ckb", "ckb", "کوردی", "Kurdish (Sorani)", 1],
  ["ky", "ky", "Кыргызча", "Kyrgyz"],
  ["la", "la", "Latina", "Latin"],
  ["lv", "lv", "Latviešu", "Latvian"],
  ["ln", "ln", "Lingála", "Lingala"],
  ["lt", "lt", "Lietuvių", "Lithuanian"],
  ["lg", "lg", "Luganda", "Luganda"],
  ["lb", "lb", "Lëtzebuergesch", "Luxembourgish"],
  ["mk", "mk", "Македонски", "Macedonian"],
  ["mai", "mai", "मैथिली", "Maithili"],
  ["mg", "mg", "Malagasy", "Malagasy"],
  ["mt", "mt", "Malti", "Maltese"],
  ["mi", "mi", "Māori", "Maori"],
  ["mni-Mtei", "mni-Mtei", "ꯃꯤꯇꯩꯂꯣꯟ", "Meiteilon (Manipuri)"],
  ["lus", "lus", "Mizo ṭawng", "Mizo"],
  ["mn", "mn", "Монгол", "Mongolian"],
  ["om", "om", "Afaan Oromoo", "Oromo"],
  ["ps", "ps", "پښتو", "Pashto", 1],
  ["qu", "qu", "Runasimi", "Quechua"],
  ["sm", "sm", "Gagana Samoa", "Samoan"],
  ["sa", "sa", "संस्कृतम्", "Sanskrit"],
  ["gd", "gd", "Gàidhlig", "Scots Gaelic"],
  ["nso", "nso", "Sepedi", "Sepedi"],
  ["sr", "sr", "Српски", "Serbian"],
  ["st", "st", "Sesotho", "Sesotho"],
  ["sn", "sn", "chiShona", "Shona"],
  ["sd", "sd", "سنڌي", "Sindhi", 1],
  ["sk", "sk", "Slovenčina", "Slovak"],
  ["sl", "sl", "Slovenščina", "Slovenian"],
  ["so", "so", "Soomaali", "Somali"],
  ["su", "su", "Basa Sunda", "Sundanese"],
  ["tg", "tg", "Тоҷикӣ", "Tajik"],
  ["tt", "tt", "Татар", "Tatar"],
  ["ti", "ti", "ትግርኛ", "Tigrinya"],
  ["ts", "ts", "Xitsonga", "Tsonga"],
  ["tk", "tk", "Türkmen", "Turkmen"],
  ["ak", "ak", "Akan", "Twi (Akan)"],
  ["ug", "ug", "ئۇيغۇرچە", "Uyghur", 1],
  ["uz", "uz", "Oʻzbek", "Uzbek"],
  ["cy", "cy", "Cymraeg", "Welsh"],
  ["xh", "xh", "isiXhosa", "Xhosa"],
  ["yi", "yi", "ייִדיש", "Yiddish", 1],
  ["yo", "yo", "Yorùbá", "Yoruba"],
  ["zu", "zu", "isiZulu", "Zulu"],
];
/* own dictionaries, injected by the build: { "zh-CN": { h: "<hash>", n: <entries> }, … } */
const FRI_DICTS = "__FRI_MANIFEST__";
const FRI_BY = {};
FRI_LANGS.forEach((x) => (FRI_BY[x[0]] = { code: x[0], g: x[1], name: x[2], en: x[3], rtl: !!x[4] }));
const friOwn = (c) => !!(FRI_DICTS && typeof FRI_DICTS === "object" && FRI_DICTS[c]);
const friStore = {
  get: (k) => {
    try {
      return localStorage.getItem(k);
    } catch (e) {
      return null;
    }
  },
  set: (k, v) => {
    try {
      v == null ? localStorage.removeItem(k) : localStorage.setItem(k, v);
    } catch (e) {}
  },
};
/* browser language → our code ("zh-Hans-CN" → zh-CN, "zh-HK" → zh-TW, "pt-BR" → pt, "iw" → he …) */
function friMatch(tag) {
  if (!tag) return null;
  const t = String(tag).toLowerCase();
  if (/^zh/.test(t)) return /hant|tw|hk|mo/.test(t) ? "zh-TW" : "zh-CN";
  const alias = { iw: "he", tl: "fil", jw: "jv", nb: "no", nn: "no", in: "id" };
  const base = alias[t.split("-")[0]] || t.split("-")[0];
  const hit = FRI_LANGS.find((x) => x[0].toLowerCase() === t) || FRI_LANGS.find((x) => x[0].toLowerCase() === base);
  return hit ? hit[0] : null;
}

/* ---------- state ---------- */
const FRI = { lang: "en", engine: "", busy: false, auto: false, subs: new Set() };
const friEmit = () => FRI.subs.forEach((f) => f({ ...FRI }));
function friUse() {
  const [s, set] = ee.useState(() => ({ ...FRI }));
  ee.useEffect(() => {
    FRI.subs.add(set);
    set({ ...FRI });
    return () => FRI.subs.delete(set);
  }, []);
  return s;
}

/* ---------- dictionary lookup ---------- */
let FRI_DICT = null; // { key: translation }
let FRI_CJK = false;
const FRI_CJK_CH = /[\u3000-\u30ff\u3400-\u9fff\uff00-\uffef]/;
const friKey = (s) => s.replace(/\s+/g, " ").trim();
const FRI_WORD = /\p{L}/u;
const FRI_NUM = /\d+(?:[.,:]\d+)*/g;
function friLookup(src) {
  if (!FRI_DICT) return null;
  const key = friKey(src);
  if (!key || !FRI_WORD.test(key)) return null;
  let t = FRI_DICT[key];
  if (t == null && /\d/.test(key)) {
    /* "Showing 12 of 200" → template "Showing # of #" with the numbers put back in order */
    const nums = key.match(FRI_NUM) || [];
    const tpl = FRI_DICT[key.replace(FRI_NUM, "#")];
    if (tpl != null) {
      let i = 0;
      t = tpl.replace(/#/g, () => (nums[i] != null ? nums[i++] : "#"));
    }
  }
  if (t == null) return null;
  let lead = src.match(/^\s*/)[0],
    trail = src.match(/\s*$/)[0];
  /* Chinese/Japanese: no spaces next to CJK characters (English fragments were separated by spaces) */
  if (FRI_CJK) {
    if (lead && FRI_CJK_CH.test(t[0])) lead = "";
    if (trail && FRI_CJK_CH.test(t[t.length - 1])) trail = "";
  }
  return lead + t + trail;
}

/* ---------- DOM swap ---------- */
const FRI_TXT = new WeakMap(); // text node → { src, out }
const FRI_ATT = new WeakMap(); // element → { attr: { src, out } }
let FRI_NODES = new Set(); // touched text nodes / elements (for restoring English)
const FRI_PEND = new Set(); // nodes the dictionary could not translate (for the machine engine)
const FRI_ATTRS = ["placeholder", "aria-label", "title", "alt"];
const FRI_SKIP_TAG = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1, TEMPLATE: 1, IFRAME: 1, CANVAS: 1, TEXTAREA: 1 };
const FRI_SKIP_SEL = '[translate="no"],.notranslate,[data-fri-skip]';
const friSkipEl = (el) => !el || FRI_SKIP_TAG[el.tagName] || (el.closest && el.closest(FRI_SKIP_SEL));

function friText(node) {
  const v = node.nodeValue;
  if (!v || !FRI_WORD.test(v)) return;
  const rec = FRI_TXT.get(node);
  if (rec && v === rec.out) return;
  const out = friLookup(v);
  if (out != null && out !== v) {
    FRI_TXT.set(node, { src: v, out });
    FRI_NODES.add(node);
    node.nodeValue = out;
  } else {
    if (rec) FRI_TXT.delete(node);
    if (FRI.engine === "browser") FRI_PEND.add(node);
  }
}
function friAttr(el, a) {
  const v = el.getAttribute(a);
  if (!v || !FRI_WORD.test(v)) return;
  let m = FRI_ATT.get(el);
  const rec = m && m[a];
  if (rec && v === rec.out) return;
  const out = friLookup(v);
  if (out != null && out !== v) {
    if (!m) FRI_ATT.set(el, (m = {}));
    m[a] = { src: v, out };
    FRI_NODES.add(el);
    el.setAttribute(a, out);
  } else if (rec) delete m[a];
}
function friAttrsOf(el) {
  for (const a of FRI_ATTRS) if (el.hasAttribute(a)) friAttr(el, a);
  if (el.tagName === "INPUT" && /^(submit|button|reset)$/i.test(el.type) && el.value) friAttr(el, "value");
}
function friWalk(root) {
  if (!root) return;
  if (root.nodeType === 3) {
    if (!friSkipEl(root.parentElement)) friText(root);
    return;
  }
  if (root.nodeType !== 1 || friSkipEl(root)) return;
  if (root.tagName === "INPUT") return friAttrsOf(root);
  friAttrsOf(root);
  const tw = document.createTreeWalker(root, 5 /* element | text */, {
    acceptNode(n) {
      if (n.nodeType === 3) return 1;
      if (FRI_SKIP_TAG[n.tagName]) {
        if (n.tagName === "TEXTAREA") friAttrsOf(n);
        return 2; // reject subtree
      }
      if (n.getAttribute("translate") === "no" || n.hasAttribute("data-fri-skip") || n.classList.contains("notranslate")) return 2;
      return 1;
    },
  });
  let n;
  while ((n = tw.nextNode())) n.nodeType === 3 ? friText(n) : friAttrsOf(n);
}
function friRestore() {
  FRI_NODES.forEach((n) => {
    if (n.nodeType === 3) {
      const r = FRI_TXT.get(n);
      if (r && n.nodeValue === r.out) n.nodeValue = r.src;
      FRI_TXT.delete(n);
    } else {
      const m = FRI_ATT.get(n);
      if (m) Object.keys(m).forEach((a) => n.getAttribute(a) === m[a].out && n.setAttribute(a, m[a].src));
      FRI_ATT.delete(n);
    }
  });
  FRI_NODES = new Set();
  FRI_PEND.clear();
}
let FRI_MO = null;
function friObserve(on) {
  if (!on) {
    if (FRI_MO) FRI_MO.disconnect();
    FRI_MO = null;
    return;
  }
  if (FRI_MO || typeof MutationObserver === "undefined") return;
  FRI_MO = new MutationObserver((recs) => {
    if (FRI.lang === "en" || !FRI_DICT) return;
    for (const r of recs) {
      if (r.type === "childList") r.addedNodes.forEach(friWalk);
      else if (r.type === "characterData") {
        if (!friSkipEl(r.target.parentElement)) friText(r.target);
      } else if (r.type === "attributes" && !friSkipEl(r.target)) friAttr(r.target, r.attributeName);
    }
    FRI_MO.takeRecords(); // drop the records our own swaps just produced
    if (FRI_PEND.size) friMachineSoon();
  });
  FRI_MO.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: FRI_ATTRS });
}
/* prune references to nodes React has removed, so a long visit does not keep them in memory */
setInterval(() => {
  if (FRI_NODES.size > 4000) FRI_NODES.forEach((n) => n.isConnected || FRI_NODES.delete(n));
}, 30000);

/* ---------- machine engines ---------- */
let FRI_TR = null; // browser Translator instance
const FRI_MCACHE = {};
let friMachineT = 0;
function friMachineSoon() {
  clearTimeout(friMachineT);
  friMachineT = setTimeout(friMachineRun, 60);
}
async function friMachineRun() {
  if (!FRI_TR || FRI.engine !== "browser") return;
  const lang = FRI.lang;
  const cache = (FRI_MCACHE[lang] = FRI_MCACHE[lang] || {});
  const nodes = [...FRI_PEND];
  FRI_PEND.clear();
  const todo = [...new Set(nodes.filter((n) => n.isConnected).map((n) => friKey(n.nodeValue || "")))].filter((k) => k && FRI_WORD.test(k) && cache[k] == null);
  const LIM = 4;
  let i = 0;
  await Promise.all(
    Array.from({ length: LIM }, async () => {
      while (i < todo.length && FRI.lang === lang) {
        const k = todo[i++];
        try {
          cache[k] = await FRI_TR.translate(k);
        } catch (e) {
          cache[k] = k;
        }
      }
    })
  );
  if (FRI.lang !== lang) return;
  if (FRI_MO) FRI_MO.disconnect();
  nodes.forEach((n) => {
    const v = n.nodeValue || "";
    const k = friKey(v);
    const t = cache[k];
    if (!n.isConnected || !t || t === k) return;
    const out = v.match(/^\s*/)[0] + t + v.match(/\s*$/)[0];
    FRI_TXT.set(n, { src: v, out });
    FRI_NODES.add(n);
    n.nodeValue = out;
  });
  FRI_MO = null;
  friObserve(true);
}
async function friBrowserEngine(code) {
  try {
    if (typeof self === "undefined" || !("Translator" in self)) return null;
    const target = code === "zh-CN" ? "zh" : code === "zh-TW" ? "zh-Hant" : code;
    const av = await self.Translator.availability({ sourceLanguage: "en", targetLanguage: target });
    if (av === "unavailable" || av === "no") return null;
    return await self.Translator.create({ sourceLanguage: "en", targetLanguage: target });
  } catch (e) {
    return null;
  }
}
/* Google's free website translator. It rewrites text with <font> tags, which can trip React; the two DOM guards below
   are the widely used fix (they only change behaviour when a node has already been moved by the translator). */
let friGuarded = false;
function friGuardDom() {
  if (friGuarded || typeof Node !== "function") return;
  friGuarded = true;
  const rc = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child && child.parentNode !== this) return child;
    return rc.apply(this, arguments);
  };
  const ib = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (node, ref) {
    if (ref && ref.parentNode !== this) return ib.call(this, node, null);
    return ib.apply(this, arguments);
  };
}
function friCookie(g) {
  const host = location.hostname;
  const doms = ["", host.split(".").length > 1 ? "; domain=." + host.replace(/^www\./, "") : ""];
  doms.forEach((d) => (document.cookie = g ? `googtrans=/en/${g}; path=/${d}` : `googtrans=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${d}`));
}
function friGoogle(g) {
  friGuardDom();
  friCookie(g);
  /* text we already translated ourselves is kept: its element is marked translate="no" when all of its text is ours */
  FRI_NODES.forEach((n) => {
    const el = n.nodeType === 3 ? n.parentElement : null;
    if (el && el.isConnected && ![...el.childNodes].some((c) => c.nodeType === 3 && FRI_WORD.test(c.nodeValue) && !FRI_TXT.get(c)) && !el.children.length) el.setAttribute("translate", "no");
  });
  let box = document.getElementById("fri-gt");
  if (!box) {
    box = document.createElement("div");
    box.id = "fri-gt";
    box.setAttribute("aria-hidden", "true");
    document.body.appendChild(box);
  }
  const pick = (tries = 0) => {
    const sel = box.querySelector("select.goog-te-combo");
    if (sel && sel.options.length > 1) {
      sel.value = g;
      sel.dispatchEvent(new Event("change"));
    } else if (tries < 40) setTimeout(() => pick(tries + 1), 250);
  };
  if (window.google && window.google.translate && window.google.translate.TranslateElement) return pick();
  window.friGTInit = () => {
    try {
      new window.google.translate.TranslateElement({ pageLanguage: "en", autoDisplay: false }, "fri-gt");
    } catch (e) {}
    pick();
  };
  const s = document.createElement("script");
  s.src = "https://translate.google.com/translate_a/element.js?cb=friGTInit";
  s.async = true;
  s.onerror = () => {
    FRI.engine = FRI_DICT ? "own" : "none";
    friEmit();
  };
  document.head.appendChild(s);
}

/* ---------- dictionary loading ---------- */
const FRI_LOADED = {};
function friFetch(code) {
  if (FRI_LOADED[code]) return FRI_LOADED[code];
  const inl = typeof window !== "undefined" && window.__FRI_INLINE && window.__FRI_INLINE[code];
  if (inl) return (FRI_LOADED[code] = Promise.resolve(inl));
  const early = window.__FRI_P && window.__FRI_P.code === code ? window.__FRI_P.p : null;
  const m = FRI_DICTS[code];
  FRI_LOADED[code] = (early || fetch(`/i18n/${code}.${m.h}.json`).then((r) => (r.ok ? r.json() : Promise.reject(r.status)))).catch(() => {
    delete FRI_LOADED[code];
    return null;
  });
  return FRI_LOADED[code];
}

/* ---------- switching ---------- */
const friHtml = () => document.documentElement;
function friUnveil() {
  friHtml().classList.remove("fri-wait");
}
async function friSet(code, opts = {}) {
  const L = FRI_BY[code] ? code : "en";
  const prev = FRI.lang;
  const wasGoogle = FRI.engine === "google";
  if (opts.save !== false) friStore.set("fr-lang", L);
  if (wasGoogle && L !== prev) {
    /* the Google translator cannot be switched off cleanly: clear it and reload */
    friCookie(null);
    /* let the language sound finish before reloading */
    setTimeout(() => location.reload(), opts.user ? 1500 : 0);
    return;
  }
  FRI.lang = L;
  FRI_CJK = /^(zh|ja)/.test(L);
  FRI.auto = !!opts.auto;
  FRI.busy = L !== "en";
  friEmit();
  friObserve(false);
  friRestore();
  FRI_DICT = null;
  FRI_TR = null;
  const html = friHtml();
  html.lang = L === "en" ? "en" : L;
  html.classList.toggle("fri-rtl", !!FRI_BY[L].rtl);
  html.classList.toggle("fri-on", L !== "en");
  if (L === "en") {
    FRI.engine = "";
    FRI.busy = false;
    friCookie(null);
    friEmit();
    friUnveil();
    return;
  }
  let engine = "";
  if (friOwn(L)) {
    const d = await friFetch(L);
    if (FRI.lang !== L) return;
    if (d) {
      FRI_DICT = d;
      engine = FRI.engine = "own";
      friWalk(document.body);
      friObserve(true);
    }
  }
  friUnveil();
  friEmit();
  const tr = await friBrowserEngine(L);
  if (FRI.lang !== L) return;
  if (tr) {
    FRI_TR = tr;
    if (!FRI_DICT) FRI_DICT = {};
    FRI.engine = "browser";
    friObserve(true);
    /* queue everything the dictionary left in English */
    const tw = document.createTreeWalker(document.body, 4);
    let n;
    while ((n = tw.nextNode())) if (FRI_WORD.test(n.nodeValue) && !FRI_TXT.get(n) && !friSkipEl(n.parentElement)) FRI_PEND.add(n);
    friMachineRun();
  } else if (opts.google !== false) {
    FRI.engine = "google";
    friGoogle(FRI_BY[L].g);
  } else FRI.engine = engine || "none";
  FRI.busy = false;
  friEmit();
}
/* a visitor's own choice: play that language's signature sound (LangSound.jsx), then switch */
function friPick(c) {
  if (typeof frlPlay === "function") frlPlay(c);
  if (typeof fx5Lang === "function") fx5Lang(c); /* build 65 update 4: full-screen language scene */
  return friSet(c, { user: true });
}
/* first decision, once the app has rendered */
let friBooted = false;
function friBoot() {
  if (friBooted) return;
  friBooted = true;
  let code = null,
    auto = false;
  try {
    const m = /[?&]lang=([A-Za-z-]+)/.exec(location.search + location.hash);
    if (m) code = friMatch(m[1]) || (FRI_BY[m[1]] ? m[1] : null);
  } catch (e) {}
  if (code) friStore.set("fr-lang", code);
  else code = friStore.get("fr-lang");
  if (!code && !navigator.webdriver) {
    const b = friMatch((navigator.languages && navigator.languages[0]) || navigator.language);
    if (b && b !== "en" && friOwn(b)) (code = b), (auto = true);
    else if (b && b !== "en") FRI.suggest = b;
  }
  if (code && code !== "en" && FRI_BY[code]) friSet(code, { save: !auto, auto });
  else {
    friUnveil();
    friEmit();
  }
}

/* ---------- UI ---------- */
const FRI_GLYPHS = ["A", "文", "अ", "ع", "あ", "Я", "가", "ñ"];
function FRI_Glyph() {
  return (
    <span className="fri-glyph" aria-hidden="true">
      <svg viewBox="0 0 24 24" className="fri-glyph__globe">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3c3 3.2 3 14.8 0 18M12 3c-3 3.2-3 14.8 0 18" />
      </svg>
      <span className="fri-glyph__wheel">
        {FRI_GLYPHS.map((g, i) => (
          <i key={g} style={{ "--i": i }}>
            {g}
          </i>
        ))}
      </span>
    </span>
  );
}
const friShort = (c) => (c === "en" ? "EN" : c === "zh-CN" ? "简体" : c === "zh-TW" ? "繁體" : FRI_BY[c] ? FRI_BY[c].name : c);
function FRI_Switch({ place = "header" }) {
  const s = friUse();
  const [open, setOpen] = ee.useState(false);
  const btn = ee.useRef(null);
  ee.useEffect(() => {
    if (place !== "header") return undefined;
    /* boot once the header (and so the app) is on screen */
    const t = setTimeout(friBoot, 0);
    return () => clearTimeout(t);
  }, [place]);
  ee.useEffect(() => {
    const o = () => setOpen(true);
    window.addEventListener("fri-open", o);
    return () => window.removeEventListener("fri-open", o);
  }, []);
  const L = FRI_BY[s.lang] || FRI_BY.en;
  return (
    <>
      <button
        ref={btn}
        type="button"
        className={"fri-btn fri-btn--" + place + (s.lang !== "en" ? " is-on" : "") + (s.busy ? " is-busy" : "")}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-expanded={open}
        translate="no"
        title="Language"
      >
        <FRI_Glyph />
        <span className="fri-btn__t">{friShort(s.lang)}</span>
        <span className="fri-sr">Language: {L.en}. Change language</span>
      </button>
      {open && ccPortal(<FRI_Panel onClose={() => (setOpen(false), btn.current && btn.current.focus())} />)}
      {place === "header" && <FRI_Toast />}
    </>
  );
}
function FRI_Row({ c, cur, onPick, own }) {
  const L = FRI_BY[c];
  return (
    <li>
      <button type="button" className={"fri-row" + (cur === c ? " is-cur" : "") + (own ? " is-own" : "")} onClick={() => onPick(c)} aria-current={cur === c ? "true" : undefined} lang={c} translate="no" dir={L.rtl ? "rtl" : undefined}>
        <b>{L.name}</b>
        <small>{L.en}</small>
        {cur === c && (
          <span className="fri-row__tick" aria-hidden="true">
            <FRK_I n="check" s={14} sw={3} />
          </span>
        )}
      </button>
    </li>
  );
}
function FRI_Panel({ onClose }) {
  const s = friUse();
  const [q, setQ] = ee.useState("");
  const box = ee.useRef(null);
  const inp = ee.useRef(null);
  ee.useEffect(() => {
    const k = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    const t = setTimeout(() => inp.current && window.matchMedia("(min-width: 721px)").matches && inp.current.focus(), 60);
    document.documentElement.classList.add("fri-lock");
    return () => (document.removeEventListener("keydown", k), clearTimeout(t), document.documentElement.classList.remove("fri-lock"));
  }, [onClose]);
  const pick = (c) => {
    onClose();
    friPick(c);
  };
  const qq = q.trim().toLowerCase();
  const hit = (c) => !qq || (FRI_BY[c].name + " " + FRI_BY[c].en + " " + c).toLowerCase().includes(qq);
  const own = ["en", ...FRI_LANGS.map((x) => x[0]).filter((c) => friOwn(c))].filter(hit);
  const rest = FRI_LANGS.map((x) => x[0])
    .filter((c) => c !== "en" && !friOwn(c))
    .sort((a, b) => FRI_BY[a].en.localeCompare(FRI_BY[b].en))
    .filter(hit);
  const mine = [...new Set(((navigator.languages || [navigator.language]) || []).map(friMatch).filter(Boolean))].filter((c) => c !== s.lang).slice(0, 4);
  const eng = s.engine;
  return (
    <div className="fri-ov" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="fri-panel" role="dialog" aria-modal="true" aria-labelledby="fri-h" ref={box}>
        <div className="fri-panel__aurora" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <header className="fri-panel__head">
          <div className="fri-panel__orb" aria-hidden="true">
            <FRI_Glyph />
          </div>
          <div>
            <h2 id="fri-h">Choose your language</h2>
            <p>Read the whole website in your language — 130+ languages.</p>
          </div>
          <button type="button" className="fri-x" onClick={onClose} aria-label="Close">
            <FRK_I n="x" s={18} sw={2.4} />
          </button>
        </header>
        <label className="fri-search">
          <FRK_I n="eye" s={16} />
          <input ref={inp} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search languages" aria-label="Search languages" />
        </label>
        {!qq && mine.length > 0 && (
          <div className="fri-sugg">
            <span>Your browser</span>
            {mine.map((c) => (
              <button key={c} type="button" onClick={() => pick(c)} lang={c} translate="no">
                {FRI_BY[c].name}
              </button>
            ))}
          </div>
        )}
        <div className="fri-lists">
          {own.length > 0 && (
            <section className="fri-group fri-group--own">
              <h3>
                <FRK_I n="spark" s={14} /> Translated by our team
              </h3>
              <ul>
                {own.map((c) => (
                  <FRI_Row key={c} c={c} cur={s.lang} onPick={pick} own={c !== "en"} />
                ))}
              </ul>
            </section>
          )}
          {rest.length > 0 && (
            <section className="fri-group">
              <h3>
                <FRK_I n="globe" s={14} /> Instant translation
              </h3>
              <ul>
                {rest.map((c) => (
                  <FRI_Row key={c} c={c} cur={s.lang} onPick={pick} />
                ))}
              </ul>
            </section>
          )}
          {!own.length && !rest.length && <p className="fri-none">No language matches “{q}”.</p>}
        </div>
        <footer className="fri-panel__foot">
          {eng === "google" ? (
            <span>Machine translation · Powered by Google Translate</span>
          ) : eng === "browser" ? (
            <span>Our translations, completed by your browser's built-in translator</span>
          ) : eng === "own" ? (
            <span>Translated by the Frequent Research team</span>
          ) : (
            <span>Tip: share any page in a language by adding ?lang=zh-CN (or another code) to the link.</span>
          )}
        </footer>
      </div>
    </div>
  );
}
/* one-tap toast after an automatic switch, or a suggestion for browser languages without our own dictionary */
function FRI_Toast() {
  const s = friUse();
  const [hide, setHide] = ee.useState(false);
  const sug = FRI.suggest && !friStore.get("fr-lang") && !friStore.get("fr-lang-ask") ? FRI.suggest : null;
  ee.useEffect(() => {
    if (!(s.auto || sug)) return undefined;
    const t = setTimeout(() => setHide(true), 9000);
    return () => clearTimeout(t);
  }, [s.auto, sug]);
  if (hide) return null;
  if (s.auto && s.lang !== "en")
    return (
      <div className="fri-toast" role="status" translate="no">
        <FRI_Glyph />
        <span lang={s.lang}>{FRI_BY[s.lang].name}</span>
        <button type="button" onClick={() => (friPick("en"), setHide(true))}>
          English
        </button>
        <button type="button" className="fri-toast__x" aria-label="Keep this language" onClick={() => (friStore.set("fr-lang", s.lang), setHide(true))}>
          <FRK_I n="check" s={14} sw={3} />
        </button>
      </div>
    );
  if (sug && s.lang === "en")
    return (
      <div className="fri-toast" role="status">
        <FRI_Glyph />
        <span>
          Read in{" "}
          <b lang={sug} translate="no">
            {FRI_BY[sug].name}
          </b>
          ?
        </span>
        <button type="button" onClick={() => (friPick(sug), setHide(true))}>
          Yes
        </button>
        <button type="button" className="fri-toast__x" aria-label="No thanks" onClick={() => (friStore.set("fr-lang-ask", "1"), setHide(true))}>
          <FRK_I n="x" s={14} sw={2.6} />
        </button>
      </div>
    );
  return null;
}
/* inline row of language chips (home hero): opens or applies a language directly */
function FRI_Chips({ list = ["zh-CN", "es", "ar", "hi", "ja", "fr", "de", "pt"] }) {
  const s = friUse();
  return (
    <div className="fri-chips" translate="no">
      {list
        .filter((c) => FRI_BY[c])
        .map((c) => (
          <button key={c} type="button" lang={c} className={s.lang === c ? "is-cur" : ""} onClick={() => friPick(c)}>
            {FRI_BY[c].name}
          </button>
        ))}
      <button type="button" className="fri-chips__more" onClick={() => window.dispatchEvent(new Event("fri-open"))}>
        +{FRI_LANGS.length - list.length - 1}
      </button>
    </div>
  );
}

export { FRI_BY, FRI_Glyph, FRI_LANGS, FRI_Switch, friBoot, friPick, friShort, friUse };
