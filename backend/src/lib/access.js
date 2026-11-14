// Build 78.3: one place that says which right every admin API needs. It runs before the route handlers, so no admin
// endpoint can be reached without the right, whatever the panel shows. Routes not listed here (and not handled by
// routes that check their own rights) are for the Super Admin only.
import { can } from './auth.js';
import { requireStepUpMw } from '../routes/users.js';
import { sessionUser } from './util.js';

// [method, path pattern, module, action, needs MFA confirmation]; module may be a list (any of them is enough)
const RULES = [
  // routes that check their own rights (accounts, content keys, approvals, dashboard)
  ['*', /^\/admin\/(login|login\/mfa|logout|me|step-up|setup\/.*|account(\/.*)?|users(\/.*)?|roles(\/.*)?|overview|content(\/.*)?|approvals(\/.*)?)$/, null],
  ['GET', /^\/admin\/stats$/, 'dashboard', 'view'],
  ['GET', /^\/admin\/(audit|visits)$/, 'activity', 'view'],
  // enquiries and careers applications share the leads list; routes/leads.js shows each admin only their kinds
  ['GET', /^\/admin\/leads$/, ['enquiries', 'careers'], 'view'],
  ['GET', /^\/admin\/leads\/[^/]+$/, ['enquiries', 'careers'], 'view'],
  ['PATCH', /^\/admin\/leads\/[^/]+$/, ['enquiries', 'careers'], 'edit'],
  ['DELETE', /^\/admin\/leads\/[^/]+$/, ['enquiries', 'careers'], 'delete'],
  ['GET', /^\/admin\/chats\/export$/, 'enquiries', 'export', true],
  ['GET', /^\/admin\/chats\/[^/]+\/export$/, 'enquiries', 'export'],
  ['GET', /^\/admin\/chats(\/[^/]+)?$/, 'enquiries', 'view'],
  ['POST', /^\/admin\/chats\/[^/]+\/[a-z-]+$/, 'enquiries', 'edit'],
  ['GET', /^\/admin\/reviews$/, 'enquiries', 'view'],
  ['*', /^\/admin\/reviews\/[^/]+$/, 'enquiries', 'edit'],
  // media library (careers CVs are checked again in routes/files.js)
  ['GET', /^\/admin\/files$/, 'media', 'view'],
  ['GET', /^\/admin\/files\/[^/]+$/, ['media', 'careers'], 'view'],
  ['POST', /^\/admin\/files$/, ['media'], 'create'],
  ['PUT', /^\/admin\/files\/[^/]+$/, 'media', 'edit'],
  ['PATCH', /^\/admin\/files\/[^/]+$/, 'media', 'edit'],
  ['DELETE', /^\/admin\/files\/[^/]+$/, ['media', 'careers'], 'delete'],
  // marketing
  ['GET', /^\/admin\/contacts$/, 'marketing', 'view'],
  ['POST', /^\/admin\/contacts\/import$/, 'marketing', 'create', true],
  ['PATCH', /^\/admin\/contacts\/[^/]+$/, 'marketing', 'edit'],
  ['DELETE', /^\/admin\/contacts\/[^/]+$/, 'marketing', 'delete'],
  ['GET', /^\/admin\/marketing\/stats$/, 'marketing', 'view'],
  ['GET', /^\/admin\/mail\/(templates|automations|queue)$/, 'marketing', 'view'],
  ['PUT', /^\/admin\/mail\/templates$/, 'marketing', 'edit'],
  ['PUT', /^\/admin\/mail\/automations$/, 'marketing', 'publish'],
  ['POST', /^\/admin\/mail\/preview$/, 'marketing', 'view'],
  ['POST', /^\/admin\/mail\/test$/, 'marketing', 'edit'],
  ['POST', /^\/admin\/mail\/queue\/retry$/, 'marketing', 'publish'],
  ['GET', /^\/admin\/campaigns$/, 'marketing', 'view'],
  ['POST', /^\/admin\/campaigns$/, 'marketing', 'create'],
  ['PUT', /^\/admin\/campaigns\/[^/]+$/, 'marketing', 'edit'],
  ['POST', /^\/admin\/campaigns\/[^/]+\/count$/, 'marketing', 'view'],
  ['POST', /^\/admin\/campaigns\/[^/]+\/(send|cancel)$/, 'marketing', 'publish'],
  ['DELETE', /^\/admin\/campaigns\/[^/]+$/, 'marketing', 'delete'],
  ['GET', /^\/admin\/social\/(status|posts|autopilot)$/, 'marketing', 'view'],
  ['POST', /^\/admin\/social\/posts$/, 'marketing', 'create'],
  ['PUT', /^\/admin\/social\/posts\/[^/]+$/, 'marketing', 'edit'],
  ['DELETE', /^\/admin\/social\/posts\/[^/]+$/, 'marketing', 'delete'],
  ['POST', /^\/admin\/social\/posts\/[^/]+\/(publish|approve)$/, 'marketing', 'publish'],
  ['PUT', /^\/admin\/social\/autopilot$/, 'marketing', 'publish'],
  ['POST', /^\/admin\/social\/autopilot\/run$/, 'marketing', 'create'],
  // the AI writer helps in many editors: anyone who may write somewhere
  ['GET', /^\/admin\/ai\/kinds$/, ['marketing', 'blog', 'pages', 'company', 'products'], 'edit'],
  ['POST', /^\/admin\/ai\/write$/, ['marketing', 'blog', 'pages', 'company', 'products'], 'edit'],
  // connections, SampCrew, calendars, gallery
  ['GET', /^\/admin\/integrations$/, ['integrations', 'users'], 'view'],
  ['GET', /^\/admin\/system$/, 'integrations', 'view'],
  ['PUT', /^\/admin\/integrations\/keys$/, 'integrations', 'configure'],
  ['POST', /^\/admin\/integrations\/sampcrew\/send\/[^/]+$/, 'careers', 'edit'],
  ['PUT', /^\/admin\/celebrations$/, 'settings', 'publish'],
  ['PUT', /^\/admin\/gallery$/, 'company', 'publish'],
  // build 82: client & vendor onboarding (bank details and documents inside: deleting asks for the authenticator code)
  ['GET', /^\/admin\/onboarding(-renewals)?$/, 'onboarding', 'view'],
  ['GET', /^\/admin\/onboarding\/[^/]+(\/files\/[^/]+)?$/, 'onboarding', 'view'],
  ['POST', /^\/admin\/onboarding$/, 'onboarding', 'create'],
  ['PUT', /^\/admin\/onboarding\/[^/]+$/, 'onboarding', 'edit'],
  ['POST', /^\/admin\/onboarding\/[^/]+\/(notes|files)$/, 'onboarding', 'edit'],
  ['DELETE', /^\/admin\/onboarding\/[^/]+\/(notes|files)\/[^/]+$/, 'onboarding', 'edit'],
  ['DELETE', /^\/admin\/onboarding\/[^/]+$/, 'onboarding', 'delete', true],
  ['GET', /^\/admin\/onboarding-forms\/[^/]+$/, 'onboarding', 'view'],
  ['PUT', /^\/admin\/onboarding-forms\/[^/]+$/, 'onboarding', 'configure'],
  // build 82.4/82.5: Page video component (Pages › Page video component); the old name web-videos answers the same
  ['GET', /^\/admin\/(page|web)-videos(\/(item|settings|templates|templates\/item))?$/, 'pages', 'view'],
  ['GET', /^\/admin\/(page|web)-videos\/export$/, 'pages', 'view'],
  ['PUT', /^\/admin\/(page|web)-videos\/(item|templates\/item)$/, 'pages', 'edit'],
  ['DELETE', /^\/admin\/(page|web)-videos\/item$/, 'pages', 'delete'],
  ['DELETE', /^\/admin\/(page|web)-videos\/templates\/item$/, 'pages', 'edit'],
  ['POST', /^\/admin\/(page|web)-videos\/(import|pages)$/, 'pages', 'create'],
  ['PUT', /^\/admin\/(page|web)-videos\/settings$/, 'pages', 'publish'],
];

export async function guard(req, res, next) {
  try {
    if (!req.path.startsWith('/admin/') && req.path !== '/admin') return next();
    const rule = RULES.find(([m, re]) => (m === '*' || m === req.method) && re.test(req.path));
    if (rule && rule[2] === null) return next();
    const s = await sessionUser(req);
    if (!s) return res.status(401).json({ ok: false, error: 'Please sign in again.' });
    const u = s.user;
    let ok = false;
    if (!rule) ok = u.role === 'super';
    else {
      const mods = Array.isArray(rule[2]) ? rule[2] : [rule[2]];
      let action = rule[3];
      // CSV downloads of lists are exports
      if (req.method === 'GET' && req.query.format === 'csv') action = 'export';
      for (const m of mods) if (await can(u, m, action)) { ok = true; break; }
      if (ok && (rule[4] || action === 'export')) return requireStepUpMw(req, res, next);
    }
    if (ok) return next();
    res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  } catch (e) { next(e); }
}
