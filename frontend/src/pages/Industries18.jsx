/*
 * Build 65 update 18 — Industries & Case Studies, redesigned (Kunal, 1 November 2026: "current one is too bad… dull").
 *   /industries-case-studies                       IN6_Hub     3D industry carousel, coverage atlas, story arc, sector shelves
 *   /industries-case-studies/:industry             IN6_Sector  3D case deck, insight panels, market map, case tickets
 *   /industries-case-studies/:industry/:caseSlug   CX6_Page    new hero with a live 15-point dial; body reuses CX5_Body
 * Prefix in6- / cx6- (styles industries18.css). Calm palette by industry group (no per-industry rainbow hues).
 * Coverage concept: inspired by the old region map (tabs, mix, flags) but rebuilt as a dotted atlas with flight arcs from
 * our home market, pulsing markers sized by case studies, a region dial and a passport-stamp flag river.
 * Data: INDUSTRIES / INDUSTRY_GROUPS / findIndustry / loadCases (cases), IN5 profiles, CX5_FACTORS / cx5Build, R18_DATA (regions), IN18_MAP (marker positions).
 * Loops move transform / opacity only and pause off screen (AB17_Sec / .is-vis).
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useParams } from 'react-router-dom';
import { IndustryIcon, useJsonLd } from '../app/home/HeroParts.jsx';
import { INDUSTRIES, INDUSTRY_GROUPS, findIndustry } from '../app/data/industries.jsx';
import { CtaSectionBlock } from '../app/shared/CoreParts.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { NotFoundPage, usePageMeta } from '../app/SiteApp.jsx';
import { FRK_I, FRK_V, frkVStyle } from '../components/site/FrKit.jsx';
import { K5_I, K5_Rv, k5Reduce } from '../components/site/Kit65.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { cx5CasePdf, cx5SectorPack } from '../components/site/CasePdf65.jsx';
import { pc5FlagUrl, pc5UseFlags } from '../data/PanelCountries65.jsx';
import { in5Look, in5Prof } from '../data/Industries65.jsx';
import { CX5_FACTORS, cx5Build } from '../data/CaseFactors65.jsx';
import { csxVertical } from './CaseStudy.jsx';
import { CX5_Body, IN5_Crumbs, IN5_TEAMS, in5UseCases } from './Industries65.jsx';
import { AB17_Sec, ab17Snd } from './About17.jsx';
import { R18_DATA } from '../data/Reach18.jsx';
import { AB18_REG } from './About18.jsx';
import { IN18_MAP } from '../data/Map18.jsx';
import { countryName, loadCases } from '../app/pages/IndustriesPages.jsx';

const IN6_GRP = {
  resources: { c: "#0E9C88", c2: "#9FE7DC", ic: "leaf" },
  industrial: { c: "#2F6BFF", c2: "#8FB0FF", ic: "cpu" },
  energy: { c: "#D99A2B", c2: "#FFC27A", ic: "bolt" },
  public: { c: "#6D4AFF", c2: "#BBAAFF", ic: "shield" },
  tech: { c: "#2F6BFF", c2: "#9FE7DC", ic: "globe" },
  consumer: { c: "#C8577E", c2: "#F2A9C1", ic: "heart" },
  media: { c: "#6D4AFF", c2: "#F2A9C1", ic: "play" },
  services: { c: "#0E9C88", c2: "#8FB0FF", ic: "handshake" },
};
const IN6_REG = AB18_REG;
const in6X = () => INDUSTRIES;
const in6G = () => INDUSTRY_GROUPS;
const in6Grp = (key) => IN6_GRP[key] || IN6_GRP.industrial;
const in6Iso = (m) => (m === "UK" ? "GB" : m);
const in6Name = (iso) => countryName(iso === "GB" ? "UK" : iso);
const in6Fmt = (n) => (n || 0).toLocaleString("en-US");
const in6Flag = (flags, iso) => (flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "");
const in6Snd = () => ab17Snd("tab");
/* iso -> region name, from the panel workbooks (Morocco appears in one case study and sits in MEA) */
const in6RegionOf = (() => {
  let m = null;
  return (iso) => {
    if (!m) {
      m = { MA: "Middle East & Africa" };
      const D = R18_DATA;
      D.regions.forEach(([r, cs]) => cs.forEach((c) => (m[c[1]] = r)));
    }
    return m[iso] || "Asia-Pacific";
  };
})();

/* every case study of every industry (bundled, so this is cheap); cached for the session */
let IN6_ALL = null;
let IN6_P = null;
function in6LoadAll() {
  if (!IN6_P)
    IN6_P = Promise.all(in6X().map((x) => loadCases(x.slug).then((cs) => [x.slug, cs || []], () => [x.slug, []]))).then((r) => (IN6_ALL = Object.fromEntries(r)));
  return IN6_P;
}
function in6UseAll() {
  const [d, setD] = ee.useState(IN6_ALL);
  ee.useEffect(() => {
    if (d) return undefined;
    let on = true;
    in6LoadAll().then((v) => on && setD(v));
    return () => {
      on = false;
    };
  }, []);
  return d;
}
/* market -> { n cases, industries } */
function in6Markets(all) {
  const M = {};
  Object.entries(all || {}).forEach(([slug, cs]) =>
    cs.forEach((c) =>
      (c.markets || []).forEach((m) => {
        const iso = in6Iso(m);
        if (!M[iso]) M[iso] = { iso, n: 0, inds: new Set() };
        M[iso].n++;
        M[iso].inds.add(slug);
      }),
    ),
  );
  return M;
}

