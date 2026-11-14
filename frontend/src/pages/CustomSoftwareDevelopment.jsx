/*
 * Custom Software Development — /services/it-development/custom-software-development (URL unchanged)
 * Business-first technology page (build 33) on TX_Page. USP: business-specific software thinking.
 * Signature visual: TXV_Process (current process → rules, workflow, interface, automation, data, dashboard).
 * Adds: build / buy / extend / integrate / modernize decision, legacy modernisation path, data migration pipeline.
 * Kept from build 30: before/after automation, role-based access, the diagnostic quiz, the existing form.
 * No case study, no team details, no example boxes, no fixed efficiency claims.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_Ladder } from '../components/dm/kit.jsx';
import { DK_Guide, DK_Quiz, DK_Split } from '../components/dm/kit2.jsx';
import { DK3_Pipe, DK3_Roles } from '../components/dm/kit3.jsx';
import { TXV_Process, TX_Decide, TX_Page } from '../components/dm/itkit.jsx';

const CS_URL = "/services/it-development/custom-software-development";

const CS_TITLE = "Custom Software Development Services | Frequent Research";

const CS_FORM = "cs-project";

const CS_FAQ = [
  ["When does custom software make more sense than off-the-shelf software?", "When the workflow is genuinely specific to how the business operates or competes, when standard tools force workarounds, spreadsheets and duplicate entry, or when several tools still don't cover the process. When standard functionality is enough, buying, extending or integrating existing software is usually the better decision."],
  ["Can legacy systems be integrated instead of replaced?", "Often, yes. Key functions can be exposed through APIs, connected to new tools and modernised in phases. A full rewrite is only recommended when the existing system genuinely blocks the business — and even then, selective rebuilding usually carries less risk."],
  ["How should custom software be designed for future changes?", "By separating business rules, data and interfaces clearly, documenting decisions, using APIs between components and building in releases. The architecture should accommodate the changes the business can reasonably expect — without over-engineering for every possibility."],
  ["How is data migrated from old systems?", "Through a planned pipeline: assess, map, clean, transform, validate, migrate, reconcile and monitor — with backups and rollback planning. Downtime depends on the systems involved and is planned case by case."],
  ["Can AI be added to custom software?", "Yes, where it adds value — document processing, internal search, summarisation, classification, workflow assistance or decision support — with permissions, governance and human review."],
  ["Can you build a first module or MVP first?", "Yes. Starting with the workflow that matters most tests the core idea with real users before larger investment."],
  ["How much does custom software cost?", "It depends on users, modules, integrations, data migration, security needs and support, so a scoped estimate follows discovery rather than a generic price."],
  ["Who owns the source code?", "Ownership of source code, IP and deliverables depends on the project agreement, and is best agreed clearly before development starts."],
];

const CS_CFG = {
  key: "cs",
  pfx: "cs",
  slug: "custom-software-development",
  url: CS_URL,
  title: CS_TITLE,
  maTitle: "Custom Software Development Services",
  desc: "Custom software built around how the business actually works: unique workflows, rules, legacy systems, integrations and data — designed to keep evolving.",
  crumb: "Custom Software Development",
  name: "Custom Software Development",
  serviceType: "Custom software development",
  schemaDesc:
    "Business-first custom software development: business-specific workflows, proprietary processes, business rules, legacy integration and modernisation, internal applications, automation, integrations, dashboards, permissions, reporting, data migration, AI-assisted workflow intelligence and post-launch evolution.",
  formId: CS_FORM,
  hero: {
    kicker: "Business-specific software thinking",
    h1: "Custom Software Development",
    tag: "Build Software Around the Way Your Business Actually Works.",
    lead: "When off-the-shelf software forces the business to change its workflow, custom development can create a system around the requirement instead — and connect it to the systems already in place.",
    cta: "Discuss Your Software Requirement",
    cta2: "Explore Our Approach",
    trust: ["Unique workflows", "Business rules", "Legacy integration", "Automation", "AI where useful"],
    vis: <TXV_Process />,
  },
  statement: "Don't adapt the business to the software. Build software around the business.",
  statementFlow: ["Rules", "Workflow", "Interface", "Automation", "Data", "Dashboard"],
  caps: [
    ["Internal Applications", "grid"],
    ["Workflow Automation", "refresh"],
    ["Business Rules", "sliders"],
    ["Legacy Modernisation", "cpu"],
    ["Integrations", "layers"],
    ["Data Migration", "database"],
    ["Dashboards & Reporting", "bars"],
    ["Permissions", "shield"],
  ],
  problem: {
    title: "When the Software Doesn't Fit the Business",
    sub: "Most businesses don't need more software. They need software that matches how the work is actually done.",
    items: [
      ["Workarounds everywhere", "Spreadsheets fill the gaps the software leaves.", "grid"],
      ["Paying for tools that half-fit", "Several subscriptions, still no complete workflow.", "tag"],
      ["Rules nobody can see", "Policies and exceptions live in people's heads.", "help"],
      ["Legacy holding things back", "An old system no one wants to touch — and no one can replace.", "cpu"],
      ["Data in silos", "Every department has its own version of the truth.", "database"],
      ["Change is expensive", "Small process changes need big software projects.", "sliders"],
    ],
  },
  diff: {
    title: "Software That Starts From the Business, Not the Feature List",
    sub: "What changes when custom software is built around business-specific thinking.",
    items: [
      ["Business-first engineering", "flag", "Development starts by mapping how the business actually works — workflows, rules, exceptions, data and decisions.", "The software reflects the real operation, not an idealised one."],
      ["Transparent build decisions", "scale", "Buy, extend, integrate, modernise or build — the recommendation follows the requirement, and custom build is not assumed.", "Investment goes where custom software genuinely adds value."],
      ["Right-sized architecture", "sliders", "Architecture is sized to today's requirement while leaving room for the changes the business can expect.", "No over-engineering now, no dead end later."],
      ["Integration-aware development", "layers", "Existing systems — ERP, CRM, accounting, legacy platforms — are integrated rather than replaced where that is the better option.", "Less disruption, faster value."],
      ["Technology that can evolve", "refresh", "Rules, data and interfaces are separated and documented, and releases continue after launch.", "The software keeps fitting as the business changes."],
    ],
  },
  shift: {
    title: "From a Process That Depends on People to a Product That Supports Them",
    sub: "What changes when the workflow becomes software built around the business.",
    beforeLabel: "Current process",
    afterLabel: "Digital product",
    before: ["Manual", "Disconnected", "Repetitive", "Difficult to track"],
    after: ["Structured", "Connected", "Automated", "Observable"],
    chain: ["Rules", "Workflow", "Interface", "Automation", "Data", "Dashboard"],
  },
  capabilities: {
    title: "What Custom Software Can Include",
    sub: "Built around business-specific needs — each capability tied to what it makes possible.",
    layers: [
      ["Business-specific workflows", "shuffle", ["Unique processes", "Proprietary methods", "Exceptions"], "The way the business works becomes the way the software works."],
      ["Business rules engine", "sliders", ["Conditions", "Validations", "Approvals"], "Policies are applied consistently and can change without a rebuild."],
      ["Internal applications", "grid", ["Operations tools", "Back-office systems", "Portals"], "Daily work happens in one place."],
      ["Automation", "refresh", ["Notifications", "Scheduled jobs", "Document generation"], "Routine steps stop depending on someone remembering."],
      ["Integrations", "layers", ["ERP", "CRM", "Accounting", "Legacy systems"], "Data is entered once and flows everywhere it's needed."],
      ["Dashboards & reporting", "bars", ["Operational views", "Exports", "Audit trails"], "Leaders see status without chasing it."],
      ["Permissions", "shield", ["Roles", "Data access", "Audit logs"], "The right people see the right information."],
      ["Modernisation & migration", "cpu", ["Legacy assessment", "Phased replacement", "Data migration"], "Old systems are improved without stopping the business."],
    ],
  },
  loop: {
    title: "How Business Workflows Become Software",
    texts: [
      "Understand how the business really works — workflows, rules, exceptions, systems and constraints.",
      "Design the product experience and the architecture around that reality.",
      "Engineer in focused releases, starting with the workflow that matters most.",
      "Connect ERP, CRM, accounting, identity and legacy systems.",
      "Add intelligence — document processing, internal search, decision support — where it removes friction.",
      "Measure adoption, bottlenecks, errors and performance.",
      "Evolve rules and features as the business changes.",
    ],
  },
  ai: {
    sub: "AI inside custom software should make the business's own workflows smarter.",
    ai: [
      ["Workflow intelligence", "Spot bottlenecks and suggest next steps."],
      ["Document processing", "Extract, classify and summarise documents."],
      ["Internal search", "Find policies, records and answers in plain language."],
      ["Automation support", "Draft routine outputs for human approval."],
      ["Decision support", "Surface relevant data at the moment of decision."],
    ],
  },
  integrate: {
    title: "Custom Software Rarely Works Alone",
    sub: "Connect the systems the business already relies on instead of creating another isolated application.",
    center: "Custom software",
    nodes: [
      ["ERP", "box", "Finance, inventory and operations data flow without re-keying."],
      ["CRM", "database", "Customer and account data stays consistent."],
      ["Accounting", "file", "Invoices and entries align with the accounting system."],
      ["Legacy systems", "cpu", "Old platforms connected through APIs while they are modernised."],
      ["Identity", "shield", "Access managed centrally where required."],
      ["Communication", "msg", "Email, SMS or WhatsApp notifications triggered by real events."],
      ["Analytics", "bars", "Operational data available for dashboards and reporting."],
    ],
    note: "Integrations depend on the APIs and access each system supports.",
  },
  assure: {
    title: "Security, Quality and Reliability Are Part of the Architecture",
    tabs: [
      ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Roles", "API security", "Data protection", "Logging", "Monitoring", "Backup", "Secure deployment"], "Risk is reduced through design, testing and maintenance; no system is completely secure, and compliance depends on how the system is used."],
      ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Code review", "Functional testing", "Integration testing", "Performance", "Security", "Regression", "UAT", "Release", "Monitoring"]],
      ["Observability", "eyeoff", "If you can't see it, you can't improve it", "flow", ["Product", "Logs", "Metrics", "Traces", "Alerts", "Diagnosis", "Improvement"], "Errors, API latency, background jobs, queues, database health and releases are observed. No uptime percentage is promised."],
      ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Responsive UI", "Loading states", "Efficient front end"]], ["Engineering", ["Efficient APIs", "Database strategy", "Caching", "Queues and background processing"]]]],
    ],
  },
  evolve: {
    sub: "Custom software stays valuable only if it keeps changing with the business.",
    areas: ["Bug fixes", "Dependency and security updates", "Rule changes", "New modules", "New integrations", "AI enhancements"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["Custom only where it counts", "Buy, extend or integrate when that's better.", "scale"],
      ["The business stays in shape", "Software follows the workflow.", "shuffle"],
      ["Legacy is an asset", "Integrate and modernise before rewriting.", "cpu"],
      ["Rules you can change", "Policies live in configurable logic.", "sliders"],
      ["Visible operations", "Dashboards and audit trails built in.", "bars"],
      ["Built to evolve", "Releases continue after launch.", "refresh"],
    ],
  },
  related: {
    title: "Where Custom Software Connects Next",
    sub: "Business-specific software often extends into other channels and products.",
    links: [
      ["Web Application Development", "Browser-based workflows for internal and external users.", ppIt("web-application-development"), "it"],
      ["SaaS Development", "When the software becomes a product for other businesses.", ppIt("saas-development"), "it"],
      ["Mobile App Development", "Field and on-the-go access to the same system.", ppIt("mobile-app-development"), "it"],
      ["ERP Development", "Connect finance, inventory, HR and operations.", ppIt("erp-development"), "it"],
      ["AI & Automation Solutions", "Practical automation and AI inside existing workflows.", ppIt("ai-and-automation-solutions"), "it"],
    ],
  },
  faq: CS_FAQ,
  faqTitle: "Custom Software Development: Questions Worth Asking",
  final: {
    sigText: "Software built around business workflows, user experience and the systems that keep the business moving.",
    title: "Have a Workflow That Off-the-Shelf Software Doesn't Fit?",
    text: "Tell us how the business works today, where the friction is and which systems are involved. We'll help decide whether to buy, extend, integrate, modernise or build.",
  },
};

function CS_Page() {
  return (
    <TX_Page
      c={{
        ...CS_CFG,
        visuals: (
          <>
                  <DK_Split
        id="cs-auto-h"
        kicker="Workflow automation"
        title="Before and After Automation"
        states={[
          ["Before", "Manual, scattered, slow", ["Form arrives by email", "Copied into a spreadsheet", "Manager chased for approval", "Re-typed into accounts", "Status unknown"], "Every hand-off is a chance for delay or error."],
          ["After", "Connected, visible, traceable", ["Form submitted in the system", "Validated automatically", "Routed to the right approver", "Synced to accounts", "Status visible to all"], "People handle exceptions — the system handles routine."],
        ]}
        caption="Every process is mapped individually."
      />
            <TX_Decide
              id="cs-dec-h"
              title="The Answer Isn't Always “Build From Scratch.”"
              sub="Five ways to solve a software problem. Choose one to see when it fits."
              core="Custom software is the right answer only when the workflow genuinely needs it."
              options={[
                ["Buy", "tag", "Standard functionality covers the requirement.", ["The process is common across businesses", "Configuration is enough", "Speed matters more than fit"], "Workarounds and spreadsheets that appear after go-live."],
                ["Extend", "plus", "An existing platform is close to the requirement.", ["Most needs are already met", "The platform supports extensions or APIs", "The gap is specific and contained"], "Customisations that make upgrades difficult."],
                ["Integrate", "layers", "The capabilities exist — just in separate systems.", ["Data is re-typed between tools", "Each system does its job well", "Visibility across systems is missing"], "Integrations without clear ownership of data."],
                ["Custom build", "cpu", "The workflow or product capability is genuinely differentiated.", ["The process is core to how the business competes", "Standard tools force the business to change", "Several tools still don't cover it"], "Building what could have been bought."],
                ["Modernize", "refresh", "Legacy technology is limiting the business.", ["The old system still holds critical logic or data", "Change is slow or risky", "Security or support is a concern"], "Rewriting everything at once when selective change would do."],
              ]}
            />
                  <DK3_Roles
        id="cs-roles-h"
        kicker="Role-based access"
        title="Everyone Sees What They Need — and Nothing More"
        sub="Choose a role to see how access changes."
        appName="Operations app"
        roles={[
          ["Admin", "shield", "Configures users, permissions, rules and integrations."],
          ["Manager", "bars", "Approves work and sees performance."],
          ["Operations", "refresh", "Processes tasks and updates records."],
          ["Finance", "file", "Reviews invoices, payments and reports."],
          ["Customer", "user", "Submits requests and tracks status."],
        ]}
        modules={[
          ["Requests", "msg"],
          ["Approvals", "check"],
          ["Tasks", "clipboard"],
          ["Invoices", "file"],
          ["Reports", "bars"],
          ["Settings", "sliders"],
        ]}
        access={[
          [0, 1, 2, 3, 4, 5],
          [0, 1, 2, 4],
          [0, 2],
          [3, 4],
          [0],
        ]}
      />
          </>
        ),
        after: (
          <>
            <DK_Ladder
              id="cs-legacy-h"
              kicker="Legacy modernisation"
              title="You Don't Always Need to Start Again."
              steps={[
                ["Assess", "Understand the current system, its users, data, logic and risks."],
                ["Integrate", "Expose key functions through APIs so new tools can connect."],
                ["Modernize", "Improve or re-platform the parts that limit the business."],
                ["Migrate", "Move data and users in planned, reversible steps."],
                ["Selective rebuild", "Rebuild only the modules that genuinely need it."],
                ["Monitor", "Watch errors, performance and adoption closely after each change."],
                ["Improve", "Keep refining once the new foundation is in place."],
              ]}
              note="Approaches include integrate, extend, re-platform, migrate, modernize and selectively rebuild — not every legacy system needs a complete rewrite."
            />
            <DK3_Pipe
              id="cs-mig-h"
              kicker="Data migration"
              title="Move the Data Without Losing Trust in It"
              runLabel="Migration pipeline"
              stages={[
                ["Assess", "search", "Sources, volumes and quality"],
                ["Map", "map", "Fields and relationships matched"],
                ["Clean", "refresh", "Duplicates and gaps resolved"],
                ["Transform", "shuffle", "Formats converted to the new model"],
                ["Validate", "check", "Rules and samples checked"],
                ["Migrate", "database", "Loaded in planned batches"],
                ["Reconcile", "scale", "Totals and records compared"],
                ["Monitor", "eyeoff", "Issues caught after go-live"],
              ]}
              note="Backups and rollback planning are part of every migration. Downtime depends on the systems involved and is planned case by case."
            />
                  <DK_Quiz
        id="cs-quiz-h"
        kicker="Diagnostic"
        title="Do You Need Custom Software?"
        sub="Answer honestly. The result may point to a different solution — that's useful too."
        count="yes"
        threshold={3}
        questions={[
          "Do people copy data between systems or spreadsheets every week?",
          "Does your process differ meaningfully from how standard tools work?",
          "Are you paying for several tools that still don't cover the workflow?",
          "Do approvals or hand-offs regularly get stuck or lost?",
          "Would better data in one place change decisions?",
          "Is the workflow core to how you compete or serve customers?",
        ]}
        result={[
          "Custom software is worth exploring.",
          "You may not need custom software yet — configuring or integrating existing tools could be enough.",
          "Answer all six for a suggestion.",
        ]}
        cta="Talk Through My Answers"
        formId={CS_FORM}
      />
          </>
        ),
        guideNode:       <DK_Guide
        id="cs-guide-h"
        title="Custom Software Development: When Off-the-Shelf Isn’t Enough, and How to Build It Right"
        cover={["Guide", "Custom Software", "Build · Buy · Integrate"]}
        topics={["Build or buy?", "Defining requirements", "Choosing an approach", "Running the project", "Security and quality", "Life after launch"]}
        to="/blog/custom-software-development-guide"
      />,
        formNode:       <DM_Form
        id={CS_FORM}
        kicker="Software project"
        title="Discuss Your Software Requirement"
        sub="Seven short steps. We'll come back with questions, options and a recommended next step."
        type="Custom Software Development Enquiry"
        service="Custom Software Development"
        icon="cpu"
        submitLabel="Discuss My Software Requirement"
        successTitle="Thank you. Your software project request has been sent."
        siteLabel="Website or system URL (optional)"
        msgLabel="Project details (optional)"
        msgPh="Workflow, users, integrations, timelines — whatever you know so far"
        nextSteps={["We review your workflow and current systems.", "We contact you within one working day.", "You get questions, options and a recommended next step."]}
        chips={[
          { k: "build", t: "Build", q: "What do you want to build?", label: "Build type", options: ["Business application", "Workflow / approval system", "Portal", "Dashboard / reporting", "Integration", "AI-enabled feature", "Legacy modernisation", "SaaS product", "Not sure yet"] },
          { k: "problem", t: "Problem", q: "What problem are you solving?", label: "Problem", multi: true, options: ["Manual work", "Disconnected systems", "Spreadsheet sprawl", "Slow approvals", "No visibility", "Outdated software", "Scaling issues", "New product idea"] },
          { k: "systems", t: "Systems", q: "Which systems do you use today?", label: "Current systems", text: true, optional: true, icon: "layers", ph: "e.g. Excel, Tally, Zoho CRM, SAP" },
          { k: "users", t: "Users", q: "Who will use the software?", label: "Target users", multi: true, options: ["Internal team", "Managers", "Customers", "Partners / vendors", "Field staff", "Public users"] },
          { k: "stage", t: "Stage", q: "Where is the project now?", label: "Project stage", options: ["Just an idea", "Requirements drafted", "Prototype / MVP exists", "Replacing an existing system", "Ready to start"] },
        ]}
      />,
      }}
    />
  );
}

export { CS_Page };
