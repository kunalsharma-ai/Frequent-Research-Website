/*
 * Live chat assistant (build 51) — replaces the base chat (lO). Prefix FRC_ / frc. Styles: src/styles/chat-v51.css (fc-).
 *
 * Knowledge: every answer comes from text already published on the website —
 *   1. /data/chat-kb.json — all FAQ questions and answers from every page's FAQPage data (services, blog guides,
 *      ESOMAR 37, portals, products, government research) plus every page's title/description, generated from the
 *      static build by scripts/build_chat_kb.js (npm run release);
 *   2. the base app's own data, read at runtime: each market research / finance service's FAQs (serviceFaqs), vertical FAQs,
 *      government FAQs, and the base assistant's topics (CHAT_ANSWERS: contact, pricing, timelines, careers, downloads…).
 * Answers are matched with a BM25-style ranking + synonyms, shown with the source page so the visitor can read more,
 * plus related questions. If nothing matches well, the assistant offers a specialist and collects full name, email,
 * phone (optional) and country, then posts to the hosting backend's /api/chat/start (unchanged contract, plus
 * `country`), falling back to /api/enquiry. Live agent replies keep arriving through /api/chat/:id/messages.
 *
 * Sound: a short synthesised "pop" when the chat opens (Web Audio, user gesture only, never on page load), with a
 * speaker toggle in the header (localStorage "fr-chat-sound", default on; muted for reduced-motion users).
 * State is kept in localStorage "fr-chat-v2" (last 60 messages, lead progress, live session).
 */
import * as ee from 'react';
import { cmsSetting } from '../../app/cms.jsx';
import { CONTACT, VERTICALS } from '../../app/data/site.jsx';
import { CHAT_ANSWERS, GOV_FAQS } from '../../app/chat/knowledge.jsx';
import { phoneError } from '../../app/data/phoneCountries.jsx';
import { phoneFromText } from '../../app/chat/ChatWidget.jsx';
import { serviceFaqs } from '../../app/data/serviceBits.jsx';
import { PpL } from '../dm/shared.jsx';
import { FRK_Country, FRK_Field, FRK_Flag, FRK_I, FRK_Phone, FRK_V, frkCountry, frkCountryByName, frkLead, frkNorm, frkPhoneCode, frkPost, frkReduce, frkRule, frkSaveLead, frkStore, frkUid, frkUseForm, frkVStyle } from './FrKit.jsx';
import { FRL_Mark } from './Logos13.jsx';
import { DLX_INDEX_URL } from '../../pages/Downloads.jsx';

const FRC_KB_URL = "/data/chat-kb.json";
const FRC_STORE = "fr-chat-v2";
const FRC_SOUND = "fr-chat-sound";
const FRC_STOP = new Set("a an the and or but if of to in on at by for with from about as is are was were be been being do does did can could should would will shall may might must i me my we our us you your yours it its this that these those there here what which who whom whose when where why how am have has had not no yes please tell know want need get give any some more most much many very just also than then so such into over under out up down off again further once all both each few other own same too only s t don now hi hey hello ok okay offer offers offering provide provides providing anything something".split(" "));
const FRC_SYN = {
  much: "cost", price: "cost", pricing: "cost", charges: "cost", charge: "cost", fee: "cost", fees: "cost", quote: "cost", quotation: "cost", budget: "cost", rate: "cost", rates: "cost", expensive: "cost", cheap: "cost", afford: "cost",
  duration: "time", timeline: "time", turnaround: "time", long: "time", fast: "time", quickly: "time", deadline: "time", days: "time", weeks: "time",
  questionnaire: "survey", surveys: "survey", collection: "survey", fieldwork: "survey", poll: "survey", polls: "survey", cawi: "survey", respondents: "respondent", participants: "respondent", sample: "respondent", panelists: "panel", panellist: "panel", panelist: "panel", community: "panel",
  doctor: "hcp", doctors: "hcp", physician: "hcp", physicians: "hcp", nurse: "hcp", nurses: "hcp", medical: "healthcare", pharma: "healthcare", pharmaceutical: "healthcare", patients: "patient", health: "healthcare",
  seo: "seo", ranking: "seo", rankings: "seo", google: "search", ppc: "ads", adwords: "ads", advertising: "ads", advert: "ads", campaign: "campaign", campaigns: "campaign", leads: "lead", instagram: "social", facebook: "social", linkedin: "social",
  app: "application", apps: "application", website: "web", websites: "web", site: "web", software: "software", crm: "crm", erp: "erp", saas: "saas", cloud: "cloud", devops: "cloud", security: "cybersecurity", hacking: "cybersecurity", ai: "ai", chatbot: "ai", automation: "ai",
  gst: "gst", tds: "tds", itr: "tax", taxes: "tax", taxation: "tax", accounting: "accounts", bookkeeping: "accounts", accountant: "accounts", payroll: "payroll", salary: "payroll", cfo: "cfo", audit: "audit", valuation: "valuation",
  iso: "iso", certified: "certification", certificate: "certification", certifications: "certification", esomar: "esomar", gdpr: "privacy", dpdp: "privacy", privacy: "privacy", data: "data",
  join: "join", earn: "rewards", reward: "rewards", money: "rewards", paid: "rewards", gift: "rewards", voucher: "rewards", paypal: "rewards",
  job: "career", jobs: "career", hiring: "career", vacancy: "career", vacancies: "career", internship: "career", cv: "career", resume: "career",
  b2b: "b2b", business: "b2b", executives: "b2b", decision: "b2b", makers: "b2b", consumer: "b2c", consumers: "b2c", b2c: "b2c", shoppers: "b2c",
  brochure: "download", pdf: "download", panelbook: "download", deck: "download", profile: "download",
  sampledge: "sampledge", marketplace: "marketplace", audience: "audience", audiences: "audience",
  countries: "country", markets: "country", global: "country", international: "country", languages: "language", multilingual: "language", translation: "language",
  fraud: "quality", fraudulent: "quality", fraudster: "quality", cheat: "quality", cheating: "quality", speeders: "quality", speeder: "quality", straightliners: "quality", bot: "quality", bots: "quality", fake: "quality", validation: "quality", verified: "quality", duplicate: "quality", deduplication: "quality",
};
const frcStem = (w) => {
  if (w.length > 5 && w.endsWith("ies")) return w.slice(0, -3) + "y";
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && w.endsWith("ed")) return w.slice(0, -2);
  if (w.length > 4 && w.endsWith("es") && !w.endsWith("ses")) return w.slice(0, -2);
  if (w.length > 3 && w.endsWith("s") && !w.endsWith("ss")) return w.slice(0, -1);
  return w;
};
const FRC_ALIAS = [[/\b(u\.?s\.?a\.?|america)\b/gi, "united states"], [/\b(u\.?k\.?|britain|england)\b/gi, "united kingdom"], [/\b(u\.?a\.?e\.?|dubai|abu dhabi)\b/gi, "united arab emirates"], [/\bksa\b/gi, "saudi arabia"], [/\bhk\b/gi, "hong kong"]];
const frcTok = (s) =>
  frkNorm(FRC_ALIAS.reduce((x, [re, to]) => x.replace(re, to), s || ""))
    .replace(/[^a-z0-9 ]+/g, " ")
    .split(/\s+/)
    .filter((w) => w && !FRC_STOP.has(w) && (w.length > 1 || /\d/.test(w)))
    .map((w) => FRC_SYN[w] || FRC_SYN[frcStem(w)] || frcStem(w));

