/*
 * SampConnect (Sampledge), build 83.1. Source: Kunal's "sampconnect-showcase" HTML (21 Nov 2026), the product's own
 * showcase site. Every text below is taken from it (reworded only where noted); screenshots are its own, saved as
 * webp in src/assets/images/sampconnect/. "Coming soon" marks follow the source. Screens use a fictional demo workspace.
 */
import admin from '../../assets/images/sampconnect/admin.webp';
import ai from '../../assets/images/sampconnect/ai.webp';
import chat from '../../assets/images/sampconnect/chat.webp';
import analytics from '../../assets/images/sampconnect/analytics.webp';
import tasks from '../../assets/images/sampconnect/tasks.webp';
import booking from '../../assets/images/sampconnect/booking.webp';
import branding from '../../assets/images/sampconnect/branding.webp';
import files from '../../assets/images/sampconnect/files.webp';
import home from '../../assets/images/sampconnect/home.webp';
import inboxSup from '../../assets/images/sampconnect/inbox-supervisor.webp';
import inbox from '../../assets/images/sampconnect/inbox.webp';
import integrations from '../../assets/images/sampconnect/integrations.webp';
import signin from '../../assets/images/sampconnect/signin.webp';
import meetings from '../../assets/images/sampconnect/meetings.webp';
import minutes from '../../assets/images/sampconnect/minutes.webp';
import chatApproval from '../../assets/images/sampconnect/chat-approval.webp';
import network from '../../assets/images/sampconnect/network.webp';
import projects from '../../assets/images/sampconnect/projects.webp';
import search from '../../assets/images/sampconnect/search.webp';
import sync from '../../assets/images/sampconnect/sync.webp';
import mOffline from '../../assets/images/sampconnect/m-offline.webp';
import themes from '../../assets/images/sampconnect/themes.webp';
import themesGrid from '../../assets/images/sampconnect/themes-grid.webp';
import callCaptions from '../../assets/images/sampconnect/call-captions.webp';
import call from '../../assets/images/sampconnect/call.webp';
import mMessages from '../../assets/images/sampconnect/m-messages.webp';
import mChat from '../../assets/images/sampconnect/m-chat.webp';
import mTasks from '../../assets/images/sampconnect/m-tasks.webp';
import mAi from '../../assets/images/sampconnect/m-ai.webp';
import mActivity from '../../assets/images/sampconnect/m-activity.webp';

export const SC_IMG = { admin, ai, chat, analytics, tasks, booking, branding, files, home, inboxSup, inbox, integrations, signin, meetings, minutes, chatApproval, network, projects, search, sync, mOffline, themes, themesGrid, callCaptions, call, mMessages, mChat, mTasks, mAi, mActivity };

export const SC = {
  name: 'SampConnect',
  tag: 'The private workspace for global research teams',
  desc: 'SampConnect brings chat, video meetings, private AI, approvals and the Sampledge suite together in one self-hosted, offline-first workspace.',
  demo: '/lets-talk?type=demo',
};

export const SC_HELLO = ['Hello', 'नमस्ते', 'Hola', '你好', 'Bonjour', 'مرحبا'];
export const SC_CHIPS = ['Self-hosted video & AI', 'Works offline', 'Web, iPhone & Android'];
export const SC_STATS = [
  ['100%', 'self-hosted, video and AI included'],
  ['0', 'bytes sent to third-party clouds'],
  ['7', 'Sampledge modules built in'],
  ['12', 'client messaging channels in one inbox'],
  ['20', 'chat themes, synced per person'],
  ['3', 'platforms: web, iPhone and Android'],
];

export const SC_WHY = [
  ['server', 'Your infrastructure', 'Fully self-hosted. Even the video. Even the AI.', 'Chat, calls, recordings, transcripts and the AI assistant all run on your own servers. No third-party video service, no outside model provider.'],
  ['shield', 'Privacy by design', 'Your data never leaves your walls.', 'Every organization is its own isolated tenant. Integration secrets are encrypted in your database. The assistant only reads what each person is allowed to read.'],
  ['wifi', 'Offline-first', 'Keeps working when the network doesn’t.', 'Every message and action is saved on the device first, queued, and delivered the moment you reconnect. Live sync across web, phone and every signed-in device.'],
  ['globe', 'Cross-org network', 'A network that crosses company lines.', 'Find people by Connect ID, send connection requests, share status updates, follow and build communities with partners, suppliers and clients.', true],
  ['inbox', 'Client Inbox', 'Every client channel, one inbox.', 'Answer clients on 12 messaging channels from one shared inbox, with handoff, SLAs and a supervisor dashboard.', true],
  ['layers', 'Sampledge native', 'Built for research teams, not adapted.', 'Seven Sampledge modules feed channels, cards, alerts, tasks and approvals straight into your conversations.'],
  ['brush', 'White-label', 'Your name on the door.', 'White-label the app with your name, logo and colours, a branded sign-in page and branded guest emails.'],
];

