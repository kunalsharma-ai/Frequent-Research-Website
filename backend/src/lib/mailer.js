// Build 78: sending email. One function, send({ to, subject, html, text }), for every provider:
//   MAIL_PROVIDER=smtp      SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (Google Workspace, Microsoft 365, Zoho, Amazon SES SMTP …)
//   MAIL_PROVIDER=resend    RESEND_API_KEY
//   MAIL_PROVIDER=sendgrid  SENDGRID_API_KEY
//   MAIL_PROVIDER=brevo     BREVO_API_KEY
// MAIL_FROM is the sender ("Frequent Research <hello@frequentresearch.com>"); its domain must be verified with the
// provider (SPF / DKIM), or mail lands in spam. Without a provider nothing is sent and the queue keeps the emails.
import nodemailer from 'nodemailer';
import { config } from '../config.js';
import { onKeysChange } from './keystore.js';

let smtp = null;
// build 78.4: keys changed in the admin panel -> make the SMTP connection again
onKeysChange(() => { if (smtp) { try { smtp.close(); } catch { /* ignore */ } } smtp = null; });
const M = () => config.mail;

export const mailReady = () => {
  const m = M();
  if (!m.from) return false;
  if (m.provider === 'smtp') return !!m.smtp.host;
  if (m.provider === 'resend') return !!m.resendKey;
  if (m.provider === 'sendgrid') return !!m.sendgridKey;
  if (m.provider === 'brevo') return !!m.brevoKey;
  return false;
};

export const mailStatus = () => ({ provider: M().provider, ready: mailReady(), from: M().from || '', replyTo: M().replyTo || '', notify: M().notify, perMinute: M().perMinute });

// "Name <a@b.c>" -> { name, email }
const addr = (s) => { const m = /^\s*(.*?)\s*<([^>]+)>\s*$/.exec(String(s || '')); return m ? { name: m[1].replace(/^"|"$/g, ''), email: m[2] } : { name: '', email: String(s || '').trim() }; };

async function post(url, headers, body) {
  const r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(body), signal: AbortSignal.timeout(20000) });
  const t = await r.text();
  if (!r.ok) throw new Error(`${r.status} ${t.slice(0, 300)}`);
  try { return JSON.parse(t); } catch { return {}; }
}

export async function sendMail({ to, subject, html, text, replyTo, headers = {} }) {
  if (!mailReady()) throw new Error('Email is not connected (set MAIL_PROVIDER, MAIL_FROM and the provider key in .env).');
  const m = M(), from = m.from, rt = replyTo || m.replyTo || undefined;
  if (m.provider === 'smtp') {
    if (!smtp) smtp = nodemailer.createTransport({ host: m.smtp.host, port: m.smtp.port, secure: m.smtp.secure, auth: m.smtp.user ? { user: m.smtp.user, pass: m.smtp.pass } : undefined, pool: true, maxConnections: 3 });
    const r = await smtp.sendMail({ from, to, subject, html, text, replyTo: rt, headers });
    return { id: r.messageId || '' };
  }
  if (m.provider === 'resend') {
    const r = await post('https://api.resend.com/emails', { Authorization: 'Bearer ' + m.resendKey }, { from, to: [to], subject, html, text, reply_to: rt, headers });
    return { id: r.id || '' };
  }
  if (m.provider === 'sendgrid') {
    const f = addr(from);
    await post('https://api.sendgrid.com/v3/mail/send', { Authorization: 'Bearer ' + m.sendgridKey }, {
      personalizations: [{ to: [{ email: to }] }], from: { email: f.email, name: f.name || undefined }, reply_to: rt ? addr(rt) : undefined,
      subject, content: [{ type: 'text/plain', value: text || ' ' }, { type: 'text/html', value: html }], headers,
    });
    return { id: '' };
  }
  if (m.provider === 'brevo') {
    const f = addr(from);
    const r = await post('https://api.brevo.com/v3/smtp/email', { 'api-key': m.brevoKey }, { sender: { email: f.email, name: f.name || undefined }, to: [{ email: to }], subject, htmlContent: html, textContent: text, replyTo: rt ? addr(rt) : undefined, headers });
    return { id: r.messageId || '' };
  }
  throw new Error('Unknown MAIL_PROVIDER ' + m.provider);
}
