/*
 * Build 65 update 17: About Us, a completely new concept (Kunal, 1 November 2026: "current one looks like our journey page …
 * completely fresh, unique design approach which never seen before"). Prefix AB17_, styles about17.css (ab17-).
 * Theme: "The question company" — every project starts as a question; four engines turn it into growth.
 * No timeline (that is Our Journey) and no photos of people (those live only on /our-team). HD artwork is rendered 3D
 * (public/images/about17/*.webp, made by a small raymarcher in the site palette).
 *
 *  AB17_Hero     night sky; a particle field (canvas) that morphs between "?", "!", "FR" and "55"; the pointer pushes the
 *                particles; a typed question line cycles through one question per team; gradient headline
 *  AB17_Flap     a split-flap departure board: "WE ARE" + researchers / marketers / engineers / accountants / one team
 *  AB17_Engines  a 3D carousel of the four engines (rendered artwork, tagline, services) — drag, arrows or tabs, with sound
 *  AB17_Gauges   instrument dials for the facts (countries, teams, services, communities, products, certifications)
 *  AB17_Path     how a question travels: Ask → Listen → Build → Measure → Grow, with a comet running the track
 *  AB17_Trust    three holographic ISO cards that tilt with the pointer
 *  AB17_Galaxy   our own universe: the FR emblem, three community logos and seven Sampledge products in orbit
 *  AB17_Wall     a moving wall of questions clients bring us, in three drifting columns and many type styles
 *  AB17_Cta      "Bring us your hardest question." with a live-typed question box
 * Loops move transform / opacity only and pause while their section is off screen (.is-vis).
 */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { K5_I } from '../components/site/Kit65.jsx';
import { sx8List, sx8Vars } from '../components/site/Sampledge8.jsx';
import { frsPlay } from '../components/site/Floaters.jsx';
import { FRL_FR, FRL_Plate } from '../components/site/Logos13.jsx';
import { AB5_PANELS, ab5Svc } from './AboutUs65.jsx';
import { PR5_Logo } from '../components/site/PR5Logo.jsx';

import { AB17_IMG } from '../data/ab17Img.jsx';
const AB17_T = [
  { k: "market-research", key: "mr", name: "Market Research", who: "RESEARCHERS", verb: "We ask", ic: "mr", c1: "#2F6BFF", c2: "#8FB0FF", tag: "Hear every voice that matters.", q: "Who will actually buy this?", line: "Consumer, B2B and healthcare research across 55 countries: designed, fielded, quality-checked and turned into decisions." },
  { k: "digital-marketing", key: "dm", name: "Digital Marketing", who: "MARKETERS", verb: "We amplify", ic: "dm", c1: "#C8577E", c2: "#F2A9C1", tag: "Get found. Get chosen.", q: "How do we get found first?", line: "SEO, paid media, social, content, automation and analytics that turn attention into measurable growth." },
  { k: "it-development", key: "it", name: "IT & Development", who: "ENGINEERS", verb: "We build", ic: "it", c1: "#6D4AFF", c2: "#BBAAFF", tag: "Ideas in. Software out.", q: "Can software do this faster?", line: "Websites, apps, SaaS, CRM and ERP, AI automation, cloud and security, built around how your business runs." },
  { k: "accounts-finance", key: "af", name: "Accounts & Finance", who: "ACCOUNTANTS", verb: "We balance", ic: "af", c1: "#0E9C88", c2: "#9FE7DC", tag: "Clarity in every number.", q: "Where is the money really going?", line: "Bookkeeping, GST, TDS, payroll, MIS, budgeting and virtual-CFO support that keeps the business compliant and in control." },
];
const ab17V = (t) => ({ "--c1": t.c1, "--c2": t.c2 });
const ab17Svc = (k) => ab5Svc(k);
const ab17Total = () => AB17_T.reduce((n, t) => n + ab17Svc(t.k).length, 0) || 67;
const ab17Prods = () => sx8List();
const ab17Reduce = () => {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) {
    return false;
  }
};
const ab17Snd = (k = "tab") => {
  try {
    frsPlay(k);
  } catch (e) {}
};
const AB17_I = ({ n, s = 20 }) => (<K5_I n={n} s={s} />);

/* .is-in once, .is-vis while on screen (CSS pauses loops otherwise) */
function ab17UseVis(th = 0.06) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (!window.IntersectionObserver) {
      el.classList.add("is-in", "is-vis");
      return undefined;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        el.classList.toggle("is-vis", e.isIntersecting);
        if (e.isIntersecting) el.classList.add("is-in");
      },
      { rootMargin: "0px 0px -5% 0px", threshold: th }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function AB17_Sec({ className = "", children, ...rest }) {
  const ref = ab17UseVis();
  return (
    <section ref={ref} className={"ab17-sec " + className} {...rest}>
      {children}
    </section>
  );
}
function AB17_Head({ id, kick, title, em, sub, center }) {
  return (
    <div className={"ab17-head" + (center ? " ab17-head--c" : "")}>
      <span className="ab17-kick">{kick}</span>
      <h2 id={id} className="ab17-h2">
        {title} <em>{em}</em>
      </h2>
      {sub ? <p className="ab17-sub">{sub}</p> : null}
    </div>
  );
}

