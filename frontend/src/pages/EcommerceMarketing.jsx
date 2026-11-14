/*
 * E-commerce Marketing — /services/digital-marketing/e-commerce-marketing (URL unchanged)
 * Page (build 32; research positioning removed in build 34) on RL_Page. USP: the customer journey beyond the click —
 * Discover → Consider → Product → Cart → Checkout → Purchase → Repeat. Hero visual: HV_Commerce.
 * Kept: EC_Waterfall (profitability shapes), product-page anatomy, checkout leak, retention flow, guide.
 * No case study, no team details, no platform partnerships, no invented numbers or uplift promises.
 */
import * as ee from 'react';
import { DM_Form, PP_Head, PpL, ppDm } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Flow, DK_Leak, DK_Sec } from '../components/dm/kit.jsx';
import { DK_Anatomy } from '../components/dm/kit2.jsx';
import { RL_Page } from '../components/dm/kit4.jsx';
import { HV_Commerce } from '../components/dm/heroes.jsx';

const EC_URL = "/services/digital-marketing/e-commerce-marketing";

const EC_TITLE = "E-commerce Marketing Services | Frequent Research";

const EC_FORM = "ec-consult";

function EC_Waterfall() {
  const bars = [
    ["Revenue", "rev", 100, 0],
    ["Advertising", "cost", 18, 82],
    ["Discounts", "cost", 12, 70],
    ["Fulfilment", "cost", 16, 54],
    ["Returns", "cost", 9, 45],
    ["Commercial reality", "res", 45, 0],
  ];
  return (
    <DK_Sec tone="off" className="ec-wf" label="ec-wf-h">
      <div className="ec-wf__in">
        <div>
          <PP_Head
            k="Profitability, not just revenue"
            id="ec-wf-h"
            t="Revenue Is Only Part of the Story"
            s="Where the data is available, marketing decisions are judged against the real economics: revenue minus advertising, discounts, fulfilment and returns."
          />
          <p className="dk-note">Shapes only — no real figures.</p>
        </div>
        <ol
          className="ec-wf__ch"
          role="img"
          aria-label="Waterfall chart shape: revenue, reduced by advertising, discounts, fulfilment and returns, leaves the commercial reality. Bar sizes are shapes only, not figures."
        >
          {bars.map(([t, c, h, b], k) => (
            <li key={t} className={c} style={{ "--h": h, "--b": b, "--k": k }}>
              <i />
              <span>{t}</span>
            </li>
          ))}
        </ol>
      </div>
    </DK_Sec>
  );
}

const EC_FAQ = [
  ["What is e-commerce marketing?", "E-commerce marketing brings the right shoppers to an online store, helps them find and choose products, removes friction to purchase and encourages them to come back — across search, shopping, social, email, WhatsApp and the store itself."],
  ["How is your approach to e-commerce different?", "It looks at the whole customer journey, not just the click: segments, category understanding, product discovery, purchase barriers, behaviour, conversion signals and repeat purchase. Decisions are judged against the real economics where data allows."],
  ["What does an e-commerce marketing service include?", "Depending on your needs: strategy, e-commerce SEO, shopping and search ads, product feed optimisation, social advertising, product page and checkout optimisation, email and WhatsApp retention, analytics and reporting."],
  ["Which platforms do you work with?", "Common store platforms such as Shopify, WooCommerce and Magento, and marketplaces where relevant. No official platform partnerships are claimed."],
  ["Can you guarantee more sales?", "No. Sales depend on product, pricing, competition, stock, budget and the store experience. The work improves the evidence behind every decision; outcomes are never guaranteed."],
  ["How does AI support e-commerce marketing?", "AI can help with product description drafts, feed enrichment, segmentation, behaviour pattern detection and performance summaries. People decide pricing, offers, brand presentation and what goes live."],
  ["How do you measure e-commerce marketing?", "Beyond revenue: conversion by stage, average order value, repeat purchase, customer value and — where data allows — contribution after advertising, discounts, fulfilment and returns."],
];

