/*
 * Build 70: one video per page for the red YouTube button (components/site/PageVideo69.jsx). Prefix PV_.
 *
 * Kunal (6 Nov): every page has its own video, pasted in the super admin ("Page videos"); each page shows its video in
 * its own design. Each entry: the page (path, exact or the whole branch), an optional section of that page (a CSS
 * selector: while that section is on screen the button plays this entry instead), the YouTube link, the design
 * (template) and its texts. Pages without a link of their own play the closest parent page's video, then the home video.
 * The super admin edits this list item by item (app/cms.jsx cmsList "page-videos").
 */
import { cmsList } from '../app/cms.jsx';
import { VERTICALS } from '../app/data/site.jsx';


/* build 70b: scene designs (an animated prop next to the screen that shows the service at work) */
const PV_SCENES = {
  survey: "Survey form", chart: "Rising chart", globe: "World reach", voice: "Interview voice", lens: "Data magnifier", report: "Report pages",
  serp: "Search results", funnel: "Funnel", inbox: "Inbox", chat: "Chat", calendar: "Content calendar", stars: "Star reviews", gauge: "Analytics gauge", social: "Social post",
  code: "Code editor", browser: "Website wireframe", phone: "Phone app", cloud: "Cloud servers", shield: "Security shield", bot: "AI assistant", tests: "Test checklist", flow: "Data pipeline",
  ledger: "Ledger book", calc: "Calculator receipt", pie: "Forecast chart", taxform: "Tax form", coins: "Growing coins", payslip: "Payslip",
};

/* every service page: its own scene (picked from what the service does), its family's colours in its own shade, the
   screen on alternating sides, and its own words (name, summary, what it includes) */
/* the design each service page gets, chosen for what that service does (no two services of a family share one) */
const PV_SVC_DESIGN = {
  "research-consultancy": "horizon", "research-design-cycle": "flow", "online-data-collection": "survey", "offline-data-collection": "globe",
  "consumer-panel": "chart", "business-panel": "bubbles", "healthcare-panel": "pulse", "qualitative-research": "chat", "quantitative-research": "pie",
  cati: "voice", "data-processing-and-analytics": "lens", "reporting-and-insights": "report",
  "seo-services": "serp", "google-ads-ppc": "chart", "social-media-marketing": "social", "social-media-advertising": "campaign", "content-marketing": "calendar",
  "performance-marketing": "coins", "lead-generation": "funnel", "b2b-digital-marketing": "report", "email-marketing": "inbox", "whatsapp-marketing": "chat",
  "influencer-marketing": "phone", "video-marketing": "filmstrip", "e-commerce-marketing": "gift", "landing-page-and-cro": "browser",
  "digital-marketing-consulting": "horizon", "online-reputation-management": "stars", "marketing-automation": "bot", "digital-analytics-and-reporting": "pie", "digital-marketing-audit": "gauge",
  "website-development": "browser", "custom-software-development": "code", "web-application-development": "scanner", "mobile-app-development": "phone",
  "e-commerce-development": "gift", "saas-development": "gauge", "crm-development": "funnel", "erp-development": "ledger", "custom-business-applications": "survey",
  "ui-ux-design": "studio", "api-development-and-integration": "flow", "cloud-and-devops-services": "cloud", "ai-and-automation-solutions": "bot",
  "data-analytics-and-dashboard-development": "pie", "software-testing-and-qa": "tests", "cybersecurity-services": "shield", "website-maintenance-and-support": "calendar",
  "application-maintenance-and-support": "chat", "it-consulting": "report",
  "accounting-and-bookkeeping-services": "ledger", "tax-planning-and-advisory": "calc", "income-tax-and-itr-filing": "taxform", "gst-services": "briefing",
  "tds-services": "tests", "payroll-services": "payslip", "financial-planning-and-advisory": "horizon", "business-finance-services": "coins",
  "startup-and-sme-accounting": "calendar", "mis-and-financial-reporting": "report", "budgeting-and-financial-forecasting": "pie", "audit-and-compliance-support": "lens",
  "virtual-cfo-services": "gauge", "corporate-finance-advisory": "flow", "investment-planning": "chart", "due-diligence-and-financial-analysis": "scanner",
  "accounting-and-finance-consulting": "chat",
};
const PV_FAM = { "market-research": ["mr", "Request a quote", "/lets-talk?type=quote"], "digital-marketing": ["dm", "Plan it with us", "/lets-talk?type=digital"], "it-development": ["it", "Start a project", "/lets-talk?type=it"], "accounts-finance": ["af", "Talk to our finance team", "/lets-talk?type=finance"] };
const PV_FALL = { mr: ["chart", "survey", "globe", "report"], dm: ["social", "funnel", "serp", "calendar"], it: ["code", "browser", "cloud", "tests"], af: ["ledger", "pie", "calc", "coins"] };
function pvServiceEntries() {
  const out = [];
  (VERTICALS || []).forEach((V) => {
    const f = PV_FAM[V.slug];
    if (!f || !Array.isArray(V.services)) return;
    V.services.forEach((S, i) => {
      const scene = PV_SVC_DESIGN[S.slug] || PV_FALL[f[0]][i % 4];
      out.push(v("svc-" + V.slug + "-" + S.slug, V.name + ": " + S.name, "/services/" + V.slug + "/" + S.slug, {
        template: scene, family: f[0], tone: i % 4, flip: i % 2 === 1,
        eyebrow: V.name, title: S.name, em: "", lede: S.summary || "",
        points: (S.includes || []).slice(0, 4), cta: { label: f[1], to: f[2] },
      }));
    });
  });
  return out;
}

