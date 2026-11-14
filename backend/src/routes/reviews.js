// Reviews written on the website (/rates-reviews and the "Rate us" badge), stored in MongoDB ("reviews").
//   GET  /api/v1/captcha              { ok, id, svg }
//   POST /api/v1/reviews              { ok, status, review }
//   GET  /api/v1/reviews              { ok, reviews }   published only, public fields
//   GET  /api/v1/reviews/summary      { ok, counts: {5..1} }
//   GET  /api/v1/admin/reviews        every review (admin, ?status=&q=)
//   POST /api/v1/admin/reviews/:id    { action: "publish" | "hide" | "delete" } (admin)
//   PATCH /api/v1/admin/reviews/:id   edit any field: first, last, company, designation, country, rating, review, services, reply
import { Router } from 'express';
import { config } from '../config.js';
import { col } from '../db.js';
import { captcha, verifyCaptcha } from '../lib/captcha.js';
import { ah, audit, clean, NAME, EMAIL, hashIp, newId, rateLimit, requireAdmin } from '../lib/util.js';
import { escapeRe } from './admin.js';

const SERVICES = ['market-research', 'digital-marketing', 'it-development', 'accounts-finance'];
const BAD = /\b(viagra|casino|crypto ?giveaway|porn|xxx|loan offer|bitcoin doubler|fuck|shit|bitch|cunt)\b/i;
const pub = (r) => ({ id: r._id, first: r.first, last: r.last, company: r.company, designation: r.designation, country: r.country, rating: r.rating, quote: r.review, services: r.services, date: r.date instanceof Date ? r.date.toISOString() : r.date, reply: r.reply || undefined });
const text = (v, max) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').trim().slice(0, max) : '');

export const reviewsRouter = Router();

reviewsRouter.get('/captcha', rateLimit('cap', 60, 3600e3), (req, res) => {
  const c = captcha();
  res.json({ ok: true, id: c.id, svg: c.svg });
});

reviewsRouter.post('/reviews', rateLimit('rv', 4, 3600e3, 'Too many reviews from this connection. Please try again later.'), ah(async (req, res) => {
  const b = req.body;
  if (!b || typeof b !== 'object' || Array.isArray(b)) return res.status(400).json({ ok: false, error: 'Invalid request.' });
  if (b.website) return res.json({ ok: true, status: 'pending' }); // honeypot: pretend success
  // the form sends one "Full name" field (also split into first/last); accept either shape
  const full = clean(b.name, 80);
  const first = clean(b.first, 40) || full.split(' ')[0] || '';
  const last = clean(b.last, 40) || full.split(' ').slice(1).join(' ').slice(0, 40);
  const email = clean(b.email, 160).toLowerCase(), company = clean(b.company, 80), designation = clean(b.designation, 70);
  const country = /^[A-Z]{2}$/.test(String(b.country || '')) ? b.country : '';
  const services = Array.isArray(b.services) ? [...new Set(b.services.filter((s) => SERVICES.includes(s)))] : [];
  const rating = Math.round(Number(b.rating));
  const review = text(b.review, 1500);
  const errors = {};
  if (first.length < 2 || !NAME.test(first)) errors.first = 'Enter your full name.';
  if (last && !NAME.test(last)) errors.last = 'Use letters only.';
  if (!EMAIL.test(email)) errors.email = 'Enter a valid email.';
  if (company.length < 2) errors.company = 'Enter your company name.';
  if (!country) errors.country = 'Choose your country.';
  if (!services.length) errors.services = 'Tick at least one service.';
  if (!(rating >= 1 && rating <= 5)) errors.rating = 'Choose a star rating.';
  if (review.length < 20) errors.review = 'Write at least 20 characters.';
  if (b.consent !== true) errors.consent = 'Consent is required.';
  if (!verifyCaptcha(b.captchaId, b.captcha)) errors.captcha = 'The security code is wrong or expired. Please try a new one.';
  if (Object.keys(errors).length) return res.status(422).json({ ok: false, error: Object.values(errors)[0], errors });
  const dup = await col('reviews').findOne({ email, review });
  if (dup) return res.json({ ok: true, status: dup.status, review: dup.status === 'published' ? pub(dup) : null });
  const flagged = /(https?:\/\/|www\.)/i.test(review) || BAD.test(`${review} ${first} ${last} ${company}`);
  const status = config.publishMode === 'manual' || flagged ? 'pending' : 'published';
  const r = { _id: newId('r_'), status, first, last, email, phone: clean(b.phone, 20), countryCode: clean(b.countryCode, 6), company, designation, country, services, rating, review, date: new Date(), ip: hashIp(req.ip), page: clean(b.page, 300) };
  await col('reviews').insertOne(r);
  console.log(`[reviews] ${r._id} ${status} ${rating}★ ${services.join(',')} ${country}`);
  res.status(201).json({ ok: true, status, review: status === 'published' ? pub(r) : null });
}));

