import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY, SERVICE_INDUSTRIES, WU_Section, serviceFaqs } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { odP } from './QNTPage.jsx';

const DPA_CONFIG = {
  team: [
    ["users", "Research consultants"],
    ["filter", "Panel & sampling managers"],
    ["cpu", "Survey programmers"],
    ["msg", "Field supervisors & moderators"],
    ["bars", "Data processing & analytics specialists"],
  ],
};
const dpaRnd = (s) => () => (s = (s * 9301 + 49297) % 233280) / 233280;
const dpaPath = (vals, w, h, x0 = 0, y0 = 0) =>
  vals
    .map((v, i) => `${i ? "L" : "M"}${(x0 + (i * w) / (vals.length - 1)).toFixed(1)} ${(y0 + h - v * h).toFixed(1)}`)
    .join(" ");
const dpaReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const dpaSeries = (seed, n, base = 0.45, amp = 0.18, slope = 0.25) => {
  const r = dpaRnd(seed);
  return Array.from(
    {
      length: n,
    },
    (_, i) =>
      Math.max(
        0.05,
        Math.min(0.95, base + (slope * i) / n + amp * Math.sin(i / 1.4 + seed) * 0.6 + (r() - 0.5) * 0.22),
      ),
  );
};
const DPA_Illus = () => null;
const DPA_HSTAGES = ["Raw data", "Clean", "Code", "Validate", "Analyze", "Visualize", "Insight", "Decision"];
function DPA_HeroViz() {
  const [k, setK] = ee.useState(dpaReduce() ? 7 : 0);
  ee.useEffect(() => {
    if (dpaReduce()) return;
    const t = setInterval(() => setK((x) => (x + 1) % 8), 1400);
    return () => clearInterval(t);
  }, []);
  const r = dpaRnd(11);
  const raw = Array.from(
    {
      length: 54,
    },
    () => [12 + r() * 150, 16 + r() * 168, 1.6 + r() * 3.4, r()],
  );
  const cols = ["#07104F", "#0B22A8", "#5A3FE0", "#0E8A8A", "#C99A2E", "#1E5BFF"];
  return (
    <div className="dpa-hv">
      <svg
        viewBox="0 0 520 200"
        className="dpa-hv__svg"
        role="img"
        aria-label="Unstructured raw data points flowing through the Frequent Research pipeline and emerging as an organised, structured dataset"
      >
        <defs>
          {ee.createElement(
            "linearGradient",
            {
              id: "dpaFlow",
              x1: "0",
              x2: "1",
            },
            <stop offset="0" stopColor="#B9C2D3" />,
            <stop offset="1" stopColor="#5A3FE0" />,
          )}
        </defs>
        <rect x="4" y="8" width="168" height="184" rx="14" className="dpa-hv__zone" />
        {raw.map(([x, y, s, c], i) =>
          c > 0.82 ? (
            <path
              key={i}
              d={`M${x - s} ${y - s}L${x + s} ${y + s}M${x + s} ${y - s}L${x - s} ${y + s}`}
              className="dpa-hv__x"
              style={{
                "--i": i % 9,
              }}
            />
          ) : (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={s}
              className={"dpa-hv__raw" + (c < 0.25 ? " is-b" : "")}
              style={{
                "--i": i % 9,
              }}
            />
          ),
        )}
        {[30, 58, 86, 114, 142, 170].map((y, i) => (
          <path
            key={y}
            d={`M172 ${y} C210 ${y} 214 100 246 100`}
            className="dpa-hv__in"
            style={{
              "--i": i,
            }}
          />
        ))}
        <rect x="246" y="74" width="62" height="52" rx="12" className="dpa-hv__core" />
        <text x="277" y="96" textAnchor="middle" className="dpa-hv__ct">
          FR
        </text>
        <text x="277" y="112" textAnchor="middle" className="dpa-hv__cs">
          pipeline
        </text>
        {[34, 62, 90, 118, 146, 174].map((y, i) => (
          <path
            key={y}
            d={`M308 100 C338 100 342 ${y} 368 ${y}`}
            className="dpa-hv__out"
            style={{
              "--i": i,
            }}
          />
        ))}
        {Array.from(
          {
            length: 6,
          },
          (_, row) =>
            Array.from(
              {
                length: 7,
              },
              (_2, c) => (
                <rect
                  key={row + "-" + c}
                  x={372 + c * 20}
                  y={26 + row * 28}
                  width="15"
                  height="15"
                  rx="3"
                  fill={cols[c % 6]}
                  className="dpa-hv__cell"
                  style={{
                    "--i": row + c,
                    opacity: 0.35 + ((row * 7 + c) % 5) * 0.13,
                  }}
                />
              ),
            ),
        )}
        <text x="88" y="198" textAnchor="middle" className="dpa-hv__lbl">
          Unstructured
        </text>
        <text x="441" y="198" textAnchor="middle" className="dpa-hv__lbl">
          Structured
        </text>
      </svg>
      <ol className="dpa-hv__st" aria-label="Data to decision pipeline">
        {DPA_HSTAGES.map((t, i) => (
          <li key={t} className={(i <= k ? "is-done " : "") + (i === k ? "is-cur" : "")}>
            {t}
          </li>
        ))}
      </ol>
      <div className={"dpa-hv__end" + (k === 7 ? " is-on" : "")}>
        <RC_I n="flag" s={16} />
        <strong>Decision-Ready Intelligence</strong>
      </div>
    </div>
  );
}
function DPA_Mini() {
  const t = dpaSeries(4, 14, 0.35, 0.3, 0.4);
  return (
    <div
      className="dpa-mini"
      role="img"
      aria-label="Analytics environment with KPI cards, trend line, bar chart, segment chart, map and data quality indicator"
    >
      <div className="dpa-mini__head">
        <span>
          <i />
          <i />
          <i />
        </span>
        <DPA_Illus t="Illustrative analytics environment" />
      </div>
      <div className="dpa-mini__grid">
        <div className="dpa-mini__t dpa-mini__kpi">
          {["KPI A", "KPI B", "KPI C"].map((x, i) => (
            <div key={x}>
              <span>{x}</span>
              <svg viewBox="0 0 60 18">
                <path d={dpaPath(dpaSeries(20 + i, 8, 0.4, 0.4, i === 1 ? -0.3 : 0.4), 60, 16, 0, 1)} />
              </svg>
              <b className={i === 1 ? "is-dn" : "is-up"}>{i === 1 ? "\u25BC" : "\u25B2"}</b>
            </div>
          ))}
        </div>
        <div className="dpa-mini__t dpa-mini__trend">
          <span>Trend</span>
          <svg viewBox="0 0 140 50" preserveAspectRatio="none">
            <path d={dpaPath(t, 140, 44, 0, 3) + " L140 50 L0 50Z"} className="dpa-a" />
            <path d={dpaPath(t, 140, 44, 0, 3)} className="dpa-l" />
          </svg>
        </div>
        <div className="dpa-mini__t dpa-mini__bars">
          <span>Comparison</span>
          <div>
            {[0.55, 0.8, 0.42, 0.68, 0.9].map((h, i) => (
              <i
                key={i}
                style={{
                  "--h": h,
                  "--i": i,
                }}
              />
            ))}
          </div>
        </div>
        <div className="dpa-mini__t dpa-mini__seg">
          <span>Segments</span>
          <svg viewBox="0 0 42 42">
            <circle cx="21" cy="21" r="15" pathLength="100" strokeDasharray="42 58" strokeDashoffset="25" />
            <circle cx="21" cy="21" r="15" pathLength="100" strokeDasharray="33 67" strokeDashoffset="-17" />
            <circle cx="21" cy="21" r="15" pathLength="100" strokeDasharray="25 75" strokeDashoffset="-50" />
          </svg>
        </div>
        <div className="dpa-mini__t dpa-mini__map">
          <span>Geography</span>
          <svg viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}>
            <path d={OD_WORLD.d} className="dpa-dots" />
            {[
              [-98, 40, 40],
              [10, 50, 30],
              [78, 22, 46],
              [112, 28, 26],
            ].map(([lo, la, s]) => {
              const [x, y] = odP(lo, la);
              return <circle key={lo} cx={x} cy={y} r={s} className="dpa-mini__bub" />;
            })}
          </svg>
        </div>
        <div className="dpa-mini__t dpa-mini__q">
          <span>Data quality</span>
          <ul>
            {["Complete", "Consistent", "Validated"].map((x) => (
              <li key={x}>
                <RC_I n="check" s={11} />
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
function DPA_Problem() {
  const [ref, v] = RC_useInView(0.25);
  const bad = [
    "Raw responses",
    "Incomplete data",
    "Inconsistent variables",
    "Uncoded responses",
    "Unvalidated data",
    "Unstructured dataset",
    "Difficult analysis",
    "Unclear decision",
  ];
  const good = ["Clean", "Validate", "Process", "Analyze", "Visualize", "Interpret", "Act"];
  return (
    <div ref={ref} className={"dpa-prob" + (v ? " is-in" : "")}>
      <div className="dpa-prob__lane dpa-prob__lane--bad">
        <span className="dpa-prob__k">
          <RC_I n="alert" s={15} />
          Raw data is not decision-ready data
        </span>
        <ol>
          {bad.map((t, i) => (
            <li
              key={t}
              style={{
                "--i": i,
                "--r": ((i % 3) - 1) * 1.6 + "deg",
              }}
            >
              {t}
            </li>
          ))}
        </ol>
      </div>
      <div className="dpa-prob__lane dpa-prob__lane--good">
        <span className="dpa-prob__k">
          <RC_I n="okc" s={15} />
          With Frequent Research
        </span>
        <ol>
          {good.map((t, i) => (
            <li
              key={t}
              style={{
                "--i": i,
              }}
            >
              <span>0{i + 1}</span>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
const DPA_SOL = [
  ["filter", "Clean", "Remove duplicates, speeders and invalid records."],
  ["tag", "Code", "Turn open-ended answers into structured codes."],
  ["okc", "Validate", "Check logic, completeness and consistency."],
  ["sliders", "Weight", "Align the sample with the target population."],
  ["calc", "Analyze", "Apply the right statistical techniques."],
  ["pie", "Visualize", "Make the evidence easy to read."],
  ["bulb", "Interpret", "Explain what the results mean."],
  ["flag", "Decide", "Connect evidence to business action."],
];
function DPA_Solution() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <ol ref={ref} className={"dpa-sol" + (v ? " is-in" : "")}>
      {DPA_SOL.map(([ic, t, d], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span className="dpa-sol__n">0{i + 1}</span>
          <span className="dpa-sol__ic">
            <RC_I n={ic} s={20} />
          </span>
          <strong>{t}</strong>
          <span className="dpa-sol__d">{d}</span>
        </li>
      ))}
    </ol>
  );
}
function DPA_Included() {
  const svc = (s, label) => <Link to={`/services/market-research/${s}`}>{label}</Link>;
  const rows = [
    ["R-0142", "ok"],
    ["R-0143", "dup"],
    ["R-0144", "ok"],
    ["R-0145", "speed"],
    ["R-0146", "ok"],
    ["R-0147", "logic"],
  ];
  const flag = {
    dup: "Duplicate",
    speed: "Speeder",
    logic: "Logic fail",
  };
  return (
    <div className="dpa-inc">
      <article className="dpa-inc__m dpa-inc__m--clean">
        <header>
          <span className="dpa-inc__ic">
            <RC_I n="shield" s={20} />
          </span>
          <div>
            <h3>Data Cleaning & Validation</h3>
            <p>Records that fail quality checks are flagged and removed before analysis begins.</p>
          </div>
        </header>
        <div
          className="dpa-qc"
          role="img"
          aria-label="Quality check table where duplicate, speeder and logic-fail records are flagged"
        >
          <div className="dpa-qc__h">
            <span>Record</span>
            <span>Status</span>
          </div>
          {rows.map(([id, s], i) => (
            <div
              key={id}
              className={"dpa-qc__r" + (s !== "ok" ? " is-bad" : "")}
              style={{
                "--i": i,
              }}
            >
              <span>{id}</span>
              <span>
                {s === "ok" ? (
                  <>
                    <RC_I n="check" s={12} />
                    Valid
                  </>
                ) : (
                  <>
                    <RC_I n="x" s={12} />
                    {flag[s]}
                  </>
                )}
              </span>
            </div>
          ))}
        </div>
        <DPA_Illus />
      </article>
      <article className="dpa-inc__m dpa-inc__m--code">
        <header>
          <span className="dpa-inc__ic">
            <RC_I n="tag" s={20} />
          </span>
          <div>
            <h3>Open-End Coding</h3>
            <p>Verbatim answers are grouped into a code frame agreed with the research team.</p>
          </div>
        </header>
        <div className="dpa-code" role="img" aria-label="Open-ended answers mapped to codes">
          <ul className="dpa-code__v">
            {[
              ["\u201CTook ages to arrive\u201D", 0],
              ["\u201CReally simple to set up\u201D", 1],
              ["\u201CA bit pricey for what it is\u201D", 2],
              ["\u201CDelivery was late again\u201D", 0],
              ["\u201CEasy to use from day one\u201D", 1],
            ].map(([t, c], i) => (
              <li
                key={i}
                className={"c" + c}
                style={{
                  "--i": i,
                }}
              >
                {t}
              </li>
            ))}
          </ul>
          <span className="dpa-code__arrow" aria-hidden="true">
            →
          </span>
          <ul className="dpa-code__c">
            {["Delivery", "Ease of use", "Price"].map((t, i) => (
              <li key={t} className={"c" + i}>
                {t}
              </li>
            ))}
          </ul>
        </div>
        <DPA_Illus />
      </article>
      <article className="dpa-inc__m dpa-inc__m--wt">
        <header>
          <span className="dpa-inc__ic">
            <RC_I n="sliders" s={20} />
          </span>
          <div>
            <h3>Weighting & Tabulation</h3>
            <p>Samples are weighted to the target profile and tabulated to your analysis plan.</p>
          </div>
        </header>
        <div
          className="dpa-wt"
          role="img"
          aria-label="Chart comparing unweighted sample, target profile and weighted sample"
        >
          {["Group 1", "Group 2", "Group 3", "Group 4"].map((g, i) => {
            const u = [0.7, 0.35, 0.55, 0.3][i],
              tg = [0.5, 0.45, 0.5, 0.4][i];
            return (
              <div key={g} className="dpa-wt__g">
                <div className="dpa-wt__bars">
                  <i
                    className="u"
                    style={{
                      "--h": u,
                    }}
                  />
                  <i
                    className="w"
                    style={{
                      "--h": tg,
                    }}
                  />
                  <b
                    style={{
                      "--h": tg,
                    }}
                  />
                </div>
                <span>{g}</span>
              </div>
            );
          })}
          <div className="dpa-wt__lg">
            <span>
              <i className="u" />
              Unweighted
            </span>
            <span>
              <i className="w" />
              Weighted
            </span>
            <span>
              <b />
              Target
            </span>
          </div>
        </div>
        <DPA_Illus />
      </article>
      <article className="dpa-inc__m dpa-inc__m--drv">
        <header>
          <span className="dpa-inc__ic">
            <RC_I n="trend" s={20} />
          </span>
          <div>
            <h3>Statistical & Driver Analysis</h3>
            <p>Significance testing and driver models show what really moves the outcome.</p>
          </div>
        </header>
        <div className="dpa-drv" role="img" aria-label="Driver importance chart">
          {[
            ["Service quality", 0.92],
            ["Ease of use", 0.74],
            ["Value for money", 0.61],
            ["Brand trust", 0.48],
            ["Availability", 0.3],
          ].map(([t, w], i) => (
            <div
              key={t}
              className="dpa-drv__r"
              style={{
                "--w": w,
                "--i": i,
              }}
            >
              <span>{t}</span>
              <i />
            </div>
          ))}
          <div className="dpa-drv__ax">
            <span>Lower impact</span>
            <span>Higher impact</span>
          </div>
        </div>
        <DPA_Illus />
      </article>
      <p className="rdc-note dpa-inc__note">
        {"When the data comes from our own "}
        {svc("online-data-collection", "online")}
        {" or "}
        {svc("offline-data-collection", "offline")}
        {" fieldwork, processing starts with full knowledge of how it was collected."}
      </p>
    </div>
  );
}
const DPA_PIPE = [
  [
    "database",
    "Data Intake",
    "Raw survey, operational or business data is received, documented and checked against the questionnaire and data map.",
    ["Survey exports", "Operational data", "Business datasets", "Data map review"],
  ],
  [
    "filter",
    "Data Cleaning",
    "We identify and resolve the problems that would distort results.",
    ["Missing values", "Duplicates", "Inconsistencies", "Invalid records", "Structural errors"],
  ],
  [
    "tag",
    "Coding",
    "Open-ended and categorical responses are transformed into structured analytical variables.",
    ["Code frames", "Verbatim coding", "Recoding", "Derived variables"],
  ],
  [
    "okc",
    "Validation",
    "The cleaned dataset is checked before anyone analyses it.",
    ["Consistency", "Completeness", "Integrity", "Logical relationships"],
  ],
  [
    "sliders",
    "Weighting & Tabulation",
    "Datasets are prepared for representative analysis and structured reporting.",
    ["Weighting schemes", "Banner tables", "Significance testing", "Table checking"],
  ],
  [
    "calc",
    "Statistical Analysis",
    "Appropriate analytical techniques are applied to the research question.",
    ["Descriptive statistics", "Regression", "Driver analysis", "Segmentation"],
  ],
  [
    "pie",
    "Visualization",
    "Findings are converted into understandable visual representations.",
    ["Charts", "Dashboards", "Maps", "Data stories"],
  ],
  [
    "bulb",
    "Insight",
    "Meaningful patterns and implications are identified.",
    ["Patterns", "Drivers", "Differences", "Implications"],
  ],
  ["flag", "Decision", "Evidence is translated into business action.", ["Recommendations", "Priorities", "Next steps"]],
];
function DPA_Pipeline() {
  const [a, setA] = ee.useState(0);
  const s = DPA_PIPE[a];
  return (
    <div className="dpa-pipe">
      <ol className="dpa-pipe__rail" role="tablist" aria-label="Data processing stages">
        {DPA_PIPE.map(([ic, t], i) => (
          <li key={t} role="presentation">
            <button
              role="tab"
              aria-selected={a === i}
              className={(a === i ? "is-on " : "") + (i < a ? "is-past" : "")}
              onClick={() => setA(i)}
            >
              <span className="dpa-pipe__dot">
                <RC_I n={ic} s={18} />
              </span>
              <span className="dpa-pipe__n">Stage 0{i + 1}</span>
              <span className="dpa-pipe__t">{t}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="dpa-pipe__bar" aria-hidden="true">
        <i
          style={{
            width: ((a + 1) / 9) * 100 + "%",
          }}
        />
      </div>
      <div className="dpa-pipe__panel" key={a} role="tabpanel" aria-live="polite">
        <div>
          <span className="dpa-pipe__pn">
            Stage 0{a + 1}
            {" of 09"}
          </span>
          <h3>
            <RC_I n={s[0]} s={22} />
            {s[1]}
          </h3>
          <p>{s[2]}</p>
        </div>
        <ul>
          {s[3].map((x, i) => (
            <li
              key={x}
              style={{
                "--i": i,
              }}
            >
              <RC_I n="check" s={14} />
              {x}
            </li>
          ))}
        </ul>
        <div className="dpa-pipe__nav">
          <button onClick={() => setA((a + 8) % 9)} aria-label="Previous stage">
            ←
          </button>
          <button onClick={() => setA((a + 1) % 9)} aria-label="Next stage">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
function DPA_Dash() {
  const [seg, setSeg] = ee.useState(0);
  const [per, setPer] = ee.useState(0);
  const [drill, setDrill] = ee.useState(null);
  const segs = ["All", "Segment A", "Segment B", "Segment C"];
  const regs = ["North", "South", "East", "West", "Central"];
  const r = dpaRnd(31 + seg * 7 + per * 3);
  const trend = dpaSeries(40 + seg * 5 + per, per ? 12 : 8, 0.4, 0.3, 0.35);
  const prev = dpaSeries(90 + seg * 5 + per, per ? 12 : 8, 0.32, 0.25, 0.3);
  const bars = regs.map(() => 0.3 + r() * 0.65);
  const heat = Array.from(
    {
      length: 4,
    },
    () =>
      Array.from(
        {
          length: 6,
        },
        () => r(),
      ),
  );
  const anomaly = trend.indexOf(Math.max(...trend));
  return (
    <div className="dpa-dash" role="group" aria-label="Interactive dashboard">
      <aside className="dpa-dash__f">
        <span className="dpa-dash__fk">
          <RC_I n="filter" s={14} />
          Filters
        </span>
        <div className="dpa-dash__fg" role="radiogroup" aria-label="Segment">
          {segs.map((s, i) => (
            <button
              key={s}
              role="radio"
              aria-checked={seg === i}
              className={seg === i ? "is-on" : ""}
              onClick={() => {
                setSeg(i);
                setDrill(null);
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <span className="dpa-dash__fk">
          <RC_I n="cal" s={14} />
          Period
        </span>
        <div className="dpa-dash__fg dpa-dash__fg--row" role="radiogroup" aria-label="Period">
          {["Quarterly", "Monthly"].map((s, i) => (
            <button
              key={s}
              role="radio"
              aria-checked={per === i}
              className={per === i ? "is-on" : ""}
              onClick={() => setPer(i)}
            >
              {s}
            </button>
          ))}
        </div>
        <DPA_Illus />
      </aside>
      <div className="dpa-dash__main">
        <div className="dpa-dash__kpis">
          {["Awareness", "Consideration", "Satisfaction", "Advocacy"].map((k, i) => {
            const v = dpaSeries(seg * 11 + per * 5 + i * 3, 8, 0.4, 0.4, i === 2 && seg === 2 ? -0.4 : 0.35);
            const up = v[7] >= v[0];
            return (
              <div key={k} className="dpa-dash__kpi">
                <span>
                  {k}
                  {" index"}
                </span>
                <svg viewBox="0 0 80 24" aria-hidden="true">
                  <path d={dpaPath(v, 80, 20, 0, 2)} />
                </svg>
                <b className={up ? "is-up" : "is-dn"}>{up ? "\u25B2 Rising" : "\u25BC Falling"}</b>
              </div>
            );
          })}
        </div>
        <div className="dpa-dash__row">
          <div className="dpa-dash__card dpa-dash__trend">
            <span className="dpa-dash__ct">Trend vs previous period</span>
            <svg viewBox="0 0 300 120" preserveAspectRatio="none" aria-hidden="true">
              {[30, 60, 90].map((y) => (
                <line key={y} x1="0" x2="300" y1={y} y2={y} className="dpa-grid" />
              ))}
              <path d={dpaPath(prev, 300, 100, 0, 10)} className="dpa-dash__prev" />
              <path d={dpaPath(trend, 300, 100, 0, 10) + " L300 120 L0 120Z"} className="dpa-a" />
              <path key={seg + "-" + per} d={dpaPath(trend, 300, 100, 0, 10)} className="dpa-l dpa-draw" />
              <circle
                cx={(anomaly * 300) / (trend.length - 1)}
                cy={10 + 100 - trend[anomaly] * 100}
                r="6"
                className="dpa-anom"
              />
            </svg>
            <div className="dpa-dash__lg">
              <span>
                <i className="cur" />
                Current
              </span>
              <span>
                <i className="prv" />
                Previous
              </span>
              <span>
                <i className="an" />
                Anomaly flagged
              </span>
            </div>
          </div>
          <div className="dpa-dash__card dpa-dash__cmp">
            <span className="dpa-dash__ct">
              {drill === null ? "Segment comparison \xB7 click a bar to drill down" : `Drill-down: ${regs[drill]}`}
            </span>
            {drill === null ? (
              <div className="dpa-dash__bars">
                {bars.map((h, i) => (
                  <button
                    key={regs[i]}
                    style={{
                      "--h": h,
                      "--i": i,
                    }}
                    onClick={() => setDrill(i)}
                    aria-label={`Drill into ${regs[i]}`}
                  >
                    <i />
                    <span>{regs[i]}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="dpa-dash__drill">
                {["Segment A", "Segment B", "Segment C"].map((s, i) => (
                  <div
                    key={s}
                    style={{
                      "--w": 0.3 + ((drill + i * 2) % 5) * 0.15,
                      "--i": i,
                    }}
                  >
                    <span>{s}</span>
                    <i />
                  </div>
                ))}
                <button className="rc-link" onClick={() => setDrill(null)}>
                  ← Back to all regions
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="dpa-dash__card dpa-dash__heat">
          <span className="dpa-dash__ct">Performance heatmap</span>
          <div className="dpa-heat" aria-hidden="true">
            {heat.map((row, ri) => (
              <div key={ri} className="dpa-heat__r">
                <span>{"Metric " + (ri + 1)}</span>
                {row.map((v, ci) => (
                  <i
                    key={ci}
                    style={{
                      "--v": v,
                    }}
                  />
                ))}
              </div>
            ))}
            <div className="dpa-heat__r dpa-heat__x">
              <span />{" "}
              {["P1", "P2", "P3", "P4", "P5", "P6"].map((p) => (
                <b key={p}>{p}</b>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function DPA_MiniChart({ k }) {
  const r = dpaRnd(k.length * 13);
  if (k === "bar")
    return (
      <svg viewBox="0 0 120 70">
        {[0.8, 0.6, 0.5, 0.35, 0.2].map((w, i) => (
          <rect key={i} x="6" y={6 + i * 12} width={w * 106} height="8" rx="2" className={i ? "f2" : "f1"} />
        ))}
      </svg>
    );
  if (k === "col")
    return (
      <svg viewBox="0 0 120 70">
        {[0.5, 0.7, 0.45, 0.9, 0.6, 0.75].map((h, i) => (
          <rect
            key={i}
            x={8 + i * 18}
            y={66 - h * 58}
            width="12"
            height={h * 58}
            rx="2"
            className={i === 3 ? "f1" : "f2"}
          />
        ))}
      </svg>
    );
  if (k === "line") {
    const v = dpaSeries(3, 10, 0.3, 0.3, 0.4),
      w = dpaSeries(8, 10, 0.25, 0.2, 0.2);
    return (
      <svg viewBox="0 0 120 70">
        <path d={dpaPath(w, 110, 56, 5, 6)} className="s2" />
        <path d={dpaPath(v, 110, 56, 5, 6)} className="s1" />
      </svg>
    );
  }
  if (k === "area") {
    const v = dpaSeries(5, 10, 0.35, 0.3, 0.35);
    return (
      <svg viewBox="0 0 120 70">
        <path d={dpaPath(v, 110, 56, 5, 6) + " L115 66 L5 66Z"} className="a1" />
        <path d={dpaPath(v, 110, 56, 5, 6)} className="s1" />
      </svg>
    );
  }
  if (k === "pie")
    return (
      <svg viewBox="0 0 120 70">
        <g transform="translate(60 35)">
          <circle r="28" className="p3" />
          <path d="M0 0 L0 -28 A28 28 0 0 1 26.6 8.7Z" className="p1" />
          <path d="M0 0 L26.6 8.7 A28 28 0 0 1 -12 25.3Z" className="p2" />
        </g>
      </svg>
    );
  if (k === "donut")
    return (
      <svg viewBox="0 0 120 70">
        <g transform="translate(60 35)" fill="none" strokeWidth="11">
          <circle r="24" pathLength="100" strokeDasharray="45 55" className="d1" transform="rotate(-90)" />
          <circle
            r="24"
            pathLength="100"
            strokeDasharray="30 70"
            strokeDashoffset="-45"
            className="d2"
            transform="rotate(-90)"
          />
          <circle
            r="24"
            pathLength="100"
            strokeDasharray="25 75"
            strokeDashoffset="-75"
            className="d3"
            transform="rotate(-90)"
          />
        </g>
      </svg>
    );
  if (k === "scatter")
    return (
      <svg viewBox="0 0 120 70">
        <line x1="8" y1="62" x2="112" y2="10" className="s2" />
        {Array.from(
          {
            length: 26,
          },
          (_, i) => {
            const x = 8 + r() * 104;
            return (
              <circle
                key={i}
                cx={x}
                cy={Math.max(6, Math.min(66, 66 - (x - 8) * 0.5 - (r() - 0.5) * 26))}
                r="2.4"
                className="f1"
              />
            );
          },
        )}
      </svg>
    );
  if (k === "heat")
    return (
      <svg viewBox="0 0 120 70">
        {Array.from(
          {
            length: 4,
          },
          (_, y) =>
            Array.from(
              {
                length: 7,
              },
              (_2, x) => (
                <rect
                  key={x + "-" + y}
                  x={6 + x * 15.5}
                  y={4 + y * 16}
                  width="13.5"
                  height="14"
                  rx="2"
                  className="f1"
                  style={{
                    opacity: 0.15 + r() * 0.85,
                  }}
                />
              ),
            ),
        )}
      </svg>
    );
  return (
    <svg viewBox="0 0 120 70">
      {[0.1, 0.22, 0.45, 0.72, 0.92, 0.78, 0.5, 0.28, 0.14, 0.06].map((h, i) => (
        <rect key={i} x={8 + i * 10.5} y={64 - h * 56} width="9" height={h * 56} className="f2" />
      ))}
      <path d="M8 60 C30 58 40 12 58 10 C76 12 86 56 112 62" className="s1" fill="none" />
    </svg>
  );
}
const DPA_GAL = [
  ["bar", "Bar chart", "Ranking categories"],
  ["col", "Column chart", "Comparing groups"],
  ["line", "Line chart", "Change over time"],
  ["area", "Area chart", "Volume over time"],
  ["pie", "Pie chart", "Simple share of a whole"],
  ["donut", "Donut chart", "Share with a headline"],
  ["scatter", "Scatter plot", "Relationships between variables"],
  ["heat", "Heatmap", "Patterns across two dimensions"],
  ["dist", "Distribution", "Spread and outliers"],
];
const DPA_REG = [
  ["North America", -100, 42, 0.8],
  ["Latin America", -60, -12, 0.45],
  ["Europe", 12, 50, 0.9],
  ["Africa", 20, 4, 0.35],
  ["MENA", 45, 26, 0.6],
  ["India", 78, 22, 0.75],
  ["Asia-Pacific", 115, 22, 0.65],
];
function DPA_Geo() {
  const [m, setM] = ee.useState(0);
  const modes = ["Bubble map", "Heat map", "Regional overlay"];
  return (
    <div className="dpa-geo">
      <div className="dpa-geo__tabs" role="tablist" aria-label="Map type">
        {modes.map((t, i) => (
          <button key={t} role="tab" aria-selected={m === i} className={m === i ? "is-on" : ""} onClick={() => setM(i)}>
            {t}
          </button>
        ))}
      </div>
      <div className="dpa-geo__map">
        <svg
          viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
          role="img"
          aria-label={`${modes[m].toLowerCase()} of regional values on a world map`}
        >
          <defs>
            {ee.createElement(
              "radialGradient",
              {
                id: "dpaHeat",
              },
              <stop offset="0" stopColor="#C2603F" stopOpacity=".75" />,
              <stop offset=".55" stopColor="#C99A2E" stopOpacity=".35" />,
              <stop offset="1" stopColor="#C99A2E" stopOpacity="0" />,
            )}
          </defs>
          <path d={OD_WORLD.d} className="dpa-dots" />
          {DPA_REG.map(([n, lo, la, v], i) => {
            const [x, y] = odP(lo, la);
            if (m === 0)
              return (
                <g
                  key={n}
                  className="dpa-geo__b"
                  style={{
                    "--i": i,
                  }}
                >
                  <circle cx={x} cy={y} r={14 + v * 34} />
                  <text x={x} y={y + 4} textAnchor="middle">
                    {n}
                  </text>
                </g>
              );
            if (m === 1)
              return (
                <circle
                  key={n}
                  cx={x}
                  cy={y}
                  r={40 + v * 60}
                  fill="url(#dpaHeat)"
                  className="dpa-geo__h"
                  style={{
                    "--i": i,
                  }}
                />
              );
            return (
              <g
                key={n}
                className="dpa-geo__o"
                style={{
                  "--v": v,
                  "--i": i,
                }}
              >
                <rect x={x - 66} y={y - 17} width="132" height="34" rx="17" />
                <text x={x} y={y + 5} textAnchor="middle">
                  {n}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="dpa-geo__lg">
          <span>Lower</span>
          <i />
          <span>Higher</span>
          <DPA_Illus />
        </div>
      </div>
    </div>
  );
}
function DPA_Network() {
  const [h, setH] = ee.useState(null);
  const r = dpaRnd(5);
  const centers = [
    [150, 120],
    [340, 90],
    [250, 240],
  ];
  const nodes = [];
  centers.forEach(([cx, cy], c) => {
    nodes.push({
      x: cx,
      y: cy,
      c,
      hub: true,
    });
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + r();
      const d = 46 + r() * 36;
      nodes.push({
        x: cx + Math.cos(a) * d,
        y: cy + Math.sin(a) * d * 0.85,
        c,
      });
    }
  });
  const edges = [];
  nodes.forEach((n, i) => {
    if (!n.hub) edges.push([i, n.c * 10]);
  });
  edges.push([0, 10], [10, 20], [0, 20], [3, 14], [7, 25], [16, 23]);
  const hot = (e) => h !== null && (e[0] === h || e[1] === h);
  return (
    <div className="dpa-net">
      <svg
        viewBox="0 0 480 330"
        role="img"
        aria-label="Node-link network with three clusters connected through central nodes"
      >
        {edges.map((e, i) => (
          <line
            key={i}
            x1={nodes[e[0]].x}
            y1={nodes[e[0]].y}
            x2={nodes[e[1]].x}
            y2={nodes[e[1]].y}
            className={
              "dpa-net__e" + (nodes[e[0]].hub && nodes[e[1]].hub ? " is-bridge" : "") + (hot(e) ? " is-hot" : "")
            }
          />
        ))}
        {centers.map(([x, y], c) => (
          <circle
            key={"p" + c}
            cx={x}
            cy={y}
            r="30"
            className={"dpa-net__pulse c" + c}
            style={{
              "--i": c,
            }}
          />
        ))}
        {nodes.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.hub ? 13 : 6}
            className={"dpa-net__n c" + n.c + (n.hub ? " is-hub" : "") + (h === i ? " is-on" : "")}
            tabIndex={n.hub ? 0 : -1}
            onMouseEnter={() => setH(i)}
            onMouseLeave={() => setH(null)}
            onFocus={() => setH(i)}
            onBlur={() => setH(null)}
          >
            <title>{n.hub ? "Central node" : "Node"}</title>
          </circle>
        ))}
      </svg>
      <div className="dpa-net__lg">
        <span>
          <i className="hub" />
          Central node
        </span>
        <span>
          <i className="nd" />
          Node
        </span>
        <span>
          <i className="ln" />
          Relationship
        </span>
        <span>
          <i className="br" />
          Bridge between clusters
        </span>
        <DPA_Illus />
      </div>
    </div>
  );
}
function DPA_Time({ compact }) {
  const [ref, v] = RC_useInView(0.3);
  const n = 28,
    fN = 10;
  const hist = Array.from(
    {
      length: n,
    },
    (_, i) => 0.25 + i * 0.012 + Math.sin(i / 1.6) * 0.08 + (i === 17 ? 0.2 : 0),
  );
  const last = hist[n - 1];
  const fc = Array.from(
    {
      length: fN,
    },
    (_, i) => last + (i + 1) * 0.012 + Math.sin((n + i) / 1.6) * 0.08,
  );
  const W = compact ? 560 : 1e3,
    H = compact ? 200 : 280,
    X = (i) => 30 + (i * (W - 50)) / (n + fN - 1),
    Y = (val) => 20 + (1 - val) * (H - 40);
  const hp = hist.map((y, i) => `${i ? "L" : "M"}${X(i).toFixed(1)} ${Y(y).toFixed(1)}`).join(" ");
  const fp = [last, ...fc].map((y, i) => `${i ? "L" : "M"}${X(n - 1 + i).toFixed(1)} ${Y(y).toFixed(1)}`).join(" ");
  const band =
    [last, ...fc].map((y, i) => `${i ? "L" : "M"}${X(n - 1 + i).toFixed(1)} ${Y(y + i * 0.012).toFixed(1)}`).join(" ") +
    " " +
    [last, ...fc]
      .map((y, i) => [X(n - 1 + i), Y(y - i * 0.012)])
      .reverse()
      .map(([x, y]) => `L${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ") +
    "Z";
  const tr = `M${X(0)} ${Y(0.25)} L${X(n + fN - 1)} ${Y(0.25 + (n + fN) * 0.012)}`;
  return (
    <div ref={ref} className={"dpa-ts" + (v ? " is-in" : "") + (compact ? " dpa-ts--c" : "")}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Time series with historical values, trend line, seasonal pattern, a flagged anomaly and a dashed forecast with an uncertainty band"
      >
        {[60, 100, 140].map((y) => (
          <line key={y} x1="30" x2={W - 20} y1={y} y2={y} className="dpa-grid" />
        ))}
        <line x1={X(n - 1)} x2={X(n - 1)} y1="12" y2={H - 14} className="dpa-ts__now" />
        <text x={X(n - 1) + 6} y="22" className="dpa-ts__lab">
          Forecast →
        </text>
        <text x={X(n - 1) - 6} y="22" textAnchor="end" className="dpa-ts__lab">
          {compact ? "Actual" : "Historical"}
        </text>
        <path d={band} className="dpa-ts__band" />
        {!compact && <path d={tr} className="dpa-ts__trend" />}
        <path d={hp} className="dpa-ts__hist" pathLength="1" />
        <path d={fp} className="dpa-ts__fc" />
        {!compact && (
          <g className="dpa-ts__an">
            <circle cx={X(17)} cy={Y(hist[17])} r="7" />
            <text x={X(17)} y={Y(hist[17]) - 14} textAnchor="middle">
              Anomaly
            </text>
          </g>
        )}
        {!compact && (
          <text x={X(9)} y={Y(hist[9]) - 16} textAnchor="middle" className="dpa-ts__lab">
            Seasonal peak
          </text>
        )}
        <text x="30" y={H - 2} className="dpa-ts__ax">
          Time →
        </text>
      </svg>
      <div className="dpa-dash__lg">
        <span>
          <i className="cur" />
          {compact ? "Actual" : "Historical"}
        </span>
        <span>
          <i className="fc" />
          Forecast
        </span>
        <span>
          <i className="band" />
          Uncertainty range
        </span>
        {!compact && (
          <span>
            <i className="trd" />
            Trend
          </span>
        )}
        <DPA_Illus />
      </div>
    </div>
  );
}
function DPA_EDA() {
  const r = dpaRnd(77);
  const pts = Array.from(
    {
      length: 46,
    },
    () => {
      const x = r();
      return [x, Math.min(0.95, Math.max(0.05, 0.15 + x * 0.65 + (r() - 0.5) * 0.25))];
    },
  );
  const out = [
    [0.2, 0.88],
    [0.82, 0.12],
    [0.55, 0.95],
  ];
  const vars = ["V1", "V2", "V3", "V4", "V5"];
  const cor = [
    [1, 0.7, 0.2, -0.4, 0.5],
    [0.7, 1, 0.3, -0.2, 0.6],
    [0.2, 0.3, 1, 0.1, -0.3],
    [-0.4, -0.2, 0.1, 1, -0.5],
    [0.5, 0.6, -0.3, -0.5, 1],
  ];
  return (
    <div className="dpa-eda" role="group" aria-label="Exploratory data analysis workspace">
      <div className="dpa-eda__p dpa-eda__sc">
        <span className="dpa-dash__ct">Scatter · relationship & outliers</span>
        <svg viewBox="0 0 220 160" aria-hidden="true">
          <line x1="10" y1="150" x2="210" y2="150" className="dpa-axis" />
          <line x1="10" y1="10" x2="10" y2="150" className="dpa-axis" />
          <line x1="12" y1={150 - 0.15 * 140} x2="208" y2={150 - 0.8 * 140} className="dpa-fit" />
          {pts.map(([x, y], i) => (
            <circle key={i} cx={10 + x * 198} cy={150 - y * 140} r="3" className="dpa-pt" />
          ))}
          {out.map(([x, y], i) => (
            <g key={i} className="dpa-out">
              <circle cx={10 + x * 198} cy={150 - y * 140} r="3.4" />
              <circle cx={10 + x * 198} cy={150 - y * 140} r="9" className="ring" />
            </g>
          ))}
        </svg>
      </div>
      <div className="dpa-eda__p">
        <span className="dpa-dash__ct">Distribution</span>
        <svg viewBox="0 0 220 160" aria-hidden="true">
          <line x1="10" y1="150" x2="210" y2="150" className="dpa-axis" />
          {[0.08, 0.2, 0.42, 0.7, 0.92, 0.8, 0.55, 0.3, 0.14, 0.05, 0, 0.1].map((h, i) => (
            <rect
              key={i}
              x={12 + i * 16.4}
              y={150 - h * 130}
              width="14"
              height={h * 130}
              className={i === 11 ? "dpa-bin is-out" : "dpa-bin"}
            />
          ))}
          <path d="M12 145 C50 140 60 25 86 22 C112 25 130 120 176 146" className="dpa-fit" fill="none" />
          <text x="198" y="122" textAnchor="middle" className="dpa-out__t">
            outlier
          </text>
        </svg>
      </div>
      <div className="dpa-eda__p">
        <span className="dpa-dash__ct">Correlation matrix</span>
        <div className="dpa-cor" aria-hidden="true">
          <span />
          {vars.map((x) => (
            <b key={x}>{x}</b>
          ))}
          {cor.map((row, i) => [
            <b key={"r" + i}>{vars[i]}</b>,
            ...row.map((c, j) => (
              <i
                key={i + "-" + j}
                className={c < 0 ? "neg" : "pos"}
                style={{
                  "--v": Math.abs(c),
                }}
              />
            )),
          ])}
        </div>
        <div className="dpa-cor__lg">
          <span>
            <i className="neg" />
            Negative
          </span>
          <span>
            <i className="pos" />
            Positive
          </span>
        </div>
      </div>
    </div>
  );
}
function DPA_Explore() {
  const dims = ["Dimension X", "Dimension Y", "Segment", "Time", "Geography"];
  const [on, setOn] = ee.useState([0, 2]);
  const tog = (i) => setOn((s) => (s.includes(i) ? (s.length > 1 ? s.filter((x) => x !== i) : s) : [...s, i].sort()));
  const r = dpaRnd(on.reduce((a, b) => a * 7 + b + 3, 5));
  const rows = on.length > 1 ? 4 : 1,
    cols = 5;
  const lbl = {
    0: "X",
    1: "Y",
    2: "Seg",
    3: "T",
    4: "Geo",
  };
  return (
    <div className="dpa-exp">
      <div className="dpa-exp__dims">
        <span className="dpa-dash__ct">Choose dimensions</span>
        <div>
          {dims.map((d, i) => (
            <button
              key={d}
              aria-pressed={on.includes(i)}
              className={on.includes(i) ? "is-on" : ""}
              onClick={() => tog(i)}
            >
              {on.includes(i) ? <RC_I n="check" s={13} /> : <RC_I n="plus" s={13} />}
              {d}
            </button>
          ))}
        </div>
        <ul className="dpa-exp__ops">
          {["Slice & dice", "Filter variables", "Segment datasets", "Compare dimensions", "Generate hypotheses"].map(
            (t) => (
              <li key={t}>{t}</li>
            ),
          )}
        </ul>
      </div>
      <div className="dpa-exp__out" aria-live="polite">
        <span className="dpa-dash__ct">Dynamic insight</span>
        <p className="dpa-exp__q">
          {"Viewing "}
          <strong>{on.map((i) => dims[i]).join(" \xD7 ")}</strong>
        </p>
        <div
          className="dpa-exp__grid"
          style={{
            gridTemplateColumns: `56px repeat(${cols},1fr)`,
          }}
          key={on.join("")}
        >
          <span />
          {Array.from(
            {
              length: cols,
            },
            (_, c) => (
              <b key={c}>
                {lbl[on[0]]}
                {c + 1}
              </b>
            ),
          )}
          {Array.from(
            {
              length: rows,
            },
            (_, ri) => [
              <b key={"r" + ri}>{on.length > 1 ? lbl[on[1]] + (ri + 1) : "All"}</b>,
              ...Array.from(
                {
                  length: cols,
                },
                (_2, c) => (
                  <i
                    key={ri + "-" + c}
                    style={{
                      "--v": 0.12 + r() * 0.88,
                      "--d": (ri * cols + c) * 25 + "ms",
                    }}
                  />
                ),
              ),
            ],
          )}
        </div>
        {on.length > 2 && (
          <p className="dpa-exp__more">
            {"Further split by "}
            {on
              .slice(2)
              .map((i) => dims[i])
              .join(", ")}
          </p>
        )}
        <DPA_Illus />
      </div>
    </div>
  );
}
const DPA_MAT = [
  ["Descriptive", "What happened?", "Trends, distributions and KPIs", "#0B22A8", "bars"],
  ["Diagnostic", "Why did it happen?", "Drivers, correlations and root causes", "#5A3FE0", "search"],
  ["Predictive", "What could happen?", "Forecasts, probabilities and scenarios", "#0E8A8A", "trend"],
  ["Prescriptive", "What should we do?", "Optimization and recommendations", "#C99A2E", "flag"],
];
function DPA_Maturity() {
  const [a, setA] = ee.useState(0);
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"dpa-mat" + (v ? " is-in" : "")}>
      <div className="dpa-mat__stair">
        <span className="dpa-mat__y">Value to the decision ↑</span>
        {DPA_MAT.map(([t, q, , c, ic], i) => (
          <button
            key={t}
            className={"dpa-mat__step" + (a === i ? " is-on" : "")}
            style={{
              "--c": c,
              "--i": i,
              "--h": 40 + i * 20 + "%",
            }}
            onClick={() => setA(i)}
            aria-pressed={a === i}
          >
            <span className="dpa-mat__n">0{i + 1}</span>
            <RC_I n={ic} s={22} />
            <strong>
              {t}
              {" analytics"}
            </strong>
            <em>{q}</em>
          </button>
        ))}
        <span className="dpa-mat__x">Analytical complexity →</span>
      </div>
      <div
        className="dpa-mat__panel"
        key={a}
        style={{
          "--c": DPA_MAT[a][3],
        }}
        aria-live="polite"
      >
        <span>
          Level 0{a + 1}
          {" \xB7 "}
          {DPA_MAT[a][0]}
        </span>
        <strong>{DPA_MAT[a][1]}</strong>
        <p>
          {"Typical outputs: "}
          {DPA_MAT[a][2].toLowerCase()}.
        </p>
        <a className="rc-link" href={"#dpa-l" + (a + 1)} onClick={rcScrollTo("dpa-l" + (a + 1))}>
          {"Explore "}
          {DPA_MAT[a][0].toLowerCase()}
          {" analytics "}
          <RC_I n="arrow" s={14} />
        </a>
      </div>
    </div>
  );
}
const DPA_DESC = [
  [
    "Data Visualization",
    [
      "Bar and column charts",
      "Line and area charts",
      "Pie and donut charts",
      "Histograms",
      "Scatter plots",
      "Heatmaps",
    ],
  ],
  ["Data Profiling", ["Completeness", "Accuracy", "Consistency", "Integrity", "Structural alignment"]],
  ["Segmentation Analysis", ["Customer groups", "Behavioral segments", "Demographic segments", "Performance groups"]],
  ["Trend Analysis", ["Sales tracking", "Customer behavior", "Market evolution", "Performance trends"]],
  [
    "Comparative Analysis",
    ["Time periods", "Business units", "Customer segments", "Benchmarks", "Competitor landscapes"],
  ],
  ["Dashboards & Executive Reporting", ["KPI monitoring", "Drill-down", "Customized views", "Executive reporting"]],
];
function DPA_Desc() {
  const [a, setA] = ee.useState(0);
  const tiles = [
    [
      "Distribution",
      <svg viewBox="0 0 100 50" key="d">
        {[0.2, 0.45, 0.8, 1, 0.7, 0.4, 0.15].map((h, i) => (
          <rect key={i} x={6 + i * 13} y={48 - h * 42} width="11" height={h * 42} className="f2" />
        ))}
      </svg>,
    ],
    [
      "Data profile",
      <div className="dpa-desc__prof" key="p">
        {["Complete", "Accurate", "Consistent"].map((x) => (
          <span key={x}>
            <RC_I n="check" s={11} />
            {x}
          </span>
        ))}
      </div>,
    ],
    [
      "Segmentation",
      <svg viewBox="0 0 100 50" key="s">
        {[
          [25, 25, 16, "f1"],
          [55, 20, 12, "f2"],
          [78, 30, 10, "f3"],
        ].map(([x, y, rr, c]) => (
          <circle key={x} cx={x} cy={y} r={rr} className={c} />
        ))}
      </svg>,
    ],
    [
      "Trend",
      <svg viewBox="0 0 100 50" key="t">
        <path d={dpaPath(dpaSeries(9, 10, 0.3, 0.3, 0.45), 96, 42, 2, 4)} className="s1" />
      </svg>,
    ],
    [
      "Comparison",
      <svg viewBox="0 0 100 50" key="c">
        {[0.6, 0.8, 0.5, 0.7].map((h, i) => (
          <g key={i}>
            <rect x={8 + i * 23} y={48 - h * 42} width="8" height={h * 42} className="f1" />
            <rect x={17 + i * 23} y={48 - h * 0.8 * 42} width="8" height={h * 0.8 * 42} className="f3" />
          </g>
        ))}
      </svg>,
    ],
    [
      "Dashboard",
      <div className="dpa-desc__kpi" key="k">
        {["KPI", "KPI", "KPI"].map((x, i) => (
          <span key={i}>
            <b className={i === 1 ? "is-dn" : "is-up"}>{i === 1 ? "\u25BC" : "\u25B2"}</b>
            {x}
          </span>
        ))}
      </div>,
    ],
  ];
  return (
    <div className="dpa-desc">
      <div className="dpa-desc__tabs" role="tablist" aria-label="Descriptive analytics capabilities">
        {DPA_DESC.map(([t, xs], i) => (
          <div key={t} className={"dpa-desc__tab" + (a === i ? " is-on" : "")}>
            <button role="tab" aria-selected={a === i} onClick={() => setA(i)}>
              <span>0{i + 1}</span>
              {t}
            </button>
            {a === i && (
              <ul>
                {xs.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="dpa-desc__canvas" role="img" aria-label="'What happened?' analytical canvas">
        <div className="dpa-desc__head">
          <strong>What happened?</strong>
          <DPA_Illus />
        </div>
        <div className="dpa-desc__grid">
          {tiles.map(([t, el], i) => (
            <div key={t} className={"dpa-desc__tile" + (a === i ? " is-on" : "")}>
              <span>{t}</span>
              {el}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function DPA_Tree() {
  const [h, setH] = ee.useState(1);
  const drv = [
    ["Driver A", ["Sub-driver A1", "Sub-driver A2"]],
    ["Driver B", ["Sub-driver B1", "Sub-driver B2"]],
    ["Driver C", ["Sub-driver C1", "Sub-driver C2"]],
  ];
  const Y = [50, 150, 250];
  return (
    <div className="dpa-tree">
      <svg
        viewBox="0 0 640 300"
        role="img"
        aria-label="Driver tree linking an outcome to drivers, sub-drivers, a root cause and a corrective action"
      >
        <g className="dpa-tree__n is-out">
          <rect x="4" y="128" width="112" height="44" rx="10" />
          <text x="60" y="155" textAnchor="middle">
            Outcome
          </text>
        </g>
        {drv.map(([d, subs], i) => (
          <g
            key={d}
            onMouseEnter={() => setH(i)}
            onFocus={() => setH(i)}
            tabIndex="0"
            className={"dpa-tree__br" + (h === i ? " is-on" : "")}
          >
            <path d={`M116 150 C150 150 150 ${Y[i]} 180 ${Y[i]}`} className="dpa-tree__l" />
            <g className="dpa-tree__n">
              <rect x="180" y={Y[i] - 20} width="110" height="40" rx="10" />
              <text x="235" y={Y[i] + 5} textAnchor="middle">
                {d}
              </text>
            </g>
            {subs.map((s, j) => {
              const y = Y[i] - 22 + j * 44;
              return (
                <g key={s}>
                  <path d={`M290 ${Y[i]} C315 ${Y[i]} 315 ${y} 340 ${y}`} className="dpa-tree__l" />
                  <g className={"dpa-tree__n dpa-tree__n--s" + (j === 0 ? " is-root" : "")}>
                    <rect x="340" y={y - 15} width="122" height="30" rx="8" />
                    <text x="401" y={y + 5} textAnchor="middle">
                      {s}
                    </text>
                  </g>
                </g>
              );
            })}
            <path d={`M462 ${Y[i] - 22} C490 ${Y[i] - 22} 490 150 512 150`} className="dpa-tree__l dpa-tree__l--root" />
          </g>
        ))}
        <g className="dpa-tree__n is-act">
          <rect x="512" y="104" width="124" height="92" rx="12" />
          <text x="574" y="136" textAnchor="middle" className="k">
            ROOT CAUSE
          </text>
          <text x="574" y="156" textAnchor="middle">
            → Corrective
          </text>
          <text x="574" y="174" textAnchor="middle">
            action
          </text>
        </g>
      </svg>
      <DPA_Illus />
    </div>
  );
}
function DPA_Presc() {
  return (
    <div
      className="dpa-pre"
      role="img"
      aria-label="Multiple scenarios pass through constraints into an optimization model that produces a recommended action"
    >
      <div className="dpa-pre__col dpa-pre__sc">
        <span className="dpa-pre__k">Multiple scenarios</span>
        {["Scenario A", "Scenario B", "Scenario C", "Scenario D"].map((s, i) => (
          <div
            key={s}
            className={i === 2 ? "is-best" : ""}
            style={{
              "--i": i,
            }}
          >
            {s}
          </div>
        ))}
      </div>
      <div className="dpa-pre__arrow" aria-hidden="true" />
      <div className="dpa-pre__col dpa-pre__cn">
        <span className="dpa-pre__k">Constraints</span>
        {["Budget", "Capacity", "Timing", "Risk appetite"].map((s) => (
          <div key={s}>
            <RC_I n="lock" s={12} />
            {s}
          </div>
        ))}
      </div>
      <div className="dpa-pre__arrow" aria-hidden="true" />
      <div className="dpa-pre__col dpa-pre__op">
        <span className="dpa-pre__k">Optimization model</span>
        <span className="dpa-pre__gear">
          <RC_I n="cog" s={40} />
        </span>
      </div>
      <div className="dpa-pre__arrow" aria-hidden="true" />
      <div className="dpa-pre__col dpa-pre__rec">
        <span className="dpa-pre__k">Recommended action</span>
        <strong>Scenario C</strong>
        <span>Best fit within constraints</span>
      </div>
    </div>
  );
}
function DPA_Text() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"dpa-txt" + (v ? " is-in" : "")}>
      <div className="dpa-txt__src">
        <span className="dpa-pre__k">Raw text</span>
        {[
          ["star", "Customer review", "\u201CGreat product, but support took days to reply.\u201D"],
          ["clipboard", "Survey response", "\u201CCheckout was confusing on mobile.\u201D"],
          ["share", "Social media", "\u201CLove the new design!\u201D"],
          ["mail", "Email", "\u201CStill waiting for my refund.\u201D"],
          ["file", "Feedback log", "\u201CStaff were helpful and quick.\u201D"],
        ].map(([ic, t, q], i) => (
          <div
            key={t}
            className="dpa-txt__card"
            style={{
              "--i": i,
            }}
          >
            <span>
              <RC_I n={RC_P[ic] ? ic : "msg"} s={13} />
              {t}
            </span>
            <q>{q}</q>
          </div>
        ))}
      </div>
      <div className="dpa-txt__nlp" aria-hidden="true">
        <span>NLP</span>
        <i />
        <i />
        <i />
      </div>
      <div className="dpa-txt__res">
        <div className="dpa-txt__blk">
          <span className="dpa-pre__k">Themes & topics</span>
          <div className="dpa-txt__tags">
            {[
              ["Customer support", "neg", 3],
              ["Product design", "pos", 2],
              ["Mobile checkout", "neg", 2],
              ["Refunds", "neg", 1],
              ["Staff", "pos", 1],
              ["Pricing", "neu", 1],
            ].map(([t, s, w]) => (
              <span
                key={t}
                className={"t-" + s}
                style={{
                  "--w": w,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="dpa-txt__blk">
          <span className="dpa-pre__k">Sentiment</span>
          <div className="dpa-txt__sent">
            <span className="t-pos">Positive</span>
            <span className="t-neu">Neutral</span>
            <span className="t-neg">Negative</span>
          </div>
        </div>
        <div className="dpa-txt__blk dpa-txt__ins">
          <span className="dpa-pre__k">Insights</span>
          <ul>
            <li>
              <RC_I n="alert" s={13} />
              Risk signal: support response time
            </li>
            <li>
              <RC_I n="eye" s={13} />
              Brand perception: design valued
            </li>
          </ul>
        </div>
        <DPA_Illus />
      </div>
    </div>
  );
}
function DPA_Mining() {
  const r = dpaRnd(23);
  const glyph = {
    Clustering: (
      <svg viewBox="0 0 60 40">
        {[
          [16, 18, "f1"],
          [42, 14, "f2"],
          [36, 30, "f3"],
        ].map(([cx, cy, c]) =>
          Array.from(
            {
              length: 6,
            },
            (_, i) => (
              <circle key={cx + "-" + i} cx={cx + (r() - 0.5) * 14} cy={cy + (r() - 0.5) * 12} r="2.2" className={c} />
            ),
          ),
        )}
      </svg>
    ),
    Classification: (
      <svg viewBox="0 0 60 40">
        <path d="M30 4V14M30 14H14V24M30 14H46V24" className="s2" fill="none" />
        <rect x="24" y="2" width="12" height="7" rx="2" className="f1" />
        <rect x="6" y="24" width="16" height="9" rx="2" className="f2" />
        <rect x="38" y="24" width="16" height="9" rx="2" className="f3" />
      </svg>
    ),
    Association: (
      <svg viewBox="0 0 60 40">
        <path d="M14 20L30 10L46 20L30 30Z" className="s2" fill="none" />
        <circle cx="14" cy="20" r="4" className="f1" />
        <circle cx="30" cy="10" r="4" className="f2" />
        <circle cx="46" cy="20" r="4" className="f1" />
        <circle cx="30" cy="30" r="4" className="f3" />
      </svg>
    ),
    "Anomaly detection": (
      <svg viewBox="0 0 60 40">
        {Array.from(
          {
            length: 12,
          },
          (_, i) => (
            <circle
              key={i}
              cx={10 + (i % 4) * 7 + r() * 3}
              cy={14 + Math.floor(i / 4) * 7 + r() * 3}
              r="2"
              className="f2"
            />
          ),
        )}
        <circle cx="50" cy="10" r="3" className="fx" />
        <circle cx="50" cy="10" r="7" className="ring" />
      </svg>
    ),
  };
  return (
    <div className="dpa-mine">
      <div className="dpa-mine__ds" role="img" aria-label="Large dataset">
        <span className="dpa-pre__k">Large dataset</span>
        <svg viewBox="0 0 120 90">
          {Array.from(
            {
              length: 90,
            },
            (_, i) => (
              <circle key={i} cx={6 + r() * 108} cy={6 + r() * 78} r="1.8" className="dpa-pt" />
            ),
          )}
        </svg>
      </div>
      <div className="dpa-mine__ar" aria-hidden="true" />
      <div className="dpa-mine__tech">
        {Object.entries(glyph).map(([t, g]) => (
          <div key={t}>
            {g}
            <strong>{t}</strong>
          </div>
        ))}
      </div>
      <div className="dpa-mine__ar" aria-hidden="true" />
      <ol className="dpa-mine__out">
        <li>
          <RC_I n="eye" s={16} />
          Hidden patterns
        </li>
        <li>
          <RC_I n="bulb" s={16} />
          Business insight
        </li>
      </ol>
    </div>
  );
}
function DPA_Spatial() {
  const [lay, setLay] = ee.useState(0);
  const r = dpaRnd(41);
  const hexes = [];
  for (let row = 0; row < 8; row++)
    for (let c = 0; c < 12; c++) {
      const x = 30 + c * 34 + (row % 2) * 17,
        y = 26 + row * 29;
      const d = Math.hypot(x - 160, y - 110),
        d2 = Math.hypot(x - 330, y - 160);
      hexes.push([
        x,
        y,
        Math.max(0.06, Math.min(1, 1.15 - Math.min(d, d2 * 1.2) / 150 + (r() - 0.5) * 0.2)),
        x < 245 ? 0 : 1,
      ]);
    }
  const hex = (x, y, s = 16) =>
    Array.from(
      {
        length: 6,
      },
      (_, i) => {
        const a = (Math.PI / 3) * i + Math.PI / 6;
        return `${(x + s * Math.cos(a)).toFixed(1)},${(y + s * Math.sin(a)).toFixed(1)}`;
      },
    ).join(" ");
  const layers = ["Location intensity", "Spatial clusters", "Territories", "Logistics route"];
  return (
    <div className="dpa-sp">
      <div className="dpa-sp__map">
        <svg viewBox="0 0 450 260" role="img" aria-label={`Spatial analytics map showing ${layers[lay].toLowerCase()}`}>
          {hexes.map(([x, y, v, t], i) => (
            <polygon
              key={i}
              points={hex(x, y)}
              className={"dpa-sp__hex" + (lay === 2 ? " t" + t : "")}
              style={{
                "--v": lay === 0 || lay === 3 ? v : 0.18,
              }}
            />
          ))}
          {lay === 1 &&
            [
              [160, 110, 58],
              [330, 160, 46],
            ].map(([x, y, rr], i) => (
              <g
                key={i}
                className="dpa-sp__cl"
                style={{
                  "--i": i,
                }}
              >
                <circle cx={x} cy={y} r={rr} />
                <text x={x} y={y - rr - 6} textAnchor="middle">
                  {"Cluster "}
                  {i + 1}
                </text>
              </g>
            ))}
          {lay === 2 && <path d="M245 6 L245 254" className="dpa-sp__bd" />}
          {lay === 3 && (
            <g className="dpa-sp__rt">
              <path d="M60 220 L160 110 L250 140 L330 160 L410 60" />
              <rect x="52" y="212" width="16" height="16" rx="3" />
              {[
                [160, 110],
                [250, 140],
                [330, 160],
                [410, 60],
              ].map(([x, y]) => (
                <circle key={x} cx={x} cy={y} r="6" />
              ))}
            </g>
          )}
        </svg>
        <DPA_Illus />
      </div>
      <div className="dpa-sp__side">
        <div className="dpa-sp__tabs" role="tablist" aria-label="Map layer">
          {layers.map((t, i) => (
            <button
              key={t}
              role="tab"
              aria-selected={lay === i}
              className={lay === i ? "is-on" : ""}
              onClick={() => setLay(i)}
            >
              {t}
            </button>
          ))}
        </div>
        <ul className="dpa-ticks">
          {[
            "Geospatial mapping",
            "Location intelligence",
            "Spatial clustering",
            "Territory optimization",
            "Logistics optimization",
          ].map((t) => (
            <li key={t}>
              <RC_I n="check" s={13} />
              {t}
            </li>
          ))}
        </ul>
        <div className="dpa-chips">
          <span className="dpa-chips__k">Applications</span>
          {["Retail expansion", "Transportation", "Logistics", "Urban planning", "Environmental monitoring"].map(
            (t) => (
              <span key={t}>{t}</span>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
function DPA_Venn() {
  return (
    <div
      className="dpa-venn"
      role="img"
      aria-label="Venn diagram: quantitative data and qualitative data overlap to create integrated intelligence"
    >
      <svg viewBox="20 0 480 300" aria-hidden="true">
        <circle cx="190" cy="150" r="130" className="dpa-venn__a" />
        <circle cx="330" cy="150" r="130" className="dpa-venn__b" />
        <text x="130" y="72" textAnchor="middle" className="dpa-venn__h">
          Quantitative
        </text>
        {["Numbers", "Measurements", "KPIs", "Structured responses"].map((t, i) => (
          <text key={t} x="138" y={110 + i * 26} textAnchor="middle" className="dpa-venn__t">
            {t}
          </text>
        ))}
        <text x="390" y="72" textAnchor="middle" className="dpa-venn__h">
          Qualitative
        </text>
        {["Text", "Open-ended responses", "Interviews", "Feedback", "Themes"].map((t, i) => (
          <text key={t} x="384" y={104 + i * 24} textAnchor="middle" className="dpa-venn__t">
            {t}
          </text>
        ))}
        <text x="260" y="146" textAnchor="middle" className="dpa-venn__c">
          Integrated
        </text>
        <text x="260" y="166" textAnchor="middle" className="dpa-venn__c">
          intelligence
        </text>
      </svg>
    </div>
  );
}
function DPA_Score() {
  const [ref, v] = RC_useInView(0.3);
  const checks = [
    ["Completeness", "No missing required fields"],
    ["Consistency", "Answers agree across questions"],
    ["Duplicate detection", "One person, one response"],
    ["Outlier identification", "Extreme values reviewed"],
    ["Logical validation", "Routing and logic respected"],
    ["Coding accuracy", "Codes checked against verbatims"],
    ["Weighting validation", "Weights reviewed against targets"],
    ["Statistical quality checks", "Bases and tests checked"],
  ];
  return (
    <div ref={ref} className={"dpa-score" + (v ? " is-in" : "")}>
      <div className="dpa-score__ring" aria-hidden="true">
        <svg viewBox="0 0 120 120">
          {checks.map((_, i) => (
            <circle
              key={i}
              cx="60"
              cy="60"
              r="50"
              pathLength="80"
              strokeDasharray="9 71"
              strokeDashoffset={-i * 10}
              className="dpa-score__seg"
              style={{
                "--i": i,
              }}
            />
          ))}
        </svg>
        <span>
          <RC_I n="shield" s={28} />
          <strong>Quality gate</strong>
          <em>Data moves to analysis only after these checks</em>
        </span>
      </div>
      <ol className="dpa-score__list">
        {checks.map(([t, d], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="dpa-score__tick">
              <RC_I n="check" s={14} />
            </span>
            <div>
              <strong>{t}</strong>
              <span>{d}</span>
            </div>
            <em>Checked</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
function DPA_Case() {
  return (
    <div
      className="dpa-case__dash"
      role="img"
      aria-label="Project dashboard showing sample status by country, response distribution, data quality checks and country-level tables"
    >
      <div className="dpa-mini__head">
        <span>
          <i />
          <i />
          <i />
        </span>
        <DPA_Illus t="Illustrative project view" />
      </div>
      <div className="dpa-case__g">
        <div className="dpa-case__t">
          <span>Sample status</span>
          {["Country A", "Country B", "Country C", "Country D"].map((c, i) => (
            <div
              key={c}
              className="dpa-case__bar"
              style={{
                "--i": i,
              }}
            >
              <em>{c}</em>
              <i />
            </div>
          ))}
        </div>
        <div className="dpa-case__t">
          <span>Response distribution</span>
          <svg viewBox="0 0 120 60">
            {[0.3, 0.55, 0.9, 0.7, 0.4].map((h, i) => (
              <rect key={i} x={8 + i * 22} y={56 - h * 50} width="16" height={h * 50} rx="2" className="f2" />
            ))}
          </svg>
        </div>
        <div className="dpa-case__t">
          <span>Data quality</span>
          <ul>
            {["Duplicates removed", "Logic checked", "Open-ends coded"].map((x) => (
              <li key={x}>
                <RC_I n="check" s={11} />
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className="dpa-case__t">
          <span>Analytical output</span>
          <div className="dpa-case__tbl">
            {Array.from(
              {
                length: 15,
              },
              (_, i) => (
                <i key={i} className={i < 5 ? "h" : ""} />
              ),
            )}
          </div>
          <em className="dpa-case__cap">Country-level tables</em>
        </div>
      </div>
    </div>
  );
}
function DPA_Flow({ steps, cls = "" }) {
  const [ref, v] = RC_useInView(0.3);
  return (
    <ol ref={ref} className={"dpa-flow " + cls + (v ? " is-in" : "")}>
      {steps.map((t, i) => (
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
  );
}
function DPA_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("dpa-overview");
  const [moreInd, setMoreInd] = ee.useState(false);
  const [gal, setGal] = ee.useState(null);
  const nav = [
    ["dpa-overview", "Overview"],
    ["dpa-included", "What's included"],
    ["dpa-pipeline", "Pipeline"],
    ["dpa-viz", "Visualization"],
    ["dpa-maturity", "Analytics"],
    ["dpa-quality", "Quality"],
    ["dpa-process", "How we work"],
    ["dpa-why", "Why us"],
    ["dpa-faq", "FAQ"],
    ["dpa-enquire", "Contact"],
  ];
  const faqs = serviceFaqs(a, n).map((f) => ({
    ...f,
    q: f.q.replace("data Processing & Analytics", "Data Processing & Analytics"),
  }));
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/data-processing-and-analytics";
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
    const title = "Data Processing & Analytics | Frequent Research";
    const desc =
      "Survey data processing and analytics: cleaning, coding, weighting, tabulation, statistical analysis and dashboards that turn research data into decisions.";
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
          ["Data Processing & Analytics", "/services/market-research/data-processing-and-analytics"],
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
        name: "Data Processing & Analytics",
        serviceType: "Survey data processing, statistical analysis and data visualization",
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
  return (
    <div className="dpa rc">
      <section className="dpa-hero">
        <div className="container dpa-hero__in">
          <div className="dpa-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="dpa-eyebrow">
              <RC_I n="bars" s={15} />
              Data processing · analytics · visualization
            </span>
            <HeroH1>Data Processing & Analytics</HeroH1>
            <p className="dpa-hero__sub">Clean, coded and analysed data, ready for decisions.</p>
            <p className="dpa-hero__body">
              Frequent Research transforms complex research and business datasets into structured, validated and
              decision-ready intelligence through rigorous data processing, statistical analysis, visualization and
              advanced analytics.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg dpa-btn" href="#dpa-enquire" onClick={rcScrollTo("dpa-enquire")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="dpa-hero__viz">
            <DPA_HeroViz />
            <DPA_Mini />
          </div>
        </div>
        <div className="container">
          <ul className="dpa-strip">
            {[
              ["shield", "Data Cleaning & Validation"],
              ["tag", "Open-End Coding"],
              ["sliders", "Weighting & Tabulation"],
              ["trend", "Statistical & Driver Analysis"],
            ].map(([ic, t]) => (
              <li key={t}>
                <span>
                  <RC_I n={ic} s={18} />
                </span>
                <RC_I n="check" s={13} className="dpa-strip__ok" />
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
      <section className="rc-sec" id="dpa-overview">
        <div className="container dpa-probwrap">
          <div>
            <RC_Head kicker="The problem" title="The problem" />
            <p className="dpa-quote">{a.problem}</p>
            <p className="od-muted">
              In analytics the same risk shows up as data that is incomplete, inconsistent or uncoded. Analysis built on
              it looks precise, but it cannot be defended.
            </p>
          </div>
          <DPA_Problem />
        </div>
      </section>
      <section className="rc-sec dpa-sec--ink">
        <div className="container">
          <RC_Head
            light
            kicker="Our solution"
            title="Our solution"
            intro="We turn raw research and business data into clean, structured, analysed and decision-ready intelligence."
          />
          <DPA_Solution />
        </div>
      </section>
      <section className="rc-sec" id="dpa-included">
        <div className="container">
          <RC_Head
            kicker="Core capabilities"
            title="What's included"
            intro="Four capabilities sit at the heart of every engagement."
          />
          <DPA_Included />
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft" id="dpa-pipeline">
        <div className="container">
          <RC_Head
            center
            kicker="Data processing pipeline"
            title="From Raw Data to Reliable Intelligence"
            intro="Nine stages take a dataset from intake to decision. Select a stage to see what happens there."
          />
          <DPA_Pipeline />
        </div>
      </section>
      <section className="rc-sec" id="dpa-viz">
        <div className="container">
          <RC_Head
            kicker="Exploration & visualization"
            title="Data Exploration & Visualization"
            intro="Frequent Research delivers advanced data exploration and visualization solutions that transform complex datasets into clear, decision-ready intelligence."
          />
          <ul className="dpa-obj">
            {[
              ["Patterns", "M2 16 L8 10 L14 14 L22 6"],
              ["Trends", "M2 18 L22 6"],
              ["Correlations", "M4 18 L20 6 M6 14 h.01 M10 12 h.01 M14 10 h.01 M18 8 h.01"],
              ["Relationships", "M6 6 L18 18 M6 18 L18 6"],
              ["Anomalies", "M2 14 H9 L12 4 L15 14 H22"],
              ["Opportunities", "M12 3 L12 21 M3 12 L21 12"],
            ].map(([t, d], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d={d} />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Interactive Dashboards</h3>
              <p>
                Dynamic dashboards provide a consolidated view of key metrics, KPIs and performance indicators. Filter,
                drill down, compare segments and periods, and spot anomalies as they appear.
              </p>
            </div>
            <DPA_Dash />
          </div>
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Charts & Graphical Reporting</h3>
              <p className="dpa-princ">
                <RC_I n="bulb" s={16} />
                The visualization should match the analytical question.
              </p>
            </div>
            <ul className="dpa-gal">
              {DPA_GAL.map(([k, t, q], i) => (
                <li
                  key={k}
                  className={gal === i ? "is-on" : ""}
                  onMouseEnter={() => setGal(i)}
                  onMouseLeave={() => setGal(null)}
                  tabIndex="0"
                  onFocus={() => setGal(i)}
                  onBlur={() => setGal(null)}
                  style={{
                    "--i": i,
                  }}
                >
                  <DPA_MiniChart k={k} />
                  <strong>{t}</strong>
                  <span>
                    {"Best for: "}
                    {q}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft">
        <div className="container">
          <div className="dpa-two">
            <div>
              <RC_Head
                kicker="Where"
                title="Geographic Visualization"
                intro="Heat maps, choropleth-style overlays and bubble maps reveal how results differ by place."
              />
              <div className="dpa-chips">
                <span className="dpa-chips__k">Applications</span>
                {["Territory analysis", "Multi-location research", "Market expansion", "Regional performance"].map(
                  (t) => (
                    <span key={t}>{t}</span>
                  ),
                )}
              </div>
            </div>
            <DPA_Geo />
          </div>
          <div className="dpa-two dpa-two--flip">
            <DPA_Network />
            <div>
              <RC_Head
                kicker="Connections"
                title="Network Analysis"
                intro="Node-link diagrams show how people, brands or topics connect: which clusters form, which nodes are central and where influence flows."
              />
              <ul className="dpa-ticks">
                {["Social network analysis", "Node-link diagrams", "Cluster mapping", "Influence mapping"].map((t) => (
                  <li key={t}>
                    <RC_I n="check" s={13} />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="rdc-note">Hover or focus a central node to highlight its relationships.</p>
            </div>
          </div>
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Time Series Analysis</h3>
              <p>
                Trend, seasonality, fluctuation and anomalies are separated, so a forecast rests on the right pattern.
              </p>
            </div>
            <DPA_Flow steps={["Historical data", "Trend", "Pattern", "Forecast"]} />
            <DPA_Time />
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-story">
        <div className="container dpa-story__in">
          <div>
            <RC_Head
              kicker="Data storytelling"
              title="From Data to Story"
              intro="We combine visualization with narrative frameworks to turn complex findings into clear, executive-ready stories."
            />
            <p className="rdc-note">
              {"Final reports are shaped with our "}
              {svc("reporting-and-insights", "reporting & insights")}
              {" team."}
            </p>
          </div>
          <ol className="dpa-story__list">
            {[
              ["Dataset", "Tables, responses and trackers"],
              ["Pattern", "What stands out in the data"],
              ["Insight", "Why the pattern matters"],
              ["Context", "Market, audience and history"],
              ["Business meaning", "What it changes for the business"],
              ["Recommendation", "What to do next"],
            ].map(([t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <strong>{t}</strong>
                  <em>{d}</em>
                </div>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Analyst workspace"
            title="Exploratory Data Analysis"
            intro="Before modelling, we look at distributions, outliers, correlations, dependencies and segment differences."
          />
          <DPA_EDA />
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Interactive Data Exploration</h3>
              <p>
                Slice and dice, filter variables, segment datasets and compare dimensions to explore multi-dimensional
                data and generate hypotheses. Try combining dimensions below.
              </p>
            </div>
            <DPA_Explore />
          </div>
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Customized Visualization Solutions</h3>
              <p>When standard charts are not enough, we build visual tools around your data and decisions.</p>
            </div>
            <div className="dpa-cust">
              <div className="dpa-cust__hub">
                <RC_I n="database" s={26} />
                <strong>Your data & decisions</strong>
              </div>
              {[
                ["monitor", "Custom dashboards", "Built around your KPIs and audiences."],
                ["sliders", "Specialized analytical interfaces", "Tools for a specific analysis or workflow."],
                ["factory", "Industry-specific visualization models", "Views that reflect how your sector works."],
                ["grid", "Embedded BI tools", "Analytics inside portals your team already uses."],
              ].map(([ic, t, d], i) => (
                <RC_Reveal
                  key={t}
                  className={"dpa-cust__m dpa-cust__m" + i}
                  style={{
                    "--i": i,
                  }}
                >
                  <RC_I n={ic} s={20} />
                  <strong>{t}</strong>
                  <span>{d}</span>
                </RC_Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-sec--ink" id="dpa-maturity">
        <div className="container">
          <RC_Head
            light
            center
            kicker="Analytics maturity"
            title="From Description to Prediction"
            intro="Four levels of analytics, each answering a harder question. Select a level."
          />
          <DPA_Maturity />
        </div>
      </section>
      <section className="rc-sec" id="dpa-l1">
        <div className="container">
          <RC_Head
            kicker="Level 01"
            title="Descriptive Analytics"
            intro="Descriptive Analytics forms the foundation of data-driven decision-making by transforming historical and current data into structured insights that reveal patterns, trends and relationships."
          />
          <DPA_Desc />
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft" id="dpa-l2">
        <div className="container">
          <RC_Head
            kicker="Level 02"
            title="Diagnostic Analytics"
            intro="Diagnostic Analytics goes beyond describing what happened — it focuses on understanding why it happened."
          />
          <DPA_Flow
            steps={["Outcome", "Drivers", "Relationships", "Root cause", "Corrective action"]}
            cls="dpa-flow--v"
          />
          <div className="dpa-diag">
            <div className="dpa-diag__dash">
              <div className="dpa-desc__head">
                <strong>Why did it happen?</strong>
              </div>
              <DPA_Tree />
            </div>
            <ul className="dpa-diag__svc">
              {[
                ["search", "Root Cause Analysis", "Trace an outcome back to its source."],
                ["alert", "Anomaly Detection", "Flag values that break the pattern."],
                ["scale", "Hypothesis Testing", "Check whether a difference is real."],
                ["scatter", "Regression Analysis", "Measure how variables move together."],
                ["sliders", "Sensitivity Analysis", "See which inputs change the result."],
                ["users", "Cohort Analysis", "Compare groups that started together."],
                ["share", "Causal Analysis", "Separate cause from correlation."],
                ["bars", "Comparative Analysis", "Contrast periods, groups and markets."],
              ].map(([ic, t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i % 4,
                  }}
                >
                  <RC_I n={ic} s={18} />
                  <div>
                    <strong>{t}</strong>
                    <span>{d}</span>
                  </div>
                </RC_Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-adv" id="dpa-l3">
        <div className="container">
          <RC_Head
            kicker="Levels 03 & 04"
            title="Advanced Analytics"
            intro="Advanced Analytics enables organizations to move beyond understanding the past and present — enabling them to predict future outcomes, optimize decisions and drive strategic advantage."
          />
          <DPA_Flow steps={["Historical data", "Models", "Predictions", "Scenarios", "Optimization", "Action"]} />
          <div className="dpa-two">
            <div>
              <h3 className="dpa-h3">Predictive Analytics</h3>
              <p className="od-muted">
                Statistical models estimate what could happen next, with a range rather than a single promise.
              </p>
              <div className="dpa-chips">
                <span className="dpa-chips__k">Use cases</span>
                {[
                  "Customer behavior",
                  "Churn",
                  "Sales and revenue trends",
                  "Demand fluctuations",
                  "Risk exposure",
                  "Fraud detection",
                  "Equipment and system failures",
                ].map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
            <DPA_Time compact />
          </div>
          <div className="dpa-blk" id="dpa-l4">
            <div className="dpa-blk__h">
              <h3>Prescriptive Analytics</h3>
              <p>Scenarios are tested against real constraints to recommend the action that fits best.</p>
            </div>
            <DPA_Presc />
            <div className="dpa-chips">
              <span className="dpa-chips__k">Applications</span>
              {["Pricing", "Resource allocation", "Supply chain", "Profitability", "Operational risk"].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Unstructured data"
            title="Text Analytics"
            intro="Natural language processing turns reviews, survey responses, social posts, emails and feedback logs into themes, sentiment and signals."
          />
          <DPA_Text />
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Data Mining</h3>
              <p>
                Clustering, classification, association and anomaly detection uncover patterns that are hard to see in
                large datasets.
              </p>
            </div>
            <DPA_Mining />
            <div className="dpa-chips">
              <span className="dpa-chips__k">Applications</span>
              {[
                "Customer segmentation",
                "Market basket analysis",
                "Fraud detection",
                "Churn prediction",
                "Behavioral modelling",
              ].map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
          </div>
          <div className="dpa-blk">
            <div className="dpa-blk__h">
              <h3>Spatial Analytics</h3>
              <p>
                Location-based analysis shows where demand, risk or opportunity concentrates. Switch layers to explore.
              </p>
            </div>
            <DPA_Spatial />
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <div className="dpa-two">
            <div>
              <RC_Head
                kicker="Qual + quant"
                title="Bringing Numbers and Words Together"
                intro="As a market research company, we regularly combine survey data with interviews, open-ended responses and feedback, so the numbers come with their reasons."
              />
              <p className="rdc-note">
                {"See "}
                {svc("qualitative-research", "qualitative research")}
                {" and "}
                {svc("quantitative-research", "quantitative research")}.
              </p>
            </div>
            <DPA_Venn />
          </div>
          <div className="dpa-bi">
            <RC_Head center kicker="Research to BI" title="Turning Research Data into Business Intelligence" />
            <ol>
              {[
                ["users", "Respondent data", "consumer-panel", "Our panels"],
                ["filter", "Processing", null, "This service"],
                ["calc", "Statistical analysis", null, "This service"],
                ["pie", "Visualization", null, "This service"],
                ["bulb", "Interpretation", "reporting-and-insights", "Reporting & insights"],
                ["flag", "Strategic insight", "research-consultancy", "Research consultancy"],
              ].map(([ic, t, s, l], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                  className={s ? "" : "is-core"}
                >
                  <span className="dpa-bi__ic">
                    <RC_I n={ic} s={20} />
                  </span>
                  <strong>{t}</strong>
                  {s ? <Link to={`/services/market-research/${s}`}>{l}</Link> : <em>{l}</em>}
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-sec--ink" id="dpa-quality">
        <div className="container">
          <RC_Head
            light
            kicker="Data quality scorecard"
            title="Quality Before Analysis"
            intro="Analysis is only as reliable as the data underneath it, so every dataset passes a quality gate first."
          />
          <DPA_Score />
        </div>
      </section>
      <section className="rc-sec" id="dpa-process">
        <div className="container">
          <RC_Head
            kicker="Process"
            title="How We Work"
            intro="Our seven-stage research process. Data processing and analysis sit at stages five and six."
          />
          <ol className="dpa-how">
            {[
              ["Understand", "Clarify the business decision, audience and constraints."],
              ["Design", "Define methodology, questionnaire/discussion guide and quotas."],
              ["Sample", "Confirm feasibility and recruitment."],
              ["Collect", "Online, CATI, face-to-face or qualitative fieldwork."],
              ["Process", "Cleaning, coding, weighting and quality checks."],
              ["Analyze", "Tables, statistics and analytical interpretation."],
              ["Deliver insights", "Clear reports and decision-focused recommendations."],
            ].map(([t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
                className={i === 4 || i === 5 ? "is-core" : ""}
              >
                <span className="dpa-how__n">0{i + 1}</span>
                <strong>{t}</strong>
                <span>{d}</span>
                {(i === 4 || i === 5) && <em>Core of this service</em>}
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Analytical methods"
            title="Analytical Methods Matrix"
            intro="Each level of analysis answers a different question and produces different outputs."
          />
          <div className="dpa-mx" role="table" aria-label="Analytical methods matrix">
            <div className="dpa-mx__r dpa-mx__r--h" role="row">
              <span role="columnheader">Analytical level</span>
              <span role="columnheader">Core question</span>
              <span role="columnheader">Typical outputs</span>
            </div>
            {DPA_MAT.map(([t, q, o, c, ic]) => (
              <div
                key={t}
                className="dpa-mx__r"
                role="row"
                style={{
                  "--c": c,
                }}
              >
                <span role="cell" className="dpa-mx__l">
                  <RC_I n={ic} s={18} />
                  {t}
                </span>
                <span role="cell" data-l="Core question">
                  {q}
                </span>
                <span role="cell" data-l="Typical outputs">
                  {o}
                </span>
              </div>
            ))}
          </div>
          <div className="rdc-tech dpa-tools">
            <span className="rc-kicker">Analytics toolkit</span>
            <div className="rc-tech__tiles">
              <Link to="/products" className="rc-tech__tile rc-tech__tile--own">
                <strong>Sampledge</strong>
                <span>Project & sample management</span>
              </Link>
              {[
                ["SPSS", "Statistical analysis"],
                ["Python", "Data processing & modelling"],
                ["R", "Statistical computing"],
                ["Power BI", "Dashboards"],
                ["Dashboards & portals", "Interactive delivery"],
                ["Survey platforms", "Data capture"],
                ["Statistical & visualization tools", "Charts and analysis"],
              ].map(([t, d]) => (
                <span key={t} className="rc-tech__tile">
                  <strong>{t}</strong>
                  <span>{d}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <WU_Section slug="data-processing-and-analytics" id="dpa-why" />
      <section className="rc-sec">
        <div className="container dpa-team">
          <div>
            <RC_Head
              kicker="People"
              title="The team behind your project"
              intro="Researchers, panel managers, programmers, field supervisors and analysts who have run studies across consumer, B2B and healthcare audiences."
            />
          </div>
          <div className="dpa-eco" role="img" aria-label="Team ecosystem: six roles connected around your project">
            <svg viewBox="0 0 400 400" aria-hidden="true" className="dpa-eco__lines">
              {DPA_CONFIG.team.map((_, i) => {
                const ang = ((-90 + i * 60) * Math.PI) / 180;
                return <line key={i} x1="200" y1="200" x2={200 + Math.cos(ang) * 150} y2={200 + Math.sin(ang) * 150} />;
              })}
              <circle cx="200" cy="200" r="150" />
            </svg>
            <div className="dpa-eco__core">
              <RC_I n="target" s={22} />
              <strong>Your project</strong>
            </div>
            {DPA_CONFIG.team.map(([ic, t], i) => (
              <div
                key={t}
                className={"dpa-eco__r" + (i === 5 ? " is-core" : "")}
                style={{
                  "--a": -90 + i * 60 + "deg",
                }}
              >
                <span>
                  <RC_I n={ic} s={18} />
                </span>
                <em>{t}</em>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec dpa-sec--soft">
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
        </div>
      </section>
      <section className="rc-sec">
        <div className="container dpa-case">
          <div>
            <RC_Head kicker="Example engagement" title="How a typical project looks" />
            <p className="dpa-quote dpa-quote--sm">{a.scenario}</p>
            <ol className="dpa-case__tl">
              {[
                "Brief",
                "Feasibility",
                "Recruitment",
                "Collection",
                "Processing",
                "Analysis",
                "Country-level tables",
              ].map((t, i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                  className={i === 4 || i === 5 ? "is-core" : ""}
                >
                  {t}
                </RC_Reveal>
              ))}
            </ol>
            <Link to="/industries-case-studies" className="btn btn--ghost">
              See Case Studies
            </Link>
          </div>
          <DPA_Case />
        </div>
      </section>
      <section className="section section--tint" id="dpa-faq">
        <div className="container split">
          <h2 className="split__title">Data Processing & Analytics: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <Link to="/blog/survey-data-processing-analytics-guide" className="dpa-guide">
            <span className="dpa-guide__viz" aria-hidden="true">
              <svg viewBox="0 0 120 80">
                <path d={dpaPath(dpaSeries(14, 10, 0.3, 0.3, 0.45), 110, 60, 5, 10)} className="s1" />
                {[0.4, 0.6, 0.5, 0.8].map((h, i) => (
                  <rect key={i} x={10 + i * 14} y={76 - h * 30} width="9" height={h * 30} className="f2" />
                ))}
              </svg>
            </span>
            <span className="dpa-guide__c">
              <span className="rc-kicker">In-depth guide</span>
              <strong>Survey Data Processing and Analytics: From Raw Responses to Reliable Answers</strong>
              <span className="rc-link">
                {"Read the Guide "}
                <RC_I n="arrow" s={14} />
              </span>
            </span>
          </Link>
          <RC_Head kicker="Related" title="Related research services" />
          <div className="cp-rel__grid">
            {[
              ["reporting-and-insights", "Reporting & insights"],
              ["research-consultancy", "Research consultancy"],
              ["research-design-cycle", "Research design cycle"],
              ["online-data-collection", "Online data collection"],
              ["offline-data-collection", "Offline data collection"],
              ["cati", "CATI telephone interviewing"],
              ["consumer-panel", "Consumer panel"],
              ["business-panel", "Business panel"],
              ["healthcare-panel", "Healthcare panel"],
            ].map(([s, t]) => (
              <Link key={s} to={`/services/market-research/${s}`} className="cp-rel__card hcard">
                <strong>{t}</strong>
                <RC_I n="arrow" s={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="dpa-cta">
        <svg className="dpa-cta__bg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {(() => {
            const r = dpaRnd(3);
            const p = Array.from(
              {
                length: 34,
              },
              (_, i) => [i * 24 + r() * 12, 170 + Math.sin(i / 2.2) * 70 + (r() - 0.5) * 50],
            );
            return (
              <>
                {p.slice(1).map(([x, y], i) => (
                  <line key={i} x1={p[i][0]} y1={p[i][1]} x2={x} y2={y} />
                ))}
                {p.map(([x, y], i) => (
                  <circle key={"c" + i} cx={x} cy={y} r="2.5" />
                ))}
                {Array.from(
                  {
                    length: 5,
                  },
                  (_, i) => (
                    <rect
                      key={"b" + i}
                      x={880 + i * 56}
                      y={300 - (60 + i * 34)}
                      width="36"
                      height={60 + i * 34}
                      rx="4"
                    />
                  ),
                )}
              </>
            );
          })()}
        </svg>
        <div className="container dpa-cta__in">
          <h2>Let's turn your data into insight</h2>
          <p>
            Tell us what you're trying to understand. Our analytics team will help you identify the right processing,
            analytical and visualization approach.
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
      <section className="section section--tint" id="dpa-enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>Talk to our research team about Data Processing & Analytics</h2>
            <p>Share a few details and a specialist will reply within one working day.</p>
          </div>
          <div className="card-form">
            <Form type={SERVICE_FORM_KEY[a.slug]} service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { DPA_Page };
