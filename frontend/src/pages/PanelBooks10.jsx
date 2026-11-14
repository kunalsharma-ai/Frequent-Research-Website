/*
 * Build 65 update 11 — panel book sections, region pages and entire panel pages. Prefix PB10_ / pb10, styles in
 * src/styles/panelbooks10.css (pb10-).
 *
 *   PB10_Section   the consumer / business / healthcare shelves (/downloads/<sec>): a new hero per panel (people planet,
 *                  business city, care orbit), three ways in (by region, entire panel, by country) and a new country
 *                  explorer. Replaces the old shelf hero, the healthcare "three panels" cards and the "pick a country"
 *                  podium (Kunal, 1 Nov 2026).
 *   PB10_Scope     /downloads/<sec>/region-<asia-pacific|europe|...> and /downloads/<sec>/all-countries: one page per region
 *                  and one for the entire panel, with the combined profile (sums of the whole numbers across countries),
 *                  market by market ranking, every country, and the region / entire panel book download at the bottom
 *                  behind the form. Healthcare pages switch between HCP, caregivers and patients with a sound and a new
 *                  colour grade.
 *   Sounds: frsPlay("pick") on a country, "region" on a region / entire panel, "seg" on a healthcare segment,
 *   "tick" on filters. The footer sound switch turns them all off.
 * Country PDFs are unchanged (pp5PanelBook). Region and entire panel PDFs: pb10Book in PanelPdf10.jsx.
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { K5_Count, k5Reduce, k5Tilt } from '../components/site/Kit65.jsx';
import { frsPlay } from '../components/site/Floaters.jsx';
import { FRL_FR } from '../components/site/Logos13.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { dlxBook, dlxUseIndex } from './Downloads.jsx';
import { PC5_Flag, PC5_HC_SEG, PC5_I, PC5_KINDS, PC5_MODEL_NOTE, pc5HcBook, pc5Mix, pc5Num, pc5Pal, pc5UseFlags } from '../data/PanelCountries65.jsx';
import { PC5_Card, pc5Path, pc5Scroll, pc5Tables } from './PanelCountry65.jsx';
import { pb10Book10 } from '../components/site/PanelPdf10.jsx';

const PB10_REG = [
  { r: "Asia-Pacific", slug: "asia-pacific", code: "APAC", c1: "#C8577E", c2: "#FFC27A", line: "From Tokyo to Sydney, Mumbai to Manila." },
  { r: "Europe", slug: "europe", code: "EU", c1: "#2F6BFF", c2: "#B9A8FF", line: "From Lisbon to Helsinki, Dublin to Athens." },
  { r: "Middle East & Africa", slug: "middle-east-africa", code: "MEA", c1: "#D99A2B", c2: "#9FE7DC", line: "From Riyadh to Cape Town, Cairo to Lagos." },
  { r: "North America", slug: "north-america", code: "NA", c1: "#0E9C88", c2: "#7EA2FF", line: "From Toronto to Mexico City." },
  { r: "South America", slug: "south-america", code: "LATAM", c1: "#6D4AFF", c2: "#F0A3BC", line: "From Bogotá to Buenos Aires." },
];
const PB10_ALL = { r: null, slug: "all-countries", code: "WORLD", c1: "#6D4AFF", c2: "#7EA2FF", line: "Every country, every region, one panel." };
const PB10_PANEL = {
  b2c: { c1: "#2F6BFF", c2: "#FFC27A", c3: "#F0A3BC", t: "Consumer panel", kick: "Consumer panel books", h: ["Real people.", "Real voices."], roll: ["who they are", "what they earn", "how they live", "what they buy"], ic: "people" },
  b2b: { c1: "#6D4AFF", c2: "#D99A2B", c3: "#7EA2FF", t: "Business professional panel", kick: "Business professional panel books", h: ["Decision makers,", "within reach."], roll: ["by role", "by department", "by company size", "by industry"], ic: "brief" },
  hc: { c1: "#0E9C88", c2: "#9FE7DC", c3: "#F0A3BC", t: "Healthcare panel", kick: "Healthcare panel books", h: ["Every voice in care,", "heard."], roll: ["healthcare professionals", "caregivers", "patients"], ic: "pulse" },
};
const PB10_SEGC = {
  hcp: { c1: "#0E9C88", c2: "#9FE7DC", c3: "#7EA2FF" },
  caregivers: { c1: "#C8577E", c2: "#FFC27A", c3: "#F0A3BC" },
  patients: { c1: "#6D4AFF", c2: "#B9A8FF", c3: "#9FE7DC" },
};
const pb10Key = (kind, seg) => (kind === "hc" ? seg || "hcp" : kind);
const pb10IsHc = (key) => /^(hcp|caregivers|patients)$/.test(key);
const pb10ScopeOf = (slug) => (slug === "all-countries" ? PB10_ALL : PB10_REG.find((r) => "region-" + r.slug === slug) || null);
const pb10ScopePath = (kind, sc, seg) => "/downloads/" + PC5_KINDS[kind].sec + "/" + (sc.r ? "region-" + sc.slug : "all-countries") + (kind === "hc" && seg ? "?seg=" + seg : "");
const pb10Name = (sc) => (sc.r ? sc.r : "Entire panel");
const pb10Who = (key) => (pb10IsHc(key) ? (PC5_HC_SEG.find((s) => s.k === key) || {}).who || "members" : key === "b2b" ? "professionals" : "consumers");
const pb10PanelT = (key) => (pb10IsHc(key) ? (PC5_HC_SEG.find((s) => s.k === key) || {}).t + " panel" : PB10_PANEL[key].t);
const pb10Sound = (k) => {
  try {
    frsPlay(k);
  } catch (e) {}
};
const pb10List = (ix, key) => (ix && !ix.failed ? ix[key] || [] : []);
const pb10Entries = (ix, key, sc) => pb10List(ix, key).filter((c) => !sc || !sc.r || c.region === sc.r);
/* the segment in the address (?seg=hcp|caregivers|patients) */
const pb10SegQ = () => {
  try {
    const q = new URLSearchParams(location.search).get("seg") || new URLSearchParams(location.hash.split("?")[1] || "").get("seg");
    return PC5_HC_SEG.some((s) => s.k === q) ? q : "hcp";
  } catch (e) {
    return "hcp";
  }
};
const pb10SetSegQ = (k) => {
  try {
    const u = new URL(location.href);
    if (u.hash.includes("?") || u.hash.startsWith("#/")) {
      const [h, q] = u.hash.split("?");
      const p = new URLSearchParams(q || "");
      p.set("seg", k);
      history.replaceState(history.state, "", u.pathname + u.search + h + "?" + p.toString());
    } else {
      u.searchParams.set("seg", k);
      history.replaceState(history.state, "", u.pathname + u.search + u.hash);
    }
  } catch (e) {}
};

