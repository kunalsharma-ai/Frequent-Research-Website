/*
 * Home hero — build 63 (replaces Hero61). JS prefix HZ_; the component keeps the name FRH_Hero that v58_patches.js mounts.
 * Styles: src/styles/hero63.css (class prefix hz-).
 *
 * Layout rule (the build-62 hero let the visual crowd the copy): every slide is a strict two-column grid — copy left,
 * visual right — and the visual lives in its own fixed-ratio box (container-query units), so nothing in it can reach the
 * text. All slides share one grid cell, so the hero height never jumps when the slide changes. On phones the visual sits
 * BELOW the buttons, never between the headline and the copy.
 *
 * Each slide has its own palette and 3D scene:
 *   00 All services       site royal blue   a canvas globe in the site's blues: land dots, every country's flag at its
 *                                           real position, arcs pulsing out from the Delhi HQ; drag to spin it.
 *   01 Market Research    teal + amber      respondent universe: a live survey card, respondents orbiting it, a
 *                                           ticker with the flags of every panel-book country.
 *   02 Digital Marketing  magenta + orange  attention engine: a 3D phone feed, floating channel bubbles, reach curve.
 *   03 IT & Development   graphite + lime   build stack: isometric UI/API/Data/Cloud slabs, an editor that types, CI.
 *   04 Accounts & Finance black + gold      gold ledger: a rupee coin that turns, a growing coin stack, ledger ticks.
 *
 * Behaviour (kept from build 61): auto-advance 9 s with progress bars on the tabs, arrows, pause (WCAG 2.2.2), arrow /
 * Home / End keys, swipe; pauses with keyboard focus inside, off screen and in a hidden tab; reduced motion = no
 * autoplay, a still globe and no loops. Only the active slide's visual is mounted; the globe draws with
 * requestAnimationFrame only while it is on screen (≈45 fps cap, device-pixel-ratio cap 1.6).
 */
import * as ee from 'react';
import { HeroH1 } from '../../app/shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { VERTICALS } from '../../app/data/site.jsx';
import { findVertical } from '../../app/data/products.jsx';
import { PHONE_COUNTRIES } from '../../app/data/phoneCountries.jsx';
import { CC_COLS, CC_H, CC_W } from './CountryPicker.jsx';
import { FRK_I, FRK_SamLogo } from './FrKit.jsx';
import { PR5_LIST } from '../../data/Sampledge65.jsx';
import { HZ_All20 } from './Hero20.jsx';
import { CB22_Banner } from './Celebrate22.jsx';
import { PR5_Logo } from './PR5Logo.jsx';

const HZ_MS = 9000;
const HY_COUNTRIES = "__HY_COUNTRIES__"; /* [[iso, name, region], …] from public/data/panel-books/index.json */
 /* [[iso, lat, lon], …] tools/globe/make_country_points.py */
const HZ_VERTS = ["market-research", "digital-marketing", "it-development", "accounts-finance"];
const HZ_IC = { "market-research": "lens", "digital-marketing": "rocket", "it-development": "code", "accounts-finance": "pie" };
/* arcs from the Delhi HQ to these countries (all in the panel book) */

const HZ_SLIDES = [
  { k: "all", tag: "One brief. Four engines. Real growth.", motto: () => "Research it. Market it. Build it. Balance it.", flow: ["Research", "Market", "Build", "Balance"] },
  { k: "mr", slug: "market-research", tag: "Every market. Every mindset. Measured.", motto: (n) => `Real voices from ${n} countries — consumers, professionals, teens and doctors.`, flow: ["Design", "Fieldwork", "Insights"] },
  { k: "dm", slug: "digital-marketing", tag: "Be impossible to scroll past.", motto: () => "Strategy, creative and media that get you seen, clicked and chosen.", flow: ["Attract", "Engage", "Convert"] },
  { k: "it", slug: "it-development", tag: "We engineer what's next.", motto: () => "Websites, apps, SaaS and AI — built secure, built to scale.", flow: ["Plan", "Build", "Launch"] },
  { k: "af", slug: "accounts-finance", tag: "Clarity in every number.", motto: () => "Books, tax, compliance and CFO thinking — handled.", flow: ["Record", "Comply", "Advise"] },
  /* update 8: the Sampledge products get their own slide */
  { k: "px", tag: "Seven products. One connected ecosystem.", motto: () => "Survey programming, bidding, projects, sample, sales, finance and HR, built in-house by Sampledge.", flow: ["Research", "Sell", "Run"] },
];
const hzProds = () => PR5_LIST;

