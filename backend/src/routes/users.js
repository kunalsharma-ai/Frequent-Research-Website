// Build 78.3: sign-in with MFA, invitations, admins, roles, sessions and the admin's own account.
//
// Sign-in (no default credentials; the first Super Admin comes from `npm run admin -- create-super-admin`)
//   POST /api/v1/admin/login            { email, password }        -> { mfa: true, ticket }
//   POST /api/v1/admin/login/mfa        { ticket, code | recovery } -> { token, expires, user }
//   POST /api/v1/admin/logout
//   GET  /api/v1/admin/me               the admin, what they may do (perms, grants), modules, step-up state
//   POST /api/v1/admin/step-up          { code }  confirm with MFA before sensitive actions (10 minutes)
// Setup link (invitation, first Super Admin, reset): public, token in the link, single use, expires
//   GET  /api/v1/admin/setup/:token     -> { email, name, kind }
//   POST /api/v1/admin/setup/:token/password  { password } -> { secret, otpauth }
//   POST /api/v1/admin/setup/:token/mfa       { code }     -> { token, recovery: [10 one-time codes] }
// Admins (users: view / create / edit / delete / manage)
//   GET  /api/v1/admin/users            ?q=&status=&role=&limit=&skip=
//   POST /api/v1/admin/users            { email, name, mobile, department, designation, role, grants } -> sends the invitation
//   PATCH /api/v1/admin/users/:id       profile, role, grants
//   POST /api/v1/admin/users/:id/{resend|suspend|deactivate|reactivate|revoke-sessions|reset}
//   GET  /api/v1/admin/users/:id/sessions
// Roles (users: manage)
//   GET  /api/v1/admin/roles            roles, modules and actions ;  PUT /admin/roles/:id { name, note, perms } ;  DELETE /admin/roles/:id
// Own account
//   GET  /api/v1/admin/account/sessions ; POST /admin/account/sessions/:id/revoke ; POST /admin/account/password { current, password, code }
//   POST /api/v1/admin/account/recovery-codes { code } -> new codes
import { Router } from 'express';
import { col } from '../db.js';
import { config } from '../config.js';
import { ah, audit, clean, EMAIL, newId, page, rateLimit, requireAdmin, sessionUser } from '../lib/util.js';
import { mailReady, sendMail } from '../lib/mailer.js';
import {
  ACTIONS, BUILTIN_ROLES, MODULES, STEP_MS, can, checkPassword, effective, emailAllowed, hashPassword, mfaTicket, mfaTicketUser, newInvite, newRecoveryCodes,
  newSession, newTotpSecret, otpauthUrl, passwordProblem, publicUser, revokeSessions, roles, rolesChanged, setupLink, sha, totpCheck,
} from '../lib/auth.js';

export const usersRouter = Router();
const U = () => col('admin_users');
const bad = (res, error, status = 400) => res.status(status).json({ ok: false, error });
const LOCK_AFTER = 5, LOCK_MS = 15 * 60e3;

/* ---- sign-in ------------------------------------------------------------------------------------------------------ */
const loginLimit = rateLimit('login', 10, 900e3, 'Too many sign-in attempts. Please wait 15 minutes.');
usersRouter.post('/admin/login', loginLimit, ah(async (req, res) => {
  const b = req.body || {};
  const email = clean(b.email || b.username, 160).toLowerCase();
  const u = email ? await U().findOne({ email }) : null;
  const pwOk = checkPassword(b.password, u && u.pw); // always runs the hash, so timing does not tell if the email exists
  req.actor = { email };
  if (u && u.lockUntil && +u.lockUntil > Date.now()) { await audit(req, 'login-locked', email); return bad(res, 'This account is locked for 15 minutes after too many wrong passwords.', 429); }
  if (!u || !pwOk || u.status !== 'active' || !(u.mfa && u.mfa.on)) {
    if (u) { const f = (u.failed || 0) + 1; await U().updateOne({ _id: u._id }, { $set: { failed: f, ...(f >= LOCK_AFTER ? { lockUntil: new Date(Date.now() + LOCK_MS), failed: 0 } : {}) } }); }
    await audit(req, 'login-failed', email, { reason: !u ? 'unknown email' : !pwOk ? 'wrong password' : u.status !== 'active' ? 'account ' + u.status : 'no MFA' });
    return bad(res, u && pwOk && u.status !== 'active' ? 'This account is ' + u.status + '. Ask your Super Admin.' : 'Wrong email or password.', 401);
  }
  res.json({ ok: true, mfa: true, ticket: mfaTicket(u._id) });
}));

