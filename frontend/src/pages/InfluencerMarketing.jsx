/*
 * Influencer Marketing — /services/digital-marketing/influencer-marketing (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: Audience Fit > Follower Count —
 * Reach × Relevance × Credibility × Audience Fit × Engagement. Hero visual: HV_Relevance.
 * Kept: IN_Spectrum (creator tiers × objectives), IN_Brief (campaign brief builder), fit scorecard, brand-safety principles.
 * No case study, no team details, no real creator names or data, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, PpL, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Principles, DK_Sec } from '../components/dm/kit.jsx';
import { DK_Status } from '../components/dm/kit2.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Relevance } from '../components/dm/heroes.jsx';

const IN_URL = "/services/digital-marketing/influencer-marketing";

const IN_TITLE = "Influencer Marketing Services | Frequent Research";

const IN_FORM = "in-consult";

const IN_TIERS = [
  ["Nano", "Smaller, highly focused communities"],
  ["Micro", "Niche influence, strong community relevance"],
  ["Mid-tier", "Broader category reach"],
  ["Macro", "Large audiences, broad awareness"],
  ["Celebrity", "Mass awareness and visibility"],
];

const IN_OBJ = [
  ["Awareness", [2, 3, 4]],
  ["Consideration", [1, 2]],
  ["Conversion", [0, 1, 2]],
  ["Community", [0, 1]],
  ["Technical education", [1]],
];

function IN_Spectrum() {
  const [o, setO] = ee.useState(0);
  const fit = IN_OBJ[o][1];
  return (
    <DK_Sec tone="off" className="in-sp" label="in-sp-h">
      <PP_Head
        k="Creator types"
        id="in-sp-h"
        t="The Right Creator Tier Depends on the Objective"
        s="No tier is universally better. Choose an objective to see where creators usually fit — a framework, not a rule."
        center
      />
      <div className="in-sp__obj" role="group" aria-label="Campaign objective">
        {IN_OBJ.map(([t], k) => (
          <button key={t} type="button" aria-pressed={o === k} onClick={() => setO(k)}>
            {t}
          </button>
        ))}
      </div>
      <ol className="in-sp__row" aria-live="polite">
        {IN_TIERS.map(([t, d], k) => (
          <li key={t} className={fit.includes(k) ? "is-fit" : ""} style={{ "--k": k }}>
            <i aria-hidden="true" />
            <b>{t}</b>
            <span>{d}</span>
            <em>{fit.includes(k) ? "Often a fit" : ""}</em>
          </li>
        ))}
      </ol>
    </DK_Sec>
  );
}

const IN_BRIEF = [
  ["Campaign objective", "What the campaign must achieve", "target"],
  ["Target audience", "Who it's for", "users"],
  ["Key message", "The one thing to remember", "msg"],
  ["Creator profile", "Who should say it", "user"],
  ["Content format", "Video, post, live, review…", "rocket"],
  ["Platform", "Where it runs", "globe"],
  ["Deliverables", "What's produced", "box"],
  ["Timeline", "When it happens", "clock"],
  ["Usage rights", "Where and how long content can be used", "file"],
  ["Disclosure", "How the partnership is made transparent", "shield"],
  ["Brand guidelines", "What must stay consistent", "layers"],
  ["CTA & measurement", "The action — and how it's tracked", "bars"],
];

function IN_Brief() {
  return (
    <DK_Sec tone="light" className="in-brs" label="in-br-h">
      <PP_Head
        k="Influencer campaign brief"
        id="in-br-h"
        t="Great Campaigns Start With a Clear Brief"
        s="Twelve decisions made before a creator ever picks up a camera — clear for the brand, workable for the creator."
        center
      />
      <div className="in-br">
        {IN_BRIEF.map(([t, d, ic], k) => (
          <div key={t} style={{ "--k": k }}>
            <small>
              <PpI n={ic} s={12} />
              {t}
            </small>
            <b>{d}</b>
          </div>
        ))}
      </div>
    </DK_Sec>
  );
}

const IN_FAQ = [
  ["What is influencer marketing?", "Influencer marketing is partnering with creators whose audiences trust them, to reach relevant people with credible content that moves them to act."],
  ["How is your approach to influencer marketing different?", "Creators are chosen by audience relevance, not follower count. Audience alignment, category relevance, credibility, content fit, engagement quality and brand fit are assessed against the objective before anyone is approached."],
  ["What does an influencer marketing service include?", "Depending on your needs: strategy, creator discovery and vetting, outreach and coordination, briefs, content direction, campaign management, optional paid amplification, usage rights planning and measurement."],
  ["Is influencer marketing only for consumer brands?", "No. B2B influence often comes from industry voices, founders, analysts and niche creators with trusted professional audiences."],
  ["How do you measure influencer campaigns?", "Against the objective: reach and engagement quality for awareness, and visits, sign-ups, codes or sales where tracking allows. Measurement depends on platform capabilities and the tracking setup."],
  ["How does AI support influencer marketing?", "AI can speed up discovery, content and audience analysis, trend spotting and reporting. People decide who represents the brand and review every partnership."],
  ["How much does influencer marketing cost?", "It depends on the creators, platforms, deliverables, usage rights and campaign requirements, so each campaign is scoped first."],
];

const IN_CFG = {
  key: "in",
  pfx: "in",
  cls: "in-svc",
  url: IN_URL,
  title: IN_TITLE,
  maTitle: "Influencer Marketing Services",
  desc: "Influencer marketing that chooses creators by audience relevance, not follower count: audience fit, credibility, content fit and engagement quality.",
  crumb: "Influencer Marketing",
  name: "Influencer Marketing",
  serviceType: "Influencer marketing",
  schemaDesc:
    "Influencer marketing: audience-fit creator selection, category relevance, credibility and engagement-quality assessment, briefs, campaign management, brand safety, usage rights, AI-assisted discovery and human-led partnership decisions.",
  formId: IN_FORM,
  hero: {
    kicker: "Audience fit over follower count",
    h1: "Influencer Marketing",
    tag: "Choose Influence by Audience Relevance, Not Just Reach.",
    lead: "A large following doesn't mean the right audience. Creators earn a place in the plan when their audience matches yours, their voice fits the category and their recommendation would make sense without the sponsorship.",
    cta: "Plan Your Influencer Campaign",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Audience fit", "Credibility", "Brand safety", "Usage rights", "AI-assisted, human-led"],
    vis: <HV_Relevance />,
  },
  statement: ["Influence isn't the size of an audience. It's the trust inside it.", ["Reach", "Relevance", "Credibility", "Audience fit", "Engagement", "Action"]],
  caps: [
    ["Influencer Strategy", "compass"],
    ["Creator Discovery", "search"],
    ["Vetting & Fit", "check"],
    ["Briefs & Direction", "file"],
    ["Campaign Management", "layers"],
    ["Paid Amplification", "megaphone"],
    ["Usage Rights", "shield"],
    ["Measurement", "bars"],
  ],
  problem: {
    title: "When Influence Is Bought by the Follower",
    sub: "Most influencer campaigns don't fail because creators lack reach. They fail because the audience isn't the right one.",
    items: [
      ["Chosen by follower count", "Big numbers, wrong audience.", "users"],
      ["Category mismatch", "Creators who never talk about your category.", "shuffle"],
      ["Inauthentic content", "Scripts that don't sound like the creator.", "msg"],
      ["Engagement without quality", "Likes and comments that don't signal real interest.", "bars"],
      ["Unclear objectives", "Campaigns launched without a defined action.", "target"],
      ["Brand-safety gaps", "Partnerships agreed before history is reviewed.", "shield"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Follower Count vs Audience Fit",
    sub: "Both find creators. One finds the right audience.",
    conv: ["Follower count", "Rate card", "Post", "Reach"],
    fr: ["Audience", "Creator fit", "Credibility", "Brief", "Content", "Engagement quality", "Action", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every partnership",
    title: "Influence Built Around the Audience, Not the Follower Count",
    sub: "How this approach differs — question by question.",
    answers: [
      "Selects creators by followers and rate card, sends a product, and reports reach and likes.",
      "Creators are assessed for audience alignment, category relevance, credibility, content fit, engagement quality and brand fit against a defined objective.",
      "Platform data shows audience characteristics; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which voices, messages and formats its audience finds credible.",
      "Objectives, audience definition, fit criteria, briefs, disclosure, usage rights and tracking are agreed before outreach.",
      "Content and audience response are reviewed; partnerships that fit are extended, others are not.",
      "Influencer content connects with social, video, content, paid amplification and reputation — one customer journey.",
      "AI speeds up discovery, audience and content analysis, trend spotting and reporting.",
      "People decide who represents the brand, review content and judge brand safety.",
      "Credible creator partnerships that reach the right people — and clearer evidence of what works.",
    ],
  },
  layers: {
    title: "The Five Tests Every Creator Should Pass",
    rows: [
      ["Reach", "megaphone", "The bigger the better", "Enough of the right people"],
      ["Relevance", "compass", "Any lifestyle creator", "Naturally talks about the category"],
      ["Credibility", "award", "Popularity", "An opinion the audience trusts"],
      ["Audience fit", "users", "Assumed audience", "Audience characteristics that match yours"],
      ["Engagement quality", "msg", "Like counts", "Real conversation and interest"],
      ["Brand fit", "shield", "Checked after signing", "Content history and values reviewed first"],
    ],
  },
  loop: {
    title: "How Influencer Marketing Works: Intelligence to Impact",
    center: "Audience intelligence",
    texts: [
      "Understand the objective, the audience and the role creators can play in the journey.",
      "Discover creators whose audiences, categories and voices fit — and the voices your customers already trust.",
      "Define fit criteria, briefs, deliverables, disclosure, usage rights and measures.",
      "Activate partnerships, content and — where useful — paid amplification.",
      "Measure engagement quality, audience response and actions.",
      "Learn which creators, formats and messages earned trust.",
      "Improve creator mix, briefs and amplification.",
      "Grow long-term partnerships that keep fitting the audience.",
    ],
  },
  capabilities: {
    title: "What Influencer Marketing Covers",
    layers: [
      ["Strategy", "compass", ["Objectives", "Audience definition", "Creator tiers"], "Decide what influence should achieve."],
      ["Discovery & vetting", "search", ["Audience fit", "Content history", "Authenticity checks"], "Fit before follower count."],
      ["Outreach & coordination", "msg", ["Outreach", "Negotiation support", "Timelines"], "Clear expectations on both sides."],
      ["Briefs & content direction", "file", ["Briefs", "Key messages", "Creative freedom"], "Guidance that keeps the creator's voice."],
      ["Campaign management", "layers", ["Scheduling", "Content review", "Disclosure"], "Organised, transparent campaigns."],
      ["Paid amplification", "megaphone", ["Creator content in ads", "Authorisation"], "Extend content that performs."],
      ["Usage rights", "shield", ["Duration", "Platforms", "Reuse"], "Agreed in writing up front."],
      ["Measurement", "bars", ["Engagement quality", "Actions", "Learning"], "Report what the audience did."],
    ],
  },
  ai: {
    sub: "AI speeds up discovery and analysis. People decide who represents the brand.",
    ai: [
      ["Creator discovery", "Surfaces creators by topic and audience."],
      ["Audience analysis", "Summarises audience characteristics where data allows."],
      ["Content analysis", "Reviews themes and tone across past content."],
      ["Trend spotting", "Flags emerging formats and topics."],
      ["Reporting", "Summarises campaign performance."],
    ],
    human: [
      ["Creator selection", "Who represents the brand."],
      ["Brand safety", "Content history and values judged by people."],
      ["Creative judgement", "Briefs that keep the creator's voice."],
      ["Relationships", "Partnerships managed by people."],
      ["Interpretation", "What the results mean for the business."],
    ],
  },
  metrics: {
    title: "Measure Trust and Action, Not Just Reach",
    tiers: [
      ["Reach", "Impressions", "Audience match"],
      ["Engagement quality", "Saves", "Comments", "Profile visits"],
      ["Website visits", "Sign-ups", "Code redemptions", "Sales (where tracked)"],
      ["Brand perception", "Content reuse value", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Build awareness", [0, 1], "Reach among the right audience, then engagement quality."],
      ["Build credibility", [1, 3], "Conversation quality and how the brand is perceived."],
      ["Drive action", [1, 2], "Visits, sign-ups and redemptions where tracking allows."],
      ["Create content", [1, 3], "Content that can be reused under agreed rights."],
    ],
  },
  learn: {
    title: "Every Partnership Should Inform the Next One",
    steps: [
      ["Campaign", "Five creators across two audience segments."],
      ["Signal", "Comments, saves, visits and redemptions per creator."],
      ["Insight", "Smaller niche creators drive more considered questions."],
      ["Decision", "Shift investment toward niche, high-fit creators."],
      ["Experiment", "Test a demonstration format against a review format."],
      ["Learning", "Record which voices and formats the audience trusts."],
      ["Better campaign", "The next creator shortlist starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Voices the audience trusts", "award", ["Positioning", "Market strategy"]],
      ["Questions raised in comments", "help", ["Product", "Content"]],
      ["How people describe the product", "msg", ["Positioning", "Content"]],
      ["Audiences with unexpected interest", "users", ["Market strategy", "Sales"]],
      ["Objections creators hear", "flag", ["Product", "Customer experience"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Influencer Marketing",
    items: [
      ["Audience before influencer", "Fit is assessed before outreach.", "users"],
      ["Credibility over reach", "Recommendations that make sense without sponsorship.", "award"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Brand safety built in", "History and values reviewed first.", "shield"],
      ["Transparent partnerships", "Disclosure and rights agreed up front.", "check"],
      ["AI-assisted, human-led", "Faster discovery with people deciding.", "bulb"],
    ],
  },
  related: {
    title: "Influence Works Better When It's Connected",
    sub: "Creators are one part of one customer journey.",
    center: "Influence",
    links: [
      ["Social Media Marketing", "Organic social that builds on creator content.", ppDm("social-media-marketing"), "digital"],
      ["Video Marketing", "Video built around audience attention.", ppDm("video-marketing"), "digital"],
      ["Content Marketing", "Content that extends each idea.", ppDm("content-marketing"), "digital"],
      ["Online Reputation Management", "Understand how the brand is perceived.", ppDm("online-reputation-management"), "digital"],
    ],
  },
  faq: IN_FAQ,
  faqTitle: "Influencer Marketing: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/influencer-marketing-guide">influencer marketing guide</PpL>.
    </>
  ),
  final: {
    sig: "Relevance. Credibility. Fit.",
    sigText: "Creators chosen by the audience they reach — and the trust they hold.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us about your audience, your category and what you want creators to help achieve. We'll help define where to start.",
  },
};

function IN_Page() {
  return (
    <RL_Page
      c={{
        ...IN_CFG,
        visuals: (
          <>
                  <DK_Status
        id="in-score-h"
        kicker="Creator intelligence scorecard"
        title="Assess Fit Before You Commit"
        sub="Seven dimensions, each given a qualitative level — never a fake number."
        dashTitle="Creator fit scorecard"
        levels={[
          ["Low", "c"],
          ["Medium", "n"],
          ["High", "w"],
          ["Strong fit", "s"],
        ]}
        headShort={["Low", "Medium", "High", "Strong"]}
        rows={[
          ["Audience relevance", "users", 3],
          ["Content relevance", "rocket", 2],
          ["Engagement quality", "msg", 3],
          ["Brand alignment", "award", 2],
          ["Campaign fit", "compass", 2],
          ["Commercial fit", "tag", 1],
          ["Risk / brand safety", "shield", 3],
        ]}
        note="Shows how fit is assessed — not a real person or data."
      />
            <IN_Spectrum />
          </>
        ),
        after: (
          <>
            <IN_Brief />
                  <DK_Principles
        id="in-safe-h"
        kicker="Brand safety & ethics"
        title="Influence Comes With Responsibility."
        sub="Influence works when trust comes first. Risk can be reduced — no one can eliminate it or control how audiences respond."
        items={[
          "Creator vetting",
          "Content review",
          "Disclosure expectations",
          "Brand guidelines",
          "Category suitability",
          "Reputational considerations",
          "Audience authenticity",
          "Historical content review",
          "Contractual expectations",
          "Escalation procedures",
          "Creator rights",
        ]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={IN_FORM}
        kicker="Influencer consultation"
        title="Plan Your Influencer Campaign"
        sub="A few quick steps — no commitment."
        type="Influencer Marketing Consultation"
        service="Influencer Marketing"
        icon="users"
        submitLabel="Plan My Influencer Campaign"
        successTitle="Thank you. Your influencer marketing request has been sent."
        msgLabel="Tell us about your requirement and industry (optional)"
        chips={[
          {
            k: "goal",
            t: "Objective",
            q: "Primary objective",
            label: "Primary objective",
            options: ["Brand awareness", "Product launch", "Engagement", "Website traffic", "Lead generation", "Sales", "Content creation", "Community building", "B2B thought leadership", "Not sure yet"],
          },
          {
            k: "market",
            t: "Market",
            q: "Target market (optional)",
            label: "Target market",
            multi: true,
            optional: true,
            options: ["India", "United States", "United Kingdom", "UAE / Middle East", "South-East Asia", "Europe", "Multiple / other"],
          },
          { k: "budget", t: "Budget", q: "Approximate budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { IN_Page };