/* ── hero: particle morph ─────────────────────────────────────────────────────────── */
/* typed question line: types, holds, erases, next team */
function AB17_Typed({ items, className = "" }) {
  const [i, setI] = ee.useState(0);
  const [n, setN] = ee.useState(0);
  const [del, setDel] = ee.useState(false);
  ee.useEffect(() => {
    if (ab17Reduce()) {
      setN(items[i].q.length);
      const t = setTimeout(() => setI((i + 1) % items.length), 3200);
      return () => clearTimeout(t);
    }
    const full = items[i].q.length;
    let t;
    if (!del && n < full) t = setTimeout(() => setN(n + 1), 48);
    else if (!del) t = setTimeout(() => setDel(true), 1900);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 22);
    else {
      setDel(false);
      setI((i + 1) % items.length);
    }
    return () => clearTimeout(t);
  }, [n, del, i]);
  const it = items[i];
  return (
    <span className={"ab17-typed " + className} style={ab17V(it)}>
      <i className="ab17-typed__ic">
        <AB17_I n={it.ic} s={16} />
      </i>
      <span className="ab17-typed__q">{it.q.slice(0, n)}</span>
      <b className="ab17-typed__caret" aria-hidden="true" />
    </span>
  );
}

/* ── split-flap manifesto ─────────────────────────────────────────────────────────── */

/* ── the four engines: 3D carousel ───────────────────────────────────────────────── */

/* ── gauges ───────────────────────────────────────────────────────────────────────── */

