import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { OD_WORLD } from '../data/mapWorld.jsx';
import { PORTALS } from '../data/site.jsx';
import { TESTIMONIALS, findVertical } from '../data/products.jsx';
import { IndustryIcon, prefersReducedMotion } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { CtaSection, EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList, GuideLink, PanelMark } from './VerticalPage.jsx';
import { SERVICE_INDUSTRIES, WU_Section } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';
import { odP } from './QNTPage.jsx';
import { OD_Count } from './CATIPage.jsx';

function ClientReviews({
  vertical = null,
  title = "What our clients say",
  intro = "Real feedback from projects across our four teams.",
  tint = false,
}) {
  const s = vertical ? [...TESTIMONIALS.filter((p) => p.vertical === vertical), ...TESTIMONIALS.filter((p) => p.vertical !== vertical)] : TESTIMONIALS,
    i = ee.useRef(null),
    [o, r] = ee.useState(0),
    [c, d] = ee.useState(false),
    u = (p) => {
      const g = i.current;
      if (!g) return;
      const A = g.querySelectorAll(".tcard"),
        v = (p + A.length) % A.length;
      g.scrollTo({
        left: A[v].offsetLeft - g.offsetLeft,
        behavior: "smooth",
      });
      r(v);
    };
  ee.useEffect(() => {
    const p = i.current;
    if (!p) return;
    const g = () => {
      const A = [...p.querySelectorAll(".tcard")],
        v = p.scrollLeft;
      let w = 0;
      A.forEach((B, y) => {
        if (Math.abs(B.offsetLeft - p.offsetLeft - v) < Math.abs(A[w].offsetLeft - p.offsetLeft - v)) w = y;
      });
      r(w);
    };
    p.addEventListener("scroll", g, {
      passive: true,
    });
    return () => p.removeEventListener("scroll", g);
  }, []);
  ee.useEffect(() => {
    if (c || prefersReducedMotion()) return;
    const p = setInterval(() => {
      const g = i.current;
      if (!g) return;
      const A = g.scrollLeft + g.clientWidth >= g.scrollWidth - 8;
      u(A ? 0 : o + 1);
    }, 5200);
    return () => clearInterval(p);
  }, [c, o]);
  return (
    <section
      className={`section testi ${tint ? "section--tint" : ""}`}
      aria-labelledby={`testi-${vertical || "all"}`}
      onMouseEnter={() => d(true)}
      onMouseLeave={() => d(false)}
      onFocus={() => d(true)}
      onBlur={() => d(false)}
    >
      <div className="container">
        <div className="testi__head">
          <div>
            <h2 id={`testi-${vertical || "all"}`}>{title}</h2>
            <p>{intro}</p>
            <p className="testi__note">
              Names shown are placeholders. Client identities are withheld for confidentiality.
            </p>
          </div>
        </div>
        <div className="testi__track" ref={i}>
          {s.map((p, g) => {
            const A = findVertical(p.vertical);
            return (
              <figure className={`tcard tone-${A.color}`} key={g}>
                <div className="tcard__top">
                  <span className="testi__stars" aria-label={`${p.rating} out of 5 stars`}>
                    {"★".repeat(p.rating)}
                  </span>
                  <span className="pill">{A.name}</span>
                </div>
                <blockquote>“{p.quote}”</blockquote>
                <figcaption>
                  <span className="tcard__avatar" aria-hidden="true">
                    {p.name
                      .split(" ")
                      .map((v) => v[0])
                      .slice(0, 2)
                      .join("")}
                  </span>
                  <span>
                    <strong>{p.name}</strong>
                    <small>{p.role}</small>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="testi__nav">
          <button className="round" onClick={() => u(o - 1)} aria-label="Previous testimonial">
            ‹
          </button>
          <div className="dots">
            {s.map((p, g) => (
              <button
                className={`dot ${g === o ? "is-on" : ""}`}
                onClick={() => u(g)}
                aria-label={`Show testimonial ${g + 1}`}
                aria-current={g === o}
                key={g}
              />
            ))}
          </div>
          <button className="round" onClick={() => u(o + 1)} aria-label="Next testimonial">
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
const CP_ORBIT = [
  ["users", "Demographics"],
  ["leaf", "Lifestyle"],
  ["cart", "Shopping"],
  ["cpu", "Technology"],
  ["car", "Automotive"],
  ["food", "Food & Beverage"],
  ["heart", "Healthcare"],
  ["plane", "Travel"],
  ["wallet", "Finance"],
  ["tv", "Media"],
  ["store", "Retail"],
];
function CP_Hero() {
  const cx = 260,
    cy = 235,
    R = 178;
  return (
    <div className="cp-eco">
      <svg
        viewBox="-50 0 620 470"
        className="cp-eco__svg"
        role="img"
        aria-label="Consumer panel ecosystem: profiled consumers connected to demographic, lifestyle, shopping, technology, automotive, food and beverage, healthcare, travel, finance, media and retail attributes"
      >
        <circle cx={cx} cy={cy} r={R} className="cp-eco__orbit" />
        <circle cx={cx} cy={cy} r={R - 62} className="cp-eco__orbit cp-eco__orbit--in" />
        {CP_ORBIT.map(([ic, t], i) => {
          const a = ((-90 + i * (360 / CP_ORBIT.length)) * Math.PI) / 180;
          const x = cx + R * Math.cos(a),
            y = cy + R * Math.sin(a);
          const right = Math.cos(a) > 0.2,
            left = Math.cos(a) < -0.2;
          return (
            <g
              key={t}
              className="cp-eco__node"
              style={{
                animationDelay: 0.15 + i * 0.09 + "s",
              }}
            >
              <line
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                className="cp-eco__spoke"
                style={{
                  animationDelay: i * 0.4 + "s",
                }}
              />
              <circle cx={x} cy={y} r="19" className="cp-eco__dot" />
              {ee.createElement(
                "foreignObject",
                {
                  x: x - 9,
                  y: y - 9,
                  width: "18",
                  height: "18",
                },
                <RC_I n={ic} s={18} />,
              )}
              <text
                x={right ? x + 26 : left ? x - 26 : x}
                y={left || right ? y + 4 : y < cy ? y - 27 : y + 34}
                textAnchor={right ? "start" : left ? "end" : "middle"}
                className="cp-eco__lbl"
              >
                {t}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r="86" className="cp-eco__core" />
        <circle cx={cx} cy={cy} r="86" className="cp-eco__pulse" />
        {[-34, 0, 34].map((dx, i) => (
          <g key={i} className="cp-eco__person" transform={`translate(${cx + dx} ${cy - 18 + (i === 1 ? -6 : 0)})`}>
            <circle cx="0" cy="-12" r={i === 1 ? 11 : 9} />
            <path d={i === 1 ? "M-19 24a19 19 0 0 1 38 0z" : "M-15 22a15 15 0 0 1 30 0z"} />
          </g>
        ))}
        <text x={cx} y={cy + 36} textAnchor="middle" className="cp-eco__ct">
          CONSUMER
        </text>
        <text x={cx} y={cy + 52} textAnchor="middle" className="cp-eco__ct">
          PANEL
        </text>
      </svg>
      <div className="cp-eco__card cp-eco__card--a">
        <span className="cp-eco__ck">Profile card</span>
        <div className="cp-eco__chips">
          <i>
            <RC_I n="check" s={11} />
            Demographics
          </i>
          <i>
            <RC_I n="check" s={11} />
            Lifestyle
          </i>
          <i>
            <RC_I n="check" s={11} />
            Category user
          </i>
        </div>
      </div>
      <div className="cp-eco__card cp-eco__card--b">
        <span className="cp-eco__ck">Verified</span>
        <div className="cp-eco__chips">
          <i>
            <RC_I n="shield" s={11} />
            Double opt-in
          </i>
          <i>
            <RC_I n="shield" s={11} />
            Quality checks
          </i>
        </div>
      </div>
      <ol className="cp-eco__flow">
        {["People", "Profiles", "Research", "Insights"].map((t, i) => (
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
function CP_Why() {
  const [ref, v] = RC_useInView(0.3);
  const row = (items, good) => (
    <div className={"cp-why__row" + (good ? " cp-why__row--good" : "")}>
      <span className="cp-why__tag">{good ? "With targeted, quality-controlled sampling" : "Without it"}</span>
      <ol>
        {items.map(([ic, t], i) => (
          <li
            key={t}
            style={{
              "--i": i + (good ? 3 : 0),
            }}
          >
            <span className="cp-why__ic">
              <RC_I n={ic} s={20} />
            </span>
            <strong>{t}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
  return (
    <div ref={ref} className={"cp-why" + (v ? " is-in" : "")}>
      {row(
        [
          ["userx", "Wrong audience"],
          ["alert", "Weak data"],
          ["down", "Weak decisions"],
        ],
        false,
      )}
      {row(
        [
          ["target", "Right audience"],
          ["okc", "Quality responses"],
          ["bulb", "Reliable insights"],
        ],
        true,
      )}
    </div>
  );
}
function CP_Panels() {
  const Logo = PanelMark;
  const panels = ["turn2opinion", "myfrequentrewards"].map((s) => PORTALS.find((p) => p.slug === s)).filter(Boolean);
  const flow = [
    ["userplus", "Recruitment"],
    ["layers", "Profiling"],
    ["shield", "Verification"],
    ["clipboard", "Research participation"],
    ["gift", "Rewards"],
  ];
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"cp-pan" + (v ? " is-in" : "")}>
      <div className="cp-pan__sources">
        {panels.map((p) => (
          <Link key={p.slug} to={`/portals/${p.slug}`} className="cp-pan__src hcard">
            <span className="cp-pan__logo">
              <Logo p={p} size="lg" />
            </span>
            <span className="cp-pan__name">{p.name}</span>
            <span className="cp-pan__aud">{p.audience}</span>
            <span className="cp-pan__go">
              {"Visit panel page "}
              <RC_I n="arrow" s={14} />
            </span>
          </Link>
        ))}
      </div>
      <div className="cp-pan__pipe" aria-hidden="true">
        <span />
      </div>
      <ol className="cp-pan__flow">
        {flow.map(([ic, t], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="cp-pan__dot">
              <RC_I n={ic} s={20} />
            </span>
            <span className="cp-pan__n">0{i + 1}</span>
            <strong>{t}</strong>
          </li>
        ))}
      </ol>
    </div>
  );
}
const CP_REG = [
  ["Americas", -95, 30, "am"],
  ["Europe", 12, 50, "eu"],
  ["MENA", 42, 25, "mena"],
  ["Asia-Pacific", 110, 15, "apac"],
];
function CP_Coverage() {
  const [ref, v] = RC_useInView(0.3);
  const [on, setOn] = ee.useState(-1);
  return (
    <div ref={ref} className={"cp-cov" + (v ? " is-in" : "")}>
      <div className="cp-cov__stat">
        <OD_Count to={55} suf="+" />
        <span>markets for consumer research</span>
        <p>
          Single-market studies and multi-country programmes across four regions. Tell us your markets and we will
          confirm feasibility before you commit.
        </p>
        <div className="cp-cov__regs">
          {CP_REG.map(([t, , , k], i) => (
            <button
              key={k}
              className={"cp-cov__reg cp-cov__reg--" + k + (on === i ? " is-on" : "")}
              onMouseEnter={() => setOn(i)}
              onMouseLeave={() => setOn(-1)}
              onFocus={() => setOn(i)}
              onBlur={() => setOn(-1)}
            >
              <i />
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="cp-cov__map">
        <svg
          viewBox={`0 0 ${OD_WORLD.W} ${OD_WORLD.H}`}
          role="img"
          aria-label="World map highlighting the Americas, Europe, MENA and Asia-Pacific regions"
        >
          <path d={OD_WORLD.d} className="od-dots od-dots--soft" />
          {CP_REG.map(([t, lon, lat, k], i) => {
            const [x, y] = odP(lon, lat);
            return (
              <g
                key={k}
                className={
                  "cp-cov__mk cp-cov__mk--" + k + (on === -1 || on === i ? "" : " is-dim") + (on === i ? " is-on" : "")
                }
                style={{
                  transitionDelay: i * 0.2 + "s",
                }}
              >
                <circle cx={x} cy={y} r="70" className="cp-cov__halo" />
                <circle cx={x} cy={y} r="10" className="cp-cov__pt" />
                <circle
                  cx={x}
                  cy={y}
                  r="10"
                  className="cp-cov__ping"
                  style={{
                    animationDelay: i * 0.7 + "s",
                  }}
                />
                <text x={x} y={y - 22} textAnchor="middle" className="cp-cov__lbl">
                  {t}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="cp-cov__card cp-cov__card--a">
          <RC_I n="target" s={16} />
          <span>Single-market studies</span>
        </div>
        <div className="cp-cov__card cp-cov__card--b">
          <RC_I n="globe" s={16} />
          <span>Multi-country trackers</span>
        </div>
      </div>
    </div>
  );
}
const CP_PROF = [
  ["Demographics", "users", "#0B22A8", ["Gender", "Age", "Marital Status", "Primary Language", "Ethnicity", "Country"]],
  ["Household & Financial", "home", "#1E5BFF", ["Household", "Business", "Financial", "Education", "Parenting"]],
  [
    "Lifestyle",
    "leaf",
    "#0E9C88",
    [
      "Lifestyle & Entertainment",
      "Food & Beverage",
      "Smoking & Tobacco",
      "Health, Fitness & Medical",
      "Beauty & Fashion",
      "Travel",
      "Sports",
      "Pets",
    ],
  ],
  [
    "Consumer & Technology",
    "cart",
    "#5F86FF",
    [
      "Shopping",
      "Stores & Restaurants",
      "Automotive",
      "Car Ownership",
      "Electronics & Technology",
      "Computers & Internet",
      "Mobile & Technology",
      "Computer & Video Games",
    ],
  ],
  ["Media & Environment", "tv", "#E3A013", ["Media & Television", "Market Research", "Environment / Green"]],
];
function CP_Profile() {
  const [a, setA] = ee.useState(0);
  const [ref, v] = RC_useInView(0.3);
  const total = CP_PROF.reduce((s, c2) => s + c2[3].length, 0);
  const cx = 160,
    cy = 160,
    R = 120,
    r = 74;
  let acc = 0;
  const arcs = CP_PROF.map((c2, i) => {
    const s = (acc / total) * 2 * Math.PI - Math.PI / 2;
    acc += c2[3].length;
    const e = (acc / total) * 2 * Math.PI - Math.PI / 2 - 0.025;
    const p = (rad, t) => [cx + rad * Math.cos(t), cy + rad * Math.sin(t)];
    const big = e - s > Math.PI ? 1 : 0;
    const [x1, y1] = p(R, s + 0.012),
      [x2, y2] = p(R, e),
      [x3, y3] = p(r, e),
      [x4, y4] = p(r, s + 0.012);
    return `M${x1} ${y1} A${R} ${R} 0 ${big} 1 ${x2} ${y2} L${x3} ${y3} A${r} ${r} 0 ${big} 0 ${x4} ${y4} Z`;
  });
  const c = CP_PROF[a];
  return (
    <div ref={ref} className={"cp-prof" + (v ? " is-in" : "")}>
      <div className="cp-prof__chart">
        <svg
          viewBox="0 0 320 320"
          role="group"
          aria-label={`Donut chart: ${total} profiling dimensions across ${CP_PROF.length} categories`}
        >
          {CP_PROF.map((cat, i) => (
            <path
              key={cat[0]}
              d={arcs[i]}
              fill={cat[2]}
              className={"cp-prof__seg" + (a === i ? " is-on" : "")}
              style={{
                "--i": i,
              }}
              tabIndex="0"
              role="button"
              aria-pressed={a === i}
              aria-label={`${cat[0]}: ${cat[3].length} dimensions`}
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
              onClick={() => setA(i)}
            />
          ))}
          <text x={cx} y={cy - 4} textAnchor="middle" className="cp-prof__big">
            {total}
          </text>
          <text x={cx} y={cy + 18} textAnchor="middle" className="cp-prof__sm">
            profiling
          </text>
          <text x={cx} y={cy + 33} textAnchor="middle" className="cp-prof__sm">
            dimensions
          </text>
        </svg>
        <ul className="cp-prof__legend">
          {CP_PROF.map((cat, i) => (
            <li key={cat[0]}>
              <button className={a === i ? "is-on" : ""} onClick={() => setA(i)} onMouseEnter={() => setA(i)}>
                <i
                  style={{
                    background: cat[2],
                  }}
                />
                {cat[0]}
                <b>{cat[3].length}</b>
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div
        className="cp-prof__panel"
        key={a}
        style={{
          "--c": c[2],
        }}
      >
        <span className="cp-prof__ic">
          <RC_I n={c[1]} s={24} />
        </span>
        <h3>{c[0]}</h3>
        <p>
          {c[3].length}
          {
            " profiling dimensions in this category. Combine them with any other category to define your sample precisely."
          }
        </p>
        <ul>
          {c[3].map((x, i) => (
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
      </div>
      <div className="cp-prof__acc">
        {CP_PROF.map((cat, i) => (
          <details key={cat[0]} open={i === 0}>
            <summary>
              <i
                style={{
                  background: cat[2],
                }}
              />
              {cat[0]}
              <b>{cat[3].length}</b>
            </summary>
            <ul>
              {cat[3].map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </div>
  );
}
const CP_QC = [
  [
    "Identity & Access",
    "key",
    "Confirms that each member is a real, reachable person before they can join.",
    [
      ["mail", "Double Opt-In"],
      ["mail", "Email Verification"],
      ["mobile", "Phone Authentication"],
      ["bot", "CAPTCHA"],
      ["lock", "Security Questions"],
    ],
  ],
  [
    "Fraud & Duplicate Detection",
    "finger",
    "Stops the same person, device or bot entering a study more than once.",
    [
      ["finger", "Browser Fingerprinting"],
      ["copy", "Duplicate Detection"],
      ["globe", "GEO-IP Validation"],
      ["eyeoff", "TOR Detection"],
      ["cookie", "Cookie Validation"],
      ["lock", "URL Protection"],
    ],
  ],
  [
    "Respondent Validation",
    "okc",
    "Checks that respondents match the profile and criteria the study needs.",
    [
      ["cal", "Age Validation"],
      ["timer", "Timezone Validation"],
      ["lang", "Browser Language"],
      ["list", "Gate Survey Screening"],
      ["filter", "Pre-Screening Filters"],
      ["help", "Screening Questions"],
    ],
  ],
  [
    "Response Quality",
    "pulse",
    "Reviews answers during and after fieldwork, followed by manual cleaning.",
    [
      ["edit", "Open-End Quality Checks"],
      ["alert", "Red Herring Questions"],
      ["eye", "Engagement Monitoring"],
      ["bars", "Data Reliability Indicators"],
    ],
  ],
];
function CP_Quality() {
  const [open, setOpen] = ee.useState(0);
  return (
    <div className="cp-qc">
      {CP_QC.map(([t, ic, d, xs], i) => (
        <RC_Reveal
          key={t}
          className={"cp-qc__col hcard" + (open === i ? " is-open" : "")}
          style={{
            "--i": i,
          }}
        >
          <button className="cp-qc__head" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="cp-qc__ic">
              <RC_I n={ic} s={22} />
            </span>
            <span className="cp-qc__t">
              <small>0{i + 1}</small>
              {t}
            </span>
            <span className="cp-qc__tog" aria-hidden="true">
              <RC_I n="plus" s={16} />
            </span>
          </button>
          <div className="cp-qc__body">
            <p>{d}</p>
            <ul>
              {xs.map(([ic2, x]) => (
                <li key={x}>
                  <RC_I n={ic2} s={15} />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </RC_Reveal>
      ))}
    </div>
  );
}
function CP_Score() {
  const [ref, v] = RC_useInView(0.3);
  const ins = [
    ["user", "Profile completeness"],
    ["clock", "Participation history"],
    ["pulse", "Engagement consistency"],
    ["bars", "Data reliability indicators"],
  ];
  return (
    <div ref={ref} className={"cp-score" + (v ? " is-in" : "")}>
      <div className="cp-score__ins">
        {ins.map(([ic, t], i) =>
          ee.createElement(
            ee.Fragment,
            {
              key: t,
            },
            i > 0 && (
              <span className="cp-score__plus" aria-hidden="true">
                +
              </span>
            ),
            <div
              className="cp-score__in"
              style={{
                "--i": i,
              }}
            >
              <RC_I n={ic} s={18} />
              <span>{t}</span>
            </div>,
          ),
        )}
      </div>
      <div className="cp-score__arrow" aria-hidden="true" />
      <div className="cp-score__mid">
        <RC_I n="sliders" s={20} />
        <strong>Dynamic quality assessment</strong>
        <span>Continuously updated as members participate</span>
      </div>
      <div className="cp-score__arrow" aria-hidden="true" />
      <div className="cp-score__out">
        <RC_I n="okc" s={20} />
        <strong>Eligible / prioritized research participation</strong>
      </div>
      {null}
    </div>
  );
}
const CP_REC = [
  ["edit", "Free Registration", "Members register through the secure panel platform."],
  ["user", "Profile Complete", "Members complete relevant profile information."],
  ["clipboard", "Survey Participation", "Eligible members receive surveys matching relevant criteria."],
  ["target", "Threshold Achieve", "Participants accumulate reward points through eligible participation."],
  ["coins", "Rewards Credit", "Points become eligible for redemption once requirements are met."],
  ["gift", "Rewards Points Claimed", "Eligible participants redeem available rewards."],
];
function CP_Recruit() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <ol ref={ref} className={"cp-rec" + (v ? " is-in" : "")}>
      <div className="cp-rec__line" aria-hidden="true">
        <span />
      </div>
      {CP_REC.map(([ic, t, d], i) => (
        <li
          key={t}
          style={{
            "--i": i,
          }}
        >
          <span className="cp-rec__dot">
            <RC_I n={ic} s={20} />
          </span>
          <span className="cp-rec__n">0{i + 1}</span>
          <strong>{t}</strong>
          <p>{d}</p>
        </li>
      ))}
    </ol>
  );
}
const CP_WF = [
  ["Understand", "Clarify business decision, audience and constraints."],
  ["Design", "Develop methodology, questionnaire or discussion guide, and quotas."],
  ["Sample", "Check feasibility and recruit appropriate respondents."],
  ["Collect", "Conduct online, CATI, face-to-face or qualitative fieldwork where relevant."],
  ["Process", "Clean, code, weight and quality-check the data."],
  ["Analyze", "Analyze data and identify meaningful patterns."],
  ["Deliver Insights", "Present clear findings and recommendations."],
];
function CP_Workflow() {
  const [a, setA] = ee.useState(-1);
  const [ref, v] = RC_useInView(0.3);
  return (
    <div ref={ref} className={"cp-wf" + (v ? " is-in" : "")}>
      <div className="cp-wf__bar" aria-hidden="true">
        <span />
      </div>
      <ol>
        {CP_WF.map(([t, d], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
            className={a === i ? "is-on" : ""}
            onMouseEnter={() => setA(i)}
            onMouseLeave={() => setA(-1)}
            tabIndex="0"
            onFocus={() => setA(i)}
            onBlur={() => setA(-1)}
          >
            <span className="cp-wf__n">{String(i + 1).padStart(2, "0")}</span>
            <strong>{t}</strong>
            <p>{d}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
function CP_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm,
    Quotes = ClientReviews,
    Guide = GuideLink,
    Cta = CtaSection;
  const [active, setActive] = ee.useState("cp-overview");
  const [moreInd, setMoreInd] = ee.useState(false);
  const [cmpOpen, setCmpOpen] = ee.useState(0);
  const nav = [
    ["cp-overview", "Overview"],
    ["cp-panels", "Our panels"],
    ["cp-coverage", "Coverage"],
    ["cp-profiling", "Profiling"],
    ["cp-quality", "Quality"],
    ["cp-process", "Process"],
    ["cp-why", "Why us"],
    ["cp-faq", "FAQ"],
    ["cp-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is a consumer panel?",
      a: "A consumer panel is a community of people who have agreed to take part in research and have shared profile information about themselves, such as demographics, household, lifestyle and the products they buy. Researchers use the panel to reach the right consumers quickly, rather than recruiting from scratch for every study.",
    },
    {
      q: "What is included in your Consumer Panel service?",
      a: "Access to profiled consumers from our own communities, Turn2Opinion and MyFrequentRewards; targeting by demographic, lifestyle and category attributes; feasibility checks; fieldwork management; layered quality controls; and cleaned data. One point of contact stays with you from brief to delivery.",
    },
    {
      q: "How does consumer panel research work?",
      a: "You share your target audience, markets and sample size. We check feasibility against panel profiles, invite matching members, screen them against your criteria, monitor quotas during fieldwork and remove poor-quality responses before delivering the data.",
    },
    {
      q: "How quickly can you provide consumer research feasibility?",
      a: "For most online consumer studies we come back within one working day with feasibility and a cost estimate. Harder-to-reach audiences or multi-country studies can take a little longer, because we check real availability before confirming.",
    },
    {
      q: "Which countries can you cover?",
      a: "We support consumer research in 55+ markets across the Americas, Europe, Asia-Pacific and MENA. Tell us your markets and we will confirm coverage and feasibility for each one.",
    },
    {
      q: "How do you verify and screen consumer respondents?",
      a: "Members join through double opt-in and email verification, with checks such as phone authentication, CAPTCHA and security questions. During studies we apply fraud and duplicate detection, profile and screening checks, and response-quality reviews including open-end checks and red herring questions.",
    },
    {
      q: "What consumer attributes can be used for targeting?",
      a: "Thirty profiling dimensions across demographics, household and financial characteristics, lifestyle, shopping and technology, and media. Examples include age, gender, household, parenting, food and beverage, automotive and car ownership, electronics, travel and media habits.",
    },
    {
      q: "How much does consumer panel research cost?",
      a: "Cost depends mainly on the audience's incidence, sample size, interview length and markets. We share a clear quote after a feasibility check, usually within one working day, and the first consultation is free.",
    },
    {
      q: "Can you support multi-country consumer research?",
      a: "Yes. We run single-market and multi-country consumer studies with consistent screening, quotas and quality controls across markets, coordinated through one point of contact.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/consumer-panel";
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
    const title = "Consumer Panel Research & Sampling | Frequent Research";
    const desc =
      "Reach profiled consumers in 55+ markets with Frequent Research's consumer panel: targeted sampling, layered quality controls and fast feasibility.";
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
          ["Services", "/services"],
          ["Market Research", "/services/market-research"],
          ["Consumer Panel", "/services/market-research/consumer-panel"],
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
        name: "Consumer Panel",
        serviceType: "Consumer panel research and sampling",
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
  const extra = INDUSTRIES.filter((x) => !SERVICE_INDUSTRIES.includes(x.slug));
  const svc = (s, label) => <Link to={`/services/market-research/${s}`}>{label}</Link>;
  return (
    <div className="cp rc">
      <section className="cp-hero">
        <div className="container cp-hero__in">
          <div className="cp-hero__copy">
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
              Market Research · Panels
            </span>
            <HeroH1>Consumer Panel</HeroH1>
            <p className="cp-hero__sub">
              Profiled consumers ready to share opinions on products, brands, behaviors and experiences.
            </p>
            <p className="cp-hero__body">
              Frequent Research gives you access to verified, profiled consumers for market research and survey
              requirements, delivered by our Market Research team with one point of contact from start to finish.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg od-btn-main" href="#cp-enquire" onClick={rcScrollTo("cp-enquire")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
            <Link className="cp-hero__link" to="/lets-talk?type=audience">
              {"Check Audience Feasibility "}
              <RC_I n="arrow" s={15} />
            </Link>
          </div>
          <div className="cp-hero__viz">
            <CP_Hero />
          </div>
        </div>
        <div className="container">
          <ul className="cp-stats" aria-label="Consumer panel at a glance">
            <li>
              <OD_Count to={55} suf="+" />
              <span>Markets</span>
            </li>
            <li>
              <OD_Count to={30} />
              <span>Profiling dimensions</span>
            </li>
            <li>
              <OD_Count to={20} suf="+" />
              <span>Quality controls</span>
            </li>
            <li>
              <OD_Count to={2} />
              <span>Own panel communities</span>
            </li>
            <li>
              <strong className="od-count">1</strong>
              <span>Point of contact, brief to delivery</span>
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
      <section className="rc-sec" id="cp-overview">
        <div className="container">
          <div className="od-split">
            <RC_Head kicker="Consumer panel research" title="The right consumers, profiled before your study starts" />
            <div className="cp-intro">
              <p className="rc-lead">
                Our consumer panel is an online community of people who have agreed to take part in research and told us
                about themselves: who they are, how they live, what they buy and which brands and categories they use.
              </p>
              <p className="od-muted">
                {
                  "Brands, research agencies, consultancies and institutions use it to reach consumer respondents without recruiting from scratch. Because members are profiled across 30 dimensions, we can invite the people who fit your criteria, keep screen-outs low and fill quotas faster. We check feasibility, manage fieldwork, apply quality controls throughout and deliver clean data. Pair the panel with "
                }
                {svc("online-data-collection", "online data collection")}
                {" or "}
                {svc("quantitative-research", "quantitative research design")}
                {" for a complete study."}
              </p>
            </div>
          </div>
          <RC_Head
            kicker="Why it matters"
            title="Why consumer panel research matters"
            intro="Research quality depends heavily on reaching the right audience and applying appropriate sampling and quality controls."
          />
          <CP_Why />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <RC_Head center kicker="Consumer panel services" title="What our consumer panel provides" />
          <div className="cp-prov">
            {[
              [
                "layers",
                "Demographic & Lifestyle Profiling",
                "Profile consumers using demographic, household, lifestyle and behavioral characteristics.",
                ["Age & gender", "Household", "Lifestyle"],
              ],
              [
                "cart",
                "Category Users & Buyers",
                "Reach consumers based on product usage, purchase behavior and category experience.",
                ["Product usage", "Purchase behavior", "Category experience"],
              ],
              [
                "mobile",
                "Mobile-First Research",
                "Support convenient participation across modern digital devices.",
                ["Phone", "Tablet", "Desktop"],
              ],
              [
                "zap2",
                "Fast Research Execution",
                "Support efficient recruitment and fieldwork for trackers and research projects.",
                ["Trackers", "Ad hoc studies", "Quick turnarounds"],
              ],
            ].map(([ic, t, d, tags], i) => (
              <RC_Reveal
                as="article"
                key={t}
                className="cp-prov__card hcard"
                style={{
                  "--i": i,
                }}
              >
                <span className="cp-prov__ic">
                  <RC_I n={ic} s={24} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
                <ul>
                  {tags.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </RC_Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec" id="cp-panels">
        <div className="container">
          <RC_Head
            kicker="Panel ecosystem"
            title="Powered by Our Research Panels"
            intro="We recruit from our own research communities, so we know who our respondents are, how they joined and how they were verified."
          />
          <CP_Panels />
        </div>
      </section>
      <section className="rc-sec rc-sec--tint" id="cp-coverage">
        <div className="container">
          <RC_Head kicker="Global coverage" title="Consumer research across 55+ markets" />
          <CP_Coverage />
        </div>
      </section>
      <section className="rc-sec" id="cp-profiling">
        <div className="container">
          <RC_Head
            kicker="Consumer sampling"
            title="Advanced Consumer Profiling & Segmentation"
            intro="Panel members are profiled across demographic, socioeconomic, behavioral, lifestyle and category-specific characteristics. Select a category to see its dimensions."
          />
          <CP_Profile />
        </div>
      </section>
      <section className="rc-sec od-sec--q" id="cp-quality">
        <div className="container">
          <RC_Head
            kicker="Data quality"
            title="Quality Controls Built Into Fieldwork"
            intro="Identity checks, fraud screening and manual cleaning, organised into four layers of protection. Controls are applied according to each study's requirements."
          />
          <CP_Quality />
          <div className="cp-scorewrap">
            <div>
              <span className="rc-kicker">Quality score</span>
              <h3>How respondents are assessed and prioritized</h3>
              <p className="od-muted">
                Each member's record builds over time. Profile completeness, participation history, engagement and
                reliability signals feed an ongoing assessment, which decides who is eligible and prioritized for new
                studies.
              </p>
              <p className="od-muted">
                {"Our processes follow research industry standards such as ISO 20252 and the codes of "}
                <a href="https://esomar.org/" target="_blank" rel="noopener noreferrer">
                  ESOMAR
                </a>
                , of which we are a corporate member.
              </p>
            </div>
            <CP_Score />
          </div>
        </div>
      </section>
      <section className="cp-mid">
        <div className="container cp-mid__in">
          <div>
            <strong>Not sure your audience is reachable?</strong>
            <span>
              Share your target consumers and markets. We will check real availability in the panel and come back with
              feasibility, usually within one working day.
            </span>
          </div>
          <Link to="/lets-talk?type=audience" className="btn btn--light btn--lg">
            Check Audience Feasibility
          </Link>
        </div>
      </section>
      <section className="rc-sec" id="cp-process">
        <div className="container">
          <RC_Head kicker="Panel recruitment" title="How Consumer Panel Recruitment Works" />
          <CP_Recruit />
          <div className="cp-rew">
            <div className="cp-rew__copy">
              <span className="rc-kicker">Rewards</span>
              <h3>A clear incentive structure keeps members engaged</h3>
              <div className="cp-rew__flow">
                {[
                  ["clipboard", "Participation"],
                  ["coins", "Reward points"],
                  ["target", "Threshold"],
                  ["gift", "Redemption"],
                ].map(([ic, t], i) =>
                  ee.createElement(
                    ee.Fragment,
                    {
                      key: t,
                    },
                    i > 0 && <RC_I n="arrow" s={16} className="cp-rew__arr" />,
                    <span>
                      <RC_I n={ic} s={16} />
                      {t}
                    </span>,
                  ),
                )}
              </div>
              <p className="od-muted">
                Members redeem once they reach the minimum threshold set in each panel's terms. Available methods vary
                by country and panel.
              </p>
            </div>
            <ul className="cp-rew__methods">
              {[
                ["wallet", "PayPal", "Where available"],
                ["gift", "Gift vouchers", "Including Amazon gift cards"],
                ["coins", "Bank / wire transfer", "Where available"],
                ["mobile", "UPI", "Subject to country regulations"],
              ].map(([ic, t, d]) => (
                <li key={t} className="hcard">
                  <RC_I n={ic} s={20} />
                  <strong>{t}</strong>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec od-sec--navy">
        <div className="container">
          <RC_Head
            light
            kicker="How we work"
            title="From brief to insight in seven stages"
            intro={
              <>
                {"Every consumer panel project follows the same disciplined workflow. Learn more about our "}
                {svc("research-design-cycle", "research design cycle")}.
              </>
            }
          />
          <CP_Workflow />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Research needs" title="Consumer Panel Support Across Research Needs" />
          <div className="cp-cmp" role="table" aria-label="Consumer panel support across research needs">
            <div className="cp-cmp__row cp-cmp__row--h" role="row">
              <span role="columnheader">Research need</span>
              <span role="columnheader">Consumer panel contribution</span>
              <span role="columnheader">Typical audience signal</span>
            </div>
            {[
              ["box", "Product Research", "Reach relevant product users and buyers", "Usage / purchase"],
              ["award", "Brand Research", "Recruit target consumers", "Brand / category experience"],
              ["msg", "Customer Experience", "Reach consumers with relevant experiences", "Customer status"],
              ["bulb", "Concept Testing", "Recruit defined target audiences", "Demographic + behavioral"],
              ["refresh", "Tracking Studies", "Support repeat research audiences", "Profile + eligibility"],
              ["globe", "Market Expansion", "Support research across markets", "Country / region"],
            ].map(([ic, t, c, s], i) => (
              <div key={t} className={"cp-cmp__row" + (cmpOpen === i ? " is-open" : "")} role="row">
                <button
                  className="cp-cmp__need"
                  role="rowheader"
                  aria-expanded={cmpOpen === i}
                  onClick={() => setCmpOpen(cmpOpen === i ? -1 : i)}
                >
                  <RC_I n={ic} s={18} />
                  {t}
                </button>
                <span role="cell" data-l="Contribution">
                  {c}
                </span>
                <span role="cell" data-l="Audience signal" className="cp-cmp__sig">
                  {s}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries we support" />
          <div className="rc-ind">
            {inds.map((o) => (
              <Link key={o.slug} className="rc-ind__item hcard" to={`/industries-case-studies/${o.slug}`}>
                <IndustryIcon name={o.icon} size={20} />
                <span>{o.name}</span>
              </Link>
            ))}
            {moreInd &&
              extra.map((o) => (
                <Link
                  key={o.slug}
                  className="rc-ind__item rc-ind__item--x hcard"
                  to={`/industries-case-studies/${o.slug}`}
                >
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
        <div className="container cp-team">
          <div>
            <RC_Head kicker="People" title="The Team Behind Your Consumer Research" />
            <p className="od-muted">
              Every project is run by specialists, not a self-serve tool. One named contact coordinates the team from
              brief to delivery.
            </p>
            <div className="cp-tech">
              <span className="rc-kicker">Technology</span>
              <div className="rc-tech__tiles">
                <Link to="/products" className="rc-tech__tile rc-tech__tile--own">
                  <strong>Sampledge</strong>
                  <span>Sample management</span>
                </Link>
                {["Survey platforms", "Data processing", "Statistical analysis", "Dashboards", "Reporting"].map((t) => (
                  <span key={t} className="rc-tech__tile">
                    <strong>{t}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="cp-roles">
            {[
              ["compass", "Research Consultants", "Frame the question and design the study"],
              ["users", "Panel & Sampling Managers", "Feasibility, invitations and quotas"],
              ["cpu", "Survey Programmers", "Build and test the questionnaire"],
              ["msg", "Field Supervisors & Moderators", "Run fieldwork and qualitative sessions"],
              ["bars", "Data Processing & Analytics Specialists", "Clean, tabulate and analyze the data"],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="cp-role hcard"
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
        </div>
      </section>
      <section className="rc-sec rc-sec--tint">
        <div className="container">
          <div className="cp-case">
            <div className="cp-case__head">
              <span className="rc-kicker">Example engagement</span>
              <h2>How a typical project looks</h2>
              <Link to="/industries-case-studies" className="rc-link">
                {"See Case Studies "}
                <RC_I n="arrow" s={15} />
              </Link>
            </div>
            <ol className="cp-case__steps">
              {[
                ["alert", "Challenge", "Hard-to-reach healthcare professionals across four countries."],
                ["clock", "Requirement", "Recruitment within a defined timeline."],
                ["phone", "Approach", "Mixed online and telephone research."],
                ["grid", "Delivery", "Cleaned data and country-level tables."],
              ].map(([ic, t, d], i) => (
                <RC_Reveal
                  as="li"
                  key={t}
                  style={{
                    "--i": i,
                  }}
                >
                  <span className="cp-case__ic">
                    <RC_I n={ic} s={18} />
                  </span>
                  <strong>{t}</strong>
                  <p>{d}</p>
                </RC_Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>
      <WU_Section slug="consumer-panel" id="cp-why" />
      <section className="section section--tint" id="cp-faq">
        <div className="container split">
          <h2 className="split__title">Consumer Panel: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="rc-sec cp-rel">
        <div className="container">
          <RC_Head kicker="Related services" title="Build a complete study around the panel" />
          <div className="cp-rel__grid">
            {[
              ["research-consultancy", "Research consultancy", "Frame the question and choose the right method"],
              ["online-data-collection", "Online data collection", "Survey hosting, sampling and fieldwork"],
              ["offline-data-collection", "Offline data collection", "CATI and face-to-face fieldwork"],
              ["business-panel", "Business panel", "Verified B2B decision-makers"],
              ["healthcare-panel", "Healthcare panel", "HCPs, patients and caregivers"],
              ["qualitative-research", "Qualitative research", "Interviews and focus groups"],
              ["cati", "CATI", "Computer-assisted telephone interviewing"],
              [
                "data-processing-and-analytics",
                "Data processing & analytics",
                "Cleaning, coding, weighting and tables",
              ],
              ["reporting-and-insights", "Reporting & insights", "Reports and debriefs that drive decisions"],
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
      <section className="od-cta" id="cp-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Contact</span>
            <h2>Talk to Our Research Team About Consumer Panel</h2>
            <p>
              Share your audience, market, sample or research requirement and our team will help determine the right
              approach, feasibility and next steps.
            </p>
            <ul className="cp-cta__pts">
              <li>
                <RC_I n="clock" s={16} />
                We reply within one working day.
              </li>
              <li>
                <RC_I n="okc" s={16} />
                The first consultation is free.
              </li>
              <li>
                <RC_I n="user" s={16} />
                One point of contact from brief to delivery.
              </li>
            </ul>
            <div className="od-cta__btns">
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk">
                Talk to Our Research Team
              </Link>
            </div>
          </div>
          <div className="card-form">
            <Form type="feasibility" service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
      <Cta
        title="Let's Find the Right Consumer Research Solution Together"
        text="Tell us what you're trying to achieve. Our research team will understand your requirement and suggest the appropriate audience, approach, scope and next steps."
        primary={{
          to: "/lets-talk",
          label: "Discuss Your Requirement",
        }}
        secondary={{
          to: "/lets-talk?type=quote",
          label: "Request a Quote",
        }}
      />
    </div>
  );
}

export { CP_Page, ClientReviews };
