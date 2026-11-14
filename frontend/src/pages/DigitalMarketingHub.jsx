/*
 * Digital Marketing landing page — /services/digital-marketing (URL unchanged)
 * Build 34: "Digital Growth, Built Around the Business." Technology-aware digital growth positioning.
 * No market-research positioning, no team details, no case studies, no example boxes, no invented numbers.
 * Narrative: hero (Digital Growth Control Room) → philosophy → why a different approach → Digital Growth Engine →
 * business value → what does the business need? → services → operating system → AI lab → marketing + technology →
 * signals → vanity vs value → growth loop → why Frequent Research → FAQ → "Marketing that learns" → form.
 */
import * as ee from 'react';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, DM_Strip, dmMeta, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Hero } from '../components/dm/kit.jsx';
import { RL_Services } from '../components/dm/kit4.jsx';
import { DGV_ControlRoom, DG_AiLab, DG_Close, DG_Contrast, DG_Engine, DG_Loop, DG_Manifesto, DG_Need, DG_OS, DG_Signals, DG_TechStack, DG_ValueRail, DG_Vanity, DG_Why } from '../components/dm/dgkit.jsx';

const DMH_URL = "/services/digital-marketing";
const DMH_TITLE = "Digital Marketing Services | Frequent Research";
const DMH_DESC = "Digital growth built around the business: strategy, search, media, social, content, CRM, analytics and AI-assisted optimisation working as one connected system.";
const DMH_FORM = "dmh-consult";

/* [title, slug, icon, how we operate it] */
const DMH_SERVICES = [
  ["SEO Services", "seo-services", "search", "Search visibility built around intent, content and technical health."],
  ["Google Ads / PPC", "google-ads-ppc", "target", "Paid search budgets placed behind evidence of intent."],
  ["Social Media Marketing", "social-media-marketing", "users", "Social presence that builds brand momentum, not just posts."],
  ["Social Media Advertising", "social-media-advertising", "megaphone", "Paid social built on audience, message and creative testing."],
  ["Content Marketing", "content-marketing", "file", "Content designed around questions, intent and action."],
  ["Performance Marketing", "performance-marketing", "trend", "Performance systems that keep learning, not campaign spreadsheets."],
  ["Lead Generation", "lead-generation", "flag", "Pipelines built around fit and qualification, not raw volume."],
  ["B2B Digital Marketing", "b2b-digital-marketing", "box", "Digital programmes built for long, multi-person buying journeys."],
  ["Email Marketing", "email-marketing", "msg", "Lifecycle communication that learns from behaviour."],
  ["WhatsApp Marketing", "whatsapp-marketing", "phone", "Consent-first conversations that feel relevant, not intrusive."],
  ["Influencer Marketing", "influencer-marketing", "award", "Creators chosen by audience fit and credibility."],
  ["Video Marketing", "video-marketing", "rocket", "Video built around attention, story and the next action."],
  ["E-commerce Marketing", "e-commerce-marketing", "tag", "The whole shopper journey — discovery to repeat purchase."],
  ["Landing Page & CRO", "landing-page-and-cro", "sliders", "Pages that answer the question before asking for the action."],
  ["Digital Marketing Consulting", "digital-marketing-consulting", "compass", "Direction for decisions bigger than one campaign."],
  ["Online Reputation Management", "online-reputation-management", "shield", "Understanding what people say before deciding what to say back."],
  ["Marketing Automation", "marketing-automation", "refresh", "Automating the right journey, not just the next message."],
  ["Digital Analytics & Reporting", "digital-analytics-and-reporting", "bars", "Measurement that turns signals into decisions."],
  ["Digital Marketing Audit", "digital-marketing-audit", "clipboard", "Finding the gaps between activity and business need."],
];
const DMH_GOALS = [
  ["All services", null],
  ["Be found", ["seo-services", "google-ads-ppc", "content-marketing", "video-marketing", "social-media-marketing"]],
  ["Reach the right audience", ["social-media-advertising", "google-ads-ppc", "influencer-marketing", "b2b-digital-marketing", "performance-marketing"]],
  ["Generate leads & pipeline", ["lead-generation", "b2b-digital-marketing", "landing-page-and-cro", "email-marketing", "marketing-automation"]],
  ["Convert & sell", ["landing-page-and-cro", "e-commerce-marketing", "performance-marketing", "google-ads-ppc", "whatsapp-marketing"]],
  ["Retain & build trust", ["email-marketing", "whatsapp-marketing", "marketing-automation", "online-reputation-management", "social-media-marketing"]],
  ["Understand & decide", ["digital-analytics-and-reporting", "digital-marketing-audit", "digital-marketing-consulting"]],
];

