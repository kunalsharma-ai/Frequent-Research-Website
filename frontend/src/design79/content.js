/*
 * Build 79, new design: every text of the new home page and of the four platform pages, in one place.
 * Super admin › Content › "New design texts" edits this object (key "design79"); anything left out keeps the text
 * below. Lists (services, FAQs, panels…) still come from their own admin sections (Services, Portals, Testimonials…).
 * Site settings › design.v79 = false switches the whole site back to the classic design (build 78.1).
 */
import { cmsData, cmsSetting } from '../app/cms.jsx';

export const D79 = cmsData("design79", {
  home: {
    eyebrow: "Research · Marketing · Technology · Finance",
    line1: "From one question",
    line2: "to a world",
    line3: "of answers.",
    verbs: ["research", "market", "build", "balance"],
    verbLead: "One partner to",
    verbTail: "your next big move.",
    intro:
      "Frequent Research brings Market Research, Digital Marketing, IT & Development and Accounts & Finance under one roof: four specialist teams, our own panels in 55+ countries and one point of contact from brief to result.",
    ctaMain: "Start a project",
    ctaAlt: "Explore the four worlds",
    orbitNote: "Live from New Delhi to 55+ markets",
    worldsKicker: "Four worlds, one team",
    worldsTitle: "Pick a world. Each one has its own flavour.",
    worldsText: "Every platform has its own specialists, its own tools and its own way of working, joined up by one project lead who speaks for all four.",
    reachKicker: "Our reach",
    reachTitle: "Real people. Real markets. Real answers.",
    reachText: "Consumers, business professionals, teens (with parental consent) and healthcare experts from our own communities and vetted partners, with quality checks at every step.",
    panelsKicker: "Our own communities",
    panelsTitle: "The panels behind the data",
    industriesKicker: "Industries",
    industriesTitle: "Fluent in 58 industries",
    productsKicker: "Built in-house",
    productsTitle: "The Sampledge product family",
    productsText: "Software we built for our own work, now ready for yours: survey programming, bidding, projects, sample, sales, finance and HR.",
    leadersKicker: "Leadership",
    leadersTitle: "The people who answer for every project",
    voicesKicker: "Client voices",
    voicesTitle: "What working with us feels like",
    trustKicker: "Standards we work to",
    trustTitle: "Certified, audited, accountable",
    ctaKicker: "Your move",
    ctaTitle: "Tell us the question. We'll bring the world's answers.",
    ctaText: "Feasibility, a plan and a price, usually within one working day.",
    ctaBtn: "Let's talk",
    ctaBtn2: "WhatsApp us",
  },
  platforms: {
    "market-research": {
      mood: "Aurora",
      kicker: "Market Research",
      title1: "Every market.",
      title2: "Every mindset.",
      title3: "Measured.",
      intro: "Good decisions start with good information. We design research around the decision you need to make, reach the right people in 55+ countries and hand you findings you can defend in any boardroom.",
      cta: "Request research feasibility",
      cta2: "See our quality process",
      cta2To: "/downloads/quality-process/market-research",
      ticker: ["Consumers", "B2B decision-makers", "Physicians", "Patients", "Caregivers", "IT buyers", "SME owners", "Pharmacists"],
      servicesTitle: "Twelve ways we find the answer",
      processTitle: "From question to decision in seven steps",
      proofTitle: "Proof from the field",
      faqTitle: "Questions researchers ask us",
    },
    "digital-marketing": {
      mood: "Neon Pop",
      kicker: "Digital Marketing",
      title1: "Be impossible",
      title2: "to scroll",
      title3: "past.",
      intro: "Strategy, creative and media that get you seen, clicked and chosen. Every campaign starts from research, so we spend your budget where your buyers already are.",
      cta: "Book a free growth call",
      cta2: "See every channel",
      ticker: ["SEO", "Google Ads", "Social", "Content", "Email", "Reputation", "Analytics", "Conversion"],
      servicesTitle: "Every channel, one growth plan",
      processTitle: "Attract. Engage. Convert. Repeat.",
      proofTitle: "Results our clients talk about",
      faqTitle: "Questions marketers ask us",
    },
    "it-development": {
      mood: "Terminal",
      kicker: "IT & Development",
      title1: "We engineer",
      title2: "what's",
      title3: "next.",
      intro: "Websites, apps, SaaS platforms, dashboards and AI, designed with your users, built secure and ready to scale. The same engineers who built our own Sampledge products.",
      cta: "Scope my project",
      cta2: "See our stack",
      ticker: ["React", "Node.js", "Python", "Cloud", "AI agents", "APIs", "Mobile", "DevOps"],
      servicesTitle: "What we build",
      processTitle: "Plan. Build. Ship. Support.",
      proofTitle: "Shipped and running",
      faqTitle: "Questions CTOs ask us",
    },
    "accounts-finance": {
      mood: "Gilded Ledger",
      kicker: "Accounts & Finance",
      title1: "Clarity",
      title2: "in every",
      title3: "number.",
      intro: "Books, tax, payroll, compliance and CFO thinking, handled by qualified people with clear monthly reporting, so you always know where your business stands.",
      cta: "Get a finance health check",
      cta2: "See plans and services",
      ticker: ["Bookkeeping", "GST", "Payroll", "Tax", "Audit support", "MIS", "Virtual CFO", "Compliance"],
      servicesTitle: "Your finance function, sorted",
      processTitle: "Record. Comply. Advise.",
      proofTitle: "Numbers that add up",
      faqTitle: "Questions founders ask us",
    },
  },
});

// the new design is on unless the super admin switched it off (Site settings › design.v79) or the address asks for the
// classic one (?design=classic, kept for the visit, for side-by-side review)
export function d79On() {
  if (typeof window === "undefined") return true;
  try {
    const q = new URLSearchParams(location.search).get("design") || (location.hash.split("?")[1] && new URLSearchParams(location.hash.split("?")[1]).get("design"));
    if (q === "classic" || q === "new") sessionStorage.setItem("fr-design", q);
    const s = sessionStorage.getItem("fr-design");
    if (s === "classic") return false;
    if (s === "new") return true;
  } catch (e) {}
  return cmsSetting("design.v79", true) !== false;
}
