/*
 * Build 74: the rest of the site (full.jsx) as its own script file.
 *
 * Any page other than home: main.jsx waits for it before the first render, so those pages start exactly as before.
 * Home: it loads as soon as the visitor starts to use the page (a touch, a click, a key, the mouse wheel or the mouse moving towards a
 * link) or after the page has been idle for a while, so the first screen opens with far less script.
 * A link followed before it has arrived keeps the current page on screen (a thin bar runs along the top) until the
 * next page is ready.
 */
let P = null;
let M = null;
const fullNow = () => M;
function loadFull() {
  if (!P) {
    const d = typeof document !== 'undefined' ? document.documentElement : null;
    if (d) d.classList.add('fr-full-loading');
    P = import('../full.jsx').then(
      (m) => {
        M = m;
        if (d) d.classList.remove('fr-full-loading');
        return m;
      },
      (e) => {
        P = null;
        if (d) d.classList.remove('fr-full-loading');
        throw e;
      }
    );
  }
  return P;
}
/* home page: start on the first sign of use, or once the page has been idle a while */
function loadFullWhenUsed() {
  if (typeof window === 'undefined' || P) return;
  /* a scroll or focus the page makes itself (scroll to top, a focused button) does not count, only the visitor's own input */
  const evs = ['pointerdown', 'keydown', 'touchstart', 'wheel', 'mouseover'];
  let done = false;
  const go = (e) => {
    if (done) return;
    if (e && e.type === 'mouseover' && !(e.target.closest && e.target.closest('a[href]'))) return;
    done = true;
    evs.forEach((n) => window.removeEventListener(n, go, true));
    loadFull().catch(() => {});
  };
  evs.forEach((n) => window.addEventListener(n, go, { capture: true, passive: true }));
  const idle = () => (window.requestIdleCallback ? requestIdleCallback(() => go(), { timeout: 4000 }) : go());
  const later = () => setTimeout(idle, 8000);
  if (document.readyState === 'complete') later();
  else window.addEventListener('load', later, { once: true });
}
/* a page from full.jsx: shown at once when it has arrived, otherwise React waits for it (Suspense) */
function fullPage(name) {
  function FullPage(props) {
    const m = fullNow();
    if (m) return ee.createElement(m.FULL_PAGES[name], props);
    throw loadFull();
  }
  FullPage.displayName = 'Full(' + name + ')';
  return FullPage;
}
/* a part from full.jsx inside the site's frame (header, footer): null until the rest of the site has arrived; when
   want is true it is fetched now and the part appears when it is ready */
function useFullPart(name, want) {
  const [, tick] = ee.useState(0);
  const m = fullNow();
  ee.useEffect(() => {
    if (m || !want) return undefined;
    let live = true;
    loadFull().then(() => live && tick((x) => x + 1), () => {});
    return () => {
      live = false;
    };
  }, [m, want]);
  return m ? m[name] : null;
}
import * as ee from 'react';
export { fullNow, fullPage, loadFull, loadFullWhenUsed, useFullPart };