usersRouter.post('/admin/login/mfa', loginLimit, ah(async (req, res) => {
  const b = req.body || {};
  const id = mfaTicketUser(b.ticket);
  const u = id ? await U().findOne({ _id: id }) : null;
  if (!u || u.status !== 'active') return bad(res, 'The sign-in took too long. Please start again.', 401);
  req.actor = { id: u._id, email: u.email };
  let how = 'mfa';
  const step = totpCheck(u.mfa.secret, b.code, u.mfa.last || -1);
  if (step >= 0) await U().updateOne({ _id: u._id }, { $set: { 'mfa.last': step } });
  else {
    const rc = clean(b.recovery, 40).toLowerCase();
    if (!rc || !(u.recovery || []).includes(sha(rc))) {
      const f = (u.failed || 0) + 1;
      await U().updateOne({ _id: u._id }, { $set: { failed: f, ...(f >= LOCK_AFTER ? { lockUntil: new Date(Date.now() + LOCK_MS), failed: 0 } : {}) } });
      await audit(req, 'login-failed', u.email, { reason: 'wrong MFA code' });
      return bad(res, 'Wrong code. Use the 6-digit code from your authenticator app.', 401);
    }
    await U().updateOne({ _id: u._id }, { $pull: { recovery: sha(rc) } });
    how = 'recovery code';
  }
  await U().updateOne({ _id: u._id }, { $set: { lastLogin: new Date(), failed: 0 }, $unset: { lockUntil: '' } });
  const s = await newSession(u, req);
  req.admin = { user: u };
  await audit(req, 'login', u.email, { with: how, recoveryLeft: how === 'recovery code' ? (u.recovery || []).length - 1 : undefined });
  res.json({ ok: true, ...s, user: publicUser(u) });
}));

usersRouter.post('/admin/logout', requireAdmin, ah(async (req, res) => {
  await col('admin_sessions').updateOne({ _id: req.admin.session._id }, { $set: { revoked: true, revokedAt: new Date() } });
  await audit(req, 'logout', req.admin.user.email);
  res.json({ ok: true });
}));

usersRouter.get('/admin/me', requireAdmin, ah(async (req, res) => {
  const u = req.admin.user, s = req.admin.session;
  const R = await roles();
  res.json({
    ok: true, user: publicUser(u), roleName: (R.get(u.role) || {}).name || u.role, perms: await effective(u), grants: u.grants || [],
    modules: MODULES, stepUp: !!(s.stepUp && Date.now() - +s.stepUp < STEP_MS), sessionExpires: s.exp,
    mail: mailReady(),
  });
}));

// confirm with the authenticator before sensitive actions (admins, roles, keys, exports, CVs)
usersRouter.post('/admin/step-up', requireAdmin, rateLimit('stepup', 10, 900e3), ah(async (req, res) => {
  const u = req.admin.user;
  const step = totpCheck(u.mfa && u.mfa.secret, (req.body || {}).code, (u.mfa && u.mfa.last) || -1);
  if (step < 0) { await audit(req, 'step-up-failed', u.email); return bad(res, 'Wrong code.', 401); }
  await U().updateOne({ _id: u._id }, { $set: { 'mfa.last': step } });
  await col('admin_sessions').updateOne({ _id: req.admin.session._id }, { $set: { stepUp: new Date() } });
  res.json({ ok: true, until: new Date(Date.now() + STEP_MS).toISOString() });
}));
export function requireStepUp(req, res, next) {
  const s = req.admin && req.admin.session;
  if (s && s.stepUp && Date.now() - +s.stepUp < STEP_MS) return next();
  res.status(403).json({ ok: false, stepUp: true, error: 'Please confirm with the code from your authenticator app.' });
}

