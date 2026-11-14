import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { INDIA_MAP } from '../data/mapIndia.jsx';
import { GOVERNMENT_CASES } from '../data/caseTrackers.jsx';
import { CONTACT } from '../data/site.jsx';
import { TrustBadges } from '../data/products.jsx';
import { useJsonLd } from '../home/HeroParts.jsx';
import { phoneDialCode } from '../shared/CoreParts.jsx';
import { GPX, GVP, GX_FIELD, gpB, gpBs, gpC, gpRegSum } from '../data/government.jsx';
import { RC_I, RC_useInView } from '../shared/Reveal.jsx';
import { HmLink } from '../shared/HomeShared.jsx';
import { BR_IMG } from '../shared/Brand.jsx';
import { FM_Area, FM_Check, FM_Chips, FM_Input, FM_PREVIEW_NOTE, FM_PRIV, FM_Phone, FM_Select, FM_Success, fmNextUid, fmPost, fmUse } from '../shared/Forms.jsx';
import { GP_Bars, GP_Cols, gpRegOf, gpShare, gpStName } from './GovernmentPage.jsx';
import { usePageMeta } from '../SiteApp.jsx';
import { FMV } from '../shared/SiteEffects.jsx';

const GX_TRACK = {
  projects: null,
  // Government & public-sector projects completed
  interviews: null,
  // Interviews / completes delivered (public sector)
  years: null,
  // Years delivering government & social research
  clients: null,
  // Government / PSU / development-sector clients served
  languages: null,
  // Languages fielded
  interviewers: null, // Field interviewer / enumerator network
};
const GX_TRACK_AREAS = {};
const GX_TRACK_STATES = {};
const GX_FIELD_STATES = GX_FIELD.length;
const GX_FIELD_DISTRICTS = GX_FIELD.reduce((a, s) => a + s.c, 0);
const GX_T = GVP.b2c,
  GX_B = GVP.b2b;
