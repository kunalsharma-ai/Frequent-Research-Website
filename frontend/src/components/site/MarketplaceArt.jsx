/*
 * Panel Audience Marketplace — brand mark and 3D art (build 51). Prefix MKA_. Styles: src/styles/marketplace-art.css.
 *  MKA_Mark  small animated mark (sphere + three audience orbits: consumer, B2B, healthcare). Header menu, footer.
 *  MKA_Logo  mark + two-line wordmark. Home product tile heading.
 *  MKA_Art   a rotating 3D "audience globe": ~90 respondent dots on a sphere, coloured by audience type, with a
 *            targeting lens that sweeps across and lights up the dots it matches ("find the right audience").
 *            Canvas-free SVG, rAF only while visible, static for prefers-reduced-motion.
 * Decorative only: no numbers or claims are shown.
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { MK_FLOW, MK_MARKETS, MkLink, mkFlag } from '../../app/data/mkBits.jsx';
import { frkReduce } from './FrKit.jsx';
import { FRX_Lockup } from './Products.jsx';

const MKA_SEG = [
  ["Consumer", "#22D3EE"],
  ["B2B", "#A98BFF"],
  ["Healthcare", "#2EE6A6"],
];
/* build 55: the marketplace is presented as "Sampledge — DIY Marketplace", so its logo is the Sampledge lockup
   (same icon as the project management tool) with a "DIY Marketplace" sub-title. MKA_Mark is kept for the 3D art. */