/* the designs: [id, name, what it looks like] */
const PV_TEMPLATES = [
  ["premiere", "Premiere night", "Cinema curtains open on the screen, marquee lights, ticket-stub highlights"],
  ["briefing", "Briefing room", "A case file with an official stamp and briefing notes next to the screen"],
  ["studio", "Studio wall", "The video as a big pinned photo on a studio wall, with notes taped beside it"],
  ["horizon", "North star", "Compass rings behind the screen, with a mission card and a vision card"],
  ["filmstrip", "Film strip", "The video inside a film frame, with the years running along a timeline"],
  ["backstage", "Backstage pass", "A swinging crew pass on a lanyard next to the screen"],
  ["scanner", "Scanner", "Scan corners and a moving scan line around the screen"],
  ["bubbles", "Opinion bubbles", "Speech bubbles and live poll bars around the screen"],
  ["gift", "Gift box", "The screen wrapped like a gift with a ribbon, rewards in three steps"],
  ["pulse", "Heartbeat", "A heartbeat line across the top and health vitals cards"],
  ["campaign", "Campaign dashboard", "The video as a social post, with live campaign numbers around it"],
  ["spotlight", "Spotlight", "A clean stage with one spotlight: fits any page"],
  ...Object.entries(PV_SCENES).map(([id, n]) => [id, n, "Scene design: an animated " + n.toLowerCase() + " next to the screen"]),
];

const v = (id, page, path, o) => ({ id, page, path, match: "exact", section: "", url: "", template: "spotlight", eyebrow: "", title: page, em: "", lede: "", points: [], cta: { label: "", to: "" }, ...o });

