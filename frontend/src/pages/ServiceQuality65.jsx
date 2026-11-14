/*
 * Quality process pages for Digital Marketing, IT & Development and Accounts & Finance (build 65, update 7). Prefix SQ7_.
 *   /downloads/quality-process/digital-marketing · /it-development · /accounts-finance
 * Same family as the market research quality page (Quality65.jsx): dark hero, sticky chapter nav, one designed block per
 * chapter, the PDF at the bottom behind the download form (Gate.jsx). Content: src/data/ServiceQuality65.jsx, generated
 * from the quality-process brief, so the page and the PDF (ServiceQualityPdf65.jsx) say the same thing.
 * Each chapter's layout is chosen from its content: stages with quality gates -> stepper, A–S service standards ->
 * searchable tiles, "Label: text" pairs -> principle cards (chapter 1) or a review ladder, numbered steps -> a cycle,
 * grouped lists -> measure columns, the last chapter -> the commitment band, any other list -> a check grid.
 * Styles: src/styles/servicequality65.css (sq7-), own light and dark tokens (darkcss skips sq7).
 */
import * as ee from 'react';
import { VERTICALS } from '../app/data/site.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { FRK_EMBLEM_SM, FRK_V } from '../components/site/FrKit.jsx';
import { K5_Count, K5_Rv, K5_Sec, K5_Words, k5Reduce, k5Tilt } from '../components/site/Kit65.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { QP5_I } from './Quality65.jsx';
import { SQ7_DOCS } from '../data/ServiceQuality65.jsx';
import { sq7Book } from '../components/site/ServiceQualityPdf65.jsx';

const SQ7_KEYS = ["digital-marketing", "it-development", "accounts-finance"];
const SQ7_META = {
  "digital-marketing": { ic: "funnel", sic: ["target", "search", "chart", "users", "spark", "eye", "funnel"], kick: "Digital marketing", h: "Every campaign, *checked at every stage.*", tools: ["SEO", "PPC", "Social", "Content", "Email", "CRO", "Analytics"] },
  "it-development": { ic: "cpu", sic: ["doc", "layers", "eye", "cpu", "check", "rocket", "chart", "shield"], kick: "IT & development", h: "Engineering quality, *built in from line one.*", tools: ["Web", "Apps", "SaaS", "APIs", "Cloud", "QA", "Security"] },
  "accounts-finance": { ic: "receipt", sic: ["doc", "search", "receipt", "check", "lock", "book", "eye", "shield"], kick: "Accounts & finance", h: "Every figure, *verified before it counts.*", tools: ["Books", "GST", "TDS", "Payroll", "MIS", "Audit", "CFO"] },
};
const SQ7_PATH = (k) => "/downloads/quality-process/" + k;
const sq7Slug = (t) =>
  String(t || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
/* short nav label for a chapter title */
const sq7Short = (t) => {
  const s = String(t);
  const R = [
    [/philosophy/i, "Philosophy"],
    [/framework/i, "Framework"],
    [/service-specific/i, "Services"],
    [/review|approval/i, "Review"],
    [/documentation|records/i, "Records"],
    [/security|privacy|confidential/i, "Security"],
    [/performance|measurement/i, "Measures"],
    [/corrective|defect|discrepanc/i, "Corrective action"],
    [/change management/i, "Change control"],
    [/regulatory/i, "Regulatory"],
    [/improvement/i, "Improvement"],
    [/commitment/i, "Commitment"],
  ];
  const m = R.find((r) => r[0].test(s));
  return m ? m[1] : s.split(" ").slice(0, 2).join(" ");
};
const sq7SecIc = (t) =>
  /philosophy/i.test(t) ? "star" : /framework/i.test(t) ? "layers" : /service-specific/i.test(t) ? "kanban" : /review|approval/i.test(t) ? "eye" : /documentation|records/i.test(t) ? "doc" : /security|privacy|confidential/i.test(t) ? "lock" : /performance|measurement/i.test(t) ? "chart" : /corrective|defect|discrepanc/i.test(t) ? "target" : /change/i.test(t) ? "rocket" : /regulatory/i.test(t) ? "book" : /improvement/i.test(t) ? "spark" : /commitment/i.test(t) ? "handshake" : "check";
/* what a chapter is made of */
const sq7Kind = (s, last) => {
  const b = s.blocks.map((x) => x.type);
  if (s.items.length && s.items.some((i) => i.qc)) return "stages";
  if (s.items.length) return "standards";
  if (b.includes("kv")) return s.n === 1 ? "principles" : "ladder";
  if (b.includes("ol")) return "cycle";
  if (b.includes("h")) return "groups";
  if (last) return "commit";
  return "checks";
};
const sq7Count = (d) => {
  const stages = (d.secs.find((s) => s.items.some((i) => i.qc)) || { items: [] }).items.length;
  const std = (d.secs.find((s) => s.items.length && !s.items.some((i) => i.qc)) || { items: [] }).items.length;
  const pr = ((d.secs[0] || { blocks: [] }).blocks.find((b) => b.type === "kv") || { items: [] }).items.length;
  let checks = 0;
  d.secs.forEach((s) => {
    s.blocks.forEach((b) => b.type === "ul" && (checks += b.items.length));
    s.items.forEach((i) => i.blocks.forEach((b) => b.type === "ul" && (checks += b.items.length)));
  });
  return { stages, std, pr, checks };
};
/* text before the first list / pair block, and after the last one */
const sq7Lead = (blocks) => {
  const i = blocks.findIndex((b) => b.type !== "p");
  return (i < 0 ? blocks : blocks.slice(0, i)).filter((b) => b.type === "p").map((b) => b.t);
};
const sq7Tail = (blocks) => {
  let j = blocks.length;
  while (j > 0 && blocks[j - 1].type === "p") j--;
  return j === 0 ? [] : blocks.slice(j).map((b) => b.t);
};
const sq7Go = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: k5Reduce() ? "auto" : "smooth", block: "start" });
};

