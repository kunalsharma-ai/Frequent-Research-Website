/*
 * Custom Business Applications — /services/it-development/custom-business-applications (URL unchanged)
 * Build 42 rethink: "Don't force your business into software. Build software around the way your business actually works."
 * Signature visuals: Business Operating Flow (manual → connected → automated → intelligent), Intelligence Layer, Control Room.
 * No case studies, team details, example boxes, invented numbers, partnerships or certifications.
 * No market-research positioning — this is an IT & Development page.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppIt } from '../components/dm/shared.jsx';
import { IX_Ask, IX_Band, IX_Chain, IX_Control, IX_Eco, IX_Event, IX_Final, IX_Flows, IX_Fragment, IX_Graph, IX_Guide, IX_Hero, IX_Industries, IX_Layers, IX_Matrix, IX_Motto, IX_Options, IX_Related, IX_Roles, IX_Sec, IX_Stack, IX_Timeline, IX_Tree, IX_Trust, IX_Why, ixSchema } from '../components/dm/ixkit.jsx';

const CBA_URL = "/services/it-development/custom-business-applications";
const CBA_TITLE = "Custom Business Applications That Fit | Frequent Research";
const CBA_DESC = "Custom business applications that connect workflows, approvals, documents and systems, automate repetitive work and add practical AI, built around how you work.";
const CBA_FORM = "cba-project";

const CBA_FAQ = [
  ["What are custom business applications?", "Software built around a specific organisation's workflows — portals, approval systems, operational tools, dashboards or mobile apps — designed to connect people, data and existing systems instead of forcing work into generic software."],
  ["When does a business need a custom application?", "When work runs on spreadsheets, email and manual follow-ups, systems don't talk to each other, or off-the-shelf tools force awkward workarounds. If an existing platform already solves the problem, configuring it may be better."],
  ["How much does custom business application development cost?", "It depends on workflows, users and roles, integrations, data, automation, AI features, security and platforms, so an estimate follows discovery rather than a generic price."],
  ["How long does a custom business application take to build?", "A focused first release around the core workflow can be delivered in phases, with further capabilities added over time; the timeline is agreed after discovery."],
  ["Can you integrate our existing ERP, CRM or other software?", "Yes. Applications can connect to ERP, CRM, accounting, HR, e-commerce, payments, email and existing databases through APIs and the access each system supports."],
  ["Can AI be added to a custom business application?", "Yes, where it removes effort: document processing, classification, natural-language search, summaries and workflow intelligence — designed with permissions and human control."],
  ["Can we start with an MVP and expand later?", "Yes. Starting with the highest-value workflow and expanding in phases is usually the safest and most economical route, as long as the architecture is planned for growth."],
  ["Will we own the source code and application?", "Ownership of source code, designs and documentation is set out in the project agreement and is intended to stay with the client."],
];

function CBA_Page() {
  usePageMeta("Custom Business Applications", CBA_DESC);
  dmMeta(CBA_URL, CBA_TITLE, CBA_DESC);
  ixSchema("cba", {
    url: CBA_URL,
    crumb: "Custom Business Applications",
    name: "Custom Business Applications",
    serviceType: "Custom business application development",
    schemaDesc:
      "Custom business applications built around how work moves: internal operations tools, employee and customer portals, approval and workflow systems, document management, finance and administration workflows, field and mobile applications, management dashboards, API integration with ERP, CRM and existing software, AI-assisted document processing, classification, search and workflow intelligence, security, ownership and long-term support.",
    faq: CBA_FAQ,
  });
  return (
    <div className="pp sm dk ix-page cba-svc">
      <IX_Hero
        id="cba-h1"
        crumb="Custom Business Applications"
        kicker="Custom Business Applications · Business-first software engineering"
        h1="Custom Business Applications Built Around How Your Business Actually Works"
        lead="Your workflows, approvals, documents and decisions don't fit neatly into generic software. Frequent Research builds custom business applications that connect those moving parts, automate repetitive work and give people a clearer way to get things done."
        cta={["Build My Business Application", CBA_FORM]}
        cta2={["Discuss My Requirement", CBA_FORM]}
        cta3={["Explore what we can build", "cba-cap-h"]}
        points={["Workflow before features", "Integration before replacement", "AI where it matters", "Ownership without lock-in"]}
      >
        <IX_Graph
          center="Business"
          centerIcon="building"
          title="Manual → Connected → Automated → Intelligent"
          label="Business operating flow: the business at the centre, connected to customers, employees, finance, operations, documents, approvals, inventory, sales, vendors, existing software, APIs and AI. The view moves from manual work to connected, automated and intelligent work."
          nodes={[
            ["Customers", "user"],
            ["Employees", "users"],
            ["Finance", "coin"],
            ["Operations", "sliders"],
            ["Documents", "doc"],
            ["Approvals", "check"],
            ["Inventory", "box"],
            ["Sales", "trend"],
            ["Vendors", "truck"],
            ["Existing software", "cpu"],
            ["APIs", "link"],
            ["AI & analytics", "spark"],
          ]}
          links={[
            [1, 5],
            [5, 2],
            [4, 5],
            [0, 7],
            [7, 6],
            [6, 8],
            [3, 6],
            [9, 10],
            [10, 2],
            [10, 7],
            [11, 3],
            [11, 4],
          ]}
          journey={[
            ["Manual", [4, 1]],
            ["Connected", [9, 10, 2, 7]],
            ["Automated", [5, 3, 6, 8]],
            ["Intelligent", [11, 0, 3]],
          ]}
        />
      </IX_Hero>

      <IX_Band tone="off" micro={["Business before technology", "Workflow before features", "People stay in control"]} text="Don't force your business into software. Build software around the way your business actually works." />

      {/* Problem */}
      <IX_Sec id="cba-prob-h" tone="light" k="The real problem" t="Your business is already unique. Why should your software be generic?" s="A typical request touches a spreadsheet, an email, a chat, an approval, a PDF and another spreadsheet — before a manager asks for the status." center>
        <IX_Fragment
          hub="One connected workflow"
          labels={["The fragmented workday", "One connected workflow"]}
          tools={[
            ["Spreadsheet", "grid"],
            ["Email", "mail"],
            ["Message", "chat"],
            ["Approval", "check"],
            ["PDF / document", "doc"],
            ["Manual data entry", "type"],
            ["Another spreadsheet", "grid"],
            ["Status request", "help"],
            ["Manual report", "bars"],
          ]}
          issues={[
            ["Duplicated work", "refresh", "Entered once"],
            ["Slow approvals", "clock", "Routed automatically"],
            ["Unclear ownership", "users", "Clear accountability"],
            ["Manual reporting", "doc", "Live status"],
            ["Dependency on individuals", "user", "Process, not memory"],
          ]}
        />
      </IX_Sec>

      {/* Differentiator */}
      <IX_Sec id="cba-diff-h" tone="dark" k="The Frequent Research difference" t="We don't build software around features. We build around the way work moves." s="We look for where work starts, where decisions happen, where approvals slow down, where people repeat themselves and where systems don't communicate.">
        <IX_Chain
          items={[
            ["Business event", "bolt", "Where work starts"],
            ["Decision", "compass", "Who decides, with what"],
            ["Workflow", "shuffle", "How it moves"],
            ["Data", "database", "Created once, reused"],
            ["Automation", "bolt", "Repetition removed"],
            ["Human action", "user", "People do what matters"],
            ["Business outcome", "target", "The point of it all"],
          ]}
        />
      </IX_Sec>

      {/* Manual → intelligent */}
      <IX_Sec id="cba-shift-h" tone="off" k="From manual work to intelligent work" t="What changes when the workflow runs inside the application." s="Business value first — the technology comes second.">
        <IX_Flows
          cols={[
            { t: "Before", s: "Work moved by people", steps: [["Manual entry", "Manual"], ["Manual approval", "Email"], ["Manual follow-up", "Reminder"], ["Manual reporting", "Later"], ["Disconnected systems", "Re-keying"]] },
            { t: "After", s: "Work that moves itself forward", steps: [["Automated workflows", "Auto"], ["Smart notifications", "Prioritised"], ["Connected systems", "API"], ["Live dashboards", "Live"], ["AI-assisted decisions", "Human decides"]], foot: "A well-designed application does not simply store information. It moves work forward." },
          ]}
        />
      </IX_Sec>

      {/* Ecosystem of applications */}
      <IX_Sec id="cba-cap-h" tone="light" k="What a custom business application can become" t="An application ecosystem — not a feature list." s="Choose an area: capability → operational problem → business value.">
        <IX_Matrix
          id="cba-mx"
          cats={[
            { t: "Internal operations", icon: "sliders", problem: "Work is coordinated through chats, spreadsheets and status meetings.", value: "One place where tasks, approvals and status are visible to the people who need them.", items: [["Employee portals", "Requests, documents and updates in one place for staff."], "Operational dashboards", "Task management", ["Workflow systems", "Your process encoded with rules and owners."], ["Approval platforms", "Manual emails and follow-ups → automated routing and status → faster decisions and clearer accountability."]] },
            { t: "Documents & processes", icon: "doc", problem: "Documents are emailed, renamed and re-approved.", value: "Documents generated, approved and traceable in the workflow.", items: ["Document management", ["Digital approvals", "Sign-offs with a clear trail."], ["Document generation", "Quotes, letters and reports produced from the data."], "Version control", ["Audit trails", "Who did what, and when."]] },
            { t: "Customer & sales ops", icon: "trend", problem: "Customers chase status; sales re-keys quotations and orders.", value: "Self-service for customers, fewer handoffs for teams.", items: [["Customer portals", "Customers see status and documents without calling."], "Quotation systems", "Order management", "Service management", "Account dashboards"] },
            { t: "Finance & admin", icon: "coin", problem: "Billing, payments and expenses depend on manual checks.", value: "Financial workflows with approvals, status and control.", items: ["Billing workflows", "Payment tracking", ["Expense management", "Submit, approve and reimburse without paper."], "Financial approvals", "Management dashboards"] },
            { t: "Field & mobile", icon: "phone", problem: "Field teams report by phone and paper; the office re-types it.", value: "Work captured where it happens, synced to the business.", items: [["Mobile workforce apps", "Tasks and forms in the field."], "Field reporting", "Task allocation", "Location-aware workflows", ["Offline-capable apps", "Keep working without signal where appropriate."]] },
            { t: "Management intelligence", icon: "bars", problem: "Managers ask for status and wait for someone to prepare it.", value: "Operational visibility, alerts and exceptions without assembling reports.", items: ["KPI dashboards", "Operational reporting", ["Alerts", "Notified when something actually needs attention."], ["Exception monitoring", "See delays and anomalies early."], "Decision-support interfaces"] },
          ]}
        />
      </IX_Sec>

      {/* One action many outcomes */}
      <IX_Sec id="cba-event-h" tone="off" k="One action, many automatic outcomes" t="A well-designed application moves work forward." s="Follow one employee request through a connected application.">
        <IX_Event
          trigger={["Employee submits a request", "user"]}
          steps={[
            ["Information validated", "check", "Application"],
            ["Correct approver notified", "bell", "Approver"],
            ["Approval triggers next workflow", "shuffle", "Workflow"],
            ["Relevant department notified", "users", "Department"],
            ["Document generated", "doc", "Documents"],
            ["Dashboard updated", "bars", "Dashboard"],
            ["Audit trail recorded", "eye", "Audit"],
            ["Management sees status", "eye", "Management"],
            ["Unusual delay flagged where appropriate", "spark", "AI-assisted"],
          ]}
          done="Request completed. Everyone who needs to know, knows."
        />
      </IX_Sec>

      {/* AI */}
      <IX_Sec id="cba-ai-h" tone="ink" k="AI-powered business applications" t="AI should sit inside the workflow — not beside it." s="Practical, permissioned, AI-assisted capabilities where they remove effort or improve a decision.">
        <IX_Ask
          cards={[
            ["AI-assisted document processing", "doc", "Extract structured information from documents and reduce manual entry."],
            ["Intelligent classification", "layers", "Classify requests, documents and tickets automatically."],
            ["AI-assisted search", "search2", "Ask questions about permitted business information in natural language."],
            ["Workflow intelligence", "shuffle", "Spot bottlenecks, delays and unusual patterns."],
            ["Smart summaries", "spark", "Turn lengthy operational information into concise summaries."],
            ["Intelligent notifications", "bell", "Prioritise what matters instead of flooding people with alerts."],
          ]}
          queries={[
            ["Which approvals have been waiting longer than usual?", ["Expense approval · finance · waiting on approver", "Vendor onboarding · procurement · missing document", "Leave request · operations · escalated"]],
            ["Summarise open customer requests for this week.", ["Delivery queries · mostly resolved", "Billing questions · two need follow-up", "Service requests · one escalated"]],
            ["Find invoices that don't match their purchase orders.", ["Invoice · quantity differs from PO", "Invoice · price variance · needs review", "Invoice · missing PO reference"]],
          ]}
          note="AI-assisted, never autonomous: people review, approve and remain accountable."
        />
      </IX_Sec>

      {/* Intelligence layer */}
      <IX_Sec id="cba-layer-h" tone="light" k="The intelligence layer" t="AI as a useful layer inside the business system." s="Information moves up to decision-makers. Actions move down into the workflow. Select a layer.">
        <IX_Layers
          up="Information moves up"
          down="Actions move down"
          layers={[
            { t: "Business users", icon: "users", items: ["Employees", "Managers", "Customers", "Partners"], note: "Each person sees a focused interface for the work they actually do." },
            { t: "Business application", icon: "layout", items: ["Portals", "Forms", "Approvals", "Dashboards"], note: "The experience that replaces spreadsheets, emails and manual follow-ups." },
            { t: "Workflow automation", icon: "bolt", items: ["Rules", "Routing", "Notifications", "Escalations"], note: "Business events trigger the next step automatically." },
            { t: "Data & integrations", icon: "link", items: ["ERP", "CRM", "Accounting", "Databases", "APIs"], note: "Existing systems connected so data is created once and reused." },
            { t: "AI / intelligence", icon: "spark", items: ["Extraction", "Classification", "Search", "Summaries"], note: "AI assists with information-heavy, repetitive work — under human control." },
            { t: "Analytics & decision support", icon: "bars", items: ["KPIs", "Alerts", "Exceptions", "Trends"], note: "Operational visibility for the people who make decisions." },
          ]}
        />
      </IX_Sec>

      {/* Configure / extend / build */}
      <IX_Sec id="cba-opt-h" tone="off" k="Custom doesn't always mean starting from scratch" t="Configure. Extend. Build." center>
        <IX_Options
          items={[
            { t: "Configure", tag: "Use what exists", icon: "check", d: "Use an existing platform where it already solves the problem.", best: ["Standard process", "Proven tools available", "Fastest route to value"] },
            { t: "Extend", tag: "Add what's missing", icon: "sliders", d: "Add custom modules, workflows, interfaces or integrations.", best: ["Core platform is valuable", "Specific gaps to close", "Integrations needed"] },
            { t: "Build", tag: "Purpose-built", icon: "code", d: "Develop a purpose-built application where the business needs deeper control.", best: ["Unique workflow", "Several systems to unify", "Control over the roadmap"] },
          ]}
          foot="Our job is not to sell custom software when you don't need it. It's to find the technology approach that creates the most practical value."
        />
      </IX_Sec>

      {/* Integrations */}
      <IX_Sec id="cba-int-h" tone="dark" k="Connect what you already have" t="Your application shouldn't become another digital island." s="API development, integration, data flow and automation — making existing systems work together where practical." center wide>
        <IX_Eco
          center="Custom business application"
          centerIcon="layout"
          groups={[
            { t: "Business systems", icon: "building", items: ["ERP", "CRM", "Accounting", "HR systems"] },
            { t: "Commerce & payments", icon: "cart", items: ["E-commerce", "Payment systems", "Invoicing"] },
            { t: "Communication", icon: "mail", items: ["Email", "WhatsApp", "Notifications"] },
            { t: "Data", icon: "database", items: ["Existing databases", "Analytics", "Reporting"] },
            { t: "Cloud & files", icon: "cloud", items: ["Cloud storage", "Documents", "Cloud services"] },
            { t: "Apps & platforms", icon: "phone", items: ["Mobile apps", "Third-party platforms", "APIs"] },
          ]}
        />
      </IX_Sec>

      {/* Control room */}
      <IX_Sec id="cba-cr-h" tone="off" k="Business application control room" t="Make the operation visible — and point to what needs action." wide>
        <IX_Control
          app="Operations workspace"
          tiles={[
            ["Pending approvals", "check", "bars"],
            ["Active workflows", "shuffle", "spark"],
            ["Open tasks", "queue", "ring"],
            ["Customer requests", "user", "spark"],
            ["Documents awaiting action", "doc", "bars"],
            ["Integrations", "link", "ring"],
          ]}
          attention={[
            ["Approvals waiting", "check", "warn"],
            ["Workflow exceptions", "flag", "hot"],
            ["Documents requiring review", "doc", "warn"],
            ["Integration alert", "link", "info"],
          ]}
          insights={["Purchase approvals are slowing at one step — consider a delegate approver.", "Most customer requests this week concern delivery dates — a portal status page could absorb them.", "One integration retried several times overnight — worth a check before month-end."]}
        />
      </IX_Sec>

      {/* Roles */}
      <IX_Sec id="cba-role-h" tone="light" k="Role-based experience" t="One platform does not have to mean one interface for everyone." center>
        <IX_Roles
          id="cba-roles"
          app="Business application"
          roles={[
            { t: "Management", icon: "eye", focus: "KPIs, exceptions and decisions.", widgets: [{ t: "KPI overview", icon: "gauge", kind: "spark" }, { t: "Exceptions", icon: "flag", items: [["Delayed workflow", "hot"], ["Budget threshold", "warn"]] }, { t: "Approvals", icon: "check", items: [["Capex request", "warn"]] }, { t: "Business intelligence", icon: "bars", kind: "bars" }] },
            { t: "Operations", icon: "sliders", focus: "Workflow queue and process status.", widgets: [{ t: "Workflow queue", icon: "queue", kind: "bars" }, { t: "Tasks", icon: "check", items: [["Dispatch planning", "ok"], ["Quality check", "warn"]] }, { t: "Process status", icon: "shuffle", kind: "ring" }, { t: "Operational alerts", icon: "bell", items: [["Supplier delay", "hot"]] }] },
            { t: "Finance", icon: "coin", focus: "Transactions, approvals and payment status.", widgets: [{ t: "Transactions", icon: "coin", kind: "spark" }, { t: "Approvals", icon: "check", items: [["Invoice approval", "warn"], ["Expense claim", "ok"]] }, { t: "Documents", icon: "doc", kind: "bars" }, { t: "Payment status", icon: "inbox", items: [["Partially paid", "info"]] }] },
            { t: "Sales", icon: "trend", focus: "Customers, quotations and follow-ups.", widgets: [{ t: "Customers", icon: "user", kind: "bars" }, { t: "Opportunities", icon: "trend", kind: "spark" }, { t: "Quotations", icon: "doc", items: [["Awaiting approval", "warn"], ["Sent", "ok"]] }, { t: "Follow-ups", icon: "cal", items: [["Call back today", "hot"]] }] },
            { t: "Employees", icon: "users", focus: "Requests, tasks and documents.", widgets: [{ t: "My requests", icon: "inbox", items: [["Travel request", "ok"], ["Equipment request", "warn"]] }, { t: "Tasks", icon: "check", kind: "bars" }, { t: "Documents", icon: "doc", items: [["Policy updated", "info"]] }, { t: "Notifications", icon: "bell", kind: "spark" }] },
            { t: "Administrators", icon: "shield", focus: "Permissions, workflows, integrations and audit.", widgets: [{ t: "Permissions", icon: "key", kind: "ring" }, { t: "Workflows", icon: "shuffle", items: [["New approval rule", "info"]] }, { t: "Integrations", icon: "link", items: [["All connections healthy", "ok"], ["One retry queued", "warn"]] }, { t: "Audit logs", icon: "eye", kind: "bars" }] },
          ]}
        />
      </IX_Sec>

      {/* Capabilities map */}
      <IX_Sec id="cba-tech-h" tone="off" k="Frequent Research IT capabilities" t="Engineering capability, grouped by what it makes possible." s="Technology chosen per problem — React, Next.js, Node.js, PHP / Laravel, Python, Flutter, React Native, AWS, Azure, Google Cloud and SQL databases where appropriate.">
        <IX_Stack
          groups={[
            ["Product & application engineering", "layout", ["Custom web applications", "Mobile applications", "SaaS applications", "Internal business platforms"], "The application people use"],
            ["Architecture", "branch", ["Scalable architecture", "Modular systems", "API-first", "Cloud-ready"], "Room to grow without rebuilding"],
            ["AI & automation", "spark", ["AI-assisted workflows", "Document processing", "Workflow automation", "AI interfaces"], "Effort removed, decisions supported"],
            ["Integration", "link", ["REST APIs", "Third-party integrations", "ERP / CRM integrations", "Payment integrations", "Cloud services"], "Systems that talk to each other"],
            ["Data", "database", ["Business dashboards", "Data processing", "Reporting systems", "Analytics interfaces"], "Information people can act on"],
            ["Engineering quality", "check", ["QA", "Security testing", "Performance testing", "CI/CD", "Monitoring"], "Reliable from day one"],
          ]}
          note="No technology partnerships or certifications are implied."
        />
      </IX_Sec>

      {/* Why */}
      <IX_Sec id="cba-why-h" tone="light" k="Why Frequent Research" t="Why trust Frequent Research with a business-critical application?">
        <IX_Why
          items={[
            ["Business logic before code", "compass", "We understand what the application must accomplish before deciding how to engineer it."],
            ["Software that fits the workflow", "shuffle", "Designed around the people and processes using it every day."],
            ["AI with a job to do", "spark", "Introduced where it reduces effort, improves access to information or supports decisions."],
            ["Integration over disruption", "link", "Existing systems connected where replacement doesn't make sense."],
            ["Visible engineering", "eye", "Milestones, demonstrations and communication — no black box."],
            ["Ownership", "key", "Appropriate ownership of source code, designs and documentation stays with you."],
            ["Built to evolve", "refresh", "New workflows and integrations added without rebuilding everything."],
            ["Support after launch", "users", "The relationship doesn't end when the application goes live."],
          ]}
        />
      </IX_Sec>

      <IX_Motto id="cba-moto-h" kicker="Our motto" quote="Connect the work. Automate the repetitive. Make the data useful." sub="We believe business software should reduce friction, not create another layer of it." lines={["Business before technology.", "Workflow before features.", "Integration before replacement.", "AI where it matters.", "People stay in control.", "Build for today. Architect for tomorrow."]} />

      {/* Value chain */}
      <IX_Sec id="cba-val-h" tone="dark" k="Business value" t="Less manual work leads somewhere." s="The value chain of a well-designed business application.">
        <IX_Chain
          items={[
            ["Less manual work", "bolt", "Repetition removed"],
            ["Fewer handoffs", "shuffle", "Work moves itself"],
            ["Better information flow", "link", "Data created once"],
            ["Faster decisions", "clock", "Approvals without chasing"],
            ["Greater visibility", "eye", "Status without asking"],
            ["Scalable operations", "trend", "Growth without more admin"],
          ]}
        />
      </IX_Sec>

      {/* Decision tree */}
      <IX_Sec id="cba-tree-h" tone="off" k="Should you consider a custom application?" t="Your workflow is already telling you." s="Answer honestly — several yeses suggest a custom application is worth exploring.">
        <IX_Tree
          id="cba-tree"
          formId={CBA_FORM}
          cta="Discuss Your Workflow"
          nodes={[
            { q: "Are employees repeatedly entering the same information?", s: "Duplicate entry", no: ["Start with visibility.", "If data entry is clean, dashboards or reporting improvements may be the faster win."] },
            { q: "Are important workflows managed through email or spreadsheets?", s: "Email & spreadsheets", no: ["Optimise your current tools.", "Configuration or small automations on existing software may be enough."] },
            { q: "Do existing systems fail to communicate?", s: "Disconnected systems", no: ["Focus on the workflow layer.", "A lightweight workflow application could be enough without deep integration."] },
            { q: "Are managers waiting for manual reports?", s: "Manual reports", no: ["Automate the process first.", "Workflow automation may deliver most of the value before dashboards."] },
            { q: "Does off-the-shelf software force awkward workarounds?", s: "Workarounds", no: ["Extend what you have.", "Custom modules or integrations around your current platform may be the right step."] },
          ]}
          final={["A custom business application may be worth exploring.", "Several signals point to friction that generic software won't remove. Let's map the workflow and decide whether to configure, extend or build."]}
        />
      </IX_Sec>

      {/* Approach */}
      <IX_Sec id="cba-proc-h" tone="light" k="Development approach" t="Visible milestones — from understanding to evolution." s="Select a stage.">
        <IX_Timeline
          id="cba-tl"
          stages={[
            ["Understand", "Business goals, users, workflows and constraints.", "search2"],
            ["Architect", "Application architecture, integrations, data and security.", "branch"],
            ["Design", "Interfaces that make complex work easier.", "layout"],
            ["Build", "Modular engineering with visible milestones.", "code"],
            ["Automate", "Repetitive actions and intelligent workflow opportunities.", "bolt"],
            ["Validate", "Functional, performance, security and usability testing.", "check"],
            ["Launch", "Deployment, documentation and handover.", "rocket"],
            ["Evolve", "Maintenance, optimisation, integrations and new capabilities.", "refresh"],
          ]}
        />
      </IX_Sec>

      {/* Trust */}
      <IX_Sec id="cba-sec-h" tone="off" k="Security & control" t="A trust layer built into the application." center>
        <IX_Trust
          center="Trust layer"
          items={[
            ["Authentication", "lock"],
            ["Role-based permissions", "users"],
            ["Access control", "key"],
            ["Audit trails", "eye"],
            ["Secure APIs", "link"],
            ["Data protection & backups", "database"],
            ["Testing & deployment controls", "check"],
            ["Monitoring & documentation", "doc"],
          ]}
          note="Regulatory compliance is assessed per project; none is claimed on this page."
        />
      </IX_Sec>

      {/* Industries */}
      <IX_Sec id="cba-ind-h" tone="light" k="Industries" t="Business applications can be designed for…" s="Choose an industry to see a typical application need." center>
        <IX_Industries
          items={[
            ["Manufacturing", "factory", "shop-floor reporting, quality checks and maintenance requests."],
            ["Retail", "cart", "store operations, replenishment requests and approvals."],
            ["Logistics", "truck", "dispatch, proof of delivery and exceptions."],
            ["Healthcare", "cross", "scheduling, internal requests and document workflows with access control."],
            ["Pharmaceutical", "pill", "document control, approvals and audit trails."],
            ["Financial Services", "coin", "onboarding workflows, approvals and case management."],
            ["Agriculture", "wheat", "field data capture and procurement workflows."],
            ["Automotive", "car", "service workflows and dealer portals."],
            ["Energy", "bolt", "field inspections and asset maintenance."],
            ["Education", "book", "admissions, staff requests and communication."],
            ["Real Estate", "home", "project tracking, contractor approvals and customer portals."],
            ["Food & Beverage", "leaf", "batch records, quality checks and supplier workflows."],
            ["Telecommunications", "signal", "field service and order workflows."],
            ["Information Technology", "cpu", "internal tools, resource and project workflows."],
            ["Government", "landmark", "applications, approvals and citizen-facing portals."],
            ["Media", "film", "content workflows and approvals."],
            ["Fashion", "shirt", "sampling, production tracking and vendor portals."],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="cba-faq"
        title="Custom business applications: common questions"
        items={CBA_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("custom-software-development")}>custom software development</PpL>, <PpL to={ppIt("web-application-development")}>web application development</PpL>, <PpL to={ppIt("crm-development")}>CRM</PpL> and <PpL to={ppIt("erp-development")}>ERP development</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/custom-business-applications-guide" title="Custom business applications guide" text="When to configure, extend or build — and how to plan the first release." />

      <IX_Final
        id="cba-final-h"
        kicker="Build My Business Application"
        title="Your workflow is already telling you what the software should do."
        text="Tell us where work gets stuck, repeated or disconnected. We'll help you explore the right application, architecture and automation approach."
        cta={["Build My Business Application", CBA_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["Talk to a Technology Specialist", CBA_FORM]}
        flow={["Request", "Approval", "Document", "Notification", "Dashboard", "Insight"]}
        sig="Frequent Research doesn't simply develop software. It engineers better ways for businesses to work."
      />

      <DM_Form
        id={CBA_FORM}
        kicker="IT project consultation"
        title="Build My Business Application"
        sub="Discovery before estimates · phased delivery · clear communication · support after launch."
        type="Custom Business Applications Enquiry"
        service="Custom Business Applications"
        icon="grid"
        submitLabel="Discuss My Requirement"
        successTitle="Thank you. Your application request has been sent."
        siteLabel="Existing software or website (optional)"
        msgLabel="Message (optional)"
        msgPh="Workflows, users, systems to connect, timelines — whatever helps"
        nextSteps={["We review your workflow and current software.", "We contact you to understand where work gets stuck.", "You get options — configure, extend or build — and a recommended next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you want to build?", label: "Project type", options: ["New business application", "Internal tool", "Workflow automation", "Custom web application", "Mobile application", "System integration", "AI-enabled application", "Application modernisation", "Maintenance & enhancement", "Other"] },
          { k: "platform", t: "Platforms", q: "Where will it run?", label: "Platforms", multi: true, options: ["Web", "Mobile", "iOS", "Android", "Cloud", "API", "AI"] },
          { k: "challenge", t: "Challenge", q: "What is the main business challenge?", label: "Business challenge", multi: true, options: ["Spreadsheets & email", "Slow approvals", "Duplicate data entry", "Disconnected systems", "No visibility", "Field / mobile work", "Document-heavy processes"] },
        ]}
      />

      <IX_Sec id="cba-rel-h" tone="dark" k="Related IT & Development services" t="Connected services">
        <IX_Related
          items={[
            ["IT & Development", "", "All business technology services."],
            ["Custom Software Development", "custom-software-development", "Software built around a unique process."],
            ["Web Application Development", "web-application-development", "Browser-based applications for teams and customers."],
            ["Mobile App Development", "mobile-app-development", "Field and customer experiences on mobile."],
            ["CRM Development", "crm-development", "Customer workflows and sales operations."],
            ["ERP Development", "erp-development", "Connected finance, inventory and operations."],
            ["API Development & Integration", "api-development-and-integration", "Connect the application to existing systems."],
            ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation and AI inside workflows."],
            ["UI/UX Design", "ui-ux-design", "Interfaces that make complex work simple."],
            ["Application Maintenance & Support", "application-maintenance-and-support", "Keep the application improving."],
          ]}
          base={(s) => (s ? ppIt(s) : "/services/it-development")}
        />
      </IX_Sec>
    </div>
  );
}

export { CBA_Page };
