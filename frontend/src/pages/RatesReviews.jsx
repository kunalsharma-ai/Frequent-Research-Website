/*
 * Our Rates & Reviews (build 54 redesign) — /rates-reviews, in the About menu. Prefix RR_. Styles: src/styles/rates-reviews.css (rr-).
 *
 * Data: exactly the reviews the testimonials section shows (FR_useReviews): the site's existing testimonials, every
 * review published through the Rate & Review form (GET /api/reviews) and the visitor's own just-posted review.
 * Every figure on the page — averages, star splits, counts, countries, trends — is computed from those reviews at
 * run time. Nothing is typed in, so the page can never claim more than the reviews behind it.
 * No AggregateRating schema on purpose: Google does not show review stars for a business's reviews of itself, and
 * marking them up can be treated as spam. The page carries a CollectionPage description only.
 *
 *  RR_Hero       a turning 3D prism — one face per service with its live average — over a star field
 *  RR_Dock       sticky service dock: jump to a chapter, see its score
 *  RR_Chapter    one chapter per service, each in its own world and instrument, with that service's testimonial
 *                format from LiveReviews (FRT_Show):
 *                  Market Research     research lab  · arc gauge            · deck of response cards
 *                  Digital Marketing   neon campaign · pulse rings           · phone feed
 *                  IT & Development    dark terminal · block-bar status board · review log
 *                  Finance & Accounts  ledger paper  · rating trend line     · printed receipts
 *  RR_Sky        the full picture: star-split rings, share-of-voice race bar, reviewer flags
 *  RR_Wall       every review: service / star / text filters, sort, "show more"  (#all-reviews)
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { TESTIMONIALS } from '../app/data/products.jsx';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { PpL, dmMeta } from '../components/dm/shared.jsx';
import { FRK_Flag, FRK_I, FRK_Stars, FRK_V, FRK_VKEYS, frkIn, frkNorm, frkReduce, frkVStyle } from '../components/site/FrKit.jsx';
import { FRT_Show, FRV_Card, FR_useReviews, frCName, frStatsOf } from '../components/site/LiveReviews.jsx';

const RR_PAGE = 24;
const RR_SORTS = [
  ["new", "Newest"],
  ["high", "Highest rated"],
  ["low", "Lowest rated"],
];
const rrOpen = (svc) => window.dispatchEvent(new CustomEvent("fr-open-review", { detail: { service: svc || null } }));
const rrFmt = (x) => (x ? x.toFixed(1) : "–");
const rrJump = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: frkReduce() ? "auto" : "smooth", block: "start" });
};
const RR_CH = {
  mr: { kick: "Research lab", title: ["Insight you can ", "act on."], line: "Reviews from teams who commissioned surveys, panels and fieldwork." },
  dm: { kick: "Campaign room", title: ["Growth people ", "talk about."], line: "Reviews from brands we run search, social and content for." },
  it: { kick: "Build log", title: ["Software that ", "ships."], line: "Reviews from teams whose apps, platforms and integrations we built." },
  af: { kick: "The ledger", title: ["Numbers that ", "add up."], line: "Reviews from businesses that trust us with books, tax and payroll." },
};

function RR_Hero({ st }) {
  const [hold, setHold] = ee.useState(false);
  return (
    <section className="rr-hero">
      <div className="rr-hero__sky" aria-hidden="true">
        {Array.from({ length: 36 }, (_, k) => (
          <b key={k} style={{ "--k": k }} />
        ))}
        <i />
        <i />
      </div>
      <div className="container rr-hero__in">
        <div className="rr-hero__copy">
          <nav className="lt-crumb" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span aria-hidden="true">/</span>
            <PpL to="/about-us">About</PpL>
            <span aria-hidden="true">/</span>
            <span aria-current="page">Rates &amp; Reviews</span>
          </nav>
          <span className="rr-kick">
            <i aria-hidden="true" /> Our rates &amp; reviews
          </span>
          <HeroH1>
            Four teams.
            <span className="rr-hero__rot" aria-hidden="true">
              {FRK_VKEYS.map((k, i) => (
                <em key={k} style={{ ...frkVStyle(k), "--i": i }}>
                  {FRK_V[k].name}
                </em>
              ))}
            </span>
            <span className="frk-sr"> Market research, digital marketing, IT &amp; development and finance &amp; accounts. </span>
            <strong>One honest scoreboard.</strong>
          </HeroH1>
          <p>Every score below is worked out live from reviews our clients wrote — nothing typed in, nothing rounded up.</p>
          <ul className="rr-hero__stats">
            <li>
              <b>{rrFmt(st.all.avg)}</b>
              <span>
                <FRK_Stars n={st.all.avg} s={12} label={false} /> average
              </span>
            </li>
            <li>
              <b>{st.all.n}</b>
              <span>review{st.all.n === 1 ? "" : "s"}</span>
            </li>
            <li>
              <b>{st.all.n ? Math.round((st.all.top / st.all.n) * 100) + "%" : "–"}</b>
              <span>gave 4★ or 5★</span>
            </li>
            <li>
              <b>{st.countries.length || "–"}</b>
              <span>countr{st.countries.length === 1 ? "y" : "ies"}</span>
            </li>
          </ul>
          <div className="rr-hero__cta">
            <button type="button" className="rr-btn rr-btn--light" onClick={() => rrJump("all-reviews")}>
              <FRK_I n="eye" s={17} /> Read every review
            </button>
            <button type="button" className="rr-btn rr-btn--hot" onClick={() => rrOpen()}>
              <FRK_I n="star" s={17} /> Rate &amp; review us
            </button>
          </div>
        </div>
        <div className={"rr-prism" + (hold ? " is-hold" : "")} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
          <div className="rr-prism__spin">
            {FRK_VKEYS.map((k, i) => {
              const v = FRK_V[k],
                s = st[k];
              return (
                <button key={k} type="button" className={"rr-face rr-face--" + v.k} style={{ ...frkVStyle(k), "--f": i }} onClick={() => rrJump("rr-ch-" + v.k)} aria-label={`${v.name}: ${s.n ? rrFmt(s.avg) + " out of 5 from " + s.n + " review" + (s.n === 1 ? "" : "s") : "no reviews yet"}. Go to section.`}>
                  <span className="rr-face__ic" aria-hidden="true">
                    <FRK_I n={v.ic} s={26} />
                  </span>
                  <small>{v.name}</small>
                  <b>{rrFmt(s.avg)}</b>
                  <FRK_Stars n={s.avg} s={14} label={false} />
                  <em>{s.n ? `${s.n} review${s.n === 1 ? "" : "s"}` : "Be the first"}</em>
                </button>
              );
            })}
          </div>
          <span className="rr-prism__floor" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function RR_Dock({ st }) {
  return (
    <nav className="rr-dock" aria-label="Jump to a service">
      <div className="container rr-dock__in">
        {FRK_VKEYS.map((k) => {
          const v = FRK_V[k];
          return (
            <button key={k} type="button" className={"rr-dock__b rr-dock__b--" + v.k} style={frkVStyle(k)} onClick={() => rrJump("rr-ch-" + v.k)}>
              <span className="rr-dock__ic" aria-hidden="true">
                <FRK_I n={v.ic} s={16} />
              </span>
              <span className="rr-dock__t">{v.name}</span>
              <b>{st[k].n ? rrFmt(st[k].avg) + "★" : "new"}</b>
            </button>
          );
        })}
        <button type="button" className="rr-dock__b rr-dock__b--all" onClick={() => rrJump("all-reviews")}>
          <span className="rr-dock__ic" aria-hidden="true">
            <FRK_I n="grid" s={16} />
          </span>
          <span className="rr-dock__t">All reviews</span>
          <b>{st.all.n}</b>
        </button>
      </div>
    </nav>
  );
}

/* ── four instruments ── */
function RR_Gauge({ avg, on }) {
  const p = on ? avg / 5 : 0;
  return (
    <svg viewBox="0 0 200 120" className="rr-gauge" aria-hidden="true">
      {Array.from({ length: 21 }, (_, i) => {
        const a = Math.PI - (i / 20) * Math.PI;
        return <line key={i} x1={100 + Math.cos(a) * 92} y1={108 - Math.sin(a) * 92} x2={100 + Math.cos(a) * (i % 5 ? 86 : 80)} y2={108 - Math.sin(a) * (i % 5 ? 86 : 80)} className="rr-gauge__tick" />;
      })}
      <path d="M22 108 A78 78 0 0 1 178 108" className="rr-gauge__bg" />
      <path d="M22 108 A78 78 0 0 1 178 108" className="rr-gauge__fg" pathLength="100" style={{ strokeDasharray: `${p * 100} 100` }} />
      <g className="rr-gauge__needle" style={{ transform: `rotate(${-90 + p * 180}deg)` }}>
        <path d="M100 108 L97 50 L100 40 L103 50 Z" />
        <circle cx="100" cy="108" r="7" />
      </g>
    </svg>
  );
}
function RR_Pulse({ s }) {
  const share = s.n ? Math.round((s.top / s.n) * 100) : 0;
  return (
    <div className="rr-pulse" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <i key={i} style={{ "--i": i }} />
      ))}
      <span className="rr-pulse__core">
        <b>{rrFmt(s.avg)}</b>
        <small>out of 5</small>
      </span>
      <span className="rr-pulse__chip rr-pulse__chip--a">
        <FRK_I n="heart" s={13} /> {share}% love it
      </span>
      <span className="rr-pulse__chip rr-pulse__chip--b">
        <FRK_I n="users" s={13} /> {s.n} voice{s.n === 1 ? "" : "s"}
      </span>
    </div>
  );
}
function RR_Status({ s, on }) {
  const blocks = (x) => Math.round((on ? x : 0) * 20);
  const row = (label, x, txt) => (
    <li>
      <span>{label}</span>
      <i>
        {Array.from({ length: 20 }, (_, j) => (
          <b key={j} className={j < blocks(x) ? "is-on" : ""} style={{ "--j": j }} />
        ))}
      </i>
      <em>{txt}</em>
    </li>
  );
  return (
    <div className="rr-status" aria-hidden="true">
      <p>
        <b>$</b> fr score --service=it
      </p>
      <ul>
        {row("avg", s.avg / 5, rrFmt(s.avg) + "/5")}
        {row("4–5★", s.n ? s.top / s.n : 0, (s.n ? Math.round((s.top / s.n) * 100) : 0) + "%")}
        {row("5★", s.n ? s.dist[5] / s.n : 0, (s.n ? Math.round((s.dist[5] / s.n) * 100) : 0) + "%")}
      </ul>
      <p className="rr-status__ok">✓ build passing · {s.n} review{s.n === 1 ? "" : "s"}</p>
    </div>
  );
}
function RR_Trend({ rows, s, on }) {
  /* oldest → newest running average of this service's ratings */
  const pts = ee.useMemo(() => {
    const list = [...rows].sort((a, b) => a.at - b.at);
    let sum = 0;
    return list.map((r, i) => ((sum += r.rating), sum / (i + 1)));
  }, [rows]);
  const P = pts.length > 1 ? pts : [pts[0] || 0, pts[0] || 0];
  const d = P.map((y, i) => `${i ? "L" : "M"}${(i / (P.length - 1)) * 300} ${110 - ((y - 1) / 4) * 90}`).join(" ");
  return (
    <div className="rr-trend" aria-hidden="true">
      <div className="rr-trend__num">
        <b>{rrFmt(s.avg)}</b>
        <span className={"rr-trend__tag" + (s.avg >= 4 ? " is-up" : "")}>{s.avg >= 4 ? "▲ strong" : s.n ? "● steady" : "—"}</span>
      </div>
      <svg viewBox="0 0 300 120" preserveAspectRatio="none">
        {[0, 1, 2, 3, 4].map((g) => (
          <line key={g} x1="0" x2="300" y1={20 + g * 22.5} y2={20 + g * 22.5} className="rr-trend__grid" />
        ))}
        <path d={d + " L300 120 L0 120 Z"} className="rr-trend__area" />
        <path d={d} className="rr-trend__line" pathLength="100" style={{ strokeDashoffset: on ? 0 : 100 }} />
      </svg>
      <small>Running average, oldest → newest review</small>
    </div>
  );
}

