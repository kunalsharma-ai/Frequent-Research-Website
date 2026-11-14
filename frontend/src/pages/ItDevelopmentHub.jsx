/*
 * IT & Development landing page — /services/it-development (URL unchanged)
 * Business-first technology hub (build 33). Replaces the generic vertical template for this vertical only
 * (the template carried a "Meet the IT & Development team" section and an unverified scenario).
 * "Build for the business. Design for the user. Engineer for what comes next."
 * No case study, no team details, no example boxes, no invented numbers, partnerships or guarantees.
 */
import * as ee from 'react';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, DM_Strip, dmMeta, ppIt } from '../components/dm/shared.jsx';
import { DK_BUDGET, DK_Final, DK_Hero, DK_Problems, DK_Statement } from '../components/dm/kit.jsx';
import { DK3_Stack, DK3_Tech } from '../components/dm/kit3.jsx';
import { RL_AiLayer, RL_Beyond, RL_Loop } from '../components/dm/kit4.jsx';
import { TXV_Hub, TX_AI_CHAIN, TX_Assure, TX_Dash, TX_Decide, TX_Diff, TX_Evolve, TX_FOUND, TX_HUMAN, TX_Hub, TX_Make, TX_PRODUCTS, TX_Products, TX_Shift, TX_Value, txPhil } from '../components/dm/itkit.jsx';

const ITH_URL = "/services/it-development";
const ITH_TITLE = "IT & Development Services | Frequent Research";
const ITH_DESC = "Business-first IT and development: websites, web apps, mobile apps, e-commerce, custom software and SaaS built around users, integrations and growth.";
const ITH_FORM = "ith-consult";

const ITH_SERVICES = [
  ["Website Development", "website-development"],
  ["Web Application Development", "web-application-development"],
  ["Mobile App Development", "mobile-app-development"],
  ["E-commerce Development", "e-commerce-development"],
  ["Custom Software Development", "custom-software-development"],
  ["SaaS Development", "saas-development"],
  ["CRM Development", "crm-development"],
  ["ERP Development", "erp-development"],
  ["Custom Business Applications", "custom-business-applications"],
  ["UI/UX Design", "ui-ux-design"],
  ["API Development & Integration", "api-development-and-integration"],
  ["Cloud & DevOps Services", "cloud-and-devops-services"],
  ["AI & Automation Solutions", "ai-and-automation-solutions"],
  ["Data Analytics & Dashboard Development", "data-analytics-and-dashboard-development"],
  ["Software Testing & QA", "software-testing-and-qa"],
  ["Cybersecurity Services", "cybersecurity-services"],
  ["Website Maintenance & Support", "website-maintenance-and-support"],
  ["Application Maintenance & Support", "application-maintenance-and-support"],
  ["IT Consulting", "it-consulting"],
];

const ITH_FAQ = [
  ["How do we know what to build — a website, an application, an app or software?", "Start with what the technology must make possible: a stronger presence points to a website, a workflow to a web application, task-on-the-move to a mobile app, selling online to e-commerce, a unique process to custom software and a reusable subscription product to SaaS. Often the answer combines more than one, connected through shared APIs and data."],
  ["Do you always recommend building custom software?", "No. Buying, extending, integrating or modernising existing software is often the better answer. Custom development is recommended when the workflow or product capability genuinely needs it."],
  ["How does AI fit into your development work?", "AI-assisted, human-led. AI can help with documentation, code assistance, test generation and analysis during development, and with search, document processing, recommendations or automation inside products. People remain responsible for architecture, business logic, security, privacy and final approval."],
  ["Which technologies do you work with?", "The technology follows the requirement. The ecosystem commonly includes React and Next.js, Node.js, PHP / Laravel and Python, Flutter and React Native, on AWS, Azure or Google Cloud — without implying partnerships or that every project uses every technology."],
  ["Can you work with our existing systems?", "Yes. Products are designed to integrate with CRM, ERP, payments, identity, communication, analytics and third-party APIs, using the access each system supports."],
  ["What happens after launch?", "Launch is a milestone, not the finish line. Post-launch work can cover maintenance, monitoring, security and dependency updates, performance, integrations, new features and AI enhancements, scoped to what the product needs."],
  ["Will we own the code?", "Ownership of source code, documentation and project assets is set out in the project agreement and agreed before development begins."],
  ["How much does a technology project cost?", "It depends on scope, users, integrations, data, security and support. A short discovery leads to a fixed quote or a phased estimate rather than a generic price list."],
];

