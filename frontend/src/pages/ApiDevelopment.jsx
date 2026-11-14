/*
 * API Development & Integration — /services/it-development/api-development-and-integration
 * (URL unchanged: the site's established slug is "api-development-and-integration"; the brief's suggested
 *  "/api-development-integration" would be a URL change, so the existing URL is preserved.)
 * Build 42 rethink: "Don't build another island. Connect the systems you already depend on."
 * Signature visuals: connected-business map, friction → flow, request/response, integration intelligence,
 * architecture layers, AI access path, observability panel, event-driven flow.
 * No team block, no example engagement, no example boxes, no invented numbers, partnerships or certifications.
 * No market-research positioning — this is an IT & Development page.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Band, IX_Chain, IX_Control, IX_Event, IX_Final, IX_Flows, IX_Fragment, IX_Graph, IX_Guide, IX_Hero, IX_Industries, IX_Layers, IX_Matrix, IX_Motto, IX_Options, IX_Outcomes, IX_Related, IX_Sec, IX_Stack, IX_Timeline, IX_Trust, IX_Why, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';

const APX_URL = "/services/it-development/api-development-and-integration";
const APX_TITLE = "API Development & Integration Services | Frequent Research";
const APX_DESC = "API development and integration that connects CRM, ERP, payments, communication and AI into one working business: secure, observable and ready to evolve.";
const APX_FORM = "api-project";

const APX_FAQ = [
  ["What does API Development & Integration include?", "Designing and building custom APIs, connecting existing systems and third-party platforms, webhooks and event-driven workflows, security, documentation, monitoring and ongoing maintenance — scoped around the business workflow."],
  ["Can you integrate our existing CRM, ERP or SaaS platforms?", "Yes. CRM, ERP, accounting, HR, e-commerce, support and other SaaS platforms can be connected using the APIs and access each platform provides."],
  ["Can you integrate payment gateways and communication platforms?", "Yes — payment gateways and processors such as Stripe or PayPal, and communication channels such as the WhatsApp Business API, SMS and email, where the provider and your account support it."],
  ["Can API integration support AI and automation?", "Yes. Well-designed APIs give AI assistants and automated workflows controlled, permissioned access to the business data and actions they need — with logging and human approval where necessary."],
  ["How do you approach API security?", "Security is designed into the architecture: authentication and authorisation (such as OAuth), role-based access, input validation, rate limiting, secrets management, encryption, logging and monitoring."],
  ["Can you integrate legacy systems with modern applications?", "Often, yes — through existing interfaces, database access, file exchanges or a new API layer in front of the legacy system, depending on what it supports."],
  ["Do we own the API code and documentation?", "Ownership of code, documentation and technical assets is set out in the project agreement and is intended to stay with the client."],
  ["How much does API Development & Integration cost?", "It depends on the number of systems, data mapping, security, volume, event handling, monitoring and support required, so an estimate follows a short discovery."],
];

/* request / response visual */
const APX_CALLS = [
  ["POST", "/orders", "201 Created", "Order received from the website"],
  ["GET", "/customers/{id}", "200 OK", "CRM profile returned to the support app"],
  ["POST", "/webhooks/payment", "202 Accepted", "Payment confirmation queued for processing"],
  ["PATCH", "/inventory/{sku}", "200 OK", "Stock level synchronised with the ERP"],
];
function APX_Req() {
  const [ref, v] = ppIn(0.3);
  const [i] = ixCycle(APX_CALLS.length, v, 2600, false);
  const c = APX_CALLS[i];
  return (
    <div ref={ref} className={"apx-rq" + (v ? " is-in" : "")}>
      <div className="apx-rq__side">
        <small>Client</small>
        <b>Website · App · Partner</b>
      </div>
      <div className="apx-rq__wire" key={i} aria-live="polite">
        <span className="apx-rq__req">
          <em>{c[0]}</em> {c[1]}
        </span>
        <i aria-hidden="true" />
        <span className="apx-rq__res">{c[2]}</span>
        <small>{c[3]}</small>
      </div>
      <div className="apx-rq__side apx-rq__side--r">
        <small>API layer</small>
        <b>Auth · Validate · Route · Log</b>
      </div>
    </div>
  );
}