const gxF = (n) => Number(n).toLocaleString("en-IN");
const gxN = (p, T = GX_T) => Math.round((T * p) / 100);
const gxR = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const gxFieldOf = (id) => GX_FIELD.find((s) => s.id === id);
const gxGo = (id) => (e) => {
  const el = document.getElementById(id);
  if (el) {
    if (e) e.preventDefault();
    el.scrollIntoView({
      behavior: gxR() ? "auto" : "smooth",
      block: "start",
    });
  }
};
function gxUseIn(th = 0.25) {
  return RC_useInView(th);
}
function GX_Num({ v, suf = "" }) {
  const [ref, inView] = gxUseIn(0.4);
  const [x, setX] = ee.useState(gxR() ? v : 0);
  ee.useEffect(() => {
    if (!inView || gxR()) {
      if (gxR()) setX(v);
      return;
    }
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1400);
      setX(Math.round(v * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, v]);
  return (
    <span ref={ref} className="gx-num">
      {gxF(x)}
      {suf}
    </span>
  );
}
function GX_Head({ k, t, s, id, light, center }) {
  return (
    <div className={"gx-head" + (light ? " gx-head--light" : "") + (center ? " gx-head--c" : "")}>
      {k && <span className="gx-kick">{k}</span>}
      <h2 id={id}>{t}</h2>
      {s && <p>{s}</p>}
    </div>
  );
}
function gxUseCentroids(svgRef, ids) {
  const [c, setC] = ee.useState({});
  ee.useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const o = {};
    ids.forEach((id) => {
      const p = svg.querySelector(`[data-id="${id}"]`);
      if (p && p.getBBox) {
        const b = p.getBBox();
        o[id] = [b.x + b.width / 2, b.y + b.height / 2];
      }
    });
    if (o.dl) o.dl = [o.dl[0], o.dl[1]];
    setC(o);
  }, []);
  return c;
}
const gxCases = () => (Array.isArray(GOVERNMENT_CASES) ? GOVERNMENT_CASES.filter((c) => c.verified !== false) : []);
const GX_CASE_URL = "/industries-case-studies/government";
const GX_CASE_AREA = {
  "citizen-satisfaction-public-services-survey": ["sat", "gov"],
  "scheme-beneficiary-verification": ["scheme"],
  "local-council-residents-survey": ["sat", "urban"],
  "government-digital-service-usability": ["digi"],
  "election-voter-awareness-study": ["poll"],
  "public-transport-commuter-survey": ["road", "urban"],
  "skills-programme-impact-evaluation": ["emp", "scheme"],
  "tourism-visitor-survey-government": ["gov"],
  "municipal-grievance-system": ["urban", "digi"],
  "public-health-campaign-evaluation": ["health", "poll"],
};
const gxFirst = (t) => {
  const m = (t || "").match(/^.*?[.!?](\s|$)/);
  return (m ? m[0] : t || "").trim();
};
const gxCountries = (cs) => new Set(cs.flatMap((c) => c.markets || [])).size;
const GX_MODES_ALL = ["CAPI", "CATI", "CAWI", "F2F / PAPI", "Mixed mode"];
const GX_QC_TOTAL = 17;
function GX_HeroVis() {
  const stage = ee.useRef(null);
  const move = (e) => {
    if (gxR() || !stage.current) return;
    const b = stage.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5,
      y = (e.clientY - b.top) / b.height - 0.5;
    stage.current.style.setProperty("--rx", (-y * 7).toFixed(2) + "deg");
    stage.current.style.setProperty("--ry", (x * 9).toFixed(2) + "deg");
  };
  const out = () => {
    if (stage.current) {
      stage.current.style.setProperty("--rx", "0deg");
      stage.current.style.setProperty("--ry", "0deg");
    }
  };
  const field = new Set(GX_FIELD.map((s) => s.id));
  return (
    <div className="gx-ops" ref={stage} onMouseMove={move} onMouseLeave={out} aria-hidden="true">
      <div className="gx-ops__stage">
        <svg className="gx-ops__wires" viewBox="0 0 520 470" preserveAspectRatio="none">
          <path id="gxw1" d="M150 120 C 240 120, 250 200, 330 205" />
          <path id="gxw2" d="M330 205 C 360 260, 210 260, 180 330" />
          <path id="gxw3" d="M180 330 C 230 400, 330 400, 380 360" />
          <circle r="5" className="gx-ops__orb">
            {ee.createElement("animateMotion", {
              dur: "2.6s",
              repeatCount: "indefinite",
              path: "M150 120 C 240 120, 250 200, 330 205",
            })}
          </circle>
          <circle r="5" className="gx-ops__orb">
            {ee.createElement("animateMotion", {
              dur: "2.6s",
              begin: ".9s",
              repeatCount: "indefinite",
              path: "M330 205 C 360 260, 210 260, 180 330",
            })}
          </circle>
          <circle r="5" className="gx-ops__orb">
            {ee.createElement("animateMotion", {
              dur: "2.6s",
              begin: "1.8s",
              repeatCount: "indefinite",
              path: "M180 330 C 230 400, 330 400, 380 360",
            })}
          </circle>
        </svg>
        <div
          className="gx-ops__card gx-ops__q"
          style={{
            "--d": "0s",
          }}
        >
          <header>
            <i className="n">01</i>
            <b>Questionnaire</b>
            <em>हिंदी · English</em>
          </header>
          {["Awareness of the scheme", "Access in the last 12 months", "Satisfaction with delivery"].map((t, i) => (
            <span
              key={t}
              className="gx-ops__row"
              style={{
                "--i": i,
              }}
            >
              <i className="gx-ops__tick" />
              {t}
            </span>
          ))}
          <span className="gx-ops__bar">
            <i />
          </span>
        </div>
        <div
          className="gx-ops__card gx-ops__f"
          style={{
            "--d": ".8s",
          }}
        >
          <header>
            <i className="n">02</i>
            <b>Fieldwork</b>
            <em>CAPI · CATI</em>
          </header>
          <svg viewBox={INDIA_MAP.viewBox} className="gx-ops__map">
            {INDIA_MAP.locations.map((c) => (
              <path
                key={c.id}
                d={c.path}
                className={field.has(c.id) ? "on" : ""}
                style={{
                  "--i": [...field].indexOf(c.id),
                }}
              />
            ))}
          </svg>
          <span className="gx-ops__live">
            <i />
            Field teams live
          </span>
        </div>
        <div
          className="gx-ops__card gx-ops__v"
          style={{
            "--d": "1.6s",
          }}
        >
          <header>
            <i className="n">03</i>
            <b>Validation</b>
          </header>
          {["GPS & time stamp", "Back-check", "Audio review", "Duplicate scan"].map((t, i) => (
            <span
              key={t}
              className="gx-ops__chk"
              style={{
                "--i": i,
              }}
            >
              <i />
              {t}
            </span>
          ))}
          <span className="gx-ops__seal">
            <RC_I n="shield" s={16} />
            ISO 20252
          </span>
        </div>
        <div
          className="gx-ops__card gx-ops__r"
          style={{
            "--d": "2.4s",
          }}
        >
          <header>
            <i className="n">04</i>
            <b>Report</b>
            <em>Decision-ready</em>
          </header>
          <span className="gx-ops__chart">
            {[46, 70, 58, 84, 64, 92].map((h, i) => (
              <i
                key={i}
                style={{
                  "--h": h + "%",
                  "--i": i,
                }}
              />
            ))}
          </span>
          <svg viewBox="0 0 120 30" className="gx-ops__line">
            <polyline points="0,24 20,20 40,22 60,13 80,15 100,7 120,4" />
          </svg>
        </div>
        <div className="gx-ops__core">
          <span>
            <RC_I n="target" s={22} />
          </span>
          <b>Evidence</b>
        </div>
        <i className="gx-ops__ring r1" />
        <i className="gx-ops__ring r2" />
      </div>
    </div>
  );
}
function GX_Hero() {
  const pub = gxCases().length;
  const counters = [
    GX_TRACK.projects && {
      v: GX_TRACK.projects,
      l: "Studies completed",
      suf: "+",
    },
    GX_TRACK.interviews && {
      v: GX_TRACK.interviews,
      l: "Interviews delivered",
      suf: "+",
    },
    {
      v: GX_AREAS.length,
      l: "Study types we run",
      go: "gx-portfolio",
    },
    {
      v: GX_FIELD_STATES,
      l: "States & UTs with field teams",
      go: "gx-coverage",
    },
    {
      v: GX_FIELD_DISTRICTS,
      l: "Districts covered on the ground",
      go: "gx-coverage",
    },
    pub && {
      v: pub,
      l: "Published government case studies",
      to: GX_CASE_URL,
    },
    {
      v: GX_MODES_ALL.length,
      l: "Survey modes",
      go: "gx-areas",
    },
    {
      v: GX_QC_TOTAL,
      l: "Quality checks per study",
      go: "gx-qc",
    },
    GX_TRACK.languages && {
      v: GX_TRACK.languages,
      l: "Languages fielded",
    },
  ]
    .filter(Boolean)
    .slice(0, 6);
  const isos = [
    ["iso-20252", "ISO 20252:2019", "Market, opinion & social research"],
    ["iso-9001", "ISO 9001:2015", "Quality management systems"],
    ["iso-27001", "ISO/IEC 27001:2013", "Information security management"],
  ];
  return (
    <section className="gx-hero" aria-labelledby="gx-h1">
      <div className="gx-hero__bg" aria-hidden="true">
        <i className="gx-hero__grid" />
        <i className="gx-hero__glow" />
        <i className="gx-hero__glow2" />
      </div>
      <div className="container gx-hero__in">
        <div className="gx-hero__copy">
          <nav className="crumbs" aria-label="Breadcrumb">
            <HmLink to="/">Home</HmLink>
            <span>
              <span aria-current="page">Government & Opinion Research</span>
            </span>
          </nav>
          <span className="gx-kick gx-kick--light">Evidence for governance</span>
          <HeroH1 id="gx-h1">
            {"Research the public. Understand the population. "}
            <span>Deliver evidence.</span>
          </HeroH1>
          <p className="gx-hero__lead">
            Citizen surveys, opinion polls and scheme evaluations — designed, fielded and validated across India.
          </p>
          <ul className="gx-hero__pts">
            <li>
              <RC_I n="check" s={15} />
              Sampling plan & margin of error before fieldwork
            </li>
            <li>
              <RC_I n="check" s={15} />
              Back-checks, GPS and audio validation
            </li>
            <li>
              <RC_I n="check" s={15} />
              Respondent-level data, codebook & technical annex
            </li>
          </ul>
          <div className="gx-hero__ctas">
            <a href="#brief" className="btn btn--lg gx-btn" onClick={gxGo("brief")}>
              {"Request a Research Proposal "}
              <span aria-hidden="true">→</span>
            </a>
            <a href="#brief" className="btn btn--lg gx-btn-ghost" onClick={gxGo("brief")}>
              Get a Sample Feasibility
            </a>
          </div>
          <ul className="gx-iso" aria-label="Certifications">
            {isos.map(([k, c, t]) => (
              <li key={k} tabIndex={0}>
                <img src={BR_IMG[k]} alt="" width="34" height="34" />
                <b>{c}</b>
                <span className="gx-tip" role="tooltip">
                  {t}
                </span>
              </li>
            ))}
            <li tabIndex={0}>
              <b className="gx-iso__txt">ESOMAR</b>
              <span className="gx-tip" role="tooltip">
                ESOMAR member
              </span>
            </li>
            <li tabIndex={0}>
              <b className="gx-iso__txt">MSME</b>
              <span className="gx-tip" role="tooltip">
                MSME registered
              </span>
            </li>
          </ul>
        </div>
        <div className="gx-hero__vis">
          <GX_HeroVis />
        </div>
      </div>
      <div className="container">
        <ul className="gx-counters">
          {counters.map((c) => {
            const inner = (
              <>
                <b>
                  <GX_Num v={c.v} suf={c.suf || ""} />
                </b>
                <span>{c.l}</span>
              </>
            );
            return (
              <li key={c.l}>
                {c.to ? (
                  <HmLink to={c.to} className="gx-counters__a">
                    {inner}
                    <i aria-hidden="true">→</i>
                  </HmLink>
                ) : c.go ? (
                  <a href={"#" + c.go} onClick={gxGo(c.go)} className="gx-counters__a">
                    {inner}
                    <i aria-hidden="true">→</i>
                  </a>
                ) : (
                  inner
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
const GX_CLIENTS = [
  ["Central ministries", "flag"],
  ["State departments", "map"],
  ["Public sector undertakings", "grid"],
  ["Development agencies", "globe"],
  ["NGOs", "users"],
  ["Policy think-tanks", "bulb"],
  ["Consulting firms", "clipboard"],
  ["Urban local bodies", "layers"],
];
function GX_Trust() {
  const row = GX_CLIENTS.concat(GX_CLIENTS);
  return (
    <section className="gx-trust" aria-label="Who we design research for">
      <div className="container gx-trust__in">
        <span className="gx-trust__lab">Research designed for</span>
        <div className="gx-trust__view" aria-hidden="true">
          <div className="gx-trust__track">
            {row.map(([t, ic], i) => (
              <span key={i}>
                <RC_I n={ic} s={16} />
                {t}
              </span>
            ))}
          </div>
        </div>
        <ul className="gx-sr">
          {GX_CLIENTS.map(([t]) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <span className="gx-neutral">
          <RC_I n="shield" s={16} />
          Non-partisan · Methodology documented · ISO 20252
        </span>
      </div>
    </section>
  );
}
const gxP = (k, lab) => gpC(k, lab);
const GX_AREAS = (() => {
  const G = GPX;
  const pm = (p, l) => [gxF(gxN(p)), l + " \xB7 panel members", p + "% of citizen panel"];
  const pb = (v, l, of) => [v + "%", l, of];
  return [
    {
      k: "gov",
      t: "Government & Public-Sector Surveys",
      ic: "flag",
      c: "#0E7C86",
      modes: ["CAPI", "CATI", "Online", "Mixed mode"],
      dec: "Evidence for departmental planning and service design.",
      reach: [
        [gxF(GX_T), "Citizen panel members", "All 36 states & UTs"],
        [gxF(GX_B), "B2B & public-sector panel members", "Profiled professionals"],
        [String(GX_FIELD_DISTRICTS), "Districts with field teams", GX_FIELD_STATES + " states & UTs"],
      ],
      viz: {
        t: "Panel members by region",
        rows: Object.keys(GVP.reg)
          .map((r) => [r, gpRegSum(r)])
          .sort((a, b) => b[1] - a[1]),
      },
    },
    {
      k: "poll",
      t: "Opinion Polls & Public Sentiment",
      ic: "pie",
      c: "#F28C28",
      modes: ["CATI", "Online panel", "F2F"],
      dec: "Where the public stands on issues and priorities.",
      reach: [pm(G.adult, "Aged 18+"), pm(G.women, "Women"), pm(G.y1829, "Aged 18\u201329")],
      viz: {
        t: "Age profile",
        rows: GVP.C.age,
      },
    },
    {
      k: "sat",
      t: "Citizen Satisfaction Research",
      ic: "okc",
      c: "#2E9E5B",
      modes: ["Exit interviews", "CATI", "CAPI"],
      dec: "Which public services work, and where they fall short.",
      reach: [pm(G.rent, "Renting their home"), pm(G.fam, "Living with family"), pm(G.a50, "Aged 50+")],
      viz: {
        t: "Living arrangement",
        rows: GVP.C.home,
      },
    },
    {
      k: "hh",
      t: "Household & Socioeconomic Surveys",
      ic: "grid",
      c: "#0B1F3A",
      modes: ["CAPI door-to-door"],
      dec: "Income, assets and living conditions by household.",
      reach: [
        pm(G.hh5, "Households under \u20B95 lakh"),
        pm(G.hhMid, "Households \u20B95\u201315 lakh"),
        pm(gxP("family", "Family household decision makers"), "Household decision makers"),
      ],
      viz: {
        t: "Household income (annual)",
        rows: GVP.C.hhinc,
        cols: true,
      },
    },
    {
      k: "health",
      t: "Public Health & Healthcare Access",
      ic: "shield",
      c: "#D0477A",
      modes: ["CAPI", "CATI", "HCP panel"],
      dec: "Barriers to care, and who faces them.",
      reach: [
        pm(gxP("health", "People with disabilities"), "People with disabilities"),
        pm(gxP("health", "Patients with chronic conditions"), "Chronic conditions"),
        pm(gxP("health", "Caregivers & family caregivers"), "Caregivers"),
      ],
      viz: {
        t: "Health & inclusion groups",
        rows: GVP.C.health.slice(0, 6),
      },
    },
    {
      k: "edu",
      t: "Education & Youth Research",
      ic: "award",
      c: "#5A3FE0",
      modes: ["School-based", "Online", "F2F"],
      dec: "Learning conditions, access and parent expectations.",
      reach: [
        pm(G.student, "Students"),
        pm(gxP("family", "Parents of school-age children (6\u201312)"), "Parents of 6\u201312-year-olds"),
        pm(G.y1829, "Young adults 18\u201329"),
      ],
      viz: {
        t: "Parents by child age",
        rows: GVP.C.family.filter((r) => /^Parents of (infants|preschool|school-age|teenagers)/.test(r[0])),
      },
    },
    {
      k: "agri",
      t: "Agriculture & Farmer Studies",
      ic: "compass",
      c: "#3E8E5A",
      modes: ["F2F in local languages"],
      dec: "Input use, credit and market access on the farm.",
      reach: [
        pb(
          gpB("agrigov", "Agriculture Extension Officer"),
          "Agriculture extension officers",
          "of agri public-sector roles",
        ),
        pb(gpB("coop", "Cooperative Manager"), "Cooperative managers", "of cooperative profiles"),
        [String(GX_FIELD_DISTRICTS), "Districts with field teams", "Village-level fieldwork"],
      ],
      viz: {
        t: "Agri public-sector roles (%)",
        rows: [...GVP.B.agrigov].slice(0, 5),
        pct: true,
      },
    },
    {
      k: "emp",
      t: "Employment, Skills & Workforce",
      ic: "trend",
      c: "#1E5BFF",
      modes: ["CATI", "CAPI", "Establishment surveys"],
      dec: "Jobs, skills and earnings, formal and informal.",
      reach: [
        pm(G.working, "Working"),
        pm(G.informal, "Part-time, self-employed or seasonal"),
        pm(G.unemp, "Unemployed"),
      ],
      viz: {
        t: "Main activity",
        rows: GVP.C.occ.filter((r) => r[0] !== "Military"),
        sort: true,
      },
    },
    {
      k: "cons",
      t: "Consumer Research (public interest)",
      ic: "tag",
      c: "#C2701E",
      modes: ["Online panel", "F2F"],
      dec: "Prices, product safety and consumer protection.",
      reach: [
        pm(gxP("family", "Family household decision makers"), "Household decision makers"),
        pm(gxP("family", "Primary grocery shoppers"), "Primary grocery shoppers"),
        pm(gxP("family", "Household budget managers"), "Household budget managers"),
      ],
      viz: {
        t: "Personal income (annual)",
        rows: GVP.C.pinc,
        cols: true,
      },
    },
    {
      k: "rural",
      t: "Rural Research",
      ic: "map",
      c: "#6B8E23",
      modes: ["F2F", "CAPI"],
      dec: "Village-level evidence, district by district.",
      reach: [
        [String(GX_FIELD_DISTRICTS), "Districts with field teams", GX_FIELD_STATES + " states & UTs"],
        pm(G.seasonal, "Occasional or seasonal workers"),
        pb(
          gpBs("civil", ["Sub-Divisional Magistrate", "Tehsildar", "Naib Tehsildar", "Block Development Officer"]),
          "Tehsil & block officials",
          "of civil-services profiles",
        ),
      ],
      viz: {
        t: "Districts with field teams (top states)",
        rows: GX_FIELD.slice(0, 6).map((s) => [s.n, s.c]),
        raw: true,
      },
    },
    {
      k: "urban",
      t: "Urban Infrastructure & Civic Services",
      ic: "layers",
      c: "#0E7C86",
      modes: ["Intercepts", "CAPI", "Online"],
      dec: "How residents rate transport, water and civic services.",
      reach: [
        pb(gpB("legis", "Councillor"), "Councillors", "of legislature profiles"),
        pb(gpBs("leaders", ["Mayor", "Deputy Mayor"]), "Mayors & deputy mayors", "of local-government leadership"),
        pm(G.rent, "Renting their home"),
      ],
      viz: {
        t: "Legislature profile (%)",
        rows: GVP.B.legis.filter((r) => r[0] !== "Senator" && r[0] !== "Legislator"),
        pct: true,
      },
    },
    {
      k: "policy",
      t: "Policy Research",
      ic: "scale",
      c: "#0B1F3A",
      modes: ["Quant", "IDIs", "FGDs"],
      dec: "Awareness and expected impact, before and after a policy.",
      reach: [
        pm(G.grad, "Graduates and above"),
        pm(G.pg, "Master's, professional or doctoral"),
        pb(
          gpBs("policy", ["Policy Analyst", "Strategic Planning Officer", "Research Officer"]),
          "Analysts, planners & research officers",
          "of policy & planning profiles",
        ),
      ],
      viz: {
        t: "Highest qualification",
        rows: GVP.C.edu,
      },
    },
    {
      k: "scheme",
      t: "Scheme Evaluation & Beneficiary Studies",
      ic: "check",
      c: "#2E9E5B",
      modes: ["Baseline / endline", "CAPI"],
      dec: "Did the scheme reach the people it was meant for?",
      reach: [
        pm(G.hh5, "Households under \u20B95 lakh"),
        pm(gxP("health", "People with disabilities"), "People with disabilities"),
        pm(G.a65, "Aged 65+"),
      ],
      viz: {
        t: "Household income (annual)",
        rows: GVP.C.hhinc,
        cols: true,
        hi: ["< \u20B93L", "\u20B93\u20135L"],
      },
    },
    {
      k: "wcd",
      t: "Women & Child Development",
      ic: "users",
      c: "#D0477A",
      modes: ["CAPI", "Community FGDs"],
      dec: "Maternal, child and women's welfare outcomes.",
      reach: [
        pm(G.women, "Women"),
        pm(gxP("family", "Parents of infants (0\u20132)"), "Parents of infants"),
        pm(gxP("family", "Expecting parents"), "Expecting parents"),
      ],
      viz: {
        t: "Family & parenting",
        rows: GVP.C.family.slice(0, 6),
      },
    },
    {
      k: "fin",
      t: "Financial Inclusion & Digital Payments",
      ic: "tag",
      c: "#F28C28",
      modes: ["CATI", "Online", "CAPI"],
      dec: "Who banks digitally, and who is left out.",
      reach: [
        pm(gxP("fin", "Online banking users"), "Online banking users"),
        pm(gxP("fin", "Digital wallet users"), "Digital wallet users"),
        pm(gxP("fin", "Insurance policy holders"), "Insurance policy holders"),
      ],
      viz: {
        t: "Financial products held",
        rows: GVP.C.fin.slice(0, 7),
      },
    },
    {
      k: "digi",
      t: "Digital Governance & e-Services",
      ic: "cpu",
      c: "#1E5BFF",
      modes: ["Online", "CAPI for offline users"],
      dec: "Awareness and use of online public services.",
      reach: [
        pm(gxP("tech", "Android users"), "Android users"),
        pm(gxP("tech", "iPhone users"), "iPhone users"),
        pm(gxP("tech", "AI tool users"), "AI tool users"),
      ],
      viz: {
        t: "Devices & digital tools",
        rows: GVP.C.tech,
      },
    },
    {
      k: "wash",
      t: "Water, Sanitation & Hygiene (WASH)",
      ic: "globe",
      c: "#0E7C86",
      modes: ["CAPI", "Observation"],
      dec: "Access to water, sanitation and hygiene at home.",
      reach: [
        pm(G.hh5, "Households under \u20B95 lakh"),
        pm(gxP("family", "Parents of infants (0\u20132)"), "Parents of infants"),
        [String(GX_FIELD_DISTRICTS), "Districts with field teams", "Household observation"],
      ],
      viz: {
        t: "Living arrangement",
        rows: GVP.C.home,
      },
    },
    {
      k: "road",
      t: "Mobility & Road Safety",
      ic: "rocket",
      c: "#C2701E",
      modes: ["Intercepts", "CATI"],
      dec: "Road use, safety behaviour and transport needs.",
      reach: [
        pm(gxP("mobility", "Fleet vehicle drivers"), "Fleet vehicle drivers"),
        pm(gxP("mobility", "Commercial vehicle owners"), "Commercial vehicle owners"),
        pm(gxP("mobility", "Motorcycle owners"), "Motorcycle owners"),
      ],
      viz: {
        t: "Mobility groups",
        rows: GVP.C.mobility,
      },
    },
    {
      k: "env",
      t: "Environment & Climate Perception",
      ic: "globe",
      c: "#3E8E5A",
      modes: ["Online", "F2F"],
      dec: "Public awareness and attitudes on climate and pollution.",
      reach: [
        pm(gxP("mobility", "Electric vehicle owners"), "EV owners"),
        pm(gxP("mobility", "Hybrid vehicle owners"), "Hybrid vehicle owners"),
        pm(G.y1829, "Young adults 18\u201329"),
      ],
      viz: {
        t: "Age profile",
        rows: GVP.C.age,
      },
    },
  ];
})();
const GX_DESIGN = {
  gov: [
    "Multi-stage stratified, by state, district and urban / rural",
    "Citizens, service users, officials",
    "Weighted dataset, dashboard, decision report",
  ],
  poll: [
    "Quota or random-digit sample, weighted to population",
    "Adults 18+ by age, gender, region",
    "Topline, cross-tabs, margin of error",
  ],
  sat: [
    "Exit-interview sampling at service points",
    "Recent users of the service",
    "Satisfaction index by service and district",
  ],
  hh: [
    "Household listing with random selection",
    "Household heads and members",
    "Socioeconomic profile, asset and income tables",
  ],
  health: [
    "Facility catchment and household sampling",
    "Patients, caregivers, health workers",
    "Access-barrier analysis by group",
  ],
  edu: [
    "School-based sampling with parent follow-up",
    "Students (with consent), parents, teachers",
    "Learning-conditions report, school profiles",
  ],
  agri: [
    "Village and crop-zone stratified sampling",
    "Farmers, agri-workers, extension staff",
    "Input, credit and market-access findings",
  ],
  emp: [
    "Household and establishment frames",
    "Workers, job-seekers, employers",
    "Skills, earnings and job-search analysis",
  ],
  cons: ["Online panel with offline top-up", "Consumers and household buyers", "Price and safety perception tables"],
  rural: ["Village-level PPS sampling", "Rural households and communities", "District-wise rural indicators"],
  urban: [
    "Ward-level and intercept sampling",
    "Residents, commuters, service users",
    "Ward-wise civic-service scorecards",
  ],
  policy: ["Mixed quant + IDIs + FGDs", "Citizens, experts, affected groups", "Awareness and impact assessment"],
  scheme: [
    "Baseline / endline with comparison group",
    "Beneficiaries and non-beneficiaries",
    "Reach, leakage and outcome evaluation",
  ],
  wcd: [
    "Household sampling with female interviewers",
    "Women, mothers, caregivers",
    "Maternal and child welfare indicators",
  ],
  fin: ["Stratified by income and access", "Banked and under-banked adults", "Inclusion and adoption gap analysis"],
  digi: [
    "Online users + CAPI for offline citizens",
    "Digital and non-digital citizens",
    "Awareness, usage and usability findings",
  ],
  wash: [
    "Household sampling with observation checklists",
    "Households, community facilities",
    "Access and practice indicators",
  ],
  road: [
    "Intercepts at roads, depots and hubs",
    "Drivers, commuters, fleet operators",
    "Road-use and safety behaviour report",
  ],
  env: ["Online + F2F, urban and rural split", "Adults and young people", "Awareness and attitude tracker"],
};
function GX_Explorer() {
  const [i, setI] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  const [ref, inView] = gxUseIn(0.2);
  ee.useEffect(() => {
    if (hold || !inView || gxR()) return;
    const t = setInterval(() => setI((x) => (x + 1) % GX_AREAS.length), 5e3);
    return () => clearInterval(t);
  }, [hold, inView]);
  ee.useEffect(() => {
    const h = (e) => {
      const n = GX_AREAS.findIndex((x) => x.k === e.detail);
      if (n >= 0) {
        setI(n);
        setHold(true);
      }
    };
    window.addEventListener("gx-area", h);
    return () => window.removeEventListener("gx-area", h);
  }, []);
  const a = GX_AREAS[i];
  const dz = GX_DESIGN[a.k] || [];
  const tr = GX_TRACK_AREAS[a.k] || {};
  const track = [
    ["projects", "Projects completed"],
    ["interviews", "Interviews delivered"],
    ["states", "States covered"],
    ["sample", "Typical sample"],
  ].filter(([k]) => tr[k] != null);
  const rail = ee.useRef(null);
  ee.useEffect(() => {
    const r = rail.current;
    const b = r && r.children[i];
    if (b && r.scrollWidth > r.clientWidth)
      r.scrollTo({
        left: b.offsetLeft - 16,
        behavior: gxR() ? "auto" : "smooth",
      });
  }, [i]);
  return (
    <section
      ref={ref}
      className="gx-exp"
      id="gx-areas"
      aria-labelledby="gx-exp-h"
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
      onFocus={() => setHold(true)}
    >
      <div className="container">
        <GX_Head
          k="Research areas"
          id="gx-exp-h"
          t="Every kind of public-sector study, one research partner"
          s={`${GX_AREAS.length} research areas. Choose one to see its methods and the panel members behind it.`}
        />
        <div className="gx-exp__rail" ref={rail} role="tablist" aria-label="Research areas">
          {GX_AREAS.map((x, n) => (
            <button
              key={x.k}
              role="tab"
              aria-selected={n === i}
              className={n === i ? "is-on" : ""}
              style={{
                "--c": x.c,
              }}
              onClick={() => {
                setI(n);
                setHold(true);
              }}
            >
              <span className="gx-exp__ic">
                <RC_I n={x.ic} s={18} />
              </span>
              {x.t}
              {n === i && !hold && !gxR() && <i className="gx-exp__timer" aria-hidden="true" />}
            </button>
          ))}
        </div>
        <div
          className="gx-exp__panel"
          key={a.k}
          role="tabpanel"
          aria-label={a.t}
          style={{
            "--c": a.c,
          }}
        >
          <div className="gx-exp__main">
            <span className="gx-exp__badge">
              <RC_I n={a.ic} s={26} />
            </span>
            <h3>{a.t}</h3>
            <p className="gx-exp__dec">
              <RC_I n="target" s={16} />
              {a.dec}
            </p>
            {track.length > 0 && (
              <div className="gx-exp__track">
                {track.map(([k, l]) => (
                  <div key={k}>
                    <b>
                      <GX_Num v={tr[k]} />
                    </b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            )}
            <dl className="gx-exp__design">
              {[
                ["Sampling", dz[0], "compass"],
                ["Respondents", dz[1], "users"],
                ["You receive", dz[2], "file"],
              ].map(
                ([l, v, ic]) =>
                  v && (
                    <div key={l}>
                      <dt>
                        <RC_I n={ic} s={14} />
                        {l}
                      </dt>
                      <dd>{v}</dd>
                    </div>
                  ),
              )}
            </dl>
            {(() => {
              const cs = gxCases().filter((c) => (GX_CASE_AREA[c.slug] || []).includes(a.k));
              return (
                cs.length > 0 && (
                  <div className="gx-exp__cases">
                    <span>
                      <b>{cs.length}</b>
                      {" published case stud"}
                      {cs.length > 1 ? "ies" : "y"}
                    </span>
                    {cs.map((c) => (
                      <HmLink key={c.slug} to={`${GX_CASE_URL}/${c.slug}`}>
                        {c.title}
                        <i aria-hidden="true">→</i>
                      </HmLink>
                    ))}
                  </div>
                )
              );
            })()}
            <div className="gx-exp__modes">
              <span>Main modes</span>
              {a.modes.map((m) => (
                <i key={m}>{m}</i>
              ))}
            </div>
            {a.reach[0] && (
              <p className="gx-exp__panelline">
                <RC_I n="users" s={13} />
                {"Panel support: "}
                {a.reach[0][0]} {a.reach[0][1].toLowerCase()}
              </p>
            )}
          </div>
          <div className="gx-exp__viz">
            <h4>{a.viz.t}</h4>
            {a.viz.cols ? (
              <GP_Cols rows={a.viz.rows} hi={a.viz.hi || []} />
            ) : (
              <GP_Bars
                rows={a.viz.rows}
                T={a.viz.pct || a.viz.raw ? null : GX_T}
                unit={a.viz.pct || a.viz.raw ? "pct" : "count"}
                sort={a.viz.sort}
                suffix={a.viz.raw ? "" : "%"}
              />
            )}
            {a.viz.raw && <small className="gx-note">Values are district counts.</small>}
          </div>
        </div>
        <div className="gx-exp__nav" aria-hidden="true">
          {GX_AREAS.map((x, n) => (
            <i key={x.k} className={n === i ? "is-on" : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
const GX_ABBR = {
  gov: "Gs",
  poll: "Op",
  sat: "Cs",
  hh: "Hh",
  health: "Ph",
  edu: "Ed",
  agri: "Ag",
  emp: "Em",
  cons: "Cr",
  rural: "Ru",
  urban: "Ub",
  policy: "Pr",
  scheme: "Se",
  wcd: "Wc",
  fin: "Fi",
  digi: "Dg",
  wash: "Wa",
  road: "Rs",
  env: "Ev",
};
function GX_Portfolio() {
  const [ref, v] = gxUseIn(0.15);
  const total = Object.values(GX_TRACK_AREAS).reduce((a, x) => a + (x && x.projects ? x.projects : 0), 0);
  const pub = gxCases();
  const pick = (k) => (e) => {
    e.preventDefault();
    window.dispatchEvent(
      new CustomEvent("gx-area", {
        detail: k,
      }),
    );
    gxGo("gx-areas")();
  };
  return (
    <section ref={ref} className={"gx-port" + (v ? " is-in" : "")} id="gx-portfolio" aria-labelledby="gx-port-h">
      <div className="container">
        <div className="gx-port__top">
          <GX_Head
            k="Study portfolio"
            id="gx-port-h"
            t={`${GX_AREAS.length} types of public-sector study, one accountable team`}
            s="Every study type we design, field and report. Select one to see how we run it."
          />
          <div className="gx-port__sum">
            {total > 0 && (
              <div>
                <b>
                  <GX_Num v={total} suf="+" />
                </b>
                <span>Studies completed</span>
              </div>
            )}
            <div>
              <b>
                <GX_Num v={GX_AREAS.length} />
              </b>
              <span>Study types</span>
            </div>
            <div>
              <b>
                <GX_Num v={GX_MODES_ALL.length} />
              </b>
              <span>Survey modes</span>
            </div>
            {pub.length > 0 && (
              <div>
                <b>
                  <GX_Num v={pub.length} />
                </b>
                <span>Published case studies</span>
              </div>
            )}
          </div>
        </div>
        <ul className="gx-port__wall">
          {GX_AREAS.map((a, i) => {
            const tr = GX_TRACK_AREAS[a.k] || {};
            const cs = pub.filter((c) => (GX_CASE_AREA[c.slug] || []).includes(a.k)).length;
            return (
              <li
                key={a.k}
                style={{
                  "--c": a.c,
                  "--i": i,
                }}
              >
                <a href="#gx-areas" onClick={pick(a.k)} aria-label={`${a.t}: see how we run it`}>
                  <span className="gx-port__no">{String(i + 1).padStart(2, "0")}</span>
                  <span className="gx-port__sym">{GX_ABBR[a.k]}</span>
                  <span className="gx-port__ic">
                    <RC_I n={a.ic} s={16} />
                  </span>
                  <b>{a.t}</b>
                  {tr.projects != null ? (
                    <em className="gx-port__n">
                      <GX_Num v={tr.projects} />
                      studies
                    </em>
                  ) : (
                    <em className="gx-port__m">{a.modes.slice(0, 2).join(" \xB7 ")}</em>
                  )}
                  {cs > 0 && (
                    <i className="gx-port__cs" title={`${cs} published case stud${cs > 1 ? "ies" : "y"}`}>
                      {cs}
                      {" case"}
                      {cs > 1 ? "s" : ""}
                    </i>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
const GX_DD = [
  [
    "Representative sampling",
    "Sampling frame, design and margin of error agreed before fieldwork.",
    "Sampling plan",
    "compass",
  ],
  [
    "Neutral, tested questionnaire",
    "Pilot-tested, translated and back-translated into local languages.",
    "Questionnaire + translations",
    "file",
  ],
  [
    "Trained, supervised field teams",
    "Interviewer training, supervisor ratios and daily progress reports.",
    "Field manual & daily MIS",
    "users",
  ],
  [
    "Verifiable interviews",
    "GPS and time stamps, back-checks and audio review where consented.",
    "QC & back-check log",
    "shield",
  ],
  [
    "Transparent data processing",
    "Documented cleaning rules, outlier review and weighting.",
    "Weighting note",
    "sliders",
  ],
  [
    "Usable deliverables",
    "Respondent-level data in SPSS / Excel / CSV with a codebook.",
    "Data + codebook",
    "database",
  ],
  [
    "Confidentiality & consent",
    "Informed consent, anonymised reporting and NDAs on request.",
    "Consent & data-handling note",
    "eyeoff",
  ],
  ["Certified processes", "ISO 20252, ISO 9001 and ISO/IEC 27001 certified systems.", "Certificates", "award"],
];
function GX_Diligence() {
  const [ref, v] = gxUseIn(0.2);
  const [on, setOn] = ee.useState(0);
  return (
    <section ref={ref} className={"gx-dd" + (v ? " is-in" : "")} id="gx-diligence" aria-labelledby="gx-dd-h">
      <div className="container gx-dd__in">
        <div>
          <GX_Head
            k="For research officers"
            id="gx-dd-h"
            t="What reviewers check first — and what we hand over"
            s="Eight points technical committees look for. Each comes with a document in your evidence pack."
          />
          <ol className="gx-dd__list">
            {GX_DD.map(([t, d, doc, ic], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
                className={on === i ? "is-on" : ""}
                onMouseEnter={() => setOn(i)}
              >
                <button type="button" onClick={() => setOn(i)} onFocus={() => setOn(i)} aria-pressed={on === i}>
                  <span className="gx-dd__tick">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 12.5l4.2 4L19 7" />
                    </svg>
                  </span>
                  <span>
                    <b>{t}</b>
                    <small>{d}</small>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
        <div className="gx-dd__pack" aria-label="Evidence pack">
          <span className="gx-dd__packlab">
            <RC_I n="box" s={16} />
            Your evidence pack
          </span>
          <div className="gx-dd__docs">
            {GX_DD.map(([t, d, doc, ic], i) => (
              <div
                key={doc}
                className={"gx-dd__doc" + (on === i ? " is-on" : i < on ? " is-past" : "")}
                style={{
                  "--i": i,
                  "--k": i - on,
                }}
              >
                <span className="gx-dd__docic">
                  <RC_I n={ic} s={18} />
                </span>
                <b>{doc}</b>
                <i />
                <i />
                <i />
                <em>{t}</em>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const GX_REG_ORDER = ["North", "South", "East", "West", "Central", "Northeast"];
function GX_Coverage() {
  const [view, setView] = ee.useState("field");
  const [reg, setReg] = ee.useState("All");
  const [hov, setHov] = ee.useState(null);
  const [pin, setPin] = ee.useState(null);
  const [q, setQ] = ee.useState("");
  const svg = ee.useRef(null);
  const cen = gxUseCentroids(
    svg,
    GX_FIELD.map((s) => s.id),
  );
  const [ref, inView] = gxUseIn(0.15);
  const inReg = (id) => reg === "All" || gpRegOf(id) === reg;
  const maxS = Math.max(...GVP.states.map((s) => s[2]));
  const maxD = Math.max(...GX_FIELD.map((s) => s.c));
  const cur = pin || hov;
  const field = GX_FIELD.filter((s) => inReg(s.id));
  const fieldD = field.reduce((a, s) => a + s.c, 0);
  const tipF = cur && gxFieldOf(cur);
  const tipS = cur && gpShare(cur);
  const proj = (id) => GX_TRACK_STATES[id];
  const list = GX_FIELD.filter((s) => !q || (s.n + " " + s.d.join(" ")).toLowerCase().includes(q.toLowerCase()));
  return (
    <section ref={ref} className={"gx-cov" + (inView ? " is-in" : "")} id="gx-coverage" aria-labelledby="gx-cov-h">
      <div className="container">
        <GX_Head
          k="Coverage"
          id="gx-cov-h"
          t="Where we have been in the field"
          s={`Field teams in ${GX_FIELD_STATES} states & UTs and ${GX_FIELD_DISTRICTS} districts, coordinated from our New Delhi headquarters.`}
          light
        />
        <div className="gx-cov__bar">
          <div className="gx-seg" role="tablist" aria-label="Map view">
            <button
              role="tab"
              aria-selected={view === "field"}
              className={view === "field" ? "is-on" : ""}
              onClick={() => setView("field")}
            >
              <RC_I n="map" s={15} />
              Field teams
            </button>
            <button
              role="tab"
              aria-selected={view === "panel"}
              className={view === "panel" ? "is-on" : ""}
              onClick={() => setView("panel")}
            >
              <RC_I n="users" s={15} />
              Panel reach
            </button>
          </div>
          <div className="gx-pills" role="group" aria-label="Filter by region">
            {["All", ...GX_REG_ORDER].map((r) => (
              <button key={r} aria-pressed={reg === r} className={reg === r ? "is-on" : ""} onClick={() => setReg(r)}>
                {r}
              </button>
            ))}
          </div>
        </div>
        <div className="gx-cov__badges">
          <span>
            <RC_I n="check" s={14} />
            All districts — Haryana
          </span>
          <span>
            <RC_I n="check" s={14} />
            All districts — Delhi NCR
          </span>
          <span>
            <RC_I n="check" s={14} />
            20 districts — Jammu & Kashmir
          </span>
        </div>
        <div className="gx-cov__body">
          <div className="gx-cov__mapw">
            <i className="gx-cov__radar" aria-hidden="true" />
            <i className="gx-cov__scan" aria-hidden="true" />
            <svg
              ref={svg}
              viewBox={INDIA_MAP.viewBox}
              className={"gx-cov__map is-" + view}
              role="img"
              aria-label={
                view === "field"
                  ? `Map of India: field teams in ${GX_FIELD_STATES} states and union territories`
                  : "Map of India: citizen panel share by state"
              }
            >
              {INDIA_MAP.locations.map((c) => {
                const f = gxFieldOf(c.id),
                  sh = gpShare(c.id),
                  on = inReg(c.id);
                const a = view === "field" ? (f ? 0.35 + 0.65 * (f.c / maxD) : 0) : 0.18 + 0.82 * (sh / maxS);
                return (
                  <path
                    key={c.id}
                    data-id={c.id}
                    d={c.path}
                    tabIndex={0}
                    role="button"
                    aria-label={`${gpStName(c.id)}: ${f ? f.c + " districts with field teams, " : ""}${sh}% of citizen panel`}
                    className={
                      "gx-cov__st" + (f ? " is-field" : "") + (on ? "" : " is-off") + (cur === c.id ? " is-cur" : "")
                    }
                    style={{
                      "--a": a,
                      "--r": f ? GX_FIELD.indexOf(f) : 0,
                    }}
                    onMouseEnter={() => setHov(c.id)}
                    onMouseLeave={() => setHov(null)}
                    onFocus={() => setHov(c.id)}
                    onBlur={() => setHov(null)}
                    onClick={() => setPin(pin === c.id ? null : c.id)}
                  />
                );
              })}
              {view === "field" && cen.dl && (
                <g className="gx-cov__arcs" aria-hidden="true">
                  {GX_FIELD.filter((s) => s.id !== "dl" && cen[s.id] && inReg(s.id)).map((s, n) => {
                    const [x0, y0] = cen.dl,
                      [x1, y1] = cen[s.id];
                    const mx = (x0 + x1) / 2,
                      my = Math.min(y0, y1) - Math.max(40, Math.hypot(x1 - x0, y1 - y0) * 0.35);
                    const d = `M${x0},${y0} Q${mx},${my} ${x1},${y1}`;
                    return (
                      <g
                        key={s.id}
                        style={{
                          "--i": n,
                        }}
                      >
                        <path className="gx-cov__arc" d={d} pathLength="1" />
                        {!gxR() && inView && (
                          <circle r="2.6" className="gx-cov__pkt">
                            {ee.createElement("animateMotion", {
                              dur: 2.4 + (n % 5) * 0.35 + "s",
                              begin: 1 + n * 0.12 + "s",
                              repeatCount: "indefinite",
                              path: d,
                            })}
                          </circle>
                        )}
                      </g>
                    );
                  })}
                  <g className="gx-cov__hq" transform={`translate(${cen.dl[0]} ${cen.dl[1]})`}>
                    <circle r="16" className="p1" />
                    <circle r="16" className="p2" />
                    <circle r="6.5" className="c" />
                    <text x="12" y="-12">
                      HQ · New Delhi
                    </text>
                  </g>
                </g>
              )}
              {view === "field" &&
                GX_FIELD.map(
                  (s) =>
                    cen[s.id] &&
                    inReg(s.id) && (
                      <g
                        key={s.id}
                        className="gx-cov__bub"
                        transform={`translate(${cen[s.id][0]} ${cen[s.id][1]})`}
                        style={{
                          "--r": 6 + 10 * Math.sqrt(s.c / maxD),
                        }}
                        aria-hidden="true"
                      >
                        <circle r={6 + 10 * Math.sqrt(s.c / maxD)} className="ping" />
                        <circle r={6 + 10 * Math.sqrt(s.c / maxD)} />
                        <text y="3.5" textAnchor="middle">
                          {s.all ? "All" : s.c}
                        </text>
                      </g>
                    ),
                )}
            </svg>
            <div className={"gx-cov__tip" + (cur ? " is-on" : "")} aria-live="polite">
              {cur && (
                <>
                  <b>{gpStName(cur)}</b>
                  <span className="gx-cov__tipline">
                    {tipF ? (
                      <>
                        <RC_I n="map" s={13} />
                        {tipF.all ? `All ${tipF.c} districts` : `${tipF.c} district${tipF.c > 1 ? "s" : ""}`}
                        {" with field teams"}
                      </>
                    ) : (
                      <>
                        <RC_I n="globe" s={13} />
                        Online panel reach
                      </>
                    )}
                  </span>
                  {tipF && tipF.d.length > 0 && (
                    <span className="gx-chips">
                      {tipF.d.slice(0, 12).map((d) => (
                        <i key={d}>{d}</i>
                      ))}
                      {tipF.d.length > 12 && (
                        <i>
                          +{tipF.d.length - 12}
                          {" more"}
                        </i>
                      )}
                    </span>
                  )}
                  {tipF && proj(cur) != null && (
                    <span className="gx-cov__tipline">
                      <RC_I n="clipboard" s={13} />
                      {proj(cur)}
                      {" projects completed"}
                    </span>
                  )}
                  <span className="gx-cov__tipline">
                    <RC_I n="users" s={13} />
                    {tipS}
                    {"% of citizen panel \xB7 "}
                    {gxF(gxN(tipS))}
                    {" panel members"}
                  </span>
                  {pin && (
                    <button type="button" onClick={() => setPin(null)} className="gx-cov__x" aria-label="Close">
                      ×
                    </button>
                  )}
                </>
              )}
            </div>
            <small className="gx-credit">
              Map: @svg-maps/india by Victor Cazanave, CC BY 4.0. Not to scale. Jammu & Kashmir and Ladakh drawn as one
              shape.
            </small>
          </div>
          <aside
            className="gx-cov__rail"
            aria-label={
              view === "field" ? "States ranked by districts with field teams" : "States ranked by panel share"
            }
          >
            <div className="gx-cov__sum">
              <div>
                <b>
                  <GX_Num
                    key={view + reg + "a"}
                    v={view === "field" ? field.length : reg === "All" ? 36 : GVP.reg[reg].length}
                  />
                </b>
                <span>{view === "field" ? "Field states & UTs" : "States & UTs with members"}</span>
              </div>
              <div>
                <b>
                  <GX_Num
                    key={view + reg + "b"}
                    v={view === "field" ? fieldD : reg === "All" ? 100 : gpRegSum(reg)}
                    suf={view === "field" ? "" : "%"}
                  />
                </b>
                <span>{view === "field" ? "Districts with field teams" : "Of citizen panel"}</span>
              </div>
            </div>
            <h3>{view === "field" ? "Districts with field teams" : "Largest panel shares"}</h3>
            {view === "field" ? (
              <ol className="gx-race">
                {field.map((s, n) => (
                  <li
                    key={s.id}
                    style={{
                      "--w": (s.c / maxD) * 100 + "%",
                      "--i": n,
                    }}
                    onMouseEnter={() => setHov(s.id)}
                    onMouseLeave={() => setHov(null)}
                  >
                    <span>{s.n}</span>
                    <i>
                      <b />
                    </i>
                    <em>{s.all ? "All " + s.c : s.c}</em>
                  </li>
                ))}
                {field.length === 0 && (
                  <li className="gx-race__none">No field teams in this region yet — online panel reach only.</li>
                )}
              </ol>
            ) : (
              <GP_Bars
                rows={[...GVP.states]
                  .filter((s) => inReg(s[0]))
                  .sort((a, b) => b[2] - a[2])
                  .slice(0, 10)
                  .map((s) => [s[1], s[2]])}
                T={GX_T}
                max={maxS}
              />
            )}
          </aside>
        </div>
        <div className="gx-cov__list">
          <label className="gx-search">
            <RC_I n="search" s={16} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a state or district"
              aria-label="Search field coverage by state or district"
            />
          </label>
          <ul>
            {list.map((s) => (
              <li key={s.id}>
                <details>
                  <summary>
                    <b>{s.n}</b>
                    <em>{s.all ? "All " + s.c + " districts" : s.c + " district" + (s.c > 1 ? "s" : "")}</em>
                  </summary>
                  {s.d.length > 0 ? (
                    <span className="gx-chips">
                      {s.d.map((d) => (
                        <i key={d}>{d}</i>
                      ))}
                    </span>
                  ) : (
                    <span className="gx-chips">
                      <i>All districts</i>
                    </span>
                  )}
                </details>
              </li>
            ))}
            {list.length === 0 && (
              <li className="gx-race__none">No match. Our online panel still reaches all 36 states & UTs.</li>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
function GX_People({ men, women }) {
  const [ref, v] = gxUseIn(0.3);
  return (
    <div
      ref={ref}
      className={"gx-ppl" + (v ? " is-in" : "")}
      role="img"
      aria-label={`${men} in 100 members are men, ${women} are women`}
    >
      {Array.from(
        {
          length: 100,
        },
        (_, i) => (
          <svg
            key={i}
            viewBox="0 0 12 20"
            className={i < men ? "m" : "w"}
            style={{
              "--i": i,
            }}
            aria-hidden="true"
          >
            <circle cx="6" cy="3.6" r="3.2" />
            <path d="M1.2 19V11a4.8 4.8 0 0 1 9.6 0v8z" />
          </svg>
        ),
      )}
    </div>
  );
}
function GX_Pyramid() {
  const [ref, v] = gxUseIn(0.3);
  const rows = [...GVP.C.age].reverse();
  const top = Math.max(...rows.map((r) => r[1]));
  return (
    <ul ref={ref} className={"gx-pyr" + (v ? " is-in" : "")}>
      {rows.map(([l, p], i) => (
        <li
          key={l}
          style={{
            "--w": (p / top) * 100 + "%",
            "--i": i,
          }}
          className={l === "13\u201317" ? "is-minor" : ""}
        >
          <span className="gx-pyr__l">{l}</span>
          <span className="gx-pyr__bar">
            <i />
          </span>
          <span className="gx-pyr__v">
            <b>{p}%</b>
            <small>{gxF(gxN(p))}</small>
          </span>
        </li>
      ))}
    </ul>
  );
}
const GX_EDU_COL = ["#C9D3E6", "#AFC0DC", "#93A9CF", "#7A94C2", "#6380B4", "#0E7C86", "#0B6670", "#F28C28", "#C2701E"];
function GX_EduDonut() {
  const [ref, v] = gxUseIn(0.3);
  const rows = GVP.C.edu;
  let acc = 0;
  return (
    <div ref={ref} className={"gx-dn" + (v ? " is-in" : "")}>
      <div className="gx-dn__ring">
        <svg viewBox="0 0 42 42" aria-hidden="true">
          {rows.map(([l, p], i) => {
            const off = 100 - acc + 25;
            acc += p;
            return (
              <circle
                key={l}
                cx="21"
                cy="21"
                r="15.915"
                fill="none"
                stroke={GX_EDU_COL[i]}
                strokeWidth="6"
                strokeDasharray={`${p} ${100 - p}`}
                strokeDashoffset={off}
                style={{
                  "--i": i,
                }}
              />
            );
          })}
        </svg>
        <div>
          <b>{GPX.grad}%</b>
          <span>graduates+</span>
        </div>
      </div>
      <ul className="gx-dn__leg">
        {rows.map(([l, p], i) => (
          <li key={l}>
            <i
              style={{
                background: GX_EDU_COL[i],
              }}
            />
            {l}
            <b>{p}%</b>
          </li>
        ))}
      </ul>
    </div>
  );
}
function GX_Treemap() {
  const occ = (l) => gpC("occ", l);
  const groups = [
    {
      t: "Formal",
      c: "#0B1F3A",
      items: [["Full-time employee", occ("Full-time employee")]],
    },
    {
      t: "Informal",
      c: "#0E7C86",
      items: [
        ["Part-time", occ("Part-time employee")],
        ["Self-employed", occ("Self-employed / freelance")],
        ["Seasonal", occ("Occasional or seasonal work")],
      ],
    },
    {
      t: "Not in work",
      c: "#F28C28",
      items: [
        ["Student", occ("Student")],
        ["Unemployed", occ("Unemployed")],
        ["Homemaker", occ("Homemaker")],
        ["Retired", occ("Retired")],
        ["Stay-at-home parent", occ("Stay-at-home parent")],
        ["Not able to work", occ("Disabled / not able to work")],
      ],
    },
    {
      t: "Other",
      c: "#9AA6BD",
      items: [["Other", occ("Military")]],
    },
  ];
  return (
    <div className="gx-tree" role="list">
      {groups.map((g) => {
        const tot = g.items.reduce((a, r) => a + r[1], 0);
        return (
          <div
            key={g.t}
            className="gx-tree__g"
            style={{
              flexGrow: tot,
              "--c": g.c,
            }}
            role="listitem"
            aria-label={`${g.t}: ${tot}%`}
          >
            <span className="gx-tree__h">
              {g.t}
              {" \xB7 "}
              {tot}%
            </span>
            <div className={"gx-tree__in" + (g.items.length > 3 ? " gx-tree__in--2" : "")}>
              {g.items.map(([l, p]) => (
                <div
                  key={l}
                  style={{
                    flexGrow: p,
                  }}
                  title={`${l}: ${p}% \xB7 ${gxF(gxN(p))} panel members`}
                >
                  <b>{p}%</b>
                  <span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
function GX_Income() {
  const [kind, setKind] = ee.useState("hh");
  const rows = kind === "hh" ? GVP.C.hhinc : GVP.C.pinc;
  const [i, setI] = ee.useState(2);
  const k = Math.min(i, rows.length - 1);
  const cum = rows.slice(0, k + 1).reduce((a, r) => a + r[1], 0);
  const top = Math.max(...rows.map((r) => r[1]));
  return (
    <div className="gx-inc">
      <div className="gx-seg gx-seg--sm" role="tablist" aria-label="Income type">
        <button
          role="tab"
          aria-selected={kind === "hh"}
          className={kind === "hh" ? "is-on" : ""}
          onClick={() => setKind("hh")}
        >
          Household
        </button>
        <button
          role="tab"
          aria-selected={kind === "p"}
          className={kind === "p" ? "is-on" : ""}
          onClick={() => setKind("p")}
        >
          Personal
        </button>
      </div>
      <div className="gx-inc__hist" aria-hidden="true">
        {rows.map(([l, p], n) => (
          <button
            key={l}
            tabIndex={-1}
            className={(n === k ? "is-sel " : "") + (n < k ? "is-cum" : "")}
            style={{
              "--h": (p / top) * 100 + "%",
            }}
            onClick={() => setI(n)}
          >
            <i />
            <span>{l}</span>
          </button>
        ))}
      </div>
      <input
        type="range"
        min="0"
        max={rows.length - 1}
        value={k}
        onChange={(e) => setI(+e.target.value)}
        aria-label="Select income band"
        aria-valuetext={`${rows[k][0]}: ${rows[k][1]}%`}
        className="gx-range"
      />
      <p className="gx-inc__out" aria-live="polite">
        <b>{rows[k][0]}</b>
        {" \xB7 "}
        {rows[k][1]}
        {"% \xB7 "}
        <b>{gxF(gxN(rows[k][1]))}</b>
        {" panel members"}
        <br />
        <small>
          {"Up to this band: "}
          {cum}
          {"% \xB7 "}
          {gxF(gxN(cum))}
        </small>
      </p>
    </div>
  );
}
function GX_Flip({ ic, t, front, frontL, rows, chip }) {
  const [on, setOn] = ee.useState(false);
  return (
    <button
      type="button"
      className={"gx-flip" + (on ? " is-on" : "")}
      onClick={() => setOn(!on)}
      aria-pressed={on}
      aria-label={`${t}: ${front} ${frontL}. ${on ? "Showing" : "Show"} top groups.`}
    >
      <span className="gx-flip__in">
        <span className="gx-flip__f">
          <span className="gx-flip__ic">
            <RC_I n={ic} s={20} />
          </span>
          <small>{t}</small>
          <b>{front}</b>
          <span>{frontL}</span>
          <em className="gx-chip-ins">{chip}</em>
          <i className="gx-flip__hint">Tap for top groups ↻</i>
        </span>
        <span className="gx-flip__b">
          <small>
            {t}
            {" \xB7 % of panel"}
          </small>
          {rows.slice(0, 5).map(([l, p]) => (
            <span
              key={l}
              className="gx-flip__row"
              style={{
                "--w": (p / rows[0][1]) * 100 + "%",
              }}
            >
              <span>{l}</span>
              <i>
                <b />
              </i>
              <em>{p}%</em>
            </span>
          ))}
        </span>
      </span>
    </button>
  );
}
const GX_TIERS = [
  {
    t: "Local-government leadership",
    s: "% of leadership profiles",
    rows: [
      ["Mayors", gpB("leaders", "Mayor")],
      ["Deputy mayors", gpB("leaders", "Deputy Mayor")],
    ],
  },
  {
    t: "Secretariat & directorates",
    s: "% of civil-services profiles",
    rows: [
      [
        "Secretariat ranks",
        gpBs("civil", [
          "Cabinet Secretary",
          "Chief Secretary",
          "Principal Secretary",
          "Additional Chief Secretary",
          "Secretary",
          "Additional Secretary",
          "Joint Secretary",
          "Deputy Secretary",
          "Under Secretary",
          "Assistant Secretary",
        ]),
      ],
      [
        "Directorates",
        gpBs("civil", [
          "Director General",
          "Additional Director General",
          "Director",
          "Deputy Director",
          "Assistant Director",
        ]),
      ],
      [
        "Commissionerates",
        gpBs("civil", ["Commissioner", "Additional Commissioner", "Deputy Commissioner", "Assistant Commissioner"]),
      ],
    ],
  },
  {
    t: "District",
    s: "% of civil-services profiles",
    rows: [
      ["Sub-Divisional Magistrates", gpB("civil", "Sub-Divisional Magistrate")],
      ["District Collectors", gpB("civil", "District Collector")],
      ["Municipal Commissioners", gpB("civil", "Municipal Commissioner")],
      ["District Magistrates", gpB("civil", "District Magistrate")],
    ],
  },
  {
    t: "Block & tehsil",
    s: "% of civil-services profiles",
    rows: [
      ["Tehsildars", gpB("civil", "Tehsildar")],
      ["Block Development Officers", gpB("civil", "Block Development Officer")],
      ["Naib Tehsildars", gpB("civil", "Naib Tehsildar")],
    ],
  },
];
const GX_OTILES = [
  {
    t: "Legislature",
    ic: "users",
    k: "legis",
    drop: ["Senator", "Legislator"],
  },
  {
    t: "Policy & planning",
    ic: "scale",
    k: "policy",
  },
  {
    t: "Health & social welfare",
    ic: "shield",
    k: "health",
  },
  {
    t: "Education",
    ic: "award",
    k: "edu",
  },
  {
    t: "Agriculture & rural",
    ic: "compass",
    k: "agri",
  },
  {
    t: "Engineering & infrastructure",
    ic: "layers",
    k: "infra",
  },
  {
    t: "Finance & revenue",
    ic: "tag",
    k: "finrev",
  },
  {
    t: "Transport & utilities",
    ic: "rocket",
    k: "transport",
  },
  {
    t: "Public sector undertakings",
    ic: "grid",
    k: "psu",
  },
];
const GX_AUD = [
  ["General population", null],
  ["Women", ["gender", "Women"]],
  ["Students", ["occ", "Student"]],
  ["Unemployed", ["occ", "Unemployed"]],
  ["Working (any)", "working"],
  ["Households under \u20B95 lakh", "hh5"],
  ["Parents & guardians", ["family", "Parents & guardians"]],
  ["People with disabilities", ["health", "People with disabilities"]],
  ["Caregivers", ["health", "Caregivers & family caregivers"]],
  ["Online banking users", ["fin", "Online banking users"]],
  ["Fleet vehicle drivers", ["mobility", "Fleet vehicle drivers"]],
  ["Graduates and above", "grad"],
];
function GX_Builder() {
  const [aud, setAud] = ee.useState(0),
    [st, setSt] = ee.useState("all"),
    [gen, setGen] = ee.useState("All"),
    [age, setAge] = ee.useState("18+");
  const a = GX_AUD[aud][1];
  const pa = a === null ? 100 : typeof a === "string" ? GPX[a] : gpC(a[0], a[1]);
  const ps = st === "all" ? 100 : (GVP.states.find((s) => s[0] === st) || [0, 0, 0])[2];
  const genLocked = GX_AUD[aud][0] === "Women";
  const pg = genLocked || gen === "All" ? 100 : gpC("gender", gen === "Men" ? "Men" : "Women");
  const pAge = age === "All ages" ? 100 : age === "18+" ? GPX.adult : gpC("age", age);
  const val = Math.round(GX_T * (pa / 100) * (ps / 100) * (pg / 100) * (pAge / 100));
  const [shown, setShown] = ee.useState(val);
  ee.useEffect(() => {
    if (gxR()) {
      setShown(val);
      return;
    }
    let raf, t0;
    const from = shown;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 500);
      setShown(Math.round(from + (val - from) * p));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [val]);
  const states = [...GVP.states].sort((x, y) => x[1].localeCompare(y[1]));
  return (
    <div className="gx-build" id="gx-builder">
      <div className="gx-build__head">
        <RC_I n="sliders" s={20} />
        <div>
          <h3>Build your sample</h3>
          <p>Pick an audience and see the indicative panel size.</p>
        </div>
      </div>
      <div className="gx-build__grid">
        <label>
          <span>Audience</span>
          <select value={aud} onChange={(e) => setAud(+e.target.value)}>
            {GX_AUD.map(([l], n) => (
              <option key={l} value={n}>
                {l}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>State / UT</span>
          <select value={st} onChange={(e) => setSt(e.target.value)}>
            <option value="all">All India</option>
            {states.map((s) => (
              <option key={s[0]} value={s[0]}>
                {s[1]}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span>Gender</span>
          <select value={genLocked ? "Women" : gen} disabled={genLocked} onChange={(e) => setGen(e.target.value)}>
            {["All", "Men", "Women"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label>
          <span>Age band</span>
          <select value={age} onChange={(e) => setAge(e.target.value)}>
            {["18+", "18\u201329", "30\u201349", "50\u201364", "65+", "13\u201317", "All ages"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="gx-build__out" aria-live="polite">
        <b>{gxF(shown)}</b>
        <span>
          indicative panel members
          {age === "13\u201317" || age === "All ages" ? " \xB7 under-18s with parental consent only" : ""}
        </span>
      </div>
      <small className="gx-note">
        Indicative, subject to feasibility. Calculated as panel size × each selected share, assuming the shares are
        independent.
      </small>
    </div>
  );
}
function GX_Panel() {
  const [tab, setTab] = ee.useState("c");
  const G = GPX;
  const deptTop = [...GVP.B.govdept].sort((a, b) => b[1] - a[1]).filter((r) => r[1] >= 5);
  return (
    <section className="gx-pi" id="gx-panel" aria-labelledby="gx-pi-h">
      <div className="container">
        <GX_Head
          k="Panel intelligence"
          id="gx-pi-h"
          t="The people behind the numbers"
          s="Profiled panel members, not respondents surveyed. Counts are panel size × share."
        />
        <div className="gx-seg gx-seg--lg" role="tablist" aria-label="Panel">
          <button
            role="tab"
            aria-selected={tab === "c"}
            className={tab === "c" ? "is-on" : ""}
            onClick={() => setTab("c")}
          >
            <RC_I n="users" s={17} />
            Citizens (B2C)<em>{gxF(GX_T)}</em>
          </button>
          <button
            role="tab"
            aria-selected={tab === "o"}
            className={tab === "o" ? "is-on" : ""}
            onClick={() => setTab("o")}
          >
            <RC_I n="flag" s={17} />
            <span className="gp-long">{"Officials & professionals "}</span>
            <span className="gp-short">{"Officials "}</span>(B2B)<em>{gxF(GX_B)}</em>
          </button>
        </div>
        {tab === "c" ? (
          <div className="gx-bento" key="c">
            <article className="gx-b gx-b--gender">
              <h3>Gender</h3>
              <GX_People men={G.men} women={G.women} />
              <div className="gx-b__legend">
                <span className="m">
                  <b>{G.men}%</b>
                  {" Men \xB7 "}
                  {gxF(gxN(G.men))}
                </span>
                <span className="w">
                  <b>{G.women}%</b>
                  {" Women \xB7 "}
                  {gxF(gxN(G.women))}
                </span>
              </div>
              <em className="gx-chip-ins">
                {gxF(gxN(G.women))}
                {" women \u2014 enough for women-only analysis."}
              </em>
            </article>
            <article className="gx-b gx-b--age">
              <h3>Age</h3>
              <GX_Pyramid />
              <em className="gx-chip-ins">{G.adult}% are 18+; under-18s with parental consent only.</em>
            </article>
            <article className="gx-b gx-b--edu">
              <h3>Education</h3>
              <GX_EduDonut />
              <em className="gx-chip-ins">
                {gxF(gxN(G.grad))}
                {" graduates+ for expert-informed consultations."}
              </em>
            </article>
            <article className="gx-b gx-b--occ">
              <h3>Main activity</h3>
              <GX_Treemap />
              <em className="gx-chip-ins">
                Informal workers ({G.informal}%) outnumber full-time employees ({G.fulltime}%).
              </em>
            </article>
            <article className="gx-b gx-b--inc">
              <h3>Income</h3>
              <GX_Income />
              <em className="gx-chip-ins">{G.hh5}% of households earn under ₹5 lakh a year.</em>
            </article>
            <div className="gx-b gx-b--flips">
              <GX_Flip
                ic="shield"
                t="Health & inclusion"
                front={gxF(gxN(gpC("health", "People with disabilities")))}
                frontL="people with disabilities"
                chip="Reachable for accessibility and disability studies."
                rows={[
                  ...GVP.C.hdis,
                  ["Chronic conditions", gpC("health", "Patients with chronic conditions")],
                  ["Caregivers", gpC("health", "Caregivers & family caregivers")],
                ].sort((a, b) => b[1] - a[1])}
              />
              <GX_Flip
                ic="tag"
                t="Financial inclusion"
                front={gxF(gxN(gpC("fin", "Online banking users")))}
                frontL="online banking users"
                chip="Three times the digital-wallet users in the panel."
                rows={GVP.C.fin}
              />
              <GX_Flip
                ic="users"
                t="Family & parenting"
                front={gxF(gxN(gpC("family", "Parents & guardians")))}
                frontL="parents & guardians"
                chip="Maternal and child-welfare studies, by child age."
                rows={GVP.C.family}
              />
              <GX_Flip
                ic="rocket"
                t="Mobility"
                front={gxF(gxN(gpC("mobility", "Fleet vehicle drivers")))}
                frontL="fleet vehicle drivers"
                chip="Road-safety and transport research, driver's-seat view."
                rows={GVP.C.mobility}
              />
              <GX_Flip
                ic="cpu"
                t="Technology"
                front={gxF(gxN(gpC("tech", "AI tool users")))}
                frontL="AI tool users"
                chip="Digital-governance studies across device types."
                rows={GVP.C.tech}
              />
            </div>
            <div className="gx-b gx-b--build">
              <GX_Builder />
            </div>
          </div>
        ) : (
          <div className="gx-off" key="o">
            <div className="gx-off__top">
              <article className="gx-b">
                <h3>Government & defence profile</h3>
                <div
                  className="gx-stack"
                  role="img"
                  aria-label={GVP.B.govmix.map((r) => `${r[0]} ${r[1]}%`).join(", ")}
                >
                  {GVP.B.govmix.map(([l, p], i) => (
                    <span
                      key={l}
                      style={{
                        flexGrow: p,
                        "--c": ["#0B1F3A", "#0E7C86", "#F28C28", "#9AA6BD"][i],
                      }}
                    >
                      <b>{p}%</b>
                      <small>{l}</small>
                    </span>
                  ))}
                </div>
                <em className="gx-chip-ins">Civil government is three-quarters of the profile.</em>
              </article>
              <article className="gx-b">
                <h3>Largest departments</h3>
                <GP_Bars rows={deptTop} unit="pct" />
              </article>
              <article className="gx-b">
                <h3>Company size (all B2B)</h3>
                <GP_Cols rows={GVP.B.size} hi={["1\u20139", "10\u201349", "50\u201399"]} />
                <em className="gx-chip-ins">{G.sme}% work in firms under 100 staff.</em>
              </article>
            </div>
            <div className="gx-org">
              <h3>From the secretariat to the block</h3>
              <ol>
                {GX_TIERS.map((t, i) => (
                  <li
                    key={t.t}
                    style={{
                      "--i": i,
                    }}
                  >
                    <span className="gx-org__n">{i + 1}</span>
                    <div>
                      <b>{t.t}</b>
                      <small>{t.s}</small>
                      <span className="gx-org__chips">
                        {t.rows.map(([l, p]) => (
                          <i key={l}>
                            {l}
                            <em>{p}%</em>
                          </i>
                        ))}
                      </span>
                    </div>
                  </li>
                ))}
              </ol>
              <small className="gx-note">
                Percentages only: the share of the B2B panel that works in government is not published, so no counts are
                shown.
              </small>
            </div>
            <div className="gx-otiles">
              {GX_OTILES.map((x) => {
                const rows = [...GVP.B[x.k]]
                  .filter((r) => !(x.drop || []).includes(r[0]))
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 3);
                return (
                  <article key={x.t} className="gx-otile">
                    <header>
                      <RC_I n={x.ic} s={17} />
                      <h4>{x.t}</h4>
                    </header>
                    {rows.map(([l, p]) => (
                      <span
                        key={l}
                        className="gx-flip__row"
                        style={{
                          "--w": p + "%",
                        }}
                      >
                        <span>{l}</span>
                        <i>
                          <b />
                        </i>
                        <em>{p}%</em>
                      </span>
                    ))}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
const GX_PROGS = [
  {
    t: "Government & Public-Sector Surveys",
    ic: "flag",
    d: "Reliable evidence from citizens, users or stakeholders.",
    aud: ["Citizens", "Service users", "Officials"],
    m: ["CAPI", "CATI", "Online"],
  },
  {
    t: "Citizen Satisfaction Research",
    ic: "okc",
    d: "How people experience public services, end to end.",
    aud: ["Urban users", "Rural users"],
    m: ["Exit interviews", "CATI", "CAPI"],
  },
  {
    t: "Public Opinion Polls",
    ic: "pie",
    d: "Views on public issues and priorities, balanced samples.",
    aud: ["General population", "Demographic groups"],
    m: ["CATI", "Online panel", "F2F"],
  },
  {
    t: "Policy Research",
    ic: "scale",
    d: "Awareness and expected impact, before and after.",
    aud: ["Citizens", "Businesses", "Experts"],
    m: ["Quant", "IDIs", "FGDs"],
  },
  {
    t: "Government Scheme Evaluation",
    ic: "check",
    d: "Reach, delivery and outcomes against objectives.",
    aud: ["Beneficiaries", "Non-beneficiaries", "Implementers"],
    m: ["Baseline / endline", "Qualitative"],
  },
  {
    t: "Beneficiary Feedback",
    ic: "msg",
    d: "What reached people, what helped, what did not.",
    aud: ["Beneficiaries", "Households"],
    m: ["CAPI", "CATI", "Community discussions"],
  },
  {
    t: "Household & Socioeconomic Surveys",
    ic: "grid",
    d: "Income, consumption, assets and living conditions.",
    aud: ["Households by income", "Regions"],
    m: ["CAPI door-to-door", "Listing"],
  },
  {
    t: "Rural & Agricultural Research",
    ic: "compass",
    d: "Crops, inputs, credit and markets in rural India.",
    aud: ["Farmers", "Agri-workers", "Rural households"],
    m: ["F2F local language", "Group discussions"],
  },
  {
    t: "Healthcare & Public Health Research",
    ic: "shield",
    d: "Access, awareness and service quality in health.",
    aud: ["Patients", "Caregivers", "Health workers"],
    m: ["CAPI", "CATI", "HCP panel"],
  },
  {
    t: "Education & Youth Research",
    ic: "award",
    d: "Learning, access and aspirations.",
    aud: ["Students", "Parents", "Teachers"],
    m: ["School-based", "Online", "F2F"],
  },
  {
    t: "Employment & Workforce Research",
    ic: "trend",
    d: "Jobs, skills, wages and labour programmes.",
    aud: ["Workers", "Job-seekers", "MSMEs"],
    m: ["CATI", "CAPI", "Establishment"],
  },
  {
    t: "Urban Infrastructure Research",
    ic: "layers",
    d: "Transport, water, sanitation, housing and civic services.",
    aud: ["Urban residents", "Commuters"],
    m: ["Intercepts", "CAPI", "Online"],
  },
];
function GX_Tilt({ children, className }) {
  const r = ee.useRef(null);
  const move = (e) => {
    if (gxR()) return;
    const el = r.current,
      b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5,
      y = (e.clientY - b.top) / b.height - 0.5;
    el.style.transform = `perspective(800px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`;
    el.style.setProperty("--mx", (x + 0.5) * 100 + "%");
    el.style.setProperty("--my", (y + 0.5) * 100 + "%");
  };
  const out = () => {
    if (r.current) r.current.style.transform = "";
  };
  return (
    <article ref={r} className={className} onMouseMove={move} onMouseLeave={out}>
      {children}
    </article>
  );
}
function GX_Programmes() {
  const view = ee.useRef(null);
  const by = (d) => {
    const v = view.current;
    if (v)
      v.scrollBy({
        left: d * Math.min(v.clientWidth * 0.8, 680),
        behavior: gxR() ? "auto" : "smooth",
      });
  };
  return (
    <section className="gx-prog" aria-labelledby="gx-prog-h">
      <div className="container">
        <div className="gx-prog__top">
          <GX_Head k="Programmes" id="gx-prog-h" t="Research programmes we deliver" />
          <div className="gx-arrows">
            <button type="button" onClick={() => by(-1)} aria-label="Previous programmes">
              ←
            </button>
            <button type="button" onClick={() => by(1)} aria-label="Next programmes">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="gx-prog__view" ref={view} tabIndex={0} aria-label="Programme cards, scroll horizontally">
        <div className="gx-prog__track">
          {GX_PROGS.map((p, i) => (
            <GX_Tilt key={p.t} className="gx-pcard">
              <span className="gx-pcard__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="gx-pcard__ic">
                <RC_I n={p.ic} s={22} />
              </span>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
              <div className="gx-chips gx-chips--aud">
                {p.aud.map((x) => (
                  <i key={x}>{x}</i>
                ))}
              </div>
              <div className="gx-chips gx-chips--m">
                {p.m.map((x) => (
                  <i key={x}>{x}</i>
                ))}
              </div>
              <a href="#brief" onClick={gxGo("brief")} className="gx-pcard__go">
                {"Explore "}
                <span aria-hidden="true">→</span>
              </a>
            </GX_Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
const GX_FLOW = [
  "Questionnaire",
  "Sample design",
  "Recruitment",
  "Fieldwork",
  "Validation",
  "Processing",
  "Analysis",
  "Reporting",
];
const GX_POLLS = [
  "Public issues",
  "Policy perception",
  "Service satisfaction",
  "Citizen sentiment",
  "Pre / post campaign",
  "Public consultation",
  "Awareness studies",
  "Community perception",
  "Social attitudes",
];
function GX_Polls() {
  const [ref, v] = gxUseIn(0.35);
  const [n, setN] = ee.useState(1500);
  const moe = 1.96 * Math.sqrt(0.25 / n) * 100;
  const pos = (Math.log(n) - Math.log(100)) / (Math.log(2e4) - Math.log(100));
  const fromPos = (p) => Math.round(Math.exp(Math.log(100) + p * (Math.log(2e4) - Math.log(100))) / 50) * 50 || 100;
  return (
    <section ref={ref} className={"gx-polls" + (v ? " is-in" : "")} aria-labelledby="gx-polls-h">
      <div className="container">
        <GX_Head
          k="Opinion polls & public sentiment"
          id="gx-polls-h"
          t="How confident you can be in the numbers"
          center
        />
        <ol className="gx-flow">
          {GX_FLOW.map((s, i) => (
            <li
              key={s}
              style={{
                "--i": i,
              }}
            >
              <span>{i + 1}</span>
              {s}
            </li>
          ))}
        </ol>
        <div className="gx-moe">
          <div className="gx-moe__ctl">
            <label htmlFor="gx-moe-n">Sample size</label>
            <b className="gx-moe__n">{gxF(n)}</b>
            <input
              id="gx-moe-n"
              type="range"
              min="0"
              max="1000"
              value={Math.round(pos * 1e3)}
              onChange={(e) => setN(Math.max(100, fromPos(+e.target.value / 1e3)))}
              className="gx-range"
              aria-valuetext={`${gxF(n)} interviews`}
            />
            <div className="gx-moe__ticks">
              <span>100</span>
              <span>1,000</span>
              <span>20,000</span>
            </div>
          </div>
          <div className="gx-moe__gauge" aria-live="polite">
            <svg viewBox="0 0 200 110" aria-hidden="true">
              <path d="M15 100a85 85 0 0 1 170 0" className="t" />
              <path
                d="M15 100a85 85 0 0 1 170 0"
                className="v"
                style={{
                  strokeDasharray: `${Math.max(2, 267 * (1 - Math.min(moe, 10) / 10))} 300`,
                }}
              />
            </svg>
            <b>±{moe.toFixed(1)}%</b>
            <span>margin of error at 95% confidence</span>
          </div>
          <p className="gx-moe__f">
            Formula: 1.96 × √(0.25 ÷ n), for a simple random sample at 50% proportion. Design effects from clustering or
            weighting widen it.
          </p>
        </div>
        <div className="gx-cloud">
          {GX_POLLS.map((c, i) => (
            <span
              key={c}
              style={{
                "--i": i,
              }}
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
const GX_ELECT = [
  ["Voter opinion research", "users"],
  ["Issue-based public opinion", "msg"],
  ["Candidate perception", "user"],
  ["Political awareness studies", "bulb"],
  ["Voter behaviour research", "trend"],
  ["Campaign perception", "megaphone"],
  ["Constituency-level surveys", "map"],
  ["Exit / intercept surveys, where legal", "clipboard"],
  ["Post-election research", "check"],
];
function GX_Election() {
  return (
    <section className="gx-elect" aria-labelledby="gx-el-h">
      <div className="container gx-elect__in">
        <div className="gx-elect__shield">
          <svg viewBox="0 0 120 140" aria-hidden="true">
            <path d="M60 6l48 18v42c0 32-20 56-48 68C32 122 12 98 12 66V24z" />
            <path className="tk" d="M38 70l15 15 30-32" />
          </svg>
          <span className="gx-kick gx-kick--light">Election & public sentiment</span>
          <h2 id="gx-el-h">Neutral research. Nothing more, nothing less.</h2>
          <ul className="gx-elect__rules">
            <li>No outcome predictions</li>
            <li>No persuasion messaging</li>
            <li>Election Commission guidelines followed</li>
          </ul>
        </div>
        <ul className="gx-elect__tiles">
          {GX_ELECT.map(([t, ic], i) => (
            <li
              key={t}
              style={{
                "--i": i,
              }}
            >
              <RC_I n={ic} s={20} />
              <span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
const GX_APPROACH = (() => {
  const G = GPX;
  return [
    {
      t: "Citizen satisfaction study",
      type: "Public-service department",
      ch: "How do citizens rate access to and quality of public services?",
      m: "Mixed mode: CAPI + CATI",
      reach: gxF(gxN(G.adult)),
      rl: "panel members aged 18+",
      geo: ["Field teams \xB7 17 states & UTs", "Online \xB7 36 states & UTs"],
    },
    {
      t: "Scheme evaluation",
      type: "Scheme implementing agency",
      ch: "Did the scheme reach intended beneficiaries, and what changed?",
      m: "Baseline / endline household CAPI + qualitative",
      reach: gxF(gxN(G.hh5)),
      rl: "panel members in households under \u20B95 lakh",
      geo: ["149 districts with field teams"],
    },
    {
      t: "Healthcare access study",
      type: "Health department",
      ch: "What stops people reaching primary care?",
      m: "CAPI + health-worker interviews",
      reach: gxF(gxN(gpC("health", "People with disabilities"))),
      rl: "panel members with disabilities",
      geo: ["Urban + rural districts"],
    },
    {
      t: "Education research",
      type: "Education department",
      ch: "What are learning conditions and parent expectations?",
      m: "School-based survey + parent CATI",
      reach: gxF(gxN(gpC("family", "Parents of school-age children (6\u201312)"))),
      rl: "parents of 6\u201312-year-olds",
      geo: ["Under-18s with parental consent"],
    },
    {
      t: "Farmer study",
      type: "Agriculture department",
      ch: "How do farmers use inputs, credit and markets?",
      m: "F2F in local languages",
      reach: gpB("agrigov", "Agriculture Extension Officer") + "%",
      rl: "of agri public-sector roles are extension officers",
      geo: ["Village-level fieldwork"],
    },
    {
      t: "Employment research",
      type: "Skills & labour programme",
      ch: "What do young workers earn, and how do they look for jobs?",
      m: "CATI + online",
      reach: gxF(gxN(G.informal)),
      rl: "part-time, self-employed or seasonal panel members",
      geo: ["Online \xB7 36 states & UTs"],
    },
    {
      t: "Public opinion poll",
      type: "Policy institution",
      ch: "Where does the public stand on priority civic issues?",
      m: "CATI + online panel, weighted",
      reach: gxF(gxN(G.adult)),
      rl: "panel members aged 18+",
      geo: ["Quotas by region, age, gender"],
    },
    {
      t: "Digital services study",
      type: "e-Governance programme",
      ch: "Who knows about and uses online public services?",
      m: "Online + CAPI for offline users",
      reach: gxF(gxN(gpC("fin", "Online banking users"))),
      rl: "online banking users",
      geo: ["Digital and offline citizens"],
    },
  ];
})();
function GX_Cases() {
  const pub = gxCases();
  const real = pub.length > 0;
  const view = ee.useRef(null);
  const by = (d) => {
    const v = view.current;
    if (v)
      v.scrollBy({
        left: d * Math.min(v.clientWidth * 0.8, 720),
        behavior: gxR() ? "auto" : "smooth",
      });
  };
  return (
    <section className="gx-cases" aria-labelledby="gx-cases-h">
      <div className="container">
        <div className="gx-prog__top">
          <GX_Head
            k={real ? "Case studies" : "Approach examples"}
            id="gx-cases-h"
            t={real ? "Government work, in the field" : "How we would approach it"}
            s={
              real
                ? `${pub.length} published government case studies across ${gxCountries(pub)} countries. Clients are kept confidential.`
                : "Approach examples, not completed projects. Reach figures are panel members."
            }
          />
          <div className="gx-arrows">
            <button type="button" onClick={() => by(-1)} aria-label="Previous">
              ←
            </button>
            <button type="button" onClick={() => by(1)} aria-label="Next">
              →
            </button>
          </div>
        </div>
      </div>
      <div className="gx-cases__view" ref={view} tabIndex={0} aria-label="Cards, scroll horizontally">
        <div className="gx-cases__track">
          {real &&
            pub.map((c) => (
              <article key={c.slug} className="gx-case gx-case--real">
                <div className="gx-case__top">
                  <span className="gx-case__badge">{c.client}</span>
                  <span className="gx-case__lab">Case study</span>
                </div>
                <h3>
                  <HmLink to={`${GX_CASE_URL}/${c.slug}`}>{c.title}</HmLink>
                </h3>
                <div className="gx-case__kpi">
                  <b>{c.scope}</b>
                  {c.timeline && (
                    <span>
                      <RC_I n="clock" s={13} />
                      {c.timeline}
                    </span>
                  )}
                </div>
                <ol className="gx-case__steps">
                  <li>
                    <span>Challenge</span>
                    {gxFirst(c.challenge)}
                  </li>
                  <li>
                    <span>Method</span>
                    {(c.methods || []).join(" \xB7 ") || gxFirst(c.approach)}
                  </li>
                  <li>
                    <span>Outcome</span>
                    {gxFirst(c.outcome)}
                  </li>
                </ol>
                <div className="gx-chips">
                  <i>
                    <RC_I n="map" s={12} />
                    {c.region}
                  </i>
                  {(c.services || []).slice(0, 2).map((x) => (
                    <i key={x}>{x}</i>
                  ))}
                </div>
                <HmLink to={`${GX_CASE_URL}/${c.slug}`} className="gx-pcard__go gx-case__go">
                  {"Read the case study "}
                  <span aria-hidden="true">→</span>
                </HmLink>
              </article>
            ))}
          {!real &&
            GX_APPROACH.map((c) => (
              <article key={c.t} className="gx-case">
                <div className="gx-case__top">
                  <span className="gx-case__badge">{c.type}</span>
                  <span className="gx-case__lab">Approach example</span>
                </div>
                <h3>{c.t}</h3>
                <ol className="gx-case__steps">
                  <li>
                    <span>Challenge</span>
                    {c.ch}
                  </li>
                  <li>
                    <span>Method</span>
                    {c.m}
                  </li>
                  <li>
                    <span>Reach</span>
                    <b className="gx-case__big">{c.reach}</b>
                    {c.rl}
                  </li>
                </ol>
                <div className="gx-chips">
                  {c.geo.map((g) => (
                    <i key={g}>
                      <RC_I n="map" s={12} />
                      {g}
                    </i>
                  ))}
                </div>
              </article>
            ))}
          {real && (
            <HmLink to={GX_CASE_URL} className="gx-case gx-case--all">
              <span className="gx-case__badge">All government case studies</span>
              <b className="gx-case__allnum">{pub.length}</b>
              <h3>See every government case study</h3>
              <span className="gx-pcard__go">
                {"Go to Industries & Case Studies "}
                <span aria-hidden="true">→</span>
              </span>
            </HmLink>
          )}
          <HmLink to="/government-opinion-research/case-study" className="gx-case gx-case--flag">
            <span className="gx-case__badge">Flagship long read</span>
            <h3>Executing large-scale government & public opinion research</h3>
            <p>From sample design to decision-ready insights.</p>
            <span className="gx-pcard__go">
              {"Read the case study "}
              <span aria-hidden="true">→</span>
            </span>
          </HmLink>
        </div>
      </div>
      {real && (
        <div className="container gx-cases__cta">
          <HmLink to={GX_CASE_URL} className="btn btn--lg gx-btn-navy">
            <RC_I n="file" s={18} />
            {"View all "}
            {pub.length}
            {" government case studies "}
            <span aria-hidden="true">→</span>
          </HmLink>
        </div>
      )}
    </section>
  );
}
const GX_METH = [
  ["Discover", "Objectives and the target population.", "target"],
  ["Design", "Sampling and questionnaire strategy.", "compass"],
  ["Recruit", "Reach respondents through the right channels.", "users"],
  ["Field", "Interviews in the right mode and language.", "map"],
  ["Validate", "Layered quality-control checks.", "shield"],
  ["Analyze", "Raw responses into structured findings.", "bars"],
  ["Report", "Decision-ready findings.", "file"],
  ["Visualize", "Dashboards, charts and maps.", "pie"],
];
function GX_Method() {
  const [on, setOn] = ee.useState(0);
  const refs = ee.useRef([]);
  ee.useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) setOn(+e.target.dataset.i);
        }),
      {
        rootMargin: "-45% 0px -45% 0px",
      },
    );
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const m = GX_METH[on];
  return (
    <section className="gx-meth" aria-labelledby="gx-meth-h">
      <div className="container gx-meth__in">
        <div className="gx-meth__stick">
          <GX_Head k="Methodology" id="gx-meth-h" t="Eight steps, one accountable team" />
          <div className="gx-meth__art" aria-hidden="true">
            <svg viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="86" className="r" />
              <circle
                cx="100"
                cy="100"
                r="86"
                className="p"
                style={{
                  strokeDasharray: `${((on + 1) / 8) * 540} 540`,
                }}
              />
            </svg>
            <div className="gx-meth__ic" key={on}>
              <RC_I n={m[2]} s={44} />
              <b>{String(on + 1).padStart(2, "0")}</b>
              <span>{m[0]}</span>
            </div>
          </div>
        </div>
        <ol className="gx-meth__steps">
          {GX_METH.map(([t, d, ic], i) => (
            <li
              key={t}
              ref={(el) => (refs.current[i] = el)}
              data-i={i}
              className={i === on ? "is-on" : i < on ? "is-done" : ""}
            >
              <span className="gx-meth__n">{i + 1}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
const GX_QC = [
  {
    t: "At recruitment",
    ic: "user",
    c: "#0E7C86",
    items: [
      ["Respondent verification", "Contact and profile checks confirm identity."],
      ["Duplicate detection", "Identity, contact and technical signals."],
      ["Device fingerprinting", "Repeat devices flagged online, where lawful."],
    ],
  },
  {
    t: "During fieldwork",
    ic: "map",
    c: "#F28C28",
    items: [
      ["GPS validation", "Interview location matches the sampled area."],
      ["Audio validation", "Short snippets, only where permitted and consented."],
      ["Call monitoring", "Supervisors listen live or from recordings."],
      ["Speeding detection", "Implausibly fast interviews removed."],
      ["Straight-lining detection", "Same-answer grids flagged."],
      ["Attention checks", "In-survey checks that people are reading."],
      ["Quota monitoring", "Daily tracking so gaps close in time."],
      ["Sample balancing", "Achieved sample kept in line with design."],
    ],
  },
  {
    t: "After collection",
    ic: "check",
    c: "#2E9E5B",
    items: [
      ["Interview back-checks", "A share of respondents re-contacted."],
      ["Open-end review", "Verbatims read for relevance and copying."],
      ["Data cleaning", "Documented rules for every dataset."],
      ["Outlier detection", "Extreme values reviewed, not silently deleted."],
      ["Statistical validation", "Benchmarks and internal consistency."],
      ["Weighting", "Sample aligned to population profiles."],
    ],
  },
];
function GX_Quality() {
  const total = GX_QC.reduce((a, g) => a + g.items.length, 0);
  return (
    <section className="gx-qc" id="gx-qc" aria-labelledby="gx-qc-h">
      <div className="container">
        <GX_Head k="Quality control" id="gx-qc-h" t={`${total} checks before a number reaches you`} center />
        <div className="gx-qc__flow" aria-hidden="true">
          <span>Responses in</span>
          <div className="gx-qc__pipe">
            {Array.from(
              {
                length: 14,
              },
              (_, i) => (
                <i
                  key={i}
                  style={{
                    "--i": i,
                  }}
                />
              ),
            )}
          </div>
          <span>Clean data out</span>
        </div>
        <div className="gx-qc__layers">
          {GX_QC.map((g, n) => (
            <div
              key={g.t}
              className="gx-qc__layer"
              style={{
                "--c": g.c,
                "--n": n,
              }}
            >
              <header>
                <span>
                  <RC_I n={g.ic} s={18} />
                </span>
                <h3>{g.t}</h3>
                <em>{g.items.length}</em>
              </header>
              <ul>
                {g.items.map(([t, d]) => (
                  <li key={t} tabIndex={0}>
                    <RC_I n="check" s={13} />
                    {t}
                    <span className="gx-tip" role="tooltip">
                      {d}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const GX_PIPE = [
  "Raw data",
  "Cleaning",
  "Validation",
  "Weighting",
  "Analysis",
  "Segmentation",
  "Visualization",
  "Insights",
];
function GX_Outputs() {
  const [ref, v] = gxUseIn(0.25);
  const heat = [
    ["North", [62, 48, 71]],
    ["South", [58, 66, 54]],
    ["East", [44, 52, 49]],
    ["West", [69, 57, 63]],
  ];
  const funnel = [
    ["Aware", 100],
    ["Understood", 74],
    ["Applied", 46],
    ["Received", 31],
  ];
  const trend = [38, 42, 41, 47, 52, 55, 59];
  return (
    <section ref={ref} className={"gx-out" + (v ? " is-in" : "")} aria-labelledby="gx-out-h">
      <div className="container">
        <GX_Head k="From responses to evidence" id="gx-out-h" t="What you receive" light />
        <ol className="gx-pipe">
          {GX_PIPE.map((s, i) => (
            <li
              key={s}
              style={{
                "--i": i,
              }}
            >
              {s}
            </li>
          ))}
        </ol>
        <div
          className="gx-dash"
          role="img"
          aria-label="Dashboard with sample data: cross-tab heatmap, regional comparison, satisfaction gauge, awareness funnel and sentiment trend."
        >
          {null}
          <div className="gx-dash__c gx-dash__heat">
            <h4>Cross-tab heatmap</h4>
            <table aria-hidden="true">
              <thead>
                <tr>
                  <th />
                  <th>Access</th>
                  <th>Speed</th>
                  <th>Fairness</th>
                </tr>
              </thead>
              <tbody>
                {heat.map(([r, vals]) => (
                  <tr key={r}>
                    <th>{r}</th>
                    {vals.map((x, i) => (
                      <td
                        key={i}
                        style={{
                          "--a": (x - 40) / 35,
                        }}
                      >
                        {x}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="gx-dash__c">
            <h4>Regional comparison</h4>
            <div className="gx-dash__bars">
              {heat.map(([r, vals], i) => (
                <span
                  key={r}
                  style={{
                    "--h": vals[0] + "%",
                    "--i": i,
                  }}
                >
                  <i />
                  <small>{r}</small>
                </span>
              ))}
            </div>
          </div>
          <div className="gx-dash__c gx-dash__gauge">
            <h4>Satisfaction</h4>
            <svg viewBox="0 0 120 70">
              <path d="M10 62a50 50 0 0 1 100 0" className="t" />
              <path d="M10 62a50 50 0 0 1 100 0" className="v" />
            </svg>
            <b>64</b>
            <small>index</small>
          </div>
          <div className="gx-dash__c">
            <h4>Awareness funnel</h4>
            <ul className="gx-dash__fun">
              {funnel.map(([l, p], i) => (
                <li
                  key={l}
                  style={{
                    "--w": p + "%",
                    "--i": i,
                  }}
                >
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="gx-dash__c gx-dash__trend">
            <h4>Sentiment trend</h4>
            <svg viewBox="0 0 140 60" preserveAspectRatio="none">
              <polyline points={trend.map((y, i) => `${i * 23},${60 - y}`).join(" ")} />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
const GX_AUDS = [
  ["General population", "Mixed-mode samples with quotas.", "users"],
  ["Households", "Door-to-door CAPI with listing.", "grid"],
  ["Farmers", "Village F2F in local languages.", "compass"],
  ["Students", "Online and institutional, with consent.", "award"],
  ["Workers", "Worksite intercepts and CATI.", "trend"],
  ["Consumers", "Own panels plus F2F offline.", "tag"],
  ["Business owners", "CATI and online, verified contacts.", "box"],
  ["SMEs", "Establishment surveys with owners.", "layers"],
  ["Healthcare professionals", "Verified HCP panel.", "shield"],
  ["Teachers", "School-based, with permissions.", "file"],
  ["Parents", "Household and school-linked.", "user"],
  ["Senior citizens", "Phone and in-person, accessible.", "okc"],
  ["Young adults", "Mobile-first online.", "rocket"],
  ["Urban professionals", "Panels and CATI after hours.", "cpu"],
  ["Rural communities", "Local field teams, community entry.", "map"],
  ["Public-service users", "Exit interviews at service points.", "flag"],
];
function GX_Orbit() {
  const [on, setOn] = ee.useState(0);
  const a = GX_AUDS[on];
  return (
    <section className="gx-orb" aria-labelledby="gx-orb-h">
      <div className="container gx-orb__in">
        <GX_Head
          k="Audiences"
          id="gx-orb-h"
          t={`${GX_AUDS.length} audiences, one field operation`}
          s="Hover or tap an audience to see how we reach them."
        />
        <div className="gx-orb__ring">
          <div className="gx-orb__core" aria-live="polite">
            <RC_I n={a[2]} s={30} />
            <b>{a[0]}</b>
            <span>{a[1]}</span>
          </div>
          <ul>
            {GX_AUDS.map(([t, d, ic], i) => (
              <li
                key={t}
                style={{
                  left: 50 + 44 * Math.sin((i / GX_AUDS.length) * 2 * Math.PI) + "%",
                  top: 50 - 44 * Math.cos((i / GX_AUDS.length) * 2 * Math.PI) + "%",
                }}
              >
                <button
                  type="button"
                  className={i === on ? "is-on" : ""}
                  onMouseEnter={() => setOn(i)}
                  onFocus={() => setOn(i)}
                  onClick={() => setOn(i)}
                  aria-label={`${t}: ${d}`}
                >
                  <RC_I n={ic} s={18} />
                  <span>{t}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
function GX_Tech() {
  return (
    <section className="gx-tech" aria-labelledby="gx-tech-h">
      <div className="container">
        <GX_Head k="Technology" id="gx-tech-h" t="The kit behind the fieldwork" />
        <div className="gx-devs">
          <figure className="gx-dev gx-dev--tab" aria-label="CAPI on tablets with GPS stamps">
            <div className="gx-dev__scr">
              <span className="gx-dev__gps">
                <RC_I n="map" s={12} />
                GPS 28.61°N 77.21°E · 10:42
              </span>
              <span className="gx-dev__q">Q12. How satisfied are you with…</span>
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className={"gx-dev__opt" + (i === 2 ? " is-pick" : "")} />
              ))}
              <span className="gx-dev__sync">Saved offline · syncing</span>
            </div>
            <figcaption>
              <b>CAPI on tablets</b>Offline capture, GPS and time stamps
            </figcaption>
          </figure>
          <figure className="gx-dev gx-dev--cati" aria-label="CATI centre">
            <div className="gx-dev__scr">
              <svg viewBox="0 0 64 64" className="gx-dev__hs" aria-hidden="true">
                <path d="M12 36v-6a20 20 0 0 1 40 0v6" />
                <rect x="8" y="34" width="10" height="16" rx="4" />
                <rect x="46" y="34" width="10" height="16" rx="4" />
                <path d="M51 50c0 6-6 8-14 8" />
              </svg>
              <span className="gx-dev__wave">
                {Array.from(
                  {
                    length: 16,
                  },
                  (_, i) => (
                    <i
                      key={i}
                      style={{
                        "--i": i,
                      }}
                    />
                  ),
                )}
              </span>
              <span className="gx-dev__live">● Supervisor monitoring</span>
            </div>
            <figcaption>
              <b>CATI centre</b>Monitoring and call scheduling
            </figcaption>
          </figure>
          <figure className="gx-dev gx-dev--lap" aria-label="Live fieldwork dashboard">
            <div className="gx-dev__scr">
              <span className="gx-dev__ttl">Fieldwork today</span>
              <span className="gx-dev__bars">
                {[62, 80, 45, 92, 70, 55].map((h, i) => (
                  <i
                    key={i}
                    style={{
                      "--h": h + "%",
                      "--i": i,
                    }}
                  />
                ))}
              </span>
              <span className="gx-dev__flag">2 quality flags</span>
            </div>
            <figcaption>
              <b>Live dashboards</b>Progress, quotas, quality flags
            </figcaption>
          </figure>
          <figure className="gx-dev gx-dev--sx" aria-label="Sampledge console">
            <div className="gx-dev__scr">
              <span className="gx-dev__ttl">Sampledge · quotas</span>
              {[
                ["Women 18\u201329", 78],
                ["Men 30\u201349", 64],
                ["Rural households", 52],
                ["65+", 35],
              ].map(([l, p], i) => (
                <span
                  key={l}
                  className="gx-dev__quota"
                  style={{
                    "--w": p + "%",
                    "--i": i,
                  }}
                >
                  <small>{l}</small>
                  <i />
                </span>
              ))}
            </div>
            <figcaption>
              <b>Sampledge</b>Our project, quota and sample-source platform
            </figcaption>
          </figure>
        </div>
        {null}
      </div>
    </section>
  );
}
const GX_INTEG = [
  ["Confidentiality", "lock"],
  ["Data protection", "shield"],
  ["Respondent privacy", "eyeoff"],
  ["Transparency", "file"],
  ["Quality control", "check"],
  ["Documentation", "clipboard"],
  ["Secure handling", "database"],
  ["Experienced operations", "users"],
  ["Project management", "clock"],
];
const GX_WHY = [
  "Urban and rural coverage with mixed-mode designs",
  "Complex quotas and hard-to-reach samples",
  "Documented methods, weighting and quality outcomes",
  "Secure, confidential data handling",
  "Rapid deployment with honest feasibility",
];
function GX_Integrity() {
  const [ref, v] = gxUseIn(0.3);
  return (
    <section ref={ref} className={"gx-int" + (v ? " is-in" : "")} aria-labelledby="gx-int-h">
      <div className="container gx-int__in">
        <div>
          <GX_Head k="Research integrity" id="gx-int-h" t="Built to hold up to scrutiny" />
          <ul className="gx-hex">
            {GX_INTEG.map(([t, ic], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={ic === "lock" ? "shield" : ic} s={20} />
                  <b>{t}</b>
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="gx-why">
          <h3>Why Frequent Research</h3>
          <ul>
            {GX_WHY.map((t, i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="11" />
                  <path d="M7 12.5l3.2 3L17 9" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <div className="gx-why__badges">
            <TrustBadges withEsomar />
          </div>
        </div>
      </div>
    </section>
  );
}
const GX_FAQ_CAT = ["All", "Coverage", "Methods", "Quality", "Data & privacy", "Commercials"];
const GX_FAQ = [
  [
    "Coverage",
    "Can Frequent Research conduct government surveys?",
    "Yes \u2014 for public-sector bodies, consulting firms, NGOs and research agencies. We cover design, sampling, fieldwork, quality control, processing and reporting.",
  ],
  [
    "Coverage",
    "Can you conduct large-scale citizen surveys?",
    "Yes. A clear sampling frame, regional field teams, daily quota tracking and layered checks. You get a realistic timeline and team plan with the proposal.",
  ],
  [
    "Coverage",
    "Can you conduct opinion polls across India?",
    "Yes, by CATI, online panel and face-to-face, with quotas and weighting. Coverage is confirmed at feasibility stage.",
  ],
  [
    "Coverage",
    "What geographies can you cover?",
    `Field teams in ${GX_FIELD_STATES} states & UTs and ${GX_FIELD_DISTRICTS} districts \u2014 every district in Haryana and Delhi NCR. Our online panel reaches all 36 states & UTs.`,
  ],
  [
    "Coverage",
    "Can you conduct rural and urban surveys?",
    "Yes. Rural work uses local-language interviewers and village-level sampling; urban work combines door-to-door, intercepts, CATI and online.",
  ],
  [
    "Coverage",
    "Can you recruit hard-to-reach respondents?",
    "Yes, through targeted screening, community networks, our own panels and longer field windows. We say upfront if a quota looks unrealistic.",
  ],
  [
    "Methods",
    "What survey methodologies do you support?",
    "CAWI, CATI, CAPI, paper F2F where needed, mixed mode, in-depth interviews and focus groups.",
  ],
  [
    "Methods",
    "Can you conduct CATI surveys?",
    "Yes \u2014 scripted questionnaires, supervisor monitoring, call-back scheduling and quota control.",
  ],
  [
    "Methods",
    "Can you conduct face-to-face interviews?",
    "Yes \u2014 households, intercepts, institutions and community locations, with trained interviewers and supervisors.",
  ],
  [
    "Methods",
    "Can you conduct CAPI surveys?",
    "Yes. Tablets or phones with offline capture, routing, time stamps and GPS validation where applicable.",
  ],
  [
    "Methods",
    "Can you support multilingual questionnaires?",
    "Yes. Professional translation with back-checks, and interviewers briefed in the language they use.",
  ],
  [
    "Methods",
    "Can you conduct government scheme evaluations?",
    "Yes \u2014 baseline, mid-line and endline, beneficiary vs non-beneficiary comparisons, and qualitative work with implementers.",
  ],
  [
    "Methods",
    "Can you conduct beneficiary satisfaction surveys?",
    "Yes. Awareness, access, delivery and satisfaction, usually by CAPI or CATI.",
  ],
  [
    "Methods",
    "Can you conduct public opinion research?",
    "Yes, with neutral questionnaires and documented methods. No political positions, no persuasion messaging.",
  ],
  [
    "Quality",
    "How do you validate respondents?",
    "Contact verification, screening, profile consistency, back-checks on a share of interviews and technical checks online.",
  ],
  [
    "Quality",
    "How do you prevent duplicate responses?",
    "Identity and contact matching, device and technical signals online, and listing controls in household fieldwork.",
  ],
  [
    "Data & privacy",
    "Can you provide raw survey data?",
    "Yes \u2014 cleaned respondent-level data in SPSS, Excel or CSV with a codebook, within the study's consent and anonymisation terms.",
  ],
  [
    "Data & privacy",
    "Can you provide dashboards and analysis?",
    "Yes \u2014 cross-tabs, statistical analysis, geographic comparisons, interactive dashboards and presentation-ready reports.",
  ],
  [
    "Commercials",
    "What is the typical project timeline?",
    "Phone or online studies: two to four weeks. Large multi-state household surveys: usually two to four months. Confirmed at proposal stage.",
  ],
  [
    "Commercials",
    "How can I request a proposal?",
    "Use the research brief on this page, or the email button below it. Share objectives, population, geography, sample size and timeline.",
  ],
];
function GX_Faq() {
  const [cat, setCat] = ee.useState("All");
  const [q, setQ] = ee.useState("");
  const [open, setOpen] = ee.useState(3);
  const list = GX_FAQ.map((f, i) => [...f, i]).filter(
    ([c, qq, a]) => (cat === "All" || c === cat) && (!q || (qq + " " + a).toLowerCase().includes(q.toLowerCase())),
  );
  return (
    <section className="gx-faq" aria-labelledby="gx-faq-h">
      <div className="container gx-faq__in">
        <div>
          <GX_Head k="FAQs" id="gx-faq-h" t="Questions procurement teams ask" />
          <label className="gx-search">
            <RC_I n="search" s={16} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search questions"
              aria-label="Search FAQs"
            />
          </label>
          <div className="gx-pills gx-pills--wrap" role="group" aria-label="FAQ category">
            {GX_FAQ_CAT.map((c) => (
              <button key={c} aria-pressed={cat === c} className={cat === c ? "is-on" : ""} onClick={() => setCat(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <ul className="gx-acc">
          {list.map(([c, qq, a, i]) => (
            <li key={i} className={open === i ? "is-open" : ""}>
              <button type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{qq}</span>
                <i aria-hidden="true" />
              </button>
              <div className="gx-acc__a" hidden={open !== i}>
                <p>{a}</p>
                <small>{c}</small>
              </div>
            </li>
          ))}
          {list.length === 0 && (
            <li className="gx-race__none">No question matches. Ask us directly in the brief below.</li>
          )}
        </ul>
      </div>
    </section>
  );
}
const GX_ORG = ["Central ministry", "State department", "PSU", "Development agency", "NGO", "Consultancy", "Other"];
const GX_MODES = ["CAPI", "CATI", "Online", "F2F", "Mixed"];
const GX_LANGS = [
  "Hindi",
  "English",
  "Bengali",
  "Marathi",
  "Telugu",
  "Tamil",
  "Gujarati",
  "Kannada",
  "Odia",
  "Punjabi",
  "Urdu",
  "Kashmiri",
  "Other",
];
const GX_BUDGET = [
  "Under \u20B95 lakh",
  "\u20B95\u201320 lakh",
  "\u20B920\u201350 lakh",
  "\u20B950 lakh+",
  "Prefer not to say",
];
function GX_Brief() {
  const uid = ee.useMemo(fmNextUid, []);
  const types = [...GX_AREAS.map((a) => a.t), "Election & public sentiment research", "Other"];
  const rules = {
    rtype: FMV.pick("a research type"),
    geo: FMV.pick("at least one geography"),
    audience: FMV.text(3, 160, "Target audience"),
    mode: FMV.pick("a mode"),
    name: FMV.name,
    title: FMV.title,
    otype: FMV.pick("an organisation type"),
    org: FMV.org,
    email: FMV.email,
    phone: FMV.phone,
    consent: FMV.consent,
  };
  const blank = {
    rtype: "",
    geo: [],
    states: [],
    audience: "",
    sample: 2e3,
    mode: [],
    langs: [],
    timeline: "",
    budget: "",
    requirements: "",
    name: "",
    title: "",
    otype: "",
    org: "",
    email: "",
    phone: {
      country: "IN",
      number: "",
      otherCode: "",
    },
    consent: false,
    website: "",
  };
  const f = fmUse(blank, rules);
  f.uid = uid;
  const [step, setStep] = ee.useState(0),
    [st, setSt] = ee.useState("idle"),
    [msg, setMsg] = ee.useState(""),
    [shake, setShake] = ee.useState(0);
  const STEPS = [
    {
      t: "Study",
      keys: ["rtype", "geo"],
    },
    {
      t: "Scope",
      keys: ["audience", "mode"],
    },
    {
      t: "Contact",
      keys: ["name", "title", "otype", "org", "email", "phone", "consent"],
    },
  ];
  const next = () => {
    const bad = f.check(STEPS[step].keys);
    if (bad.length) {
      setShake((x) => x + 1);
      return;
    }
    setStep((s) => Math.min(2, s + 1));
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return;
    if (step < 2) {
      next();
      return;
    }
    for (let n = 0; n < 3; n++) {
      if (f.check(STEPS[n].keys).length) {
        setStep(n);
        setShake((x) => x + 1);
        return;
      }
    }
    setSt("sending");
    const r = await fmPost("/api/v1/enquiry", {
      type: "Government & Opinion Research Brief",
      name: f.v.name.trim(),
      email: f.v.email.trim(),
      company: f.v.org.trim(),
      countryCode: phoneDialCode(f.v.phone),
      phone: f.v.phone.number,
      service: `Research type: ${f.v.rtype}`,
      timeline: f.v.timeline,
      message: f.v.requirements.trim() || "(no additional notes)",
      extra: {
        Designation: f.v.title.trim(),
        "Organisation type": f.v.otype,
        Geography: f.v.geo.join(", "),
        States: f.v.states.join(", "),
        "Target audience": f.v.audience.trim(),
        "Sample size": String(f.v.sample),
        Mode: f.v.mode.join(", "),
        Languages: f.v.langs.join(", "),
        Budget: f.v.budget,
      },
      website: f.v.website,
      page: window.location.href,
    });
    if (r.ok) {
      setSt("sent");
      setMsg("");
    } else if (r.preview) {
      setSt("sent");
      setMsg(FM_PREVIEW_NOTE);
    } else {
      setSt("failed");
      setMsg(r.error);
    }
  };
  const done = STEPS[step].keys.filter((k) => !f.err(k)).length / STEPS[step].keys.length;
  const progress = st === "sent" ? 100 : ((step + done) / 3) * 100;
  const C = 2 * Math.PI * 22;
  return (
    <section className="gx-brief" id="brief" aria-labelledby="gx-brief-h">
      <div className="container gx-brief__in">
        <div className="gx-brief__side">
          <GX_Head
            k="Proposal brief"
            id="gx-brief-h"
            t="Have a public-sector research requirement?"
            s="Three short steps. A research lead replies with a recommended approach."
          />
          <ul className="gx-promise">
            <li>
              <RC_I n="clock" s={16} />
              Reply within one working day
            </li>
            <li>
              <RC_I n="check" s={16} />
              Feasibility before you commit
            </li>
            <li>
              <RC_I n="shield" s={16} />
              Confidential handling
            </li>
          </ul>
          <a
            className="btn gx-mail"
            href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Government research requirement")}`}
          >
            <RC_I n="msg" s={16} />
            Email the research team
          </a>
        </div>
        <div
          className="fm gx-fm"
          style={{
            "--c": "#0E7C86",
            "--lt": "#F28C28",
          }}
        >
          <div className="gx-fm__top">
            <svg viewBox="0 0 52 52" className="gx-ring" aria-hidden="true">
              <circle cx="26" cy="26" r="22" className="t" />
              <circle
                cx="26"
                cy="26"
                r="22"
                className="v"
                style={{
                  strokeDasharray: `${(progress / 100) * C} ${C}`,
                }}
              />
            </svg>
            <span className="gx-fm__pct" aria-hidden="true">
              {Math.round(progress)}%
            </span>
            <div>
              <b>Your research brief</b>
              <small>
                {"Step "}
                {Math.min(step + 1, 3)}
                {" of 3 \xB7 "}
                {STEPS[step].t}
              </small>
            </div>
          </div>
          {st === "sent" ? (
            <FM_Success
              title="Thank you. Your research brief has been sent."
              onAgain={() => {
                f.reset(blank);
                setStep(0);
                setSt("idle");
              }}
              again="Send another brief"
            >
              {msg && <p className="fm-preview">{msg}</p>}
              <ol className="fm-next">
                <li>
                  <RC_I n="check" s={14} />A research lead reviews your brief.
                </li>
                <li>
                  <RC_I n="map" s={14} />
                  We check sampling and fieldwork feasibility.
                </li>
                <li>
                  <RC_I n="file" s={14} />
                  You receive a recommended approach.
                </li>
              </ol>
            </FM_Success>
          ) : (
            <form className="fm-form" onSubmit={submit} noValidate>
              <ol className="fm-steps">
                {STEPS.map((s, n) => (
                  <li key={s.t} className={(n === step ? "is-on " : "") + (n < step ? "is-done" : "")}>
                    <button
                      type="button"
                      onClick={() => {
                        if (n < step) setStep(n);
                        else if (n === step + 1) next();
                      }}
                    >
                      <span>
                        {n < step ? (
                          <svg viewBox="0 0 16 16">
                            <path d="M3 8.5l3.2 3L13 4.5" />
                          </svg>
                        ) : (
                          n + 1
                        )}
                      </span>
                      {s.t}
                    </button>
                  </li>
                ))}
              </ol>
              <div className="fm-pane" key={step + "-" + shake} data-shake={shake > 0 ? "1" : undefined}>
                {step === 0 && (
                  <>
                    <FM_Select f={f} k="rtype" label="Research type" icon="clipboard" options={types} req full />
                    <FM_Chips
                      f={f}
                      k="geo"
                      label="Geography"
                      options={["Pan-India", ...GX_REG_ORDER, "International"]}
                      multi
                      req
                      icons={["map", "map", "map", "map", "map", "map", "map", "globe"]}
                    />
                    <FM_Chips
                      f={f}
                      k="states"
                      label="Specific states with field teams (optional)"
                      options={GX_FIELD.map((s) => s.n)}
                      multi
                    />
                  </>
                )}
                {step === 1 && (
                  <>
                    <FM_Input
                      f={f}
                      k="audience"
                      label="Target audience"
                      icon="users"
                      req
                      ph="e.g. rural households, farmers, service users"
                      max={160}
                      full
                    />
                    <div className="fm-f fm-f--full gx-slider">
                      <label htmlFor={"gx-sample-" + uid}>
                        {"Sample size "}
                        <b>{gxF(f.v.sample)}</b>
                      </label>
                      <input
                        id={"gx-sample-" + uid}
                        type="range"
                        min="100"
                        max="50000"
                        step="100"
                        value={f.v.sample}
                        onChange={(e) => f.set("sample")(+e.target.value)}
                        className="gx-range"
                        aria-valuetext={gxF(f.v.sample) + " interviews"}
                      />
                      <small>
                        ±{(1.96 * Math.sqrt(0.25 / f.v.sample) * 100).toFixed(1)}% margin of error at 95% (simple random
                        sample)
                      </small>
                    </div>
                    <FM_Chips f={f} k="mode" label="Mode" options={GX_MODES} multi req />
                    <FM_Chips f={f} k="langs" label="Languages" options={GX_LANGS} multi />
                    <div className="fm-grid">
                      <FM_Select
                        f={f}
                        k="timeline"
                        label="Timeline"
                        icon="clock"
                        options={["Within 1 month", "1 to 3 months", "3 to 6 months", "Planning / tender stage"]}
                      />
                      <FM_Select f={f} k="budget" label="Budget band (optional)" icon="tag" options={GX_BUDGET} />
                    </div>
                    <FM_Area
                      f={f}
                      k="requirements"
                      label="Anything else (optional)"
                      req={false}
                      min={0}
                      max={1500}
                      rows={2}
                    />
                  </>
                )}
                {step === 2 && (
                  <div className="fm-grid">
                    <FM_Input f={f} k="name" label="Name" icon="user" req auto="name" max={60} />
                    <FM_Input f={f} k="title" label="Designation" icon="award" req auto="organization-title" max={80} />
                    <FM_Select f={f} k="otype" label="Organisation type" icon="flag" options={GX_ORG} req />
                    <FM_Input f={f} k="org" label="Organisation" icon="box" req auto="organization" max={100} />
                    <FM_Input f={f} k="email" label="Work email" icon="msg" type="email" req auto="email" max={160} />
                    <FM_Phone f={f} label="Phone" />
                    <FM_Check f={f}>
                      {"I agree that Frequent Research may contact me about this brief. See our "}
                      <HmLink to={FM_PRIV}>Privacy Policy</HmLink>.
                    </FM_Check>
                  </div>
                )}
              </div>
              <input
                className="hp"
                tabIndex={-1}
                autoComplete="off"
                value={f.v.website}
                onChange={f.set("website")}
                aria-hidden="true"
              />
              {st === "failed" && (
                <p className="fm-fail" role="alert">
                  {msg}
                  {" Please use the email button."}
                </p>
              )}
              <div className="fm-nav">
                {step > 0 && (
                  <button type="button" className="fm-back" onClick={() => setStep((s) => s - 1)}>
                    ← Back
                  </button>
                )}
                {step < 2 ? (
                  <button key="step-next" type="button" className="btn btn--primary btn--lg fm-go" onClick={next}>
                    {"Continue "}
                    <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button key="step-send" type="submit" className="btn btn--primary btn--lg fm-go" disabled={st === "sending"}>
                    {st === "sending" ? (
                      <>
                        <i className="fm-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {"Send research brief "}
                        <span aria-hidden="true">→</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
const GX_REL = [
  ["Market research services", "/services/market-research"],
  ["Survey programming & research design", "/services/market-research/research-design-cycle"],
  ["Online data collection", "/services/market-research/online-data-collection"],
  ["CATI, CAPI & face-to-face fieldwork", "/services/market-research/offline-data-collection"],
  ["Business (B2B) research panel", "/services/market-research/business-panel"],
  ["Healthcare research panel", "/services/market-research/healthcare-panel"],
  ["Consumer research panel", "/services/market-research/consumer-panel"],
  ["Quantitative research", "/services/market-research/quantitative-research"],
  ["Qualitative research", "/services/market-research/qualitative-research"],
  ["Data processing & analytics", "/services/market-research/data-processing-and-analytics"],
  ["Our research panels", "/portals"],
  ["Industries & case studies", "/industries-case-studies"],
];
function GX_Close() {
  return (
    <>
      <section className="gx-rel" aria-label="Related services">
        <div className="container">
          <h2 className="gx-rel__h">Related services</h2>
          <div className="gx-rel__pills">
            {GX_REL.map(([t, to]) => (
              <HmLink key={to} to={to}>
                {t}
                <span aria-hidden="true">→</span>
              </HmLink>
            ))}
          </div>
        </div>
      </section>
      <section className="gx-band" aria-labelledby="gx-band-h">
        <div className="gx-band__bg" aria-hidden="true">
          {Array.from(
            {
              length: 18,
            },
            (_, i) => (
              <i
                key={i}
                style={{
                  "--i": i,
                }}
              />
            ),
          )}
        </div>
        <div className="container gx-band__in">
          <h2 id="gx-band-h">Evidence that stands up in the review meeting.</h2>
          <div className="gx-hero__ctas">
            <a href="#brief" className="btn btn--lg gx-btn" onClick={gxGo("brief")}>
              {"Request a Research Proposal "}
              <span aria-hidden="true">→</span>
            </a>
            <HmLink to="/lets-talk?type=feasibility" className="btn btn--lg gx-btn-ghost">
              Talk to a Research Specialist
            </HmLink>
          </div>
        </div>
      </section>
    </>
  );
}
function GX_Page() {
  usePageMeta(
    "Government & Opinion Poll Research Services",
    `Government surveys, opinion polls and scheme evaluations across India: field teams in ${GX_FIELD_STATES} states & UTs and ${GX_FIELD_DISTRICTS} districts, a ${gxF(GX_T)}-member citizen panel and ISO 20252 quality.`,
  );
  useJsonLd("gov", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Government & Opinion Poll Research",
        serviceType:
          "Government survey research, public opinion research, citizen surveys, scheme evaluation, household surveys, CAPI CATI fieldwork",
        provider: {
          "@type": "Organization",
          name: "Frequent Research",
          legalName: "Fieldwork Solutions Pvt. Ltd.",
        },
        areaServed: "India",
      },
      {
        "@type": "Organization",
        name: "Frequent Research",
        legalName: "Fieldwork Solutions Private Limited",
      },
      {
        "@type": "FAQPage",
        mainEntity: GX_FAQ.map(([, q, a]) => ({
          "@type": "Question",
          name: q,
          acceptedAnswer: {
            "@type": "Answer",
            text: a,
          },
        })),
      },
    ],
  });
  return (
    <div className="gx">
      <GX_Hero />
      <GX_Trust />
      <GX_Portfolio />
      <GX_Diligence />
      <GX_Explorer />
      <GX_Coverage />
      <GX_Programmes />
      <GX_Polls />
      <GX_Election />
      <GX_Cases />
      <GX_Method />
      <GX_Quality />
      <GX_Outputs />
      <GX_Panel />
      <GX_Orbit />
      <GX_Tech />
      <GX_Integrity />
      <GX_Faq />
      <GX_Brief />
      <GX_Close />
    </div>
  );
}

export { GX_Page };
