/*
 * Web Application Development — /services/it-development/web-application-development (URL unchanged)
 * Business-first technology page (build 33) on TX_Page. USP: workflow-to-product thinking.
 * Signature visual: TXV_Workflow (spreadsheet, email, manual task, approval, phone → application, role, action, rule, data, dashboard).
 * Kept from build 30: role-based views, interface anatomy, website / web app / custom software tree, the existing form.
 * No case study, no team details, no example boxes, no invented numbers.
 */
import * as ee from 'react';
import { DM_Form, ppIt } from '../components/dm/shared.jsx';
import { DK_Anatomy, DK_Guide, DK_Tree } from '../components/dm/kit2.jsx';
import { DK3_Roles } from '../components/dm/kit3.jsx';
import { TXV_Workflow, TX_Page } from '../components/dm/itkit.jsx';

const WB_URL = "/services/it-development/web-application-development";

const WB_TITLE = "Web Application Development Services | Frequent Research";

const WB_FORM = "wb-project";

const WB_FAQ = [
  ["When should a business build a web application?", "When important work depends on spreadsheets, email threads, manual approvals or disconnected tools — and the business needs the same process to run reliably for more people, with clear roles, rules and visibility. If an existing product already fits the workflow, buying or extending it may be the better route."],
  ["Can existing workflows be converted into a digital application?", "Yes — but the opportunity is not simply to digitise them. The workflow is mapped first: who does what, which rules apply, where approvals sit and what data is needed. Then the application is designed around how the work should happen."],
  ["Can a web application integrate with existing systems?", "Yes, using the supported APIs of CRM, ERP, payment, identity, communication or analytics systems, or agreed data-exchange methods such as webhooks, scheduled imports or queues."],
  ["How are roles and permissions handled?", "Roles are defined around real responsibilities — admin, manager, operator, customer, partner, approver — and each sees only the screens, data and actions they need. Every request passes through authentication and permission checks, and important actions can be logged."],
  ["What's the difference between a website and a web application?", "A website helps people discover and understand a business. A web application helps them do something — submit, approve, track, book, analyse — usually behind a login."],
  ["Will a web application work on mobile?", "Responsive design makes it usable in mobile browsers. If offline use or device features matter, a mobile app or progressive web app can be considered."],
  ["How long does it take to build a web application?", "It depends on scope. Many projects start with the core workflow, then grow in planned releases as usage shows what matters next."],
  ["How much does web application development cost?", "It depends on users and roles, workflows, integrations, data, security and support, so an estimate follows discovery rather than a generic price."],
  ["Who owns the source code?", "Ownership of source code and IP depends on the project agreement, and is best agreed clearly before development begins."],
];

