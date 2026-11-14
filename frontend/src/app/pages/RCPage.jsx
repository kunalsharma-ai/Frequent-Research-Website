import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { CtaSection, EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, GuideLink } from './VerticalPage.jsx';
import { SERVICE_INDUSTRIES, serviceFaqs } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { ClientReviews } from './CPPage.jsx';

function RC_Illus() {
  return null;
}
const RC_NODES = ["Market", "Customer", "Competitor", "Product", "Price", "Brand", "Opportunity"];
function RC_HeroNetwork() {
  const cx = 210,
    cy = 250,
    R = 160;
  const angles = [62, 101, 140, 180, 220, 259, 298];
  const pts = angles.map((a) => [cx + R * Math.cos((a * Math.PI) / 180), cy - R * Math.sin((a * Math.PI) / 180)]);
  return (
    <svg
      className="rc-net"
      viewBox="0 0 640 500"
      role="img"
      aria-label="Seven research dimensions feed a business question, which research turns into a strategic decision"
    >
      <defs>
        {ee.createElement(
          "radialGradient",
          {
            id: "rcGlow",
            cx: "50%",
            cy: "50%",
            r: "50%",
          },
          <stop offset="0%" stopColor="#1E6BFF" stopOpacity=".55" />,
          <stop offset="100%" stopColor="#1E6BFF" stopOpacity="0" />,
        )}
        {ee.createElement(
          "linearGradient",
          {
            id: "rcFlow",
            x1: "0",
            x2: "1",
          },
          <stop offset="0%" stopColor="#7FA6FF" />,
          <stop offset="100%" stopColor="#FFFFFF" />,
        )}
      </defs>
      {[R + 34, R - 46, 92].map((r, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="#FFFFFF"
          strokeOpacity={0.07 + i * 0.03}
          strokeDasharray={i === 0 ? "2 6" : "none"}
        />
      ))}
      <circle cx={cx} cy={cy} r="120" fill="url(#rcGlow)" />
      {pts.map(([x, y], i) => (
        <g key={"l" + i}>
          <line x1={x} y1={y} x2={cx} y2={cy} stroke="#9DB6FF" strokeOpacity=".28" />
          <line
            x1={x}
            y1={y}
            x2={cx}
            y2={cy}
            stroke="#FFFFFF"
            strokeOpacity=".85"
            strokeWidth="1.4"
            strokeDasharray="3 18"
            className="rc-flowline"
            style={{
              animationDelay: i * 0.35 + "s",
            }}
          />
        </g>
      ))}
      <path d={`M ${cx + 62} ${cy} L 410 ${cy}`} stroke="#9DB6FF" strokeOpacity=".45" strokeWidth="1.5" />
      <path d={`M 490 ${cy} L 506 ${cy}`} stroke="#9DB6FF" strokeOpacity=".45" strokeWidth="1.5" />
      <circle r="3.5" fill="#fff">
        {ee.createElement("animateMotion", {
          dur: "2.6s",
          repeatCount: "indefinite",
          path: `M ${cx + 62} ${cy} L 410 ${cy}`,
        })}
      </circle>
      <circle r="3" fill="#E3A013">
        {ee.createElement("animateMotion", {
          dur: "2.6s",
          begin: "1.3s",
          repeatCount: "indefinite",
          path: `M ${cx + 62} ${cy} L 506 ${cy}`,
        })}
      </circle>
      {pts.map(([x, y], i) => {
        const w = RC_NODES[i].length * 7.9 + 36;
        return (
          <g
            key={"n" + i}
            className="rc-net__node"
            style={{
              animationDelay: 0.2 + i * 0.08 + "s",
            }}
          >
            <rect
              x={x - w / 2}
              y={y - 15}
              width={w}
              height="30"
              rx="15"
              fill="#0E1A66"
              stroke="#5F82FF"
              strokeOpacity=".7"
            />
            <circle cx={x - w / 2 + 14} cy={y} r="3" fill="#7FA6FF" />
            <text x={x + 7} y={y + 4} textAnchor="middle" className="rc-net__lbl">
              {RC_NODES[i].toUpperCase()}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="62" fill="#0B22A8" stroke="#7FA6FF" strokeWidth="1.5" />
      <circle cx={cx} cy={cy} r="62" fill="none" stroke="#fff" strokeOpacity=".5" className="rc-pulse" />
      <text x={cx} y={cy - 5} textAnchor="middle" className="rc-net__core">
        BUSINESS
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" className="rc-net__core">
        QUESTION
      </text>
      <circle cx="450" cy={cy} r="40" fill="#FFFFFF" fillOpacity=".08" stroke="#9DB6FF" strokeOpacity=".8" />
      <text x="450" y={cy + 4} textAnchor="middle" className="rc-net__mid">
        RESEARCH
      </text>
      <rect x="506" y={cy - 34} width="124" height="68" rx="14" fill="#FFFFFF" />
      <text x="568" y={cy - 6} textAnchor="middle" className="rc-net__dec">
        STRATEGIC
      </text>
      <text x="568" y={cy + 12} textAnchor="middle" className="rc-net__dec">
        DECISION
      </text>
      <rect
        x="506"
        y={cy - 34}
        width="124"
        height="68"
        rx="14"
        fill="none"
        stroke="#E3A013"
        strokeWidth="2"
        className="rc-pulse2"
      />
    </svg>
  );
}
function RC_HeroMobile() {
  return (
    <div className="rc-netm" aria-hidden="true">
      <div className="rc-netm__chips">
        {RC_NODES.map((n) => (
          <span key={n}>{n}</span>
        ))}
      </div>
      <div className="rc-netm__arrow" />
      <div className="rc-netm__core">Business question</div>
      <div className="rc-netm__arrow" />
      <div className="rc-netm__mid">Research</div>
      <div className="rc-netm__arrow" />
      <div className="rc-netm__dec">Strategic decision</div>
    </div>
  );
}
const RC_BREAK = [
  ["help", "Vague objective"],
  ["shuffle", "Wrong methodology"],
  ["userx", "Poor sample"],
  ["clipboard", "Weak fieldwork"],
  ["database", "Unreliable data"],
  ["eyeoff", "Unclear insight"],
  ["down", "Weak decision"],
];
function RC_Breakdown() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-break" + (v ? " is-in" : "")}>
      <div className="rc-break__top">
        <span className="rc-break__title">Where research breaks down</span>
        <span className="rc-break__legend">
          <i />
          {" Confidence in the evidence"}
        </span>
      </div>
      <ol className="rc-break__chain">
        {RC_BREAK.map(([ic, t], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="rc-break__ico">
              <RC_I n={ic} s={20} />
            </span>
            <span className="rc-break__n">0{i + 1}</span>
            <span className="rc-break__t">{t}</span>
            <span className="rc-break__bar">
              <b
                style={{
                  width: 100 - i * 13 + "%",
                }}
              />
            </span>
          </li>
        ))}
      </ol>
      <p className="rc-break__foot">
        Each weak link compounds the next. By the boardroom, the evidence can no longer carry the decision.
      </p>
    </div>
  );
}
const RC_SOL = [
  ["flag", "Decision", "We start from the decision you need to make, not from a questionnaire."],
  ["sliders", "Research", "The right method, the right respondents and quality control at every stage of fieldwork."],
  ["bulb", "Insight", "Findings interpreted in business terms, with the evidence behind each one."],
  ["rocket", "Action", "Clear recommendations you can defend and put into practice."],
];
function RC_Solution() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-sol" + (v ? " is-in" : "")}>
      <div className="rc-sol__track">
        <span />
      </div>
      {RC_SOL.map(([ic, t, d], i) => (
        <div
          className="rc-sol__step"
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span className="rc-sol__dot">
            <RC_I n={ic} s={26} />
          </span>
          <span className="rc-sol__n">Stage 0{i + 1}</span>
          <h3>{t}</h3>
          <p>{d}</p>
        </div>
      ))}
    </div>
  );
}
const RC_FW = [
  {
    k: "Discovery",
    n: "01",
    t: "Discovery & Opportunity Identification",
    ic: "search",
    d: "Map the terrain before committing budget: where the market is moving, what customers need and how competitors are positioned.",
    x: ["Market landscapes", "Consumer needs", "Competitive environments"],
  },
  {
    k: "Innovation",
    n: "02",
    t: "Idea Generation & New Product Development",
    ic: "bulb",
    d: "Turn opportunity into concepts, then test and shape them with the people who will buy them.",
    x: ["Concept testing", "Product refinement", "Innovation validation"],
  },
  {
    k: "Validation",
    n: "03",
    t: "Validation & Optimization",
    ic: "okc",
    d: "Quantify demand and fine-tune the offer so it performs in the market, not just on paper.",
    x: ["Market testing", "Pricing studies", "Segmentation", "Performance evaluation"],
  },
  {
    k: "Strategy",
    n: "04",
    t: "Strategic Advisory & Consultative Support",
    ic: "compass",
    d: "An ongoing partner who connects evidence to the decisions leadership is making.",
    x: ["Ongoing insight partnerships", "Strategic decision-making", "Business transformation"],
  },
];
function RC_Framework() {
  const [a, setA] = ee.useState(0);
  const cx = 200,
    cy = 200,
    ro = 176,
    ri = 84;
  const arc = (i) => {
    const s = (-90 + i * 90 + 2) * (Math.PI / 180),
      e = (-90 + (i + 1) * 90 - 2) * (Math.PI / 180);
    const p = (r, t) => [cx + r * Math.cos(t), cy + r * Math.sin(t)];
    const [x1, y1] = p(ro, s),
      [x2, y2] = p(ro, e),
      [x3, y3] = p(ri, e),
      [x4, y4] = p(ri, s);
    return `M${x1} ${y1} A${ro} ${ro} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${ri} ${ri} 0 0 0 ${x4} ${y4} Z`;
  };
  const lab = (i) => {
    const t = (-45 + i * 90) * (Math.PI / 180);
    return [cx + 130 * Math.cos(t), cy + 130 * Math.sin(t)];
  };
  const f = RC_FW[a];
  return (
    <div className="rc-fw">
      <div className="rc-fw__wheel">
        <svg viewBox="0 0 400 400" role="group" aria-label="Structured research framework">
          <circle
            cx={cx}
            cy={cy}
            r="194"
            fill="none"
            stroke="#1E5BFF"
            strokeOpacity=".25"
            strokeDasharray="3 7"
            className="rc-spin"
          />
          {RC_FW.map((q, i) => {
            const [lx, ly] = lab(i);
            return (
              <g
                key={q.k}
                className={"rc-fw__q" + (a === i ? " is-on" : "")}
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
                <text x={lx} y={ly - 6} textAnchor="middle" className="rc-fw__qn">
                  {q.n}
                </text>
                <text x={lx} y={ly + 12} textAnchor="middle" className="rc-fw__qt">
                  {q.k}
                </text>
              </g>
            );
          })}
          <circle cx={cx} cy={cy} r="72" fill="#07104F" />
          <circle cx={cx} cy={cy} r="72" fill="none" stroke="#1E6BFF" strokeWidth="2" className="rc-pulse" />
          <text x={cx} y={cy - 4} textAnchor="middle" className="rc-fw__core">
            RESEARCH
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" className="rc-fw__core">
            CONSULTANCY
          </text>
        </svg>
      </div>
      <div className="rc-fw__panel" key={a}>
        <div className="rc-fw__tabs" role="tablist">
          {RC_FW.map((q, i) => (
            <button
              key={q.k}
              role="tab"
              aria-selected={a === i}
              className={a === i ? "is-on" : ""}
              onClick={() => setA(i)}
            >
              {q.n} {q.k}
            </button>
          ))}
        </div>
        <span className="rc-fw__num">{f.n}</span>
        <h3>
          <RC_I n={f.ic} s={22} /> {f.t}
        </h3>
        <p>{f.d}</p>
        <span className="rc-fw__lbl">Explore</span>
        <ul>
          {f.x.map((x) => (
            <li key={x}>
              <RC_I n="check" s={16} />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const RC_SVC = [
  {
    id: "advisory",
    ic: "compass",
    t: "Advisory & Consulting Services",
    d: "A senior consultant who sharpens the decision, reviews what you already know and recommends the most efficient route to evidence.",
    x: [
      "Decision and objective framing",
      "Hypotheses and research questions",
      "Review of existing data and research",
      "Study design and method selection",
      "Ongoing insight partnership",
    ],
  },
  {
    id: "brand",
    ic: "award",
    t: "Brand Assessment",
    d: "How your brand is perceived, where it is strong, and where it is losing ground to competitors.",
    x: [
      "Awareness and consideration",
      "Brand image and associations",
      "Messaging resonance",
      "Competitive differentiation",
      "Brand equity drivers",
    ],
  },
  {
    id: "bench",
    ic: "scale",
    t: "Competitive Benchmarking",
    d: "A structured comparison against the competitors that matter, on the dimensions customers care about.",
    x: [
      "Competitor mapping",
      "Customer satisfaction benchmarks",
      "Proposition and price comparison",
      "Strengths and gaps analysis",
    ],
  },
  {
    id: "npd",
    ic: "flask",
    t: "New Product Development Research",
    d: "Evidence at every gate, from unmet need to launch, so fewer ideas fail in market.",
    x: [
      "Unmet needs exploration",
      "Concept screening and testing",
      "Product and usage testing",
      "Launch readiness checks",
    ],
  },
  {
    id: "pm",
    ic: "megaphone",
    t: "Product Marketing",
    d: "Find the audience, the value proposition and the message that move a product from shelf to basket.",
    x: ["Audience definition", "Value proposition testing", "Positioning and messaging", "Go-to-market inputs"],
  },
  {
    id: "price",
    ic: "tag",
    t: "Pricing Research",
    d: "Price points grounded in what customers value, what competitors charge and what the business needs to earn.",
    x: [
      "Price sensitivity analysis",
      "Willingness-to-pay studies",
      "Conjoint and trade-off research",
      "Competitive price positioning",
    ],
  },
  {
    id: "seg",
    ic: "pie",
    t: "Market Segmentation & Sizing",
    d: "Who to target, how big each opportunity is, and where to focus first.",
    x: [
      "Needs-based and attitudinal segmentation",
      "Segment profiles and personas",
      "Top-down and bottom-up sizing",
      "Segment prioritisation",
    ],
  },
];
function RC_Services() {
  const [open, setOpen] = ee.useState(-1);
  return (
    <div className="rc-svc">
      {RC_SVC.map((s, i) => {
        const flag = s.id === "advisory";
        const on = flag || open === i;
        return (
          <article key={s.id} className={"rc-svc__card rc-svc__card--" + s.id + (on ? " is-open" : "")}>
            <div className="rc-svc__top">
              <span className="rc-svc__n">{String(i + 1).padStart(2, "0")}</span>
              <span className="rc-svc__ico">
                <RC_I n={s.ic} s={22} />
              </span>
            </div>
            <h3>{s.t}</h3>
            <p>{s.d}</p>
            <div className="rc-svc__more" hidden={!on}>
              <ul>
                {s.x.map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={15} />
                    {x}
                  </li>
                ))}
              </ul>
              {s.id !== "advisory" && (
                <a href={"#rc-dd-" + s.id} className="rc-link" onClick={rcScrollTo("rc-dd-" + s.id)}>
                  {"See how it works "}
                  <RC_I n="arrow" s={15} />
                </a>
              )}
            </div>
            {flag && (
              <ol className="rc-svc__qs">
                {[
                  "What decision are you making?",
                  "What evidence would change it?",
                  "What is the most efficient way to get it?",
                ].map((q, k) => (
                  <li key={q}>
                    <span>Q{k + 1}</span>
                    {q}
                  </li>
                ))}
              </ol>
            )}
            {flag ? (
              <a href="#rc-framework" className="rc-svc__tog" onClick={rcScrollTo("rc-framework")}>
                {"See the framework "}
                <RC_I n="arrow" s={15} />
              </a>
            ) : (
              <button className="rc-svc__tog" aria-expanded={on} onClick={() => setOpen(on ? -1 : i)}>
                {on ? "Show less" : "What's included"} <RC_I n="plus" s={15} className={on ? "is-x" : ""} />
              </button>
            )}
          </article>
        );
      })}
    </div>
  );
}
function RC_Radar() {
  const ax = ["Brand Identity", "Messaging", "Audience Alignment", "Competitive Differentiation", "Brand Equity"];
  const cx = 200,
    cy = 190,
    R = 130;
  const pt = (i, f) => {
    const t = (-90 + i * 72) * (Math.PI / 180);
    return [cx + R * f * Math.cos(t), cy + R * f * Math.sin(t)];
  };
  const poly = (vals) => vals.map((v2, i) => pt(i, v2).join(",")).join(" ");
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-viz rc-radar" + (v ? " is-in" : "")}>
      <div className="rc-viz__bar">
        <span>Brand health profile</span>
        <RC_Illus />
      </div>
      <svg
        viewBox="0 0 400 380"
        role="img"
        aria-label="Radar chart comparing a brand with a category benchmark on five brand-health dimensions"
      >
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <polygon key={f} points={poly([f, f, f, f, f])} fill="none" stroke="#DDE2EC" />
        ))}
        {ax.map((_, i) => {
          const [x, y] = pt(i, 1);
          return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#DDE2EC" />;
        })}
        <polygon className="rc-radar__b" points={poly([0.62, 0.7, 0.58, 0.66, 0.6])} />
        <polygon className="rc-radar__a" points={poly([0.86, 0.6, 0.78, 0.48, 0.74])} />
        {ax.map((t, i) => {
          const [x, y] = pt(i, 1.17);
          const words = t.split(" ");
          return (
            <text key={t} x={x} y={y - (words.length - 1) * 6} textAnchor="middle" className="rc-viz__axis">
              {words.map((w, j) => (
                <tspan key={j} x={x} dy={j ? 13 : 0}>
                  {w}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>
      <div className="rc-viz__legend">
        <span>
          <i className="a" />
          Your brand
        </span>
        <span>
          <i className="b" />
          Category benchmark
        </span>
      </div>
    </div>
  );
}
function RC_Bench() {
  const rows = [
    ["Product quality", [4, 3, 4, 2]],
    ["Customer satisfaction", [3, 4, 2, 3]],
    ["Pricing", [3, 2, 4, 3]],
    ["Marketing reach", [2, 4, 3, 3]],
    ["Operational efficiency", [4, 3, 2, 4]],
  ];
  const cols = ["Your brand", "Competitor A", "Competitor B", "Competitor C"];
  return (
    <div className="rc-viz rc-bench">
      <div className="rc-viz__bar">
        <span>Competitive benchmark</span>
        <RC_Illus />
      </div>
      <div className="rc-scroll">
        <table>
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              {cols.map((c, i) => (
                <th scope="col" key={c} className={i === 0 ? "is-you" : ""}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([r, vals]) => (
              <tr key={r}>
                <th scope="row">{r}</th>
                {vals.map((v, i) => (
                  <td key={i} className={i === 0 ? "is-you" : ""}>
                    <span className="rc-dots" aria-label={"relative position " + v + " of 5"}>
                      {[1, 2, 3, 4, 5].map((d) => (
                        <i key={d} className={d <= v ? "on" : ""} />
                      ))}
                    </span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="rc-viz__note">
        Dots show relative position only. Real studies use the dimensions and competitors that matter in your category.
      </p>
    </div>
  );
}
function RC_NPD() {
  const st = [
    ["help", "Unmet need"],
    ["bulb", "Concept"],
    ["okc", "Validation"],
    ["refresh", "Refinement"],
    ["box", "Market readiness"],
    ["rocket", "Launch"],
  ];
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-npd" + (v ? " is-in" : "")}>
      <div className="rc-npd__line">
        <span />
      </div>
      {st.map(([ic, t], i) => (
        <div
          key={t}
          className="rc-npd__s"
          style={{
            "--i": i,
          }}
        >
          <span className="rc-npd__dot">
            <RC_I n={ic} s={20} />
          </span>
          <span className="rc-npd__gate">{i < 5 ? "Gate " + (i + 1) : "Go"}</span>
          <strong>{t}</strong>
        </div>
      ))}
    </div>
  );
}
function RC_Funnel() {
  const st = [
    ["Audience", "Who buys, who influences, who we are not for"],
    ["Value proposition", "The benefit that matters most to them"],
    ["Positioning", "Where we stand against the alternatives"],
    ["Messaging", "Words and proof points that land"],
    ["Go-to-market", "Channels, timing and launch sequence"],
    ["Market impact", "Uptake, preference and share"],
  ];
  return (
    <div className="rc-funnel">
      {st.map(([t, d], i) => (
        <RC_Reveal
          key={t}
          className="rc-funnel__row"
          style={{
            "--w": 100 - i * 9 + "%",
            "--i": i,
          }}
        >
          <div className="rc-funnel__bar">
            <span>0{i + 1}</span>
            <strong>{t}</strong>
          </div>
          <p>{d}</p>
        </RC_Reveal>
      ))}
    </div>
  );
}
function RC_Pricing() {
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-viz rc-price" + (v ? " is-in" : "")}>
      <div className="rc-viz__bar">
        <span>Price sensitivity & willingness to pay</span>
        <RC_Illus />
      </div>
      <svg
        viewBox="0 0 460 260"
        role="img"
        aria-label="Price sensitivity curves showing an acceptable price range between too cheap and too expensive"
      >
        <rect x="162" y="20" width="132" height="190" fill="#E6EDFF" className="rc-price__band" />
        <text x="228" y="38" textAnchor="middle" className="rc-viz__tag">
          Acceptable range
        </text>
        <line x1="40" y1="210" x2="440" y2="210" stroke="#A9B2C1" />
        <line x1="40" y1="20" x2="40" y2="210" stroke="#A9B2C1" />
        <path className="rc-price__c1" d="M40 30 C 120 40, 170 150, 240 186 S 380 205, 440 207" />
        <path className="rc-price__c2" d="M40 206 C 120 202, 190 190, 240 140 S 360 40, 440 28" />
        <path className="rc-price__wtp" d="M40 60 C 150 70, 200 110, 260 150 S 380 198, 440 202" />
        <circle cx="240" cy="166" r="6" fill="#E3A013" className="rc-price__opt" />
        <text x="250" y="180" className="rc-viz__tag rc-viz__tag--amb">
          Optimal zone
        </text>
        <text x="440" y="232" textAnchor="end" className="rc-viz__axis">
          Price →
        </text>
        <text x="30" y="20" textAnchor="end" className="rc-viz__axis" transform="rotate(-90 30 20)">
          Share of buyers →
        </text>
      </svg>
      <div className="rc-viz__legend">
        <span>
          <i className="c1" />
          Too cheap
        </span>
        <span>
          <i className="c2" />
          Too expensive
        </span>
        <span>
          <i className="wtp" />
          Willingness to pay
        </span>
      </div>
    </div>
  );
}
function RC_Conjoint() {
  const at = [
    ["Price", 88],
    ["Features", 64],
    ["Brand", 47],
    ["Service", 34],
  ];
  return (
    <div className="rc-viz rc-conj">
      <div className="rc-viz__bar">
        <span>Trade-off (conjoint) concept</span>
      </div>
      {at.map(([t, w]) => (
        <RC_Reveal key={t} className="rc-conj__row">
          <span>{t}</span>
          <div>
            <b
              style={{
                "--w": w + "%",
              }}
            />
          </div>
        </RC_Reveal>
      ))}
      <p className="rc-viz__note">Relative importance of attributes when buyers trade one against another.</p>
    </div>
  );
}
function RC_Seg() {
  const segs = [
    ["Demographic", "Who they are"],
    ["Behavioural", "What they do"],
    ["Attitudinal", "What they believe"],
    ["Needs-based", "What they need"],
  ];
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"rc-seg" + (v ? " is-in" : "")}>
      <svg
        viewBox="0 0 520 300"
        className="rc-seg__svg"
        role="img"
        aria-label="A market splitting into demographic, behavioural, attitudinal and needs-based segments"
      >
        <circle cx="90" cy="150" r="62" fill="#07104F" />
        <text x="90" y="155" textAnchor="middle" className="rc-seg__core">
          MARKET
        </text>
        {segs.map(([t, d], i) => {
          const y = 40 + i * 73;
          return (
            <g
              key={t}
              className="rc-seg__g"
              style={{
                "--i": i,
              }}
            >
              <path
                d={`M152 150 C 220 150, 230 ${y}, 300 ${y}`}
                fill="none"
                stroke="#1E5BFF"
                strokeOpacity=".5"
                strokeWidth="1.5"
              />
              <rect x="300" y={y - 26} width="200" height="52" rx="12" fill="#fff" stroke="#DDE2EC" />
              <circle cx="324" cy={y} r="9" fill={["#1E5BFF", "#0B22A8", "#7FA6FF", "#E3A013"][i]} />
              <text x="344" y={y - 3} className="rc-seg__t">
                {t}
                {" segments"}
              </text>
              <text x="344" y={y + 14} className="rc-seg__d">
                {d}
              </text>
            </g>
          );
        })}
      </svg>
      <div className="rc-seg__flow">
        {[
          ["pie", "Segment opportunity"],
          ["bars", "Market size"],
          ["trend", "Growth potential"],
          ["target", "Priority segment"],
        ].map(([ic, t], i) => (
          <div key={t} className={"rc-seg__step" + (i === 3 ? " is-goal" : "")}>
            <RC_I n={ic} s={18} />
            <span>{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
function RC_DeepDives() {
  return (
    <div className="rc-dd">
      <RC_Reveal className="rc-dd__row" id="rc-dd-brand">
        <div className="rc-dd__copy">
          <span className="rc-kicker">02 · Brand Assessment</span>
          <h3>A clear read on brand health</h3>
          <p>
            We measure the brand against the five things that decide whether people choose it, then show where it leads
            and where it leaks.
          </p>
          <div className="rc-chain">
            {["Brand identity", "Messaging", "Audience alignment", "Competitive differentiation", "Brand equity"].map(
              (t) => (
                <span key={t}>{t}</span>
              ),
            )}
          </div>
        </div>
        <RC_Radar />
      </RC_Reveal>
      <RC_Reveal className="rc-dd__row rc-dd__row--wide" id="rc-dd-bench">
        <div className="rc-dd__copy">
          <span className="rc-kicker">03 · Competitive Benchmarking</span>
          <h3>See exactly where you stand</h3>
          <p>
            We compare you with the competitors your customers actually consider, on the dimensions they weigh, so
            priorities become obvious.
          </p>
        </div>
        <RC_Bench />
      </RC_Reveal>
      <RC_Reveal className="rc-dd__band" id="rc-dd-npd">
        <div className="rc-dd__copy rc-dd__copy--center">
          <span className="rc-kicker">04 · New Product Development Research</span>
          <h3>Evidence at every gate, from need to launch</h3>
          <p>
            Each stage answers one question before money moves to the next, so weak ideas stop early and strong ones
            launch with confidence.
          </p>
        </div>
        <RC_NPD />
      </RC_Reveal>
      <RC_Reveal className="rc-dd__row rc-dd__row--flip" id="rc-dd-pm">
        <div className="rc-dd__copy">
          <span className="rc-kicker">05 · Product Marketing</span>
          <h3>From the right audience to market impact</h3>
          <p>
            Research narrows each choice in turn, from who to target to what to say and where to launch, until the
            go-to-market plan rests on evidence.
          </p>
        </div>
        <RC_Funnel />
      </RC_Reveal>
      <RC_Reveal className="rc-dd__price" id="rc-dd-price">
        <div className="rc-dd__copy">
          <span className="rc-kicker">06 · Pricing Research</span>
          <h3>Prices that customers accept and the business can sustain</h3>
          <p>
            We bring three views together: what competitors charge, what customers value, and what the business needs to
            earn.
          </p>
          <div className="rc-tri">
            <div>
              <RC_I n="scale" s={18} />
              <strong>Competitive</strong>
              <span>Where the market sits</span>
            </div>
            <RC_I n="arrow" s={16} className="rc-tri__a" />
            <div>
              <RC_I n="users" s={18} />
              <strong>Customer value</strong>
              <span>What buyers will pay</span>
            </div>
            <RC_I n="arrow" s={16} className="rc-tri__a" />
            <div>
              <RC_I n="trend" s={18} />
              <strong>Profitability</strong>
              <span>What the business earns</span>
            </div>
          </div>
        </div>
        <div className="rc-dd__stack">
          <RC_Pricing />
          <RC_Conjoint />
        </div>
      </RC_Reveal>
      <RC_Reveal className="rc-dd__row" id="rc-dd-seg">
        <div className="rc-dd__copy">
          <span className="rc-kicker">07 · Market Segmentation & Sizing</span>
          <h3>Know who to target, and how big the prize is</h3>
          <p>
            We split the market four ways, size each segment, weigh its growth and land on the segment worth
            prioritising first. Sizing can often be built from secondary data and expert interviews, with a survey only
            where assumptions need testing.
          </p>
        </div>
        <RC_Seg />
      </RC_Reveal>
    </div>
  );
}
const RC_PROC = [
  [
    "Understand",
    "Understand & Discover Business Needs",
    ["Industry analysis", "Market assessment", "Competitive benchmarking", "Audience evaluation"],
  ],
  [
    "Define",
    "Define the Research Plan",
    ["Scope and timelines", "Sampling framework", "Data sources", "Success metrics and KPIs"],
  ],
  [
    "Design",
    "Propose Objectives & Methodology",
    ["Qualitative methodologies", "Quantitative methodologies", "Hybrid research designs"],
  ],
  [
    "Implement",
    "Strategy Implementation",
    ["Data quality standards", "Ethical guidelines", "Transparent communication", "Issue resolution"],
  ],
  [
    "Analyze",
    "Analysis & Insight Generation",
    ["Data processing", "Statistical validation", "Trend mapping", "Opportunity identification"],
  ],
  [
    "Review",
    "Review & Evaluation",
    ["Data verification", "Methodology validation", "Strengths and limitations", "Quality assurance"],
  ],
  [
    "Recommend",
    "Reporting & Strategic Recommendations",
    ["Executive summaries", "Visual dashboards", "Actionable recommendations", "Strategic implications"],
  ],
];
function RC_Process() {
  const [a, setA] = ee.useState(0);
  const cx = 230,
    cy = 230,
    R = 170;
  const pos = (i) => {
    const t = (-90 + i * (360 / 7)) * (Math.PI / 180);
    return [cx + R * Math.cos(t), cy + R * Math.sin(t)];
  };
  const p = RC_PROC[a];
  return (
    <div className="rc-proc">
      <div className="rc-proc__loop">
        <svg viewBox="0 0 460 460" role="group" aria-label="Seven-stage research lifecycle">
          <defs>
            <marker
              id="rcArr"
              viewBox="0 0 10 10"
              refX="6"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M0 0 L10 5 L0 10z" fill="#7FA6FF" />
            </marker>
          </defs>
          <circle cx={cx} cy={cy} r={R} fill="none" stroke="#FFFFFF" strokeOpacity=".12" strokeWidth="14" />
          <circle
            cx={cx}
            cy={cy}
            r={R}
            fill="none"
            stroke="#1E6BFF"
            strokeWidth="3"
            strokeDasharray={`${(2 * Math.PI * R * (a + 1)) / 7} 2000`}
            transform={`rotate(-90 ${cx} ${cy})`}
            className="rc-proc__prog"
          />
          {RC_PROC.map((_, i) => {
            const t1 = (-90 + i * (360 / 7) + 13) * (Math.PI / 180),
              t2 = (-90 + (i + 1) * (360 / 7) - 13) * (Math.PI / 180);
            return (
              <path
                key={"a" + i}
                d={`M${cx + R * Math.cos(t1)} ${cy + R * Math.sin(t1)} A${R} ${R} 0 0 1 ${cx + R * Math.cos(t2)} ${cy + R * Math.sin(t2)}`}
                fill="none"
                stroke="#7FA6FF"
                strokeOpacity=".7"
                markerEnd="url(#rcArr)"
              />
            );
          })}
          <circle cx={cx} cy={cy} r="88" fill="#FFFFFF" fillOpacity=".06" stroke="#FFFFFF" strokeOpacity=".2" />
          <text x={cx} y={cy - 18} textAnchor="middle" className="rc-proc__ck">
            LOOPS BACK TO
          </text>
          <text x={cx} y={cy + 4} textAnchor="middle" className="rc-proc__core">
            Business
          </text>
          <text x={cx} y={cy + 26} textAnchor="middle" className="rc-proc__core">
            Decision
          </text>
          {RC_PROC.map(([k], i) => {
            const [x, y] = pos(i);
            return (
              <g
                key={k}
                className={"rc-proc__node" + (a === i ? " is-on" : "") + (i < a ? " is-done" : "")}
                tabIndex="0"
                role="button"
                aria-pressed={a === i}
                onClick={() => setA(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setA(i);
                  }
                }}
              >
                <circle cx={x} cy={y} r="31" />
                <text x={x} y={y - 3} textAnchor="middle" className="rc-proc__n">
                  0{i + 1}
                </text>
                <text x={x} y={y + 12} textAnchor="middle" className="rc-proc__k">
                  {k}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="rc-proc__panel" aria-live="polite">
        <div className="rc-proc__meta">
          {"Stage "}
          {a + 1}
          {" of 7"}
        </div>
        <h3 key={a}>{p[1]}</h3>
        <ul key={"u" + a}>
          {p[2].map((x, i) => (
            <li
              key={x}
              style={{
                "--i": i,
              }}
            >
              <RC_I n="check" s={16} />
              {x}
            </li>
          ))}
        </ul>
        <div className="rc-proc__nav">
          <button onClick={() => setA((a + 6) % 7)} aria-label="Previous stage">
            ←
          </button>
          <div className="rc-proc__pips">
            {RC_PROC.map((_, i) => (
              <button
                key={i}
                className={i === a ? "is-on" : ""}
                onClick={() => setA(i)}
                aria-label={"Stage " + (i + 1)}
              />
            ))}
          </div>
          <button onClick={() => setA((a + 1) % 7)} aria-label="Next stage">
            →
          </button>
        </div>
      </div>
      <ol className="rc-proc__acc">
        {RC_PROC.map(([k, t, xs], i) => (
          <li key={k} className={a === i ? "is-on" : ""}>
            <button aria-expanded={a === i} onClick={() => setA(i)}>
              <span>0{i + 1}</span>
              {t}
            </button>
            {a === i && (
              <ul>
                {xs.map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={15} />
                    {x}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        <li className="rc-proc__accend">
          <RC_I n="refresh" s={16} />
          {" Loops back to the business decision"}
        </li>
      </ol>
    </div>
  );
}
function RC_Venn() {
  const c = [
    ["QUALITATIVE", "Deep understanding", 160, 135, ["In-depth interviews", "Focus groups", "Ethnography"]],
    ["QUANTITATIVE", "Measurement & validation", 300, 135, ["Surveys and U&A", "Tracking", "Conjoint and pricing"]],
    ["HYBRID", "Depth + scale", 230, 255, ["Qual-to-quant", "Quant-to-qual deep dives", "Mixed-mode fieldwork"]],
  ];
  return (
    <div className="rc-venn">
      <svg
        viewBox="0 0 460 400"
        role="img"
        aria-label="Qualitative, quantitative and hybrid research overlap at decision-ready insight"
      >
        {c.map(([t, d, x, y], i) => (
          <g key={t} className={"rc-venn__c rc-venn__c" + i}>
            <circle cx={x} cy={y} r="118" />
            <text x={x + [-46, 50, 0][i]} y={y + [-30, -30, 62][i]} textAnchor="middle" className="rc-venn__t">
              {t}
            </text>
            <text x={x + [-46, 50, 0][i]} y={y + [-12, -12, 80][i]} textAnchor="middle" className="rc-venn__d">
              {d}
            </text>
          </g>
        ))}
        <circle cx="230" cy="178" r="40" fill="#07104F" />
        <text x="230" y="174" textAnchor="middle" className="rc-venn__core">
          DECISION-
        </text>
        <text x="230" y="189" textAnchor="middle" className="rc-venn__core">
          READY INSIGHT
        </text>
      </svg>
      <div className="rc-venn__list">
        {c.map(([t, d, , , xs], i) => (
          <div key={t} className={"rc-venn__item rc-venn__item" + i}>
            <strong>{t.charAt(0) + t.slice(1).toLowerCase()}</strong>
            <span>{d}</span>
            <p>{xs.join(" \xB7 ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
function RC_Toolkit() {
  const layers = [
    [
      "Understand the market",
      [
        ["globe", "Market intelligence"],
        ["bars", "Market sizing"],
        ["scale", "Competitive intelligence"],
      ],
    ],
    [
      "Understand people",
      [
        ["users", "Consumer insights"],
        ["award", "Brand research"],
        ["pie", "Segmentation"],
      ],
    ],
    [
      "Shape the offer",
      [
        ["box", "Product research"],
        ["tag", "Pricing research"],
      ],
    ],
    ["Decide", [["compass", "Strategic advisory"]]],
  ];
  return (
    <div className="rc-tk">
      {layers.map(([l, items], i) => (
        <RC_Reveal
          key={l}
          className={"rc-tk__layer" + (i === layers.length - 1 ? " rc-tk__layer--last" : "")}
          style={{
            "--i": i,
          }}
        >
          <span className="rc-tk__lbl">
            Layer 0{i + 1}
            <strong>{l}</strong>
          </span>
          <div className="rc-tk__mods">
            {items.map(([ic, t]) => (
              <div key={t} className="rc-tk__mod">
                <RC_I n={ic} s={20} />
                {t}
              </div>
            ))}
          </div>
        </RC_Reveal>
      ))}
      <div className="rc-tk__base">
        Foundation · Own panels · Fieldwork in 55+ markets · Data processing & analytics
      </div>
    </div>
  );
}
function RC_D2D() {
  const st = [
    ["help", "Business question"],
    ["sliders", "Research design"],
    ["database", "Data collection"],
    ["bars", "Analysis"],
    ["bulb", "Insight"],
    ["file", "Recommendation"],
    ["flag", "Business decision"],
  ];
  const [ref, v] = RC_useInView(0.35);
  return (
    <div ref={ref} className={"rc-d2d" + (v ? " is-in" : "")}>
      <div className="rc-d2d__line">
        <span />
      </div>
      {st.map(([ic, t], i) => (
        <div
          key={t}
          className={"rc-d2d__s" + (i === st.length - 1 ? " is-end" : "")}
          style={{
            "--i": i,
          }}
        >
          <span className="rc-d2d__dot">
            <RC_I n={ic} s={20} />
          </span>
          <strong>{t}</strong>
        </div>
      ))}
    </div>
  );
}
function RC_Dashboard() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"rc-dash" + (v ? " is-in" : "")}>
      <div className="rc-dash__top">
        <div className="rc-dash__dots">
          <i />
          <i />
          <i />
        </div>
        <span className="rc-dash__title">Insight dashboard · concept</span>
        <RC_Illus light />
      </div>
      <div className="rc-dash__grid">
        <div className="rc-dash__card rc-dash__card--wide">
          <span className="rc-dash__h">Market opportunity over time</span>
          <svg viewBox="0 0 400 140" preserveAspectRatio="none" className="rc-dash__area" aria-hidden="true">
            <path
              d="M0 120 C 60 112, 90 100, 140 92 S 230 60, 280 52 S 360 26, 400 18 L400 140 L0 140z"
              fill="#1E6BFF"
              fillOpacity=".22"
            />
            <path
              d="M0 120 C 60 112, 90 100, 140 92 S 230 60, 280 52 S 360 26, 400 18"
              fill="none"
              stroke="#7FA6FF"
              strokeWidth="2.5"
              className="rc-dash__line"
            />
            <path
              d="M0 130 C 80 126, 160 118, 240 110 S 340 96, 400 90"
              fill="none"
              stroke="#A9B2C1"
              strokeWidth="1.5"
              strokeDasharray="4 5"
            />
          </svg>
          <div className="rc-dash__leg">
            <span>
              <i className="a" />
              Addressable demand
            </span>
            <span>
              <i className="b" />
              Category baseline
            </span>
          </div>
        </div>
        <div className="rc-dash__card">
          <span className="rc-dash__h">Segment attractiveness</span>
          {[
            ["Segment A", 82],
            ["Segment B", 64],
            ["Segment C", 48],
            ["Segment D", 30],
          ].map(([t, w]) => (
            <div key={t} className="rc-dash__sbar">
              <span>{t}</span>
              <div>
                <b
                  style={{
                    "--w": w + "%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="rc-dash__card">
          <span className="rc-dash__h">Competitive positioning</span>
          <svg viewBox="0 0 200 150" className="rc-dash__mx" aria-hidden="true">
            <line x1="100" y1="8" x2="100" y2="140" stroke="#ffffff" strokeOpacity=".2" />
            <line x1="8" y1="74" x2="192" y2="74" stroke="#ffffff" strokeOpacity=".2" />
            <text x="192" y="88" textAnchor="end">
              Value →
            </text>
            <text x="104" y="16">
              Quality ↑
            </text>
            <circle cx="150" cy="38" r="12" fill="#E3A013" />
            <circle cx="60" cy="50" r="9" fill="#7FA6FF" fillOpacity=".7" />
            <circle cx="132" cy="110" r="10" fill="#7FA6FF" fillOpacity=".7" />
            <circle cx="44" cy="116" r="7" fill="#7FA6FF" fillOpacity=".7" />
            <text x="150" y="62" textAnchor="middle">
              You
            </text>
          </svg>
        </div>
        <div className="rc-dash__card">
          <span className="rc-dash__h">Purchase intent trend</span>
          <svg viewBox="0 0 200 110" className="rc-dash__trend" aria-hidden="true">
            {[20, 50, 80].map((y) => (
              <line key={y} x1="0" x2="200" y1={y} y2={y} stroke="#fff" strokeOpacity=".08" />
            ))}
            <polyline
              points="0,86 30,80 60,82 90,64 120,58 150,44 180,40 200,28"
              fill="none"
              stroke="#7FA6FF"
              strokeWidth="2.5"
              className="rc-dash__line"
            />
            <circle cx="200" cy="28" r="4" fill="#E3A013" />
          </svg>
        </div>
        <div className="rc-dash__card rc-dash__card--ins">
          <span className="rc-dash__h">Customer insight</span>
          <p>
            <RC_I n="bulb" s={16} />
            {" Needs-based Segment B is underserved on after-sales support."}
          </p>
          <p>
            <RC_I n="trend" s={16} />
            {" Interest rises once the value proposition is made explicit."}
          </p>
          <p>
            <RC_I n="flag" s={16} />
            {" Recommendation: pilot with Segment B before national roll-out."}
          </p>
        </div>
      </div>
    </div>
  );
}
const RC_WHY = [
  [
    "target",
    "Decision-first",
    "Decision-first briefs",
    "We define the decision before the questionnaire, so every question earns its place.",
  ],
  [
    "scale",
    "Method-neutral",
    "Method-neutral advice",
    "We recommend the most efficient route to evidence, which is sometimes less research than you expected.",
  ],
  [
    "layers",
    "Feasible designs",
    "Designs that work in the field",
    "Consultants work alongside our own panels and field teams, so designs are feasible before you commit.",
  ],
  [
    "users",
    "Audience depth",
    "Consumer, B2B and healthcare depth",
    "The right questions for buyers, decision-makers or clinicians, across 55+ markets.",
  ],
  [
    "eye",
    "Honest evidence",
    "Honest about evidence",
    "We say what is conclusive and what is indicative, so leaders weigh findings properly.",
  ],
  [
    "lock",
    "Confidential",
    "Confidential by default",
    "Confidentiality agreements are standard and access is limited to the project team.",
  ],
];
function RC_Why() {
  return (
    <div className="rc-why">
      {[0, 1].map((col) => (
        <div key={col} className={"rc-why__col rc-why__col--" + col}>
          {RC_WHY.slice(col * 3, col * 3 + 3).map(([ic, k, t, d]) => (
            <RC_Reveal key={k} className="rc-why__mod">
              <span className="rc-why__k">
                <RC_I n={ic} s={18} />
                {k}
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </RC_Reveal>
          ))}
        </div>
      ))}
      <div className="rc-why__hub">
        <div className="rc-why__ring">
          <span>Research</span>
          <span>Delivery</span>
        </div>
      </div>
    </div>
  );
}
function RC_Team() {
  const lanes = [
    ["Frame", [["compass", "Research Consultants"]]],
    [
      "Field",
      [
        ["users", "Panel & Sampling Managers"],
        ["cpu", "Survey Programmers"],
        ["msg", "Field Supervisors & Moderators"],
      ],
    ],
    ["Insight", [["bars", "Data Processing & Analytics Specialists"]]],
  ];
  return (
    <div className="rc-team">
      <div className="rc-team__lanes">
        {lanes.map(([l, roles], i) => (
          <div key={l} className="rc-team__lane">
            <span className="rc-team__stage">
              0{i + 1}
              {" \xB7 "}
              {l}
            </span>
            {roles.map(([ic, r]) => (
              <div key={r} className="rc-team__role">
                <RC_I n={ic} s={18} />
                {r}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="rc-team__pm">
        <RC_I n="user" s={18} />
        <strong>One point of contact</strong>
        <span>One named contact running across every stage, brief to debrief</span>
      </div>
    </div>
  );
}
function RC_Page({ a, n }) {
  const Faq = FaqList,
    Guide = GuideLink,
    Form = EnquiryForm,
    Cta = CtaSection,
    Quotes = ClientReviews;
  const [moreInd, setMoreInd] = ee.useState(false);
  const [active, setActive] = ee.useState("rc-overview");
  const s = a.services.findIndex((o) => o.slug === n.slug);
  const related = [1, 2, 3].map((o) => a.services[(s + o) % a.services.length]);
  const nav = [
    ["rc-overview", "Overview"],
    ["rc-framework", "Framework"],
    ["rc-services", "Services"],
    ["rc-process", "Process"],
    ["rc-why", "Why us"],
    ["rc-industries", "Industries"],
    ["rc-enquire", "Contact"],
  ];
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
  const inds = SERVICE_INDUSTRIES.map(findIndustry).filter(Boolean);
  const extra = INDUSTRIES.filter((x) => !SERVICE_INDUSTRIES.includes(x.slug));
  const faqs = [
    {
      q: "What does a research consultant do?",
      a: "Helps define the business decision, turns it into research questions, recommends the most efficient methods, oversees fieldwork and analysis, and translates findings into practical recommendations.",
    },
    {
      q: "How is research consultancy different from fieldwork?",
      a: "Fieldwork collects data. Consultancy decides what data is needed, how to collect it and what it means for the business. We offer both, separately or together.",
    },
    {
      q: "How long does a consultancy project take?",
      a: "Focused projects using existing data and interviews can take two to four weeks. Programmes with qualitative and quantitative phases typically take six to ten weeks.",
    },
    {
      q: "Can you size a market without a large survey?",
      a: "Often, yes. Secondary data, expert interviews and transparent bottom-up modelling can produce a credible estimate, with a survey added only where key assumptions need validation.",
    },
    {
      q: "Can you work with our internal insights team?",
      a: "Yes. We often support internal teams with study design, specialist methods, fieldwork capacity or independent analysis, working within your existing processes.",
    },
    {
      q: "Do you sign confidentiality agreements?",
      a: "Yes. Consultancy work often involves strategic plans and sensitive data, so confidentiality agreements are standard and access is limited to the project team.",
    },
    ...serviceFaqs(a, n).slice(0, 2),
  ];
  return (
    <div className="rc">
      <section className="rc-hero">
        <div className="rc-hero__grid-bg" aria-hidden="true" />
        <div className="container rc-hero__in">
          <div className="rc-hero__copy">
            <nav className="crumbs" aria-label="Breadcrumb">
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
            <span className="rc-hero__eyebrow">
              <i />
              Market Research · Advisory
            </span>
            <HeroH1>Research Consultancy</HeroH1>
            <p className="rc-hero__sub">Expert guidance to frame the right questions and choose the right method.</p>
            <p className="rc-hero__body">
              Frequent Research combines experienced research professionals, strategic consultants, and sector
              specialists to help organizations make informed, data-driven decisions that accelerate business growth.
            </p>
            <div className="rc-hero__ctas">
              <a className="btn btn--light btn--lg" href="#rc-enquire" onClick={rcScrollTo("rc-enquire")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="rc-hero__viz">
            <RC_HeroNetwork />
            <RC_HeroMobile />
          </div>
        </div>
      </section>
      <div className="container">
        <ul className="rc-strip">
          {[
            ["globe", "Market Intelligence", "Trends, drivers and the forces shaping your market"],
            ["users", "Consumer & Customer Insights", "What people need, think and do, and why"],
            ["bars", "Market Sizing & Competitive Intelligence", "How big the prize is and who else wants it"],
            ["award", "Brand & Product Research", "How your brand and products perform with buyers"],
          ].map(([ic, t, d]) => (
            <li key={t}>
              <span className="rc-strip__ico">
                <RC_I n={ic} s={20} />
              </span>
              <div>
                <strong>{t}</strong>
                <span>{d}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <nav className="rc-subnav" aria-label="On this page">
        <div className="container rc-subnav__in">
          {nav.map(([id, t]) => (
            <a key={id} href={"#" + id} className={active === id ? "is-on" : ""} onClick={rcScrollTo(id)}>
              {t}
            </a>
          ))}
        </div>
      </nav>
      <section className="rc-sec" id="rc-overview">
        <div className="container">
          <div className="rc-prob">
            <RC_Reveal className="rc-prob__copy">
              <span className="rc-kicker rc-kicker--warn">The problem</span>
              <h2>The problem</h2>
              <p className="rc-prob__quote">
                Most research goes wrong before the first question is asked: the objective is vague, the sample is
                wrong, or the field partner cuts corners. The result is data you cannot defend in a boardroom.
              </p>
            </RC_Reveal>
            <RC_Breakdown />
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint rc-sec--sol">
        <div className="rc-turn" aria-hidden="true">
          <span>What changes with Frequent Research</span>
        </div>
        <div className="container">
          <div className="rc-solhead">
            <RC_Head kicker="Our solution" title="Our solution" />
            <p className="rc-lead">
              We design the study around the decision you need to make, recruit the right respondents, control quality
              at every stage of fieldwork, and hand you findings you can act on.
            </p>
          </div>
          <RC_Solution />
          <p className="rc-sol__cap">From business question to decision-ready insight.</p>
        </div>
      </section>
      <section className="rc-sec" id="rc-framework">
        <div className="container">
          <RC_Head
            kicker="How we structure every engagement"
            title="Structured Research Framework"
            intro="Four focus areas that follow a business from first opportunity to long-term strategy. Select a quadrant to explore it."
          />
          <RC_Framework />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="rc-services">
        <div className="container">
          <RC_Head
            kicker="Service explorer"
            title="Our Research Consultancy Services Include"
            intro="Seven specialist services. Open any card to see what's included, then follow it to the method behind it."
          />
          <RC_Services />
        </div>
      </section>
      <section className="rc-sec rc-sec--dd">
        <div className="container">
          <RC_Head kicker="Inside the services" title="How each service turns questions into evidence" center />
          <RC_DeepDives />
        </div>
      </section>
      <section className="rc-sec rc-sec--ink" id="rc-process">
        <div className="container">
          <RC_Head
            light
            kicker="Research lifecycle"
            title="Our Process"
            intro="Seven stages, one continuous loop. Select a stage to see the work inside it."
          />
          <RC_Process />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container rc-mt">
          <div>
            <RC_Head
              kicker="Methodology"
              title="The right method for the question"
              intro="We are method-neutral. The decision decides the design, and often the best answer combines approaches."
            />
            <RC_Venn />
          </div>
          <div>
            <RC_Head
              kicker="Consultancy toolkit"
              title="A modular research toolkit"
              intro="Nine capabilities, assembled to fit the question rather than a fixed package."
            />
            <RC_Toolkit />
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--d2d">
        <div className="container">
          <RC_Head light center kicker="Insight transformation" title="From Data to Decision" />
          <RC_D2D />
          <div className="rc-dashwrap">
            <div className="rc-dashwrap__copy">
              <h3>What decision-ready looks like</h3>
              <p>
                Findings arrive as a clear story: where the opportunity is, which segment to back, how you compare, and
                what to do next. Delivered as reports, tables or live dashboards.
              </p>
              <ul>
                {[
                  "Market opportunity and trend views",
                  "Segment and competitor comparisons",
                  "Insight cards tied to recommendations",
                ].map((x) => (
                  <li key={x}>
                    <RC_I n="check" s={16} />
                    {x}
                  </li>
                ))}
              </ul>
            </div>
            <RC_Dashboard />
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="rc-why">
        <div className="container">
          <RC_Head
            center
            kicker="Why Frequent Research"
            title="Why clients choose Frequent Research for research consultancy"
          />
          <RC_Why />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container rc-teamwrap">
          <div>
            <RC_Head kicker="People" title="The team behind your project" />
            <p className="rc-lead">
              Researchers, panel managers, programmers, field supervisors and analysts who have run studies across
              consumer, B2B and healthcare audiences.
            </p>
          </div>
          <RC_Team />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <RC_Head kicker="Capabilities" title="Core capabilities" />
          <div className="rc-cap">
            {[
              ["sliders", "Research Design", ["Questionnaire & study design", "Quota & sampling plans"]],
              ["clipboard", "Fieldwork", ["CATI", "CAPI", "Online fieldwork", "Qualitative moderation"]],
              ["bars", "Analytics", ["Weighting", "Tabulation", "Statistics", "Insight storytelling"]],
            ].map(([ic, t, xs], i) => (
              <RC_Reveal key={t} className="rc-cap__col">
                <span className="rc-cap__n">0{i + 1}</span>
                <h3>
                  <RC_I n={ic} s={20} />
                  {t}
                </h3>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </RC_Reveal>
            ))}
          </div>
          <div className="rc-tech">
            <span className="rc-tech__lbl">Technology we work with</span>
            <div className="rc-tech__tiles">
              <Link to="/products" className="rc-tech__tile rc-tech__tile--own">
                <strong>Sampledge</strong>
                <span>Built in-house</span>
              </Link>
              {["Survey Platforms", "SPSS", "Python", "R", "Power BI", "Dashboards & Portals"].map((t) => (
                <span key={t} className="rc-tech__tile">
                  <strong>{t}</strong>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec" id="rc-industries">
        <div className="container">
          <RC_Head kicker="Sector depth" title="Industries we support" />
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
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <div className="rc-case">
            <div className="rc-case__copy">
              <span className="rc-kicker">Example engagement</span>
              <h2>How a typical project looks</h2>
              <p className="rc-lead">
                A medical devices brand needed feedback from cardiologists in four countries within three weeks. We
                confirmed feasibility in 48 hours, ran a mixed online and telephone approach, and delivered cleaned data
                with country-level tables on time.
              </p>
              <div className="rc-case__facts">
                <div>
                  <strong>4</strong>
                  <span>countries</span>
                </div>
                <div>
                  <strong>3 weeks</strong>
                  <span>brief to delivery</span>
                </div>
                <div>
                  <strong>48h</strong>
                  <span>feasibility confirmed</span>
                </div>
              </div>
              <Link to="/industries-case-studies" className="btn btn--ghost">
                See case studies
              </Link>
            </div>
            <ol className="rc-case__tl">
              {[
                ["file", "Brief", "Cardiologists, four countries, three weeks"],
                ["clock", "48h feasibility", "Audience availability confirmed"],
                ["users", "Recruitment", "Verified specialists recruited"],
                ["phone", "Online + telephone", "Mixed-mode fieldwork"],
                ["shield", "Cleaned data", "Quality checks and cleaning"],
                ["grid", "Country-level tables", "Delivered on time"],
              ].map(([ic, t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span className="rc-case__dot">
                    <RC_I n={ic} s={16} />
                  </span>
                  <strong>{t}</strong>
                  <span>{d}</span>
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <h2 className="split__title">Research Consultancy: frequently asked questions</h2>
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
      <section className="section section--tint" id="rc-enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>Talk to our research team about Research Consultancy</h2>
            <p>
              Share a few details and a specialist will reply within one working day. The first consultation is free.
            </p>
            <h3>Related services</h3>
            <ul className="related">
              {related.map((o) => (
                <li key={o.slug}>
                  <Link to={`/services/${a.slug}/${o.slug}`}>{o.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
      <Cta
        title="Start with the right question"
        text="Tell us the decision you are facing. A research consultant will suggest the most efficient way to get evidence you can act on."
        primary={{
          to: "/lets-talk?type=quote",
          label: "Request a Quote",
        }}
        secondary={{
          to: "/lets-talk",
          label: "Get a Free Consultation",
        }}
      />
    </div>
  );
}

export { RC_Page };