const EC_CFG = {
  key: "ec",
  pfx: "ec",
  url: EC_URL,
  title: EC_TITLE,
  maTitle: "E-commerce Marketing Services",
  desc: "E-commerce marketing that follows the customer beyond the click: product discovery, purchase barriers, checkout friction, retention and repeat purchase.",
  crumb: "E-commerce Marketing",
  name: "E-commerce Marketing",
  serviceType: "E-commerce marketing",
  schemaDesc:
    "E-commerce marketing: shopper segmentation, category understanding, product discovery, e-commerce SEO, shopping and social ads, product feeds, product page and checkout optimisation, retention journeys, AI-assisted analysis and profitability-aware measurement.",
  formId: EC_FORM,
  hero: {
    kicker: "Journey-led e-commerce",
    h1: "E-commerce Marketing",
    tag: "E-commerce Marketing That Understands the Customer Journey Beyond the Click.",
    lead: "Traffic is only the start. Shoppers discover, compare, hesitate, add to cart, abandon, return and buy again — and every step leaves signals. E-commerce marketing works when the whole journey is understood and improved, not just the ad.",
    cta: "Improve Your Store's Customer Journey",
    cta2: "Request a Digital Marketing Audit",
    cta2To: "/services/digital-marketing/digital-marketing-audit",
    trust: ["Product discovery", "Checkout friction", "Retention", "Profitability-aware", "AI-assisted, human-led"],
    vis: <HV_Commerce />,
  },
  statement: ["A click is a visit. A journey is a customer.", ["Discover", "Consider", "Product", "Cart", "Checkout", "Purchase", "Repeat"]],
  caps: [
    ["E-commerce Strategy", "compass"],
    ["E-commerce SEO", "search"],
    ["Shopping & Search Ads", "tag"],
    ["Product Feeds", "database"],
    ["Social Advertising", "megaphone"],
    ["Product Page & Checkout", "box"],
    ["Retention Journeys", "refresh"],
    ["Analytics", "bars"],
  ],
  problem: {
    title: "When Traffic Grows but the Store Doesn't",
    sub: "Most online stores don't lack visitors. They lose them somewhere between discovery and repeat purchase.",
    items: [
      ["Traffic without buyers", "Visits from people who were never going to purchase.", "users"],
      ["Products hard to find", "Weak search, categories and feeds hide the right product.", "search"],
      ["Product pages that don't convince", "Questions left unanswered at the decision point.", "file"],
      ["Checkout friction", "Unexpected costs, long forms and trust concerns.", "box"],
      ["One-time customers", "No reason or journey to buy again.", "refresh"],
      ["Revenue without margin", "Sales reported; ad, discount and return costs ignored.", "scale"],
    ],
  },
  versus: {
    kicker: "From audience understanding to action",
    title: "Traffic Buying vs Customer Journey Marketing",
    sub: "Both drive sales. One understands why shoppers buy — and come back.",
    conv: ["Ads", "Clicks", "Sessions", "Revenue"],
    fr: ["Segment", "Discovery", "Product", "Cart", "Checkout", "Purchase", "Repeat", "Learning"],
  },
  diff: {
    kicker: "Intelligence behind every order",
    title: "E-commerce Built Around the Shopper, Not Just the Click",
    sub: "How this approach to e-commerce differs — question by question.",
    answers: [
      "Runs shopping and social ads, reports traffic, ROAS and revenue, and pushes discounts when sales dip.",
      "The whole journey is examined — segments, category behaviour, product discovery, purchase barriers, checkout, retention — and decisions follow the evidence.",
      "Store and ad data show behaviour; we read them alongside CRM, analytics and campaign data to decide what changes next.",
      "The business learns which products, segments and offers create profitable, repeat customers.",
      "Tracking, product data, feeds, segments, conversion events and — where available — cost data are set up before scaling.",
      "Funnel stages are reviewed; friction is tested and removed; retention journeys are refined.",
      "Search, shopping, social, email, WhatsApp and the store work together — one customer journey.",
      "AI helps with product descriptions, feed enrichment, segmentation, behaviour patterns and performance summaries.",
      "People decide pricing, offers, brand presentation, customer communication and what goes live.",
      "More of the right shoppers, fewer lost carts and customers who come back.",
    ],
  },
  layers: {
    title: "What Shapes an E-commerce Decision",
    rows: [
      ["Shopper segment", "users", "All visitors", "New, returning and high-value shoppers"],
      ["Category understanding", "grid", "Product lists", "How people compare and choose in the category"],
      ["Product discovery", "search", "Homepage traffic", "Search, feeds and navigation that find the right product"],
      ["Purchase barriers", "flag", "Discount to fix it", "The real reasons people hesitate"],
      ["Conversion signals", "target", "Revenue only", "Add-to-cart, checkout and purchase behaviour"],
      ["Retention", "refresh", "Acquire again", "Reasons and journeys to buy again"],
    ],
  },
  loop: {
    title: "How E-commerce Marketing Works: Intelligence to Impact",
    center: "Shopper intelligence",
    texts: [
      "Understand the business model, margins, products and customer lifecycle.",
      "Discover shopper segments, discovery paths, purchase barriers and the signals already in your CRM and analytics.",
      "Define priorities across acquisition, product pages, checkout and retention, with measures.",
      "Activate search, shopping, social, store improvements and retention journeys.",
      "Measure conversion by stage, order value, repeat purchase and — where data allows — contribution.",
      "Learn which products, segments and changes create profitable customers.",
      "Improve feeds, pages, checkout, offers and journeys.",
      "Grow a store that keeps customers, not just traffic.",
    ],
  },
  journey: {
    title: "The Journey Doesn't End at the Click.",
    sub: "Shoppers move through many steps before — and after — the first purchase. Each step can be understood and improved.",
    steps: [
      ["Discover", "search"],
      ["Consider", "scale"],
      ["Product", "box"],
      ["Cart", "tag"],
      ["Checkout", "shield"],
      ["Purchase", "check"],
      ["Repeat", "refresh"],
    ],
  },
  capabilities: {
    title: "What E-commerce Marketing Covers",
    layers: [
      ["Strategy", "compass", ["Objectives", "Segments", "Channel mix"], "Decide where growth should come from."],
      ["E-commerce SEO", "search", ["Category pages", "Product pages", "Technical SEO"], "Help shoppers find products in search."],
      ["Shopping & search ads", "tag", ["Shopping campaigns", "Search campaigns", "Remarketing"], "Reach shoppers with intent."],
      ["Product feeds", "database", ["Titles", "Attributes", "Availability"], "Product data as marketing."],
      ["Social advertising", "megaphone", ["Prospecting", "Catalogue ads", "Retargeting"], "Audience-led paid social for stores."],
      ["Product page & checkout", "box", ["Page anatomy", "Checkout friction", "Mobile UX"], "Remove reasons to hesitate."],
      ["Retention journeys", "refresh", ["Email", "WhatsApp", "Post-purchase"], "Reasons to buy again."],
      ["Analytics", "bars", ["Funnel tracking", "Cohorts", "Contribution"], "Measure the whole journey."],
    ],
  },
  ai: {
    sub: "AI helps stores move faster. People decide what customers see.",
    ai: [
      ["Product description drafts", "Drafts copy for review."],
      ["Feed enrichment", "Suggests attributes and titles."],
      ["Segmentation help", "Finds shopper groups from behaviour."],
      ["Behaviour patterns", "Spots where shoppers drop off."],
      ["Performance summaries", "Summarises results across channels."],
    ],
    human: [
      ["Pricing and offers", "What's offered, and when."],
      ["Brand presentation", "How products and the brand look."],
      ["Customer communication", "Tone for every message."],
      ["Commercial judgement", "Margin, stock and priorities."],
      ["Approval", "Nothing goes live unreviewed."],
    ],
  },
  metrics: {
    title: "Measure the Journey, Not Just Revenue",
    tiers: [
      ["Impressions", "Sessions", "Product views"],
      ["Add-to-cart", "Checkout starts", "Cart abandonment", "Search usage"],
      ["Orders", "Conversion rate", "Average order value", "Returns"],
      ["Repeat purchase", "Customer value", "Contribution (where data allows)"],
    ],
    objectives: [
      ["Grow new customers", [0, 2], "Reach the right shoppers, then check they convert."],
      ["Reduce friction", [1, 2], "Movement through cart and checkout."],
      ["Increase order value", [2, 3], "Basket size without eroding margin."],
      ["Build loyalty", [2, 3], "Repeat purchase and customer value over time."],
    ],
  },
  learn: {
    title: "Every Order Should Teach the Next Decision",
    steps: [
      ["Campaign", "Shopping campaign for a core category."],
      ["Signal", "Product views, add-to-cart and checkout drop-off."],
      ["Insight", "Shoppers leave when delivery cost appears at checkout."],
      ["Decision", "Show delivery information on the product page."],
      ["Experiment", "Test early delivery messaging against the current page."],
      ["Learning", "Record how clarity affects checkout completion."],
      ["Better campaign", "The next improvement starts from evidence."],
    ],
  },
  intel: {
    signals: [
      ["Products people compare", "scale", ["Product", "Positioning"]],
      ["Reasons carts are abandoned", "flag", ["Customer experience", "Product"]],
      ["Search terms with no results", "search", ["Product", "Content"]],
      ["Segments that buy again", "users", ["Market strategy", "Sales"]],
      ["Offers that grow value, not just volume", "tag", ["Sales", "Market strategy"]],
    ],
  },
  why: {
    title: "Why Frequent Research for E-commerce Marketing",
    items: [
      ["Journey, not just traffic", "Discovery to repeat purchase.", "map"],
      ["Commercial reality", "Decisions judged on margin where data allows.", "scale"],
      ["Technology-aware", "We understand the systems underneath the channel.", "layers"],
      ["Friction removed by testing", "Changes tested, not assumed.", "flask"],
      ["Retention built in", "Reasons for customers to return.", "refresh"],
      ["AI-assisted, human-led", "Faster execution with people in control.", "bulb"],
    ],
  },
  related: {
    title: "E-commerce Works Better When It's Connected",
    sub: "Every channel serves one shopper journey.",
    center: "E-commerce",
    links: [
      ["SEO Services", "Help shoppers find products in search.", ppDm("seo-services"), "digital"],
      ["Google Ads / PPC", "Shopping and search campaigns with intent.", ppDm("google-ads-ppc"), "digital"],
      ["Email Marketing", "Retention and post-purchase journeys.", ppDm("email-marketing"), "digital"],
      ["WhatsApp Marketing", "Order updates and consent-based conversations.", ppDm("whatsapp-marketing"), "digital"],
      ["Digital Analytics & Reporting", "Measure the whole shopper journey.", ppDm("digital-analytics-and-reporting"), "data"],
    ],
  },
  faq: EC_FAQ,
  faqTitle: "E-commerce Marketing: Frequently Asked Questions",
  guide: {
    title: "E-commerce Marketing: More Traffic, Better Conversion and Customers Who Come Back",
    cover: ["Frequent Research · Guide", "E-commerce Marketing", "From first click to repeat purchase"],
    topics: ["E-commerce SEO", "Shopping and PPC", "Product feeds", "Product page optimisation", "Checkout CRO", "Retention marketing", "First-party data", "E-commerce analytics", "AI in e-commerce"],
    to: "/blog/e-commerce-marketing-guide",
  },
  final: {
    sig: "Discover. Purchase. Return.",
    sigText: "E-commerce marketing that follows the shopper beyond the click — and learns from every order.",
    title: "Have a Marketing Challenge That Needs More Than a Channel?",
    text: "Tell us about your store, your products and where shoppers drop away. We'll help define where to start.",
  },
};

