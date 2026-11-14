/*
 * Build 68: one Sampledge product site inside the Frequent Research page. Prefix PZ_ (styles: the product's own).
 *
 * Each product (src/products/<slug>/) is the product team's own React site, without its own top bar and footer (this
 * site's header and footer are used). It is loaded only on its page (its own script chunk) and rendered into a shadow
 * root, so its styles and this site's styles never touch each other. The light-DOM children of the host are the
 * readable copy for search engines and for the prerendered page; the shadow root hides them once the product is shown.
 *
 * Inside the product: "#section" links scroll to that section below this site's header, site links (/lets-talk…)
 * open through the router, and every other link behaves as written.
 */
import * as ee from 'react';
import { createRoot } from 'react-dom/client';
import { pzCss } from './registry.js';
import { navGo } from '../../app/nav.jsx';
import { cmsShadow } from '../../app/cms78.jsx';

const PZ_LOAD = {
  sampcode: () => import('../sampcode/entry.jsx'),
  sampbidx: () => import('../sampbidx/entry.jsx'),
  samptrek: () => import('../samptrek/entry.jsx'),
  sampaudience: () => import('../sampaudience/entry.jsx'),
  sampforce: () => import('../sampforce/entry.jsx'),
  talk2tax: () => import('../talk2tax/entry.jsx'),
  sampcrew: () => import('../sampcrew/entry.jsx'),
};
/* page background while the product loads (each product's own page colour) */
const PZ_BG = { sampcode: '#04030b', sampbidx: '#0c0816', samptrek: '#07041a', sampaudience: '#04090F', sampforce: '#09070e', talk2tax: '#050816', sampcrew: '#07041a' };

/* space above each hero's first line on its own site (room for its own top bar), in px */
const PZ_TOP = { sampbidx: 65 };

/* fonts must be declared on the page (a shadow root ignores @font-face), once per product */
const pzDone = new Set();
function pzPageFonts(slug, css, url) {
  if (pzDone.has(slug)) return;
  pzDone.add(slug);
  const faces = (css.match(/@font-face\s*\{[^}]*\}|@property\s+[\w-]+\s*\{[^}]*\}/g) || []).join('\n');
  if (faces) {
    const st = document.createElement('style');
    st.setAttribute('data-pz-fonts', slug);
    st.textContent = faces;
    document.head.appendChild(st);
  }
  if (url) {
    const l = document.createElement('link');
    l.rel = 'stylesheet';
    l.href = url;
    l.setAttribute('data-pz-fonts', slug);
    document.head.appendChild(l);
  }
}
const pzHeaderH = () => {
  const h = document.querySelector('header');
  return h ? Math.min(140, h.getBoundingClientRect().height) : 76;
};

/* build 72: the product sites keep 140-200 loops running, half of them off screen, which made scrolling stutter.
   Each top-level block (section, hero, footer, ticker) pauses its loops (CSS and script animations) while it is more
   than 300px outside the screen, and plays them again as it comes back. */
function pzGovernor(root) {
  if (typeof IntersectionObserver === 'undefined') return () => {};
  const held = new WeakMap();
  const seen = new WeakSet();
  const io = new IntersectionObserver((list) => {
    for (const en of list) {
      const el = en.target;
      if (en.isIntersecting) {
        el.classList.remove('pz-off');
        const a = held.get(el);
        if (a) { held.delete(el); a.forEach((x) => { try { if (x.playState === 'paused') x.play(); } catch (e) {} }); }
      } else {
        el.classList.add('pz-off');
        try {
          const run = el.getAnimations({ subtree: true }).filter((x) => !x.animationName && x.playState === 'running' && x.effect && x.effect.getTiming().iterations === Infinity);
          if (run.length) { run.forEach((x) => x.pause()); held.set(el, run); }
        } catch (e) {}
      }
    }
  }, { rootMargin: '300px 0px' });
  const scan = () => {
    root.querySelectorAll('section, header, footer, [class*="ticker"], [class*="marquee"]').forEach((el) => {
      if (seen.has(el) || (el.parentElement && el.parentElement.closest('section, header, footer'))) return;
      seen.add(el);
      io.observe(el);
    });
  };
  /* big blurred glow shapes (blur 24px and more, no text inside) were re-blurred on every scrolled frame; the same soft
     glow is drawn once with a radial fade instead */
  const soften = () => {
    root.querySelectorAll('*').forEach((el) => {
      if (seen.has(el) || el.classList.contains('pz-soft')) return;
      const f = getComputedStyle(el).filter;
      const m = f && f.indexOf('blur(') >= 0 ? /blur\(([\d.]+)px\)/.exec(f) : null;
      if (!m || +m[1] < 24 || (el.textContent || '').trim()) return;
      try { if (el.getAnimations().some((a) => a.effect && a.effect.getKeyframes().some((k) => 'filter' in k))) return; } catch (e) {}
      el.style.setProperty('--pz-soft', Math.min(60, Math.round(+m[1] / 2)) + '%');
      el.classList.add('pz-soft');
    });
  };
  const ts = [300, 1500, 4000].map((t) => setTimeout(() => { scan(); soften(); }, t));
  return () => { ts.forEach(clearTimeout); io.disconnect(); };
}