reviewsRouter.get('/reviews', ah(async (req, res) => {
  const rows = await col('reviews').find({ status: 'published' }).sort({ date: -1 }).limit(200).toArray();
  res.set('Cache-Control', 'public, max-age=30').json({ ok: true, reviews: rows.map(pub) });
}));

reviewsRouter.get('/reviews/summary', ah(async (req, res) => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  for (const g of await col('reviews').aggregate([{ $match: { status: 'published' } }, { $group: { _id: '$rating', n: { $sum: 1 } } }]).toArray()) if (counts[g._id] != null) counts[g._id] = g.n;
  res.json({ ok: true, counts, source: '' });
}));

reviewsRouter.get('/admin/reviews', requireAdmin, ah(async (req, res) => {
  const f = {};
  if (req.query.status) f.status = String(req.query.status);
  const q = clean(req.query.q, 80);
  if (q) { const re = { $regex: escapeRe(q), $options: 'i' }; f.$or = ['first', 'last', 'email', 'company', 'review'].map((k) => ({ [k]: re })); }
  const rows = await col('reviews').find(f).sort({ date: -1 }).limit(5000).toArray();
  res.json({ ok: true, reviews: rows.map(({ _id, ...r }) => ({ id: _id, ...r })) });
}));

reviewsRouter.post('/admin/reviews/:id', requireAdmin, ah(async (req, res) => {
  const id = String(req.params.id), action = req.body && req.body.action;
  let r;
  if (action === 'delete') r = await col('reviews').deleteOne({ _id: id }).then((x) => x.deletedCount);
  else if (action === 'publish' || action === 'hide') r = await col('reviews').updateOne({ _id: id }, { $set: { status: action === 'publish' ? 'published' : 'hidden', updated: new Date() } }).then((x) => x.matchedCount);
  else return res.status(400).json({ ok: false });
  if (!r) return res.status(404).json({ ok: false });
  await audit(req, action + '-review', id);
  res.json({ ok: true });
}));

reviewsRouter.patch('/admin/reviews/:id', requireAdmin, ah(async (req, res) => {
  const b = req.body || {}, set = {};
  for (const [k, max] of [['first', 40], ['last', 40], ['company', 80], ['designation', 70]]) if (typeof b[k] === 'string') set[k] = clean(b[k], max);
  if (typeof b.review === 'string') set.review = text(b.review, 1500);
  if (typeof b.reply === 'string') set.reply = text(b.reply, 1500);
  if (/^[A-Z]{2}$/.test(String(b.country || ''))) set.country = b.country;
  if (b.rating != null) { const n = Math.round(+b.rating); if (n >= 1 && n <= 5) set.rating = n; }
  if (Array.isArray(b.services)) set.services = [...new Set(b.services.filter((s) => SERVICES.includes(s)))];
  if (!Object.keys(set).length) return res.status(400).json({ ok: false, error: 'Nothing to change' });
  set.updated = new Date();
  const r = await col('reviews').updateOne({ _id: String(req.params.id) }, { $set: set });
  if (!r.matchedCount) return res.status(404).json({ ok: false });
  await audit(req, 'edit-review', req.params.id, Object.keys(set));
  res.json({ ok: true });
}));
