/*
 * Social Media Marketing — /services/digital-marketing/social-media-marketing (URL unchanged)
 * Build 34: "Conversation Constellation". Structure unique to this service:
 * hero → advantage (rule) → spikes vs momentum chart → content pillars & weekly rhythm → what changes (split)
 * → how we operate (quotes) → AI pairs → FAQ → final → form.
 * No market-research positioning, no team details, no case studies, no follower or engagement promises.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PP_Head, PpI, PpL, dmMeta, dmSchema, ppDm, ppIn } from '../components/dm/shared.jsx';
import { DK_Final, DK_Hero } from '../components/dm/kit.jsx';
import { DGV_Constellation, DG_Advantage, DG_AiPairs, DG_Changes, DG_Momentum, DG_Next, DG_Operate } from '../components/dm/dgkit.jsx';

const SM_URL = "/services/digital-marketing/social-media-marketing";

const SM_TITLE = "Social Media Marketing Services | Frequent Research";

const SM_PILLARS = [
  ["Educate", "bulb", ["Industry insights", "How-to content", "Explainers"]],
  ["Prove", "award", ["Customer stories", "Proof points", "Expertise", "Insights"]],
  ["Engage", "msg", ["Questions", "Polls", "Discussions", "Community content"]],
  ["Humanise", "users", ["People", "Culture", "Behind-the-scenes"]],
  ["Convert", "target", ["Offers", "Services", "Products", "Lead magnets", "Consultations"]],
];

const SM_WEEK = [
  ["Mon", "Insight", ["Data point", "Trend note", "Quick stat explainer"]],
  ["Tue", "Educational", ["How-to carousel", "Explainer video", "Checklist"]],
  ["Wed", "Community", ["Question post", "Poll", "Reply round-up"]],
  ["Thu", "Thought leadership", ["Point of view", "Expert commentary", "Article"]],
  ["Fri", "Conversion", ["Service spotlight", "Lead magnet", "Consultation invite"]],
];

const SM_APPROACH = ["Business objective", "Audience need", "Content idea", "Creative format", "Platform", "Distribution", "Audience response", "Learning"];

function SM_Pillars() {
  const [day, setDay] = ee.useState(0);
  const [ref, v] = ppIn(0.2);
  return (
    <section ref={ref} className={"sm-pil" + (v ? " is-in" : "")} aria-labelledby="sm-pil-h">
      <div className="container">
        <PP_Head
          k="Content pillars"
          id="sm-pil-h"
          t="Five Pillars. One Consistent Story."
          s="The right content mix depends on your strategy — these pillars are the building blocks we balance for each client."
        />
        <div className="sm-pil__grid pp-swipe">
          {SM_PILLARS.map(([t, ic, items], k) => (
            <article key={t} className="sm-pil__c" style={{ "--k": k }} tabIndex={0}>
              <span>
                <PpI n={ic} s={20} />
              </span>
              <h3>{t}</h3>
              <ul>
                {items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="sm-cal">
          <div className="sm-cal__head">
            <h3>A weekly content rhythm</h3>
            <p>A framework to show how pillars work together — not a promised publishing schedule.</p>
          </div>
          <div className="sm-cal__days" role="tablist" aria-label="Weekly rhythm">
            {SM_WEEK.map(([d, t], k) => (
              <button
                key={d}
                type="button"
                role="tab"
                aria-selected={day === k}
                className={day === k ? "is-on" : ""}
                onMouseEnter={() => setDay(k)}
                onFocus={() => setDay(k)}
                onClick={() => setDay(k)}
              >
                <small>{d}</small>
                <b>{t}</b>
              </button>
            ))}
          </div>
          <div className="sm-cal__pane" role="tabpanel" key={day}>
            {SM_WEEK[day][2].map((x, k) => (
              <span key={x} style={{ "--k": k }}>
                {x}
              </span>
            ))}
          </div>
        </div>
        <div className="sm-appr">
          <h3>How every piece of content is decided</h3>
          <ol>
            {SM_APPROACH.map((t, k) => (
              <li key={t} style={{ "--k": k }}>
                {t}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

const SM_NEEDS = [
  "Social media strategy",
  "Social media management",
  "Content creation",
  "Social media advertising",
  "Paid social",
  "Influencer marketing",
  "Community management",
  "Social media audit",
  "Not sure yet",
];

const SM_GOALS = ["Brand awareness", "Engagement", "More leads", "More sales", "Community growth", "Thought leadership", "Not sure yet"];

const SM_BUDGET = ["Not decided", "Under ₹50,000", "₹50,000–₹2 lakh", "₹2–5 lakh", "₹5 lakh+"];

const SM_DESC = "Social media marketing that builds brand momentum: clear positioning, content pillars, community and conversation — run as a connected, measurable system.";

const SM_FAQ = [
  ["What makes your social media marketing different?", "We run social to build brand momentum, not to fill a calendar. Every post has a role — educate, prove, engage, humanise or convert — and what the audience responds to decides what we make next."],
  ["Which platforms should we be on?", "The ones where your audience spends attention and where your objective fits. Most businesses do better on one or two priority platforms run properly than on every platform at once."],
  ["Do you create the content as well?", "Yes — content strategy, copy, design, short video and community management, built around your brand voice."],
  ["Can you work with our in-house marketing or design people?", "Yes. We can lead strategy and let your people produce, produce to your strategy, or run everything end to end."],
  ["How do you use AI in social media?", "AI helps us find themes in conversations, spot formats that hold attention, draft variations and summarise performance. Brand voice, cultural judgement, replies and what gets published stay with people."],
  ["How do you measure social media?", "Against the objective: reach and engagement quality for awareness, conversation and community health for engagement, and visits, enquiries or sales where tracking allows."],
  ["Will social media increase our sales?", "It can contribute to awareness, consideration, enquiries and sales, but outcomes depend on the offer, audience, budget and the wider journey. We don't promise follower counts or sales figures."],
];

function SMM_Page() {
  usePageMeta("Social Media Marketing Services", SM_DESC);
  dmMeta(SM_URL, SM_TITLE, SM_DESC);
  dmSchema("smm", {
    path: SM_URL,
    crumb: "Social Media Marketing",
    name: "Social Media Marketing",
    serviceType: "Social media marketing",
    description: "Social media marketing built for brand momentum: social strategy, content pillars, creative and short video, community management, social listening, paid amplification, AI-assisted analysis and reporting.",
    faq: SM_FAQ,
  });
  return (
    <div className="pp sm dk dg smm-svc">
      <DK_Hero
        id="sm-h1"
        crumb="Social Media Marketing"
        kicker="Conversation constellation"
        title="Social Media Marketing"
        tag="Turn Social Attention Into Brand Momentum."
        lead="We build social presence around what your brand stands for and what your audience responds to — so every post, reply and conversation adds to momentum instead of disappearing in the feed."
        primary={["Build Your Social Strategy", "sm-consult"]}
        secondary="See How We Operate Social"
        secondaryGo="sm-op-h"
        trust={["Brand-led", "Content pillars", "Community", "Short-form video", "AI-assisted, human-led"]}
      >
        <DGV_Constellation />
      </DK_Hero>
      <DG_Advantage
        id="sm-adv-h"
        style="rule"
        title="Social Strategy Built Around Brand Momentum"
        claim="Posting consistently is not a strategy. We give every piece of content a job, connect it to the brand story and let audience response decide what comes next."
        points={[
          ["Every post has a role", "Educate, prove, engage, humanise or convert — the mix is planned, not improvised."],
          ["Conversation counts", "Comments, replies and shares are treated as signals that shape the next idea."],
          ["One brand, every platform", "Voice and visual identity stay consistent while formats adapt to each platform."],
        ]}
      />
      <DG_Momentum
        id="sm-mo-h"
        kicker="Spikes vs momentum"
        title="One Viral Post Is a Spike. Momentum Is a Pattern."
        sub="Switch between the two patterns. We plan for the line that keeps rising."
        notes={[
          "Campaign spikes: bursts of attention that fall back to the baseline because nothing connects one post to the next.",
          "Brand momentum: consistent, recognisable content and real conversation that compound — each post makes the next one easier to notice.",
        ]}
      />
      <SM_Pillars />
      <DG_Changes
        id="sm-val-h"
        style="split"
        title="What This Changes for Your Business"
        items={[
          ["A brand people recognise", "Consistent voice and visuals make the business easier to remember."],
          ["Conversations, not broadcasts", "Comments and messages become relationships — and useful feedback."],
          ["Content with a purpose", "Every post supports a business objective, from awareness to enquiries."],
          ["Steadier growth", "Momentum builds over months instead of resetting after every campaign."],
        ]}
      />
      <DG_Operate
        id="sm-op-h"
        style="quotes"
        tone="off"
        title="How We Operate Social Media"
        items={[
          ["We plan pillars before posts.", "A small set of content pillars keeps the brand focused and the calendar honest."],
          ["We listen before we publish more.", "What people ask, share and complain about shapes the next round of content."],
          ["We reply like a person.", "Community management is handled with brand voice, care and clear escalation."],
          ["We test formats, not just captions.", "Short video, carousels and live sessions are tested against the objective."],
          ["We amplify what earns it.", "Paid support goes behind content that has already proven it resonates."],
          ["We report what changed.", "Monthly reviews show what grew, what didn't and what we'll do differently."],
        ]}
      />
      <DG_AiPairs
        id="sm-ai-h"
        title="AI Finds the Patterns. We Keep the Brand Human."
        pairs={[
          ["Groups comments and mentions into themes", "Which themes deserve content or a response"],
          ["Spots formats and topics that hold attention", "What fits the brand and the moment"],
          ["Drafts caption and hook variations", "What gets published, in our voice"],
          ["Flags unusual spikes in conversation", "Whether to respond, escalate or wait"],
          ["Summarises performance across platforms", "What it means for the next month's plan"],
        ]}
      />
      <DG_Next
        id="sm-nx-h"
        title="Where Social Connects Next"
        links={[
          ["Social Media Advertising", "Amplify what organic social proves.", "social-media-advertising"],
          ["Influencer Marketing", "Creators chosen by audience fit.", "influencer-marketing"],
          ["Video Marketing", "Short-form video built for attention.", "video-marketing"],
          ["Online Reputation Management", "Listen to and act on what people say.", "online-reputation-management"],
        ]}
      />
      <DM_Faq
        id="sm-faq"
        title="Social Media Marketing: Questions Clients Ask"
        items={SM_FAQ}
        aside={
          <>
            Want more detail? Read the <PpL to="/blog/social-media-marketing-guide">social media marketing guide</PpL>.
          </>
        }
      />
      <DK_Final
        id="sm-final-h"
        sig="Turn Social Attention Into Brand Momentum."
        sigText="Brand-led content, real conversation and steady learning — on the platforms that matter to your audience."
        title="Ready to Build Momentum, Not Just Posts?"
        text="Tell us about your brand, your audience and the platforms you use today. We'll show you where social can do more for the business."
        buttons={["Build Your Social Strategy", "Request a Digital Marketing Audit"]}
        to2={ppDm("digital-marketing-audit")}
        formId="sm-consult"
      />
      <DM_Form
        id="sm-consult"
        title="Build Your Social Strategy"
        sub="A few quick steps help us understand your goals before we talk."
        type="Social Media Marketing Consultation"
        service="Social Media Marketing"
        icon="users"
        submitLabel="Build My Social Strategy"
        successTitle="Thank you. Your social media consultation request has been sent."
        chips={[
          { k: "needs", t: "Needs", q: "What do you need?", label: "Needs", multi: true, options: SM_NEEDS },
          { k: "goal", t: "Goal", q: "What's your primary goal?", label: "Primary goal", options: SM_GOALS },
          { k: "budget", t: "Budget", q: "Approximate monthly budget", label: "Monthly budget", options: SM_BUDGET },
        ]}
      />
    </div>
  );
}

export { SMM_Page };