function RR_Chapter({ k, s, rows, flip }) {
  const v = FRK_V[k];
  const c = RR_CH[v.k];
  const [ref, inV] = frkIn(0.15);
  const maxD = Math.max(1, ...[5, 4, 3, 2, 1].map((x) => s.dist[x]));
  return (
    <section id={"rr-ch-" + v.k} ref={ref} className={"rr-ch rr-ch--" + v.k + (flip ? " is-flip" : "") + (inV ? " is-in" : "")} style={frkVStyle(k)} aria-labelledby={"rr-ch-h-" + v.k}>
      <div className="rr-ch__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container rr-ch__in">
        <div className="rr-ch__info">
          <span className="rr-ch__kick">
            <FRK_I n={v.ic} s={14} /> {v.name} · {c.kick}
          </span>
          <h2 id={"rr-ch-h-" + v.k}>
            {c.title[0]}
            <em>{c.title[1]}</em>
          </h2>
          <p>{c.line}</p>
          <div className="rr-ch__inst">
            {v.k === "mr" && (
              <div className="rr-ch__gauge">
                <RR_Gauge avg={s.avg} on={inV} />
                <span>
                  <b>{rrFmt(s.avg)}</b>
                  <small>
                    {s.n} review{s.n === 1 ? "" : "s"}
                  </small>
                </span>
              </div>
            )}
            {v.k === "dm" && <RR_Pulse s={s} />}
            {v.k === "it" && <RR_Status s={s} on={inV} />}
            {v.k === "af" && <RR_Trend rows={rows} s={s} on={inV} />}
          </div>
          <ul className="rr-ch__dist" aria-label={`${v.name} star split`}>
            {[5, 4, 3, 2, 1].map((x, i) => (
              <li key={x} style={{ "--i": i }}>
                <span>
                  {x}
                  <FRK_I n="star" s={11} />
                </span>
                <i>
                  <b style={{ width: inV ? (s.dist[x] / maxD) * 100 + "%" : 0 }} />
                </i>
                <em>{s.dist[x]}</em>
              </li>
            ))}
          </ul>
          <div className="rr-ch__act">
            <button type="button" className="rr-ch__rate" onClick={() => rrOpen(k)}>
              <FRK_I n="star" s={15} /> Review {v.short.toLowerCase()}
            </button>
            {s.n > 0 && (
              <PpL to={"/services/" + k} className="rr-ch__svc">
                About this service <FRK_I n="arrow" s={14} />
              </PpL>
            )}
          </div>
        </div>
        <div className="rr-ch__show">
          <FRT_Show k={k} rows={rows} inView={inV} />
        </div>
      </div>
    </section>
  );
}