/* ── shared: dotted atlas with flight arcs and pulsing markers ─────────────────────── */
const IN6_HOME = "IN";
function IN6_Atlas({ markets, active, flags, onPick, small }) {
  const P = IN18_MAP;
  const R = 37.75; /* the map's height in % of its width */
  const home = P[IN6_HOME] || [70, 40];
  const list = Object.keys(P).filter((iso) => markets[iso] || !small);
  const max = Math.max(1, ...Object.values(markets).map((m) => m.n));
  const isOn = (iso) => !active || in6RegionOf(iso) === active;
  return (
    <div className={"in6-atlas" + (small ? " in6-atlas--s" : "")}>
      <img className="in6-atlas__dots" src="__IMG:in18/world-dots__" alt="" decoding="async" />
      <svg className="in6-atlas__arcs" viewBox={"0 0 100 " + R} preserveAspectRatio="none" aria-hidden="true" key={active || "all"}>
        <defs>
          <linearGradient id={"in6g" + (small ? "s" : "")} x1="0" x2="1">
            <stop offset="0" stopColor="#FFC27A" />
            <stop offset=".5" stopColor="#BBAAFF" />
            <stop offset="1" stopColor="#9FE7DC" />
          </linearGradient>
        </defs>
        {list
          .filter((iso) => iso !== IN6_HOME && markets[iso] && isOn(iso))
          .map((iso, i) => {
            const [x, y] = P[iso];
            const x0 = home[0],
              y0 = (home[1] * R) / 100,
              y1 = (y * R) / 100;
            const dx = x - x0;
            const lift = Math.min(14, Math.abs(dx) * 0.28 + 2);
            const d = `M${x0} ${y0} Q${(x0 + x) / 2} ${Math.min(y0, y1) - lift} ${x} ${y1}`;
            return <path key={iso} d={d} pathLength="1" style={{ "--i": i }} stroke={"url(#in6g" + (small ? "s" : "") + ")"} />;
          })}
      </svg>
      {list.map((iso) => {
        const m = markets[iso];
        const [x, y] = P[iso];
        const s = m ? 0.75 + Math.sqrt(m.n / max) * 0.9 : 0.55;
        const reg = IN6_REG[in6RegionOf(iso)] || {};
        return (
          <button
            key={iso}
            type="button"
            className={"in6-mk" + (m ? " has-cs" : "") + (isOn(iso) ? "" : " is-dim") + (iso === IN6_HOME ? " is-home" : "")}
            style={{ left: x + "%", top: y + "%", "--s": s, "--c": reg.c2 || "#9FE7DC" }}
            onClick={onPick ? () => onPick(in6RegionOf(iso)) : undefined}
            tabIndex={onPick ? 0 : -1}
            aria-label={in6Name(iso) + (m ? ": " + m.n + " case studies" : "")}
          >
            <i className="in6-mk__pulse" />
            <i className="in6-mk__dot" />
            <span className="in6-mk__tip">
              {in6Flag(flags, iso) ? <img src={in6Flag(flags, iso)} alt="" /> : null}
              <b>{in6Name(iso)}</b>
              {m ? <small>{m.n} case studies</small> : <small>panel market</small>}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── hub ───────────────────────────────────────────────────────────────────────────── */
function IN6_Carousel() {
  const X = in6X();
  const pick = X.filter((_, i) => i % 5 === 1).slice(0, 12);
  return (
    <div className="in6-car" aria-hidden="true">
      <div className="in6-car__floor" />
      <div className="in6-car__spin">
        {pick.map((x, i) => {
          const L = in6Grp(x.group);
          return (
            <span key={x.slug} className="in6-car__card" style={{ transform: "rotateY(" + i * (360 / pick.length) + "deg) translateZ(var(--cr))", "--c": L.c, "--c2": L.c2 }}>
              <span className="in6-car__ic">
                <IndustryIcon name={x.icon} size={26} />
              </span>
              <b>{x.name}</b>
              <small>10 case studies</small>
            </span>
          );
        })}
      </div>
      <div className="in6-car__core">
        <b>{X.length || 58}</b>
        <small>industries</small>
      </div>
    </div>
  );
}

function IN6_Ticker() {
  const X = in6X();
  const rows = [X]; /* one row: half the moving elements of two rows, same 58 industries */
  return (
    <div className="in6-tick" aria-hidden="true">
      {rows.map((row, k) => (
        <div key={k} className={"in6-tick__row in6-tick__row--" + k}>
          <div className="in6-tick__run">
            {[...row, ...row].map((x, i) => {
              const L = in6Grp(x.group);
              return (
                <span key={i} style={{ "--c": L.c, "--c2": L.c2 }}>
                  <IndustryIcon name={x.icon} size={18} />
                  {x.name}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function IN6_Coverage() {
  const all = in6UseAll();
  const flags = pc5UseFlags();
  const D = R18_DATA;
  const [reg, setReg] = ee.useState(null);
  const M = ee.useMemo(() => in6Markets(all), [all]);
  const regs = D.regions.map(([r, cs]) => {
    const isos = cs.map((c) => c[1]).concat(r === "Middle East & Africa" ? ["MA"] : []);
    const n = isos.reduce((a, iso) => a + (M[iso] ? M[iso].n : 0), 0);
    return { r, cs, n, isos };
  });
  const total = regs.reduce((a, x) => a + x.n, 0) || 1;
  let acc = 0;
  const conic = regs.map((x) => {
    const c = (IN6_REG[x.r] || {}).c1 || "#2F6BFF";
    const a = (acc / total) * 360;
    acc += x.n;
    return `${c} ${a}deg ${(acc / total) * 360}deg`;
  });
  const cur = reg ? regs.find((x) => x.r === reg) : null;
  const pick = (r) => {
    setReg(r === reg ? null : r);
    in6Snd();
  };
  const panel = (cur ? cur.isos : regs.flatMap((x) => x.isos)).map((iso) => ({ iso, n: M[iso] ? M[iso].n : 0 })).sort((a, b) => b.n - a.n || in6Name(a.iso).localeCompare(in6Name(b.iso)));
  const nMk = Object.keys(M).length;
  return (
    <AB17_Sec className="in6-cov" aria-labelledby="in6-cov-h">
      <div className="in6-cov__sky" aria-hidden="true">
        <i className="ab17-aur ab17-aur--a" />
        <i className="ab17-aur ab17-aur--b" />
      </div>
      <div className="container">
        <div className="in6-head in6-head--c in6-head--dk">
          <span className="in6-kick">
            <K5_I n="globe" s={14} /> Where the stories happened
          </span>
          <h2 id="in6-cov-h" className="in6-h2">
            {nMk || 22} markets with case studies. <em>55 countries on our panels.</em>
          </h2>
          <p className="in6-sub">Every line starts in India, where we're based, and ends in a market where we've delivered a case study. Pick a region to follow its routes.</p>
        </div>
        <div className="in6-cov__tabs" role="tablist" aria-label="Regions">
          <button type="button" role="tab" aria-selected={!reg} className={"in6-rtab" + (!reg ? " is-on" : "")} style={{ "--c1": "#2F6BFF", "--c2": "#6D4AFF" }} onClick={() => pick(null)}>
            <K5_I n="globe" s={15} /> World <em>{total}</em>
          </button>
          {regs.map((x) => {
            const m = IN6_REG[x.r] || {};
            return (
              <button key={x.r} type="button" role="tab" aria-selected={reg === x.r} className={"in6-rtab" + (reg === x.r ? " is-on" : "")} style={{ "--c1": m.c1, "--c2": m.c2 }} onClick={() => pick(x.r)}>
                <K5_I n={m.ic || "pin"} s={15} /> {x.r} <em>{x.n}</em>
              </button>
            );
          })}
        </div>
        <div className="in6-cov__grid">
          <div className="in6-cov__map">
            <IN6_Atlas markets={M} active={reg} flags={flags} onPick={pick} />
          </div>
          <aside className="in6-dial" aria-live="polite">
            <div className="in6-dial__ring" style={{ background: "conic-gradient(" + conic.join(",") + ")" }}>
              <div className="in6-dial__in">
                <b>{cur ? Math.round((cur.n / total) * 100) + "%" : in6Fmt(total)}</b>
                <small>{cur ? "of our case-study markets" : "market mentions in case studies"}</small>
              </div>
              <i className="in6-dial__sweep" />
            </div>
            <h3>{cur ? cur.r : "All regions"}</h3>
            <p>
              {cur ? cur.cs.length + " panel countries · " + cur.n + " case-study mentions" : D.regions.reduce((a, [, cs]) => a + cs.length, 0) + " panel countries in " + D.regions.length + " regions"}
            </p>
            <ul className="in6-dial__list" key={reg || "all"}>
              {panel.slice(0, cur ? 24 : 12).map(({ iso, n }, i) => (
                <li key={iso} style={{ "--i": i }}>
                  {in6Flag(flags, iso) ? <img src={in6Flag(flags, iso)} alt="" /> : <i />}
                  <span>{in6Name(iso)}</span>
                  {n ? <em>{n}</em> : <small>panel</small>}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <div className="in6-stamps" aria-hidden="true">
        <div className="in6-stamps__run">
          {[...D.regions.flatMap(([r, cs]) => cs.map((c) => [c, r])), ...D.regions.flatMap(([r, cs]) => cs.map((c) => [c, r]))].map(([c, r], i) => (
            <span key={i} className="in6-stamp" style={{ "--c": (IN6_REG[r] || {}).c1, "--t": ((i * 37) % 9) - 4 + "deg" }}>
              {in6Flag(flags, c[1]) ? <img src={in6Flag(flags, c[1])} alt="" /> : null}
              <b>{c[0]}</b>
              <small>{(IN6_REG[r] || {}).short || r}</small>
            </span>
          ))}
        </div>
      </div>
    </AB17_Sec>
  );
}

function IN6_Arc() {
  const F = CX5_FACTORS;
  return (
    <AB17_Sec className="in6-arc" aria-labelledby="in6-arc-h">
      <div className="container">
        <div className="in6-head">
          <span className="in6-kick">
            <K5_I n="layers" s={14} /> The story arc
          </span>
          <h2 id="in6-arc-h" className="in6-h2">
            Every case study answers <em>the same 15 questions.</em>
          </h2>
          <p className="in6-sub">So you can compare a farm survey with a fintech launch, point by point. Each one downloads as its own illustrated PDF.</p>
        </div>
        <ol className="in6-arc__path">
          {F.map(([k, t, ic], i) => (
            <li key={k} style={{ "--i": i }} className={"in6-arc__st in6-arc__st--" + ["mr", "dm", "it", "af", "gold"][Math.floor(i / 3)]}>
              <span className="in6-arc__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="in6-arc__ic">
                <K5_I n={ic} s={20} />
              </span>
              <b>{t}</b>
            </li>
          ))}
        </ol>
      </div>
    </AB17_Sec>
  );
}

function IN6_Shelves() {
  const X = in6X();
  const G = in6G();
  const all = in6UseAll();
  const flags = pc5UseFlags();
  const [g, setG] = ee.useState("all");
  const [q, setQ] = ee.useState("");
  const norm = (s) => (s || "").toLowerCase();
  const shown = X.filter((x) => (g === "all" || x.group === g) && (!q.trim() || norm(x.name + " " + x.blurb + " " + (x.topics || []).join(" ")).includes(norm(q.trim()))));
  const pick = (k) => {
    setG(k);
    in6Snd();
  };
  return (
    <AB17_Sec className="in6-shelf" aria-labelledby="in6-shelf-h" id="in6-industries">
      <div className="container">
        <div className="in6-shelf__top">
          <div className="in6-head">
            <span className="in6-kick">
              <K5_I n="chart" s={14} /> Choose an industry
            </span>
            <h2 id="in6-shelf-h" className="in6-h2">
              {G.length || 8} sectors. <em>{X.length || 58} industries.</em>
            </h2>
          </div>
          <label className="in6-search">
            <K5_I n="search" s={17} />
            <span className="frk-sr">Search industries</span>
            <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search an industry or topic, e.g. EV, dairy, fintech" />
          </label>
        </div>
        <div className="in6-shelf__body">
          <nav className="in6-gnav" aria-label="Sectors">
            <button type="button" className={"in6-gnav__b" + (g === "all" ? " is-on" : "")} style={{ "--c": "#2F6BFF", "--c2": "#6D4AFF" }} onClick={() => pick("all")} aria-pressed={g === "all"}>
              <span>
                <K5_I n="layers" s={18} />
              </span>
              All industries <em>{X.length}</em>
            </button>
            {G.map((x) => {
              const L = in6Grp(x.key);
              return (
                <button key={x.key} type="button" className={"in6-gnav__b" + (g === x.key ? " is-on" : "")} style={{ "--c": L.c, "--c2": L.c2 }} onClick={() => pick(x.key)} aria-pressed={g === x.key}>
                  <span>
                    <K5_I n={L.ic} s={18} />
                  </span>
                  {x.name} <em>{X.filter((y) => y.group === x.key).length}</em>
                </button>
              );
            })}
          </nav>
          <div>
            <ul className="in6-grid" key={g + "|" + q.trim()}>
              {shown.map((x, i) => {
                const L = in6Grp(x.group);
                const cs = (all && all[x.slug]) || [];
                const mk = [...new Set(cs.flatMap((c) => (c.markets || []).map(in6Iso)))];
                return (
                  <li key={x.slug} style={{ "--c": L.c, "--c2": L.c2, "--i": Math.min(i, 18) }}>
                    <HmLink to={"/industries-case-studies/" + x.slug} className="in6-card">
                      <span className="in6-card__glow" aria-hidden="true" />
                      <span className="in6-card__top">
                        <span className="in6-card__ic">
                          <IndustryIcon name={x.icon} size={24} />
                        </span>
                        <span className="in6-card__n">
                          <b>{cs.length || 10}</b> case studies
                        </span>
                      </span>
                      <b className="in6-card__t">{x.name}</b>
                      <span className="in6-card__d">{x.blurb}</span>
                      <span className="in6-card__tags">
                        {(x.topics || []).slice(0, 3).map((t) => (
                          <i key={t}>{t}</i>
                        ))}
                      </span>
                      <span className="in6-card__ft">
                        <span className="in6-card__flags">
                          {mk.slice(0, 5).map((iso) => (in6Flag(flags, iso) ? <img key={iso} src={in6Flag(flags, iso)} alt="" title={in6Name(iso)} /> : null))}
                          {mk.length > 5 ? <em>+{mk.length - 5}</em> : null}
                        </span>
                        <span className="in6-card__go">
                          Explore <K5_I n="arrow" s={15} />
                        </span>
                      </span>
                    </HmLink>
                  </li>
                );
              })}
            </ul>
            {!shown.length ? <p className="in6-none">No industry matches “{q}”.</p> : null}
          </div>
        </div>
      </div>
    </AB17_Sec>
  );
}

function IN6_Hub() {
  usePageMeta("Industries & Case Studies", "Frequent Research works across 58 industries in 55 countries. Every case study follows the same 15-point structure, from industry overview and client challenge to methodology, findings, business impact and next steps.");
  const X = in6X();
  const all = in6UseAll();
  const nCases = all ? Object.values(all).reduce((a, cs) => a + cs.length, 0) : X.length * 10;
  const nMk = all ? Object.keys(in6Markets(all)).length : 22;
  return (
    <div className="in6 ab17">
      <section className="in6-hero" aria-labelledby="in6-h1">
        <div className="in6-hero__sky" aria-hidden="true">
          <i className="ab17-aur ab17-aur--a" />
          <i className="ab17-aur ab17-aur--b" />
          <i className="ab17-aur ab17-aur--c" />
          <i className="in6-hero__grid" />
        </div>
        <div className="container in6-hero__in">
          <div className="in6-hero__copy">
            <IN5_Crumbs />
            <span className="in6-badge">
              <i /> Industries & case studies
            </span>
            <HeroH1 id="in6-h1" className="in6-h1">
              <span>Every industry</span>
              <span>
                has a <em>story.</em>
              </span>
              <span className="in6-h1__s">We've written {in6Fmt(nCases)} of them.</span>
            </HeroH1>
            <p className="in6-lead">From dairy farms to data centres: real briefs, the methods we used, what we found and what changed for the client. All in the same 15 points, all free to download.</p>
            <div className="in6-ctas">
              <a href="#in6-industries" className="ab17-btn ab17-btn--glow">
                Find your industry <K5_I n="arrow" s={16} />
              </a>
              <a href="#in6-cov-h" className="ab17-btn ab17-btn--glass">
                <K5_I n="globe" s={16} /> See where we've worked
              </a>
            </div>
            <ul className="in6-stats">
              {[
                [X.length || 58, "industries", "#8FB0FF"],
                [nCases, "case studies", "#BBAAFF"],
                [nMk, "markets", "#9FE7DC"],
                [15, "points each", "#FFC27A"],
              ].map(([n, t, c], i) => (
                <li key={t} style={{ "--c": c, "--i": i }}>
                  <b>{in6Fmt(n)}</b>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <IN6_Carousel />
        </div>
        <IN6_Ticker />
      </section>
      <IN6_Shelves />
      <IN6_Coverage />
      <IN6_Arc />
      <CtaSectionBlock title="Working in one of these industries?" text="Tell us about your objectives. We'll recommend an approach and confirm feasibility within one working day." />
    </div>
  );
}

/* ── sector ────────────────────────────────────────────────────────────────────────── */
function IN6_Deck({ list, ind }) {
  const [k, setK] = ee.useState(0);
  const ref = ee.useRef(null);
  const n = Math.min(5, list.length || 3);
  ee.useEffect(() => {
    if (n < 2) return undefined;
    let vis = true;
    const io = window.IntersectionObserver ? new IntersectionObserver(([e]) => (vis = e.isIntersecting)) : null;
    if (io && ref.current) io.observe(ref.current);
    const t = setInterval(() => vis && !document.hidden && setK((v) => (v + 1) % n), 3600);
    return () => (clearInterval(t), io && io.disconnect());
  }, [n]);
  const vOf = (c) => csxVertical(c);
  return (
    <div ref={ref} className="in6-deck" aria-hidden="true">
      {Array.from({ length: n }).map((_, i) => {
        const c = list[i];
        const pos = (i - k + n) % n;
        const W = c ? FRK_V[vOf(c)] : null;
        return (
          <span key={i} className={"in6-deck__card" + (pos === 0 ? " is-top" : "")} style={{ "--p": pos }}>
            <span className="in6-deck__top">
              <span className="in6-deck__ic">
                <IndustryIcon name={ind.icon} size={22} />
              </span>
              <small>Case study {String(i + 1).padStart(2, "0")}</small>
              {W ? <em>{W.short}</em> : null}
            </span>
            <b>{c ? c.title : ind.name}</b>
            <span className="in6-deck__bar">
              <i />
            </span>
          </span>
        );
      })}
    </div>
  );
}

function IN6_Sector() {
  const { industry: slug } = useParams();
  const ind = findIndustry(slug);
  const cases = in5UseCases(ind && ind.slug);
  const flags = pc5UseFlags();
  const [team, setTeam] = ee.useState("all");
  const [gate, setGate] = ee.useState(null);
  const P = in5Prof(slug);
  usePageMeta(ind ? `${ind.name} Case Studies & Research` : "Industry", ind ? `${ind.name}: ${P[0] || ind.blurb}`.slice(0, 158) : "");
  if (!ind) return <NotFoundPage />;
  const G = in6G();
  const grp = G.find((y) => y.key === ind.group) || {};
  const L = in6Grp(ind.group);
  const list = cases || [];
  const vOf = (c) => csxVertical(c);
  const shown = list.filter((c) => team === "all" || vOf(c) === team);
  const M = in6Markets({ [slug]: list });
  const isos = Object.keys(M).sort((a, b) => M[b].n - M[a].n);
  const nTeams = new Set(list.map(vOf)).size;
  const siblings = in6X().filter((x) => x.group === ind.group && x.slug !== ind.slug);
  const TEAMS = IN5_TEAMS;
  return (
    <div className="in6 in6-sec ab17" style={{ "--c": L.c, "--c2": L.c2 }}>
      <section className="in6-hero in6-hero--sec" aria-labelledby="in6-sh1">
        <div className="in6-hero__sky" aria-hidden="true">
          <i className="in6-blob in6-blob--a" />
          <i className="in6-blob in6-blob--b" />
          <i className="in6-hero__grid" />
          <span className="in6-hero__glyph">
            <IndustryIcon name={ind.icon} size={420} />
          </span>
        </div>
        <div className="container in6-hero__in">
          <div className="in6-hero__copy">
            <IN5_Crumbs ind={ind} />
            <span className="in6-badge">
              <K5_I n={L.ic} s={14} /> {grp.name}
            </span>
            <HeroH1 id="in6-sh1" className="in6-h1 in6-h1--sec">
              <span>{ind.name}</span>
              <span className="in6-h1__s">
                <em>research, results and real stories.</em>
              </span>
            </HeroH1>
            <p className="in6-lead">{P[0] || ind.blurb}</p>
            <div className="in6-ctas">
              <a href="#in6-cases" className="ab17-btn ab17-btn--glow">
                See the case studies <K5_I n="arrow" s={16} />
              </a>
              <button type="button" className="ab17-btn ab17-btn--glass" onClick={() => setGate(true)}>
                  <K5_I n="doc" s={16} /> Download all as one PDF
                </button>
            </div>
            <ul className="in6-stats">
              {[
                [list.length || 10, "case studies", "#8FB0FF"],
                [isos.length || 1, isos.length === 1 ? "market" : "markets", "#9FE7DC"],
                [nTeams || 1, nTeams === 1 ? "team involved" : "teams involved", "#FFC27A"],
              ].map(([n, t, c], i) => (
                <li key={t} style={{ "--c": c, "--i": i }}>
                  <b>{n}</b>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <IN6_Deck list={list} ind={ind} />
        </div>
      </section>

      <AB17_Sec className="in6-ins" aria-label={ind.name + " profile"}>
        <div className="container">
          <div className="in6-ins__grid">
            {[
              ["spark", "What is shaping the industry", P[1], "ul"],
              ["users", "Who we research", P[2], "chips"],
              ["target", "Questions we answer", P[3], "ol"],
            ].map(([ic, t, items, kind], i) => (
              <article key={t} className={"in6-panel in6-panel--" + kind} style={{ "--i": i }}>
                <span className="in6-panel__ic">
                  <K5_I n={ic} s={22} />
                </span>
                <h2>{t}</h2>
                {kind === "chips" ? (
                  <p className="in6-chips">
                    {(items || []).map((x) => (
                      <span key={x}>{x}</span>
                    ))}
                  </p>
                ) : (
                  <ol>
                    {(items || []).map((x, j) => (
                      <li key={x}>
                        <i>{kind === "ol" ? "Q" + (j + 1) : String(j + 1).padStart(2, "0")}</i>
                        {x}
                      </li>
                    ))}
                  </ol>
                )}
              </article>
            ))}
          </div>
          <div className="in6-mkts">
            <div className="in6-mkts__map">
              <IN6_Atlas markets={M} flags={flags} small />
            </div>
            <div className="in6-mkts__side">
              <span className="in6-kick">
                <K5_I n="globe" s={14} /> Markets in these case studies
              </span>
              <ul>
                {isos.map((iso, i) => (
                  <li key={iso} style={{ "--i": i }}>
                    {in6Flag(flags, iso) ? <img src={in6Flag(flags, iso)} alt="" /> : <i />}
                    <span>{in6Name(iso)}</span>
                    <em>{M[iso].n}</em>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </AB17_Sec>

      <AB17_Sec className="in6-cases" id="in6-cases" aria-labelledby="in6-cases-h">
        <div className="container">
          <div className="in6-shelf__top">
            <div className="in6-head">
              <span className="in6-kick">
                <K5_I n="book" s={14} /> Case studies
              </span>
              <h2 id="in6-cases-h" className="in6-h2">
                {ind.name} <em>case studies.</em>
              </h2>
            </div>
            <div className="in6-teams" role="toolbar" aria-label="Filter by team">
              {TEAMS.map(([k, t, ic]) => {
                const n = k === "all" ? list.length : list.filter((c) => vOf(c) === k).length;
                if (k !== "all" && !n) return null;
                return (
                  <button key={k} type="button" className={team === k ? "is-on" : ""} aria-pressed={team === k} onClick={() => (setTeam(k), in6Snd())}>
                    <K5_I n={ic} s={14} /> {t} <em>{n}</em>
                  </button>
                );
              })}
            </div>
          </div>
          {!cases ? (
            <p className="in6-none">Loading case studies…</p>
          ) : (
            <ol className="in6-tix" key={team}>
              {shown.map((c, i) => {
                const W = FRK_V[vOf(c)];
                return (
                  <li key={c.slug} style={{ "--i": i }}>
                    <HmLink to={`/industries-case-studies/${ind.slug}/${c.slug}`} className="in6-tik">
                      <span className="in6-tik__stub">
                        <b>{String(list.indexOf(c) + 1).padStart(2, "0")}</b>
                        <small>case</small>
                      </span>
                      <span className="in6-tik__main">
                        <span className="in6-tik__tags">
                          <span className="in6-tik__v" style={frkVStyle(vOf(c))}>
                            <FRK_I n={W.ic} s={13} /> {W.short}
                          </span>
                          {c.verified === false ? <span className="in6-tik__ill">Illustrative</span> : null}
                        </span>
                        <b className="in6-tik__t">{c.title}</b>
                        <span className="in6-tik__c">{(c.client || "").replace(/^Illustrative · /, "")}</span>
                        <span className="in6-tik__meta">
                          {(c.markets || []).slice(0, 4).map((m) => (in6Flag(flags, in6Iso(m)) ? <img key={m} src={in6Flag(flags, in6Iso(m))} alt="" title={in6Name(in6Iso(m))} /> : null))}
                          {c.timeline ? (
                            <em>
                              <K5_I n="clock" s={13} /> {c.timeline}
                            </em>
                          ) : null}
                        </span>
                      </span>
                      <span className="in6-tik__go">
                        <K5_I n="arrow" s={18} />
                      </span>
                    </HmLink>
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </AB17_Sec>

      {siblings.length ? (
        <section className="in6-sib" aria-labelledby="in6-sib-h">
          <div className="container">
            <h2 id="in6-sib-h" className="in6-h3">
              More in {grp.name ? grp.name.toLowerCase() : "this sector"}
            </h2>
            <div className="in6-sib__row">
              {siblings.map((x) => (
                <HmLink key={x.slug} to={"/industries-case-studies/" + x.slug} className="in6-sib__a">
                  <IndustryIcon name={x.icon} size={18} /> {x.name}
                </HmLink>
              ))}
              <HmLink to="/industries-case-studies" className="in6-sib__a in6-sib__a--all">
                All {in6X().length} industries <K5_I n="arrow" s={15} />
              </HmLink>
            </div>
          </div>
        </section>
      ) : null}
      <CtaSectionBlock title={`Planning work in ${ind.name.toLowerCase()}?`} text="Tell us about your objectives. We'll recommend an approach and confirm feasibility within one working day." />
      {gate && (
        <FRG_Gate world="market-research" kind="Case study pack" title={ind.name + " case studies"} icon="file" resource={{ type: "case-study-pack", key: ind.slug, title: ind.name + " case studies" }} extra={{ industry: ind.name }} onUnlock={(lead) => cx5SectorPack(ind.slug, lead)} onClose={() => setGate(null)} />
      )}
    </div>
  );
}

/* ── case study ────────────────────────────────────────────────────────────────────── */
function CX6_Dial({ act, go }) {
  const F = CX5_FACTORS;
  const ai = Math.max(0, F.findIndex((f) => f[0] === act));
  const R = 118;
  return (
    <div className="cx6-dial" aria-hidden="true">
      <svg viewBox="-150 -150 300 300">
        <circle r={R} className="cx6-dial__track" />
        <circle r={R} className="cx6-dial__prog" pathLength="1" style={{ strokeDashoffset: 1 - (ai + 1) / F.length }} />
      </svg>
      {F.map(([k, t, ic], i) => {
        const a = (i / F.length) * Math.PI * 2 - Math.PI / 2;
        return (
          <button key={k} type="button" tabIndex={-1} className={"cx6-dial__p" + (i <= ai ? " is-done" : "") + (i === ai ? " is-on" : "")} style={{ left: 50 + (R / 3) * Math.cos(a) + "%", top: 50 + (R / 3) * Math.sin(a) + "%" }} onClick={go(k)} title={t}>
            <K5_I n={ic} s={14} />
          </button>
        );
      })}
      <div className="cx6-dial__core">
        <b>{String(ai + 1).padStart(2, "0")}</b>
        <small>of {F.length}</small>
        <span>{(F[ai] || [])[1]}</span>
      </div>
    </div>
  );
}

function CX6_Page() {
  const { industry: slug, caseSlug } = useParams();
  const ind = findIndustry(slug);
  const cases = in5UseCases(ind && ind.slug);
  const flags = pc5UseFlags();
  const [gate, setGate] = ee.useState(false);
  const [act, setAct] = ee.useState("overview");
  const cs = cases ? cases.find((x) => x.slug === caseSlug) : null;
  usePageMeta(cs ? `${cs.title} | ${ind.name} Case Study` : "Case study", cs ? cs.challenge.slice(0, 155) : "");
  useJsonLd(cs ? `case-${cs.slug}` : "case-none", cs ? { "@context": "https://schema.org", "@type": "Article", headline: cs.title, about: ind.name, author: { "@type": "Organization", name: "Frequent Research" }, publisher: { "@type": "Organization", name: "Frequent Research" } } : null);
  ee.useEffect(() => {
    if (!cs || !("IntersectionObserver" in window)) return undefined;
    const els = CX5_FACTORS.map(([k]) => document.getElementById("cx5-" + k)).filter(Boolean);
    const io = new IntersectionObserver((en) => en.forEach((e) => e.isIntersecting && setAct(e.target.id.slice(4))), { rootMargin: "-40% 0px -55% 0px" });
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [cs]);
  if (!ind) return <NotFoundPage />;
  if (cases === null)
    return (
      <section className="section">
        <div className="container">
          <p className="in6-none">Loading case study…</p>
        </div>
      </section>
    );
  if (!cs) return <NotFoundPage />;
  const B = cx5Build(cs, ind);
  const W = FRK_V[B.vk];
  const L = in6Grp(ind.group);
  const idx = cases.indexOf(cs);
  const more = cases.filter((x) => x.slug !== cs.slug).slice(0, 3);
  const red = k5Reduce();
  const go = (k) => (e) => {
    e.preventDefault();
    const el = document.getElementById("cx5-" + k);
    if (el) el.scrollIntoView({ behavior: red ? "auto" : "smooth", block: "start" });
  };
  const mk = (cs.markets || []).map(in6Iso);
  return (
    <div className={"in5 in6 cx5 cx6 ab17 in5-st--" + in5Look(slug).style} style={{ "--c": L.c, "--c2": L.c2 }}>
      <section className="in6-hero cx6-hero" aria-labelledby="cx5-h1">
        <div className="in6-hero__sky" aria-hidden="true">
          <i className="in6-blob in6-blob--a" />
          <i className="in6-blob in6-blob--b" />
          <i className="in6-hero__grid" />
        </div>
        <div className="container in6-hero__in cx6-hero__in">
          <div className="in6-hero__copy">
            <IN5_Crumbs ind={ind} cs={cs} />
            <p className="cx6-tags">
              <span>
                <IndustryIcon name={ind.icon} size={15} /> {ind.name}
              </span>
              <span className="cx6-tags__v" style={frkVStyle(B.vk)}>
                <FRK_I n={W.ic} s={13} /> {W.name}
              </span>
              <span>
                Case {String(idx + 1).padStart(2, "0")} of {cases.length}
              </span>
              {cs.verified === false ? <span className="cx6-tags__ill">Illustrative engagement</span> : null}
            </p>
            <HeroH1 id="cx5-h1" className="in6-h1 cx6-h1">
              {cs.title}
            </HeroH1>
            <p className="in6-lead cx6-client">{B.client}</p>
            <ul className="cx6-facts">
              {[
                ["pin", "Region", cs.region],
                ["users", "Scope", cs.scope],
                ["clock", "Timeline", cs.timeline],
              ]
                .filter((f) => f[2])
                .map(([ic, t, d], i) => (
                  <li key={t} style={{ "--i": i }}>
                    <K5_I n={ic} s={18} />
                    <span>
                      <small>{t}</small>
                      {d}
                    </span>
                  </li>
                ))}
              {mk.length ? (
                <li className="cx6-facts__mk" style={{ "--i": 3 }}>
                  <K5_I n="globe" s={18} />
                  <span>
                    <small>Markets</small>
                    <span className="cx6-flags">
                      {mk.map((iso) => (
                        <span key={iso}>
                          {in6Flag(flags, iso) ? <img src={in6Flag(flags, iso)} alt="" /> : null}
                          {in6Name(iso)}
                        </span>
                      ))}
                    </span>
                  </span>
                </li>
              ) : null}
            </ul>
            <div className="in6-ctas">
              <button type="button" className="ab17-btn ab17-btn--glow" onClick={() => setGate(true)}>
                <K5_I n="doc" s={16} /> Download the PDF
              </button>
              <HmLink to="/lets-talk?type=feasibility" className="ab17-btn ab17-btn--glass">
                Discuss a similar project
              </HmLink>
            </div>
          </div>
          <CX6_Dial act={act} go={go} />
        </div>
      </section>
      <section className="cx5-body cx6-body">
        <div className="container cx5-layout">
          <nav className="cx5-rail" aria-label="Case study sections">
            <ol>
              {CX5_FACTORS.map(([k, t], i) => (
                <li key={k} className={act === k ? "is-on" : ""}>
                  <a href={"#cx5-" + k} onClick={go(k)} aria-current={act === k ? "true" : undefined}>
                    <span>{String(i + 1).padStart(2, "0")}</span> {t}
                  </a>
                </li>
              ))}
            </ol>
            <button type="button" className="cx5-rail__dl" onClick={() => setGate(true)}>
              <K5_I n="doc" s={16} /> PDF
            </button>
          </nav>
          <article className="cx5-story">
            {cs.verified === false ? (
              <p className="cx5-ill">
                <b>Illustrative engagement.</b> A representative scenario showing how we approach this kind of work in {ind.name.toLowerCase()}. It does not describe a specific client; outcomes are described qualitatively.
              </p>
            ) : null}
            {CX5_FACTORS.map(([k, t, ic], i) => (
              <K5_Rv as="section" a="up" key={k} id={"cx5-" + k} className={"cx5-sec cx6-sec cx5-sec--" + k} aria-labelledby={"cx5-t-" + k} style={{ "--i": i }}>
                <header>
                  <span className="cx5-sec__ic">
                    <K5_I n={ic} s={20} />
                  </span>
                  <span className="cx5-sec__n">{String(i + 1).padStart(2, "0")}</span>
                  <h2 id={"cx5-t-" + k}>{t}</h2>
                </header>
                <CX5_Body k={k} x={B.f[k]} cs={cs} />
              </K5_Rv>
            ))}
            {cs.verified !== false ? <p className="cx5-conf">Client identity is withheld to protect confidentiality.</p> : null}
          </article>
        </div>
      </section>
      {more.length ? (
        <AB17_Sec className="in6-cases cx6-more" aria-labelledby="cx6-more-h">
          <div className="container">
            <h2 id="cx6-more-h" className="in6-h3">
              More {ind.name.toLowerCase()} case studies
            </h2>
            <ol className="in6-tix">
              {more.map((c, i) => (
                <li key={c.slug} style={{ "--i": i }}>
                  <HmLink to={`/industries-case-studies/${ind.slug}/${c.slug}`} className="in6-tik">
                    <span className="in6-tik__stub">
                      <b>{String(cases.indexOf(c) + 1).padStart(2, "0")}</b>
                      <small>case</small>
                    </span>
                    <span className="in6-tik__main">
                      <b className="in6-tik__t">{c.title}</b>
                      <span className="in6-tik__c">{(c.client || "").replace(/^Illustrative · /, "")}</span>
                    </span>
                    <span className="in6-tik__go">
                      <K5_I n="arrow" s={18} />
                    </span>
                  </HmLink>
                </li>
              ))}
            </ol>
            <HmLink to={"/industries-case-studies/" + ind.slug} className="ab17-btn ab17-btn--glow cx6-more__all">
              All {ind.name.toLowerCase()} case studies <K5_I n="arrow" s={16} />
            </HmLink>
          </div>
        </AB17_Sec>
      ) : null}
      <CtaSectionBlock title="Want results like these?" text="Tell us about your objectives. We'll recommend an approach and confirm feasibility within one working day." />
      {gate && (
        <FRG_Gate
          world={B.vk}
          kind={`${ind.name} case study`}
          title={cs.title}
          sub={B.client}
          icon="file"
          endpoint="/api/v1/case-study-download"
          resource={{ type: "case-study", key: ind.slug + "/" + cs.slug, title: cs.title }}
          extra={{ caseSlug: cs.slug, caseTitle: cs.title, industry: ind.name }}
          onUnlock={(lead) => cx5CasePdf(cs, ind, lead)}
          onClose={() => setGate(false)}
        />
      )}
    </div>
  );
}

export { CX6_Page, IN6_Atlas, IN6_GRP, IN6_Hub, IN6_Sector };
