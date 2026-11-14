/*
 * Digital Marketing Audit — /services/digital-marketing/digital-marketing-audit (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: business-aligned diagnosis across 16 dimensions —
 * "Find the Gaps Between What Your Marketing Does and What Your Business Needs." Hero: HV_HealthMap (no scores).
 * Kept: symptom vs cause tabs, diagnostic console, health status, priority quadrant, confidence labels, self-assessment.
 * No case study, no team details, no invented scores, no guaranteed improvements, no "free audit" claim.
 */
import * as ee from 'react';
import { DM_Form, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Cards, DK_Tabs } from '../components/dm/kit.jsx';
import { DK_Console, DK_Quad, DK_Quiz, DK_Status } from '../components/dm/kit2.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_HealthMap } from '../components/dm/heroes.jsx';

const AU_URL = "/services/digital-marketing/digital-marketing-audit";
const AU_TITLE = "Digital Marketing Audit Services | Frequent Research";
const AU_FORM = "au-consult";

const AU_FAQ = [
  ["What does a digital marketing audit include?", "A business-aligned review across market, audience, positioning, search, content, paid media, social, website, landing pages, conversion, analytics, automation, CRM alignment, customer journey, AI opportunities and measurement — ending in prioritised findings and a roadmap."],
  ["How is this audit different from a checklist?", "A checklist finds issues. This diagnostic starts with the business objective and the audience, traces symptoms to root causes, explains which gaps matter most and why, and labels how confident each finding is."],
  ["Does the audit include the audience perspective?", "Yes. Alongside channel data it looks at whether messaging, content and journeys fit the audience."],
  ["Will I get a score?", "No invented scores. Areas are shown as Healthy, Needs attention or Opportunity, based on the evidence actually reviewed — with an honest 'insufficient data' where that applies."],
  ["How does AI support the audit?", "AI helps detect patterns and summarise large datasets across channels. People validate every finding, judge priority and write the recommendations."],
  ["Can an audit identify why we're not generating enough leads?", "Yes — it traces the path from discovery to CRM, so the cause isn't assumed to be traffic alone."],
  ["How long does a digital marketing audit take?", "It depends on scope and data access; a focused audit is quicker than a full-ecosystem review. Timing is confirmed once scope is known."],
  ["Do you guarantee improved rankings or leads?", "No. An audit gives evidence and priorities; results depend on implementation and many external factors."],
];

