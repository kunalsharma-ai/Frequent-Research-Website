import * as ee from 'react';
import { VERTICALS } from './site.jsx';
import { ASSOCIATIONS, BR_Assoc, BR_Cert, BR_Esomar, BR_Msme } from '../shared/Brand.jsx';

import { cmsData, cmsList } from '../cms.jsx';

const findVertical = (t) => VERTICALS.find((e) => e.slug === t),
  PRODUCTS = [
    {
      slug: "sampledge",
      name: "Sampledge",
      tagline: "Research project management, simplified.",
      intro:
        "Sampledge brings research project workflows, sample management and day-to-day operations into one smart digital workspace.",
      sections: {
        "Key capabilities": [
          "Project and quota tracking in one place",
          "Sample supplier management",
          "Live fieldwork status",
          "Respondent and incentive records",
          "Automated reports for clients",
        ],
        "How it works": [
          "Create a project and set quotas",
          "Connect sample sources and surveys",
          "Monitor completes and quality live",
          "Close, reconcile and report",
        ],
        "Who it's for": [
          "Market research agencies",
          "Fieldwork companies",
          "Panel companies",
          "In-house insights teams",
        ],
        "Use cases": [
          "Multi-country tracking studies",
          "B2B and healthcare projects with tight quotas",
          "Managing several sample vendors",
          "Client reporting without spreadsheets",
        ],
      },
      cta: "Request a Sampledge demo",
    },
    {
      slug: "panel-audience-marketplace",
      name: "SampAudience",
      tagline: "Find the right audience for your research.",
      intro:
        "Connect with relevant consumer, B2B and healthcare audiences for research recruitment and sample requirements, and build projects around the people who matter to your business.",
      sections: {
        "Find your audience": ["Consumer audiences", "B2B audiences", "Healthcare audiences"],
        "Audience targeting": [
          "Demographics and location",
          "Job role, industry and company size",
          "Medical specialty and experience",
          "Purchase behaviour and category usage",
        ],
        Feasibility: [
          "Fast feasibility checks",
          "Incidence and cost estimates",
          "Multi-country availability",
          "Quota recommendations",
        ],
      },
      cta: "Request audience feasibility",
    },
  ],
  VERTICAL_DETAILS = {
    "market-research": {
      timeline:
        "Most online studies run in one to three weeks. Multi-country, B2B or healthcare projects usually take three to six weeks, depending on audience and sample size",
      whyChoose: [
        {
          t: "Our own panels",
          d: "Consumer, business and healthcare panels give us faster, more reliable access to the right respondents.",
        },
        {
          t: "Fieldwork in 55+ markets",
          d: "One partner for multi-country studies, with local partners we have vetted and worked with before.",
        },
        {
          t: "Quality before speed",
          d: "Identity checks, fraud screening and manual cleaning on every project, not just when asked.",
        },
        {
          t: "Honest feasibility",
          d: "We tell you upfront if an audience is hard to reach and suggest a realistic plan.",
        },
        {
          t: "One named contact",
          d: "A single point of contact from brief to debrief, with daily fieldwork updates.",
        },
        {
          t: "Technology built in-house",
          d: "Sampledge keeps quotas, suppliers and progress visible in real time.",
        },
      ],
      team: {
        summary:
          "Researchers, panel managers, programmers, field supervisors and analysts who have run studies across consumer, B2B and healthcare audiences.",
        roles: [
          "Research consultants",
          "Panel & sampling managers",
          "Survey programmers",
          "Field supervisors & moderators",
          "Data processing & analytics specialists",
        ],
        skills: [
          "Questionnaire & study design",
          "Quota & sampling plans",
          "CATI, CAPI & online fieldwork",
          "Qualitative moderation",
          "Weighting, tabulation & statistics",
          "Insight storytelling",
        ],
        tools: [
          "Sampledge",
          "Decipher / Confirmit-style survey platforms",
          "SPSS & Q",
          "Python & R",
          "Power BI",
          "Dashboards & portals",
        ],
      },
    },
    "digital-marketing": {
      timeline:
        "Paid campaigns can go live within one to two weeks. SEO and content usually show meaningful results within three to six months",
      whyChoose: [
        {
          t: "Research-led strategy",
          d: "Our plans start with real audience and competitor research, not guesswork.",
        },
        {
          t: "Focus on leads and revenue",
          d: "We report on enquiries, cost per lead and return, not just clicks and likes.",
        },
        {
          t: "Specialist for every channel",
          d: "SEO, ads, social, content and automation experts work as one team for you.",
        },
        {
          t: "Transparent reporting",
          d: "Short monthly reports in plain language, with clear next steps.",
        },
        {
          t: "You own everything",
          d: "Ad accounts, analytics, content and creatives always belong to you.",
        },
        {
          t: "No long lock-ins",
          d: "We earn your business every month with results, not contracts.",
        },
      ],
      team: {
        summary:
          "Strategists, SEO specialists, paid media managers, designers, writers and analysts working to one growth plan.",
        roles: [
          "Digital strategists",
          "SEO specialists",
          "Paid media managers",
          "Social media managers",
          "Content writers & designers",
          "Marketing analysts",
        ],
        skills: [
          "Keyword & audience research",
          "Technical & local SEO",
          "Search & social advertising",
          "Conversion rate optimisation",
          "Marketing automation",
          "Attribution & reporting",
        ],
        tools: [
          "Google Ads",
          "Meta & LinkedIn Ads",
          "GA4 & Tag Manager",
          "Search Console",
          "Semrush / Ahrefs",
          "HubSpot & email platforms",
        ],
      },
    },
    "it-development": {
      timeline:
        "A business website typically takes four to eight weeks. Web apps, mobile apps and custom software usually take two to six months, delivered in phases",
      whyChoose: [
        {
          t: "Business-first thinking",
          d: "We start with your process and users, then choose the technology.",
        },
        {
          t: "Visible progress",
          d: "Short sprints with regular demos, so you always see what has been built.",
        },
        {
          t: "Modern, secure stack",
          d: "Scalable architecture, security best practices and fast performance from day one.",
        },
        {
          t: "You own the code",
          d: "Source code, designs and documentation are handed over to you.",
        },
        {
          t: "Testing built in",
          d: "Dedicated QA before every release, not as an afterthought.",
        },
        {
          t: "Support after launch",
          d: "Maintenance plans keep your product updated, safe and improving.",
        },
      ],
      team: {
        summary:
          "Product managers, designers, frontend, backend and mobile engineers, QA and DevOps specialists who build and support business software.",
        roles: [
          "Solution architects",
          "Project & product managers",
          "UI/UX designers",
          "Frontend & backend developers",
          "Mobile app developers",
          "QA & DevOps engineers",
        ],
        skills: [
          "Requirement analysis",
          "UI/UX & design systems",
          "Web, mobile & SaaS development",
          "API & system integration",
          "Cloud & CI/CD",
          "AI & automation",
        ],
        tools: ["React & Next.js", "Node.js", "PHP / Laravel", "Python", "Flutter & React Native", "AWS, Azure & GCP"],
      },
    },
    "accounts-finance": {
      timeline:
        "Onboarding usually takes one to two weeks. Clean-up of old books depends on volume, typically two to six weeks, after which work runs on a monthly cycle",
      whyChoose: [
        {
          t: "Deadlines never missed",
          d: "A compliance calendar for GST, TDS, payroll and returns, tracked every month.",
        },
        {
          t: "Reports you can read",
          d: "Monthly MIS that tells you what happened and what to do next.",
        },
        {
          t: "Experienced professionals",
          d: "Accountants and finance advisers who work with startups, SMEs and larger businesses.",
        },
        {
          t: "Confidential & secure",
          d: "Limited access, secure storage and signed confidentiality agreements.",
        },
        {
          t: "Lower cost than in-house",
          d: "A complete finance function for less than hiring a full team.",
        },
        {
          t: "Growth-ready books",
          d: "Investor and audit-ready accounts whenever you need them.",
        },
      ],
      team: {
        summary:
          "Accountants, tax and compliance specialists, payroll experts and finance advisers who keep books accurate and decisions informed.",
        roles: [
          "Chartered accountants & advisers",
          "Bookkeeping executives",
          "Tax & GST specialists",
          "Payroll specialists",
          "Financial analysts",
          "Virtual CFOs",
        ],
        skills: [
          "Bookkeeping & reconciliation",
          "GST, TDS & income tax",
          "Payroll & statutory compliance",
          "MIS & financial reporting",
          "Budgeting & forecasting",
          "Valuation & financial modelling",
        ],
        tools: [
          "Tally Prime",
          "Zoho Books",
          "QuickBooks & Xero",
          "Excel & financial models",
          "GST & TDS portals",
          "Power BI",
        ],
      },
    },
  };