function ITH_Page() {
  usePageMeta("IT & Development Services", ITH_DESC);
  dmMeta(ITH_URL, ITH_TITLE, ITH_DESC);
  useJsonLd("ith", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "IT & Development Services",
        description: ITH_DESC,
        url: `${location.origin}${ITH_URL}`,
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: ITH_SERVICES.map(([t, s], k) => ({ "@type": "ListItem", position: k + 1, name: t, url: `${location.origin}${ppIt(s)}` })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${location.origin}/services` },
          { "@type": "ListItem", position: 3, name: "IT & Development", item: `${location.origin}${ITH_URL}` },
        ],
      },
      { "@type": "FAQPage", mainEntity: ITH_FAQ.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
    ],
  });
  return (
    <div className="pp sm dk k3 tx ith">
      <DK_Hero
        id="ith-h1"
        dark
        parent={["Services", "/services"]}
        crumb="IT & Development"
        kicker="IT & Development Services · Business-first technology"
        title="Technology Built Around the Business."
        tag="Build for the Business. Design for the User. Engineer for What Comes Next."
        lead="From websites and applications to mobile products, commerce platforms, custom software and SaaS, Frequent Research builds digital products around business requirements, user experience and the systems that keep them moving."
        primary={["Discuss Your Technology Requirement", ITH_FORM]}
        secondary="Explore Our Capabilities"
        secondaryGo="ith-pr-h"
        trust={["Business-first", "Product-minded", "Integration-aware", "AI-assisted, human-led", "Built to evolve"]}
      >
        <TXV_Hub />
      </DK_Hero>
      <DK_Statement id="ith-stmt" tone="off" quote="Technology should solve the business problem first. The technology comes next." flow={["Business need", "Product thinking", "User experience", "Architecture", "Engineering", "Integration", "Intelligence", "Measurement", "Evolution"]} />
      <DM_Strip label="IT & Development capabilities" caps={[["Websites", "globe"], ["Web Applications", "grid"], ["Mobile Apps", "phone"], ["E-commerce", "tag"], ["Custom Software", "cpu"], ["SaaS", "box"], ["APIs & Integration", "layers"], ["AI & Automation", "bulb"], ["Cloud & DevOps", "refresh"], ["Quality Engineering", "check"]]} />
      <DK_Problems
        id="ith-prob-h"
        kicker="Why technology projects go wrong"
        title="Most Technology Problems Start Before the First Line of Code"
        sub="Projects rarely fail because developers can't write code. They fail because the technology was never connected to what the business needed."
        items={[
          ["Not enough context", "Requirements captured as features, without the business problem behind them.", "help"],
          ["Feature-first thinking", "A long list of features instead of a clear product.", "clipboard"],
          ["Disconnected systems", "Another isolated tool that doesn't talk to anything else.", "layers"],
          ["Difficult to use", "Products built for the developers, not the people using them every day.", "users"],
          ["Over- or under-engineered", "Fashionable architecture for a simple need — or a shortcut that blocks growth.", "sliders"],
          ["No plan after launch", "Nothing measured, nothing improved, nothing updated.", "refresh"],
        ]}
      />
      <RL_Loop
        id="ith-loop-h"
        kicker="The Frequent Research technology philosophy"
        title="Build for the Business. Design for the User. Engineer for What Comes Next."
        sub="Not a seven-step development process — how Frequent Research thinks about technology. Select a stage."
        center="Business-first technology"
        stages={txPhil([
          "Understand the business requirement, the users, the workflows and the constraints before choosing anything.",
          "Design the product experience and the technical direction together.",
          "Engineer the appropriate digital product — no more complex than it needs to be.",
          "Connect the systems, data and services around it.",
          "Use AI and automation where they create genuine value.",
          "Measure how the product performs and how people use it.",
          "Evolve the product as the business changes.",
        ])}
      />
      <TX_Make
        id="ith-make-h"
        title="What Are You Trying to Make Possible?"
        sub="Start with the outcome, not the technology. Choose the statement closest to your situation."
        cta="Discuss your requirement"
        formId={ITH_FORM}
        options={[
          ["I need a stronger digital presence.", "globe", "Website Development", "website-development", "A website built as a digital business experience — helping people find, understand, trust and act, and connected to the systems behind it.", ["Audience and journeys", "Content structure", "Integrations", "Analytics"]],
          ["I need to digitise a workflow.", "shuffle", "Web Application Development", "web-application-development", "A web application that turns spreadsheets, emails and manual approvals into a structured product with roles, rules and visibility.", ["Workflow mapping", "Roles and permissions", "Core workflow first", "Integrations"]],
          ["My users need a mobile experience.", "phone", "Mobile App Development", "mobile-app-development", "A mobile product designed around the moment of use and connected through a secure API to the business.", ["Moments of use", "Platform choice", "API and backend", "Notifications"]],
          ["I want to sell online.", "tag", "E-commerce Development", "e-commerce-development", "A commerce system — catalogue, discovery, checkout, payments, orders and fulfilment — not just a storefront.", ["Business model", "Platform choice", "Payments", "Inventory and ERP"]],
          ["Existing software doesn't fit my process.", "cpu", "Custom Software Development", "custom-software-development", "Software built around how the business actually works — after checking whether buying, extending or integrating would be enough.", ["Process mapping", "Build vs buy", "Legacy systems", "Data migration"]],
          ["I have a product idea or subscription platform.", "box", "SaaS Development", "saas-development", "A product designed to grow from MVP to multi-tenant platform, with billing, integrations and analytics planned in.", ["Core value", "MVP scope", "Tenancy model", "Pricing model"]],
        ]}
      />
      <TX_Products
        id="ith-pr-h"
        title="Six Ways to Build What Your Business Needs Next"
        sub="Six connected capabilities on one shared foundation. Select a product to see its path through API, data, cloud, security, AI and analytics."
        products={TX_PRODUCTS}
        foundation={TX_FOUND}
      />
      <DK3_Stack
        id="ith-cap-h"
        kicker="Business-first engineering"
        title="Technology Is a Business Capability."
        sub="Every layer exists because of the one above it. Select a layer to see its role."
        layers={[
          ["Business objective", "flag", ["Outcome", "Constraints", "Priorities"], "What the technology must make possible for the business."],
          ["Product experience", "compass", ["Users", "Journeys", "Interfaces"], "How people will actually use it."],
          ["Technology architecture", "layers", ["Structure", "Trade-offs", "Platform choice"], "The shape of the system — sized to the requirement."],
          ["Engineering", "cpu", ["Code", "Reviews", "Testing"], "Building it well enough to change safely later."],
          ["Integration", "shuffle", ["APIs", "Webhooks", "Data exchange"], "Connecting it to the systems the business relies on."],
          ["Data", "database", ["Models", "Quality", "Access"], "Information that can be trusted and used."],
          ["Intelligence", "bulb", ["AI", "Automation", "Insights"], "Where AI removes friction or adds understanding."],
          ["Measurement", "bars", ["Analytics", "Observability"], "Seeing how the product behaves and performs."],
          ["Evolution", "refresh", ["Releases", "Improvements", "Modernisation"], "Changing as the business changes."],
        ]}
      />
      <TX_Shift
        id="ith-shift-h"
        kicker="Product thinking before code"
        title="Technology Should Move the Business."
        sub="Not more technology — a better foundation for how the business works."
        before={["Disconnected tools", "Manual steps", "Repeated data entry", "Limited visibility", "Fragmented experience"]}
        after={["Connected workflow", "Structured experience", "Integrated systems", "Better visibility", "A digital product foundation"]}
        chain={["Business need", "Product thinking", "User experience", "Architecture", "Engineering", "Integration", "Intelligence", "Measurement", "Evolution"]}
      />
      <TX_Hub
        id="ith-int-h"
        title="Software Rarely Works Alone"
        sub="The strongest digital products rarely operate as isolated systems. API-first thinking connects them to the business."
        nodes={[
          ["CRM", "database", "Customer and account data consistent across every channel."],
          ["ERP", "box", "Orders, inventory and finance flowing without re-keying."],
          ["Payments", "tag", "Secure payments through supported providers."],
          ["Identity", "shield", "Single sign-on and centrally managed access where required."],
          ["Communication", "msg", "Email, SMS or WhatsApp triggered by real events."],
          ["Analytics", "bars", "Product and business data available for decisions."],
          ["Data", "layers", "Webhooks, queues, event-driven flows and background jobs keep data in sync."],
          ["Third-party APIs", "globe", "Services the product depends on, connected through their supported APIs."],
        ]}
        note="Specific integrations depend on the APIs and access each system supports."
      />
      <TX_Decide
        id="ith-dec-h"
        title="Build vs Buy vs Extend vs Integrate vs Modernize"
        sub="The answer isn't always “build from scratch.” Choose an option to see when it fits."
        core="The answer isn't always “build from scratch.”"
        options={[
          ["Buy", "tag", "Use existing software when standard functionality is enough.", ["The process is common across businesses", "Configuration covers the need", "Time to value matters most"], "Workarounds that appear after go-live."],
          ["Extend", "plus", "Enhance an existing platform when it is close to the requirement.", ["Most needs are already met", "The platform supports extensions or APIs", "The gap is specific and contained"], "Customisations that make upgrades difficult."],
          ["Integrate", "layers", "Connect systems when the required capabilities already exist separately.", ["Data is re-typed between tools", "Each system does its job well", "Cross-system visibility is missing"], "Integrations without clear data ownership."],
          ["Custom build", "cpu", "Create purpose-built software when the workflow or product is genuinely differentiated.", ["The process is core to how the business competes", "Standard tools force the business to change", "A new product is being created"], "Building what could have been bought."],
          ["Modernize", "refresh", "Improve or replace legacy technology selectively when it limits the business.", ["Critical logic lives in an old system", "Change is slow or risky", "Security or support is a concern"], "Rewriting everything when selective change would do."],
        ]}
      />
      <RL_AiLayer
        id="ith-ai-h"
        title="AI Where It Adds Intelligence. Engineering Where It Adds Reliability."
        sub="AI-assisted, human-led. AI supports the work — it does not independently build or control production systems."
        chain={TX_AI_CHAIN}
        ai={[
          ["Requirements & documentation", "Summaries and drafts for people to refine."],
          ["Code assistance", "Suggestions reviewed by engineers before use."],
          ["Test generation", "Test cases proposed, then checked and maintained."],
          ["Debugging support", "Faster diagnosis of errors and logs."],
          ["Analysis & classification", "Patterns in data, documents and feedback."],
        ]}
        human={TX_HUMAN}
      />
      <TX_Value
        id="ith-aiin-h"
        kicker="AI inside the product"
        title="AI Inside the Product: Purposeful → Permissioned → Governed → Observable"
        sub="AI features earn their place by removing friction, improving discovery, automating repetitive work or making information easier to use."
        tone="light"
        items={[
          ["Intelligent search", "search", "Natural-language discovery across content and records."],
          ["Document intelligence", "file", "Extract, classify and summarise documents."],
          ["Recommendations", "target", "Context-aware suggestions for each user."],
          ["Workflow assistance", "shuffle", "Help people complete complex tasks."],
          ["Natural-language analytics", "bars", "Ask questions about data in plain words."],
          ["Intelligent notifications", "msg", "Surface the events that matter."],
          ["Anomaly detection", "flag", "Identify unusual patterns early."],
          ["Conversational assistance", "users", "Help users navigate the product."],
        ]}
      />
      <TX_Assure
        id="ith-as-h"
        title="Security, Quality, Performance and Accessibility Are Part of the Product"
        sub="Considered throughout development — not checked at the end."
        tabs={[
          ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Roles", "API security", "Data protection", "Logging", "Monitoring", "Backup", "Secure deployment"], "Risk is reduced through design, testing and maintenance; no system is completely secure, and compliance is never guaranteed."],
          ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Functional testing", "Integration testing", "Performance", "Security", "Accessibility", "Regression", "UAT", "Release", "Monitoring"]],
          ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Responsive UI", "Optimised images", "Efficient JavaScript", "Loading states", "Caching", "Core Web Vitals considerations"]], ["Engineering", ["Efficient APIs", "Database strategy", "Caching", "Queues", "Background processing", "Resource scaling", "Observability"]]], "Performance targets are set and measured per project; no score is promised in advance."],
          ["Accessibility", "users", "WCAG-conscious design", "chips", [["Keyboard", "grid"], ["Contrast", "eyeoff"], ["Focus", "target"], ["Forms", "clipboard"], ["Screen readers", "msg"], ["Reduced motion", "sliders"], ["Error states", "flag"], ["Accessible tables & charts", "bars"]], "Designed with WCAG in mind; certification is not claimed."],
          ["Observability", "eyeoff", "If you can't see it, you can't improve it", "flow", ["Product", "Logs", "Metrics", "Traces", "Alerts", "Diagnosis", "Improvement"], "Errors, API latency, background jobs, queues, database health, infrastructure, releases and product behaviour are observed. No uptime percentage is promised."],
        ]}
      />
      <TX_Dash
        id="ith-dash-h"
        title="Build It. Then Learn From It."
        sub="Product analytics turn launch into learning — what people use, where they struggle and how the product performs."
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
      <TX_Evolve
        id="ith-ev-h"
        sub="Products that keep being useful are the ones that keep being improved."
        areas={["Bug fixes", "Dependency updates", "Security updates", "Compatibility", "Infrastructure", "Performance", "Analytics", "Integrations", "New features", "AI enhancements"]}
      />
      <DK3_Tech
        id="ith-tech-h"
        kicker="Technology ecosystem"
        title="The Technology Should Follow the Requirement."
        sub="Requirement → performance → security → maintainability → integration → cost → scalability → product roadmap → technology choice. Select a requirement."
        groups={[
          ["Frontend / Web", ["React", "Next.js"]],
          ["Backend", ["Node.js", "PHP / Laravel", "Python"]],
          ["Mobile", ["Flutter", "React Native"]],
          ["Cloud", ["AWS", "Azure", "Google Cloud"]],
        ]}
        needs={[
          ["Content-rich, fast website", ["React", "Next.js", "Node.js", "AWS"], "Search-friendly rendering and performance matter most."],
          ["Workflow application", ["React", "PHP / Laravel", "Node.js", "Azure"], "Maintainable business logic, roles and integrations come first."],
          ["Cross-platform mobile app", ["Flutter", "React Native", "Node.js", "Google Cloud"], "One codebase for both platforms, with a secure API behind it."],
          ["Data- or AI-heavy product", ["Next.js", "Python", "AWS", "Google Cloud"], "Data processing and AI services shape the backend choice."],
        ]}
        note="Common choices, not a fixed stack — technologies are confirmed after understanding the requirement. No partnerships or certifications are implied."
      />
      <TX_Value
        id="ith-val-h"
        sub="What the business gains — described as capabilities, not promised returns."
        items={[
          ["Simplify", "sliders", "Make complex workflows easier to navigate."],
          ["Connect", "layers", "Bring disconnected systems together."],
          ["Automate", "refresh", "Reduce repetitive work where appropriate."],
          ["Clarify", "eyeoff", "Make information easier to access and understand."],
          ["Personalize", "user", "Create role-appropriate experiences."],
          ["Measure", "bars", "Make product behaviour observable."],
          ["Adapt", "shuffle", "Make future changes easier."],
          ["Scale", "trend", "Prepare architecture for growing requirements where appropriate."],
        ]}
      />
      <TX_Diff
        id="ith-df-h"
        title="What Makes Frequent Research Different"
        sub="Ten ways of thinking that shape every website, application, app, store, system and SaaS product."
        items={[
          ["Business-first engineering", "flag", "Technology decisions start with the business requirement.", "Effort goes where it moves the business forward."],
          ["Product thinking before code", "compass", "The product is understood before features are simply converted into code.", "A product people use — not a list of features."],
          ["Right-sized architecture", "sliders", "No unnecessary complexity — and no shortcuts that block growth.", "The investment matches the need."],
          ["Experience + engineering", "users", "UX is considered alongside architecture rather than treated as decoration.", "Technology people actually want to use."],
          ["Integration-aware development", "layers", "Every product is considered within the wider technology ecosystem.", "Data flows instead of being re-typed."],
          ["AI where it adds value", "bulb", "AI is introduced where it genuinely improves the product, workflow or decision.", "Useful intelligence, not decoration."],
          ["Quality throughout the lifecycle", "check", "Testing, performance, accessibility, security and observability are considered throughout development.", "Fewer surprises after launch."],
          ["Build beyond launch", "rocket", "Launch is treated as a milestone, not the end of the product.", "The product keeps improving with use."],
          ["Technology that can evolve", "refresh", "Architecture accommodates likely future changes where requirements justify it.", "Today's product doesn't become tomorrow's technical problem."],
          ["Transparent technology decisions", "help", "Every technology choice has a stated reason, not a fashionable one.", "Decisions you can understand and own."],
        ]}
      />
      <RL_Beyond
        id="ith-more-h"
        kicker="More IT & Development capabilities"
        title="Capabilities That Support Every Product"
        sub="Specialised services that extend the six core product paths."
        center="IT & Development"
        links={[
          ["UI/UX Design", "Interfaces that are clear, accessible and pleasant to use.", ppIt("ui-ux-design"), "it"],
          ["API Development & Integration", "Make systems talk to each other.", ppIt("api-development-and-integration"), "it"],
          ["Cloud & DevOps Services", "Hosting, deployments, monitoring and backups.", ppIt("cloud-and-devops-services"), "it"],
          ["AI & Automation Solutions", "Practical AI and automation inside workflows.", ppIt("ai-and-automation-solutions"), "it"],
          ["CRM Development", "A CRM that fits the sales process.", ppIt("crm-development"), "it"],
          ["ERP Development", "Connect finance, inventory, HR and operations.", ppIt("erp-development"), "it"],
          ["Data Analytics & Dashboard Development", "Business performance in one place.", ppIt("data-analytics-and-dashboard-development"), "data"],
          ["Software Testing & QA", "Catch problems before customers do.", ppIt("software-testing-and-qa"), "it"],
          ["Cybersecurity Services", "Protect data, systems and customers.", ppIt("cybersecurity-services"), "it"],
          ["Application Maintenance & Support", "Keep products secure and improving.", ppIt("application-maintenance-and-support"), "it"],
          ["IT Consulting", "Technology direction before investment.", ppIt("it-consulting"), "it"],
        ]}
      />
      <DM_Faq id="ith-faq" title="IT & Development: Questions Worth Asking" items={ITH_FAQ} />
      <DK_Final
        id="ith-final-h"
        sig="Build for the Business. Design for the User. Engineer for What Comes Next."
        sigText="Useful technology. Thoughtful experiences. Strong foundations."
        title="Have a Technology Requirement That Needs More Than Code?"
        text="Tell us what the business needs to accomplish, what users need to do and what systems need to connect. We can help shape the right digital product direction."
        buttons={["Discuss Your Technology Requirement", "Request a Quote"]}
        formId={ITH_FORM}
      />
      <DM_Form
        id={ITH_FORM}
        kicker="Technology requirement"
        title="Discuss Your Technology Requirement"
        sub="Start with what the technology needs to make possible. We'll help identify the right starting point."
        type="IT & Development Enquiry"
        service="IT & Development"
        icon="cpu"
        submitLabel="Discuss My Requirement"
        successTitle="Thank you. Your technology requirement has been sent."
        msgLabel="Describe the requirement (optional)"
        msgPh="What should the technology make possible, who will use it and what does it need to connect to?"
        nextSteps={["We review your requirement and current systems.", "We contact you within one working day.", "You get a recommended product direction and next step."]}
        chips={[
          { k: "need", t: "Need", q: "What are you trying to make possible?", label: "Need", options: ["A stronger digital presence", "Digitise a workflow", "A mobile experience", "Sell online", "Software that fits our process", "A SaaS product", "Not sure yet"] },
          { k: "stage", t: "Stage", q: "Where are you now?", label: "Stage", options: ["Just an idea", "Requirements drafted", "Replacing an existing system", "Improving a live product", "Ready to start"] },
          { k: "budget", t: "Budget", q: "Budget (optional)", label: "Budget", optional: true, options: DK_BUDGET },
        ]}
      />
    </div>
  );
}

export { ITH_Page };
