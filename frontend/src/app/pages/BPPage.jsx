import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, GuideLink } from './VerticalPage.jsx';
import { SERVICE_INDUSTRIES, WU_DATA } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { odP } from './QNTPage.jsx';
import { OD_Count } from './CATIPage.jsx';

const BP_NODES = [
  ["crown", "C-Suite"],
  ["monitor", "IT"],
  ["cart", "Procurement"],
  ["megaphone", "Marketing"],
  ["wallet", "Finance"],
  ["users", "HR"],
  ["sliders", "Operations"],
  ["trend", "Sales"],
  ["gear", "Engineering"],
  ["heart", "Healthcare"],
  ["factory", "Manufacturing"],
  ["cpu", "Technology"],
];
function BP_Network() {
  const cx = 300,
    cy = 250,
    R = 190;
  const [ref, v] = RC_useInView(0.2);
  return (
    <div ref={ref} className={"bp-net" + (v ? " is-in" : "")}>
      <svg
        viewBox="-70 0 740 500"
        role="img"
        aria-label="Business panel network connecting C-suite, IT, procurement, marketing, finance, HR, operations, sales, engineering, healthcare, manufacturing and technology professionals"
      >
        <circle cx={cx} cy={cy} r={R + 34} className="bp-net__ring" />
        <circle cx={cx} cy={cy} r={R - 70} className="bp-net__ring bp-net__ring--in" />
        {BP_NODES.map((_, i) => {
          const a = ((-90 + i * 30) * Math.PI) / 180,
            b = ((-90 + ((i + 5) % 12) * 30) * Math.PI) / 180;
          return (
            <path
              key={"c" + i}
              d={`M${cx + R * Math.cos(a)} ${cy + R * Math.sin(a)} Q${cx} ${cy} ${cx + R * Math.cos(b)} ${cy + R * Math.sin(b)}`}
              className="bp-net__cross"
              style={{
                "--i": i,
              }}
            />
          );
        })}
        {BP_NODES.map(([ic, t], i) => {
          const a = ((-90 + i * 30) * Math.PI) / 180;
          const x = cx + R * Math.cos(a),
            y = cy + R * Math.sin(a);
          const right = Math.cos(a) > 0.3,
            left = Math.cos(a) < -0.3;
          return (
            <g
              key={t}
              className="bp-net__node"
              style={{
                "--i": i,
              }}
            >
              <line x1={cx} y1={cy} x2={x} y2={y} className="bp-net__spoke" pathLength="1" />
              <circle cx={x} cy={y} r="22" className="bp-net__dot" />
              {ee.createElement(
                "foreignObject",
                {
                  x: x - 10,
                  y: y - 10,
                  width: "20",
                  height: "20",
                },
                <RC_I n={ic} s={20} />,
              )}
              <text
                x={right ? x + 30 : left ? x - 30 : x}
                y={left || right ? y + 5 : y < cy ? y - 32 : y + 40}
                textAnchor={right ? "start" : left ? "end" : "middle"}
                className="bp-net__lbl"
              >
                {t}
              </text>
            </g>
          );
        })}
        <circle r="3.2" className="bp-net__pkt">
          {ee.createElement("animateMotion", {
            dur: "7s",
            repeatCount: "indefinite",
            path: `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`,
          })}
        </circle>
        <circle r="3.2" className="bp-net__pkt bp-net__pkt--b">
          {ee.createElement("animateMotion", {
            dur: "9s",
            begin: "2s",
            repeatCount: "indefinite",
            path: `M${cx} ${cy + R} A${R} ${R} 0 1 1 ${cx + 0.1} ${cy + R}`,
          })}
        </circle>
        <rect x={cx - 82} y={cy - 46} width="164" height="92" rx="20" className="bp-net__core" />
        <text x={cx} y={cy - 8} textAnchor="middle" className="bp-net__ck">
          BUSINESS
        </text>
        <text x={cx} y={cy + 14} textAnchor="middle" className="bp-net__ck">
          PANEL
        </text>
        <text x={cx} y={cy + 32} textAnchor="middle" className="bp-net__cs">
          2.85M+ professionals
        </text>
      </svg>
      <ol className="bp-net__flow">
        {["Professionals", "Companies", "Functions", "Decisions"].map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}
function BP_Problem() {
  const [ref, v] = RC_useInView(0.3);
  const steps = [
    "Broad audience",
    "Wrong professional",
    "Poor qualification",
    "Weak sample",
    "Unreliable research decision",
  ];
  return (
    <div ref={ref} className={"bp-prob" + (v ? " is-in" : "")}>
      <ol className="bp-prob__cascade">
        {steps.map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
              "--w": 100 - i * 11 + "%",
            }}
          >
            <span>0{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
      <div className="bp-prob__turn">
        <RC_I n="refresh" s={18} />
        Instead
      </div>
      <div className="bp-prob__fix">
        <RC_I n="target" s={22} />
        <strong>Precisely profiled B2B respondents</strong>
        <span>Matched on the professional and company attributes your research depends on.</span>
      </div>
    </div>
  );
}
const BP_SOL = [
  ["TARGET", "Who needs to be reached?"],
  ["PROFILE", "Which professional and company attributes matter?"],
  ["QUALIFY", "Which respondents meet the research criteria?"],
  ["VERIFY", "Which quality and authenticity controls apply?"],
  ["SAMPLE", "Which qualified respondents can participate?"],
];
function BP_Solution() {
  const [a, setA] = ee.useState(0);
  const cx = 170,
    cy = 170;
  return (
    <div className="bp-sol">
      <svg
        viewBox="0 0 340 340"
        className="bp-sol__eye"
        role="group"
        aria-label="Five-step framework from target to sample"
      >
        {BP_SOL.map(([t], i) => (
          <circle
            key={t}
            cx={cx}
            cy={cy}
            r={160 - i * 30}
            className={"bp-sol__ring bp-sol__ring" + i + (a === i ? " is-on" : "")}
            onMouseEnter={() => setA(i)}
            onClick={() => setA(i)}
          />
        ))}
        {BP_SOL.map(([t], i) => (
          <text
            key={t}
            x={cx}
            y={cy - 160 + i * 30 + 19}
            textAnchor="middle"
            className={"bp-sol__t" + (a === i ? " is-on" : "")}
          >
            {t}
          </text>
        ))}
        <circle cx={cx} cy={cy} r="14" className="bp-sol__dot" />
      </svg>
      <ol className="bp-sol__list">
        {BP_SOL.map(([t, d], i) => (
          <li key={t} className={a === i ? "is-on" : ""}>
            <button onMouseEnter={() => setA(i)} onFocus={() => setA(i)} onClick={() => setA(i)} aria-pressed={a === i}>
              <span className="bp-sol__n">0{i + 1}</span>
              <strong>{t.charAt(0) + t.slice(1).toLowerCase()}</strong>
              <span className="bp-sol__q">{d}</span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
const BP_WHO = {
  Seniority: [
    ["crown", "C-Suite", "CEOs, CFOs, CIOs and other chief officers for strategic research."],
    ["award", "Executive Leadership", "Presidents, VPs and heads of business units."],
    ["flag", "Directors", "Leaders who own budgets and functional strategy."],
    ["users", "Senior Managers", "People who shape and implement departmental decisions."],
    ["user", "Managers", "Team leads who influence tools, suppliers and processes."],
    ["brief", "Professionals", "Specialists and practitioners who use products day to day."],
    ["building", "Business Owners", "Owners of small and medium-sized businesses."],
    ["rocket", "Entrepreneurs", "Founders building and scaling new ventures."],
  ],
  Functions: [
    ["monitor", "IT & Technology", "Technology decision-makers and practitioners."],
    ["cart", "Procurement", "Professionals involved in purchasing and supplier decisions."],
    ["wallet", "Finance", "Finance leaders, controllers and analysts."],
    ["megaphone", "Marketing", "Brand, digital and marketing professionals."],
    ["trend", "Sales", "Sales leaders and commercial teams."],
    ["users", "Human Resources", "HR, talent and people-operations professionals."],
    ["sliders", "Operations", "Operations and process owners."],
    ["gear", "Engineering", "Engineers and technical specialists."],
    ["scale", "Legal", "Legal and compliance professionals."],
    ["truck", "Supply Chain", "Logistics and supply-chain professionals."],
    ["flask", "Research & Development", "R&D and product-development teams."],
    ["heart", "Healthcare", "Professionals working in healthcare organisations."],
    ["clipboard", "Administration", "Office and administrative professionals."],
  ],
};
function BP_Who() {
  const [tab, setTab] = ee.useState("Seniority");
  return (
    <div className="bp-who">
      <div className="bp-who__tabs" role="tablist" aria-label="Audience type">
        {Object.keys(BP_WHO).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            className={tab === k ? "is-on" : ""}
            onClick={() => setTab(k)}
          >
            {k}
            <b>{BP_WHO[k].length}</b>
          </button>
        ))}
      </div>
      <div className="bp-who__grid" key={tab}>
        {BP_WHO[tab].map(([ic, t, d], i) => (
          <div
            key={t}
            className="bp-who__card"
            tabIndex="0"
            style={{
              "--i": i,
            }}
          >
            <span className="bp-who__ic">
              <RC_I n={ic} s={20} />
            </span>
            <strong>{t}</strong>
            <p>{d}</p>
          </div>
        ))}
      </div>
      <p className="bp-who__note">Availability for specific niche roles is confirmed during feasibility.</p>
    </div>
  );
}
const BP_ATTR = [
  ["user", "Gender", "Professional demographic segmentation"],
  ["cal", "Age", "Age bands"],
  ["factory", "Industry", "Industry classification"],
  ["pin", "Company Location", "Geographic targeting"],
  ["brief", "Job Roles", "Professional responsibilities"],
  ["building", "Organization Type", "Organization classification"],
  ["users", "Employee Size", "Company size"],
  ["coins", "Company Revenue", "Revenue bands"],
  ["grid", "Department", "Functional area"],
  ["globe", "Country", "Market / geography"],
  ["layers", "Sector", "Sector classification"],
];
function BP_Builder() {
  const [sel, setSel] = ee.useState(["Industry", "Job Roles", "Employee Size"]);
  const toggle = (t) => setSel((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]));
  return (
    <div className="bp-build">
      <div className="bp-build__grid" role="group" aria-label="Profiling attributes">
        {BP_ATTR.map(([ic, t, d]) => {
          const on = sel.includes(t);
          return (
            <button key={t} className={"bp-attr" + (on ? " is-on" : "")} aria-pressed={on} onClick={() => toggle(t)}>
              <span className="bp-attr__ic">
                <RC_I n={ic} s={18} />
              </span>
              <span className="bp-attr__t">{t}</span>
              <span className="bp-attr__d">{d}</span>
              <span className="bp-attr__tick" aria-hidden="true">
                <RC_I n={on ? "check" : "plus"} s={13} />
              </span>
            </button>
          );
        })}
      </div>
      <aside className="bp-build__out" aria-live="polite">
        <span className="bp-build__k">Your audience brief</span>
        {sel.length ? (
          <p>
            {"Business professionals defined by "}
            <strong>
              {sel
                .map((x) => x.toLowerCase())
                .join(", ")
                .replace(/, ([^,]*)$/, " and $1")}
            </strong>
            .
          </p>
        ) : (
          <p>Select attributes to describe the professionals you need to reach.</p>
        )}
        <div className="bp-build__chips">
          {sel.map((x) => (
            <span key={x}>
              {x}
              <button aria-label={"Remove " + x} onClick={() => toggle(x)}>
                <RC_I n="x" s={11} />
              </button>
            </span>
          ))}
        </div>
        <Link to="/lets-talk?type=audience" className="btn btn--primary bp-build__cta">
          Check feasibility for this audience
        </Link>
        <span className="bp-build__fine">
          Attribute combinations are confirmed against the panel during feasibility.
        </span>
      </aside>
    </div>
  );
}
const BP_MX = [
  ["PERSON", "user", ["Job role", "Seniority", "Department", "Decision responsibility"]],
  ["COMPANY", "building", ["Industry", "Employee size", "Revenue", "Organization type"]],
  ["MARKET", "globe", ["Country", "Region", "Location", "Market"]],
];
function BP_Matrix() {
  const [row, setRow] = ee.useState(-1);
  return (
    <div className="bp-mx" onMouseLeave={() => setRow(-1)}>
      {BP_MX.map(([h, ic, xs], c) => (
        <div key={h} className={"bp-mx__col bp-mx__col" + c}>
          <div className="bp-mx__h">
            <RC_I n={ic} s={18} />
            {h}
          </div>
          {xs.map((x, r) => (
            <div key={x} className={"bp-mx__cell" + (row === r ? " is-row" : "")} onMouseEnter={() => setRow(r)}>
              {x}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
function BP_Spectrum() {
  const [ref, v] = RC_useInView(0.3);
  const sizes = ["Small business", "SME", "Mid-market", "Large enterprise", "Global organization"];
  return (
    <div ref={ref} className={"bp-spec" + (v ? " is-in" : "")}>
      <div className="bp-spec__row">
        {sizes.map((t, i) => (
          <div
            key={t}
            className="bp-spec__item"
            style={{
              "--i": i,
            }}
          >
            <svg viewBox="0 0 80 90" aria-hidden="true">
              {Array.from({
                length: i + 1,
              }).map((_, k) => {
                const h = 26 + i * 12 - Math.abs(k - i / 2) * 6;
                const w = 64 / (i + 1);
                return (
                  <rect
                    key={k}
                    x={8 + k * w}
                    y={86 - h}
                    width={w - 3}
                    height={h}
                    rx="2"
                    className="bp-spec__b"
                    style={{
                      "--k": k,
                    }}
                  />
                );
              })}
            </svg>
            <strong>{t}</strong>
          </div>
        ))}
      </div>
      <div className="bp-spec__axis">
        <span>Smaller organisations</span>
        <span>Larger organisations</span>
      </div>
      <p className="bp-spec__note">
        Conceptual spectrum. Company size is targeted using employee-size and revenue bands.
      </p>
    </div>
  );
}
function BP_Decision() {
  const [ref, v] = RC_useInView(0.3);
  const cols = [
    ["flag", "Decision-maker", "crown", "C-Suite", "Approves the purchase or strategy"],
    ["users", "Influencer", "user", "Manager", "Shapes the shortlist and requirements"],
    ["brief", "End user", "monitor", "Professional", "Uses the product or service daily"],
  ];
  return (
    <div ref={ref} className={"bp-dec" + (v ? " is-in" : "")}>
      <div className="bp-dec__top">
        <RC_I n="target" s={20} />
        Business decision
      </div>
      <svg className="bp-dec__lines" viewBox="0 0 600 60" preserveAspectRatio="none" aria-hidden="true">
        <path d="M300 0 V20 M100 20 H500 M100 20 V60 M300 20 V60 M500 20 V60" />
      </svg>
      <div className="bp-dec__cols">
        {cols.map(([ic, t, ic2, t2, d], i) => (
          <div
            key={t}
            className="bp-dec__col"
            style={{
              "--i": i,
            }}
          >
            <div className="bp-dec__role">
              <RC_I n={ic} s={18} />
              {t}
            </div>
            <span className="bp-dec__arrow" aria-hidden="true" />
            <div className="bp-dec__who">
              <RC_I n={ic2} s={18} />
              <strong>{t2}</strong>
              <span>{d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
const BP_PROC = [
  ["target", "Define", "Research objective and target audience"],
  ["layers", "Profile", "Professional and company criteria"],
  ["userplus", "Recruit", "Identify relevant business professionals"],
  ["filter", "Screen", "Apply qualification and research criteria"],
  ["shield", "Verify", "Apply respondent and quality controls"],
  ["users", "Sample", "Build the required research audience"],
  ["database", "Collect", "Conduct the research"],
];
function BP_Process() {
  const ref = ee.useRef(null);
  const [p, setP] = ee.useState(0);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce =
      window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (reduce) {
      setP(1);
      return;
    }
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        setP(Math.max(0, Math.min(1, (vh * 0.6 - r.top) / r.height)));
      });
    };
    on();
    window.addEventListener("scroll", on, {
      passive: true,
    });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <ol
      ref={ref}
      className="bp-proc"
      style={{
        "--p": p,
      }}
    >
      <div className="bp-proc__spine" aria-hidden="true">
        <span />
      </div>
      {BP_PROC.map(([ic, t, d], i) => {
        const on = p >= (i + 0.3) / BP_PROC.length;
        return (
          <li key={t} className={(i % 2 ? "is-r" : "is-l") + (on ? " is-on" : "")}>
            <span className="bp-proc__dot">
              <RC_I n={ic} s={18} />
            </span>
            <div className="bp-proc__card">
              <span className="bp-proc__n">0{i + 1}</span>
              <strong>{t}</strong>
              <p>{d}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
const BP_QC = [
  [
    "Identity & Access",
    "key",
    "#0B22A8",
    [
      ["bot", "CAPTCHA controls"],
      ["lock", "Security question validation"],
      ["lang", "Browser language validation"],
      ["timer", "Timezone validation"],
      ["cookie", "Cookie validation"],
      ["lock", "URL protection"],
    ],
  ],
  [
    "Fraud Prevention",
    "finger",
    "#5A3FE0",
    [
      ["copy", "Duplicate detection"],
      ["bot", "Bot validation"],
      ["eyeoff", "TOR detection"],
      ["globe", "GEO-IP validation"],
      ["finger", "Browser fingerprinting"],
    ],
  ],
  [
    "Research Quality",
    "okc",
    "#0E9C88",
    [
      ["filter", "Screening filters"],
      ["list", "Pre-screening qualification"],
      ["edit", "Open-end quality checks"],
      ["alert", "Red-herring questions"],
    ],
  ],
];
function BP_Quality() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"bp-qc" + (v ? " is-in" : "")}>
      <div className="bp-qc__pipe" aria-hidden="true">
        <span />
      </div>
      {BP_QC.map(([t, ic, col, xs], i) => (
        <div
          key={t}
          className="bp-qc__gate"
          style={{
            "--c": col,
            "--i": i,
          }}
        >
          <div className="bp-qc__head">
            <span className="bp-qc__ic">
              <RC_I n={ic} s={22} />
            </span>
            <div>
              <small>Gate 0{i + 1}</small>
              <strong>{t}</strong>
            </div>
          </div>
          <ul>
            {xs.map(([ic2, x]) => (
              <li key={x}>
                <RC_I n={ic2} s={15} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="bp-qc__out">
        <RC_I n="okc" s={20} />
        <span>Verified, qualified B2B respondents</span>
      </div>
    </div>
  );
}
function BP_Coverage() {
  const [ref, v] = RC_useInView(0.25);
  const hubs = [
    [-95, 38],
    [-60, -15],
    [5, 49],
    [20, 5],
    [48, 26],
    [78, 22],
    [110, 30],
    [135, -25],
  ];
  const links = [
    [0, 2],
    [2, 4],
    [4, 5],
    [5, 6],
    [6, 7],
    [0, 1],
    [2, 3],
    [2, 6],
  ];
  return (
    <div ref={ref} className={"bp-cov" + (v ? " is-in" : "")}>
      <div className="bp-cov__map">
        <svg
          viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
          role="img"
          aria-label="World map with connected business research hubs across regions"
        >
          <path d={OD_WORLD.d} className="od-dots od-dots--soft" />
          {links.map(([a, b], i) => {
            const [x1, y1] = odP(...hubs[a]),
              [x2, y2] = odP(...hubs[b]);
            return (
              <path
                key={i}
                d={`M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 60} ${x2} ${y2}`}
                className="bp-cov__arc"
                style={{
                  "--i": i,
                }}
                pathLength="1"
              />
            );
          })}
          {hubs.map((h, i) => {
            const [x, y] = odP(...h);
            return (
              <g
                key={i}
                className="bp-cov__hub"
                style={{
                  "--i": i,
                }}
              >
                <circle cx={x} cy={y} r="22" className="bp-cov__glow" />
                <rect x={x - 11} y={y - 9} width="22" height="16" rx="3" className="bp-cov__case" />
                <path d={`M${x - 4} ${y - 9} v-3 h8 v3`} className="bp-cov__handle" />
              </g>
            );
          })}
        </svg>
      </div>
      <div className="bp-cov__stat">
        <OD_Count to={55} suf="+" />
        <span>markets for B2B research</span>
        <p>
          Run business panel research in a single market or across regions with one coordinated sample plan, consistent
          screening and one point of contact.
        </p>
      </div>
    </div>
  );
}
function BP_Tech() {
  const items = ["Survey platforms", "SPSS", "Python", "R", "Power BI", "Dashboards", "Research portals"];
  return (
    <div className="bp-tech">
      <Link to="/products" className="bp-tech__hub">
        <strong>Sampledge</strong>
        <span>Built in-house · quotas, suppliers and progress</span>
      </Link>
      <ul className="bp-tech__ring">
        {items.map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}
function BP_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm,
    Guide = GuideLink;
  const [active, setActive] = ee.useState("bp-overview");
  const nav = [
    ["bp-overview", "Overview"],
    ["bp-reach", "Who we reach"],
    ["bp-profile", "Profiling"],
    ["bp-process", "Process"],
    ["bp-quality", "Quality"],
    ["bp-coverage", "Coverage"],
    ["bp-why", "Why us"],
    ["bp-faq", "FAQ"],
    ["bp-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is a Business Panel?",
      a: "A business panel is a community of verified professionals who have agreed to take part in research and shared details about their role, company and industry. It lets research teams reach the right B2B respondents quickly instead of recruiting from scratch for every study.",
    },
    {
      q: "What types of business professionals can you recruit?",
      a: "Our business panel includes 2.85M+ verified business professionals, including decision-makers, influencers, key stakeholders, C-suite professionals, senior managers, SME owners, function-specific professionals and IT and technology decision-makers.",
    },
    {
      q: "Can I target respondents by industry and job role?",
      a: "Yes. Industry, job role, department and seniority are core profiling attributes, and they can be combined with company attributes such as employee size, revenue and organization type.",
    },
    {
      q: "Can Business Panel research target senior decision-makers?",
      a: "Yes. The panel includes C-suite professionals and senior managers. Because senior audiences are harder to reach, we confirm feasibility for your specific criteria and markets before fieldwork starts.",
    },
    {
      q: "What company-level attributes can be used for B2B targeting?",
      a: "Industry, sector, employee size, company revenue, organization type and company location, alongside market-level attributes such as country and region.",
    },
    {
      q: "Which markets can you cover?",
      a: "We run B2B research across 55+ markets. Share your target countries and we will confirm coverage and feasibility for each one.",
    },
    {
      q: "How do you maintain Business Panel data quality?",
      a: "Depending on study requirements, we apply identity and access checks such as CAPTCHA and security questions, fraud prevention such as duplicate, bot and TOR detection, and research-quality checks such as screening filters, open-end reviews and red-herring questions.",
    },
    {
      q: "How quickly can you assess B2B sample feasibility?",
      a: "For most studies we share feasibility and a cost estimate within one working day. Complex or very senior audiences can take a little longer because we check real availability first.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/business-panel";
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
    const title = "Business Panel: Verified B2B Respondents | Frequent Research";
    const desc =
      "Business panel access to 2.85M+ verified professionals and decision-makers across 55+ markets. Check B2B audience feasibility for your research.";
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
          ["Business Panel", "/services/market-research/business-panel"],
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
        name: "Business Panel",
        serviceType: "B2B research panel and business respondent recruitment",
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
  const inds = SERVICE_INDUSTRIES.map(findIndustry).filter(Boolean);
  const extra = INDUSTRIES.length - SERVICE_INDUSTRIES.length;
  const svc = (s, label) => <Link to={`/services/market-research/${s}`}>{label}</Link>;
  return (
    <div className="bp rc">
      <section className="bp-hero">
        <div className="container bp-hero__in">
          <div className="bp-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="bp-eyebrow">B2B research panel</span>
            <HeroH1>Business Panel</HeroH1>
            <p className="bp-hero__sub">
              Verified business professionals across functions, industries and company sizes, ready for B2B research.
            </p>
            <p className="bp-hero__body">
              Our business panel gives research teams access to decision-makers, influencers and professionals for
              structured B2B market research, profiled by role, company and market.
            </p>
            <div className="od-hero__ctas">
              <Link className="btn btn--primary btn--lg bp-btn" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=audience">
                Check Audience Feasibility
              </Link>
            </div>
            <a className="bp-hero__link" href="#bp-process" onClick={rcScrollTo("bp-process")}>
              {"Explore how Business Panel works "}
              <RC_I n="arrow" s={15} />
            </a>
          </div>
          <BP_Network />
        </div>
        <div className="container">
          <ul className="bp-stats" aria-label="Business panel at a glance">
            <li>
              <OD_Count to={2.85} dec={2} suf="M+" />
              <span>Verified business professionals</span>
            </li>
            <li>
              <OD_Count to={55} suf="+" />
              <span>Markets</span>
            </li>
            <li>
              <strong className="od-count">B2B</strong>
              <span>Professional audiences</span>
            </li>
            <li>
              <strong className="od-count bp-stats__w">Multi-industry</strong>
              <span>Business coverage</span>
            </li>
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
      <section className="rc-sec" id="bp-overview">
        <div className="container bp-ps">
          <div>
            <RC_Head kicker="The challenge" title="B2B research depends on reaching the right professionals" />
            <p className="od-muted">
              Finding a respondent is not enough. Business research needs the right person in the right company, with
              the authority or experience to answer. That means matching on:
            </p>
            <ul className="bp-need">
              {[
                "Professional",
                "Function",
                "Seniority",
                "Industry",
                "Company type",
                "Company size",
                "Revenue band",
                "Geography",
                "Decision-making responsibility",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
          <BP_Problem />
        </div>
      </section>
      <section className="rc-sec bp-sec--slate">
        <div className="container">
          <RC_Head
            light
            kicker="Our approach"
            title="A Business Panel built around your research objective"
            intro="We structure B2B sample around the actual research requirement, moving from the broad target to the respondents who qualify."
          />
          <BP_Solution />
        </div>
      </section>
      <section className="rc-sec" id="bp-reach">
        <div className="container">
          <RC_Head
            kicker="B2B respondents"
            title="Business professionals across functions and seniority levels"
            intro="Decision-makers, influencers, key stakeholders, SME owners and function-specific professionals. Switch between seniority and function to explore."
          />
          <BP_Who />
        </div>
      </section>
      <section className="rc-sec bp-sec--warm" id="bp-profile">
        <div className="container">
          <RC_Head
            kicker="Business panel profiling"
            title="Profile your audience beyond job title"
            intro="Combine professional, company and market attributes. Select the attributes your study depends on to build an audience brief."
          />
          <BP_Builder />
          <div className="bp-mxwrap">
            <h3>The B2B targeting matrix</h3>
            <BP_Matrix />
            <p className="bp-mx__line">Build the sample around the audience that matters to your research.</p>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Company profiling" title="Reach businesses that fit your research criteria" />
          <BP_Spectrum />
          <ul className="bp-dims">
            {[
              ["users", "Employee size"],
              ["coins", "Revenue"],
              ["building", "Organization type"],
              ["factory", "Industry"],
              ["grid", "Department"],
              ["pin", "Geography"],
            ].map(([ic, t]) => (
              <li key={t}>
                <RC_I n={ic} s={16} />
                {t}
              </li>
            ))}
          </ul>
          <div className="bp-decwrap">
            <div>
              <RC_Head kicker="Stakeholders" title="B2B decisions involve more than one person" />
              <p className="od-muted">
                A purchase may be approved by an executive, shaped by a manager and used every day by a specialist. Good
                B2B research often needs all three perspectives, not only senior executives.
              </p>
            </div>
            <BP_Decision />
          </div>
        </div>
      </section>
      <section className="rc-sec bp-sec--warm">
        <div className="container">
          <RC_Head kicker="Use cases" title="What can Business Panel research help you understand?" />
          <div className="bp-use">
            {[
              ["compass", "Market Understanding", "Understand business attitudes, needs and market behaviour."],
              ["box", "Product Research", "Test products, concepts and propositions with relevant professionals."],
              [
                "award",
                "Brand Research",
                "Understand brand awareness, perception and positioning among business audiences.",
              ],
              ["msg", "Customer Research", "Explore customer expectations, satisfaction and experience."],
              ["cpu", "Technology Research", "Research technology adoption, usage and purchasing behaviour."],
              ["tag", "Pricing Research", "Explore pricing perceptions and commercial decision factors."],
              ["cart", "Procurement Research", "Reach professionals involved in purchasing and supplier decisions."],
              ["factory", "Industry Research", "Gather insights from specific sectors and professional audiences."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className={"bp-use__card bp-use__card" + (i % 4)}
                style={{
                  "--i": i % 4,
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
      <section className="rc-sec" id="bp-process">
        <div className="container">
          <RC_Head center kicker="B2B sample recruitment" title="How our Business Panel recruitment works" />
          <BP_Process />
        </div>
      </section>
      <section className="rc-sec bp-sec--slate" id="bp-quality">
        <div className="container">
          <RC_Head
            light
            kicker="Data quality"
            title="Quality controls built into the research process"
            intro="Respondents pass through three groups of checks. Controls are applied according to each study's requirements."
          />
          <BP_Quality />
        </div>
      </section>
      <section className="rc-sec" id="bp-coverage">
        <div className="container">
          <RC_Head kicker="Global coverage" title="B2B research across 55+ markets" />
          <BP_Coverage />
        </div>
      </section>
      <section className="bp-feas">
        <div className="container bp-feas__in">
          <div>
            <h2>Need a hard-to-reach B2B audience?</h2>
            <p>
              Tell us about your target audience, geography, industry, role and research requirements. We can assess
              feasibility and discuss the appropriate research approach.
            </p>
            <div className="od-hero__ctas">
              <Link to="/lets-talk?type=audience" className="btn btn--light btn--lg">
                Request Audience Feasibility
              </Link>
              <Link to="/lets-talk?type=quote" className="btn btn--outline-light btn--lg">
                Request a Quote
              </Link>
            </div>
          </div>
          <ol className="bp-feas__fun">
            {["Research requirement", "Audience criteria", "Feasibility", "Sample plan", "Fieldwork"].map((t, i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                {t}
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries we support" />
          <div className="rc-ind bp-ind">
            {inds.map((o, i) => (
              <Link
                key={o.slug}
                className={"rc-ind__item bp-ind__item bp-ind__item" + (i % 6)}
                to={`/industries-case-studies/${o.slug}`}
              >
                <IndustryIcon name={o.icon} size={20} />
                <span>{o.name}</span>
              </Link>
            ))}
            <Link className="rc-ind__more" to="/industries-case-studies">
              +{extra}
              {" more"}
            </Link>
          </div>
        </div>
      </section>
      <section className="rc-sec bp-sec--warm" id="bp-why">
        <div className="container bp-why">
          <div>
            <RC_Head kicker="Why us" title="Why clients choose Frequent Research for Business Panel" />
            <ol className="bp-why__list">
              {WU_DATA["business-panel"].x
                .map(([, t, d]) => [t, d])
                .map(([t, d], i) => (
                  <li key={t}>
                    <span>0{i + 1}</span>
                    <div>
                      <strong>{t}</strong>
                      <p>{d}</p>
                    </div>
                  </li>
                ))}
            </ol>
          </div>
          <div>
            <RC_Head kicker="Infrastructure" title="Technology supporting your research" />
            <BP_Tech />
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head
            kicker="Typical project"
            title="How a typical Business Panel project works"
            intro="A generalised workflow, not a specific client case."
          />
          <ol className="bp-flow">
            {[
              ["file", "Research requirement"],
              ["target", "Audience definition"],
              ["clock", "Feasibility"],
              ["userplus", "Recruitment"],
              ["shield", "Quality screening"],
              ["database", "Data collection"],
              ["okc", "Cleaned research output"],
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
          <div className="bp-team">
            <div>
              <h3>The team behind your Business Panel project</h3>
              <p className="od-muted">Specialists at every stage, coordinated through one named contact.</p>
            </div>
            <ul>
              {[
                ["compass", "Research Consultants"],
                ["users", "Panel & Sampling Managers"],
                ["cpu", "Survey Programmers"],
                ["msg", "Field Supervisors & Moderators"],
                ["bars", "Data Processing & Analytics Specialists"],
              ].map(([ic, t]) => (
                <li key={t}>
                  <RC_I n={ic} s={18} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec bp-sec--slate">
        <div className="container">
          <RC_Head light kicker="Proof points" title="Built for research teams that need dependable B2B sample" />
          <div className="bp-proof">
            {[
              ["2.85M+", "verified business professionals in the panel"],
              ["55+", "markets for B2B fieldwork"],
              ["3", "groups of quality controls applied by study"],
              ["1", "point of contact from brief to debrief"],
            ].map(([n2, t]) => (
              <div key={t}>
                <strong>{n2}</strong>
                <span>{t}</span>
              </div>
            ))}
          </div>
          <p className="bp-proof__more">
            {"See how we deliver in our "}
            <Link to="/industries-case-studies">industries and case studies</Link>.
          </p>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Related" title="Related Research Services" />
          <div className="cp-rel__grid">
            {[
              ["consumer-panel", "Consumer panel", "Profiled consumers for B2C research"],
              ["healthcare-panel", "Healthcare panel", "HCPs, patients and caregivers"],
              ["qualitative-research", "Qualitative research", "Interviews and focus groups with professionals"],
              ["quantitative-research", "Quantitative research", "Statistically robust B2B surveys"],
              ["cati", "CATI", "Computer-assisted telephone interviewing"],
              ["data-processing-and-analytics", "Data processing & analytics", "Cleaning, weighting and tables"],
              ["reporting-and-insights", "Reporting & insights", "Reports and debriefs that drive decisions"],
              ["research-consultancy", "Research consultancy", "Frame the question and choose the method"],
              ["research-design-cycle", "Research design cycle", "Seven steps from brief to insight"],
              ["online-data-collection", "Online data collection", "Survey hosting, sampling and fieldwork"],
              ["offline-data-collection", "Offline data collection", "CATI and face-to-face fieldwork"],
            ].map(([s, t, d]) => (
              <Link key={s} to={`/services/market-research/${s}`} className="cp-rel__card hcard">
                <strong>{t}</strong>
                <span>{d}</span>
                <RC_I n="arrow" s={16} />
              </Link>
            ))}
          </div>
          <div className="cp-rel__guide">
            <Guide vertical={a.slug} service={n.slug} />
          </div>
        </div>
      </section>
      <section className="section section--tint" id="bp-faq">
        <div className="container split">
          <h2 className="split__title">Business Panel: Frequently Asked Questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="od-cta bp-cta" id="bp-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Talk to our research team</span>
            <h2>Let's find the right B2B audience for your research</h2>
            <p>Tell us what you need to understand, who you need to reach and where the research needs to happen.</p>
            <div className="bp-micro">
              <strong>Need a specific professional audience?</strong>
              <span>
                Tell us the role, industry, company profile and market. We'll help assess feasibility and the
                appropriate research approach.
              </span>
            </div>
            <div className="od-hero__ctas">
              <Link className="btn btn--light btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=audience">
                Check Audience Feasibility
              </Link>
            </div>
            <a className="bp-cta__link" href="#bp-form" onClick={rcScrollTo("bp-form")}>
              {"Get a Free Consultation "}
              <RC_I n="arrow" s={14} />
            </a>
            <p className="bp-cta__fine">We reply within one working day.</p>
          </div>
          <div className="card-form" id="bp-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { BP_Page };
