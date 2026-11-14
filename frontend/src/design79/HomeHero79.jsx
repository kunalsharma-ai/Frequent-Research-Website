/*
 * Build 79 (Kunal, 9 Nov): the new animated hero of the home page, and only the hero; the rest of the home page is
 * unchanged (app/home/HomePage.jsx). Six moving slides (Kunal, 18:16): All services (live 3D globe on desktops, a still
 * picture first, the four platforms orbiting it), Market Research, Digital Marketing, IT & Development, Accounts &
 * Finance (each its own colours, picture and live card) and the Sampledge products (their marks orbiting). Each slide
 * builds its headline line by line; tabs underneath with a running bar; the slides pause while pointed at or focused.
 * The festival banner (Celebrate22, 10 seconds) sits on top; the room it needs closes once it has gone.
 * Phones and "reduce motion" get the calm version. Texts: content.js (D79.home, D79.platforms). Styles: h79.css.
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { D79 } from './content.js';
import { Count, Magnet, Rotator, d79Calm } from './fx.jsx';
import { Scene81 } from '../design81/hx81.jsx';
import { Planet81 } from '../design81/planet81.jsx';
import { VERTICALS } from '../app/data/site.jsx';
import { RG_TOTAL } from '../app/shared/Regions.jsx';
import { SERVICE_COUNT } from '../app/data/serviceBits.jsx';
import { FRL_FR } from '../components/site/Logos13.jsx';
import { CB22_Banner } from '../components/site/Celebrate22.jsx';
import { PR5_LIST } from '../data/Sampledge65.jsx';

export const D79_WORLDS = [
  { slug: "market-research", k: "mr", sfx: "mr", n: "01", icon: "lens" },
  { slug: "digital-marketing", k: "dm", sfx: "dm", n: "02", icon: "spark" },
  { slug: "it-development", k: "it", sfx: "it", n: "03", icon: "code" },
  { slug: "accounts-finance", k: "af", sfx: "af", n: "04", icon: "coin" },
];
const vBy = (slug) => VERTICALS.find((v) => v.slug === slug) || { name: slug, services: [], card: "" };

export function D79Icon({ k, size = 22 }) {
  const s = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true, focusable: "false" };
  switch (k) {
    case "lens": return <svg {...s}><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8M8 10.5h5M10.5 8v5" /></svg>;
    case "spark": return <svg {...s}><path d="M3 11.5 18 5l-3 14-4.5-5L3 11.5Z" /><path d="m10.5 14 3-3" /></svg>;
    case "code": return <svg {...s}><path d="m8 7-5 5 5 5M16 7l5 5-5 5M13.5 4l-3 16" /></svg>;
    case "coin": return <svg {...s}><ellipse cx="12" cy="6.5" rx="7" ry="3" /><path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" /></svg>;
    case "arrow": return <svg {...s}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "star": return <svg {...s} fill="currentColor" stroke="none"><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" /></svg>;
    case "quote": return <svg {...s} fill="currentColor" stroke="none"><path d="M9.5 6C6.4 7.2 4.5 9.8 4.5 13.4V18h5.6v-5.4H7.4c.1-2 1.2-3.5 3-4.4zm9 0c-3.1 1.2-5 3.8-5 7.4V18h5.6v-5.4h-2.7c.1-2 1.2-3.5 3-4.4z" /></svg>;
    case "play": return <svg {...s} fill="currentColor" stroke="none"><path d="M8 5.5v13l10.5-6.5z" /></svg>;
    default: return <svg {...s}><circle cx="12" cy="12" r="8" /></svg>;
  }
}

/* ------------------------------------------------------------------ hero */
// build 81: the slides move on fast (Kunal, 12 Nov)
const HX_MS = 4500;
const HX = [{ k: "all", icon: "spark", label: "All services" }, ...D79_WORLDS.map((w) => ({ k: w.k, w, icon: w.icon })), { k: "sx", icon: "star", label: "Sampledge products" }];

function Lines({ as: As, id, l1, l2, l3 }) {
  return (
    <As id={id} className="d79-hero__t">
      <span className="d79-line d79-in" style={{ "--d": "120ms" }}>{l1}</span>{" "}
      <span className="d79-line d79-line--serif d79-in" style={{ "--d": "260ms" }}>{l2}</span>{" "}
      <span className="d79-line d79-line--grad d79-in" style={{ "--d": "400ms" }}>{l3}</span>
    </As>
  );
}

