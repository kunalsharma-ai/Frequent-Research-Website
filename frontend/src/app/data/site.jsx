import { cmsData, cmsList } from '../cms.jsx';
const slugify = (t) =>
    t
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, ""),
  serviceItem = (t, e, a) => ({
    name: t,
    slug: slugify(t),
    summary: e,
    includes: a,
  }),
  VERTICALS = [
    {
      slug: "market-research",
      name: "Market Research",
      short: "Research",
      color: "research",
      icon: "🔎",
      flow: ["Data", "Research", "Insights"],
      headline: "Turn questions into business insights",
      intro:
        "Good decisions start with good information. We help organisations understand what people think, what they need, what they buy and why, across B2C, B2B and healthcare audiences.",
      card: "Understand markets, customers, competitors and opportunities through reliable research and actionable insights.",
      problem:
        "Most research goes wrong before the first question is asked: the objective is vague, the sample is wrong, or the field partner cuts corners. The result is data you cannot defend in a boardroom.",
      solution:
        "We design the study around the decision you need to make, recruit the right respondents, control quality at every stage of fieldwork, and hand you findings you can act on.",
      process: [
        {
          t: "Understand",
          d: "We clarify the business decision, audience and constraints with you.",
        },
        {
          t: "Design",
          d: "Methodology, questionnaire or discussion guide, and quotas.",
        },
        {
          t: "Sample",
          d: "Feasibility check and recruitment from verified panels and partners.",
        },
        {
          t: "Collect",
          d: "Online, CATI, face-to-face or qualitative fieldwork with live monitoring.",
        },
        {
          t: "Process",
          d: "Cleaning, coding, weighting and quality checks.",
        },
        {
          t: "Analyze",
          d: "Tables, statistics and the story behind the numbers.",
        },
        {
          t: "Deliver insights",
          d: "Clear reports and a debrief focused on what to do next.",
        },
      ],
      benefits: [
        "Respondents who genuinely match your target audience",
        "Fieldwork coverage across 55+ markets",
        "Quality checks for speeders, straight-liners and duplicates",
        "One point of contact from brief to debrief",
        "Feasibility and costs before you commit",
      ],
      faqs: [
        {
          q: "How quickly can you share feasibility and a cost estimate?",
          a: "For most online studies we come back within one working day. Complex B2B or healthcare audiences can take two to three days because we check real availability with panels first.",
        },
        {
          q: "Can you work as a fieldwork partner for research agencies?",
          a: "Yes. Many of our projects are white-label fieldwork, sample and data processing for agencies and consultancies.",
        },
        {
          q: "How do you protect data quality?",
          a: "We use identity checks, digital fingerprinting, attention checks, open-end review and manual cleaning. Bad completes are removed before you see the data.",
        },
        {
          q: "Which countries can you cover?",
          a: "We run research across 55+ markets through our own panels and vetted local partners. Tell us your markets and we will confirm feasibility.",
        },
      ],
      scenario:
        "A medical devices brand needed feedback from cardiologists in four countries within three weeks. We confirmed feasibility in 48 hours, ran a mixed online and telephone approach, and delivered cleaned data with country-level tables on time.",
      services: [
        serviceItem(
          "Research Consultancy",
          "Expert guidance to frame the right questions and choose the right method.",
          [
            "Market intelligence",
            "Consumer and customer insights",
            "Market sizing and competitive intelligence",
            "Brand and product research",
          ],
        ),
        serviceItem(
          "Research Design Cycle",
          "A disciplined seven-step cycle from understanding your brief to delivering insights.",
          [
            "Objective and hypothesis setting",
            "Questionnaire and guide design",
            "Sampling plan and quotas",
            "Analysis plan agreed upfront",
          ],
        ),
        serviceItem("Online Data Collection", "Fast, scalable online surveys with strict quality controls.", [
          "Survey programming and hosting",
          "Panel sample across 55+ markets",
          "Real-time quota monitoring",
          "Fraud and quality screening",
        ]),
        serviceItem(
          "Offline Data Collection",
          "Face-to-face fieldwork with CAPI and PAPI interviews, for audiences best reached in person.",
          [
            "CAPI and PAPI interviews",
            "In-home and intercept interviews",
            "Central location tests",
            "Urban, semi-urban and rural fieldwork",
          ],
        ),
        serviceItem("Consumer Panel", "Profiled consumers ready to share opinions on products, brands and habits.", [
          "Demographic and lifestyle profiling",
          "Category users and buyers",
          "Mobile-first survey experience",
          "Fast turnaround for trackers",
        ]),
        serviceItem("Business Panel", "Verified decision-makers across functions, company sizes and industries.", [
          "IT and technology decision-makers",
          "C-suite and senior managers",
          "SME owners",
          "Function-specific professionals",
        ]),
        serviceItem("Healthcare Panel", "Physicians, specialists, pharmacists and patients for healthcare research.", [
          "General practitioners and specialists",
          "Nurses, pharmacists and hospital staff",
          "Patients and caregivers",
          "Compliant recruitment and incentives",
        ]),
        serviceItem("Qualitative Research", "Conversations that reveal the why behind behaviour.", [
          "In-depth interviews",
          "Focus groups, online and in person",
          "Ethnography and home visits",
          "Recruitment, moderation and transcripts",
        ]),
        serviceItem("Quantitative Research", "Statistically robust surveys that measure and size what matters.", [
          "Usage and attitude studies",
          "Brand tracking",
          "Concept and product testing",
          "Pricing and conjoint research",
        ]),
        {
          ...serviceItem(
            "CATI — Computer-Assisted Telephone Interviewing",
            "Structured telephone research, multilingual interviewing and quality-controlled data collection for B2C, B2B and healthcare audiences.",
            [
              "B2C, B2B and healthcare telephone interviews",
              "Multilingual interviewing",
              "Briefings, mock calls and recordings",
              "Quality control and back checks",
            ],
          ),
          slug: "cati",
        },
        serviceItem("Data Processing & Analytics", "Clean, coded and analysed data, ready for decisions.", [
          "Data cleaning and validation",
          "Open-end coding",
          "Weighting and tabulation",
          "Statistical and driver analysis",
        ]),
        serviceItem("Reporting & Insights", "Clear reports that tell a story and recommend a next step.", [
          "Executive summaries",
          "Interactive dashboards",
          "Presentation-ready charts",
          "Debrief workshops",
        ]),
      ],
    },
    {
      slug: "digital-marketing",
      name: "Digital Marketing",
      short: "Digital",
      color: "digital",
      icon: "📈",
      flow: ["Visibility", "Leads", "Growth"],
      headline: "Get found. Get chosen. Get results.",
      intro:
        "Your customers are already searching, scrolling, comparing and buying online. We help you become visible to the right audience and turn that attention into measurable growth.",
      card: "Build visibility, attract qualified audiences, generate leads and turn digital traffic into measurable growth.",
      problem:
        "Many businesses spend on ads, posts and SEO without a clear link to revenue. Traffic goes up, but enquiries do not, and nobody can say which channel is actually working.",
      solution:
        "We start with research into your audience and competitors, build a connected plan across search, social, content and conversion, and report on leads and revenue, not vanity metrics.",
      process: [
        {
          t: "Audit",
          d: "We review your website, channels, tracking and competitors.",
        },
        {
          t: "Strategy",
          d: "Audience, positioning, channels, budget and targets.",
        },
        {
          t: "Launch",
          d: "Campaigns, content and landing pages go live.",
        },
        {
          t: "Optimise",
          d: "Weekly testing of creatives, keywords and pages.",
        },
        {
          t: "Report",
          d: "Plain-language monthly reports tied to leads and sales.",
        },
      ],
      benefits: [
        "Strategy backed by real audience research",
        "Full-funnel approach, from first search to signed deal",
        "Transparent reporting on cost per lead and ROI",
        "No long lock-in contracts",
        "Specialists for each channel, one point of contact",
      ],
      faqs: [
        {
          q: "How long does SEO take to show results?",
          a: "Usually three to six months for meaningful movement, depending on competition and your site’s starting point. Paid search can bring enquiries within days.",
        },
        {
          q: "Do you guarantee first position on Google?",
          a: "No honest agency can. We commit to a clear plan, quality work and transparent reporting, and we show you progress every month.",
        },
        {
          q: "What budget do we need?",
          a: "It depends on your goals and market. We will recommend a starting budget after the audit and scale it as results come in.",
        },
        {
          q: "Will we own our ad accounts and content?",
          a: "Yes. Ad accounts, analytics, content and creatives belong to you.",
        },
      ],
      scenario:
        "An industrial equipment supplier was getting traffic but few enquiries. We rebuilt its key landing pages, focused Google Ads on high-intent terms, and added LinkedIn retargeting. Qualified enquiries rose steadily over the next two quarters.",
      services: [
        serviceItem("SEO Services", "Rank for the searches your customers actually make.", [
          "Keyword and competitor research",
          "On-page and technical SEO",
          "Content planning",
          "Link earning and local SEO",
        ]),
        serviceItem("Google Ads / PPC", "Paid search campaigns that bring ready-to-buy visitors.", [
          "Search, Display and Performance Max",
          "Keyword and bid strategy",
          "Ad copy testing",
          "Conversion tracking",
        ]),
        serviceItem("Social Media Marketing", "Consistent, on-brand social presence that builds trust.", [
          "Content calendars",
          "Creative design and copy",
          "Community management",
          "Monthly performance review",
        ]),
        serviceItem("Social Media Advertising", "Targeted paid campaigns on Meta, LinkedIn and more.", [
          "Audience targeting",
          "Creative and video ads",
          "Retargeting funnels",
          "Budget optimisation",
        ]),
        serviceItem("Content Marketing", "Useful content that earns attention and search traffic.", [
          "Blogs and guides",
          "Whitepapers and case studies",
          "Content strategy",
          "Editorial calendar",
        ]),
        serviceItem("Performance Marketing", "Campaigns optimised for leads, sales and return on spend.", [
          "Multi-channel media buying",
          "CAC and ROAS tracking",
          "Creative testing",
          "Attribution setup",
        ]),
        serviceItem("Lead Generation", "A steady flow of qualified enquiries for your sales team.", [
          "Lead magnets and landing pages",
          "Paid and organic lead campaigns",
          "Lead scoring",
          "CRM integration",
        ]),
        serviceItem("B2B Digital Marketing", "Reach and persuade business buyers with long sales cycles.", [
          "Account-based marketing",
          "LinkedIn campaigns",
          "Thought-leadership content",
          "Sales enablement assets",
        ]),
        serviceItem("Email Marketing", "Emails people open, read and act on.", [
          "Newsletters",
          "Automated nurture journeys",
          "List segmentation",
          "Deliverability checks",
        ]),
        serviceItem("WhatsApp Marketing", "Reach customers on the app they check most.", [
          "WhatsApp Business API setup",
          "Broadcast campaigns",
          "Chatbots and quick replies",
          "Opt-in management",
        ]),
        serviceItem("Influencer Marketing", "Partner with creators your audience already trusts.", [
          "Creator discovery",
          "Campaign briefs",
          "Contracts and coordination",
          "Reach and sales tracking",
        ]),
        serviceItem("Video Marketing", "Short and long-form video that explains and sells.", [
          "Concept and scripting",
          "Production and editing",
          "Reels and YouTube",
          "Video ads",
        ]),
        serviceItem("E-commerce Marketing", "More traffic, better conversion and repeat purchases.", [
          "Marketplace and store SEO",
          "Shopping ads",
          "Retention campaigns",
          "Product page optimisation",
        ]),
        serviceItem("Landing Page & CRO", "Pages designed to turn visitors into enquiries.", [
          "Landing page design",
          "A/B testing",
          "Heatmaps and user recordings",
          "Form optimisation",
        ]),
        serviceItem("Digital Marketing Consulting", "Senior advice to shape your plan and in-house team.", [
          "Channel strategy",
          "Budget planning",
          "Team and agency review",
          "Quarterly roadmaps",
        ]),
        serviceItem("Online Reputation Management", "Protect and strengthen how your brand appears online.", [
          "Review generation and response",
          "Brand monitoring",
          "Search result management",
          "Crisis response",
        ]),
        serviceItem("Marketing Automation", "Workflows that nurture leads while your team sleeps.", [
          "Automation platform setup",
          "Lead nurturing journeys",
          "CRM and email sync",
          "Lead scoring rules",
        ]),
        serviceItem("Digital Analytics & Reporting", "Know which channel brings which customer.", [
          "GA4 and Tag Manager setup",
          "Conversion tracking",
          "Dashboards",
          "Monthly insights",
        ]),
        serviceItem("Digital Marketing Audit", "A clear, honest review of what works and what to fix.", [
          "Website and SEO audit",
          "Ads account audit",
          "Tracking audit",
          "Prioritised action plan",
        ]),
      ],
    },
    {
      slug: "it-development",
      name: "IT & Development",
      short: "Technology",
      color: "tech",
      icon: "💻",
      flow: ["Technology", "Automation", "Scale"],
      headline: "Build technology that works for your business",
      intro:
        "Technology should solve problems, not create more of them. We design and build websites, software, apps, SaaS platforms, dashboards and AI solutions around how your business really runs.",
      card: "Design and build websites, software, mobile apps, SaaS platforms, dashboards, AI solutions and business applications.",
      problem:
        "Software projects often fail because requirements are unclear, the team disappears after launch, or the product is built for developers instead of the people who use it every day.",
      solution:
        "We begin by understanding your process and users, build in short visible milestones, test thoroughly, and stay on to maintain and improve what we have built.",
      process: [
        {
          t: "Discover",
          d: "Workshops to map users, processes and requirements.",
        },
        {
          t: "Design",
          d: "Wireframes, UI design and technical architecture.",
        },
        {
          t: "Build",
          d: "Development in short sprints with regular demos.",
        },
        {
          t: "Test",
          d: "Functional, performance and security testing.",
        },
        {
          t: "Launch",
          d: "Deployment, training and handover.",
        },
        {
          t: "Support",
          d: "Maintenance, monitoring and improvements.",
        },
      ],
      benefits: [
        "Business-first thinking, not just code",
        "Fixed milestones and regular demos",
        "Modern, secure and scalable technology",
        "You own the source code",
        "Ongoing support after launch",
      ],
      faqs: [
        {
          q: "How much does a website or app cost?",
          a: "It depends on features, integrations and design. After a short discovery call we share a fixed quote or a phased estimate.",
        },
        {
          q: "Which technologies do you use?",
          a: "We choose what fits the job, commonly React, Next.js, Node.js, PHP/Laravel, Python, Flutter and React Native, on AWS, Azure or Google Cloud.",
        },
        {
          q: "Will we own the code?",
          a: "Yes. On final payment, the source code and project assets are yours.",
        },
        {
          q: "Do you provide support after launch?",
          a: "Yes. We offer monthly maintenance plans covering updates, backups, security fixes and small improvements.",
        },
      ],
      scenario:
        "A field services company was tracking jobs in spreadsheets. We built a web dashboard and mobile app for technicians, connected to its CRM and invoicing, so managers now see job status and revenue on the same day.",
      services: [
        serviceItem("Website Development", "Fast, secure, search-friendly business websites.", [
          "Corporate and brand websites",
          "CMS for easy editing",
          "SEO-ready structure",
          "Speed and Core Web Vitals",
        ]),
        serviceItem("Custom Software Development", "Software built around your exact workflow.", [
          "Requirement analysis",
          "Custom modules",
          "Integrations",
          "Scalable architecture",
        ]),
        serviceItem("Web Application Development", "Powerful browser-based apps for customers and teams.", [
          "Portals and dashboards",
          "Booking and workflow apps",
          "Role-based access",
          "Cloud hosting",
        ]),
        serviceItem("Mobile App Development", "iOS and Android apps people enjoy using.", [
          "Native and cross-platform apps",
          "UI/UX design",
          "API and backend",
          "App store launch",
        ]),
        serviceItem("E-commerce Development", "Online stores that are easy to manage and buy from.", [
          "Shopify, WooCommerce or custom",
          "Payment gateway setup",
          "Inventory and order sync",
          "Conversion-focused design",
        ]),
        serviceItem("SaaS Development", "Subscription software, from MVP to scale.", [
          "Multi-tenant architecture",
          "Billing and subscriptions",
          "Admin dashboards",
          "Scalable cloud setup",
        ]),
        serviceItem("CRM Development", "A CRM that fits your sales process.", [
          "Lead and pipeline management",
          "Custom fields and workflows",
          "Email and WhatsApp integration",
          "Reports",
        ]),
        serviceItem("ERP Development", "Connect finance, inventory, HR and operations.", [
          "Module planning",
          "Inventory and procurement",
          "Finance and HR modules",
          "Data migration",
        ]),
        serviceItem("Custom Business Applications", "Tools that remove manual work from daily operations.", [
          "Internal tools",
          "Approval workflows",
          "Document management",
          "Mobile access",
        ]),
        serviceItem("UI/UX Design", "Interfaces that are clear, accessible and pleasant to use.", [
          "User research",
          "Wireframes and prototypes",
          "Design systems",
          "Usability testing",
        ]),
        serviceItem("API Development & Integration", "Make your systems talk to each other.", [
          "REST and GraphQL APIs",
          "Third-party integrations",
          "Payment and SMS gateways",
          "API documentation",
        ]),
        serviceItem("Cloud & DevOps Services", "Reliable hosting, deployments and uptime.", [
          "AWS, Azure and GCP setup",
          "CI/CD pipelines",
          "Monitoring and backups",
          "Cost optimisation",
        ]),
        serviceItem("AI & Automation Solutions", "Practical AI that saves time and improves decisions.", [
          "AI chatbots and assistants",
          "Document and data extraction",
          "Workflow automation",
          "Predictive analytics",
        ]),
        serviceItem("Data Analytics & Dashboard Development", "See your business performance in one place.", [
          "Data pipelines",
          "Power BI and custom dashboards",
          "KPI design",
          "Automated reports",
        ]),
        serviceItem("Software Testing & QA", "Catch problems before your customers do.", [
          "Manual and automated testing",
          "Performance testing",
          "Mobile device testing",
          "Bug tracking",
        ]),
        serviceItem("Cybersecurity Services", "Protect your data, systems and customers.", [
          "Vulnerability assessment",
          "Security hardening",
          "Access control",
          "Security audits",
        ]),
        serviceItem("Website Maintenance & Support", "Keep your website fast, safe and up to date.", [
          "Updates and backups",
          "Security monitoring",
          "Content changes",
          "Uptime checks",
        ]),
        serviceItem("Application Maintenance & Support", "Ongoing care for your software and apps.", [
          "Bug fixes",
          "Performance tuning",
          "Feature enhancements",
          "SLA-based support",
        ]),
        serviceItem("IT Consulting", "Senior advice on technology choices and roadmaps.", [
          "Technology strategy",
          "Vendor and stack selection",
          "Digital transformation plans",
          "Architecture review",
        ]),
      ],
    },
    {
      slug: "accounts-finance",
      name: "Accounts & Finance",
      short: "Finance",
      color: "finance",
      icon: "💼",
      flow: ["Control", "Reporting", "Financial clarity"],
      headline: "Better financial management starts with better visibility",
      intro:
        "Financial management is more than bookkeeping and compliance. We help startups, SMEs and established businesses keep accurate accounts, stay compliant and make decisions with confidence.",
      card: "Simplify accounting, taxation, payroll, financial reporting, business finance and strategic financial management.",
      problem:
        "Founders and managers often find out about cash problems too late, chase deadlines for GST and TDS, and make big decisions without timely numbers.",
      solution:
        "We keep your books accurate and current, handle compliance on time, and turn your numbers into monthly reports that show what to do next.",
      process: [
        {
          t: "Review",
          d: "We understand your business, books and compliance status.",
        },
        {
          t: "Set up",
          d: "Chart of accounts, tools, calendars and responsibilities.",
        },
        {
          t: "Run",
          d: "Bookkeeping, payroll and filings handled every month.",
        },
        {
          t: "Report",
          d: "MIS reports and key numbers shared on a fixed date.",
        },
        {
          t: "Advise",
          d: "Regular reviews on tax, cash flow and growth plans.",
        },
      ],
      benefits: [
        "Deadlines tracked and met on time",
        "Monthly MIS you can actually read",
        "Experienced accountants and finance advisers",
        "Confidential, secure handling of your data",
        "Costs lower than a full in-house team",
      ],
      faqs: [
        {
          q: "Which accounting software do you work with?",
          a: "We work with Tally, Zoho Books, QuickBooks and Xero, and can move you to a better tool if needed.",
        },
        {
          q: "Can you take over accounts that are behind?",
          a: "Yes. We regularly clean up and bring old books up to date, then move to a monthly routine.",
        },
        {
          q: "What is a Virtual CFO?",
          a: "A senior finance professional who works with you part-time, giving CFO-level planning, reporting and investor support at a fraction of the cost.",
        },
        {
          q: "How do you keep our financial data safe?",
          a: "Access is limited to your assigned team, data is stored securely, and we sign confidentiality agreements.",
        },
      ],
      scenario:
        "A fast-growing D2C startup had books three months behind and a funding round ahead. We cleaned up the accounts, set up monthly MIS and a cash-flow forecast, and supported the founders through investor due diligence.",
      services: [
        serviceItem(
          "Accounting & Bookkeeping Services",
          "Accurate books, organized finances, and clear monthly reporting.",
          [
            "Day-to-day bookkeeping",
            "Bank & credit card reconciliation",
            "Accounts payable support",
            "Accounts receivable support",
          ],
        ),
        serviceItem("Tax Planning & Advisory", "Proactive tax planning and structured tax-related decision support.", [
          "Business tax planning",
          "Corporate tax advisory",
          "Tax planning for startups and SMEs",
          "Income tax planning",
        ]),
        serviceItem("Income Tax & ITR Filing", "Straightforward return preparation and filing coordination.", [
          "ITR filing for salaried employees",
          "ITR filing for freelancers and consultants",
          "ITR filing for self-employed individuals",
          "ITR support for business owners",
        ]),
        serviceItem(
          "GST Services",
          "Reliable GST compliance support with better visibility into return data and input tax credit.",
          [
            "GST registration support",
            "GST return filing support",
            "Input tax credit reconciliation",
            "GST invoice reconciliation",
          ],
        ),
        serviceItem("TDS Services", "Organized TDS calculations, records, and periodic compliance support.", [
          "TDS return filing support",
          "TDS calculation and deduction support",
          "TDS challan and payment reconciliation",
          "Form 24Q support",
        ]),
        serviceItem("Payroll Services", "Structured payroll processing with dependable employee records.", [
          "End-to-end payroll processing",
          "Payroll outsourcing",
          "Salary calculation and structuring",
          "Attendance and leave integration",
        ]),
        serviceItem(
          "Financial Planning & Advisory",
          "Practical financial planning that helps management understand performance and plan ahead.",
          [
            "Business financial planning",
            "Budgeting and forecasting",
            "Cash-flow planning and management",
            "Financial modeling",
          ],
        ),
        serviceItem(
          "Business Finance Services",
          "Financing readiness, cash-flow visibility, and practical business finance support.",
          [
            "Business financing readiness support",
            "Business loan documentation support",
            "Working capital finance support",
            "Cash-flow planning and financing support",
          ],
        ),
        serviceItem(
          "Startup & SME Accounting",
          "A scalable accounting foundation for startups and growing businesses.",
          [
            "Startup bookkeeping services",
            "SME accounting services",
            "Outsourced accounting services",
            "Accounts payable management",
          ],
        ),
        serviceItem(
          "MIS & Financial Reporting",
          "Turn financial data into understandable business reports and dashboards.",
          [
            "Management information system reporting",
            "Financial statement reporting support",
            "Executive financial dashboards",
            "Revenue and sales reporting",
          ],
        ),
        serviceItem(
          "Budgeting & Financial Forecasting",
          "Plan with confidence using budgets, rolling forecasts and scenarios.",
          ["Annual business budgeting", "Revenue forecasting", "Expense forecasting", "Cash-flow forecasting"],
        ),
        serviceItem(
          "Audit & Compliance Support",
          "Better audit preparation, organized financial records, and improved compliance visibility.",
          [
            "Audit readiness assessment",
            "Statutory audit preparation support",
            "Internal audit support",
            "Tax audit documentation support",
          ],
        ),
        serviceItem(
          "Virtual CFO Services",
          "Senior financial leadership support without the cost of a full-time CFO.",
          ["CFO advisory & strategy", "Cash & treasury oversight", "Budgeting & performance", "MIS & reporting"],
        ),
        serviceItem(
          "Corporate Finance Advisory",
          "Structured financial analysis for capital structure, valuation, and strategic corporate decisions.",
          [
            "Corporate financial strategy support",
            "Capital structure analysis",
            "Debt financing analysis",
            "Equity financing readiness support",
          ],
        ),
        serviceItem("Investment Planning", "Business investment feasibility and capital allocation analysis.", [
          "Corporate investment planning",
          "Capital allocation analysis",
          "Investment feasibility analysis",
          "Investment cash-flow modeling",
        ]),
        serviceItem(
          "Due Diligence & Financial Analysis",
          "Financial clarity and risk visibility before significant business decisions or transactions.",
          [
            "Financial due diligence support",
            "Buy-side financial due diligence preparation",
            "Sell-side financial due diligence preparation",
            "Quality of earnings analysis",
          ],
        ),
        serviceItem(
          "Accounting & Finance Consulting",
          "Practical consulting to improve accounting workflows, financial reporting, and finance operations.",
          [
            "Accounting process consulting",
            "Financial management consulting",
            "Bookkeeping process optimization",
            "General ledger consulting",
          ],
        ),
      ],
    },
  ];
