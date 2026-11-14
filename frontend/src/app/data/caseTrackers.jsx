const AEROSPACE_CASES = [
    {
      slug: "airline-passenger-experience-tracker",
      title: "A passenger experience tracker for a domestic airline",
      client: "A domestic airline",
      region: "Pan-India routes",
      markets: ["IN"],
      services: ["Quantitative research", "Online surveys", "Data analytics & dashboards"],
      methods: ["Post-flight online survey", "Monthly dashboard"],
      scope: "Around 4,000 passengers a month",
      timeline: "Ongoing monthly programme",
      challenge:
        "The airline received many complaints on social media but had no structured way to see which parts of the journey, from booking to baggage collection, were driving satisfaction or frustration on each route.",
      approach:
        "We designed a short post-flight survey covering booking, check-in, boarding, cabin, punctuality and baggage, sent within 24 hours of travel. Results were weighted by route and fare type and shown on a monthly dashboard with driver analysis.",
      outcome:
        "Boarding delays and baggage waiting times at a few airports drove most dissatisfaction, not cabin service. The airline focused ground operations improvements at those airports and used the tracker to monitor progress.",
      learning:
        "Measuring the whole journey revealed that the biggest problems happened on the ground, not in the air.",
      verified: true,
    },
    {
      slug: "mro-customer-satisfaction",
      title: "What airline engineering heads expect from a maintenance partner",
      client: "An aircraft maintenance, repair and overhaul provider",
      region: "India, UAE, Saudi Arabia, Malaysia & Indonesia",
      markets: ["IN", "AE", "SA", "MY", "ID"],
      services: ["Business panel", "Qualitative research", "Research consultancy"],
      methods: ["In-depth interviews with airline engineering heads"],
      scope: "22 interviews with current and prospective customers",
      timeline: "7 weeks",
      challenge:
        "The MRO provider wanted to grow beyond its domestic customers but did not know how it compared with regional competitors or what decided contracts.",
      approach:
        "We interviewed engineering and technical procurement heads at airlines and leasing companies, exploring turnaround times, quality, documentation, pricing and communication during heavy checks.",
      outcome:
        "Turnaround predictability and proactive communication about findings mattered more than price. The provider introduced daily progress reports during checks and used the findings in its regional sales pitch.",
      learning: "In technical B2B services, predictability is often the real product.",
      verified: true,
    },
    {
      slug: "airport-retail-shopper-study",
      title: "Understanding why travellers shop, or don’t, at airport stores",
      client: "An airport retail concessionaire",
      region: "Two hub airports in the United Arab Emirates and Qatar",
      markets: ["AE", "QA"],
      services: ["Quantitative research", "Offline data collection", "Reporting & insights"],
      methods: ["Departure-lounge intercept interviews", "Store observation"],
      scope: "1,600 passengers",
      timeline: "5 weeks",
      challenge:
        "Footfall in departure lounges was high, but conversion in retail and food outlets was low. The concessionaire wanted to understand passenger behaviour and barriers to spending.",
      approach:
        "Interviewers spoke with passengers in departure areas about their time before boarding, spending intentions, price perceptions and what would encourage them to visit outlets. Observers recorded footfall patterns.",
      outcome:
        "Anxiety about boarding time and the perception of high prices kept many passengers seated near gates. The concessionaire added boarding-time screens inside stores and introduced value ranges near gate areas.",
      learning: "Removing small anxieties can unlock spending more than discounts.",
      verified: true,
    },
    {
      slug: "aerospace-supplier-ecosystem-mapping",
      title: "Mapping the aerospace component supplier ecosystem",
      client: "An industry development agency",
      region: "Karnataka & Telangana",
      markets: ["IN"],
      services: ["Research consultancy", "Business panel", "Data analytics & dashboards"],
      methods: ["Supplier census", "Capability interviews"],
      scope: "180 small and mid-sized suppliers",
      timeline: "10 weeks",
      challenge:
        "The agency wanted to attract global aerospace manufacturers but lacked an up-to-date view of local suppliers’ capabilities, certifications and capacity.",
      approach:
        "We compiled a list of suppliers from associations and directories, then interviewed owners and quality heads about machining capabilities, materials, certifications, capacity and export experience. Results were mapped in a searchable database.",
      outcome:
        "The agency could present investors with a credible picture of the supplier base and identified which suppliers needed certification support. It launched a certification assistance programme for promising firms.",
      learning: "A capability map turned scattered knowledge into an investment-promotion asset.",
      verified: true,
    },
    {
      slug: "aviation-training-academy-marketing",
      title: "Filling seats at a pilot and aviation training academy",
      client: "An aviation training academy",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Lead generation", "Google Ads / PPC", "Content marketing"],
      methods: ["Search campaigns", "Career guidance content", "Lead nurturing"],
      scope: "Website, campaigns and email nurturing",
      timeline: "6 months",
      challenge:
        "The academy received many enquiries from students who could not afford training or did not meet eligibility requirements, wasting counsellors’ time.",
      approach:
        "We created clear content on eligibility, costs, financing options and career paths, refined campaigns towards serious applicants, and added qualifying questions to enquiry forms with a nurturing email sequence for early-stage enquirers.",
      outcome:
        "Counsellors spent more time with qualified applicants, and enquiries better reflected the academy’s requirements. Parents responded well to transparent cost information.",
      learning: "Being upfront about costs and eligibility improved lead quality.",
      verified: true,
    },
    {
      slug: "airline-loyalty-programme-research",
      title: "Testing changes to a frequent flyer programme",
      client: "A South-East Asian airline loyalty programme",
      region: "Malaysia, Indonesia & Hong Kong",
      markets: ["MY", "ID", "HK"],
      services: ["Quantitative research", "Consumer panel", "Research consultancy"],
      methods: ["Online survey with choice exercise"],
      scope: "2,000 frequent and occasional flyers",
      timeline: "6 weeks",
      challenge:
        "The airline planned to restructure its loyalty tiers and rewards but feared alienating its most valuable members.",
      approach:
        "Members and non-members completed a survey including a choice exercise comparing alternative tier structures, earning rates and benefits. Results were analysed by travel frequency and purpose.",
      outcome:
        "Business travellers valued priority services and flexible upgrades far more than bonus points. The airline adjusted its proposal to protect those benefits for top tiers while simplifying lower tiers.",
      learning: "Choice exercises showed trade-offs that direct questions would have missed.",
      verified: true,
    },
    {
      slug: "helicopter-services-feasibility",
      title: "Assessing demand for regional helicopter services",
      client: "A state tourism and aviation department",
      region: "A hill state in North India",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Financial modelling"],
      methods: ["Traveller survey", "Operator interviews", "Demand model"],
      scope: "1,200 tourists and pilgrims, 10 operator interviews",
      timeline: "8 weeks",
      challenge:
        "The department was considering subsidised helicopter routes to remote tourist and pilgrimage sites and needed evidence on likely demand and pricing.",
      approach:
        "We surveyed visitors about travel patterns and willingness to pay at several price points, interviewed operators about costs and constraints, and built a demand and viability model with scenarios.",
      outcome:
        "Demand was strong on two pilgrimage routes during peak season and weak elsewhere. The department focused its tender on those routes with seasonal operations.",
      learning: "Seasonality shaped viability more than total annual demand.",
      verified: true,
    },
    {
      slug: "aerospace-talent-skills-study",
      title: "Understanding skills shortages in aircraft maintenance",
      client: "A skills development council",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Employer survey", "Technician interviews"],
      scope: "90 employers, 50 technician interviews",
      timeline: "8 weeks",
      challenge:
        "Employers reported shortages of licensed aircraft maintenance engineers, while many trainees struggled to find jobs. The council wanted to understand the mismatch.",
      approach:
        "We surveyed employers about hiring needs and skill gaps, and interviewed recent graduates and working technicians about training quality, licensing and job search.",
      outcome:
        "Graduates lacked hands-on experience on current aircraft types, which employers required. The council promoted industry-linked practical training and apprenticeship partnerships.",
      learning: "Hearing both sides explained why shortages and unemployment existed at the same time.",
      verified: true,
    },
    {
      slug: "airline-customer-support-chatbot",
      title: "Reducing call volumes with a smarter support assistant",
      client: "A regional airline in Australasia",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["AI & automation solutions", "WhatsApp marketing", "API development & integration"],
      methods: ["Contact reason analysis", "Chat and WhatsApp assistant"],
      scope: "Website and WhatsApp support",
      timeline: "4 months",
      challenge:
        "The airline’s call centre was overwhelmed with routine questions about baggage, web check-in and flight status, leaving customers waiting on hold.",
      approach:
        "We analysed contact reasons, then built an assistant on the website and WhatsApp that answered common questions from approved content and connected to the flight status system, handing complex cases to agents with full context.",
      outcome:
        "Routine queries moved to self-service, hold times fell, and agents focused on rebookings and complaints. Customers could check flight status instantly on WhatsApp.",
      learning: "Starting with real contact reasons ensured the assistant solved the right problems.",
      verified: true,
    },
    {
      slug: "airport-accessibility-audit",
      title: "An accessibility audit of passenger journeys at airports",
      client: "An airport operator",
      region: "Three airports in Australia and New Zealand",
      markets: ["AU", "NZ"],
      services: ["Qualitative research", "Offline data collection", "Reporting & insights"],
      methods: ["Accompanied journeys with passengers with disabilities", "Facility audits"],
      scope: "30 accompanied journeys, three terminals",
      timeline: "7 weeks",
      challenge:
        "The operator wanted to improve accessibility for passengers with disabilities and older travellers, but its compliance checklists did not capture the real experience.",
      approach:
        "With participants’ consent, researchers accompanied passengers with mobility, visual and hearing impairments from kerbside to boarding, recording barriers and assistance quality, alongside structured facility audits.",
      outcome:
        "Signage, assistance handovers between teams and long walking distances were the main barriers. The operator redesigned signage and assistance handover procedures.",
      learning: "Experiencing the journey with passengers revealed issues a checklist could not.",
      verified: true,
    },
  ],
  AEROSPACE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: AEROSPACE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  AGRICULTURE_CASES = [
    {
      slug: "seed-hybrid-adoption-farmer-study",
      title: "Why farmers switched seed brands, and what it took to win them back",
      client: "A national seed company",
      region: "Maharashtra, Madhya Pradesh & Telangana",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Reporting & insights"],
      methods: ["Face-to-face farmer interviews", "Dealer interviews"],
      scope: "1,800 farmers and 120 agri-input dealers across 36 districts",
      timeline: "7 weeks",
      challenge:
        "Sales of the client’s flagship cotton hybrid had slipped for two seasons in a row, but field teams could not agree why. Some blamed price, others blamed a competitor’s dealer incentives, and a few suspected the seed itself had lost its reputation after a difficult monsoon.",
      approach:
        "We sent local-language interviewers into villages during the pre-sowing window, when seed decisions are actually made. Farmers walked us through how they chose last season’s seed, who they listened to, and what made them switch. We also interviewed the dealers who sold to them, so we could compare what farmers said with what happened at the counter.",
      outcome:
        "The answer was neither price nor seed quality. Most switchers had followed the advice of a trusted dealer or a neighbouring “lead farmer” who had tried a rival hybrid. The client redirected part of its budget from discounts into demonstration plots with lead farmers and a dealer recognition programme for the following season.",
      learning:
        "In rural markets, the person a farmer trusts often matters more than the product sheet. Interviewing both farmers and dealers revealed a story neither group told on its own.",
      verified: true,
    },
    {
      slug: "crop-insurance-awareness-evaluation",
      title: "Measuring what farmers really understand about crop insurance",
      client: "A state agriculture department",
      region: "Rajasthan",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CAPI)", "Data processing & analytics"],
      methods: ["Household survey", "Focus groups with women farmers"],
      scope: "3,200 farm households in 16 districts, plus 12 group discussions",
      timeline: "10 weeks",
      challenge:
        "Enrolment in the crop insurance scheme looked healthy on paper, yet claims were rarely filed and complaints kept reaching the department. Officials wanted to know whether farmers understood what they were covered for, and where the process was breaking down.",
      approach:
        "We designed a household survey that asked farmers to explain the scheme in their own words rather than simply say whether they had heard of it. Separate group discussions with women farmers captured voices that household surveys often miss. GPS-tagged interviews and independent back-checks gave the department confidence in the data.",
      outcome:
        "Many enrolled farmers did not know they were insured, because premiums were deducted automatically with their crop loans. Very few knew the deadline for reporting losses. The department used the findings to redesign village awareness sessions and to add SMS reminders after extreme weather events.",
      learning:
        "Asking people to explain a scheme, not just recognise its name, reveals the real level of understanding.",
      verified: true,
    },
    {
      slug: "agri-drone-spraying-market-sizing",
      title: "Sizing the market for drone spraying services before a national launch",
      client: "An agri-tech start-up expanding into South-East Asia",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Research consultancy", "Quantitative research", "Financial modelling"],
      methods: ["Farmer survey", "Expert interviews", "Bottom-up market model"],
      scope: "1,200 farmers, 25 expert and dealer interviews",
      timeline: "6 weeks",
      challenge:
        "The start-up had a working drone service and investor interest, but its market estimates came from optimistic desk research. Before raising its next round, it needed a defensible view of how many farmers would actually pay for spraying, at what price and for which crops.",
      approach:
        "We combined interviews with agronomists, farm service providers, plantation managers and agrochemical dealers with a farmer survey covering crop, farm size, current spraying practice and willingness to pay at several price points. Our finance team turned the results into a transparent bottom-up model with clear assumptions and scenarios.",
      outcome:
        "Demand was strongest among mid-sized paddy and wheat farmers facing labour shortages at peak season, and much weaker for smallholders on mixed crops. The founders narrowed their launch to two provinces and two crops, and presented the model with its assumptions to investors.",
      learning:
        "A smaller, well-evidenced market estimate is more persuasive to investors than a large number nobody can explain.",
      verified: true,
    },
    {
      slug: "fpo-member-satisfaction-study",
      title: "Helping farmer producer organisations understand why members stay or leave",
      client: "A development foundation",
      region: "Odisha & Jharkhand",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["Member survey", "In-depth interviews with FPO leaders"],
      scope: "24 FPOs, 1,450 members, 40 leader interviews",
      timeline: "8 weeks",
      challenge:
        "The foundation supported dozens of farmer producer organisations, but membership was uneven. Some FPOs thrived while others lost members after their first year. The foundation wanted to know what members valued and what made them drift away.",
      approach:
        "We started with conversations with FPO leaders and long-standing members to understand how each organisation worked. Those insights shaped a member survey covering services used, trust in leadership, payment timeliness and perceived benefits. Interviews were conducted in Odia, Hindi and local dialects.",
      outcome:
        "Members stayed when the FPO paid them promptly for produce and shared simple accounts at village meetings. Delayed payments and unclear decisions were the strongest reasons for leaving. The foundation built a basic accounts-sharing practice and payment-timeliness tracking into its support programme.",
      learning: "Trust in small organisations is built on visible, predictable money flows.",
      verified: true,
    },
    {
      slug: "fertiliser-brand-tracker-rural",
      title: "Building a rural brand tracker for a fertiliser company",
      client: "A fertiliser manufacturer",
      region: "Eight states across India",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CATI & CAPI)", "Data analytics & dashboards"],
      methods: ["Telephone and face-to-face surveys", "Quarterly tracking"],
      scope: "2,400 farmers per wave, four waves a year",
      timeline: "Ongoing quarterly programme",
      challenge:
        "The client invested heavily in rural advertising and farmer meetings but had no consistent way to see whether awareness and preference were moving. Each region ran its own surveys, with different questions and samples, so results could not be compared.",
      approach:
        "We designed one tracker with consistent questions, quotas by state and farm size, and a mix of telephone interviews for speed and face-to-face interviews for farmers without reliable phone access. Results flowed into a dashboard the marketing team could filter by state, crop and channel.",
      outcome:
        "For the first time, the client could compare regions on the same basis and see which activities moved preference. Marketing reallocated spend away from a television campaign that showed little effect in two states and towards village meetings that consistently performed better.",
      learning:
        "A tracker’s value comes from consistency; changing questions every wave destroys the ability to see trends.",
      verified: true,
    },
    {
      slug: "agri-input-dealer-app",
      title: "Replacing paper order books with a dealer ordering app",
      client: "An agri-input distributor",
      region: "Gujarat",
      markets: ["IN"],
      services: ["Mobile app development", "API development & integration", "Software testing & QA"],
      methods: ["User interviews with dealers", "Offline-first app", "ERP integration"],
      scope: "600 rural dealers, integration with the distributor’s accounting system",
      timeline: "4 months",
      challenge:
        "Dealers placed orders by phone or in paper books collected by sales staff. Orders were lost, credit limits were checked by hand and stock disputes were common. The distributor wanted a simple digital channel that would work in villages with weak connectivity.",
      approach:
        "We interviewed dealers at their shops to understand how they ordered and what confused them. The resulting app was built offline-first, in Gujarati and English, with large buttons and a familiar product list. Orders synchronised when a signal returned and flowed straight into the distributor’s accounting system, which checked credit limits automatically.",
      outcome:
        "Most dealers adopted the app within the first season with help from sales staff. Order disputes fell noticeably, and the sales team spent more time advising dealers instead of writing orders. The distributor later added scheme announcements and payment reminders.",
      learning: "Designing for the dealer’s shop counter, not a city office, made the difference to adoption.",
      verified: true,
    },
    {
      slug: "organic-produce-consumer-demand",
      title: "Understanding who really buys organic produce in New Zealand and Australian cities",
      client: "A New Zealand organic growers’ cooperative",
      region: "Auckland, Wellington, Sydney & Melbourne",
      markets: ["NZ", "AU"],
      services: ["Consumer panel", "Online surveys", "Qualitative research"],
      methods: ["Online survey", "Shopper interviews"],
      scope: "1,600 urban grocery shoppers, 20 in-depth interviews",
      timeline: "5 weeks",
      challenge:
        "The cooperative’s farmers had converted to organic practices, but urban sales were slow and expensive to grow. It needed to know who bought organic produce, what they were willing to pay and which proofs of authenticity they trusted.",
      approach:
        "We surveyed grocery shoppers through our consumer panel, with quotas for age, household type and city, then held in-depth interviews with regular organic buyers. Interviews explored trust in labels, certification marks and farm stories, and how buyers checked whether produce was genuinely organic.",
      outcome:
        "Regular buyers were often parents of young children and people managing health conditions, and they trusted traceability more than labels. The cooperative introduced farm-level QR codes and a subscription box for families, focused on Auckland and Sydney first.",
      learning: "In categories where trust is low, proof of origin can matter as much as price.",
      verified: true,
    },
    {
      slug: "agri-lending-mis-dashboard",
      title: "Giving an agri-lending company a monthly view of its portfolio",
      client: "A rural NBFC focused on farm loans",
      region: "Maharashtra & Karnataka",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Data analytics & dashboards", "Virtual CFO services"],
      methods: ["Finance process review", "Dashboard build"],
      scope: "40 branches, loan and collection data from two systems",
      timeline: "10 weeks",
      challenge:
        "Branch managers sent monthly reports in different spreadsheet formats, and the leadership team spent days reconciling them before board meetings. Seasonal repayment patterns made it hard to tell genuine stress from normal harvest-linked timing.",
      approach:
        "Our finance team agreed standard definitions for disbursements, collections and overdue buckets, then built automated data feeds from the loan and accounting systems. The dashboard showed branch performance against seasonal norms, so a dip during sowing months was not mistaken for a problem.",
      outcome:
        "Board reporting moved from a week of reconciliation to a standard monthly pack. Management could see early warning signs by branch and crop region, and introduced targeted follow-ups where repayment stress appeared outside normal seasonal patterns.",
      learning:
        "In agricultural finance, comparing performance against the crop calendar is essential to reading the numbers correctly.",
      verified: true,
    },
    {
      slug: "kisan-call-centre-digital-campaign",
      title: "Reaching farmers online with useful crop advice, not just adverts",
      client: "A crop protection company",
      region: "Hindi-speaking states",
      markets: ["IN"],
      services: ["Content marketing", "Social media marketing", "WhatsApp marketing"],
      methods: ["Video content", "YouTube & Facebook campaigns", "WhatsApp advisory service"],
      scope: "Hindi and regional-language content across three crop seasons",
      timeline: "9 months",
      challenge:
        "The client’s digital adverts reached many rural users but generated little trust or engagement. Farmers told the sales team they wanted practical advice on pests and diseases, not product promotions.",
      approach:
        "We built a content plan around the crop calendar: short videos in Hindi showing how to identify common pests, when to spray and how to stay safe, presented by agronomists rather than actors. Viewers could opt in to a WhatsApp advisory line to share photos of affected crops and receive guidance from the client’s agronomy team.",
      outcome:
        "Engagement and opt-ins grew steadily across the seasons, and the WhatsApp line became a valuable source of field intelligence on pest outbreaks. Product recommendations were made only where relevant, which farmers said made them trust the brand more.",
      learning: "Helpful content earns attention in rural digital channels far better than promotional messages.",
      verified: true,
    },
    {
      slug: "dairy-cooperative-farmer-survey",
      title: "Listening to dairy farmers before redesigning milk collection",
      client: "A dairy cooperative",
      region: "Uttar Pradesh",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Research consultancy"],
      methods: ["Farmer survey", "Collection centre observations"],
      scope: "1,100 dairy farmers, 60 village collection centres",
      timeline: "6 weeks",
      challenge:
        "The cooperative planned to change collection timings and introduce digital milk testing. Leaders were worried that farmers might switch to private buyers if the changes were poorly received.",
      approach:
        "We surveyed farmers at their homes and observed morning and evening collections to understand queues, testing disputes and payment practices. Questions explored what farmers valued most: price, fair testing, prompt payment or convenience.",
      outcome:
        "Fair, visible fat testing and on-time payment mattered far more to farmers than collection timings. The cooperative introduced digital testing with printed slips first, communicated the change at village meetings, and adjusted timings only in villages where farmers requested it.",
      learning: "Asking first prevented a well-intended change from damaging trust.",
      verified: true,
    },
  ],
  AGRICULTURE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: AGRICULTURE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  AUTOMOTIVE_CASES = [
    {
      slug: "ev-two-wheeler-adoption-study",
      title: "What stops city commuters from switching to electric scooters",
      client: "An electric two-wheeler manufacturer",
      region: "Delhi NCR, Bengaluru, Pune, Jaipur & Lucknow",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online and face-to-face survey", "Owner interviews"],
      scope: "2,000 two-wheeler intenders, 30 EV owner interviews",
      timeline: "7 weeks",
      challenge:
        "Interest in electric scooters was high, but conversion from showroom visits to purchases was lower than expected. The manufacturer wanted to understand the real barriers.",
      approach:
        "We surveyed people planning to buy a two-wheeler within a year, combining our consumer panel with face-to-face interviews in smaller cities. Owner interviews explored life after purchase, including charging and service.",
      outcome:
        "Charging at apartments and worries about resale value were bigger barriers than range. The manufacturer introduced a buy-back assurance and partnered with housing societies on charging points.",
      learning: "Owners’ real experiences helped separate perceived barriers from actual ones.",
      verified: true,
    },
    {
      slug: "dealer-sales-mystery-shopping",
      title: "Mystery shopping car showrooms across the network",
      client: "A European passenger vehicle brand",
      region: "120 dealerships across the UK, Germany & France",
      markets: ["UK", "DE", "FR"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["Mystery shopping visits and calls", "Dashboard by dealer"],
      scope: "480 visits and 360 calls per wave",
      timeline: "Two waves a year",
      challenge:
        "Sales processes varied widely between dealers, and the manufacturer suspected that test drives, finance explanations and follow-ups were inconsistent.",
      approach:
        "Trained mystery shoppers posed as buyers, visiting showrooms and calling sales lines, scoring each stage against the manufacturer’s sales standards. Results were shared with each dealer on a dashboard with comparisons.",
      outcome:
        "Follow-up calls after visits were the weakest step across the network. The manufacturer added follow-up reminders to its dealer CRM and linked part of dealer incentives to follow-up quality.",
      learning: "Consistent scoring made dealer comparisons fair and actionable.",
      verified: true,
    },
    {
      slug: "mechanic-aftermarket-parts-study",
      title: "How independent mechanics choose spare parts brands",
      client: "An auto parts manufacturer",
      region: "Indonesia, Malaysia & South Africa",
      markets: ["ID", "MY", "ZA"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Business panel"],
      methods: ["Garage interviews", "Retailer interviews"],
      scope: "1,500 mechanics, 400 parts retailers",
      timeline: "7 weeks",
      challenge:
        "Independent garages handled most vehicle repairs outside warranty, and the client wanted to understand how mechanics chose parts and how to win their loyalty.",
      approach:
        "Interviewers visited garages during working hours, asking mechanics about brand choice, counterfeit concerns, retailer relationships and loyalty schemes. Parts retailers were interviewed about stocking and recommendations.",
      outcome:
        "Mechanics feared counterfeit parts damaging their reputation and preferred brands with easy authenticity checks. The client launched a scratch-code verification system and mechanic loyalty app.",
      learning: "Protecting the mechanic’s reputation was a stronger motivator than discounts.",
      verified: true,
    },
    {
      slug: "car-buyer-digital-journey",
      title: "Mapping the online research journey of car buyers",
      client: "An automotive brand in North America",
      region: "United States & Canada",
      markets: ["US", "CA"],
      services: ["Consumer panel", "Digital analytics & reporting", "Performance marketing"],
      methods: ["Survey of recent buyers", "Digital touchpoint analysis"],
      scope: "1,800 recent car buyers",
      timeline: "6 weeks",
      challenge:
        "The brand’s marketing team could see digital clicks and showroom visits, but not how buyers moved between them or which online sources influenced their shortlist.",
      approach:
        "We surveyed people who had bought a car in the past six months about their research journey, comparing it with the brand’s web analytics and campaign data.",
      outcome:
        "Video reviews and comparison sites shaped shortlists early, while the brand’s own site mattered most for booking test drives. The brand rebalanced spend towards video and comparison content, and simplified test-drive booking online.",
      learning: "Combining survey and analytics data explained journeys that neither showed alone.",
      verified: true,
    },
    {
      slug: "commercial-vehicle-fleet-owner-research",
      title: "Listening to small fleet owners before a truck launch",
      client: "A commercial vehicle manufacturer",
      region: "Major transport hubs in eight states",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Offline data collection"],
      methods: ["Fleet owner interviews at transport nagars", "Driver interviews"],
      scope: "600 fleet owners, 300 drivers",
      timeline: "8 weeks",
      challenge:
        "The manufacturer was designing a new light truck and needed to understand what small fleet owners valued most in operating economics, financing and service.",
      approach:
        "Interviewers met fleet owners and drivers at transport hubs and dhabas, discussing fuel efficiency, payload, uptime, resale, financing and driver comfort.",
      outcome:
        "Uptime and quick service along highways mattered more than small gains in fuel efficiency. The manufacturer strengthened its highway service network plan alongside the launch.",
      learning: "Meeting customers where they work produced candid, practical insights.",
      verified: true,
    },
    {
      slug: "service-centre-satisfaction",
      title: "Improving after-sales service satisfaction",
      client: "A two-wheeler manufacturer",
      region: "Pan-India service network",
      markets: ["IN"],
      services: ["Offline data collection (CATI)", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Post-service telephone survey", "Driver analysis"],
      scope: "6,000 customers a month",
      timeline: "Ongoing",
      challenge:
        "Service satisfaction scores varied widely between workshops, and the manufacturer wanted to understand what drove satisfaction and repeat visits.",
      approach:
        "Our telephone team called customers within days of service, asking about booking, waiting time, cost transparency, quality and delivery. Driver analysis identified the strongest influences on satisfaction.",
      outcome:
        "Explaining the bill and delivering on the promised time mattered most. The manufacturer introduced bill explanation at delivery and time-commitment tracking at workshops.",
      learning: "Simple service behaviours had the biggest impact on satisfaction.",
      verified: true,
    },
    {
      slug: "auto-dealer-group-crm",
      title: "A CRM to stop losing showroom enquiries",
      client: "A multi-brand automobile dealer group",
      region: "Maharashtra",
      markets: ["IN"],
      services: ["CRM development", "WhatsApp marketing", "Lead generation"],
      methods: ["Lead process mapping", "CRM and WhatsApp integration"],
      scope: "9 showrooms, 120 sales staff",
      timeline: "4 months",
      challenge:
        "Enquiries arrived from walk-ins, calls, websites and social media, but many were never followed up. Managers had no visibility of the pipeline.",
      approach:
        "We mapped the enquiry process and set up a CRM capturing leads from every source, with automatic assignment, follow-up reminders and WhatsApp templates for test drive confirmations.",
      outcome:
        "Every enquiry now has an owner and a follow-up date, and managers review pipeline by showroom weekly. Unattended leads became visible and fell sharply.",
      learning: "Visibility of follow-ups changed behaviour more than training alone.",
      verified: true,
    },
    {
      slug: "ev-charging-location-research",
      title: "Choosing where to place public EV chargers",
      client: "An EV charging network operator in East Asia",
      region: "Taipei, Taichung & Hong Kong",
      markets: ["TW", "HK"],
      services: ["Research consultancy", "Quantitative research", "Data analytics & dashboards"],
      methods: ["EV owner survey", "Location analysis"],
      scope: "900 EV owners, 150 candidate locations",
      timeline: "7 weeks",
      challenge:
        "The operator had limited capital for new chargers and needed to know where EV owners would actually use them.",
      approach:
        "We surveyed EV owners about travel patterns, charging habits and preferred locations, and combined the results with traffic and amenity data to score candidate sites.",
      outcome:
        "Owners preferred chargers at places where they already spent 30–60 minutes, such as malls and restaurants, over standalone sites. The operator prioritised partnerships with retail locations.",
      learning: "Charging fits into existing routines rather than creating new trips.",
      verified: true,
    },
    {
      slug: "automotive-component-export-finance",
      title: "Financing growth for an auto-component exporter",
      client: "An auto-component manufacturer",
      region: "Tamil Nadu",
      markets: ["IN"],
      services: ["Business finance services", "Financial modelling", "Virtual CFO services"],
      methods: ["Project report", "Bank liaison"],
      scope: "New production line and export working capital",
      timeline: "3 months",
      challenge:
        "The company had won a new export contract that required a production line expansion and higher working capital, but its previous loan applications had been slow.",
      approach:
        "We prepared a detailed project report with projections and debt service analysis, structured working capital needs around the export payment cycle, and supported discussions with two banks.",
      outcome:
        "The company secured a term loan and working capital limit in time for the contract, on terms aligned with its cash cycle.",
      learning: "A clear, well-supported proposal speeds up lender decisions.",
      verified: true,
    },
    {
      slug: "vehicle-safety-awareness-study",
      title: "Understanding parents’ attitudes to child car seats",
      client: "A road safety foundation in the Middle East",
      region: "Dubai, Abu Dhabi, Riyadh, Jeddah, Doha & Cairo",
      markets: ["AE", "SA", "QA", "EG"],
      services: ["Consumer panel", "Qualitative research", "Content marketing"],
      methods: ["Online survey", "Parent group discussions"],
      scope: "1,500 parents with young children, 8 discussions",
      timeline: "6 weeks",
      challenge:
        "Few families used child car seats, and the foundation wanted to understand why before launching an awareness campaign.",
      approach:
        "We surveyed parents who owned cars about travel habits, safety beliefs and barriers, and held group discussions to test campaign messages.",
      outcome:
        "Many parents believed holding a child was safe on short trips. Messages showing real crash physics and practical installation help tested best, and the foundation built its campaign around them.",
      learning: "Testing messages before launch avoided a campaign built on assumptions.",
      verified: true,
    },
  ],
  AUTOMOTIVE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: AUTOMOTIVE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  CHEMICAL_CASES = [
    {
      slug: "specialty-chemical-buyer-research",
      title: "Why formulators switch specialty chemical suppliers",
      client: "A specialty chemicals company",
      region: "India, Malaysia, Indonesia & Taiwan",
      markets: ["IN", "MY", "ID", "TW"],
      services: ["Business panel", "Qualitative research", "Quantitative research"],
      methods: ["Interviews with R&D and procurement heads", "B2B survey"],
      scope: "25 interviews, 280 survey responses",
      timeline: "8 weeks",
      challenge:
        "The company’s additives were well regarded technically, yet several customers had moved part of their volume to competitors. Sales teams could not explain why.",
      approach:
        "We interviewed R&D, quality and procurement heads at paint, coatings and adhesive manufacturers, then surveyed a wider group to measure supplier selection criteria.",
      outcome:
        "Customers valued fast technical support during product development and consistent batch quality. Switching often followed a slow response to a technical query. The company created a dedicated application support desk.",
      learning: "In specialty chemicals, technical service is part of the product.",
      verified: true,
    },
    {
      slug: "paint-dealer-tinting-study",
      title: "Understanding dealers in the decorative paints market",
      client: "A decorative paints brand",
      region: "15 cities in Indonesia & Malaysia",
      markets: ["ID", "MY"],
      services: ["Offline data collection (CAPI)", "Business panel", "Reporting & insights"],
      methods: ["Dealer interviews", "Store observation"],
      scope: "800 paint dealers",
      timeline: "6 weeks",
      challenge:
        "The brand was investing in tinting machines at dealer shops but wanted to know whether dealers were using them and how they influenced customer choices.",
      approach:
        "Interviewers visited dealers to discuss stocking, painter relationships, tinting machine use and schemes, and observed how customers were served.",
      outcome:
        "Painters strongly influenced brand choice, and dealers favoured brands that supported painter relationships. The brand linked tinting investments to painter engagement programmes.",
      learning: "The machine mattered less than the relationships around it.",
      verified: true,
    },
    {
      slug: "chemical-plant-community-perception",
      title: "Listening to communities around a chemical plant",
      client: "A chemical manufacturer",
      region: "Gujarat industrial cluster",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Household survey", "Community group discussions"],
      scope: "1,000 households in 12 villages",
      timeline: "7 weeks",
      challenge:
        "The company wanted to understand how nearby communities viewed its plant, including concerns about safety, pollution and employment, to guide its community engagement.",
      approach:
        "Independent interviewers surveyed households about perceptions, concerns and awareness of emergency procedures, and held group discussions with women, farmers and youth.",
      outcome:
        "Residents were most concerned about water quality and lacked information on emergency procedures. The company introduced community water testing with published results and village-level emergency awareness sessions.",
      learning: "Independent research encouraged residents to speak openly.",
      verified: true,
    },
    {
      slug: "agrochemical-safe-use-evaluation",
      title: "Evaluating a safe pesticide use training programme",
      client: "An agrochemical company’s stewardship team",
      region: "Andhra Pradesh & Maharashtra",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection"],
      methods: ["Farmer survey with observation", "Comparison group"],
      scope: "1,200 farmers",
      timeline: "8 weeks",
      challenge:
        "The company trained farmers on safe handling and spraying but did not know whether practices changed in the field.",
      approach:
        "We surveyed trained and untrained farmers about protective equipment, mixing, spraying and container disposal, and observed spraying practices on a sample of farms.",
      outcome:
        "Trained farmers were more likely to use gloves and masks, but container disposal practices rarely changed. The company added a container collection scheme to its programme.",
      learning: "Observation showed gaps that self-reported answers overstated.",
      verified: true,
    },
    {
      slug: "industrial-chemicals-pricing-research",
      title: "Testing price sensitivity for industrial cleaning chemicals",
      client: "An industrial cleaning chemicals company in Europe",
      region: "United Kingdom, France & Spain",
      markets: ["UK", "FR", "ES"],
      services: ["Quantitative research", "Business panel", "Financial modelling"],
      methods: ["B2B pricing survey", "Revenue model"],
      scope: "400 facility and procurement managers",
      timeline: "6 weeks",
      challenge:
        "The company planned to introduce concentrated products at a higher price per litre but lower cost per use, and wanted to know whether buyers would understand the value.",
      approach:
        "We surveyed facility and procurement managers using price-acceptance questions and value messaging tests, then modelled revenue scenarios.",
      outcome:
        "Buyers accepted higher unit prices when cost per use was shown clearly. The company launched concentrates with cost-per-use calculators for its sales team.",
      learning: "How value is expressed can matter as much as the price itself.",
      verified: true,
    },
    {
      slug: "chemical-distributor-portal",
      title: "A self-service ordering portal for chemical distributors",
      client: "A chemical manufacturer",
      region: "Pan-India distributor network",
      markets: ["IN"],
      services: ["Web application development", "ERP development", "API development & integration"],
      methods: ["Distributor interviews", "Portal with ERP integration"],
      scope: "180 distributors",
      timeline: "5 months",
      challenge:
        "Distributors placed orders and requested documents such as safety data sheets by email and phone, creating delays and errors.",
      approach:
        "We built a secure portal where distributors placed orders, tracked dispatches, downloaded invoices and safety documents, and viewed outstanding balances, integrated with the manufacturer’s ERP.",
      outcome:
        "Order processing became faster, document requests dropped sharply, and the sales team focused on growth instead of paperwork.",
      learning: "Self-service for routine tasks freed people for relationships.",
      verified: true,
    },
    {
      slug: "chemical-safety-culture-survey",
      title: "Measuring process safety culture across plants",
      client: "A bulk chemicals producer",
      region: "Three plants in Western India",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous survey", "Shift-team discussions"],
      scope: "1,400 employees and contractors",
      timeline: "7 weeks",
      challenge:
        "Leadership wanted an honest view of how employees perceived process safety, including whether people felt able to stop unsafe work.",
      approach:
        "We ran an anonymous survey in local languages on tablets across all shifts, including contractors, followed by discussions with shift teams.",
      outcome:
        "Night shifts and contractors reported less confidence in stopping work. The company introduced cross-shift safety walks and contractor representation on safety committees.",
      learning: "Reaching every shift was essential to an honest picture.",
      verified: true,
    },
    {
      slug: "specialty-chemicals-seo-content",
      title: "Helping technical buyers find a specialty chemical maker online",
      client: "A polymer additives manufacturer",
      region: "Buyers in the USA, Germany, Italy, Japan & Taiwan",
      markets: ["US", "DE", "IT", "JP", "TW"],
      services: ["SEO services", "Content marketing", "Website development"],
      methods: ["Technical content programme", "Website restructure"],
      scope: "Product and application content",
      timeline: "9 months",
      challenge:
        "The company’s products were listed only by code names, making them invisible to engineers searching for solutions to specific problems.",
      approach:
        "We restructured the website around applications and problems, created technical guides and comparison pages, and fixed technical SEO issues.",
      outcome:
        "Organic traffic from relevant technical searches grew, and the company received enquiries from international buyers who found it through application pages.",
      learning: "Buyers search for problems, not product codes.",
      verified: true,
    },
    {
      slug: "chemical-trader-gst-tds",
      title: "Getting GST and TDS compliance under control for a chemical trader",
      client: "A chemical trading company",
      region: "Maharashtra & Gujarat",
      markets: ["IN"],
      services: ["GST services", "TDS services", "Accounting & bookkeeping"],
      methods: ["Compliance review", "Monthly routine"],
      scope: "Two GST registrations, high transaction volume",
      timeline: "Ongoing",
      challenge:
        "Rapid growth had left the company with mismatched input tax credit, late TDS deposits and notices from authorities.",
      approach:
        "We reconciled past periods, prepared responses to notices, corrected filings and set up a monthly calendar with reconciliations before every return.",
      outcome:
        "Notices were resolved, missed credits were recovered where eligible, and returns are now filed on time after reconciliation.",
      learning: "Fixing the routine prevented the same problems from returning.",
      verified: true,
    },
    {
      slug: "water-treatment-chemicals-market-sizing",
      title: "Sizing the market for water treatment chemicals in industry",
      client: "A water treatment chemicals company expanding in the Gulf",
      region: "Saudi Arabia, UAE, Qatar & Egypt",
      markets: ["SA", "AE", "QA", "EG"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Desk research", "Expert interviews", "Bottom-up model"],
      scope: "35 expert interviews across six industries",
      timeline: "7 weeks",
      challenge:
        "The company wanted to prioritise industries for growth but lacked reliable estimates of demand by sector.",
      approach:
        "We combined industry data with interviews with plant engineers and treatment specialists to estimate consumption by industry, then built a transparent model with key assumptions.",
      outcome:
        "Desalination, food processing and district cooling showed the strongest growth potential relative to competition. The company focused its sales expansion on those sectors.",
      learning: "Transparent assumptions made the model useful for planning, not just reporting.",
      verified: true,
    },
  ],
  CHEMICAL_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: CHEMICAL_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  CONSTRUCTION_CASES = [
    {
      slug: "cement-mason-influence-study",
      title: "How masons and contractors influence cement brand choice",
      client: "A cement manufacturer",
      region: "Rural and semi-urban markets in six states",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Mason and contractor interviews at sites", "Homebuilder survey"],
      scope: "1,200 masons and contractors, 800 homebuilders",
      timeline: "8 weeks",
      challenge:
        "The manufacturer’s advertising targeted homebuilders, but sales teams believed masons made most brand decisions for individual homes.",
      approach:
        "Interviewers visited construction sites to speak with masons and contractors about brand choices and recommendations, and surveyed homebuilders about who decided which brand to buy.",
      outcome:
        "Masons heavily influenced brand choice, especially for first-time builders. The manufacturer expanded its mason training and recognition programme and created simple guides masons could share with homeowners.",
      learning: "In home building, the trusted craftsman often decides.",
      verified: true,
    },
    {
      slug: "homebuyer-research-real-estate-project",
      title: "Designing a housing project around buyer needs",
      client: "A residential developer in South Africa",
      region: "Johannesburg & Cape Town",
      markets: ["ZA"],
      services: ["Quantitative research", "Qualitative research", "Research consultancy"],
      methods: ["Prospective buyer survey", "Group discussions"],
      scope: "800 prospective buyers, 8 discussions",
      timeline: "6 weeks",
      challenge:
        "The developer was planning a mid-income project and wanted to get unit sizes, amenities and pricing right before finalising designs.",
      approach:
        "We surveyed people planning to buy within two years about budgets, unit preferences, amenities and commute needs, and tested layout options in group discussions.",
      outcome:
        "Buyers valued efficient layouts and work-from-home space over large clubhouses. The developer adjusted unit mixes and reduced costly amenities.",
      learning: "Asking buyers before design avoided expensive features they did not value.",
      verified: true,
    },
    {
      slug: "construction-site-safety-evaluation",
      title: "Evaluating a safety programme on construction sites",
      client: "An infrastructure construction company",
      region: "Highway and metro projects in Saudi Arabia & the UAE",
      markets: ["SA", "AE"],
      services: ["Quantitative research", "Offline data collection", "Reporting & insights"],
      methods: ["Site safety observations", "Worker interviews"],
      scope: "20 sites, 900 workers",
      timeline: "8 weeks",
      challenge:
        "The company had introduced a safety training programme and wanted independent evidence of whether practices on site had changed.",
      approach:
        "Trained observers recorded safety practices against a checklist at different times of day, and interviewers spoke privately with workers, including migrant workers in Arabic, Hindi, Urdu, Tagalog and Nepali.",
      outcome:
        "Helmet use was high, but fall protection and safe access practices varied widely. The company focused supervision on working-at-height activities.",
      learning: "Observations at different times revealed patterns a single visit would miss.",
      verified: true,
    },
    {
      slug: "building-materials-dealer-network",
      title: "Strengthening a tile brand’s dealer network",
      client: "A ceramic tiles manufacturer",
      region: "20 cities in Spain, Italy & Morocco",
      markets: ["ES", "IT", "MA"],
      services: ["Business panel", "Offline data collection (CATI)", "Data analytics & dashboards"],
      methods: ["Dealer survey", "Dealer dashboard"],
      scope: "700 dealers",
      timeline: "6 weeks",
      challenge:
        "The manufacturer faced rising competition and wanted to understand what its dealers needed to promote the brand more actively.",
      approach:
        "We surveyed dealers about display support, delivery reliability, schemes, credit and architect relationships, presenting results by region.",
      outcome:
        "Delivery reliability and display support were weakest in fast-growing cities. The manufacturer improved logistics and display programmes there.",
      learning: "Dealer priorities differed sharply by region.",
      verified: true,
    },
    {
      slug: "architect-specification-research",
      title: "Understanding how architects specify building products",
      client: "A building facade systems company in Europe",
      region: "London, Paris, Berlin, Zurich & Milan",
      markets: ["UK", "FR", "DE", "CH", "IT"],
      services: ["Qualitative research", "Business panel", "Content marketing"],
      methods: ["Architect interviews", "Specification content"],
      scope: "35 architect and consultant interviews",
      timeline: "7 weeks",
      challenge:
        "The company’s products were rarely specified in early design stages, leaving it to compete on price later.",
      approach:
        "We interviewed architects and facade consultants about how and when they choose systems, what information they need and which sources they trust.",
      outcome:
        "Architects wanted ready-to-use technical details, test certificates and design guidance early. The company created a specification library and design-support service.",
      learning: "Being present early in the design process changed the sales conversation.",
      verified: true,
    },
    {
      slug: "construction-project-cost-mis",
      title: "Project-wise cost visibility for a construction company",
      client: "A mid-sized construction contractor",
      region: "Karnataka",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Accounting & finance consulting", "Data analytics & dashboards"],
      methods: ["Cost tracking redesign", "Project dashboards"],
      scope: "25 active projects",
      timeline: "4 months",
      challenge:
        "Management only discovered cost overruns when projects ended, because costs were not tracked consistently by project.",
      approach:
        "We restructured accounts with project codes, introduced monthly cost-to-complete reviews and built dashboards comparing budgets with actual costs by project.",
      outcome:
        "Overruns became visible early enough to act, and the company improved its bidding by learning from completed projects.",
      learning: "Monthly project-level visibility changed how projects were managed.",
      verified: true,
    },
    {
      slug: "smart-city-citizen-survey",
      title: "Citizen feedback on urban infrastructure projects",
      client: "A smart city mission office",
      region: "A tier-2 city",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Household survey", "Ward-level analysis"],
      scope: "3,000 households",
      timeline: "8 weeks",
      challenge:
        "The city had completed several infrastructure projects and wanted to understand citizens’ satisfaction and priorities for the next phase.",
      approach:
        "We surveyed households across all wards about roads, footpaths, drainage, lighting and public spaces, with results analysed by ward.",
      outcome:
        "Drainage and footpaths remained top priorities in older wards. The city adjusted its next-phase plans to prioritise those wards.",
      learning: "Ward-level results guided targeted decisions.",
      verified: true,
    },
    {
      slug: "construction-equipment-rental-lead-gen",
      title: "Generating enquiries for construction equipment rental",
      client: "A construction equipment rental company",
      region: "Maharashtra & Gujarat",
      markets: ["IN"],
      services: ["Google Ads / PPC", "Landing page & CRO", "Lead generation"],
      methods: ["Search campaigns", "Equipment-specific landing pages"],
      scope: "Campaigns for 12 equipment categories",
      timeline: "6 months",
      challenge: "Most rental enquiries came by word of mouth, limiting growth in new regions.",
      approach:
        "We built landing pages for each equipment type with availability, specifications and quick quote forms, and launched search campaigns for location-specific rental searches.",
      outcome:
        "Enquiries from new regions grew, and the sales team could see which equipment categories generated demand.",
      learning: "Specific landing pages matched how contractors search.",
      verified: true,
    },
    {
      slug: "construction-workforce-migration-study",
      title: "Understanding the lives of migrant construction workers",
      client: "A labour welfare foundation",
      region: "Delhi NCR & Bengaluru",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Government research"],
      methods: ["Worker survey at sites and settlements", "In-depth interviews"],
      scope: "1,500 workers, 40 interviews",
      timeline: "9 weeks",
      challenge:
        "The foundation wanted to design welfare services for migrant construction workers but lacked data on their living conditions and access to benefits.",
      approach:
        "Interviewers speaking workers’ home languages surveyed workers about housing, wages, health, children’s education and welfare registration, with careful consent procedures.",
      outcome:
        "Few workers were registered for welfare benefits, mainly due to documentation barriers. The foundation set up registration camps at sites.",
      learning: "Language and trust were essential to reaching this workforce.",
      verified: true,
    },
    {
      slug: "construction-firm-erp",
      title: "An ERP for purchasing and site inventory",
      client: "A construction company",
      region: "Telangana",
      markets: ["IN"],
      services: ["ERP development", "Mobile app development", "API development & integration"],
      methods: ["Process mapping", "Site stores app"],
      scope: "15 sites, central purchasing",
      timeline: "6 months",
      challenge:
        "Materials were ordered by phone and tracked in registers at sites, leading to shortages, excess stock and pilferage.",
      approach:
        "We implemented purchasing and inventory modules with a mobile app for site storekeepers to record receipts and issues, linked to central purchasing and accounts.",
      outcome:
        "Material visibility across sites improved, transfers between sites reduced purchases, and stock discrepancies fell.",
      learning: "A simple mobile tool for storekeepers made the system work on site.",
      verified: true,
    },
  ],
  CONSTRUCTION_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: CONSTRUCTION_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  DEFENSE_CASES = [
    {
      slug: "defence-msme-supplier-readiness",
      title: "Assessing small manufacturers’ readiness to supply the defence sector",
      client: "An industry development body",
      region: "Uttar Pradesh & Tamil Nadu industrial corridors",
      markets: ["IN"],
      services: ["Business panel", "Quantitative research", "Research consultancy"],
      methods: ["MSME survey", "Capability interviews"],
      scope: "400 manufacturers, 30 interviews",
      timeline: "9 weeks",
      challenge:
        "The body wanted more small manufacturers to participate in defence supply chains but did not know their capabilities, certifications or the barriers they faced.",
      approach:
        "We surveyed manufacturers about capabilities, quality certifications, registration status and experience with procurement processes, and interviewed owners about barriers in depth.",
      outcome:
        "Quality certification costs and unfamiliarity with procurement processes were the main barriers. The body launched certification support and procurement awareness workshops.",
      learning: "Many capable firms were held back by process knowledge rather than technical ability.",
      verified: true,
    },
    {
      slug: "veteran-resettlement-study",
      title: "Understanding the second-career needs of retiring service personnel",
      client: "A veterans’ welfare organisation",
      region: "United Kingdom & Canada",
      markets: ["UK", "CA"],
      services: ["Quantitative research", "Qualitative research", "Offline data collection (CATI)"],
      methods: ["Veteran survey", "In-depth interviews"],
      scope: "1,500 veterans, 40 interviews",
      timeline: "8 weeks",
      challenge:
        "Many personnel retire in their late thirties or forties and seek second careers. The organisation wanted to understand their aspirations and the support that would help most.",
      approach:
        "We surveyed recently retired veterans by telephone about employment, training, finances and family priorities, and interviewed veterans who had transitioned successfully and those who had struggled.",
      outcome:
        "Veterans valued skills recognition and employer networks more than generic training. The organisation built partnerships with employers and a skills-mapping service.",
      learning: "Translating military experience into civilian terms was the biggest gap.",
      verified: true,
    },
    {
      slug: "defence-psu-customer-satisfaction",
      title: "Measuring customer satisfaction for a public sector manufacturer",
      client: "A public sector engineering undertaking",
      region: "India",
      markets: ["IN"],
      services: ["Business panel", "Quantitative research", "Reporting & insights"],
      methods: ["Structured customer interviews"],
      scope: "60 customer organisations",
      timeline: "7 weeks",
      challenge:
        "The undertaking wanted structured feedback from its institutional customers on product quality, delivery, documentation and after-sales support.",
      approach:
        "We conducted confidential structured interviews with customer representatives, covering satisfaction across the customer lifecycle, with strict information-handling protocols.",
      outcome:
        "After-sales spares availability emerged as the main improvement area. The undertaking set up a dedicated spares coordination cell.",
      learning: "Confidential, independent interviews encouraged candid feedback.",
      verified: true,
    },
    {
      slug: "defence-careers-youth-perception",
      title: "What young people think about careers in the armed forces",
      client: "A recruitment outreach programme",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "Social media marketing"],
      methods: ["Survey of young adults", "Message testing"],
      scope: "2,500 young adults aged 18–24",
      timeline: "6 weeks",
      challenge:
        "The programme wanted to understand awareness of career options, perceptions and concerns among young adults, to improve outreach.",
      approach:
        "We surveyed young adults about career aspirations, awareness of entry routes, perceptions of service life and preferred information sources, and tested outreach messages.",
      outcome:
        "Awareness of technical and officer entry routes was low, especially among young women. The programme developed targeted content on career paths and eligibility.",
      learning: "Specific information about pathways mattered more than general inspiration.",
      verified: true,
    },
    {
      slug: "ex-servicemen-health-scheme-feedback",
      title: "Feedback from ex-servicemen on healthcare scheme services",
      client: "A welfare administration body",
      region: "Ten states",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CATI & CAPI)", "Data analytics & dashboards"],
      methods: ["Beneficiary survey", "Polyclinic visits"],
      scope: "3,000 beneficiaries, 40 clinics",
      timeline: "9 weeks",
      challenge:
        "The body wanted independent feedback on beneficiaries’ experiences with clinics, referrals and reimbursements.",
      approach:
        "We surveyed beneficiaries by phone and in person, including elderly and rural members, and observed processes at clinics. Results were presented by region.",
      outcome:
        "Referral delays and reimbursement processing were the main frustrations. The body streamlined referral procedures and introduced status tracking for claims.",
      learning: "Including elderly and rural beneficiaries in person gave a fairer picture.",
      verified: true,
    },
    {
      slug: "defence-exhibition-visitor-research",
      title: "Evaluating a defence industry exhibition",
      client: "An exhibition organiser in the Gulf",
      region: "United Arab Emirates & Saudi Arabia",
      markets: ["AE", "SA"],
      services: ["Quantitative research", "Offline data collection", "Reporting & insights"],
      methods: ["Exhibitor and visitor surveys"],
      scope: "300 exhibitors, 1,200 visitors",
      timeline: "4 weeks",
      challenge:
        "The organiser wanted to measure the value of the exhibition for exhibitors and visitors and improve the next edition.",
      approach:
        "We surveyed exhibitors and business visitors during and after the event about meetings, leads, logistics and overall value.",
      outcome:
        "Exhibitors valued structured buyer-seller meetings most, while visitors wanted better scheduling. The organiser expanded a pre-booked meeting system.",
      learning: "Measuring both sides of the marketplace improved the event design.",
      verified: true,
    },
    {
      slug: "cantonment-civic-services-survey",
      title: "Resident satisfaction with civic services in cantonment areas",
      client: "A civic administration body",
      region: "Four cantonment areas",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Household survey"],
      scope: "2,000 households",
      timeline: "7 weeks",
      challenge:
        "The administration wanted to understand residents’ satisfaction with water, sanitation, roads and grievance services.",
      approach:
        "We surveyed civilian households about service quality, reliability and grievance experiences, with results analysed by area.",
      outcome:
        "Grievance resolution timelines were the weakest area. The administration introduced online grievance tracking and response-time standards.",
      learning: "Residents valued responsiveness as much as service quality.",
      verified: true,
    },
    {
      slug: "defence-family-welfare-study",
      title: "Understanding the needs of families of serving personnel",
      client: "A welfare association",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["Spouse interviews", "Online survey"],
      scope: "40 interviews, 1,200 survey responses",
      timeline: "8 weeks",
      challenge:
        "Frequent relocations affect families’ education, employment and wellbeing. The association wanted to understand priorities for support.",
      approach:
        "We interviewed spouses about relocation, children’s schooling, employment and support networks, and surveyed a wider group to prioritise needs.",
      outcome:
        "Spousal employment and children’s school transitions were top concerns. The association launched remote-work skills programmes and school transition guidance.",
      learning: "Family wellbeing depended heavily on continuity during moves.",
      verified: true,
    },
    {
      slug: "defence-supplier-portal",
      title: "A vendor registration and tracking portal for a public sector buyer",
      client: "A public sector procurement organisation",
      region: "India",
      markets: ["IN"],
      services: ["Web application development", "Cybersecurity services", "Software testing & QA"],
      methods: ["Requirements workshops", "Secure portal"],
      scope: "Supplier registration and query tracking",
      timeline: "6 months",
      challenge:
        "Suppliers registered by submitting paper documents and had little visibility of their application status, leading to delays and repeated queries.",
      approach:
        "We built a secure web portal for supplier registration, document upload and status tracking, with role-based access, audit logs and security testing before launch.",
      outcome:
        "Registration became faster and more transparent, and query volumes reduced. Security reviews were completed before go-live.",
      learning: "Security and usability had to be designed together from the start.",
      verified: true,
    },
    {
      slug: "defence-skills-training-evaluation",
      title: "Evaluating a skills programme for veterans entering industry",
      client: "A skills development organisation",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Trainee tracer survey", "Employer interviews"],
      scope: "800 trainees, 40 employers",
      timeline: "8 weeks",
      challenge: "The organisation wanted to know whether its training helped veterans find and keep civilian jobs.",
      approach:
        "We traced trainees six to twelve months after completion to record employment and earnings, and interviewed employers about job readiness.",
      outcome:
        "Placement was strongest in security, logistics and facility management, and weaker in technical roles. The programme added industry certifications to technical tracks.",
      learning: "Tracer studies showed real outcomes beyond placement figures.",
      verified: true,
    },
  ],
  DEFENSE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: DEFENSE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  ELECTRIC_POWER_CASES = [
    {
      slug: "discom-consumer-satisfaction-survey",
      title: "A consumer satisfaction survey for a power distribution company",
      client: "A state electricity distribution company",
      region: "Uttar Pradesh",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Household and small business survey", "Circle-level dashboard"],
      scope: "6,000 consumers across 20 circles",
      timeline: "10 weeks",
      challenge:
        "The distribution company faced complaints about outages, billing errors and slow service, but it had no consistent measure of consumer satisfaction across its circles. Management wanted evidence to prioritise investments and to track progress after reforms.",
      approach:
        "Interviewers surveyed households, shops and small businesses about supply hours, voltage quality, outage communication, billing accuracy, payment options and complaint handling. The sample covered urban and rural feeders in every circle, and results were shown on a dashboard by circle, consumer category and feeder type.",
      outcome:
        "Billing accuracy and outage communication drove dissatisfaction more than supply hours in urban areas, while rural consumers were most concerned about voltage and evening outages. The company introduced SMS outage alerts, corrected billing processes in the worst-performing circles and set satisfaction targets for circle managers. A second wave a year later showed improvements in the circles where reforms had been implemented.",
      learning: "Consumers forgave some outages when they were kept informed.",
      verified: true,
    },
    {
      slug: "smart-meter-rollout-perception",
      title: "Understanding consumer concerns before a smart meter rollout",
      client: "A power distribution utility",
      region: "Delhi NCR & Haryana",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Content marketing"],
      methods: ["Consumer survey", "Group discussions", "Message testing"],
      scope: "2,500 consumers, 12 discussions",
      timeline: "7 weeks",
      challenge:
        "The utility planned to install prepaid smart meters but had seen protests in other regions, where consumers believed the meters ran faster or would disconnect them without warning.",
      approach:
        "We surveyed consumers about their understanding of smart and prepaid meters, concerns about bills and disconnections, and preferred communication channels. Group discussions explored fears in depth and tested draft messages and explanatory materials. The sample covered apartments, independent houses and small shops, since concerns differed by consumer type.",
      outcome:
        "The biggest fears were sudden disconnection and lack of balance information. The utility added low-balance alerts, an emergency credit feature and a meter testing facility, and built its communication campaign around these reassurances. Installation proceeded with far fewer complaints than in comparable rollouts elsewhere. Customer satisfaction scores in pilot areas remained stable through the transition.",
      learning: "Addressing specific fears in advance prevented resistance.",
      verified: true,
    },
    {
      slug: "energy-retailer-switching-study-uk",
      title: "Why households switch, or stay with, their energy supplier",
      client: "An energy retailer",
      region: "United Kingdom",
      markets: ["UK"],
      services: ["Consumer panel", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Online survey", "Churn driver analysis"],
      scope: "3,000 bill payers",
      timeline: "6 weeks",
      challenge:
        "Following a period of high energy prices and supplier failures, the retailer wanted to understand what customers valued, how much they trusted suppliers and what would make them switch when the market reopened to competition.",
      approach:
        "We surveyed bill payers about satisfaction, trust, price sensitivity, customer service and switching intentions, and combined the results with the retailer’s churn data to identify the strongest drivers of leaving. The sample was weighted to reflect tariff types, payment methods and regions.",
      outcome:
        "Billing accuracy and easy contact mattered more than small price differences for most customers. The retailer invested in billing quality and digital self-service, and focused retention offers on the small group most likely to switch for price. The retailer repeated the survey six months later to measure the effect of its service improvements on trust and retention.",
      learning: "Trust and service kept customers more reliably than discounts.",
      verified: true,
    },
    {
      slug: "power-utility-field-workforce-app",
      title: "A field app for line maintenance crews",
      client: "A power distribution company",
      region: "Gujarat",
      markets: ["IN"],
      services: ["Mobile app development", "Data analytics & dashboards", "API development & integration"],
      methods: ["Crew interviews", "Offline-first app", "Fault dashboard"],
      scope: "900 linemen and supervisors",
      timeline: "6 months",
      challenge:
        "Fault complaints were passed to crews by phone, and work completion was recorded on paper. Managers could not see restoration times or crew workloads. Consumers often called repeatedly because they had no idea when crews would arrive.",
      approach:
        "We interviewed linemen and supervisors, then built an offline-first app in Gujarati and English for receiving faults, recording work with photos and closing complaints, integrated with the complaint system and a dashboard. The app also sent automatic SMS updates to consumers when a crew was assigned and when the fault was resolved. Offline operation was essential in rural areas, and data synchronised automatically when crews returned to coverage.",
      outcome:
        "Restoration times became measurable by area, complaints were closed with evidence and managers redistributed crews based on workload. Repeat complaint calls fell as consumers received updates.",
      learning: "A simple app designed for line crews created data management had never had.",
      verified: true,
    },
    {
      slug: "rooftop-solar-net-metering-study",
      title: "Why households hesitate to install rooftop solar",
      client: "An electricity regulator’s consumer advocacy unit",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "Installer interviews"],
      scope: "2,000 households, 30 installer interviews",
      timeline: "8 weeks",
      challenge:
        "Frequent power cuts had increased interest in rooftop solar, but uptake remained concentrated among wealthier households. The unit wanted to understand barriers for middle-income households. Households also struggled to compare quotes and understand how much they would actually save.",
      approach:
        "We surveyed households about electricity spending, outage experiences, awareness of solar options, financing and trust in installers, and interviewed installers about customer concerns and approval processes. Interviews were conducted in English, isiZulu, isiXhosa and Afrikaans, with quotas by income band and housing type.",
      outcome:
        "Upfront cost, uncertainty about connection rules and fear of poor-quality installers were the main barriers. The unit recommended clearer connection guidelines, an installer accreditation list and financing partnerships. Several municipalities used the findings to simplify their approval processes. The unit also published a simple consumer guide to rooftop solar.",
      learning: "Trust in installers was as important as financing.",
      verified: true,
    },
    {
      slug: "power-plant-community-csr",
      title: "Evaluating community programmes around a thermal power plant",
      client: "A power generation company",
      region: "Chhattisgarh",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Reporting & insights"],
      methods: ["Household survey", "Programme review"],
      scope: "1,500 households in 20 villages",
      timeline: "8 weeks",
      challenge:
        "The company funded health, education and livelihood programmes around its plant and wanted to know which made a real difference to families. Community expectations were rising, and the company wanted to direct its budget where it had the greatest impact.",
      approach:
        "We surveyed households in programme and comparison villages about health service use, schooling and incomes, and reviewed programme records. Group discussions with women and young people explored priorities for future programmes and how existing ones could improve. Interviews were conducted in Hindi and Chhattisgarhi by local field teams, with GPS-tagged interviews and back-checks.",
      outcome:
        "Mobile health clinics and school support were valued and well used, while livelihood training had little effect. The company redirected livelihood funding into market-linked skills programmes. The company also set up a community advisory group to guide future CSR decisions.",
      learning: "Comparison villages made impact claims credible.",
      verified: true,
    },
    {
      slug: "utility-billing-chatbot",
      title: "A WhatsApp assistant for electricity bill queries",
      client: "A power distribution utility",
      region: "Malaysia",
      markets: ["MY"],
      services: ["AI & automation solutions", "WhatsApp marketing", "API development & integration"],
      methods: ["Contact reason analysis", "WhatsApp assistant"],
      scope: "Bill, payment and outage queries",
      timeline: "4 months",
      challenge:
        "Call centres were overwhelmed by routine questions about bills, payments and outages, especially during storms. Customers often waited a long time on hold just to check their bill amount or report an outage.",
      approach:
        "We analysed contact reasons and built a WhatsApp assistant in Malay and English connected to billing and outage systems, handing complex cases to agents. The assistant was trained on approved answers, tested with customers before launch and designed to hand over to agents with the full conversation history.",
      outcome:
        "Routine queries moved to self-service, waiting times fell and customers could check outage status instantly. Agents spent more time on complex cases such as billing disputes and new connections. During storms, the assistant handled outage queries at scale, reducing pressure on call centres when it was highest.",
      learning: "Connecting the assistant to live systems made it genuinely useful.",
      verified: true,
    },
    {
      slug: "transmission-line-route-perception",
      title: "Landowner perceptions along a new transmission line route",
      client: "A transmission company",
      region: "Germany",
      markets: ["DE"],
      services: ["Qualitative research", "Quantitative research", "Research consultancy"],
      methods: ["Landowner interviews", "Resident survey"],
      scope: "60 interviews, 1,200 residents",
      timeline: "9 weeks",
      challenge:
        "A new high-voltage line was facing local opposition. The company needed to understand concerns of landowners and residents to improve consultation and compensation. The project was important for bringing renewable power from the north to industrial regions in the south.",
      approach:
        "We interviewed landowners and farmers along proposed routes and surveyed residents about concerns, information needs and trust in the planning process. Interviews were conducted in German, and the survey covered residents in each municipality along all route options.",
      outcome:
        "Concerns focused on landscape impact and unclear compensation. The company published route alternatives with visualisations and a transparent compensation framework. Participation in public consultations increased, and objections focused more on specific route details than on the project as a whole. The company also introduced a local information office along the route, staffed during planning hearings.",
      learning: "Clear options and visuals improved the quality of consultation.",
      verified: true,
    },
    {
      slug: "power-company-regulatory-finance",
      title: "Strengthening regulatory financial reporting for a utility",
      client: "A private power distribution licensee",
      region: "Maharashtra",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Accounting & finance consulting", "Data analytics & dashboards"],
      methods: ["Reporting process review", "Regulatory reporting templates"],
      scope: "Tariff and true-up filings",
      timeline: "5 months",
      challenge:
        "Tariff filings required detailed cost and revenue data, but information came from several systems and was assembled manually under time pressure. Errors or delays in filings risked unfavourable tariff decisions and regulatory queries. Information was also requested repeatedly by the regulator because figures differed between submissions.",
      approach:
        "We mapped data sources, standardised definitions, automated key reports and created templates aligned with regulatory formats. Finance and operations staff agreed definitions for each cost and revenue line, documented in a short data dictionary. Templates included automated checks to flag inconsistencies before filings were submitted.",
      outcome:
        "Filings were prepared faster with fewer queries, and management gained monthly visibility of costs against approved levels. The regulatory team also used monthly reports to prepare for the next filing well in advance. Management also gained a clearer picture of which cost categories were running above approved levels during the year.",
      learning: "Consistent data definitions made regulatory reporting routine.",
      verified: true,
    },
    {
      slug: "ev-tariff-consumer-research",
      title: "Designing electricity tariffs for EV owners",
      client: "An electricity retailer",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Quantitative research", "Consumer panel", "Financial modelling"],
      methods: ["EV owner survey with choice exercise", "Tariff revenue model"],
      scope: "1,200 EV owners and intenders",
      timeline: "6 weeks",
      challenge:
        "The retailer wanted to offer EV tariffs but needed to know how owners charged their cars and which tariff designs they would choose. Electricity networks were concerned about EVs charging at peak times, adding stress to the grid.",
      approach:
        "We surveyed EV owners and intenders about charging times and habits, and used a choice exercise comparing time-of-use, off-peak and subscription tariffs, then modelled revenue impacts. The sample included owners in apartments and houses, since charging access differed significantly. Results were analysed separately for Australia and New Zealand, where tariff structures differ.",
      outcome:
        "Owners preferred simple overnight rates with a fixed discount. The retailer launched an overnight EV plan and promoted smart charging. Sign-ups exceeded the retailer’s first-year target, and most customers shifted charging to overnight hours.",
      learning: "Simple tariffs won over complex but cheaper options.",
      verified: true,
    },
  ],
  ELECTRIC_POWER_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: ELECTRIC_POWER_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  ELECTRONICS_CASES = [
    {
      slug: "smartphone-buyer-journey-tier2",
      title: "How smartphone buyers in smaller cities choose their next phone",
      client: "A smartphone brand",
      region: "20 tier-2 and tier-3 cities",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Mixed online and face-to-face survey", "Retailer interviews"],
      scope: "3,000 recent buyers, 300 mobile retailers",
      timeline: "8 weeks",
      challenge:
        "The brand was growing in metros but losing share in smaller cities, where offline mobile shops still dominated sales. Marketing teams were unsure whether the problem lay in product, price, retailer support or brand awareness.",
      approach:
        "We surveyed recent smartphone buyers, combining our online panel with face-to-face interviews near mobile markets to include buyers less active online. Questions covered research sources, shops visited, retailer advice, financing and the final decision. We also interviewed retailers about margins, demo units and which brands they recommended and why.",
      outcome:
        "Retailer recommendations and easy financing options decided many purchases, and competitors offered stronger in-store support. The brand increased demo units, introduced simple EMI options through partners and trained retail staff, concentrating on cities where it had lost the most share.",
      learning: "In offline-led markets, the shopkeeper’s recommendation can outweigh online reviews and advertising.",
      verified: true,
    },
    {
      slug: "appliance-after-sales-service-tracker",
      title: "An after-sales service tracker for a home appliance brand",
      client: "A consumer appliances company",
      region: "India, UAE & Saudi Arabia",
      markets: ["IN", "AE", "SA"],
      services: ["Offline data collection (CATI)", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Post-service telephone survey", "Driver analysis", "Monthly dashboard"],
      scope: "5,000 service customers a month",
      timeline: "Ongoing monthly programme",
      challenge:
        "Complaints about service visits for air conditioners, refrigerators and washing machines were rising, especially during summer peaks. The company could not see which service partners or regions were responsible, or which parts of the visit customers disliked most.",
      approach:
        "Our telephone team called customers within a few days of each service visit, asking about booking, technician punctuality, explanation of the fault, cost transparency, repair quality and overall satisfaction. Driver analysis identified what most influenced satisfaction, and results were shown on a dashboard by city, product and service partner.",
      outcome:
        "Missed appointment windows and unclear charges drove most dissatisfaction, not repair quality. The company introduced SMS updates with technician arrival times, transparent rate cards and partner scorecards linked to these measures, then tracked improvement month by month.",
      learning: "Customers judged the service experience as much on communication as on the repair itself.",
      verified: true,
    },
    {
      slug: "electronics-retail-mystery-shopping",
      title: "Mystery shopping large-format electronics stores",
      client: "A television and audio brand",
      region: "15 cities across Germany, France, Italy & Spain",
      markets: ["DE", "FR", "IT", "ES"],
      services: ["Offline data collection", "Reporting & insights", "Data analytics & dashboards"],
      methods: ["Mystery shopping visits", "Store-level scorecards"],
      scope: "600 store visits per wave",
      timeline: "Two waves a year",
      challenge:
        "The brand invested in in-store promoters and displays at electronics chains but suspected that sales staff often steered shoppers towards competing brands with better incentives.",
      approach:
        "Trained mystery shoppers posed as customers looking for a new television, recording which brands were recommended, how well features were explained, display condition and promoter presence. Each visit was scored consistently and results were shared as store scorecards. Shoppers followed a consistent script, and a share of visits were repeated by a second shopper to check that scoring was reliable.",
      outcome:
        "Recommendations depended heavily on promoter presence and the incentives offered by chains. The brand redesigned its incentive structure, improved product training and focused promoter coverage on the highest-traffic stores. Store-level scores in the following wave showed recommendations improving in stores where promoters had received the new training.",
      learning: "Measuring what happens on the shop floor revealed the real return on promotional spending.",
      verified: true,
    },
    {
      slug: "electronics-product-concept-test",
      title: "Testing new smart home product concepts",
      client: "A consumer electronics start-up in East Asia",
      region: "Tokyo, Osaka, Taipei & Hong Kong",
      markets: ["JP", "TW", "HK"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online concept test", "In-home interviews"],
      scope: "1,200 online respondents, 20 in-home interviews",
      timeline: "6 weeks",
      challenge:
        "The start-up had several smart home product ideas, from security cameras to energy monitors, but limited funds to develop only one or two. Founders disagreed about which concept had the strongest potential.",
      approach:
        "Each respondent saw one concept with a realistic description and price, rating appeal, uniqueness, believability and purchase intent. In-home interviews explored where devices would fit in daily routines and what concerns people had about privacy and installation.",
      outcome:
        "An affordable smart energy monitor tested strongest, especially among families worried about electricity bills, while security cameras faced strong competition and privacy concerns. The start-up focused development on the energy monitor and simplified installation. Follow-up interviews with early prototype users later confirmed that simple setup was the feature people valued most.",
      learning:
        "Testing concepts monadically gave each idea a fair hearing and settled an internal debate with evidence.",
      verified: true,
    },
    {
      slug: "electronics-manufacturing-erp",
      title: "Connecting production, stock and quality data in an electronics plant",
      client: "An electronics contract manufacturer",
      region: "Noida",
      markets: ["IN"],
      services: ["ERP development", "Custom business applications", "Data analytics & dashboards"],
      methods: ["Process mapping", "ERP with barcode traceability", "Quality dashboard"],
      scope: "Two SMT lines and assembly area",
      timeline: "7 months",
      challenge:
        "The manufacturer built products for several brands, each with strict traceability and quality requirements. Component stock, production batches and test results were recorded in separate systems, making customer audits slow and stressful.",
      approach:
        "We implemented an ERP covering purchasing, inventory and production, with barcode labels tracking components and boards through each process step. A quality module recorded test results and defects, linked to batches, with dashboards for yield and defect trends. Operators were involved in designing the scanning steps so that traceability added seconds, not minutes, to each process on the line.",
      outcome:
        "The manufacturer could trace any finished product back to component lots and test results within minutes, customer audits became routine, and defect trends were visible daily rather than at month end. Production planners also used the yield data to schedule maintenance on machines whose defect rates were starting to rise.",
      learning: "Traceability built into daily operations made compliance almost automatic.",
      verified: true,
    },
    {
      slug: "electronics-ecommerce-growth",
      title: "Growing direct online sales for an audio accessories brand",
      client: "An audio accessories brand",
      region: "United States, Canada & United Kingdom",
      markets: ["US", "CA", "UK"],
      services: ["E-commerce marketing", "Performance marketing", "Landing page & CRO"],
      methods: ["Checkout optimisation", "Creative testing", "Retention journeys"],
      scope: "Own website and marketplace stores",
      timeline: "6 months",
      challenge:
        "The brand sold mainly through marketplaces, paying high commissions and owning little customer data. Its own website attracted traffic from ads but converted poorly.",
      approach:
        "We improved product pages with clearer specifications and comparison charts, simplified checkout and fixed tracking. Creative testing on social platforms focused on real usage scenarios, and post-purchase journeys encouraged reviews and accessory purchases. Customer reviews and questions from marketplaces were analysed to understand what buyers worried about, and those answers were built into product pages.",
      outcome:
        "Website conversion improved and direct sales grew as a share of revenue, with better margins and growing repeat purchases. The brand now uses marketplaces for reach and its site for loyalty. Customer data from the website also guided new product development, as the team could see which accessories people bought together.",
      learning: "Clear comparisons helped buyers choose confidently without leaving for a marketplace.",
      verified: true,
    },
    {
      slug: "e-waste-consumer-behaviour-study",
      title: "What households do with old electronics",
      client: "An e-waste recycling company",
      region: "Eight cities in South Africa & Morocco",
      markets: ["ZA", "MA"],
      services: ["Consumer panel", "Quantitative research", "Content marketing"],
      methods: ["Household survey", "Message testing"],
      scope: "2,000 households",
      timeline: "6 weeks",
      challenge:
        "Most old phones, chargers and appliances were stored at home or sold to informal collectors. The company wanted to understand why and how to encourage responsible recycling.",
      approach:
        "We surveyed households about old devices at home, disposal habits, data privacy concerns and awareness of recycling options, then tested messages encouraging drop-offs and pick-ups. We asked households to count the old devices they had at home during the interview, which produced far more accurate figures than estimates from memory.",
      outcome:
        "Data privacy worries and lack of convenient options kept phones in drawers. The company launched doorstep pick-ups with certified data wiping and built its campaign around that reassurance. Pick-up requests grew as the reassurance message spread, and the company used survey data to plan collection routes in the neighbourhoods with the most stored devices.",
      learning: "Addressing the specific fear unlocked behaviour change.",
      verified: true,
    },
    {
      slug: "electronics-distributor-portal",
      title: "A distributor portal for an electronics components supplier",
      client: "An electronics components distributor",
      region: "India",
      markets: ["IN"],
      services: ["Web application development", "API development & integration", "Software testing & QA"],
      methods: ["Customer interviews", "Ordering portal with ERP integration"],
      scope: "1,500 business customers",
      timeline: "5 months",
      challenge:
        "Business customers emailed requests for stock, pricing and datasheets, waiting hours for responses. Sales staff spent most of their time answering routine queries. Customers designing new products often needed answers within minutes and would turn to competitors if they waited too long.",
      approach:
        "We built a portal showing live stock, customer-specific pricing, datasheets and order tracking, integrated with the distributor’s ERP, and tested it thoroughly with real customers before launch. Before building, we interviewed purchasing engineers and buyers at customer companies to learn which questions they asked most often and how quickly they needed answers.",
      outcome:
        "Routine queries moved to self-service, orders were placed faster and the sales team focused on design-in support for new projects. Customers began using the portal to check stock before designing parts into new products, which gave the distributor earlier visibility of future demand.",
      learning: "Live stock visibility was the feature customers valued most.",
      verified: true,
    },
    {
      slug: "electronics-brand-health-tracker",
      title: "Tracking brand health in a crowded appliance category",
      client: "A kitchen appliances brand",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Quantitative research", "Consumer panel", "Data analytics & dashboards"],
      methods: ["Quarterly brand tracker"],
      scope: "2,000 category shoppers per quarter",
      timeline: "Ongoing",
      challenge:
        "The brand competed with many local and international rivals and needed to understand awareness, consideration and perception over time, and the effect of its campaigns.",
      approach:
        "We ran a quarterly tracker with consistent questions, sample definitions and quotas, including brand funnel measures and image attributes, with a dashboard by region. Questions were reviewed with the marketing team before the first wave and then kept fixed, so changes between quarters reflected the market rather than the method.",
      outcome:
        "The tracker showed strong awareness but weaker consideration due to perceived durability concerns. Campaigns highlighting warranties and durability improved consideration in later waves. Regional teams also used the dashboard to compare their markets and plan local activities, rather than relying only on national campaigns.",
      learning: "Tracking the full funnel showed exactly where the brand was losing people.",
      verified: true,
    },
    {
      slug: "electronics-company-virtual-cfo",
      title: "Financial planning for a fast-growing electronics brand",
      client: "A consumer electronics start-up",
      region: "Delhi NCR",
      markets: ["IN"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "GST services"],
      methods: ["Cash forecasting", "Inventory planning", "Compliance review"],
      scope: "Imports, inventory and online sales",
      timeline: "12-month engagement",
      challenge:
        "Rapid growth meant large inventory purchases months before sales, and GST and import duties added to cash pressure. Founders struggled to predict cash needs.",
      approach:
        "Our virtual CFO introduced rolling cash forecasts tied to purchase orders and sales plans, reviewed GST input credit recovery and set up a monthly MIS with inventory and margin tracking. The founders received a short monthly pack with cash position, inventory days, gross margin by product and upcoming obligations, discussed in a regular review meeting.",
      outcome:
        "The founders could plan purchases and funding ahead of time, recovered eligible input credit faster and avoided last-minute cash shortfalls during peak seasons. When the company later raised funds, its clean reporting and forecasts made investor due diligence noticeably smoother.",
      learning: "Linking inventory plans to cash forecasts prevented growth from becoming a crisis.",
      verified: true,
    },
  ],
  ELECTRONICS_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: ELECTRONICS_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  ENERGY_CASES = [
    {
      slug: "rooftop-solar-homeowner-adoption",
      title: "What it takes for homeowners to install rooftop solar",
      client: "A rooftop solar company",
      region: "Gujarat, Rajasthan & Karnataka",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Homeowner survey", "Interviews with recent adopters and drop-outs"],
      scope: "2,000 homeowners, 36 interviews",
      timeline: "8 weeks",
      challenge:
        "Government subsidies had made rooftop solar more affordable, yet many homeowners who requested quotes never went ahead. The company wanted to understand where prospects dropped out and what would help them decide.",
      approach:
        "We surveyed independent homeowners about electricity bills, awareness of subsidies, concerns about installation and expectations of savings. We also interviewed recent adopters and people who had dropped out after receiving quotes, asking them to describe the process step by step, including subsidy paperwork and approval delays.",
      outcome:
        "Prospects were put off by complicated subsidy paperwork and uncertainty about how long approvals would take, more than by cost. The company introduced end-to-end subsidy handling with clear timelines, a savings calculator based on actual bills and testimonials from neighbours who had installed systems. Conversion from quote to installation improved in the following quarters.",
      learning: "Removing paperwork anxiety converted more prospects than lowering prices.",
      verified: true,
    },
    {
      slug: "clean-cooking-lpg-refill-study",
      title: "Why some households stop refilling their LPG cylinders",
      client: "A clean energy development programme",
      region: "Madhya Pradesh & Jharkhand",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Household survey", "Women’s group discussions"],
      scope: "3,000 households, 18 discussions",
      timeline: "10 weeks",
      challenge:
        "Many rural households had received LPG connections, but refill rates were low and families continued to cook with firewood. The programme needed to understand why, to design support that sustained clean cooking.",
      approach:
        "Women interviewers surveyed the main cooks in each household about fuel use, refill costs, distance to distributors, cooking habits and health. Group discussions with women explored decision-making about spending and the taste and convenience trade-offs between fuels.",
      outcome:
        "The upfront cost of each refill and distance to distributors were the main barriers, and women often had little say over household spending. The programme piloted smaller cylinders, home delivery in remote villages and awareness sessions involving men and women together. Refill rates improved in pilot villages, and the programme extended home delivery to more areas.",
      learning: "Clean cooking depends on who controls household spending.",
      verified: true,
    },
    {
      slug: "energy-transition-public-attitudes-europe",
      title: "Public attitudes to heat pumps and home energy upgrades",
      client: "An energy efficiency agency",
      region: "France, Germany, Italy & Spain",
      markets: ["FR", "DE", "IT", "ES"],
      services: ["Quantitative research", "Consumer panel", "Reporting & insights"],
      methods: ["Online survey in four languages", "Segmentation"],
      scope: "4,000 homeowners",
      timeline: "8 weeks",
      challenge:
        "Government incentives for heat pumps and insulation were available, but uptake was slower than targets. The agency wanted to understand homeowners’ attitudes and barriers across countries.",
      approach:
        "We surveyed homeowners in French, German, Italian and Spanish about energy costs, awareness of incentives, concerns about installation and trust in installers, then segmented respondents by readiness and motivation. Questions also covered rented versus owned homes and building age, since these strongly affect upgrade options.",
      outcome:
        "Concerns about upfront cost, disruption and finding reliable installers dominated, while motivations differed by country. The agency developed country-specific campaigns and a trusted installer directory. Applications for incentives rose in regions where the new campaigns ran. The installer directory became one of the most visited parts of the agency’s website.",
      learning: "Segmentation showed that one message would not fit four countries.",
      verified: true,
    },
    {
      slug: "solar-irrigation-pump-evaluation",
      title: "Evaluating solar irrigation pumps for smallholder farmers",
      client: "An agricultural development bank",
      region: "Rajasthan & Maharashtra",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Financial modelling"],
      methods: ["Farmer survey", "Cost-benefit analysis"],
      scope: "1,200 farmers",
      timeline: "9 weeks",
      challenge:
        "The bank financed solar pumps for farmers and wanted to know whether they improved incomes and repayment, and whether the model could be scaled. Loan officers also wanted to know whether the pumps affected groundwater use.",
      approach:
        "We surveyed farmers with and without solar pumps about irrigation, crops, diesel savings and incomes, and modelled costs and benefits over the life of the pumps. Interviews were conducted in Hindi and Marathi, and farmers’ irrigation records were checked where available.",
      outcome:
        "Farmers with solar pumps saved on diesel and grew additional crops, improving repayment. The bank expanded financing with a focus on water-efficient irrigation practices. The bank also introduced guidance on water-efficient irrigation to address groundwater concerns. Repayment rates were higher among farmers who adopted drip irrigation alongside solar pumps.",
      learning: "Combining survey data with economic modelling made the business case clear.",
      verified: true,
    },
    {
      slug: "ev-charging-business-users-gulf",
      title: "Understanding demand for workplace EV charging in the Gulf",
      client: "An energy services company",
      region: "United Arab Emirates & Qatar",
      markets: ["AE", "QA"],
      services: ["Business panel", "Quantitative research", "Research consultancy"],
      methods: ["Facility manager interviews", "Employee survey"],
      scope: "40 facility managers, 1,500 employees",
      timeline: "7 weeks",
      challenge:
        "Electric vehicle adoption was rising, and the company wanted to offer workplace charging but did not know how many employers would invest or how employees would use it. Public charging was limited, and many residents lived in apartments without home chargers.",
      approach:
        "We interviewed facility managers about plans, budgets and concerns, and surveyed employees about vehicle plans and charging needs. Interviews covered office towers, malls, hospitals and industrial sites, and the survey was offered in English and Arabic.",
      outcome:
        "Employers were interested if charging was offered as a managed service with no upfront cost. The company launched a subscription-based workplace charging offer. Several large employers signed up for pilots within months of launch. Employee usage data from pilots helped employers plan the number of chargers needed as adoption grew.",
      learning: "Removing upfront investment unlocked employer interest.",
      verified: true,
    },
    {
      slug: "renewable-energy-developer-community",
      title: "Community consultation for a wind farm project",
      client: "A renewable energy developer",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Qualitative research", "Quantitative research", "Government research"],
      methods: ["Community survey", "Stakeholder meetings"],
      scope: "1,000 residents, 10 meetings",
      timeline: "8 weeks",
      challenge:
        "The developer needed to understand community expectations and concerns around a proposed wind farm, including employment and local benefits. Earlier projects in the region had faced protests over unmet promises of jobs and benefits.",
      approach:
        "We surveyed residents in local languages about awareness, expectations and concerns, and facilitated meetings with community leaders and local businesses. Interviews were conducted in English, isiXhosa and Afrikaans, and findings were presented back to the community in public meetings. Separate sessions were held with women and young people to ensure their priorities were heard.",
      outcome:
        "Residents prioritised local jobs and a community trust with transparent governance. The developer included both in its project plan. Community support improved, and the project progressed through consultation without major objections. A local skills programme was also planned to prepare residents for construction and maintenance jobs.",
      learning: "Benefit-sharing built support for the project.",
      verified: true,
    },
    {
      slug: "energy-startup-investor-model",
      title: "Financial planning for a battery storage start-up",
      client: "A battery energy storage start-up",
      region: "Bengaluru",
      markets: ["IN"],
      services: ["Financial modelling", "Virtual CFO services", "Corporate finance advisory"],
      methods: ["Project-level model", "Investor materials"],
      scope: "Commercial and industrial storage projects",
      timeline: "2 months",
      challenge:
        "The start-up had pilot projects with factories but needed to show investors how projects would be financed and returns earned. Investors wanted to understand project-level returns, customer savings and how the business would scale.",
      approach:
        "We built a project-level model covering capital costs, savings for customers, financing and maintenance, with scenarios for battery prices and tariffs. The model separated proven assumptions from pilot data and those still to be tested, and included sensitivity analysis on key drivers. We also prepared a short investor memo explaining customer economics in plain language.",
      outcome:
        "Investors gained confidence in project economics, and the start-up raised funding for its next deployments. The model became the basis for board reporting and planning new projects. Due diligence questions were answered quickly because assumptions were clearly documented.",
      learning: "Project-level economics made a new technology investable.",
      verified: true,
    },
    {
      slug: "energy-efficiency-sme-programme",
      title: "Helping small manufacturers cut energy costs",
      client: "An energy efficiency programme",
      region: "Japan & Taiwan",
      markets: ["JP", "TW"],
      services: ["Business panel", "Quantitative research", "Content marketing"],
      methods: ["SME survey", "Case-based content"],
      scope: "800 small manufacturers",
      timeline: "6 weeks",
      challenge:
        "Small manufacturers rarely took up energy audits despite subsidies. The programme wanted to understand why. Owners were busy running their businesses and saw energy audits as paperwork rather than a source of savings.",
      approach:
        "We surveyed owners about energy costs, awareness and barriers, then created case-based content showing savings achieved by similar firms. The survey was conducted in Japanese and Mandarin, and we interviewed owners who had completed audits to collect real examples of savings.",
      outcome:
        "Owners lacked time and trusted peer examples more than official materials. The programme used peer case stories in outreach and simplified audit applications. Applications for energy audits rose after the new outreach began. The programme also introduced short online audit applications that owners could complete in minutes.",
      learning: "Peer examples were more persuasive than official messages.",
      verified: true,
    },
    {
      slug: "biogas-plant-farmer-study",
      title: "Assessing demand for community biogas plants",
      client: "A bioenergy company",
      region: "Punjab & Haryana",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Research consultancy"],
      methods: ["Farmer survey", "Dairy cooperative interviews"],
      scope: "1,000 farmers, 20 cooperatives",
      timeline: "7 weeks",
      challenge:
        "The company planned compressed biogas plants using crop residue and dung, and needed to know whether farmers would supply feedstock reliably. Crop residue burning was a major environmental problem, and the project could also reduce pollution.",
      approach:
        "We surveyed farmers about residue disposal, dung availability, price expectations and logistics, and interviewed dairy cooperatives. Interviews were conducted in Punjabi and Hindi during the harvest season, when residue decisions were being made. We also mapped village clusters and road access to estimate collection distances and costs.",
      outcome:
        "Farmers were willing to supply residue if collection was arranged at the farm gate. The company designed a collection network with cooperatives. Feedstock supply agreements were signed with several cooperatives before construction began. The company used the cluster mapping to choose the plant location.",
      learning: "Logistics determined supply more than price.",
      verified: true,
    },
    {
      slug: "energy-brand-digital-leads",
      title: "Generating commercial solar leads online",
      client: "A commercial solar installer",
      region: "United States",
      markets: ["US"],
      services: ["Lead generation", "Google Ads / PPC", "Landing page & CRO"],
      methods: ["Search campaigns", "Savings calculator landing pages"],
      scope: "Campaigns in three states",
      timeline: "6 months",
      challenge:
        "The installer relied on referrals and wanted to reach more commercial building owners. Commercial building owners researched solar carefully online but rarely contacted installers early.",
      approach:
        "We built landing pages with savings calculators and tax incentive information, launched search campaigns and integrated leads with the CRM. Landing pages explained federal and state incentives clearly, and leads were scored by building type and energy use. Campaigns targeted property managers, manufacturers and warehouse owners with messages tailored to each.",
      outcome:
        "Qualified commercial enquiries grew, and the sales team could prioritise leads by roof size and energy use. Sales cycles shortened as prospects arrived better informed about savings and incentives. The installer also used case studies of completed projects to support follow-ups.",
      learning: "Calculators gave prospects a reason to share details.",
      verified: true,
    },
  ],
  ENERGY_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: ENERGY_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  FASHION_CASES = [
    {
      slug: "fashion-size-fit-research",
      title: "Reducing returns by understanding size and fit",
      client: "An online fashion brand",
      region: "India, UAE & United Kingdom",
      markets: ["IN", "AE", "UK"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Survey of recent buyers", "Fit sessions", "Returns data analysis"],
      scope: "2,000 buyers, 60 fit sessions",
      timeline: "8 weeks",
      challenge:
        "More than a third of the brand’s online orders were being returned, mostly because of size and fit, and return costs were wiping out margins. Customers in India, the UAE and the UK had different body proportions and expectations, but the brand used the same size chart everywhere.",
      approach:
        "We analysed returns data by product, size and market, then surveyed recent buyers about how they chose sizes, which measurements they knew and what went wrong. In fit sessions, participants tried on core styles in two sizes while researchers recorded measurements and fit comments. Sessions included a range of body types and were conducted in English and Hindi.",
      outcome:
        "Customers relied on their usual size from other brands and rarely used the size chart, and some styles ran small around the shoulders and hips. The brand introduced a fit-finder asking for familiar brands and sizes, adjusted patterns for its best-selling styles and added fit notes from real customers. Returns for those styles fell noticeably.",
      learning: "People choose sizes by habit, so guidance must start from what they already know.",
      verified: true,
    },
    {
      slug: "fashion-trend-forecast-youth",
      title: "Understanding style preferences among young shoppers",
      client: "A value fashion retailer",
      region: "Indonesia, Malaysia & India",
      markets: ["ID", "MY", "IN"],
      services: ["Consumer panel", "Qualitative research", "Social media marketing"],
      methods: ["Online community", "Social listening", "Image-based survey"],
      scope: "60 community members, 2,000 survey respondents",
      timeline: "8 weeks",
      challenge:
        "The retailer’s designs were planned months in advance, and several recent collections missed what young shoppers wanted. Buyers relied on catwalk trends from Europe, which did not always reflect local tastes, climate and modesty preferences.",
      approach:
        "We ran a three-week online community with young shoppers who shared outfits, inspiration and shopping hauls, and analysed social media conversations. An image-based survey then measured preferences for colours, silhouettes and styles across countries, in Bahasa Indonesia, Malay, Hindi and English.",
      outcome:
        "Shoppers wanted versatile, modest pieces that could be styled for work and weekends, in lighter fabrics for heat. The retailer adjusted its range plans and introduced a “mix and match” collection that sold through faster than earlier collections. The community was retained as an ongoing panel for testing future collections.",
      learning: "Local inspiration mattered more than global catwalk trends.",
      verified: true,
    },
    {
      slug: "luxury-brand-perception-study",
      title: "How affluent shoppers see a heritage luxury brand",
      client: "A European luxury accessories brand",
      region: "Japan, Hong Kong, Taiwan & UAE",
      markets: ["JP", "HK", "TW", "AE"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["In-depth interviews with affluent shoppers", "Online survey"],
      scope: "48 interviews, 900 survey respondents",
      timeline: "9 weeks",
      challenge:
        "The brand was respected for craftsmanship but losing younger affluent customers to brands seen as more modern. Leadership wanted to understand perceptions in its key Asian and Gulf markets before a brand refresh.",
      approach:
        "Senior researchers interviewed affluent shoppers in Japanese, Cantonese, Mandarin, Arabic and English about luxury purchases, brand associations and in-store experiences. A survey measured brand image among a wider group of luxury buyers.",
      outcome:
        "Shoppers admired the brand’s heritage but found its designs too conservative and its stores intimidating. The refresh introduced contemporary collaborations and a warmer in-store service approach, while keeping heritage at the core. Sales associates were also trained to share the brand’s craftsmanship stories in a warmer, more personal way.",
      learning: "Heritage was an asset only when paired with relevance.",
      verified: true,
    },
    {
      slug: "sustainable-fashion-resale-study",
      title: "Testing interest in a fashion resale service",
      client: "A fashion retailer",
      region: "United Kingdom, France & Germany",
      markets: ["UK", "FR", "DE"],
      services: ["Consumer panel", "Quantitative research", "Research consultancy"],
      methods: ["Online survey with concept test", "Pricing questions"],
      scope: "3,000 fashion shoppers",
      timeline: "7 weeks",
      challenge:
        "The retailer was under pressure from regulators and customers to reduce textile waste and was considering a take-back and resale service for its own clothing. Leadership was unsure whether customers would bring clothes back, buy second-hand items from a mainstream brand, or what incentives would make the service worthwhile.",
      approach:
        "We surveyed fashion shoppers in the UK, France and Germany about their current second-hand buying and selling, attitudes to pre-owned clothing and barriers such as hygiene and quality concerns. Respondents evaluated a concept for the service and chose between rewards such as store credit, cash or charity donations. Questionnaires were in English, French and German.",
      outcome:
        "Shoppers were most motivated by store credit, and younger customers were keen to buy pre-owned items if quality was checked. The retailer piloted the service in selected stores with store credit rewards and a quality-graded resale section online, and used early results to plan a wider rollout.",
      learning:
        "A reward that brought customers back into stores made resale good for both the planet and the business.",
      verified: true,
    },
    {
      slug: "fashion-influencer-campaign-gulf",
      title: "Launching a modest fashion line with creators",
      client: "A modest fashion label",
      region: "Saudi Arabia, UAE & Egypt",
      markets: ["SA", "AE", "EG"],
      services: ["Influencer marketing", "Social media advertising", "E-commerce marketing"],
      methods: ["Creator partnerships", "Paid amplification", "Tracked links"],
      scope: "18 creators across three countries",
      timeline: "4 months",
      challenge:
        "The label had a loyal following in its home market but little awareness among young women in Saudi Arabia, the UAE and Egypt, who were among the fastest-growing buyers of modest fashion. Traditional advertising had produced little engagement.",
      approach:
        "We identified creators in each country whose audiences matched the label’s target customers, checked for authentic engagement and briefed them to style the collection in everyday settings such as work, university and family gatherings, with clear disclosure of the partnership. The best-performing creator content was amplified with targeted social ads, and every creator had tracked links and codes.",
      outcome:
        "Online sales grew in all three countries during the campaign, and creator content consistently outperformed the label’s studio ads. Several creators continued as long-term ambassadors.",
      learning: "Seeing the collection styled by trusted local creators made it relevant in each market.",
      verified: true,
    },
    {
      slug: "fashion-store-visual-merchandising",
      title: "Testing visual merchandising layouts in stores",
      client: "A fashion retail chain",
      region: "Delhi NCR, Mumbai & Bengaluru",
      markets: ["IN"],
      services: ["Offline data collection", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Store observation", "Shopper exit interviews", "Sales comparison"],
      scope: "12 test and 12 control stores",
      timeline: "10 weeks",
      challenge:
        "The chain had invested in a new store layout with themed outfit displays and wider aisles, but managers disagreed about whether it actually helped sales. Leadership needed evidence before rolling the design out to more than a hundred stores.",
      approach:
        "We compared twelve stores with the new layout against twelve similar stores without it. Researchers observed shopper movement and time spent in each zone, conducted short exit interviews about ease of finding items and outfit inspiration, and compared sales and conversion data over the same weeks.",
      outcome:
        "The new layout increased time spent in womenswear and the number of items per purchase, while menswear showed little change. The chain rolled out the women’s layout across stores and redesigned the men’s section before wider rollout.",
      learning: "Comparing test and control stores produced evidence everyone could accept.",
      verified: true,
    },
    {
      slug: "fashion-brand-ecommerce-growth",
      title: "Growing direct online sales for a fashion label",
      client: "An Indian ethnic wear brand",
      region: "India, USA & UK",
      markets: ["IN", "US", "UK"],
      services: ["E-commerce marketing", "Performance marketing", "SEO services"],
      methods: ["Product page optimisation", "Paid social", "International shipping campaigns"],
      scope: "Website and campaigns",
      timeline: "8 months",
      challenge:
        "The ethnic wear brand sold mainly through marketplaces, which limited margins and gave it little customer data. It also saw growing demand from Indian diaspora customers in the USA and UK but had no plan to reach them directly.",
      approach:
        "We improved product pages with styling guidance and size advice, set up international shipping and payment options, and ran campaigns timed around festivals and wedding seasons, targeting diaspora communities. Search optimisation focused on festival and occasion searches.",
      outcome:
        "Direct website sales grew significantly, and international orders became a meaningful share of revenue, especially before Diwali and wedding season. The brand built an email list of loyal customers abroad. Customer service was also extended to cover evening hours in the US and UK.",
      learning: "Festival and wedding timing shaped diaspora demand more than general fashion trends.",
      verified: true,
    },
    {
      slug: "garment-workers-wellbeing-fashion-brand",
      title: "Worker voice research in a fashion brand’s supply chain",
      client: "A global fashion brand",
      region: "India & Indonesia",
      markets: ["IN", "ID"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous worker surveys", "Off-site interviews"],
      scope: "3,000 workers in 15 factories",
      timeline: "10 weeks",
      challenge:
        "The global brand relied on factory audits to check working conditions in its supply chain, but audits were announced in advance and workers rarely spoke openly. The brand wanted independent evidence of workers’ experiences.",
      approach:
        "We surveyed workers anonymously through mobile phone questionnaires in Hindi, Tamil, Kannada and Bahasa Indonesia, and conducted confidential interviews outside factories with women researchers. Questions covered wages, overtime, safety, harassment and grievance mechanisms. Results were shared with suppliers in aggregate, protecting individual workers.",
      outcome:
        "Excessive overtime during peak seasons and weak grievance handling were identified in several factories. The brand worked with suppliers on production planning and introduced an independent worker helpline. A follow-up survey was scheduled to measure whether conditions improved.",
      learning: "Off-site, anonymous channels encouraged workers to speak honestly.",
      verified: true,
    },
    {
      slug: "fashion-brand-cash-flow-planning",
      title: "Planning cash for seasonal collections",
      client: "A fashion label",
      region: "Mumbai",
      markets: ["IN"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "GST services"],
      methods: ["Seasonal cash forecast", "Inventory planning"],
      scope: "Two collections a year",
      timeline: "9-month engagement",
      challenge:
        "The label paid for fabric, embroidery and production months before its two main seasonal collections reached stores, and cash ran short every season. Unsold stock from previous collections also tied up money.",
      approach:
        "Our virtual CFO built a seasonal cash forecast linked to production schedules and expected sales, reviewed inventory to identify slow-moving stock and prepared a working capital proposal for the bank. Monthly reviews compared actual sales and production costs with the forecast, so the plan could be adjusted quickly.",
      outcome:
        "The label arranged seasonal financing in advance, cleared older stock through planned sales and reduced production of slow-selling lines. The founders also gained confidence to negotiate longer payment terms with fabric suppliers.",
      learning: "Planning cash around the fashion calendar prevented recurring crises.",
      verified: true,
    },
    {
      slug: "kidswear-parent-research",
      title: "Understanding parents buying children’s clothing",
      client: "A kidswear brand",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Parent survey", "Group discussions"],
      scope: "1,500 parents",
      timeline: "6 weeks",
      challenge:
        "The kidswear brand was losing share to fast-fashion retailers and wanted to understand what parents in Australia and New Zealand really valued when buying children’s clothes.",
      approach:
        "We surveyed parents of children up to twelve years old about purchase frequency, priorities, sustainability and price, and held group discussions to explore frustrations such as durability and sizing. The survey included quotas by child age and household income, and parents shared photos of clothes that had worn out quickly.",
      outcome:
        "Durability, comfort and easy washing mattered more than trends. The brand highlighted fabric quality and introduced a durability guarantee, which parents responded to strongly. Repeat purchases increased among parents who registered for the guarantee.",
      learning: "Parents valued practicality over fashion when buying for children.",
      verified: true,
    },
  ],
  FASHION_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: FASHION_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  FISHING_CASES = [
    {
      slug: "fisher-livelihood-baseline-survey",
      title: "A livelihood baseline for coastal fishing communities",
      client: "An international development agency",
      region: "Andhra Pradesh & Odisha coast",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CAPI)", "Data processing & analytics"],
      methods: ["Household survey", "Community mapping"],
      scope: "2,600 fisher households in 80 coastal villages",
      timeline: "11 weeks",
      challenge:
        "The agency was launching a programme to strengthen fisher livelihoods but lacked reliable data on household income, assets, debt and seasonal patterns. Existing figures were years old and did not separate traditional boat owners from crew members.",
      approach:
        "Our field teams, recruited from coastal districts, conducted interviews in Telugu and Odia outside fishing hours. The questionnaire captured income across lean and peak seasons, boat ownership, debts to traders and access to insurance. Every interview was GPS-tagged and a share were independently back-checked.",
      outcome:
        "The baseline showed sharp differences between owners and crew, and heavy reliance on informal credit from fish traders. The agency targeted its savings and insurance components at crew households and set measurable indicators to evaluate the programme in later rounds.",
      learning:
        "Seasonality must be designed into fisheries surveys; a single “monthly income” question hides most of the story.",
      verified: true,
    },
    {
      slug: "seafood-export-buyer-research",
      title: "What international buyers expect from Indian seafood exporters",
      client: "A seafood exporters’ group",
      region: "Buyers in Spain, Italy, France, Germany, UAE, Saudi Arabia, Japan & Malaysia",
      markets: ["IN", "ES", "IT", "FR", "DE", "AE", "SA", "JP", "MY"],
      services: ["Business panel", "Qualitative research", "Research consultancy"],
      methods: ["In-depth interviews with importers", "Online B2B survey"],
      scope: "30 importer interviews, 140 online responses",
      timeline: "8 weeks",
      challenge:
        "Exporters were losing orders to competing countries but received little feedback from buyers who simply stopped ordering. They wanted to understand how importers chose suppliers and where Indian exporters fell short.",
      approach:
        "We interviewed procurement and quality managers at importers and distributors, then ran a short online survey to measure how common each concern was. Questions covered certification, traceability, consistency, communication and price.",
      outcome:
        "Buyers rated Indian product quality well but worried about documentation delays and inconsistent responses to quality complaints. The exporters’ group introduced a shared traceability standard and a faster complaint-response protocol, and presented the findings at a buyer meet.",
      learning:
        "Lost B2B customers rarely explain why; independent interviews can surface what sales teams never hear.",
      verified: true,
    },
    {
      slug: "cold-chain-gap-assessment",
      title: "Mapping cold-chain gaps from landing centre to market",
      client: "A state fisheries department",
      region: "Kerala",
      markets: ["IN"],
      services: ["Government research", "Qualitative research", "Reporting & insights"],
      methods: ["Landing centre audits", "Trader and transporter interviews"],
      scope: "45 landing centres, 220 interviews",
      timeline: "7 weeks",
      challenge:
        "Post-harvest losses were believed to be high, but the department did not know where in the chain they occurred, or which investments, ice plants, insulated transport or storage, would make the biggest difference.",
      approach:
        "Teams visited landing centres at dawn to observe handling, icing and loading, and interviewed fishers, auctioneers, traders and transport operators. A structured audit checklist recorded facilities and practices consistently across sites.",
      outcome:
        "Losses were concentrated in the first hours after landing, where ice was scarce and handling rough. The department prioritised ice availability and handling training at high-volume centres before investing in larger storage facilities.",
      learning: "Observing the process at the right time of day revealed problems interviews alone would have missed.",
      verified: true,
    },
    {
      slug: "fish-consumption-urban-study",
      title: "Why urban families buy, or avoid, packaged fish",
      client: "A packaged seafood brand in Asia",
      region: "Tokyo, Hong Kong, Kuala Lumpur & Jakarta",
      markets: ["JP", "HK", "MY", "ID"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey", "Accompanied shopping visits"],
      scope: "1,400 fish-eating households, 16 shopping visits",
      timeline: "6 weeks",
      challenge:
        "The brand’s frozen fish products had strong quality controls, yet many fish-eating families still preferred the local market. The brand wanted to understand the barriers and which households were most open to switching.",
      approach:
        "Our consumer panel provided a survey sample of fish-eating households across four coastal and inland cities. We also accompanied shoppers to fish markets and supermarkets to watch how they judged freshness and what reassured them.",
      outcome:
        "Shoppers trusted what they could see and smell, and frozen packs gave them no such cues. Working families who valued cleaned, ready-to-cook fish were the most open to switching. The brand redesigned packs with transparent windows and catch-date information and focused on online grocery channels.",
      learning: "Watching people shop explained a barrier that survey answers only hinted at.",
      verified: true,
    },
    {
      slug: "aquaculture-farmer-feed-study",
      title: "Understanding feed choices among shrimp and fish farmers",
      client: "An aquaculture feed manufacturer",
      region: "Andhra Pradesh, West Bengal & Gujarat",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Sampling & recruitment"],
      methods: ["Farmer survey", "Dealer interviews"],
      scope: "900 farmers, 60 feed dealers",
      timeline: "6 weeks",
      challenge:
        "The client’s premium feed was losing share to cheaper brands. Sales teams believed farmers were purely price-driven, but the company suspected technical advice and credit terms also played a role.",
      approach:
        "We built a sampling frame of active farms with help from local associations, then interviewed farmers about pond size, species, feed brands, technical support and credit. Dealer interviews explored margins and credit practices.",
      outcome:
        "Farmers valued technical visits and disease advice highly, and many switched brands when dealers offered longer credit during difficult cycles. The client introduced a technical service team for key clusters and reviewed its dealer credit policy.",
      learning: "Price is often blamed for losses that are really about support and credit.",
      verified: true,
    },
    {
      slug: "fisheries-scheme-impact-evaluation",
      title: "Evaluating a boat modernisation scheme five years on",
      client: "A central government programme",
      region: "Tamil Nadu & Karnataka",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Beneficiary and comparison surveys", "Case interviews"],
      scope: "1,800 households, 40 case interviews",
      timeline: "12 weeks",
      challenge:
        "A scheme had subsidised engines and equipment for traditional boats. The programme needed an independent evaluation of whether beneficiaries were better off and what had worked or not.",
      approach:
        "We surveyed beneficiaries and a comparable group of non-beneficiaries in the same villages, collecting income, catch, fuel use and safety information. Case interviews explored how equipment was used, maintained and financed.",
      outcome:
        "Beneficiaries reported longer fishing trips and better safety, but maintenance costs strained some households. The programme added maintenance training and spare-part access to the next phase.",
      learning: "Comparison groups and honest case stories together give a fairer picture of impact than either alone.",
      verified: true,
    },
    {
      slug: "fish-market-hygiene-mystery-audit",
      title: "A hygiene and pricing audit of urban fish markets",
      client: "A city municipality",
      region: "A coastal city in Morocco",
      markets: ["MA"],
      services: ["Offline data collection", "Government research", "Data analytics & dashboards"],
      methods: ["Structured market audits", "Mystery shopping"],
      scope: "35 markets, 700 stall audits",
      timeline: "5 weeks",
      challenge:
        "The corporation planned to upgrade public fish markets and wanted an objective baseline of hygiene, waste management and pricing practices before deciding where to invest.",
      approach:
        "Trained auditors used a photo-supported checklist to record water access, drainage, waste disposal, ice use and display practices. Mystery shoppers recorded prices and weighing practices at the same stalls.",
      outcome:
        "The audit identified a small number of markets with severe drainage and waste problems, which became the first priority for upgrades. Weighing-scale inspections were scheduled where discrepancies appeared.",
      learning: "Photo-backed audits made the findings easy for officials to accept and act on.",
      verified: true,
    },
    {
      slug: "seafood-brand-ecommerce-growth",
      title: "Growing direct online orders for a fresh seafood brand",
      client: "A fresh seafood delivery start-up in North America",
      region: "Vancouver, Toronto & Seattle",
      markets: ["CA", "US"],
      services: ["E-commerce marketing", "Google Ads / PPC", "Landing page & CRO"],
      methods: ["Search and social campaigns", "Checkout optimisation"],
      scope: "Website, app store and paid media",
      timeline: "6 months",
      challenge:
        "The start-up relied heavily on aggregator apps, paying high commissions. Its own website attracted visitors but converted poorly, and repeat orders were low.",
      approach:
        "We fixed tracking, simplified the checkout, added delivery-slot clarity and freshness guarantees on product pages, and launched search campaigns for high-intent local searches. Post-purchase emails and WhatsApp messages encouraged second orders.",
      outcome:
        "Direct orders grew steadily as a share of total sales, and repeat purchase rates improved after the retention journeys launched. The founders reduced dependence on aggregators in their strongest neighbourhoods.",
      learning: "Fixing trust and convenience on the site mattered more than buying extra traffic.",
      verified: true,
    },
    {
      slug: "fisherwomen-vendor-study",
      title: "Hearing from women fish vendors about credit and market access",
      client: "A microfinance foundation",
      region: "Kerala & Maharashtra",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["In-depth interviews", "Vendor survey"],
      scope: "50 interviews, 600 vendor survey responses",
      timeline: "7 weeks",
      challenge:
        "Women fish vendors were a large but poorly understood group of potential borrowers. The foundation wanted to design a loan product that fitted their daily cash cycles and risks.",
      approach:
        "Women interviewers spoke with vendors at markets and in their homes about daily purchasing, informal loans, savings and safety. A survey then measured how common the patterns were across locations.",
      outcome:
        "Vendors needed small, very short-term working capital repaid daily, not monthly instalments. The foundation piloted a daily-repayment micro-loan with collection at markets.",
      learning: "Designing finance around real cash cycles is more important than interest rates alone.",
      verified: true,
    },
    {
      slug: "fisheries-cooperative-erp",
      title: "Digitising auctions and payments for a fisheries cooperative",
      client: "A regional fisheries cooperative",
      region: "Goa",
      markets: ["IN"],
      services: ["Custom business applications", "Web application development", "Accounting & bookkeeping"],
      methods: ["Process mapping", "Auction and payment app"],
      scope: "1,200 members, daily auctions at five centres",
      timeline: "5 months",
      challenge:
        "Auctions were recorded in registers and payments to members were calculated by hand, leading to delays and disputes. Annual audits were difficult because records were scattered.",
      approach:
        "We mapped the auction and settlement process with staff and members, then built a simple tablet-based auction record linked to member accounts. Payments, deductions and statements were generated automatically and fed into the cooperative’s books.",
      outcome:
        "Members received printed or SMS statements after each auction, disputes reduced, and the annual audit was completed with far less effort. The board now reviews landings and payments monthly.",
      learning: "Transparency for members was as important as efficiency for staff.",
      verified: true,
    },
  ],
  FISHING_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: FISHING_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  FLORAL_CASES = [
    {
      slug: "online-flower-gifting-occasions",
      title: "Understanding why and when people send flowers online",
      client: "An online flower and gifting platform",
      region: "India & UAE",
      markets: ["IN", "AE"],
      services: ["Consumer panel", "Quantitative research", "Performance marketing"],
      methods: ["Gifting occasions survey", "Order data analysis"],
      scope: "2,200 gift senders, 18 months of orders",
      timeline: "7 weeks",
      challenge:
        "The platform’s sales spiked around Valentine’s Day, Mother’s Day and festivals, then fell sharply for the rest of the year. Marketing spend was concentrated on a few peak weeks when advertising costs were highest. The company wanted to find everyday occasions that could smooth demand.",
      approach:
        "We surveyed people who had sent gifts in the past year, asking about occasions, recipients, budgets, delivery expectations and what made them choose flowers over other gifts. In the UAE, the sample included both nationals and expatriates sending gifts to family abroad. Results were combined with the platform’s order data to see which occasions were under-served.",
      outcome:
        "Birthdays, work anniversaries, get-well wishes and gifts to family in other cities were frequent but rarely targeted. Expatriates in the UAE often sent gifts home to India for birthdays. The platform introduced reminder services, corporate gifting and cross-border delivery bundles, and shifted part of its budget to year-round campaigns.",
      learning: "The steadiest demand came from everyday occasions that marketing had ignored.",
      verified: true,
    },
    {
      slug: "flower-grower-export-readiness",
      title: "Helping flower growers prepare for export markets",
      client: "A floriculture development agency",
      region: "Karnataka & Maharashtra",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Research consultancy"],
      methods: ["Grower survey", "Packhouse audits", "Buyer interviews"],
      scope: "400 growers, 18 packhouses, 15 buyers",
      timeline: "9 weeks",
      challenge:
        "Indian rose and carnation growers had strong production capacity, but few exported regularly. The agency wanted to understand what prevented growers from meeting international buyers’ requirements. Growers often sold through intermediaries and had little direct contact with international buyers.",
      approach:
        "We surveyed greenhouse growers about varieties, post-harvest handling, cold storage and market access, and audited packhouses against common export requirements. Interviews with importers in Europe, Japan and the Gulf explored quality and logistics expectations.",
      outcome:
        "Cold-chain gaps between farm and airport and inconsistent grading were the main barriers. The agency supported shared cold storage near airports and grading training for grower groups. Several grower groups began shipping directly to importers within the following season.",
      learning: "The weakest link in the cold chain decided export readiness.",
      verified: true,
    },
    {
      slug: "florist-business-research",
      title: "Understanding independent florists’ needs",
      client: "A floral wholesale supplier",
      region: "United Kingdom",
      markets: ["UK"],
      services: ["Business panel", "Quantitative research", "Qualitative research"],
      methods: ["Florist survey", "Shop interviews"],
      scope: "500 florists, 20 interviews",
      timeline: "6 weeks",
      challenge:
        "The wholesaler supplied hundreds of independent florists across the UK, but its share of their spending was slipping as florists split orders between suppliers and bought some stock directly from Dutch auction exporters. Florists themselves were under pressure from supermarkets and online flower delivery platforms, and the wholesaler wanted to understand how to become their preferred partner.",
      approach:
        "We surveyed florist owners about how they planned stock, which suppliers they used for different products, how much flower stock they threw away each week, delivery timing and their views on online ordering. Researchers then visited twenty shops on delivery days to see how orders arrived, how stock was checked and where waste occurred, and interviewed owners about their busiest occasions and biggest frustrations.",
      outcome:
        "Wastage was the florists’ biggest cost worry, and large minimum orders forced them to buy more than they could sell. They also wanted to order late in the evening after closing. The wholesaler introduced smaller, more frequent deliveries, an app for evening ordering with live availability and a weekly “seasonal picks” list. Its share of florists’ spending grew over the following year.",
      learning: "Helping florists reduce waste built more loyalty than lower prices.",
      verified: true,
    },
    {
      slug: "wedding-flower-decor-market",
      title: "Sizing the market for wedding floral décor",
      client: "An events and floral décor company",
      region: "Delhi NCR, Jaipur & Dubai",
      markets: ["IN", "AE"],
      services: ["Research consultancy", "Quantitative research", "Financial modelling"],
      methods: ["Planner interviews", "Couple survey", "Market model"],
      scope: "30 planners, 800 couples",
      timeline: "7 weeks",
      challenge:
        "The company had built a strong reputation for floral décor at large weddings in North India and wanted to expand to Jaipur and Dubai. It did not know how couples set décor budgets, who made the final decisions, or whether demand was shifting from lavish events to smaller, more personal ceremonies.",
      approach:
        "We interviewed wedding planners and venue managers about how décor was commissioned, typical budgets and changing trends, then surveyed recently married and engaged couples about their décor priorities, spending and the role of parents and planners. In Dubai, the sample included Indian and other expatriate families planning weddings locally. The findings fed a market model estimating demand by event size and city.",
      outcome:
        "Destination weddings and smaller premium ceremonies were growing fastest, and planners strongly influenced which décor companies were shortlisted. The company created packages for intimate weddings, built planner partnerships in both cities and launched in Dubai through two established planners.",
      learning: "Planners were the gatekeepers; winning them mattered more than advertising to couples.",
      verified: true,
    },
    {
      slug: "flower-subscription-concept-test",
      title: "Testing a flower subscription service",
      client: "A flower delivery start-up",
      region: "Sydney, Melbourne & Auckland",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "Landing page & CRO"],
      methods: ["Concept test", "Landing page test"],
      scope: "1,500 respondents",
      timeline: "5 weeks",
      challenge:
        "The start-up had built a reliable flower delivery operation and believed that regular subscriptions could create steadier revenue than one-off gifts. Before investing in subscription software and supply contracts, the founders wanted evidence that households in Australia and New Zealand would actually subscribe, at what price and how often.",
      approach:
        "We surveyed flower buyers about how often they bought flowers for themselves, preferred styles and budgets, then tested several subscription concepts with different delivery frequencies and prices. Because stated intentions often overstate real behaviour, we also built simple landing pages for the two best concepts and measured how many visitors from targeted ads joined a waiting list.",
      outcome:
        "Fortnightly deliveries at a moderate price, with the option to pause, performed best in both the survey and the landing page test. The start-up launched with that offer, and early sign-ups were in line with the test results, giving the founders confidence to secure grower contracts.",
      learning: "Combining a survey with a real-world landing page test separated genuine demand from polite interest.",
      verified: true,
    },
    {
      slug: "flower-market-trader-study",
      title: "Understanding wholesale flower market traders",
      client: "A state agricultural marketing board",
      region: "Bengaluru & Kolkata",
      markets: ["IN"],
      services: ["Government research", "Qualitative research", "Quantitative research"],
      methods: ["Trader survey", "Market observation"],
      scope: "300 traders",
      timeline: "6 weeks",
      challenge:
        "The state marketing board planned to modernise two large wholesale flower markets that opened before dawn and handled huge volumes in a few hours. Traders were nervous about relocation and new rules, and the board needed to understand how the markets actually worked before finalising designs.",
      approach:
        "We surveyed growers, commission agents and traders about volumes, pricing, payments, cold storage and wastage, and observed both markets between three and eight in the morning to map movement, congestion and waiting times. Interviews were conducted in Kannada, Bengali, Hindi and English.",
      outcome:
        "Lack of cold storage and opaque price setting caused most losses for growers, and congestion at peak hours delayed buyers. The board included cold rooms, a digital price display board and separate loading zones in its plans, and presented the findings to traders before consultation meetings.",
      learning: "Watching the market at its busiest hours revealed problems that interviews alone would not.",
      verified: true,
    },
    {
      slug: "floral-brand-instagram-growth",
      title: "Growing a floral studio’s social media following",
      client: "A boutique floral studio",
      region: "Hong Kong",
      markets: ["HK"],
      services: ["Social media marketing", "Video marketing", "Content marketing"],
      methods: ["Content calendar", "Reels"],
      scope: "Instagram over six months",
      timeline: "6 months",
      challenge:
        "The boutique studio created distinctive arrangements for homes, hotels and events in Hong Kong, but almost all its business came through word of mouth. Its Instagram account posted occasional finished arrangements with little engagement, and the founders wanted more direct enquiries from new clients.",
      approach:
        "We built a content calendar around seasons, festivals such as Lunar New Year and Mid-Autumn, and client projects. Short videos showed arrangements being built, flowers being chosen at the market and finished pieces in real settings, with captions in English and Traditional Chinese. We also introduced a simple enquiry link and tracked which posts led to bookings.",
      outcome:
        "Followers and engagement grew steadily, and direct bookings for corporate and event work increased, with several hotel clients mentioning the videos. The studio continued the content programme and used popular videos in client proposals.",
      learning: "Showing the craft behind the arrangements created far more interest than finished photos alone.",
      verified: true,
    },
    {
      slug: "corporate-floral-services-research",
      title: "Understanding demand for corporate floral services",
      client: "A floral services company",
      region: "Kuala Lumpur & Penang, Malaysia",
      markets: ["MY"],
      services: ["Business panel", "Lead generation", "Quantitative research"],
      methods: ["Office manager survey", "Lead campaign"],
      scope: "300 office managers",
      timeline: "6 weeks",
      challenge:
        "The company supplied flowers for weddings and private events and wanted to build steadier revenue from corporate clients, such as weekly reception arrangements and event décor. It did not know how offices bought these services or what they valued in a supplier.",
      approach:
        "We surveyed office, facilities and events managers at companies in Kuala Lumpur and Penang about current floral spending, suppliers, budgets and frustrations, in English, Malay and Mandarin. The findings shaped a targeted LinkedIn and email campaign offering a free first arrangement, with leads tracked in a CRM.",
      outcome:
        "Managers valued reliability and consistent quality more than price, and many were unhappy with suppliers who missed deliveries. The campaign generated meetings with qualified companies, and the company signed several weekly contracts within the first quarter.",
      learning: "Reliability, not creativity alone, won recurring corporate business.",
      verified: true,
    },
    {
      slug: "flower-farm-erp",
      title: "Tracking harvests and orders for a flower farm",
      client: "A rose farm",
      region: "Pune",
      markets: ["IN"],
      services: ["Custom business applications", "Mobile app development"],
      methods: ["Harvest tracking app"],
      scope: "One farm",
      timeline: "3 months",
      challenge:
        "The rose farm harvested thousands of stems a day for domestic buyers and exporters, but harvest counts, grading and orders were recorded on paper. Orders were sometimes promised from stock that had already been sold, and the owners could not see wastage by variety or greenhouse.",
      approach:
        "We spent time with harvest and packing teams to understand the daily routine, then built a simple tablet app to record harvest by greenhouse and variety, grading results and packing against orders. Office staff used a web dashboard to see available stock, confirm orders and track wastage.",
      outcome:
        "Over-promising stopped because sales staff could see real-time stock, wastage fell as slow-moving varieties became visible and the owners used greenhouse data to plan replanting.",
      learning: "Simple tools designed around the packing shed were adopted quickly and changed daily decisions.",
      verified: true,
    },
    {
      slug: "florist-gst-bookkeeping",
      title: "Simplifying accounts for a florist chain",
      client: "A florist chain",
      region: "Bengaluru",
      markets: ["IN"],
      services: ["Accounting & bookkeeping", "GST services"],
      methods: ["Bookkeeping setup"],
      scope: "Eight outlets",
      timeline: "Ongoing",
      challenge:
        "The florist chain had grown to eight outlets, each keeping its own records of sales, purchases and expenses. GST filings were often late, input tax credit was missed, and the owners could not tell which outlets were profitable.",
      approach:
        "We set up a common chart of accounts and bookkeeping process for all outlets, introduced digital capture of purchase bills, reconciled past GST filings and established a monthly calendar with reconciliations before every return. The owners received a short monthly report with sales and margins by outlet.",
      outcome:
        "Filings became timely and accurate, eligible input credits were recovered, and the owners identified two outlets with weak margins and adjusted staffing and pricing. The chain also prepared for a bank loan application with clean, consistent financial statements.",
      learning: "Consistent processes across outlets made both compliance and management easier.",
      verified: true,
    },
  ],
  FLORAL_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: FLORAL_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  FOOD_CASES = [
    {
      slug: "snack-concept-taste-test-multicountry",
      title: "Choosing which new snack flavours to launch in three countries",
      client: "A packaged snacks company",
      region: "India, Malaysia & UAE",
      markets: ["IN", "MY", "AE"],
      services: ["Consumer panel", "Quantitative research", "Offline data collection"],
      methods: ["Online concept screening", "Central location taste tests"],
      scope: "2,400 concept respondents, 900 taste-test participants",
      timeline: "9 weeks",
      challenge:
        "The company had developed twelve new flavour ideas for its baked snack range and planned to launch the best three in India, Malaysia and the UAE. Internal tasting panels disagreed sharply, and the marketing team worried that flavours popular in one country would fail in another. Launching the wrong flavours would mean costly production runs and retailer delistings.",
      approach:
        "We screened all twelve concepts online with category buyers in each country, measuring appeal, uniqueness and purchase intent with a monadic design so that every idea was judged fairly. The six strongest moved to central location taste tests in Mumbai, Kuala Lumpur and Dubai, where participants tasted coded samples in rotated order and rated taste, aftertaste, spice level and value. Questionnaires were available in English, Hindi, Malay and Arabic, and quotas covered age, gender and household type.",
      outcome:
        "Two flavours performed strongly in all three countries, while a third, a spicy tamarind flavour, won clearly in India and Malaysia but tested poorly in the UAE. The company launched the two universal flavours everywhere and a market-specific third flavour in each country. Early retail sell-through matched the research rankings, and no flavour had to be withdrawn in its first year.",
      learning:
        "Testing taste in each market protected the launch from assumptions made around a single tasting table.",
      verified: true,
    },
    {
      slug: "beverage-brand-health-tracker-gulf",
      title: "Tracking brand health for a juice brand across the Gulf",
      client: "A fruit juice and dairy beverage brand",
      region: "Saudi Arabia, UAE & Qatar",
      markets: ["SA", "AE", "QA"],
      services: ["Quantitative research", "Consumer panel", "Data analytics & dashboards"],
      methods: ["Quarterly online and face-to-face tracker", "Brand funnel dashboard"],
      scope: "1,800 category buyers per quarter",
      timeline: "Ongoing quarterly programme",
      challenge:
        "The brand faced growing competition from private labels and imported brands, and its advertising budget was under pressure. Each country team ran its own ad hoc surveys with different questions, so leadership could not compare performance or see whether campaigns were working.",
      approach:
        "We designed one tracker with consistent questions in Arabic and English, covering awareness, consideration, purchase, loyalty and brand image. The sample combined our online panel with face-to-face interviews in supermarkets to reach older shoppers and expatriate households who were less active online. Results flowed into a dashboard by country, nationality group and age, with significance testing between waves.",
      outcome:
        "Awareness was high everywhere, but consideration lagged among younger shoppers who saw the brand as traditional and sugary. The brand introduced a reduced-sugar range and a digital campaign aimed at younger buyers, and later tracker waves showed consideration rising in that group, especially in the UAE.",
      learning: "A consistent tracker turned three separate country stories into one clear picture.",
      verified: true,
    },
    {
      slug: "ready-to-eat-meals-usage-attitude",
      title: "Understanding who buys ready-to-eat meals, and why",
      client: "A ready-to-eat foods manufacturer",
      region: "Ten cities across India",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Usage and attitude survey", "In-home interviews"],
      scope: "2,000 households, 24 in-home interviews",
      timeline: "8 weeks",
      challenge:
        "Sales of ready-to-eat curries and rice dishes were growing, but repeat purchase rates were disappointing. The company did not know which households were its best customers, what occasions drove purchase, or why many people tried the products once and never returned.",
      approach:
        "We surveyed grocery shoppers across ten cities about cooking habits, time pressure, attitudes to packaged food and experiences with ready-to-eat products. In-home interviews with regular buyers and lapsed triers explored how meals were prepared, served and judged, including whether families accepted them as “real food”. Interviews were conducted in Hindi, English, Tamil and Marathi.",
      outcome:
        "Regular buyers were mainly working couples and students living away from home, who used the products on busy weekdays. Lapsed triers felt the taste was too generic and portions too small. The company introduced regional recipes and a larger family pack, and focused communication on weekday convenience rather than special occasions.",
      learning: "Lapsed customers explained the repeat-purchase problem better than loyal ones.",
      verified: true,
    },
    {
      slug: "plant-based-dairy-consumer-research",
      title: "Testing demand for plant-based milk alternatives",
      client: "A plant-based dairy start-up",
      region: "Australia, New Zealand & United Kingdom",
      markets: ["AU", "NZ", "UK"],
      services: ["Consumer panel", "Quantitative research", "Research consultancy"],
      methods: ["Online survey with price testing", "Segmentation"],
      scope: "2,500 milk buyers",
      timeline: "7 weeks",
      challenge:
        "The start-up had an oat-based product performing well in cafés and wanted to expand into supermarkets. Investors asked who would buy it at retail, at what price, and how it would compete with established brands.",
      approach:
        "We surveyed people who bought milk or milk alternatives, covering current choices, reasons for switching, taste expectations, sustainability attitudes and price sensitivity using structured price-acceptance questions. Respondents were segmented by needs and behaviour, and results were analysed by country.",
      outcome:
        "Flexible buyers who used both dairy and plant-based milk were the biggest opportunity, motivated mainly by taste in coffee rather than sustainability. The start-up positioned its retail product as the best plant-based milk for coffee, priced close to leading competitors, and used the segmentation in its investor presentation.",
      learning: "The largest opportunity was not the committed vegans the company first assumed.",
      verified: true,
    },
    {
      slug: "restaurant-chain-mystery-dining",
      title: "Mystery dining across a quick-service restaurant chain",
      client: "A quick-service restaurant chain",
      region: "Indonesia & Malaysia",
      markets: ["ID", "MY"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["Mystery dining visits", "Delivery order audits", "Outlet scorecards"],
      scope: "320 outlets, 960 visits per wave",
      timeline: "Quarterly programme",
      challenge:
        "The chain had expanded quickly, and complaints about slow service, cold food and incorrect delivery orders were rising. Head office had operating standards but no independent measure of whether outlets met them.",
      approach:
        "Trained mystery diners visited outlets at lunch, dinner and late-night periods, scoring greeting, order accuracy, waiting time, food temperature, cleanliness and staff behaviour. Separate delivery orders through apps measured accuracy, packaging and arrival temperature. Each visit was photo-documented, and results were shared as outlet scorecards with regional managers.",
      outcome:
        "Late-night service and delivery order accuracy were the weakest areas. The chain revised staffing for late shifts, added an order-check step before delivery handover and linked part of outlet bonuses to scorecard results. Scores improved steadily over the following quarters.",
      learning: "Measuring delivery separately revealed problems dine-in visits would have missed.",
      verified: true,
    },
    {
      slug: "food-export-buyer-research-europe",
      title: "What European importers want from Indian spice and food exporters",
      client: "A food exporters’ council",
      region: "Buyers in Germany, France, the UK & Italy",
      markets: ["IN", "DE", "FR", "UK", "IT"],
      services: ["Business panel", "Qualitative research", "Research consultancy"],
      methods: ["Importer interviews", "Online buyer survey"],
      scope: "35 interviews, 140 survey responses",
      timeline: "8 weeks",
      challenge:
        "Indian exporters of spices, rice and processed foods were losing European orders to competitors, and some consignments had been rejected at borders over residue and labelling issues. The council needed to understand what European buyers expected and where Indian suppliers fell short.",
      approach:
        "We interviewed importers, distributors and retail category buyers in Germany, France, the UK and Italy about supplier selection, quality testing, documentation, sustainability expectations and recent problems with Indian suppliers. A survey then measured how widespread each concern was, with interviews conducted in English, German, French and Italian.",
      outcome:
        "Buyers valued Indian product quality and variety but worried about pesticide residue testing and inconsistent documentation. The council launched a pre-shipment testing programme and documentation training for members, and presented the findings at a buyer-seller meet.",
      learning: "Buyers wanted predictability more than lower prices.",
      verified: true,
    },
    {
      slug: "bakery-brand-social-content",
      title: "Building a social media presence for a premium bakery brand",
      client: "A premium bakery and café chain",
      region: "Dubai & Abu Dhabi",
      markets: ["AE"],
      services: ["Social media marketing", "Video marketing", "Influencer marketing"],
      methods: ["Content calendar", "Short-form video", "Food creator partnerships"],
      scope: "Instagram and TikTok over six months",
      timeline: "6 months",
      challenge:
        "The bakery had loyal customers but little online presence, and new competitors were attracting attention through social media. Its posts were occasional product photos with little engagement.",
      approach:
        "We built a content calendar around seasonal menus and celebrations, produced short videos showing bakers at work and products being finished, and partnered with local food creators for honest reviews with clear disclosure. Content was produced in English and Arabic. Each post linked to online ordering, so the team could see which content drove orders.",
      outcome:
        "Engagement and followers grew steadily, and branches reported customers arriving to order items they had seen online. Seasonal pre-orders for celebration cakes increased. The bakery later used the most popular videos in in-store screens and paid campaigns.",
      learning: "Showing craft and people behind the food built more interest than product photos alone.",
      verified: true,
    },
    {
      slug: "dairy-cooperative-erp-traceability",
      title: "Traceability from farm to shelf for a dairy processor",
      client: "A dairy processor",
      region: "Gujarat",
      markets: ["IN"],
      services: ["ERP development", "Mobile app development", "Data analytics & dashboards"],
      methods: ["Process mapping", "Collection app", "Batch traceability"],
      scope: "400 collection centres, one processing plant",
      timeline: "7 months",
      challenge:
        "The dairy processor collected milk from hundreds of village centres but could not trace quality problems in finished products back to specific sources. Retail and export buyers were demanding stronger food safety controls, and rejected milk was costly.",
      approach:
        "We built a collection app recording quantity, fat content and quality tests at each centre, working offline in villages and syncing when connected. Collection data was linked to tanker routes and production batches in the ERP, and dashboards showed quality trends by centre and route.",
      outcome:
        "Quality issues could be traced to specific centres within hours, and targeted training for centre operators reduced rejected milk. Retail food safety audits became much simpler. The processor also used quality data to reward the best-performing centres.",
      learning: "Traceability improved quality because problems became visible at the source.",
      verified: true,
    },
    {
      slug: "food-delivery-platform-restaurant-partner-study",
      title: "Understanding restaurant partners on a food delivery platform",
      client: "A food delivery platform",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Business panel", "Quantitative research", "Qualitative research"],
      methods: ["Restaurant owner survey", "In-depth interviews"],
      scope: "600 restaurants, 30 interviews",
      timeline: "7 weeks",
      challenge:
        "Restaurants were leaving the food delivery platform, and partner managers heard complaints about commissions, payouts and support. The platform needed to know which issues mattered most before changing its commercial terms.",
      approach:
        "We surveyed restaurant owners and managers about order volumes, commissions, payouts, marketing tools and support, in English, Afrikaans and isiZulu, and interviewed owners who had recently left the platform. Results were analysed by restaurant size and cuisine, since independent restaurants and chains had different needs.",
      outcome:
        "Slow payouts and poor resolution of order disputes mattered more than commission rates. The platform introduced weekly payouts and a dedicated partner support team, and partner churn fell. The platform also introduced a partner dashboard showing orders, ratings and payouts in real time.",
      learning: "Partners judged the platform on reliability as much as on cost.",
      verified: true,
    },
    {
      slug: "food-brand-gst-and-inventory",
      title: "Getting inventory and GST right for a fast-growing food brand",
      client: "A packaged foods brand",
      region: "Maharashtra & Karnataka",
      markets: ["IN"],
      services: ["Accounting & bookkeeping", "GST services", "MIS & financial reporting"],
      methods: ["Inventory reconciliation", "Monthly compliance routine", "MIS"],
      scope: "Two warehouses, modern trade and e-commerce sales",
      timeline: "Ongoing",
      challenge:
        "Rapid growth across modern trade, distributors and e-commerce had left the packaged foods brand with mismatched stock records, unclaimed GST input credits and no clear view of margins by channel. Marketplace settlements arrived net of fees and returns, which made it hard to reconcile sales with bank receipts.",
      approach:
        "We reconciled inventory across warehouses and marketplace fulfilment centres, cleaned up GST records and filings, and set up a monthly close with channel-level margin reporting for the founders. Settlement reports from each marketplace were reconciled monthly with orders, returns and fees.",
      outcome:
        "Stock records matched physical counts, eligible input credits were recovered and the founders identified which channels were most profitable, shifting promotional spending accordingly. The brand also prepared for its first statutory audit with clean, reconciled records.",
      learning: "Clean monthly numbers turned growth decisions into informed ones.",
      verified: true,
    },
  ],
  FOOD_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: FOOD_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  GOVERNMENT_CASES = [
    {
      slug: "citizen-satisfaction-public-services-survey",
      title: "A statewide citizen satisfaction survey on public services",
      client: "A state planning department",
      region: "A large state in North India",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CAPI)", "Data analytics & dashboards"],
      methods: ["Household survey", "District dashboards"],
      scope: "15,000 households across all districts",
      timeline: "14 weeks",
      challenge:
        "The department wanted independent evidence on how citizens experienced health, education, ration distribution, roads and electricity, to guide budget priorities. Previous surveys had covered only a few districts, so officials could not compare performance across the state.",
      approach:
        "We designed a multi-stage household sample covering every district, trained local-language interviewers and used tablets with GPS and time stamps. Results were weighted to population and shown on district dashboards. Back-checks were carried out on a random sample of interviews, and results were shared with district officials in workshops so they could understand and use the findings.",
      outcome:
        "Satisfaction varied widely between districts, and ration distribution and primary health centres showed the largest gaps. The department used the dashboards in district reviews. A second round was planned after eighteen months to track progress. A second round was planned to measure progress.",
      learning: "District-level evidence made priorities concrete.",
      verified: true,
    },
    {
      slug: "scheme-beneficiary-verification",
      title: "Verifying beneficiaries of a direct benefit scheme",
      client: "A central government programme",
      region: "Six states",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CATI & CAPI)", "Data processing & analytics"],
      methods: ["Telephone and field verification"],
      scope: "20,000 beneficiaries",
      timeline: "10 weeks",
      challenge:
        "The programme needed to check whether benefits reached the right people. Reports of missed payments and ineligible beneficiaries had raised questions about the scheme. Officials were concerned that some benefits might not reach eligible households because of outdated records.",
      approach:
        "We verified a random sample of beneficiaries by phone and in person, checking receipt and eligibility. The sample was drawn randomly from beneficiary lists in each state, and interviewers verified identity, eligibility and receipt using structured questions, with field visits for those unreachable by phone. Interviews were conducted in local languages and verified against payment records.",
      outcome:
        "Most payments reached eligible beneficiaries, but some had outdated bank details. The programme updated records. The programme also simplified the process for updating bank details through local offices.",
      learning: "Random verification gave credible evidence.",
      verified: true,
    },
    {
      slug: "local-council-residents-survey",
      title: "A residents’ survey for a local council",
      client: "A local authority",
      region: "England",
      markets: ["UK"],
      services: ["Government research", "Quantitative research", "Reporting & insights"],
      methods: ["Postal, online and telephone survey"],
      scope: "2,500 residents",
      timeline: "9 weeks",
      challenge:
        "The council needed evidence on residents’ priorities ahead of budget decisions. Budgets were under pressure, and councillors wanted residents’ views before making difficult choices. The council needed residents’ views on priorities before difficult budget decisions.",
      approach:
        "We ran a mixed-mode survey to reach all age groups, weighted results and reported by ward. The survey was offered by post, online and telephone, with quotas by age and ward, and results were weighted to the population. Open comments were coded to capture residents’ own priorities. Open comments were coded into themes and shared with service managers.",
      outcome:
        "Road maintenance and social care were top priorities. The council used results in budget consultations. The council published the results and explained how they shaped the budget.",
      learning: "Mixed modes reached residents online surveys miss.",
      verified: true,
    },
    {
      slug: "government-digital-service-usability",
      title: "Usability testing a government digital service",
      client: "A government services authority",
      region: "United Arab Emirates",
      markets: ["AE"],
      services: ["UI/UX design", "Qualitative research", "Web application development"],
      methods: ["Usability testing in Arabic and English"],
      scope: "40 sessions",
      timeline: "6 weeks",
      challenge:
        "Citizens and residents found an online licence renewal service confusing. Many users abandoned the online form and visited service centres instead, adding queues and costs. Many users abandoned the online renewal process and visited service centres instead.",
      approach:
        "We tested the service with users in Arabic and English and recommended redesigns. Sessions included citizens and expatriate residents with different levels of digital confidence, completing real tasks on mobile and desktop. Participants completed real tasks while researchers observed where they hesitated or made errors.",
      outcome:
        "Completion rates improved after redesign, and help-desk calls fell. Usage of the online service increased, and service centre visits for renewals declined. The authority adopted usability testing for other digital services.",
      learning: "Testing with real users improved public services.",
      verified: true,
    },
    {
      slug: "election-voter-awareness-study",
      title: "Measuring voter awareness before elections",
      client: "An election awareness programme",
      region: "Four states",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Content marketing"],
      methods: ["Voter survey", "Message testing"],
      scope: "8,000 voters",
      timeline: "6 weeks",
      challenge:
        "The programme wanted to understand awareness of registration and voting procedures among first-time voters. Turnout among young voters had been low, and the programme wanted to understand why. Turnout among young voters had been low, and the election office wanted to understand why.",
      approach:
        "We surveyed eligible voters, with quotas for young people and women, and tested awareness messages. The survey covered urban and rural areas with quotas for age and gender, and messages were tested in small groups before the campaign. Messages were tested with young voters before the campaign launched.",
      outcome:
        "First-time voters lacked information on registration. The programme focused campaigns on colleges. Registration among first-time voters increased in districts where college campaigns ran. The office also introduced campus registration drives.",
      learning: "Targeting specific groups improved awareness efforts.",
      verified: true,
    },
    {
      slug: "public-transport-commuter-survey",
      title: "A commuter survey for a public transport authority",
      client: "A public transport authority",
      region: "Australia",
      markets: ["AU"],
      services: ["Government research", "Quantitative research", "Data analytics & dashboards"],
      methods: ["On-board and online survey"],
      scope: "6,000 commuters",
      timeline: "8 weeks",
      challenge:
        "The authority needed evidence on commuter satisfaction and travel patterns. Complaints about crowding and delays had increased, and the authority was planning service changes. Complaints about crowding and delays were rising, and the authority needed evidence to plan timetable changes.",
      approach:
        "We surveyed passengers on board and online, weighting results by route. Surveys were offered on board and online, and results were weighted by route and time of day to reflect actual ridership. Open comments helped identify specific stops and times with the worst problems. Survey staff rode selected routes at peak and off-peak times, and online invitations reached regular commuters through the authority’s app.",
      outcome:
        "Reliability and crowding were key concerns. The authority adjusted timetables. Satisfaction improved on routes where timetables changed. The survey became an annual programme to track service quality.",
      learning: "Route-level data guided changes.",
      verified: true,
    },
    {
      slug: "skills-programme-impact-evaluation",
      title: "Evaluating a national skills training programme",
      client: "A skills development ministry",
      region: "Eight states",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Tracer survey", "Employer interviews"],
      scope: "10,000 trainees",
      timeline: "14 weeks",
      challenge:
        "The ministry needed evidence on employment outcomes after training. Placement figures came from training centres themselves, and the ministry wanted independent evidence. The ministry needed independent evidence on whether the programme helped trainees find jobs.",
      approach:
        "We traced trainees and interviewed employers. Trainees were traced six and twelve months after completion by telephone and field visits, and employers were interviewed about job readiness. Interviews with employers explored skills gaps and satisfaction with trainees. Training centres were also visited to assess equipment, trainer qualifications and links with local employers.",
      outcome:
        "Outcomes were strongest where training linked to local employers. The ministry expanded employer partnerships. The ministry also introduced tracking of employment outcomes for all training centres. Training providers with weak outcomes received additional support. Placement data became part of funding decisions for training partners.",
      learning: "Tracer studies showed real outcomes.",
      verified: true,
    },
    {
      slug: "tourism-visitor-survey-government",
      title: "A visitor survey for a national tourism board",
      client: "A tourism authority",
      region: "Morocco",
      markets: ["MA"],
      services: ["Government research", "Quantitative research", "Offline data collection"],
      methods: ["Airport and site interviews"],
      scope: "5,000 visitors",
      timeline: "10 weeks",
      challenge:
        "The board needed data on visitor spending and satisfaction. Tourism was growing, but the board lacked reliable data on visitor spending and satisfaction by market. The board wanted to understand visitor experiences beyond hotel and airport statistics.",
      approach:
        "We interviewed visitors in several languages at airports and attractions. Interviews were conducted in Arabic, French, English, Spanish and German at airports, hotels and major attractions, with quotas by nationality and season. Results were weighted by visitor origin and season. The questionnaire covered planning sources, transport, accommodation, safety, spending and likelihood to recommend.",
      outcome:
        "Visitors wanted better signage and transport. The board prioritised improvements. Satisfaction scores improved in follow-up surveys after signage and transport changes. The board also used the findings in its marketing in key source markets.",
      learning: "Multilingual fieldwork captured diverse visitors.",
      verified: true,
    },
    {
      slug: "municipal-grievance-system",
      title: "A grievance management system for a municipal corporation",
      client: "A municipal corporation",
      region: "Gujarat",
      markets: ["IN"],
      services: ["Web application development", "Mobile app development", "Data analytics & dashboards"],
      methods: ["Process mapping", "Grievance app"],
      scope: "City-wide",
      timeline: "6 months",
      challenge:
        "Complaints were tracked manually, and residents received no updates. Residents often complained that problems were ignored, and officials could not track how long complaints took. Residents’ complaints were recorded on paper and often lost between departments. Departments blamed each other for delays, and residents had no way to know whether anyone was working on their complaint.",
      approach:
        "We built a grievance system with app and web channels, tracking and dashboards. We mapped complaint workflows with each department and built the system with automatic routing, deadlines and escalation. Field staff used a mobile app to update complaints with photos. Complaints were routed automatically to the right department and ward officer, with escalation if deadlines were missed.",
      outcome:
        "Resolution times became visible, and residents received updates. Average resolution times fell, and the corporation published monthly performance reports. Residents could track complaints online. Councillors used ward-level dashboards to follow up on long-pending issues in their areas.",
      learning: "Transparency improved accountability.",
      verified: true,
    },
    {
      slug: "public-health-campaign-evaluation",
      title: "Evaluating a public health awareness campaign",
      client: "A health ministry",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Government research", "Quantitative research", "Reporting & insights"],
      methods: ["Before-and-after survey"],
      scope: "4,000 adults",
      timeline: "6 months",
      challenge:
        "The ministry needed to know whether a campaign improved awareness and behaviour. The campaign was expensive, and the ministry needed evidence to justify continued funding. The ministry needed evidence on whether its campaign improved awareness and behaviour.",
      approach:
        "We surveyed adults before and after the campaign in several languages. Interviews were conducted in English, isiZulu, isiXhosa and Afrikaans, with samples matched before and after the campaign. Samples were matched before and after the campaign by region and age. Questions measured awareness, knowledge and reported actions such as testing or clinic visits, not just recall of the campaign.",
      outcome:
        "Awareness increased significantly. The ministry extended the campaign. The ministry also used the results to refine messages for the next phase. Results guided the selection of channels for the next phase. Clinic data on testing also showed increases during the campaign period.",
      learning: "Before-and-after measurement showed impact.",
      verified: true,
    },
  ],
  GOVERNMENT_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: GOVERNMENT_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  HORTICULTURE_CASES = [
    {
      slug: "mango-grower-export-readiness",
      title: "Are mango growers ready for export markets?",
      client: "A state horticulture mission",
      region: "India, with importer input from the UAE, UK & Japan",
      markets: ["IN", "AE", "UK", "JP"],
      services: ["Government research", "Offline data collection (CAPI)", "Research consultancy"],
      methods: ["Grower survey", "Packhouse audits"],
      scope: "1,300 growers, 22 packhouses",
      timeline: "8 weeks",
      challenge:
        "The mission wanted to expand mango exports but did not know how many growers followed the practices importers require, such as residue management, traceability records and post-harvest treatment.",
      approach:
        "We surveyed growers on spraying records, harvesting practices and buyer arrangements, and audited packhouses against a checklist based on common export requirements. Results were analysed by orchard size and district.",
      outcome:
        "Larger orchards linked to aggregators were close to export-ready; most small growers kept no spray records. The mission launched record-keeping training through grower groups and focused export promotion on clusters with packhouse access.",
      learning: "Readiness varies sharply within a crop; averages would have hidden where support was needed.",
      verified: true,
    },
    {
      slug: "mandi-price-transparency-study",
      title: "How growers experience price discovery in wholesale markets",
      client: "An agri-marketing reform programme",
      region: "Maharashtra & Karnataka",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Grower exit interviews", "Commission agent interviews"],
      scope: "1,000 grower interviews at 14 markets",
      timeline: "6 weeks",
      challenge:
        "The programme was promoting electronic trading in wholesale vegetable markets and wanted to understand how growers currently experienced pricing, deductions and payments.",
      approach:
        "Interviewers spoke to growers as they left the market, while transactions were fresh in their minds, recording prices, deductions and payment timing. Interviews with commission agents captured the other side of the trade.",
      outcome:
        "Growers worried less about the auction price than about deductions and delayed payments. The programme added payment-timeliness tracking and clearer deduction slips to its reform plan.",
      learning: "Interviewing at the moment of experience produces far more accurate answers than recall weeks later.",
      verified: true,
    },
    {
      slug: "polyhouse-adoption-research",
      title: "Why polyhouse farming takes off in some villages and not others",
      client: "A greenhouse equipment company",
      region: "Maharashtra, Karnataka & Himachal Pradesh",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Lead generation"],
      methods: ["Farmer interviews", "Adopter and non-adopter survey"],
      scope: "60 interviews, 700 survey responses",
      timeline: "7 weeks",
      challenge:
        "Despite subsidies, polyhouse adoption was patchy. The company wanted to know what held farmers back and how to identify the most promising prospects.",
      approach:
        "We interviewed adopters, drop-outs and non-adopters, then surveyed a wider sample to measure the barriers. We looked at finance, technical confidence, market linkages and peer influence.",
      outcome:
        "Adoption followed confidence in buyers for the produce, not just subsidy availability. The company partnered with produce buyers in its marketing, and its sales team began prioritising villages with existing market linkages.",
      learning: "The biggest barrier was the market, not the equipment.",
      verified: true,
    },
    {
      slug: "fresh-produce-retail-quality-audit",
      title: "Auditing fresh produce quality across a supermarket chain",
      client: "A regional supermarket chain in the UK",
      region: "United Kingdom",
      markets: ["UK"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["Store audits", "Shopper exit interviews"],
      scope: "60 stores, monthly audits for six months",
      timeline: "6 months",
      challenge:
        "Shoppers complained about wilted vegetables in some branches, but head office could not tell which stores and suppliers were the problem.",
      approach:
        "Auditors visited stores at set times to score produce freshness, display, temperature and wastage using photo-supported checklists. Short exit interviews captured shopper satisfaction. Results flowed into a monthly dashboard by store and supplier.",
      outcome:
        "Problems clustered around two distribution routes with long transit times. The chain changed delivery schedules and supplier assignments, and the dashboard became part of monthly store reviews.",
      learning: "Regular, consistent audits turn vague complaints into specific, fixable problems.",
      verified: true,
    },
    {
      slug: "nursery-plant-buyer-study",
      title: "Understanding urban plant buyers for a nursery brand",
      client: "A plant nursery and gardening brand in Australasia",
      region: "Sydney, Melbourne & Auckland",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Online surveys", "Social media marketing"],
      methods: ["Online survey", "Social listening"],
      scope: "1,200 plant buyers",
      timeline: "5 weeks",
      challenge:
        "Indoor plant sales had grown quickly, then flattened. The brand wanted to understand who bought plants, why some stopped, and what content would keep them engaged.",
      approach:
        "We surveyed plant buyers through our consumer panel and analysed social media conversations about plant care. Questions explored motivations, plant deaths, care knowledge and preferred channels.",
      outcome:
        "Many buyers stopped after plants died and blamed themselves. The brand launched care guides, low-maintenance plant ranges and a WhatsApp help line, and refocused its social content on practical care tips.",
      learning: "Helping customers succeed with the product created more repeat buying than discounts.",
      verified: true,
    },
    {
      slug: "post-harvest-loss-study",
      title: "Measuring post-harvest losses in tomatoes and onions",
      client: "A research institute",
      region: "Maharashtra, Karnataka & Madhya Pradesh",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Data processing & analytics"],
      methods: ["Farmer survey", "Trader survey", "Storage observation"],
      scope: "1,500 farmers and 300 traders",
      timeline: "10 weeks",
      challenge:
        "Loss estimates for perishable crops varied widely between reports. The institute needed field evidence on where and why losses occurred, to guide storage and processing policy.",
      approach:
        "We surveyed farmers and traders on harvesting, grading, storage, transport and sales, and observed storage conditions on a sample of farms. Losses were recorded at each stage using consistent definitions.",
      outcome:
        "Onion losses were concentrated in on-farm storage, while tomato losses peaked in transport and handling. The institute’s recommendations differed by crop instead of proposing one solution for all.",
      learning: "Consistent definitions of “loss” across stages made the results comparable and credible.",
      verified: true,
    },
    {
      slug: "banana-cluster-fpo-digital",
      title: "Connecting banana growers to buyers through a simple digital platform",
      client: "A farmer producer company",
      region: "Jalgaon, Maharashtra",
      markets: ["IN"],
      services: ["Web application development", "Mobile app development", "WhatsApp marketing"],
      methods: ["Grower and buyer interviews", "Listing and order platform"],
      scope: "2,000 grower members, 40 bulk buyers",
      timeline: "4 months",
      challenge:
        "Members sold individually to traders at low prices. The producer company wanted to aggregate supply and connect members with bulk buyers, but needed a tool members could actually use.",
      approach:
        "We built a simple system where field staff recorded expected harvest quantities, buyers could see aggregated supply and place orders, and members received WhatsApp updates on pickup dates and payments.",
      outcome:
        "The producer company began negotiating bulk sales with several buyers, and members could see when and how much they would be paid. Field staff gained a clear view of upcoming harvests.",
      learning:
        "Building around field staff and WhatsApp, rather than expecting every grower to use an app, made adoption realistic.",
      verified: true,
    },
    {
      slug: "spice-farmer-certification-research",
      title: "What it takes for spice farmers to gain certification",
      client: "A spice exporter",
      region: "Kerala & Karnataka",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Research consultancy"],
      methods: ["Farmer interviews", "Field practice survey"],
      scope: "40 interviews, 650 farmers surveyed",
      timeline: "7 weeks",
      challenge:
        "Buyers increasingly demanded certified sustainable spices, but few smallholders supplying the exporter held certification. The exporter wanted to know what stood in the way.",
      approach:
        "We interviewed farmers about their practices, costs and attitudes to certification, and surveyed a wider group to measure the gaps between current practice and certification standards.",
      outcome:
        "Record-keeping and inspection costs were the main barriers, not farming practices themselves. The exporter introduced group certification with shared record-keeping support.",
      learning: "Many farmers were closer to the standard than expected; the paperwork was the real gap.",
      verified: true,
    },
    {
      slug: "horticulture-exporter-virtual-cfo",
      title: "Steadying cash flow for a seasonal fruit exporter",
      client: "A fresh fruit exporter",
      region: "Maharashtra",
      markets: ["IN"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "Business finance services"],
      methods: ["Cash flow forecasting", "Working capital planning"],
      scope: "Annual export cycle, two banking relationships",
      timeline: "12-month engagement",
      challenge:
        "The exporter’s business was highly seasonal: cash went out to growers and packhouses months before importers paid. Each season brought a cash crunch and expensive short-term borrowing.",
      approach:
        "Our virtual CFO built a 13-week rolling cash forecast aligned with the harvest calendar, reviewed customer payment terms and prepared a working capital proposal for the bank based on the seasonal cycle.",
      outcome:
        "The exporter arranged a seasonal working capital facility in advance, negotiated partial advance payments with two importers and avoided last-minute borrowing in the following season.",
      learning: "Seasonal businesses need seasonal financial planning; annual averages hide the crunch.",
      verified: true,
    },
    {
      slug: "flower-and-vegetable-seed-dealer-study",
      title: "Strengthening a vegetable seed brand’s dealer network",
      client: "A vegetable seed company",
      region: "Kenya, South Africa & Egypt",
      markets: ["ZA", "EG"],
      services: ["Business panel", "Offline data collection (CATI)", "Reporting & insights"],
      methods: ["Dealer telephone survey", "Dealer visits"],
      scope: "420 seed dealers",
      timeline: "5 weeks",
      challenge:
        "The company’s dealers stocked several competing brands, and the client wanted to know how dealers decided which seeds to recommend to growers.",
      approach:
        "We interviewed dealers by phone about stocking decisions, margins, returns policies, field support and grower feedback, then visited a sample of shops to observe displays and recommendations.",
      outcome:
        "Dealers recommended brands that accepted returns of unsold seed and provided field staff during disease outbreaks. The company revised its returns policy and placed agronomists in its weakest regions.",
      learning: "Dealer recommendations follow risk-sharing and support, not just margins.",
      verified: true,
    },
  ],
  HORTICULTURE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: HORTICULTURE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  HOSPITALITY_CASES = [
    {
      slug: "hotel-guest-experience-tracker",
      title: "A guest experience programme for a hotel group",
      client: "A mid-scale hotel group",
      region: "India, UAE & Saudi Arabia",
      markets: ["IN", "AE", "SA"],
      services: ["Quantitative research", "Online surveys", "Data analytics & dashboards"],
      methods: ["Post-stay survey", "Review analysis", "Hotel dashboards"],
      scope: "35 hotels, around 6,000 responses a month",
      timeline: "Ongoing programme",
      challenge:
        "The group’s online ratings varied widely between hotels, but managers only saw scattered review comments and complaint emails. Head office could not tell whether problems were caused by rooms, service, food or check-in, or which hotels needed attention most urgently.",
      approach:
        "We designed a short post-stay survey sent by email and WhatsApp within a day of check-out, in English and Arabic, covering booking, arrival, room, cleanliness, food, staff and value. Open comments were coded into themes, and public reviews from booking sites were analysed alongside the survey. Results appeared on dashboards for each hotel, with alerts when scores dropped.",
      outcome:
        "Check-in delays at peak times and inconsistent breakfast quality were the biggest drivers of low scores, more than room condition. The group introduced express check-in, revised breakfast standards and linked part of managers’ bonuses to guest scores. Online ratings improved at most hotels over the following year.",
      learning: "Combining survey data with public reviews gave managers a complete and credible picture.",
      verified: true,
    },
    {
      slug: "hotel-mystery-stay-audits",
      title: "Mystery stays to check brand standards",
      client: "A luxury hotel brand",
      region: "Switzerland, Italy, France & Spain",
      markets: ["CH", "IT", "FR", "ES"],
      services: ["Offline data collection", "Reporting & insights", "Data analytics & dashboards"],
      methods: ["Overnight mystery stays", "Standard-by-standard scoring"],
      scope: "24 hotels, two stays per hotel per year",
      timeline: "Ongoing programme",
      challenge:
        "The brand promised a consistent luxury experience, but guests reported differences between properties, especially in personalisation and responsiveness. Management needed objective evidence before investing in training.",
      approach:
        "Experienced assessors stayed overnight as normal guests, testing reservations, arrival, room readiness, in-room dining, concierge requests, spa and departure against more than 300 brand standards. Visits were conducted in the local language and in English. Detailed reports with photos were shared with general managers.",
      outcome:
        "Physical standards were strong, but personalisation, such as using guests’ names and anticipating needs, was inconsistent. The brand introduced personalisation training and guest preference tracking, and scores in those areas improved in the following year. General managers also used the reports to recognise team members who delivered outstanding service.",
      learning: "Luxury depended on small human touches that only real stays could measure.",
      verified: true,
    },
    {
      slug: "restaurant-group-menu-pricing",
      title: "Testing new menu items and prices for a restaurant group",
      client: "A casual dining restaurant group",
      region: "Bengaluru, Hyderabad & Chennai",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection", "Financial modelling"],
      methods: ["In-restaurant tasting tests", "Price acceptance survey", "Margin model"],
      scope: "1,200 diners",
      timeline: "6 weeks",
      challenge:
        "Rising costs of vegetables, dairy and cooking oil were squeezing margins across the group’s restaurants. Management needed to raise prices and refresh the menu, but feared losing regular diners to competitors in the busy dining districts of Bengaluru, Hyderabad and Chennai.",
      approach:
        "We ran tasting sessions in restaurants with regular diners, who tried proposed new dishes and rated taste, portion and value. Diners were then asked structured price-acceptance questions for both new and existing favourites. Our finance team combined the results with recipe costs to model margins and expected demand under different pricing scenarios.",
      outcome:
        "Several new dishes tested strongly even at higher prices, while a few popular staples were very price sensitive. The group raised prices selectively, introduced the strongest new dishes as premium options and kept staples close to existing prices. Margins improved without a drop in footfall.",
      learning: "Testing with real diners replaced guesswork with evidence in pricing decisions.",
      verified: true,
    },
    {
      slug: "hotel-direct-booking-growth",
      title: "Growing direct bookings for a resort group",
      client: "A beach and hill resort group",
      region: "Goa, Kerala & Himachal Pradesh",
      markets: ["IN"],
      services: ["Performance marketing", "Landing page & CRO", "SEO services"],
      methods: ["Booking engine optimisation", "Search and social campaigns", "Email journeys"],
      scope: "Website and booking engine for six resorts",
      timeline: "8 months",
      challenge:
        "Most of the resort group’s bookings came through online travel agencies, which charged high commissions and controlled the guest relationship. The group’s own website attracted visitors but converted poorly, and past guests rarely booked directly when they returned.",
      approach:
        "We reviewed the booking journey on mobile and desktop, simplified the booking engine, added clear room comparisons and photos, and introduced member-only rates and benefits. Search and social campaigns targeted people searching for each resort by name and destination, and email journeys invited past guests back with personalised offers.",
      outcome:
        "Direct bookings grew as a share of total bookings within the season, reducing commission costs. Repeat guests increasingly booked directly, and the group gained email consent for more guests to market to directly.",
      learning: "A simple booking experience plus member benefits gave guests a reason to book direct.",
      verified: true,
    },
    {
      slug: "hospitality-staff-retention-study",
      title: "Why hotel staff leave, and what makes them stay",
      client: "A hotel management company",
      region: "UAE & Qatar",
      markets: ["AE", "QA"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous staff survey", "Exit interviews"],
      scope: "2,500 staff, 40 exit interviews",
      timeline: "8 weeks",
      challenge:
        "Turnover among housekeeping and food and beverage staff was high, raising recruitment and training costs and affecting service quality. Many staff were migrant workers from South Asia, Africa and the Philippines, and management was unsure why so many left within their first year.",
      approach:
        "We ran an anonymous survey in English, Arabic, Hindi, Nepali, Tagalog and Swahili, covering pay, accommodation, workload, supervision and career progression. Exit interviews by phone with recent leavers explored their reasons in detail. Results were reported by department and hotel only where groups were large enough to protect anonymity.",
      outcome:
        "Accommodation conditions and lack of clear career progression were the strongest reasons for leaving. The company upgraded staff housing, introduced skills-based promotion steps and created a simple grievance channel. Turnover fell over the following year.",
      learning: "Staff wellbeing directly shaped the guest experience.",
      verified: true,
    },
    {
      slug: "travel-tourism-visitor-segmentation",
      title: "Segmenting international visitors for a tourism destination",
      client: "A destination marketing organisation",
      region: "Visitors from the UK, Germany, the USA, Japan & Australia",
      markets: ["UK", "DE", "US", "JP", "AU"],
      services: ["Consumer panel", "Quantitative research", "Research consultancy"],
      methods: ["Online survey of travellers", "Segmentation"],
      scope: "4,000 international travellers",
      timeline: "9 weeks",
      challenge:
        "The destination marketed itself with the same message in every country, focusing on beaches. Visitor numbers had plateaued, and the organisation wanted to know which travellers from which countries offered the most growth and what would attract them.",
      approach:
        "We surveyed travellers in the UK, Germany, the USA, Japan and Australia who had taken an international holiday recently, covering motivations, travel styles, spending and perceptions of the destination. Responses were segmented by holiday needs, and each segment was profiled by country. Questionnaires were offered in English, German and Japanese.",
      outcome:
        "Culture-seekers and wellness travellers were the most valuable segments, with different country profiles. Campaigns were tailored by market and segment, emphasising culture in Japan and Germany and wellness in the UK and Australia.",
      learning: "Segmenting travellers revealed growth that a single message had missed.",
      verified: true,
    },
    {
      slug: "restaurant-reputation-management",
      title: "Improving online reviews for a restaurant chain",
      client: "A restaurant chain",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Online reputation management", "Social media marketing"],
      methods: ["Review response programme", "Review requests"],
      scope: "45 outlets",
      timeline: "6 months",
      challenge:
        "Ratings for the chain’s outlets on Google and delivery apps were falling, and many negative reviews went unanswered. New customers often chose competitors based on ratings.",
      approach:
        "We analysed reviews to find recurring themes, trained outlet managers to respond politely and quickly in English, Malay and Bahasa Indonesia, and introduced review requests after visits and deliveries. Managers received simple response guidelines and templates, with escalation rules for serious complaints such as food safety. Review requests were sent by SMS and WhatsApp after visits and deliveries, with a direct link to the review page.",
      outcome:
        "Response rates rose, review volume increased and average ratings improved. Recurring complaints about slow delivery led to operational changes. The chain also used review themes in monthly operations meetings, so recurring problems were fixed at the source.",
      learning: "Responding to reviews showed customers they were heard.",
      verified: true,
    },
    {
      slug: "hotel-revenue-mis",
      title: "Monthly performance reporting for a hotel owner",
      client: "A hotel owning company",
      region: "Rajasthan",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Virtual CFO services"],
      methods: ["Hotel KPI dashboard"],
      scope: "Five hotels",
      timeline: "6 months",
      challenge:
        "The company owned five heritage hotels in Rajasthan, each run by a separate manager with its own reports. The owners could not compare performance or see whether rising costs were eroding profits.",
      approach:
        "We designed a monthly management report with occupancy, average room rate, revenue per available room, food and beverage margins and key costs for each hotel, drawing data from property systems and accounts. Hotel managers were trained to submit data in a standard format, and the report highlighted variances against budget and last year with short explanations.",
      outcome:
        "The owners identified one hotel with low occupancy and high staff costs and worked with its manager on pricing and staffing. Monthly reviews became a regular discipline. The owners also used the reports to plan seasonal pricing and staffing more accurately.",
      learning: "Consistent measures across hotels made comparison and action possible.",
      verified: true,
    },
    {
      slug: "cloud-kitchen-market-entry",
      title: "Assessing demand for a cloud kitchen brand",
      client: "A cloud kitchen start-up",
      region: "Dubai & Riyadh",
      markets: ["AE", "SA"],
      services: ["Research consultancy", "Consumer panel", "Financial modelling"],
      methods: ["Delivery user survey", "Market model"],
      scope: "1,500 food delivery users",
      timeline: "6 weeks",
      challenge:
        "A successful cloud kitchen start-up wanted to expand into Dubai and Riyadh but did not know which cuisines, price points and delivery areas would perform best. Rents, delivery platform fees and customer tastes differed sharply from its home market, and a wrong menu could mean months of losses.",
      approach:
        "We surveyed food delivery users in English and Arabic about ordering habits, cuisines, health preferences and prices, and modelled demand by area. The survey covered citizens and expatriates, with quotas by nationality, age and area, and asked users to choose between realistic menu and price combinations.",
      outcome:
        "Healthy bowls and high-protein meals showed strong demand. The start-up launched with that menu in two areas of each city. Order volumes in the first months were in line with the model, and the start-up added a third kitchen in Dubai within a year.",
      learning: "Local demand data shaped a menu that worked from day one.",
      verified: true,
    },
    {
      slug: "hotel-guest-wifi-app",
      title: "A guest app for a boutique hotel group",
      client: "A boutique hotel group",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Mobile app development", "UI/UX design"],
      methods: ["Guest research", "Guest app"],
      scope: "Eight hotels",
      timeline: "4 months",
      challenge:
        "Guests at the boutique hotels phoned reception for routine requests such as towels, restaurant bookings and late checkout, keeping staff from personal service. The hotels prided themselves on personal service, but small teams were tied up answering the phone during busy check-in and dinner hours.",
      approach:
        "We interviewed guests and staff, then built a simple guest app accessed through a QR code in each room, with requests, local recommendations and booking features. The app worked in any browser without a download, and staff received requests on a tablet at reception with alerts for anything urgent. We tested early versions with guests at one hotel before rollout.",
      outcome:
        "Reception calls fell, requests were handled faster and guests rated the convenience highly. Staff reported more time for personal recommendations, and guest reviews increasingly mentioned responsiveness.",
      learning: "Self-service for simple requests freed staff for personal attention.",
      verified: true,
    },
  ],
  HOSPITALITY_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: HOSPITALITY_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  INDUSTRIAL_ROBOTS_CASES = [
    {
      slug: "robot-adoption-barriers-msme",
      title: "Why small manufacturers hesitate to adopt industrial robots",
      client: "An industrial robotics company",
      region: "Pune, Chennai, Coimbatore, Ludhiana & Rajkot",
      markets: ["IN"],
      services: ["Business panel", "Qualitative research", "Quantitative research"],
      methods: ["Plant owner interviews", "Telephone survey"],
      scope: "40 interviews, 450 survey responses",
      timeline: "8 weeks",
      challenge:
        "Robot adoption was growing among large automotive plants but remained rare in small and mid-sized factories. The company wanted to understand what held these manufacturers back and how to make automation feel achievable.",
      approach:
        "We first interviewed owners and plant heads at small factories in machining, welding and packaging clusters, exploring their experiences with automation, labour challenges and investment decisions. A telephone survey then measured how common each barrier was, segmented by industry and company size.",
      outcome:
        "Owners were less worried about robot prices than about downtime during installation, lack of in-house skills and uncertainty about payback. The company introduced fixed-price pilot cells with guaranteed installation timelines, operator training and a simple payback calculator for its sales team. Early pilots were placed with owners who had taken part in the research, which gave the company real case examples for other factories in the same clusters.",
      learning: "Reducing perceived risk mattered more than reducing the price.",
      verified: true,
    },
    {
      slug: "automation-market-sizing-india",
      title: "Sizing the market for collaborative robots in Indian factories",
      client: "A global automation company entering India",
      region: "India",
      markets: ["IN"],
      services: ["Research consultancy", "Financial modelling", "Business panel"],
      methods: ["Desk research", "Expert and integrator interviews", "Bottom-up model"],
      scope: "45 interviews with integrators, plant heads and experts",
      timeline: "9 weeks",
      challenge:
        "The company needed a credible estimate of demand for collaborative robots in India to plan its entry, but published estimates varied widely and lacked transparent assumptions.",
      approach:
        "We combined industry data on factories by sector and size with interviews with system integrators, plant engineers and industry experts, estimating which applications were realistic for collaborative robots. Our finance team built a bottom-up model with scenarios and clearly stated assumptions. We also tested the model’s assumptions in follow-up conversations with several integrators, adjusting them where real project experience suggested different adoption rates.",
      outcome:
        "Electronics assembly, packaging and machine tending in mid-sized plants offered the most realistic early demand. The company prioritised partnerships with integrators serving those sectors and presented the model to its global leadership. The model was handed over with documentation, so the India team could update it each quarter as new project data arrived.",
      learning: "Integrators knew where demand really was, because they saw projects before anyone else.",
      verified: true,
    },
    {
      slug: "system-integrator-partner-research",
      title: "Understanding what system integrators need from a robot brand",
      client: "An industrial robot manufacturer",
      region: "Germany, Italy & Switzerland",
      markets: ["DE", "IT", "CH"],
      services: ["Business panel", "Qualitative research", "Reporting & insights"],
      methods: ["In-depth interviews with integrators"],
      scope: "30 integrator interviews",
      timeline: "6 weeks",
      challenge:
        "Most robot sales happened through system integrators, who could recommend any brand. The manufacturer wanted to know how integrators chose which brands to promote. Several integrators had quietly shifted their recommendations to competing brands, and the manufacturer only noticed when regional sales fell.",
      approach:
        "We interviewed integrators of different sizes about brand selection, technical support, training, margins, lead times and their experience with different manufacturers. We spoke with small integrators serving single clusters as well as larger national firms, because their needs and frustrations were often very different.",
      outcome:
        "Integrators favoured brands that offered quick technical support during commissioning and reliable spare parts. The manufacturer set up an integrator support desk and training academy. It also simplified its partner pricing and created a shared demonstration facility where integrators could bring their own customers.",
      learning: "Supporting partners during difficult installations built lasting loyalty.",
      verified: true,
    },
    {
      slug: "robotics-workforce-impact-study",
      title: "How automation changes jobs on the factory floor",
      client: "A skills and labour research foundation",
      region: "Automotive and electronics clusters",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Government research"],
      methods: ["Worker and manager interviews", "Employer survey"],
      scope: "60 interviews, 200 employers",
      timeline: "10 weeks",
      challenge:
        "The foundation wanted evidence on how automation affected jobs, skills and wages in factories that had introduced robots, to inform skills policy. Public debate was dominated by fears of job losses, but there was little ground-level evidence from Indian factories.",
      approach:
        "We interviewed workers, supervisors and HR managers at factories that had automated processes, and surveyed employers about job changes, training and new roles created. Interviews with workers were held away from the workplace and in their own languages, so they could speak freely about how their jobs had changed.",
      outcome:
        "Automation reduced some manual roles but created demand for operators, maintenance technicians and programmers. Workers who received training moved into better-paid roles. The foundation recommended employer-linked reskilling programmes. Several participating employers also agreed to share data on training and redeployment, helping the foundation build practical case examples for policymakers.",
      learning: "Training determined whether automation helped or hurt workers.",
      verified: true,
    },
    {
      slug: "robot-maker-lead-generation",
      title: "Generating qualified enquiries for robotic automation cells",
      client: "A robotic automation company",
      region: "United States & Canada",
      markets: ["US", "CA"],
      services: ["B2B digital marketing", "Video marketing", "Lead generation"],
      methods: ["Application videos", "LinkedIn and search campaigns", "Enquiry qualification"],
      scope: "Website, video library and campaigns",
      timeline: "8 months",
      challenge:
        "Plant heads found it hard to imagine how robots would work in their factories, and most enquiries came from students and job seekers rather than buyers.",
      approach:
        "We produced short videos of real automation cells in welding, palletising and machine tending, with plant managers describing results. LinkedIn campaigns targeted manufacturing roles, and enquiry forms asked about application, volumes and timelines. Plant managers featured in the videos explained both benefits and challenges, which made the content more credible than polished promotional material.",
      outcome:
        "Enquiries from manufacturers increased, and sales calls started with clearer requirements. Videos became a key tool for salespeople in early conversations. Marketing also built a library of short application clips that salespeople could send on WhatsApp after first meetings.",
      learning: "Seeing a robot working in a similar factory made automation tangible.",
      verified: true,
    },
    {
      slug: "robot-service-contract-analytics",
      title: "Predicting maintenance needs from robot service data",
      client: "An industrial robot service provider",
      region: "Japan & Taiwan",
      markets: ["JP", "TW"],
      services: ["Data analytics & dashboards", "AI & automation solutions", "Cloud & DevOps services"],
      methods: ["Service data analysis", "Predictive dashboard"],
      scope: "1,200 installed robots",
      timeline: "5 months",
      challenge:
        "The provider responded to breakdowns as they happened, leading to unplanned downtime for customers and costly emergency visits. Engineers often travelled long distances for faults that might have been prevented, and customers were questioning the value of their service contracts.",
      approach:
        "We analysed service records, error logs and usage data to identify patterns preceding failures, then built a dashboard flagging robots likely to need maintenance, with alerts for service planners. Service engineers reviewed the early warning signals with us, helping to separate meaningful patterns from noise in the error logs.",
      outcome:
        "The provider shifted part of its work from emergency repairs to planned maintenance, improving customer uptime and making service schedules more predictable. Customers on planned maintenance contracts received monthly health reports, which strengthened renewals and opened conversations about upgrades.",
      learning: "Historical service data already held the early warning signs.",
      verified: true,
    },
    {
      slug: "robotics-startup-investor-model",
      title: "Preparing a robotics start-up for its funding round",
      client: "A warehouse robotics start-up",
      region: "Bengaluru",
      markets: ["IN"],
      services: ["Financial modelling", "Virtual CFO services", "Corporate finance advisory"],
      methods: ["Unit economics model", "Investor materials"],
      scope: "Three-year financial model",
      timeline: "2 months",
      challenge:
        "The start-up had pilot customers but struggled to explain its unit economics and capital needs to investors. Early investor meetings had ended with questions about hardware costs and payback periods that the founders could not answer confidently.",
      approach:
        "We built a driver-based model covering deployments, hardware costs, subscription revenue, service costs and cash needs, with scenarios. Our team also helped prepare the data room and investor narrative. Assumptions were drawn from pilot data wherever possible, and the model clearly marked which numbers were proven and which were projections still to be tested.",
      outcome:
        "The founders presented a clear, defensible model and answered investor questions confidently during due diligence. After the round, the same model became the basis for monthly board reporting, comparing actual deployments and costs with the plan.",
      learning: "Clear unit economics turned an exciting technology into an investable business.",
      verified: true,
    },
    {
      slug: "automation-training-centre-evaluation",
      title: "Evaluating a robotics and automation training centre",
      client: "A state skills mission",
      region: "Tamil Nadu",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Trainee tracer survey", "Employer interviews"],
      scope: "600 trainees, 30 employers",
      timeline: "8 weeks",
      challenge:
        "The mission had set up a training centre for automation skills and wanted to know whether graduates found relevant jobs. The centre had been running for three years with significant public investment, but placement figures came only from self-reported data.",
      approach:
        "We traced graduates six to twelve months after training to record employment, roles and wages, and interviewed employers about graduates’ skills. Graduates were reached by phone and, where needed, through the centre’s alumni groups, and employers were asked to describe specific gaps they had seen in new hires.",
      outcome:
        "Graduates with hands-on programming experience found jobs quickly, while others struggled. The centre expanded practical lab time and industry projects. Industry partners also agreed to offer short internships, giving trainees experience on real production lines before graduation.",
      learning: "Practical experience was the strongest predictor of employment.",
      verified: true,
    },
    {
      slug: "robot-safety-perception-study",
      title: "How workers feel about working alongside robots",
      client: "An automotive component manufacturer in Germany",
      region: "Baden-Württemberg, Germany",
      markets: ["DE"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["Worker survey", "Shop-floor discussions"],
      scope: "500 workers in automated lines",
      timeline: "6 weeks",
      challenge:
        "After introducing collaborative robots, the company noticed workers avoided certain stations and productivity gains were lower than expected. Some workers had stopped using the collaborative features altogether, running the robots only in slower, fenced modes.",
      approach:
        "We surveyed workers anonymously about safety perceptions, training and job security, and held discussions on the shop floor to understand concerns. We also observed shifts at the automated lines, which showed where workers paused or took detours around robot cells.",
      outcome:
        "Workers worried about unexpected robot movements and job losses. The company improved training, added visual safety signals and communicated clearly about redeployment plans. Productivity at the automated stations improved over the following months as workers became more confident, and some volunteered to train colleagues on the new systems.",
      learning: "Human acceptance determined the success of automation.",
      verified: true,
    },
    {
      slug: "automation-company-crm",
      title: "A CRM for long industrial automation sales cycles",
      client: "An automation solutions company",
      region: "India",
      markets: ["IN"],
      services: ["CRM development", "Marketing automation", "Data analytics & dashboards"],
      methods: ["Sales process mapping", "CRM implementation"],
      scope: "40 sales and application engineers",
      timeline: "4 months",
      challenge:
        "Automation projects took months from first contact to order, involving site visits, proposals and trials. Opportunities were tracked in spreadsheets and often lost when staff changed. Forecasts were based on salespeople’s optimism rather than evidence, making it hard to plan engineering capacity for upcoming projects.",
      approach:
        "We mapped the sales process with sales and application engineers, implemented a CRM with stages for site surveys, proposals and trials, and connected website enquiries and email nurturing. Application engineers were involved closely, because their site-visit notes and trial results were essential for accurate proposals and forecasting.",
      outcome:
        "Management gained a clear pipeline view, follow-ups became consistent and opportunities were no longer lost during staff changes. Management also began reviewing win and loss reasons each quarter, which helped the team focus on applications where it was most competitive.",
      learning: "Long sales cycles need systems, not memory.",
      verified: true,
    },
  ],
  INDUSTRIAL_ROBOTS_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: INDUSTRIAL_ROBOTS_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  INFORMATION_SERVICES_CASES = [
    {
      slug: "business-data-provider-user-needs",
      title: "Understanding what users need from a company information database",
      client: "A business information provider",
      region: "United Kingdom, United States & India",
      markets: ["UK", "US", "IN"],
      services: ["Qualitative research", "Business panel", "UI/UX design"],
      methods: ["User interviews", "Task-based usability testing", "User survey"],
      scope: "30 interviews, 600 survey responses",
      timeline: "8 weeks",
      challenge:
        "The provider’s subscribers included sales teams, credit analysts and procurement managers, but product decisions were based on a few vocal customers. Renewal rates were slipping, and the company did not know which features each user group valued or struggled with.",
      approach:
        "We interviewed users in each role about their workflows, then watched them complete real tasks such as checking a supplier or building a prospect list. A survey of subscribers measured how often each task occurred and how satisfied users were with data quality, search and exports.",
      outcome:
        "Credit analysts valued data freshness above all, while sales teams needed better contact data and CRM exports. The provider introduced role-based workspaces and data freshness indicators, and prioritised CRM integration. Product teams used the findings to prioritise their roadmap for the following year.",
      learning: "Different roles used the same product for very different jobs.",
      verified: true,
    },
    {
      slug: "market-data-collection-retail-prices",
      title: "Collecting retail price data across cities",
      client: "A data and analytics company",
      region: "India, Indonesia & Egypt",
      markets: ["IN", "ID", "EG"],
      services: ["Offline data collection", "Data processing & analytics", "Custom business applications"],
      methods: ["Store price collection with mobile app", "Quality checks"],
      scope: "5,000 stores monthly",
      timeline: "Ongoing monthly programme",
      challenge:
        "The client needed reliable monthly prices for everyday products from traditional and modern stores to build price indices. Previous suppliers had delivered data with gaps and unexplained outliers, which undermined confidence in the indices.",
      approach:
        "Field teams collected prices using a mobile app with photo evidence and GPS, and back-office teams checked outliers and missing data before delivery. Field staff were trained on product specifications so the same pack sizes and variants were recorded each month, and supervisors re-checked a sample of stores. Outliers were investigated with the collector before data was released.",
      outcome:
        "The client received consistent monthly datasets with documented quality checks, supporting its price indices. Data gaps fell sharply, and the client expanded the programme to more product categories and cities. The client later extended the programme to additional cities.",
      learning: "Photo evidence made price data verifiable.",
      verified: true,
    },
    {
      slug: "ratings-agency-stakeholder-survey",
      title: "Stakeholder perceptions of a credit ratings agency",
      client: "A credit ratings agency",
      region: "India & UAE",
      markets: ["IN", "AE"],
      services: ["Business panel", "Qualitative research", "Reporting & insights"],
      methods: ["Interviews with issuers, investors and bankers"],
      scope: "40 interviews",
      timeline: "7 weeks",
      challenge:
        "The agency wanted honest feedback on its methodology, communication and research from issuers and investors. The agency competed with larger global firms and needed to understand how its work was perceived. The agency wanted independent feedback on its credibility, research quality and communication, which stakeholders rarely gave directly.",
      approach:
        "We conducted confidential interviews with corporate finance heads, fund managers and bankers. Interviews were conducted by senior researchers in person and by video, and participants were assured that comments would be reported without names. Findings were grouped by stakeholder type so the agency could see how issuers and investors differed.",
      outcome:
        "Stakeholders valued its research but wanted faster rating rationales. The agency shortened publication timelines. Stakeholder feedback also led to clearer explanations of methodology changes and more regular sector reports.",
      learning: "Confidential interviews produced candid feedback.",
      verified: true,
    },
    {
      slug: "legal-information-platform-ux",
      title: "Improving search for a legal information platform",
      client: "A legal research database",
      region: "India",
      markets: ["IN"],
      services: ["UI/UX design", "Qualitative research", "Web application development"],
      methods: ["Lawyer interviews", "Search usability testing"],
      scope: "25 sessions",
      timeline: "3 months",
      challenge:
        "Lawyers found search results hard to filter, slowing research. Junior lawyers in particular spent long hours searching, and some firms were considering competing products. Lawyers complained that finding relevant judgments took too long, and some firms were considering competing platforms.",
      approach:
        "We observed lawyers searching for cases and statutes, then redesigned filters and results. Sessions were held with lawyers at large firms, small practices and in-house legal teams, each completing real research tasks. We redesigned search filters, result previews and citation links, then tested the new design with the same users. Prototype changes were tested with the same lawyers before development.",
      outcome:
        "Research tasks became faster in testing, and subscribers responded positively. Renewals improved among firms that had considered switching, and the publisher used the redesign in its marketing. The platform also added saved searches and alerts requested during sessions.",
      learning: "Observing real tasks guided practical improvements.",
      verified: true,
    },
    {
      slug: "information-services-market-sizing",
      title: "Sizing demand for ESG data among investors",
      client: "An information services company",
      region: "United Kingdom, Switzerland, Japan & Hong Kong",
      markets: ["UK", "CH", "JP", "HK"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Investor interviews", "Market model"],
      scope: "30 interviews",
      timeline: "7 weeks",
      challenge:
        "The company planned an ESG data product but needed evidence of demand and pricing. Several competitors were launching ESG products, and the company had to decide quickly where to focus. The company was considering launching an ESG data product but did not know how large demand was or which data sets mattered most.",
      approach:
        "We interviewed asset managers about ESG data needs, budgets and providers, and built a demand model. Interviews covered portfolio managers, ESG analysts and data buyers at asset managers of different sizes, exploring current data sources, frustrations and budgets. The model estimated demand by investor type and region. The demand model combined interview findings with data on assets under management and current spending.",
      outcome:
        "Demand was strongest for company-level emissions data. The company focused its first product there. The first product launched to a group of pilot clients identified during the interviews. Pilot clients helped shape later product releases.",
      learning: "Specific use cases defined the product.",
      verified: true,
    },
    {
      slug: "directory-listing-data-verification",
      title: "Verifying business listings for a local search platform",
      client: "A local business directory",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Offline data collection (CATI)", "Data processing & analytics", "Custom business applications"],
      methods: ["Telephone verification", "Field checks"],
      scope: "80,000 listings",
      timeline: "4 months",
      challenge:
        "Outdated listings frustrated users. Users increasingly reported closed businesses and wrong phone numbers, and advertisers questioned the platform’s value. Users complained about outdated phone numbers and closed businesses, and advertisers questioned the platform’s value.",
      approach:
        "We verified listings by phone and field visits, updating details and flagging closed businesses. Verification calls were made in Malay, Bahasa Indonesia, Mandarin and English, and field checks were used for businesses that could not be reached. Every update was recorded with the date and method of verification. Field teams visited a sample of businesses to confirm addresses and photos.",
      outcome:
        "Listing accuracy improved, and user complaints fell. Advertiser renewals improved, and the platform introduced ongoing verification for the most-viewed categories. Accuracy checks were scheduled quarterly for popular categories.",
      learning: "Regular verification kept data trustworthy.",
      verified: true,
    },
    {
      slug: "research-subscription-churn",
      title: "Reducing churn for a research subscription service",
      client: "An industry research publisher",
      region: "United States & Canada",
      markets: ["US", "CA"],
      services: ["Qualitative research", "Marketing automation", "Data analytics & dashboards"],
      methods: ["Subscriber interviews", "Usage analysis"],
      scope: "30 interviews",
      timeline: "6 weeks",
      challenge:
        "Subscribers were not renewing. Renewal rates had fallen for two years, and sales teams were offering discounts to retain subscribers. Renewal rates had fallen, and the publisher relied on discounts to retain subscribers.",
      approach:
        "We interviewed subscribers and analysed usage to find disengagement patterns. Interviews included subscribers who renewed, those who cancelled and those who had downgraded, and usage data showed which reports and alerts people actually used. We combined interview findings with usage data to build an early warning score for disengagement.",
      outcome:
        "Low usage predicted cancellation. The publisher introduced onboarding and personalised alerts. Renewal rates improved, and discounting fell as the value of the subscription became clearer to users. Account managers began contacting low-usage subscribers months before renewal.",
      learning: "Engagement predicted renewal.",
      verified: true,
    },
    {
      slug: "information-company-data-pipeline",
      title: "Automating a data processing pipeline",
      client: "A market data company",
      region: "India",
      markets: ["IN"],
      services: ["Data analytics & dashboards", "Cloud & DevOps services", "AI & automation solutions"],
      methods: ["Pipeline automation", "Quality checks"],
      scope: "Daily data feeds",
      timeline: "5 months",
      challenge:
        "Manual processing delayed daily data delivery. Analysts spent hours each morning cleaning files from different sources, and errors occasionally reached clients. Analysts spent most of their time cleaning data from multiple sources by hand, delaying client deliveries.",
      approach:
        "We automated ingestion, cleaning and validation with monitoring. We automated ingestion from each source, added validation rules and alerts for missing or unusual values, and moved the pipeline to a monitored cloud setup. Analysts helped define validation rules based on their knowledge of common data errors.",
      outcome:
        "Data delivery became faster and more reliable. Analysts spent more time on insight rather than data cleaning, and client complaints about data errors fell. The company also reduced the time to add new data sources.",
      learning: "Automation reduced errors.",
      verified: true,
    },
    {
      slug: "information-services-gdpr-review",
      title: "Reviewing data protection practices for a data provider",
      client: "A B2B contact data provider",
      region: "Germany, France & Spain",
      markets: ["DE", "FR", "ES"],
      services: ["Cybersecurity services", "IT consulting", "Research consultancy"],
      methods: ["Data flow mapping", "Compliance review"],
      scope: "Data collection and storage processes",
      timeline: "3 months",
      challenge:
        "Clients asked for assurance about data protection compliance. Several large clients had paused contracts while their legal teams reviewed the provider’s practices. Several European clients paused contracts while they reviewed the provider’s data protection practices.",
      approach:
        "We mapped data flows, reviewed consent and retention practices, and recommended controls. We mapped how contact data was collected, stored, used and deleted, reviewed legal bases and retention periods, and checked security controls. We interviewed data, legal and sales teams to understand how practices worked in reality. Recommendations were prioritised by risk, with quick fixes separated from longer-term changes.",
      outcome:
        "The provider improved documentation and answered client questions confidently. Paused contracts resumed after clients reviewed the updated documentation. The provider also introduced an annual data protection review.",
      learning: "Clear documentation supported trust.",
      verified: true,
    },
    {
      slug: "information-services-lead-generation",
      title: "Generating leads for a data analytics subscription",
      client: "A data analytics company",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["B2B digital marketing", "Content marketing", "Lead generation"],
      methods: ["Webinars", "Reports"],
      scope: "Content programme",
      timeline: "6 months",
      challenge:
        "The company had few enterprise leads. Its sales team relied on cold outreach, which produced few meetings with senior buyers. The company’s sales team relied on cold outreach, and prospects knew little about the value of its data.",
      approach:
        "We created reports and webinars using the company’s data insights. We created quarterly reports using the company’s own data, ran webinars with its analysts and promoted them through LinkedIn and email. Webinars featured analysts discussing trends relevant to each target industry. Reports were gated with a short form, and leads were nurtured with follow-up insights relevant to their industry.",
      outcome:
        "Qualified leads grew. Report downloads and webinar registrations became a steady source of leads, and several turned into enterprise contracts. Sales teams prioritised leads based on webinar attendance and report downloads.",
      learning: "Original data attracted buyers.",
      verified: true,
    },
  ],
  INFORMATION_SERVICES_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: INFORMATION_SERVICES_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  INTERNET_SERVICES_CASES = [
    {
      slug: "broadband-customer-experience-study",
      title: "What home broadband customers really care about",
      client: "A home broadband provider",
      region: "India: 15 cities",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CATI)", "Data analytics & dashboards"],
      methods: ["Customer survey", "Driver analysis", "Dashboard"],
      scope: "4,000 subscribers",
      timeline: "7 weeks",
      challenge:
        "The provider had grown quickly but faced rising cancellations, especially in newer cities. Management assumed speed was the main issue and planned costly upgrades, but some executives questioned whether that was right.",
      approach:
        "We surveyed subscribers about speed, reliability, installation, billing and support, and used driver analysis to find the strongest influences on satisfaction and intent to stay. Calls were made in Hindi, English and regional languages to subscribers across cities and plan types, and open comments were coded to explain the scores in customers’ own words.",
      outcome:
        "Fault resolution time mattered more than headline speeds. The provider introduced same-day fault commitments in key cities. Cancellations fell in cities where the new fault commitments were introduced, and the provider redirected part of its upgrade budget to field support teams.",
      learning: "Reliability and support kept customers more than speed upgrades.",
      verified: true,
    },
    {
      slug: "digital-adoption-older-adults",
      title: "Understanding barriers to internet use among older adults",
      client: "A digital inclusion charity",
      region: "United Kingdom & Canada",
      markets: ["UK", "CA"],
      services: ["Qualitative research", "Quantitative research", "Government research"],
      methods: ["In-home interviews", "Telephone survey"],
      scope: "40 interviews, 1,500 survey responses",
      timeline: "9 weeks",
      challenge:
        "Many older people were missing out on online services, and the charity wanted to design better support. As more services moved online, from banking to health appointments, older people risked being left behind.",
      approach:
        "We interviewed older adults at home and surveyed a wider group by telephone about confidence, fears and support needs. Interviews were held in participants’ homes, with family members present where they wished, and the telephone survey reached people who were not online at all, who are often missed by internet surveys.",
      outcome:
        "Fear of scams and lack of patient help were the main barriers. The charity created volunteer-led sessions focused on safe online use. Participants in the new sessions reported greater confidence using online services, and the charity expanded the programme to more libraries and community centres.",
      learning: "Confidence and safety mattered more than access to devices.",
      verified: true,
    },
    {
      slug: "app-user-research-southeast-asia",
      title: "Understanding super-app users in South-East Asia",
      client: "A digital payments and services platform",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Consumer panel", "Quantitative research", "UI/UX design"],
      methods: ["Online survey", "Usability testing"],
      scope: "2,500 users, 24 usability sessions",
      timeline: "8 weeks",
      challenge:
        "Users downloaded the app but used only one or two services, limiting growth. The platform offered payments, bill payments, food delivery and transport, but most users stuck to one service.",
      approach:
        "We surveyed users about service awareness and usage, and tested navigation with users in Malay, Bahasa Indonesia and English. Usability sessions asked users to complete tasks such as paying a bill or booking a ride, and we recorded where they hesitated. The survey measured which services users knew about and which they had tried.",
      outcome:
        "Users did not discover services hidden in menus. The platform redesigned its home screen around personalised suggestions. Use of additional services increased after the home screen redesign, and the company used the research approach for new markets. The platform repeated usability testing after each major release.",
      learning: "Discoverability limited growth more than demand.",
      verified: true,
    },
    {
      slug: "online-safety-parent-research",
      title: "What parents worry about online",
      client: "An internet safety organisation",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "Content marketing"],
      methods: ["Parent survey", "Message testing"],
      scope: "2,000 parents",
      timeline: "6 weeks",
      challenge:
        "The organisation wanted to create practical guidance for parents on children’s online safety. Parents received conflicting advice from schools, media and apps, and many felt overwhelmed. Parents felt overwhelmed by advice about apps, screen time and online risks, much of it generic or out of date.",
      approach:
        "We surveyed parents about concerns, current controls and preferred guidance formats, then tested resources. The survey covered parents of children from early primary to late secondary school, with quotas by age group and region, and draft guides were tested with parents for clarity and usefulness. Draft guides were tested with parents for clarity and usefulness before publication.",
      outcome:
        "Parents wanted short, age-specific guides. The organisation produced guides by age group. Downloads of the new guides were strong, and schools began sharing them with parents at enrolment.",
      learning: "Practical, specific guidance was more useful than general warnings.",
      verified: true,
    },
    {
      slug: "isp-small-business-market-study",
      title: "Assessing demand for business internet among small firms",
      client: "An internet service provider",
      region: "Egypt & Morocco",
      markets: ["EG", "MA"],
      services: ["Business panel", "Quantitative research", "Research consultancy"],
      methods: ["SME survey", "Interviews"],
      scope: "800 small businesses",
      timeline: "7 weeks",
      challenge:
        "The provider wanted to launch business plans but did not know what small firms needed. Small businesses relied on consumer internet plans, and outages often cost them sales. Many small businesses used home internet plans that failed during busy periods, but few business plans were designed for their needs or budgets.",
      approach:
        "We surveyed small businesses in Arabic and French about connectivity, outages, prices and support. Interviews were conducted in Arabic and French with shops, clinics, offices and small manufacturers, covering how outages affected business and what support they expected. We also asked businesses how outages affected sales and which support channels they preferred.",
      outcome:
        "Reliable uptime and quick repair mattered more than speed. The provider launched plans with service guarantees. Business plan subscriptions grew steadily after launch, especially among clinics and retailers. Support response times became a key part of the provider’s marketing.",
      learning: "Business customers paid for reliability.",
      verified: true,
    },
    {
      slug: "web-hosting-customer-onboarding",
      title: "Improving onboarding for a web hosting company",
      client: "A web hosting company",
      region: "India & United States",
      markets: ["IN", "US"],
      services: ["UI/UX design", "Digital analytics & reporting", "Marketing automation"],
      methods: ["Funnel analysis", "Onboarding redesign", "Email journeys"],
      scope: "New customer onboarding",
      timeline: "4 months",
      challenge:
        "Many new customers never launched a website after purchasing hosting. Customers who never launched a website rarely renewed their hosting, which hurt long-term revenue. Many new customers bought hosting plans but never launched a website, and most cancelled at the first renewal.",
      approach:
        "We analysed onboarding data, redesigned setup flows and built helpful email journeys. We tracked each step from purchase to live website, identified where customers stalled and created guided setup with templates. Email journeys offered help at the moments people typically got stuck. We interviewed customers who had stalled during setup to understand what confused them.",
      outcome:
        "More customers launched websites, and early cancellations fell. Renewal rates improved among new customers, and support tickets during setup fell. The company also added short video guides at the steps where customers most often stopped.",
      learning: "Helping customers succeed reduced churn.",
      verified: true,
    },
    {
      slug: "digital-platform-trust-safety",
      title: "Understanding user trust on an online marketplace",
      client: "An online classifieds marketplace",
      region: "UAE & Saudi Arabia",
      markets: ["AE", "SA"],
      services: ["Consumer panel", "Qualitative research", "Quantitative research"],
      methods: ["User interviews", "Survey"],
      scope: "1,800 users, 20 interviews",
      timeline: "7 weeks",
      challenge:
        "Fraud concerns were reducing engagement. Buyers worried about fake listings and payment scams, and sellers worried about fake buyers. Buyers worried about scams, and sellers complained that fake buyers wasted their time, limiting the marketplace’s growth.",
      approach:
        "We surveyed buyers and sellers about trust, fraud experiences and safety features. Interviews were conducted in Arabic and English, and the survey measured how much each potential safety feature would increase willingness to transact. We also reviewed fraud reports with the trust and safety team to understand common patterns.",
      outcome:
        "Verified seller badges and secure chat were valued. The platform introduced both. Reports of fraud declined after verification was introduced, and engagement increased in categories such as cars and electronics. The platform continued monitoring trust through a quarterly survey.",
      learning: "Visible safety features built trust.",
      verified: true,
    },
    {
      slug: "internet-provider-seo-local",
      title: "Local search growth for a broadband provider",
      client: "A regional broadband provider",
      region: "United States",
      markets: ["US"],
      services: ["SEO services", "Landing page & CRO", "Google Ads / PPC"],
      methods: ["Local landing pages", "Search campaigns"],
      scope: "40 towns",
      timeline: "6 months",
      challenge:
        "Residents searching for internet providers rarely found the company. Larger national providers dominated search results even in towns where the company offered better service. The provider served many small towns, but national competitors dominated search results even where they offered slower service.",
      approach:
        "We built town-level availability pages and local search campaigns. Each town page included real availability, local support information and customer reviews, and campaigns were targeted by postcode. Availability data came directly from the provider’s systems so pages stayed accurate as coverage expanded.",
      outcome:
        "Sign-ups from organic and paid search grew. Cost per new subscriber fell as organic search took over a growing share of sign-ups. Local pages also reduced support calls from people asking whether service was available.",
      learning: "Local relevance mattered in search.",
      verified: true,
    },
    {
      slug: "digital-payments-merchant-study",
      title: "Understanding small merchants’ use of digital payments",
      client: "A digital payments company",
      region: "India",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection (CAPI)", "Quantitative research"],
      methods: ["Merchant interviews"],
      scope: "3,000 small merchants",
      timeline: "8 weeks",
      challenge:
        "Merchants accepted QR payments but used few other services. The company wanted to grow revenue beyond payment processing, which earned very low margins. The company had signed up many small merchants for digital payments, but wanted to understand their needs beyond accepting payments.",
      approach:
        "We interviewed merchants about payments, credit needs and app use. Interviewers visited kirana stores, restaurants and service businesses in cities and towns, speaking local languages, and asked about cash flow, borrowing and how merchants used the app. We also analysed merchant transaction patterns to understand seasonal cash needs.",
      outcome:
        "Merchants wanted small working capital loans. The company launched merchant credit. Merchant credit uptake was strong, and merchants who borrowed used the app more for other services. Repayments were linked to daily payment receipts, which merchants found convenient.",
      learning: "Merchants’ needs extended beyond payments.",
      verified: true,
    },
    {
      slug: "cloud-provider-data-centre-perception",
      title: "Business perceptions of local data centres",
      client: "A cloud and data centre provider",
      region: "Switzerland, Germany & France",
      markets: ["CH", "DE", "FR"],
      services: ["Business panel", "Qualitative research", "Research consultancy"],
      methods: ["IT leader interviews"],
      scope: "30 interviews",
      timeline: "6 weeks",
      challenge:
        "The provider wanted to understand demand for local data hosting. Global hyperscalers offered lower prices, and the provider needed to know where it could compete. The provider had opened local data centres but was still losing deals to global hyperscalers.",
      approach:
        "We interviewed IT leaders about data residency, compliance and provider choice. Interviews were conducted in German, French and English with IT and compliance leaders in banking, healthcare and the public sector. We also reviewed procurement requirements in banking, healthcare and public sector tenders.",
      outcome:
        "Data residency and certifications were decisive. The provider emphasised local compliance. The provider focused sales on regulated sectors and won several contracts where data residency was required. Its sales materials were rewritten around compliance requirements in each country.",
      learning: "Compliance drove hosting choices.",
      verified: true,
    },
  ],
  INTERNET_SERVICES_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: INTERNET_SERVICES_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  IT_CASES = [
    {
      slug: "it-decision-maker-cloud-buying-study",
      title: "How IT leaders choose cloud migration partners",
      client: "A global IT services company",
      region: "United States, United Kingdom & Germany",
      markets: ["US", "UK", "DE"],
      services: ["Business panel", "Quantitative research", "Qualitative research"],
      methods: ["Interviews with CIOs and IT directors", "B2B survey of IT decision-makers"],
      scope: "30 interviews, 450 survey responses",
      timeline: "9 weeks",
      challenge:
        "The company was competing for cloud migration projects against global consultancies and specialist firms. Its proposals were often shortlisted but rarely won, and the sales team could not tell whether price, credentials or delivery confidence was the deciding factor. Leadership wanted evidence from buyers rather than opinions from inside the company.",
      approach:
        "We interviewed CIOs, IT directors and infrastructure heads at mid-sized and large organisations who had recently selected a cloud partner, asking them to walk through their evaluation from long list to final decision. A survey of verified IT decision-makers from our business panel then measured the importance of migration methodology, security credentials, industry experience, pricing models and post-migration support. Interviews were conducted in English and German, and every survey respondent passed role and decision-involvement screening.",
      outcome:
        "Buyers rarely chose on price alone. What separated winners was a clear migration plan with risk mitigation, evidence of similar projects in their industry and a credible plan for managing cloud costs after go-live. The company rebuilt its proposals around industry-specific case evidence and a cost optimisation commitment, and trained bid teams to lead with the migration plan.",
      learning:
        "Buyers were purchasing reduced risk, so proposals that made risk visible and manageable won more often.",
      verified: true,
    },
    {
      slug: "it-services-win-loss-programme",
      title: "A win/loss programme for an IT services firm",
      client: "A mid-sized IT services and consulting firm",
      region: "India, UAE & Saudi Arabia",
      markets: ["IN", "AE", "SA"],
      services: ["Qualitative research", "Business panel", "Reporting & insights"],
      methods: ["Post-decision buyer interviews", "Quarterly insight reports"],
      scope: "60 interviews a year",
      timeline: "Ongoing quarterly programme",
      challenge:
        "The firm bid for dozens of projects each quarter but only learned why it lost from brief emails or rumours. Sales leaders suspected that pricing, solution fit and relationship issues all played a part, but had no structured evidence to act on.",
      approach:
        "Within a few weeks of each major decision, our researchers interviewed the client’s buyers, independent of the sales team, about how proposals were evaluated, what stood out and what fell short. Interviews were confidential, which encouraged candour, and findings were coded into themes and reported quarterly with recommendations for sales, delivery and marketing teams.",
      outcome:
        "Losses often followed weak discovery: proposals answered the brief but missed concerns the buyer had raised in meetings. The firm introduced a structured discovery checklist and executive sponsor involvement for large bids, and win rates improved over the following quarters.",
      learning: "Independent interviews heard reasons buyers would never tell the sales team directly.",
      verified: true,
    },
    {
      slug: "it-brand-awareness-tracker-apac",
      title: "Tracking brand awareness among IT decision-makers in Asia-Pacific",
      client: "An enterprise IT solutions provider",
      region: "Australia, Japan, Malaysia & Indonesia",
      markets: ["AU", "JP", "MY", "ID"],
      services: ["Business panel", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Half-yearly online tracker", "Dashboard by country"],
      scope: "1,200 IT decision-makers per wave",
      timeline: "Half-yearly programme",
      challenge:
        "The company was investing heavily in marketing across Asia-Pacific but had no consistent way to know whether its awareness and consideration were growing in each country, or how it compared with competitors. Regional teams were each running their own small surveys with different questions, so results could not be compared or trusted at headquarters.",
      approach:
        "We designed a tracker with consistent questions and quotas by company size and role, translated into Japanese, Bahasa Indonesia and Malay where needed, and fielded it through verified business panels. Results were shown on a dashboard by country, industry and role. Each wave included the same brand funnel questions, image attributes and recall of recent marketing, so changes could be linked to specific activity. Open-ended responses were coded to capture how decision-makers described each brand in their own words.",
      outcome:
        "Awareness was strong in Australia but weak in Japan, where the company was rarely considered despite similar spending. The company shifted Japanese investment towards partner-led events and localised content, and later waves showed consideration improving. Country managers began using the dashboard in quarterly planning, and marketing budgets were shifted between countries based on evidence rather than habit.",
      learning: "Country-level tracking showed that one regional strategy did not fit every market.",
      verified: true,
    },
    {
      slug: "it-helpdesk-ai-automation",
      title: "Automating an internal IT helpdesk with an AI assistant",
      client: "A multi-site healthcare group",
      region: "United Kingdom",
      markets: ["UK"],
      services: ["AI & automation solutions", "API development & integration", "IT consulting"],
      methods: ["Ticket analysis", "AI assistant with ticketing integration"],
      scope: "4,500 staff across 12 sites",
      timeline: "5 months",
      challenge:
        "The internal IT team was overwhelmed with password resets, access requests and printer issues, delaying more important work. Staff waited hours for help with simple problems, often during busy clinical shifts.",
      approach:
        "We analysed a year of helpdesk tickets to find the most common, repeatable requests, then built an assistant on the staff intranet and Microsoft Teams that answered questions from approved guides, handled password resets securely and created tickets with full context for anything it could not solve. Security and data protection reviews were completed before launch. We also set clear limits on what the assistant could do, routed anything clinical or sensitive straight to people and tested every answer with IT staff before launch.",
      outcome:
        "Routine requests moved to self-service, ticket queues shortened noticeably and the IT team spent more time on projects. Staff rated the assistant highly because it worked at any hour, including night shifts. The assistant’s logs also revealed recurring problems, such as a printer model that failed frequently, which the IT team fixed at the source.",
      learning: "Starting with real ticket data ensured automation solved the problems staff actually had.",
      verified: true,
    },
    {
      slug: "it-company-saas-pricing-research",
      title: "Pricing a new managed IT services package for small businesses",
      client: "A managed IT services provider",
      region: "Canada & United States",
      markets: ["CA", "US"],
      services: ["Quantitative research", "Business panel", "Financial modelling"],
      methods: ["SME owner survey with conjoint exercise", "Revenue model"],
      scope: "800 small business owners and office managers",
      timeline: "7 weeks",
      challenge:
        "The provider wanted to launch subscription IT support packages for small businesses but was unsure which services to bundle and how to price them. Competitors offered a confusing mix of hourly, per-device and per-user pricing, and buyers often struggled to compare offers.",
      approach:
        "We surveyed small business owners and office managers about IT problems, current support arrangements and budgets, and used a conjoint exercise to test bundles of helpdesk, security, backup and device management at different prices. Our finance team modelled revenue for the strongest options. Respondents were screened to confirm they made or influenced IT purchasing decisions, and quotas covered company size, industry and region in both countries.",
      outcome:
        "Owners valued security and backup more than unlimited helpdesk hours, and preferred per-user pricing. The provider launched three tiers built around security, which sold faster than its previous hourly support offer. Sales cycles also shortened because prospects could compare clear packages instead of requesting custom quotes.",
      learning: "Conjoint analysis revealed what owners would actually pay for, not just what they said they wanted.",
      verified: true,
    },
    {
      slug: "it-services-erp-implementation",
      title: "Implementing an ERP for a growing IT services company",
      client: "An IT services company",
      region: "Pune & Hyderabad",
      markets: ["IN"],
      services: ["ERP development", "MIS & financial reporting", "Accounting & finance consulting"],
      methods: ["Process mapping", "Project accounting and timesheet integration"],
      scope: "600 consultants, 120 active projects",
      timeline: "6 months",
      challenge:
        "Project profitability was only known at quarter end because timesheets, billing and costs lived in separate systems. Unbilled work and resource utilisation problems were discovered too late to correct. Leadership was preparing for rapid growth and needed reliable numbers before hiring more consultants.",
      approach:
        "We mapped delivery and finance processes, implemented an ERP with project accounting, linked timesheets and resource planning, and built dashboards for project margins, utilisation and unbilled revenue. Delivery managers and finance staff helped design the project codes and approval workflows, and key users in each team were trained before go-live.",
      outcome:
        "Delivery managers could see project margins weekly, unbilled work fell and utilisation improved as bench time became visible. Month-end closing became faster and more accurate. Leadership also used utilisation data to plan hiring more accurately, reducing the cost of idle consultants between projects.",
      learning: "Linking time, cost and billing turned profitability into a weekly management conversation.",
      verified: true,
    },
    {
      slug: "it-company-b2b-lead-generation-europe",
      title: "Generating qualified enterprise leads in Europe",
      client: "An Indian IT services company expanding in Europe",
      region: "Germany, France & Switzerland",
      markets: ["DE", "FR", "CH"],
      services: ["B2B digital marketing", "Content marketing", "Lead generation"],
      methods: ["Localised content", "LinkedIn campaigns", "Account-based outreach"],
      scope: "200 target accounts",
      timeline: "9 months",
      challenge:
        "The company had strong delivery credentials but little brand recognition in continental Europe, and its English-only marketing generated few conversations with target accounts. Its few European clients had come through personal networks, which could not support the growth targets set by the board.",
      approach:
        "We localised core content into German and French, created industry-specific case studies, ran LinkedIn campaigns targeting IT and business leaders at named accounts, and supported sales with account-based outreach sequences. Target accounts were chosen with the sales team using industry, size and technology signals, and outreach messages were tailored to each industry’s priorities, such as compliance in banking and automation in manufacturing.",
      outcome:
        "Engagement from target accounts grew steadily, and the sales team secured meetings with several large prospects that had previously ignored outreach. Several conversations turned into proposals within the first year, and the company opened a small sales office in Germany to support the pipeline.",
      learning: "Localisation signalled commitment to the market as much as it improved understanding.",
      verified: true,
    },
    {
      slug: "it-security-awareness-programme",
      title: "Measuring and improving security awareness across an IT workforce",
      client: "An IT outsourcing company",
      region: "Malaysia, Indonesia & Hong Kong",
      markets: ["MY", "ID", "HK"],
      services: ["Cybersecurity services", "Quantitative research", "Content marketing"],
      methods: ["Baseline survey", "Phishing simulations", "Training content"],
      scope: "3,000 employees",
      timeline: "6 months",
      challenge:
        "Clients increasingly required evidence of security awareness, and a recent phishing incident had exposed gaps. Employees worked across many client accounts, and a single compromised account could affect several clients at once.",
      approach:
        "We measured baseline awareness with a survey and phishing simulations, created short training modules in English, Malay, Bahasa Indonesia and Cantonese, and repeated simulations after training. Simulations were designed to resemble realistic threats in each market, and employees who clicked received immediate, friendly guidance rather than punishment. Results were reported by team so managers could support those who needed it most.",
      outcome:
        "Click rates in phishing simulations fell substantially, and reporting of suspicious emails increased. The company used the results in client security reviews. The company also introduced a simple reporting button for suspicious emails, and reported messages helped the security team block real attacks faster.",
      learning: "Short, local-language training changed behaviour more than annual compliance courses.",
      verified: true,
    },
    {
      slug: "it-employer-brand-research",
      title: "Understanding what tech talent wants from an employer",
      client: "An IT services company",
      region: "Bengaluru, Hyderabad & Chennai",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Social media marketing"],
      methods: ["Survey of tech professionals", "Employee interviews"],
      scope: "1,500 professionals, 30 interviews",
      timeline: "7 weeks",
      challenge:
        "Attrition was high and recruitment costs were rising, and the company wanted to understand how it was seen as an employer. Exit interviews offered little insight, because departing employees rarely spoke openly to HR.",
      approach:
        "We surveyed tech professionals about employer choice, perceptions of competitors and the company, and interviewed current and former employees about their experiences. The survey reached professionals at different career stages through our business panel, with quotas for skills such as cloud, data and testing. Former employees were interviewed by independent researchers so they could speak freely.",
      outcome:
        "Learning opportunities and project variety mattered more than small salary differences. The company launched a visible learning programme and employer brand campaign highlighting real projects. Offer acceptance rates improved over the following quarters, and early attrition among new joiners declined.",
      learning: "Talent wanted growth, and employer branding worked best when it showed real opportunities.",
      verified: true,
    },
    {
      slug: "it-company-virtual-cfo-growth",
      title: "Financial leadership for a fast-growing IT start-up",
      client: "An IT product and services start-up",
      region: "Bengaluru, with clients in the USA & UK",
      markets: ["IN", "US", "UK"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "Tax planning & advisory"],
      methods: ["Cash forecasting", "Export billing and tax review", "Board reporting"],
      scope: "Revenue from 40 international clients",
      timeline: "12-month engagement",
      challenge:
        "Most revenue came from overseas clients, creating foreign exchange, export compliance and cash-timing challenges that the founders managed informally. Founders spent hours each month on invoicing and cash questions instead of building the business.",
      approach:
        "Our virtual CFO introduced rolling cash forecasts with currency scenarios, reviewed export invoicing and tax compliance, and set up monthly board reporting. Monthly reviews with the founders covered cash runway, receivables by client, currency exposure and hiring plans, using a simple dashboard.",
      outcome:
        "The founders planned hiring with confidence, reduced exposure to currency swings and entered a funding round with clean financial reporting. Investors noted the quality of financial reporting during due diligence, which helped the round close smoothly.",
      learning: "International revenue needed financial discipline from the start.",
      verified: true,
    },
  ],
  IT_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: IT_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  MANUFACTURING_CASES = [
    {
      slug: "industrial-buyer-decision-research",
      title: "How plant heads choose industrial equipment suppliers",
      client: "An industrial pump manufacturer",
      region: "United States, Canada & United Kingdom",
      markets: ["US", "CA", "UK"],
      services: ["Business panel", "Qualitative research", "Quantitative research"],
      methods: ["In-depth interviews", "Telephone survey of buyers"],
      scope: "30 interviews, 350 plant and procurement heads",
      timeline: "8 weeks",
      challenge:
        "The manufacturer’s win rate on large tenders had fallen, and sales teams blamed price. Leadership suspected other factors and wanted to understand how buying decisions were really made.",
      approach:
        "We interviewed plant heads, maintenance managers and procurement officers at recent buyers and lost prospects, then surveyed a wider group to measure the importance of price, reliability, service response and spare-part availability.",
      outcome:
        "Maintenance teams strongly influenced decisions and valued service response time above price. The client introduced a guaranteed service response commitment in key regions and involved maintenance heads earlier in the sales process.",
      learning: "Talking to everyone in the buying committee revealed influence that procurement data alone could not.",
      verified: true,
    },
    {
      slug: "distributor-satisfaction-programme",
      title: "A distributor satisfaction programme for an electrical products maker",
      client: "An electrical products manufacturer",
      region: "South Africa, UAE & Saudi Arabia",
      markets: ["ZA", "AE", "SA"],
      services: ["Business panel", "Offline data collection (CATI)", "Data analytics & dashboards"],
      methods: ["Annual distributor survey", "Dashboard"],
      scope: "650 distributors and dealers",
      timeline: "Annual programme",
      challenge:
        "Distributors were switching to competing brands, and the company only learned about dissatisfaction when a relationship ended.",
      approach:
        "We set up an annual telephone survey of distributors and dealers covering supply reliability, schemes, credit, sales support and complaint handling, with a dashboard by region and sales manager.",
      outcome:
        "Supply delays and slow claim settlements emerged as the main frustrations. The company tightened claim timelines and made distributor satisfaction part of regional managers’ reviews.",
      learning: "Regular, structured feedback turns relationships into something measurable and manageable.",
      verified: true,
    },
    {
      slug: "factory-erp-implementation",
      title: "Replacing spreadsheets with an ERP in a growing component factory",
      client: "An auto-component manufacturer",
      region: "Pune",
      markets: ["IN"],
      services: ["ERP development", "API development & integration", "Software testing & QA"],
      methods: ["Process mapping", "Phased implementation", "User training"],
      scope: "Two plants, 180 users",
      timeline: "8 months",
      challenge:
        "Orders, production planning and inventory were tracked in spreadsheets. Stock discrepancies caused missed deliveries, and month-end closing took three weeks.",
      approach:
        "We mapped processes with each department, implemented finance and inventory first with barcode scanning in stores, then added sales orders, dispatch and production planning. Key users in each team were trained deeply and supported colleagues.",
      outcome:
        "Stock accuracy improved, on-time delivery rose, and month-end closing became much faster. Management could see margins by product for the first time.",
      learning: "Phasing the rollout built confidence and avoided disrupting production.",
      verified: true,
    },
    {
      slug: "b2b-manufacturer-seo-leads",
      title: "Turning a manufacturer’s website into a source of export enquiries",
      client: "A precision engineering company",
      region: "Buyers in Germany, France, Italy, UAE & India",
      markets: ["DE", "FR", "IT", "AE", "IN"],
      services: ["SEO services", "Content marketing", "Website development"],
      methods: ["Technical SEO", "Application-based content", "Website rebuild"],
      scope: "Website and content programme",
      timeline: "9 months",
      challenge:
        "The company’s website was a digital brochure with no technical detail. Engineers searching for specific machined components never found it.",
      approach:
        "We rebuilt the site with pages for each capability, material and industry application, added technical guides answering common engineering questions, and fixed speed and structure issues.",
      outcome:
        "Organic visibility grew for specific technical searches, and the company began receiving enquiries from overseas buyers who found it through search.",
      learning: "Engineers search for specifics; detailed content brought the right buyers.",
      verified: true,
    },
    {
      slug: "shop-floor-safety-culture-survey",
      title: "Measuring safety culture on the shop floor",
      client: "A heavy engineering company",
      region: "Four plants in Western India",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous worker survey", "Supervisor focus groups"],
      scope: "2,200 workers and contract staff",
      timeline: "7 weeks",
      challenge:
        "Despite safety training, near-miss reporting was low and minor incidents continued. Leadership wanted an honest view of how workers felt about safety and reporting.",
      approach:
        "We ran an anonymous survey on tablets in Hindi, Marathi and English, including contract workers who were often left out of internal surveys. Focus groups with supervisors explored production pressures.",
      outcome:
        "Contract workers felt less able to stop unsafe work and feared consequences of reporting. The company introduced a no-blame near-miss reporting system and included contract staff in safety committees.",
      learning: "Including contract workers changed the picture completely.",
      verified: true,
    },
    {
      slug: "manufacturer-virtual-cfo-margins",
      title: "Finding which products actually made money",
      client: "A packaging manufacturer",
      region: "Haryana",
      markets: ["IN"],
      services: ["Virtual CFO services", "MIS & financial reporting", "Accounting & finance consulting"],
      methods: ["Costing review", "Monthly MIS"],
      scope: "180 products, two plants",
      timeline: "6-month engagement",
      challenge:
        "Revenue was growing, but profits were flat. The owners suspected some products and customers were unprofitable but had no product-level costing.",
      approach:
        "Our virtual CFO built a costing model allocating materials, machine time and overheads to products, restructured the chart of accounts and introduced a monthly MIS with margin by product and customer.",
      outcome:
        "A small group of high-volume products had thin or negative margins because of frequent changeovers. The company revised prices and minimum order quantities for those lines.",
      learning: "Revenue growth can hide margin problems; product-level costing revealed them.",
      verified: true,
    },
    {
      slug: "export-market-entry-research",
      title: "Testing demand for imported hand tools in African markets",
      client: "A hand-tools manufacturer",
      region: "South Africa, Egypt & Morocco",
      markets: ["ZA", "EG", "MA"],
      services: ["Research consultancy", "Business panel", "Qualitative research"],
      methods: ["Distributor interviews", "Retail price checks"],
      scope: "45 distributor interviews, 150 retail checks",
      timeline: "8 weeks",
      challenge:
        "The manufacturer was considering expansion into Southern and North Africa but had limited knowledge of distribution, pricing and competition.",
      approach:
        "We worked with local partners to interview importers and distributors and to record retail prices and competing brands in hardware markets. Findings were combined into a market-entry assessment.",
      outcome:
        "Demand existed for mid-priced durable tools, but distributors expected credit terms and marketing support. The client selected one country for a distributor-led pilot.",
      learning: "Local partners and in-market price checks grounded the decision in reality.",
      verified: true,
    },
    {
      slug: "field-service-app",
      title: "A field service app for an equipment maintenance team",
      client: "A commercial refrigeration manufacturer",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Mobile app development", "CRM development", "Data analytics & dashboards"],
      methods: ["Technician interviews", "Offline-first app", "Service dashboard"],
      scope: "250 field technicians",
      timeline: "5 months",
      challenge:
        "Service visits were assigned by phone and recorded on paper. Customers complained about slow responses, and managers had no visibility of technician workload.",
      approach:
        "We built a mobile app for technicians to receive jobs, record work with photos, capture customer signatures and order spare parts, working offline where needed. Data flowed into the CRM and a service dashboard.",
      outcome:
        "Response times became visible and measurable, spare-part requests were faster, and customers received service reports automatically.",
      learning: "Technician input on the app design made adoption fast.",
      verified: true,
    },
    {
      slug: "brand-health-industrial",
      title: "Measuring brand perception in a crowded industrial category",
      client: "A welding equipment brand",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Quantitative research", "Business panel", "Reporting & insights"],
      methods: ["B2B brand survey", "Driver analysis"],
      scope: "500 fabricators and workshop owners",
      timeline: "6 weeks",
      challenge:
        "The brand competed with many local and international rivals and wanted to understand its position and what drove preference.",
      approach:
        "We surveyed fabricators and workshop owners on brand awareness, usage, consideration and ratings on key attributes, then used driver analysis to identify what most influenced preference.",
      outcome:
        "Durability and service network were the strongest drivers of preference, and the brand rated well on durability but poorly on service reach. It prioritised expanding authorised service points.",
      learning: "Driver analysis showed where to invest, not just how the brand scored.",
      verified: true,
    },
    {
      slug: "manufacturing-workforce-skills-study",
      title: "Understanding skills gaps among new factory recruits",
      client: "An industry association",
      region: "Tamil Nadu & Karnataka",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Employer survey", "Worker interviews"],
      scope: "200 employers, 60 worker interviews",
      timeline: "8 weeks",
      challenge:
        "Members reported difficulty hiring job-ready workers, while training institutes claimed high placement rates. The association wanted evidence to guide its skills programme.",
      approach:
        "We surveyed HR and production heads on skills gaps and retention, and interviewed recent recruits about training, expectations and reasons for leaving.",
      outcome:
        "Technical skills were less of a problem than workplace readiness, safety awareness and expectations about shift work. The association added short induction modules with training institutes.",
      learning: "Hearing from new workers explained high early attrition that employer data alone could not.",
      verified: true,
    },
  ],
  MANUFACTURING_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: MANUFACTURING_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  MEAT_CASES = [
    {
      slug: "packaged-chicken-urban-adoption",
      title: "Why urban families still prefer the local chicken shop",
      client: "A packaged poultry brand",
      region: "Delhi NCR, Bengaluru, Hyderabad & Kolkata",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey of meat buyers", "Accompanied shopping visits"],
      scope: "1,600 households, 20 shopping visits",
      timeline: "7 weeks",
      challenge:
        "The brand sold hygienically processed, chilled chicken through supermarkets and apps, but most families continued to buy from neighbourhood shops where birds were cut in front of them. Growth had stalled after an initial burst of trial, and the brand needed to understand what kept families loyal to local shops and what might persuade them to switch.",
      approach:
        "We surveyed households that bought chicken at least twice a month, covering purchase channels, freshness cues, hygiene perceptions, cuts, price and trust. Researchers then accompanied shoppers to local shops and supermarkets to observe how they judged freshness and what reassured them. Interviews were conducted in Hindi, Bengali, Telugu, Kannada and English, with quotas by city, household size and income.",
      outcome:
        "Families equated freshness with seeing the bird cut, and packaged chicken offered no equivalent reassurance; many also wanted specific cuts for regional dishes. The brand introduced cut-to-order options through its app with same-day delivery, clear “processed today” dates on packs and recipe-specific cuts. App orders grew fastest among working families who valued hygiene and convenience.",
      learning: "Freshness had to be proven in ways shoppers already trusted, not just claimed on a label.",
      verified: true,
    },
    {
      slug: "halal-meat-export-buyer-study",
      title: "Understanding halal meat buyers in Gulf and South-East Asian markets",
      client: "A meat processing and export company",
      region: "UAE, Saudi Arabia, Malaysia & Indonesia",
      markets: ["AE", "SA", "MY", "ID"],
      services: ["Business panel", "Qualitative research", "Research consultancy"],
      methods: ["Importer and distributor interviews", "Retail and food service buyer survey"],
      scope: "30 interviews, 120 survey responses",
      timeline: "8 weeks",
      challenge:
        "The company wanted to grow exports of chilled and frozen meat, but faced strong competition from established suppliers in Australia, Brazil and New Zealand. It did not know how buyers compared suppliers or which certifications and product specifications mattered most in each market.",
      approach:
        "We interviewed importers, distributors, supermarket buyers and food service purchasing managers in Arabic, Malay, Bahasa Indonesia and English, exploring supplier selection, halal certification requirements, cold chain expectations, cuts and pricing. A survey then measured the relative importance of each factor by country.",
      outcome:
        "Certification recognised by local authorities, consistent cut specifications and reliable cold-chain documentation mattered more than small price differences. The company prioritised certification with the most widely recognised bodies, standardised its cut specifications and appointed distributors in two markets first.",
      learning: "Meeting each market’s certification expectations opened doors that price alone could not.",
      verified: true,
    },
    {
      slug: "poultry-farmer-integration-study",
      title: "Understanding contract poultry farmers’ experiences",
      client: "An integrated poultry company",
      region: "Tamil Nadu, Andhra Pradesh & Telangana",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Farmer survey", "In-depth interviews"],
      scope: "900 contract farmers, 30 interviews",
      timeline: "8 weeks",
      challenge:
        "The company relied on contract farmers to raise its birds, but experienced farmers were leaving for competitors, and new farmers were hard to recruit. Management needed to understand what farmers valued in a partnership and where the company fell short.",
      approach:
        "Interviewers visited farms to survey farmers about chick quality, feed supply, veterinary support, payment terms, growing charges and communication with field staff, in Tamil and Telugu. In-depth interviews with farmers who had left explored their reasons in detail.",
      outcome:
        "Delayed payments and inconsistent chick quality were the main frustrations, more than growing charges. The company introduced payment within a fixed number of days after each batch, improved hatchery quality controls and trained field staff to share batch performance data with farmers. Farmer retention improved over the following year.",
      learning: "Reliability built loyalty more effectively than higher rates.",
      verified: true,
    },
    {
      slug: "meat-retail-hygiene-audit-europe",
      title: "Auditing butcher counters across a supermarket chain",
      client: "A supermarket chain",
      region: "Spain & Italy",
      markets: ["ES", "IT"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["Store audits", "Mystery shopping", "Store scorecards"],
      scope: "180 stores, two audit waves",
      timeline: "6 months",
      challenge:
        "Customer complaints about butcher counter hygiene and staff knowledge had increased, and the chain wanted an objective view of standards across its stores before investing in training.",
      approach:
        "Trained auditors assessed counter hygiene, temperature displays, labelling and product presentation using a photo-supported checklist, while mystery shoppers asked staff for advice on cuts and cooking methods. Results were shared with store managers as scorecards. Audits were unannounced and conducted at different times of day, including busy weekend mornings.",
      outcome:
        "Hygiene standards were generally strong, but staff advice varied widely. The chain launched butcher training focused on product knowledge and customer advice, and later audits showed clear improvement. Customer satisfaction with butcher counters also improved in the chain’s customer survey.",
      learning: "Separating hygiene from customer advice showed where training would make the biggest difference.",
      verified: true,
    },
    {
      slug: "egg-consumption-nutrition-campaign",
      title: "Encouraging egg consumption for better nutrition",
      client: "A poultry industry body",
      region: "India & South Africa",
      markets: ["IN", "ZA"],
      services: ["Consumer panel", "Quantitative research", "Content marketing"],
      methods: ["Household survey", "Message testing"],
      scope: "2,200 households",
      timeline: "7 weeks",
      challenge:
        "Eggs were an affordable source of protein, yet many families in India and South Africa ate them rarely. The industry body wanted to increase consumption, particularly among children, but did not know whether cost, health beliefs or habits held families back.",
      approach:
        "We surveyed household food decision-makers about egg consumption, beliefs about cholesterol and child nutrition, cooking habits and prices, in Hindi, English, isiZulu and Afrikaans. Campaign messages and recipe ideas were then tested with parents.",
      outcome:
        "Worries about cholesterol and a lack of simple recipes for children were the main barriers, more than price. Messages featuring nutritionists and quick recipes tested best, and the campaign built around them reached parents through schools and social media. Follow-up surveys showed increased egg consumption in households exposed to the campaign.",
      learning: "Practical recipes changed behaviour more than nutrition facts alone.",
      verified: true,
    },
    {
      slug: "meat-delivery-app-retention",
      title: "Improving repeat orders for a meat delivery app",
      client: "An online meat and seafood delivery company",
      region: "Bengaluru, Pune & Hyderabad",
      markets: ["IN"],
      services: ["E-commerce marketing", "Marketing automation", "Digital analytics & reporting"],
      methods: ["Cohort analysis", "Retention journeys", "Customer survey"],
      scope: "App and website customers",
      timeline: "6 months",
      challenge:
        "The company spent heavily on discounts to acquire new customers, but many ordered only once. Leadership needed to understand why customers did not return before increasing marketing spend further.",
      approach:
        "We analysed order cohorts to see when customers stopped ordering, surveyed lapsed customers about their experiences and reviewed delivery and complaint data. Retention journeys were then built with reminders, recipe content and personalised offers. The lapsed-customer survey was sent by email and WhatsApp, with a small voucher for completing it.",
      outcome:
        "Late deliveries and occasional quality issues drove most lapses, not price. The company improved delivery slot accuracy and quality checks, and repeat order rates rose over the following months. Retention journeys added a steady stream of repeat orders at far lower cost than acquiring new customers.",
      learning: "Fixing the experience retained customers better than discounts.",
      verified: true,
    },
    {
      slug: "abattoir-modernisation-stakeholder-study",
      title: "Stakeholder research for a municipal abattoir modernisation",
      client: "A municipal corporation",
      region: "A large city in Maharashtra",
      markets: ["IN"],
      services: ["Government research", "Qualitative research", "Quantitative research"],
      methods: ["Butcher and trader interviews", "Resident survey"],
      scope: "300 butchers and traders, 1,000 residents",
      timeline: "8 weeks",
      challenge:
        "The municipal corporation planned to modernise its abattoir and meat markets to improve hygiene and waste management. Butchers and traders feared higher fees and relocation, and opposition threatened to delay the project.",
      approach:
        "We interviewed butchers, traders and transporters about their operations, costs and concerns, and surveyed residents about hygiene expectations and willingness to pay slightly more for safer meat. Interviews were conducted in Marathi, Hindi and Urdu at markets during working hours.",
      outcome:
        "Butchers supported modernisation if fees were phased in and transport from the abattoir to markets was provided. Residents strongly supported improved hygiene. The corporation included phased fees and transport in its plan. The corporation also set up a market committee with trader representatives to oversee the transition.",
      learning: "Involving traders early turned opposition into conditional support.",
      verified: true,
    },
    {
      slug: "processed-meat-concept-test-gulf",
      title: "Testing new processed meat products for Gulf supermarkets",
      client: "A processed meat manufacturer",
      region: "UAE & Saudi Arabia",
      markets: ["AE", "SA"],
      services: ["Consumer panel", "Quantitative research", "Offline data collection"],
      methods: ["Concept test", "Taste tests"],
      scope: "1,200 shoppers, 400 taste tests",
      timeline: "6 weeks",
      challenge:
        "The manufacturer wanted to launch new sausages and cold cuts in Gulf supermarkets but was unsure which products and flavours would appeal to Arab and expatriate shoppers. Several imported brands already dominated shelves, and retailers expected strong evidence before giving shelf space to a new range.",
      approach:
        "We tested product concepts online with shoppers in the UAE and Saudi Arabia, then ran taste tests in supermarkets with coded samples in rotated order, in Arabic and English. Concepts were shown with realistic pack designs and prices, and taste tests included families with children, since many products were bought for school lunches.",
      outcome:
        "Mildly spiced chicken products tested best across nationalities. The manufacturer launched them with clear halal labelling and recipe suggestions. Retail buyers responded positively to the research evidence, and the range gained listings in two major supermarket chains.",
      learning: "Local taste testing avoided costly product failures.",
      verified: true,
    },
    {
      slug: "meat-processor-cost-margin-analysis",
      title: "Understanding product margins for a meat processor",
      client: "A meat processing company",
      region: "Uttar Pradesh",
      markets: ["IN"],
      services: ["Virtual CFO services", "MIS & financial reporting", "Accounting & finance consulting"],
      methods: ["Yield-based costing", "Monthly MIS"],
      scope: "One plant, export and domestic products",
      timeline: "6 months",
      challenge:
        "The meat processor’s profitability swung widely from month to month, and management could not tell which products and markets made money because costs were not tracked by product. Market prices for different cuts and by-products moved independently, which made average margins misleading.",
      approach:
        "We built a costing model based on carcass yields, by-products, processing and packaging costs, and introduced a monthly management report with margins by product and market. Plant managers and the finance team agreed yield assumptions together, and the model was updated each month with actual yields.",
      outcome:
        "Several low-margin products were repriced, and management used monthly data to plan the product mix around market prices. Sales teams also used product margins when negotiating export contracts.",
      learning: "Yield-based costing reflected the real economics of the business.",
      verified: true,
    },
    {
      slug: "animal-welfare-consumer-perception",
      title: "Consumer attitudes to animal welfare labelling",
      client: "An animal welfare certification body",
      region: "United Kingdom, Germany & Switzerland",
      markets: ["UK", "DE", "CH"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey", "Label testing"],
      scope: "3,000 meat buyers",
      timeline: "7 weeks",
      challenge:
        "The certification body wanted more shoppers to choose higher-welfare meat, but did not know whether shoppers understood existing labels or whether labels influenced their decisions. Several competing labels existed, and retailers reported that shoppers were confused about what each one meant.",
      approach:
        "We surveyed meat buyers in the UK, Germany and Switzerland about label awareness, trust and willingness to pay, and tested alternative label designs, in English, German and French. Label designs were shown in realistic shelf images, and respondents were asked to rank products and explain their choices.",
      outcome:
        "Simple tiered labels showing welfare levels were understood best and increased willingness to pay. The body redesigned its label system. Retail partners adopted the new labels, and the body planned a follow-up survey after a year.",
      learning: "Clarity determined whether labels influenced choices.",
      verified: true,
    },
  ],
  MEAT_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: MEAT_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  MINING_CASES = [
    {
      slug: "mine-community-social-licence-study",
      title: "Measuring trust between a mine and its neighbouring communities",
      client: "A coal and iron ore mining company",
      region: "Jharkhand & Odisha",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "Group discussions with women, youth and elders"],
      scope: "2,200 households in 32 villages",
      timeline: "10 weeks",
      challenge:
        "The company had invested in schools, health camps and roads around its mines, yet local protests continued and project approvals were taking longer each year. Leadership realised it did not know how communities actually saw the company, or which concerns mattered most to them.",
      approach:
        "We recruited interviewers from the region who spoke Hindi, Santali and Ho, and surveyed households about livelihoods, land, water, dust, employment and trust in the company. Separate group discussions with women, young people and village elders explored issues people found hard to raise in front of others. Interviews were held without company staff present, and every interview was GPS-tagged and back-checked.",
      outcome:
        "Dust on crops, unclear land compensation and the hiring of outsiders were the main grievances, while CSR projects were appreciated but did not offset them. The company introduced dust suppression on haul roads, a local hiring commitment with published numbers and a village grievance desk with response deadlines. A follow-up survey was planned after eighteen months to track whether trust improved.",
      learning:
        "Communities judged the company on how it handled everyday impacts, not on the size of its CSR spending.",
      verified: true,
    },
    {
      slug: "mining-workforce-safety-culture-australia",
      title: "Understanding safety culture among fly-in fly-out mine workers",
      client: "A mid-tier mining company",
      region: "Western Australia & Queensland",
      markets: ["AU"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous online and tablet survey", "Crew interviews"],
      scope: "1,600 employees and contractors across five sites",
      timeline: "9 weeks",
      challenge:
        "Safety statistics looked stable, but internal reviews suggested near misses were under-reported, particularly among contractors on fly-in fly-out rosters. The company also faced growing concern about fatigue and wellbeing on long rotations.",
      approach:
        "We ran an anonymous survey available on tablets at site camps and online during rest days, covering safety leadership, reporting confidence, fatigue, roster pressure and wellbeing. Researchers then held confidential interviews with crews from different shifts and contractor firms, away from supervisors. Results were reported only for groups large enough to protect anonymity.",
      outcome:
        "Contractors were less confident that reporting a near miss would be welcomed, and fatigue was highest in the final days of long rosters. The company introduced a single reporting system for employees and contractors, recognition for near-miss reporting and changes to roster patterns at two sites. Contractor firms were included in safety leadership meetings for the first time.",
      learning: "Safety culture is only as strong as the experience of the least-heard worker on site.",
      verified: true,
    },
    {
      slug: "mining-equipment-buyer-research-south-africa",
      title: "How mine operators choose heavy equipment suppliers",
      client: "A mining equipment manufacturer",
      region: "South Africa & Morocco",
      markets: ["ZA", "MA"],
      services: ["Business panel", "Qualitative research", "Quantitative research"],
      methods: ["Interviews with maintenance and procurement managers", "B2B survey"],
      scope: "30 interviews, 160 survey responses",
      timeline: "8 weeks",
      challenge:
        "The manufacturer’s haul trucks and loaders were well regarded technically, but it was losing tenders to competitors with similar prices. Sales teams could not tell whether the issue was service, financing or relationships.",
      approach:
        "We interviewed maintenance managers, engineering heads and procurement officers at mining operations, asking them to walk through recent equipment decisions and how suppliers were compared. A short survey then measured the importance of uptime guarantees, parts availability, service response, financing and local presence. Interviews were held in English, Afrikaans and French, and each participant described at least one recent tender in detail.",
      outcome:
        "Mine operators prioritised guaranteed uptime and parts availability at site above purchase price, and competitors offered stronger service contracts. The manufacturer introduced uptime-linked service agreements and a parts depot closer to major mining regions, and adjusted its tender proposals accordingly.",
      learning: "In heavy equipment, buyers were really purchasing uptime, not machines.",
      verified: true,
    },
    {
      slug: "artisanal-mining-livelihood-study",
      title: "Understanding livelihoods in artisanal mining communities",
      client: "An international development organisation",
      region: "Indonesia",
      markets: ["ID"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "In-depth interviews"],
      scope: "1,400 households, 45 interviews",
      timeline: "11 weeks",
      challenge:
        "The organisation planned a programme to improve safety and incomes in small-scale gold mining areas, but had little reliable data on household incomes, health risks, debt or how miners sold their gold.",
      approach:
        "Working with local partners, interviewers speaking Bahasa Indonesia and local languages surveyed mining households about income, expenses, health, mercury use, children’s schooling and trading arrangements. In-depth interviews with miners, traders and women in mining households explored debt and decision-making. Strict consent procedures and confidentiality were followed throughout.",
      outcome:
        "Many households depended on traders for credit and sold gold below market prices, and awareness of mercury health risks was low. The programme combined safer processing demonstrations with a cooperative selling model and health awareness for women and children. Local partners continued the work after the study, using the survey as a baseline for measuring progress.",
      learning: "Safety programmes worked best when they also improved incomes.",
      verified: true,
    },
    {
      slug: "mining-company-esg-stakeholder-research",
      title: "Investor and stakeholder views on a miner’s sustainability reporting",
      client: "A listed mining company",
      region: "Investors in the UK, Switzerland, Canada & Australia",
      markets: ["UK", "CH", "CA", "AU"],
      services: ["Research consultancy", "Qualitative research", "Reporting & insights"],
      methods: ["Interviews with investors, analysts and NGOs"],
      scope: "28 stakeholder interviews",
      timeline: "7 weeks",
      challenge:
        "The company published an annual sustainability report, but investor questions on climate, water and community issues kept increasing. Leadership wanted to know whether its reporting answered the questions that mattered most to investors and other stakeholders. Analysts had begun scoring the company below peers, partly because they could not find the data they needed.",
      approach:
        "We interviewed portfolio managers, sustainability analysts, lenders and NGOs about how they assessed mining companies, what information they relied on and where the company’s reporting fell short. Interviews were confidential, and findings were grouped by stakeholder type. We also reviewed peer reports to show which disclosures stakeholders considered best practice.",
      outcome:
        "Stakeholders wanted site-level data on water and tailings safety and clearer targets with progress reporting, rather than case studies. The company restructured its report around material issues with site-level data and published a tailings safety summary.",
      learning: "Stakeholders trusted data and targets more than stories.",
      verified: true,
    },
    {
      slug: "mine-closure-community-planning",
      title: "Planning for life after a mine closes",
      client: "A mining company preparing a closure plan",
      region: "Canada",
      markets: ["CA"],
      services: ["Qualitative research", "Quantitative research", "Government research"],
      methods: ["Community survey", "Workshops with local government and Indigenous representatives"],
      scope: "900 residents, 6 workshops",
      timeline: "10 weeks",
      challenge:
        "A mine that had supported a small town for decades was due to close within ten years. The company needed to understand residents’ concerns and aspirations to develop a responsible closure and transition plan. Residents worried about jobs, property values and the future of local services such as the school and clinic.",
      approach:
        "We surveyed residents about employment, services, land use and their hopes for the town after mining, and facilitated workshops with local government, businesses and Indigenous community representatives, respecting their consultation protocols. Workshops were held in community halls in the evenings, and summaries were shared publicly so residents could see how their views were recorded.",
      outcome:
        "Residents prioritised retraining, protection of water sources and reuse of mine land for tourism and renewable energy. The company included these priorities in its closure plan and set up a joint transition committee.",
      learning: "Starting the conversation early gave the community time to shape its own future.",
      verified: true,
    },
    {
      slug: "mining-procurement-erp",
      title: "Bringing procurement and stores under control at a mining operation",
      client: "A limestone and dolomite mining company",
      region: "Rajasthan",
      markets: ["IN"],
      services: ["ERP development", "Mobile app development", "Accounting & finance consulting"],
      methods: ["Process mapping", "ERP with mobile stores app"],
      scope: "Three mines, central workshop",
      timeline: "6 months",
      challenge:
        "Spare parts and consumables for heavy equipment were purchased by phone and tracked in registers at each mine. Breakdowns were extended while parts were searched for, and duplicate purchases were common.",
      approach:
        "We mapped procurement and stores processes with mine managers and workshop staff, implemented purchasing and inventory modules, and built a mobile app for storekeepers to record receipts, issues and transfers, working offline at remote pits. Parts were labelled with barcodes and linked to equipment. Workshop mechanics helped define how parts should be labelled and searched, so the system matched how they worked.",
      outcome:
        "Parts availability became visible across mines, transfers replaced many emergency purchases and equipment downtime from missing parts fell noticeably. Management could see maintenance spending by machine for the first time. Purchasing also negotiated better terms by consolidating orders across mines.",
      learning: "Linking parts to equipment turned store records into maintenance intelligence.",
      verified: true,
    },
    {
      slug: "mining-graduate-recruitment-campaign",
      title: "Attracting graduates to careers in mining",
      client: "A mining industry association",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Quantitative research", "Social media advertising", "Content marketing"],
      methods: ["Student survey", "Career campaign"],
      scope: "2,000 students before and after the campaign",
      timeline: "8 months",
      challenge:
        "Enrolments in mining engineering and related degrees had fallen, and companies struggled to recruit graduates. The association wanted to understand students’ perceptions before launching a careers campaign. Industry leaders worried that negative perceptions about environmental impact and remote lifestyles were turning students away.",
      approach:
        "We surveyed university and senior school students about career interests and perceptions of mining, including concerns about sustainability and remote work. The findings shaped a campaign featuring young engineers and technicians working on automation, environmental management and rehabilitation. Content was distributed through social channels students actually used and through university careers events.",
      outcome:
        "Students who saw the campaign were more aware of technology and environmental roles in mining and more likely to consider related courses. The association extended the campaign to school career advisers.",
      learning: "Showing modern roles changed perceptions shaped by outdated images.",
      verified: true,
    },
    {
      slug: "mining-water-stewardship-study",
      title: "Understanding water concerns around mining operations",
      client: "A copper mining company",
      region: "Morocco & Saudi Arabia",
      markets: ["MA", "SA"],
      services: ["Research consultancy", "Quantitative research", "Qualitative research"],
      methods: ["Community survey", "Farmer interviews", "Stakeholder workshops"],
      scope: "1,100 households, 40 interviews",
      timeline: "9 weeks",
      challenge:
        "In water-scarce regions, communities and farmers worried that mining operations reduced groundwater and affected quality. The company needed to understand these concerns to design a credible water stewardship programme. Social media rumours about contaminated wells had increased tension, and local authorities were asking the company for answers.",
      approach:
        "We surveyed nearby households and farmers in Arabic and local languages about water sources, perceived changes and trust in information, and held workshops with local authorities and water user groups. Interviewers were recruited locally, and questions covered how people would prefer to receive water information and from whom they would trust it.",
      outcome:
        "Communities wanted independent water monitoring with published results. The company funded a jointly governed monitoring programme and shared quarterly results publicly. Community representatives sat on the monitoring committee, and early results helped dispel several rumours about contamination.",
      learning: "Independent, transparent data built more trust than company assurances.",
      verified: true,
    },
    {
      slug: "mining-company-cash-and-royalty-planning",
      title: "Improving cash planning for a mining company with volatile prices",
      client: "A mineral mining company",
      region: "Karnataka",
      markets: ["IN"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "MIS & financial reporting"],
      methods: ["Scenario-based cash forecasting", "Monthly MIS"],
      scope: "Two mines, export and domestic sales",
      timeline: "9-month engagement",
      challenge:
        "Volatile mineral prices, seasonal operations during the monsoon and royalty and statutory payments made cash planning difficult. The company had faced repeated short-term borrowing at high cost. The finance team prepared numbers manually each month, and management saw profitability only at year end.",
      approach:
        "Our virtual CFO built a cash forecast with price and volume scenarios, scheduled royalty and statutory payments, and introduced a monthly MIS showing production cost per tonne, realisation and margins. Monthly reviews with the promoters compared actual cash, production and prices with forecast scenarios, so decisions could be made early.",
      outcome:
        "Management planned borrowing in advance, built reserves during strong price periods and reduced costly short-term loans. Cost-per-tonne reporting highlighted inefficiencies at one mine. Lenders also responded positively to the improved reporting when the company renewed its working capital limits.",
      learning: "Scenario planning made volatility manageable rather than surprising.",
      verified: true,
    },
  ],
  MINING_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: MINING_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  PETROLEUM_OIL_GAS_CASES = [
    {
      slug: "fuel-station-mystery-shopping",
      title: "Mystery shopping a national fuel retail network",
      client: "An oil marketing company",
      region: "400 fuel stations in 60 cities",
      markets: ["IN"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["Mystery customer visits", "Station scorecards"],
      scope: "1,200 visits per wave",
      timeline: "Quarterly programme",
      challenge:
        "The company had introduced service standards for its fuel stations, covering fuel quantity checks, cleanliness, washroom availability and staff courtesy, but had no independent way to know whether dealers followed them. Customer complaints about short-filling and dirty washrooms were rising on social media.",
      approach:
        "Trained mystery customers visited stations by car and two-wheeler at different times of day, following a consistent script to observe zero display checks, payment options, washroom cleanliness, air and water facilities and staff behaviour. Each visit was photo-documented, and results were shared with regional managers as station scorecards with comparisons over time.",
      outcome:
        "Washroom availability and zero-display practices varied widely, with night-time visits scoring lowest. The company linked part of dealer incentives to scorecard performance and introduced surprise audits for consistently low scorers. Scores improved across the network over the following quarters.",
      learning: "Visiting at different times of day revealed standards slipping when supervision was lowest.",
      verified: true,
    },
    {
      slug: "lubricant-mechanic-loyalty-research",
      title: "Understanding how mechanics recommend engine oil",
      client: "A lubricants brand",
      region: "India, Indonesia & Egypt",
      markets: ["IN", "ID", "EG"],
      services: ["Quantitative research", "Qualitative research", "Offline data collection (CAPI)"],
      methods: ["Workshop interviews", "Retailer survey"],
      scope: "2,400 mechanics, 600 retailers across three countries",
      timeline: "10 weeks",
      challenge:
        "Independent workshops serviced most two-wheelers and cars in these markets, and mechanics usually decided which oil to use. The brand’s loyalty programmes performed unevenly across countries and it wanted to understand what really drove mechanics’ recommendations.",
      approach:
        "Interviewers visited workshops during working hours, speaking with mechanics in local languages about brand choice, counterfeit concerns, margins, customer requests and loyalty schemes. Lubricant retailers were surveyed about stocking and recommendations. The questionnaire was adapted for each country while keeping core measures comparable.",
      outcome:
        "Fear of counterfeit oil damaging their reputation was a major concern in all three markets, while the value of loyalty rewards differed. The brand introduced scratch-code authentication everywhere and adjusted rewards to local preferences, such as tools in Indonesia and mobile credit in Egypt. Participation in loyalty programmes increased in all three markets.",
      learning: "A shared concern across markets allowed one global solution with local reward choices.",
      verified: true,
    },
    {
      slug: "city-gas-pipeline-adoption-study",
      title: "Why households delay switching to piped natural gas",
      client: "A city gas distribution company",
      region: "Pune & Ahmedabad",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Content marketing"],
      methods: ["Household survey in pipeline areas", "Group discussions"],
      scope: "1,800 households, 10 discussions",
      timeline: "7 weeks",
      challenge:
        "The company had laid pipelines in many neighbourhoods, but conversion of households from LPG cylinders to piped gas remained slow, leaving infrastructure underused. Every unconnected household along existing pipelines represented lost revenue on infrastructure already built.",
      approach:
        "We surveyed households in areas with available connections about awareness, perceived safety, connection costs, billing concerns and trust. Group discussions explored concerns in depth and tested communication materials explaining safety and savings. Interviews were conducted in Marathi, Gujarati, Hindi and English, with quotas for apartment complexes and independent homes.",
      outcome:
        "Concerns about safety and the one-time connection fee were the main barriers, and many residents did not know connections were available. The company introduced instalment payment for connection fees and society-level safety demonstrations, which accelerated conversions. Housing societies that hosted demonstrations converted noticeably faster than others.",
      learning: "Meeting residents in their own housing societies built trust quickly.",
      verified: true,
    },
    {
      slug: "oil-gas-contractor-safety-culture",
      title: "Assessing safety culture among offshore and onshore contractors",
      client: "An oil and gas operator",
      region: "United Arab Emirates & Saudi Arabia",
      markets: ["AE", "SA"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous multilingual survey", "Crew discussions"],
      scope: "3,000 employees and contractors",
      timeline: "10 weeks",
      challenge:
        "The operator worked with many contracting companies and a multinational workforce. Leadership wanted to understand whether safety culture was consistent across contractors, nationalities and sites. Incident investigations had highlighted communication problems between supervisors and crews from different backgrounds.",
      approach:
        "We ran an anonymous survey in Arabic, English, Hindi, Urdu, Tagalog and Malayalam, covering safety leadership, stop-work authority, reporting confidence and fatigue, followed by crew discussions without supervisors. Results were reported by contractor and site only where groups were large enough to protect anonymity.",
      outcome:
        "Workers from some contractors were less confident about using stop-work authority. The operator introduced contractor-specific safety leadership training and translated safety communications into more languages. A follow-up survey was planned to track progress, and results were shared with contractor management.",
      learning: "Language and contractor differences shaped how safe people felt to speak up.",
      verified: true,
    },
    {
      slug: "fuel-retail-loyalty-app",
      title: "Building a loyalty app for fuel station customers",
      client: "A fuel retailer",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Mobile app development", "Marketing automation", "Data analytics & dashboards"],
      methods: ["Customer research", "Loyalty app", "Programme dashboard"],
      scope: "300 stations",
      timeline: "6 months",
      challenge:
        "The retailer’s plastic loyalty card was rarely used, and it had little data on customer visits or convenience store purchases. Competitors had launched digital loyalty programmes, and the retailer risked losing frequent customers.",
      approach:
        "We interviewed customers about loyalty habits and built an app with digital points, fuel price alerts and convenience store offers, integrated with station systems and a programme dashboard. The app was tested with customers at pilot stations before national rollout, and attendants were trained to help customers sign up.",
      outcome:
        "App adoption grew steadily, and the retailer could see visit frequency and convenience store cross-purchases for the first time. Convenience store sales grew at stations with high app usage. Station managers also used dashboard data to plan promotions at quieter times.",
      learning: "Personalised offers drove more engagement than generic points.",
      verified: true,
    },
    {
      slug: "oil-gas-supplier-localisation",
      title: "Identifying local suppliers for an oil and gas operator",
      client: "An oil and gas operator",
      region: "Saudi Arabia, Qatar & Egypt",
      markets: ["SA", "QA", "EG"],
      services: ["Business panel", "Research consultancy", "Data analytics & dashboards"],
      methods: ["Supplier screening", "Capability interviews"],
      scope: "250 suppliers screened, 70 interviewed",
      timeline: "10 weeks",
      challenge:
        "National content requirements encouraged operators to source locally, but the operator lacked an up-to-date view of local suppliers’ capabilities. Procurement teams relied on outdated supplier lists, and some local firms had grown capabilities that the operator did not know about.",
      approach:
        "We screened suppliers of equipment, fabrication and services, interviewed promising firms about certifications and capacity, and built a searchable database. Site visits verified capabilities of shortlisted suppliers, and the database recorded certifications with expiry dates. Interviews were conducted in Arabic and English, and suppliers were rated on capability, certification and capacity.",
      outcome:
        "The operator identified new local suppliers for several categories and planned supplier development for others. Several local suppliers were added to approved vendor lists after qualification. The database was updated quarterly so procurement teams always had current information.",
      learning: "Verified capability data made localisation targets realistic.",
      verified: true,
    },
    {
      slug: "lpg-distributor-service-study",
      title: "Improving LPG delivery and service experience",
      client: "An oil marketing company",
      region: "Tamil Nadu & Karnataka",
      markets: ["IN"],
      services: ["Offline data collection (CATI)", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Customer telephone survey", "Distributor dashboard"],
      scope: "5,000 customers",
      timeline: "6 weeks",
      challenge:
        "Complaints about delayed LPG deliveries and extra charges were rising, and the company wanted evidence by distributor. Complaints reached head office through social media and helplines, but there was no systematic measure of service by distributor.",
      approach:
        "We called customers after deliveries to ask about booking, delivery time, charges and safety checks, and created a distributor dashboard. Calls were made in Tamil, Kannada and English shortly after deliveries, and a sample of responses was verified with customers by revisit.",
      outcome:
        "A minority of distributors accounted for most complaints. The company focused audits and training on them. Complaint volumes fell in the following months, and the survey became a regular monitoring tool. Distributors with the highest scores were recognised publicly, encouraging improvement across the network.",
      learning: "Distributor-level data showed where to act.",
      verified: true,
    },
    {
      slug: "energy-company-esg-investor-views",
      title: "Investor views on an energy company’s transition strategy",
      client: "A listed oil and gas company",
      region: "Investors in the UK, Switzerland, USA & Japan",
      markets: ["UK", "CH", "US", "JP"],
      services: ["Research consultancy", "Qualitative research", "Reporting & insights"],
      methods: ["Investor and analyst interviews"],
      scope: "26 interviews",
      timeline: "6 weeks",
      challenge:
        "The company published a transition strategy, but investor questions suggested low confidence in its targets. Analysts had questioned the credibility of long-term targets without clear near-term actions.",
      approach:
        "We interviewed portfolio managers and analysts confidentially about their assessment of the strategy and the information they needed. Interviews were confidential, and findings were grouped by investor type so the company could see differences between long-only funds, hedge funds and sustainability specialists. We also benchmarked how peers presented their transition plans to identify practices investors found credible.",
      outcome:
        "Investors wanted capital allocation details and interim milestones. The company added them to its next investor update. Investor feedback on the subsequent update was noticeably more positive. Analysts referenced the new milestones in their research notes.",
      learning: "Specific milestones built more confidence than long-term ambitions.",
      verified: true,
    },
    {
      slug: "oil-company-gst-and-compliance",
      title: "Simplifying tax compliance for a fuel dealer network partner",
      client: "A multi-outlet fuel dealership group",
      region: "Haryana & Punjab",
      markets: ["IN"],
      services: ["GST services", "Accounting & bookkeeping", "TDS services"],
      methods: ["Compliance review", "Monthly routine"],
      scope: "Eight outlets",
      timeline: "Ongoing",
      challenge:
        "Each outlet kept its own books, and GST and TDS filings were often late or inconsistent. The owners also struggled to see which outlets were profitable after expenses.",
      approach:
        "We standardised bookkeeping across outlets, reconciled tax data monthly and set up a compliance calendar. We introduced common charts of accounts and monthly closing procedures across outlets, with reconciliations before each filing. Outlet managers were trained to record transactions consistently, and documents were stored digitally for audit.",
      outcome:
        "Filings became timely and consistent, and the owners received a monthly profitability view by outlet. Notices from tax authorities stopped, and the owners used outlet-level reports to manage staffing and costs. Audits also became faster because records were organised and reconciled each month.",
      learning: "Standard processes simplified compliance across locations.",
      verified: true,
    },
    {
      slug: "refinery-community-health-perception",
      title: "Understanding community health concerns near a refinery",
      client: "A refinery operator",
      region: "Malaysia",
      markets: ["MY"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Household survey", "Community meetings"],
      scope: "1,200 households",
      timeline: "7 weeks",
      challenge:
        "Residents near the refinery raised concerns about air quality and health, and the operator wanted an independent understanding. Local media coverage had increased community anxiety, and trust in company statements was low.",
      approach:
        "We surveyed households in Malay, English and Chinese about perceived impacts and trust, and held community meetings. Surveys covered residents at different distances from the refinery, and community meetings included health experts who answered questions. Independent health experts reviewed the findings, and questions were designed to avoid leading respondents.",
      outcome:
        "Residents wanted real-time air quality information. The operator installed public air quality displays and published monthly results. Complaints decreased, and community representatives joined a quarterly environmental review meeting. The operator also funded a community health clinic in the nearest town.",
      learning: "Accessible data reduced anxiety and rumours.",
      verified: true,
    },
  ],
  PETROLEUM_OIL_GAS_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: PETROLEUM_OIL_GAS_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  PHARMACEUTICAL_CASES = [
    {
      slug: "cardiologist-treatment-pattern-study",
      title: "Understanding how cardiologists choose treatments after a heart attack",
      client: "A pharmaceutical company",
      region: "Metros and tier-2 cities",
      markets: ["IN"],
      services: ["Healthcare panel", "Quantitative research", "Qualitative research"],
      methods: ["Online HCP survey", "In-depth interviews"],
      scope: "250 cardiologists, 20 interviews",
      timeline: "6 weeks",
      challenge:
        "The company wanted to understand prescribing patterns and decision drivers for post-heart-attack therapy, to shape its medical education programme.",
      approach:
        "Verified cardiologists from our healthcare panel completed a survey on treatment choices, guidelines, patient factors and evidence needs. In-depth interviews explored reasoning. Adverse event reporting procedures were agreed with the client before fieldwork.",
      outcome:
        "Cardiologists in tier-2 cities faced more patient affordability and adherence challenges. The company refocused its education programme on adherence support and practical guidance for those settings.",
      learning: "Context of practice shaped decisions as much as clinical evidence.",
      verified: true,
    },
    {
      slug: "patient-journey-diabetes",
      title: "Mapping the patient journey for people living with diabetes",
      client: "A pharmaceutical company",
      region: "Six cities in Saudi Arabia, UAE & Egypt",
      markets: ["SA", "AE", "EG"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["Patient diaries", "Patient and caregiver survey"],
      scope: "40 diaries, 1,200 patients and caregivers",
      timeline: "9 weeks",
      challenge:
        "The company wanted to understand the experience of living with diabetes, from diagnosis to long-term management, to design patient support services.",
      approach:
        "Patients kept two-week diaries of meals, medication, monitoring and emotions, with consent and privacy safeguards. A survey then measured how common the patterns were.",
      outcome:
        "Many patients struggled most in the first year after diagnosis and felt overwhelmed by information. The company designed a first-year support programme with simple guidance and nurse follow-ups.",
      learning: "Diaries captured daily realities that interviews tend to smooth over.",
      verified: true,
    },
    {
      slug: "pharmacy-retail-audit",
      title: "Understanding pharmacist recommendations at the counter",
      client: "A consumer health company",
      region: "10 cities in Indonesia & Malaysia",
      markets: ["ID", "MY"],
      services: ["Offline data collection", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Pharmacist interviews", "Mystery shopping"],
      scope: "1,000 pharmacies",
      timeline: "6 weeks",
      challenge:
        "For over-the-counter products, pharmacists often guide customer choices. The company wanted to know how pharmacists recommended brands for common ailments.",
      approach:
        "We interviewed pharmacists about recommendations and stocking, and mystery shoppers asked for advice on common symptoms, recording which brands were suggested and why.",
      outcome:
        "Pharmacists recommended brands with consistent availability and good margins, and valued simple product information. The company improved supply consistency and created pharmacist-friendly product cards.",
      learning: "Mystery shopping showed actual recommendations, not just stated preferences.",
      verified: true,
    },
    {
      slug: "medical-device-usability-testing",
      title: "Usability testing a home blood pressure monitor",
      client: "A medical device company",
      region: "London, Manchester & Toronto",
      markets: ["UK", "CA"],
      services: ["Qualitative research", "UI/UX design", "Healthcare panel"],
      methods: ["Usability sessions with patients and caregivers"],
      scope: "36 usability sessions",
      timeline: "5 weeks",
      challenge:
        "The company was launching a home monitor for older users and wanted to know whether people could set it up and take readings correctly without help.",
      approach:
        "Participants unboxed and used the device while researchers observed, noting errors and confusion. Sessions included older adults and caregivers.",
      outcome:
        "Cuff placement and reading the display were common problems. The company redesigned the instructions with clear diagrams and enlarged display digits before launch.",
      learning: "Watching real users caught problems that lab testing had missed.",
      verified: true,
    },
    {
      slug: "hcp-message-testing",
      title: "Testing promotional messages with physicians",
      client: "A pharmaceutical brand team",
      region: "United States, United Kingdom, Germany & Japan",
      markets: ["US", "UK", "DE", "JP"],
      services: ["Healthcare panel", "Quantitative research", "Qualitative research"],
      methods: ["Online message test", "Follow-up interviews"],
      scope: "300 physicians, 15 interviews",
      timeline: "4 weeks",
      challenge:
        "The brand team had several candidate messages for a new product and needed evidence on which were most credible and relevant to physicians.",
      approach:
        "Physicians rated messages on clarity, credibility, relevance and differentiation in a monadic design, then follow-up interviews explored reactions in depth.",
      outcome:
        "Messages based on specific patient outcomes outperformed general efficacy claims. The team built its launch materials around the strongest messages.",
      learning: "Physicians respond to specifics backed by evidence.",
      verified: true,
    },
    {
      slug: "pharma-field-force-app",
      title: "A digital tool for medical representatives",
      client: "A mid-sized pharmaceutical company",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Mobile app development", "CRM development", "Data analytics & dashboards"],
      methods: ["Field force interviews", "App and dashboard"],
      scope: "600 medical representatives",
      timeline: "5 months",
      challenge:
        "Representatives reported visits on paper and spreadsheets, and managers lacked visibility of doctor coverage and activity.",
      approach:
        "We built a mobile app for planning visits, recording calls, managing sample distribution and accessing approved materials, integrated with a CRM and manager dashboards.",
      outcome:
        "Managers could see coverage and frequency by territory, sample tracking improved, and reporting time for representatives fell.",
      learning: "Designing around the representative’s day made adoption easier.",
      verified: true,
    },
    {
      slug: "rare-disease-caregiver-study",
      title: "Understanding the needs of caregivers for rare disease patients",
      client: "A pharmaceutical company",
      region: "India",
      markets: ["IN"],
      services: ["Healthcare panel", "Qualitative research", "Research consultancy"],
      methods: ["Caregiver interviews via patient groups"],
      scope: "30 caregiver interviews",
      timeline: "8 weeks",
      challenge:
        "The company wanted to design support services for families affected by a rare condition but had little understanding of their daily challenges.",
      approach:
        "With help from patient associations and strict confidentiality, we interviewed caregivers about diagnosis journeys, treatment access, costs and emotional burden.",
      outcome:
        "Long diagnosis delays and financial strain were the main burdens. The company funded diagnostic awareness for physicians and a financial counselling service for families.",
      learning: "Small, sensitive studies require trusted partners and careful listening.",
      verified: true,
    },
    {
      slug: "pharma-brand-tracker",
      title: "Tracking brand perception among general physicians",
      client: "A pharmaceutical company",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Healthcare panel", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Quarterly HCP tracker", "Dashboard"],
      scope: "400 physicians per quarter",
      timeline: "Ongoing quarterly",
      challenge:
        "The company launched several brands in competitive therapy areas and needed to monitor awareness, prescribing intent and perception over time.",
      approach:
        "We ran a quarterly tracker with consistent questions and sample, with results on a dashboard by region and specialty.",
      outcome:
        "The tracker showed which brands gained ground after education programmes, and where perceptions lagged. Marketing adjusted activity based on quarterly results.",
      learning: "Consistency across waves made changes meaningful.",
      verified: true,
    },
    {
      slug: "pharma-export-market-assessment",
      title: "Assessing export opportunities for generic medicines",
      client: "A generic medicines manufacturer",
      region: "South Africa, Egypt, Morocco, Malaysia & Indonesia",
      markets: ["ZA", "EG", "MA", "MY", "ID"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Desk research", "Distributor interviews", "Market model"],
      scope: "30 distributor and expert interviews in six countries",
      timeline: "8 weeks",
      challenge:
        "The manufacturer wanted to prioritise export markets but faced different registration requirements, competition and pricing in each country.",
      approach:
        "We combined regulatory desk research with interviews with distributors and experts, assessing demand, registration timelines, competition and pricing, then scored markets.",
      outcome:
        "Two markets offered the best balance of demand and registration feasibility. The manufacturer began registrations there first.",
      learning: "Regulatory timelines can matter as much as market size.",
      verified: true,
    },
    {
      slug: "pharma-plant-audit-support",
      title: "Preparing a pharmaceutical company for audit and investment",
      client: "A pharmaceutical formulations company",
      region: "Himachal Pradesh",
      markets: ["IN"],
      services: ["Audit & compliance support", "MIS & financial reporting", "Due diligence & financial analysis"],
      methods: ["Finance process review", "Vendor due diligence"],
      scope: "Two manufacturing units",
      timeline: "4 months",
      challenge:
        "The company was preparing for an investor’s due diligence, and previous audits had found inconsistencies in inventory records and related-party documentation.",
      approach:
        "We reconciled inventory and fixed assets, documented related-party transactions, strengthened month-end closing and prepared a vendor due diligence report.",
      outcome:
        "The investor’s due diligence proceeded with fewer queries, and audit findings reduced significantly in the following year.",
      learning: "Preparing early prevented surprises during investment talks.",
      verified: true,
    },
  ],
  PHARMACEUTICAL_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: PHARMACEUTICAL_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  PULP_AND_PAPER_CASES = [
    {
      slug: "packaging-buyer-switch-to-paper",
      title: "Why brands are, and are not, switching from plastic to paper packaging",
      client: "A paper-based packaging manufacturer",
      region: "United Kingdom, Germany & France",
      markets: ["UK", "DE", "FR"],
      services: ["Business panel", "Qualitative research", "Quantitative research"],
      methods: ["Interviews with packaging and sustainability managers", "B2B survey"],
      scope: "30 interviews, 220 survey responses",
      timeline: "8 weeks",
      challenge:
        "Regulation and consumer pressure were pushing brands to reduce plastic packaging, and the manufacturer expected strong demand for paper alternatives. Yet many prospects stalled after initial trials, and the sales team could not explain why.",
      approach:
        "We interviewed packaging engineers, procurement managers and sustainability leads at food, personal care and e-commerce brands, asking them to describe recent packaging decisions and trial experiences. A survey then measured how often each barrier appeared and how decisions were shared between teams. Interviews were conducted in English, German and French by researchers familiar with packaging terminology.",
      outcome:
        "Barrier properties, line speed on existing packing machines and cost per unit were the main obstacles, not willingness to change. The manufacturer created a technical trial service that ran samples on customers’ own lines and published barrier performance data, which shortened sales cycles for new accounts.",
      learning: "Sustainability created interest, but technical confidence closed the deal.",
      verified: true,
    },
    {
      slug: "printer-and-converter-satisfaction",
      title: "A satisfaction programme for printers and converters",
      client: "A paper and board mill",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection (CATI)", "Data analytics & dashboards"],
      methods: ["Half-yearly telephone survey", "Customer dashboard"],
      scope: "500 printers, converters and distributors per wave",
      timeline: "Half-yearly",
      challenge:
        "The mill’s customers included small printing presses, carton converters and paper distributors with very different needs. Complaints about shade variation and delivery delays reached management only through escalations, too late to retain some customers.",
      approach:
        "We designed a half-yearly telephone survey in Hindi, English and regional languages covering product consistency, runnability on machines, delivery, claims and sales support, with open questions about recent problems. Results were shown by customer segment, region and product grade on a dashboard.",
      outcome:
        "Shade consistency in coloured grades and slow handling of quality claims were the main frustrations. The mill tightened shade tolerances, set a claims response target and shared dashboard results with production and sales teams every six months. Later waves showed claims satisfaction improving, and sales teams began using dashboard insights in customer meetings.",
      learning: "Segmenting feedback revealed problems that averages concealed.",
      verified: true,
    },
    {
      slug: "tissue-paper-consumer-study",
      title: "Understanding tissue and kitchen towel buyers",
      client: "A tissue products brand",
      region: "Malaysia, Indonesia & UAE",
      markets: ["MY", "ID", "AE"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey", "In-home usage interviews"],
      scope: "1,800 shoppers, 24 home visits",
      timeline: "7 weeks",
      challenge:
        "Private labels were winning share in supermarkets, and the brand wanted to understand what shoppers valued, and whether premium features justified their price. Category growth was strong, but price promotions were eroding margins, and management needed to know where premium positioning still worked.",
      approach:
        "We surveyed household shoppers about purchase habits, brand choice, price perceptions and product attributes, then visited homes to observe how tissues and kitchen towels were used and stored. Respondents compared products side by side during visits. In-home interviews were conducted in Malay, Bahasa Indonesia, Arabic and English, depending on the household.",
      outcome:
        "Shoppers valued absorbency and softness but could not see differences on shelf, so they chose on price. The brand redesigned packs with clear performance demonstrations and introduced value packs to compete in key formats.",
      learning: "Benefits that cannot be seen on shelf need to be shown on the pack.",
      verified: true,
    },
    {
      slug: "paper-recycling-collection-study",
      title: "Improving waste paper collection from offices and households",
      client: "A recycled paper manufacturer",
      region: "Delhi NCR & Mumbai",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Research consultancy"],
      methods: ["Household and office survey", "Interviews with scrap dealers"],
      scope: "1,200 households, 200 offices, 40 scrap dealers",
      timeline: "7 weeks",
      challenge:
        "The manufacturer depended on imported waste paper, which had become expensive and unreliable. It wanted to increase domestic collection but did not understand how paper moved from homes and offices through scrap dealers to mills. Domestic waste paper was available in large quantities, but its quality was inconsistent and collection was fragmented.",
      approach:
        "We surveyed households and offices about paper disposal and selling habits, and interviewed scrap dealers and aggregators about collection, sorting, prices and quality problems. Interviewers also followed collection routes with aggregators to understand sorting and storage practices in godowns.",
      outcome:
        "Most paper was sold mixed and wet, reducing its value, and offices lacked convenient collection. The manufacturer partnered with aggregators on segregated office collection and introduced quality-linked prices. Pilot collections from offices delivered noticeably cleaner paper, and the model was extended to more business districts.",
      learning: "Quality improved when the value of segregation reached the people doing it.",
      verified: true,
    },
    {
      slug: "paper-mill-energy-water-benchmarking",
      title: "Benchmarking energy and water use across paper mills",
      client: "A paper industry association",
      region: "India",
      markets: ["IN"],
      services: ["Research consultancy", "Data processing & analytics", "Reporting & insights"],
      methods: ["Mill data collection", "Benchmarking analysis"],
      scope: "35 participating mills",
      timeline: "10 weeks",
      challenge:
        "Members faced pressure to reduce energy and water consumption but had no shared benchmarks to compare performance against similar mills. Mills varied widely in age, technology and product mix, so simple comparisons would have been misleading.",
      approach:
        "We collected confidential operating data from mills on production, energy, water and raw materials using standard definitions, verified unusual values with mill engineers, and produced anonymised benchmarks by mill type and size. Results were grouped so that mills were compared only with similar peers, and individual mill data was never shared with others.",
      outcome:
        "Each mill received a confidential report showing where it stood against peers, and the association used aggregated results to plan technical workshops on the largest efficiency gaps. Several mills set efficiency targets based on peer benchmarks, and the association planned to repeat the exercise annually.",
      learning: "Standard definitions and confidentiality encouraged honest data sharing.",
      verified: true,
    },
    {
      slug: "e-commerce-packaging-sme-research",
      title: "What online sellers need from shipping cartons",
      client: "A corrugated box manufacturer",
      region: "Australia, New Zealand & Canada",
      markets: ["AU", "NZ", "CA"],
      services: ["Business panel", "Online surveys", "E-commerce marketing"],
      methods: ["Survey of online sellers", "Online ordering research"],
      scope: "650 small and mid-sized online sellers",
      timeline: "6 weeks",
      challenge:
        "The manufacturer wanted to sell standard shipping boxes online to small e-commerce businesses but knew little about how they bought packaging. Small sellers typically bought boxes from local wholesalers or marketplaces, and the manufacturer had no direct relationship with them.",
      approach:
        "We surveyed online sellers about order sizes, box types, branding needs, delivery expectations and purchasing channels. The survey also explored damage rates in transit, sustainability preferences and willingness to pay for branded packaging, with quotas by country and seller size.",
      outcome:
        "Sellers wanted small minimum orders, fast delivery and simple custom printing. The manufacturer launched an online store with low minimum quantities and a print-on-box option. Early sales came largely from sellers who had never bought directly from a manufacturer before, and repeat order rates were encouraging.",
      learning: "Small customers valued flexibility over unit price.",
      verified: true,
    },
    {
      slug: "paper-mill-community-odour-study",
      title: "Responding to community concerns about mill odour and effluent",
      client: "A pulp and paper mill",
      region: "Tamil Nadu",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "Community meetings"],
      scope: "1,000 households in 14 villages",
      timeline: "7 weeks",
      challenge:
        "Complaints about odour and effluent had reached regulators and the media, and the mill wanted an independent understanding of community concerns. Community trust was low, and rumours about health effects were spreading faster than the mill’s official statements.",
      approach:
        "Interviewers speaking Tamil surveyed households about perceived impacts, health worries and trust in the mill, and held community meetings to discuss findings and expectations. Survey results were presented back to residents in open meetings, where mill engineers explained what was being done and answered questions.",
      outcome:
        "Odour during certain shifts and lack of information were the main concerns. The mill installed odour controls, published effluent monitoring results and set up a community liaison committee. Complaints fell over the following months, and the liaison committee became a regular channel for resolving issues early.",
      learning: "Transparency reduced tension even before every problem was solved.",
      verified: true,
    },
    {
      slug: "school-notebook-brand-research",
      title: "Understanding how parents and students choose notebooks",
      client: "A stationery and notebook brand",
      region: "Twelve cities",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Social media marketing"],
      methods: ["Parent and student survey", "Retailer interviews"],
      scope: "1,600 parents and students, 200 retailers",
      timeline: "6 weeks",
      challenge:
        "Back-to-school season drove most sales, but the brand was losing share to cheaper notebooks and character-licensed products. Retailers also stocked many local brands with higher margins, which reduced shelf space for the company’s range.",
      approach:
        "We surveyed parents and older students about purchase decisions, school lists, price and design preferences, and interviewed stationery retailers about recommendations. Interviews were conducted in the weeks before the new academic year, when purchase decisions were fresh, with quotas by city and school type. Student interviews explored which designs felt “cool” at different ages, with parental consent for younger participants.",
      outcome:
        "School lists and retailer recommendations shaped most purchases, while students influenced cover designs. The brand worked with schools on list-friendly packs and created designs with student input. Sales improved in the following season in cities where school partnerships were introduced.",
      learning: "Understanding who decides what helped target each audience correctly.",
      verified: true,
    },
    {
      slug: "paper-company-export-market-study",
      title: "Assessing export markets for coated paper and board",
      client: "A paperboard manufacturer",
      region: "UAE, Saudi Arabia, Egypt & South Africa",
      markets: ["AE", "SA", "EG", "ZA"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Importer and converter interviews", "Market scoring"],
      scope: "32 interviews across four countries",
      timeline: "8 weeks",
      challenge:
        "The manufacturer had surplus capacity and wanted to export packaging board, but did not know which markets offered the best combination of demand, prices and logistics. Previous export attempts had relied on traders and produced inconsistent orders with thin margins.",
      approach:
        "We interviewed importers, converters and packaging buyers about demand, quality expectations, prices and supplier relationships, and scored markets on attractiveness and feasibility. Interviews were conducted in Arabic and English, and we gathered price quotations and quality specifications from buyers in each market.",
      outcome:
        "Gulf markets offered steady demand from food packaging converters with manageable logistics. The manufacturer appointed distributors in two Gulf countries first. Distributors in the selected markets placed regular orders within the first year, giving the mill a stable export base.",
      learning: "Converter interviews revealed quality expectations that trade data could not.",
      verified: true,
    },
    {
      slug: "paper-mill-cost-reporting",
      title: "Monthly cost visibility for a paper mill",
      client: "A kraft paper mill",
      region: "Gujarat",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Data analytics & dashboards", "Accounting & finance consulting"],
      methods: ["Costing model", "Monthly dashboard"],
      scope: "One mill, four product grades",
      timeline: "4 months",
      challenge:
        "Raw material and energy costs fluctuated sharply, and management only saw grade-level profitability at year end. Monthly accounts showed only total costs, so the team could not tell which grades were profitable when pulp and coal prices changed.",
      approach:
        "We built a costing model allocating raw materials, chemicals, energy and overheads to grades, linked it to production and accounting data and introduced a monthly dashboard. Production managers and accounts staff agreed allocation rules together, so the numbers were trusted by both teams. The dashboard was refreshed after each monthly close and reviewed in a short meeting with production, sales and finance heads.",
      outcome:
        "Management saw which grades were profitable each month and adjusted the production mix and pricing as costs changed. Sales teams also used the data to negotiate prices for low-margin grades with large customers.",
      learning: "Monthly grade-level costing turned volatility into decisions.",
      verified: true,
    },
  ],
  PULP_AND_PAPER_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: PULP_AND_PAPER_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  RETAIL_CASES = [
    {
      slug: "retail-shopper-journey-omnichannel",
      title: "Mapping how shoppers move between stores, apps and websites",
      client: "A department store group",
      region: "United Kingdom",
      markets: ["UK"],
      services: ["Consumer panel", "Quantitative research", "Digital analytics & reporting"],
      methods: ["Shopper survey", "Purchase diaries", "Web analytics review"],
      scope: "2,500 shoppers, 120 two-week diaries",
      timeline: "9 weeks",
      challenge:
        "The group had invested in a new website and app, but online and store teams worked separately and each claimed credit for the same sales. Leadership needed to understand how customers actually combined channels when shopping for clothing, homeware and beauty products, so that investment and targets could be set fairly.",
      approach:
        "We surveyed recent shoppers about their last purchases in each category, recording where they first saw the product, where they researched it and where they finally bought it. A smaller group kept two-week purchase diaries on their phones, logging every browse and purchase, including screenshots. We compared these journeys with website and app analytics to see where digital research led to store purchases.",
      outcome:
        "Most store purchases in homeware and beauty began with online browsing, while many online clothing orders followed a store visit to check fit. The group introduced shared targets for store and online teams, added “check stock in store” and “reserve and collect” features, and began measuring digital influence on store sales.",
      learning: "Diaries captured the real, messy path to purchase that single-channel data could not.",
      verified: true,
    },
    {
      slug: "retail-mystery-shopping-electronics-chain",
      title: "Mystery shopping service quality across a retail chain",
      client: "A consumer electronics and appliances retailer",
      region: "Saudi Arabia, UAE & Qatar",
      markets: ["SA", "AE", "QA"],
      services: ["Offline data collection", "Data analytics & dashboards", "Reporting & insights"],
      methods: ["In-store and phone mystery shopping", "Store scorecards"],
      scope: "140 stores, 560 visits per wave",
      timeline: "Quarterly programme",
      challenge:
        "The retailer had introduced service standards and staff training, yet complaints about pushy selling, poor product knowledge and slow checkout persisted. Area managers had no consistent way to compare stores or measure progress.",
      approach:
        "Mystery shoppers, matched to the retailer’s customer mix of nationals and expatriates, visited stores and made phone enquiries in Arabic and English. They followed scenarios such as buying a laptop for a student or a washing machine for a family, scoring greeting, needs discovery, product knowledge, warranty explanation and checkout. Results were shared as store scorecards with comparisons over time.",
      outcome:
        "Product knowledge was strong, but staff rarely asked about customers’ needs before recommending products, and warranty explanations were inconsistent. The retailer introduced a simple needs-first selling guide and refresher training, and scores for needs discovery rose noticeably over the next two waves.",
      learning: "Scenario-based visits showed exactly which steps of the sale needed attention.",
      verified: true,
    },
    {
      slug: "kirana-store-digital-ordering-study",
      title: "Understanding neighbourhood grocers’ move to digital ordering",
      client: "A B2B e-commerce platform for small retailers",
      region: "Uttar Pradesh, Bihar & Madhya Pradesh",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Retailer survey in stores", "In-depth interviews"],
      scope: "1,500 kirana stores, 30 interviews",
      timeline: "8 weeks",
      challenge:
        "The platform offered small grocers a way to order stock through an app, but adoption was uneven, and many stores ordered once and returned to traditional distributors. The company needed to understand retailers’ needs and barriers in smaller towns.",
      approach:
        "Interviewers visited stores during quieter hours, speaking Hindi and local dialects, to ask about stock ordering, credit, delivery expectations, app use and relationships with distributors. In-depth interviews with retailers who had stopped using the app explored their reasons in detail.",
      outcome:
        "Credit terms and reliable delivery of small, frequent orders mattered more than app features. Many retailers relied on distributor credit they could not get from the platform. The company introduced small working-capital credit, guaranteed next-day delivery and sales representatives who helped place orders.",
      learning: "Digital adoption followed trust and credit, not technology.",
      verified: true,
    },
    {
      slug: "retail-loyalty-programme-redesign",
      title: "Redesigning a supermarket loyalty programme",
      client: "A supermarket chain",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "Research consultancy"],
      methods: ["Member survey with choice exercise", "Transaction data analysis"],
      scope: "3,000 members, 12 months of transactions",
      timeline: "9 weeks",
      challenge:
        "The chain’s points-based loyalty programme was costly but did not seem to change behaviour. Many members collected points without shopping more, and management wanted to know which rewards would actually increase loyalty.",
      approach:
        "We surveyed members about how they valued different rewards, including instant discounts, personalised offers and partner rewards, using a choice exercise. Results were combined with anonymised transaction data to see which members responded to which types of offers. A pilot in selected stores tested personalised offers against the existing programme before full rollout.",
      outcome:
        "Personalised weekly offers on products members already bought drove more additional spending than points. The chain shifted its programme towards personalised offers and simplified points redemption. Programme costs fell while member spending increased.",
      learning: "Rewards that felt personal changed behaviour more than generic points.",
      verified: true,
    },
    {
      slug: "store-location-catchment-study",
      title: "Choosing locations for new convenience stores",
      client: "A convenience store chain",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Research consultancy", "Data analytics & dashboards", "Offline data collection"],
      methods: ["Footfall counts", "Catchment surveys", "Location scoring model"],
      scope: "60 candidate sites",
      timeline: "8 weeks",
      challenge:
        "The chain planned to open dozens of new convenience stores in Malaysia and Indonesia, but several recent openings had underperformed. Locations had been chosen mainly on rent and availability, and leadership wanted a more reliable way to predict which sites would succeed.",
      approach:
        "Field teams counted pedestrian and vehicle traffic at each candidate site at morning, lunchtime and evening peaks, and surveyed nearby residents, office workers and students about their shopping habits, spending and preferred stores, in Malay, Bahasa Indonesia and English. Competitor stores were mapped, and a scoring model combined demand, competition, visibility and access.",
      outcome:
        "The chain opened stores at the highest-scoring sites first, and new stores reached sales targets faster than earlier openings. The model became part of the standard approval process for new locations.",
      learning: "Measuring demand on the ground beat choosing sites by rent alone.",
      verified: true,
    },
    {
      slug: "retail-ecommerce-checkout-optimisation",
      title: "Reducing checkout drop-offs for an online retailer",
      client: "A home and lifestyle online retailer",
      region: "United States & Canada",
      markets: ["US", "CA"],
      services: ["Landing page & CRO", "E-commerce marketing", "Digital analytics & reporting"],
      methods: ["Funnel analysis", "Session recordings", "A/B testing"],
      scope: "Website checkout flow",
      timeline: "5 months",
      challenge:
        "The online home and lifestyle retailer attracted strong traffic, but many shoppers abandoned their carts at checkout, particularly on mobile. Paid advertising was becoming more expensive, so lost checkouts were especially costly.",
      approach:
        "We analysed the checkout funnel step by step, reviewed session recordings to see where shoppers hesitated and ran a short survey of shoppers who abandoned their carts. Changes such as showing shipping costs on product pages, guest checkout and fewer form fields were tested through A/B experiments.",
      outcome:
        "Checkout completion improved significantly, especially on mobile, and revenue from existing traffic rose. Surprise shipping costs had been the single biggest cause of abandonment. The retailer continued running monthly tests on product pages and checkout.",
      learning: "Removing surprises at checkout recovered sales without extra advertising.",
      verified: true,
    },
    {
      slug: "retail-store-staff-engagement",
      title: "Understanding frontline retail staff engagement",
      client: "A fashion and footwear retailer",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous staff survey", "Store manager interviews"],
      scope: "2,000 staff in 150 stores",
      timeline: "7 weeks",
      challenge:
        "The fashion and footwear retailer faced high turnover among store staff, raising training costs and leaving stores short-staffed during busy periods. Exit records gave little insight into why people left.",
      approach:
        "We ran an anonymous survey of store staff in English, isiZulu and Afrikaans, covering scheduling, pay, management, training and career prospects, and interviewed store managers about staffing challenges. Results were reported by region and store size only where groups were large enough to protect anonymity.",
      outcome:
        "Unpredictable rosters that changed at short notice were the strongest driver of turnover, especially for staff with family responsibilities or second jobs. The retailer introduced rosters published two weeks ahead and a shift-swap system, and turnover fell.",
      learning: "Predictable schedules improved retention more than small pay increases.",
      verified: true,
    },
    {
      slug: "retail-inventory-erp-multistore",
      title: "Connecting stock across stores and online for a retail chain",
      client: "A regional apparel retailer",
      region: "Tamil Nadu & Kerala",
      markets: ["IN"],
      services: ["ERP development", "E-commerce development", "API development & integration"],
      methods: ["Inventory integration", "Store and online sync"],
      scope: "45 stores and online store",
      timeline: "6 months",
      challenge:
        "The apparel retailer managed store and online stock separately, so its website sometimes sold items that were out of stock, while stores held slow-moving stock that could have sold online. Store managers also requested stock from head office by phone, and transfers between stores were rarely recorded properly.",
      approach:
        "We integrated store point-of-sale systems with the ERP and online store, giving one live view of stock. Online orders could be fulfilled from the nearest store, and stores could request transfers of fast-selling items. Store staff were trained to use handheld scanners for receiving and transfers, so stock records stayed accurate.",
      outcome:
        "Overselling stopped, delivery times improved for nearby customers and slow-moving store stock sold online, reducing end-of-season discounts. Management also used the data to plan stock allocation for new collections by store.",
      learning: "One view of stock unlocked sales that were previously invisible.",
      verified: true,
    },
    {
      slug: "retail-private-label-perception",
      title: "How shoppers see a supermarket’s own-label products",
      client: "A supermarket chain",
      region: "France & Germany",
      markets: ["FR", "DE"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey", "Blind product tests"],
      scope: "2,000 shoppers, 400 blind tests",
      timeline: "6 weeks",
      challenge:
        "The supermarket chain wanted to grow its own-label range, which offered better margins, but shoppers in France and Germany often chose familiar brands. The chain did not know whether shoppers doubted own-label quality or simply did not notice the products.",
      approach:
        "We surveyed shoppers about their perceptions of own-label and branded products across categories, then ran blind tests in which participants compared unlabelled products and rated taste and quality. Blind tests covered staple categories such as pasta, coffee, cleaning products and breakfast cereals.",
      outcome:
        "Several own-label products matched or beat leading brands in blind tests, but shoppers assumed they were inferior. The chain introduced shelf messaging highlighting comparison results and improved own-label packaging. Own-label sales grew in the categories where comparison messaging was introduced.",
      learning: "Blind tests provided evidence to challenge shoppers’ assumptions.",
      verified: true,
    },
    {
      slug: "retail-chain-virtual-cfo",
      title: "Store-level profitability for a growing retail chain",
      client: "A pharmacy retail chain",
      region: "Gujarat & Rajasthan",
      markets: ["IN"],
      services: ["Virtual CFO services", "MIS & financial reporting", "Budgeting & financial forecasting"],
      methods: ["Store P&L", "Expansion modelling"],
      scope: "60 stores",
      timeline: "9-month engagement",
      challenge:
        "The pharmacy chain was opening new stores quickly, but the owners could not see which stores were profitable after rent, staff and inventory costs. Cash was tight despite growing sales. Suppliers were also offering better terms to competitors with larger volumes, and the owners did not know how to negotiate from a position of evidence.",
      approach:
        "Our virtual CFO built monthly profit and loss reports for each store, reviewed inventory levels and supplier terms, and created a financial model for evaluating new locations. Monthly review meetings with the owners compared each store against targets, and the expansion model tested rent, staffing and sales assumptions for new sites.",
      outcome:
        "Two loss-making stores were restructured, inventory levels were reduced and expansion focused on store formats that had proven profitable. The chain also negotiated improved payment terms with key distributors using its new purchase data.",
      learning: "Store-level numbers made expansion decisions smarter.",
      verified: true,
    },
  ],
  RETAIL_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: RETAIL_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  SEMICONDUCTOR_CASES = [
    {
      slug: "semiconductor-talent-pipeline-study",
      title: "Mapping the talent pipeline for semiconductor design and manufacturing",
      client: "A state electronics and semiconductor mission",
      region: "Karnataka, Gujarat & Telangana",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Employer survey", "Institute interviews", "Student survey"],
      scope: "120 employers, 40 institutes, 1,500 students",
      timeline: "11 weeks",
      challenge:
        "The mission wanted to attract semiconductor design and assembly investments, but companies questioned whether enough skilled engineers and technicians would be available. Officials needed evidence on current supply, demand and skill gaps to plan training.",
      approach:
        "We surveyed semiconductor and electronics employers about hiring plans, roles in demand and skills shortages, interviewed heads of engineering colleges and polytechnics about curricula and lab facilities, and surveyed final-year students about their interests and awareness of semiconductor careers.",
      outcome:
        "Demand was strongest for verification engineers and equipment technicians, while most institutes lacked relevant labs and few students knew these careers existed. The mission launched industry-linked lab programmes, faculty training and awareness campaigns in engineering colleges. Employers participating in the study also agreed to offer internships and guest lectures, linking students directly with the industry.",
      learning: "Talking to employers, institutes and students together revealed a mismatch none could see alone.",
      verified: true,
    },
    {
      slug: "chip-design-services-buyer-research",
      title: "How global chip companies choose design service partners",
      client: "A semiconductor design services company",
      region: "Buyers in the USA, Germany, Japan & Taiwan",
      markets: ["US", "DE", "JP", "TW"],
      services: ["Business panel", "Qualitative research", "B2B digital marketing"],
      methods: ["Interviews with engineering directors", "Competitive positioning review"],
      scope: "25 interviews",
      timeline: "8 weeks",
      challenge:
        "The company competed with many design service firms for verification and physical design projects. Its win rate on new accounts was low, and it struggled to explain its strengths.",
      approach:
        "We interviewed engineering directors and procurement leads at semiconductor companies about how they selected design partners, what made engagements succeed and how firms differentiated themselves. We also reviewed competitors’ positioning. Interviews included lost prospects as well as current clients, which revealed concerns that existing clients had never raised.",
      outcome:
        "Buyers valued domain-specific experience, team continuity and transparent progress reporting over hourly rates. The company repositioned around specific domains, introduced team-continuity commitments and redesigned its website and case materials accordingly. New-account proposals began including domain case studies and progress-reporting samples, and the sales team reported more productive early conversations.",
      learning: "Buyers bought confidence in delivery, not just engineering capacity.",
      verified: true,
    },
    {
      slug: "osat-supplier-ecosystem-assessment",
      title: "Assessing local supply chains for a chip assembly and test facility",
      client: "An outsourced semiconductor assembly and test company",
      region: "India",
      markets: ["IN"],
      services: ["Research consultancy", "Business panel", "Data analytics & dashboards"],
      methods: ["Supplier screening", "Capability interviews"],
      scope: "200 suppliers screened, 60 interviewed",
      timeline: "10 weeks",
      challenge:
        "The company planned a new facility in India and wanted to know which materials, consumables and services could be sourced locally, and which would need to be imported.",
      approach:
        "We screened potential suppliers of chemicals, gases, packaging, precision parts, maintenance and cleanroom services, then interviewed promising firms about capabilities, quality systems and capacity. Results were organised in a supplier database with readiness ratings. Site visits to a shortlist of suppliers helped confirm claims about cleanliness, equipment and quality systems that phone interviews could not verify.",
      outcome:
        "Local suppliers could meet many services and packaging needs, but specialised materials would need imports initially. The company planned supplier development for selected categories. The supplier database was handed to the procurement team as a living tool, updated as suppliers improved their certifications and capacity.",
      learning: "Clear readiness ratings helped plan a realistic localisation roadmap.",
      verified: true,
    },
    {
      slug: "semiconductor-policy-industry-consultation",
      title: "Gathering industry views on semiconductor incentive policies",
      client: "An industry association",
      region: "India",
      markets: ["IN"],
      services: ["Government research", "Business panel", "Reporting & insights"],
      methods: ["Structured member survey", "Executive interviews"],
      scope: "80 member companies, 20 interviews",
      timeline: "6 weeks",
      challenge:
        "The association needed structured evidence from members on incentive schemes, approval processes and infrastructure needs, to inform its policy submissions. Individual companies had raised concerns informally, but policymakers asked for structured, representative evidence rather than anecdotes.",
      approach:
        "We surveyed member companies about investment plans, incentive experiences and barriers, and interviewed senior executives in depth. Responses were confidential and reported in aggregate. Questions were designed with the association’s policy team so that results would map directly onto the specific scheme provisions under discussion.",
      outcome:
        "Approval timelines and reliable utilities were the top concerns. The association’s submission included specific, evidence-based recommendations on both. The survey was repeated a year later to track whether members’ experiences had changed after policy updates, giving the association evidence over time.",
      learning: "Aggregated, confidential responses gave the association credible evidence to present.",
      verified: true,
    },
    {
      slug: "semiconductor-cleanroom-workforce-safety",
      title: "Understanding cleanroom workforce wellbeing and safety",
      client: "A semiconductor assembly company in Malaysia",
      region: "Penang & Kulim, Malaysia",
      markets: ["MY"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous survey", "Shift-team discussions"],
      scope: "900 operators and technicians",
      timeline: "6 weeks",
      challenge:
        "Cleanroom work involves long shifts in protective gowning and strict procedures. The company wanted to understand operator wellbeing, fatigue and safety perceptions as it scaled up.",
      approach:
        "We ran an anonymous survey across all shifts covering fatigue, breaks, training, safety concerns and career progression, followed by discussions with shift teams. Surveys were completed outside the cleanroom during breaks, in Malay, English, Chinese and Tamil, and results were reported only for groups large enough to protect anonymity.",
      outcome:
        "Night-shift fatigue and limited career progression were key concerns. The company adjusted shift rotations, improved rest facilities and introduced skill-based career pathways. Absenteeism and early attrition among new operators declined in the months after the changes, and the survey was scheduled to repeat annually.",
      learning: "Wellbeing and productivity improved together when shifts were designed around people.",
      verified: true,
    },
    {
      slug: "semiconductor-startup-financial-model",
      title: "Building an investor-ready model for a chip design start-up",
      client: "A fabless chip design start-up",
      region: "Bengaluru",
      markets: ["IN"],
      services: ["Financial modelling", "Corporate finance advisory", "Business valuation"],
      methods: ["Driver-based model", "Valuation support"],
      scope: "Five-year model with scenarios",
      timeline: "2 months",
      challenge:
        "The start-up needed funding for tape-out and early production, with long development cycles and uncertain revenue timing. Investors wanted a clear view of capital needs and milestones. Their existing spreadsheet showed revenue growth but did not connect it to development milestones, hiring or the timing of design wins.",
      approach:
        "We built a model linking development milestones, tape-out costs, design wins, unit volumes and pricing, with scenarios for delays and faster adoption, and supported valuation discussions. We also prepared a clear explanation of key risks, such as tape-out delays and design-win timing, and how the plan would adapt if they occurred.",
      outcome:
        "The founders presented a milestone-based funding plan that investors found credible, and negotiated a round sized to reach the next major milestone. The model continued to be used for board reporting, comparing actual progress against milestones and spending.",
      learning: "Milestone-linked funding plans reassured investors in long-cycle businesses.",
      verified: true,
    },
    {
      slug: "electronics-design-community-marketing",
      title: "Building a developer community for an embedded chip platform",
      client: "A semiconductor company’s India team",
      region: "India",
      markets: ["IN"],
      services: ["Content marketing", "Social media marketing", "Video marketing"],
      methods: ["Technical tutorials", "Webinars", "Community engagement"],
      scope: "Developer content programme",
      timeline: "9 months",
      challenge:
        "The company’s microcontrollers were technically strong but rarely chosen by Indian start-ups and students, who preferred platforms with more tutorials and community support. Developers said the documentation was written for experts and assumed knowledge that students and small teams did not have.",
      approach:
        "We created step-by-step tutorials, reference projects and short videos, ran webinars with engineers and supported a community forum, publicising content through developer channels. Content was planned around the questions developers asked most often in forums, and every tutorial included working code that could be copied and adapted.",
      outcome:
        "Developer engagement grew steadily, and the company began seeing its chips in student projects and start-up prototypes. Engineers from the company also answered questions in the community regularly, which built trust and surfaced feedback for the product team.",
      learning: "Practical learning resources lowered the barrier to choosing a new platform.",
      verified: true,
    },
    {
      slug: "semiconductor-design-centre-it-security",
      title: "Securing design data at a chip design centre",
      client: "A semiconductor design centre",
      region: "Hyderabad",
      markets: ["IN"],
      services: ["Cybersecurity services", "Cloud & DevOps services", "IT consulting"],
      methods: ["Security assessment", "Access control redesign", "Backup and recovery"],
      scope: "300 engineers",
      timeline: "4 months",
      challenge:
        "The design centre held valuable intellectual property for global clients, who required strict security controls and evidence during audits. Engineers worked across several client programmes, and access had grown informally over time, so some people could see data from projects they no longer worked on.",
      approach:
        "We assessed infrastructure, access rights and data flows, implemented role-based access, multi-factor authentication, secure remote access and monitored, tested backups, and prepared documentation for client audits. Changes were introduced in stages with engineering leads, and secure remote access was tested with distributed teams before being rolled out to everyone.",
      outcome:
        "The centre passed client security audits with fewer findings and gained confidence in protecting sensitive designs. Clear security documentation also shortened onboarding for new client programmes, which often required evidence of controls before work could begin.",
      learning: "Security designed around engineers’ workflows avoided slowing down design work.",
      verified: true,
    },
    {
      slug: "semiconductor-awareness-students",
      title: "Raising awareness of semiconductor careers among students",
      client: "A semiconductor skills initiative",
      region: "Ten states",
      markets: ["IN"],
      services: ["Social media advertising", "Content marketing", "Quantitative research"],
      methods: ["Awareness survey", "Campaign", "Follow-up survey"],
      scope: "3,000 students before and after",
      timeline: "6 months",
      challenge:
        "Few engineering students considered semiconductor careers, often because they did not know what the jobs involved or which courses led to them. Companies setting up in India also reported difficulty finding graduates with even basic exposure to the field.",
      approach:
        "We measured awareness with a baseline survey, created content explaining roles, skills and pathways featuring young engineers, ran targeted campaigns and repeated the survey after six months. Campaigns ran on platforms students actually used, and content was available in English and Hindi, with short videos showing a day in the life of different roles.",
      outcome:
        "Awareness of semiconductor roles and interest in related courses increased among students exposed to the campaign. Partner colleges reported more students enrolling in related electives, and the initiative extended the campaign to polytechnics for technician roles.",
      learning: "Relatable role models made unfamiliar careers feel achievable.",
      verified: true,
    },
    {
      slug: "semiconductor-equipment-service-crm",
      title: "A service management system for semiconductor equipment",
      client: "A semiconductor equipment service provider",
      region: "Taiwan & Japan",
      markets: ["TW", "JP"],
      services: ["CRM development", "Mobile app development", "Data analytics & dashboards"],
      methods: ["Service process mapping", "Technician app", "Uptime dashboard"],
      scope: "150 installed tools",
      timeline: "5 months",
      challenge:
        "Service calls, preventive maintenance and spare parts were managed by email, making it hard to meet uptime commitments to customers. Each hour of unplanned downtime on these tools was costly for customers, so missed preventive maintenance quickly damaged relationships.",
      approach:
        "We built a service management system with ticketing, preventive maintenance schedules, spare-part tracking and a technician mobile app, with dashboards for uptime by customer. Engineers were involved in designing the mobile app so that recording work, uploading photos and ordering parts fitted naturally into a service visit.",
      outcome:
        "Response times and preventive maintenance compliance became visible, and the provider met uptime commitments more consistently. Customers also received regular uptime reports, which strengthened service contract renewals and helped plan spare-parts stocking.",
      learning: "Structured service data turned uptime commitments into something manageable.",
      verified: true,
    },
  ],
  SEMICONDUCTOR_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: SEMICONDUCTOR_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  SHIPBUILDING_CASES = [
    {
      slug: "shipyard-supplier-localisation-study",
      title: "Identifying local suppliers for a shipyard’s localisation drive",
      client: "A commercial shipyard",
      region: "Gujarat, Maharashtra & Kerala",
      markets: ["IN"],
      services: ["Business panel", "Research consultancy", "Data analytics & dashboards"],
      methods: ["Supplier identification", "Capability interviews", "Supplier database"],
      scope: "320 potential suppliers screened, 90 interviewed",
      timeline: "10 weeks",
      challenge:
        "The shipyard imported many outfitting components and wanted to source more locally to reduce costs and lead times. Its procurement team knew a handful of local suppliers but had no systematic view of who else could meet marine quality standards.",
      approach:
        "We built a long list of potential suppliers from industry associations, trade directories and referrals, then screened them by phone. Promising firms were interviewed in depth about capabilities, certifications, capacity, marine experience and willingness to undergo qualification. Findings were organised in a searchable supplier database for the procurement team.",
      outcome:
        "The shipyard identified suppliers for several component categories that had previously been imported, and began qualification trials with a shortlist. It also learned which categories had no realistic local options, so efforts could be focused where they would pay off.",
      learning: "Knowing where localisation was not feasible was as valuable as finding new suppliers.",
      verified: true,
    },
    {
      slug: "shipyard-workforce-retention-study",
      title: "Understanding why skilled welders leave shipyards",
      client: "A shipbuilding and repair company",
      region: "West coast of India",
      markets: ["IN"],
      services: ["Qualitative research", "Quantitative research", "Reporting & insights"],
      methods: ["Worker survey", "Exit interviews", "Supervisor discussions"],
      scope: "900 workers, 40 exit interviews",
      timeline: "8 weeks",
      challenge:
        "The company invested heavily in training welders and fitters, but many left within two years, often for jobs abroad or in other industries. Delivery schedules suffered as experienced teams broke up.",
      approach:
        "We surveyed current workers anonymously about pay, working conditions, career progression and family circumstances, and conducted exit interviews with recent leavers by phone. Discussions with supervisors explored team dynamics and workload. Interviews were conducted in Hindi, Marathi, Malayalam and Odia.",
      outcome:
        "Pay differences with overseas jobs could not be fully matched, but many workers left because of unpredictable overtime, poor accommodation and no clear path to higher grades. The company introduced skill-grade progression, improved worker housing and more predictable shift planning. Supervisors were also trained to plan overtime earlier, and the company began tracking retention by trade and supervisor every quarter.",
      learning: "Retention depended on dignity and predictability as much as wages.",
      verified: true,
    },
    {
      slug: "ship-repair-customer-research",
      title: "What ship owners value in a repair yard",
      client: "A ship repair yard",
      region: "Ship owners and managers in India, UAE, Hong Kong & Japan",
      markets: ["IN", "AE", "HK", "JP"],
      services: ["Business panel", "Qualitative research", "Online surveys"],
      methods: ["Interviews with technical superintendents", "Online survey"],
      scope: "30 interviews, 110 survey responses",
      timeline: "8 weeks",
      challenge:
        "The repair yard competed with yards in the Gulf and South-East Asia and was losing repeat business. It wanted to understand how ship managers chose repair yards and how it compared.",
      approach:
        "We interviewed technical superintendents and fleet managers about yard selection, quotation practices, schedule reliability, quality and communication during repairs, then surveyed a wider group to measure the importance of each factor. Interviews were scheduled around vessel schedules and conducted by video with superintendents in several time zones, with all responses kept confidential.",
      outcome:
        "Schedule overruns and surprise cost increases were the main reasons managers went elsewhere. The yard introduced fixed-scope quotations with clear variation procedures and daily progress reports during dry-docking. Within a year, the yard was quoting with clearer scopes and several managers who had moved elsewhere returned for routine dry-docking.",
      learning: "Predictability won repeat business more reliably than lower prices.",
      verified: true,
    },
    {
      slug: "coastal-community-port-perception",
      title: "Community perceptions of a proposed port and shipyard expansion",
      client: "A port and shipyard developer",
      region: "A coastal district in South India",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "Fisher community discussions"],
      scope: "1,600 households in 18 villages",
      timeline: "9 weeks",
      challenge:
        "An expansion project faced opposition, particularly from fishing communities worried about access to fishing grounds and the effect on livelihoods. The developer wanted an honest understanding of concerns before finalising plans.",
      approach:
        "Independent researchers surveyed households about livelihoods, expectations and concerns, and held separate discussions with fishers, women, youth and local leaders. Findings were reported transparently, including views critical of the project. Separate discussions with women ensured that concerns about household income and safety were heard alongside those of fishing boat owners.",
      outcome:
        "Fishers’ main concerns were access routes for boats and compensation clarity, while young people wanted skills training for port jobs. The developer revised access arrangements, published a clear compensation framework and committed to local skills programmes. A community liaison office was also set up near the main fishing harbour to handle questions and complaints.",
      learning: "Reporting critical views honestly built more credibility than a positive summary would have.",
      verified: true,
    },
    {
      slug: "shipyard-project-cost-reporting",
      title: "Project cost reporting for a shipbuilding programme",
      client: "A mid-sized shipyard",
      region: "Maharashtra",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Accounting & finance consulting", "Data analytics & dashboards"],
      methods: ["Cost structure redesign", "Project dashboards"],
      scope: "Six vessels under construction",
      timeline: "5 months",
      challenge:
        "Each vessel took more than a year to build, and costs were only compared with budgets at milestones. Overruns were discovered too late to correct, and management could not see where money was going.",
      approach:
        "We restructured accounts with vessel and work-package codes, linked material issues and labour hours to each vessel, and introduced monthly cost-to-complete reviews. Dashboards compared progress and spending by vessel and package. Project managers and finance staff were trained together, so that cost codes were applied consistently from the shop floor to the accounts.",
      outcome:
        "Management could see emerging overruns months earlier, especially in outfitting and rework, and took corrective action. Learning from completed vessels improved the accuracy of new bids. Rework costs, previously hidden in general overheads, became visible and were addressed through better coordination between design and production teams.",
      learning: "Monthly visibility turned project costs from a surprise into something managed.",
      verified: true,
    },
    {
      slug: "maritime-training-institute-marketing",
      title: "Attracting qualified students to a maritime training institute",
      client: "A maritime training institute",
      region: "India, Indonesia & Malaysia",
      markets: ["IN", "ID", "MY"],
      services: ["Lead generation", "Content marketing", "Social media advertising"],
      methods: ["Career guidance content", "Targeted campaigns", "Counselling workflow"],
      scope: "Website, social and search campaigns",
      timeline: "7 months",
      challenge:
        "The institute received many enquiries from students who did not meet medical or academic requirements, and parents had concerns about safety and career prospects at sea.",
      approach:
        "We created honest content explaining eligibility, medical standards, costs, training and career paths, including interviews with working seafarers. Campaigns targeted students and parents in coastal and inland states, and enquiry forms collected eligibility information upfront. Every campaign was linked to tracking, so the institute could see which channels produced eligible applicants rather than just enquiries.",
      outcome:
        "Counsellors spent more time with eligible students, and parents engaged more with content addressing safety and careers. The institute filled its batches with better-prepared students. Counsellors also reported more productive conversations with parents, who arrived better informed about training, costs and life at sea.",
      learning: "Addressing parents’ concerns directly was as important as attracting students.",
      verified: true,
    },
    {
      slug: "shipyard-material-tracking-app",
      title: "Tracking materials across a shipyard with a mobile app",
      client: "A shipbuilding company",
      region: "Kerala",
      markets: ["IN"],
      services: ["Custom business applications", "Mobile app development", "ERP development"],
      methods: ["Process mapping", "Barcode-based app", "ERP integration"],
      scope: "Stores and workshops across one yard",
      timeline: "5 months",
      challenge:
        "Steel plates, pipes and fittings were moved between stores and workshops without consistent records. Materials were lost or reordered unnecessarily, delaying work.",
      approach:
        "We mapped material flows with stores and production staff, then built a mobile app using barcodes to record receipts, issues, transfers and returns, integrated with the company’s ERP. The app worked offline in areas of the yard with poor connectivity. Storekeepers and supervisors were involved from the first prototype, and the barcode labels were designed to survive outdoor storage and handling.",
      outcome:
        "Material locations became visible in real time, unnecessary reorders fell and production delays caused by missing materials reduced noticeably. The planning team also used the data to schedule material deliveries closer to when work packages actually needed them, freeing space in crowded stores.",
      learning: "Offline capability was essential in a yard full of steel structures.",
      verified: true,
    },
    {
      slug: "inland-waterways-feasibility",
      title: "Assessing demand for inland waterway cargo services",
      client: "A logistics and vessel operator",
      region: "Ganga and Brahmaputra corridors, India",
      markets: ["IN"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Shipper interviews", "Cargo flow analysis", "Viability model"],
      scope: "60 shipper and logistics interviews",
      timeline: "9 weeks",
      challenge:
        "The operator was considering investing in barges for inland waterway cargo but was unsure whether shippers would shift from road and rail.",
      approach:
        "We interviewed manufacturers, traders and logistics firms about cargo volumes, routes, transit time needs and pricing, then modelled scenarios for vessel utilisation and economics. We also visited terminals and spoke with port officials about loading facilities, seasonal water levels and connections to road and rail networks.",
      outcome:
        "Demand was strongest for bulk cargo such as cement and fertiliser on specific routes, where transit time was less critical. The operator started with a smaller fleet focused on those cargo types. The model included seasonal water-level scenarios, which shaped the vessel design and the routes chosen for the first year of operation.",
      learning: "Matching vessels to the right cargo mattered more than total market size.",
      verified: true,
    },
    {
      slug: "shipyard-cybersecurity-assessment",
      title: "Strengthening cybersecurity in a shipyard’s design office",
      client: "A shipyard design office in Japan",
      region: "Japan",
      markets: ["JP"],
      services: ["Cybersecurity services", "Cloud & DevOps services", "IT consulting"],
      methods: ["Security assessment", "Access controls", "Backup redesign"],
      scope: "Design office systems and file servers",
      timeline: "3 months",
      challenge:
        "Ship designs and client documents were stored on shared servers with broad access, and backups had never been tested. A ransomware incident at a supplier raised concerns.",
      approach:
        "We assessed systems, access rights and backup practices, introduced role-based access, multi-factor authentication and encrypted, offline backups with restore tests, and trained staff on phishing and secure file sharing. We worked during low-activity periods so that design schedules were not disrupted, and documented every change for the IT team to maintain afterwards.",
      outcome:
        "Access to sensitive designs was restricted to the right teams, backups were proven restorable, and the shipyard could answer client security questionnaires confidently. A simple incident response plan was written and rehearsed, so staff knew exactly what to do if they suspected an attack.",
      learning: "Basic controls dramatically reduced risk without slowing design work.",
      verified: true,
    },
    {
      slug: "ship-recycling-worker-welfare",
      title: "Worker welfare research in the ship recycling industry",
      client: "A ship recycling industry association",
      region: "Gujarat",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Government research"],
      methods: ["Worker survey", "In-depth interviews"],
      scope: "1,000 workers, 30 interviews",
      timeline: "8 weeks",
      challenge:
        "The association wanted to improve worker welfare and safety, and needed reliable information on working conditions, health and living standards. Previous inspections had relied on yard owners’ records, which said little about how workers themselves experienced their jobs.",
      approach:
        "Interviewers speaking workers’ home languages surveyed workers away from worksites about training, protective equipment, health, accommodation and wages, with careful consent and confidentiality. Field teams included interviewers from workers’ home states, and responses were stored without names so that no individual could be identified by employers.",
      outcome:
        "Accommodation and access to healthcare were the most urgent concerns, alongside inconsistent training. The association supported improved housing standards, health camps and standardised training for all yards. A follow-up survey was planned after two years to measure whether conditions had improved, with results shared with workers’ representatives as well as yard owners.",
      learning: "Interviewing workers away from worksites encouraged honest answers.",
      verified: true,
    },
  ],
  SHIPBUILDING_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: SHIPBUILDING_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  SOFTWARE_CASES = [
    {
      slug: "saas-product-market-fit-research",
      title: "Testing product-market fit before scaling a SaaS product",
      client: "A B2B SaaS start-up",
      region: "United States, United Kingdom & Australia",
      markets: ["US", "UK", "AU"],
      services: ["Qualitative research", "Business panel", "Research consultancy"],
      methods: ["Customer and prospect interviews", "Product-market fit survey"],
      scope: "35 interviews, 400 survey responses",
      timeline: "7 weeks",
      challenge:
        "The start-up had paying customers in three countries and investors pushing it to scale marketing. Founders were unsure whether the product truly solved a painful problem for a clear segment, or whether early customers were simply enthusiastic adopters. Scaling too early would burn cash quickly.",
      approach:
        "We interviewed active customers, churned customers and prospects who had chosen competitors, exploring the problems they were solving, alternatives they had considered and what they would miss if the product disappeared. A survey of verified professionals in target roles then measured how widespread the problem was and how strongly each segment needed a solution, including the widely used question of how disappointed users would be without the product.",
      outcome:
        "One segment, operations teams at mid-sized logistics companies, showed strong need and clear willingness to pay, while others were lukewarm. The start-up narrowed its positioning, rebuilt onboarding for that segment and delayed broad marketing until retention improved. Investors supported the focused plan because it was backed by evidence.",
      learning: "Talking to churned customers and lost prospects revealed the truth that happy customers could not.",
      verified: true,
    },
    {
      slug: "software-pricing-conjoint-study",
      title: "Redesigning pricing tiers for a project management tool",
      client: "A project management software company",
      region: "United Kingdom, Germany & France",
      markets: ["UK", "DE", "FR"],
      services: ["Quantitative research", "Business panel", "Financial modelling"],
      methods: ["Online survey with conjoint analysis", "Revenue simulation"],
      scope: "1,200 team leads and buyers",
      timeline: "8 weeks",
      challenge:
        "The company’s pricing had grown complicated over time, with many add-ons and confusing tiers. Sales teams spent time explaining prices, and trial users often left at the pricing page. Leadership wanted a simpler structure that would not reduce revenue.",
      approach:
        "We surveyed team leads and software buyers in three countries, using a conjoint exercise in English, German and French to measure how they traded off features, user limits and prices. Our finance team simulated revenue and uptake for alternative tier designs using the results and the company’s customer data.",
      outcome:
        "Buyers valued integrations and reporting far more than storage limits, and preferred three simple tiers. The company launched a simplified structure, and early results showed more trials converting at the pricing page without revenue loss per customer. Upgrade rates from the entry tier improved in the following quarters.",
      learning: "Simpler pricing removed friction without giving value away.",
      verified: true,
    },
    {
      slug: "software-ux-research-onboarding",
      title: "Improving onboarding for an accounting software product",
      client: "A small business accounting software company",
      region: "India & Malaysia",
      markets: ["IN", "MY"],
      services: ["UI/UX design", "Qualitative research", "Digital analytics & reporting"],
      methods: ["Usability testing", "Funnel analysis", "Redesign and A/B testing"],
      scope: "30 usability sessions, onboarding funnel data",
      timeline: "3 months",
      challenge:
        "Many small business owners signed up for a free trial but never created their first invoice, and trial conversion was lower than competitors. Support teams also reported that many new users called for help with setup, adding cost before customers had paid anything.",
      approach:
        "We analysed onboarding funnel data to find drop-off points, then watched owners in India and Malaysia set up the product for the first time. Insights shaped a redesigned onboarding flow focused on creating a first invoice quickly, tested against the existing flow. Sessions were held with owners of shops, service businesses and small manufacturers in both countries, in English, Hindi and Malay, so the redesign reflected real variety.",
      outcome:
        "The redesigned flow helped more trial users reach their first invoice, and trial-to-paid conversion improved. Support requests during setup also fell. The product team now runs a short usability test before every major release.",
      learning: "Getting users to their first moment of value mattered more than showing every feature.",
      verified: true,
    },
    {
      slug: "software-churn-driver-study",
      title: "Finding out why customers cancel a subscription",
      client: "A marketing software company",
      region: "United States & Canada",
      markets: ["US", "CA"],
      services: ["Qualitative research", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Exit interviews", "Churn survey", "Usage data analysis"],
      scope: "40 interviews, 600 survey responses",
      timeline: "8 weeks",
      challenge:
        "Monthly churn was eroding growth, and cancellation forms only offered generic reasons such as “too expensive.” The company’s growth targets depended on reducing churn, but teams disagreed about whether price, product gaps or onboarding was the real cause.",
      approach:
        "We interviewed recently cancelled customers, surveyed a larger group and combined the findings with product usage data to see which behaviours predicted cancellation. Interviews were held within a few weeks of cancellation, while experiences were fresh, and the survey reached a broader group of customers who had left in the past year. We then compared the behaviour of customers who stayed with those who left during their first ninety days.",
      outcome:
        "Customers who never connected their email platform in the first month were far more likely to cancel. The company added guided integration help and proactive outreach, and churn among new customers declined. Customer success teams also used the early warning signals to contact at-risk accounts before they cancelled.",
      learning: "Usage patterns explained churn better than cancellation forms.",
      verified: true,
    },
    {
      slug: "hr-software-market-entry-gulf",
      title: "Assessing demand for HR software in the Gulf",
      client: "An HR and payroll software company",
      region: "UAE, Saudi Arabia & Qatar",
      markets: ["AE", "SA", "QA"],
      services: ["Research consultancy", "Business panel", "Qualitative research"],
      methods: ["HR leader interviews", "Competitor review"],
      scope: "35 interviews",
      timeline: "7 weeks",
      challenge:
        "The company wanted to expand into the Gulf but needed to understand local payroll, compliance and language requirements. Competitors included regional providers with strong local relationships, and the company had no presence on the ground.",
      approach:
        "We interviewed HR and finance leaders in Arabic and English about current systems, compliance needs and buying processes, and reviewed competing products. Interviews covered companies of different sizes and sectors, including those with large expatriate workforces, and explored how decisions were made between HR, finance and IT. We also reviewed local requirements around end-of-service benefits, wage protection and data residency.",
      outcome:
        "Arabic language support and local labour law compliance were essential. The company localised its product and partnered with a regional implementation firm. The company signed its first regional customers within a year, supported by the implementation partner and a localised product.",
      learning: "Local compliance requirements defined the entry strategy.",
      verified: true,
    },
    {
      slug: "software-company-seo-content-growth",
      title: "Growing organic sign-ups for a developer tool",
      client: "A developer tools company",
      region: "Global, with focus on the USA, Germany & Japan",
      markets: ["US", "DE", "JP"],
      services: ["SEO services", "Content marketing", "Video marketing"],
      methods: ["Technical tutorials", "Comparison pages", "Localised content"],
      scope: "Website and documentation",
      timeline: "9 months",
      challenge:
        "The company relied on paid ads for sign-ups, and developers rarely found it through search. Paid acquisition costs were rising, and the company needed a more sustainable source of new users. Paid acquisition costs had risen sharply, and the company needed a more sustainable source of sign-ups.",
      approach:
        "We built tutorials and comparison pages around problems developers searched for, improved documentation structure, and localised top content into German and Japanese. Content was planned around search data and questions from developer forums, and every tutorial included working code. We also fixed technical issues such as slow documentation pages and duplicate content. Each article was reviewed by the company’s engineers for accuracy and included working code examples.",
      outcome:
        "Organic sign-ups grew steadily, reducing dependence on paid advertising. Several tutorials became top results for important searches, and developers began linking to them from their own blogs and forums.",
      learning: "Developers trusted practical tutorials more than marketing pages.",
      verified: true,
    },
    {
      slug: "custom-software-logistics-platform",
      title: "Building a dispatch platform for a logistics company",
      client: "A regional logistics company",
      region: "South Africa",
      markets: ["ZA"],
      services: ["Web application development", "Mobile app development", "Cloud & DevOps services"],
      methods: ["Process mapping", "Dispatch web app", "Driver app"],
      scope: "400 vehicles",
      timeline: "7 months",
      challenge:
        "Dispatch relied on phone calls and spreadsheets, and customers had no visibility of deliveries. Customers were calling repeatedly to ask where their deliveries were, tying up dispatch staff. Dispatchers planned routes on whiteboards and phoned drivers for updates, so customers called constantly to ask where their deliveries were.",
      approach:
        "We built a web dispatch platform and a driver app with proof of delivery and live tracking, hosted on a scalable cloud setup. We spent time with dispatchers and drivers to understand their routines, built the driver app to work offline on rural routes, and integrated the platform with the company’s billing system. The driver app worked offline in areas with poor coverage and synchronised when connectivity returned.",
      outcome:
        "Dispatchers handled more deliveries per shift, and customers received tracking links automatically. Customer calls about delivery status fell, and management could see delivery performance by route and driver for the first time.",
      learning: "Designing with dispatchers made the platform fit daily work.",
      verified: true,
    },
    {
      slug: "software-qa-test-automation",
      title: "Reducing release problems with test automation",
      client: "A healthcare software company",
      region: "India & United Kingdom",
      markets: ["IN", "UK"],
      services: ["Software testing & QA", "Cloud & DevOps services", "Custom software development"],
      methods: ["Test strategy", "Automated regression suite", "CI pipeline"],
      scope: "Web platform with 200 screens",
      timeline: "5 months",
      challenge:
        "Releases frequently broke existing features, and clients complained after updates. Clients in the NHS and private healthcare were losing patience, and one major client had threatened to review its contract. Each release introduced new bugs, and a major client had threatened to leave after repeated problems in production.",
      approach:
        "We defined critical journeys, automated regression tests and integrated them into the release pipeline. We worked with product owners to identify the journeys that mattered most to clinicians and administrators, automated those first, and ran the suite on every code change. Manual exploratory testing continued for new features. Tests ran automatically on every code change, and a short release checklist was agreed with the client.",
      outcome:
        "Post-release defects fell sharply, and the company moved to more frequent, predictable releases. The at-risk client renewed its contract after seeing the improvement in release quality. Developers also gained confidence to refactor older parts of the code.",
      learning: "Automated tests made speed and quality possible together.",
      verified: true,
    },
    {
      slug: "software-reseller-channel-research",
      title: "Understanding software resellers in South-East Asia",
      client: "A business software vendor",
      region: "Malaysia, Indonesia & Taiwan",
      markets: ["MY", "ID", "TW"],
      services: ["Business panel", "Qualitative research", "Reporting & insights"],
      methods: ["Reseller interviews", "Partner survey"],
      scope: "40 interviews, 150 survey responses",
      timeline: "7 weeks",
      challenge:
        "The vendor sold through resellers but had low engagement from many partners. Some resellers were actively promoting competing products, and the vendor did not know why. The vendor depended on resellers for most sales in the region, but reseller performance varied widely and some partners had become inactive.",
      approach:
        "We interviewed and surveyed resellers about margins, training, lead sharing and support. Interviews were conducted in Malay, Bahasa Indonesia, Mandarin and English with resellers of different sizes, and the survey measured satisfaction with each part of the partner programme. We also reviewed partner programme terms against competitors’ offers to see where the vendor fell behind.",
      outcome:
        "Resellers wanted qualified leads and faster technical support. The vendor launched a partner portal with lead distribution. Reseller-sourced revenue grew in the following year, and several dormant partners became active again. Partner satisfaction improved in the next survey, and several inactive resellers returned to active selling.",
      learning: "Partners invested effort where vendors invested in them.",
      verified: true,
    },
    {
      slug: "software-startup-due-diligence",
      title: "Preparing a software company for investor due diligence",
      client: "A SaaS company",
      region: "India, with customers in the USA",
      markets: ["IN", "US"],
      services: ["Due diligence & financial analysis", "Financial modelling", "Virtual CFO services"],
      methods: ["Vendor due diligence", "SaaS metrics review"],
      scope: "Three years of financial and customer data",
      timeline: "2 months",
      challenge:
        "Investors requested detailed SaaS metrics and clean financials, and the company’s data was inconsistent. The founders feared that inconsistencies could delay the round or reduce the valuation. Investors had asked for detailed metrics, but billing, CRM and accounting data told different stories.",
      approach:
        "We reconciled revenue, standardised metrics such as recurring revenue and churn, and prepared a data room and due diligence report. We reconciled billing data with accounts, cohort by cohort, documented metric definitions and prepared answers to common investor questions about retention and unit economics. We documented every metric definition so investors could see exactly how figures were calculated.",
      outcome:
        "Due diligence proceeded smoothly, and the company closed its funding round on schedule. The same metrics framework was adopted for monthly board reporting after the round. Investors noted the clarity of the metrics in their final memo.",
      learning: "Consistent metrics built investor confidence.",
      verified: true,
    },
  ],
  SOFTWARE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: SOFTWARE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  STEEL_CASES = [
    {
      slug: "tmt-bar-retail-buyer-study",
      title: "How individual homebuilders choose TMT steel bars",
      client: "A steel producer with a retail TMT brand",
      region: "Semi-urban markets in Bihar, Uttar Pradesh & Madhya Pradesh",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Homebuilder survey at sites", "Dealer and mason interviews"],
      scope: "1,400 homebuilders, 300 dealers and masons",
      timeline: "8 weeks",
      challenge:
        "The producer had a strong reputation with large contractors but struggled in the retail market, where families building their own homes bought a few tonnes at a time. Local brands were winning on price and familiarity, and the company did not know how much its quality message mattered to these buyers.",
      approach:
        "Our interviewers met families at construction sites, often during the foundation and column stages when steel is bought. They asked who chose the brand, what reassured them about quality and how they compared prices. We also spoke with dealers and masons, because early conversations made it clear that many families relied on them. Interviews were conducted in Hindi and Bhojpuri, and every site visit was GPS-tagged.",
      outcome:
        "Families wanted reassurance that their home would be safe, but they could not judge steel quality themselves, so they trusted the dealer’s or mason’s advice. Price mattered most when nobody explained the difference. The producer trained dealers and masons to explain quality simply, introduced a site-visit service for homebuilders and printed easy-to-check markings on bars.",
      learning:
        "When buyers cannot judge quality, they borrow trust from someone who can. Winning that person over mattered more than advertising.",
      verified: true,
    },
    {
      slug: "steel-fabricator-satisfaction-programme",
      title: "Building a satisfaction programme for steel fabricators",
      client: "A flat steel producer",
      region: "India",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection (CATI)", "Data analytics & dashboards"],
      methods: ["Telephone survey of fabricators and processors", "Half-yearly dashboard"],
      scope: "700 fabricators and service centres per wave",
      timeline: "Half-yearly programme",
      challenge:
        "Fabricators and steel service centres were a large and growing customer group, but the producer only heard from them when something went wrong. The commercial team suspected that delivery reliability and coil quality issues were costing business, but had no structured evidence to prioritise improvements.",
      approach:
        "We designed a half-yearly telephone survey covering ordering, delivery lead times, dimensional accuracy, surface quality, claims handling and technical support, with open questions about recent experiences. Interviews were scheduled around fabricators’ working hours, in Hindi, English and regional languages. Results were shown on a dashboard by region, product and distributor, with comparison over time.",
      outcome:
        "Fabricators rated product quality well but were frustrated by inconsistent delivery dates and slow claim settlements. The producer introduced delivery date commitments with SMS updates and a 15-day target for claim resolution, then tracked both measures in later waves. Regional teams now review their dashboard results every six months.",
      learning: "A regular, consistent survey turned scattered complaints into a short list of fixable priorities.",
      verified: true,
    },
    {
      slug: "steel-plant-community-csr-evaluation",
      title: "Evaluating community programmes around an integrated steel plant",
      client: "An integrated steel company’s CSR foundation",
      region: "Odisha & Jharkhand",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Household survey", "Village group discussions", "Programme record review"],
      scope: "2,400 households in 40 villages",
      timeline: "11 weeks",
      challenge:
        "The foundation ran education, health, livelihood and water programmes in villages around the plant. Board members wanted independent evidence of which programmes made a real difference to families, rather than activity counts such as the number of camps held.",
      approach:
        "We surveyed households in programme villages and comparable villages farther away, covering school attendance, health service use, income sources and water access. Group discussions with women, youth and elders explored how programmes were experienced and what communities wanted next. Interviewers were recruited locally and trained to speak in Odia, Santali, Ho and Hindi as needed.",
      outcome:
        "The water and girls’ education programmes showed clear benefits, while the livelihood programme had low participation because training did not match local job opportunities. The foundation redesigned livelihood support around skills that local employers needed and expanded water projects to more villages.",
      learning:
        "Comparing programme and non-programme villages, and listening to residents, gave a fair picture of what worked.",
      verified: true,
    },
    {
      slug: "steel-distributor-erp-rollout",
      title: "Replacing spreadsheets with an ERP for a steel stockist",
      client: "A large steel stockist and distributor",
      region: "Delhi NCR & Punjab",
      markets: ["IN"],
      services: ["ERP development", "API development & integration", "Accounting & finance consulting"],
      methods: ["Process mapping", "Phased ERP implementation", "Weighbridge integration"],
      scope: "Four yards, 60 users",
      timeline: "6 months",
      challenge:
        "The stockist handled thousands of tonnes a month across four yards, with stock tracked in spreadsheets and weighbridge slips. Stock mismatches, delayed invoicing and difficult GST reconciliations were common, and the owners could not see profitability by product or customer.",
      approach:
        "We mapped processes from purchase to dispatch with yard managers and accounts staff, then implemented an ERP in phases: inventory and finance first, then sales and dispatch. Weighbridge readings were integrated directly so that weights flowed into invoices without re-typing. Key users at each yard were trained and supported during the first weeks.",
      outcome:
        "Stock records began to match physical stock, invoices went out the same day as dispatch, and GST reconciliation became a routine monthly task. For the first time, the owners could see margins by product and customer, which led them to revise pricing for several low-margin accounts.",
      learning: "Connecting the weighbridge removed the single biggest source of errors in the business.",
      verified: true,
    },
    {
      slug: "steel-brand-perception-architects",
      title: "Understanding how architects and engineers see steel brands",
      client: "A structural steel producer",
      region: "London, Dubai, Riyadh & Sydney",
      markets: ["UK", "AE", "SA", "AU"],
      services: ["Qualitative research", "Business panel", "Content marketing"],
      methods: ["In-depth interviews with architects and structural engineers"],
      scope: "45 interviews",
      timeline: "7 weeks",
      challenge:
        "The producer wanted to grow in commercial and institutional buildings, where architects and structural consultants specify materials. It suspected that its brand was seen as a commodity supplier rather than a partner for complex projects.",
      approach:
        "We interviewed architects, structural engineers and project management consultants about how they chose steel products, what information they needed at each design stage and how they viewed different producers. Interviews were conducted at their offices or by video, with sample technical documents used to prompt discussion.",
      outcome:
        "Consultants respected the producer’s quality but found its technical information hard to access and rarely received design support. The producer created a technical resource library with design guides and CAD details, and set up a small team to support consultants during design. Six months later, consultants on two large institutional projects asked the team for design input early, something that had rarely happened before.",
      learning: "Being useful early in design changed the producer from a commodity supplier into a specified brand.",
      verified: true,
    },
    {
      slug: "steel-plant-safety-perception-survey",
      title: "Measuring safety perceptions among contract workers in a steel plant",
      client: "A steel manufacturer",
      region: "Chhattisgarh",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous tablet survey", "Small group discussions"],
      scope: "1,800 permanent and contract workers",
      timeline: "7 weeks",
      challenge:
        "The plant had strong safety systems on paper, but serious incidents still involved contract workers more often than permanent staff. Leadership wanted to understand how contract workers experienced safety on the shop floor.",
      approach:
        "We ran an anonymous survey on tablets in Hindi and Chhattisgarhi across all shifts, covering training, equipment, supervision, reporting and pressure to finish work. Small group discussions held away from supervisors explored the reasons behind the answers. Supervisors were briefed but not present during any session, and results were reported only for groups of ten or more so that no individual could be identified.",
      outcome:
        "Contract workers received less practical training and were reluctant to report near misses for fear of losing work. The company introduced standard safety induction for all contractors, a no-blame reporting line and contractor representation in safety committees. A repeat survey a year later was planned to check whether contract workers felt the change on the ground.",
      learning: "Anonymity and independence were essential for contract workers to speak openly.",
      verified: true,
    },
    {
      slug: "steel-export-market-assessment",
      title: "Assessing export markets for value-added steel products",
      client: "A mid-sized steel products manufacturer",
      region: "UAE, Saudi Arabia, Qatar, Egypt, South Africa, Malaysia & Indonesia",
      markets: ["AE", "SA", "QA", "EG", "ZA", "MY", "ID"],
      services: ["Research consultancy", "Business panel", "Financial modelling"],
      methods: ["Desk research", "Importer and distributor interviews", "Market scoring model"],
      scope: "35 interviews across seven countries",
      timeline: "9 weeks",
      challenge:
        "Domestic competition was squeezing margins, and the manufacturer wanted to export coated and pre-engineered products. It needed to know which countries offered realistic opportunities, given trade rules, competition and logistics.",
      approach:
        "We combined trade data and regulatory research with interviews with importers, distributors and construction contractors in each country. Each market was scored on demand, competition, price levels, certification requirements and logistics, with the scoring logic shared openly. Where data was thin, we said so openly and marked those scores as indicative, so leadership knew which conclusions were firm and which needed testing.",
      outcome:
        "Two Gulf markets and South Africa offered the best combination of demand and feasibility. The manufacturer prioritised product certification for those markets and appointed distributors there first. The remaining markets were kept on a watch list with clear triggers for revisiting them, such as changes in duties or the arrival of new infrastructure projects.",
      learning: "A transparent scoring model helped the leadership team agree on priorities quickly.",
      verified: true,
    },
    {
      slug: "steel-dealer-loyalty-app",
      title: "A loyalty app for steel dealers and masons",
      client: "A TMT steel brand",
      region: "Eastern and Central India",
      markets: ["IN"],
      services: ["Mobile app development", "WhatsApp marketing", "Data analytics & dashboards"],
      methods: ["Dealer and mason interviews", "Loyalty app", "Programme dashboard"],
      scope: "2,000 dealers and 15,000 masons",
      timeline: "5 months",
      challenge:
        "The brand ran loyalty schemes on paper coupons that were slow to process and open to misuse. Dealers and masons complained about delayed rewards, and the brand had no data on who was actually recommending its products.",
      approach:
        "We interviewed dealers and masons about how they used schemes and phones, then built a simple Hindi and English app with QR scanning of bar tags, instant points and UPI-based rewards. Masons with basic phones could participate through WhatsApp. A dashboard showed scheme activity by region. Before launch, we piloted the app with dealers in two districts and simplified the scanning flow after watching masons use it on dusty, crowded sites.",
      outcome:
        "Rewards reached participants within days instead of months, misuse fell because each tag could be scanned only once, and the brand gained a clear view of active masons and dealers by region for the first time.",
      learning: "Supporting WhatsApp alongside the app ensured masons with basic phones were not left out.",
      verified: true,
    },
    {
      slug: "steel-company-working-capital",
      title: "Freeing working capital in a steel processing business",
      client: "A steel processing and service centre",
      region: "Maharashtra",
      markets: ["IN"],
      services: ["Virtual CFO services", "Budgeting & financial forecasting", "MIS & financial reporting"],
      methods: ["Working capital review", "Cash forecasting", "Monthly MIS"],
      scope: "Annual turnover in the mid-hundreds of crores",
      timeline: "9-month engagement",
      challenge:
        "The business was profitable but always short of cash. Inventory had grown faster than sales, customers were paying later every year, and bank limits were fully used. The owners were considering more borrowing to fund growth.",
      approach:
        "Our virtual CFO analysed inventory by grade and age, customer payment patterns and supplier terms, then introduced a 13-week rolling cash forecast and a monthly MIS. We worked with the sales team on credit limits for slow-paying customers and with purchasing on stock levels for slow-moving grades.",
      outcome:
        "Slow-moving inventory was reduced, overdue receivables came down, and the business funded its next phase of growth largely from released cash rather than new borrowing. Monthly reviews now track inventory and receivable days alongside profit. The bank, seeing tighter controls and reliable forecasts, also agreed to review the company’s limits on better terms at its next renewal.",
      learning: "Working capital discipline was cheaper than any loan.",
      verified: true,
    },
    {
      slug: "steel-b2b-digital-lead-generation",
      title: "Generating B2B enquiries for pre-engineered steel buildings",
      client: "A pre-engineered buildings manufacturer",
      region: "India & the GCC",
      markets: ["IN", "AE", "SA", "QA"],
      services: ["B2B digital marketing", "SEO services", "Landing page & CRO"],
      methods: ["Application-focused content", "Search campaigns", "Enquiry qualification"],
      scope: "Website and campaigns for warehouses, factories and cold storage",
      timeline: "8 months",
      challenge:
        "Most enquiries came from personal networks, and the website generated few qualified leads. Prospects searching for warehouse or factory buildings rarely found the company online.",
      approach:
        "We rebuilt the website around building types and industries, added project galleries and cost-planning guides, and launched search campaigns for specific needs such as warehouse construction. Enquiry forms asked for building size, location and timeline so sales could prioritise. We also connected website enquiries to the CRM so that each lead carried its source, building type and expected timeline from the first contact.",
      outcome:
        "Qualified enquiries from new regions grew steadily, and the sales team spent less time on unsuitable leads. Cost-planning guides became a popular resource that prospects shared with their finance teams. Over time, reporting showed which building types and regions produced the most valuable projects, and marketing budgets shifted towards them.",
      learning: "Content that helped buyers plan budgets brought serious prospects forward.",
      verified: true,
    },
  ],
  STEEL_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: STEEL_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  TELECOMMUNICATIONS_CASES = [
    {
      slug: "mobile-network-experience-study",
      title: "Measuring mobile network experience from the customer’s side",
      client: "A mobile network operator",
      region: "India: 40 cities and their rural surroundings",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CATI & CAPI)", "Data analytics & dashboards"],
      methods: ["Customer survey", "Drive-test comparison", "Circle-level dashboard"],
      scope: "12,000 subscribers per wave",
      timeline: "Quarterly programme",
      challenge:
        "The operator’s engineering data showed improving coverage and speeds, yet customer complaints and churn were not falling. Leadership wanted to understand how customers actually experienced the network, where it fell short and whether perception matched technical performance.",
      approach:
        "We surveyed prepaid and postpaid subscribers by telephone and in person, covering call drops, data speeds at home and work, indoor coverage, video streaming and recharge experiences, with quotas by circle, city tier and handset type. Survey results were compared with the operator’s drive-test and network data at a locality level, and differences were mapped on a dashboard for regional teams.",
      outcome:
        "Indoor coverage in residential buildings and evening data speeds were the biggest sources of dissatisfaction, problems that outdoor drive tests rarely captured. The operator prioritised small cells and indoor solutions in high-complaint localities and began using perception scores alongside technical metrics in regional reviews.",
      learning: "Customer perception revealed problems that engineering measurements missed.",
      verified: true,
    },
    {
      slug: "telecom-churn-driver-research-europe",
      title: "Why mobile customers switch operators",
      client: "A mobile operator",
      region: "Italy & Spain",
      markets: ["IT", "ES"],
      services: ["Quantitative research", "Qualitative research", "Data analytics & dashboards"],
      methods: ["Survey of recent switchers", "Interviews", "Churn model inputs"],
      scope: "2,000 switchers and stayers, 30 interviews",
      timeline: "8 weeks",
      challenge:
        "Low-cost competitors had increased churn sharply, and the operator’s retention offers were expensive and not always effective. It wanted to understand which customers were at risk and what would keep them.",
      approach:
        "We surveyed customers who had recently switched to or from the operator, and others who had stayed, in Italian and Spanish, covering price, network, service, bundles and the switching process. Interviews with switchers explored the moment they decided to leave. Findings were combined with the operator’s customer data to identify early warning signs.",
      outcome:
        "Customers who had a poor experience with customer service in the months before contract renewal were most likely to leave, regardless of price. The operator introduced proactive service checks before renewal and targeted retention offers more precisely. Churn in the targeted segments fell over the following quarters.",
      learning: "Service failures set up switching long before the price comparison.",
      verified: true,
    },
    {
      slug: "telecom-retail-store-mystery-shopping",
      title: "Mystery shopping telecom retail stores",
      client: "A telecom operator",
      region: "Malaysia & Indonesia",
      markets: ["MY", "ID"],
      services: ["Offline data collection", "Reporting & insights", "Data analytics & dashboards"],
      methods: ["Mystery shopping visits", "Store scorecards"],
      scope: "500 stores per wave",
      timeline: "Quarterly programme",
      challenge:
        "The operator wanted consistent sales and service standards across company-owned and franchise stores. Customer complaints suggested that some stores pushed expensive plans without understanding needs, while others were slow to resolve problems.",
      approach:
        "Mystery shoppers visited stores to ask about plans, devices and problems, scoring greeting, needs discovery, product explanation and follow-up in Malay, Bahasa Indonesia and English. Each visit followed one of several scenarios, such as a family looking for a shared plan or a customer with a billing problem, and shoppers recorded waiting times, explanations and whether staff checked their needs. A share of visits was repeated by a second shopper to check scoring consistency.",
      outcome:
        "Franchise stores scored lower on needs discovery. The operator introduced franchise training and linked part of franchise incentives to scores. Scores improved across the network over the following quarters, and complaint rates about misleading sales fell in stores that completed the training.",
      learning: "Consistent measurement brought franchise stores up to company standards.",
      verified: true,
    },
    {
      slug: "enterprise-connectivity-buyer-research",
      title: "How businesses choose connectivity and cloud communication providers",
      client: "A business telecom provider",
      region: "United Kingdom & Germany",
      markets: ["UK", "DE"],
      services: ["Business panel", "Qualitative research", "B2B digital marketing"],
      methods: ["IT manager interviews", "B2B survey"],
      scope: "25 interviews, 350 survey responses",
      timeline: "7 weeks",
      challenge:
        "The provider wanted to grow its share of mid-sized business connectivity and cloud phone contracts. Larger competitors dominated the segment, and the provider’s sales team struggled to explain why it should be chosen. The provider was losing mid-sized business customers to competitors despite competitive pricing.",
      approach:
        "We interviewed and surveyed IT managers about requirements, provider selection, contract terms and service expectations. Interviews covered IT managers at firms with 50 to 1,000 employees in English and German, and the survey measured how buyers ranked price, installation time, uptime guarantees, support and contract flexibility. Interviews were conducted in English and German, and the survey compared expectations with the provider’s actual performance.",
      outcome:
        "Installation speed and a single support contact mattered most. The provider introduced guaranteed installation timelines and dedicated account support. Win rates in the mid-sized segment improved, and the provider used customer quotes about fast installation in its marketing.",
      learning: "Simplicity and speed won business customers.",
      verified: true,
    },
    {
      slug: "telecom-tower-community-perception",
      title: "Addressing community concerns about mobile towers",
      client: "A telecom infrastructure company",
      region: "India & South Africa",
      markets: ["IN", "ZA"],
      services: ["Quantitative research", "Qualitative research", "Content marketing"],
      methods: ["Resident survey", "Community discussions", "Information materials"],
      scope: "2,000 residents",
      timeline: "8 weeks",
      challenge:
        "Community objections were delaying new tower sites, often driven by health fears. Some sites had been delayed for months, and protests had spread through social media and local meetings. New tower sites were delayed by local objections, often driven by health concerns and misinformation shared on social media.",
      approach:
        "We surveyed residents near proposed sites about concerns and trusted information sources, and tested information materials. Surveys were conducted in local languages, including Hindi, Zulu and Xhosa, and asked residents which sources they trusted, from local doctors to government agencies. Information materials were tested in small groups before being used more widely. We also interviewed local leaders and site owners about how consultation could be improved.",
      outcome:
        "Clear information from health authorities reduced concern. The company adopted community information sessions before construction. Delays at new sites shortened where information sessions were held, and local leaders helped share accurate information with residents.",
      learning: "Trusted sources mattered more than technical arguments.",
      verified: true,
    },
    {
      slug: "telecom-customer-service-chatbot",
      title: "A digital assistant for telecom customer service",
      client: "A mobile operator",
      region: "Saudi Arabia & UAE",
      markets: ["SA", "AE"],
      services: ["AI & automation solutions", "WhatsApp marketing", "API development & integration"],
      methods: ["Contact analysis", "Arabic and English assistant"],
      scope: "App, website and WhatsApp channels",
      timeline: "5 months",
      challenge:
        "Call centres handled millions of routine queries about balances, bundles and bills. Waiting times at peak periods were long, and customers often called several times about the same issue.",
      approach:
        "We built an Arabic and English assistant connected to billing and bundle systems, handing complex cases to agents. We analysed contact reasons and transcripts, designed conversations in Gulf Arabic and English, and connected the assistant to systems so it could show balances, activate bundles and explain bills securely. Complex or sensitive cases were passed to agents with the full conversation history.",
      outcome:
        "Routine queries shifted to digital channels, reducing call volumes. Customer satisfaction with digital channels rose, and agents had more time for complex issues such as roaming disputes and device faults. The operator later extended the assistant to WhatsApp.",
      learning: "Bilingual design was essential for adoption.",
      verified: true,
    },
    {
      slug: "telecom-dealer-retailer-network",
      title: "Understanding recharge retailers in smaller towns",
      client: "A mobile operator",
      region: "Uttar Pradesh, Bihar & West Bengal",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection (CAPI)", "Data analytics & dashboards"],
      methods: ["Retailer interviews", "Distribution mapping"],
      scope: "3,000 retailers",
      timeline: "8 weeks",
      challenge:
        "Recharge and SIM sales depended on small retailers, and the operator wanted to know what drove their loyalty. Competitors were gaining share in smaller towns, where small shops sold most prepaid recharges and new SIM cards. Small retailers sold most prepaid recharges in these regions, but the operator had little visibility of their experience.",
      approach:
        "We interviewed retailers about margins, stock availability, distributor visits and competitor schemes, and mapped coverage. Interviewers visited retailers in towns and large villages, speaking Hindi and Bengali, and recorded shop locations so coverage gaps could be mapped. Questions explored commissions, payment timing, stock availability and how often distributor staff visited. We also mapped retailer locations to identify villages and towns with weak coverage.",
      outcome:
        "Irregular distributor visits caused stock-outs. The operator tightened visit schedules. Stock-outs fell in the following months, and retailer loyalty scores improved in districts where visit schedules were enforced. The operator also added digital recharge options for retailers to reduce dependence on physical stock.",
      learning: "Distribution reliability drove retailer loyalty.",
      verified: true,
    },
    {
      slug: "telecom-5g-adoption-study",
      title: "Understanding consumer interest in 5G plans",
      client: "A telecom operator",
      region: "Japan, Taiwan & Hong Kong",
      markets: ["JP", "TW", "HK"],
      services: ["Consumer panel", "Quantitative research", "Research consultancy"],
      methods: ["Online survey", "Price testing"],
      scope: "3,000 smartphone users",
      timeline: "6 weeks",
      challenge:
        "The operator wanted to know which customers would pay more for 5G plans. 5G plans were priced higher than 4G plans, and early uptake was lower than expected despite strong network investment. The operator had invested heavily in 5G networks, but take-up of 5G plans was slower than expected.",
      approach:
        "We surveyed users in Japanese, Mandarin and Cantonese about usage, awareness and willingness to pay. The survey covered smartphone users with 5G-capable devices and those planning to upgrade, with quotas by age and usage, and tested willingness to pay at several price points using a structured price sensitivity method. Results were analysed separately for each market, since pricing and device penetration differed.",
      outcome:
        "Heavy video and gaming users valued 5G most. The operator targeted plans at those segments. Targeted plans with gaming and video benefits gained subscribers faster than the operator’s general 5G offer. The operator also adjusted messaging to focus on specific experiences rather than network speed.",
      learning: "Usage behaviour predicted willingness to pay.",
      verified: true,
    },
    {
      slug: "telecom-field-engineer-app",
      title: "A field app for fibre installation teams",
      client: "A fibre broadband provider",
      region: "Australia",
      markets: ["AU"],
      services: ["Mobile app development", "Custom business applications", "Data analytics & dashboards"],
      methods: ["Process mapping", "Field app"],
      scope: "500 technicians",
      timeline: "5 months",
      challenge:
        "Installation appointments were often missed, and technicians lacked job information. Customers had to take time off work for installation appointments, so missed or late visits caused strong frustration and complaints. Technicians received job details by phone and text, often missing information, which led to repeat visits and frustrated customers.",
      approach:
        "We built a field app with job details, photos, customer updates and completion checklists. We interviewed technicians and dispatch staff, then built an app showing job details, access notes, photos of previous visits and checklists, with automatic SMS updates to customers when technicians were on their way. The app worked offline in new estates with limited coverage and synchronised photos when back online.",
      outcome:
        "Missed appointments fell, and customers received arrival notifications. First-visit completion rates improved, and repeat visits for incomplete installations declined. Customer complaints about installations dropped, and dispatchers could rebalance work during the day.",
      learning: "Better information for technicians improved customer experience.",
      verified: true,
    },
    {
      slug: "telecom-company-cost-reporting",
      title: "Cost reporting for a regional telecom infrastructure firm",
      client: "A telecom infrastructure company",
      region: "Maharashtra & Gujarat",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Data analytics & dashboards", "Virtual CFO services"],
      methods: ["Site-level costing", "Dashboards"],
      scope: "2,000 sites",
      timeline: "4 months",
      challenge:
        "Profitability by site was unclear, and energy costs were rising. Diesel generator costs at sites with unreliable grid power were rising quickly, and leases were up for renewal. Energy and rent costs varied widely between tower sites, but management saw only total costs by region.",
      approach:
        "We built site-level cost reports combining rent, energy and maintenance, with dashboards for management. We combined lease, energy and maintenance data from several systems into a site-level cost model, and created dashboards ranking sites by cost per tenant. Site engineers helped validate data where meters or lease records were incomplete.",
      outcome:
        "High-cost sites were identified for energy upgrades and renegotiation. Solar and battery upgrades at the highest-cost sites reduced diesel use, and lease negotiations were supported with clear cost data. Management now reviews site-level costs monthly and prioritises upgrades using the data.",
      learning: "Site-level data guided investment decisions.",
      verified: true,
    },
  ],
  TELECOMMUNICATIONS_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: TELECOMMUNICATIONS_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  TEXTILE_CASES = [
    {
      slug: "handloom-weaver-livelihood-study",
      title: "Understanding the livelihoods of handloom weavers",
      client: "A handloom development programme",
      region: "Uttar Pradesh, West Bengal & Andhra Pradesh",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Weaver household survey", "Cluster group discussions"],
      scope: "2,000 weaver households in 15 clusters",
      timeline: "10 weeks",
      challenge:
        "The programme supported weavers with loans, design training and market linkages, but many weavers were still leaving the craft. Officials needed to understand incomes, dependence on master weavers and the reasons young people were not continuing the tradition.",
      approach:
        "Interviewers visited weaver households in each cluster, recording income from weaving and other work, raw material access, payment arrangements with master weavers and family members’ involvement. Group discussions with women weavers and young people explored aspirations and frustrations. Interviews were conducted in Hindi, Bengali and Telugu.",
      outcome:
        "Most weavers depended on master weavers for yarn and payment, earning a small share of final prices, while young people saw no future in the work. The programme expanded yarn banks, supported weaver cooperatives to sell directly and introduced design training linked to online marketplaces.",
      learning: "Value chain dependence, not skill, was the main reason weavers struggled.",
      verified: true,
    },
    {
      slug: "garment-exporter-buyer-feedback",
      title: "What international buyers want from Indian garment exporters",
      client: "A garment exporters’ association",
      region: "Buyers in the USA, UK, Germany, France, Italy & Spain",
      markets: ["IN", "US", "UK", "DE", "FR", "IT", "ES"],
      services: ["Business panel", "Qualitative research", "Online surveys"],
      methods: ["Sourcing manager interviews", "Online buyer survey"],
      scope: "28 interviews, 150 survey responses",
      timeline: "8 weeks",
      challenge:
        "Members were losing orders to competing sourcing countries but received little feedback from buyers. The association wanted to understand how buyers compared countries and where Indian exporters could improve.",
      approach:
        "We interviewed sourcing and compliance managers at brands and importers about lead times, quality, compliance, sustainability and communication, then surveyed a wider group to prioritise the issues. All responses were confidential. We also asked buyers to describe one recent sourcing decision in detail, which revealed how lead times, audit results and price were weighed against each other in practice.",
      outcome:
        "Buyers valued Indian design flexibility and small-order capability but worried about lead times and inconsistent sustainability documentation. The association launched a shared sustainability reporting framework and lead-time improvement workshops for members. Member exporters who adopted the framework reported smoother compliance conversations with buyers within the following season.",
      learning: "Buyers were candid when assured of confidentiality.",
      verified: true,
    },
    {
      slug: "textile-mill-worker-welfare",
      title: "Measuring worker welfare in spinning mills",
      client: "A textile manufacturer",
      region: "Tamil Nadu",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Anonymous worker survey", "Hostel visits", "Worker discussions"],
      scope: "1,500 workers across four mills",
      timeline: "8 weeks",
      challenge:
        "International buyers increasingly asked for evidence of fair working conditions, including for young women workers living in mill hostels. The manufacturer wanted an independent view of welfare and grievances.",
      approach:
        "Women researchers conducted anonymous surveys and discussions with workers, covering wages, hours, accommodation, safety, grievance mechanisms and freedom of movement, away from supervisors. Hostel facilities were assessed against a checklist. Sessions were held during break times in private rooms, and workers could choose to answer on tablets in Tamil, Hindi or Odia without anyone watching their screens.",
      outcome:
        "Workers were generally satisfied with wages but raised concerns about hostel curfews and the grievance process. The manufacturer revised hostel rules, set up an independent grievance helpline and shared results with buyers. A follow-up survey after a year was agreed with buyers to show whether the changes had made a difference to workers.",
      learning: "Same-gender researchers and private settings were essential for honest answers.",
      verified: true,
    },
    {
      slug: "fabric-preference-consumer-study",
      title: "How shoppers choose fabrics for ethnic wear",
      client: "A fabric brand",
      region: "Ten cities across India",
      markets: ["IN"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online survey", "In-store shopper interviews"],
      scope: "1,800 shoppers, 30 store interviews",
      timeline: "6 weeks",
      challenge:
        "The brand supplied fabrics to tailors and retailers and wanted to understand how women chose fabrics for salwar suits and sarees, including the role of feel, colour, price and brand.",
      approach:
        "We surveyed women who bought fabrics for ethnic wear through our consumer panel and interviewed shoppers in fabric stores about how they judged quality and what made them trust a store or brand. We showed shoppers real fabric swatches during store interviews, asking them to explain how they checked quality, which revealed habits that online answers could not capture.",
      outcome:
        "Shoppers judged fabric by touch and colour fastness and relied on shopkeepers’ advice, rarely asking about brands. The brand created in-store fabric guides and wash-fastness assurances for retailers to share. Retailers using the guides reported easier conversations with customers about why some fabrics cost more.",
      learning: "Supporting the retailer’s advice was more effective than building brand awareness directly.",
      verified: true,
    },
    {
      slug: "textile-cluster-digital-adoption",
      title: "Helping a textile cluster adopt digital tools",
      client: "A textile cluster association",
      region: "Surat, Gujarat",
      markets: ["IN"],
      services: ["IT consulting", "Custom business applications", "Qualitative research"],
      methods: ["Owner interviews", "Digital readiness assessment", "Pilot tools"],
      scope: "80 small units",
      timeline: "4 months",
      challenge:
        "Small weaving and processing units managed orders and payments on paper and phone calls. The association wanted to understand barriers to digital adoption and pilot practical tools.",
      approach:
        "We interviewed unit owners about their processes, technology use and concerns, assessed digital readiness and piloted a simple order and payment tracking tool in Gujarati with a small group of units. The pilot tool was designed with a few owners over several weeks, using WhatsApp-style screens and large buttons so that it felt familiar from the first day.",
      outcome:
        "Owners were willing to adopt tools that clearly saved time and reduced payment disputes. The pilot’s success encouraged the association to roll out the tool and offer training across the cluster. Owners using the tool reported fewer payment disputes with traders, and the association used their stories to encourage others to join.",
      learning: "Starting with one clear problem made digital adoption feel practical.",
      verified: true,
    },
    {
      slug: "textile-exporter-gst-refunds",
      title: "Recovering delayed GST refunds for a textile exporter",
      client: "A home textiles exporter",
      region: "Haryana",
      markets: ["IN"],
      services: ["GST services", "Accounting & bookkeeping", "Virtual CFO services"],
      methods: ["Refund review", "Documentation clean-up", "Monthly routine"],
      scope: "Two years of export refunds",
      timeline: "5 months",
      challenge:
        "GST refunds on exports were delayed for many months because of documentation mismatches, tying up working capital and straining the business.",
      approach:
        "We reviewed past refund claims, reconciled shipping bills and invoices, corrected documentation issues and resubmitted claims. A monthly routine was set up to prepare refund documentation alongside exports. We worked closely with the exporter’s freight forwarder and bank to match shipping records, invoices and payment receipts, resolving each mismatch at the source rather than patching it later.",
      outcome:
        "Pending refunds were processed after corrections, improving cash flow, and new refunds were filed accurately and on time. The finance team now reviews refund status every month, and the owners can see expected refund timings in their cash forecast instead of treating them as uncertain.",
      learning: "Clean documentation at the time of export prevented months of delay later.",
      verified: true,
    },
    {
      slug: "sustainable-textiles-consumer-perception",
      title: "Do European consumers pay more for sustainable clothing?",
      client: "A sustainable fashion and textiles brand selling in Europe",
      region: "Paris, Berlin, Zurich & Milan",
      markets: ["FR", "DE", "CH", "IT"],
      services: ["Consumer panel", "Quantitative research", "Social media marketing"],
      methods: ["Online survey with price tests", "Social listening"],
      scope: "1,500 urban apparel shoppers",
      timeline: "6 weeks",
      challenge:
        "The brand used organic cotton and natural dyes, but price-sensitive shoppers rarely chose it. It wanted to know who valued sustainability and how to communicate it credibly.",
      approach:
        "We surveyed apparel shoppers about values, purchase behaviour and willingness to pay at different price points, and analysed social conversations about sustainable fashion. Respondents also compared product descriptions with different emphasis, some focused on the environment and others on comfort and longevity, so we could see which framing actually moved purchase intent.",
      outcome:
        "Younger professionals valued durability and skin comfort more than environmental claims. The brand repositioned around comfort and longevity, with sustainability as supporting proof. Its product pages and social content were rewritten accordingly, with care guides showing how garments last longer, and certification details available for those who wanted them.",
      learning: "Personal benefits motivated purchases more than abstract claims.",
      verified: true,
    },
    {
      slug: "textile-machinery-dealer-study",
      title: "Understanding textile machinery buyers in small mills",
      client: "A textile machinery manufacturer",
      region: "Gujarat, Maharashtra & Tamil Nadu",
      markets: ["IN"],
      services: ["Business panel", "Quantitative research", "Offline data collection"],
      methods: ["Mill owner interviews", "Telephone survey"],
      scope: "400 small and mid-sized mills",
      timeline: "7 weeks",
      challenge:
        "The manufacturer wanted to understand how small mill owners decided to upgrade machinery and what held them back. Many mills were running machines more than fifteen years old, yet enquiries rarely turned into orders, and the sales team could not explain why.",
      approach:
        "We interviewed mill owners and production managers about machinery age, upgrade plans, financing, service expectations and supplier choice. Interviews were held at mills during working hours, so owners could show us their current machines and explain upgrade decisions in context. We also spoke with local lenders about equipment financing.",
      outcome:
        "Financing access and after-sales service availability were bigger barriers than machine price. The manufacturer partnered with lenders on equipment finance and expanded service coverage in key clusters. Sales teams were trained to discuss financing options early in conversations, and service engineers were placed closer to the largest clusters to shorten response times.",
      learning: "Removing financing barriers unlocked demand.",
      verified: true,
    },
    {
      slug: "handicraft-ecommerce-growth",
      title: "Taking a textile artisan collective online",
      client: "A textile artisan collective",
      region: "Rajasthan, with customers in the USA, UK & Australia",
      markets: ["IN", "US", "UK", "AU"],
      services: ["E-commerce development", "E-commerce marketing", "Video marketing"],
      methods: ["Online store", "Artisan stories", "Social campaigns"],
      scope: "Website, marketplace and social channels",
      timeline: "6 months",
      challenge:
        "The collective sold mainly through exhibitions and middlemen. It wanted to reach customers directly but lacked a store, photography and marketing. Artisans also had little control over pricing, and buyers rarely knew who had made the pieces they bought.",
      approach:
        "We built an online store with clear product photography, care instructions and stories of the artisans behind each piece, and launched social campaigns with short videos of the crafting process. Artisans were trained to photograph new pieces with their phones and upload them through a simple process, so the store could grow without depending on outside help.",
      outcome:
        "Direct online sales became a steady channel, and customers responded strongly to artisan stories. Artisans received a larger share of the final price. The collective also used order data to plan production around popular designs and seasons, reducing unsold stock.",
      learning: "Telling the makers’ stories differentiated handmade products from mass-produced ones.",
      verified: true,
    },
    {
      slug: "textile-mill-energy-cost-analysis",
      title: "Analysing energy costs in a spinning mill",
      client: "A spinning mill",
      region: "Andhra Pradesh",
      markets: ["IN"],
      services: ["MIS & financial reporting", "Data analytics & dashboards", "Research consultancy"],
      methods: ["Cost analysis", "Energy dashboard"],
      scope: "One mill, three years of cost data",
      timeline: "3 months",
      challenge:
        "Energy costs had become one of the mill’s largest expenses, but management could not see which processes or shifts consumed the most. Power tariffs had risen sharply, and the mill was weighing expensive investments without knowing which would deliver the largest savings.",
      approach:
        "We analysed energy bills, production data and machine logs, and built a dashboard showing consumption per kilogram of yarn by department and shift. Shift supervisors helped us interpret unusual patterns, such as machines left idling between batches, which the data alone could not explain.",
      outcome:
        "A few older machines and certain shifts accounted for disproportionate consumption. The mill prioritised replacement and maintenance, and evaluated a rooftop solar investment using the data. Simple changes, such as switching off idle machines and scheduling maintenance, delivered savings even before any new investment.",
      learning: "Measuring cost per unit of output revealed where savings were possible.",
      verified: true,
    },
  ],
  TEXTILE_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: TEXTILE_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  TOBACCO_CASES = [
    {
      slug: "point-of-sale-compliance-audit",
      title: "Auditing tobacco point-of-sale compliance near schools",
      client: "A state health department",
      region: "Three districts in North India",
      markets: ["IN"],
      services: ["Government research", "Offline data collection", "Data analytics & dashboards"],
      methods: ["Structured retail audits", "Geo-tagged photo evidence"],
      scope: "1,800 retail outlets",
      timeline: "6 weeks",
      challenge:
        "The department wanted to know how well shops followed rules on health warnings, signage and sales near educational institutions, before planning enforcement and awareness drives.",
      approach:
        "Trained auditors visited outlets with a structured checklist covering mandatory signage, displays and distance from schools, supported by geo-tagged photographs. Audits were randomly back-checked by supervisors.",
      outcome:
        "Compliance was much weaker within school zones in peri-urban areas than in city centres. The department focused enforcement and retailer awareness on those zones and repeated the audit six months later to track change.",
      learning: "Geo-tagged evidence made the findings difficult to dispute and easy to act on.",
      verified: true,
    },
    {
      slug: "tobacco-farmer-crop-diversification",
      title: "Exploring alternative crops with tobacco-growing families",
      client: "An agricultural research foundation",
      region: "Andhra Pradesh & Karnataka",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Research consultancy"],
      methods: ["Household survey", "Farmer group discussions"],
      scope: "1,200 households, 18 group discussions",
      timeline: "9 weeks",
      challenge:
        "The foundation was designing a programme to help tobacco farmers shift to other crops and needed to understand farm economics, risks and what farmers would need to make a change.",
      approach:
        "We surveyed households on income sources, costs, buyer arrangements and debts, and held group discussions on the risks of switching. Questions explored which alternatives farmers had tried and why they had succeeded or failed.",
      outcome:
        "Assured buyers and access to credit mattered more than crop yields in farmers’ decisions. The foundation built buy-back arrangements and credit linkages into its pilot rather than focusing on agronomy alone.",
      learning: "Livelihood transitions succeed when the market risk is shared.",
      verified: true,
    },
    {
      slug: "cessation-app-user-research",
      title: "Improving a quit-tobacco app through user research",
      client: "A public-health NGO",
      region: "Canada & Australia, online",
      markets: ["CA", "AU"],
      services: ["Qualitative research", "UI/UX design", "Online surveys"],
      methods: ["User interviews", "Usability testing", "In-app survey"],
      scope: "28 interviews, 900 survey responses",
      timeline: "7 weeks",
      challenge:
        "Many people downloaded the NGO’s quit app but stopped using it within days. The NGO wanted to understand why and how the app could better support people trying to quit.",
      approach:
        "We interviewed current and former users, tested the app with new users and ran an in-app survey on motivations and difficulties. Our design team turned the findings into redesigned onboarding and daily support flows.",
      outcome:
        "Users felt overwhelmed by information and wanted short, personal check-ins during cravings. The NGO simplified onboarding, added a craving support button and reminders, and saw users stay engaged longer in early testing.",
      learning: "For behaviour change, timely support matters more than detailed information.",
      verified: true,
    },
    {
      slug: "empty-pack-survey-illicit-trade",
      title: "Estimating illicit cigarette prevalence through an empty pack survey",
      client: "A policy research institute",
      region: "Six cities in Malaysia & South Africa",
      markets: ["MY", "ZA"],
      services: ["Government research", "Offline data collection", "Data processing & analytics"],
      methods: ["Empty pack collection", "Pack coding and analysis"],
      scope: "12,000 discarded packs",
      timeline: "8 weeks",
      challenge:
        "Policymakers needed independent evidence on the share of cigarettes sold without legal health warnings or tax markings, which official sales data could not reveal.",
      approach:
        "Field teams collected discarded packs along randomly selected routes in each city, following a published method. Each pack was coded for warnings, markings and origin by trained coders, with double-coding on a sample.",
      outcome:
        "The institute obtained city-level estimates of non-compliant packs and used them in its policy recommendations on enforcement and tax administration.",
      learning:
        "A transparent, repeatable method is essential for evidence that will be scrutinised in policy debates.",
      verified: true,
    },
    {
      slug: "smokeless-tobacco-usage-study",
      title: "Understanding smokeless tobacco use among adults in rural areas",
      client: "A public-health research consortium",
      region: "Bihar, Uttar Pradesh & Odisha",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Household survey", "In-depth interviews"],
      scope: "4,000 adults, 40 interviews",
      timeline: "12 weeks",
      challenge:
        "Smokeless tobacco use was widespread, but the consortium lacked recent data on usage patterns, awareness of health risks and interest in quitting, to design a community programme.",
      approach:
        "We conducted interviews in private settings with careful consent procedures, using sensitive question design and same-gender interviewers where appropriate. In-depth interviews explored social norms and attempts to quit.",
      outcome:
        "Awareness of oral cancer risks was moderate, but few users knew where to get help quitting. The consortium focused its programme on community health workers and quit support at primary health centres.",
      learning: "Privacy and trusted interviewers are critical for honest answers on stigmatised behaviours.",
      verified: true,
    },
    {
      slug: "health-warning-effectiveness-study",
      title: "Testing how adults respond to pictorial health warnings",
      client: "A national health agency in South-East Asia",
      region: "Indonesia & Malaysia",
      markets: ["ID", "MY"],
      services: ["Quantitative research", "Qualitative research", "Reporting & insights"],
      methods: ["Face-to-face survey with stimuli", "Group discussions"],
      scope: "2,000 adults, 12 group discussions",
      timeline: "8 weeks",
      challenge:
        "The agency was reviewing its pictorial warnings and wanted evidence on which images and messages were noticed, understood and likely to prompt thoughts of quitting.",
      approach:
        "Interviewers showed adults several warning designs in rotated order and asked about noticeability, understanding and emotional response. Group discussions explored reactions in more depth, including among non-literate participants.",
      outcome:
        "Warnings showing specific, recognisable consequences with a quitline number performed best. The agency used the results in its next warning rotation.",
      learning: "Testing with low-literacy audiences changed which designs looked most effective.",
      verified: true,
    },
    {
      slug: "retailer-regulation-awareness",
      title: "What small retailers know about tobacco sales regulations",
      client: "A local authority trading standards team",
      region: "A large city in the United Kingdom",
      markets: ["UK"],
      services: ["Government research", "Offline data collection (CATI & CAPI)", "Content marketing"],
      methods: ["Retailer survey", "Awareness material testing"],
      scope: "1,000 retailers",
      timeline: "5 weeks",
      challenge:
        "The department suspected many small retailers broke rules unknowingly and wanted to design simple awareness material before stepping up enforcement.",
      approach:
        "We surveyed retailers about their understanding of age restrictions, signage and sale-zone rules, then tested draft leaflets and posters with a subset to check they were clear and practical.",
      outcome:
        "Most retailers knew the age rule but not the signage or school-zone rules. The department distributed simplified posters in local languages before its enforcement drive.",
      learning: "Education before enforcement made compliance easier and reduced conflict.",
      verified: true,
    },
    {
      slug: "workplace-tobacco-free-evaluation",
      title: "Evaluating a tobacco-free workplace programme in factories",
      client: "A manufacturing group’s health and safety team",
      region: "Gujarat & Tamil Nadu",
      markets: ["IN"],
      services: ["Quantitative research", "Qualitative research", "Research consultancy"],
      methods: ["Worker survey before and after", "Supervisor interviews"],
      scope: "1,500 workers at six plants",
      timeline: "9 months (two waves)",
      challenge:
        "The group introduced a tobacco-free workplace policy with counselling support and wanted to know whether it worked and how workers experienced it.",
      approach:
        "We surveyed workers before the programme and again nine months later, using anonymous self-completion on tablets to encourage honest answers. Supervisors were interviewed about implementation challenges.",
      outcome:
        "Workers who used counselling were more likely to report quitting or cutting down, but night-shift workers rarely accessed support. The group extended counselling hours to cover night shifts.",
      learning: "Anonymous self-completion is essential when asking employees about sensitive behaviour.",
      verified: true,
    },
    {
      slug: "quitline-caller-satisfaction",
      title: "Improving a tobacco quitline through caller feedback",
      client: "A national quitline operator",
      region: "Pan-India",
      markets: ["IN"],
      services: ["Offline data collection (CATI)", "Quantitative research", "Data analytics & dashboards"],
      methods: ["Follow-up telephone survey", "Dashboard"],
      scope: "2,500 callers over six months",
      timeline: "6 months",
      challenge:
        "The quitline wanted to understand callers’ experiences and quit outcomes after their first call, to improve counselling and follow-up.",
      approach:
        "With callers’ consent, our telephone team followed up at set intervals to ask about counselling quality, quit attempts and support needs. Results were shown on a monthly dashboard by language and region.",
      outcome:
        "Callers who received scheduled follow-up calls reported more quit attempts. The quitline increased follow-up capacity in the languages where demand was highest.",
      learning: "Follow-up support was as valuable as the first conversation.",
      verified: true,
    },
    {
      slug: "school-awareness-programme-evaluation",
      title: "Evaluating a school tobacco-awareness programme",
      client: "An education and health partnership",
      region: "Two states",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["Teacher interviews", "Anonymous student survey with parental consent"],
      scope: "60 schools",
      timeline: "10 weeks",
      challenge:
        "A school-based programme aimed to raise awareness of tobacco harms. The partners wanted to know whether sessions were delivered as planned and what students remembered.",
      approach:
        "Following strict child-safeguarding procedures, with parental consent and school permission, we used short anonymous questionnaires about knowledge and attitudes, and interviewed teachers about delivery. No identifying information was collected from students.",
      outcome:
        "Delivery was inconsistent where teachers lacked training time. The partners shortened the curriculum and added teacher training before the next academic year.",
      learning: "Research with young people requires strict safeguarding, minimal data and anonymity by design.",
      verified: true,
    },
  ],
  TOBACCO_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: TOBACCO_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  WATER_CASES = [
    {
      slug: "urban-water-utility-satisfaction",
      title: "Listening to households before reforming a city water utility",
      client: "A municipal water utility",
      region: "A large city in Maharashtra",
      markets: ["IN"],
      services: ["Government research", "Quantitative research", "Offline data collection (CAPI)"],
      methods: ["Household survey", "Ward-level analysis", "Supply diaries"],
      scope: "4,000 households across all wards, 200 supply diaries",
      timeline: "10 weeks",
      challenge:
        "The utility planned to move towards continuous water supply and metered billing, but many households received water for only a few hours a day and distrusted the utility. Officials needed to understand current experiences, coping costs and willingness to accept change before designing the reform.",
      approach:
        "Interviewers surveyed households in every ward about supply timings, pressure, quality, storage, tanker purchases, billing and complaints. A sample of households kept a two-week diary of supply hours, giving more accurate data than recall. Results were analysed by ward and housing type, including informal settlements that are often missed.",
      outcome:
        "Households in some wards spent significant amounts on tankers and storage, and many said they would accept metering if supply became reliable. The utility sequenced its reform ward by ward, starting where supply improvements were feasible, and used the findings in its public communication about metering.",
      learning: "Diaries captured the reality of intermittent supply far better than questions about averages.",
      verified: true,
    },
    {
      slug: "water-purifier-buyer-journey",
      title: "How families choose a home water purifier",
      client: "A water purifier brand",
      region: "India & Indonesia",
      markets: ["IN", "ID"],
      services: ["Consumer panel", "Quantitative research", "Qualitative research"],
      methods: ["Online and face-to-face survey", "In-home interviews"],
      scope: "2,200 recent buyers, 30 home visits",
      timeline: "8 weeks",
      challenge:
        "The brand was entering Indonesia while defending its share in India, and wanted to understand how families decided to buy a purifier, which technology they chose and how much the service network mattered.",
      approach:
        "We surveyed recent buyers about triggers, research, technology choice, price and installation, combining online panels with face-to-face interviews in smaller cities. In-home interviews explored water sources, maintenance habits and trust in different technologies. Questionnaires were adapted carefully for each country.",
      outcome:
        "In both markets, health concerns after illness in the family triggered purchases, and after-sales service reputation was decisive. In Indonesia, buyers knew little about technology differences. The brand built its Indonesian launch around a service promise and simple water quality testing at home. Early results in Indonesia showed strong interest in the home testing service, which became a key lead source for sales teams.",
      learning: "Service confidence sold purifiers more effectively than technical specifications.",
      verified: true,
    },
    {
      slug: "rural-water-scheme-functionality",
      title: "Checking whether rural piped water schemes are still working",
      client: "A state water and sanitation mission",
      region: "Uttar Pradesh & Bihar",
      markets: ["IN"],
      services: ["Government research", "Offline data collection (CAPI)", "Data analytics & dashboards"],
      methods: ["Village infrastructure audits", "Household survey"],
      scope: "600 villages, 6,000 households",
      timeline: "12 weeks",
      challenge:
        "Many villages had received piped water connections, but reports suggested that some systems had stopped working or supplied water irregularly. The mission needed independent evidence of functionality, not just connection counts. Officials also suspected that some villages reported functionality that did not match residents’ experience.",
      approach:
        "Field teams audited pumps, tanks and taps in each village with photo evidence, and surveyed households about supply hours, quality, payments and maintenance. Results were mapped on a dashboard by district and block. Women were interviewed separately where possible, since they collected and managed most household water.",
      outcome:
        "Most schemes were working, but a significant minority had irregular supply due to unpaid electricity bills and lack of local operators. The mission introduced village operator training and a maintenance fund mechanism. A follow-up round was scheduled to track whether non-functional schemes had been restored.",
      learning: "Measuring functionality rather than coverage revealed the real challenge.",
      verified: true,
    },
    {
      slug: "water-utility-customer-experience-uk",
      title: "Improving the customer experience of a water company",
      client: "A regional water and sewerage company",
      region: "England",
      markets: ["UK"],
      services: ["Quantitative research", "Online surveys", "Data analytics & dashboards"],
      methods: ["Post-contact surveys", "Driver analysis", "Monthly dashboard"],
      scope: "3,000 customers a month",
      timeline: "Ongoing programme",
      challenge:
        "The company’s customer satisfaction scores were below regulatory expectations, especially after supply interruptions and billing disputes. It needed to know which parts of the experience drove dissatisfaction.",
      approach:
        "We surveyed customers shortly after contact, by email, SMS or telephone, about how easy it was to get help, how well they were kept informed and whether their issue was resolved. Driver analysis identified the most influential factors, and results were reported monthly by contact type and region. Open comments were coded into themes, which helped explain the numbers in customers’ own words.",
      outcome:
        "Updates during supply interruptions and first-contact resolution of billing queries mattered most. The company introduced proactive SMS updates during incidents and empowered billing agents to resolve common issues on the first call. Satisfaction scores improved steadily over the following year.",
      learning: "Keeping customers informed during problems was as important as fixing them.",
      verified: true,
    },
    {
      slug: "desalination-public-acceptance-study",
      title: "Public attitudes to desalinated and recycled water",
      client: "A national water authority",
      region: "United Arab Emirates & Saudi Arabia",
      markets: ["AE", "SA"],
      services: ["Government research", "Quantitative research", "Content marketing"],
      methods: ["Resident survey in Arabic and English", "Message testing"],
      scope: "2,500 residents",
      timeline: "7 weeks",
      challenge:
        "The authority wanted to expand the use of recycled water and promote water conservation, but needed to understand public attitudes and concerns among citizens and expatriate residents. Water demand was rising quickly, and per-capita consumption was among the highest in the world.",
      approach:
        "We surveyed residents in Arabic and English about water use, conservation habits, trust in water quality and attitudes to recycled water for different uses, then tested awareness messages. The sample reflected the population mix of citizens and expatriates, and questions explored trust in different information sources, from government channels to social media.",
      outcome:
        "Residents accepted recycled water for landscaping and industry but were hesitant for household use. The authority focused communications on non-household uses first and emphasised quality monitoring. Later surveys showed growing comfort with recycled water for irrigation and district cooling.",
      learning: "Acceptance grew step by step, starting with less personal uses.",
      verified: true,
    },
    {
      slug: "water-meter-reading-app",
      title: "Digitising meter reading and billing for a water board",
      client: "A city water supply board",
      region: "Karnataka",
      markets: ["IN"],
      services: ["Mobile app development", "Web application development", "API development & integration"],
      methods: ["Field process mapping", "Meter reading app", "Billing integration"],
      scope: "150 meter readers, 200,000 connections",
      timeline: "6 months",
      challenge:
        "Meter readings were recorded on paper and typed into the billing system, leading to errors, disputes and delayed bills. Readers also missed premises regularly, leading to estimated bills that customers disputed.",
      approach:
        "We built a mobile app for meter readers with photo capture of each meter, GPS tagging and offline operation, integrated with the billing system, and a dashboard for supervisors. Meter readers tested early versions on their routes, and the app was simplified after they found some steps slowed them down. The app also flagged unusual readings, such as sudden drops that might indicate meter tampering or leaks, for supervisor review.",
      outcome:
        "Billing disputes fell because customers could see meter photos, bills went out faster and supervisors could track reading coverage daily. Revenue collection improved as accurate bills reduced disputes and delays.",
      learning: "Photo evidence resolved disputes before they started.",
      verified: true,
    },
    {
      slug: "wash-programme-school-evaluation",
      title: "Evaluating water and sanitation facilities in schools",
      client: "An international NGO",
      region: "South Africa & Egypt",
      markets: ["ZA", "EG"],
      services: ["Government research", "Quantitative research", "Qualitative research"],
      methods: ["School facility audits", "Teacher interviews", "Student discussions with consent"],
      scope: "240 schools",
      timeline: "10 weeks",
      challenge:
        "The NGO had built toilets and handwashing stations in schools and wanted to know whether facilities were used, maintained and had improved attendance, especially for girls. Earlier reports had counted facilities built but said little about whether they were still working.",
      approach:
        "Field teams audited facilities, interviewed teachers and held discussions with students following child-safeguarding procedures and consent from schools and parents. Audits recorded water availability, cleanliness, privacy and accessibility for children with disabilities, with photographs for verification. Interviews were conducted in English, isiZulu and Arabic as appropriate, with women researchers speaking to girls.",
      outcome:
        "Facilities were used where schools had cleaning budgets and soap supplies, but fell into disuse elsewhere. The NGO added maintenance funding and school WASH committees. Girls’ attendance was higher in schools with well-maintained facilities, strengthening the case for maintenance funding.",
      learning: "Maintenance mattered as much as construction.",
      verified: true,
    },
    {
      slug: "bottled-water-brand-positioning",
      title: "Repositioning a bottled water brand in a crowded market",
      client: "A bottled water brand",
      region: "Hong Kong, Malaysia & Taiwan",
      markets: ["HK", "MY", "TW"],
      services: ["Consumer panel", "Quantitative research", "Social media marketing"],
      methods: ["Online survey", "Concept tests"],
      scope: "1,800 consumers",
      timeline: "6 weeks",
      challenge:
        "The brand competed with many local and international labels and had no clear reason for consumers to choose it. Shoppers saw little difference between brands, and the client was competing mainly on promotions.",
      approach:
        "We surveyed consumers about purchase occasions, brand perceptions and attitudes to plastic, and tested positioning concepts. Surveys were conducted in English, Cantonese, Mandarin and Malay, with quotas for age, gender and purchase frequency in each market.",
      outcome:
        "Concepts combining mineral benefits with a recycled bottle commitment tested best. The brand relaunched with recycled packaging and focused campaigns on sports and wellness occasions. Sales improved in sports and fitness channels, and the brand gained listings in gyms and sports venues. The brand also used the findings to shape its retail displays, highlighting recycled packaging at the point of purchase.",
      learning: "Sustainability added value when tied to a clear product benefit.",
      verified: true,
    },
    {
      slug: "water-company-asset-reporting",
      title: "Linking asset maintenance to financial reporting for a water operator",
      client: "A private water treatment operator",
      region: "Tamil Nadu & Telangana",
      markets: ["IN"],
      services: ["MIS & financial reporting", "ERP development", "Data analytics & dashboards"],
      methods: ["Asset register build", "Maintenance cost dashboard"],
      scope: "12 treatment plants",
      timeline: "5 months",
      challenge:
        "The operator ran plants under long-term contracts but could not see maintenance costs by plant and asset, making contract renewals and pricing difficult. Some plants were consistently over budget, but the reasons were buried in general maintenance accounts.",
      approach:
        "We built an asset register, linked maintenance work and spending to assets in the ERP and created dashboards showing cost per plant, per asset and per million litres treated. Plant engineers helped define asset categories so that reports reflected how equipment was actually maintained.",
      outcome:
        "Management identified plants with rising maintenance costs and priced contract renewals with confidence. The operator also used the data to plan preventive maintenance and reduce emergency repairs. Contract negotiations became faster because the operator could support its pricing with evidence.",
      learning: "Asset-level visibility turned maintenance from a cost into a planning tool.",
      verified: true,
    },
    {
      slug: "smart-water-meter-adoption",
      title: "Testing households’ readiness for smart water meters",
      client: "A water technology company",
      region: "Australia & New Zealand",
      markets: ["AU", "NZ"],
      services: ["Consumer panel", "Quantitative research", "UI/UX design"],
      methods: ["Online survey", "App prototype testing"],
      scope: "1,500 households, 20 usability sessions",
      timeline: "7 weeks",
      challenge:
        "Utilities were piloting smart meters, and the company wanted to know whether households would use consumption data and alerts, and how to design its customer app. Utilities worried that customers might see smart meters as surveillance rather than a helpful service.",
      approach:
        "We surveyed households about water bills, conservation habits and interest in usage data, then tested an app prototype with leak alerts and comparisons. Usability sessions were held in homes and by video, and participants completed tasks such as finding a leak alert and comparing usage with neighbours.",
      outcome:
        "Leak alerts and bill forecasts were valued most, while detailed charts were rarely used. The company simplified its app around alerts and forecasts. Utilities piloting the app reported high engagement with leak alerts and faster repair of household leaks.",
      learning: "People wanted actionable alerts, not more data.",
      verified: true,
    },
  ],
  WATER_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: WATER_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  ),
  WOOD_CASES = [
    {
      slug: "plywood-carpenter-influence-study",
      title: "How carpenters decide which plywood brand homeowners buy",
      client: "A plywood and laminates brand",
      region: "Delhi NCR, Lucknow, Jaipur & Indore",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Qualitative research"],
      methods: ["Carpenter interviews at work sites", "Homeowner survey"],
      scope: "900 carpenters, 600 homeowners",
      timeline: "6 weeks",
      challenge:
        "The brand spent heavily on television advertising aimed at homeowners, yet sales teams insisted carpenters made most brand decisions. Leadership wanted evidence before shifting budgets.",
      approach:
        "Interviewers met carpenters at work sites and timber markets, asking how they chose plywood for recent jobs, what homeowners asked for and which brands they trusted. A homeowner survey measured how much choice homeowners actually exercised.",
      outcome:
        "For most mid-range projects, carpenters chose the brand and homeowners accepted it. The client launched a carpenter loyalty and training programme and adjusted its advertising to support carpenter recommendations.",
      learning: "In trade-led categories, the professional at the work site is often the real buyer.",
      verified: true,
    },
    {
      slug: "furniture-buyer-online-offline",
      title: "Understanding why furniture shoppers browse online but buy in store",
      client: "A furniture retailer in North America",
      region: "Toronto, Vancouver, Chicago & Dallas",
      markets: ["CA", "US"],
      services: ["Consumer panel", "Online surveys", "Digital analytics & reporting"],
      methods: ["Online survey", "Website analytics review"],
      scope: "1,500 recent furniture buyers",
      timeline: "5 weeks",
      challenge:
        "The retailer’s website attracted heavy traffic, but most sales still happened in stores. Management wanted to understand the role the website played and whether to invest in online selling or store visits.",
      approach:
        "We surveyed recent furniture buyers about their research and purchase journey, then compared the findings with website analytics and store visit data.",
      outcome:
        "Buyers used the website to shortlist and compare, then visited stores to check comfort and finish. The retailer added “book a store visit” and stock-availability features online, connecting the two channels instead of treating them separately.",
      learning: "For high-touch products, the website’s job is often to bring people to the store.",
      verified: true,
    },
    {
      slug: "timber-dealer-channel-research",
      title: "Mapping the timber and plywood dealer network in tier-2 cities",
      client: "A wood panel manufacturer",
      region: "18 tier-2 cities",
      markets: ["IN"],
      services: ["Business panel", "Offline data collection", "Data analytics & dashboards"],
      methods: ["Dealer census", "Dealer interviews"],
      scope: "1,100 dealers",
      timeline: "8 weeks",
      challenge:
        "The manufacturer planned to expand beyond metros but had no reliable list of dealers, their size or the brands they carried in smaller cities.",
      approach:
        "Field teams walked timber markets to list every dealer, recording location, size, brands stocked and customer types, then interviewed a sample about margins and supplier relationships. Data was mapped for the sales team.",
      outcome:
        "The manufacturer identified priority dealers in each city and set expansion targets based on real market structure rather than guesswork.",
      learning: "A ground-level census is often the only way to see informal trade markets clearly.",
      verified: true,
    },
    {
      slug: "sustainable-wood-perception-study",
      title: "Do buyers care whether wood is sustainably sourced?",
      client: "A certified wood products company",
      region: "Sydney, Melbourne & Auckland",
      markets: ["AU", "NZ"],
      services: ["Quantitative research", "Qualitative research", "Content marketing"],
      methods: ["Online survey", "Architect and designer interviews"],
      scope: "1,000 homeowners, 30 architects",
      timeline: "6 weeks",
      challenge:
        "The company held sustainability certification but saw little sales benefit. It wanted to know whether customers and architects valued certification and how to communicate it.",
      approach:
        "We surveyed homeowners about purchase priorities and certification awareness, and interviewed architects and interior designers about specification practices and client demands.",
      outcome:
        "Homeowners cared but rarely asked; architects working on premium and commercial projects specified certified wood when clients requested it. The company focused its communication on architects with ready-to-use specification material.",
      learning: "Sustainability messages work best when aimed at the people who write specifications.",
      verified: true,
    },
    {
      slug: "modular-kitchen-lead-generation",
      title: "Generating qualified leads for modular kitchens",
      client: "A modular kitchen and wardrobe brand in the UAE",
      region: "Dubai & Abu Dhabi",
      markets: ["AE"],
      services: ["Lead generation", "Google Ads / PPC", "Landing page & CRO"],
      methods: ["Search and social campaigns", "Lead qualification"],
      scope: "Website, campaigns and CRM integration",
      timeline: "6 months",
      challenge:
        "The brand received many enquiries, but sales teams complained that most were from people with no budget or no immediate plans.",
      approach:
        "We rebuilt landing pages with clear price guidance, added qualifying questions on project timing and budget, and refined campaigns towards high-intent searches. Leads flowed into the CRM with source tracking.",
      outcome:
        "Enquiry volume fell slightly, but the share of qualified leads rose and the sales team’s conversion improved. Budget shifted towards campaigns that produced qualified leads rather than cheap form fills.",
      learning: "Price guidance on landing pages filtered out mismatched leads before they reached sales.",
      verified: true,
    },
    {
      slug: "wood-panel-plant-erp",
      title: "Bringing production and stock data together for a wood panel plant",
      client: "A particleboard and MDF manufacturer",
      region: "Gujarat",
      markets: ["IN"],
      services: ["ERP development", "Data analytics & dashboards", "Accounting & finance consulting"],
      methods: ["Process mapping", "Phased ERP implementation"],
      scope: "One plant, three warehouses",
      timeline: "6 months",
      challenge:
        "Production, stock and accounts were managed in separate systems and spreadsheets. Stock counts rarely matched records, and month-end closing took weeks.",
      approach:
        "We mapped processes from raw material receipt to dispatch, implemented an ERP in phases starting with inventory and finance, and set up barcode scanning at warehouses.",
      outcome:
        "Stock records became reliable, month-end closing was much faster, and management could see production costs by product line for the first time.",
      learning: "Starting with inventory accuracy built confidence before extending the system to production planning.",
      verified: true,
    },
    {
      slug: "furniture-export-buyer-feedback",
      title: "Listening to international buyers of handcrafted furniture",
      client: "A furniture export council",
      region: "Buyers in the USA, UK, Germany, France & Italy",
      markets: ["IN", "US", "UK", "DE", "FR", "IT"],
      services: ["Business panel", "Qualitative research", "Online surveys"],
      methods: ["Buyer interviews", "Online survey"],
      scope: "25 interviews, 120 survey responses",
      timeline: "7 weeks",
      challenge:
        "Exporters of handcrafted wooden furniture faced rising competition. The council wanted to know how buyers judged suppliers and where Indian exporters could improve.",
      approach:
        "We interviewed buyers and sourcing agents, then surveyed a wider group about quality consistency, finishing, packaging, lead times and sustainability documentation.",
      outcome:
        "Buyers valued Indian craftsmanship but worried about finish consistency and transit damage. The council organised finishing and packaging training for member exporters.",
      learning: "Strengths and weaknesses were both clearer when buyers spoke in their own words.",
      verified: true,
    },
    {
      slug: "agroforestry-farmer-study",
      title: "Why farmers plant, or avoid, commercial trees on their land",
      client: "An environmental foundation",
      region: "Punjab, Haryana & Uttar Pradesh",
      markets: ["IN"],
      services: ["Quantitative research", "Offline data collection (CAPI)", "Government research"],
      methods: ["Farmer survey", "Group discussions"],
      scope: "1,000 farmers, 12 discussions",
      timeline: "8 weeks",
      challenge:
        "The foundation promoted agroforestry with poplar and eucalyptus but adoption varied widely. It needed to understand farmers’ concerns and what would encourage planting.",
      approach:
        "We surveyed farmers about land use, tree planting experience, buyers and regulations, and held group discussions on risks such as price uncertainty and harvesting permits.",
      outcome:
        "Uncertainty about selling and transporting timber was the biggest barrier. The foundation worked with buyers on forward agreements and produced simple guidance on permits.",
      learning: "Long-cycle crops need long-term market confidence.",
      verified: true,
    },
    {
      slug: "interior-brand-social-content",
      title: "Turning carpenter craftsmanship into engaging social content",
      client: "A decorative veneer brand in the Gulf",
      region: "UAE, Saudi Arabia & Qatar",
      markets: ["AE", "SA", "QA"],
      services: ["Social media marketing", "Video marketing", "Influencer marketing"],
      methods: ["Short-form video", "Designer collaborations"],
      scope: "Instagram and YouTube content over six months",
      timeline: "6 months",
      challenge:
        "The brand’s social channels showed product catalogues that attracted little engagement. It wanted to reach architects, designers and homeowners planning interiors.",
      approach:
        "We produced short videos showing veneers being installed by skilled craftsmen and finished rooms, collaborated with interior designers to feature real projects, and shared practical tips on choosing finishes.",
      outcome:
        "Engagement and enquiries from designers grew steadily, and the brand’s content became a resource its sales team shared with clients.",
      learning: "Showing craftsmanship in action made a technical product inspiring.",
      verified: true,
    },
    {
      slug: "wood-trader-gst-compliance",
      title: "Bringing GST compliance under control for a timber trading business",
      client: "A timber and plywood trading company",
      region: "Delhi NCR",
      markets: ["IN"],
      services: ["GST services", "Accounting & bookkeeping", "TDS services"],
      methods: ["Compliance review", "Monthly reconciliation routine"],
      scope: "Two GST registrations, 300 suppliers",
      timeline: "Ongoing monthly engagement",
      challenge:
        "The trader had received GST notices for mismatches in input tax credit and was unsure which supplier invoices were missing from its records.",
      approach:
        "We reconciled purchase registers with auto-generated GST statements for past periods, identified missing supplier filings, prepared responses to notices and set up a monthly reconciliation and supplier follow-up routine.",
      outcome:
        "Notices were resolved with documentation, recoverable credit was identified, and monthly filings now go out after reconciliation rather than before.",
      learning: "A simple monthly routine prevented problems that had taken months to untangle.",
      verified: true,
    },
  ],
  WOOD_CASES_MODULE = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        default: WOOD_CASES,
      },
      Symbol.toStringTag,
      {
        value: "Module",
      },
    ),
  );

export { AEROSPACE_CASES_MODULE, AGRICULTURE_CASES_MODULE, AUTOMOTIVE_CASES_MODULE, CHEMICAL_CASES_MODULE, CONSTRUCTION_CASES_MODULE, DEFENSE_CASES_MODULE, ELECTRIC_POWER_CASES_MODULE, ELECTRONICS_CASES_MODULE, ENERGY_CASES_MODULE, FASHION_CASES_MODULE, FISHING_CASES_MODULE, FLORAL_CASES_MODULE, FOOD_CASES_MODULE, GOVERNMENT_CASES, GOVERNMENT_CASES_MODULE, HORTICULTURE_CASES_MODULE, HOSPITALITY_CASES_MODULE, INDUSTRIAL_ROBOTS_CASES_MODULE, INFORMATION_SERVICES_CASES_MODULE, INTERNET_SERVICES_CASES_MODULE, IT_CASES_MODULE, MANUFACTURING_CASES_MODULE, MEAT_CASES_MODULE, MINING_CASES_MODULE, PETROLEUM_OIL_GAS_CASES_MODULE, PHARMACEUTICAL_CASES_MODULE, PULP_AND_PAPER_CASES_MODULE, RETAIL_CASES_MODULE, SEMICONDUCTOR_CASES_MODULE, SHIPBUILDING_CASES_MODULE, SOFTWARE_CASES_MODULE, STEEL_CASES_MODULE, TELECOMMUNICATIONS_CASES_MODULE, TEXTILE_CASES_MODULE, TOBACCO_CASES_MODULE, WATER_CASES_MODULE, WOOD_CASES_MODULE };