/* the words on each slide */
function Copy({ s, first }) {
  const H = D79.home;
  if (s.k === "all")
    return (
      <>
        <p className="d79-pill d79-in" style={{ "--d": "60ms" }}><span className="d79-pill__dot" aria-hidden="true" />{H.eyebrow}</p>
        <Lines as={first ? "h1" : "h2"} id={first ? "d79-hero-t" : undefined} l1={H.line1} l2={H.line2} l3={H.line3} />
        <p className="d79-hero__rot d79-in" style={{ "--d": "520ms" }}>
          <span>{H.verbLead}</span> <Rotator words={H.verbs} className="d79-rot--hero" /> <span>{H.verbTail}</span>
        </p>
        <p className="d79-hero__intro d79-in" style={{ "--d": "620ms" }}>{H.intro}</p>
        <div className="d79-hero__cta d79-in" style={{ "--d": "720ms" }}>
          <Magnet as={Link} to="/lets-talk" className="d79-btn d79-btn--glow" sfx="go">{H.ctaMain} <D79Icon k="arrow" size={18} /></Magnet>
          <Magnet as={Link} to="/services" className="d79-btn d79-btn--line" sfx="tick">Explore our services</Magnet>
        </div>
        <ul className="d79-hero__stats d79-in" style={{ "--d": "820ms" }}>
          <li><strong><Count value={RG_TOTAL || 55} suffix="+" /></strong><span>markets</span></li>
          <li><strong><Count value={SERVICE_COUNT} /></strong><span>services</span></li>
          <li><strong><Count value={4} /></strong><span>expert teams</span></li>
          <li><strong><Count value={2015} dur={1400} /></strong><span>since</span></li>
        </ul>
      </>
    );
  if (s.k === "sx") {
    const n = PR5_LIST.length;
    return (
      <>
        <p className="d79-pill d79-in" style={{ "--d": "60ms" }}><span className="d79-pill__dot" aria-hidden="true" />Sampledge · {n} products</p>
        <Lines as="h2" l1={`${n} products.`} l2="One connected" l3="ecosystem." />
        <p className="d79-hero__rot d79-in" style={{ "--d": "520ms" }}>
          <span>Meet</span> <Rotator words={PR5_LIST.map((p) => p.short || p.name)} className="d79-rot--hero" />
        </p>
        <p className="d79-hero__intro d79-in" style={{ "--d": "620ms" }}>Software for research operations and for running a business: survey programming, research bidding, projects and fieldwork, research audiences, revenue, accounting and tax, and HR. Built by people who run real studies.</p>
        <div className="d79-hero__cta d79-in" style={{ "--d": "720ms" }}>
          <Magnet as={Link} to="/products" className="d79-btn d79-btn--glow" sfx="go">Explore the products <D79Icon k="arrow" size={18} /></Magnet>
          <Magnet as={Link} to="/lets-talk?type=demo" className="d79-btn d79-btn--line" sfx="tick">Book a demo</Magnet>
        </div>
        <ul className="d79-hx__chips d79-in" style={{ "--d": "820ms" }}>
          {PR5_LIST.map((p) => <li key={p.id}><Link to={"/products/" + p.id} style={{ "--pc": p.c1 }}>{p.short || p.name}</Link></li>)}
        </ul>
      </>
    );
  }
  const v = vBy(s.w.slug), p = (D79.platforms || {})[s.w.slug] || {};
  return (
    <>
      <p className="d79-pill d79-in" style={{ "--d": "60ms" }}><span className="d79-pill__dot" aria-hidden="true" />{s.w.n} · {v.name}</p>
      <Lines as="h2" l1={p.title1} l2={p.title2} l3={p.title3} />
      <p className="d79-hero__intro d79-in" style={{ "--d": "560ms" }}>{p.intro || v.intro}</p>
      <div className="d79-hero__cta d79-in" style={{ "--d": "680ms" }}>
        <Magnet as={Link} to={"/services/" + v.slug} className="d79-btn d79-btn--glow" sfx="go">Explore {v.name} <D79Icon k="arrow" size={18} /></Magnet>
        <Magnet as={Link} to={`/lets-talk?type=quote&service=${v.slug}`} className="d79-btn d79-btn--line" sfx="tick">{p.cta || "Get a free quote"}</Magnet>
      </div>
      <ul className="d79-hx__chips d79-in" style={{ "--d": "800ms" }}>
        {v.services.slice(0, 5).map((x) => <li key={x.slug}><Link to={`/services/${v.slug}/${x.slug}`}>{x.name}</Link></li>)}
        <li><Link to={"/services/" + v.slug} className="is-more">+{Math.max(0, v.services.length - 5)} more</Link></li>
      </ul>
    </>
  );
}

