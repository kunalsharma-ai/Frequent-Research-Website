import * as ee from 'react';
import { cmsList } from '../cms.jsx';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { useLazy } from '../data/useLazy.js';
import { PORTALS, VERTICALS } from '../data/site.jsx';
import { CERTIFICATIONS, CertBadge, EsomarBadge } from '../data/products.jsx';
import { IndustryIcon, prefersReducedMotion, useInView } from './HeroParts.jsx';
import { INDUSTRIES, INDUSTRY_GROUPS, SERVICE_GUIDES, findIndustry } from '../data/industries.jsx';
import { RC_I, RC_useInView } from '../shared/Reveal.jsx';
import { HM_Head, HmLink, hmReduce, hmV } from '../shared/HomeShared.jsx';
import { RG_Flag, RG_TOTAL } from '../shared/Regions.jsx';
import { ASSOCIATIONS, BR_Assoc, BR_Msme } from '../shared/Brand.jsx';
import { HhLink, hhReduce } from '../shared/HomeHero.jsx';
import { IN_Count, inG, inUseAllCases } from '../shared/Industries.jsx';
import { PanelMark } from '../shared/PanelMark.jsx';
import { SERVICE_COUNT, SERVICE_INDUSTRIES } from '../data/serviceBits.jsx';
import { LDR_Section } from '../pages/OurTeamPage.jsx';
import { BlogCover } from '../../components/site/BlogCover.jsx';
import { usePageMeta } from '../SiteApp.jsx';
import { navGo } from '../nav.jsx';
import { K5_HomeYears } from '../../components/site/Kit65.jsx';
import { CA82_Section } from '../../design82/Ca82.jsx';
import { GV8_Home } from '../../components/site/Gov8.jsx';
import { FRX_HomeProducts } from '../../components/site/Products.jsx';
import { FR_Testi } from '../../components/site/LiveReviews.jsx';
import { HomeHero79 } from '../../design79/HomeHero79.jsx';

/* build 82.3: editable in the super admin (Website content > Home page numbers, key "home-stats") */
const HOME_STATS = cmsList("home-stats", [
    {
      id: "markets",
      value: 55,
      suffix: "+",
      label: "Markets covered for research fieldwork",
    },
    {
      id: "services",
      value: SERVICE_COUNT,
      suffix: "",
      label: "Specialist services across four teams",
    },
    {
      id: "projects",
      value: 2500,
      suffix: "+",
      label: "Projects delivered",
      confirm: true,
    },
    {
      id: "clients",
      value: 98,
      suffix: "%",
      label: "Clients who come back for more",
      confirm: true,
    },
  ], "id");
function CountUp({ value, suffix, run }) {
  const [n, s] = ee.useState(0);
  ee.useEffect(() => {
    if (!run) return;
    if (prefersReducedMotion()) {
      s(value);
      return;
    }
    let i;
    const o = performance.now(),
      r = 1800,
      c = (d) => {
        const u = Math.min(1, (d - o) / r),
          p = 1 - Math.pow(1 - u, 4);
        s(Math.round(value * p));
        if (u < 1) i = requestAnimationFrame(c);
      };
    i = requestAnimationFrame(c);
    return () => cancelAnimationFrame(i);
  }, [run, value]);
  return (
    <span className="stat__num">
      {n.toLocaleString("en-IN")}
      <span className="stat__sfx">{suffix}</span>
    </span>
  );
}
/* build 82.3 (Kunal): numbers band redesigned: four calm navy cards, a thin accent line per team colour, a line icon
   with a small moving detail, a bar that fills and a gentle 3D tilt that follows the pointer. Styles: x82.css (.n83*). */
const N83 = [
  { k: "mr", ic: "globe", pct: 0.55 },
  { k: "it", ic: "grid", pct: 0.67 },
  { k: "dm", ic: "check", pct: 0.85 },
  { k: "af", ic: "repeat", pct: 0.98 },
];
/* build 82.3 third pass (Kunal: "professional icons, not kids pictures"): line icons drawn with a gradient stroke,
   each with one small moving detail */