/* ── index ────────────────────────────────────────────────────────────────────────────── */
let frcKB = null;
let frcLoading = null;
function frcRuntimeDocs() {
  const docs = [];
  try {
    VERTICALS.forEach((v) => {
      (v.faqs || []).forEach((f) => docs.push({ q: f.q, a: f.a, u: `/services/${v.slug}`, t: v.name, k: "vertical", v: v.slug }));
      (v.services || []).forEach((s) => {
        docs.push({ q: `What is ${s.name}?`, a: `${s.name}: ${s.summary}${s.includes && s.includes.length ? " It typically includes " + s.includes.join(", ").toLowerCase() + "." : ""}`, u: `/services/${v.slug}/${s.slug}`, t: s.name, k: "service", v: v.slug, w: 1.05 });
        if ((v.slug === "market-research" || v.slug === "accounts-finance")) {
          try {
            serviceFaqs(v, s)
              .slice(0, 5)
              .forEach((f) => docs.push({ q: f.q, a: f.a, u: `/services/${v.slug}/${s.slug}`, t: s.name, k: "service", v: v.slug }));
          } catch (e) {}
        }
      });
    });
    GOV_FAQS.forEach((f) => docs.push({ q: f.q, a: f.a, u: "/government-opinion-research", t: "Government & opinion research", k: "page" }));
    CHAT_ANSWERS.forEach((e) => {
      if (/^(greeting|thanks)$/.test(e.id) || /^(f-|g-|s-|v-)/.test(e.id)) return;
      const l = (e.links || [])[0];
      docs.push({ q: e.keys.slice(0, 6).join(" · "), a: e.answer, u: l && l.to ? l.to.split("?")[0] : "", t: l ? l.label : "", k: "topic", w: 0.9, links: e.links });
    });
  } catch (e) {}
  /* site-wide topics added in build 51 (each one restates content published on the linked page) */
  docs.push(
    { q: "Can I download a case study? How do I get the case study PDF?", a: "Yes. Every case study on the Industries & Case Studies pages has a Download PDF button. Share a few details and a watermarked PDF downloads straight away.", u: "/industries-case-studies", t: "Industries & Case Studies", k: "topic", w: 1.1 },
    { q: "Where can I get the B2B or consumer panel book for a country?", a: "The Downloads page has a panel book for every country we profile — a business (B2B) edition and a consumer (B2C) edition — plus brochures for each of our four services. Choose a country, share a few details and the PDF downloads instantly.", u: "/downloads", t: "Downloads", k: "topic", w: 1.1 },
    { q: "Do you have a brochure for each service?", a: "Yes. There are separate brochures for Market Research, Digital Marketing, IT & Development and Finance & Accounts on the Downloads page.", u: "/downloads", t: "Downloads", k: "topic", w: 1.1 },
    { q: "How can I leave a review or rate Frequent Research?", a: "Use the “Rate & Review” tab on the right edge of any page. Pick the service you worked with, add a star rating and a few words; your review then appears in our Client Testimonials.", u: "/", t: "Client testimonials", k: "topic", w: 1.1 },
    { q: "What is the history of Frequent Research? When was it founded?", a: "Market Research and Digital Marketing started in 2015. Frequent Research Fieldwork Solutions Private Limited was formally established on 26 September 2017, when Turn2Opinion and MyFrequentRewards were launched; MyHealthOpinions followed in 2018. Sampledge and our IT & Development services launched in 2020, Accounts & Finance services in 2022, and SampAudience and the other Sampledge products in 2023.", u: "/our-journey", t: "Our Journey", k: "topic", w: 1.1 },
    { q: "What is the ESOMAR 37 questionnaire?", a: "ESOMAR 37 is a standard set of 37 questions buyers ask online sample providers about their panels, sourcing, quality checks and data protection. Our full answers are published on the ESOMAR 37 page.", u: "/esomar-37", t: "ESOMAR 37", k: "topic", w: 1.1 },
    { q: "How much does Sampledge cost? Where can I see Sampledge pricing?", a: "Sampledge plans and prices are published on the Sampledge website at www.sampledge.com/pricing. Our Products page introduces the seven Sampledge products: SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax and SampCrew.", u: "/products", t: "Products", k: "topic", w: 1.1 }
  );
  return docs;
}
function frcPanelDocs(ix) {
  const docs = [];
  const fmt = (n) => (n || 0).toLocaleString("en-IN");
  (ix.b2c || []).forEach((c) => docs.push({ q: `Do you have a consumer (B2C) panel in ${c.name}? How many consumers in ${c.name}?`, a: `Yes. Our ${c.name} consumer panel profiles ${fmt(c.panel)} people, as published in the ${c.name} consumer panel book — with demographics, income, lifestyle, technology and category profiles. You can download the ${c.name} consumer panel book from the Downloads page.`, u: `/downloads?panel=b2c&country=${c.slug}`, t: `${c.name} consumer panel book`, k: "panel", w: 1.05 }));
  (ix.b2b || []).forEach((c) => docs.push({ q: `Do you have a business (B2B) panel in ${c.name}? How many professionals or decision makers in ${c.name}?`, a: `Yes. Our ${c.name} business panel profiles ${fmt(c.panel)} professionals, as published in the ${c.name} B2B panel book — with company size, revenue and${c.sectors ? " sector-level role profiles" : " gender profiles"}. You can download the ${c.name} B2B panel book from the Downloads page.`, u: `/downloads?panel=b2b&country=${c.slug}`, t: `${c.name} B2B panel book`, k: "panel", w: 1.05 }));
  return docs;
}
function frcBuild(kb) {
  const docs = [];
  frcPanelDocs(kb.panels || {}).forEach((d) => docs.push({ ...d, src: "rt" }));
  (kb.faqs || []).forEach((f) => docs.push({ ...f, src: "faq" }));
  frcRuntimeDocs().forEach((d) => docs.push({ ...d, src: d.src || "rt" }));
  (kb.pages || []).forEach((p) => docs.push({ q: p.t, a: p.d, u: p.u, t: p.t, k: p.k, src: "page", w: 0.72 }));
  const df = new Map();
  let total = 0;
  docs.forEach((d, i) => {
    d.i = i;
    const tq = frcTok(d.q),
      tt = frcTok(d.t || ""),
      ta = frcTok(d.a || "").slice(0, 120);
    const tf = new Map();
    const add = (arr, w) => arr.forEach((x) => tf.set(x, (tf.get(x) || 0) + w));
    add(tq, 3);
    add(tt, 1.2);
    add(ta, 1);
    d.tf = tf;
    d.len = tq.length * 3 + tt.length * 1.2 + ta.length;
    d.nq = " " + tq.join(" ") + " ";
    d.qs = new Set(tq);
    total += d.len;
    new Set([...tq, ...tt, ...ta]).forEach((x) => df.set(x, (df.get(x) || 0) + 1));
  });
  const N = docs.length || 1;
  const avg = total / N;
  const idf = (x) => Math.log(1 + (N - (df.get(x) || 0) + 0.5) / ((df.get(x) || 0) + 0.5));
  return { docs, idf, avg, N };
}
if (typeof window !== "undefined") window.__frcDebug = (q) => (frcKB ? frcSearch(q, "/", 6).map((r) => [r.d.q.slice(0, 90), +r.s.toFixed(2), +r.cover.toFixed(2), +r.qcover.toFixed(2), r.d.k]) : "kb not loaded");
function frcLoad() {
  if (frcKB) return Promise.resolve(frcKB);
  if (frcLoading) return frcLoading;
  const get = (u, d) =>
    fetch(u, { headers: { Accept: "application/json" } })
      .then((r) => (r.ok && (r.headers.get("content-type") || "").includes("json") ? r.json() : d))
      .catch(() => d);
  frcLoading = Promise.all([get(FRC_KB_URL, { faqs: [], pages: [] }), get(DLX_INDEX_URL, {})]).then(([kb, panels]) => (frcKB = frcBuild({ ...kb, panels })));
  return frcLoading;
}
function frcSearch(query, here, limit = 5) {
  const ix = frcKB;
  if (!ix) return [];
  const qt = [...new Set(frcTok(query))];
  if (!qt.length) return [];
  const nq = " " + qt.join(" ") + " ";
  const k1 = 1.4,
    b = 0.6;
  const res = [];
  for (const d of ix.docs) {
    let s = 0,
      hit = 0;
    for (const x of qt) {
      const f = d.tf.get(x);
      if (!f) continue;
      hit++;
      s += ix.idf(x) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * d.len) / ix.avg)));
    }
    if (!hit) continue;
    const cover = hit / qt.length;
    let qh = 0;
    for (const x of qt) if (d.qs.has(x)) qh++;
    const qcover = qh / qt.length;
    const spec = d.qs.size ? qh / d.qs.size : 0;
    s *= (0.45 + cover * 0.6) * (0.55 + qcover * 0.9) * (0.75 + spec * 0.4);
    if (d.nq === nq) s *= 1.8;
    else if (d.nq.includes(nq)) s *= 1.3;
    s *= d.w || 1;
    if (here && d.u && here === d.u) s *= 1.25;
    else if (here && d.v && here.includes("/services/" + d.v)) s *= 1.08;
    if (d.k === "blog") s *= 0.9;
    res.push({ d, s, hit, cover, qcover });
  }
  res.sort((a, b2) => b2.s - a.s);
  /* one result per question text */
  const out = [],
    seen = new Set();
  for (const r of res) {
    const key = r.d.q.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(r);
    if (out.length >= limit) break;
  }
  return out;
}
const frcConfident = (r, q) => {
  if (!r) return false;
  const n = frcTok(q).length;
  if (n <= 2 && r.cover === 1 && r.s >= 5) return true;
  if (r.qcover < 0.5) return false;
  if (r.s >= 9 && r.cover >= 0.5) return true;
  return r.s >= 7 && r.cover >= 0.66;
};
const frcTrim = (s, max = 620) => {
  if (s.length <= max) return [s, false];
  const cut = s.slice(0, max);
  const at = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("? "), cut.lastIndexOf("! "));
  return [(at > 200 ? cut.slice(0, at + 1) : cut.replace(/\s+\S*$/, "") + "…"), true];
};

