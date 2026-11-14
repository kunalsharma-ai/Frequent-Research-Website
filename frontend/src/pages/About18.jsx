/*
 * Build 65 update 18 — About Us additions (Kunal, 1 November 2026): mission, vision and core capabilities for every
 * service, and "Our reach": every country (with flags) and region, sectors and industries, departments and job titles.
 * Prefix AB18_, styles about18.css (ab18-). Data: R18_DATA (src/data/Reach18.jsx, generated from the panel workbooks),
 * base industries INDUSTRIES / groups INDUSTRY_GROUPS, services via ab5Svc, flags via pc5UseFlags (flag-icons, MIT).
 * Loops move transform / opacity only and pause off screen (shares .ab17-sec / .is-vis from About17.jsx).
 */
import * as ee from 'react';
import { INDUSTRIES, INDUSTRY_GROUPS } from '../app/data/industries.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { pc5FlagUrl } from '../data/PanelCountries65.jsx';
import { AB17_I, ab17Snd } from './About17.jsx';
import { R18_DATA } from '../data/Reach18.jsx';

const ab18D = () => R18_DATA;
const ab18FlagSrc = (flags, iso) => (flags && flags[iso] ? pc5FlagUrl(flags[iso]) : "");
const AB18_REG = {
  "Asia-Pacific": { c1: "#2F6BFF", c2: "#9FE7DC", short: "APAC", ic: "globe" },
  Europe: { c1: "#6D4AFF", c2: "#BBAAFF", short: "Europe", ic: "flag" },
  "Middle East & Africa": { c1: "#D99A2B", c2: "#FFC27A", short: "MEA", ic: "sun" },
  "North America": { c1: "#C8577E", c2: "#F2A9C1", short: "N. America", ic: "pin" },
  "South America": { c1: "#0E9C88", c2: "#9FE7DC", short: "S. America", ic: "leaf" },
};
const AB18_SEC = {
  resources: { c: "#0E9C88", ic: "leaf" },
  industrial: { c: "#2F6BFF", ic: "cpu" },
  energy: { c: "#D99A2B", ic: "bolt" },
  public: { c: "#6D4AFF", ic: "shield" },
  tech: { c: "#2F6BFF", ic: "globe" },
  consumer: { c: "#C8577E", ic: "heart" },
  media: { c: "#6D4AFF", ic: "play" },
  services: { c: "#0E9C88", ic: "handshake" },
};
const AB18_AUD = {
  Agriculture: { c: "#0E9C88", ic: "leaf" },
  Services: { c: "#2F6BFF", ic: "handshake" },
  Manufacturing: { c: "#6D4AFF", ic: "cpu" },
  "Government & defence": { c: "#D99A2B", ic: "shield" },
  Healthcare: { c: "#C8577E", ic: "heart" },
};
const ab18Fmt = (n) => (n || 0).toLocaleString("en-US");
const ab18Abbr = (s) => {
  const w = String(s)
    .replace(/[&/,()-]/g, " ")
    .split(/\s+/)
    .filter((x) => x && !/^(and|of|the|department|management)$/i.test(x));
  return ((w[0] || "?")[0] + ((w[1] || w[0] || "?")[w[1] ? 0 : 1] || "")).toUpperCase().replace(/^(.)(.)$/, (m, a, b) => a + b.toLowerCase());
};

/* ── mission, vision, core capabilities ───────────────────────────────────────────── */

