/*
 * Client testimonials (build 54: per-service formats FRT_*; build 53 spotlight + wall; data layer from build 51).
 * Prefix FR_ / FRV_ / FRT_.
 * Styles: src/styles/live-reviews.css (vt-).
 *
 * What it shows: the built-in testimonials (base `TESTIMONIALS`) plus every review written through the Rate & Review
 * form. A review appears here:
 *   1. immediately for the person who wrote it (kept in this browser under "fr-my-reviews", marked "Just now"), and
 *   2. for every visitor as soon as the backend serves it from GET /api/reviews (polled every 60 s).
 * Look: a 3D carousel ring of review cards that turns to the active voice, a "score console" (liquid average, real
 * counts, service meters, reviewer flags) and two counter-scrolling ribbons. The section's colour grades to the
 * active card's service world.
 *
 * Endpoint contract (server/ in this repository is a reference implementation):
 *   GET /api/reviews → { ok: true, reviews: [ { id, first, last, name?, company?, designation?, country (ISO-2),
 *                         rating 1–5, quote, services: ["market-research", …] | vertical, date } ] }
 * Everything from the network is clamped and rendered as text only (never as HTML).
 * Publishing rule: only real reviews. Do not seed this list with drafted or sample reviews (README "Reviews").
 */
import * as ee from 'react';
import { TESTIMONIALS } from '../../app/data/products.jsx';
import { PpL } from '../dm/shared.jsx';
import { FRK_Flag, FRK_I, FRK_Stars, FRK_V, FRK_VKEYS, frkCountry, frkHash, frkIn, frkReduce, frkStore, frkText, frkVStyle } from './FrKit.jsx';

const FR_REVIEWS_URL = "/api/v1/reviews";
const FR_POLL_MS = 20000; /* build 56: new reviews reach every visitor within ~20 s */
const FR_MAX = 500;
const FR_MINE_KEY = "fr-my-reviews-v2"; /* build 57: new key — reviews typed while testing the old form are no longer shown */
const FR_MINE_TTL = 864e5; /* this browser shows its own just-posted review for 24 h, until the server copy arrives */
try {
  localStorage.removeItem("fr-my-reviews");
} catch (e) {}
const FR_LIMITS = { name: 60, company: 80, designation: 70, quote: 600 };

const frCName = (cc) => {
  const c = frkCountry(cc);
  return c ? c.name : cc || "";
};
/* normalise one review from any source (API, this browser, built-in list) */
const frClean = (r, src) => {
  if (!r || typeof r !== "object") return null;
  const quote = frkText(r.quote || r.review || r.text, FR_LIMITS.quote);
  const first = frkText(r.first, 40),
    last = frkText(r.last, 40);
  const name = frkText(r.name, FR_LIMITS.name) || [first, last].filter(Boolean).join(" ");
  if (quote.length < 12 || !name) return null;
  const rating = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 0))) || 5;
  const cc = /^[A-Za-z]{2}$/.test(String(r.country || "").trim()) ? String(r.country).trim().toUpperCase() : "";
  const svc = (Array.isArray(r.services) ? r.services : r.vertical ? [r.vertical] : []).map((s) => frkText(s, 40)).filter((s) => FRK_V[s]);
  const t = Date.parse(r.date || r.at);
  return {
    id: frkText(String(r.id || ""), 64) || name + "|" + quote.slice(0, 24),
    name,
    company: frkText(r.company, FR_LIMITS.company),
    designation: frkText(r.designation, FR_LIMITS.designation),
    role: frkText(r.role, 90),
    country: cc,
    rating,
    quote,
    services: svc.length ? svc : ["market-research"],
    at: isFinite(t) ? t : 0,
    live: src !== "base",
    mine: src === "mine",
  };
};
const frMine = () => {
  const a = frkStore.get(FR_MINE_KEY, []);
  const now = Date.now();
  return Array.isArray(a) ? a.filter((x) => x && now - (Date.parse(x.date) || now) < FR_MINE_TTL) : [];
};
/* called by the review form after a successful submission */
const frAddMine = (r) => {
  const list = frMine().filter((x) => x.id !== r.id);
  list.unshift(r);
  frkStore.set(FR_MINE_KEY, list.slice(0, 5));
  try {
    window.dispatchEvent(new CustomEvent("fr-review-added", { detail: r }));
  } catch (e) {}
};

