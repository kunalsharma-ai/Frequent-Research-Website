import * as ee from 'react';
import { RG_FLAGS } from '../data/maps.jsx';
import { CONTACT } from '../data/site.jsx';
import { PHONE_COUNTRIES } from '../data/phoneCountries.jsx';
import { ENQUIRY_TYPES, phoneDialCode } from './CoreParts.jsx';
import { RC_I } from './Reveal.jsx';
import { HmLink } from './HomeShared.jsx';
import { CC_Picker } from '../../components/site/CountryPicker.jsx';
import { FMV, SF_FLAGS } from './SiteEffects.jsx';

const FM_PRIV = "/privacy-data-protection";
const FM_DISPOSABLE =
  /@(mailinator|guerrillamail|10minutemail|tempmail|temp-mail|yopmail|trashmail|getnada|sharklasers|dispostable|throwawaymail|maildrop|fakeinbox)\./i;
const fmFlag = (iso) => {
  const k = (iso || "").toLowerCase();
  return RG_FLAGS[k] || SF_FLAGS[k] || null;
};
function fmUse(initial, rules) {
  const [v, setV] = ee.useState(initial);
  const [touched, setT] = ee.useState({});
  const [force, setForce] = ee.useState({});
  const err = (k) => (rules[k] ? rules[k](v[k], v) : "");
  const show = (k) => (touched[k] || force[k]) && err(k);
  const ok = (k) => {
    const x = v[k];
    const has = x && (typeof x !== "object" || Array.isArray(x) ? x.length === undefined || x.length : x.number);
    return (touched[k] || force[k]) && !err(k) && rules[k] && !!has;
  };
  const set = (k) => (val) =>
    setV((o) => ({
      ...o,
      [k]: val && val.target ? (val.target.type === "checkbox" ? val.target.checked : val.target.value) : val,
    }));
  // leaving a field the visitor has not filled in yet does not turn it red: empty required fields are only flagged
  // when they press Continue or Send on that step (check below)
  const filled = (x) => (x && typeof x === "object" && !Array.isArray(x) ? !!x.number : Array.isArray(x) ? x.length > 0 : x !== "" && x != null && x !== false);
  const blur = (k) => () => {
    if (!filled(v[k])) return;
    setT((o) => ({
      ...o,
      [k]: true,
    }));
  };
  const check = (keys) => {
    const f = {};
    keys.forEach((k) => (f[k] = true));
    setForce((o) => ({
      ...o,
      ...f,
    }));
    return keys.filter((k) => err(k));
  };
  const reset = (nv) => {
    setV(nv);
    setT({});
    setForce({});
  };
  return {
    v,
    setV,
    set,
    blur,
    show,
    ok,
    check,
    reset,
    err,
  };
}
function FM_State({ bad, good }) {
  if (bad)
    return (
      <span className="fm-st fm-st--bad" aria-hidden="true">
        !
      </span>
    );
  if (good)
    return (
      <span className="fm-st fm-st--ok" aria-hidden="true">
        <svg viewBox="0 0 16 16">
          <path d="M3 8.5l3.2 3L13 4.5" />
        </svg>
      </span>
    );
  return null;
}
function FM_Msg({ id, err, hint }) {
  if (err)
    return (
      <em className="fm-err" id={id} role="alert">
        {err}
      </em>
    );
  if (hint)
    return (
      <small className="fm-hint" id={id}>
        {hint}
      </small>
    );
  return null;
}
function FM_Input({ f, k, label, icon, type = "text", req, hint, auto, max, ph, full }) {
  const id = "fm-" + k + "-" + f.uid,
    e = f.show(k);
  return (
    <div
      className={
        "fm-f" + (full ? " fm-f--full" : "") + (e ? " is-bad" : f.ok(k) ? " is-ok" : "") + (f.v[k] ? " has-v" : "")
      }
    >
      <div className="fm-box">
        {icon && (
          <span className="fm-ic">
            <RC_I n={icon} s={17} />
          </span>
        )}
        <input
          id={id}
          type={type}
          value={f.v[k] || ""}
          onChange={f.set(k)}
          onBlur={f.blur(k)}
          autoComplete={auto}
          maxLength={max}
          placeholder={ph || " "}
          aria-invalid={!!e}
          aria-describedby={id + "-m"}
          required={req}
        />
        <label htmlFor={id}>
          {label}
          {req && <b aria-hidden="true">{" *"}</b>}
        </label>
        <FM_State bad={e} good={f.ok(k)} />
      </div>
      <FM_Msg id={id + "-m"} err={e} hint={hint} />
    </div>
  );
}
function FM_Select({ f, k, label, icon, options, req, hint, full }) {
  const id = "fm-" + k + "-" + f.uid,
    e = f.show(k);
  return (
    <div
      className={"fm-f fm-f--sel" + (full ? " fm-f--full" : "") + (e ? " is-bad" : f.ok(k) ? " is-ok" : "") + " has-v"}
    >
      <div className="fm-box">
        {icon && (
          <span className="fm-ic">
            <RC_I n={icon} s={17} />
          </span>
        )}
        <select
          id={id}
          value={f.v[k] || ""}
          onChange={(ev) => {
            f.set(k)(ev);
            f.blur(k)();
          }}
          onBlur={f.blur(k)}
          aria-invalid={!!e}
          aria-describedby={id + "-m"}
          required={req}
        >
          <option value="">Select…</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <label htmlFor={id}>
          {label}
          {req && <b aria-hidden="true">{" *"}</b>}
        </label>
        <FM_State bad={e} good={f.ok(k)} />
      </div>
      <FM_Msg id={id + "-m"} err={e} hint={hint} />
    </div>
  );
}
function FM_Chips({ f, k, label, options, multi, req, hint, icons }) {
  const e = f.show(k),
    val = f.v[k] || (multi ? [] : "");
  const tog = (o) => {
    const nv = multi ? (val.includes(o) ? val.filter((x) => x !== o) : [...val, o]) : val === o ? "" : o;
    f.set(k)(nv);
    f.blur(k)();
  };
  return (
    <fieldset className={"fm-f fm-f--full fm-chips" + (e ? " is-bad" : "")}>
      <legend>
        {label}
        {req && <b aria-hidden="true">{" *"}</b>}
        {multi && <small>{" \xB7 choose any"}</small>}
      </legend>
      <div className="fm-chips__row">
        {options.map((o, i) => {
          const on = multi ? val.includes(o) : val === o;
          const flag = icons === "flag" ? fmFlag(FM_ISO[o]) : null;
          return (
            <button
              type="button"
              key={o}
              className={"fm-chip" + (on ? " is-on" : "")}
              aria-pressed={on}
              onClick={() => tog(o)}
              style={{
                "--i": i,
              }}
            >
              {flag ? (
                <img src={flag} alt="" width="18" height="13" />
              ) : icons && icons[i] ? (
                <RC_I n={icons[i]} s={15} />
              ) : null}
              {o}
              {on && (
                <svg className="fm-chip__tick" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M3 8.5l3.2 3L13 4.5" />
                </svg>
              )}
            </button>
          );
        })}
      </div>
      <FM_Msg err={e} hint={hint} />
    </fieldset>
  );
}
function FM_Phone({ f, k = "phone", label = "Phone / WhatsApp", req = true }) {
  const id = "fm-" + k + "-" + f.uid,
    p = f.v[k],
    c = PHONE_COUNTRIES.find((x) => x.iso === p.country) || PHONE_COUNTRIES[0],
    e = f.show(k);
  const flag = fmFlag(c.iso);
  const upd = (o) =>
    f.set(k)({
      ...p,
      ...o,
    });
  return (
    <div className={"fm-f fm-f--full" + (e ? " is-bad" : f.ok(k) ? " is-ok" : "") + " has-v"}>
      <div className="fm-box fm-phone">
        <CC_Picker
          className="fm-phone__cc"
          value={p.country}
          onChange={(v) =>
            upd({
              country: v,
              number: "",
            })
          }
        />
        {c.other && (
          <input
            className="fm-phone__code"
            value={p.otherCode || ""}
            placeholder="+880"
            inputMode="numeric"
            aria-label="Country code"
            onChange={(ev) => {
              const r = "+" + ev.target.value.replace(/\D/g, "").slice(0, 4);
              upd({
                otherCode: r === "+" ? "" : r,
              });
            }}
          />
        )}
        <span className="fm-phone__in">
          <input
            id={id}
            className="fm-phone__num"
            type="tel"
            inputMode="numeric"
            autoComplete="tel-national"
            value={p.number}
            onChange={(ev) =>
              upd({
                number: ev.target.value.replace(/\D/g, "").slice(0, c.max),
              })
            }
            onBlur={f.blur(k)}
            placeholder=" "
            aria-invalid={!!e}
            aria-describedby={id + "-m"}
          />
          <label htmlFor={id}>
            {label}
            {req && <b aria-hidden="true">{" *"}</b>}
          </label>
          <span className="fm-phone__count" aria-hidden="true">
            {(p.number || "").length}/{c.min === c.max ? c.min : c.max}
          </span>
          <FM_State bad={e} good={f.ok(k)} />
        </span>
      </div>
      <FM_Msg
        id={id + "-m"}
        err={e}
        hint={
          c.other
            ? "Add your country code, then the number."
            : `${c.name}: ${c.min === c.max ? c.min : c.min + "\u2013" + c.max} digits, numbers only.`
        }
      />
    </div>
  );
}
function FM_Area({ f, k, label, ph, min = 10, max = 1500, req = true, rows = 4 }) {
  const id = "fm-" + k + "-" + f.uid,
    e = f.show(k),
    n = (f.v[k] || "").trim().length;
  return (
    <div
      className={"fm-f fm-f--full fm-f--area" + (e ? " is-bad" : f.ok(k) ? " is-ok" : "") + (f.v[k] ? " has-v" : "")}
    >
      <div className="fm-box">
        <textarea
          id={id}
          rows={rows}
          value={f.v[k] || ""}
          onChange={f.set(k)}
          onBlur={f.blur(k)}
          placeholder={ph}
          maxLength={max}
          aria-invalid={!!e}
          aria-describedby={id + "-m"}
        />
        <label htmlFor={id}>
          {label}
          {req && <b aria-hidden="true">{" *"}</b>}
        </label>
        <span className="fm-meter" aria-hidden="true">
          <i
            style={{
              width: Math.min(100, (n / Math.max(min, 1)) * 100) + "%",
            }}
            className={n >= min ? "ok" : ""}
          />
        </span>
        <span className="fm-count" aria-hidden="true">
          {n}/{max}
        </span>
      </div>
      <FM_Msg id={id + "-m"} err={e} hint={req ? `At least ${min} characters.` : ""} />
    </div>
  );
}
function FM_Check({ f, k = "consent", children }) {
  const e = f.show(k);
  return (
    <div className={"fm-f fm-f--full" + (e ? " is-bad" : "")}>
      <label className="fm-check">
        <input
          type="checkbox"
          checked={!!f.v[k]}
          onChange={(ev) => {
            f.set(k)(ev);
            f.blur(k)();
          }}
          aria-invalid={!!e}
        />
        <span className="fm-check__box" aria-hidden="true">
          <svg viewBox="0 0 16 16">
            <path d="M3 8.5l3.2 3L13 4.5" />
          </svg>
        </span>
        <span>{children}</span>
      </label>
      <FM_Msg err={e} />
    </div>
  );
}
function FM_Success({ title, children, onAgain, again = "Send another" }) {
  return (
    <div className="fm-done" role="status">
      <div className="fm-done__burst" aria-hidden="true">
        {Array.from(
          {
            length: 12,
          },
          (_, i) => (
            <i
              key={i}
              style={{
                "--a": i * 30 + "deg",
                "--i": i,
              }}
            />
          ),
        )}
      </div>
      <svg className="fm-done__tick" viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="24" />
        <path d="M15 27l7 7 15-16" />
      </svg>
      <h3>{title}</h3>
      <div className="fm-done__body">{children}</div>
      {onAgain && (
        <button type="button" className="btn btn--ghost" onClick={onAgain}>
          {again}
        </button>
      )}
    </div>
  );
}
async function fmPost(url, body) {
  try {
    const r = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const j = await r.json().catch(() => ({}));
    const isJson = (r.headers.get("content-type") || "").includes("json");
    if (r.ok && j.ok)
      return {
        ok: true,
        j,
      };
    if (!isJson || r.status === 404 || r.status === 405 || r.status === 501)
      return {
        preview: true,
      };
    return {
      ok: false,
      error: j.error || "Your message could not be sent.",
      errors: j.errors,
    };
  } catch (e) {
    return {
      preview: true,
    };
  }
}
const FM_PREVIEW_NOTE = "Preview mode: the form passed validation. On the live website it is sent to our team.";
const FM_ISO = {
  India: "IN",
  "United States": "US",
  "United Kingdom": "GB",
  "United Arab Emirates": "AE",
  "Saudi Arabia": "SA",
  Singapore: "SG",
  Germany: "DE",
  France: "FR",
  Australia: "AU",
  Canada: "CA",
  Japan: "JP",
  "South Africa": "ZA",
  Bangladesh: "BD",
  Nepal: "NP",
  "Sri Lanka": "LK",
};
const FM_MARKETS = [
  "India",
  "United States",
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Singapore",
  "Germany",
  "Australia",
  "Multiple / other",
];
const FM_TIMELINE = ["As soon as possible", "Within a month", "1 to 3 months", "Just exploring"];
const FM_CFG = {
  general: {
    ic: "msg",
    c: "#1E5BFF",
    lt: "#6EE0CE",
    title: "Tell us what you need",
    perks: ["Reply within one working day", "Right specialist assigned", "No obligation"],
    ctx: [],
  },
  quote: {
    ic: "file",
    c: "#0B22A8",
    lt: "#A8B6FF",
    title: "Request a quote",
    perks: ["Scope and cost in writing", "One point of contact", "No obligation"],
    ctx: [
      {
        k: "budget",
        kind: "chips",
        label: "Indicative budget",
        options: [
          "Not sure yet",
          "Under \u20B91 lakh",
          "\u20B91\u20135 lakh",
          "\u20B95\u201320 lakh",
          "\u20B920 lakh+",
        ],
      },
    ],
  },
  feasibility: {
    ic: "search",
    c: "#1E5BFF",
    lt: "#5B8CFF",
    title: "Check research feasibility",
    perks: ["Feasibility before you commit", "Sample and method advice", "Confidential brief"],
    ctx: [
      {
        k: "audience",
        kind: "chips",
        label: "Target audience",
        req: true,
        options: ["Consumers (B2C)", "Business (B2B)", "Healthcare", "Public / citizens"],
        icons: ["users", "award", "shield", "flag"],
      },
      {
        k: "markets",
        kind: "multi",
        label: "Markets",
        req: true,
        options: FM_MARKETS,
        icons: "flag",
      },
      {
        k: "method",
        kind: "chips",
        label: "Preferred method",
        options: ["Online", "CATI", "Face-to-face / CAPI", "Qualitative", "Not sure"],
      },
      {
        k: "sample",
        kind: "select",
        label: "Estimated sample size",
        icon: "users",
        options: ["Under 200", "200\u20131,000", "1,000\u20135,000", "5,000+", "Not sure yet"],
      },
    ],
  },
  audience: {
    ic: "users",
    c: "#0E9C88",
    lt: "#6EE0CE",
    title: "Check audience feasibility",
    perks: ["Verified, profiled respondents", "Honest incidence estimate", "Fast turnaround"],
    ctx: [
      {
        k: "markets",
        kind: "multi",
        label: "Markets",
        req: true,
        options: FM_MARKETS,
        icons: "flag",
      },
      {
        k: "sample",
        kind: "select",
        label: "Completes needed",
        icon: "target",
        options: ["Under 100", "100\u2013500", "500\u20132,000", "2,000+", "Not sure yet"],
      },
      {
        k: "criteria",
        kind: "text",
        label: "Key targeting criteria",
        icon: "sliders",
        ph: "e.g. IT decision-makers, 500+ employees",
        max: 160,
      },
    ],
  },
  demo: {
    ic: "sliders",
    c: "#5A3FE0",
    lt: "#A8B6FF",
    title: "Book a Sampledge demo",
    perks: ["Live walkthrough", "Your workflow, not a script", "Questions answered"],
    ctx: [
      {
        k: "team",
        kind: "chips",
        label: "Team size",
        req: true,
        options: ["Just me", "2\u201310", "11\u201350", "50+"],
      },
      {
        k: "tool",
        kind: "text",
        label: "What do you use today?",
        icon: "cpu",
        ph: "Spreadsheets, another platform\u2026",
        max: 120,
      },
    ],
  },
  digital: {
    ic: "trend",
    c: "#0E9C88",
    lt: "#6EE0CE",
    title: "Plan your digital growth",
    perks: ["Audit-led recommendations", "Clear monthly reporting", "Free first consultation"],
    ctx: [
      {
        k: "goal",
        kind: "multi",
        label: "Main goals",
        req: true,
        options: ["More leads", "More traffic", "Online sales", "Brand awareness", "Better rankings"],
        icons: ["target", "trend", "box", "megaphone", "search"],
      },
      {
        k: "site",
        kind: "url",
        label: "Website (optional)",
        icon: "globe",
        ph: "www.yourcompany.com",
      },
      {
        k: "budget",
        kind: "select",
        label: "Monthly budget",
        icon: "pie",
        options: [
          "Not sure yet",
          "Under \u20B950,000",
          "\u20B950,000\u20132 lakh",
          "\u20B92\u20135 lakh",
          "\u20B95 lakh+",
        ],
      },
    ],
  },
  it: {
    ic: "cpu",
    c: "#5A3FE0",
    lt: "#A8B6FF",
    title: "Discuss your IT project",
    perks: ["Discovery before estimates", "Phased delivery", "Support after launch"],
    ctx: [
      {
        k: "ptype",
        kind: "chips",
        label: "Project type",
        req: true,
        options: ["New build", "Redesign / upgrade", "Integration", "Maintenance & support"],
        icons: ["rocket", "refresh", "layers", "shield"],
      },
      {
        k: "platforms",
        kind: "multi",
        label: "Platforms",
        options: ["Website", "Web app", "iOS", "Android", "Cloud / API", "AI"],
      },
      {
        k: "site",
        kind: "url",
        label: "Existing website or app (optional)",
        icon: "globe",
        ph: "www.yourcompany.com",
      },
    ],
  },
  finance: {
    ic: "pie",
    c: "#B4862A",
    lt: "#F0D98F",
    title: "Talk to a finance expert",
    perks: ["Compliance on time", "Monthly MIS clarity", "Confidential handling"],
    ctx: [
      {
        k: "biz",
        kind: "chips",
        label: "Business type",
        req: true,
        options: ["Startup", "SME", "Enterprise", "Non-profit", "Individual"],
        icons: ["rocket", "box", "award", "users", "user"],
      },
      {
        k: "size",
        kind: "select",
        label: "Team size",
        icon: "users",
        options: ["1\u201310", "11\u201350", "51\u2013200", "200+"],
      },
    ],
  },
  panel: {
    ic: "users",
    c: "#F28C28",
    lt: "#F0D98F",
    title: "Join a research panel",
    perks: ["Free to join", "Rewards for your opinion", "Privacy protected"],
    ctx: [
      {
        k: "adult",
        kind: "consent",
        label: "I confirm I am 18 or older.",
      },
    ],
    noCompany: true,
  },
  careers: {
    ic: "award",
    c: "#0B22A8",
    lt: "#6EE0CE",
    title: "Apply to join our team",
    perks: ["We read every application", "Strong profiles kept on file", "Reply if there's a fit"],
    ctx: [
      {
        k: "exp",
        kind: "chips",
        label: "Experience",
        req: true,
        options: ["Fresher", "1\u20133 years", "3\u20137 years", "7+ years"],
      },
      {
        k: "link",
        kind: "url",
        label: "LinkedIn or portfolio (optional)",
        icon: "globe",
        ph: "linkedin.com/in/yourname",
      },
      {
        k: "notice",
        kind: "select",
        label: "Notice period",
        icon: "clock",
        options: ["Immediate", "Up to 30 days", "30\u201360 days", "60+ days"],
      },
    ],
    noCompany: true,
    msgLabel: "What are you great at?",
    msgPh: "Your strengths, recent work and the role you'd like",
  },
};
function fmCtxRule(c) {
  if (c.kind === "url") return FMV.url;
  if (c.kind === "consent") return FMV.consent;
  if (!c.req) return null;
  return FMV.pick(c.label.toLowerCase());
}
let FM_UID = 0;
const fmNextUid = () => ++FM_UID; // one id counter for every form on the site
function FM_Enquiry({ type = "general", service = "", compact = false }) {
  const startType = ENQUIRY_TYPES.some((z) => z.key === type) ? type : "general";
  const svc0 = service.includes(": ") ? service.split(": ")[1] : service;
  const uid = ee.useMemo(fmNextUid, []);
  const [tk, setTk] = ee.useState(startType);
  const Z = ENQUIRY_TYPES.find((z) => z.key === tk),
    C = FM_CFG[tk] || FM_CFG.general;
  const options = svc0 && !Z.options.includes(svc0) ? [svc0, ...Z.options] : Z.options;
  const rules = {
    service: FMV.pick("an option"),
    name: FMV.name,
    email: FMV.email,
    phone: FMV.phone,
    company: C.noCompany ? null : (v) => ((v || "").trim().length > 100 ? "Keep this under 100 characters." : ""),
    message: FMV.text(tk === "careers" ? 20 : 10, 1500, "Tell us a little more"),
    consent: FMV.consent,
  };
  C.ctx.forEach((c) => {
    const r = fmCtxRule(c);
    if (r) rules[c.k] = r;
  });
  const brief0 = (() => {
    try {
      const q = window.location.hash.split("?")[1] || window.location.search.slice(1);
      return new URLSearchParams(q).get("brief") || "";
    } catch (x) {
      return "";
    }
  })();
  const blank = {
    service: svc0,
    name: "",
    email: "",
    phone: {
      country: "IN",
      number: "",
      otherCode: "",
    },
    company: "",
    timeline: "",
    message: brief0.slice(0, 1500),
    consent: false,
    website: "",
  };
  const f = fmUse(blank, rules);
  f.uid = uid;
  const [step, setStep] = ee.useState(0);
  const [st2, setSt] = ee.useState("idle"),
    [msg, setMsg] = ee.useState(""),
    [first, setFirst] = ee.useState("");
  const [shake, setShake] = ee.useState(0);
  const root = ee.useRef(null);
  const STEPS = [
    {
      t: "Your need",
      keys: ["service", ...C.ctx.map((c) => c.k)],
    },
    {
      t: "Your details",
      keys: ["name", "email", "phone", "company"],
    },
    {
      t: "Your message",
      keys: ["message", "consent"],
    },
  ];
  const stepErr = (n) => STEPS[n].keys.filter((k) => rules[k] && f.err(k));
  const focusBad = () =>
    setTimeout(() => {
      const el = root.current && root.current.querySelector('[aria-invalid="true"], .fm-chips.is-bad button');
      if (el) el.focus();
    }, 30);
  const next = () => {
    const bad = f.check(STEPS[step].keys.filter((k) => rules[k]));
    if (bad.length) {
      setShake((x) => x + 1);
      focusBad();
      return;
    }
    setStep((s) => Math.min(2, s + 1));
  };
  const switchType = (k) => {
    setTk(k);
    f.setV((o) => ({
      ...o,
      service: "",
    }));
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return;
    if (step < 2) {
      next();
      return;
    }
    for (let n = 0; n < 3; n++) {
      const bad = f.check(STEPS[n].keys.filter((k) => rules[k]));
      if (bad.length) {
        setStep(n);
        setShake((x) => x + 1);
        focusBad();
        return;
      }
    }
    setSt("sending");
    const extra = {};
    C.ctx.forEach((c) => {
      const val = f.v[c.k];
      if (val && (!Array.isArray(val) || val.length))
        extra[c.label] = Array.isArray(val) ? val.join(", ") : val === true ? "Yes" : val;
    });
    const r = await fmPost("/api/v1/enquiry", {
      type: Z.label,
      name: f.v.name.trim(),
      email: f.v.email.trim(),
      countryCode: phoneDialCode(f.v.phone),
      phone: f.v.phone.number,
      company: (f.v.company || "").trim(),
      service: `${Z.fieldLabel}: ${f.v.service}`,
      timeline: f.v.timeline,
      message: f.v.message.trim(),
      extra,
      website: f.v.website,
      page: window.location.href,
    });
    setFirst(f.v.name.trim().split(" ")[0]);
    if (r.ok) {
      setSt("sent");
      setMsg("");
    } else if (r.preview) {
      setSt("sent");
      setMsg(FM_PREVIEW_NOTE);
    } else {
      setSt("failed");
      setMsg(r.error);
    }
  };
  const progress =
    st2 === "sent"
      ? 100
      : ((step + (STEPS[step].keys.filter((k) => rules[k]).every((k) => !f.err(k)) ? 1 : 0.4)) / 3) * 100;
  return (
    <div
      ref={root}
      className={"fm" + (compact ? " fm--compact" : "")}
      style={{
        "--c": C.c,
        "--lt": C.lt,
      }}
    >
      <div className="fm-top">
        <span className="fm-top__ic" aria-hidden="true">
          <RC_I n={C.ic} s={22} />
        </span>
        <div className="fm-top__t">
          <b>{C.title}</b>
          <small>{Z.label}</small>
        </div>
        <span className="fm-top__pct" aria-hidden="true">
          {Math.round(progress)}%
        </span>
        <i className="fm-top__bar" aria-hidden="true">
          <b
            style={{
              width: progress + "%",
            }}
          />
        </i>
      </div>
      {st2 === "sent" ? (
        <FM_Success
          title={`Thank you${first ? ", " + first : ""}. Your message has been sent.`}
          onAgain={() => {
            f.reset(blank);
            setStep(0);
            setSt("idle");
          }}
        >
          {msg && <p className="fm-preview">{msg}</p>}
          <ol className="fm-next">
            <li>
              <RC_I n="check" s={14} />
              We read your message and assign the right specialist.
            </li>
            <li>
              <RC_I n="clock" s={14} />
              They reply within one working day.
            </li>
            <li>
              <RC_I n="file" s={14} />
              You get a clear proposal, feasibility or quote.
            </li>
          </ol>
          <p>
            {"Urgent? Message us on "}
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
            .
          </p>
        </FM_Success>
      ) : (
        <form className="fm-form" onSubmit={submit} noValidate>
          <ol className="fm-steps" aria-label="Form steps">
            {STEPS.map((s, n) => (
              <li key={s.t} className={(n === step ? "is-on " : "") + (n < step ? "is-done" : "")}>
                <button
                  type="button"
                  onClick={() => {
                    if (n < step) setStep(n);
                    else if (n === step + 1) next();
                  }}
                  aria-current={n === step ? "step" : undefined}
                >
                  <span>
                    {n < step ? (
                      <svg viewBox="0 0 16 16">
                        <path d="M3 8.5l3.2 3L13 4.5" />
                      </svg>
                    ) : (
                      n + 1
                    )}
                  </span>
                  {s.t}
                </button>
              </li>
            ))}
          </ol>
          <div className="fm-pane" key={step + "-" + shake} data-shake={shake > 0 ? "1" : undefined}>
            {step === 0 && (
              <>
                <div className="fm-types" role="group" aria-label="What can we help you with?">
                  {ENQUIRY_TYPES.map((z) => {
                    const zc = FM_CFG[z.key] || FM_CFG.general;
                    return (
                      <button
                        type="button"
                        key={z.key}
                        className={"fm-type" + (z.key === tk ? " is-on" : "")}
                        style={{
                          "--tc": zc.c,
                        }}
                        onClick={() => switchType(z.key)}
                        aria-pressed={z.key === tk}
                      >
                        <RC_I n={zc.ic} s={15} />
                        {z.label}
                      </button>
                    );
                  })}
                </div>
                <FM_Select f={f} k="service" label={Z.fieldLabel} icon={C.ic} options={options} req full />
                {C.ctx.map((c) => {
                  if (c.kind === "chips" || c.kind === "multi")
                    return (
                      <FM_Chips
                        key={c.k}
                        f={f}
                        k={c.k}
                        label={c.label}
                        options={c.options}
                        multi={c.kind === "multi"}
                        req={c.req}
                        icons={c.icons}
                      />
                    );
                  if (c.kind === "select")
                    return (
                      <FM_Select
                        key={c.k}
                        f={f}
                        k={c.k}
                        label={c.label}
                        icon={c.icon}
                        options={c.options}
                        req={c.req}
                        full
                      />
                    );
                  if (c.kind === "consent")
                    return (
                      <FM_Check key={c.k} f={f} k={c.k}>
                        {c.label}
                      </FM_Check>
                    );
                  return (
                    <FM_Input
                      key={c.k}
                      f={f}
                      k={c.k}
                      label={c.label}
                      icon={c.icon}
                      ph={c.ph}
                      max={c.max}
                      type={c.kind === "url" ? "url" : "text"}
                      full
                    />
                  );
                })}
              </>
            )}
            {step === 1 && (
              <div className="fm-grid">
                <FM_Input f={f} k="name" label="Your name" icon="user" req auto="name" max={60} />
                <FM_Input
                  f={f}
                  k="email"
                  label={tk === "panel" || tk === "careers" ? "Email" : "Work email"}
                  icon="msg"
                  type="email"
                  req
                  auto="email"
                  max={160}
                />
                <FM_Phone f={f} />
                {!C.noCompany && (
                  <FM_Input f={f} k="company" label="Company" icon="box" auto="organization" max={100} />
                )}
                {!C.noCompany && <FM_Select f={f} k="timeline" label="Timeline" icon="clock" options={FM_TIMELINE} />}
              </div>
            )}
            {step === 2 && (
              <>
                <div className="fm-recap">
                  <span>
                    <RC_I n={C.ic} s={14} />
                    {f.v.service}
                  </span>
                  {C.ctx
                    .filter((c) => c.kind !== "consent")
                    .map((c) => {
                      const val = f.v[c.k];
                      return val && (!Array.isArray(val) || val.length) ? (
                        <span key={c.k}>{Array.isArray(val) ? val.join(", ") : val}</span>
                      ) : null;
                    })}
                  <span>
                    <RC_I n="user" s={14} />
                    {f.v.name}
                  </span>
                </div>
                <FM_Area
                  f={f}
                  k="message"
                  label={C.msgLabel || "Tell us about your requirement"}
                  ph={C.msgPh || "Your goal, target audience or market, and any deadlines"}
                  min={tk === "careers" ? 20 : 10}
                  rows={compact ? 3 : 5}
                />
                <FM_Check f={f}>
                  {"I agree that Frequent Research may contact me about this enquiry. See our "}
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
          {st2 === "failed" && (
            <p className="fm-fail" role="alert">
              {msg}
              {" Please email "}
              <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              {" or message us on "}
              <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              .
            </p>
          )}
          <div className="fm-nav">
            {step > 0 && (
              <button type="button" className="fm-back" onClick={() => setStep((s) => s - 1)}>
                ← Back
              </button>
            )}
            {step < 2 ? (
              <button key="step-next" type="button" className="btn btn--primary btn--lg fm-go" onClick={next}>
                {"Continue "}
                <span aria-hidden="true">→</span>
              </button>
            ) : (
              <button key="step-send" type="submit" className="btn btn--primary btn--lg fm-go" disabled={st2 === "sending"}>
                {st2 === "sending" ? (
                  <>
                    <i className="fm-spin" aria-hidden="true" />
                    Sending…
                  </>
                ) : (
                  <>
                    {"Send message "}
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            )}
          </div>
          <ul className="fm-perks">
            {C.perks.map((p) => (
              <li key={p}>
                <RC_I n="check" s={13} />
                {p}
              </li>
            ))}
          </ul>
        </form>
      )}
    </div>
  );
}

export { FM_Area, FM_Check, FM_Chips, FM_DISPOSABLE, FM_Enquiry, FM_Input, FM_PREVIEW_NOTE, FM_PRIV, FM_Phone, FM_Select, FM_Success, fmNextUid, fmPost, fmUse };