const DMH_FAQ = [
  ["How do you decide which channels matter?", "We start with the business objective and the audience, then look at where that audience already searches, scrolls, reads and decides. Channels are recommended because they fit the objective — not because they are available. Sometimes the answer is fewer channels, better connected."],
  ["Can you work alongside our existing marketing team?", "Yes. We can own a channel, run the full programme or support the people you already have with strategy, execution, analytics or automation. Ownership and hand-offs are agreed up front so nothing falls between two teams."],
  ["Can you work with our existing CRM, website and technology stack?", "Yes. Most engagements start with what is already in place — the website, CRM, analytics, ad accounts and automation tools — and improve how they connect. We recommend new tools only when the current ones genuinely limit the work."],
  ["How do you approach AI in marketing?", "AI-assisted, human-led. We use AI for clustering, analysis, content variation, anomaly detection, reporting and testing support. Strategy, brand judgement, creative direction, privacy and final approvals stay with people."],
  ["How do you separate useful signals from vanity metrics?", "Every metric gets a job. Reach and likes are read alongside intent, engagement quality, journey progression and conversion signals, so we can see what changed — not just what was seen."],
  ["Can services be used individually?", "Yes. Many clients start with one service — an audit, SEO or paid media — and connect more as the system grows. Each service is still run with the wider business objective in view."],
  ["How do you approach measurement and ongoing optimisation?", "Measurement is set up before launch: objectives, conversion events, tracking and reporting. After launch we review signals on a regular rhythm and change campaigns, content and experiences based on evidence."],
  ["Do you guarantee results?", "No. We commit to clear thinking, honest measurement and continuous improvement. Rankings, leads and revenue depend on markets, competition, budgets and implementation."],
];