function FR_useReviews(base) {
  const [live, setLive] = ee.useState([]);
  const [mine, setMine] = ee.useState(() => frMine());
  ee.useEffect(() => {
    let on = true;
    if (!/^https?:$/.test(location.protocol)) return; /* build 82.2: offline preview has no API */
    const load = () =>
      fetch(FR_REVIEWS_URL, { headers: { Accept: "application/json" }, cache: "no-store" })
        .then((r) => (r.ok && (r.headers.get("content-type") || "").includes("json") ? r.json() : null))
        .then((j) => {
          if (on && j && j.ok !== false && Array.isArray(j.reviews)) setLive(j.reviews.map((x) => frClean(x, "api")).filter(Boolean));
        })
        .catch(() => {});
    load();
    const id = setInterval(load, FR_POLL_MS);
    const add = () => setMine(frMine());
    window.addEventListener("fr-review-added", add);
    return () => {
      on = false;
      clearInterval(id);
      window.removeEventListener("fr-review-added", add);
    };
  }, []);
  return ee.useMemo(() => {
    const seen = new Set();
    const ids = new Set(live.map((x) => x.id));
    const my = mine
      .map((x) => frClean(x, "mine"))
      .filter((x) => x && !ids.has(x.id)); /* once the server has it, show the server copy */
    const rows = [...my, ...live.sort((a, b) => b.at - a.at), ...(Array.isArray(base) ? base.map((x) => frClean(x, "base")).filter(Boolean) : [])];
    return rows.filter((x) => !seen.has(x.id) && seen.add(x.id)).slice(0, FR_MAX);
  }, [live, mine, base]);
}

const frInitials = (s) =>
  (s || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w.charAt(0).toUpperCase())
    .join("");
const frWhen = (r) => {
  if (r.mine) return "Just now";
  if (!r.at) return "";
  const d = (Date.now() - r.at) / 864e5;
  if (d < 1) return "Today";
  if (d < 2) return "Yesterday";
  if (d < 30) return Math.floor(d) + " days ago";
  return new Date(r.at).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
};
const frSub = (r) => [r.designation, r.company].filter(Boolean).join(" · ") || r.role || "";

/* per-service and overall figures, always computed from the reviews actually loaded (never typed in) */
function frStatsOf(rows) {
  const mk = (list) => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    list.forEach((r) => (dist[r.rating] = (dist[r.rating] || 0) + 1));
    const n = list.length;
    return { n, avg: n ? list.reduce((s, r) => s + r.rating, 0) / n : 0, dist, top: list.filter((r) => r.rating >= 4).length, latest: list[0] || null };
  };
  const out = { all: mk(rows) };
  FRK_VKEYS.forEach((k) => (out[k] = mk(rows.filter((r) => r.services.includes(k)))));
  const cc = {};
  rows.forEach((r) => r.country && (cc[r.country] = (cc[r.country] || 0) + 1));
  out.countries = Object.entries(cc).sort((a, b) => b[1] - a[1]);
  return out;
}
/* ── helpers ─────────────────────────────────────────────────────────────────────────── */
const frSubLine = (r) => frSub(r);
const frStarsRow = (n, s = 15) => <FRK_Stars n={n} s={s} label={false} />;

/* one review card — used by the carousel, the ribbons and the review form's live preview */
function FRV_Card({ r, front }) {
  if (!r) return null;
  const w = r.services[0];
  return (
    <figure className={"vt-card" + (front ? " is-front" : "") + (r.mine ? " is-mine" : "")} style={frkVStyle(w)}>
      <span className="vt-card__glow" aria-hidden="true" />
      <span className="vt-card__q" aria-hidden="true">
        “
      </span>
      <div className="vt-card__top">
        <span role="img" aria-label={`${r.rating} out of 5 stars`}>
          {frStarsRow(r.rating, 16)}
        </span>
        {r.mine ? <em className="vt-badge vt-badge--mine">Your review</em> : r.live ? <em className="vt-badge">Posted on this site</em> : null}
      </div>
      <blockquote className="vt-card__txt">{r.quote}</blockquote>
      <figcaption className="vt-card__who">
        <span className="vt-av" aria-hidden="true">
          {frInitials(r.name)}
          {r.country && (
            <span className="vt-av__flag">
              <FRK_Flag iso={r.country} />
            </span>
          )}
        </span>
        <span className="vt-card__id">
          <b>{r.name}</b>
          {frSubLine(r) && <small>{frSubLine(r)}</small>}
          {r.country && <em>{frCName(r.country)}</em>}
        </span>
      </figcaption>
      <div className="vt-card__tags">
        {r.services.map((s) => (
          <span key={s} style={frkVStyle(s)}>
            <FRK_I n={FRK_V[s].ic} s={12} />
            {FRK_V[s].short}
          </span>
        ))}
        {frWhen(r) && <time>{frWhen(r)}</time>}
      </div>
    </figure>
  );
}
/* kept for the review form (build 51 name) */

