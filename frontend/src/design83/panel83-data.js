/*
 * Build 83 (Kunal, 21 Nov 2026, "Complete Website Redesign & Team Panel Integration"; "Team" = the Teen panel):
 * Consumers, Professionals and Teens shown as three equal ways to take part in Turn2Opinion and MyFrequentRewards.
 *
 * SOURCE OF TRUTH — every line below comes from one of these, nothing is invented:
 *   [T]  Minor Research Participation Terms & Parental Consent Agreement MINOR-2026.10 (19 sections, Parts A–D),
 *        in Kunal's mfr-minor-terms v2.0.1 / t2o-minor-terms packages (src/content/terms.js)
 *   [S]  MFR minor suite v2.0.0 / T2O minor suite v1.0.1 (README, INTEGRATION, API, DATA-DICTIONARY, EMAIL-REMINDERS)
 *   [K]  Kunal's teen registration process (21 Nov 2026), /mnt/project-files/build82.9/teen-panel-context.md
 *   [W]  the existing website (PORTALS in app/data/site.jsx, the T2O / MFR / Portals pages)
 * Open questions and contradictions are listed in docs/go-live/24-BUILD-83.md ("Gaps to confirm").
 *
 * The website explains the process only. No sign-up, login or registration screen is built here (Kunal 21 Nov:
 * "no new registration screens built at all"); every join button goes to the existing panel or teen page.
 */

export const TEEN_URL = {
  turn2opinion: 'https://www.turn2opinion.com/teen/',
  myfrequentrewards: 'https://www.myfrequentrewards.com/paid-surveys-for-teens',
};
export const TEEN_NAME = { turn2opinion: 'Turn2Opinion Teen panel', myfrequentrewards: 'MyFrequentRewards Teens' };

/* ---------- the three categories [W][T][K] ---------- */
export const CATS = [
  {
    k: 'consumer', ic: 'user', t: 'Consumers', age: 'Adults 18+',
    lead: 'Everyday people sharing opinions on the products, services and brands they use.',
    need: ['An active email address and contact number', 'Email and phone verification', 'Accurate profile answers'],
    studies: ['Shopping and brands', 'Technology and apps', 'Food and lifestyle', 'Travel and entertainment'],
    reward: 'Eligible, completed surveys earn reward points you redeem once you reach the threshold.',
  },
  {
    k: 'pro', ic: 'brief', t: 'Professionals', age: 'Adults 18+, in work',
    lead: 'Business professionals and decision-makers sharing what they see at work.',
    need: ['The same free sign-up and verification', 'Work profile: role, industry and company', 'Honest screening answers about your role'],
    studies: ['Business products and services', 'Technology and software decisions', 'Work and industry topics', 'Some studies are open only to certain roles'],
    reward: 'Points work the same way as consumer surveys. Some business studies are open only to certain job roles.',
  },
  {
    k: 'teen', ic: 'teen', t: 'Teens', age: 'Ages 13–17',
    lead: 'Teens sharing views on what they use every day, with a verified parent or legal guardian’s permission.',
    need: ['A parent or legal guardian who gives permission', 'The parent’s permission verified from their own email', 'The teen’s own yes'],
    studies: ['Games, music and creators', 'Phones, apps and study apps', 'Snacks, trainers and sport', 'Only studies reviewed as suitable for their age'],
    reward: 'Eligible surveys may offer points or vouchers. Where required, rewards go through a verified guardian-managed payout.',
  },
];

/* ---------- Teen panel: what and why [T §2, §5, §7, §8] [K] ---------- */
export const TEEN_WHY = [
  ['spark', 'Your views count', 'Brands and organisations use research to understand what people think. Teen studies cover the things teens use every day.'],
  ['shield', 'Checked for your age', 'Every teen study is assessed for suitability first. Never alcohol, gambling, dating or adult topics.'],
  ['heart', 'Always your choice', 'You choose each survey, can skip questions where the survey allows, and can stop at any time.'],
  ['gift', 'Rewards for eligible surveys', 'Some surveys offer points or vouchers. What you can earn is shown before you start.'],
];