/* ── sound ────────────────────────────────────────────────────────────────────────────── */
let frcCtx = null;
const frcSoundOn = () => {
  try {
    return localStorage.getItem(FRC_SOUND) !== "off";
  } catch (e) {
    return true;
  }
};
function frcPop(kind = "open") {
  if (!frcSoundOn() || frkReduce()) return;
  try {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return;
    frcCtx = frcCtx || new AC();
    if (frcCtx.state === "suspended") frcCtx.resume();
    const t0 = frcCtx.currentTime;
    const notes = kind === "msg" ? [[880, 0, 0.05]] : [[620, 0, 0.1], [930, 0.085, 0.075], [1240, 0.16, 0.05]];
    notes.forEach(([f, dt, vol]) => {
      const o = frcCtx.createOscillator(),
        g = frcCtx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(f, t0 + dt);
      o.frequency.exponentialRampToValueAtTime(f * 1.45, t0 + dt + 0.07);
      g.gain.setValueAtTime(0.0001, t0 + dt);
      g.gain.exponentialRampToValueAtTime(vol, t0 + dt + 0.012);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + dt + 0.18);
      o.connect(g).connect(frcCtx.destination);
      o.start(t0 + dt);
      o.stop(t0 + dt + 0.22);
    });
  } catch (e) {}
}

