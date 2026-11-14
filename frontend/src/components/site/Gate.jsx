/*
 * Gated download (build 51; redesigned in build 55) — one modal for every downloadable document: service brochures,
 * country panel books, other documents and case studies. Prefix FRG_. Styles: src/styles/gate.css (fg-).
 *
 * Build 55 layout: a three-step "unlock" — 1 You (first, last, email) · 2 Work (country, phone, company, designation)
 * · 3 Unlock (recap, CAPTCHA, consent) — each step with its own colour grade, so nothing needs to scroll on a laptop.
 * The left stage shows the document as a 3D book whose cover prints the reader's name as they type; three keys
 * light up as steps complete and the padlock opens on success. Footer (Back / Continue / Unlock & download) is its
 * own grid row, never overlapping the fields. Privacy link opens in a new tab so the form is not lost.
 *
 * Required: first name, last name, email, country (flag), phone (flag + calling code), company, CAPTCHA, consent.
 * Designation is optional. On submit the request is posted to `endpoint` (default POST /api/resource-download;
 * case studies keep the base POST /api/case-study-download) with the visitor's details and the document, falling
 * back to /api/enquiry when the endpoint is not deployed. The PDF is then generated in the browser (onUnlock).
 * Build 65 update 3: every download asks for the details again, so each request is its own lead record (the earlier
 * "skip the form for the rest of the visit" shortcut is off).
 * deliver="email" (documents kept on the server, e.g. company brochure): no PDF is built in the browser; the request
 * goes to `endpoint` (POST /api/download, which emails the file) and the visitor sees an honest status: emailed /
 * passed to the team (fallback /api/enquiry) / preview with no backend (nothing sent).
 */
import * as ee from 'react';
import { FRK_Captcha, FRK_Country, FRK_EMBLEM, FRK_Field, FRK_Flag, FRK_I, FRK_Phone, frkCaptchaErr, frkCountry, frkLead, frkPhoneCode, frkPost, frkRule, frkSaveLead, frkUid, frkUseForm, frkVStyle } from './FrKit.jsx';

const FRG_OK = "fr-dl-ok";
const frgSetOk = () => {
  try {
    sessionStorage.setItem(FRG_OK, "1");
  } catch (e) {}
};

/* build 55 — the document as a 3D book that personalises itself: the cover prints the reader's name and company as
   they type, three "keys" orbit it and light up as each step is completed, and the padlock opens on success. */
function FRG_Book({ world, kind, title, sub, flag, icon, name, company, keys, open }) {
  return (
    <div className={"fg-book" + (open ? " is-open" : "")} style={frkVStyle(world)} aria-hidden="true">
      <span className="fg-book__orbit">
        {FRG_STEPS.map(([t, ic], i) => (
          <i key={t} className={"fg-key" + (keys[i] ? " is-on" : "")} style={{ "--i": i }}>
            <FRK_I n={keys[i] ? "check" : ic} s={14} sw={keys[i] ? 3 : 2} />
          </i>
        ))}
      </span>
      <span className="fg-book__obj">
        <span className="fg-book__pages" />
        <span className="fg-book__spine" />
        <span className="fg-book__cover">
          <span className="fg-book__band" />
          <img className="fg-book__wm" src={FRK_EMBLEM} width="320" height="314" alt="" />
          <span className="fg-book__k">{kind}</span>
          <b className="fg-book__t">{title}</b>
          {sub && <small className="fg-book__sub">{sub}</small>}
          {flag && (
            <span className="fg-book__flag">
              <FRK_Flag iso={flag} />
            </span>
          )}
          <span className="fg-book__ic">
            <FRK_I n={icon || "file"} s={20} />
          </span>
          <span className={"fg-book__for" + (name ? " is-on" : "")}>
            <small>Prepared for</small>
            <b>{name || "Your name"}</b>
            {company && <em>{company}</em>}
          </span>
          <span className="fg-book__shine" />
        </span>
        <span className="fg-lock">
          <i className="fg-lock__shackle" />
          <i className="fg-lock__body">
            <FRK_I n={open ? "check" : "lock"} s={16} sw={2.6} />
          </i>
        </span>
      </span>
      <span className="fg-book__floor" />
    </div>
  );
}

