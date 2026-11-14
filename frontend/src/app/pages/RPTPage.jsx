import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY, SERVICE_INDUSTRIES } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';

function RC_Head({ kicker, title, intro, light, center }) {
  return (
    <div className={"rc-head" + (light ? " rc-head--light" : "") + (center ? " rc-head--center" : "")}>
      {kicker && <span className="rc-kicker">{kicker}</span>}
      <h2>{title}</h2>
      {intro && <p className="rc-head__intro">{intro}</p>}
    </div>
  );
}
const RPT_ROUTE = "/services/market-research/reporting-and-insights";
const RPT_L = (p) => <Link {...p} />;
function RPT_Hero() {
  const [k, setK] = ee.useState(3);
  const [ref, inView] = RC_useInView(0.2);
  ee.useEffect(() => {
    if (!inView) return;
    if (
      window.__frLite === true ||
      (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    ) {
      setK(3);
      return;
    }
    setK(0);
    const t = setInterval(() => setK((x) => (x + 1) % 5), 1700);
    return () => clearInterval(t);
  }, [inView]);
  const cells = [];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 9; c++) {
      const v = ((r * 37 + c * 53) % 11) / 11;
      cells.push(
        <rect
          key={r + "-" + c}
          x={28 + c * 17}
          y={64 + r * 17}
          width="12"
          height="12"
          rx="2.5"
          style={{
            opacity: 0.18 + v * 0.6,
          }}
        />,
      );
    }
  const st = (i) => (k >= i ? " is-on" : "");
  return (
    <div className="ri-hv" ref={ref}>
      {null}
      <svg
        viewBox="0 0 560 420"
        className="ri-hv__svg"
        role="img"
        aria-label="Illustration: raw research data is structured into tables, turned into a visual story and condensed into a business insight"
      >
        <defs>
          <marker id="riArr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M0 0L10 5L0 10z" className="ri-hv__ah" />
          </marker>
        </defs>
        <path d="M190 120 C222 120 228 120 262 120" className={"ri-hv__ln" + st(1)} markerEnd="url(#riArr)" />
        <path d="M396 196 C396 232 160 214 128 252" className={"ri-hv__ln" + st(2)} markerEnd="url(#riArr)" />
        <path d="M232 330 C262 330 268 330 300 330" className={"ri-hv__ln" + st(3)} markerEnd="url(#riArr)" />
        <g className={"ri-hv__z ri-hv__z1" + st(0)}>
          <rect x="16" y="30" width="176" height="166" rx="16" className="ri-hv__card" />
          <text x="30" y="52" className="ri-hv__k">
            01 · RAW DATA
          </text>
          <g className="ri-hv__cells">{cells}</g>
        </g>
        <g className={"ri-hv__z ri-hv__z2" + st(1)}>
          <rect x="268" y="30" width="276" height="166" rx="16" className="ri-hv__card" />
          <text x="284" y="52" className="ri-hv__k">
            02 · STRUCTURE
          </text>
          <rect x="284" y="64" width="244" height="18" rx="4" className="ri-hv__th" />
          {[0, 1, 2, 3, 4].map((r) => (
            <g key={r}>
              <rect x="284" y={88 + r * 20} width="70" height="10" rx="3" className="ri-hv__row" />
              {[0, 1, 2, 3].map((c) => (
                <rect
                  key={c}
                  x={366 + c * 42}
                  y={88 + r * 20}
                  width={18 + ((r * 3 + c * 5) % 5) * 4}
                  height="10"
                  rx="3"
                  className={"ri-hv__val" + (c === 2 ? " ri-hv__val--hi" : "")}
                />
              ))}
            </g>
          ))}
          <rect x="446" y="62" width="44" height="126" rx="6" className="ri-hv__colhi" />
        </g>
        <g className={"ri-hv__z ri-hv__z3" + st(2)}>
          <rect x="16" y="252" width="216" height="152" rx="16" className="ri-hv__card" />
          <text x="30" y="274" className="ri-hv__k">
            03 · VISUAL STORY
          </text>
          {[46, 70, 58, 92, 80].map((h, i) => (
            <rect
              key={i}
              x={36 + i * 36}
              y={384 - h}
              width="22"
              height={h}
              rx="4"
              className={"ri-hv__bar" + (i === 3 ? " ri-hv__bar--hi" : "")}
              style={{
                "--i": i,
              }}
            />
          ))}
          <path d="M47 352 L83 336 L119 344 L155 306 L191 318" className="ri-hv__trend" />
        </g>
        <g className={"ri-hv__z ri-hv__z4" + st(3)}>
          <rect x="306" y="236" width="238" height="168" rx="18" className="ri-hv__ins" />
          <text x="324" y="262" className="ri-hv__k ri-hv__k--w">
            04 · INSIGHT
          </text>
          <circle cx="340" cy="294" r="14" className="ri-hv__bulb" />
          <path d="M335 296h10M336 301h8" className="ri-hv__bulbl" />
          <rect x="364" y="284" width="150" height="9" rx="4" className="ri-hv__tl" />
          <rect x="364" y="300" width="112" height="9" rx="4" className="ri-hv__tl ri-hv__tl--s" />
          <rect x="324" y="326" width="190" height="8" rx="4" className="ri-hv__tl ri-hv__tl--s" />
          <rect x="324" y="340" width="150" height="8" rx="4" className="ri-hv__tl ri-hv__tl--s" />
          <g className={"ri-hv__act" + st(4)}>
            <rect x="324" y="362" width="146" height="26" rx="13" className="ri-hv__pill" />
            <text x="397" y="379" textAnchor="middle" className="ri-hv__pt">
              Business action →
            </text>
          </g>
        </g>
      </svg>
      <ol className="ri-hv__steps" aria-hidden="true">
        {["Data", "Structure", "Story", "Insight", "Action"].map((t, i) => (
          <li key={t} className={k >= i ? "is-on" : ""}>
            <span />
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}
function RPT_Chart({ t }) {
  const P = {
    className: "ri-ch",
  };
  switch (t) {
    case "bar":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[30, 52, 40, 64, 46].map((h, i) => (
            <rect key={i} x={12 + i * 21} y={70 - h} width="14" height={h} rx="2" className={i === 3 ? "a" : "b"} />
          ))}
        </svg>
      );
    case "stack":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[0, 1, 2, 3].map((i) => (
            <g key={i}>
              <rect x="14" y={10 + i * 16} width={30 + i * 6} height="11" className="a" />
              <rect x={44 + i * 6} y={10 + i * 16} width={34 - i * 4} height="11" className="c" />
              <rect x={78 + i * 2} y={10 + i * 16} width={28 - i * 2} height="11" className="b" />
            </g>
          ))}
        </svg>
      );
    case "donut":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <circle cx="60" cy="40" r="26" className="ring b" />
          <circle cx="60" cy="40" r="26" className="ring a" strokeDasharray="70 200" transform="rotate(-90 60 40)" />
          <circle
            cx="60"
            cy="40"
            r="26"
            className="ring c"
            strokeDasharray="38 200"
            strokeDashoffset="-72"
            transform="rotate(-90 60 40)"
          />
        </svg>
      );
    case "trend":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <path d="M10 62 L36 50 L62 54 L88 30 L112 22" className="ln a" />
          <path d="M10 54 L36 58 L62 44 L88 46 L112 40" className="ln c" />
          <path d="M10 70H112" className="ax" />
        </svg>
      );
    case "heat":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect
                key={r + "" + c}
                x={12 + c * 20}
                y={8 + r * 17}
                width="18"
                height="15"
                rx="2"
                className="a"
                style={{
                  opacity: 0.15 + (((r * 7 + c * 3) % 6) / 6) * 0.8,
                }}
              />
            )),
          )}
        </svg>
      );
    case "compare":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x="14" y={12 + i * 22} width={44 + i * 8} height="7" rx="3" className="a" />
              <rect x="14" y={21 + i * 22} width={58 - i * 10} height="7" rx="3" className="c" />
            </g>
          ))}
        </svg>
      );
    case "rank":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <circle cx="16" cy={12 + i * 14} r="4" className={i === 0 ? "a" : "b"} />
              <rect x="26" y={9 + i * 14} width={84 - i * 14} height="6" rx="3" className={i === 0 ? "a" : "b"} />
            </g>
          ))}
        </svg>
      );
    case "dist":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <path d="M8 70 C30 70 36 16 60 16 S90 70 112 70" className="ln a" />
          <path d="M8 70 C30 70 36 16 60 16 S90 70 112 70 Z" className="area" />
          <path d="M60 14V72" className="ax d" />
        </svg>
      );
    case "segmap":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[
            [30, 30, 16, "a"],
            [70, 24, 12, "c"],
            [88, 52, 18, "b"],
            [44, 58, 10, "c"],
          ].map(([x, y, r, c], i) => (
            <circle key={i} cx={x} cy={y} r={r} className={c + " o"} />
          ))}
        </svg>
      );
    case "matrix":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <path d="M60 6V74M10 40H110" className="ax" />
          <rect x="62" y="8" width="46" height="30" className="area" />
          {[
            [78, 20],
            [92, 28],
            [36, 56],
            [48, 24],
            [84, 58],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" className={i < 2 ? "a" : "b"} />
          ))}
        </svg>
      );
    case "kpi":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          {[0, 1].map((i) => (
            <g key={i}>
              <rect x={10 + i * 52} y="14" width="46" height="52" rx="6" className="card" />
              <rect x={18 + i * 52} y="24" width="22" height="5" rx="2" className="b" />
              <rect x={18 + i * 52} y="36" width="30" height="12" rx="3" className={i ? "c" : "a"} />
              <path d={`M${18 + i * 52} 58 l8 -4 l8 2 l8 -6`} className="ln a" />
            </g>
          ))}
        </svg>
      );
    case "driver":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <path d="M14 70H110M14 70V8" className="ax" />
          {[
            [30, 56],
            [46, 40],
            [64, 46],
            [80, 22],
            [96, 30],
            [56, 60],
            [40, 26],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="4" className={x > 70 && y < 35 ? "a" : "b"} />
          ))}
          <path d="M18 64L106 18" className="ln d" />
        </svg>
      );
    case "journey":
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <path d="M12 40 C30 14 44 66 62 40 S96 18 110 40" className="ln a" />
          {[12, 37, 62, 86, 110].map((x, i) => (
            <circle key={i} cx={x} cy={i % 2 ? (i === 1 ? 36 : 30) : 40} r="5" className={i === 2 ? "c" : "a"} />
          ))}
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 80" {...P}>
          <rect x="10" y="26" width="28" height="28" rx="6" className="b" />
          <rect x="46" y="26" width="28" height="28" rx="6" className="c" />
          <rect x="82" y="26" width="28" height="28" rx="14" className="a" />
          <path d="M38 40h8M74 40h8" className="ax" />
        </svg>
      );
  }
}
const RPT_CHARTS = [
  ["bar", "Bar charts"],
  ["stack", "Stacked bars"],
  ["donut", "Donut charts"],
  ["trend", "Trend charts"],
  ["heat", "Heatmaps"],
  ["compare", "Comparison charts"],
  ["rank", "Ranking visuals"],
  ["dist", "Distribution charts"],
  ["segmap", "Segment maps"],
  ["matrix", "Opportunity matrices"],
  ["kpi", "KPI cards"],
  ["driver", "Driver charts"],
  ["journey", "Journey frameworks"],
  ["diagram", "Insight diagrams"],
];
const RPT_TABS = [
  [
    "table",
    "Data Processing & Tabulation",
    "The structured foundation of every report: tables and analytical datasets built around the analysis plan.",
    ["Frequency tables", "Cross-tabulation", "Derived variables", "Coding & recoding", "Data structuring"],
    "tab",
  ],
  [
    "bars",
    "Quantitative Analysis",
    "Measures that describe how a market, brand, product or customer group thinks, chooses and behaves.",
    [
      "Awareness",
      "Consideration",
      "Preference",
      "Usage",
      "Purchase behaviour",
      "Satisfaction",
      "Importance",
      "Perception",
      "Brand performance",
      "Customer loyalty",
      "Product evaluation",
      "Price sensitivity",
      "Purchase drivers",
      "Switching behaviour",
      "Segment differences",
      "Behavioural patterns",
      "Attitudinal differences",
    ],
    "funnel",
  ],
  [
    "scatter",
    "Advanced Analysis",
    "Applied depending on the study design and analytical requirements. Not every project needs, or includes, every technique.",
    [
      "Significance testing",
      "Mean and score analysis",
      "Ranking analysis",
      "Index development",
      "Driver analysis",
      "Segmentation analysis",
      "Correlation analysis",
      "Trend analysis",
      "Cluster-based analysis",
      "Regression-oriented analysis",
      "Conjoint-related reporting",
      "MaxDiff-related reporting",
      "Choice-based analysis",
    ],
    "driver",
  ],
];
function RPT_TabViz({ v }) {
  if (v === "tab") {
    return (
      <div className="ri-tv ri-tv--tab" aria-hidden="true">
        {["Frequencies", "Cross-tab", "Analytical dataset"].map((t, i) => (
          <div key={t} className={"ri-mt ri-mt" + i}>
            <span>{t}</span>
            <svg viewBox="0 0 120 84">
              <rect x="6" y="6" width="108" height="12" rx="3" className="h" />
              {[0, 1, 2, 3].map((r) => (
                <g key={r}>
                  <rect x="6" y={24 + r * 14} width="34" height="8" rx="2" className="r" />
                  {Array.from({
                    length: i + 1,
                  }).map((_, c) => (
                    <rect
                      key={c}
                      x={48 + c * (66 / (i + 1))}
                      y={24 + r * 14}
                      width={Math.max(10, 50 / (i + 1))}
                      height="8"
                      rx="2"
                      className={c === i && r === 1 ? "v hi" : "v"}
                    />
                  ))}
                </g>
              ))}
            </svg>
          </div>
        ))}
      </div>
    );
  }
  if (v === "funnel") {
    return (
      <div className="ri-tv ri-tv--fun" aria-hidden="true">
        {["Awareness", "Consideration", "Preference", "Usage", "Purchase"].map((t, i) => (
          <div
            key={t}
            style={{
              "--w": 100 - i * 13 + "%",
              "--i": i,
            }}
          >
            <span>{t}</span>
          </div>
        ))}
        <em>Shape only · no values</em>
      </div>
    );
  }
  return (
    <div className="ri-tv ri-tv--drv" aria-hidden="true">
      <RPT_Chart t="driver" />
      <em>Abstract driver view · no values</em>
    </div>
  );
}
function RPT_Tabs() {
  const [sel, setSel] = ee.useState(0);
  const refs = ee.useRef([]);
  const key = (e) => {
    const n = RPT_TABS.length;
    let x = null;
    if (e.key === "ArrowRight") x = (sel + 1) % n;
    if (e.key === "ArrowLeft") x = (sel - 1 + n) % n;
    if (x !== null) {
      e.preventDefault();
      setSel(x);
      if (refs.current[x]) refs.current[x].focus();
    }
  };
  const [ic, t, d, xs, v] = RPT_TABS[sel];
  return (
    <div className="ri-tabs">
      <div className="ri-tabs__list" role="tablist" aria-label="Quantitative reporting capabilities" onKeyDown={key}>
        {RPT_TABS.map(([i2, t2], i) => (
          <button
            key={t2}
            ref={(el) => (refs.current[i] = el)}
            role="tab"
            id={"ri-tab-" + i}
            aria-selected={sel === i}
            aria-controls="ri-tabpanel"
            tabIndex={sel === i ? 0 : -1}
            className={sel === i ? "is-on" : ""}
            onClick={() => setSel(i)}
          >
            <RC_I n={i2} s={18} />
            <span>{t2}</span>
          </button>
        ))}
      </div>
      <div className="ri-tabs__panel" role="tabpanel" id="ri-tabpanel" aria-labelledby={"ri-tab-" + sel} key={sel}>
        <div className="ri-tabs__copy">
          <h4>{t}</h4>
          <p>{d}</p>
          <ul className="ri-chips">
            {xs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
          {sel === 0 && (
            <p className="ri-note">
              {"Detailed preparation, cleaning and statistical processing are covered by our "}
              <RPT_L to="/services/market-research/data-processing-and-analytics">Data Processing & Analytics</RPT_L>
              {" service."}
            </p>
          )}
          {sel === 2 && (
            <p className="ri-note">
              Techniques are selected depending on the study design and analytical requirements.
            </p>
          )}
        </div>
        <RPT_TabViz v={v} />
      </div>
    </div>
  );
}
const RPT_OE = [
  "Raw Responses",
  "Cleaning",
  "Coding",
  "Categorization",
  "Theme Identification",
  "Quantification",
  "Interpretation",
];
function RPT_OpenEnds() {
  const [ref, inView] = RC_useInView(0.25);
  return (
    <div className={"ri-oe" + (inView ? " is-in" : "")} ref={ref}>
      <ol className="ri-oe__line">
        {RPT_OE.map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span>{String(i + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>
      <div className="ri-oe__demo" aria-label="Example of coding open-ended responses">
        <div className="ri-oe__col">
          <span className="ri-oe__h">Responses</span>
          {[
            "\u201CDelivery took longer than I expected.\u201D",
            "\u201CHard to find the right size online.\u201D",
            "\u201CThe support team sorted it quickly.\u201D",
            "\u201CWould buy again if delivery was faster.\u201D",
          ].map((q, i) => (
            <p
              key={i}
              className="ri-oe__q"
              style={{
                "--i": i,
              }}
            >
              {q}
            </p>
          ))}
        </div>
        <div className="ri-oe__arrow" aria-hidden="true">
          <RC_I n="arrow" s={18} />
        </div>
        <div className="ri-oe__col">
          <span className="ri-oe__h">Codes</span>
          {[
            ["Delivery speed", "a"],
            ["Product fit", "c"],
            ["Service resolution", "b"],
            ["Delivery speed", "a"],
          ].map(([c, k], i) => (
            <span
              key={i}
              className={"ri-oe__code ri-oe__code--" + k}
              style={{
                "--i": i,
              }}
            >
              {c}
            </span>
          ))}
        </div>
        <div className="ri-oe__arrow" aria-hidden="true">
          <RC_I n="arrow" s={18} />
        </div>
        <div className="ri-oe__col">
          <span className="ri-oe__h">Themes</span>
          {[
            ["Fulfilment", 2, "a"],
            ["Product experience", 1, "c"],
            ["Customer service", 1, "b"],
          ].map(([t, n, k]) => (
            <div key={t} className={"ri-oe__th ri-oe__th--" + k}>
              <strong>{t}</strong>
              <span>
                {Array.from({
                  length: n,
                }).map((_, j) => (
                  <i key={j} />
                ))}
              </span>
            </div>
          ))}
        </div>
        {null}
      </div>
    </div>
  );
}
function RPT_Segments() {
  const cols = ["Total market", "Segment A", "Segment B", "Segment C"];
  const rows = [
    ["Measure 1", [62, 78, 54, 40]],
    ["Measure 2", [48, 36, 70, 52]],
    ["Measure 3", [55, 60, 30, 74]],
  ];
  const [ref, inView] = RC_useInView(0.25);
  return (
    <div className={"ri-seg" + (inView ? " is-in" : "")} ref={ref}>
      <div
        className="ri-seg__grid"
        role="img"
        aria-label="Comparison: the same three measures look different in each segment compared with the total market. No real values."
      >
        <span />
        {cols.map((c, i) => (
          <strong key={c} className={i === 0 ? "is-total" : ""}>
            {c}
          </strong>
        ))}
        {rows.map(([m, vs]) => [
          <em key={m}>{m}</em>,
          ...vs.map((v, i) => (
            <span key={m + i} className={"ri-seg__cell" + (i === 0 ? " is-total" : "")}>
              <i
                style={{
                  "--w": v + "%",
                }}
              />
            </span>
          )),
        ])}
      </div>
      {null}
    </div>
  );
}
function RPT_Trends() {
  const [ref, inView] = RC_useInView(0.3);
  return (
    <div className={"ri-trend" + (inView ? " is-in" : "")} ref={ref}>
      <svg
        viewBox="0 0 320 170"
        role="img"
        aria-label="Wave comparison with three lines across four research waves. No real values."
      >
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <path d={`M${40 + i * 85} 20V140`} className="ri-trend__g" />
            <text x={40 + i * 85} y="160" textAnchor="middle" className="ri-trend__x">
              {"Wave "}
              {i + 1}
            </text>
          </g>
        ))}
        <path d="M40 110 L125 96 L210 70 L295 46" className="ri-trend__l a" />
        <path d="M40 66 L125 74 L210 86 L295 98" className="ri-trend__l c" />
        <path d="M40 88 L125 86 L210 82 L295 78" className="ri-trend__l b" />
        <text x="300" y="44" className="ri-trend__lab">
          Rising
        </text>
        <text x="300" y="104" className="ri-trend__lab">
          Falling
        </text>
        <text x="300" y="80" className="ri-trend__lab">
          Stable
        </text>
      </svg>
      {null}
    </div>
  );
}
const RPT_STEPS = [
  [
    "target",
    "Research Objective Understanding",
    "Understand the study before analysing it.",
    [
      "Business question",
      "Research objectives",
      "Target audience",
      "Sample design",
      "Questionnaire / discussion guide",
      "Market context",
      "Hypotheses",
      "Key analytical questions",
    ],
  ],
  [
    "shield",
    "Data Quality Review & Validation",
    "Check the data the findings will rest on.",
    [
      "Completeness",
      "Consistency",
      "Duplicate records",
      "Logic",
      "Response patterns",
      "Outliers",
      "Speeding",
      "Straight-lining",
      "Sample profile",
      "Quotas",
      "Coding",
      "Missing values",
    ],
  ],
  [
    "table",
    "Data Processing & Tabulation",
    "Structure the data for analysis.",
    ["Frequencies", "Cross-tabs", "Derived variables", "Coding", "Recoding"],
  ],
  [
    "scatter",
    "Analysis",
    "Apply the analysis the question needs.",
    [
      "Quantitative analysis",
      "Qualitative analysis",
      "Segmentation",
      "Trend analysis",
      "Driver analysis",
      "Thematic analysis",
      "Other justified analytical approaches",
    ],
  ],
  [
    "bulb",
    "Interpretation",
    "Move from \u201CWhat happened?\u201D to \u201CWhy does it matter?\u201D",
    ["What the pattern shows", "What could explain it", "How confident we can be", "Why it matters for the decision"],
  ],
  [
    "pie",
    "Visualization & Storytelling",
    "Turn findings into a clear, ordered story.",
    ["Charts", "Tables", "Frameworks", "Insight diagrams", "Segment comparisons", "Opportunity matrices"],
  ],
  [
    "layers",
    "Executive Synthesis",
    "Prioritise what leadership needs first.",
    ["Key findings", "Implications", "Opportunities", "Risks / barriers", "Research-supported actions"],
  ],
  [
    "msg",
    "Reporting & Debrief",
    "Deliver agreed outputs and, where included, conduct stakeholder debriefs.",
    [
      "Agreed reports and presentations",
      "Tables, data books or dashboards",
      "Stakeholder debrief where included in scope",
    ],
  ],
];
function RPT_Process() {
  const [sel, setSel] = ee.useState(0);
  const [ic, t, d, xs] = RPT_STEPS[sel];
  return (
    <div className="ri-proc">
      <ol className="ri-proc__rail">
        {RPT_STEPS.map(([i2, t2], i) => (
          <li key={t2} className={(i === sel ? "is-on" : "") + (i < sel ? " is-done" : "")}>
            <button type="button" aria-expanded={i === sel} aria-controls={"ri-step-" + i} onClick={() => setSel(i)}>
              <span className="ri-proc__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="ri-proc__t">{t2}</span>
            </button>
            <div className="ri-proc__m" id={"ri-step-" + i} hidden={i !== sel}>
              <p>{RPT_STEPS[i][2]}</p>
              <ul>
                {RPT_STEPS[i][3].map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={12} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <div className="ri-proc__panel" aria-live="polite" key={sel}>
        <span className="ri-proc__ic">
          <RC_I n={ic} s={26} />
        </span>
        <span className="ri-proc__k">
          {"Stage "}
          {String(sel + 1).padStart(2, "0")}
          {" of 08"}
        </span>
        <strong>{t}</strong>
        <p>{d}</p>
        <ul>
          {xs.map((x, i) => (
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
        <div className="ri-proc__nav">
          <button type="button" aria-label="Previous stage" onClick={() => setSel((sel + 7) % 8)}>
            ‹
          </button>
          <i
            style={{
              "--p": (sel + 1) / 8,
            }}
          />
          <button type="button" aria-label="Next stage" onClick={() => setSel((sel + 1) % 8)}>
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
const RPT_QA = [
  "Data Completeness",
  "Consistency",
  "Sample Validation",
  "Coding Validation",
  "Analytical Review",
  "Visual QA",
  "Interpretation Review",
  "Final Output QA",
];
const RPT_FORMATS = [
  ["report", "Detailed Research Reports", "Methodology, sample profile, findings, analysis, insights and conclusions."],
  ["deck", "Executive Presentations", "Management-focused findings and implications."],
  ["table", "Statistical Tables", "Detailed tables and cross-tabulations."],
  ["dash", "Dashboards", "Data visualization environments where appropriate."],
  ["book", "Data Books", "Detailed tabular outputs."],
  ["summary", "Management Summaries", "Concise outputs for senior stakeholders."],
  [
    "custom",
    "Customized Reporting",
    "Outputs aligned with client templates, brand guidelines, analytical frameworks or reporting requirements.",
  ],
];
function RPT_FormatArt({ k }) {
  const box = <rect x="8" y="6" width="84" height="64" rx="7" className="pg" />;
  const lines = (y, n, w = 60) =>
    Array.from({
      length: n,
    }).map((_, i) => <rect key={y + i} x="18" y={y + i * 8} width={w - i * 8} height="4" rx="2" className="tx" />);
  let inner;
  if (k === "report")
    inner = (
      <>
        {lines(16, 3)}
        <rect x="18" y="44" width="28" height="18" rx="3" className="ac" />
        {lines(46, 2, 36).map((e) =>
          ee.cloneElement(e, {
            x: 52,
          }),
        )}
      </>
    );
  else if (k === "deck")
    inner = (
      <>
        <rect x="18" y="16" width="40" height="6" rx="3" className="tx2" />
        {[30, 40, 24, 46].map((h, i) => (
          <rect
            key={i}
            x={20 + i * 14}
            y={62 - h * 0.7}
            width="9"
            height={h * 0.7}
            rx="2"
            className={i === 3 ? "ac" : "tx"}
          />
        ))}
        <rect x="74" y="30" width="10" height="28" rx="2" className="ac2" />
      </>
    );
  else if (k === "table")
    inner = (
      <>
        {[0, 1, 2, 3, 4].map((r) => (
          <g key={r}>
            {[0, 1, 2, 3].map((c) => (
              <rect
                key={c}
                x={16 + c * 19}
                y={14 + r * 10}
                width="16"
                height="6"
                rx="1.5"
                className={r === 0 ? "tx2" : c === 2 && r === 2 ? "ac" : "tx"}
              />
            ))}
          </g>
        ))}
      </>
    );
  else if (k === "dash")
    inner = (
      <>
        <rect x="16" y="14" width="30" height="22" rx="4" className="ac2" />
        <rect x="52" y="14" width="30" height="22" rx="4" className="tx" />
        <path d="M18 60 L32 50 L46 54 L60 42 L80 46" className="ln" />
      </>
    );
  else if (k === "book")
    inner = (
      <>
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={20 + i * 8}
            y={14 + i * 4}
            width="44"
            height="48"
            rx="3"
            className={i === 2 ? "ac2" : "tx"}
          />
        ))}
      </>
    );
  else if (k === "summary")
    inner = (
      <>
        <rect x="18" y="14" width="56" height="7" rx="3" className="tx2" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <circle cx="22" cy={34 + i * 11} r="3" className="ac" />
            <rect x="30" y={32 + i * 11} width={44 - i * 8} height="4" rx="2" className="tx" />
          </g>
        ))}
      </>
    );
  else
    inner = (
      <>
        <rect x="16" y="14" width="66" height="8" rx="3" className="ac" />
        {lines(30, 3, 56)}
        <circle cx="72" cy="54" r="7" className="ac2" />
      </>
    );
  return (
    <svg viewBox="0 0 100 76" className="ri-fa" aria-hidden="true">
      {box}
      {inner}
    </svg>
  );
}
const RPT_METH = [
  ["Online Surveys", "online-data-collection"],
  ["CATI", "cati"],
  ["CAPI", "offline-data-collection"],
  ["Face-to-Face", "offline-data-collection"],
  ["IDIs", "qualitative-research"],
  ["FGDs", "qualitative-research"],
  ["Ethnography", "qualitative-research"],
  ["Mystery Shopping"],
  ["Customer Experience Research"],
  ["B2B Research", "business-panel"],
  ["B2C Research", "consumer-panel"],
  ["Healthcare Research", "healthcare-panel"],
  ["Concept Testing"],
  ["Product Research"],
  ["Brand Research"],
];
const RPT_EX = [
  ["database", "Research dataset", "Survey responses and open-ended comments from a customer study."],
  ["shield", "Validation", "Completeness, logic, duplicates and quotas checked."],
  ["users", "Segment analysis", "Results compared across relevant customer groups."],
  ["pie", "Visualization", "Key differences shown in a small set of focused charts."],
  ["bulb", "Insight synthesis", "Patterns connected to what may explain them."],
  ["flag", "Executive recommendation", "Research-supported considerations for stakeholder discussion."],
];
function RPT_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("ri-overview");
  const [moreInd, setMoreInd] = ee.useState(false);
  const team = a.team || {};
  const nav = [
    ["ri-overview", "Overview"],
    ["ri-analyse", "What we analyse"],
    ["ri-process", "How we work"],
    ["ri-action", "Insight to action"],
    ["ri-formats", "Formats"],
    ["ri-why", "Why us"],
    ["ri-faq", "FAQ"],
    ["ri-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is included in Reporting & Insights?",
      a: "Analysis, interpretation, visualization and reporting of research data, from tables and charts to executive summaries, dashboards and debriefs, as agreed for each project.",
    },
    {
      q: "What types of research data can you analyse?",
      a: "Survey data from online, CATI, CAPI and face-to-face studies, and qualitative outputs such as transcripts, session notes and open-ended responses.",
    },
    {
      q: "Can you support both quantitative and qualitative research reporting?",
      a: "Yes. Reporting can cover quantitative results, qualitative themes, or both within the same study.",
    },
    {
      q: "Can you create executive presentations and dashboards?",
      a: "Yes. Executive presentations, management summaries and dashboards can be provided where they suit the study and how your team will use the findings.",
    },
    {
      q: "Can you analyse open-ended responses?",
      a: "Yes. Open-ended responses can be cleaned, coded, grouped into themes and quantified, with selected verbatims included in the report.",
    },
    {
      q: "Can you provide cross-tabulation and subgroup analysis?",
      a: "Yes. Cross-tabs and subgroup comparisons, for example by region, age, industry or customer status, can be included where the sample supports them.",
    },
    {
      q: "How long does a Reporting & Insights project take?",
      a: "It depends on the data volume, number of markets and segments, the analysis required and the agreed outputs. We confirm timelines when we scope the work.",
    },
    {
      q: "Can you customize the report to our template or reporting framework?",
      a: "Yes. Outputs can follow your templates, brand guidelines, analytical frameworks or reporting requirements.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com" + RPT_ROUTE;
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
    const title = "Market Research Reporting & Insights | Frequent Research";
    const desc =
      "Market research reporting from Frequent Research: data analysis, cross-tabs, segmentation, visualization and executive insight for business decisions.";
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
          ["Reporting & Insights", RPT_ROUTE],
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
        name: "Reporting & Insights",
        serviceType: "Market research reporting, data analysis, visualization and insight",
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
  const svc = (s, label) => <RPT_L to={`/services/market-research/${s}`}>{label}</RPT_L>;
  const inds = SERVICE_INDUSTRIES.map(findIndustry).filter(Boolean);
  const extra = INDUSTRIES.filter((x) => !SERVICE_INDUSTRIES.includes(x.slug));
  return (
    <div className="ri rc">
      <section className="ri-hero">
        <div className="container ri-hero__in">
          <div className="ri-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <RPT_L to="/">Home</RPT_L>
              <span>
                <RPT_L to={`/services/${a.slug}`}>{a.name}</RPT_L>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="ri-eyebrow">
              <RC_I n="pie" s={15} />
              Market research reporting
            </span>
            <HeroH1>Reporting & Insights</HeroH1>
            <p className="ri-hero__sub">Turning Research Data into Decisions That Matter</p>
            <p className="ri-hero__body">
              Reliable data is only the beginning. The value comes from understanding the patterns in it, interpreting
              what they mean and translating findings into business action. Our market research reporting turns
              quantitative and qualitative outputs into clear, decision-ready insight.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg" href="#ri-enquire" onClick={rcScrollTo("ri-enquire")}>
                Get a free consultation
              </a>
              <RPT_L className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </RPT_L>
            </div>
          </div>
          <RPT_Hero />
        </div>
        <div className="container">
          <ul className="ri-strip">
            {[
              ["file", "Executive Summaries"],
              ["monitor", "Interactive Dashboards"],
              ["bars", "Presentation-Ready Charts"],
              ["msg", "Debrief Workshops"],
            ].map(([ic, t]) => (
              <li key={t}>
                <span>
                  <RC_I n={ic} s={18} />
                </span>
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
      <section className="rc-sec" id="ri-overview">
        <div className="container">
          <div className="ri-prob">
            <div className="ri-prob__copy">
              <span className="rc-kicker">The reporting challenge</span>
              <h2>From Data to Meaningful Insights</h2>
              <p className="ri-lead">
                Research can generate large volumes of data, tables, verbatims, observations and respondent feedback.
                The challenge is turning those outputs into something decision-makers can quickly understand and act
                upon.
              </p>
              <p className="od-muted">
                That is the job of research reporting and insights: organising findings around the business question,
                not the order of the questionnaire, and being clear about what the evidence supports.
              </p>
            </div>
            <div className="ri-pile" aria-hidden="true">
              <div className="ri-pile__in">
                {[
                  "Tables",
                  "Cross-tabs",
                  "Verbatims",
                  "Observations",
                  "Open-ends",
                  "Feedback",
                  "Segments",
                  "Charts",
                ].map((t, i) => (
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
              <div className="ri-pile__arrow">
                <RC_I n="arrow" s={20} />
              </div>
              <div className="ri-pile__out">
                <RC_I n="bulb" s={22} />
                <strong>One clear answer</strong>
                <em>for the decision at hand</em>
              </div>
            </div>
          </div>
          <ol className="ri-flow4">
            {[
              [
                "database",
                "Clean Data",
                "Validated data, checked for completeness, logic and duplicates before analysis begins.",
              ],
              [
                "bars",
                "Relevant Analysis",
                "Analysis chosen for the business question: tables, comparisons, segments, drivers or themes.",
              ],
              [
                "search",
                "Clear Interpretation",
                "What the patterns mean, what could explain them and how confident we can be.",
              ],
              [
                "bulb",
                "Actionable Insight",
                "A finding the business can act on, connected to implications and next steps.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span className="ri-flow4__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="ri-flow4__ic">
                  <RC_I n={ic} s={24} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ol>
          <div className="ri-journey" aria-label="Reporting journey">
            {[
              "Research Data",
              "Validation",
              "Processing",
              "Analysis",
              "Interpretation",
              "Visualization",
              "Insight",
              "Business Action",
            ].map((t, i, arr) => (
              <span key={t} className={i === arr.length - 1 ? "is-end" : ""}>
                {t}
              </span>
            ))}
          </div>
          <div className="ri-vs">
            <div>
              <span className="ri-vs__k">Data Processing & Analytics</span>
              <p>Prepares the data: cleaning, coding, tabulation, statistical processing and analytical datasets.</p>
              {svc("data-processing-and-analytics", "Explore Data Processing & Analytics \u2192")}
            </div>
            <span className="ri-vs__mid" aria-hidden="true">
              <RC_I n="arrow" s={18} />
            </span>
            <div className="is-here">
              <span className="ri-vs__k">Reporting & Insights</span>
              <p>
                Explains the data: interpretation, visualization, storytelling, executive synthesis, recommendations and
                debriefs.
              </p>
              <span className="ri-vs__here">You are here</span>
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec ri-sec--soft" id="ri-analyse">
        <div className="container">
          <RC_Head
            kicker="Capabilities"
            title="What We Analyse"
            intro="Quantitative and qualitative research data, analysed depending on the study design and analytical requirements."
          />
          <h3 className="ri-h3">Quantitative reporting and market research data analysis</h3>
          <RPT_Tabs />
          <div className="ri-qual">
            <div className="ri-qual__copy">
              <h3 className="ri-h3">Qualitative analysis & interpretation</h3>
              <p className="od-muted">
                {
                  "Reporting is not limited to quantitative datasets. Conversations, observations and discussion outputs from "
                }
                {svc("qualitative-research", "qualitative research")}
                {" are analysed for meaning, not just counted."}
              </p>
              <ul className="ri-chips ri-chips--soft">
                {[
                  "Thematic analysis",
                  "Code-frame development",
                  "Topic categorization",
                  "Sentiment interpretation",
                  "Motivation analysis",
                  "Barrier identification",
                  "Need-state analysis",
                  "Consumer language analysis",
                  "Respondent segmentation",
                  "Verbatim selection",
                  "Contradiction identification",
                  "Emerging-theme identification",
                  "Moderator observation analysis",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <ol className="ri-said">
              {[
                ["msg", "What respondents said", "Their words, in context."],
                ["grid", "How frequently a theme appeared", "Useful context, but not the whole story."],
                ["bulb", "What the finding may indicate", "Interpretation, stated with appropriate caution."],
              ].map(([ic, t, d], i) => (
                <li
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>
                    <RC_I n={ic} s={20} />
                  </span>
                  <div>
                    <strong>{t}</strong>
                    <em>{d}</em>
                  </div>
                </li>
              ))}
              <li className="ri-said__note">
                A theme raised by a few participants can still matter. Qualitative findings explain why; they are not
                statistical estimates.
              </li>
            </ol>
          </div>
          <div className="ri-oewrap">
            <div className="ri-oewrap__head">
              <h3 className="ri-h3">Open-ended response analysis</h3>
              <p className="od-muted">
                Open-ended responses can reveal what closed questions miss, and selected verbatims add the respondent's
                voice to the final report.
              </p>
              <ul className="ri-chips ri-chips--line">
                {[
                  "Customer pain points",
                  "Product complaints",
                  "Reasons for purchase",
                  "Reasons for rejection",
                  "Unmet needs",
                  "Suggestions",
                  "Motivations",
                  "Barriers",
                  "Competitive references",
                  "Emerging themes",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <RPT_OpenEnds />
          </div>
          <div className="ri-segwrap">
            <div>
              <h3 className="ri-h3">One total result does not always tell the full story</h3>
              <p className="od-muted">
                Relevant subgroup analysis can show differences that a single total hides, where the sample supports it.
              </p>
              <ul className="ri-chips ri-chips--line">
                {[
                  "Age",
                  "Gender",
                  "Geography",
                  "Income",
                  "Occupation",
                  "Industry",
                  "Company size",
                  "Job function",
                  "Seniority",
                  "Purchase behaviour",
                  "Product usage",
                  "Brand usage",
                  "Customer status",
                  "Experience level",
                  "Healthcare specialty",
                  "Facility type",
                  "Business characteristics",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <RPT_Segments />
          </div>
          <div className="ri-trendwrap">
            <RPT_Trends />
            <div>
              <h3 className="ri-h3">Trend & pattern identification</h3>
              <p className="od-muted">
                Where historical or wave data exists, findings can be compared across research periods to show what is
                changing.
              </p>
              <ul className="ri-chips ri-chips--line">
                {[
                  "Market trends",
                  "Changing consumer preferences",
                  "Brand perception shifts",
                  "Emerging customer needs",
                  "Purchase behaviour changes",
                  "Regional differences",
                  "Segment-level variations",
                  "Adoption patterns",
                  "Customer experience trends",
                  "Product acceptance patterns",
                ].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec" id="ri-process">
        <div className="container">
          <RC_Head
            kicker="Our reporting workflow"
            title="How We Work"
            intro="A reporting-specific workflow, from understanding the study to the stakeholder debrief."
          />
          <RPT_Process />
          <div className="ri-qa">
            <div className="ri-qa__copy">
              <h3 className="ri-h3">Quality & validation</h3>
              <p className="od-muted">
                Reporting quality depends on the quality of the underlying research data, so checks run from the dataset
                through to the final output.
              </p>
            </div>
            <ol className="ri-qa__chain">
              {RPT_QA.map((t, i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>{i + 1}</span>
                  {t}
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="rc-sec ri-sec--ink" id="ri-action">
        <div className="container">
          <RC_Head light kicker="Insight development" title="From Findings to Business Action" />
          <div className="ri-viz">
            <div className="ri-viz__copy">
              <h3>Make Important Findings Easy to See, Understand, Remember and Act Upon</h3>
              <p>
                Each chart is chosen to make one point clearly. Formats depend on the question and the audience, not on
                a fixed template.
              </p>
              {null}
            </div>
            <ul className="ri-gal">
              {RPT_CHARTS.map(([k, t], i) => (
                <li
                  key={k}
                  style={{
                    "--i": i,
                  }}
                >
                  <RPT_Chart t={k} />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ri-oip">
            {null}
            <ol>
              {[
                [
                  "01",
                  "Observation",
                  "What does the data show?",
                  "Satisfaction is lower among customers who contacted support more than once.",
                ],
                [
                  "02",
                  "Interpretation",
                  "What could explain the pattern?",
                  "Repeat contact may indicate that issues are not being resolved at the first response.",
                ],
                [
                  "03",
                  "Business Implication",
                  "Why does this matter?",
                  "Improving first-contact resolution may matter more to satisfaction than response speed alone.",
                ],
              ].map(([nn, t, q, ex], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span className="ri-oip__n">{nn}</span>
                  <h3>{t}</h3>
                  <strong>{q}</strong>
                  <p>{ex}</p>
                </RC_Reveal>
              ))}
            </ol>
          </div>
          <div className="ri-exec">
            <div className="ri-exec__copy">
              <h3>Executive summary vs full report</h3>
              <p>
                A full technical report documents the methodology, sample, detailed findings and tables. An executive
                summary prioritises what senior stakeholders need to decide.
              </p>
              <div className="ri-exec__vs">
                <span>
                  <RC_I n="report" s={16} />
                  Full report: complete evidence
                </span>
                <span>
                  <RC_I n="file" s={16} />
                  Executive summary: priorities first
                </span>
              </div>
            </div>
            <div className="ri-doc" role="group" aria-label="Structure of an executive summary">
              <div className="ri-doc__bar">
                <i />
                <i />
                <i />
                <span>Executive summary</span>
              </div>
              <div className="ri-doc__grid">
                {[
                  ["Key Findings", "Most important research outcomes."],
                  ["Business Implications", "What findings could mean for the organization, brand, product or market."],
                  ["Customer Perspective", "What customers, consumers, professionals or businesses are communicating."],
                  ["Opportunities", "Areas requiring attention or further investigation."],
                  ["Risks & Barriers", "Factors potentially limiting adoption, satisfaction, conversion or growth."],
                  ["Recommended Actions", "Research-supported considerations for next steps."],
                ].map(([t, d], i) => (
                  <div
                    key={t}
                    style={{
                      "--i": i,
                    }}
                  >
                    <h4>{t}</h4>
                    <p>{d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="ri-rec">
            <h3>Recommendations grounded in evidence</h3>
            <p>
              When included within the agreed scope, recommendations are built from the research evidence and kept
              clearly separate from it. They are considerations for decision-makers, not guaranteed outcomes.
            </p>
            <ol className="ri-rec__lanes">
              {[
                ["database", "Research Evidence", "What the data and respondents show."],
                ["search", "Interpretation", "What the evidence may mean, and how confident we are."],
                ["flag", "Recommendation", "What the business could consider doing next."],
              ].map(([ic, t, d]) => (
                <li key={t}>
                  <RC_I n={ic} s={20} />
                  <strong>{t}</strong>
                  <em>{d}</em>
                </li>
              ))}
            </ol>
            <ul className="ri-chips ri-chips--dark">
              {[
                "Product development",
                "Brand positioning",
                "Customer experience",
                "Marketing communication",
                "Pricing",
                "Distribution",
                "Sales strategy",
                "Customer retention",
                "Target segmentation",
                "Market entry",
                "Product positioning",
                "Service improvement",
                "Channel strategy",
              ].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec" id="ri-formats">
        <div className="container">
          <RC_Head
            kicker="Deliverables"
            title="Reporting Formats"
            intro="Outputs are agreed for each project and designed around who will use the findings, and how."
          />
          <ul className="ri-fmt">
            {RPT_FORMATS.map(([k, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 4,
                }}
                className={i === 0 ? "is-wide" : ""}
              >
                <RPT_FormatArt k={k} />
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </RC_Reveal>
            ))}
          </ul>
          <div className="ri-meth">
            <div className="ri-meth__copy">
              <h3 className="ri-h3">Reporting across research methodologies</h3>
              <blockquote>
                Reporting structure is adapted to the research methodology and business objective, rather than forcing
                every study into the same reporting template.
              </blockquote>
            </div>
            <ul className="ri-meth__list">
              {RPT_METH.map(([t, s]) => (
                <li key={t}>
                  {s ? (
                    <RPT_L to={`/services/market-research/${s}`}>
                      {t}
                      <RC_I n="arrow" s={12} />
                    </RPT_L>
                  ) : (
                    <span>{t}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec ri-sec--soft" id="ri-why">
        <div className="container">
          <RC_Head kicker="Why Frequent Research" title="Why Frequent Research for Market Research Reporting?" />
          <ol className="ri-why">
            {[
              [
                "file",
                "Story Before Slides",
                "Findings organised around the business question rather than questionnaire order.",
              ],
              ["flag", "Clear Recommendations", "Evidence connected to implications and practical next steps."],
              [
                "pie",
                "Charts That Fit the Question",
                "Visual formats selected for clarity, with labels that explain the point.",
              ],
              ["monitor", "Formats Your Team Will Use", "Executive summaries, reports, dashboards and data tables."],
              [
                "users",
                "Research Context",
                "Where our team runs the study, the researchers who managed it interpret the results, so context is not lost in handover.",
              ],
              [
                "msg",
                "Debriefs That Drive Discussion",
                "Presentations and discussion sessions where included within project scope.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 3,
                }}
              >
                <span className="ri-why__n">{String(i + 1).padStart(2, "0")}</span>
                <span className="ri-why__ic">
                  <RC_I n={ic} s={20} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
              </RC_Reveal>
            ))}
          </ol>
          <div className="ri-team">
            <div>
              <h3>The Team Behind Your Project</h3>
              <p className="od-muted">Reporting draws on several specialist roles across the research lifecycle.</p>
              <ul className="ri-team__r">
                {(team.roles || []).map((r) => (
                  <li key={r}>
                    <RC_I n="user" s={14} />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="ri-team__env">
              <RC_I n="layers" s={22} />
              <strong>Tools & environments</strong>
              <p>
                Research, data-processing, visualization and reporting environments selected according to project
                requirements.
              </p>
            </div>
          </div>
          <h3 className="ri-h3 ri-h3--c">Industries we support</h3>
          <div className="rc-ind">
            {inds.map((o) => (
              <RPT_L key={o.slug} className="rc-ind__item" to={`/industries-case-studies/${o.slug}`}>
                <IndustryIcon name={o.icon} size={20} />
                <span>{o.name}</span>
              </RPT_L>
            ))}
            {moreInd &&
              extra.map((o) => (
                <RPT_L key={o.slug} className="rc-ind__item rc-ind__item--x" to={`/industries-case-studies/${o.slug}`}>
                  <IndustryIcon name={o.icon} size={20} />
                  <span>{o.name}</span>
                </RPT_L>
              ))}
            <button className="rc-ind__more" aria-expanded={moreInd} onClick={() => setMoreInd(!moreInd)}>
              {moreInd ? "Show fewer" : "+" + extra.length + " more"}
            </button>
          </div>
          <div className="ri-ex">
            <div className="ri-ex__head">
              {null}
              <h3>Reporting walkthrough</h3>
            </div>
            <ol>
              {RPT_EX.map(([ic, t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>
                    <RC_I n={ic} s={18} />
                  </span>
                  <strong>{t}</strong>
                  <em>{d}</em>
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section section--tint" id="ri-faq">
        <div className="container split">
          <h2 className="split__title">Reporting & Insights: FAQs</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec ri-guidesec">
        <div className="container">
          <RPT_L to="/blog/research-reporting-insights-guide" className="ri-guide">
            <span className="ri-guide__k">In-depth guide</span>
            <strong>Research Reporting and Insights: Turning Data into Decisions People Act On</strong>
            <span className="ri-guide__go">
              {"Read the guide "}
              <RC_I n="arrow" s={15} />
            </span>
          </RPT_L>
        </div>
      </section>
      <section className="section ri-enq" id="ri-enquire">
        <div className="container enquire">
          <div className="enquire__intro ri-enq__intro">
            <h2>Let's Find the Right Solution Together</h2>
            <p>
              Tell us what you are trying to understand, measure, compare or improve. Our team can help determine the
              appropriate reporting, analysis, visualization and insight approach for your research requirement.
            </p>
            <div className="ri-enq__ctas">
              <RPT_L className="btn btn--primary" to="/lets-talk?type=quote">
                Request a Quote
              </RPT_L>
              <RPT_L className="btn btn--ghost" to="/lets-talk">
                Talk to an Expert
              </RPT_L>
            </div>
            <h3>Related services</h3>
            <ul className="related">
              {[
                ["research-consultancy", "Research Consultancy"],
                ["research-design-cycle", "Research Design Cycle"],
                ["quantitative-research", "Quantitative Research"],
                ["qualitative-research", "Qualitative Research"],
                ["data-processing-and-analytics", "Data Processing & Analytics"],
                ["online-data-collection", "Online Data Collection"],
                ["offline-data-collection", "Offline Data Collection"],
                ["cati", "CATI \u2014 Computer-Assisted Telephone Interviewing"],
                ["consumer-panel", "Consumer Panel"],
                ["business-panel", "Business Panel"],
                ["healthcare-panel", "Healthcare Panel"],
              ].map(([s, t]) => (
                <li key={s}>
                  <RPT_L to={`/services/market-research/${s}`}>{t}</RPT_L>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-form">
            <Form type={SERVICE_FORM_KEY[a.slug]} service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { RC_Head, RPT_Page };
