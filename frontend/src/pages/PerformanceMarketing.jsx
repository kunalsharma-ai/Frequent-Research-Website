/*
 * Performance Marketing — /services/digital-marketing/performance-marketing (URL unchanged)
 * Build 34: "Campaign Flight Deck". Dark command-centre page. Structure unique to this service:
 * dark hero → spreadsheet vs system contrast → advantage (dark) → budget allocation concept → performance signals
 * → what changes (tiles) → how we operate (columns) → AI pairs → FAQ → final → form.
 * No market-research positioning, no team details, no case studies, no ROAS / CPA promises or fake dashboards.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, dmSchema, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Final, DK_Hero } from '../components/dm/kit.jsx';
import { DGV_FlightDeck, DG_Advantage, DG_AiPairs, DG_Allocate, DG_Changes, DG_Contrast, DG_Next, DG_Operate, DG_Signals } from '../components/dm/dgkit.jsx';

const PM_URL = "/services/digital-marketing/performance-marketing";
const PM_TITLE = "Performance Marketing Services | Frequent Research";
const PM_DESC = "Performance marketing run as a learning system: audience, creative, media, landing experience and conversion signals connected and optimised on evidence.";
const PM_FORM = "pm-consult";

const PM_FAQ = [
  ["What makes your performance marketing different?", "We run it as a system, not a set of campaigns. Audience, creative, channel, budget, landing experience and conversion tracking are planned together, and every change is made because a signal justified it."],
  ["Which channels do you manage?", "Search, shopping, social, video and display platforms — chosen by the objective and audience. We would rather run fewer channels well than spread budget thinly."],
  ["Can you take over campaigns that are already running?", "Yes. We start by reviewing structure, tracking, audiences, creative and spend, then stabilise what works before changing anything else."],
  ["How do you decide where budget goes?", "Budget follows evidence: the objective, conversion quality, audience fit, margins where we know them and how mature each campaign is. Allocation is reviewed on a fixed rhythm, not left to drift."],
  ["How do you use AI in performance marketing?", "AI helps detect anomalies, summarise performance, generate creative variations and support bidding. People decide budgets, audiences, messages and what the results mean."],
  ["How do you measure performance?", "Beyond clicks: conversion events, lead or order quality, cost per qualified outcome and — where data allows — revenue and customer value. Tracking is set up and checked before spend scales."],
  ["Can it connect with our CRM?", "Yes, where your CRM and ad platforms support it. Feeding lead quality back to campaigns is one of the most useful improvements most accounts can make."],
  ["Do you guarantee ROAS or leads?", "No. Results depend on the offer, market, budget and competition. We commit to disciplined testing, honest measurement and steady improvement."],
];

function PFM_Page() {
  usePageMeta("Performance Marketing Services", PM_DESC);
  dmMeta(PM_URL, PM_TITLE, PM_DESC);
  dmSchema("pfm", {
    path: PM_URL,
    crumb: "Performance Marketing",
    name: "Performance Marketing",
    serviceType: "Performance marketing",
    description: "Performance marketing as a connected system: audience strategy, creative testing, multi-channel media, budget allocation, landing-page alignment, conversion tracking, CRM feedback and AI-assisted optimisation.",
    faq: PM_FAQ,
  });
  return (
    <div className="pp sm dk dg pfm-svc">
      <DK_Hero
        id="pfm-h1"
        dark
        crumb="Performance Marketing"
        kicker="Campaign flight deck"
        title="Performance Marketing"
        tag="Don't Just Buy Reach. Build a System That Learns."
        lead="We connect audience, creative, media, landing experience and conversion signals into one performance system — then improve it on evidence, week after week."
        primary={["Build Your Performance System", PM_FORM]}
        secondary="See How We Operate"
        secondaryGo="pfm-op-h"
        trust={["Audience-first", "Creative testing", "Budget follows evidence", "Conversion tracking", "AI-assisted, human-led"]}
      >
        <DGV_FlightDeck />
      </DK_Hero>
      <DG_Contrast
        id="pfm-ct-h"
        kicker="Why performance stalls"
        title="Campaign Spreadsheets Optimise Clicks. Systems Optimise the Business."
        sub="Most accounts are tuned channel by channel. The biggest gains usually sit between the channels — in the landing page, the tracking or the lead that never got followed up."
        generic={["Campaign", "Bid", "Click", "Report"]}
        genericLabel="Campaign-by-campaign"
        ours={["Objective", "Audience", "Creative", "Channel", "Landing experience", "Conversion event", "Signal", "Optimisation"]}
        oursLabel="How we operate performance"
        note="We don't optimise for cheaper clicks. We optimise for better outcomes."
      />
      <DG_Advantage
        id="pfm-adv-h"
        style="dark"
        title="Performance Systems, Not Campaign Spreadsheets"
        claim="Every account we run has one objective, one measurement plan and one learning rhythm — across every channel and every creative."
        points={[
          ["One objective across channels", "Search, social and video work towards the same outcome instead of competing for credit."],
          ["Creative treated as a variable", "We test messages and formats on purpose, so we learn what moves people — not just what got lucky."],
          ["Landing experience in scope", "Ads and pages are planned together; a better click deserves a page that continues the promise."],
          ["Tracking checked before scaling", "Conversion events, consent and CRM feedback are verified before budget grows."],
        ]}
      />
      <DG_Allocate
        id="pfm-al-h"
        kicker="Budget logic"
        title="Budget Should Follow the Objective"
        sub="Choose an objective to see how emphasis shifts across channels. The shape changes because the job changes."
        channels={[
          ["Search", "search"],
          ["Paid social", "users"],
          ["Video", "rocket"],
          ["Retargeting", "refresh"],
          ["Display", "grid"],
        ]}
        objectives={[
          ["Capture demand", [92, 40, 22, 60, 18], "When people already search for what you sell, search usually leads — supported by retargeting for those who need a second look."],
          ["Create demand", [35, 85, 75, 40, 45], "When the audience doesn't know they need you yet, social and video do the introducing; search grows as awareness does."],
          ["Generate leads", [75, 70, 30, 55, 20], "Lead objectives balance intent from search with audience targeting on social — judged by lead quality, not volume."],
          ["Re-engage visitors", [30, 50, 25, 92, 40], "Retargeting carries the work, with messages that answer the reason people left."],
        ]}
      />
      <DG_Signals
        id="pfm-sig-h"
        kicker="Performance signals"
        title="Signals We Watch Before We Change Anything"
        sub="A spike or a dip is a question, not an answer. These are the signals we read before moving budget or creative."
        signals={[
          ["Attention", "Is the right audience seeing it?", "eyeoff", 1],
          ["Response", "Does the message earn a click?", "target", 3],
          ["Landing", "Does the page continue the promise?", "compass", 4],
          ["Conversion", "Do people take the action?", "check", 5],
          ["Quality", "Are they the right people?", "award", 3],
          ["Cost", "Is the cost sustainable?", "tag", 2],
          ["Learning", "What should we test next?", "refresh", 2],
        ]}
      />
      <DG_Changes
        id="pfm-val-h"
        style="tiles"
        title="What This Changes for Your Business"
        items={[
          ["Spend with a reason", "Budget moves because evidence says so, not because last month did.", "sliders"],
          ["Faster learning cycles", "Structured tests answer real questions within weeks.", "refresh"],
          ["Better-quality outcomes", "Leads and orders judged by fit and value, not just volume.", "award"],
          ["Connected journeys", "Ads, pages and follow-up work as one experience.", "layers"],
          ["Clearer reporting", "One view of what each channel contributes.", "bars"],
          ["Scalable execution", "A system that can grow without losing control.", "trend"],
        ]}
      />
      <DG_Operate
        id="pfm-op-h"
        style="cols"
        title="How We Operate Performance Marketing"
        items={[
          ["Measure first", "Conversion events, consent and CRM links are verified before spend scales."],
          ["Test on purpose", "Every test has a hypothesis, a success measure and a decision attached."],
          ["Review on rhythm", "Weekly signal checks, monthly allocation reviews, quarterly strategy resets."],
          ["Report what changed", "Every report ends with what we learned and what we'll do next."],
        ]}
      />
      <DG_AiPairs
        id="pfm-ai-h"
        tone="dark"
        title="AI Speeds Up the Loop. We Steer It."
        pairs={[
          ["Flags anomalies in spend, cost and conversion", "Whether it's noise or a real problem"],
          ["Generates headline and creative variations", "Which variations fit the brand and get tested"],
          ["Supports platform bidding", "Targets, limits and when to override"],
          ["Summarises performance across channels", "What the numbers mean for the business"],
          ["Highlights audiences that respond differently", "Where budget and messaging should shift"],
        ]}
      />
      <DG_Next
        id="pfm-nx-h"
        title="Where Performance Connects Next"
        links={[
          ["Google Ads / PPC", "Search campaigns inside the performance system.", "google-ads-ppc"],
          ["Social Media Advertising", "Audience-led paid social.", "social-media-advertising"],
          ["Landing Page & CRO", "Pages that continue the ad's promise.", "landing-page-and-cro"],
          ["Digital Analytics & Reporting", "Tracking and attribution that hold up.", "digital-analytics-and-reporting"],
        ]}
      />
      <DM_Faq
        id="pfm-faq"
        title="Performance Marketing: Questions Clients Ask"
        items={PM_FAQ}
        aside={
          <>
            Want more detail? Read the <PpL to="/blog/performance-marketing-guide">performance marketing guide</PpL>.
          </>
        }
      />
      <DK_Final
        id="pfm-final-h"
        sig="Build a System That Learns."
        sigText="Audience, creative, media, landing experience and signals — connected and improved on evidence."
        title="Ready to Turn Spend Into a System?"
        text="Tell us your objective, where you advertise today and what you can measure. We'll show you where the system can improve first."
        buttons={["Build Your Performance System", "Request a Digital Marketing Audit"]}
        to2={ppDm("digital-marketing-audit")}
        formId={PM_FORM}
      />
      <DM_Form
        id={PM_FORM}
        title="Build Your Performance System"
        sub="A few quick steps help us understand your goals before we talk."
        type="Performance Marketing Consultation"
        service="Performance Marketing"
        icon="trend"
        submitLabel="Build My Performance System"
        successTitle="Thank you. Your performance marketing consultation request has been sent."
        chips={[
          {
            k: "needs",
            t: "Needs",
            q: "What do you need?",
            label: "Needs",
            multi: true,
            options: [
              "Performance Marketing Strategy",
              "Paid Media Management",
              "Lead Generation",
              "E-commerce Growth",
              "B2B Demand Generation",
              "Campaign Audit",
              "Conversion Optimisation",
              "Attribution / Analytics",
              "Retargeting",
              "Full-Funnel Performance",
              "Not sure yet",
            ],
          },
          {
            k: "goal",
            t: "Goal",
            q: "Primary goal",
            label: "Primary goal",
            options: [
              "More qualified leads",
              "More sales",
              "Lower acquisition cost",
              "Better ROAS",
              "Better conversion rate",
              "More pipeline",
              "Better attribution",
              "Better marketing visibility",
              "Not sure yet",
            ],
          },
          { k: "budget", t: "Budget", q: "Approximate monthly budget", label: "Monthly budget", options: DK_BUDGET },
        ]}
      />
    </div>
  );
}

export { PFM_Page };
