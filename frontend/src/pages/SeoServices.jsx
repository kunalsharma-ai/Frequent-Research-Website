/*
 * SEO Services — /services/digital-marketing/seo-services (URL unchanged)
 * Build 34: "Search Landscape". Editorial, light page. Structure unique to this service:
 * hero → statement → advantage (split) → intent cluster explorer → what changes (ribbons) → capabilities (accordion)
 * → AI pairs → how we operate (numbers) → FAQ → final → form.
 * No market-research positioning, no team details, no case studies, no ranking promises or fake positions.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, dmSchema, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Final, DK_Hero } from '../components/dm/kit.jsx';
import { DGV_Search, DG_Accordion, DG_Advantage, DG_AiPairs, DG_Changes, DG_Clusters, DG_Manifesto, DG_Next, DG_Operate } from '../components/dm/dgkit.jsx';

const SO_URL = "/services/digital-marketing/seo-services";
const SO_TITLE = "SEO Services | Frequent Research";
const SO_DESC = "SEO services built around search intent, useful content, technical health and authority — so the right people find your business and know what to do next.";
const SO_FORM = "seo-consult";

const SO_FAQ = [
  ["How is your SEO different from keyword-ranking SEO?", "We build visibility around the questions, intent and decisions that matter to the business. Rankings are one input; the real measure is whether search brings people who engage, enquire and buy."],
  ["Can you work with our existing website and CMS?", "Yes. Most SEO work happens on the site you already have — structure, content, technical fixes, internal linking and metadata. If the platform itself limits search performance, we explain why and what the options are."],
  ["How do you approach technical SEO?", "We look at crawlability, indexing, site structure, page speed, mobile experience, structured data and redirects, and fix what genuinely blocks visibility first."],
  ["Do you write the content as well?", "Yes. We plan and produce content around search intent — guides, service pages, comparisons and answers — and improve the content you already have."],
  ["How do you use AI in SEO?", "AI helps us cluster queries, find content gaps, analyse SERP changes and draft outlines faster. People decide the strategy, write and review the content, and check every fact."],
  ["How do you measure SEO?", "Visibility for the queries that matter, qualified organic sessions, engagement, enquiries and assisted conversions — reported against the business objective, not just positions."],
  ["How long does SEO take?", "It depends on the site's starting point, competition and how quickly changes go live. Technical fixes can show effects sooner; content and authority build over months."],
  ["Do you guarantee rankings?", "No. Search engines decide rankings, and no responsible provider can promise a position. We commit to clear priorities, solid foundations and honest reporting."],
];

function SO_Page() {
  usePageMeta("SEO Services", SO_DESC);
  dmMeta(SO_URL, SO_TITLE, SO_DESC);
  dmSchema("so", {
    path: SO_URL,
    crumb: "SEO Services",
    name: "SEO Services",
    serviceType: "Search engine optimisation",
    description: "SEO built around search intent: technical SEO, on-page and content SEO, topic clusters, local and B2B search, authority building, AI-assisted search analysis and measurement against business outcomes.",
    faq: SO_FAQ,
  });
  return (
    <div className="pp sm dk dg so-svc">
      <DK_Hero
        id="so-h1"
        crumb="SEO Services"
        kicker="Search landscape"
        title="SEO Services"
        tag="Be Found for the Things That Matter."
        lead="We build search visibility around the questions, intent and decisions that matter to your business — so search sends people who are ready to learn, compare or act, not just more traffic."
        primary={["Discuss Your Search Strategy", SO_FORM]}
        secondary="See How We Operate SEO"
        secondaryGo="so-op-h"
        trust={["Intent-led", "Technical foundations", "Content that answers", "Authority", "AI-assisted, human-led"]}
      >
        <DGV_Search />
      </DK_Hero>
      <DG_Manifesto
        id="so-mf-h"
        tone="off"
        kicker="How we think about search"
        lines={["More traffic isn't the goal.", "Better-matched traffic is."]}
        sub="A ranking is only useful if the right person clicks, finds the answer and knows what to do next. We treat search as a landscape of intent — and build every page, fix and link around it."
      />
      <DG_Advantage
        id="so-adv-h"
        title="Search Intelligence, Not Just Keyword Rankings"
        claim="We don't start with a keyword list. We start with what your buyers are trying to work out — and build the content, structure and technical health that answer it."
        points={[
          ["Intent before volume", "We prioritise queries by what the searcher is trying to do and what that means for the business, not by search volume alone."],
          ["Content and technical, together", "Content plans and technical fixes run as one programme, so good pages are never hidden by crawl or speed problems."],
          ["Built for how search is changing", "Clear answers, structured content and strong entities help visibility across classic results and AI-assisted search surfaces."],
          ["Measured by what search changes", "Reports show qualified visits, engagement and enquiries alongside visibility — so you can see what SEO contributes."],
        ]}
      />
      <DG_Clusters
        id="so-cl-h"
        kicker="AI-assisted intent mapping"
        title="One Question. A Whole Cluster of Intent."
        sub="We use AI-assisted clustering to group how people search, then decide which page should answer each group. Choose an intent to see how one cluster comes together."
        clusters={[
          ["Learn", "How does it work?", ["What is it for?", "Key terms explained", "Common mistakes", "Step-by-step guide", "Checklist"]],
          ["Compare", "Which option suits us?", ["Option A vs option B", "Pros and cons", "Cost factors", "Questions to ask", "Alternatives"]],
          ["Decide", "Who should we choose?", ["Provider for my industry", "Pricing and scope", "Reviews and proof", "Request a quote", "Book a call"]],
        ]}
      />
      <DG_Changes
        id="so-val-h"
        style="ribbons"
        title="What This Changes for Your Business"
        items={[
          ["Better discoverability", "Your business appears for the questions buyers actually ask.", "search"],
          ["Better-matched visitors", "Organic traffic that fits what you sell and who you sell to.", "target"],
          ["Clearer positioning", "Pages that explain the offer in the language people search with.", "award"],
          ["Stronger foundations", "A site search engines can crawl, understand and trust.", "cpu"],
          ["Compounding value", "Content and authority that keep working after they are published.", "trend"],
        ]}
      />
      <DG_Accordion
        id="so-cap-h"
        title="What We Do in SEO"
        sub="Each capability exists for a reason. Open one to see what it changes."
        items={[
          ["Search intent and keyword intelligence", "We map queries to intent and business value, so effort goes where it can change outcomes.", ["Query clustering", "Intent mapping", "Opportunity sizing", "Competitor gap analysis"]],
          ["Technical SEO", "We remove what stops search engines from finding, reading and trusting the site.", ["Crawl and indexing", "Site structure", "Page speed and Core Web Vitals", "Structured data", "Redirects"]],
          ["On-page and content SEO", "We build and improve pages that answer the question better than the alternatives.", ["Service and category pages", "Guides and comparisons", "Content refresh", "Internal linking"]],
          ["Local and B2B search", "We make sure the business is visible where location or buying role matters.", ["Business profiles", "Location pages", "Decision-maker content", "Industry pages"]],
          ["Authority building", "We earn credibility signals through content worth referencing and genuine digital PR.", ["Linkable assets", "Digital PR", "Mentions", "Partnership content"]],
          ["Search for AI-assisted discovery", "We structure content so it can be understood and cited by AI-assisted search experiences.", ["Clear answers", "Entity consistency", "FAQ structure", "Schema"]],
          ["Measurement", "We connect search activity to what happens next on the site.", ["Search Console", "GA4 events", "Assisted conversions", "Monthly insight reports"]],
        ]}
      />
      <DG_AiPairs
        id="so-ai-h"
        title="Where AI Helps in Search — and Where We Decide"
        pairs={[
          ["Clusters thousands of queries by meaning", "Which clusters matter to the business"],
          ["Finds content gaps against competing pages", "What we should create, merge or retire"],
          ["Spots SERP and visibility changes early", "Whether a change needs action"],
          ["Drafts outlines and metadata variations", "What we publish, after editing and fact-checking"],
          ["Summarises technical audit findings", "Which fixes come first"],
        ]}
      />
      <DG_Operate
        id="so-op-h"
        title="How We Operate SEO"
        sub="Not a checklist — a working rhythm."
        items={[
          ["We prioritise by business value", "Every recommendation is ranked by what it could change for the business, not by how easy it is to report."],
          ["We fix foundations before scaling content", "Publishing more on a site search engines struggle to read is wasted effort."],
          ["We write for people first", "Pages are built to answer the question clearly — search engines reward the same thing."],
          ["We protect what already works", "Redesigns and migrations get URL mapping, redirects and monitoring so visibility isn't lost."],
          ["We review on a fixed rhythm", "Monthly reviews of visibility, engagement and enquiries decide what changes next."],
          ["We connect search to the rest of marketing", "Search insight feeds content, paid search, landing pages and analytics."],
        ]}
      />
      <DG_Next
        id="so-nx-h"
        title="Where Search Connects Next"
        links={[
          ["Content Marketing", "Content built around the intent we find.", "content-marketing"],
          ["Landing Page & CRO", "Turn search visits into action.", "landing-page-and-cro"],
          ["Google Ads / PPC", "Share intent data across paid and organic search.", "google-ads-ppc"],
          ["Digital Analytics & Reporting", "Measure what search contributes.", "digital-analytics-and-reporting"],
        ]}
      />
      <DM_Faq
        id="so-faq"
        title="SEO Services: Questions Clients Ask"
        items={SO_FAQ}
        aside={
          <>
            Want more detail? Read the <PpL to="/blog/seo-services-guide">SEO services guide</PpL>.
          </>
        }
      />
      <DK_Final
        id="so-final-h"
        sig="Be Found for the Things That Matter."
        sigText="Search visibility built around intent, content, technical health and authority — measured by what it changes."
        title="Ready to Make Search Work for the Business?"
        text="Tell us what you sell, who you want to reach and how the site performs today. We'll show you where search can make the biggest difference first."
        buttons={["Discuss Your Search Strategy", "Request a Digital Marketing Audit"]}
        to2={ppDm("digital-marketing-audit")}
        formId={SO_FORM}
      />
      <DM_Form
            id={SO_FORM}
            kicker="SEO consultation"
            title="Discuss Your Search Strategy"
            sub="A few quick questions help us understand where search can make the biggest difference."
            type="SEO Consultation"
            service="SEO Services"
            icon="search"
            submitLabel="Discuss My Search Strategy"
            successTitle="Thank you. Your SEO consultation request has been sent."
            msgLabel="Anything else we should know? (optional)"
            nextSteps={["We review your website and search visibility.", "We contact you within one working day.", "You get clear, practical recommendations."]}
            chips={[
              { k: "goals", t: "Goals", q: "What are you looking to improve?", label: "Goals", multi: true, options: ["More qualified organic traffic", "More enquiries from search", "Local visibility", "B2B search visibility", "Technical SEO", "Content strategy", "SEO audit", "Not sure yet"] },
              { k: "audience", t: "Audience", q: "Who are you trying to reach?", label: "Audience", options: ["Consumers", "Businesses (B2B)", "Healthcare professionals", "Both B2B and B2C", "Not sure yet"] },
              { k: "budget", t: "Budget", q: "Approximate monthly marketing budget (optional)", label: "Monthly budget", optional: true, options: DK_BUDGET },
            ]}
          />
    </div>
  );
}

export { SO_Page };
