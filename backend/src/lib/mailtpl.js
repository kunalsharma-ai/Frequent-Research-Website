// Build 78: email templates. A template is plain data the super admin edits in Admin › Email templates:
//   { id, name, design, subject, preheader, kicker, heading, body, image, button: { label, url }, highlights: [{ t, d }],
//     footer, accent }
// body: blank line = new paragraph, "- " = bullet, **bold**. Every text may use {{first}}, {{name}}, {{email}},
// {{company}}, {{service}}, {{resource}}, {{title}}, {{page}}, {{site}}, {{date}} and {{unsubscribe}}.
// Designs move in Apple Mail, iPhone, Outlook for Mac, Samsung and Thunderbird (CSS animation); Gmail and Outlook for
// Windows show the same email still. An animated GIF as the picture moves everywhere.
import { config } from '../config.js';

export const DESIGNS = [
  { id: 'aurora', name: 'Aurora', d: 'Navy header with slowly moving northern-light colours and drifting dots' },
  { id: 'pulse', name: 'Pulse', d: 'Clean white card; the main button breathes with a soft ring' },
  { id: 'orbit', name: 'Orbit', d: 'The logo inside a turning ring of dots: good for product and portal emails' },
  { id: 'confetti', name: 'Confetti', d: 'Falling confetti over the header: thank-you and welcome emails' },
  { id: 'wave', name: 'Wave', d: 'Rolling waves under the header: newsletters and updates' },
  { id: 'spotlight', name: 'Spotlight', d: 'A light sweeps across the headline: announcements and offers' },
  { id: 'editorial', name: 'Editorial newsletter', d: 'Magazine layout with highlight cards that fade in one by one' },
  { id: 'panel', name: 'Panel book', d: 'Stat tiles that rise in one by one: downloads and panel books' },
  { id: 'careers', name: 'Careers', d: 'Warm header with a sliding badge and a typing cursor: job applicants' },
  { id: 'minimal', name: 'Minimal', d: 'No animation and no images: the best inbox delivery for plain replies' },
];
const ACCENT = { royal: '#2F6BFF', violet: '#6D4AFF', teal: '#0E9C88', gold: '#D99A2B', rose: '#C8577E', navy: '#0B1437' };

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const fill = (s, v) => String(s == null ? '' : s).replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => (v[k] == null ? '' : String(v[k])));
const safeUrl = (u) => (/^(https?:|mailto:|tel:)/i.test(u) ? u : u && u.startsWith('/') ? config.publicUrl + u : '');

function bodyHtml(text, v, color) {
  const blocks = fill(text, v).replace(/\r/g, '').split(/\n\s*\n/).map((b) => b.trim()).filter(Boolean);
  const inl = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\[(.+?)\]\((https?:[^)\s]+)\)/g, `<a href="$2" style="color:${color}">$1</a>`);
  return blocks.map((b) => {
    const lines = b.split('\n');
    if (lines.every((l) => /^\s*[-•]\s+/.test(l))) return '<ul style="margin:0 0 16px;padding-left:20px">' + lines.map((l) => `<li style="margin:0 0 6px">${inl(l.replace(/^\s*[-•]\s+/, ''))}</li>`).join('') + '</ul>';
    return `<p style="margin:0 0 16px">${lines.map(inl).join('<br>')}</p>`;
  }).join('');
}

const CSS = `
@keyframes frAur{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes frFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes frRing{0%{box-shadow:0 0 0 0 rgba(47,107,255,.45)}70%{box-shadow:0 0 0 14px rgba(47,107,255,0)}100%{box-shadow:0 0 0 0 rgba(47,107,255,0)}}
@keyframes frSpin{to{transform:rotate(360deg)}}
@keyframes frFall{0%{transform:translateY(-40px) rotate(0)}100%{transform:translateY(220px) rotate(300deg)}}
@keyframes frWave{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes frSweep{0%{background-position:-200% 0}100%{background-position:200% 0}}
@keyframes frRise{0%{opacity:0;transform:translateY(14px)}100%{opacity:1;transform:translateY(0)}}
@keyframes frBlink{50%{opacity:0}}
@keyframes frSlide{0%{transform:translateX(-30px);opacity:0}100%{transform:translateX(0);opacity:1}}
.fr-btn:hover{filter:brightness(1.08)}
@media (prefers-reduced-motion:reduce){*{animation:none!important}}
@media (max-width:620px){.fr-wrap{width:100%!important}.fr-pad{padding:24px 20px!important}.fr-col{display:block!important;width:100%!important}}
`;

