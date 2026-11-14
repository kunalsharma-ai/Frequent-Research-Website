/**
 * Product screenshots, keyed by the names used in src/content.js.
 * To replace one: drop a new PNG into assets-src/screens with the same name, run `npm run images`.
 */
import dashboard from './dashboard.webp';
import surveyBuild from './survey-build.webp';
import programmerXml from './programmer-xml.webp';
import debugger_ from './debugger.webp';
import qaLab from './qa-lab.webp';
import designThemes from './design-themes.webp';
import distribution from './distribution.webp';
import quality from './quality.webp';
import quotasData from './quotas-data.webp';
import crosstab from './crosstab.webp';
import analysisDashboard from './analysis-dashboard.webp';
import frequencies from './frequencies.webp';
import integrations from './integrations.webp';
import automation from './automation.webp';
import project from './project.webp';
import preview from './preview.webp';
import respondentPhone from './respondent-phone.webp';
import capiLogin from './capi-login.webp';
import mobileDashboard from './mobile-02-dashboard.webp';
import mobileOverview from './mobile-05-survey-overview.webp';
import mobileAnalysis from './mobile-06-analysis.webp';
import mobileReview from './mobile-07-review-queue.webp';

export const screens = {
  dashboard,
  surveyBuild,
  programmerXml,
  debugger: debugger_,
  qaLab,
  designThemes,
  distribution,
  quality,
  quotasData,
  crosstab,
  analysisDashboard,
  frequencies,
  integrations,
  automation,
  project,
  preview,
  respondentPhone,
  capiLogin,
  mobileDashboard,
  mobileOverview,
  mobileAnalysis,
  mobileReview,
};

/** Alt text for every screenshot (accessibility and SEO). */
export const screenAlt = {
  dashboard: 'SampCode dashboard with projects, live surveys, responses and the survey journey',
  surveyBuild: 'SampCode survey builder with pages, questions, terminations and the logic check',
  programmerXml: 'SampCode XML programmer workspace',
  debugger: 'SampCode debugger stepping through a respondent route',
  qaLab: 'SampCode QA Laboratory report with simulated respondents and full coverage',
  designThemes: 'SampCode design studio with respondent themes and device preview',
  distribution: 'SampCode distribution tab with vendor links and field status',
  quality: 'SampCode quality and fieldwork tab with starts, completes, incidence and average quality',
  quotasData: 'SampCode quotas and response data',
  crosstab: 'SampCode crosstab with significance testing',
  analysisDashboard: 'SampCode analysis dashboard with donut and bar charts',
  frequencies: 'SampCode frequency tables',
  integrations: 'SampCode integrations settings for Claude, IPinfo and Deepgram',
  automation: 'SampCode automation rules',
  project: 'SampCode project with surveys and sample vendors',
  preview: 'SampCode survey preview',
  respondentPhone: 'A respondent answering a SampCode survey on a phone',
  capiLogin: 'SampCode Interviewer offline app sign-in',
  mobileDashboard: 'SampCode mobile app home screen',
  mobileOverview: 'SampCode mobile app survey overview',
  mobileAnalysis: 'SampCode mobile app analysis',
  mobileReview: 'SampCode mobile app review queue',
};
