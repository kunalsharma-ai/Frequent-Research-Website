/* ===== Industries & case studies (build 65, in5- / cx5-) =====
   /industries-case-studies                         IN5_Hub     58 sectors in 8 groups, the 15-point framework
   /industries-case-studies/:industry               IN5_Sector  sector profile + its case studies (own palette and type style)
   /industries-case-studies/:industry/:caseSlug     CX5_Page    the case study in 15 sections, with charts and a PDF
   Data: base INDUSTRIES / INDUSTRY_GROUPS / findIndustry / loadCases, sector profiles (Industries65.jsx) and the 15-point engine (CaseFactors65.jsx).
   Linked from Downloads (section 6) and the Downloads menu. */
import * as ee from 'react';
import { HmLink } from '../app/shared/HomeShared.jsx';
import { FRK_Flag } from '../components/site/FrKit.jsx';
import { K5_I } from '../components/site/Kit65.jsx';
import { frpPhases } from '../components/site/Pdfs.jsx';
import { countryName, loadCases } from '../app/pages/IndustriesPages.jsx';

const IN5_TEAMS = [
  ["all", "All teams", "layers"],
  ["market-research", "Market Research", "search"],
  ["digital-marketing", "Digital Marketing", "funnel"],
  ["it-development", "IT & Development", "cpu"],
  ["accounts-finance", "Accounts & Finance", "receipt"],
];
const in5Flag = (m) => (m === "UK" ? "GB" : m);
function in5UseCases(slug) {
  const [cases, setCases] = ee.useState(null);
  ee.useEffect(() => {
    setCases(null);
    if (slug) loadCases(slug).then(setCases, () => setCases([]));
  }, [slug]);
  return cases;
}

function IN5_Crumbs({ ind, cs }) {
  return (
    <nav className="in5-crumbs" aria-label="Breadcrumb">
      <HmLink to="/">Home</HmLink>
      <HmLink to="/downloads/industries-case-studies">Downloads</HmLink>
      {ind ? <HmLink to="/industries-case-studies">Industries & case studies</HmLink> : <span aria-current="page">Industries & case studies</span>}
      {ind && cs ? <HmLink to={"/industries-case-studies/" + ind.slug}>{ind.name}</HmLink> : ind ? <span aria-current="page">{ind.name}</span> : null}
      {cs ? <span aria-current="page">Case study</span> : null}
    </nav>
  );
}


/* ── hub ─────────────────────────────────────────────────────────────────────────────── */


/* ── sector ──────────────────────────────────────────────────────────────────────────── */

/* ── case study ─────────────────────────────────────────────────────────────────────── */
function CX5_Bars({ rows }) {
  const max = Math.max(...rows.map((r) => r[0]), 1);
  return (
    <ul className="cx5-bars">
      {rows.map(([n, l], i) => (
        <li key={l} style={{ "--w": Math.max(6, Math.sqrt(n / max) * 100) + "%", "--i": i }}>
          <span>{l}</span>
          <i />
          <b>{n.toLocaleString("en-IN")}</b>
        </li>
      ))}
    </ul>
  );
}
function CX5_Gantt({ cs }) {
  const ph = frpPhases(cs);
  if (!ph) return null;
  let acc = 0;
  return (
    <div className="cx5-gantt">
      {ph.steps.map((s, i) => {
        const l = acc;
        acc += ph.share[i];
        return (
          <div key={s} className="cx5-gantt__r" style={{ "--l": l * 100 + "%", "--w": ph.share[i] * 100 + "%", "--i": i }}>
            <span>{s}</span>
            <span className="cx5-gantt__track">
              <i />
            </span>
          </div>
        );
      })}
      <small>{ph.total ? `Indicative split of the ${ph.total}-${ph.unit} timeline.` : "Indicative phasing."}</small>
    </div>
  );
}
function CX5_Body({ k, x, cs }) {
  return (
    <>
      {x.label ? <p className="cx5-lbl">{x.label}</p> : null}
      {x.lead ? <p className="cx5-lead">{x.lead}</p> : null}
      {x.kv ? (
        <dl className="cx5-kv">
          {x.kv.map(([a, b]) => (
            <div key={a}>
              <dt>{a}</dt>
              <dd>{b}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      {x.bars ? <CX5_Bars rows={x.bars} /> : null}
      {k === "geo" && x.flags && x.flags.length ? (
        <ul className="cx5-flags">
          {x.flags.map((m) => (
            <li key={m}>
              <FRK_Flag iso={in5Flag(m)} /> {countryName(m)}
            </li>
          ))}
        </ul>
      ) : null}
      {k === "method" ? (
        <>
          <ol className="cx5-flow">
            {x.steps.map((s, i) => (
              <li key={s + i} style={{ "--i": i }}>
                <span>{i + 1}</span>
                {s}
              </li>
            ))}
          </ol>
          {x.sub ? <p className="cx5-sub">{x.sub}</p> : null}
        </>
      ) : null}
      {k === "collection" ? <CX5_Gantt cs={cs} /> : null}
      {x.items ? (
        <ul className={"cx5-list cx5-list--" + k}>
          {x.items.map((t, i) => (
            <li key={i} style={{ "--i": i }}>
              <K5_I n={k === "quality" ? "shield" : k === "findings" ? "eye" : k === "recs" ? "compass" : k === "impact" ? "rocket" : "check"} s={16} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {x.note ? <p className="cx5-note">{x.note}</p> : null}
      {x.quote ? (
        <blockquote className="cx5-quote">
          <K5_I n="spark" s={18} /> {x.quote}
        </blockquote>
      ) : null}
      {x.chips && k !== "method" ? (
        <>
          {x.chipsLabel ? <p className="cx5-lbl">{x.chipsLabel}</p> : null}
          <p className="in5-chips">
            {x.chips.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </p>
        </>
      ) : null}
      {k === "method" && x.chips ? (
        <p className="in5-chips">
          {x.chips.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      ) : null}
      {k === "next" && x.next ? (
        <ul className="cx5-list cx5-list--nx">
          {x.next.map((t) => (
            <li key={t}>
              <K5_I n="arrow" s={16} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
}

export { CX5_Body, IN5_Crumbs, IN5_TEAMS, in5UseCases };
