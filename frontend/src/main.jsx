// Entry point of the Frequent Research site.
// 1. Stylesheets, in this order (core.css first; contrast-fixes, dark65, header14 and golive26 last on purpose).
//    vite/fr-site.js builds the dark theme from this same list.
// 2. The modules the home page needs (build 74). Every other module is in full.jsx, in the order the site was built in.
// 3. React starts.
import './styles/core.css';
import './styles/google-ads-ppc.css';
import './styles/social-media-marketing.css';
import './styles/dm-kit.css';
import './styles/online-reputation-management.css';
import './styles/dm-kit2.css';
import './styles/dm-kit4.css';
import './styles/dm-heroes.css';
import './styles/it-kit.css';
import './styles/it-pages.css';
import './styles/it-tx.css';
import './styles/dm-growth.css';
import './styles/it-ix.css';
import './styles/it-uxd.css';
import './styles/fr-kit.css';
import './styles/faq.css';
import './styles/blog-cover.css';
import './styles/marketplace-art.css';
import './styles/home-cta.css';
import './styles/floaters.css';
import './styles/connect.css';
import './styles/page-hero.css';
import './styles/site-reviews.css';
import './styles/country-picker.css';
import './styles/it-v44.css';
import './styles/site-v44.css';
import './styles/sampledge.css';
import './styles/esomar37.css';
import './styles/live-reviews.css';
import './styles/chat-v51.css';
import './styles/gate.css';
import './styles/downloads.css';
import './styles/case-study.css';
import './styles/footer.css';
import './styles/lets-talk.css';
import './styles/rates-reviews.css';
import './styles/products.css';
import './styles/earn.css';
import './styles/i18n.css';
import './styles/theme.css';
import './styles/fx65.css';
import './styles/hero63.css';
import './styles/accounts-finance.css';
import './styles/af63.css';
import './styles/af63-visuals.css';
import './styles/af64.css';
import './styles/af65.css';
import './styles/design58.css';
import './styles/kit65.css';
import './styles/about65.css';
import './styles/about65x.css';
import './styles/about17.css';
import './styles/about18.css';
import './styles/journey65.css';
import './styles/careers65.css';
import './styles/gallery25.css';
import './styles/gallery25hero.css';
import './styles/downloads65.css';
import './styles/downloads8.css';
import './styles/panelcountry65.css';
import './styles/panelcountry8.css';
import './styles/panelbooks10.css';
import './styles/logos13.css';
import './styles/quality65.css';
import './styles/servicequality65.css';
import './styles/industries65.css';
import './styles/industries18.css';
import './styles/reach19.css';
import './styles/about19.css';
import './styles/downloads19.css';
import './styles/hero20.css';
import './styles/video21.css';
import './styles/celebrate22.css';
import './styles/about21.css';
import './styles/products65.css';
import './styles/products65x.css';
import './styles/sampledge8.css';
import './styles/gov8.css';
import './styles/connect65.css';
import './styles/perf.css';
import './styles/perf21.css';
import './styles/contrast-fixes.css';
import './styles/dark65.css';
import './styles/header14.css';
import './styles/golive26.css';
import './styles/cms.css';
import './styles/contrast67.css';
import './styles/pagevideo69.css';
// build 79: the new home page hero (design79/HomeHero79.jsx) and the fonts of the new heroes
import '@fontsource-variable/unbounded/wght.css';
import '@fontsource/instrument-serif/latin-400.css';
import '@fontsource/instrument-serif/latin-400-italic.css';
import '@fontsource-variable/jetbrains-mono/wght.css';
import './design79/h79.css';
// build 79: the new heroes of the platform pages, every service page and All services
import './design79/ph79.css';
import './design79/s79.css';
import './design80/c80.css';
import './design80/k80.css';
import './design80/k80b.css';
import './design80/k80c.css';
import './design80/k80d.css';
// build 81: the home hero pictures
import './design81/hx81.css';
import './design82/x82.css';
import './styles/admin.css';
// build 83.3: equal round floating buttons (last, so it wins)
import './styles/fab833.css';
// Build 74: the home page needs only the modules below (and what they import); the rest of the site is in full.jsx,
// loaded by app/full.js (before the first render on any other page).
import './app/cms.jsx';
import './app/nav.jsx';
import './app/chat/knowledge.jsx';
import './app/shared/Reveal.jsx';
import './app/shared/Brand.jsx';
import './app/shared/SiteEffects.jsx';
import './components/site/Floaters.jsx';
import './components/site/Logos13.jsx';
import './components/site/LangSound.jsx';
import './components/site/Motion.jsx';
import './components/site/I18n.jsx';
import './components/site/Theme.jsx';
import './components/site/Fx65.jsx';
import './components/site/Perf65.jsx';
import './components/site/Protect.jsx';
import './components/site/Video21.jsx';
import './components/site/Celebrate22.jsx';
import './components/site/Festivals22.jsx';
import './app/startupCore.jsx';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { NAV_HASH } from './app/nav.jsx';
import { cmsApplyStart } from './app/cms.jsx';
import { cms78Start } from './app/cms78.jsx';
import { contrastGuardStart } from './app/contrastGuard.jsx';
import { altFill } from './app/altText.js';
import * as l from 'react/jsx-runtime';
import { SiteApp } from './app/SiteApp.jsx';
import { loadFull, loadFullWhenUsed } from './app/full.js';
import { cb22Ready } from './components/site/Celebrate22.jsx';