// the coloured top of the email for each design
function header(d, t, v, c, logo) {
  const k = t.kicker ? `<div style="font:600 12px/1.4 Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;opacity:.85;margin:0 0 10px">${esc(fill(t.kicker, v))}</div>` : '';
  const h = esc(fill(t.heading, v));
  const lg = `<img src="${esc(logo)}" width="44" height="44" alt="Frequent Research" style="display:block;border:0;border-radius:12px">`;
  const navy = 'background:#0B1437;background-image:linear-gradient(120deg,#0B1437,#1d2f7a,' + c + ',#6D4AFF,#0B1437);background-size:300% 300%;';
  switch (d) {
    case 'minimal':
      return `<tr><td class="fr-pad" style="padding:32px 40px 8px;font-family:Arial,sans-serif;color:#0B1437">${lg}${k ? '<br>' + k : ''}<h1 style="font:700 24px/1.3 Arial,sans-serif;margin:16px 0 0">${h}</h1></td></tr>`;
    case 'pulse':
      return `<tr><td class="fr-pad" style="padding:36px 40px 8px;font-family:Arial,sans-serif;color:#0B1437;border-top:6px solid ${c}">${lg}<div style="height:18px"></div>${k}<h1 style="font:800 28px/1.25 Arial,sans-serif;margin:0">${h}</h1></td></tr>`;
    case 'orbit':
      return `<tr><td align="center" class="fr-pad" style="${navy}animation:frAur 14s ease infinite;padding:40px;color:#fff;font-family:Arial,sans-serif">
        <div style="position:relative;width:110px;height:110px;margin:0 auto 18px"><div style="position:absolute;inset:0;border:2px dashed rgba(255,255,255,.45);border-radius:50%;animation:frSpin 12s linear infinite"></div><div style="position:absolute;left:33px;top:33px">${lg}</div></div>${k}<h1 style="font:800 28px/1.25 Arial,sans-serif;margin:0">${h}</h1></td></tr>`;
    case 'confetti': {
      const bits = Array.from({ length: 14 }, (_, i) => `<i style="position:absolute;top:-20px;left:${(i * 37) % 100}%;width:8px;height:12px;border-radius:2px;background:${['#FFC27A', '#9FE7DC', '#C8577E', '#A9BDFF', '#D99A2B'][i % 5]};animation:frFall ${3 + (i % 4)}s linear ${(i % 7) * 0.4}s infinite"></i>`).join('');
      return `<tr><td class="fr-pad" style="position:relative;overflow:hidden;${navy}padding:44px 40px;color:#fff;font-family:Arial,sans-serif">${bits}${lg}<div style="height:16px"></div>${k}<h1 style="font:800 30px/1.2 Arial,sans-serif;margin:0">${h}</h1></td></tr>`;
    }
    case 'wave':
      return `<tr><td style="${navy}padding:0;color:#fff;font-family:Arial,sans-serif"><div class="fr-pad" style="padding:40px 40px 20px">${lg}<div style="height:16px"></div>${k}<h1 style="font:800 28px/1.25 Arial,sans-serif;margin:0">${h}</h1></div>
        <div style="overflow:hidden;height:36px"><div style="width:200%;height:36px;animation:frWave 9s linear infinite;background:radial-gradient(circle at 25px -12px,transparent 28px,#ffffff 29px) 0 0/50px 36px repeat-x"></div></div></td></tr>`;
    case 'spotlight':
      return `<tr><td class="fr-pad" style="background:#0B1437;padding:44px 40px;color:#fff;font-family:Arial,sans-serif">${lg}<div style="height:16px"></div>${k}<h1 style="font:800 30px/1.2 Arial,sans-serif;margin:0;color:#fff;background:linear-gradient(90deg,#fff 40%,${c} 50%,#fff 60%);background-size:200% 100%;-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;animation:frSweep 4s linear infinite">${h}</h1></td></tr>`;
    case 'careers':
      return `<tr><td class="fr-pad" style="background:#FFF6EA;background-image:linear-gradient(135deg,#FFF6EA,#FFE2BD);padding:40px;color:#0B1437;font-family:Arial,sans-serif">${lg}<div style="height:16px"></div><span style="display:inline-block;background:#0B1437;color:#FFC27A;border-radius:99px;padding:6px 14px;font:700 12px Arial,sans-serif;animation:frSlide .9s ease both">${esc(fill(t.kicker || 'Careers at Frequent Research', v))}</span><h1 style="font:800 28px/1.25 Arial,sans-serif;margin:14px 0 0">${h}<span style="animation:frBlink 1s step-end infinite;color:${c}">|</span></h1></td></tr>`;
    case 'panel': case 'editorial': case 'aurora': default:
      return `<tr><td class="fr-pad" style="${navy}animation:frAur 16s ease infinite;padding:44px 40px;color:#fff;font-family:Arial,sans-serif;position:relative">
        <div style="animation:frFloat 6s ease-in-out infinite">${lg}</div><div style="height:16px"></div>${k}<h1 style="font:800 30px/1.2 Arial,sans-serif;margin:0">${h}</h1></td></tr>`;
  }
}

