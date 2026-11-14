/*
 * Digital Marketing Consulting — /services/digital-marketing/digital-marketing-consulting (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page — the most strategic service; reads as a consulting experience.
 * USP: research-led decisions — Business Question → Evidence → Strategic Options → Decision → Activation → Measurement.
 * Hero visual: HV_Decision. Kept: noise-vs-question split, advisory areas, deliverables, priority quadrant, "stop doing".
 * No case study, no team details, no guarantees, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Cards, DK_Chips } from '../components/dm/kit.jsx';
import { DK_Quad, DK_Split } from '../components/dm/kit2.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Decision } from '../components/dm/heroes.jsx';

const DC_URL = "/services/digital-marketing/digital-marketing-consulting";

const DC_TITLE = "Digital Marketing Consulting | Frequent Research";

const DC_FORM = "dc-consult";

const DC_FAQ = [
  ["What is digital marketing consulting?", "Independent, business-first advice that helps you make a marketing decision — where to focus, which audiences matter, which channels play which role, how to measure and how to invest — and turns it into a practical roadmap."],
  ["How is your approach to consulting different?", "Advice starts from the business question and evidence — audience, market, performance and customer data — rather than from the channels a provider happens to sell. Options are compared openly, and recommendations come with the evidence behind them."],
  ["When should a business hire a digital marketing consultant?", "When marketing feels fragmented, spend isn't clearly linked to results, you're entering a new market, choosing between strategic options or need a roadmap before scaling activity."],
  ["Do you provide a strategy or only recommendations?", "Both: a diagnosis, strategic options, a priority matrix, a measurement framework and a roadmap — and, if you want, help activating it through the digital marketing services."],
  ["Can you help us decide which channels to prioritise?", "Yes. Each channel's role is assessed against your audience, business model, maturity and objective — the right mix differs for every business."],
  ["How does AI support consulting?", "AI speeds up analysis, scenario comparison, pattern detection and summarisation. People make the strategic decisions and validate every recommendation."],
  ["Do you guarantee marketing results?", "No. Rankings, ROAS or revenue aren't guaranteed — the work provides clear priorities, honest evidence and a practical plan."],
];

const DC_CFG = {
  key: "dc",
  pfx: "dc",
  url: DC_URL,
  title: DC_TITLE,
  maTitle: "Digital Marketing Consulting",
  desc: "Digital marketing consulting for marketing decisions, not just campaigns: audience, positioning, channel mix, measurement and AI — grounded in evidence.",
  crumb: "Digital Marketing Consulting",
  name: "Digital Marketing Consulting",
  serviceType: "Digital marketing consulting",
  schemaDesc:
    "Digital marketing consulting: market opportunity, audience, positioning, channel mix, customer journey, digital maturity, campaign performance, measurement, marketing technology and AI opportunities — from business question and evidence to strategic options, decisions and roadmap.",
  formId: DC_FORM,
  hero: {
    dark: true,
    kicker: "Decision intelligence · Strategic consulting",
    h1: "Digital Marketing Consulting",
    tag: "When You Need a Marketing Decision, Not Just Another Marketing Campaign.",
    lead: "Some questions are bigger than a channel: which market to enter, which audience to prioritise, where budget should go, what to stop. The work starts with the business question, gathers the evidence, lays out the options and helps you decide — then connects the decision to activation and measurement.",
    cta: "Discuss a Marketing Challenge",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Business question first", "Evidence-based options", "Channel mix", "Measurement", "AI-assisted, human-led"],
    vis: <HV_Decision />,
  },
  statement: ["The question isn't what you can do. It's what you should do next — and why.", ["Business question", "Evidence", "Strategic options", "Decision", "Activation", "Measurement"]],
  caps: [
    ["Market Opportunity", "globe"],
    ["Audience & Positioning", "users"],
    ["Channel Mix", "layers"],
    ["Customer Journey", "map"],
    ["Digital Maturity", "trend"],
    ["Measurement", "bars"],
    ["Marketing Technology", "cpu"],
    ["AI Opportunities", "bulb"],
  ],
  problemNode:       <DK_Split
        id="dc-noise-h"
        kicker="The problem"
        title="More Marketing Activity Doesn't Always Mean Better Marketing."
        sub="Consulting turns fragmented activity into clear priorities, measurable decisions and an actionable growth roadmap."
        states={[
          ["Marketing noise", "Everything is increasing", ["More channels", "More campaigns", "More content", "More dashboards", "More data", "More reports"]],
          ["One clear question", "What should we do next?", ["What to prioritise", "Where to invest", "What to stop", "What to test", "How to measure"]],
        ]}
        caption="The question is not what you can do. It's what you should do next."
      />,
  versus: {
    kicker: "Why our approach changes marketing advice",
    title: "Channel Advice vs Business-First Decisions",
    sub: "Both produce recommendations. One starts from the channels; the other starts from the business question.",
    conv: ["Channel audit", "Best practices", "Campaign plan", "Execution"],
    fr: ["Business question", "Evidence", "Audience & market", "Strategic options", "Decision", "Activation", "Measurement", "Learning"],
  },
  diff: {
    kicker: "Where audience insight meets strategy",
    title: "Evidence Before Recommendations",
    sub: "How this consulting approach differs — question by question.",
    answers: [
      "Reviews the channels, compares them with best practice and recommends a campaign plan — often around the services the provider sells.",
      "It starts with the business question, gathers evidence on audience, market, performance and maturity, lays out real options with trade-offs and helps you decide.",
      "Existing data shows what is happening; analysis, testing and business context explain why and test options before budget is committed.",
      "Clarity on where to invest, what to stop and how to measure — useful to leadership, sales and product, not just marketing.",
      "The decision to be made, the evidence available, the gaps, and how success will be judged are agreed before any recommendation.",
      "Decisions are tracked against agreed measures and revisited as evidence changes; activation can follow through the digital services.",
      "Channel roles are designed as one system: search, paid, social, content, CRM, website and analytics.",
      "AI speeds up data analysis, scenario comparison, competitor and content review, and summarisation.",
      "Strategic judgement, trade-offs, business context, ethics and the final recommendation stay with people — and the decision stays with you.",
      "A marketing strategy that connects to the business plan, not just the next campaign calendar.",
    ],
  },
  layers: {
    title: "The Evidence Behind Every Recommendation",
    rows: [
      ["Market opportunity", "globe", "General market assumptions", "Where demand is, how it's changing and what competitors offer"],
      ["Audience", "users", "Persona documents", "Segments, needs and decision drivers — validated where uncertain"],
      ["Positioning", "compass", "Brand messaging", "How clearly and credibly you stand apart for the audience that matters"],
      ["Channel mix", "layers", "Channels by habit", "Each channel's role for this audience, model and objective"],
      ["Digital maturity", "trend", "Tool inventory", "Processes, data, technology and skills against the ambition"],
      ["Measurement", "bars", "Platform reports", "A framework that connects activity to business outcomes"],
    ],
  },
  loop: {
    title: "How Consulting Works: Intelligence to Impact",
    center: "Decision intelligence",
    texts: [
      "Understand the business question, objectives, constraints and the decision that needs to be made.",
      "Discover evidence: performance data, audience and market understanding, competitors and digital maturity.",
      "Define strategic options, trade-offs and criteria for choosing.",
      "Activate the chosen direction through a roadmap — and, if you want, through the digital marketing services.",
      "Measure progress against an agreed framework.",
      "Learn what the evidence now says.",
      "Improve priorities, budgets and channel roles.",
      "Grow with decisions connected to the business plan.",
    ],
  },
  capabilities: {
    title: "Areas We Advise On",
    layers: [
      ["Marketing strategy", "compass", ["Market opportunity", "Positioning", "Go-to-market thinking", "Growth priorities", "Budget allocation"], "Where to play and how to win attention."],
      ["Audience & customer journey", "users", ["Segments", "Decision drivers", "Journey mapping", "Conversion barriers"], "Who matters and how they decide."],
      ["Channel mix", "layers", ["SEO & organic", "Paid media", "Social", "Content", "CRM & retention"], "Which channels play which role."],
      ["Digital maturity", "trend", ["Processes", "Skills", "Data", "Technology stack"], "What needs to change to deliver the strategy."],
      ["Analytics & measurement", "bars", ["Tracking", "Attribution", "Funnel measurement", "Decision dashboards"], "What to measure and why."],
      ["Technology & automation", "cpu", ["Martech review", "Automation opportunities", "Data integration"], "Tools that serve the strategy, not the other way round."],
      ["AI opportunities", "bulb", ["Use-case assessment", "Governance", "Workflow design"], "Where AI can responsibly help — and where it shouldn't."],
    ],
  },
  ai: {
    sub: "AI accelerates the analysis. It does not replace strategic judgement.",
    ai: [
      ["Data analysis", "Faster review of performance and customer data."],
      ["Scenario comparison", "Side-by-side views of strategic options."],
      ["Competitor and content review", "Summaries of what competitors say and publish."],
      ["Pattern detection", "Trends and anomalies worth investigating."],
      ["Summarisation", "Clear briefings from large volumes of evidence."],
    ],
    human: [
      ["Business context", "What matters to this business, now."],
      ["Strategic judgement", "Trade-offs between options."],
      ["Ethical considerations", "Data use, privacy and responsible marketing."],
      ["Final recommendations", "Written and owned by people."],
      ["Your decision", "Recommendations inform it; you make it."],
    ],
  },
  metrics: {
    title: "Measure What the Decision Was Meant to Change",
    sub: "A consulting engagement is judged by better decisions and their outcomes. Choose a strategic question.",
    tiers: [
      ["Visibility", "Share of search", "Reach in target segments"],
      ["Engagement quality", "Journey progression", "Return visits"],
      ["Qualified actions", "Leads", "Purchases", "Conversion rates by segment"],
      ["Pipeline", "Customer value", "Retention", "Marketing efficiency (where data allows)"],
    ],
    objectives: [
      ["Where should we invest?", [2, 3], "Investment decisions are judged by qualified actions and business outcomes."],
      ["Should we enter a new market?", [0, 1, 2], "Early signals of visibility, engagement and response test the decision."],
      ["Is our positioning working?", [0, 1], "Reach and engagement in the right segments show whether the message lands."],
      ["Are we retaining customers?", [3], "Retention and customer value show whether growth is durable."],
    ],
  },
  learn: {
    title: "Decisions Should Be Revisited as the Evidence Changes",
    steps: [
      ["Campaign", "The chosen strategy goes live."],
      ["Signal", "Measures agreed in the framework start reporting."],
      ["Insight", "Is the decision working — and for which audiences?"],
      ["Decision", "Continue, adjust or change course."],
      ["Experiment", "Test the riskiest assumption first."],
      ["Learning", "Update the evidence base."],
      ["Better campaign", "The next decision starts from stronger evidence."],
    ],
  },
  intel: {
    signals: [
      ["Which audiences respond to which propositions", "users", ["Positioning", "Product", "Market strategy"]],
      ["Channels that create value vs activity", "bars", ["Market strategy", "Sales"]],
      ["Gaps between promise and experience", "flag", ["Customer experience", "Product"]],
      ["Emerging demand in new segments", "trend", ["Market strategy", "Product"]],
      ["Objections that recur across channels", "help", ["Sales", "Content", "Positioning"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Consulting",
    items: [
      ["Evidence before opinion", "Data, method and honest interpretation applied to marketing decisions.", "search"],
      ["Options, not a sales pitch", "Strategic options compared on evidence and trade-offs.", "scale"],
      ["Technology-aware advice", "Recommendations that account for the website, CRM, analytics and automation underneath.", "layers"],
      ["Strategy connected to execution", "Advice that turns into a roadmap the business can actually run.", "box"],
      ["Strategy connected to execution", "Recommendations can be activated and measured.", "rocket"],
      ["AI-assisted, human-led", "Faster analysis; people accountable for every recommendation.", "bulb"],
    ],
  },
  related: {
    title: "From Decision to Activation",
    sub: "Consulting connects to diagnosis, measurement and execution.",
    center: "Consulting",
    links: [
      ["Digital Marketing Audit", "Diagnose the current system before deciding.", ppDm("digital-marketing-audit"), "digital"],
      ["Digital Analytics & Reporting", "Measure whether the decision is working.", ppDm("digital-analytics-and-reporting"), "data"],
      ["Performance Marketing", "Activate and optimise across the full funnel.", ppDm("performance-marketing"), "digital"],
      ["B2B Digital Marketing", "Strategy for complex buying committees.", ppDm("b2b-digital-marketing"), "digital"],
    ],
  },
  faq: DC_FAQ,
  faqTitle: "Digital Marketing Consulting: Frequently Asked Questions",
  guide: {
    title: "Digital Marketing Strategy: From Channel Complexity to Smarter Decisions",
    cover: ["Frequent Research · Insight", "Digital Marketing Strategy", "From complexity to decisions"],
    topics: ["Starting with the business question", "Audience and market evidence", "Choosing a channel mix", "Measurement frameworks", "AI in strategy"],
    to: "/blog/digital-marketing-consulting-guide",
  },
  final: {
    sig: "Marketing Challenge. Business Context. Better Direction.",
    sigText: "Start with the business question — not just the channel.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us what you are trying to achieve, who you need to reach and what is currently getting in the way. We can help identify the right mix of strategy, digital activation, analytics and AI-assisted capabilities.",
  },
};

function DC_Page() {
  return (
    <RL_Page
      c={{
        ...DC_CFG,
        visuals: (
          <>
                  <DK_Cards
        id="dc-del-h"
        cols={4}
        kicker="Consulting deliverables"
        title="The Strategy Toolkit You Receive"
        items={[
          ["Executive diagnosis", "What is happening and why.", "file"],
          ["Opportunity map", "Where the biggest opportunities may be.", "map"],
          ["Channel strategy", "Which channels play which role.", "layers"],
          ["Customer journey map", "Where customers discover, evaluate and convert.", "users"],
          ["Priority matrix", "Do now, test next, defer, stop.", "grid"],
          ["Measurement framework", "What to measure and why.", "bars"],
          ["90-day action roadmap", "Priorities turned into practical actions.", "clock"],
          ["Longer-term roadmap", "Direction beyond the immediate quarter.", "trend"],
        ]}
      />
                  <DK_Quad
        id="dc-quad-h"
        tone="off"
        kicker="Prioritisation matrix"
        title="Every Recommendation Lands Somewhere"
        sub="Impact × effort — a decision tool, not a score."
        axes={["Impact", "Effort"]}
        quads={[
          ["Act now", "High impact · low effort", "Quick wins that matter — fix or launch first.", "rocket", "e"],
          ["Plan", "High impact · high effort", "Worth doing properly — resource and schedule it.", "compass", "w"],
          ["Consider", "Lower impact · low effort", "Do when capacity allows.", "check", "m"],
          ["Question", "Lower impact · high effort", "Challenge whether it should happen at all.", "help", "r"],
        ]}
        start={0}
      />
          </>
        ),
        after: (
          <>
                  <DK_Chips
        id="dc-stop-h"
        tone="dark"
        kicker="What should we stop doing?"
        title="Good Consulting Doesn't Only Tell You What To Do."
        sub="Stop guessing. Start prioritising."
        items={[
          ["What to stop", "flag"],
          ["What to simplify", "sliders"],
          ["What to test", "flask"],
          ["What to automate", "refresh"],
          ["What to measure", "bars"],
          ["What to invest in", "trend"],
        ]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={DC_FORM}
        kicker="Consultation"
        title="Discuss a Marketing Challenge"
        sub="Share what you're trying to achieve. We'll review your requirement and suggest the right strategic starting point."
        type="Digital Marketing Consulting Enquiry"
        service="Digital Marketing Consulting"
        icon="compass"
        submitLabel="Discuss My Marketing Challenge"
        successTitle="Thank you. Your consulting request has been sent."
        msgLabel="Message (optional)"
        chips={[
          {
            k: "challenge",
            t: "Challenge",
            q: "Your challenge",
            label: "Challenge",
            multi: true,
            options: [
              "Need a digital marketing strategy",
              "Not sure which channels to prioritise",
              "Marketing performance is inconsistent",
              "Need better lead generation",
              "Need better conversion",
              "Need help with SEO / PPC",
              "Need analytics and measurement",
              "Need an AI-assisted marketing roadmap",
              "Need a complete digital marketing audit",
              "Other",
            ],
          },
          {
            k: "goal",
            t: "Goals",
            q: "Your goals",
            label: "Goals",
            multi: true,
            options: ["More qualified leads", "More online sales", "Better conversion", "Stronger organic visibility", "Better paid media efficiency", "Better customer retention", "Better measurement", "Clearer marketing priorities"],
          },
          {
            k: "market",
            t: "Market",
            q: "Market (optional)",
            label: "Market",
            multi: true,
            optional: true,
            options: ["India", "United States", "United Kingdom", "UAE / Middle East", "South-East Asia", "Europe", "Multiple / other"],
          },
          { k: "budget", t: "Budget", q: "Budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { DC_Page };
