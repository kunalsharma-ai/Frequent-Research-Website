/*
 * Cybersecurity Services — /services/it-development/cybersecurity-services (existing URL, unchanged)
 * Build 44 rethink: "Find the risk before it becomes the incident." Security as a business control, grounded in how the
 * technology is actually built. Signature visuals (prefix CYB_): radar risk map, expanding attack surface, expanding
 * intelligence-stack columns, impact × exposure matrix, AI signal sieve, code-gutter security controls, identity gates
 * with a least-privilege toggle, resilience timeline with an incident marker, sector selector.
 * Never: 100% secure, guaranteed compliance, 24/7 SOC, invented incidents, scores or partnerships.
 * Penetration testing is only offered "where the agreed scope or a specialist partner supports it".
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, PpX, dmMeta, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Rail } from '../components/dm/v44kit.jsx';

const CYB_URL = "/services/it-development/cybersecurity-services";
const CYB_TITLE = "Cybersecurity Services & Risk Assessment | Frequent Research";
const CYB_DESC = "Cybersecurity services that find and prioritise risk across applications, APIs, cloud and identity, then harden what matters so your business stays resilient.";
const CYB_FORM = "security-project";

const CYB_FAQ = [
  ["What do your Cybersecurity Services cover?", "Cyber risk and security assessments, application and API security, cloud and infrastructure security, identity and access reviews, vulnerability management, security testing, hardening, incident readiness and compliance readiness."],
  ["Can you assess an existing website or application?", "Yes. We review architecture, authentication, access control, APIs, configuration and dependencies, then prioritise findings by business impact."],
  ["Do you provide vulnerability assessment and security testing?", "Yes — vulnerability assessment and security testing for web applications, APIs and configurations; penetration testing can be included where the agreed scope or a specialist partner supports it."],
  ["Can you help with cloud security?", "Yes. We review identity and permissions, network exposure, storage, encryption, logging and configuration across AWS, Azure or Google Cloud."],
  ["Can security be built into software development and CI/CD?", "Yes — security requirements, code review, dependency checks and security tests can run at each stage, so issues are found before release."],
  ["How do you use AI in cybersecurity?", "AI assists with log summarisation, alert correlation, anomaly detection and vulnerability prioritisation; security professionals validate and decide what happens."],
  ["Can you help us prepare for compliance?", "We help with readiness: gap assessments and control mapping against frameworks such as ISO/IEC 27001, the NIST Cybersecurity Framework or CIS Controls. We do not certify organisations."],
  ["How is the scope of a cybersecurity project decided?", "By what you need to protect, how your environment is built and where it is changing — agreed with you before any testing starts."],
];

/* ── hero: radar risk map ────────────────────────────────────────────────────────────── */
const CYB_BLIPS = [["Vulnerability", 28, 30], ["Suspicious access", 70, 24], ["Misconfiguration", 78, 62], ["Data exposure", 44, 78], ["API risk", 22, 60], ["Cloud risk", 58, 44], ["Identity risk", 38, 46]];
const CYB_PHASE = ["Exposure", "Prioritisation", "Control", "Resilience"];
function CYB_Radar() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(16, v, 900, false);
  const ph = Math.floor(t / 4);
  return (
    <figure ref={ref} className={"cyb-radar" + (v ? " is-in" : "") + " is-ph" + ph} aria-label="Digital risk map: users, identity, applications, APIs, cloud, data and infrastructure scanned by a security intelligence layer that finds vulnerabilities, suspicious access, misconfigurations, data exposure and API, cloud and identity risks, then prioritises, controls and builds resilience.">
      <div className="cyb-radar__scope" aria-hidden="true">
        <i className="cyb-radar__sweep" />
        {["Users", "Identity", "Applications", "APIs", "Cloud", "Data", "Infrastructure"].map((r, k) => (
          <span key={r} className="cyb-radar__ring" style={{ "--k": k }}>
            <em>{r}</em>
          </span>
        ))}
        {CYB_BLIPS.map(([n, x, y], k) => (
          <b key={n} className={"cyb-radar__blip" + (ph >= 2 && k % 3 !== 1 ? " is-fixed" : "")} style={{ left: x + "%", top: y + "%", "--k": k }}>
            <small>{n}</small>
          </b>
        ))}
        <div className="cyb-radar__core">Security intelligence</div>
      </div>
      <ol className="cyb-radar__ph">
        {CYB_PHASE.map((p, k) => (
          <li key={p} className={k === ph ? "is-on" : k < ph ? "is-done" : ""}>
            {p}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ── attack surface ──────────────────────────────────────────────────────────────────── */
const CYB_SURF = ["Cloud accounts", "SaaS applications", "APIs", "Websites", "Mobile apps", "Employee identities", "Third-party integrations", "Databases", "Endpoints", "CI/CD pipelines", "Remote access", "Customer data"];
function CYB_Surface() {
  const [ref, v] = ppIn(0.3);
  return (
    <div ref={ref} className={"cyb-surf" + (v ? " is-in" : "")}>
      <div className="cyb-surf__map" aria-hidden="true">
        <b>Your business</b>
        {CYB_SURF.map((s, k) => {
          const a = (k / CYB_SURF.length) * 2 * Math.PI;
          const r = k % 2 ? 44 : 34;
          return (
            <span key={s} style={{ left: 50 + r * Math.cos(a) + "%", top: 50 + r * Math.sin(a) + "%", "--k": k }}>
              {s}
            </span>
          );
        })}
      </div>
      <div className="cyb-surf__txt">
        <ul className="pp-sr">
          {CYB_SURF.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <p className="cyb-surf__eq">
          <span>More connections</span> → <span>More exposure</span> → <span>More security decisions</span>
        </p>
        <p>Every SaaS tool, API key, cloud account and integration adds a door. Most organisations cannot list them all — which is exactly where risk hides.</p>
      </div>
    </div>
  );
}

/* ── security intelligence stack: expanding columns ──────────────────────────────────── */
const CYB_STACK = [
  ["Understand", "Assets · architecture · data · users · dependencies", "You cannot protect what you have not mapped."],
  ["Identify", "Vulnerabilities · misconfigurations · identity risks · attack surfaces", "Find weaknesses before someone else does."],
  ["Prioritise", "Business impact · exploitability · exposure · criticality", "Engineering time goes to what matters first."],
  ["Strengthen", "Hardening · access controls · secure configuration · security testing", "Fewer ways in, smaller blast radius."],
  ["Monitor", "Signals · logs · anomalies · threat intelligence", "Changes and anomalies noticed early."],
  ["Respond", "Contain · investigate · recover · improve", "Incidents handled calmly, lessons kept."],
];
function CYB_Stack() {
  const [i, setI] = ee.useState(2);
  return (
    <ol className="cyb-stack">
      {CYB_STACK.map(([t, x, d], k) => (
        <li key={t} className={k === i ? "is-on" : ""}>
          <button type="button" aria-expanded={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
            <span className="v4-mono">L{k + 1}</span>
            <b>{t}</b>
          </button>
          <div className="cyb-stack__d" hidden={k !== i}>
            <small>{x}</small>
            <p>{d}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ── impact × exposure matrix ────────────────────────────────────────────────────────── */
const CYB_FIND = [
  ["Admin panel reachable from the internet", 82, 80],
  ["Outdated library on the checkout API", 70, 62],
  ["Over-broad cloud storage permissions", 76, 34],
  ["Verbose error messages", 30, 66],
  ["Unused test account", 22, 28],
  ["Missing security headers", 40, 46],
];
const CYB_Q = (x, y) => (x >= 50 && y >= 50 ? ["Immediate attention", "bad", "Fix now — high business impact and easy to reach."] : x >= 50 ? ["Prioritise", "warn", "High impact, less exposed: schedule in the next cycle."] : y >= 50 ? ["Review", "info", "Exposed but lower impact: reduce exposure cheaply."] : ["Monitor", "ok", "Low impact and exposure: keep an eye on it."]);
function CYB_Matrix() {
  const [i, setI] = ee.useState(0);
  const f = CYB_FIND[i];
  const q = CYB_Q(f[1], f[2]);
  return (
    <div className="cyb-mx">
      <div className="cyb-mx__plot">
        <span className="cyb-mx__q cyb-mx__q--1">Review</span>
        <span className="cyb-mx__q cyb-mx__q--2">Immediate attention</span>
        <span className="cyb-mx__q cyb-mx__q--3">Monitor</span>
        <span className="cyb-mx__q cyb-mx__q--4">Prioritise</span>
        <em className="cyb-mx__ax cyb-mx__ax--x">Business impact →</em>
        <em className="cyb-mx__ax cyb-mx__ax--y">Security exposure →</em>
        {CYB_FIND.map(([n, x, y], k) => (
          <button key={n} type="button" className={"cyb-mx__dot" + (k === i ? " is-on" : "")} style={{ left: x + "%", bottom: y + "%" }} aria-pressed={k === i} aria-label={n} onClick={() => setI(k)}>
            {k + 1}
          </button>
        ))}
      </div>
      <div className="cyb-mx__side">
        <ol>
          {CYB_FIND.map(([n], k) => (
            <li key={n}>
              <button type="button" aria-pressed={k === i} onClick={() => setI(k)}>
                <span>{k + 1}</span> {n}
              </button>
            </li>
          ))}
        </ol>
        <p aria-live="polite">
          <span className={"v4-st v4-st--" + q[1]}>{q[0]}</span> {q[2]}
        </p>
      </div>
    </div>
  );
}

/* ── AI signal sieve ─────────────────────────────────────────────────────────────────── */
function CYB_Sieve() {
  const [ref, v] = ppIn(0.3);
  const IN = ["Logs", "Alerts", "Vulnerabilities", "Code", "Configuration", "Threat signals"];
  const AI = ["Correlation", "Prioritisation", "Anomaly detection", "Threat summarisation", "Risk clustering", "Investigation assistance"];
  return (
    <div ref={ref} className={"cyb-sieve" + (v ? " is-in" : "")}>
      <ul className="cyb-sieve__in">
        {IN.map((x) => (
          <li key={x}>{x}</li>
        ))}
      </ul>
      <div className="cyb-sieve__fun" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, k) => (
          <i key={k} style={{ "--k": k, "--x": (k * 37) % 100 }} />
        ))}
      </div>
      <div className="cyb-sieve__ai">
        <small>AI-assisted analysis</small>
        <ul>
          {AI.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      </div>
      <div className="cyb-sieve__hu">
        <b>Security professional decides</b>
        <span>Context · validation · accountability</span>
      </div>
      <div className="cyb-sieve__act">Action</div>
    </div>
  );
}

/* ── security moves with the code ────────────────────────────────────────────────────── */
const CYB_SDLC = [
  ["Requirement", "Security requirements and abuse cases"],
  ["Architecture", "Threat model, data flows, trust boundaries"],
  ["Development", "Secure coding patterns, secrets out of code"],
  ["Code review", "Security-aware review, dependency checks"],
  ["Testing", "Security tests alongside functional tests"],
  ["CI/CD", "Automated scans before promotion"],
  ["Deployment", "Hardened configuration, least privilege"],
  ["Monitoring", "Logs, alerts and anomaly signals"],
];
function CYB_Code() {
  const [ref, v] = ppIn(0.25);
  return (
    <ol ref={ref} className={"cyb-code v4-mono" + (v ? " is-in" : "")}>
      {CYB_SDLC.map(([s, c], k) => (
        <li key={s} style={{ "--k": k }}>
          <span className="cyb-code__ln">{String(k + 1).padStart(2, "0")}</span>
          <b>{s}</b>
          <span className="cyb-code__c">// {c}</span>
          <i className="cyb-code__badge" aria-hidden="true">
            <IX_I n="shield" s={13} />
          </i>
        </li>
      ))}
    </ol>
  );
}

/* ── identity gates ──────────────────────────────────────────────────────────────────── */
function CYB_Identity() {
  const [lp, setLp] = ee.useState(true);
  const P = ["User", "Identity", "Authentication", "Authorisation", "Application", "Data"];
  return (
    <div className={"cyb-id" + (lp ? " is-lp" : " is-xs")}>
      <ol className="cyb-id__path">
        {P.map((p, k) => (
          <li key={p} className={k === 2 || k === 3 ? "is-gate" : ""}>
            {p}
          </li>
        ))}
      </ol>
      <div className="cyb-id__data" aria-live="polite">
        {["Orders", "Customers", "Payroll", "Finance", "Admin settings"].map((d, k) => {
          const allowed = lp ? k < 2 : true;
          return (
            <span key={d} className={allowed ? (lp ? "is-ok" : k >= 2 ? "is-bad" : "is-ok") : "is-no"}>
              {d}
            </span>
          );
        })}
      </div>
      <p>{lp ? "Least privilege: a sales user reaches orders and customers — nothing else." : "Excess permissions: the same user can reach payroll, finance and admin settings. One stolen password, much bigger damage."}</p>
      <div className="aia-hand__tg" role="group" aria-label="Access model">
        <button type="button" aria-pressed={lp} onClick={() => setLp(true)}>
          Least privilege
        </button>
        <button type="button" aria-pressed={!lp} onClick={() => setLp(false)}>
          Excess permissions
        </button>
      </div>
    </div>
  );
}

/* ── capability map: native disclosure list ──────────────────────────────────────────── */
const CYB_CAPS = [
  ["Cyber risk & security assessment", ["Cybersecurity and risk assessment", "Attack-surface review", "Security posture assessment", "Security gap identification", "NIST-aligned assessment where appropriate"]],
  ["Application & API security", ["Web application security", "API security", "Authentication and authorisation review", "Secure configuration review", "Security-aware QA"]],
  ["Cloud security", ["Cloud configuration review", "Identity and access controls", "Cloud data protection", "Network segmentation", "Security monitoring"]],
  ["Infrastructure & network security", ["Network security", "Firewall and configuration review", "Infrastructure hardening", "Access control"]],
  ["Vulnerability management", ["Vulnerability assessment", "Prioritisation", "Remediation planning", "Validation after fixes", "Continuous review"]],
  ["Security testing", ["Web application and API security testing", "Configuration testing", "Security regression testing", "Penetration testing where the agreed scope or a specialist partner supports it"]],
];
function CYB_Caps() {
  return (
    <div className="cyb-caps">
      {CYB_CAPS.map(([t, xs], k) => (
        <details key={t} open={k === 0}>
          <summary>
            <span className="v4-mono">{String(k + 1).padStart(2, "0")}</span> {t}
          </summary>
          <ul>
            {xs.map((x) => (
              <li key={x}>{x}</li>
            ))}
          </ul>
        </details>
      ))}
    </div>
  );
}

/* ── sector selector ─────────────────────────────────────────────────────────────────── */
const CYB_SECT = [
  ["Financial Services", "Identity, transaction integrity and sensitive data", "financial-services"],
  ["Healthcare", "Data protection, access control and system integrity", "healthcare"],
  ["Pharmaceutical", "Research data, supply chain and validated systems", "pharmaceutical"],
  ["Manufacturing", "Operational continuity and connected systems", "manufacturing"],
  ["Retail", "Customer data, payments and digital commerce", "retail"],
  ["Telecommunications", "Network exposure and customer identity", "telecommunications"],
  ["Energy", "Critical operations and remote access", "energy"],
  ["Education", "Student data, portals and shared devices", "education"],
  ["Government", "Citizen data, availability and access control", "government"],
  ["Information Technology", "SaaS platforms, APIs and tenant isolation", "it"],
];
function CYB_Sectors() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="cyb-sec">
      <div className="cyb-sec__chips" role="group" aria-label="Choose a sector">
        {CYB_SECT.map(([t], k) => (
          <button key={t} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
            {t}
          </button>
        ))}
      </div>
      <div className="cyb-sec__d" aria-live="polite">
        <small>Security priorities</small>
        <b>{CYB_SECT[i][1]}</b>
        <PpL to={"/industries-case-studies/" + CYB_SECT[i][2]}>{CYB_SECT[i][0]} industry overview →</PpL>
      </div>
    </div>
  );
}

function CYB_Page() {
  usePageMeta("Cybersecurity Services", CYB_DESC);
  dmMeta(CYB_URL, CYB_TITLE, CYB_DESC);
  ixSchema("cyb", {
    url: CYB_URL,
    crumb: "Cybersecurity Services",
    name: "Cybersecurity Services",
    serviceType: "Cybersecurity assessment and security engineering",
    schemaDesc:
      "Cybersecurity services: cyber risk and security assessment, attack-surface review, application and API security, cloud and infrastructure security, identity and access review, vulnerability management, security testing, hardening, secure software development, AI-assisted security analysis, incident readiness and compliance readiness against frameworks such as ISO/IEC 27001, NIST CSF and CIS Controls.",
    faq: CYB_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p cyb-svc">
      <V4_Hero
        id="cyb-h1"
        crumb="Cybersecurity Services"
        variant="dark"
        kicker="Cybersecurity Services · IT & Development"
        h1="Find the Risk Before It Becomes the Incident."
        lead="Our cybersecurity services connect security decisions to how your applications, APIs, cloud and identities are actually built. We find exposure, prioritise it by business impact and strengthen what matters — so the business stays operational and trusted as it grows."
        cta={["Request a Cybersecurity Assessment", CYB_FORM]}
        cta2={["Discuss My Security Requirements", CYB_FORM]}
        points={["Risk-based security", "AI-assisted analysis", "Cloud & application security", "Vulnerability management", "Incident readiness"]}
      >
        <CYB_Radar />
      </V4_Hero>

      <IX_Sec id="cyb-surf-h" tone="light" k="Cyber risk is now a business risk" t="The biggest security problem is not always the attack. It is the blind spot before it.">
        <CYB_Surface />
      </IX_Sec>

      <IX_Sec id="cyb-stack-h" tone="off" k="How we approach security" t="Security built around how your technology actually works." s="The security intelligence stack — select a layer to see the business value.">
        <CYB_Stack />
      </IX_Sec>

      <IX_Sec lv={3} id="cyb-mx-h" tone="light" k="Cyber risk prioritisation" t="A long vulnerability list is not a security strategy." s="What matters now, what can wait and what engineering should fix first. Select a finding.">
        <CYB_Matrix />
        <p className="cyb-vm" aria-label="Vulnerability management cycle">
          {["Discover", "Understand", "Prioritise", "Remediate", "Validate", "Monitor"].map((t) => (
            <span key={t}>{t}</span>
          ))}
        </p>
      </IX_Sec>

      <IX_Sec id="cyb-why-h" tone="dark" k="Where Frequent Research creates the difference" t="Cybersecurity that connects security decisions to the technology underneath.">
        <dl className="cyb-why">
          {[
            ["Engineering context", "Recommendations grounded in how applications, APIs, cloud environments and integrations actually work — because we build them too."],
            ["Risk before noise", "Findings prioritised by exposure and business impact, not delivered as an undifferentiated list."],
            ["AI where it creates leverage", "AI-assisted analysis, correlation and prioritisation for repetitive security work."],
            ["Human judgement where it matters", "Security decisions need context, validation and accountability."],
            ["Security across the lifecycle", "Architecture, development, testing, deployment and ongoing improvement."],
            ["Technology continuity", "Security works alongside development, QA, cloud, API, AI and application support."],
            ["Clear ownership", "Documentation and recommendations your team can act on — no unnecessary dependency."],
            ["Business-first thinking", "Protect what actually matters: customers, operations, data, revenue and trust."],
          ].map(([t, d]) => (
            <div key={t}>
              <dt>{t}</dt>
              <dd>{d}</dd>
            </div>
          ))}
        </dl>
      </IX_Sec>

      <IX_Sec id="cyb-cap-h" tone="light" k="Capabilities" t="Cybersecurity capabilities across your digital environment.">
        <CYB_Caps />
      </IX_Sec>

      <IX_Sec id="cyb-ai-h" tone="ink" k="AI-assisted security intelligence" t="AI can process the signal. Security judgement decides what matters." s="AI augments security professionals; it does not replace them, and we make no claims of autonomous cyber defence." wide>
        <CYB_Sieve />
      </IX_Sec>

      <IX_Sec lv={3} id="cyb-code-h" tone="light" k="Security + software development" t="Security should move with the code." s={<>Security-aware testing complements functional testing — see <PpL to={ppIt("software-testing-and-qa")}>software testing &amp; QA</PpL>.</>}>
        <CYB_Code />
      </IX_Sec>

      <IX_Sec lv={3} id="cyb-id-h" tone="off" k="Identity & access" t="The right person. The right access. The right time." s="Least privilege, role-based access, privileged access, access reviews, authentication controls and session security.">
        <CYB_Identity />
      </IX_Sec>

      <IX_Sec id="cyb-res-h" tone="light" k="From exposure to resilience" t="Assume something will eventually go wrong. Build so the business can respond.">
        <ol className="cyb-res">
          {[
            ["Prevent", "Hardening, access control and secure configuration."],
            ["Detect", "Monitoring, logging and anomaly signals."],
            ["Respond", "Readiness plans and clear roles when an incident happens."],
            ["Recover", "Restore services and data safely; continuity first."],
            ["Learn", "Post-incident review feeds the next improvement."],
          ].map(([t, d], k) => (
            <li key={t} className={k === 2 ? "is-inc" : ""}>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ol>
        <div className="cyb-comp">
          <p>
            <b>Compliance as a business control.</b> Readiness assessments, gap identification and control mapping against <PpX href="https://www.nist.gov/cyberframework">NIST CSF</PpX>, <PpX href="https://www.iso.org/standard/27001">ISO/IEC 27001</PpX>, CIS Controls and <PpX href="https://owasp.org/www-project-top-ten/">OWASP guidance</PpX> — readiness and evidence, not certification on your behalf.
          </p>
          <p className="ix-note">Incident readiness and response planning are scoped per engagement; we do not claim a 24/7 security operations centre.</p>
        </div>
      </IX_Sec>

      <IX_Sec lv={3} id="cyb-ind-h" tone="off" k="Industries" t="Security priorities differ by sector." s="Short security concerns per sector — not claims about specific clients.">
        <CYB_Sectors />
      </IX_Sec>

      <DM_Faq
        id="cyb-faq"
        title="Cybersecurity services: common questions"
        items={CYB_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL>, <PpL to={ppIt("api-development-and-integration")}>API development</PpL>, <PpL to={ppIt("custom-software-development")}>custom software</PpL> and <PpL to={ppIt("it-consulting")}>IT consulting</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/cybersecurity-services-guide" title="Cybersecurity for Growing Businesses: Practical Protection for Data, Systems and Customers" text="Where to start, what to prioritise and how to keep improving." />

      <V4_Close
        id="cyb-close-h"
        kicker="Strengthen your security posture"
        title="Know where you're exposed before someone else finds it."
        text="Tell us what you are trying to protect, where your environment is changing or where security feels uncertain. We'll help define the right assessment, priorities and improvements."
        cta={["Request a Cybersecurity Assessment", CYB_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Assets and exposure mapped", "Findings prioritised by business impact", "A practical remediation plan", "Validation after fixes"]}
      />

      <DM_Form
        id={CYB_FORM}
        kicker="IT project consultation"
        title="Discuss My Security Requirements"
        sub="A few short questions about your environment and concerns help us scope the right assessment."
        type="Cybersecurity Enquiry"
        service="Cybersecurity Services"
        icon="shield"
        submitLabel="Request My Security Consultation"
        successTitle="Thank you. Your cybersecurity request has been sent."
        siteLabel="Existing website or app (optional)"
        msgLabel="What are you trying to protect? (optional)"
        msgPh="Systems, recent changes, concerns or deadlines — please do not include passwords or sensitive data"
        nextSteps={["We review the environment and concerns you described.", "We contact you to agree scope and priorities.", "You get a recommended assessment approach and next step."]}
        chips={[
          { k: "need", t: "Need", q: "What is your security need?", label: "Your security need", options: ["Cybersecurity assessment", "Cyber risk assessment", "Vulnerability assessment", "Application security", "API security", "Cloud security", "Network security", "Security hardening", "Security testing", "Compliance readiness", "Incident readiness", "Ongoing cybersecurity support", "Other"] },
          { k: "env", t: "Environment", q: "Which environment?", label: "Environment", multi: true, options: ["Website", "Web application", "Mobile application", "Cloud", "API", "Enterprise application", "Network / infrastructure", "SaaS", "Multiple environments"] },
          { k: "challenge", t: "Challenge", q: "What is the current challenge?", label: "Current challenge", multi: true, options: ["General risk visibility", "Suspected vulnerability", "Cloud security concerns", "Access-control concerns", "Compliance preparation", "Application security", "Security testing"] },
        ]}
      />

      <V4_Rail
        id="cyb-rel-h"
        title="Related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["Software Testing & QA", "software-testing-and-qa", "Security-aware testing in every release."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "Secure cloud architecture and pipelines."],
          ["API Development & Integration", "api-development-and-integration", "Secure, observable APIs."],
          ["AI & Automation Solutions", "ai-and-automation-solutions", "Controlled access for automation."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "Patching and dependency hygiene."],
          ["Website Maintenance & Support", "website-maintenance-and-support", "Security-aware website care."],
          ["IT Consulting", "it-consulting", "Security in technology decisions."],
        ]}
      />
    </div>
  );
}

export { CYB_Page };
