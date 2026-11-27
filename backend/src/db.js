// MongoDB connection and collections (build 67: replaces the JSON files in DATA_DIR).
//   leads      every form, download, careers application and chat request      _id "l_…"
//   reviews    reviews written on the website                                     _id "r_…"
//   chats      live chat conversations (visitor <-> super admin)                  _id "c_…"
//   content    everything the super admin edits: { _id: key, data, updated, by }  (see routes/content.js)
//   visits     one row per page view: { at, day, path, ref, ip, ua }             (TTL 400 days)
//   audit      every super admin change and sign-in                                (TTL 3 years)
//   contacts   one per email: forms, services, consent (build 78)           _id email
//   mail_queue emails waiting / sent by the automations and newsletters        _id "q_…"
//   campaigns  newsletters                                                      _id "cm_…"
//   social_posts posts for Facebook, Instagram, LinkedIn, X and the hook       _id "sp_…"
//   onboarding client & vendor onboarding submissions, full details   _id "FR-MSA-…" / "FR-VEN-…" (build 82)
//   onboarding_forms  the set-up of the two onboarding forms, _id client / vendor, with the last 50 versions (build 82)
//   files.*    GridFS bucket: uploaded photos, logos, PDFs and careers CVs
import { MongoClient, GridFSBucket } from 'mongodb';
import { config } from './config.js';

let client = null, database = null, bucket = null;

export async function connectDb(uri = config.mongoUri, name = config.mongoDb) {
  if (database) return database;
  client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000, appName: 'fr-api' });
  await client.connect();
  database = client.db(name);
  bucket = new GridFSBucket(database, { bucketName: 'files' });
  await Promise.all([
    col('leads').createIndex({ at: -1 }),
    col('leads').createIndex({ kind: 1, at: -1 }),
    col('leads').createIndex({ email: 1 }),
    col('reviews').createIndex({ status: 1, date: -1 }),
    col('reviews').createIndex({ email: 1 }),
    col('chats').createIndex({ updated: -1 }),
    col('visits').createIndex({ at: 1 }, { expireAfterSeconds: 400 * 86400 }),
    col('visits').createIndex({ day: 1, path: 1 }),
    col('audit').createIndex({ at: 1 }, { expireAfterSeconds: 3 * 365 * 86400 }),
    // build 78: contacts, emails, newsletters, social posts
    col('contacts').createIndex({ last: -1 }),
    col('contacts').createIndex({ subscribed: 1, forms: 1 }),
    col('mail_queue').createIndex({ status: 1, sendAt: 1 }),
    col('mail_queue').createIndex({ campaign: 1, status: 1 }),
    col('mail_queue').createIndex({ created: 1 }, { expireAfterSeconds: 400 * 86400 }),
    col('campaigns').createIndex({ created: -1 }),
    col('social_posts').createIndex({ status: 1, at: 1 }),
    // build 78.3: admin accounts, sessions, drafts and approvals, who-did-what
    col('admin_users').createIndex({ email: 1 }, { unique: true }),
    col('admin_users').createIndex({ 'invite.hash': 1 }, { sparse: true }),
    col('admin_sessions').createIndex({ exp: 1 }, { expireAfterSeconds: 0 }),
    col('admin_sessions').createIndex({ user: 1 }),
    col('content_drafts').createIndex({ status: 1, updated: -1 }),
    col('content_drafts').createIndex({ key: 1, author: 1 }),
    col('audit').createIndex({ 'actor.email': 1, at: -1 }),
    col('leads').createIndex({ assignee: 1, at: -1 }),
    // Sampforce: API keys (hash only) and webhook deliveries (kept 30 days)
    col('leads').createIndex({ updated: 1 }, { sparse: true }),
    col('sampforce_keys').createIndex({ hash: 1 }, { unique: true }),
    col('sampforce_outbox').createIndex({ status: 1, nextAt: 1 }),
    col('sampforce_outbox').createIndex({ created: 1 }, { expireAfterSeconds: 30 * 86400 }),
    // build 82: client & vendor onboarding submissions (_id = the portal reference FR-MSA-… / FR-VEN-…)
    col('onboarding').createIndex({ kind: 1, received: -1 }),
    col('onboarding').createIndex({ kind: 1, status: 1 }),
    col('onboarding').createIndex({ 'sum.nextExpiry': 1 }),
    col('onboarding').createIndex({ 'data.agreements.ref': 1 }),
  ]);
  return database;
}

export const col = (name) => {
  if (!database) throw new Error('database not connected');
  return database.collection(name);
};
export const files = () => bucket;
export const dbReady = () => !!database;

export async function closeDb() {
  if (client) await client.close();
  client = database = bucket = null;
}

export async function dropDb() {
  if (database) await database.dropDatabase();
}