/* ── data: load many country books and add them up ──────────────────────────────────── */
const pb10Book = (key, slug) => (pb10IsHc(key) ? pc5HcBook(key, slug).then((b) => (b ? { ...b, kind: "hc", seg: key } : null)) : dlxBook(key, slug).catch(() => null));
async function pb10LoadMany(key, entries, onp) {
  const out = new Array(entries.length).fill(null);
  let next = 0,
    done = 0;
  const run = async () => {
    while (next < entries.length) {
      const i = next++;
      const e = entries[i];
      const b = await pb10Book(key, e.slug).catch(() => null);
      out[i] = b ? { ...b, name: e.name, iso: e.iso, region: e.region, panel: b.panel || e.panel, slug: e.slug } : null;
      done++;
      if (onp) onp(done, entries.length);
    }
  };
  await Promise.all(Array.from({ length: Math.min(6, entries.length) }, run));
  return out.filter(Boolean);
}
/* tables whose labels repeat in (most) countries are added up: whole numbers summed, the percentage is the sum over the
   combined panel of the countries that have the table. Country-specific tables (regions, ethnicity, languages, income
   bands in local currency) are left out. */
const PB10_SKIP = new Set(["region", "ethnicity", "pincome", "hincome", "revenue"]);
function pb10Agg(books) {
  const m = new Map();
  books.forEach((b) => {
    const kind = b.kind === "hc" ? "hc" : b.kind;
    pc5Tables({ ...b, kind }).forEach((x) => {
      if (PB10_SKIP.has(x.cat) || /ethnic|language|nationality|state|province|county|governorate/i.test(x.t)) return;
      const k = x.group + "|" + x.t;
      let e = m.get(k);
      if (!e) m.set(k, (e = { id: "pb" + m.size, t: x.t, cat: x.cat, ic: x.ic, group: x.group, gi: x.gi, labs: new Map(), base: 0, n: 0, sets: new Set() }));
      e.base += b.panel || 0;
      e.n++;
      e.sets.add(x.rows.map((r) => r[0]).join("|"));
      x.rows.forEach((r) => typeof r[2] === "number" && e.labs.set(r[0], (e.labs.get(r[0]) || 0) + r[2]));
    });
  });
  const need = Math.max(1, Math.ceil(books.length * 0.6));
  return [...m.values()]
    .filter((e) => e.n >= need && e.sets.size <= 3 && e.labs.size && e.base)
    .map((e) => ({ id: e.id, t: e.t, cat: e.cat, ic: e.ic, group: e.group, gi: e.gi, countries: e.n, base: e.base, rows: [...e.labs].map(([l, n]) => [l, (n / e.base) * 100, n]).filter((r) => r[2] > 0) }));
}
function pb10UseBooks(key, entries) {
  const [st, setSt] = ee.useState({ books: null, done: 0, total: 0 });
  const sig = key + ":" + entries.map((e) => e.slug).join(",");
  ee.useEffect(() => {
    if (!entries.length) return undefined;
    let on = true;
    setSt({ books: null, done: 0, total: entries.length });
    pb10LoadMany(key, entries, (d, t) => on && setSt((s) => ({ ...s, done: d, total: t }))).then((b) => on && setSt({ books: b, done: entries.length, total: entries.length }));
    return () => {
      on = false;
    };
  }, [sig]);
  return st;
}
const pb10Vars = (a, b, c) => ({
  "--pa": a,
  "--pb": b,
  "--pc": c || b,
  "--fa": a,
  "--fb": b,
  "--fc": c || pc5Mix(b, "#FFFFFF", 0.35),
  "--fa2": pc5Mix(a, "#FFFFFF", 0.45),
  "--fb2": pc5Mix(b, "#FFFFFF", 0.45),
  "--fc2": pc5Mix(c || b, "#0B1437", 0.35),
  "--fa3": pc5Mix(a, "#0B1437", 0.45),
  "--fb3": pc5Mix(b, "#0B1437", 0.45),
  "--fdeep": pc5Mix(a, "#070B1E", 0.78),
  "--fta": pc5Mix(a, "#FFFFFF", 0.35),
  "--ftb": pc5Mix(b, "#FFFFFF", 0.35),
  "--fia": pc5Mix(a, "#0B1437", 0.35),
  "--fib": pc5Mix(b, "#0B1437", 0.35),
});
/* marks a section .is-in once and toggles .is-vis while on screen (CSS pauses loops otherwise) */
function pb10UseVis() {
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
      { rootMargin: "0px 0px -6% 0px", threshold: 0.04 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
function PB10_Sec({ className = "", children, ...rest }) {
  const ref = pb10UseVis();
  return (
    <section ref={ref} className={"pb10-sec " + className} {...rest}>
      {children}
    </section>
  );
}
function PB10_Head({ id, ic, kick, title, em, sub, center }) {
  return (
    <div className={"pb10-head" + (center ? " pb10-head--c" : "")}>
      <span className="pb10-kick">
        <PC5_I n={ic} s={14} /> {kick}
      </span>
      <h2 id={id} className="pb10-h2">
        {title} <em>{em}</em>
      </h2>
      {sub ? <p className="pb10-sub">{sub}</p> : null}
    </div>
  );
}
function PB10_Roll({ words }) {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    setI(0);
    if (k5Reduce()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2400);
    return () => clearInterval(t);
  }, [words.join()]);
  return (
    <span className="pb10-roll" aria-live="off">
      <b key={i}>{words[i]}</b>
    </span>
  );
}
/* healthcare segment switch: sound + a new colour grade for the whole page */
function PB10_SegSwitch({ seg, setSeg, ix, slug, big }) {
  return (
    <div className={"pb10-segsw" + (big ? " pb10-segsw--big" : "")} role="tablist" aria-label="Healthcare panel">
      {PC5_HC_SEG.map((s) => {
        const c = PB10_SEGC[s.k];
        const n = slug ? ((ix && ix[s.k]) || []).filter((e) => !slug.r || e.region === slug.r).reduce((a, e) => a + (e.panel || 0), 0) : 0;
        return (
          <button
            key={s.k}
            type="button"
            role="tab"
            aria-selected={seg === s.k}
            className={seg === s.k ? "is-on" : ""}
            style={{ "--c1": c.c1, "--c2": c.c2 }}
            onClick={() => {
              if (seg !== s.k) pb10Sound("seg");
              setSeg(s.k);
            }}
          >
            <span className="pb10-segsw__ic" aria-hidden="true">
              <PC5_I n={s.ic} s={big ? 22 : 17} />
            </span>
            <span className="pb10-segsw__t">
              <b>{s.t}</b>
              {big && n ? <small>{pc5Num(n)} profiled</small> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* ── hero art per panel ─────────────────────────────────────────────────────────────── */
/* consumers: a planet made of people, turning, with profile chips in orbit */
function PB10_Planet() {
  const N = 46;
  const ga = Math.PI * (3 - Math.sqrt(5));
  const pts = Array.from({ length: N }, (_, i) => {
    const y = 1 - (2 * (i + 0.5)) / N;
    return { lat: (Math.asin(y) * 180) / Math.PI, lon: ((i * ga * 180) / Math.PI) % 360, k: i % 4 };
  });
  const chips = [
    ["gender", "Gender & age"],
    ["wallet", "Income"],
    ["home", "Home & family"],
    ["bag", "Shopping"],
    ["car", "Automotive"],
    ["plane", "Travel"],
  ];
  return (
    <div className="pb10-art pb10-planet" aria-hidden="true">
      <span className="pb10-art__glow" />
      <div className="pb10-planet__sp">
        <div className="pb10-planet__rot">
          {pts.map((p, i) => (
            <span key={i} className={"pb10-planet__p pb10-planet__p--" + p.k} style={{ transform: `rotateY(${p.lon.toFixed(1)}deg) rotateX(${p.lat.toFixed(1)}deg) translateZ(var(--R))` }}>
              <PC5_I n={i % 7 === 0 ? "family" : "user"} s={14} />
            </span>
          ))}
        </div>
        <span className="pb10-planet__core" />
      </div>
      <span className="pb10-planet__ring" />
      {chips.map(([ic, t], i) => (
        <span key={t} className={"pb10-chip pb10-chip--" + i}>
          <PC5_I n={ic} s={14} /> {t}
        </span>
      ))}
    </div>
  );
}
/* business: a turning 3D city of office towers with roles floating above */
function PB10_City() {
  const H = [5, 8, 4, 10, 6, 7, 3, 9, 5, 6, 8, 4, 7, 5, 9, 6];
  const roles = ["CEO / Founder", "IT decision maker", "HR head", "Finance & CFO", "Procurement", "Marketing", "R&D", "Operations"];
  return (
    <div className="pb10-art pb10-city" aria-hidden="true">
      <span className="pb10-art__glow" />
      <div className="pb10-city__sp">
        <div className="pb10-city__deck">
          <span className="pb10-city__grid" />
          {H.map((h, i) => (
            <span key={i} className={"pb10-tw pb10-tw--" + (i % 3)} style={{ "--x": i % 4, "--y": Math.floor(i / 4), "--h": h }}>
              <i className="pb10-tw__f" />
              <i className="pb10-tw__r" />
              <i className="pb10-tw__b" />
              <i className="pb10-tw__l" />
              <i className="pb10-tw__t" />
            </span>
          ))}
        </div>
      </div>
      {roles.map((t, i) => (
        <span key={t} className={"pb10-chip pb10-chip--r" + i}>
          <PC5_I n={["badge", "chip", "people", "coins", "stack", "spark", "cog", "org"][i]} s={14} /> {t}
        </span>
      ))}
    </div>
  );
}
/* healthcare: a care orbit — three tilted rings (HCP, caregivers, patients) around a beating cross, an ECG running behind */
function PB10_Care({ seg }) {
  return (
    <div className="pb10-art pb10-care" aria-hidden="true">
      <span className="pb10-art__glow" />
      <span className="pb10-care__ecg">
        <svg viewBox="0 0 600 80" preserveAspectRatio="none">
          <path d="M0 40h90l12-22 18 46 14-38 10 14h126l12-22 18 46 14-38 10 14h126l12-22 18 46 14-38 10 14h106" />
        </svg>
        <svg viewBox="0 0 600 80" preserveAspectRatio="none">
          <path d="M0 40h90l12-22 18 46 14-38 10 14h126l12-22 18 46 14-38 10 14h126l12-22 18 46 14-38 10 14h106" />
        </svg>
      </span>
      <div className="pb10-care__sp">
        {PC5_HC_SEG.map((s, i) => (
          <span key={s.k} className={"pb10-care__ring pb10-care__ring--" + i + (seg === s.k ? " is-on" : "")} style={{ "--c1": PB10_SEGC[s.k].c1, "--c2": PB10_SEGC[s.k].c2 }}>
            <span className="pb10-care__orb">
              <span className="pb10-care__ic">
                <PC5_I n={s.ic} s={20} />
              </span>
            </span>
          </span>
        ))}
        <span className="pb10-care__cross">
          <i />
          <i />
        </span>
      </div>
      {Array.from({ length: 9 }, (_, i) => (
        <span key={i} className="pb10-care__plus" style={{ "--i": i, left: 8 + ((i * 37) % 84) + "%" }}>
          +
        </span>
      ))}
    </div>
  );
}

/* ── section hero ───────────────────────────────────────────────────────────────────── */
function PB10_Hero({ kind, ix, seg, setSeg }) {
  const P = PB10_PANEL[kind];
  const key = pb10Key(kind, seg);
  const list = pb10List(ix, key);
  const total = list.reduce((a, c) => a + (c.panel || 0), 0);
  const tables = list.reduce((a, c) => a + (c.tables || 0), 0);
  const regs = new Set(list.map((c) => c.region)).size;
  const C = kind === "hc" ? PB10_SEGC[seg] : P;
  const ref = pb10UseVis();
  return (
    <section ref={ref} className={"pb10-sec pb10-hero pb10-hero--" + kind} style={{ "--c1": C.c1, "--c2": C.c2, "--c3": C.c3 }} aria-labelledby="pb10-h1">
      <div className="pb10-hero__bg" aria-hidden="true">
        {kind === "hc"
          ? PC5_HC_SEG.map((s) => <i key={s.k} className={"pb10-grade" + (seg === s.k ? " is-on" : "")} style={{ "--c1": PB10_SEGC[s.k].c1, "--c2": PB10_SEGC[s.k].c2 }} />)
          : <i className="pb10-grade is-on" />}
        <span className="pb10-hero__stars" />
        <span className="pb10-hero__floor" />
      </div>
      <div className="container pb10-hero__in">
        <div className="pb10-hero__copy">
          <nav className="pb10-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <HmLink to="/downloads">Downloads</HmLink>
            <span aria-current="page">{P.kick}</span>
          </nav>
          <span className="pb10-pill">
            <span className="pb10-pill__dot" aria-hidden="true" /> {P.kick} · {list.length || "…"} countries
          </span>
          <HeroH1 id="pb10-h1" className="pb10-h1">
            <span className="pb10-h1__a">{P.h[0]}</span> <span className="pb10-h1__b">{P.h[1]}</span>
          </HeroH1>
          <p className="pb10-hero__roll">
            Profiled <PB10_Roll words={P.roll} />
          </p>
          {kind === "hc" ? <PB10_SegSwitch seg={seg} setSeg={setSeg} ix={ix} slug={PB10_ALL} big /> : null}
          <ul className="pb10-hero__kpi">
            <li>
              <b>{total ? <K5_Count to={total} fmt={pc5Num} key={key} /> : "…"}</b>
              <small>profiled {pb10Who(key)}</small>
            </li>
            <li>
              <b>{list.length || "…"}</b>
              <small>countries</small>
            </li>
            <li>
              <b>{regs || "…"}</b>
              <small>regions</small>
            </li>
            <li>
              <b>{tables ? pc5Num(tables) : "…"}</b>
              <small>profile tables</small>
            </li>
          </ul>
          <div className="pb10-hero__cta">
            <button type="button" className="pb10-btn pb10-btn--glow" onClick={() => (pb10Sound("tick"), pc5Scroll("pb10-ways"))}>
              Explore by region <PC5_I n="arrow" s={16} />
            </button>
            <HmLink to={pb10ScopePath(kind, PB10_ALL, kind === "hc" ? seg : "")} className="pb10-btn pb10-btn--line" onClick={() => pb10Sound("region")}>
              Entire panel book
            </HmLink>
            <button type="button" className="pb10-btn pb10-btn--ghost" onClick={() => (pb10Sound("tick"), pc5Scroll("pb10-ctry"))}>
              Find a country
            </button>
          </div>
        </div>
        {kind === "b2c" ? <PB10_Planet /> : kind === "b2b" ? <PB10_City /> : <PB10_Care seg={seg} />}
      </div>
    </section>
  );
}

/* ── three ways in: regions + entire panel ─────────────────────────────────────────── */
function PB10_FlagFan({ list, flags, max = 6 }) {
  const L = [...list].sort((a, b) => (b.panel || 0) - (a.panel || 0)).slice(0, max);
  return (
    <span className="pb10-fan" aria-hidden="true">
      {L.map((c, i) => (
        <span key={c.slug} style={{ "--i": i, "--n": L.length }}>
          <PC5_Flag iso={c.iso} flags={flags} />
        </span>
      ))}
    </span>
  );
}
function PB10_Ways({ kind, ix, seg, flags }) {
  const key = pb10Key(kind, seg);
  const list = pb10List(ix, key);
  const total = list.reduce((a, c) => a + (c.panel || 0), 0) || 1;
  const regs = PB10_REG.map((r) => ({ ...r, L: list.filter((c) => c.region === r.r) })).filter((r) => r.L.length);
  return (
    <PB10_Sec className="pb10-ways" id="pb10-ways" aria-labelledby="pb10-ways-h">
      <div className="container">
        <PB10_Head id="pb10-ways-h" ic="globe" kick="Three ways in" title="Pick a region." em="Or take the whole world." sub={`Every region has its own page and its own panel book. The entire ${pb10PanelT(key).toLowerCase()} book brings all ${list.length || ""} countries together.`} center />
        <div className="pb10-ways__grid">
          {regs.map((r, i) => {
            const n = r.L.reduce((a, c) => a + (c.panel || 0), 0);
            return (
              <HmLink key={r.slug} to={pb10ScopePath(kind, r, kind === "hc" ? seg : "")} className="pb10-reg" style={{ "--c1": r.c1, "--c2": r.c2, "--i": i }} onClick={() => pb10Sound("region")} {...k5Tilt(10)}>
                <span className="pb10-reg__code" aria-hidden="true">
                  {r.code}
                </span>
                <PB10_FlagFan list={r.L} flags={flags} />
                <span className="pb10-reg__t">
                  <b>{r.r}</b>
                  <small>{r.line}</small>
                </span>
                <span className="pb10-reg__n">
                  <b>{pc5Num(n)}</b>
                  <small>
                    {pb10Who(key)} · {r.L.length} countries · {((n / total) * 100).toFixed(1)}% of the panel
                  </small>
                </span>
                <span className="pb10-reg__bar" aria-hidden="true">
                  <i style={{ "--w": n / total }} />
                </span>
                <em>
                  Open region <PC5_I n="arrow" s={14} />
                </em>
              </HmLink>
            );
          })}
          <HmLink to={pb10ScopePath(kind, PB10_ALL, kind === "hc" ? seg : "")} className="pb10-world" onClick={() => pb10Sound("region")}>
            <span className="pb10-world__marq" aria-hidden="true">
              {[0, 1].map((row) => (
                <span key={row} className={"pb10-world__row" + (row ? " is-r" : "")}>
                  {[0, 1].map((dup) => (
                    <span key={dup}>
                      {list
                        .filter((_, k) => k % 2 === row)
                        .map((c) => (
                          <PC5_Flag key={c.slug} iso={c.iso} flags={flags} />
                        ))}
                    </span>
                  ))}
                </span>
              ))}
            </span>
            <span className="pb10-world__in">
              <span className="pb10-kick pb10-kick--w">
                <PC5_I n="globe" s={14} /> Entire panel
              </span>
              <b>All {list.length} countries in one book</b>
              <small>
                {pc5Num(total)} profiled {pb10Who(key)} across {regs.length} regions, with the combined profile, every region and every country.
              </small>
              <em>
                Open entire panel <PC5_I n="arrow" s={14} />
              </em>
            </span>
          </HmLink>
        </div>
      </div>
    </PB10_Sec>
  );
}

/* ── country explorer ──────────────────────────────────────────────────────────────── */
function PB10_Countries({ kind, ix, seg, flags }) {
  const key = pb10Key(kind, seg);
  const list = pb10List(ix, key);
  const [reg, setReg] = ee.useState("all");
  const [q, setQ] = ee.useState("");
  const [sort, setSort] = ee.useState("size");
  const qq = q.trim().toLowerCase();
  const max = Math.max(1, ...list.map((c) => c.panel || 0));
  let shown = list.filter((c) => (reg === "all" || c.region === reg) && (!qq || c.name.toLowerCase().includes(qq)));
  shown = [...shown].sort((a, b) => (sort === "az" ? a.name.localeCompare(b.name) : (b.panel || 0) - (a.panel || 0)));
  const regions = PB10_REG.filter((r) => list.some((c) => c.region === r.r));
  const pick = (fn) => (...a) => (pb10Sound("tick"), fn(...a));
  return (
    <PB10_Sec className="pb10-ctry" id="pb10-ctry" aria-labelledby="pb10-ctry-h">
      <div className="container">
        <PB10_Head id="pb10-ctry-h" ic="pin" kick={`${list.length || "…"} countries`} title="Every country," em="its own page and book." sub={kind === "hc" ? "Each country page brings its healthcare professional, caregiver and patient panels together, with the panel book at the bottom." : `Each country page shows every ${PC5_KINDS[kind].whoOne} profile as charts, with the panel book at the bottom.`} />
        <div className="pb10-ctry__bar">
          <label className="pb10-search">
            <PC5_I n="globe" s={16} />
            <span className="frk-sr">Search countries</span>
            <input type="search" value={q} placeholder="Search a country" onChange={(e) => setQ(e.target.value)} />
          </label>
          <div className="pb10-chips" role="group" aria-label="Region">
            {[{ r: "all", c1: "#7EA2FF" }, ...regions].map((r) => (
              <button key={r.r} type="button" aria-pressed={reg === r.r} className={reg === r.r ? "is-on" : ""} style={{ "--c1": r.c1 }} onClick={pick(() => setReg(r.r))}>
                {r.r === "all" ? "All regions" : r.r} <b>{r.r === "all" ? list.length : list.filter((c) => c.region === r.r).length}</b>
              </button>
            ))}
          </div>
          <div className="pb10-chips pb10-chips--sort" role="group" aria-label="Sort">
            <button type="button" aria-pressed={sort === "size"} className={sort === "size" ? "is-on" : ""} onClick={pick(() => setSort("size"))}>
              Largest first
            </button>
            <button type="button" aria-pressed={sort === "az"} className={sort === "az" ? "is-on" : ""} onClick={pick(() => setSort("az"))}>
              A–Z
            </button>
          </div>
        </div>
        {!ix ? <p className="pb10-msg">Loading countries…</p> : null}
        {ix && ix.failed ? <p className="pb10-msg">The country list could not be loaded. Please refresh the page.</p> : null}
        <ul className="pb10-grid" key={reg + sort + key}>
          {shown.map((c, i) => {
            const p = pc5Pal(c.iso);
            return (
              <li key={c.slug} style={{ "--fa": p.a, "--fb": p.b, "--i": Math.min(i, 24) }}>
                <HmLink to={pc5Path(kind, c.slug) + (kind === "hc" ? "?seg=" + seg : "")} className="pb10-card" onClick={() => pb10Sound("pick")} {...k5Tilt(10)}>
                  <span className="pb10-card__flag">
                    <PC5_Flag iso={c.iso} flags={flags} />
                    <i aria-hidden="true" />
                  </span>
                  <span className="pb10-card__t">
                    <b>{c.name}</b>
                    <small>{c.region}</small>
                  </span>
                  <span className="pb10-card__n">
                    <b>{pc5Num(c.panel)}</b> {pb10Who(key)}
                  </span>
                  <span className="pb10-card__bar" aria-hidden="true">
                    <i style={{ "--w": (c.panel || 0) / max }} />
                  </span>
                  <span className="pb10-card__go" aria-hidden="true">
                    <PC5_I n="arrow" s={14} />
                  </span>
                </HmLink>
              </li>
            );
          })}
        </ul>
        {ix && !ix.failed && !shown.length ? <p className="pb10-msg">No country matches “{q}”.</p> : null}
      </div>
    </PB10_Sec>
  );
}

/* the shelf body for a panel section (hero is rendered by PB10_Section) */
function PB10_Section({ kind, ix }) {
  const flags = pc5UseFlags();
  const [seg, setSeg0] = ee.useState(() => (kind === "hc" ? pb10SegQ() : ""));
  const setSeg = (k) => {
    setSeg0(k);
    pb10SetSegQ(k);
  };
  const P = PB10_PANEL[kind];
  const C = kind === "hc" ? PB10_SEGC[seg] : P;
  return (
    <div className={"pb10 pb10--" + kind + (kind === "hc" ? " pb10--" + seg : "")} style={{ "--c1": C.c1, "--c2": C.c2, "--c3": C.c3 }}>
      <PB10_Hero kind={kind} ix={ix} seg={seg} setSeg={setSeg} />
      <PB10_Ways kind={kind} ix={ix} seg={seg} flags={flags} />
      <PB10_Countries kind={kind} ix={ix} seg={seg} flags={flags} />
    </div>
  );
}

/* ── region / entire panel page ────────────────────────────────────────────────────── */
function PB10_FlagRing({ list, flags, rows = 1 }) {
  const L0 = [...list].sort((a, b) => (b.panel || 0) - (a.panel || 0));
  // small regions repeat their flags so the ring always reads as a full 3D carousel
  const L = [];
  for (let k = 0; L0.length && L.length < Math.max(12, L0.length); k++) L0.forEach((c) => L.push(k ? { ...c, slug: c.slug + "~" + k } : c));
  const per = Math.ceil(L.length / rows);
  return (
    <div className="pb10-ring" data-rows={rows} aria-hidden="true">
      <span className="pb10-art__glow" />
      <div className="pb10-ring__sp">
        {Array.from({ length: rows }, (_, r) => {
          const part = L.slice(r * per, (r + 1) * per);
          const n = Math.max(part.length, 8);
          return (
            <div key={r} className="pb10-ring__row" style={{ "--r": r, "--rows": rows, "--n": n }}>
              <div className="pb10-ring__spin">
                {part.map((c, i) => (
                  <span key={c.slug} className="pb10-ring__it" style={{ "--i": i * (n / part.length) }}>
                    <PC5_Flag iso={c.iso} flags={flags} />
                    <small>{c.name}</small>
                  </span>
                ))}
              </div>
            </div>
          );
        })}
        <span className="pb10-ring__core">
          <FRL_FR kind="icon" tilt={0} rich />
        </span>
      </div>
    </div>
  );
}
function PB10_ScopeHero({ kind, sc, key2, list, flags, seg, setSeg, ix, total, nTab }) {
  const ref = pb10UseVis();
  const big = [...list].sort((a, b) => (b.panel || 0) - (a.panel || 0))[0];
  const name = pb10Name(sc);
  return (
    <section ref={ref} className="pb10-sec pb10-shero" aria-labelledby="pb10-sh1">
      <div className="pb10-hero__bg" aria-hidden="true">
        {kind === "hc"
          ? PC5_HC_SEG.map((s) => <i key={s.k} className={"pb10-grade" + (seg === s.k ? " is-on" : "")} style={{ "--c1": PB10_SEGC[s.k].c1, "--c2": PB10_SEGC[s.k].c2 }} />)
          : <i className="pb10-grade is-on" />}
        <span className="pb10-hero__stars" />
        <span className="pb10-shero__code">{sc.code}</span>
      </div>
      <div className="container pb10-hero__in">
        <div className="pb10-hero__copy">
          <nav className="pb10-crumbs" aria-label="Breadcrumb">
            <HmLink to="/downloads">Downloads</HmLink>
            <HmLink to={"/downloads/" + PC5_KINDS[kind].sec + (kind === "hc" ? "?seg=" + seg : "")}>{PB10_PANEL[kind].kick}</HmLink>
            <span aria-current="page">{name}</span>
          </nav>
          <span className="pb10-pill">
            <span className="pb10-pill__dot" aria-hidden="true" /> {pb10PanelT(key2)} · {sc.r ? "Region" : "All regions"}
          </span>
          <HeroH1 id="pb10-sh1" className="pb10-h1 pb10-h1--scope">
            {name.split(" ").map((w, i) => (
              <span key={i} className="pb10-word" style={{ "--i": i }}>
                {w}{" "}
              </span>
            ))}
          </HeroH1>
          <p className="pb10-hero__line">{sc.line}</p>
          {kind === "hc" ? <PB10_SegSwitch seg={seg} setSeg={setSeg} ix={ix} slug={sc} big /> : null}
          <ul className="pb10-hero__kpi">
            <li>
              <b>{total ? <K5_Count to={total} fmt={pc5Num} key={key2} /> : "…"}</b>
              <small>profiled {pb10Who(key2)}</small>
            </li>
            <li>
              <b>{list.length || "…"}</b>
              <small>countries</small>
            </li>
            <li>
              <b>{nTab || "…"}</b>
              <small>combined profiles</small>
            </li>
            <li>
              <b className={big && big.name.length > 11 ? "is-long" : ""}>{big ? big.name : "…"}</b>
              <small>largest market</small>
            </li>
          </ul>
          <div className="pb10-hero__cta">
            <button type="button" className="pb10-btn pb10-btn--glow" onClick={() => (pb10Sound("tick"), pc5Scroll("pb10-get"))}>
              Download the {sc.r ? "region" : "entire panel"} book <PC5_I n="down" s={16} />
            </button>
            <button type="button" className="pb10-btn pb10-btn--line" onClick={() => (pb10Sound("tick"), pc5Scroll("pb10-rank"))}>
              Market by market
            </button>
          </div>
        </div>
        <PB10_FlagRing list={list} flags={flags} rows={list.length > 30 ? 3 : list.length > 16 ? 2 : 1} />
      </div>
    </section>
  );
}
function PB10_Rank({ kind, list, flags, key2, seg }) {
  const L = [...list].sort((a, b) => (b.panel || 0) - (a.panel || 0));
  const tot = L.reduce((a, c) => a + (c.panel || 0), 0) || 1;
  const max = Math.max(1, ...L.map((c) => c.panel || 0));
  return (
    <PB10_Sec className="pb10-rank" id="pb10-rank" aria-labelledby="pb10-rank-h">
      <div className="container">
        <PB10_Head id="pb10-rank-h" ic="stack" kick="Market by market" title={`${L.length} countries,`} em="ranked by panel size." sub="Every bar opens that country's page and its own panel book." />
        <ol className="pb10-rank__list">
          {L.map((c, i) => {
            const p = pc5Pal(c.iso);
            return (
              <li key={c.slug} style={{ "--fa": p.a, "--fb": p.b, "--i": Math.min(i, 30), "--w": (c.panel || 0) / max }}>
                <HmLink to={pc5Path(kind, c.slug) + (kind === "hc" ? "?seg=" + seg : "")} onClick={() => pb10Sound("pick")}>
                  <span className="pb10-rank__no">{i + 1}</span>
                  <PC5_Flag iso={c.iso} flags={flags} />
                  <span className="pb10-rank__nm">{c.name}</span>
                  <span className="pb10-rank__bar" aria-hidden="true">
                    <i />
                  </span>
                  <span className="pb10-rank__v">
                    <b>{pc5Num(c.panel)}</b>
                    <small>{(((c.panel || 0) / tot) * 100).toFixed(1)}%</small>
                  </span>
                </HmLink>
              </li>
            );
          })}
        </ol>
        <p className="pb10-rank__foot">
          Total: <b>{pc5Num(tot)}</b> profiled {pb10Who(key2)}
        </p>
      </div>
    </PB10_Sec>
  );
}
function PB10_Regions({ kind, ix, key2, seg, flags }) {
  const list = pb10List(ix, key2);
  const tot = list.reduce((a, c) => a + (c.panel || 0), 0) || 1;
  const R = PB10_REG.map((r) => ({ ...r, L: list.filter((c) => c.region === r.r) }))
    .filter((r) => r.L.length)
    .map((r) => ({ ...r, n: r.L.reduce((a, c) => a + (c.panel || 0), 0) }));
  let acc = 0;
  const conic = R.map((r) => {
    const a = acc;
    acc += (r.n / tot) * 100;
    return `${r.c1} ${a}% ${acc}%`;
  }).join(",");
  return (
    <PB10_Sec className="pb10-rgs" aria-labelledby="pb10-rgs-h">
      <div className="container">
        <PB10_Head id="pb10-rgs-h" ic="globe" kick="Region by region" title={`${R.length} regions,`} em="one panel." center />
        <div className="pb10-rgs__in">
          <div className="pb10-donut" style={{ background: `conic-gradient(${conic})` }} aria-hidden="true">
            <span>
              <b>{pc5Num(tot)}</b>
              <small>profiled {pb10Who(key2)}</small>
            </span>
          </div>
          <ul className="pb10-rgs__list">
            {R.map((r, i) => (
              <li key={r.slug} style={{ "--c1": r.c1, "--c2": r.c2, "--i": i }}>
                <HmLink to={pb10ScopePath(kind, r, kind === "hc" ? seg : "")} onClick={() => pb10Sound("region")}>
                  <PB10_FlagFan list={r.L} flags={flags} max={5} />
                  <span>
                    <b>{r.r}</b>
                    <small>
                      {r.L.length} countries · {pc5Num(r.n)} · {((r.n / tot) * 100).toFixed(1)}%
                    </small>
                  </span>
                  <PC5_I n="arrow" s={14} />
                </HmLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PB10_Sec>
  );
}
function PB10_Profile({ agg, st, name, key2 }) {
  const groups = [...new Set(agg.map((x) => x.group))];
  const [g, setG] = ee.useState(0);
  const cur = groups[g] != null ? groups[g] : groups[0];
  const shown = agg.filter((x) => x.group === cur);
  return (
    <PB10_Sec className="pb10-prof" aria-labelledby="pb10-prof-h">
      <div className="container">
        <PB10_Head id="pb10-prof-h" ic="pie" kick="Combined profile" title={`The ${name}`} em={`${pb10PanelT(key2).toLowerCase()}, profile by profile.`} sub="Whole numbers are added up across the countries that share the same profile; percentages are of their combined panel." />
        {!st.books ? (
          <div className="pb10-load" aria-busy="true">
            <span className="pb10-load__bar">
              <i style={{ "--w": st.total ? st.done / st.total : 0 }} />
            </span>
            <small>
              Loading country books… {st.done} / {st.total}
            </small>
          </div>
        ) : (
          <>
            {groups.length > 1 ? (
              <div className="pb10-chips pb10-chips--tabs" role="tablist" aria-label="Chapters">
                {groups.map((x, i) => (
                  <button key={x || i} type="button" role="tab" aria-selected={i === g} className={i === g ? "is-on" : ""} onClick={() => (pb10Sound("tick"), setG(i))}>
                    {x || "Profile"} <b>{agg.filter((y) => y.group === x).length}</b>
                  </button>
                ))}
              </div>
            ) : null}
            <div className="pb10-prof__grid" key={g}>
              {shown.map((x, i) => (
                <div key={x.id} className={"pb10-prof__it" + (x.rows.length > 12 ? " is-wide" : "")}>
                  <PC5_Card x={x} cur="" n={i} wide={x.rows.length > 12} />
                  <small className="pb10-prof__base">
                    Base: {pc5Num(x.base)} profiled {pb10Who(key2)} in {x.countries} countries
                  </small>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </PB10_Sec>
  );
}
function PB10_Get({ kind, sc, key2, list, seg, setSeg, ix }) {
  const [n, setN] = ee.useState(0);
  const name = pb10Name(sc);
  const t = `${sc.r ? sc.r + " " : "Entire "}${pb10PanelT(key2).toLowerCase()} book`;
  const docKey = "panel-" + (sc.r ? "region-" + sc.slug : "all") + "/" + key2;
  return (
    <section className="pb10-get" id="pb10-get" aria-labelledby="pb10-get-h">
      <div className="pb10-get__bg" aria-hidden="true" />
      <div className="container">
        <div className="pb10-get__head">
          <span className="pb10-kick">
            <PC5_I n="down" s={14} /> {sc.r ? "Region book" : "Entire panel book"} · PDF
          </span>
          <h2 id="pb10-get-h" className="pb10-h2">
            Get the <em>{sc.r ? t : t.replace(/^Entire/, "entire")}</em>
          </h2>
          <p>
            {list.length} countries in one PDF: the combined profile with percentages and whole numbers, the market ranking, {sc.r ? "" : "every region, "}and a page for every country in its own flag colours. Fill in your details below and it opens in your browser. The form is asked for every download.
          </p>
          {kind === "hc" ? <PB10_SegSwitch seg={seg} setSeg={setSeg} ix={ix} slug={sc} /> : null}
        </div>
        <FRG_Gate
          key={docKey + "|" + n}
          inline
          world="market-research"
          kind={sc.r ? "Region panel book" : "Entire panel book"}
          title={t}
          sub={name}
          icon={kind === "b2b" ? "building" : kind === "hc" ? "heart" : "users"}
          resource={{ type: "panel-book", key: docKey, title: t }}
          extra={{ doc: docKey }}
          onUnlock={(lead) => pb10Book10(key2, sc, list, lead)}
          onClose={() => setN((v) => v + 1)}
        />
      </div>
    </section>
  );
}
function PB10_Scope({ kind, slug }) {
  const sc = pb10ScopeOf(slug);
  const ix = dlxUseIndex();
  const flags = pc5UseFlags();
  const [seg, setSeg0] = ee.useState(() => (kind === "hc" ? pb10SegQ() : ""));
  const setSeg = (k) => {
    setSeg0(k);
    pb10SetSegQ(k);
  };
  const key2 = pb10Key(kind, seg);
  const list = pb10Entries(ix, key2, sc);
  const st = pb10UseBooks(key2, list);
  const agg = ee.useMemo(() => (st.books ? pb10Agg(st.books) : []), [st.books]);
  const total = list.reduce((a, c) => a + (c.panel || 0), 0);
  const name = sc ? pb10Name(sc) : "";
  dmMeta(
    "/downloads/" + PC5_KINDS[kind].sec + "/" + slug,
    `${name} ${PC5_KINDS[kind].t} | Panel Book | Frequent Research`,
    sc ? `${name} ${PC5_KINDS[kind].t.toLowerCase()}: ${list.length ? list.length + " countries, " + pc5Num(total) + " profiled " + pb10Who(key2) : "every country"}, the combined profile and the market ranking. Download the ${sc.r ? "region" : "entire panel"} book PDF.` : ""
  );
  ee.useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug, kind]);
  if (!sc)
    return (
      <div className="pb10 pb10--none">
        <div className="container">
          <HeroH1 className="pb10-h2">We could not find that region</HeroH1>
          <p>
            <HmLink to={"/downloads/" + PC5_KINDS[kind].sec}>See every {PC5_KINDS[kind].t.toLowerCase()} book</HmLink>
          </p>
        </div>
      </div>
    );
  const C = kind === "hc" ? PB10_SEGC[seg] : { c1: sc.c1, c2: sc.c2, c3: PB10_PANEL[kind].c2 };
  return (
    <div className={"pb10 pb10-scope pc5 pb10--" + kind + (kind === "hc" ? " pb10--" + seg : "")} style={{ ...pb10Vars(C.c1, C.c2, C.c3), "--c1": C.c1, "--c2": C.c2, "--c3": C.c3 }} key={slug}>
      <PB10_ScopeHero kind={kind} sc={sc} key2={key2} list={list} flags={flags} seg={seg} setSeg={setSeg} ix={ix} total={total} nTab={st.books ? agg.length : 0} />
      {!sc.r ? <PB10_Regions kind={kind} ix={ix} key2={key2} seg={seg} flags={flags} /> : null}
      <PB10_Rank kind={kind} list={list} flags={flags} key2={key2} seg={seg} />
      <PB10_Profile key={key2} agg={agg} st={st} name={name} key2={key2} />
      <div className="container">
        <p className="pb10-note">
          <PC5_I n="spark" s={14} /> {PC5_MODEL_NOTE}
        </p>
      </div>
      {list.length ? <PB10_Get kind={kind} sc={sc} key2={key2} list={list} seg={seg} setSeg={setSeg} ix={ix} /> : null}
      <section className="pb10-more" aria-label="Other regions">
        <div className="container pb10-more__row">
          {[...PB10_REG, PB10_ALL]
            .filter((r) => r.slug !== sc.slug && pb10Entries(ix, key2, r).length)
            .map((r) => (
              <HmLink key={r.slug} to={pb10ScopePath(kind, r, kind === "hc" ? seg : "")} style={{ "--c1": r.c1, "--c2": r.c2 }} onClick={() => pb10Sound("region")}>
                <PC5_I n="globe" s={15} /> {pb10Name(r)}
              </HmLink>
            ))}
        </div>
      </section>
    </div>
  );
}

export { PB10_REG, PB10_SEGC, PB10_Scope, PB10_Section, pb10Agg, pb10IsHc, pb10LoadMany, pb10Name, pb10PanelT, pb10ScopeOf, pb10Sound, pb10Who };