function SQ7_Head({ s, id, n }) {
  const lead = sq7Lead(s.blocks);
  return (
    <div className="sq7-head">
      <span className="sq7-head__n" aria-hidden="true">
        {String(n).padStart(2, "0")}
      </span>
      <div>
        <span className="sq7-kick">
          <QP5_I n={sq7SecIc(s.t)} s={14} /> {sq7Short(s.t)}
        </span>
        <h2 id={id}>{s.t}</h2>
        {lead.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </div>
  );
}
const SQ7_Tail = ({ s }) => {
  const t = sq7Tail(s.blocks);
  if (!t.length || sq7Lead(s.blocks).length === s.blocks.length) return null;
  return (
    <p className="sq7-tail">
      <QP5_I n="spark" s={15} /> {t.join(" ")}
    </p>
  );
};

/* ── hero ─────────────────────────────────────────────────────────────────────────── */
function SQ7_Hero({ k, d, onGet }) {
  const M = SQ7_META[k];
  const V = FRK_V[k];
  const c = sq7Count(d);
  const stg = (d.secs.find((s) => s.items.some((i) => i.qc)) || { items: [] }).items;
  return (
    <header className="sq7-hero">
      <div className="sq7-hero__sky" aria-hidden="true">
        <i />
        <i />
      </div>
      <div className="container sq7-hero__in">
        <div className="sq7-hero__txt">
          <nav className="sq7-crumbs" aria-label="Breadcrumb">
            <HmLink to="/downloads">Downloads</HmLink> <span aria-hidden="true">/</span> <HmLink to="/downloads/quality-process">Quality process</HmLink> <span aria-hidden="true">/</span> <span aria-current="page">{V.name === "Finance & Accounts" ? "Accounts & Finance" : V.name}</span>
          </nav>
          <span className="sq7-kick sq7-kick--hero">
            <QP5_I n="shield" s={15} /> {M.kick} · quality process
          </span>
          <K5_Words as="h1" className="sq7-hero__h" text={M.h} />
          <p className="sq7-hero__sub">{d.sub}</p>
          <p className="sq7-hero__d">{d.intro[0]}</p>
          <div className="sq7-hero__cta">
            <button type="button" className="sq7-btn sq7-btn--glow" onClick={() => sq7Go("sq7-s2")}>
              See the framework <QP5_I n="arrow" s={16} />
            </button>
            <button type="button" className="sq7-btn sq7-btn--line" onClick={onGet}>
              <QP5_I n="down" s={16} /> Download the PDF
            </button>
          </div>
          <ul className="sq7-hero__stats" aria-label="At a glance">
            {[
              [c.pr, "quality principles"],
              [c.stages, "framework stages"],
              [c.std, "service standards"],
              [c.checks, "documented checks"],
            ].map(([v, l]) => (
              <li key={l}>
                <b>
                  <K5_Count to={v} />
                </b>
                <span>{l}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="sq7-orbit" aria-hidden="true">
          <span className="sq7-orbit__ring sq7-orbit__ring--a">
            {stg.map((s, i) => (
              <i key={s.k} style={{ "--a": (360 / stg.length) * i + "deg" }}>
                <b>{s.k}</b>
              </i>
            ))}
          </span>
          <span className="sq7-orbit__ring sq7-orbit__ring--b">
            {M.tools.map((t, i) => (
              <i key={t} style={{ "--a": (360 / M.tools.length) * i + "deg" }}>
                <b>{t}</b>
              </i>
            ))}
          </span>
          <span className="sq7-orbit__core">
            <img src={FRK_EMBLEM_SM} alt="" width="54" height="53" />
            <QP5_I n={M.ic} s={40} />
            <small>Quality gate</small>
          </span>
          <span className="sq7-orbit__card">
            {stg.slice(0, 4).map((s, i) => (
              <span key={s.k} style={{ "--i": i }}>
                <QP5_I n="check" s={13} /> {s.t.split(" and ")[0]}
              </span>
            ))}
          </span>
        </div>
      </div>
      <svg className="sq7-hero__wave" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 40C240 80 480 0 720 30s480 50 720 10v40H0z" />
      </svg>
    </header>
  );
}

function SQ7_Nav({ secs }) {
  const [on, setOn] = ee.useState("");
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined;
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setOn(e.target.id)), { rootMargin: "-45% 0px -50% 0px" });
    secs.forEach((s) => {
      const el = document.getElementById("sq7-s" + s.n);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [secs]);
  return (
    <nav className="sq7-nav" aria-label="On this page">
      <div className="container sq7-nav__in">
        {secs.map((s) => (
          <a key={s.n} href={"#sq7-s" + s.n} className={on === "sq7-s" + s.n ? "is-on" : ""} onClick={(e) => (e.preventDefault(), sq7Go("sq7-s" + s.n))}>
            {sq7Short(s.t)}
          </a>
        ))}
        <a href="#sq7-get" className="sq7-nav__get" onClick={(e) => (e.preventDefault(), sq7Go("sq7-get"))}>
          <QP5_I n="down" s={14} /> PDF
        </a>
      </div>
    </nav>
  );
}

/* ── chapter layouts ───────────────────────────────────────────────────────────────── */
const SQ7_PIC = ["target", "layers", "check", "eye", "spark", "shield", "chart"];
function SQ7_Principles({ s }) {
  const kv = s.blocks.find((b) => b.type === "kv").items;
  return (
    <div className="sq7-pr">
      {kv.map(([k, v], i) => (
        <K5_Rv as="article" key={k} a="up" d={i} className="sq7-pr__card">
          <span className="sq7-pr__ic">
            <QP5_I n={SQ7_PIC[i % SQ7_PIC.length]} s={24} />
          </span>
          <small>Principle {String(i + 1).padStart(2, "0")}</small>
          <h3>{k}</h3>
          <p>{v}</p>
        </K5_Rv>
      ))}
    </div>
  );
}

function SQ7_Stages({ s, k }) {
  const [on, setOn] = ee.useState(0);
  const it = s.items[on];
  const ic = SQ7_META[k].sic;
  const lead = it.blocks.filter((b) => b.type === "p");
  const ul = it.blocks.find((b) => b.type === "ul");
  const firstUl = it.blocks.findIndex((b) => b.type === "ul");
  return (
    <div className="sq7-stg">
      <ol className="sq7-stg__rail" role="tablist" aria-label="Framework stages" style={{ "--p": ((on + 1) / s.items.length) * 100 + "%" }}>
        {s.items.map((x, i) => (
          <li key={x.k} role="presentation">
            <button type="button" role="tab" id={"sq7-stg-" + i} aria-selected={i === on} aria-controls="sq7-stg-panel" className={i === on ? "is-on" : i < on ? "is-done" : ""} onClick={() => setOn(i)}>
              <span className="sq7-stg__n">{x.k}</span>
              <span className="sq7-stg__t">{x.t}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="sq7-stg__panel" id="sq7-stg-panel" role="tabpanel" aria-labelledby={"sq7-stg-" + on} key={on}>
        <div className="sq7-stg__top">
          <span className="sq7-stg__big">
            <QP5_I n={ic[on % ic.length]} s={30} />
          </span>
          <div>
            <small>
              Stage {it.k} of {s.items.length}
            </small>
            <h3>{it.t}</h3>
          </div>
        </div>
        {it.blocks.slice(0, firstUl < 0 ? it.blocks.length : firstUl).map((b) => (b.type === "p" ? <p key={b.t}>{b.t}</p> : null))}
        {ul ? (
          <ul className="sq7-ticks">
            {ul.items.map((t, i) => (
              <li key={t} style={{ "--i": i }}>
                <QP5_I n="check" s={14} /> {t}
              </li>
            ))}
          </ul>
        ) : null}
        {firstUl >= 0
          ? it.blocks.slice(firstUl + 1).map((b) =>
              b.type === "p" ? (
                <p key={b.t} className="sq7-stg__after">
                  {b.t}
                </p>
              ) : null
            )
          : null}
        {it.qc ? (
          <div className="sq7-gate">
            <span className="sq7-gate__ic">
              <QP5_I n="shield" s={20} />
            </span>
            <div>
              <b>Quality gate</b>
              <p>{it.qc}</p>
            </div>
          </div>
        ) : null}
        <div className="sq7-stg__nav">
          <button type="button" className="sq7-chip" disabled={on === 0} onClick={() => setOn(on - 1)}>
            <QP5_I n="arrow" s={14} className="qp5-flip" /> Previous
          </button>
          <span className="sq7-stg__pg">{on + 1} / {s.items.length}</span>
          <button type="button" className="sq7-chip sq7-chip--on" disabled={on === s.items.length - 1} onClick={() => setOn(on + 1)}>
            Next stage <QP5_I n="arrow" s={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function SQ7_Standards({ s, k }) {
  const [q, setQ] = ee.useState("");
  const [open, setOpen] = ee.useState(null);
  const v = VERTICALS.find((x) => x.slug === k) || { services: [] };
  const qq = q.trim().toLowerCase();
  const list = s.items.filter((x) => !qq || x.t.toLowerCase().includes(qq) || x.blocks.some((b) => b.type === "ul" && b.items.some((t) => t.toLowerCase().includes(qq))));
  const cur = s.items.find((x) => x.k === open);
  return (
    <div className="sq7-std">
      <label className="sq7-std__q">
        <QP5_I n="search" s={16} />
        <span className="frk-sr">Search service standards</span>
        <input type="search" value={q} placeholder={`Search ${s.items.length} services or a check`} onChange={(e) => setQ(e.target.value)} />
      </label>
      <div className="sq7-std__grid">
        {list.map((x, i) => {
          const ul = x.blocks.find((b) => b.type === "ul");
          const on = open === x.k;
          return (
            <button key={x.k} type="button" className={"sq7-std__tile" + (on ? " is-on" : "")} aria-expanded={on} aria-controls="sq7-std-detail" style={{ "--i": Math.min(i, 12) }} onClick={() => setOpen(on ? null : x.k)}>
              <span className="sq7-std__l">{x.k}</span>
              <b>{x.t}</b>
              <small>{ul ? ul.items.length + " quality controls" : "Quality controls"}</small>
            </button>
          );
        })}
      </div>
      {!list.length ? <p className="sq7-tail">No service matches “{q}”.</p> : null}
      {cur ? (
        <div className="sq7-std__detail" id="sq7-std-detail" key={cur.k}>
          <div className="sq7-std__dh">
            <span className="sq7-std__l sq7-std__l--big">{cur.k}</span>
            <div>
              <h3>{cur.t}</h3>
              {cur.blocks
                .filter((b) => b.type === "p" && !/^quality controls include:?$/i.test(b.t))
                .slice(0, 1)
                .map((b) => (
                  <p key={b.t}>{b.t}</p>
                ))}
            </div>
            <button type="button" className="sq7-x" aria-label="Close" onClick={() => setOpen(null)}>
              <QP5_I n="x" s={18} />
            </button>
          </div>
          {(cur.blocks.find((b) => b.type === "ul") || { items: [] }).items.length ? (
            <ul className="sq7-ticks sq7-ticks--2">
              {cur.blocks
                .find((b) => b.type === "ul")
                .items.map((t, i) => (
                  <li key={t} style={{ "--i": i }}>
                    <QP5_I n="check" s={14} /> {t}
                  </li>
                ))}
            </ul>
          ) : null}
          {cur.blocks
            .filter((b, i, a) => b.type === "p" && i > a.findIndex((y) => y.type === "ul") && a.findIndex((y) => y.type === "ul") >= 0)
            .map((b) => (
              <p key={b.t} className="sq7-tail">
                <QP5_I n="spark" s={15} /> {b.t}
              </p>
            ))}
          {v.services.some((y) => y.slug === sq7Slug(cur.t)) ? (
            <HmLink className="sq7-btn sq7-btn--soft" to={"/services/" + k + "/" + sq7Slug(cur.t)}>
              See the {cur.t} service <QP5_I n="arrow" s={15} />
            </HmLink>
          ) : null}
        </div>
      ) : (
        <p className="sq7-std__hint">
          <QP5_I n="eye" s={15} /> Pick a service to see its quality controls.
        </p>
      )}
    </div>
  );
}

function SQ7_Ladder({ s }) {
  const kv = s.blocks.find((b) => b.type === "kv").items;
  return (
    <ol className="sq7-lad">
      {kv.map(([k, v], i) => (
        <K5_Rv as="li" key={k} a="up" d={i} style={{ "--w": 100 - (kv.length - 1 - i) * 8 + "%", "--i": i }}>
          <span className="sq7-lad__n">{i + 1}</span>
          <div>
            <b>{k}</b>
            <p>{v}</p>
          </div>
        </K5_Rv>
      ))}
    </ol>
  );
}

function SQ7_Cycle({ s }) {
  const ol = s.blocks.find((b) => b.type === "ol").items;
  const [on, setOn] = ee.useState(0);
  const cur = ol[on];
  const N = ol.length;
  return (
    <div className="sq7-cyc">
      <div className="sq7-cyc__wheel" style={{ "--n": N }}>
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="78" />
          <circle cx="100" cy="100" r="78" className="sq7-cyc__arc" style={{ strokeDashoffset: 490 - (490 * (on + 1)) / N }} />
        </svg>
        {ol.map(([k], i) => (
          <button key={k} type="button" aria-pressed={i === on} className={"sq7-cyc__dot" + (i === on ? " is-on" : "")} style={{ "--a": (360 / N) * i - 90 + "deg" }} onClick={() => setOn(i)}>
            <span>{i + 1}</span>
            <span className="frk-sr">{k}</span>
          </button>
        ))}
        <div className="sq7-cyc__core" aria-live="polite">
          <small>
            Step {on + 1} of {N}
          </small>
          <b>{cur[0]}</b>
        </div>
      </div>
      <ol className="sq7-cyc__list">
        {ol.map(([k, v], i) => (
          <li key={k} className={i === on ? "is-on" : ""}>
            <button type="button" onClick={() => setOn(i)}>
              <span className="sq7-cyc__n">{i + 1}</span>
              <span>
                <b>{k}</b>
                <small>{v}</small>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}

function SQ7_Groups({ s }) {
  const groups = [];
  s.blocks.forEach((b) => {
    if (b.type === "h") groups.push({ t: b.t, items: [] });
    else if (b.type === "ul" && groups.length) groups[groups.length - 1].items.push(...b.items);
  });
  const ics = ["check", "chart", "clock", "shield", "eye", "coin"];
  return (
    <div className={"sq7-grp sq7-grp--" + Math.min(groups.length, 3)}>
      {groups.map((g, i) => (
        <K5_Rv as="article" key={g.t} a="up" d={i} className="sq7-grp__col">
          <header>
            <span className="sq7-grp__ic">
              <QP5_I n={ics[i % ics.length]} s={20} />
            </span>
            <h3>{g.t}</h3>
            <small>{g.items.length} measures</small>
          </header>
          <ul>
            {g.items.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </K5_Rv>
      ))}
    </div>
  );
}

function SQ7_Checks({ s }) {
  const ul = s.blocks.filter((b) => b.type === "ul").flatMap((b) => b.items);
  const ic = sq7SecIc(s.t);
  return (
    <ul className={"sq7-chk" + (/records|documentation/i.test(s.t) ? " sq7-chk--files" : "")}>
      {ul.map((t, i) => (
        <K5_Rv as="li" key={t} a="up" d={i % 6}>
          <span className="sq7-chk__ic">
            <QP5_I n={ic} s={16} />
          </span>
          {t}
        </K5_Rv>
      ))}
    </ul>
  );
}

function SQ7_Commit({ s, d }) {
  const ul = s.blocks.filter((b) => b.type === "ul").flatMap((b) => b.items);
  return (
    <div className="sq7-com">
      <ul className="sq7-ticks sq7-ticks--2">
        {ul.map((t, i) => (
          <li key={t} style={{ "--i": i }}>
            <QP5_I n="check" s={14} /> {t}
          </li>
        ))}
      </ul>
      {d.tag ? (
        <blockquote className="sq7-com__tag">
          <QP5_I n="shield" s={22} />
          <p>{d.tag.replace(/^Frequent Research\s*[–-]\s*/, "")}</p>
          <cite>Frequent Research</cite>
        </blockquote>
      ) : null}
    </div>
  );
}

function SQ7_Sec({ s, k, d, last }) {
  const kind = sq7Kind(s, last);
  const id = "sq7-s" + s.n;
  return (
    <K5_Sec className={"sq7-sec sq7-sec--" + kind + (s.n % 2 ? "" : " sq7-sec--alt")} id={id} aria-labelledby={id + "-h"}>
      <div className="container">
        <SQ7_Head s={s} id={id + "-h"} n={s.n} />
        {kind === "principles" ? <SQ7_Principles s={s} /> : kind === "stages" ? <SQ7_Stages s={s} k={k} /> : kind === "standards" ? <SQ7_Standards s={s} k={k} /> : kind === "ladder" ? <SQ7_Ladder s={s} /> : kind === "cycle" ? <SQ7_Cycle s={s} /> : kind === "groups" ? <SQ7_Groups s={s} /> : kind === "commit" ? <SQ7_Commit s={s} d={d} /> : <SQ7_Checks s={s} />}
        {kind !== "commit" ? <SQ7_Tail s={s} /> : null}
      </div>
    </K5_Sec>
  );
}

function SQ7_Get({ k, onGet }) {
  const V = FRK_V[k];
  const nm = k === "accounts-finance" ? "Accounts & Finance" : V.name;
  const d = SQ7_DOCS[k];
  return (
    <section className="sq7-get" id="sq7-get" aria-labelledby="sq7-get-h">
      <div className="container sq7-get__in">
        <div className="sq7-get__book" aria-hidden="true" {...k5Tilt(10)}>
          <span className="sq7-get__spine" />
          <span className="sq7-get__front">
            <img src={FRK_EMBLEM_SM} alt="" className="sq7-get__wm" />
            <QP5_I n={SQ7_META[k].ic} s={44} />
            <b>Quality process</b>
            <small>{nm}</small>
            <em>
              <i />
              <i />
              <i />
            </em>
          </span>
        </div>
        <div>
          <span className="sq7-kick">Take it with you</span>
          <h2 id="sq7-get-h">The {nm} quality process, as a branded PDF.</h2>
          <p>Every chapter on this page in one document: {d.secs.map((s) => sq7Short(s.t).toLowerCase()).join(", ")}. Fill in a few details and it opens in your browser in seconds.</p>
          <div className="sq7-hero__cta">
            <button type="button" className="sq7-btn sq7-btn--glow" onClick={onGet}>
              <QP5_I n="down" s={16} /> Download the quality process PDF
            </button>
            <HmLink to={"/services/" + k} className="sq7-btn sq7-btn--ghost">
              Explore {nm} services
            </HmLink>
          </div>
          <small className="sq7-get__note">You'll be asked for your details for each download.</small>
          <div className="sq7-get__more">
            <span>Other quality processes:</span>
            <HmLink to="/downloads/quality-process/market-research">Market research</HmLink>
            {SQ7_KEYS.filter((x) => x !== k).map((x) => (
              <HmLink key={x} to={SQ7_PATH(x)}>
                {x === "accounts-finance" ? "Accounts & finance" : FRK_V[x].name}
              </HmLink>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SQ7_Page({ k }) {
  const d = SQ7_DOCS[k];
  const V = FRK_V[k];
  const nm = k === "accounts-finance" ? "Accounts & Finance" : V.name;
  const [gate, setGate] = ee.useState(false);
  dmMeta(SQ7_PATH(k), `${nm} Quality Process | ${d.sub} | Frequent Research`, `${d.intro[0].slice(0, 150)}`);
  ee.useEffect(() => window.scrollTo(0, 0), [k]);
  const style = { "--s1": V.c1, "--s2": V.c2, "--sdeep": V.deep, "--ssoft": V.soft, "--sink": V.ink };
  return (
    <div className={"sq7 sq7--" + V.k} style={style}>
      <SQ7_Hero k={k} d={d} onGet={() => setGate(true)} />
      <SQ7_Nav secs={d.secs} />
      {d.intro.length > 1 ? (
        <div className="container sq7-intro">
          {d.intro.slice(1).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      ) : null}
      {d.secs.map((s, i) => (
        <SQ7_Sec key={s.n} s={s} k={k} d={d} last={i === d.secs.length - 1} />
      ))}
      <SQ7_Get k={k} onGet={() => setGate(true)} />
      {gate && (
        <FRG_Gate
          world={k}
          kind="Quality process"
          title={nm + " quality process"}
          sub={d.sub}
          icon="shield"
          resource={{ type: "quality-process", key: "quality-" + k, title: nm + " quality process" }}
          extra={{ doc: "quality-" + k }}
          onUnlock={(lead) => sq7Book(k, lead)}
          onClose={() => setGate(false)}
        />
      )}
    </div>
  );
}
const SQ7_DM = () => <SQ7_Page k="digital-marketing" />;
const SQ7_IT = () => <SQ7_Page k="it-development" />;
const SQ7_AF = () => <SQ7_Page k="accounts-finance" />;

export { SQ7_AF, SQ7_DM, SQ7_IT, SQ7_META, SQ7_PIC, sq7Count, sq7Kind, sq7Lead, sq7SecIc, sq7Slug, sq7Tail };
