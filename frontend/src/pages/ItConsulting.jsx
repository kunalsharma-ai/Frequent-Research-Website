/*
 * IT Consulting — /services/it-development/it-consulting (existing URL, unchanged)
 * Build 44 rethink: "Technology consulting with an engineering mindset." Strategy without implementation creates documents;
 * implementation without strategy creates technical debt — Frequent Research connects the two.
 * Signature visuals (prefix ITC_): option-weighing decision console, sticky-note friction board, decision-engine spine,
 * capability drawers, architecture cross-section, manual→AI pairs, build-vs-buy questionnaire, engagement selector.
 * The brief's "illustrative engagement" and team section are intentionally omitted (no team details, no case-study
 * style examples on IT service pages). No invented clients, numbers, certifications or partnerships.
 */
import * as ee from 'react';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppGo, ppIn, ppIt } from '../components/dm/shared.jsx';
import { IX_Guide, IX_I, IX_Sec, ixCycle, ixSchema } from '../components/dm/ixkit.jsx';
import { V4_Close, V4_Hero, V4_Rail, V4_Tags, V4_TechLine, v4Pick } from '../components/dm/v44kit.jsx';

const ITC_URL = "/services/it-development/it-consulting";
const ITC_TITLE = "IT Consulting for Technology Decisions | Frequent Research";
const ITC_DESC = "IT consulting that links business priorities to architecture, AI, automation and delivery: roadmaps, architecture reviews and build-vs-buy advice to act on.";
const ITC_FORM = "it-consult";

const ITC_FAQ = [
  ["What does an IT consulting company do?", "It helps a business decide which technology to invest in, how it should fit together and how to deliver it — before money is committed to building or buying."],
  ["What does Frequent Research's IT Consulting include?", "IT strategy and roadmaps, architecture reviews, digital transformation planning, AI and automation opportunity assessment, cloud advisory, build-vs-buy decisions, technology health checks and project advisory."],
  ["How does IT consulting reduce technology investment risk?", "By testing options against business goals, existing systems, integration, security, cost and team capability before you commit — so expensive surprises surface on paper, not in production."],
  ["Can you review our existing technology architecture?", "Yes. An architecture review covers applications, integrations, data, cloud, security and technical debt, with prioritised recommendations."],
  ["Do you create IT strategies and technology roadmaps?", "Yes — roadmaps that say what to do now, next and later, with the reasoning, dependencies and investment priorities behind each step."],
  ["Can you identify practical AI and automation opportunities?", "Yes. We look for workflows where AI or automation clearly reduces effort or improves decisions, and say plainly where traditional software is the better answer."],
  ["Can you advise on build versus buy?", "Yes. We compare building, buying and hybrid options on fit, differentiation, integration, speed and total cost of ownership."],
  ["Can your consultants work with our existing IT or development team?", "Yes. We can advise alongside your team, review their plans or take on delivery, depending on what you need."],
];