function hzVert(slug) {
  try {
    {
      const a = findVertical(slug);
      if (a) return a;
    }
  } catch (e) {}
  const a = Array.isArray(VERTICALS) ? VERTICALS.find((x) => x.slug === slug) : null;
  return a || { slug, name: slug, services: [] };
}
const hzSvc = (v) => (v.services || []).map((x) => ({ slug: x.slug, name: x.name || x.title || x.slug }));
const hzFi = () => {
  const m = {};
  for (const o of PHONE_COUNTRIES) m[o.iso] = o.fi;
  return m;
};
const hzFlagPos = (f) => `-${(f % CC_COLS) * CC_W}px -${Math.floor(f / CC_COLS) * CC_H}px`;

/* ---------- 00 All services: canvas flag globe ---------- */

/* update 10: the "All services" slide. The flag globe sits in the middle; the four teams ride a tilted 3D orbit, each
   card rolling through its own service names; the seven Sampledge marks circle closer in; service and product names
   stream in towards the globe like comets. Loops move transform/opacity only. */
const HZ_TC = ["#7EA2FF", "#F0A3BC", "#B9A8FF", "#9FE7DC"];
const hzAllItems = (verts) => {
  const out = [];
  const lists = verts.map((v) => hzSvc(v));
  const max = Math.max(0, ...lists.map((l) => l.length));
  for (let k = 0; k < max; k++) lists.forEach((l, t) => l[k] && out.push({ name: String(l[k].name).replace(/ — .*/, ""), t, team: verts[t].name }));
  hzProds().forEach((p, k) => out.splice(Math.min(out.length, 3 + k * 9), 0, { name: p.short, t: 4, team: "Sampledge product", p }));
  return out;
};
/* update 12: "All services" = the growth prism. One white beam (your brief) enters a glass prism carrying the emblem and
   splits into four team beams; each beam lands on its team card, which rolls through that team's services. The lit
   team moves down the stack every 3 s. Loops move transform/opacity only. */

/* the headline ticker on the "All services" slide: every service and every product, one after another */
function HZ_Ticker({ verts }) {
  const items = hzAllItems(verts);
  const [k, setK] = ee.useState(0);
  ee.useEffect(() => {
    // build 75: still on phones too
    if (!items.length || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches)) return undefined;
    const t = setInterval(() => setK((x) => (x + 1) % items.length), 1900);
    return () => clearInterval(t);
  }, [items.length]);
  const it = items[k] || { name: "", team: "", t: 0 };
  return (
    <p className="hza9-tick" aria-live="off">
      <span className="hza9-tick__we">We do</span>
      <span className="hza9-tick__box" style={{ "--c": it.t === 4 ? "#FFC27A" : HZ_TC[it.t] }}>
        <b key={k}>{it.name}</b>
      </span>
      <small key={"t" + k} style={{ "--c": it.t === 4 ? "#FFC27A" : HZ_TC[it.t] }}>
        {it.team}
      </small>
    </p>
  );
}