const FRG_STEPS = [
  ["You", "user", ["first", "last", "email"], "Who's reading?", "Three quick details and your copy is on its way."],
  ["Work", "building", ["country", "phone", "company", "designation"], "Where do you work?", "So we can tailor follow-ups to your market — never spam."],
  ["Unlock", "lock", ["captcha", "consent"], "Unlock your copy", "One security check and your PDF downloads instantly."],
];
const FRG_TONES = [
  { a: "#1E5BFF", b: "#22D3EE" },
  { a: "#7C4DFF", b: "#F0457E" },
  { a: "#F59E0B", b: "#12C9A0" },
];
/* success: a little burst, and a receipt of what was delivered and to whom */
function FRG_Receipt({ title, lead, byMail }) {
  if (!lead) return null;
  const cty = frkCountry(lead.country);
  return (
    <dl className="fg-rcpt">
      <div>
        <dt>Document</dt>
        <dd>{title}</dd>
      </div>
      <div>
        <dt>{byMail ? "Sent to" : "Prepared for"}</dt>
        <dd>{byMail ? lead.email : ((lead.first || "") + " " + (lead.last || "")).trim() + (lead.company ? " · " + lead.company : "")}</dd>
      </div>
      <div>
        <dt>Format</dt>
        <dd>
          PDF{byMail ? " by email" : " · watermarked"}
          {cty && (
            <span className="fg-rcpt__flag">
              <FRK_Flag iso={cty.iso} /> {cty.name}
            </span>
          )}
        </dd>
      </div>
    </dl>
  );
}