/* ── how a question travels ───────────────────────────────────────────────────────── */
const AB17_STEPS = [
  { n: "Ask", ic: "search", c: "#2F6BFF", d: "You bring the question, big or small. One person owns it from here." },
  { n: "Listen", ic: "users", c: "#C8577E", d: "We hear the market: surveys, interviews, data and the numbers you already have." },
  { n: "Build", ic: "cpu", c: "#6D4AFF", d: "Campaigns, software and processes shaped around what we learned." },
  { n: "Measure", ic: "chart", c: "#0E9C88", d: "Dashboards, books and reports that show what moved, and why." },
  { n: "Grow", ic: "rocket", c: "#D99A2B", d: "The answer becomes the next decision. Then a better question." },
];
function AB17_Path() {
  return (
    <AB17_Sec className="ab17-path" aria-labelledby="ab17-path-h">
      <div className="container">
        <AB17_Head id="ab17-path-h" kick="How a question travels" title="Five stops." em="One ticket." center />
        <div className="ab17-path__track" aria-hidden="true">
          <i className="ab17-path__comet" />
        </div>
        <ol className="ab17-path__list">
          {AB17_STEPS.map((s, i) => (
            <li key={s.n} className="ab17-stop" style={{ "--c": s.c, "--i": i }}>
              <span className="ab17-stop__dot">
                <AB17_I n={s.ic} s={22} />
              </span>
              <b>
                <small>0{i + 1}</small> {s.n}
              </b>
              <p>{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </AB17_Sec>
  );
}

/* ── trust: holographic ISO cards ─────────────────────────────────────────────────── */
const AB17_ISO = [
  { n: "ISO 20252:2019", t: "Market, opinion & social research", d: "How we design studies, recruit and check respondents, and report results.", c1: "#2F6BFF", c2: "#9FE7DC" },
  { n: "ISO 9001:2015", t: "Quality management", d: "Every engine follows documented processes, reviews and continuous improvement.", c1: "#6D4AFF", c2: "#F2A9C1" },
  { n: "ISO 27001:2013", t: "Information security", d: "Client data, respondent data and code are protected by audited controls.", c1: "#0E9C88", c2: "#FFC27A" },
];
function AB17_Holo({ x, i }) {
  const ref = ee.useRef(null);
  const mv = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5,
      py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", (px * 16).toFixed(1) + "deg");
    el.style.setProperty("--rx", (-py * 12).toFixed(1) + "deg");
  };
  const lv = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };
  return (
    <div className="ab17-holo" style={{ "--c1": x.c1, "--c2": x.c2, "--i": i }} onPointerMove={mv} onPointerLeave={lv}>
      <div ref={ref} className="ab17-holo__card">
        <i className="ab17-holo__sheen" aria-hidden="true" />
        <span className="ab17-holo__seal" aria-hidden="true">
          <AB17_I n="shield" s={26} />
        </span>
        <b className="ab17-holo__n">{x.n}</b>
        <span className="ab17-holo__t">{x.t}</span>
        <p>{x.d}</p>
        <span className="ab17-holo__chip" aria-hidden="true" />
      </div>
    </div>
  );
}
function AB17_Trust() {
  return (
    <AB17_Sec className="ab17-tr" aria-labelledby="ab17-tr-h">
      <div className="container">
        <AB17_Head id="ab17-tr-h" kick="Built for trust" title="Three certificates." em="Independently audited." sub="Independent auditors review how we research, how we work and how we protect data." center />
        <div className="ab17-tr__row">
          {AB17_ISO.map((x, i) => (
            <AB17_Holo key={x.n} x={x} i={i} />
          ))}
        </div>
      </div>
    </AB17_Sec>
  );
}

/* ── galaxy: our own platforms ────────────────────────────────────────────────────── */
function AB17_Galaxy() {
  const P = ab17Prods();
  const panels = AB5_PANELS;
  const keyOf = (nm) => (/turn2/i.test(nm) ? "t2o" : /rewards/i.test(nm) ? "mfr" : "mho");
  return (
    <AB17_Sec className="ab17-gx" aria-labelledby="ab17-gx-h">
      <div className="ab17-gx__stars" aria-hidden="true" />
      <div className="container ab17-gx__in">
        <div className="ab17-gx__copy">
          <AB17_Head id="ab17-gx-h" kick="Our own universe" title="We don't only serve." em="We run our own." sub="Three research communities where people share opinions and get rewarded, and seven Sampledge products built by our IT engine." />
          <ul className="ab17-gx__list">
            {panels.map((c) => (
              <li key={c.n}>
                <a href={c.u} target="_blank" rel="noopener noreferrer">
                  <b>{c.n}</b> <span>{c.d}</span>
                </a>
              </li>
            ))}
            <li>
              <HmLink to="/products">
                <b>Sampledge</b> <span>{P.map((p) => p.short || p.name).join(" · ")}</span>
              </HmLink>
            </li>
          </ul>
        </div>
        <div className="ab17-orb" aria-hidden="true">
          <span className="ab17-orb__ring ab17-orb__ring--1" />
          <span className="ab17-orb__ring ab17-orb__ring--2" />
          <span className="ab17-orb__core"><FRL_FR kind="icon" tilt={0} alt="" rich /></span>
          <div className="ab17-orb__spin ab17-orb__spin--1">
            {panels.map((c, i) => (
              <span key={c.n} className="ab17-orb__sat" style={{ "--k": i, "--n": panels.length, "--r": "var(--r1)" }}>
                <span className="ab17-orb__keep"><FRL_Plate k={keyOf(c.n)} h={30} alt={c.n + " logo"} /></span>
              </span>
            ))}
          </div>
          <div className="ab17-orb__spin ab17-orb__spin--2">
            {P.map((p, i) => (
              <span key={p.id} className="ab17-orb__sat" style={{ "--k": i, "--n": P.length, "--r": "var(--r2)" }}>
                <span className="ab17-orb__keep ab17-orb__mk" style={sx8Vars(p)}>
                  <PR5_Logo p={p} v="mark" />
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </AB17_Sec>
  );
}

/* ── wall of questions ────────────────────────────────────────────────────────────── */

/* ── call to action ───────────────────────────────────────────────────────────────── */
function AB17_Cta() {
  return (
    <AB17_Sec className="ab17-cta" aria-labelledby="ab17-cta-h">
      <div className="ab17-cta__sky" aria-hidden="true">
        <i className="ab17-aur ab17-aur--a" />
        <i className="ab17-aur ab17-aur--b" />
        <i className="ab17-aur ab17-aur--c" />
      </div>
      <div className="container ab17-cta__in">
        <h2 id="ab17-cta-h" className="ab17-cta__h">
          Bring us your <em>hardest question.</em>
        </h2>
        <div className="ab17-cta__box" aria-hidden="true">
          <AB17_I n="search" s={20} />
          <AB17_Typed items={[...AB17_T].reverse()} className="ab17-typed--box" />
        </div>
        <div className="ab17-ctas ab17-ctas--c">
          <HmLink to="/lets-talk" className="ab17-btn ab17-btn--glow">
            Let's talk <AB17_I n="arrow" s={16} />
          </HmLink>
          <HmLink to="/our-journey" className="ab17-btn ab17-btn--glass">
            Our journey
          </HmLink>
          <HmLink to="/our-team" className="ab17-btn ab17-btn--glass">
            Meet the team
          </HmLink>
        </div>
      </div>
    </AB17_Sec>
  );
}

export { AB17_Cta, AB17_Galaxy, AB17_Head, AB17_I, AB17_IMG, AB17_Path, AB17_Sec, AB17_T, AB17_Trust, ab17Reduce, ab17Snd, ab17Svc, ab17Total, ab17V };