/* ---------- Teen panel: requirements [K] [S data dictionary] [T Part B] ---------- */
export const TEEN_REQ = [
  {
    who: 'The teen', ic: 'teen',
    must: ['Age 13 to 17 (a date of birth from 13 to 17 switches any sign-up to the teen route)', 'Name and date of birth', 'Email address (used as the username)', 'Gender, country, state or region, city and postcode', 'The registration consent ticks', 'Their own yes to taking part'],
    opt: ['Phone number'],
  },
  {
    who: 'The parent or legal guardian', ic: 'users',
    must: ['Mother, father or legal guardian, aged 18 or over, with their own email', 'About you: first name, gender, date of birth, country and region', 'Household: relationship to the teen, marital status, how many teens aged 13 to 17 they parent', 'Confirmation that they are legally authorised to give permission', 'Contact: language, how to contact them, email, and whether they want panel administration messages', 'Three permissions: participation, privacy acknowledgement, contact and verification', 'A click on the verification link sent to their own email'],
    opt: ['Middle and last name', 'Mobile number (required only if SMS, call or WhatsApp is chosen)', 'The teen’s health section (it can be skipped as a whole)', 'Study updates, recordings and sensitive topics: separate permissions, asked only when such an activity is proposed'],
  },
];

/* ---------- Teen panel: the 12-step journey [K] [S INTEGRATION §1, §6] [T Part B, C] ---------- */
export const TEEN_JOURNEY = [
  ['teen', 'Teen', 'Starts the sign-up', 'On Turn2Opinion or MyFrequentRewards. A date of birth from 13 to 17 opens the teen route automatically. Under 13 cannot join; 18 and over use the normal sign-up.'],
  ['user', 'Teen', 'Adds their details', 'Name, date of birth, email, gender and where they live. Phone is optional.'],
  ['users', 'Teen', 'Names a parent or guardian', 'Mother, father or legal guardian, with their own email address.'],
  ['check', 'Teen', 'Ticks the registration consent', 'Then a “what happens next” page explains the rest. Emails go to the teen and to the parent.'],
  ['mail', 'Parent', 'Answers Yes or No by email', 'A clear Yes / No in the email. Choosing No asks why, and the registration stops.'],
  ['clipboard', 'Parent', 'Completes “About you”', 'A short registration survey about the parent, the household and how to stay in touch. The teen health section is optional.'],
  ['book', 'Parent', 'Reads the agreement and gives permission', 'All 19 sections of the teen research terms, then three required permissions and any optional ones that apply.'],
  ['hand', 'Teen', 'Gives their own yes or no', 'A parent’s yes never overrides a teen’s no. A no stops everything and no guardian data is stored.'],
  ['lock', 'Parent', 'Verifies from their own email', 'A single-use link is sent to the parent’s email. The account stays locked until it is clicked.'],
  ['key', 'Frequent Research', 'Checks and opens the account', 'Opened only when the age, the terms, the verified parent permission and the teen’s yes are all in place. The parent can download the consent record as a PDF.'],
  ['spark', 'Teen', 'Signs in for the first time', 'The teen gets a link to set a password (the username is their email), signs in and answers a short welcome survey.'],
  ['star', 'Teen + parent', 'Profiles, then suitable studies', '13 teen profile topics and 3 parent profiles. Each study shows its topic, time, reward and any extra permission before it starts.'],
];

/* ---------- If it does not complete, or the teen is not eligible [S API, EMAIL-REMINDERS] [T §1, §6, §19] [K] ---------- */
export const TEEN_IF = [
  ['Under 13', 'Cannot join. No account is created and no details are kept. They are welcome from their 13th birthday.'],
  ['18 or over', 'Uses the normal Consumer or Professional sign-up. A teen member who turns 18 is moved to the adult terms and consent process where required.'],
  ['The parent has not answered yet', 'The account stays locked. Reminders are sent at most every 48 hours, up to 8 times. An invitation link lasts 7 days, and a fresh one can be sent without the teen starting again.'],
  ['The parent says No', 'Registration stops. The registration answers are deleted and only the refusal is kept.'],
  ['The parent is not sure they are legally authorised', 'The application is held for a manual review. If they are not authorised, it stops until an authorised parent or guardian takes part.'],
  ['The teen says no', 'Everything stops and no guardian data is stored. Saying no is always okay.'],
  ['The verification link is not clicked', 'The permission stays pending and the account stays locked. The link can be sent again.'],
  ['Local law needs more', 'Some countries set a higher age or ask for extra steps. Local law comes first, and Frequent Research may decline to enrol where participation cannot be lawful and safe.'],
];