/* ---- setup links (invitation, first Super Admin, reset) ------------------------------------------------------------ */
const setupLimit = rateLimit('setup', 30, 900e3);
async function byToken(t) {
  const u = t ? await U().findOne({ 'invite.hash': sha(t) }) : null;
  if (!u || !u.invite || +u.invite.exp < Date.now() || u.status === 'deactivated' || u.status === 'suspended') return null;
  return u;
}
usersRouter.get('/admin/setup/:token', setupLimit, ah(async (req, res) => {
  const u = await byToken(req.params.token);
  if (!u) return bad(res, 'This link has expired or was already used. Ask your Super Admin for a new one.', 404);
  res.json({ ok: true, email: u.email, name: u.name, kind: u.invite.kind, step: u.invite.pw ? 'mfa' : 'password' });
}));
usersRouter.post('/admin/setup/:token/password', setupLimit, ah(async (req, res) => {
  const u = await byToken(req.params.token);
  if (!u) return bad(res, 'This link has expired or was already used.', 404);
  const p = passwordProblem((req.body || {}).password, u.email);
  if (p) return bad(res, p);
  const secret = newTotpSecret();
  await U().updateOne({ _id: u._id }, { $set: { 'invite.pw': hashPassword(req.body.password), 'invite.secret': secret } });
  res.json({ ok: true, secret, otpauth: otpauthUrl(secret, u.email) });
}));
usersRouter.post('/admin/setup/:token/mfa', setupLimit, ah(async (req, res) => {
  const u = await byToken(req.params.token);
  if (!u || !u.invite.pw || !u.invite.secret) return bad(res, 'This link has expired or was already used.', 404);
  const step = totpCheck(u.invite.secret, (req.body || {}).code);
  if (step < 0) return bad(res, 'That code did not match. Check the time on your phone and try the newest code.');
  const codes = newRecoveryCodes();
  await U().updateOne({ _id: u._id }, {
    $set: { pw: u.invite.pw, mfa: { secret: u.invite.secret, on: true, last: step }, recovery: codes.map(sha), status: 'active', emailVerified: new Date(), lastLogin: new Date(), failed: 0, activated: u.activated || new Date() },
    $unset: { invite: '', lockUntil: '' },
  });
  await revokeSessions(u._id);
  const fresh = await U().findOne({ _id: u._id });
  const s = await newSession(fresh, req);
  req.admin = { user: fresh };
  await audit(req, u.invite.kind === 'reset' ? 'account-reset-done' : 'account-activated', u.email, { kind: u.invite.kind });
  res.json({ ok: true, ...s, recovery: codes, user: publicUser(fresh) });
}));

/* ---- admins ------------------------------------------------------------------------------------------------------- */
const need = (module, action, step) => [requireAdmin, ah(async (req, res, next) => { if (await can(req.admin.user, module, action)) return next(); res.status(403).json({ ok: false, error: 'You do not have permission for this.' }); }), ...(step ? [requireStepUp] : [])];

