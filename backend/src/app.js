import express from 'express';
import { config } from './config.js';
import { col, dbReady } from './db.js';
import { reviewsRouter } from './routes/reviews.js';
import { leadsRouter } from './routes/leads.js';
import { contentRouter } from './routes/content.js';
import { filesRouter } from './routes/files.js';
import { chatRouter } from './routes/chat.js';
import { trackRouter } from './routes/track.js';
import { adminRouter } from './routes/admin.js';
import { marketingRouter } from './routes/marketing.js';
import { socialRouter } from './routes/social.js';
import { integrationsRouter } from './routes/integrations.js';
import { usersRouter } from './routes/users.js';
import { onboardingRouter } from './routes/onboarding.js';
import { pageVideosRouter } from './routes/pageVideos.js';
import { guard } from './lib/access.js';
import { rateLimit } from './lib/util.js';

// build 82.1: a JSON body may not carry MongoDB operators ($…) as keys anywhere, nor be nested absurdly deep
function unsafeKeys(v, depth = 0) {
  if (depth > 40) return true;
  if (Array.isArray(v)) return v.some((x) => unsafeKeys(x, depth + 1));
  if (v && typeof v === 'object') return Object.keys(v).some((k) => k.startsWith('$') || k === '__proto__' || k === 'constructor' || k === 'prototype' || unsafeKeys(v[k], depth + 1));
  return false;
}

// Every endpoint lives under /api/v1 (build 67). /api/... without the version answers the same for a while, so
// pages already open in visitors' browsers keep working; those answers carry "Deprecation: true".
export function createApp() {
  const app = express();
  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy);
  // build 82.1: API answers are never framed, cached or sent with the page address to other sites
  app.use((req, res, next) => { res.set({ 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'X-Frame-Options': 'DENY', 'Referrer-Policy': 'no-referrer', 'Cross-Origin-Opener-Policy': 'same-origin' }); next(); });

  app.get('/healthz', async (req, res) => {
    try { if (!dbReady()) throw new Error('no db'); await col('content').estimatedDocumentCount(); res.json({ ok: true, db: true }); }
    catch { res.status(503).json({ ok: false, db: false }); }
  });

  const api = express.Router();
  // bodies: uploads (raw) and the careers form (multipart) read their own; admin saves may be large; the rest are small
  api.use((req, res, next) => {
    if (req.method === 'GET' || req.method === 'HEAD' || req.method === 'DELETE') return next();
    if (/^\/admin\/files\/?$/.test(req.path) || (req.method === 'PUT' && /^\/admin\/files\/[^/]+$/.test(req.path)) || req.path === '/careers' || req.path === '/integrations/sampcrew/webhook') return next();
    // build 82: onboarding deliveries are verified on the raw body; documents added in the admin are raw uploads
    if (req.path.startsWith('/integrations/onboarding/') || (req.method === 'POST' && /^\/admin\/onboarding\/[^/]+\/files$/.test(req.path))) return next();
    const big = req.path.startsWith('/admin/');
    return express.json({ limit: big ? '8mb' : '64kb', strict: false, type: () => true })(req, res, next);
  });
  // build 82.1: every visitor (IP) at most 300 API requests a minute (admin: 1200), and no operator keys in bodies
  const pubLimit = rateLimit('api', 300, 60e3), admLimit = rateLimit('api-admin', 1200, 60e3);
  api.use((req, res, next) => (req.path.startsWith('/admin/') ? admLimit : pubLimit)(req, res, next));
  api.use((req, res, next) => (req.body && typeof req.body === 'object' && !Buffer.isBuffer(req.body) && unsafeKeys(req.body) ? res.status(400).json({ ok: false, error: 'Invalid request.' }) : next()));
  // build 78: integrations first (its /admin/chats/export must win over chat's /admin/chats/:id)
  // build 78.3: every /admin request passes the permission guard first (lib/access.js)
  api.use(guard);
  api.use(usersRouter, onboardingRouter, pageVideosRouter, adminRouter, integrationsRouter, marketingRouter, socialRouter, reviewsRouter, leadsRouter, contentRouter, filesRouter, chatRouter, trackRouter);
  api.use((req, res) => res.status(404).json({ ok: false, error: 'Not found' }));

  app.use('/api/v1', api);
  app.use('/api', (req, res, next) => { res.set('Deprecation', 'true'); res.set('Link', '</api/v1' + req.path + '>; rel="successor-version"'); next(); }, api);

  // bad JSON, body too large, or a bug: never show a stack trace to visitors
  app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    const status = err.status || err.statusCode || 500;
    if (status >= 500) console.error(err);
    res.status(status).json({ ok: false, error: status === 413 ? 'Request too large.' : status < 500 ? 'Invalid request.' : 'Server error' });
  });
  return app;
}