function DMH_Page() {
  usePageMeta("Digital Marketing Services", DMH_DESC);
  dmMeta(DMH_URL, DMH_TITLE, DMH_DESC);
  useJsonLd("dmh", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Digital Marketing Services",
        description: DMH_DESC,
        url: `${location.origin}${DMH_URL}`,
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: DMH_SERVICES.map(([t, s], k) => ({ "@type": "ListItem", position: k + 1, name: t, url: `${location.origin}${ppDm(s)}` })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${location.origin}/services` },
          { "@type": "ListItem", position: 3, name: "Digital Marketing", item: `${location.origin}${DMH_URL}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: DMH_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
  return (
    <div className="pp sm dk dg dmh">
      <DK_Hero
        id="dmh-h1"
        dark
        parent={["Services", "/services"]}
        crumb="Digital Marketing"
        kicker="Digital Marketing Services · Frequent Research"
        title="Digital Growth, Built Around the Business."
        tag="Turn Attention Into Action. Turn Data Into Better Decisions."
        lead="We bring strategy, creative thinking, digital technology, data and AI-assisted intelligence together — and build the marketing system around what your business needs, not around the channels that happen to be available."
        primary={["Start With the Business Objective", DMH_FORM]}
        secondary="Explore How We Operate"
        secondaryGo="dmh-eng-h"
        trust={["Business before channel", "Strategy connected to execution", "Technology-aware", "AI-assisted, human-led", "Signal over vanity"]}
      >
        <DGV_ControlRoom />
      </DK_Hero>
      <DG_Manifesto
        id="dmh-mf-h"
        kicker="Our digital marketing philosophy"
        lines={["Marketing should move the business,", "not just the metrics."]}
        sub="We understand the business. We understand the audience. We build the digital system, activate the right channels, learn from every signal — and improve what matters. Marketing is not a set of isolated services. We run it as one connected growth system."
        chain={["Business objective", "Audience", "Positioning", "Experience", "Content", "Activation", "Data", "Intelligence", "Optimisation", "Growth"]}
      />
      <DM_Strip label="Digital marketing services" caps={DMH_SERVICES.map(([t, , ic]) => [t, ic])} />
      <DG_Contrast
        id="dmh-ct-h"
        kicker="Why digital marketing needs a different approach"
        title="The Difference Is Not Another Channel. It Is How the Channel Is Connected."
        sub="A campaign can generate attention without creating momentum. The real question is not how many people saw the message — it is what the message changed."
        generic={["Channel", "Campaign", "Report"]}
        ours={["Business", "Audience", "Strategy", "Experience", "Activation", "Signal", "Intelligence", "Optimisation"]}
        note="The channel is not the strategy. It is where the strategy shows up."
      />
      <DG_Engine
        id="dmh-eng-h"
        title="Ten Parts. One System."
        sub="This is how we operate every engagement — whether you start with one service or all of them. Select a part of the engine."
        stages={[
          ["Business clarity", "flag", "We start by agreeing what the business is trying to achieve — revenue, pipeline, market entry, retention — and what success will look like."],
          ["Audience intelligence", "users", "We work out who matters, what they need, how they behave online and what actually moves them to act."],
          ["Positioning", "award", "We turn business strengths into a digital narrative that is clear, different and easy to repeat across channels."],
          ["Experience", "compass", "We shape pages, journeys and touchpoints so the next action is always obvious."],
          ["Content", "file", "We create content that is useful, relevant and discoverable — content people look for, not content we push."],
          ["Activation", "megaphone", "We put the right message on the right channel for the right audience, and keep the channels connected."],
          ["Data", "database", "We capture meaningful signals — intent, progression, conversion — rather than collecting vanity metrics."],
          ["Intelligence", "bulb", "We use AI-assisted analysis, automation and pattern recognition where they genuinely make the work better."],
          ["Optimisation", "sliders", "We improve campaigns, experiences and content based on evidence, on a steady rhythm."],
          ["Evolution", "refresh", "We keep the digital system improving as the business, the market and the audience change."],
        ]}
      />
      <DG_ValueRail
        id="dmh-val-h"
        title="What Changes for Your Business"
        sub="Every service we run is judged by what it changes — not by how much activity it produces."
        items={[
          ["Find", "The right people discover the business."],
          ["Understand", "The proposition becomes easier to grasp."],
          ["Trust", "Relevant content and experiences build credibility."],
          ["Engage", "Meaningful interaction instead of passive impressions."],
          ["Convert", "Less friction between interest and action."],
          ["Retain", "Useful communication continues after the first interaction."],
          ["Learn", "Digital behaviour turns into useful signals."],
          ["Optimise", "What works keeps getting better."],
          ["Scale", "Repeatable systems instead of one-off campaigns."],
        ]}
      />
      <DG_Need
        id="dmh-need-h"
        title="What Does the Business Need?"
        sub="We recommend capabilities according to the business problem — not every service we offer. Choose the statement closest to yours."
        options={[
          ["We need to be discovered.", [["SEO Services", "seo-services"], ["Content Marketing", "content-marketing"]], "Search is where people go when they already have a need. We build visibility around the questions and intent that matter to your business."],
          ["We need qualified attention.", [["Performance Marketing", "performance-marketing"], ["Google Ads / PPC", "google-ads-ppc"], ["Social Media Advertising", "social-media-advertising"]], "Paid reach works when audience, message, landing experience and measurement are planned together — so budget follows evidence."],
          ["We need stronger brand conversation.", [["Social Media Marketing", "social-media-marketing"], ["Influencer Marketing", "influencer-marketing"], ["Video Marketing", "video-marketing"]], "Brand momentum comes from consistent, relevant presence and real conversation — not from isolated posts."],
          ["We need to explain a complex product.", [["Content Marketing", "content-marketing"], ["Video Marketing", "video-marketing"], ["Landing Page & CRO", "landing-page-and-cro"]], "Complex offers need content that answers questions in the order people ask them, and pages that make the next step obvious."],
          ["We need better customer communication.", [["Email Marketing", "email-marketing"], ["Marketing Automation", "marketing-automation"], ["WhatsApp Marketing", "whatsapp-marketing"]], "Lifecycle communication that responds to behaviour keeps customers engaged long after the first click."],
          ["We need a connected growth system.", [["Digital Marketing Consulting", "digital-marketing-consulting"], ["Digital Marketing Audit", "digital-marketing-audit"], ["Digital Analytics & Reporting", "digital-analytics-and-reporting"]], "When the question is bigger than one channel, we start by finding the gaps and designing how the pieces should connect."],
        ]}
      />
      <RL_Services
        id="dmh-svc-h"
        title="Nineteen Services. One Way of Operating."
        sub="Choose a goal to see the services that usually matter most. Each one is run with the same business-first discipline."
        goals={DMH_GOALS}
        services={DMH_SERVICES}
      />
      <DG_OS
        id="dmh-os-h"
        title="Marketing Runs Better as an Operating System"
        sub="Marketing should operate as one connected system rather than a collection of disconnected campaigns. Every layer feeds the next."
        layers={[
          ["Strategy", "objective, priorities, budget logic"],
          ["Audience", "segments, needs, digital behaviour"],
          ["Positioning", "the story worth repeating"],
          ["Content", "useful, discoverable material"],
          ["Channels", "search, media, social, CRM"],
          ["Experience", "pages and journeys that convert"],
          ["Data", "tracking, events, signals"],
          ["AI", "analysis, automation, acceleration"],
          ["Optimisation", "evidence-led changes"],
        ]}
      />
      <DG_AiLab
        id="dmh-ai-h"
        sub="AI can accelerate the work. It cannot replace judgement. We use it where it makes analysis faster, execution sharper and learning quicker — and keep people responsible for what it means."
        ai={["Analyse", "Classify", "Summarise", "Detect anomalies", "Recommend", "Automate", "Personalise", "Predict signals"]}
        human={["Interpret", "Prioritise", "Create", "Approve", "Govern", "Decide"]}
        action={["Launch", "Learn", "Improve"]}
      />
      <DG_TechStack
        id="dmh-tech-h"
        title="The Marketing Experience Is Only as Strong as the System Underneath It"
        sub="Modern marketing runs on websites, CRMs, analytics, automation and APIs. We understand the technology layer, so campaigns don't break where the systems meet."
        layers={[
          ["Experience", [["Website", "globe"], ["Landing pages", "sliders"], ["E-commerce", "tag"]], "Where interest turns into action — fast, clear and measurable."],
          ["Engagement", [["Advertising platforms", "megaphone"], ["Content systems", "file"], ["Email", "msg"]], "Where messages reach people — consistent across every touchpoint."],
          ["Data", [["CRM", "database"], ["Analytics", "bars"], ["APIs", "layers"]], "Where signals are captured and connected — one view of the customer journey."],
          ["Intelligence", [["Automation", "refresh"], ["AI", "bulb"]], "Where patterns are found and the next step is triggered — with people in control."],
        ]}
        note="Connected systems make marketing measurable. Disconnected ones make it guesswork."
      />
      <DG_Signals
        id="dmh-sig-h"
        sub="Good marketing creates signals. Great marketing knows what to do with them. We read digital marketing as seven different kinds of signal."
        signals={[
          ["Attention", "Who noticed?", "eyeoff", 1],
          ["Intent", "Who showed interest?", "target", 2],
          ["Interaction", "What did they engage with?", "msg", 3],
          ["Behaviour", "What did they actually do?", "user", 4],
          ["Friction", "Where did they stop?", "flag", 5],
          ["Opportunity", "What deserves attention next?", "bulb", 3],
          ["Learning", "What should change?", "refresh", 2],
        ]}
      />
      <DG_Vanity
        id="dmh-vv-h"
        title="Metrics Need Context"
        sub="Impressions, likes and clicks are not useless — they are incomplete. We connect each one to the signal that tells you whether it mattered."
        pairs={[
          ["Impressions", "Qualified interest"],
          ["Reach", "Intent"],
          ["Likes", "Engagement quality"],
          ["Clicks", "Journey progression"],
          ["Followers", "Customer behaviour"],
          ["Sessions", "Conversion and retention signals"],
        ]}
        note="Activity tells you something happened. Business signals tell you whether it should happen again."
      />
      <DG_Loop
        id="dmh-loop-h"
        title="Marketing That Learns Keeps Getting Better"
        sub="Every launch starts a loop. Every signal improves the next decision. This is the rhythm we run every programme on."
        steps={["Objective", "Audience", "Idea", "Activation", "Signal", "Learning", "Optimisation", "Better experience", "Business impact"]}
      />
      <DG_Why
        id="dmh-why-h"
        title="Why Frequent Research for Digital Marketing?"
        sub="Eight reasons clients bring their marketing to us — each one about how we operate, not how much we produce."
        items={[
          ["Business before channel", "We start with the business objective rather than recommending another channel. If the answer is fewer channels done properly, we say so.", "split"],
          ["Strategy connected to execution", "Strategy doesn't disappear once execution begins. Campaigns, content, SEO, creative and optimisation stay tied to the original objective.", "bridge"],
          ["Creative + analytical thinking", "Strong marketing needs ideas that earn attention and analysis that explains what deserves more of it. We run both in the same room.", "dual"],
          ["Technology-aware marketing", "Websites, CRMs, analytics, automation and APIs sit under every campaign. We understand that layer, so the marketing works end to end.", "stack"],
          ["AI-assisted, human-led", "We use AI where it improves analysis, content workflows, automation and optimisation — and keep strategy, brand and approvals human.", "hand"],
          ["Signal over vanity", "We don't treat impressions, likes and clicks as the whole story. We focus on the signals that explain business performance.", "signal"],
          ["Connected digital ecosystem", "Search, social, media, content, CRM and analytics are run as one customer journey — not as separate line items.", "web"],
          ["Continuous improvement", "Launch is the beginning of learning, not the end of the project. Every programme runs on a review-and-improve rhythm.", "loop"],
        ]}
      />
      <DM_Faq id="dmh-faq" title="Digital Marketing at Frequent Research: Questions Clients Ask" items={DMH_FAQ} />
      <DG_Close
        id="dmh-final-h"
        title="Marketing That Learns."
        text="Digital marketing shouldn't stand still after launch. Every interaction creates information. Every signal can improve the next decision. Every improvement should make the experience more useful to the business and its customers."
        chain={["Understand", "Activate", "Measure", "Learn", "Improve", "Repeat"]}
        lines={["Understand the business.", "Earn the attention.", "Learn from the signals.", "Improve what matters."]}
        cta="Start With the Business Objective"
        formId={DMH_FORM}
        cta2="Request a Digital Marketing Audit"
        to2={ppDm("digital-marketing-audit")}
      />
      <DM_Form
        id={DMH_FORM}
        kicker="Business objective"
        title="Start With the Business Objective"
        sub="Tell us what the business is trying to achieve. We'll recommend where to start."
        type="Digital Marketing Enquiry"
        service="Digital Marketing"
        icon="compass"
        submitLabel="Send My Objective"
        successTitle="Thank you. Your digital marketing enquiry has been sent."
        msgLabel="Describe the objective (optional)"
        msgPh="What are you trying to achieve, and what feels stuck?"
        nextSteps={["We review your objective, audience and current setup.", "We contact you within one working day.", "You get a recommended starting point."]}
        chips={[
          { k: "challenge", t: "Challenge", q: "What's the challenge?", label: "Challenge", multi: true, options: ["Not visible enough", "Not reaching the right audience", "Not enough qualified leads", "Visitors don't convert", "Can't tell what's working", "Entering a new market", "Need a digital strategy", "Not sure yet"] },
          { k: "audience", t: "Audience", q: "Who are you trying to reach?", label: "Audience", options: ["Consumers", "Businesses (B2B)", "Healthcare professionals", "Both B2B and B2C", "Not sure yet"] },
          { k: "budget", t: "Budget", q: "Approximate monthly budget (optional)", label: "Monthly budget", optional: true, options: DK_BUDGET },
        ]}
      />
    </div>
  );
}

export { DMH_Page };
