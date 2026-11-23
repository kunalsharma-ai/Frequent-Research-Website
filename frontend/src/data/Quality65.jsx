/*
 * Market research quality process — content (build 65, update 4). Prefix QP5_. Used by src/pages/Quality65.jsx (the
 * web page /downloads/quality-process/market-research) and src/components/site/QualityPdf65.jsx (the PDF), so the page
 * and the PDF always say the same thing. Source: Frequent Research's quality process brief (Word file, Oct 2026).
 * Rules kept from that brief: no invented panel sizes, rates, thresholds, certifications or screenshots; the 0–200
 * score bands and factor weights are shown as an ILLUSTRATIVE model; demo data is labelled as demo data.
 * Edit the text here; the layout does not need to change.
 */
const QP5_PANELS = [
  {
    k: "t2o",
    t: "Turn2Opinion",
    url: "https://www.turn2opinion.com",
    aud: "B2B, B2C & Teens",
    c: "#2F6BFF",
    ic: "users",
    d: "Consumers, business professionals, industry decision-makers, specialised business audiences and teens aged 13 to 17 with parental consent.",
    pts: ["Consumer recruitment", "Professional recruitment", "Teen recruitment with parental consent", "Demographic profiling", "Professional profiling", "Survey qualification", "Participation monitoring", "Response validation", "Reward eligibility"],
  },
  {
    k: "mfr",
    t: "MyFrequentRewards",
    url: "https://www.myfrequentrewards.com",
    aud: "B2B, B2C & Teens",
    c: "#6D4AFF",
    ic: "gift",
    d: "Consumer research participants, business professionals, teens with parental consent, online survey communities and product and brand research audiences.",
    pts: ["Member registration", "Teen parental consent", "Profile completion", "Survey invitations", "Audience matching", "Participation history", "Quality evaluation", "Reward points", "Redemption validation"],
  },
  {
    k: "mho",
    t: "MyHealthOpinions",
    url: "https://www.myhealthopinions.com",
    aud: "HCPs, patients & caregivers",
    c: "#0E9C88",
    ic: "heart",
    d: "Physicians and specialists, nurses and allied healthcare professionals, patients and family or professional caregivers.",
    pts: ["Professional eligibility", "Medical specialty profiling", "Patient screening", "Caregiver screening", "Consent", "Sensitive data handling", "Healthcare research quality", "Confidentiality safeguards"],
  },
];

const QP5_PILLARS = [
  { t: "Responsible recruitment", ic: "users", d: "We attract relevant respondents through transparent recruitment and audience-specific eligibility requirements.", more: "Recruitment channels are chosen for the audience a panel serves, and every new member joins through an individual account with clear terms. People are invited because they fit, not to fill numbers." },
  { t: "Respondent verification", ic: "id", d: "Account, identity, eligibility and technical checks help us judge whether participation is genuine.", more: "Checks start at registration and continue for the life of the account: contact verification, duplicate screening and technical signals are reviewed together rather than one at a time." },
  { t: "Accurate profiling", ic: "target", d: "Relevant demographic, professional and healthcare information improves how studies are targeted.", more: "Profiles are kept short enough to finish and detailed enough to target. Members are asked to update them over time, and study screeners confirm the details that matter for each project." },
  { t: "Continuous monitoring", ic: "eye", d: "Participation, consistency, attention and history are evaluated, not only a single survey.", more: "One response is never the whole story. Attention, timing, open-ended answers and past outcomes are read together so a member's standing reflects their record." },
  { t: "Data integrity", ic: "shield", d: "Completed responses are reviewed against the project's quality requirements before they are accepted.", more: "Flagged completes are investigated, client-specific rules are applied, and only accepted responses go into the delivered data, with the reconciliation shared with the client." },
];

