import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY, SERVICE_INDUSTRIES } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';

function QLT_Hero() {
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
    const t = setInterval(() => setK((x) => (x + 1) % 5), 1900);
    return () => clearInterval(t);
  }, []);
  const lab = ["People", "Conversation", "Context", "Themes", "Insight"];
  return (
    <div className="qlt-hv">
      <svg
        viewBox="0 0 560 360"
        className="qlt-hv__svg"
        role="img"
        aria-label="Qualitative researcher in conversation with a respondent; their words become transcript fragments, grouped into themes that lead to an insight"
      >
        <g className={"qlt-hv__ppl" + (k >= 0 ? " is-on" : "")}>
          <circle cx="62" cy="128" r="20" className="qlt-hv__head" />
          <path d="M30 196c0-30 14-46 32-46s32 16 32 46z" className="qlt-hv__body" />
          <circle cx="62" cy="252" r="20" className="qlt-hv__head qlt-hv__head--r" />
          <path d="M30 320c0-30 14-46 32-46s32 16 32 46z" className="qlt-hv__body qlt-hv__body--r" />
          <text x="62" y="96" textAnchor="middle" className="qlt-hv__t">
            Moderator
          </text>
          <text x="62" y="346" textAnchor="middle" className="qlt-hv__t">
            Respondent
          </text>
        </g>
        <path d="M96 140 C130 160 130 240 96 262" className={"qlt-hv__conv" + (k >= 1 ? " is-on" : "")} />
        <path d="M110 200 C150 200 160 120 196 110" className={"qlt-hv__link" + (k >= 1 ? " is-on" : "")} />
        <path d="M110 210 C150 210 160 280 196 290" className={"qlt-hv__link" + (k >= 1 ? " is-on" : "")} />
        <g className={"qlt-hv__tr" + (k >= 1 ? " is-on" : "")}>
          {[
            [196, 82, "\u201CI switch when it\u2019s confusing.\u201D"],
            [196, 152, "\u201CPrice isn\u2019t the main thing.\u201D"],
            [196, 222, "\u201CMy pharmacist decides.\u201D"],
            [196, 270, "\u201CI trust what peers use.\u201D"],
          ].map(([x, y, t], i) => (
            <g
              key={i}
              style={{
                "--i": i,
              }}
            >
              <rect x={x} y={y} width="170" height="40" rx="10" />
              <text x={x + 12} y={y + 25}>
                {t}
              </text>
            </g>
          ))}
        </g>
        <rect x="186" y="66" width="190" height="262" rx="18" className={"qlt-hv__ctx" + (k >= 2 ? " is-on" : "")} />
        <text x="281" y="58" textAnchor="middle" className={"qlt-hv__t qlt-hv__ctxl" + (k >= 2 ? " is-on" : "")}>
          Context: at home, at work, in store
        </text>
        <g className={"qlt-hv__th" + (k >= 3 ? " is-on" : "")}>
          {[
            [440, 110, "Simplicity", "a"],
            [440, 196, "Trust", "b"],
            [440, 282, "Influence", "c"],
          ].map(([x, y, t, c], i) => (
            <g
              key={t}
              className={"qlt-hv__cl qlt-hv__cl--" + c}
              style={{
                "--i": i,
              }}
            >
              <path
                d={`M376 ${[110, 160, 240, 290][i] || y} C410 ${y} 410 ${y} ${x - 34} ${y}`}
                className="qlt-hv__tl"
              />
              {[
                [-14, -8],
                [0, -14],
                [12, -4],
                [-6, 8],
                [10, 10],
              ].map(([dx, dy], j) => (
                <circle key={j} cx={x + dx} cy={y + dy} r="5" />
              ))}
              <text x={x} y={y + 32} textAnchor="middle" className="qlt-hv__t">
                {t}
              </text>
            </g>
          ))}
        </g>
        <g className={"qlt-hv__in" + (k >= 4 ? " is-on" : "")}>
          <rect x="494" y="150" width="56" height="92" rx="14" />
          <path d="M522 176a10 10 0 0 0-6 18v6h12v-6a10 10 0 0 0-6-18zM518 206h8" className="qlt-hv__bulb" />
          <text x="522" y="228" textAnchor="middle" className="qlt-hv__t qlt-hv__t--w">
            Insight
          </text>
          <path d="M476 196h16" className="qlt-hv__tl" />
        </g>
      </svg>
      <ol className="qlt-hv__chain" aria-hidden="true">
        {lab.map((t, i) => (
          <li key={t} className={(i <= k ? "is-done " : "") + (i === k ? "is-cur" : "")}>
            {t}
          </li>
        ))}
      </ol>
      {null}
    </div>
  );
}
function QLT_Why() {
  const [ref, v] = RC_useInView(0.3);
  const st = [
    ["bars", "Observed / measured behaviour"],
    ["chat2", "Conversation"],
    ["heart", "Motivation"],
    ["home", "Context"],
    ["eye", "Interpretation"],
    ["bulb", "Insight"],
  ];
  return (
    <ol ref={ref} className={"qlt-path" + (v ? " is-in" : "")}>
      {st.map(([ic, t], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span>
            <RC_I n={RC_P[ic] ? ic : "msg"} s={20} />
          </span>
          {t}
        </li>
      ))}
    </ol>
  );
}
const QLT_CAP = [
  {
    k: "In-Depth Interviews (IDI)",
    s: "IDI",
    ic: "user",
    d: "One-to-one interviews with carefully recruited and screened respondents, exploring experiences, attitudes, motivations, behaviours and decision-making in depth.",
    l: "Applications",
    x: [
      "Customer experience",
      "Product and concept exploration",
      "B2B decision-maker interviews",
      "Healthcare professional research",
      "Patient and caregiver research",
      "Executive and expert interviews",
      "Usage & attitude studies",
      "Brand perception",
      "Pricing and purchasing behaviour",
      "Sensitive or complex topics",
    ],
  },
  {
    k: "Focus Group Discussions (FGD)",
    s: "FGD",
    ic: "users",
    d: "Moderated group discussions with carefully selected participants, where interaction between people reveals shared and differing views.",
    l: "Formats",
    x: [
      "Traditional in-person FGDs",
      "Online FGDs",
      "Mini groups",
      "Homogeneous groups",
      "Heterogeneous groups",
      "Customer groups",
      "Professional / B2B groups",
      "Healthcare professional groups",
      "Patient / caregiver groups",
    ],
  },
  {
    k: "Online Qualitative Research",
    s: "Online",
    ic: "monitor",
    d: "Qualitative conversations and activities run online, reaching participants across locations.",
    l: "Formats",
    x: [
      "Online IDIs",
      "Online FGDs",
      "Video interviews",
      "Online communities",
      "Bulletin-board discussions",
      "Diary studies",
      "Digital ethnography",
      "Online concept testing",
      "Mobile qualitative studies",
    ],
  },
  {
    k: "Mystery Shopping",
    s: "Mystery shopping",
    ic: "store2",
    d: "An evaluation of the actual customer experience, using trained and validated shoppers who follow predefined scenarios. It is an evaluation method, not an interview.",
    l: "Applications",
    x: [
      "Customer service",
      "Sales behaviour",
      "Staff knowledge",
      "Store experience",
      "Product availability",
      "SOP compliance",
      "Pricing communication",
      "Cross-selling and upselling",
      "Digital experience",
      "Call-centre interactions",
      "Competitor experience",
    ],
  },
  {
    k: "Ethnography & In-Context Research",
    s: "Ethnography",
    ic: "home",
    d: "Observing behaviour in natural environments shows what people actually do, not only what they say.",
    l: "Formats",
    x: [
      "Home visits",
      "Workplace observations",
      "Retail / store visits",
      "On-site professional observations",
      "Product usage observation",
      "Accompanied shopping",
      "Digital behaviour observation",
    ],
  },
  {
    k: "Expert & Stakeholder Interviews",
    s: "Expert",
    ic: "brief",
    d: "Conversations with specialists and stakeholders who hold professional or industry knowledge.",
    l: "Sectors",
    x: [
      "B2B",
      "Industrial markets",
      "Energy",
      "Chemicals",
      "Manufacturing",
      "Automotive",
      "Technology",
      "Healthcare",
      "Financial services",
      "Professional services",
    ],
  },
  {
    k: "Diary Studies",
    s: "Diary",
    ic: "calendar",
    d: "Participants document their experiences over days or weeks, showing how behaviour unfolds over time.",
    l: "Topics",
    x: [
      "Daily product usage",
      "Healthcare journeys",
      "Purchase decisions",
      "Media consumption",
      "Food & beverage behaviour",
      "Digital behaviour",
      "Customer journeys",
      "Longitudinal experiences",
    ],
  },
  {
    k: "Central Location / Intercept Qualitative",
    s: "CLT / Intercept",
    ic: "mapin",
    d: "Respondents recruited at defined locations take part in structured qualitative sessions.",
    l: "Used for",
    x: [
      "Moderated interviews",
      "Product evaluations",
      "Concept assessments",
      "Usability research",
      "Structured qualitative interactions",
    ],
  },
];
function QLT_CapArt({ i }) {
  const A = [
    <svg key="0" viewBox="0 0 200 130">
      <circle cx="58" cy="44" r="14" className="qa-h" />
      <path d="M36 100c0-26 10-40 22-40s22 14 22 40z" className="qa-b" />
      <circle cx="142" cy="44" r="14" className="qa-h qa-h--r" />
      <path d="M120 100c0-26 10-40 22-40s22 14 22 40z" className="qa-b qa-b--r" />
      <path d="M82 60 C96 50 104 50 118 60" className="qa-talk" />
      <rect x="80" y="104" width="40" height="6" rx="3" className="qa-t" />
    </svg>,
    <svg key="1" viewBox="0 0 200 130">
      <ellipse cx="100" cy="70" rx="44" ry="22" className="qa-t" />
      {[0, 1, 2, 3, 4, 5].map((n) => {
        const a = (n / 6) * Math.PI * 2 - Math.PI / 2;
        return (
          <circle
            key={n}
            cx={100 + Math.cos(a) * 70}
            cy={70 + Math.sin(a) * 40}
            r="11"
            className={n === 0 ? "qa-h" : "qa-h qa-h--r"}
          />
        );
      })}
      <path d="M100 18v12" className="qa-talk" />
    </svg>,
    <svg key="2" viewBox="0 0 200 130">
      {[
        [20, 20],
        [120, 20],
        [70, 74],
      ].map(([x, y], n) => (
        <g key={n}>
          <rect x={x} y={y} width="62" height="40" rx="6" className="qa-scr" />
          <circle cx={x + 31} cy={y + 18} r="8" className={n === 2 ? "qa-h" : "qa-h qa-h--r"} />
        </g>
      ))}
      <path d="M82 40h38M51 60l30 14M151 60l-30 14" className="qa-talk" />
    </svg>,
    <svg key="3" viewBox="0 0 200 130">
      <path d="M20 110h160" className="qa-g" />
      <path d="M40 56l10-22h100l10 22" className="qa-t2" />
      <rect x="40" y="56" width="120" height="54" className="qa-wall" />
      <rect x="88" y="76" width="24" height="34" className="qa-t" />
      {[
        [52, 82],
        [140, 82],
      ].map(([x, y]) => (
        <rect key={x} x={x - 8} y={y - 10} width="16" height="16" className="qa-win" />
      ))}
      <path d="M8 120 C40 96 60 128 100 104" className="qa-route" />
      <circle cx="100" cy="104" r="5" className="qa-h" />
    </svg>,
    <svg key="4" viewBox="0 0 200 130">
      <path d="M30 64l50-36 50 36" className="qa-t2" />
      <rect x="40" y="62" width="80" height="54" className="qa-wall" />
      <circle cx="80" cy="92" r="10" className="qa-h qa-h--r" />
      <g transform="translate(150 60)">
        <ellipse rx="26" ry="16" className="qa-eye" />
        <circle r="7" className="qa-h" />
      </g>
      <path d="M124 64 L136 62" className="qa-talk" />
    </svg>,
    <svg key="5" viewBox="0 0 200 130">
      <rect x="24" y="28" width="152" height="86" rx="8" className="qa-wall" />
      {[0, 1, 2, 3].map((c) => (
        <rect key={c} x={36 + c * 34} y="38" width="22" height="26" className="qa-win" />
      ))}
      <circle cx="70" cy="86" r="12" className="qa-h qa-h--r" />
      <circle cx="130" cy="86" r="12" className="qa-h" />
      <rect x="86" y="96" width="28" height="18" rx="3" className="qa-brief" />
      <path d="M84 82 C96 74 104 74 116 82" className="qa-talk" />
    </svg>,
    <svg key="6" viewBox="0 0 200 130">
      <path d="M16 70h168" className="qa-g" />
      {[0, 1, 2, 3, 4, 5, 6].map((d) => (
        <g key={d}>
          <circle cx={24 + d * 25} cy="70" r="7" className={d < 5 ? "qa-h" : "qa-h qa-h--r"} />
          <rect x={14 + d * 25} y={d % 2 ? 84 : 26} width="20" height="24" rx="3" className="qa-scr" />
          <text x={24 + d * 25} y={d % 2 ? 125 : 20} textAnchor="middle" className="qa-tx">
            D{d + 1}
          </text>
        </g>
      ))}
    </svg>,
    <svg key="7" viewBox="0 0 200 130">
      <path d="M100 18c-16 0-28 12-28 28 0 22 28 46 28 46s28-24 28-46c0-16-12-28-28-28z" className="qa-pin" />
      <circle cx="100" cy="46" r="10" fill="#fff" />
      <rect x="40" y="104" width="120" height="8" rx="3" className="qa-t" />
      <circle cx="70" cy="96" r="7" className="qa-h qa-h--r" />
      <circle cx="130" cy="96" r="7" className="qa-h" />
    </svg>,
  ];
  return A[i];
}
function QLT_Caps({ sel, setSel }) {
  const m = QLT_CAP[sel];
  return (
    <div className="qlt-cap">
      <ol className="qlt-cap__nav" role="tablist" aria-label="Qualitative research methods">
        {QLT_CAP.map((x, i) => (
          <li key={x.k} role="presentation">
            <button role="tab" aria-selected={sel === i} className={sel === i ? "is-on" : ""} onClick={() => setSel(i)}>
              <span>0{i + 1}</span>
              <RC_I n={RC_P[x.ic] ? x.ic : "msg"} s={17} />
              {x.k}
            </button>
          </li>
        ))}
      </ol>
      <div className="qlt-cap__panel" key={sel} role="tabpanel" aria-live="polite">
        <div className="qlt-cap__art" aria-hidden="true">
          <QLT_CapArt i={sel} />
        </div>
        <span className="qlt-cap__k">
          0{sel + 1}
          {" \xB7 "}
          {m.s}
        </span>
        <h3>{m.k}</h3>
        <p>{m.d}</p>
        {sel === 3 && (
          <ol className="qlt-msj" aria-label="Mystery shopping evaluation journey">
            {["Shopper profile", "Scenario", "Interaction", "Evidence", "Validation", "Findings"].map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ol>
        )}
        {sel === 4 && (
          <div className="qlt-ctx5" aria-label="People, environment, behaviour, product or service, context">
            {["People", "Environment", "Behaviour", "Product / service", "Context"].map((t, i) => (
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
        )}
        <span className="qlt-cap__l">{m.l}</span>
        <ul>
          {m.x.map((y, i) => (
            <li
              key={y}
              style={{
                "--i": i,
              }}
            >
              {y}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const QLT_SEL = [
  ["Explore individual motivations", 0],
  ["Understand group attitudes", 1],
  ["Observe behaviour in context", 4],
  ["Understand behaviour over time", 6],
  ["Evaluate customer experience", 3],
  ["Explore specialist professional knowledge", 5],
  ["Reach geographically distributed audiences", 2],
  ["Evaluate concepts / products in a controlled setting", 7],
];
function QLT_Selector({ onPick }) {
  const [a, setA] = ee.useState(0);
  const m = QLT_CAP[QLT_SEL[a][1]];
  return (
    <div className="qlt-sel">
      <div className="qlt-sel__q">
        <span className="qlt-sel__k">I need to…</span>
        <div role="radiogroup" aria-label="Research need">
          {QLT_SEL.map(([t], i) => (
            <button
              key={t}
              role="radio"
              aria-checked={a === i}
              className={a === i ? "is-on" : ""}
              onClick={() => setA(i)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="qlt-sel__a" key={a} aria-live="polite">
        <span className="qlt-sel__k">Relevant method</span>
        <strong>
          <RC_I n={RC_P[m.ic] ? m.ic : "msg"} s={22} />
          {m.k}
        </strong>
        <p>{m.d}</p>
        <a
          className="rc-link"
          href="#qlt-capabilities"
          onClick={(e) => {
            onPick(QLT_SEL[a][1]);
            rcScrollTo("qlt-capabilities")(e);
          }}
        >
          {"See this method "}
          <RC_I n="arrow" s={14} />
        </a>
        <em className="qlt-sel__note">A starting point, not a ranking. Many studies combine methods.</em>
      </div>
    </div>
  );
}
const QLT_REC = [
  [
    "users",
    "Consumer recruitment",
    [
      "Age",
      "Gender",
      "Geography",
      "Household profile",
      "Employment",
      "Income",
      "Lifestyle",
      "Product ownership",
      "Purchase behaviour",
      "Brand usage",
      "Category involvement",
      "Digital behaviour",
    ],
  ],
  [
    "brief",
    "B2B recruitment",
    [
      "Job title",
      "Seniority",
      "Department",
      "Industry",
      "Company size",
      "Company revenue",
      "Decision-making authority",
      "Procurement responsibility",
      "Product / service usage",
      "Technology adoption",
      "Business function",
      "Years of experience",
    ],
  ],
  [
    "steth",
    "Healthcare recruitment",
    [
      "Profession",
      "Specialty",
      "Role",
      "Workplace / facility type",
      "Patient volume",
      "Years of experience",
      "Product / category involvement",
      "Prescribing / recommendation behaviour",
      "Treatment responsibility",
      "Relevant clinical experience",
    ],
  ],
];
const QLT_SCR = [
  ["Recruitment", "Potential participants identified for the study."],
  ["Profile screening", "Basic profile matched to the target audience."],
  ["Behavioural screening", "Relevant behaviours confirmed."],
  ["Category screening", "Category usage or involvement confirmed."],
  ["Role & responsibility screening", "For professionals: role, function and decision responsibility."],
  ["Experience screening", "Relevant experience and knowledge confirmed."],
  ["Research participation screening", "Recent or frequent research participation checked."],
  ["Qualified respondent", "Ready for validation and scheduling."],
];
function QLT_Funnel() {
  const [a, setA] = ee.useState(0);
  const [ref, v] = RC_useInView(0.25);
  return (
    <div ref={ref} className={"qlt-fun" + (v ? " is-in" : "")}>
      <ol className="qlt-fun__bars">
        {QLT_SCR.map(([t], i) => (
          <li
            key={t}
            style={{
              "--i": i,
              "--w": 100 - i * 8 + "%",
            }}
          >
            <button
              className={a === i ? "is-on" : ""}
              onClick={() => setA(i)}
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
            >
              <span>0{i + 1}</span>
              {t}
            </button>
          </li>
        ))}
      </ol>
      <div className="qlt-fun__d" key={a} aria-live="polite">
        <span>Stage 0{a + 1}</span>
        <strong>{QLT_SCR[a][0]}</strong>
        <p>{QLT_SCR[a][1]}</p>
      </div>
    </div>
  );
}
const QLT_IDI = [
  ["Define criteria", "Audience, quotas and screening criteria agreed with the research team."],
  ["Recruit", "Potential participants identified through panels and targeted recruitment."],
  ["Screen", "Multi-level screening against the criteria."],
  ["Validate", "Profile, contact and professional checks where appropriate."],
  ["Schedule", "Session time, mode and language confirmed."],
  ["Pre-check", "Eligibility and logistics re-confirmed before the session."],
  ["Conduct IDI", "Moderator follows the discussion guide and probes what matters."],
  ["Record where permitted", "Audio or video recorded with consent."],
  ["Quality review", "Session reviewed for coverage, duration and relevance."],
  ["Transcribe / translate", "Transcripts and translations prepared as agreed."],
  ["Thematic coding", "Responses organised into themes and patterns."],
  ["Deliver outputs", "Agreed deliverables shared with the client."],
];
const QLT_FGD = [
  "Audience definition",
  "Quotas",
  "Recruitment",
  "Screening",
  "Validation",
  "Group construction",
  "Scheduling",
  "Final eligibility check",
  "Moderation",
  "Group dynamics monitoring",
  "Recording where approved",
  "Transcription / translation",
  "Analysis",
  "Reporting",
];
function QLT_IdiFgd() {
  const [t, setT] = ee.useState(0);
  const [open, setOpen] = ee.useState(null);
  return (
    <div className="qlt-wf">
      <div className="qlt-wf__tabs" role="tablist" aria-label="Workflow">
        {["IDI end-to-end", "FGD end-to-end"].map((x, i) => (
          <button key={x} role="tab" aria-selected={t === i} className={t === i ? "is-on" : ""} onClick={() => setT(i)}>
            <RC_I n={i ? "users" : "user"} s={16} />
            {x}
          </button>
        ))}
      </div>
      {t === 0 ? (
        <ol className="qlt-idi" key="idi">
          {QLT_IDI.map(([s, d], i) => (
            <li
              key={s}
              className={open === i ? "is-open" : ""}
              style={{
                "--i": i,
              }}
            >
              <button aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
                <RC_I n="plus" s={14} />
              </button>
              {open === i && <p>{d}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <div className="qlt-fgd" key="fgd">
          <ol>
            {QLT_FGD.map((s, i) => (
              <li
                key={s}
                style={{
                  "--i": i,
                }}
                className={i === 5 ? "is-key" : ""}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ol>
          <div className="qlt-fgd__comp">
            <svg viewBox="0 0 160 160" aria-hidden="true">
              <circle cx="80" cy="80" r="34" className="qa-t" />
              {Array.from(
                {
                  length: 8,
                },
                (_, n) => {
                  const a = (n / 8) * Math.PI * 2;
                  return (
                    <circle
                      key={n}
                      cx={80 + Math.cos(a) * 58}
                      cy={80 + Math.sin(a) * 58}
                      r="10"
                      className={n % 3 === 0 ? "qa-h" : "qa-h qa-h--r"}
                    />
                  );
                },
              )}
            </svg>
            <div>
              <strong>Group composition matters</strong>
              <p>
                FGD quality depends partly on who is in the room together. Groups are built to the agreed quotas, as
                homogeneous or heterogeneous groups, so discussion stays relevant and balanced.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function QLT_Mystery() {
  const [ref, v] = RC_useInView(0.2);
  const st = [
    "Define customer journey",
    "Develop shopper profile",
    "Shopper screening",
    "Scenario training",
    "Shopper validation",
    "Field execution",
    "Evidence collection",
    "Quality validation",
    "Back-checks & clarifications",
    "Final review & reporting",
  ];
  return (
    <div ref={ref} className={"qlt-ms" + (v ? " is-in" : "")}>
      <svg viewBox="0 0 1000 120" preserveAspectRatio="none" className="qlt-ms__route" aria-hidden="true">
        <path d="M20 60 C120 10 180 110 280 60 S440 10 520 60 S680 110 760 60 S900 10 980 60" />
      </svg>
      <ol>
        {st.map((s, i) => (
          <li
            key={s}
            style={{
              "--i": i,
            }}
            className={i % 2 ? "is-dn" : ""}
          >
            <span className="qlt-ms__pin">
              <RC_I n="mapin" s={16} />
            </span>
            <b>{String(i + 1).padStart(2, "0")}</b>
            <em>{s}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
function QLT_EthDiary() {
  const eth = [
    "Recruitment",
    "Screening",
    "Context validation",
    "Participant briefing",
    "Observation / interview",
    "Behaviour documentation",
    "Quality review",
    "Analysis",
    "Insight development",
  ];
  const dia = [
    "Recruitment",
    "Screening",
    "Validation",
    "Onboarding",
    "Participant activities",
    "Moderator engagement",
    "Ongoing quality monitoring",
    "Content review",
    "Thematic analysis",
    "Final insights",
  ];
  const [ref, v] = RC_useInView(0.2);
  return (
    <div ref={ref} className={"qlt-ed" + (v ? " is-in" : "")}>
      <div className="qlt-ed__c">
        <span className="qlt-ed__k">
          <RC_I n="home" s={16} />
          Ethnography
        </span>
        <h3>Observing behaviour where it happens</h3>
        <div className="qlt-ring" aria-label="People, environment, behaviour, product or service and context overlap">
          {["People", "Environment", "Behaviour", "Product / service", "Context"].map((t, i) => (
            <span
              key={t}
              style={{
                "--a": -90 + i * 72 + "deg",
                "--i": i,
              }}
            >
              {t}
            </span>
          ))}
          <b>In-context insight</b>
        </div>
        <ol className="qlt-chain">
          {eth.map((s, i) => (
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
      </div>
      <div className="qlt-ed__c">
        <span className="qlt-ed__k">
          <RC_I n="calendar" s={16} />
          Online communities & diary studies
        </span>
        <h3>How behaviour develops over time</h3>
        <div className="qlt-days" aria-label="Diary timeline across days and weeks">
          {["Day 1", "Day 3", "Day 7", "Week 2", "Week 3", "Week 4"].map((d, i) => (
            <div
              key={d}
              style={{
                "--i": i,
              }}
            >
              <span>{d}</span>
              <i />
              <em>
                {["Onboarding", "First entries", "Usage moments", "Moderator probes", "Reflections", "Wrap-up"][i]}
              </em>
            </div>
          ))}
        </div>
        <ol className="qlt-chain">
          {dia.map((s, i) => (
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
      </div>
    </div>
  );
}
const QLT_QA = [
  ["Recruitment QC", "Before"],
  ["Screener QC", "Before"],
  ["Profile QC", "Before"],
  ["Duplicate & fraud checks", "Before"],
  ["Consistency checks", "Before"],
  ["Professional / category validation", "Before"],
  ["Attendance & participation QC", "During"],
  ["Session QC", "During"],
  ["Output QC", "After"],
];
function QLT_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("qlt-overview");
  const [sel, setSel] = ee.useState(0);
  const [moreInd, setMoreInd] = ee.useState(false);
  const team = a.team || {};
  const nav = [
    ["qlt-overview", "Overview"],
    ["qlt-capabilities", "Methods"],
    ["qlt-recruitment", "Recruitment"],
    ["qlt-process", "Process"],
    ["qlt-quality", "Quality"],
    ["qlt-deliver", "Deliverables"],
    ["qlt-why", "Why us"],
    ["qlt-faq", "FAQ"],
    ["qlt-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is included in your Qualitative Research service?",
      a: "Recruitment, multi-level screening, validation, scheduling, moderation, session quality control, transcription, translation, thematic analysis and reporting support. The scope is agreed for each project.",
    },
    {
      q: "What qualitative research methods do you offer?",
      a: "In-depth interviews, focus group discussions, online qualitative research, ethnography, mystery shopping, expert interviews, diary studies and central-location or intercept research.",
    },
    {
      q: "How do you recruit and screen qualitative research participants?",
      a: "Participants are recruited against agreed criteria, then screened on profile, behaviour, category, role, experience and recent research participation, with validation checks where appropriate.",
    },
    {
      q: "Do you conduct B2B and healthcare qualitative research?",
      a: "Yes. We recruit B2B decision-makers, professionals and experts, and healthcare professionals, patients and caregivers, subject to feasibility.",
    },
    {
      q: "Can qualitative research be conducted online and in person?",
      a: "Yes. IDIs and focus groups can run online or in person, and online communities, diary studies and digital ethnography run online.",
    },
    {
      q: "How long does a qualitative research project take, and what does it cost?",
      a: "Both depend on the methodology, audience, geography, sample structure, recruitment difficulty, number of sessions and deliverables. Share your requirement and we will send a clear quote.",
    },
    {
      q: "Can you provide transcripts, translations and thematic analysis?",
      a: "Yes. Recordings where permitted, transcripts, translated transcripts and thematic analysis can be provided as part of the agreed scope.",
    },
    {
      q: "Can research agencies use Frequent Research as a fieldwork partner?",
      a: "Yes. Many of our projects are white-label fieldwork, recruitment and support for agencies and consultancies.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/qualitative-research";
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
    const title = "Qualitative Market Research | Frequent Research";
    const desc =
      "Qualitative market research using IDIs, focus groups, ethnography and specialist recruitment to uncover motivations, behaviours and customer needs.";
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
          ["Qualitative Research", "/services/market-research/qualitative-research"],
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
        name: "Qualitative Research",
        serviceType:
          "Qualitative market research: in-depth interviews, focus groups, ethnography, diary studies and mystery shopping",
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
    <div className="qlt rc">
      <section className="qlt-hero">
        <div className="container qlt-hero__in">
          <div className="qlt-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="qlt-eyebrow">
              <RC_I n="chat2" s={15} />
              Qualitative market research
            </span>
            <HeroH1>Qualitative Research</HeroH1>
            <p className="qlt-hero__sub">Turning Human Conversations into Actionable Insights</p>
            <p className="qlt-hero__body">
              Our qualitative research uncovers the why behind consumer behaviour, opinions, motivations, experiences
              and decision-making. We combine respondent recruitment, detailed screening, experienced moderation,
              structured fieldwork, validation and analysis in one workflow.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg qlt-btn" href="#qlt-enquire" onClick={rcScrollTo("qlt-enquire")}>
                Get a free consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <QLT_Hero />
        </div>
        <div className="container">
          <ul className="qlt-strip">
            {[
              ["user", "In-Depth Interviews"],
              ["users", "Focus Groups"],
              ["globe", "Online & In-Person Research"],
              ["home", "Ethnography"],
              ["target", "Specialised Respondent Recruitment"],
              ["file", "Recruitment to Reporting Support"],
            ].map(([ic, t]) => (
              <li key={t}>
                <RC_I n={ic} s={16} />
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
      <section className="rc-sec" id="qlt-overview">
        <div className="container">
          <div className="qlt-why">
            <div>
              <RC_Head kicker="Why qualitative research" title="Understanding the Why Behind the Data" />
              <p className="qlt-lead">
                {svc("quantitative-research", "Quantitative research")}
                {" measures patterns. Qualitative market research explores what sits behind them."}
              </p>
            </div>
            <div>
              <p className="od-muted">
                Through conversation and observation, qualitative research explores the motivations, experiences,
                attitudes, perceptions, behaviours, decision-making, barriers, needs, language and context behind a
                result, including needs people have not yet put into words. Its findings are themes and patterns that
                explain behaviour; they are not statistical estimates for a whole population.
              </p>
              <ul className="qlt-tags">
                {[
                  "Motivations",
                  "Experiences",
                  "Attitudes",
                  "Perceptions",
                  "Behaviours",
                  "Decision-making",
                  "Barriers",
                  "Needs",
                  "Language",
                  "Context",
                  "Unmet needs",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <QLT_Why />
        </div>
      </section>
      <section className="rc-sec qlt-sec--soft" id="qlt-capabilities">
        <div className="container">
          <RC_Head
            kicker="Capabilities"
            title="Our Qualitative Research Capabilities"
            intro="Eight methods, each with its own recruitment needs, fieldwork protocol, quality checks and outputs."
          />
          <QLT_Caps sel={sel} setSel={setSel} />
          <div className="qlt-selwrap">
            <h3>Which Qualitative Method Fits Your Research Question?</h3>
            <QLT_Selector onPick={setSel} />
          </div>
        </div>
      </section>
      <section className="rc-sec" id="qlt-recruitment">
        <div className="container">
          <RC_Head
            kicker="Respondent recruitment"
            title="Finding the Right Respondents"
            intro="Qualitative research is only as good as the people in the conversation, so recruitment is where quality starts."
          />
          <div className="qlt-rec">
            {QLT_REC.map(([ic, t, xs], i) => (
              <div key={t} className={"qlt-rec__c qlt-rec__c" + i}>
                <span className="qlt-rec__h">
                  <span>
                    <RC_I n={ic} s={20} />
                  </span>
                  {t}
                </span>
                <span className="qlt-rec__k">Targeting can include</span>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="qlt-scr">
            <div>
              <span className="rc-kicker">Multi-level screening</span>
              <h2>Recruitment Is Only the Beginning</h2>
              <p className="od-muted">
                Each potential participant passes through several layers of screening. Screening and validation
                procedures are designed to reduce unsuitable, duplicate, misrepresented or inconsistent participants; no
                process can guarantee perfect authenticity.
              </p>
            </div>
            <QLT_Funnel />
          </div>
          <div className="qlt-val">
            <div className="qlt-val__core">
              <RC_I n="shield" s={28} />
              <strong>Respondent validation & verification</strong>
              <em>Validation protocols vary by audience, country, methodology and study requirements.</em>
            </div>
            <ul>
              {[
                [
                  "user",
                  "Identity & profile consistency",
                  "Information from recruitment and screening is checked for consistency.",
                ],
                [
                  "phonecall",
                  "Contact validation",
                  "Where appropriate and permitted, contact information may be checked.",
                ],
                [
                  "brief",
                  "Professional verification",
                  "For B2B and healthcare: designation, organisation, industry, function, specialty and relevant experience.",
                ],
                ["copy", "Duplicate detection", "Duplicate records and repeated participation are identified."],
                ["refresh", "Behavioural consistency", "Responses are reviewed for contradictions."],
                [
                  "eye",
                  "Quality & authenticity review",
                  "Suspicious patterns or information inconsistent with the requirements are flagged.",
                ],
              ].map(([ic, t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i % 3,
                  }}
                >
                  <span>
                    <RC_I n={RC_P[ic] ? ic : "user"} s={18} />
                  </span>
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
      <section className="rc-sec qlt-sec--ink" id="qlt-process">
        <div className="container">
          <RC_Head
            light
            kicker="Our qualitative research process"
            title="Eleven Steps From Brief to Delivery"
            intro="A qualitative-specific workflow. Different methods then follow their own protocols, shown below."
          />
          <div className="qlt-proc">
            {
              [
                [
                  "Before fieldwork",
                  [
                    "Research understanding & design",
                    "Respondent recruitment",
                    "Multi-level screening",
                    "Validation & verification",
                    "Confirmation & scheduling",
                    "Pre-fieldwork quality checks",
                  ],
                ],
                ["Fieldwork", ["Moderation & fieldwork", "Session quality control"]],
                [
                  "After fieldwork",
                  ["Transcription / translation", "Thematic analysis & insight development", "Reporting & delivery"],
                ],
              ].reduce(
                (acc, [ph, xs]) => {
                  const start = acc.n;
                  acc.out.push(
                    <div key={ph} className="qlt-proc__ph">
                      <span className="qlt-proc__k">{ph}</span>
                      <ol>
                        {xs.map((x, i) => (
                          <RC_Reveal
                            as="li"
                            key={x}
                            style={{
                              "--i": i,
                            }}
                          >
                            <span>{String(start + i + 1).padStart(2, "0")}</span>
                            {x}
                          </RC_Reveal>
                        ))}
                      </ol>
                    </div>,
                  );
                  acc.n += xs.length;
                  return acc;
                },
                {
                  n: 0,
                  out: [],
                },
              ).out
            }
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head
            kicker="Method-specific workflows"
            title="IDI ≠ FGD ≠ Ethnography ≠ Mystery Shopping ≠ Diary Study"
            intro="Each method has its own recruitment needs, participant behaviour, fieldwork protocol, quality checks and outputs."
          />
          <QLT_IdiFgd />
        </div>
      </section>
      <section className="rc-sec qlt-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Mystery shopping"
            title="Mystery Shopping: A Journey, Not an Interview"
            intro="Trained, validated shoppers follow predefined scenarios and collect evidence of the real customer experience, which is then validated before reporting."
          />
          <QLT_Mystery />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <QLT_EthDiary />
        </div>
      </section>
      <section className="rc-sec qlt-sec--soft">
        <div className="container qlt-mod">
          <div>
            <RC_Head
              kicker="Moderation & fieldwork"
              title="Structured Protocols, Room to Probe"
              intro="Moderators follow a structured discussion guide while staying free to probe relevant, unexpected answers."
            />
            <ol className="qlt-mod__ladder">
              {[
                "What respondents say",
                "Why they say it",
                "What they actually experience",
                "What drives the behaviour",
                "What could change it",
              ].map((t, i) => (
                <li
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span>{i + 1}</span>
                  {t}
                </li>
              ))}
            </ol>
            <div className="qlt-mod__lang">
              <strong>Languages & settings</strong>
              <ul>
                {[
                  "English",
                  "Local / native languages",
                  "Multilingual formats",
                  "Online environments",
                  "In-person settings",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <em>
                Native-language moderation can be supported where the target market requires cultural and linguistic
                sensitivity.
              </em>
            </div>
          </div>
          <div className="qlt-sqc">
            <span className="qlt-sqc__k">
              <i />
              Session quality control
            </span>
            <ul>
              {[
                "Respondent attendance",
                "Eligibility confirmation",
                "Session duration",
                "Moderator adherence",
                "Discussion-guide coverage",
                "Recording quality",
                "Participant engagement",
                "Group dynamics",
                "Technical quality",
                "Respondent inconsistencies",
              ].map((t, i) => (
                <li
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <RC_I n="check" s={13} />
                  {t}
                </li>
              ))}
            </ul>
            <p>Clients may observe sessions through agreed observation arrangements, where appropriate.</p>
          </div>
        </div>
      </section>
      <section className="rc-sec qlt-sec--ink" id="qlt-quality">
        <div className="container qlt-qa">
          <div>
            <RC_Head
              light
              kicker="Quality assurance"
              title="Quality Is Managed Throughout the Lifecycle"
              intro="Not only after fieldwork. Nine layers, from recruitment to the final output."
            />
            <div className="qlt-qa__life">
              <span className="b">Before fieldwork</span>
              <span className="d">During</span>
              <span className="a">After</span>
            </div>
          </div>
          <ol className="qlt-qa__stack">
            {QLT_QA.map(([t, p], i) => (
              <RC_Reveal
                as="li"
                key={t}
                className={"is-" + p.toLowerCase()}
                style={{
                  "--i": i,
                  "--w": 100 - i * 4 + "%",
                }}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
                {t}
                <em>{p}</em>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec qlt-phil">
        <div className="container">
          <RC_Head center kicker="Our philosophy" title="From the Right Respondent to the Right Insight" />
          <ol className="qlt-stairs">
            {[
              "Right respondent",
              "Right screening",
              "Right validation",
              "Right moderation",
              "Right quality control",
              "Right interpretation",
              "Actionable insight",
            ].map((t, i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i,
                  "--h": 40 + i * 22 + "px",
                }}
              >
                <strong>{t}</strong>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec qlt-sec--soft" id="qlt-deliver">
        <div className="container">
          <RC_Head
            kicker="Deliverables"
            title="What We Deliver"
            intro="Deliverables vary according to the agreed research scope."
          />
          <div className="qlt-del">
            {[
              [
                "rec",
                "Fieldwork outputs",
                [
                  "Audio / video recordings",
                  "Interview transcripts",
                  "Translated transcripts",
                  "Session notes",
                  "Respondent profiles",
                  "Discussion summaries",
                ],
              ],
              [
                "layers",
                "Analysis",
                [
                  "Thematic coding",
                  "Verbatim extracts",
                  "Key findings",
                  "Consumer personas",
                  "Customer journey insights",
                  "Concept feedback",
                  "Opportunity areas",
                ],
              ],
              [
                "file",
                "Reporting",
                ["Executive summaries", "Qualitative analysis reports", "Presentation-ready findings"],
              ],
            ].map(([ic, t, xs], i) => (
              <div key={t} className={"qlt-del__c qlt-del__c" + i}>
                <span className="qlt-del__h">
                  <RC_I n={RC_P[ic] ? ic : "file"} s={18} />
                  {t}
                </span>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="qlt-apps">
            <span>Applications</span>
            <ul>
              {[
                "Customer experience research",
                "Product research",
                "Concept testing",
                "Brand perception",
                "Usage & attitude studies",
                "Customer journey research",
                "Unmet needs",
                "Pricing and purchasing behaviour",
                "Healthcare professional research",
                "Patient / caregiver research",
                "B2B decision-maker research",
                "Expert interviews",
                "Digital behaviour",
                "Retail experience",
                "Advertising research",
                "Product / service evaluation",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <div className="qlt-aud">
            {[
              ["users", "B2C", "Consumers, customers, households, users and shoppers.", "consumer-panel"],
              [
                "brief",
                "B2B",
                "Decision-makers, professionals, executives, procurement, specialists and business users.",
                "business-panel",
              ],
              [
                "steth",
                "Healthcare",
                "Healthcare professionals, patients, caregivers and other relevant healthcare audiences.",
                "healthcare-panel",
              ],
            ].map(([ic, k, d, s], i) => (
              <Link key={k} to={`/services/market-research/${s}`} className={"qlt-aud__c qlt-aud__c" + i}>
                <RC_I n={ic} s={22} />
                <strong>{k}</strong>
                <span>{d}</span>
                <em>
                  {"Panel "}
                  <RC_I n="arrow" s={13} />
                </em>
              </Link>
            ))}
          </div>
          <div className="qlt-htr">
            <div>
              <span className="rc-kicker">Hard-to-reach audiences</span>
              <h3>Specialised recruitment for niche audiences</h3>
              <p className="od-muted">
                Targeted approaches for audiences that general recruitment rarely reaches, scoped through feasibility
                first.
              </p>
            </div>
            <ul>
              {[
                "B2B decision-makers",
                "Healthcare professionals",
                "Patients",
                "Caregivers",
                "Executives",
                "Industry experts",
                "Specialised professionals",
                "Niche consumer audiences",
              ].map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
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
      <section className="rc-sec qlt-sec--soft" id="qlt-why">
        <div className="container">
          <RC_Head kicker="Why Frequent Research" title="Why Frequent Research for Qualitative Fieldwork?" />
          <ul className="qlt-pil">
            {[
              ["globe", "Global reach", "Access to respondents across multiple markets and audience segments."],
              [
                "target",
                "Specialised recruitment",
                "Consumers, professionals, teens (with parental consent), B2B decision-makers, healthcare professionals, patients, caregivers, experts and specialised audiences.",
              ],
              [
                "shield",
                "Structured quality control",
                "Multi-stage screening, validation, consistency checks and fieldwork QC.",
              ],
              [
                "layers",
                "Flexible methodologies",
                "IDI, FGD, ethnography, diary studies, online communities, mystery shopping and related approaches.",
              ],
              [
                "userplus",
                "Hard-to-reach audiences",
                "Targeted recruitment approaches for specialised and niche audiences.",
              ],
              [
                "loop",
                "End-to-end fieldwork",
                "Recruitment, screening, scheduling, moderation support, transcription, translation, validation and reporting support in one workflow.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 3,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "target"} s={20} />
                </span>
                <strong>{t}</strong>
                <em>{d}</em>
              </RC_Reveal>
            ))}
          </ul>
          <div className="qlt-team">
            <div>
              <h3>The Team Behind Your Research</h3>
              <ul className="qlt-team__r">
                {(team.roles || []).map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="qlt-team__k">Capabilities</span>
              <ul className="qlt-team__s">
                {(team.skills || []).map((s) => (
                  <li key={s}>
                    <RC_I n="check" s={12} />
                    {s}
                  </li>
                ))}
              </ul>
              <span className="qlt-team__k">Tools used across our research team</span>
              <ul className="qlt-team__t">
                {(team.tools || []).map((t) => (
                  <li key={t}>{t === "Sampledge" ? <Link to="/products">{t}</Link> : t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container qlt-ex">
          {null}
          <p className="qlt-ex__q">{a.scenario}</p>
          <Link to="/industries-case-studies" className="rc-link">
            {"See case studies "}
            <RC_I n="arrow" s={14} />
          </Link>
        </div>
      </section>
      <section className="section section--tint" id="qlt-faq">
        <div className="container split">
          <h2 className="split__title">Qualitative research: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec qlt-guidesec">
        <div className="container">
          <Link to="/blog/qualitative-research-guide" className="qlt-guide">
            <RC_I n="quote" s={40} className="qlt-guide__q" />
            <span className="qlt-guide__k">In-depth guide</span>
            <strong>Qualitative Research Explained: In-Depth Interviews, Focus Groups and Finding the “Why”</strong>
            <span className="qlt-guide__go">
              {"Read the guide "}
              <RC_I n="arrow" s={15} />
            </span>
          </Link>
        </div>
      </section>
      <section className="section section--tint" id="qlt-enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>Talk to Our Research Team About Qualitative Research</h2>
            <p>
              Share a few details about your research requirement and our team can discuss the appropriate audience,
              methodology, fieldwork scope and next steps.
            </p>
            <h3>Related services</h3>
            <ul className="related">
              {[
                ["quantitative-research", "Quantitative Research"],
                ["cati", "CATI \u2014 Computer-Assisted Telephone Interviewing"],
                ["online-data-collection", "Online Data Collection"],
                ["offline-data-collection", "Offline Data Collection"],
                ["data-processing-and-analytics", "Data Processing & Analytics"],
                ["research-consultancy", "Research Consultancy"],
                ["research-design-cycle", "Research Design Cycle"],
                ["reporting-and-insights", "Reporting & Insights"],
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
      <section className="qlt-cta">
        <div className="container qlt-cta__in">
          <h2>Let's Find the Right People Behind the Insight</h2>
          <p>
            Tell us what you are trying to understand. We can discuss the target audience, research methodology,
            recruitment requirements and next steps.
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

export { QLT_Page };
