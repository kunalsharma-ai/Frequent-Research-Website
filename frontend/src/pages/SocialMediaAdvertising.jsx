/*
 * Social Media Advertising — /services/digital-marketing/social-media-advertising (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: audience precision + creative experimentation + behavioural signals.
 * Hero visual: HV_AudCreative. Kept: audience layers (sa-aud-h), retargeting branch, creative test, budget logic.
 * No case study, no team details, no platform partnerships, no invented numbers, no acquisition guarantees.
 */
import * as ee from 'react';
import { DM_Form, PpL, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Branch, DK_Budget, DK_Tabs, DK_Test } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_AudCreative } from '../components/dm/heroes.jsx';

const SA_URL = "/services/digital-marketing/social-media-advertising";

const SA_TITLE = "Social Media Advertising Services | Frequent Research";

const SA_FORM = "sa-consult";

const SA_FAQ = [
  ["What is social media advertising?", "Social media advertising is paid promotion on platforms such as Meta (Facebook and Instagram), LinkedIn and YouTube, using each platform's targeting, formats and measurement to reach a defined audience with a specific objective."],
  ["How is your approach to social advertising different?", "Audiences and messages are treated as hypotheses. Different audience segments are matched with different messages, and the performance signals are read as learning — not just as a CTR report."],
  ["What does a social media advertising service include?", "Depending on your needs: audience strategy, campaign structure, creative and message testing, retargeting, budget allocation, landing-page alignment, tracking, reporting and ongoing optimisation."],
  ["Which platforms do you work with?", "Typically Meta (Facebook and Instagram), LinkedIn and YouTube, chosen by audience and objective. No official platform partnerships are claimed."],
  ["Can you manage our existing campaigns?", "Yes. Existing campaigns are reviewed first — structure, audiences, creative, tracking and spend — before changes are recommended."],
  ["How much budget do we need?", "It depends on the objective, audience size, platform, competition and how much testing is needed. Scope and objectives come before a recommendation."],
  ["How soon will we see results?", "Early signals usually appear once campaigns have gathered enough data, but timelines depend on budget, audience, objective and creative. Results are never guaranteed."],
  ["How does AI support social advertising?", "AI can help with creative variations, audience pattern analysis, performance summaries and anomaly detection. People decide audiences, messages, budgets and brand suitability."],
];