/* the full picture — star rings, share race, reviewer flags */
function RR_Sky({ st }) {
  const [ref, inV] = frkIn(0.25);
  const total = Math.max(1, st.all.n);
  const voices = Math.max(1, FRK_VKEYS.reduce((s, x) => s + st[x].n, 0));
  return (
    <section ref={ref} className={"rr-sky" + (inV ? " is-in" : "")} aria-labelledby="rr-sky-h">
      <div className="rr-sky__stars" aria-hidden="true">
        {Array.from({ length: 30 }, (_, k) => (
          <b key={k} style={{ "--k": k }} />
        ))}
      </div>
      <div className="container">
        <header className="rr-head rr-head--light">
          <span className="rr-kick rr-kick--light">The full picture</span>
          <h2 id="rr-sky-h">
            How the stars <em>fall.</em>
          </h2>
        </header>
        <div className="rr-sky__grid">
          <div className="rr-glass rr-rings">
            <h3>Star split</h3>
            <div className="rr-rings__art">
              <svg viewBox="0 0 200 200" aria-hidden="true">
                {[5, 4, 3, 2, 1].map((x, i) => {
                  const r = 88 - i * 15;
                  return (
                    <g key={x}>
                      <circle cx="100" cy="100" r={r} className="rr-rings__bg" />
                      <circle cx="100" cy="100" r={r} pathLength="100" className={"rr-rings__fg rr-rings__fg--" + x} style={{ strokeDasharray: `${inV ? (st.all.dist[x] / total) * 100 : 0} 100`, transitionDelay: i * 0.12 + "s" }} />
                    </g>
                  );
                })}
              </svg>
              <span>
                <b>{rrFmt(st.all.avg)}</b>
                <small>average</small>
              </span>
            </div>
            <ul className="rr-rings__key">
              {[5, 4, 3, 2, 1].map((x) => (
                <li key={x} className={"is-" + x}>
                  <i />
                  {x}★ <b>{Math.round((st.all.dist[x] / total) * 100)}%</b>
                </li>
              ))}
            </ul>
          </div>
          <div className="rr-glass rr-race">
            <h3>Share of voice by service</h3>
            <div className="rr-race__bar" role="img" aria-label={FRK_VKEYS.map((k) => `${FRK_V[k].name} ${st[k].n}`).join(", ")}>
              {FRK_VKEYS.map((k) => (
                <i key={k} style={{ ...frkVStyle(k), flexGrow: inV ? st[k].n || 0.0001 : 0.0001 }} />
              ))}
            </div>
            <ul className="rr-race__list">
              {FRK_VKEYS.map((k, i) => (
                <li key={k} style={{ ...frkVStyle(k), "--i": i }}>
                  <span className="rr-race__ic" aria-hidden="true">
                    <FRK_I n={FRK_V[k].ic} s={14} />
                  </span>
                  <span>{FRK_V[k].name}</span>
                  <b>{Math.round((st[k].n / voices) * 100)}%</b>
                  <em>{rrFmt(st[k].avg)}★</em>
                </li>
              ))}
            </ul>
          </div>
          <div className="rr-glass rr-flags">
            <h3>Where reviewers are</h3>
            {st.countries.length ? (
              <ul className="rr-flags__cloud">
                {st.countries.map(([c, n], i) => (
                  <li key={c} style={{ "--i": i, "--s": Math.min(1.5, 0.95 + n * 0.1) }} title={`${frCName(c)}: ${n}`}>
                    <FRK_Flag iso={c} />
                    <span>{frCName(c)}</span>
                    <b>{n}</b>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="rr-flags__none">
                <span aria-hidden="true">
                  <FRK_I n="globe" s={34} />
                </span>
                <p>Flags appear here as reviewers add their country.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function RR_Wall({ all, svc, setSvc }) {
  const [stars, setStars] = ee.useState(0);
  const [sort, setSort] = ee.useState("new");
  const [q, setQ] = ee.useState("");
  const [n, setN] = ee.useState(RR_PAGE);
  ee.useEffect(() => setN(RR_PAGE), [svc, stars, sort, q]);
  const list = ee.useMemo(() => {
    const t = frkNorm(q.trim());
    let r = all.filter((x) => (svc === "all" || x.services.includes(svc)) && (!stars || x.rating === stars) && (!t || frkNorm(x.quote + " " + x.name + " " + (x.company || "") + " " + frCName(x.country)).includes(t)));
    if (sort === "high") r = [...r].sort((a, b) => b.rating - a.rating || b.at - a.at);
    else if (sort === "low") r = [...r].sort((a, b) => a.rating - b.rating || b.at - a.at);
    return r;
  }, [all, svc, stars, sort, q]);
  return (
    <section id="all-reviews" className="rr-wall" aria-labelledby="rr-wall-h">
      <div className="container">
        <header className="rr-head">
          <span className="rr-kick">Every review</span>
          <h2 id="rr-wall-h">
            In their <em>own words.</em>
          </h2>
        </header>
        <div className="rr-tools">
          <div className="rr-chips" role="group" aria-label="Filter by service">
            {[["all", "All services", "users"], ...FRK_VKEYS.map((k) => [k, FRK_V[k].name, FRK_V[k].ic])].map(([k, t, ic]) => (
              <button key={k} type="button" className={"rr-chip" + (svc === k ? " is-on" : "")} style={k === "all" ? undefined : frkVStyle(k)} aria-pressed={svc === k} onClick={() => setSvc(k)}>
                <FRK_I n={ic} s={14} /> {t}
              </button>
            ))}
          </div>
          <div className="rr-tools__row">
            <div className="rr-stars" role="group" aria-label="Filter by rating">
              {[0, 5, 4, 3, 2, 1].map((x) => (
                <button key={x} type="button" className={stars === x ? "is-on" : ""} aria-pressed={stars === x} onClick={() => setStars(x)}>
                  {x ? (
                    <>
                      {x}
                      <FRK_I n="star" s={12} />
                    </>
                  ) : (
                    "Any"
                  )}
                </button>
              ))}
            </div>
            <label className="rr-search">
              <FRK_I n="lens" s={16} />
              <span className="frk-sr">Search reviews</span>
              <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reviews, names, countries…" />
            </label>
            <label className="rr-sort">
              <span className="frk-sr">Sort</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                {RR_SORTS.map(([k, t]) => (
                  <option key={k} value={k}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <p className="rr-count" aria-live="polite">
            Showing <b>{Math.min(n, list.length)}</b> of <b>{list.length}</b> review{list.length === 1 ? "" : "s"}
          </p>
        </div>
        {list.length ? (
          <ul className="rr-masonry">
            {list.slice(0, n).map((r, i) => (
              <li key={r.id} style={{ "--i": i % RR_PAGE }}>
                <FRV_Card r={r} front />
              </li>
            ))}
          </ul>
        ) : (
          <div className="rr-none">
            <p>No reviews match these filters yet.</p>
            <button type="button" className="rr-btn rr-btn--hot" onClick={() => rrOpen(svc !== "all" ? svc : null)}>
              <FRK_I n="star" s={16} /> Write the first one
            </button>
          </div>
        )}
        {n < list.length && (
          <div className="rr-more">
            <button type="button" className="rr-btn rr-btn--dark" onClick={() => setN((x) => x + RR_PAGE)}>
              Show more reviews <FRK_I n="down" s={16} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}



function RR_Page() {
  dmMeta("/rates-reviews", "Our Rates & Reviews | Frequent Research Client Reviews", "Read what clients say about Frequent Research — ratings and reviews for market research, digital marketing, IT & development and finance & accounts, with live scores per service.");
  useJsonLd("rates-reviews", { "@context": "https://schema.org", "@type": "CollectionPage", name: "Our Rates & Reviews", url: (typeof location !== "undefined" ? location.origin : "") + "/rates-reviews", about: { "@type": "Organization", name: "Frequent Research" } });
  const all = FR_useReviews(TESTIMONIALS);
  const st = ee.useMemo(() => frStatsOf(all), [all]);
  const by = ee.useMemo(() => {
    const o = {};
    FRK_VKEYS.forEach((k) => (o[k] = all.filter((r) => r.services.includes(k))));
    return o;
  }, [all]);
  const [svc, setSvc] = ee.useState("all");
  return (
    <div className="rr">
      <RR_Hero st={st} />
      <RR_Dock st={st} />
      {FRK_VKEYS.map((k, i) => (
        <RR_Chapter key={k} k={k} s={st[k]} rows={by[k]} flip={i % 2 === 1} />
      ))}
      <RR_Sky st={st} />
      <RR_Wall all={all} svc={svc} setSvc={setSvc} />
      <section className="rr-cta">
        <div className="rr-cta__orbit" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((k) => (
            <i key={k} style={{ "--k": k }}>
              ★
            </i>
          ))}
        </div>
        <div className="container rr-cta__in">
          <h2>
            Worked with us? <em>Add your voice.</em>
          </h2>
          <p>Five quick steps, about a minute. Your review appears on this page and in our client testimonials.</p>
          <div className="rr-cta__btns">
            {FRK_VKEYS.map((k) => (
              <button key={k} type="button" className="rr-cta__svc" style={frkVStyle(k)} onClick={() => rrOpen(k)}>
                <FRK_I n={FRK_V[k].ic} s={16} /> {FRK_V[k].short}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { RR_Page };