/* ── UI ───────────────────────────────────────────────────────────────────────────────── */
const FRC_TOPICS = [
  { v: "market-research", t: "Market research", q: "What market research services do you offer?" },
  { v: "digital-marketing", t: "Digital marketing", q: "What digital marketing services do you offer?" },
  { v: "it-development", t: "IT & development", q: "What IT and software development services do you offer?" },
  { v: "accounts-finance", t: "Finance & accounts", q: "What accounts and finance services do you offer?" },
];
const FRC_POPULAR = ["How much does a project cost?", "How long does an online survey take?", "Can I join your research panel?", "Are you ISO certified?", "Do you work with doctors and HCPs?", "Where can I download a panel book?"];
const FRC_HELLO = { from: "bot", kind: "hello", text: cmsSetting("chat.greeting", "Hi there! I'm the Frequent Research assistant. Ask me anything about our services, panels, pricing, timelines or quality — every answer comes from our website, with the page to read more.") };
const frcLoadState = () => {
  const s = frkStore.get(FRC_STORE, null);
  return s && Array.isArray(s.msgs) ? s : null;
};
const frcNow = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

function FRC_Bubble({ m, onAsk, onLink }) {
  if (m.from === "visitor")
    return (
      <div className="fc-msg fc-msg--me">
        <p>{m.text}</p>
        {m.at && <time>{m.at}</time>}
      </div>
    );
  const agent = m.from === "agent";
  return (
    <div className={"fc-msg fc-msg--bot" + (agent ? " fc-msg--agent" : "") + (m.kind === "hello" ? " fc-msg--hello" : "")}>
      <span className="fc-msg__av" aria-hidden="true">
        {agent ? <FRK_I n="user" s={16} /> : <FRL_Mark s={40} />}
      </span>
      <div className="fc-msg__body">
        {agent && <b className="fc-msg__who">Specialist</b>}
        <p>{m.text}</p>
        {m.src && (
          <PpL className="fc-src" to={m.src.u} onClick={onLink}>
            <span className="fc-src__ic" aria-hidden="true">
              <FRK_I n="file" s={16} />
            </span>
            <span className="fc-src__t">
              <small>{m.more ? "Read the full answer on" : "Source"}</small>
              <b>{m.src.t || "Frequent Research"}</b>
            </span>
            <FRK_I n="arrow" s={16} />
          </PpL>
        )}
        {m.links && m.links.length > 0 && (
          <span className="fc-links">
            {m.links.map((l, i) =>
              l.to ? (
                <PpL key={i} to={l.to} onClick={onLink}>
                  {l.label} →
                </PpL>
              ) : (
                <a key={i} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label} ↗
                </a>
              )
            )}
          </span>
        )}
        {m.related && m.related.length > 0 && (
          <div className="fc-rel">
            <small>Related questions</small>
            {m.related.map((q) => (
              <button key={q} type="button" onClick={() => onAsk(q)}>
                {q}
              </button>
            ))}
          </div>
        )}
        {m.chips && m.chips.length > 0 && (
          <div className="fc-chips">
            {m.chips.map((c) => (
              <button key={c.label || c} type="button" onClick={() => onAsk(c.value || c.label || c, c.label || c)}>
                {c.iso && <FRK_Flag iso={c.iso} />}
                {c.label || c}
              </button>
            ))}
          </div>
        )}
        {m.at && <time>{m.at}</time>}
      </div>
    </div>
  );
}

