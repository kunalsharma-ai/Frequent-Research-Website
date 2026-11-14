import * as ee from 'react';
import { INDUSTRIES } from '../data/industries.jsx';

const IN_GROUP = {
  resources: {
    c: "#0E9C88",
    lt: "#6EE0CE",
    ic: "Wheat",
  },
  industrial: {
    c: "#0B22A8",
    lt: "#7E9BFF",
    ic: "Factory",
  },
  energy: {
    c: "#C99A2E",
    lt: "#F0D98F",
    ic: "Zap",
  },
  public: {
    c: "#07104F",
    lt: "#A8B6FF",
    ic: "Landmark",
  },
  tech: {
    c: "#1E5BFF",
    lt: "#5B8CFF",
    ic: "Cpu",
  },
  consumer: {
    c: "#0A7A6A",
    lt: "#8FE6D5",
    ic: "ShoppingBag",
  },
  media: {
    c: "#5A3FE0",
    lt: "#B9A8FF",
    ic: "Clapperboard",
  },
  services: {
    c: "#9A6B12",
    lt: "#F5C977",
    ic: "Briefcase",
  },
};
const inG = (k) => IN_GROUP[k] || IN_GROUP.industrial;
const inReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
let IN_CACHE = null;
function inUseAllCases() {
  const [all, setAll] = ee.useState(IN_CACHE);
  ee.useEffect(() => {
    if (IN_CACHE) return;
    /* build 74: the case studies (half a megabyte) load on their own, so the home page does not wait for them */
    import('../pages/IndustriesPages.jsx')
      .then(({ hasCases, loadCases }) => Promise.all(
      INDUSTRIES.filter((r) => hasCases(r.slug)).map((r) =>
        loadCases(r.slug).then((cs) =>
          cs.map((c) => ({
            ...c,
            ind: r,
          })),
        ),
      ),
    ))
      .then((arr) => {
        IN_CACHE = arr.flat();
        setAll(IN_CACHE);
      })
      .catch(() => setAll([]));
  }, []);
  return all;
}
function IN_Count({ to, run, dur = 1200 }) {
  const [v, setV] = ee.useState(0);
  ee.useEffect(() => {
    if (!run || to == null) return;
    if (inReduce()) {
      setV(to);
      return;
    }
    let raf, t0;
    const f = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / dur);
      setV(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(f);
    };
    raf = requestAnimationFrame(f);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return <>{to == null ? "\u2014" : v}</>;
}

export { IN_Count, inG, inUseAllCases };