function FRG_Gate({ world = "market-research", kind, title, sub, flag, icon, resource, endpoint = "/api/v1/resource-download", extra = {}, deliver = "pdf", onUnlock, onClose, inline = false }) {
  const byMail = deliver === "email";
  const saved = frkLead() || {};
  /* build 65 update 3: every download needs the form again (no "welcome back" shortcut, no pre-filled fields) */
  const quick = false;
  const blank = { first: "", last: "", email: "", country: "", phone: { country: "IN", number: "", otherCode: "" }, company: "", designation: "", captcha: { answer: "" }, consent: false, website: "" };
  const rules = {
    first: (x) => frkRule.first(x),
    last: (x) => frkRule.last(x, true),
    email: (x) => frkRule.email(x),
    country: (x) => frkRule.country(x),
    phone: (x) => frkRule.phone(x, true),
    company: (x) => frkRule.text(x, 100, "company name", true) || ((x || "").trim().length === 1 ? "Enter your company name." : ""),
    designation: (x) => frkRule.text(x, 80, "designation", true),
    captcha: (x) => frkCaptchaErr(x),
    consent: (x) => (x ? "" : "Please tick to agree before downloading."),
  };
  const f = frkUseForm(blank, rules);
  const [stage, setStage] = ee.useState(quick ? "quick" : "form"); /* form | sending | done | failed | quick */
  const [msg, setMsg] = ee.useState("");
  const [shake, setShake] = ee.useState(0);
  const box = ee.useRef(null);
  const mainRef = ee.useRef(null);
  const [step, setStep] = ee.useState(0);
  const formSend = ee.useRef(false);
  const [dir, setDir] = ee.useState(1);
  const last = ee.useRef(null);
  const uid = ee.useMemo(() => frkUid("fg"), []);
  const id = (k) => uid + "-" + k;

  ee.useEffect(() => {
    /* build 65 update 8: inline mode (panel country pages) has no overlay, no scroll lock and no focus trap */
    if (inline) return undefined;
    last.current = document.activeElement;
    document.body.classList.add("no-scroll");
    document.documentElement.classList.add("fg-is-open");
    const t = setTimeout(() => {
      const el = box.current && box.current.querySelector("input:not([tabindex='-1']), .fg-quick .frk-btn");
      if (el && window.matchMedia && window.matchMedia("(pointer: fine)").matches) el.focus();
      else if (box.current) box.current.focus();
    }, 80);
    const k = (e) => {
      if (e.key === "Escape" && !document.querySelector(".cc-pop")) onClose();
      if (e.key === "Tab" && box.current) {
        const els = [...box.current.querySelectorAll('a[href],button:not([disabled]),input:not([tabindex="-1"]),textarea,[tabindex="0"]')].filter((x) => x.offsetParent !== null);
        if (!els.length) return;
        if (e.shiftKey && document.activeElement === els[0]) (e.preventDefault(), els[els.length - 1].focus());
        else if (!e.shiftKey && document.activeElement === els[els.length - 1]) (e.preventDefault(), els[0].focus());
      }
    };
    window.addEventListener("keydown", k);
    return () => {
      clearTimeout(t);
      document.body.classList.remove("no-scroll");
      document.documentElement.classList.remove("fg-is-open");
      window.removeEventListener("keydown", k);
      const l = last.current;
      if (l && l.focus) setTimeout(() => l.focus(), 0);
    };
  }, []);

  const keys = Object.keys(rules);
  const filled = keys.filter((k) => !rules[k](f.v[k])).length;
  const steps = FRG_STEPS.map(([t, ic, ks]) => ({ t, ic, ks, done: ks.every((k) => !rules[k](f.v[k])) }));
  const pct = Math.round((filled / keys.length) * 100);
  const goStep = (n) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
    setTimeout(() => {
      const m = mainRef.current;
      if (m) m.scrollTop = 0;
      const el = box.current && box.current.querySelector(".fg-pane input:not([tabindex='-1']):not([type=checkbox]), .fg-pane button.frk-cty");
      if (el && window.matchMedia && window.matchMedia("(pointer: fine)").matches) el.focus({ preventScroll: true });
    }, 60);
  };
  const next = () => {
    const bad = f.touch(steps[step].ks);
    if (bad.length) {
      setShake((x) => x + 1);
      setTimeout(() => {
        const el = box.current && box.current.querySelector('.fg-pane [aria-invalid="true"]');
        if (el) el.focus();
      }, 30);
      return;
    }
    goStep(step + 1);
  };
  const mailed = (lead, r) => {
    setMsg(
      r.via === "endpoint"
        ? `We've emailed “${title}” to ${lead.email}. It usually arrives within a few minutes — check your spam folder if you don't see it.`
        : r.via === "enquiry"
        ? `Your request reached our team. “${title}” will be emailed to ${lead.email} shortly.`
        : `Preview mode: no mail server is connected here, so nothing was sent. On the live website “${title}” is emailed to ${lead.email}.`
    );
    setStage("done");
  };
  const make = async (lead) => {
    try {
      const r = await onUnlock(lead);
      setMsg(r === "declined" ? "The download was cancelled. Use “Download again” whenever you're ready." : "Your PDF is downloading now. Check your browser's downloads if it doesn't open automatically.");
      setStage("done");
    } catch (e) {
      setMsg((e && e.message) || "The PDF could not be created in this browser. Please try again or write to info@frequentresearch.com.");
      setStage("failed");
    }
  };
  const log = async (lead, extraBody) => {
    const body = { first: lead.first, last: lead.last, name: (lead.first + " " + (lead.last || "")).trim(), email: lead.email, country: lead.country, countryName: (frkCountry(lead.country) || {}).name || "", countryCode: lead.phone && lead.phone.number ? frkPhoneCode(lead.phone) : "", phone: lead.phone ? lead.phone.number : "", company: lead.company, designation: lead.designation || "",  resource, consent: true, website: "", page: location.href, ...extra, ...extraBody };
    let r = await frkPost(endpoint, body);
    if (!r.preview) return { ...r, via: "endpoint" };
    r = await frkPost("/api/v1/enquiry", { type: "Download: " + (resource && resource.title), ...body, service: "Download — " + (resource && resource.type), message: `${byMail ? "Please email" : "Downloaded"}: ${resource && resource.title}` });
    return { ...r, via: r.preview ? "none" : "enquiry" };
  };
  const submit = async (e) => {
    e.preventDefault();
    if (f.v.website) return;
    if (step < FRG_STEPS.length - 1) return next();
    const bad = f.check();
    if (bad.length) {
      const firstBad = FRG_STEPS.findIndex(([, , ks]) => ks.some((k) => bad.includes(k)));
      if (firstBad >= 0 && firstBad !== step) setStep(firstBad);
      setShake((x) => x + 1);
      setTimeout(() => {
        const el = box.current && box.current.querySelector('[aria-invalid="true"]');
        if (el) el.focus();
      }, 30);
      return;
    }
    formSend.current = true;
    setStage("sending");
    const lead = { first: f.v.first.trim(), last: f.v.last.trim(), email: f.v.email.trim(), country: f.v.country, phone: f.v.phone, company: f.v.company.trim(), designation: f.v.designation.trim()};
    const r = await log(lead, { captchaId: f.v.captcha.id || "", captcha: (f.v.captcha.answer || "").trim() });
    if (r.ok === false) {
      setStage("form");
      setMsg(r.error || "Your request could not be sent.");
      if (r.errors && r.errors.captcha) f.setV((o) => ({ ...o, captcha: { ...o.captcha, answer: "" } }));
      return;
    }
    frkSaveLead(lead);
    frgSetOk();
    if (byMail) return mailed(lead, r);
    await make(lead);
  };
  const quickGo = async () => {
    formSend.current = false;
    setStage("sending");
    if (byMail) return mailed(saved, await log(saved, { quick: true }));
    log(saved, { quick: true });
    await make(saved);
  };
  const A = (k) => ({ "aria-invalid": !!f.show(k) || undefined, "aria-describedby": f.show(k) ? id(k) + "-err" : undefined, onBlur: f.blur(k) });

  const tone = FRG_TONES[step];
  const name = [f.v.first.trim(), f.v.last.trim()].filter(Boolean).join(" ");
  const isOpen = stage === "done";
  const cty = frkCountry(f.v.country);

  return (
    <div className={inline ? "fg-inl" : "fg-ov"} onMouseDown={(e) => !inline && e.target === e.currentTarget && onClose()}>
      <div ref={box} tabIndex={-1} className={"fg fg--s" + step + (isOpen ? " is-open" : "") + (inline ? " fg--inline" : "")} role={inline ? "region" : "dialog"} aria-modal={inline ? undefined : "true"} aria-labelledby={id("h")} style={{ ...frkVStyle(world), "--fc": tone.a, "--ta": tone.a, "--tb": tone.b }}>
        {inline ? null : (
          <button type="button" className="fg-x" onClick={onClose} aria-label="Close">
            <FRK_I n="x" s={20} />
          </button>
        )}
        <aside className="fg-stage">
          <span className="fg-stage__aura" aria-hidden="true">
            <i />
            <i />
            <i />
          </span>
          <span className="fg-stage__grid" aria-hidden="true" />
          <FRG_Book world={world} kind={kind} title={title} sub={sub} flag={flag} icon={icon} name={stage === "quick" ? ((saved.first || "") + " " + (saved.last || "")).trim() : name} company={stage === "quick" ? saved.company : f.v.company.trim()} keys={stage === "form" || stage === "sending" ? steps.map((x) => x.done) : [true, true, true]} open={isOpen} />
          <ul className="fg-perks">
            {byMail ? (
              <li style={{ "--i": 0 }}>
                <FRK_I n="mail" s={15} /> Sent to your inbox
              </li>
            ) : (
              <>
                <li style={{ "--i": 0 }}>
                  <FRK_I n="down" s={15} /> Instant PDF
                </li>
                <li style={{ "--i": 1 }}>
                  <FRK_I n="shield" s={15} /> Watermarked
                </li>
              </>
            )}
            <li style={{ "--i": 2 }}>
              <FRK_I n="lock" s={15} /> Private
            </li>
          </ul>
        </aside>

        <div className="fg-panel">
          {stage === "form" || (stage === "sending" && formSend.current) ? (
            <form className="fg-form" onSubmit={submit} noValidate>
              <header className="fg-head">
                <small className="fg-kick">
                  <FRK_I n={icon || "file"} s={13} /> {kind}
                </small>
                <h2 id={id("h")} className="fg-title">
                  {title}
                </h2>
                <ol className="fg-rail" aria-label={`Step ${step + 1} of ${FRG_STEPS.length}`}>
                  {steps.map((x, i) => (
                    <li key={x.t} className={(i === step ? "is-now" : "") + (x.done ? " is-done" : "")} style={{ "--a": FRG_TONES[i].a, "--b": FRG_TONES[i].b }} aria-current={i === step ? "step" : undefined}>
                      <button type="button" onClick={() => (i < step || steps.slice(0, i).every((y) => y.done) ? goStep(i) : next())} tabIndex={-1}>
                        <span className="fg-rail__n">{x.done && i !== step ? <FRK_I n="check" s={13} sw={3} /> : i + 1}</span>
                        <span className="fg-rail__t">{x.t}</span>
                      </button>
                      <i className="fg-rail__bar" aria-hidden="true" />
                    </li>
                  ))}
                  <li className="fg-rail__pct" aria-hidden="true">
                    <b>{pct}%</b>
                  </li>
                </ol>
              </header>
              <div className="fg-main" ref={mainRef}>
                <div className={"fg-pane fg-pane--" + step + (dir < 0 ? " is-back" : "") + (shake ? " is-shake" : "")} key={step + "-" + shake}>
                  <div className="fg-pane__intro">
                    <span className="fg-pane__ic" aria-hidden="true">
                      <FRK_I n={FRG_STEPS[step][1]} s={22} />
                    </span>
                    <span>
                      <b>{FRG_STEPS[step][3]}</b>
                      <small>{FRG_STEPS[step][4]}</small>
                    </span>
                  </div>
                  {step === 0 && (
                    <div className="fg-grid">
                      <FRK_Field id={id("first")} label="First name" req error={f.show("first")} icon="user" ok={f.ok("first")}>
                        <input id={id("first")} type="text" autoComplete="given-name" spellCheck={false} value={f.v.first} onChange={f.set("first")} maxLength={40} {...A("first")} />
                      </FRK_Field>
                      <FRK_Field id={id("last")} label="Last name" req error={f.show("last")} icon="user" ok={f.ok("last")}>
                        <input id={id("last")} type="text" autoComplete="family-name" spellCheck={false} value={f.v.last} onChange={f.set("last")} maxLength={40} {...A("last")} />
                      </FRK_Field>
                      <FRK_Field id={id("email")} label="Work email" req error={f.show("email")} icon="mail" ok={f.ok("email")} full>
                        <input id={id("email")} type="email" inputMode="email" autoComplete="email" value={f.v.email} onChange={f.set("email")} maxLength={160} {...A("email")} />
                      </FRK_Field>
                    </div>
                  )}
                  {step === 1 && (
                    <div className="fg-grid">
                      <FRK_Field id={id("country")} label="Country" req error={f.show("country")} ok={f.ok("country")}>
                        <FRK_Country id={id("country")} value={f.v.country} onChange={(iso) => f.setV((o) => ({ ...o, country: iso, phone: o.phone.number ? o.phone : { ...o.phone, country: iso } }))} onBlur={f.blur("country")} invalid={!!f.show("country")} describedBy={f.show("country") ? id("country") + "-err" : undefined} />
                      </FRK_Field>
                      <FRK_Field id={id("phone")} label="Phone number" req error={f.show("phone")} ok={f.ok("phone")}>
                        <FRK_Phone id={id("phone")} value={f.v.phone} onChange={(p) => f.setV((o) => ({ ...o, phone: p }))} onBlur={f.blur("phone")} error={f.show("phone")} />
                      </FRK_Field>
                      <FRK_Field id={id("company")} label="Company name" req error={f.show("company")} icon="building" ok={f.ok("company")}>
                        <input id={id("company")} type="text" autoComplete="organization" value={f.v.company} onChange={f.set("company")} maxLength={100} {...A("company")} />
                      </FRK_Field>
                      <FRK_Field id={id("designation")} label="Designation" req error={f.show("designation")} icon="brief" ok={f.ok("designation")}>
                        <input id={id("designation")} type="text" autoComplete="organization-title" value={f.v.designation} onChange={f.set("designation")} maxLength={80} {...A("designation")} />
                      </FRK_Field>
                    </div>
                  )}
                  {step === 2 && (
                    <>
                      <ul className="fg-recap" aria-label="Your details">
                        <li>
                          <FRK_I n="user" s={14} /> <span className="fg-recap__t">{name}</span>
                          <button type="button" onClick={() => goStep(0)} aria-label="Edit your name and email">
                            Edit
                          </button>
                        </li>
                        <li>
                          <FRK_I n="mail" s={14} /> <span className="fg-recap__t">{f.v.email.trim()}</span>
                        </li>
                        <li>
                          {cty ? <FRK_Flag iso={cty.iso} /> : <FRK_I n="globe" s={14} />} <span className="fg-recap__t">{[f.v.company.trim(), cty && cty.name].filter(Boolean).join(" · ")}</span>
                          <button type="button" onClick={() => goStep(1)} aria-label="Edit your company and country">
                            Edit
                          </button>
                        </li>
                      </ul>
                      <div className="fg-cap">
                        <FRK_Field id={id("captcha")} label="Security check" req error="" full>
                          <FRK_Captcha id={id("captcha")} value={f.v.captcha} onChange={(c) => f.setV((o) => ({ ...o, captcha: { ...o.captcha, ...c } }))} onBlur={f.blur("captcha")} error={f.show("captcha")} />
                        </FRK_Field>
                      </div>
                      <label className={"fg-consent" + (f.show("consent") ? " is-bad" : "") + (f.v.consent ? " is-on" : "")}>
                        <input type="checkbox" checked={f.v.consent} onChange={f.set("consent")} aria-invalid={!!f.show("consent") || undefined} aria-describedby={f.show("consent") ? id("consent") + "-err" : undefined} />
                        <span className="fg-consent__box" aria-hidden="true">
                          <FRK_I n="check" s={14} sw={3} />
                        </span>
                        <span>
                          I agree that Frequent Research may contact me about this download and store my details as described in the{" "}
                          <a href="/privacy-policy" target="_blank" rel="noopener">
                            Privacy Policy<span className="frk-sr"> (opens in a new tab)</span>
                          </a>
                          .
                        </span>
                      </label>
                      {f.show("consent") && (
                        <em className="frk-err" id={id("consent") + "-err"}>
                          {f.show("consent")}
                        </em>
                      )}
                    </>
                  )}
                  <input className="fg-hp" tabIndex={-1} autoComplete="off" value={f.v.website} onChange={f.set("website")} aria-hidden="true" />
                  {msg && (
                    <p className="fg-fail" role="alert">
                      {msg}
                    </p>
                  )}
                </div>
              </div>
              <footer className="fg-foot">
                {step > 0 ? (
                  <button type="button" className="fg-back" onClick={() => goStep(step - 1)}>
                    <FRK_I n="back" s={17} /> Back
                  </button>
                ) : (
                  <span className="fg-foot__note">
                    <FRK_I n="lock" s={13} /> Never shared or sold
                  </span>
                )}
                {step < FRG_STEPS.length - 1 ? (
                  <button key="step-next" type="button" className="fg-next" onClick={next}>
                    Continue <FRK_I n="arrow" s={17} />
                  </button>
                ) : (
                  <button key="step-send" type="submit" className="fg-go" disabled={stage === "sending"}>
                    {stage === "sending" ? (
                      <>
                        <i className="frk-spin" aria-hidden="true" /> {byMail ? "Sending…" : "Preparing your PDF…"}
                      </>
                    ) : (
                      <>
                        <FRK_I n={byMail ? "mail" : "down"} s={18} /> {byMail ? "Email me the PDF" : "Unlock & download"}
                      </>
                    )}
                  </button>
                )}
              </footer>
            </form>
          ) : (
            <div className="fg-main fg-main--msg" ref={mainRef}>
              {stage === "sending" ? (
                <div className="fg-done fg-done--busy" role="status">
                  <span className="fg-done__ic" aria-hidden="true">
                    <i className="frk-spin" />
                  </span>
                  <h2 id={id("h")}>Preparing your PDF…</h2>
                  <p>Printing “{title}” with your name on it.</p>
                </div>
              ) : stage === "quick" ? (
                <div className="fg-quick">
                  <small className="fg-kick">
                    <FRK_I n={icon || "file"} s={13} /> {kind}
                  </small>
                  <h2 id={id("h")}>Welcome back, {saved.first}.</h2>
                  <p>Your details from earlier in this visit are ready — one click for “{title}”.</p>
                  <div className="fg-quick__act">
                    <button type="button" className="fg-go" onClick={quickGo}>
                      <FRK_I n={byMail ? "mail" : "down"} s={18} /> {byMail ? "Email me the PDF" : "Download PDF"}
                    </button>
                    <button type="button" className="fg-link" onClick={() => setStage("form")}>
                      Not {saved.first}? Use different details
                    </button>
                  </div>
                </div>
              ) : (
                <div className={"fg-done" + (stage === "failed" ? " is-fail" : "")} role="status">
                  {stage === "done" && (
                    <span className="fg-burst" aria-hidden="true">
                      {Array.from({ length: 18 }, (_, i) => (
                        <i key={i} style={{ "--i": i }} />
                      ))}
                    </span>
                  )}
                  <span className="fg-done__ic" aria-hidden="true">
                    <FRK_I n={stage === "failed" ? "info" : byMail ? "mail" : "check"} s={32} sw={2.6} />
                  </span>
                  <h2 id={id("h")}>{stage === "failed" ? "Almost there" : byMail ? "Check your inbox" : "Unlocked — your PDF is ready"}</h2>
                  <p>{msg}</p>
                  {stage === "done" && <FRG_Receipt title={title} lead={frkLead() || saved} byMail={byMail} />}
                  <div className="fg-quick__act">
                    {!byMail && (
                      <button type="button" className="fg-go" onClick={() => ((formSend.current = false), setStage("sending"), make(frkLead() || saved))}>
                        <FRK_I n="down" s={18} /> Download again
                      </button>
                    )}
                    <button type="button" className="fg-link" onClick={onClose}>
                      {inline ? "Start a new download" : "Close"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { FRG_Gate };
