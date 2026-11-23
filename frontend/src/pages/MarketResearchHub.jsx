/*
 * Market Research landing page — /services/market-research (URL unchanged)
 * Build 42 redesign of the vertical hub only (individual market research service pages are unchanged).
 * Positioning: decision-first research, human-led and AI-assisted, with Frequent Research's own audiences,
 * multi-mode fieldwork and quality controls as the USP. Facts are taken from the existing site content.
 * No case studies, team details, example boxes, invented numbers, clients or certifications.
 */
import * as ee from 'react';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { DM_Faq, DM_Form, PpL, dmMeta, ppMr } from '../components/dm/shared.jsx';
import { IX_Ask, IX_Band, IX_Eco, IX_Final, IX_Flows, IX_Graph, IX_Hero, IX_I, IX_Industries, IX_Motto, IX_Outcomes, IX_Related, IX_Sec, IX_Timeline, IX_Tree, IX_Trust, IX_Why } from '../components/dm/ixkit.jsx';

const MRH_URL = "/services/market-research";
const MRH_TITLE = "Market Research Services: Decision-First | Frequent Research";
const MRH_DESC = "Market research built around the decision: the right respondents, multi-mode fieldwork, AI-assisted quality checks and insights you can defend in the boardroom.";
const MRH_FORM = "mrh-consult";

