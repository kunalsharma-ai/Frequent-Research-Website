/*
 * SaaS Development — /services/it-development/saas-development (URL unchanged; previously the generic service template)
 * Business-first technology page (build 33) on TX_Page. USP: product-to-platform thinking.
 * Signature visual: TXV_Saas (Idea → User → Product experience → Tenant → Identity → Data → Billing → Integrations → Analytics → AI → Continuous improvement).
 * Preserved template facts: multi-tenant architecture, billing and subscriptions, admin dashboards, scalable cloud setup.
 * No case study, no team details, no example boxes, no invented numbers, no uptime or scale guarantees.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_BUDGET } from '../components/dm/kit.jsx';
import { DK3_Roles, DK3_Stack } from '../components/dm/kit3.jsx';
import { TXV_Saas, TX_Dash, TX_Page } from '../components/dm/itkit.jsx';

const SD_URL = "/services/it-development/saas-development";
const SD_TITLE = "SaaS Development Services | Frequent Research";
const SD_FORM = "sd-project";

const SD_FAQ = [
  ["What should a SaaS MVP include?", "The smallest product that proves the core value for a defined set of users: the main workflow, sign-up and authentication, basic roles, the data model, essential admin tools and enough analytics to learn from usage. Billing, integrations and advanced features follow once the core is validated — but the architecture should not block them."],
  ["How should multi-tenancy be designed?", "Around how customers' data must be separated, how much customisation each tenant needs, compliance expectations and expected scale. Shared databases with tenant isolation, separate schemas or separate databases each have trade-offs in cost, security and operational effort, so the choice is made per product."],
  ["Can SaaS support subscription and usage-based models?", "Yes. Plans, feature entitlements, trials, seats, usage metering, invoicing and payment-provider integration can be designed so pricing can change without rebuilding the product."],
  ["How can AI be incorporated into a SaaS product?", "Where it creates value for users: assistants that help complete tasks, semantic search, recommendations, workflow automation, natural-language analytics and intelligent alerts — designed to be purposeful, permissioned, governed and observable."],
  ["How should a SaaS product evolve after launch?", "Through a steady loop of observing usage, learning from customers, prioritising and releasing improvements — supported by product analytics, observability, feature flags and a roadmap that balances new features with reliability and technical health."],
  ["Which technologies are used for SaaS products?", "The stack follows the requirement. Common choices include React or Next.js on the front end, Node.js, PHP / Laravel or Python on the back end, and AWS, Azure or Google Cloud for infrastructure — without implying every product uses every technology."],
  ["How much does SaaS development cost?", "It depends on scope, tenancy model, integrations, billing complexity, AI features, security requirements and support, so an estimate follows discovery rather than a generic price."],
  ["Who owns the SaaS product and code?", "Ownership of code, IP and accounts is set out in the project agreement and is best agreed before development begins."],
];

const SD_CFG = {
  key: "sd",
  pfx: "sd",
  slug: "saas-development",
  url: SD_URL,
  title: SD_TITLE,
  maTitle: "SaaS Development Services",
  desc: "SaaS development from MVP to multi-tenant platform: identity, subscriptions, billing, integrations, analytics and AI — a product that keeps improving.",
  crumb: "SaaS Development",
  name: "SaaS Development",
  serviceType: "SaaS development",
  schemaDesc:
    "Business-first SaaS development: product-to-platform thinking, MVP scoping, multi-tenant architecture, authentication, permissions, subscriptions, billing, plans and feature entitlements, APIs, integrations, admin dashboards, product analytics, AI capabilities, observability, scalable cloud setup and continuous product evolution.",
  formId: SD_FORM,
  hero: {
    kicker: "Product-to-platform thinking",
    h1: "SaaS Development",
    tag: "Build a Product That Can Keep Getting Better.",
    lead: "From MVP to multi-tenant platform, the goal is not simply to launch software. It is to create a product that can evolve with users, business models, integrations and future requirements.",
    cta: "Discuss Your SaaS Product",
    cta2: "Explore Our Approach",
    trust: ["MVP to platform", "Multi-tenancy", "Subscriptions & billing", "Integrations", "AI where useful"],
    vis: <TXV_Saas />,
  },
  statement: "A SaaS product isn't finished at launch. Launch is when it starts learning.",
  statementFlow: ["Idea", "User", "Product experience", "Tenant", "Identity", "Data", "Billing", "Integrations", "Analytics", "AI", "Continuous improvement"],
  caps: [
    ["MVP Development", "rocket"],
    ["Multi-tenancy", "box"],
    ["Identity & Permissions", "shield"],
    ["Subscriptions & Billing", "tag"],
    ["APIs & Integrations", "layers"],
    ["Admin Dashboards", "grid"],
    ["Product Analytics", "bars"],
    ["Observability", "eyeoff"],
  ],
  problem: {
    title: "When a Product Is Built Like a Project",
    sub: "Most SaaS products don't struggle at launch. They struggle when the first architecture can't support what customers ask for next.",
    items: [
      ["MVP with no foundation", "A quick first version that has to be rewritten to add tenants or billing.", "rocket"],
      ["Tenancy as an afterthought", "Customer data separation bolted on late.", "box"],
      ["Pricing locked into code", "Every plan change needs a release.", "tag"],
      ["Integration requests pile up", "No API strategy for what customers connect.", "layers"],
      ["Flying blind", "No product analytics or observability after launch.", "eyeoff"],
      ["AI added for the pitch deck", "Features that impress in demos but don't help users.", "bulb"],
    ],
  },
  diff: {
    title: "SaaS Built as a Product That Becomes a Platform",
    sub: "What changes when SaaS development starts from product-to-platform thinking.",
    items: [
      ["Product thinking before code", "compass", "The core value, target users and business model are defined before features become a backlog.", "The MVP proves what matters instead of shipping everything at once."],
      ["Right-sized architecture", "sliders", "Tenancy, identity, data and billing are designed for the next stage of the product — not for an imaginary scale on day one.", "The MVP can grow into a platform without starting again."],
      ["Integration-aware development", "layers", "APIs, webhooks and integrations are treated as part of the product, because customers will connect it to their own systems.", "The product fits into customers' workflows."],
      ["AI where it adds value", "bulb", "AI features are chosen for user value — assistance, search, recommendations, automation — and governed from the start.", "AI that customers use, not just see."],
      ["Build beyond launch", "refresh", "Product analytics, observability and a release rhythm are built in so the product keeps improving.", "Every release is informed by how the product is actually used."],
    ],
  },
  shift: {
    title: "From MVP to Multi-Tenant Platform",
    sub: "What changes as a SaaS product matures — and what the first architecture should already allow.",
    beforeLabel: "MVP",
    afterLabel: "Platform",
    before: ["Core workflow", "Sign-up and login", "Basic roles", "Essential admin", "Usage analytics"],
    after: ["Multi-tenant architecture", "Plans, billing and entitlements", "APIs and integrations", "AI capabilities", "Observability and continuous releases"],
    chain: ["Tenant", "Identity", "Product", "Data", "Billing", "Analytics", "Evolution"],
  },
  capabilities: {
    title: "What SaaS Development Can Include",
    sub: "Each capability is there because a growing product will need it — or because customers will.",
    layers: [
      ["Multi-tenancy", "box", ["Tenant isolation", "Tenant settings", "Data separation"], "Many customers share one product safely."],
      ["Authentication & permissions", "shield", ["Sign-up", "SSO where required", "Roles", "Organisation accounts"], "Customers manage their own users securely."],
      ["Subscriptions & billing", "tag", ["Plans", "Trials", "Usage metering", "Invoices"], "Pricing can change without rebuilding the product."],
      ["Feature entitlements", "sliders", ["Plan-based features", "Feature flags", "Limits"], "Packaging follows the business model."],
      ["APIs & integrations", "layers", ["Public APIs", "Webhooks", "Third-party connectors"], "Customers connect the product to their systems."],
      ["Admin dashboards", "grid", ["Tenant management", "Support tools", "Configuration"], "The product is easy to operate as it grows."],
      ["Product analytics", "bars", ["Feature usage", "Activation", "Retention"], "Roadmap decisions based on real usage."],
      ["Scalable cloud setup", "globe", ["AWS, Azure or Google Cloud", "CI/CD", "Observability"], "Infrastructure grows with demand when it needs to."],
    ],
  },
  loop: {
    title: "How a SaaS Product Becomes a Platform",
    texts: [
      "Understand the product idea, target users, business model and what must be true for the product to succeed.",
      "Design the core experience, tenancy model, identity, data and billing approach.",
      "Engineer an MVP on foundations that can grow into a platform.",
      "Connect payments, identity providers, customer systems and third-party APIs.",
      "Add intelligence — assistants, semantic search, recommendations, natural-language analytics — where users benefit.",
      "Measure activation, feature usage, retention, errors and performance.",
      "Evolve the product release by release as users, pricing and integrations change.",
    ],
  },
  ai: {
    title: "AI Inside the Product. Humans in Charge of It.",
    sub: "Purposeful → Permissioned → Governed → Observable. AI should make the product more useful, not just more impressive.",
    ai: [
      ["AI assistants", "Help users complete complex tasks inside the product."],
      ["Semantic search", "Find records and content by meaning."],
      ["Recommendations", "Context-aware suggestions for each user."],
      ["Workflow automation", "Automate routine steps with review."],
      ["Natural-language analytics", "Ask questions about data in plain words."],
      ["Intelligent alerts", "Surface anomalies and events that matter."],
    ],
  },
  integrate: {
    title: "A SaaS Product Lives Inside Its Customers' Ecosystems",
    sub: "API-first thinking: the product is designed to connect from the start.",
    center: "SaaS product",
    flow: ["Connect", "Synchronize", "Automate", "Measure"],
    nodes: [
      ["Identity", "shield", "Single sign-on and identity providers for business customers."],
      ["Payments", "tag", "Subscriptions, invoices and usage billing through supported providers."],
      ["CRM", "database", "Customer and account data synced with sales tools."],
      ["Communication", "msg", "Email and in-app notifications triggered by events."],
      ["Customer systems", "layers", "Public APIs and webhooks let customers connect their own tools."],
      ["Analytics", "bars", "Product and usage data for the roadmap."],
      ["Queues & jobs", "refresh", "Background processing and event-driven workflows keep the product responsive."],
    ],
    note: "Integrations depend on the APIs and access each system supports.",
  },
  assure: {
    title: "Security, Observability and Quality for a Product Customers Rely On",
    tabs: [
      ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Tenant isolation", "API security", "Data protection", "Logging", "Monitoring", "Backup", "Secure deployment"], "Risk is reduced through design, testing and maintenance; no product is completely secure, and compliance depends on scope and use."],
      ["Observability", "eyeoff", "If you can't see it, you can't improve it", "flow", ["Product", "Logs", "Metrics", "Traces", "Alerts", "Diagnosis", "Improvement"], "Errors, API latency, background jobs, queues, database health, infrastructure and releases are observed. No uptime percentage is promised."],
      ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Functional testing", "Integration testing", "Performance", "Security", "Accessibility", "Regression", "UAT", "Release", "Monitoring"]],
      ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Responsive UI", "Loading states", "Efficient JavaScript", "Caching"]], ["Engineering", ["Efficient APIs", "Database strategy", "Queues and background processing", "Resource scaling"]]], "Performance targets are set and measured per product; no score is promised in advance."],
    ],
  },
  evolve: {
    sub: "A SaaS product is never finished. It keeps learning from the people who use it.",
    areas: ["Bug fixes", "Security and dependency updates", "New features and plans", "New integrations", "Infrastructure and performance", "AI enhancements"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["MVP with a future", "Foundations that grow into a platform.", "rocket"],
      ["Tenancy by design", "Customer data separation planned early.", "box"],
      ["Flexible pricing", "Plans and entitlements outside the code.", "tag"],
      ["API-first", "Customers can connect the product.", "layers"],
      ["Observable", "Usage and health visible from day one.", "eyeoff"],
      ["AI with purpose", "Permissioned, governed, useful.", "bulb"],
    ],
  },
  related: {
    title: "Where a SaaS Product Connects Next",
    sub: "SaaS products draw on every part of the digital product toolkit.",
    links: [
      ["Web Application Development", "The core web experience of the product.", ppIt("web-application-development"), "it"],
      ["Mobile App Development", "Mobile access for the product's users.", ppIt("mobile-app-development"), "it"],
      ["Custom Software Development", "When a SaaS starts from a business-specific workflow.", ppIt("custom-software-development"), "it"],
      ["Cloud & DevOps Services", "Infrastructure, CI/CD and monitoring.", ppIt("cloud-and-devops-services"), "it"],
      ["Data Analytics & Dashboard Development", "Analytics inside and around the product.", ppIt("data-analytics-and-dashboard-development"), "data"],
    ],
  },
  faq: SD_FAQ,
  faqTitle: "SaaS Development: Questions Worth Asking",
  final: {
    sigText: "SaaS products built around users, business models and the platform they need to become.",
    title: "Have a Product Idea That Needs More Than an MVP?",
    text: "Tell us who the product is for, how it will make money and what it needs to connect to. We'll help shape the right product and platform direction.",
  },
};

function SD_Page() {
  return (
    <TX_Page
      c={{
        ...SD_CFG,
        visuals: (
          <>
            <DK3_Stack
              id="sd-stack-h"
              kicker="Product-to-platform architecture"
              title="The Layers Behind a SaaS Product"
              sub="Select a layer to see what it does — and why it matters as the product grows."
              layers={[
                ["Product experience", "compass", ["Onboarding", "Core workflow", "Settings"], "Where users decide whether the product is worth keeping."],
                ["Tenant", "box", ["Isolation", "Configuration", "Branding where needed"], "Each customer gets their own space in a shared product."],
                ["Identity", "shield", ["Sign-up", "Roles", "SSO where required"], "Customers manage their own people securely."],
                ["Billing", "tag", ["Plans", "Usage", "Invoices", "Entitlements"], "Pricing and packaging can change as the business model does."],
                ["Data", "database", ["Data model", "Exports", "Retention"], "Customer data stays separated, reliable and portable."],
                ["Integrations", "layers", ["Public API", "Webhooks", "Connectors"], "The product fits into customers' existing systems."],
                ["Intelligence", "bulb", ["Analytics", "AI features", "Alerts"], "The product learns — and helps its users learn."],
              ]}
            />
            <DK3_Roles
              id="sd-roles-h"
              tone="off"
              kicker="Role-based experiences"
              title="One Product. A Focused Experience for Every Role."
              sub="Choose a role to see how the product changes."
              appName="SaaS workspace"
              roles={[
                ["Platform admin", "shield", "Manages tenants, plans, support tools and platform settings."],
                ["Tenant admin", "users", "Manages their organisation's users, permissions and billing."],
                ["Manager", "bars", "Sees workload, approvals and reports for their area."],
                ["User", "user", "Works in the core product workflow."],
                ["Analyst", "trend", "Explores usage and business data."],
              ]}
              modules={[
                ["Workspace", "grid"],
                ["Reports", "bars"],
                ["Users & roles", "users"],
                ["Billing", "tag"],
                ["Integrations", "layers"],
                ["Platform settings", "sliders"],
              ]}
              access={[
                [0, 1, 2, 3, 4, 5],
                [0, 1, 2, 3, 4],
                [0, 1],
                [0],
                [0, 1],
              ]}
            />
          </>
        ),
        after: (
          <>
            <TX_Dash
              id="sd-dash-h"
              title="Build It. Then Learn From It."
              sub="What a SaaS product should make visible: usage, health and behaviour in one place."
              tiles={[
                ["Active users", "users", "spark"],
                ["Feature usage", "grid", "bars"],
                ["Workflows", "shuffle", "spark"],
                ["Errors", "flag", "dots"],
                ["Performance", "rocket", "spark"],
                ["Engagement", "msg", "bars"],
                ["Conversion", "target", "ring"],
                ["Retention", "refresh", "spark"],
                ["API health", "layers", "dots"],
                ["AI usage", "bulb", "bars"],
              ]}
            />
          </>
        ),
        guide: {
          title: "SaaS Development: Building a Subscription Software Product from MVP to Scale",
          cover: ["Guide", "SaaS Development", "MVP · Platform · Scale"],
          topics: ["Validating the idea", "MVP scope", "Multi-tenant architecture", "Authentication and billing", "Scaling and evolving"],
          to: "/blog/saas-development-guide",
        },
        formNode: (
          <DM_Form
            id={SD_FORM}
            kicker="SaaS product"
            title="Discuss Your SaaS Product"
            sub="A few quick questions help us understand the product and recommend the right next step."
            type="SaaS Development Enquiry"
            service="SaaS Development"
            icon="box"
            submitLabel="Discuss My SaaS Product"
            successTitle="Thank you. Your SaaS product request has been sent."
            siteLabel="Current product or website URL (optional)"
            msgLabel="Product details (optional)"
            msgPh="Users, core workflow, pricing model, integrations, timelines — whatever you know so far"
            nextSteps={["We review your product idea and current setup.", "We contact you within one working day.", "You get questions, options and a recommended next step."]}
            chips={[
              { k: "stage", t: "Stage", q: "Where is the product now?", label: "Product stage", options: ["Just an idea", "Validating an MVP", "MVP live, need to scale", "Rebuilding an existing product", "Adding features or AI", "Not sure yet"] },
              { k: "need", t: "Need", q: "What do you need most?", label: "Main need", multi: true, options: ["MVP development", "Multi-tenancy", "Subscriptions & billing", "Integrations / APIs", "AI features", "Performance & scaling", "Product analytics"] },
              { k: "model", t: "Model", q: "How will the product make money?", label: "Business model", options: ["Subscription plans", "Usage-based", "Seats / per user", "Freemium", "Internal / not sold", "Not decided"] },
              { k: "budget", t: "Budget", q: "Budget (optional)", label: "Budget", optional: true, options: DK_BUDGET },
            ]}
          />
        ),
      }}
    />
  );
}

export { SD_Page };