export const SC_TOUR = [
  ['chat', 'Team chat', 'Conversations that move work forward', 'Direct messages, groups, public and private channels with threads, @mentions, reactions, polls, scheduled messages, pins, voice and video notes, and forwarding.', ['Threads & replies', 'Polls', 'Send later', 'Voice notes', 'Forwarding', '⌘K palette'], [chatApproval]],
  ['home', 'Home, search & files', 'Everything you need, the moment you sign in', 'Home gathers what needs you today. Universal Search finds any message, file, person or meeting, even offline. The Files library keeps every attachment one click away.', ['Home dashboard', 'Universal Search', 'Files library', 'Status & do not disturb'], [home, search, files]],
  ['calendar', 'Meetings & booking', 'Schedule smarter, let clients book themselves', 'Week view, RSVPs, reminders and recurring series, with suggested times from everyone’s working hours. Public booking pages let clients pick a free slot.', ['Suggested times', 'Recurring series', 'Booking pages', 'External guests'], [meetings, booking]],
  ['file', 'Minutes & transcripts', 'From conversation to minutes in one click', 'Multilingual transcripts you can correct and translate, minutes of meeting drafted for review, and exports to PDF and Word. Export any chat for the record.', ['Multilingual transcripts', 'Minutes to PDF & Word', 'Chat export', 'Editable lines'], [minutes]],
  ['check', 'Tasks, approvals & projects', 'Turn any message into a decision', 'Create a task or request an approval from any message. Amounts, any-or-all approvers, due dates and live cards right in the chat.', ['Message to task', 'Approval chains', 'Project health', 'Live cards'], [tasks, projects]],
  ['chart', 'Analytics', 'See how your organization communicates', 'Message volumes, busiest hours, response times and channel activity for the whole organization or just you.', ['Org & personal views', 'Activity heatmap', 'Works offline'], [analytics]],
];

export const SC_CALLS = [
  ['video', 'Self-hosted video', 'One-to-one and group calls on your own media server.'],
  ['image', 'Company backgrounds', 'Branded backgrounds with your logo, or blur. Admins can require one.'],
  ['captions', 'Live captions', 'Captions from your own speech-to-text server, in many languages.'],
  ['rec', 'Recordings you control', 'Download, bulk ZIP backup, manual delete, optional auto-delete.'],
  ['user', 'Guests & lobby', 'Invite anyone by email. They join from the browser and wait in the lobby.'],
  ['file', 'Minutes of meeting', 'Draft, review, then export to PDF or Word with templates.'],
];

export const SC_SYNC = ['Never shows "delivered" until your server confirms it', 'Sync Center shows exactly what is queued and sent', 'Edits, deletes, reactions, approvals and AI drafts all sync'];

export const SC_CHANNELS = ['Telegram', 'Slack', 'Microsoft Teams', 'Google Chat', 'LINE', 'Mattermost', 'Nextcloud Talk', 'Discord', 'WeChat', 'QQ', 'Signal', 'iMessage'];

export const SC_NET = ['Global Connect ID search', 'Communities with posts and members', 'Admin policy decides who can connect outside'];
export const SC_IDS = [['@priya.sharma', 'Northwind Research'], ['@elena.garcia', 'Panel Partners'], ['@yuki.tanaka', 'Tokyo Insights'], ['@sam.okafor', 'Lagos Field Co.'], ['@lena.fischer', 'Berlin Data'], ['@marco.silva', 'São Paulo Panels']];

/* the seven Sampledge modules, with their own pages on this site */
export const SC_MODS = [
  ['samptrek', 'SampTrek', 'Project management', 'Project channels, milestone and deadline alerts, escalations.'],
  ['sampaudience', 'SampAudience', 'Sample & suppliers', 'Feasibility requests, quota alerts, delivery updates.'],
  ['sampcode', 'SampCode', 'Survey programming', 'QA issues, test links and survey approvals.'],
  ['sampbidx', 'SampBidx', 'Bids & pricing', 'Bid channels, pricing approvals, quotation updates.'],
  ['sampforce', 'SampForce', 'CRM', 'Leads, opportunities, follow-ups, “Log to SampForce”.'],
  ['sampcrew', 'SampCrew', 'People & HR', 'Announcements, policies, onboarding, leave requests.'],
  ['talk2tax', 'Talk2Tax', 'Finance', 'Invoices, payment reminders, expense approvals.'],
];