function N83_Icon({ kind, id }) {
  const g = "url(#n83g-" + id + ")";
  return (
    <svg className={"n83-ic n83-ic--" + kind} viewBox="0 0 48 48" aria-hidden="true">
      <defs>
        <linearGradient id={"n83g-" + id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--c2)" }} />
          <stop offset="1" style={{ stopColor: "var(--c1)" }} />
        </linearGradient>
      </defs>
      <g fill="none" stroke={g} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        {kind === "globe" ? (
          <>
            <circle cx="24" cy="24" r="15" />
            <path d="M9 24h30M24 9c-5 5-5 25 0 30M24 9c5 5 5 25 0 30M12 16h24M12 32h24" />
            <g className="n83-ic__spin">
              <circle cx="24" cy="5" r="2.4" fill="var(--c2)" stroke="none" />
            </g>
          </>
        ) : kind === "grid" ? (
          <>
            <rect x="8" y="8" width="13" height="13" rx="3.5" />
            <rect x="27" y="8" width="13" height="13" rx="3.5" className="n83-ic__pop" />
            <rect x="8" y="27" width="13" height="13" rx="3.5" />
            <rect x="27" y="27" width="13" height="13" rx="3.5" />
          </>
        ) : kind === "check" ? (
          <>
            <rect x="10" y="8" width="28" height="34" rx="5" />
            <path d="M18 8V6h12v2" />
            <path className="n83-ic__draw" d="m17 26 5 5 9-10" />
          </>
        ) : (
          <>
            <circle cx="24" cy="19" r="6" />
            <path d="M14 36c1.6-5.4 5.4-8 10-8s8.4 2.6 10 8" />
            <g className="n83-ic__spin">
              <path d="M41 24a17 17 0 0 1-4 11M7 24a17 17 0 0 1 4-11" />
              <path d="m38 33-1 2.6 2.8.6M10 15l1-2.6-2.8-.6" />
            </g>
          </>
        )}
      </g>
    </svg>
  );
}
const n83Tilt = (e) => {
  const el = e.currentTarget, r = el.getBoundingClientRect();
  el.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -8 + "deg");
  el.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg");
};
const n83Reset = (e) => {
  e.currentTarget.style.setProperty("--rx", "0deg");
  e.currentTarget.style.setProperty("--ry", "0deg");
};
function StatsBand() {
  const [t, e] = useInView(0.3);
  return (
    <section className={"stats n83" + (e ? " is-in" : "")} ref={t} aria-label="Frequent Research in numbers">
      <div className="n83__bg" aria-hidden="true">
        <i />
        <i />
        <i />
        <span className="n83__floor" />
      </div>
      <div className="container">
        <p className="n83__k">
          <span>Frequent Research</span> in numbers
        </p>
        <div className="n83__grid">
          {HOME_STATS.map((a, n) => {
            const z = N83[n] || N83[0];
            return (
              <div className={"n83-t n83-t--" + z.k} key={a.label} style={{ "--i": n, "--p": z.pct }} onPointerMove={n83Tilt} onPointerLeave={n83Reset}>
                <span className="n83-t__glow" aria-hidden="true" />
                <span className="n83-t__ic">
                  <N83_Icon kind={z.ic} id={n} />
                </span>
                {l.jsx(CountUp, {
                  value: Number(a.value) || 0,
                  suffix: a.suffix,
                  run: e,
                })}
                <span className="stat__label">{a.label}</span>
                <span className="n83-t__bar" aria-hidden="true">
                  <i />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function LeadersSection() {
  return <LDR_Section />;
}
const HOME_VALUES = [
  {
    t: "Research-led thinking",
    d: "We start by understanding the market, the customer and the business problem before recommending a solution.",
  },
  {
    t: "Integrated capabilities",
    d: "Research, marketing, technology and finance work together instead of in separate silos.",
  },
  {
    t: "Business-focused approach",
    d: "We focus on practical solutions that support your commercial goals, not just deliverables.",
  },
  {
    t: "Scalable solutions",
    d: "From startups and SMEs to large organisations, our services grow with your requirements.",
  },
  {
    t: "Technology & data driven",
    d: "We combine data, technology, digital platforms and human expertise to build smarter solutions.",
  },
  {
    t: "Long-term partnership",
    d: "We aim to become a reliable extension of your team, not just finish a project.",
  },
];
/* build 74: the home page shows its first screen (hero and figures) at once and adds the sections below it one by one,
   each in its own short step, so the browser never freezes while the page starts (Lighthouse "total blocking time").
   A link to a section of the home page (/#section) shows every section at once. */
const HM_Q = [];
let hmRun = false;
const hmPump = () => {
  if (hmRun) return;
  hmRun = true;
  const step = () => {
    const f = HM_Q.shift();
    if (!f) {
      hmRun = false;
      return;
    }
    f();
    setTimeout(step, 0);
  };
  setTimeout(step, 0);
};
const hmAll = () => typeof location !== "undefined" && location.hash.length > 1 && !/^#\//.test(location.hash);
function HM_Later({ children }) {
  const [on, setOn] = ee.useState(hmAll);
  ee.useEffect(() => {
    if (on) return undefined;
    let live = true;
    HM_Q.push(() => live && setOn(true));
    hmPump();
    return () => {
      live = false;
    };
  }, []);
  return on ? children : <div className="hm-later" aria-hidden="true" />;
}
function HomePage() {
  usePageMeta(null);
  const [t, e] = ee.useState(null);
  return (
    <>
      <HomeHero79 />
      {l.jsx(StatsBand, {})}
      <HM_Later>
        <K5_HomeYears />
      </HM_Later>
      <HM_Later>
        <CA_Section />
      </HM_Later>
      <HM_Later>
        <HM_Partner />
      </HM_Later>
      <HM_Later>
        <GV8_Home />
      </HM_Later>
      <HM_Later>
        {l.jsx(LeadersSection, {})}
      </HM_Later>
      <HM_Later>
        <HM_Services />
      </HM_Later>
      <HM_Later>
        <IE_Section />
      </HM_Later>
      <HM_Later>
        <FRX_HomeProducts />
      </HM_Later>
      <HM_Later>
        <HM_Panels />
      </HM_Later>
      <HM_Later>
        <HM_Why />
      </HM_Later>
      <HM_Later>
        <HM_Industries />
      </HM_Later>
      <HM_Later>
        <FR_Testi />
      </HM_Later>
      <HM_Later>
        <section className="section section--tint" aria-labelledby="ins-title">
          <div className="container">
            <div className="section__head">
              <h2 id="ins-title">From our blog</h2>
              <p>In-depth guides from our research, marketing, technology and finance teams.</p>
            </div>
            <div className="bgrid bgrid--4">
              {SERVICE_GUIDES.slice(0, 4).map((a) => {
                const n = VERTICALS.find((s) => s.slug === a.vertical);
                return (
                  <Link to={`/blog/${a.slug}`} className="bcard" key={a.slug}>
                    <BlogCover post={a} size="sm" label={false} />
                    <div className="bcard__body">
                      <span className={`pill tone-${n.color}`}>{n.name}</span>
                      <h3>{a.title}</h3>
                      <span className="bmeta">Read the guide →</span>
                    </div>
                  </Link>
                );
              })}
            </div>
            <Link to="/blog" className="btn btn--ghost">
              Visit the blog
            </Link>
          </div>
        </section>
      </HM_Later>
      <HM_Later>
        <HH_Final />
      </HM_Later>
    </>
  );
}
const HM_NEEDS = [
  ["Researching a new market", "market-research", "search"],
  ["Launching a product", "digital-marketing", "rocket"],
  ["Generating leads", "digital-marketing", "target"],
  ["Developing a software platform", "it-development", "cpu"],
  ["Improving your Google rankings", "digital-marketing", "trend"],
  ["Automating processes", "it-development", "refresh"],
  ["Strengthening financial operations", "accounts-finance", "pie"],
];
function HM_Partner() {
  const [ref, v] = RC_useInView(0.2);
  const [act, setAct] = ee.useState(null);
  const [auto, setAuto] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || hmReduce()) return;
    const id = setInterval(() => setAuto((a) => (a + 1) % HM_NEEDS.length), 2600);
    return () => clearInterval(id);
  }, [v, hold]);
  const need = act != null ? act : hold ? null : auto;
  const on = need != null ? HM_NEEDS[need][1] : null;
  const pos = [
    [18, 22],
    [82, 22],
    [18, 78],
    [82, 78],
  ];
  const total = VERTICALS.reduce((n, a) => n + a.services.length, 0);
  return (
    <section ref={ref} className={"section hm-partner" + (v ? " is-in" : "")} aria-labelledby="hm-partner">
      <div className="container">
        <div className="hm-partner__grid">
          <div>
            <HM_Head
              id="hm-partner"
              k="One partner"
              t="One partner for every stage of your business"
              i="Your business doesn't always need another vendor. Sometimes it needs a partner who understands the bigger picture."
            />
            <p className="hm-partner__q">Whatever you are working on, the right team is already in the room:</p>
            <ul
              className="hm-needs"
              onMouseLeave={() => {
                setAct(null);
                setHold(false);
              }}
            >
              {HM_NEEDS.map(([t, slug, ic], i) => (
                <li
                  key={t}
                  style={{
                    "--c": hmV(slug).c,
                    "--i": i,
                  }}
                >
                  <button
                    type="button"
                    className={need === i ? "is-on" : ""}
                    onMouseEnter={() => {
                      setHold(true);
                      setAct(i);
                    }}
                    onFocus={() => {
                      setHold(true);
                      setAct(i);
                    }}
                    onClick={() => setAct(i)}
                  >
                    <RC_I n={ic} s={16} />
                    <span>{t}</span>
                    <em>{hmV(slug).short}</em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="hm-hub" aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="hm-hub__lines">
              {VERTICALS.map((a, i) => (
                <line
                  key={a.slug}
                  x1="50"
                  y1="50"
                  x2={pos[i][0]}
                  y2={pos[i][1]}
                  className={on === a.slug ? "is-on" : ""}
                  style={{
                    "--c": hmV(a.slug).lt,
                  }}
                />
              ))}
              <rect x="18" y="22" width="64" height="56" className="hm-hub__ring" />
            </svg>
            <div className="hm-hub__core">
              <span>Your business</span>
              <b>{total}</b>
              <em>services, one team</em>
            </div>
            {VERTICALS.map((a, i) => (
              <div
                key={a.slug}
                className={"hm-hub__node" + (on === a.slug ? " is-on" : "") + (on && on !== a.slug ? " is-dim" : "")}
                style={{
                  left: pos[i][0] + "%",
                  top: pos[i][1] + "%",
                  "--c": hmV(a.slug).c,
                  "--lt": hmV(a.slug).lt,
                }}
              >
                <span className="hm-hub__ic">
                  <RC_I n={hmV(a.slug).ic} s={22} />
                </span>
                <b>{a.name}</b>
              </div>
            ))}
            {!hmReduce() &&
              VERTICALS.map((a, i) => (
                <i
                  key={"p" + i}
                  className="hm-hub__pulse"
                  style={{
                    "--x": pos[i][0] - 50,
                    "--y": pos[i][1] - 50,
                    "--c": hmV(a.slug).lt,
                    "--d": i * 0.6 + "s",
                  }}
                />
              ))}
          </div>
        </div>
        <ul className="hm-pillars">
          {VERTICALS.map((a, i) => (
            <li
              key={a.slug}
              style={{
                "--c": hmV(a.slug).c,
                "--lt": hmV(a.slug).lt,
                "--i": i,
              }}
              className={on === a.slug ? "is-on" : ""}
            >
              <HmLink to={`/services/${a.slug}`} className="hm-pillar">
                <span className="hm-pillar__top">
                  <span className="hm-pillar__ic">
                    <RC_I n={hmV(a.slug).ic} s={22} />
                  </span>
                  <b className="hm-pillar__n">
                    <IN_Count to={a.services.length} run={v} />
                    <small>services</small>
                  </b>
                </span>
                <h3>{a.name}</h3>
                <p>{a.card}</p>
                <ol className="hm-flow">
                  {a.flow.map((f, k) => (
                    <li
                      key={f}
                      style={{
                        "--k": k,
                      }}
                    >
                      {f}
                    </li>
                  ))}
                </ol>
                <span className="hm-pillar__go">
                  {"Explore "}
                  {a.name}
                  {" \u2192"}
                </span>
              </HmLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function HM_Services() {
  const [t, setT] = ee.useState(0);
  const [q, setQ] = ee.useState("");
  const [open, setOpen] = ee.useState(null);
  const [ref, v] = RC_useInView(0.15);
  const total = VERTICALS.reduce((n, a) => n + a.services.length, 0);
  const Q = q.trim().toLowerCase();
  const hits = Q
    ? VERTICALS.flatMap((a) =>
        a.services
          .filter((s) => (s.name + " " + s.summary + " " + (s.includes || []).join(" ")).toLowerCase().includes(Q))
          .map((s) => ({
            a,
            s,
          })),
      )
    : null;
  const A = VERTICALS[t],
    vv = hmV(A.slug);
  const items =
    hits ||
    A.services.map((s) => ({
      a: A,
      s,
    }));
  return (
    <section ref={ref} className={"section hm-svc" + (v ? " is-in" : "")} aria-labelledby="svc-title">
      <div className="container">
        <div className="hm-svc__top">
          <HM_Head
            id="svc-title"
            k="Services"
            t="Every service, in one place"
            i="Pick a team, or search across everything we do. Each service has its own page with the process, benefits and FAQs."
          />
          <div className="hm-svc__total">
            <b>
              <IN_Count to={total} run={v} />
            </b>
            <span>
              {"services across "}
              {VERTICALS.length}
              {" teams"}
            </span>
          </div>
        </div>
        <label className="hm-search">
          <RC_I n="search" s={18} />
          <span className="sr-only">Search services</span>
          <input
            type="search"
            placeholder="Search services, e.g. CATI, SEO, payroll, mobile app"
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setOpen(null);
            }}
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search">
              ×
            </button>
          )}
        </label>
        <div className="hm-svc__grid">
          <div className="hm-svc__teams" role="tablist" aria-label="Choose a team">
            {VERTICALS.map((a, k) => {
              const c = hmV(a.slug);
              return (
                <button
                  key={a.slug}
                  role="tab"
                  aria-selected={!hits && k === t}
                  className={!hits && k === t ? "is-on" : ""}
                  style={{
                    "--c": c.c,
                    "--lt": c.lt,
                  }}
                  onClick={() => {
                    setT(k);
                    setQ("");
                    setOpen(null);
                  }}
                >
                  <span className="hm-svc__tic">
                    <RC_I n={c.ic} s={20} />
                  </span>
                  <span className="hm-svc__tt">
                    <b>{a.name}</b>
                    <small>{a.flow.join(" \u2192 ")}</small>
                  </span>
                  <span className="hm-svc__tn">{a.services.length}</span>
                  <i
                    className="hm-svc__tbar"
                    style={{
                      width: (a.services.length / 19) * 100 + "%",
                    }}
                  />
                </button>
              );
            })}
          </div>
          <div
            className="hm-svc__panel"
            style={{
              "--c": vv.c,
              "--lt": vv.lt,
            }}
            key={hits ? "q" : t}
          >
            {!hits && <p className="hm-svc__intro">{A.intro}</p>}
            {hits && (
              <p className="hm-svc__intro">
                {hits.length} {hits.length === 1 ? "service matches" : "services match"}
                {" \u201C"}
                {q}”.
              </p>
            )}
            <ul className="hm-tiles">
              {items.map(({ a, s }, k) => {
                const c = hmV(a.slug),
                  isOpen = open === a.slug + s.slug;
                return (
                  <li
                    key={a.slug + s.slug}
                    className={isOpen ? "is-open" : ""}
                    style={{
                      "--c": c.c,
                      "--lt": c.lt,
                      "--k": Math.min(k, 20),
                    }}
                  >
                    <button
                      type="button"
                      className="hm-tile"
                      aria-expanded={isOpen}
                      onClick={() => setOpen(isOpen ? null : a.slug + s.slug)}
                      onMouseEnter={() => setOpen(a.slug + s.slug)}
                    >
                      <span className="hm-tile__n">
                        {hits ? <RC_I n={c.ic} s={14} /> : String(k + 1).padStart(2, "0")}
                      </span>
                      <b>{s.name}</b>
                    </button>
                    {isOpen && (
                      <div className="hm-tile__more">
                        <p>{s.summary}</p>
                        <ul>
                          {(s.includes || []).slice(0, 3).map((x) => (
                            <li key={x}>{x}</li>
                          ))}
                        </ul>
                        <HmLink to={`/services/${a.slug}/${s.slug}`}>Learn more →</HmLink>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
            {!hits && (
              <HmLink to={`/services/${A.slug}`} className="hm-svc__all">
                {"See all "}
                {A.name}
                {" services \u2192"}
              </HmLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function HM_Panels() {
  const [ref, v] = RC_useInView(0.2);
  const [p, setP] = ee.useState(0);
  const P = PORTALS[p];
  const col = ["#1E5BFF", "#F28C28", "#0E9C88"];
  const tilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -8 + "deg");
    e.currentTarget.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 10 + "deg");
  };
  const untilt = (e) => {
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };
  return (
    <section ref={ref} className={"section hm-panels" + (v ? " is-in" : "")} aria-labelledby="portals-title">
      <div className="container">
        <HM_Head
          id="portals-title"
          k="Communities we run"
          t="Our research panels"
          i="Three communities we run ourselves, so our clients get verified, profiled respondents and our members get fair rewards."
          center
        />
        <div className="hm-value" aria-hidden="true">
          <div className="hm-value__side">
            <RC_I n="users" s={20} />
            <b>Members</b>
            <span>Share opinions, earn fair rewards</span>
          </div>
          <div className="hm-value__mid">
            <svg viewBox="0 0 300 60" preserveAspectRatio="none">
              <path d="M0 30 H300" className="hm-value__line" />
            </svg>
            {!hmReduce() &&
              [0, 1, 2, 3].map((k) => (
                <i
                  key={k}
                  style={{
                    "--d": k * 0.7 + "s",
                  }}
                />
              ))}
            <span className="hm-value__core">3 panels</span>
          </div>
          <div className="hm-value__side">
            <RC_I n="check" s={20} />
            <b>Clients</b>
            <span>Verified, profiled respondents</span>
          </div>
        </div>
        <ul className="hm-pcards">
          {PORTALS.map((r, k) => (
            <li
              key={r.slug}
              style={{
                "--c": col[k % 3],
                "--i": k,
              }}
              className={p === k ? "is-on" : ""}
            >
              <HmLink
                to={`/portals/${r.slug}`}
                className="hm-pcard"
                onMouseMove={tilt}
                onMouseLeave={untilt}
                onMouseEnter={() => setP(k)}
                onFocus={() => setP(k)}
              >
                <span className="hm-pcard__logo">
                  <PanelMark p={r} size="md" />
                </span>
                <span className="hm-pcard__aud">{r.audience}</span>
                <b className="hm-pcard__tag">{r.tagline}</b>
                <span className="hm-pcard__chips">
                  {(r.audiences || [])
                    .filter((a) => !/\d/.test(a))
                    .slice(0, 4)
                    .map((a) => (
                      <em key={a}>{a}</em>
                    ))}
                </span>
                <span className="hm-pcard__go">
                  {"Explore "}
                  {r.name}
                  {" \u2192"}
                </span>
              </HmLink>
            </li>
          ))}
        </ul>
        {P && P.steps && (
          <div
            className="hm-journey"
            style={{
              "--c": col[p % 3],
            }}
            key={P.slug}
          >
            <span className="hm-journey__label">
              {"How members take part in "}
              {P.name}
            </span>
            <ol>
              {P.steps.slice(0, 5).map((s, k) => (
                <li
                  key={s.t}
                  style={{
                    "--k": k,
                  }}
                >
                  <span>{k + 1}</span>
                  <b>{s.t}</b>
                </li>
              ))}
            </ol>
          </div>
        )}
      </div>
    </section>
  );
}
const HM_WHY_IC = ["search", "layers", "target", "trend", "cpu", "users"];
function HM_Why() {
  const [ref, v] = RC_useInView(0.25);
  const [one, setOne] = ee.useState(false);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || hmReduce()) {
      if (hmReduce()) setOne(true);
      return;
    }
    const id = setInterval(() => setOne((x) => !x), 3200);
    return () => clearInterval(id);
  }, [v, hold]);
  const ag = VERTICALS.map((a) => ({
    a,
    c: hmV(a.slug),
  }));
  const pos = [
    [20, 24],
    [80, 22],
    [22, 78],
    [78, 80],
  ];
  return (
    <section ref={ref} className={"section hm-why" + (v ? " is-in" : "")} aria-labelledby="why-title">
      <div className="container">
        <div className="hm-why__grid">
          <div>
            <HM_Head
              id="why-title"
              k="Why us"
              t="Why choose Frequent Research?"
              i="Businesses often hire separate agencies for research, marketing, technology and finance. We bring them together."
              light
            />
            <div className="hm-toggle" role="group" aria-label="Compare" onMouseEnter={() => setHold(true)}>
              <button
                className={!one ? "is-on" : ""}
                onClick={() => {
                  setHold(true);
                  setOne(false);
                }}
              >
                4 separate agencies
              </button>
              <button
                className={one ? "is-on" : ""}
                onClick={() => {
                  setHold(true);
                  setOne(true);
                }}
              >
                One partner
              </button>
              <i
                style={{
                  translate: one ? "100% 0" : "0 0",
                }}
              />
            </div>
            <ul className="hm-cmp">
              {(one
                ? ["One brief, one plan", "Shared data across teams", "One point of contact"]
                : ["Four briefs, four plans", "Data lost between agencies", "Four sets of contacts"]
              ).map((x, k) => (
                <li
                  key={x + one}
                  className={one ? "good" : "bad"}
                  style={{
                    "--k": k,
                  }}
                >
                  <RC_I n={one ? "check" : "userx"} s={16} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className={"hm-silo" + (one ? " is-one" : "")} aria-hidden="true">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none">
              {ag.map((g, k) =>
                ag
                  .slice(k + 1)
                  .map((h, m) => (
                    <line
                      key={k + "-" + m}
                      x1={pos[k][0]}
                      y1={pos[k][1]}
                      x2={pos[k + 1 + m][0]}
                      y2={pos[k + 1 + m][1]}
                      className="hm-silo__l"
                    />
                  )),
              )}
            </svg>
            <div className="hm-silo__core">One partner</div>
            {ag.map(({ a, c }, k) => (
              <div
                key={a.slug}
                className="hm-silo__n"
                style={{
                  "--x": pos[k][0] + "%",
                  "--y": pos[k][1] + "%",
                  "--x1": ["50%", "88%", "12%", "50%"][k],
                  "--y1": ["9%", "50%", "50%", "91%"][k],
                  "--c": c.c,
                  "--lt": c.lt,
                  "--k": k,
                }}
              >
                <RC_I n={c.ic} s={22} />
                <b>{c.short}</b>
              </div>
            ))}
          </div>
        </div>
        <ul className="hm-reasons">
          {HOME_VALUES.map((r, k) => (
            <li
              key={r.t}
              style={{
                "--k": k,
              }}
            >
              <span className="hm-reasons__ic">
                <RC_I n={HM_WHY_IC[k] || "check"} s={22} />
              </span>
              <span className="hm-reasons__n">{String(k + 1).padStart(2, "0")}</span>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
function HM_Sphere({ items }) {
  const L = Link;
  const press = ee.useRef(null);
  const wrap = ee.useRef(null),
    nodes = ee.useRef([]);
  const st = ee.useRef({
    ax: 0.25,
    ay: 0,
    vx: 0.0016,
    vy: 0.0042,
    hover: false,
    drag: null,
    vis: false /* build 74: starts turning when it comes into view (IntersectionObserver below) */,
  });
  const pts = ee.useMemo(() => {
    const n = items.length,
      g = Math.PI * (3 - Math.sqrt(5));
    return items.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2,
        r = Math.sqrt(1 - y * y),
        t = g * i;
      return [Math.cos(t) * r, y, Math.sin(t) * r];
    });
  }, [items.length]);
  ee.useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const rm = hmReduce();
    let raf;
    const draw = () => {
      const s = st.current,
        R = el.clientWidth * (el.clientWidth < 480 ? 0.36 : 0.43);
      const cx = Math.cos(s.ax),
        sx = Math.sin(s.ax),
        cy = Math.cos(s.ay),
        sy = Math.sin(s.ay);
      pts.forEach(([x, y, z], i) => {
        const x1 = x * cy + z * sy,
          z1 = -x * sy + z * cy;
        const y2 = y * cx - z1 * sx,
          z2 = y * sx + z1 * cx;
        const k = (z2 + 1.6) / 2.6,
          node = nodes.current[i];
        if (!node) return;
        node.style.transform = `translate3d(${(x1 * R).toFixed(1)}px,${(y2 * R).toFixed(1)}px,0) translate(-50%,-50%) scale(${(0.55 + k * 0.6).toFixed(3)})`;
        node.style.opacity = (0.25 + k * 0.75).toFixed(2);
        node.style.zIndex = Math.round(k * 100);
        node.classList.toggle("is-back", z2 < -0.2);
        node.classList.toggle("is-mid", z2 < 0.35);
      });
    };
    const loop = () => {
      const s = st.current;
      if (!s.vis || document.hidden) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
      s.f = (s.f || 0) + 1;
      if (s.f % 2) return;
      if (!s.hover && !s.drag) {
        s.ay += s.vy * 2;
        s.ax += Math.sin(s.ay * 0.7) * 0.0016;
        draw();
      } else if (s.drag) draw();
    };
    draw();
    if (!rm && typeof IntersectionObserver === "undefined") (st.current.vis = true), (raf = requestAnimationFrame(loop));
    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(([e]) => {
            st.current.vis = e.isIntersecting;
            if (e.isIntersecting && !raf && !rm) raf = requestAnimationFrame(loop);
          })
        : null;
    if (io) io.observe(el);
    const down = (e) => {
      st.current.drag = [e.clientX, e.clientY, st.current.ax, st.current.ay];
      if (el.setPointerCapture) el.setPointerCapture(e.pointerId);
    };
    const move = (e) => {
      const d = st.current.drag;
      if (!d) return;
      st.current.ay = d[3] + (e.clientX - d[0]) * 0.008;
      st.current.ax = d[2] + (e.clientY - d[1]) * 0.008;
      if (rm) draw();
    };
    const up = () => {
      st.current.drag = null;
    };
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    return () => {
      cancelAnimationFrame(raf);
      if (io) io.disconnect();
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
    };
  }, [pts]);
  return (
    <div
      className="hm-sphere"
      ref={wrap}
      onMouseEnter={() => {
        st.current.hover = true;
      }}
      onMouseLeave={() => {
        st.current.hover = false;
      }}
    >
      <div className="hm-sphere__core" aria-hidden="true">
        <b>{items.length}</b>
        <span>industries</span>
      </div>
      <div className="hm-sphere__ring" aria-hidden="true" />
      {/* build 74: the turning industries are a picture you can click (each one opens its industry page); they are
          not separate links, because moving and overlapping they cannot be proper tap targets. The same industries
          are listed as ordinary links just below, for keyboards, screen readers and search engines. */}
      {items.map((r, i) => (
        <span
          key={r.slug}
          className="hm-sphere__n"
          aria-hidden="true"
          ref={(n) => {
            nodes.current[i] = n;
          }}
          style={{
            "--c": inG(r.group).c,
            "--lt": inG(r.group).lt,
          }}
          onPointerDown={(e) => {
            press.current = [e.clientX, e.clientY];
          }}
          onClick={(e) => {
            const p = press.current;
            if (p && Math.abs(e.clientX - p[0]) + Math.abs(e.clientY - p[1]) > 8) return;
            navGo(`/industries-case-studies/${r.slug}`);
          }}
        >
          <IndustryIcon name={r.icon} size={16} />
          <span>{r.name}</span>
        </span>
      ))}
      <ul className="pp-sr">
        {items.map((r) => (
          <li key={r.slug}>
            <L to={`/industries-case-studies/${r.slug}`}>{r.name}</L>
          </li>
        ))}
      </ul>
    </div>
  );
}
function HM_Industries() {
  const [ref, v] = RC_useInView(0.15);
  const all = inUseAllCases();
  /* build 74: the world map's shapes load on their own, after the first screen (same 1000 x 500 frame meanwhile) */
  const RG_MAP = useLazy("region-map", () => import("../data/mapRegions.jsx").then((m) => m.RG_MAP)) || { w: 1000, h: 500, base: [], pts: {} };
  const feat = SERVICE_INDUSTRIES.map(findIndustry).filter(Boolean);
  const rowA = feat.slice(0, 8),
    rowB = feat.slice(8);
  const pins = ["us", "ca", "gb", "de", "fr", "ae", "sa", "in", "sg", "jp", "au", "za", "br", "mx", "kr", "id"];
  return (
    <section ref={ref} className={"section hm-ind" + (v ? " is-in" : "")} aria-labelledby="ind-title">
      <div className="container hm-ind__grid">
        <div className="hm-ind__copy">
          <HM_Head
            id="ind-title"
            k="Sectors"
            t="Industries we serve"
            i="Our teams support organisations across a wide range of sectors."
          />
          <ul className="hm-ind__stats">
            <li>
              <b>
                <IN_Count to={INDUSTRIES.length} run={v} />
              </b>
              <span>industries</span>
            </li>
            <li>
              <b>
                <IN_Count to={INDUSTRY_GROUPS.length} run={v} />
              </b>
              <span>sector groups</span>
            </li>
            <li>
              <b>
                <IN_Count to={all ? all.length : null} run={v} />
              </b>
              <span>case studies</span>
            </li>
            <li>
              <b>
                <IN_Count to={typeof RG_TOTAL !== "undefined" ? RG_TOTAL : 55} run={v} />
              </b>
              <span>countries</span>
            </li>
          </ul>
          <div className="hm-ind__map" aria-hidden="true">
            <svg viewBox={`0 0 ${RG_MAP.w} ${RG_MAP.h}`}>
              {RG_MAP.base.map((b, i) => (
                <path key={i} d={b.d} className={b.r ? "on" : ""} />
              ))}
            </svg>
            {pins.map((c, i) => {
              const p = RG_MAP.pts[c];
              return p ? (
                <span
                  key={c}
                  className="hm-ind__pin"
                  style={{
                    left: (p[0] / RG_MAP.w) * 100 + "%",
                    top: (p[1] / RG_MAP.h) * 100 + "%",
                    "--d": i * 0.25 + "s",
                  }}
                >
                  <RG_Flag c={c} size="xs" />
                </span>
              ) : null;
            })}
            <em>
              {"Sector expertise across "}
              {typeof RG_TOTAL !== "undefined" ? RG_TOTAL : 55}
              {" countries"}
            </em>
          </div>
          <div className="hm-ind__ctas">
            <HmLink to="/industries-case-studies" className="btn btn--primary btn--lg">
              Explore industries & case studies
            </HmLink>
            <span className="hm-ind__hint">
              <RC_I n="refresh" s={14} />
              Drag the sphere to explore
            </span>
          </div>
        </div>
        <HM_Sphere items={INDUSTRIES} />
      </div>
      <div className="hm-marq" aria-label="Featured industries">
        {[rowA, rowB].map((row, k) => (
          <div key={k} className={"hm-marq__row" + (k ? " hm-marq__row--rev" : "")}>
            <div className="hm-marq__track">
              {[0, 1].map((rep) => (
                <span key={rep} className="hm-marq__set" aria-hidden={rep === 1}>
                  {row.map((r) => (
                    <HmLink
                      key={r.slug + rep}
                      to={`/industries-case-studies/${r.slug}`}
                      className="hm-marq__pill"
                      style={{
                        "--c": inG(r.group).c,
                      }}
                      tabIndex={rep ? -1 : 0}
                    >
                      <IndustryIcon name={r.icon} size={18} />
                      {r.name}
                    </HmLink>
                  ))}
                  {k === 1 && (
                    <HmLink
                      to="/industries-case-studies"
                      className="hm-marq__pill hm-marq__pill--more"
                      tabIndex={rep ? -1 : 0}
                    >
                      +{INDUSTRIES.length - SERVICE_INDUSTRIES.length}
                      {" more"}
                    </HmLink>
                  )}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
const HH_CH = [
  {
    t: "Request a Consultation",
    need: "Not sure where to start",
    to: "/lets-talk?type=quote",
    ic: "msg",
    c: "#FFFFFF",
    lt: "#FFFFFF",
  },
  {
    t: "Request Research Feasibility",
    need: "Understand your market",
    to: "/lets-talk?type=feasibility",
    ic: "search",
    s: "market-research",
  },
  {
    t: "Digital Marketing Consultation",
    need: "Reach new customers and improve your online visibility",
    to: "/lets-talk?type=digital",
    ic: "trend",
    s: "digital-marketing",
  },
  {
    t: "Discuss an IT Project",
    need: "Develop technology",
    to: "/lets-talk?type=it",
    ic: "cpu",
    s: "it-development",
  },
  {
    t: "Talk to a Finance Expert",
    need: "Strengthen your finances",
    to: "/lets-talk?type=finance",
    ic: "pie",
    s: "accounts-finance",
  },
];
function HH_Final() {
  const [ref, v] = RC_useInView(0.25);
  const [k, setK] = ee.useState(1);
  const [hold, setHold] = ee.useState(false);
  const [typed, setTyped] = ee.useState("");
  const phrases = HH_CH.slice(1).map((c) => c.need.charAt(0).toLowerCase() + c.need.slice(1));
  const [pi, setPi] = ee.useState(0);
  ee.useEffect(() => {
    if (!v) return;
    if (hhReduce()) {
      setTyped(phrases[0]);
      return;
    }
    let n = 0,
      dir = 1,
      t;
    const full = phrases[pi];
    const tick = () => {
      n += dir;
      setTyped(full.slice(0, n));
      if (dir === 1 && n === full.length) {
        dir = -1;
        t = setTimeout(tick, 1600);
        return;
      }
      if (dir === -1 && n === 0) {
        setPi((x) => (x + 1) % phrases.length);
        return;
      }
      t = setTimeout(tick, dir === 1 ? 45 : 18);
    };
    t = setTimeout(tick, 300);
    return () => clearTimeout(t);
  }, [v, pi]);
  ee.useEffect(() => {
    if (!hold) setK(pi + 1);
  }, [pi, hold]);
  return (
    <section ref={ref} className={"hh-final" + (v ? " is-in" : "")} aria-labelledby="hh-final">
      <div className="hh-final__bg" aria-hidden="true">
        <div className="hh-final__beam" />
        <div className="hh-final__beam hh-final__beam--2" />
      </div>
      <div className="container hh-final__in">
        <div className="hh-final__copy">
          <span
            className="hm-kicker"
            style={{
              color: "#6EE0CE",
            }}
          >
            Let's talk
          </span>
          <h2 id="hh-final">Have a business challenge?</h2>
          <div className="hh-type" aria-hidden="true">
            <span className="hh-type__label">I need to…</span>
            <b>{typed}</b>
            <i />
          </div>
          <p className="sr-only">
            Whether you need to understand your market, reach new customers, develop technology, improve your online
            visibility or strengthen your finances, our team is ready to listen.
          </p>
          <p className="hh-final__sub">Our team is ready to listen. Tell us what you're trying to achieve.</p>
        </div>
        <ul className="hh-doors" onMouseLeave={() => setHold(false)}>
          {HH_CH.map((c, n) => {
            const v2 = c.s
              ? hmV(c.s)
              : {
                  c: "#1E5BFF",
                  lt: "#FFFFFF",
                };
            return (
              <li
                key={c.t}
                style={{
                  "--c": v2.c,
                  "--lt": v2.lt,
                  "--n": n,
                }}
                className={(k === n ? "is-on " : "") + (n === 0 ? "hh-door--main" : "")}
              >
                <HhLink
                  to={c.to}
                  className="hh-door"
                  onMouseEnter={() => {
                    setHold(true);
                    setK(n);
                  }}
                  onFocus={() => {
                    setHold(true);
                    setK(n);
                  }}
                >
                  <span className="hh-door__ic">
                    <RC_I n={c.ic} s={22} />
                  </span>
                  <span className="hh-door__need">{c.need}</span>
                  <b>{c.t}</b>
                  <span className="hh-door__go" aria-hidden="true">
                    →
                  </span>
                </HhLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
const CA_DESC = {
  "ISO 20252:2019": "The international standard for how research is planned, fielded, processed and reported.",
  "ISO 9001:2015": "Documented, audited processes that keep quality consistent across every service.",
  "ISO/IEC 27001:2013": "Information-security controls that protect client, respondent and project data.",
};
const CA_SHORT = {
  "ISO 20252:2019": "Market, Opinion & Social Research",
  "ISO 9001:2015": "Quality Management",
  "ISO/IEC 27001:2013": "Information Security Management",
};
/* build 82.3: redesigned (design82/Ca82.jsx) */
function CA_Section() {
  return <CA82_Section />;
}
const IE_STEPS = [
  ["help", "Understand", "Understand the business question, objectives and research requirements.", "Insight"],
  ["sliders", "Design", "Build the appropriate research methodology, audience and approach.", "Research"],
  ["users", "Reach", "Connect with the right respondents through global panel and fieldwork capabilities.", "Research"],
  ["database", "Collect", "Execute high-quality data collection through appropriate methodologies.", "Data"],
  ["shield", "Validate", "Apply quality control, verification and data validation processes.", "Validation"],
  ["bars", "Analyse", "Transform research data into meaningful findings.", "Analysis"],
  ["rocket", "Deliver", "Provide actionable outputs that support business decisions.", "Execution"],
];
function IE_Section() {
  const ref = ee.useRef(null);
  const pathRef = ee.useRef(null);
  const [p, setP] = ee.useState(0);
  const [hov, setHov] = ee.useState(-1);
  const [pt, setPt] = ee.useState([60, 150]);
  const W = 1100,
    H = 260;
  const xs = IE_STEPS.map((_, i) => 60 + i * ((W - 120) / 6));
  const ys = xs.map((_, i) => (i % 2 ? 190 : 90));
  const d = xs.reduce(
    (acc, x, i) =>
      i ? acc + ` C ${xs[i - 1] + 70} ${ys[i - 1]}, ${x - 70} ${ys[i]}, ${x} ${ys[i]}` : `M ${x} ${ys[0]}`,
    "",
  );
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect(),
          vh = window.innerHeight;
        const v = reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.75 - r.top) / (r.height * 0.85)));
        setP(v);
        const path = pathRef.current;
        if (path && path.getTotalLength) {
          const L = path.getTotalLength();
          const q = path.getPointAtLength(L * v);
          setPt([q.x, q.y]);
        }
      });
    };
    on();
    window.addEventListener("scroll", on, {
      passive: true,
    });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  const reached = (i) => p >= i / 6 - 0.02;
  const cur = hov >= 0 ? hov : Math.min(6, Math.floor(p * 6.999));
  const phases = ["Insight", "Research", "Data", "Validation", "Analysis", "Execution"];
  return (
    <section ref={ref} className="ie section" aria-labelledby="ie-title">
      <div className="ie__bg" aria-hidden="true" />
      <div className="container">
        <div className="ie__head">
          <span className="ie__k">How we work with you</span>
          <h2 id="ie-title">From Insight to Execution</h2>
          <p>
            {"A successful business journey doesn't happen in one step. "}
            <em>We stay with you through each one.</em>
          </p>
        </div>
        <ol className="ie__phases" aria-label="Journey phases">
          {phases.map((t, i) => (
            <li key={t} className={p >= i / 5 - 0.05 ? "is-on" : ""}>
              {t}
            </li>
          ))}
        </ol>
        <div className="ie__stage">
          <div className="ie__layer ie__layer--1" aria-hidden="true" />
          <div className="ie__layer ie__layer--2" aria-hidden="true" />
          <div className="ie__board">
            <svg className="ie__svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
              <defs>
                {ee.createElement(
                  "linearGradient",
                  {
                    id: "ieGrad",
                    x1: "0",
                    x2: "1",
                  },
                  <stop offset="0" stopColor="#1E6BFF" />,
                  <stop offset=".55" stopColor="#12A3A3" />,
                  <stop offset="1" stopColor="#E3A013" />,
                )}
                {ee.createElement(
                  "radialGradient",
                  {
                    id: "ieGlow",
                  },
                  <stop offset="0" stopColor="#fff" stopOpacity=".95" />,
                  <stop offset=".4" stopColor="#7FE0DA" stopOpacity=".55" />,
                  <stop offset="1" stopColor="#7FE0DA" stopOpacity="0" />,
                )}
              </defs>
              <path d={d} className="ie__track" />
              <path
                ref={pathRef}
                d={d}
                className="ie__prog"
                pathLength="1"
                style={{
                  strokeDashoffset: 1 - p,
                }}
              />
              <circle cx={pt[0]} cy={pt[1]} r="26" fill="url(#ieGlow)" />
              <circle cx={pt[0]} cy={pt[1]} r="5" className="ie__pt" />
            </svg>
            <ol className="ie__nodes">
              {IE_STEPS.map(([ic, t, desc], i) => (
                <li
                  key={t}
                  className={
                    "ie__node" + (reached(i) ? " is-on" : "") + (cur === i ? " is-cur" : "") + (i % 2 ? " is-low" : "")
                  }
                  style={{
                    left: (xs[i] / W) * 100 + "%",
                    top: (ys[i] / H) * 100 + "%",
                  }}
                  tabIndex="0"
                  onMouseEnter={() => setHov(i)}
                  onMouseLeave={() => setHov(-1)}
                  onFocus={() => setHov(i)}
                  onBlur={() => setHov(-1)}
                >
                  <span className="ie__dot">
                    <RC_I n={ic} s={18} />
                  </span>
                  <span className="ie__lbl">
                    <b>0{i + 1}</b>
                    {t}
                  </span>
                </li>
              ))}
            </ol>
          </div>
          <div className="ie__detail" key={cur} aria-live="polite">
            <span className="ie__dn">0{cur + 1}</span>
            <div>
              <strong>{IE_STEPS[cur][1]}</strong>
              <p>{IE_STEPS[cur][2]}</p>
            </div>
            <span className="ie__phase">{IE_STEPS[cur][3]}</span>
          </div>
        </div>
        <ol className="ie__mob">
          {IE_STEPS.map(([ic, t, desc], i) => (
            <li key={t} className={reached(i) ? "is-on" : ""}>
              <span className="ie__dot">
                <RC_I n={ic} s={16} />
              </span>
              <div>
                <strong>
                  0{i + 1}
                  {" \xB7 "}
                  {t}
                </strong>
                <p>{desc}</p>
              </div>
            </li>
          ))}
        </ol>
        <div className="center ie__cta">
          <Link to="/lets-talk?type=quote" className="btn btn--primary btn--lg">
            Start Your Project
          </Link>
        </div>
      </div>
    </section>
  );
}

export { HomePage };
