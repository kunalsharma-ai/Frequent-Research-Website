// Build 78: the AI assistant in the super admin (blogs, case studies, emails, newsletters, social posts, ads, video
// scripts, page sections). It uses Claude through the official Anthropic SDK; ANTHROPIC_API_KEY in .env switches it
// on and AI_MODEL picks the model (default claude-opus-5-5). Every answer is a draft the admin reviews before saving.
import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config.js';
import { onKeysChange } from './keystore.js';

let client = null;
onKeysChange(() => { client = null; }); // build 78.4: a new key typed in the admin panel
export const aiReady = () => !!config.ai.key;
const getClient = () => (client ||= new Anthropic({ apiKey: config.ai.key, maxRetries: 2, timeout: 300000 }));

const str = { type: 'string' };
const strs = { type: 'array', items: str };
const obj = (props, req = Object.keys(props)) => ({ type: 'object', properties: props, required: req, additionalProperties: false });

const BRAND = `You write for Frequent Research (frequentresearch.com), an ISO-certified market research and data collection company
from India and an ESOMAR corporate member, with research panels in 55 countries (consumers, business professionals,
healthcare professionals, caregivers and patients), and three more teams: digital marketing, IT & development, and
accounts & finance. Its own panel portals are Turn2Opinion, MyFrequentRewards and MyHealthOpinions, and its software
family is Sampledge (SampCode, SampBidx, SampTrek, SampAudience, SampForce, Talk2Tax, SampCrew).
Style: clear, warm, expert British English; short sentences; practical; no hype, no invented statistics, no client
names, no prices (pricing lives on sampledge.com/pricing). When a number is needed and you do not know it, write a
placeholder like [number] so the editor fills it in.`;

// what each kind returns (the admin panel drops it straight into the matching editor)
const KINDS = {
  blog: {
    what: 'a complete, SEO-friendly blog post for the Frequent Research blog',
    schema: obj({
      slug: str, title: str, metaTitle: str, description: str, primaryKeyword: str, keywords: strs, takeaways: strs,
      sections: { type: 'array', items: obj({ h: str, p: strs, list: strs }) },
      faqs: { type: 'array', items: obj({ q: str, a: str }) },
      coverIdea: str,
    }),
  },
  'case-study': {
    what: 'an illustrative case study card and page for the Industries & case studies section (anonymous client, e.g. "A packaged-foods brand")',
    schema: obj({ slug: str, title: str, client: str, region: str, services: strs, methods: strs, scope: str, timeline: str, challenge: str, approach: str, outcome: str, learning: str }),
  },
  email: {
    what: 'an email template (subject, preheader, kicker, heading, body with blank lines between paragraphs and "- " bullets, button and up to three highlight cards). Use {{first}} for the first name.',
    schema: obj({ subject: str, preheader: str, kicker: str, heading: str, body: str, button: obj({ label: str, url: str }), highlights: { type: 'array', items: obj({ t: str, d: str, url: str }) } }),
  },
  newsletter: {
    what: 'a monthly newsletter email (same fields as an email template; highlights are the stories)',
    schema: obj({ subject: str, preheader: str, kicker: str, heading: str, body: str, button: obj({ label: str, url: str }), highlights: { type: 'array', items: obj({ t: str, d: str, url: str }) } }),
  },
  social: {
    what: 'social media posts, one per platform asked for, each written for that platform (length, tone, hashtags), plus an image idea',
    schema: obj({ posts: { type: 'array', items: obj({ platform: str, text: str, hashtags: strs, imageIdea: str, bestTime: str }) } }),
  },
  'social-plan': {
    what: 'a content calendar of social media posts that promote the website, portals, panels, services and products; spread the topics; give each post a date offset in days from today',
    schema: obj({ posts: { type: 'array', items: obj({ day: { type: 'integer' }, platforms: strs, topic: str, text: str, hashtags: strs, link: str, imageIdea: str }) } }),
  },
  ad: {
    what: 'online ad copy variants (Google search, Meta and LinkedIn) with headlines, descriptions, audience and a landing page',
    schema: obj({ ads: { type: 'array', items: obj({ platform: str, headlines: strs, descriptions: strs, audience: str, landing: str, cta: str }) } }),
  },
  'video-script': {
    what: 'a short video (reel, short or explainer) script with scenes, on-screen text, voice-over and a caption',
    schema: obj({ title: str, length: str, hook: str, scenes: { type: 'array', items: obj({ seconds: str, visual: str, onScreen: str, voiceOver: str }) }, caption: str, hashtags: strs }),
  },
  section: {
    what: 'the content for a new website section: a heading, an intro, and cards or bullet points',
    schema: obj({ kicker: str, heading: str, intro: str, items: { type: 'array', items: obj({ t: str, d: str }) }, buttonLabel: str, buttonLink: str }),
  },
  rewrite: {
    what: 'a better version of the given text, same meaning and similar length, in the website style',
    schema: obj({ text: str, alternatives: strs }),
  },
};
export const AI_KINDS = Object.fromEntries(Object.entries(KINDS).map(([k, v]) => [k, v.what]));

export async function aiWrite({ kind, brief, tone, length, platforms, extra }) {
  if (!aiReady()) throw Object.assign(new Error('The AI assistant is not connected: add ANTHROPIC_API_KEY to the server .env and restart the backend.'), { status: 503 });
  const k = KINDS[kind];
  if (!k) throw Object.assign(new Error('Unknown kind ' + kind), { status: 400 });
  const prompt = [
    `Write ${k.what}.`,
    `Brief from the editor:\n${String(brief || '').slice(0, 8000)}`,
    tone ? `Tone: ${tone}.` : '',
    length ? `Length: ${length}.` : '',
    Array.isArray(platforms) && platforms.length ? `Platforms: ${platforms.join(', ')}.` : '',
    extra ? `Extra context:\n${String(extra).slice(0, 12000)}` : '',
    `Today is ${new Date().toISOString().slice(0, 10)}.`,
  ].filter(Boolean).join('\n\n');
  const stream = getClient().beta.messages.stream({
    model: config.ai.model,
    max_tokens: 32000,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    thinking: { type: 'adaptive' },
    output_config: { effort: 'medium', format: { type: 'json_schema', schema: k.schema } },
    system: BRAND,
    messages: [{ role: 'user', content: prompt }],
  });
  const msg = await stream.finalMessage();
  if (msg.stop_reason === 'refusal') throw Object.assign(new Error('The AI declined this request. Change the brief and try again.'), { status: 422 });
  if (msg.stop_reason === 'max_tokens') throw Object.assign(new Error('The answer was too long. Ask for a shorter piece.'), { status: 422 });
  const text = msg.content.filter((b) => b.type === 'text').map((b) => b.text).join('');
  try { return { data: JSON.parse(text), model: msg.model, usage: msg.usage }; }
  catch { throw Object.assign(new Error('The AI answer could not be read. Please try again.'), { status: 502 }); }
}
