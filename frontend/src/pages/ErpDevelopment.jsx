/*
 * ERP Development — /services/it-development/erp-development (URL unchanged; previously the generic service template)
 * Build 42 rethink: "Build the operational system around the business — not the business around the system."
 * Signature visuals: Business Operating System (one event → many connected actions), Control Room, decision tree.
 * No case studies, team details, example boxes, invented numbers, partnerships, certifications or vendor status.
 * No market-research positioning — this is an IT & Development page.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIt } from '../components/dm/shared.jsx';
import { IX_Ask, IX_Band, IX_Chain, IX_Control, IX_Eco, IX_Event, IX_Final, IX_Fragment, IX_Graph, IX_Guide, IX_Hero, IX_Industries, IX_Matrix, IX_Motto, IX_Options, IX_Outcomes, IX_Pins, IX_Related, IX_Roles, IX_Sec, IX_Services, IX_Stack, IX_Tiers, IX_Timeline, IX_Tree, IX_Trust, IX_Why, ixSchema } from '../components/dm/ixkit.jsx';

const ERP_URL = "/services/it-development/erp-development";
const ERP_TITLE = "ERP Development Built Around Operations | Frequent Research";
const ERP_DESC = "Custom ERP development that connects finance, inventory, procurement, people and data around how you operate, with automation and AI where they add value.";
const ERP_FORM = "erp-project";

const ERP_FAQ = [
  ["What is custom ERP development?", "Designing and building an ERP environment around your own processes, data and approvals — or extending an existing ERP — so finance, operations, inventory, procurement and people work from one connected system."],
  ["When should a business consider custom ERP development?", "When processes are highly specialised, standard ERP creates expensive workarounds, or several systems need to become one operational environment. Often configuring, integrating or extending an existing ERP is the smarter first step."],
  ["How much does ERP software development cost?", "It depends on the number of modules, users, workflows, integrations, data migration, AI requirements, security, deployment architecture and level of customisation, so an estimate follows discovery rather than a published price."],
  ["How long does ERP development take?", "ERP is usually delivered in phases, starting with the processes that create the most friction; the timeline depends on scope, integrations and migration and is agreed after discovery."],
  ["Can you customise Odoo?", "Yes — Odoo customisation, extensions, workflows and integrations can be delivered depending on project requirements and the Odoo edition in use."],
  ["Can you integrate SAP or Microsoft Dynamics with other business systems?", "Yes, where the platform supports it — integrations, supporting applications and connected workflows around SAP or Microsoft Dynamics 365, depending on your environment and licences."],
  ["Can AI be integrated into an ERP?", "Yes, where it creates practical value — forecasting support, document processing, exception detection, natural-language search and management summaries — with human review and permissions built in."],
  ["Can you modernise an existing ERP instead of replacing it?", "Often, yes. New interfaces, APIs, workflow automation, dashboards, mobile access and custom modules can extend an ERP that still does its core job."],
];

function ERP_Page() {
  usePageMeta("ERP Development", ERP_DESC);
  dmMeta(ERP_URL, ERP_TITLE, ERP_DESC);
  ixSchema("erp", {
    url: ERP_URL,
    crumb: "ERP Development",
    name: "ERP Development",
    serviceType: "Custom ERP development",
    schemaDesc:
      "Custom ERP development and ERP customisation built around operational workflows: finance, sales and customer operations, procurement, inventory, operations, HR and management intelligence; integration with existing systems, legacy ERP modernisation, data migration, role-based dashboards, AI-assisted forecasting, document processing and exception detection, security and long-term enhancement.",
    faq: ERP_FAQ,
  });
  return (
    <div className="pp sm dk ix-page erp-svc">
      <IX_Hero
        id="erp-h1"
        crumb="ERP Development"
        kicker="ERP Development · Process → Data → Integration → Automation → Intelligence → Decision"
        h1="ERP Development Built Around How Your Business Actually Operates"
        lead="Your business shouldn't reshape its operations around rigid software. Frequent Research builds ERP systems that connect finance, operations, inventory, procurement, people and data around the way your organisation really works — with automation and AI where they earn their place."
        cta={["Build My ERP", ERP_FORM]}
        cta2={["Discuss My ERP", ERP_FORM]}
        cta3={["Find my ERP approach", "erp-tree-h"]}
        points={["Connected operations", "Integration before replacement", "AI with a purpose", "Built to evolve"]}
      >
        <IX_Graph
          center="Business"
          centerIcon="building"
          title="One business event → many connected actions"
          label="Business operating system: the business at the centre, connected to finance, sales, procurement, inventory, operations, HR, projects, customers, supply chain and management. A sales order flows through inventory, procurement, warehouse, finance and the management dashboard."
          nodes={[
            ["Finance", "coin"],
            ["Sales", "trend"],
            ["Procurement", "cart"],
            ["Inventory", "box"],
            ["Operations", "sliders"],
            ["HR", "users"],
            ["Projects", "clipboard"],
            ["Customers", "user"],
            ["Supply chain", "truck"],
            ["Management", "bars"],
          ]}
          links={[
            [1, 3],
            [3, 2],
            [2, 0],
            [8, 3],
            [4, 8],
            [1, 0],
            [7, 1],
            [5, 0],
            [6, 4],
            [0, 9],
            [4, 9],
            [5, 6],
          ]}
          journey={[
            ["Sales order", [1, 7]],
            ["Inventory check", [3]],
            ["Procurement trigger", [2]],
            ["Warehouse", [8, 4]],
            ["Finance", [0]],
            ["Invoice", [0, 7]],
            ["Management dashboard", [9]],
          ]}
        />
      </IX_Hero>

      <IX_Band tone="off" micro={["Connect the work", "Automate the repetitive", "Make the data useful"]} text="An ERP should not simply connect departments. It should connect decisions, processes, people and data." />

      {/* 2 — Problem */}
      <IX_Sec id="erp-prob-h" tone="light" k="The real ERP problem" t="Your departments aren't separate. Your software shouldn't be either." s="The problem is rarely a lack of software. It is a lack of connection between systems and processes." center>
        <IX_Fragment
          hub="One operational data flow"
          labels={["Disconnected business", "Connected business"]}
          tools={[
            ["Sales", "trend"],
            ["Spreadsheets", "grid"],
            ["Inventory", "box"],
            ["Accounting", "coin"],
            ["Procurement", "cart"],
            ["HR", "users"],
            ["Email & chat", "mail"],
            ["Legacy app", "cpu"],
            ["Manual reports", "doc"],
          ]}
          issues={[
            ["Delayed handoffs", "clock", "Data moves with the work"],
            ["Duplicate entry", "refresh", "Entered once, used everywhere"],
            ["Reconciliation effort", "scale", "One version of the business"],
            ["Reports that arrive late", "doc", "Visibility without waiting"],
          ]}
        />
      </IX_Sec>

      {/* 3 — Difference: Operational intelligence map */}
      <IX_Sec id="erp-diff-h" tone="off" k="The Frequent Research ERP difference" t="We don't build ERP around modules. We build it around how the business moves." s="Traditional ERP conversations start with Finance, Inventory, HR. We start with the questions that reveal how work really flows.">
        <IX_Pins
          flow={["Customer places order", "Approval", "Inventory", "Procurement", "Fulfilment", "Invoice", "Management view"]}
          pins={[
            [0, "What happens when a customer places an order?", "cart"],
            [0, "What information moves between departments?", "shuffle"],
            [1, "Where does approval happen — and where does it stall?", "check"],
            [2, "Where is data entered more than once?", "refresh"],
            [3, "Which actions can be automated?", "bolt"],
            [4, "Where does work get delayed?", "clock"],
            [5, "Which decisions still depend on spreadsheets?", "grid"],
            [6, "What should management see immediately?", "eye"],
          ]}
        />
      </IX_Sec>

      {/* 4 — Transactions → intelligence */}
      <IX_Sec id="erp-intel-h" tone="light" k="From transactions to intelligence" t="An ERP should do more than record what happened.">
        <IX_Tiers
          variant="journey"
          cols={[
            { t: "Record", icon: "doc", items: ["Orders", "Invoices", "Purchase orders", "Stock movements", "Employees", "Expenses"] },
            { t: "Connect", icon: "link", items: ["Customer", "Finance", "Inventory", "Procurement", "Operations", "People"] },
            { t: "Understand", icon: "eye", items: ["Trends", "Exceptions", "Bottlenecks", "Forecasts", "Risks", "Opportunities"] },
          ]}
          final="The real value of ERP begins when connected data becomes useful intelligence."
        />
      </IX_Sec>

      {/* 5 — Capability ecosystem */}
      <IX_Sec id="erp-cap-h" tone="off" k="ERP capability ecosystem" t="Capabilities, framed by the operational problem they solve." s="Choose an area: capability → operational problem → business value.">
        <IX_Matrix
          id="erp-mx"
          cats={[
            { t: "Finance", icon: "coin", problem: "Finance reconciles operational events after the fact, from several sources.", value: "Operational events connected to financial information, so teams aren't reconciling two versions of the business.", items: ["Accounting", ["Accounts payable", "Supplier bills matched to orders and receipts."], ["Accounts receivable", "See what's owed and by whom, without chasing reports."], "Invoicing", "Expense management", "Financial reporting", ["Approval workflows", "Spend approved by the right person, with a trail."]] },
            { t: "Sales & customer ops", icon: "trend", problem: "Orders, quotes and customer history live in different places.", value: "From quotation to revenue in one connected flow.", items: ["Customer management", "Orders", "Quotations", ["Sales pipeline integration", "CRM opportunities flow into ERP orders."], "Customer history", "Revenue tracking"] },
            { t: "Procurement", icon: "cart", problem: "Purchase requests travel by email and approvals are invisible.", value: "Controlled spend with visible approval paths and supplier records.", items: ["Vendor management", "Purchase requests", "Purchase orders", ["Approval workflows", "Routing by value, category or department."], "Supplier records", ["Procurement analytics", "Where money goes, by supplier and category."]] },
            { t: "Inventory", icon: "box", problem: "Nobody is sure what's available until someone checks manually.", value: "Know what is available, what is moving and what needs attention before a shortage becomes an operational problem.", items: ["Stock management", "Warehousing", "Stock transfers", ["Reorder triggers", "Replenishment prompted before stock runs out."], "Inventory visibility", ["Multi-location inventory", "One view across stores, plants and warehouses."]] },
            { t: "Operations", icon: "sliders", problem: "Work is coordinated through calls, messages and whiteboards.", value: "Workflows, tasks and resources visible and moving.", items: ["Workflows", "Task management", "Production processes", "Project operations", ["Resource allocation", "People and equipment assigned where they are needed."], "Operational dashboards"] },
            { t: "HR", icon: "users", problem: "Employee information and approvals are spread across tools.", value: "People information connected to the work and approvals around it.", items: ["Employee records", "Leave management", ["Attendance integration", "Attendance data flowing into payroll and planning."], "Approval workflows", "Workforce information"] },
            { t: "Management intelligence", icon: "bars", problem: "Decision-makers wait for manually assembled reports.", value: "Give every decision-maker the operational view they need, without waiting.", items: ["Executive dashboards", "KPIs", "Business performance", ["Exception reporting", "Surface what is unusual, not everything that happened."], "Forecasting", "Decision support"] },
          ]}
        />
      </IX_Sec>

      {/* 6 — One event */}
      <IX_Sec id="erp-event-h" tone="light" k="One business event. Many automatic actions." t="What happens when one action moves through the business?" s="Watch a single order travel through a connected ERP.">
        <IX_Event
          trigger={["Customer places an order", "cart"]}
          steps={[
            ["ERP recognises the order", "check", "Sales"],
            ["Inventory availability checked", "box", "Inventory"],
            ["Stock reserved", "lock", "Warehouse"],
            ["Procurement triggered if required", "cart", "Procurement"],
            ["Finance receives billing information", "coin", "Finance"],
            ["Operations receives fulfilment task", "sliders", "Operations"],
            ["Customer status updated", "user", "Customer"],
            ["Management dashboard refreshed", "bars", "Management"],
          ]}
          done="One event. Every connected team updated."
          note="That is the ERP story: one business event, many connected actions — without anyone re-typing it."
        />
      </IX_Sec>

      {/* 7 — AI */}
      <IX_Sec id="erp-ai-h" tone="ink" k="AI-enabled ERP" t="AI should sit inside the operational workflow — not outside it." s="AI-assisted, AI-supported, and always under human control.">
        <IX_Ask
          cards={[
            ["AI-assisted forecasting", "trend", "Identify patterns in operational data to support planning decisions."],
            ["Intelligent document processing", "doc", "Extract relevant information from invoices and purchase documents where appropriate."],
            ["Smart exception detection", "flag", "Surface unusual transactions, delayed processes or anomalies for review."],
            ["Natural-language business search", "search2", "Ask the ERP a question in plain language."],
            ["AI management assistant", "bars", "Concise summaries and decision-support insights from operational data."],
            ["Workflow intelligence", "shuffle", "Recommend or trigger actions based on business rules and relevant data."],
          ]}
          queries={[
            ["Which purchase orders are still awaiting approval?", ["Purchase order · raw materials · awaiting finance", "Purchase order · services · awaiting department head", "Purchase order · spares · approver on leave"]],
            ["Which products are approaching their reorder threshold?", ["Product · fast-moving · reorder soon", "Product · seasonal · review forecast", "Product · single supplier · lead time risk"]],
            ["Which regions have the highest outstanding receivables?", ["Region · north · several invoices overdue", "Region · west · one large invoice pending", "Region · export · awaiting confirmation"]],
            ["Where did operational costs increase this month?", ["Logistics · freight costs rising", "Maintenance · unplanned repairs", "Utilities · plant energy usage"]],
          ]}
          note="AI never replaces employees or runs the business autonomously; it assists people with information, patterns and routine decisions."
        />
      </IX_Sec>

      {/* 8 — Decision engine */}
      <IX_Sec id="erp-engine-h" tone="off" k="ERP as a decision engine" t="Your ERP should tell you not only what happened — but where attention may be needed next.">
        <IX_Tiers
          cols={[
            { n: "Old model", t: "Data storage", icon: "database", s: "ERP as a place where transactions are kept.", items: ["Records", "Reports on request"] },
            { n: "Better model", t: "Process management", icon: "shuffle", s: "ERP that moves work between teams.", items: ["Workflows", "Approvals", "Integrations"] },
            { n: "Frequent Research model", t: "Operational intelligence", icon: "spark", s: "ERP that surfaces what needs attention next.", items: ["Exceptions", "Forecast signals", "AI-assisted insight", "Decision support"] },
          ]}
        />
      </IX_Sec>

      {/* 9 — Custom vs standard */}
      <IX_Sec id="erp-opt-h" tone="light" k="Custom vs standard ERP" t="Not every business needs a custom ERP. Yours might." center>
        <IX_Options
          items={[
            { t: "Standard ERP", tag: "Configure", icon: "check", d: "When the processes are relatively standard.", best: ["Processes match common practice", "Existing modules meet requirements", "Configuration is enough"] },
            { t: "Customised ERP", tag: "Extend", icon: "sliders", d: "When an existing ERP is valuable but needs adapting.", best: ["The platform is worth keeping", "Workflows need significant adaptation", "Integrations are important"] },
            { t: "Custom ERP", tag: "Build", icon: "code", d: "When the business logic is the competitive advantage.", best: ["Highly specialised processes", "Standard ERP forces costly workarounds", "Many systems must become one environment"] },
          ]}
          foot="The right answer is not always “build”. Sometimes the smarter decision is configure, integrate or extend."
        />
      </IX_Sec>

      {/* 10 — Ecosystems */}
      <IX_Sec id="erp-eco-h" tone="off" k="Odoo · SAP · Microsoft Dynamics 365 · custom" t="Build, extend or integrate the ERP environment you already use." s="Capabilities depend on project requirements and your platform licences. No vendor partnership or certification is implied.">
        <IX_Stack
          groups={[
            ["Odoo", "grid", ["Customisation", "Extensions", "Workflows", "Integrations"], "Where applicable to your edition"],
            ["SAP", "building", ["Integrations", "Supporting applications", "Connected workflows"], "Where relevant to your landscape"],
            ["Microsoft Dynamics 365", "layers3", ["Customisation", "Integrations", "Connected business apps"], "Where appropriate"],
            ["Other ERP platforms", "cpu", ["API integration", "Modules", "Dashboards"], "Depending on what the platform supports"],
            ["Custom ERP environments", "code", ["Purpose-built modules", "Business logic", "Modern architecture"], "When standard ERP doesn't fit"],
          ]}
          note={
            <>
              Official references: <PpX href="https://www.odoo.com/documentation/">Odoo documentation</PpX>, <PpX href="https://www.sap.com/products/erp.html">SAP ERP</PpX>, <PpX href="https://learn.microsoft.com/dynamics365/">Microsoft Dynamics 365 docs</PpX>.
            </>
          }
        />
      </IX_Sec>

      {/* 11 — Integration ecosystem */}
      <IX_Sec id="erp-int-h" tone="dark" k="ERP integration ecosystem" t="Your ERP should not become another island." s="Connect the applications your organisation already depends on instead of forcing teams to maintain parallel systems." center wide>
        <IX_Eco
          center="ERP core"
          centerIcon="building"
          groups={[
            { t: "Finance & payments", icon: "coin", items: ["Accounting", "Payment systems", "Banking feeds"] },
            { t: "Customers", icon: "user", items: ["CRM", "E-commerce", "Customer portals"] },
            { t: "Operations", icon: "truck", items: ["Inventory", "Warehouse", "Logistics"] },
            { t: "People", icon: "users", items: ["HR", "Attendance", "Payroll"] },
            { t: "Communication", icon: "mail", items: ["Email", "WhatsApp", "Notifications"] },
            { t: "Data & cloud", icon: "cloud", items: ["Analytics", "BI", "Cloud services", "APIs"] },
          ]}
        />
      </IX_Sec>

      {/* 12 — Modernisation */}
      <IX_Sec id="erp-mod-h" tone="light" k="Legacy ERP modernisation" t="Your ERP doesn't always need replacing." s="Modernise where it creates value. Replace where it makes sense.">
        <IX_Chain
          items={[
            ["New interfaces", "layout", "Modern screens on proven logic"],
            ["API integration", "link", "Open the ERP to other systems"],
            ["Workflow automation", "bolt", "Remove manual steps"],
            ["Custom modules", "grid", "Add what's missing"],
            ["Dashboards", "bars", "See without exporting"],
            ["Mobile access", "phone", "Approvals on the move"],
            ["AI-assisted capabilities", "spark", "Search, summaries, exceptions"],
          ]}
        />
      </IX_Sec>

      {/* 13 — Migration */}
      <IX_Sec id="erp-mig-h" tone="off" k="ERP data migration" t="Moving the data is a project in itself." s="Validated, mapped and moved securely — so the new ERP starts with data people trust.">
        <IX_Tiers
          variant="journey"
          cols={[
            { t: "Old system", icon: "cpu", items: ["Spreadsheets", "Legacy database", "Disconnected apps"] },
            { t: "Clean", icon: "check", items: ["Validate", "Deduplicate", "Map"] },
            { t: "Transform", icon: "shuffle", items: ["Structure", "Standardise", "Enrich"] },
            { t: "Move", icon: "lock", items: ["Secure migration", "Reconciliation", "Sign-off"] },
            { t: "New ERP", icon: "building", items: ["Connected operational data"] },
          ]}
        />
      </IX_Sec>

      {/* 14 — Roles */}
      <IX_Sec id="erp-role-h" tone="light" k="Role-based ERP experience" t="Each role sees the operation from where it stands." s="Choose a role." center>
        <IX_Roles
          id="erp-roles"
          app="ERP workspace"
          roles={[
            { t: "CEO / leadership", icon: "eye", focus: "How is the business performing — and where is attention needed?", widgets: [{ t: "Revenue", icon: "coin", kind: "spark" }, { t: "Costs", icon: "trend", kind: "bars" }, { t: "Operational performance", icon: "gauge", kind: "ring" }, { t: "Exceptions & forecast", icon: "flag", items: [["Margin pressure in one line", "warn"], ["Large order at risk", "hot"], ["Demand signal rising", "info"]] }] },
            { t: "Finance", icon: "coin", focus: "Cash, controls and what's owed.", widgets: [{ t: "Receivables", icon: "inbox", kind: "bars" }, { t: "Payables", icon: "doc", items: [["Supplier bill due", "warn"], ["Payment approved", "ok"]] }, { t: "Cash flow", icon: "trend", kind: "spark" }, { t: "Financial controls", icon: "shield", items: [["Unusual transaction flagged", "hot"], ["Month-end checklist", "ok"]] }] },
            { t: "Operations", icon: "sliders", focus: "What's running, delayed or blocked?", widgets: [{ t: "Workflows", icon: "shuffle", kind: "bars" }, { t: "Production", icon: "factory", kind: "ring" }, { t: "Tasks", icon: "check", items: [["Line changeover", "ok"], ["Quality check pending", "warn"]] }, { t: "Exceptions", icon: "flag", items: [["Workflow delayed", "hot"], ["Resource conflict", "warn"]] }] },
            { t: "Procurement", icon: "cart", focus: "Spend, suppliers and approvals.", widgets: [{ t: "Pending approvals", icon: "check", items: [["Purchase request", "warn"], ["Capex request", "warn"], ["Contract renewal", "ok"]] }, { t: "Supplier performance", icon: "truck", kind: "bars" }, { t: "Purchase pipeline", icon: "queue", kind: "spark" }, { t: "Spend", icon: "coin", kind: "ring" }] },
            { t: "Inventory", icon: "box", focus: "Stock, movement and what to reorder.", widgets: [{ t: "Stock levels", icon: "box", kind: "bars" }, { t: "Reorder alerts", icon: "bell", items: [["Below threshold", "hot"], ["Approaching threshold", "warn"]] }, { t: "Warehouse movement", icon: "truck", kind: "spark" }, { t: "Slow-moving inventory", icon: "clock", items: [["Ageing stock to review", "warn"]] }] },
            { t: "HR", icon: "users", focus: "People, leave and approvals.", widgets: [{ t: "Leave requests", icon: "cal", items: [["Awaiting manager", "warn"], ["Approved", "ok"]] }, { t: "Attendance", icon: "check", kind: "bars" }, { t: "Headcount view", icon: "users", kind: "ring" }, { t: "Onboarding", icon: "user", items: [["Documents pending", "info"]] }] },
            { t: "Sales", icon: "trend", focus: "Orders, quotations and customers.", widgets: [{ t: "Orders", icon: "cart", kind: "spark" }, { t: "Quotations", icon: "doc", items: [["Quote awaiting approval", "warn"], ["Quote accepted", "ok"]] }, { t: "Customer history", icon: "user", kind: "bars" }, { t: "Delivery status", icon: "truck", items: [["Partially shipped", "info"]] }] },
          ]}
        />
      </IX_Sec>

      {/* 15 — Control room */}
      <IX_Sec id="erp-cr-h" tone="dark" k="The ERP control room" t="One control room for the moving parts of the business." s="An interface that points to what needs attention — not just what happened." wide>
        <IX_Control
          app="ERP control room"
          tiles={[
            ["Revenue", "coin", "spark"],
            ["Orders", "cart", "bars"],
            ["Inventory", "box", "ring"],
            ["Procurement", "truck", "spark"],
            ["Receivables", "inbox", "bars"],
            ["Payables", "doc", "spark"],
            ["Workflows", "shuffle", "bars"],
            ["Exceptions", "flag", "ring"],
            ["AI insights", "spark", "spark"],
          ]}
          attention={[
            ["Purchase approval pending", "check", "warn"],
            ["Inventory below threshold", "box", "hot"],
            ["Invoice overdue", "doc", "warn"],
            ["Workflow delayed", "clock", "warn"],
            ["Unusual transaction detected", "flag", "hot"],
          ]}
          insights={["Freight costs are trending above plan in one region — review carrier allocation.", "Three purchase requests are waiting on one approver who is away this week.", "A fast-moving product will reach its reorder threshold before the next supplier cycle."]}
        />
      </IX_Sec>

      {/* 16 — USP */}
      <IX_Sec id="erp-why-h" tone="light" k="Why Frequent Research for ERP development" t="Distinctive capabilities — not generic claims.">
        <IX_Why
          items={[
            ["Business logic before software", "compass", "We begin with how the business actually operates before deciding what the software should do."],
            ["Connected thinking", "link", "Departments are treated as one operating ecosystem, not isolated modules."],
            ["AI with a purpose", "spark", "AI reduces repetitive work, surfaces information or supports decisions — nothing decorative."],
            ["Integration-first mindset", "layers3", "Existing systems are part of the architecture, not automatically discarded."],
            ["Modern engineering", "code", "APIs, cloud infrastructure and scalable development practices."],
            ["Transparent delivery", "eye", "You understand what is built, why it matters and how it affects operations."],
            ["Ownership", "key", "Source code, documentation and technical assets remain yours where contractually agreed."],
            ["Long-term thinking", "refresh", "An ERP capable of evolving as the organisation changes."],
          ]}
        />
      </IX_Sec>

      {/* 17 — Philosophy */}
      <IX_Motto id="erp-moto-h" kicker="Our ERP philosophy" quote="“Connect the work. Automate the repetitive. Make the data useful.”" lines={["Design around the business.", "Connect before replacing.", "Automate where it matters.", "Use AI where it adds value.", "Keep people in control.", "Build for tomorrow without overengineering today."]} />

      {/* 18 — Value */}
      <IX_Sec id="erp-val-h" tone="off" k="Business value" t="What changes when the business finally works from one connected system?">
        <IX_Outcomes
          items={[
            ["Fewer manual handoffs", "shuffle", "Less movement of information between teams by hand.", "less"],
            ["Operational visibility", "eye", "See what's happening without waiting for reports.", "see"],
            ["Faster approvals", "check", "Visible approval paths with routine routing automated.", "fast"],
            ["Inventory control", "box", "Clearer view of stock, movement and replenishment.", "pulse"],
            ["Financial control", "coin", "Operational events connected with financial information.", "link"],
            ["Faster decisions", "target", "Timely access to useful operational intelligence.", "decide"],
            ["Lower data fragmentation", "database", "Fewer duplicated and disconnected records.", "less"],
          ]}
        />
      </IX_Sec>

      {/* services */}
      <IX_Sec id="erp-svc-h" tone="light" k="ERP development services" t="Service → business problem → value.">
        <IX_Services
          items={[
            ["Custom ERP development", "Standard ERP forces costly workarounds.", "An ERP shaped around your operation.", "code"],
            ["ERP customisation", "Your ERP fits — almost.", "Adapted workflows without a rebuild.", "sliders"],
            ["ERP integration", "Teams maintain parallel systems.", "One connected operational flow.", "link"],
            ["ERP modernisation", "A legacy ERP slows people down.", "Modern access to proven logic.", "refresh"],
            ["ERP migration", "Data trapped in old systems.", "Clean, trusted data in the new ERP.", "database"],
            ["ERP automation", "Routine steps done by hand.", "Work routed and completed automatically.", "bolt"],
            ["AI-enabled ERP", "Insight buried in transactions.", "Patterns, exceptions and answers surfaced.", "spark"],
            ["ERP dashboard development", "Reports assembled manually.", "Role-based operational views.", "bars"],
            ["ERP mobile applications", "Approvals wait for a desk.", "Act from the floor or the field.", "phone"],
            ["ERP maintenance & enhancement", "The ERP stopped evolving.", "A system that grows with you.", "sliders"],
          ]}
        />
      </IX_Sec>

      {/* 19 — Approach */}
      <IX_Sec id="erp-proc-h" tone="dark" k="ERP development approach" t="Delivered in controlled increments — and designed to keep evolving.">
        <IX_Timeline
          id="erp-tl"
          stages={[
            ["Understand", "Map processes, users, systems and business rules.", "search2"],
            ["Architect", "Define data, integrations, workflows and technology architecture.", "branch"],
            ["Design", "Create the experience around real operational roles.", "layout"],
            ["Build", "Develop modules, workflows, APIs and integrations in controlled increments.", "code"],
            ["Intelligence", "Introduce automation, dashboards and AI where appropriate.", "spark"],
            ["Validate", "Test functionality, security, performance, data and workflows.", "check"],
            ["Deploy", "Launch, migrate and enable users.", "rocket"],
            ["Evolve", "Maintain, optimise and extend as the business changes.", "refresh"],
          ]}
        />
      </IX_Sec>

      {/* 20 — Security */}
      <IX_Sec id="erp-sec-h" tone="off" k="Security & control" t="Operational software needs operational discipline." center>
        <IX_Trust
          center="Operational discipline"
          items={[
            ["Role-based access", "users", "People see what their role requires."],
            ["Permissions", "key", "Fine-grained control over actions."],
            ["Authentication", "lock", "Secure sign-in and session control."],
            ["Audit trails", "eye", "Every change traceable."],
            ["Secure APIs", "link", "Controlled integration points."],
            ["Data protection & backups", "database", "Protected data and a backup strategy."],
            ["Testing & deployment controls", "check", "Controlled, tested releases."],
            ["Monitoring & documentation", "doc", "Visibility and handover-ready documentation."],
          ]}
          note="Applied where applicable to each project. No certification or compliance framework is claimed on this page."
        />
      </IX_Sec>

      {/* 21 — Decision tree */}
      <IX_Sec id="erp-tree-h" tone="dark" k="Find your ERP approach" t="Is your ERP problem really an ERP problem?" s="Answer five questions for an honest starting point.">
        <IX_Tree
          id="erp-tree"
          formId={ERP_FORM}
          cta="Discuss My ERP Architecture"
          nodes={[
            { q: "Are teams working across disconnected systems?", s: "Disconnected systems", no: ["Your foundation may be fine.", "If systems are already connected, targeted dashboards or automation may deliver more than a new ERP."] },
            { q: "Are people repeatedly entering the same information?", s: "Duplicate entry", no: ["Look at visibility first.", "The friction may be reporting rather than data entry — dashboards and integrations could be the faster win."] },
            { q: "Are important approvals happening manually?", s: "Manual approvals", no: ["Focus on data flow.", "Integration between existing systems may remove most of the friction."] },
            { q: "Does management wait for reports to understand what is happening?", s: "Delayed visibility", no: ["Optimise the processes you have.", "Workflow automation on your current platform could be enough."] },
            { q: "Are existing ERP workflows forcing expensive workarounds?", s: "Expensive workarounds", no: ["Extend, don't replace.", "Modernisation, integration or custom modules around your current ERP are likely the best value."] },
          ]}
          final={["Consider modernisation, customisation or a custom ERP.", "Your answers point to a structural problem across systems, data and approvals. Let's map how the business moves and decide whether to configure, extend or build."]}
        />
      </IX_Sec>

      {/* industries */}
      <IX_Sec id="erp-ind-h" tone="light" k="Industries" t="ERP environments shaped by the industry's operating reality." s="Choose an industry to see a typical operational need." center>
        <IX_Industries
          items={[
            ["Manufacturing", "factory", "production planning connected to inventory, procurement and costing."],
            ["Retail", "cart", "multi-store stock, replenishment and sales in one view."],
            ["Distribution", "truck", "orders, warehouses and deliveries moving together."],
            ["Logistics", "truck", "shipments, fleets and billing connected."],
            ["Healthcare", "cross", "supplies, scheduling and billing with strict access control."],
            ["Pharmaceutical", "pill", "batch, inventory and quality records linked."],
            ["Financial Services", "coin", "approvals, controls and reporting across teams."],
            ["Agriculture", "wheat", "procurement from growers, stock and traceability."],
            ["Automotive", "car", "parts, service and dealer operations connected."],
            ["Energy", "bolt", "assets, maintenance and field operations."],
            ["Education", "book", "admissions, fees, staff and operations."],
            ["Real Estate", "home", "projects, contractors, sales and collections."],
            ["Food & Beverage", "leaf", "recipes, batches, inventory and expiry."],
            ["Telecommunications", "signal", "orders, assets and field service."],
            ["Information Technology", "cpu", "projects, resources and billing."],
            ["Government", "landmark", "approvals, procurement and accountability."],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="erp-faq"
        title="ERP development: common questions"
        items={ERP_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("crm-development")}>CRM development</PpL>, <PpL to={ppIt("custom-business-applications")}>custom business applications</PpL>, <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration</PpL>, <PpL to={ppIt("data-analytics-and-dashboard-development")}>dashboard development</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/erp-development-guide" title="ERP development guide" text="Planning modules, integrations, migration and rollout around how the business operates." />

      <IX_Final
        id="erp-final-h"
        kicker="Request an ERP Consultation"
        title="Turn disconnected processes into one connected operating environment."
        text="Data that moves with the work. Repetitive actions automated. Decision-makers who can see what needs attention. Tell us how the business runs today."
        cta={["Request an ERP Consultation", ERP_FORM]}
        cta2={["Explore IT & Development", "/services/it-development"]}
        flow={["Order", "Stock", "Purchase", "Invoice", "Approval", "Payment", "Dashboard"]}
        sig="Build the operational system around the business — not the business around the system."
      />

      <DM_Form
        id={ERP_FORM}
        kicker="ERP consultation"
        title="Build My ERP"
        sub="A few short questions help us understand your operation and recommend whether to configure, extend or build."
        type="ERP Development Enquiry"
        service="ERP Development"
        icon="layers"
        submitLabel="Discuss My ERP"
        successTitle="Thank you. Your ERP request has been sent."
        siteLabel="Company website (optional)"
        msgLabel="Message (optional)"
        msgPh="Departments, systems in use, approvals, locations, timelines — whatever helps"
        nextSteps={["We review your operation and current systems.", "We contact you to map the key workflows.", "You get options — configure, extend or build — and a recommended next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What kind of ERP project is it?", label: "Project type", options: ["New ERP", "ERP customisation", "ERP integration", "ERP migration", "ERP modernisation", "ERP automation", "AI-enabled ERP", "ERP maintenance"] },
          { k: "current", t: "Current ERP", q: "What do you use today?", label: "Existing ERP", options: ["Spreadsheets / accounting only", "Odoo", "SAP", "Microsoft Dynamics 365", "Tally / accounting software", "In-house system", "Other"] },
          { k: "challenge", t: "Challenge", q: "Where is the biggest friction?", label: "Business challenge", multi: true, options: ["Disconnected systems", "Duplicate data entry", "Manual approvals", "Inventory visibility", "Finance reconciliation", "Slow reporting", "Legacy ERP limits"] },
        ]}
      />

      <IX_Sec id="erp-rel-h" tone="dark" k="Related IT & Development services" t="Connected services">
        <IX_Related
          items={[
            ["IT & Development", "", "All business technology services."],
            ["CRM Development", "crm-development", "Customers and sales connected to operations."],
            ["Custom Software Development", "custom-software-development", "Software built around a unique process."],
            ["Custom Business Applications", "custom-business-applications", "Purpose-built operational tools."],
            ["API Development & Integration", "api-development-and-integration", "Connect the ERP to every system around it."],
            ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation and AI across operations."],
            ["Cloud & DevOps Services", "cloud-and-devops-services", "Reliable infrastructure for the ERP."],
            ["IT Consulting", "it-consulting", "Decide what to configure, extend or build."],
          ]}
          base={(s) => (s ? ppIt(s) : "/services/it-development")}
        />
      </IX_Sec>
    </div>
  );
}

export { ERP_Page };