export function renderTemplate(t, vars = {}, opts = {}) {
  const tpl = t || {};
  const v = { site: config.publicUrl, date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }), ...vars };
  if (!v.first) v.first = String(v.name || '').split(' ')[0] || 'there';
  const c = ACCENT[tpl.accent] || (/^#[0-9a-f]{6}$/i.test(tpl.accent || '') ? tpl.accent : ACCENT.royal);
  const d = DESIGNS.some((x) => x.id === tpl.design) ? tpl.design : 'aurora';
  const logo = opts.logo || config.publicUrl + '/favicon.png';
  const img = tpl.image && d !== 'minimal' ? `<tr><td style="padding:0"><img src="${esc(safeUrl(tpl.image))}" width="600" alt="" style="display:block;width:100%;height:auto;border:0"></td></tr>` : '';
  const btn = tpl.button && tpl.button.label && safeUrl(fill(tpl.button.url, v))
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px"><tr><td style="border-radius:12px;background:${c};${d === 'pulse' ? 'animation:frRing 2.2s ease-out infinite;' : ''}"><a class="fr-btn" href="${esc(safeUrl(fill(tpl.button.url, v)))}" style="display:inline-block;padding:14px 26px;font:700 15px Arial,sans-serif;color:#fff;text-decoration:none;border-radius:12px">${esc(fill(tpl.button.label, v))}</a></td></tr></table>` : '';
  const hl = Array.isArray(tpl.highlights) && tpl.highlights.length ? `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:4px 0 18px"><tr>${tpl.highlights.slice(0, 6).map((h, i) => `<td class="fr-col" valign="top" style="width:${Math.floor(100 / Math.min(3, tpl.highlights.length))}%;padding:6px"><div style="border-radius:14px;padding:16px;background:${d === 'panel' ? '#0B1437' : '#F3F6FF'};color:${d === 'panel' ? '#fff' : '#0B1437'};animation:frRise .8s ease ${0.2 + i * 0.25}s both"><b style="display:block;font:800 ${d === 'panel' ? '22' : '15'}px/1.25 Arial,sans-serif;color:${d === 'panel' ? '#FFC27A' : c}">${esc(fill(h.t, v))}</b><span style="font:14px/1.5 Arial,sans-serif">${esc(fill(h.d, v))}</span>${h.url ? `<br><a href="${esc(safeUrl(fill(h.url, v)))}" style="font:700 13px Arial,sans-serif;color:${d === 'panel' ? '#9FE7DC' : c}">Read more →</a>` : ''}</div></td>`).join('')}</tr></table>` : '';
  const unsub = v.unsubscribe ? `<a href="${esc(v.unsubscribe)}" style="color:#7A86A8">Unsubscribe</a> · ` : '';
  const foot = esc(fill(tpl.footer || 'Frequent Research Fieldwork Solutions Pvt. Ltd. · You get this email because you contacted us or subscribed on frequentresearch.com.', v));
  const pixel = opts.pixel ? `<img src="${esc(opts.pixel)}" width="1" height="1" alt="" style="display:block;border:0">` : '';
  const pre = esc(fill(tpl.preheader || '', v));
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><title>${esc(fill(tpl.subject, v))}</title><style>${CSS}</style></head>
<body style="margin:0;padding:0;background:#EEF2FB"><div style="display:none;max-height:0;overflow:hidden;opacity:0">${pre}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EEF2FB"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" class="fr-wrap" width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:600px;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 10px 30px rgba(11,20,55,.10)">
${header(d, tpl, v, c, logo)}${img}
<tr><td class="fr-pad" style="padding:28px 40px 12px;font:16px/1.6 Arial,sans-serif;color:#26304F">${bodyHtml(tpl.body, v, c)}${hl}${btn}</td></tr>
<tr><td class="fr-pad" style="padding:18px 40px 28px;border-top:1px solid #E6EAF5;font:12px/1.6 Arial,sans-serif;color:#7A86A8">${unsub}<a href="${esc(config.publicUrl)}" style="color:#7A86A8">frequentresearch.com</a><br>${foot}${pixel}</td></tr>
</table></td></tr></table></body></html>`;
  const text = [fill(tpl.heading, v), '', fill(tpl.body, v).replace(/\*\*/g, ''), ...(tpl.highlights || []).map((h) => '- ' + fill(h.t, v) + ': ' + fill(h.d, v)), tpl.button && tpl.button.label ? '\n' + fill(tpl.button.label, v) + ': ' + safeUrl(fill(tpl.button.url, v)) : '', '', v.unsubscribe ? 'Unsubscribe: ' + v.unsubscribe : ''].join('\n');
  return { subject: fill(tpl.subject, v), html, text };
}

/* ---- the templates the website ships with (one per form and service, plus newsletters) ---------------------- */
const T = (id, name, design, subject, kicker, heading, body, button, extra = {}) => ({ id, name, design, subject, preheader: '', kicker, heading, body, image: '', button, highlights: [], footer: '', accent: 'royal', builtIn: true, ...extra });
const talk = { label: 'Talk to our team', url: '/lets-talk' };
export const BUILTIN_TEMPLATES = [
  T('reply-enquiry', 'Reply: any enquiry', 'pulse', 'Thanks, {{first}}: we have your message', 'Frequent Research', 'We have your message, {{first}}', 'Thank you for contacting Frequent Research about **{{service}}**.\n\nA specialist reads every enquiry and will reply within one working day, usually much sooner. If it is urgent, reply to this email or message us on WhatsApp.\n\n- Market research, panels and fieldwork in 55 countries\n- Digital marketing, IT & development, accounts & finance', { label: 'See what we do', url: '/services' }),
  T('reply-market-research', 'Reply: Market Research enquiry', 'aurora', 'Your research enquiry: next steps', 'Market Research', 'Let\'s shape your study, {{first}}', 'Thank you for your **{{service}}** enquiry.\n\nOur research team will check feasibility, incidence and timelines for your markets and come back with a plan and a quote within one working day.', { label: 'Browse our panel books', url: '/downloads' }, { highlights: [{ t: '55 countries', d: 'Consumer, B2B and healthcare panels' }, { t: 'ISO certified', d: 'Quality and information security' }, { t: 'ESOMAR', d: 'Corporate member' }] }),
  T('reply-digital-marketing', 'Reply: Digital Marketing enquiry', 'spotlight', 'Your growth plan starts here', 'Digital Marketing', 'Ready to grow, {{first}}?', 'Thanks for asking about **{{service}}**.\n\nA digital marketing strategist will review your goals and reply with ideas, a plan and a timeline within one working day.', talk, { accent: 'violet' }),
  T('reply-it', 'Reply: IT & Development enquiry', 'orbit', 'Your IT & development enquiry', 'IT & Development', 'Let\'s build it, {{first}}', 'Thanks for your **{{service}}** enquiry.\n\nOur solution architect will look at what you need and reply with an approach, an estimate and next steps within one working day.', talk, { accent: 'teal' }),
  T('reply-accounts-finance', 'Reply: Accounts & Finance enquiry', 'pulse', 'Your accounts & finance enquiry', 'Accounts & Finance', 'We are on it, {{first}}', 'Thank you for asking about **{{service}}**.\n\nA finance specialist will call or email you within one working day with what we need from you and a clear fee.', talk, { accent: 'gold' }),
  T('reply-government', 'Reply: Government research brief', 'aurora', 'Your public-sector research brief', 'Government & Opinion Research', 'Thank you for your brief, {{first}}', 'Our government and opinion research team has your requirement.\n\nWe will reply with a methodology note, sample design and timeline within two working days.', { label: 'Our government research', url: '/government-opinion-research' }),
  T('reply-download', 'Reply: download (panel books, brochures, quality)', 'panel', 'Your download: {{resource}}', 'Your download', 'Here is {{resource}}', 'Thanks for downloading **{{resource}}**, {{first}}.\n\nIf you would like a feasibility check or a quote for your markets, reply to this email and a specialist will help.', { label: 'More downloads', url: '/downloads' }, { highlights: [{ t: '55', d: 'countries profiled' }, { t: '5', d: 'regions' }, { t: '58', d: 'industries' }] }),
  T('reply-case-study', 'Reply: case study download', 'editorial', 'Your case study: {{title}}', 'Case study', 'Thanks for reading, {{first}}', 'Here is the case study you asked for: **{{title}}**.\n\nWant results like these? Tell us about your project and we will share a plan.', { label: 'More case studies', url: '/industries-case-studies' }),
  T('reply-careers', 'Reply: careers application', 'careers', 'We have your application, {{first}}', 'Careers at Frequent Research', 'Thank you for applying', 'Thank you for applying to Frequent Research for **{{department}}**.\n\nOur hiring team reviews every CV. If your profile matches an opening, we will contact you to arrange a conversation.', { label: 'Life at Frequent Research', url: '/careers' }, { accent: 'gold' }),
  T('reply-chat', 'Reply: chat with a specialist', 'pulse', 'Your chat with Frequent Research', 'Live chat', 'Thanks for chatting with us, {{first}}', 'A specialist has your question and will answer by email if we could not finish in the chat.', talk),
  T('welcome-newsletter', 'Newsletter: welcome', 'confetti', 'Welcome to Frequent Research insights', 'Welcome', 'You are in, {{first}}!', 'Thanks for subscribing. Once a month we send research insights, panel news and practical ideas for marketing, IT and finance. No spam, unsubscribe any time.', { label: 'Read the blog', url: '/blog' }, { accent: 'rose' }),
  T('newsletter-monthly', 'Newsletter: monthly insights', 'editorial', 'Frequent Research insights: {{date}}', 'Monthly insights', 'What is new this month', 'Hi {{first}},\n\nHere are this month\'s highlights from our research, marketing, IT and finance teams.', { label: 'Read all posts', url: '/blog' }, { highlights: [{ t: 'New blog post', d: 'Write the post summary here', url: '/blog' }, { t: 'Panel update', d: 'Write the panel news here', url: '/downloads' }, { t: 'Case study', d: 'Write the case study summary here', url: '/industries-case-studies' }] }),
  T('followup-1', 'Follow-up: 3 days after an enquiry', 'wave', 'Anything else we can help with, {{first}}?', 'Following up', 'Did we answer everything?', 'Hi {{first}},\n\nA few days ago you asked us about **{{service}}**. Did our team answer everything? If you need a quote, a feasibility check or a call, just reply to this email.', { label: 'Book a call', url: '/lets-talk' }),
  T('followup-2', 'Follow-up: 10 days after an enquiry', 'editorial', 'Ideas for your next project', 'Insights', 'A few ideas for you, {{first}}', 'Here are a few resources our clients find useful when they plan a project like yours.', { label: 'See case studies', url: '/industries-case-studies' }, { highlights: [{ t: 'Panel books', d: 'Country-by-country audience profiles', url: '/downloads' }, { t: 'Quality process', d: 'How we keep every project clean', url: '/downloads/quality-process' }, { t: 'Blog', d: 'Practical ideas from our teams', url: '/blog' }] }),
  T('notify-team', 'Team alert: new lead', 'minimal', 'New {{kind}}: {{name}} ({{service}})', 'Website lead', 'New {{kind}} from {{name}}', '**Email:** {{email}}\n**Phone:** {{phone}}\n**Company:** {{company}}\n**Service / resource:** {{service}} {{resource}}\n**Page:** {{page}}\n\n{{message}}', { label: 'Open in the admin', url: '/admin/leads' }),
];

// which reply template fits a lead
export function replyFor(lead) {
  const k = lead.kind, s = `${lead.service || ''} ${lead.type || ''} ${lead.page || ''}`.toLowerCase();
  if (k === 'careers') return 'reply-careers';
  if (k === 'chat') return 'reply-chat';
  if (k === 'case-study-download') return 'reply-case-study';
  if (k === 'download' || k === 'resource-download') return 'reply-download';
  if (/government|public.sector|opinion/.test(s)) return 'reply-government';
  if (/market.research|panel|survey|cati|capi|qualitative|quantitative|fieldwork|research/.test(s)) return 'reply-market-research';
  if (/digital|seo|marketing|ads|social|content|whatsapp|lead gen/.test(s)) return 'reply-digital-marketing';
  if (/\bit\b|develop|software|app|crm|erp|saas|cloud|ai |web/.test(s)) return 'reply-it';
  if (/account|finance|gst|tds|itr|payroll|cfo|audit|tax|bookkeep/.test(s)) return 'reply-accounts-finance';
  return 'reply-enquiry';
}
