/*
 * Digital Analytics & Reporting — /services/digital-marketing/digital-analytics-and-reporting (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: decision intelligence — Data → Behaviour → Insight → Decision;
 * "data tells you what happened; research helps explain why". Hero visual: HV_ControlRoom (example interface).
 * Kept: data-everywhere streams, dashboard-vs-business split, RL_Why, data-quality leak, decision dashboard,
 * confidence labels, measurement health check. No case study, no team details, no invented numbers or partnerships.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Cards, DK_Leak, DK_Report, DK_Sec, DK_Streams } from '../components/dm/kit.jsx';
import { DK_Split, DK_Status } from '../components/dm/kit2.jsx';
import { RL_Page, RL_Why } from '../components/dm/kit4.jsx';
import { HV_ControlRoom } from '../components/dm/heroes.jsx';

const AN_URL = "/services/digital-marketing/digital-analytics-and-reporting";
const AN_TITLE = "Digital Analytics & Reporting Services | Frequent Research";
const AN_FORM = "an-consult";

const AN_FAQ = [
  ["What does Digital Analytics & Reporting include?", "Measurement strategy, KPI frameworks, GA4 and tracking, data-quality review, campaign, channel, funnel, audience and cohort analysis, dashboards and business intelligence views, insight reports and ongoing reporting."],
  ["How is your approach to analytics different?", "Reporting is treated as the start of a decision, not the end of a month. Every analysis is tied to a business question, interpreted in context and finished with a recommendation — and where the data can't explain why something happened, testing and feedback can."],
  ["Can you work with GA4, Tag Manager and BI tools?", "Yes — GA4, Google Tag Manager and the business intelligence tools you already use, such as Power BI, Tableau or Looker Studio, without claiming vendor partnerships."],
  ["How does AI support analytics?", "AI helps detect anomalies and patterns, summarise large datasets and draft insight narratives. People validate findings, interpret context and make recommendations."],
  ["Can you help identify why our traffic isn't converting?", "Yes — funnel and journey analysis shows where visitors drop, and testing or session analysis can help explain why."],
  ["What data do you need to begin?", "Usually read access to analytics, ad platforms and, where relevant, CRM or e-commerce data — exactly what's needed is confirmed during scoping."],
  ["Do you guarantee better performance from analytics?", "No. Analytics improves the quality of decisions; outcomes depend on what is implemented and on market conditions."],
];

const AN_CFG = {
  key: "an",
  pfx: "an",
  url: AN_URL,
  title: AN_TITLE,
  maTitle: "Digital Analytics & Reporting Services",
  desc: "Turn digital activity into decisions you can act on: analytics, reporting and dashboards that connect data, behaviour and insight — and explain why.",
  crumb: "Digital Analytics & Reporting",
  name: "Digital Analytics & Reporting",
  serviceType: "Digital analytics and reporting",
  schemaDesc:
    "Digital analytics and reporting: measurement strategy, KPI frameworks, GA4 and tracking, data quality, campaign, channel, funnel, audience and cohort analysis, anomaly detection, dashboards, business intelligence and decision support connecting data, behaviour, insight and decisions.",
  formId: AN_FORM,
  hero: {
    dark: true,
    kicker: "Decision intelligence",
    h1: "Digital Analytics & Reporting",
    tag: "Don't Just Measure Marketing. Understand What the Signals Are Telling You.",
    lead: "Turn digital activity into decisions you can act on. Analytics here is a bridge — from data, to behaviour, to insight, to decision — built around the questions the business needs answered.",
    cta: "Turn Your Data Into Decisions",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Measurement strategy", "GA4 & tracking", "Dashboards & BI", "Insight, not data dumps", "AI-assisted, human-led"],
    vis: <HV_ControlRoom />,
  },
  statement: ["Your data is not the answer until it becomes insight.", ["Data", "Behaviour", "Insight", "Decision", "Action", "Measure again"]],
  caps: [
    ["KPI Frameworks", "flag"],
    ["GA4 & Tag Manager", "bars"],
    ["Campaign Analytics", "target"],
    ["Funnel Analysis", "sliders"],
    ["Audience & Cohorts", "users"],
    ["Dashboards & BI", "grid"],
    ["Anomaly Detection", "eyeoff"],
    ["Insight Reports", "file"],
  ],
  problemNode: (
    <>
            <DK_Sec tone="dark" className="dk-strsec" label="an-frag-h">
        <PP_Head k="The business problem" id="an-frag-h" t="Your Business Has Data Everywhere. Is It Telling You the Full Story?" s="The problem isn't a lack of data. It's disconnected data — and charts that stop before the question is answered." light center />
        <DK_Streams
          dark
          inputs={[
            ["Website · traffic, engagement", "globe"],
            ["Paid media · spend, clicks", "target"],
            ["Search · queries, intent", "search"],
            ["Social · reach, engagement", "users"],
            ["CRM · leads, pipeline", "database"],
            ["E-commerce · orders, revenue", "box"],
          ]}
          core="Disconnected signals"
          coreSub="Many sources"
          outputs={["Isolated reports", "Isolated decisions"]}
        />
      </DK_Sec>
            <DK_Split
        id="an-says-h"
        kicker="What's actually happening?"
        title="What the Dashboard Says vs What the Business Needs to Know"
        states={[
          ["What the dashboard says", "Numbers without meaning", ["Traffic ↑", "Clicks ↑", "Leads →", "Conversion ↓", "Cost ↑", "Revenue ?"]],
          ["What the business needs", "Questions that lead to decisions", ["Which channels create valuable customers?", "Where are prospects dropping?", "Which campaigns deserve more investment?", "Which segments behave differently — and why?", "What should we test next?"]],
        ]}
        caption="Reporting shows what happened. Analytics explains how. Context and testing help explain why."
      />
    </>
  ),
  versus: {
    kicker: "Why our approach changes analytics",
    title: "Dashboard Reporting vs Decision Intelligence",
    sub: "Both produce charts. Only one ends with a decision.",
    conv: ["Data export", "Dashboard", "Monthly report", "Charts"],
    fr: ["Business question", "Data", "Behaviour", "Analysis", "Insight", "Explain why", "Recommendation", "Decision", "Measure again"],
  },
  diff: {
    kicker: "Intelligence behind every report",
    title: "Reporting That Answers the Next Business Question",
    sub: "How this analytics approach differs — question by question.",
    answers: [
      "Connects platforms to a dashboard, reports channel metrics monthly and leaves interpretation to whoever reads the charts.",
      "Every analysis starts with a business question, uses data checked for quality, is interpreted in context and ends with a recommendation and a confidence level.",
      "Behaviour data explains what happened. Testing, customer feedback and sales knowledge can explain why — the part dashboards usually miss.",
      "Marketing data becomes decision support for budget, channel, product and customer questions — not just a performance record.",
      "Business questions, KPIs, definitions, tracking accuracy and data sources are agreed before dashboards are built.",
      "Findings become actions; results are measured again so the business learns which decisions worked.",
      "Analytics connects SEO, paid media, social, email, website, CRM and e-commerce into one view of the journey.",
      "AI detects anomalies and patterns, summarises large datasets and drafts insight narratives quickly.",
      "People validate findings, interpret context, judge confidence, protect privacy and make the recommendations.",
      "Better, faster decisions about where to invest, what to fix and what to test next.",
    ],
  },
  layers: {
    title: "From Data to Decision: What Each Layer Adds",
    rows: [
      ["Data", "database", "Platform data as exported", "Checked for quality, definitions agreed, sources connected"],
      ["Behaviour", "map", "Sessions and clicks", "Journeys, funnels, segments and cohorts that show where change happens"],
      ["Context", "compass", "Numbers shown on their own", "Read against objectives, seasonality, market and sales context"],
      ["Insight", "bulb", "“Conversion fell this month”", "Why it fell — supported by data, testing or feedback"],
      ["Recommendation", "target", "Left to the reader", "A prioritised action with a confidence level"],
      ["Decision", "check", "Next month's report", "A change or test — then measured again"],
    ],
  },
  loop: {
    title: "How Analytics Works: Intelligence to Impact",
    center: "Data to decision",
    texts: [
      "Understand the business questions, objectives and decisions the data needs to support.",
      "Discover what data exists, where it's broken and what behaviour it can (and can't) show.",
      "Define KPIs, metric definitions, measurement plans and dashboard views.",
      "Activate tracking, data connections, dashboards and insight reporting.",
      "Measure traffic, engagement, audiences, conversion, campaigns, content and channels.",
      "Learn what changed and why — using testing or feedback where behaviour alone can't explain it.",
      "Improve with prioritised recommendations, tests and anomaly follow-up.",
      "Grow by making investment decisions on evidence.",
    ],
  },
  capabilities: {
    title: "Analytics and Reporting, From Measurement to Decision",
    layers: [
      ["KPI frameworks", "flag", ["Business questions", "Objective-led KPIs", "Metric definitions", "Targets and thresholds"], "Measure what decisions need — not everything that can be counted."],
      ["GA4 & tracking", "bars", ["Measurement plans", "GA4 configuration", "Tag Manager", "Consent-aware tracking", "Audits"], "Reliable data before any dashboard."],
      ["Campaign & channel analytics", "target", ["Channel performance", "Campaign comparison", "Attribution views", "Budget efficiency"], "Which activity creates value — interpreted carefully."],
      ["Funnel & journey analysis", "sliders", ["Drop-off analysis", "Journey paths", "Device and segment differences"], "Find the leak before increasing the budget."],
      ["Audience & cohort analysis", "users", ["Segments", "Cohorts", "Retention", "Customer value signals"], "How different groups behave over time."],
      ["Dashboards & BI", "grid", ["Decision dashboards", "Power BI, Tableau, Looker Studio", "Automated reporting"], "One view for the questions that matter."],
      ["Anomaly & trend monitoring", "eyeoff", ["Alerts", "Trend breaks", "Seasonality"], "Spot what changed before it becomes expensive."],
      ["Insight & decision support", "bulb", ["Insight reports", "Recommendations", "Confidence labels", "Test plans"], "Reports that end with what to do next."],
    ],
  },
  ai: {
    sub: "AI finds the signals. Human judgement decides what they mean.",
    ai: [
      ["Anomaly detection", "Flags unusual changes across channels and funnels."],
      ["Pattern detection", "Finds segments and paths that behave differently."],
      ["Summarisation", "Condenses large datasets into readable narratives."],
      ["Forecasting signals", "Highlights trends worth watching — not predictions to rely on blindly."],
      ["Reporting automation", "Keeps routine reports current."],
    ],
    human: [
      ["Business context", "What a change means for this business, now."],
      ["Validating findings", "Every insight checked against the data and its limits."],
      ["Judging confidence", "Observed, supported, needs validation or insufficient data."],
      ["Privacy and consent", "Measurement that respects people and rules."],
      ["Final recommendations", "What to do next — and what not to do."],
    ],
  },
  metrics: {
    title: "A Measurement Framework for Every Level",
    sub: "Analytics should cover all four levels — which ones matter most depends on the decision. Choose a business question.",
    tiers: [
      ["Reach", "Impressions", "Sessions", "Share of voice"],
      ["Engagement", "Journeys", "Content interaction", "Repeat visits"],
      ["Leads", "Enquiries", "Sign-ups", "Purchases", "Qualified actions"],
      ["Pipeline", "Customer value", "Retention", "Revenue indicators (where data allows)"],
    ],
    objectives: [
      ["Where should we invest?", [2, 3], "Investment decisions need conversion and business metrics joined to spend — not channel reach alone."],
      ["Why aren't visitors converting?", [1, 2], "Behaviour and conversion analysis locate the drop; testing explains it."],
      ["Is our brand reaching the market?", [0, 1], "Reach and engagement show visibility; search and social signals show whether it changes perception."],
      ["Are customers staying?", [3], "Cohorts, retention and customer value show whether growth is durable."],
    ],
  },
  learn: {
    title: "Reporting Should Lead to the Next Decision",
    steps: [
      ["Campaign", "Activity runs across channels."],
      ["Signal", "Traffic, behaviour, conversion and anomalies arrive in one view."],
      ["Insight", "What changed, for whom, and why."],
      ["Decision", "A prioritised recommendation with a confidence label."],
      ["Experiment", "A change or test designed to confirm the insight."],
      ["Learning", "Measured again; the result is recorded."],
      ["Better campaign", "The next plan starts from what the evidence showed."],
    ],
  },
  intel: {
    signals: [
      ["Where customers drop off in the journey", "flag", ["Customer experience", "Product", "Content"]],
      ["Which products or services attract attention", "trend", ["Product", "Market strategy"]],
      ["Segments that behave differently", "users", ["Positioning", "Market strategy", "Sales"]],
      ["Content that creates real interest", "file", ["Content", "Positioning"]],
      ["Campaigns that create pipeline, not just leads", "bars", ["Sales", "Market strategy"]],
    ],
  },
  journey: {
    title: "One Customer Journey, Many Data Sources",
    sub: "Analytics connects what a customer did everywhere — not channel by channel.",
    steps: [
      ["Search", "search"],
      ["Social", "users"],
      ["Content", "file"],
      ["Paid media", "megaphone"],
      ["Website", "globe"],
      ["Email", "msg"],
      ["CRM", "database"],
      ["Analytics", "bars"],
    ],
  },
  why: {
    title: "Why Frequent Research for Analytics",
    items: [
      ["Question first", "Question first, evidence second, interpretation third.", "search"],
      ["The why, not just the what", "Where data can't explain behaviour, testing and feedback can.", "bulb"],
      ["Data quality first", "Definitions and tracking checked before conclusions are drawn.", "shield"],
      ["Confidence labels", "Every insight says how sure it is.", "check"],
      ["Decision-led reporting", "Reports end with recommendations, not just charts.", "compass"],
      ["AI-assisted, human-led", "Faster analysis, with people accountable for interpretation.", "users"],
    ],
  },
  related: {
    title: "From Insight to Action",
    sub: "Analytics informs every other channel — and the decisions around them.",
    center: "Analytics",
    links: [
      ["Performance Marketing", "Act on what the data shows across the full funnel.", ppDm("performance-marketing"), "digital"],
      ["Google Ads / PPC", "Shift paid budget toward what creates qualified action.", ppDm("google-ads-ppc"), "digital"],
      ["SEO Services", "Connect organic search to behaviour and enquiries.", ppDm("seo-services"), "digital"],
      ["Social Media Marketing", "Read social signals as audience evidence.", ppDm("social-media-marketing"), "digital"],
      ["Digital Marketing Audit", "Diagnose the whole system when the data points to deeper issues.", ppDm("digital-marketing-audit"), "digital"],
      ["Digital Marketing Consulting", "Turn insight into a strategic decision.", ppDm("digital-marketing-consulting"), "digital"],
    ],
  },
  faq: AN_FAQ,
  faqTitle: "Digital Analytics & Reporting: Frequently Asked Questions",
  guide: {
    title: "Digital Analytics and Reporting: Knowing Which Marketing Actually Works",
    cover: ["Frequent Research · Guide", "Digital Analytics & Reporting", "From data to decisions"],
    topics: ["Measurement strategy", "GA4 and tracking", "Data quality", "Attribution", "Dashboards and BI", "AI in analytics"],
    to: "/blog/digital-analytics-reporting-guide",
  },
  final: {
    sig: "Data Tells You What Happened. Insight Tells You What to Do Next.",
    sigText: "Clean data, honest interpretation and clear recommendations.",
    title: "Have Data That Isn't Yet Answering Your Questions?",
    text: "Tell us what you're trying to understand, which decisions you need to make and what's getting in the way.",
  },
};

function AN_Page() {
  return (
    <RL_Page
      c={{
        ...AN_CFG,
        before: (
          <>
                  <RL_Why
        id="an-whyr-h"
        kicker="Data + context"
        title="Data Tells You What Happened. Context Explains Why."
        items={[
          ["Mobile conversion dropped", "phone", "Mobile visitors convert less than last quarter; desktop is stable.", "Whether the cause is the form, the offer, page speed or a different audience arriving.", "Funnel and device analysis, session recordings, and on-page feedback if behaviour alone doesn't explain it.", "Fix the identified friction and test — then measure again."],
          ["Traffic up, enquiries flat", "trend", "Organic and social traffic grew; enquiries did not.", "Whether new visitors are the wrong audience or the right audience with an unanswered question.", "Landing-page and query analysis, plus feedback from recent prospects and sales.", "Refocus content and calls to action on the questions buyers actually ask."],
          ["Cheap leads, few sales", "tag", "One campaign has the lowest cost per lead.", "Whether those leads ever become customers — and why not.", "Join campaign data with CRM outcomes; ask sales which leads stall and why.", "Shift budget toward campaigns that create qualified pipeline."],
          ["Repeat purchases slowing", "refresh", "Fewer customers are buying a second time.", "Whether it's price, experience, competition or a change in need.", "Cohort analysis plus customer feedback on satisfaction and switching.", "Adjust retention journeys and offers for the affected cohorts."],
        ]}
      />
          </>
        ),
        visuals: (
          <>
                  <DK_Leak
        id="an-dq-h"
        kicker="Data quality"
        title="Bad Data Creates Expensive Decisions."
        sub="Scroll to resolve the warnings. Perfect data doesn't exist — more trustworthy data does."
        stages={["Missing tracking", "Duplicate events", "Broken attribution", "Inconsistent definitions", "Disconnected platforms", "Unclear KPIs"]}
        leaks={[
          ["Audit tags", "Find events that never fire."],
          ["De-duplicate", "Count each action once."],
          ["Fix UTMs & sources", "Credit the right channel."],
          ["Agree definitions", "One meaning for each metric."],
          ["Connect platforms", "Join marketing, CRM and sales data."],
        ]}
        final="Cleaner measurement → more confident analysis → better decisions."
        closing="Each issue quietly distorts the picture."
      />
                  <DK_Report
        id="an-dash-h"
        kicker="Decision dashboard"
        title="One View for the Questions That Matter."
        sub="A layout with qualitative indicators — no client data and no invented numbers."
        dashTitle="Decision dashboard"
        questions={[
          ["Growth", "Traffic, leads, customers."],
          ["Acquisition", "Organic, paid, referral, social."],
          ["Conversion", "Funnel movement and drop-offs."],
          ["Customer", "Segments, behaviour, retention."],
          ["Commercial", "Pipeline and revenue contribution."],
          ["Opportunity", "Growth signals and priority actions."],
        ]}
        panels={[
          ["Acquisition", "hbars"],
          ["Visit → customer", "funnel"],
          ["Trend", "trend"],
          ["Priority actions", "list"],
        ]}
        next="Signal: investigate the drop between visit and lead"
      />
                  <DK_Cards
        id="an-conf-h"
        cols={4}
        kicker="Analytics confidence system"
        title="Every Insight Carries a Confidence Label"
        items={[
          ["Observed", "Directly supported by available data.", "eyeoff"],
          ["Supported", "Backed by multiple signals.", "check"],
          ["Requires validation", "Promising — needs testing.", "flask"],
          ["Insufficient data", "More evidence is required.", "help"],
        ]}
      />
          </>
        ),
        after: (
          <>
                  <DK_Status
        id="an-health-h"
        kicker="Analytics health check"
        title="How Healthy Is Your Measurement?"
        sub="Qualitative statuses — never invented percentages."
        dashTitle="Analytics health check"
        levels={[
          ["Strong", "s"],
          ["Needs attention", "n"],
          ["Investigate", "w"],
          ["Insufficient data", "x"],
        ]}
        headShort={["Strong", "Attention", "Investigate", "No data"]}
        rows={[
          ["Tracking", "layers", 1],
          ["Data quality", "shield", 2],
          ["Website analytics", "globe", 0],
          ["Paid media", "target", 1],
          ["Conversion", "flag", 2],
          ["CRM connection", "database", 3],
          ["Reporting", "bars", 1],
        ]}
        note="Statuses only — not data about any real business."
      />
          </>
        ),
        formNode:       <DM_Form
        id={AN_FORM}
        kicker="Analytics roadmap"
        title="Turn Your Data Into Decisions"
        sub="Share what you're trying to understand or improve. We'll help identify the appropriate scope and starting point."
        type="Digital Analytics & Reporting Enquiry"
        service="Digital Analytics & Reporting"
        icon="bars"
        submitLabel="Turn My Data Into Decisions"
        successTitle="Thank you. Your analytics request has been sent."
        msgLabel="Message (optional)"
        chips={[
          {
            k: "understand",
            t: "Understand",
            q: "What do you want to understand?",
            label: "Want to understand",
            multi: true,
            options: [
              "Marketing performance",
              "Website performance",
              "Customer journey",
              "Lead generation",
              "E-commerce",
              "Campaign performance",
              "Conversion",
              "Data quality",
              "Business intelligence",
              "Dashboarding",
              "Reporting",
              "GA4",
              "Tracking",
              "Competitor intelligence",
              "Not sure yet",
            ],
          },
          {
            k: "data",
            t: "Data",
            q: "What data do you have? (optional)",
            label: "Data available",
            multi: true,
            optional: true,
            options: ["GA4", "Google Ads", "Meta", "LinkedIn", "CRM", "E-commerce", "Power BI", "Tableau", "Looker / Looker Studio", "Spreadsheets", "Multiple platforms", "Not sure"],
          },
          {
            k: "goal",
            t: "Goal",
            q: "Primary goal",
            label: "Primary goal",
            options: ["Better reporting", "Understand performance", "Improve conversion", "Understand customers", "Connect data", "Improve measurement", "Build dashboards", "Business intelligence", "AI-assisted analytics", "Strategic decision support"],
          },
          { k: "budget", t: "Budget", q: "Budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { AN_Page };
