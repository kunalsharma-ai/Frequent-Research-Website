/*
 * Light / dark theme — build 62. Prefix FRT_ (styles: src/styles/theme.css; dark colours: scripts/darkcss.js output +
 * src/styles/theme-dark.css).
 *
 *   <html data-theme="light|dark">  set before first paint by the boot script (scripts/overlay.config.js bootHtml):
 *                                   saved choice (localStorage "fr-theme") → otherwise the device setting.
 *   dark stylesheet                 dev/preview bundle: inline <style id="fr-dark-css" media="not all"> switched on here;
 *                                   static build: /assets/dark.<hash>.css, written into the page by the boot script
 *                                   (dark visitors only) or added here when someone switches.
 *   FRT_Toggle                      header button before the language button. The switch cross-fades with the View
 *                                   Transitions API where supported (one GPU snapshot, no page-wide CSS transitions),
 *                                   otherwise it is instant. Respects reduced motion.
 */
import * as ee from 'react';
import { k5Sfx } from './Kit65.jsx';
import { fx5Theme } from './Fx65.jsx';

const FRT_KEY = "fr-theme";
function frtCurrent() {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}
function frtEnsureCss(on) {
  const st = document.getElementById("fr-dark-css");
  if (st) {
    st.media = on ? "all" : "not all";
    return Promise.resolve();
  }
  const href = window.__FR_DARK;
  if (!on || !href) return Promise.resolve();
  let ln = document.getElementById("fr-dark-link");
  if (ln) return Promise.resolve();
  return new Promise((res) => {
    ln = document.createElement("link");
    ln.id = "fr-dark-link";
    ln.rel = "stylesheet";
    ln.href = href;
    ln.onload = ln.onerror = () => res();
    document.head.appendChild(ln);
    setTimeout(res, 2500);
  });
}
function frtApply(t) {
  const d = document.documentElement;
  d.setAttribute("data-theme", t);
  const m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute("content", t === "dark" ? "#090D26" : "#07104F");
  try {
    window.dispatchEvent(new CustomEvent("fr-theme", { detail: t }));
  } catch (e) {}
}
function frtSet(t, origin) {
  try {
    localStorage.setItem(FRT_KEY, t);
  } catch (e) {}
  /* build 65 update 4: the sky scene is added with the new theme, so the circular reveal uncovers it */
  const go = () => {
    frtApply(t);
    fx5Theme(t, origin);
  };
  return frtEnsureCss(t === "dark").then(() => {
    const rm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!rm && document.startViewTransition && !document.hidden) {
      const d = document.documentElement;
      if (origin) {
        d.style.setProperty("--frt-x", origin[0] + "px");
        d.style.setProperty("--frt-y", origin[1] + "px");
      }
      d.classList.add("frt-vt");
      try {
        const vt = document.startViewTransition(go);
        vt.finished.finally(() => d.classList.remove("frt-vt"));
      } catch (e) {
        d.classList.remove("frt-vt");
        go();
      }
    } else go();
  });
}
function FRT_Toggle() {
  const [t, setT] = ee.useState(frtCurrent);
  ee.useEffect(() => {
    frtEnsureCss(frtCurrent() === "dark");
    const on = (e) => setT(e.detail);
    window.addEventListener("fr-theme", on);
    /* follow the device setting until the visitor chooses */
    const mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const sys = () => {
      let saved = null;
      try {
        saved = localStorage.getItem(FRT_KEY);
      } catch (e) {}
      if (saved) return;
      const want = mq.matches ? "dark" : "light";
      frtEnsureCss(want === "dark").then(() => frtApply(want));
    };
    mq && mq.addEventListener && mq.addEventListener("change", sys);
    return () => {
      window.removeEventListener("fr-theme", on);
      mq && mq.removeEventListener && mq.removeEventListener("change", sys);
    };
  }, []);
  const dark = t === "dark";
  const click = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    k5Sfx(dark ? "light" : "dark"); /* build 65: theme switch sound */
    frtSet(dark ? "light" : "dark", [r.left + r.width / 2, r.top + r.height / 2]);
  };
  return (
    <button type="button" className={"frt-btn" + (dark ? " is-dark" : "")} onClick={click} aria-pressed={dark} aria-label={dark ? "Switch to light theme" : "Switch to dark theme"} title={dark ? "Light theme" : "Dark theme"}>
      <span className="frt-btn__i" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <mask id="frt-m">
            <rect width="24" height="24" fill="#fff" />
            <circle className="frt-btn__cut" cx="17" cy="7" r="6" fill="#000" />
          </mask>
          <circle className="frt-btn__sun" cx="12" cy="12" r="5" mask="url(#frt-m)" fill="currentColor" />
          <g className="frt-btn__rays" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </g>
        </svg>
      </span>
    </button>
  );
}

export { FRT_Toggle };
