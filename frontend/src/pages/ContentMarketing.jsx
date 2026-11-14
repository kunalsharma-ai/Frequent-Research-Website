/*
 * Content Marketing — /services/digital-marketing/content-marketing (URL unchanged)
 * Build 34: "Content Intelligence Map". Structure unique to this service:
 * hero → statement (dark) → question-type → format explorer → advantage (split) → content quality scorer
 * → what changes (ticks) → capabilities (accordion) → AI pairs (dark) → FAQ → final → form.
 * No market-research positioning, no team details, no case studies, no ranking or traffic promises.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PP_Head, PpL, dmMeta, dmSchema, ppDm, ppGo, ppIn } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Final, DK_Hero } from '../components/dm/kit.jsx';
import { DGV_ContentMap, DG_Accordion, DG_Advantage, DG_AiPairs, DG_Changes, DG_Formats, DG_Manifesto, DG_Next } from '../components/dm/dgkit.jsx';

const CM_URL = "/services/digital-marketing/content-marketing";

const CM_TITLE = "Content Marketing Services | Strategy & Content Creation";

const CM_FORM = "cm-consult";

const CM_DIMS = ["Audience fit", "Search intent", "Expertise", "Originality", "Readability", "Conversion value"];

const CM_LEVELS = ["Low", "Developing", "Strong", "Excellent"];

function CM_Score() {
  const [lv, setLv] = ee.useState([2, 1, 3, 1, 2, 1]);
  const [ref, v] = ppIn(0.3);
  const R = 40,
    c = 50;
  const pt = (k, r) => {
    const a = (k / CM_DIMS.length) * 2 * Math.PI - Math.PI / 2;
    return [c + r * Math.cos(a), c + r * Math.sin(a)];
  };
  const poly = lv.map((l, k) => pt(k, ((l + 1) / 4) * R).join(",")).join(" ");
  const cyc = (k) => () => setLv((x) => x.map((y, i) => (i === k ? (y + 1) % 4 : y)));
  return (
    <section ref={ref} className={"dk-sec dk-sec--light cm-score" + (v ? " is-in" : "")} aria-labelledby="cm-score-h">
      <div className="container cm-score__in">
        <div>
          <PP_Head
            k="Content score"
            id="cm-score-h"
            t="Six Questions Every Piece Should Pass"
            s="We rate content qualitatively — not with an arbitrary percentage. Tap a dimension to see how the profile changes. Our content audit uses the same lens."
          />
          <ul className="cm-score__list">
            {CM_DIMS.map((d, k) => (
              <li key={d}>
                <button type="button" onClick={cyc(k)} aria-label={`${d}: ${CM_LEVELS[lv[k]]}. Change level`}>
                  <b>{d}</b>
                  <span className={"lv lv--" + lv[k]}>{CM_LEVELS[lv[k]]}</span>
                </button>
              </li>
            ))}
          </ul>
          <a href={"#" + CM_FORM} onClick={ppGo(CM_FORM)} className="btn btn--primary pp-btn2">
            Request a Content Audit <span aria-hidden="true">→</span>
          </a>
        </div>
        <svg className="cm-score__radar" viewBox="0 0 100 100" role="img" aria-label={"Content profile: " + CM_DIMS.map((d, k) => `${d} ${CM_LEVELS[lv[k]]}`).join(", ")}>
          {[1, 2, 3, 4].map((l) => (
            <polygon key={l} className="g" points={CM_DIMS.map((_, k) => pt(k, (l / 4) * R).join(",")).join(" ")} />
          ))}
          {CM_DIMS.map((_, k) => {
            const [x, y] = pt(k, R);
            return <line key={k} x1={c} y1={c} x2={x} y2={y} className="g" />;
          })}
          <polygon className="shape" points={poly} />
          {CM_DIMS.map((d, k) => {
            const [x, y] = pt(k, R + 7);
            return (
              <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle">
                {d}
              </text>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

const CM_DESC = "Content marketing designed around questions, intent and action: articles, guides, video and email content planned as one system and measured by impact.";

const CM_FAQ = [
  ["How do you decide what content to create?", "We start from the questions your buyers ask at each stage — from search data, sales conversations, support queries and competitor gaps — then decide which questions are worth answering and in what format."],
  ["What types of content do you produce?", "Articles, guides, service and landing-page copy, comparison pages, checklists, whitepapers, social content, email content and video scripts — chosen by what the question needs."],
  ["Can you improve the content we already have?", "Yes. A content audit shows what to keep, refresh, merge or retire. Improving existing pages is often faster than publishing new ones."],
  ["How do you keep content on-brand and accurate?", "Every piece goes through editorial review for accuracy, originality, readability and brand voice before it is published."],
  ["How do you use AI in content marketing?", "AI helps cluster questions, explore topics, draft outlines, summarise sources and repurpose formats. Strategy, writing quality, fact-checking, brand voice and approval stay with people."],
  ["How do you measure content?", "By what it changes: visibility for the right questions, engaged time, return visits, sign-ups, enquiries and assisted conversions — not just page views."],
  ["How long does content take to work?", "Distributed content can work within days; search-driven content usually builds over months. We plan both so the programme isn't waiting on one channel."],
];

function CM_Page() {
  usePageMeta("Content Marketing Services", CM_DESC);
  dmMeta(CM_URL, CM_TITLE, CM_DESC);
  dmSchema("cm", {
    path: CM_URL,
    crumb: "Content Marketing",
    name: "Content Marketing",
    serviceType: "Content marketing",
    description: "Content marketing built around audience questions and intent: content strategy, topic clusters, articles and guides, video scripts, email and social content, editorial review, distribution, AI-assisted topic analysis and measurement.",
    faq: CM_FAQ,
  });
  return (
    <div className="pp sm dk dg cm-svc">
      <DK_Hero
        id="cm-h1"
        crumb="Content Marketing"
        kicker="Content intelligence map"
        title="Content Marketing"
        tag="Create Content People Actually Need."
        lead="We design content around the questions your audience asks, the intent behind them and the action that should come next — then distribute it where those people already are."
        primary={["Build Your Content Plan", CM_FORM]}
        secondary="See How We Operate Content"
        secondaryGo="cm-fm-h"
        trust={["Question-led", "Intent-mapped", "Editorial quality", "Built to travel", "AI-assisted, human-led"]}
      >
        <DGV_ContentMap />
      </DK_Hero>
      <DG_Manifesto
        id="cm-mf-h"
        tone="dark"
        kicker="How we think about content"
        lines={["More content is not", "automatically better content."]}
        sub="Content is an information system, not a publishing calendar. Every piece answers a real question, connects to the next one and moves someone closer to a decision."
        chain={["Question", "Intent", "Topic", "Format", "Distribution", "Interaction", "Learning"]}
      />
      <DG_Formats
        id="cm-fm-h"
        kicker="How we operate content"
        title="The Question Decides the Format"
        sub="Choose a type of audience question to see the formats that answer it — and where the content should travel."
        rows={[
          ["Learning questions", "How does this work?", ["Explainer guide", "Short video", "Glossary"], ["Search", "Social", "Newsletter"]],
          ["Comparison questions", "Which option suits us?", ["Comparison page", "Checklist", "Decision guide"], ["Search", "Email nurture", "Sales enablement"]],
          ["Cost questions", "What will it take?", ["Pricing factors page", "Calculator", "FAQ"], ["Search", "Landing pages", "Paid search"]],
          ["Proof questions", "Can we trust them?", ["Process pages", "Expert articles", "Customer stories"], ["Website", "LinkedIn", "Proposals"]],
          ["Next-step questions", "What happens if we go ahead?", ["Onboarding guide", "Timeline page", "Short video"], ["Email", "Landing pages", "WhatsApp"]],
        ]}
      />
      <DG_Advantage
        id="cm-adv-h"
        title="Content Designed Around Questions, Intent and Action"
        claim="We don't publish to fill a calendar. Every piece we plan answers a specific question, serves a specific stage and has a next step built in."
        points={[
          ["Question-first planning", "Topics come from what buyers ask — in search, in sales calls, in support — not from a brainstorm."],
          ["One insight, many formats", "A strong idea becomes an article, a video, a carousel and an email without starting again."],
          ["Editorial standards", "Accuracy, originality and readability are checked before anything goes live."],
          ["Measured by contribution", "We track what content changes — visibility, engagement, enquiries — not just views."],
        ]}
      />
      <CM_Score />
      <DG_Changes
        id="cm-val-h"
        style="ticks"
        title="What This Changes for Your Business"
        items={[
          ["Easier to understand", "Complex offers explained in the order people need them.", "bulb"],
          ["Easier to find", "Content that ranks and gets shared for the right questions.", "search"],
          ["Easier to trust", "Useful, accurate content that builds credibility before a sales call.", "shield"],
          ["Shorter sales conversations", "Buyers arrive with their basic questions already answered.", "msg"],
          ["Content that keeps working", "A library that compounds instead of expiring after a week.", "trend"],
          ["Less wasted effort", "Fewer pieces, each with a clear job.", "check"],
        ]}
      />
      <DG_Accordion
        id="cm-cap-h"
        title="What We Do in Content Marketing"
        sub="Open a capability to see what it changes."
        items={[
          ["Content strategy", "We decide which questions are worth answering, for whom and in which order.", ["Audience questions", "Journey mapping", "Topic clusters", "Editorial plan"]],
          ["Articles and guides", "We write long-form content that answers the question better than the alternatives.", ["Pillar pages", "How-to guides", "Comparisons", "Explainers"]],
          ["Website and landing content", "We write pages that help people decide and make the next step obvious.", ["Service pages", "Landing pages", "FAQs"]],
          ["Video and visual content", "We turn key ideas into formats people watch and share.", ["Scripts", "Storyboards", "Infographics", "Carousels"]],
          ["Email and social content", "We extend each idea across the channels that keep the conversation going.", ["Newsletters", "Nurture emails", "Social posts"]],
          ["Audits and refreshes", "We improve what already exists before adding more.", ["Content audit", "Refresh", "Consolidation", "Retirement"]],
          ["Distribution and measurement", "We make sure content reaches people and show what it changes.", ["Distribution plan", "Search visibility", "Engagement", "Assisted conversions"]],
        ]}
      />
      <DG_AiPairs
        id="cm-ai-h"
        tone="dark"
        title="AI Accelerates the Groundwork. People Own the Quality."
        pairs={[
          ["Clusters audience questions into themes", "Which questions deserve content"],
          ["Summarises sources and competing coverage", "What angle makes ours more useful"],
          ["Drafts outlines and first versions", "What's written, edited and fact-checked"],
          ["Repurposes long content into other formats", "What fits each channel and the brand voice"],
          ["Finds which pieces contribute", "What to expand, refresh or retire"],
        ]}
      />
      <DG_Next
        id="cm-nx-h"
        title="Where Content Connects Next"
        links={[
          ["SEO Services", "Get the content found for the right questions.", "seo-services"],
          ["Email Marketing", "Keep the conversation going after the first read.", "email-marketing"],
          ["Video Marketing", "Turn key ideas into video.", "video-marketing"],
          ["Landing Page & CRO", "Pages that help readers decide.", "landing-page-and-cro"],
        ]}
      />
      <DM_Faq
        id="cm-faq"
        title="Content Marketing: Questions Clients Ask"
        items={CM_FAQ}
        aside={
          <>
            Want more detail? Read the <PpL to="/blog/content-marketing-guide">content marketing guide</PpL>.
          </>
        }
      />
      <DK_Final
        id="cm-final-h"
        sig="Create Content People Actually Need."
        sigText="Question-led, intent-mapped and measured by what it changes."
        title="Ready to Build Content That Earns Its Place?"
        text="Tell us who you want to reach and what they need to understand. We'll show you which questions to answer first."
        buttons={["Build Your Content Plan", "Request a Digital Marketing Audit"]}
        to2={ppDm("digital-marketing-audit")}
        formId={CM_FORM}
      />
      <DM_Form
        id={CM_FORM}
        title="Build Your Content Plan"
        sub="A few quick steps help us understand your goals before we talk."
        type="Content Marketing Consultation"
        service="Content Marketing"
        icon="file"
        submitLabel="Build My Content Plan"
        successTitle="Thank you. Your content marketing consultation request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need?",
            label: "Needs",
            multi: true,
            options: [
              "Content Strategy",
              "SEO Content",
              "Blog & Article Creation",
              "Thought Leadership",
              "Customer Stories",
              "Whitepapers / Reports",
              "Social Content",
              "Video Content",
              "Content Audit",
              "Content Repurposing",
              "Not sure yet",
            ],
          },
          {
            k: "goal",
            t: "Objective",
            q: "Primary objective",
            label: "Primary objective",
            options: ["More qualified leads", "Organic visibility", "Brand authority", "Thought leadership", "Website engagement", "Sales enablement", "Content consistency", "Not sure yet"],
          },
          { k: "budget", t: "Budget", q: "Approximate monthly budget", label: "Monthly budget", options: DK_BUDGET },
        ]}
      />
    </div>
  );
}

export { CM_Page };
