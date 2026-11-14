/**
 * All page copy lives here so the marketing team can edit text without touching layout code.
 * Images are imported in src/assets/screens/index.js and referenced by key (e.g. "dashboard").
 *
 * Rule for this file: every claim must be something SampCode actually does today.
 * Do not add customer counts, percentages or competitor names without a source.
 */

export const site = {
  productName: 'SampCode',
  company: 'Sampledge',
  tagline: 'Write. Run. Ship.',
  // Where the main buttons go. Change these to your real demo form / contact page.
  demoUrl: '/lets-talk?type=demo&product=SampCode',
  contactUrl: '/lets-talk?product=SampCode',
  sampledgeUrl: 'https://www.sampledge.com',
};

export const nav = [
  { label: 'Platform', href: '#lifecycle' },
  { label: 'Why SampCode', href: '#different' },
  { label: 'Tour', href: '#tour' },
  { label: 'Fieldwork', href: '#modes' },
  { label: 'Compare', href: '#compare' },
  { label: 'Security', href: '#security' },
];

export const hero = {
  eyebrow: 'Introducing SampCode by Sampledge',
  words: ['Write.', 'Run.', 'Ship.'],
  lead: 'The market research platform that',
  rotating: ['programs your survey', 'tests every route', 'fields it online, face to face and by phone', 'scores every interview', 'analyses the results'],
  sub: 'One workspace for survey programming, QA, hosting, fieldwork, data quality and analysis. Built by a sample company, for the people who run real studies.',
  primaryCta: 'Book a demo',
  secondaryCta: 'Take the tour',
  chips: ['AI survey architect', 'Simulated-respondent QA', 'Vendor redirects built in', '0–100 quality score', 'Offline CAPI', 'CATI dialer'],
};

export const marquee = [
  'AI Survey Architect',
  'Word & Excel import',
  'Visual, JSON & XML editors',
  'Question bank',
  'Loops & blocks',
  'Logic check',
  'Simulated respondents',
  'Saved test cases',
  'Translations with human review',
  'Glossary & translation memory',
  '16 respondent themes',
  'Quotas & least-fill',
  'Static & dynamic redirects',
  'Server-to-server callbacks',
  'SampTrek adapter',
  'Email & SMS waves',
  'Offline CAPI app',
  'GPS & recordings',
  'Back-checks & appeals',
  'CATI call lists',
  'Calling hours & do-not-call',
  'Twilio dialer',
  'Quality score 0–100',
  'VPN & proxy check',
  'Review queue',
  'Crosstabs with significance',
  'Rim weighting',
  'MaxDiff',
  'Conjoint',
  'AI research assistant',
  'Dashboards',
  'CSV & Excel export',
  'Automation rules',
  'SSO (OIDC & SAML)',
  'SCIM',
  'Audit log',
  'API keys & webhooks',
  'Data residency',
  'Android & iOS app',
];

