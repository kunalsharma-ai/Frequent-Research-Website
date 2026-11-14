import * as ee from 'react';
import { HeroH1 } from '../shared/HeroH1.jsx';
import { Link } from 'react-router-dom';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_Reveal, RC_useInView } from '../shared/Reveal.jsx';
import { FaqList } from './VerticalPage.jsx';
import { SERVICE_FORM_KEY, WU_Section } from './ServicePage.jsx';
import { rcScrollTo } from './DLPage.jsx';
import { RC_Head } from './RPTPage.jsx';

function OD_Count({ to, dec = 0, suf = "" }) {
  const [ref, v] = RC_useInView(0.5);
  const [val, setVal] = ee.useState(0);
  ee.useEffect(() => {
    if (!v) return;
    const reduce =
      window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    if (reduce) {
      setVal(to);
      return;
    }
    let raf, t0;
    const tick = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 1600);
      setVal(to * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [v]);
  return (
    <span ref={ref} className="od-count">
      {val.toFixed(dec)}
      {suf}
    </span>
  );
}
const CTI_CHAIN = [
  ["user", "Interviewer"],
  ["phonecall", "Telephone connection"],
  ["users", "Respondent"],
  ["clipboard", "Digital questionnaire"],
  ["okc", "Verified data"],
];
const ctiReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
function CTI_Hero() {
  const [k, setK] = ee.useState(ctiReduce() ? 4 : 0);
  const ref = ee.useRef(null);
  ee.useEffect(() => {
    if (ctiReduce()) return;
    const t = setInterval(() => setK((x) => (x + 1) % 5), 1800);
    return () => clearInterval(t);
  }, []);
  const move = (e) => {
    if (ctiReduce() || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    ref.current.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  };
  const reset = () => {
    if (ref.current) {
      ref.current.style.setProperty("--mx", 0);
      ref.current.style.setProperty("--my", 0);
    }
  };
  const path = "M70 300 C150 300 170 190 260 190 C350 190 370 300 450 300";
  return (
    <div className="cti-hv" ref={ref} onPointerMove={move} onPointerLeave={reset}>
      <div className="cti-hv__stage">
        <svg
          viewBox="0 0 520 400"
          className="cti-hv__svg"
          role="img"
          aria-label="Interviewer connected by telephone to a respondent through a headset, with answers flowing into a digital questionnaire and verified data"
        >
          <defs>
            {ee.createElement(
              "linearGradient",
              {
                id: "ctiBand",
                x1: "0",
                y1: "0",
                x2: "0",
                y2: "1",
              },
              <stop offset="0" stopColor="#F5F7FA" />,
              <stop offset=".55" stopColor="#B7BFCC" />,
              <stop offset="1" stopColor="#8B96AE" />,
            )}
            {ee.createElement(
              "radialGradient",
              {
                id: "ctiCup",
                cx: ".38",
                cy: ".32",
                r: ".8",
              },
              <stop offset="0" stopColor="#F5F7FA" />,
              <stop offset=".45" stopColor="#B7BFCC" />,
              <stop offset="1" stopColor="#6F7B94" />,
            )}
            {ee.createElement(
              "radialGradient",
              {
                id: "ctiPad",
                cx: ".45",
                cy: ".4",
                r: ".7",
              },
              <stop offset="0" stopColor="#1E3BB8" />,
              <stop offset="1" stopColor="#07104F" />,
            )}
            {ee.createElement(
              "radialGradient",
              {
                id: "ctiMic",
                cx: ".35",
                cy: ".35",
                r: ".7",
              },
              <stop offset="0" stopColor="#CFF5EE" />,
              <stop offset=".6" stopColor="#19B39C" />,
              <stop offset="1" stopColor="#0A7A6A" />,
            )}
            {ee.createElement(
              "radialGradient",
              {
                id: "ctiGlow",
              },
              <stop offset="0" stopColor="#6EE0CE" stopOpacity=".55" />,
              <stop offset="1" stopColor="#6EE0CE" stopOpacity="0" />,
            )}
            {ee.createElement(
              "linearGradient",
              {
                id: "ctiLine",
                x1: "0",
                x2: "1",
              },
              <stop offset="0" stopColor="#6EE0CE" stopOpacity=".2" />,
              <stop offset=".5" stopColor="#CFF5EE" />,
              <stop offset="1" stopColor="#6EE0CE" stopOpacity=".2" />,
            )}
          </defs>
          <g className="cti-hv__orbit">
            <ellipse cx="260" cy="205" rx="215" ry="62" />
            <ellipse cx="260" cy="205" rx="165" ry="44" />
          </g>
          <circle cx="260" cy="185" r="150" fill="url(#ctiGlow)" />
          <path d={path} className="cti-hv__path" />
          <path d={path} className="cti-hv__path2" stroke="url(#ctiLine)" />
          {!ctiReduce() &&
            [0, 1.3, 2.6].map((d, i) => (
              <circle key={"p" + i} r={i === 1 ? 4 : 3} className={"cti-hv__pt" + (i === 1 ? " is-b" : "")}>
                {ee.createElement("animateMotion", {
                  dur: "3.9s",
                  begin: d + "s",
                  repeatCount: "indefinite",
                  path,
                  keyPoints: i === 1 ? "1;0" : "0;1",
                  keyTimes: "0;1",
                  calcMode: "linear",
                })}
              </circle>
            ))}
          <g className="cti-hv__node" transform="translate(70 300)">
            <circle r="30" />
            <circle r="30" className="cti-hv__ring" />
            <path d="M0 -10a7 7 0 1 1 0 .1M-12 13a12 9 0 0 1 24 0" className="cti-hv__ic" />
          </g>
          <text x="70" y="352" textAnchor="middle" className="cti-hv__lbl">
            Interviewer
          </text>
          <g className="cti-hv__node is-r" transform="translate(450 300)">
            <circle r="30" />
            <path
              d="M-5 -13h10a2 2 0 0 1 2 2v22a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2v-22a2 2 0 0 1 2-2zM-1 7h2"
              className="cti-hv__ic"
            />
            {[0, 1, 2].map((i) => (
              <path
                key={i}
                d={`M${22 + i * 9} -${10 + i * 6} a${16 + i * 9} ${16 + i * 9} 0 0 1 0 ${20 + i * 12}`}
                className="cti-hv__sig"
                style={{
                  "--i": i,
                }}
              />
            ))}
          </g>
          <text x="450" y="352" textAnchor="middle" className="cti-hv__lbl">
            Respondent
          </text>
          <g className="cti-hv__set">
            <ellipse cx="260" cy="296" rx="92" ry="12" className="cti-hv__shadow" />
            <path
              d="M178 196 C178 104 342 104 342 196"
              fill="none"
              stroke="url(#ctiBand)"
              strokeWidth="18"
              strokeLinecap="round"
            />
            <path
              d="M184 186 C188 118 332 118 336 186"
              fill="none"
              stroke="#fff"
              strokeOpacity=".55"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <rect x="160" y="182" width="40" height="70" rx="20" fill="url(#ctiCup)" />
            <rect x="172" y="192" width="20" height="50" rx="10" fill="url(#ctiPad)" />
            <rect x="320" y="182" width="40" height="70" rx="20" fill="url(#ctiCup)" />
            <rect x="328" y="192" width="20" height="50" rx="10" fill="url(#ctiPad)" />
            <path
              d="M178 236 C182 276 214 290 246 286"
              fill="none"
              stroke="#8B96AE"
              strokeWidth="5"
              strokeLinecap="round"
            />
            <path
              d="M178 236 C182 274 212 287 244 284"
              fill="none"
              stroke="#EAEEFF"
              strokeOpacity=".6"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <ellipse cx="254" cy="285" rx="13" ry="10" fill="url(#ctiMic)" />
            <circle cx="254" cy="285" r="20" className="cti-hv__micpulse" />
          </g>
          <g className="cti-hv__bars" transform="translate(222 140)">
            {Array.from(
              {
                length: 11,
              },
              (_, i) => (
                <rect
                  key={i}
                  x={i * 7}
                  y="-14"
                  width="3.5"
                  height="28"
                  rx="1.75"
                  style={{
                    "--i": i,
                  }}
                />
              ),
            )}
          </g>
        </svg>
        <div
          className="cti-fc cti-fc--q"
          style={{
            "--d": 1.2,
          }}
          aria-hidden="true"
        >
          <span className="cti-fc__k">Q7 · Single response</span>
          <strong>Role in purchasing decisions</strong>
          <div className="cti-fc__opts">
            {[0, 1, 2].map((i) => (
              <i key={i} className={i === k % 3 ? "is-on" : ""} />
            ))}
          </div>
          <span className="cti-fc__route">Route → Q8</span>
        </div>
        <div
          className="cti-fc cti-fc--v"
          style={{
            "--d": 1.8,
          }}
          aria-hidden="true"
        >
          <span className="cti-fc__tick">
            <RC_I n="check" s={14} />
          </span>
          <div>
            <strong>Interview verified</strong>
            <em>QC · back check</em>
          </div>
        </div>
        <div
          className="cti-fc cti-fc--l"
          style={{
            "--d": 0.8,
          }}
          aria-hidden="true"
        >
          {["EN", "DE", "FR", "AR"].map((l, i) => (
            <b key={l} className={i === k % 4 ? "is-on" : ""}>
              {l}
            </b>
          ))}
        </div>
        <div
          className="cti-fc cti-fc--r"
          style={{
            "--d": 1.4,
          }}
          aria-hidden="true"
        >
          <i className="cti-fc__rec" />
          Recording
        </div>
        <div
          className="cti-fc cti-fc--d"
          style={{
            "--d": 1,
          }}
          aria-hidden="true"
        >
          <span className="cti-fc__k">Data capture</span>
          <div className="cti-fc__rows">
            {[0, 1, 2, 3].map((i) => (
              <i
                key={i}
                style={{
                  "--i": i,
                }}
              />
            ))}
          </div>
        </div>
        {null}
      </div>
      <ol
        className="cti-hv__chain"
        aria-label="Interviewer, telephone connection, respondent, digital questionnaire, verified data"
      >
        {CTI_CHAIN.map(([ic, t], i) => (
          <li key={t} className={(i <= k ? "is-done " : "") + (i === k ? "is-cur" : "")}>
            <span>
              <RC_I n={ic} s={15} />
            </span>
            <em>{t}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
function CTI_Facts() {
  return (
    <ul className="cti-facts">
      <li>
        <strong>
          <OD_Count to={25} />
        </strong>
        <span>In-house interviewing seats in Delhi</span>
      </li>
      <li>
        <strong>
          <OD_Count to={4} suf="+" />
        </strong>
        <span>Years managing CATI and online B2C, B2B and healthcare studies</span>
      </li>
      <li>
        <strong>
          <OD_Count to={5} suf="+" />
        </strong>
        <span>Years of research interviewing experience among our interviewers</span>
      </li>
      <li>
        <strong>
          30<small>–</small>100<small>%</small>
        </strong>
        <span>Back-check range, agreed per project</span>
      </li>
      <li>
        <strong>
          <OD_Count to={50} />
          <small>{" KVA"}</small>
        </strong>
        <span>DG set for power backup</span>
      </li>
    </ul>
  );
}
const CTI_SIX = [
  [
    "clipboard",
    "Questionnaire setup",
    "The questionnaire is programmed into the CATI system, with routing and logic tested before fieldwork begins.",
  ],
  [
    "userplus",
    "Respondent recruitment",
    "Respondents are identified and screened against the target audience criteria for the study.",
  ],
  [
    "phonecall",
    "Telephone interview",
    "Trained interviewers conduct structured telephone interviews from the approved questionnaire.",
  ],
  ["edit", "Real-time data capture", "Answers are recorded directly into the CATI system as the interview happens."],
  [
    "shield",
    "Quality control",
    "Interviews are checked for completeness and plausibility, with recordings and back checks where the project requires them.",
  ],
  ["database", "Validated data delivery", "Validated interview data is delivered, ready for processing and analysis."],
];
function CTI_SixViz({ i }) {
  if (i === 0)
    return (
      <svg viewBox="0 0 220 120" className="cti-sv">
        {[0, 1, 2, 3].map((r) => (
          <g key={r}>
            <rect
              x="12"
              y={12 + r * 26}
              width={r === 2 ? 110 : 150}
              height="14"
              rx="4"
              className="cti-sv__f"
              style={{
                "--i": r,
              }}
            />
            <circle cx="180" cy={19 + r * 26} r="6" className={r === 1 ? "cti-sv__on" : "cti-sv__o"} />
          </g>
        ))}
        <path d="M186 45 C206 50 206 70 186 71" className="cti-sv__route" />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 220 120" className="cti-sv">
        {Array.from(
          {
            length: 24,
          },
          (_, n) => {
            const x = 14 + (n % 8) * 14,
              y = 16 + Math.floor(n / 8) * 22,
              on = [3, 9, 14, 20].includes(n);
            return (
              <circle
                key={n}
                cx={x}
                cy={y}
                r="5"
                className={on ? "cti-sv__on" : "cti-sv__o"}
                style={{
                  "--i": n % 8,
                }}
              />
            );
          },
        )}
        <path d="M130 38 L160 60 L130 82" className="cti-sv__route" />
        <circle cx="186" cy="60" r="18" className="cti-sv__tgt" />
        <circle cx="186" cy="60" r="6" className="cti-sv__on" />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 220 120" className="cti-sv">
        <circle cx="28" cy="60" r="16" className="cti-sv__node" />
        <circle cx="192" cy="60" r="16" className="cti-sv__node" />
        {Array.from(
          {
            length: 18,
          },
          (_, n) => (
            <rect
              key={n}
              x={52 + n * 6.6}
              y={60 - (8 + Math.abs(Math.sin(n * 1.3)) * 26)}
              width="3.6"
              height={2 * (8 + Math.abs(Math.sin(n * 1.3)) * 26)}
              rx="1.8"
              className="cti-sv__bar"
              style={{
                "--i": n,
              }}
            />
          ),
        )}
      </svg>
    );
  if (i === 3)
    return (
      <svg viewBox="0 0 220 120" className="cti-sv">
        {Array.from(
          {
            length: 4,
          },
          (_, r) =>
            Array.from(
              {
                length: 5,
              },
              (_2, c) => (
                <rect
                  key={r + "-" + c}
                  x={14 + c * 40}
                  y={14 + r * 24}
                  width="34"
                  height="16"
                  rx="3"
                  className={r * 5 + c < 13 ? "cti-sv__cell is-f" : "cti-sv__cell"}
                  style={{
                    "--i": r * 5 + c,
                  }}
                />
              ),
            ),
        )}
      </svg>
    );
  if (i === 4)
    return (
      <svg viewBox="0 0 220 120" className="cti-sv">
        <path d="M40 96 A70 70 0 0 1 180 96" className="cti-sv__g" />
        <path d="M128 32 A70 70 0 0 1 180 96" className="cti-sv__gz" />
        <line x1="110" y1="96" x2="150" y2="50" className="cti-sv__needle" />
        <circle cx="110" cy="96" r="6" className="cti-sv__on" />
        <text x="40" y="114" className="cti-sv__t">
          Review
        </text>
        <text x="180" y="114" textAnchor="end" className="cti-sv__t">
          Within spec
        </text>
      </svg>
    );
  return (
    <svg viewBox="0 0 220 120" className="cti-sv">
      {[0, 1, 2].map((n) => (
        <path
          key={n}
          d={`M60 ${74 - n * 18} l50 -16 l50 16 l-50 16z`}
          className="cti-sv__stack"
          style={{
            "--i": n,
          }}
        />
      ))}
      <circle cx="168" cy="34" r="14" className="cti-sv__on" />
      <path d="M161 34 l5 5 l9 -10" className="cti-sv__chk" />
    </svg>
  );
}
function CTI_What() {
  const [a, setA] = ee.useState(0);
  const [hold, setHold] = ee.useState(false);
  const [ref, v] = RC_useInView(0.3);
  ee.useEffect(() => {
    if (!v || hold || ctiReduce()) return;
    const t = setInterval(() => setA((x) => (x + 1) % 6), 2600);
    return () => clearInterval(t);
  }, [v, hold]);
  const s = CTI_SIX[a];
  return (
    <div
      ref={ref}
      className={"cti-six" + (v ? " is-in" : "")}
      onMouseEnter={() => setHold(true)}
      onMouseLeave={() => setHold(false)}
    >
      <div className="cti-six__track">
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="cti-six__wave" aria-hidden="true">
          <path d="M0 40 C80 10 120 70 200 40 S320 10 400 40 S520 70 600 40 S720 10 800 40 S920 70 1000 40" />
          <path
            d="M0 40 C80 10 120 70 200 40 S320 10 400 40 S520 70 600 40 S720 10 800 40 S920 70 1000 40"
            className="cti-six__wave2"
            style={{
              "--p": (a + 1) / 6,
            }}
            pathLength="1"
          />
        </svg>
        <ol role="tablist" aria-label="Six stages from questionnaire to validated data">
          {CTI_SIX.map(([ic, t], i) => (
            <li key={t} role="presentation">
              <button
                role="tab"
                aria-selected={a === i}
                className={(a === i ? "is-on " : "") + (i < a ? "is-past" : "")}
                onClick={() => {
                  setA(i);
                  setHold(true);
                }}
              >
                <span className="cti-six__dot">
                  <RC_I n={ic} s={20} />
                </span>
                <span className="cti-six__n">0{i + 1}</span>
                <span className="cti-six__t">{t}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>
      <div className="cti-six__panel" key={a} role="tabpanel" aria-live="polite">
        <div>
          <span className="cti-six__k">
            Stage 0{a + 1}
            {" of 06"}
          </span>
          <h3>{s[1]}</h3>
          <p>{s[2]}</p>
          <div className="cti-six__prog" aria-hidden="true">
            <i
              style={{
                width: ((a + 1) / 6) * 100 + "%",
              }}
            />
          </div>
        </div>
        <div className="cti-six__viz" aria-hidden="true">
          <CTI_SixViz i={a} />
        </div>
      </div>
    </div>
  );
}
function CTI_Dash() {
  const [ref, v] = RC_useInView(0.25);
  const st = [
    ["phonecall", "Dialling", "idle"],
    ["wave", "Connected", "live"],
    ["msg", "In interview", "live"],
    ["cal", "Callback scheduled", "wait"],
    ["okc", "Completed", "done"],
  ];
  return (
    <div
      ref={ref}
      className={"cti-dash" + (v ? " is-in" : "")}
      role="img"
      aria-label="Fieldwork dashboard with call status, quota progress, interview progress rings, quality-control gauge and call monitoring. It contains no real project figures."
    >
      <div className="cti-dash__head">
        <span className="cti-dash__dots">
          <i />
          <i />
          <i />
        </span>
        <strong>Fieldwork view</strong>
        {null}
      </div>
      <div className="cti-dash__status">
        {st.map(([ic, t, s], i) => (
          <div
            key={t}
            className={"cti-dash__st is-" + s}
            style={{
              "--i": i,
            }}
          >
            <span>
              <RC_I n={ic} s={15} />
            </span>
            <em>{t}</em>
            <i className="cti-dash__pulse" />
            <b>
              <i />
            </b>
          </div>
        ))}
      </div>
      <div className="cti-dash__grid">
        <div className="cti-dash__card">
          <span className="cti-dash__ct">Quota progress</span>
          {[
            ["Quota group A", 0.92],
            ["Quota group B", 0.7],
            ["Quota group C", 0.55],
            ["Quota group D", 0.38],
          ].map(([t, w], i) => (
            <div
              key={t}
              className="cti-dash__q"
              style={{
                "--w": w,
                "--i": i,
              }}
            >
              <span>{t}</span>
              <i>
                <b />
              </i>
            </div>
          ))}
        </div>
        <div className="cti-dash__card cti-dash__rings">
          <span className="cti-dash__ct">Progress indicators</span>
          <div>
            {[
              ["Interviews", 0.72, "#19B39C"],
              ["QC reviewed", 0.58, "#6E8BFF"],
              ["Back checks", 0.4, "#C99A2E"],
            ].map(([t, p, c], i) => (
              <figure
                key={t}
                style={{
                  "--p": p,
                  "--c": c,
                  "--i": i,
                }}
              >
                <svg viewBox="0 0 60 60">
                  <circle cx="30" cy="30" r="24" className="cti-dash__rb" />
                  <circle cx="30" cy="30" r="24" pathLength="100" className="cti-dash__rf" />
                </svg>
                <figcaption>{t}</figcaption>
              </figure>
            ))}
          </div>
        </div>
        <div className="cti-dash__card cti-dash__gauge">
          <span className="cti-dash__ct">Quality-control check</span>
          <svg viewBox="0 0 160 96">
            <path d="M16 84 A64 64 0 0 1 144 84" className="cti-dash__ga" />
            <path d="M104 28 A64 64 0 0 1 144 84" className="cti-dash__gz" />
            <line x1="80" y1="84" x2="80" y2="34" className="cti-dash__needle" />
            <circle cx="80" cy="84" r="6" />
          </svg>
          <div className="cti-dash__gl">
            <span>Review</span>
            <span>Within spec</span>
          </div>
        </div>
        <div className="cti-dash__card cti-dash__mon">
          <span className="cti-dash__ct">
            <i className="cti-dash__live" />
            Call monitoring
          </span>
          <div className="cti-dash__wave">
            {Array.from(
              {
                length: 32,
              },
              (_, i) => (
                <i
                  key={i}
                  style={{
                    "--i": i,
                    "--h": 0.25 + Math.abs(Math.sin(i * 0.9)) * 0.75,
                  }}
                />
              ),
            )}
          </div>
          <div className="cti-dash__resp">
            <span className="cti-dash__ct">Response status</span>
            <div>
              {[0.5, 0.8, 0.35, 0.65, 0.9, 0.45, 0.7].map((h, i) => (
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
        </div>
      </div>
    </div>
  );
}
function CTI_Tech() {
  const [ref, v] = RC_useInView(0.25);
  const flow = [
    ["user", "Interviewer"],
    ["server", "Telephone platform"],
    ["clipboard", "Questionnaire"],
    ["users", "Respondent"],
    ["edit", "Data capture"],
    ["shield", "Quality control"],
    ["database", "Research database"],
  ];
  return (
    <div ref={ref} className={"cti-tech" + (v ? " is-in" : "")}>
      <div className="cti-tech__rail" aria-hidden="true">
        <i />
      </div>
      <ol aria-label="Interviewer, telephone platform, questionnaire, respondent, data capture, quality control, research database">
        {flow.map(([ic, t], i) => (
          <li
            key={t}
            style={{
              "--i": i,
            }}
          >
            <span className="cti-tech__tile">
              <span className="cti-tech__top">
                <RC_I n={ic} s={22} />
              </span>
            </span>
            <em>{t}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}
const CTI_LANG = [
  ["Americas", ["English", "Spanish", "French", "Portuguese"]],
  ["Western & Eastern Europe", ["German", "French", "Italian", "Spanish", "Turkish", "Russian"]],
  [
    "Asia, Africa & Middle East",
    ["Mandarin", "Cantonese", "Korean", "Malay", "Vietnamese", "Bahasa", "Thai", "Taiwanese", "Arabic", "English"],
  ],
];
function CTI_Langs() {
  const [hl, setHl] = ee.useState(null);
  return (
    <div className="cti-lang" onMouseLeave={() => setHl(null)}>
      {CTI_LANG.map(([r, ls], i) => (
        <div key={r} className={"cti-lang__c cti-lang__c" + i}>
          <span className="cti-lang__r">
            <RC_I n="globe" s={15} />
            {r}
          </span>
          <ul>
            {ls.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  className={hl === l ? "is-on" : hl ? "is-dim" : ""}
                  onMouseEnter={() => setHl(l)}
                  onFocus={() => setHl(l)}
                  onBlur={() => setHl(null)}
                  aria-label={`${l}, ${r}`}
                >
                  {l}
                </button>
              </li>
            ))}
          </ul>
          <span className="cti-lang__n">
            {ls.length}
            {" languages"}
          </span>
        </div>
      ))}
    </div>
  );
}
const CTI_OPS = [
  [
    "cpu",
    "Technical setup",
    "The technical team prepares the project setup and checklist according to the requirements.",
    ["Questionnaire programmed and tested", "Routing and logic checked", "Project checklist prepared"],
  ],
  [
    "clipboard",
    "Project briefing",
    "The project is coordinated centrally and the appointed interviewers are briefed.",
    ["Objectives and audience explained", "Screening criteria reviewed", "Probing instructions agreed"],
  ],
  [
    "phonecall",
    "Mock calls",
    "Interviewers complete mock calls to understand questionnaire flow and probing requirements.",
    ["Flow rehearsed end to end", "Terminology clarified", "Questions resolved before launch"],
  ],
  [
    "msg",
    "Live interviewing",
    "Trained interviewers conduct telephone interviews according to the approved questionnaire.",
    ["Approved questionnaire only", "Supervised interviewing", "Quota progress monitored"],
  ],
  [
    "edit",
    "Data entry & notes",
    "Responses, notes and transcripts are captured for later analysis where required.",
    ["Responses captured in the CATI system", "Interviewer notes", "Transcripts where required"],
  ],
  [
    "rec",
    "Recordings",
    "Audio or video recordings are collected when the client or project requires them.",
    ["Recorded on request", "Available for review", "Stored with project files"],
  ],
  [
    "shield",
    "Quality control",
    "Defined quality-control procedures are applied to the collected interviews.",
    ["Completeness checks", "Plausibility checks", "Interviewer review"],
  ],
  [
    "okc",
    "Back checks",
    "Back checks and respondent authentication are conducted according to project requirements.",
    ["Respondents re-contacted", "Interviews authenticated", "Coverage set per project"],
  ],
];
function CTI_Ops() {
  const [a, setA] = ee.useState(0);
  const s = CTI_OPS[a];
  return (
    <div className="cti-ops">
      <ol className="cti-ops__list" role="tablist" aria-label="CATI operations and quality-control steps">
        {CTI_OPS.map(([ic, t], i) => (
          <li key={t} role="presentation">
            <button
              role="tab"
              aria-selected={a === i}
              className={(a === i ? "is-on " : "") + (i < a ? "is-past" : "")}
              onClick={() => setA(i)}
            >
              <span className="cti-ops__n">0{i + 1}</span>
              <span className="cti-ops__t">{t}</span>
              <RC_I n={ic} s={16} />
            </button>
          </li>
        ))}
      </ol>
      <div className="cti-ops__panel" key={a} role="tabpanel" aria-live="polite">
        <span className="cti-ops__k">
          Step 0{a + 1}
          {" of 08"}
        </span>
        <h3>
          <span>
            <RC_I n={s[0]} s={22} />
          </span>
          {s[1]}
        </h3>
        <p>{s[2]}</p>
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
        {a === 7 && (
          <div
            className="cti-bc"
            role="img"
            aria-label="Back-check coverage is set per project, within a range of 30 to 100 percent of interviews"
          >
            <span className="cti-bc__k">Back-check coverage, set per project</span>
            <div className="cti-bc__bar">
              <i />
              <b
                style={{
                  left: "30%",
                }}
              >
                30%
              </b>
              <b
                style={{
                  left: "100%",
                }}
              >
                100%
              </b>
            </div>
            <span className="cti-bc__note">
              The level is agreed with the client for each study; it is not a fixed rate for every project.
            </span>
          </div>
        )}
        <div className="cti-ops__nav">
          <button onClick={() => setA((a + 7) % 8)} aria-label="Previous step">
            ←
          </button>
          <button onClick={() => setA((a + 1) % 8)} aria-label="Next step">
            →
          </button>
        </div>
      </div>
    </div>
  );
}
const CTI_QC = [
  ["okc", "Interview authentication", "Respondents re-contacted where required to validate interviews."],
  ["list", "Completeness & plausibility", "Results checked for completeness and plausibility."],
  ["userplus", "Interviewer selection", "Structured selection and allocation of field interviewers."],
  ["clipboard", "Central briefing", "Key project personnel receive a central project briefing."],
  ["rec", "Recordings", "Audio or video recordings where the project requires them."],
  ["refresh", "Back checks", "Respondent authentication according to project requirements."],
  ["lock", "Data protection", "Secure processes and controlled transmission of project files."],
  ["database", "Data backup", "Regular backups are maintained."],
  ["msg", "Client updates", "Regular progress feedback to clients during fieldwork."],
];
function CTI_Quality() {
  const [h, setH] = ee.useState(null);
  return (
    <div className="cti-qc">
      <div className="cti-qc__core" aria-hidden="true">
        <svg viewBox="0 0 200 200">
          {CTI_QC.map((_, i) => (
            <circle
              key={i}
              cx="100"
              cy="100"
              r="86"
              pathLength="90"
              strokeDasharray="8.6 81.4"
              strokeDashoffset={-i * 10}
              className={"cti-qc__seg" + (h === i ? " is-on" : "")}
            />
          ))}
        </svg>
        <span>
          <RC_I n="shield" s={34} />
          <strong>{h === null ? "Quality built in" : CTI_QC[h][1]}</strong>
        </span>
      </div>
      <ul className="cti-qc__list">
        {CTI_QC.map(([ic, t, d], i) => (
          <li
            key={t}
            tabIndex="0"
            onMouseEnter={() => setH(i)}
            onMouseLeave={() => setH(null)}
            onFocus={() => setH(i)}
            onBlur={() => setH(null)}
            className={h === i ? "is-on" : ""}
          >
            <span>
              <RC_I n={ic} s={18} />
            </span>
            <div>
              <strong>{t}</strong>
              <em>{d}</em>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
function CTI_Infra() {
  const [ref, v] = RC_useInView(0.25);
  const tiers = [
    [
      "Interviewing centre",
      "building",
      [
        ["Delhi, in-house", "25 seats"],
        ["Dell desktops & servers", null],
        ["Thin-client technology", null],
      ],
    ],
    [
      "CATI platform",
      "monitor",
      [
        ["CATI software", null],
        ["Predictive dialling", null],
        ["Call recording", null],
        ["Automated calling workflow", null],
      ],
    ],
    [
      "Network & resilience",
      "router",
      [
        ["Firewall", null],
        ["Cisco routers", null],
        ["WAN / VPN connectivity", null],
        ["LAN redundancy", "Data & voice"],
        ["Power backup", "50 KVA DG set"],
      ],
    ],
  ];
  return (
    <div ref={ref} className={"cti-inf" + (v ? " is-in" : "")}>
      <CTI_Tech />
      <div className="cti-inf__tiers">
        {tiers.map(([t, ic, xs], i) => (
          <div
            key={t}
            className="cti-inf__tier"
            style={{
              "--i": i,
            }}
          >
            <span className="cti-inf__th">
              <RC_I n={ic} s={18} />
              {t}
            </span>
            <ul>
              {xs.map(([x, d]) => (
                <li key={x}>
                  <strong>{x}</strong>
                  {d && <em>{d}</em>}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="cti-inf__partner">
          <span className="cti-inf__th">
            <RC_I n="globe" s={18} />
            Global partner CATI studios
          </span>
          <p>Used where a project needs them. These studios are operated by partners, not by Frequent Research.</p>
        </div>
      </div>
    </div>
  );
}
function CTI_Clock() {
  const R = 84,
    c = 110;
  const arc = (h1, h2, r) => {
    const a1 = (h1 / 24) * 2 * Math.PI - Math.PI / 2,
      a2 = (h2 / 24) * 2 * Math.PI - Math.PI / 2;
    const large = (h2 - h1 + 24) % 24 > 12 ? 1 : 0;
    return `M${c + r * Math.cos(a1)} ${c + r * Math.sin(a1)} A${r} ${r} 0 ${large} 1 ${c + r * Math.cos(a2)} ${c + r * Math.sin(a2)}`;
  };
  return (
    <svg
      viewBox="0 0 220 220"
      className="cti-clock"
      role="img"
      aria-label="24-hour dial showing calling windows for three language regions in IST"
    >
      <circle cx={c} cy={c} r={R + 18} className="cti-clock__face" />
      {Array.from(
        {
          length: 24,
        },
        (_, i) => {
          const a = (i / 24) * 2 * Math.PI - Math.PI / 2;
          return (
            <line
              key={i}
              x1={c + (R + 10) * Math.cos(a)}
              y1={c + (R + 10) * Math.sin(a)}
              x2={c + (R + (i % 6 ? 14 : 18)) * Math.cos(a)}
              y2={c + (R + (i % 6 ? 14 : 18)) * Math.sin(a)}
              className="cti-clock__tick"
            />
          );
        },
      )}
      {[0, 6, 12, 18].map((h) => {
        const a = (h / 24) * 2 * Math.PI - Math.PI / 2;
        return (
          <text
            key={h}
            x={c + (R - 8) * Math.cos(a)}
            y={c + (R - 8) * Math.sin(a) + 4}
            textAnchor="middle"
            className="cti-clock__h"
          >
            {String(h).padStart(2, "0")}
          </text>
        );
      })}
      <path d={arc(9.5, 17.5, 62)} className="cti-clock__a cti-clock__a0" />
      <path d={arc(13.5, 21.5, 52)} className="cti-clock__a cti-clock__a1" />
      <path d={arc(19.5, 3.5, 42)} className="cti-clock__a cti-clock__a2" />
      <text x={c} y={c - 2} textAnchor="middle" className="cti-clock__c">
        24 h
      </text>
      <text x={c} y={c + 14} textAnchor="middle" className="cti-clock__s">
        IST
      </text>
    </svg>
  );
}
const CTI_EXP = [
  [
    "h",
    "190",
    "In-depth interviews",
    "Physician specialists",
    ["Norway", "Denmark", "Sweden", "Germany"],
    "In-depth interviews among physician specialists.",
  ],
  [
    "h",
    "200",
    "Online interviews",
    "Doctors, directors & hospital administrators",
    ["Germany"],
    "Online interviews across clinical and hospital-management roles.",
  ],
  [
    "h",
    "300",
    "Interviews incl. CATI",
    "Surgeons",
    ["Japan", "China", "Australia", "India"],
    "Interviews with different types of surgeons, including 240-minute CATI interviews.",
  ],
  [
    "b",
    "750",
    "Interviews",
    "Director-and-above respondents",
    ["Multiple countries"],
    "Senior respondents from companies with 500+ employees.",
  ],
  [
    "b",
    "350",
    "CATI interviews",
    "Business-card owners",
    ["USA", "UK"],
    "Corporate versus personal credit-card usage.",
  ],
  [
    "b",
    null,
    "In-depth interviews",
    "Bank directors",
    ["Indonesia", "Malaysia"],
    "In-depth interviews combined with desk research and survey analysis.",
  ],
  [
    "h",
    "400",
    "Interviews & follow-ups",
    "Pharmacists",
    ["France", "Germany", "USA", "Australia"],
    "Pharmacists interviewed and followed up.",
  ],
  [
    "b",
    null,
    "Interviews",
    "Managers & builders, large construction companies",
    ["Finland", "Sweden"],
    "Interviews combined with desk research.",
  ],
  [
    "h",
    null,
    "Recruitment",
    "Physician specialists",
    ["Japan", "Korea", "England", "France"],
    "Physician-specialist recruitment for an online community.",
  ],
  [
    "h",
    "520",
    "Interviews",
    "Specified patient audiences",
    ["Sri Lanka", "MENA"],
    "Interviews among defined patient groups.",
  ],
  [
    "b",
    "620",
    "Interviews",
    "Procurement managers",
    ["Australia", "Malaysia", "Indonesia", "Sri Lanka"],
    "Procurement managers in inkjet-printer-user industries.",
  ],
];
function CTI_Exp() {
  const [f, setF] = ee.useState("all");
  const [all, setAll] = ee.useState(false);
  const list = CTI_EXP.filter((x) => f === "all" || x[0] === f);
  const shown = all ? list : list.slice(0, 6);
  return (
    <div className="cti-exp">
      <div className="cti-exp__f" role="radiogroup" aria-label="Filter project examples">
        {[
          ["all", "All examples"],
          ["h", "Healthcare"],
          ["b", "B2B & professional"],
        ].map(([k, t]) => (
          <button
            key={k}
            role="radio"
            aria-checked={f === k}
            className={f === k ? "is-on" : ""}
            onClick={() => {
              setF(k);
              setAll(false);
            }}
          >
            {t}
            <span>{k === "all" ? CTI_EXP.length : CTI_EXP.filter((x) => x[0] === k).length}</span>
          </button>
        ))}
      </div>
      <ul className="cti-exp__grid">
        {shown.map(([k, n, m, who, mk, d], i) => (
          <RC_Reveal
            as="li"
            key={who + mk.join()}
            className={"cti-exp__card cti-exp__card--" + k}
            style={{
              "--i": i % 3,
            }}
          >
            <div className="cti-exp__top">
              <span className="cti-exp__tag">{k === "h" ? "Healthcare" : "B2B"}</span>
              <span className="cti-exp__m">{m}</span>
            </div>
            {n ? (
              <strong className="cti-exp__n">{n}</strong>
            ) : (
              <strong className="cti-exp__n cti-exp__n--t">{m}</strong>
            )}
            <span className="cti-exp__who">{who}</span>
            <p>{d}</p>
            <ul className="cti-exp__mk">
              {mk.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </RC_Reveal>
        ))}
      </ul>
      {list.length > 6 && (
        <button className="rc-ind__more cti-exp__more" aria-expanded={all} onClick={() => setAll(!all)}>
          {all ? "Show fewer" : `Show all ${list.length} examples`}
        </button>
      )}
    </div>
  );
}
function CATI_Page({ a, n }) {
  const Faq = FaqList,
    Form = EnquiryForm;
  const [active, setActive] = ee.useState("cti-overview");
  const nav = [
    ["cti-overview", "Overview"],
    ["cti-capabilities", "Capabilities"],
    ["cti-audiences", "Audiences"],
    ["cti-languages", "Languages"],
    ["cti-process", "Process"],
    ["cti-quality", "Quality"],
    ["cti-infra", "Infrastructure"],
    ["cti-experience", "Experience"],
    ["cti-why", "Why us"],
    ["cti-faq", "FAQ"],
    ["cti-enquire", "Contact"],
  ];
  const faqs = [
    {
      q: "What is CATI research?",
      a: "CATI (computer-assisted telephone interviewing) is telephone research in which interviewers follow a structured questionnaire on screen and record answers directly into the CATI system as the interview happens.",
    },
    {
      q: "What types of respondents can you interview through CATI?",
      a: "We interview consumers (B2C), business professionals and decision-makers (B2B), and healthcare audiences such as physicians, pharmacists, nurses, patients and caregivers. Availability for each audience is confirmed per country during feasibility.",
    },
    {
      q: "Can you conduct multilingual CATI studies?",
      a: "Yes. Our multilingual interviewers support studies across the Americas, Europe, Asia, Africa and the Middle East, with native-language interviewing arranged where the project requires it.",
    },
    {
      q: "Can CATI interviews be recorded?",
      a: "Yes. Audio or video recordings can be made when the client or project requires them.",
    },
    {
      q: "Do you conduct back checks?",
      a: "Yes. Back checks and respondent authentication are carried out according to project requirements, with coverage agreed per study within a range of 30% to 100% of interviews.",
    },
    {
      q: "Can you handle difficult-to-reach B2B and healthcare audiences?",
      a: "Yes. Our experience includes CXOs, directors, senior and middle management, procurement professionals, physician specialists, surgeons, pharmacists and patient audiences.",
    },
    {
      q: "Do you provide 24/7 CATI support?",
      a: "Our CATI operation is set up for round-the-clock availability, so calling can be scheduled for respondents in different time zones. Shift plans are agreed for each project.",
    },
    {
      q: "Can CATI be combined with other research methods?",
      a: "Yes. CATI can sit alongside online research, in-depth interviews, focus groups, face-to-face interviews, mystery shopping and secondary research within one programme.",
    },
  ];
  ee.useEffect(() => {
    window.scrollTo(0, 0);
    const url = "https://www.frequentresearch.com/services/market-research/cati";
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
    const title = "CATI Services & Telephone Research | Frequent Research";
    const desc =
      "CATI research services from Frequent Research: multilingual computer-assisted telephone interviewing for B2B, B2C and healthcare audiences, with quality control.";
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
          ["CATI \u2014 Computer-Assisted Telephone Interviewing", "/services/market-research/cati"],
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
        name: "CATI \u2014 Computer-Assisted Telephone Interviewing",
        serviceType: "Computer-assisted telephone interviewing (CATI) research",
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
    <div className="cti rc">
      <section className="cti-hero">
        <svg className="cti-hero__bg" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M0 ${380 + i * 34} C360 ${300 + i * 30} 720 ${480 + i * 22} 1080 ${360 + i * 30} S1440 ${330 + i * 30} 1440 ${330 + i * 30}`}
              style={{
                "--i": i,
              }}
            />
          ))}
        </svg>
        <div className="container cti-hero__in">
          <div className="cti-hero__copy">
            <nav className="crumbs od-crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>
                <Link to={`/services/${a.slug}`}>{a.name}</Link>
              </span>
              <span>
                <span aria-current="page">CATI</span>
              </span>
            </nav>
            <span className="cti-eyebrow">
              <RC_I n="phonecall" s={15} />
              Telephone research · Market research
            </span>
            <HeroH1>CATI — Computer-Assisted Telephone Interviewing</HeroH1>
            <p className="cti-hero__sub">
              Structured telephone research, multilingual interviewing and reliable data collection for B2C, B2B and
              healthcare audiences.
            </p>
            <p className="cti-hero__body">
              Frequent Research manages CATI projects through a structured process: trained interviewers, a single point
              of contact and quality controls from briefing to back checks.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--primary btn--lg cti-btn" href="#cti-enquire" onClick={rcScrollTo("cti-enquire")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--ghost btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="cti-hero__viz">
            <CTI_Hero />
          </div>
        </div>
        <div className="container">
          <ul className="cti-strip">
            {[
              ["phonecall", "CATI Research", "Structured computer-assisted telephone interviews."],
              [
                "globe",
                "Multilingual Interviewing",
                "Multilingual interviewers, with native-language support where required.",
              ],
              ["users", "B2B, B2C & Healthcare", "Access to complex consumer and professional audiences."],
              ["shield", "Quality-Controlled Fieldwork", "Briefing, mock calls, recordings, QC and back checks."],
            ].map(([ic, t, d], i) => (
              <li key={t} className={"cti-strip__i cti-strip__i" + i}>
                <span>
                  <RC_I n={ic} s={20} />
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
      <section className="cti-factsec" aria-label="CATI operation at a glance">
        <div className="container">
          <CTI_Facts />
        </div>
      </section>
      <section className="rc-sec" id="cti-overview">
        <div className="container">
          <div className="cti-intro">
            <div>
              <RC_Head kicker="What is CATI?" title="What Is CATI Research?" />
              <p className="cti-lead">
                Computer-assisted telephone interviewing combines structured telephone interviews with a controlled
                digital interviewing environment.
              </p>
              <p className="od-muted">
                Interviewers work from a questionnaire on screen that handles routing and skips, and record each answer
                as it is given. The result is consistent interviews and data that are ready for processing as soon as
                fieldwork closes.
              </p>
            </div>
            <div className="cti-intro__box">
              <p>
                {
                  "We provide structured telephone data collection with disciplined project management, multilingual interviewer support and quality control. CATI can be one part of a single programme alongside "
                }
                {svc("online-data-collection", "online surveys")}
                {", in-depth interviews, focus groups, mystery shopping and "}
                {svc("offline-data-collection", "face-to-face interviews")}, with project management handled in-house.
              </p>
              <ul>
                {[
                  ["Structured telephone interviews", "Interviewer-led, following predefined survey flows."],
                  ["Computer-assisted interviewing", "An on-screen questionnaire keeps every interview consistent."],
                  ["Real-time data capture", "Responses recorded during the interview, ready for processing."],
                  ["Flexible applications", "Surveys, customer, brand, satisfaction and industry research."],
                ].map(([t, d]) => (
                  <li key={t}>
                    <RC_I n="check" s={14} />
                    <div>
                      <strong>{t}</strong>
                      <span>{d}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <h3 className="cti-h3">How a telephone interview becomes validated data</h3>
          <CTI_What />
        </div>
      </section>
      <section className="rc-sec cti-sec--soft">
        <div className="container cti-whycati">
          <div>
            <RC_Head
              kicker="When to use it"
              title="Why CATI?"
              intro="Telephone interviewing earns its place when the audience, the language or the interview itself needs an interviewer."
            />
          </div>
          <ol className="cti-uses">
            {[
              [
                "target",
                "Hard-to-reach audiences",
                "Useful when respondents are difficult to access through standard online methods.",
              ],
              [
                "brief",
                "Professional respondents",
                "Suitable for B2B decision-makers and specialised professional audiences.",
              ],
              [
                "steth",
                "Healthcare professionals",
                "Useful for physicians, pharmacists, nurses, specialists and other healthcare stakeholders where appropriate.",
              ],
              ["globe", "Multilingual studies", "Supports interviews across multiple languages and markets."],
              [
                "list",
                "Structured interviews",
                "Interviewers follow standardised questionnaires and defined probing instructions.",
              ],
              [
                "timer",
                "Time-sensitive fieldwork",
                "Suits projects that need active interviewer management and structured fieldwork.",
              ],
            ].map(([ic, t, d], i) => (
              <RC_Reveal
                as="li"
                key={t}
                style={{
                  "--i": i % 2,
                }}
              >
                <span className="cti-uses__ic">
                  <RC_I n={ic} s={20} />
                </span>
                <div>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              </RC_Reveal>
            ))}
          </ol>
        </div>
      </section>
      <section className="rc-sec" id="cti-capabilities">
        <div className="container">
          <RC_Head
            kicker="Capabilities"
            title="Our CATI Capabilities"
            intro="Research-grade telephone interviewing first, with structured calling programmes where they fit the engagement."
          />
          <div className="cti-cap">
            {[
              [
                "users",
                "B2C CATI Research",
                "Telephone interviews with consumers and target customer groups.",
                "consumer-panel",
              ],
              [
                "brief",
                "B2B CATI Research",
                "Interviews with business professionals, decision-makers and industry participants.",
                "business-panel",
              ],
              [
                "steth",
                "Healthcare CATI",
                "Research among physicians, pharmacists, nurses, patients, caregivers and other healthcare stakeholders.",
                "healthcare-panel",
              ],
              [
                "clipboard",
                "Tele-Surveys",
                "Structured telephone surveys and respondent interviews.",
                "quantitative-research",
              ],
              ["search", "Information Gathering", "Structured collection of respondent information.", null],
              [
                "heart",
                "Customer Loyalty Programmes",
                "Telephone interactions built around customer feedback and loyalty programmes.",
                null,
              ],
            ].map(([ic, t, d, s], i) => (
              <RC_Reveal
                key={t}
                className="cti-cap__card hcard"
                style={{
                  "--i": i % 3,
                }}
              >
                <span className="cti-cap__ic">
                  <RC_I n={ic} s={22} />
                </span>
                <h3>{t}</h3>
                <p>{d}</p>
                {s && (
                  <Link className="rc-link" to={`/services/market-research/${s}`}>
                    {s.endsWith("panel") ? "See the panel" : "Quantitative research"} <RC_I n="arrow" s={14} />
                  </Link>
                )}
              </RC_Reveal>
            ))}
          </div>
          <div className="cti-prog">
            <div className="cti-prog__h">
              <strong>Structured calling programmes</strong>
              <span>Scripted, supervised programmes delivered where they suit the engagement.</span>
            </div>
            <ul>
              {[
                ["target", "Lead generation", "Outbound calling around defined lead-generation objectives."],
                ["cal", "Appointment setting", "Telephone-based appointment-setting programmes."],
                ["phonecall", "Welcome calls", "Welcome and onboarding calls for respondents or customers."],
                ["trend", "Direct sales support", "Sales-related calling where it applies to the engagement."],
              ].map(([ic, t, d]) => (
                <li key={t}>
                  <RC_I n={ic} s={17} />
                  <div>
                    <strong>{t}</strong>
                    <span>{d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cti-usecases">
            <span className="cti-usecases__k">Where CATI is used</span>
            <ul>
              {[
                "B2B research",
                "B2C research",
                "Customer satisfaction",
                "Brand & market research",
                "Product research",
                "Industry research",
                "Decision-maker interviews",
                "Healthcare & professional research",
                "Customer feedback",
                "Concept & usage studies",
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
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec cti-sec--ink" id="cti-audiences">
        <div className="container">
          <RC_Head
            light
            center
            kicker="Audiences"
            title="B2C, B2B and Healthcare Telephone Interviews"
            intro="Three audience families, each with its own screening, language and interviewing approach."
          />
          <div className="cti-aud">
            {[
              [
                "users",
                "B2C",
                "Consumer research",
                ["Consumers", "Customers", "Users", "General population audiences", "Targeted consumer segments"],
              ],
              [
                "brief",
                "B2B",
                "Business & professional research",
                [
                  "CXOs",
                  "Directors",
                  "Senior management",
                  "Middle management",
                  "Dealers",
                  "Distributors",
                  "Retailers",
                  "Procurement professionals",
                  "Technology leaders",
                ],
              ],
              [
                "steth",
                "Healthcare",
                "Healthcare research",
                [
                  "Physicians",
                  "Medical specialists",
                  "Surgeons",
                  "Pharmacists",
                  "Nurses",
                  "Patients",
                  "Caregivers",
                  "Other healthcare stakeholders",
                ],
              ],
            ].map(([ic, k, t, xs], i) => (
              <div key={k} className={"cti-aud__col cti-aud__col" + i}>
                <span className="cti-aud__ic">
                  <RC_I n={ic} s={22} />
                </span>
                <span className="cti-aud__k">{k}</span>
                <h3>{t}</h3>
                <ul>
                  {xs.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="cti-note cti-note--light">
            {"Audience availability varies by country and is confirmed during feasibility. See our "}
            {svc("consumer-panel", "consumer")}
            {", "}
            {svc("business-panel", "business")}
            {" and "}
            {svc("healthcare-panel", "healthcare")}
            {" panels."}
          </p>
        </div>
      </section>
      <section className="rc-sec" id="cti-languages">
        <div className="container cti-langwrap">
          <div>
            <RC_Head
              kicker="Multilingual CATI"
              title="Multilingual CATI Research"
              intro="Our interviewers are multilingual, so studies outside English-speaking markets can run in the respondent's own language."
            />
            <p className="od-muted">
              Native-language interviewing is arranged where the project requires it, and language availability is
              confirmed for each study. Hover over a language to see where it appears across regions.
            </p>
          </div>
          <CTI_Langs />
        </div>
      </section>
      <section className="rc-sec cti-sec--soft" id="cti-process">
        <div className="container">
          <RC_Head
            kicker="Operations"
            title="Our CATI Operations & Quality-Control Process"
            intro="Eight connected steps take a project from technical setup to authenticated interviews. Select a step."
          />
          <ol className="cti-glance" aria-label="CATI project at a glance">
            {[
              "Research requirement",
              "Questionnaire programming",
              "Interviewer briefing & training",
              "Sample / contact management",
              "CATI interviewing",
              "Quality control & validation",
              "Data delivery",
            ].map((t, i) => (
              <li key={t}>
                <span>{i + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <CTI_Ops />
        </div>
      </section>
      <section className="rc-sec cti-dashsec">
        <div className="container cti-dashwrap">
          <div>
            <RC_Head
              kicker="Fieldwork, visualised"
              title="From Dial to Data, Made Visible"
              intro="A view of what a CATI project keeps track of during fieldwork: call outcomes, quota progress, quality checks and call monitoring."
            />
            <ul className="cti-ticks">
              {[
                "Call outcomes by stage",
                "Quota progress by group",
                "Interview, QC and back-check progress",
                "Supervised calls and recordings where required",
              ].map((t) => (
                <li key={t}>
                  <RC_I n="check" s={14} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <CTI_Dash />
        </div>
      </section>
      <section className="cti-mid">
        <div className="container cti-mid__in">
          <div>
            <strong>Have a CATI project in mind?</strong>
            <span>
              Tell us about your audience, markets, questionnaire and timeline. Our team can help structure the right
              telephone research approach.
            </span>
          </div>
          <a className="btn btn--light btn--lg" href="#cti-enquire" onClick={rcScrollTo("cti-enquire")}>
            Discuss Your Requirement
          </a>
        </div>
      </section>
      <section className="rc-sec" id="cti-quality">
        <div className="container">
          <RC_Head
            center
            kicker="Quality"
            title="Quality Control Built Into the CATI Process"
            intro="Nine safeguards, applied from interviewer selection to client updates."
          />
          <CTI_Quality />
          <div className="cti-qmon" aria-label="How interview quality is monitored">
            <div className="cti-qmon__i">
              <span className="cti-qmon__k">
                <i className="cti-dash__live" />
                Call monitoring
              </span>
              <div className="cti-qmon__wave" aria-hidden="true">
                {Array.from(
                  {
                    length: 24,
                  },
                  (_, i) => (
                    <i
                      key={i}
                      style={{
                        "--i": i,
                        "--h": 0.3 + Math.abs(Math.sin(i * 1.1)) * 0.7,
                      }}
                    />
                  ),
                )}
              </div>
              <em>Supervisors oversee interviewer activity during fieldwork</em>
            </div>
            <div className="cti-qmon__i">
              <span className="cti-qmon__k">Interview status</span>
              <ul aria-hidden="true">
                {[
                  ["okc", "Complete"],
                  ["list", "Plausibility checked"],
                  ["refresh", "Back-check pending"],
                ].map(([ic, t], i) => (
                  <li key={t} className={"is-" + i}>
                    <RC_I n={ic} s={14} />
                    {t}
                  </li>
                ))}
              </ul>
              <em>Status of each interview as it moves through QC</em>
            </div>
            <div className="cti-qmon__i">
              <span className="cti-qmon__k">Secure data flow</span>
              <div className="cti-qmon__flow" aria-hidden="true">
                <span>
                  <RC_I n="edit" s={15} />
                </span>
                <i />
                <span>
                  <RC_I n="lock" s={15} />
                </span>
                <i />
                <span>
                  <RC_I n="database" s={15} />
                </span>
              </div>
              <em>Captured data moves through controlled, firewalled channels</em>
            </div>
          </div>
          <div className="cti-sec-block">
            <div className="cti-sec-block__h">
              <RC_I n="lock" s={22} />
              <div>
                <h3>Data security</h3>
                <p>Project files and respondent data move through controlled, secure channels.</p>
              </div>
            </div>
            <ul>
              {[
                ["Secure FTP", "server"],
                ["Firewalled VPN", "router"],
                ["Controlled project-file transmission", "share"],
                ["Confidentiality policies", "file"],
                ["Regular data backups", "database"],
                ["Controlled infrastructure", "shield"],
              ].map(([t, ic]) => (
                <li key={t}>
                  <RC_I n={ic} s={16} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="rc-sec cti-sec--soft" id="cti-infra">
        <div className="container">
          <RC_Head
            kicker="Infrastructure"
            title="CATI Infrastructure & Technology"
            intro="An in-house interviewing centre in Delhi, a CATI platform with predictive dialling and call recording, and a resilient network behind it."
          />
          <CTI_Infra />
          <div className="cti-tz">
            <CTI_Clock />
            <div>
              <h3>Designed for Global Time Zones</h3>
              <p>
                Our CATI operation is set up for round-the-clock availability, so calling can be scheduled to
                respondents' local hours in each market. Shift plans are agreed for each project.
              </p>
              <ul className="cti-tz__lg">
                <li>
                  <i className="a0" />
                  Europe & Africa window
                </li>
                <li>
                  <i className="a1" />
                  Middle East & Asia window
                </li>
                <li>
                  <i className="a2" />
                  Americas window
                </li>
              </ul>
              {null}
            </div>
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Sectors" title="Industries We Serve" />
          <ul className="cti-ind">
            {[
              ["leaf", "Agriculture"],
              ["shirt", "Apparel, Textile & Fashion"],
              ["car", "Automotive"],
              ["bookopen", "Education"],
              ["zap2", "Energy"],
              ["cart", "FMCG"],
              ["food", "Food & Beverages"],
              ["game", "Games, Apps & Social Media"],
              ["steth", "Healthcare & Life Sciences"],
              ["appliance", "Home Appliances"],
              ["cpu", "IT & Telecommunication"],
              ["truck", "Logistics"],
              ["pill", "Pharmaceuticals"],
              ["building", "Real Estate & Construction"],
              ["store", "Retail & Chain Store"],
              ["plane", "Travel & Tourism"],
            ].map(([ic, t], i) => (
              <li
                key={t}
                style={{
                  "--i": i % 8,
                }}
              >
                <span>
                  <RC_I n={ic} s={20} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec cti-sec--soft" id="cti-experience">
        <div className="container">
          <div className="cti-exphead">
            <RC_Head
              kicker="Experience"
              title="Selected CATI & Research Experience"
              intro="Selected examples from our project experience, shown as snapshots of scope rather than outcomes."
            />
            <div className="cti-cred">
              <div>
                <RC_I n="clock" s={18} />
                <p>
                  <strong>4+ years</strong>
                  {" managing and producing CATI and online B2C, B2B and healthcare studies."}
                </p>
              </div>
              <div>
                <RC_I n="user" s={18} />
                <p>
                  {"Interviewers with "}
                  <strong>5+ years</strong>
                  {" of research-study interviewing experience."}
                </p>
              </div>
            </div>
          </div>
          <CTI_Exp />
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="People" title="The Team Behind Your CATI Project" />
          <div className="cti-team">
            <div className="cti-team__pm">
              <span>
                <RC_I n="clipboard" s={22} />
              </span>
              <strong>Project Coordination</strong>
              <em>Execution, timelines and communication coordinated in one place.</em>
            </div>
            <ul>
              {[
                ["users", "CATI Supervisors", "Oversee interviewer activity and field execution."],
                [
                  "phonecall",
                  "Telephone Interviewers",
                  "Conduct structured interviews according to project requirements.",
                ],
                ["shield", "Quality Team", "Supports quality-control procedures, checks and authentication."],
                ["cpu", "Technical Team", "Manages project setup and CATI technology requirements."],
              ].map(([ic, t, d]) => (
                <li key={t}>
                  <span>
                    <RC_I n={ic} s={20} />
                  </span>
                  <strong>{t}</strong>
                  <em>{d}</em>
                </li>
              ))}
            </ul>
          </div>
          <p className="cti-note cti-note--c">
            <Link to="/our-team">
              {"Meet our team "}
              <RC_I n="arrow" s={14} />
            </Link>
          </p>
        </div>
      </section>
      <WU_Section slug="cati" id="cti-why" />
      <section className="rc-sec cti-std">
        <div className="container cti-std__in">
          <div>
            <RC_Head
              kicker="Standards"
              title="Certifications & Standards"
              intro="The standards and codes our research operations work to."
            />
          </div>
          <ul>
            {[
              ["ISO 20252:2019", "Market, opinion & social research", "Certified"],
              ["ISO 9001:2015", "Quality management systems", "Certified"],
              ["ISO/IEC 27001:2013", "Information security management", "Certified"],
              [
                "ESOMAR",
                "Global association for research and insights",
                "Corporate member; we follow ESOMAR standards",
              ],
            ].map(([c, t, s]) => (
              <li key={c}>
                <strong>{c}</strong>
                <span>{t}</span>
                <em>{s}</em>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="rc-sec cti-sec--soft">
        <div className="container cti-eco">
          <div>
            <RC_Head
              kicker="Related methods"
              title="Need More Than Telephone Interviews?"
              intro="CATI often sits within a broader research programme. Not every project uses every method; we combine only what the question needs."
            />
            <div className="cti-secres">
              <strong>
                <RC_I n="search" s={16} />
                Secondary research support
              </strong>
              <ul>
                {[
                  "Background research",
                  "Company profiling",
                  "External market analysis",
                  "Market trends",
                  "Public and paid database research",
                  "Organisation-status evaluation",
                ].map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
          <div
            className="cti-eco__map"
            role="img"
            aria-label="CATI at the centre of related research methods: online research, in-depth interviews, focus groups, face-to-face, mystery shopping, central location tests and secondary research"
          >
            <svg viewBox="0 0 400 400" aria-hidden="true">
              {Array.from(
                {
                  length: 7,
                },
                (_, i) => {
                  const ang = ((-90 + i * (360 / 7)) * Math.PI) / 180;
                  return (
                    <line key={i} x1="200" y1="200" x2={200 + Math.cos(ang) * 150} y2={200 + Math.sin(ang) * 150} />
                  );
                },
              )}
              <circle cx="200" cy="200" r="150" />
            </svg>
            <div className="cti-eco__core">
              <RC_I n="phonecall" s={22} />
              <strong>CATI</strong>
            </div>
            {[
              ["Online research", "online-data-collection"],
              ["In-depth interviews", "qualitative-research"],
              ["Focus groups", "qualitative-research"],
              ["Face-to-face", "offline-data-collection"],
              ["Mystery shopping", null],
              ["Central location tests", "offline-data-collection"],
              ["Secondary research", null],
            ].map(([t, s], i) => {
              const style = {
                "--a": -90 + i * (360 / 7) + "deg",
              };
              return s ? (
                <Link key={t} to={`/services/market-research/${s}`} className="cti-eco__n" style={style}>
                  <span>{t}</span>
                </Link>
              ) : (
                <span key={t} className="cti-eco__n cti-eco__n--x" style={style}>
                  <span>{t}</span>
                </span>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section" id="cti-faq">
        <div className="container split">
          <h2 className="split__title">CATI: frequently asked questions</h2>
          <div className="split__body">
            <Faq items={faqs} />
          </div>
        </div>
      </section>
      <section className="od-cta cti-cta" id="cti-enquire">
        <div className="container od-cta__in">
          <div className="od-cta__copy">
            <span className="rc-kicker">Start a project</span>
            <h2>Let's Talk About Your CATI Requirement</h2>
            <p>
              Share your audience, markets, number of interviews, timeline and questionnaire if you have one. We will
              come back with feasibility and an approach.
            </p>
            <div className="od-hero__ctas">
              <a className="btn btn--light btn--lg" href="#cti-form" onClick={rcScrollTo("cti-form")}>
                Get a Free Consultation
              </a>
              <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=quote">
                Request a Quote
              </Link>
            </div>
          </div>
          <div className="card-form" id="cti-form">
            <Form type={SERVICE_FORM_KEY[a.slug]} service={`${a.name}: ${n.name}`} compact />
          </div>
        </div>
      </section>
      <section className="rc-sec">
        <div className="container">
          <RC_Head kicker="Related" title="Related research services" />
          <div className="cp-rel__grid">
            {[
              ["online-data-collection", "Online data collection"],
              ["offline-data-collection", "Face-to-face research"],
              ["qualitative-research", "Qualitative research"],
              ["quantitative-research", "Quantitative research"],
              ["research-consultancy", "Research consultancy"],
              ["healthcare-panel", "Healthcare panel"],
              ["business-panel", "Business panel"],
              ["consumer-panel", "Consumer panel"],
              ["data-processing-and-analytics", "Data processing & analytics"],
            ].map(([s, t]) => (
              <Link key={s} to={`/services/market-research/${s}`} className="cp-rel__card hcard">
                <strong>{t}</strong>
                <RC_I n="arrow" s={16} />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export { CATI_Page, OD_Count };
