/* ===== 15-point case study engine (build 65, CX5_ / cx5) =====
   Builds the same 15 sections for every case study, on the website and in the PDF:
   industry overview (sector profile) · client background · challenge · objectives · target audience · geography ·
   methodology · sampling · data collection · data quality · analysis · findings · recommendations · impact · deliverables.
   Everything is derived from the case's own fields (client, region, markets, services, methods, scope, timeline,
   challenge, approach, outcome, learning), the sector profile (Industries65.jsx) and method modules below that describe
   how Frequent Research runs each kind of work. No figures are invented: the only numbers shown are the case's own. */
import { FRK_V } from '../components/site/FrKit.jsx';
import { in5Prof } from './Industries65.jsx';
import { csxVertical } from '../pages/CaseStudy.jsx';
import { countryName } from '../app/pages/IndustriesPages.jsx';

const CX5_FACTORS = [
  ["overview", "Industry overview", "globe"],
  ["client", "Client background", "users"],
  ["challenge", "Client challenge", "target"],
  ["objectives", "Research objectives", "flag"],
  ["audience", "Target audience", "users"],
  ["geo", "Geographic coverage", "pin"],
  ["method", "Research methodology", "layers"],
  ["sampling", "Sampling strategy", "funnel"],
  ["collection", "Data collection", "clock"],
  ["quality", "Data quality & validation", "shield"],
  ["analysis", "Data analysis", "chart"],
  ["findings", "Key findings", "eye"],
  ["recs", "Recommendations", "compass"],
  ["impact", "Business impact", "rocket"],
  ["next", "Deliverables & next steps", "doc"],
];

