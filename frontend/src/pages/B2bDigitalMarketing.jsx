/*
 * B2B Digital Marketing — /services/digital-marketing/b2b-digital-marketing (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: Buyer Intelligence → B2B Activation —
 * "B2B Marketing Built Around How Businesses Actually Buy." Hero visual: HV_Committee.
 * Kept custom visuals: B2_Icp, B2B reality split, buying group orbit, ABM console, demand vs lead matrix, diagnostic quiz.
 * No case study, no team details, no database-access or private-intent-data claims, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Matrix, DK_OrbitSec, DK_Sec, DK_UseCases } from '../components/dm/kit.jsx';
import { DK_Console, DK_Quiz, DK_Split } from '../components/dm/kit2.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Committee } from '../components/dm/heroes.jsx';

const B2_URL = "/services/digital-marketing/b2b-digital-marketing";

const B2_TITLE = "B2B Digital Marketing Services | Frequent Research";

const B2_FORM = "b2-consult";

const B2_CRIT = [
  ["Industry", "grid"],
  ["Company size", "box"],
  ["Geography", "map"],
  ["Technology", "cpu"],
  ["Business need", "target"],
  ["Buying trigger", "flag"],
  ["Decision role", "user"],
  ["Purchase intent", "trend"],
];

function B2_Icp() {
  const [on, setOn] = ee.useState([0, 1, 4]);
  const tog = (k) => setOn((a) => (a.includes(k) ? a.filter((x) => x !== k) : [...a, k]));
  const n = on.length;
  const rows = ["Whole market", ...B2_CRIT.filter((_, k) => on.includes(k)).map((c) => c[0])];
  return (
    <DK_Sec tone="light" className="b2-icp" label="b2-icp-h">
      <div className="b2-icp__in">
        <div>
          <PP_Head
            k="ICP + buyer persona"
            id="b2-icp-h"
            t="Ideal Customer Profile Builder"
            s="Switch criteria on and off to see the market narrow toward target accounts and a buying committee. B2B targeting is never a single job title."
          />
          <div className="b2-icp__f" role="group" aria-label="ICP criteria">
            {B2_CRIT.map(([t, ic], k) => (
              <button key={t} type="button" aria-pressed={on.includes(k)} onClick={() => tog(k)}>
                <PpI n={ic} s={13} />
                {t}
              </button>
            ))}
          </div>
        </div>
        <div className="b2-icp__vis" aria-live="polite">
          <ol>
            {rows.map((t, k) => (
              <li key={t} style={{ width: 100 - (k * 52) / Math.max(rows.length, 2) + "%" }}>
                {t}
              </li>
            ))}
            <li className="is-res" style={{ width: Math.max(34, 48 - n * 2) + "%" }}>
              Target accounts + buying committee
            </li>
          </ol>
          <small>Your ICP is built from your own CRM, sales and campaign data.</small>
        </div>
      </div>
    </DK_Sec>
  );
}

const B2_FAQ = [
  ["What is B2B digital marketing?", "B2B digital marketing uses search, LinkedIn, content, paid media, email and your website to reach business buyers, build demand and move buying groups toward qualified opportunities."],
  ["How is your approach to B2B marketing different?", "It starts with buyer intelligence — industries, company types, roles, decision influence, information needs and buying stage — and builds positioning, content, channels and measurement around the buying committee rather than a single lead."],
  ["Do you have data on every company or market?", "No. The work uses the account, CRM and intent sources available to you and the platforms involved. No access to verified data on every market or company is claimed."],
  ["What's the difference between demand generation and lead generation?", "Demand generation builds awareness and preference before buyers are ready; lead generation captures identifiable interest when they are. B2B growth usually needs both."],
  ["Do you support account-based marketing?", "Yes — account prioritisation, buying-group mapping, personalised content and account-level engagement, aligned with sales."],
  ["How does AI support B2B marketing?", "AI helps with account clustering, market-signal summaries, content variations, campaign analysis and reporting. Strategy, interpretation and final decisions stay human-led."],
  ["How long does B2B marketing take to generate results?", "It depends on your market, sales cycle, starting point and investment. Realistic milestones are set rather than guarantees."],
];

const B2_CFG = {
  key: "b2",
  pfx: "b2",
  url: B2_URL,
  title: B2_TITLE,
  maTitle: "B2B Digital Marketing Services",
  desc: "B2B digital marketing built around how businesses actually buy: buying committees, roles and information needs connected to demand, leads and pipeline.",
  crumb: "B2B Digital Marketing",
  name: "B2B Digital Marketing",
  serviceType: "B2B digital marketing",
  schemaDesc:
    "B2B digital marketing built on buyer intelligence: ICP and buying-committee mapping, decision-maker and influencer roles, procurement, industry context, evidence-led content, demand generation, B2B lead generation, account-based marketing, B2B SEO, LinkedIn and paid media, email nurture and pipeline measurement.",
  formId: B2_FORM,
  hero: {
    dark: true,
    kicker: "Buyer intelligence → B2B activation",
    h1: "B2B Digital Marketing",
    tag: "B2B Marketing Built Around How Businesses Actually Buy.",
    lead: "Businesses don't buy like individuals. Several people — users, influencers, technical evaluators, finance, procurement and decision-makers — each need different evidence at different times. The approach maps that buying committee first, then activates the channels and content that move it.",
    cta: "Discuss Your B2B Growth Strategy",
    cta2: "Request a B2B Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Buying committees", "Buyer roles", "Evidence-led content", "Account-based thinking", "AI-assisted, human-led"],
    vis: <HV_Committee />,
  },
  statement: ["B2B buyers don't follow your funnel. They build their own — together.", ["Business", "Buying committee", "Information needs", "Touchpoints", "Content", "Lead", "Sales journey"]],
  caps: [
    ["Buyer Intelligence", "globe"],
    ["ICP & Buying Committees", "users"],
    ["Demand Generation", "megaphone"],
    ["B2B Lead Generation", "target"],
    ["Account-Based Marketing", "flag"],
    ["B2B SEO", "search"],
    ["LinkedIn & Paid Media", "trend"],
    ["Content & Email Nurture", "file"],
  ],
  problemNode:       <DK_Split
        id="b2-real-h"
        kicker="The business problem"
        title="B2B Buyers Don't Follow Your Funnel. They Build Their Own."
        states={[
          ["The funnel we draw", "Awareness → lead → sale", ["Awareness", "Lead", "Sale"], "Too simple for how organisations actually decide."],
          ["The journey buyers take", "Many people, many touchpoints", ["Search", "LinkedIn", "Industry content", "Peer recommendation", "Website", "Comparison", "Case study", "Email", "Sales conversation", "Committee decision"]],
        ]}
        caption="Several people, long cycles and shifting priorities — your marketing has to work across all of them."
      />,
  versus: {
    kicker: "More than channel execution",
    title: "Channel-First B2B vs Buyer-Led B2B",
    sub: "Both use the same channels. The difference is whether they start with the buying committee.",
    conv: ["Channel plan", "Job-title targeting", "MQLs", "Lead report"],
    fr: ["Business", "Buying committee", "Information needs", "Positioning", "Touchpoints", "Evidence-led content", "Qualification", "Sales journey", "Learning"],
  },
  diff: {
    kicker: "The intelligence behind B2B activation",
    title: "Buyer Intelligence at the Centre",
    sub: "How this B2B approach differs — question by question.",
    answers: [
      "Plans channels and campaigns, targets job titles, generates marketing-qualified leads and reports volumes and cost per lead.",
      "The organisations and buying committees worth reaching are mapped first — industries, company size, roles, decision influence, procurement, needs and buying stage — and positioning and channels are built around them.",
      "CRM, sales conversations and engagement data clarify which segments matter, what each role needs to know, which triggers start a purchase and how buyers compare suppliers.",
      "A shared view of the market and buying committee helps marketing, sales and product make better decisions — not just better campaigns.",
      "ICP, buying-committee map, positioning, account priorities, content needs by stage and measurement are agreed before activation.",
      "Engagement by account and role, sales feedback and pipeline data refine segments, messages and channel mix.",
      "Search, LinkedIn, content, paid media, email, website and sales touchpoints are planned as one buying experience over a long cycle.",
      "AI helps cluster accounts, summarise market signals, generate content variations and analyse campaign patterns.",
      "People interpret buyer needs, judge positioning, protect data ethics and make strategic and sales-alignment decisions.",
      "A more predictable pipeline from organisations the business actually wants to serve.",
    ],
  },
  layers: {
    title: "Buyer Intelligence: What Informs B2B Activation",
    rows: [
      ["ICP & account characteristics", "target", "Industry and company-size filters", "Fit tested against won customers and market evidence"],
      ["Buying committee", "users", "One job title per company", "Users, influencers, decision-makers, finance and procurement mapped"],
      ["Information needs", "file", "One message for everyone", "What each role needs to see at each stage"],
      ["Industry context", "grid", "Generic sector messaging", "Industry-specific pains, language and regulation"],
      ["Buying journey", "map", "One funnel, short cycle", "Content and offers for long research, evaluation and decision stages"],
      ["Qualification", "check", "MQL by score threshold", "Qualification agreed with sales and refined by pipeline outcomes"],
    ],
  },
  loop: {
    title: "How B2B Marketing Works: Intelligence to Impact",
    center: "Buyer intelligence",
    texts: [
      "Understand the market, the offer and the organisations that become the best customers.",
      "Discover buying committees, information needs and triggers — using CRM, sales and engagement data.",
      "Define the ICP, target accounts, positioning and role-specific messages.",
      "Activate search, LinkedIn, paid media, content, email and sales touchpoints.",
      "Measure account engagement, buying-committee coverage, opportunities and pipeline.",
      "Learn which roles, messages and channels move buying groups forward.",
      "Improve targeting, content and qualification with sales feedback.",
      "Grow pipeline from organisations worth serving.",
    ],
  },
  capabilities: {
    title: "B2B Channels, Planned as One Buying Experience",
    layers: [
      ["B2B SEO", "search", ["Industry and product searches", "Decision-maker queries", "Comparison content", "Commercial intent pages"], "Be visible during early research, before buyers contact suppliers."],
      ["LinkedIn", "users", ["Thought leadership", "Account and role targeting", "Lead gen forms", "Retargeting"], "More than a lead form — a place to build familiarity and authority."],
      ["Paid media", "trend", ["Search ads", "LinkedIn ads", "Display", "Account-level retargeting"], "Buy attention from the right accounts."],
      ["Evidence-led content", "file", ["Guides and whitepapers", "Explainers", "Video", "Content syndication"], "Content that helps each role in the buying committee move."],
      ["Account-based marketing", "flag", ["Account prioritisation", "Buying-group mapping", "Personalised content", "Sales alignment"], "From 'who can we reach?' to 'which accounts matter?'"],
      ["Email & nurture", "msg", ["Lifecycle journeys", "Role-specific content", "Re-engagement", "Sales alerts"], "Stay relevant between first click and decision."],
      ["Website & conversion", "grid", ["Stage-based journeys", "Proof and trust", "Conversion paths"], "Part of the buying journey, not a brochure."],
      ["Demand & lead generation", "megaphone", ["Demand programmes", "Lead capture", "Qualification", "Pipeline reporting"], "Build preference, then capture intent."],
    ],
  },
  ai: {
    sub: "AI speeds up B2B marketing. Strategy still decides where to go.",
    ai: [
      ["Account clustering", "Groups accounts by fit and engagement patterns."],
      ["Signal summaries", "Condenses market signals and sales notes for review."],
      ["Content variations", "Drafts role-specific versions for people to edit."],
      ["Campaign pattern analysis", "Finds which accounts and roles are engaging."],
      ["Reporting", "Summarises account and pipeline activity."],
    ],
    human: [
      ["Interpreting buyer needs", "What each role really cares about."],
      ["Positioning", "Why the right buyers should choose you."],
      ["Account priorities", "Which organisations to pursue first."],
      ["Data ethics and consent", "Responsible use of business contact data."],
      ["Sales alignment", "Qualification, hand-off and final decisions."],
    ],
  },
  metrics: {
    title: "Measure Buying Groups, Not Just Leads",
    tiers: [
      ["Reach in target accounts", "Impressions", "Share of voice"],
      ["Account engagement", "Content consumption", "Website visits by account", "Buying-committee coverage"],
      ["Qualified leads", "Meetings", "Sales-accepted opportunities"],
      ["Pipeline contribution", "Deal velocity", "Customer value (where CRM data allows)"],
    ],
    objectives: [
      ["Build demand", [0, 1], "Early-stage B2B work is judged by reach and engagement in the right accounts — not immediate leads."],
      ["Generate pipeline", [2, 3], "Qualified opportunities and pipeline contribution show whether buying groups are moving."],
      ["Enter a new market", [0, 1, 2], "Engagement and early opportunities show whether segments and positioning are right."],
      ["Account-based marketing", [1, 2, 3], "Account engagement and opportunities by target account show ABM progress."],
    ],
  },
  learn: {
    title: "Each B2B Cycle Should Understand the Buyer Better",
    steps: [
      ["Campaign", "Reach a buying committee with role-specific content."],
      ["Signal", "Account engagement, roles reached, meetings booked."],
      ["Insight", "Which roles engage early, which stall the decision."],
      ["Decision", "Rebalance content and channels by role and stage."],
      ["Experiment", "Test a new proof point or offer for a hesitant role."],
      ["Learning", "Record what moved accounts into opportunities."],
      ["Better campaign", "The next cycle reaches the full committee sooner."],
    ],
  },
  intel: {
    signals: [
      ["Which roles engage first in a purchase", "users", ["Sales", "Content", "Positioning"]],
      ["Objections raised by finance or procurement", "flag", ["Sales", "Product", "Positioning"]],
      ["Industries showing new interest", "trend", ["Market strategy", "Product"]],
      ["Content that shortens evaluation", "file", ["Content", "Sales"]],
      ["Questions technical evaluators ask", "help", ["Product", "Customer experience", "Content"]],
    ],
  },
  journey: {
    title: "B2B Buying Doesn't Happen Inside One Channel.",
    sub: "A buying committee meets you in many places over a long cycle. The channels have to work as one journey.",
    steps: [
      ["Industry search", "search"],
      ["Website visit", "globe"],
      ["LinkedIn content", "users"],
      ["Guide or report", "file"],
      ["Email nurture", "msg"],
      ["Webinar or demo", "rocket"],
      ["Sales conversation", "user"],
      ["Committee decision", "check"],
    ],
  },
  why: {
    title: "Why Frequent Research for B2B Marketing",
    items: [
      ["Buying-committee thinking", "Programmes built around organisations, roles and buying committees.", "box"],
      ["Buying-committee thinking", "Marketing planned for every role that shapes the decision.", "users"],
      ["Evidence where it matters", "Segments and triggers are tested against pipeline data before budget scales.", "search"],
      ["Evidence-led content", "Content built around what each role needs to believe.", "file"],
      ["Pipeline measurement", "Account engagement and opportunities, not lead counts alone.", "bars"],
      ["AI-assisted, human-led", "Faster analysis, with people accountable for strategy.", "bulb"],
    ],
  },
  related: {
    title: "Connect Every Part of the B2B Journey",
    sub: "B2B growth depends on capture, content, nurture and measurement working together.",
    center: "B2B marketing",
    links: [
      ["Lead Generation", "Turn buying-committee engagement into qualified opportunities.", ppDm("lead-generation"), "digital"],
      ["Content Marketing", "Evidence-led content for each role and stage.", ppDm("content-marketing"), "digital"],
      ["Email Marketing", "Stay relevant across a long consideration cycle.", ppDm("email-marketing"), "digital"],
      ["Marketing Automation", "Nurture and score accounts that aren't ready yet.", ppDm("marketing-automation"), "digital"],
      ["Digital Analytics & Reporting", "Connect account engagement to pipeline.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: B2_FAQ,
  faqTitle: "B2B Digital Marketing: Frequently Asked Questions",
  guide: {
    title: "B2B Digital Marketing: Reaching Business Buyers Through Long, Complex Sales Cycles",
    cover: ["Frequent Research · Guide", "B2B Digital Marketing", "Build demand, influence buyers, create pipeline"],
    topics: ["The modern B2B buyer's journey", "Demand vs lead generation", "LinkedIn in B2B growth", "B2B SEO and commercial intent", "B2B content strategy", "AI in B2B marketing"],
    to: "/blog/b2b-digital-marketing-guide",
  },
  final: {
    sig: "Understand How Businesses Buy. Then Help Them Buy From You.",
    sigText: "Buying committees, information needs, evidence-led content and pipeline measurement — connected.",
    title: "Have a B2B Growth Challenge That Needs More Than a Channel?",
    text: "Tell us what you're trying to achieve — entering a new market, building demand, improving lead quality or connecting marketing to pipeline.",
  },
};

function B2_Page() {
  return (
    <RL_Page
      c={{
        ...B2_CFG,
        before: (
          <>
            <B2_Icp />
                  <DK_OrbitSec
        id="b2-bc-h"
        tone="off"
        kicker="The buying group"
        title="Market to the Buying Group, Not Just One Lead"
        sub="Hover a role. Each one needs different information at a different moment."
        center="Buying group"
        centerSub="Hover a role"
        nodes={[
          ["Champion", "user", "Needs a solution and pushes for it."],
          ["Decision maker", "award", "Controls approval."],
          ["Influencer", "msg", "Shapes the evaluation."],
          ["User", "users", "Experiences the solution day to day."],
          ["Procurement", "clipboard", "Evaluates commercial terms."],
          ["Finance", "tag", "Assesses the investment."],
          ["Executive", "compass", "Judges strategic impact."],
        ]}
      />
          </>
        ),
        visuals: (
          <>
                  <DK_Console
        id="b2-abm-h"
        kicker="Account-based marketing"
        title="From “Who Can We Reach?” to “Which Accounts Matter?”"
        sub="We use the account and intent sources available to you — we don't claim access to private intent data."
        steps={[
          ["Market", "The total opportunity."],
          ["Target account list", "Prioritised by fit and potential."],
          ["Account signals", "Engagement and intent from available sources."],
          ["Buying group", "The people who influence the decision."],
          ["Personalised message", "Relevant to each account's context."],
          ["Engagement", "Content, ads, email and sales touchpoints."],
          ["Opportunity", "Sales-aligned next steps."],
        ]}
        caps={["Account prioritisation", "Account segmentation", "Buying-group mapping", "Personalised content", "Account engagement", "Intent signals", "Retargeting", "Sales alignment"]}
      />
                  <DK_Matrix
        id="b2-dvl-h"
        tone="light"
        kicker="Demand vs lead generation"
        title="Demand + Lead Generation = a Stronger B2B Growth System"
        head={["Demand generation", "Lead generation"]}
        rows={[
          ["Creates awareness", "Captures interest"],
          ["Builds category understanding", "Converts intent"],
          ["Educates the market", "Creates identifiable prospects"],
          ["Builds preference", "Supports qualification"],
          ["Longer-term", "Often more immediate"],
        ]}
      />
          </>
        ),
        after: (
          <>
                  <DK_Quiz
        id="b2-quiz-h"
        kicker="B2B growth diagnostic"
        title="Find Your B2B Growth Gaps"
        sub="Eight quick questions. Nothing is stored or sent."
        questions={[
          "Do you know which industries and company types become your best customers?",
          "Have you mapped the roles in a typical buying group?",
          "Do buyers find you during early research?",
          "Does your content answer each role's questions?",
          "Are paid campaigns reaching the right accounts?",
          "Can you tell leads apart from qualified opportunities?",
          "Are leads nurtured after conversion?",
          "Can marketing connect activity to pipeline?",
        ]}
        threshold={3}
        result={["There are clear gaps worth a structured B2B growth plan.", "Good foundations — a growth plan can sharpen the next priorities.", "Answer each question to see a suggestion."]}
        cta="Discuss Your B2B Growth Strategy"
        formId={B2_FORM}
      />
                  <DK_UseCases
        id="b2-ind-h"
        title="B2B Considerations by Industry"
        items={[
          ["Manufacturing", "manufacturing", ["Engineers, procurement and plant heads in one decision", "Specification-led search", "Distributor and dealer channels"]],
          ["Healthcare", "healthcare", ["Clinical, administrative and procurement stakeholders", "Evidence-led content", "Strict communication rules"]],
          ["Technology", "it", ["Technical evaluators and business owners", "Trials and demos", "Long security reviews"]],
          ["Financial services", "financial-services", ["Risk and compliance involvement", "Trust and proof", "Regulated messaging"]],
          ["Energy", "energy", ["Project-based buying", "Long cycles", "Technical and commercial reviewers"]],
        ]}
        note="Typical considerations, not a list of past projects."
      />
          </>
        ),
        formNode:       <DM_Form
        id={B2_FORM}
        kicker="B2B consultation"
        title="Discuss Your B2B Growth Strategy"
        sub="Share what you're trying to achieve. We'll help identify the right starting point, scope and next steps."
        type="B2B Digital Marketing Enquiry"
        service="B2B Digital Marketing"
        icon="layers"
        submitLabel="Discuss My B2B Growth Strategy"
        successTitle="Thank you. Your B2B growth request has been sent."
        msgLabel="Message (optional)"
        chips={[
          { k: "achieve", t: "Goal", q: "What are you trying to achieve?", label: "Goal", multi: true, options: ["Generate B2B leads", "Build demand", "Improve pipeline", "Reach target accounts", "Understand our buyers", "Improve LinkedIn performance", "Improve B2B SEO", "Build content strategy", "Build email nurture", "Enter a new market", "Not sure yet"] },
          { k: "need", t: "Need", q: "What do you need?", label: "Need", multi: true, options: ["B2B strategy", "Buyer insight / ICP", "Demand generation", "Lead generation", "ABM", "SEO", "Paid media", "LinkedIn", "Content", "Email", "Analytics", "Full B2B growth programme"] },
          { k: "type", t: "Business", q: "Business type", label: "Business type", options: ["B2B SaaS", "Manufacturing", "Technology", "Healthcare", "Financial Services", "Professional Services", "Energy", "Automotive", "Education", "Other"] },
          { k: "budget", t: "Budget", q: "Budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { B2_Page };
