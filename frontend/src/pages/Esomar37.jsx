/*
 * ESOMAR 37 — /esomar-37. Frequent Research's answers to the ESOMAR 37 Questions
 * to Help Buyers of Online Samples. Prefix ES_. Styles: src/styles/esomar37.css (es-).
 *
 * Content rule: every answer on this page is Frequent Research's own supplied text. Nothing is
 * invented, summarised away or embellished — the only edits are paste artefacts (stray HTML
 * entities, run-together words) and paragraph breaks. Where the company has not supplied a figure
 * (the metrics board), the page says so rather than showing a number.
 *
 * Answer blocks: ["p", text] | ["ul", [item…]] | ["dl", [[term, text]…]] | ["note", text]
 */
import * as ee from 'react';
import { HeroH1 } from '../app/shared/HeroH1.jsx';
import { useJsonLd } from '../app/home/HeroParts.jsx';
import { usePageMeta } from '../app/SiteApp.jsx';
import { PpL, dmMeta, ppGo, ppIn, ppR } from '../components/dm/shared.jsx';
import { FRK_Emblem } from '../components/site/FrKit.jsx';

const ES_URL = "/esomar-37";
const ES_TITLE = "ESOMAR 37 | Online Sample Quality | Frequent Research";
const ES_DESC =
  "Frequent Research's answers to the ESOMAR 37 questions for buyers of online samples: sources, recruitment, validation, data quality, privacy and compliance.";
const ES_UPDATED = "October 2026";

const ES_SECTIONS = [
  { id: "company", n: "01", k: "co", name: "Company Profile", lead: "Who we are, how long we have done this, and what else we do." },
  { id: "sources", n: "02", k: "sr", name: "Sample Sources & Recruitment", lead: "Where our respondents come from, how they are recruited and how they are verified." },
  { id: "quality", n: "03", k: "dq", name: "Data Quality & Validation", lead: "Participation limits, identity checks and what we do about poor in-survey behaviour." },
  { id: "policies", n: "04", k: "pc", name: "Policies & Compliance", lead: "Privacy, data protection, children, security and the standards we certify to." },
  { id: "metrics", n: "05", k: "mx", name: "Metrics", lead: "The twelve ESOMAR metrics, reported for the current period." },
];