/** The lifecycle storyline. `accent` drives the colour grading of each chapter. */
export const lifecycle = {
  kicker: 'One platform, the whole study',
  title: 'From first question to final chart, without changing tools',
  sub: 'Every step of a study happens in the same place, on the same survey definition. Nothing gets copied between systems, so nothing gets lost on the way.',
  stages: [
    {
      id: 'write',
      step: '01',
      name: 'Write',
      accent: '#22D3EE',
      title: 'Program surveys by hand, from a file, or with AI',
      body: 'Describe the study and the AI Survey Architect drafts it. Import an existing Word or Excel questionnaire. Then refine it in the visual editor, the JSON view or the XML programmer workspace, with a question bank, loops, blocks and variables.',
      points: ['AI drafts arrive as change sets you review', 'Visual, JSON and XML views of one definition', 'Question bank and reusable templates'],
      image: 'surveyBuild',
    },
    {
      id: 'test',
      step: '02',
      name: 'Test',
      accent: '#B8F35A',
      title: 'Catch logic errors before a respondent does',
      body: 'The logic check runs on every save, and a survey with errors cannot be published. The QA Laboratory sends simulated respondents down every route, reports coverage and defects, and keeps your test cases for the next version.',
      points: ['Publishing blocked until the check passes', 'Simulated respondents with coverage and defects', 'Preview on desktop, tablet and phone'],
      image: 'qaLab',
    },
    {
      id: 'localise',
      step: '03',
      name: 'Localise',
      accent: '#FFB547',
      title: 'Every language, every brand, every device',
      body: 'Translate with AI and keep a human reviewer in the loop, backed by a glossary and translation memory. Pick one of 16 respondent themes or build your own, and set rules per device.',
      points: ['Human review for every translation', 'Glossary and translation memory', '16 respondent themes'],
      image: 'designThemes',
    },
    {
      id: 'field',
      step: '04',
      name: 'Field',
      accent: '#FF7AB6',
      title: 'Online, face to face and by phone, from one survey',
      body: 'Send vendor links with static or dynamic redirects and server-to-server callbacks, invite your own contacts by email and SMS, run interviews offline in the CAPI app, or work a CATI call list with a built-in dialer.',
      points: ['Redirects and S2S callbacks for every vendor', 'Quotas with least-fill routing', 'Email and SMS waves with reminders'],
      image: 'distribution',
    },
    {
      id: 'protect',
      step: '05',
      name: 'Protect',
      accent: '#A78BFA',
      title: 'A quality score on every single complete',
      body: 'Each interview gets a 0–100 score with plain-language reasons: speeding, straightlining, low-effort open ends, duplicate devices, VPN and data-centre networks. Low scores go to a review queue, and nothing is rejected silently.',
      points: ['Reasons a reviewer can read', 'VPN, proxy and data-centre check', 'Review queue with evidence'],
      image: 'quality',
    },
    {
      id: 'analyse',
      step: '06',
      name: 'Analyse',
      accent: '#38BDF8',
      title: 'Answers you can present the same day',
      body: 'Frequencies and crosstabs with significance testing, rim weighting, saved reports and dashboards. Run MaxDiff and conjoint, ask the AI research assistant a question, or export to CSV and Excel.',
      points: ['Crosstabs with significance', 'Rim weighting', 'MaxDiff, conjoint and AI research assistant'],
      image: 'analysisDashboard',
    },
    {
      id: 'automate',
      step: '07',
      name: 'Automate',
      accent: '#5EEAD4',
      title: 'Rules that keep fieldwork moving at 3 a.m.',
      body: 'Trigger, conditions, actions: notify the team, send an email, call a webhook, or pause a survey when something happens. Data residency and retention erasure keep the governance team happy.',
      points: ['Rules on events or schedules', 'Webhooks and notifications', 'Residency and retention policies'],
      image: 'automation',
    },
  ],
};

/** "Built different" bento. `demo` picks the small live animation inside the card. */
export const different = {
  kicker: 'Why SampCode',
  title: 'Built different, on purpose',
  sub: 'SampCode was designed inside Sampledge, a company that runs sample and fieldwork every day. These are the decisions that came from that.',
  cards: [
    {
      demo: 'changeset',
      size: 'wide',
      title: 'AI that proposes. You approve.',
      body: 'AI drafts, imports and translations never edit your survey directly. They arrive as a change set you can read line by line, accept or throw away.',
    },
    {
      demo: 'logic',
      title: 'Nothing goes live broken',
      body: 'The logic check runs on every save. If it finds an error, the Publish button stays locked.',
    },
    {
      demo: 'redirect',
      title: 'Born at a sample company',
      body: 'Complete, screen-out, over-quota and quality-fail redirects, S2S callbacks and a SampTrek adapter are part of the core, not a plug-in.',
    },
    {
      demo: 'modes',
      title: 'One survey, every mode',
      body: 'The same definition runs online, in the offline CAPI app and on CATI calls. One dataset at the end.',
    },
    {
      demo: 'score',
      size: 'tall',
      title: 'Every complete is scored',
      body: 'A 0–100 score with the reason for every point taken off. Reviewers see why, decide, and the vendor gets the right outcome.',
    },
    {
      demo: 'research',
      size: 'wide',
      title: 'Advanced research methods, built in',
      body: 'MaxDiff, conjoint, rim weighting, recodes and an experimental webcam eye-tracking question live next to your crosstabs, so the analysis never leaves the platform.',
    },
    {
      demo: 'keys',
      title: 'Your keys, your cloud',
      body: 'Connect Claude, Twilio, Deepgram, IPinfo, Stripe and S3 from Settings. Keys are sealed in your database, never in a vendor’s.',
    },
    {
      demo: 'admin',
      size: 'wide',
      title: 'One console for every client organization',
      body: 'A super admin console manages organizations, subscription plans and which features each organization and member can use, on the web and in the mobile app. Changes apply live.',
    },
  ],
};

