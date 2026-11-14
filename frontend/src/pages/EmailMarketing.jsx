/*
 * Email Marketing — /services/digital-marketing/email-marketing (URL unchanged)
 * Build 34: "Customer Journey Orbit". Structure unique to this service:
 * hero → advantage (rule) → behaviour → next message simulator → branching drip → what changes (tiles)
 * → how we operate (numbers) → deliverability equation → AI pairs → FAQ → final → form.
 * No market-research positioning, no team details, no case studies, no open-rate or inbox guarantees.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PP_Head, PpL, dmMeta, dmSchema, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Equation, DK_Final, DK_Hero, DK_Sec } from '../components/dm/kit.jsx';
import { DGV_Orbit, DG_Advantage, DG_AiPairs, DG_Changes, DG_Next, DG_NextMessage, DG_Operate } from '../components/dm/dgkit.jsx';

const EM_URL = "/services/digital-marketing/email-marketing";

const EM_TITLE = "Email Marketing Services | Frequent Research";

const EM_FORM = "em-consult";

const EM_SEQ = ["Welcome", "Engagement signal", "Educational email", "Interest detected", "Relevant follow-up", "High intent", "Conversion message", "Nurture"];

const EM_BR = [
  ["Opens", [0, 1, 2], "Continue the journey with the next educational email."],
  ["Clicks", [0, 1, 2, 3, 4], "Increase relevance: follow up on the topic they clicked."],
  ["No engagement", [0, 1, 7], "Adjust frequency or message — or move to a lighter nurture track."],
  ["Converts", [0, 1, 2, 3, 4, 5, 6], "Move them into a post-conversion journey."],
];

function EM_Drip() {
  const [b, setB] = ee.useState(1);
  const path = EM_BR[b][1];
  return (
    <DK_Sec tone="off" className="em-dr" label="em-drip-h">
      <div className="em-dr__in">
        <div>
          <PP_Head
            k="Drip email marketing"
            id="em-drip-h"
            t="Drip Marketing That Moves With the Customer"
            s="Drip campaigns branch on behaviour instead of marching everyone through the same sequence. Pick what the customer did."
          />
          <div className="em-dr__opts" role="group" aria-label="Customer behaviour">
            {EM_BR.map(([t], k) => (
              <button key={t} type="button" aria-pressed={b === k} onClick={() => setB(k)}>
                {t}
              </button>
            ))}
          </div>
          <div className="em-dr__res" aria-live="polite" key={b}>
            <b>{EM_BR[b][0]} →</b> {EM_BR[b][2]}
          </div>
        </div>
        <ol className="em-dr__seq">
          {EM_SEQ.map((t, k) => (
            <li key={t} className={path.includes(k) ? "is-on" : "is-dim"}>
              <span>{k === 0 ? "D0" : k + 1}</span>
              {t}
              {path.includes(k) ? <em className="pp-sr"> (on this path)</em> : null}
            </li>
          ))}
        </ol>
      </div>
    </DK_Sec>
  );
}

const EM_DESC = "Email and CRM marketing that learns from behaviour: lifecycle journeys, segmentation, triggered messages and testing that make every conversation more relevant.";

const EM_FAQ = [
  ["What makes your email marketing different?", "We run email as lifecycle communication, not a send calendar. Behaviour — what people open, click, buy or ignore — decides the next message, and every journey is measured by what it moves forward."],
  ["Can you work with our existing email platform and CRM?", "Yes. We work in the platforms you already use where they support the journeys you need, and improve how the CRM, website and email tool share data."],
  ["Do you use purchased lists?", "No. We work only with permission-based, first-party contacts. It protects deliverability, your reputation and your customers' trust."],
  ["How do you use AI in email marketing?", "AI helps with subject-line ideas, content variations, segment suggestions and spotting which signals predict action or churn. People decide the journeys, the voice, the compliance and what gets sent."],
  ["How do you measure email?", "Beyond opens: clicks, replies, website actions, conversions, journey progression, retention and unsubscribes — matched to what each journey is meant to do."],
  ["Can you guarantee inbox placement?", "No one can. We improve the odds through list hygiene, consent-aware sending, authentication and engagement-based practices."],
  ["Can email work for B2B as well as e-commerce?", "Yes. B2B journeys nurture longer, multi-person decisions; e-commerce journeys handle welcome, browse, cart, post-purchase and win-back moments."],
];

function EM_Page() {
  usePageMeta("Email Marketing Services", EM_DESC);
  dmMeta(EM_URL, EM_TITLE, EM_DESC);
  dmSchema("em", {
    path: EM_URL,
    crumb: "Email Marketing",
    name: "Email Marketing",
    serviceType: "Email marketing",
    description: "Email and CRM marketing built on behaviour: lifecycle journeys, segmentation, triggered emails, newsletters, testing, deliverability practices, CRM integration, AI-assisted variation and human-led brand voice and compliance.",
    faq: EM_FAQ,
  });
  return (
    <div className="pp sm dk dg em-svc">
      <DK_Hero
        id="em-h1"
        crumb="Email Marketing"
        kicker="Customer journey orbit"
        title="Email Marketing"
        tag="Make Every Customer Conversation More Relevant."
        lead="We build email and CRM communication around what customers actually do — so the next message is decided by behaviour, not by the calendar."
        primary={["Improve Your Customer Journey", EM_FORM]}
        secondary="See How We Operate Email"
        secondaryGo="em-op-h"
        trust={["Lifecycle journeys", "Behaviour triggers", "Segmentation", "Deliverability practices", "AI-assisted, human-led"]}
      >
        <DGV_Orbit />
      </DK_Hero>
      <DG_Advantage
        id="em-adv-h"
        style="rule"
        title="Lifecycle Communication That Learns From Behaviour"
        claim="Most email programmes send the same message to everyone on the same day. We design journeys that listen — and change course when customers do."
        points={[
          ["Behaviour decides the next message", "Clicks, visits, purchases and silence each trigger a different path."],
          ["Lifecycle, not campaigns", "Welcome, onboarding, nurture, retention and win-back run as one connected journey."],
          ["Permission and deliverability first", "Only first-party, consented contacts — and sending practices that protect the inbox."],
        ]}
      />
      <DG_NextMessage
        id="em-nm-h"
        kicker="How we operate email"
        title="What Should the Next Message Be?"
        sub="Choose a customer behaviour. The next message changes because the customer did."
        rows={[
          ["Clicked the pricing page", "tag", "Questions people ask before choosing a plan", "Interest in cost is a buying signal — answer the questions that usually come next."],
          ["Opened but didn't click", "eyeoff", "A shorter version, with one clear next step", "Attention without action often means the message asked for too much."],
          ["No opens for 30 days", "clock", "A lighter check-in with a preference choice", "Silence is a signal too — reduce frequency or let them choose what they want."],
          ["Made a first purchase", "check", "Getting the most from what you bought", "The best time to build loyalty is right after the first decision."],
          ["Left items in the cart", "box", "A reminder that answers the likely objection", "Cart abandonment is usually about cost, timing or doubt — not forgetting."],
        ]}
      />
      <EM_Drip />
      <DG_Changes
        id="em-val-h"
        style="tiles"
        tone="light"
        title="What This Changes for Your Business"
        items={[
          ["More relevant communication", "Customers receive messages that fit where they are.", "msg"],
          ["Stronger customer journeys", "Every stage — from welcome to win-back — has a purpose.", "map"],
          ["Better use of customer data", "CRM and behaviour data finally drive what is sent.", "database"],
          ["Lower list fatigue", "Fewer, better messages keep people subscribed.", "users"],
          ["Repeatable revenue moments", "Onboarding, repeat purchase and renewal journeys run continuously.", "refresh"],
          ["Clearer learning", "Tests show what each segment responds to.", "flask"],
        ]}
      />
      <DG_Operate
        id="em-op-h"
        tone="off"
        title="How We Operate Email and CRM"
        items={[
          ["We map the lifecycle first", "Stages, triggers and goals are agreed before a single template is designed."],
          ["We segment by behaviour and value", "New, active, loyal and lapsed customers each get a different conversation."],
          ["We automate the predictable moments", "Welcome, onboarding, cart, post-purchase and win-back run without manual effort."],
          ["We test with a hypothesis", "Subject lines, timing, content and offers are tested to answer a question."],
          ["We protect deliverability", "List hygiene, authentication, suppression and frequency rules are part of every programme."],
          ["We report beyond opens", "Clicks, actions, conversions and journey progression decide what changes next."],
        ]}
      />
      <DK_Equation
        id="em-del-h"
        kicker="Deliverability"
        title="A Great Email Is Useless If It Doesn't Reach the Inbox"
        sub="We never promise inbox placement — we improve the odds with the practices below."
        parts={["List quality", "Consent", "Sending practices", "Authentication", "Engagement", "Content quality"]}
        result="Healthier deliverability"
      />
      <DG_AiPairs
        id="em-ai-h"
        title="AI Personalises Faster. We Keep It Relevant and Respectful."
        pairs={[
          ["Suggests subject lines and content variants", "Which versions fit the voice and get tested"],
          ["Proposes segments from behaviour patterns", "Which segments make sense for the business"],
          ["Spots signals that predict churn or purchase", "How the journey should respond"],
          ["Picks likely send times", "Frequency limits and quiet periods"],
          ["Summarises journey performance", "What to change, pause or retire"],
        ]}
      />
      <DG_Next
        id="em-nx-h"
        title="Where Email Connects Next"
        links={[
          ["Marketing Automation", "Journeys that trigger the right message.", "marketing-automation"],
          ["WhatsApp Marketing", "Consent-based conversations alongside email.", "whatsapp-marketing"],
          ["Lead Generation", "Capture the leads email will nurture.", "lead-generation"],
          ["Digital Analytics & Reporting", "Measure journey progression.", "digital-analytics-and-reporting"],
        ]}
      />
      <DM_Faq
        id="em-faq"
        title="Email Marketing: Questions Clients Ask"
        items={EM_FAQ}
        aside={
          <>
            Want more detail? Read the <PpL to="/blog/email-marketing-guide">email marketing guide</PpL>.
          </>
        }
      />
      <DK_Final
        id="em-final-h"
        sig="Make Every Customer Conversation More Relevant."
        sigText="Lifecycle journeys driven by behaviour, protected by good deliverability and improved by testing."
        title="Ready for Email That Responds to Your Customers?"
        text="Tell us about your customers, your list and the platforms you use. We'll show you which journeys to build or fix first."
        buttons={["Improve Your Customer Journey", "Request a Digital Marketing Audit"]}
        to2={ppDm("digital-marketing-audit")}
        formId={EM_FORM}
      />
      <DM_Form
        id={EM_FORM}
        kicker="Email marketing consultation"
        title="Improve Your Customer Journey"
        sub="A few quick steps — nothing intimidating."
        type="Email Marketing Consultation"
        service="Email Marketing"
        icon="msg"
        submitLabel="Improve My Customer Journey"
        successTitle="Thank you. Your email marketing request has been sent."
        msgLabel="Tell us about your requirement (optional)"
        chips={[
          {
            k: "needs",
            t: "Your need",
            q: "What are you looking to improve?",
            label: "Needs",
            multi: true,
            options: [
              "Email Strategy",
              "Email Campaigns",
              "Newsletter Marketing",
              "Lead Nurturing",
              "Drip Campaigns",
              "Email Automation",
              "B2B Email Marketing",
              "Customer Retention",
              "Re-engagement",
              "Deliverability",
              "Email Analytics",
              "Not Sure Yet",
            ],
          },
          {
            k: "market",
            t: "Market",
            q: "Country / market (optional)",
            label: "Country / market",
            multi: true,
            optional: true,
            options: ["India", "United States", "United Kingdom", "UAE / Middle East", "South-East Asia", "Europe", "Multiple / other"],
          },
          { k: "budget", t: "Budget", q: "Approximate budget", label: "Budget", options: DK_BUDGET },
        ]}
      />
    </div>
  );
}

export { EM_Page };