function cleanGrants(g) {
  if (!Array.isArray(g)) return [];
  return g.slice(0, 100).map((x) => ({
    module: MODULES[x && x.module] ? x.module : '',
    actions: [...new Set((x.actions || []).filter((a) => (MODULES[x.module] || { actions: [] }).actions.includes(a)))],
    keys: [...new Set((x.keys || []).map((k) => clean(k, 160)).filter((k) => /^(data:[a-z0-9][a-z0-9/_.-]{0,150}\.json|celebrations:\d{4}|[a-z][a-z0-9-]{1,40})$/.test(k)))].slice(0, 100),
    paths: [...new Set((x.paths || []).map((p) => clean(p, 200)).filter((p) => p === '*' || /^\/[a-z0-9/_*.-]*$/i.test(p)))].slice(0, 200),
    note: clean(x.note, 200),
  })).filter((x) => x.module && x.actions.length);
}
// nobody can hand out more than they have: a non-Super Admin may only give roles and grants within their own rights
async function withinOwn(actor, role, grants) {
  if (actor.role === 'super') return '';
  if (role === 'super') return 'Only a Super Admin can make another Super Admin.';
  const R = await roles(), r = R.get(role);
  if (!r) return 'Unknown role.';
  for (const [m, acts] of Object.entries(r.perms)) for (const a of acts) if (!(await can(actor, m, a, { whole: true }))) return `You cannot give "${a}" on ${MODULES[m] ? MODULES[m].label : m}, because you do not have it yourself.`;
  // a grant limited to some keys or pages may be given by someone who has those keys or pages
  for (const g of grants) for (const a of g.actions) {
    const scopes = g.paths.length ? g.paths.flatMap((p) => (g.keys.length ? g.keys : [undefined]).map((key) => ({ key, path: p.replace(/\/\*$/, '') || '/', whole: true })))
      : g.keys.length ? g.keys.map((key) => ({ key, whole: true })) : [{ whole: true }];
    for (const sc of scopes) if (!(await can(actor, g.module, a, sc))) return `You cannot give "${a}" on ${MODULES[g.module].label}${sc.key || sc.path ? ' (' + [sc.key, sc.path].filter(Boolean).join(' ') + ')' : ''}, because you do not have it yourself.`;
  }
  return '';
}
async function sendSetup(u, token, kind) {
  const link = setupLink(token);
  if (!mailReady()) return { sent: false, link };
  const what = kind === 'reset' ? 'reset your access to' : 'join';
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0B1437;max-width:560px">
<p>Hello ${String(u.name || '').replace(/[<>&]/g, '')},</p>
<p>You have been invited to ${what} the Frequent Research admin panel${kind === 'invite' && u.invitedBy ? ' by ' + String(u.invitedBy).replace(/[<>&]/g, '') : ''}.</p>
<p><a href="${link}" style="display:inline-block;background:#2F6BFF;color:#fff;padding:12px 20px;border-radius:10px;text-decoration:none;font-weight:bold">Set your password and authenticator</a></p>
<p style="color:#5A6482;font-size:13px">The link works once and expires ${kind === 'setup' ? 'in 24 hours' : 'in 72 hours'}. You need an authenticator app (Google Authenticator, Microsoft Authenticator, 1Password…). If you did not expect this email, ignore it.</p></div>`;
  try { await sendMail({ to: u.email, subject: kind === 'reset' ? 'Reset your Frequent Research admin access' : 'Your Frequent Research admin invitation', html, text: `Open this link to set up your admin account: ${link}` }); return { sent: true }; }
  catch (e) { return { sent: false, link, error: e.message }; }
}
const userRow = (u) => publicUser(u);

usersRouter.get('/admin/users', ...need('users', 'view'), ah(async (req, res) => {
  const { limit, skip } = page(req, 200);
  const f = {};
  const q = clean(req.query.q, 80);
  if (q) { const re = { $regex: q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), $options: 'i' }; f.$or = [{ email: re }, { name: re }, { department: re }, { designation: re }]; }
  if (req.query.status) f.status = clean(req.query.status, 20);
  if (req.query.role) f.role = clean(req.query.role, 40);
  const [rows, total] = await Promise.all([U().find(f).sort({ status: 1, name: 1 }).skip(skip).limit(limit).toArray(), U().countDocuments(f)]);
  res.json({ ok: true, total, users: rows.map(userRow) });
}));

usersRouter.post('/admin/users', ...need('users', 'create', true), ah(async (req, res) => {
  const b = req.body || {};
  const email = clean(b.email, 160).toLowerCase();
  if (!EMAIL.test(email)) return bad(res, 'Enter a valid email address.');
  if (!emailAllowed(email)) return bad(res, 'Admins must use an official email (' + config.adminDomains.join(', ') + ').');
  if (await U().findOne({ email })) return bad(res, 'There is already an admin with this email.');
  const name = clean(b.name, 120);
  if (!name) return bad(res, 'Enter the name.');
  const role = clean(b.role, 40) || 'viewer';
  if (!(await roles()).has(role)) return bad(res, 'Unknown role.');
  const grants = cleanGrants(b.grants);
  const why = await withinOwn(req.admin.user, role, grants);
  if (why) return bad(res, why, 403);
  const { token, invite } = newInvite('invite');
  const u = { _id: newId('u_'), email, name, mobile: clean(b.mobile, 30), department: clean(b.department, 80), designation: clean(b.designation, 80), role, grants, status: 'invited', invite, created: new Date(), by: req.admin.user.email, invitedBy: req.admin.user.name };
  await U().insertOne(u);
  const sent = await sendSetup(u, token, 'invite');
  await audit(req, 'admin-invited', email, { role, grants: grants.length, emailed: sent.sent });
  res.json({ ok: true, user: userRow(u), emailed: sent.sent, link: sent.sent ? undefined : sent.link, note: sent.sent ? 'Invitation sent.' : 'Email is not set up on the server, so send this one-time link to the person yourself, privately.' });
}));

usersRouter.patch('/admin/users/:id', ...need('users', 'edit', true), ah(async (req, res) => {
  const u = await U().findOne({ _id: clean(req.params.id, 40) });
  if (!u) return bad(res, 'Not found', 404);
  const b = req.body || {}, me = req.admin.user;
  if (u.role === 'super' && me.role !== 'super') return bad(res, 'Only a Super Admin can change a Super Admin.', 403);
  const set = {};
  for (const [k, max] of [['name', 120], ['mobile', 30], ['department', 80], ['designation', 80]]) if (k in b) set[k] = clean(b[k], max);
  if ('role' in b || 'grants' in b) {
    if (!(await can(me, 'users', 'manage'))) return bad(res, 'Changing roles and access needs the "manage" right on admins.', 403);
    const role = 'role' in b ? clean(b.role, 40) : u.role;
    if (!(await roles()).has(role)) return bad(res, 'Unknown role.');
    const grants = 'grants' in b ? cleanGrants(b.grants) : u.grants || [];
    const why = await withinOwn(me, role, grants);
    if (why) return bad(res, why, 403);
    if (u._id === me._id && role !== u.role) return bad(res, 'You cannot change your own role.', 403);
    if (u.role === 'super' && role !== 'super' && (await U().countDocuments({ role: 'super', status: 'active' })) <= 1) return bad(res, 'Keep at least one active Super Admin.');
    set.role = role; set.grants = grants;
  }
  await U().updateOne({ _id: u._id }, { $set: set });
  await audit(req, 'admin-changed', u.email, { fields: Object.keys(set), role: set.role, from: set.role ? u.role : undefined });
  res.json({ ok: true, user: userRow(await U().findOne({ _id: u._id })) });
}));

for (const act of ['resend', 'suspend', 'deactivate', 'reactivate', 'revoke-sessions', 'reset']) {
  const right = act === 'deactivate' ? 'delete' : act === 'resend' ? 'create' : 'edit';
  usersRouter.post(`/admin/users/:id/${act}`, ...need('users', right, true), ah(async (req, res) => {
    const u = await U().findOne({ _id: clean(req.params.id, 40) });
    if (!u) return bad(res, 'Not found', 404);
    const me = req.admin.user;
    if (u.role === 'super' && me.role !== 'super') return bad(res, 'Only a Super Admin can do this to a Super Admin.', 403);
    if (u._id === me._id && act !== 'revoke-sessions') return bad(res, 'Use My account for your own sign-in.', 403);
    const lastSuper = u.role === 'super' && u.status === 'active' && (await U().countDocuments({ role: 'super', status: 'active' })) <= 1;
    let out = {};
    if (act === 'resend') {
      if (u.status !== 'invited') return bad(res, 'Only a pending invitation can be sent again.');
      const { token, invite } = newInvite('invite');
      await U().updateOne({ _id: u._id }, { $set: { invite } });
      const sent = await sendSetup(u, token, 'invite');
      out = { emailed: sent.sent, link: sent.sent ? undefined : sent.link };
    } else if (act === 'suspend' || act === 'deactivate') {
      if (lastSuper) return bad(res, 'Keep at least one active Super Admin.');
      await U().updateOne({ _id: u._id }, { $set: { status: act === 'suspend' ? 'suspended' : 'deactivated', [act + 'ed']: new Date() }, $unset: { invite: '' } });
      out.sessions = await revokeSessions(u._id);
    } else if (act === 'reactivate') {
      if (!['suspended', 'deactivated'].includes(u.status)) return bad(res, 'This account is not suspended or deactivated.');
      // a deactivated or never-activated account starts again with a setup link
      if (u.status === 'deactivated' || !u.pw) {
        const { token, invite } = newInvite('reset');
        await U().updateOne({ _id: u._id }, { $set: { status: 'invited', invite }, $unset: { pw: '', mfa: '', recovery: '' } });
        const sent = await sendSetup(u, token, 'reset');
        out = { emailed: sent.sent, link: sent.sent ? undefined : sent.link };
      } else await U().updateOne({ _id: u._id }, { $set: { status: 'active', failed: 0 }, $unset: { lockUntil: '' } });
    } else if (act === 'revoke-sessions') {
      out.sessions = await revokeSessions(u._id, u._id === me._id ? req.admin.session._id : undefined);
    } else if (act === 'reset') {
      // lost phone or password: new password and authenticator through a fresh link; signs the admin out everywhere
      const { token, invite } = newInvite('reset');
      await U().updateOne({ _id: u._id }, { $set: { invite }, $unset: { recovery: '', pw: '', mfa: '' } });
      out.sessions = await revokeSessions(u._id);
      const sent = await sendSetup(u, token, 'reset');
      out = { ...out, emailed: sent.sent, link: sent.sent ? undefined : sent.link };
    }
    await audit(req, 'admin-' + act, u.email, { sessions: out.sessions, emailed: out.emailed });
    res.json({ ok: true, ...out, user: userRow(await U().findOne({ _id: u._id })) });
  }));
}

usersRouter.get('/admin/users/:id/sessions', ...need('users', 'view'), ah(async (req, res) => {
  const rows = await col('admin_sessions').find({ user: clean(req.params.id, 40) }).sort({ created: -1 }).limit(50).toArray();
  res.json({ ok: true, sessions: rows.map((s) => ({ id: s._id.slice(0, 12), created: s.created, last: s.last, exp: s.exp, revoked: s.revoked || +s.exp < Date.now(), ua: s.ua })) });
}));

/* ---- roles -------------------------------------------------------------------------------------------------------- */
usersRouter.get('/admin/roles', requireAdmin, ah(async (req, res) => {
  const R = await roles();
  const counts = Object.fromEntries((await U().aggregate([{ $match: { status: { $ne: 'deactivated' } } }, { $group: { _id: '$role', n: { $sum: 1 } } }]).toArray()).map((r) => [r._id, r.n]));
  res.json({ ok: true, actions: ACTIONS, modules: MODULES, roles: [...R.values()].map((r) => ({ id: r._id, name: r.name, note: r.note || '', perms: r.perms, builtIn: !!r.builtIn, changed: r.builtIn && !!r.updated, users: counts[r._id] || 0 })) });
}));
usersRouter.put('/admin/roles/:id', ...need('users', 'manage', true), ah(async (req, res) => {
  const id = clean(req.params.id, 40).toLowerCase();
  if (!/^[a-z][a-z0-9-]{1,39}$/.test(id)) return bad(res, 'Role id: small letters, digits and -.');
  if (id === 'super') return bad(res, 'The Super Admin role always has every right.', 403);
  const b = req.body || {};
  const perms = {};
  for (const [m, acts] of Object.entries(b.perms || {})) if (MODULES[m]) { const a = [...new Set((acts || []).filter((x) => MODULES[m].actions.includes(x)))]; if (a.length) perms[m] = a; }
  if (req.admin.user.role !== 'super') for (const [m, acts] of Object.entries(perms)) for (const a of acts) if (!(await can(req.admin.user, m, a, { whole: true }))) return bad(res, `You cannot give "${a}" on ${MODULES[m].label}.`, 403);
  const name = clean(b.name, 60) || id;
  await col('admin_roles').updateOne({ _id: id }, { $set: { name, note: clean(b.note, 300), perms, updated: new Date(), by: req.admin.user.email } }, { upsert: true });
  rolesChanged();
  await audit(req, 'role-saved', id, { perms });
  res.json({ ok: true });
}));
usersRouter.delete('/admin/roles/:id', ...need('users', 'manage', true), ah(async (req, res) => {
  const id = clean(req.params.id, 40);
  if (id === 'super') return bad(res, 'The Super Admin role cannot be removed.', 403);
  const builtIn = BUILTIN_ROLES.some((r) => r._id === id);
  if (!builtIn && (await U().countDocuments({ role: id, status: { $ne: 'deactivated' } }))) return bad(res, 'Move the admins with this role to another role first.');
  await col('admin_roles').deleteOne({ _id: id });
  rolesChanged();
  await audit(req, builtIn ? 'role-reset' : 'role-deleted', id);
  res.json({ ok: true, reset: builtIn });
}));

/* ---- own account -------------------------------------------------------------------------------------------------- */
usersRouter.get('/admin/account/sessions', requireAdmin, ah(async (req, res) => {
  const rows = await col('admin_sessions').find({ user: req.admin.user._id, revoked: false, exp: { $gt: new Date() } }).sort({ last: -1 }).limit(30).toArray();
  res.json({ ok: true, sessions: rows.map((s) => ({ id: s._id.slice(0, 12), created: s.created, last: s.last, exp: s.exp, ua: s.ua, current: s._id === req.admin.session._id })) });
}));
usersRouter.post('/admin/account/sessions/:id/revoke', requireAdmin, ah(async (req, res) => {
  const id = clean(req.params.id, 12);
  const r = await col('admin_sessions').updateOne({ user: req.admin.user._id, _id: { $regex: '^' + id.replace(/[^a-f0-9]/g, '') }, revoked: false }, { $set: { revoked: true, revokedAt: new Date() } });
  await audit(req, 'session-revoked', req.admin.user.email);
  res.json({ ok: true, revoked: r.modifiedCount });
}));
usersRouter.post('/admin/account/password', requireAdmin, rateLimit('pwchange', 10, 900e3), ah(async (req, res) => {
  const u = req.admin.user, b = req.body || {};
  if (!checkPassword(b.current, u.pw)) return bad(res, 'Your current password is not right.', 401);
  const step = totpCheck(u.mfa.secret, b.code, u.mfa.last || -1);
  if (step < 0) return bad(res, 'Wrong authenticator code.', 401);
  const p = passwordProblem(b.password, u.email);
  if (p) return bad(res, p);
  await U().updateOne({ _id: u._id }, { $set: { pw: hashPassword(b.password), 'mfa.last': step, pwChanged: new Date() } });
  const n = await revokeSessions(u._id, req.admin.session._id);
  await audit(req, 'password-changed', u.email, { otherSessionsClosed: n });
  res.json({ ok: true, otherSessionsClosed: n });
}));
usersRouter.post('/admin/account/recovery-codes', requireAdmin, requireStepUp, ah(async (req, res) => {
  const codes = newRecoveryCodes();
  await U().updateOne({ _id: req.admin.user._id }, { $set: { recovery: codes.map(sha) } });
  await audit(req, 'recovery-codes-renewed', req.admin.user.email);
  res.json({ ok: true, recovery: codes });
}));

// build 78.4: the admin's own photo. The panel makes it a small square WebP (256 px) before sending:
//   PUT /api/v1/admin/account/photo { photo: "data:image/webp;base64,…" }   DELETE removes it
const MAGIC = { webp: (b) => b.slice(0, 4).toString() === 'RIFF' && b.slice(8, 12).toString() === 'WEBP', jpeg: (b) => b[0] === 0xff && b[1] === 0xd8, png: (b) => b.slice(1, 4).toString() === 'PNG' };
usersRouter.put('/admin/account/photo', requireAdmin, rateLimit('photo', 30, 3600e3), ah(async (req, res) => {
  const p = String((req.body && req.body.photo) || '');
  const m = /^data:image\/(webp|jpeg|png);base64,([A-Za-z0-9+/]+={0,2})$/.exec(p);
  if (!m) return bad(res, 'Please choose a JPG, PNG or WebP picture.');
  if (p.length > 200000) return bad(res, 'This picture is too big. Please choose a smaller one.', 413);
  if (!MAGIC[m[1]](Buffer.from(m[2].slice(0, 24), 'base64'))) return bad(res, 'This file is not a picture.');
  await U().updateOne({ _id: req.admin.user._id }, { $set: { photo: p, photoAt: new Date() } });
  await audit(req, 'photo-changed', req.admin.user.email);
  res.json({ ok: true, photo: p });
}));
// build 78.4: the admin's own look (colour palette, light / dark), so it follows them to every computer
const PALETTES = ['areas', 'ocean', 'aurora', 'sunset', 'forest', 'plum', 'graphite', 'rosegold', 'midnight', 'saffron'];
usersRouter.put('/admin/account/prefs', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, set = {};
  if (b.palette !== undefined) { if (!PALETTES.includes(b.palette)) return bad(res, 'Unknown colour palette'); set['prefs.palette'] = b.palette; }
  if (b.theme !== undefined) { if (!['light', 'dark', 'auto'].includes(b.theme)) return bad(res, 'Unknown theme'); set['prefs.theme'] = b.theme; }
  if (!Object.keys(set).length) return bad(res, 'Nothing to change');
  await U().updateOne({ _id: req.admin.user._id }, { $set: set });
  res.json({ ok: true });
}));
usersRouter.delete('/admin/account/photo', requireAdmin, ah(async (req, res) => {
  await U().updateOne({ _id: req.admin.user._id }, { $unset: { photo: 1, photoAt: 1 } });
  await audit(req, 'photo-removed', req.admin.user.email);
  res.json({ ok: true });
}));

export { requireStepUp as requireStepUpMw, sessionUser };
// used by tools/admin.js and the tests: make an account and its one-time setup link
export async function provisionAdmin({ email, name, role = 'super', by = 'server setup', kind = 'setup' }) {
  email = String(email || '').trim().toLowerCase();
  if (!EMAIL.test(email)) throw new Error('Enter a valid email address.');
  if (!emailAllowed(email)) throw new Error('The email must be on ' + config.adminDomains.join(', ') + ' (ADMIN_EMAIL_DOMAINS).');
  const { token, invite } = newInvite(kind);
  const ex = await U().findOne({ email });
  if (ex) {
    await U().updateOne({ _id: ex._id }, { $set: { invite, role, status: ex.status === 'active' ? 'active' : 'invited' }, ...(kind === 'reset' ? { $unset: { pw: '', mfa: '', recovery: '', lockUntil: '' } } : {}) });
    await revokeSessions(ex._id);
    return { user: { ...ex, invite }, token, link: setupLink(token) };
  }
  const u = { _id: newId('u_'), email, name: clean(name, 120) || email.split('@')[0], role, grants: [], status: 'invited', invite, created: new Date(), by };
  await U().insertOne(u);
  return { user: u, token, link: setupLink(token) };
}
export { sendSetup };
