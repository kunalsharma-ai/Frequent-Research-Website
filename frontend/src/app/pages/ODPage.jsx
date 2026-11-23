import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { TrustBadges } from '../data/products.jsx';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, GuideLink } from './VerticalPage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { odP } from './QNTPage.jsx';
import { OD_Count } from './CATIPage.jsx';

const OD_HUBS = {
  na: ["North America", -98, 40],
  eu: ["Europe", 10, 50],
  mena: ["MENA", 45, 25],
  in: ["India", 78, 22],
  apac: ["Asia-Pacific", 112, 28],
};
const OD_LINKS = [
  ["na", "eu"],
  ["eu", "mena"],
  ["mena", "in"],
  ["in", "apac"],
  ["eu", "in"],
  ["eu", "apac"],
  ["na", "mena"],
];
function odArc(a, b) {
  const [x1, y1] = odP(OD_HUBS[a][1], OD_HUBS[a][2]);
  const [x2, y2] = odP(OD_HUBS[b][1], OD_HUBS[b][2]);
  const mx = (x1 + x2) / 2,
    my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.28;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}
function OD_HeroMap() {
  return (
    <div className="od-hmap">
      <svg
        viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
        role="img"
        aria-label="World map showing online data collection connections between North America, Europe, MENA, India and Asia-Pacific"
      >
        <path d={OD_WORLD.d} className="od-dots" />
        {OD_LINKS.map(([a, b], i) => {
          const d = odArc(a, b);
          return (
            <g key={a + b}>
              <path
                d={d}
                className="od-arc"
                style={{
                  animationDelay: i * 0.25 + "s",
                }}
              />
              <circle r="3.2" className="od-traveller">
                {ee.createElement("animateMotion", {
                  dur: 9 + i * 1.3 + "s",
                  begin: i * 1.1 + "s",
                  repeatCount: "indefinite",
                  path: d,
                })}
              </circle>
            </g>
          );
        })}
        {Object.entries(OD_HUBS).map(([k, [name, lon, lat]], i) => {
          const [x, y] = odP(lon, lat);
          const w = name.length * 9.4 + 24;
          const below = k === "in";
          return (
            <g
              key={k}
              className="od-hub"
              style={{
                animationDelay: 0.3 + i * 0.25 + "s",
              }}
            >
              <circle cx={x} cy={y} r="16" className="od-hub__halo" />
              <circle cx={x} cy={y} r="5.5" className="od-hub__dot" />
              <rect x={x - w / 2} y={below ? y + 14 : y - 46} width={w} height="28" rx="14" className="od-hub__pill" />
              <text x={x} y={below ? y + 33 : y - 27} textAnchor="middle" className="od-hub__lbl">
                {name}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="od-fcard od-fcard--b2b">
        <span className="od-fcard__tag">B2B</span>
        <strong>Business Professionals</strong>
      </div>
      <div className="od-fcard od-fcard--b2c">
        <span className="od-fcard__tag">B2C</span>
        <strong>Consumers</strong>
      </div>
      <div className="od-fcard od-fcard--hc">
        <span className="od-fcard__tag">Healthcare</span>
        <strong>HCPs • Patients • Caregivers</strong>
      </div>
    </div>
  );
}
const OD_REGIONS = [
  {
    k: "am",
    t: "Americas",
    groups: ["North America", "Latin America"],
    pts: [
      ["USA", -98, 39],
      ["Canada", -106, 56],
      ["Mexico", -102, 23],
      ["Brazil", -51, -10],
      ["Argentina", -64, -34],
      ["Colombia", -74, 4],
    ],
  },
  {
    k: "eu",
    t: "Europe",
    groups: ["UK", "Germany", "France", "Italy", "Spain", "and other European markets"],
    pts: [
      ["UK", -2, 54],
      ["Germany", 10, 51],
      ["France", 2, 46.5],
      ["Italy", 12.5, 42.5],
      ["Spain", -3.7, 40.3],
      ["Netherlands", 5, 52.3],
      ["Poland", 19, 52],
      ["Sweden", 15, 62],
    ],
  },
  {
    k: "apac",
    t: "Asia-Pacific",
    groups: ["India", "China", "Japan", "South Korea", "Australia", "Southeast Asia", "and other APAC markets"],
    pts: [
      ["India", 78, 22],
      ["China", 104, 35],
      ["Japan", 138, 36],
      ["South Korea", 128, 36.5],
      ["Australia", 134, -25],
      ["Singapore", 104, 1.3],
      ["Indonesia", 113, -1],
      ["Thailand", 101, 15],
      ["Vietnam", 106, 16],
      ["Philippines", 122, 12],
    ],
  },
  {
    k: "mena",
    t: "MENA & Africa",
    groups: [
      "Saudi Arabia",
      "UAE",
      "Kuwait",
      "Qatar",
      "Egypt",
      "South Africa",
      "Nigeria",
      "and other regional markets",
    ],
    pts: [
      ["Saudi Arabia", 45, 24],
      ["UAE", 54, 24],
      ["Kuwait", 47.5, 29.3],
      ["Qatar", 51.2, 25.3],
      ["Egypt", 30, 26.8],
      ["South Africa", 24, -29],
      ["Nigeria", 8, 9.5],
    ],
  },
];
function OD_Coverage() {
  const [r, setR] = ee.useState(-1);
  const [ref, v] = RC_useInView(0.25);
  let n = 0;
  return (
    <div ref={ref} className={"od-cov" + (v ? " is-in" : "")}>
      <div className="od-cov__map">
        <svg
          viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
          role="img"
          aria-label="Map of research data collection coverage across the Americas, Europe, Asia-Pacific, and MENA and Africa"
        >
          <path d={OD_WORLD.d} className="od-dots od-dots--soft" />
          {OD_REGIONS.map((g, gi) =>
            g.pts.map(([name, lon, lat]) => {
              const [x, y] = odP(lon, lat);
              const on = r === -1 || r === gi;
              const delay = n++ * 0.07;
              return (
                <g
                  key={name}
                  className={"od-mk od-mk--" + g.k + (on ? "" : " is-dim")}
                  style={{
                    transitionDelay: delay + "s",
                  }}
                >
                  <circle cx={x} cy={y} r="11" className="od-mk__ring" />
                  <circle cx={x} cy={y} r="5" className="od-mk__dot" />
                  {r === gi && (
                    <text x={x} y={y - 15} textAnchor="middle" className="od-mk__lbl">
                      {name}
                    </text>
                  )}
                </g>
              );
            }),
          )}
        </svg>
        <p className="od-cov__note">
          <RC_I n="pin" s={14} />
          {" Markers show market coverage, not panel sizes. Tell us your markets and we will confirm feasibility."}
        </p>
      </div>
      <div className="od-cov__list" role="tablist" aria-label="Regions">
        {OD_REGIONS.map((g, gi) => (
          <button
            key={g.k}
            role="tab"
            aria-selected={r === gi}
            className={"od-cov__reg od-cov__reg--" + g.k + (r === gi ? " is-on" : "")}
            onClick={() => setR(gi)}
            onMouseEnter={() => setR(gi)}
            onFocus={() => setR(gi)}
          >
            <span className="od-cov__sw" />
            <strong>{g.t}</strong>
            <span className="od-cov__c">{g.groups.join(" \xB7 ")}</span>
          </button>
        ))}
        <button className={"od-cov__all" + (r === -1 ? " is-on" : "")} onClick={() => setR(-1)}>
          All regions
        </button>
      </div>
    </div>
  );
}
const OD_FLOW = [
  ["list", "Research Requirement"],
  ["target", "Audience Definition"],
  ["userplus", "Targeted Recruitment"],
  ["layers", "Profile & Segment"],
  ["filter", "Survey Sampling"],
  ["shield", "Quality Validation"],
  ["database", "Data Collection"],
  ["okc", "Research-Ready Data"],
];
function OD_Flow() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <ol ref={ref} className={"od-flow" + (v ? " is-in" : "")}>
      <div className="od-flow__track" aria-hidden="true">
        <span />
      </div>
      {OD_FLOW.map(([ic, t], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
          className={i === OD_FLOW.length - 1 ? "is-end" : ""}
        >
          <span className="od-flow__dot">
            <RC_I n={ic} s={20} />
          </span>
          <span className="od-flow__n">{String(i + 1).padStart(2, "0")}</span>
          <strong>{t}</strong>
        </li>
      ))}
    </ol>
  );
}
const OD_PANELS = [
  {
    k: "b2b",
    tag: "B2B",
    t: "B2B Online Research Panel",
    stat: [2.85, 2, "M+"],
    sl: "verified business professionals",
    ic: "brief",
    d: "Business professionals across industries, functions, seniority levels, company sizes and decision-making responsibilities, from specialists to the C-suite.",
    x: [
      "Industry",
      "Job function",
      "Job title",
      "Seniority",
      "Company size",
      "Company revenue",
      "Department",
      "Organization type",
      "Country",
      "Business location",
    ],
    cta: "Explore B2B Panel",
    to: "/services/market-research/business-panel",
  },
  {
    k: "b2c",
    tag: "B2C",
    t: "B2C Online Research Panel",
    stat: [55, 0, "+"],
    sl: "countries of consumer coverage",
    ic: "users",
    d: "Profiled consumers segmented by demographics, household, lifestyle and purchase behaviour, for single-market and multi-country consumer research.",
    x: [
      "Age",
      "Gender",
      "Location",
      "Household",
      "Education",
      "Employment",
      "Lifestyle",
      "Purchase behaviour",
      "Automotive",
      "Technology",
      "Travel",
      "Food & Beverage",
      "Shopping",
      "Media",
      "Sports",
      "Financial behaviour",
    ],
    cta: "Explore B2C Panel",
    to: "/services/market-research/consumer-panel",
  },
  {
    k: "hc",
    tag: "Healthcare",
    t: "Healthcare Research Panel",
    stat: [474, 0, "K+"],
    sl: "verified healthcare members",
    ic: "heart",
    d: "Healthcare professionals, patients, caregivers, payers and other healthcare audiences, recruited with role and credential checks where applicable.",
    x: [
      "Medical specialties",
      "Therapeutic areas",
      "Professional roles",
      "Departments",
      "Healthcare institutions",
      "Hospital type",
      "Practice characteristics",
      "Country",
      "Licensing credentials where applicable",
    ],
    cta: "Explore Healthcare Panel",
    to: "/services/market-research/healthcare-panel",
  },
];
function OD_Panels() {
  return (
    <div className="od-panels">
      {OD_PANELS.map((p, i) => (
        <RC_Reveal
          as="article"
          key={p.k}
          className={"od-panel od-panel--" + p.k}
          style={{
            "--i": i,
          }}
        >
          <div className="od-panel__head">
            <span className="od-panel__tag">
              <RC_I n={p.ic} s={16} />
              {p.tag}
            </span>
          </div>
          <div className="od-panel__stat">
            <OD_Count to={p.stat[0]} dec={p.stat[1]} suf={p.stat[2]} />
            <span>{p.sl}</span>
          </div>
          <h3>{p.t}</h3>
          <p>{p.d}</p>
          <span className="od-panel__lbl">Key targeting</span>
          <ul className="od-chips">
            {p.x.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          <Link to={p.to} className="od-panel__cta">
            {p.cta} <RC_I n="arrow" s={16} />
          </Link>
        </RC_Reveal>
      ))}
    </div>
  );
}
const OD_INFRA = [
  ["userplus", "Recruitment"],
  ["edit", "Registration"],
  ["shield", "Verification"],
  ["layers", "Profiling"],
  ["msg", "Engagement"],
  ["filter", "Sampling"],
  ["clipboard", "Survey Participation"],
  ["gift", "Reward Management"],
];
function OD_Infra() {
  const [a, setA] = ee.useState(-1);
  const cx = 240,
    cy = 240,
    R = 178;
  return (
    <div className="od-infra__wheel">
      <svg
        viewBox="0 0 480 480"
        role="img"
        aria-label="Panel infrastructure cycle: recruitment, registration, verification, profiling, engagement, sampling, survey participation and reward management"
      >
        <circle cx={cx} cy={cy} r={R} className="od-infra__ring" />
        <circle cx={cx} cy={cy} r={R} className="od-infra__ring2" />
        {OD_INFRA.map(([ic, t], i) => {
          const ang = ((-90 + i * 45) * Math.PI) / 180;
          const x = cx + R * Math.cos(ang),
            y = cy + R * Math.sin(ang);
          return (
            <g
              key={t}
              className={"od-infra__n" + (a === i ? " is-on" : "")}
              onMouseEnter={() => setA(i)}
              onMouseLeave={() => setA(-1)}
              style={{
                "--i": i,
              }}
            >
              <circle cx={x} cy={y} r="30" />
              {ee.createElement(
                "foreignObject",
                {
                  x: x - 12,
                  y: y - 12,
                  width: "24",
                  height: "24",
                },
                <RC_I n={ic} s={24} />,
              )}
              <text x={x} y={y + (Math.sin(ang) > 0.3 ? 50 : -42)} textAnchor="middle" className="od-infra__t">
                {t}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="96" className="od-infra__core" />
        <text x={cx} y={cy - 26} textAnchor="middle" className="od-infra__ck">
          PROPRIETARY PANELS
        </text>
        <text x={cx} y={cy - 2} textAnchor="middle" className="od-infra__p">
          Turn2Opinion
        </text>
        <text x={cx} y={cy + 20} textAnchor="middle" className="od-infra__p">
          MyFrequentRewards
        </text>
        <text x={cx} y={cy + 42} textAnchor="middle" className="od-infra__p">
          MyHealthOpinions
        </text>
      </svg>
    </div>
  );
}
function OD_RegMock() {
  const [ref, v] = RC_useInView(0.3);
  const rows = [
    ["mail", "Email verified", "Double opt-in confirmed"],
    ["mobile", "Phone authenticated", "One-time code"],
    ["cal", "Age validated", "Date of birth check"],
    ["key", "Security question", "Set"],
    ["bot", "CAPTCHA", "Passed"],
  ];
  return (
    <div
      ref={ref}
      className={"od-reg" + (v ? " is-in" : "")}
      role="img"
      aria-label="Illustration of a secure panel registration screen with verification steps"
    >
      <div className="od-reg__bar">
        <span className="od-reg__lock">
          <RC_I n="lock" s={13} />
        </span>
        <span>Secure panel registration</span>
      </div>
      <div className="od-reg__body">
        <div className="od-reg__steps">
          <b className="on" />
          <b className="on" />
          <b className="on" />
          <b />
        </div>
        <span className="od-reg__h">Step 3 of 4 · Verify your details</span>
        {rows.map(([ic, t, s], i) => (
          <div
            key={t}
            className="od-reg__row"
            style={{
              "--i": i,
            }}
          >
            <span className="od-reg__ic">
              <RC_I n={ic} s={16} />
            </span>
            <div>
              <strong>{t}</strong>
              <span>{s}</span>
            </div>
            <span className="od-reg__ok">
              <RC_I n="check" s={14} />
            </span>
          </div>
        ))}
        <div className="od-reg__btn">Continue to profile</div>
      </div>
    </div>
  );
}
const OD_PROF = [
  ["Demographics", "users", ["Age", "Gender", "Location", "Education"], 86],
  ["Professional", "brief", ["Industry", "Job Role", "Seniority", "Department"], 74],
  ["Company", "grid", ["Company Size", "Revenue", "Organization Type"], 62],
  ["Behavioural", "pulse", ["Purchasing", "Product Usage", "Lifestyle", "Interests"], 80],
  ["Healthcare", "heart", ["Specialty", "Department", "Practice Type", "Institution"], 56],
];
function OD_Profile() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"od-prof" + (v ? " is-in" : "")}>
      <div className="od-prof__top">
        <span className="od-prof__av">
          <RC_I n="user" s={22} />
        </span>
        <div>
          <strong>Respondent profile</strong>
          <span>Structure of profile data used for sampling</span>
        </div>
        {null}
      </div>
      {OD_PROF.map(([g, ic, chips, w], i) => (
        <div
          key={g}
          className="od-prof__g"
          style={{
            "--i": i,
          }}
        >
          <div className="od-prof__gh">
            <RC_I n={ic} s={16} />
            <strong>{g}</strong>
            <span className="od-prof__bar">
              <b
                style={{
                  "--w": w + "%",
                }}
              />
            </span>
          </div>
          <ul>
            {chips.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
const OD_ATTR = [
  ["Demographic", ["Gender", "Age", "Marital Status", "Education", "Language", "Ethnicity", "Location"]],
  ["Professional", ["Industry", "Job Role", "Department", "Seniority", "Function", "Company Location"]],
  ["Organization", ["Company Size", "Company Revenue", "Organization Type", "Sector"]],
  [
    "Consumer",
    [
      "Shopping",
      "Travel",
      "Food & Beverage",
      "Automotive",
      "Technology",
      "Media",
      "Sports",
      "Lifestyle",
      "Pet Ownership",
      "Parenting",
    ],
  ],
  [
    "Healthcare",
    [
      "Specialty",
      "Department",
      "Hospital Type",
      "Hospital Bed Type",
      "Professional Role",
      "Practice Characteristics",
      "Ailments",
    ],
  ],
];
function OD_Attr() {
  const [c, setC] = ee.useState(-1);
  return (
    <div className="od-attr">
      <div className="od-attr__tabs" role="tablist" aria-label="Attribute categories">
        <button role="tab" aria-selected={c === -1} className={c === -1 ? "is-on" : ""} onClick={() => setC(-1)}>
          All attributes
        </button>
        {OD_ATTR.map(([g], i) => (
          <button
            key={g}
            role="tab"
            aria-selected={c === i}
            className={"od-attr__t" + i + (c === i ? " is-on" : "")}
            onClick={() => setC(i)}
          >
            {g}
          </button>
        ))}
      </div>
      <div className="od-attr__cloud">
        {OD_ATTR.map(([g, xs], i) => (
          <div
            key={g}
            className={
              "od-attr__grp od-attr__grp" + i + (c === -1 || c === i ? "" : " is-dim") + (c === i ? " is-focus" : "")
            }
          >
            <span className="od-attr__gl">{g}</span>
            {xs.map((x) => (
              <span key={x} className="od-attr__chip">
                {x}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
const OD_LAYERS = [
  ["Registration Validation", "Email, double opt-in, phone and age checks when members join."],
  ["Profile Validation", "Consistency of demographic, professional and healthcare profile data."],
  ["Technical Validation", "Device, location, browser and network checks for duplicates and bots."],
  ["Survey Screening", "Pre-screening, gate questions and study-specific qualification."],
  ["Response Quality", "Attention, speed, straight-lining and open-end review during fieldwork."],
  ["Post-Fieldwork Audit", "Backend review and cleaning before data is delivered."],
];
const OD_CHECKS = [
  ["timer", "Timezone Validation"],
  ["cal", "Age Validation"],
  ["bot", "BOT Detection"],
  ["copy", "Duplicate Detection"],
  ["globe", "GEO-IP Validation"],
  ["shield", "CAPTCHA Controls"],
  ["finger", "Browser Fingerprinting"],
  ["lang", "Browser Language Checks"],
  ["eyeoff", "TOR Detection"],
  ["cookie", "Cookie Validation"],
  ["mail", "Double Opt-In"],
  ["filter", "Screening Filters"],
  ["list", "Gate Survey Screening"],
  ["alert", "Red Herring Questions"],
  ["edit", "Open-End Quality Checks"],
  ["okc", "Pre-Screening Qualification"],
  ["search", "Backend Quality Audits"],
];
function OD_Shield() {
  const [a, setA] = ee.useState(5);
  const [ref, v] = RC_useInView(0.3);
  const shield = (s) => {
    const w = 128 * s,
      h = 300 * s,
      cx = 170,
      top = 200 - 0.52 * h;
    return `M${cx} ${top} L${cx + w} ${top + h * 0.16} V${top + h * 0.48} C${cx + w} ${top + h * 0.78} ${cx + w * 0.5} ${top + h * 0.94} ${cx} ${top + h} C${cx - w * 0.5} ${top + h * 0.94} ${cx - w} ${top + h * 0.78} ${cx - w} ${top + h * 0.48} V${top + h * 0.16} Z`;
  };
  return (
    <div ref={ref} className={"od-qc" + (v ? " is-in" : "")}>
      <div className="od-qc__shield">
        <svg viewBox="0 0 340 380" role="img" aria-label="Six nested layers of data quality validation">
          {OD_LAYERS.map((_, i) => {
            const s = 1 - i * 0.15;
            return (
              <path
                key={i}
                d={shield(s)}
                className={"od-qc__l od-qc__l" + i + (a === i ? " is-on" : "")}
                style={{
                  "--i": i,
                }}
                onMouseEnter={() => setA(i)}
              />
            );
          })}
          {ee.createElement(
            "foreignObject",
            {
              x: "152",
              y: "182",
              width: "36",
              height: "36",
            },
            <RC_I n="okc" s={36} className="od-qc__core" />,
          )}
        </svg>
      </div>
      <ol className="od-qc__list">
        {OD_LAYERS.map(([t, d], i) => (
          <li
            key={t}
            className={a === i ? "is-on" : ""}
            onMouseEnter={() => setA(i)}
            onFocus={() => setA(i)}
            tabIndex="0"
            style={{
              "--i": i,
            }}
          >
            <span className="od-qc__n">L{i + 1}</span>
            <div>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
function OD_Funnel() {
  const st = [
    "Large Registered Audience",
    "Profiled Respondents",
    "Targeted Sample",
    "Screened Participants",
    "Quality-Validated Responses",
    "Research-Ready Dataset",
  ];
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"od-fun" + (v ? " is-in" : "")}>
      <svg viewBox="0 0 960 220" preserveAspectRatio="none" className="od-fun__svg" aria-hidden="true">
        {st.map((_, i) => {
          const x = i * 160,
            h1 = 200 - i * 28,
            h2 = 200 - (i + 1) * 28;
          return (
            <path
              key={i}
              d={`M${x + 2} ${110 - h1 / 2} L${x + 158} ${110 - h2 / 2} L${x + 158} ${110 + h2 / 2} L${x + 2} ${110 + h1 / 2} Z`}
              className={"od-fun__seg od-fun__seg" + i}
              style={{
                "--i": i,
              }}
            />
          );
        })}
      </svg>
      <ol className="od-fun__labels">
        {st.map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="od-fun__n">{String(i + 1).padStart(2, "0")}</span>
            <strong>{t}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
function OD_Survey() {
  const [s, setS] = ee.useState(0);
  const [ref, v] = RC_useInView(0.3);
  ee.useEffect(() => {
    if (!v) return;
    if (
      window.__frLite === true ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    )
      return;
    const id = setInterval(() => setS((x) => (x + 1) % 4), 2600);
    return () => clearInterval(id);
  }, [v]);
  const steps = ["Question", "Response", "Validation", "Submission"];
  const opts = ["Groceries", "Electronics", "Personal care", "None of these"];
  return (
    <div ref={ref} className="od-sv">
      <div className="od-sv__steps" role="tablist" aria-label="Survey stages">
        {steps.map((t, i) => (
          <button
            key={t}
            role="tab"
            aria-selected={s === i}
            className={(s === i ? "is-on " : "") + (i < s ? "is-done" : "")}
            onClick={() => setS(i)}
          >
            <span>{i + 1}</span>
            {t}
          </button>
        ))}
      </div>
      <div className="od-sv__win">
        <div className="od-sv__chrome">
          <i />
          <i />
          <i />
          <span>survey · question 4 of 18</span>
        </div>
        <div className="od-sv__body">
          <div className="od-sv__prog">
            <b
              style={{
                width: s === 3 ? "100%" : "24%",
              }}
            />
          </div>
          {s < 3 ? (
            <div key="q">
              <span className="od-sv__q">
                Which of these product categories have you bought in the past three months?
              </span>
              <span className="od-sv__hint">Select all that apply</span>
              <ul className="od-sv__opts">
                {opts.map((o, i) => (
                  <li key={o} className={s >= 1 && (i === 0 || i === 2) ? "is-sel" : ""}>
                    <span className="od-sv__box">{s >= 1 && (i === 0 || i === 2) && <RC_I n="check" s={12} />}</span>
                    {o}
                  </li>
                ))}
              </ul>
              {s === 2 && (
                <div className="od-sv__val">
                  {["Attention check", "Response time", "Answer consistency"].map((t) => (
                    <span key={t}>
                      <RC_I n="okc" s={14} />
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div key="done" className="od-sv__done">
              <RC_I n="okc" s={40} />
              <strong>Response submitted</strong>
              <span>Passed applicable quality checks and added to the dataset</span>
            </div>
          )}
        </div>
      </div>
      <p className="od-sv__cap">Interface concept · no respondent data shown</p>
    </div>
  );
}
const OD_HOW = [
  ["Define", "Agree audience, markets, quotas and incidence assumptions."],
  ["Recruit", "Invite from our panels and targeted recruitment sources."],
  ["Profile", "Match invitations to stored profile attributes."],
  ["Screen", "Qualify respondents against study criteria."],
  ["Collect", "Field the survey with live quota and progress monitoring."],
  ["Validate", "Apply technical, behavioural and response-quality checks."],
  ["Deliver", "Hand over clean, research-ready data in your format."],
];
function OD_How() {
  const [a, setA] = ee.useState(0);
  const cx = 220,
    cy = 220,
    R = 160;
  return (
    <div className="od-how">
      <svg viewBox="0 0 440 440" role="group" aria-label="How online data collection works">
        <circle cx={cx} cy={cy} r={R} className="od-how__ring" />
        <circle
          cx={cx}
          cy={cy}
          r={R}
          className="od-how__prog"
          strokeDasharray={`${(2 * Math.PI * R * (a + 1)) / 7} 2000`}
          transform={`rotate(-90 ${cx} ${cy})`}
        />
        {OD_HOW.map(([t], i) => {
          const ang = ((-90 + i * (360 / 7)) * Math.PI) / 180;
          const x = cx + R * Math.cos(ang),
            y = cy + R * Math.sin(ang);
          return (
            <g
              key={t}
              className={"od-how__n" + (a === i ? " is-on" : "") + (i < a ? " is-done" : "")}
              tabIndex="0"
              role="button"
              aria-pressed={a === i}
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
              onClick={() => setA(i)}
            >
              <circle cx={x} cy={y} r="34" />
              <text x={x} y={y + 5} textAnchor="middle">
                {t}
              </text>
            </g>
          );
        })}
        {ee.createElement(
          "foreignObject",
          {
            x: cx - 100,
            y: cy - 70,
            width: "200",
            height: "140",
          },
          <div className="od-how__c" key={a}>
            <span>
              {"Step "}
              {a + 1}
              {" of 7"}
            </span>
            <strong>{OD_HOW[a][0]}</strong>
            <p>{OD_HOW[a][1]}</p>
          </div>,
        )}
      </svg>
      <ol className="od-how__list">
        {OD_HOW.map(([t, d], i) => (
          <li key={t}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
function OD_Page({ a, n }) {
  const Faq = FaqList,
    Guide = GuideLink,
    Form = EnquiryForm,
    Badges = TrustBadges;
  const [active, setActive] = ee.useState("od-overview");
  const nav = [
    ["od-overview", "Overview"],
    ["od-panels", "Panels"],
    ["od-coverage", "Coverage"],
    ["od-quality", "Quality"],
    ["od-survey", "Online surveys"],
    ["od-how", "How it works"],
    ["od-why", "Why us"],
    ["od-faq", "FAQ"],
    ["od-enquire", "Contact"],
  ];
  const s = a.services.findIndex((o) => o.slug === n.slug);
  const related = [1, 2, 3].map((o) => a.services[(s + o) % a.services.length]);
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
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
    return () => io.disconnect();
  }, []);
  const faqs = [
    {
      q: "What are online data collection services?",
      a: "Online data collection services cover everything needed to gather survey responses over the internet: defining the audience, recruiting and profiling respondents, sampling, distributing the survey, quality control and delivering clean data. We support the full process rather than only supplying sample.",
    },
    {
      q: "What does an online data collection company do?",
      a: "An online data collection company recruits and manages research participants, matches them to study criteria, distributes surveys, monitors fieldwork and validates responses, so research teams receive data they can analyse with confidence.",
    },
    {
      q: "How does Frequent Research support online market research data collection?",
      a: "We combine proprietary online research panels, targeted respondent recruitment, profile-based sampling, quota management and multi-layer quality controls. One point of contact coordinates feasibility, fieldwork and data delivery.",
    },
    {
      q: "What types of respondents can you recruit?",
      a: "B2B business professionals and decision-makers, B2C consumers, and healthcare audiences including HCPs, patients, caregivers and payers. Recruitment can be targeted by demographic, professional, behavioural and healthcare attributes.",
    },
    {
      q: "Which countries are covered by your online research panels?",
      a: "Our B2C panel covers 55+ countries and our healthcare panel 30+ countries, with 10+ additional healthcare partner markets. Coverage spans the Americas, Europe, Asia-Pacific, and MENA and Africa. Share your markets and we will confirm feasibility.",
    },
    {
      q: "How do you validate online survey respondents?",
      a: "Validation starts at registration with email verification, double opt-in and other checks, continues through profile and technical validation, and extends to survey screening, response-quality review and post-fieldwork audits.",
    },
    {
      q: "What quality checks are used during online survey data collection?",
      a: "Depending on study requirements, applicable controls may include duplicate and bot detection, GEO-IP and timezone validation, browser fingerprinting, TOR detection, red herring questions, open-end quality checks and backend audits.",
    },
    {
      q: "Can you recruit B2B decision-makers?",
      a: "Yes. Our B2B online research panel includes 2.85M+ verified business professionals, targetable by industry, job function, title, seniority, company size, revenue and location.",
    },
    {
      q: "Can you recruit healthcare professionals for research?",
      a: "Yes. Our healthcare research panel has 474,000+ verified members, including healthcare professionals across specialties and roles, as well as patients and caregivers. Credential checks are applied where applicable.",
    },
    {
      q: "Can you support multi-country research projects?",
      a: "Yes. We support single-market studies and multi-country programmes, with consistent quotas and standardized quality controls across markets.",
    },
  ];
  return (
    <div className="od rc">
      <section className="od-hero">
        <div className="container od-hero__in">
          <div className="od-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to="/services">Services</Link>
              </span>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="od-eyebrow">
              <i />
              Online Data Collection
            </span>
            <HeroH1>Online Data Collection Services for Global Market Research</HeroH1>
            <p className="od-hero__pos">Turning research requirements into reliable, research-ready data.</p>
            <p className="od-hero__body">
              {"Frequent Research provides technology-enabled "}
              <strong>online data collection services</strong>
              {
                " for B2B, B2C, and Healthcare research programs. Through proprietary research panels, targeted respondent recruitment, detailed profiling, and multi-layer quality controls, we help organizations access research-ready respondents across global markets."
              }
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg od-btn-main" href="#od-enquire" onClick={rcScrollTo("od-enquire")}>
                Request a Feasibility
              </a>
              <a className="btn btn--ghost btn--lg" href="#od-panels" onClick={rcScrollTo("od-panels")}>
                Explore Our Panels
              </a>
            </div>
            <p className="od-hero__trust">
              {"ISO 9001:2015 "}
              <i />
              {" ISO 27001:2013 "}
              <i />
              {" ISO 20252:2019 "}
              <i />
              {" ESOMAR Member"}
            </p>
          </div>
          <div className="od-hero__viz">
            <OD_HeroMap />
          </div>
        </div>
      </section>
      <div className="trustbar od-trust">
        <div className="container trustbar__inner">
          <span>Certified & accountable</span>
          <Badges withEsomar />
          <span className="od-msme">
            <strong>MSME</strong>
            <small>Registered enterprise</small>
          </span>
        </div>
      </div>
      <section className="od-glance" aria-label="At a glance">
        <div className="container">
          <div className="od-glance__grid">
            <div className="od-glance__lbl">
              <span className="rc-kicker">At a glance</span>
              <p>Panel reach behind our online data collection.</p>
            </div>
            {[
              [2.85, 2, "M+", "B2B business professionals"],
              [55, 0, "+", "Countries \xB7 B2C panel coverage"],
              [474, 0, "K+", "Healthcare panel members"],
              [30, 0, "+", "Healthcare panel countries"],
              [10, 0, "+", "Additional healthcare partner markets"],
            ].map(([to, d, suf, t]) => (
              <div key={t} className="od-glance__item">
                <OD_Count to={to} dec={d} suf={suf} />
                <span>{t}</span>
              </div>
            ))}
          </div>
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
      <section className="rc-sec" id="od-overview">
        <div className="container">
          <div className="od-split">
            <RC_Head kicker="What we do" title="Online Data Collection Built Around Your Research Requirements" />
            <div>
              <p className="rc-lead">
                We support the complete online research data collection lifecycle. Not just survey respondents, but the
                infrastructure that turns a research brief into validated data.
              </p>
              <p className="od-muted">
                From audience definition and online respondent recruitment to sampling, survey distribution, quality
                control and delivery, one team manages every stage of your market research data collection.
              </p>
            </div>
          </div>
          <OD_Flow />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="od-panels">
        <div className="container">
          <RC_Head
            center
            kicker="Online research panel provider"
            title="Global Online Research Panels"
            intro="Three proprietary panels, each built and profiled for a different audience. Together they give you one survey panel provider for business, consumer and healthcare research."
          />
          <OD_Panels />
        </div>
      </section>
      <section className="rc-sec" id="od-coverage">
        <div className="container">
          <RC_Head
            kicker="Global data collection services"
            title="Global Market Research Data Collection"
            intro="Single-market studies or multi-country programmes across four regions. Select a region to see where we collect data."
          />
          <OD_Coverage />
        </div>
      </section>
      <section className="rc-sec od-sec--navy" id="od-why">
        <div className="container">
          <RC_Head
            light
            kicker="Why Frequent Research"
            title="More Than Respondents. A Structured Data Collection Infrastructure."
          />
          <div className="od-why">
            {[
              [
                "target",
                "Targeted Recruitment",
                "Reach respondents according to specific demographic, professional, behavioural, geographic, and research criteria.",
              ],
              [
                "layers",
                "Detailed Profiling",
                "Structured respondent profiles support precise sample segmentation and audience targeting.",
              ],
              [
                "shield",
                "Multi-Layer Validation",
                "Identity, profile, behavioural, technical, and survey-level checks support panel integrity.",
              ],
              [
                "globe",
                "Global Scalability",
                "Support for single-market studies as well as multi-country research programs.",
              ],
              [
                "filter",
                "Research-Ready Sampling",
                "Respondents matched to study-specific screening criteria and sample requirements.",
              ],
              [
                "pulse",
                "Continuous Quality Monitoring",
                "Participation patterns, survey behaviour, profile activity, and response quality are monitored.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="od-why__card"
                style={{
                  "--i": i,
                }}
              >
                <div className="od-why__top">
                  <span className="od-why__ic">
                    <RC_I n={ic} s={22} />
                  </span>
                  <span className="od-why__n">0{i + 1}</span>
                </div>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container od-infra">
          <div>
            <RC_Head kicker="Panel infrastructure" title="Proprietary Online Research Panel Infrastructure" />
            <p className="rc-lead">
              We recruit and manage research participants through our own digital platforms, so we know who our
              respondents are and how they were verified.
            </p>
            <ul className="od-plat">
              <li>
                <Link to="/portals/turn2opinion">
                  <strong>Turn2Opinion.com</strong>
                  <span>Consumers, business professionals and teens</span>
                  <RC_I n="arrow" s={16} />
                </Link>
              </li>
              <li>
                <Link to="/portals/myfrequentrewards">
                  <strong>MyFrequentRewards.com</strong>
                  <span>Consumer, business and teen research community</span>
                  <RC_I n="arrow" s={16} />
                </Link>
              </li>
              <li>
                <Link to="/portals/myhealthopinions">
                  <strong>MyHealthOpinions.com</strong>
                  <span>Healthcare professionals, patients and caregivers</span>
                  <RC_I n="arrow" s={16} />
                </Link>
              </li>
            </ul>
          </div>
          <OD_Infra />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <RC_Head
            kicker="Respondent recruitment services"
            title="Targeted Online Respondent Recruitment"
            intro="Online respondent recruitment built around the profile of the people you need to hear from."
          />
          <div className="od-rec">
            {[
              [
                "brief",
                "Professional targeting",
                "Industry, job function, designation, seniority and company characteristics.",
              ],
              ["users", "Demographic targeting", "Age, gender, location, household and socioeconomic characteristics."],
              ["pulse", "Behavioural targeting", "Purchase behaviour, product usage, lifestyle and interests."],
              [
                "heart",
                "Healthcare targeting",
                "Specialty, role, department, institution and healthcare practice characteristics.",
              ],
              [
                "send",
                "Digital recruitment",
                "Targeted email, digital campaigns and social media engagement where appropriate.",
              ],
              ["refresh", "Re-engagement", "Ongoing panel engagement and profile maintenance."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className={"od-rec__tile od-rec__tile" + i}
                style={{
                  "--i": i,
                }}
              >
                <RC_I n={ic} s={22} />
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container od-regwrap">
          <OD_RegMock />
          <div>
            <RC_Head kicker="Respondent validation" title="Structured Registration & Double Opt-In" />
            <p className="od-muted">Panel registration can include:</p>
            <ul className="od-ticks">
              {[
                "Email verification",
                "Double opt-in",
                "Phone authentication",
                "Age validation",
                "Demographic validation",
                "CAPTCHA",
                "Security questions",
                "Profile completion",
              ].map((x) => (
                <li key={x}>
                  <RC_I n="check" s={16} />
                  {x}
                </li>
              ))}
            </ul>
            <p className="od-muted">
              These mechanisms help establish participant authenticity and reduce fraudulent or duplicate participation
              before anyone is invited to a survey.
            </p>
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container od-profwrap">
          <div>
            <RC_Head kicker="Survey sampling" title="Detailed Respondent Profiling for Precision Sampling" />
            <p className="rc-lead">
              Profiles are stored in structured groups, so invitations go to people who already match your criteria and
              screen-outs stay low.
            </p>
            <p className="od-muted">
              Profiles are refreshed through ongoing engagement, keeping market research sampling accurate over time.
            </p>
          </div>
          <OD_Profile />
        </div>
        <div className="container od-attrwrap">
          <RC_Head
            kicker="Data universe"
            title="Audience Attributes for Targeted Sampling"
            intro="Attributes we can target on, organised by category. Select a category to focus the view."
          />
          <OD_Attr />
        </div>
      </section>
      <section className="rc-sec od-sec--q" id="od-quality">
        <div className="container">
          <RC_Head
            kicker="Survey quality control"
            title="Multi-Layer Data Quality & Respondent Validation"
            intro="Quality is checked at six points, from the moment a member registers to the final audit before delivery."
          />
          <OD_Shield />
          <div className="od-checks">
            <p className="od-checks__lead">Depending on study requirements, applicable controls may include…</p>
            <ul>
              {OD_CHECKS.map(([ic, t], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i % 6,
                  }}
                >
                  <RC_I n={ic} s={16} />
                  {t}
                </RC_Reveal>
              ))}
            </ul>
          </div>
          <div className="od-funwrap">
            <h3>From registered audience to research-ready dataset</h3>
            <OD_Funnel />
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="od-survey">
        <div className="container od-svwrap">
          <div>
            <RC_Head kicker="Online survey data collection services" title="Online Survey Data Collection Services" />
            <p className="od-muted">We support online survey data collection for:</p>
            <ul className="od-chips od-chips--lg">
              {[
                "Quantitative research",
                "Concept testing",
                "Brand research",
                "Customer experience",
                "Product research",
                "Usage & attitude studies",
                "Pricing research",
                "Segmentation studies",
                "Advertising research",
                "Technology research",
                "Healthcare research",
                "B2B research",
                "Consumer research",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <p className="od-muted">
              {"Need the survey programmed too? See "}
              <Link to="/services/market-research/quantitative-research">quantitative research</Link>, or bring your own
              link and we handle sampling and fieldwork.
            </p>
          </div>
          <OD_Survey />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Market research fieldwork services" title="End-to-End Market Research Fieldwork Support" />
          <div className="od-matrix" role="table" aria-label="Fieldwork support matrix">
            <div className="od-matrix__row od-matrix__row--h" role="row">
              <span role="columnheader">Requirement</span>
              <span role="columnheader">Frequent Research support</span>
            </div>
            {[
              ["target", "Sample Design", "Target audience & quota planning"],
              ["userplus", "Respondent Recruitment", "B2B / B2C / Healthcare recruitment"],
              ["filter", "Online Sampling", "Profile-based sample targeting"],
              ["send", "Survey Distribution", "Targeted survey invitations"],
              ["list", "Screening", "Qualification & eligibility filters"],
              ["shield", "Quality Control", "Multi-layer validation"],
              ["pulse", "Monitoring", "Fieldwork performance tracking"],
              ["database", "Data Collection", "Structured response collection"],
              ["file", "Reporting Support", "Research-ready output"],
            ].map(([ic, r, d]) => (
              <div key={r} className="od-matrix__row" role="row">
                <span role="cell" className="od-matrix__req">
                  <RC_I n={ic} s={18} />
                  {r}
                </span>
                <span role="cell" className="od-matrix__sup">
                  <RC_I n="check" s={15} />
                  {d}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="od-how">
        <div className="container">
          <RC_Head
            center
            kicker="How it works"
            title="Seven steps from brief to validated data"
            intro="Hover or tap a step to see what happens at each stage."
          />
          <OD_How />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Research types" title="Methodologies and audiences we support" />
          <div className="od-meth">
            {[
              [
                "bars",
                "Quantitative Research",
                "Large-scale online surveys and structured data collection.",
                "/services/market-research/quantitative-research",
              ],
              [
                "msg",
                "Qualitative Recruitment",
                "Recruitment of qualified participants for IDIs, FGDs and other qualitative research methodologies.",
                "/services/market-research/qualitative-research",
              ],
              ["layers", "Hybrid Research", "Combination of quantitative and qualitative recruitment.", null],
              [
                "brief",
                "B2B Research",
                "Business decision-makers, professionals and industry specialists.",
                "/services/market-research/business-panel",
              ],
              [
                "users",
                "B2C Research",
                "Consumers segmented by demographic, behavioural and lifestyle attributes.",
                "/services/market-research/consumer-panel",
              ],
              [
                "heart",
                "Healthcare Research",
                "HCPs, patients, caregivers and other healthcare audiences.",
                "/services/market-research/healthcare-panel",
              ],
            ].map(([ic, t, d, to], i) => (
              <RC_Reveal
                key={t}
                className="od-meth__card"
                style={{
                  "--i": i % 3,
                }}
              >
                <span className="od-meth__ic">
                  <RC_I n={ic} s={20} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                  {to && (
                    <Link to={to} className="rc-link">
                      {"Learn more "}
                      <RC_I n="arrow" s={14} />
                    </Link>
                  )}
                </div>
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec od-sec--navy">
        <div className="container">
          <RC_Head
            light
            kicker="Recruitment process"
            title="The respondent journey"
            intro="How a panel member moves from registration to reward."
          />
          <ol className="od-tl">
            {[
              [
                "edit",
                "Free Registration",
                "Participants register through a secure platform and complete email verification.",
              ],
              [
                "user",
                "Profile Completion",
                "Members provide relevant demographic, professional, behavioural, or healthcare information.",
              ],
              ["filter", "Survey Matching", "Research invitations are matched to relevant profile and study criteria."],
              ["clipboard", "Survey Participation", "Eligible participants complete validated research studies."],
              [
                "shield",
                "Quality Validation",
                "Responses are reviewed using applicable technical, behavioural and survey-level quality controls.",
              ],
              [
                "gift",
                "Reward Redemption",
                "Eligible participants can redeem rewards according to applicable program terms and payout availability.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="od-tl__dot">
                  <RC_I n={ic} s={18} />
                </span>
                <span className="od-tl__n">0{i + 1}</span>
                <strong>{t}</strong>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Capabilities" title="Data collection capabilities" />
          <div className="od-cap">
            {[
              ["globe", "Global Sampling"],
              ["clipboard", "Online Surveys"],
              ["userplus", "Panel Recruitment"],
              ["brief", "B2B Recruitment"],
              ["users", "B2C Recruitment"],
              ["heart", "Healthcare Recruitment"],
              ["target", "Targeted Sampling"],
              ["okc", "Respondent Validation"],
              ["database", "Survey Fieldwork"],
              ["map", "Multi-Country Studies"],
              ["sliders", "Quota Management"],
              ["shield", "Quality Control"],
            ].map(([ic, t]) => (
              <div key={t} className="od-cap__item">
                <RC_I n={ic} s={20} />
                <span>{t}</span>
              </div>
            ))}
          </div>
          <div className="od-cmp">
            <h3>Capability matrix by audience</h3>
            <div className="rc-scroll">
              <table>
                <thead>
                  <tr>
                    <th scope="col">Capability</th>
                    <th scope="col">B2B</th>
                    <th scope="col">B2C</th>
                    <th scope="col">Healthcare</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Online Surveys", 1, 1, 1],
                    ["Targeted Recruitment", 1, 1, 1],
                    ["Profile-Based Sampling", 1, 1, 1],
                    ["Demographic Targeting", 1, 1, 1],
                    ["Behavioural Targeting", 1, 1, 1],
                    ["Professional Targeting", 1, 0, 1],
                    ["Healthcare Specialty", 0, 0, 1],
                    ["Company Attributes", 1, 0, 2],
                    ["Multi-Country Research", 1, 1, 1],
                    ["Quality Validation", 1, 1, 1],
                  ].map(([t, ...v]) => (
                    <tr key={t}>
                      <th scope="row">{t}</th>
                      {v.map((x, i) => (
                        <td key={i}>
                          {x === 1 ? (
                            <span className="od-yes" aria-label="Yes">
                              <RC_I n="check" s={15} />
                            </span>
                          ) : x === 2 ? (
                            <span className="od-part">
                              <RC_I n="check" s={15} />
                              {" where applicable"}
                            </span>
                          ) : (
                            <span className="od-no" aria-label="Not applicable">
                              —
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <RC_Head kicker="Use cases" title="What clients use online data collection for" />
          <div className="od-use">
            {[
              ["compass", "Market Entry Research", "Understand new markets and target audiences."],
              ["users", "Customer Research", "Capture customer attitudes, behaviours and experiences."],
              ["box", "Product Research", "Gather feedback throughout product development."],
              ["award", "Brand Research", "Measure awareness, perception and positioning."],
              ["brief", "B2B Decision-Maker Research", "Reach professionals according to industry and role."],
              [
                "heart",
                "Healthcare Research",
                "Recruit relevant healthcare audiences for pharmaceutical and medical research.",
              ],
            ].map(([ic, t, d]) => (
              <div key={t} className="od-use__card">
                <RC_I n={ic} s={20} />
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="od-scen">
            <RC_Head kicker="Applications" title="Built for Complex Research Requirements" />
            <div className="od-scen__grid">
              {[
                ["Global B2B Study", ["Multiple industries", "Job functions", "Seniority"]],
                ["Consumer Segmentation", ["Demographics", "Behaviours", "Lifestyle"]],
                ["Healthcare Study", ["Specialty", "Role", "Institution", "Geography"]],
                ["Multi-Country Survey", ["Multiple markets", "Quotas", "Standardized quality controls"]],
              ].map(([t, xs], i) => (
                <RC_Reveal
                  key={t}
                  className="od-scen__card"
                  style={{
                    "--i": i,
                  }}
                >
                  <span className="od-scen__n">0{i + 1}</span>
                  <h3>{t}</h3>
                  <div className="od-scen__eq">
                    {xs.map((x, j) =>
                      ee.createElement(
                        ee.Fragment,
                        {
                          key: x,
                        },
                        j > 0 && <b>+</b>,
                        <span>{x}</span>,
                      ),
                    )}
                  </div>
                </RC_Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries we support" />
          <div className="od-ind">
            {[
              ["Pill", "Healthcare & Pharmaceuticals"],
              ["ShoppingBag", "FMCG"],
              ["Building2", "Retail"],
              ["Car", "Automotive"],
              ["Cpu", "Technology"],
              ["Banknote", "Financial Services"],
              ["Landmark", "Banking"],
              ["Umbrella", "Insurance"],
              ["Zap", "Energy"],
              ["FlaskConical", "Chemicals"],
              ["Factory", "Manufacturing"],
              ["RadioTower", "Telecommunications"],
              ["Clapperboard", "Media & Entertainment"],
              ["Plane", "Travel & Hospitality"],
              ["UtensilsCrossed", "Food & Beverage"],
              ["Briefcase", "Professional Services"],
            ].map(([ic, t]) => (
              <Link key={t} to="/industries-case-studies" className="od-ind__tile">
                <IndustryIcon name={ic} size={20} />
                <span>{t}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint" id="od-faq">
        <div className="container split">
          <h2 className="split__title">Online data collection: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          <Guide vertical={a.slug} service={n.slug} />
        </div>
      </section>
      <section className="od-cta" id="od-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Request a feasibility</span>
            <h2>Have a Research Requirement?</h2>
            <p>
              Tell us your target audience, markets, sample requirements and research methodology. Our team can help
              assess feasibility and develop a suitable data collection approach.
            </p>
            <p className="od-cta__line">
              {"B2B "}
              <i />
              {" B2C "}
              <i />
              {" Healthcare "}
              <i />
              {" Global Markets"}
            </p>
            <div className="od-cta__btns">
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk">
                Talk to Our Research Team
              </Link>
            </div>
            <h3>Related services</h3>
            <ul className="od-cta__rel">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link to={`/services/${a.slug}/${o.slug}`}>{o.name}</Link>
                </li>
              ))}
              <li>
                <Link to="/services/market-research">Market Research Services</Link>
              </li>
              <li>
                <Link to="/about-us">About Frequent Research</Link>
              </li>
            </ul>
          </div>
          <div className="card-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { OD_Page };
