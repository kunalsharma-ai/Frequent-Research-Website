/*
 * Marketing Automation — /services/digital-marketing/marketing-automation (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: journey-based automation —
 * "Automate the Right Journey — Not Just the Next Message." Hero visual: HV_Workflow.
 * Kept: MA_Score (interactive lead-scoring model), the leak problem, re-engagement branch, responsible-automation principles.
 * No case study, no team details, no platform partnerships, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Branch, DK_Leak, DK_Principles, DK_Sec } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Workflow } from '../components/dm/heroes.jsx';

const MA_URL = "/services/digital-marketing/marketing-automation";

const MA_TITLE = "Marketing Automation Services | Frequent Research";

const MA_FORM = "ma-consult";

const MA_SIG = [
  ["Company fit", "box"],
  ["Role", "user"],
  ["Content engagement", "file"],
  ["Website behaviour", "globe"],
  ["Form information", "clipboard"],
  ["Intent signals", "target"],
];

const MA_BAND = [
  ["Low priority", "Nurture", "Keep educating with relevant content."],
  ["Developing", "Continue education", "More specific content; watch for intent."],
  ["High intent", "Sales follow-up", "Alert sales with context from the CRM."],
];

function MA_Score() {
  const [on, setOn] = ee.useState([2, 3]);
  const tog = (k) => setOn((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));
  const w = Math.min(100, 8 + on.length * 15.3);
  const band = on.length <= 1 ? 0 : on.length <= 3 ? 1 : 2;
  return (
    <DK_Sec tone="light" className="ma-sc" label="ma-score-h">
      <div className="ma-sc__in">
        <div>
          <PP_Head
            k="Lead scoring"
            id="ma-score-h"
            t="Not Every Lead Deserves the Same Follow-Up"
            s="Switch signals on and off to see how a scoring model changes the next action. Real models are built around your business — there's no universal formula."
          />
          <div className="ma-sc__sig" role="group" aria-label="Lead signals">
            {MA_SIG.map(([t, ic], k) => (
              <button key={t} type="button" aria-pressed={on.includes(k)} onClick={() => tog(k)}>
                <PpI n={ic} s={14} />
                {t}
              </button>
            ))}
          </div>
          <p className="dk-note">A model, not a scoring formula or a promise of lead quality.</p>
        </div>
        <div className="ma-sc__card" aria-live="polite">
          <small>Lead score</small>
          <div className="ma-sc__meter" aria-hidden="true">
            <i style={{ width: w + "%" }} />
          </div>
          <div className="ma-sc__bands">
            {MA_BAND.map(([t], k) => (
              <span key={t} className={k === band ? "is-on" : ""}>
                {t}
              </span>
            ))}
          </div>
          <div className="ma-sc__route">
            <b>→ {MA_BAND[band][1]}</b>
            <p>{MA_BAND[band][2]}</p>
          </div>
        </div>
      </div>
    </DK_Sec>
  );
}

const MA_FAQ = [
  ["What is marketing automation?", "Marketing automation uses technology, customer data and predefined workflows to trigger relevant marketing and customer-journey actions automatically."],
  ["How is your approach to automation different?", "The journey is understood before anything is automated: who the customers are, what signals show intent, which lifecycle stage they're in, what consent allows and what the business rules are. Automation without strategy simply creates more messages."],
  ["What does a marketing automation service include?", "Depending on your needs: strategy, CRM workflows, email automation, lead nurturing, segmentation, lead scoring, integrations, reporting and ongoing optimisation."],
  ["Is marketing automation only email automation?", "No. Email is one component; marketing automation can also connect your CRM, website behaviour, lead scoring, sales workflows, WhatsApp and other touchpoints."],
  ["Can you integrate marketing automation with our CRM?", "Yes, where technically supported — the workflow depends on your CRM, marketing platform, integrations and requirements. Salesforce, Marketo or HubSpot can be worked with where you already use them; no official partnerships are claimed."],
  ["How does AI support marketing automation?", "AI can help with pattern detection, segmentation, content variations, workflow analysis and prioritisation. People decide what should be automated and review what is sent."],
  ["Can marketing automation generate leads automatically?", "It improves how leads are captured, qualified and nurtured, but it doesn't replace an effective acquisition strategy."],
  ["How much does marketing automation cost?", "It depends on the platform, number of workflows, integrations, database size, channels and complexity, so scope comes before a quote."],
];

const MA_CFG = {
  key: "ma",
  pfx: "ma",
  url: MA_URL,
  title: MA_TITLE,
  maTitle: "Marketing Automation Services",
  desc: "Marketing automation built on the customer journey: behavioural triggers, segments, lifecycle stages, consent and business rules — not just more messages.",
  crumb: "Marketing Automation",
  name: "Marketing Automation",
  serviceType: "Marketing automation",
  schemaDesc:
    "Marketing automation: journey mapping, behavioural triggers, audience segments, lifecycle stages, business rules, intent and consent, CRM and email automation, lead nurturing and scoring, sales hand-offs, AI-assisted workflow analysis and reporting.",
  formId: MA_FORM,
  hero: {
    kicker: "Journey-based automation",
    h1: "Marketing Automation",
    tag: "Automate the Right Journey — Not Just the Next Message.",
    lead: "Automation without strategy simply creates more messages. The approach starts with the customer journey — behavioural triggers, segments, lifecycle stages, intent, consent and business rules — then automates the moments that genuinely help people move forward.",
    cta: "Plan Your Automation Journey",
    cta2: "Request an Automation Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Journey mapping", "Behavioural triggers", "Lead scoring", "Consent-aware", "AI-assisted, human-led"],
    vis: <HV_Workflow />,
  },
  statement: ["Automation should make marketing more relevant — not simply more automatic.", ["Signal", "Decision", "Trigger", "Personalised action", "Response", "Next signal"]],
  caps: [
    ["Journey Strategy", "compass"],
    ["CRM Automation", "database"],
    ["Email Automation", "msg"],
    ["Lead Nurturing", "trend"],
    ["Lead Scoring", "target"],
    ["Drip Campaigns", "clock"],
    ["Sales Hand-offs", "users"],
    ["Retention Journeys", "refresh"],
  ],
  problemNode:       <DK_Leak
        id="ma-leak-h"
        kicker="Where marketing breaks"
        title="The Problem Isn't Always a Lack of Leads"
        sub="Sometimes it's what happens after the lead arrives. Scroll to close the gaps."
        stages={["Lead arrives", "Customer downloads content", "Prospect opens several emails", "Customer visits the pricing page", "Lead goes cold"]}
        leaks={[
          ["Slow follow-up", "Nobody follows up quickly."],
          ["Unknown interest", "Nobody knows what they're interested in."],
          ["Invisible engagement", "Sales doesn't know it happened."],
          ["Missed intent", "No meaningful action follows."],
          ["Starting from zero", "Marketing begins again from scratch."],
        ]}
        final="Automation connects what happens after the lead arrives."
        closing="Each gap is a moment where interest quietly fades."
      />,
  versus: {
    kicker: "From audience understanding to action",
    title: "Message Automation vs Journey Automation",
    sub: "Both send automatically. One follows the calendar; the other follows the customer.",
    conv: ["Tool", "Template", "Scheduled send", "Open rate"],
    fr: ["Customer journey", "Signals", "Segments", "Business rules", "Consent", "Trigger", "Personalised action", "Response", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every interaction",
    title: "Automation Built Around the Journey, Not the Software",
    sub: "How this approach to automation differs — question by question.",
    answers: [
      "Sets up a platform, builds templated sequences on fixed timings and reports sends, opens and clicks.",
      "The journey is mapped first — stages, triggers, intent signals, segments, consent and business rules — and automation is designed to act only when it helps the customer and the business.",
      "Behavioural data shows what people do; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "Sales gets better-timed hand-offs, customers get more relevant communication, and the business learns which journeys create value.",
      "Journey maps, data quality, CRM fields, consent, scoring rules and hand-off agreements are set up before workflows are built.",
      "Workflow performance and customer progression are reviewed; journeys are refined, paused or retired based on evidence.",
      "Email, WhatsApp, CRM, website behaviour and sales tasks are coordinated around the same customer, not run in parallel.",
      "AI helps detect patterns, suggest segments, draft content variations and analyse workflow performance.",
      "People decide what should be automated, set rules and limits, protect consent and review sensitive communication.",
      "Relevant journeys at scale that move prospects and customers forward — and give sales the right signal at the right time.",
    ],
  },
  layers: {
    title: "What Decides When Automation Acts",
    rows: [
      ["Customer journey", "map", "One sequence for everyone", "Stages mapped from awareness to advocacy"],
      ["Behavioural triggers", "flag", "Time-based sends", "Actions that signal intent or need"],
      ["Segments & lifecycle", "layers", "Whole-list campaigns", "Different paths for different people and stages"],
      ["Business rules", "sliders", "Platform defaults", "Routing, limits and priorities agreed with the business"],
      ["Consent", "shield", "Assumed permission", "Communication only where consent and context allow"],
      ["Engagement", "bars", "Opens and clicks", "Progression through the journey and sales outcomes"],
    ],
  },
  loop: {
    title: "How Automation Works: Intelligence to Impact",
    center: "Journey intelligence",
    texts: [
      "Understand the customer journey, sales process, systems and what the business needs automation to achieve.",
      "Discover behavioural signals, data quality, consent status and the decision stages visible in your data.",
      "Define segments, triggers, scoring, business rules and hand-offs.",
      "Activate workflows across email, CRM, WhatsApp and sales tasks.",
      "Measure progression, engagement, hand-off quality and outcomes.",
      "Learn which journeys move people forward and which create noise.",
      "Improve triggers, content, timing and rules.",
      "Grow with automation that scales relevance, not volume.",
    ],
  },
  capabilities: {
    title: "Marketing Automation = More Than Email",
    layers: [
      ["Strategy & journey design", "compass", ["Automation architecture", "Journey planning", "Prioritisation"], "Decide what should be automated — and what shouldn't."],
      ["CRM automation", "database", ["Lead routing", "Lifecycle stages", "Workflow logic"], "Keep records, stages and ownership consistent."],
      ["Email automation", "msg", ["Triggered emails", "Behaviour-based journeys"], "Communication that responds to what people do."],
      ["Lead nurturing & drip", "trend", ["Nurture journeys", "Drip sequences", "Re-engagement"], "Move prospects from interest toward readiness."],
      ["Lead scoring", "target", ["Fit signals", "Behaviour signals", "Score bands"], "Prioritise with defined business and behavioural signals."],
      ["Omnichannel journeys", "layers", ["Email", "WhatsApp", "Website", "Sales tasks"], "Coordinate channels around behaviour."],
      ["Sales automation", "users", ["Alerts", "Tasks", "Hand-off workflows"], "Give sales the signal, not another spreadsheet."],
      ["Retention & analytics", "refresh", ["Post-conversion journeys", "Workflow reporting", "Progression analysis"], "Measure how journeys actually perform."],
    ],
  },
  ai: {
    sub: "AI makes automation more adaptive. People decide what should be automated.",
    ai: [
      ["Workflow assistance", "Suggests journey steps and spots dead ends."],
      ["Segmentation help", "Proposes segments from behaviour patterns."],
      ["Content variations", "Drafts message versions for review."],
      ["Pattern detection", "Finds signals that predict progression."],
      ["Performance analysis", "Summarises how each journey performs."],
    ],
    human: [
      ["What to automate", "Some moments need a person, not a workflow."],
      ["Business rules and limits", "Frequency, priorities and routing."],
      ["Consent and privacy", "Communication only where it's allowed and welcome."],
      ["Customer sensitivity", "Tone and timing for sensitive situations."],
      ["Approval", "Nothing new goes live unreviewed."],
    ],
  },
  metrics: {
    title: "Measure Progress, Not Just Sends",
    tiers: [
      ["Sends", "Deliverability", "Reach by segment"],
      ["Opens", "Clicks", "Website return visits", "Journey progression"],
      ["Qualified leads", "Sales hand-offs", "Conversions", "Re-activations"],
      ["Pipeline", "Retention", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Nurture leads", [1, 2], "Progression and qualified hand-offs show whether nurturing works."],
      ["Improve sales follow-up", [2, 3], "Hand-off speed and quality, and what happens next in the pipeline."],
      ["Retain customers", [1, 3], "Engagement after purchase and retention over time."],
      ["Reactivate cold contacts", [1, 2], "Responses and re-activations — and knowing when to stop."],
    ],
  },
  learn: {
    title: "Every Journey Should Get Smarter Over Time",
    steps: [
      ["Campaign", "A journey goes live for one segment."],
      ["Signal", "Triggers fired, responses, progression, hand-offs."],
      ["Insight", "Where people move forward — and where they stall."],
      ["Decision", "Change a trigger, a message or a rule."],
      ["Experiment", "Test timing, content or channel."],
      ["Learning", "Record what improved progression."],
      ["Better campaign", "The next journey starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Stages where customers stall", "flag", ["Customer experience", "Sales", "Content"]],
      ["Content that moves people forward", "file", ["Content", "Positioning"]],
      ["Signals that predict a purchase", "target", ["Sales", "Market strategy"]],
      ["Reasons customers go quiet", "help", ["Product", "Customer experience"]],
      ["Segments that respond differently", "users", ["Positioning", "Market strategy"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Automation",
    items: [
      ["Journey before software", "Journeys are understood before anything is automated.", "map"],
      ["Audience logic", "Segments and triggers based on real behaviour and needs.", "users"],
      ["Consent-aware by design", "Automation that knows when not to act.", "shield"],
      ["Platform-agnostic", "Built around the CRM and tools you already use.", "layers"],
      ["Sales-connected", "Hand-offs and scoring agreed with sales.", "target"],
      ["AI-assisted, human-led", "Adaptive workflows with people in control.", "bulb"],
    ],
  },
  related: {
    title: "Automation Works Best When It's Connected",
    sub: "Automation connects the channels around one customer.",
    center: "Automation",
    links: [
      ["Email Marketing", "The messages inside the journeys.", ppDm("email-marketing"), "digital"],
      ["WhatsApp Marketing", "Consent-based conversations where they fit the journey.", ppDm("whatsapp-marketing"), "digital"],
      ["Lead Generation", "Capture and qualify leads that automation then nurtures.", ppDm("lead-generation"), "digital"],
      ["Digital Analytics & Reporting", "Measure journey progression and outcomes.", ppDm("digital-analytics-and-reporting"), "data"],
      ["B2B Digital Marketing", "Long buying journeys need patient nurture.", ppDm("b2b-digital-marketing"), "digital"],
    ],
  },
  faq: MA_FAQ,
  faqTitle: "Marketing Automation: Frequently Asked Questions",
  guide: {
    title: "Marketing Automation: Nurturing Leads and Customers at Scale Without Losing the Personal Touch",
    cover: ["Frequent Research · Guide", "Marketing Automation", "Connecting data, journeys and customer action"],
    topics: ["What is marketing automation?", "Automation strategy", "CRM and automation", "Email automation", "Lead scoring", "AI in automation"],
    to: "/blog/marketing-automation-guide",
  },
  final: {
    sig: "Automate the Right Journey.",
    sigText: "Signals, decisions, triggers and relevant actions — built around the customer, with people in control.",
    title: "Have an Automation Challenge That Needs More Than Software?",
    text: "Tell us about your customer journey, your systems and where follow-up breaks down. We'll help decide what to automate first.",
  },
};

function MA_Page() {
  return (
    <RL_Page
      c={{
        ...MA_CFG,
        visuals: (
          <>
            <MA_Score />
                  <DK_Branch
        id="ma-re-h"
        kicker="Re-engagement automation"
        title="Not Every Cold Lead Is a Lost Lead"
        sub="Intelligent re-engagement — not endless email sequences."
        main={["Inactive lead", "Identify a relevant signal", "Re-engagement content", "Customer responds", "Re-enter the right journey"]}
        branch={["No response", "Respect preferences", "Reduce frequency or suppress"]}
        rejoin="Clean data, relevant journeys"
      />
          </>
        ),
        after: (
          <>
                  <DK_Principles
        id="ma-resp-h"
        tone="light"
        kicker="Consent & responsible automation"
        title="Good Automation Knows When to Act — and When Not To"
        sub="Smart automation respects the customer. It should never become spam, and we don't offer unlimited or unrestricted outreach."
        items={["Consent", "Preferences", "Frequency controls", "Context", "Relevance", "Data quality", "Suppression rules", "Human oversight", "Workflow governance", "Escalation"]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={MA_FORM}
        kicker="Automation assessment"
        title="Plan Your Automation Journey"
        sub="A few quick steps. You don't need to know your platform — tell us what you can."
        type="Marketing Automation Assessment"
        service="Marketing Automation"
        icon="cpu"
        submitLabel="Plan My Automation Journey"
        successTitle="Thank you. Your marketing automation assessment request has been sent."
        msgLabel="Tell us about your current setup (optional)"
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need help with?",
            label: "Needs",
            multi: true,
            options: [
              "Marketing automation strategy",
              "CRM automation",
              "Email automation",
              "Drip campaigns",
              "Lead nurturing",
              "Lead scoring",
              "Automated lead generation",
              "Sales automation",
              "Omnichannel automation",
              "Platform integration",
              "AI-assisted automation",
              "Automation audit",
              "Not sure yet",
            ],
          },
          {
            k: "goal",
            t: "Objective",
            q: "Main objective",
            label: "Main objective",
            options: [
              "Reduce manual work",
              "Improve lead follow-up",
              "Nurture leads",
              "Improve sales handoffs",
              "Improve customer engagement",
              "Connect CRM and marketing",
              "Improve lifecycle communication",
              "Build automated journeys",
              "Not sure yet",
            ],
          },
          {
            k: "platform",
            t: "Platform",
            q: "Existing platform (optional)",
            label: "Existing platform",
            optional: true,
            options: ["HubSpot", "Salesforce", "Marketo", "Other CRM / marketing platform", "Not sure", "Starting from scratch"],
          },
          { k: "budget", t: "Budget", q: "Approximate monthly / project budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { MA_Page };
