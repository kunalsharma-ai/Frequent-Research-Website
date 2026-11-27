/*
 * Country panel pages (build 65, update 3). Prefix PC5_. Styles: src/styles/panelcountry65.css (pc5-).
 *   /downloads/consumer-panel-books/:country     every consumer panel table for that country
 *   /downloads/business-panel-books/:country     company size, revenue and every sector / department / job-title table
 *   /downloads/healthcare-panel-books/:country   the three healthcare segments; figures appear once the country data
 *                                                is added under public/data/panel-books/hc/<segment>/<slug>.json
 * Each page is graded in its own flag colours (PC5_META), opens with a waving HD flag, a spinning currency coin and the
 * panel size, walks through the panel chapter by chapter with a chart chosen for each table, and ends with the
 * download: the visitor fills in the form for every download (Gate.jsx) and gets the PDF (PanelPdf65.jsx).
 * Figures are exactly the workbook figures (public/data/panel-books); the short insight lines only restate them.
 * PC5_Explorer is the country picker used on the three section pages.
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useParams } from 'react-router-dom';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { K5_Count, K5_Rv, K5_Sec, k5Reduce } from '../components/site/Kit65.jsx';
import { fp5Health } from '../components/site/Pdfs65.jsx';
import { dlxBook, dlxUseIndex } from './Downloads.jsx';
import { PC5_CAT, PC5_Flag, PC5_HC_SEG, PC5_I, PC5_KINDS, PC5_MODEL_NOTE, pc5Cat, pc5HcBook, pc5HcTitle, pc5Meta, pc5Mix, pc5N, pc5Num, pc5Pal, pc5Pct, pc5SecIc, pc5Title, pc5UseFlags, pc5Whole } from '../data/PanelCountries65.jsx';
import { PC8_Get, PC8_Hero } from './PanelCountry8.jsx';
import { PB10_SEGC, PB10_Scope, pb10ScopeOf, pb10Sound } from './PanelBooks10.jsx';
import { pp5PanelBook } from '../components/site/PanelPdf65.jsx';

const pc5Sec2Kind = (sec) => (sec === "business-panel-books" ? "b2b" : sec === "healthcare-panel-books" ? "hc" : "b2c");
const pc5Path = (kind, slug) => "/downloads/" + PC5_KINDS[kind].sec + "/" + slug;

function pc5UseBook(kind, slug) {
  const [st, setSt] = ee.useState({ book: null, err: "" });
  ee.useEffect(() => {
    if (kind === "hc" || !slug) return undefined;
    let on = true;
    setSt({ book: null, err: "" });
    dlxBook(kind, slug).then(
      (b) => on && setSt({ book: b, err: "" }),
      (e) => on && setSt({ book: null, err: e.message })
    );
    return () => {
      on = false;
    };
  }, [kind, slug]);
  return st;
}

/* tables of a book, cleaned and classified */
function pc5Tables(book) {
  if (!book) return [];
  const b2b = book.kind === "b2b";
  const hc = /^(hc|hcp|caregivers|patients)$/.test(book.kind || "");
  const out = [];
  (book.groups || []).forEach((g, gi) =>
    g.tables.forEach((t, ti) => {
      // update 8: income tables carry the band in column B; show it with the class name
      const rows = t.rows.filter((r) => r[1] > 0).map((r) => (r[3] ? [r[0] + " · " + r[3], r[1], r[2]] : r));
      if (!rows.length) return;
      const x = { id: "t" + gi + "-" + ti, group: g.title || "", gi, t: pc5Title(t.title, book.name), cat: pc5Cat(t.title, b2b && !!g.title ? true : b2b), rows };
      if (hc) {
        x.t = pc5HcTitle(x.t);
        if (x.cat === "other") x.ic = pc5HcIc(x.group);
      }
      out.push(x);
    })
  );
  return out;
}
const pc5Top = (rows) => rows.reduce((a, r) => (r[1] > a[1] ? r : a), rows[0]);
const pc5Insight = (x) => {
  const top = pc5Top(x.rows);
  return { label: top[0], v: top[1] };
};

/* ── charts ─────────────────────────────────────────────────────────────────────────── */
function PC5_Pict({ rows }) {
  const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
  const n = 20;
  let acc = 0;
  const cells = [];
  rows.forEach((r, i) => {
    const k = Math.round(((acc + r[1]) / tot) * n) - Math.round((acc / tot) * n);
    acc += r[1];
    for (let j = 0; j < k; j++) cells.push(i);
  });
  return (
    <div className="pc5-pict">
      <div className="pc5-pict__grid" aria-hidden="true">
        {cells.map((c, i) => (
          <span key={i} className={"pc5-pict__p pc5-pict__p--" + Math.min(c, 2)} style={{ "--i": i }}>
            <svg viewBox="0 0 24 24">
              <circle cx="12" cy="6" r="3.6" />
              <path d={c === 1 ? "M12 10.5c-2.9 0-4.6 1.9-5 4.5l-1 6h12l-1-6c-.4-2.6-2.1-4.5-5-4.5z" : "M8 11h8a2 2 0 0 1 2 2v5h-2v4H8v-4H6v-5a2 2 0 0 1 2-2z"} />
            </svg>
          </span>
        ))}
      </div>
      <ul className="pc5-legend">
        {rows.map((r, i) => (
          <li key={r[0]} className={"pc5-legend__i--" + Math.min(i, 2)}>
            <i aria-hidden="true" />
            <b>{pc5Pct(r[1])}{pc5N(r)}</b> {r[0]}
          </li>
        ))}
      </ul>
    </div>
  );
}

