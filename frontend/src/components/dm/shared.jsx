/*
 * Shared building blocks for the redesigned Digital Marketing service pages
 * (Google Ads / PPC, Social Media Marketing, ...).
 *
 * Compiled first by scripts/build_dm.js, so every page module can use these.
 * Styles: src/styles/google-ads-ppc.css holds the shared `pp-` design system
 * (headings, buttons, strip, FAQ, related, final CTA, form, etc.); page CSS adds its own prefix.
 *
 * Content rule for every page: no team-member details (names, photos, roles) on service pages,
 * no invented results, clients, certifications or statistics.
 */
import * as ee from 'react';
import { useJsonLd } from '../../app/home/HeroParts.jsx';
import { phoneDialCode } from '../../app/shared/CoreParts.jsx';
import { RC_I, RC_useInView } from '../../app/shared/Reveal.jsx';
import { HmLink } from '../../app/shared/HomeShared.jsx';
import { FM_Area, FM_Check, FM_Chips, FM_Input, FM_PREVIEW_NOTE, FM_PRIV, FM_Phone, FM_Success, fmNextUid, fmPost, fmUse } from '../../app/shared/Forms.jsx';
import { FR_Faq } from '../site/Faq.jsx';
import { FMV } from '../../app/shared/SiteEffects.jsx';

