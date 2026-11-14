/*
 * WhatsApp Marketing — /services/digital-marketing/whatsapp-marketing (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: consent, context and timing —
 * Trigger → Consent → Message → Response → Intent → Next Action. Hero visual: WA_Chat (existing animated chat).
 * Kept: WA_Chat, permission principles, entry-point flow, Business API chips, CRM flow.
 * No case study, no team details, no unrestricted bulk messaging, no delivery or approval guarantees.
 */
import * as ee from 'react';
import { DM_Form, PpL, PpX, ppDm, ppR } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Chips, DK_Flow, DK_Principles } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';

const WA_URL = "/services/digital-marketing/whatsapp-marketing";

const WA_TITLE = "WhatsApp Marketing Services | Frequent Research";

const WA_FORM = "wa-consult";

const WA_MSGS = [
  ["c", "Hi — saw your offer. Is it available for business customers?"],
  ["b", "Yes! Happy to help. Which describes you?", ["Small business", "Enterprise", "Just exploring"]],
  ["c", "Enterprise"],
  ["b", "Thanks. Which product are you interested in?", ["Product A", "Product B", "Not sure"]],
  ["c", "Product B — we need it for 3 sites."],
  ["b", "Got it. Connecting you to a person now.", null, "Human hand-off"],
  ["b", "Hi, thanks for waiting — shall we book a 15-minute call?", null, "Person"],
];

const WA_STAGES = ["Message", "Response", "Qualify", "Route", "Convert"];

