import * as ee from 'react';
import { CONTACT } from '../data/site.jsx';
import { phoneDialCode } from '../shared/CoreParts.jsx';
import { RC_I } from '../shared/Reveal.jsx';
import { HmLink } from '../shared/HomeShared.jsx';
import { FM_Area, FM_Check, FM_Chips, FM_Input, FM_PREVIEW_NOTE, FM_PRIV, FM_Phone, FM_Select, fmNextUid, fmUse } from '../shared/Forms.jsx';
import { FMV } from '../shared/SiteEffects.jsx';

const CR_DEPTS = [
  {
    k: "mr",
    t: "Market Research",
    ic: "search",
    c: "#1E5BFF",
    lt: "#9DB8FF",
    tags: ["Research", "Insights", "Data", "Fieldwork"],
    work: [
      "Research projects",
      "Data and insights",
      "Fieldwork",
      "Client requirements",
      "Quality and validation",
      "Research operations",
    ],
    fit: [
      "Research professionals",
      "Analysts",
      "Graduates",
      "People with strong analytical curiosity",
      "Experienced research specialists",
    ],
  },
  {
    k: "sales",
    t: "Sales & Business Development",
    ic: "trend",
    c: "#0B22A8",
    lt: "#8FB0FF",
    tags: ["Relationships", "Growth", "Partnerships", "Clients"],
    work: [
      "Client conversations",
      "Proposals and bids",
      "New partnerships",
      "Account growth",
      "Market and client research",
      "Working with delivery teams",
    ],
    fit: [
      "Business development professionals",
      "Account managers",
      "Graduates with strong communication",
      "People who enjoy building relationships",
    ],
  },
  {
    k: "dm",
    t: "Digital Marketing",
    ic: "megaphone",
    c: "#0094D4",
    lt: "#8FE3F0",
    tags: ["Content", "Campaigns", "Brand", "Growth"],
    work: [
      "Content and social media",
      "Campaigns",
      "Brand communication",
      "SEO and performance",
      "Reporting on results",
      "Creative ideas",
    ],
    fit: ["Digital marketers", "Content creators", "SEO and paid media specialists", "Graduates with a creative eye"],
  },
  {
    k: "it",
    t: "IT & Development",
    ic: "cpu",
    c: "#5A3FE0",
    lt: "#B5A8FF",
    tags: ["Technology", "Platforms", "Automation", "Digital"],
    work: [
      "Web and app development",
      "Research platforms",
      "Automation",
      "Data tools",
      "AI and new technology",
      "Support and improvement",
    ],
    fit: ["Developers", "Engineers", "AI and data enthusiasts", "Graduates who love to build"],
  },
  {
    k: "pm",
    t: "Project Management",
    ic: "clipboard",
    c: "#0E9C88",
    lt: "#7FE3D2",
    tags: ["Planning", "Coordination", "Delivery", "Quality"],
    work: [
      "Project planning",
      "Coordinating teams and partners",
      "Timelines and delivery",
      "Quality checks",
      "Client updates",
      "Panel and sample management",
    ],
    fit: [
      "Project coordinators and managers",
      "Organised problem-solvers",
      "Graduates who like structure",
      "Experienced delivery leads",
    ],
  },
  {
    k: "fin",
    t: "Accounts & Finance",
    ic: "pie",
    c: "#B4862A",
    lt: "#F0D98F",
    tags: ["Finance", "Operations", "Reporting", "Compliance"],
    work: [
      "Accounts and bookkeeping",
      "Financial operations",
      "Reporting",
      "Compliance",
      "Billing and payments",
      "Supporting business decisions",
    ],
    fit: ["Accountants", "Finance executives", "Commerce graduates", "Detail-minded people who like numbers"],
  },
];
const CR_D = Object.fromEntries(CR_DEPTS.map((d) => [d.k, d]));
const crReduce = () =>
  typeof window !== "undefined" &&
  (window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches));