/* ── our reach ──────────────────────────────────────────────────────────────────────── */
/* a 3D globe of flags: every country sits on a sphere (Fibonacci spiral); the sphere turns with transform only */
function AB18_Globe({ countries, flags, reg }) {
  const n = countries.length;
  return (
    <div className="ab18-globe" aria-hidden="true">
      <div className="ab18-globe__core" />
      <div className="ab18-globe__spin">
        {countries.map((c, i) => {
          const y = 1 - (i / (n - 1)) * 2;
          const lat = (Math.asin(y) * 180) / Math.PI;
          const lon = (i * 137.508) % 360;
          const src = ab18FlagSrc(flags, c[1]);
          return (
            <span key={c[1]} className={"ab18-globe__f" + (reg && c[4] !== reg ? " is-dim" : "")} style={{ transform: "rotateY(" + lon.toFixed(1) + "deg) rotateX(" + lat.toFixed(1) + "deg) translateZ(var(--gr))" }}>
              {src ? <img src={src} alt="" decoding="async" /> : <i />}
            </span>
          );
        })}
      </div>
      <div className="ab18-globe__glow" />
    </div>
  );
}
function AB18_FlagRiver({ flags }) {
  const D = ab18D();
  const all = D.regions.flatMap(([, cs]) => cs);
  const rows = [all.filter((_, i) => i % 2 === 0), all.filter((_, i) => i % 2 === 1)];
  return (
    <div className="ab18-river" aria-hidden="true">
      {rows.map((row, k) => (
        <div key={k} className={"ab18-river__row ab18-river__row--" + k}>
          <div className="ab18-river__run">
            {[...row, ...row].map((c, i) => {
              const src = ab18FlagSrc(flags, c[1]);
              return (
                <span key={i} className="ab18-river__it">
                  {src ? <img src={src} alt="" decoding="async" /> : null}
                  {c[0]}
                </span>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
function AB18_Sectors() {
  const G = INDUSTRY_GROUPS;
  const X = INDUSTRIES;
  return (
    <div className="ab18-sx">
      {G.map((g, i) => {
        const m = AB18_SEC[g.key] || { c: "#2F6BFF", ic: "layers" };
        const list = X.filter((x) => x.group === g.key);
        return (
          <div key={g.key} className="ab18-sxc" style={{ "--c": m.c, "--i": i }}>
            <div className="ab18-sxc__top">
              <span className="ab18-sxc__ic">
                <AB17_I n={m.ic} s={20} />
              </span>
              <b>{g.name}</b>
              <em>{list.length}</em>
            </div>
            <ul>
              {list.map((x, j) => (
                <li key={x.slug} style={{ "--j": j }}>
                  <HmLink to={"/industries-case-studies/" + x.slug}>{x.name}</HmLink>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
function AB18_Depts() {
  const D = ab18D();
  const tones = ["#2F6BFF", "#6D4AFF", "#0E9C88", "#C8577E", "#D99A2B"];
  return (
    <ol className="ab18-pt">
      {D.departments.map((d, i) => (
        <li key={d} className="ab18-pt__el" style={{ "--c": tones[i % tones.length], "--i": i }}>
          <small>{String(i + 1).padStart(2, "0")}</small>
          <b>{ab18Abbr(d)}</b>
          <span>{d}</span>
        </li>
      ))}
    </ol>
  );
}
function AB18_Titles() {
  const D = ab18D();
  const auds = [...new Set(D.families.map((f) => f[0]))];
  const [a, setA] = ee.useState(0);
  const [f, setF] = ee.useState(0);
  const [q, setQ] = ee.useState("");
  const fams = D.families.filter((x) => x[0] === auds[a]);
  const fam = fams[Math.min(f, fams.length - 1)] || [null, "", []];
  const ql = q.trim().toLowerCase();
  const hits = ql.length > 1 ? D.families.flatMap(([au, fn, ts]) => ts.filter((t) => t.toLowerCase().includes(ql)).map((t) => [t, au, fn])) : null;
  const seen = new Set();
  const uniq = hits ? hits.filter((h) => !seen.has(h[0]) && seen.add(h[0])) : null;
  const pickA = (i) => {
    setA(i);
    setF(0);
    ab17Snd("tab");
  };
  return (
    <div className="ab18-jt">
      <div className="ab18-jt__bar">
        <div className="ab18-jt__auds" role="tablist" aria-label="Audiences">
          {auds.map((x, i) => {
            const m = AB18_AUD[x] || {};
            const n = new Set(D.families.filter((y) => y[0] === x).flatMap((y) => y[2])).size;
            return (
              <button key={x} type="button" role="tab" aria-selected={a === i && !uniq} className={"ab18-jt__aud" + (a === i && !uniq ? " is-on" : "")} style={{ "--c": m.c }} onClick={() => (setQ(""), pickA(i))}>
                <AB17_I n={m.ic} s={16} /> {x} <small>{ab18Fmt(n)}</small>
              </button>
            );
          })}
        </div>
        <label className="ab18-jt__search">
          <AB17_I n="search" s={16} />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={"Search " + ab18Fmt(D.titles) + " job titles, e.g. CFO, nurse, agronomist"} aria-label="Search job titles" />
        </label>
      </div>
      {uniq ? (
        <div className="ab18-jt__res">
          <p>
            <b>{uniq.length}</b> {uniq.length === 1 ? "title" : "titles"} match “{q.trim()}”
          </p>
          <ul className="ab18-jt__cloud">
            {uniq.slice(0, 120).map(([t, au, fn], i) => (
              <li key={t} style={{ "--c": (AB18_AUD[au] || {}).c, "--i": Math.min(i, 30) }} title={au + " · " + fn}>
                {t}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="ab18-jt__body" style={{ "--c": (AB18_AUD[auds[a]] || {}).c }}>
          <ul className="ab18-jt__fams">
            {fams.map((x, i) => (
              <li key={x[1]}>
                <button type="button" className={i === Math.min(f, fams.length - 1) ? "is-on" : ""} onClick={() => (setF(i), ab17Snd("tab"))}>
                  {x[1]} <small>{x[2].length}</small>
                </button>
              </li>
            ))}
          </ul>
          <div className="ab18-jt__pane">
            <h4>
              {fam[1]} <small>{fam[2].length} job titles</small>
            </h4>
            <ul className="ab18-jt__cloud" key={auds[a] + fam[1]}>
              {fam[2].map((t, i) => (
                <li key={t} style={{ "--i": Math.min(i, 40) }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
function AB18_TitleRiver() {
  const D = ab18D();
  const pick = (k) => D.families.filter((_, i) => i % 3 === k).flatMap((f) => f[2].slice(0, 3));
  const fonts = ["ab18-tr--serif", "ab18-tr--grot", "ab18-tr--display"];
  return (
    <div className="ab18-tr" aria-hidden="true">
      {[0, 1, 2].map((k) => (
        <div key={k} className={"ab18-tr__row ab18-tr__row--" + k + " " + fonts[k]}>
          <div className="ab18-tr__run">
            {[...pick(k), ...pick(k)].map((t, i) => (
              <span key={i}>{t}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── hero: a tilted 3D orbit of flags and the four engines around the particle question ─────────── */

export { AB18_Depts, AB18_FlagRiver, AB18_Globe, AB18_REG, AB18_Sectors, AB18_TitleRiver, AB18_Titles };