function WA_Chat() {
  const [n, setN] = ee.useState(ppR() ? WA_MSGS.length : 1);
  ee.useEffect(() => {
    if (ppR()) return;
    const t = setInterval(() => setN((x) => (x >= WA_MSGS.length + 2 ? 1 : x + 1)), 1500);
    return () => clearInterval(t);
  }, []);
  const shown = Math.min(n, WA_MSGS.length);
  const stage = shown <= 1 ? 0 : shown <= 2 ? 1 : shown <= 5 ? 2 : shown <= 6 ? 3 : 4;
  return (
    <div className="wa-chat" role="img" aria-label="Conversation: a customer asks about an offer, answers two qualifying questions, and is handed to a person to book a call.">
      <div className="wa-chat__top" aria-hidden="true">
        <i>FR</i>
        <div>
          <b>Conversation engine</b>
          <small>Consent-based flow</small>
        </div>
      </div>
      <ul className="wa-chat__list" aria-hidden="true">
        {WA_MSGS.map(([w, t, opts, tag], k) => (
          <li key={k + "-" + (k < shown ? "on" : "off")} className={"wa-chat__m " + w + (k < shown ? "" : " is-off")}>
            {tag && <em>{tag}</em>}
            {t}
            {opts && (
              <span className="wa-chat__opts">
                {opts.map((o) => (
                  <span key={o}>{o}</span>
                ))}
              </span>
            )}
            {k === shown && (
              <span className="wa-chat__typing">
                <i />
                <i />
                <i />
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="wa-chat__stage" aria-hidden="true">
        {WA_STAGES.map((s, k) => (
          <span key={s} className={k <= stage ? "is-on" : ""}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

const WA_FAQ = [
  ["What is WhatsApp marketing?", "WhatsApp marketing uses the WhatsApp Business Platform to have permission-based conversations with customers — updates, offers, support, reminders and lead qualification — within platform rules."],
  ["How is your approach to WhatsApp different?", "Every message is judged on consent, context and timing. Segments, intent and the difference between transactional and promotional messages decide what is sent — so WhatsApp feels relevant, not intrusive."],
  ["Can we send bulk messages to any number?", "No. WhatsApp marketing depends on customer opt-in, platform policies, message categories and applicable laws. Unrestricted bulk messaging is not offered."],
  ["What does a WhatsApp marketing service include?", "Depending on your needs: strategy, consent and opt-in journeys, conversational flows, automation, CRM integration, campaign messaging, reporting and optimisation."],
  ["Can WhatsApp marketing be automated?", "Yes, for FAQs, initial qualification, routing and reminders — with a clear hand-off to a person for complex, sensitive or high-value conversations."],
  ["How does AI support WhatsApp marketing?", "AI can help classify intent, suggest replies, summarise conversations and detect patterns. People decide what is automated, review sensitive conversations and handle escalations."],
  ["Can WhatsApp connect to our CRM?", "Often, depending on your CRM, platform setup and available APIs or connectors. The integration is confirmed before anything is promised."],
  ["How much does WhatsApp marketing cost?", "It depends on provider pricing, message categories, volume, markets, automation and integrations, so scope comes before a quote."],
];

const WA_CFG = {
  key: "wa",
  pfx: "wa",
  url: WA_URL,
  title: WA_TITLE,
  maTitle: "WhatsApp Marketing Services",
  desc: "Consent-based WhatsApp marketing built on context, timing and intent: conversational journeys, automation with human escalation and CRM links.",
  crumb: "WhatsApp Marketing",
  name: "WhatsApp Marketing",
  serviceType: "WhatsApp marketing",
  schemaDesc:
    "WhatsApp marketing: consent and opt-in journeys, segmentation, transactional and promotional messaging, conversational flows, automation with human escalation, CRM integration, AI-assisted intent classification and responsible messaging practices.",
  formId: WA_FORM,
  hero: {
    kicker: "Consent-based conversations",
    h1: "WhatsApp Marketing",
    tag: "Make Every WhatsApp Interaction Feel Relevant — Not Intrusive.",
    lead: "WhatsApp is a personal space. Messages earn their place through consent, context and timing — and conversations work better when automation knows when to step aside for a person.",
    cta: "Plan Your WhatsApp Journey",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Consent first", "Conversational journeys", "Human escalation", "CRM-connected", "AI-assisted, human-led"],
    vis: <WA_Chat />,
  },
  statement: ["In a customer's chat list, relevance is the price of entry.", ["Trigger", "Consent", "Message", "Response", "Intent", "Next action"]],
  caps: [
    ["WhatsApp Strategy", "compass"],
    ["Opt-in Journeys", "shield"],
    ["Conversational Flows", "msg"],
    ["Automation", "refresh"],
    ["Lead Qualification", "check"],
    ["CRM Integration", "database"],
    ["Campaign Messaging", "megaphone"],
    ["Reporting", "bars"],
  ],
  problem: {
    title: "When WhatsApp Feels Like Spam",
    sub: "WhatsApp rarely fails because customers aren't there. It fails when messages ignore consent, context and timing.",
    items: [
      ["Messages without consent", "Contacts who never asked to hear from you.", "shield"],
      ["Promotions in a support channel", "Offers sent where people expect help.", "tag"],
      ["Bad timing", "Messages that arrive when they're least useful.", "clock"],
      ["Bots with no way out", "Automation that never hands over to a person.", "cpu"],
      ["Conversations that go nowhere", "Leads lost because nothing reaches the CRM.", "database"],
      ["Measured by sends", "Delivered counts reported; outcomes unknown.", "bars"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Broadcast Messaging vs Conversational Journeys",
    sub: "Both use WhatsApp. One earns the right to the next message.",
    conv: ["Contact list", "Broadcast", "Delivered", "Read"],
    fr: ["Trigger", "Consent", "Message", "Response", "Intent", "Next action", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every message",
    title: "WhatsApp Built Around Consent and Context, Not Volume",
    sub: "How this approach to WhatsApp differs — question by question.",
    answers: [
      "Sets up broadcast lists, sends promotional messages and reports delivered and read counts.",
      "Consent, context, timing, segments and message intent — transactional or promotional — decide what is sent and when.",
      "Response signals show what people value; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which questions customers ask, what they need help with and where conversations convert.",
      "Opt-in journeys, message categories, flows, escalation rules, CRM fields and measures are set up before launch.",
      "Conversations and flows are reviewed; dead ends are fixed and messages that feel intrusive are removed.",
      "WhatsApp connects with automation, email, e-commerce, CRM and analytics — one customer journey.",
      "AI helps classify intent, suggest replies, summarise conversations and detect patterns.",
      "People decide what is automated, review sensitive conversations and handle escalations.",
      "Conversations customers welcome — and a clearer view of what they need.",
    ],
  },
  layers: {
    title: "What Decides Whether a Message Is Sent",
    rows: [
      ["Consent", "shield", "Any number on a list", "Only opted-in customers"],
      ["Context", "compass", "Same message for all", "Relevant to what the customer did or asked"],
      ["Timing", "clock", "Whenever it's convenient", "When the message is useful"],
      ["Message intent", "tag", "Promotions everywhere", "Transactional and promotional kept distinct"],
      ["Segment", "users", "Whole list", "Different needs, different conversations"],
      ["Escalation", "user", "Bot only", "A person when the conversation needs one"],
    ],
  },
  loop: {
    title: "How WhatsApp Marketing Works: Intelligence to Impact",
    center: "Conversation intelligence",
    texts: [
      "Understand the business objective, customer expectations and where WhatsApp genuinely fits the journey.",
      "Discover consent status, customer questions, intent signals and the signals already in your CRM and analytics.",
      "Define opt-in journeys, segments, flows, message categories, escalation and measures.",
      "Activate conversations, automation and campaign messages within platform rules.",
      "Measure responses, resolutions, qualified leads, conversions and opt-outs.",
      "Learn which conversations help customers — and which feel intrusive.",
      "Improve flows, timing, content and hand-offs.",
      "Grow a channel customers are glad to keep open.",
    ],
  },
  capabilities: {
    title: "What WhatsApp Marketing Covers",
    layers: [
      ["Strategy & use cases", "compass", ["Objectives", "Use-case selection", "Channel role"], "Decide where WhatsApp genuinely helps."],
      ["Consent & opt-in", "shield", ["Opt-in journeys", "Preference capture", "Opt-out handling"], "Permission before messaging."],
      ["Conversational flows", "msg", ["FAQ flows", "Qualification", "Routing"], "Conversations with a clear purpose."],
      ["Automation & chatbots", "refresh", ["Reminders", "Notifications", "Human hand-off"], "Automate the routine; escalate the rest."],
      ["Campaign messaging", "megaphone", ["Segmented campaigns", "Offers", "Updates"], "Promotions only where they're welcome."],
      ["CRM integration", "database", ["Lead capture", "Routing", "Follow-up"], "Where technically supported."],
      ["Platform setup support", "layers", ["Provider selection", "Business API setup"], "Working with the appropriate provider."],
      ["Reporting", "bars", ["Responses", "Resolutions", "Conversions"], "Measure outcomes, not sends."],
    ],
  },
  ai: {
    sub: "AI helps conversations scale. People decide when a person should answer.",
    ai: [
      ["Intent classification", "Sorts messages by what the customer needs."],
      ["Reply suggestions", "Drafts responses for review."],
      ["Conversation summaries", "Summarises threads for hand-off."],
      ["Pattern detection", "Finds recurring questions and drop-offs."],
      ["Routing support", "Suggests where a conversation should go."],
    ],
    human: [
      ["What to automate", "Some conversations need a person."],
      ["Consent and privacy", "Messaging only where it's allowed and welcome."],
      ["Sensitive conversations", "Complaints and complex queries handled by people."],
      ["Escalation", "A clear route to a person."],
      ["Approval", "Templates and flows reviewed before use."],
    ],
  },
  metrics: {
    title: "Measure Conversations, Not Just Deliveries",
    tiers: [
      ["Delivered", "Read", "Opt-ins"],
      ["Replies", "Conversation completion", "Hand-offs", "Opt-outs"],
      ["Qualified leads", "Bookings", "Purchases", "Resolutions"],
      ["Repeat purchase", "Retention", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Qualify leads", [1, 2], "Completion, qualification and hand-off to sales."],
      ["Support customers", [1, 2], "Resolutions and how often people need a person."],
      ["Drive sales", [1, 2], "Conversations that lead to bookings or purchases."],
      ["Retain customers", [1, 3], "Ongoing engagement — and opt-outs as a warning signal."],
    ],
  },
  learn: {
    title: "Every Conversation Should Improve the Next One",
    steps: [
      ["Campaign", "A qualification flow for enquiries from ads."],
      ["Signal", "Replies, drop-off points and hand-offs."],
      ["Insight", "People drop off at the budget question."],
      ["Decision", "Move the budget question after the product choice."],
      ["Experiment", "Test the new order against the old flow."],
      ["Learning", "Record what keeps conversations moving."],
      ["Better campaign", "The next flow starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Questions customers ask most", "help", ["Product", "Content", "Customer experience"]],
      ["Where conversations stall", "flag", ["Customer experience", "Sales"]],
      ["Intent signals before purchase", "target", ["Sales", "Market strategy"]],
      ["Complaints raised in chat", "msg", ["Product", "Customer experience"]],
      ["Messages people opt out after", "userx", ["Positioning", "Content"]],
    ],
  },
  why: {
    title: "Why Frequent Research for WhatsApp Marketing",
    items: [
      ["Consent before campaigns", "Opt-in journeys come first.", "shield"],
      ["Context and timing", "Messages that fit what the customer did.", "clock"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Human escalation", "Automation that knows when to step aside.", "user"],
      ["CRM-connected", "Conversations that lead somewhere.", "database"],
      ["AI-assisted, human-led", "Scale with people in control.", "bulb"],
    ],
  },
  related: {
    title: "WhatsApp Works Better When It's Connected",
    sub: "WhatsApp is one part of one customer journey.",
    center: "WhatsApp",
    links: [
      ["Marketing Automation", "Journeys that include WhatsApp where it fits.", ppDm("marketing-automation"), "digital"],
      ["Email Marketing", "Email and WhatsApp working together.", ppDm("email-marketing"), "digital"],
      ["E-commerce Marketing", "Order updates and conversations that convert.", ppDm("e-commerce-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Measure conversation outcomes.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: WA_FAQ,
  faqTitle: "WhatsApp Marketing: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/whatsapp-marketing-guide">WhatsApp marketing guide</PpL>.
    </>
  ),
  final: {
    sig: "Consent. Context. Conversation.",
    sigText: "WhatsApp messages customers welcome — with a person ready when they need one.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us how customers reach you today and what you want WhatsApp to do. We'll help define a responsible place to start.",
  },
};

function WA_Page() {
  return (
    <RL_Page
      c={{
        ...WA_CFG,
        before: (
          <>
                  <DK_Principles
        id="wa-perm-h"
        tone="light"
        kicker="Permission comes first"
        title="Better Marketing Starts With Customer Permission"
        sub={
          <>
            WhatsApp marketing should respect consent, customer expectations and platform rules — see the{" "}
            <PpX href="https://business.whatsapp.com/policy">WhatsApp Business Messaging Policy</PpX>. Campaigns follow applicable laws and your internal compliance
            requirements; this isn't legal advice.
          </>
        }
        items={["Opt-in", "Relevant message", "Clear context", "Easy response", "Responsible frequency", "Data responsibility", "Human oversight"]}
      />
          </>
        ),
        visuals: (
          <>
                  <DK_Flow
        id="wa-lflow-h"
        tone="off"
        kicker="From entry point to opportunity"
        title="Every Step After the First Message"
        steps={["Ad / search / website / social", "WhatsApp entry point", "Conversation", "Qualification", "Intent", "Sales routing", "CRM", "Follow-up", "Opportunity"]}
        highlightFrom={8}
      />
                  <DK_Chips
        id="wa-api-h"
        kicker="WhatsApp Business API"
        title="WhatsApp Business API: More Than a Messaging Connection"
        sub={
          <>
            Platform availability, messaging rules, conversation categories and costs depend on current Meta policies, your market, message types, business setup and the
            provider or integration model. See the <PpX href="https://developers.facebook.com/docs/whatsapp">WhatsApp Business Platform documentation</PpX>.
          </>
        }
        items={[
          ["Structured customer communication", "msg"],
          ["Campaign messaging", "megaphone"],
          ["Automation", "refresh"],
          ["Integrations", "layers"],
          ["Support workflows", "users"],
          ["Lead qualification", "check"],
          ["Notifications", "clock"],
          ["CRM-connected journeys", "database"],
          ["Scalable communication", "trend"],
        ]}
        note="We don't promise free, unlimited or guaranteed-delivery messaging, or guaranteed approvals."
      />
          </>
        ),
        after: (
          <>
                  <DK_Flow
        id="wa-crm-h"
        tone="off"
        kicker="WhatsApp + CRM"
        title="From Conversation to CRM to Customer"
        sub="The exact integration depends on your CRM, platform setup and available APIs or connectors — we confirm before promising."
        steps={["Website / ads / social", "WhatsApp", "Conversation", "Lead information", "CRM", "Sales follow-up", "Opportunity", "Customer", "Retention"]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={WA_FORM}
        title="Plan Your WhatsApp Journey"
        sub="A few quick steps help us understand your goals before we talk."
        type="WhatsApp Marketing Consultation"
        service="WhatsApp Marketing"
        icon="msg"
        submitLabel="Plan My WhatsApp Journey"
        successTitle="Thank you. Your WhatsApp marketing consultation request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need?",
            label: "Needs",
            multi: true,
            options: ["WhatsApp Marketing", "WhatsApp Business API / Platform", "WhatsApp Campaigns", "WhatsApp Automation", "WhatsApp Lead Generation", "CRM Integration", "WhatsApp Strategy", "Not sure yet"],
          },
          {
            k: "goal",
            t: "Goal",
            q: "Main goal",
            label: "Main goal",
            options: ["More leads", "More enquiries", "Customer engagement", "Sales", "Customer retention", "Automation", "Customer support", "Marketing campaigns"],
          },
          { k: "budget", t: "Budget", q: "Approximate monthly budget", label: "Monthly budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { WA_Page };