const FR_LENSES = [["all", "All voices"], ...FRK_VKEYS.map((k) => [k, FRK_V[k].name])];
const FR_LENS_HINT = { all: "Every review, one spotlight at a time", "market-research": "Shown as a deck of survey responses", "digital-marketing": "Shown as a live social feed", "it-development": "Shown as a terminal review log", "accounts-finance": "Shown as printed receipts" };

/* build 53 home testimonials — "voices in motion": a spotlight card that flips to each review, in front of a tilted
   3D wall of every review scrolling past in three columns; a score strip per service and a link to the full page. */
function FRV_Wall({ rows }) {
  if (!rows.length) return null;
  /* ambient wall: repeat short lists so every column is full (decorative, aria-hidden) */
  let base = rows;
  while (base.length < 18) base = base.concat(rows);
  const cols = [0, 1, 2].map((c) => base.filter((_, i) => i % 3 === c));
  return (
    <div className="vw-wall" aria-hidden="true">
      <div className="vw-wall__plane">
        {cols.map((col, c) => (
          <div key={c} className={"vw-col" + (c === 1 ? " vw-col--rev" : "")} style={{ "--c": c }}>
            <div className="vw-col__track">
              {[0, 1].map((d) =>
                col.map((r, i) => (
                  <span key={r.id + d + i} className="vw-tile" style={frkVStyle(r.services[0])}>
                    <FRK_Stars n={r.rating} s={11} label={false} />
                    <em>{r.quote.length > 110 ? r.quote.slice(0, 107) + "…" : r.quote}</em>
                    <b>
                      {r.country && <FRK_Flag iso={r.country} />} {r.name}
                    </b>
                  </span>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FR_Testi() {
  const all = FR_useReviews(TESTIMONIALS);
  const [lens, setLens] = ee.useState("all");
  const rows = ee.useMemo(() => (lens === "all" ? all : all.filter((r) => r.services.includes(lens))), [all, lens]);
  const st = ee.useMemo(() => frStatsOf(all), [all]);
  const [ref, inView] = frkIn(0.12);
  const [i, setI] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  const n = rows.length;
  ee.useEffect(() => setI(0), [lens]);
  ee.useEffect(() => {
    if (i >= n) setI(0);
  }, [n]);
  ee.useEffect(() => {
    const go = () => (setLens("all"), setI(0));
    window.addEventListener("fr-review-added", go);
    return () => window.removeEventListener("fr-review-added", go);
  }, []);
  ee.useEffect(() => {
    if (!inView || hold || frkReduce() || n < 2) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(id);
  }, [inView, hold, n, lens]);
  if (!all.length) return null;
  const cur = rows[Math.min(i, Math.max(0, n - 1))];
  const world = lens !== "all" ? lens : cur ? cur.services[0] : "market-research";
  const openForm = () => window.dispatchEvent(new CustomEvent("fr-open-review", { detail: { service: lens !== "all" ? lens : null } }));
  const stepBy = (d) => setI((x) => (x + d + n) % n);
  return (
    <section ref={ref} className={"vw" + (inView ? " is-in" : "")} style={frkVStyle(world)} aria-labelledby="vx-h" onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="vw__bg" aria-hidden="true">
        <i />
        <i />
      </div>
      <FRV_Wall rows={all} />
      <div className="container vw__in">
        <header className="vw__head">
          <p className="vw__kick">
            <span className="vw__pulse" aria-hidden="true" /> Client voices
          </p>
          <h2 id="vx-h">
            What clients say, <em>service by service.</em>
          </h2>
          <div className="vw__score">
            <span className="vw__avg">
              <b>{st.all.avg ? st.all.avg.toFixed(1) : "–"}</b>
              <FRK_Stars n={st.all.avg} s={14} label={false} />
              <small>
                {st.all.n} review{st.all.n === 1 ? "" : "s"}
              </small>
            </span>
            <div className="vw__lenses" role="tablist" aria-label="Filter reviews by service">
              {FR_LENSES.map(([k, label]) => (
                <button key={k} type="button" role="tab" aria-selected={lens === k} className={"vw-lens" + (lens === k ? " is-on" : "")} style={k === "all" ? undefined : frkVStyle(k)} onClick={() => setLens(k)}>
                  {k !== "all" && <FRK_I n={FRK_V[k].ic} s={14} />}
                  <span>{label}</span>
                  <b>{k === "all" ? st.all.n : st[k].n ? st[k].avg.toFixed(1) + "★" : "–"}</b>
                </button>
              ))}
            </div>
          </div>
          <p className="vw__hint" aria-live="polite">
            <FRK_I n="eye" s={14} /> {FR_LENS_HINT[lens]}
          </p>
        </header>
        <div className={"vw__stage" + (lens !== "all" ? " vw__stage--svc" : "")}>
          {lens !== "all" ? (
            <div className="vw-show" key={lens}>
              <FRT_Show k={lens} rows={rows} inView={inView} />
            </div>
          ) : cur ? (
            <div className="vw-spot" aria-live="polite">
              <div className="vw-spot__card" key={cur.id + lens}>
                <FRV_Card r={cur} front />
              </div>
              <div className="vw-spot__nav">
                <button type="button" onClick={() => stepBy(-1)} aria-label="Previous review" disabled={n < 2}>
                  <FRK_I n="back" s={18} />
                </button>
                <span>
                  <b>{String(Math.min(i, n - 1) + 1).padStart(2, "0")}</b> / {String(n).padStart(2, "0")}
                </span>
                <button type="button" onClick={() => stepBy(1)} aria-label="Next review" disabled={n < 2}>
                  <FRK_I n="arrow" s={18} />
                </button>
              </div>
            </div>
          ) : null}
          <div className="vw-actions">
            <PpL to="/rates-reviews" className="vw-btn vw-btn--all">
              <span className="vw-btn__ic" aria-hidden="true">
                <FRK_I n="eye" s={18} />
              </span>
              <span>
                <b>See all rates &amp; reviews</b>
                <small>Scores for every service</small>
              </span>
              <FRK_I n="arrow" s={16} />
            </PpL>
            <button type="button" className="vw-btn vw-btn--rate" onClick={openForm}>
              <span className="vw-btn__ic" aria-hidden="true">
                <FRK_I n="star" s={18} />
              </span>
              <span>
                <b>Rate &amp; review us</b>
                <small>Takes under a minute</small>
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── build 54: one testimonial format per service ────────────────────────────────────────────────────────
   Each service tells its reviews in its own visual language, used on the home testimonials (service lenses)
   and in the service chapters of /rates-reviews:
     FRT_Deck      Market Research     — a fanned deck of "response cards"; the front card flies to the back
     FRT_Feed      Digital Marketing   — a phone with a live, auto-scrolling feed of review posts
     FRT_Log       IT & Development    — a terminal "review log"; entries expand like commits
     FRT_Receipts  Finance & Accounts  — receipt slips printing out of a till, scroll-snapped
   All show real reviews only (whatever FR_useReviews returns); an empty service shows FRT_Empty.          */
const frtShort = (q, n) => (q.length > n ? q.slice(0, n - 1).replace(/\s+\S*$/, "") + "…" : q);
const frtOpen = (svc) => window.dispatchEvent(new CustomEvent("fr-open-review", { detail: { service: svc || null } }));
function frtAuto(n, ms, on) {
  const [i, setI] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  ee.useEffect(() => {
    if (i >= n) setI(0);
  }, [n]);
  ee.useEffect(() => {
    if (!on || hold || n < 2 || frkReduce()) return undefined;
    const id = setInterval(() => setI((x) => (x + 1) % n), ms);
    return () => clearInterval(id);
  }, [on, hold, n, ms]);
  return [Math.min(i, Math.max(0, n - 1)), setI, setHold];
}
function FRT_Who({ r, light }) {
  return (
    <span className={"frt-who" + (light ? " frt-who--light" : "")}>
      <span className="frt-who__av" aria-hidden="true">
        {frInitials(r.name)}
        {r.country && (
          <i>
            <FRK_Flag iso={r.country} />
          </i>
        )}
      </span>
      <span className="frt-who__id">
        <b>{r.name}</b>
        {(frSub(r) || r.country) && <small>{[frSub(r), r.country ? frCName(r.country) : ""].filter(Boolean).join(" · ")}</small>}
      </span>
    </span>
  );
}
function FRT_Empty({ k }) {
  const v = FRK_V[k];
  return (
    <div className={"frt-empty frt-empty--" + v.k} style={frkVStyle(k)}>
      <span className="frt-empty__ic" aria-hidden="true">
        <FRK_I n={v.ic} s={30} />
      </span>
      <h3>No {v.name.toLowerCase()} reviews yet</h3>
      <p>Worked with our {v.short.toLowerCase()} team? Yours can be the first.</p>
      <button type="button" className="frt-btn" onClick={() => frtOpen(k)}>
        <FRK_I n="star" s={16} /> Review {v.name}
      </button>
    </div>
  );
}

/* Market Research — fanned deck of response cards */
function FRT_Deck({ rows, k, inView }) {
  const n = rows.length;
  const [i, setI, setHold] = frtAuto(n, 5200, inView);
  const vis = Math.min(n, 5);
  return (
    <div className="frt-deck" style={frkVStyle(k)} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="frt-deck__stack" aria-live="polite">
        {rows.map((r, j) => {
          const d = (j - i + n) % n;
          if (d >= vis) return null;
          return (
            <figure key={r.id} className={"frt-resp" + (d === 0 ? " is-top" : "")} style={{ "--d": d, zIndex: 10 - d }} aria-hidden={d !== 0}>
              <header>
                <span className="frt-resp__no">Response #{String(j + 1).padStart(3, "0")}</span>
                <span role="img" aria-label={`${r.rating} out of 5 stars`}>
                  <FRK_Stars n={r.rating} s={14} label={false} />
                </span>
              </header>
              <blockquote>{frtShort(r.quote, 260)}</blockquote>
              <div className="frt-resp__scale" aria-hidden="true">
                {[1, 2, 3, 4, 5].map((x) => (
                  <i key={x} className={x <= r.rating ? "is-on" : ""} />
                ))}
              </div>
              <figcaption>
                <FRT_Who r={r} />
              </figcaption>
            </figure>
          );
        })}
      </div>
      {n > 1 && (
        <div className="frt-deck__nav">
          <button type="button" onClick={() => setI((x) => (x - 1 + n) % n)} aria-label="Previous review">
            <FRK_I n="back" s={16} />
          </button>
          <span>
            <b>{i + 1}</b> / {n}
          </span>
          <button type="button" onClick={() => setI((x) => (x + 1) % n)} aria-label="Next review">
            <FRK_I n="arrow" s={16} />
          </button>
        </div>
      )}
    </div>
  );
}

/* Digital Marketing — a phone with a live feed */
function FRT_Feed({ rows, k }) {
  const loop = rows.length > 2;
  const list = loop ? [...rows, ...rows] : rows;
  return (
    <div className="frt-feed" style={frkVStyle(k)}>
      <div className="frt-phone">
        <span className="frt-phone__notch" aria-hidden="true" />
        <div className="frt-phone__top" aria-hidden="true">
          <b>Client feed</b>
          <span>
            <i /> live
          </span>
        </div>
        <div className={"frt-phone__screen" + (loop ? " is-loop" : "")} tabIndex={0} aria-label="Digital marketing reviews feed">
          <ul className="frt-phone__track" style={{ "--t": rows.length * 6 + "s" }}>
            {list.map((r, j) => (
              <li key={r.id + "-" + j} className="frt-post" aria-hidden={j >= rows.length || undefined}>
                <FRT_Who r={r} />
                <span className="frt-post__rate" role="img" aria-label={`${r.rating} out of 5 stars`}>
                  <FRK_Stars n={r.rating} s={12} label={false} /> rated {FRK_V[k].short}
                </span>
                <p>{frtShort(r.quote, 220)}</p>
                <span className="frt-post__act" aria-hidden="true">
                  <FRK_I n="heart" s={14} /> Recommends
                  <FRK_I n="send" s={14} /> Shared on frequentresearch.com
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="frt-feed__float" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((x) => (
          <i key={x} style={{ "--x": x }}>
            {x % 2 ? "★" : "♥"}
          </i>
        ))}
      </div>
    </div>
  );
}

/* IT & Development — a terminal review log */
function FRT_Log({ rows, k, inView }) {
  const n = rows.length;
  const [i, setI, setHold] = frtAuto(Math.min(n, 12), 5600, inView);
  const hash = (r) => frkHash(r.id).toString(16).padStart(7, "0").slice(0, 7);
  return (
    <div className="frt-term" style={frkVStyle(k)} onMouseEnter={() => setHold(true)} onMouseLeave={() => setHold(false)}>
      <div className="frt-term__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>reviews — it-development</span>
      </div>
      <div className="frt-term__body">
        <p className="frt-term__cmd" aria-hidden="true">
          <b>$</b> fr reviews --service=it --format=log<span className="frt-term__caret" />
        </p>
        <ol className="frt-log">
          {rows.slice(0, 12).map((r, j) => {
            const on = j === i;
            return (
              <li key={r.id} className={on ? "is-on" : ""}>
                <button type="button" aria-expanded={on} onClick={() => setI(j)}>
                  <span className="frt-log__hash" aria-hidden="true">
                    {hash(r)}
                  </span>
                  <span className="frt-log__rate" role="img" aria-label={`${r.rating} out of 5 stars`}>
                    {"★".repeat(r.rating)}
                    <em>{"★".repeat(5 - r.rating)}</em>
                  </span>
                  <span className="frt-log__who">
                    {r.name}
                    {r.company ? <small> @ {r.company}</small> : null}
                  </span>
                  <span className="frt-log__ok" aria-hidden="true">
                    {r.rating >= 4 ? "passed" : r.rating === 3 ? "warn" : "failed"}
                  </span>
                </button>
                {on && (
                  <div className="frt-log__msg">
                    <p>{r.quote}</p>
                    <FRT_Who r={r} light />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
        <p className="frt-term__sum" aria-hidden="true">
          ✓ {n} review{n === 1 ? "" : "s"} · avg {(rows.reduce((s, r) => s + r.rating, 0) / Math.max(1, n)).toFixed(1)}/5
        </p>
      </div>
    </div>
  );
}

/* Finance & Accounts — receipt slips printing from a till */
function FRT_Receipts({ rows, k }) {
  const ref = ee.useRef(null);
  const by = (d) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: d * (el.clientWidth * 0.8), behavior: frkReduce() ? "auto" : "smooth" });
  };
  return (
    <div className="frt-till" style={frkVStyle(k)}>
      <div className="frt-till__head" aria-hidden="true">
        <span className="frt-till__slot" />
      </div>
      <ul ref={ref} className="frt-slips" tabIndex={0} aria-label="Finance and accounts reviews">
        {rows.map((r, j) => (
          <li key={r.id} className="frt-slip" style={{ "--j": j }}>
            <header>
              <b>FREQUENT RESEARCH</b>
              <small>Finance &amp; Accounts · No. {String(j + 1).padStart(4, "0")}</small>
            </header>
            <p>{frtShort(r.quote, 240)}</p>
            <dl>
              <div>
                <dt>Client</dt>
                <dd>{r.name}</dd>
              </div>
              {r.country && (
                <div>
                  <dt>Country</dt>
                  <dd>
                    <FRK_Flag iso={r.country} /> {frCName(r.country)}
                  </dd>
                </div>
              )}
              <div className="frt-slip__tot">
                <dt>Rating</dt>
                <dd role="img" aria-label={`${r.rating} out of 5 stars`}>
                  <FRK_Stars n={r.rating} s={12} label={false} /> {r.rating}.0
                </dd>
              </div>
            </dl>
            <span className="frt-slip__bar" aria-hidden="true">
              {Array.from({ length: 26 }, (_, x) => (
                <i key={x} style={{ "--w": ((frkHash(r.id + x) % 3) + 1) }} />
              ))}
            </span>
          </li>
        ))}
      </ul>
      {rows.length > 1 && (
        <div className="frt-till__nav">
          <button type="button" onClick={() => by(-1)} aria-label="Previous receipts">
            <FRK_I n="back" s={16} />
          </button>
          <button type="button" onClick={() => by(1)} aria-label="More receipts">
            <FRK_I n="arrow" s={16} />
          </button>
        </div>
      )}
    </div>
  );
}

function FRT_Show({ k, rows, inView = true }) {
  if (!rows.length) return <FRT_Empty k={k} />;
  const t = FRK_V[k].k;
  if (t === "mr") return <FRT_Deck rows={rows} k={k} inView={inView} />;
  if (t === "dm") return <FRT_Feed rows={rows} k={k} />;
  if (t === "it") return <FRT_Log rows={rows} k={k} inView={inView} />;
  return <FRT_Receipts rows={rows} k={k} />;
}

export { FRT_Show, FRV_Card, FR_Testi, FR_useReviews, frAddMine, frCName, frClean, frInitials, frStatsOf };