function MKA_Logo({ h = 34, className = "", tone = "light" }) {
  return (
    <span className={"mka-logo mka-logo--sam " + className}>
      <FRX_Lockup slug="panel-audience-marketplace" h={h} tone={tone} />
    </span>
  );
}
/* fibonacci sphere, fixed per load */
const MKA_PTS = (() => {
  const n = 90,
    out = [];
  const g = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2,
      r = Math.sqrt(1 - y * y),
      t = g * i;
    out.push([Math.cos(t) * r, y, Math.sin(t) * r, i % 3]);
  }
  return out;
})();
function MKA_Art({ small = false, className = "" }) {
  const ref = ee.useRef(null);
  const dots = ee.useRef([]);
  const lens = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let a = 0.6,
      raf = 0,
      vis = true,
      last = 0;
    const R = 92,
      cx = 150,
      cy = 120,
      tilt = -0.38;
    const st = Math.sin(tilt),
      ct = Math.cos(tilt);
    const draw = (t) => {
      const lx = cx + Math.sin(t / 2600) * 58,
        ly = cy + Math.cos(t / 3400) * 30;
      if (lens.current) lens.current.setAttribute("transform", `translate(${lx.toFixed(1)} ${ly.toFixed(1)})`);
      const ca = Math.cos(a),
        sa = Math.sin(a);
      MKA_PTS.forEach(([x, y, z], i) => {
        const x1 = x * ca + z * sa,
          z1 = -x * sa + z * ca;
        const y2 = y * ct - z1 * st,
          z2 = y * st + z1 * ct;
        const px = cx + x1 * R,
          py = cy + y2 * R;
        const d = dots.current[i];
        if (!d) return;
        const front = z2 > -0.1;
        const hit = front && Math.hypot(px - lx, py - ly) < 34;
        d.setAttribute("cx", px.toFixed(1));
        d.setAttribute("cy", py.toFixed(1));
        d.setAttribute("r", ((hit ? 4.6 : 2.4) + (z2 + 1) * 1.1).toFixed(2));
        d.setAttribute("opacity", (front ? 0.55 + z2 * 0.45 : 0.16).toFixed(2));
        d.classList.toggle("is-hit", hit);
      });
    };
    /* ~24 fps is plenty for a slow globe and halves the per-frame SVG work */
    const loop = (t) => {
      if (!last) last = t;
      if (t - last >= 40) {
        a += Math.min(80, t - last) * 0.00035;
        last = t;
        draw(t);
      }
      if (vis && !document.hidden) raf = requestAnimationFrame(loop);
      else if (vis) setTimeout(() => (raf = requestAnimationFrame(loop)), 500);
    };
    if (frkReduce()) {
      draw(0);
      return undefined;
    }
    const io2 =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver((es) => {
            vis = es[0].isIntersecting;
            cancelAnimationFrame(raf);
            last = 0;
            if (vis) raf = requestAnimationFrame(loop);
          })
        : null;
    if (io2) io2.observe(el);
    else raf = requestAnimationFrame(loop);
    draw(0);
    return () => {
      vis = false;
      cancelAnimationFrame(raf);
      if (io2) io2.disconnect();
    };
  }, []);
  return (
    <div ref={ref} className={"mka" + (small ? " mka--sm" : "") + " " + className} aria-hidden="true">
      <svg viewBox="0 0 300 240" className="mka__svg">
        <defs>
          <radialGradient id="mka-core" cx=".38" cy=".32" r=".7">
            <stop offset="0" stopColor="#3D6BFF" stopOpacity=".55" />
            <stop offset=".7" stopColor="#14248F" stopOpacity=".25" />
            <stop offset="1" stopColor="#0A1260" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="150" cy="226" rx="96" ry="10" fill="#000" opacity=".25" className="mka__shadow" />
        <circle cx="150" cy="120" r="100" fill="url(#mka-core)" />
        <ellipse cx="150" cy="120" rx="118" ry="34" fill="none" stroke="#22D3EE" strokeOpacity=".35" strokeDasharray="3 7" className="mka__ring" transform="rotate(-14 150 120)" />
        <ellipse cx="150" cy="120" rx="128" ry="44" fill="none" stroke="#A98BFF" strokeOpacity=".3" strokeDasharray="2 9" className="mka__ring mka__ring--2" transform="rotate(18 150 120)" />
        <g>
          {MKA_PTS.map(([, , , seg], i) => (
            <circle key={i} ref={(n) => { dots.current[i] = n; }} cx="150" cy="120" r="2" fill={MKA_SEG[seg][1]} className="mka__dot" />
          ))}
        </g>
        <g ref={lens} transform="translate(150 120)" className="mka__lens">
          <circle r="34" fill="rgba(255,255,255,.06)" stroke="#fff" strokeOpacity=".85" strokeWidth="2" />
          <circle r="40" fill="none" stroke="#FFD166" strokeWidth="2" strokeDasharray="6 8" className="mka__lens-spin" />
          <path d="M-46 0h-10M46 0h10M0 -46v-10M0 46v10" stroke="#FFD166" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </svg>
      {!small && (
        <div className="mka__chips">
          {MKA_SEG.map(([t, c], i) => (
            <span key={t} style={{ "--c": c, "--i": i }}>
              <i />
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── build 52: Sample Marketplace hero (replaces base MK_Hero; same H1, links #builder / #audiences) ─────────────── */
const MKX_WHO = [
  ["IT decision-makers", "#A98BFF"],
  ["physicians & specialists", "#2EE6A6"],
  ["Gen-Z shoppers", "#FF9F43"],
  ["CFOs & finance heads", "#F4C152"],
  ["caregivers", "#FF6B8B"],
  ["SME owners", "#22D3EE"],
];
function MKX_Rotator() {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    if (frkReduce()) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % MKX_WHO.length), 2200);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="mkx-rot" aria-hidden="true">
      <span className="mkx-rot__l">Reach</span>
      <span className="mkx-rot__w">
        {MKX_WHO.map(([w, c], k) => (
          <b key={w} className={k === i ? "is-on" : k === (i + MKX_WHO.length - 1) % MKX_WHO.length ? "is-out" : ""} style={{ "--c": c }}>
            {w}
          </b>
        ))}
      </span>
    </span>
  );
}
function MKX_Hero() {
  const [s, setS] = ee.useState(0);
  ee.useEffect(() => {
    if (frkReduce()) {
      setS(6);
      return undefined;
    }
    const t = setInterval(() => setS((x) => (x + 1) % 8), 1300);
    return () => clearInterval(t);
  }, []);
  const flow = MK_FLOW;
  const mk = MK_MARKETS;
  const flag = (c) => mkFlag(c);
  const L = MkLink;
  return (
    <section className="page-hero mkx">
      <div className="ph__bg" aria-hidden="true">
        <i />
        <i />
        <span className="ph__noise" />
      </div>
      <div className="container mkx__in">
        <div className="mkx__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <L to="/">Home</L>
            <span>
              <L to="/products">Products</L>
            </span>
            <span>
              <span aria-current="page">Sample Marketplace</span>
            </span>
          </nav>
          <span className="ph__kick">
            <i aria-hidden="true" />
            Frequent Research Sample Marketplace
          </span>
          <HeroH1 className="mkx__h1">
            Buy Research Sample. <span>On Your Terms.</span>
          </HeroH1>
          <MKX_Rotator />
          <p className="page-hero__intro mkx__intro">Build your audience, select your markets, configure quotas and purchase research-ready sample directly through Frequent Research.</p>
          <ol className="mkx-flow" aria-label="How it works">
            {flow.map(([t], k) => (
              <li key={t} className={k <= s ? "is-on" : ""} style={{ "--k": k }}>
                <span>{k < s ? "✓" : k + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <div className="page-hero__ctas">
            <a href="#builder" className="btn btn--light btn--lg">
              Build Your Sample
            </a>
            <a href="#audiences" className="btn btn--outline-light btn--lg">
              Explore Audiences
            </a>
          </div>
        </div>
        <div className="mkx-stage" aria-hidden="true">
          <div className="mkx-stage__globe">
            <MKA_Art />
          </div>
          <div className="mkx-order">
            <div className="mkx-order__top">
              <b>New sample order</b>
              <span className={s >= 5 ? "is-ok" : ""}>{s >= 5 ? "Ready to launch" : "Configuring…"}</span>
            </div>
            {[
              ["Audience", "B2B · IT decision-makers"],
              ["Markets", null],
              ["Quotas", "50 / 50 split"],
              ["Feasibility", "Checked"],
            ].map(([k, val], i) => (
              <div key={k} className={"mkx-order__row" + (s > i ? " is-on" : "")}>
                <span>{k}</span>
                {val ? (
                  <b>{val}</b>
                ) : (
                  <b className="mkx-order__flags">
                    {["in", "ae", "gb", "us"].map((c) => (flag(c) ? <img key={c} src={flag(c)} alt="" width="22" height="16" /> : null))}
                  </b>
                )}
              </div>
            ))}
            <span className="mkx-order__bar">
              <i style={{ width: Math.min(100, s * 17) + "%" }} />
            </span>
          </div>
        </div>
      </div>
      {mk.length > 0 && (
        <div className="mkx-markets" aria-hidden="true">
          <div className="mkx-markets__track">
            {[0, 1].map((d) =>
              mk.map(([c, n]) => (
                <span key={c + d}>
                  {flag(c) && <img src={flag(c)} alt="" width="22" height="16" />}
                  {n}
                </span>
              ))
            )}
          </div>
        </div>
      )}
    </section>
  );
}

export { MKA_Art, MKA_Logo, MKX_Hero };