// normal addresses; hash addresses only in the offline preview opened from file:// (app/nav.jsx)
const SiteRouter = NAV_HASH ? HashRouter : BrowserRouter;
// the super admin panel lives at /admin (src/admin), outside the site's own layout
// window.__FR_ADMIN_DEMO: the one-file admin demo (scripts/make-admin-demo.cjs) always opens the admin
const IS_ADMIN = typeof location !== "undefined" && (!!window.__FR_ADMIN_DEMO || (!NAV_HASH && /^\/admin(\/|$)/.test(location.pathname)));
// build 74: the home page starts with its own modules only and fetches the rest of the site once the visitor starts to
// use the page; every other page waits for the rest of the site first, so it starts exactly as before (app/full.js)
const ROUTE = NAV_HASH ? (location.hash.replace(/^#/, "").split("?")[0] || "/") : location.pathname;
// build 74: the stylesheet is downloaded without holding up the first paint (index.html, id="fr-css"); it is switched on
// here, in its original place, and the site appears once it applies (dev server: a normal stylesheet, nothing to do)
const cssOn = () =>
  new Promise((ok) => {
    const pre = document.getElementById("fr-css");
    if (!pre) return ok();
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = pre.href;
    if (pre.crossOrigin != null) css.crossOrigin = pre.crossOrigin;
    const t = setTimeout(ok, 10000);
    css.onload = css.onerror = () => {
      clearTimeout(t);
      ok();
    };
    pre.replaceWith(css);
  });
const CSS = cssOn();
const start = (Admin) => CSS.then(() => start1(Admin));
const start1 = (Admin) => {
  // v7_startTransition: a link followed before its page has arrived keeps the current page on screen until it is ready
  const site = l.jsx(SiteRouter, { future: { v7_startTransition: true }, children: l.jsx(SiteApp, {}) });
  const root = createRoot(document.getElementById("root"));
  const tree = l.jsx(React.StrictMode, { children: Admin ? l.jsx(Admin, {}) : site });
  // build 74: the first render runs in short slices, so the page stays responsive while it builds
  if (Admin) root.render(tree);
  else React.startTransition(() => root.render(tree));
  // the super admin's text, picture and link changes, on/off switches and page-view counting (app/cms.jsx)
  cmsApplyStart();
  // build 78: new sections and pages, section styles, form fields, logos and card designs (app/cms78.jsx)
  cms78Start();
  // text colours that are too faint for their background get a darker / lighter shade of the same colour
  contrastGuardStart();
  // build 82.7 (SEO): every picture gets an alt text and its own width and height once it has loaded (app/altText.js)
  if (!Admin) altFill();
  if (window.__FR_LITE) liteHandOver();
};
// build 75/76: on a phone or desktop the home page first shows a ready-made copy of its first screen (scripts/phone-shell.cjs);
// once the real page has replaced it: drop the copy's own styles, keep the visitor's scroll place, and tap again the
// button they tapped on the copy (menu, chat, language…)
const liteHandOver = () => {
  const y = window.scrollY, t0 = Date.now();
  const wait = () => {
    if (document.querySelector("#root > [data-fr-shell]")) return Date.now() - t0 < 15000 ? requestAnimationFrame(wait) : undefined;
    document.querySelectorAll("style[id^=fr-lite-css]").forEach((x) => x.remove());
    document.documentElement.classList.remove("fr-ps-go");
    setTimeout(() => {
      if (y > 0) window.scrollTo({ top: y, behavior: "instant" });
      const q = window.__FR_TAP;
      window.__FR_TAP = null;
      if (!q) return;
      let n = 0;
      const tap = () => {
        const el = document.querySelector(q);
        if (el) el.click();
        else if (++n < 40) setTimeout(tap, 50);
      };
      tap();
    }, 60);
  };
  requestAnimationFrame(wait);
};
// build 78: the admin also loads the rest of the site (full.jsx), so every list it edits (blog posts, products, case studies,
// team…) opens with what the website shows today instead of an empty list
if (IS_ADMIN) Promise.all([import("./admin/AdminApp.jsx"), loadFull().catch(() => null)]).then(([m]) => start(m.AdminApp));
else if (ROUTE === "/" || ROUTE === "") {
  // today's celebration banner is part of the home page's first screen: draw it with the rest (waits 0.6 s at most)
  cb22Ready(600).then(() => start(), () => start());
  loadFullWhenUsed();
} else loadFull().then(() => start(), () => start());