const AU_CFG = {
  key: "au",
  pfx: "au",
  url: AU_URL,
  title: AU_TITLE,
  maTitle: "Digital Marketing Audit Services",
  desc: "A business-aligned digital marketing audit across 16 areas — from audience and positioning to analytics and CRM — with clear, prioritised next steps.",
  crumb: "Digital Marketing Audit",
  name: "Digital Marketing Audit",
  serviceType: "Digital marketing audit",
  schemaDesc:
    "Digital marketing audit: market, audience, positioning, search, content, paid media, social, website, landing pages, conversion, analytics, automation, CRM alignment, customer journey, AI opportunities and measurement, with prioritised findings and an action roadmap.",
  formId: AU_FORM,
  hero: {
    kicker: "Business-aligned diagnosis",
    h1: "Digital Marketing Audit",
    tag: "Find the Gaps Between What Your Marketing Does and What Your Business Needs.",
    lead: "Not a checklist. The audit starts with your business objective and your audience, reviews sixteen areas of the digital ecosystem, and explains what matters most, why it matters and what should happen next.",
    cta: "Request a Digital Marketing Audit",
    cta2: "Discuss a Marketing Challenge",
    cta2To: "/services/digital-marketing/digital-marketing-consulting",
    trust: ["16 audit dimensions", "Audience perspective", "Priorities, not lists", "Confidence-labelled findings", "AI-assisted, human-led"],
    vis: <HV_HealthMap />,
  },
  statement: ["An audit should tell you what matters — not just what's broken.", ["Objective", "Audience", "Ecosystem", "Evidence", "Root causes", "Priorities", "Roadmap"]],
  caps: [
    ["Market & Audience", "users"],
    ["Positioning", "compass"],
    ["Search & Content", "search"],
    ["Paid Media & Social", "megaphone"],
    ["Website & Conversion", "globe"],
    ["Analytics & Measurement", "bars"],
    ["Automation & CRM", "database"],
    ["AI Opportunities", "bulb"],
  ],
  problemNode:       <DK_Tabs
        id="au-sym-h"
        tone="off"
        kicker="The business problem"
        title="The Problem Isn't Always Where You Think It Is."
        sub="Pick a symptom to see the possible causes a diagnostic investigates."
        layers={[
          ["“We need more traffic.”", "trend", ["SEO visibility", "Search-intent mismatch", "Weak content", "Low-quality paid traffic", "Audience mismatch"]],
          ["“Our ads get clicks but few leads.”", "target", ["Landing page", "Offer", "Message mismatch", "Form friction", "Targeting", "Tracking"]],
          ["“We get leads but sales are weak.”", "flag", ["Lead quality", "Qualification", "CRM", "Follow-up", "Attribution", "Customer journey"]],
          ["“Nobody can say what's working.”", "bars", ["Tracking gaps", "Inconsistent definitions", "Disconnected data", "No business KPIs"]],
        ]}
      />,
  versus: {
    kicker: "What changes when an audit starts with the business",
    title: "Checklist Audit vs Business-Aligned Diagnosis",
    sub: "Both find issues. Only one tells you which ones matter to the business.",
    conv: ["Channel checklist", "Issues found", "Long report", "Hand-over"],
    fr: ["Business objective", "Audience", "Ecosystem map", "Channel evidence", "Root causes", "Priorities", "Roadmap", "Measure", "Review"],
  },
  diff: {
    kicker: "Beyond the checklist",
    title: "What Matters Most — and Why",
    sub: "How this audit differs — question by question.",
    answers: [
      "Runs each channel through a checklist, lists every issue found and hands over a long report with equal weight on everything.",
      "It starts with the business objective and the audience, maps how channels work together, traces symptoms to root causes and ranks findings by impact, effort and confidence.",
      "Audience and market context show whether messaging, content and journeys fit the people you need to reach.",
      "Leadership gets a clear view of where digital is helping or holding the business back, and where to invest next.",
      "Objectives, audiences, data access, channels in scope and the questions the audit must answer are agreed up front.",
      "Findings become a prioritised roadmap; implementation can follow, and a focused re-audit checks what changed.",
      "Channels are reviewed together, because issues in one — tracking, landing pages, messaging — often show up in another.",
      "AI helps detect patterns and anomalies across large datasets and summarise evidence quickly.",
      "People validate every finding, judge priority and confidence, and write the recommendations.",
      "Spend and effort directed at the gaps that matter most to the business objective.",
    ],
  },
  layers: {
    title: "The Full Digital Ecosystem, Read Against Your Objective",
    rows: [
      ["Market & audience", "users", "Assumed target audience", "Market context and audience fit of messages, content and journeys"],
      ["Positioning", "compass", "Brand guidelines reviewed", "How clearly and credibly the business is positioned against alternatives"],
      ["Channels", "layers", "One checklist per channel", "Cross-channel causes traced across search, content, paid, social and website"],
      ["Conversion & journey", "sliders", "Form and page checks", "Where the customer journey breaks — and for whom"],
      ["Measurement", "bars", "“Tracking is installed”", "Whether the data can be trusted to make decisions"],
      ["Priorities", "target", "A long list of issues", "Ranked by impact, effort, urgency and confidence"],
    ],
  },
  loop: {
    title: "How the Audit Works: Intelligence to Impact",
    center: "Diagnose · prioritise · act",
    texts: [
      "Understand the business objective, audience, market and the questions the audit must answer.",
      "Discover evidence across channels, journeys, measurement and competitors — with audience context from your own data.",
      "Define root causes, gaps and opportunities, each with a confidence level.",
      "Activate the roadmap: fix now, test next, plan, monitor.",
      "Measure whether the changes moved the right metrics.",
      "Learn which fixes mattered and which assumptions were wrong.",
      "Improve the next set of priorities.",
      "Grow with a focused re-audit when the business or market changes.",
    ],
  },
  capabilities: {
    title: "Sixteen Dimensions, One Diagnosis",
    sub: "Select a group to see the audit dimensions it covers.",
    layers: [
      ["Market, audience & positioning", "users", ["Market", "Audience", "Positioning"], "Is the marketing aimed at the right people, with the right promise?"],
      ["Search & content", "search", ["Search", "Content"], "Visibility, intent match and whether content answers real questions."],
      ["Paid media & social", "megaphone", ["Paid media", "Social"], "Are you buying the right attention and building the right relationships?"],
      ["Website & conversion", "globe", ["Website", "Landing pages", "Conversion"], "Where interest turns into action — or doesn't."],
      ["Journey, automation & CRM", "database", ["Customer journey", "Automation", "CRM alignment"], "Whether follow-up and lifecycle communication connect to sales."],
      ["Analytics & measurement", "bars", ["Analytics", "Measurement"], "Can the data be trusted, and does it answer business questions?"],
      ["AI opportunities", "bulb", ["AI opportunities"], "Where AI could responsibly improve analysis or execution."],
    ],
  },
  ai: {
    sub: "AI helps find the signals. People decide what matters.",
    ai: [
      ["Pattern and anomaly detection", "Across search, paid, social, site and CRM data."],
      ["Cross-channel summaries", "Condenses large datasets into reviewable evidence."],
      ["Content and search analysis", "Compares coverage with what audiences search for."],
      ["Competitor content comparison", "Highlights positioning and topic gaps."],
      ["Draft finding summaries", "Starting points that people verify and rewrite."],
    ],
    human: [
      ["Validating every finding", "Nothing reaches the report unchecked."],
      ["Business and audience context", "What a gap means for this business."],
      ["Priority and confidence", "Impact, effort, urgency and how sure we are."],
      ["Recommendations", "Practical actions, in order."],
      ["The final roadmap", "Agreed with you, not generated."],
    ],
  },
  metrics: {
    title: "An Audit Checks Every Level of Measurement",
    sub: "Many audits stop at activity metrics. Choose the question you need answered to see which levels the diagnosis focuses on.",
    tiers: [
      ["Reach", "Visibility", "Share of search", "Paid impressions"],
      ["Engagement", "Journeys", "Drop-off points", "Content interaction"],
      ["Enquiries", "Purchases", "Qualified actions", "Form completion"],
      ["Pipeline", "Customer value", "Retention", "Revenue indicators (where data allows)"],
    ],
    objectives: [
      ["Why aren't we growing?", [0, 1, 2, 3], "A full diagnosis looks across all four levels to find where growth stalls."],
      ["Why do leads not convert?", [2, 3], "The focus moves to qualification, CRM and sales feedback."],
      ["Where is spend wasted?", [0, 2], "Activity and conversion data show which spend reaches the wrong people."],
      ["Can we trust our data?", [1, 2], "Tracking and definitions are checked before conclusions are drawn."],
    ],
  },
  learn: {
    title: "From Diagnosis to Continuous Improvement",
    steps: [
      ["Campaign", "Your current marketing, as it runs today."],
      ["Signal", "Evidence across sixteen dimensions."],
      ["Insight", "Root causes — not just symptoms."],
      ["Decision", "Fix now, test next, plan, monitor."],
      ["Experiment", "Priority fixes implemented and tested."],
      ["Learning", "Which changes moved the right metrics."],
      ["Better campaign", "The next cycle starts from a healthier system."],
    ],
  },
  intel: {
    signals: [
      ["Gaps between promise and experience", "flag", ["Customer experience", "Positioning"]],
      ["Audiences the marketing misses", "users", ["Market strategy", "Positioning"]],
      ["Questions content doesn't answer", "help", ["Content", "Sales"]],
      ["Leads that never reach sales properly", "database", ["Sales", "Customer experience"]],
      ["Products drawing unexpected interest", "trend", ["Product", "Market strategy"]],
    ],
  },
  why: {
    title: "Why a Frequent Research Audit",
    items: [
      ["Diagnosis", "Evidence first, interpretation second, recommendations third.", "search"],
      ["Audience perspective", "Channels judged by how well they serve the people you need to reach.", "users"],
      ["Sixteen dimensions", "From market and positioning to CRM and AI opportunities.", "layers"],
      ["Priorities, not lists", "Ranked by impact, effort, urgency and confidence.", "target"],
      ["Honest statuses", "Healthy, needs attention or opportunity — never invented scores.", "check"],
      ["AI-assisted, human-led", "Faster analysis; people accountable for every recommendation.", "bulb"],
    ],
  },
  related: {
    title: "From Findings to Fixes",
    sub: "An audit often reveals questions bigger than one channel.",
    center: "Audit findings",
    links: [
      ["Digital Marketing Consulting", "Turn the roadmap into strategic decisions.", ppDm("digital-marketing-consulting"), "digital"],
      ["SEO Services", "Implement search findings.", ppDm("seo-services"), "digital"],
      ["Google Ads / PPC", "Fix paid media waste and intent gaps.", ppDm("google-ads-ppc"), "digital"],
      ["Social Media Marketing", "Give social a clear job and audience.", ppDm("social-media-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Fix measurement so future decisions rest on reliable data.", ppDm("digital-analytics-and-reporting"), "data"],
      ["Marketing Automation", "Connect follow-up and lifecycle journeys to sales.", ppDm("marketing-automation"), "digital"],
    ],
  },
  faq: AU_FAQ,
  faqTitle: "Digital Marketing Audit: Frequently Asked Questions",
  guide: {
    title: "Digital Marketing Audit: A Clear, Honest Review of What Works and What to Fix",
    cover: ["Frequent Research · Guide", "Digital Marketing Audit", "Diagnose · prioritise · act"],
    topics: ["What an audit covers", "Symptoms vs causes", "Measurement quality", "Prioritising findings", "From findings to a roadmap"],
    to: "/blog/digital-marketing-audit-guide",
  },
  final: {
    sig: "Marketing Challenge. Business Context. Better Direction.",
    sigText: "Start with the business question — not just the channel.",
    title: "Find the Gaps Before You Spend More.",
    text: "Tell us what you're trying to achieve and what feels stuck. We'll recommend the right audit scope.",
  },
};

function AU_Page() {
  return (
    <RL_Page
      c={{
        ...AU_CFG,
        visuals: (
          <>
                  <DK_Console
        id="au-fw-h"
        kicker="How the diagnostic works"
        title="Seven Stages From Signals to a Roadmap"
        sub="Click any stage."
        steps={[
          ["Discover", "Business objectives, audience, market, competitors and digital ecosystem."],
          ["Map", "Channels, customer journeys, conversion paths and measurement points."],
          ["Audit", "SEO, paid media, website, content, social, conversion, analytics and CRM."],
          ["Identify", "Gaps, friction, inconsistencies and root causes."],
          ["Prioritise", "Fix now, test next, monitor, reconsider."],
          ["Recommend", "Findings translated into practical actions."],
          ["Roadmap", "A prioritised action plan."],
        ]}
      />
                  <DK_Status
        id="au-health-h"
        kicker="Digital marketing health"
        title="How Healthy Is Each Part of Your Marketing?"
        sub="Conceptual states instead of invented scores — including an honest “insufficient data”."
        dashTitle="Digital marketing health check"
        levels={[
          ["Strong", "s"],
          ["Needs attention", "n"],
          ["High priority", "c"],
          ["Insufficient data", "x"],
        ]}
        headShort={["Strong", "Attention", "Priority", "No data"]}
        rows={[
          ["Strategy & audience", "compass", 1],
          ["Search", "search", 0],
          ["Paid media", "target", 1],
          ["Content", "file", 1],
          ["Website & conversion", "sliders", 2],
          ["Lead generation", "flag", 2],
          ["Analytics", "bars", 2],
          ["CRM", "database", 3],
        ]}
        note="Statuses only — not data about any real business."
      />
                  <DK_Quad
        id="au-quad-h"
        tone="off"
        kicker="Priority matrix"
        title="Every Recommendation Has a Reason — and a Place"
        sub="Each finding is weighed on impact, effort, urgency and confidence."
        axes={["Impact", "Effort"]}
        start={0}
        quads={[
          ["Fix now", "High impact · low effort", "Critical tracking issues, broken conversion paths, quick technical fixes.", "flag", "e"],
          ["Plan", "High impact · high effort", "Rebuilds, new content programmes, CRM integration, audience strategy.", "compass", "w"],
          ["Monitor", "Lower impact · low effort", "Keep an eye on it; act if it grows.", "eyeoff", "m"],
          ["Reconsider", "Lower impact · high effort", "Challenge whether it's worth doing.", "help", "r"],
        ]}
      />
          </>
        ),
        after: (
          <>
                  <DK_Cards
        id="au-conf-h"
        cols={4}
        kicker="Confidence levels"
        title="We Never Pretend the Data Says More Than It Does."
        items={[
          ["Observed", "Directly supported by available evidence.", "eyeoff"],
          ["Inferred", "A reasonable interpretation that needs validation.", "bulb"],
          ["Recommended", "A strategic action based on the findings.", "compass"],
          ["Test", "A hypothesis to validate through experimentation.", "flask"],
        ]}
      />
                  <DK_Quiz
        id="au-quiz-h"
        kicker="Self-assessment"
        title="How Healthy Is Your Digital Marketing?"
        sub="Seven quick questions. Nothing is stored or sent."
        questions={[
          "Can you identify your highest-value acquisition channels?",
          "Can you connect marketing activity to qualified leads or sales?",
          "Is conversion tracking reliable?",
          "Do you know where your funnel leaks?",
          "Is your messaging based on evidence about your audience?",
          "Are content and social working toward clear objectives?",
          "Are you using AI where it genuinely improves analysis or execution?",
        ]}
        threshold={2}
        result={["A digital marketing audit may be the right starting point.", "You have solid foundations — a focused audit can still find the next opportunity.", "Answer each question to see a suggestion."]}
        cta="Request a Digital Marketing Audit"
        formId={AU_FORM}
      />
          </>
        ),
        formNode:       <DM_Form
        id={AU_FORM}
        kicker="Audit request"
        title="Request a Digital Marketing Audit"
        sub="Share what you're trying to improve. We'll review your requirement and identify the right audit scope and starting point."
        type="Digital Marketing Audit Request"
        service="Digital Marketing Audit"
        icon="search"
        submitLabel="Request My Audit"
        successTitle="Thank you. Your audit request has been sent."
        msgLabel="Message (optional)"
        chips={[
          {
            k: "scope",
            t: "Audit",
            q: "What do you want to audit?",
            label: "Audit scope",
            multi: true,
            options: ["Full digital marketing audit", "SEO", "Google Ads / PPC", "Website & CRO", "Lead generation funnel", "Social media", "Content", "Analytics & tracking", "E-commerce", "Customer journey", "Not sure"],
          },
          {
            k: "fix",
            t: "Problem",
            q: "What are you trying to fix?",
            label: "Trying to fix",
            multi: true,
            options: [
              "Need more qualified leads",
              "Traffic is not converting",
              "Paid media is inefficient",
              "SEO is not performing",
              "Website conversion is weak",
              "Tracking is unclear",
              "Marketing feels fragmented",
              "Need a growth roadmap",
              "Need better visibility into performance",
              "Other",
            ],
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

export { AU_Page };
