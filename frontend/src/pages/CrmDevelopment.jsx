/*
 * CRM Development — /services/it-development/crm-development (URL unchanged; previously the generic service template)
 * Build 42 rethink: "Build the CRM around the business, not the business around the CRM."
 * Signature visual: Business Operating Graph (customer at the centre, relationships that light up on hover).
 * No case studies, team details, example boxes, invented numbers, partnerships or certifications.
 * No market-research positioning — this is an IT & Development page.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIt } from '../components/dm/shared.jsx';
import { IX_Ask, IX_Band, IX_Eco, IX_Final, IX_Flows, IX_Fragment, IX_Graph, IX_Guide, IX_Hero, IX_Layers, IX_Matrix, IX_Motto, IX_Options, IX_Outcomes, IX_Related, IX_Roles, IX_Sec, IX_Services, IX_Stack, IX_Tiers, IX_Timeline, IX_Tree, IX_Trust, IX_VS, IX_Why, ixSchema } from '../components/dm/ixkit.jsx';

const CRM_URL = "/services/it-development/crm-development";
const CRM_TITLE = "Custom CRM Development Built Around You | Frequent Research";
const CRM_DESC = "Custom CRM development built around how you sell and serve: connected customer data, workflow automation and practical AI, without forcing a rigid tool.";
const CRM_FORM = "crm-project";

const CRM_FAQ = [
  ["What is custom CRM development?", "Designing and building a CRM around your own sales, service and account processes — your data model, workflows, roles and integrations — instead of adapting the business to a standard product."],
  ["When should a business build a custom CRM instead of using an existing platform?", "When the sales model, approvals or data relationships don't fit standard workflows, when workarounds are becoming expensive, or when the CRM must act as part of a wider operational system. If a standard platform fits, configuring it is usually the smarter choice."],
  ["Can you customise Salesforce, Zoho or Microsoft Dynamics?", "Yes — customisation, extensions, integrations and connected applications around platforms such as Salesforce, Zoho CRM and Microsoft Dynamics 365, depending on the platform's capabilities and your licences."],
  ["How much does custom CRM development cost?", "It depends on workflow complexity, number of users, integrations, automation, AI requirements, security, custom modules and platform choice, so an estimate follows a short discovery rather than a fixed price list."],
  ["How long does CRM development take?", "A focused first release can often be scoped to the core workflow and delivered in phases; the overall timeline depends on modules, integrations and data migration, and is agreed after discovery."],
  ["Can you integrate our CRM with existing business systems?", "Yes. ERP, accounting, email, WhatsApp, marketing platforms, support tools and internal applications can be connected through APIs and the access each system supports."],
  ["Can AI be integrated into a custom CRM?", "Yes, where it helps the business case — summaries, lead prioritisation, next-action suggestions, classification and natural-language search — with permissions, review and human control designed in."],
  ["Do you provide CRM maintenance and enhancements?", "Yes. Maintenance, monitoring, new workflows, integrations and improvements can continue after launch, because a CRM becomes more valuable as the business changes."],
];

function CRM_Page() {
  usePageMeta("CRM Development", CRM_DESC);
  dmMeta(CRM_URL, CRM_TITLE, CRM_DESC);
  ixSchema("crm", {
    url: CRM_URL,
    crumb: "CRM Development",
    name: "CRM Development",
    serviceType: "Custom CRM development",
    schemaDesc:
      "Custom CRM development built around business logic: customer, account and opportunity data, pipelines, workflow automation, approvals, communication integration (email, WhatsApp, SMS), AI-assisted summaries, prioritisation and natural-language search, role-based dashboards, integrations with ERP, finance, marketing and support systems, CRM customisation for existing platforms, migration and ongoing enhancement.",
    faq: CRM_FAQ,
  });
  return (
    <div className="pp sm dk ix-page crm-svc">
      <IX_Hero
        id="crm-h1"
        crumb="CRM Development"
        kicker="CRM Development · Built around your business logic"
        h1="CRM Development Built Around How Your Business Actually Works"
        lead="Stop forcing your sales process into someone else's CRM. Frequent Research designs CRM systems around your workflows, teams and customer journeys — with automation and AI working inside the operating layer, not bolted on beside it."
        cta={["Build My CRM", CRM_FORM]}
        cta2={["Discuss Your CRM", CRM_FORM]}
        cta3={["See what we can automate", "crm-flow-h"]}
        points={["Built around your workflow", "Connected customer data", "AI where it actually helps", "Client-owned system"]}
      >
        <IX_Graph
          center="Customer"
          centerIcon="user"
          title="One customer, one connected journey"
          label="Business operating graph: the customer at the centre, connected to leads, accounts, opportunities, sales, communication, tasks, documents, team, automation, AI and analytics. Hover a node to light up its relationships."
          nodes={[
            ["Lead", "target"],
            ["Account", "building"],
            ["Opportunity", "trend"],
            ["Sales", "coin"],
            ["Communication", "chat"],
            ["Tasks", "check"],
            ["Documents", "doc"],
            ["Team", "users"],
            ["Automation", "bolt"],
            ["AI", "spark"],
            ["Analytics", "bars"],
          ]}
          links={[
            [0, 2],
            [0, 9],
            [1, 2],
            [1, 6],
            [2, 3],
            [2, 5],
            [3, 10],
            [4, 1],
            [4, 9],
            [5, 7],
            [5, 8],
            [8, 4],
            [9, 10],
            [7, 10],
          ]}
          journey={[
            ["Lead", [0]],
            ["Qualification", [0, 9]],
            ["Opportunity", [2, 1]],
            ["Proposal", [2, 6]],
            ["Follow-up", [4, 5, 8]],
            ["Conversion", [3]],
            ["Retention", [1, 4, 10]],
          ]}
        />
      </IX_Hero>

      <IX_Band tone="off" micro={["Built around your workflow", "Automate the repetitive", "Connect the disconnected", "Make customer data useful"]} text="A CRM should adapt to the business — not force the business to adapt to the CRM." sub="We don't start with screens. We start with how your business actually moves." />

      {/* 2 — Problem */}
      <IX_Sec id="crm-prob-h" tone="light" k="The hidden cost of disconnected customer operations" t="Your CRM shouldn't create more work than it removes." s="When customer information lives in spreadsheets, inboxes, chats and three different tools, the CRM becomes one more place to update — not the place where work moves forward." center>
        <IX_Fragment
          hub="One customer record"
          tools={[
            ["Spreadsheet", "grid"],
            ["Email", "mail"],
            ["WhatsApp", "chat"],
            ["Sales tool", "trend"],
            ["CRM", "users"],
            ["Finance", "coin"],
            ["Support", "help"],
            ["Management", "bars"],
          ]}
          issues={[
            ["Data fragmentation", "layers", "One version of the customer"],
            ["Duplicate work", "refresh", "Enter it once"],
            ["Delayed decisions", "clock", "Visibility when it matters"],
            ["Lost opportunities", "flag", "Follow-ups that don't depend on memory"],
          ]}
          caption="Sales re-keying the same details, follow-ups living in someone's memory, managers waiting for reports — the friction is in the gaps between systems."
        />
      </IX_Sec>

      {/* 3 — Difference */}
      <IX_Sec id="crm-diff-h" tone="dark" k="The Frequent Research difference" t="We don't customise the CRM screen. We customise the business logic behind it." s="Business process → customer journey → sales operation → data → automation → AI → decision. Not requirement → coding → deployment.">
        <IX_Tiers
          variant="journey"
          cols={[
            { t: "Business logic", icon: "compass", s: "The CRM reflects how you actually sell, service and operate.", items: ["Your sales stages", "Your approval rules", "Your account structure"] },
            { t: "Workflow intelligence", icon: "shuffle", s: "Automations follow real business triggers, not arbitrary software rules.", items: ["Event-based triggers", "Assignment rules", "Escalations"] },
            { t: "Data architecture", icon: "database", s: "Customer, company, opportunity and communication data connected intelligently.", items: ["One customer record", "Relationship mapping", "Clean history"] },
            { t: "AI-assisted operations", icon: "spark", s: "An intelligent layer that assists people and processes — not one that replaces them.", items: ["Lead prioritisation", "Summaries", "Next actions", "Document understanding"] },
          ]}
          final="Your business logic is the product. The CRM is how it runs every day."
        />
      </IX_Sec>

      {/* 4 — Workflows */}
      <IX_Sec id="crm-flow-h" tone="off" k="A CRM that thinks in workflows" t="From CRM records to business workflows." s="A record-keeping CRM waits for people to update it. A workflow CRM moves the next step forward when something happens.">
        <IX_Flows
          cols={[
            { t: "Traditional CRM", s: "Records waiting for someone", steps: [["Lead", ""], ["Record", ""], ["Manual update", "Manual"], ["Manual follow-up", "Manual"], ["Report", "Later"]] },
            {
              t: "Intelligent CRM",
              s: "Work that moves itself forward",
              steps: [
                ["Lead enters", "Trigger"],
                ["Data enriched", "Auto"],
                ["Lead classified", "AI-assisted"],
                ["Priority determined", "AI-assisted"],
                ["Owner assigned", "Rule"],
                ["Follow-up triggered", "Auto"],
                ["AI-assisted summary", "AI-assisted"],
                ["Manager insight", "Live"],
                ["Next action recommended", "Human decides"],
              ],
              foot: "Turn repetitive handoffs into automated actions, so teams spend less time updating systems and more time acting on information.",
            },
          ]}
        />
      </IX_Sec>

      {/* 5 — Capability matrix */}
      <IX_Sec id="crm-cap-h" tone="light" k="What can be built" t="A CRM capability matrix — built around what your teams need to do." s="Choose an area. Every capability is there to solve a business problem, not to fill a feature list.">
        <IX_Matrix
          id="crm-mx"
          cats={[
            { t: "Customer", icon: "user", problem: "Customer history is scattered across inboxes, files and people's memories.", value: "One relationship view every team can trust and act on.", items: [["Customer profiles", "Everything known about a customer in one place, from first contact onward."], "Account management", "Contact management", ["Customer history", "See every interaction before the next conversation."], ["Relationship mapping", "Understand who influences the decision inside an account."]] },
            { t: "Sales", icon: "trend", problem: "Pipelines show activity, but not where deals are really stuck or which leads deserve attention.", value: "A pipeline that reflects your sales model and points to the next best move.", items: [["Lead management", "Capture, de-duplicate and route leads from every source."], "Opportunity management", ["Pipeline management", "Stages that mirror how your deals actually progress."], ["Sales forecasting", "Forecast signals built from your own pipeline data."], "Territory management", ["Lead scoring", "Help sales teams spend time where conversion potential is highest."], "Sales activity tracking"] },
            { t: "Workflow", icon: "shuffle", problem: "Approvals, assignments and escalations depend on emails and reminders.", value: "Rules that move work forward and make ownership visible.", items: [["Custom workflows", "Your process, encoded — not a generic template."], ["Approval systems", "Discounts, proposals and exceptions routed to the right approver."], "Notifications", "Task automation", ["Assignment rules", "The right owner, every time, without a manual handoff."], ["Escalation rules", "Nothing sits idle without someone knowing."]] },
            { t: "Communication", icon: "chat", problem: "Conversations happen on email, WhatsApp and phone — and never reach the CRM.", value: "Every conversation attached to the customer, with timely automated touchpoints.", items: [["Email integration", "Threads linked to the right contact and deal."], ["WhatsApp integration", "Business conversations captured where customers prefer to talk."], "SMS integration", "Communication history", "Automated notifications"] },
            { t: "Intelligence", icon: "spark", problem: "Teams have data, but not the time to read it before every call or decision.", value: "AI that summarises, prioritises and suggests — while people decide.", items: [["AI-assisted summaries", "Account history condensed before a call."], ["Lead prioritisation", "Surface the leads most likely to need attention now."], ["Recommended next actions", "Suggestions grounded in the record — accepted or ignored by people."], "Customer insights", ["Automated classification", "Requests and emails sorted without manual tagging."], ["Natural-language search", "Ask the CRM a question instead of building a filter."], "AI-assisted reporting"] },
            { t: "Analytics", icon: "bars", problem: "Reports are assembled by hand, after the moment to act has passed.", value: "Give every role the view it actually needs — from sales activity to executive pipeline visibility.", items: ["Executive dashboards", "Sales dashboards", ["Pipeline analytics", "See movement, not just totals."], "Team performance", "Conversion tracking", "Custom reports"] },
            { t: "Integration", icon: "link", problem: "Customer information stops at the boundary of every application.", value: "Connect the CRM to the systems teams already depend on.", items: [["APIs", "Clean, documented connections to and from the CRM."], ["ERP", "Orders, invoices and stock visible beside the customer."], "Accounting systems", "Marketing platforms", "Support systems", "Internal applications", "Third-party services"] },
          ]}
        />
      </IX_Sec>

      {/* 6 — Architecture */}
      <IX_Sec id="crm-arch-h" tone="dark" k="CRM architecture" t="One customer record. Every important interaction connected." s="Select a layer to see what it does — and why it matters as the CRM grows.">
        <IX_Layers
          layers={[
            { t: "Experience layer", icon: "layout", items: ["Web", "Mobile", "Sales dashboard", "Management dashboard"], note: "Each role gets the interface it needs — field sales on mobile, managers on a pipeline view, leadership on outcomes." },
            { t: "CRM core", icon: "users", items: ["Customers", "Leads", "Accounts", "Opportunities", "Tasks", "Activities"], note: "The business objects and relationships, modelled on how your organisation actually sells and serves." },
            { t: "Automation layer", icon: "bolt", items: ["Workflow engine", "Rules", "Notifications", "Approvals", "Triggers"], note: "Business events trigger the next action automatically, with clear ownership and an audit trail." },
            { t: "AI intelligence layer", icon: "spark", items: ["Summarisation", "Classification", "Recommendations", "Search", "Predictions", "Insights"], note: "AI works on permitted CRM data to assist people — summaries, prioritisation and answers — never acting without control." },
            { t: "Integration layer", icon: "link", items: ["APIs", "ERP", "Finance", "Marketing", "Communication", "Support"], note: "Customer information flows to and from the systems around the CRM instead of being re-typed." },
            { t: "Data layer", icon: "database", items: ["Structured business data", "Documents", "Interaction history", "Analytics"], note: "A clean, governed data foundation that makes reporting and AI trustworthy." },
          ]}
        />
      </IX_Sec>

      {/* 7 — AI */}
      <IX_Sec id="crm-ai-h" tone="ink" k="AI inside the CRM" t="AI should work inside your CRM — not sit beside it." s="Practical intelligence on the records your teams already use. Introduced where relevant to the business case.">
        <IX_Ask
          cards={[
            ["AI sales assistant", "spark", "Summarise account history and surface what matters before a sales call."],
            ["Smart follow-up", "mail", "Spot follow-up opportunities and help teams draft relevant responses."],
            ["Customer intelligence", "user", "Turn scattered interactions into a usable relationship view."],
            ["Natural-language CRM search", "search2", "Ask the CRM questions in plain language instead of building filters."],
            ["Management intelligence", "bars", "Convert CRM activity into decision-ready insight for managers."],
            ["Automated classification", "layers", "Sort incoming emails, requests and leads without manual tagging."],
          ]}
          queries={[
            ["Which opportunities have been inactive for more than 14 days?", ["Opportunity · Proposal stage · no activity", "Opportunity · Negotiation · owner reminded", "Opportunity · Discovery · awaiting customer"]],
            ["Which accounts have upcoming renewals?", ["Account · renewal next month · healthy", "Account · renewal this quarter · needs review", "Account · renewal soon · open support issue"]],
            ["Show high-value leads without a follow-up this week.", ["Lead · enterprise segment · unassigned", "Lead · referral · first call pending", "Lead · inbound demo request · no reply yet"]],
          ]}
          note="AI capabilities are scoped per project — included where they serve the business case, with permissions, review and human control designed in."
        />
      </IX_Sec>

      {/* 8 — Standard vs custom */}
      <IX_Sec id="crm-vs-h" tone="off" k="Custom vs off-the-shelf" t="When standard CRM stops fitting the business." s="Salesforce, Zoho CRM and Microsoft Dynamics 365 are excellent where they fit. The question is whether your model fits them." center>
        <IX_VS
          left="Off-the-shelf CRM"
          right="Frequent Research custom CRM"
          rows={[
            ["Standard workflows", "Business-specific workflows"],
            ["Feature-led", "Business-outcome-led"],
            ["Fixed structures", "Flexible architecture"],
            ["Manual adaptation", "Process-aware automation"],
            ["Generic dashboards", "Role-specific intelligence"],
            ["Multiple disconnected tools", "Connected ecosystem"],
            ["Vendor-defined limits", "Client-owned system"],
          ]}
          quote="Use a standard CRM when it fits. Build custom when your business has outgrown the standard model."
        />
      </IX_Sec>

      {/* 9 — Decision tree */}
      <IX_Sec id="crm-tree-h" tone="dark" k="A consultative check" t="Should you build a custom CRM?" s="Four questions. An honest answer — even if it's “configure what you have”.">
        <IX_Tree
          id="crm-tree"
          formId={CRM_FORM}
          cta="Discuss my answer"
          nodes={[
            { q: "Does your sales or service process differ meaningfully from standard CRM workflows?", s: "Process fit", no: ["Configure an existing CRM.", "If standard workflows match how you work, configuring a proven platform is usually faster and more economical. We can help configure, integrate and extend it."] },
            { q: "Are workarounds — spreadsheets, manual steps, duplicate entry — becoming expensive?", s: "Workaround cost", no: ["Optimise before you rebuild.", "Targeted automation or integrations on your current CRM may remove the friction without a new system."] },
            { q: "Do several systems need to work together around the customer?", s: "Connected systems", no: ["Customise the platform you have.", "Deeper customisation of your existing CRM may be enough when the problem is inside one system."] },
            { q: "Would custom automation create measurable operational value?", s: "Automation value", no: ["Start with a focused improvement.", "Begin with the highest-friction workflow and measure the result before committing to a larger build."] },
          ]}
          final={["A custom CRM may be the better architecture.", "Your process, workarounds and system landscape suggest a CRM designed around your business logic. Let's map the workflow and decide what to build — and what to keep."]}
        />
      </IX_Sec>

      {/* 10 — Roles */}
      <IX_Sec id="crm-role-h" tone="light" k="Built around your role" t="One system. Multiple teams. One view each." s="Choose a role to see how the same CRM shows each person what they need to act on." center>
        <IX_Roles
          id="crm-roles"
          app="CRM workspace"
          roles={[
            { t: "Sales", icon: "trend", focus: "What should I do next — and with whom?", widgets: [{ t: "Prioritised leads", icon: "target", items: [["Inbound demo request", "hot"], ["Referral lead", "warn"], ["Returning customer", "ok"]] }, { t: "Today's follow-ups", icon: "cal", items: [["Proposal follow-up", "warn"], ["Intro call", "ok"], ["Contract question", "hot"]] }, { t: "Open opportunities", icon: "trend", kind: "bars" }, { t: "Recent communication", icon: "chat", items: [["Email reply received", "info"], ["WhatsApp message", "info"], ["Call logged", "ok"]] }] },
            { t: "Sales management", icon: "bars", focus: "Where is the pipeline healthy — and where is it stuck?", widgets: [{ t: "Pipeline health", icon: "gauge", kind: "ring" }, { t: "Conversion movement", icon: "trend", kind: "spark" }, { t: "Team performance", icon: "users", kind: "bars" }, { t: "Forecast signals", icon: "signal", items: [["Deals slipping stage", "warn"], ["Large deal at risk", "hot"], ["New qualified pipeline", "ok"]] }] },
            { t: "Customer success", icon: "heart", focus: "Which customers need attention before they ask?", widgets: [{ t: "Customer health", icon: "heart", kind: "ring" }, { t: "Upcoming renewals", icon: "cal", items: [["Renewal next month", "warn"], ["Renewal this quarter", "ok"]] }, { t: "Open issues", icon: "help", items: [["Escalated ticket", "hot"], ["Feature request", "info"]] }, { t: "Engagement trend", icon: "trend", kind: "spark" }] },
            { t: "Operations", icon: "sliders", focus: "What is waiting, blocked or exceptional?", widgets: [{ t: "Workflow status", icon: "shuffle", kind: "bars" }, { t: "Pending approvals", icon: "check", items: [["Discount approval", "warn"], ["Credit terms", "warn"], ["Contract change", "ok"]] }, { t: "Task queues", icon: "queue", items: [["Onboarding tasks", "ok"], ["Data corrections", "info"]] }, { t: "Exceptions", icon: "flag", items: [["Duplicate account detected", "hot"], ["Missing contract", "warn"]] }] },
            { t: "Marketing", icon: "megaphone", focus: "Which sources bring leads that sales actually want?", widgets: [{ t: "Lead sources", icon: "layers", kind: "bars" }, { t: "Campaign responses", icon: "mail", kind: "spark" }, { t: "Hand-off quality", icon: "check", kind: "ring" }, { t: "Segments", icon: "users", items: [["New enquiries", "info"], ["Re-engaged contacts", "ok"]] }] },
            { t: "Leadership", icon: "eye", focus: "Is the business moving in the right direction?", widgets: [{ t: "Revenue pipeline", icon: "coin", kind: "spark" }, { t: "Customer health", icon: "heart", kind: "ring" }, { t: "Business trends", icon: "trend", kind: "bars" }, { t: "Strategic indicators", icon: "target", items: [["Pipeline coverage", "ok"], ["Key accounts at risk", "warn"], ["New market traction", "info"]] }] },
          ]}
        />
      </IX_Sec>

      {/* 11 — Integrations */}
      <IX_Sec id="crm-int-h" tone="dark" k="CRM integrations" t="Customer information shouldn't stop at the boundary of an application." s="Connect the CRM to the systems your teams already depend on." center wide>
        <IX_Eco
          center="CRM core"
          centerIcon="users"
          groups={[
            { t: "Communication", icon: "chat", items: ["Email", "WhatsApp", "SMS"] },
            { t: "Business systems", icon: "building", items: ["ERP", "Accounting", "HR", "Support"] },
            { t: "Marketing", icon: "megaphone", items: ["Marketing automation", "Lead sources", "Advertising platforms"] },
            { t: "Data", icon: "database", items: ["BI platforms", "Data warehouses", "Analytics"] },
            { t: "Productivity", icon: "cal", items: ["Calendar", "Documents", "Cloud storage"] },
            { t: "Existing CRM platforms", icon: "layers", items: ["Salesforce", "Zoho CRM", "Dynamics 365"] },
          ]}
        />
        <p className="ix-note" style={{ textAlign: "center" }}>
          Integrations use the access each system supports. Platform names indicate ecosystems we can work with, not partnerships. See also{" "}
          <PpL to={ppIt("api-development-and-integration")}>API development &amp; integration</PpL> and <PpL to={ppIt("erp-development")}>ERP development</PpL>.
        </p>
      </IX_Sec>

      {/* custom / customise / hybrid */}
      <IX_Sec id="crm-opt-h" tone="off" k="Configure when possible. Custom-build when necessary." t="Custom build, CRM customisation — or a hybrid of both." s="Not every CRM problem needs a new CRM. Choose the route that fits." center>
        <IX_Options
          items={[
            { t: "Custom build", tag: "Purpose-built", icon: "code", d: "For organisations with highly specialised workflows.", best: ["Unique sales or service model", "Several systems must become one", "Business logic is a competitive edge"] },
            { t: "CRM customisation", tag: "Extend what you have", icon: "sliders", d: "For teams on Salesforce, Zoho or Microsoft Dynamics that need deeper adaptation.", best: ["Platform is valuable", "Workflows need adapting", "Integrations matter"] },
            { t: "Hybrid architecture", tag: "Platform + custom", icon: "layers3", d: "A CRM platform connected to custom business applications.", best: ["Keep the platform's strengths", "Custom apps for specialised work", "One connected data flow"] },
          ]}
          foot="We don't assume you need to build from scratch. We help you decide what to configure, what to extend and what to build."
        />
      </IX_Sec>

      {/* 12 — Technology */}
      <IX_Sec id="crm-tech-h" tone="light" k="Technology capabilities" t="Technology that supports the business story — not the other way round." s="Chosen per problem, grouped by purpose.">
        <IX_Stack
          groups={[
            ["Frontend", "layout", ["React", "Next.js"], "Fast, role-based interfaces"],
            ["Backend", "code", ["Node.js", "Python", "PHP / Laravel"], "Business logic, rules and APIs"],
            ["Mobile", "phone", ["Flutter", "React Native"], "CRM in the field"],
            ["Cloud", "cloud", ["AWS", "Microsoft Azure", "Google Cloud"], "Secure, scalable hosting"],
            ["Data & APIs", "link", ["REST APIs", "Third-party integrations", "Business system integration"], "Connected customer data"],
            ["AI & automation", "spark", ["AI-assisted workflows", "LLM integration", "Intelligent search", "Workflow automation", "Data classification"], "Intelligence inside the workflow"],
          ]}
          note="We select technology based on the problem — not because a framework is fashionable. No partnerships or certifications are implied."
        />
      </IX_Sec>

      {/* 13 — Security */}
      <IX_Sec id="crm-sec-h" tone="off" k="Security, ownership & scalability" t="Your business system. Your data. Your code." center>
        <IX_Trust
          center="Your CRM, under control"
          items={[
            ["Secure architecture", "shield", "Security designed in, not added at the end."],
            ["Role-based permissions", "users", "Each role sees and does only what it should."],
            ["Access control", "lock", "Authentication and access policies per organisation."],
            ["Data protection", "database", "Sensitive customer data handled with care."],
            ["Auditability", "eye", "Who changed what, and when."],
            ["Secure API design", "link", "Controlled, authenticated integrations."],
            ["Testing & deployment controls", "check", "Releases tested and controlled."],
            ["Documentation & code ownership", "doc", "Source code and documentation handed over as contractually agreed."],
          ]}
          note="Security and compliance requirements are defined per project; no certification is claimed on this page."
        />
      </IX_Sec>

      {/* 14 — Why */}
      <IX_Sec id="crm-why-h" tone="light" k="Why Frequent Research" t="Why businesses work with Frequent Research on CRM.">
        <IX_Why
          items={[
            ["Business + technology thinking", "compass", "We approach CRM development as a business system rather than a software project — the operating system behind customer relationships, sales workflows and business intelligence."],
            ["Business-first engineering", "target", "Technology decisions start with business logic, not technology trends."],
            ["One accountable partner", "users", "Strategy, design, development, integration and improvement coordinated through one technology partner."],
            ["AI where it creates value", "spark", "Introduced where it reduces repetitive work, improves information access or strengthens decisions."],
            ["Built for change", "refresh", "Architecture that lets the CRM evolve as the organisation grows."],
            ["Transparent development", "eye", "You understand what is being built, why it matters and where the project stands."],
            ["Practical technology", "sliders", "The right tool for the problem — not the most fashionable one."],
          ]}
        />
      </IX_Sec>

      {/* 15 — Philosophy */}
      <IX_Motto id="crm-moto-h" kicker="Our technology philosophy" quote="“Technology should remove friction, not create another layer of it.”" lines={["Build around the workflow.", "Automate the repetitive.", "Connect the disconnected.", "Make data useful.", "Keep people in control."]} />

      {/* 16 — Value */}
      <IX_Sec id="crm-val-h" tone="off" k="Business value" t="What changes when the CRM fits the business?">
        <IX_Outcomes
          items={[
            ["Less manual work", "bolt", "Repetitive administrative tasks handled by automation.", "less"],
            ["Better visibility", "eye", "A clearer view of customer activity and pipeline movement.", "see"],
            ["Faster follow-up", "clock", "Customer activity turned into timely actions.", "fast"],
            ["Connected operations", "link", "Customer information brought together across systems.", "link"],
            ["Better decisions", "target", "Operational CRM data turned into management intelligence.", "decide"],
          ]}
        />
      </IX_Sec>

      {/* services */}
      <IX_Sec id="crm-svc-h" tone="light" k="CRM development services" t="Service → problem solved → business value." s="Start where the friction is.">
        <IX_Services
          items={[
            ["Custom CRM development", "Your process doesn't fit standard CRM.", "A CRM shaped around your business logic.", "code"],
            ["CRM web development", "Teams need a fast browser-based CRM.", "Role-based workspaces anywhere.", "globe"],
            ["CRM application development", "Specialised modules are missing.", "Purpose-built modules on your CRM.", "grid"],
            ["CRM integration", "Customer data stops at app boundaries.", "One connected customer record.", "link"],
            ["CRM modernisation", "A legacy CRM slows teams down.", "Modern experience without losing history.", "refresh"],
            ["CRM automation", "Handoffs and reminders are manual.", "Work that moves itself forward.", "bolt"],
            ["AI-enabled CRM development", "Teams lack time to read the data.", "Summaries, priorities and answers in context.", "spark"],
            ["CRM dashboard development", "Reports are assembled by hand.", "The right view for every role.", "bars"],
            ["CRM migration", "Data trapped in old tools or spreadsheets.", "Clean, mapped data in the new system.", "database"],
            ["CRM maintenance & enhancement", "The CRM stood still after launch.", "A system that keeps improving.", "sliders"],
          ]}
        />
      </IX_Sec>

      {/* 17 — Approach */}
      <IX_Sec id="crm-proc-h" tone="dark" k="Development approach" t="From business rules to a CRM that keeps improving." s="Select a stage.">
        <IX_Timeline
          id="crm-tl"
          stages={[
            ["Discover", "Understand business rules, users and where work gets stuck.", "search2"],
            ["Model", "Map customer journeys, relationships and data.", "branch"],
            ["Design", "Create the CRM experience for each role.", "layout"],
            ["Engineer", "Build the application and integrations in visible increments.", "code"],
            ["Automate", "Introduce automation and AI where they are useful.", "spark"],
            ["Validate", "Test workflows, performance and security.", "check"],
            ["Launch", "Deploy, migrate and enable the organisation.", "rocket"],
            ["Evolve", "Maintain, optimise and extend.", "refresh"],
          ]}
          note="A CRM is not finished when it launches. It becomes valuable as the business evolves."
        />
      </IX_Sec>

      <DM_Faq
        id="crm-faq"
        title="CRM development: common questions"
        items={CRM_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("custom-software-development")}>custom software development</PpL>, <PpL to={ppIt("custom-business-applications")}>custom business applications</PpL>, <PpL to={ppIt("data-analytics-and-dashboard-development")}>dashboard development</PpL>. External references:{" "}
            <PpX href="https://www.salesforce.com/crm/">Salesforce</PpX>, <PpX href="https://www.zoho.com/crm/">Zoho CRM</PpX>, <PpX href="https://learn.microsoft.com/dynamics365/">Microsoft Dynamics 365 docs</PpX>.
          </>
        }
      />

      <IX_Guide to="/blog/crm-development-guide" title="CRM development guide" text="How to plan a CRM around your sales model, data and integrations." />

      <IX_Final
        id="crm-final-h"
        kicker="Discuss My CRM"
        title="Your CRM problem probably isn't a software problem."
        text="It may be a workflow, data, visibility or automation problem. Tell us where the friction is. We'll help you work out what the technology should actually do."
        cta={["Discuss My CRM", CRM_FORM]}
        cta2={["Request a CRM Consultation", "/lets-talk?type=it"]}
        flow={["Lead", "Account", "Opportunity", "Follow-up", "Approval", "Insight", "Renewal"]}
        sig="Build the CRM around the business, not the business around the CRM."
      />

      <DM_Form
        id={CRM_FORM}
        kicker="CRM consultation"
        title="Build My CRM"
        sub="A few short questions help us understand your CRM situation and suggest the right next step."
        type="CRM Development Enquiry"
        service="CRM Development"
        icon="users"
        submitLabel="Discuss My CRM"
        successTitle="Thank you. Your CRM request has been sent."
        siteLabel="Company website (optional)"
        msgLabel="Message (optional)"
        msgPh="Teams, workflows, systems to connect, timelines — whatever helps"
        nextSteps={["We review your CRM situation and challenge.", "We contact you to understand the workflow.", "You get options — configure, customise or build — and a recommended next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What kind of CRM project is it?", label: "Project type", options: ["New CRM", "Existing CRM customisation", "CRM migration", "CRM integration", "CRM automation", "AI-enabled CRM", "CRM modernisation", "Maintenance / enhancement"] },
          { k: "current", t: "Current CRM", q: "What do you use today?", label: "Existing CRM", options: ["Spreadsheets / no CRM", "Salesforce", "Zoho CRM", "Microsoft Dynamics 365", "HubSpot", "In-house system", "Other"] },
          { k: "challenge", t: "Challenge", q: "Where is the biggest friction?", label: "Business challenge", multi: true, options: ["Leads get lost", "Manual data entry", "Disconnected systems", "Slow follow-up", "Poor visibility / reporting", "Rigid workflows", "Want AI assistance"] },
        ]}
      />

      <IX_Sec id="crm-rel-h" tone="dark" k="Related IT & Development services" t="Connected services">
        <IX_Related
          items={[
            ["IT & Development", "", "All business technology services."],
            ["ERP Development", "erp-development", "Connect customers with finance, inventory and operations."],
            ["Custom Business Applications", "custom-business-applications", "Purpose-built tools around your workflows."],
            ["API Development & Integration", "api-development-and-integration", "Connect the CRM to every system around it."],
            ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation and AI across the business."],
            ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Decision-ready views on CRM data."],
            ["UI/UX Design", "ui-ux-design", "CRM experiences people want to use."],
            ["Application Maintenance & Support", "application-maintenance-and-support", "Keep the CRM improving after launch."],
          ]}
          base={(s) => (s ? ppIt(s) : "/services/it-development")}
        />
      </IX_Sec>
    </div>
  );
}

export { CRM_Page };