VERTICALS.forEach((t) => Object.assign(t, VERTICAL_DETAILS[t.slug]));
const TESTIMONIALS = cmsList("testimonials", [
    {
      quote:
        "They recruited a hard-to-reach panel of hospital procurement heads in three countries, inside our timeline. The data was clean the first time, which almost never happens.",
      name: "Sarah Mitchell",
      role: "Head of Insights, Global healthcare company",
      vertical: "market-research",
      rating: 5,
    },
    {
      quote:
        "Our organic enquiries roughly doubled in six months. More importantly, the leads were the right size of company. The monthly reports are short and honest.",
      name: "James Anderson",
      role: "Marketing Director, B2B manufacturing firm",
      vertical: "digital-marketing",
      rating: 5,
    },
    {
      quote:
        "They rebuilt our field operations app and connected it to our CRM. Our team stopped re-typing data, and managers finally see the numbers on the same day.",
      name: "Daniel Hughes",
      role: "COO, Services company",
      vertical: "it-development",
      rating: 5,
    },
    {
      quote:
        "Having a virtual CFO changed how we run board meetings. GST, TDS and payroll are handled on time, and the monthly MIS tells us what to fix next.",
      name: "Emily Carter",
      role: "Founder, D2C startup",
      vertical: "accounts-finance",
      rating: 5,
    },
    {
      quote:
        "We used their research to size the opportunity and their digital team to launch it. One partner, one plan, and nothing lost between agencies.",
      name: "Michael Turner",
      role: "Strategy Lead, Consumer brand",
      vertical: "digital-marketing",
      rating: 5,
    },
  ], "name"),
  CAREERS = cmsData("careers", {
    departments: [
      "Market Research",
      "Sales & Business Development",
      "Digital Marketing",
      "IT & Development",
      "Project Management",
      "Accounts & Finance",
    ],
    reasons: [
      {
        title: "Work across disciplines",
        text: "Sit next to researchers, marketers, engineers and finance people. You will learn faster than in a single-function agency.",
      },
      {
        title: "Real responsibility early",
        text: "You will own client work, not just watch it. We give people room to try, and support when it goes wrong.",
      },
      {
        title: "Projects with a global reach",
        text: "Our research runs in 55+ markets. Your work will be seen by clients in many countries.",
      },
      {
        title: "People who stay",
        text: "We promote from within and keep teams stable, because clients notice when the same people know their business.",
      },
    ],
  }),
  CERTIFICATIONS = cmsList("certifications", [
    {
      code: "ISO 20252:2019",
      title: "Market, opinion & social research",
      file: "/badges/iso-20252.png",
    },
    {
      code: "ISO 9001:2015",
      title: "Quality management systems",
      file: "/badges/iso-9001.png",
    },
    {
      code: "ISO/IEC 27001:2013",
      title: "Information security management",
      file: "/badges/iso-27001.png",
    },
  ], "code"),
  DOWNLOADS = cmsList("downloads", [
    {
      key: "consumer-panel-book",
      title: "Consumer Panel Book",
      d: "Profiles, demographics and targeting options across our consumer panels.",
      icon: "👥",
      file: "Consumer-Panel-Book.pdf",
    },
    {
      key: "business-panel-book",
      title: "Business Panel Book",
      d: "B2B audiences by role, seniority, industry and company size.",
      icon: "💼",
      file: "Business-Panel-Book.pdf",
    },
    {
      key: "healthcare-panel-book",
      title: "Healthcare Panel Book",
      d: "Healthcare professionals, patients and caregivers by specialty and condition.",
      icon: "🩺",
      file: "Healthcare-Panel-Book.pdf",
    },
    {
      key: "company-brochure",
      title: "Company Brochure",
      d: "An overview of Frequent Research: services, products, panels and teams.",
      icon: "📘",
      file: "Frequent-Research-Brochure.pdf",
    },
    {
      key: "quality-process",
      title: "Quality Process",
      d: "How we protect data quality from recruitment to reporting.",
      icon: "✅",
      file: "Quality-Process.pdf",
    },
  ], "key");
function CertBadge({ c, dark }) {
  return <BR_Cert c={c} dark={dark} />;
}
function EsomarBadge({ dark }) {
  return <BR_Esomar dark={dark} />;
}
function TrustBadges({ dark = false, withEsomar = false }) {
  return (
    <div className={`badges ${dark ? "badges--dark" : ""}`}>
      {CERTIFICATIONS.map((a) => (
        <CertBadge c={a} dark={dark} key={a.code} />
      ))}
      {withEsomar && ASSOCIATIONS.map((a) => <BR_Assoc a={a} dark={dark} key={a.id} />)}
    </div>
  );
}

export { CAREERS, CERTIFICATIONS, CertBadge, DOWNLOADS, EsomarBadge, PRODUCTS, TESTIMONIALS, TrustBadges, findVertical };
