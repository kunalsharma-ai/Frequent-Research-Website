// Settings, read from the environment (in Docker: docker-compose.yml / .env; locally: `npm run dev` reads backend/.env).
import crypto from 'node:crypto';

const env = process.env;

// build 78.4: the keys below can also be saved in the database from the admin panel (Connections & keys); a saved
// value wins over .env. lib/keystore.js calls applyKeys() at start-up and after every change.
export function integrationsFrom(env) {
  return {
    leadWebhook: /^https:\/\//.test(env.LEAD_WEBHOOK || '') ? env.LEAD_WEBHOOK : '',
    // ---- build 78: email, newsletters, social media, AI and SampCrew. Everything is optional: a feature without its
    // keys stays visible in the admin panel with a "not connected" note and does nothing else.
    publicUrl: (env.PUBLIC_URL || 'https://www.frequentresearch.com').replace(/\/+$/, ''),
    mail: {
      // smtp | resend | sendgrid | brevo | off. Default: smtp when SMTP_HOST is set, else the API provider whose key is set
      provider: (env.MAIL_PROVIDER || (env.SMTP_HOST ? 'smtp' : env.RESEND_API_KEY ? 'resend' : env.SENDGRID_API_KEY ? 'sendgrid' : env.BREVO_API_KEY ? 'brevo' : 'off')).toLowerCase(),
      from: env.MAIL_FROM || '',                 // "Frequent Research <hello@frequentresearch.com>"
      replyTo: env.MAIL_REPLY_TO || '',
      notify: (env.MAIL_NOTIFY || '').split(/[,; ]+/).filter(Boolean), // team addresses told about every new lead
      smtp: { host: env.SMTP_HOST || '', port: +(env.SMTP_PORT || 587), secure: env.SMTP_SECURE === '1' || +(env.SMTP_PORT || 0) === 465, user: env.SMTP_USER || '', pass: env.SMTP_PASS || '' },
      resendKey: env.RESEND_API_KEY || '',
      sendgridKey: env.SENDGRID_API_KEY || '',
      brevoKey: env.BREVO_API_KEY || '',
      perMinute: Math.max(1, +(env.MAIL_PER_MINUTE || 60)),   // sending speed limit (newsletters go out in batches)
    },
    ai: {
      key: env.ANTHROPIC_API_KEY || '',
      model: env.AI_MODEL || 'claude-opus-5-5',
    },
    social: {
      facebook: { pageId: env.FB_PAGE_ID || '', token: env.FB_PAGE_TOKEN || '' },
      instagram: { userId: env.IG_USER_ID || '', token: env.IG_TOKEN || env.FB_PAGE_TOKEN || '' },
      linkedin: { author: env.LINKEDIN_AUTHOR_URN || '', token: env.LINKEDIN_TOKEN || '' },
      x: { key: env.X_API_KEY || '', secret: env.X_API_SECRET || '', token: env.X_ACCESS_TOKEN || '', tokenSecret: env.X_ACCESS_SECRET || '' },
      // any other platform (YouTube, Pinterest, Threads, WhatsApp channel …) through Zapier / Make / Buffer: an https:// hook
      webhook: /^https:\/\//.test(env.SOCIAL_WEBHOOK || '') ? env.SOCIAL_WEBHOOK : '',
    },
    // build 82: the client and vendor onboarding portals sign their deliveries with this shared secret
    onboarding: { secret: env.ONBOARDING_SECRET || '' },
    sampcrew: {
      url: /^https:\/\//.test(env.SAMPCREW_API_URL || '') ? env.SAMPCREW_API_URL.replace(/\/+$/, '') : '',
      key: env.SAMPCREW_API_KEY || '',
      webhookSecret: env.SAMPCREW_WEBHOOK_SECRET || '',
    },
  };
}

export const config = {
  port: +(env.PORT || 8787),
  // MongoDB holds everything the API stores: leads, reviews, chats, site content, uploaded files, visits, admin log
  mongoUri: env.MONGODB_URI || 'mongodb://127.0.0.1:27017',
  mongoDb: env.MONGODB_DB || 'frequentresearch',
  // HMAC key for CAPTCHA ids, admin sign-in tokens and IP hashes. Required in production; random for this run otherwise.
  secret: env.REVIEW_SECRET || crypto.randomBytes(32).toString('hex'),
  secretIsRandom: !env.REVIEW_SECRET,
  // super admin password (also accepted as "Authorization: Bearer …" by scripts). Empty = admin off.
  // super admin sign-in: username ADMIN_USER, password ADMIN_TOKEN. Default admin / admin (Kunal, 6 Nov 2026): change both
  // before going live; the panel shows a warning while the defaults are in use.
  // build 78.3: no shared admin password any more. Admin emails must be on these domains (comma list; * = any)
  adminDomains: (env.ADMIN_EMAIL_DOMAINS || 'frequentresearch.com').toLowerCase().split(/[,; ]+/).filter(Boolean),
  publishMode: (env.PUBLISH_MODE || 'auto').toLowerCase() === 'manual' ? 'manual' : 'auto',
  // number of proxies in front of this server (the frontend nginx counts as one); used for the client IP
  trustProxy: env.TRUST_PROXY === undefined ? 1 : /^\d+$/.test(env.TRUST_PROXY) ? +env.TRUST_PROXY : env.TRUST_PROXY === 'true',
  leads: (env.LEADS || 'on').toLowerCase() !== 'off',
  // largest upload the super admin can send (photos, PDFs, logos), in MB
  uploadMb: Math.max(1, +(env.UPLOAD_MB || 20)),
  // DEV=1: form endpoints only log to the console and the chat answers with a stub (local testing)
  dev: env.DEV === '1',

  ...integrationsFrom(env),
  workers: env.WORKERS !== '0', // 0 = no background sending (tests, a second backend container)
};

export const applyKeys = (merged) => Object.assign(config, integrationsFrom(merged));