/* ---------- 05 Sampledge products (update 8): a 3D carousel of the seven product logos around the Sampledge core ---------- */
function HZ_Products() {
  const L = hzProds();
  return (
    <div className="hzv hzv-px" aria-hidden="true">
      <span className="hzp-floor" />
      <span className="hzp-halo hzp-halo--a" />
      <span className="hzp-halo hzp-halo--b" />
      <div className="hzp-stage">
        <div className="hzp-core">
        <span className="hzp-core__ring" />
        <span className="hzp-core__ring hzp-core__ring--b" />
        <span className="hzp-core__mk"><FRK_SamLogo h={64} word={false} tone="dark" /></span>
        <b>Sampledge</b>
      </div>
        <div className="hzp-ring" style={{ "--n": L.length }}>
          {L.map((p, i) => (
            <span key={p.id} className="hzp-slot" style={{ "--i": i, "--p1": p.c1, "--p2": p.c2 }}>
              <span className="hzp-slot__a">
                <span className="hzp-slot__b">
                  <span className="hzp-card">
                    <span className="hzp-card__mk">
                      <PR5_Logo p={p} v="mark" still />
                    </span>
                    <b>{p.short}</b>
                    <small>{p.cat}</small>
                  </span>
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className="hzp-row">
        {L.map((p, i) => (
          <span key={p.id} style={{ "--i": i, "--p1": p.c1 }}>
            <PR5_Logo p={p} v="mark" still />
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------- 01 Market Research: respondent universe ---------- */
function HZ_Universe({ nC }) {
  const list = Array.isArray(HY_COUNTRIES) ? HY_COUNTRIES : [];
  const fi = ee.useMemo(hzFi, []);
  const flags = list.filter((c) => fi[c[0]] != null);
  const half = Math.ceil(flags.length / 2);
  const row = (arr, k) => (
    <div className={"hzm-tick hzm-tick--" + k}>
      <div className="hzm-tick__t">
        {arr.concat(arr).map(([iso, name], j) => (
          <span key={iso + j}>
            <span className="cc-flag" style={{ backgroundPosition: hzFlagPos(fi[iso]) }} />
            {name}
          </span>
        ))}
      </div>
    </div>
  );
  return (
    <div className="hzv hzv-mr" aria-hidden="true">
      <span className="hzm-ring hzm-ring--a" />
      <span className="hzm-ring hzm-ring--b" />
      {[0, 1, 2, 3, 4, 5].map((k) => (
        <span key={k} className={"hzm-orb hzm-orb--" + k}>
          <span className={"hzm-av hzm-av--" + (k % 3)}>
            <FRK_I n={["users", "grid", "shield"][k % 3]} s={14} />
          </span>
        </span>
      ))}
      <div className="hzm-q">
        <div className="hzm-q__h">
          <span>
            <i className="hzm-live" /> Live survey
          </span>
          <b>Q7 / 12</b>
        </div>
        <p>How likely are you to recommend this brand?</p>
        <div className="hzm-scale">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
            <i key={n}>{n}</i>
          ))}
        </div>
        <div className="hzm-done">
          <span>Completes</span>
          <i>
            <b />
          </i>
        </div>
      </div>
      <div className="hzm-mix">
        {[
          ["Consumers", "a"],
          ["Professionals", "b"],
          ["Doctors", "c"],
        ].map(([t, c]) => (
          <span key={t} className={"hzm-mix__" + c}>
            {t}
          </span>
        ))}
      </div>
      <span className="hzm-badge">
        <b>{nC}</b> countries
      </span>
      {row(flags.slice(0, half), 0)}
      {row(flags.slice(half), 1)}
    </div>
  );
}

/* ---------- 02 Digital Marketing: attention engine ---------- */
function HZ_Attention() {
  return (
    <div className="hzv hzv-dm" aria-hidden="true">
      <span className="hzd-glow" />
      <div className="hzd-curve">
        <em>Reach</em>
        <svg viewBox="0 0 200 90" preserveAspectRatio="none">
          <path className="a" d="M0 80 C 30 76, 50 70, 70 62 S 110 40, 130 34 S 175 12, 200 6 L 200 90 L 0 90 Z" />
          <path className="l" d="M0 80 C 30 76, 50 70, 70 62 S 110 40, 130 34 S 175 12, 200 6" />
        </svg>
      </div>
      <div className="hzd-phone">
        <div className="hzd-screen">
          <div className="hzd-top">
            <i />
            <span>
              <b>Your brand</b>
              <small>Sponsored</small>
            </span>
          </div>
          <div className="hzd-media">
            <span className="hzd-media__s" />
          </div>
          <div className="hzd-acts">
            <span className="hzd-heart">
              <FRK_I n="star" s={14} />
            </span>
            <i />
            <i />
          </div>
          <div className="hzd-cta">Shop now</div>
          <div className="hzd-post2">
            <i />
            <i />
          </div>
        </div>
        {[0, 1, 2].map((k) => (
          <span key={k} className={"hzd-float hzd-float--" + k} />
        ))}
      </div>
      {[
        ["lens", "SEO"],
        ["target", "Ads"],
        ["users", "Social"],
        ["chat", "Email"],
        ["play", "Video"],
      ].map(([ic, t], k) => (
        <span key={t} className={"hzd-bub hzd-bub--" + k}>
          <FRK_I n={ic} s={15} />
          {t}
        </span>
      ))}
      <div className="hzd-ring">
        <svg viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="16" />
          <circle className="v" cx="20" cy="20" r="16" />
        </svg>
        <span>
          <b>CTR</b>
          <small>trend up</small>
        </span>
      </div>
      <div className="hzd-toast">
        <i>
          <FRK_I n="target" s={13} />
        </i>
        New lead
      </div>
    </div>
  );
}

/* ---------- 03 IT & Development: build stack ---------- */
function HZ_Stack() {
  return (
    <div className="hzv hzv-it" aria-hidden="true">
      <div className="hzi-iso">
        {[
          ["Cloud", "globe"],
          ["Data", "layers"],
          ["API", "link"],
          ["UI", "grid"],
        ].map(([t, ic], k) => (
          <span key={t} className={"hzi-slab hzi-slab--" + k}>
            <i>
              <FRK_I n={ic} s={16} />
            </i>
            <b>{t}</b>
          </span>
        ))}
      </div>
      <div className="hzi-ed">
        <div className="hzi-ed__h">
          <i />
          <i />
          <i />
          <span>app.tsx</span>
        </div>
        {[0.62, 0.84, 0.48, 0.72, 0.9, 0.4, 0.66].map((w, k) => (
          <p key={k} style={{ "--w": w, "--k": k, "--in": (k % 3) * 6 + "%" }}>
            <i />
          </p>
        ))}
      </div>
      <div className="hzi-ci">
        {["Build", "Test", "Security scan", "Deploy"].map((t, k) => (
          <span key={t} className={"hzi-ci__s hzi-ci__s--" + k}>
            <i>
              <FRK_I n="check" s={10} sw={3} />
            </i>
            {t}
          </span>
        ))}
      </div>
      <div className="hzi-term">
        <span>$ deploy --prod</span>
        <b>✓ live in 42s</b>
        <i />
      </div>
      <span className="hzi-shield">
        <FRK_I n="shield" s={20} />
      </span>
    </div>
  );
}

/* ---------- 04 Accounts & Finance: gold ledger ---------- */
function HZ_Gold() {
  return (
    <div className="hzv hzv-af" aria-hidden="true">
      <span className="hzf-halo" />
      <div className="hzf-coin">
        <span className="hzf-coin__f">₹</span>
        <span className="hzf-coin__b">₹</span>
      </div>
      <div className="hzf-stack">
        {[0, 1, 2, 3, 4, 5, 6].map((k) => (
          <i key={k} style={{ "--k": k }} />
        ))}
      </div>
      <div className="hzf-led">
        <div className="hzf-led__h">
          <b>Ledger</b>
          <span>Reconciled</span>
        </div>
        {["Sales", "Purchases", "Payroll", "GST input", "Bank"].map((t, k) => (
          <p key={t} style={{ "--k": k }}>
            <span>{t}</span>
            <i />
            <em>
              <FRK_I n="check" s={10} sw={3} />
            </em>
          </p>
        ))}
      </div>
      <div className="hzf-due">
        {["GST", "TDS", "ITR"].map((t, k) => (
          <span key={t} style={{ "--k": k }}>
            <b>{t}</b>
            <i>
              <FRK_I n="check" s={10} sw={3} />
            </i>
          </span>
        ))}
      </div>
      <div className="hzf-pie">
        <span />
        <small>Cash · Tax · Profit</small>
      </div>
    </div>
  );
}

/* ---------- hero ---------- */
function FRH_Hero() {
  const [cur, setCur] = ee.useState(0);
  const [user, setUser] = ee.useState(false);
  const [hold, setHold] = ee.useState(false);
  const [away, setAway] = ee.useState(false);
  const [calm] = ee.useState(() => {
    try {
      // build 75: phones get a still hero (no auto-play, no moving pictures); the play button still starts it
      return window.matchMedia("(prefers-reduced-motion: reduce), (max-width: 767px)").matches;
    } catch (e) {
      return false;
    }
  });
  const root = ee.useRef(null);
  const tabs = ee.useRef([]);
  const swipe = ee.useRef(null);
  const n = HZ_SLIDES.length;
  const go = (i) => setCur(((i % n) + n) % n);
  const paused = calm || user || hold || away;
  const L = typeof Link !== "undefined" ? Link : "a";
  const verts = HZ_VERTS.map(hzVert);
  const vBy = (slug) => verts[HZ_VERTS.indexOf(slug)];
  const total = verts.reduce((s, v) => s + hzSvc(v).length, 0);
  const nC = Array.isArray(HY_COUNTRIES) ? HY_COUNTRIES.length : 55;

  ee.useEffect(() => {
    const el = root.current;
    if (!el) return undefined;
    let vis = true;
    const upd = () => setAway(!vis || document.hidden);
    const ob = "IntersectionObserver" in window ? new IntersectionObserver(([e]) => ((vis = e.isIntersecting), upd()), { threshold: 0.15 }) : null;
    ob && ob.observe(el);
    document.addEventListener("visibilitychange", upd);
    return () => (ob && ob.disconnect(), document.removeEventListener("visibilitychange", upd));
  }, []);

  // build 75: the still hero (phones, reduced motion): once the words and cards have come in, every loop in the slides
  // and the background stops where it is (the celebration banner keeps its own timing)
  ee.useEffect(() => {
    const el = root.current;
    if (!calm || !el || !el.getAnimations) return undefined;
    const still = () => el.getAnimations({ subtree: true }).forEach((a) => {
      const t = a.effect && a.effect.target;
      if (t && t.closest && t.closest(".cb22-wrap")) return;
      if (a.effect.getComputedTiming().iterations === Infinity) a.pause();
    });
    still();
    const ts = [60, 600, 1600].map((ms) => setTimeout(still, ms));
    return () => ts.forEach(clearTimeout);
  }, [calm, cur]);

  const rtl = () => document.documentElement.classList.contains("fri-rtl");
  const onKey = (e) => {
    const k = e.key;
    if (k !== "ArrowRight" && k !== "ArrowLeft" && k !== "Home" && k !== "End") return;
    e.preventDefault();
    let i = k === "Home" ? 0 : k === "End" ? n - 1 : cur + ((k === "ArrowRight") !== rtl() ? 1 : -1);
    i = ((i % n) + n) % n;
    go(i);
    tabs.current[i] && tabs.current[i].focus();
  };
  const sDown = (e) => {
    if (e.pointerType === "mouse") return;
    swipe.current = [e.clientX, e.clientY];
  };
  const sUp = (e) => {
    const s = swipe.current;
    swipe.current = null;
    if (!s) return;
    const dx = e.clientX - s[0],
      dy = e.clientY - s[1];
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + ((dx < 0) !== rtl() ? 1 : -1));
  };
  const nameOf = (s) => (s.slug ? vBy(s.slug).name : s.k === "px" ? "Sampledge products" : "All services");
  const visual = (s) =>
    s.k === "px" ? <HZ_Products /> : s.k === "all" ? (<HZ_All20 verts={verts} total={total} nC={nC} />) : s.k === "mr" ? <HZ_Universe nC={nC} /> : s.k === "dm" ? <HZ_Attention /> : s.k === "it" ? <HZ_Stack /> : <HZ_Gold />;

  const copy = (s, i) => {
    if (s.k === "px") {
      const P = hzProds();
      return (
        <>
          <span className="hz-eye hz-in" style={{ "--s": 0 }}>
            <i>
              <FRK_I n="grid" s={15} />
            </i>
            Sampledge products
            <em translate="no">{`0${i} / 0${n - 1}`}</em>
          </span>
          <h2 className="hz-head hz-in" style={{ "--s": 1 }}>
            <span className="hz-tag">
              {s.tag}
            </span>
          </h2>
          <p className="hz-motto hz-in" style={{ "--s": 2 }}>
            <span>{s.motto(nC)}</span>
          </p>
          <ol className="hz-flow hz-in" style={{ "--s": 3 }}>
            {s.flow.map((f, j) => (
              <li key={f} style={{ "--j": j }}>
                <b translate="no">{j + 1}</b>
                <span>{f}</span>
              </li>
            ))}
          </ol>
          <div className="hz-ctas hz-in" style={{ "--s": 4 }}>
            <L to="/products" className="btn btn--light btn--lg hz-cta">
              Explore Sampledge products <FRK_I n="arrow" s={18} />
            </L>
            <L to="/lets-talk" className="btn btn--outline-light btn--lg">
              Book a demo
            </L>
          </div>
          <div className="hz-chips hz-chips--px hz-in" style={{ "--s": 5 }}>
            {P.map((p) => (
              <L key={p.id} to={"/products/" + p.id} style={{ "--p1": p.c1 }}>
                <PR5_Logo p={p} v="mark" still /> {p.short}
              </L>
            ))}
          </div>
        </>
      );
    }
    const v = s.slug ? vBy(s.slug) : null;
    const svc = v ? hzSvc(v) : [];
    const show = svc.slice(0, 4);
    const more = svc.length - show.length;
    return (
      <>
        {i === 0 ? (
          <HeroH1 className="hz-head hz-in" style={{ "--s": 0 }} id="hy-h1">
            <span className="hz-kick">
              {verts.map((x, k) => (
                <span key={x.slug} className={"hz-kick__i hz-kick__i--" + k}>
                  {x.name}
                  <span className="hz-sep">{k < verts.length - 1 ? ", " : " — "}</span>
                </span>
              ))}
            </span>
            <span className="hz-tag hza9-tag hzx-tag">
              <span className="hza9-tag__a">One brief.</span> <span className="hza9-tag__b">Four engines.</span> <span className="hza9-tag__c">Real growth.</span>
            </span>
          </HeroH1>
        ) : (
          <>
            <span className="hz-eye hz-in" style={{ "--s": 0 }}>
              <i>
                <FRK_I n={HZ_IC[s.slug]} s={15} />
              </i>
              {v.name}
              <em translate="no">{`0${i} / 0${n - 1}`}</em>
            </span>
            <h2 className="hz-head hz-in" style={{ "--s": 1 }}>
              <span className="hz-tag">{s.tag}</span>
            </h2>
          </>
        )}
        {s.k === "all" ? (
          <div className="hz-in" style={{ "--s": 2 }}>
            <HZ_Ticker verts={verts} />
          </div>
        ) : (
          <p className="hz-motto hz-in" style={{ "--s": 2 }}>
            <span>{s.motto(nC)}</span>
          </p>
        )}
        {s.k === "all" ? null : <ol className="hz-flow hz-in" style={{ "--s": 3 }}>
          {s.flow.map((f, j) => (
            <li key={f} style={{ "--j": j }}>
              <b translate="no">{j + 1}</b>
              <span>{f}</span>
            </li>
          ))}
        </ol>}
        <div className="hz-ctas hz-in" style={{ "--s": 4 }}>
          <L to={v ? `/services/${s.slug}` : "/services"} className="btn btn--light btn--lg hz-cta">
            {v ? `Explore ${v.name}` : "Explore Our Services"} <FRK_I n="arrow" s={18} />
          </L>
          <L to="/lets-talk" className="btn btn--outline-light btn--lg">
            Talk to an Expert
          </L>
        </div>
        {v ? (
          <div className="hz-chips hz-in" style={{ "--s": 5 }}>
            {show.map((x) => (
              <L key={x.slug} to={`/services/${s.slug}/${x.slug}`}>
                {x.name}
              </L>
            ))}
            {more > 0 ? (
              <L to={`/services/${s.slug}`} className="hz-chips__more">
                {`+${more} more`}
              </L>
            ) : null}
          </div>
        ) : (
          <div className="hz-chips hz-chips--teams hz-in" style={{ "--s": 5 }}>
            {verts.map((x, k) => (
              <L key={x.slug} to={`/services/${x.slug}`} className={"hz-team hz-team--" + k}>
                <FRK_I n={HZ_IC[x.slug]} s={14} /> {x.name}
              </L>
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <section
      ref={root}
      className={"hz hz--" + HZ_SLIDES[cur].k + (paused ? " is-paused" : "") + (away ? " is-away" : "") + (calm ? " is-calm" : "")}
      aria-labelledby="hy-h1"
      data-frm-live=""
      onFocus={(e) => e.target.matches && e.target.matches(":focus-visible") && setHold(true)}
      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && setHold(false)}
      style={{ "--ms": HZ_MS + "ms" }}
    >
      <div className="hz-bg" aria-hidden="true">
        {HZ_SLIDES.map((s, i) => (
          <i key={s.k} className={"hz-bg__" + s.k + (i === cur ? " is-on" : "")} />
        ))}
        <span className="hz-grid" />
        <span className="hz-aur hz-aur--a" />
        <span className="hz-aur hz-aur--b" />
      </div>

      <div className="container hz__inner">
        <CB22_Banner />
        <div className="hz-slides" aria-roledescription="carousel" aria-label="Our services" onPointerDown={sDown} onPointerUp={sUp} onPointerCancel={() => (swipe.current = null)}>
          {HZ_SLIDES.map((s, i) => {
            const on = i === cur;
            return (
              <section
                key={s.k}
                id={"hy-slide-" + s.k}
                className={"hz-slide hz-slide--" + s.k + (on ? " is-on" : "")}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} / ${n}: ${nameOf(s)}`}
                aria-hidden={on ? undefined : "true"}
                inert={on ? undefined : ""}
                data-pr-keep=""
              >
                <div className="hz-copy">{copy(s, i)}</div>
                <div className="hz-stage">{on ? visual(s) : null}</div>
              </section>
            );
          })}
        </div>

        <div className="hz-nav">
          <button type="button" className="hz-arrow" onClick={() => go(cur - 1)} aria-label="Previous slide">
            <FRK_I n="back" s={16} />
          </button>
          <div className="hz-tabs" role="tablist" aria-label="Choose a service" onKeyDown={onKey}>
            {HZ_SLIDES.map((s, i) => (
              <button
                key={s.k}
                ref={(el) => (tabs.current[i] = el)}
                type="button"
                role="tab"
                id={"hy-tab-" + s.k}
                aria-selected={i === cur}
                aria-controls={"hy-slide-" + s.k}
                tabIndex={i === cur ? 0 : -1}
                className={"hz-tab hz-tab--" + s.k + (i === cur ? " is-on" : "")}
                aria-label={nameOf(s)}
                onClick={() => go(i)}
              >
                <i className="hz-tab__ic">
                  <FRK_I n={s.slug ? HZ_IC[s.slug] : s.k === "px" ? "grid" : "layers"} s={16} />
                </i>
                <span className="hz-tab__t">{nameOf(s)}</span>
                <span className="hz-tab__bar">{i === cur ? <i key={cur} onAnimationEnd={() => !paused && go(cur + 1)} /> : null}</span>
              </button>
            ))}
          </div>
          <button type="button" className="hz-arrow" onClick={() => go(cur + 1)} aria-label="Next slide">
            <FRK_I n="arrow" s={16} />
          </button>
          <button type="button" className="hz-pause" onClick={() => setUser((u) => !u)} aria-label={user || calm ? "Play slides" : "Pause slides"} aria-pressed={user}>
            <FRK_I n={user || calm ? "play" : "pause"} s={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

export { FRH_Hero, HZ_TC, hzProds, hzSvc };