const crGo = (id) => (e) => {
  if (e && e.preventDefault) e.preventDefault();
  const el = document.getElementById(id);
  if (el)
    el.scrollIntoView({
      behavior: crReduce() ? "auto" : "smooth",
      block: "start",
    });
};
const CR_Arrow = ({ s = 15 }) => (
  <svg
    viewBox="0 0 24 24"
    width={s}
    height={s}
    aria-hidden="true"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
function crInView(th = 0.2) {
  const ref = ee.useRef(null);
  const [v, setV] = ee.useState(false);
  ee.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setV(true);
      return;
    }
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) {
            setV(true);
            io.disconnect();
          }
        }),
      {
        threshold: th,
      },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v];
}
function CR_Head({ k, t, s, light, center, id }) {
  return (
    <div className={"cr-head" + (light ? " cr-head--light" : "") + (center ? " cr-head--center" : "")}>
      {k && <span className="cr-kick">{k}</span>}
      <h2 id={id}>{t}</h2>
      {s && <p>{s}</p>}
    </div>
  );
}
async function crPost(url, fd) {
  try {
    const r = await fetch(url, {
      method: "POST",
      body: fd,
    });
    const isJson = (r.headers.get("content-type") || "").includes("json");
    const j = isJson ? await r.json().catch(() => ({})) : {};
    if (r.ok && j.ok)
      return {
        ok: true,
      };
    if (!isJson || r.status === 404 || r.status === 405 || r.status === 501)
      return {
        preview: true,
      };
    return {
      ok: false,
      error: j.error || "Your application could not be sent.",
    };
  } catch (e) {
    return {
      preview: true,
    };
  }
}
const CR_FILE_OK = /\.(pdf|docx?)$/i;
function CR_Upload({ file, setFile, err }) {
  const [drag, setDrag] = ee.useState(false);
  const inp = ee.useRef(null);
  const take = (f) => {
    if (f) setFile(f);
  };
  return (
    <div
      className={"cr-up" + (drag ? " is-drag" : "") + (file ? " has-file" : "") + (err ? " is-bad" : "")}
      onDragOver={(e) => {
        e.preventDefault();
        setDrag(true);
      }}
      onDragLeave={() => setDrag(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDrag(false);
        take(e.dataTransfer.files && e.dataTransfer.files[0]);
      }}
    >
      <input
        ref={inp}
        id="cr-cv"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="sr-only"
        onChange={(e) => take(e.target.files && e.target.files[0])}
        aria-describedby="cr-cv-m"
      />
      <label htmlFor="cr-cv" className="cr-up__zone">
        <span className="cr-up__ic">
          <RC_I n={file ? "file" : "down"} s={26} />
        </span>
        {file ? (
          <>
            <b>{file.name}</b>
            <small>
              {(file.size / 1024 / 1024).toFixed(2)}
              {" MB \xB7 click to replace"}
            </small>
          </>
        ) : (
          <>
            <b>
              {"Upload your resume "}
              <em>*</em>
            </b>
            <small>Drag and drop, or click to choose · PDF, DOC or DOCX</small>
          </>
        )}
      </label>
      {file && (
        <button
          type="button"
          className="cr-up__rm"
          onClick={() => {
            setFile(null);
            if (inp.current) inp.current.value = "";
          }}
          aria-label="Remove file"
        >
          ×
        </button>
      )}
      <p id="cr-cv-m" className="cr-up__m" role={err ? "alert" : undefined}>
        {err}
      </p>
    </div>
  );
}
function CR_Apply({ dept, setDept }) {
  const [ref, v] = crInView(0.1);
  const uid = ee.useMemo(fmNextUid, []);
  const rules = {
    dept: (x) => (x ? "" : "Select a department."),
    exp: FMV.pick("your experience"),
    name: FMV.name,
    email: FMV.email,
    phone: FMV.phone,
    link: FMV.url,
    loc: (x) => {
      const t = (x || "").trim();
      return t.length < 2 ? "Enter your current location." : t.length > 80 ? "Keep this under 80 characters." : "";
    },
    notice: (x) => (x ? "" : "Choose your notice period."),
    message: (x) => ((x || "").trim().length > 1500 ? "Keep this under 1500 characters." : ""),
    consent: FMV.consent,
  };
  const blank = {
    dept: dept || "",
    exp: "",
    name: "",
    email: "",
    phone: {
      country: "IN",
      number: "",
      otherCode: "",
    },
    link: "",
    loc: "",
    notice: "",
    message: "",
    consent: false,
    website: "",
  };
  const f = fmUse(blank, rules);
  f.uid = uid;
  ee.useEffect(() => {
    if (dept !== undefined && dept !== f.v.dept)
      f.setV((o) => ({
        ...o,
        dept: dept || "",
      }));
  }, [dept]);
  const [step, setStep] = ee.useState(0);
  const [file, setFile] = ee.useState(null);
  const [fileErr, setFileErr] = ee.useState("");
  const [st, setSt] = ee.useState("idle"),
    [msg, setMsg] = ee.useState(""),
    [shake, setShake] = ee.useState(0);
  const STEPS = [
    ["Choose your team", ["dept", "exp"]],
    ["Tell us about yourself", ["name", "email", "phone", "link", "loc", "notice"]],
    ["Send your resume", ["message", "consent"]],
  ];
  const checkFile = () => {
    const e = !file
      ? "Please upload your resume."
      : !CR_FILE_OK.test(file.name)
        ? "Please upload a PDF, DOC or DOCX file."
        : "";
    setFileErr(e);
    return !e;
  };
  const next = () => {
    if (f.check(STEPS[step][1]).length) {
      setShake((x) => x + 1);
      return;
    }
    setStep((s) => s + 1);
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return;
    const bad = f.check(STEPS[2][1]).length;
    const okf = checkFile();
    if (bad || !okf) {
      setShake((x) => x + 1);
      return;
    }
    setSt("sending");
    const fd = new FormData();
    const P = {
      type: "Career Application",
      department: f.v.dept,
      experience: f.v.exp,
      name: f.v.name.trim(),
      email: f.v.email.trim(),
      countryCode: phoneDialCode(f.v.phone),
      phone: f.v.phone.number,
      linkedin: f.v.link.trim(),
      location: f.v.loc.trim(),
      notice: f.v.notice,
      message: f.v.message.trim(),
      consent: f.v.consent,
      page: window.location.href,
    };
    Object.entries(P).forEach(([k, x]) => fd.append(k, x));
    fd.append("resume", file);
    const r = await crPost("/api/v1/careers", fd);
    if (r.ok || r.preview) {
      setSt("sent");
      setMsg(r.preview ? FM_PREVIEW_NOTE : "");
    } else {
      setSt("failed");
      setMsg(r.error);
    }
  };
  const again = () => {
    f.reset(blank);
    setFile(null);
    setStep(0);
    setSt("idle");
    setDept("");
  };
  return (
    <section ref={ref} className={"section cr-ap" + (v ? " is-in" : "")} id="cr-apply" aria-labelledby="cr-ap-h">
      <div className="container cr-ap__in">
        <div className="cr-ap__side">
          <CR_Head id="cr-ap-h" k="Apply" t="Ready to start a conversation?" />
          <ol className="cr-ap__steps">
            {STEPS.map(([t], i) => (
              <li key={t} className={st === "sent" || i < step ? "is-done" : i === step ? "is-on" : ""}>
                <span>{st === "sent" || i < step ? <RC_I n="check" s={15} /> : "0" + (i + 1)}</span>
                <b>{t}</b>
              </li>
            ))}
          </ol>
          <p className="cr-ap__easy">That's it. No complicated application maze.</p>
          <ul className="cr-ap__trust">
            <li>
              <RC_I n="okc" s={18} />
              We read every application
            </li>
            <li>
              <RC_I n="database" s={18} />
              Strong profiles stay on file
            </li>
            <li>
              <RC_I n="msg" s={18} />
              We'll reach out if there's a fit
            </li>
          </ul>
          <div className="cr-ap__mail">
            <span>
              <b>Prefer email?</b>
              {" Send your CV to our careers team."}
            </span>
            <a
              className="btn btn--ghost"
              href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("Career application \u2013 Frequent Research")}`}
            >
              <RC_I n="msg" s={16} />
              {" Email the careers team"}
            </a>
          </div>
        </div>
        <div className="cr-ap__card">
          {st === "sent" ? (
            <div className="cr-done" role="status">
              <svg className="fm-done__tick" viewBox="0 0 52 52" aria-hidden="true">
                <circle cx="26" cy="26" r="24" />
                <path d="M15 27l7 7 15-16" />
              </svg>
              <h3>Application received</h3>
              <p>Thanks for taking the time to introduce yourself.</p>
              <p>We'll review your profile and keep it in consideration for relevant opportunities.</p>
              {msg && <p className="cr-done__note">{msg}</p>}
              <button
                type="button"
                className="btn btn--primary"
                onClick={() => {
                  again();
                  crGo("cr-why")();
                }}
              >
                Back to careers
              </button>
            </div>
          ) : (
            <form
              className="fm cr-form"
              style={{
                "--c": "#0B22A8",
                "--lt": "#6EE0CE",
              }}
              onSubmit={submit}
              noValidate
            >
              <div className="cr-form__bar" aria-hidden="true">
                <i
                  style={{
                    width: ((step + 1) / 3) * 100 + "%",
                  }}
                />
              </div>
              <p className="cr-form__step">
                {"Step "}
                {step + 1}
                {" of 3 \xB7 "}
                <b>{STEPS[step][0]}</b>
              </p>
              <div className="fm-pane" key={step + "-" + shake} data-shake={shake > 0 ? "1" : undefined}>
                {step === 0 && (
                  <>
                    <div className="cr-form__need">
                      <RC_I n="award" s={16} />
                      {" Career application"}
                    </div>
                    <FM_Select
                      f={f}
                      k="dept"
                      label="Department"
                      icon="layers"
                      options={CR_DEPTS.map((d) => d.t)}
                      req
                      full
                    />
                    <FM_Chips
                      f={f}
                      k="exp"
                      label="Experience"
                      req
                      options={["Fresher", "1\u20133 years", "3\u20137 years", "7+ years"]}
                    />
                  </>
                )}
                {step === 1 && (
                  <div className="fm-grid">
                    <FM_Input f={f} k="name" label="Full name" icon="user" req auto="name" max={60} />
                    <FM_Input
                      f={f}
                      k="email"
                      label="Email address"
                      icon="msg"
                      type="email"
                      req
                      auto="email"
                      max={160}
                    />
                    <FM_Phone f={f} label="Phone number" />
                    <FM_Input
                      f={f}
                      k="link"
                      label="LinkedIn / portfolio (optional)"
                      icon="globe"
                      auto="url"
                      max={200}
                      ph="linkedin.com/in/yourname"
                    />
                    <FM_Input f={f} k="loc" label="Current location" icon="map" req auto="address-level2" max={80} />
                    <FM_Select
                      f={f}
                      k="notice"
                      label="Notice period"
                      icon="clock"
                      options={["Immediate", "Up to 30 days", "30\u201360 days", "60+ days"]}
                      req
                    />
                  </div>
                )}
                {step === 2 && (
                  <>
                    <FM_Area
                      f={f}
                      k="message"
                      label="Tell us a little about yourself (optional)"
                      ph="What are you good at, what interests you, and why would you like to work with us?"
                      min={0}
                      req={false}
                      rows={4}
                    />
                    <CR_Upload
                      file={file}
                      setFile={(x) => {
                        setFile(x);
                        setFileErr("");
                      }}
                      err={fileErr}
                    />
                    <FM_Check f={f}>
                      {
                        "I agree that Frequent Research may store my application and contact me about opportunities. See our "
                      }
                      <HmLink to={FM_PRIV}>Privacy Policy</HmLink>.
                    </FM_Check>
                  </>
                )}
              </div>
              <input
                className="hp"
                tabIndex={-1}
                autoComplete="off"
                value={f.v.website}
                onChange={f.set("website")}
                aria-hidden="true"
              />
              {st === "failed" && (
                <p className="fm-fail" role="alert">
                  {msg}
                </p>
              )}
              <div className="fm-nav">
                {step > 0 && (
                  <button type="button" className="btn btn--ghost" onClick={() => setStep((s) => s - 1)}>
                    Back
                  </button>
                )}
                {step < 2 ? (
                  <button key="step-next" type="button" className="btn btn--primary btn--lg" onClick={next}>
                    {"Continue "}
                    <CR_Arrow />
                  </button>
                ) : (
                  <button key="step-send" type="submit" className="btn btn--primary btn--lg" disabled={st === "sending"}>
                    {st === "sending" ? (
                      <>
                        <i className="fm-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {"Submit application "}
                        <CR_Arrow />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export { CR_Apply };
