/*
 * Google Ads / PPC — /services/digital-marketing/google-ads-ppc (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on the shared RL_Page structure (src/components/dm/kit4.jsx).
 * USP: audience intelligence + intent + experimentation + commercial measurement —
 * "Put Your Budget Behind Evidence, Not Assumptions." Hero visual: HV_IntentBudget.
 * Kept custom visuals: problem cards, keyword intent, funnel, landing message match, account audit.
 * No case study, no team details, no ROAS or lead guarantees, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Count, PP_Head, PpI, PpL, ppDm, ppGo, ppIn, ppR } from '../components/dm/shared.jsx';
import { DK_BUDGET } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_IntentBudget } from '../components/dm/heroes.jsx';

const PP_URL = "/services/digital-marketing/google-ads-ppc";
const PP_TITLE = "Google Ads & PPC Management Services | Frequent Research";
const PP_FORM = "ppc-consult";

const PP_CAPS = [
  ["Google Search Ads", "search"],
  ["Performance Max", "layers"],
  ["Display Advertising", "grid"],
  ["Remarketing", "refresh"],
  ["Keyword Strategy", "tag"],
  ["Bid Management", "sliders"],
  ["Conversion Tracking", "target"],
  ["Landing Page Optimisation", "file"],
  ["GA4", "bars"],
  ["Google Tag Manager", "box"],
  ["AI-Assisted Optimisation", "cpu"],
];

const PP_PROBS = [
  ["Clicks without customers", "Traffic increases, but enquiries don't.", "clicks"],
  ["Broad targeting", "Your ads reach people who were never likely to buy.", "scatter"],
  ["Weak intent signals", "The keyword looks attractive, but the searcher isn't commercially ready.", "thermo"],
  ["Poor conversion tracking", "You can't tell which campaign, keyword or audience actually generated revenue.", "chain"],
  ["Budget leakage", "Spend goes toward low-value clicks instead of high-intent opportunities.", "leak"],
];

function PP_ProbVis({ t }) {
  if (t === "clicks")
    return (
      <div className="pp-pv pp-pv--clicks">
        <span>
          <i style={{ "--h": "92%" }} />
          Clicks
        </span>
        <span>
          <i style={{ "--h": "14%" }} />
          Enquiries
        </span>
      </div>
    );
  if (t === "scatter")
    return (
      <div className="pp-pv pp-pv--scatter">
        <svg viewBox="0 0 120 70">
          <circle cx="60" cy="35" r="12" className="tg" />
          <circle cx="60" cy="35" r="24" className="tg2" />
          {[[12, 10], [100, 14], [20, 58], [96, 60], [40, 8], [84, 40], [8, 36], [112, 34], [62, 36]].map(([x, y], k) => (
            <circle key={k} cx={x} cy={y} r="3" className={k === 8 ? "hit" : "miss"} style={{ "--k": k }} />
          ))}
        </svg>
      </div>
    );
  if (t === "thermo")
    return (
      <div className="pp-pv pp-pv--thermo">
        {["Curious", "Researching", "Comparing", "Ready"].map((x, k) => (
          <span key={x} className={k === 0 ? "is-on" : ""} style={{ "--k": k }}>
            {x}
          </span>
        ))}
      </div>
    );
  if (t === "chain")
    return (
      <div className="pp-pv pp-pv--chain">
        {["Campaign", "Keyword", "?", "Revenue"].map((x, k) => (
          <span key={k} className={x === "?" ? "is-gap" : ""}>
            {x}
          </span>
        ))}
      </div>
    );
  return (
    <div className="pp-pv pp-pv--leak">
      <svg viewBox="0 0 120 70">
        <path d="M14 8 H106 L74 40 V62 H46 V40 Z" className="fn" />
        {[0, 1, 2].map((k) => (
          <circle key={k} cx={30 + k * 30} cy="44" r="2.6" className="drop" style={{ "--k": k }} />
        ))}
      </svg>
    </div>
  );
}

function PP_Problem() {
  const [ref, v] = ppIn(0.2);
  return (
    <section ref={ref} className={"pp-prob" + (v ? " is-in" : "")} aria-labelledby="pp-prob-h">
      <div className="container">
        <PP_Head
          k="The real PPC problem"
          id="pp-prob-h"
          t="The Problem Isn't Always Your Ad Budget"
          s="Most underperforming Google Ads accounts don't need more money. They need sharper targeting, clearer intent and honest measurement."
          center
        />
        <div className="pp-prob__grid pp-swipe">
          {PP_PROBS.map(([t, d, vis], k) => (
            <article key={t} className="pp-prob__c" style={{ "--k": k }}>
              <span className="pp-prob__n">{String(k + 1).padStart(2, "0")}</span>
              <PP_ProbVis t={vis} />
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const PP_KW = [
  ["High intent", ["buy", "request", "hire", "quote"], "High", 95, "hi"],
  ["Commercial", ["trusted", "service", "agency", "provider"], "High", 82, "hi"],
  ["Research", ["compare", "options", "guide"], "Medium", 55, "md"],
  ["Informational", ["what is", "how does"], "Low–Medium", 32, "lo"],
  ["Irrelevant", ["unrelated searches"], "Exclude", 6, "ex"],
];

const PP_KWF = ["Industry", "Buying cycle", "Geography", "Product", "Competition", "Budget", "Conversion objective"];

function PP_Keywords() {
  const [ref, v] = ppIn(0.25);
  return (
    <section ref={ref} className={"pp-kw" + (v ? " is-in" : "")} aria-labelledby="pp-kw-h">
      <div className="container">
        <PP_Head
          k="Google Ads keywords"
          id="pp-kw-h"
          t="Not Every Keyword Deserves Your Budget"
          s="We sort search terms by intent before deciding where money should go. The priority shown is a typical starting point — not a universal rule."
        />
        <div className="pp-kw__tbl" role="table" aria-label="Keyword intent priority matrix">
          <div className="pp-kw__hd" role="row">
            <span role="columnheader">Intent</span>
            <span role="columnheader">Typical modifiers</span>
            <span role="columnheader">Priority</span>
          </div>
          {PP_KW.map(([t, ex, p, w, c], k) => (
            <div key={t} className={"pp-kw__r pp-kw__r--" + c} role="row" style={{ "--k": k }}>
              <span role="cell" className="pp-kw__t">
                {t}
              </span>
              <span role="cell" className="pp-kw__ex">
                {ex.map((x, j) => (
                  <i key={x} style={{ "--j": j }}>
                    {x}
                  </i>
                ))}
              </span>
              <span role="cell" className="pp-kw__p">
                <b>{p}</b>
                <i aria-hidden="true">
                  <em style={{ "--w": w + "%" }} />
                </i>
              </span>
            </div>
          ))}
        </div>
        <div className="pp-kw__dep">
          <b>Your keyword strategy depends on:</b>
          {PP_KWF.map((t, k) => (
            <span key={t} style={{ "--k": k }}>
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

const PP_FUN = [
  ["Awareness", "Display / broad discovery", "Impressions · reach"],
  ["Consideration", "Search / remarketing", "CTR · engaged visits"],
  ["Intent", "High-value search terms", "Search-term quality · CPC"],
  ["Conversion", "Lead / enquiry / purchase / call", "Conversion rate · CPA"],
  ["Retention", "Remarketing / repeat purchase", "Repeat rate · ROAS"],
];

function PP_Funnel() {
  const [ref, v] = ppIn(0.3);
  return (
    <section ref={ref} className={"pp-fun" + (v ? " is-in" : "")} aria-labelledby="pp-fun-h">
      <div className="container">
        <PP_Head k="The Google Ads funnel" id="pp-fun-h" t="The Right Campaign for Every Stage" light center />
        <ol className="pp-fun__row">
          {PP_FUN.map(([t, c, m], k) => (
            <li key={t} style={{ "--k": k, "--h": 100 - k * 13 }}>
              <span className="pp-fun__bar" aria-hidden="true" />
              <b>{t}</b>
              <small>{c}</small>
              <em>
                <PpI n="bars" s={12} />
                {m}
              </em>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const PP_AUDIT = [
  "Account structure",
  "Campaign settings",
  "Search terms",
  "Keywords",
  "Match types",
  "Negative keywords",
  "Ad relevance",
  "Landing pages",
  "Conversion tracking",
  "Budget allocation",
  "Audience targeting",
  "Performance trends",
];

function PP_Audit() {
  const [ref, v] = ppIn(0.3);
  const [n, setN] = ee.useState(ppR() ? PP_AUDIT.length : 0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setN(i);
      if (i >= PP_AUDIT.length) clearInterval(t);
    }, 170);
    return () => clearInterval(t);
  }, [v]);
  return (
    <section ref={ref} className={"pp-aud" + (v ? " is-in" : "")} aria-labelledby="pp-aud-h">
      <div className="container pp-aud__in">
        <div>
          <PP_Head
            k="Google Ads audit"
            id="pp-aud-h"
            t="Already Running Google Ads?"
            light
            s="Don't automatically rebuild everything. An audit shows what to keep, what to fix and where budget is leaking."
          />
          <div className="pp-aud__count">
            <b>
              <PP_Count to={12} v={v} />
            </b>
            <span>
              checkpoints across
              <br />
              your account
            </span>
          </div>
          <a href="#ppc-consult" onClick={ppGo("ppc-consult")} className="btn btn--lg pp-btn">
            Request a PPC Audit <span aria-hidden="true">→</span>
          </a>
          <p className="pp-links pp-links--light">
            Need a wider view? See our <PpL to={ppDm("digital-marketing-audit")}>digital marketing audit</PpL>.
          </p>
        </div>
        <div className="pp-aud__scan">
          <i className="pp-aud__beam" aria-hidden="true" />
          <ul>
            {PP_AUDIT.map((t, k) => (
              <li key={t} className={k < n ? "is-ok" : ""}>
                <span aria-hidden="true">
                  <PpI n="check" s={12} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

const PP_LPF = ["Ad", "Message match", "Landing page", "Trust", "CTA", "Conversion", "CRM / Analytics"];

function PP_Landing() {
  const [ref, v] = ppIn(0.3);
  return (
    <section ref={ref} className={"pp-lp" + (v ? " is-in" : "")} aria-labelledby="pp-lp-h">
      <div className="container pp-lp__in">
        <div>
          <PP_Head
            k="Landing page & CRO"
            id="pp-lp-h"
            t="The Click Is Only Half the Job"
            s={
              <>
                PPC doesn't exist apart from your website. A high-performing campaign needs a strong post-click experience — that's where our{" "}
                <PpL to={ppDm("landing-page-and-cro")}>landing page & CRO</PpL> work comes in.
              </>
            }
          />
          <ol className="pp-lp__flow">
            {PP_LPF.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        </div>
        <div className="pp-lp__vis" aria-hidden="true">
          <div className="pp-lp__ad">
            <small>Sponsored</small>
            <b>Industrial pumps — request a quote</b>
            <span>Fast quotes · Spares in stock</span>
          </div>
          <svg className="pp-lp__wire" viewBox="0 0 60 120">
            <path d="M30 0 V120" />
          </svg>
          <div className="pp-lp__page">
            <div className="pp-lp__bar">
              <i />
              <i />
              <i />
            </div>
            <b className="pp-lp__h">Request a pump quote</b>
            <span className="pp-lp__tag pp-lp__tag--1">Message match</span>
            <i className="pp-lp__line" />
            <i className="pp-lp__line s" />
            <div className="pp-lp__trust">
              <i />
              <i />
              <i />
            </div>
            <span className="pp-lp__tag pp-lp__tag--2">Trust</span>
            <b className="pp-lp__cta">Get my quote</b>
            <span className="pp-lp__tag pp-lp__tag--3">Clear CTA</span>
          </div>
        </div>
      </div>
    </section>
  );
}

const PP_FAQ = [
  ["What is included in Google Ads management?", "Account and campaign structure, keyword and audience strategy, ad copy testing, bid and budget management, conversion tracking, landing-page recommendations, reporting and ongoing optimisation across Search, Performance Max, Display and remarketing."],
  ["How is your approach to PPC different?", "Budget follows evidence about intent and audience value rather than assumptions or the cheapest clicks. Search behaviour, segments, messages and landing pages are tested and read together, and success is judged by qualified actions and business signals."],
  ["How does AI support Google Ads?", "Automated bidding and AI-assisted analysis help with search-term mining, pattern detection, anomaly alerts and reporting. People set strategy, check what automation is optimising for and approve changes."],
  ["How much does Google Ads cost?", "There is no fixed price: costs vary with industry, competition, location, keywords, audience and objectives, and you control the budget you set."],
  ["What do you measure?", "Clicks and cost, but also landing-page behaviour, qualified conversions and — where CRM data is available — which campaigns contribute to pipeline or sales."],
  ["Can you manage or audit an existing account?", "Yes. The current account is reviewed first, then restructured, tracking fixed and optimised rather than rebuilt by default."],
  ["What is the difference between Google Ads and SEO?", "Google Ads buys paid visibility that can start quickly, while SEO earns organic visibility over time; used together, they often complement each other."],
  ["Do you guarantee Google Ads results?", "No. No responsible provider can guarantee clicks, leads, ROAS or revenue, because auction conditions and market behaviour keep changing."],
];

const PP_CFG = {
  key: "ppc",
  pfx: "pp",
  cls: "ppc2",
  url: PP_URL,
  title: PP_TITLE,
  maTitle: "Google Ads & PPC Management Services",
  desc: "Google Ads and PPC management that puts budget behind evidence — intent, audience segments, message testing and landing pages measured on qualified action.",
  crumb: "Google Ads / PPC",
  name: "Google Ads & PPC Management",
  serviceType: "Pay-per-click advertising management",
  schemaDesc:
    "Google Ads PPC management: audience intelligence, intent understanding, segmentation, Search, Performance Max, Display and remarketing campaigns, message testing, bid and budget management, conversion tracking, landing-page alignment and commercial measurement.",
  formId: PP_FORM,
  hero: {
    dark: true,
    kicker: "Intent intelligence · Google Ads PPC",
    h1: "Google Ads & PPC Management",
    tag: "Put Your Budget Behind Evidence, Not Assumptions.",
    lead: "Rather than optimising only for cheaper clicks, the approach connects search intent, audience segments, message testing and the landing experience — so spend moves toward the people most likely to act and the signals that matter to the business.",
    cta: "Review Your Paid Search Strategy",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Intent understanding", "Audience segments", "Message testing", "Conversion quality", "AI-assisted, human-led"],
    vis: <HV_IntentBudget />,
  },
  statement: ["A cheap click from the wrong person is still expensive.", ["Search intent", "Audience segment", "Ad message", "Landing page", "Conversion", "Business signal"]],
  caps: PP_CAPS,
  problemNode: <PP_Problem />,
  versus: {
    kicker: "Intelligence behind the activation",
    title: "Click-First PPC vs Evidence-Led PPC",
    sub: "Both use Google Ads. One optimises the auction; the other optimises the decision behind the search.",
    conv: ["Keywords", "Ads", "Clicks", "CPC report"],
    fr: ["Audience", "Search behaviour", "Intent", "Segments", "Message test", "Landing page", "Qualified action", "Learning", "Budget shift"],
  },
  diff: {
    kicker: "What changes when PPC starts with intent",
    title: "Budget That Follows Evidence",
    sub: "How this approach to Google Ads differs — question by question.",
    answers: [
      "Builds campaigns around keyword lists, optimises bids toward cheaper clicks or more conversions of any kind, and reports CTR, CPC and conversion counts.",
      "It starts with which searches signal real business intent, which segments are worth paying for and what a meaningful action looks like — then tests messages and pages against that.",
      "Search terms show what people type. Audience and intent analysis explain what they need to hear and which segments create value.",
      "Paid search becomes a fast feedback loop on demand: which needs, messages and segments respond — useful well beyond the ad account.",
      "Business objectives, conversion definitions, tracking accuracy, audience segments and the landing experience are reviewed before spend scales.",
      "Search terms, landing-page behaviour and conversion quality are analysed so budget, messaging and pages improve every cycle.",
      "PPC shares intent data with SEO, aligns with landing pages, feeds remarketing and email, and reports through the same analytics view.",
      "AI and automated bidding find patterns in search terms, flag anomalies and speed up analysis and reporting.",
      "People decide what a valuable conversion is, check what automation is really optimising for, protect brand and approve changes.",
      "Paid search that contributes to qualified enquiries, pipeline or sales — not just traffic.",
    ],
  },
  layers: {
    title: "What Informs Every Budget Decision",
    rows: [
      ["Intent", "search", "Keyword match types and volumes", "Search intent grouped by buying stage and business value"],
      ["Audience", "users", "Platform audience presets", "Segments defined by need, role or value — validated where uncertain"],
      ["Message", "msg", "Ad variants tested on CTR", "Messages tested against what each segment needs to hear"],
      ["Landing page", "file", "Traffic sent to an existing page", "Message match and friction analysed after the click"],
      ["Conversion", "target", "Every form or call counted the same", "Meaningful actions separated from low-value ones"],
      ["Budget", "sliders", "Bids pushed toward cheaper clicks", "Spend moved toward intent that creates business value"],
    ],
  },
  loop: {
    title: "How Google Ads Works: Intelligence to Impact",
    center: "Intent intelligence",
    texts: [
      "Understand the business model, customer value, sales process and who is worth reaching.",
      "Discover search behaviour, competitor activity and the intent behind high-value searches.",
      "Define segments, intent groups, conversion definitions and messages to test.",
      "Activate Search, Performance Max, Display and remarketing with matched landing pages.",
      "Measure search-term quality, landing behaviour, qualified conversions and business signals.",
      "Learn which intent, segments and messages create value — and why.",
      "Improve budgets, keywords, ads and pages through controlled experiments.",
      "Grow by scaling what the evidence supports.",
    ],
  },
  capabilities: {
    title: "Google Ads PPC Management, End to End",
    sub: "Google Ads (formerly Google AdWords) has many moving parts. Select a capability.",
    layers: [
      ["Google Search Ads", "search", ["High-intent keywords", "Responsive search ads", "Ad extensions", "Negative keywords"], "Capture people actively looking for your product or service."],
      ["Performance Max", "layers", ["Asset groups", "Audience signals", "Feed and placements", "Guardrails"], "Use Google's cross-channel inventory with clear controls."],
      ["Display & remarketing", "refresh", ["Awareness audiences", "Remarketing lists", "Frequency control", "Creative variants"], "Re-engage people who showed interest."],
      ["Keyword & audience strategy", "tag", ["Intent grouping", "Segment definitions", "Exclusions", "Geography"], "Spend on relevant searches; exclude low-value traffic."],
      ["Ad copy & message testing", "msg", ["Hypotheses", "Variants", "Message-to-segment fit"], "Learn which messages each audience responds to."],
      ["Bid & budget management", "sliders", ["Bid strategies", "Budget allocation", "Pacing", "Seasonality"], "Allocate spend where evidence shows potential."],
      ["Conversion tracking", "target", ["GA4", "Google Tag Manager", "Offline / CRM conversions", "Call tracking"], "Connect clicks to meaningful actions."],
      ["Landing page & CRO", "file", ["Message match", "Trust", "Form friction"], "Improve the experience between click and conversion."],
    ],
  },
  ai: {
    sub: "Automation moves fast. Judgement decides the direction.",
    ai: [
      ["Search-term mining", "Groups thousands of search terms and flags irrelevant ones."],
      ["Smart bidding signals", "Uses auction-time signals within the limits you set."],
      ["Anomaly and budget alerts", "Spots sudden changes in cost, volume or conversion."],
      ["Ad variation ideas", "Drafts message variants for people to review and test."],
      ["Performance summaries", "Turns account data into readable summaries."],
    ],
    human: [
      ["What counts as a valuable conversion", "Defined with the business, not the platform."],
      ["Audience interpretation", "What the segments and search terms actually mean."],
      ["Brand and message decisions", "What the business should and shouldn't say."],
      ["Budget strategy", "Where to invest, test or hold back."],
      ["Final approval", "Every significant change is reviewed by a person."],
    ],
  },
  metrics: {
    tiers: [
      ["Impressions", "Clicks", "CTR", "CPC", "Impression share"],
      ["Engaged sessions", "Landing-page behaviour", "Search-term quality"],
      ["Qualified conversions", "Calls", "Enquiries", "Purchases", "Cost per qualified action"],
      ["Pipeline contribution", "Customer value", "Return on ad spend (where data allows)"],
    ],
    objectives: [
      ["Generate enquiries", [1, 2], "Conversion quality matters more than conversion count — landing behaviour and qualification are tracked together."],
      ["Sell online", [2, 3], "Purchases and value — not clicks — show whether campaigns create profitable demand."],
      ["Launch a new offer", [0, 1, 2], "Early campaigns are about learning which intent and messages respond."],
      ["Support B2B pipeline", [2, 3], "With CRM data, campaigns can be judged by qualified leads and pipeline, not form fills alone."],
    ],
  },
  learn: {
    title: "Every Campaign Should Teach the Next One",
    steps: [
      ["Campaign", "Launch an intent group with a matched ad and landing page."],
      ["Signal", "Search terms, landing behaviour, conversion quality."],
      ["Insight", "Which segments and messages create qualified action — and which only create clicks."],
      ["Decision", "Shift budget, add negatives, refine segments."],
      ["Experiment", "Test a new message, page or bidding approach."],
      ["Learning", "Record what moved qualified actions."],
      ["Better campaign", "The next budget starts from evidence, not assumptions."],
    ],
  },
  intel: {
    signals: [
      ["Search terms people use before buying", "search", ["Product", "Content", "Positioning"]],
      ["Messages that win the click — and the lead", "msg", ["Positioning", "Sales", "Content"]],
      ["Segments that convert but don't buy", "users", ["Sales", "Market strategy"]],
      ["Landing pages where people hesitate", "flag", ["Customer experience", "Content"]],
      ["Demand shifts by region or season", "trend", ["Market strategy", "Product"]],
    ],
  },
  why: {
    title: "Why Evidence-Led Google Ads",
    items: [
      ["Intent over clicks", "Budget follows business intent, not the cheapest auction.", "target"],
      ["Intent intelligence", "We read search terms for motivation, not just volume.", "search"],
      ["B2B and specialised audiences", "Campaign structures built for long, multi-person decisions.", "users"],
      ["Experimentation built in", "Messages, pages and bidding tested with clear hypotheses.", "flask"],
      ["Commercial measurement", "Ads, landing pages and business outcomes read together.", "bars"],
      ["Your accounts, your data", "Ad accounts, analytics and creatives stay yours.", "shield"],
    ],
  },
  related: {
    title: "Connect Paid Search to the Wider Journey",
    sub: "Search intent data is valuable beyond the ad account.",
    center: "Google Ads",
    links: [
      ["Landing Page & CRO", "Make the post-click experience continue the conversation the ad started.", ppDm("landing-page-and-cro"), "digital"],
      ["Performance Marketing", "Read Google Ads as part of the full funnel, not in isolation.", ppDm("performance-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Connect clicks to qualified actions, pipeline and value.", ppDm("digital-analytics-and-reporting"), "data"],
      ["Lead Generation", "Turn paid intent into qualified, sales-ready leads.", ppDm("lead-generation"), "digital"],
      ["SEO Services", "Share intent data so paid and organic search reinforce each other.", ppDm("seo-services"), "digital"],
    ],
  },
  faq: PP_FAQ,
  faqTitle: "Google Ads PPC: Frequently Asked Questions",
  faqAside: (
    <>
      Want the long version? Read our <PpL to="/blog/google-ads-ppc-guide">Google Ads & PPC guide</PpL>.
    </>
  ),
  final: {
    sig: "Put Your Budget Behind Evidence.",
    sigText: "Understand the audience. Capture the intent. Measure the action. Improve what creates value.",
    title: "Have a Paid Search Challenge That Needs More Than Bids?",
    text: "Tell us what you're trying to achieve, who you need to reach and what's getting in the way. We'll review your objectives, audience and current setup and suggest the right next step.",
  },
};

function PPC_Page() {
  return (
    <RL_Page
      c={{
        ...PP_CFG,
        visuals: (
          <>
            <PP_Keywords />
            <PP_Funnel />
            <PP_Landing />
          </>
        ),
        after: <PP_Audit />,
        formNode: (
          <DM_Form
            id={PP_FORM}
            kicker="Paid search review"
            title="Review Your Paid Search Strategy"
            sub="A few quick steps help us understand your goals before we talk."
            type="Google Ads / PPC Consultation"
            service="Google Ads / PPC"
            icon="target"
            submitLabel="Review My Paid Search Strategy"
            successTitle="Thank you. Your Google Ads consultation request has been sent."
            msgLabel="Anything else we should know? (optional)"
            nextSteps={["We review your goals, audience and current setup.", "We contact you within one working day.", "You get a clear recommended next step."]}
            chips={[
              { k: "goals", t: "Goals", q: "What are you trying to achieve?", label: "Goals", multi: true, options: ["More qualified enquiries", "More online sales", "Lower cost per qualified action", "Launch Google Ads", "Improve an existing account", "PPC audit", "Not sure yet"] },
              { k: "audience", t: "Audience", q: "Who are you trying to reach?", label: "Audience", options: ["Consumers", "Businesses (B2B)", "Healthcare professionals", "Both B2B and B2C", "Not sure yet"] },
              { k: "budget", t: "Budget", q: "Approximate monthly advertising budget", label: "Monthly ad budget", options: DK_BUDGET },
            ]}
          />
        ),
      }}
    />
  );
}

export { PPC_Page };
