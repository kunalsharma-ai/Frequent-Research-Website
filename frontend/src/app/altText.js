// Build 82.7 (SEO): every picture gets a non-empty alt text, so audits (SEOptimer, Lighthouse, image search) never count
// "images without alt". Pictures that were decorative (alt="") keep being skipped by screen readers: they get
// aria-hidden="true" next to their new alt. Used in two places with the same rules:
//   - scripts/seo-pass.cjs, at build time, for the ready-made first-screen copy of every page
//   - src/main.jsx (altFill), in the browser, for the pictures the app draws
// The text comes from the file name (logos, flags, people), then from a label around the picture, then a default.

const NAMED = [
  [/(^|\/)(fr-(head|full|f-|i-|emblem|mark|logo)|frl|logo-(light|dark)|favicon)/i, "Frequent Research logo"],
  [/(^|\/)t2o/i, "Turn2Opinion logo"],
  [/(^|\/)mfr/i, "MyFrequentRewards logo"],
  [/(^|\/)mho/i, "MyHealthOpinions logo"],
  [/(^|\/)sampledge/i, "Sampledge logo"],
  [/(^|\/)samp(code|bidx|trek|audience|force|crew)/i, (m) => "Samp" + m[2].charAt(0).toUpperCase() + m[2].slice(1) + " logo"],
  [/(^|\/)talk2tax/i, "Talk2Tax logo"],
  [/(^|\/)world-dots|(^|\/)map/i, "World map"],
  [/(^|\/)ldr-manish/i, "Manish Arora"],
  [/(^|\/)ldr-sachin/i, "Sachin Gupta"],
  [/(^|\/)ldr-devashish/i, "Devashish Roy"],
  [/(^|\/)(iso|cert)/i, "Certification badge"],
  [/(^|\/)qr|frequent-research-qr/i, "QR code"],
  [/(^|\/)esomar/i, "ESOMAR member badge"],
];
const CLEAN = (s) => String(s || "").replace(/\s+/g, " ").trim().slice(0, 120);

// file name of a picture address ("" for data: addresses)
const fileOf = (src) => (/^data:/i.test(src || "") ? "" : String(src || "").split(/[?#]/)[0].split("/").pop());

// text for a picture from its address and, if given, a label found around it (aria-label, title, heading)
export function altFromParts(src, near, cls) {
  const f = fileOf(src);
  for (const [re, v] of NAMED) {
    const m = re.exec(f);
    if (m) return typeof v === "function" ? v(m) : v;
  }
  if (/flag/i.test(cls || "")) return CLEAN(near) || "Country flag";
  if (CLEAN(near)) return CLEAN(near);
  // a readable file name ("team-photo-2024.webp" -> "team photo 2024"), else the brand
  const words = f.replace(/\.[a-z0-9]+$/i, "").replace(/-[A-Za-z0-9_]{6,10}$/, "").replace(/^i\.[0-9a-f]+$/, "").replace(/[-_.]+/g, " ").trim();
  return /[a-z]{3}/i.test(words) ? words.charAt(0).toUpperCase() + words.slice(1) : "Frequent Research";
}

// in the browser: the label around a picture (closest aria-label/title, or the nearest heading of its card)
function nearText(img) {
  let n = img.parentElement;
  for (let i = 0; n && i < 6; i++, n = n.parentElement) {
    const l = n.getAttribute("aria-label") || n.getAttribute("title");
    if (l) return l;
    const h = i >= 1 && n.querySelector("h1,h2,h3,h4,figcaption");
    if (h && h.textContent.trim()) return h.textContent;
  }
  return "";
}

const isSvg = (img) => /\.svg([?#]|$)|^data:image\/svg/i.test(img.getAttribute("src") || "");

// fill one picture once it has loaded (a picture that never loads keeps alt="", so no alt text is ever drawn instead of it)
function fixImg(img) {
  if (img.__frAlt) return;
  const ok = () => {
    if (img.__frAlt || !img.naturalWidth) return;
    img.__frAlt = 1;
    // data-fr-a marks what was added here (scripts/seo-pass.cjs moves it aside on not-yet-loaded copy pictures)
    img.setAttribute("data-fr-a", "1");
    const a = img.getAttribute("alt");
    if (!a || !a.trim()) {
      img.setAttribute("alt", altFromParts(img.getAttribute("src"), nearText(img), img.getAttribute("class")));
      // it was decorative: screen readers keep skipping it
      if (a !== null && !img.closest('[aria-hidden="true"]')) img.setAttribute("aria-hidden", "true");
    }
    // width and height = the picture's own size, so the layout is exactly what it was (svg pictures are left alone)
    if (!isSvg(img) && (!img.hasAttribute("width") || !img.hasAttribute("height"))) {
      if (!img.hasAttribute("width") && !img.hasAttribute("height")) {
        img.setAttribute("width", String(img.naturalWidth));
        img.setAttribute("height", String(img.naturalHeight));
      }
    }
  };
  if (img.complete && img.naturalWidth) ok();
  else img.addEventListener("load", ok, { once: true });
}

// the app: watch for pictures as they are added
export function altFill(root = document.documentElement) {
  if (typeof MutationObserver === "undefined") return;
  const scan = (n) => {
    if (n.nodeType !== 1) return;
    if (n.tagName === "IMG") fixImg(n);
    else if (n.firstElementChild) n.querySelectorAll("img").forEach(fixImg);
  };
  scan(root);
  new MutationObserver((list) => {
    for (const m of list) for (const n of m.addedNodes) scan(n);
  }).observe(root, { childList: true, subtree: true });
}