/* ---------- Consent, for every category [T §3–6, §10, §12, Part B, C, D] [W] ---------- */
export const CONSENT = [
  {
    k: 'adult', t: 'Consumers and professionals', ic: 'user',
    pts: ['You give your own consent when you register and accept the panel’s terms and privacy policy.', 'Taking part is voluntary: you choose each survey and can stop at any time.', 'Your account is yours alone. Nobody can consent or take part on your behalf.'],
  },
  {
    k: 'teen', t: 'Teens: two separate yeses', ic: 'teen',
    pts: ['The parent or guardian gives permission, verified from their own email.', 'The teen gives their own yes. A parent’s yes never overrides a teen’s no.', 'Permission covers only the teen named in that registration. Each teen registers separately and needs their own permission.', 'A parent must never give permission for another family’s child.'],
  },
  {
    k: 'study', t: 'Every study: asked again', ic: 'clipboard',
    pts: ['Joining the panel is registration consent. It does not cover every future study.', 'Before each survey you see its title, purpose, topics, length, what is collected, who receives it, the reward, any risks and the support contact.', 'Recordings, photos, identifiable quotes and sensitive topics such as health always need a separate explanation and permission first.'],
  },
];
export const DUTIES = [
  ['Give true details', 'Your real age, country and profile answers. Studies are matched on them.'],
  ['One person, one account', 'No duplicate accounts and no sharing a login. One teen, one account.'],
  ['Answer honestly', 'Read each question and answer for yourself. Quality checks look for rushed or copied answers.'],
  ['Keep your profile current', 'Update it when your life or work changes.'],
  ['Parents: stay involved', 'Help your teen use the panel safely, and contact support with any concern.'],
];

/* ---------- Privacy for teens [T §9, §11, §12] [S data dictionary] ---------- */
export const TEEN_PRIVACY = {
  kept: ['Age or age band, country and region', 'Survey answers and eligibility information', 'A participant ID and limited account details', 'Invitations, completion and reward records', 'The parent’s contact and permission records', 'Technical and security information needed to run the panel'],
  never: ['A full date of birth (only the age is stored)', 'A school name (only the stage of education)', 'A street address (only country and region)', 'GPS or precise location', 'Photos, recordings or quotes without separate permission'],
  note: 'Clients receive research findings, as combined or de-identified results where practicable. A parent and teen can each read the other’s profile answers, and each answers only their own.',
};

/* ---------- Rewards for teens [T §7, §14] ---------- */
export const TEEN_REWARDS = [
  'Eligible surveys may offer points, gift vouchers or other rewards, and the reward is shown before you start.',
  'Points are not cash. They are redeemed under the published reward programme of the panel.',
  'Redemption thresholds, methods and processing times can differ by country and age group.',
  'Where a payment provider or the law requires it, rewards go through a verified guardian-managed payout. You are told who receives the reward before a redemption is completed.',
  'A teen is not asked to open a bank, wallet or email account where another approved option exists.',
  'There is no guaranteed number of surveys or rewards, and rewards are never used to pressure anyone.',
];

/* ---------- Quality assurance, visible [W T2O_QPIPE, Portals page] [T §3, §8, §16] ---------- */
export const QUALITY = [
  ['user', 'Registration', 'Free sign-up with true details. One account per person.', 'Teens: the parent or guardian is named at sign-up.'],
  ['check', 'Verification', 'Email and phone confirmed by link and one-time code.', 'Teens: the parent’s permission is verified from their own email.'],
  ['clipboard', 'Profiling', 'Profile surveys so invitations reach the right people.', 'Teens: 13 teen profiles, with answers never asked twice.'],
  ['search', 'Screening', 'Each study checks eligibility and quotas before it starts.', 'Teens: only studies assessed as suitable for their age.'],
  ['shield', 'In-survey checks', 'Checks for rushed, inconsistent or duplicate answers.', 'Teens: sensitive topics get extra review and permission, or teens are excluded.'],
  ['star', 'Review', 'Response quality is scored; low-quality and duplicate accounts are removed.', 'Teens: fraud, impersonation and false ages are looked into fairly.'],
];