const WB_CFG = {
  key: "wb",
  pfx: "wb",
  slug: "web-application-development",
  url: WB_URL,
  title: WB_TITLE,
  maTitle: "Web Application Development Services",
  desc: "Web application development that turns disconnected workflows into products people can use: roles, rules, approvals, integrations and clear visibility.",
  crumb: "Web Application Development",
  name: "Web Application Development",
  serviceType: "Web application development",
  schemaDesc:
    "Business-first web application development: workflow-to-product thinking, role-based workflows, approvals, business rules, dashboards, integrations, permissions, reporting, AI-assisted document processing and search, security, quality and post-launch evolution.",
  formId: WB_FORM,
  hero: {
    kicker: "Workflow-to-product thinking",
    h1: "Web Application Development",
    tag: "Turn Business Complexity Into a Product People Can Actually Use.",
    lead: "When a workflow lives across spreadsheets, email, manual approvals and disconnected systems, the opportunity is not simply to digitise it. It is to rethink how the work should happen.",
    cta: "Discuss Your Web Application",
    cta2: "Explore Our Approach",
    trust: ["Role-based workflows", "Business rules", "Integrations", "Operational visibility", "AI where useful"],
    vis: <TXV_Workflow />,
  },
  statement: "Don't just digitise the workflow. Design how the work should happen.",
  statementFlow: ["Disconnected work", "Structured workflow", "Digital actions", "Connected data", "Operational visibility"],
  caps: [
    ["Portals", "globe"],
    ["Dashboards", "bars"],
    ["Approvals", "check"],
    ["Business Rules", "sliders"],
    ["Roles & Permissions", "shield"],
    ["Integrations", "layers"],
    ["Reporting", "file"],
    ["Automation", "refresh"],
  ],
  problem: {
    title: "When the Work Lives Everywhere Except One Place",
    sub: "Most operational problems aren't caused by people. They're caused by work spread across tools that don't talk to each other.",
    items: [
      ["Spreadsheets as systems", "Critical data in files that only one person understands.", "grid"],
      ["Approvals by email", "Decisions buried in threads with no status or audit trail.", "msg"],
      ["Re-keying data", "The same information typed into three different tools.", "refresh"],
      ["No single view", "Managers ask for updates instead of seeing them.", "eyeoff"],
      ["Rules in people's heads", "Exceptions and policies applied inconsistently.", "help"],
      ["Tools that don't fit", "Generic software bent around a workflow it wasn't designed for.", "shuffle"],
    ],
  },
  diff: {
    title: "Applications Designed Around the Work, Not Just the Screens",
    sub: "What changes when a web application starts from the workflow rather than a feature list.",
    items: [
      ["Product thinking before code", "compass", "The workflow is understood first — roles, decisions, exceptions and data — before requirements become screens.", "The application solves the real process, not a copy of the old one."],
      ["Workflow-to-product design", "shuffle", "Each step becomes a clear action for a defined role, governed by explicit rules.", "Work moves forward without chasing people for status."],
      ["Experience + engineering", "grid", "Dense operational interfaces are designed for speed: filters, bulk actions, clear states and useful errors.", "People adopt the tool because it is faster than the workaround."],
      ["Integration-aware development", "layers", "CRM, ERP, identity, payments and communication systems are part of the design, not an afterthought.", "Data is entered once and flows where it's needed."],
      ["Transparent technology decisions", "flag", "Architecture, frameworks and hosting are chosen for a stated reason — maintainability, performance or integration fit.", "Fewer surprises when the application needs to change."],
    ],
  },
  shift: {
    title: "From Disconnected Work to Operational Visibility",
    sub: "What changes for the business when a workflow becomes a product.",
    before: ["Spreadsheets and email threads", "Manual approvals", "Repeated data entry", "Status by asking around", "Rules applied inconsistently"],
    after: ["One structured workflow", "Approvals with clear ownership", "Data entered once", "Live status for every role", "Rules built into the product"],
    chain: ["Disconnected work", "Structured workflow", "Digital actions", "Connected data", "Operational visibility"],
    beforeLabel: "Disconnected work",
    afterLabel: "Structured product",
  },
  capabilities: {
    title: "What a Web Application Can Include",
    sub: "Each capability is there because of what it makes easier.",
    layers: [
      ["Role-based workflows", "users", ["Admin", "Manager", "Operator", "Customer", "Partner"], "Everyone sees the work that is theirs to do."],
      ["Approvals & business rules", "check", ["Multi-step approvals", "Conditions", "Escalations"], "Decisions are consistent and traceable."],
      ["Dashboards & reporting", "bars", ["Operational dashboards", "Exports", "Scheduled reports"], "Status is visible without asking."],
      ["Permissions & access", "shield", ["Authentication", "Role permissions", "Audit logs", "SSO / MFA where required"], "The right people see the right data."],
      ["Integrations & APIs", "layers", ["CRM", "ERP", "Payments", "Identity", "Webhooks"], "Data flows between systems instead of being re-typed."],
      ["Automation", "refresh", ["Notifications", "Scheduled jobs", "Background processing"], "Routine steps happen without manual effort."],
      ["Data & search", "database", ["Data models", "Filters", "Search"], "Information is easy to find and trust."],
      ["Operational interfaces", "grid", ["Tables", "Bulk actions", "Clear states"], "Daily work gets faster, not harder."],
    ],
  },
  loop: {
    title: "How a Workflow Becomes a Product",
    texts: [
      "Understand the workflow: who is involved, which decisions are made, where it breaks and what data matters.",
      "Design roles, screens, rules and the technical architecture around how the work should happen.",
      "Engineer the application in focused releases, starting with the workflow that matters most.",
      "Connect identity, CRM, ERP, payments, communication and data sources.",
      "Add intelligence — document processing, search, assistance — where it removes friction.",
      "Measure usage, bottlenecks, errors and performance.",
      "Evolve the product as the workflow, users and business change.",
    ],
  },
  ai: {
    sub: "AI inside a web application should help people complete work — not add a chatbot for its own sake.",
    ai: [
      ["Document processing", "Extract, classify and summarise incoming documents."],
      ["Workflow assistance", "Suggest next steps in complex tasks."],
      ["Intelligent search", "Find records and answers in natural language."],
      ["Recommendations", "Context-aware suggestions for the user's role."],
      ["Natural-language interaction", "Ask questions about the data in plain words."],
    ],
  },
  integrate: {
    title: "Software Rarely Works Alone",
    sub: "Connect the systems the business already relies on instead of creating another isolated application.",
    center: "Web application",
    nodes: [
      ["CRM", "database", "Customer and account data stays consistent across sales and operations."],
      ["ERP", "box", "Orders, inventory and finance data flow without re-keying."],
      ["Identity", "shield", "Single sign-on and centrally managed access where required."],
      ["Payments", "tag", "Payments and invoices through supported providers."],
      ["Communication", "msg", "Email, SMS or WhatsApp notifications triggered by real events."],
      ["Analytics", "bars", "Usage and operational data available for reporting."],
      ["Third-party APIs", "layers", "Webhooks, queues and background jobs keep systems in sync."],
    ],
    note: "Integrations depend on the APIs and access each system supports.",
  },
  assure: {
    title: "Security, Quality and Performance Are Part of the Architecture",
    tabs: [
      ["Security", "shield", "Security should be part of the architecture", "layers", ["Identity", "Authentication", "Authorization", "Roles", "API security", "Data protection", "Logging", "Monitoring", "Backup", "Secure deployment"], "Risk is reduced through design, testing and maintenance; no system is completely secure."],
      ["Quality", "check", "Quality is built into the product lifecycle", "flow", ["Requirement", "UX validation", "Development", "Functional testing", "Integration testing", "Performance", "Security", "Accessibility", "Regression", "UAT", "Release", "Monitoring"]],
      ["Performance", "rocket", "Performance is part of the product experience", "cols", [["Experience", ["Responsive UI", "Loading states", "Efficient JavaScript", "Pagination and filters"]], ["Engineering", ["Efficient APIs", "Database strategy", "Caching", "Queues and background jobs", "Observability"]]], "Performance targets are set and measured per project; no score is promised in advance."],
      ["Accessibility", "users", "WCAG-conscious interfaces", "chips", [["Keyboard", "grid"], ["Focus", "target"], ["Contrast", "eyeoff"], ["Forms", "clipboard"], ["Accessible tables", "database"], ["Error states", "flag"]], "Designed with WCAG in mind; certification is not claimed."],
    ],
  },
  evolve: {
    sub: "The first release covers the workflow that matters most. Usage shows what comes next.",
    areas: ["Bug fixes", "Dependency and security updates", "New roles and workflows", "New integrations", "Performance tuning", "AI enhancements"],
  },
  why: {
    title: "Why This Approach Matters",
    items: [
      ["The workflow comes first", "Screens follow the work, not the other way round.", "shuffle"],
      ["Rules are explicit", "Policies live in the product, not in people's heads.", "sliders"],
      ["Built for every role", "Focused views for each responsibility.", "users"],
      ["Connected by design", "Data flows between existing systems.", "layers"],
      ["Visible operations", "Status and bottlenecks are easy to see.", "bars"],
      ["Ready to evolve", "Releases follow real usage.", "refresh"],
    ],
  },
  related: {
    title: "Where a Web Application Connects Next",
    sub: "Web applications often sit at the centre of a wider product.",
    links: [
      ["Custom Software Development", "When the whole operation needs software built around it.", ppIt("custom-software-development"), "it"],
      ["Mobile App Development", "When field or customer users need a mobile experience.", ppIt("mobile-app-development"), "it"],
      ["SaaS Development", "When the application becomes a product sold to many customers.", ppIt("saas-development"), "it"],
      ["API Development & Integration", "Connect the application to the systems around it.", ppIt("api-development-and-integration"), "it"],
      ["Data Analytics & Dashboard Development", "Turn operational data into dashboards.", ppIt("data-analytics-and-dashboard-development"), "data"],
    ],
  },
  faq: WB_FAQ,
  faqTitle: "Web Application Development: Questions Worth Asking",
  final: {
    sigText: "Web applications built around business workflows, the people who use them and the systems they connect to.",
    title: "Have a Workflow That Needs More Than Another Spreadsheet?",
    text: "Tell us how the work happens today, who is involved and which systems it touches. We'll help shape the right product direction.",
  },
};