/* ── hero: option-weighing decision console ──────────────────────────────────────────── */
const ITC_CRIT = ["Business fit", "Integration", "Cost of ownership", "Security", "Time to value"];
const ITC_OPT = [
  ["Build new", [3, 2, 1, 3, 1]],
  ["Buy SaaS", [2, 2, 2, 2, 3]],
  ["Extend + integrate", [3, 3, 3, 3, 2]],
];
function ITC_Console() {
  const [ref, v] = ppIn(0.2);
  const [t] = ixCycle(9, v, 900, false);
  const filled = Math.min(t, ITC_CRIT.length);
  const done = t > ITC_CRIT.length;
  const stage = t < 2 ? 0 : t < 5 ? 1 : t < 7 ? 2 : 3;
  return (
    <figure ref={ref} className={"itc-con" + (done ? " is-done" : "")} aria-label="Technology decision console: three options — build new, buy SaaS, extend and integrate — are scored against business fit, integration, cost of ownership, security and time to value; the recommended path is the option that makes the most business sense.">
      <div className="itc-con__q">
        <small>Decision on the table</small>
        <b>Our operations software can't keep up. Replace it?</b>
      </div>
      <table className="itc-con__t">
        <thead>
          <tr>
            <th scope="col">
              <span className="pp-sr">Criterion</span>
            </th>
            {ITC_OPT.map(([o], k) => (
              <th key={o} scope="col" className={done && k === 2 ? "is-win" : ""}>
                {o}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {ITC_CRIT.map((c, r) => (
            <tr key={c} className={r < filled ? "is-on" : ""}>
              <th scope="row">{c}</th>
              {ITC_OPT.map(([o, s], k) => (
                <td key={o} className={done && k === 2 ? "is-win" : ""}>
                  <span className="itc-con__dots" aria-label={s[r] + " of 3"}>
                    {[1, 2, 3].map((x) => (
                      <i key={x} className={x <= s[r] ? "is-f" : ""} />
                    ))}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="itc-con__rec" aria-live="polite">
        {done ? (
          <>
            <span className="v4-st v4-st--ok">Recommended path</span> Extend the core, integrate the gaps, replace later only if needed.
          </>
        ) : (
          <span className="v4-st v4-st--info">Weighing options…</span>
        )}
      </div>
      <ol className="itc-con__steps" aria-hidden="true">
        {["Think", "Decide", "Build", "Improve"].map((s, k) => (
          <li key={s} className={k === stage ? "is-on" : k < stage ? "is-done" : ""}>
            {s}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/* ── technology friction board (sticky notes) ────────────────────────────────────────── */
const ITC_NOTES = [
  ["Too many software choices", "Teams evaluate tools by demo, not by fit."],
  ["Legacy systems slowing growth", "Every change takes longer and costs more."],
  ["Decisions made without architecture", "Each new tool adds another island."],
  ["Disconnected applications", "People re-key data between systems."],
  ["Manual processes eating time", "Skilled staff spend hours on copy-paste."],
  ["AI initiatives without a business case", "Pilots that never reach production."],
  ["Cloud costs growing without control", "Spend rises faster than usage."],
  ["Building without clear priorities", "Roadmaps change every month."],
  ["Vendors recommending what they sell", "Advice shaped by a product catalogue."],
  ["Security considered too late", "Fixes arrive after launch, at higher cost."],
  ["Software hard to maintain", "Fewer people dare to change it."],
  ["Requirements lost in translation", "Business needs never become clear specifications."],
];
function ITC_Board() {
  const [i, setI] = ee.useState(-1);
  return (
    <div className="itc-board">
      <ul>
        {ITC_NOTES.map(([t, d], k) => (
          <li key={t} style={{ "--r": ((k * 7) % 5) - 2 + "deg", "--k": k }} className={k === i ? "is-on" : ""}>
            <button type="button" aria-expanded={k === i} onClick={() => setI(k === i ? -1 : k)}>
              <b>{t}</b>
              <span hidden={k !== i}>{d}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="itc-board__say">
        The problem usually isn't a lack of technology. <em>It is choosing the wrong technology, at the wrong time, for the wrong problem.</em>
      </p>
    </div>
  );
}

/* ── decision engine spine ───────────────────────────────────────────────────────────── */
const ITC_ENGINE = [
  ["Business objective", "What outcome the investment must produce, and how it will be measured.", "Solving the wrong problem well.", "A shared definition of success."],
  ["Technology constraints", "Existing systems, data, team skills, budget, timeline and regulation.", "Plans that ignore reality.", "Realistic boundaries for every option."],
  ["Options", "Build, buy, extend, integrate or retire — compared side by side.", "Defaulting to the familiar or the fashionable.", "A short list with honest trade-offs."],
  ["Architecture", "How the chosen option fits applications, APIs, data, cloud and security.", "Another disconnected island.", "An architecture that can evolve."],
  ["AI & automation opportunities", "Where AI or automation clearly removes effort or improves decisions.", "AI theatre with no business case.", "Use cases worth funding."],
  ["Implementation path", "Phases, dependencies, team and delivery approach.", "A strategy no one can execute.", "Know what to build now, next and later."],
  ["Measurement", "The indicators that show whether the decision worked.", "Investments nobody can evaluate.", "Evidence for the next decision."],
  ["Continuous improvement", "Reviewing, adjusting and extending as the business changes.", "Roadmaps that age on a shelf.", "A living plan."],
];
function ITC_Engine() {
  const [ref, v] = ppIn(0.25);
  const [i, pick] = v4Pick(ITC_ENGINE.length, v, 2600);
  const e = ITC_ENGINE[i];
  return (
    <div ref={ref} className="itc-eng">
      <ol className="itc-eng__spine">
        {ITC_ENGINE.map(([t], k) => (
          <li key={t} className={(k === i ? "is-on" : "") + (k < i ? " is-done" : "")}>
            <button type="button" aria-pressed={k === i} onClick={() => pick(k)}>
              <span className="v4-mono">{String(k + 1).padStart(2, "0")}</span> {t}
            </button>
          </li>
        ))}
      </ol>
      <div className="itc-eng__d" aria-live="polite" key={i}>
        <h3>{e[0]}</h3>
        <dl>
          <div>
            <dt>What we evaluate</dt>
            <dd>{e[1]}</dd>
          </div>
          <div>
            <dt>Risk reduced</dt>
            <dd>{e[2]}</dd>
          </div>
          <div>
            <dt>Value created</dt>
            <dd>{e[3]}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/* ── capability drawers ──────────────────────────────────────────────────────────────── */
const ITC_CAPS = [
  ["IT strategy & roadmapping", "Know what to build now, next and later.", ["Technology maturity assessment", "Current- and future-state planning", "Technology roadmap", "Investment prioritisation", "Digital operating model"]],
  ["Technology architecture", "Design for today's requirements; leave room for tomorrow's.", ["Solution and application architecture", "Enterprise and integration architecture", "API architecture", "Scalability planning", "Architecture reviews"]],
  ["Digital transformation", "Modernise the work, not just the software.", ["Legacy modernisation", "Process digitisation", "Application rationalisation", "Workflow redesign", "Adoption planning"]],
  ["AI & automation consulting", "Automate the work. Keep humans in control.", ["AI opportunity assessment", "Use-case identification", "Workflow automation", "Intelligent document processing", "Human-in-the-loop design"]],
  ["Cloud & infrastructure advisory", "The right environment for the workload.", ["Cloud strategy", "Migration planning", "Infrastructure assessment", "Cost and performance optimisation", "DevOps strategy"]],
  ["Software & platform advisory", "Choose on business logic, not software fashion.", ["Build vs buy decisions", "Technology stack evaluation", "SaaS selection", "Platform assessment", "Technical due diligence"]],
  ["IT project advisory", "Technical direction when it matters most.", ["Project planning", "Technical governance", "Risk identification", "Vendor coordination", "Milestone evaluation"]],
  ["IT audit & technology assessment", "Find the expensive problems before they become expensive projects.", ["Architecture audit", "Application assessment", "Security-readiness review", "Technical debt review", "Infrastructure review"]],
];
function ITC_Drawers() {
  const [i, setI] = ee.useState(0);
  return (
    <ul className="itc-dr">
      {ITC_CAPS.map(([t, m, xs], k) => (
        <li key={t} className={k === i ? "is-on" : ""}>
          <button type="button" aria-expanded={k === i} onClick={() => setI(k === i ? -1 : k)}>
            <span className="itc-dr__h" aria-hidden="true" />
            <b>{t}</b>
            <em>{m}</em>
          </button>
          {k === i && (
            <ul className="itc-dr__in">
              {xs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}

/* ── architecture cross-section ──────────────────────────────────────────────────────── */
const ITC_LAYERS = [
  ["Business layer", "Processes, users, decisions and the outcomes that matter."],
  ["Application layer", "Which applications own which jobs — and where they overlap."],
  ["API / integration layer", "How systems exchange data and trigger each other."],
  ["Data layer", "Where truth lives, how it is governed and who can use it."],
  ["Cloud / infrastructure layer", "Hosting, scalability, resilience and cost."],
  ["Security / monitoring layer", "Access, protection, observability across every layer."],
];
function ITC_Section() {
  const [i, setI] = ee.useState(2);
  return (
    <div className="itc-x">
      <ol className="itc-x__bands">
        {ITC_LAYERS.map(([t], k) => (
          <li key={t} className={k === i ? "is-on" : ""} style={{ "--k": k }}>
            <button type="button" aria-pressed={k === i} onClick={() => setI(k)} onMouseEnter={() => setI(k)}>
              {t}
            </button>
            <i aria-hidden="true" />
          </li>
        ))}
      </ol>
      <div className="itc-x__d" aria-live="polite">
        <small>What we consider</small>
        <b>{ITC_LAYERS[i][0]}</b>
        <p>{ITC_LAYERS[i][1]}</p>
      </div>
    </div>
  );
}

/* ── build vs buy questionnaire ──────────────────────────────────────────────────────── */
const ITC_QS = [
  ["Is this capability a source of differentiation?", "build"],
  ["Do mature products already do this well?", "buy"],
  ["Are your requirements highly specific?", "build"],
  ["Is speed to launch the priority?", "buy"],
  ["Must it integrate deeply with existing systems?", "hybrid"],
];
function ITC_BvB() {
  const [a, setA] = ee.useState({ 0: true, 1: true, 4: true });
  const score = { build: 0, buy: 0, hybrid: 0 };
  ITC_QS.forEach(([, w], k) => {
    if (a[k]) score[w] += 1;
  });
  const win = score.build && score.buy ? "hybrid" : score.hybrid >= Math.max(score.build, score.buy) ? "hybrid" : score.build > score.buy ? "build" : "buy";
  const C = [
    ["build", "Build", ["Differentiation matters", "Requirements are specific", "Existing products don't fit", "Long-term ownership is important"]],
    ["buy", "Buy", ["Requirements are standard", "Speed matters", "Mature SaaS exists", "Customisation isn't a differentiator"]],
    ["hybrid", "Hybrid", ["Core systems can be bought", "Differentiated workflows are custom-built", "Integrations are critical"]],
  ];
  return (
    <div className="itc-bvb">
      <ul className="itc-bvb__q">
        {ITC_QS.map(([q], k) => (
          <li key={q}>
            <label>
              <input type="checkbox" checked={!!a[k]} onChange={() => setA({ ...a, [k]: !a[k] })} />
              <span>{q}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="itc-bvb__cols" aria-live="polite">
        {C.map(([k, t, xs]) => (
          <div key={k} className={k === win ? "is-win" : ""}>
            <b>{t}</b>
            {k === win && <span className="v4-st v4-st--ok">Leaning this way</span>}
            <ul>
              {xs.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── engagement selector ─────────────────────────────────────────────────────────────── */
const ITC_ENG = [
  ["Technology health check", "For businesses unsure whether their current technology foundation is working efficiently."],
  ["Architecture review", "For companies evaluating an existing platform, application or stack."],
  ["Technology roadmap", "For businesses planning their next 12–36 months of technology investment."],
  ["Digital transformation advisory", "For organisations modernising processes, platforms or legacy technology."],
  ["AI opportunity assessment", "For organisations looking for where AI can produce real business value."],
  ["IT project advisory", "For organisations that need technical direction during an important initiative."],
  ["Build vs buy advisory", "For businesses choosing between developing, buying or a hybrid approach."],
  ["Ongoing technology advisory", "For organisations that want an experienced technology partner without building a full internal function."],
];
function ITC_Engage() {
  const [i, setI] = ee.useState(0);
  return (
    <div className="itc-en">
      <div className="itc-en__list" role="group" aria-label="Engagement models">
        {ITC_ENG.map(([t], k) => (
          <button key={t} type="button" aria-pressed={k === i} onClick={() => setI(k)}>
            <span className="v4-mono">{String(k + 1).padStart(2, "0")}</span>
            {t}
          </button>
        ))}
      </div>
      <div className="itc-en__d" aria-live="polite">
        <b>{ITC_ENG[i][0]}</b>
        <p>{ITC_ENG[i][1]}</p>
        <a href={"#" + ITC_FORM} onClick={ppGo(ITC_FORM)} className="btn pp-btn">
          Request an IT Assessment →
        </a>
      </div>
    </div>
  );
}

function ITC_Page() {
  usePageMeta("IT Consulting", ITC_DESC);
  dmMeta(ITC_URL, ITC_TITLE, ITC_DESC);
  ixSchema("itc", {
    url: ITC_URL,
    crumb: "IT Consulting",
    name: "IT Consulting",
    serviceType: "IT consulting and technology advisory",
    schemaDesc:
      "IT consulting and technology advisory: IT strategy and roadmaps, technology and solution architecture, digital transformation, AI and automation opportunity assessment, cloud and infrastructure advisory, build-vs-buy and SaaS selection, IT project advisory, technology health checks and IT audits — connected to practical implementation.",
    faq: ITC_FAQ,
  });
  return (
    <div className="pp sm dk ix-page v4p itc-svc">
      <V4_Hero
        id="itc-h1"
        crumb="IT Consulting"
        variant="split"
        kicker="IT Consulting · Technology decisions that hold up in the real world"
        h1="IT Consulting for Better Technology Decisions."
        lead="Frequent Research IT consulting connects business priorities with architecture, AI, automation and delivery. We help you decide what to build, buy or change — with implementation, security, scalability and long-term ownership already in view."
        cta={["Discuss Your Technology Challenge", ITC_FORM]}
        cta2={["Request an IT Assessment", ITC_FORM]}
        cta3={["Explore our IT capabilities", "itc-cap-h"]}
        points={["Strategy that can become software", "Technology-agnostic advice", "AI with a use case", "Ownership-friendly architecture"]}
      >
        <ITC_Console />
      </V4_Hero>

      <IX_Sec id="itc-fric-h" tone="off" k="Technology friction map" t="The problem usually isn't a lack of technology." s="Open a note to see what it costs the business.">
        <ITC_Board />
      </IX_Sec>

      <IX_Sec id="itc-val-h" tone="light" k="Where the value comes from" t="We don't start with technology. We start with the decision.">
        <div className="itc-split">
          <p className="itc-split__big">
            Strategy without implementation creates documents. Implementation without strategy creates technical debt. <em>We connect the two.</em>
          </p>
          <ul>
            {[
              ["Clarity before investment", "Less technology guesswork before significant spend."],
              ["Architecture that supports the business", "Foundations that evolve instead of forcing rebuilds."],
              ["AI with a business reason", "Where AI genuinely reduces effort or improves decisions."],
              ["Choices without vendor bias", "Fit, integration, security and total ownership — not hype."],
              ["Execution-aware consulting", "Realistic for your team, budget, infrastructure and timeline."],
              ["One connected technology view", "Business, product, architecture, engineering and delivery in one conversation."],
            ].map(([t, d]) => (
              <li key={t}>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </IX_Sec>

      <IX_Sec id="itc-eng-h" tone="dark" k="The technology decision engine" t="Eight questions every serious technology decision has to answer." s="Select a stage to see what we evaluate, the risk it reduces and the value it creates.">
        <ITC_Engine />
      </IX_Sec>

      <IX_Sec id="itc-cap-h" tone="light" k="Core IT consulting capabilities" t="A technology decision stack, from strategy to audit.">
        <ITC_Drawers />
      </IX_Sec>

      <IX_Sec lv={3} id="itc-arch-h" tone="off" k="Architecture" t="Technical depth, without overwhelming the boardroom." s="Hover or select a layer.">
        <ITC_Section />
      </IX_Sec>

      <IX_Sec id="itc-ai-h" tone="ink" k="AI & automation consulting" t="AI belongs inside the workflow — not on the homepage." s="Practical opportunities, assessed honestly. Where traditional software is the better answer, we say so.">
        <ul className="itc-pairs">
          {[
            ["Manual document processing", "Intelligent extraction"],
            ["Repetitive customer support", "AI-assisted responses"],
            ["Internal knowledge search", "AI knowledge assistant"],
            ["Routine operational decisions", "AI-assisted workflows"],
            ["Data-heavy processes", "Intelligent classification and analysis"],
            ["Repetitive administrative work", "Workflow automation"],
          ].map(([a, b], k) => (
            <li key={a} style={{ "--k": k }}>
              <s>{a}</s>
              <i aria-hidden="true" />
              <b>{b}</b>
            </li>
          ))}
        </ul>
        <p className="itc-pairs__n">
          See <PpL to={ppIt("ai-and-automation-solutions")}>AI &amp; automation solutions</PpL> for delivery.
        </p>
      </IX_Sec>

      <IX_Sec lv={3} id="itc-bvb-h" tone="light" k="Build vs buy" t="The right answer isn't always build. It isn't always buy." s="Tick what is true for you — the option that makes the most business sense lights up.">
        <ITC_BvB />
      </IX_Sec>

      <IX_Sec lv={3} id="itc-out-h" tone="dark" k="What clients actually get" t="What changes after the conversation?">
        <ul className="itc-out">
          {[
            ["Less uncertainty", "Clearer decisions before significant investment."],
            ["Better prioritisation", "Initiatives aligned with real business priorities."],
            ["Lower architectural risk", "Problems found before they become rebuilds."],
            ["A faster path to execution", "Recommendations structured for delivery."],
            ["Smarter automation", "AI and automation aimed at meaningful processes."],
            ["Stronger ownership", "Clear architecture, documentation and rationale."],
          ].map(([t, d], k) => (
            <li key={t} style={{ "--k": k }}>
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </IX_Sec>

      <IX_Sec lv={3} id="itc-en-h" tone="light" k="Consulting engagement models" t="Start where the decision is.">
        <ITC_Engage />
      </IX_Sec>

      <IX_Sec id="itc-why-h" tone="off" k="Why Frequent Research" t="Why bring Frequent Research into the room?" s="More practical than traditional consulting. More strategic than a pure development shop.">
        <ul className="itc-why">
          {[
            ["Business + technology", "Technology decisions understood through business consequences.", "compass"],
            ["Consulting + engineering", "Requirement → architecture → product → development → integration → AI → testing → deployment → support.", "code"],
            ["AI without theatre", "Useful AI, not AI terminology.", "spark"],
            ["Clear ownership", "Architecture, documentation and code ownership stay with you.", "key"],
            ["Practical roadmaps", "Plans that tell teams what to do next.", "branch"],
            ["Long-term thinking", "Technology that stays maintainable after the first project.", "refresh"],
          ].map(([t, d, ic], k) => (
            <li key={t} className={"itc-why--" + (k % 3)}>
              <IX_I n={ic} s={22} />
              <b>{t}</b>
              <span>{d}</span>
            </li>
          ))}
        </ul>
      </IX_Sec>

      <IX_Sec lv={3} id="itc-tech-h" tone="light" k="Technology & sectors" t="Technology-agnostic advice, grounded in what we build.">
        <V4_TechLine
          groups={[
            ["Front end", ["React", "Next.js"]],
            ["Back end", ["Node.js", "PHP / Laravel", "Python"]],
            ["Mobile", ["Flutter", "React Native"]],
            ["Cloud", ["AWS", "Microsoft Azure", "Google Cloud"]],
            ["Data & AI", ["Dashboards", "Data platforms", "AI applications", "Workflow automation"]],
            ["Integration", ["REST APIs", "Third-party integrations", "System integration"]],
          ]}
          note="No certification, partnership or vendor status is implied."
        />
        <div className="itc-sect">
          <V4_Tags
            items={[
              ["Healthcare", "cross", "Scheduling, records, integrations and access control", "healthcare"],
              ["Financial Services", "coin", "Legacy core systems, integration and reliability", "financial-services"],
              ["Manufacturing", "factory", "ERP, shop-floor data and operational visibility", "manufacturing"],
              ["Retail", "cart", "Commerce platforms, inventory and customer data", "retail"],
              ["Education", "book", "Portals, admissions systems and student data", "education"],
              ["Government", "landmark", "Citizen services, legacy modernisation and security", "government"],
            ]}
            note="Typical technology challenges by sector — not claims about specific clients."
          />
        </div>
      </IX_Sec>

      <DM_Faq
        id="itc-faq"
        title="IT consulting: common questions"
        items={ITC_FAQ}
        aside={
          <>
            Related: <PpL to={ppIt("custom-software-development")}>custom software</PpL>, <PpL to={ppIt("web-application-development")}>web applications</PpL>, <PpL to={ppIt("crm-development")}>CRM</PpL>, <PpL to={ppIt("erp-development")}>ERP</PpL>, <PpL to={ppIt("saas-development")}>SaaS</PpL> and <PpL to={ppIt("cloud-and-devops-services")}>cloud &amp; DevOps</PpL>.
          </>
        }
      />

      <IX_Guide to="/blog/it-consulting-guide" title="IT Consulting for Growing Businesses: Making Technology Decisions with Confidence" text="When to bring in a consultant and what a good roadmap contains." />

      <V4_Close
        id="itc-close-h"
        kicker="Plan your next technology move"
        title="Have a technology decision you don't want to get wrong?"
        text="Tell us what you are trying to solve. We'll help you understand the options, the risks and the practical next steps."
        cta={["Discuss Your Technology Challenge", ITC_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        checks={["Options compared honestly", "Architecture and integration in view", "AI only where it earns its place", "A roadmap your team can execute"]}
      />

      <DM_Form
        id={ITC_FORM}
        kicker="IT project consultation"
        title="Discuss Your Technology Challenge"
        sub="A few short questions help us understand the decision in front of you."
        type="IT Consulting Enquiry"
        service="IT Consulting"
        icon="compass"
        submitLabel="Request My IT Consultation"
        successTitle="Thank you. Your IT consulting request has been sent."
        siteLabel="Existing website or application (optional)"
        msgLabel="What decision are you facing? (optional)"
        msgPh="Current systems, what is not working, the options you are considering, timing — whatever helps"
        nextSteps={["We review the challenge you described.", "We contact you to understand the context and constraints.", "You get a recommended engagement and next step."]}
        chips={[
          { k: "need", t: "Need", q: "What do you need?", label: "Consulting need", options: ["Technology health check", "Architecture review", "Technology roadmap", "Digital transformation advisory", "AI opportunity assessment", "IT project advisory", "Build vs buy advice", "Ongoing technology advisory"] },
          { k: "area", t: "Area", q: "Which areas are involved?", label: "Technology areas", multi: true, options: ["Applications", "CRM / ERP", "Integrations", "Cloud / infrastructure", "Data & analytics", "AI & automation", "Security", "Not sure yet"] },
          { k: "stage", t: "Stage", q: "Where are you today?", label: "Current stage", options: ["Exploring options", "Planning a project", "Mid-project, need direction", "Existing systems not working", "Preparing a budget"] },
        ]}
      />

      <V4_Rail
        id="itc-rel-h"
        title="From advice to delivery: related IT & Development services"
        items={[
          ["IT & Development", "", "All business technology services."],
          ["Custom Software Development", "custom-software-development", "When the answer is to build."],
          ["Web Application Development", "web-application-development", "Business applications for the browser."],
          ["SaaS Development", "saas-development", "Products for many customers."],
          ["CRM Development", "crm-development", "Customer systems that fit."],
          ["ERP Development", "erp-development", "Operations in one system."],
          ["API Development & Integration", "api-development-and-integration", "Connect what you already own."],
          ["AI & Automation Solutions", "ai-and-automation-solutions", "Automation with a business case."],
          ["Cloud & DevOps Services", "cloud-and-devops-services", "The environment to run it."],
          ["Cybersecurity Services", "cybersecurity-services", "Security in every decision."],
          ["Software Testing & QA", "software-testing-and-qa", "Release with evidence."],
          ["Application Maintenance & Support", "application-maintenance-and-support", "Keep it healthy after launch."],
        ]}
      />
    </div>
  );
}

export { ITC_Page };