/* ---------- Turn2Opinion vs MyFrequentRewards [W PORTALS] [S] ---------- */
export const COMPARE = [
  ['Who can join', 'Consumers, business professionals and decision-makers (18+), and teens 13–17', 'Consumers and business professionals (18+), and teens 13–17'],
  ['Teen page', 'turn2opinion.com/teen', 'myfrequentrewards.com/paid-surveys-for-teens'],
  ['Teen process and terms', 'The same: two yeses, verified parent permission, MINOR-2026.10 terms', 'The same: two yeses, verified parent permission, MINOR-2026.10 terms'],
  ['Rewards', 'PayPal, gift vouchers including Amazon, direct account transfer where available', 'PayPal, UPI, direct bank transfer, gift vouchers'],
  ['Threshold', 'The applicable redemption threshold in your account', '$15 for members (teen thresholds can differ by country and age group)'],
  ['Extras', 'Profiling and quality score programme', 'Welcome bonus points, members in 95+ countries'],
  ['Support', 'support@turn2opinion.com', 'support@myfrequentrewards.com'],
];

/* ---------- FAQs by category ---------- */
const FAQ_GENERAL = (p) => [
  { q: `Who can join ${p.name}?`, a: 'Three groups can take part: consumers aged 18 or over, business professionals aged 18 or over, and teens aged 13 to 17 with a verified parent or legal guardian’s permission. Under 13 cannot join.' },
  { q: 'Is it free?', a: 'Yes. Registration and membership are free, and you never have to buy anything to take part.' },
  { q: 'Am I guaranteed surveys or rewards?', a: 'No. Invitations depend on your profile, each study’s eligibility rules, quotas and availability. Rewards apply to eligible, completed participation.' },
  { q: 'Why am I sometimes screened out?', a: 'Each study looks for specific people. If your answers do not match its criteria, or a quota is already full, the survey ends early.' },
  { q: 'Can I have more than one account?', a: 'No. One person, one account. Duplicate accounts, shared logins or a false age can lead to the account being restricted.' },
  { q: 'Can I delete my account?', a: 'You can ask for your account to be deleted, subject to legal and operational requirements. Contact ' + p.support + '.' },
];
const FAQ_CONSUMER = [
  { q: 'What do I need to sign up as a consumer?', a: 'You must be 18 or over, with an active email address and contact number. You confirm both with a verification link and a one-time code.' },
  { q: 'What are consumer surveys about?', a: 'Products, services and brands you use: shopping, technology and apps, food and lifestyle, travel, entertainment and more.' },
  { q: 'How do I get more invitations?', a: 'Complete every profile section and keep it current. Better profile information means better-matched invitations.' },
];
const FAQ_PRO = [
  { q: 'Who counts as a professional?', a: 'Anyone aged 18 or over who is in work and can answer about their role, industry and company. Some studies are open only to certain job roles or decision-makers.' },
  { q: 'Why do business studies ask about my job?', a: 'Business research needs the right people. Your work profile and each study’s screening questions check that the study fits your role.' },
  { q: 'Do I need a separate account for work surveys?', a: 'No. You use one account. Your profile covers both your everyday life and your work, and invitations are matched to the studies you fit.' },
];
const FAQ_TEEN = (p) => [
  { q: 'Can teenagers join?', a: `Yes. Teens aged 13 to 17 can join the ${TEEN_NAME[p.slug] || 'Teen panel'} with a parent or legal guardian’s permission. A date of birth from 13 to 17 switches the sign-up to the teen route automatically.` },
  { q: 'What happens if my child is under 13?', a: 'They cannot join. No account is created and no details are kept.' },
  { q: 'What happens when a teen turns 18?', a: 'The adult terms and consent process are applied where required, and the member continues as a consumer or professional.' },
  { q: 'What topics are teen surveys about?', a: 'Age-appropriate topics such as games, music, snacks, trainers, phones, study apps, sport and creators. Never alcohol, gambling, dating or adult topics. Health and other sensitive topics need extra review and a separate permission.' },
  { q: 'Can a parent see the teen’s answers?', a: 'In the profile area, a parent can read the teen’s profile answers and the teen can read the parent’s. Each person answers only their own. Clients receive combined or de-identified results where practicable.' },
  { q: 'How long does the parent have to respond?', a: 'An invitation link lasts 7 days. Reminders are sent at most every 48 hours, up to 8 times, and a fresh link can be sent without the teen starting again.' },
];
const FAQ_CONSENT = [
  { q: 'Does one parent’s permission cover brothers and sisters?', a: 'No. Permission covers only the teen named in that registration. Each teen registers separately and needs their own permission and their own yes.' },
  { q: 'Does a parent’s yes mean the teen has to take part?', a: 'No. The teen gives their own yes or no, can decline any survey and can stop at any time. A parent’s yes never overrides a teen’s no.' },
  { q: 'Is joining the same as agreeing to every study?', a: 'No. Joining covers the panel only. Each study shows what it involves first, and recordings, photos, quotes or sensitive topics need a separate permission.' },
  { q: 'How is the parent’s permission checked?', a: 'Each permission is a separate choice, recorded with its time and the terms version. A single-use link sent to the parent’s own email then verifies it. The parent can download the consent record as a PDF.' },
  { q: 'Can permission be withdrawn?', a: 'Yes. A parent can withdraw permission at any time. Future participation then stops. Data that is already anonymised or part of combined findings may not be retrievable, and this is explained.' },
  { q: 'How is quality protected?', a: 'Registration, verification, profiling, study screening, in-survey checks and a quality review. Low-quality and duplicate accounts are removed.' },
];
const FAQ_REWARDS = (p) => [
  { q: 'How are rewards paid?', a: p.slug === 'myfrequentrewards' ? 'Once you reach the $15 threshold you can claim through PayPal, UPI, bank transfer or gift vouchers. Points that have not reached the threshold carry forward.' : 'Once you meet the applicable redemption threshold, you can claim by PayPal, gift vouchers including Amazon, or direct account transfer where available.' },
  { q: 'Who receives a teen’s rewards?', a: 'Where a payment provider or the law requires it, rewards go through a verified guardian-managed payout. You are told who will receive the reward before a redemption is completed.' },
  { q: 'Are points the same as cash?', a: 'No. Points are redeemed under the published reward programme. Thresholds and methods can differ by country and age group.' },
];
export function faqTabs(p, general) {
  return [
    ['general', 'General', general && general.length ? general : FAQ_GENERAL(p)],
    ['consumer', 'Consumers', FAQ_CONSUMER],
    ['pro', 'Professionals', FAQ_PRO],
    ['teen', 'Teens', FAQ_TEEN(p)],
    ['consent', 'Consent & quality', FAQ_CONSENT],
    ['rewards', 'Rewards', general && general.length ? FAQ_REWARDS(p).slice(1) : FAQ_REWARDS(p)],
  ];
}