const PV_BUILTIN = [
  v("home", "Home", "/", {
    url: "https://youtu.be/8S6Ia6w8pms",
    template: "premiere",
    eyebrow: "Welcome",
    title: "This is",
    em: "Frequent Research.",
    lede: "One team for market research, digital marketing, IT development and accounts & finance, working with clients in 55 countries since 2015.",
    points: ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"],
    cta: { label: "Talk to our team", to: "/lets-talk" },
  }),
  v("government", "Government Research", "/government-opinion-research", {
    match: "prefix",
    url: "https://youtu.be/wvpXKq00NL4",
    template: "briefing",
    eyebrow: "Public sector briefing",
    title: "Evidence for",
    em: "public decisions.",
    lede: "Surveys for departments, agencies and public bodies that need reliable evidence from citizens, users and stakeholders.",
    points: ["Citizen and public service surveys", "Policy awareness and impact", "Scheme and programme evaluation", "Household and rural fieldwork"],
    cta: { label: "Discuss a public sector study", to: "/lets-talk?type=quote" },
  }),
  v("about", "About Us", "/about-us", {
    url: "https://youtu.be/zMY_KjJ8j0s",
    template: "studio",
    eyebrow: "Meet the team",
    title: "Who we are,",
    em: "in our own words.",
    lede: "The people, the places and the way we work: one accountable team for research, marketing, technology and finance.",
    points: ["Started in 2015", "Clients in 55 countries", "58 industries served"],
    cta: { label: "Meet our team", to: "/our-team" },
  }),
  v("mission", "Our Mission & Vision", "/about-us", {
    section: "#ab21-mv-h",
    url: "https://youtu.be/s9R4CB7NmhI",
    template: "horizon",
    eyebrow: "Mission & vision",
    title: "Why we exist,",
    em: "and where we're headed.",
    lede: "Answers every business can trust, and the tools to act on them: research, marketing, technology and finance from one accountable team.",
    points: ["Our mission: answers you can trust, wherever you work", "Our vision: one partner for every decision that needs evidence", "Our values: evidence first, one owner, honest results"],
    cta: { label: "Read our story", to: "/about-us" },
  }),
  v("journey", "Our Journey", "/our-journey", {
    url: "https://youtu.be/VguDL80K6y4",
    template: "filmstrip",
    eyebrow: "Our journey",
    title: "From 2015",
    em: "to today.",
    lede: "How a market research and digital marketing team grew into panels, healthcare research, IT, Sampledge and finance.",
    points: ["2015 · Market research and digital marketing", "2017 · Turn2Opinion and MyFrequentRewards", "2018 · MyHealthOpinions", "2020 · Sampledge and IT", "2022 · Finance & accounts"],
    cta: { label: "See every milestone", to: "/our-journey" },
  }),
  v("careers", "Careers", "/careers", {
    url: "https://youtu.be/DqoNpGmpcqc",
    template: "backstage",
    eyebrow: "Life at Frequent Research",
    title: "Come work",
    em: "with us.",
    lede: "Research markets, grow brands, build software or manage finances for clients around the world. Learn fast, own real work and grow across four disciplines.",
    points: ["Real work from week one", "Four disciplines to grow in", "Clients around the world"],
    cta: { label: "Apply now", to: "/careers#cr-apply" },
  }),
  v("connect", "QR & Connect", "/connect", {
    url: "https://youtu.be/euWdgxLd0pk",
    template: "scanner",
    eyebrow: "Scan & connect",
    title: "Scan once,",
    em: "stay connected.",
    lede: "Follow us, join our panels and reach Sampledge: every code on this page opens the right place on your phone.",
    points: ["Our social channels", "Our three panels", "Sampledge products"],
    cta: { label: "Follow us on YouTube", to: "https://www.youtube.com/@frequentresearch" },
  }),
  v("turn2opinion", "Turn2Opinion panel", "/portals/turn2opinion", {
    url: "https://youtu.be/9WwyCMOozsQ",
    template: "bubbles",
    eyebrow: "Turn2Opinion",
    title: "Share your opinion.",
    em: "Get rewarded.",
    lede: "Our consumer and business panel: take surveys on products and services, help shape what comes next and earn rewards.",
    points: ["Sign up free", "Take surveys", "Claim rewards"],
    cta: { label: "Join Turn2Opinion", to: "https://www.turn2opinion.com/" },
  }),
  v("myfrequentrewards", "MyFrequentRewards panel", "/portals/myfrequentrewards", {
    url: "https://youtu.be/WtviSqm8rEE",
    template: "gift",
    eyebrow: "MyFrequentRewards",
    title: "Your opinions,",
    em: "rewarded.",
    lede: "A worldwide survey community with a low reward threshold, for consumers, business professionals and teens aged 13 to 17.",
    points: ["Join the community", "Answer surveys", "Redeem your rewards"],
    cta: { label: "Join MyFrequentRewards", to: "https://www.myfrequentrewards.com/" },
  }),
  v("myhealthopinions", "MyHealthOpinions panel", "/portals/myhealthopinions", {
    url: "https://youtu.be/dYAhbVpQsXw",
    template: "pulse",
    eyebrow: "MyHealthOpinions",
    title: "Your experience can",
    em: "improve healthcare.",
    lede: "Our healthcare panel for physicians, nurses, pharmacists, patients and caregivers.",
    points: ["Physicians & specialists", "Nurses, pharmacists & allied HCPs", "Patients & caregivers"],
    cta: { label: "Join MyHealthOpinions", to: "https://www.myhealthopinions.com/" },
  }),
  v("digital-marketing", "Digital Marketing services", "/services/digital-marketing", {
    match: "prefix",
    url: "https://youtu.be/0WsQaHxogPo",
    template: "campaign",
    eyebrow: "Digital marketing",
    title: "Campaigns that",
    em: "move the numbers.",
    lede: "SEO, paid ads, social media and content, planned around your goals and reported honestly.",
    points: ["SEO", "Google Ads", "Social media", "Content"],
    cta: { label: "Plan a campaign with us", to: "/lets-talk?type=digital" },
  }),
  /* pages ready for a video: paste a link in the super admin and the page shows it in its design */
  v("market-research", "Market Research services", "/services/market-research", { match: "prefix", template: "chart", family: "mr", eyebrow: "Market research", title: "Research you can", em: "act on.", lede: "From study design and fieldwork to the final report, in 55 countries.", points: ["Study design", "Fieldwork", "Analysis & reporting"], cta: { label: "Request a quote", to: "/lets-talk?type=quote" } }),
  v("it", "IT & Development services", "/services/it-development", { match: "prefix", template: "code", family: "it", tone: 1, eyebrow: "IT & development", title: "Software built", em: "to last.", lede: "Websites, apps and custom software, built and looked after by one team.", points: ["Websites", "Mobile apps", "Custom software"], cta: { label: "Start a project", to: "/lets-talk?type=it" } }),
  v("finance", "Accounts & Finance services", "/services/accounts-finance", { match: "prefix", template: "ledger", family: "af", eyebrow: "Accounts & finance", title: "Books in order,", em: "every month.", lede: "Bookkeeping, tax and payroll handled by one accountable team.", points: ["Bookkeeping", "Tax", "Payroll"], cta: { label: "Talk to our finance team", to: "/lets-talk?type=finance" } }),
  v("services", "All services", "/services", { template: "premiere", eyebrow: "Our services", title: "Four teams,", em: "one partner.", lede: "Market research, digital marketing, IT development and accounts & finance.", points: ["Market Research", "Digital Marketing", "IT & Development", "Accounts & Finance"], cta: { label: "Talk to us", to: "/lets-talk" } }),
  v("products", "Sampledge products", "/products", { match: "prefix", template: "campaign", eyebrow: "Sampledge", title: "Seven products,", em: "one ecosystem.", lede: "Software for research operations and for running a business.", points: ["SampCode", "SampBidx", "SampTrek", "SampAudience", "SampForce", "Talk2Tax", "SampCrew"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("industries", "Industries & case studies", "/industries-case-studies", { match: "prefix", template: "filmstrip", eyebrow: "Industries", title: "58 industries,", em: "real results.", lede: "How we have helped clients across sectors.", points: ["Case studies", "Sector expertise", "Results"], cta: { label: "Browse case studies", to: "/industries-case-studies" } }),
  v("team", "Our team", "/our-team", { template: "studio", eyebrow: "Our team", title: "The people", em: "behind the work.", lede: "Meet the team that runs your projects.", points: ["Research", "Marketing", "Technology", "Finance"], cta: { label: "Join us", to: "/careers" } }),
  v("reach", "Our reach", "/our-reach", { template: "horizon", eyebrow: "Our reach", title: "55 countries,", em: "one standard.", lede: "Where we work and who we reach.", points: ["5 regions", "55 countries", "58 industries"], cta: { label: "Talk to us", to: "/lets-talk" } }),
  v("portals", "Panel portals", "/portals", { template: "bubbles", eyebrow: "Our panels", title: "Three communities,", em: "one standard.", lede: "Turn2Opinion, MyFrequentRewards and MyHealthOpinions.", points: ["Turn2Opinion", "MyFrequentRewards", "MyHealthOpinions"], cta: { label: "See our panels", to: "/portals" } }),
  v("downloads", "Downloads", "/downloads", { match: "prefix", template: "briefing", eyebrow: "Downloads", title: "Panel books", em: "and brochures.", lede: "Everything you can download from us, in one place.", points: ["Panel books", "Brochures", "Quality documents"], cta: { label: "Browse downloads", to: "/downloads" } }),
  v("blog", "Blog & insights", "/blog", { match: "prefix", template: "studio", eyebrow: "Insights", title: "Ideas from", em: "our team.", lede: "What we learn from the work we do.", points: ["Research", "Marketing", "Technology"], cta: { label: "Read the blog", to: "/blog" } }),
  v("gallery", "Gallery", "/gallery", { template: "filmstrip", eyebrow: "Gallery", title: "Life at", em: "Frequent Research.", lede: "Festivals, awards and the moments in between.", points: ["Festivals", "Awards", "Birthdays"], cta: { label: "Open the gallery", to: "/gallery" } }),
  v("contact", "Let's talk", "/lets-talk", { template: "spotlight", eyebrow: "Let's talk", title: "Tell us", em: "what's next.", lede: "One message reaches the right team.", points: ["Market research", "Digital marketing", "IT", "Accounts & finance"], cta: { label: "Send us a message", to: "/lets-talk" } }),
  v("insights", "Insights", "/insights", { template: "report", family: "fr", tone: 1, eyebrow: "Insights", title: "What the data", em: "is telling us.", lede: "Research notes, trends and lessons from our projects.", points: ["Trends", "Research notes", "Lessons from projects"], cta: { label: "Read our insights", to: "/insights" } }),
  v("esomar", "ESOMAR 37 questions", "/esomar-37", { template: "tests", family: "mr", tone: 2, flip: true, eyebrow: "ESOMAR 37", title: "Our answers to", em: "the 37 questions.", lede: "How we recruit, profile and protect respondents, and how we check data quality.", points: ["Panel recruitment", "Data quality", "Privacy"], cta: { label: "Read the answers", to: "/esomar-37" } }),
  v("privacy", "Privacy & data protection", "/privacy-data-protection", { template: "shield", family: "fr", tone: 3, eyebrow: "Privacy", title: "Your data,", em: "protected.", lede: "How we collect, store and protect personal data.", points: ["Consent", "Security", "Your rights"], cta: { label: "Read our privacy policy", to: "/privacy-data-protection" } }),
  v("sampcode", "SampCode", "/products/sampcode", { template: "code", family: "it", tone: 2, eyebrow: "SampCode", title: "Write. Run.", em: "Ship.", lede: "Survey programming, QA and fieldwork on one survey definition.", points: ["Write", "Test", "Field", "Analyse"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("sampbidx", "SampBidx", "/products/sampbidx", { template: "calc", family: "af", tone: 2, flip: true, eyebrow: "SampBidx", title: "Paste the spec.", em: "Win the study.", lede: "Turns a client's RFQ into a priced, approved, ready-to-send proposal.", points: ["Capture", "Price", "Propose", "Win"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("samptrek", "SampTrek", "/products/samptrek", { template: "flow", family: "mr", tone: 3, eyebrow: "SampTrek", title: "Keep every project", em: "on track.", lede: "Research project management and fieldwork, from won bid to paid invoice.", points: ["Set up", "Field", "Reconcile", "Invoice"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("sampaudience", "SampAudience", "/products/sampaudience", { template: "globe", family: "mr", tone: 1, flip: true, eyebrow: "SampAudience", title: "Ask the world.", em: "Hear back.", lede: "Audience marketplace and supply execution for research.", points: ["Define", "Match", "Launch", "Report"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("sampforce", "SampForce", "/products/sampforce", { template: "funnel", family: "dm", tone: 0, eyebrow: "SampForce", title: "Sell. Close.", em: "Grow.", lede: "AI-native revenue platform: CRM, outreach, automation and AI agents.", points: ["Capture", "Engage", "Close", "Grow"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("talk2tax", "Talk2Tax", "/products/talk2tax", { template: "taxform", family: "af", tone: 1, flip: true, eyebrow: "Talk2Tax", title: "Talk. File.", em: "Relax.", lede: "AI-native accounting, tax and finance: ask your books anything.", points: ["Books", "India tax", "Ask", "Plan"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  v("sampcrew", "SampCrew", "/products/sampcrew", { template: "payslip", family: "dm", tone: 2, eyebrow: "SampCrew", title: "People,", em: "simplified.", lede: "AI-native HR and workforce platform: hire, pay, schedule and grow your people.", points: ["People", "Pay", "Hire & grow", "Understand"], cta: { label: "Visit sampledge.com", to: "https://sampledge.com" } }),
  // build 83.1: SampConnect. url stays empty here; the video is set in Super admin → Page videos
  v("sampconnect", "SampConnect", "/products/sampconnect", { template: "chat", family: "it", tone: 1, flip: true, eyebrow: "SampConnect", title: "Every conversation.", em: "On your servers.", lede: "Private chat, video, AI and approvals for global research teams, with the Sampledge suite built in.", points: ["Chat", "Calls", "Private AI", "Approvals"], cta: { label: "Explore SampConnect", to: "/products/sampconnect" } }),
  v("reviews", "Rates & reviews", "/rates-reviews", { template: "bubbles", eyebrow: "Reviews", title: "What clients", em: "say about us.", lede: "Real reviews from real clients.", points: ["Rate us", "Read reviews", "Share your experience"], cta: { label: "Write a review", to: "/rates-reviews" } }),
];

const PV_LIST = cmsList("page-videos", PV_BUILTIN.concat(pvServiceEntries()), "id");

export { PV_LIST, PV_SCENES, PV_TEMPLATES };
