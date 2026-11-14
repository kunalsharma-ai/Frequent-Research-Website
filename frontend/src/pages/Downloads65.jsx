/* ===== Downloads (build 65, dl5-) =====
   /downloads            hub: six separate shelves
   /downloads/:section   one shelf per page, nothing merged, nothing repeated
     consumer-panel-books · business-panel-books · healthcare-panel-books · quality-process
     service-brochures (All services brochures) · industries-case-studies
   Reuses DLX_Panels / DLX_Preview / dlxUseIndex / dlxBook (Downloads.jsx), FRG_Gate (Gate.jsx) and the PDF builders
   in Pdfs.jsx and Pdfs65.jsx. Old links (?file=, ?panel=, ?country=, ?book=) are forwarded to the right shelf. */
import * as ee from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { navGo } from '../app/nav.jsx';
import { VERTICALS } from '../app/data/site.jsx';
import { INDUSTRIES } from '../app/data/industries.jsx';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { dmMeta } from '../components/dm/shared.jsx';
import { FRK_EMBLEM_SM, FRK_V, FRK_VKEYS } from '../components/site/FrKit.jsx';
import { K5_Count, K5_I, K5_Rv, K5_Words, k5Reduce } from '../components/site/Kit65.jsx';
import { FRG_Gate } from '../components/site/Gate.jsx';
import { frpBrochure, frpCompany, frpPanelBook } from '../components/site/Pdfs.jsx';
import { fp5Quality } from '../components/site/Pdfs65.jsx';
import { cx5SectorPack } from '../components/site/CasePdf65.jsx';
import { DLX_Preview, dlxBook, dlxUseIndex } from './Downloads.jsx';
import { DL8_Shelves } from './Downloads8.jsx';
import { pc5Path, pc5Sec2Kind } from './PanelCountry65.jsx';
import { PB10_Section } from './PanelBooks10.jsx';
import { sv7Brochure } from '../components/site/ServicePdf65.jsx';
import { DL19_Hero, DL19_Library } from './Downloads19.jsx';

import { DL5_SECS } from '../data/dl5Secs.jsx';
const dl5Sec = (k) => DL5_SECS.find((s) => s.k === k);

const DL5_HC = [
  { k: "hcp", t: "Healthcare professionals", ic: "id", c: "#0E9C88", c2: "#9FE7DC", d: "Verified physicians, specialists, nurses, pharmacists and allied HCPs.", pts: ["Specialty & practice-setting targeting", "HCP verification", "Surveys, IDIs and expert sessions"] },
  { k: "caregivers", t: "Caregivers", ic: "heart", c: "#C8577E", c2: "#FFC27A", d: "Family and home caregivers sharing the day-to-day reality of care.", pts: ["Care areas from elderly care to special needs", "Caregiver journey research", "Short studies that respect their time"] },
  { k: "patients", t: "Patients", ic: "leaf", c: "#6D4AFF", c2: "#A9BDFF", d: "People living with health conditions, profiled with consent.", pts: ["Condition and treatment-stage targeting", "Patient journey and unmet needs", "Consent-first privacy"] },
];
const DL5_Q = [
  { k: "market-research", t: "Market Research", ic: "search", c: "#2F6BFF", c2: "#7FA4FF", d: "Sample sources, respondent verification and data validation, from our ESOMAR 37 answers.", pts: ["Recruitment & verification", "Fraud and duplicate checks", "ISO 20252:2019"] },
  { k: "digital-marketing", t: "Digital Marketing", ic: "funnel", c: "#C8577E", c2: "#FFC27A", d: "Tracking, brand-safety and reporting checks on every campaign.", pts: ["Measure before spend", "Two-person launch check", "Reconciled reporting"] },
  { k: "it-development", t: "IT & Development", ic: "cpu", c: "#6D4AFF", c2: "#A9BDFF", d: "Reviewed code, layered testing and safe releases.", pts: ["Signed-off requirements", "Peer review & automated tests", "UAT and rollback plan"] },
  { k: "accounts-finance", t: "Accounts & Finance", ic: "receipt", c: "#0E9C88", c2: "#FFC27A", d: "Maker-checker reviews, reconciliations and a compliance calendar.", pts: ["Maker and checker", "Deadline calendar", "Client approval before filing"] },
];