function WB_Page() {
  return (
    <TX_Page
      c={{
        ...WB_CFG,
        visuals: (
          <>
                  <DK3_Roles
        id="wb-roles-h"
        tone="off"
        kicker="Role-based experiences"
        title="One Application. Different Views for Every Role."
        sub="Choose a role."
        appName="Operations portal"
        roles={[
          ["Admin", "shield", "Manages users, permissions, settings and integrations."],
          ["Manager", "bars", "Sees workload, approvals and performance."],
          ["Operations", "refresh", "Handles requests, tasks and updates."],
          ["Customer", "user", "Submits requests, tracks status and downloads documents."],
          ["Partner", "users", "Places orders, checks pricing and accesses resources."],
        ]}
        modules={[
          ["Dashboard", "bars"],
          ["Requests", "msg"],
          ["Approvals", "check"],
          ["Orders", "box"],
          ["Documents", "file"],
          ["Users & settings", "sliders"],
        ]}
        access={[
          [0, 1, 2, 3, 4, 5],
          [0, 1, 2, 3, 4],
          [0, 1, 3, 4],
          [1, 4],
          [3, 4],
        ]}
      />
                  <DK_Anatomy
        id="wb-ui-h"
        kicker="Front-end"
        title="The Interface Is Part of the Product"
        sub="Select an interface element to see the job it does."
        pageLabel="Application screen"
        blocks={[
          ["Navigation", "Orientation", "Where can I go, and what can I do?", "grid", "lg"],
          ["Summary cards", "Status", "What needs my attention right now?", "flag", "sm"],
          ["Filters", "Focus", "Show me only what matters to me.", "sliders", "sm"],
          ["Data table", "Work", "Find, sort and act on records.", "database", "lg"],
          ["Actions", "Progress", "Approve, assign, update — in one click.", "check", "sm"],
          ["Notifications", "Awareness", "What changed since I last looked?", "msg", "sm"],
        ]}
      />
          </>
        ),
        after: (
          <>
                  <DK_Tree
        id="wb-dec-h"
        kicker="Website, web app or custom software?"
        title="Find the Right Starting Point"
        start="What do you need people to do?"
        startIcon="help"
        items={[
          ["Mainly read, discover and enquire?", "A website is usually enough.", "globe", "Website"],
          ["Log in and complete tasks in a browser?", "A web application fits.", "grid", "Web app"],
          ["Run a whole operation with many modules?", "Custom software (often web-based).", "cpu", "Custom software"],
        ]}
        end="Still unsure? A short discovery call will clarify it."
      />
          </>
        ),
        guideNode:       <DK_Guide
        id="wb-guide-h"
        title="Web Application Development: Building Portals, Dashboards and Tools That Run in the Browser"
        cover={["Guide", "Web Applications", "Portals · Dashboards · Tools"]}
        topics={["Common use cases", "Defining users and workflows", "Security and access", "Hosting and performance", "Maintenance and growth"]}
        to="/blog/web-application-development-guide"
      />,
        formNode:       <DM_Form
        id={WB_FORM}
        kicker="Web application project"
        title="Discuss Your Web Application"
        sub="Six quick steps. No marketing budget questions — just what we need to understand the requirement."
        type="Web Application Development Enquiry"
        service="Web Application Development"
        icon="grid"
        submitLabel="Discuss My Web Application"
        successTitle="Thank you. Your web application request has been sent."
        siteLabel="Current website or app URL (optional)"
        msgLabel="Requirement details (optional)"
        msgPh="Users, workflows, integrations, timelines — whatever you know so far"
        nextSteps={["We review your requirement and current systems.", "We contact you within one working day.", "You get questions, options and a recommended next step."]}
        chips={[
          { k: "build", t: "Type", q: "What are you building?", label: "Application type", options: ["Customer portal", "Partner / vendor portal", "Dashboard", "Workflow / approval tool", "Booking system", "SaaS platform", "Internal business app", "Not sure yet"] },
          { k: "problem", t: "Problem", q: "What problem are you solving?", label: "Problem", multi: true, options: ["Manual work", "Slow approvals", "No visibility", "Spreadsheet sprawl", "Customer self-service", "Disconnected systems", "New product idea"] },
          { k: "systems", t: "Systems", q: "Which systems must it connect to?", label: "Current systems", text: true, optional: true, icon: "layers", ph: "e.g. Zoho CRM, SAP, Razorpay, Excel" },
          { k: "users", t: "Users", q: "Who will use it?", label: "Target users", multi: true, options: ["Internal team", "Managers", "Customers", "Partners / vendors", "Field staff", "Public users"] },
          { k: "stage", t: "Stage", q: "Where is the project now?", label: "Project stage", options: ["Just an idea", "Requirements drafted", "Designs exist", "Replacing an existing system", "Ready to start"] },
        ]}
      />,
      }}
    />
  );
}

export { WB_Page };
