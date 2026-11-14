/*
 * Build 79 (Kunal, 9 Nov): the new animated hero of every service page (/services/<platform>/<service>) and of All
 * services (/services). Only the hero is new: the rest of each page is unchanged and its old hero is hidden
 * (class h79-swap, styles in s79.css; the prerender leaves the old hero out, so each page keeps one H1).
 * Each service gets its own look (Kunal, 9 Nov 18:26: no two alike): its own colours, grading, background, headline style
 * and layout (heroes79.js lookOf), plus its own animated picture (SCENE, 30 kinds) and flags where countries matter.
 * Pure CSS and SVG (no 3D library), so the page stays as fast as before. Phones and "reduce motion": calm (no loops).
 */
import * as ee from 'react';
import { Link } from 'react-router-dom';
import { Magnet, d79Calm, useSpot, useTilt } from './fx.jsx';
import { D79Icon } from './HomeHero79.jsx';
import { CTA, FACTS, FLAGS_MR, FLAG_IN, SCENE, SCENE_DEFAULT, TAG, lookOf } from './heroes79.js';
import { CINE } from '../design80/cine80.jsx';
import { AllSvc80 } from '../design80/plat80.jsx';
import FLAGS from '../assets/images/flags/flags-sprite.json';
import { VERTICALS, whatsappUrl } from '../app/data/site.jsx';

const ICON = { "market-research": "lens", "digital-marketing": "spark", "it-development": "code", "accounts-finance": "coin" };
const POSTER = { "market-research": "mr", "digital-marketing": "dm", "it-development": "it", "accounts-finance": "af" };
/* platform icons that float round each picture */
const FLOATS = {
  "market-research": ["lens", "spark", "star"],
  "digital-marketing": ["spark", "play", "star"],
  "it-development": ["code", "spark", "star"],
  "accounts-finance": ["coin", "star", "spark"],
};
/* one flag from the shared sprite (the same one the phone fields use) */
export function Flag({ c, title }) {
  const i = FLAGS.order.indexOf(c);
  if (i < 0) return null;
  return <i className="s79-flag" style={{ "--fx": i % FLAGS.cols, "--fy": Math.floor(i / FLAGS.cols) }} title={title} />;
}
const n_ = (k) => Array.from({ length: k }, (_, i) => i);
const short = (s, k = 26) => (s.length > k ? s.slice(0, k - 1).trimEnd() + "…" : s);

/* ------------------------------------------------------------------ the animated pictures */
/* ------------------------------------------------------------------ the hero */
function Hero79({ swap = true, id, crumbs, eyebrow, icon, name, tag, lead, chips, cta, cta2, facts, scene, labels, pal, grade, layout = "split", back = "blobs", head = "serif", flags, flagIn, poster, frame = "glass", floats = ["spark", "star", "lens"], cine: Cine }) {
  const ref = ee.useRef(null);
  const art = useTilt(layout === "iso" ? 4 : 8);
  useSpot(ref);
  ee.useEffect(() => {
    if (!d79Calm()) return undefined;
    document.documentElement.classList.add("d79-calm");
    return () => document.documentElement.classList.remove("d79-calm");
  }, []);
  const words = String(name).split(" ");
  const len = String(name).length;
  return (
    <section
      ref={ref}
      className={`s79 s79--${grade} s79--L-${layout} s79--bk-${back} s79--hd-${head} s79--fr-${frame} s79--${scene} s79--cine${len > 34 ? " s79--xlong" : len > 22 ? " s79--long" : ""}${swap ? " h79-swap" : ""}`}
      style={{ "--a": pal[0], "--b": pal[1], "--c": pal[2] }}
      aria-labelledby={id}
    >
      {/* build 80: only a still colour wash behind the story scene; the build 79 moving background (aurora, beams,
          rings, grid, dots) kept the browser repainting the whole hero all the time and made every service page lag */}
      <div className="s79__bg" aria-hidden="true">
        <i className="s79__blob s79__blob--1" /><i className="s79__blob s79__blob--2" />
      </div>
      <div className="d79-wrap s79__in">
        <div className="s79__copy">
          <nav className="s79__crumb d79-in" aria-label="Breadcrumb" style={{ "--d": "40ms" }}>
            {crumbs.map(([t, to], i) => (
              <ee.Fragment key={t}>
                {i ? <span aria-hidden="true">/</span> : null}
                {to ? <Link to={to}>{t}</Link> : <span aria-current="page">{t}</span>}
              </ee.Fragment>
            ))}
          </nav>
          <p className="s79__eb d79-in" style={{ "--d": "100ms" }}><span className="s79__eb-ic"><D79Icon k={icon} size={15} /></span>{eyebrow}{flagIn ? <Flag c="IN" title="India" /> : null}</p>
          <h1 id={id} className="s79__t">
            <span className="s79__name">
              {words.map((w, i) => <span key={i} className={"s79__w" + (i === words.length - 1 ? " is-last" : "")} style={{ "--d": 160 + i * 90 + "ms" }}>{w}{i < words.length - 1 ? " " : ""}</span>)}
            </span>{" "}
            <span className="s79__tag d79-in" style={{ "--d": 220 + words.length * 90 + "ms" }}>{tag}</span>
          </h1>
          {lead ? <p className="s79__lead d79-in" style={{ "--d": "620ms" }}>{lead}</p> : null}
          {chips && chips.length ? (
            <ul className="s79__chips d79-in" style={{ "--d": "720ms" }}>
              {chips.map((c) => <li key={c}><i aria-hidden="true">✓</i>{c}</li>)}
            </ul>
          ) : null}
          <div className="s79__cta d79-in" style={{ "--d": "820ms" }}>
            <Magnet as={Link} to={cta[1]} className="d79-btn s79-btn" sfx="go">{cta[0]} <D79Icon k="arrow" size={18} /></Magnet>
            {cta2 ? <Magnet as="a" href={cta2[1]} target={cta2[2] ? "_blank" : undefined} rel={cta2[2] ? "noopener noreferrer" : undefined} className="d79-btn s79-btn--line" sfx="tick">{cta2[0]}</Magnet> : null}
          </div>
          {facts ? (
            <ul className="s79__facts d79-in" style={{ "--d": "920ms" }}>
              {facts.map((f) => <li key={f}>{f}</li>)}
            </ul>
          ) : null}
        </div>
        <div ref={art} className="s79__gap" aria-hidden="true" />
      </div>
      <div className="c80wrap" aria-hidden="true">{Cine ? <Cine /> : null}</div>
    </section>
  );
}