/* the pictures on each slide */
function AllArt({ H }) {
  return (
    <>
      <Planet81 />
      <div className="d79-medal" aria-hidden="true">
        <svg className="d79-medal__ring" viewBox="0 0 200 200">
          <defs><path id="d79-medal-p" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" /></defs>
          <text><textPath href="#d79-medal-p">FREQUENT RESEARCH ✦ WE SERVE THE QUALITY YOU EXPECT ✦ SINCE 2015 ✦</textPath></text>
        </svg>
        <span className="d79-medal__logo"><FRL_FR kind="icon" tilt={14} /></span>
      </div>
      {D79_WORLDS.map((w, i) => (
        <Link key={w.slug} to={`/services/${w.slug}`} className={`d79-sat d79-sat--${w.k} d79-sat--${i}`} data-sfx={"d79-" + w.sfx}>
          <span className="d79-sat__ic"><D79Icon k={w.icon} size={18} /></span>
          <span className="d79-sat__t">{vBy(w.slug).name}</span>
          <small>{vBy(w.slug).services.length} services</small>
        </Link>
      ))}
      <p className="d79-hero__note"><span className="d79-live" aria-hidden="true" />{H.orbitNote}</p>
    </>
  );
}
export function HomeHero79() {
  const H = D79.home;
  const ref = ee.useRef(null);
  const [cur, setCur] = ee.useState(0);
  const [seen, setSeen] = ee.useState(() => new Set([0]));
  const [hold, setHold] = ee.useState(false);
  const go = ee.useCallback((i) => {
    setCur(i);
    setSeen((s) => (s.has(i) ? s : new Set(s).add(i)));
  }, []);
  // today's festival banner (Celebrate22, 10 seconds) sits at the top of the hero; h79.css keeps room for it only while
  // it is there (.d79-hero:has(> .cb22-wrap)), so no empty space is left once it has gone. The slides start moving
  // once it has gone (the first slide then gets its full time).
  const [banner, setBanner] = ee.useState(true);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const chk = () => setBanner(!!el.querySelector(".cb22-wrap"));
    chk();
    const mo = new MutationObserver(chk);
    mo.observe(el, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);
  // phones and "reduce motion": entrances play once, nothing loops (h79.css, html.d79-calm)
  ee.useEffect(() => {
    if (!d79Calm()) return undefined;
    document.documentElement.classList.add("d79-calm");
    return () => document.documentElement.classList.remove("d79-calm");
  }, []);
  // the slides move on by themselves once the festival banner has gone, and wait while the visitor points at them,
  // uses them or looks at another tab
  const [tick, setTick] = ee.useState(0);
  ee.useEffect(() => {
    if (hold || banner || window.__FR_SHELL_SNAP) return undefined;
    const nx = (cur + 1) % HX.length;
    const t = setTimeout(() => (document.hidden ? setTick((n) => n + 1) : go(nx)), HX_MS);
    const pre = setTimeout(() => setSeen((s) => (s.has(nx) ? s : new Set(s).add(nx))), HX_MS - 2500);
    return () => (clearTimeout(t), clearTimeout(pre));
  }, [cur, hold, banner, go, tick]);
  const key = (e) => {
    if (e.key === "ArrowRight") go((cur + 1) % HX.length);
    else if (e.key === "ArrowLeft") go((cur + HX.length - 1) % HX.length);
  };
  const sw = ee.useRef(null);
  return (
    <section
      ref={ref}
      className={"d79-hero d79-hx d79-hx--" + HX[cur].k + (hold ? " is-held" : "") + (seen.size > 1 ? " is-moved" : "")}
      aria-labelledby="d79-hero-t"
      aria-roledescription="carousel"
      style={{ "--hx-ms": HX_MS + "ms" }}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={(e) => e.target.matches && e.target.matches(":focus-visible") && setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
      onPointerDown={(e) => (sw.current = e.pointerType === "touch" ? e.clientX : null)}
      onPointerUp={(e) => {
        if (sw.current == null) return;
        const dx = e.clientX - sw.current;
        sw.current = null;
        if (Math.abs(dx) > 50) go((cur + (dx < 0 ? 1 : HX.length - 1)) % HX.length);
      }}
    >
      <div className="d79-hero__bg" aria-hidden="true">
      </div>
      <CB22_Banner />
      <div className="d79-wrap d79-hero__in">
        <div className="d79-hx__slides">
          {HX.map((s, i) => (
            <div
              key={s.k}
              id={"d79-hx-" + s.k}
              className={"d79-hero__copy d79-hx__slide" + (i === cur ? " is-on" : "")}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${HX.length}`}
              aria-hidden={i === cur ? undefined : "true"}
              {...(i === cur ? {} : { inert: "" })}
            >
              <Copy s={s} first={i === 0} />
            </div>
          ))}
        </div>
        <div className="d79-hero__art d79-hx__art">
          {cur === 0 ? <div className="d79-hx__pane d79-hx__pane--all is-on"><AllArt H={H} /></div> : null}
          {cur > 0 ? <div key={HX[cur].k} className={"d79-hx__pane x81-pane is-on"}><Scene81 k={HX[cur].k} list={PR5_LIST} /></div> : null}
        </div>
      </div>
      <div className="d79-wrap d79-hx__tabs" role="tablist" aria-label="Hero slides" onKeyDown={key}>
        {HX.map((s, i) => (
          <button
            key={s.k}
            type="button"
            role="tab"
            aria-selected={i === cur}
            aria-controls={"d79-hx-" + s.k}
            tabIndex={i === cur ? 0 : -1}
            className={"d79-hx__tab d79-hx__tab--" + s.k + (i === cur ? " is-on" : "")}
            onClick={() => go(i)}
          >
            <span className="d79-hx__tab-ic"><D79Icon k={s.icon} size={15} /></span>
            <span>{s.label || vBy(s.w.slug).name}</span>
            <i className="d79-hx__bar" key={i === cur ? `on${cur}-${tick}-${hold || banner ? 1 : 0}` : "off"} />
          </button>
        ))}
      </div>
    </section>
  );
}