export const tour = {
  kicker: 'Product tour',
  title: 'Take a look inside',
  sub: 'Real screens from the SampCode studio. Click a tab, or let the tour play.',
  tabs: [
    { id: 'dashboard', label: 'Dashboard', image: 'dashboard', caption: 'The home screen: live projects, completes, QA pass rate and the survey journey at a glance.' },
    { id: 'builder', label: 'Survey builder', image: 'surveyBuild', caption: 'Pages, questions, terminations and quotas, with the logic check alongside.' },
    { id: 'programmer', label: 'XML programmer', image: 'programmerXml', caption: 'A full programmer workspace for people who prefer to write code.' },
    { id: 'debugger', label: 'Debugger', image: 'debugger', caption: 'Step through a respondent’s route and watch the variables change.' },
    { id: 'qa', label: 'QA lab', image: 'qaLab', caption: 'Simulated respondents, coverage and defects before launch.' },
    { id: 'quality', label: 'Quality & fieldwork', image: 'quality', caption: 'Fieldwork numbers, the review queue and quality settings for the survey.' },
    { id: 'analysis', label: 'Analysis', image: 'crosstab', caption: 'Crosstabs with significance testing and saved reports.' },
    { id: 'integrations', label: 'Integrations', image: 'integrations', caption: 'Connect Claude, IPinfo, Deepgram, Twilio, Stripe and S3 from the studio.' },
  ],
};

export const quality = {
  kicker: 'See the score work',
  title: 'Turn on a fraud signal. Watch the score react.',
  sub: 'These are real checks with the points SampCode takes off for each. Completes below your review threshold go to a person, not to the bin.',
  threshold: 70,
  // Penalties match packages/quality-core/src/assess.ts in the product.
  signals: [
    { id: 'speeder', label: 'Speeding', detail: 'Finished far faster than the median', penalty: 35 },
    { id: 'straightline', label: 'Straightlining', detail: 'Same answer down a whole grid', penalty: 15 },
    { id: 'gibberish', label: 'Gibberish open end', detail: 'Random keys in a text answer', penalty: 20 },
    { id: 'device', label: 'Duplicate device', detail: 'Device already answered this survey', penalty: 25 },
    { id: 'vpn', label: 'VPN or proxy', detail: 'Anonymous network detected', penalty: 30 },
    { id: 'honeypot', label: 'Bot trap filled', detail: 'A hidden field people cannot see', penalty: 60 },
  ],
};

export const modes = {
  kicker: 'Fieldwork, every way',
  title: 'Reach people wherever they answer',
  items: [
    {
      id: 'online',
      name: 'Online',
      title: 'Panels and your own lists',
      body: 'Vendor links with redirects and callbacks, plus email and SMS waves to your contacts with reminders and unsubscribe.',
      image: 'respondentPhone',
      phone: true,
      accent: '#22D3EE',
    },
    {
      id: 'capi',
      name: 'Face to face',
      title: 'Offline CAPI app',
      body: 'Interviewers work with no connection and sync later. GPS, audio and photo evidence, back-checks and appeals included.',
      mockup: 'capi',
      accent: '#FFB547',
    },
    {
      id: 'cati',
      name: 'Phone',
      title: 'CATI with a dialer',
      body: 'Call lists, queue and dispositions, calling hours, a do-not-call list, and click-to-call that keeps the number hidden.',
      mockup: 'cati',
      accent: '#FF7AB6',
    },
  ],
};

