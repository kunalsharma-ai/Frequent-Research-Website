#!/usr/bin/env node
// Frequent Research API. Start: `npm start` (or `npm run dev`, which also reads backend/.env and restarts on changes).
import { config } from './config.js';
import { connectDb, closeDb } from './db.js';
import { createApp } from './app.js';
import { loadKeys, watchKeys } from './lib/keystore.js';
import { startMailWorkers } from './routes/marketing.js';
import { startSocialWorker } from './routes/social.js';
import { startSampforceWorker } from './routes/sampforce.js';

if (config.secretIsRandom) console.warn('[api] REVIEW_SECRET is not set: using a random key for this run only.');
if (process.env.ADMIN_TOKEN || process.env.ADMIN_USER) console.warn('[api] ADMIN_USER / ADMIN_TOKEN are no longer used (build 78.3): admins sign in with their own accounts. Make the first Super Admin with: npm run admin -- create-super-admin --email you@frequentresearch.com --name "Your Name"');

// MongoDB may still be starting (docker compose): try for about a minute before giving up
let tries = 0;
for (;;) {
  try { await connectDb(); break; } catch (e) {
    if (++tries >= 12) { console.error('[api] cannot reach MongoDB at', config.mongoUri.replace(/\/\/[^@]*@/, '//***@'), '-', e.message); process.exit(1); }
    console.warn('[api] waiting for MongoDB…', e.message); await new Promise((r) => setTimeout(r, 5000));
  }
}

// build 78.4: keys saved in the admin panel (encrypted in MongoDB) win over .env
try { await loadKeys(); watchKeys(); } catch (e) { console.warn('[keys] could not read saved keys:', e.message); }
if (!process.env.KEYS_SECRET && !process.env.REVIEW_SECRET) console.warn('[keys] set KEYS_SECRET in .env to save keys from the admin panel.');

const server = createApp().listen(config.port, () => {
  console.log(`[api] listening on :${config.port} (MongoDB ${config.mongoDb}, ${config.publishMode} review publishing${config.dev ? ', DEV stubs on' : ''}${config.leads ? '' : ', leads off'})`);
});

// build 78: emails (automations, newsletters) and scheduled social posts are sent in the background
if (config.workers) { startMailWorkers(); startSocialWorker(); startSampforceWorker(); }

// Docker sends SIGTERM on stop: finish open requests, then exit
for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => { server.close(() => closeDb().finally(() => process.exit(0))); setTimeout(() => process.exit(0), 5000).unref(); });