const PC5_DC = ["var(--fa)", "var(--fb)", "var(--fc)", "var(--fa2)", "var(--fb2)", "var(--fc2)", "var(--fa3)", "var(--fb3)"];
function PC5_Donut({ rows, label }) {
  const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
  const R = 42,
    C = 2 * Math.PI * R;
  let off = 0;
  const top = pc5Top(rows);
  return (
    <div className="pc5-donut">
      <svg viewBox="0 0 120 120" role="img" aria-label={(label || "Share") + ": " + rows.map((r) => r[0] + " " + pc5Pct(r[1])).join(", ")}>
        <circle cx="60" cy="60" r={R} className="pc5-donut__bg" />
        {rows.map((r, i) => {
          const len = (r[1] / tot) * C;
          const el = <circle key={r[0]} cx="60" cy="60" r={R} className="pc5-donut__s" style={{ "--len": len.toFixed(2), "--off": (-off).toFixed(2), "--C": C.toFixed(2), "--i": i, stroke: PC5_DC[i % PC5_DC.length] }} />;
          off += len;
          return el;
        })}
        <text x="60" y="66" className="pc5-donut__v">
          {pc5Pct(top[1])}
        </text>
      </svg>
      <ul className="pc5-legend pc5-legend--col">
        {rows.map((r, i) => (
          <li key={r[0]}>
            <i aria-hidden="true" style={{ background: PC5_DC[i % PC5_DC.length] }} />
            <span>{r[0]}</span>
            <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PC5_Cols({ rows, coin }) {
  const max = Math.max(...rows.map((r) => r[1])) || 1;
  return (
    <div className={"pc5-cols" + (coin ? " pc5-cols--coin" : "") + (rows.length > 6 ? " pc5-cols--many" : "")} style={{ "--n": rows.length }}>
      {rows.map((r, i) => (
        <div key={r[0]} className="pc5-cols__c" style={{ "--h": (r[1] / max) * 100 + "%", "--i": i }}>
          <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          <span className="pc5-cols__bar">{coin && r[1] / max > 0.3 ? <em aria-hidden="true">{coin}</em> : null}</span>
          <small>{r[0]}</small>
        </div>
      ))}
    </div>
  );
}

function PC5_Bars({ rows, limit = 8, sort = true, icon }) {
  const [all, setAll] = ee.useState(false);
  const list = sort ? [...rows].sort((a, b) => b[1] - a[1]) : rows;
  const max = Math.max(...list.map((r) => r[1])) || 1;
  const shown = all ? list : list.slice(0, limit);
  return (
    <div className="pc5-bars">
      <ul>
        {shown.map((r, i) => (
          <li key={r[0]} style={{ "--w": (r[1] / max) * 100 + "%", "--i": Math.min(i, 14) }}>
            <span className="pc5-bars__t">
              {icon ? <PC5_I n={icon} s={14} /> : null}
              {r[0]}
            </span>
            <span className="pc5-bars__track">
              <i />
            </span>
            <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          </li>
        ))}
      </ul>
      {list.length > limit ? (
        <button type="button" className="pc5-more" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? "Show fewer" : `Show all ${list.length}`} <PC5_I n={all ? "x" : "arrow"} s={13} />
        </button>
      ) : null}
    </div>
  );
}

function PC5_Ribbon({ rows }) {
  const tot = rows.reduce((a, r) => a + r[1], 0) || 1;
  const list = [...rows].sort((a, b) => b[1] - a[1]);
  return (
    <div className="pc5-ribbon">
      <div className="pc5-ribbon__bar" role="img" aria-label={list.map((r) => r[0] + " " + pc5Pct(r[1])).join(", ")}>
        {list.map((r, i) => (
          <span key={r[0]} style={{ "--w": (r[1] / tot) * 100 + "%", "--i": i, background: PC5_DC[i % PC5_DC.length] }} />
        ))}
      </div>
      <ul className="pc5-legend pc5-legend--col">
        {list.map((r, i) => (
          <li key={r[0]}>
            <i aria-hidden="true" style={{ background: PC5_DC[i % PC5_DC.length] }} />
            <span>{r[0]}</span>
            <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PC5_Meters({ rows, limit = 4 }) {
  const list = [...rows].sort((a, b) => b[1] - a[1]).slice(0, limit);
  const max = Math.max(...list.map((r) => r[1])) || 1;
  const R = 26,
    C = 2 * Math.PI * R;
  return (
    <ul className="pc5-meters">
      {list.map((r, i) => (
        <li key={r[0]} style={{ "--i": i }}>
          <svg viewBox="0 0 64 64" aria-hidden="true">
            <circle cx="32" cy="32" r={R} className="pc5-meters__bg" />
            <circle cx="32" cy="32" r={R} className="pc5-meters__v" style={{ "--C": C.toFixed(2), "--len": ((r[1] / max) * C * 0.92).toFixed(2) }} />
          </svg>
          <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          <span>{r[0]}</span>
        </li>
      ))}
    </ul>
  );
}

function PC5_Podium({ rows }) {
  const list = [...rows].sort((a, b) => b[1] - a[1]);
  const p = [list[1], list[0], list[2]].filter(Boolean);
  return (
    <div className="pc5-podium">
      <ol aria-label="Top three">
        {p.map((r) => {
          const rank = list.indexOf(r) + 1;
          return (
            <li key={r[0]} className={"pc5-podium__s pc5-podium__s--" + rank}>
              <span className="pc5-podium__l">{r[0]}</span>
              <b>{pc5Pct(r[1])}{pc5N(r)}</b>
              <span className="pc5-podium__b">
                <em>{rank}</em>
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function PC5_Sky({ rows }) {
  const max = Math.max(...rows.map((r) => r[1])) || 1;
  return (
    <div className="pc5-sky" style={{ "--n": rows.length }}>
      {rows.map((r, i) => (
        <div key={r[0]} className="pc5-sky__b" style={{ "--h": 18 + (r[1] / max) * 82 + "%", "--i": i, "--f": i % 3 }}>
          <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          <span className="pc5-sky__t" aria-hidden="true">
            <i />
          </span>
          <small>{r[0]}</small>
        </div>
      ))}
    </div>
  );
}

function PC5_Tiles({ rows }) {
  const list = [...rows].sort((a, b) => b[1] - a[1]);
  const max = Math.max(...list.map((r) => r[1])) || 1;
  return (
    <ul className="pc5-tiles">
      {list.map((r, i) => (
        <li key={r[0]} style={{ "--a": 0.25 + (r[1] / max) * 0.75, "--i": Math.min(i, 16) }}>
          <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          <span>{r[0]}</span>
        </li>
      ))}
    </ul>
  );
}

/* the chart for one table */
function PC5_Viz({ x, cur }) {
  const r = x.rows;
  switch (x.cat) {
    case "gender":
      return r.length <= 3 ? <PC5_Pict rows={r} /> : <PC5_Donut rows={r} label={x.t} />;
    case "age":
    case "parents":
      return <PC5_Cols rows={r} />;
    case "pincome":
    case "hincome":
    case "revenue":
      return <PC5_Cols rows={r} coin={cur} />;
    case "marital":
    case "home":
    case "industry":
      return pc5Whole(r) && r.length <= 7 ? <PC5_Donut rows={r} label={x.t} /> : <PC5_Bars rows={r} />;
    case "csize":
      return <PC5_Sky rows={r} />;
    case "ethnicity":
      return pc5Whole(r) && r.length <= 9 ? <PC5_Ribbon rows={r} /> : <PC5_Bars rows={r} />;
    case "house":
      return <PC5_Tiles rows={r} />;
    case "region":
      return <PC5_Bars rows={r} limit={10} icon="pin" />;
    case "education":
      return <PC5_Bars rows={r} sort={false} limit={10} icon="grad" />;
    default:
      return <PC5_Bars rows={r} />;
  }
}

function PC5_Card({ x, cur, wide, n }) {
  const c = x.ic ? { ...(PC5_CAT[x.cat] || PC5_CAT.other), ic: x.ic } : PC5_CAT[x.cat] || PC5_CAT.other;
  const ins = pc5Insight(x);
  return (
    <K5_Rv as="article" a="up" d={n % 4} className={"pc5-card" + (wide ? " pc5-card--wide" : "") + " pc5-card--" + x.cat} aria-labelledby={x.id + "-h"}>
      <header className="pc5-card__h">
        <span className="pc5-card__ic">
          <PC5_I n={c.ic} s={20} />
        </span>
        <h3 id={x.id + "-h"}>{x.t}</h3>
        <small>{x.rows.length} groups</small>
      </header>
      <PC5_Viz x={x} cur={cur} />
      <p className="pc5-card__ins">
        <PC5_I n="spark" s={14} /> Largest group: <b>{ins.label}</b> at {pc5Pct(ins.v)}
      </p>
    </K5_Rv>
  );
}

/* ── hero ─────────────────────────────────────────────────────────────────────────── */

function PC5_Motto({ words }) {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    setI(0);
    if (k5Reduce()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words.join("|")]);
  return (
    <p className="pc5-motto">
      <span>Know them</span>{" "}
      <span className="pc5-motto__roll" aria-live="off">
        <b key={i}>{words[i]}</b>
      </span>
    </p>
  );
}

const pc5Scroll = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
};

/* at-a-glance bento */
function PC5_Glance({ kind, entry, tables, meta }) {
  const by = (c) => tables.find((x) => x.cat === c);
  const pick = kind === "b2b" ? ["gender", "csize", "revenue", "industry"] : ["gender", "age", "region", "occupation", "pincome", "tech"];
  const items = pick.map(by).filter(Boolean);
  return (
    <K5_Sec className="pc5-glance" aria-labelledby="pc5-glance-h">
      <div className="container">
        <span className="pc5-eb">
          <PC5_I n="spark" s={14} /> At a glance
        </span>
        <h2 id="pc5-glance-h" className="pc5-h2">
          {entry.name} in {items.length + 1} numbers
        </h2>
        <ul className={"pc5-bento pc5-bento--" + (items.length + 1)}>
          <li className="pc5-bento__big">
            <span className="pc5-bento__ic">
              <PC5_I n={PC5_KINDS[kind].icon} s={26} />
            </span>
            <b style={{ "--n": pc5Num(entry.panel || 0).length }}>
              <K5_Count to={entry.panel || 0} fmt={pc5Num} />
            </b>
            <span>profiled {PC5_KINDS[kind].who} in {entry.name}</span>
          </li>
          {items.map((x, i) => {
            const c = PC5_CAT[x.cat];
            const t = pc5Insight(x);
            return (
              <li key={x.id} style={{ "--i": i }}>
                <span className="pc5-bento__ic">
                  <PC5_I n={c.ic} s={20} />
                </span>
                <small>{c.t}</small>
                <b>{pc5Pct(t.v)}</b>
                <span>{t.label}</span>
              </li>
            );
          })}
        </ul>
        {meta.note ? <p className="pc5-note">{meta.note}</p> : null}
      </div>
    </K5_Sec>
  );
}

/* B2C chapters */
const PC5_CH = [
  ["who", "Who they are", "people", "Gender, age, marital status, education and life stage."],
  ["money", "Work & money", "wallet", "What they do, what they earn and how they bank."],
  ["home", "Home & family", "home", "Homes, ownership, children and family life."],
  ["where", "Where they live", "pin", "Regions and background across the country."],
  ["use", "What they own & use", "phone", "Cars, devices, travel, lifestyle and media."],
  ["aud", "Audience profiles", "layers", "Ready-made audiences for shopping, sport, gaming, beauty, pets, food and health."],
];

function PC5_Chapter({ ch, n, list, cur }) {
  const [k, t, ic, d] = ch;
  return (
    <K5_Sec className={"pc5-ch pc5-ch--" + k} id={"pc5-ch-" + k} aria-labelledby={"pc5-ch-" + k + "-h"}>
      <div className="container">
        <header className="pc5-ch__h">
          <span className="pc5-ch__n" aria-hidden="true">
            {String(n).padStart(2, "0")}
          </span>
          <span className="pc5-ch__ic" aria-hidden="true">
            <PC5_I n={ic} s={26} />
          </span>
          <div>
            <h2 id={"pc5-ch-" + k + "-h"} className="pc5-h2">
              {t}
            </h2>
            <p>{d}</p>
          </div>
        </header>
        {k === "aud" ? (
          <PC5_Aud list={list} />
        ) : k === "use" ? (
          <div className="pc5-use">
            {list.map((x, i) => (
              <PC5_Use key={x.id} x={x} i={i} />
            ))}
          </div>
        ) : (
          <div className="pc5-grid">
            {(() => {
              /* an odd half card would sit alone, so the last half card goes wide */
              const wide = list.map((x) => x.rows.length > 9 || ["pincome", "hincome", "region", "occupation"].includes(x.cat) || x.rows.some((r) => String(r[0]).length > 44));
              const half = wide.reduce((a, w, i) => (w ? a : [...a, i]), []);
              if (half.length % 2) wide[half[half.length - 1]] = true;
              return list.map((x, i) => <PC5_Card key={x.id} x={x} cur={cur} n={i} wide={wide[i]} />);
            })()}
          </div>
        )}
      </div>
    </K5_Sec>
  );
}

function PC5_Use({ x, i }) {
  const [open, setOpen] = ee.useState(false);
  const c = x.ic ? { ...(PC5_CAT[x.cat] || PC5_CAT.other), ic: x.ic } : PC5_CAT[x.cat] || PC5_CAT.other;
  return (
    <K5_Rv as="article" a="flip" d={i} className="pc5-usecard" aria-labelledby={x.id + "-h"}>
      <span className="pc5-usecard__ic" aria-hidden="true">
        <PC5_I n={c.ic} s={30} />
      </span>
      <h3 id={x.id + "-h"}>{x.t}</h3>
      <PC5_Meters rows={x.rows} />
      {open ? <PC5_Bars rows={x.rows} limit={40} /> : null}
      <button type="button" className="pc5-more" aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? "Hide the list" : `All ${x.rows.length} groups`} <PC5_I n={open ? "x" : "arrow"} s={13} />
      </button>
    </K5_Rv>
  );
}

function PC5_Aud({ list }) {
  const [on, setOn] = ee.useState(0);
  const x = list[on] || list[0];
  if (!x) return null;
  return (
    <div className="pc5-aud">
      <div className="pc5-aud__tabs" role="tablist" aria-label="Audience profiles">
        {list.map((y, i) => {
          const c = PC5_CAT[y.cat] || PC5_CAT.other;
          return (
            <button key={y.id} type="button" role="tab" id={y.id + "-tab"} aria-selected={i === on} aria-controls="pc5-aud-panel" className={i === on ? "is-on" : ""} onClick={() => setOn(i)}>
              <PC5_I n={c.ic} s={18} />
              <span>{y.t.replace(/ (Audience )?(Profile|Category|Categories|Distribution)s?$/i, "")}</span>
            </button>
          );
        })}
      </div>
      <div className="pc5-aud__panel" id="pc5-aud-panel" role="tabpanel" aria-labelledby={x.id + "-tab"} key={x.id}>
        <h3>{x.t}</h3>
        <PC5_Podium rows={x.rows} />
        <PC5_Bars rows={x.rows} limit={10} />
      </div>
    </div>
  );
}

/* B2B: company profile + sectors */
function PC5_Biz({ tables, cur }) {
  const base = tables.filter((x) => !x.group);
  return (
    <K5_Sec className="pc5-ch pc5-ch--biz" id="pc5-ch-biz" aria-labelledby="pc5-ch-biz-h">
      <div className="container">
        <header className="pc5-ch__h">
          <span className="pc5-ch__n" aria-hidden="true">
            01
          </span>
          <span className="pc5-ch__ic" aria-hidden="true">
            <PC5_I n="factory" s={26} />
          </span>
          <div>
            <h2 id="pc5-ch-biz-h" className="pc5-h2">
              Who they are and where they work
            </h2>
            <p>Gender, company size, company revenue and region of the professionals on this panel.</p>
          </div>
        </header>
        <div className="pc5-grid">
          {base.map((x, i) => (
            <PC5_Card key={x.id} x={x} cur={cur} n={i} wide={x.cat !== "gender"} />
          ))}
        </div>
      </div>
    </K5_Sec>
  );
}

function PC5_Sectors({ tables, cur }) {
  const groups = [];
  tables
    .filter((x) => x.group)
    .forEach((x) => {
      let g = groups.find((y) => y.gi === x.gi);
      if (!g) groups.push((g = { gi: x.gi, t: x.group, list: [] }));
      g.list.push(x);
    });
  const [on, setOn] = ee.useState(0);
  if (!groups.length)
    return (
      <K5_Sec className="pc5-ch pc5-ch--sec">
        <div className="container">
          <p className="pc5-note">Sector-by-sector job-title tables for this country are included in the panel book as they are added.</p>
        </div>
      </K5_Sec>
    );
  const g = groups[on] || groups[0];
  const lead = g.list.filter((x) => x.cat === "industry" || x.cat === "dept");
  const roles = g.list.filter((x) => x.cat === "role");
  return (
    <K5_Sec className="pc5-ch pc5-ch--sec" id="pc5-ch-sec" aria-labelledby="pc5-ch-sec-h">
      <div className="container">
        <header className="pc5-ch__h">
          <span className="pc5-ch__n" aria-hidden="true">
            02
          </span>
          <span className="pc5-ch__ic" aria-hidden="true">
            <PC5_I n="layers" s={26} />
          </span>
          <div>
            <h2 id="pc5-ch-sec-h" className="pc5-h2">
              Sector by sector
            </h2>
            <p>
              {groups.length} sector {groups.length === 1 ? "section" : "sections"}, each with its industry mix, departments and job titles.
            </p>
          </div>
        </header>
        <div className="pc5-sectabs" role="tablist" aria-label="Sectors">
          {groups.map((y, i) => (
            <button key={y.gi} type="button" role="tab" aria-selected={i === on} className={i === on ? "is-on" : ""} onClick={() => setOn(i)}>
              <span className="pc5-sectabs__ic">
                <PC5_I n={pc5SecIc(y.t)} s={22} />
              </span>
              <span>
                <b>{y.t}</b>
                <small>{y.list.length} tables</small>
              </span>
            </button>
          ))}
        </div>
        <div className="pc5-secpanel" key={g.gi}>
          <div className="pc5-grid">
            {lead.map((x, i) => (
              <PC5_Card key={x.id} x={x} cur={cur} n={i} wide={x.rows.length > 9} />
            ))}
          </div>
          <h3 className="pc5-h3">
            <PC5_I n="badge" s={18} /> Job titles in {g.t.toLowerCase()}
          </h3>
          <div className="pc5-roles">
            {roles.map((x, i) => (
              <PC5_Role key={x.id} x={x} i={i} />
            ))}
          </div>
        </div>
      </div>
    </K5_Sec>
  );
}
function PC5_Role({ x, i }) {
  const [open, setOpen] = ee.useState(false);
  const list = [...x.rows].sort((a, b) => b[1] - a[1]);
  const max = list[0][1] || 1;
  const shown = open ? list : list.slice(0, 4);
  return (
    <K5_Rv as="article" a="zoom" d={i % 6} className="pc5-role">
      <h4>{x.t}</h4>
      <ul>
        {shown.map((r) => (
          <li key={r[0]} style={{ "--w": (r[1] / max) * 100 + "%" }}>
            <span>{r[0]}</span>
            <b>{pc5Pct(r[1])}{pc5N(r)}</b>
          </li>
        ))}
      </ul>
      {list.length > 4 ? (
        <button type="button" className="pc5-more" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Show fewer" : `All ${list.length} titles`}
        </button>
      ) : null}
    </K5_Rv>
  );
}

/* healthcare (update 7): three segment panels per country. The visitor picks a segment; every PART of that segment's
   workbook becomes a chapter. Short parts are drawn as chart cards; long parts (job titles, AI departments, conditions)
   open with their distribution card and list the rest as compact cards. Figures: public/data/panel-books/hc/<seg>/<slug>.json */
const pc5HcIc = (t) =>
  /demograph/i.test(t) ? "people" : /income/i.test(t) ? "wallet" : /\bai\b/i.test(t) ? "chip" : /job title|specialis/i.test(t) ? "badge" : /family|home/i.test(t) ? "hand" : /professional/i.test(t) ? "idcard" : /condition|disease/i.test(t) ? "cell" : /treatment|access|device|insurance/i.test(t) ? "pill" : /lifestyle|behaviour/i.test(t) ? "sun" : "pulse";
const pc5HcDesc = (g) => {
  const n = g.list.length;
  const top = g.list
    .slice(0, 3)
    .map((x) => x.t)
    .join(", ");
  return `${n} ${n === 1 ? "table" : "tables"}: ${top}${n > 3 ? " and more" : ""}.`;
};
const pc5HcGroups = (tables) => {
  const out = [];
  tables.forEach((x) => {
    let g = out.find((y) => y.gi === x.gi);
    if (!g) out.push((g = { gi: x.gi, t: x.group || "Profile", list: [] }));
    g.list.push(x);
  });
  return out;
};
/* a long part: many tables, or long tables */
const pc5HcLong = (g) => g.list.length > 12 || g.list.reduce((a, x) => a + x.rows.length, 0) / g.list.length > 18;

function PC5_HcPart({ g, n, cur }) {
  const long = pc5HcLong(g);
  const [all, setAll] = ee.useState(false);
  const ic = pc5HcIc(g.t);
  let head = [],
    rest = g.list;
  if (long) {
    /* a part that opens with an overall distribution (e.g. "AI Department Distribution", "Primary Disease Category") shows it as a card */
    const f = g.list[0];
    if (f && f.rows.length >= 10 && g.list.length > 4 && g.list.slice(1).every((y) => y.rows.length < f.rows.length)) {
      head = [f];
      rest = g.list.slice(1);
    }
  }
  const LIM = 12;
  const shown = long && !all ? rest.slice(0, LIM) : rest;
  return (
    <K5_Sec className={"pc5-ch pc5-hcp" + (n % 2 ? "" : " pc5-hcp--alt")} id={"pc5-ch-hc" + g.gi} aria-labelledby={"pc5-ch-hc" + g.gi + "-h"}>
      <div className="container">
        <header className="pc5-ch__h pc5-hcp__h">
          <span className="pc5-ch__n" aria-hidden="true">
            {String(n).padStart(2, "0")}
          </span>
          <span className="pc5-ch__ic pc5-hcp__ic" aria-hidden="true">
            <PC5_I n={ic} s={26} />
            <i />
          </span>
          <div>
            <h2 id={"pc5-ch-hc" + g.gi + "-h"} className="pc5-h2">
              {g.t}
            </h2>
            <p>{pc5HcDesc(g)}</p>
          </div>
        </header>
        {long ? (
          <>
            {head.length ? (
              <div className="pc5-grid">
                {head.map((x, i) => (
                  <PC5_Card key={x.id} x={x} cur={cur} n={i} wide />
                ))}
              </div>
            ) : null}
            {head.length ? (
              <h3 className="pc5-h3">
                <PC5_I n={ic} s={18} /> {rest.length} detailed tables
              </h3>
            ) : null}
            <div className="pc5-roles">
              {shown.map((x, i) => (
                <PC5_Role key={x.id} x={x} i={i} />
              ))}
            </div>
            {rest.length > LIM ? (
              <button type="button" className="pc5-more pc5-more--big" aria-expanded={all} onClick={() => setAll(!all)}>
                {all ? "Show fewer tables" : `Show all ${rest.length} tables`} <PC5_I n={all ? "x" : "arrow"} s={13} />
              </button>
            ) : null}
          </>
        ) : (
          <div className="pc5-grid">
            {(() => {
              const wide = g.list.map((x) => x.rows.length > 9 || ["pincome", "hincome", "region"].includes(x.cat) || x.rows.some((r) => String(r[0]).length > 44));
              const half = wide.reduce((a, w, i) => (w ? a : [...a, i]), []);
              if (half.length % 2) wide[half[half.length - 1]] = true;
              return g.list.map((x, i) => <PC5_Card key={x.id} x={x} cur={cur} n={i} wide={wide[i]} />);
            })()}
          </div>
        )}
      </div>
    </K5_Sec>
  );
}

function PC5_HcSel({ entry, segs, seg, setSeg, books }) {
  return (
    <K5_Sec className="pc5-hcsel" id="pc5-tour" aria-labelledby="pc5-hcsel-h">
      <div className="container">
        <div className="pc5-hcsel__head">
          <span className="pc5-eb">
            <PC5_I n="pulse" s={14} /> Three panels · one country
          </span>
          <h2 id="pc5-hcsel-h" className="pc5-h2">
            Choose a healthcare panel in {entry.name}
          </h2>
          <p>Each segment has its own profile, chapter by chapter, and its own panel book to download at the bottom of the page.</p>
        </div>
        <svg className="pc5-hcsel__ecg" viewBox="0 0 1200 70" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 35h360l18-24 24 50 20-40 12 14h200l18-24 24 50 20-40 12 14h200l18-24 24 50 20-40 12 14h176" />
        </svg>
        <div className="pc5-hcsel__row" role="tablist" aria-label="Healthcare segments">
          {segs.map((s, i) => {
            const b = books[s.k];
            const on = i === seg;
            return (
              <button key={s.k} type="button" role="tab" aria-selected={on} className={"pc5-hcseg" + (on ? " is-on" : "") + (s.e ? "" : " is-none")} onClick={() => setSeg(i)}>
                <span className="pc5-hcseg__ic" aria-hidden="true">
                  <PC5_I n={s.ic} s={30} />
                </span>
                <span className="pc5-hcseg__t">
                  <b>{s.t}</b>
                  <small>{s.d}</small>
                </span>
                <span className="pc5-hcseg__n">
                  {s.e ? (
                    <>
                      <b>{pc5Num(s.e.panel)}</b>
                      <small>profiled {s.who} · {s.e.tables} tables</small>
                    </>
                  ) : (
                    <small>Not profiled in {entry.name} yet</small>
                  )}
                </span>
                <em className="pc5-hcseg__st">{s.e ? (b ? "Open" : b === false ? "Unavailable" : "Loading…") : "Feasibility on request"}</em>
              </button>
            );
          })}
        </div>
      </div>
    </K5_Sec>
  );
}

function PC5_HcVitals({ s, tables, groups }) {
  const reg = tables.find((x) => x.cat === "region");
  const gen = tables.find((x) => x.cat === "gender");
  const vit = [
    ["users", pc5Num(s.e.panel), "profiled " + s.who],
    ["layers", String(tables.length), "profile tables"],
    [s.ic, String(groups.length), groups.length === 1 ? "chapter" : "chapters"],
  ];
  if (reg) {
    const t = pc5Top(reg.rows);
    vit.push(["pin", pc5Pct(t[1]), "in " + t[0]]);
  } else if (gen) {
    const t = pc5Top(gen.rows);
    vit.push(["gender", pc5Pct(t[1]), t[0]]);
  }
  return (
    <div className="pc5-vit" aria-label={s.t + " at a glance"}>
      <div className="container pc5-vit__in">
        <div className="pc5-vit__mon" aria-hidden="true">
          <svg viewBox="0 0 300 60" preserveAspectRatio="none">
            <path d="M0 30h80l10-18 14 36 12-30 8 12h40l10-18 14 36 12-30 8 12h72" />
          </svg>
          <span className="pc5-vit__sweep" />
        </div>
        <ul>
          {vit.map(([ic, v, l]) => (
            <li key={l}>
              <PC5_I n={ic} s={18} />
              <b>{v}</b>
              <small>{l}</small>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function PC5_HcNone({ entry, s, segs, setSeg, onGet }) {
  const other = segs.filter((x) => x.e && x.k !== s.k);
  return (
    <K5_Sec className="pc5-ch pc5-ch--hc">
      <div className="container">
        <div className="pc5-soon">
          <div className="pc5-soon__art" aria-hidden="true">
            <span className="pc5-soon__pulse">
              <svg viewBox="0 0 200 60">
                <path d="M0 30h60l10-20 14 40 12-30 8 10h96" />
              </svg>
            </span>
            <PC5_I n={s.ic} s={54} />
          </div>
          <div>
            <h3>
              {s.t} in {entry.name}
            </h3>
            <p>
              We do not publish {s.t.toLowerCase()} figures for {entry.name} yet. Our team can still check feasibility for your study, usually within one working day. The {s.t.toLowerCase()} book for all
              countries covers:
            </p>
            <ul className="pc5-soon__list">
              {s.cover.map((c, i) => (
                <li key={c} style={{ "--i": i }}>
                  <PC5_I n="check" s={14} /> {c}
                </li>
              ))}
            </ul>
            <div className="pc5-hero__cta">
              <HmLink className="pc5-btn" to="/lets-talk?type=feasibility">
                Ask for feasibility <PC5_I n="arrow" s={16} />
              </HmLink>
              <button type="button" className="pc5-btn pc5-btn--line" onClick={() => onGet(s.k)}>
                <PC5_I n="down" s={16} /> {s.t} panel book (all countries)
              </button>
            </div>
            {other.length ? (
              <p className="pc5-soon__small">
                Available in {entry.name}:{" "}
                {other.map((x, i) => (
                  <ee.Fragment key={x.k}>
                    {i ? " · " : ""}
                    <button type="button" className="pc5-linkbtn" onClick={() => setSeg(segs.indexOf(x))}>
                      {x.t}
                    </button>
                  </ee.Fragment>
                ))}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </K5_Sec>
  );
}

/* download card */

function PC5_Near({ kind, entry, list, flags }) {
  const near = list.filter((c) => c.region === entry.region && c.slug !== entry.slug).slice(0, 12);
  if (!near.length) return null;
  return (
    <section className="pc5-near" aria-labelledby="pc5-near-h">
      <div className="container">
        <h2 id="pc5-near-h" className="pc5-h3">
          <PC5_I n="globe" s={18} /> More {entry.region} {PC5_KINDS[kind].t.toLowerCase()} books
        </h2>
        <ul className="pc5-near__row">
          {near.map((c) => (
            <li key={c.slug}>
              <HmLink to={pc5Path(kind, c.slug)} className="pc5-near__a" onClick={() => pb10Sound("pick")}>
                <PC5_Flag iso={c.iso} flags={flags} />
                <span>{c.name}</span>
              </HmLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* chapter nav */
function PC5_Nav({ items }) {
  const [cur, setCur] = ee.useState(items[0] && items[0][0]);
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setCur(e.target.id.replace("pc5-ch-", ""))),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    items.forEach(([k]) => {
      const el = document.getElementById("pc5-ch-" + k);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, [items.map((x) => x[0]).join()]);
  return (
    <nav className="pc5-nav" aria-label="Chapters">
      <div className="container">
        <ul>
          {items.map(([k, t, ic]) => (
            <li key={k}>
              <a href={"#pc5-ch-" + k} className={cur === k ? "is-on" : ""} onClick={(e) => (e.preventDefault(), pc5Scroll("pc5-ch-" + k))}>
                <PC5_I n={ic} s={15} /> {t}
              </a>
            </li>
          ))}
          <li>
            <a href="#pc5-get" className="pc5-nav__get" onClick={(e) => (e.preventDefault(), pc5Scroll("pc5-get"))}>
              <PC5_I n="down" s={15} /> Download
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────────────── */
/* update 11: /downloads/<sec>/region-<r> and /all-countries are region / entire panel pages (PanelBooks10.jsx) */
function PC5_Page() {
  const { section, country } = useParams();
  if (pb10ScopeOf(country)) return <PB10_Scope key={section + "/" + country} kind={pc5Sec2Kind(section)} slug={country} />;
  return <PC5_CountryPage key={section + "/" + country} />;
}
function PC5_CountryPage() {
  const { section, country } = useParams();
  const kind = pc5Sec2Kind(section);
  const K = PC5_KINDS[kind];
  const ix = dlxUseIndex();
  const flags = pc5UseFlags();
  const list = ix && !ix.failed ? ix[kind === "hc" ? "hcp" : kind] || [] : [];
  const entry0 = list.find((c) => c.slug === country);
  /* healthcare: one entry per segment; the hero shows the three panels together */
  const segs = PC5_HC_SEG.map((s) => ({ ...s, e: kind === "hc" && ix && !ix.failed ? (ix[s.k] || []).find((c) => c.slug === country) : null }));
  const entry = entry0 && kind === "hc" ? { ...entry0, panel: segs.reduce((a, s) => a + (s.e ? s.e.panel : 0), 0), segN: segs.filter((s) => s.e).length } : entry0;
  const { book, err } = pc5UseBook(kind, entry ? entry.slug : null);
  const [seg, setSeg0] = ee.useState(() => {
    const q = typeof location !== "undefined" ? new URLSearchParams(location.search).get("seg") || new URLSearchParams(location.hash.split("?")[1] || "").get("seg") : "";
    return Math.max(0, PC5_HC_SEG.findIndex((s) => s.k === q));
  });
  const [hcBooks, setHcBooks] = ee.useState({});
  ee.useEffect(() => {
    if (kind !== "hc" || !entry0) return undefined;
    let on = true;
    setHcBooks({});
    PC5_HC_SEG.forEach((s) => pc5HcBook(s.k, entry0.slug).then((b) => on && setHcBooks((o) => ({ ...o, [s.k]: b || false }))));
    return () => {
      on = false;
    };
  }, [kind, entry0 && entry0.slug]);
  const setSeg = (i) => {
    if (i !== seg) pb10Sound("seg");
    setSeg0(i);
    try {
      const u = new URL(location.href);
      u.searchParams.set("seg", PC5_HC_SEG[i].k);
      history.replaceState(history.state, "", u.pathname + u.search + u.hash);
    } catch (e) {}
  };
  const name = entry ? entry.name : String(country || "").replace(/-/g, " ");
  dmMeta(
    "/downloads/" + K.sec + "/" + (country || ""),
    `${name} ${K.t} | Panel Book | Frequent Research`,
    kind === "hc"
      ? `Healthcare panels in ${name}: ${entry ? pc5Num(entry.panel) + " profiled healthcare professionals, caregivers and patients" : "healthcare professionals, caregivers and patients"}, chapter by chapter as charts. Download each panel book PDF.`
      : `${name} ${K.t.toLowerCase()}: ${entry ? pc5Num(entry.panel) + " profiled " + K.who : "profiled panel members"}, with every profile table as charts. Download the ${name} panel book PDF.`
  );
  ee.useEffect(() => {
    window.scrollTo(0, 0);
  }, [country, section]);
  const hcS = segs[seg] || segs[0];
  const hcBook = kind === "hc" ? hcBooks[hcS.k] : null;
  const tables = ee.useMemo(() => (kind === "hc" ? (hcBook ? pc5Tables({ ...hcBook, kind: "hc" }) : []) : pc5Tables(book)), [book, hcBook, kind]);
  const hcGroups = ee.useMemo(() => pc5HcGroups(tables), [tables]);
  const meta = entry ? pc5Meta(entry.iso) : pc5Meta("");
  const pal = entry ? pc5Pal(entry.iso) : pc5Pal("");
  const style = {
    "--fa": pal.a,
    "--fb": pal.b,
    "--fc": pal.c,
    "--fa2": pc5Mix(pal.a, "#FFFFFF", 0.45),
    "--fb2": pc5Mix(pal.b, "#FFFFFF", 0.45),
    "--fc2": pc5Mix(pal.c, "#0B1437", 0.35),
    "--fa3": pc5Mix(pal.a, "#0B1437", 0.45),
    "--fb3": pc5Mix(pal.b, "#0B1437", 0.45),
    "--fdeep": pal.deep,
    "--fta": pal.ta,
    "--ftb": pal.tb,
    "--fia": pal.ia,
    "--fib": pal.ib,
  };
  const cur = meta.cur ? (/[^\x20-\x7E]/.test(meta.cur[1]) || meta.cur[1].length <= 3 ? meta.cur[1] : meta.cur[0]) : "";
  /* update 8: every download button scrolls to the form at the bottom of the page */
  const get = () => pc5Scroll("pc5-get");
  if (ix && !ix.failed && !entry)
    return (
      <div className="pc5 pc5--none">
        <div className="container">
          <HeroH1 className="pc5-h2">We could not find that country</HeroH1>
          <p>
            <HmLink to={"/downloads/" + K.sec}>See every {K.t.toLowerCase()} book</HmLink>
          </p>
        </div>
      </div>
    );
  if (!entry)
    return (
      <div className="pc5 pc5--load" aria-busy="true">
        <div className="container">
          <p>{ix && ix.failed ? "The panel list could not be loaded. Please refresh the page." : "Loading the panel…"}</p>
        </div>
      </div>
    );
  const chapters = kind === "b2c" ? PC5_CH.map((c) => [c, tables.filter((x) => (PC5_CAT[x.cat] || PC5_CAT.other).ch === c[0])]).filter((x) => x[1].length) : [];
  const navItems =
    kind === "b2b"
      ? [["biz", "Company profile", "factory"], ["sec", "Sectors", "layers"]]
      : kind === "b2c"
      ? chapters.map(([c]) => [c[0], c[1], c[2]])
      : hcGroups.map((g) => ["hc" + g.gi, g.t.replace(/ (profile|distribution)$/i, ""), pc5HcIc(g.t)]);
  const hb = kind === "hc" ? hcBooks[hcS.k] : null;
  const spec =
    kind === "hc"
      ? hcS.e && hb === undefined
        ? null
        : {
            kind: "Healthcare panel book",
            title: hb ? `${entry.name} ${hcS.t.toLowerCase()} panel book` : `${hcS.t} panel book`,
            key: "healthcare-" + hcS.k + (hb ? "/" + entry.slug : ""),
            run: (lead) => (hb ? pp5PanelBook({ ...hb, kind: "hc", seg: hcS.k, segT: hcS.t, name: entry.name, iso: entry.iso, region: entry.region }, lead) : fp5Health(hcS.k, lead)),
          }
      : {
          kind: kind === "b2b" ? "B2B panel book" : "Consumer panel book",
          title: `${entry.name} ${K.book}`,
          key: kind + "/" + entry.slug,
          run: (lead) => dlxBook(kind, entry.slug).then((b) => pp5PanelBook(b, lead)),
        };
  return (
    <div className={"pc5 pc8-page pc5--" + kind} style={kind === "hc" ? { ...style, "--sg1": PB10_SEGC[hcS.k].c1, "--sg2": PB10_SEGC[hcS.k].c2 } : style} data-seg={kind === "hc" ? hcS.k : undefined} key={kind + "/" + entry.slug}>
      {kind === "hc" ? <span className="pb10-wash" key={"w" + hcS.k} aria-hidden="true" /> : null}
      <PC8_Hero kind={kind} entry={entry} meta={meta} flags={flags} tables={tables} onGet={get} />
      {kind === "hc" ? <PC5_HcSel entry={entry} segs={segs} seg={seg} setSeg={setSeg} books={hcBooks} /> : null}
      {navItems.length ? <PC5_Nav key={kind === "hc" ? hcS.k : kind} items={navItems} /> : null}
      {kind === "hc" ? (
        !hcS.e || hcBook === false ? (
          <PC5_HcNone entry={entry} s={hcS} segs={segs} setSeg={setSeg} onGet={get} />
        ) : !hcBook ? (
          <div className="container pc5-loadbox" aria-busy="true">
            <i />
            <i />
            <i />
          </div>
        ) : (
          <div className="pc5-hcbody" key={hcS.k}>
            <PC5_HcVitals s={hcS} tables={tables} groups={hcGroups} />
            {hcGroups.map((g, i) => (
              <PC5_HcPart key={g.gi} g={g} n={i + 1} cur={cur} />
            ))}
          </div>
        )
      ) : err ? (
        <div className="container pc5-err">
          <p>{err}</p>
        </div>
      ) : !book ? (
        <div className="container pc5-loadbox" aria-busy="true">
          <i />
          <i />
          <i />
        </div>
      ) : (
        <div id="pc5-tour">
          <PC5_Glance kind={kind} entry={entry} tables={tables} meta={meta} />
          {kind === "b2b" ? (
            <>
              <PC5_Biz tables={tables} cur={cur} />
              <PC5_Sectors tables={tables} cur={cur} />
            </>
          ) : (
            chapters.map(([c, l], i) => <PC5_Chapter key={c[0]} ch={c} n={i + 1} list={l} cur={cur} />)
          )}
        </div>
      )}
      <div className="container">
        <p className="pc5-note pc5-note--model">
          <PC5_I n="spark" s={14} /> {PC5_MODEL_NOTE}
        </p>
      </div>
      <PC8_Get kind={kind} entry={entry} flags={flags} meta={meta} label={kind === "hc" ? hcS.t.toLowerCase() + " panel book" : K.book} seg={kind === "hc" ? hcS : null} segs={segs} setSeg={setSeg} spec={spec} world={kind === "b2b" ? "it-development" : "market-research"} />
      <PC5_Near kind={kind} entry={entry} list={list} flags={flags} />
    </div>
  );
}

/* ── country picker for the section pages ──────────────────────────────────────────── */

/* healthcare section: the three segments, each with its all-country book; the country picker follows */

export { PC5_CH, PC5_Card, PC5_Motto, PC5_Page, pc5HcGroups, pc5HcIc, pc5Path, pc5Scroll, pc5Sec2Kind, pc5Tables, pc5Top };
