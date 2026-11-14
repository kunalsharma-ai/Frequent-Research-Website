// Image CAPTCHA for the review form: a random 5-character code drawn as SVG. The id is expiry.nonce.hmac(answer), so
// nothing is stored until it is used; a used nonce is remembered until it expires (one answer per challenge).
import crypto from 'node:crypto';
import { config } from '../config.js';

const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const used = new Map();
setInterval(() => { const now = Date.now(); for (const [n, e] of used) if (e < now) used.delete(n); }, 300e3).unref();

const sign = (s) => crypto.createHmac('sha256', config.secret).update(s).digest('base64url');

export function captcha() {
  const code = Array.from(crypto.randomBytes(5), (b) => CHARS[b % CHARS.length]).join('');
  const exp = Date.now() + 10 * 60e3, nonce = crypto.randomBytes(9).toString('base64url');
  const sig = sign(`${exp}.${nonce}.${code}`);
  const r = (a, b) => a + crypto.randomInt(0, 1000) / 1000 * (b - a);
  const f = (n) => n.toFixed(1);
  const lines = Array.from({ length: 6 }, (_, i) => `<path d="M${f(r(0, 168))} ${f(r(0, 56))} C${f(r(0, 168))} ${f(r(0, 56))} ${f(r(0, 168))} ${f(r(0, 56))} ${f(r(0, 168))} ${f(r(0, 56))}" stroke="hsl(${i * 53 % 360},70%,55%)" stroke-opacity=".4" stroke-width="${f(r(1, 2.4))}" fill="none"/>`).join('');
  const cols = ['#0B22A8', '#7C4DFF', '#C2185B', '#0F7A5C', '#1E5BFF'];
  const glyphs = [...code].map((ch, i) => [ch, i]).sort(() => crypto.randomInt(0, 3) - 1)
    .map(([ch, i]) => `<text x="${18 + i * 30}" y="${f(36 + r(-6, 6))}" transform="rotate(${f(r(-16, 16))} ${18 + i * 30} 30)" font-family="Verdana,Arial,sans-serif" font-weight="800" font-size="${Math.round(r(26, 32))}" fill="${cols[i % 5]}">${ch}</text>`).join('');
  const dots = Array.from({ length: 50 }, () => `<rect x="${f(r(0, 168))}" y="${f(r(0, 56))}" width="1.4" height="1.4" fill="#14193D" fill-opacity="${r(0, 0.3).toFixed(2)}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 56" width="168" height="56"><rect width="168" height="56" fill="#EEF3FF"/>${lines}${glyphs}${dots}</svg>`;
  return { id: `${exp}.${nonce}.${sig}`, svg };
}

export function verifyCaptcha(id, answer) {
  const [exp, nonce, sig] = String(id || '').split('.');
  if (!exp || !nonce || !sig || Date.now() > +exp || used.has(nonce)) return false;
  const want = sign(`${exp}.${nonce}.${String(answer || '').trim().toUpperCase()}`);
  const ok = want.length === sig.length && crypto.timingSafeEqual(Buffer.from(want), Buffer.from(sig));
  if (ok) used.set(nonce, +exp);
  return ok;
}