/** Comparison is written against common approaches, not named companies. */
export const compare = {
  kicker: 'How SampCode is different',
  title: 'One workspace instead of a stitched-together stack',
  sub: 'Many research teams run a study across several tools: one to program, one to field, a spreadsheet for QA, another tool for tables. Here is what changes.',
  scattered: ['Survey tool', 'Redirect scripts', 'CAPI app', 'Dialer', 'QA spreadsheet', 'Fraud add-on', 'Translation emails', 'Tab software', 'Automation scripts'],
  rows: [
    { need: 'Programming', usual: 'One editor, or code only', ours: 'AI drafts, file import, visual, JSON and XML views of one definition' },
    { need: 'Testing', usual: 'Click through by hand, track bugs in a sheet', ours: 'Logic check on every save, simulated respondents, saved test cases' },
    { need: 'AI', usual: 'Generated text you paste in', ours: 'Reviewable change sets, with your own Claude key' },
    { need: 'Sample vendors', usual: 'Redirect links set up by hand per vendor', ours: 'Static and dynamic redirects, S2S callbacks, SampTrek adapter' },
    { need: 'Face to face & phone', usual: 'Separate CAPI and CATI systems, data merged later', ours: 'Offline CAPI app and CATI dialer on the same survey' },
    { need: 'Data quality', usual: 'Cleaned at the end, reasons undocumented', ours: '0–100 score with reasons on every complete, review queue' },
    { need: 'Analysis', usual: 'Export, then a separate tab tool', ours: 'Crosstabs with significance, weighting, MaxDiff, conjoint, dashboards' },
    { need: 'Governance', usual: 'Policies on paper', ours: 'SSO, SCIM, audit log, row-level security, residency and retention' },
  ],
};

export const mobile = {
  kicker: 'In your pocket',
  title: 'The studio, on Android and iOS',
  body: 'Check fieldwork, read the review queue, look at analysis and run QA from your phone. Administrators decide live which features each organization and member can use on the web and on mobile.',
  points: ['Dashboard, projects and analysis', 'Review queue and QA on the go', 'Features switched on or off live, per member'],
  images: ['mobileDashboard', 'mobileAnalysis', 'mobileReview'],
};

export const security = {
  kicker: 'Enterprise ready',
  title: 'Security your IT team will sign off',
  items: [
    { icon: 'KeyRound', title: 'Single sign-on', body: 'OpenID Connect and SAML per organization.' },
    { icon: 'Users', title: 'SCIM provisioning', body: 'Create and disable members from your identity provider.' },
    { icon: 'ShieldCheck', title: 'Row-level security', body: 'Each organization’s data is separated inside PostgreSQL.' },
    { icon: 'ScrollText', title: 'Audit log', body: 'Who did what, and when, for every important action.' },
    { icon: 'Webhook', title: 'API keys and webhooks', body: 'Scoped keys and signed events for your own systems.' },
    { icon: 'Globe2', title: 'Residency and retention', body: 'Keep data in the region you choose and erase it on schedule.' },
    { icon: 'LockKeyhole', title: 'Sealed secrets', body: 'Provider keys are encrypted in the database.' },
    { icon: 'Cloud', title: 'Runs on AWS', body: 'Terraform, WAF, autoscaling and backups, ready for go-live.' },
  ],
};

export const cta = {
  title: 'Ready to write, run and ship your next study?',
  sub: 'See SampCode on your own questionnaire. We will program it with you in the first call.',
  primary: 'Book a demo',
  secondary: 'Talk to Sampledge',
};

export const footer = {
  blurb: 'SampCode is the survey programming, fieldwork and analysis platform by Sampledge.',
  columns: [
    { title: 'Platform', links: [['Lifecycle', '#lifecycle'], ['Product tour', '#tour'], ['Fieldwork', '#modes'], ['Security', '#security']] },
    { title: 'Company', links: [['Sampledge', 'https://www.sampledge.com'], ['Contact', 'https://www.sampledge.com/contact']] },
  ],
};