function DL5_Cover({ c, c2, ic, kind, title, small }) {
  return (
    <div className={"dl5-cover" + (small ? " dl5-cover--sm" : "")} style={{ "--c": c, "--c2": c2 }} aria-hidden="true">
      <span className="dl5-cover__spine" />
      <span className="dl5-cover__front">
        <img src={FRK_EMBLEM_SM} alt="" width="120" height="118" className="dl5-cover__wm" loading="lazy" decoding="async" />
        <span className="dl5-cover__ic">
          <K5_I n={ic} s={small ? 18 : 22} />
        </span>
        <small>{kind}</small>
        <b>{title}</b>
      </span>
      <span className="dl5-cover__pages" />
    </div>
  );
}

/* update 7: a brochure for every single service, grouped by service area */
function DL7_Every({ onGet }) {
  const vs = VERTICALS.filter((v) => FRK_V[v.slug] && (v.services || []).length);
  const [on, setOn] = ee.useState(0);
  const [q, setQ] = ee.useState("");
  const v = vs[on] || vs[0];
  if (!v) return null;
  const W = FRK_V[v.slug];
  const qq = q.trim().toLowerCase();
  const list = qq ? vs.flatMap((x) => x.services.filter((s) => s.name.toLowerCase().includes(qq)).map((s) => [x, s])) : v.services.map((s) => [v, s]);
  const total = vs.reduce((a, x) => a + x.services.length, 0);
  return (
    <div className="dl7-every">
      <h2 className="dl5-h2 dl5-h2--sm">And a brochure for every service ({total})</h2>
      <p className="dl7-every__d">Each one covers what is included, how we work, the quality checks for that service, common questions and related services.</p>
      <div className="dl7-every__bar">
        <div className="dl7-every__tabs" role="tablist" aria-label="Service areas">
          {vs.map((x, i) => (
            <button key={x.slug} type="button" role="tab" aria-selected={!qq && i === on} className={!qq && i === on ? "is-on" : ""} style={{ "--c": FRK_V[x.slug].c1, "--c2": FRK_V[x.slug].c2 }} onClick={() => (setOn(i), setQ(""))}>
              {x.slug === "accounts-finance" ? "Accounts & Finance" : x.name} <b>{x.services.length}</b>
            </button>
          ))}
        </div>
        <label className="dl7-every__q">
          <K5_I n="search" s={16} />
          <span className="frk-sr">Search services</span>
          <input type="search" value={q} placeholder="Search all services" onChange={(e) => setQ(e.target.value)} />
        </label>
      </div>
      <ul className="dl7-every__grid" key={qq ? "q" : v.slug}>
        {list.map(([x, s], i) => {
          const c = FRK_V[x.slug];
          return (
            <li key={x.slug + s.slug} style={{ "--c": c.c1, "--c2": c.c2, "--i": Math.min(i, 16) }}>
              <span className="dl7-every__cv" aria-hidden="true">
                <img src={FRK_EMBLEM_SM} alt="" width="40" height="39" loading="lazy" decoding="async" />
                <K5_I n="doc" s={18} />
              </span>
              <span className="dl7-every__t">
                <b>{s.name}</b>
                <small>{s.summary}</small>
              </span>
              <span className="dl7-every__a">
                <HmLink to={"/services/" + x.slug + "/" + s.slug}>View service</HmLink>
                <button type="button" onClick={() => onGet(x.slug, s)}>
                  <K5_I n="doc" s={14} /> PDF
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      {!list.length ? <p className="dl7-every__d">No service matches “{q}”.</p> : null}
    </div>
  );
}

function DL5_Doc({ x, kind, onGet, i, page }) {
  return (
    <K5_Rv as="article" a={i % 2 ? "tilt" : "flip"} d={i} className="dl5-doc" style={{ "--c": x.c, "--c2": x.c2 }}>
      <DL5_Cover c={x.c} c2={x.c2} ic={x.ic} kind={kind} title={x.t} />
      <div className="dl5-doc__body">
        <h3>{x.t}</h3>
        <p>{x.d}</p>
        {x.pts ? (
          <ul>
            {x.pts.map((p) => (
              <li key={p}>
                <K5_I n="check" s={14} /> {p}
              </li>
            ))}
          </ul>
        ) : null}
        {page ? (
          <HmLink to={page} className="dl5-get dl5-get--page">
            <K5_I n="eye" s={17} /> View the quality process
          </HmLink>
        ) : null}
        <button type="button" className={"dl5-get" + (page ? " dl5-get--ghost" : "")} onClick={onGet}>
          <K5_I n="doc" s={17} /> Download PDF
        </button>
      </div>
    </K5_Rv>
  );
}

function DL5_Nav({ cur }) {
  return (
    <nav className="dl5-nav" aria-label="Download sections">
      <div className="container dl5-nav__in">
        <HmLink to="/downloads" className={"dl5-nav__a" + (!cur ? " is-on" : "")} aria-current={!cur ? "page" : undefined}>
          <K5_I n="layers" s={15} /> All
        </HmLink>
        {DL5_SECS.map((s, i) => (
          <HmLink key={s.k} to={"/downloads/" + s.k} className={"dl5-nav__a" + (cur === s.k ? " is-on" : "")} aria-current={cur === s.k ? "page" : undefined} style={{ "--c": s.c, "--c2": s.c2 }}>
            <em>{i + 1}</em> {s.t}
          </HmLink>
        ))}
      </div>
    </nav>
  );
}

function dl5Counts(ix) {
  return {
    "consumer-panel-books": ix && ix.b2c ? ix.b2c.length : 0,
    "business-panel-books": ix && ix.b2b ? ix.b2b.length : 0,
    "healthcare-panel-books": DL5_HC.length,
    "quality-process": DL5_Q.length,
    "service-brochures": 1 + (typeof FRK_VKEYS !== "undefined" ? FRK_VKEYS.length : 4),
    "industries-case-studies": INDUSTRIES.length,
  };
}

function DL5_Shelf() {
  return (
    <div className="dl5-shelf" aria-hidden="true">
      <div className="dl5-shelf__row">
        {DL5_SECS.map((s, i) => (
          <span key={s.k} className="dl5-shelf__book" style={{ "--c": s.c, "--c2": s.c2, "--i": i }}>
            <K5_I n={s.ic} s={18} />
            <b>{s.t}</b>
          </span>
        ))}
      </div>
      <span className="dl5-shelf__plank" />
      <span className="dl5-shelf__pdf">
        <K5_I n="doc" s={20} /> PDF
      </span>
    </div>
  );
}

function DL5_Hub({ ix }) {
  const n = dl5Counts(ix);
  const total = Object.values(n).reduce((a, b) => a + b, 0);
  return (
    <>
      <section className="dl5-hero" aria-labelledby="dl5-h1">
        <div className="container dl5-hero__in">
          <div>
            <nav className="dl5-crumbs" aria-label="Breadcrumb">
              <HmLink to="/">Home</HmLink>
              <span aria-current="page">Downloads</span>
            </nav>
            <span className="dl5-kick">
              <K5_I n="doc" s={14} /> Downloads
            </span>
            <K5_Words id="dl5-h1" className="dl5-h1" text="Every document, *on its own shelf.*" />
            <DL5_Motto lead="Download, share and" words={["decide with confidence.", "plan your next study.", "brief your team.", "compare our services."]} />
            <p className="dl5-lead">Six separate sections: pick the shelf you need, share a few details and the branded PDF opens in your browser in seconds.</p>
            <ul className="dl5-hero__facts">
              <li>
                <b>{ix ? <K5_Count to={total} /> : "…"}</b> documents
              </li>
              <li>
                <b>6</b> sections
              </li>
              <li>
                <b>PDF</b> instant download
              </li>
            </ul>
          </div>
          <DL5_Shelf />
        </div>
      </section>
      <DL5_Nav cur="" />
      <DL8_Shelves ix={ix} n={n} />
    </>
  );
}

/* rotating motto line under a hero heading */
function DL5_Motto({ lead, words }) {
  const [i, setI] = ee.useState(0);
  ee.useEffect(() => {
    setI(0);
    if (k5Reduce()) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % words.length), 2600);
    return () => clearInterval(t);
  }, [words]);
  return (
    <p className="dl5-motto">
      <span>{lead}</span>{" "}
      <span className="dl5-motto__roll" aria-live="off">
        <b key={i}>{words[i]}</b>
      </span>
    </p>
  );
}

/* section hero art: a branded PDF lifts off a fanned stack, its icons orbit, and a download drops into the tray */
function DL5_Stage({ s, n, unit }) {
  return (
    <div className="dl5-stage" aria-hidden="true">
      <span className="dl5-stage__glow" />
      <span className="dl5-stage__ring" />
      <span className="dl5-stage__ring dl5-stage__ring--2" />
      <div className="dl5-stage__orb">
        {s.orb.map((ic, k) => (
          <span key={ic} style={{ "--a": k * 120 + "deg" }}>
            <span>
              <K5_I n={ic} s={18} />
            </span>
          </span>
        ))}
      </div>
      <div className="dl5-stage__stack">
        <span className="dl5-stage__pg dl5-stage__pg--3" />
        <span className="dl5-stage__pg dl5-stage__pg--2" />
        <span className="dl5-stage__pg dl5-stage__pg--1">
          <span className="dl5-stage__band">
            <img src={FRK_EMBLEM_SM} alt="" width="30" height="30" decoding="async" />
            <em>{s.kind}</em>
          </span>
          <span className="dl5-stage__ic">
            <K5_I n={s.ic} s={30} />
          </span>
          <b>{s.t}</b>
          <i />
          <i />
          <i />
          <small>PDF</small>
        </span>
      </div>
      <div className="dl5-stage__tray">
        <span className="dl5-stage__dl">
          <K5_I n="arrow" s={16} />
        </span>
        <span className="dl5-stage__bar">
          <i />
        </span>
        <span className="dl5-stage__ok">
          <K5_I n="check" s={13} /> Ready
        </span>
      </div>
      <span className="dl5-stage__count">
        <b>{n || "…"}</b> {unit}
      </span>
    </div>
  );
}

function DL5_SecHero({ s, n }) {
  const i = DL5_SECS.indexOf(s);
  const unit = s.k === "industries-case-studies" ? "industries" : s.k.includes("panel") && !s.k.startsWith("health") ? "countries" : "documents";
  return (
    <section className="dl5-shero" style={{ "--c": s.c, "--c2": s.c2 }} aria-labelledby="dl5-sh1">
      <div className="dl5-shero__bg" aria-hidden="true">
        {Array.from({ length: 14 }, (_, k) => (
          <i key={k} style={{ "--i": k, left: ((k * 41) % 100) + "%", top: ((k * 29) % 90) + "%" }} />
        ))}
      </div>
      <div className="container dl5-shero__in" key={s.k}>
        <div className="dl5-shero__copy">
          <nav className="dl5-crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <HmLink to="/downloads">Downloads</HmLink>
            <span aria-current="page">{s.t}</span>
          </nav>
          <span className="dl5-kick">
            <K5_I n={s.ic} s={14} /> Section {i + 1} of 6 · {s.t}
          </span>
          <K5_Words id="dl5-sh1" className="dl5-sh1" text={s.m} />
          <DL5_Motto lead={s.t + ":"} words={s.w} />
          <p className="dl5-lead">{s.d} Share a few details and the branded PDF opens in your browser in seconds.</p>
          <ul className="dl5-shero__facts">
            <li>
              <b>{n || "…"}</b> {unit}
            </li>
            <li>
              <b>PDF</b> instant download
            </li>
          </ul>
        </div>
        <DL5_Stage s={s} n={n} unit={unit} />
      </div>
    </section>
  );
}

/* calm group accents taken from the site palette (royal, violet, teal, gold, rose) */


const DL5_LEGACY = { "consumer-panel-book": "consumer-panel-books", "business-panel-book": "business-panel-books", "healthcare-panel-book": "healthcare-panel-books", "company-brochure": "service-brochures", "quality-process": "quality-process" };

function DL5_Page() {
  const { section } = useParams();
  const s = section ? dl5Sec(section) : null;
  const ix = dlxUseIndex();
  const [sp] = useSearchParams();
  const [preview, setPreview] = ee.useState(null);
  const [gate, setGate] = ee.useState(null);
  const n = dl5Counts(ix);
  dmMeta(
    s ? "/downloads/" + s.k : "/downloads",
    s ? `${s.t} | Downloads | Frequent Research` : "Downloads | Panel Books, Quality Process, Brochures & Case Studies",
    s ? s.d + " Download the branded PDF instantly." : "Download Frequent Research consumer, business and healthcare panel books, quality processes for every service, all services brochures and industry case studies as PDFs."
  );
  /* old links: /downloads?file=…, ?panel=…&country=…, ?book=… */
  ee.useEffect(() => {
    if (s) return;
    const file = sp.get("file"),
      panel = sp.get("panel"),
      country = sp.get("country") || sp.get("book");
    const to = file ? DL5_LEGACY[file] : panel || country ? (panel === "b2b" ? "business-panel-books" : "consumer-panel-books") : null;
    if (to) navGo("/downloads/" + to + (country ? "?country=" + encodeURIComponent(country) : ""), true);
  }, []);
  /* ?country=<slug> on a panel shelf opens that country's preview */
  const kind = s && s.k === "business-panel-books" ? "b2b" : "b2c";
  ee.useEffect(() => {
    if (!ix || !s || !/consumer|business/.test(s.k)) return;
    const c = sp.get("country");
    const e = c && ix[kind] && ix[kind].find((x) => x.slug === c);
    if (e) navGo(pc5Path(kind, e.slug), true);
  }, [ix, section]);
  ee.useEffect(() => {
    setPreview(null);
    setGate(null);
  }, [section]);
  const doc = (world, kindLabel, title, icon, key, run) => setGate({ world, kind: kindLabel, title, icon, key, run });
  if (section && !s)
    return (
      <div className="dl5">
        <DL5_Hub ix={ix} />
      </div>
    );
  return (
    <div className="dl5" style={s ? { "--c": s.c, "--c2": s.c2 } : undefined}>
      {!s ? (
        <DL5_Hub ix={ix} />
      ) : (
        <>
          {/panel-books$/.test(s.k) ? <PB10_Section kind={pc5Sec2Kind(s.k)} ix={ix} /> : s.k === "industries-case-studies" ? <DL19_Hero /> : <DL5_SecHero s={s} n={n[s.k]} />}
          <DL5_Nav cur={s.k} />
          {/panel-books$/.test(s.k) ? null : <section className={"dl5-body dl5-body--" + s.k} aria-label={s.t}>
            {/* update 11: the panel shelves are PB10_Section (hero, regions, entire panel, countries) */}
            {s.k === "quality-process" && (
              <div className="container">
                <p className="dl5-intro">Each of our four services has its own quality process: the steps every project follows, the quality gate at the end of each step and the checklist the team works to.</p>
                <div className="dl5-docs dl5-docs--4">
                  {DL5_Q.map((x, i) => (
                    <DL5_Doc key={x.k} x={x} i={i} kind="Quality process" page={"/downloads/quality-process/" + x.k} onGet={() => doc(x.k, "Quality process", x.t + " quality process", "shield", "quality-" + x.k, (lead) => fp5Quality(x.k, lead))} />
                  ))}
                </div>
              </div>
            )}
            {s.k === "service-brochures" && (
              <div className="container">
                <K5_Rv a="zoom" className="dl5-all">
                  <DL5_Cover c="#1E40AF" c2="#F59E0B" ic="layers" kind="All services" title="All services brochure" />
                  <div>
                    <span className="k5-eyebrow">
                      <K5_I n="star" s={14} /> One brochure, every service
                    </span>
                    <h2 className="dl5-h2">All services brochure</h2>
                    <p>Market Research, Digital Marketing, IT & Development and Accounts & Finance in one document, with our research panels, products, journey and certifications.</p>
                    <button type="button" className="dl5-get dl5-get--big" onClick={() => doc("market-research", "All services brochure", "All services brochure", "file", "company-brochure", (lead) => frpCompany(lead))}>
                      <K5_I n="doc" s={18} /> Download all services brochure
                    </button>
                  </div>
                </K5_Rv>
                <h2 className="dl5-h2 dl5-h2--sm">One brochure per service area</h2>
                <div className="dl5-docs dl5-docs--4">
                  {FRK_VKEYS.map((k, i) => {
                    const w = FRK_V[k];
                    const v = VERTICALS.find((x) => x.slug === k) || {};
                    const x = { k, t: w.name, ic: { "market-research": "search", "digital-marketing": "funnel", "it-development": "cpu", "accounts-finance": "receipt" }[k] || "doc", c: w.c1, c2: w.c2, d: v.card || v.headline || "", pts: [(v.services || []).length + " services explained", (v.process || []).length + "-step way of working"] };
                    return <DL5_Doc key={k} x={x} i={i} kind="Service brochure" onGet={() => doc(k, "Service brochure", w.name + " brochure", w.ic, "brochure-" + k, (lead) => frpBrochure(k, lead))} />;
                  })}
                </div>
                <DL7_Every onGet={(vs, sv) => doc(vs, "Service brochure", sv.name + " brochure", "file", "brochure-" + vs + "-" + sv.slug, (lead) => sv7Brochure(vs, sv.slug, lead))} />
              </div>
            )}
            {s.k === "industries-case-studies" && <DL19_LibOrOld onPack={((x) => doc("market-research", "Case study pack", x.name + " case studies", "file", "cases-" + x.slug, (lead) => cx5SectorPack(x.slug, lead)))} />}
          </section>}
          <section className="dl5-more" aria-labelledby="dl5-more-h">
            <div className="container">
              <h2 id="dl5-more-h" className="dl5-h2 dl5-h2--sm">
                Other sections
              </h2>
              <div className="dl5-more__row">
                {DL5_SECS.filter((x) => x.k !== s.k).map((x) => (
                  <HmLink key={x.k} to={"/downloads/" + x.k} className="dl5-more__a" style={{ "--c": x.c, "--c2": x.c2 }}>
                    <K5_I n={x.ic} s={18} /> {x.t}
                  </HmLink>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
      {preview && !gate && (
        <DLX_Preview
          kind={preview.kind}
          entry={preview.entry}
          onClose={() => setPreview(null)}
          onGet={(kd, entry) =>
            setGate({
              panel: true,
              world: kd === "b2b" ? "it-development" : "market-research",
              kind: kd === "b2b" ? "B2B panel book" : "Consumer panel book",
              title: `${entry.name} ${kd === "b2b" ? "B2B" : "consumer"} panel book`,
              sub: entry.region,
              flag: entry.iso,
              icon: kd === "b2b" ? "building" : "users",
              key: kd + "/" + entry.slug,
              type: "panel-book",
              run: (lead) => dlxBook(kd, entry.slug).then((b) => frpPanelBook(b, lead)),
            })
          }
        />
      )}
      {gate && (
        <FRG_Gate
          world={gate.world}
          kind={gate.kind}
          title={gate.title}
          sub={gate.sub}
          flag={gate.flag}
          icon={gate.icon}
          resource={{ type: gate.type || "document", key: gate.key, title: gate.title }}
          extra={{ doc: gate.key }}
          onUnlock={gate.run}
          onClose={() => setGate(null)}
        />
      )}
    </div>
  );
}

/* update 19: the industries shelf is DL19_Library when it is loaded */
function DL19_LibOrOld(props) {
  return <DL19_Library {...props} />;
}

export { DL5_Page, DL5_SECS };
