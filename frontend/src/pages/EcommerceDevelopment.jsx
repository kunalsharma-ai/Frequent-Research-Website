/*
 * E-commerce Development — /services/it-development/e-commerce-development (URL unchanged)
 * Business-first technology page (build 33) on TX_Page. USP: commerce-system thinking.
 * Signature visual: TXV_Commerce (Catalog → Discovery → Cart → Checkout → Payment → Order → Fulfilment → Customer, data back to Analytics → Optimisation).
 * Kept from build 30: platform comparison, discovery engine, product page anatomy, checkout flow, the existing form.
 * No case study, no team details, no example boxes, no revenue or conversion promises.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Engine, DK_Flow, DK_Matrix } from '../components/dm/kit.jsx';
import { DK_Anatomy, DK_Guide } from '../components/dm/kit2.jsx';
import { TXV_Commerce, TX_Page } from '../components/dm/itkit.jsx';

const ED_URL = "/services/it-development/e-commerce-development";

const ED_TITLE = "E-commerce Development Services | Frequent Research";

const ED_FORM = "ed-project";

const ED_FAQ = [
  ["Can e-commerce connect with inventory, ERP or CRM systems?", "Yes — through supported APIs, platform connectors or custom middleware, so stock, prices, orders and customer records stay in sync instead of being updated by hand. The right pattern depends on how often data changes and which system is the source of truth."],
  ["How should checkout and product discovery be designed?", "Discovery should help people find the right product quickly — search that understands intent, useful filters, clear product pages. Checkout should remove anything in the way: few steps, clear costs, guest options and familiar payment methods."],
  ["Can an existing store be modernised?", "Often. Performance, checkout, search, integrations or the front end can be improved without starting again. Re-platforming makes sense when the current platform limits the business — and then product, customer and order data, URLs and redirects are migrated carefully."],
  ["Which e-commerce platform is right for us?", "It depends on catalogue size, business model (B2C, B2B, marketplace, subscription), integrations, budget and how much control is needed. Shopify, WooCommerce, Magento, headless and fully custom builds each fit different situations."],
  ["Can you build B2B e-commerce?", "Yes — customer-specific pricing, bulk and quick ordering, quotes, credit terms, approvals and account management, connected to ERP."],
  ["Can payment gateways and shipping be integrated?", "Yes — payment gateways, UPI and wallets where supported, shipping and logistics providers, tax rules and invoicing."],
  ["Where can AI help an online store?", "Product discovery and search, recommendations, product content assistance and customer support — each governed and reviewed by people."],
  ["Who owns the store and its data?", "Ownership of code, data, domains and platform accounts is set out in the project agreement. Holding your own platform, payment and domain accounts is recommended."],
];

const ED_CFG = {
  key: "ed",
  pfx: "ed",
  slug: "e-commerce-development",
  url: ED_URL,
  title: ED_TITLE,
  maTitle: "E-commerce Development Services",
  desc: "E-commerce development that builds the system behind the transaction: catalogue, discovery, checkout, payments, orders, fulfilment and connected data.",
  crumb: "E-commerce Development",
  name: "E-commerce Development",
  serviceType: "E-commerce development",
  schemaDesc:
    "Business-first e-commerce development: commerce-system thinking across catalogue, product discovery, search, cart, checkout, payment integration, customer accounts, order workflows, inventory and ERP integration, promotions, analytics, AI-assisted discovery and support, and post-launch evolution.",
  formId: ED_FORM,
  hero: {
    kicker: "Commerce-system thinking",
    h1: "E-commerce Development",
    tag: "Build the Commerce Experience Behind the Transaction.",
    lead: "A successful digital store is more than a catalogue and checkout. The experience connects product discovery, customer decisions, transactions, fulfilment and the systems behind them.",
    cta: "Discuss Your Store",
    cta2: "Explore Our Approach",
    trust: ["Shopify / WooCommerce / custom", "Payments", "ERP & inventory", "Order workflows", "AI where useful"],
    vis: <TXV_Commerce />,
  },
  statement: "The checkout is the moment customers see. The commerce system is what makes it work.",
  statementFlow: ["Catalog", "Search", "Product", "Cart", "Checkout", "Payment", "Order", "Fulfilment", "Customer", "Analytics"],
  caps: [
    ["Product Catalogue", "box"],
    ["Search & Discovery", "search"],
    ["Cart & Checkout", "tag"],
    ["Payment Integration", "shield"],
    ["Customer Accounts", "user"],
    ["Order Workflows", "check"],
    ["Inventory & ERP", "database"],
    ["Analytics", "bars"],
  ],
  problem: {
    title: "When the Store Front and the Business Behind It Don't Connect",
    sub: "Most e-commerce problems aren't on the homepage. They sit between the product data, the checkout and the operation.",
    items: [
      ["Products hard to find", "Weak search and filters hide what customers want.", "search"],
      ["Checkout friction", "Extra steps, late costs and limited payment options.", "clipboard"],
      ["Manual order handling", "Orders re-typed into other systems.", "refresh"],
      ["Stock out of sync", "Selling what isn't available — or hiding what is.", "box"],
      ["Platform limits", "Business rules the platform can't support.", "sliders"],
      ["Data nobody uses", "Sales data that never informs the next decision.", "bars"],
    ],
  },
  diff: {
    title: "Commerce Built as a System, Not Just a Storefront",
    sub: "What changes when e-commerce development starts from how products, orders and customers actually move.",
    items: [
      ["Commerce-system thinking", "layers", "The store is designed from catalogue to fulfilment, including the systems that hold products, stock, orders and customers.", "Fewer manual steps between a click and a delivered order."],
      ["Right-sized platform choice", "sliders", "Hosted platform, open source, headless or custom — chosen by catalogue, business model, integrations and budget.", "No over-building, and no outgrowing the platform in a year."],
      ["Experience + engineering", "compass", "Discovery, product pages and checkout are designed alongside performance and payment security.", "Customers find, decide and pay with less friction."],
      ["Integration-aware development", "database", "ERP, inventory, CRM, payments, shipping and tax are part of the plan from the start.", "Stock, orders and customer data stay consistent."],
      ["Build beyond launch", "refresh", "Analytics and optimisation are planned so the store improves with evidence after launch.", "The store keeps getting easier to buy from and to run."],
    ],
  },
  shift: {
    title: "From an Online Catalogue to a Connected Commerce System",
    sub: "What changes when the store is connected to the operation behind it.",
    before: ["Products uploaded by hand", "Generic checkout", "Orders re-typed into other tools", "Stock updated manually", "Sales data in exports"],
    after: ["Structured catalogue and product data", "Checkout designed to reduce friction", "Orders flowing into fulfilment", "Inventory synced with core systems", "Analytics feeding optimisation"],
    chain: ["Catalog", "Discovery", "Cart", "Checkout", "Payment", "Order", "Fulfilment", "Customer"],
  },
  capabilities: {
    title: "What E-commerce Development Can Include",
    sub: "Each capability is there for what it makes easier — for customers or for the operation.",
    layers: [
      ["Catalogue & product data", "box", ["Categories", "Variants", "Attributes", "Bulk import"], "Products are easy to manage and easy to find."],
      ["Search & discovery", "search", ["Search", "Filters", "Merchandising"], "Customers reach the right product faster."],
      ["Cart & checkout", "tag", ["Guest checkout", "Clear costs", "Promotions"], "Fewer reasons to abandon a purchase."],
      ["Payments", "shield", ["Gateways", "UPI and wallets where supported", "Refunds"], "Familiar, secure ways to pay."],
      ["Customer accounts", "user", ["Order history", "Saved details", "B2B accounts"], "Repeat purchases are simple."],
      ["Order workflows", "check", ["Status", "Notifications", "Returns"], "Everyone can see where an order is."],
      ["Inventory & ERP integration", "database", ["Stock sync", "Pricing", "Invoicing"], "Operations run on one version of the truth."],
      ["Analytics", "bars", ["E-commerce tracking", "Funnels", "Reports"], "Decisions based on what customers actually do."],
    ],
  },
  loop: {
    title: "How a Commerce System Gets Built",
    texts: [
      "Understand the business model, catalogue, customers, fulfilment and the systems already in place.",
      "Design discovery, product pages, checkout and the platform and integration approach.",
      "Engineer the store on the platform or architecture that fits.",
      "Connect payments, shipping, tax, inventory, ERP, CRM and marketing tools.",
      "Add intelligence — discovery, recommendations, content assistance, support — where it helps customers or operators.",
      "Measure the funnel, search behaviour, performance and order flow.",
      "Evolve the store as products, channels and customers change.",
    ],
  },
  ai: {
    sub: "AI in commerce should help customers find and decide — and help the business run the catalogue.",
    ai: [
      ["Product discovery", "Search that understands what shoppers mean."],
      ["Recommendations", "Context-aware product suggestions."],
      ["Product content assistance", "Draft descriptions and attributes for review."],
      ["Customer support", "Answer order and product questions, with a route to a person."],
      ["Demand insights", "Patterns in sales and search surfaced for review."],
    ],
  },
  integrate: {
    title: "A Store Rarely Works Alone",
    sub: "Connect the commerce experience to the operation behind it.",
    center: "Store",
    nodes: [
      ["Payments", "shield", "Payment gateways, UPI and wallets through supported integrations."],
      ["ERP", "database", "Orders, invoices and pricing flow into core business systems."],
      ["Inventory", "box", "Stock levels stay accurate across channels."],
      ["Shipping", "map", "Rates, labels and tracking from logistics providers."],
      ["CRM", "users", "Customer records and service history in one place."],
      ["Marketing tools", "megaphone", "Email, WhatsApp and ad platforms receive the right events."],
      ["Analytics", "bars", "Funnel and product data feed optimisation."],
    ],
    note: "Integrations depend on the platform, connectors and APIs each system supports. Platform names are trademarks of their owners; no official partnerships are claimed.",
  },
  assure: {
    title: "Performance, Security and Quality at the Point of Purchase",
    tabs: [
      ["Performance", "rocket", "Performance is part of the shopping experience", "cols", [["Experience", ["Fast product and category pages", "Optimised images", "Efficient scripts", "Core Web Vitals considerations"]], ["Engineering", ["Caching and CDN", "Efficient catalogue queries", "Queues for order processing", "Monitoring"]]], "No specific performance score is promised before it is measured."],
      ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Payment security via providers", "API security", "Data protection", "Logging", "Monitoring", "Backup", "Secure deployment"], "Risk is reduced through design and maintenance; no store is completely secure."],
      ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Checkout testing", "Payment testing", "Integration testing", "Performance", "Accessibility", "Regression", "UAT", "Release", "Monitoring"]],
      ["Accessibility", "users", "WCAG-conscious commerce", "chips", [["Keyboard", "grid"], ["Contrast", "eyeoff"], ["Forms", "clipboard"], ["Product images alt text", "file"], ["Error states", "flag"], ["Focus", "target"]], "Designed with WCAG in mind; certification is not claimed."],
    ],
  },
  evolve: {
    sub: "A store improves with every order — if what happens is observed and acted on.",
    areas: ["Platform and plugin updates", "Security updates", "Checkout and search improvements", "New payment or shipping options", "New integrations", "AI enhancements"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["The system, not just the store", "Catalogue to fulfilment designed together.", "layers"],
      ["Platform fits the business", "Chosen for model, catalogue and integrations.", "sliders"],
      ["Less manual work", "Orders and stock flow between systems.", "refresh"],
      ["Easier to buy from", "Discovery and checkout without friction.", "tag"],
      ["Evidence after launch", "Analytics feeds the next improvement.", "bars"],
      ["Room to grow", "B2B, marketplaces or apps can follow.", "trend"],
    ],
  },
  related: {
    title: "Where a Store Connects Next",
    sub: "Commerce usually touches the rest of the digital product.",
    links: [
      ["Website Development", "The brand and content experience around the store.", ppIt("website-development"), "it"],
      ["Web Application Development", "Portals and back-office tools for orders and partners.", ppIt("web-application-development"), "it"],
      ["Mobile App Development", "When frequent buyers need an app.", ppIt("mobile-app-development"), "it"],
      ["ERP Development", "Connect finance, inventory and operations.", ppIt("erp-development"), "it"],
      ["Data Analytics & Dashboard Development", "Turn commerce data into decisions.", ppIt("data-analytics-and-dashboard-development"), "data"],
    ],
  },
  faq: ED_FAQ,
  faqTitle: "E-commerce Development: Questions Worth Asking",
  final: {
    sigText: "Commerce experiences built around products, customers and the operation behind every order.",
    title: "Have a Commerce Requirement That Needs More Than a Template?",
    text: "Tell us what you sell, how orders are fulfilled and which systems need to connect. We'll help shape the right commerce direction.",
  },
};

function ED_Page() {
  return (
    <TX_Page
      c={{
        ...ED_CFG,
        visuals: (
          <>
                  <DK_Engine
        id="ed-disc-h"
        kicker="Product discovery engine"
        title="Help People Find the Right Product Faster"
        name="Discovery engine"
        inputs={["Search query", "Filters", "Browsing behaviour", "Product data"]}
        process={["Understand intent", "Match & rank", "Personalise"]}
        outputs={["Relevant results", "Useful filters", "Recommendations"]}
      />
                  <DK_Anatomy
        id="ed-pdp-h"
        kicker="Product page wireframe"
        title="Every Part of a Product Page Answers a Question"
        sub="Select a block."
        pageLabel="Product page"
        blocks={[
          ["Gallery", "See it", "What does it really look like?", "eyeoff", "lg"],
          ["Title & price", "Fit", "Is this what I want, at a price I accept?", "tag", "sm"],
          ["Variants & stock", "Availability", "Is my size / option available?", "box", "sm"],
          ["Delivery & returns", "Confidence", "When will it arrive, and can I return it?", "map", "sm"],
          ["Add to cart", "Action", "How do I buy it?", "check", "sm"],
          ["Details & specs", "Evidence", "Will it do what I need?", "file", "lg"],
          ["Reviews & Q&A", "Trust", "What do other buyers say?", "msg", "lg"],
        ]}
      />
                  <DK_Flow
        id="ed-co-h"
        tone="off"
        kicker="Cart and checkout"
        title="A Checkout With Nothing in the Way"
        steps={["Cart", "Sign in or guest", "Address", "Delivery option", "Payment", "Review", "Confirmation"]}
        highlightFrom={4}
        after={<p className="dk-note">Fewer steps, clear costs and familiar payment options reduce abandoned checkouts.</p>}
      />
          </>
        ),
        after: (
          <>
                  <DK_Matrix
        id="ed-plat-h"
        kicker="Platform or custom?"
        title="The Right Platform Depends on Your Requirements"
        sub="No single platform suits every business. Here's how the main options compare."
        head={["Option", "Often suits", "Strengths", "Consider"]}
        rows={[
          ["Shopify", "D2C and growing brands", "Hosted, fast to launch, app ecosystem", "Custom logic limits, app costs"],
          ["WooCommerce", "Content-led stores on WordPress", "Flexible, content + commerce", "Hosting, updates and plugin care"],
          ["Adobe Commerce (Magento)", "Large catalogues, complex B2B", "Deep customisation", "Higher build and running effort"],
          ["Laravel-based / framework", "Custom workflows on a familiar stack", "Control over logic", "More build effort"],
          ["Headless", "Performance and omnichannel needs", "Custom front-end, API-first", "More moving parts"],
          ["Fully custom", "Unique business models", "Complete control", "Highest build and maintenance effort"],
        ]}
        note="Platform names are trademarks of their owners. No official partnerships are claimed."
      />
          </>
        ),
        guideNode:       <DK_Guide
        id="ed-guide-h"
        title="E-commerce Development in 2026: From Online Store to Connected Commerce Experience"
        cover={["Guide", "E-commerce Development", "Store · Systems · Growth"]}
        topics={["Choosing a platform", "Payments and checkout", "Integrations", "Performance and SEO", "Launch and growth"]}
        to="/blog/e-commerce-development-guide"
      />,
        formNode:       <DM_Form
        id={ED_FORM}
        kicker="Commerce project"
        title="Discuss Your Store"
        sub="Eleven short steps — most are one tap. Budget is optional."
        type="E-commerce Development Enquiry"
        service="E-commerce Development"
        icon="tag"
        submitLabel="Discuss My Store"
        successTitle="Thank you. Your commerce project request has been sent."
        siteLabel="Current store or website URL (optional)"
        msgLabel="Project details (optional)"
        msgPh="Products, channels, features, timelines — whatever you know so far"
        nextSteps={["We review your commerce model and current setup.", "We contact you within one working day.", "You get platform options and a recommended next step."]}
        chips={[
          { k: "model", t: "Model", q: "What kind of commerce?", label: "Commerce model", options: ["B2C store", "B2B ordering", "D2C brand", "Marketplace", "Subscription", "Retail / omnichannel", "Not sure yet"] },
          { k: "project", t: "Project", q: "What do you need?", label: "Project type", options: ["New store", "Redesign", "Add features", "Speed / modernisation", "Replatform / migration", "Mobile commerce app"] },
          { k: "platform", t: "Platform", q: "Current or preferred platform", label: "Platform", options: ["Shopify", "WooCommerce", "Adobe Commerce / Magento", "Custom / other", "No store yet", "Not sure — advise me"] },
          { k: "catalogue", t: "Catalogue", q: "How complex is your catalogue?", label: "Catalogue", options: ["Small and simple", "Many variants", "Large catalogue", "Configurable / B2B pricing", "Not sure"] },
          { k: "features", t: "Features", q: "Which features matter most?", label: "Key features", multi: true, options: ["Fast checkout", "Search & filters", "B2B pricing / quotes", "Subscriptions", "Multi-currency / language", "Loyalty", "AI-assisted search", "Marketplace sellers"] },
          { k: "systems", t: "Systems", q: "Systems the store must connect to", label: "Integrations", text: true, optional: true, icon: "layers", ph: "e.g. Tally, SAP, Zoho, Shiprocket, Razorpay" },
          { k: "markets", t: "Markets", q: "Where do you sell?", label: "Markets", options: ["India", "India + international", "International only", "Not decided"] },
          { k: "stage", t: "Stage", q: "Where is the project now?", label: "Project stage", options: ["Exploring", "Requirements drafted", "Ready to start", "Store live, needs improving"] },
          { k: "timeline", t: "Timeline", q: "When do you want to launch?", label: "Timeline", options: ["As soon as possible", "Within 3 months", "3–6 months", "Flexible"] },
          { k: "budget", t: "Budget", q: "Budget (optional)", label: "Budget", optional: true, options: DK_BUDGET },
        ]}
      />,
      }}
    />
  );
}

export { ED_Page };
