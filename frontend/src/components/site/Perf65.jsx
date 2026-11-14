/*
 * Animation governor — build 65 update 5. Prefix FRP5_ / frp5 (styles: perf.css, class .frp5-off).
 *
 * The section-level pause in FRP_usePerf (Floaters.jsx) only covers <section>, <footer>, .vt and .page-hero, so
 * looping animations inside headers, heroes and wrappers built as <div> kept running (and repainting) while far
 * off screen. This watches every infinite CSS animation on the page, element by element: when its element is out of
 * view, the element gets .frp5-off (animation-play-state: paused); when it comes back, the class is removed. CSS
 * keeps control of play state, so hover-pauses and reduced-motion rules still work. Also pauses everything while the
 * tab is hidden.
 */
function frp5Governor() {
  if (typeof window === "undefined" || typeof document === "undefined" || !document.getAnimations || typeof IntersectionObserver === "undefined") return;
  const seen = new WeakSet();
  /* update 17 (Kunal: "animations not working"): an animated element was observed directly, so one that moves or
     scales itself (a marquee track, a light sweeping across the header, a sparkle that grows from 0) could be paused
     at a moment it sat outside the viewport or had no size, and then never came back. Now the nearest still
     ancestor (one with no animation of its own) is observed, and the result applies to every loop inside it. */
  const groups = new WeakMap();
  const io = new IntersectionObserver(
    (es) => es.forEach((e) => (groups.get(e.target) || []).forEach((t) => t.classList.toggle("frp5-off", !e.isIntersecting))),
    { rootMargin: "120px 0px" }
  );
  /* build 72 (speed): el.getAnimations() looks through every animation on the page, so asking it for each ancestor of
     each loop took 1.6 s on the products page (1,100 animations). The animated elements are now collected once per
     scan from the one document.getAnimations() list. */
  let moving = new Set();
  const anchor = (t) => {
    let el = t;
    while (el.parentElement && el.parentElement !== document.body && moving.has(el)) el = el.parentElement;
    return el;
  };
  const watch = (t) => {
    const a = anchor(t);
    let g = groups.get(a);
    if (!g) groups.set(a, (g = new Set())), io.observe(a);
    else io.unobserve(a), io.observe(a);
    g.add(t);
  };
  const scan = () => {
    let list;
    try {
      list = document.getAnimations();
    } catch (e) {
      return;
    }
    moving = new Set();
    for (const a of list) if (a.effect && a.effect.target) moving.add(a.effect.target);
    for (const a of list) {
      const t = a.effect && a.effect.target;
      if (!t || seen.has(t) || !t.classList) continue;
      let inf = false;
      try {
        inf = a.effect.getTiming().iterations === Infinity;
      } catch (e) {}
      if (!inf || t === document.documentElement || t === document.body) continue;
      seen.add(t);
      watch(t);
    }
  };
  /* update 18 (speed): a scan asks the browser for every animation (which forces a style update), so it now runs at
     most once every 1.2 s after the page changes, and not on every scroll */
  let t = 0,
    last = 0;
  const later = () => {
    if (t) return;
    const wait = Math.max(400, 1200 - (Date.now() - last));
    t = setTimeout(() => {
      t = 0;
      last = Date.now();
      window.requestIdleCallback ? requestIdleCallback(scan, { timeout: 800 }) : scan();
    }, wait);
  };
  const start = () => {
    scan();
    new MutationObserver((ms) => {
      for (const m of ms) if (m.addedNodes.length && [...m.addedNodes].some((n) => n.nodeType === 1)) return later();
    }).observe(document.body, { childList: true, subtree: true });
  };
  /* build 69 (Kunal, 2026-11-06): the floating buttons no longer fade out while the page scrolls; they always stay
     fully visible (the fade read as a flicker/glitch) */
  document.addEventListener("visibilitychange", () => document.documentElement.classList.toggle("frp5-hidden", document.hidden));
  if (document.readyState === "complete") setTimeout(start, 600);
  else window.addEventListener("load", () => setTimeout(start, 600));
}
frp5Governor();