function EC_Page() {
  return (
    <RL_Page
      c={{
        ...EC_CFG,
        visuals: (
          <>
                  <DK_Anatomy
        id="ec-pp-h"
        kicker="Product page optimisation"
        title="A Product Page Is Not Just a Page. It's a Sales Conversation."
        sub="Select a layer to see its job."
        pageLabel="Product page anatomy"
        blocks={[
          ["Imagery", "Attention", "Do images show the product clearly, in use and at scale?", "eyeoff", "lg"],
          ["Product information", "Understanding", "Can the shopper answer their own questions?", "file", "sm"],
          ["Reviews & policies", "Trust", "Is genuine proof visible near the decision?", "award", "sm"],
          ["Price & availability", "Decision", "Is the value clear and the stock status honest?", "tag", "sm"],
          ["Add to cart", "Action", "Is the main action obvious on every device?", "box", "sm"],
          ["Delivery, returns, payment", "Confidence", "Are the last worries answered before checkout?", "shield"],
        ]}
      />
                  <DK_Leak
        id="ec-chk-h"
        kicker="Cart & checkout"
        title="Every Click Between Product and Payment Matters"
        sub="Identify → test → improve. Scroll to remove the friction — no promised conversion uplift."
        stages={["Product", "Add to cart", "Cart", "Checkout", "Payment"]}
        leaks={[
          ["Unclear information", "Shoppers can't confirm it's right for them."],
          ["Unexpected costs", "Delivery or fees appear late."],
          ["Trust concerns", "Security, returns or reviews are unclear."],
          ["Complicated forms", "Too many steps or fields; forced account creation."],
          ["Limited payment options", "Slow pages or a poor mobile payment experience."],
        ]}
        final="A smoother path from product to payment."
        closing="Each step is a chance to lose — or keep — the sale."
      />
          </>
        ),
        after: (
          <>
                  <DK_Flow
        id="ec-ret-h"
        kicker="The retention engine"
        title="Acquisition Gets the Customer In. Retention Builds the Business."
        sub={
          <>
            Powered by <PpL to={ppDm("email-marketing")}>Email Marketing</PpL> and <PpL to={ppDm("whatsapp-marketing")}>WhatsApp Marketing</PpL>.
          </>
        }
        steps={["Purchase", "Onboarding", "Value", "Engagement", "Relevant offer", "Repeat purchase", "Loyalty", "Advocacy", "Repeat"]}
        highlightFrom={5}
      />
            <EC_Waterfall />
          </>
        ),
        formNode:       <DM_Form
        id={EC_FORM}
        kicker="E-commerce consultation"
        title="Improve Your Store's Customer Journey"
        sub="A few quick steps — keep it short."
        type="E-commerce Marketing Consultation"
        service="E-commerce Marketing"
        icon="box"
        submitLabel="Improve My Store's Journey"
        successTitle="Thank you. Your e-commerce marketing request has been sent."
        msgLabel="Tell us about your requirement (optional)"
        chips={[
          {
            k: "needs",
            t: "Goals",
            q: "What are you trying to improve?",
            label: "Goals",
            multi: true,
            options: [
              "Increase online sales",
              "Improve conversion rate",
              "Increase product discovery",
              "Improve Google Shopping / PPC",
              "Improve SEO",
              "Reduce checkout friction",
              "Increase repeat purchases",
              "Improve retention",
              "Marketplace growth",
              "E-commerce analytics",
              "Full e-commerce strategy",
              "Not sure yet",
            ],
          },
          { k: "model", t: "Model", q: "Business model (optional)", label: "Business model", optional: true, options: ["D2C", "B2C", "Marketplace", "Omnichannel", "Other"] },
          { k: "budget", t: "Budget", q: "Monthly marketing budget", label: "Monthly budget", options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { EC_Page };
