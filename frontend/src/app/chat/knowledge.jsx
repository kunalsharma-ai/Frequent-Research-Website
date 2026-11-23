import { CONTACT, PORTALS, VERTICALS } from '../data/site.jsx';
import { CERTIFICATIONS, DOWNLOADS } from '../data/products.jsx';

const isPlaceholder = (t) => typeof t == "string" && t.includes("["),
  GOV_FAQS = [
    {
      q: "Can Frequent Research conduct government surveys?",
      a: "Yes. We design and run surveys for public-sector organisations, consulting firms, NGOs and research agencies working on government programmes, covering questionnaire design, sampling, fieldwork, quality control, data processing and reporting.",
    },
    {
      q: "Can you conduct large-scale citizen surveys?",
      a: "Yes. Large citizen surveys are planned with a clear sampling frame, regional fieldwork teams, daily quota tracking and layered quality checks. We share a realistic timeline and team plan with the proposal.",
    },
    {
      q: "Can you conduct opinion polls across India?",
      a: "Yes. We run public opinion research using CATI, online panels and face-to-face interviews, with quotas and weighting to reflect the target population. Coverage for each study is confirmed at feasibility stage.",
    },
    {
      q: "What geographies can you cover?",
      a: "Our field teams cover 17 states & UTs and 149 districts, including every district in Haryana and Delhi NCR, and our citizen panel has members in all 36 states and union territories. International markets are covered through our panels and partners. Share your required states, districts or cities and we will confirm feasibility and approach.",
    },
    {
      q: "Can you conduct rural and urban surveys?",
      a: "Yes. Rural fieldwork uses local-language interviewers and village-level sampling; urban fieldwork combines door-to-door, intercept, CATI and online methods.",
    },
    {
      q: "Can you recruit hard-to-reach respondents?",
      a: "Yes. We use targeted screening, community and institutional networks, our own panels and longer fieldwork windows for low-incidence groups, and we tell you upfront if a quota looks unrealistic.",
    },
    {
      q: "What survey methodologies do you support?",
      a: "Online (CAWI), telephone (CATI), computer-assisted personal interviews (CAPI), paper-based face-to-face where needed, mixed-mode designs, in-depth interviews and focus groups.",
    },
    {
      q: "Can you conduct CATI surveys?",
      a: "Yes. Our CATI operations include scripted questionnaires, supervisor monitoring, call-back scheduling and quota control.",
    },
    {
      q: "Can you conduct face-to-face interviews?",
      a: "Yes. Face-to-face fieldwork covers households, intercepts, institutions and community locations, with trained interviewers and supervisors.",
    },
    {
      q: "Can you conduct CAPI surveys?",
      a: "Yes. CAPI on tablets or phones supports offline data capture, routing logic, time stamps and GPS validation where applicable.",
    },
    {
      q: "Can you support multilingual questionnaires?",
      a: "Yes. Questionnaires are translated and back-checked into required languages, and interviewers are briefed in the language they will use.",
    },
    {
      q: "How do you validate respondents?",
      a: "Through contact verification, screening questions, profile consistency checks, back-checks on a share of interviews and, for online work, technical checks.",
    },
    {
      q: "How do you prevent duplicate responses?",
      a: "We combine identity and contact matching with device and technical signals for online surveys, plus listing controls in household fieldwork.",
    },
    {
      q: "Can you provide raw survey data?",
      a: "Yes. We can deliver cleaned respondent-level data in SPSS, Excel or CSV with a codebook, subject to the consent and anonymisation terms of the study.",
    },
    {
      q: "Can you provide dashboards and analysis?",
      a: "Yes. Deliverables can include cross-tabulations, statistical analysis, geographic comparisons, interactive dashboards and presentation-ready reports.",
    },
    {
      q: "Can you conduct government scheme evaluations?",
      a: "Yes. We support baseline, mid-line and endline studies, beneficiary and non-beneficiary comparisons, and qualitative work with implementers.",
    },
    {
      q: "Can you conduct beneficiary satisfaction surveys?",
      a: "Yes. Beneficiary surveys measure awareness, access, delivery experience and satisfaction, usually through CAPI or CATI.",
    },
    {
      q: "Can you conduct public opinion research?",
      a: "Yes, using neutral, balanced questionnaires and documented methods. We do not take political positions or design persuasion messaging.",
    },
    {
      q: "What is the typical project timeline?",
      a: "Smaller telephone or online studies can take two to four weeks. Large multi-state household surveys typically take two to four months including design, fieldwork and reporting. We confirm timelines at proposal stage.",
    },
    {
      q: "How can I request a proposal?",
      a: "Use the research brief form on this page or email info@frequentresearch.com with your objectives, target population, geography, sample size and timeline.",
    },
  ],
  STOP_WORDS = new Set(
    "a an and are as at be but by can could do does for from have how i if in is it me my of on or our please should so tell that the their them there these this to us we what when where which who why will with you your about any get need want looking know would like help".split(
      " ",
    ),
  ),
  chatNormalize = (t) =>
    t
      .toLowerCase()
      .replace(/&/g, " and ")
      .replace(/[^a-z0-9+@.\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  chatStem = (t) =>
    t.length > 4 && t.endsWith("ies")
      ? t.slice(0, -3) + "y"
      : t.length > 3 && t.endsWith("s") && !t.endsWith("ss")
        ? t.slice(0, -1)
        : t,
  chatKey = (t) => chatNormalize(t).split(" ").map(chatStem).join(" "),
  chatTokens = (t) =>
    chatNormalize(t)
      .split(" ")
      .filter((e) => e.length > 1 && !STOP_WORDS.has(e))
      .map(chatStem),
  CHAT_ANSWERS = [],
  addAnswer = (t, e, a, n = []) =>
    CHAT_ANSWERS.push({
      id: t,
      keys: e.map(chatKey),
      toks: new Set(e.flatMap(chatTokens)),
      answer: a,
      links: n,
    });
addAnswer(
  "greeting",
  ["hi", "hello", "hey", "good morning", "good evening", "namaste"],
  "Hello! 👋 I'm the Frequent Research assistant. I can tell you about our market research, digital marketing, IT & development and accounts & finance services, our research panels, or connect you with a specialist. What are you working on?",
);
addAnswer(
  "thanks",
  ["thanks", "thank you", "great", "ok thanks"],
  "You're welcome! Is there anything else I can help you with?",
);
addAnswer(
  "contact",
  ["contact", "phone number", "email address", "call you", "address", "office", "location", "whatsapp", "reach you"],
  `You can reach us at ${CONTACT.email}, call or WhatsApp ${CONTACT.phone}, or visit us at ${CONTACT.address}. I can also take your details here and a specialist will reply by email.`,
  [
    {
      label: "Let's Talk",
      to: "/lets-talk",
    },
  ],
);
addAnswer(
  "pricing",
  ["price", "pricing", "cost", "quote", "quotation", "budget", "charges", "fees", "how much", "rate card"],
  "Pricing depends on scope: for research, the audience, sample size and markets; for marketing, channels and goals; for technology, features and integrations; for finance, transaction volume and services. Share a few details and our team will send a clear quote, usually within one working day. The first consultation is free.",
  [
    {
      label: "Request a Quote",
      to: "/lets-talk?type=quote",
    },
  ],
);
addAnswer(
  "timeline",
  ["how long", "timeline", "turnaround", "duration", "how fast", "deadline", "urgent"],
  "Typical timelines: online surveys 1–3 weeks; B2B, healthcare or multi-country research 3–6 weeks; paid ads live in 1–2 weeks; websites 4–8 weeks; apps and custom software 2–6 months in phases; finance onboarding 1–2 weeks. We confirm exact timelines with your proposal.",
);
addAnswer(
  "services",
  ["services", "what do you do", "offer", "capabilities", "company", "about frequent research", "who are you"],
  `Frequent Research brings four teams under one roof: Market Research (${VERTICALS[0].services.length} services), Digital Marketing (${VERTICALS[1].services.length}), IT & Development (${VERTICALS[2].services.length}) and Accounts & Finance (${VERTICALS[3].services.length}). We also run our own research panels and products. Which area interests you?`,
  [
    {
      label: "All services",
      to: "/services",
    },
  ],
);
addAnswer(
  "careers",
  ["job", "jobs", "career", "careers", "hiring", "vacancy", "internship", "resume", "cv", "work with you"],
  "We'd love to hear from you! Please visit our Careers page and send your CV. We hire across market research, sales, digital marketing, IT, project management and finance.",
  [
    {
      label: "Careers",
      to: "/careers",
    },
  ],
);
addAnswer(
  "downloads",
  ["brochure", "panel book", "download", "company profile", "pdf", "quality process", "deck"],
  `You can get our ${DOWNLOADS.map((t) => t.title).join(", ")} from the Downloads page. Fill in a short form and we'll email the file to you.`,
  [
    {
      label: "Downloads",
      to: "/downloads",
    },
  ],
);
addAnswer(
  "certs",
  ["iso", "certified", "certification", "esomar", "quality standard", "iso 20252", "iso 9001", "iso 27001"],
  `Frequent Research is certified to ${CERTIFICATIONS.map((t) => t.code).join(", ")}, and is an ESOMAR Corporate Member.`,
  [
    {
      label: "About Us",
      to: "/about-us",
    },
  ],
);
addAnswer(
  "privacy",
  ["privacy", "data protection", "gdpr", "dpdp", "personal data", "cookies", "delete my data", "research ethics"],
  `We take privacy seriously. You can read our Privacy Policy, Data Protection and Research Ethics pages, or email ${CONTACT.email} with any request about your data.`,
  [
    {
      label: "Privacy & Research Ethics",
      to: "/privacy-data-protection",
    },
  ],
);
addAnswer(
  "government",
  [
    "government",
    "opinion poll",
    "public opinion",
    "citizen survey",
    "election",
    "policy research",
    "scheme evaluation",
    "household survey",
    "social research",
    "public sector",
    "ngo",
  ],
  "We support government and public-sector research: citizen satisfaction, opinion polls, scheme evaluation, household and socioeconomic surveys, with mixed-mode fieldwork, multilingual teams and layered quality control. Share your population, geography and timeline for a proposal.",
  [
    {
      label: "Government & Opinion Research",
      to: "/government-opinion-research",
    },
  ],
);
addAnswer(
  "join-panel",
  [
    "join panel",
    "earn money",
    "paid surveys",
    "take surveys",
    "survey rewards",
    "become a member",
    "panelist",
    "rewards",
    "gift voucher",
    "paypal",
  ],
  "You can join our research panels for free and get rewarded for sharing your opinion: Turn2Opinion and MyFrequentRewards for consumers, business professionals and teens aged 13 to 17 (teens join the Teen panel with a parent or guardian’s permission), and MyHealthOpinions for healthcare professionals, patients and caregivers.",
  PORTALS.map((t) => ({
    label: t.name,
    to: `/portals/${t.slug}`,
  })),
);
addAnswer(
  "blog",
  ["blog", "articles", "guide", "read more", "learn"],
  "Our blog has in-depth guides on research, marketing, technology and finance.",
  [
    {
      label: "Blog",
      to: "/blog",
    },
  ],
);
PORTALS.forEach((t) =>
  addAnswer(
    `portal-${t.slug}`,
    [t.name, t.slug, ...t.audiences],
    `${t.name} is our ${t.audience.toLowerCase()}. ${t.tagline} Rewards: ${t.rewards.join(", ")}.`,
    [
      {
        label: t.name,
        to: `/portals/${t.slug}`,
      },
    ],
  ),
);
VERTICALS.forEach((t) => {
  addAnswer(
    `v-${t.slug}`,
    [t.name, t.short, ...t.flow, t.slug.replace("-", " ")],
    `${t.intro} Popular services include ${t.services
      .slice(0, 5)
      .map((e) => e.name)
      .join(", ")} and more.`,
    [
      {
        label: `${t.name} services`,
        to: `/services/${t.slug}`,
      },
    ],
  );
  t.services.forEach((e) =>
    addAnswer(
      `s-${e.slug}`,
      [e.name, ...e.includes],
      `${e.name}: ${e.summary} It typically includes ${e.includes.map((a) => (/^[A-Z]{2,}/.test(a) ? a : a.charAt(0).toLowerCase() + a.slice(1))).join(", ")}.`,
      [
        {
          label: e.name,
          to: `/services/${t.slug}/${e.slug}`,
        },
      ],
    ),
  );
  t.faqs.forEach((e, a) =>
    addAnswer(`f-${t.slug}-${a}`, [e.q], e.a, [
      {
        label: t.name,
        to: `/services/${t.slug}`,
      },
    ]),
  );
});
GOV_FAQS.forEach((t, e) =>
  addAnswer(`g-${e}`, [t.q], t.a, [
    {
      label: "Government research",
      to: "/government-opinion-research",
    },
  ]),
);
const CHAT_SERVICE_ALIASES = {
  seo: "s-seo-services",
  ads: "s-google-ads-ppc",
  ppc: "s-google-ads-ppc",
  gst: "s-gst-services",
  tds: "s-tds-services",
  itr: "s-income-tax-and-itr-filing",
  app: "s-mobile-app-development",
  website: "s-website-development",
  crm: "s-crm-development",
  erp: "s-erp-development",
  payroll: "s-payroll-services",
  cfo: "s-virtual-cfo-services",
  survey: "v-market-research",
  "online survey": "s-online-data-collection",
  "web survey": "s-online-data-collection",
  cawi: "s-online-data-collection",
  doctor: "s-healthcare-panel",
  physician: "s-healthcare-panel",
  hcp: "s-healthcare-panel",
  medical: "s-healthcare-panel",
  pharma: "s-healthcare-panel",
  patient: "s-healthcare-panel",
  nurse: "s-healthcare-panel",
  "b2b survey": "s-business-panel",
  "decision maker": "s-business-panel",
  "face to face": "s-offline-data-collection",
  capi: "s-offline-data-collection",
  cati: "s-offline-data-collection",
  "focus group": "s-qualitative-research",
  panel: "join-panel",
};
Object.entries(CHAT_SERVICE_ALIASES).forEach(([t, e]) => {
  const a = CHAT_ANSWERS.find((n) => n.id === e);
  if (a) {
    a.keys.push(chatKey(t));
    chatTokens(t).forEach((n) => a.toks.add(n));
  }
});

export { CHAT_ANSWERS, GOV_FAQS, isPlaceholder };
