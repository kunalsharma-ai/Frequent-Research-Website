/*
 * Lead Generation — /services/digital-marketing/lead-generation (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: lead generation starts with knowing who is worth reaching —
 * ICP, buyer roles, intent, qualification and sales feedback. Hero visual: HV_LeadFunnel.
 * Kept custom visuals: LG_Fit (lead-fit filter over example enquiries), LG_Forms (form friction), lead leak, qualification.
 * No case study, no team details, no lead-volume guarantees, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, PpL, ppDm, ppIn } from '../components/dm/shared.jsx';
import { DK_Audit, DK_BUDGET, DK_Compare, DK_Leak, DK_Principles, DK_Sec, DK_Tabs } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_LeadFunnel } from '../components/dm/heroes.jsx';

const LG_URL = "/services/digital-marketing/lead-generation";

const LG_TITLE = "Lead Generation Services | Frequent Research";

const LG_FORM = "lg-consult";

function LG_Forms() {
  const [ref, v] = ppIn(0.3);
  const heavy = ["Name", "Company", "Address", "Department", "Job title", "Budget", "Timeline", "Team size", "…20 more questions"];
  const light = ["Name", "Work email", "Company", "What do you need?"];
  return (
    <section ref={ref} className={"dk-sec dk-sec--light lg-forms" + (v ? " is-in" : "")} aria-labelledby="lg-forms-h">
      <div className="container">
        <PP_Head
          k="Form optimisation"
          id="lg-forms-h"
          t="Ask for What You Need. Not Everything You Can."
          s="Relevant fields, clear value, a strong call to action, mobile-friendly design and privacy-conscious data collection."
          center
        />
        <div className="lg-forms__in">
          <div className="lg-form lg-form--bad">
            <b>Too much friction</b>
            {heavy.map((t, k) => (
              <span key={t} style={{ "--k": k }}>
                {t}
              </span>
            ))}
            <i>Submit</i>
          </div>
          <div className="lg-forms__arrow" aria-hidden="true">
            →
          </div>
          <div className="lg-form lg-form--good">
            <b>Right-sized form</b>
            {light.map((t, k) => (
              <span key={t} style={{ "--k": k }}>
                {t}
              </span>
            ))}
            <i>Get my plan</i>
            <small>Capture what is necessary. Qualify the rest later.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

const LG_CRIT = [
  ["Industry fit", "grid"],
  ["Company size", "box"],
  ["Decision role", "user"],
  ["Business need", "target"],
  ["Buying timeline", "clock"],
];

const LG_LEADS = [
  ["Plant head, mid-size manufacturer", [1, 1, 1, 1, 1]],
  ["Student researching a project", [0, 0, 0, 0, 0]],
  ["Procurement analyst, large enterprise", [1, 0, 0, 1, 1]],
  ["Founder, early-stage startup", [1, 0, 1, 1, 0]],
  ["Operations manager, target sector", [1, 1, 0, 1, 1]],
  ["Consultant comparing vendors for a client", [1, 1, 0, 0, 1]],
];

function LG_Fit() {
  const [on, setOn] = ee.useState([0, 1, 2]);
  const tog = (k) => setOn((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));
  const grade = (m) => {
    const miss = on.filter((k) => !m[k]).length;
    return on.length === 0 ? ["Unknown", "x"] : miss === 0 ? ["Strong fit", "s"] : miss === 1 ? ["Partial fit", "w"] : ["Not a fit", "n"];
  };
  return (
    <DK_Sec tone="light" className="lg-fit" label="lg-fit-h">
      <div className="lg-fit__in">
        <div>
          <PP_Head
            k="What makes a lead relevant?"
            id="lg-fit-h"
            t="Define Fit Before You Chase Volume"
            s="Switch criteria on and off to see how the same set of enquiries changes value. Every business defines fit differently — that definition is where good lead generation starts."
          />
          <div className="lg-fit__crit" role="group" aria-label="Lead fit criteria">
            {LG_CRIT.map(([t, ic], k) => (
              <button key={t} type="button" aria-pressed={on.includes(k)} onClick={() => tog(k)}>
                <PpI n={ic} s={13} />
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="lg-fit__vis" aria-live="polite">
          <small>Sample enquiries — not real data</small>
          <ul>
            {LG_LEADS.map(([t, m], k) => {
              const [g, c] = grade(m);
              return (
                <li key={t} style={{ "--k": k }}>
                  <b>{t}</b>
                  <span className={"rm-st rm-st--" + c}>
                    <i aria-hidden="true" />
                    {g}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </DK_Sec>
  );
}

const LG_FAQ = [
  ["What does your lead generation service include?", "Depending on scope: ICP and audience definition, strategy, offers and lead magnets, paid and organic acquisition, landing pages and forms, qualification and scoring, nurturing, CRM alignment, sales feedback and measurement."],
  ["What does a 'quality' lead actually mean?", "A lead that fits your ideal customer profile — the right industry, company type, role and authority — with a real need and some intent to act. Quality is defined with sales, written down as criteria and checked against outcomes."],
  ["How is your approach to lead generation different?", "It starts with who is worth reaching and why, then designs messaging, channels, capture and qualification around that definition. Lead generation doesn't stop at the form submission — sales feedback flows back into targeting."],
  ["Can you generate B2B leads?", "Yes — with ICP and buyer-role definition, industry and company characteristics, content, paid media, qualification, nurturing and CRM feedback."],
  ["How does AI support lead generation?", "AI helps cluster audiences, classify enquiries, support lead scoring and find patterns in conversion data. People define what a good lead is and make the decisions."],
  ["Can you improve our existing lead generation funnel?", "Yes. The whole path is reviewed — audience, acquisition, landing pages, forms, qualification, nurturing, CRM flow, tracking and sales feedback."],
  ["Do you guarantee a specific number of leads?", "No. Volume and quality depend on the market, offer, audience, competition, budget and sales process."],
];

const LG_CFG = {
  key: "lg",
  pfx: "lg",
  url: LG_URL,
  title: LG_TITLE,
  maTitle: "Lead Generation Services",
  desc: "Lead generation that starts with knowing who is worth reaching: ICP, buyer roles, intent, qualification and sales feedback. No lead-volume promises.",
  crumb: "Lead Generation",
  name: "Lead Generation Services",
  serviceType: "Lead generation",
  schemaDesc:
    "Lead generation: audience and ICP definition, buyer roles, intent, messaging, channel selection, landing pages and forms, lead validation and qualification, nurturing, CRM alignment, sales feedback and measurement against qualified pipeline.",
  formId: LG_FORM,
  hero: {
    kicker: "Buyer intelligence · Lead generation",
    h1: "Lead Generation Services",
    tag: "Lead Generation Starts With Knowing Who Is Worth Reaching.",
    lead: "Quality isn't a slogan — it's a definition. The approach begins with your ideal customer: industry, company characteristics, buyer roles, needs and intent. Messaging, channels, capture and qualification are built around it, and sales feedback keeps it honest.",
    cta: "Define Your Ideal Audience",
    cta2: "Request a Lead Generation Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["ICP definition", "Buyer roles", "Qualification criteria", "Sales feedback", "AI-assisted, human-led"],
    vis: <HV_LeadFunnel />,
  },
  statement: ["A lead isn't valuable because it was cheap. It's valuable because it fits.", ["Market", "ICP", "Audience", "Intent", "Message", "Lead", "Qualification", "Sales feedback"]],
  caps: [
    ["ICP Definition", "target"],
    ["Buyer Roles", "users"],
    ["Offers & Lead Magnets", "award"],
    ["Paid & Organic Acquisition", "megaphone"],
    ["Landing Pages & Forms", "file"],
    ["Qualification & Scoring", "check"],
    ["Lead Nurturing", "msg"],
    ["CRM Alignment", "database"],
  ],
  problemNode:       <DK_Leak
        id="lg-leak-h"
        kicker="The business problem"
        title="A Lead Can Leak Long Before It Reaches Sales"
        sub="Most lead problems aren't about volume. They start with an unclear definition of who is worth reaching. Scroll to repair each leak."
        stages={["Audience", "Engagement", "Capture", "Qualification", "Sales follow-up", "Opportunity"]}
        leaks={[
          ["Vague ICP", "Campaigns reach people who can never buy."],
          ["Weak offer", "Interest without a reason to respond."],
          ["Heavy forms", "Good prospects abandon the form."],
          ["No qualification", "Sales receives every contact the same way."],
          ["No feedback loop", "Marketing never learns which leads became customers."],
        ]}
        final="A defined ICP, clear offers, right-sized capture, qualification and feedback — one connected system."
        closing="Leaks found. Repairs ready."
      />,
  versus: {
    kicker: "From audience understanding to action",
    title: "Form-Fill Lead Generation vs Buyer-Led Lead Generation",
    sub: "Both capture enquiries. One counts them; the other learns which ones matter.",
    conv: ["Campaign", "Form fills", "Cost per lead", "Lead count"],
    fr: ["Market", "ICP", "Audience", "Intent", "Message", "Lead", "Qualification", "Sales feedback", "Better targeting"],
  },
  diff: {
    kicker: "Why our approach changes lead generation",
    title: "Explaining What 'Quality' Actually Means",
    sub: "Ten questions — and how we answer them.",
    answers: [
      "Runs campaigns to fill forms, optimises toward the lowest cost per lead and reports lead counts.",
      "Fit is defined first — industry, company characteristics, buyer roles, authority, need, intent and timing — then acquisition, capture and qualification are designed around it.",
      "CRM history, win/loss patterns and campaign data clarify which segments and roles are worth pursuing, what they need to hear and which signals indicate real intent.",
      "A shared definition of a good lead aligns marketing and sales and shows where demand really exists.",
      "ICP, segments, offers, qualification criteria, routing rules and CRM fields are agreed before acquisition starts.",
      "Sales outcomes feed back into targeting, messaging and scoring so each cycle attracts better-fit prospects.",
      "Search, social, content, email, landing pages and the CRM work as one path — not one channel in isolation.",
      "AI helps cluster audiences, classify enquiries, support lead scoring and find patterns in conversion data.",
      "People define what a good lead is, validate leads, interpret signals, protect privacy and consent, and decide what to change.",
      "A healthier pipeline built from prospects the business actually wants to serve.",
    ],
  },
  layers: {
    title: "Buyer Intelligence: What Defines a Good Lead",
    rows: [
      ["ICP", "target", "A job title and an industry list", "Fit criteria tested against real customers, roles and needs"],
      ["Buyer roles", "users", "One contact per company", "The roles that influence, approve and use the purchase"],
      ["Company characteristics", "box", "Broad size filters", "Size, sector, maturity and triggers that predict need"],
      ["Intent", "flag", "Any form fill counts", "Signals that separate curiosity from readiness"],
      ["Qualification", "check", "Every lead sent to sales", "Validation and scoring agreed with sales and refined by outcomes"],
      ["Sales feedback", "refresh", "Marketing never hears back", "Won and lost reasons flow back into targeting and messaging"],
    ],
  },
  loop: {
    title: "How Lead Generation Works: Intelligence to Impact",
    center: "Buyer intelligence",
    texts: [
      "Understand the offer, the sales process, customer value and who the business wants to serve.",
      "Discover the market, buyer roles, needs and the ICP evidence already in your CRM and sales history.",
      "Define the ICP, segments, messages, qualification criteria and CRM fields.",
      "Activate search, social, content, landing pages and nurture journeys through the right channels.",
      "Measure engagement, validated leads, sales acceptance and pipeline.",
      "Learn which segments, offers and channels produce good-fit opportunities.",
      "Improve targeting, messaging, forms and scoring.",
      "Grow a pipeline built from prospects worth reaching.",
    ],
  },
  capabilities: {
    title: "Lead Generation, From Definition to Sales Feedback",
    layers: [
      ["Lead strategy & ICP", "target", ["Ideal customer profile", "Buyer roles", "Qualification criteria"], "Define who is worth pursuing and why."],
      ["Audience segmentation", "layers", ["Industry", "Company characteristics", "Need", "Intent"], "Group prospects so messages fit."],
      ["Offers & lead magnets", "award", ["Guides", "Assessments", "Webinars", "Consultations"], "Give the right people a reason to respond."],
      ["Acquisition", "megaphone", ["Search", "Paid social", "Content", "Remarketing"], "Reach the defined audience through the channels they use."],
      ["Landing pages & forms", "file", ["Message match", "Right-sized forms", "Trust signals"], "Capture what's needed; qualify the rest later."],
      ["Validation & scoring", "check", ["Lead validation", "Fit and intent scoring", "Routing"], "Not every lead deserves the same follow-up."],
      ["Nurturing", "msg", ["Email journeys", "Automation", "Re-engagement"], "Help interested prospects take the next step."],
      ["CRM alignment & reporting", "database", ["CRM fields", "Hand-off rules", "Pipeline reporting"], "Connect marketing activity to sales outcomes."],
    ],
  },
  ai: {
    sub: "AI helps find the signals. People decide what they mean.",
    ai: [
      ["Audience clustering", "Groups prospects by shared characteristics."],
      ["Enquiry classification", "Sorts incoming leads by type and apparent need."],
      ["Lead-scoring support", "Suggests scores from fit and engagement patterns."],
      ["Conversion pattern detection", "Finds which sources and paths produce qualified leads."],
      ["Performance summaries", "Turns funnel data into readable updates."],
    ],
    human: [
      ["Defining a good lead", "Criteria agreed with sales, not set by a model."],
      ["Lead validation", "Checking that a lead is real and relevant."],
      ["Interpreting buyer signals", "Context the data alone can't provide."],
      ["Privacy and consent", "Responsible data collection and use."],
      ["Sales alignment", "Routing, follow-up and what to change next."],
    ],
  },
  metrics: {
    title: "The Cheapest Lead Is Not Always the Best Lead",
    tiers: [
      ["Reach", "Clicks", "Cost per click"],
      ["Landing engagement", "Form starts", "Content downloads"],
      ["Leads", "Validated leads", "Cost per qualified lead", "Sales-accepted leads"],
      ["Opportunities", "Pipeline value", "Win signals (where CRM data allows)"],
    ],
    objectives: [
      ["Build a pipeline", [2, 3], "Qualified leads and opportunities — not form fills — show whether the right people are responding."],
      ["Test a new segment", [0, 1, 2], "Early on, engagement and qualification show whether the segment is worth pursuing."],
      ["Improve lead quality", [2, 3], "Sales acceptance and opportunity rates reveal whether fit is improving."],
      ["Lower acquisition cost", [1, 2], "Cost per qualified lead matters more than cost per lead."],
    ],
  },
  learn: {
    title: "Sales Feedback Makes the Next Campaign Smarter",
    steps: [
      ["Campaign", "Reach a defined segment with a specific offer."],
      ["Signal", "Form completions, validation results, sales acceptance."],
      ["Insight", "Which roles, industries and messages became real opportunities."],
      ["Decision", "Refine the ICP, adjust scoring, move budget."],
      ["Experiment", "Test a new offer, form length or channel."],
      ["Learning", "Record what changed lead quality — not just volume."],
      ["Better campaign", "The next campaign targets prospects more likely to buy."],
    ],
  },
  intel: {
    signals: [
      ["Which industries and roles actually convert", "users", ["Sales", "Market strategy", "Positioning"]],
      ["Questions prospects ask in enquiries", "msg", ["Product", "Content", "Sales"]],
      ["Offers that attract the right people", "award", ["Positioning", "Product"]],
      ["Reasons good-fit leads stall", "flag", ["Sales", "Customer experience"]],
      ["Segments responding that you didn't target", "trend", ["Market strategy", "Product"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Lead Generation",
    items: [
      ["Fit before volume", "Who is worth pursuing is defined before response is chased.", "target"],
      ["B2B buying-group thinking", "Campaigns built around organisations, roles and buying groups.", "box"],
      ["ICP evidence", "We test the ICP against CRM outcomes instead of assuming it.", "search"],
      ["Marketing–sales connection", "Qualification and feedback agreed with sales.", "users"],
      ["Measured beyond the form", "Campaigns judged by qualified pipeline, not form counts.", "bars"],
      ["AI-assisted, human-led", "Faster analysis; people accountable for decisions.", "bulb"],
    ],
  },
  related: {
    title: "Connect Lead Generation to the Wider Pipeline",
    sub: "Lead generation works best when capture, nurture and measurement are connected.",
    center: "Lead generation",
    links: [
      ["B2B Digital Marketing", "Engage whole buying groups, not single contacts.", ppDm("b2b-digital-marketing"), "digital"],
      ["Email Marketing", "Nurture prospects who aren't ready yet.", ppDm("email-marketing"), "digital"],
      ["Marketing Automation", "Score, route and follow up consistently.", ppDm("marketing-automation"), "digital"],
      ["Landing Page & CRO", "Capture interest with less friction.", ppDm("landing-page-and-cro"), "digital"],
      ["Digital Analytics & Reporting", "Connect campaigns to qualified pipeline and sales feedback.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: LG_FAQ,
  faqTitle: "Lead Generation: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read our <PpL to="/blog/lead-generation-guide">lead generation guide</PpL>.
    </>
  ),
  final: {
    sig: "Know Who Is Worth Reaching.",
    sigText: "Define fit. Reach the right people. Qualify honestly. Learn from every sales outcome.",
    title: "Have a Lead Challenge That Needs More Than More Leads?",
    text: "Tell us about your offer, your sales process and the customers you want more of. We'll help define the audience worth reaching.",
  },
};

function LGN_Page() {
  return (
    <RL_Page
      c={{
        ...LG_CFG,
        before: <LG_Fit />,
        visuals: (
          <>
                  <DK_Tabs
        id="lg-types-h"
        tone="off"
        kicker="Different models, different journeys"
        title="B2B, B2C and Service-Business Lead Generation"
        sub="Select a model."
        layers={[
          ["B2B", "box", ["ICP and account fit", "Buying-group roles", "Long consideration", "Content-led nurture", "Sales hand-off"], "Leads are organisations and committees, not single contacts."],
          ["B2C", "users", ["Relevance and timing", "Simple capture", "Fast follow-up", "Consent-aware messaging"], "Speed and relevance matter more than long nurture."],
          ["Service businesses", "award", ["Expertise-led content", "Enquiry and booking paths", "Trust signals", "Local visibility"], "Turn expertise into qualified enquiries."],
        ]}
      />
            <LG_Forms />
                  <DK_Compare
        id="lg-qual-h"
        tone="dark"
        kicker="Qualification"
        title="Not Every Lead Deserves the Same Follow-Up"
        cols={[
          ["Ready now", ["Strong fit and clear intent", "Route to sales quickly", "Personal follow-up"], "a"],
          ["Interested, not ready", ["Good fit, early stage", "Nurture with useful content", "Re-score on engagement"], "b"],
          ["Low fit", ["Outside the ICP", "Light-touch or no follow-up", "Feedback improves targeting"], "c"],
        ]}
        center="Qualification rules are agreed with sales — and improved by what actually converts."
      />
          </>
        ),
        after: (
          <>
                  <DK_Principles
        id="lg-priv-h"
        kicker="Responsible data"
        title="Build the Pipeline. Respect the Person."
        sub="Lead generation should create commercial value without treating personal data as an unlimited resource."
        items={["Purposeful collection", "Consent-aware measurement", "Relevant data only", "Data minimisation", "Secure handling", "Platform compliance"]}
      />
                  <DK_Audit
        id="lg-aud-h"
        kicker="Lead generation audit"
        title="Already Generating Leads? Find Where Fit Is Lost."
        sub="We review the whole path — from audience definition to sales feedback."
        items={["ICP", "Audience", "Traffic sources", "Offer", "Landing pages", "Forms", "Lead quality", "Qualification", "CRM", "Follow-up", "Nurturing", "Tracking", "Sales feedback"]}
        cta="Request a Lead Generation Audit"
        formId={LG_FORM}
      />
          </>
        ),
        formNode: (
          <DM_Form
            id={LG_FORM}
            kicker="Ideal audience"
            title="Define Your Ideal Audience"
            sub="A few quick steps help us understand what a good lead looks like for you."
            type="Lead Generation Consultation"
            service="Lead Generation"
            icon="target"
            submitLabel="Define My Ideal Audience"
            successTitle="Thank you. Your lead generation consultation request has been sent."
            msgLabel="Who is your ideal customer? (optional)"
            msgPh="Industry, company size, roles, regions — whatever you know so far"
            nextSteps={["We review your goals, audience and current funnel.", "We contact you within one working day.", "You get a clear recommended next step."]}
            chips={[
              { k: "needs", t: "Needs", q: "What do you need?", label: "Needs", multi: true, options: ["Lead generation strategy", "ICP definition", "B2B lead generation", "B2C lead generation", "Qualification & scoring", "Lead nurturing", "Landing pages / CRO", "Paid lead campaigns", "CRM alignment", "Lead generation audit", "Not sure yet"] },
              { k: "goal", t: "Goal", q: "Primary goal", label: "Primary goal", options: ["Better-fit leads", "More sales conversations", "More pipeline", "Lower cost per qualified lead", "Test a new segment", "Better lead tracking", "Not sure yet"] },
              { k: "budget", t: "Budget", q: "Approximate monthly budget", label: "Monthly budget", options: DK_BUDGET },
            ]}
          />
        ),
      }}
    />
  );
}

export { LGN_Page };