const PORTALS = cmsList("portals", [
    {
      slug: "turn2opinion",
      name: "Turn2Opinion",
      url: "https://www.turn2opinion.com/",
      joinUrl: "https://www.turn2opinion.com/",
      support: "support@turn2opinion.com",
      accent: "research",
      monogram: "T2O",
      audience: "Consumer, Business & Teen Research Panel",
      audiences: ["Consumers", "Business professionals", "Decision-makers", "Teens 13–17 (with parent permission)"],
      teen: { url: "https://www.turn2opinion.com/teen/", name: "Turn2Opinion Teen panel" },
      tagline: "Share your opinion. Shape better products. Get rewarded.",
      intro:
        "Turn2Opinion is Frequent Research’s online community of consumers, business people and, through its Teen panel, teens aged 13 to 17 with a parent or guardian’s permission. Members take part in surveys for brands, agencies, governments and institutions, and eligible, completed surveys earn rewards.",
      steps: [
        {
          t: "Sign up free",
          d: "Register with an active email address and contact number.",
        },
        {
          t: "Verify your account",
          d: "Confirm your email and phone with a verification link and OTP.",
        },
        {
          t: "Complete your profile",
          d: "Fill in your profile details to unlock more surveys every week.",
        },
        {
          t: "Take surveys",
          d: "Short, interesting surveys you can complete on mobile, tablet or desktop.",
        },
        {
          t: "Claim rewards",
          d: "Reach the threshold and redeem your rewards.",
        },
      ],
      features: [
        {
          t: "Free to join",
          d: "No fees, ever. Membership is completely free.",
        },
        {
          t: "Surveys on any device",
          d: "Take part at home on desktop or on the move from your phone.",
        },
        {
          t: "Topics you care about",
          d: "Shopping, technology, food and lifestyle, travel, entertainment and more.",
        },
        {
          t: "Profile-matched invitations",
          d: "A complete profile means more surveys that fit you.",
        },
        {
          t: "Teen panel, ages 13–17",
          d: "Age-appropriate surveys for teens, opened only after a parent or guardian says yes.",
        },
      ],
      rewards: ["PayPal", "Gift vouchers, including Amazon", "Direct account transfer (where available)"],
      topics: [
        "Shopping habits",
        "Technology & apps",
        "Food & lifestyle",
        "Travel",
        "Entertainment",
        "Consumer opinion",
      ],
      links: [
        {
          label: "Privacy Policy",
          href: "https://www.turn2opinion.com/privacy",
        },
        {
          label: "GDPR Compliance",
          href: "https://www.turn2opinion.com/gdpr",
        },
        {
          label: "Profiling & Quality Score",
          href: "https://www.turn2opinion.com/profiling",
        },
        {
          label: "Member FAQ",
          href: "https://www.turn2opinion.com/faq",
        },
        {
          label: "Teen panel (13–17)",
          href: "https://www.turn2opinion.com/teen/",
        },
      ],
      faqs: [
        {
          q: "Is Turn2Opinion really free?",
          a: "Yes. Registration and membership are free. You never pay to take part.",
        },
        {
          q: "Who can join Turn2Opinion?",
          a: "Consumers and business professionals aged 18 or over with a valid email address and contact number, and teens aged 13 to 17 through the Teen panel with a parent or guardian’s permission. Some surveys are only open to certain profiles, such as job role or location.",
        },
        {
          q: "Can teenagers join Turn2Opinion?",
          a: "Yes. Teens aged 13 to 17 can join the Teen panel. A date of birth from 13 to 17 switches the sign-up to the teen route, a parent or legal guardian gives permission by email, and only then can the teen set a password and take age-appropriate surveys. Under 13 cannot join.",
        },
        {
          q: "How do I get more surveys?",
          a: "Complete all of your profile sections. The more we know about you, the more relevant surveys we can invite you to.",
        },
        {
          q: "How are rewards paid?",
          a: "Once you reach the threshold you can claim rewards by PayPal or gift vouchers, or by direct transfer where available.",
        },
      ],
    },
    {
      slug: "myfrequentrewards",
      name: "MyFrequentRewards",
      url: "https://www.myfrequentrewards.com/",
      joinUrl: "https://www.myfrequentrewards.com/",
      support: "support@myfrequentrewards.com",
      accent: "digital",
      monogram: "MFR",
      audience: "Consumer, Business & Teen Research Panel",
      audiences: ["Consumers", "Business professionals", "Teens 13–17 (with parent permission)", "Members in 95+ countries"],
      teen: { url: "https://www.myfrequentrewards.com/paid-surveys-for-teens", name: "MyFrequentRewards Teens" },
      tagline: "A worldwide survey community with a low reward threshold.",
      intro:
        "MyFrequentRewards is Frequent Research’s worldwide community of consumers, business professionals and teens aged 13 to 17 (with a parent or guardian’s permission). Members receive survey invitations matched to their profile and earn reward points they can redeem from a low threshold.",
      steps: [
        {
          t: "Register free",
          d: "Join with your active email address and receive welcome bonus points.",
        },
        {
          t: "Verify",
          d: "Confirm your account through the links sent to your email and phone.",
        },
        {
          t: "Complete profiler surveys",
          d: "Each profile section you complete earns points and better-matched surveys.",
        },
        {
          t: "Get daily invitations",
          d: "New surveys arrive by email, so you never need to keep checking.",
        },
        {
          t: "Redeem rewards",
          d: "Claim once you reach the threshold. Unclaimed points carry forward.",
        },
      ],
      features: [
        {
          t: "Low $15 threshold",
          d: "Reach your first reward quickly and claim it sooner.",
        },
        {
          t: "Welcome bonus",
          d: "New members receive bonus points when they register.",
        },
        {
          t: "One account, many surveys",
          d: "Access a wide range of surveys from a single account.",
        },
        {
          t: "Open in 95+ countries",
          d: "Members from over 95 countries can register free.",
        },
        {
          t: "Works on every device",
          d: "Take surveys on mobile, tablet or desktop.",
        },
        {
          t: "Secure & confidential",
          d: "Your information is protected and never sold.",
        },
        {
          t: "Teens 13–17 welcome",
          d: "A parent or guardian says yes first; teens then get age-appropriate surveys and points.",
        },
      ],
      rewards: ["PayPal", "UPI", "Direct bank transfer", "Gift vouchers"],
      topics: [
        "Consumer products",
        "Brands & advertising",
        "Business & work",
        "Technology",
        "Lifestyle",
        "Opinion polls",
      ],
      links: [],
      faqs: [
        {
          q: "What is the minimum payout?",
          a: "The reward threshold is $15. Once you reach it, you can claim through PayPal, UPI, bank transfer or gift vouchers.",
        },
        {
          q: "What happens if I don’t reach the threshold this month?",
          a: "Your points are not lost. They carry forward to the next month until you reach the threshold.",
        },
        {
          q: "Do I need to log in every day to find surveys?",
          a: "No. We send an email invitation whenever a new survey matches your profile.",
        },
        {
          q: "Which countries can join?",
          a: "Members from more than 95 countries can register free.",
        },
        {
          q: "Can teenagers join MyFrequentRewards?",
          a: "Yes, from age 13 to 17 with a parent or legal guardian’s permission. The parent says yes by email, completes a short onboarding and consent form, and then the teen gets a link to set a password. The teen gives their own yes too. Teen surveys are age-appropriate, and where required rewards go through a verified guardian-managed payout. Under 13 cannot join.",
        },
      ],
    },
    {
      slug: "myhealthopinions",
      name: "MyHealthOpinions",
      url: "https://www.myhealthopinions.com/",
      joinUrl: "https://www.myhealthopinions.com/",
      support: "",
      accent: "tech",
      monogram: "MHO",
      audience: "Healthcare Professionals, Patients & Caregivers Research Panel",
      audiences: ["Physicians & specialists", "Nurses, pharmacists & allied HCPs", "Patients", "Caregivers"],
      tagline: "Your experience can improve healthcare for everyone.",
      intro:
        "MyHealthOpinions is Frequent Research’s healthcare research panel for healthcare professionals, patients and caregivers. Members share their experience of treatments, products and care, helping healthcare companies understand real needs, and are rewarded for their time.",
      steps: [
        {
          t: "Register",
          d: "Sign up free and tell us whether you are a healthcare professional, patient or caregiver.",
        },
        {
          t: "Verify",
          d: "Healthcare professionals complete a verification step so every study reaches the right experts.",
        },
        {
          t: "Complete your health profile",
          d: "Specialty, experience or conditions you are comfortable sharing, all kept confidential.",
        },
        {
          t: "Join relevant studies",
          d: "Online surveys, interviews and discussions that match your profile.",
        },
        {
          t: "Receive honoraria & rewards",
          d: "Get rewarded for your time and expertise.",
        },
      ],
      features: [
        {
          t: "Built for healthcare",
          d: "Studies designed for HCPs, patients and caregivers, not repurposed consumer surveys.",
        },
        {
          t: "Verified professionals",
          d: "HCP verification protects the quality of every study.",
        },
        {
          t: "Privacy first",
          d: "Health information is kept confidential and used only for research.",
        },
        {
          t: "Respect for your time",
          d: "Fair rewards for professionals and patients alike.",
        },
      ],
      rewards: ["Honoraria for healthcare professionals", "Rewards for patients & caregivers"],
      topics: [
        "Treatments & therapies",
        "Medical devices",
        "Patient journeys",
        "Caregiving",
        "Hospital & clinic experience",
        "Health & wellness",
      ],
      links: [],
      faqs: [
        {
          q: "Who can join MyHealthOpinions?",
          a: "Healthcare professionals such as physicians, specialists, nurses and pharmacists, as well as patients and caregivers.",
        },
        {
          q: "Why do healthcare professionals need verification?",
          a: "Verification makes sure studies meant for HCPs are answered by real professionals, which protects data quality for everyone.",
        },
        {
          q: "Is my health information safe?",
          a: "Yes. Your information is kept confidential, used only for research, and never shared in a way that identifies you without your consent.",
        },
        {
          q: "Do I have to answer every question?",
          a: "No. You can skip any question you are not comfortable answering, and you can leave the panel at any time.",
        },
      ],
    },
  ], "slug"),
  CONTACT = cmsData("contact", {
    name: "Frequent Research",
    legalName: "Fieldwork Solutions Pvt. Ltd.",
    email: "info@frequentresearch.com",
    phone: "+91 81782 00573",
    whatsapp: "918178200573",
    whatsappMessage: "Hello Frequent Research, I would like to know more about your services.",
    address: "Mangolpur Kalan, New Delhi – 110085, India",
    social: {
      linkedin: "https://www.linkedin.com/company/frequentresearch",
      instagram: "https://www.instagram.com/frequentresearchfield",
      x: "https://x.com/frequentrfs",
      youtube: "https://www.youtube.com/@frequentresearch",
      facebook: "https://www.facebook.com/FrequentResearchFieldwork",
      pinterest: "https://pin.it/1ApfR1BQk",
    },
  }),
  BRAND_LINE = "We serve the quality you expect";
const whatsappUrl = (t = CONTACT.whatsappMessage) => `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(t)}`;

export { BRAND_LINE, CONTACT, PORTALS, VERTICALS, whatsappUrl };
