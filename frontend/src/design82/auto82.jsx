/*
 * Build 82.3 (Kunal, 12 Nov): tab sets on the home page turn to the next item on their own ("Seven products",
 * "Join our research panels"). Pauses while the pointer is on the tab row or keyboard focus is on a tab, and for people who ask for
 * reduced motion; clicking a tab just restarts the countdown. The active tab shows a progress bar (.a82-bar).
 */
import * as ee from 'react';

const a82Reduce = () =>
  typeof window !== "undefined" && !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

function useAuto82(n, k, setK, on, ms = 6000) {
  const [hold, setHold] = ee.useState(false);
  const run = !!on && !hold && n > 1 && !a82Reduce();
  ee.useEffect(() => {
    if (!run) return;
    const t = setTimeout(() => setK((k + 1) % n), ms);
    return () => clearTimeout(t);
  }, [run, k, n, ms]);
  const bind = {
    onMouseEnter: () => setHold(true),
    onMouseLeave: () => setHold(false),
    onFocus: (e) => {
      if (e.target && e.target.matches && e.target.matches(":focus-visible")) setHold(true);
    },
    onBlur: () => setHold(false),
  };
  return { run, bind, ms };
}

/* the progress bar inside the active tab (restarts with the key) */
function A82Bar({ run, ms, k }) {
  return run ? <i className="a82-bar" key={"a82-" + k} style={{ "--ms": ms + "ms" }} aria-hidden="true" /> : null;
}

export { useAuto82, A82Bar };