const ES_QA = [
  /* ── 01 COMPANY PROFILE ───────────────────────────────────────────────────────────── */
  {
    s: "company",
    q: "What experience does your company have in providing online samples for market research? How long have you been providing this service? Do you also provide similar services for other uses such as direct marketing? If so, what proportion of your work is for market research?",
    short: "Experience and history",
    a: [
      [
        "p",
        "Our company was founded in 2017 and started the online portals www.turn2opinion.com, www.myfrequentrewards.com and www.myhealthopinions.com. After creating our in-house panel, our company has completed more than 23,500 online studies for clients around the globe, with over 3.43M consumer panellists, 2.85M business panellists and almost 1.5M healthcare profiles.",
      ],
      [
        "p",
        "Our B2B proprietary panel site carries respondents from 40+ geographies including the USA, Canada, Mexico, UK, Spain, Italy, Australia, France, Germany, India, China, Japan, Singapore, Brazil, Turkey, Russia and Malaysia, among many others.",
      ],
      [
        "p",
        "We are constantly working to grow our consumer panel in all geographies and to add new markets to our offering. We conduct over 100,000 interviews every year around the globe among consumers and B2B professionals. Our proprietary panel of engaged survey respondents, together with our recruitment sources, allows our team to provide global reach representing over 95 geographies including vendor partners.",
      ],
      [
        "p",
        "During the research process, data is collected from participants and statistical analysis or qualitative assessment is conducted to draw meaningful insights and conclusions. These insights help organisations make informed decisions about their products, services, marketing strategies and other aspects of their business.",
      ],
      ["note", "We do not use our panel for any other marketing promotion. Our audience is used for market research purposes only."],
    ],
  },
  {
    s: "company",
    q: "Do you have staff with responsibility for developing and monitoring the performance of the sampling algorithms and related automated functions who also have knowledge and experience in this area? What sort of training in sampling techniques do you provide to your frontline staff?",
    short: "Sampling staff and training",
    a: [
      [
        "p",
        "Since 2017 we have had an in-house panel management and supply team to manage all sample supply and panellist registration. We also have an in-house QA recruitment team who analyse and allow only valid users to be registered on our panel. The team applies qualitative and quantitative measures to analyse real-time responses and generate a quality score, and monitors whole fieldwork progress and respondent participation history.",
      ],
      [
        "p",
        "Each team member is trained on our recruitment algorithm and validations so that only the right user can enter, samples are correctly diversified with verified demographics, and our panel databases hold individuals who have agreed to participate in surveys, studies or research projects. Our panel is built through various methods, including opt-in registrations, partnerships and recruitment through online advertisements.",
      ],
      [
        "p",
        "Once a research project is initiated, our team selects a sample from the database that matches the desired target audience based on specific demographics, characteristics or criteria, using screening questions to ensure participants meet the study requirements. Selected individuals are then invited to participate, usually through online surveys or other digital methods. We also employ techniques such as random sampling or quota sampling to minimise bias and ensure a more accurate representation of the target population.",
      ],
    ],
  },
  {
    s: "company",
    q: "What other services do you offer? Do you cover sample-only, or do you offer a broad range of data collection and analysis services?",
    short: "Other services offered",
    a: [
      [
        "p",
        "Our offering includes programming and hosting, which we run through Decipher, Confirmit, Nebu, Sawtooth, Survey2Connect, SurveyGizmo and QuestionPro. We also have an in-house team for data tabulation, processing and analysis, along with coding, reporting and presentation.",
      ],
      [
        "dl",
        [
          ["Languages", "750+ native language experts to assist clients with language and transcription needs."],
          ["Data collection", "Online sampling across 90+ markets; an in-house 25-seat multilingual CATI team; face-to-face and mystery shopping fieldwork across India."],
          ["Qualitative", "In-house moderators and recruiters for qualitative and quantitative insight."],
          ["Beyond research", "Software and web development, digital marketing, research consulting, and finance and accounting support such as ITR and TDS filing and GST returns."],
        ],
      ],
    ],
  },

  /* ── 02 SAMPLE SOURCES & RECRUITMENT ──────────────────────────────────────────────── */
  {
    s: "sources",
    q: "Using the broad classifications above, from what sources of online sample do you derive participants?",
    short: "Sources of online sample",
    a: [
      [
        "dl",
        [
          [
            "Online proprietary panel",
            "We actively manage our global panel (turn2opinion.com, myfrequentrewards.com and myhealthopinions.com), built through double opt-in registration where individuals voluntarily sign up and provide their demographic information to become registered members.",
          ],
          [
            "Social media",
            "Our recruitment team creates targeted advertisements or posts on platforms such as Facebook, LinkedIn, X and Instagram, inviting individuals to participate in our studies.",
          ],
          ["Online communities", "We collaborate with online communities and forums where individuals with specific interests gather, to recruit participants for our studies."],
          ["Secondary customer databases", "We carry out secondary research and build our own databases, inviting those contacts to our portal to take part in research studies."],
          [
            "Partnerships and affiliations",
            "We hold partnership pools and affiliations with other organisations, websites and communities, engaged when the need arises and after client confirmation, to reach specific demographics or niche groups.",
          ],
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "Which of these sources are proprietary or exclusive and what is the percent share of each in the total sample provided to a buyer?",
    short: "Proprietary share",
    a: [
      [
        "p",
        "We use our in-house proprietary source to reach the requested audience. Whenever a shortfall arises, or the targeting is very niche, we engage our affiliates or supplier pool after client approval. On that basis, 90–95% of projects are completed with in-house sources.",
      ],
      ["stat", ["90–95%", "of projects completed with in-house sources"]],
    ],
  },
  {
    s: "sources",
    q: "What recruitment channels are you using for each of the sources you have described? Is the recruitment process 'open to all' or by invitation only? Are you using probabilistic methods? Are you using affiliate networks and referral programs and in what proportions? How does your use of these channels vary by geography?",
    short: "Recruitment channels",
    a: [
      [
        "p",
        "Turn2Opinion, MyFrequentRewards and MyHealthOpinions are built to recruit consumer, business and healthcare audience pools. They are recruited through traditional online sample sources, including exclusive partnerships with website publishers, social media networking platforms, online communities, and affiliate and non-profit organisation networks.",
      ],
      [
        "ul",
        [
          "Recruitment is open to all who pass the quality checks and validations applied on the portal.",
          "We do not use probabilistic methods or referral programmes.",
          "For geographic reach we keep a balance across all markets, except where the targeting required is very niche.",
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "What form of validation do you use in recruitment to ensure that participants are real, unique, and are who they say they are?",
    short: "Validation at recruitment",
    a: [
      ["p", "We employ several validation methods during recruitment to maintain the integrity and quality of our panel database."],
      [
        "dl",
        [
          [
            "Double opt-in",
            "A valid email address is required at sign-up. We send a verification email requiring the participant to confirm registration via a verification link, which helps ensure the address is valid and belongs to a real person.",
          ],
          [
            "Identity verification",
            "We confirm participant identity, which can involve additional information such as name, address, phone number, or government-issued identification in the case of payment errors or mismatched information. These measures help prevent fraudulent or duplicate registrations.",
          ],
          [
            "Screening questions",
            "At registration and before each study we include screening questions covering demographics, purchasing habits, product usage and other relevant factors, so participants fit the desired target audience.",
          ],
          [
            "Quality control",
            "We check for inconsistent or contradictory answers using a quality score on open-ended and red-herring questions to prevent bot fraud, monitor response times, and identify patterns that suggest unreliable or careless participation.",
          ],
          ["Redundancy checks", "We compare participant data such as name, email address and IP address to identify multiple registrations from the same individual."],
          [
            "Project and sample management platform",
            "Our in-house platform continuously monitors participant behaviour and detects suspicious or fraudulent activity through fraud detection algorithms, manual review and geo validation.",
          ],
          ["Age validation", "Each user chooses their year of birth at registration, verified against their full date of birth during deep profiling."],
          ["CAPTCHA", "CAPTCHA is enabled at registration and login to stop automated answers, and again at the gate survey before a user enters a survey."],
          ["Geo-IP validation", "A respondent connecting from an IP address outside the surveyed country is not allowed to participate."],
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "What brand (domain) and/or app are you using with proprietary sources?",
    short: "Brands and domains",
    a: [
      ["p", "Our proprietary sources are Turn2Opinion, MyFrequentRewards and MyHealthOpinions."],
      [
        "p",
        "The portals are accessible on all devices, and surveys can be reached through the website portal, by email, by WhatsApp, or through the member's other social channels such as Facebook, Instagram, LinkedIn and X, where a survey notification can be delivered.",
      ],
    ],
  },
  {
    s: "sources",
    q: "Which model(s) do you offer to deliver sample? Managed service, self-serve, or API integration?",
    short: "Delivery models",
    a: [
      [
        "dl",
        [
          [
            "Managed full service",
            "We take full responsibility for the research process on behalf of the client: designing the study, selecting the target audience, programming surveys, collecting data and delivering the final results, with guidance and recommendations throughout.",
          ],
          [
            "API integration",
            "Clients can integrate our panel and sample resources directly into their own systems, accessing the panel's capabilities programmatically for survey invitations, data collection and sample management inside their existing workflows.",
          ],
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "If offering intercepts, or providing access to more than one source, what level of transparency do you offer over the composition of your sample? Do you let buyers control which sources of sample to include in their projects, and if so how? Do you have any integration mechanisms with third-party sources offered?",
    short: "Transparency over blend",
    a: [
      ["p", "We provide information about the sources a sample is derived from whenever the client asks, and we always obtain client approval before using a supplier database."],
      [
        "ul",
        [
          "We explain our blending methodology: how sources are combined, the weighting or proportioning used, and the quality controls applied.",
          "We provide demographic breakdowns of the sample composition — age, gender, ethnicity, geographic distribution and other relevant demographics — so clients can assess alignment with their target audience.",
          "We share our validation and quality control processes, and provide panel booklets and methodology documentation covering recruitment methods, panel sources and validation, accessible through our web portal.",
          "Buyers are offered our in-house sample source that best aligns with their target audience or research objectives.",
          "API integration lets buyers access and use their preferred sample sources programmatically while using our infrastructure and tools.",
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "Of the sample sources you have available, how would you describe the suitability of each for different research applications?",
    short: "Suitability by application",
    a: [
      [
        "p",
        "For product testing and recall studies we offer high respondent engagement through our proprietary panel, and we engage only users willing to participate in multiple waves of research.",
      ],
      [
        "stats",
        [
          ["50–60%", "recontact rate, consumer"],
          ["20–30%", "recontact rate, B2B"],
          ["10–15%", "recontact rate, healthcare"],
          ["1–30 min", "survey lengths supported"],
        ],
      ],
      [
        "p",
        "We have a high representation of both mobile and desktop participants, so members can access surveys and record their participation without obstacles. We do not recruit for communities and we do not run online focus groups.",
      ],
    ],
  },
  {
    s: "sources",
    q: "Briefly describe your overall process from invitation to survey completion. What steps do you take to achieve a sample that 'looks like' the target population? What demographic quota controls, if any, do you recommend?",
    short: "Invitation to completion",
    a: [
      [
        "steps",
        [
          ["Survey invitation", "Invitations go out by email, SMS or dashboard notification, with a brief description of the study, its purpose and the incentive offered."],
          ["Screening and qualification", "Participants answer screening questions to confirm eligibility against the criteria set for the project."],
          ["Informed consent and privacy", "Participants see the purpose of the study, data collection procedures, confidentiality measures and privacy considerations, and must consent before proceeding."],
          ["Survey participation", "Participants complete the survey online or through a registered social channel, guided through multiple-choice, open-ended or interactive questions."],
          ["Data collection and quality control", "Checks for inconsistent or incomplete answers, response time monitoring and attention-check questions run during the survey."],
          ["Completion and submission", "Participants complete the survey by responding to all required questions."],
          ["Incentive fulfilment", "Participants are rewarded by monetary compensation, gift cards, PayPal, UPI or another agreed form."],
          ["Analysis and reporting", "Where the survey is hosted by us, responses are processed, aggregated and analysed, and compiled into a report or presentation for the client."],
        ],
      ],
      [
        "dl",
        [
          ["Sampling methodology", "Random, stratified or quota sampling, so participants are selected in a way that reflects the target population's diversity and composition."],
          ["Demographic quotas", "Quotas set from the known or estimated demographics of the target population — age, gender, income, geographic location and other relevant factors."],
          ["Panel recruitment and maintenance", "Continuous recruitment across demographic groups, with regular profiling and updating to keep the panel diverse and relevant."],
          ["Profiling and screening", "Detailed information on demographics, preferences, interests and behaviours, refined further by screening questions per study."],
          ["Post-sampling weighting", "Weighting applied after collection so imbalances in the sample composition are corrected against known population characteristics."],
          ["Validation and quality control", "Identity validation, duplicate checks and response monitoring to keep the sample representative."],
        ],
      ],
      [
        "note",
        "Quota controls we recommend: age, gender, ethnicity, geographic location, socio-economic status and education level, plus factors specific to the research domain such as occupation, individual or household income, household size or language proficiency.",
      ],
    ],
  },
  {
    s: "sources",
    q: "What profiling information do you hold on at least 80% of your panel members? How often is each of those data points updated? Can you supply these data points as appends to the data set? Do you collect this profiling information directly or is it supplied by a third party?",
    short: "Profiling data held",
    a: [
      [
        "p",
        "Profiling begins at registration with double opt-in, age and CAPTCHA validation. Once an account is set up we collect basic demographics: age, gender, ethnicity, marital status, education level, household income and occupation.",
      ],
      [
        "p",
        "Members are then funnelled into twelve deeper profiling sections covering health, food habits, interests, hobbies and recreational activities, brand preferences, product usage and shopping preferences, travel, lifestyle, parenting and technology usage such as device preference, operating system, internet usage patterns and social media usage. Each member earns 10 points for completing a profile section, against a 1,500-point redemption threshold.",
      ],
      [
        "p",
        "Contact information is verified and updated regularly. Our in-house team monitors for inactive participants, and we run periodic profiling refreshes, prompting members to update their profiles with extra points for doing so. We collect this profiling information directly — it is not supplied by a third-party dataset.",
      ],
    ],
  },
  {
    s: "sources",
    q: "What information do you need about a project in order to provide an estimate of feasibility? What, if anything, do you do to give upper or lower boundaries around these estimates?",
    short: "Feasibility estimates",
    a: [
      [
        "dl",
        [
          ["Research objectives", "The purpose of the study, the target audience and the specific research questions or hypotheses."],
          ["Target audience", "Age range, gender distribution, geographic location and other relevant demographics."],
          ["Quota and sub-quota set", "The latest quota set, so the sample can be filled accordingly."],
          ["Sample size", "The number of participants needed, to judge whether it can be supplied within the required timeframe."],
          ["Estimated incidence", "Needed to understand response and conversion rates, which drive the fieldwork timeline."],
          ["Survey length and complexity", "Anticipated duration, number of questions and design considerations, which affect engagement and completion."],
          ["Timing and fieldwork duration", "Panel availability, fieldwork constraints and the required timeline."],
          ["Device restriction", "Device compatibility, so the right device audience is aligned to the survey."],
        ],
      ],
      [
        "p",
        "We give upper and lower boundaries from our available resources, panel capability and past experience on similar studies — for example the likelihood of achieving the required sample size or response rate on comparable projects. Where a project involves hard-to-reach or niche populations, the estimate is wider, to account for the difficulty of recruiting those segments.",
      ],
    ],
  },
  {
    s: "sources",
    q: "What do you do if the project proves impossible for you to complete in field? Do you inform the sample buyer as to who you would use to complete the project? In such circumstances, how do you maintain and certify third party sources/sub-contractors?",
    short: "When a project cannot be completed",
    a: [
      [
        "p",
        "We promptly inform the client about the challenges and limitations that make the project unfeasible, with a clear explanation of the specific reasons or constraints.",
      ],
      [
        "p",
        "We then seek client approval before engaging trusted, vetted third-party sources to achieve the required quota, and we offer alternatives: other sample sources, an adjusted research design, refined target population criteria, or a different methodology that can achieve similar insight. Where appropriate we discuss adjustments to scope, timeline or commercial terms.",
      ],
      [
        "ul",
        [
          "Third parties are assessed on reputation, track record, expertise and adherence to industry standards before any partnership.",
          "Contractual agreements set out responsibilities, quality standards, data security, regulatory compliance, participant privacy and ethical research practice.",
          "Performance and compliance are monitored through regular audits, data validation checks and performance evaluations.",
          "Partners must comply with industry standards and guidelines such as those of ESOMAR, MRS and the Insights Association.",
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "Do you set limits on the amount of time a participant can be in the router before they qualify for a survey?",
    short: "Router time limits",
    a: [["note", "Not applicable — we do not use survey routers."]],
  },
  {
    s: "sources",
    q: "What information about a project is given to potential participants before they choose whether to take the survey or not?",
    short: "Information given before a survey",
    a: [
      [
        "dl",
        [
          ["Survey objective", "The purpose of the study, including the general topic or research objective, so members understand the context."],
          ["Length of interview", "The estimated length, so members know the time commitment required."],
          ["Incentives", "The incentive or reward offered for completing the survey — cash, gift cards or another form of compensation."],
          ["Privacy and data protection", "That responses are kept confidential, personal information is handled securely, and participation complies with relevant privacy regulation."],
          ["Opt-in consent", "That participation is entirely voluntary and declining carries no negative consequence."],
          ["Contact information", "How to reach our support team with questions or concerns about the survey."],
        ],
      ],
    ],
  },
  {
    s: "sources",
    q: "Do you allow participants to choose a survey from a selection of available surveys? If so, what are they told about each survey that helps them to make that choice?",
    short: "Choosing from available surveys",
    a: [
      [
        "p",
        "Yes. Each member sees the available survey list in their account and can start a survey from that list, which shows open and closed sections. Surveys can also be reached from an email invitation or a screening message sent to their mobile or registered social platform.",
      ],
      [
        "p",
        "The objective, length of interview, incentive, privacy and data protection terms and the consent request are all shown up front, so members can decide based on their availability, interest and suitability. A survey is usually live for a week, or longer where fieldwork requires it; once closed it no longer appears.",
      ],
    ],
  },
  {
    s: "sources",
    q: "What ability do you have to increase (or decrease) incentives being offered to potential participants during the course of a survey? If so, can this be flagged at the participant level in the dataset?",
    short: "Adjusting incentives mid-field",
    a: [
      ["p", "We can adjust incentives during the course of a survey to optimise response rates, engagement and data quality, and we can flag the incentive level at participant level in the dataset, which allows analysis of the relationship between incentive level and participant behaviour."],
      ["note", "Adjustments follow ethical guidelines: participants are treated fairly, incentives are allocated appropriately, and any change in incentive level is clearly communicated and documented."],
    ],
  },
  {
    s: "sources",
    q: "Do you measure participant satisfaction at the individual project level? If so, can you provide normative data for similar projects?",
    short: "Participant satisfaction",
    a: [
      [
        "p",
        "Yes. We run a post-survey feedback mechanism in which participants rate their experience on survey length, clarity of questions, ease of completion, relevance of content and overall satisfaction.",
      ],
      ["note", "Normative data for similar projects is difficult to share, because projects vary in volume and data granularity and the comparison is rarely like for like."],
    ],
  },
  {
    s: "sources",
    q: "Do you provide a debrief report about a project after it has completed? If yes, can you provide an example?",
    short: "Debrief reporting",
    a: [
      ["p", "Yes — on request, after a project is finished, we provide a fieldwork debrief report covering:"],
      ["ul", ["Total sample invited", "Response rate", "Drop-out rate", "Over-quota rate", "Device used", "IP addresses", "Browser information", "Screen resolution"]],
    ],
  },

  /* ── 03 DATA QUALITY & VALIDATION ─────────────────────────────────────────────────── */
  {
    s: "quality",
    q: "How often can the same individual participate in a survey? How does this vary across your sample sources? What is the maximum amount of time a person may have already been taking surveys before they entered this survey? How do you manage this?",
    short: "Participation frequency",
    a: [
      [
        "stats",
        [
          ["3–4", "surveys per week, per member"],
          ["90 days", "exclusion on the same survey"],
          ["40 min", "maximum survey-taking time enforced"],
        ],
      ],
      [
        "p",
        "A panellist can complete the same survey only once in a 90-day period — our proprietary panels carry a 90-day exclusion by default. For partner panels, respondents can be excluded for dynamic periods of time.",
      ],
      [
        "p",
        "All our proprietary panels use the same account and user ID information to prevent duplication across panels. Where a panellist has completed one survey for a specific customer or time range, they cannot complete another for that customer or within the defined period.",
      ],
    ],
  },
  {
    s: "quality",
    q: "What data do you maintain on individual participants such as recent participation history, date(s) of entry, source/channel? Are you able to supply buyers with a project analysis of such individual level data? Are you able to append such data points to your participant records?",
    short: "Participant-level data",
    a: [
      ["p", "We hold recent participation history, dates of entry, source and channel of recruitment, demographics and other profiling data."],
      [
        "p",
        "On request we provide project analysis reports with aggregated insight and statistics on participant behaviour, response rates and other project-specific metrics. Individual-level data sharing is subject to privacy and data protection considerations, so a consent agreement is signed before any such data is shared, and the buyer must request it in advance. We can append data points to participation records.",
      ],
    ],
  },
  {
    s: "quality",
    q: "Please describe your procedures for confirmation of participant identity at the project level, as they are implemented at the point of entry to a survey or router.",
    short: "Identity at point of entry",
    a: [
      [
        "dl",
        [
          ["Registration and profile verification", "Demographic information and identity verification by email, phone or age verification at sign-up."],
          ["Secure login credentials", "Members receive secure credentials, protected by Google CAPTCHA and a security question to prevent unauthorised access."],
          ["Unique participant IDs", "Each participant has a unique ID used to track and identify them across projects and surveys."],
          ["Account validation", "Logins from an unrecognised device trigger an account validation step before the member can continue."],
          ["Profiling and screening questions", "Entry questions gather demographics, interests and study-specific criteria to confirm eligibility."],
          ["Cookie and device identification", "Used to track activity and keep identification consistent across surveys."],
          [
            "Fraud detection and quality control",
            "Our sample management platform analyses behaviour, response patterns and other signals to flag suspicious activity, and digital fingerprinting identifies unauthorised IP addresses, browser information and device characteristics.",
          ],
        ],
      ],
    ],
  },
  {
    s: "quality",
    q: "Please describe your participant quality tracking, along with any health metrics you maintain on members, and how those metrics are used to invite, track, quarantine, and block people. What processes do you have in place to compare profiled and known data to in-survey responses?",
    short: "Quality tracking and blocking",
    a: [
      [
        "dl",
        [
          [
            "Quality tracking",
            "Response rates, completion rates, abandonment rates, time taken, and the open-ended answer given at the gate survey, all read as indicators of engagement and data quality.",
          ],
          ["Health metrics", "Profiling data, demographics, psychographics, interests and other attributes, used to target members for surveys that match their profile."],
          ["Invitation and screening", "Invitations are sent on profiled and known data; screening questions at the gate survey validate eligibility again before entry."],
          [
            "Quarantine and blocking",
            "Members engaged in suspicious or fraudulent activity, breaching panel rules, or giving inconsistent or unreliable responses are flagged, quarantined or blocked from the platform or from specific surveys.",
          ],
          [
            "Profiled vs in-survey comparison",
            "Profiled and known data is compared with in-survey responses; significant inconsistency triggers investigation, a request for clarification, or exclusion of the data from analysis.",
          ],
        ],
      ],
    ],
  },
  {
    s: "quality",
    q: "For work where you program, host, and deliver the survey data, what processes do you have in place to reduce or eliminate undesired in-survey behaviours?",
    short: "Undesired in-survey behaviour",
    a: [
      [
        "dl",
        [
          ["Random responding", "Attention-check questions assess engagement; failing them flags or excludes the response from analysis."],
          ["Illogical or inconsistent responding", "Logic checks and validation rules compare answers for internal consistency; participants are prompted to review and revise, or asked for clarification."],
          ["Overuse of item non-response", "Quota limits on how many times options such as 'Don't know' can be chosen, so members give a best estimate rather than defaulting."],
          ["Inaccurate or inconsistent responding", "Data cleaning and validation identify response bias and outliers; participants are contacted for clarification, or blocked from further participation."],
          ["Incomplete responding", "Completion rates are monitored; members who consistently give incomplete responses are flagged and their data excluded where necessary."],
          ["Too rapid completion", "Minimum time thresholds are set; completing below the threshold flags or excludes the response."],
        ],
      ],
      ["note", "Post-survey data quality checks, including cleaning and validation, run after fieldwork to catch anything the in-survey controls did not."],
    ],
  },
];

/* ── 04 POLICIES & COMPLIANCE ─────────────────────────────────────────────────────── */
ES_QA.push(
  {
    s: "policies",
    q: "Please provide the link to your participant privacy notice, as well as a summary of the key concepts it addresses.",
    short: "Privacy notice",
    a: [
      ["link", ["Frequent Research privacy policy", "/privacy-data-protection"]],
      [
        "p",
        "Our privacy policy is visible on turn2opinion.com, myfrequentrewards.com and myhealthopinions.com. It is also included in the panel registration process and on survey invitations. Every new registrant must confirm acceptance of the policy and our terms and conditions before submitting their registration.",
      ],
    ],
  },
  {
    s: "policies",
    q: "How do you comply with key data protection laws and regulations in the jurisdictions in which you operate? How do you address consent, data breach response, cross-border transfer, and data retention? Have you appointed a data protection officer?",
    short: "Data protection compliance",
    a: [
      [
        "p",
        "We obtain participant consent as the legal basis for processing personal data, and give participants clear information about the purposes of collection, the types of data collected and how it will be used. Participants give informed consent and may withdraw it at any time.",
      ],
      [
        "dl",
        [
          ["Regulations", "We comply with the GDPR in the European Union and the CCPA in the United States, using data encryption, access controls and regular security assessments."],
          ["Breach response", "Incident response plans detect, respond to and mitigate breaches; affected individuals and the relevant authorities are notified as required by law."],
          ["Retention", "Personal data is retained only as long as necessary for the purpose it was collected for, then securely deleted or anonymised."],
          ["Oversight", "Our external compliance officer provides guidance on data protection and other compliance issues."],
        ],
      ],
    ],
  },
  {
    s: "policies",
    q: "How can participants provide, manage and revise consent for the processing of their personal data? What support channels do you provide for participants?",
    short: "Managing consent",
    a: [
      [
        "p",
        "After joining Turn2Opinion, MyFrequentRewards or MyHealthOpinions, participants get a My Account area from which they can manage and revise consent for the processing of their personal data.",
      ],
      [
        "p",
        "Each portal has its own support address, and the team responds to queries within 48 hours on business days. We are also working on real-time chat support so members can be assisted around the clock.",
      ],
    ],
  },
  {
    s: "policies",
    q: "How do you track and comply with other applicable laws and regulations, such as those that might impact the incentives paid to participants?",
    short: "Other applicable law",
    a: [
      ["p", "We monitor and adhere to consumer protection law, tax law, labour law and regulations specific to the research industry."],
      [
        "p",
        "When providing incentives we make sure compensation is fair and reasonable, considering the nature and duration of the activity, the effort required, and prevailing market standards. We are transparent with participants about the nature and value of incentives and any terms attached, and participants give informed consent before taking part. Internal audits monitor incentives for compliance with the relevant regulations and guidelines.",
      ],
    ],
  },
  {
    s: "policies",
    q: "What is your approach to collecting and processing the personal data of children and young people? Do you adhere to standards and guidelines provided by ESOMAR or GRBN member associations?",
    short: "Children and young people",
    a: [
      ["stat", ["15", "minimum age to register on our panel"]],
      [
        "p",
        "When collecting personal data from children or young people we ensure appropriate parental consent, verifying the parent's identity, providing clear information about data processing, and offering mechanisms for parents to review, modify or withdraw consent.",
      ],
      [
        "p",
        "We adhere to the standards and guidelines set by ESOMAR and GRBN, and comply with data protection law governing children and young people, including COPPA in the United States and the GDPR in the European Union. Privacy-by-design principles are built into our research processes and technology.",
      ],
    ],
  },
  {
    s: "policies",
    q: "Do you implement 'data protection by design' in your systems and processes? If so, please describe how.",
    short: "Data protection by design",
    a: [
      [
        "p",
        "Yes. We collect and process only the minimum personal data necessary for the research purpose, and use anonymisation, pseudonymisation and aggregation to reduce the risk of identification.",
      ],
      [
        "p",
        "We give participants clear information about collection and processing so they can give informed consent, with user-friendly interfaces and consent mechanisms for managing their privacy preferences. Personal data is protected by encryption, access controls, firewalls and other security mechanisms, both in transit and at rest.",
      ],
    ],
  },
  {
    s: "policies",
    q: "What are the key elements of your information security compliance program? Please specify the frameworks or auditing procedures you comply with or certify to. Does your program include an asset-based risk assessment and internal audit process?",
    short: "Information security",
    a: [
      [
        "p",
        "We work to recognised frameworks and certifications, including ISO 27001 for information security management, and we are verified to ISO 20252:2019.",
      ],
      [
        "ul",
        [
          "Security policies and procedures covering access control, data encryption, incident response, employee training and vendor management.",
          "Technical controls: encryption in transit and at rest, vulnerability management, intrusion detection and prevention, firewalls, and regular patching.",
          "Incident response and management procedures covering investigation, containment, mitigation, communication and recovery.",
          "A quality manager who audits, identifies areas for improvement and verifies compliance with policies and standards.",
        ],
      ],
    ],
  },
  {
    s: "policies",
    q: "Do you certify to or comply with a quality framework such as ISO 20252?",
    short: "Quality certification",
    a: [
      ["p", "Yes. We have implemented an ISO 20252 compliant research management system and operate an integrated management system for quality."],
      [
        "certs",
        [
          ["ISO 9001:2015", "Quality management"],
          ["ISO 27001:2015", "Information security"],
          ["ISO 20252:2019", "Market, opinion and social research"],
        ],
      ],
      ["note", "Certified by IAF, EIACI, DBS and UK CERT."],
    ],
  }
);

/* ── 05 METRICS ───────────────────────────────────────────────────────────────────── */
/* ESOMAR asks for twelve figures. They are reported here only once Frequent Research supplies the
   measured value for the current period — the page shows the metric and its status, never a guess. */
const ES_METRICS = [
  ["Average qualifying or completion rate", "%", null],
  ["Paid completes rejected per project", "%", null],
  ["Member accounts removed or quarantined", "%", null],
  ["Paid completes from 0–3 months tenure", "%", null],
  ["Paid completes from owned / branded member relationships vs intercept participants", "%", null],
  ["Average dispositions per member, per year", "count", null],
  ["Average paid completes per member", "count", null],
  ["Active unique participants, last 30 days", "count", null],
  ["Active unique 18–24 male participants, last 30 days", "count", null],
  ["Maximum feasibility, nat-rep quotas, 7 days in field, 100% incidence, 10-minute interview", "count", null],
  ["Quotas that reached full quota at time of delivery", "%", null],
  ["Average survey length in field", "minutes", null],
];

/* ── icons ────────────────────────────────────────────────────────────────────────── */
const ES_P = {
  co: "M4 21V5a2 2 0 0 1 2-2h8l6 6v12a2 2 0 0 1-2 2zM14 3v6h6M8 13h8M8 17h5",
  sr: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18M3 12h18M12 3c2.4 2.6 3.6 5.6 3.6 9s-1.2 6.4-3.6 9c-2.4-2.6-3.6-5.6-3.6-9S9.6 5.6 12 3",
  dq: "M12 3l8 3v6c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V6zM9 12l2.2 2.2L15.5 10",
  pc: "M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 0 1 7 0v3",
  mx: "M4 20V11M10 20V5M16 20v-6M21 20H3",
  search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14M20.5 20.5l-4.5-4.5",
  check: "M5 12.5l4.2 4L19 7",
  plus: "M12 5v14M5 12h14",
  arrow: "M5 12h14M13 6l6 6-6 6",
  seal: "M12 2l2.6 1.9 3.2-.3 1 3 2.7 1.7-1.1 3 1.1 3-2.7 1.7-1 3-3.2-.3L12 22l-2.6-1.9-3.2.3-1-3L2.5 15.7l1.1-3-1.1-3 2.7-1.7 1-3 3.2.3z",
  doc: "M6 2h8l4 4v16H6zM14 2v4h4M9 12h6M9 16h6",
};
const ES_Ico = ({ n, s = 18 }) => (
  <svg className="es-ico" width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={ES_P[n] || ES_P.check} />
  </svg>
);

/* ── answer blocks (build 51 visual treatments; the text itself is unchanged) ───────────── */
function ES_Block({ b }) {
  const [t, v] = b;
  if (t === "p") return <p className="es5-p">{v}</p>;
  if (t === "note")
    return (
      <p className="es5-note">
        <ES_Ico n="check" s={16} />
        <span>{v}</span>
      </p>
    );
  if (t === "ul")
    return (
      <ul className={"es5-ul" + (v.length > 6 ? " es5-ul--cols" : "")}>
        {v.map((x, k) => (
          <li key={x} style={{ "--k": k }}>
            <i aria-hidden="true">
              <ES_Ico n="check" s={13} />
            </i>
            {x}
          </li>
        ))}
      </ul>
    );
  if (t === "dl")
    return (
      <dl className="es5-dl">
        {v.map(([d, x], k) => (
          <div key={d} style={{ "--k": k }}>
            <dt>{d}</dt>
            <dd>{x}</dd>
          </div>
        ))}
      </dl>
    );
  if (t === "steps")
    return (
      <ol className="es5-steps">
        {v.map(([d, x], k) => (
          <li key={d} style={{ "--k": k }}>
            <b>{String(k + 1).padStart(2, "0")}</b>
            <span>
              <strong>{d}</strong>
              {x}
            </span>
          </li>
        ))}
      </ol>
    );
  if (t === "stat")
    return (
      <p className="es5-stat">
        <b>{v[0]}</b>
        <span>{v[1]}</span>
      </p>
    );
  if (t === "stats")
    return (
      <ul className="es5-stats">
        {v.map(([a, b2], k) => (
          <li key={a + b2} style={{ "--k": k }}>
            <b>{a}</b>
            <span>{b2}</span>
          </li>
        ))}
      </ul>
    );
  if (t === "certs")
    return (
      <ul className="es5-certs">
        {v.map(([a, b2], k) => (
          <li key={a} style={{ "--k": k }}>
            <span className="es5-certs__seal">
              <ES_Ico n="seal" s={26} />
            </span>
            <b>{a}</b>
            <span>{b2}</span>
          </li>
        ))}
      </ul>
    );
  if (t === "link")
    return (
      <p className="es5-link">
        <PpL to={v[1]}>
          {v[0]} <ES_Ico n="arrow" s={15} />
        </PpL>
      </p>
    );
  return null;
}
/* "In short": the first sentence of the answer, verbatim */
const esShort = (item) => {
  const p = item.a.find(([t]) => t === "p" || t === "note");
  if (!p) return "";
  const txt = p[1];
  const m = /^(.{40,220}?[.!?])(\s|$)/.exec(txt);
  return m ? m[1] : txt.length > 220 ? txt.slice(0, 217).replace(/\s+\S*$/, "") + "…" : txt;
};
const esKinds = (item) => {
  const k = new Set(item.a.map(([t]) => t));
  return [k.has("steps") && "Process", (k.has("ul") || k.has("dl")) && "Checklist", (k.has("stats") || k.has("stat")) && "Figures", k.has("certs") && "Certificates"].filter(Boolean);
};

/* ── one question ─────────────────────────────────────────────────────────────────── */
function ES_Item({ item, n, sec, open, onToggle }) {
  const pid = "es-a-" + n;
  return (
    <article id={"es-q-" + n} className={"es5-q es5-q--" + sec + (open ? " is-open" : "")} style={{ "--k": n }}>
      <h3 className="es5-q__h">
        <button type="button" aria-expanded={open} aria-controls={pid} onClick={onToggle}>
          <span className="es5-q__n" aria-hidden="true">
            <b>{String(n).padStart(2, "0")}</b>
            <i>/37</i>
          </span>
          <span className="es5-q__t">
            <strong>{item.short}</strong>
            <small>{item.q}</small>
          </span>
          <span className="es5-q__ic" aria-hidden="true">
            <ES_Ico n="plus" s={18} />
          </span>
        </button>
      </h3>
      {!open && esShort(item) && (
        <p className="es5-q__peek">
          <em>In short</em> {esShort(item)}
        </p>
      )}
      <div className="es5-q__p" id={pid} hidden={!open}>
        <div className="es5-q__in">
          {esKinds(item).length > 0 && (
            <p className="es5-q__kinds" aria-hidden="true">
              {esKinds(item).map((k) => (
                <span key={k}>{k}</span>
              ))}
            </p>
          )}
          {item.a.map((b, k) => (
            <ES_Block b={b} key={k} />
          ))}
        </div>
      </div>
    </article>
  );
}

/* ── metrics board ────────────────────────────────────────────────────────────────── */
function ES_Metrics() {
  const [ref, v] = ppIn(0.15);
  return (
    <div ref={ref} className={"es5-mx" + (v ? " is-in" : "")}>
      <ol className="es5-mx__grid">
        {ES_METRICS.map(([label, unit, value], k) => (
          <li key={label} className={"es5-mx__i" + (value == null ? " is-pending" : "")} style={{ "--k": k }}>
            <span className="es5-mx__ring" aria-hidden="true">
              <svg viewBox="0 0 44 44">
                <circle cx="22" cy="22" r="18" />
                <circle cx="22" cy="22" r="18" className="fg" pathLength="100" style={{ strokeDasharray: value == null ? "18 100" : "100 100" }} />
              </svg>
              <b>{String(k + 1).padStart(2, "0")}</b>
            </span>
            <span className="es5-mx__l">{label}</span>
            <b className="es5-mx__v">
              {value == null ? "Being measured" : value}
              {value != null && unit === "%" ? <i>%</i> : null}
            </b>
            <span className="es5-mx__u">unit: {unit}</span>
          </li>
        ))}
      </ol>
      <p className="es5-mx__note">
        ESOMAR asks for twelve measured figures. Each one is published here as soon as it is measured for the current period; we do not publish an estimate in its place. Ask us for
        the latest numbers and we will send them with the period they cover.
      </p>
    </div>
  );
}

/* ── hero: 37 nodes on a turning sphere, one per question, coloured by section ───────── */
const ES_SEC_COL = { co: ["#22D3EE", "#1E5BFF"], sr: ["#2EE6A6", "#0F9D74"], dq: ["#FFB020", "#F0457E"], pc: ["#B05CFF", "#7C4DFF"], mx: ["#9FB6FF", "#4F7BFF"] };
function ES_Sphere({ hi }) {
  const pts = ES_QA.map((x, i) => {
    const n = ES_QA.length;
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const th = i * 2.399963;
    return { x: Math.cos(th) * r, y, z: Math.sin(th) * r, s: (ES_SECTIONS.find((s) => s.id === x.s) || ES_SECTIONS[0]).k };
  });
  return (
    <div className="es5-sphere" aria-hidden="true">
      <div className="es5-sphere__spin">
        {pts.map((p, i) => (
          <span key={i} className={"es5-dot" + (hi && hi !== p.s ? " is-dim" : "")} style={{ "--x": p.x, "--y": p.y, "--z": p.z, "--c": ES_SEC_COL[p.s][0], "--c2": ES_SEC_COL[p.s][1] }}>
            <i>{i + 1}</i>
          </span>
        ))}
      </div>
      <span className="es5-sphere__core">
        <b>37</b>
        <small>answered</small>
      </span>
      <span className="es5-sphere__ring" />
      <span className="es5-sphere__ring es5-sphere__ring--2" />
    </div>
  );
}
function ES_Hero({ onJump }) {
  const [ref, v] = ppIn(0.05);
  const [hi, setHi] = ee.useState(null);
  const count = (id) => ES_QA.filter((x) => x.s === id).length;
  return (
    <section ref={ref} className={"es5-hero" + (v ? " is-in" : "")} aria-labelledby="es-h1">
      <div className="es5-hero__bg" aria-hidden="true">
        <i />
        <i />
        <u />
      </div>
      <div className="container es5-hero__in">
        <div className="es5-hero__copy">
          <nav className="crumbs es5-crumbs" aria-label="Breadcrumb">
            <PpL to="/">Home</PpL>
            <span>
              <span aria-current="page">ESOMAR 37</span>
            </span>
          </nav>
          <p className="es5-hero__kick">
            <span>ESOMAR</span> Buyer transparency · Online sample quality
          </p>
          <HeroH1 id="es-h1">
            The ESOMAR 37, <em>answered in full.</em>
          </HeroH1>
          <p className="es5-hero__lead">37 questions every buyer should ask an online sample supplier — and our answers, in our own words, with nothing skipped.</p>
          <div className="es5-hero__meta">
            <span>
              <ES_Ico n="doc" s={15} /> Current as of {ES_UPDATED}
            </span>
            <span>
              <ES_Ico n="seal" s={15} /> ISO 9001 · 27001 · 20252
            </span>
            <span>
              <ES_Ico n="check" s={15} /> ESOMAR member
            </span>
          </div>
          <div className="es5-hero__ctas">
            <button type="button" className="frk-btn es5-btn" onClick={() => onJump("company")}>
              Read the answers <ES_Ico n="arrow" s={16} />
            </button>
            <PpL to="/lets-talk?type=sample" className="frk-btn frk-btn--ghost es5-ghost">
              Talk to our sample team
            </PpL>
          </div>
        </div>
        <ES_Sphere hi={hi} />
      </div>
      <div className="container">
        <ul className="es5-secnav" aria-label="Sections">
          {ES_SECTIONS.map((s, k) => (
            <li key={s.id} style={{ "--k": k, "--c": ES_SEC_COL[s.k][0], "--c2": ES_SEC_COL[s.k][1] }}>
              <button type="button" onClick={() => onJump(s.id)} onMouseEnter={() => setHi(s.k)} onMouseLeave={() => setHi(null)} onFocus={() => setHi(s.k)} onBlur={() => setHi(null)}>
                <span className="es5-secnav__ic">
                  <ES_Ico n={s.k} s={20} />
                </span>
                <span className="es5-secnav__t">
                  <small>{s.n}</small>
                  <b>{s.name}</b>
                </span>
                <span className="es5-secnav__c">{s.id === "metrics" ? 12 : count(s.id)}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── page ─────────────────────────────────────────────────────────────────────────── */
function ES_Page() {
  usePageMeta("ESOMAR 37", ES_DESC);
  dmMeta(ES_URL, ES_TITLE, ES_DESC);
  useJsonLd("esomar37", {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        name: "ESOMAR 37 — Frequent Research",
        mainEntity: ES_QA.map((x) => ({
          "@type": "Question",
          name: x.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: x.a
              .map(([t, v]) =>
                t === "p" || t === "note"
                  ? v
                  : t === "ul"
                    ? v.join(" ")
                    : t === "dl" || t === "steps"
                      ? v.map(([d, y]) => d + ": " + y).join(" ")
                      : t === "stats" || t === "certs"
                        ? v.map(([a2, b2]) => a2 + " " + b2).join(" ")
                        : t === "stat"
                          ? v[0] + " " + v[1]
                          : t === "link"
                            ? v[0]
                            : ""
              )
              .filter(Boolean)
              .join(" "),
          },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${location.origin}/` },
          { "@type": "ListItem", position: 2, name: "ESOMAR 37", item: `${location.origin}${ES_URL}` },
        ],
      },
    ],
  });

  const [open, setOpen] = ee.useState(() => ({ 0: true }));
  const [qy, setQy] = ee.useState("");
  const [sec, setSec] = ee.useState("all");
  const [prog, setProg] = ee.useState(0);

  /* reading progress for the rail */
  ee.useEffect(() => {
    const el = document.getElementById("es-body");
    if (!el) return;
    const on = () => {
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      setProg(total <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / total)));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, []);

  const needle = qy.trim().toLowerCase();
  const match = (x) => {
    if (sec !== "all" && x.s !== sec) return false;
    if (!needle) return true;
    const hay = (x.q + " " + x.short + " " + JSON.stringify(x.a)).toLowerCase();
    return hay.includes(needle);
  };
  const shown = ES_QA.map((x, i) => ({ x, i })).filter(({ x }) => match(x));
  const jump = (id) => {
    setSec("all");
    setQy("");
    setTimeout(() => ppGo("es-s-" + id)({ preventDefault() {} }), 0);
  };
  const toggle = (i) => setOpen((o) => ({ ...o, [i]: !o[i] }));
  const setAll = (val) => setOpen(val ? Object.fromEntries(ES_QA.map((_, i) => [i, true])) : {});

  const [act, setAct] = ee.useState(1);
  ee.useEffect(() => {
    const els = [...document.querySelectorAll(".es5-q")];
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const ob = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) setAct(+e.target.id.replace("es-q-", ""));
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((e) => ob.observe(e));
    return () => ob.disconnect();
  }, [qy, sec]);
  const goQ = (n) => {
    setOpen((o) => ({ ...o, [n - 1]: true }));
    setTimeout(() => {
      const el = document.getElementById("es-q-" + n);
      if (el) el.scrollIntoView({ behavior: ppR() ? "auto" : "smooth", block: "start" });
    }, 30);
  };
  return (
    <div className="pp es5">
      <ES_Hero onJump={jump} />

      <div className="es5-bar" role="search">
        <div className="container es5-bar__in">
          <label className="es5-bar__search">
            <ES_Ico n="search" s={17} />
            <input type="search" value={qy} onChange={(e) => setQy(e.target.value)} placeholder="Search the 37 answers…" aria-label="Search the ESOMAR 37 answers" />
          </label>
          <div className="es5-bar__tabs" role="group" aria-label="Filter by section">
            <button type="button" className={sec === "all" ? "is-on" : ""} onClick={() => setSec("all")}>
              All 37
            </button>
            {ES_SECTIONS.map((s) => (
              <button key={s.id} type="button" className={sec === s.id ? "is-on" : ""} style={{ "--c": ES_SEC_COL[s.k][0], "--c2": ES_SEC_COL[s.k][1] }} onClick={() => setSec(s.id)}>
                <i aria-hidden="true" />
                {s.name}
              </button>
            ))}
          </div>
          <div className="es5-bar__acts">
            <button type="button" onClick={() => setAll(true)}>
              Expand all
            </button>
            <button type="button" onClick={() => setAll(false)}>
              Collapse
            </button>
          </div>
        </div>
        <span className="es5-bar__prog" aria-hidden="true" style={{ "--p": prog }} />
      </div>

      <div id="es-body" className="es5-body">
        <div className="container es5-layout">
          <nav className="es5-nav" aria-label="All 37 questions">
            {ES_SECTIONS.filter((s) => s.id !== "metrics").map((s) => (
              <div key={s.id} className="es5-nav__g" style={{ "--c": ES_SEC_COL[s.k][0], "--c2": ES_SEC_COL[s.k][1] }}>
                <b>
                  <ES_Ico n={s.k} s={14} /> {s.name}
                </b>
                <ol>
                  {ES_QA.map((x, i) => (x.s === s.id ? (
                    <li key={i}>
                      <button type="button" className={act === i + 1 ? "is-on" : ""} onClick={() => goQ(i + 1)}>
                        <span>{String(i + 1).padStart(2, "0")}</span>
                        {x.short}
                      </button>
                    </li>
                  ) : null))}
                </ol>
              </div>
            ))}
            <div className="es5-nav__g" style={{ "--c": ES_SEC_COL.mx[0], "--c2": ES_SEC_COL.mx[1] }}>
              <button type="button" className="es5-nav__mx" onClick={() => jump("metrics")}>
                <ES_Ico n="mx" s={14} /> Metrics (12)
              </button>
            </div>
          </nav>
          <div className="es5-main">
            {ES_SECTIONS.map((s) => {
              const items = shown.filter(({ x }) => x.s === s.id);
              if (!items.length && s.id !== "metrics") return null;
              if (s.id === "metrics" && sec !== "all" && sec !== "metrics") return null;
              return (
                <section key={s.id} id={"es-s-" + s.id} className={"es5-sec es5-sec--" + s.k} style={{ "--c": ES_SEC_COL[s.k][0], "--c2": ES_SEC_COL[s.k][1] }} aria-labelledby={"es-h-" + s.id}>
                  <header className="es5-sec__head">
                    <span className="es5-sec__n" aria-hidden="true">
                      {s.n}
                    </span>
                    <span className="es5-sec__ic" aria-hidden="true">
                      <ES_Ico n={s.k} s={26} />
                    </span>
                    <div>
                      <h2 id={"es-h-" + s.id}>{s.name}</h2>
                      <p>{s.lead}</p>
                    </div>
                    <span className="es5-sec__count">{s.id === "metrics" ? "12 metrics" : `${items.length} question${items.length === 1 ? "" : "s"}`}</span>
                  </header>
                  {s.id === "metrics" ? (
                    <ES_Metrics />
                  ) : (
                    <div className="es5-list">
                      {items.map(({ x, i }) => (
                        <ES_Item key={i} item={x} n={i + 1} sec={s.k} open={!!open[i]} onToggle={() => toggle(i)} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
            {!shown.length && (
              <p className="es5-empty">
                Nothing matches “{qy}”. <button type="button" onClick={() => setQy("")}>Clear the search</button>
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="es5-close" aria-labelledby="es-close-h">
        <div className="container es5-close__in">
          <span className="es5-close__orb" aria-hidden="true">
            <FRK_Emblem size={120} spin />
          </span>
          <div>
            <h2 id="es-close-h">Still have a question ESOMAR does not ask?</h2>
            <p>Our sample team will answer it directly — including the current metrics, panel book and any documentation your procurement team needs.</p>
            <div className="es5-close__ctas">
              <PpL to="/lets-talk?type=sample" className="frk-btn es5-btn">
                Talk to our sample team
              </PpL>
              <PpL to="/downloads" className="frk-btn frk-btn--ghost es5-ghost">
                Downloads &amp; panel books
              </PpL>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export { ES_Page, ES_QA };