/* the place of a service in the whole list (0 … 66), so every service gets its own look */
const ORDER = VERTICALS.flatMap((v) => v.services.map((s) => v.slug + "/" + s.slug));

/* one service page */
function SvcHero79({ v, n }) {
  const i = Math.max(0, v.services.findIndex((s) => s.slug === n.slug));
  const g = Math.max(0, ORDER.indexOf(v.slug + "/" + n.slug));
  const look = lookOf(g);
  const inc = n.includes || [];
  const cine = CINE[n.slug];
  return (
    <Hero79
      cine={cine && cine.C}
      id="s79-t"
      crumbs={[["Home", "/"], ["Services", "/services"], [v.name, "/services/" + v.slug], [n.name]]}
      eyebrow={`${v.name} · Service ${i + 1} of ${v.services.length}`}
      icon={ICON[v.slug] || "spark"}
      name={n.name}
      tag={TAG[n.slug] || v.headline || ""}
      lead={n.summary}
      chips={inc.slice(0, 4)}
      cta={[CTA[v.slug] || "Get a free quote", `/lets-talk?type=quote&service=${encodeURIComponent(n.slug)}`]}
      cta2={["WhatsApp us", whatsappUrl(`Hello Frequent Research, I would like to know more about ${n.name}.`), true]}
      facts={FACTS[v.slug]}
      scene={SCENE[n.slug] || SCENE_DEFAULT[v.slug] || "orbit"}
      labels={inc.length ? inc : [n.name]}
      pal={cine ? cine.pal : look.pal}
      grade={cine ? cine.grade : look.grade}
      layout={cine ? "split" : look.layout}
      frame={v.slug === "market-research" && look.frame === "laptop" ? "bare" : look.frame}
      back={look.back}
      head={look.head}
      poster={look.layout === "poster" ? POSTER[v.slug] : undefined}
      flags={v.slug === "market-research" && SCENE[n.slug] !== "map" ? FLAGS_MR.slice(g % 5).concat(FLAGS_MR.slice(0, g % 5)) : undefined}
      flagIn={FLAG_IN.includes(n.slug)}
      floats={FLOATS[v.slug]}
    />
  );
}

/* All services */
function ServicesHero79({ count }) {
  return (
    <Hero79
      swap={false}
      id="s79-t"
      crumbs={[["Home", "/"], ["Services"]]}
      eyebrow="Research · Marketing · Technology · Finance"
      icon="spark"
      name="Our services"
      tag="Four expert teams. One partner for every next move."
      lead={`${count} specialist services across four teams. Choose a team below, or tell us your goal and we will suggest the right mix.`}
      chips={VERTICALS.map((v) => `${v.name}: ${v.services.length}`)}
      cta={["Tell us your goal", "/lets-talk"]}
      cta2={["WhatsApp us", whatsappUrl("Hello Frequent Research, I would like help choosing the right services."), true]}
      facts={["55+ markets", "4 expert teams", "1 point of contact"]}
      cine={AllSvc80}
      scene="orbit"
      labels={VERTICALS.map((v) => v.name)}
      pal={["#2f6bff", "#6d4aff", "#12b5d6"]}
      grade="deep"
      layout="split"
      back="aurora"
      head="serif"
      flags={FLAGS_MR}
      floats={["lens", "spark", "code", "coin"].slice(0, 3)}
    />
  );
}

export { SvcHero79, ServicesHero79 };
