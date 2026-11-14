import * as ee from 'react';
import { Link } from 'react-router-dom';
import * as l from 'react/jsx-runtime';
import { TrustBadges } from '../data/products.jsx';
import { CtaSection, PageHero } from '../shared/CoreParts.jsx';
import { usePageMeta } from '../SiteApp.jsx';
import { cmsData, cmsList } from '../cms.jsx';

// build 78: company details and every policy can be edited in the super admin (Legal & policies)
const COMPANY = cmsData("legal-company", {
    updated: "1 October 2026",
    company: "Frequent Research Fieldwork Solutions Private Limited",
    address: "Mangolpur Kalan, New Delhi – 110085, India",
    email: "info@frequentresearch.com",
  }),
  LEGAL_PAGES = cmsList("legal", [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      icon: "🔐",
      summary:
        "What information we collect, why we collect it, how we use and protect it, and the choices available to you.",
      intro:
        "At Frequent Research, protecting personal information is an important part of how we conduct research. This policy explains how we handle information when you visit our website, contact us, take part in research, or use one of our research panels.",
      sections: [
        {
          h: "Who we are",
          p: [
            "This website is operated by Frequent Research Fieldwork Solutions Private Limited (“Frequent Research”, “we”, “us”), a market research and data collection company with its office at Mangolpur Kalan, New Delhi – 110085, India.",
            "We also operate the research panels [Turn2Opinion](/portals/turn2opinion), [MyFrequentRewards](/portals/myfrequentrewards) and [MyHealthOpinions](/portals/myhealthopinions). Each panel has its own privacy notice for members, which applies in addition to this policy.",
          ],
        },
        {
          h: "Information we collect",
          p: [
            "The type of information we collect depends on how you interact with us and, for research, on the requirements of the specific project. It may include:",
          ],
          list: [
            "Contact information, such as your name, email address, phone number and organisation, when you submit an enquiry, request a download or apply for a job",
            "Demographic and profile information, such as age group, gender, location, occupation or household details, where relevant to research participation",
            "Survey responses and opinions you share when taking part in research",
            "Professional information, such as role, industry, company size or medical specialty, for B2B and healthcare research",
            "Technical information, such as IP address, device and browser type, and pages visited, collected when you use our website or online surveys",
            "Quality-control information, such as response timing and duplicate-detection signals, used to protect the integrity of research",
          ],
          after: [
            "Some research projects may involve sensitive information, for example about health. Where this is the case, we collect it only when it is necessary for the research, with appropriate notice and consent, and with additional safeguards.",
          ],
        },
        {
          h: "How we collect information",
          list: [
            "Directly from you, when you fill in a form, register for a panel, take a survey, take part in an interview or email us",
            "Automatically, through cookies and similar technologies when you use our website (see our [Cookie Policy](/cookie-policy))",
            "From clients or partners, where a client provides a contact list for a research project and confirms it may lawfully be used for that purpose",
            "From publicly available professional sources, where permitted, for example to identify suitable business respondents",
          ],
        },
        {
          h: "Why we use information",
          p: ["We collect and use information for legitimate purposes such as:"],
          list: [
            "Conducting market research and opinion research",
            "Managing survey participation and research panels",
            "Responding to enquiries and sending requested documents",
            "Recruiting appropriate research participants",
            "Delivering research and data-collection services to clients",
            "Maintaining research quality and preventing duplicate or fraudulent participation",
            "Paying incentives and rewards to research participants",
            "Communicating with clients and research participants",
            "Improving our services and website",
            "Meeting applicable legal, regulatory and contractual requirements",
          ],
          after: [
            "We aim to collect only the information reasonably required for the relevant purpose. We do not sell personal information, and we do not use research participation to sell products to participants.",
          ],
        },
        {
          h: "Legal basis and consent",
          p: [
            "Depending on the activity and the applicable law, we process information on the basis of your consent, to perform a contract or take steps you have requested, to meet legal obligations, or for our legitimate interests in running and improving our research services, balanced against your rights.",
            "Participation in research is voluntary. Where we rely on consent, you can withdraw it at any time. Withdrawal does not affect processing that took place before it.",
          ],
        },
        {
          h: "How we use research information",
          p: [
            "Research data is handled according to the requirements of the specific project. Depending on the methodology, information may be used for statistical analysis, segmentation, reporting, quality control, respondent validation or other research activities agreed with the client.",
            "Research findings are normally reported in an aggregated or anonymised form, so that individual participants are not identified in the results. We do not share identifiable responses with clients unless participants have been told and have agreed, for example for a follow-up interview or where the research method requires it.",
            "Our approach to research data is supported by our broader [Data Protection](/data-protection) and [Research Ethics](/research-ethics) principles.",
          ],
        },
        {
          h: "Sharing information",
          p: ["We share information only where necessary and with appropriate safeguards:"],
          list: [
            "With clients, normally as aggregated or anonymised results",
            "With service providers who help us operate, such as survey platforms, hosting, email, telephony and incentive-payment providers, under confidentiality and data-protection obligations",
            "With fieldwork and research partners engaged for a specific project, under written agreements",
            "Where required by law, regulation or a valid legal request, or to protect the rights, safety or property of participants, clients or Frequent Research",
          ],
        },
        {
          h: "International transfers",
          p: [
            "Some of our research and service providers operate in other countries. Where information is transferred across borders, we take reasonable steps to make sure it remains protected, in line with the applicable law and contractual safeguards.",
          ],
        },
        {
          h: "Information security",
          p: [
            "We take reasonable and appropriate steps to protect information against unauthorised access, misuse, loss, alteration or disclosure. The specific measures applied to a project depend on the nature of the information, the research methodology, client requirements, the technology environment and applicable legal obligations.",
            "For projects involving sensitive or confidential information, security and access requirements are considered as part of the project design. No system is completely secure, but we work to reduce risks and respond promptly to any incident.",
          ],
        },
        {
          h: "How long we keep information",
          p: [
            "We keep personal information only as long as needed for the purpose it was collected for, including legal, accounting, contractual and research-quality requirements. Retention periods are explained in our [Data Protection](/data-protection) policy.",
          ],
        },
        {
          h: "Your rights and choices",
          p: [
            "Depending on where you live and the applicable law, including India’s Digital Personal Data Protection Act, 2023 and, where relevant, the EU and UK GDPR, you may have rights to:",
          ],
          list: [
            "Access information about the personal data we hold about you",
            "Correct inaccurate or incomplete information",
            "Request deletion of your information, subject to legal or contractual exceptions",
            "Withdraw consent where processing is based on consent",
            "Object to or restrict certain processing",
            "Nominate another person to exercise your rights where the law allows",
            "Raise a grievance with us, and complain to the relevant data-protection authority",
          ],
          after: [
            "To exercise these rights, email [info@frequentresearch.com](mailto:info@frequentresearch.com). We may need to verify your identity before acting on a request. Panel members can also update their profile or close their account from their panel dashboard.",
          ],
        },
        {
          h: "Children",
          p: [
            "Our website and panels are intended for adults. We do not knowingly collect personal information from children without verifiable consent from a parent or guardian. Where a research project involves young people, it is designed with appropriate consent processes and additional safeguards.",
          ],
        },
        {
          h: "Marketing communications",
          p: [
            "If you contact us about our services, we may send you information related to your enquiry. You can opt out of non-essential business communications at any time by replying to the email or contacting us. Research invitations to panel members are governed by each panel’s membership terms.",
          ],
        },
        {
          h: "Changes to this policy",
          p: [
            "We may update this policy from time to time. The “last updated” date at the top shows when it was last changed. Significant changes will be highlighted on this website.",
          ],
        },
        {
          h: "Contact and grievances",
          p: [
            "For questions about this policy or how information is handled, contact our Grievance Officer: [Name of Grievance Officer / Data Protection contact], Frequent Research Fieldwork Solutions Private Limited, Mangolpur Kalan, New Delhi – 110085, India. Email: [info@frequentresearch.com](mailto:info@frequentresearch.com).",
            "We aim to acknowledge requests promptly and respond within the time required by applicable law.",
          ],
        },
      ],
    },
    {
      slug: "cookie-policy",
      title: "Cookie Policy",
      icon: "🍪",
      summary: "How our website uses cookies and similar technologies, and how you can control them.",
      intro:
        "Our website may use cookies and similar technologies to provide a reliable browsing experience and understand how visitors interact with our website. This policy explains what they are, how we use them, and the choices you have.",
      sections: [
        {
          h: "What are cookies?",
          p: [
            "Cookies are small data files that can be stored on your device when you visit a website. Similar technologies include local storage, pixels and scripts that perform comparable functions. They help a website remember your actions and preferences and understand how it is used.",
            "Cookies set by the website you are visiting are “first-party” cookies. Cookies set by another service, such as an analytics provider, are “third-party” cookies. Some last only for your visit (“session” cookies), while others remain for a set period (“persistent” cookies).",
          ],
        },
        {
          h: "How we use cookies",
          p: ["Depending on how our website is configured, cookies may be used for purposes such as:"],
          list: [
            "Website functionality and session management",
            "Security, including protecting forms against spam and abuse",
            "Remembering preferences",
            "Analytics and understanding website usage",
            "Performance monitoring",
            "Improving user experience",
          ],
        },
        {
          h: "Types of cookies",
          table: [
            [
              "Strictly necessary",
              "Required for the website to work, such as security and form submission. These cannot be switched off in our systems.",
            ],
            ["Functional", "Remember choices you make, such as preferences, to give you a more consistent experience."],
            [
              "Analytics & performance",
              "Help us understand how visitors use the site, which pages are popular and where improvements are needed. Information is used in aggregate.",
            ],
            [
              "Third-party content",
              "Some features, such as embedded fonts, maps or videos, may be provided by third parties who may set their own cookies under their own policies.",
            ],
          ],
        },
        {
          h: "Cookies in surveys and panels",
          p: [
            "Our online surveys and research panels may use cookies and similar technologies to keep your survey session active, prevent duplicate participation and protect data quality. These are part of providing the research service. Each panel’s own cookie notice gives further detail.",
          ],
        },
        {
          h: "Your choices",
          p: [
            "Where required by law, we will ask for your consent before setting non-essential cookies. You can also control cookies through your browser settings: most browsers let you view, block or delete cookies. Blocking some cookies may affect how the website works.",
            "To learn how to manage cookies in your browser, see your browser’s help pages.",
          ],
        },
        {
          h: "Changes and contact",
          p: [
            "We may update this policy when our website or the technologies we use change. For questions, contact [info@frequentresearch.com](mailto:info@frequentresearch.com). See also our [Privacy Policy](/privacy-policy).",
          ],
        },
      ],
    },
    {
      slug: "terms-conditions",
      title: "Terms & Conditions",
      icon: "📄",
      summary: "The general terms that govern access to and use of the Frequent Research website and its content.",
      intro:
        "These terms govern your access to and use of the Frequent Research website, its content and communications with us. By using this website you agree to these terms. If you do not agree, please do not use the website.",
      sections: [
        {
          h: "About these terms",
          p: [
            "This website is operated by Frequent Research Fieldwork Solutions Private Limited. These terms apply to the website only. Client research engagements are governed by separate agreements, and panel membership is governed by each panel’s own terms.",
          ],
        },
        {
          h: "Use of the website",
          p: ["You agree to use this website lawfully and not to:"],
          list: [
            "Attempt to gain unauthorised access to the website, its servers or connected systems",
            "Introduce malware or interfere with the website’s operation or security",
            "Submit false, misleading or unlawful information through our forms",
            "Use automated tools to scrape or harvest content or data without our written permission",
            "Use the website in any way that could damage our reputation or that of our clients and participants",
          ],
        },
        {
          h: "Content and intellectual property",
          p: [
            "All content on this website, including text, graphics, logos, layouts and documents such as panel books and brochures, is owned by or licensed to Frequent Research and protected by intellectual-property laws. You may view and print content for your own information. You may not copy, modify, republish or use it commercially without our written permission.",
            "The names Frequent Research, Turn2Opinion, MyFrequentRewards, MyHealthOpinions and Sampledge, and related logos, are our trademarks. Certification marks and memberships shown on the website belong to their respective owners.",
          ],
        },
        {
          h: "Information on this website",
          p: [
            "We work to keep information accurate and up to date, but it is provided for general information only. It does not constitute an offer, a proposal or professional advice. Figures, services and capabilities may change, and specific commitments are made only in written proposals or agreements.",
          ],
        },
        {
          h: "Enquiries, downloads and communications",
          p: [
            "When you submit an enquiry or request a document, you confirm the information you provide is accurate and that you are entitled to share it. We will use it as described in our [Privacy Policy](/privacy-policy). Submitting an enquiry does not create a contract.",
          ],
        },
        {
          h: "Client research engagements",
          p: [
            "Individual research projects are governed by separate agreements, statements of work, project specifications or confidentiality provisions. These may define:",
          ],
          list: [
            "Project scope, deliverables and timelines",
            "Responsibilities of each party",
            "Data requirements and data usage",
            "Confidentiality and intellectual property",
            "Research methodology",
            "Payment terms",
            "Project changes, cancellation or termination",
            "Applicable legal requirements",
          ],
          after: [
            "Where a client agreement contains terms that specifically govern a research engagement, those terms apply to that project.",
          ],
        },
        {
          h: "Third-party links",
          p: [
            "This website may link to other websites, including our research panels and partner sites. We are not responsible for the content or practices of third-party websites, which have their own terms and policies.",
          ],
        },
        {
          h: "Limitation of liability",
          p: [
            "To the extent permitted by law, Frequent Research is not liable for any indirect or consequential loss arising from your use of, or inability to use, this website or reliance on its content. Nothing in these terms limits liability that cannot be limited by law.",
          ],
        },
        {
          h: "Changes to these terms",
          p: [
            "We may update these terms from time to time. The version on this page applies when you use the website.",
          ],
        },
        {
          h: "Governing law",
          p: [
            "These terms are governed by the laws of India. Courts in New Delhi have jurisdiction over any dispute arising from them, without prejudice to any mandatory rights you may have.",
          ],
        },
        {
          h: "Contact",
          p: [
            "Questions about these terms can be sent to [info@frequentresearch.com](mailto:info@frequentresearch.com).",
          ],
        },
      ],
    },
    {
      slug: "data-protection",
      title: "Data Protection",
      icon: "🛡️",
      summary: "How we collect, use, store, transfer and retain research and client data responsibly.",
      intro:
        "Data protection is central to responsible research. Research projects can involve information about individuals, organisations, employees, consumers, professionals, patients and businesses. Our approach focuses on collecting, using, storing, transferring and retaining that information responsibly, from the first briefing to the final report.",
      sections: [
        {
          h: "Our principles",
          table: [
            ["Lawful & transparent", "People are told who is collecting their information and why, in clear language."],
            [
              "Purpose limitation",
              "Information is used for the research purpose it was collected for, not for unrelated purposes.",
            ],
            ["Data minimisation", "We collect what the research requires, nothing more."],
            ["Accuracy", "We take reasonable steps to keep information accurate and up to date."],
            ["Storage limitation", "Information is kept only as long as needed."],
            ["Security & confidentiality", "Appropriate technical and organisational measures protect information."],
            ["Accountability", "We document how data is handled and can explain it to clients and participants."],
          ],
        },
        {
          h: "Data minimisation",
          p: [
            "We aim to collect information that is relevant to the research requirement rather than unnecessary personal information. The information required for a general consumer survey may be very different from that needed for a specialised B2B or healthcare project, so each methodology is designed around the specific requirements of the project.",
            "Where possible, we separate contact details from survey responses and use respondent IDs instead of names in datasets.",
          ],
        },
        {
          h: "Access controls",
          p: [
            "Access to project information is limited to people who need it for legitimate project responsibilities. Role-based permissions, secure credentials and access reviews help reduce unnecessary exposure of confidential information.",
          ],
        },
        {
          h: "Security measures",
          p: ["Depending on the project, measures may include:"],
          list: [
            "Encrypted transfer of data files and secure client portals instead of email attachments for sensitive data",
            "Access-controlled storage with logging",
            "Separation of personally identifiable information from response data",
            "Secure configuration of survey platforms and CAPI/CATI devices",
            "Confidentiality agreements with staff, interviewers and partners",
            "Staff training on data protection and information security",
            "Incident response procedures, including notification where required by law",
          ],
          after: [
            "These practices are supported by our information security management system. Certifications are shown on our [About Us](/about-us) page.",
          ],
        },
        {
          h: "Confidentiality",
          p: [
            "Research briefs, questionnaires, datasets, project specifications, participant information and findings may contain commercially or personally sensitive information. We treat confidential project information with appropriate care and use it only for legitimate project purposes. Client identities are not disclosed without permission.",
          ],
        },
        {
          h: "Working with partners and processors",
          p: [
            "Where we work with fieldwork partners, panel providers or technology suppliers, we choose them carefully, share only the data they need, and put written agreements in place covering confidentiality, security and permitted use.",
          ],
        },
        {
          h: "International data transfers",
          p: [
            "Multi-country research may involve transferring data across borders. We take reasonable steps to ensure appropriate safeguards are in place, in line with applicable law and client requirements.",
          ],
        },
        {
          h: "Data retention",
          p: [
            "Information is not retained indefinitely without a legitimate reason. Retention depends on the nature of the project, contractual requirements, legal obligations, research requirements and the type of information involved.",
            "As a general approach, identifiable contact details collected for a single project are deleted or anonymised after the project and any agreed quality-check period ends; anonymised datasets may be retained for longer where agreed with the client; panel member data is retained while the membership is active and for a limited period after closure; and website enquiry data is retained for as long as needed to handle the enquiry and any resulting relationship. Specific periods are agreed per project.",
          ],
        },
        {
          h: "Responsible data handling across the project",
          p: [
            "Our data-protection practices support research integrity at every stage, from initial briefing through fieldwork, quality control, analysis and final reporting. This is especially important in large-scale projects with multiple methodologies, geographies, respondent groups and stakeholders, such as our [Government & Opinion Poll Research](/government-opinion-research).",
          ],
        },
        {
          h: "Requests and incidents",
          p: [
            "Individuals can contact us about their personal data at [info@frequentresearch.com](mailto:info@frequentresearch.com). Clients can request details of the data-protection measures applied to their project. If we become aware of a data incident, we act to contain it, assess the risk and notify affected parties and authorities where required.",
          ],
        },
      ],
    },
    {
      slug: "research-ethics",
      title: "Research Ethics",
      icon: "⚖️",
      summary: "How we treat research participants and protect the integrity of the evidence we produce.",
      intro:
        "Research is ultimately about people. Research quality cannot be measured only by sample size, completion rates or speed. The way participants are treated matters just as much. Our approach is to conduct research responsibly, transparently and respectfully, guided by recognised industry codes such as the ICC/ESOMAR International Code on Market, Opinion and Social Research and Data Analytics.",
      sections: [
        {
          h: "Respect for participants",
          p: [
            "Participants should understand that they are taking part in research and, where appropriate, what the research involves. We avoid misleading participants and communicate research requirements clearly, including the approximate length of the survey or interview.",
          ],
        },
        {
          h: "Voluntary participation and informed consent",
          p: [
            "Participation is voluntary. Participants receive appropriate information before taking part, can skip questions they do not wish to answer and can stop at any time. Consent is obtained in a way that suits the method, whether online, by telephone or in person, and additional consent is sought for audio or video recording, follow-up contact or sharing identifiable information.",
            "Research participation is never obtained through deceptive or coercive practices.",
          ],
        },
        {
          h: "Research is not selling",
          p: [
            "We keep research clearly separate from marketing and sales. We do not use research as a disguise to sell products or services, and we do not use participants’ information for direct marketing of client products.",
          ],
        },
        {
          h: "Participant privacy",
          p: [
            "We take appropriate measures to protect information collected during research. Results shared with clients or used for reporting are presented in line with the agreed methodology and privacy requirements, normally in aggregated or anonymised form. See our [Privacy Policy](/privacy-policy) and [Data Protection](/data-protection) policy.",
          ],
        },
        {
          h: "Avoiding harm",
          p: [
            "Research is designed with reasonable consideration for participant wellbeing, privacy, dignity and expectations. Projects involving potentially sensitive subjects, such as health, finances, politics or personal circumstances, may require additional safeguards depending on the audience, geography, methodology and nature of the research, for example adapted wording, trained interviewers or information about support services.",
          ],
        },
        {
          h: "Vulnerable groups and young people",
          p: [
            "Research with children requires permission from a parent or responsible adult, and research with other potentially vulnerable people is designed with extra care for consent, comprehension and wellbeing.",
          ],
        },
        {
          h: "Healthcare research",
          p: [
            "Healthcare research follows additional requirements. Healthcare professionals are verified before taking part, honoraria are fair and proportionate, and adverse events reported during research are handled according to the client’s pharmacovigilance requirements and applicable rules.",
          ],
        },
        {
          h: "Fair incentives",
          p: [
            "Incentives recognise participants’ time. They are proportionate, clearly explained and paid reliably, and they are not designed to pressure people into taking part.",
          ],
        },
        {
          h: "Neutrality in opinion research",
          p: [
            "In public opinion, political and social research we use neutral, balanced questionnaires and documented methods. We do not design push polls, take political positions or present research findings in a way intended to persuade.",
          ],
        },
        {
          h: "Research integrity",
          p: [
            "Findings should represent the collected evidence accurately. We do not manipulate data, present results misleadingly or draw unsupported conclusions. Where limitations exist, such as sample size, coverage or method, they are recognised when findings are reported.",
          ],
        },
        {
          h: "Raising a concern",
          p: [
            "If you have a concern about how research was conducted, contact [info@frequentresearch.com](mailto:info@frequentresearch.com). Every concern is reviewed and answered.",
          ],
        },
      ],
    },
  ], "slug");
