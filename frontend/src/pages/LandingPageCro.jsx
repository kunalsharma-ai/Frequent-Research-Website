/*
 * Landing Page & CRO — /services/digital-marketing/landing-page-and-cro (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: research + UX + CRO —
 * Audience → Intent → Message → UX → Trust → Action → Measurement. Hero visual: HV_Anatomy.
 * Kept: LP_Match (message match), LP_Form (form before/after), LP_Heat (behaviour map), LP_AB (A/B test).
 * No case study, no team details, no invented uplift figures.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpL, ppDm, ppIn, ppR } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Sec } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Anatomy } from '../components/dm/heroes.jsx';

const LP_URL = "/services/digital-marketing/landing-page-and-cro";

const LP_TITLE = "Landing Page & CRO Services | Frequent Research";

const LP_FORM = "lp-consult";

function LP_Match() {
  return (
    <DK_Sec tone="light" className="lp-mm" label="lp-mm-h">
      <PP_Head
        k="Message match"
        id="lp-mm-h"
        t="The Click Should Match the Experience."
        s="Ad → intent → landing page → offer → CTA. It matters most for Google Ads, LinkedIn and social ads, SEO, email and content syndication."
        center
      />
      <div className="lp-mm__in">
        <div className="lp-mm__col lp-mm__col--bad">
          <h3>✕ Message mismatch</h3>
          <div className="lp-mm__ad">
            <small>Ad</small>
            <b>Industrial automation solutions</b>
          </div>
          <span className="lp-mm__arrow" aria-hidden="true">
            ↓
          </span>
          <div className="lp-mm__pg">
            <small>Landing page</small>
            <b>Generic company homepage</b>
          </div>
          <p>The visitor has to start searching again.</p>
        </div>
        <div className="lp-mm__col lp-mm__col--good">
          <h3>✓ Message continuity</h3>
          <div className="lp-mm__ad">
            <small>Ad</small>
            <b>Industrial automation solutions</b>
          </div>
          <span className="lp-mm__arrow" aria-hidden="true">
            ↓
          </span>
          <div className="lp-mm__pg">
            <small>Landing page</small>
            <b>Industrial Automation Solutions for Manufacturing Operations</b>
          </div>
          <p>The visitor knows they're in the right place.</p>
        </div>
      </div>
    </DK_Sec>
  );
}

const LP_FIELDS = [
  ["Name", 0],
  ["Work email", 0],
  ["Company", 0],
  ["Job title", 1],
  ["Phone", 1],
  ["Industry", 1],
  ["Company size", 1],
  ["Budget", 1],
  ["Address", 1],
  ["Message", 0],
];

function LP_Form() {
  const [after, setAfter] = ee.useState(false);
  return (
    <DK_Sec tone="off" className="lp-fm" label="lp-fm-h">
      <div className="lp-fm__in">
        <div>
          <PP_Head
            k="Form optimisation"
            id="lp-fm-h"
            t="Every Extra Field Has a Cost."
            s="Less friction → clearer intent → better experience. But shorter isn't always better: the right length depends on lead value, sales process, qualification needs, audience, intent and objective."
          />
          <div className="lp-fm__tg" role="group" aria-label="Show the form">
            <button type="button" aria-pressed={!after} onClick={() => setAfter(false)}>
              Before
            </button>
            <button type="button" aria-pressed={after} onClick={() => setAfter(true)}>
              After
            </button>
          </div>
        </div>
        <div className={"lp-fm__card" + (after ? " is-after" : "")} aria-live="polite">
          <ul>
            {LP_FIELDS.map(([t, cut]) => (
              <li key={t} className={cut ? "cut" : ""} aria-hidden={after && cut ? "true" : undefined}>
                {t}
                <small>{cut ? "ask later?" : "needed"}</small>
              </li>
            ))}
          </ul>
          <button type="button" className="lp-fm__go" tabIndex={-1} aria-hidden="true">
            Submit
          </button>
          <p className="pp-sr">{after ? "After: only the fields the conversion actually needs." : "Before: ten fields, several of which can be collected later."}</p>
        </div>
      </div>
    </DK_Sec>
  );
}

function LP_Heat() {
  const [ref, v] = ppIn(0.3);
  const blobs = [
    ["#EF4F5A", 16, 22, 120, 0.7],
    ["#F0D98F", 54, 18, 140, 0.8],
    ["#EF4F5A", 70, 58, 80, 0.6],
    ["#8FB1FF", 30, 70, 110, 0.55],
  ];
  const tags = [
    ["Clicks", 8, 12],
    ["Attention", 58, 8],
    ["Rage clicks", 64, 52],
    ["Dead zone", 20, 82],
    ["Form abandonment", 46, 72],
  ];
  return (
    <section ref={ref} className={"dk-sec dk-sec--light lp-heat" + (v ? " is-in" : "")} aria-labelledby="lp-heat-h">
      <div className="container lp-heat__in">
        <div>
          <PP_Head
            k="Heatmaps & behaviour intelligence"
            id="lp-heat-h"
            t="See Where Visitors Struggle"
            s="Clicks, scroll depth, attention, rage clicks, dead zones, form abandonment and navigation behaviour are evidence — not surveillance. We read them alongside analytics and business context."
          />
          <p className="dk-note">Overlay shapes only — not data from a real page.</p>
        </div>
        <div className="lp-heat__pg" role="img" aria-label="Heatmap on a landing page showing click hotspots near the headline, attention on the hero, rage clicks on a non-clickable element, a dead zone lower down and form abandonment.">
          {[60, 16, 120, 70, 90, 50].map((h, k) => (
            <i key={k} style={{ height: h, width: k % 2 ? "80%" : "100%" }} aria-hidden="true" />
          ))}
          {blobs.map(([c, x, y, s, o], k) => (
            <span key={k} className="lp-heat__blob" aria-hidden="true" style={{ background: c, left: x + "%", top: y + "%", width: s, height: s, "--o": o, "--k": k }} />
          ))}
          {tags.map(([t, x, y], k) => (
            <span key={t} className="lp-heat__tag" aria-hidden="true" style={{ left: x + "%", top: y + "%", "--k": k }}>
              {t}
            </span>
          ))}
          <span className="lp-heat__scroll" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

function LP_AB() {
  const [ref, v] = ppIn(0.3);
  const [on, setOn] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const i = setInterval(() => setOn((x) => 1 - x), 2200);
    return () => clearInterval(i);
  }, [v]);
  const rows = ["Headline", "CTA", "Form", "Proof"];
  return (
    <section ref={ref} className={"dk-sec dk-sec--off lp-ab" + (v ? " is-in" : "")} aria-labelledby="lp-ab-h">
      <div className="container">
        <PP_Head
          k="A/B testing"
          id="lp-ab-h"
          t="Test One Idea at a Time — and Learn Either Way"
          s="A failed test is still useful if it teaches us something reliable about the customer journey. No invented uplift figures."
          center
        />
        <div className="lp-ab__in">
          {["A", "B"].map((x, k) => (
            <div key={x} className={"lp-ab__v" + (on === k ? " is-on" : "")}>
              <h3>
                <span>{x}</span>Version {x}
              </h3>
              <ul>
                {rows.map((r) => (
                  <li key={r}>
                    {r} {x}
                    <small>{r === "Headline" ? "the hypothesis" : "kept equal"}</small>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <ol className="dk-chip-flow" style={{ marginTop: 22 }}>
          {["Hypothesis", "Test", "Observe", "Analyse", "Decision"].map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const LP_FAQ = [
  ["What is landing page and CRO work?", "Landing page design and conversion rate optimisation (CRO) improve how well a page helps visitors understand, trust and act — through message, structure, UX, trust signals, forms and testing."],
  ["How is your approach to CRO different?", "Changes start from understanding the visitor: their intent, questions, objections and what they need to trust you. Behaviour data and visitor feedback explain why people hesitate, and tests confirm what helps."],
  ["What does a landing page and CRO service include?", "Depending on your needs: page strategy, message hierarchy, copy and structure, UX and mobile review, trust signals, form optimisation, behaviour analysis, A/B testing and reporting."],
  ["Do you build new landing pages or improve existing ones?", "Both. Existing pages are reviewed first; new pages are built when the message, audience or offer needs a dedicated experience."],
  ["Can you guarantee a higher conversion rate?", "No. Conversion depends on traffic quality, offer, audience, competition and many other factors. Testing builds evidence about what helps; uplift is never promised."],
  ["How does AI support CRO?", "AI can help analyse behaviour patterns, summarise session recordings, draft copy variations and generate test ideas. People decide what to test, interpret results and protect the brand."],
  ["How long does a test take?", "It depends on traffic, conversion volume and the size of the change. Tests run until results are reliable enough to learn from."],
];

const LP_CFG = {
  key: "lp",
  pfx: "lp",
  url: LP_URL,
  title: LP_TITLE,
  maTitle: "Landing Page & CRO Services",
  desc: "Landing page and CRO services built on visitor intent: message hierarchy, objections, trust signals, form and mobile UX, behaviour analysis and testing.",
  crumb: "Landing Page & CRO",
  name: "Landing Page & CRO",
  serviceType: "Conversion rate optimisation",
  schemaDesc:
    "Landing page design and conversion rate optimisation: visitor intent, message hierarchy, objection handling, trust signals, CTA and form optimisation, mobile UX, behavioural analytics, A/B testing, AI-assisted analysis and human-led decisions.",
  formId: LP_FORM,
  hero: {
    kicker: "Intent + UX + CRO",
    h1: "Landing Page & CRO",
    tag: "A Landing Page Should Answer the Customer's Question Before Asking for the Conversion.",
    lead: "Visitors arrive with a question, a doubt and an intent. Pages convert when the message matches the click, the structure answers what matters, objections are handled and trust is visible — before the form appears.",
    cta: "Improve Your Landing Page",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Visitor intent", "Message hierarchy", "Trust signals", "Form & mobile UX", "AI-assisted, human-led"],
    vis: <HV_Anatomy />,
  },
  statement: ["Conversion is what happens when a page answers the right question.", ["Audience", "Intent", "Message", "UX", "Trust", "Action", "Measurement"]],
  caps: [
    ["Landing Page Strategy", "compass"],
    ["Message Hierarchy", "layers"],
    ["Copy & Structure", "file"],
    ["UX & Mobile", "phone"],
    ["Trust Signals", "shield"],
    ["Form Optimisation", "clipboard"],
    ["Behaviour Analysis", "eyeoff"],
    ["A/B Testing", "flask"],
  ],
  problem: {
    title: "When Good Traffic Meets the Wrong Page",
    sub: "Most landing pages don't fail for lack of design. They fail because they don't answer what the visitor came to find out.",
    items: [
      ["Message mismatch", "The page doesn't continue what the ad or search promised.", "shuffle"],
      ["The wrong question answered first", "Features before the visitor's actual problem.", "help"],
      ["Objections left open", "Doubts about price, fit or risk go unanswered.", "flag"],
      ["Trust appears too late", "Proof and reassurance hidden below the fold.", "shield"],
      ["Forms that ask too much", "Fields that cost more than they're worth.", "clipboard"],
      ["Mobile as an afterthought", "Layouts and CTAs that break on small screens.", "phone"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Redesigning Pages vs Understanding Visitors",
    sub: "Both change the page. One knows why visitors hesitate.",
    conv: ["New design", "Opinion", "Launch", "Conversion rate"],
    fr: ["Audience", "Intent", "Message", "UX", "Trust", "Action", "Measurement", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every page",
    title: "Pages Built Around Visitor Questions, Not Design Opinions",
    sub: "How this approach to CRO differs — question by question.",
    answers: [
      "Redesigns the page based on generic checklists or opinion, launches it and reports the conversion rate.",
      "Visitor intent, message hierarchy, objections and trust needs shape the page — and changes are tested, not assumed.",
      "Behaviour data shows where visitors struggle; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which messages, proof and offers its audience responds to — insight useful beyond one page.",
      "Traffic sources, intent, conversion events, tracking and hypotheses are defined before changes are made.",
      "Tests are prioritised by evidence and impact; results are recorded whether they win or not.",
      "Landing pages connect to PPC, SEO, social, email and CRM — the page continues the journey.",
      "AI helps analyse behaviour patterns, summarise sessions, draft copy variations and generate test ideas.",
      "People decide what to test, interpret results, protect the brand and approve every change.",
      "Pages that answer the right questions — and a growing body of evidence about what convinces your audience.",
    ],
  },
  layers: {
    title: "What a Landing Page Has to Get Right",
    rows: [
      ["Visitor intent", "target", "One page for all traffic", "A page matched to why people arrived"],
      ["Message hierarchy", "layers", "Features first", "The visitor's question answered first"],
      ["Objections", "help", "Ignored", "Doubts anticipated and answered"],
      ["Trust signals", "shield", "Logos at the bottom", "Proof near the decision"],
      ["CTA & form", "clipboard", "Long forms, vague buttons", "A clear next step with the right fields"],
      ["Mobile UX", "phone", "Desktop design shrunk", "Built for the device people use"],
    ],
  },
  loop: {
    title: "How Landing Page & CRO Works: Intelligence to Impact",
    center: "Visitor intelligence",
    texts: [
      "Understand the offer, traffic sources, audience and what a conversion is worth.",
      "Discover visitor intent, behaviour, objections and the signals already in your CRM and analytics.",
      "Define message hierarchy, structure, trust signals, forms and test hypotheses.",
      "Activate page changes, new pages and structured tests.",
      "Measure conversion, lead quality, behaviour and test results.",
      "Learn which messages, layouts and proof help visitors act.",
      "Improve pages and prioritise the next tests.",
      "Grow conversion knowledge that applies across every page.",
    ],
  },
  capabilities: {
    title: "What Landing Page & CRO Covers",
    layers: [
      ["Page strategy", "compass", ["Intent mapping", "Offer clarity", "Page roles"], "Decide what each page must do."],
      ["Message & copy", "file", ["Message hierarchy", "Headlines", "Objection handling"], "Answer the visitor's question first."],
      ["UX & structure", "layers", ["Layout", "Navigation", "Visual hierarchy"], "Make the next step obvious."],
      ["Mobile experience", "phone", ["Mobile layout", "Tap targets", "Speed"], "Built for small screens."],
      ["Trust signals", "shield", ["Proof placement", "Policies", "Security cues"], "Reassurance near the decision."],
      ["Form optimisation", "clipboard", ["Fields", "Steps", "Error handling"], "The right length for the lead."],
      ["Behaviour analysis", "eyeoff", ["Heatmaps", "Scroll depth", "Session review"], "Evidence of where visitors struggle."],
      ["A/B testing", "flask", ["Hypotheses", "Test design", "Learning log"], "Test one idea at a time."],
    ],
  },
  ai: {
    sub: "AI speeds up analysis and ideas. People decide what changes.",
    ai: [
      ["Behaviour patterns", "Finds where visitors hesitate or drop."],
      ["Session summaries", "Summarises recordings at scale."],
      ["Copy variations", "Drafts headline and CTA options for review."],
      ["Test ideas", "Suggests hypotheses from the evidence."],
      ["Result summaries", "Summarises test outcomes."],
    ],
    human: [
      ["What to test", "Priorities set by evidence and impact."],
      ["Interpretation", "What results mean — and don't."],
      ["Brand and claims", "Accurate, on-brand messaging."],
      ["Accessibility", "Pages that work for everyone."],
      ["Approval", "Nothing goes live unreviewed."],
    ],
  },
  metrics: {
    title: "Measure Understanding and Action, Not Just Conversion Rate",
    tiers: [
      ["Visits by source", "Bounce", "Scroll depth"],
      ["CTA clicks", "Form starts", "Form completion", "Time to action"],
      ["Conversions", "Lead quality", "Purchases"],
      ["Pipeline", "Revenue (where tracked)", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Generate leads", [1, 2], "Form completion and the quality of what comes through."],
      ["Drive purchases", [1, 2], "Movement from page to purchase."],
      ["Improve paid efficiency", [0, 2], "Conversion by traffic source and campaign."],
      ["Qualify better", [2, 3], "Lead quality and what happens in the pipeline."],
    ],
  },
  learn: {
    title: "Every Test Should Teach the Next One",
    steps: [
      ["Campaign", "A landing page for a paid search campaign."],
      ["Signal", "Scroll depth, CTA clicks and form drop-off."],
      ["Insight", "Visitors stop at pricing and never reach the form."],
      ["Decision", "Answer the pricing question earlier on the page."],
      ["Experiment", "Test a pricing explainer above the form."],
      ["Learning", "Record how early clarity affects action."],
      ["Better campaign", "The next page starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Objections visitors hesitate on", "help", ["Product", "Sales", "Content"]],
      ["Messages that earn the click", "msg", ["Positioning", "Content"]],
      ["Proof people look for", "award", ["Positioning", "Customer experience"]],
      ["Fields people abandon", "clipboard", ["Sales", "Customer experience"]],
      ["Offers that convert by segment", "tag", ["Product", "Market strategy"]],
    ],
  },
  why: {
    title: "Why Frequent Research for CRO",
    items: [
      ["Visitor before design", "Pages built around intent and questions.", "users"],
      ["Evidence before opinion", "Behaviour data and tests decide.", "bars"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["One idea at a time", "Tests designed to teach something reliable.", "flask"],
      ["Connected to traffic", "Pages that continue the ad or search.", "map"],
      ["AI-assisted, human-led", "Faster analysis with people deciding.", "bulb"],
    ],
  },
  related: {
    title: "Landing Pages Work Better When They're Connected",
    sub: "The page continues the journey that brought the visitor.",
    center: "Landing page",
    links: [
      ["Google Ads / PPC", "Pages matched to search intent.", ppDm("google-ads-ppc"), "digital"],
      ["SEO Services", "Pages that answer search questions.", ppDm("seo-services"), "digital"],
      ["Performance Marketing", "Pages inside the performance system.", ppDm("performance-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Measure behaviour and conversion.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: LP_FAQ,
  faqTitle: "Landing Page & CRO: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/landing-page-cro-guide">landing page and CRO guide</PpL>.
    </>
  ),
  final: {
    sig: "Intent. Message. Action.",
    sigText: "Landing pages that answer the visitor's question — and learn from every test.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us about your pages, your traffic and where visitors drop away. We'll help define what to test first.",
  },
};

function LP_Page() {
  return (
    <RL_Page
      c={{
        ...LP_CFG,
        visuals: (
          <>
            <LP_Match />
            <LP_Heat />
          </>
        ),
        after: (
          <>
            <LP_Form />
            <LP_AB />
          </>
        ),
        formNode:       <DM_Form
        id={LP_FORM}
        kicker="CRO consultation"
        title="Improve Your Landing Page"
        sub="A few quick steps. We look at your pages and goals before we talk."
        type="Landing Page & CRO Consultation"
        service="Landing Page & CRO"
        icon="sliders"
        submitLabel="Improve My Landing Page"
        successTitle="Thank you. Your landing page and CRO request has been sent."
        msgLabel="Tell us about your requirement (optional)"
        chips={[
          {
            k: "goal",
            t: "Goal",
            q: "What is your primary goal?",
            label: "Primary goal",
            options: [
              "More enquiries",
              "More qualified leads",
              "More sales",
              "Better conversion rate",
              "Better landing page experience",
              "Improve paid campaign performance",
              "Improve SEO landing pages",
              "Not sure yet",
            ],
          },
          { k: "budget", t: "Budget", q: "Monthly marketing budget", label: "Monthly budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { LP_Page };
