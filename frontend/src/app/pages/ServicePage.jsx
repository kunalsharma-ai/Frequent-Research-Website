import * as ee from 'react';
import { HeroDemote } from '../shared/HeroH1.jsx';
import { SvcHero79 } from '../../design79/SvcHero79.jsx';
import { Link, useParams } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { navGo } from '../nav.jsx';
import { findVertical } from '../data/products.jsx';
import { IndustryIcon } from '../home/HeroParts.jsx';
import { INDUSTRIES, findIndustry } from '../data/industries.jsx';
import { CtaSection, EnquiryForm, PageHero } from '../shared/CoreParts.jsx';
import { RC_I } from '../shared/Reveal.jsx';
import { FaqList, GuideLink, PanelsSection, ProcessSection, TeamCaption, WhyUs } from './VerticalPage.jsx';
import { RPT_Page } from './RPTPage.jsx';
import { QLT_Page } from './QLTPage.jsx';
import { QNT_Page } from './QNTPage.jsx';
import { OFC_Page } from './OFCPage.jsx';
import { CATI_Page } from './CATIPage.jsx';
import { DPA_Page } from './DPAPage.jsx';
import { RDC_Page } from './RDCPage.jsx';
import { HP_Page } from './HPPage.jsx';
import { BP_Page } from './BPPage.jsx';
import { CP_Page } from './CPPage.jsx';
import { OD_Page } from './ODPage.jsx';
import { RC_Page } from './RCPage.jsx';
import { NotFoundPage, usePageMeta } from '../SiteApp.jsx';
import { PPC_Page } from '../../pages/GoogleAdsPpc.jsx';
import { SMM_Page } from '../../pages/SocialMediaMarketing.jsx';
import { SMA_Page } from '../../pages/SocialMediaAdvertising.jsx';
import { CM_Page } from '../../pages/ContentMarketing.jsx';
import { PFM_Page } from '../../pages/PerformanceMarketing.jsx';
import { LGN_Page } from '../../pages/LeadGeneration.jsx';
import { VM_Page } from '../../pages/VideoMarketing.jsx';
import { WA_Page } from '../../pages/WhatsAppMarketing.jsx';
import { RM_Page } from '../../pages/OnlineReputationManagement.jsx';
import { MA_Page } from '../../pages/MarketingAutomation.jsx';
import { LP_Page } from '../../pages/LandingPageCro.jsx';
import { IN_Page } from '../../pages/InfluencerMarketing.jsx';
import { EM_Page } from '../../pages/EmailMarketing.jsx';
import { EC_Page } from '../../pages/EcommerceMarketing.jsx';
import { DC_Page } from '../../pages/DigitalMarketingConsulting.jsx';
import { AU_Page } from '../../pages/DigitalMarketingAudit.jsx';
import { AN_Page } from '../../pages/DigitalAnalyticsReporting.jsx';
import { B2_Page } from '../../pages/B2bDigitalMarketing.jsx';
import { SO_Page } from '../../pages/SeoServices.jsx';
import { SD_Page } from '../../pages/SaasDevelopment.jsx';
import { WD_Page } from '../../pages/WebsiteDevelopment.jsx';
import { CS_Page } from '../../pages/CustomSoftwareDevelopment.jsx';
import { WB_Page } from '../../pages/WebApplicationDevelopment.jsx';
import { MB_Page } from '../../pages/MobileAppDevelopment.jsx';
import { ED_Page } from '../../pages/EcommerceDevelopment.jsx';
import { CRM_Page } from '../../pages/CrmDevelopment.jsx';
import { ERP_Page } from '../../pages/ErpDevelopment.jsx';
import { CBA_Page } from '../../pages/CustomBusinessApplications.jsx';
import { UXD_Page } from '../../pages/UiUxDesign.jsx';
import { APX_Page } from '../../pages/ApiDevelopment.jsx';
import { ITC_Page } from '../../pages/ItConsulting.jsx';
import { AMS_Page } from '../../pages/ApplicationMaintenance.jsx';
import { CDO_Page } from '../../pages/CloudDevops.jsx';
import { AIA_Page } from '../../pages/AiAutomation.jsx';
import { DAD_Page } from '../../pages/DataAnalyticsDashboards.jsx';
import { QA_Page } from '../../pages/SoftwareTestingQa.jsx';
import { CYB_Page } from '../../pages/Cybersecurity.jsx';
import { WMS_Page } from '../../pages/WebsiteMaintenance.jsx';
import { AFS_Page, AF_MOVED, AF_Redirect } from '../../pages/AccountsFinance.jsx';

