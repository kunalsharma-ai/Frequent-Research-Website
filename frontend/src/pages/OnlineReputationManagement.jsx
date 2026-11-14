/*
 * Online Reputation Management — /services/digital-marketing/online-reputation-management (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: "Perception Intelligence" —
 * Voice of Customer → Sentiment → Themes → Risk → Response → Improvement. Hero visual: HV_Perception.
 * Kept (3 custom visuals): RM_Monitor (alert pipeline), RM_Sentiment (tone/theme/weight), RM_Tree (response decision path).
 * Removed: the other RM_ visuals and sections, incl. case study. No promises of removing reviews, no guarantees.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, PpL, ppDm, ppIn, ppR } from '../components/dm/shared.jsx';
import { DK_BUDGET } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Perception } from '../components/dm/heroes.jsx';

const RM_URL = "/services/digital-marketing/online-reputation-management";

const RM_TITLE = "Online Reputation Management Services | Frequent Research";

const RM_FORM = "rm-consult";

const RM_SENT = [
  ["Positive", "s", ["Praise", "Recommendation", "Advocacy", "Satisfaction"], "+"],
  ["Neutral", "w", ["Questions", "Information requests", "General mentions"], "○"],
  ["Negative", "c", ["Complaints", "Frustration", "Service issues", "Misinformation"], "−"],
];

function RM_Sentiment() {
  const [ref, v] = ppIn(0.25);
  const parts = [0, 2, 1, 0, 2, 1, 0, 1, 2, 0, 2, 1];
  return (
    <section ref={ref} className={"dk-sec dk-sec--dark rm-sen" + (v ? " is-in" : "")} aria-labelledby="rm-sen-h">
      <div className="container">
        <PP_Head
          k="Sentiment analysis"
          id="rm-sen-h"
          t="Every Mention Has a Tone, a Theme and a Weight"
          s="Mentions are sorted by sentiment, then by theme and severity — so the response matches what was actually said. We show categories, not invented percentages."
          light
          center
        />
        <div className="rm-sen__stage">
          <div className="rm-sen__src" aria-hidden="true">
            <PpI n="msg" s={16} />
            Incoming mentions
          </div>
          <div className="rm-sen__parts" aria-hidden="true">
            {parts.map((c, k) => (
              <i key={k} className={"rm-sen__p rm-sen__p--" + c} style={{ "--k": k }} />
            ))}
          </div>
          <div className="rm-sen__cols">
            {RM_SENT.map(([t, c, items, sym], k) => (
              <div key={t} className={"rm-sen__col rm-sen__col--" + c} style={{ "--k": k }}>
                <h3>
                  <span aria-hidden="true">{sym}</span>
                  {t}
                </h3>
                <ul>
                  {items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <ol className="dk-chip-flow rm-sen__flow">
          {["Sentiment", "Theme", "Severity", "Action"].map((t, k) => (
            <li key={t} style={{ "--k": k }}>
              {t}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

const RM_FEED = [
  ["Review detected", "msg", "Respond and learn"],
  ["Brand mention detected", "megaphone", "Classify and log"],
  ["Search result changed", "search", "Assess the change"],
  ["Negative conversation detected", "flag", "Prioritise and respond"],
  ["Customer complaint", "help", "Resolve and escalate"],
  ["Positive advocacy", "award", "Acknowledge and amplify"],
];

const RM_PIPE = ["Alert", "Analyse", "Prioritise", "Act"];

function RM_Monitor() {
  const [ref, v] = ppIn(0.3);
  const [t, setT] = ee.useState(0);
  ee.useEffect(() => {
    if (!v || ppR()) return;
    const i = setInterval(() => setT((x) => x + 1), 950);
    return () => clearInterval(i);
  }, [v]);
  const cur = Math.floor(t / RM_PIPE.length) % RM_FEED.length;
  const st = t % RM_PIPE.length;
  return (
    <section ref={ref} className={"dk-sec dk-sec--light rm-mon" + (v ? " is-in" : "")} aria-labelledby="rm-mon-h">
      <div className="container rm-mon__in">
        <div>
          <PP_Head
            k="Online reputation monitoring"
            id="rm-mon-h"
            t="Know What Is Being Said Before It Becomes a Bigger Problem"
            s="Monitoring brings scattered signals into one place, then routes each one: alert, analyse, prioritise, act."
          />
          <ul className="dk-os__list">
            {RM_FEED.map(([s, , a]) => (
              <li key={s}>
                <b>{s}</b> — {a}
              </li>
            ))}
          </ul>
        </div>
        <div className="rm-mon__vis" aria-hidden="true">
          <div className="rm-mon__feed">
            <small>Signals — not live data</small>
            <ul>
              {RM_FEED.map(([s, ic], k) => (
                <li key={s} className={k === cur ? "is-on" : ""}>
                  <i>
                    <PpI n={ic} s={13} />
                  </i>
                  {s}
                  {k === cur && <em>New</em>}
                </li>
              ))}
            </ul>
          </div>
          <div className="rm-mon__eng">
            <b>Reputation monitoring</b>
            <ol>
              {RM_PIPE.map((p, k) => (
                <li key={p} className={k === st ? "is-on" : k < st ? "is-done" : ""}>
                  {p}
                </li>
              ))}
            </ol>
            <p key={cur + "-" + (st === 3)}>{st === 3 ? RM_FEED[cur][2] : RM_FEED[cur][0]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

const RM_TREE = [
  ["Is it positive?", "Acknowledge, encourage and learn from it.", "award"],
  ["Is it a genuine complaint?", "Respond, resolve and escalate where needed.", "msg"],
  ["Is it misinformation?", "Assess, clarify and correct where appropriate.", "search"],
  ["Is it potentially harmful or high-risk?", "Escalate through the agreed crisis process.", "flag"],
];

function RM_Tree() {
  const [ref, v] = ppIn(0.25);
  const [on, setOn] = ee.useState(-1);
  return (
    <section ref={ref} className={"dk-sec dk-sec--off rm-tree" + (v ? " is-in" : "")} aria-labelledby="rm-tree-h">
      <div className="container">
        <PP_Head
          k="Reputation response framework"
          id="rm-tree-h"
          t="A Mention Appears. What Happens Next?"
          s="Not 'we respond to reviews' — a decision path that matches the response to the situation. Hover or tap a question."
          center
        />
        <div className="rm-tree__start">
          <PpI n="megaphone" s={16} />A mention appears
        </div>
        <ol className="rm-tree__list">
          {RM_TREE.map(([q, a, ic], k) => (
            <li key={q} style={{ "--k": k }} className={on === k ? "is-on" : ""} onMouseEnter={() => setOn(k)} onMouseLeave={() => setOn(-1)}>
              <button type="button" className="rm-tree__q" onFocus={() => setOn(k)} onBlur={() => setOn(-1)} onClick={() => setOn(k)}>
                <span>
                  <PpI n={ic} s={15} />
                </span>
                {q}
              </button>
              <span className="rm-tree__yes">
                <em>Yes</em>
                {a}
              </span>
              <span className="rm-tree__no" aria-hidden="true">
                No ↓
              </span>
            </li>
          ))}
        </ol>
        <div className="rm-tree__end">Otherwise: monitor, log and review at the next check-in.</div>
      </div>
    </section>
  );
}

const RM_FAQ = [
  ["What is online reputation management?", "Online reputation management (ORM) is monitoring, understanding and influencing how a brand is represented and perceived across the online channels that matter to its customers — search results, reviews, social media, forums and news."],
  ["What is Perception Intelligence?", "It's our starting point for reputation work: understanding what people say, how they feel, which themes recur, where risk is building and what customers expect — before deciding what to say back."],
  ["What does an online reputation management service include?", "Depending on your needs: monitoring, review management, sentiment and theme analysis, response strategy, escalation processes, search reputation, trust-building content and reporting."],
  ["Can you remove negative reviews?", "No promise of removal is made. Legitimate reviews generally can't simply be removed. The work focuses on appropriate responses, resolving issues where possible, reporting content that breaks a platform's own policies, and strengthening credible information."],
  ["Can you guarantee search results or ratings?", "No. Search results, rankings and ratings depend on platforms and on what people write, so no specific outcome is guaranteed."],
  ["How does AI support reputation management?", "AI can help classify mentions by sentiment and theme, summarise conversations and detect patterns. People review sensitive responses, judge context and decide on escalation."],
  ["How much does online reputation management cost?", "It depends on scope, markets, channels, monitoring requirements and complexity, so an assessment usually comes first."],
];

const RM_CFG = {
  key: "rm",
  pfx: "rm",
  url: RM_URL,
  title: RM_TITLE,
  maTitle: "Online Reputation Management Services",
  desc: "Online reputation management built on Perception Intelligence: monitoring, sentiment, recurring themes, risk and response strategy, with human review.",
  crumb: "Online Reputation Management",
  name: "Online Reputation Management",
  serviceType: "Online reputation management",
  schemaDesc:
    "Online reputation management: Perception Intelligence, review and mention monitoring, sentiment and theme analysis, recurring complaints, response strategy, escalation, search reputation, AI-assisted classification and human-reviewed responses.",
  formId: RM_FORM,
  hero: {
    kicker: "Perception Intelligence",
    h1: "Online Reputation Management",
    tag: "Understand What People Are Saying Before You Decide What to Say Back.",
    lead: "Reputation is built from thousands of small signals — reviews, comments, searches and conversations. Managing it starts with understanding them: the sentiment, the recurring themes, the risk and what customers actually expect.",
    cta: "Request a Reputation Assessment",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Monitoring", "Sentiment & themes", "Response strategy", "Escalation", "AI-assisted, human-led"],
    vis: <HV_Perception />,
  },
  statement: ["Reputation isn't what you say about yourself. It's what people say when you're not in the room.", ["Voice of customer", "Sentiment", "Themes", "Risk", "Response", "Improvement"]],
  caps: [
    ["Reputation Monitoring", "eyeoff"],
    ["Review Management", "award"],
    ["Sentiment Analysis", "pie"],
    ["Theme Analysis", "layers"],
    ["Response Strategy", "msg"],
    ["Escalation", "flag"],
    ["Search Reputation", "search"],
    ["Reporting", "bars"],
  ],
  problem: {
    title: "When Reputation Is Managed One Review at a Time",
    sub: "Most reputation problems aren't single reviews. They're patterns nobody connected.",
    items: [
      ["Reacting, not understanding", "Replies written without knowing what's behind them.", "msg"],
      ["Recurring complaints unseen", "The same issue appears in many places, unconnected.", "refresh"],
      ["Scattered signals", "Reviews, social and search monitored separately — or not at all.", "grid"],
      ["Slow escalation", "Risky mentions found after they've spread.", "flag"],
      ["Generic responses", "Copy-paste replies that make it worse.", "file"],
      ["No link to the business", "Feedback that never reaches the people who can fix it.", "box"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Review Replies vs Perception Intelligence",
    sub: "Both respond. One understands what the responses should fix.",
    conv: ["New review", "Reply", "Next review", "Star rating"],
    fr: ["Voice of customer", "Sentiment", "Themes", "Risk", "Response", "Improvement", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every response",
    title: "Reputation Built on Understanding, Not Just Replies",
    sub: "How this approach to reputation differs — question by question.",
    answers: [
      "Responds to reviews one by one, tracks the star rating and pushes for more positive reviews.",
      "Mentions are understood first — sentiment, recurring themes, expectations and risk — and the response strategy follows.",
      "Monitoring shows what is said; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which issues recur, what customers expect and what builds or erodes trust.",
      "Channels, monitoring scope, themes, response guidelines, escalation paths and approvals are agreed first.",
      "Themes and sentiment are tracked over time; responses and processes are refined; issues are fed back to the business.",
      "Reputation connects with social, influencer, content, search and customer experience — one customer journey.",
      "AI helps classify mentions by sentiment and theme, summarise conversations and detect patterns.",
      "People review sensitive responses, judge context, decide escalation and protect the brand's voice.",
      "A reputation managed with understanding — and feedback the whole business can act on.",
    ],
  },
  layers: {
    title: "Perception Intelligence: What Gets Understood First",
    rows: [
      ["Reviews & mentions", "eyeoff", "Scattered checks", "One view across the channels that matter"],
      ["Sentiment", "pie", "Star rating", "The tone behind what is said"],
      ["Recurring themes", "layers", "One review at a time", "Patterns across many voices"],
      ["Customer expectations", "help", "Assumed", "What people expected and didn't get"],
      ["Risk", "flag", "Discovered late", "Signals assessed and escalated early"],
      ["Response strategy", "msg", "Copy-paste replies", "Responses matched to the situation"],
    ],
  },
  loop: {
    title: "How Reputation Management Works: Intelligence to Impact",
    center: "Perception intelligence",
    texts: [
      "Understand the brand, its audiences, its channels and what's at stake.",
      "Discover what people say — sentiment, themes, expectations.",
      "Define monitoring scope, response guidelines, escalation paths and measures.",
      "Activate monitoring, responses, escalation and trust-building content.",
      "Measure sentiment trends, theme changes, response times and resolution.",
      "Learn which issues recur and which responses rebuild trust.",
      "Improve responses, processes — and feed issues back to the business.",
      "Grow a reputation grounded in how customers are actually treated.",
    ],
  },
  capabilities: {
    title: "What Online Reputation Management Covers",
    layers: [
      ["Reputation audit", "clipboard", ["Current perception", "Channels", "Risks"], "Know where you stand."],
      ["Monitoring", "eyeoff", ["Reviews", "Social", "Forums and news"], "One view of what's being said."],
      ["Review management", "award", ["Responses", "Review requests", "Platform reporting"], "Within each platform's rules."],
      ["Sentiment & themes", "pie", ["Sentiment", "Theme clusters", "Trends"], "Understand patterns, not single posts."],
      ["Response strategy", "msg", ["Guidelines", "Tone", "Templates as starting points"], "Responses that fit the situation."],
      ["Escalation & crisis process", "flag", ["Risk levels", "Escalation paths", "Approvals"], "Act early on high-risk signals."],
      ["Search reputation", "search", ["Branded search review", "Credible content"], "Strengthen accurate information."],
      ["Reporting", "bars", ["Sentiment trends", "Themes", "Actions"], "What changed — and what to fix."],
    ],
  },
  ai: {
    sub: "AI classifies and summarises. People decide how the brand responds.",
    ai: [
      ["Sentiment classification", "Sorts mentions by tone."],
      ["Theme detection", "Groups mentions into recurring topics."],
      ["Summaries", "Condenses long threads and review sets."],
      ["Pattern alerts", "Flags unusual spikes early."],
      ["Response drafts", "Suggests starting points for review."],
    ],
    human: [
      ["Sensitive responses", "Reviewed and written by people."],
      ["Context", "What a mention really means."],
      ["Escalation", "When and how to act."],
      ["Accuracy", "Facts checked before anything is said."],
      ["Brand voice", "How the brand sounds under pressure."],
    ],
  },
  metrics: {
    title: "Measure Perception, Not Just Ratings",
    tiers: [
      ["Mentions", "Reviews", "Share of voice"],
      ["Sentiment", "Recurring themes", "Response time", "Resolution"],
      ["Branded search", "Review trends", "Escalations handled"],
      ["Trust", "Customer experience changes", "Brand perception"],
    ],
    objectives: [
      ["Understand perception", [0, 1], "What people say, how they feel and which themes recur."],
      ["Respond better", [1, 2], "Response time, resolution and how conversations end."],
      ["Reduce risk", [1, 2], "Early detection and handled escalations."],
      ["Build trust", [2, 3], "Trends in reviews, search and perception over time."],
    ],
  },
  learn: {
    title: "Every Mention Should Improve the Next Response",
    steps: [
      ["Campaign", "Monitoring and responses across review sites."],
      ["Signal", "Sentiment, themes and response outcomes."],
      ["Insight", "Most negative reviews mention delivery delays."],
      ["Decision", "Share the theme with operations; adjust response guidance."],
      ["Experiment", "Test proactive delay updates with customers."],
      ["Learning", "Record how sentiment on delivery changes."],
      ["Better campaign", "Monitoring focuses on what matters most."],
    ],
  },
  intel: {
    signals: [
      ["Complaints that keep recurring", "refresh", ["Product", "Customer experience"]],
      ["What customers praise", "award", ["Positioning", "Content"]],
      ["Expectations the brand misses", "help", ["Product", "Customer experience"]],
      ["How competitors are perceived", "scale", ["Market strategy", "Positioning"]],
      ["Early signs of risk", "flag", ["Customer experience", "Market strategy"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Reputation Management",
    items: [
      ["Understand before responding", "Sentiment and themes come first.", "search"],
      ["Patterns, not single posts", "Recurring issues connected and reported.", "layers"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Human-reviewed responses", "Sensitive replies handled by people.", "check"],
      ["Honest about limits", "No promises to remove reviews or control results.", "shield"],
      ["AI-assisted, human-led", "Faster classification with people deciding.", "bulb"],
    ],
  },
  related: {
    title: "Reputation Works Better When It's Connected",
    sub: "Perception is shaped across one customer journey.",
    center: "Reputation",
    links: [
      ["Social Media Marketing", "Conversations where reputation is built.", ppDm("social-media-marketing"), "digital"],
      ["Influencer Marketing", "Credible voices the audience trusts.", ppDm("influencer-marketing"), "digital"],
      ["Content Marketing", "Credible information that answers concerns.", ppDm("content-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Track perception signals over time.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: RM_FAQ,
  faqTitle: "Online Reputation Management: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/online-reputation-management-guide">online reputation management guide</PpL>.
    </>
  ),
  final: {
    sig: "Listen. Understand. Respond.",
    sigText: "Reputation managed from what people actually say — with people reviewing what matters.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us where your reputation lives online and what concerns you. We'll help define where to start.",
  },
};

function RM_Page() {
  return (
    <RL_Page
      c={{
        ...RM_CFG,
        visuals: (
          <>
            <RM_Monitor />
            <RM_Sentiment />
          </>
        ),
        after: (
          <>
            <RM_Tree />
          </>
        ),
        formNode:       <DM_Form
        id={RM_FORM}
        kicker="Reputation assessment"
        title="Request a Reputation Assessment"
        sub="A few quick steps. We review your situation before we talk."
        type="Online Reputation Management Assessment"
        service="Online Reputation Management"
        icon="shield"
        submitLabel="Request My Reputation Assessment"
        successTitle="Thank you. Your reputation assessment request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need help with?",
            label: "Needs",
            multi: true,
            options: [
              "Reputation audit",
              "Online reputation monitoring",
              "Review management",
              "Google reputation management",
              "Search reputation",
              "Social media reputation",
              "Reputation repair",
              "Crisis reputation management",
              "Reputation strategy",
              "Not sure yet",
            ],
          },
          {
            k: "goal",
            t: "Objective",
            q: "Main objective",
            label: "Main objective",
            options: [
              "Protect reputation",
              "Improve search presence",
              "Improve review management",
              "Understand customer sentiment",
              "Address negative reputation signals",
              "Build trust",
              "Prepare for a reputation issue",
              "Not sure yet",
            ],
          },
          { k: "budget", t: "Budget", q: "Approximate monthly budget (optional)", label: "Monthly budget", options: DK_BUDGET, optional: true },
        ]}
      />,
      }}
    />
  );
}

export { RM_Page };
