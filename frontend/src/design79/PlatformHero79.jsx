/*
 * Build 79 (Kunal, 9 Nov): the new hero of the four platform pages (/services/<platform>), and only the hero; the rest
 * of each page is unchanged (app/pages/VerticalPage.jsx, its old hero is hidden by h79-swap, styles/h79.css).
 *   market-research   "Aurora"          teal and cyan, Instrument Serif, a live poll
 *   digital-marketing "Neon Pop"        magenta, tangerine and sun yellow, heavy Unbounded, result pop-ups
 *   it-development    "Terminal"        graphite and acid lime with violet, JetBrains Mono, a typing terminal
 *   accounts-finance  "Gilded Ledger"   ivory or navy with gold, Fraunces italic, a ledger that balances
 * Build 79.2: Digital Marketing, IT & Development and Accounts & Finance show the full moving pictures of plat79.jsx.
 * Market Research keeps its own 3D scene on desktops (a still picture first, Scene3D.js later). Texts: content.js (D79.platforms).
 * Styles: ph79.css.
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { D79 } from './content.js';
import { Count, Magnet, Marquee, Stage, d79Calm, useSpot } from './fx.jsx';
import { D79Icon, D79_WORLDS } from './HomeHero79.jsx';
import { Ledger, Poll, Pops, Terminal } from './orn79.jsx';
import { Plat80, HAS_PLAT80 } from '../design80/plat80.jsx';

const ORN = { mr: Poll, dm: Pops, it: Terminal, af: Ledger };

function PlatformHero79({ v }) {
  const w = D79_WORLDS.find((x) => x.slug === v.slug);
  const p = (D79.platforms || {})[v.slug] || {};
  const ref = ee.useRef(null);
  useSpot(ref);
  const Orn = ORN[w.k];
  // phones and "reduce motion": entrances once, nothing loops
  ee.useEffect(() => {
    if (!d79Calm()) return undefined;
    document.documentElement.classList.add("d79-calm");
    return () => document.documentElement.classList.remove("d79-calm");
  }, []);
  // "see every channel / our stack": the services further down the page
  const down = (e) => {
    const t = document.getElementById("services");
    const n = t || (ref.current && ref.current.closest(".p79").nextElementSibling);
    if (!n) return;
    e.preventDefault();
    n.scrollIntoView({ behavior: d79Calm() ? "auto" : "smooth" });
  };
  return (
    <div className={"p79 p79--" + w.k + " h79-swap"}>
    <section ref={ref} className="p79-hero" aria-labelledby="p79-hero-t">
      <div className="p79-hero__bg" aria-hidden="true"><i /><i /><i /><span className="d79-grain" /></div>
      <div className="d79-wrap p79-hero__in">
        <div className="p79-hero__copy">
          <nav className="p79-crumb d79-in" aria-label="Breadcrumb" style={{ "--d": "60ms" }}>
            <Link to="/">Home</Link><span aria-hidden="true">/</span><Link to="/services">Services</Link><span aria-hidden="true">/</span><span aria-current="page">{v.name}</span>
          </nav>
          <p className="p79-kicker d79-in" style={{ "--d": "120ms" }}><span>{w.n}</span>{p.kicker || v.name}</p>
          <h1 id="p79-hero-t" className="p79-hero__t">
            <span className="d79-line d79-in" style={{ "--d": "200ms" }}>{p.title1}</span>{" "}
            <span className="d79-line d79-in" style={{ "--d": "330ms" }}>{p.title2}</span>{" "}
            <span className="d79-line p79-hero__em d79-in" style={{ "--d": "460ms" }}>{p.title3}</span>
          </h1>
          <p className="p79-hero__intro d79-in" style={{ "--d": "600ms" }}>{p.intro || v.intro}</p>
          <div className="p79-hero__cta d79-in" style={{ "--d": "720ms" }}>
            <Magnet as={Link} to={`/lets-talk?type=quote&service=${v.slug}`} className="d79-btn p79-btn" sfx={w.sfx}>{p.cta} <D79Icon k="arrow" size={18} /></Magnet>
            {p.cta2To && p.cta2To.startsWith("/") ? <Magnet as={Link} to={p.cta2To} className="d79-btn p79-btn--line" sfx="tick">{p.cta2}</Magnet> : <Magnet as="a" href={p.cta2To || "#services"} onClick={p.cta2To ? undefined : down} className="d79-btn p79-btn--line" sfx="tick">{p.cta2}</Magnet>}
          </div>
          <ul className="p79-hero__facts d79-in" style={{ "--d": "820ms" }}>
            <li><strong><Count value={v.services.length} /></strong> services</li>
            <li><strong><Count value={(v.process || []).length} /></strong> step process</li>
            <li><strong>1</strong> point of contact</li>
          </ul>
        </div>
        <div className="p79-hero__art">
          {HAS_PLAT80(w.k) ? <Plat80 k={w.k} /> : <><Stage kind={w.k} eager={false} idle={2500} />{Orn ? <Orn /> : null}</>}
        </div>
      </div>
      <div className="p79-ticker">
        <Marquee speed={32}>
          {(p.ticker || []).map((t) => <span key={t} className="p79-tick">{t}<i aria-hidden="true">{w.k === "it" ? "//" : w.k === "af" ? "§" : w.k === "dm" ? "★" : "◉"}</i></span>)}
        </Marquee>
      </div>
    </section>
    </div>
  );
}


export { PlatformHero79 };
