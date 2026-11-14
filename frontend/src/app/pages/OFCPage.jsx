import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_P, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';

function OFC_HeroArt() {
  return (
    <div className="ofc-art">
      <svg
        viewBox="0 0 560 420"
        className="ofc-art__svg"
        role="img"
        aria-label="Illustration of a research interviewer conducting a tablet-based face-to-face interview with a respondent"
      >
        <defs>
          {ee.createElement(
            "linearGradient",
            {
              id: "ofcSky",
              x1: "0",
              y1: "0",
              x2: "0",
              y2: "1",
            },
            <stop offset="0" stopColor="#1A2F9E" />,
            <stop offset="1" stopColor="#0B1B7A" />,
          )}
          {ee.createElement(
            "linearGradient",
            {
              id: "ofcTab",
              x1: "0",
              y1: "0",
              x2: "1",
              y2: "1",
            },
            <stop offset="0" stopColor="#F5F7FB" />,
            <stop offset="1" stopColor="#C9D3F5" />,
          )}
        </defs>
        <rect x="0" y="0" width="560" height="420" rx="26" fill="url(#ofcSky)" />
        <g className="ofc-art__city">
          <path d="M20 300V230h50v70M70 300V200l40-30 40 30v100M150 300V240h60v60M380 300V210h70v90M450 300V180h36l24 20v100M510 300V236h34v64" />
          <path d="M84 232h16v20H84zM120 232h16v20h-16zM392 232h14M392 252h14M418 232h14M418 252h14M462 212h12M462 236h12" />
          <path d="M240 300c0-30 14-46 22-46s22 16 22 46M330 300c0-22 10-34 16-34s16 12 16 34" />
        </g>
        <rect x="0" y="300" width="560" height="120" className="ofc-art__floor" />
        <path d="M0 300h560" className="ofc-art__ground" />
        <g className="ofc-art__chair">
          <path d="M96 230v150M100 306h96M110 306v74M186 306v74" />
        </g>
        <g className="ofc-art__chair">
          <path d="M464 226v154M460 306h-96M450 306v74M374 306v74" />
        </g>
        <circle cx="470" cy="80" r="36" className="ofc-art__sun" />
        <rect x="190" y="292" width="180" height="10" rx="5" className="ofc-art__table" />
        <path d="M206 302v70M354 302v70" className="ofc-art__leg" />
        <g className="ofc-art__p ofc-art__p--r">
          <circle cx="150" cy="196" r="24" className="ofc-art__head" />
          <path d="M126 196c2-20 16-28 26-28s22 6 24 22c-12-6-30-6-50 6z" className="ofc-art__hair" />
          <path d="M104 300c0-48 20-76 46-76s46 28 46 76z" className="ofc-art__body" />
          <path d="M180 266c14 6 22 14 26 24" className="ofc-art__arm" />
          <path d="M128 302c0 20 4 30 0 64M168 302c4 20 6 30 4 64" className="ofc-art__leg2" />
          <path d="M118 368h18M164 368h18" className="ofc-art__shoe" />
        </g>
        <g className="ofc-art__p ofc-art__p--i">
          <circle cx="412" cy="190" r="24" className="ofc-art__head" />
          <path d="M388 188c0-18 12-28 24-28s24 10 24 26c-8-8-24-12-48 2z" className="ofc-art__hair ofc-art__hair--i" />
          <path d="M366 300c0-50 20-80 46-80s46 30 46 80z" className="ofc-art__body ofc-art__body--i" />
          <path d="M388 252c-12 10-20 22-24 34" className="ofc-art__arm" />
          <path d="M394 302c-2 20-4 30-2 64M432 302c0 20 2 30 0 64" className="ofc-art__leg2" />
          <path d="M384 368h18M424 368h18" className="ofc-art__shoe" />
          <g transform="translate(322 238) rotate(-12)">
            <rect width="62" height="44" rx="6" fill="url(#ofcTab)" className="ofc-art__tab" />
            <rect x="7" y="8" width="34" height="4" rx="2" className="ofc-art__tl" />
            <rect x="7" y="17" width="48" height="4" rx="2" className="ofc-art__tl2" />
            <rect x="7" y="26" width="26" height="4" rx="2" className="ofc-art__tl2" />
            <circle cx="50" cy="34" r="4" className="ofc-art__dot" />
          </g>
        </g>
        <path d="M196 214 C250 180 320 180 370 206" className="ofc-art__talk" />
        {[0, 1, 2].map((i) => (
          <circle key={i} r="3.5" className="ofc-art__pt">
            {ee.createElement("animateMotion", {
              dur: "3.6s",
              begin: i * 1.2 + "s",
              repeatCount: "indefinite",
              path: i === 1 ? "M370 206 C320 180 250 180 196 214" : "M196 214 C250 180 320 180 370 206",
            })}
          </circle>
        ))}
      </svg>
      <span className="ofc-chip ofc-chip--capi">
        <RC_I n="tablet" s={14} />
        CAPI
      </span>
      <span className="ofc-chip ofc-chip--int">
        <RC_I n="msg" s={14} />
        Field interview
      </span>
      <span className="ofc-chip ofc-chip--val">
        <RC_I n="okc" s={14} />
        Validated response
      </span>
      <span className="ofc-chip ofc-chip--gps">
        <RC_I n="pin" s={14} />
        GPS · time logged
      </span>
      {null}
    </div>
  );
}
const OFC_METHODS = [
  {
    k: "CAPI",
    t: "Computer-Assisted Personal Interviewing",
    ic: "tablet",
    d: "Modern face-to-face interviewing on tablets or mobile devices.",
    l: "Benefits",
    x: [
      "Real-time data capture",
      "Automated routing and skip logic",
      "Faster data transmission",
      "Less manual data entry",
      "GPS and timestamp validation where applicable",
      "Field monitoring",
    ],
  },
  {
    k: "PAPI",
    t: "Paper-Assisted Personal Interviewing",
    ic: "paper",
    d: "Paper-based interviewing for environments where digital collection may not be practical.",
    l: "Suitable for",
    x: ["Specific field environments", "Offline locations", "Specialised research requirements"],
  },
  {
    k: "In-Home",
    t: "In-Home Interviews",
    ic: "home",
    d: "Interviewers conduct the research directly in respondents' homes.",
    l: "Suitable for",
    x: [
      "Consumer research",
      "Product testing",
      "Household studies",
      "Financial research",
      "Healthcare research",
      "Lifestyle studies",
    ],
  },
  {
    k: "Central Location",
    t: "Central Location Interviews",
    ic: "building",
    d: "Qualified respondents are recruited and brought to a controlled research location.",
    l: "Ideal for",
    x: [
      "Product testing",
      "Concept testing",
      "Taste testing",
      "Packaging research",
      "Advertising research",
      "UX research",
    ],
  },
  {
    k: "Intercept",
    t: "Intercept Surveys",
    ic: "pin",
    d: "Field teams approach respondents at high-footfall locations.",
    l: "Example locations",
    x: [
      "Shopping malls",
      "Retail stores",
      "Airports",
      "Transport hubs",
      "Events",
      "Universities",
      "Commercial areas",
      "Public locations",
    ],
  },
  {
    k: "B2B Face-to-Face",
    t: "B2B Face-to-Face Interviews",
    ic: "brief",
    d: "Targeted face-to-face fieldwork among business and professional audiences.",
    l: "Potential audiences",
    x: [
      "Business owners",
      "CXOs",
      "Managers",
      "Procurement professionals",
      "Healthcare professionals",
      "IT professionals",
      "Industry specialists",
      "Channel partners",
    ],
  },
];
function OFC_MethodArt({ i }) {
  const A = [
    <svg key="0" viewBox="0 0 220 150">
      <rect x="50" y="10" width="120" height="130" rx="12" className="ofc-ma__dev" />
      <rect x="62" y="24" width="96" height="98" rx="4" className="ofc-ma__scr" />
      <rect x="70" y="32" width="60" height="6" rx="3" className="ofc-ma__ln" />
      {[0, 1, 2].map((r) => (
        <g key={r}>
          <circle cx="76" cy={54 + r * 18} r="5" className={r === 1 ? "ofc-ma__on" : "ofc-ma__off"} />
          <rect x="86" y={51 + r * 18} width={50 - r * 8} height="6" rx="3" className="ofc-ma__ln2" />
        </g>
      ))}
      <path d="M120 112h30" className="ofc-ma__route" />
      <circle cx="110" cy="132" r="3" className="ofc-ma__off" />
    </svg>,
    <svg key="1" viewBox="0 0 220 150">
      <rect x="66" y="16" width="96" height="124" rx="6" className="ofc-ma__paper" />
      <rect x="94" y="8" width="40" height="14" rx="4" className="ofc-ma__clip" />
      {[0, 1, 2, 3].map((r) => (
        <g key={r}>
          <rect x="78" y={40 + r * 22} width="10" height="10" rx="2" className="ofc-ma__box" />
          {r !== 2 && <path d={`M80 ${45 + r * 22}l3 3 5-6`} className="ofc-ma__tick" />}
          <rect x="94" y={42 + r * 22} width={54 - (r % 2) * 14} height="5" rx="2.5" className="ofc-ma__ln2" />
        </g>
      ))}
      <path d="M150 118l18-18 6 6-18 18h-6z" className="ofc-ma__pen" />
    </svg>,
    <svg key="2" viewBox="0 0 220 150">
      <path d="M40 76l70-50 70 50" className="ofc-ma__roof" />
      <rect x="56" y="74" width="108" height="66" className="ofc-ma__wall" />
      <rect x="98" y="104" width="24" height="36" className="ofc-ma__door" />
      <rect x="70" y="90" width="18" height="16" className="ofc-ma__win" />
      <rect x="132" y="90" width="18" height="16" className="ofc-ma__win" />
      <circle cx="186" cy="40" r="12" className="ofc-ma__on" />
      <path d="M181 40l4 4 7-8" className="ofc-ma__tickw" />
    </svg>,
    <svg key="3" viewBox="0 0 220 150">
      <rect x="20" y="20" width="180" height="120" rx="10" className="ofc-ma__wall" />
      {[0, 1, 2].map((c) => (
        <g key={c}>
          <rect x={36 + c * 56} y="78" width="44" height="8" rx="2" className="ofc-ma__desk" />
          <circle cx={58 + c * 56} cy="62" r="9" className={c === 1 ? "ofc-ma__on" : "ofc-ma__off"} />
          <path
            d={`M${44 + c * 56} 78c0-6 6-10 14-10s14 4 14 10`}
            className={c === 1 ? "ofc-ma__onf" : "ofc-ma__offf"}
          />
        </g>
      ))}
      <rect x="36" y="100" width="148" height="26" rx="6" className="ofc-ma__scr" />
      <rect x="46" y="110" width="40" height="6" rx="3" className="ofc-ma__ln" />
      <rect x="96" y="110" width="20" height="6" rx="3" className="ofc-ma__ln2" />
    </svg>,
    <svg key="4" viewBox="0 0 220 150">
      <path d="M20 120h180" className="ofc-ma__ground" />
      <rect x="30" y="50" width="70" height="70" className="ofc-ma__wall" />
      <rect x="40" y="62" width="50" height="22" className="ofc-ma__win" />
      <rect x="120" y="66" width="70" height="54" className="ofc-ma__wall" />
      <rect x="132" y="78" width="46" height="18" className="ofc-ma__win" />
      {[
        [70, 104],
        [110, 112],
        [150, 106],
      ].map(([x, y], n) => (
        <g key={n}>
          <path
            d={`M${x} ${y - 30}c-9 0-14 7-14 14 0 11 14 22 14 22s14-11 14-22c0-7-5-14-14-14z`}
            className={n === 1 ? "ofc-ma__pin is-on" : "ofc-ma__pin"}
            style={{
              "--i": n,
            }}
          />
          <circle cx={x} cy={y - 16} r="4" fill="#fff" />
        </g>
      ))}
    </svg>,
    <svg key="5" viewBox="0 0 220 150">
      <rect x="30" y="20" width="160" height="110" rx="10" className="ofc-ma__wall" />
      {[0, 1, 2, 3].map((c) => (
        <rect key={c} x={44 + c * 36} y="34" width="22" height="30" className="ofc-ma__win" />
      ))}
      <rect x="60" y="92" width="100" height="8" rx="3" className="ofc-ma__desk" />
      <circle cx="84" cy="80" r="9" className="ofc-ma__off" />
      <circle cx="136" cy="80" r="9" className="ofc-ma__on" />
      <rect x="96" y="104" width="28" height="18" rx="3" className="ofc-ma__brief" />
      <path d="M104 104v-4h12v4" className="ofc-ma__route" />
    </svg>,
  ];
  return A[i];
}
function OFC_Methods() {
  const [a, setA] = ee.useState(0);
  const m = OFC_METHODS[a];
  return (
    <div className="ofc-mth">
      <ol className="ofc-mth__list" role="tablist" aria-label="Face-to-face data collection methods">
        {OFC_METHODS.map((x, i) => (
          <li key={x.k} role="presentation">
            <button role="tab" aria-selected={a === i} className={a === i ? "is-on" : ""} onClick={() => setA(i)}>
              <span className="ofc-mth__n">0{i + 1}</span>
              <span className="ofc-mth__ic">
                <RC_I n={x.ic} s={18} />
              </span>
              <span className="ofc-mth__k">{x.k}</span>
              <RC_I n="arrow" s={15} className="ofc-mth__go" />
            </button>
            {a === i && (
              <div className="ofc-mth__mob">
                <p>{x.d}</p>
                <ul>
                  {x.x.map((y) => (
                    <li key={y}>
                      <RC_I n="check" s={13} />
                      {y}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ol>
      <div className="ofc-mth__panel" key={a} role="tabpanel" aria-live="polite">
        <div className="ofc-mth__art" aria-hidden="true">
          <OFC_MethodArt i={a} />
        </div>
        <div className="ofc-mth__body">
          <span className="ofc-mth__kk">
            0{a + 1}
            {" \xB7 "}
            {m.k}
          </span>
          <h3>{m.t}</h3>
          <p>{m.d}</p>
          <span className="ofc-mth__l">{m.l}</span>
          <ul>
            {m.x.map((y, i) => (
              <li
                key={y}
                style={{
                  "--i": i,
                }}
              >
                <RC_I n="check" s={14} />
                {y}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
const OFC_CMP = [
  ["CAPI", "Digital field interviews", "Tablet / mobile"],
  ["PAPI", "Offline environments", "Paper"],
  ["In-Home", "Household & consumer research", "CAPI / PAPI"],
  ["Central Location", "Product / concept testing", "Controlled location"],
  ["Intercept", "High-footfall audiences", "CAPI / PAPI"],
  ["B2B Face-to-Face", "Professional respondents", "CAPI / PAPI"],
];
function OFC_Compare() {
  const [h, setH] = ee.useState(null);
  return (
    <div className="ofc-cmp" role="region" aria-label="Method comparison table" tabIndex="0">
      <table>
        <thead>
          <tr>
            <th scope="col">Method</th>
            <th scope="col">Best suited for</th>
            <th scope="col">Data capture</th>
          </tr>
        </thead>
        <tbody>
          {OFC_CMP.map(([m, b, c], i) => (
            <tr key={m} className={h === i ? "is-on" : ""} onMouseEnter={() => setH(i)} onMouseLeave={() => setH(null)}>
              <th scope="row">
                <span className="ofc-cmp__ic">
                  <RC_I n={OFC_METHODS[i].ic} s={16} />
                </span>
                {m}
              </th>
              <td>{b}</td>
              <td>
                <span
                  className={
                    "ofc-cmp__cap ofc-cmp__cap--" +
                    (c.includes("/ PAPI") ? "mix" : i === 3 ? "loc" : i === 1 ? "paper" : "dig")
                  }
                >
                  {c}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const OFC_AUD = [
  [
    "users",
    "B2C",
    "Consumer audiences",
    [
      "Consumers",
      "Customers",
      "Household respondents",
      "Rural consumers",
      "Senior consumers",
      "Targeted demographic groups",
    ],
    "consumer-panel",
  ],
  [
    "brief",
    "B2B",
    "Business & professional audiences",
    [
      "Business owners",
      "CXOs",
      "Directors",
      "Managers",
      "Procurement professionals",
      "IT professionals",
      "Industry specialists",
      "Channel partners",
    ],
    "business-panel",
  ],
  [
    "steth",
    "Healthcare",
    "Healthcare audiences",
    [
      "Doctors",
      "Medical specialists",
      "Pharmacists",
      "Nurses",
      "Healthcare professionals",
      "Patients",
      "Caregivers",
      "Other healthcare stakeholders",
    ],
    "healthcare-panel",
  ],
];
function OFC_Audiences() {
  const [a, setA] = ee.useState(null);
  return (
    <div className="ofc-aud">
      <svg viewBox="0 0 900 120" className="ofc-aud__net" preserveAspectRatio="none" aria-hidden="true">
        {[150, 450, 750].map((x, i) => (
          <path key={x} d={`M450 18 C450 60 ${x} 50 ${x} 112`} className={a === i ? "is-on" : ""} />
        ))}
        <circle cx="450" cy="18" r="10" />
      </svg>
      <span className="ofc-aud__hub">
        <RC_I n="msg" s={15} />
        Face-to-face field team
      </span>
      <div className="ofc-aud__cols">
        {OFC_AUD.map(([ic, k, t, xs, s], i) => (
          <div
            key={k}
            className={"ofc-aud__col ofc-aud__col" + i + (a === i ? " is-on" : "")}
            onMouseEnter={() => setA(i)}
            onMouseLeave={() => setA(null)}
          >
            <span className="ofc-aud__ic">
              <RC_I n={ic} s={22} />
            </span>
            <span className="ofc-aud__k">{k}</span>
            <h3>{t}</h3>
            <ul>
              {xs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
            <Link to={`/services/market-research/${s}`} className="rc-link">
              {"See the "}
              {k === "Healthcare" ? "healthcare" : k === "B2B" ? "business" : "consumer"}
              {" panel "}
              <RC_I n="arrow" s={14} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
const OFC_LVL = ["National", "Regional", "State", "City", "District", "Catchment area"];
const OFC_F = ["Urban", "Semi-urban", "Rural", "Tier 1", "Tier 2", "Tier 3", "District", "Custom geography"];
function OFC_Geo() {
  const [lv, setLv] = ee.useState(3);
  const [f, setF] = ee.useState(["Urban", "Semi-urban"]);
  const tog = (x) => setF((s) => (s.includes(x) ? (s.length > 1 ? s.filter((y) => y !== x) : s) : [...s, x]));
  const tiles = [];
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 12; c++) {
      const d = Math.hypot(c - 5.5, (r - 3) * 1.5);
      const type = d < 2.2 ? "Urban" : d < 4.2 ? "Semi-urban" : "Rural";
      const tier = d < 2.2 ? "Tier 1" : d < 3.4 ? "Tier 2" : "Tier 3";
      tiles.push({
        r,
        c,
        type,
        tier,
        dist: (r * 12 + c) % 9 === 0,
      });
    }
  const on = (t) =>
    f.includes(t.type) ||
    f.includes(t.tier) ||
    (f.includes("District") && t.dist) ||
    (f.includes("Custom geography") && t.c > 7 && t.r > 3);
  const ring = 34 + (5 - lv) * 22;
  return (
    <div className="ofc-geo">
      <div className="ofc-geo__ctl">
        <span className="ofc-geo__k">Geography level</span>
        <ol className="ofc-geo__lv" role="radiogroup" aria-label="Geography level">
          {OFC_LVL.map((t, i) => (
            <li key={t}>
              <button
                role="radio"
                aria-checked={lv === i}
                className={(lv === i ? "is-on " : "") + (i < lv ? "is-past" : "")}
                onClick={() => setLv(i)}
              >
                {t}
              </button>
            </li>
          ))}
        </ol>
        <span className="ofc-geo__k">Market types</span>
        <div className="ofc-geo__f">
          {OFC_F.map((t) => (
            <button
              key={t}
              aria-pressed={f.includes(t)}
              className={f.includes(t) ? "is-on" : ""}
              onClick={() => tog(t)}
            >
              {f.includes(t) ? <RC_I n="check" s={12} /> : <RC_I n="plus" s={12} />}
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="ofc-geo__map">
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-label={`Fieldwork map at ${OFC_LVL[lv].toLowerCase()} level, highlighting ${f.join(", ").toLowerCase()} locations`}
        >
          {tiles.map((t) => (
            <rect
              key={t.r + "-" + t.c}
              x={24 + t.c * 37}
              y={28 + t.r * 36}
              width="31"
              height="30"
              rx="6"
              className={"ofc-geo__t ofc-geo__t--" + t.type.replace(/\W/g, "").toLowerCase() + (on(t) ? " is-on" : "")}
              style={{
                "--i": (t.r + t.c) % 8,
              }}
            />
          ))}
          <circle cx="245" cy="136" r={ring} className="ofc-geo__ring" />
          <circle cx="245" cy="136" r="7" className="ofc-geo__core" />
          <text x="245" y={136 - ring - 8} textAnchor="middle" className="ofc-geo__lbl">
            {OFC_LVL[lv]}
          </text>
        </svg>
        <div className="ofc-geo__lg">
          <span>
            <i className="u" />
            Urban
          </span>
          <span>
            <i className="s" />
            Semi-urban
          </span>
          <span>
            <i className="r" />
            Rural
          </span>
          {null}
        </div>
      </div>
    </div>
  );
}
const OFC_STEPS = [
  [
    "clipboard",
    "Research brief",
    "We start by understanding the project in full.",
    ["Research objectives", "Target audience", "Methodology", "Geography", "Questionnaire", "Sample requirements"],
  ],
  [
    "filter",
    "Feasibility & sampling",
    "We evaluate what the fieldwork will need before committing.",
    ["Audience availability", "Geographic coverage", "Incidence", "Quotas", "Fieldwork requirements"],
  ],
  [
    "users",
    "Field team deployment",
    "Trained interviewers and supervisors are assigned according to location and audience requirements.",
    ["Interviewers matched to location", "Supervisors assigned", "Project briefing"],
  ],
  [
    "userplus",
    "Respondent recruitment",
    "Respondents are recruited against predefined screening criteria and quota requirements.",
    ["Screening criteria", "Quota requirements", "Eligibility confirmed"],
  ],
  [
    "msg",
    "Face-to-face interview",
    "Structured interviews are conducted using approved questionnaires and research protocols.",
    ["Approved questionnaire", "Research protocols", "CAPI or PAPI capture"],
  ],
  [
    "shield",
    "Quality control",
    "Multiple quality checks run throughout fieldwork.",
    ["Supervision", "Field checks", "Back checks where applicable"],
  ],
  [
    "okc",
    "Data validation",
    "Completed interviews are reviewed before delivery.",
    ["Completeness", "Consistency", "Compliance with project specifications"],
  ],
  [
    "database",
    "Final data delivery",
    "Validated data is delivered in the required format for analysis and reporting.",
    ["Required data format", "Ready for analysis", "Ready for reporting"],
  ],
];
function OFC_Process() {
  const [a, setA] = ee.useState(0);
  const [ref, v] = RC_useInView(0.25);
  const s = OFC_STEPS[a];
  return (
    <div ref={ref} className={"ofc-proc" + (v ? " is-in" : "")}>
      <ol className="ofc-proc__rail" role="tablist" aria-label="Fieldwork process">
        {OFC_STEPS.map(([ic, t], i) => (
          <li
            key={t}
            role="presentation"
            style={{
              "--i": i,
            }}
          >
            <button
              role="tab"
              aria-selected={a === i}
              className={(a === i ? "is-on " : "") + (i < a ? "is-past" : "")}
              onClick={() => setA(i)}
            >
              <span className="ofc-proc__dot">
                <RC_I n={ic} s={19} />
              </span>
              <span className="ofc-proc__n">0{i + 1}</span>
              <span className="ofc-proc__t">{t}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="ofc-proc__panel" key={a} role="tabpanel" aria-live="polite">
        <span className="ofc-proc__big" aria-hidden="true">
          0{a + 1}
        </span>
        <div>
          <h3>{s[1]}</h3>
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
              <RC_I n="check" s={13} />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
const OFC_QC = [
  ["filter", "Respondent screening", "Participants meet the required eligibility criteria."],
  ["bookopen", "Interviewer training", "Project-specific training before deployment."],
  ["eye", "Supervisor monitoring", "Interviewer performance and fieldwork progress are monitored."],
  ["pin", "GPS & location validation", "Location information validates field activity, where applicable."],
  ["timer", "Time & duration checks", "Interview timing and duration are monitored, where applicable."],
  ["refresh", "Back checks", "Selected respondents are re-contacted to validate participation and key information."],
  ["copy", "Duplicate detection", "Duplicate or suspicious records are identified through quality processes."],
  ["okc", "Data validation", "Final quality checks before data delivery."],
];
function OFC_Quality() {
  const [ref, v] = RC_useInView(0.2);
  const [h, setH] = ee.useState(null);
  return (
    <div ref={ref} className={"ofc-qc" + (v ? " is-in" : "")}>
      <div className="ofc-qc__pipe" aria-hidden="true">
        <span className="ofc-qc__in">
          <RC_I n="paper" s={18} />
          Field interview
        </span>
        <div className="ofc-qc__gates">
          {OFC_QC.map((q, i) => (
            <i
              key={i}
              className={h === i ? "is-on" : ""}
              style={{
                "--i": i,
              }}
            />
          ))}
          <b className="ofc-qc__tok" />
        </div>
        <span className="ofc-qc__out">
          <RC_I n="shield" s={18} />
          Reliable field data
        </span>
      </div>
      <ol className="ofc-qc__list">
        {OFC_QC.map(([ic, t, d], i) => (
          <li
            key={t}
            tabIndex="0"
            style={{
              "--i": i,
            }}
            className={h === i ? "is-on" : ""}
            onMouseEnter={() => setH(i)}
            onMouseLeave={() => setH(null)}
            onFocus={() => setH(i)}
            onBlur={() => setH(null)}
          >
            <span className="ofc-qc__n">0{i + 1}</span>
            <span className="ofc-qc__ic">
              <RC_I n={ic} s={18} />
            </span>
            <strong>{t}</strong>
            <em>{d}</em>
            <span className="ofc-qc__ok">
              <RC_I n="check" s={12} />
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
function OFC_Tech() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <div
      ref={ref}
      className={"ofc-tech" + (v ? " is-in" : "")}
      role="img"
      aria-label="Field interview captured on a tablet, synced securely to a central data environment and monitored for quotas and quality"
    >
      <div className="ofc-tech__node">
        <span>
          <RC_I n="tablet" s={26} />
        </span>
        <strong>Field tablet</strong>
        <em>Digital questionnaire</em>
      </div>
      <div className="ofc-tech__link">
        <i />
        <b>Sync</b>
      </div>
      <div className="ofc-tech__node ofc-tech__node--c">
        <span>
          <RC_I n="cloud" s={26} />
        </span>
        <strong>Central data</strong>
        <em>Structured workflow</em>
      </div>
      <div className="ofc-tech__link">
        <i />
        <b>Monitor</b>
      </div>
      <div className="ofc-tech__node">
        <span>
          <RC_I n="monitor" s={26} />
        </span>
        <strong>Field monitoring</strong>
        <em>Progress & quotas</em>
      </div>
      <div className="ofc-tech__link">
        <i />
        <b>Validate</b>
      </div>
      <div className="ofc-tech__node ofc-tech__node--o">
        <span>
          <RC_I n="okc" s={26} />
        </span>
        <strong>Validated data</strong>
        <em>Ready for analysis</em>
      </div>
    </div>
  );
}
function OFC_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("ofc-overview");
  const nav = [
    ["ofc-overview", "Overview"],
    ["ofc-services", "Methods"],
    ["ofc-audiences", "Audiences"],
    ["ofc-coverage", "Coverage"],
    ["ofc-process", "Process"],
    ["ofc-quality", "Quality"],
    ["ofc-technology", "Technology"],
    ["ofc-industries", "Industries"],
    ["ofc-why", "Why us"],
    ["ofc-faq", "FAQ"],
    ["ofc-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is offline data collection?",
      a: "Offline data collection gathers research data through direct contact with respondents, such as face-to-face interviews, rather than through self-completed online surveys.",
    },
    {
      q: "What is CAPI?",
      a: "CAPI (computer-assisted personal interviewing) is face-to-face interviewing on a tablet or mobile device, with routing and skip logic programmed into the questionnaire and answers captured digitally.",
    },
    {
      q: "What is PAPI?",
      a: "PAPI (paper-assisted personal interviewing) uses printed questionnaires, for field environments where digital collection may not be practical.",
    },
    {
      q: "When should I use face-to-face data collection?",
      a: "It suits audiences who are hard to reach online, longer or more involved questionnaires, product or concept testing, and studies that benefit from direct interaction.",
    },
    {
      q: "Can you conduct face-to-face research in rural areas?",
      a: "Yes. Rural and semi-urban fieldwork can be supported depending on the audience, geography and feasibility.",
    },
    {
      q: "Can you conduct B2B and healthcare face-to-face interviews?",
      a: "Yes. We conduct face-to-face interviews with business and professional audiences and with healthcare audiences, subject to feasibility.",
    },
    {
      q: "How do you maintain fieldwork quality?",
      a: "Through respondent screening, interviewer training, supervisor monitoring, back checks and data validation, with GPS, time and duration checks where applicable.",
    },
    {
      q: "Can face-to-face data collection use tablets?",
      a: "Yes. CAPI uses tablets or mobile devices with programmed digital questionnaires, which supports real-time capture and field monitoring.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/offline-data-collection";
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
    const title = "Face-to-Face Data Collection | Frequent Research";
    const desc =
      "Professional face-to-face data collection using CAPI, PAPI and field interviews for B2B, B2C and healthcare research across diverse locations.";
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
          ["Offline / Face-to-Face Data Collection", "/services/market-research/offline-data-collection"],
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
        name: "Offline / Face-to-Face Data Collection",
        serviceType:
          "Face-to-face market research fieldwork (CAPI, PAPI, in-home, central location, intercept and B2B interviews)",
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
  return (
    <div className="ofc rc">
      <section className="ofc-hero">
        <div className="container ofc-hero__in">
          <div className="ofc-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">{n.name}</span>
              </span>
            </nav>
            <span className="ofc-eyebrow">
              <RC_I n="users" s={15} />
              Fieldwork & data collection
            </span>
            <HeroH1>Offline / Face-to-Face Data Collection</HeroH1>
            <p className="ofc-hero__sub">
              {"Real People. Real Conversations. "}
              <span>Reliable Insights.</span>
            </p>
            <p className="ofc-hero__body">
              High-quality face-to-face data collection, designed to reach respondents where they are. Frequent Research
              supports professional offline fieldwork for market, customer, healthcare, B2B, government and social
              research, across urban, semi-urban and rural environments.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg ofc-btn" href="#ofc-enquire" onClick={rcScrollTo("ofc-enquire")}>
                Talk to Our Research Team
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=feasibility">
                Request a Feasibility
              </Link>
            </div>
          </div>
          <OFC_HeroArt />
        </div>
        <div className="container">
          <ul className="ofc-strip">
            {[
              ["msg", "Face-to-Face Interviews", "Direct respondent interaction."],
              ["tablet", "CAPI & PAPI", "Digital and paper-assisted field interviewing."],
              ["map", "Urban & Rural Reach", "Fieldwork across diverse market environments."],
              ["users", "B2B & B2C", "Consumer and professional audiences."],
              ["steth", "Healthcare Research", "Specialised healthcare and HCP fieldwork."],
              ["shield", "Quality-Controlled Fieldwork", "Structured screening, supervision and validation."],
            ].map(([ic, t, d], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={ic} s={19} />
                </span>
                <strong>{t}</strong>
                <em>{d}</em>
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
      <section className="rc-sec" id="ofc-overview">
        <div className="container ofc-why2">
          <div>
            <RC_Head kicker="Why face-to-face" title="Why Face-to-Face Data Collection?" />
            <p className="ofc-lead">
              Online research offers speed and scalability, but some audiences and research objectives need direct human
              interaction.
            </p>
            <p className="od-muted">
              {"Face-to-face market research puts a trained interviewer in front of the respondent. It complements "}
              {svc("online-data-collection", "online data collection")}
              {" and "}
              {svc("cati", "CATI telephone interviewing")}, and can carry quantitative surveys, structured interviews,
              product tests and field audits.
            </p>
            <div
              className="ofc-vs"
              role="img"
              aria-label="Conceptual comparison of online and face-to-face data collection"
            >
              <div className="ofc-vs__c">
                <span className="ofc-vs__k">
                  <RC_I n="monitor" s={15} />
                  Online
                </span>
                <ul>
                  <li>Self-completion</li>
                  <li>Speed and scale</li>
                  <li>Digitally active audiences</li>
                </ul>
              </div>
              <span className="ofc-vs__x" aria-hidden="true">
                +
              </span>
              <div className="ofc-vs__c ofc-vs__c--f">
                <span className="ofc-vs__k">
                  <RC_I n="users" s={15} />
                  Face-to-face
                </span>
                <ul>
                  <li>Interviewer-led</li>
                  <li>Context and clarification</li>
                  <li>Audiences offline or hard to reach</li>
                </ul>
              </div>
            </div>
          </div>
          <ul className="ofc-ben">
            {[
              [
                "wifi",
                "Reach limited-digital-access audiences",
                "Useful where respondents have limited access to digital research channels.",
              ],
              [
                "target",
                "Engage difficult-to-reach audiences",
                "Support for specialised or hard-to-reach respondents, subject to feasibility.",
              ],
              ["list", "Conduct detailed interviews", "Suitable for longer or more involved questionnaires."],
              [
                "eye",
                "Capture contextual insights",
                "Interviewers can observe context and non-verbal cues where relevant.",
              ],
              [
                "help",
                "Clarify complex questions",
                "Face-to-face interaction helps respondents understand complex questions.",
              ],
              [
                "globe",
                "Support local languages",
                "Field teams can work in appropriate local languages where available.",
              ],
              ["map", "Geographic reach", "Fieldwork across different cities, regions and market types."],
              ["okc", "Human validation", "Trained interviewers can spot issues during the interview itself."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 2,
                }}
              >
                <span>
                  <RC_I n={RC_P[ic] ? ic : "target"} s={18} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec ofc-sec--soft" id="ofc-services">
        <div className="container">
          <RC_Head
            kicker="Methods"
            title="Our Face-to-Face Data Collection Services"
            intro="Six fieldwork methods, chosen around the audience, the setting and the research objective. Select a method."
          />
          <OFC_Methods />
          <h3 className="ofc-h3">How the methods compare</h3>
          <OFC_Compare />
          <p className="rdc-note">
            No method is better in every case; the right choice depends on the audience, the setting and what the study
            must measure.
          </p>
        </div>
      </section>
      <section className="rc-sec" id="ofc-audiences">
        <div className="container">
          <RC_Head
            center
            kicker="Audiences"
            title="B2C, B2B and Healthcare Audiences"
            intro="One field team approach, three audience families. Availability for each audience is confirmed per location during feasibility."
          />
          <OFC_Audiences />
        </div>
      </section>
      <section className="rc-sec ofc-sec--ink">
        <div className="container ofc-htr">
          <div>
            <RC_Head
              light
              kicker="Hard-to-reach respondents"
              title="Designed for Hard-to-Reach Audiences"
              intro="Some research audiences cannot be reached effectively through conventional online panels. Our offline fieldwork can support specialised and difficult-to-reach audiences, subject to feasibility."
            />
          </div>
          <ul>
            {[
              [
                "steth",
                "Healthcare professionals",
                "Doctors, specialists, pharmacists and other healthcare audiences.",
              ],
              ["brief", "Business professionals", "Owners, executives, managers and decision-makers."],
              ["leaf", "Rural consumers", "Respondents across rural and semi-urban communities."],
              ["user", "Senior consumers", "Older groups who may participate less online."],
              ["factory", "Occupational groups", "Workers, professionals, tradespeople and specialised occupations."],
              ["home", "Local communities", "Community-based and geographically targeted respondents."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 3,
                }}
              >
                <span>
                  <RC_I n={ic} s={20} />
                </span>
                <strong>{t}</strong>
                <em>{d}</em>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec ofc-sec--soft" id="ofc-coverage">
        <div className="container">
          <RC_Head
            kicker="Geographic fieldwork coverage"
            title="Local Reach. Regional Expertise. Scalable Fieldwork."
            intro="Our fieldwork can support projects across urban, semi-urban and rural markets, depending on audience requirements and project feasibility. Explore how a study can be scoped, from national level down to a catchment area."
          />
          <OFC_Geo />
        </div>
      </section>
      <section className="rc-sec" id="ofc-process">
        <div className="container">
          <RC_Head
            kicker="Process"
            title="Our Fieldwork Process"
            intro="Brief → Feasibility → Deployment → Recruitment → Interview → QC → Validation → Delivery. Select a step."
          />
          <OFC_Process />
        </div>
      </section>
      <section className="ofc-mid">
        <div className="container ofc-mid__in">
          <div>
            <strong>Planning fieldwork in several locations?</strong>
            <span>
              Share your audience, locations and sample requirements. We will assess feasibility and the right field
              approach.
            </span>
          </div>
          <a className="btn btn--light btn--lg" href="#ofc-enquire" onClick={rcScrollTo("ofc-enquire")}>
            Discuss Your Fieldwork Requirement
          </a>
        </div>
      </section>
      <section className="rc-sec ofc-sec--ink" id="ofc-quality">
        <div className="container">
          <RC_Head
            light
            center
            kicker="Built for research quality"
            title="Multi-Layer Fieldwork Quality Control"
            intro="Eight checks between a field interview and the data you receive. GPS, time and duration checks apply where the project uses them."
          />
          <OFC_Quality />
        </div>
      </section>
      <section className="rc-sec" id="ofc-technology">
        <div className="container">
          <RC_Head
            kicker="Technology-enabled fieldwork"
            title="Traditional Fieldwork. Modern Technology."
            intro="Face-to-face research can combine human interaction with technology to improve fieldwork control, monitoring and data management."
          />
          <OFC_Tech />
          <ul className="ofc-tcards">
            {[
              ["tablet", "Digital questionnaires", "Tablet and mobile surveys with programmed logic."],
              ["monitor", "Real-time monitoring", "Fieldwork progress and completes tracked where supported."],
              ["sliders", "Quota management", "Demographic and geographic quotas monitored."],
              ["pin", "GPS validation", "Location-based validation where appropriate."],
              ["timer", "Digital time stamps", "Interview timing and field activity tracked."],
              ["route", "Automated routing", "Programmed logic reduces interviewer errors."],
              [
                "database",
                "Centralised data management",
                "Fieldwork data brought into a structured research workflow.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                className="hcard"
                style={{
                  "--i": i % 4,
                }}
              >
                <span>
                  <RC_I n={ic} s={19} />
                </span>
                <strong>{t}</strong>
                <em>{d}</em>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec ofc-sec--soft">
        <div className="container">
          <RC_Head center kicker="How it comes together" title="People + Technology + Quality" />
          <div
            className="ofc-ptq"
            role="img"
            aria-label="People, technology and quality combine to produce reliable field data"
          >
            {[
              ["users", "People", ["Interviewers", "Supervisors", "Researchers"]],
              ["tablet", "Technology", ["CAPI", "Digital questionnaires", "GPS", "Timestamps", "Quota monitoring"]],
              ["shield", "Quality", ["Screening", "Training", "Back checks", "Validation", "Supervision"]],
            ].map(([ic, t, xs], i) =>
              ee.createElement(
                ee.Fragment,
                {
                  key: t,
                },
                i > 0 && (
                  <span className="ofc-ptq__op" aria-hidden="true">
                    +
                  </span>
                ),
                <div className={"ofc-ptq__c ofc-ptq__c" + i}>
                  <span>
                    <RC_I n={ic} s={22} />
                  </span>
                  <strong>{t}</strong>
                  <ul>
                    {xs.map((x) => (
                      <li key={x}>{x}</li>
                    ))}
                  </ul>
                </div>,
              ),
            )}
            <span className="ofc-ptq__op" aria-hidden="true">
              =
            </span>
            <div className="ofc-ptq__res">
              <RC_I n="okc" s={26} />
              <strong>Reliable field data</strong>
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec" id="ofc-industries">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries We Serve" />
          <ul className="ofc-ind">
            {[
              ["steth", "Healthcare & Pharmaceuticals"],
              ["cart", "FMCG & Consumer Goods"],
              ["store", "Retail & E-commerce"],
              ["car", "Automotive"],
              ["wallet", "Banking & Financial Services"],
              ["cpu", "Technology & IT"],
              ["plane", "Travel & Hospitality"],
              ["landmark", "Government & Social Research"],
            ].map(([ic, t], i) => (
              <li
                key={t}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <RC_I n={ic} s={22} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="ofc-rt">
            <div className="ofc-rt__h">
              <h3>Types of Research We Support</h3>
              <p>Each of these can be run face to face, alone or alongside other methods.</p>
            </div>
            <ul>
              {[
                "Consumer Research",
                "Market Research",
                "Customer Satisfaction",
                "Brand Research",
                "Product Testing",
                "Concept Testing",
                "Advertising Research",
                "Retail Research",
                "Healthcare Research",
                "B2B Research",
                "Government Surveys",
                "Social Research",
                "Public Opinion Research",
                "Usage & Attitude Studies",
                "Mystery Shopping",
                "Field Audits",
              ].map((t, i) => (
                <li
                  key={t}
                  style={{
                    "--i": i % 4,
                  }}
                >
                  <strong>{t}</strong>
                  <span>
                    <RC_I n="check" s={12} />
                    Face-to-face application
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="ofc-apps">
            {[
              ["flask2", "Product research", "Product testing and evaluation."],
              ["users", "Consumer understanding", "Preferences, behaviours and attitudes."],
              ["steth", "Healthcare research", "Patient, HCP and healthcare-service research."],
              ["store", "Retail research", "Shopper behaviour, retail audits and customer experience."],
              ["eye", "Brand research", "Brand awareness, perception and usage."],
              ["landmark", "Public & social research", "Government surveys, public opinion and community research."],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                key={t}
                className="ofc-apps__c hcard"
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
      <section className="rc-sec ofc-sec--soft" id="ofc-why">
        <div className="container">
          <RC_Head kicker="Research built around reliability" title="Why Choose Frequent Research?" />
          <ul className="ofc-wy">
            {[
              [
                "users",
                "Experienced field teams",
                "Trained interviewers and supervisors for professional field execution.",
              ],
              [
                "layers",
                "Flexible methodologies",
                "CAPI, PAPI, intercepts, in-home interviews and central-location research.",
              ],
              ["brief", "Multi-industry expertise", "B2B, B2C, healthcare and specialised research audiences."],
              ["map", "Geographic reach", "Fieldwork across multiple cities, regions and market types."],
              [
                "shield",
                "Quality-focused operations",
                "Structured recruitment, supervision, validation and quality control.",
              ],
              [
                "bars",
                "Scalable fieldwork",
                "Targeted local studies and larger multi-location programmes, subject to feasibility.",
              ],
              ["msg", "Transparent communication", "Regular fieldwork updates and project coordination."],
              [
                "tablet",
                "Technology-enabled execution",
                "Digital questionnaires, monitoring, quota management and validation where applicable.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                className="hcard"
                style={{
                  "--i": i % 4,
                }}
              >
                <span className="ofc-wy__n">0{i + 1}</span>
                <span className="ofc-wy__ic">
                  <RC_I n={ic} s={20} />
                </span>
                <strong>{t}</strong>
                <em>{d}</em>
              </RC_Reveal>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container ofc-sc">
          <div className="ofc-sc__ex">
            {null}
            <h2>Multi-Location Consumer Study</h2>
            <p className="od-muted">
              How a typical multi-location face-to-face study moves from brief to dataset. This is a general example,
              not a specific client project.
            </p>
            <ol>
              {[
                "Brief",
                "Geographic planning",
                "Recruitment",
                "Face-to-face interviews",
                "Quality checks",
                "Validated dataset",
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
            <Link to="/industries-case-studies" className="rc-link">
              {"See case studies "}
              <RC_I n="arrow" s={14} />
            </Link>
          </div>
          <div className="ofc-team">
            <h2>The Team Behind Your Fieldwork</h2>
            <ul>
              {[
                ["target", "Research Consultant"],
                ["map", "Fieldwork Manager"],
                ["eye", "Field Supervisors"],
                ["database", "Data Processing & Quality Specialist"],
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
            </ul>
            <Link to="/our-team" className="rc-link">
              {"Meet our team "}
              <RC_I n="arrow" s={14} />
            </Link>
          </div>
        </div>
      </section>
      <section className="rc-sec ofc-sec--soft">
        <div className="container">
          <RC_Head
            kicker="Related methods"
            title="Need More Than Face-to-Face Interviews?"
            intro="Face-to-face fieldwork often sits alongside other methods in one programme."
          />
          <ul className="ofc-rel">
            {[
              ["phonecall", "CATI", "cati"],
              ["monitor", "Online Data Collection", "online-data-collection"],
              ["msg", "Qualitative Research", "qualitative-research"],
              ["user", "In-Depth Interviews", "qualitative-research"],
              ["users", "Focus Groups", "qualitative-research"],
              ["eye", "Mystery Shopping", null],
              ["search", "Secondary Research", null],
              ["bars", "Data Processing & Analytics", "data-processing-and-analytics"],
            ].map(([ic, t, s]) =>
              s ? (
                <li key={t}>
                  <Link to={`/services/market-research/${s}`} className="hcard">
                    <RC_I n={RC_P[ic] ? ic : "phonecall"} s={18} />
                    <strong>{t}</strong>
                    <RC_I n="arrow" s={14} />
                  </Link>
                </li>
              ) : (
                <li key={t}>
                  <span className="ofc-rel__x">
                    <RC_I n={ic} s={18} />
                    <strong>{t}</strong>
                  </span>
                </li>
              ),
            )}
          </ul>
        </div>
      </section>
      <section className="section" id="ofc-faq">
        <div className="container split">
          <h2 className="split__title">Face-to-face data collection: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="ofc-cta">
        <svg className="ofc-cta__bg" viewBox="0 0 1200 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          {Array.from(
            {
              length: 9,
            },
            (_, r) =>
              Array.from(
                {
                  length: 30,
                },
                (_2, c) => (
                  <circle
                    key={r + "-" + c}
                    cx={20 + c * 40 + (r % 2) * 20}
                    cy={20 + r * 34}
                    r={((r * 7 + c * 3) % 5) + 1.5}
                  />
                ),
              ),
          )}
        </svg>
        <div className="container ofc-cta__in">
          <span className="rc-kicker">Need reliable offline data collection?</span>
          <h2>Let's Take Your Research Into the Real World.</h2>
          <p>
            Tell us your target audience, sample size, locations and questionnaire requirements. Our research team can
            help assess the right fieldwork approach and feasibility.
          </p>
          <div className="od-hero__ctas">
            <Link className="btn btn--light btn--lg" to="/lets-talk?type=feasibility">
              Request Feasibility
            </Link>
            <a className="btn btn--outline-light btn--lg" href="#ofc-enquire" onClick={rcScrollTo("ofc-enquire")}>
              Speak With Our Research Team
            </a>
          </div>
        </div>
      </section>
      <section className="section section--tint" id="ofc-enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>Talk to our research team about face-to-face data collection</h2>
            <p>
              Share your audience, locations, sample size and method if you know it (CAPI, PAPI, in-home, central
              location, intercept or B2B face-to-face). A specialist will reply within one working day.
            </p>
            <h3>Related services</h3>
            <ul className="related">
              {[
                ["cati", "CATI \u2014 Computer-Assisted Telephone Interviewing"],
                ["online-data-collection", "Online Data Collection"],
                ["quantitative-research", "Quantitative Research"],
                ["qualitative-research", "Qualitative Research"],
                ["research-consultancy", "Research Consultancy"],
                ["data-processing-and-analytics", "Data Processing & Analytics"],
                ["reporting-and-insights", "Reporting & Insights"],
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
    </div>
  );
}

export { OFC_Page };