const RESEARCH_STAGES = [
    "Research Objective",
    "Methodology",
    "Sample Design",
    "Questionnaire",
    "Recruitment",
    "Fieldwork",
    "Quality Control",
    "Data Processing",
    "Analysis",
    "Reporting",
  ],
  QUALITY_CONTROLS = [
    "Sample management",
    "Respondent screening",
    "Data validation",
    "Duplicate detection",
    "Quality checks",
    "Questionnaire management",
    "Fieldwork monitoring",
    "Secure data handling",
    "Data cleaning",
    "Reporting",
  ],
  BRIEF_QUESTIONS = [
    "What is being measured",
    "Who is being researched",
    "How respondents are recruited",
    "Which methodology is being used",
    "How data quality is assessed",
    "What limitations may exist",
    "How findings are interpreted",
  ],
  PRIVACY_SERVICE_LINKS = [
    ["Market Research", "/services/market-research"],
    ["Consumer Research", "/services/market-research/consumer-panel"],
    ["B2B Research", "/services/market-research/business-panel"],
    ["Healthcare Research", "/services/market-research/healthcare-panel"],
    ["Online Surveys", "/services/market-research/online-data-collection"],
    ["CATI & Face-to-Face Research", "/services/market-research/offline-data-collection"],
    ["CATI", "/services/market-research/cati"],
  ];
