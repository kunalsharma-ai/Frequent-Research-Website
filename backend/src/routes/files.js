// Files the super admin uploads (photos, logos, PDFs, videos), kept in MongoDB GridFS ("files" bucket).
//   POST   /api/v1/admin/files?name=photo.jpg&folder=team   the file itself as the body (Content-Type = its type)
//          -> { ok, id, url }   url is /api/v1/files/<id>/<name>, usable anywhere in the admin content
//   GET    /api/v1/admin/files?folder=&q=                    list
//   GET    /api/v1/admin/files/:id                           download any file (also careers CVs)
//   PUT    /api/v1/admin/files/:id?name=                   replace the file, keeping the same id and link (build 78.3)
//   PATCH  /api/v1/admin/files/:id   { alt, name, folder }  alt text and details (build 78.3)
//   DELETE /api/v1/admin/files/:id
//   GET    /api/v1/files/:id[/name]                          public files, for the website
import { openBytes } from '../lib/vault.js';
import { readAll } from './onboarding.js';
import { Router, raw } from 'express';
import { ObjectId } from 'mongodb';
import { config } from '../config.js';
import { col, files } from '../db.js';
import { ah, audit, clean, requireAdmin } from '../lib/util.js';
import { can } from '../lib/auth.js';
import { escapeRe } from './admin.js';

const TYPES = {
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/webp': '.webp', 'image/gif': '.gif', 'image/svg+xml': '.svg', 'image/avif': '.avif',
  'application/pdf': '.pdf', 'video/mp4': '.mp4', 'video/webm': '.webm',
  // build 78.4: documents and sound for downloads (always sent as a download, never shown in the browser)
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '.xlsx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx', 'text/csv': '.csv', 'text/plain': '.txt', 'application/zip': '.zip', 'audio/mpeg': '.mp3',
};
const INLINE = /^(image\/|video\/|application\/pdf$)/;
const oid = (s) => (/^[a-f0-9]{24}$/.test(String(s)) ? new ObjectId(String(s)) : null);
const safeName = (n, type) => (clean(n, 120).replace(/[^\w .()-]/g, '_').replace(/^\.+/, '') || 'file') .replace(/(\.[a-z0-9]{2,5})?$/i, (m) => m || TYPES[type] || '');
const fileUrl = (id, name) => `/api/v1/files/${id}/${encodeURIComponent(name)}`;

export const filesRouter = Router();

