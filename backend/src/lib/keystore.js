// Build 78.4: connection keys saved in the database (collection "settings_keys"), typed in the admin panel under
// Connections & keys by an admin with the Configure right (Super Admin, IT Admin), after the authenticator code.
//   - secret values (passwords, API keys, tokens) are encrypted with AES-256-GCM before they reach MongoDB. The
//     encryption key comes from KEYS_SECRET in .env, or from REVIEW_SECRET when KEYS_SECRET is not set. Keep that value
//     safe: without it the saved keys cannot be read (a restored backup needs the same value).
//   - a value saved here wins over the same name in .env; clearing it falls back to .env.
//   - the panel never gets a secret back, only "saved" and its last 4 characters.
//   - every backend container re-reads the keys every 60 seconds, so a second container picks up a change too.
import crypto from 'node:crypto';
import { applyKeys } from '../config.js';
import { col, dbReady } from '../db.js';

// [name, secret?, group]
export const KEY_LIST = [
  ['PUBLIC_URL', false, 'Site'], ['PUBLISH_MODE', false, 'Site'], ['LEADS', false, 'Site'],
  ['MAIL_PROVIDER', false, 'Email'], ['MAIL_FROM', false, 'Email'], ['MAIL_REPLY_TO', false, 'Email'], ['MAIL_NOTIFY', false, 'Email'],
  ['SMTP_HOST', false, 'Email'], ['SMTP_PORT', false, 'Email'], ['SMTP_SECURE', false, 'Email'], ['SMTP_USER', false, 'Email'], ['SMTP_PASS', true, 'Email'],
  ['RESEND_API_KEY', true, 'Email'], ['SENDGRID_API_KEY', true, 'Email'], ['BREVO_API_KEY', true, 'Email'], ['MAIL_PER_MINUTE', false, 'Email'],
  ['ANTHROPIC_API_KEY', true, 'AI'], ['AI_MODEL', false, 'AI'],
  ['FB_PAGE_ID', false, 'Social media'], ['FB_PAGE_TOKEN', true, 'Social media'], ['IG_USER_ID', false, 'Social media'], ['IG_TOKEN', true, 'Social media'],
  ['LINKEDIN_AUTHOR_URN', false, 'Social media'], ['LINKEDIN_TOKEN', true, 'Social media'],
  ['X_API_KEY', true, 'Social media'], ['X_API_SECRET', true, 'Social media'], ['X_ACCESS_TOKEN', true, 'Social media'], ['X_ACCESS_SECRET', true, 'Social media'],
  ['SOCIAL_WEBHOOK', true, 'Social media'], ['FB_GRAPH_VERSION', false, 'Social media'], ['LINKEDIN_VERSION', false, 'Social media'],
  ['SAMPCREW_API_URL', false, 'SampCrew'], ['SAMPCREW_API_KEY', true, 'SampCrew'], ['SAMPCREW_WEBHOOK_SECRET', true, 'SampCrew'],
  ['LEAD_WEBHOOK', true, 'CRM'],
  ['SAMPFORCE_WEBHOOK_URL', true, 'Sampforce'], ['SAMPFORCE_WEBHOOK_SECRET', true, 'Sampforce'], ['SAMPFORCE_WEBHOOK_EVENTS', false, 'Sampforce'],
  ['ONBOARDING_SECRET', true, 'Onboarding portals'],
];
const META = new Map(KEY_LIST.map(([k, s, g]) => [k, { secret: s, group: g }]));
export const isKey = (k) => META.has(k);

// non-secret values are checked so a typo cannot break sending
const CHECK = {
  PUBLIC_URL: /^https?:\/\/[^\s/]+$/, PUBLISH_MODE: /^(auto|manual)$/i, LEADS: /^(on|off)$/i, FB_GRAPH_VERSION: /^v\d{1,2}\.\d$/, LINKEDIN_VERSION: /^\d{6}$/, MAIL_PROVIDER: /^(smtp|resend|sendgrid|brevo|off)$/i, SMTP_PORT: /^\d{2,5}$/, SMTP_SECURE: /^[01]$/, MAIL_PER_MINUTE: /^\d{1,4}$/,
  SAMPCREW_API_URL: /^https:\/\/\S+$/, SOCIAL_WEBHOOK: /^https:\/\/\S+$/, LEAD_WEBHOOK: /^https:\/\/\S+$/, SAMPFORCE_WEBHOOK_URL: /^https:\/\/\S+$/, SAMPFORCE_WEBHOOK_EVENTS: /^[a-z.*]+([ ,;]+[a-z.*]+)*$/, AI_MODEL: /^[a-z0-9][a-z0-9.\-[\]]{1,80}$/i,
};
export function checkValue(k, v) {
  if (typeof v !== 'string') return 'must be text';
  if (!v.trim()) return 'is empty';
  if (v.length > 4000 || /[\u0000-\u001F]/.test(v)) return 'has characters that are not allowed';
  if (CHECK[k] && !CHECK[k].test(v.trim())) return 'does not look right';
  return '';
}