const QP5_JOURNEY = [
  { t: "Audience acquisition", ic: "globe", d: "Potential respondents discover the panel through approved recruitment channels." },
  { t: "Account registration", ic: "user", d: "Participants create individual accounts and give relevant registration information." },
  { t: "Contact verification", ic: "mail", d: "Email and other applicable checks help validate registration details." },
  { t: "Duplicate screening", ic: "layers", d: "Account and technical indicators are assessed for possible duplicate participation." },
  { t: "Demographic profiling", ic: "users", d: "Members give relevant personal and household information." },
  { t: "Professional or healthcare profiling", ic: "brief", d: "Extra attributes are collected for the panel and audience the member belongs to." },
  { t: "Eligibility qualification", ic: "check", d: "Profile information is checked against each study's requirements." },
  { t: "Survey invitation", ic: "target", d: "Eligible members are matched with suitable research opportunities." },
  { t: "Survey participation", ic: "doc", d: "Respondents complete the questionnaire and its built-in quality checks." },
  { t: "Response validation", ic: "shield", d: "Submissions are evaluated against the applicable quality criteria." },
  { t: "Reward validation", ic: "gift", d: "Eligible rewards are reviewed under the panel's rules before release." },
  { t: "Historical quality assessment", ic: "chart", d: "Participation history and behaviour inform how the member is evaluated next time." },
];

const QP5_B2B = {
  h: "Connecting research with relevant business decision-makers",
  d: "B2B studies live or die on whether the person answering really holds the role. Professional members are profiled on their work, not only on who they are, and study screeners confirm the details that matter for each project.",
  steps: ["Professional audience identification", "Industry classification", "Employment and company profiling", "Job title and responsibilities", "Seniority and decision-making authority", "Company size and business characteristics", "Professional experience", "Study-specific qualification", "Professional identity validation", "Ongoing profile accuracy", "Survey participation monitoring", "Response acceptance"],
  roles: [
    { t: "CEOs & founders", ic: "star", a: ["Company size", "Ownership and role", "Industry", "Strategic decision scope"] },
    { t: "Directors & senior management", ic: "users", a: ["Seniority", "Function led", "Team size", "Budget responsibility"] },
    { t: "Finance professionals", ic: "coin", a: ["Finance function", "Systems used", "Approval authority", "Company revenue band"] },
    { t: "IT decision-makers", ic: "cpu", a: ["IT area", "Purchase involvement", "Technology stack", "Organisation size"] },
    { t: "HR professionals", ic: "handshake", a: ["HR specialism", "Headcount covered", "Tools used", "Hiring involvement"] },
    { t: "Procurement", ic: "receipt", a: ["Categories bought", "Spend authority", "Supplier process", "Industry"] },
    { t: "Marketing & sales", ic: "funnel", a: ["Channel responsibility", "Budget role", "Martech used", "B2B or B2C focus"] },
    { t: "Industry specialists", ic: "compass", a: ["Sector", "Specialist role", "Years of experience", "Region"] },
  ],
  note: "Role categories show how B2B audiences are profiled; availability for a given study is confirmed at feasibility.",
};

const QP5_B2C = {
  h: "Understanding consumer opinions, preferences and experiences",
  d: "Consumer research needs real people with real routines. Members tell us about their household, work and the categories they buy and use, so invitations go to people for whom a study is relevant.",
  steps: ["Registration", "Age and geographic eligibility", "Household composition", "Employment status", "Education", "Purchasing behaviour", "Product usage", "Brand preferences", "Lifestyle categories", "Research interests", "Survey matching", "Response quality monitoring"],
  cards: [
    ["Students", "grad"],
    ["Working professionals", "users"],
    ["Parents", "heart"],
    ["Online shoppers", "funnel"],
    ["Household decision-makers", "check"],
    ["Technology users", "cpu"],
    ["Product consumers", "gift"],
  ],
  note: "Audience cards are examples of how consumers are profiled, not a statement of panel composition.",
};