function APX_Page() {
  usePageMeta("API Development & Integration", APX_DESC);
  dmMeta(APX_URL, APX_TITLE, APX_DESC);
  ixSchema("apx", {
    url: APX_URL,
    crumb: "API Development & Integration",
    name: "API Development & Integration",
    serviceType: "API development and system integration",
    schemaDesc:
      "API development and integration built around business workflows: custom REST and GraphQL APIs, internal and public APIs, CRM, ERP and SaaS integrations, payment gateway and communication integrations (WhatsApp Business API, SMS, email), webhooks and event-driven architecture, data synchronisation, AI-ready access layers, security by design, observability, documentation, legacy integration and ongoing maintenance.",
    faq: APX_FAQ,
  });
  return (
    <div className="pp sm dk ix-page apx-svc">
      <IX_Hero
        id="apx-h1"
        crumb="API Development & Integration"
        kicker="API Development & Integration · The engineering layer that connects the business"
        h1="Make Your Systems Work Like One."
        lead="Disconnected systems create operational friction. Connected systems create leverage. Frequent Research designs the APIs and integrations that make your software, data, workflows and AI work together — securely, and with room to evolve."
        cta={["Plan My Integration", APX_FORM]}
        cta2={["Request a Quote", APX_FORM]}
        cta3={["See how the connection works", "apx-arch-h"]}
        points={["API architecture built around business workflows", "Secure system-to-system connectivity", "AI-ready integration foundations", "Ownership of code and documentation"]}
      >
        <IX_Graph
          center="API & integration layer"
          centerIcon="api"
          api
          title="One business event, every system updated"
          label="Connected business system: an API and integration layer at the centre connecting CRM, ERP, website, mobile app, payments, communication, analytics, cloud, AI, external SaaS and internal systems. Hover a system to see an example request."
          nodes={[
            ["CRM", "users", "GET /customers/{id}"],
            ["ERP", "building", "PATCH /inventory/{sku}"],
            ["Website", "globe", "POST /orders"],
            ["Mobile app", "phone", "GET /orders/{id}/status"],
            ["Payments", "coin", "POST /webhooks/payment"],
            ["Communication", "chat", "POST /messages"],
            ["Analytics", "bars", "POST /events"],
            ["Cloud", "cloud", "PUT /files/{key}"],
            ["AI", "spark", "POST /assist/summarise"],
            ["External SaaS", "layers", "GET /partners/sync"],
            ["Internal systems", "cpu", "GET /legacy/records"],
          ]}
          links={[
            [2, 4],
            [4, 1],
            [1, 0],
            [0, 5],
            [5, 3],
            [2, 6],
            [8, 0],
            [9, 1],
            [10, 1],
            [7, 6],
          ]}
          journey={[
            ["Order placed", [2]],
            ["Payment confirmed", [4]],
            ["ERP updated", [1]],
            ["CRM updated", [0]],
            ["Customer notified", [5, 3]],
            ["Analytics updated", [6]],
          ]}
        />
      </IX_Hero>

      <IX_Band tone="off" micro={["Architecture", "Connectivity", "Data flow", "Automation", "Intelligence", "Continuity"]} text="Systems should work together — not make your people work around them." />

      <IX_Sec id="apx-prob-h" tone="light" k="The real problem isn't the API" t="Your systems aren't broken. They're disconnected." s="Switch between the two views: manual exports, spreadsheets and re-keying — or one connected flow." center>
        <IX_Fragment
          hub="API layer"
          labels={["Friction map", "Connected flow"]}
          tools={[
            ["CRM", "users"],
            ["Manual export", "doc"],
            ["Spreadsheet", "grid"],
            ["Email", "mail"],
            ["ERP", "building"],
            ["Manual update", "type"],
            ["Payments", "coin"],
            ["Support desk", "help"],
            ["Reporting", "bars"],
          ]}
          issues={[
            ["Duplicate data & manual entry", "refresh", "Entered once, synced everywhere"],
            ["Delayed updates", "clock", "Changes flow as they happen"],
            ["Data silos & multiple dashboards", "layers", "One consistent picture"],
            ["AI can't reach useful data", "spark", "Controlled access for AI"],
          ]}
          caption="Employees switching between systems, disconnected customer journeys, integration bottlenecks — the cost is paid every day in small manual steps."
        />
      </IX_Sec>

      <IX_Sec id="apx-flow-h" tone="off" k="From connection to business value" t="Integration is where software starts creating leverage." s="Data is valuable when it can move where the business needs it.">
        <IX_Flows
          cols={[
            { t: "Before", s: "Disconnected environment", steps: [["Disconnected tools", ""], ["Manual work", "Manual"], ["Data duplication", "Re-keyed"], ["Delayed information", "Late"], ["Operational friction", "Daily"]] },
            { t: "After", s: "Connected environment", steps: [["Connected systems", "API"], ["Automated workflows", "Auto"], ["Consistent data", "Synced"], ["Faster information flow", "Real time"], ["Better decisions", "Visible"]], foot: "Less manual work · fewer handoffs · cleaner data flow · better visibility · greater scalability." },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-req-h" tone="dark" k="An API is a business connection" t="An API is not just a technical endpoint. It is a business connection." s="Every request carries a piece of the business — an order, a payment, a customer, a stock level.">
        <APX_Req />
        <IX_Chain
          items={[
            ["Customer", "user"],
            ["Website", "globe"],
            ["API", "api"],
            ["CRM", "users"],
            ["ERP", "building"],
            ["Payment", "coin"],
            ["Analytics", "bars"],
            ["AI", "spark"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-intel-h" tone="light" k="Integration intelligence, not integration plumbing" t="We start with the workflow that's breaking — not the endpoint." s="Hover each dimension: what Frequent Research considers before a single connection is built." center>
        <IX_Graph
          center="Your workflow"
          centerIcon="compass"
          label="Integration intelligence: architecture, security, data, automation, AI, scalability, observability and experience considered together."
          nodes={[
            ["Architecture", "branch"],
            ["Security", "shield"],
            ["Data", "database"],
            ["Automation", "bolt"],
            ["AI readiness", "spark"],
            ["Scalability", "trend"],
            ["Observability", "eye"],
            ["Experience", "user"],
          ]}
          links={[
            [0, 5],
            [1, 2],
            [2, 4],
            [3, 6],
            [4, 1],
            [7, 3],
          ]}
          title="What we look at"
          journey={[
            ["Business workflow", [3, 7]],
            ["System dependencies", [0]],
            ["Data movement", [2]],
            ["Authentication & errors", [1]],
            ["Monitoring", [6]],
            ["Future integrations", [5, 4]],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-cap-h" tone="off" k="Core capabilities" t="A capability explorer for connected systems." s="Choose an area. Platform names are examples of ecosystems that can be integrated where technically and contractually supported — not partnerships.">
        <IX_Matrix
          id="apx-mx"
          cats={[
            { t: "API development", icon: "api", problem: "Applications can't share data or functionality safely.", value: "Clean, documented, versioned APIs your systems and partners can rely on.", items: [["REST APIs", "Predictable resources, clear errors, versioning."], ["GraphQL APIs", "Clients ask for exactly the data they need."], "Custom APIs", "Internal APIs", ["Public APIs", "Partner-ready, with documentation and keys."], "Backend services"] },
            { t: "System integration", icon: "link", problem: "Teams re-key data between CRM, ERP and SaaS tools.", value: "Existing software that finally works together.", items: [["CRM integrations", "e.g. Salesforce APIs or HubSpot API integration."], ["ERP integrations", "e.g. NetSuite or other ERP platforms."], ["SaaS integrations", "e.g. ServiceNow, Workday, Monday.com, DocuSign."], "Marketplace integrations", "Business application integrations", "Internal system integrations"] },
            { t: "Commerce & payments", icon: "coin", problem: "Orders, payments and inventory disagree with each other.", value: "Payment and commerce events flowing straight into the business.", items: [["Payment gateway API integration", "e.g. Stripe API or PayPal, where supported."], "Payment processor integration", "Subscription systems", "Billing systems", ["E-commerce integrations", "e.g. Shopify API integration."], ["Accounting sync", "e.g. QuickBooks, where supported."]] },
            { t: "Communication", icon: "chat", problem: "Customers aren't notified, or teams notify them by hand.", value: "The right message, triggered by the right event.", items: [["WhatsApp Business API", "WhatsApp API integration for notifications and conversations."], "SMS", "Email", "Voice", "Communication platforms"] },
            { t: "Data & analytics", icon: "bars", problem: "Reports are stitched together from exports.", value: "Data pipelines that keep dashboards current.", items: [["Data synchronisation", "Scheduled or real-time, with conflict handling."], ["Event-driven workflows", "Act when something actually happens."], "Reporting APIs", "Analytics integrations", "Dashboard data pipelines"] },
            { t: "AI & automation", icon: "spark", problem: "AI tools can't safely reach business data or actions.", value: "A controlled path for AI and automation into business systems.", items: [["AI-ready APIs", "Machine-readable, permissioned and logged."], "AI workflow integration", "Intelligent automation", ["API-based AI orchestration", "Multiple steps coordinated through APIs."], ["AI agent connectivity", "Agents act only through approved endpoints."], "Business system access layers"] },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-arch-h" tone="dark" k="The architecture behind the connection" t="Build the connection once. Keep the architecture ready for what's next." s="Select a layer.">
        <IX_Layers
          up="Data flows up"
          down="Requests flow down"
          layers={[
            { t: "Experience layer", icon: "layout", items: ["Website", "Mobile", "SaaS", "Internal apps"], note: "Every channel calls the same APIs, so behaviour stays consistent." },
            { t: "API layer", icon: "api", items: ["REST", "GraphQL", "Custom APIs", "Gateway"], note: "Authenticated, validated, rate-limited entry points with clear contracts and versions." },
            { t: "Integration layer", icon: "link", items: ["Third-party platforms", "Middleware", "Webhooks", "Workflows"], note: "Connections to external and internal systems, with retries and error handling." },
            { t: "Business logic", icon: "sliders", items: ["Rules", "Permissions", "Automation"], note: "Where the business decides what should happen — not hard-coded into every app." },
            { t: "Data layer", icon: "database", items: ["Databases", "Cloud", "Analytics"], note: "Consistent, governed data that every system can trust." },
            { t: "Intelligence layer", icon: "spark", items: ["AI", "Automation", "Recommendations", "Decision support"], note: "AI and automation operating through the same controlled interfaces." },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-ai-h" tone="light" k="APIs + AI" t="AI needs access. APIs create the controlled path." s="AI is only as useful as the systems it can access. APIs provide controlled access to the data and actions AI needs.">
        <IX_Event
          trigger={["User asks an AI assistant", "user"]}
          steps={[
            ["AI interface interprets the request", "chat", "Interface"],
            ["AI / agent layer plans the steps", "spark", "AI"],
            ["API gateway authenticates & checks permissions", "lock", "Gateway"],
            ["Input validated", "check", "Validation"],
            ["Business system responds (CRM, ticketing, finance, commerce)", "building", "Systems"],
            ["Human approval where necessary", "hand", "People"],
            ["Every step logged", "eye", "Audit"],
          ]}
          done="Useful answer — through approved, logged access."
          note="No uncontrolled autonomous decisions: authentication, permissions, validation, logging, error handling and human approval are part of the path."
        />
      </IX_Sec>

      <IX_Sec id="apx-ext-h" tone="off" k="Make existing software more valuable" t="You may not need new software. You may need better connections between the software you already own." center>
        <IX_Options
          items={[
            { t: "Integrate", tag: "Connect", icon: "link", d: "Make existing CRM, ERP, commerce, accounting and cloud apps share data.", best: ["Systems work individually", "Data must flow between them", "Fastest value"] },
            { t: "Extend & automate", tag: "Add capability", icon: "bolt", d: "Add APIs, webhooks and workflows around what you already own.", best: ["Gaps between tools", "Repetitive handoffs", "AI and automation ready"] },
            { t: "Modernise or replace", tag: "When it makes sense", icon: "refresh", d: "Put a modern API layer in front of legacy systems — or replace them when that is genuinely better.", best: ["Legacy limits growth", "Unmaintainable interfaces", "Clear business case"] },
          ]}
          foot="Integration before replacement. We look for ways to make your technology work harder before recommending another platform."
        />
      </IX_Sec>

      <IX_Sec id="apx-ev-h" tone="light" k="Webhooks & event-driven architecture" t="Act when something actually happens." s="Instead of repeatedly asking systems whether something changed, events trigger the next action when it does.">
        <IX_Event
          trigger={["Order created", "cart"]}
          steps={[
            ["Payment confirmed", "coin", "Webhook"],
            ["Inventory updated", "box", "ERP"],
            ["CRM updated", "users", "CRM"],
            ["Customer notified", "chat", "WhatsApp / email"],
            ["Analytics updated", "bars", "Analytics"],
          ]}
          done="Every system in step — without polling or re-keying."
        />
      </IX_Sec>

      <IX_Sec id="apx-sec-h" tone="off" k="Security by design" t="Security is designed into the architecture — not added at the end." center>
        <IX_Trust
          center="Security by design"
          items={[
            ["Authentication", "lock", "OAuth or API keys where appropriate."],
            ["Authorisation", "key", "Role-based access to data and actions."],
            ["Encryption", "shield", "Data protected in transit and at rest."],
            ["Rate limiting", "gauge", "Protection against abuse and overload."],
            ["Input validation", "check", "Nothing trusted by default."],
            ["Secrets management", "key", "Credentials never in code."],
            ["Logging & auditability", "eye", "Who called what, and when."],
            ["Versioning & error handling", "branch", "Change without breaking consumers."],
          ]}
          note={
            <>
              No system is “100% secure”; we design for defence in depth. References: <PpX href="https://owasp.org/API-Security/">OWASP API Security</PpX>, <PpX href="https://oauth.net/2/">OAuth 2.0</PpX>.
            </>
          }
        />
      </IX_Sec>

      <IX_Sec id="apx-obs-h" tone="dark" k="Reliability & observability" t="When something breaks, you should know before your customer does." s="An observability view showing states, not invented numbers." wide>
        <IX_Control
          app="Integration health"
          tiles={[
            ["API health", "gauge", "ring"],
            ["Latency", "clock", "spark"],
            ["Error rate", "flag", "bars"],
            ["Request volume", "signal", "spark"],
            ["Service availability", "check", "ring"],
            ["Integration status", "link", "bars"],
          ]}
          attention={[
            ["Payment webhook · Degraded", "coin", "warn"],
            ["CRM sync · Attention", "users", "warn"],
            ["Failed events · Retrying", "replay", "hot"],
            ["ERP connector · Healthy", "building", "info"],
          ]}
          insights={["Retries on the payment webhook rose after a provider change — the new signature header needs updating.", "One partner API is approaching its rate limit at month-end — consider queuing non-urgent syncs.", "All other integrations are healthy and monitored."]}
        />
      </IX_Sec>

      <IX_Sec id="apx-val-h" tone="light" k="Business value" t="What changes for the client?">
        <IX_Outcomes
          items={[
            ["Less manual work", "bolt", "Data moves without re-keying.", "less"],
            ["Cleaner data movement", "database", "One consistent version across systems.", "link"],
            ["More reliable workflows", "check", "Errors handled, retries automatic.", "pulse"],
            ["Better visibility", "eye", "Status available everywhere it's needed.", "see"],
            ["More useful existing software", "layers", "Investments extended, not replaced.", "decide"],
            ["A controlled path to AI", "spark", "AI and automation on solid foundations.", "fast"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-why-h" tone="off" k="Why Frequent Research" t="Why Frequent Research for API Development & Integration?">
        <IX_Why
          items={[
            ["Business logic before endpoints", "compass", "We understand what the connection must accomplish — the workflow, data ownership and dependencies — before deciding how to build it."],
            ["Integration before replacement", "link", "Making existing technology work harder before recommending another platform."],
            ["AI-ready architecture", "spark", "Connectivity designed to support intelligent automation and AI-enabled workflows."],
            ["Engineering + product thinking", "layout", "Integrations considered in the context of the application, users and operations."],
            ["Security built into the architecture", "shield", "Authentication, permissions, validation, monitoring and error handling from day one."],
            ["Designed for future connections", "branch", "Today's integration shouldn't become tomorrow's bottleneck."],
            ["Transparent ownership", "key", "Code, documentation and technical assets stay with you."],
            ["Long-term maintainability", "refresh", "Maintainable digital connections — not one-off scripts."],
          ]}
        />
      </IX_Sec>

      <IX_Motto id="apx-moto-h" kicker="Our integration philosophy" quote="Don't build another island. Connect the systems you already depend on." lines={["Connect the work.", "Automate the repetitive.", "Make the data useful.", "Secure by design.", "Ready for what's next."]} />

      <IX_Sec id="apx-tech-h" tone="light" k="Technology ecosystem" t="Technology in service of the connection.">
        <IX_Stack
          groups={[
            ["API styles", "api", ["REST", "GraphQL", "Webhooks", "JSON"], "Contracts systems can rely on"],
            ["Security", "lock", ["OAuth", "API keys", "API gateways", "Secrets management"], "Controlled access"],
            ["Architecture", "branch", ["Event-driven", "Queues", "Scheduled sync", "Real-time sync"], "Right pattern per flow"],
            ["Back end", "code", ["Node.js", "Python", "PHP / Laravel"], "Services and integrations"],
            ["Front end & mobile", "layout", ["React", "Next.js", "Flutter", "React Native"], "The apps consuming the APIs"],
            ["Cloud & operations", "cloud", ["AWS", "Microsoft Azure", "Google Cloud", "Monitoring", "CI/CD"], "Run, observe and release safely"],
          ]}
          note="No platform partnerships or certifications are implied."
        />
      </IX_Sec>

      <IX_Sec id="apx-ind-h" tone="off" k="Industries & use cases" t="Integration needs look different in every industry." s="Possible use cases — not claims about previous client projects." center>
        <IX_Industries
          items={[
            ["Retail", "cart", "commerce + payment + inventory."],
            ["Healthcare", "cross", "applications + scheduling + communication."],
            ["Financial Services", "coin", "CRM + billing + accounting."],
            ["Manufacturing", "factory", "ERP + inventory + operations."],
            ["Agriculture", "wheat", "field apps + procurement + payments."],
            ["Automotive", "car", "dealer systems + CRM + service."],
            ["Pharmaceutical", "pill", "ERP + quality + document systems."],
            ["Food & Beverage", "leaf", "orders + inventory + delivery partners."],
            ["Information Technology", "cpu", "SaaS + identity + billing."],
            ["Telecommunications", "signal", "orders + provisioning + notifications."],
            ["Energy", "bolt", "assets + field service + analytics."],
            ["Education", "book", "admissions + payments + communication."],
            ["Real Estate", "home", "CRM + payments + customer portals."],
            ["Government", "landmark", "portals + payments + records."],
            ["Media", "film", "content + subscriptions + analytics."],
            ["Fashion", "shirt", "commerce + marketplaces + fulfilment."],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="apx-life-h" tone="light" k="Delivery lifecycle" t="The process exists to protect the business outcome — not to create ceremony." s="Select a stage.">
        <IX_Timeline
          id="apx-tl"
          stages={[
            ["Understand", "The workflow, systems, data ownership and constraints.", "search2"],
            ["Architect", "Contracts, patterns, security and error handling.", "branch"],
            ["Connect", "Build APIs, integrations and webhooks.", "link"],
            ["Secure", "Authentication, permissions and validation.", "lock"],
            ["Validate", "Valid and invalid requests, retries, timeouts and mapping.", "check"],
            ["Observe", "Monitoring, alerts and logs in production.", "eye"],
            ["Evolve", "New systems, versions and capabilities.", "refresh"],
          ]}
        />
      </IX_Sec>

      <DM_Faq
        id="apx-faq"
        title="API development & integration: common questions"
        items={APX_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL>, <PpL to={ppIt("ai-and-automation-solutions")}>AI &amp; automation</PpL>, <PpL to={ppIt("crm-development")}>CRM</PpL>, <PpL to={ppIt("erp-development")}>ERP</PpL> and <PpL to={ppIt("saas-development")}>SaaS development</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/api-development-integration-guide" title="API Development and System Integration: Making Business Systems Work Together" text="Planning reliable integrations, security and monitoring." />

      <IX_Final
        id="apx-final-h"
        kicker="Request an API Consultation"
        title="Your systems already hold the value. Let's connect it."
        text="Tell us which systems need to talk, where data gets re-keyed and what you'd automate if you could. We'll design the connections — securely, intelligently and with room to evolve."
        cta={["Discuss Your Integration", APX_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["Discuss My API Architecture", APX_FORM]}
        flow={["CRM", "ERP", "Payments", "Webhooks", "Analytics", "AI", "Mobile"]}
        sig="Frequent Research turns disconnected applications into a connected digital operating environment."
      />

      <DM_Form
        id={APX_FORM}
        kicker="IT project consultation"
        title="Plan My Integration"
        sub="A few short questions about the systems and the business challenge help us recommend the right integration approach."
        type="API Development & Integration Enquiry"
        service="API Development & Integration"
        icon="layers"
        submitLabel="Discuss My Integration"
        successTitle="Thank you. Your integration request has been sent."
        siteLabel="Existing website or application (optional)"
        msgLabel="Required integrations / message (optional)"
        msgPh="Which systems need to connect, what data moves, volumes, deadlines — whatever helps"
        nextSteps={["We review the systems and the workflow you described.", "We contact you to map the data flow and constraints.", "You get a recommended integration approach and next step."]}
        chips={[
          { k: "ptype", t: "Project", q: "What do you need?", label: "Project type", options: ["Custom API development", "Integrate existing systems", "Payment gateway integration", "WhatsApp / SMS / email integration", "Webhooks & event-driven workflows", "AI / automation access layer", "Legacy system integration", "Integration monitoring & maintenance"] },
          { k: "systems", t: "Systems", q: "Which systems are involved?", label: "Platforms / systems to integrate", multi: true, options: ["CRM", "ERP", "E-commerce", "Payments", "Accounting", "Communication", "Analytics / BI", "Internal / legacy system", "Mobile app", "AI tools"] },
          { k: "challenge", t: "Challenge", q: "What is the business challenge?", label: "Business challenge", multi: true, options: ["Duplicate data entry", "Data out of sync", "Manual exports", "Slow processes", "No visibility", "Preparing for AI", "Unreliable existing integrations"] },
        ]}
      />

      <IX_Sec id="apx-rel-h" tone="dark" k="Related IT & Development services" t="Connected services">
        <IX_Related
          items={[
            ["IT & Development", "", "All business technology services."],
            ["Cloud & DevOps Services", "cloud-and-devops-services", "Infrastructure to run and observe integrations."],
            ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation and AI on top of connected systems."],
            ["Data Analytics & Dashboards", "data-analytics-and-dashboard-development", "Dashboards fed by reliable data pipelines."],
            ["Custom Business Applications", "custom-business-applications", "Applications connected to existing systems."],
            ["CRM Development", "crm-development", "Customer data connected across the business."],
            ["ERP Development", "erp-development", "Operations connected end to end."],
            ["Web Application Development", "web-application-development", "Applications built on clean APIs."],
            ["Software Testing & QA", "software-testing-and-qa", "Integration testing and reliability."],
            ["Cybersecurity Services", "cybersecurity-services", "Security reviews for exposed APIs."],
          ]}
          base={(s) => (s ? ppIt(s) : "/services/it-development")}
        />
      </IX_Sec>
    </div>
  );
}

export { APX_Page };
