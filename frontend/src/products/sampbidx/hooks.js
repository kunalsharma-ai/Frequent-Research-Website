import { useEffect, useRef, useState } from 'react';

export const reducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Adds `.in` to every `.rv` element when it scrolls into view, so its entrance animation plays.
 *  Elements are fully visible before that, so the page reads correctly without JavaScript. */
export function useReveal() {
  useEffect(() => {
    if (reducedMotion() || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    // Only animate things below the first screen; what is already on screen stays put.
    // build 68: on frequentresearch.com the page lives in a shadow root (src/products/_shell/ProductSite.jsx)
    const host = document.querySelector('.pz-host[data-product="sampbidx"]');
    ((host && host.shadowRoot) || document).querySelectorAll('.rv').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

/** true once the element has been on screen. */
export function useInView(options = { threshold: 0.3 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) { setSeen(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, options);
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

/** Counts from 0 to `to` once `start` is true. Shows the final number when motion is reduced. */
export function useCountUp(to, start, ms = 1600) {
  const [v, setV] = useState(to);
  useEffect(() => {
    if (!start || reducedMotion()) { setV(to); return; }
    let raf; const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / ms);
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    setV(0); raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, to]);
  return v;
}

/** Spotlight + gentle 3D tilt that follows the pointer over a card. */
export function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion() || window.matchMedia('(hover: none)').matches) return;
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', `${x * 100}%`);
      el.style.setProperty('--my', `${y * 100}%`);
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-4px)`;
    };
    const leave = () => { el.style.transform = ''; };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  }, []);
  return ref;
}
