/* build 74: the animated Sampledge product logo on its own (it was in pages/ProductsX65.jsx), so the header, the
   hero and the home page do not load the product pages */
import * as ee from 'react';
import { cmsLogo } from '../../app/cms78.jsx';
import { PR5_LOGOS } from '../../data/SampledgeLogos65.jsx';

const pr5Ratio = (svg) => {
  const m = /viewBox="([\d.\s-]+)"/.exec(svg || "");
  if (!m) return 3.4;
  const v = m[1].trim().split(/\s+/).map(Number);
  return v[2] / v[3] || 3.4;
};
/* current site theme, shared by every logo (one observer for the page) */
const PR5_TH = { t: null, subs: new Set(), mo: null };
function pr5UseDark() {
  const get = () => typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") === "dark";
  const [d, setD] = ee.useState(get);
  ee.useEffect(() => {
    PR5_TH.subs.add(setD);
    if (!PR5_TH.mo && typeof MutationObserver !== "undefined") {
      PR5_TH.mo = new MutationObserver(() => PR5_TH.subs.forEach((f) => f(get())));
      PR5_TH.mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    }
    setD(get());
    return () => PR5_TH.subs.delete(setD);
  }, []);
  return d;
}
function PR5_Logo({ p, v = "logo", still: _still, tone = "auto", h, className = "" }) {
  /* update 26 (Kunal): every Sampledge product logo animates wherever it appears; the old "still" copies now move too
     (they still pause off screen and in hidden tabs) */
  const still = false;
  const ref = ee.useRef(null);
  const dark = pr5UseDark();
  const L = PR5_LOGOS[p.id];
  ee.useEffect(() => {
    /* SMIL shimmer (animateTransform) is not covered by CSS or by the animation governor: always paused for the
       still version, and paused off screen for the animated one */
    const el = ref.current;
    if (!el) return undefined;
    const svgs = () => el.querySelectorAll("svg");
    const run = (on) =>
      svgs().forEach((s) => {
        try {
          on ? s.unpauseAnimations() : s.pauseAnimations();
        } catch (e) {}
      });
    if (still) {
      svgs().forEach((s) => {
        try {
          s.pauseAnimations();
          s.setCurrentTime(0);
        } catch (e) {}
      });
      return undefined;
    }
    if (typeof IntersectionObserver === "undefined") return undefined;
    run(false);
    let seen = false;
    const io = new IntersectionObserver((es) => ((seen = es[0].isIntersecting), run(seen)), { rootMargin: "100px 0px" });
    io.observe(el);
    const vis = () => run(!document.hidden && seen);
    document.addEventListener("visibilitychange", vis);
    return () => (io.disconnect(), document.removeEventListener("visibilitychange", vis));
  }, [still, p.id, dark]);
  /* build 78: an uploaded logo (Admin › Logos, or a new product's own logo) is shown instead */
  const up = cmsLogo("product:" + p.id) || (typeof p.logo === "string" && /^(https:\/\/|\/)/.test(p.logo) ? p.logo : "");
  if (up) return <span className={"pr5-lg pr5-lg--img pr5-lg--" + v + (className ? " " + className : "")} style={h ? { "--h": h + "px" } : undefined}><img className="cms-logo" src={up} alt={p.name} /></span>;
  if (!L) return <span className={"pr5-lgx " + className}>{p.short}</span>;
  const cls = "pr5-lg pr5-lg--" + v + (still ? " pr5-still" : "") + (v === "logo" ? " pr5-lg--" + tone : "") + (className ? " " + className : "");
  const st = h ? { "--h": h + "px" } : undefined;
  if (v === "mark") return <span ref={ref} className={cls} style={st} role="img" aria-label={p.name} dangerouslySetInnerHTML={{ __html: L.mark }} />;
  /* only the version for the current background is in the page (auto follows the site theme) */
  const useD = tone === "dark" || (tone === "auto" && dark);
  const svg = useD ? L.dark : L.logo;
  return (
    <span ref={ref} className={cls} style={{ ...(st || {}), "--r": pr5Ratio(svg) }} role="img" aria-label={p.name}>
      <span key={useD ? "d" : "l"} className={useD ? "pr5-lg__d" : "pr5-lg__l"} dangerouslySetInnerHTML={{ __html: svg }} />
    </span>
  );
}

/* floating objects around each product's screen: [text, x%, y%, kind] */
export { PR5_Logo, PR5_TH, pr5Ratio, pr5UseDark };