function badUpload(req, res) {
  const type = String(req.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
  if (!TYPES[type]) return res.status(415).json({ ok: false, error: 'Use a picture (JPG, PNG, WEBP, GIF, SVG, AVIF), PDF, MP4 or WEBM video, MP3, Word, Excel, PowerPoint, CSV, TXT or ZIP file.' });
  if (!Buffer.isBuffer(req.body) || !req.body.length) return res.status(400).json({ ok: false, error: 'Empty file' });
  if (type === 'image/svg+xml' && /<script|on\w+\s*=|javascript:/i.test(req.body.toString('utf8'))) return res.status(422).json({ ok: false, error: 'This SVG contains scripts.' });
  return type;
}
const who = (req) => (req.admin && req.admin.user ? req.admin.user.email : 'admin');

filesRouter.post('/admin/files', requireAdmin, raw({ type: () => true, limit: config.uploadMb + 'mb' }), ah(async (req, res) => {
  const type = badUpload(req, res); if (typeof type !== 'string') return;
  const name = safeName(req.query.name, type), folder = clean(req.query.folder, 40).toLowerCase().replace(/[^a-z0-9-]/g, '') || 'misc';
  const up = files().openUploadStream(name, { metadata: { contentType: type, folder, public: true, by: who(req), alt: clean(req.query.alt, 200) } });
  await new Promise((ok, bad) => { up.on('finish', ok); up.on('error', bad); up.end(req.body); });
  await audit(req, 'upload-file', name, { id: String(up.id), folder, size: req.body.length });
  res.status(201).json({ ok: true, id: String(up.id), url: fileUrl(up.id, name), name, size: req.body.length, type });
}));

filesRouter.get('/admin/files', requireAdmin, ah(async (req, res) => {
  const f = {};
  if (req.query.folder) f['metadata.folder'] = String(req.query.folder);
  const q = clean(req.query.q, 80); if (q) f.filename = { $regex: escapeRe(q), $options: 'i' };
  if (!(await can(req.admin.user, 'careers', 'view'))) f['metadata.public'] = true;
  f['metadata.onboarding'] = { $exists: false }; // build 82: onboarding documents are only in Client / Vendor onboarding
  const rows = await col('files.files').find(f).sort({ uploadDate: -1 }).limit(2000).toArray();
  res.json({ ok: true, files: rows.map((r) => ({ id: String(r._id), name: r.filename, size: r.length, at: r.uploadDate, type: r.metadata?.contentType, folder: r.metadata?.folder, alt: r.metadata?.alt || '', public: !!r.metadata?.public, url: r.metadata?.public ? fileUrl(r._id, r.filename) : `/api/v1/admin/files/${r._id}` })) });
}));

async function send(req, res, isAdmin) {
  const id = oid(req.params.id);
  const meta = id && (await col('files.files').findOne({ _id: id }));
  if (!meta || (!isAdmin && !meta.metadata?.public)) return res.status(404).json({ ok: false, error: 'Not found' });
  if (meta.metadata?.onboarding && !(await can(req.admin.user, 'onboarding', 'view'))) return res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  // private files (careers CVs) only for admins who may see careers; public files for anyone with media view
  if (isAdmin && !(await can(req.admin.user, meta.metadata?.public ? 'media' : 'careers', 'view'))) return res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  const type = meta.metadata?.contentType || 'application/octet-stream';
  res.set({ 'Content-Type': type, 'Content-Length': meta.length, 'Cache-Control': isAdmin ? 'no-store' : 'public, max-age=86400', 'Content-Security-Policy': "default-src 'none'; img-src 'self' data:; style-src 'unsafe-inline'; media-src 'self'" });
  if (!INLINE.test(type)) res.set('Content-Disposition', `attachment; filename="${meta.filename.replace(/"/g, '')}"`);
  else if (isAdmin || type === 'application/pdf') res.set('Content-Disposition', `${isAdmin && !/^image|pdf/.test(type) ? 'attachment' : 'inline'}; filename="${meta.filename.replace(/"/g, '')}"`);
  if (meta.metadata?.enc) { // build 82.1: onboarding documents are stored encrypted
    res.set('Content-Length', meta.metadata.size || 0);
    if (req.method === 'HEAD') return res.end();
    const buf = openBytes(await readAll(id)); res.set('Content-Length', buf.length); return res.end(buf);
  }
  if (req.method === 'HEAD') return res.end();
  files().openDownloadStream(id).on('error', () => res.destroy()).pipe(res);
}

filesRouter.get('/admin/files/:id', requireAdmin, ah((req, res) => send(req, res, true)));
filesRouter.get(['/files/:id', '/files/:id/:name'], ah((req, res) => send(req, res, false)));

// replace: same id, so every page that uses the link shows the new file
filesRouter.put('/admin/files/:id', requireAdmin, raw({ type: () => true, limit: config.uploadMb + 'mb' }), ah(async (req, res) => {
  const id = oid(req.params.id);
  const meta = id && (await col('files.files').findOne({ _id: id }));
  if (!meta || !meta.metadata?.public) return res.status(404).json({ ok: false, error: 'Not found' });
  const type = badUpload(req, res); if (typeof type !== 'string') return;
  const name = req.query.name ? safeName(req.query.name, type) : meta.filename;
  await files().delete(id);
  const up = files().openUploadStreamWithId(id, name, { metadata: { ...meta.metadata, contentType: type, by: who(req), replaced: new Date() } });
  await new Promise((ok, bad) => { up.on('finish', ok); up.on('error', bad); up.end(req.body); });
  await audit(req, 'replace-file', name, { id: String(id), before: { name: meta.filename, size: meta.length, type: meta.metadata?.contentType }, after: { name, size: req.body.length, type } });
  res.json({ ok: true, id: String(id), url: fileUrl(id, name), name, size: req.body.length, type });
}));

filesRouter.patch('/admin/files/:id', requireAdmin, ah(async (req, res) => {
  const id = oid(req.params.id);
  const meta = id && (await col('files.files').findOne({ _id: id }));
  if (!meta || !meta.metadata?.public) return res.status(404).json({ ok: false, error: 'Not found' });
  const b = req.body || {}, set = {};
  if (b.alt !== undefined) set['metadata.alt'] = clean(b.alt, 200);
  if (b.folder !== undefined) set['metadata.folder'] = clean(b.folder, 40).toLowerCase().replace(/[^a-z0-9-]/g, '') || 'misc';
  if (b.name !== undefined) set.filename = safeName(b.name, meta.metadata?.contentType);
  if (!Object.keys(set).length) return res.status(400).json({ ok: false, error: 'Nothing to change' });
  await col('files.files').updateOne({ _id: id }, { $set: set });
  await audit(req, 'edit-file', set.filename || meta.filename, { id: String(id), before: { alt: meta.metadata?.alt || '', name: meta.filename, folder: meta.metadata?.folder }, after: set });
  res.json({ ok: true, url: fileUrl(id, set.filename || meta.filename) });
}));

filesRouter.delete('/admin/files/:id', requireAdmin, ah(async (req, res) => {
  const id = oid(req.params.id);
  const meta = id && (await col('files.files').findOne({ _id: id }));
  if (!meta) return res.status(404).json({ ok: false });
  if (!(await can(req.admin.user, meta.metadata?.onboarding ? 'onboarding' : meta.metadata?.public ? 'media' : 'careers', 'delete'))) return res.status(403).json({ ok: false, error: 'You do not have permission for this.' });
  await files().delete(id);
  await audit(req, 'delete-file', meta.filename, { id: String(id) });
  res.json({ ok: true });
}));