const encKey = () => {
  const base = process.env.KEYS_SECRET || process.env.REVIEW_SECRET;
  return base ? crypto.createHash('sha256').update('fr-keys|' + base).digest() : null;
};
export const canSave = () => !!encKey();

export function seal(text) {
  const iv = crypto.randomBytes(12), c = crypto.createCipheriv('aes-256-gcm', encKey(), iv);
  const ct = Buffer.concat([c.update(String(text), 'utf8'), c.final()]);
  return { iv: iv.toString('base64'), tag: c.getAuthTag().toString('base64'), ct: ct.toString('base64') };
}
export function open(box) {
  const d = crypto.createDecipheriv('aes-256-gcm', encKey(), Buffer.from(box.iv, 'base64'));
  d.setAuthTag(Buffer.from(box.tag, 'base64'));
  return Buffer.concat([d.update(Buffer.from(box.ct, 'base64')), d.final()]).toString('utf8');
}

let saved = {};   // name -> { value, at, by }   (decrypted, kept only in memory)
let broken = [];  // names that could not be decrypted (KEYS_SECRET changed)
const hooks = new Set();
export const onKeysChange = (fn) => hooks.add(fn);

export async function loadKeys() {
  if (!dbReady()) return;
  const rows = await col('settings_keys').find({}).toArray();
  const next = {}, bad = [];
  for (const r of rows) {
    if (!META.has(r._id)) continue;
    try { next[r._id] = { value: r.box ? (encKey() ? open(r.box) : null) : r.value, at: r.at, by: r.by }; if (next[r._id].value == null) throw new Error('no key'); } catch { delete next[r._id]; bad.push(r._id); }
  }
  const before = JSON.stringify(Object.entries(saved).map(([k, v]) => [k, v.value]));
  saved = next; broken = bad;
  applyKeys(merged());
  if (before !== JSON.stringify(Object.entries(saved).map(([k, v]) => [k, v.value]))) for (const fn of hooks) try { fn(); } catch { /* keep going */ }
}

export const merged = () => ({ ...process.env, ...Object.fromEntries(Object.entries(saved).map(([k, v]) => [k, v.value])) });

const tail = (v) => (v.length > 8 ? '…' + v.slice(-4) : '');
export function keyStatus() {
  const env = process.env;
  return KEY_LIST.map(([k, secret, group]) => {
    const s = saved[k], fromEnv = !!env[k];
    const val = s ? s.value : env[k] || '';
    return {
      key: k, group, secret, set: !!val, source: s ? 'database' : fromEnv ? 'server' : '', broken: broken.includes(k),
      value: secret ? '' : val, hint: secret && val ? tail(val) : '', at: s ? s.at : null, by: s ? s.by : '',
    };
  });
}

// values: { NAME: "new value" | null (remove from the database) }
export async function saveKeys(values, by) {
  const done = [];
  for (const [k, v] of Object.entries(values)) {
    if (v === null) { await col('settings_keys').deleteOne({ _id: k }); done.push(k); continue; }
    const val = v.trim(), secret = META.get(k).secret;
    await col('settings_keys').updateOne({ _id: k }, { $set: { ...(secret ? { box: seal(val), value: null } : { value: val, box: null }), at: new Date(), by } }, { upsert: true });
    done.push(k);
  }
  await loadKeys();
  return done;
}

let timer = null;
export function watchKeys(ms = 60000) {
  if (timer) return;
  timer = setInterval(() => loadKeys().catch((e) => console.warn('[keys] reload failed:', e.message)), ms);
  timer.unref();
}