/* build 57: the "talk to a specialist" card shown inside the chat */
function FRC_LeadForm({ question, onSubmit, onCancel }) {
  const saved = frkLead() || {};
  const f = frkUseForm(
    { name: [saved.first, saved.last].filter(Boolean).join(" "), email: saved.email || "", country: saved.country || "", phone: saved.phone || { country: saved.country || "IN", number: "", otherCode: "" }, message: question || "" },
    {
      name: (x) => {
        const t = (x || "").trim();
        if (!t) return "Enter your full name.";
        return /^[\p{L}][\p{L} .'’-]{1,79}$/u.test(t) ? "" : "Use letters only (spaces, dots, apostrophes and hyphens are fine).";
      },
      email: (x) => frkRule.email(x),
      country: (x) => frkRule.country(x),
      phone: (x) => frkRule.phone(x, false),
      message: (x) => ((x || "").length > 600 ? "Keep this under 600 characters." : ""),
    }
  );
  const uid = ee.useMemo(() => frkUid("fcl"), []);
  const id = (k) => uid + "-" + k;
  const A = (k) => ({ "aria-invalid": !!f.show(k) || undefined, "aria-describedby": f.show(k) ? id(k) + "-err" : undefined, onBlur: f.blur(k) });
  const go = (e) => {
    e.preventDefault();
    const bad = f.check();
    if (bad.length) {
      const el = document.getElementById(id(bad[0]));
      if (el) el.focus();
      return;
    }
    const c = frkCountry(f.v.country) || {};
    const ph = f.v.phone || {};
    onSubmit({ name: f.v.name.trim(), email: f.v.email.trim(), country: f.v.country, countryName: c.name || "", phone: (ph.number || "").trim(), countryCode: (ph.number || "").trim() ? frkPhoneCode(ph) : "", phoneIso: ph.country || "", message: f.v.message.trim() });
  };
  return (
    <form className="fc-lead" onSubmit={go} noValidate>
      <div className="fc-lead__head">
        <span className="fc-lead__ic" aria-hidden="true">
          <FRK_I n="user" s={18} />
        </span>
        <span>
          <b>Talk to a specialist</b>
          <small>Reply by email · usually within one working day</small>
        </span>
      </div>
      <FRK_Field id={id("name")} label="Full name" req error={f.show("name")} icon="user" ok={f.ok("name")}>
        <input id={id("name")} type="text" autoComplete="name" value={f.v.name} onChange={f.set("name")} maxLength={80} {...A("name")} />
      </FRK_Field>
      <FRK_Field id={id("email")} label="Email ID" req error={f.show("email")} icon="mail" ok={f.ok("email")}>
        <input id={id("email")} type="email" inputMode="email" autoComplete="email" value={f.v.email} onChange={f.set("email")} maxLength={160} {...A("email")} />
      </FRK_Field>
      <FRK_Field id={id("country")} label="Country" req error={f.show("country")} ok={f.ok("country")}>
        <FRK_Country id={id("country")} value={f.v.country} onChange={(iso) => f.setV((o) => ({ ...o, country: iso, phone: o.phone.number ? o.phone : { ...o.phone, country: iso } }))} onBlur={f.blur("country")} invalid={!!f.show("country")} describedBy={f.show("country") ? id("country") + "-err" : undefined} />
      </FRK_Field>
      <FRK_Field id={id("phone")} label="Phone / WhatsApp" error={f.show("phone")}>
        <FRK_Phone id={id("phone")} value={f.v.phone} onChange={(p) => f.setV((o) => ({ ...o, phone: p }))} onBlur={f.blur("phone")} error={f.show("phone")} />
      </FRK_Field>
      <FRK_Field id={id("message")} label="Your question" error={f.show("message")}>
        <textarea id={id("message")} rows="3" value={f.v.message} onChange={f.set("message")} maxLength={600} placeholder="Goal, audience, markets or timeline…" {...A("message")} />
      </FRK_Field>
      <div className="fc-lead__act">
        <button type="button" className="fc-lead__no" onClick={onCancel}>
          Not now
        </button>
        <button type="submit" className="fc-lead__go">
          <FRK_I n="send" s={16} /> Send to a specialist
        </button>
      </div>
    </form>
  );
}

function FR_Chat() {
  const saved = frcLoadState();
  const [open, setOpen] = ee.useState(false);
  /* build 52: lets the floating WhatsApp button step aside while the chat panel is open */
  ee.useEffect(() => {
    document.documentElement.classList.toggle("fc-is-open", open);
  }, [open]);
  const [msgs, setMsgs] = ee.useState((saved && saved.msgs) || [FRC_HELLO]);
  const [lead, setLead] = ee.useState((saved && saved.lead) || { step: null });
  const [session, setSession] = ee.useState((saved && saved.session) || null);
  const [text, setText] = ee.useState("");
  const [typing, setTyping] = ee.useState(false);
  const [unread, setUnread] = ee.useState(0);
  const [sound, setSound] = ee.useState(frcSoundOn());
  const [ready, setReady] = ee.useState(!!frcKB);
  const [sug, setSug] = ee.useState([]);
  const [teaser, setTeaser] = ee.useState(false);
  const [route, setRoute] = ee.useState(typeof location !== "undefined" ? location.pathname + location.hash : "");
  const body = ee.useRef(null),
    inp = ee.useRef(null),
    launch = ee.useRef(null);
  const here = (/#(\/[^?]*)/.exec(route) || [])[1] || (typeof location !== "undefined" ? location.pathname : "/");

  ee.useEffect(() => {
    frkStore.set(FRC_STORE, { msgs: msgs.slice(-60), lead, session });
  }, [msgs, lead, session]);
  ee.useEffect(() => {
    const el = body.current;
    if (el) el.scrollTo({ top: msgs.length <= 1 && !typing ? 0 : el.scrollHeight, behavior: frkReduce() ? "auto" : "smooth" });
  }, [msgs, typing, open]);
  ee.useEffect(() => {
    const r = () => setRoute(location.pathname + location.hash);
    window.addEventListener("hashchange", r);
    window.addEventListener("popstate", r);
    return () => (window.removeEventListener("hashchange", r), window.removeEventListener("popstate", r));
  }, []);
  /* open from anywhere: the base dispatches "fr-open-chat" (CTA buttons) */
  ee.useEffect(() => {
    const o = () => doOpen(true);
    const esc = (e) => e.key === "Escape" && open && !document.querySelector(".cc-pop") && setOpen(false);
    window.addEventListener("fr-open-chat", o);
    window.addEventListener("keydown", esc);
    return () => (window.removeEventListener("fr-open-chat", o), window.removeEventListener("keydown", esc));
  });
  /* proactive teaser (visual only — no sound before the visitor interacts) */
  ee.useEffect(() => {
    /* update 18 (Kunal: "design overlapping a lot"): the greeting no longer pops up over the page by itself */
    return undefined;
    let seen = null;
    try {
      seen = sessionStorage.getItem("fr-chat-teased");
    } catch (e) {}
    if (seen || (saved && saved.msgs && saved.msgs.length > 1)) return;
    const t = setTimeout(() => {
      if (!document.querySelector(".rv-ov")) setTeaser(true);
      try {
        sessionStorage.setItem("fr-chat-teased", "1");
      } catch (e) {}
    }, 12000);
    const t2 = setTimeout(() => setTeaser(false), 32000);
    return () => (clearTimeout(t), clearTimeout(t2));
  }, []);
  /* live agent replies */
  ee.useEffect(() => {
    if (!session || session.id === "dev") return;
    let stop = false;
    const id = setInterval(
      async () => {
        try {
          const r = await fetch(`/api/v1/chat/${session.id}/messages?token=${encodeURIComponent(session.token)}&since=${session.since}`);
          const j = await r.json();
          if (stop || !j.ok || !j.messages.length) return;
          const ag = j.messages.filter((x) => x.from === "agent");
          setSession((s) => ({ ...s, since: Math.max(...j.messages.map((x) => x.i)) + 1 }));
          if (ag.length) {
            setMsgs((m) => [...m, ...ag.map((x) => ({ from: "agent", text: x.text, at: frcNow() }))]);
            frcPop("msg");
            if (!open) setUnread((u) => u + ag.length);
          }
        } catch (e) {}
      },
      open ? 5000 : 20000
    );
    return () => ((stop = true), clearInterval(id));
  }, [session && session.id, session && session.since, open]);

  const doOpen = (v) => {
    const nv = v === undefined ? !open : v;
    if (nv && !open) {
      frcPop("open");
      setUnread(0);
      setTeaser(false);
      frcLoad().then(() => setReady(true));
      setTimeout(() => inp.current && inp.current.focus({ preventScroll: true }), 120);
    }
    setOpen(nv);
    if (!nv && launch.current) setTimeout(() => launch.current && launch.current.focus(), 0);
  };
  const add = (m) => setMsgs((x) => [...x.map((y) => (y.chips ? { ...y, chips: null } : y)), { at: frcNow(), ...m }]);
  const say = (m, delay = 520) =>
    new Promise((res) => {
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        add({ from: "bot", ...m });
        res();
      }, frkReduce() ? 0 : delay);
    });

  /* page-aware starting questions */
  const pageQs = ee.useMemo(() => {
    if (!ready || !frcKB) return [];
    return frcKB.docs.filter((d) => d.src === "faq" && d.u === here).slice(0, 3).map((d) => d.q);
  }, [ready, here]);

  const COUNTRY_CHIPS = ["IN", "US", "GB", "AE", "SA", "SG", "AU", "CA", "DE"].map((iso) => {
    const c = frkCountry(iso);
    return c ? { label: c.name, value: c.name, iso } : null;
  }).filter(Boolean);
  const startLead = async (q) => {
    /* build 57: one tidy card (name, email, country with flag, phone with flag + code, message) instead of five
       separate questions; the typed question-by-question flow is no longer started */
    await say({ text: "Let me connect you with a specialist — fill in this short card and we'll reply by email, usually within one working day." });
    setLead({ step: "form", question: q || "" });
  };
  const sendLead = async (L0) => {
    const L = { ...L0, step: "sending" };
    const message = L.message || "";
    setLead(L);
    setTyping(true);
    const transcript = msgs.filter((m) => !m.kind).slice(-20).map((m) => ({ from: m.from, text: m.text }));
    const payload = { name: L.name, email: L.email, countryCode: L.countryCode || "", phone: L.phone || "", country: L.countryName, interest: L.interest || "", message: message || "(no message)", transcript, page: location.href };
    add({ from: "visitor", text: `${L.name} · ${L.email}${L.countryName ? " · " + L.countryName : ""}${message ? "\n" + message : ""}` });
    let r = await frkPost("/api/v1/chat/start", payload);
    if (r.preview) r = await frkPost("/api/v1/enquiry", { type: "Chat enquiry", ...payload, service: "Chat — specialist request", consent: true, website: "" });
    setTyping(false);
    const first = L.name.split(" ")[0];
    if (r.ok) {
      const last = r.j.messages && r.j.messages[r.j.messages.length - 1];
      if (r.j.id && r.j.token) setSession({ id: r.j.id, token: r.j.token, since: (r.j.messages || []).length });
      setLead((l) => ({ ...l, step: "done" }));
      frkSaveLead({ first, last: L.name.split(" ").slice(1).join(" "), email: L.email, country: L.country, phone: { country: L.phoneIso || L.country, number: L.phone || "", otherCode: "" } });
      return add({ from: "bot", text: (last && last.text) || `Thanks, ${first}! A specialist will reply to ${L.email} within one working day.` });
    }
    if (r.preview) {
      setLead((l) => ({ ...l, step: "done" }));
      return add({ from: "bot", text: `Thanks, ${first}! Your details are noted. (Preview: on the live website this goes straight to our team.) You can also email ${CONTACT.email}.` });
    }
    setLead((l) => ({ ...l, ...L0, step: "form" }));
    return add({ from: "bot", text: "Sorry, I couldn't reach our team just now. Please try again, or use email / WhatsApp.", links: [{ label: "Email us", href: "mailto:info@frequentresearch.com" }, { label: "WhatsApp", href: "https://wa.me/918178200573" }] });
  };
  const leadStep = async (t) => {
    const v = t.trim();
    const isQ = /\?\s*$/.test(v) || /^(what|how|why|when|where|who|which|do|does|can|could|is|are|will|would|should)\b/i.test(v);
    if (isQ && ["name", "phone", "country"].includes(lead.step) && !(lead.step === "email" && v.includes("@"))) {
      await answer(v, true);
      return say({ text: { name: "Now, may I have your full name so a specialist can follow up?", phone: "And your phone number with country code — or type Skip.", country: "And which country are you in?" }[lead.step] }, 900);
    }
    if (/^(no|nope|cancel|skip this|not now|no thanks|later|stop)\b/i.test(v) && lead.step !== "phone" && !(lead.step === "message" && /^no,? send it$/i.test(v))) {
      setLead({ step: null });
      return say({ text: "No problem. Ask me anything else — or tap “Talk to a specialist” whenever you're ready.", chips: FRC_POPULAR.slice(0, 3) });
    }
    if (lead.step === "name") {
      if (!/^[\p{L}][\p{L} .'’-]{1,59}$/u.test(v) || v.split(/\s+/).length > 5) return say({ text: "Sorry, I didn't catch that. Could you type just your full name? For example: Asha Rao" });
      setLead((l) => ({ ...l, name: v, step: "email" }));
      return say({ text: `Nice to meet you, ${v.split(" ")[0]}! What's your email address? We'll reply there.` });
    }
    if (lead.step === "email") {
      const e = frkRule.email(v);
      if (e) return say({ text: e + " For example: name@company.com" });
      setLead((l) => ({ ...l, email: v, step: "phone" }));
      return say({ text: "Thanks! Your phone or WhatsApp number with country code, if you'd like a call — for example +91 98765 43210. You can skip this.", chips: [{ label: "Skip" }] });
    }
    if (lead.step === "phone") {
      if (/^skip\b/i.test(v) || /^(no|none|n\/a)$/i.test(v)) {
        setLead((l) => ({ ...l, phone: "", countryCode: "", step: "country" }));
        return say({ text: "No problem. Which country are you in?", chips: COUNTRY_CHIPS });
      }
      const p = phoneFromText(v);
      const bad = p ? phoneError(p.iso, p.num, p.code) : "Please include your country code, for example +44 7700 900123 — or type Skip.";
      if (bad) return say({ text: bad, chips: [{ label: "Skip" }] });
      const c = frkCountry(p.iso);
      setLead((l) => ({ ...l, phone: p.num, countryCode: p.code, phoneIso: p.iso, step: "country" }));
      return say({ text: `Got it. And which country are you in?${c && !c.other ? " Is it " + c.name + "?" : ""}`, chips: c && !c.other ? [{ label: c.name, value: c.name, iso: c.iso }, ...COUNTRY_CHIPS.filter((x) => x.iso !== c.iso).slice(0, 5)] : COUNTRY_CHIPS });
    }
    if (lead.step === "country") {
      const c = frkCountryByName(v.replace(/^(yes|yeah|yep)[, ]*/i, "")) || (/^(yes|yeah|yep)\b/i.test(v) && lead.phoneIso ? frkCountry(lead.phoneIso) : null);
      if (!c || c.other) return say({ text: "I couldn't find that country. Please type its name, for example India or United Kingdom.", chips: COUNTRY_CHIPS });
      setLead((l) => ({ ...l, country: c.iso, countryName: c.name, step: "message" }));
      return say({ text: lead.question ? `Thanks! I'll pass on your question: “${lead.question}”. Anything to add — goal, audience, markets or timeline?` : "Thanks! Briefly, what do you need — your goal, audience, markets or timeline?", chips: lead.question ? [{ label: "No, send it" }] : null });
    }
    if (lead.step === "message") {
      const message = /^no,? send it$/i.test(v) ? lead.question || "" : [lead.question, v].filter(Boolean).join("\n\n");
      const L = { ...lead, message, step: "sending" };
      setLead(L);
      setTyping(true);
      const transcript = msgs.filter((m) => !m.kind).slice(-20).map((m) => ({ from: m.from, text: m.text }));
      const payload = { name: L.name, email: L.email, countryCode: L.countryCode || "", phone: L.phone || "", country: L.countryName, interest: L.interest || "", message: message || "(no message)", transcript, page: location.href };
      let r = await frkPost("/api/v1/chat/start", payload);
      if (r.preview) r = await frkPost("/api/v1/enquiry", { type: "Chat enquiry", ...payload, service: "Chat — specialist request", consent: true, website: "" });
      setTyping(false);
      if (r.ok) {
        const last = r.j.messages && r.j.messages[r.j.messages.length - 1];
        if (r.j.id && r.j.token) setSession({ id: r.j.id, token: r.j.token, since: (r.j.messages || []).length });
        setLead((l) => ({ ...l, step: "done" }));
        frkSaveLead({ first: L.name.split(" ")[0], last: L.name.split(" ").slice(1).join(" "), email: L.email, country: L.country, phone: { country: L.phoneIso || L.country, number: L.phone || "", otherCode: "" } });
        return add({ from: "bot", text: (last && last.text) || `Thanks, ${L.name.split(" ")[0]}! A specialist will reply to ${L.email} within one working day.` });
      }
      setLead((l) => ({ ...l, step: "message" }));
      if (r.preview) {
        setLead((l) => ({ ...l, step: "done" }));
        return add({ from: "bot", text: `Thanks, ${L.name.split(" ")[0]}! Your details are noted. (Preview: on the live website this goes straight to our team.) You can also email ${CONTACT.email}.` });
      }
      return add({ from: "bot", text: "Sorry, I couldn't reach our team just now. Please try again, or use email / WhatsApp.", links: [{ label: "Email us", href: "mailto:info@frequentresearch.com" }, { label: "WhatsApp", href: "https://wa.me/918178200573" }] });
    }
  };

  const answer = async (q, inLead) => {
    await frcLoad();
    setReady(true);
    if (/^(hi|hello|hey|hii+|good (morning|afternoon|evening)|namaste|hola)\b[!. ]*$/i.test(q.trim())) return say({ text: "Hello! What would you like to know? You can ask in your own words — for example “How much does an online survey cost?”", chips: FRC_POPULAR.slice(0, 4) });
    if (/^(thanks|thank you|thx|great|perfect|awesome|ok thanks|cool)\b/i.test(q.trim())) return say({ text: "You're welcome! Anything else I can help with?", chips: [{ label: "Talk to a specialist" }] });
    if (/^(bye|goodbye|see you)\b/i.test(q.trim())) return say({ text: "Thanks for stopping by — have a great day!" });
    if (/(talk|speak|connect|chat).{0,20}(human|person|specialist|agent|someone|team|expert)|call me|contact me|^talk to a specialist$/i.test(q)) return startLead(q === "Talk to a specialist" ? "" : q);
    if (!inLead && /(get|need|want|request|send|share)\b.{0,25}\b(quote|quotation|proposal|estimate|pricing)/i.test(q)) {
      await say({ text: "Happy to help with a quote. Pricing depends on scope — for research, the audience, sample size and markets; for marketing, channels and goals; for technology, features and integrations; for finance, volumes and services. A specialist will send a clear quote, usually within one working day, and the first consultation is free.", src: { u: "/lets-talk", t: "Request a quote" } });
      return startLead(q);
    }
    const res = frcSearch(q, here, 6);
    const top = res[0];
    if (frcConfident(top, q)) {
      const d = top.d;
      const [txt, more] = frcTrim(d.a || d.t);
      const related = res
        .slice(1)
        .filter((r) => r.d.src !== "page" && r.s > top.s * 0.35 && r.d.q.length < 110 && !/·/.test(r.d.q))
        .slice(0, 3)
        .map((r) => r.d.q);
      const src = d.u ? { u: d.u, t: d.src === "page" ? d.t : d.t || "Frequent Research" } : null;
      return say({ text: d.src === "page" ? `This page covers it: ${d.t}. ${d.a || ""}` : txt, src, more, links: d.src === "rt" && d.links && d.links.length > 1 ? d.links.slice(1, 3) : null, related }, 480 + Math.min(900, txt.length * 1.2));
    }
    /* then the hosting backend's own answerer (if it has one), before offering a specialist */
    const srv = await frkPost("/api/v1/chat/ask", { message: q, history: msgs.slice(-8).map((m) => ({ from: m.from, text: m.text })) });
    if (srv.ok && srv.j.matched && srv.j.reply) return say({ text: srv.j.reply, links: srv.j.links });
    if (top && top.s > 3.5) {
      await say({ text: "I'm not completely sure, but these pages look closest to your question:", links: res.slice(0, 3).filter((r) => r.d.u).map((r) => ({ label: r.d.t || r.d.q, to: r.d.u })) });
    }
    if (inLead) return say({ text: "I don't have a published answer for that one — the specialist will cover it." });
    if (!session && (!lead.step || lead.step === "done")) return startLead(q);
    return say({ text: "Our specialist will pick this up — you'll get a reply by email." });
  };

  const send = async (raw, shown) => {
    const t = (raw == null ? text : raw).trim();
    if (!t) return;
    setText("");
    setSug([]);
    add({ from: "visitor", text: shown || t });
    if (t === "Not now" && lead.step) return leadStep("not now");
    if (lead.step && !["done", "sending"].includes(lead.step)) return leadStep(t);
    if (session) {
      setTyping(true);
      const r = await frkPost(`/api/v1/chat/${session.id}/message`, { token: session.token, text: t });
      setTyping(false);
      if (r.ok) {
        const bots = (r.j.messages || []).filter((m) => m.from === "bot");
        setSession((s) => ({ ...s, since: Math.max(s.since, ...(r.j.messages || []).map((m) => m.i + 1)) }));
        bots.forEach((m) => add({ from: "bot", text: m.text, links: m.links }));
        return;
      }
    }
    return answer(t);
  };
  const onType = (e) => {
    const v = e.target.value;
    setText(v);
    if (v.trim().length >= 3 && frcKB && !(lead.step && lead.step !== "done")) setSug(frcSearch(v, here, 4).filter((r) => r.d.src !== "page" && r.cover >= 0.5 && !/·/.test(r.d.q)).map((r) => r.d.q));
    else setSug([]);
  };
  const restart = () => {
    setMsgs([FRC_HELLO]);
    setLead({ step: null });
    setSession(null);
    setSug([]);
  };
  const toggleSound = () => {
    const nv = !sound;
    setSound(nv);
    try {
      localStorage.setItem(FRC_SOUND, nv ? "on" : "off");
    } catch (e) {}
    if (nv) setTimeout(() => frcPop("msg"), 30);
  };
  const leadPh = { name: "Your full name", email: "name@company.com", phone: "+91 98765 43210 or Skip", country: "Your country", message: "Anything to add?" }[lead.step] || "Ask anything…";
  const fresh = msgs.length <= 1;

  return (
    <>
      {teaser && !open && (
        <div className="fc-teaser" role="status">
          <button type="button" className="fc-teaser__x" onClick={() => setTeaser(false)} aria-label="Dismiss">
            <FRK_I n="x" s={14} />
          </button>
          <p>
            <b>Hi there 👋</b> Questions about research, marketing, tech or finance? Ask me — I answer instantly.
          </p>
          <div className="fc-teaser__chips">
            {FRC_POPULAR.slice(0, 2).map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  doOpen(true);
                  setTimeout(() => send(q), 250);
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      <button ref={launch} type="button" className={"fc-launch" + (open ? " is-open" : "")} onClick={() => doOpen()} aria-expanded={open} aria-controls="fr-chat">
        {/* build 74: the name comes from this text (not aria-label), so it never disagrees with the visible words */}
        <span className="pp-sr">{open ? "Close chat" : "Chat with us"}</span>
        <span className="fc-launch__orb" aria-hidden="true">
          <i className="fc-launch__ring" />
          {open ? <FRK_I n="x" s={24} sw={2.4} /> : <FRL_Mark s={40} />}
        </span>
        {!open && (
          <span className="fc-launch__t" aria-hidden="true">
            <b>Ask us anything</b>
            <small>
              <i /> Instant answers
            </small>
          </span>
        )}
        {unread > 0 && !open && <span className="fc-launch__badge">{unread}</span>}
      </button>
      {open && (
        <section id="fr-chat" className="fc" role="dialog" aria-label="Chat with Frequent Research">
          <header className="fc-head">
            <span className="fc-head__mesh" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="fc-head__av" aria-hidden="true">
              <FRL_Mark s={40} />
              <i />
            </span>
            <span className="fc-head__t">
              <b>Frequent Research</b>
              <small>{session ? "A specialist has your request" : "Assistant · answers from our website"}</small>
            </span>
            <span className="fc-head__act">
              <button type="button" onClick={toggleSound} aria-pressed={sound} aria-label={sound ? "Turn chat sound off" : "Turn chat sound on"} title={sound ? "Sound on" : "Sound off"}>
                <FRK_I n={sound ? "sound" : "mute"} s={17} />
              </button>
              <button type="button" onClick={restart} aria-label="Start a new conversation" title="New conversation">
                <FRK_I n="refresh" s={17} />
              </button>
              <button type="button" onClick={() => doOpen(false)} aria-label="Close chat" title="Close">
                <FRK_I n="minus" s={17} />
              </button>
            </span>
          </header>
          <div className="fc-body" ref={body} aria-live="polite">
            {msgs.map((m, i) => (
              <FRC_Bubble key={i} m={m} onAsk={(q, shown) => send(q, shown)} onLink={() => window.matchMedia && window.matchMedia("(max-width: 560px)").matches && setOpen(false)} />
            ))}
            {fresh && (
              <div className="fc-start">
                <div className="fc-worlds">
                  {FRC_TOPICS.map((t) => (
                    <button key={t.v} type="button" style={frkVStyle(t.v)} onClick={() => send(t.q, t.t)}>
                      <span aria-hidden="true">
                        <FRK_I n={FRK_V[t.v].ic} s={20} />
                      </span>
                      {t.t}
                    </button>
                  ))}
                </div>
                <small className="fc-start__h">{pageQs.length ? "About this page" : "Popular questions"}</small>
                <div className="fc-chips fc-chips--start">
                  {(pageQs.length ? pageQs : FRC_POPULAR).map((q) => (
                    <button key={q} type="button" onClick={() => send(q)}>
                      {q}
                    </button>
                  ))}
                  <button type="button" className="fc-chip--human" onClick={() => send("Talk to a specialist")}>
                    <FRK_I n="user" s={14} /> Talk to a specialist
                  </button>
                </div>
              </div>
            )}
            {lead.step === "form" && (
              <FRC_LeadForm
                question={lead.question}
                onCancel={() => {
                  setLead({ step: null });
                  say({ text: "No problem. Ask me anything else — or tap “Talk to a specialist” whenever you're ready.", chips: FRC_POPULAR.slice(0, 3) });
                }}
                onSubmit={(d) => sendLead({ ...lead, ...d })}
              />
            )}
            {typing && (
              <div className="fc-msg fc-msg--bot fc-typing" aria-label="Assistant is typing">
                <span className="fc-msg__av" aria-hidden="true">
                  <FRL_Mark s={40} />
                </span>
                <div className="fc-msg__body">
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            )}
          </div>
          <form
            className={"fc-comp" + (lead.step === "form" ? " is-hidden" : "")}
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            {sug.length > 0 && (
              <ul className="fc-sug" role="listbox" aria-label="Suggested questions">
                {sug.map((q) => (
                  <li key={q}>
                    <button type="button" role="option" aria-selected="false" onClick={() => send(q)}>
                      <FRK_I n="lens" s={14} />
                      {q}
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <label className="frk-sr" htmlFor="fc-in">
              Type your message
            </label>
            <input id="fc-in" ref={inp} value={text} onChange={onType} placeholder={leadPh} autoComplete="off" maxLength={600} type={lead.step === "email" ? "email" : "text"} inputMode={lead.step === "phone" ? "tel" : lead.step === "email" ? "email" : "text"} />
            <button type="submit" className="fc-send" aria-label="Send" disabled={!text.trim()}>
              <FRK_I n="send" s={18} sw={2} />
            </button>
            <p className="fc-legal">
              Answers come from our website. By chatting you agree to our <PpL to="/privacy-policy">Privacy Policy</PpL>.
            </p>
          </form>
        </section>
      )}
    </>
  );
}

export { FR_Chat };