import { SERVICE_INDUSTRIES, serviceFaqs } from '../data/serviceBits.jsx';
const findService = (t, e) => {
  var a;
  return (a = findVertical(t)) == null ? undefined : a.services.find((n) => n.slug === e);
};
const SERVICE_PANELS = {
    "consumer-panel": ["turn2opinion", "myfrequentrewards"],
    "business-panel": ["turn2opinion", "myfrequentrewards"],
    "healthcare-panel": ["myhealthopinions"],
    "online-data-collection": null,
    cati: null,
    "quantitative-research": null,
  },
  SERVICE_FORM_KEY = {
    "market-research": "feasibility",
    "digital-marketing": "digital",
    "it-development": "it",
    "accounts-finance": "finance",
  };
const WU_DATA = {
  "research-consultancy": {
    c: "#0B22A8",
    h: "Why clients choose Frequent Research for research consultancy",
    l: "Advice that starts from your decision and is shaped by people who also run the fieldwork.",
    p: ["Decision-first", "Method-neutral", "Confidential"],
    x: [
      [
        "target",
        "Decision-first briefs",
        "We define the decision before the questionnaire, so every question earns its place.",
      ],
      [
        "scale",
        "Method-neutral advice",
        "We recommend the most efficient route to evidence, which is sometimes less research than you expected.",
      ],
      [
        "layers",
        "Designs that work in the field",
        "Consultants work alongside our own panels and field teams, so recommended designs are feasible before you commit.",
      ],
      [
        "users",
        "Consumer, B2B and healthcare depth",
        "Experience across audiences means the right questions for buyers, decision-makers or clinicians.",
      ],
      [
        "eye",
        "Honest about evidence",
        "We say what is conclusive and what is indicative, so leaders weigh findings properly.",
      ],
      [
        "lock",
        "Confidential by default",
        "Confidentiality agreements are standard and access is limited to the project team.",
      ],
    ],
  },
  "research-design-cycle": {
    c: "#0E8A8A",
    h: "Why clients choose Frequent Research for research design",
    l: "Seven connected stages, run by one team, so the design you approve is the study you get.",
    p: ["Analysis plan upfront", "Quality designed in", "Qual + quant"],
    x: [
      [
        "loop",
        "Every stage connected",
        "Objectives, sample, fieldwork, analysis and reporting are planned together, not handed between vendors.",
      ],
      [
        "clipboard",
        "Analysis plan agreed upfront",
        "We agree how results will be analysed before fieldwork, so the data answers the question.",
      ],
      [
        "filter",
        "Feasibility checked at design stage",
        "Audience availability is confirmed against real panels before the design is finalised.",
      ],
      [
        "layers",
        "Qualitative, quantitative and mixed",
        "We choose the method around the question rather than a default approach.",
      ],
      [
        "shield",
        "Quality designed in",
        "Checks start with objectives and continue through sampling, fieldwork, data and delivery.",
      ],
      ["refresh", "Learning carried forward", "Findings feed the next question, so programmes improve study by study."],
    ],
  },
  "offline-data-collection": {
    c: "#2F855A",
    h: "Why clients choose Frequent Research for offline data collection",
    l: "Telephone and face-to-face fieldwork for the audiences online surveys cannot reach.",
    p: ["CATI \xB7 CAPI \xB7 F2F", "Rural reach", "Supervised"],
    x: [
      [
        "phone",
        "CATI with live supervision",
        "Supervisors monitor calls during fieldwork and back-check a share of interviews.",
      ],
      [
        "mobile",
        "CAPI for accurate field data",
        "Tablet-based interviewing with built-in routing reduces entry errors and speeds up processing.",
      ],
      [
        "map",
        "Rural and hard-to-reach coverage",
        "Fieldwork beyond metros, for audiences who are rarely or never online.",
      ],
      ["store", "Central location tests", "Controlled venues for product, pack and taste testing."],
      [
        "shuffle",
        "Mixed-mode with online",
        "Combine telephone, face-to-face and online to reach the full audience in one study.",
      ],
      [
        "cpu",
        "Progress you can see",
        "Quotas and progress tracked in Sampledge, so fieldwork status is never a guess.",
      ],
    ],
  },
  "consumer-panel": {
    c: "#1E5BFF",
    h: "Why clients choose Frequent Research for consumer panel research",
    l: "Profiled consumers from communities we run ourselves.",
    p: ["Own communities", "30 profile dimensions", "55+ markets"],
    x: [
      [
        "users",
        "Our own consumer communities",
        "Turn2Opinion and MyFrequentRewards members joined us directly, so we know how they were recruited and verified.",
      ],
      [
        "layers",
        "Profiled before your study starts",
        "Thirty profiling dimensions mean invitations reach people who already fit, with fewer screen-outs.",
      ],
      ["cart", "Category users and buyers", "Target by product usage and purchase behaviour, not just demographics."],
      ["mobile", "Mobile-first participation", "Surveys designed for phones, where most consumers answer."],
      ["refresh", "Ready for trackers", "Fast turnaround and consistent profiling for repeat waves."],
      ["shield", "Layered quality controls", "Identity checks, fraud screening and manual cleaning on every project."],
    ],
  },
  "business-panel": {
    c: "#1B2440",
    h: "Why clients choose Frequent Research for Business Panel",
    l: "Verified professionals, matched on role, company and market.",
    p: ["2.85M+ professionals", "Company targeting", "White-label ready"],
    x: [
      [
        "brief",
        "2.85M+ verified business professionals",
        "Decision-makers, influencers, C-suite, SME owners and function specialists.",
      ],
      [
        "building",
        "Targeting beyond job title",
        "Combine role and seniority with industry, employee size, revenue and organization type.",
      ],
      [
        "users",
        "Every stakeholder in the decision",
        "Reach the approver, the influencer and the end user when a study needs all three.",
      ],
      [
        "eye",
        "Honest feasibility for senior roles",
        "We confirm real availability for niche and senior audiences before you commit.",
      ],
      [
        "finger",
        "B2B quality gates",
        "Identity, fraud-prevention and research-quality checks applied according to the study.",
      ],
      [
        "user",
        "Agency-friendly delivery",
        "Many projects are white-label sample and fieldwork for agencies and consultancies.",
      ],
    ],
  },
  "healthcare-panel": {
    c: "#0E8A8A",
  },
  "online-data-collection": {
    c: "#0E9C88",
  },
  "qualitative-research": {
    c: "#5A3FE0",
    h: "Why clients choose Frequent Research for qualitative research",
    l: "From recruitment to transcript, the conversations behind the numbers.",
    p: ["IDIs \xB7 FGDs", "Ethnography", "Online & in person"],
    x: [
      [
        "userplus",
        "Precise participant recruitment",
        "Participants recruited from our own panels and screened against your criteria.",
      ],
      [
        "msg",
        "Experienced moderation",
        "Moderators who probe for motivations, language and context, not just answers.",
      ],
      [
        "globe",
        "Online and in person",
        "In-depth interviews and focus groups run face-to-face or online, whichever fits the audience.",
      ],
      ["home", "Ethnography and home visits", "Observe behaviour where it happens, not only what people say."],
      [
        "file",
        "Recruitment to transcript in one team",
        "Recruitment, moderation and transcripts are managed together, with one point of contact.",
      ],
      [
        "bulb",
        "Findings that explain the why",
        "Themes, quotes and patterns organised around the decision you need to make.",
      ],
    ],
  },
  "quantitative-research": {
    c: "#0B22A8",
    h: "Why clients choose Frequent Research for quantitative research",
    l: "Statistically robust surveys, from questionnaire to analysis.",
    p: ["U&A \xB7 trackers", "Conjoint", "55+ markets"],
    x: [
      [
        "edit",
        "Questionnaires reviewed before fieldwork",
        "We check drafts for clarity, bias, routing and analysis potential.",
      ],
      ["users", "Sample from our own panels", "Consumer, business and healthcare respondents across 55+ markets."],
      [
        "bars",
        "The full range of studies",
        "Usage and attitude, brand tracking, concept and product testing, pricing and conjoint.",
      ],
      ["shield", "Data you can defend", "Speeders, straight-liners and duplicates removed before you see the data."],
      ["refresh", "Consistent trackers", "Stable sampling and quality rules from wave to wave."],
      ["pie", "Analysis built in", "Weighting, tabulation and driver analysis handled by our own data team."],
    ],
  },
  cati: {
    c: "#0E8A8A",
    h: "Why clients choose Frequent Research for CATI",
    l: "Research-grade telephone interviewing, run from our own centre and managed by one project team.",
    p: ["In-house Delhi centre", "Multilingual", "QC & back checks"],
    x: [
      ["building", "In-house CATI capability", "Telephone interviewing runs from our own CATI centre in Delhi."],
      [
        "globe",
        "Multilingual support",
        "Multilingual interviewers, with native-language interviewing where the project requires it.",
      ],
      [
        "users",
        "Complex audience experience",
        "Experience with B2B decision-makers, healthcare professionals and other hard-to-reach respondents.",
      ],
      [
        "shield",
        "Quality-controlled fieldwork",
        "Briefings, mock calls, recordings, QC and back checks built into the process.",
      ],
      [
        "map",
        "Global project experience",
        "Telephone and research projects delivered across multiple international markets.",
      ],
      ["user", "Single point of contact", "Timelines, interviewers and client updates coordinated in one place."],
      ["lock", "Secure infrastructure", "Firewalled VPN, secure FTP and controlled transmission of project files."],
      [
        "timer",
        "Designed for global time zones",
        "Round-the-clock operational availability, scheduled to suit the markets in each study.",
      ],
    ],
  },
  "data-processing-and-analytics": {
    c: "#5A3FE0",
    h: "Why clients choose Frequent Research for Data Processing & Analytics",
    l: "Analysts who understand how the data was collected, because we collected it.",
    p: ["Clean first", "SPSS \xB7 Python \xB7 R", "Dashboards"],
    x: [
      [
        "shield",
        "Cleaning before you see the data",
        "Identity checks, fraud screening and manual cleaning come first, so analysis starts from reliable data.",
      ],
      [
        "edit",
        "Coding frames built with researchers",
        "Open-ended responses coded against frames agreed with the research team.",
      ],
      [
        "sliders",
        "Weighting and tabulation to spec",
        "Tables and weights built to your analysis plan and checked before delivery.",
      ],
      [
        "bars",
        "From tables to drivers",
        "Statistical, driver and segmentation analysis that explains what moves the results.",
      ],
      [
        "monitor",
        "Visualization and dashboards",
        "Charts, dashboards and portals that make large datasets easy to explore.",
      ],
      [
        "layers",
        "Fieldwork and analysis in one team",
        "Because we run the fieldwork too, analysts know every quota, filter and data-quality decision.",
      ],
    ],
  },
  "reporting-and-insights": {
    c: "#C2603F",
    h: "Why clients choose Frequent Research for reporting & insights",
    l: "Reports that tell a story and recommend what to do next.",
    p: ["Story first", "Exec-ready", "Debriefs"],
    x: [
      [
        "file",
        "Story before slides",
        "Findings organised around the business question, not the order of the questionnaire.",
      ],
      ["flag", "Clear recommendations", "Every report connects evidence to implications and practical next steps."],
      [
        "pie",
        "Charts that fit the question",
        "Visuals chosen for clarity, with labels and annotations that explain the point.",
      ],
      ["monitor", "Formats your team will use", "Executive summaries, full reports, dashboards and data tables."],
      [
        "users",
        "Written by the people who ran the study",
        "Researchers who managed the fieldwork interpret the results, so nothing is lost in handover.",
      ],
      ["msg", "Debriefs that drive action", "Presentations and discussion sessions with your stakeholders."],
    ],
  },
};
function WU_Section({ slug, id = "wu" }) {
  const d = WU_DATA[slug];
  const [a, setA] = ee.useState(0);
  if (!d || !d.x) return null;
  return (
    <section
      className="wu"
      id={id}
      style={{
        "--wu": d.c,
      }}
      aria-labelledby={id + "-t"}
    >
      <div className="container wu__in">
        <div className="wu__lead">
          <span className="wu__k">Why us</span>
          <h2 id={id + "-t"}>{d.h}</h2>
          <p>{d.l}</p>
          <ul className="wu__proof">
            {d.p.map((t) => (
              <li key={t}>
                <RC_I n="check" s={13} />
                {t}
              </li>
            ))}
          </ul>
          <div className="wu__focus" key={a} aria-live="polite">
            <span className="wu__fn">0{a + 1}</span>
            <strong>{d.x[a][1]}</strong>
            <p>{d.x[a][2]}</p>
          </div>
        </div>
        <ol className="wu__grid">
          {d.x.map(([ic, t, desc], i) => (
            <li
              key={t}
              className={"wu__card" + (a === i ? " is-on" : "")}
              tabIndex="0"
              onMouseEnter={() => setA(i)}
              onFocus={() => setA(i)}
            >
              <span className="wu__n">0{i + 1}</span>
              <span className="wu__ic">
                <RC_I n={ic} s={20} />
              </span>
              <strong>{t}</strong>
              <span className="wu__d">{desc}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
function WU_Tabs() {
  const tabs = [
    ["Overview", ".ps"],
    ["What's included", ".included"],
    ["How we work", ".process"],
    ["Why us", "#wu"],
    ["FAQ", ".faq"],
    ["Contact", "#enquire"],
  ];
  const [on, setOn] = ee.useState(0);
  ee.useEffect(() => {
    const els = tabs.map(([, s]) => {
      const e = document.querySelector(s);
      return e ? e.closest("section") || e : null;
    });
    const f = () => {
      let k = 0;
      els.forEach((e, i) => {
        if (e && e.getBoundingClientRect().top < window.innerHeight * 0.45) k = i;
      });
      setOn(k);
    };
    window.addEventListener("scroll", f, {
      passive: true,
    });
    f();
    return () => window.removeEventListener("scroll", f);
  }, []);
  const go = (s) => (e) => {
    e.preventDefault();
    const el = document.querySelector(s);
    if (!el) return;
    const sec = el.closest("section") || el,
      bar = e.currentTarget.closest("nav");
    const off = (bar ? bar.getBoundingClientRect().bottom : 140) + 8;
    const reduce =
      window.__frLite === true || (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    window.scrollTo({
      top: sec.getBoundingClientRect().top + window.scrollY - off,
      behavior: reduce ? "auto" : "smooth",
    });
  };
  return (
    <nav className="rc-subnav wu-tabs" aria-label="On this page">
      <div className="container rc-subnav__in">
        {tabs.map(([t, s], i) => (
          <a
            key={t}
            href={s.startsWith("#") ? s : "#"}
            className={(on === i ? "is-on " : "") + (t === "Why us" ? "wu-tabs__why" : "")}
            onClick={go(s)}
          >
            {t}
          </a>
        ))}
      </div>
    </nav>
  );
}
function CATI_Redirect() {
  ee.useEffect(() => {
    const u = "/services/market-research/cati";
    navGo(u, true);
  }, []);
  return null;
}
/* build 79 (Kunal, 9 Nov): the new animated hero on top; the page's own hero is hidden (design79/s79.css, h79-swap) */
function ServicePage() {
  const { vertical, service } = useParams(),
    v = findVertical(vertical),
    n = findService(vertical, service);
  return (
    <>
      {v && n ? <SvcHero79 v={v} n={n} key={n.slug} /> : null}
      {v && n ? <HeroDemote><ServicePageBody /></HeroDemote> : <ServicePageBody />}
    </>
  );
}
function ServicePageBody() {
  const { vertical, service } = useParams(),
    a = findVertical(vertical),
    n = findService(vertical, service);
  const odM = n && n.slug === "online-data-collection",
    cpM = n && n.slug === "consumer-panel",
    bpM = n && n.slug === "business-panel",
    hpM = n && n.slug === "healthcare-panel",
    rdM = n && n.slug === "research-design-cycle",
    dpM = n && n.slug === "data-processing-and-analytics",
    ctM = n && n.slug === "cati",
    ofM = n && n.slug === "offline-data-collection",
    qnM = n && n.slug === "quantitative-research",
    qlM = n && n.slug === "qualitative-research",
    riM = n && n.slug === "reporting-and-insights";
  if (
    (usePageMeta(
      riM
        ? "Market Research Reporting & Insights"
        : qlM
          ? "Qualitative Market Research"
          : qnM
            ? "Quantitative Research Services"
            : ofM
              ? "Face-to-Face Data Collection"
              : ctM
                ? "CATI Services & Telephone Research"
                : dpM
                  ? "Data Processing & Analytics"
                  : rdM
                    ? "Research Design & Methodology"
                    : hpM
                      ? "Healthcare Panel | HCP & Patient Research"
                      : odM
                        ? "Online Data Collection Services | Global Market Research"
                        : cpM
                          ? "Consumer Panel Research & Sampling"
                          : bpM
                            ? "Business Panel: Verified B2B Respondents"
                            : n
                              ? `${n.name} | ${a.name}`
                              : "Not found",
      riM
        ? "Market research reporting from Frequent Research: data analysis, cross-tabs, segmentation, visualization and executive insight for business decisions."
        : qlM
          ? "Qualitative market research using IDIs, focus groups, ethnography and specialist recruitment to uncover motivations, behaviours and customer needs."
          : qnM
            ? "Quantitative research from Frequent Research: survey design, sampling, quality-controlled data collection, analysis and reporting for confident decisions."
            : ofM
              ? "Professional face-to-face data collection using CAPI, PAPI and field interviews for B2B, B2C and healthcare research across diverse locations."
              : ctM
                ? "CATI research services from Frequent Research: multilingual computer-assisted telephone interviewing for B2B, B2C and healthcare audiences, with quality control."
                : dpM
                  ? "Survey data processing and analytics: cleaning, coding, weighting, tabulation, statistical analysis and dashboards that turn research data into decisions."
                  : odM
                    ? "Online data collection services for B2B, B2C and healthcare research: verified panels, targeted recruitment and quality-controlled online market research data."
                    : rdM
                      ? "Our research design cycle connects business questions to qualitative and quantitative methodology, fieldwork, analysis, validation and actionable insights."
                      : hpM
                        ? "Healthcare panel for market research: verified physicians, specialists, nurses, pharmacists, patients and caregivers across 30+ countries. Request feasibility."
                        : bpM
                          ? "Business panel access to 2.85M+ verified professionals and decision-makers across 55+ markets. Check B2B audience feasibility for your research."
                          : cpM
                            ? "Reach profiled consumers in 55+ markets with Frequent Research's consumer panel: targeted sampling, layered quality controls and fast feasibility."
                            : n
                              ? `${n.summary} ${n.includes.join(", ")}.`
                              : undefined,
    ),
    !a || !n)
  )
    return vertical === "accounts-finance" && AF_MOVED[service] ? (
      <AF_Redirect to={"/services/accounts-finance/" + AF_MOVED[service]} />
    ) : vertical === "market-research" && service === "sampling-and-recruitment" ? (
      <CATI_Redirect />
    ) : (
      <NotFoundPage />
    );
  if (a.slug === "market-research" && n.slug === "cati") return <CATI_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "offline-data-collection")
    return <OFC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "quantitative-research") return <QNT_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "qualitative-research") return <QLT_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "reporting-and-insights") return <RPT_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "research-consultancy") return <RC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "online-data-collection") return <OD_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "consumer-panel") return <CP_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "business-panel") return <BP_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "healthcare-panel") return <HP_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "research-design-cycle") return <RDC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "market-research" && n.slug === "data-processing-and-analytics")
    return <DPA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "seo-services") return <SO_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "google-ads-ppc") return <PPC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "social-media-marketing")
    return <SMM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "social-media-advertising")
    return <SMA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "content-marketing") return <CM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "performance-marketing")
    return <PFM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "lead-generation") return <LGN_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "video-marketing") return <VM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "whatsapp-marketing") return <WA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "online-reputation-management")
    return <RM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "marketing-automation") return <MA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "landing-page-and-cro") return <LP_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "influencer-marketing") return <IN_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "email-marketing") return <EM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "e-commerce-marketing") return <EC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "digital-marketing-consulting")
    return <DC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "digital-marketing-audit")
    return <AU_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "digital-analytics-and-reporting")
    return <AN_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "digital-marketing" && n.slug === "b2b-digital-marketing") return <B2_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "website-development") return <WD_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "custom-software-development")
    return <CS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "web-application-development")
    return <WB_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "mobile-app-development") return <MB_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "e-commerce-development") return <ED_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "saas-development") return <SD_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "crm-development") return <CRM_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "erp-development") return <ERP_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "custom-business-applications")
    return <CBA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "ui-ux-design") return <UXD_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "api-development-and-integration")
    return <APX_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "it-consulting") return <ITC_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "application-maintenance-and-support")
    return <AMS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "cloud-and-devops-services")
    return <CDO_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "ai-and-automation-solutions")
    return <AIA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "data-analytics-and-dashboard-development")
    return <DAD_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "software-testing-and-qa") return <QA_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "cybersecurity-services") return <CYB_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "it-development" && n.slug === "website-maintenance-and-support")
    return <WMS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "accounting-and-bookkeeping-services")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "tax-planning-and-advisory")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "income-tax-and-itr-filing")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "gst-services") return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "tds-services") return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "payroll-services") return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "financial-planning-and-advisory")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "business-finance-services")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "startup-and-sme-accounting")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "mis-and-financial-reporting")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "budgeting-and-financial-forecasting")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "audit-and-compliance-support")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "virtual-cfo-services") return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "corporate-finance-advisory")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "investment-planning") return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "due-diligence-and-financial-analysis")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  if (a.slug === "accounts-finance" && n.slug === "accounting-and-finance-consulting")
    return <AFS_Page a={a} n={n} key={n.slug} />;
  const s = a.services.findIndex((o) => o.slug === n.slug),
    i = [1, 2, 3].map((o) => a.services[(s + o) % a.services.length]);
  return (
    <>
      {l.jsxs(PageHero, {
        tone: a.color,
        title: n.name,
        intro: `${n.summary} Delivered by our ${a.name} team, with one point of contact from start to finish.`,
        crumbs: [
          {
            label: "Services",
            to: "/services",
          },
          {
            label: a.name,
            to: `/services/${a.slug}`,
          },
          {
            label: n.name,
          },
        ],
        children: [
          <div className="page-hero__ctas">
            <a className="btn btn--light btn--lg" href="#enquire">
              Get a free consultation
            </a>
            <Link className="btn btn--outline-light btn--lg" to="/lets-talk?type=quote">
              Request a Quote
            </Link>
          </div>,
          <ul className="page-hero__chips">
            {n.includes.map((o) => (
              <li key={o}>
                {"✓ "}
                {o}
              </li>
            ))}
          </ul>,
        ],
      })}
      {a.slug === "market-research" && <WU_Tabs />}
      <section className="section">
        <div className="container ps">
          <div className="ps__col ps__col--problem">
            <h2>The problem</h2>
            <p>{a.problem}</p>
          </div>
          <div className={`ps__col ps__col--solution tone-${a.color}`}>
            <h2>Our solution</h2>
            <p>
              {a.solution}
              {" With "}
              {n.name.toLowerCase()}
              {", that means: "}
              {n.summary.charAt(0).toLowerCase() + n.summary.slice(1)}
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className={`container tone-${a.color}`}>
          <div className="section__head">
            <h2>What's included</h2>
          </div>
          <div className="included">
            {n.includes.map((o, r) => (
              <div className="included__item" key={o}>
                <span aria-hidden="true">✓</span>
                {o}
              </div>
            ))}
          </div>
        </div>
      </section>
      {n.slug in SERVICE_PANELS && (
        <section className="section">
          <div className="container">
            <PanelsSection only={SERVICE_PANELS[n.slug]} />
          </div>
        </section>
      )}
      {l.jsx(ProcessSection, {
        v: a,
      })}
      {a.slug === "market-research" && WU_DATA[n.slug] && WU_DATA[n.slug].x ? (
        <WU_Section slug={n.slug} />
      ) : (
        <WhyUs v={a} serviceName={n.name} />
      )}
      <section className="section">
        <div className="container">
          {l.jsx(TeamCaption, {
            v: a,
            compact: true,
          })}
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2>Industries we support</h2>
          </div>
          <div className="chips">
            {SERVICE_INDUSTRIES.map(findIndustry).map((o) => (
              <Link className="chip chip--ind" to={`/industries-case-studies/${o.slug}`} key={o.slug}>
                <IndustryIcon name={o.icon} size={18} />
                {o.name}
              </Link>
            ))}
            <Link className="chip chip--more" to="/industries-case-studies">
              +{INDUSTRIES.length - SERVICE_INDUSTRIES.length}
              {" more"}
            </Link>
          </div>
        </div>
      </section>
      <section className="section">
        <div className={`container case tone-${a.color}`}>
          <span className="pill">Example engagement</span>
          <h2>How a typical project looks</h2>
          <p className="lead">{a.scenario}</p>
          <Link to="/industries-case-studies" className="btn btn--ghost">
            See case studies
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <h2 className="split__title">{n.name}: frequently asked questions</h2>
          <div className="split__body">
            {l.jsx(FaqList, {
              items: serviceFaqs(a, n),
            })}
          </div>
        </div>
      </section>
      <section className="section section--tight">
        <div className="container">
          {l.jsx(GuideLink, {
            vertical: a.slug,
            service: n.slug,
          })}
        </div>
      </section>
      <section className="section section--tint" id="enquire">
        <div className="container enquire">
          <div className="enquire__intro">
            <h2>
              {"Talk to our "}
              {a.short.toLowerCase()}
              {" team about "}
              {n.name}
            </h2>
            <p>Share a few details and a specialist will reply within one working day.</p>
            <h3>Related services</h3>
            <ul className="related">
              {i.map((o) => (
                <li key={o.slug}>
                  <Link to={`/services/${a.slug}/${o.slug}`}>{o.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-form">
            {l.jsx(EnquiryForm, {
              type: SERVICE_FORM_KEY[a.slug],
              service: `${a.name}: ${n.name}`,
              compact: true,
            })}
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {})}
    </>
  );
}

export { SERVICE_FORM_KEY, SERVICE_INDUSTRIES, ServicePage, WU_DATA, WU_Section, serviceFaqs };
