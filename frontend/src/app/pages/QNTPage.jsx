import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { PORTALS } from '../data/site.jsx';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, PanelMark } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY, SERVICE_INDUSTRIES, serviceFaqs } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';

const odP = (lon, lat) => [(lon - OD_WORLD.lon0) * OD_WORLD.sx, (OD_WORLD.lat0 - lat) * OD_WORLD.sx];
function QNT_Hero() {
  const [k, setK] = ee.useState(
    typeof window !== "undefined" &&
      (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches))
      ? 4
      : 0,
  );
  ee.useEffect(() => {
    if (
      window.__frLite === true ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    )
      return;
    const t = setInterval(() => setK((x) => (x + 1) % 5), 1700);
    return () => clearInterval(t);
  }, []);
  const steps = [
    ["help", "Question"],
    ["users", "Respondent"],
    ["database", "Data"],
    ["bars", "Analysis"],
    ["flag", "Decision"],
  ];
  return (
    <div
      className="qnt-hv"
      role="img"
      aria-label="Quantitative research flow: a structured survey question is answered by many respondents, producing data that is analysed to support a decision"
    >
      <div className="qnt-hv__panels">
        <div className={"qnt-hv__p qnt-hv__q" + (k >= 0 ? " is-on" : "")}>
          <span className="qnt-hv__k">Q4 · Rating scale</span>
          <strong>How likely are you to recommend the service?</strong>
          <div className="qnt-hv__scale">
            {[1, 2, 3, 4, 5].map((n) => (
              <i key={n} className={n === 4 ? "is-sel" : ""}>
                {n}
              </i>
            ))}
          </div>
        </div>
        <div className={"qnt-hv__p qnt-hv__r" + (k >= 1 ? " is-on" : "")}>
          <span className="qnt-hv__k">Respondents</span>
          <div className="qnt-hv__dots">
            {Array.from(
              {
                length: 48,
              },
              (_, i) => (
                <i
                  key={i}
                  style={{
                    "--i": i,
                  }}
                  className={(i * 7) % 5 === 0 ? "b" : (i * 3) % 4 === 0 ? "h" : ""}
                />
              ),
            )}
          </div>
        </div>
        <div className={"qnt-hv__p qnt-hv__d" + (k >= 2 ? " is-on" : "")}>
          <span className="qnt-hv__k">Data</span>
          <div className="qnt-hv__grid">
            {Array.from(
              {
                length: 30,
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
        </div>
        <div className={"qnt-hv__p qnt-hv__a" + (k >= 3 ? " is-on" : "")}>
          <span className="qnt-hv__k">Analysis</span>
          <svg viewBox="0 0 120 64" aria-hidden="true">
            <path d="M4 60 C26 58 34 14 60 10 C86 14 94 58 116 60" className="qnt-hv__curve" />
            {[0.15, 0.4, 0.8, 1, 0.75, 0.35, 0.12].map((h, i) => (
              <rect
                key={i}
                x={8 + i * 15.5}
                y={62 - h * 48}
                width="11"
                height={h * 48}
                rx="2"
                className="qnt-hv__bar"
                style={{
                  "--i": i,
                }}
              />
            ))}
          </svg>
        </div>
        <div className={"qnt-hv__p qnt-hv__x" + (k >= 4 ? " is-on" : "")}>
          <RC_I n="flag" s={24} />
          <strong>Decision</strong>
          <span>Evidence-backed</span>
        </div>
      </div>
      <ol className="qnt-hv__chain">
        {steps.map(([ic, t], i) => (
          <li key={t} className={(i <= k ? "is-done " : "") + (i === k ? "is-cur" : "")}>
            <span>
              <RC_I n={ic} s={14} />
            </span>
            {t}
          </li>
        ))}
      </ol>
      {null}
    </div>
  );
}
function QNT_PS() {
  const [ref, v] = RC_useInView(0.25);
  const bad = ["Unclear objective", "Weak design", "Wrong sample", "Poor-quality responses", "Unreliable conclusions"];
  const good = [
    "Business question",
    "Research design",
    "Relevant respondents",
    "Controlled fieldwork",
    "Validated data",
    "Analysis",
    "Insight",
  ];
  return (
    <div ref={ref} className={"qnt-ps" + (v ? " is-in" : "")}>
      <div className="qnt-ps__row qnt-ps__row--bad">
        <span className="qnt-ps__k">
          <RC_I n="alert" s={15} />
          Where research goes wrong
        </span>
        <ol>
          {bad.map((t, i) => (
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
      <div className="qnt-ps__bridge" aria-hidden="true">
        <span>Our solution</span>
      </div>
      <div className="qnt-ps__row qnt-ps__row--good">
        <span className="qnt-ps__k">
          <RC_I n="okc" s={15} />
          How we structure it
        </span>
        <ol>
          {good.map((t, i) => (
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
    </div>
  );
}
const QNT_S2I = [
  ["target", "Define", "Turn the business question into research objectives."],
  ["clipboard", "Design", "Plan the sample, questionnaire and method."],
  ["userplus", "Recruit", "Reach and screen the right respondents."],
  ["monitor", "Collect", "Run online, telephone or face-to-face fieldwork."],
  ["shield", "Validate", "Check respondents and responses for quality."],
  ["bars", "Analyse", "Tabulate, weight and test the data."],
  ["report", "Deliver", "Report findings around the decision."],
];
function QNT_S2I_View() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <ol ref={ref} className={"qnt-s2i" + (v ? " is-in" : "")}>
      {QNT_S2I.map(([ic, t, d], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
          className={i % 2 ? "is-dn" : ""}
        >
          <span className="qnt-s2i__n">0{i + 1}</span>
          <span className="qnt-s2i__ic">
            <RC_I n={ic} s={22} />
          </span>
          <strong>{t}</strong>
          <em>{d}</em>
        </li>
      ))}
    </ol>
  );
}
function QNT_Logic() {
  const st = [
    ["Screen", "filter"],
    ["Qualify", "okc"],
    ["Route", "branch"],
    ["Ask", "msg"],
    ["Validate", "shield"],
    ["Complete", "flag"],
  ];
  return (
    <div
      className="qnt-logic"
      role="img"
      aria-label="Questionnaire logic: screen, qualify, route, ask, validate and complete, with non-qualifying respondents terminated politely"
    >
      <ol>
        {st.map(([t, ic], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span>
              <RC_I n={ic} s={16} />
            </span>
            {t}
          </li>
        ))}
      </ol>
      <div className="qnt-logic__term">
        <RC_I n="x" s={13} />
        Not qualified → thank and close
      </div>
      <div className="qnt-logic__skip">
        <RC_I n="branch" s={13} />
        Skip logic sends each respondent only the questions that apply
      </div>
    </div>
  );
}
function QNT_Tree() {
  const br = [
    ["users", "B2C", ["Consumers", "Product & service users", "Households", "Customers"]],
    ["brief", "B2B", ["Business owners", "Decision-makers", "Procurement", "Professionals", "Industry specialists"]],
    ["steth", "Healthcare", ["Healthcare professionals", "Patients", "Caregivers", "Healthcare stakeholders"]],
  ];
  const [h, setH] = ee.useState(null);
  return (
    <div className="qnt-tree" onMouseLeave={() => setH(null)}>
      <div className="qnt-tree__root">
        <RC_I n="globe" s={18} />
        Target population
      </div>
      <svg viewBox="0 0 600 46" preserveAspectRatio="none" className="qnt-tree__lines" aria-hidden="true">
        {[100, 300, 500].map((x, i) => (
          <path key={x} d={`M300 0 C300 26 ${x} 20 ${x} 46`} className={h === i ? "is-on" : ""} />
        ))}
      </svg>
      <div className="qnt-tree__br">
        {br.map(([ic, k, xs], i) => (
          <div
            key={k}
            className={"qnt-tree__b qnt-tree__b" + i + (h === i ? " is-on" : "")}
            onMouseEnter={() => setH(i)}
          >
            <span className="qnt-tree__k">
              <RC_I n={ic} s={17} />
              {k}
            </span>
            <ul>
              {xs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="qnt-tree__note">
        Hard-to-reach audiences and industry specialists are scoped through feasibility first. No split between
        audiences is implied.
      </p>
    </div>
  );
}
const QNT_AP = [
  {
    k: "Research objective & study design",
    ic: "target",
    d: "Every study is designed around the business question it has to answer.",
    x: [
      "Research objective definition",
      "Target audience identification",
      "Sample design",
      "Questionnaire structure",
      "Methodology selection",
      "Market and geographic planning",
    ],
  },
  {
    k: "Questionnaire design & programming",
    ic: "clipboard",
    d: "Questionnaires are reviewed for clarity, bias and routing, then programmed and tested before launch.",
    x: [
      "Questionnaire design",
      "Survey programming",
      "Skip logic & branching",
      "Screener development",
      "Quota management",
      "Multi-language surveys",
      "Mobile-responsive surveys",
      "Survey testing & validation",
    ],
  },
  {
    k: "Sampling & respondent recruitment",
    ic: "userplus",
    d: "Respondents are recruited from our own panels across B2C, B2B and healthcare audiences, screened against the study criteria.",
    x: [
      "Consumers",
      "Business professionals",
      "Decision-makers",
      "Healthcare professionals",
      "Patients & caregivers",
      "Industry specialists",
      "Product / service users",
      "Hard-to-reach audiences",
    ],
  },
];
function QNT_Approach() {
  const [a, setA] = ee.useState(0);
  const s = QNT_AP[a];
  return (
    <div className="qnt-ap">
      <div className="qnt-ap__tabs" role="tablist" aria-label="Approach stages 01 to 03">
        {QNT_AP.map((x, i) => (
          <button
            key={x.k}
            role="tab"
            aria-selected={a === i}
            className={a === i ? "is-on" : ""}
            onClick={() => setA(i)}
          >
            <span>0{i + 1}</span>
            <RC_I n={x.ic} s={18} />
            {x.k}
          </button>
        ))}
      </div>
      <div className="qnt-ap__panel" key={a} role="tabpanel" aria-live="polite">
        <div className="qnt-ap__copy">
          <span className="qnt-ap__kk">Stage 0{a + 1}</span>
          <h3>{s.k}</h3>
          <p>{s.d}</p>
          <ul>
            {s.x.map((y, i) => (
              <li
                key={y}
                style={{
                  "--i": i,
                }}
              >
                <RC_I n="check" s={13} />
                {y}
              </li>
            ))}
          </ul>
        </div>
        <div className="qnt-ap__viz">
          {a === 0 && (
            <div
              className="qnt-brief"
              role="img"
              aria-label="Study design blueprint linking the business question to objective, audience, sample, questionnaire, method and markets"
            >
              {["Business question", "Objective", "Audience", "Sample", "Questionnaire", "Method", "Markets"].map(
                (t, i) => (
                  <span
                    key={t}
                    className={i ? "" : "is-root"}
                    style={{
                      "--i": i,
                    }}
                  >
                    {t}
                  </span>
                ),
              )}
            </div>
          )}
          {a === 1 && <QNT_Logic />}
          {a === 2 && <QNT_Tree />}
        </div>
      </div>
    </div>
  );
}
const QNT_M = [
  [
    "CAWI",
    "Computer-Assisted Web Interviewing",
    "monitor",
    "Online surveys completed by respondents on desktop or mobile, suited to scale and speed.",
    "online-data-collection",
    "Online quantitative research",
    "Scalable digital surveys",
  ],
  [
    "CATI",
    "Computer-Assisted Telephone Interviewing",
    "phonecall",
    "Interviewer-led telephone surveys following a structured on-screen questionnaire.",
    "cati",
    "Telephone research",
    "Structured interviewer-led surveys",
  ],
  [
    "CAPI",
    "Computer-Assisted Personal Interviewing",
    "tablet",
    "Face-to-face interviews captured on tablets or mobile devices.",
    "offline-data-collection",
    "Personal interviewing",
    "Digital face-to-face collection",
  ],
  [
    "Face-to-Face",
    "Face-to-face surveys",
    "users",
    "In-person surveys, including paper-based interviewing where digital capture is not practical.",
    "offline-data-collection",
    "In-person research",
    "Direct respondent interaction",
  ],
];
function QNT_Methods() {
  const [h, setH] = ee.useState(0);
  return (
    <div className="qnt-mt">
      <div className="qnt-mt__cards">
        {QNT_M.map(([k, t, ic, d, s], i) => (
          <div
            key={k}
            className={"qnt-mt__c" + (h === i ? " is-on" : "")}
            onMouseEnter={() => setH(i)}
            onFocus={() => setH(i)}
            tabIndex="0"
          >
            <span className="qnt-mt__ic">
              <RC_I n={RC_P[ic] ? ic : "phonecall"} s={22} />
            </span>
            <strong>{k}</strong>
            <span className="qnt-mt__t">{t}</span>
            <p>{d}</p>
            <Link className="rc-link" to={`/services/market-research/${s}`}>
              {s === "cati"
                ? "CATI service"
                : s === "online-data-collection"
                  ? "Online data collection"
                  : "Face-to-face data collection"}{" "}
              <RC_I n="arrow" s={13} />
            </Link>
          </div>
        ))}
      </div>
      <div className="qnt-mt__sel" aria-label="Method selection depends on these factors">
        <span className="qnt-mt__selk">Method selection depends on</span>
        {["Audience", "Research objective", "Market", "Accessibility", "Project requirements"].map((t, i) =>
          ee.createElement(
            ee.Fragment,
            {
              key: t,
            },
            i > 0 && <b aria-hidden="true">+</b>,
            <span>{t}</span>,
          ),
        )}
      </div>
      <div className="qnt-mt__tbl" role="region" aria-label="Data collection method comparison" tabIndex="0">
        <table>
          <thead>
            <tr>
              <th scope="col">Method</th>
              <th scope="col">Typical use</th>
              <th scope="col">Key characteristic</th>
            </tr>
          </thead>
          <tbody>
            {QNT_M.map(([k, , ic, , , u, c], i) => (
              <tr key={k} className={h === i ? "is-on" : ""} onMouseEnter={() => setH(i)}>
                <th scope="row">
                  <RC_I n={RC_P[ic] ? ic : "phonecall"} s={15} />
                  {k}
                </th>
                <td>{u}</td>
                <td>{c}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const QNT_QC = [
  [
    "Respondent entry",
    "userplus",
    [
      ["Eligibility", "Respondents meet the study criteria"],
      ["Duplicate detection", "One person, one response"],
      ["Geo / IP validation", "Location consistency, where applicable"],
    ],
  ],
  [
    "Response behaviour",
    "eye",
    [
      ["Speeding checks", "Implausibly fast completes flagged"],
      ["Straight-lining", "Patterned grid answers flagged"],
      ["Attention checks", "Engagement confirmed"],
      ["Logical consistency", "Answers agree across questions"],
    ],
  ],
  [
    "Data validation",
    "shield",
    [
      ["Open-end review", "Verbatims checked for quality"],
      ["Quota monitoring", "Groups filled to specification"],
      ["Sample reconciliation", "Completes matched to sample"],
    ],
  ],
  ["Clean dataset", "okc", [["Data cleaning", "Removals documented before delivery"]]],
];
function QNT_QCView() {
  const [ref, v] = RC_useInView(0.2);
  const [a, setA] = ee.useState(null);
  return (
    <div ref={ref} className={"qnt-qc" + (v ? " is-in" : "")}>
      <div className="qnt-qc__funnel" aria-hidden="true">
        {QNT_QC.map(([t], i) => (
          <div
            key={t}
            className={"qnt-qc__band" + (a === i ? " is-on" : "")}
            style={{
              "--i": i,
              "--w": 100 - i * 14 + "%",
            }}
          >
            <span>{t}</span>
            {i < 3 && (
              <em className="qnt-qc__flag">
                <RC_I n="alert" s={11} />
                flagged
              </em>
            )}
          </div>
        ))}
        <div className="qnt-qc__flow">
          {Array.from(
            {
              length: 10,
            },
            (_, i) => (
              <i
                key={i}
                style={{
                  "--i": i,
                  "--x": ((i * 37) % 80) + 10 + "%",
                }}
                className={i % 4 === 3 ? "is-out" : ""}
              />
            ),
          )}
        </div>
      </div>
      <div className="qnt-qc__stages">
        {QNT_QC.map(([t, ic, xs], i) => (
          <div
            key={t}
            className={"qnt-qc__st" + (a === i ? " is-on" : "")}
            onMouseEnter={() => setA(i)}
            onMouseLeave={() => setA(null)}
            style={{
              "--i": i,
            }}
          >
            <span className="qnt-qc__h">
              <span>
                <RC_I n={ic} s={16} />
              </span>
              {t}
            </span>
            <ul>
              {xs.map(([x, d]) => (
                <li key={x}>
                  <RC_I n="check" s={12} />
                  <div>
                    <strong>{x}</strong>
                    <em>{d}</em>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
function QNT_Proc() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <ol
      ref={ref}
      className={"qnt-tx" + (v ? " is-in" : "")}
      aria-label="Raw responses, clean dataset, structured tables, statistical analysis, insights"
    >
      <li
        style={{
          "--i": 0,
        }}
      >
        <div className="qnt-tx__v qnt-tx__raw" aria-hidden="true">
          {Array.from(
            {
              length: 6,
            },
            (_, r) => (
              <i
                key={r}
                style={{
                  width: 40 + ((r * 37) % 50) + "%",
                  marginLeft: ((r * 13) % 18) + "%",
                }}
                className={r === 2 || r === 4 ? "x" : ""}
              />
            ),
          )}
        </div>
        <strong>Raw responses</strong>
      </li>
      <li
        style={{
          "--i": 1,
        }}
      >
        <div className="qnt-tx__v qnt-tx__clean" aria-hidden="true">
          {Array.from(
            {
              length: 20,
            },
            (_, i) => (
              <i key={i} />
            ),
          )}
        </div>
        <strong>Clean dataset</strong>
      </li>
      <li
        style={{
          "--i": 2,
        }}
      >
        <div className="qnt-tx__v qnt-tx__tab" aria-hidden="true">
          <b />
          <b />
          <b />
          <b />
          {Array.from(
            {
              length: 12,
            },
            (_, i) => (
              <i
                key={i}
                style={{
                  "--o": 0.25 + ((i * 7) % 6) / 8,
                }}
              />
            ),
          )}
        </div>
        <strong>Structured tables</strong>
      </li>
      <li
        style={{
          "--i": 3,
        }}
      >
        <div className="qnt-tx__v" aria-hidden="true">
          <svg viewBox="0 0 80 50">
            <path d="M4 46h72M4 4v42" className="qnt-tx__ax" />
            <path d="M8 40 L70 12" className="qnt-tx__fit" />
            {[
              [12, 36],
              [20, 38],
              [26, 30],
              [34, 30],
              [40, 24],
              [48, 26],
              [54, 18],
              [62, 20],
              [68, 12],
            ].map(([x, y]) => (
              <circle key={x} cx={x} cy={y} r="2.2" className="qnt-tx__pt" />
            ))}
          </svg>
        </div>
        <strong>Statistical analysis</strong>
      </li>
      <li
        style={{
          "--i": 4,
        }}
      >
        <div className="qnt-tx__v qnt-tx__ins" aria-hidden="true">
          <span>
            <RC_I n="bulb" s={18} />
          </span>
          <i />
          <i />
          <i />
        </div>
        <strong>Insights</strong>
      </li>
    </ol>
  );
}
const QNT_SV = [
  [
    "Consumer",
    "Consumer Research",
    "Consumer preferences, behaviours, attitudes, purchase drivers, brand perceptions and customer experiences.",
    1,
  ],
  [
    "B2B",
    "B2B Research",
    "Professionals, decision-makers, influencers, business owners, procurement teams and industry specialists.",
    1,
  ],
  [
    "Healthcare",
    "Healthcare Research",
    "Healthcare professionals, patients, caregivers and other healthcare audiences.",
    1,
  ],
  [
    "Brand",
    "Customer & Brand Research",
    "Awareness, consideration, satisfaction, loyalty, brand perception and customer experience.",
    0,
  ],
  [
    "Customer",
    "Customer & Brand Research",
    "Awareness, consideration, satisfaction, loyalty, brand perception and customer experience.",
    0,
  ],
  [
    "Product",
    "Product Research",
    "Product concepts, features, positioning, pricing, packaging and purchase intent.",
    0,
  ],
  [
    "Market",
    "Market Assessment",
    "Demand measurement, market sizing, opportunity assessment, competitive benchmarking and segmentation.",
    0,
  ],
  [
    "Employee",
    "Employee & Workplace Research",
    "Employee engagement, workplace experience, organisational perceptions and internal satisfaction.",
    0,
  ],
  [
    "U&A",
    "Usage & Attitude Studies",
    "How, why, when and where consumers or professionals use products and services.",
    0,
  ],
  ["Concept", "Concept & Message Testing", "Concepts, communications, advertisements, propositions and messaging.", 0],
];
function QNT_Eco() {
  const [a, setA] = ee.useState(0);
  const s = QNT_SV[a];
  const n = QNT_SV.length;
  return (
    <div className="qnt-eco">
      <div className="qnt-eco__map">
        <svg viewBox="0 0 400 400" aria-hidden="true" className="qnt-eco__lines">
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="104" />
          {QNT_SV.map((_, i) => {
            const ang = ((-90 + i * (360 / n)) * Math.PI) / 180,
              r = 150;
            return (
              <line
                key={i}
                x1="200"
                y1="200"
                x2={200 + Math.cos(ang) * r}
                y2={200 + Math.sin(ang) * r}
                className={a === i ? "is-on" : ""}
              />
            );
          })}
        </svg>
        <div className="qnt-eco__core">
          <RC_I n="bars" s={22} />
          <strong>Quantitative research</strong>
        </div>
        {QNT_SV.map(([k, t, , big], i) => (
          <button
            key={k}
            className={"qnt-eco__n" + (big ? " is-big" : "") + (a === i ? " is-on" : "")}
            style={{
              "--a": -90 + i * (360 / n) + "deg",
              "--r": "37.5%",
            }}
            onClick={() => setA(i)}
            onMouseEnter={() => setA(i)}
            onFocus={() => setA(i)}
            aria-pressed={a === i}
            aria-label={t}
          >
            <span>{k}</span>
          </button>
        ))}
      </div>
      <div className="qnt-eco__panel" key={s[1]} aria-live="polite">
        <span className="qnt-eco__k">{s[3] ? "Audience" : "Application"}</span>
        <h3>{s[1]}</h3>
        <p>{s[2]}</p>
        <div className="qnt-eco__all">
          {QNT_SV.filter((x, i) => QNT_SV.findIndex((y) => y[1] === x[1]) === i).map((x) => (
            <button
              key={x[1]}
              className={x[1] === s[1] ? "is-on" : ""}
              onClick={() => setA(QNT_SV.findIndex((y) => y[1] === x[1]))}
            >
              {x[1]}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
function QNT_Waves() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div
      ref={ref}
      className={"qnt-waves" + (v ? " is-in" : "")}
      role="img"
      aria-label="Conceptual tracking timeline with four waves using the same questionnaire core and sample specification"
    >
      <div className="qnt-waves__line" aria-hidden="true" />
      {[1, 2, 3, 4].map((w) => (
        <div
          key={w}
          className="qnt-waves__w"
          style={{
            "--i": w - 1,
          }}
        >
          <span className="qnt-waves__dot" />
          <strong>
            {"Wave "}
            {w}
          </strong>
          <div className="qnt-waves__card">
            <i />
            <i />
            <i />
          </div>
        </div>
      ))}
      <div className="qnt-waves__same">
        <RC_I n="refresh" s={14} />
        Same core questions, sample specification and quality rules each wave
      </div>
    </div>
  );
}
function QNT_Global() {
  const pts = [
    [-100, 40],
    [-60, -14],
    [2, 52],
    [24, 48],
    [12, 8],
    [46, 26],
    [78, 22],
    [104, 2],
    [118, 34],
    [138, -26],
  ];
  return (
    <div className="qnt-gl">
      <svg
        viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
        role="img"
        aria-label="Abstract world map with research markets connected to one central research framework"
      >
        <path d={OD_WORLD.d} className="qnt-gl__dots" />
        {(() => {
          const [cx, cy] = odP(60, 30);
          return (
            <g>
              {pts.map(([lo, la], i) => {
                const [x, y] = odP(lo, la);
                return (
                  <path
                    key={i}
                    d={`M${cx} ${cy} Q${(cx + x) / 2} ${Math.min(cy, y) - 60} ${x} ${y}`}
                    className="qnt-gl__arc"
                    style={{
                      animationDelay: i * 0.2 + "s",
                    }}
                  />
                );
              })}
              {pts.map(([lo, la], i) => {
                const [x, y] = odP(lo, la);
                return <circle key={"p" + i} cx={x} cy={y} r="7" className="qnt-gl__pt" />;
              })}
              <circle cx={cx} cy={cy} r="16" className="qnt-gl__core" />
              <circle cx={cx} cy={cy} r="28" className="qnt-gl__ring" />
            </g>
          );
        })()}
      </svg>
      <ol className="qnt-gl__steps">
        {[
          "One research framework",
          "Multiple markets",
          "Coordinated fieldwork",
          "Consistent specifications",
          "Comparable outputs",
        ].map((t, i) => (
          <li key={t}>
            <span>0{i + 1}</span>
            {t}
          </li>
        ))}
      </ol>
      {null}
    </div>
  );
}
function QNT_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("qnt-overview");
  const [moreInd, setMoreInd] = ee.useState(false);
  const nav = [
    ["qnt-overview", "Overview"],
    ["qnt-process", "Sample to insight"],
    ["qnt-approach", "Approach"],
    ["qnt-methods", "Data collection"],
    ["qnt-quality", "Quality"],
    ["qnt-analysis", "Analysis"],
    ["qnt-services", "Services"],
    ["qnt-panels", "Panels"],
    ["qnt-why", "Why us"],
    ["qnt-faq", "FAQ"],
    ["qnt-enquire", "Contact"],
  ];
  const faqs = serviceFaqs(a, n).map((f) => ({
    ...f,
    q: f.q.replace("quantitative Research", "quantitative research"),
  }));
  const team = a.team || {};
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/quantitative-research";
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
    const title = "Quantitative Research Services | Frequent Research";
    const desc =
      "Quantitative research from Frequent Research: survey design, sampling, quality-controlled data collection, analysis and reporting for confident decisions.";
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
          ["Quantitative Research", "/services/market-research/quantitative-research"],
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
        name: "Quantitative Research",
        serviceType: "Quantitative market research and survey research",
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
  const inds = SERVICE_INDUSTRIES.map(findIndustry).filter(Boolean);
  const extra = INDUSTRIES.filter((x) => !SERVICE_INDUSTRIES.includes(x.slug));
  const panels = PORTALS.filter((p) =>
    ["turn2opinion", "myfrequentrewards", "myhealthopinions"].includes(p.slug),
  );
  return (
    <div className="qnt rc">
      <section className="qnt-hero">
        <div className="container qnt-hero__in">
          <div className="qnt-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="qnt-eyebrow">
              <RC_I n="bars" s={15} />
              Measurement · surveys · statistics
            </span>
            <HeroH1>Quantitative Research</HeroH1>
            <p className="qnt-hero__sub">Turning Data into Decisions</p>
            <p className="qnt-hero__body">
              At Frequent Research, our quantitative research solutions help businesses measure markets, understand
              consumer behaviour, validate hypotheses and make confident decisions backed by reliable data. We support
              the full process, from study design and sampling through data collection, validation, analysis and
              reporting.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg qnt-btn" href="#qnt-enquire" onClick={rcScrollTo("qnt-enquire")}>
                Get a free consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <QNT_Hero />
        </div>
        <div className="container">
          <ul className="qnt-strip">
            {[
              "Usage & Attitude Studies",
              "Brand Tracking",
              "Concept & Product Testing",
              "Pricing & Conjoint Research",
              "B2B Research",
              "B2C Research",
              "Healthcare Research",
            ].map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t}
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
      <section className="rc-sec" id="qnt-overview">
        <div className="container qnt-psw">
          <div>
            <RC_Head kicker="Why quantitative research" title="Measurement You Can Defend" />
            <p className="qnt-quote">{a.problem}</p>
            <p className="od-muted">
              {
                "Quantitative research measures: it sizes markets, compares groups, tracks change and tests hypotheses through structured surveys and statistical analysis. It is different from "
              }
              {svc("qualitative-research", "qualitative research")}, which explores motivations and context in depth.
            </p>
          </div>
          <QNT_PS />
        </div>
      </section>
      <section className="rc-sec qnt-sec--ink" id="qnt-process">
        <div className="container">
          <RC_Head
            light
            center
            kicker="The signature process"
            title="From Sample to Insight"
            intro="Seven stages, run by one team, so the design you approve is the data you receive."
          />
          <QNT_S2I_View />
        </div>
      </section>
      <section className="rc-sec" id="qnt-approach">
        <div className="container">
          <RC_Head
            kicker="Our quantitative research approach"
            title="Designed Around the Business Question"
            intro="Stages 01 to 03: study design, questionnaire and sample. Stages 04 to 07 follow below."
          />
          <QNT_Approach />
          <p className="rdc-note">
            {"Need help framing the question first? See "}
            {svc("research-consultancy", "research consultancy")}
            {" and our "}
            {svc("research-design-cycle", "research design cycle")}.
          </p>
        </div>
      </section>
      <section className="rc-sec qnt-sec--soft" id="qnt-methods">
        <div className="container">
          <RC_Head
            kicker="Stage 04 · Data collection"
            title="Data Collection Methods"
            intro="Four ways to collect quantitative data. The right one depends on who you need to reach and what you need to measure."
          />
          <QNT_Methods />
        </div>
      </section>
      <section className="rc-sec" id="qnt-quality">
        <div className="container">
          <RC_Head
            kicker="Stage 05 · Validation"
            title="Quality-Controlled Quantitative Data"
            intro="Reliable quantitative research depends on reliable respondents and reliable data. These checks are applied depending on project requirements."
          />
          <QNT_QCView />
        </div>
      </section>
      <section className="qnt-mid">
        <div className="container qnt-mid__in">
          <div>
            <strong>Planning a survey or tracker?</strong>
            <span>
              Share your audience, markets and objectives. We will come back with feasibility and an approach.
            </span>
          </div>
          <Link className="btn btn--light btn--lg" to="/lets-talk?type=feasibility">
            Request feasibility
          </Link>
        </div>
      </section>
      <section className="rc-sec qnt-sec--soft" id="qnt-analysis">
        <div className="container">
          <RC_Head
            kicker="Stage 06 · Analysis"
            title="Data Processing & Analysis"
            intro="After fieldwork, responses become a clean, structured dataset ready for statistical analysis."
          />
          <QNT_Proc />
          <ul className="qnt-caps">
            {[
              "Data cleaning",
              "Coding and classification",
              "Open-ended coding",
              "Data tabulation",
              "Cross-tabulation",
              "Weighting where required",
              "Statistical analysis",
              "Segmentation",
              "Trend analysis",
              "Comparative analysis",
            ].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          <p className="rdc-note">
            {"More on this stage: "}
            {svc("data-processing-and-analytics", "data processing & analytics")}.
          </p>
          <div className="qnt-out">
            <div>
              <span className="rc-kicker">Stage 07 · Delivery</span>
              <h2>From Numbers to Meaning</h2>
              <p className="od-muted">
                {
                  "The goal is not just a dataset. Outputs are structured around the research question, so stakeholders can see what the numbers mean and what to do next. Reports are shaped with our "
                }
                {svc("reporting-and-insights", "reporting & insights")}
                {" team."}
              </p>
              <ul className="qnt-out__list">
                {[
                  "Statistical tables",
                  "Executive summaries",
                  "Charts and visualisations",
                  "Key findings",
                  "Consumer or market segments",
                  "Comparative analysis",
                  "Market trends",
                  "Research reports",
                  "Presentation-ready outputs",
                  "Raw and processed datasets",
                ].map((t) => (
                  <li key={t}>
                    <RC_I n="check" s={13} />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div
              className="qnt-stack"
              role="img"
              aria-label="Research outputs: dataset, tables, charts, findings and report"
            >
              {[
                ["database", "Dataset"],
                ["table", "Tables"],
                ["bars", "Charts"],
                ["bulb", "Findings"],
                ["report", "Report"],
              ].map(([ic, t], i) => (
                <div
                  key={t}
                  className={"qnt-stack__s qnt-stack__s" + i}
                  style={{
                    "--i": i,
                  }}
                >
                  <RC_I n={ic} s={18} />
                  <strong>{t}</strong>
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec" id="qnt-services">
        <div className="container">
          <RC_Head
            kicker="Services"
            title="Quantitative Research Services"
            intro="Three audience families and seven research applications around one core discipline. Select any to see what it covers."
          />
          <QNT_Eco />
        </div>
      </section>
      <section className="rc-sec qnt-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Research methodologies"
            title="The Right Study Format"
            intro="Format is chosen by research objective, target population, geography and study requirements."
          />
          <ul className="qnt-fmt">
            {[
              ["monitor", "Online surveys", "online-data-collection"],
              ["phonecall", "Telephone surveys", "cati"],
              ["users", "Face-to-face surveys", "offline-data-collection"],
              ["globe", "Multi-country research", null],
              ["refresh", "Longitudinal & tracking studies", null],
              ["target", "Ad hoc research", null],
            ].map(([ic, t, s]) => (
              <li key={t}>
                {s ? (
                  <Link to={`/services/market-research/${s}`}>
                    <RC_I n={RC_P[ic] ? ic : "phonecall"} s={18} />
                    {t}
                    <RC_I n="arrow" s={13} />
                  </Link>
                ) : (
                  <span>
                    <RC_I n={ic} s={18} />
                    {t}
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="qnt-two">
            <div>
              <h3 className="qnt-h3">Tracking & longitudinal research</h3>
              <p className="od-muted">
                Repeat waves with a consistent core monitor how awareness, attitudes, behaviours, brand perceptions and
                market perceptions change over time.
              </p>
              <QNT_Waves />
            </div>
            <div>
              <h3 className="qnt-h3">Multi-country research</h3>
              <p className="od-muted">
                One framework, coordinated fieldwork and consistent specifications make results comparable across
                markets.
              </p>
              <QNT_Global />
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec qnt-sec--ink">
        <div className="container">
          <RC_Head light kicker="Strengths" title="What We Bring to Quantitative Studies" />
          <ol className="qnt-str">
            {[
              [
                "Global reach",
                "Diverse respondent populations across international markets through our panel and recruitment capabilities.",
              ],
              [
                "Diverse audiences",
                "B2B, B2C and healthcare: professionals, decision-makers, consumers, patients, caregivers and specialist audiences.",
              ],
              [
                "End-to-end execution",
                "Questionnaire development, programming, fieldwork, processing, analysis and reporting.",
              ],
              ["Quality-focused fieldwork", "Structured quality checks and respondent validation."],
              ["Flexible methodologies", "Online, telephone, face-to-face and other quantitative approaches."],
              ["Scalable sample delivery", "Focused studies and larger multi-market programmes."],
              ["Actionable outputs", "Data structured around the research question and business requirement."],
            ].map(([t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 4,
                }}
              >
                <span>0{i + 1}</span>
                <strong>{t}</strong>
                <em>{d}</em>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec" id="qnt-panels">
        <div className="container">
          <RC_Head
            kicker="Research panels"
            title="Powered by Our Research Panels"
            intro="Respondents come from communities we run ourselves."
          />
          <div className="qnt-pan">
            {panels.map((p, i) => (
              <Link key={p.slug} to={`/portals/${p.slug}`} className={"qnt-pan__c qnt-pan__c" + i}>
                <span className="qnt-pan__m br-pan">
                  <PanelMark p={p} size="sm" />
                </span>
                <strong>{p.name}</strong>
                <span className="qnt-pan__a">{p.audience}</span>
                <em>{p.tagline}</em>
                <span className="qnt-pan__go">
                  {"View panel "}
                  <RC_I n="arrow" s={14} />
                </span>
              </Link>
            ))}
          </div>
          <div className="qnt-why" id="qnt-why">
            <h2>Why Clients Choose Frequent Research</h2>
            <ul>
              {[
                ["Statistically robust surveys", "Designs built for the analysis the decision needs."],
                [
                  "Questionnaire review before fieldwork",
                  "Drafts checked for clarity, bias, routing and analysis potential.",
                ],
                ["Sampling and recruitment", "Respondents from our own consumer, business and healthcare panels."],
                [
                  "The full range of studies",
                  "Usage and attitude, brand tracking, concept and product testing, pricing and conjoint.",
                ],
                ["Data-quality controls", "Speeders, straight-liners and duplicates removed before you see the data."],
                ["Consistent trackers", "Stable sampling and quality rules from wave to wave."],
                ["Processing and analysis in-house", "Weighting, tabulation and driver analysis by our own data team."],
                ["A dedicated research team", "One team from questionnaire to report."],
              ].map(([t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i % 2,
                  }}
                >
                  <span className="qnt-why__n">0{i + 1}</span>
                  <div>
                    <strong>{t}</strong>
                    <em>{d}</em>
                  </div>
                </RC_Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec qnt-sec--soft">
        <div className="container qnt-team">
          <div>
            <RC_Head kicker="People" title="The Team Behind Your Project" intro={team.summary} />
            <ul className="qnt-team__roles">
              {(team.roles || []).map((r, i) => (
                <li
                  key={r}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>0{i + 1}</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div className="qnt-team__side">
            <span className="qnt-team__k">Core capabilities</span>
            <ul className="qnt-team__skills">
              {(team.skills || []).map((s) => (
                <li key={s}>
                  <RC_I n="check" s={13} />
                  {s}
                </li>
              ))}
            </ul>
            <span className="qnt-team__k">Tools supporting the workflow</span>
            <ul className="qnt-team__tools">
              {(team.tools || []).map((t) => (
                <li key={t}>{t === "Sampledge" ? <Link to="/products">{t}</Link> : t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries We Support" />
          <div className="rc-ind">
            {inds.map((o) => (
              <Link key={o.slug} className="rc-ind__item" to={`/industries-case-studies/${o.slug}`}>
                <IndustryIcon name={o.icon} size={20} />
                <span>{o.name}</span>
              </Link>
            ))}
            {moreInd &&
              extra.map((o) => (
                <Link key={o.slug} className="rc-ind__item rc-ind__item--x" to={`/industries-case-studies/${o.slug}`}>
                  <IndustryIcon name={o.icon} size={20} />
                  <span>{o.name}</span>
                </Link>
              ))}
            <button className="rc-ind__more" aria-expanded={moreInd} onClick={() => setMoreInd(!moreInd)}>
              {moreInd ? "Show fewer" : "+" + extra.length + " more"}
            </button>
          </div>
          <div className="qnt-ex">
            <div>
              {null}
              <h2>How a Typical Project Looks</h2>
              <p className="qnt-quote qnt-quote--sm">{a.scenario}</p>
              <Link to="/industries-case-studies" className="btn btn--ghost">
                See Case Studies
              </Link>
            </div>
            <ol>
              {[
                "Brief",
                "Feasibility",
                "Recruitment",
                "Online + telephone fieldwork",
                "Cleaning",
                "Country-level tables",
              ].map((t, i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>0{i + 1}</span>
                  {t}
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section section--tint" id="qnt-faq">
        <div className="container split">
          <h2 className="split__title">Quantitative research: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec qnt-guidesec">
        <div className="container">
          <Link to="/blog/quantitative-research-guide" className="qnt-guide">
            <span className="qnt-guide__k">In-depth guide</span>
            <strong>Quantitative Research: Measuring What Matters with Surveys You Can Rely On</strong>
            <span className="qnt-guide__go">
              {"Read the guide "}
              <RC_I n="arrow" s={15} />
            </span>
            <svg viewBox="0 0 200 80" aria-hidden="true" className="qnt-guide__art">
              {[0.3, 0.55, 0.8, 1, 0.7, 0.45, 0.2].map((h, i) => (
                <rect key={i} x={10 + i * 26} y={76 - h * 64} width="18" height={h * 64} rx="3" />
              ))}
            </svg>
          </Link>
        </div>
      </section>
      <section className="section section--tint" id="qnt-enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>Talk to Our Research Team About Quantitative Research</h2>
            <p>Share a few details and a specialist will reply within one working day.</p>
            <h3>Related services</h3>
            <ul className="related">
              {[
                ["data-processing-and-analytics", "Data Processing & Analytics"],
                ["reporting-and-insights", "Reporting & Insights"],
                ["online-data-collection", "Online Data Collection"],
                ["offline-data-collection", "Offline Data Collection"],
                ["cati", "CATI \u2014 Computer-Assisted Telephone Interviewing"],
                ["qualitative-research", "Qualitative Research"],
                ["consumer-panel", "Consumer Panel"],
                ["business-panel", "Business Panel"],
                ["healthcare-panel", "Healthcare Panel"],
              ].map(([s, t]) => (
                <li key={s}>
                  <Link to={`/services/market-research/${s}`}>{t}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-form">
            <Form type={SERVICE_FORM_KEY[a.slug]} service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
      <section className="qnt-cta">
        <svg className="qnt-cta__bg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from(
            {
              length: 40,
            },
            (_, i) => (
              <rect
                key={i}
                x={i * 30 + 4}
                y={300 - (40 + ((i * 53) % 9) * 22)}
                width="18"
                height={40 + ((i * 53) % 9) * 22}
                rx="3"
              />
            ),
          )}
        </svg>
        <div className="container qnt-cta__in">
          <h2>Let's Build Your Next Quantitative Study</h2>
          <p>
            Whether you are planning a single-market survey or a multi-country research programme, Frequent Research can
            help structure and execute the research around your study requirements.
          </p>
          <div className="od-hero__ctas">
            <Link className="btn btn--light btn--lg" to="/lets-talk?type=quote">
              Request a Quote
            </Link>
            <Link className="btn btn--outline-light btn--lg" to="/lets-talk">
              Talk to an Expert
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export { QNT_Page, odP };