const QP5_HC = [
  {
    k: "hcp",
    t: "Healthcare professionals",
    ic: "stetho",
    d: "Physicians, specialists, nurses, pharmacists and allied professionals are recruited and profiled on their practice so medical studies reach the right expertise.",
    pts: ["Professional recruitment", "Specialty identification", "Practice setting", "Geographic eligibility", "Professional experience", "Registration and licence checks where applicable", "Study-specific screening", "Participation monitoring", "Confidentiality"],
    nodes: ["General medicine", "Cardiology", "Oncology", "Neurology", "Dermatology", "Paediatrics", "Nursing", "Pharmacy", "Allied healthcare"],
    note: "Specialties are recruitment categories; coverage for a study is confirmed at feasibility.",
  },
  {
    k: "patients",
    t: "Patients",
    ic: "bed",
    d: "People living with health conditions take part voluntarily and with consent. Their experiences are self-reported and handled as sensitive information.",
    pts: ["Voluntary participation", "Appropriate consent", "Condition-specific eligibility", "Self-reported medical history", "Treatment experience", "Patient journey relevance", "Sensitive data protection", "Study-specific qualification"],
    nodes: ["Recruitment", "Consent", "Screening", "Participation", "Confidentiality"],
    note: "Diagnoses are self-reported by patients; they are not independently medically verified.",
  },
  {
    k: "caregivers",
    t: "Caregivers",
    ic: "heart",
    d: "Family, unpaid and professional caregivers are qualified on who they care for and what that care involves.",
    pts: ["Family caregivers", "Unpaid caregivers", "Professional caregivers", "Relationship to the person cared for", "Duration of caregiving", "Type of assistance", "Caregiving responsibilities", "Research eligibility"],
    nodes: ["Caregiver type", "Relationship", "Duration", "Assistance", "Eligibility"],
    note: "Family, unpaid and professional caregivers are kept as separate groups.",
  },
];

/* 18 checkpoints: [name, stage, purpose, risk it helps identify, icon] */
const QP5_SHIELD = [
  ["Registration validation", "Join", "Checks that sign-up details are complete and plausible.", "Fake or careless sign-ups", "user"],
  ["Email verification", "Join", "Confirms the member controls the email address used.", "Throwaway or mistyped accounts", "mail"],
  ["Contact verification", "Join", "Extra contact checks where the panel applies them.", "Unreachable or false identities", "phone"],
  ["CAPTCHA & bot detection", "Join", "Separates people from automated sign-ups.", "Scripts and bots", "cpu"],
  ["Duplicate-account screening", "Join", "Looks for one person holding several accounts.", "Duplicate participation", "layers"],
  ["Device & browser indicators", "Join · Survey", "Reviews technical signals linked to risky activity.", "Emulators, masking, farms", "lock"],
  ["Geographic consistency", "Profile · Survey", "Compares stated location with technical location signals.", "Out-of-market respondents", "globe"],
  ["Profile consistency", "Profile", "Compares profile answers over time.", "Contradictory or invented profiles", "id"],
  ["Professional eligibility", "Profile", "Confirms role, industry and seniority for B2B studies.", "Role misrepresentation", "brief"],
  ["Healthcare eligibility", "Profile", "Confirms specialty and practice details for HCP studies.", "Unqualified medical respondents", "stetho"],
  ["Study-specific qualification", "Before survey", "Screener questions written for each project.", "Wrong-audience completes", "target"],
  ["Attention checks", "During survey", "Simple, fair checks that a respondent is reading.", "Inattentive answering", "eye"],
  ["Completion-time evaluation", "During survey", "Compares interview length with a realistic time.", "Speeding", "clock"],
  ["Open-ended response review", "During · After", "Reads written answers for relevance and sense.", "Gibberish, copy-paste, generated text", "doc"],
  ["Response-pattern analysis", "After survey", "Looks for straight-lining and other patterns.", "Patterned or random answering", "chart"],
  ["Historical participation", "Ongoing", "Uses past outcomes to inform current evaluation.", "Repeat low-quality behaviour", "spark"],
  ["Post-survey validation", "After survey", "Reconciles completes against the project's rules.", "Data that should not be delivered", "check"],
  ["Manual review & escalation", "After survey", "People, not only rules, decide borderline cases.", "Unfair automatic exclusions", "handshake"],
];