/* ---------- Market research service pages: who takes part [T §8, §10, §12] [W] ---------- */
export const TAKE = {
  'quantitative-research': { k: 'Who answers our surveys', h: 'Consumers, professionals and teens, from our own panels', note: 'Teens aged 13 to 17 take part only in studies assessed as suitable for their age, with a verified parent’s permission and their own yes.' },
  'online-data-collection': { k: 'Who answers online', h: 'Three participant groups, one quality process', note: 'Online teen studies run only after an age-suitability review. Sensitive topics need extra review and a separate parent permission, or teens are excluded.' },
  'consumer-panel': { k: 'Consumer audiences', h: 'Adult consumers and teen consumers', note: 'Teen consumers (13 to 17) come from the Turn2Opinion and MyFrequentRewards teen panels. Each teen study is reviewed for age suitability and runs with the permissions it needs.' },
  'business-panel': { k: 'B2B audiences', h: 'Professionals and decision-makers, aged 18 and over', note: 'Business panel members are working adults. Teens are not invited to B2B studies.', only: ['pro'] },
  'healthcare-panel': { k: 'Healthcare audiences', h: 'Healthcare research runs on MyHealthOpinions', note: 'MyHealthOpinions has no teen panel. Health topics with teens are sensitive: they need extra review and a separate parent permission, or teens are excluded.', health: true },
  'qualitative-research': { k: 'Who joins focus groups and interviews', h: 'Recruited from consumers, professionals and teens', note: 'Teen focus groups and interviews need a study-specific suitability review. Audio, video, photos or identifiable quotes always need a separate explanation and permission first.' },
  'offline-data-collection': { k: 'Who we recruit for fieldwork', h: 'Consumers, professionals and teens', note: 'Any teen study, online or offline, is reviewed for age suitability first and runs only with the permissions it needs.' },
  cati: { k: 'Who we call', h: 'Recruited from our consumer and professional panels', note: 'Telephone studies with teens are agreed case by case: each needs an age-suitability review and the parent and teen permissions first.' },
  'research-design-cycle': { k: 'Recruitment', h: 'Three participant groups to design for', note: 'When a design includes teens (13 to 17), we plan the age-suitability review, the parent and teen permissions and any separate permissions from the start.' },
};