export const SC_AI = ['Catch me up', 'Meeting summaries', 'Ask with sources', 'Semantic search', 'Translation', 'Suggested replies', 'Daily status digest', '“Needs you” list', 'Duplicate check', 'Task suggestions'];
export const SC_AI_DEMO = {
  q: 'Catch me up on #q4-tracker',
  dec: ['Soft launch moves to Tuesday', 'Use the oncology panel from the German vendor'],
  act: ['Aarav: send Germany quotas by Thursday', 'Priya: confirm the UK incentive change'],
  open: ['Do we add Austria to wave 5?'],
};

export const SC_SEC = [
  ['grid', 'Administration at a glance', 'Members, two-step adoption, devices, integrations, billing and recordings in one overview.'],
  ['key', 'Single sign-on', 'Any OpenID Connect provider, such as Microsoft Entra, Google or Okta, on web and mobile.'],
  ['lock', 'Two-step verification', 'Authenticator apps, recovery codes and a device list with remote sign-out.'],
  ['layers', 'Isolated tenants', 'Every organization is a separate, isolated workspace.'],
  ['list', 'Audit log', 'Filter every action and export to CSV.'],
  ['shield', 'Encrypted settings', 'Integrations live encrypted in your database, with a test button for each.'],
  ['card', 'Billing built in', 'Plans, trials, member limits, card payments or invoices, all from the admin screen.'],
  ['code', 'Developer SDK', 'Embeddable chat widget and signed webhooks for your own systems.'],
  ['folder', 'Your storage', 'Files in your own database by default, or your own Nextcloud.'],
];

/* How it works: the order a company follows, built only from the capabilities listed in the showcase */
export const SC_HOW = [
  ['server', 'Run it on your servers', 'SampConnect ships as Docker images with health and metrics. Chat, video, recordings, speech-to-text and the AI assistant all run on your own infrastructure.'],
  ['shield', 'Configure everything in the app', 'Email, push, calls, AI, speech-to-text, storage and SSO settings are stored encrypted in your database and tested with one click. No config files to hand-edit.'],
  ['brush', 'Put your brand on it', 'Your name, logo and colours, a branded sign-in page, branded guest emails and an organization theme lock.'],
  ['users', 'Invite your people and guests', 'Single sign-on and two-step verification for the team; clients and partners join calls from the browser as guests.'],
  ['layers', 'Connect the Sampledge suite', 'Projects, sample, scripting, bids, CRM, people and finance get their own channels, live cards, alerts, tasks and approvals.'],
  ['wifi', 'Work anywhere, even offline', 'Web, iPhone and Android, with every message and action saved on the device first and synced the moment you reconnect.'],
];

/* Use cases: who uses which part, taken from the showcase's own examples */
export const SC_USES = [
  ['Research project teams', 'Project channels with milestone alerts, quotas and decisions in one place, and “Catch me up” for anyone who was away.'],
  ['Fieldwork on the move', 'Fieldwork happens on trains, in basements and across time zones: messages and approvals queue offline and sync later.'],
  ['Client service', 'Public booking pages, guests in the lobby, minutes in PDF or Word, and one inbox for 12 client channels (coming soon).'],
  ['Managers and approvers', 'Budgets and pricing approved from the chat with any-or-all approvers, plus analytics on how the organization communicates.'],
  ['Multilingual teams', 'Live captions and transcripts in many languages, and translation by the private assistant.'],
  ['Partners and suppliers', 'A Connect ID for everyone, connection requests and communities across company lines (coming soon).'],
];