/* illustrative quality-score model (0–200) */
const QP5_BANDS = [
  [0, 59, "Additional verification required", "#C8577E"],
  [60, 99, "Provisionally eligible", "#D99A2B"],
  [100, 139, "Established respondent", "#2F6BFF"],
  [140, 169, "Trusted respondent", "#6D4AFF"],
  [170, 200, "Strong quality history", "#0E9C88"],
];
const QP5_FACTORS = [
  ["Identity verification", 25, "id"],
  ["Profile consistency", 25, "user"],
  ["Historical quality", 35, "chart"],
  ["Attention checks", 30, "eye"],
  ["Open-ended quality", 25, "doc"],
  ["Behavioural consistency", 25, "layers"],
  ["Participation reliability", 20, "check"],
  ["Recent validated activity", 15, "clock"],
];
const QP5_SCORE_NOTE = "Illustrative scoring model. Actual respondent quality scores and thresholds are governed by the applicable panel's verified operational rules.";
const QP5_POINTS = [
  ["Quality points", "A panel-defined indicator of how reliable a respondent's participation has been.", "shield"],
  ["Reward points", "Incentive credits earned for eligible participation under the panel's rules.", "gift"],
];

/* respondent-history demo (fictional) */
const QP5_HISTORY = {
  note: "Illustrative respondent history, fictional data.",
  trend: [96, 104, 101, 112, 118, 116, 127, 134, 131, 142, 149, 153],
  months: ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  events: [
    ["Validated complete", "ok", "Consumer electronics study"],
    ["Attention check passed", "ok", "Grocery shopper survey"],
    ["Flag: short interview time", "review", "Reviewed: accepted, short routing confirmed"],
    ["Validated complete", "ok", "Banking customer experience"],
    ["Open-end reviewed", "ok", "Travel intentions study"],
  ],
  indicators: ["Validated completions", "Previous quality reviews", "Attention-check outcomes", "Response consistency", "Completion timing", "Open-ended relevance", "Duplicate-participation alerts", "Account standing", "Recent activity"],
};

const QP5_PIPE = [
  { t: "Before the survey", ic: "target", pts: ["Profile eligibility", "Audience qualification", "Study-specific screening", "Duplicate participation checks", "Relevant technical checks"] },
  { t: "During the survey", ic: "eye", pts: ["Attention checks", "Response consistency", "Completion timing", "Open-ended relevance", "Suspicious response patterns"] },
  { t: "After the survey", ic: "check", pts: ["Completion reconciliation", "Data quality review", "Investigation of flagged responses", "Client-specific quality requirements", "Final acceptance decisions"] },
];
const QP5_OUTCOMES = [
  ["Accepted", "Meets the quality criteria and goes into the delivered data.", "#0E9C88"],
  ["Review required", "A flag was raised; a person looks at the context before deciding.", "#D99A2B"],
  ["Excluded", "Does not meet the criteria and is removed from the data.", "#C8577E"],
];
const QP5_FLAG_NOTE = "A flag does not by itself establish fraud. Flagged responses get a contextual or manual review.";

const QP5_REWARDS = ["Survey reward eligibility", "Reward-point allocation", "Pending validation", "Validated completion", "Reward balance", "Redemption threshold", "Claim submission", "Account and transaction review", "Payment processing", "Redemption history"];
const QP5_WALLET = {
  note: "Demonstration wallet. Balances, amounts and payment methods are examples only.",
  rows: [
    ["Survey complete: retail study", "+ 250", "Validated"],
    ["Survey complete: auto study", "+ 400", "Pending validation"],
    ["Profile update bonus", "+ 50", "Validated"],
    ["Redemption claim", "- 500", "Under review"],
  ],
  status: ["Claim submitted", "Account check", "Transaction review", "Paid"],
};

const QP5_DASH = [
  { k: "t2o", t: "Turn2Opinion", items: ["Member dashboard", "Profile completion", "Available surveys", "Survey history", "Rewards", "Redemption options"] },
  { k: "mfr", t: "MyFrequentRewards", items: ["Member overview", "Demographic profiles", "Survey opportunities", "Participation history", "Reward balance", "Redemption process"] },
  { k: "mho", t: "MyHealthOpinions", items: ["Healthcare audience profiling", "Study eligibility", "Survey participation", "Account management", "Rewards, where applicable"] },
];
/* real screenshots go here when available: { panel: "t2o", src: "/media/quality/t2o-dashboard.webp", alt: "…" } (panel: t2o, mfr or mho) */
const QP5_SHOTS = [];

