import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { CtaSection, EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_INDUSTRIES } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';

const RDC_CONFIG = {
  team: [
    {
      role: "Research Director",
      name: "",
      photo: "",
      url: "",
    },
    {
      role: "Research Consultant",
      name: "",
      photo: "",
      url: "",
    },
    {
      role: "Sampling / Fieldwork Manager",
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
const RDC_ST = [
  {
    k: "Understand",
    t: "Understand & Discover",
    h: "Start With the Business Question",
    ic: "search",
    c: "#0B22A8",
    d: "We begin by understanding the business challenge, strategic priorities, market environment and decisions the research needs to support.",
    o: "A clearly defined research problem and focused direction for the study.",
    line: "Clarify the decision the research must support.",
  },
  {
    k: "Define",
    t: "Define the Research Framework",
    h: "Build the Right Research Roadmap",
    ic: "blueprint",
    c: "#1E5BFF",
    d: "The business question is converted into a structured framework: scope, objectives, audience, sample, geography, timeline, data sources and measures.",
    o: "A structured roadmap that keeps the research focused and measurable.",
    line: "Turn the question into scope, objectives and measures.",
  },
  {
    k: "Design",
    t: "Design the Methodology",
    h: "Choose the Right Approach",
    ic: "sliders",
    c: "#0E8A8A",
    d: "Qualitative, quantitative or mixed methods are chosen around what needs to be explored, measured or validated, along with the right audience and mode.",
    o: "A research design built around the questions that matter.",
    line: "Match the method to what must be explored or measured.",
  },
  {
    k: "Execute",
    t: "Execute & Manage Fieldwork",
    h: "Turn Research Design Into Action",
    ic: "users",
    c: "#2F855A",
    d: "Respondents are recruited, screened and interviewed while samples, quotas and quality are monitored throughout fieldwork.",
    o: "Reliable research data collected from the right audiences through the appropriate methodology.",
    line: "Recruit, interview and monitor quotas with discipline.",
  },
  {
    k: "Analyse",
    t: "Process, Analyse & Interpret",
    h: "Transform Data Into Meaning",
    ic: "bars",
    c: "#5A3FE0",
    d: "Data is cleaned, structured and analysed, then interpreted to reveal patterns, drivers, barriers and opportunities.",
    o: "Structured evidence that moves beyond numbers to reveal what the findings mean.",
    line: "Clean, structure and interpret the evidence.",
  },
  {
    k: "Validate",
    t: "Review & Validate",
    h: "Quality Before Conclusions",
    ic: "shield",
    c: "#2F855A",
    d: "Data, sample, quotas, methodology and limitations are reviewed before conclusions are drawn.",
    o: "Findings that are clear, consistent, credible and ready for decision-making.",
    line: "Check data, sample and method before concluding.",
  },
  {
    k: "Recommend",
    t: "Report & Recommend",
    h: "Deliver Insights That Drive Decisions",
    ic: "flag",
    c: "#C99A2E",
    d: "Evidence becomes findings, insights, implications and recommendations, delivered in formats stakeholders can use.",
    o: "Actionable intelligence that helps stakeholders understand markets, identify opportunities and make better-informed decisions.",
    line: "Connect findings to implications and next steps.",
  },
];
function RDC_Wheel({ big, active, onPick }) {
  const cx = 250,
    cy = 250,
    R = big ? 190 : 180;
  const pos = (i) => {
    const a = ((-90 + i * (360 / 7)) * Math.PI) / 180;
    return [cx + R * Math.cos(a), cy + R * Math.sin(a)];
  };
  const arcP = (i) => {
    const a1 = ((-90 + i * (360 / 7) + 12) * Math.PI) / 180,
      a2 = ((-90 + (i + 1) * (360 / 7) - 12) * Math.PI) / 180;
    return `M${cx + R * Math.cos(a1)} ${cy + R * Math.sin(a1)} A${R} ${R} 0 0 1 ${cx + R * Math.cos(a2)} ${cy + R * Math.sin(a2)}`;
  };
  return (
    <svg
      viewBox="-20 -20 540 540"
      className={"rdc-wheel" + (big ? " rdc-wheel--big" : "")}
      role={big ? "group" : "img"}
      aria-label="Seven-stage research design cycle around the business question, looping back through learn and refine"
    >
      <defs>
        <marker
          id={"rdcA" + (big ? "b" : "s")}
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M0 0L10 5L0 10z" className="rdc-wheel__ah" />
        </marker>
      </defs>
      <circle cx={cx} cy={cy} r={R + 36} className="rdc-wheel__outer" />
      {RDC_ST.map(
        (_, i) =>
          i < 6 && (
            <path key={"a" + i} d={arcP(i)} className="rdc-wheel__arc" markerEnd={`url(#rdcA${big ? "b" : "s"})`} />
          ),
      )}
      <path d={arcP(6)} className="rdc-wheel__arc rdc-wheel__arc--loop" markerEnd={`url(#rdcA${big ? "b" : "s"})`} />
      {(() => {
        const a = ((-90 + 6.5 * (360 / 7)) * Math.PI) / 180;
        const x = cx + (R + 58) * Math.cos(a),
          y = cy + (R + 58) * Math.sin(a);
        return (
          <g className="rdc-wheel__learn">
            <rect x={x - 62} y={y - 15} width="124" height="30" rx="15" />
            <text x={x} y={y + 5} textAnchor="middle">
              LEARN & REFINE
            </text>
          </g>
        );
      })()}
      <circle r="4" className="rdc-wheel__pkt">
        {ee.createElement("animateMotion", {
          dur: "14s",
          repeatCount: "indefinite",
          path: `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`,
        })}
      </circle>
      {RDC_ST.map((s, i) => {
        const [x, y] = pos(i);
        return (
          <line
            key={"s" + i}
            x1={cx}
            y1={cy}
            x2={x}
            y2={y}
            className={"rdc-wheel__spoke" + (active === i ? " is-on" : "")}
            style={{
              "--c": s.c,
            }}
          />
        );
      })}
      {RDC_ST.map((s, i) => {
        const [x, y] = pos(i);
        const props = big
          ? {
              tabIndex: 0,
              role: "button",
              "aria-pressed": active === i,
              "aria-label": `Stage ${i + 1}: ${s.t}`,
              onClick: () => onPick(i),
              onKeyDown: (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onPick(i);
                }
              },
            }
          : {};
        return (
          <g
            key={s.k}
            className={"rdc-wheel__node" + (active === i ? " is-on" : "")}
            style={{
              "--c": s.c,
              "--i": i,
            }}
            {...props}
          >
            <circle cx={x} cy={y} r={big ? 40 : 34} />
            <text x={x} y={y - 3} textAnchor="middle" className="rdc-wheel__n">
              0{i + 1}
            </text>
            <text x={x} y={y + 13} textAnchor="middle" className="rdc-wheel__k">
              {s.k}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={big ? 92 : 84} className="rdc-wheel__core" />
      <circle cx={cx} cy={cy} r={big ? 92 : 84} className="rdc-wheel__pulse" />
      <text x={cx} y={cy - 4} textAnchor="middle" className="rdc-wheel__ct">
        BUSINESS
      </text>
      <text x={cx} y={cy + 16} textAnchor="middle" className="rdc-wheel__ct">
        QUESTION
      </text>
    </svg>
  );
}
function RDC_Cycle() {
  const [a, setA] = ee.useState(0);
  const s = RDC_ST[a];
  return (
    <div className="rdc-cyc">
      <div className="rdc-cyc__wheel">
        <RDC_Wheel big active={a} onPick={setA} />
      </div>
      <div
        className="rdc-cyc__panel"
        key={a}
        style={{
          "--c": s.c,
        }}
        aria-live="polite"
      >
        <span className="rdc-cyc__n">
          Stage 0{a + 1}
          {" of 07"}
        </span>
        <h3>
          <RC_I n={s.ic} s={22} />
          {s.t}
        </h3>
        <p>{s.d}</p>
        <div className="rdc-out">
          <span>Outcome</span>
          {s.o}
        </div>
        <div className="rdc-cyc__nav">
          <button onClick={() => setA((a + 6) % 7)} aria-label="Previous stage">
            ←
          </button>
          <a href={"#rdc-s" + (a + 1)} onClick={rcScrollTo("rdc-s" + (a + 1))} className="rc-link">
            Read stage 0{a + 1}
            {" in detail "}
            <RC_I n="arrow" s={14} />
          </a>
          <button onClick={() => setA((a + 1) % 7)} aria-label="Next stage">
            →
          </button>
        </div>
      </div>
      <ol className="rdc-cyc__mob">
        {RDC_ST.map((x, i) => (
          <li
            key={x.k}
            className={a === i ? "is-on" : ""}
            style={{
              "--c": x.c,
            }}
          >
            <button onClick={() => setA(i)} aria-expanded={a === i}>
              <span>0{i + 1}</span>
              {x.t}
            </button>
            {a === i && (
              <div>
                <p>{x.d}</p>
                <div className="rdc-out">
                  <span>Outcome</span>
                  {x.o}
                </div>
              </div>
            )}
          </li>
        ))}
        <li className="rdc-cyc__loop">
          <RC_I n="loop" s={16} />
          Learn → refine → ask the next question
        </li>
      </ol>
    </div>
  );
}
function RDC_Stage({ i, children, flip }) {
  const s = RDC_ST[i];
  return (
    <section
      className={"rdc-stage" + (flip ? " rdc-stage--flip" : "")}
      id={"rdc-s" + (i + 1)}
      style={{
        "--c": s.c,
      }}
    >
      <div className="container">
        <div className="rdc-stage__head">
          <span className="rdc-stage__num">0{i + 1}</span>
          <div>
            <span className="rdc-stage__k">{s.t}</span>
            <h2>{s.h}</h2>
            <p>{s.d}</p>
          </div>
        </div>
        {children}
        <div className="rdc-out rdc-out--wide">
          <span>Outcome</span>
          {s.o}
        </div>
      </div>
    </section>
  );
}
function RDC_Funnel({ steps }) {
  const [ref, v] = RC_useInView(0.3);
  return (
    <ol ref={ref} className={"rdc-chain" + (v ? " is-in" : "")}>
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
function RDC_Tree() {
  const [b, setB] = ee.useState(1);
  const br = [
    [
      "Explore",
      "Qualitative research",
      "Motivations, perceptions, language and context.",
      ["IDIs", "FGDs", "Specialist recruitment"],
      "qualitative-research",
    ],
    [
      "Measure",
      "Quantitative research",
      "Sizing, comparing, tracking and testing.",
      ["Online surveys", "CATI", "CAPI", "Face-to-face"],
      "quantitative-research",
    ],
    [
      "Explore + Measure",
      "Mixed methods",
      "Explore first, then measure and validate.",
      ["Qual then quant", "Multi-market research", "Professional recruitment"],
      null,
    ],
  ];
  return (
    <div className="rdc-tree">
      <div className="rdc-tree__root">
        <RC_I n="help" s={18} />
        What do we need to understand?
      </div>
      <svg className="rdc-tree__lines" viewBox="0 0 600 50" preserveAspectRatio="none" aria-hidden="true">
        <path d="M300 0V18M100 18H500M100 18V50M300 18V50M500 18V50" />
      </svg>
      <div className="rdc-tree__br" role="tablist" aria-label="Research need">
        {br.map(([k, t, d, ms, link], i) => (
          <button
            key={k}
            role="tab"
            aria-selected={b === i}
            className={"rdc-tree__b" + (b === i ? " is-on" : "")}
            onClick={() => setB(i)}
            onMouseEnter={() => setB(i)}
          >
            <span className="rdc-tree__k">{k}</span>
            <strong>{t}</strong>
            <span className="rdc-tree__d">{d}</span>
          </button>
        ))}
      </div>
      <div className="rdc-tree__out" key={b}>
        <span>Typical approaches</span>
        <ul>
          {br[b][3].map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>
        {br[b][4] && (
          <Link to={`/services/market-research/${br[b][4]}`} className="rc-link">
            {"Explore "}
            {br[b][1].toLowerCase()} <RC_I n="arrow" s={14} />
          </Link>
        )}
      </div>
    </div>
  );
}
const RDC_FLOW = [
  [
    "What is the business question?",
    ["Explore \u2192 Qualitative", "Measure \u2192 Quantitative", "Both \u2192 Mixed methods"],
  ],
  [
    "Who do we need to speak to?",
    ["Consumers", "Businesses", "Healthcare professionals", "Patients / caregivers", "Specialists", "Custom audiences"],
  ],
  ["Where?", ["Single market", "Multi-market", "Global"]],
  ["How?", ["Online", "Telephone", "Face-to-face", "Qualitative", "Hybrid"]],
];
function RDC_Flow() {
  const [pick, setPick] = ee.useState([0, 0, 1, 0]);
  const set = (q, i) => setPick((p) => p.map((x, j) => (j === q ? i : x)));
  return (
    <div className="rdc-flow">
      <div className="rdc-flow__cols">
        {RDC_FLOW.map(([q, opts], qi) => (
          <div key={q} className="rdc-flow__col">
            <span className="rdc-flow__step">
              {"Step "}
              {qi + 1}
            </span>
            <strong>{q}</strong>
            <div role="radiogroup" aria-label={q}>
              {opts.map((o, oi) => (
                <button
                  key={o}
                  role="radio"
                  aria-checked={pick[qi] === oi}
                  className={pick[qi] === oi ? "is-on" : ""}
                  onClick={() => set(qi, oi)}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="rdc-flow__res" aria-live="polite">
        <RC_I n="blueprint" s={20} />
        <span>
          {"Your outline design: "}
          <b>{RDC_FLOW[0][1][pick[0]].split("\u2192").pop().trim()}</b>
          {" research with "}
          <b>{RDC_FLOW[1][1][pick[1]].toLowerCase()}</b>
          {", "}
          <b>{RDC_FLOW[2][1][pick[2]].toLowerCase()}</b>
          {", conducted "}
          <b>{RDC_FLOW[3][1][pick[3]].toLowerCase()}</b>.
        </span>
        <Link to="/lets-talk?type=quote" className="btn btn--primary">
          Discuss this design
        </Link>
      </div>
    </div>
  );
}
function RDC_Monitor() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rdc-mon" + (v ? " is-in" : "")}>
      <div className="rdc-mon__top">
        <span className="rdc-mon__live">
          <i />
          Fieldwork monitor
        </span>
        {null}
      </div>
      <div className="rdc-mon__grid">
        <div className="rdc-mon__card">
          <span>Quota progress</span>
          {["Quota A", "Quota B", "Quota C", "Quota D"].map((q, i) => (
            <div key={q} className="rdc-mon__bar">
              <em>{q}</em>
              <b
                style={{
                  "--w": [86, 64, 72, 40][i] + "%",
                }}
              />
            </div>
          ))}
        </div>
        <div className="rdc-mon__card">
          <span>Completes over time</span>
          <svg viewBox="0 0 200 90" aria-hidden="true">
            <path d="M0 85 C30 80 50 66 80 56 S130 30 160 22 S190 12 200 10" className="rdc-mon__line" />
          </svg>
        </div>
        <div className="rdc-mon__card">
          <span>Quality checks</span>
          <ul>
            {["Respondent validation", "Speed & attention", "Open-end review"].map((t) => (
              <li key={t}>
                <RC_I n="okc" s={14} />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
function RDC_Ladder() {
  const [ref, v] = RC_useInView(0.3);
  const st = [
    ["DATA", "What happened?", "database"],
    ["FINDING", "What does the evidence show?", "search"],
    ["INSIGHT", "Why does it matter?", "bulb"],
    ["RECOMMENDATION", "What could the business consider doing next?", "flag"],
  ];
  return (
    <ol ref={ref} className={"rdc-lad" + (v ? " is-in" : "")}>
      {st.map(([t, q, ic], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span className="rdc-lad__ic">
            <RC_I n={ic} s={22} />
          </span>
          <strong>{t}</strong>
          <p>{q}</p>
        </li>
      ))}
    </ol>
  );
}
function RDC_Gate() {
  const [ref, v] = RC_useInView(0.3);
  const st = [
    "Data verification",
    "Logic checks",
    "Sample validation",
    "Quota review",
    "Methodology review",
    "Limitations / bias review",
    "Internal deliverable review",
  ];
  return (
    <div ref={ref} className={"rdc-gate" + (v ? " is-in" : "")}>
      <ol>
        {st.map((t, i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span>
              <RC_I n="check" s={14} />
            </span>
            {t}
          </li>
        ))}
      </ol>
      <div className="rdc-gate__shield">
        <RC_I n="shield" s={54} />
        <strong>Ready for conclusions</strong>
        <span>Validation happens before findings are finalised. Limitations are stated, not hidden.</span>
      </div>
    </div>
  );
}
function RDC_QQ() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rdc-qq" + (v ? " is-in" : "")}>
      <div className="rdc-qq__side rdc-qq__side--q">
        <div className="rdc-qq__h">
          <span>Quantitative</span>
          <em>Charts · tables · cross-tabs · statistics · trends</em>
        </div>
        <div className="rdc-qq__vis">
          <svg viewBox="0 0 220 120" aria-hidden="true">
            {[70, 46, 88, 58, 34].map((h, i) => (
              <rect
                key={i}
                x={12 + i * 42}
                y={110 - h}
                width="26"
                height={h}
                rx="4"
                className="rdc-qq__bar"
                style={{
                  "--i": i,
                }}
              />
            ))}
            <path d="M10 70 C50 60 80 40 120 44 S190 20 215 14" className="rdc-qq__tl" />
          </svg>
          <table className="rdc-qq__xt" aria-hidden="true">
            <thead>
              <tr>
                <th />
                <th>Seg A</th>
                <th>Seg B</th>
                <th>Seg C</th>
              </tr>
            </thead>
            <tbody>
              {["Row 1", "Row 2", "Row 3"].map((r) => (
                <tr key={r}>
                  <th>{r}</th>
                  {[0, 1, 2].map((c) => (
                    <td key={c}>
                      <i
                        style={{
                          "--w": 30 + ((r.length * 13 + c * 29) % 60) + "%",
                        }}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="rdc-qq__side rdc-qq__side--l">
        <div className="rdc-qq__h">
          <span>Qualitative</span>
          <em>Themes · quotes · patterns · motivations · barriers</em>
        </div>
        <div className="rdc-qq__vis">
          <div className="rdc-qq__themes">
            {[
              ["Motivation", 3],
              ["Barrier", 2],
              ["Trust", 2],
              ["Habit", 1],
              ["Price", 2],
              ["Experience", 3],
            ].map(([t, w]) => (
              <span
                key={t}
                style={{
                  "--s": w,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <blockquote className="rdc-qq__quote">
            <span>Quote card</span>Verbatim respondent comments sit here, grouped under the themes they support.
          </blockquote>
        </div>
      </div>
      {null}
    </div>
  );
}
function RDC_Loop() {
  const steps = ["Understand", "Define", "Design", "Execute", "Analyse", "Validate", "Recommend", "Learn"];
  const cx = 300,
    cy = 300,
    R = 220;
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"rdc-loop" + (v ? " is-in" : "")}>
      <svg
        viewBox="0 0 600 600"
        role="img"
        aria-label="Continuous loop: understand, define, design, execute, analyse, validate, recommend, learn, then new business questions"
      >
        <circle cx={cx} cy={cy} r={R} className="rdc-loop__track" />
        <circle cx={cx} cy={cy} r={R} className="rdc-loop__draw" pathLength="1" transform={`rotate(-90 ${cx} ${cy})`} />
        {[0, 1, 2].map((k) => (
          <circle key={k} r={k ? 3 : 5} className="rdc-loop__pkt">
            {ee.createElement("animateMotion", {
              dur: "12s",
              begin: k * 4 + "s",
              repeatCount: "indefinite",
              path: `M${cx} ${cy - R} A${R} ${R} 0 1 1 ${cx - 0.1} ${cy - R}`,
            })}
          </circle>
        ))}
        {steps.map((t, i) => {
          const a = ((-90 + i * 45) * Math.PI) / 180,
            x = cx + R * Math.cos(a),
            y = cy + R * Math.sin(a);
          const last = i === 7;
          return (
            <g
              key={t}
              className={"rdc-loop__node" + (last ? " is-learn" : "")}
              style={{
                "--i": i,
              }}
            >
              <circle cx={x} cy={y} r={last ? 46 : 44} />
              <text x={x} y={y + 5} textAnchor="middle">
                {t}
              </text>
            </g>
          );
        })}
        <g className="rdc-loop__core">
          <circle cx={cx} cy={cy} r="104" />
          <text x={cx} y={cy - 12} textAnchor="middle" className="rdc-loop__ck">
            LEADS TO
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle">
            New business
          </text>
          <text x={cx} y={cy + 38} textAnchor="middle">
            questions
          </text>
        </g>
      </svg>
    </div>
  );
}
function RDC_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm,
    Cta = CtaSection;
  const [active, setActive] = ee.useState("rdc-intro");
  const [moreInd, setMoreInd] = ee.useState(false);
  const nav = [
    ["rdc-intro", "Overview"],
    ["rdc-cycle", "The cycle"],
    ["rdc-s1", "Stages"],
    ["rdc-method", "Methodology"],
    ["rdc-quality", "Quality"],
    ["rdc-loopsec", "Learning loop"],
    ["rdc-why", "Why us"],
    ["rdc-faq", "FAQ"],
    ["rdc-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is research design?",
      a: "Research design is the plan that connects a business question to the evidence needed to answer it: the objectives, audience, sample, methodology, data collection and analysis approach.",
    },
    {
      q: "Why is research design important?",
      a: "Most research problems start before fieldwork. A clear design keeps objectives, sample, methodology and analysis aligned, so the findings can support a real decision.",
    },
    {
      q: "What does a research design process include?",
      a: "Our research design cycle has seven stages: understand, define the framework, design the methodology, execute fieldwork, analyse, validate and recommend, with learning that feeds the next question.",
    },
    {
      q: "How do you choose between qualitative and quantitative research?",
      a: "Qualitative research suits exploring motivations, perceptions and language; quantitative research suits measuring, comparing and sizing. Many projects combine both in a mixed-method design.",
    },
    {
      q: "What is the difference between research design and research methodology?",
      a: "Research design is the overall plan for answering the question. Research methodology is the set of methods used within that plan, such as surveys, interviews or focus groups.",
    },
    {
      q: "How does Frequent Research manage research quality?",
      a: "Quality is built in at every stage: clear objectives in design, relevant audiences in sampling, monitoring during fieldwork, cleaning and validation of data, consistency checks in analysis and internal review before delivery.",
    },
    {
      q: "Can Frequent Research conduct multi-market research?",
      a: "Yes. We design and run single-market and multi-market studies across 55+ markets, with consistent screening and quality controls.",
    },
    {
      q: "Can you design a research methodology around a specific business question?",
      a: "Yes. Every design starts from the decision you need to make, and the methodology, audience and sample are chosen to answer it.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/research-design-cycle";
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
    const title = "Research Design & Methodology | Frequent Research";
    const desc =
      "Our research design cycle connects business questions to qualitative and quantitative methodology, fieldwork, analysis, validation and actionable insights.";
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
          ["Research Design Cycle", "/services/market-research/research-design-cycle"],
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
        name: "Research Design Cycle",
        serviceType: "Market research design and methodology",
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
    <div className="rdc rc">
      <section className="rdc-hero">
        <div className="container rdc-hero__in">
          <div className="rdc-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="rdc-eyebrow">
              <RC_I n="loop" s={15} />
              Research design & methodology
            </span>
            <HeroH1>Research Design Cycle</HeroH1>
            <p className="rdc-hero__sub">From Business Questions to Actionable Intelligence</p>
            <p className="rdc-hero__body">
              At Frequent Research, we follow a structured, insight-driven research design framework that connects
              business questions to rigorous methodology, reliable evidence and actionable recommendations.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg rdc-btn" href="#rdc-enquire" onClick={rcScrollTo("rdc-enquire")}>
                Discuss Your Research Requirement
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk">
                Talk to a Research Expert
              </Link>
            </div>
          </div>
          <div className="rdc-hero__viz">
            <RDC_Wheel active={-1} />
          </div>
        </div>
        <div className="container">
          <ol className="rdc-strip">
            {RDC_ST.map((s, i) => (
              <li
                key={s.k}
                tabIndex="0"
                style={{
                  "--c": s.c,
                }}
              >
                <span className="rdc-strip__n">0{i + 1}</span>
                <span className="rdc-strip__ic">
                  <RC_I n={s.ic} s={17} />
                </span>
                <strong>{s.k}</strong>
                <span className="rdc-strip__d">{s.line}</span>
              </li>
            ))}
          </ol>
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
      <section className="rc-sec" id="rdc-intro">
        <div className="container rdc-intro">
          <div>
            <RC_Head kicker="Research design" title="A Structured Approach to Better Research" />
            <p className="rdc-lead">Research quality is shaped long before the final report is produced.</p>
            <p className="od-muted">
              Strong research design begins with a clearly defined business question, continues through appropriate
              research methodology and disciplined execution, and ends with findings that can support real decisions.
            </p>
            <p className="od-muted">
              {
                "Frequent Research connects each stage of the market research process so that objectives, methodology, sample, fieldwork, analysis and recommendations remain aligned. If you need help framing the question itself, start with "
              }
              {svc("research-consultancy", "research consultancy")}.
            </p>
          </div>
          <div
            className="rdc-arch"
            role="img"
            aria-label="Research project architecture from business objective to recommendations"
          >
            <span className="rdc-arch__k">Research project architecture</span>
            <ol>
              {[
                "Business objective",
                "Research objectives",
                "Research questions",
                "Methodology",
                "Sample",
                "Fieldwork",
                "Data",
                "Analysis",
                "Insights",
                "Recommendations",
              ].map((t, i) => (
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
            <span className="rdc-arch__note">Each layer is shaped by the one above it.</span>
          </div>
        </div>
      </section>
      <section className="rc-sec rdc-sec--navy" id="rdc-cycle">
        <div className="container">
          <RC_Head
            light
            center
            kicker="The centrepiece"
            title="Our Research Design Cycle"
            intro="Seven connected stages around one business question. Select a stage to see what happens and what it delivers."
          />
          <RDC_Cycle />
        </div>
      </section>
      <RDC_Stage i={0}>
        <div className="rdc-s1">
          <ul className="rdc-icons">
            {[
              ["target", "Business objectives"],
              ["alert", "Business challenges"],
              ["factory", "Industry dynamics"],
              ["globe", "Market environment"],
              ["scale", "Competitive landscape"],
              ["users", "Target audiences"],
              ["file", "Existing knowledge"],
              ["eyeoff", "Information gaps"],
              ["trend", "Business opportunities"],
            ].map(([ic, t]) => (
              <li key={t}>
                <RC_I n={ic} s={18} />
                {t}
              </li>
            ))}
          </ul>
          <RDC_Funnel steps={["Question", "Context", "Information gap", "Research direction"]} />
        </div>
      </RDC_Stage>
      <RDC_Stage i={1} flip>
        <div
          className="rdc-bp"
          role="img"
          aria-label="Research blueprint with scope, objectives, audience, sample, geography, timeline, data sources and measures"
        >
          <div className="rdc-bp__sheet">
            <span className="rdc-bp__title">Research blueprint</span>
            <div className="rdc-bp__grid">
              {[
                "Research scope",
                "Objectives",
                "Audience",
                "Sample",
                "Geography",
                "Timeline",
                "Data sources",
                "Measures",
              ].map((t, i) => (
                <div
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <i />
                  {t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </RDC_Stage>
      <div id="rdc-method">
        <RDC_Stage i={2}>
          <RDC_Tree />
          <div className="rdc-mx">
            <div className="rdc-mx__r rdc-mx__r--h">
              <span>Research need</span>
              <span>Potential approach</span>
            </div>
            {[
              ["Explore motivations", "Qualitative"],
              ["Measure attitudes", "Quantitative"],
              ["Understand behaviour", "Qualitative / Quantitative"],
              ["Validate hypotheses", "Quantitative"],
              ["Explore + validate", "Mixed methods"],
              ["Multi-market comparison", "Quantitative / Mixed methods"],
            ].map(([nd, ap]) => (
              <div key={nd} className="rdc-mx__r">
                <span>{nd}</span>
                <span>{ap}</span>
              </div>
            ))}
          </div>
          <p className="rdc-note">
            These are common starting points, not the only options. The final design depends on the question, audience
            and constraints.
          </p>
        </RDC_Stage>
        <section className="rc-sec rdc-sec--soft">
          <div className="container">
            <RC_Head
              kicker="Interactive"
              title="Research Design Decision Tree"
              intro="Answer four questions to sketch the outline of a study. Our team then refines it with you."
            />
            <RDC_Flow />
          </div>
        </section>
      </div>
      <RDC_Stage i={3} flip>
        <div className="rdc-s4">
          <div>
            <RDC_Funnel
              steps={["Sample", "Recruit", "Screen", "Interview", "Monitor", "Manage quotas", "Complete fieldwork"]}
            />
            <ul className="rdc-ticks">
              {[
                "Respondent recruitment",
                "Survey programming",
                "Interviewing",
                "Fieldwork management",
                "Sample monitoring",
                "Quota management",
                "Respondent validation",
                "Ethical research practices",
                "Transparent communication",
                "Project management",
              ].map((t) => (
                <li key={t}>
                  <RC_I n="check" s={14} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="rdc-note">
              {"Fieldwork runs through our "}
              {svc("online-data-collection", "online data collection")}
              {" and "}
              {svc("offline-data-collection", "offline data collection")}
              {" teams, using our "}
              {svc("consumer-panel", "consumer")}
              {", "}
              {svc("business-panel", "business")}
              {" and "}
              {svc("healthcare-panel", "healthcare")}
              {" panels."}
            </p>
          </div>
          <RDC_Monitor />
        </div>
      </RDC_Stage>
      <RDC_Stage i={4}>
        <RDC_Funnel steps={["Raw data", "Clean", "Structure", "Analyse", "Interpret", "Insight"]} />
        <ul className="rdc-icons rdc-icons--sm">
          {[
            "Patterns",
            "Trends",
            "Audience differences",
            "Behavioural insights",
            "Market dynamics",
            "Drivers",
            "Barriers",
            "Opportunities",
            "Relationships within data",
          ].map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <RDC_QQ />
      </RDC_Stage>
      <section className="rc-sec rdc-sec--soft">
        <div className="container">
          <RC_Head
            center
            kicker="Beyond raw data"
            title="Data, Findings, Insights and Recommendations"
            intro="The difference between receiving data and receiving intelligence."
          />
          <RDC_Ladder />
          <p className="rdc-note rdc-note--c">
            Recommendations are evidence-based options for the business to consider; they inform decisions rather than
            guarantee outcomes.
          </p>
        </div>
      </section>
      <div id="rdc-quality">
        <RDC_Stage i={5} flip>
          <RDC_Gate />
        </RDC_Stage>
      </div>
      <RDC_Stage i={6}>
        <RDC_Funnel steps={["Evidence", "Finding", "Insight", "Implication", "Recommendation", "Action"]} />
        <div className="rdc-del">
          {[
            ["file", "Executive Summary", "Key findings and implications."],
            ["blueprint", "Research Report", "Detailed evidence and interpretation."],
            ["grid", "Data Tables", "Structured quantitative results."],
            ["monitor", "Dashboards", "Interactive exploration where appropriate."],
            ["pie", "Visualizations", "Charts and research storytelling."],
            ["flag", "Strategic Recommendations", "Action-oriented observations."],
          ].map(([ic, t, d], i) => (
            <RC_Reveal
              key={t}
              className="rdc-del__card hcard"
              style={{
                "--i": i % 3,
              }}
            >
              <RC_I n={ic} s={20} />
              <strong>{t}</strong>
              <span>{d}</span>
            </RC_Reveal>
          ))}
        </div>
        <p className="rdc-note">
          {"See "}
          {svc("data-processing-and-analytics", "data processing & analytics")}
          {" and "}
          {svc("reporting-and-insights", "reporting & insights")}
          {" for more on deliverables."}
        </p>
      </RDC_Stage>
      <section className="rc-sec rdc-sec--navy">
        <div className="container rdc-qf">
          <div>
            <RC_Head
              light
              kicker="Quality framework"
              title="Quality Is Built Into Every Stage"
              intro="Quality control is not a final step after fieldwork. It starts with the objectives and continues into learning for the next study."
            />
          </div>
          <ol className="rdc-qf__ring">
            {[
              ["DESIGN", "Clear objectives"],
              ["SAMPLE", "Relevant audiences"],
              ["FIELDWORK", "Monitoring"],
              ["DATA", "Cleaning & validation"],
              ["ANALYSIS", "Consistency checks"],
              ["DELIVERY", "Internal review"],
              ["LEARNING", "Continuous improvement"],
            ].map(([t, d], i) => (
              <li
                key={t}
                style={{
                  "--a": i * (360 / 7) + "deg",
                  "--i": i,
                }}
              >
                <strong>{t}</strong>
                <span>{d}</span>
              </li>
            ))}
            <li className="rdc-qf__core" aria-hidden="true">
              <RC_I n="shield" s={34} />
            </li>
          </ol>
        </div>
      </section>
      <section className="rdc-mid">
        <div className="container rdc-mid__in">
          <div>
            <strong>Not sure which methodology fits?</strong>
            <span>
              Share the decision you are facing. We will suggest a research design and the evidence it would produce.
            </span>
          </div>
          <Link to="/lets-talk" className="btn btn--light btn--lg">
            Talk to a Research Expert
          </Link>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head
            kicker="Research methods"
            title="Choosing the Right Research Approach"
            intro="No single method is better in every case. Each answers a different kind of question."
          />
          <div className="rdc-sel">
            {[
              [
                "msg",
                "Qualitative Research",
                "Best suited to exploring",
                ["Motivations", "Perceptions", "Experiences", "Needs", "Language", "Barriers", "Behavioural context"],
                "qualitative-research",
              ],
              [
                "bars",
                "Quantitative Research",
                "Best suited to",
                ["Measuring", "Comparing", "Sizing", "Tracking", "Testing", "Validating"],
                "quantitative-research",
              ],
              [
                "layers",
                "Mixed-Method Research",
                "Combines",
                ["Exploration", "Measurement", "Validation", "Context"],
                "research-consultancy",
              ],
            ].map(([ic, t, l, xs, s], i) => (
              <RC_Reveal
                key={t}
                className={"rdc-sel__card rdc-sel__card" + i}
                style={{
                  "--i": i,
                }}
              >
                <span className="rdc-sel__ic">
                  <RC_I n={ic} s={24} />
                </span>
                <h3>{t}</h3>
                <span className="rdc-sel__l">{l}</span>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <Link to={`/services/market-research/${s}`} className="rc-link">
                  {"Explore Research Methodologies "}
                  <RC_I n="arrow" s={14} />
                </Link>
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec rdc-sec--loop" id="rdc-loopsec">
        <div className="container rdc-loopwrap">
          <div>
            <RC_Head kicker="Continuous learning" title="Research Is Not Just a Linear Process" />
            <p className="rdc-lead">Every study ends by opening the next question.</p>
            <p className="od-muted">
              Insights from one study can inform future research questions, refine audience understanding, reveal new
              opportunities and shape subsequent decisions. That is why we treat research design as a cycle: what we
              learn feeds straight back into the next business question.
            </p>
          </div>
          <RDC_Loop />
        </div>
      </section>
      <section className="rc-sec rdc-sec--soft" id="rdc-why">
        <div className="container">
          <RC_Head kicker="Why us" title="Why Clients Choose Frequent Research for Research Design" />
          <div className="rdc-why">
            {[
              [
                "target",
                "Business-Led Research Design",
                "Research begins with the decision the client needs to support.",
              ],
              ["layers", "Integrated Methodology", "Qualitative, quantitative and mixed-method approaches."],
              [
                "users",
                "Audience & Sampling Expertise",
                "Research designed around the right target audience and sample requirements.",
              ],
              ["shield", "Quality-Focused Execution", "Structured quality checks throughout the research process."],
              ["globe", "Multi-Market Capability", "Support for research across relevant markets."],
              ["flag", "Decision-Oriented Outputs", "Findings presented around implications and actions."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="rdc-why__card hcard"
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
          <div className="rdc-cap">
            {[
              [
                "Research Design",
                "blueprint",
                ["Objective setting", "Research framework", "Methodology design", "Sampling strategy"],
                "research-consultancy",
              ],
              [
                "Data Collection",
                "clipboard",
                ["Online surveys", "CATI", "CAPI", "Face-to-face", "IDIs", "FGDs"],
                "online-data-collection",
              ],
              [
                "Analysis",
                "bars",
                ["Statistical analysis", "Cross-tabulation", "Thematic analysis", "Segmentation", "Trend analysis"],
                "data-processing-and-analytics",
              ],
              [
                "Insights",
                "bulb",
                ["Reporting", "Visualization", "Dashboards", "Strategic interpretation", "Recommendations"],
                "reporting-and-insights",
              ],
            ].map(([t, ic, xs, s]) => (
              <Link key={t} to={`/services/market-research/${s}`} className="rdc-cap__col hcard">
                <span className="rdc-cap__h">
                  <RC_I n={ic} s={18} />
                  {t}
                </span>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                <span className="rdc-cap__go">
                  {"View service "}
                  <RC_I n="arrow" s={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Sectors" title="Research Across Industries" />
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
          <div className="rdc-ex">
            <RC_Head
              kicker="Example engagement"
              title="From Research Question to Business Decision"
              intro="A general framework, not a specific client project."
            />
            <ol>
              {[
                ["Business question", "What does the client need to understand?"],
                ["Research design", "What approach will answer the question?"],
                ["Audience", "Who needs to be researched?"],
                ["Fieldwork", "How will evidence be collected?"],
                ["Analysis", "What patterns emerge?"],
                ["Insight", "What does it mean?"],
                ["Recommendation", "What should the business consider next?"],
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
            <Link to="/industries-case-studies" className="btn btn--ghost">
              Explore Case Studies
            </Link>
          </div>
        </div>
      </section>
      <section className="rc-sec rdc-sec--soft">
        <div className="container">
          <RC_Head kicker="People" title="The Team Behind the Research" />
          <div className="rdc-team">
            {RDC_CONFIG.team.map((m) => {
              const inner = (
                <>
                  <span className="rdc-team__ph">
                    {m.photo ? (
                      <img src={m.photo} alt={m.name} loading="lazy" width="72" height="72" />
                    ) : (
                      <RC_I n="user" s={26} />
                    )}
                  </span>
                  {m.name && <strong>{m.name}</strong>}
                  <span className={m.name ? "rdc-team__role" : "rdc-team__role rdc-team__role--only"}>{m.role}</span>
                </>
              );
              return m.url ? (
                <a key={m.role} href={m.url} className="rdc-team__card hcard">
                  {inner}
                </a>
              ) : (
                <div key={m.role} className="rdc-team__card">
                  {inner}
                </div>
              );
            })}
          </div>
          <div className="rdc-tech">
            <span className="rc-kicker">Technology supporting the research process</span>
            <div className="rc-tech__tiles">
              <Link to="/products" className="rc-tech__tile rc-tech__tile--own">
                <strong>Sampledge</strong>
                <span>Project & sample management</span>
              </Link>
              {["Survey platforms", "SPSS", "Python", "R", "Power BI", "Dashboards & portals"].map((t) => (
                <span key={t} className="rc-tech__tile">
                  <strong>{t}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="rdc-faq">
        <div className="container split">
          <h2 className="split__title">Research design: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec rdc-sec--soft">
        <div className="container">
          <RC_Head kicker="Research insights" title="Research Insights" />
          <div className="rdc-ins">
            {[
              [
                "research-design-cycle-guide",
                "The Research Design Cycle: Seven Steps from Business Question to Actionable Insight",
                true,
              ],
              [
                "qualitative-research-guide",
                "Qualitative Research Explained: In-Depth Interviews, Focus Groups and Finding the \u201CWhy\u201D",
              ],
              [
                "quantitative-research-guide",
                "Quantitative Research: Measuring What Matters with Surveys You Can Rely On",
              ],
              [
                "survey-data-processing-analytics-guide",
                "Survey Data Processing and Analytics: From Raw Responses to Reliable Answers",
              ],
              [
                "research-reporting-insights-guide",
                "Research Reporting and Insights: Turning Data into Decisions People Act On",
              ],
            ].map(([s, t, lead]) => (
              <Link key={s} to={`/blog/${s}`} className={"rdc-ins__card" + (lead ? " is-lead" : "")}>
                <span className="rdc-ins__k">{lead ? "In-depth guide" : "Guide"}</span>
                <strong>{t}</strong>
                <span className="rdc-ins__go">
                  {"Read "}
                  <RC_I n="arrow" s={14} />
                </span>
              </Link>
            ))}
          </div>
          <RC_Head kicker="Related" title="Related research services" />
          <div className="cp-rel__grid">
            {[
              ["research-consultancy", "Research consultancy"],
              ["online-data-collection", "Online data collection"],
              ["offline-data-collection", "Offline data collection"],
              ["consumer-panel", "Consumer panel"],
              ["business-panel", "Business panel"],
              ["healthcare-panel", "Healthcare panel"],
              ["qualitative-research", "Qualitative research"],
              ["quantitative-research", "Quantitative research"],
              ["cati", "CATI telephone interviewing"],
              ["data-processing-and-analytics", "Data processing & analytics"],
              ["reporting-and-insights", "Reporting & insights"],
            ].map(([s, t]) => (
              <Link key={s} to={`/services/market-research/${s}`} className="cp-rel__card hcard">
                <strong>{t}</strong>
                <RC_I n="arrow" s={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="od-cta rdc-cta" id="rdc-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Start with the question</span>
            <h2>Have a Research Question? Let's Design the Right Approach.</h2>
            <p>
              Tell us what you are trying to understand, measure or validate. Our research team can help translate the
              business question into an appropriate research framework and methodology.
            </p>
            <div className="od-hero__ctas">
              <Link className="btn btn--light btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk">
                Talk to a Research Expert
              </Link>
            </div>
            <a className="bp-cta__link" href="#rdc-form" onClick={rcScrollTo("rdc-form")}>
              {"Discuss Your Research Requirement "}
              <RC_I n="arrow" s={14} />
            </a>
          </div>
          <div className="card-form" id="rdc-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
    </div>
  );
}

export { RDC_Page };
