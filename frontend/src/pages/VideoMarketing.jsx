/*
 * Video Marketing — /services/digital-marketing/video-marketing (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: audience attention + narrative + behavioural response —
 * Insight → Story → Script → Video → Distribution → Behaviour → Learning. Hero visual: HV_Storyboard.
 * Kept: VM_Film (production filmstrip), one-video-many-jobs streams, stage funnel, video ad test, responsible-AI principles.
 * No case study, no team or production-partner claims, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpI, PpL, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Funnel, DK_Principles, DK_Sec, DK_Streams, DK_Test } from '../components/dm/kit.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Storyboard } from '../components/dm/heroes.jsx';

const VM_URL = "/services/digital-marketing/video-marketing";

const VM_TITLE = "Video Marketing Services | Frequent Research";

const VM_FORM = "vm-consult";

const VM_FRAMES = [
  ["Concept", "bulb", "The idea and its job"],
  ["Script", "file", "Narrative and voice"],
  ["Storyboard", "grid", "Visual language"],
  ["Shoot / animate", "rocket", "Filming, motion, screen capture"],
  ["Edit", "sliders", "Sound, captions, colour"],
  ["Versions", "layers", "Formats for each channel"],
  ["Publish", "megaphone", "Website, social, ads, sales"],
  ["Learn", "bars", "What the audience did"],
];

function VM_Film() {
  const set = (hidden) => (
    <div className="vm-film__set" aria-hidden={hidden || undefined}>
      {VM_FRAMES.map(([t, ic, d]) => (
        <div className="vm-film__f" key={t}>
          <PpI n={ic} s={20} />
          <small>{d}</small>
          <b>{t}</b>
        </div>
      ))}
    </div>
  );
  return (
    <section className="vm-film" aria-label="Video production timeline: concept, script, storyboard, shoot or animate, edit, versions, publish, learn">
      <div className="vm-film__track">
        {set(false)}
        {set(true)}
      </div>
    </section>
  );
}

const VM_FAQ = [
  ["What is video marketing?", "Video marketing uses video — explainers, product videos, social clips, video ads, demonstrations and more — to help an audience understand, feel and act at each stage of the customer journey."],
  ["How is your approach to video different?", "Videos start from audience insight: what people need to understand, what holds their attention and what would make them act. Behaviour after publishing — viewing, drop-off and actions — then shapes the next video."],
  ["What does a video marketing service include?", "Depending on your needs: strategy, concepts, scripting, storyboards, production coordination, editing, channel versions, distribution, video advertising and measurement."],
  ["Which platforms do you plan video for?", "Typically YouTube, LinkedIn, Instagram, Facebook, websites, landing pages, email and sales conversations — chosen by audience and objective."],
  ["How does AI support video marketing?", "AI can help with concept ideas, scripting support, transcription, summarisation, repurposing and topic classification. Human review is essential before anything is published."],
  ["How do you measure video marketing?", "Against the objective: attention and completion for awareness, engagement and clicks for consideration, and landing behaviour and conversions where tracking allows."],
  ["How much does video marketing cost?", "It depends on format, length, production approach, versions and distribution, so each project is scoped first."],
];

const VM_CFG = {
  key: "vm",
  pfx: "vm",
  cls: "vm-svc",
  url: VM_URL,
  title: VM_TITLE,
  maTitle: "Video Marketing Services",
  desc: "Video marketing built on audience insight: stories, scripts and formats designed around what people want to understand, feel and do — measured by behaviour.",
  crumb: "Video Marketing",
  name: "Video Marketing",
  serviceType: "Video marketing",
  schemaDesc:
    "Video marketing: audience insight, concepts, scripting, storyboards, editing, channel versions, distribution, video advertising, AI-assisted scripting and repurposing with human review, and behavioural measurement.",
  formId: VM_FORM,
  hero: {
    kicker: "Audience-led video",
    h1: "Video Marketing",
    tag: "Create Videos Around What Your Audience Wants to Understand, Feel and Do.",
    lead: "A video earns attention when it answers something the audience cares about. The story starts from insight, the script follows the audience's questions, and what people watch, skip and do afterwards shapes the next video.",
    cta: "Plan Your Video Strategy",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Audience insight", "Story & script", "Channel versions", "Behavioural measurement", "AI-assisted, human-led"],
    vis: <HV_Storyboard />,
  },
  statement: ["Attention is earned in the first seconds — and kept by relevance.", ["Insight", "Story", "Script", "Video", "Distribution", "Behaviour", "Learning"]],
  caps: [
    ["Video Strategy", "compass"],
    ["Concepts & Scripts", "file"],
    ["Storyboards", "grid"],
    ["Editing & Versions", "sliders"],
    ["Social Video", "msg"],
    ["Video Advertising", "megaphone"],
    ["Distribution", "globe"],
    ["Measurement", "bars"],
  ],
  problem: {
    title: "When Video Is Made Before the Audience Is Understood",
    sub: "Most videos don't fail on production quality. They fail because they answer a question nobody was asking.",
    items: [
      ["Made for the brand, not the viewer", "Messages the business wants to say, not what people want to know.", "users"],
      ["Lost in the first seconds", "Openings that don't earn attention.", "clock"],
      ["One format everywhere", "The same cut posted on every platform.", "layers"],
      ["No clear job", "Videos without a defined stage or action.", "target"],
      ["Measured by views", "Views reported; what people did afterwards unknown.", "bars"],
      ["Made once, never reused", "Strong ideas that never travel further.", "refresh"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Production-Led Video vs Audience-Led Video",
    sub: "Both make videos. One starts from what the audience wants to understand.",
    conv: ["Idea", "Shoot", "Post", "Views"],
    fr: ["Insight", "Story", "Script", "Video", "Distribution", "Behaviour", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every frame",
    title: "Video Built Around Attention and Insight, Not Just Production",
    sub: "How this approach to video differs — question by question.",
    answers: [
      "Starts with a creative idea, produces a polished video, posts it and reports views.",
      "Each video starts from audience insight, a defined journey stage and a clear action — then the story and format follow.",
      "Viewing behaviour shows attention and drop-off; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which stories, messages and formats hold attention and move people to act.",
      "Audience, objective, stage, key message, formats, channels and measures are agreed before scripting.",
      "Retention curves, engagement and actions are reviewed; hooks, edits and versions are refined.",
      "Video connects with social, content, influencer, ads, landing pages and sales — one customer journey.",
      "AI helps with concepts, scripting support, transcription, summarisation, repurposing and topic classification.",
      "People own the story, accuracy, brand voice, cultural context and approval — human review is essential.",
      "Videos people watch, understand and act on — and evidence of what works.",
    ],
  },
  layers: {
    title: "What Shapes Each Video",
    rows: [
      ["Audience insight", "users", "Assumed interest", "What the audience wants to understand"],
      ["Journey stage", "map", "One video for everyone", "The right video for each decision stage"],
      ["Narrative", "file", "Feature list", "A story built around the viewer's question"],
      ["Opening seconds", "clock", "Logo intro", "A hook that earns attention"],
      ["Format & channel", "layers", "One cut everywhere", "Versions suited to each platform"],
      ["Behaviour", "bars", "View counts", "Retention, engagement and actions"],
    ],
  },
  loop: {
    title: "How Video Marketing Works: Intelligence to Impact",
    center: "Attention intelligence",
    texts: [
      "Understand the objective, the audience and where video fits the journey.",
      "Discover audience questions, attention patterns and the signals already in your CRM and analytics.",
      "Define the story, key messages, formats, channels and measures.",
      "Activate scripting, production, editing, versions and distribution.",
      "Measure attention, retention, engagement and actions.",
      "Learn which hooks, stories and formats hold attention.",
      "Improve edits, openings, versions and distribution.",
      "Grow a video library that keeps working across the journey.",
    ],
  },
  capabilities: {
    title: "What Video Marketing Covers",
    layers: [
      ["Video strategy", "compass", ["Objectives", "Stage mapping", "Channel roles"], "Decide what each video should do."],
      ["Concepts & scripting", "file", ["Concepts", "Scripts", "Key messages"], "Stories built around the audience."],
      ["Storyboards & planning", "grid", ["Storyboards", "Shot lists", "Visual style"], "Plan before production."],
      ["Production coordination", "rocket", ["Filming", "Animation", "Screen capture"], "Scoped to the project and format."],
      ["Editing & versions", "sliders", ["Editing", "Captions", "Channel versions"], "One idea, the right cut for each channel."],
      ["Video advertising", "megaphone", ["Hooks", "Placements", "Testing"], "Video ads with a job to do."],
      ["Distribution", "globe", ["Website", "Social", "Email", "Sales"], "Put each video where it's useful."],
      ["Measurement", "bars", ["Retention", "Engagement", "Actions"], "Report what viewers did."],
    ],
  },
  ai: {
    sub: "AI speeds up ideas and repurposing. People own the story and approve every video.",
    ai: [
      ["Concept ideas", "Suggests angles and hooks to explore."],
      ["Scripting support", "Drafts structures and lines for review."],
      ["Transcription", "Creates transcripts and captions."],
      ["Repurposing", "Suggests clips and cut-downs."],
      ["Topic classification", "Groups videos and comments by theme."],
    ],
    human: [
      ["The story", "What the video says and why."],
      ["Accuracy", "Every claim and visual checked."],
      ["Brand voice", "How the brand looks and sounds."],
      ["Cultural context", "What fits the market and moment."],
      ["Approval", "Nothing AI-assisted ships unreviewed."],
    ],
  },
  metrics: {
    title: "Measure Attention and Action, Not Just Views",
    tiers: [
      ["Impressions", "Views", "Reach"],
      ["Retention", "Completion", "Engagement", "Shares"],
      ["Clicks", "Landing behaviour", "Enquiries", "Conversions"],
      ["Sales-conversation use", "Brand perception", "Customer value (where data allows)"],
    ],
    objectives: [
      ["Build awareness", [0, 1], "Reach the right audience, then check retention."],
      ["Explain the offer", [1, 2], "Completion and what people do after watching."],
      ["Drive action", [1, 2], "Clicks, landing behaviour and conversions."],
      ["Support sales", [2, 3], "Use in sales conversations and influence on decisions."],
    ],
  },
  learn: {
    title: "Every Video Should Teach the Next One",
    steps: [
      ["Campaign", "An explainer and three short cut-downs."],
      ["Signal", "Retention, drop-off points, clicks and landing behaviour."],
      ["Insight", "Viewers drop when the video turns to features."],
      ["Decision", "Lead with the customer problem; move features later."],
      ["Experiment", "Test a problem-first hook against the original."],
      ["Learning", "Record which openings hold attention."],
      ["Better campaign", "The next script starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Questions viewers ask in comments", "help", ["Product", "Content"]],
      ["Moments where attention drops", "flag", ["Content", "Positioning"]],
      ["Stories that hold attention", "bulb", ["Positioning", "Content"]],
      ["Features people rewatch", "refresh", ["Product", "Sales"]],
      ["Audiences that respond differently", "users", ["Market strategy", "Sales"]],
    ],
  },
  why: {
    title: "Why Frequent Research for Video",
    items: [
      ["Insight before production", "Stories start from what the audience needs.", "bulb"],
      ["Built for attention", "Hooks and structure designed for real viewing.", "clock"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Made to travel", "One idea, versions for each channel.", "layers"],
      ["Measured by behaviour", "Retention and action, not just views.", "bars"],
      ["AI-assisted, human-led", "Faster production with people approving.", "check"],
    ],
  },
  related: {
    title: "Video Works Better When It's Connected",
    sub: "Video is one part of one customer journey.",
    center: "Video",
    links: [
      ["Social Media Marketing", "Video that fits each social platform.", ppDm("social-media-marketing"), "digital"],
      ["Content Marketing", "Turn content insight into video.", ppDm("content-marketing"), "digital"],
      ["Influencer Marketing", "Creator video with audience fit.", ppDm("influencer-marketing"), "digital"],
      ["Social Media Advertising", "Video ads tested by audience and message.", ppDm("social-media-advertising"), "digital"],
    ],
  },
  faq: VM_FAQ,
  faqTitle: "Video Marketing: Frequently Asked Questions",
  faqAside: (
    <>
      Want more detail? Read the <PpL to="/blog/video-marketing-guide">video marketing guide</PpL>.
    </>
  ),
  final: {
    sig: "Insight. Story. Behaviour.",
    sigText: "Videos built around what your audience wants to understand — and improved by what viewers do.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us about your audience, your message and where video should help. We'll help define where to start.",
  },
};

function VM_Page() {
  return (
    <RL_Page
      c={{
        ...VM_CFG,
        before: (
          <>
            <VM_Film />
          </>
        ),
        visuals: (
          <>
                  <DK_Funnel
        id="vm-fun-h"
        kicker="Video marketing funnel"
        title="The Right Video for Every Stage"
        stages={[
          ["Discover", "", ["Short-form video", "Social video", "Video advertising"]],
          ["Explore", "", ["Explainers", "Educational videos", "Product videos"]],
          ["Evaluate", "", ["Demonstrations", "Comparisons", "Thought leadership"]],
          ["Convert", "", ["Landing-page video", "Sales video", "Product demo"]],
          ["Retain", "", ["Education", "Onboarding", "Customer communication"]],
          ["Advocate", "", ["Customer stories", "Community", "Brand content"]],
        ]}
      />
                  <DK_Sec tone="light" className="dk-strsec" label="vm-many-h">
        <PP_Head
          k="One video, many jobs"
          id="vm-many-h"
          t="Create Once. Adapt Intelligently. Extend the Value."
          s="Not every video should be repurposed — but a strong core idea often can be, where each version suits its channel."
          center
        />
        <DK_Streams
          inputs={[["One core idea", "bulb"]]}
          core="Core video"
          coreSub="Shot and planned once"
          outputs={["Product video", "Website video", "YouTube", "LinkedIn", "Short-form / Reel", "Video ad", "Sales clip", "Email video", "WhatsApp video", "Landing-page video"]}
        />
      </DK_Sec>
          </>
        ),
        after: (
          <>
                  <DK_Test
        id="vm-test-h"
        kicker="Video advertising"
        title="Video Advertising That Has a Job to Do"
        sub={
          <>
            Audience → message → creative → placement → landing page → conversion → measurement. No promised results — just structured testing. See{" "}
            <PpL to={ppDm("social-media-advertising")}>social media advertising</PpL> and <PpL to={ppDm("google-ads-ppc")}>Google Ads / PPC</PpL>.
          </>
        }
        variants={[
          ["H", "Hook / opening frame", "bulb"],
          ["M", "Message", "msg"],
          ["F", "Format & length", "layers"],
          ["T", "Thumbnail / visual style", "grid"],
          ["C", "Offer & CTA", "target"],
        ]}
        metrics={["Attention", "Engagement", "Clicks", "Landing behaviour", "Conversions"]}
        process={["Test", "Measure", "Learn", "Next creative"]}
      />
                  <DK_Principles
        id="vm-rai-h"
        kicker="Responsible AI"
        title="AI-Assisted Material Is Reviewed Before It Ships"
        sub="Nothing AI-generated is treated as automatically production-ready."
        items={["Accuracy", "Brand consistency", "Copyright and licensing", "No misleading claims", "Voice authenticity", "Cultural context", "Visual consistency", "Human approval"]}
      />
          </>
        ),
        formNode:       <DM_Form
        id={VM_FORM}
        title="Plan Your Video Strategy"
        sub="A few quick steps help us understand your goals before we talk."
        type="Video Marketing Consultation"
        service="Video Marketing"
        icon="rocket"
        submitLabel="Plan My Video Strategy"
        successTitle="Thank you. Your video marketing consultation request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need?",
            label: "Needs",
            multi: true,
            options: ["Video Marketing", "Video Production", "B2B Video", "Product Video", "Video Advertising", "Social Video", "Explainer Video", "Motion Graphics / Animation", "Video Strategy", "Not sure yet"],
          },
          {
            k: "goal",
            t: "Goal",
            q: "Main goal",
            label: "Main goal",
            options: ["Brand awareness", "Lead generation", "Product education", "Sales enablement", "Social engagement", "Paid advertising", "Website conversion", "Thought leadership", "Customer education"],
          },
          { k: "budget", t: "Budget", q: "Approximate budget", label: "Budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { VM_Page };