function PZ_Site({ slug, children }) {
  const host = ee.useRef(null);
  ee.useEffect(() => {
    const h = host.current;
    if (!h || !PZ_LOAD[slug]) return undefined;
    const sr = h.shadowRoot || h.attachShadow({ mode: 'open' });
    sr.innerHTML = `<style>:host{display:block;min-height:100vh;background:${PZ_BG[slug] || '#070B1F'}}</style>`;
    let root = null;
    let dead = false;
    let vis = null;
    let gov = null;
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.composedPath().find((n) => n && n.tagName === 'A');
      if (!a) return;
      const href = a.getAttribute('href') || '';
      if (a.target === '_blank' || a.hasAttribute('download')) return;
      if (href.charAt(0) === '#') {
        e.preventDefault();
        const id = decodeURIComponent(href.slice(1));
        const t = id ? sr.getElementById(id) : null;
        const y = t ? t.getBoundingClientRect().top + window.scrollY - pzHeaderH() - 8 : 0;
        window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
        return;
      }
      if (href.charAt(0) === '/' && href.charAt(1) !== '/') {
        e.preventDefault();
        navGo(href);
        window.scrollTo(0, 0);
      }
    };
    sr.addEventListener('click', onClick);
    /* the product's hero already leaves room for a top bar: it starts under this site's header, as on its own site */
    const pull = () => {
      h.style.marginTop = -Math.round(Math.max(0, Math.min(pzHeaderH(), (PZ_TOP[slug] || 126) - 24))) + 'px';
    };
    pull();
    window.addEventListener('resize', pull);
    PZ_LOAD[slug]().then((m) => {
      if (dead) return;
      const css = pzCss(slug);
      pzPageFonts(slug, css, m.fonts);
      sr.innerHTML = '';
      const st = document.createElement('style');
      st.textContent =
        /* clip-path keeps the product's fixed layers (page glow, grain, cursor light) inside the product, so they never
           paint over the questions and links below it */
        ':host{all:initial;display:block;cursor:inherit;position:relative;z-index:0;clip-path:inset(0)}\n' +
        '.pz-root{display:block;position:relative;min-height:100vh;isolation:isolate}\n' +
        css.replace(/@font-face\s*\{[^}]*\}|@property\s+[\w-]+\s*\{[^}]*\}/g, '') +
        /* the product's html/body overflow rules land on .pz-root; a scroll box there would stop its sticky scenes */
        '\n.pz-root{overflow-x:clip!important;overflow-y:visible!important}' +
        /* the page's animation governor pauses loops that are off screen (and all of them in a hidden tab) by class */
        /* build 72: smoother scrolling. Dozens of will-change layers are let go (moving parts still get
           their own layer while they move), glass panels keep their tint without re-blurring what scrolls behind them on
           every frame, the full-screen grain overlay is dropped, and glow shapes are soft-edged once (pzGovernor). */
        '\n*,*::before,*::after{-webkit-backdrop-filter:none!important;backdrop-filter:none!important;will-change:auto!important}' +
        '\n.noise,.grain{display:none!important}' +
        '\n.pz-soft{filter:none!important;-webkit-mask-image:radial-gradient(closest-side,#000 var(--pz-soft,30%),transparent);mask-image:radial-gradient(closest-side,#000 var(--pz-soft,30%),transparent)}' +
        '\n.frp5-off,.frp5-off::before,.frp5-off::after,.pz-off,.pz-off *,.pz-off *::before,.pz-off *::after,.pz-hidden *,.pz-hidden *::before,.pz-hidden *::after{animation-play-state:paused!important}';
      sr.appendChild(st);
      const div = document.createElement('div');
      div.className = 'pz-root pz-' + slug;
      sr.appendChild(div);
      vis = () => div.classList.toggle('pz-hidden', document.hidden);
      document.addEventListener('visibilitychange', vis);
      root = createRoot(div);
      root.render(ee.createElement(m.default));
      gov = pzGovernor(div);
      /* build 78: the super admin's text, picture, link and logo changes reach the product site too */
      setTimeout(() => !dead && cmsShadow(sr), 300);
    });
    return () => {
      dead = true;
      sr.removeEventListener('click', onClick);
      window.removeEventListener('resize', pull);
      if (vis) document.removeEventListener('visibilitychange', vis);
      if (gov) gov();
      const r = root;
      root = null;
      if (r) setTimeout(() => r.unmount(), 0);
    };
  }, [slug]);
  return (
    <div ref={host} className="pz-host" data-product={slug}>
      {children}
    </div>
  );
}

export { PZ_Site };