export const SC_CMP_COLS = ['SampConnect', 'Cloud team-chat suites', 'Cloud video-meeting apps', 'Business messaging apps'];
export const SC_CMP = [
  ['Chat, calls and AI all on your own servers', [true, false, 'Some hybrid options', false]],
  ['Private AI on your own model server', [true, 'Vendor-hosted AI', 'Vendor-hosted AI', false]],
  ['Works offline, queues every action', [true, 'Limited', false, 'Limited']],
  ['Cross-organization network with Connect IDs', [true, 'Shared channels', false, false]],
  ['One inbox for 12 client channels', [true, 'Via add-ons', false, 'Own channel only']],
  ['Market-research modules built in', [true, false, false, false]],
  ['Full white-label: name, logo, colours, emails', [true, false, 'Partial', false]],
  ['Guests join calls with no account', [true, 'Varies', true, false]],
  ['Minutes of meeting to PDF and Word', [true, 'Add-ons', 'Varies', false]],
  ['Recordings stored and deleted on your terms', [true, 'Vendor cloud', 'Vendor cloud', false]],
];
export const SC_CMP_NOTE = 'Comparison by product category, based on typical standard cloud plans as of November 2026. Individual vendors may offer on-premises, hybrid or add-on options, and features vary by plan. All product names belong to their respective owners.';

export const SC_ALL = {
  Chat: ['Direct messages', 'Groups & channels', 'Announcement channels', 'Threads', '@mentions', 'Reactions', 'Polls', 'Scheduled messages', 'Pins', 'Saved messages', 'Voice messages', 'Video messages', 'Screen recordings', 'Forwarding', 'Read receipts', 'Typing & presence', 'Status & do not disturb', 'Profile photos', '20 chat themes', 'Command palette'],
  Meetings: ['Voice & video calls', 'Group calls', 'Screen sharing', 'Raise hand', 'Chat during calls', 'Background blur', 'Company backgrounds', 'Live captions', 'Recordings', 'Transcripts', 'Minutes to PDF & Word', 'Meeting calendar', 'Suggested times', 'Recurring meetings', 'External guests', 'Lobby', 'Booking pages'],
  Work: ['Home', 'Universal Search', 'Files library', 'Tasks', 'Approvals', 'Projects', 'Analytics', 'Chat export', '7 Sampledge modules', 'Developer SDK', 'Chat widget', 'Signed webhooks'],
  AI: ['Catch me up', 'Meeting summaries', 'Ask with sources', 'Semantic search', 'Translation', 'Suggested replies', 'Status digest', 'Needs-you list', 'Duplicate check', 'Task suggestions', 'Admin on/off'],
  Trust: ['Self-hosted', 'Isolated tenants', 'SSO (OpenID Connect)', 'Two-step verification', 'Device sign-out', 'Audit log', 'Encrypted settings', 'Offline-first sync', 'Sync Center', 'Nextcloud storage', 'Docker images', 'Health & metrics'],
  Brand: ['White-label', 'Branded sign-in', 'Branded emails', 'Organization theme lock', '5 app themes', 'Billing & plans', 'Free trials', 'Invoices'],
  Network: ['Connect IDs', 'Connection requests', 'Invite non-users', 'Status updates', 'Replies', 'Follow', 'Communities', 'Client Inbox (12 channels)'],
};
export const SC_SOON = new Set(['Connect IDs', 'Connection requests', 'Invite non-users', 'Status updates', 'Replies', 'Follow', 'Communities', 'Client Inbox (12 channels)']);
export const SC_MOBILE = [[mMessages, 'Messages'], [mChat, 'Conversation'], [mTasks, 'Tasks'], [mAi, 'AI assistant'], [mActivity, 'Activity']];

/* build 83.2: more from the showcase (hero rotator, tapes, greetings with places, module colours) */
export const SC_VERBS = ['Chat', 'Meet', 'Approve', 'Translate', 'Sync', 'Connect'];
export const SC_TAPE = ['Self-hosted video', 'Private AI', 'Offline-first', 'Client Inbox', 'Connect IDs', 'Live captions', 'Minutes to PDF & Word', 'White-label', 'Sampledge modules', 'Booking pages'];
export const SC_BUBBLES = [['Hello', 'en', '6%', '18%', 1.2], ['नमस्ते', 'hi', '70%', '6%', 1.45], ['Hola', 'es', '0%', '56%', 1.7], ['你好', 'zh', '84%', '44%', 1.95], ['Bonjour', 'fr', '12%', '84%', 2.2], ['مرحبا', 'ar', '74%', '80%', 2.45]];
export const SC_MOD_COL = { samptrek: '#8FE0B6', sampaudience: '#7DD3FC', sampcode: '#F5B83D', sampbidx: '#C4B5FD', sampforce: '#FF8A7A', sampcrew: '#F9A8D4', talk2tax: '#FDE68A' };
export const SC_CAPTION = { who: 'Lena', lang: 'DE', said: 'Die Inzidenz liegt bei 18 Prozent.', en: 'Incidence is at 18 percent.', rec: 'REC 12:48' };
