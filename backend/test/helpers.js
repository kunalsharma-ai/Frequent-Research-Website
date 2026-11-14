// Build 78.3 test helpers: make an admin the real way (setup link -> password -> authenticator) and sign in.
import { totp } from '../src/lib/auth.js';
import { provisionAdmin } from '../src/routes/users.js';

export const PASSWORD = 'Blue-Harbour-2026!';
const step = () => Math.floor(Date.now() / 30000);
// a code nobody used yet: setup takes the previous 30-second code, sign-in the current one, step-up the next one
export const code = (secret, offset = 0) => totp(secret, step() + offset);

export async function makeAdmin(B, { email, name = 'Test Admin', role = 'super', grants } = {}) {
  const { token, user } = await provisionAdmin({ email, name, role, by: 'test' });
  const j = (r) => r.json();
  const post = (p, body, h = {}) => fetch(B + p, { method: 'POST', headers: { 'content-type': 'application/json', ...h }, body: JSON.stringify(body) });
  const pw = await j(await post(`/api/v1/admin/setup/${token}/password`, { password: PASSWORD }));
  if (!pw.ok) throw new Error('setup password: ' + pw.error);
  const done = await j(await post(`/api/v1/admin/setup/${token}/mfa`, { code: code(pw.secret, -1) }));
  if (!done.ok) throw new Error('setup mfa: ' + done.error);
  const headers = { authorization: 'Bearer ' + done.token };
  if (grants) {
    // grants are given by a Super Admin; tests set them straight in the database through the API's own user update
    const { col } = await import('../src/db.js');
    await col('admin_users').updateOne({ _id: user._id }, { $set: { grants } });
  }
  return { id: user._id, email, secret: pw.secret, recovery: done.recovery, token: done.token, headers, setupToken: token };
}

export async function signIn(B, email, secret, offset = 0) {
  const post = (p, body) => fetch(B + p, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
  const a = await (await post('/api/v1/admin/login', { email, password: PASSWORD })).json();
  if (!a.ok) return a;
  return (await post('/api/v1/admin/login/mfa', { ticket: a.ticket, code: code(secret, offset) })).json();
}