const CX5_GEO = /^(district|cit|state|countr|market|region|village|ward|town|zone|site|location|province|block|mandal|taluk|county|port|airport|campus|school|hospital|branch|store|outlet|plant|propert|mall|pump|depot|centre|center|showroom|clinic)/i;
const CX5_ACTV = /^(group discussion|focus group|interview|in-depth|discussion|session|workshop|survey|call|visit|audit|test|mystery|observation|diar|ethnograph|depth|idi|fgd|campaign|ad|post|video|page|lead|report|filing|return|invoice|transaction|entr|ledger|account)/i;
function cx5Scope(scope) {
  const out = { groups: [], geo: [], acts: [] };
  if (!scope) return out;
  const re = /(\d[\d,]*(?:\.\d+)?)\s*(k|\+)?\s+([A-Za-z][A-Za-z\-'’ &\/]*?)(?=\s+(?:and|across|in|from|over|at|with|per|each|plus|on)\b|[,;()]|$)/g;
  let m;
  while ((m = re.exec(scope))) {
    const n = Math.round(parseFloat(m[1].replace(/,/g, "")) * (m[2] === "k" ? 1000 : 1));
    const label = m[3].trim();
    if (!n || !label || /^(week|month|day|year|hour|minute|wave|round|phase|quarter)/i.test(label)) continue;
    (CX5_GEO.test(label) ? out.geo : CX5_ACTV.test(label) || /\b(interviews?|discussions?|sessions?|workshops?|visits?|audits?|calls?|groups?|tests?|diaries|waves?)$/i.test(label) ? out.acts : out.groups).push([n, label]);
  }
  return out;
}
const cx5Sentences = (t) => (t || "").match(/[^.!?]+[.!?]+(?=\s|$)|[^.!?]+$/g)?.map((s) => s.trim()).filter(Boolean) || [];
const CX5_NOTACT = /\b(included|consisted|came|stayed|felt|saw|knew|thought|showed|revealed|found|suggested|indicated|appeared|seemed|wanted|needed|preferred|valued|expected|struggled|mentioned|reported|believed|liked|trusted|remained|varied|differed|lacked|ranked|rated|scored|followed|depended|mattered|listened|worried|complained|asked|noticed|learned|learnt|was|were|had|did)\b/i;
function cx5IsAct(s) {
  const m = /^(?:the|its|our|each|both|several|many of the)\s+(?:[\w’'-]+\s){0,3}?([a-z]+ed|set|made|ran|put|gave|built|cut|began|chose|took|won|kept|sent|spent|brought|led|sold|wrote|rebuilt|rolled|shifted|moved|now uses|now runs|now tracks|uses|runs|tracks)\b/i.exec(s);
  if (m && !CX5_NOTACT.test(m[1])) return true;
  return /\b(was|were) (tailored|redesigned|introduced|added|changed|launched|simplified|revised|updated|rolled out|moved|extended|rebuilt|reorganised|reorganized|retrained|relaunched|replaced|scaled|expanded)\b/i.test(s);
}
const CX5_IMPACT = /(\d+\s?%|per cent|percent|\brose\b|\bfell\b|\bgrew\b|increased|reduced|declined|improv|doubled|halved|\bsaved\b|lifted|recovered|dropped|converting|conversion|growing|rising|stronger|better|faster|fewer)/i;

function cx5Fam(cs) {
  const t = [...(cs.methods || []), ...(cs.services || []), cs.scope || ""].join(" | ").toLowerCase();
  return {
    t,
    f2f: /face-to-face|household|in-home|capi|door|farmer|village|intercept|exit interview|visitor|observation|accompanied|offline data collection(?! \(cati\))|community|field/.test(t),
    phone: /cati|telephone|phone/.test(t),
    online: /online|panel|web|app survey|email survey|digital survey/.test(t),
    qual: /in-depth|interview|group discussion|focus group|ethnograph|diary|workshop|observation|accompanied|usability|playtest|case interview|qualitative/.test(t),
    quant: /survey|quantitative|census|poll|tracker|tracking|scorecard/.test(t),
    audit: /audit|mystery|scorecard|observation|compliance review|inspection/.test(t),
    desk: /desk|model|sizing|secondary|competitive intelligence|forecast/.test(t),
    b2b: /b2b|business panel|employer|dealer|distributor|retailer|buyer|executive|expert|procurement|plant head|contractor|trader|supplier|owner/.test(t),
    hcp: /healthcare panel|doctor|physician|hcp|patient|pharmac|clinic|hospital|nurse/.test(t),
    dash: /dashboard|analytics/.test(t),
    driver: /driver analysis|key driver/.test(t),
    seg: /segment/.test(t),
    conjoint: /conjoint|choice|pricing|price/.test(t),
    concept: /concept|message|ad test|pre-test|trailer|taste|product test|sensory/.test(t),
  };
}
const cx5Lc = (s) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s);
const cx5Join = (a) => (a.length < 2 ? a.join("") : a.slice(0, -1).join(", ") + " and " + a[a.length - 1]);
const cx5Mkt = (m) => countryName(m);

function cx5Build(cs, ind) {
  const vk = csxVertical(cs);
  const F = cx5Fam(cs);
  const P = in5Prof(ind.slug);
  const S = cx5Scope(cs.scope);
  const client = (cs.client || "").replace(/^Illustrative · /, "");
  const mr = vk === "market-research";
  const sentences = cx5Sentences(cs.outcome);
  const acts = sentences.filter((s) => cx5IsAct(s));
  const impacts = sentences.filter((s, i) => !acts.includes(s) && CX5_IMPACT.test(s) && (i > 0 || /\d/.test(s)));
  const finds = sentences.filter((s) => !acts.includes(s) && !impacts.includes(s));
  const mk = (cs.markets || []).map(cx5Mkt);
  const tl = cs.timeline || "";
  const ongoing = /ongoing|monthly|quarterly|annual|continuous|yearly|weekly|wave/i.test(tl);
  const groupsTxt = S.groups.map(([n, l]) => n.toLocaleString("en-IN") + " " + l);
  const who = groupsTxt.length ? cx5Join(groupsTxt) : cs.scope || "the people closest to the decision";
  const meth = (cs.methods || []).map(cx5Lc);
  const out = {};

  out.overview = { lead: P[0] || ind.blurb, items: P[1], label: "What is shaping " + ind.name.toLowerCase() };

  out.client = {
    lead: `${client}${cs.region ? `, working in ${cs.region}` : ""}. ${cs.verified === false ? "This is an illustrative engagement: a representative scenario showing how we approach this kind of work, not a named client project." : "Client identity is withheld to protect confidentiality."}`,
    kv: [
      ["Organisation", client],
      ["Sector", ind.name],
      ["Team engaged", FRK_V[vk] ? FRK_V[vk].name : vk],
      ["Services", (cs.services || []).join(", ")],
    ],
  };

  out.challenge = { lead: cs.challenge };

  const primary = /^(why|how|what|which|who|where|when|whether|can|does|do|is|are)\b/i.test(cs.title) ? "Answer the core question: " + cx5Lc(cs.title.replace(/[.?]$/, "")) + "." : "Deliver on the brief: " + cx5Lc(cs.title.replace(/[.?]$/, "")) + ".";
  const objectives = [primary];
  S.groups.slice(0, 2).forEach(([, l]) => objectives.push(mr ? `Understand the views, needs and behaviour of ${l}.` : `Design around the real needs of ${l}.`));
  if (mr) {
    if (F.qual && F.quant) objectives.push("Measure how widespread each pattern is, and explain the reasons behind it.");
    else if (F.qual) objectives.push("Uncover the motivations and barriers people do not state in a survey.");
    else objectives.push("Produce results that can be compared across groups and locations.");
    objectives.push(ongoing ? "Set up a repeatable measure the client can track over time." : /\d/.test(tl) ? `Give the client evidence it can act on within ${tl}.` : "Give the client evidence it can act on, on an agreed schedule.");
  } else if (vk === "digital-marketing") objectives.push("Set measurable targets and a tracking baseline before launch.", "Improve results through structured testing, reported in plain language.");
  else if (vk === "it-development") objectives.push("Define requirements and success criteria the solution would be tested against.", "Deliver a reliable, secure solution the team can run and extend.");
  else objectives.push("Establish accurate, reconciled numbers management can rely on.", "Put a reporting and compliance rhythm in place that runs on time.");
  out.objectives = { items: objectives };

  out.audience = {
    lead: S.groups.length ? `The work focused on ${who}.` : `Scope: ${cs.scope || "defined with the client"}.`,
    bars: S.groups.length ? S.groups : null,
    chips: P[2],
    chipsLabel: `Audiences we typically reach in ${ind.name.toLowerCase()}`,
  };

  out.geo = {
    lead: `${cs.region ? "Coverage: " + cs.region + "." : ""}${mk.length ? ` ${mk.length > 1 ? "Markets" : "Market"}: ${cx5Join(mk)}.` : ""}${S.geo.length ? " " + cx5Join(S.geo.map(([n, l]) => n.toLocaleString("en-IN") + " " + l)) + " covered." : ""}`.trim(),
    flags: cs.markets || [],
    geo: S.geo,
  };

  const design = mr
    ? F.qual && F.quant
      ? "A mixed-method design: structured research measured how widespread each pattern was, and qualitative conversations explained why."
      : F.qual
        ? "A qualitative design, built to uncover motivations, decision processes and the language people actually use."
        : F.desk
          ? "A structured analytical design combining desk research, modelling and primary evidence."
          : "A structured quantitative design, so results could be compared across groups, locations and time."
    : vk === "digital-marketing"
      ? "A test-and-learn programme: a clear baseline, focused campaigns and weekly optimisation against agreed targets."
      : vk === "it-development"
        ? "An iterative delivery approach: discovery, design, build and test in short cycles, with the client reviewing each step."
        : "A structured finance engagement: review the current process, set up controls, run the routine and report.";
  out.method = { lead: design, steps: ["Brief", ...(cs.methods || []).slice(0, 4), "Insight"], chips: cs.services || [], sub: cs.approach };

  const samp = [];
  if (mr) {
    if (F.hcp) samp.push("Healthcare professionals and patients were screened on specialty, setting or condition, and professionals were verified before taking part.");
    if (F.b2b) samp.push("Business respondents were screened on role, company size and involvement in the decision before being invited.");
    if (F.f2f) samp.push(`Respondents were selected across ${cs.region || "the study area"} using quotas set in advance for each location and respondent type, so no single area or group dominated.`);
    if (F.online) samp.push("Online respondents were drawn from verified panel members who matched the screening criteria, with quotas on key profile attributes.");
    if (F.phone) samp.push("Telephone contacts were dialled from verified lists, with quotas tracked live by the field team.");
    if (F.qual) samp.push("Qualitative participants were recruited purposively to cover the full range of experiences that mattered, rather than for statistical representation.");
    if (!samp.length) samp.push("The sample was designed with the client around the decision to be made, with quotas to keep key groups readable.");
  } else if (vk === "digital-marketing") samp.push("Audiences were defined from the client's customer data and platform targeting, with test and control groups where possible.");
  else if (vk === "it-development") samp.push("Users and stakeholders from every affected team took part in discovery workshops and acceptance testing.");
  else samp.push("Every ledger, entity and transaction stream in scope was covered, with sample-based checks during review.");
  out.sampling = { items: samp, kv: S.groups.length ? S.groups.map(([n, l]) => [l, n.toLocaleString("en-IN")]) : null };

  const col = [];
  if (mr) {
    if (F.f2f) col.push(/capi/.test(F.t) ? "Trained local-language interviewers conducted interviews in person on tablets (CAPI), with time and location recorded for every interview." : "Trained local-language interviewers conducted interviews in person, supervised in the field.");
    if (F.phone) col.push("Telephone interviews were run from our CATI centre, with calls monitored for quality.");
    if (F.online) col.push("The online survey was mobile-friendly and offered in respondents' languages.");
    if (F.qual) col.push("Interviews and discussions were led by experienced moderators using a guide agreed with the client.");
    if (F.audit) col.push("Auditors and mystery shoppers followed a standard checklist, recording evidence at each visit.");
    if (F.desk) col.push("Secondary sources and client data were compiled and cross-checked before modelling.");
    if (!col.length) col.push("Data was collected with the methods listed below, managed by a dedicated project team.");
  } else if (vk === "digital-marketing") col.push("Campaign, website and CRM data were tracked daily through analytics and ad platforms.");
  else if (vk === "it-development") col.push("Requirements were gathered through workshops, process walk-throughs and a review of existing systems and data.");
  else col.push("Source documents, bank statements and ledgers were collected through a secure shared workspace.");
  out.collection = { items: col, timeline: tl, methods: cs.methods || [], kv: S.acts.length ? S.acts.map(([n, l]) => [l, n.toLocaleString("en-IN")]) : null };

  const q = [];
  if (mr) {
    if (F.f2f) q.push("Back-checks on a share of completed interviews", "Time and location checks on field interviews", "Supervisor accompaniment in the field");
    if (F.phone) q.push("Live call monitoring and recording review", "Call-back verification");
    if (F.online) q.push("Digital fingerprinting and duplicate checks", "Attention, speed and straight-lining checks", "Review of open-ended answers");
    if (F.qual) q.push("Recordings and transcripts for every session", "Re-screening of qualitative recruits");
    if (F.audit) q.push("Photo or document evidence for audit points", "Second-reviewer checks on scores");
    if (F.hcp) q.push("Verification of healthcare professionals");
    q.push("Logic and range checks on the final data", "Work carried out under our ISO 20252 quality procedures");
  } else if (vk === "digital-marketing") q.push("Conversion tracking tested end to end", "Consistent UTM tagging on every link", "Numbers reconciled between ad platforms and analytics", "Two-person check before anything goes live");
  else if (vk === "it-development") q.push("Peer code review on every change", "Automated and manual testing", "User-acceptance testing with the client", "Release checklist and rollback plan");
  else q.push("Maker-checker review on all entries", "Bank and ledger reconciliations", "Client approval before every filing or report", "Supporting documents kept for every figure");
  out.quality = { items: [...new Set(q)] };

  const an = [];
  if (mr) {
    if (F.quant) an.push("Cross-tabulation by key groups and locations", "Significance testing on the differences that mattered");
    if (F.driver) an.push("Driver analysis to find what most influences the outcome");
    if (F.seg) an.push("Segmentation into groups the client can act on");
    if (F.conjoint) an.push("Price and trade-off analysis");
    if (F.concept) an.push("Comparison of concepts, messages or products against each other");
    if (F.qual) an.push("Thematic coding of interviews and discussions", "Journey and decision mapping");
    if (F.desk) an.push("Market model built from secondary data and primary evidence");
    if (F.dash) an.push("Interactive dashboard for ongoing tracking");
    if (!an.length) an.push("Structured analysis against the study objectives");
  } else if (vk === "digital-marketing") an.push("Funnel analysis from impression to lead or sale", "A/B test results on creatives, keywords and pages", "Channel and campaign attribution");
  else if (vk === "it-development") an.push("Usage and performance monitoring after launch", "Defect and support-ticket trends", "Process time before and after");
  else an.push("Variance analysis against budget and prior periods", "Ratio and trend analysis", "Cash-flow view for management");
  out.analysis = { items: an };

  const VREC = { "market-research": "Share the findings with the teams closest to customers so they can act quickly.", "digital-marketing": "Keep testing creatives, keywords and landing pages against the new baseline.", "it-development": "Track adoption and support tickets, and plan the next release from real usage.", "accounts-finance": "Keep the monthly routine and review exceptions with management every period." }[vk];
  const lessonRec = cs.learning ? "Build on the core insight: " + cx5Lc(cs.learning) : "";
  const pureFinds = finds.filter((x) => !impacts.includes(x) && !acts.includes(x));
  const focusRec = pureFinds[0] && (impacts.length || acts.length) ? "Focus effort where the evidence was strongest: " + cx5Lc(pureFinds[0]) : "";
  if (impacts.length) {
    out.recs = { items: acts.length ? acts : [lessonRec, focusRec].filter(Boolean), note: acts.length ? "What we recommended, and the client put into practice" : "" };
    out.impact = { items: impacts, note: "" };
  } else if (acts.length) {
    out.recs = { items: [lessonRec, focusRec, "Re-measure after the changes to confirm the effect."].filter(Boolean), note: "" };
    out.impact = { items: acts, note: "What changed in the business as a result of the work. Impact is described qualitatively." };
  } else {
    out.recs = { items: [lessonRec, focusRec].filter(Boolean).length ? [lessonRec, focusRec].filter(Boolean) : sentences.slice(-1), note: "" };
    out.impact = { items: sentences.slice(-1), note: "Impact is described qualitatively." };
  }

  const fItems = pureFinds.filter((x) => !out.impact.items.includes(x));
  out.findings = { items: fItems.length ? fItems : cs.learning ? [cs.learning] : sentences.slice(0, 1), quote: fItems.length ? cs.learning : "" };
  out.recs.items = out.recs.items.filter((x) => !out.impact.items.includes(x));
  if (out.recs.items.length < 2 && VREC) out.recs.items.push(VREC);

  const del = [];
  const sv = (cs.services || []).join(" ").toLowerCase();
  if (/reporting|insight|consultancy|government research|qualitative|quantitative/.test(sv)) del.push("Insight report and management presentation");
  if (/quantitative|survey|panel|data collection|cati|capi/.test(sv)) del.push("Cleaned data file and data tables");
  if (/qualitative/.test(sv)) del.push("Interview summaries and key verbatims");
  if (/dashboard|analytics/.test(sv)) del.push("Interactive dashboard");
  if (/government/.test(sv)) del.push("Evaluation findings with programme recommendations");
  if (vk === "digital-marketing") del.push("Campaign assets and landing pages", "Monthly performance report");
  if (vk === "it-development") del.push("Deployed solution with documentation and handover", "Support and maintenance plan");
  if (vk === "accounts-finance") del.push("Monthly MIS pack and reconciled books", "Compliance calendar and filings");
  if (!del.length) del.push("Final report and debrief");
  const nxt = P[3] && P[3].length ? [P[3][(cs.slug || "").length % P[3].length]] : [];
  out.next = { items: [...new Set(del)], next: [ongoing ? "Continue the routine and review results every period." : "Repeat the measure after changes are in place to track progress.", ...nxt.map((x) => "A natural follow-on question: " + cx5Lc(x))] };
  return { vk, F, S, client, f: out };
}

export { CX5_FACTORS, cx5Build };
