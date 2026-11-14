import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { PORTALS } from '../data/site.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, GuideLink, PanelMark } from './VerticalPage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { odP } from './QNTPage.jsx';
import { OD_Count } from './CATIPage.jsx';

const HP_CONFIG = {
  stats: [
    [474, 0, "K+", "Verified healthcare panel members"],
    [30, 0, "+", "Healthcare panel countries"],
    [10, 0, "+", "Additional healthcare partner markets"],
  ],
  specialties: [
    ["heart", "Cardiology"],
    ["target", "Oncology"],
    ["zap2", "Neurology"],
    ["leaf", "Dermatology"],
    ["pulse", "Gastroenterology"],
    ["flask", "Endocrinology"],
    ["msg", "Psychiatry"],
    ["smile", "Pediatrics"],
    ["bone", "Orthopedics"],
    ["steth", "General Practice"],
    ["scalpel", "Surgery"],
    ["userplus", "Nursing"],
    ["pill", "Pharmacy"],
    ["tooth", "Dentistry"],
    ["users", "Allied Health"],
  ],
  team: [
    {
      role: "Research Consultant",
      name: "",
      photo: "",
      url: "",
    },
    {
      role: "Healthcare Panel Manager",
      name: "",
      photo: "",
      url: "",
    },
    {
      role: "Recruitment Specialist",
      name: "",
      photo: "",
      url: "",
    },
    {
      role: "Data & Analytics Specialist",
      name: "",
      photo: "",
      url: "",
    },
  ],
};
function HP_Hero() {
  const cards = [
    ["steth", "Physician", "Cardiology \xB7 Hospital", "HCP verified"],
    ["userplus", "Nurse", "Oncology ward \xB7 Clinic", "Profile checked"],
    ["pill", "Pharmacist", "Retail pharmacy", "HCP verified"],
    ["user", "Patient", "Condition & treatment experience", "Eligibility screened"],
    ["heart", "Caregiver", "Caring for a family member", "Eligibility screened"],
  ];
  return (
    <div
      className="hp-stack"
      role="img"
      aria-label="Healthcare research audience profiles: physician, nurse, pharmacist, patient and caregiver, each verified or screened before research"
    >
      <svg className="hp-stack__ecg" viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70 H150 L170 70 L185 30 L200 105 L215 50 L228 70 H330 L345 70 L360 20 L376 110 L390 58 L402 70 H600" />
      </svg>
      {cards.map(([ic, t, d, v], i) => (
        <div
          key={t}
          className={"hp-card hp-card--" + i}
          style={{
            "--i": i,
          }}
        >
          <span className="hp-card__av">
            <RC_I n={ic} s={20} />
          </span>
          <div>
            <strong>{t}</strong>
            <span>{d}</span>
          </div>
          <span className="hp-card__v">
            <RC_I n="check" s={11} />
            {v}
          </span>
        </div>
      ))}
      <div className="hp-tags" aria-hidden="true">
        {["Specialty", "Practice setting", "Therapeutic area", "Country"].map((t, i) => (
          <span
            key={t}
            style={{
              "--i": i,
            }}
          >
            {t}
          </span>
        ))}
      </div>
      {null}
      <ol className="hp-stack__flow">
        {["Right audience", "Right research", "Reliable insights"].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ol>
    </div>
  );
}
function HP_Challenge() {
  const [ref, v] = RC_useInView(0.3);
  const st = [
    ["list", "Research requirement"],
    ["filter", "Audience criteria"],
    ["shield", "Professional / patient qualification"],
    ["userplus", "Recruitment"],
    ["okc", "Quality validation"],
    ["clipboard", "Research participation"],
    ["bulb", "Decision-ready insights"],
  ];
  return (
    <ol ref={ref} className={"hp-ch" + (v ? " is-in" : "")}>
      {st.map(([ic, t], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span className="hp-ch__dot">
            <RC_I n={ic} s={17} />
          </span>
          <strong>{t}</strong>
        </li>
      ))}
    </ol>
  );
}
const HP_AUD = [
  [
    "HCPs",
    "steth",
    "#0E8A8A",
    ["Physicians", "Specialists", "Surgeons", "Nurses", "Pharmacists", "Dentists", "Allied Health Professionals"],
  ],
  [
    "Healthcare Stakeholders",
    "hospital",
    "#0B22A8",
    ["Payers", "Administrators", "Procurement", "Hospital Decision-Makers", "KOLs", "Healthcare Executives"],
  ],
  [
    "Patients & Caregivers",
    "heart",
    "#2F855A",
    ["Patients", "Caregivers", "Condition-Based Audiences", "Treatment Audiences", "Healthcare Consumers"],
  ],
];
function HP_Eco() {
  const [a, setA] = ee.useState(0);
  const cx = 200,
    cy = 200;
  const arc = (i) => {
    const s = ((-90 + i * 120 + 3) * Math.PI) / 180,
      e = ((-90 + (i + 1) * 120 - 3) * Math.PI) / 180,
      R = 180,
      r = 96;
    const p = (rad, t) => [cx + rad * Math.cos(t), cy + rad * Math.sin(t)];
    const [x1, y1] = p(R, s),
      [x2, y2] = p(R, e),
      [x3, y3] = p(r, e),
      [x4, y4] = p(r, s);
    return `M${x1} ${y1} A${R} ${R} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 0 0 ${x4} ${y4} Z`;
  };
  const g = HP_AUD[a];
  return (
    <div className="hp-eco">
      <div className="hp-eco__wheel">
        <svg viewBox="0 0 400 400" role="group" aria-label="Healthcare audience ecosystem">
          {HP_AUD.map(([t, ic, c], i) => {
            const m = ((-90 + i * 120 + 60) * Math.PI) / 180;
            const lx = cx + 138 * Math.cos(m),
              ly = cy + 138 * Math.sin(m);
            return (
              <g
                key={t}
                className={"hp-eco__seg" + (a === i ? " is-on" : "")}
                style={{
                  "--c": c,
                }}
                tabIndex="0"
                role="button"
                aria-pressed={a === i}
                onClick={() => setA(i)}
                onMouseEnter={() => setA(i)}
                onFocus={() => setA(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setA(i);
                  }
                }}
              >
                <path d={arc(i)} />
                {ee.createElement(
                  "foreignObject",
                  {
                    x: lx - 13,
                    y: ly - 26,
                    width: "26",
                    height: "26",
                  },
                  <RC_I n={ic} s={26} />,
                )}
                {t
                  .split(" ")
                  .reduce((acc, w) => {
                    const l = acc[acc.length - 1];
                    if (l && (l + " " + w).length <= 13) acc[acc.length - 1] = l + " " + w;
                    else acc.push(w);
                    return acc;
                  }, [])
                  .map((ln, j) => (
                    <text key={j} x={lx} y={ly + 14 + j * 14} textAnchor="middle">
                      {ln}
                    </text>
                  ))}
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="84" className="hp-eco__core" />
          <circle cx={cx} cy={cy} r="84" className="hp-eco__pulse" />
          <text x={cx} y={cy - 4} textAnchor="middle" className="hp-eco__ct">
            HEALTHCARE
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" className="hp-eco__ct">
            RESEARCH
          </text>
        </svg>
      </div>
      <div
        className="hp-eco__panel"
        key={a}
        style={{
          "--c": g[2],
        }}
      >
        <span className="hp-eco__ic">
          <RC_I n={g[1]} s={22} />
        </span>
        <h3>{g[0]}</h3>
        <ul>
          {g[3].map((x, i) => (
            <li
              key={x}
              style={{
                "--i": i,
              }}
            >
              {x}
            </li>
          ))}
        </ul>
        <p>Availability varies by audience and market and is confirmed during feasibility.</p>
      </div>
      <div className="hp-eco__acc">
        {HP_AUD.map(([t, ic, c, xs], i) => (
          <details
            key={t}
            open={i === 0}
            style={{
              "--c": c,
            }}
          >
            <summary>
              <RC_I n={ic} s={18} />
              {t}
              <b>{xs.length}</b>
            </summary>
            <ul>
              {xs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
const HP_PROF = [
  [
    "Professional",
    "brief",
    ["Job Role", "Specialty", "Sub-specialty", "Department", "Seniority", "Professional designation"],
  ],
  [
    "Practice",
    "hospital",
    ["Hospital Type", "Facility Type", "Practice Setting", "Department", "Patient Volume", "Practice Characteristics"],
  ],
  [
    "Organization",
    "building",
    [
      "Organization Type",
      "Hospital / Clinic",
      "Institution",
      "Employee / Staff Size where applicable",
      "Location",
      "Country",
      "Region",
    ],
  ],
  [
    "Patient",
    "user",
    ["Age", "Gender", "Condition", "Treatment Experience", "Diagnosis Status", "Caregiver Status", "Healthcare Usage"],
  ],
  [
    "Research",
    "clipboard",
    ["Previous research participation", "Research interests", "Methodology suitability", "Study eligibility"],
  ],
];
function HP_Profile() {
  const [t, setT] = ee.useState(0);
  const p = HP_PROF[t];
  return (
    <div className="hp-prof">
      <div className="hp-prof__tabs" role="tablist" aria-label="Profile type">
        {HP_PROF.map(([n, ic], i) => (
          <button key={n} role="tab" aria-selected={t === i} className={t === i ? "is-on" : ""} onClick={() => setT(i)}>
            <RC_I n={ic} s={16} />
            {n}
            {" profile"}
          </button>
        ))}
      </div>
      <div className="hp-prof__card" key={t}>
        <div className="hp-prof__head">
          <span className="hp-prof__av">
            <RC_I n={p[1]} s={22} />
          </span>
          <div>
            <strong>
              {p[0]}
              {" profile"}
            </strong>
            <span>
              {p[2].length}
              {" attributes available for targeting"}
            </span>
          </div>
          <span className="rc-illus">Attribute structure</span>
        </div>
        <ul>
          {p[2].map((x, i) => (
            <li
              key={x}
              style={{
                "--i": i,
              }}
            >
              <RC_I n="check" s={13} />
              {x}
            </li>
          ))}
        </ul>
      </div>
      <p className="hp-note">
        Not every attribute is available in every market. Combinations are confirmed during feasibility.
      </p>
    </div>
  );
}
const HP_QC = [
  ["Identity & Profile Validation", ["Identity checks", "HCP verification on joining", "Device / browser checks"]],
  ["Professional / Audience Qualification", ["Role and specialty confirmation", "Patient and caregiver status"]],
  ["Eligibility Screening", ["Screening questions", "Study-specific qualification"]],
  ["Duplicate & Fraud Detection", ["Duplicate detection", "Fraud screening", "Geo/IP validation", "CAPTCHA"]],
  ["Survey Quality Checks", ["Attention checks", "Speeding detection", "Straight-line detection", "Open-end review"]],
  ["Data Review", ["Manual quality review", "Cleaning before delivery"]],
];
function HP_Quality() {
  const [a, setA] = ee.useState(0);
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"hp-qc" + (v ? " is-in" : "")}>
      <div className="hp-qc__stack" aria-hidden="true">
        {HP_QC.map((_, i) => (
          <div
            key={i}
            className={"hp-qc__plate" + (a === i ? " is-on" : "")}
            style={{
              "--i": i,
            }}
            onMouseEnter={() => setA(i)}
          >
            <span>L{i + 1}</span>
          </div>
        ))}
      </div>
      <ol className="hp-qc__list">
        {HP_QC.map(([t, xs], i) => (
          <li key={t} className={a === i ? "is-on" : ""}>
            <button
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
              onClick={() => setA(i)}
              aria-expanded={a === i}
            >
              <span className="hp-qc__n">
                {"Layer "}
                {i + 1}
              </span>
              <strong>{t}</strong>
            </button>
            <ul>
              {xs.map((x) => (
                <li key={x}>
                  <RC_I n="check" s={13} />
                  {x}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
const HP_WF = [
  ["Understand", "We clarify the research objective, audience and project requirements."],
  ["Design", "We define methodology, questionnaire, audience criteria and quotas."],
  ["Feasibility", "We assess audience availability, incidence and recruitment requirements."],
  ["Recruit", "We recruit relevant healthcare professionals, patients or stakeholders."],
  ["Collect", "We conduct online, telephone, qualitative or hybrid research."],
  ["Quality Check", "We monitor participation and review data quality."],
  ["Deliver", "We provide cleaned data, tables, analysis or research outputs according to scope."],
];
function HP_Process() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"hp-wf" + (v ? " is-in" : "")}>
      <svg className="hp-wf__ecg" viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true">
        <path
          pathLength="1"
          d="M0 30 H120 L132 30 L140 12 L150 48 L160 22 L168 30 H262 L274 30 L282 12 L292 48 L302 22 L310 30 H404 L416 30 L424 12 L434 48 L444 22 L452 30 H546 L558 30 L566 12 L576 48 L586 22 L594 30 H688 L700 30 L708 12 L718 48 L728 22 L736 30 H830 L842 30 L850 12 L860 48 L870 22 L878 30 H1000"
        />
      </svg>
      <ol>
        {HP_WF.map(([t, d], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="hp-wf__n">0{i + 1}</span>
            <strong>{t}</strong>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
function HP_Coverage() {
  const [ref, v] = RC_useInView(0.25);
  const hubs = [
    [-90, 38],
    [-50, -12],
    [2, 50],
    [28, 0],
    [48, 25],
    [78, 21],
    [112, 30],
    [138, -25],
    [104, 2],
  ];
  const links = [
    [0, 2],
    [2, 4],
    [4, 5],
    [5, 8],
    [8, 6],
    [6, 7],
    [0, 1],
    [2, 3],
    [5, 6],
  ];
  return (
    <div ref={ref} className={"hp-cov" + (v ? " is-in" : "")}>
      <svg
        viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
        role="img"
        aria-label="Map showing multi-market healthcare research connections"
      >
        <path d={OD_WORLD.d} className="hp-cov__dots" />
        {links.map(([a, b], i) => {
          const [x1, y1] = odP(...hubs[a]),
            [x2, y2] = odP(...hubs[b]);
          return (
            <path
              key={i}
              pathLength="1"
              d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 50} ${x2} ${y2}`}
              className="hp-cov__arc"
              style={{
                "--i": i,
              }}
            />
          );
        })}
        {hubs.map((h, i) => {
          const [x, y] = odP(...h);
          return (
            <g
              key={i}
              className="hp-cov__hub"
              style={{
                "--i": i,
              }}
            >
              <circle cx={x} cy={y} r="14" className="hp-cov__ring" />
              <path d={`M${x - 5} ${y}h10M${x} ${y - 5}v10`} className="hp-cov__plus" />
            </g>
          );
        })}
      </svg>
      <div className="hp-cov__stats">
        {HP_CONFIG.stats.map(([n, d, s, t]) => (
          <div key={t}>
            <OD_Count to={n} dec={d} suf={s} />
            <span>{t}</span>
          </div>
        ))}
        <div>
          <strong className="od-count">Quant + Qual</strong>
          <span>Research methodologies</span>
        </div>
      </div>
    </div>
  );
}
function HP_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm,
    Logo = PanelMark,
    Guide = GuideLink;
  const [active, setActive] = ee.useState("hp-overview");
  const nav = [
    ["hp-overview", "Overview"],
    ["hp-audiences", "Audiences"],
    ["hp-profiling", "Profiling"],
    ["hp-quality", "Quality"],
    ["hp-coverage", "Coverage"],
    ["hp-process", "Process"],
    ["hp-why", "Why us"],
    ["hp-faq", "FAQ"],
    ["hp-enquire", "Contact"],
  ];
  const mho = PORTALS.find((p) => p.slug === "myhealthopinions");
  const faqs = [
    {
      q: "What is a healthcare panel?",
      a: "A healthcare panel is a community of healthcare professionals, patients and caregivers who have agreed to take part in market research and shared profile information such as role, specialty or condition, so studies can reach the right healthcare audience quickly.",
    },
    {
      q: "What types of healthcare professionals can you recruit?",
      a: "Physicians and specialists, nurses, pharmacists and allied healthcare professionals, as well as healthcare stakeholders such as administrators and hospital decision-makers, subject to feasibility in each market.",
    },
    {
      q: "Can you recruit physicians and specialists for market research?",
      a: "Yes. Physicians and specialists can be targeted by specialty, practice setting and market, and healthcare professionals complete a verification step when they join our healthcare panel.",
    },
    {
      q: "Can you recruit patients and caregivers?",
      a: "Yes. Patients and caregivers can be recruited by condition, treatment experience or caregiver status, with eligibility confirmed through study-specific screening.",
    },
    {
      q: "Which countries can your healthcare panel cover?",
      a: "Our healthcare panel covers 30+ countries, with 10+ additional partner markets. Share your target markets and we will confirm availability for each audience.",
    },
    {
      q: "What healthcare research methodologies do you support?",
      a: "Online surveys, in-depth interviews, focus groups, CATI telephone research, hybrid designs and custom recruitment for specific healthcare audiences.",
    },
    {
      q: "How do you verify healthcare research participants?",
      a: "Healthcare professionals complete verification when they join. Studies then apply eligibility screening, duplicate and fraud detection, survey quality checks and a manual data review before delivery.",
    },
    {
      q: "How quickly can you provide healthcare research feasibility?",
      a: "For most online studies we share feasibility within one working day. Complex healthcare audiences can take two to three days, because we check real availability with the panel before confirming.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/healthcare-panel";
    const added = [];
    const meta = (attr, key, val) => {
      let el = document.head.querySelector(`meta[${attr}="${key}"]`);
      const prev = el ? el.getAttribute("content") : null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, key);
        document.head.appendChild(el);
        added.push(el);
      } else
        added.push({
          restore: () => el.setAttribute("content", prev),
        });
      el.setAttribute("content", val);
    };
    const title = "Healthcare Panel | HCP & Patient Research | Frequent Research";
    const desc =
      "Healthcare panel for market research: verified physicians, specialists, nurses, pharmacists, patients and caregivers across 30+ countries. Request feasibility.";
    meta("property", "og:title", title);
    meta("property", "og:description", desc);
    meta("property", "og:url", url);
    meta("property", "og:type", "website");
    meta("name", "twitter:card", "summary");
    meta("name", "twitter:title", title);
    meta("name", "twitter:description", desc);
    const can = document.createElement("link");
    can.rel = "canonical";
    can.href = url;
    document.head.appendChild(can);
    added.push(can);
    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.text = JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: f.a,
          },
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          ["Home", "/"],
          ["Market Research", "/services/market-research"],
          ["Healthcare Panel", "/services/market-research/healthcare-panel"],
        ].map(([name, p], i) => ({
          "@type": "ListItem",
          position: i + 1,
          name,
          item: "https://www.frequentresearch.com" + p,
        })),
      },
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Healthcare Panel",
        serviceType: "Healthcare market research panel and recruitment",
        provider: {
          "@type": "Organization",
          name: "Frequent Research",
          url: "https://www.frequentresearch.com/",
        },
        url,
      },
    ]);
    document.head.appendChild(ld);
    added.push(ld);
    let io;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (es) => {
          es.forEach((e) => {
            if (e.isIntersecting) setActive(e.target.id);
          });
        },
        {
          rootMargin: "-45% 0px -50% 0px",
        },
      );
      nav.forEach(([id]) => {
        const el = document.getElementById(id);
        if (el) io.observe(el);
      });
    }
    return () => {
      added.forEach((x) => (x.restore ? x.restore() : x.remove()));
      if (io) io.disconnect();
    };
  }, []);
  const svc = (s, label) => <Link to={`/services/market-research/${s}`}>{label}</Link>;
  const cs = (s) => `/industries-case-studies/pharmaceutical/${s}`;
  return (
    <div className="hpg rc">
      <section className="hp-hero">
        <div className="container hp-hero__in">
          <div className="hp-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="hp-eyebrow">
              <RC_I n="steth" s={15} />
              Healthcare market research
            </span>
            <HeroH1>Healthcare Panel</HeroH1>
            <p className="hp-hero__sub">
              Physicians, specialists, healthcare professionals, patients and caregivers for targeted healthcare
              research.
            </p>
            <p className="hp-hero__body">
              Reach relevant healthcare audiences through structured recruitment and profiling designed around your
              research requirements, delivered by one project team from brief to data.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg hp-btn" href="#hp-enquire" onClick={rcScrollTo("hp-enquire")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <HP_Hero />
        </div>
        <div className="container">
          <ul className="hp-trust">
            {[
              [
                "steth",
                "Healthcare Professionals",
                "Physicians, specialists, nurses, pharmacists and other healthcare audiences.",
              ],
              ["heart", "Patients & Caregivers", "Condition, treatment and experience-based audiences."],
              ["globe", "Global Reach", "Multi-market healthcare research support."],
              ["layers", "Research Ready", "Quantitative, qualitative and hybrid methodologies."],
            ].map(([ic, t, d]) => (
              <li key={t} className="hcard">
                <span>
                  <RC_I n={ic} s={20} />
                </span>
                <div>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <nav className="rc-subnav od-subnav" aria-label="On this page">
        <div className="container rc-subnav__in">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={rcScrollTo(id)}>
              {t}
            </a>
          ))}
        </div>
      </nav>
      <section className="rc-sec" id="hp-overview">
        <div className="container hp-chwrap">
          <div>
            <RC_Head kicker="The challenge" title="Reaching the Right Healthcare Audience Is the First Challenge" />
            <p className="hp-lead">
              Healthcare research often depends on precise audience qualification: the right specialty, practice
              setting, condition or treatment experience.
            </p>
            <p className="od-muted">
              A respondent who is close but not quite right can change what a study concludes. That is why every
              healthcare panel project moves from requirement to insight through deliberate qualification and validation
              steps, rather than broad sampling.
            </p>
          </div>
          <HP_Challenge />
        </div>
      </section>
      <section className="rc-sec hp-sec--mint" id="hp-audiences">
        <div className="container">
          <RC_Head
            kicker="Healthcare research panel"
            title="Healthcare Audiences We Can Help You Reach"
            intro="Three audience groups, each recruited and qualified differently. Select a group to see who it includes."
          />
          <HP_Eco />
        </div>
      </section>
      <section className="rc-sec" id="hp-profiling">
        <div className="container">
          <RC_Head kicker="Healthcare professional profiling" title="Build the Right Healthcare Audience" />
          <HP_Profile />
          <div className="hp-spec">
            <RC_Head kicker="Specialty targeting" title="Target by Specialty, Role and Healthcare Need" />
            <div className="hp-spec__grid">
              {HP_CONFIG.specialties.map(([ic, t], i) => (
                <div key={t} className={"hp-spec__card hp-spec__card" + (i % 4)} tabIndex="0">
                  <RC_I n={ic} s={20} />
                  <span>{t}</span>
                </div>
              ))}
            </div>
            <p className="hp-note">
              Targeting can be customized by specialty, market and study criteria, subject to feasibility.
            </p>
          </div>
        </div>
      </section>
      <section className="rc-sec hp-sec--soft">
        <div className="container">
          <RC_Head kicker="Methodologies" title="Healthcare Research Across Multiple Methodologies" />
          <div className="hp-meth">
            {[
              ["clipboard", "Online Surveys", "Structured quantitative healthcare research.", "quantitative-research"],
              [
                "msg",
                "Qualitative Interviews",
                "In-depth interviews with healthcare professionals, patients and stakeholders.",
                "qualitative-research",
              ],
              ["users", "Focus Groups", "Moderated group discussions where appropriate.", "qualitative-research"],
              ["phone", "CATI", "Telephone-based healthcare research.", "offline-data-collection"],
              ["layers", "Hybrid Research", "Combination of online, telephone and qualitative approaches.", null],
              [
                "target",
                "Custom Recruitment",
                "Recruitment designed around specific healthcare audience criteria.",
                "qualitative-research",
              ],
            ].map(([ic, t, d, s], i) => (
              <RC_Reveal
                key={t}
                className="hp-meth__card hcard"
                style={{
                  "--i": i % 3,
                }}
              >
                <span className="hp-meth__ic">
                  <RC_I n={ic} s={22} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
                {s && (
                  <Link to={`/services/market-research/${s}`} className="rc-link">
                    {"Related service "}
                    <RC_I n="arrow" s={14} />
                  </Link>
                )}
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec hp-sec--navy" id="hp-quality">
        <div className="container">
          <RC_Head
            light
            kicker="Quality framework"
            title="Quality Controls Built Into Healthcare Recruitment"
            intro="Six layers between a registered member and the data you receive. Controls are applied according to each study's requirements."
          />
          <HP_Quality />
        </div>
      </section>
      <section className="hp-mid">
        <div className="container hp-mid__in">
          <div>
            <strong>Have a specific healthcare audience in mind?</strong>
            <span>
              Share the specialty, condition or role and the markets. We will check real availability before you commit.
            </span>
          </div>
          <Link to="/lets-talk?type=audience" className="btn btn--light btn--lg">
            Check Audience Feasibility
          </Link>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container hp-resp">
          <div>
            <RC_Head kicker="Responsible research" title="Responsible Healthcare Research" />
            <p className="od-muted">
              Healthcare research involves sensitive information and professional reputations. We treat recruitment as
              market research, never clinical care, and build care into every stage.
            </p>
            <p className="hp-resp__cert">
              <RC_I n="lock" s={16} />
              Frequent Research holds ISO/IEC 27001:2013 certification for information security management and ISO
              20252:2019 for market, opinion and social research.
            </p>
          </div>
          <ul className="hp-resp__list">
            {[
              ["lock", "Respondent privacy", "Personal and health information is used only for research."],
              ["shield", "Secure data handling", "Controlled access and secure transfer of study data."],
              ["okc", "Appropriate consent", "Participants agree to take part and can skip questions or leave."],
              ["filter", "Audience eligibility", "Screening confirms each participant fits the study."],
              ["users", "Ethical recruitment", "Fair, transparent invitations and honoraria for professionals' time."],
              ["eyeoff", "Research confidentiality", "Client and study details are protected."],
              ["globe", "Applicable market requirements", "Recruitment follows the rules that apply in each market."],
            ].map(([ic, t, d]) => (
              <li key={t}>
                <RC_I n={ic} s={18} />
                <div>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec hp-sec--dark" id="hp-coverage">
        <div className="container">
          <RC_Head light kicker="Healthcare industry market research" title="Healthcare Research Across Markets" />
          <HP_Coverage />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Use cases" title="What Healthcare Research Can Help You Understand" />
          <div className="hp-use">
            {[
              ["award", "Brand & Awareness", "Understand healthcare brand perceptions."],
              ["box", "Product & Concept Research", "Evaluate concepts, products and propositions."],
              ["heart", "Treatment Experience", "Understand patient and caregiver experiences."],
              ["steth", "Physician Behaviour", "Explore professional perspectives and decision factors."],
              ["compass", "Market Opportunity", "Understand healthcare market needs and opportunities."],
              ["msg", "Message Testing", "Evaluate communications with relevant healthcare audiences."],
              ["map", "Patient Journey", "Explore experiences across diagnosis, treatment and ongoing care."],
              ["cpu", "Medical Device Research", "Gather feedback from relevant healthcare stakeholders."],
            ].map(([ic, t, d], i) => (
              <div key={t} className={"hp-use__card hp-use__card" + (i % 4)} tabIndex="0">
                <RC_I n={ic} s={20} />
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
          <div className="hp-cmp">
            <RC_Head
              kicker="Specialized recruitment"
              title="Why Healthcare Panel Research Requires Specialized Recruitment"
            />
            <div
              className="hp-cmp__t"
              role="table"
              aria-label="General consumer research compared with healthcare research"
            >
              <div className="hp-cmp__r hp-cmp__r--h" role="row">
                <span role="columnheader">General consumer research</span>
                <span role="columnheader">Healthcare research</span>
              </div>
              {[
                ["General demographics", "Professional / patient qualification"],
                ["Consumer behaviour", "Clinical / healthcare context"],
                ["General category usage", "Specialty / condition / treatment context"],
                ["Broad audiences", "Precisely defined healthcare audiences"],
                ["Consumer profiling", "Professional and practice profiling"],
                ["General screening", "Study-specific qualification"],
              ].map(([g, h]) => (
                <div key={g} className="hp-cmp__r" role="row">
                  <span role="cell" data-l="Consumer research">
                    {g}
                  </span>
                  <span role="cell" data-l="Healthcare research">
                    <RC_I n="arrow" s={14} />
                    {h}
                  </span>
                </div>
              ))}
            </div>
            <p className="hp-note">
              {"Both serve different purposes. For consumer audiences, see our "}
              {svc("consumer-panel", "consumer panel")}
              {"; for B2B audiences, our "}
              {svc("business-panel", "business panel")}.
            </p>
          </div>
        </div>
      </section>
      <section className="rc-sec hp-sec--soft" id="hp-process">
        <div className="container">
          <RC_Head center kicker="How we work" title="How We Work" />
          <HP_Process />
        </div>
      </section>
      <section className="rc-sec" id="hp-why">
        <div className="container">
          <RC_Head kicker="Why us" title="Why Clients Choose Frequent Research for Healthcare Panel" />
          <div className="hp-why">
            {[
              [
                "steth",
                "Healthcare Audience Access",
                "Access relevant healthcare audiences according to project requirements.",
              ],
              ["globe", "Multi-Market Research", "Support healthcare research across multiple markets."],
              ["shield", "Quality-Focused Recruitment", "Structured screening and quality-control processes."],
              [
                "eye",
                "Feasibility Transparency",
                "Clear communication around audience availability and project requirements.",
              ],
              ["user", "Single Point of Contact", "One project contact from briefing through delivery."],
              [
                "cpu",
                "Technology-Enabled Fieldwork",
                "Technology-supported sampling, quotas, monitoring and project management.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="hp-why__card hcard"
                style={{
                  "--i": i % 3,
                }}
              >
                <span>
                  <RC_I n={ic} s={20} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </div>
          <div className="hp-own">
            <div className="hp-own__card">
              {mho && (
                <Link to="/portals/myhealthopinions" className="hp-own__logo">
                  <Logo p={mho} size="lg" />
                </Link>
              )}
              <span className="hp-own__k">Powered by our research panel ecosystem</span>
              <h3>MyHealthOpinions</h3>
              <p>
                {mho ? mho.audience : "Healthcare Professionals, Patients & Caregivers Research Panel"}. Healthcare
                professionals complete a verification step when they join, and members share only what they are
                comfortable sharing.
              </p>
              <Link to="/portals/myhealthopinions" className="rc-link">
                {"Visit MyHealthOpinions "}
                <RC_I n="arrow" s={14} />
              </Link>
            </div>
            <ol className="hp-own__flow">
              {[
                ["userplus", "Recruitment"],
                ["layers", "Profiling"],
                ["filter", "Sampling"],
                ["clipboard", "Research"],
                ["shield", "Quality"],
                ["bulb", "Insights"],
              ].map(([ic, t], i) => (
                <li
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>
                    <RC_I n={ic} s={18} />
                  </span>
                  {t}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="rc-sec hp-sec--soft">
        <div className="container">
          <div className="hp-sec2">
            <RC_Head kicker="Sectors" title="Healthcare & Life Sciences Research Areas" />
            <div className="hp-sectors">
              {[
                ["pill", "Pharmaceuticals", "/industries-case-studies/pharmaceutical"],
                ["cpu", "Medical Devices", cs("medical-device-usability-testing")],
                ["hospital", "Healthcare Providers & Hospitals", "/industries-case-studies/healthcare"],
                ["coins", "Insurance / Payers", "/industries-case-studies/insurance"],
                ["users", "Public Health", "/industries-case-studies"],
                ["leaf", "Consumer Health & Wellness", cs("pharmacy-retail-audit")],
              ].map(([ic, t, to]) => (
                <Link key={t} to={to} className="hp-sectors__item">
                  <RC_I n={ic} s={20} />
                  <span>{t}</span>
                  <RC_I n="arrow" s={14} className="hp-sectors__go" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head
            kicker="Example engagement"
            title="How a Typical Healthcare Research Project Looks"
            intro="A general framework, not a specific client project."
          />
          <ol className="hp-ex">
            {[
              [
                "Research Need",
                "A healthcare organization needs insight from a specific professional or patient audience.",
              ],
              ["Audience", "Defined according to role, specialty, condition, geography or eligibility criteria."],
              ["Feasibility", "Audience availability and recruitment requirements assessed."],
              ["Fieldwork", "Research conducted using the appropriate methodology."],
              ["Quality Review", "Responses reviewed against agreed quality criteria."],
              ["Output", "Clean data and research findings delivered according to project scope."],
            ].map(([t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>0{i + 1}</span>
                <strong>{t}</strong>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec hp-sec--mint">
        <div className="container">
          <RC_Head kicker="Healthcare insights" title="Healthcare Research Insights" />
          <div className="hp-ins">
            <Link to="/blog/healthcare-panel-research-guide" className="hp-ins__card hp-ins__card--lead">
              <span className="hp-ins__k">Guide</span>
              <strong>
                Healthcare Market Research Panels: Reaching Doctors, Patients and Caregivers the Right Way
              </strong>
              <span className="hp-ins__go">
                {"Read the guide "}
                <RC_I n="arrow" s={14} />
              </span>
            </Link>
            {[
              [
                "cardiologist-treatment-pattern-study",
                "Understanding how cardiologists choose treatments after a heart attack",
              ],
              ["hcp-message-testing", "Testing promotional messages with physicians"],
              ["patient-journey-diabetes", "Mapping the patient journey for people living with diabetes"],
              ["rare-disease-caregiver-study", "Understanding the needs of caregivers for rare disease patients"],
              ["pharma-brand-tracker", "Tracking brand perception among general physicians"],
              ["medical-device-usability-testing", "Usability testing a home blood pressure monitor"],
            ].map(([s, t]) => (
              <Link key={s} to={cs(s)} className="hp-ins__card">
                <span className="hp-ins__k">Case study</span>
                <strong>{t}</strong>
                <span className="hp-ins__go">
                  {"View case study "}
                  <RC_I n="arrow" s={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint" id="hp-faq">
        <div className="container split">
          <h2 className="split__title">Healthcare Panel: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Related" title="Related research services" />
          <div className="cp-rel__grid">
            {[
              ["qualitative-research", "Qualitative research", "In-depth interviews and groups"],
              ["quantitative-research", "Quantitative research", "Statistically robust surveys"],
              ["cati", "CATI", "Computer-assisted telephone interviewing"],
              ["online-data-collection", "Online data collection", "Survey hosting and fieldwork"],
              ["offline-data-collection", "Offline data collection", "CATI and face-to-face fieldwork"],
              ["data-processing-and-analytics", "Data processing & analytics", "Cleaning, weighting and tables"],
              ["reporting-and-insights", "Reporting & insights", "Reports and debriefs"],
              ["consumer-panel", "Consumer panel", "Profiled consumers"],
              ["business-panel", "Business panel", "Verified B2B professionals"],
            ].map(([s, t, d]) => (
              <Link key={s} to={`/services/market-research/${s}`} className="cp-rel__card hcard">
                <strong>{t}</strong>
                <span>{d}</span>
                <RC_I n="arrow" s={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="od-cta hp-cta" id="hp-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Contact</span>
            <h2>Let's Find the Right Healthcare Audience for Your Research</h2>
            <p>
              Tell us about your audience, market and research objectives. Our team will assess the requirement and
              recommend an appropriate research approach.
            </p>
            <div className="od-hero__ctas">
              <Link className="btn btn--light btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk">
                Discuss Your Requirement
              </Link>
            </div>
            <Link className="bp-cta__link" to="/lets-talk?type=audience">
              {"Request Audience Feasibility "}
              <RC_I n="arrow" s={14} />
            </Link>
            <p className="hp-cta__micro">Share your market, audience and methodology requirements.</p>
          </div>
          <div className="card-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { HP_Page };