const MRH_GROUPS = [
  ["Frame the decision", "compass", ["Research Consultancy", "Research Design Cycle"], "Start with the question worth answering."],
  ["Reach the right people", "users", ["Consumer Panel", "Business Panel", "Healthcare Panel"], "Profiled consumers, verified decision-makers, teens with parental consent, healthcare professionals and patients."],
  ["Collect it well", "chat", ["Online Data Collection", "CATI — Computer-Assisted Telephone Interviewing", "Offline Data Collection"], "Online, telephone or face to face — whichever reaches the audience best."],
  ["Choose the method", "branch", ["Qualitative Research", "Quantitative Research"], "The why behind behaviour, and the numbers that size it."],
  ["Turn data into decisions", "bars", ["Data Processing & Analytics", "Reporting & Insights"], "Clean, analysed data and a story that recommends a next step."],
];
const mrhSlug = (t) =>
  t
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function MRH_Map({ services }) {
  const [g, setG] = ee.useState(-1);
  const find = (name) => (services || []).find((s) => s.name === name) || { name, slug: mrhSlug(name), summary: "" };
  return (
    <ol className="mrh-map">
      {MRH_GROUPS.map(([t, ic, names, d], k) => (
        <li key={t} className={"mrh-map__g" + (g === k ? " is-on" : "")} style={{ "--k": k }} onMouseEnter={() => setG(k)} onMouseLeave={() => setG(-1)}>
          <div className="mrh-map__h">
            <span className="mrh-map__n">{String(k + 1).padStart(2, "0")}</span>
            <span className="mrh-map__ic">
              <IX_I n={ic} s={18} />
            </span>
            <b>{t}</b>
            <p>{d}</p>
          </div>
          <ul>
            {names.map((n) => {
              const s = find(n);
              return (
                <li key={n}>
                  <PpL to={ppMr(s.slug)}>
                    <b>{s.name}</b>
                    {s.summary && <span>{s.summary}</span>}
                    <em aria-hidden="true">→</em>
                  </PpL>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ol>
  );
}

function MRH_Page({ a }) {
  const faq = ((a && a.faqs) || []).map((x) => [x.q, x.a]);
  const services = (a && a.services) || [];
  usePageMeta("Market Research Services", MRH_DESC);
  dmMeta(MRH_URL, MRH_TITLE, MRH_DESC);
  useJsonLd("mrh", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Market Research Services",
        description: MRH_DESC,
        url: `${location.origin}${MRH_URL}`,
        provider: { "@type": "Organization", name: "Frequent Research", legalName: "Frequent Research Fieldwork Solutions Private Limited" },
        mainEntity: { "@type": "ItemList", itemListElement: services.map((s, k) => ({ "@type": "ListItem", position: k + 1, name: s.name, url: `${location.origin}${ppMr(s.slug)}` })) },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "Services", item: `${location.origin}/services` },
          { "@type": "ListItem", position: 3, name: "Market Research", item: `${location.origin}${MRH_URL}` },
        ],
      },
      ...(faq.length ? [{ "@type": "FAQPage", mainEntity: faq.map(([q, an]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: an } })) }] : []),
    ],
  });
  return (
    <div className="pp sm dk ix-page mrh">
      <IX_Hero
        id="mrh-h1"
        crumb="Market Research"
        parent={["Services", "/services"]}
        kicker="Market Research Services · Human-led, AI-assisted"
        h1="Market Research Services That Turn Questions Into Decisions"
        lead="Good decisions start with good information. Frequent Research helps organisations understand what people think, need and buy — and why — across B2C, B2B and healthcare audiences, with research designed around the decision you need to make."
        cta={["Request Research Feasibility", MRH_FORM]}
        cta2={["Explore Our Services", "mrh-svc-h"]}
        cta3={["See how we protect data quality", "mrh-q-h"]}
        points={["Own consumer, business & healthcare panels", "Online, CATI & face-to-face", "Quality checks at every stage", "One point of contact, brief to debrief"]}
      >
        <IX_Graph
          center="Your decision"
          centerIcon="target"
          title="From question to decision"
          label="Research engine: your decision at the centre, connected to consumer, business and healthcare audiences, online, telephone and face-to-face fieldwork, qualitative and quantitative methods, quality controls, AI assistance, analytics and insights."
          nodes={[
            ["Consumers", "users"],
            ["Businesses", "building"],
            ["Healthcare", "cross"],
            ["Online", "globe"],
            ["CATI", "phone"],
            ["Face to face", "user"],
            ["Qualitative", "chat"],
            ["Quantitative", "bars"],
            ["Quality controls", "shield"],
            ["AI assistance", "spark"],
            ["Insights", "eye"],
          ]}
          links={[
            [0, 3],
            [1, 4],
            [2, 5],
            [6, 9],
            [7, 8],
            [8, 10],
            [9, 10],
            [3, 7],
            [5, 6],
          ]}
          journey={[
            ["Question", [10]],
            ["Design", [6, 7]],
            ["Sample", [0, 1, 2]],
            ["Collect", [3, 4, 5]],
            ["Quality", [8, 9]],
            ["Analyse", [7, 9]],
            ["Decide", [10]],
          ]}
        />
      </IX_Hero>

      <IX_Band tone="off" micro={["Ask better", "Reach the right people", "Protect the data", "Decide with confidence"]} text="Research is only as good as the decision it helps you make." sub="We design every study backwards — from the decision, to the evidence it needs, to the people who can provide it." />

      <IX_Sec id="mrh-prob-h" tone="light" k="Why research goes wrong" t="Most research goes wrong before the first question is asked." s="A vague objective, the wrong sample or a field partner who cuts corners produces data you can't defend in a boardroom. Here's the difference a decision-first approach makes.">
        <IX_Flows
          cols={[
            { t: "Typical research", s: "Data you have to defend", steps: [["Vague objective", "Risk"], ["Generic questionnaire", ""], ["Whoever is available", "Wrong sample"], ["Unchecked responses", "Risk"], ["Tables without a story", "Late"]] },
            { t: "Decision-first research", s: "Evidence you can act on", steps: [["Decision defined", "Brief"], ["Method chosen for the decision", "Design"], ["Feasibility checked before you commit", "Sample"], ["Live quota & quality monitoring", "Fieldwork"], ["Cleaned, coded, weighted data", "Quality"], ["The story behind the numbers", "Insight"], ["A clear next step", "Decision"]], foot: "We design the study around the decision you need to make, recruit the right respondents, control quality at every stage and hand you findings you can act on." },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="mrh-svc-h" tone="off" k="Market research services" t="Five capabilities. One accountable research partner." s="From framing the question to the debrief — choose where you need help.">
        <MRH_Map services={services} />
      </IX_Sec>

      <IX_Sec id="mrh-ai-h" tone="ink" k="AI-assisted, human-led research" t="AI makes research faster and cleaner. People make it meaningful." s="AI assists at the stages where speed and consistency matter; researchers stay responsible for method, interpretation and recommendations.">
        <IX_Ask
          console="Ask your study"
          cards={[
            ["Smarter questionnaire checks", "doc", "Logic, routing and wording checked before launch, so fieldwork starts clean."],
            ["Fraud & quality detection", "shield", "Speeders, straight-liners, duplicates and suspicious patterns flagged for review."],
            ["Open-end coding", "layers", "Thousands of verbatims grouped into themes, then checked by researchers."],
            ["Translation & consistency QA", "globe", "Multi-language studies checked for meaning, not just words."],
            ["Faster insight synthesis", "spark", "Patterns across segments surfaced quickly for analysts to interpret."],
            ["Live fieldwork monitoring", "eye", "Quotas and quality tracked in real time so issues are fixed during fieldwork."],
          ]}
          queries={[
            ["Summarise what dissatisfied customers say about delivery.", ["Theme · late or missed delivery slots", "Theme · not enough tracking updates", "Theme · damaged packaging"]],
            ["Which open-ends look copied or low-effort?", ["Flag · repeated text across respondents", "Flag · answers unrelated to the question", "Flag · gibberish or keyboard patterns"]],
            ["Compare purchase drivers between first-time and repeat buyers.", ["Driver · price matters more to first-time buyers", "Driver · reliability matters more to repeat buyers", "Note · check significance before reporting"]],
          ]}
          note="AI outputs are reviewed by researchers. Respondent data is handled under our privacy and data-protection policies."
        />
      </IX_Sec>

      <IX_Sec id="mrh-aud-h" tone="dark" k="Reach the right people" t="Respondents who genuinely match your target audience." s="Our own profiled panels, verified decision-makers and vetted local partners — reached through the mode that suits them." center wide>
        <IX_Eco
          center="The right respondents"
          centerIcon="target"
          groups={[
            { t: "Consumers", icon: "users", items: ["Profiled panel", "Category users & buyers", "Mobile-first surveys"] },
            { t: "Business decision-makers", icon: "building", items: ["IT & technology", "C-suite & senior managers", "SME owners"] },
            { t: "Healthcare", icon: "cross", items: ["Physicians & specialists", "Pharmacists", "Patients"] },
            { t: "Hard-to-reach audiences", icon: "phone", items: ["CATI", "CAPI / PAPI", "Urban to rural fieldwork"] },
            { t: "Multi-country studies", icon: "globe", items: ["Own panels", "Vetted local partners", "Feasibility per market"] },
            { t: "Research agencies", icon: "layers", items: ["White-label fieldwork", "Sample", "Data processing"] },
          ]}
        />
      </IX_Sec>

      <IX_Sec id="mrh-q-h" tone="off" k="Quality you can defend" t="Bad completes are removed before you ever see the data." center>
        <IX_Trust
          center="Data quality"
          items={[
            ["Identity checks", "user", "Respondents are who they say they are."],
            ["Digital fingerprinting", "key", "Duplicate and fraudulent entries blocked."],
            ["Attention checks", "eye", "Engagement tested inside the survey."],
            ["Speeders & straight-liners", "clock", "Low-effort responses identified."],
            ["Open-end review", "doc", "Verbatims read, not just counted."],
            ["Live quota monitoring", "bars", "Balanced samples, corrected during fieldwork."],
            ["Manual cleaning", "check", "Researchers review before delivery."],
            ["Coding & weighting", "sliders", "Data structured for robust analysis."],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="mrh-tree-h" tone="dark" k="Choose the right approach" t="Which research approach fits your decision?" s="Four quick questions. An honest starting point.">
        <IX_Tree
          id="mrh-tree"
          formId={MRH_FORM}
          cta="Check feasibility"
          nodes={[
            { q: "Do you already know the right questions to ask?", s: "Clarity", no: ["Start with research consultancy or qualitative research.", "Interviews, groups or a short consultancy phase help frame the questions before you measure anything."] },
            { q: "Do you need numbers you can size, compare or track?", s: "Measurement", no: ["Qualitative research may be enough.", "When the goal is understanding the why, depth interviews or groups give richer answers than a survey."] },
            { q: "Can your audience be reached reliably online?", s: "Reach", no: ["Use CATI or face-to-face fieldwork.", "Telephone and in-person interviewing reach audiences that online panels under-represent."] },
            { q: "Is it a specialist B2B or healthcare audience?", s: "Audience", no: ["An online consumer study is likely the fastest route.", "Our consumer panel with quality controls and live quotas suits most consumer questions."] },
          ]}
          final={["A specialist panel study with a feasibility check.", "Business or healthcare audiences need real availability checked first. We confirm feasibility and cost before you commit."]}
        />
      </IX_Sec>

      <IX_Sec id="mrh-proc-h" tone="light" k="The research design cycle" t="A disciplined path from brief to boardroom." s="Select a stage.">
        <IX_Timeline
          id="mrh-tl"
          stages={[
            ["Understand", "Clarify the business decision, audience and constraints.", "search2"],
            ["Design", "Methodology, questionnaire or discussion guide, and quotas.", "branch"],
            ["Sample", "Feasibility check and recruitment from verified panels and partners.", "users"],
            ["Collect", "Online, CATI, face-to-face or qualitative fieldwork with live monitoring.", "chat"],
            ["Process", "Cleaning, coding, weighting and quality checks.", "check"],
            ["Analyse", "Tables, statistics and the story behind the numbers.", "bars"],
            ["Deliver insights", "Clear reports and a debrief focused on what to do next.", "target"],
          ]}
          note="Feasibility and costs before you commit — and one point of contact from brief to debrief."
        />
      </IX_Sec>

      <IX_Sec id="mrh-val-h" tone="off" k="What changes for your business" t="Research that moves the decision forward.">
        <IX_Outcomes
          items={[
            ["Decisions you can defend", "shield", "Evidence designed around the business question.", "decide"],
            ["The right people", "users", "Respondents who genuinely match the target.", "see"],
            ["Clarity before commitment", "compass", "Feasibility and costs known up front.", "fast"],
            ["Clean data", "check", "Quality controls at every stage.", "less"],
            ["One accountable partner", "link", "A single point of contact, brief to debrief.", "link"],
          ]}
        />
      </IX_Sec>

      <IX_Sec id="mrh-why-h" tone="light" k="Why Frequent Research" t="What makes Frequent Research different.">
        <IX_Why
          items={[
            ["Decision-first research design", "target", "Every study is designed backwards from the decision you need to make — so the output is a recommendation, not just a dataset."],
            ["Our own audiences", "users", "Consumer, business and healthcare panels, plus vetted local partners."],
            ["Every mode of fieldwork", "phone", "Online, CATI and face-to-face (CAPI / PAPI) under one roof."],
            ["Quality at every stage", "shield", "Identity checks, fingerprinting, attention checks and manual cleaning."],
            ["AI-assisted, human-led", "spark", "AI speeds up checks, coding and synthesis; researchers own the conclusions."],
            ["A partner for agencies", "layers", "White-label fieldwork, sample and data processing."],
            ["One named contact", "user", "A single point of contact from brief to debrief."],
          ]}
        />
      </IX_Sec>

      <IX_Motto id="mrh-moto-h" kicker="Our research philosophy" quote="Ask the right people the right questions — and decide with confidence." lines={["Start with the decision.", "Reach the right people.", "Protect the data.", "Find the story.", "Recommend the next step."]} />

      <IX_Sec id="mrh-ind-h" tone="off" k="Industries" t="Research shaped by the industry's questions." s="Choose an industry to see typical research needs." center>
        <IX_Industries
          items={[
            ["Healthcare", "cross", "physician, pharmacist and patient research."],
            ["Pharmaceutical", "pill", "treatment journeys and prescriber insight."],
            ["Information Technology", "cpu", "IT decision-maker and buyer research."],
            ["Financial Services", "coin", "customer experience and product research."],
            ["Retail", "cart", "shopper behaviour and brand research."],
            ["Food & Beverage", "leaf", "product, taste and packaging research."],
            ["Automotive", "car", "purchase journeys and owner experience."],
            ["Telecommunications", "signal", "customer satisfaction and churn drivers."],
            ["Manufacturing", "factory", "B2B buyer and distributor research."],
            ["Agriculture", "wheat", "farmer and rural research, often face to face."],
            ["Energy", "bolt", "customer and stakeholder research."],
            ["Education", "book", "student, parent and institution research."],
            ["Media", "film", "audience and content research."],
            ["Government", "landmark", "citizen and public-opinion research."],
          ]}
        />
      </IX_Sec>

      {faq.length > 0 && <DM_Faq id="mrh-faq" title="Market research: common questions" items={faq} aside={<>Read our <PpL to="/blog/market-research-guide-india">market research guide</PpL>, or explore <PpL to="/portals">our research panels</PpL>.</>} />}

      <IX_Final
        id="mrh-final-h"
        kicker="Request research feasibility"
        title="Tell us the decision. We'll design the research around it."
        text="Share your audience, markets and timeline. We'll check real feasibility and cost before you commit."
        cta={["Request Research Feasibility", MRH_FORM]}
        cta2={["Request a Quote", "/lets-talk?type=quote"]}
        cta3={["Audience feasibility", MRH_FORM]}
        flow={["Question", "Design", "Sample", "Collect", "Quality", "Insight", "Decision"]}
        sig="Good decisions start with good information."
      />

      <DM_Form
        id={MRH_FORM}
        kicker="Research consultation"
        title="Request Research Feasibility"
        sub="A few quick questions help us check feasibility and recommend the right approach."
        type="Market Research Enquiry"
        service="Market Research"
        icon="search"
        submitLabel="Request Feasibility"
        successTitle="Thank you. Your research request has been sent."
        siteLabel="Company website (optional)"
        msgLabel="Study details (optional)"
        msgPh="Objective, audience, markets, sample size, timing — whatever you know so far"
        nextSteps={["We review the objective and audience.", "We check real feasibility with panels and partners.", "You get a recommended approach, feasibility and cost."]}
        chips={[
          { k: "need", t: "Need", q: "What do you need?", label: "Research need", multi: true, options: ["Research consultancy", "Quantitative survey", "Qualitative research", "Online data collection", "CATI", "Face-to-face fieldwork", "Panel sample only", "Data processing & analytics", "Reporting & insights"] },
          { k: "aud", t: "Audience", q: "Who do you need to hear from?", label: "Audience", multi: true, options: ["Consumers", "Business decision-makers", "Healthcare professionals", "Patients", "Hard-to-reach / offline", "Not sure yet"] },
          { k: "who", t: "You are", q: "Which best describes you?", label: "Client type", options: ["Brand / end client", "Research agency", "Consultancy", "Public sector / NGO", "Other"] },
          { k: "when", t: "Timing", q: "When do you need results? (optional)", label: "Timeline", optional: true, options: ["As soon as possible", "Within a month", "1 to 3 months", "Just exploring"] },
        ]}
      />

      <IX_Sec id="mrh-rel-h" tone="dark" k="Explore more" t="Other ways Frequent Research helps">
        <IX_Related
          base={(s) => s}
          items={[
            ["Research panels", "/portals", "Turn2Opinion, MyFrequentRewards and MyHealthOpinions."],
            ["Digital Marketing", "/services/digital-marketing", "Growth across search, social, content and performance."],
            ["IT & Development", "/services/it-development", "Websites, applications and business software."],
            ["Accounts & Finance", "/services/accounts-finance", "Accounting, tax and compliance support."],
            ["Industries", "/industries-case-studies", "How research applies across sectors."],
            ["Let's talk", "/lets-talk?type=feasibility", "Start with a feasibility check."],
          ]}
        />
      </IX_Sec>
    </div>
  );
}

export { MRH_Page };
