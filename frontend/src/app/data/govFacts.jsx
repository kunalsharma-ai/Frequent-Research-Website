/* build 74: the government research figures and services the home page shows, kept apart from the government page */
const GOV_STATS = {
    states: {
      value: "17",
      label: "States & UTs with field teams · 149 districts",
    },
    b2c: {
      value: "42,52,035",
      label: "Citizen panel members (B2C)",
    },
    b2b: {
      value: "25,51,221",
      label: "B2B & public-sector panel",
    },
    modes: {
      value: "Multi-mode",
      label: "CAPI · CATI · Online · F2F",
    },
  },
  GOV_SERVICES = [
    {
      t: "Government & Public-Sector Surveys",
      icon: "🏛️",
      d: "Structured surveys for departments, agencies and public bodies that need reliable evidence from citizens, users or stakeholders.",
      audience: "Citizens, service users, officials, institutions",
      method: "CAPI, CATI, online, mixed mode",
    },
    {
      t: "Citizen Satisfaction Research",
      icon: "😊",
      d: "Measure how people experience public services, from access and speed to fairness and outcomes.",
      audience: "Public-service users across urban and rural areas",
      method: "Exit interviews, CATI, online, CAPI",
    },
    {
      t: "Public Opinion Polls",
      icon: "📊",
      d: "Quantify views on public issues, policies and priorities using balanced, representative samples.",
      audience: "General population, specific demographic groups",
      method: "CATI, online panels, F2F, mixed mode",
    },
    {
      t: "Policy Research",
      icon: "📜",
      d: "Evidence on awareness, perception and expected impact of policies, before and after they are introduced.",
      audience: "Citizens, businesses, experts, affected groups",
      method: "Quantitative surveys, IDIs, focus groups",
    },
    {
      t: "Government Scheme Evaluation",
      icon: "✅",
      d: "Assess reach, delivery and outcomes of schemes and programmes against their stated objectives.",
      audience: "Beneficiaries, non-beneficiaries, implementers",
      method: "Household surveys, baseline / endline, qualitative",
    },
    {
      t: "Beneficiary Feedback",
      icon: "🗣️",
      d: "Hear directly from people a programme serves: what reached them, what helped and what did not.",
      audience: "Programme beneficiaries and their households",
      method: "CAPI, CATI, community discussions",
    },
    {
      t: "Household & Socioeconomic Surveys",
      icon: "🏠",
      d: "Large-scale household data on income, consumption, assets, access to services and living conditions.",
      audience: "Households across income groups and regions",
      method: "CAPI door-to-door, listing and sampling",
    },
    {
      t: "Rural & Agricultural Research",
      icon: "🌾",
      d: "Fieldwork with farmers and rural communities on crops, inputs, credit, markets and rural services.",
      audience: "Farmers, agri-workers, rural households",
      method: "F2F / CAPI in local languages, group discussions",
    },
    {
      t: "Healthcare & Public Health Research",
      icon: "🩺",
      d: "Studies on health access, awareness, behaviour and service quality, with patients, communities and health workers.",
      audience: "Patients, caregivers, HCPs, frontline health workers",
      method: "CAPI, CATI, HCP panels, qualitative",
    },
    {
      t: "Education & Youth Research",
      icon: "🎓",
      d: "Research with students, parents, teachers and institutions on learning, access and aspirations.",
      audience: "Students, young adults, parents, teachers",
      method: "School-based surveys, online, F2F",
    },
    {
      t: "Employment & Workforce Research",
      icon: "👷",
      d: "Understand jobs, skills, wages, working conditions and labour-market programmes.",
      audience: "Workers, job-seekers, employers, MSMEs",
      method: "CATI, CAPI, establishment surveys",
    },
    {
      t: "Urban Infrastructure Research",
      icon: "🏙️",
      d: "Citizen perception and usage of transport, water, sanitation, housing and civic services.",
      audience: "Urban residents, commuters, service users",
      method: "Intercept surveys, CAPI, online",
    },
  ];
export { GOV_SERVICES, GOV_STATS };