const ppR = () =>
  typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ppGo = (id) => (e) => {
  const el = document.getElementById(id);
  if (el) {
    e && e.preventDefault();
    el.scrollIntoView({ behavior: ppR() ? "auto" : "smooth", block: "start" });
  }
};
const ppIn = (t = 0.25) => RC_useInView(t);
const PpL = (p) => <HmLink {...p} />;
const ppDm = (s) => `/services/digital-marketing/${s}`;
const ppMr = (s) => `/services/market-research/${s}`;
const ppIt = (s) => `/services/it-development/${s}`;
/* Breadcrumb parents by vertical: [label, path] */
const DK_PARENT_DM = ["Digital Marketing", "/services/digital-marketing"];
const DK_PARENT_IT = ["IT & Development", "/services/it-development"];
const PpX = ({ href, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer">
    {children}
    <span className="pp-sr"> (opens in a new tab)</span>
  </a>
);
const PpI = ({ n, s = 18 }) => <RC_I n={n} s={s} />;

function PP_Head({ k, t, s, id, light, center, lv }) {
  const H = lv === 3 ? "h3" : "h2"; /* build 44: lv={3} for sub-sections, so each page keeps a short H2 outline */
  return (
    <div className={"pp-head" + (light ? " pp-head--light" : "") + (center ? " pp-head--c" : "") + (lv === 3 ? " pp-head--h3" : "")}>
      {k && <span className="pp-kick">{k}</span>}
      <H id={id}>{t}</H>
      {s && <p>{s}</p>}
    </div>
  );
}

/* Counts up once when visible. Only used for structural counts (stages, checkpoints) — never results. */
function PP_Count({ to, v }) {
  const [n, setN] = ee.useState(ppR() ? to : 0);
  ee.useEffect(() => {
    if (!v || ppR()) {
      if (v) setN(to);
      return;
    }
    let raf, t0;
    const step = (t) => {
      if (!t0) t0 = t;
      const p = Math.min(1, (t - t0) / 900);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [v, to]);
  return <>{n}</>;
}

/* Sets title, description, canonical, OG and Twitter tags for a page, and restores them on unmount. */
function dmMeta(path, title, desc) {
  ee.useEffect(() => {
    const url = location.origin + path;
    const set = (sel, make, attr, val) => {
      let el = document.head.querySelector(sel);
      const created = !el;
      if (!el) {
        el = make();
        document.head.appendChild(el);
      }
      const prev = el.getAttribute(attr);
      el.setAttribute(attr, val);
      return () => {
        if (created) el.remove();
        else if (prev != null) el.setAttribute(attr, prev);
      };
    };
    const meta = (k, v, prop) =>
      set(
        `meta[${prop ? "property" : "name"}="${k}"]`,
        () => {
          const m = document.createElement("meta");
          m.setAttribute(prop ? "property" : "name", k);
          return m;
        },
        "content",
        v
      );
    const undo = [
      set('link[rel="canonical"]', () => {
        const l = document.createElement("link");
        l.rel = "canonical";
        return l;
      }, "href", url),
      meta("og:title", title, true),
      meta("og:description", desc, true),
      meta("og:url", url, true),
      meta("og:type", "website", true),
      meta("twitter:card", "summary_large_image"),
      meta("twitter:title", title),
      meta("twitter:description", desc),
    ];
    const apply = () => {
      document.title = title;
      const m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", desc);
    };
    const t1 = setTimeout(apply, 0),
      t2 = setTimeout(apply, 300);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      undo.forEach((u) => u());
    };
  }, [path, title, desc]);
}

/* Service + BreadcrumbList + FAQPage JSON-LD for a digital marketing service page. */
function dmSchema(key, { path, crumb, name, serviceType, description, faq, parent = DK_PARENT_DM }) {
  useJsonLd(key, {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name,
        serviceType,
        description,
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        areaServed: "India",
        url: `${location.origin}${path}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: parent[0], item: `${location.origin}${parent[1]}` },
          { "@type": "ListItem", position: 3, name: crumb, item: `${location.origin}${path}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
}

/* Slow capability marquee. caps: [label, icon][] */
function DM_Strip({ caps, label }) {
  const row = (hidden) => (
    <ul className="pp-strip__row" aria-hidden={hidden || undefined}>
      {caps.map(([t, ic]) => (
        <li key={t}>
          <PpI n={ic} s={16} />
          {t}
        </li>
      ))}
    </ul>
  );
  return (
    <section className="pp-strip" aria-label={label}>
      <div className="pp-strip__track">
        {row(false)}
        {row(true)}
      </div>
    </section>
  );
}

/* FAQ accordion. items: [question, answer][] */
function DM_Faq({ id, title, items, aside }) {
  /* build 51: per-world FAQ design (src/components/site/Faq.jsx); the markup below is the fallback */
  return <FR_Faq id={id} title={title} items={items} aside={aside} />;
  return <DM_FaqLegacy id={id} title={title} items={items} aside={aside} />;
}
function DM_FaqLegacy({ id, title, items, aside }) {
  const [open, setOpen] = ee.useState(0);
  return (
    <section className="pp-faq" aria-labelledby={id}>
      <div className="container pp-faq__in">
        <div>
          <PP_Head k="FAQ" id={id} t={title} />
          {aside && <p className="pp-links">{aside}</p>}
        </div>
        <ul className="pp-acc">
          {items.map(([q, a], k) => (
            <li key={q} className={open === k ? "is-open" : ""}>
              <h3>
                <button type="button" aria-expanded={open === k} aria-controls={id + "-" + k} onClick={() => setOpen(open === k ? -1 : k)}>
                  <span>{q}</span>
                  <i aria-hidden="true" />
                </button>
              </h3>
              <div className="pp-acc__a" id={id + "-" + k} hidden={open !== k}>
                <p>{a}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Industry cards linked to the existing industry pages (INDUSTRIES). "+N more" is computed from the live list. */

/*
 * Multi-step enquiry form built on the site-wide FM_* form system.
 * chips: [{ k, t (step tab), q (question), label, options, multi, optional }] — one step each, then a contact step.
 * optional: true lets the visitor skip that step (sent as "(not provided)").
 * msgLabel (optional): adds a short optional "requirement" text box to the contact step.
 * Contact step: name, company, work email (required); phone/WhatsApp and website (optional); consent.
 */
function DM_Form({ id, kicker = "Free consultation", title, sub, chips, type, service, icon = "target", successTitle, submitLabel = "Send My Request", msgLabel, msgPh, siteLabel = "Website (optional)", nextSteps }) {
  const uid = ee.useMemo(fmNextUid, []);
  const rules = {
    name: FMV.name,
    org: FMV.org,
    email: FMV.email,
    phone: (p) => (p && (p.number || "").trim() ? FMV.phone(p) : ""),
    site: FMV.url,
    consent: FMV.consent,
    message: (v) => ((v || "").trim().length > 1000 ? "Keep this under 1000 characters." : ""),
  };
  const blank = { name: "", org: "", email: "", phone: { country: "IN", number: "", otherCode: "" }, site: "", message: "", consent: false, website: "" };
  chips.forEach((c) => {
    rules[c.k] = c.text
      ? (v) => ((v || "").trim().length > 300 ? "Keep this under 300 characters." : !c.optional && !(v || "").trim() ? "Please fill this in." : "")
      : c.optional
      ? () => ""
      : FMV.pick(c.multi ? "at least one option" : "an option");
    blank[c.k] = c.multi ? [] : "";
  });
  const f = fmUse(blank, rules);
  f.uid = uid;
  const [step, setStep] = ee.useState(0),
    [st, setSt] = ee.useState("idle"),
    [msg, setMsg] = ee.useState(""),
    [shake, setShake] = ee.useState(0);
  const STEPS = [...chips.map((c) => ({ t: c.t, q: c.q, keys: [c.k] })), { t: "Contact", q: "Where should we reach you?", keys: ["name", "org", "email", "phone", "site", ...(msgLabel ? ["message"] : []), "consent"] }];
  const last = STEPS.length - 1;
  const next = () => {
    const bad = f.check(STEPS[step].keys);
    if (bad.length) {
      setShake((x) => x + 1);
      return;
    }
    setStep((s) => Math.min(last, s + 1));
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return; // honeypot
    if (step < last) {
      next();
      return;
    }
    for (let n = 0; n <= last; n++) {
      if (f.check(STEPS[n].keys).length) {
        setStep(n);
        setShake((x) => x + 1);
        return;
      }
    }
    setSt("sending");
    const extra = {};
    chips.forEach((c) => (extra[c.label] = (Array.isArray(f.v[c.k]) ? f.v[c.k].join(", ") : (f.v[c.k] || "").trim()) || "(not provided)"));
    extra[siteLabel.replace(/\s*\(optional\)/i, "")] = f.v.site.trim() || "(not provided)";
    const r = await fmPost("/api/v1/enquiry", {
      type,
      name: f.v.name.trim(),
      email: f.v.email.trim(),
      company: f.v.org.trim(),
      countryCode: f.v.phone.number ? phoneDialCode(f.v.phone) : "",
      phone: f.v.phone.number,
      service,
      message: (f.v.message || "").trim() || "(no message)",
      extra,
      website: f.v.website,
      page: window.location.href,
    });
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
  const progress = st === "sent" ? 100 : (step / STEPS.length) * 100 + (STEPS[step].keys.every((k) => !f.err(k)) ? 100 / STEPS.length : 6);
  const cur = chips[step];
  return (
    <section className="pp-form" id={id} aria-labelledby={id + "-h"}>
      <div className="container pp-form__in">
        <div className="pp-form__side">
          <PP_Head k={kicker} id={id + "-h"} t={title} s={sub} />
          <ul className="pp-checks">
            <li>
              <PpI n="check" s={14} />
              Reply within one working day
            </li>
            <li>
              <PpI n="check" s={14} />
              No obligation
            </li>
            <li>
              <PpI n="check" s={14} />
              Clear, practical next steps
            </li>
          </ul>
          <p className="pp-links">
            Prefer to talk first? <PpL to="/lets-talk">Let's talk</PpL>
          </p>
        </div>
        <div className="fm pp-fm" style={{ "--c": "#0B22A8", "--lt": "#6EE0CE" }}>
          <div className="fm-top">
            <span className="fm-top__ic" aria-hidden="true">
              <PpI n={icon} s={22} />
            </span>
            <div className="fm-top__t">
              <b>{st === "sent" ? "Request received" : STEPS[step].q}</b>
              <small>
                Step {Math.min(step + 1, STEPS.length)} of {STEPS.length}
              </small>
            </div>
            <span className="fm-top__pct" aria-hidden="true">
              {Math.round(progress)}%
            </span>
            <i className="fm-top__bar" aria-hidden="true">
              <b style={{ width: progress + "%" }} />
            </i>
          </div>
          {st === "sent" ? (
            <FM_Success
              title={successTitle}
              onAgain={() => {
                f.reset(blank);
                setStep(0);
                setSt("idle");
              }}
              again="Send another request"
            >
              {msg && <p className="fm-preview">{msg}</p>}
              <ol className="fm-next">
                {(nextSteps || ["We review your goals, audience and current setup.", "We contact you within one working day.", "You get a clear recommended next step."]).map((t, k) => (
                  <li key={t}>
                    <PpI n={["search", "msg", "file"][k] || "check"} s={14} />
                    {t}
                  </li>
                ))}
              </ol>
            </FM_Success>
          ) : (
            <form className="fm-form" onSubmit={submit} noValidate>
              <ol className="fm-steps">
                {STEPS.map((s, n) => (
                  <li key={s.t} className={(n === step ? "is-on " : "") + (n < step ? "is-done" : "")}>
                    <button
                      type="button"
                      onClick={() => {
                        if (n < step) setStep(n);
                        else if (n === step + 1) next();
                      }}
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
                {cur && cur.text ? (
                  <div className="fm-grid">
                    <FM_Input f={f} k={cur.k} label={cur.label + (cur.optional ? " (optional)" : "")} icon={cur.icon || "file"} req={!cur.optional} ph={cur.ph} max={300} full />
                  </div>
                ) : (
                  cur && <FM_Chips f={f} k={cur.k} label={cur.label} options={cur.options} multi={cur.multi} req={!cur.optional} />
                )}
                {step === last && (
                  <div className="fm-grid">
                    <FM_Input f={f} k="name" label="Name" icon="user" req auto="name" max={60} />
                    <FM_Input f={f} k="org" label="Company" icon="box" req auto="organization" max={100} />
                    <FM_Input f={f} k="email" label="Work email" icon="msg" type="email" req auto="email" max={160} />
                    <FM_Phone f={f} label="Phone / WhatsApp (optional)" req={false} />
                    <FM_Input f={f} k="site" label={siteLabel} icon="globe" ph="www.yourcompany.com" max={200} full />
                    {msgLabel && <FM_Area f={f} k="message" label={msgLabel} ph={msgPh || "A sentence or two is enough"} min={0} max={1000} req={false} rows={3} />}
                    <FM_Check f={f}>
                      I agree that Frequent Research may contact me about this request. See our <HmLink to={FM_PRIV}>Privacy Policy</HmLink>.
                    </FM_Check>
                  </div>
                )}
              </div>
              <input className="hp" tabIndex={-1} autoComplete="off" value={f.v.website} onChange={f.set("website")} aria-hidden="true" />
              {st === "failed" && (
                <p className="fm-fail" role="alert">
                  {msg}
                </p>
              )}
              <div className="fm-nav">
                {step > 0 && (
                  <button type="button" className="fm-back" onClick={() => setStep((s) => s - 1)}>
                    ← Back
                  </button>
                )}
                {step < last ? (
                  <button key="step-next" type="button" className="btn btn--primary btn--lg fm-go" onClick={next}>
                    Continue <span aria-hidden="true">→</span>
                  </button>
                ) : (
                  <button key="step-send" type="submit" className="btn btn--primary btn--lg fm-go" disabled={st === "sending"}>
                    {st === "sending" ? (
                      <>
                        <i className="fm-spin" aria-hidden="true" />
                        Sending…
                      </>
                    ) : (
                      <>
                        {submitLabel} <span aria-hidden="true">→</span>
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

export { DK_PARENT_DM, DK_PARENT_IT, DM_Faq, DM_Form, DM_Strip, PP_Count, PP_Head, PpI, PpL, PpX, dmMeta, dmSchema, ppDm, ppGo, ppIn, ppIt, ppMr, ppR };
