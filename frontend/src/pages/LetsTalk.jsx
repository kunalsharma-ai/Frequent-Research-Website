/*
 * Let's Talk (build 52 redesign) — /lets-talk. Prefix LT_. Styles: src/styles/lets-talk.css (lt-).
 * The enquiry form is still the site's multi-step form (EnquiryForm → FM_Enquiry, POST /api/enquiry), unchanged in behaviour;
 * ?type=<key> still pre-selects the enquiry type (quote, feasibility, audience, demo, digital, it, finance, panel).
 * Around it ("conversation studio"): a colour-mesh hero with bouncing headline letters and a live, self-typing chat
 * scene; intent "keys" that press down; a glowing form card; contact orbs; an animated what-happens-next rail.
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useSearchParams } from 'react-router-dom';
import { CONTACT, whatsappUrl } from '../app/data/site.jsx';
import { ENQUIRY_TYPES, EnquiryForm } from '../app/shared/CoreParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { PpL, dmMeta } from '../components/dm/shared.jsx';
import { FRK_I, frkIn, frkReduce } from '../components/site/FrKit.jsx';
import { FRL_Mark } from '../components/site/Logos13.jsx';

const LT_INTENTS = [
  ["quote", "Request a quote", "file", "#1E5BFF", "#22D3EE"],
  ["feasibility", "Research feasibility", "lens", "#0F9D74", "#2EE6A6"],
  ["audience", "Audience feasibility", "users", "#7C4DFF", "#22D3EE"],
  ["digital", "Digital marketing", "spark", "#F0457E", "#FF9F43"],
  ["it", "IT project", "code", "#7C4DFF", "#2EE6A6"],
  ["finance", "Finance & accounts", "coin", "#0F9D74", "#F4C152"],
  ["demo", "Sampledge demo", "grid", "#2F6BFF", "#7B4DFF"],
  ["panel", "Join a research panel", "heart", "#FF6B6B", "#FFB020"],
];
/* the hero chat scene: illustrative example messages (labelled as an example on screen) */
const LT_CHAT = [
  ["me", "Hi! We need feasibility for 200 cardiologists in the UAE and KSA."],
  ["fr", "Happy to help. Three quick questions and we'll send feasibility and a quote."],
  ["me", "Also — can your team run the LinkedIn campaign for the launch?"],
  ["fr", "Yes. Our digital team will join the same call. One partner, four teams."],
];
function LT_Chat() {
  const [n, setN] = ee.useState(frkReduce() ? LT_CHAT.length : 0);
  const [typing, setTyping] = ee.useState(false);
  ee.useEffect(() => {
    if (frkReduce()) return undefined;
    let t;
    const step = (k) => {
      if (k >= LT_CHAT.length) {
        t = setTimeout(() => (setN(0), step(0)), 3400);
        return;
      }
      setTyping(true);
      t = setTimeout(() => {
        setTyping(false);
        setN(k + 1);
        t = setTimeout(() => step(k + 1), 1000);
      }, k === 0 ? 600 : 1400);
    };
    step(0);
    return () => clearTimeout(t);
  }, []);
  const next = LT_CHAT[n];
  return (
    <div className="lt-chat" aria-hidden="true">
      <div className="lt-chat__win">
        <div className="lt-chat__bar">
          <span className="lt-chat__av">
            <FRL_Mark s={34} />
            <i />
          </span>
          <span>
            <b>Frequent Research</b>
            <small>Usually replies within a working day</small>
          </span>
          <em>Example</em>
        </div>
        <div className="lt-chat__body">
          {LT_CHAT.slice(0, n).map(([who, t], k) => (
            <p key={k} className={"lt-msg lt-msg--" + who}>
              {t}
            </p>
          ))}
          {typing && next && (
            <p className={"lt-msg lt-msg--" + next[0] + " lt-msg--typing"}>
              <i />
              <i />
              <i />
            </p>
          )}
        </div>
      </div>
      {[
        ["mail", "#22D3EE", "#1E5BFF"],
        ["whatsapp", "#7CF5A6", "#0E9F4E"],
        ["phone", "#FFD166", "#FF7A3D"],
        ["chat", "#C9A8FF", "#7C4DFF"],
      ].map(([ic, a, b], k) => (
        <span key={ic} className="lt-orb" style={{ "--k": k, "--a": a, "--b": b }}>
          <FRK_I n={ic} s={22} />
        </span>
      ))}
    </div>
  );
}
function LT_Bounce({ text }) {
  return (
    <span className="lt-bounce" aria-hidden="true">
      {[...text].map((ch, i) => (
        <span key={i} style={{ "--i": i }}>
          {ch === " " ? " " : ch}
        </span>
      ))}
    </span>
  );
}
function LT_Page() {
  const [sp, setSp] = useSearchParams();
  const types = ENQUIRY_TYPES;
  const qt = sp.get("type");
  const type = types.some((x) => x.key === qt) ? qt : "general";
  usePageMeta("Let's Talk", "Contact Frequent Research to request a quote, research feasibility, a Sampledge demo or a consultation.");
  dmMeta("/lets-talk", "Let's Talk | Contact Frequent Research", "Contact Frequent Research to request a quote, research or audience feasibility, a Sampledge demo, or a marketing, IT or finance consultation. Reply within one working day.");
  const C = CONTACT;
  const wa = whatsappUrl();
  const [copied, setCopied] = ee.useState("");
  const copy = (t, k) => {
    try {
      navigator.clipboard.writeText(t).then(() => {
        setCopied(k);
        setTimeout(() => setCopied(""), 1600);
      });
    } catch (e) {}
  };
  const pick = (k) => {
    setSp(k === "general" ? {} : { type: k }, { replace: true });
    setTimeout(() => {
      const el = document.getElementById("lt-form");
      if (el) el.scrollIntoView({ behavior: frkReduce() ? "auto" : "smooth", block: "start" });
    }, 40);
  };
  const cur = LT_INTENTS.find((x) => x[0] === type);
  const [ref, v] = frkIn(0.1);
  const [ref2, v2] = frkIn(0.2);
  return (
    <div className="lt" style={cur ? { "--c1": cur[3], "--c2": cur[4] } : undefined}>
      <section ref={ref} className={"lt-hero" + (v ? " is-in" : "")}>
        <div className="lt-hero__mesh" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="container lt-hero__in">
          <div className="lt-hero__copy">
            <nav className="lt-crumb" aria-label="Breadcrumb">
              <PpL to="/">Home</PpL>
              <span aria-hidden="true">/</span>
              <span aria-current="page">Let's Talk</span>
            </nav>
            <HeroH1>
              <span className="frk-sr">Let's talk.</span>
              <LT_Bounce text="Let's talk." />
            </HeroH1>
            <p className="lt-hero__lead">
              Tell us your goal, audience, market or timeline. <b>The right specialist replies within one working day</b> — often with the first questions that sharpen your brief.
            </p>
            <div className="lt-hero__badges">
              <span>
                <FRK_I n="clock" s={15} /> 1 working day reply
              </span>
              <span>
                <FRK_I n="users" s={15} /> 4 specialist teams
              </span>
              <span>
                <FRK_I n="shield" s={15} /> ISO 27001 data security
              </span>
            </div>
          </div>
          <LT_Chat />
        </div>
      </section>

      <section className="lt-keys" aria-labelledby="lt-keys-h">
        <div className="container">
          <h2 id="lt-keys-h">
            What can we help with? <em>Pick one.</em>
          </h2>
          <div className="lt-keys__grid" role="group" aria-label="What would you like to do?">
            {LT_INTENTS.map(([k, t, ic, c1, c2], i) => (
              <button key={k} type="button" className={"lt-key" + (type === k ? " is-on" : "")} style={{ "--c1": c1, "--c2": c2, "--i": i }} onClick={() => pick(k)} aria-pressed={type === k}>
                <span className="lt-key__cap">
                  <span className="lt-key__ic">
                    <FRK_I n={ic} s={22} />
                  </span>
                  <b>{t}</b>
                  <i aria-hidden="true">{type === k ? <FRK_I n="check" s={14} sw={3} /> : <FRK_I n="arrow" s={14} />}</i>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="lt-main">
        <div className="container lt-main__in">
          <div id="lt-form" className="lt-form">
            <div className="lt-form__ring" aria-hidden="true" />
            <div className="lt-form__card" key={type}>
              {EnquiryForm({ type })}
            </div>
          </div>
          <aside className="lt-side">
            <div className="lt-direct">
              <h2>Reach us directly</h2>
              <div className="lt-card lt-card--mail">
                <span className="lt-card__ic">
                  <FRK_I n="mail" s={20} />
                </span>
                <span className="lt-card__t">
                  <small>Email</small>
                  <a href={`mailto:${C.email}`}>{C.email}</a>
                </span>
                <button type="button" onClick={() => copy(C.email, "mail")} aria-label="Copy email address">
                  {copied === "mail" ? <FRK_I n="check" s={16} /> : <FRK_I n="file" s={16} />}
                </button>
              </div>
              <div className="lt-card lt-card--phone">
                <span className="lt-card__ic">
                  <FRK_I n="phone" s={20} />
                </span>
                <span className="lt-card__t">
                  <small>Phone</small>
                  <a href={`tel:${C.phone.replace(/\s/g, "")}`}>{C.phone}</a>
                </span>
                <button type="button" onClick={() => copy(C.phone, "phone")} aria-label="Copy phone number">
                  {copied === "phone" ? <FRK_I n="check" s={16} /> : <FRK_I n="file" s={16} />}
                </button>
              </div>
              <a className="lt-card lt-card--wa" href={wa} target="_blank" rel="noopener noreferrer">
                <span className="lt-card__ic">
                  <FRK_I n="whatsapp" s={20} />
                </span>
                <span className="lt-card__t">
                  <small>WhatsApp support</small>
                  <b>{C.phone}</b>
                </span>
                <FRK_I n="arrow" s={16} />
              </a>
              <button type="button" className="lt-card lt-card--chat" onClick={() => window.dispatchEvent(new CustomEvent("fr-open-chat"))}>
                <span className="lt-card__ic">
                  <FRK_I n="chat" s={20} />
                </span>
                <span className="lt-card__t">
                  <small>Live assistant</small>
                  <b>Ask a question now</b>
                </span>
                <FRK_I n="arrow" s={16} />
              </button>
            </div>
            <a className="lt-map" href={"https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent("Frequent Research Fieldwork Solutions " + C.address)} target="_blank" rel="noopener noreferrer">
              <span className="lt-map__grid" aria-hidden="true">
                {Array.from({ length: 60 }, (_, k) => (
                  <i key={k} style={{ "--k": k }} />
                ))}
                <em className="lt-map__pin">
                  <FRK_I n="map" s={18} />
                </em>
              </span>
              <span className="lt-map__t">
                <small>Office</small>
                <b>{C.address}</b>
                <span>
                  Open in Maps <FRK_I n="arrow" s={13} />
                </span>
              </span>
            </a>
          </aside>
        </div>
      </section>


      <section ref={ref2} className={"lt-next" + (v2 ? " is-in" : "")} aria-labelledby="lt-next-h">
        <div className="container">
          <h2 id="lt-next-h">
            What happens <em>next</em>
          </h2>
          <ol className="lt-next__rail">
            {[
              ["We read your message", "and assign the right specialist for your brief.", "Same day", "mail"],
              ["A specialist replies", "often with the first questions that sharpen the plan.", "Within 1 working day", "chat"],
              ["You get a clear answer", "a proposal, feasibility or quote — no obligation.", "Next step", "check"],
            ].map(([t, d, w, ic], i) => (
              <li key={t} style={{ "--i": i }}>
                <span className="lt-next__n">
                  <FRK_I n={ic} s={20} />
                </span>
                <small>{w}</small>
                <b>{t}</b>
                <p>{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}

export { LT_Page };