const QP5_REPORT = {
  note: "Illustrative client reporting dashboard, not live project data.",
  funnel: [
    ["Invitations", 1000],
    ["Survey starts", 420],
    ["Qualified", 260],
    ["Completes", 212],
    ["Accepted completes", 196],
  ],
  cats: ["Recruitment source", "Target audience", "Invitations", "Survey starts", "Screen-outs", "Quota-full outcomes", "Completed surveys", "Quality flags", "Excluded submissions", "Accepted completions", "Final deliverable counts"],
  mix: [
    ["Screen-outs", 38],
    ["Quota full", 6],
    ["Completes", 50],
    ["Drop-offs", 6],
  ],
};

const QP5_PRIVACY = [
  ["Privacy notices", "Members are told what is collected and why.", "doc"],
  ["Consent", "Participation is voluntary and consent is recorded.", "check"],
  ["Purpose limitation", "Information is used for research, not for selling to members.", "target"],
  ["Data minimisation", "We ask only what a study or profile needs.", "layers"],
  ["Account security", "Members' accounts are protected and monitored.", "lock"],
  ["Access controls", "Only people who need data for a project can see it.", "id"],
  ["Data retention", "Data is kept for a defined period, then removed.", "clock"],
  ["Respondent rights", "Members can view, update or delete their details.", "user"],
  ["Confidentiality", "Answers are reported in aggregate, not by name.", "eye"],
  ["Sensitive health information", "Health data gets extra care and tighter access.", "heart"],
  ["Security governance", "Policies follow our ISO/IEC 27001:2013 information security management system.", "shield"],
];
const QP5_FLOW = ["Respondent", "Panel platform", "Controlled processing", "Research delivery"];

const QP5_RING = [
  ["Monitor recruitment", "Watch how each recruitment source performs.", "eye"],
  ["Review behaviour", "Look at how respondents take part over time.", "users"],
  ["Evaluate outcomes", "Check quality results project by project.", "chart"],
  ["Investigate problems", "Find the cause of anything that keeps recurring.", "search"],
  ["Find improvements", "Agree what would prevent it next time.", "spark"],
  ["Refine procedures", "Update screening and quality steps.", "layers"],
  ["Monitor again", "Confirm the change worked.", "target"],
  ["Document actions", "Record what was changed and why.", "doc"],
];

