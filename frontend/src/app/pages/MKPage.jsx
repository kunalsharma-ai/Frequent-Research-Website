import * as ee from 'react';
import { Link } from 'react-router-dom';
import { RG_FLAGS } from '../data/maps.jsx';
import { RG_MAP } from '../data/mapRegions.jsx';
import { EnquiryForm } from '../shared/CoreParts.jsx';
import { RC_I, RC_useInView } from '../shared/Reveal.jsx';
import { MKX_Hero } from '../../components/site/MarketplaceArt.jsx';
import { MK_FLOW, MK_MARKETS, MkLink, mkFlag } from '../data/mkBits.jsx';

const MK_TYPES = [
  {
    k: "consumer",
    t: "Consumer",
    ic: "users",
    c: "#1E5BFF",
    lt: "#5B8CFF",
    d: "Reach consumers based on demographic, geographic, behavioural and category-specific criteria.",
    ideal: [
      "Brand research",
      "Product research",
      "Concept testing",
      "Advertising research",
      "Customer experience",
      "Usage & attitude studies",
      "Pricing research",
      "Market sizing",
      "Brand tracking",
      "Purchase behaviour",
      "Category studies",
    ],
    target: [
      "Age",
      "Gender",
      "Region",
      "Income",
      "Education",
      "Employment status",
      "Product usage",
      "Purchase behaviour",
      "Brand usage",
      "Category experience",
    ],
    aud: [
      "General Consumers",
      "Parents",
      "Affluent Consumers",
      "Gen Z",
      "Millennials",
      "Online Shoppers",
      "Category Users",
      "Product Owners",
    ],
  },
  {
    k: "b2b",
    t: "B2B",
    ic: "award",
    c: "#5A3FE0",
    lt: "#A8B6FF",
    d: "Reach professionals, business decision-makers and industry-specific audiences.",
    ideal: [
      "B2B market research",
      "Technology research",
      "Procurement studies",
      "Industry research",
      "Professional services",
      "SaaS research",
      "Manufacturing",
      "Financial services",
      "Energy",
      "Automotive",
      "Retail",
      "Logistics",
      "Construction",
      "Other specialist industries",
    ],
    target: [
      "Industry",
      "Job function",
      "Seniority",
      "Company size",
      "Revenue",
      "Department",
      "Decision-making responsibility",
      "Purchasing responsibility",
      "Technology adoption",
      "Business experience",
    ],
    aud: [
      "Business Decision-Makers",
      "IT Professionals",
      "Procurement Professionals",
      "Marketing Professionals",
      "Finance Professionals",
      "HR Professionals",
      "Executives & Owners",
      "Industry Specialists",
    ],
  },
  {
    k: "health",
    t: "Healthcare",
    ic: "shield",
    c: "#0E9C88",
    lt: "#6EE0CE",
    d: "Reach healthcare professionals and healthcare-related audiences using specialist targeting.",
    ideal: [
      "Physicians",
      "Specialists",
      "General practitioners",
      "Surgeons",
      "Nurses",
      "Pharmacists",
      "Dentists",
      "Hospital professionals",
      "Allied healthcare professionals",
      "Healthcare decision-makers",
      "Patients",
      "Caregivers",
    ],
    target: [
      "Medical specialty",
      "Experience",
      "Practice type",
      "Healthcare facility",
      "Department",
      "Geography",
      "Professional seniority",
      "Patient profile",
      "Treatment experience",
      "Product/category experience",
    ],
    aud: [
      "Physicians",
      "Specialists",
      "Nurses",
      "Pharmacists",
      "Dentists",
      "Healthcare Decision-Makers",
      "Patients",
      "Caregivers",
    ],
  },
];
const MK_CONTROL = [
  "Choose your audience.",
  "Set your quotas.",
  "Select your markets.",
  "Specify your sample size.",
  "Review your estimated cost.",
  "Purchase your sample.",
  "Track your fieldwork.",
];
const MK_AGE0 = [
  ["18\u201324", 20],
  ["25\u201334", 30],
  ["35\u201344", 25],
  ["45\u201354", 15],
  ["55+", 10],
];
const mkFmt = (n) => (n || 0).toLocaleString("en-IN");
function MK_Head({ k, t, i, light, center, id }) {
  return (
    <div className={"mk-head" + (light ? " mk-head--light" : "") + (center ? " mk-head--center" : "")}>
      {k && <span className="mk-kicker">{k}</span>}
      <h2 id={id}>{t}</h2>
      {i && <p>{i}</p>}
    </div>
  );
}
const MK_Illus = () => null;
function MK_Hero() {
  return <MKX_Hero />;
}
function MK_Flow() {
  const [ref, v] = RC_useInView(0.25);
  return (
    <section ref={ref} className={"section mk-flow" + (v ? " is-in" : "")} aria-labelledby="mk-flow">
      <div className="container">
        <MK_Head
          id="mk-flow"
          k="How it works"
          t="From Audience Definition to Sample Purchase"
          i="No lengthy RFQ process for standard sample requirements."
          center
        />
        <ol className="mk-track">
          {MK_FLOW.map(([t, ic], i) => (
            <li
              key={t}
              style={{
                "--i": i,
              }}
            >
              <span className="mk-track__n">
                <RC_I n={ic} s={20} />
              </span>
              <b>{t}</b>
              <em>{String(i + 1).padStart(2, "0")}</em>
            </li>
          ))}
          <i className="mk-track__line" aria-hidden="true">
            <b />
          </i>
        </ol>
        <div className="mk-control">
          <div className="mk-control__copy">
            <p>
              Build your research sample yourself while keeping access to Frequent Research's global audience network,
              recruitment capabilities and quality-control framework.
            </p>
            <h3>You stay in control.</h3>
            <div className="mk-help">
              <span>
                <RC_I n="msg" s={18} />
              </span>
              <div>
                <b>And when the requirement gets complicated,</b>
                {" our research team is one click away."}
              </div>
              <MkLink to="/lets-talk?type=audience" className="btn btn--primary">
                Talk to an Expert
              </MkLink>
            </div>
          </div>
          <ul className="mk-checks">
            {MK_CONTROL.map((c, i) => (
              <li
                key={c}
                style={{
                  "--i": i,
                }}
              >
                <span>
                  <svg viewBox="0 0 16 16">
                    <path d="M3 8.5l3.2 3L13 4.5" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
const MK_STEPS = ["Audience", "Markets", "Sample size", "Targeting", "Quotas", "Survey details", "Review"];
function MK_Builder() {
  const [step, setStep] = ee.useState(0);
  const [aud, setAud] = ee.useState("consumer");
  const [mk, setMk] = ee.useState({
    in: 500,
  });
  const [tg, setTg] = ee.useState([]);
  const [male, setMale] = ee.useState(50);
  const [age, setAge] = ee.useState(MK_AGE0.map((a) => a[1]));
  const [loi, setLoi] = ee.useState(10);
  const [ir, setIr] = ee.useState("");
  const [url, setUrl] = ee.useState("");
  const [screen, setScreen] = ee.useState("");
  const [err, setErr] = ee.useState("");
  const T = MK_TYPES.find((x) => x.k === aud) || {
    t: "Multiple",
    ic: "layers",
    c: "#0B22A8",
    lt: "#6EE0CE",
    target: [...new Set(MK_TYPES.flatMap((x) => x.target))].slice(0, 14),
  };
  const codes = Object.keys(mk),
    total = codes.reduce((n, c) => n + (+mk[c] || 0), 0),
    ageSum = age.reduce((a, b) => a + (+b || 0), 0);
  const urlOk = !url || /^https?:\/\/\S+\.\S+/.test(url);
  const problems = [
    !codes.length && "Select at least one market.",
    codes.some((c) => !(+mk[c] >= 10 && +mk[c] <= 2e4)) && "Each market needs 10\u201320,000 completes.",
    ageSum !== 100 && `Age quotas must add up to 100% (now ${ageSum}%).`,
    !urlOk && "Survey URL should start with http:// or https://.",
  ].filter(Boolean);
  const stepCheck = (n) => {
    if (n === 1 && !codes.length) return "Select at least one market.";
    if (n === 2 && codes.some((c) => !(+mk[c] >= 10 && +mk[c] <= 2e4)))
      return "Enter 10\u201320,000 completes for each market.";
    if (n === 4 && ageSum !== 100) return `Age quotas must add up to 100% (now ${ageSum}%).`;
    if (n === 5 && !urlOk) return "Survey URL should start with http:// or https://.";
    return "";
  };
  const go = (n) => {
    if (n > step) {
      for (let k = step; k < n; k++) {
        const e = stepCheck(k);
        if (e) {
          setErr(e);
          setStep(k);
          return;
        }
      }
    }
    setErr("");
    setStep(n);
  };
  const tog = (c) =>
    setMk((o) => {
      const n = {
        ...o,
      };
      if (c in n) delete n[c];
      else n[c] = 200;
      return n;
    });
  const summary = `Sample marketplace request \u2014 Audience: ${T.t}; Markets: ${codes.map((c) => `${(MK_MARKETS.find((m) => m[0] === c) || [c, c])[1]} ${mk[c]}`).join(", ")}; Total completes: ${total}; Targeting: ${tg.join(", ") || "none"}; Quotas: Male ${male}% / Female ${100 - male}%, Age ${MK_AGE0.map((a, i) => `${a[0]} ${age[i]}%`).join(", ")}; LOI: ${loi} min; Incidence: ${ir || "not sure"}.`;
  return (
    <section className="section mk-build" id="builder" aria-labelledby="mk-build">
      <div className="container">
        <MK_Head
          id="mk-build"
          k="DIY sample builder"
          t="Build Your Sample in Minutes"
          i="Configure your audience, markets, size and quotas. We confirm feasibility and pricing for your exact specification."
          light
          center
        />
        <div
          className="mk-b"
          style={{
            "--c": T.c,
            "--lt": T.lt,
          }}
        >
          <ol className="mk-b__steps" role="tablist" aria-label="Builder steps">
            {MK_STEPS.map((s, i) => (
              <li key={s} role="presentation">
                <button
                  role="tab"
                  aria-selected={i === step}
                  className={(i === step ? "is-on " : "") + (i < step ? "is-done" : "")}
                  onClick={() => go(i)}
                >
                  <span>{i < step ? "\u2713" : i + 1}</span>
                  {s}
                </button>
              </li>
            ))}
          </ol>
          <div className="mk-b__body">
            <div className="mk-b__pane" key={step}>
              {step === 0 && (
                <>
                  <h3>Who do you want to reach?</h3>
                  <div className="mk-b__aud">
                    {[
                      ...MK_TYPES,
                      {
                        k: "multi",
                        t: "Multiple",
                        ic: "layers",
                        c: "#0B22A8",
                        d: "Combine consumer, B2B and healthcare audiences in one project.",
                      },
                    ].map((x) => (
                      <button
                        key={x.k}
                        className={"mk-b__card" + (aud === x.k ? " is-on" : "")}
                        style={{
                          "--c": x.c,
                        }}
                        onClick={() => {
                          setAud(x.k);
                          setTg([]);
                        }}
                        aria-pressed={aud === x.k}
                      >
                        <span>
                          <RC_I n={x.ic} s={22} />
                        </span>
                        <b>{x.t}</b>
                        <small>{x.d}</small>
                      </button>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h3>Select one or multiple countries</h3>
                  <div className="mk-b__flags">
                    {MK_MARKETS.map(([c, n]) => (
                      <button
                        key={c}
                        className={"mk-b__flag" + (c in mk ? " is-on" : "")}
                        onClick={() => tog(c)}
                        aria-pressed={c in mk}
                      >
                        <img src={mkFlag(c)} alt="" width="28" height="20" />
                        {n}
                      </button>
                    ))}
                  </div>
                  <p className="mk-b__note">Other markets are available on request.</p>
                </>
              )}
              {step === 2 && (
                <>
                  <h3>Completed interviews needed per market</h3>
                  <ul className="mk-b__sizes">
                    {codes.map((c) => {
                      const v = +mk[c] || 0,
                        bad = !(v >= 10 && v <= 2e4);
                      return (
                        <li key={c} className={bad ? "is-bad" : ""}>
                          <img src={mkFlag(c)} alt="" width="28" height="20" />
                          <b>{(MK_MARKETS.find((m) => m[0] === c) || [c, c])[1]}</b>
                          <input
                            type="range"
                            min="50"
                            max="3000"
                            step="50"
                            value={Math.min(3e3, Math.max(50, v))}
                            onChange={(e) =>
                              setMk((o) => ({
                                ...o,
                                [c]: +e.target.value,
                              }))
                            }
                            aria-label="Completes"
                          />
                          <input
                            type="number"
                            min="10"
                            max="20000"
                            value={mk[c]}
                            onChange={(e) =>
                              setMk((o) => ({
                                ...o,
                                [c]: e.target.value.replace(/\D/g, "").slice(0, 5),
                              }))
                            }
                            aria-invalid={bad}
                            aria-label="Completes (number)"
                          />
                        </li>
                      );
                    })}
                  </ul>
                  <div className="mk-b__total">
                    <span>Total</span>
                    <b>{mkFmt(total)}</b>
                    <span>
                      {"completes across "}
                      {codes.length} {codes.length === 1 ? "market" : "markets"}
                    </span>
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <h3>Add targeting criteria</h3>
                  <div className="mk-b__chips">
                    {T.target.map((t) => (
                      <button
                        key={t}
                        className={tg.includes(t) ? "is-on" : ""}
                        aria-pressed={tg.includes(t)}
                        onClick={() => setTg((o) => (o.includes(t) ? o.filter((x) => x !== t) : [...o, t]))}
                      >
                        {tg.includes(t) ? "\u2713 " : "+ "}
                        {t}
                      </button>
                    ))}
                  </div>
                  <p className="mk-b__note">
                    Country, region, city/urbanity and language targeting are available where supported.
                  </p>
                </>
              )}
              {step === 4 && (
                <>
                  <h3>Set your quota distribution</h3>
                  <div className="mk-b__q">
                    <div className="mk-b__gender">
                      <span>Gender</span>
                      <div className="mk-b__split">
                        <i
                          style={{
                            width: male + "%",
                          }}
                        >
                          {"Male "}
                          {male}%
                        </i>
                        <i
                          style={{
                            width: 100 - male + "%",
                          }}
                        >
                          {"Female "}
                          {100 - male}%
                        </i>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={male}
                        onChange={(e) => setMale(+e.target.value)}
                        aria-label="Male share"
                      />
                    </div>
                    <div className="mk-b__age">
                      <span>
                        {"Age "}
                        <em className={ageSum === 100 ? "ok" : "bad"}>{ageSum}%</em>
                      </span>
                      <div className="mk-b__cols">
                        {MK_AGE0.map((a, i) => (
                          <label key={a[0]}>
                            <i
                              style={{
                                height: Math.min(100, age[i] * 2) + "%",
                              }}
                            />
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={age[i]}
                              onChange={(e) => {
                                const n = [...age];
                                n[i] = +e.target.value.replace(/\D/g, "").slice(0, 3) || 0;
                                setAge(n);
                              }}
                              aria-label={a[0] + " share"}
                            />
                            <b>{a[0]}</b>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mk-b__note">
                    Quotas can also be set on region, income, occupation, industry, company size, job level, medical
                    specialty, product usage, purchase frequency and custom criteria.
                  </p>
                </>
              )}
              {step === 5 && (
                <>
                  <h3>Survey details</h3>
                  <div className="mk-b__form">
                    <label>
                      <span>
                        {"Survey length (LOI): "}
                        <b>
                          {loi}
                          {" min"}
                        </b>
                      </span>
                      <input type="range" min="3" max="45" value={loi} onChange={(e) => setLoi(+e.target.value)} />
                    </label>
                    <label>
                      <span>Estimated incidence</span>
                      <select value={ir} onChange={(e) => setIr(e.target.value)}>
                        <option value="">Not sure</option>
                        {["Over 70%", "40\u201370%", "20\u201340%", "10\u201320%", "Under 10%"].map((x) => (
                          <option key={x}>{x}</option>
                        ))}
                      </select>
                    </label>
                    <label className={urlOk ? "" : "is-bad"}>
                      <span>Survey URL (optional)</span>
                      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
                      {!urlOk && <em>Start with http:// or https://</em>}
                    </label>
                    <label>
                      <span>Screening or special targeting</span>
                      <textarea
                        rows="3"
                        value={screen}
                        maxLength={400}
                        onChange={(e) => setScreen(e.target.value)}
                        placeholder="e.g. must own a car, decision-makers for cloud software"
                      />
                    </label>
                  </div>
                </>
              )}
              {step === 6 && (
                <>
                  <h3>Review your sample</h3>
                  <dl className="mk-b__review">
                    <div>
                      <dt>Audience</dt>
                      <dd>{T.t}</dd>
                    </div>
                    <div>
                      <dt>Markets</dt>
                      <dd className="mk-flags">
                        {codes.map((c) => (
                          <img key={c} src={mkFlag(c)} alt={c} width="22" height="16" />
                        ))}
                      </dd>
                    </div>
                    <div>
                      <dt>Completes</dt>
                      <dd>{mkFmt(total)}</dd>
                    </div>
                    <div>
                      <dt>LOI</dt>
                      <dd>
                        {loi}
                        {" min"}
                      </dd>
                    </div>
                    <div>
                      <dt>Incidence</dt>
                      <dd>{ir || "Not sure"}</dd>
                    </div>
                    <div>
                      <dt>Targeting</dt>
                      <dd>{tg.length ? tg.join(", ") : "Standard"}</dd>
                    </div>
                    <div className="mk-b__wide">
                      <dt>Feasibility, CPI, total cost & field duration</dt>
                      <dd>Calculated for your exact specification and confirmed before you buy.</dd>
                    </div>
                  </dl>
                  {problems.length ? (
                    <ul className="mk-b__probs">
                      {problems.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  ) : (
                    <MkLink
                      to={"/lets-talk?type=audience&brief=" + encodeURIComponent(summary)}
                      className="btn btn--primary btn--lg mk-b__go"
                    >
                      Request feasibility & pricing →
                    </MkLink>
                  )}
                </>
              )}
            </div>
            {err && (
              <p className="mk-b__err" role="alert">
                {err}
              </p>
            )}
            <div className="mk-b__nav">
              {step > 0 && (
                <button className="mk-b__back" onClick={() => go(step - 1)}>
                  ← Back
                </button>
              )}
              {step < 6 && (
                <button className="btn btn--primary mk-b__next" onClick={() => go(step + 1)}>
                  {"Next: "}
                  {MK_STEPS[step + 1]}
                  {" \u2192"}
                </button>
              )}
            </div>
          </div>
          <aside className="mk-b__live" aria-live="polite">
            <span className="mk-b__lk">Live summary</span>
            <div className="mk-b__ring">
              <svg viewBox="0 0 42 42">
                <circle cx="21" cy="21" r="16" className="bg" />
                <circle
                  cx="21"
                  cy="21"
                  r="16"
                  className="fg"
                  pathLength="100"
                  style={{
                    strokeDasharray: `${((step + 1) / 7) * 100} 100`,
                  }}
                />
              </svg>
              <b>{step + 1}/7</b>
            </div>
            <p>
              <RC_I n={T.ic} s={15} />
              {T.t}
            </p>
            <p>
              <RC_I n="globe" s={15} />
              {codes.length} {codes.length === 1 ? "market" : "markets"}
            </p>
            <p>
              <RC_I n="users" s={15} />
              {mkFmt(total)}
              {" completes"}
            </p>
            <p>
              <RC_I n="sliders" s={15} />
              {tg.length}
              {" targeting criteria"}
            </p>
            <p className={ageSum === 100 ? "" : "bad"}>
              <RC_I n="pie" s={15} />
              {"Quotas "}
              {ageSum === 100 ? "balanced" : ageSum + "%"}
            </p>
            <p>
              <RC_I n="clock" s={15} />
              {loi}
              {" min LOI"}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
function MK_Types() {
  const [k, setK] = ee.useState(0);
  const T = MK_TYPES[k];
  return (
    <section className="section mk-types" id="audiences" aria-labelledby="mk-types">
      <div className="container">
        <MK_Head
          id="mk-types"
          k="Explore research audiences"
          t="Choose Your Sample Type"
          i="Each audience comes with its own targeting, so you reach the right people for the right study."
        />
        <div className="mk-types__tabs" role="tablist">
          {MK_TYPES.map((x, i) => (
            <button
              key={x.k}
              role="tab"
              aria-selected={i === k}
              className={i === k ? "is-on" : ""}
              style={{
                "--c": x.c,
              }}
              onClick={() => setK(i)}
            >
              <RC_I n={x.ic} s={20} />
              <b>
                {x.t}
                {" Sample"}
              </b>
            </button>
          ))}
        </div>
        <div
          className="mk-types__panel"
          key={k}
          style={{
            "--c": T.c,
            "--lt": T.lt,
          }}
        >
          <div className="mk-types__lead">
            <span className="mk-types__ic">
              <RC_I n={T.ic} s={30} />
            </span>
            <h3>
              {T.t}
              {" Sample"}
            </h3>
            <p>{T.d}</p>
            <h4>Popular audiences</h4>
            <ul className="mk-aud">
              {T.aud.map((a, i) => (
                <li
                  key={a}
                  style={{
                    "--i": i,
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
            <a href="#builder" className="btn btn--primary">
              {"Build "}
              {T.t}
              {" Sample \u2192"}
            </a>
          </div>
          <div className="mk-types__col">
            <h4>
              <RC_I n="sliders" s={15} />
              Target by
            </h4>
            <ul className="mk-tags">
              {T.target.map((a, i) => (
                <li
                  key={a}
                  style={{
                    "--i": i,
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="mk-types__col">
            <h4>
              <RC_I n="target" s={15} />
              {T.k === "health" ? "Potential audiences" : "Ideal for"}
            </h4>
            <ul className="mk-tags mk-tags--alt">
              {T.ideal.map((a, i) => (
                <li
                  key={a}
                  style={{
                    "--i": i,
                  }}
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
const MK_EX = [
  ["in", "India", 500],
  ["ae", "UAE", 200],
  ["sa", "Saudi Arabia", 200],
  ["gb", "UK", 200],
  ["us", "USA", 300],
];
function MK_Multi() {
  const [ref, v] = RC_useInView(0.25);
  const total = MK_EX.reduce((n, x) => n + x[2], 0);
  const hub = RG_MAP.pts.in;
  return (
    <section ref={ref} className={"section mk-multi" + (v ? " is-in" : "")} aria-labelledby="mk-multi">
      <div className="container mk-multi__grid">
        <div>
          <MK_Head
            id="mk-multi"
            k="Multi-country sample"
            t="One Project. Multiple Markets."
            i="Build multi-country samples from one marketplace."
            light
          />
          <table className="mk-tbl">
            <thead>
              <tr>
                <th>Market</th>
                <th>Completes</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {MK_EX.map(([c, n, q], i) => (
                <tr
                  key={c}
                  style={{
                    "--i": i,
                  }}
                >
                  <td>
                    <img src={mkFlag(c)} alt="" width="22" height="16" />
                    {n}
                  </td>
                  <td>
                    <b>{q}</b>
                    <i
                      style={{
                        width: (q / 500) * 100 + "%",
                      }}
                    />
                  </td>
                  <td>
                    <span className="mk-pill is-ok">Available</span>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>Total</td>
                <td colSpan="2">
                  <b>
                    {mkFmt(total)}
                    {" completes"}
                  </b>
                  {" \xB7 cost calculated per market"}
                </td>
              </tr>
            </tfoot>
          </table>
          {null}
          <a href="#builder" className="btn btn--light btn--lg">
            Build Multi-Country Sample
          </a>
        </div>
        <div className="mk-map" aria-hidden="true">
          <svg viewBox={`0 0 ${RG_MAP.w} ${RG_MAP.h}`}>
            {RG_MAP.base.map((b, i) => (
              <path key={i} d={b.d} className="mk-map__land" />
            ))}
            {MK_EX.filter((x) => x[0] !== "in").map(([c], i) => {
              const p = RG_MAP.pts[c];
              const mx = (hub[0] + p[0]) / 2,
                my = Math.min(hub[1], p[1]) - 80;
              return (
                <path
                  key={c}
                  d={`M${hub[0]} ${hub[1]} Q${mx} ${my} ${p[0]} ${p[1]}`}
                  className="mk-map__arc"
                  style={{
                    "--i": i,
                  }}
                  pathLength="1"
                />
              );
            })}
          </svg>
          {MK_EX.map(([c, n, q], i) => {
            const p = RG_MAP.pts[c],
              off = {
                ae: [26, -26],
                sa: [-30, 22],
                in: [24, 14],
              }[c] || [0, 0];
            return (
              <span
                key={c}
                className="mk-map__pin"
                style={{
                  left: `calc(${(p[0] / RG_MAP.w) * 100}% + ${off[0]}px)`,
                  top: `calc(${(p[1] / RG_MAP.h) * 100}% + ${off[1]}px)`,
                  "--i": i,
                }}
              >
                <img src={mkFlag(c)} alt="" width="22" height="16" />
                <b>{q}</b>
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}
function MK_Dash() {
  const [ref, v] = RC_useInView(0.2);
  const [add, setAdd] = ee.useState(100);
  const [custom, setCustom] = ee.useState("");
  const [copied, setCopied] = ee.useState(false);
  const [state, setState] = ee.useState("In Field");
  const ordered = 500,
    done = 327,
    pct = Math.round((done / ordered) * 100);
  const extra = custom ? +custom || 0 : add;
  return (
    <section ref={ref} className={"section mk-dash" + (v ? " is-in" : "")} aria-labelledby="mk-dash">
      <div className="container">
        <MK_Head
          id="mk-dash"
          k="Sample marketplace dashboard"
          t="Know What's Happening Without Emailing Anyone"
          i="Projects, progress, extra sample, links and fieldwork controls in one place."
          center
        />
        <div className="mk-app">
          <div className="mk-app__bar">
            <i />
            <i />
            <i />
            <span>My Projects</span>
            <MK_Illus />
          </div>
          <div className="mk-app__grid">
            <div className="mk-app__projects">
              <table className="mk-tbl mk-tbl--light">
                <thead>
                  <tr>
                    <th>Project</th>
                    <th>Audience</th>
                    <th>Market</th>
                    <th>Completes</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Consumer Study", "Consumer", "India", 500, "In Field"],
                    ["SaaS Study", "B2B", "USA", 250, "Available"],
                    ["HCP Study", "Healthcare", "UAE", 150, "Completed"],
                  ].map((r, i) => (
                    <tr key={r[0]} className={i === 0 ? "is-sel" : ""}>
                      <td>
                        <b>{r[0]}</b>
                      </td>
                      <td>{r[1]}</td>
                      <td>{r[2]}</td>
                      <td>{r[3]}</td>
                      <td>
                        <span className={"mk-st mk-st--" + i}>{r[4]}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="mk-app__progress">
                <div className="mk-gauge">
                  <svg viewBox="0 0 42 42">
                    <circle cx="21" cy="21" r="16" className="bg" />
                    <circle
                      cx="21"
                      cy="21"
                      r="16"
                      className="fg"
                      pathLength="100"
                      style={{
                        strokeDasharray: `${v ? pct : 0} 100`,
                      }}
                    />
                  </svg>
                  <b>{pct}%</b>
                  <span>completion</span>
                </div>
                <dl>
                  <div>
                    <dt>Sample ordered</dt>
                    <dd>{ordered}</dd>
                  </div>
                  <div>
                    <dt>Completed</dt>
                    <dd>{done}</dd>
                  </div>
                  <div>
                    <dt>Remaining</dt>
                    <dd>{ordered - done}</dd>
                  </div>
                </dl>
                <div className="mk-app__bar2">
                  <i
                    style={{
                      width: v ? pct + "%" : 0,
                    }}
                  />
                </div>
              </div>
              <div className="mk-ctrl" role="group" aria-label="Fieldwork controls">
                {[
                  ["Launch Sample", "rocket", "In Field"],
                  ["Pause Sample", "clock", "Paused"],
                  ["Resume Sample", "refresh", "In Field"],
                  ["Increase Sample", "plus", null],
                  ["Close Project", "check", "Closed"],
                  ["Download Report", "file", null],
                ].map(([t, ic, ns]) => (
                  <button key={t} onClick={() => ns && setState(ns)}>
                    <RC_I n={ic} s={15} />
                    {t}
                  </button>
                ))}
                <span className="mk-ctrl__st">
                  {"Status: "}
                  <b>{state}</b>
                </span>
              </div>
            </div>
            <div className="mk-app__side">
              <div className="mk-card">
                <h4>Project overview</h4>
                <dl className="mk-kv">
                  {[
                    ["Project ID", "FR-102938"],
                    ["Audience", "B2B"],
                    ["Market", "United States"],
                    ["Required completes", "300"],
                    ["LOI", "12 minutes"],
                    ["Estimated IR", "40%"],
                  ].map(([a, b]) => (
                    <div key={a}>
                      <dt>{a}</dt>
                      <dd>{b}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div className="mk-card mk-card--buy">
                <h4>Need additional completes?</h4>
                <div className="mk-buy">
                  {[50, 100, 250, 500].map((n) => (
                    <button
                      key={n}
                      className={!custom && add === n ? "is-on" : ""}
                      onClick={() => {
                        setAdd(n);
                        setCustom("");
                      }}
                    >
                      +{n}
                    </button>
                  ))}
                  <input
                    value={custom}
                    onChange={(e) => setCustom(e.target.value.replace(/\D/g, "").slice(0, 5))}
                    placeholder="Custom"
                    aria-label="Custom quantity"
                  />
                </div>
                <p className="mk-buy__res">
                  {"New total: "}
                  <b>{mkFmt(ordered + extra)}</b>
                  {" completes \xB7 updated cost shown before purchase"}
                </p>
              </div>
              <div className="mk-card mk-card--link">
                <h4>Sample access</h4>
                <div className="mk-link">
                  <code>https://sample.example/FR-102938/…</code>
                  <button
                    onClick={() => {
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1500);
                    }}
                  >
                    {copied ? "Copied \u2713" : "Copy Survey Link"}
                  </button>
                </div>
                <ul className="mk-tags mk-tags--sm">
                  {[
                    "Unique respondent links",
                    "Redirect URLs",
                    "Terminate URLs",
                    "Quota-full redirects",
                    "Completes tracking",
                    "Fraud detection",
                    "Duplicate detection",
                    "Respondent validation",
                  ].map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
function MK_Pay() {
  return (
    <section className="section mk-pay" aria-labelledby="mk-pay">
      <div className="container">
        <MK_Head id="mk-pay" k="Pricing & checkout" t="Clear Pricing. Simple Checkout." />
        <div className="mk-pay__grid">
          <div className="mk-price">
            <div className="mk-price__opt">
              <span className="mk-price__n">A</span>
              <div>
                <b>Transparent pricing</b>
                <p>
                  For standard audiences: an estimated starting CPI, then the final calculated price after targeting.
                </p>
              </div>
            </div>
            <div className="mk-price__opt">
              <span className="mk-price__n">B</span>
              <div>
                <b>Account-based pricing</b>
                <p>
                  For specialist B2B and healthcare audiences: create the requirement and receive a calculated price
                  inside the platform.
                </p>
              </div>
            </div>
          </div>
          <div className="mk-receipt">
            <div className="mk-receipt__h">
              <b>Review your order</b>
              <MK_Illus />
            </div>
            {[
              ["Project", "Technology Decision-Makers Study"],
              ["Audience", "B2B"],
              ["Market", "USA"],
              ["Completes", "500"],
              ["LOI", "10 minutes"],
              ["Estimated IR", "45%"],
              ["CPI & sample cost", "Calculated for your specification"],
              ["Tax", "Applicable"],
            ].map(([a, b]) => (
              <div key={a} className="mk-receipt__r">
                <span>{a}</span>
                <b>{b}</b>
              </div>
            ))}
            <a href="#builder" className="btn btn--primary btn--block">
              Proceed to payment
            </a>
          </div>
          <div className="mk-wallet">
            <h4>Ways to pay</h4>
            <ul className="mk-payopts">
              {[
                ["Credit card", "box"],
                ["Debit card", "box"],
                ["Corporate card", "award"],
                ["Bank transfer", "refresh"],
                ["Pre-funded account", "pie"],
                ["Purchase order", "file"],
              ].map(([t, ic]) => (
                <li key={t}>
                  <RC_I n={ic} s={15} />
                  {t}
                  {t === "Purchase order" && <small>approved accounts</small>}
                </li>
              ))}
            </ul>
            <div className="mk-wallet__card">
              <span>Pre-funded account balance</span>
              <b>Buy multiple samples without repeating payment</b>
              <i className="mk-wallet__chip" aria-hidden="true" />
            </div>
            <p className="mk-note">Available payment options are confirmed for your account.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function MK_Quality() {
  const [ref, v] = RC_useInView(0.2);
  const cols = [
    [
      "Respondent validation",
      "user",
      [
        "Duplicate respondent checks",
        "Identity/profile consistency",
        "Eligibility screening",
        "Demographic validation",
        "Professional profile validation",
        "Device and technical checks",
      ],
    ],
    [
      "Survey quality",
      "clipboard",
      [
        "Speeding detection",
        "Straight-lining detection",
        "Pattern-response checks",
        "Attention checks",
        "Inconsistent-response checks",
        "Open-ended response quality checks",
      ],
    ],
    [
      "Sample quality",
      "shield",
      [
        "Fraud detection",
        "Bot detection",
        "Duplicate prevention",
        "Suspicious behaviour monitoring",
        "Source monitoring",
        "Quality-based respondent removal",
      ],
    ],
  ];
  return (
    <section ref={ref} className={"section mk-q" + (v ? " is-in" : "")} aria-labelledby="mk-q">
      <div className="container">
        <MK_Head
          id="mk-q"
          k="Quality assurance"
          t="DIY Doesn't Mean Compromising Quality"
          i="Every sample order remains supported by Frequent Research's established quality-control framework."
          light
          center
        />
        <div className="mk-q__grid">
          <div className="mk-q__shield" aria-hidden="true">
            <svg viewBox="0 0 120 140">
              <path d="M60 6 L110 26 V66 C110 100 88 124 60 134 C32 124 10 100 10 66 V26 Z" />
              <path d="M38 70 L54 86 L84 52" className="tick" />
            </svg>
          </div>
          {cols.map(([t, ic, items], i) => (
            <div
              key={t}
              className="mk-q__col"
              style={{
                "--i": i,
              }}
            >
              <h3>
                <RC_I n={ic} s={20} />
                {t}
              </h3>
              <ul>
                {items.map((x, j) => (
                  <li
                    key={x}
                    style={{
                      "--j": j,
                    }}
                  >
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mk-q__note">
          Controls are applied depending on project requirements. B2B and healthcare projects add professional/profile
          verification where applicable.
        </p>
      </div>
    </section>
  );
}
function MK_Paths() {
  return (
    <section className="section mk-paths" aria-labelledby="mk-paths">
      <div className="container">
        <MK_Head id="mk-paths" k="DIY + expert support" t="Two Ways to Get Your Sample" center />
        <div className="mk-paths__grid">
          <div className="mk-path mk-path--diy">
            <span className="mk-path__ic">
              <RC_I n="sliders" s={26} />
            </span>
            <h3>Want to do it yourself?</h3>
            <ol>
              {["Build your sample", "Configure", "Purchase", "Launch"].map((s, i) => (
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
            <a href="#builder" className="btn btn--primary btn--lg">
              Start DIY Sample
            </a>
          </div>
          <span className="mk-paths__or">or</span>
          <div className="mk-path mk-path--pro">
            <span className="mk-path__ic">
              <RC_I n="users" s={26} />
            </span>
            <h3>Prefer our team to manage it?</h3>
            <p>
              Our research specialists can handle feasibility, sampling, quotas, recruitment and fieldwork management.
            </p>
            <MkLink to="/lets-talk?type=audience" className="btn btn--light btn--lg">
              Talk to an Expert
            </MkLink>
          </div>
        </div>
      </div>
    </section>
  );
}
function MK_Page() {
  ee.useEffect(() => {
    const t = setTimeout(() => {
      document.title = "Sample Marketplace | Buy Research Sample Online | Frequent Research";
      const m = document.querySelector('meta[name="description"]');
      if (m)
        m.setAttribute(
          "content",
          "Build your audience, select markets, set quotas and buy research-ready consumer, B2B and healthcare sample through the Frequent Research Sample Marketplace.",
        );
    }, 0);
    return () => clearTimeout(t);
  }, []);
  const Form = EnquiryForm;
  return (
    <div className="mk">
      <MK_Hero />
      <MK_Flow />
      <MK_Builder />
      <MK_Types />
      <MK_Multi />
      <MK_Dash />
      <MK_Pay />
      <MK_Quality />
      <MK_Paths />
      <section className="section mk-enq" id="enquire" aria-labelledby="mk-enq">
        <div className="container enquire">
          <div className="enquire__intro">
            <span className="mk-kicker">Get started</span>
            <h2 id="mk-enq">Request audience feasibility</h2>
            <p>
              Tell us your audience, markets and completes. We confirm availability, incidence and pricing for your
              specification.
            </p>
          </div>
          <div className="card-form">
            <Form type="audience" />
          </div>
        </div>
      </section>
    </div>
  );
}

export { MK_FLOW, MK_MARKETS, MK_Page, MkLink, mkFlag };