function PrivacyPage() {
  usePageMeta(
    "Privacy, Data Protection & Research Ethics",
    "How Frequent Research approaches privacy, cookies, data protection, terms of use and research ethics.",
  );
  return (
    <>
      {l.jsx(PageHero, {
        title: "Privacy, data protection & research ethics",
        crumbs: [
          {
            label: "Privacy & Research Ethics",
          },
        ],
        intro:
          "At Frequent Research, we believe good research starts with trust. Whether we are running an online survey, managing large-scale data collection, reaching specialised respondents or supporting a complex public opinion study, we handle the information shared by respondents and clients responsibly.",
        children: (
          <p className="policy-updated">
            {"Last updated: "}
            {COMPANY.updated}
          </p>
        ),
      })}
      <section className="section">
        <div className="container">
          <div className="section__head">
            <h2>Our policies</h2>
            <p>
              Our approach is built around transparency, responsible research practices, appropriate security measures,
              and respect for the people who take part in research.
            </p>
          </div>
          <div className="policy-cards">
            {LEGAL_PAGES.map((t) => (
              <Link to={`/${t.slug}`} className="policy-card" key={t.slug}>
                <span className="policy-card__icon" aria-hidden="true">
                  {t.icon}
                </span>
                <h3>{t.title}</h3>
                <p>{t.summary}</p>
                <span className="svc-card__link">
                  {"Read the "}
                  {t.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container">
          <div className="section__head">
            <h2>Responsible research at every stage</h2>
            <p>
              Responsible research doesn't begin when the first response is collected. It starts with understanding the
              research objective, and continues through every stage after it.
            </p>
          </div>
          <ol className="flow flow--light">
            {RESEARCH_STAGES.map((t, e) => (
              <li key={t}>
                <span>{e + 1}</span>
                {t}
              </li>
            ))}
          </ol>
          <p className="muted">These principles apply across our research capabilities:</p>
          <div className="related-links">
            {PRIVACY_SERVICE_LINKS.map(([t, e]) => (
              <Link to={e} key={t}>
                {t}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <h2 className="split__title">Privacy in large-scale research</h2>
          <div className="split__body">
            <p className="lead">
              Large programmes can involve thousands of respondents across cities, regions, demographic groups and
              professional segments. Managing research at this scale takes more than collecting responses.
            </p>
            <ul className="chips-list">
              {QUALITY_CONTROLS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>
              {
                "Our objective is to combine operational scale with responsible research practice. For citizen research, public opinion, government-related surveys, beneficiary research and policy studies, see our "
              }
              <Link to="/government-opinion-research">Government & Opinion Poll Research</Link>
              {" capabilities."}
            </p>
          </div>
        </div>
      </section>
      <section className="section section--tint">
        <div className="container split">
          <h2 className="split__title">Transparency matters</h2>
          <div className="split__body">
            <p className="lead">
              Clients should understand how their research is being conducted. Findings are most useful when the method
              behind them is understood.
            </p>
            <ul className="ticks">
              {BRIEF_QUESTIONS.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p>
              This applies whether a project involves a small specialist audience or a large population-level study.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container split">
          <h2 className="split__title">Certified and accountable</h2>
          <div className="split__body">
            <p>
              Our management systems for market research, quality and information security are certified, and we are a
              corporate member of ESOMAR.
            </p>
            <TrustBadges withEsomar={true} />
          </div>
        </div>
      </section>
      {l.jsx(CtaSection, {
        title: "Questions about privacy or data protection?",
        text: "If you have a question about how Frequent Research handles information, cookies, research participation or project data, our team is happy to help. Our goal is simple: useful research insights, with data, clients and participants treated with the care they deserve.",
        primary: {
          to: "/lets-talk",
          label: "Contact Us",
        },
        secondary: {
          to: "/privacy-policy",
          label: "Read the Privacy Policy",
        },
      })}
    </>
  );
}

export { COMPANY, LEGAL_PAGES, PrivacyPage };
