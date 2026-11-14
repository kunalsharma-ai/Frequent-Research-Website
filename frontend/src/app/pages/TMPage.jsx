import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { RG_FLAGS } from '../data/maps.jsx';
import { RG_MAP } from '../data/mapRegions.jsx';
import { CONTACT } from '../data/site.jsx';
import { findVertical } from '../data/products.jsx';
import { CtaSection } from '../shared/CoreParts.jsx';
import { SOC_LINKS } from '../shared/Social.jsx';
import { RC_I, RC_useInView } from '../shared/Reveal.jsx';
import { HM_Head, HmLink, hmReduce, hmV } from '../shared/HomeShared.jsx';
import { RG_REGIONS, RG_TOTAL } from '../shared/Regions.jsx';
import { ABH_BgSilk } from '../shared/About.jsx';
import { LDR_Section } from './OurTeamPage.jsx';
import { TM_IMG, TM_PEOPLE } from './GALPage.jsx';
import { usePageMeta } from '../SiteApp.jsx';

const OT_DISC = [
  ["Researchers", "market-research"],
  ["Marketers", "digital-marketing"],
  ["Engineers", "it-development"],
  ["Finance specialists", "accounts-finance"],
];
const OT_WAYS = [
  [
    "One point of contact",
    "A single project lead coordinates every team involved, so you never repeat yourself.",
    "user",
  ],
  [
    "Shared research base",
    "Marketing, technology and finance decisions all draw on the same customer and market understanding.",
    "database",
  ],
  ["Quality reviews", "Work is checked by a second specialist before it reaches you.", "check"],
  ["Continuous learning", "Regular training keeps our people current with tools, platforms and regulations.", "bulb"],
  ["Stable teams", "We keep the same people on your account, so they truly know your business.", "users"],
];
function OT_Ways() {
  const [ref, v] = RC_useInView(0.2);
  const [k, setK] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || hmReduce()) return;
    const t = setInterval(() => setK((x) => (x + 1) % OT_WAYS.length), 3200);
    return () => clearInterval(t);
  }, [v, hold]);
  return (
    <section ref={ref} className={"section ot-ways" + (v ? " is-in" : "")} aria-labelledby="ot-ways">
      <div className="container">
        <HM_Head
          id="ot-ways"
          k="How we work"
          t="How our teams work together"
          i="One project lead, four specialist teams and a second pair of eyes on everything we deliver."
          center
        />
        <div className="ot-flow" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="ot-flow__node ot-flow__node--you">
            <RC_I n="target" s={22} />
            <b>Your brief</b>
          </div>
          <i className="ot-flow__link" aria-hidden="true">
            <b />
          </i>
          <div className="ot-flow__node ot-flow__node--lead">
            <RC_I n="user" s={22} />
            <b>Project lead</b>
            <small>one point of contact</small>
          </div>
          <i className="ot-flow__link" aria-hidden="true">
            <b />
          </i>
          <div className="ot-flow__teams">
            {OT_DISC.map(([t, slug], i) => {
              const c = hmV(slug);
              return (
                <span
                  key={t}
                  style={{
                    "--c": c.c,
                    "--lt": c.lt,
                    "--i": i,
                  }}
                >
                  <RC_I n={c.ic} s={16} />
                  {findVertical(slug).name}
                </span>
              );
            })}
            <em>Shared research base</em>
          </div>
          <i className="ot-flow__link" aria-hidden="true">
            <b />
          </i>
          <div className="ot-flow__node ot-flow__node--qa">
            <RC_I n="check" s={22} />
            <b>Second-specialist review</b>
          </div>
          <i className="ot-flow__link" aria-hidden="true">
            <b />
          </i>
          <div className="ot-flow__node ot-flow__node--out">
            <RC_I n="award" s={22} />
            <b>Delivered to you</b>
          </div>
        </div>
        <ul className="ot-cards" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          {OT_WAYS.map(([t, d, ic], i) => (
            <li
              key={t}
              className={k === i ? "is-on" : ""}
              style={{
                "--i": i,
              }}
              onMouseEnter={() => setK(i)}
            >
              <span className="ot-cards__ic">
                <RC_I n={ic} s={22} />
              </span>
              <span className="ot-cards__n">{String(i + 1).padStart(2, "0")}</span>
              <h3>{t}</h3>
              <p>{d}</p>
              <i className="ot-cards__bar" aria-hidden="true" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
const TM_TEAMS = [
  {
    k: "lead",
    t: "Leadership",
    ic: "compass",
    c: "#C99A2E",
    lt: "#F0D98F",
  },
  {
    k: "sales",
    t: "Sales & Bidding",
    ic: "trend",
    c: "#1E5BFF",
    lt: "#8FB0FF",
  },
  {
    k: "pm",
    t: "Project Management",
    ic: "clipboard",
    c: "#0E9C88",
    lt: "#6EE0CE",
  },
  {
    k: "supply",
    t: "Panel Supply",
    ic: "users",
    c: "#0B22A8",
    lt: "#6F8BFF",
  },
  {
    k: "tech",
    t: "Technology & AI",
    ic: "cpu",
    c: "#2E6BE6",
    lt: "#9CC2FF",
  },
  {
    k: "mkt",
    t: "Digital Marketing",
    ic: "megaphone",
    c: "#1A9FB5",
    lt: "#8FE3F0",
  },
  {
    k: "fin",
    t: "Finance & Accounts",
    ic: "scale",
    c: "#0A6E61",
    lt: "#5FD3BE",
  },
];
const TM_T = Object.fromEntries(TM_TEAMS.map((t) => [t.k, t]));
const TM_BY = Object.fromEntries(TM_TEAMS.map((t) => [t.k, TM_PEOPLE.filter((p) => p.team === t.k)]));
const TM_VIDS = TM_PEOPLE.filter((p) => p.video);
const tmImg = (p) => TM_IMG[p.id];
const tmFirst = (p) => p.name.split(" ")[0];
const tmReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const tmSoc = (k) => (SOC_LINKS.find((s) => s.k === k) || {}).p;
const tmGo = (id) => (e) => {
  if (e) e.preventDefault();
  const el = document.getElementById(id);
  if (el)
    el.scrollIntoView({
      behavior: tmReduce() ? "auto" : "smooth",
      block: "start",
    });
};
function TM_Ico({ k, s = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" focusable="false" fill="currentColor">
      <path d={tmSoc(k)} />
    </svg>
  );
}
function TM_Mail({ s = 16 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={s}
      height={s}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}
function TM_Play({ s = 16 }) {
  return (
    <svg viewBox="0 0 24 24" width={s} height={s} aria-hidden="true" fill="currentColor">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  );
}
function TM_Video({ p, onClose }) {
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    const k = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", k);
    const o = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (ref.current) ref.current.focus();
    return () => {
      document.removeEventListener("keydown", k);
      document.body.style.overflow = o;
    };
  }, []);
  const t = TM_T[p.team];
  return (
    <div
      className="tm-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${p.name} introduction video`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="tm-modal__box"
        style={{
          "--c": t.c,
          "--lt": t.lt,
        }}
      >
        <header>
          <img src={tmImg(p)} alt="" width="48" height="48" />
          <div>
            <b>{p.name}</b>
            <span>{p.role}</span>
          </div>
          <button type="button" ref={ref} onClick={onClose} aria-label="Close video">
            ×
          </button>
        </header>
        <div className="tm-modal__vid">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${p.video.yt}?autoplay=1&rel=0&modestbranding=1`}
            title={`${p.name} \u2013 introduction`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
        <footer>
          <a href={`https://youtu.be/${p.video.yt}`} target="_blank" rel="noopener noreferrer">
            <TM_Ico k="youtube" s={16} />
            {" Open on YouTube"}
          </a>
        </footer>
      </div>
    </div>
  );
}
function TM_VideoBtn({ p, onPlay, cls = "", label }) {
  if (!p.video) return null;
  if (p.video.yt)
    return (
      <button
        type="button"
        className={"tm-vbtn " + cls}
        onClick={() => onPlay(p)}
        aria-label={`Play ${p.name}'s introduction video`}
      >
        <TM_Play s={14} />
        {label || "Intro video"}
      </button>
    );
  return (
    <a
      className={"tm-vbtn tm-vbtn--li " + cls}
      href={p.video.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${p.name}'s introduction on LinkedIn (opens in a new tab)`}
    >
      <TM_Ico k="linkedin" s={13} />
      {label || "Intro video"}
    </a>
  );
}
function TM_Stage({ v }) {
  const COLS = 4;
  const cols = Array.from(
    {
      length: COLS,
    },
    (_, c) => TM_PEOPLE.filter((_2, i) => i % COLS === c),
  );
  const [k, setK] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || tmReduce()) return;
    const t2 = setInterval(() => setK((x) => (x + 1) % TM_PEOPLE.length), 2800);
    return () => clearInterval(t2);
  }, [v, hold]);
  const p = TM_PEOPLE[k],
    t = TM_T[p.team];
  return (
    <div
      className={"tm-wall" + (v ? " is-in" : "")}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div className="tm-wall__tilt" aria-hidden="true">
        {cols.map((list, c) => (
          <div
            key={c}
            className={"tm-wall__col tm-wall__col--" + c}
            style={{
              "--dur": 34 + c * 6 + "s",
            }}
          >
            <div className="tm-wall__track">
              {list.concat(list).map((q, i) => {
                const tt = TM_T[q.team];
                return (
                  <figure
                    key={q.id + i}
                    className={"tm-wall__tile" + (q === p ? " is-on" : "")}
                    style={{
                      "--c": tt.c,
                      "--lt": tt.lt,
                    }}
                  >
                    <img src={tmImg(q)} alt="" width="180" height="180" loading="lazy" decoding="async" />
                    <figcaption>{tmFirst(q)}</figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      <div
        className="tm-wall__spot"
        key={p.id}
        style={{
          "--c": t.c,
          "--lt": t.lt,
        }}
        aria-live="polite"
      >
        <span className="tm-wall__ph">
          <img src={tmImg(p)} alt="" width="64" height="64" />
        </span>
        <span className="tm-wall__tx">
          <small>Say hello to</small>
          <b>{p.name}</b>
          <em>{p.role}</em>
        </span>
        <span className="tm-wall__tag">
          <RC_I n={t.ic} s={13} />
          {t.t}
        </span>
      </div>
      <div className="tm-wall__dots" aria-hidden="true">
        {TM_TEAMS.map((x) => (
          <i
            key={x.k}
            className={x.k === p.team ? "is-on" : ""}
            style={{
              "--c": x.lt,
            }}
          />
        ))}
      </div>
    </div>
  );
}
function TM_Hero() {
  const [ref, v] = RC_useInView(0.1);
  const n = TM_PEOPLE.length;
  const stats = [
    [n, "team members", "users"],
    [TM_TEAMS.length, "teams", "layers"],
    [TM_VIDS.length, "intro videos", "megaphone"],
  ];
  return (
    <section ref={ref} className={"page-hero tone-ink tm-hero" + (v ? " is-in" : "")}>
      <div className="tm-hero__bg" aria-hidden="true">
        <ABH_BgSilk />
        <span className="tmx-aur tmx-aur--1" />
        <span className="tmx-aur tmx-aur--2" />
        <span className="tmx-aur tmx-aur--3" />
        <span className="tmx-beam" />
        <span className="tmx-floor">
          <i />
        </span>
        <svg className="tmx-rings" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="290" />
          <circle cx="300" cy="300" r="225" />
          <circle cx="300" cy="300" r="160" />
        </svg>
        {TM_TEAMS.concat(TM_TEAMS, TM_TEAMS).map((t, i) => (
          <span
            key={i}
            className="tmx-spark"
            style={{
              "--c": t.lt,
              left: ((i * 37 + 11) % 100) + "%",
              "--d": ((i * 0.83) % 9) + "s",
              "--s": 6 + (i % 4) * 2 + "px",
              "--t": 11 + (i % 5) * 2.5 + "s",
            }}
          />
        ))}
      </div>
      <div className="container tm-hero__grid">
        <div className="tm-hero__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span>
              <Link to="/about-us">About Us</Link>
            </span>
            <span>
              <span aria-current="page">Our Team</span>
            </span>
          </nav>
          <span className="tm-kick">
            <span className="tm-kick__dot" />
            The people behind your results
          </span>
          <HeroH1>Meet our Team</HeroH1>
          <p className="page-hero__intro">
            Leadership, sales, project management, panel supply, technology, marketing and finance, working side by side
            on every project.
          </p>
          <ul className="tm-stats">
            {stats.map(([b, s, ic], i) => (
              <li
                key={s}
                style={{
                  "--i": i,
                }}
              >
                <span className="tm-stats__ic">
                  <RC_I n={ic} s={18} />
                </span>
                <b>{b}</b>
                <small>{s}</small>
              </li>
            ))}
            <li
              className="tm-stats__hq"
              style={{
                "--i": 3,
              }}
            >
              <img src={RG_FLAGS.in} alt="" width="28" height="21" />
              <b>New Delhi</b>
              <small>India · head office</small>
            </li>
          </ul>
          <div className="tm-hero__cta">
            <a href="#tm-people" className="btn btn--primary btn--lg" onClick={tmGo("tm-people")}>
              {"Meet everyone "}
              <span aria-hidden="true">↓</span>
            </a>
            <a href="#tm-videos" className="btn btn--ghost btn--lg tm-ghost" onClick={tmGo("tm-videos")}>
              <TM_Play s={16} />
              {" Watch introductions"}
            </a>
          </div>
        </div>
        <TM_Stage v={v} />
      </div>
    </section>
  );
}
function TM_Org({ pick }) {
  const [ref, v] = RC_useInView(0.15);
  const [hov, setHov] = ee.useState(null);
  const teams = TM_TEAMS.filter((t) => t.k !== "lead");
  const total = TM_PEOPLE.length;
  let acc = 0;
  const R = 70,
    C = 2 * Math.PI * R;
  const arcs = TM_TEAMS.map((t) => {
    const n = TM_BY[t.k].length;
    const a = {
      t,
      n,
      off: acc,
      len: (n / total) * C,
    };
    acc += a.len;
    return a;
  });
  const on = hov ? TM_T[hov] : null;
  return (
    <section ref={ref} className={"section tm-org" + (v ? " is-in" : "")} aria-labelledby="tm-org-h">
      <div className="container">
        <HM_Head
          id="tm-org-h"
          k="How we're organised"
          t="Seven teams, one way of working"
          i="Our directors lead six specialist teams. Select a team to meet its people."
          center
        />
        <div className="tm-org__grid">
          <div className="tm-tree">
            <button
              type="button"
              className="tm-node tm-node--lead"
              style={{
                "--c": TM_T.lead.c,
                "--lt": TM_T.lead.lt,
              }}
              onClick={() => pick("lead")}
              onMouseEnter={() => setHov("lead")}
              onMouseLeave={() => setHov(null)}
            >
              <span className="tm-node__ic">
                <RC_I n="compass" s={20} />
              </span>
              <span className="tm-node__t">
                <b>Leadership</b>
                <small>
                  {TM_BY.lead.length}
                  {" directors"}
                </small>
              </span>
              <span className="tm-faces">
                {TM_BY.lead.map((p) => (
                  <img key={p.id} src={tmImg(p)} alt="" width="40" height="40" />
                ))}
              </span>
            </button>
            <svg className="tm-tree__wires" viewBox="0 0 600 90" preserveAspectRatio="none" aria-hidden="true">
              {teams.map((t, i) => {
                const x = 50 + i * 100;
                return (
                  <path
                    key={t.k}
                    d={`M300 0 C300 45 ${x} 45 ${x} 90`}
                    style={{
                      "--c": t.c,
                      "--i": i,
                    }}
                    className={hov === t.k ? "is-on" : ""}
                  />
                );
              })}
            </svg>
            <div className="tm-tree__teams">
              {teams.map((t, i) => (
                <button
                  type="button"
                  key={t.k}
                  className={"tm-node" + (hov === t.k ? " is-on" : "")}
                  style={{
                    "--c": t.c,
                    "--lt": t.lt,
                    "--i": i,
                  }}
                  onClick={() => pick(t.k)}
                  onMouseEnter={() => setHov(t.k)}
                  onMouseLeave={() => setHov(null)}
                  onFocus={() => setHov(t.k)}
                  onBlur={() => setHov(null)}
                >
                  <span className="tm-node__ic">
                    <RC_I n={t.ic} s={18} />
                  </span>
                  <b>{t.t}</b>
                  <span className="tm-faces tm-faces--s">
                    {TM_BY[t.k].map((p) => (
                      <img key={p.id} src={tmImg(p)} alt="" width="30" height="30" />
                    ))}
                  </span>
                  <small>
                    {TM_BY[t.k].length} {TM_BY[t.k].length === 1 ? "person" : "people"}
                  </small>
                </button>
              ))}
            </div>
          </div>
          <div className="tm-mix">
            <div className="tm-donut">
              <svg viewBox="0 0 180 180" aria-hidden="true">
                <circle cx="90" cy="90" r={R} className="tm-donut__bg" />
                {arcs.map((a, i) => (
                  <circle
                    key={a.t.k}
                    cx="90"
                    cy="90"
                    r={R}
                    className={"tm-donut__arc" + (hov === a.t.k ? " is-on" : "")}
                    style={{
                      stroke: a.t.c,
                      strokeDasharray: `${v ? Math.max(a.len - 2, 0) : 0} ${C}`,
                      strokeDashoffset: -a.off,
                      transitionDelay: i * 90 + "ms",
                    }}
                    onMouseEnter={() => setHov(a.t.k)}
                    onMouseLeave={() => setHov(null)}
                  />
                ))}
              </svg>
              <div className="tm-donut__c">
                {on ? (
                  <>
                    <b>{TM_BY[on.k].length}</b>
                    <span>{on.t}</span>
                  </>
                ) : (
                  <>
                    <b>{total}</b>
                    <span>people</span>
                  </>
                )}
              </div>
            </div>
            <ul className="tm-legend">
              {arcs.map((a) => (
                <li
                  key={a.t.k}
                  className={hov === a.t.k ? "is-on" : ""}
                  onMouseEnter={() => setHov(a.t.k)}
                  onMouseLeave={() => setHov(null)}
                >
                  <button type="button" onClick={() => pick(a.t.k)}>
                    <i
                      style={{
                        background: a.t.c,
                      }}
                    />
                    <span>{a.t.t}</span>
                    <b>{a.n}</b>
                    <em>
                      <s
                        style={{
                          width: (a.n / Math.max(...arcs.map((x) => x.n))) * 100 + "%",
                          background: a.t.c,
                        }}
                      />
                    </em>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
function TM_Card({ p, i, onPlay }) {
  const t = TM_T[p.team];
  const el = ee.useRef(null);
  const move = (e) => {
    if (tmReduce() || e.pointerType === "touch") return;
    const r = el.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5,
      y = (e.clientY - r.top) / r.height - 0.5;
    el.current.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg");
    el.current.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
    el.current.style.setProperty("--gx", ((x + 0.5) * 100).toFixed(1) + "%");
  };
  const leave = () => {
    if (!el.current) return;
    el.current.style.setProperty("--rx", "0deg");
    el.current.style.setProperty("--ry", "0deg");
  };
  return (
    <article
      ref={el}
      className={"tm-card" + (p.team === "lead" ? " tm-card--lead" : "")}
      style={{
        "--c": t.c,
        "--lt": t.lt,
        "--i": i,
      }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      <div className="tm-card__in">
        <div className="tm-card__stage">
          <span className="tm-card__rings" aria-hidden="true" />
          <img
            className="tm-card__img"
            src={tmImg(p)}
            alt={`${p.name}, ${p.role}`}
            width="360"
            height="360"
            loading="lazy"
            decoding="async"
          />
          <span className="tm-card__team">
            <RC_I n={t.ic} s={13} />
            {t.t}
          </span>
          {p.video && p.video.yt && (
            <button
              type="button"
              className="tm-card__play"
              onClick={() => onPlay(p)}
              aria-label={`Play ${p.name}'s introduction video`}
            >
              <TM_Play s={18} />
            </button>
          )}
        </div>
        <div className="tm-card__body">
          <h3>{p.name}</h3>
          <p className="tm-card__role">{p.role}</p>
          <div className="tm-card__links">
            {p.li && (
              <a
                className="tm-ic tm-ic--li"
                href={p.li}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  p.liCompany
                    ? `Frequent Research on LinkedIn (opens in a new tab)`
                    : `${p.name} on LinkedIn (opens in a new tab)`
                }
                title={p.liCompany ? "Company LinkedIn" : "LinkedIn profile"}
              >
                <TM_Ico k="linkedin" s={15} />
              </a>
            )}
            <a
              className="tm-ic tm-ic--mail"
              href={`mailto:${p.email}`}
              aria-label={`Email ${p.name}`}
              title={`Email ${p.name}`}
            >
              <TM_Mail s={15} />
            </a>
            <TM_VideoBtn p={p} onPlay={onPlay} />
          </div>
        </div>
      </div>
    </article>
  );
}
function TM_Grid({ team, setTeam, onPlay }) {
  const [ref, v] = RC_useInView(0.05);
  const [q, setQ] = ee.useState("");
  const qq = q.trim().toLowerCase();
  const list = TM_PEOPLE.filter(
    (p) =>
      (team === "all" || p.team === team) &&
      (!qq || (p.name + " " + p.role + " " + TM_T[p.team].t).toLowerCase().includes(qq)),
  );
  const tabs = [
    {
      k: "all",
      t: "Everyone",
      ic: "users",
      c: "#07104F",
      lt: "#8FB0FF",
    },
    ...TM_TEAMS,
  ];
  return (
    <section
      ref={ref}
      className={"section tm-people" + (v ? " is-in" : "")}
      id="tm-people"
      aria-labelledby="tm-people-h"
    >
      <div className="container">
        <HM_Head
          id="tm-people-h"
          k="Meet our Team"
          t="The faces behind every project"
          i="Reach anyone directly by email or LinkedIn, or press play to hear their introduction."
          center
        />
        <div className="tm-filter">
          <div className="tm-tabs" role="tablist" aria-label="Filter by team">
            {tabs.map((t) => {
              const n = t.k === "all" ? TM_PEOPLE.length : TM_BY[t.k].length;
              return (
                <button
                  key={t.k}
                  type="button"
                  role="tab"
                  aria-selected={team === t.k}
                  className={"tm-tab" + (team === t.k ? " is-on" : "")}
                  style={{
                    "--c": t.c,
                    "--lt": t.lt,
                  }}
                  onClick={() => setTeam(t.k)}
                >
                  <RC_I n={t.ic} s={15} />
                  {t.t}
                  <em>{n}</em>
                </button>
              );
            })}
          </div>
          <label className="tm-search">
            <RC_I n="search" s={16} />
            <input
              type="search"
              placeholder="Search name or role…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search team members"
            />
          </label>
        </div>
        <div className="tm-grid" key={team + qq}>
          {list.map((p, i) => (
            <TM_Card key={p.id} p={p} i={i} onPlay={onPlay} />
          ))}
        </div>
        {!list.length && <p className="tm-empty">No one matches “{q.trim()}”. Try another name or role.</p>}
      </div>
    </section>
  );
}
function TM_Videos({ onPlay }) {
  const [ref, v] = RC_useInView(0.15);
  const [k, setK] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (!v || hold || tmReduce()) return;
    const t2 = setInterval(() => setK((x) => (x + 1) % TM_VIDS.length), 3600);
    return () => clearInterval(t2);
  }, [v, hold]);
  const p = TM_VIDS[k],
    t = TM_T[p.team];
  return (
    <section ref={ref} className={"section tm-vids" + (v ? " is-in" : "")} id="tm-videos" aria-labelledby="tm-vids-h">
      <div className="tm-vids__bg" aria-hidden="true" />
      <div className="container">
        <HM_Head
          id="tm-vids-h"
          k="In their own words"
          t="Hear from the team"
          i={`${TM_VIDS.length} team members introduce themselves and their work.`}
          light
          center
        />
        <div className="tm-vids__grid" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div
            className="tm-feat"
            style={{
              "--c": t.c,
              "--lt": t.lt,
            }}
            key={p.id}
          >
            <div className="tm-feat__screen">
              <span className="tm-feat__eq" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((j) => (
                  <i
                    key={j}
                    style={{
                      "--j": j,
                    }}
                  />
                ))}
              </span>
              <img src={tmImg(p)} alt="" width="360" height="360" />
              <TM_VideoBtn
                p={p}
                onPlay={onPlay}
                cls="tm-feat__play"
                label={p.video.yt ? "Play introduction" : "Watch on LinkedIn"}
              />
              <span className="tm-feat__src">
                {p.video.yt ? (
                  <>
                    <TM_Ico k="youtube" s={14} />
                    {" YouTube"}
                  </>
                ) : (
                  <>
                    <TM_Ico k="linkedin" s={13} />
                    {" LinkedIn"}
                  </>
                )}
              </span>
            </div>
            <div className="tm-feat__cap">
              <b>{p.name}</b>
              <span>{p.role}</span>
              <em>
                <RC_I n={t.ic} s={13} />
                {t.t}
              </em>
            </div>
          </div>
          <ul className="tm-vlist">
            {TM_VIDS.map((x, i) => {
              const tt = TM_T[x.team];
              return (
                <li
                  key={x.id}
                  className={i === k ? "is-on" : ""}
                  style={{
                    "--c": tt.c,
                    "--lt": tt.lt,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setHold(true);
                      setK(i);
                      if (x.video.yt) onPlay(x);
                      else window.open(x.video.url, "_blank", "noopener");
                    }}
                    onMouseEnter={() => setK(i)}
                    onFocus={() => setK(i)}
                    aria-label={`${x.name}, ${x.role}: ${x.video.yt ? "play introduction video" : "watch introduction on LinkedIn (opens in a new tab)"}`}
                  >
                    <img src={tmImg(x)} alt="" width="44" height="44" loading="lazy" />
                    <span>
                      <b>{x.name}</b>
                      <small>{x.role}</small>
                    </span>
                    <i className={"tm-vlist__src" + (x.video.yt ? "" : " is-li")}>
                      {x.video.yt ? <TM_Play s={12} /> : <TM_Ico k="linkedin" s={11} />}
                    </i>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
function TM_World() {
  const [ref, v] = RC_useInView(0.2);
  const W = RG_MAP.w,
    H = RG_MAP.h,
    hub = RG_MAP.pts.in;
  const all = RG_REGIONS.flatMap((r) =>
    r.list.map(([c, n]) => ({
      c,
      n,
      r,
    })),
  );
  const pts = all.filter((x) => x.c !== "in" && RG_MAP.pts[x.c]);
  return (
    <section ref={ref} className={"section tm-world" + (v ? " is-in" : "")} aria-labelledby="tm-world-h">
      <div className="container tm-world__grid">
        <div className="tm-world__copy">
          <HM_Head
            id="tm-world-h"
            k="One team, many markets"
            t="From New Delhi to the world"
            i={`Our team works from our head office in New Delhi, India, coordinating research across the ${RG_TOTAL} countries we cover.`}
          />
          <ul className="tm-world__regs">
            {RG_REGIONS.map((r, i) => (
              <li
                key={r.k}
                style={{
                  "--c": r.c,
                  "--i": i,
                }}
              >
                <span className="tm-world__fl">
                  {r.list.slice(0, 4).map(([c]) => (
                    <img key={c} src={RG_FLAGS[c]} alt="" width="22" height="16" loading="lazy" />
                  ))}
                </span>
                <b>{r.full}</b>
                <em>{r.list.length}</em>
              </li>
            ))}
          </ul>
          <div className="tm-world__hq">
            <img src={RG_FLAGS.in} alt="" width="34" height="25" />
            <div>
              <b>Head office</b>
              <span>{CONTACT.address}</span>
            </div>
          </div>
        </div>
        <div className="tm-world__map" aria-hidden="true">
          <svg viewBox={`0 0 ${W} ${H}`}>
            <g className="tm-world__land">
              {RG_MAP.base.map((b, i) => (
                <path key={i} d={b.d} className={b.r ? "is-r" : ""} />
              ))}
            </g>
            {pts.map((x, i) => {
              const p = RG_MAP.pts[x.c];
              const mx = (hub[0] + p[0]) / 2,
                my = Math.min(hub[1], p[1]) - Math.abs(hub[0] - p[0]) * 0.22 - 10;
              return (
                <path
                  key={x.c}
                  className="tm-arc"
                  d={`M${hub[0]},${hub[1]} Q${mx},${my} ${p[0]},${p[1]}`}
                  style={{
                    "--i": i % 18,
                    stroke: x.r.c,
                  }}
                />
              );
            })}
            {pts.map((x) => {
              const p = RG_MAP.pts[x.c];
              return (
                <circle
                  key={"d" + x.c}
                  cx={p[0]}
                  cy={p[1]}
                  r="2.6"
                  className="tm-dot"
                  style={{
                    fill: x.r.c,
                  }}
                />
              );
            })}
            <g transform={`translate(${hub[0]},${hub[1]})`} className="tm-hub">
              <circle r="18" className="tm-hub__p" />
              <circle r="10" className="tm-hub__p tm-hub__p--2" />
              <circle r="5.5" className="tm-hub__c" />
            </g>
          </svg>
          <div className="tm-world__faces">
            {TM_PEOPLE.slice(0, 9).map((p, i) => (
              <img
                key={p.id}
                src={tmImg(p)}
                alt=""
                width="40"
                height="40"
                style={{
                  "--i": i,
                }}
              />
            ))}
            <span>+{TM_PEOPLE.length - 9}</span>
          </div>
        </div>
      </div>
      <div className="tm-ticker" aria-hidden="true">
        <div className="tm-ticker__track">
          {[0, 1].map((k) => (
            <span key={k}>
              {all.map((x) => (
                <i key={x.c + k}>
                  <img src={RG_FLAGS[x.c]} alt="" width="24" height="18" loading="lazy" />
                  {x.n}
                </i>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
function TM_Next() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <section ref={ref} className={"section tmx-next" + (v ? " is-in" : "")} aria-labelledby="tmx-next-h">
      <div className="container">
        <div className="tmx-next__head">
          <span className="tmx-next__plus" aria-hidden="true">
            +
          </span>
          <h2 id="tmx-next-h">Next on the team</h2>
        </div>
        <HmLink
          to="/careers"
          className="tmx-you"
          aria-label="Careers: your story could be here. Think you could be part of the team?"
        >
          <span className="tmx-you__frame" aria-hidden="true">
            <svg viewBox="0 0 100 108" className="tmx-you__draw">
              <rect x="2" y="2" width="96" height="104" rx="20" pathLength="100" />
            </svg>
            <svg viewBox="0 0 120 120" className="tmx-you__sil">
              <circle cx="60" cy="44" r="22" />
              <path d="M18 112c4-24 22-38 42-38s38 14 42 38" />
            </svg>
            <span className="tmx-you__plus">+</span>
          </span>
          <span className="tmx-you__body">
            <span className="tmx-you__k">Careers</span>
            <span className="tmx-you__h">Your story could be here</span>
            <span className="tmx-you__p">Think you could be part of the team?</span>
          </span>
          <span className="tmx-you__go" aria-hidden="true">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </span>
        </HmLink>
      </div>
    </section>
  );
}
function TM_Page() {
  usePageMeta(
    "Meet our Team",
    "Meet the Frequent Research team: leadership, sales, project management, panel supply, technology, marketing and finance. Contact anyone directly or watch their introduction.",
  );
  const [team, setTeam] = ee.useState("all");
  const [vid, setVid] = ee.useState(null);
  const pick = (k) => {
    setTeam(k);
    tmGo("tm-people")();
  };
  const Ks2 = (p) => ee.createElement(CtaSection, p);
  return (
    <div className="ot tm">
      <TM_Hero />
      <LDR_Section />
      <TM_Org pick={pick} />
      <TM_Grid team={team} setTeam={setTeam} onPlay={setVid} />
      <TM_World />
      <TM_Videos onPlay={setVid} />
      <OT_Ways />
      <TM_Next />
      <Ks2 title="Work with our team" />
      {vid && <TM_Video p={vid} onClose={() => setVid(null)} />}
    </div>
  );
}

export { TM_Page };