const SA_CFG = {
  key: "sa",
  pfx: "sa",
  url: SA_URL,
  title: SA_TITLE,
  maTitle: "Social Media Advertising Services",
  desc: "Social media advertising built on audience precision, creative experimentation and behavioural signals — tested, measured and improved with clear learning.",
  crumb: "Social Media Advertising",
  name: "Social Media Advertising",
  serviceType: "Social media advertising",
  schemaDesc:
    "Social media advertising: audience segmentation, message and creative testing, retargeting, budget allocation, landing-page alignment, tracking, AI-assisted performance analysis and human-led optimisation across Meta, LinkedIn and YouTube.",
  formId: SA_FORM,
  hero: {
    kicker: "Audience-led paid social",
    h1: "Social Media Advertising",
    tag: "Smarter Audience Targeting. More Relevant Creative. Better Decisions.",
    lead: "Paid social works best when the audience and the message are chosen deliberately. Different segments, different messages, clear test hypotheses — and performance signals read as learning, not just as a report.",
    cta: "Build an Audience-Led Social Strategy",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Audience segmentation", "Creative testing", "Retargeting", "Budget logic", "AI-assisted, human-led"],
    vis: <HV_AudCreative />,
  },
  statement: ["An ad is a question you ask an audience. The response is the answer.", ["Audience", "Message", "Creative", "Signal", "Learning", "Optimisation"]],
  caps: [
    ["Audience Strategy", "users"],
    ["Meta Ads", "megaphone"],
    ["LinkedIn Ads", "box"],
    ["YouTube Ads", "grid"],
    ["Creative Testing", "flask"],
    ["Retargeting", "refresh"],
    ["Budget Allocation", "sliders"],
    ["Reporting", "bars"],
  ],
  problem: {
    title: "When Social Ads Spend Without Learning",
    sub: "Most paid-social problems are audience and message problems before they are bidding problems.",
    items: [
      ["One message for every audience", "Different people respond to different reasons to act.", "users"],
      ["Targeting by guesswork", "Interests chosen because they sound right, not because they fit.", "target"],
      ["Creative fatigue", "The same ad shown until performance quietly declines.", "refresh"],
      ["Clicks without context", "Landing pages that don't continue the ad's message.", "file"],
      ["Reports without decisions", "CTR and reach reported; nothing changes next month.", "bars"],
      ["Untested assumptions", "No hypotheses, so no learning from the spend.", "flask"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Boosting Posts vs Audience-Led Advertising",
    sub: "Both put money behind content. One learns from the spend.",
    conv: ["Boost a post", "Broad audience", "Reach", "Clicks"],
    fr: ["Audience segments", "Message per segment", "Creative hypothesis", "Test", "Behavioural signals", "Learning", "Optimisation"],
  },
  diff: {
    kicker: "Intelligence behind every impression",
    title: "Social Advertising Built Around the Audience, Not the Boost Button",
    sub: "How this approach differs — question by question.",
    answers: [
      "Sets up campaigns on the platform, picks interests, boosts creative and reports reach, CTR and cost per click.",
      "Audiences are segmented deliberately, each segment gets a message built for it, and every campaign carries a hypothesis to test.",
      "Platform and behavioural data show who responds; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which audiences, messages and offers drive meaningful action — insight useful beyond the ad account.",
      "Audience definitions, messaging, tracking, conversion events and landing-page alignment are set up before launch.",
      "Creative, audiences and budget are reviewed against signals; weak variations are paused and learning is recorded.",
      "Paid social is connected to organic social, landing pages, CRM and analytics — one customer journey, not a separate silo.",
      "AI helps generate creative variations, analyse audience patterns, summarise performance and flag anomalies.",
      "People decide audiences, messages, budgets, brand suitability and what the results actually mean.",
      "More relevant advertising, clearer budget decisions and a growing understanding of what moves your audience.",
    ],
  },
  layers: {
    title: "What Decides Who Sees Which Ad",
    rows: [
      ["Audience segment", "users", "One broad audience", "Defined segments with different needs"],
      ["Message", "msg", "One message for all", "A reason to act for each segment"],
      ["Creative", "grid", "Whatever is available", "Formats and hooks chosen per hypothesis"],
      ["Platform", "layers", "Every platform at once", "Platforms chosen by audience and objective"],
      ["Landing experience", "file", "Homepage traffic", "Pages that continue the ad's promise"],
      ["Signals", "bars", "Reach and clicks", "Behaviour that shows real interest"],
    ],
  },
  loop: {
    title: "How Social Advertising Works: Intelligence to Impact",
    center: "Audience intelligence",
    texts: [
      "Understand the business objective, the offer, the customer and where paid social fits the journey.",
      "Discover audience segments, motivations and the signals that show how they decide.",
      "Define audiences, messages, creative hypotheses, budgets and conversion events.",
      "Activate campaigns on the platforms that fit the audience and objective.",
      "Measure behavioural signals — engagement quality, landing behaviour, actions and lead quality.",
      "Learn which audience–message combinations work, and why.",
      "Improve creative, targeting, budget allocation and landing alignment.",
      "Grow by scaling what the evidence supports.",
    ],
  },
  capabilities: {
    title: "What Social Media Advertising Covers",
    layers: [
      ["Audience strategy", "users", ["Segmentation", "First-party audiences", "Exclusions"], "Decide who should — and shouldn't — see each campaign."],
      ["Campaign structure", "layers", ["Objectives", "Campaign architecture", "Naming and tracking"], "Structure that makes learning readable."],
      ["Creative & messaging", "bulb", ["Message per segment", "Hooks", "Formats"], "Creative built around a hypothesis."],
      ["Creative testing", "flask", ["A/B tests", "Variation planning", "Fatigue monitoring"], "Prioritised tests, not unlimited experiments."],
      ["Retargeting", "refresh", ["Website visitors", "Engagers", "Sequenced reminders"], "Within platform rules and consent."],
      ["Budget allocation", "sliders", ["Objective weighting", "Pacing", "Reallocation"], "Spend follows evidence."],
      ["Landing alignment", "file", ["Message match", "Form experience", "Mobile UX"], "Continue the ad's promise after the click."],
      ["Measurement & reporting", "bars", ["Conversion events", "Lead quality", "Learning log"], "Report what changed, and why."],
    ],
  },
  ai: {
    sub: "AI speeds up testing and analysis. People decide who to reach and what to say.",
    ai: [
      ["Creative variations", "Drafts headline and copy variants for review."],
      ["Audience patterns", "Finds which segments respond differently."],
      ["Fatigue detection", "Flags creative that is wearing out."],
      ["Performance summaries", "Summarises results across campaigns."],
      ["Anomaly alerts", "Spots unusual spend or behaviour early."],
    ],
    human: [
      ["Audience decisions", "Who to reach and who to exclude."],
      ["Message and brand", "What is said, and how it sounds."],
      ["Budget judgement", "Where investment should go next."],
      ["Brand suitability", "Placements and context that fit the brand."],
      ["Interpretation", "What the signals actually mean for the business."],
    ],
  },
  metrics: {
    title: "Measure What the Audience Did, Not Just What It Saw",
    tiers: [
      ["Reach", "Frequency", "Impressions by segment"],
      ["Engagement quality", "CTR", "Video views", "Landing-page views"],
      ["Leads", "Purchases", "Sign-ups", "Lead quality"],
      ["Pipeline", "Revenue (where tracked)", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Build awareness", [0, 1], "Reach the right segment at sensible frequency, then check engagement quality."],
      ["Generate leads", [1, 2], "Landing behaviour, lead volume and — most importantly — lead quality."],
      ["Drive sales", [2, 3], "Purchases and value where tracking allows."],
      ["Re-engage visitors", [1, 2], "Returns and actions from retargeting audiences."],
    ],
  },
  learn: {
    title: "Every Campaign Should Teach the Next One",
    steps: [
      ["Campaign", "Audience A, B and C each see a different message."],
      ["Signal", "Engagement, landing behaviour and actions per segment."],
      ["Insight", "Segment B responds to the practical message, not the aspirational one."],
      ["Decision", "Shift budget and refresh creative for segment B."],
      ["Experiment", "Test a new hook against the winning message."],
      ["Learning", "Record what the audience responded to."],
      ["Better campaign", "The next brief starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Messages each segment responds to", "msg", ["Positioning", "Content"]],
      ["Objections visible in comments", "help", ["Product", "Customer experience"]],
      ["Audiences with unexpected interest", "users", ["Market strategy", "Sales"]],
      ["Offers that drive action", "tag", ["Product", "Sales"]],
      ["Creative themes that hold attention", "grid", ["Content", "Positioning"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Social Advertising",
    items: [
      ["Audience before ads", "Segments are defined before creative is made.", "users"],
      ["Hypothesis-led testing", "Every test is designed to answer a question.", "flask"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Connected to the journey", "Ads, landing pages and follow-up work together.", "map"],
      ["Honest measurement", "Lead quality and outcomes, not just clicks.", "bars"],
      ["AI-assisted, human-led", "Faster testing with people in control.", "bulb"],
    ],
  },
  related: {
    title: "Paid Social Works Best When It's Connected",
    sub: "Advertising is one part of one customer journey.",
    center: "Social Ads",
    links: [
      ["Social Media Marketing", "Organic content and community the ads build on.", ppDm("social-media-marketing"), "digital"],
      ["Performance Marketing", "Connect paid social to the wider performance system.", ppDm("performance-marketing"), "digital"],
      ["Landing Page & CRO", "Pages that continue the ad's promise.", ppDm("landing-page-and-cro"), "digital"],
      ["Digital Analytics & Reporting", "Measure what the audience actually did.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: SA_FAQ,
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/social-media-advertising-guide">social media advertising guide</PpL>.
    </>
  ),
  faqTitle: "Social Media Advertising: Frequently Asked Questions",
  final: {
    sig: "Right Audience. Right Message. Clear Learning.",
    sigText: "Segments, hypotheses, signals and decisions — so every campaign teaches the next one.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us about your audience, your objective and what's working — or not — in paid social. We'll help define where to start.",
  },
};

function SMA_Page() {
  return (
    <RL_Page
      c={{
        ...SA_CFG,
        before: (
          <>
                  <DK_Tabs
        id="sa-aud-h"
        tone="light"
        kicker="Audience targeting"
        title="Audience Layers, Chosen With Care"
        sub="We combine targeting layers based on the audience, platform and objective."
        layers={[
          ["Demographics", "users", ["Age", "Location", "Language", "Relevant demographic attributes"]],
          ["Professional", "box", ["Industry", "Job role", "Seniority", "Company characteristics"], "Most relevant on LinkedIn for B2B campaigns."],
          ["Behaviour", "trend", ["Interests", "Engagement", "Purchase behaviour where platform data supports it"]],
          ["First-party signals", "database", ["Website visitors", "Customer lists", "CRM audiences", "Previous interactions"], "Used only with appropriate consent and platform rules."],
          ["Similar & predictive", "layers", ["Lookalike-style audiences", "Platform-modelled audiences"], "Used only where supported by the platform and campaign setup."],
        ]}
        note="Targeting options vary by platform, geography, category and privacy restrictions. We never promise capabilities a platform doesn't currently permit."
      />
          </>
        ),
        visuals: (
          <>
                  <DK_Test
        id="sa-ab-h"
        kicker="Creative testing"
        title="Stop Guessing Which Ad Will Work"
        sub="Hypothesis-led tests, prioritised — not unlimited simultaneous experiments."
        variants={[
          ["H", "Hook", "bulb"],
          ["T", "Headline", "file"],
          ["V", "Visual / video", "grid"],
          ["C", "CTA", "target"],
          ["O", "Offer", "award"],
        ]}
        metrics={["CTR", "Engagement", "Landing-page views", "Conversions"]}
        process={["Hypothesis", "Test", "Measure", "Learn", "Optimise"]}
      />
                  <DK_Branch
        id="sa-rt-h"
        kicker="Retargeting"
        title="Don't Let Interested Visitors Disappear"
        sub="Retargeting reconnects with people who showed interest but didn't act."
        main={["Ad", "Website visit", "No conversion"]}
        branch={["Retargeting audience", "Relevant reminder", "Return visit", "Conversion"]}
        rejoin="A second chance, not a chase"
        note="Retargeting is subject to platform rules, privacy requirements, consent and audience eligibility."
      />
          </>
        ),
        after: (
          <>
                  <DK_Budget
        id="sa-bud-h"
        kicker="Budget optimisation"
        title="Every Advertising Budget Deserves a Reason"
        sub="Investment decisions change with the objective and the evidence."
        rows={[
          ["Campaign A — prospecting", "users"],
          ["Campaign B — retargeting", "refresh"],
          ["Campaign C — lead generation", "target"],
        ]}
        factors={[
          ["Objective", [60, 30, 70]],
          ["Performance", [45, 70, 55]],
          ["Audience quality", [50, 55, 75]],
          ["Conversion data", [40, 65, 80]],
          ["Margins", [55, 60, 50]],
          ["Customer value", [48, 58, 72]],
          ["Campaign maturity", [70, 45, 50]],
        ]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={SA_FORM}
        title="Build an Audience-Led Social Strategy"
        sub="A few quick steps help us understand your goals before we talk."
        type="Social Media Advertising Consultation"
        service="Social Media Advertising"
        icon="megaphone"
        submitLabel="Build My Social Strategy"
        successTitle="Thank you. Your social advertising consultation request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need?",
            label: "Needs",
            multi: true,
            options: [
              "Launch a new campaign",
              "Manage existing campaigns",
              "Social advertising audit",
              "Lead generation",
              "E-commerce advertising",
              "B2B paid social",
              "Retargeting",
              "Creative testing",
              "Not sure yet",
            ],
          },
          { k: "goal", t: "Objective", q: "Primary objective", label: "Primary objective", options: ["More leads", "More sales", "More traffic", "Brand awareness", "Better campaign efficiency", "Retargeting", "Not sure yet"] },
          { k: "budget", t: "Budget", q: "Approximate monthly advertising budget", label: "Monthly ad budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { SMA_Page };
