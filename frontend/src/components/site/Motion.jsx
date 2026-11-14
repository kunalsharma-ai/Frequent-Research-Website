/*
 * Motion governor — build 58. Prefix FRM_. No styles.
 *
 * The site has hundreds of looping decorative animations. Measured on the home page (mobile size, build 57), the browser
 * spent ~60 % of every second re-styling and re-painting them even when nobody touched the page — on a mid-range phone
 * that is more than 100 % (the "lagging and hanging"). The governor keeps the motion while people are actually looking:
 *   - looping (infinite) animations run only while their section is on screen (sections scrolled away are paused —
 *     the .frp-off class from FRP_usePerf in Floaters.jsx marks them),
 *   - after 9 s without scrolling, touching, clicking or typing every loop pauses where it is ("still" mode) and resumes
 *     on the next interaction; the canvas globe loops also stop drawing (window.__frStill),
 *   - nothing runs while the tab is hidden.
 * One-off entrance animations and transitions are never touched. Implemented with the Web Animations API (pause/play),
 * which needs no style recalculation of the whole page, unlike toggling a class on <html>.
 */
const FRM = { still: false, last: 0, held: new Set() };
function frmLoops() {
  if (typeof document === "undefined" || !document.getAnimations) return [];
  return document.getAnimations().filter((a) => {
    try {
      return a.effect && a.effect.getTiming().iterations === Infinity;
    } catch (e) {
      return false;
    }
  });
}
function frmApply() {
  const hidden = document.hidden;
  for (const a of frmLoops()) {
    const t = a.effect.target;
    /* [data-frm-live]: the home hero's moving slides keep moving while visible (it pauses itself off screen) */
    const live = t && t.closest && t.closest("[data-frm-live]");
    const off = hidden || (FRM.still && !live) || !t || !t.isConnected || (t.closest && t.closest(".frp-off"));
    if (off) {
      if (a.playState === "running") {
        a.pause();
        FRM.held.add(a);
      }
    } else if (FRM.held.has(a) && a.playState === "paused") {
      a.play();
      FRM.held.delete(a);
    }
  }
  FRM.held.forEach((a) => (!a.effect || !a.effect.target || !a.effect.target.isConnected) && FRM.held.delete(a));
}
(function frmBoot() {
  if (typeof window === "undefined" || typeof document === "undefined" || !document.getAnimations) return;
  FRM.last = performance.now();
  let soon = 0;
  const later = (ms) => {
    clearTimeout(soon);
    soon = setTimeout(frmApply, ms);
  };
  const wake = () => {
    FRM.last = performance.now();
    if (FRM.still) {
      FRM.still = false;
      window.__frStill = false;
      frmApply();
    }
  };
  ["scroll", "wheel", "pointerdown", "pointermove", "keydown", "touchstart"].forEach((e) => window.addEventListener(e, wake, { passive: true, capture: true }));

  document.addEventListener("visibilitychange", () => frmApply());
  /* update 17: no idle freeze. update 18 (speed): no 1.5 s polling either — off-screen sections are paused by CSS
     (.frp-off / .frp5-off) and a hidden tab by html.frp5-hidden, so the governor only reacts to tab visibility. */
})();