const QP5_FAQ = [
  ["How does Frequent Research recruit respondents?", "Through our own panels, Turn2Opinion, MyFrequentRewards and MyHealthOpinions, using approved recruitment channels suited to each audience. Every member joins through an individual account, verifies contact details and completes a profile before being invited to studies."],
  ["What is the difference between Turn2Opinion and MyFrequentRewards?", "Both are research communities for consumers, business professionals and teens aged 13 to 17 (with a parent or guardian’s permission). They reach members through different recruitment channels and communities, which helps projects find the right mix of people and avoids relying on a single source."],
  ["How are B2B respondents qualified?", "Professional members are profiled on industry, company size, job title, seniority and decision-making responsibility. Each study then adds its own screener questions, and answers are compared with the member's profile for consistency."],
  ["How are consumer respondents profiled?", "Members describe their household, age, location, work, education and the categories they buy and use. Profiles are updated over time so invitations stay relevant."],
  ["How are healthcare professionals verified?", "Healthcare professionals are profiled on specialty, practice setting, experience and location. Registration or licence checks are applied where they are available and appropriate, and study screeners confirm the details each project needs."],
  ["How are patients recruited?", "Patients join voluntarily, give consent and answer condition-specific screening questions. Medical history is self-reported and handled as sensitive information; it is not independently medically verified."],
  ["How are caregivers screened?", "Caregivers are qualified on their relationship to the person they care for, how long they have been caring, the kind of help they give and whether they are family, unpaid or professional caregivers."],
  ["What helps prevent duplicate participation?", "Account details, contact verification and technical indicators are reviewed together to identify one person holding several accounts, and duplicate completes are removed before delivery."],
  ["How are suspicious registrations identified?", "Automated checks such as CAPTCHA, contact verification and technical risk signals are combined with profile consistency checks. Borderline cases go to manual review."],
  ["How does survey eligibility screening work?", "Invitations go to members whose profile fits the study, and the survey's own screener confirms eligibility at the start. People who do not qualify are screened out politely and are not counted as completes."],
  ["What is respondent quality scoring?", "A way of summarising how reliable a member's participation has been, based on verification, consistency, attention, written answers and history. It helps decide who is invited and when extra checks are needed."],
  ["How does the 0–200 quality-score framework work?", "On this page it is shown as an illustrative model: several factors each contribute up to a set number of points, and the total falls into a band. Actual scores and thresholds follow each panel's operational rules."],
  ["Are quality points the same as reward points?", "No. Quality points describe how reliable participation has been. Reward points are incentives earned for eligible participation. One does not buy or replace the other."],
  ["How does survey history influence evaluation?", "Past outcomes, such as validated completes, reviews and attention-check results, are read together, so one unusual survey does not define a member and a pattern of problems is not ignored."],
  ["How are attention checks used?", "A few fair, clearly worded checks are placed in a questionnaire. Results are considered alongside timing and answers rather than as an automatic pass or fail."],
  ["How are speeding and straight-lining assessed?", "Interview length is compared with a realistic time for the route the respondent took, and grids are checked for patterned answering. Both are signals for review, not automatic exclusions."],
  ["How are open-ended answers reviewed?", "Written answers are read for relevance and sense. Gibberish, off-topic text, copied answers and text that looks machine-generated are flagged."],
  ["What happens when a response is flagged?", "It is reviewed in context. It may be accepted, sent back for a closer look, or excluded. A flag alone does not establish fraud."],
  ["How are reward claims validated?", "Rewards are released for validated participation. Claims go through account and transaction review before payment, under the panel's published rules."],
  ["How is sensitive healthcare information protected?", "Health data is collected only with consent and only when a study needs it, access is limited, and results are reported in aggregate."],
  ["What quality reporting can clients receive?", "Field reports can cover invitations, starts, screen-outs, quota-fulls, completes, quality flags, exclusions and accepted completes, so the delivered count is fully reconciled."],
  ["Can clients request study-specific quality controls?", "Yes. Extra attention checks, open-end rules, timing thresholds or verification steps can be agreed at the start of a project."],
  ["How are rejected responses handled?", "They are removed from the delivered data, recorded in the reconciliation and taken into account in the member's quality history."],
  ["How are respondents requalified?", "Members are asked to update their profiles over time, and studies re-confirm key details in their screeners."],
  ["How can clients request more quality documentation?", "Ask your project manager or write to info@frequentresearch.com. Our ESOMAR 37 answers and this quality process are available on request."],
];

const QP5_HERO = {
  h: "Research quality starts with *real people.*",
  sub: "Three specialised panels. One commitment to authentic research.",
  d: "At Frequent Research, quality begins long before a respondent completes a survey. Responsible recruitment, relevant profiling, identity checks, participation monitoring and continuous quality assessment work together so clients can rely on what people tell them.",
};

export { QP5_B2B, QP5_B2C, QP5_BANDS, QP5_DASH, QP5_FACTORS, QP5_FAQ, QP5_FLAG_NOTE, QP5_FLOW, QP5_HC, QP5_HERO, QP5_HISTORY, QP5_JOURNEY, QP5_OUTCOMES, QP5_PANELS, QP5_PILLARS, QP5_PIPE, QP5_POINTS, QP5_PRIVACY, QP5_REPORT, QP5_REWARDS, QP5_RING, QP5_SCORE_NOTE, QP5_SHIELD, QP5_SHOTS, QP5_WALLET };
