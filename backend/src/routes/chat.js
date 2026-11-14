// Live chat (build 67): a visitor who asks for a specialist starts a conversation; the super admin answers it from
// the admin panel and the reply appears in the visitor's chat window (the website checks every 5 s while open).
//   POST /api/v1/chat/start                 { name, email, phone, country, message, transcript, page } -> { ok, id, token, messages }
//   GET  /api/v1/chat/:id/messages?token=&since=n   -> { ok, messages: [{ i, from, text, at }] }
//   POST /api/v1/chat/:id/message           { token, text } -> { ok, messages }
//   POST /api/v1/chat/ask                   { message } -> { ok, matched:false }  (answers come from the website's own FAQ)
//   GET  /api/v1/admin/chats[?status=open]   conversations, newest activity first
//   GET  /api/v1/admin/chats/:id             one conversation
//   POST /api/v1/admin/chats/:id/reply       { text }
//   POST /api/v1/admin/chats/:id/close | /reopen
// Every conversation is also saved as a lead (kind "chat"), so it shows in Leads and in the CSV export.
import crypto from 'node:crypto';
import { Router } from 'express';
import { config } from '../config.js';
import { col } from '../db.js';
import { getContent } from './content.js';
import { saveLead } from './leads.js';
import { ah, audit, clean, EMAIL, newId, rateLimit, requireAdmin } from '../lib/util.js';

const msgText = (v) => (typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, '').replace(/<[^>]*>/g, '').trim().slice(0, 2000) : '');
const pubMsgs = (c, since = 0) => c.messages.filter((m) => m.i >= since).map(({ i, from, text, at }) => ({ i, from, text, at }));
const tokenOk = (c, t) => { const a = Buffer.from(String(c.token)), b = Buffer.from(String(t || '')); return a.length === b.length && crypto.timingSafeEqual(a, b); };

export const chatRouter = Router();
const limit = rateLimit('ch', 10, 3600e3, 'Too many chats from this connection. Please try again later.');

chatRouter.post('/chat/ask', (req, res) => res.json({ ok: true, matched: false }));

chatRouter.post('/chat/start', limit, ah(async (req, res) => {
  const b = req.body || {};
  if (config.dev) return res.json({ ok: true, id: 'dev', token: 'dev', messages: [{ i: 0, from: 'bot', text: 'Thanks! A specialist will reply by email shortly. (Local test: nothing was sent.)' }] });
  if (b.website) return res.json({ ok: true });
  const email = clean(b.email, 160).toLowerCase();
  if (!EMAIL.test(email)) return res.status(422).json({ ok: false, error: 'Enter a valid email.' });
  const settings = (await getContent('settings')) || {};
  const chatCfg = settings.chat || {};
  if (chatCfg.live === false) return res.status(404).json({ ok: false, error: 'Live chat is off' }); // the website then sends an enquiry
  const name = clean(b.name, 80), now = new Date();
  const first = name.split(' ')[0] || 'there';
  const transcript = Array.isArray(b.transcript) ? b.transcript.slice(-20).map((m) => ({ from: m && m.from === 'visitor' ? 'visitor' : 'bot', text: msgText(m && m.text) })).filter((m) => m.text) : [];
  const welcome = clean(chatCfg.handoff, 400).replace(/\{name\}/g, first).replace(/\{email\}/g, email) || `Thanks, ${first}! A specialist has your message and will answer here, or by email at ${email} within one working day.`;
  const messages = [];
  if (msgText(b.message) && b.message !== '(no message)') messages.push({ i: 0, from: 'visitor', text: msgText(b.message), at: now });
  messages.push({ i: messages.length, from: 'bot', text: welcome, at: now });
  const lead = await saveLead(req, 'chat', { type: 'Chat', name, email, phone: clean(b.phone, 24), countryCode: clean(b.countryCode, 6), country: clean(b.country, 60), interest: clean(b.interest, 120), message: msgText(b.message), page: clean(b.page, 300) });
  const c = { _id: newId('c_'), token: crypto.randomBytes(18).toString('base64url'), status: 'open', name, email, phone: clean(b.phone, 24), country: clean(b.country, 60), page: clean(b.page, 300), transcript, messages, lead: lead._id, unread: 1, started: now, updated: now };
  await col('chats').insertOne(c);
  res.json({ ok: true, id: c._id, token: c.token, messages: pubMsgs(c) });
}));

chatRouter.get('/chat/:id/messages', ah(async (req, res) => {
  const c = await col('chats').findOne({ _id: String(req.params.id) });
  if (!c || !tokenOk(c, req.query.token)) return res.status(404).json({ ok: false });
  res.json({ ok: true, status: c.status, messages: pubMsgs(c, Math.max(0, +req.query.since || 0)) });
}));

chatRouter.post('/chat/:id/message', rateLimit('chm', 60, 3600e3), ah(async (req, res) => {
  const b = req.body || {};
  const c = await col('chats').findOne({ _id: String(req.params.id) });
  if (!c || !tokenOk(c, b.token)) return res.status(404).json({ ok: false });
  const text = msgText(b.text);
  if (!text) return res.status(400).json({ ok: false });
  if (c.messages.length >= 300) return res.status(429).json({ ok: false, error: 'This conversation is full. Please email us.' });
  const m = { i: c.messages.length, from: 'visitor', text, at: new Date() };
  await col('chats').updateOne({ _id: c._id }, { $push: { messages: m }, $set: { updated: m.at, status: 'open' }, $inc: { unread: 1 } });
  res.json({ ok: true, messages: [] });
}));

// ---- admin ---------------------------------------------------------------------------------------------------------
const brief = ({ _id, token, transcript, messages, ...c }) => ({ id: _id, ...c, count: messages.length, last: messages[messages.length - 1] || null });

chatRouter.get('/admin/chats', requireAdmin, ah(async (req, res) => {
  const f = req.query.status ? { status: String(req.query.status) } : {};
  const rows = await col('chats').find(f).sort({ updated: -1 }).limit(500).toArray();
  res.json({ ok: true, chats: rows.map(brief) });
}));

chatRouter.get('/admin/chats/:id', requireAdmin, ah(async (req, res) => {
  const c = await col('chats').findOneAndUpdate({ _id: String(req.params.id) }, { $set: { unread: 0 } }, { returnDocument: 'after' });
  if (!c) return res.status(404).json({ ok: false });
  const { _id, token, ...rest } = c;
  res.json({ ok: true, chat: { id: _id, ...rest } });
}));

chatRouter.post('/admin/chats/:id/reply', requireAdmin, ah(async (req, res) => {
  const text = msgText(req.body && req.body.text);
  if (!text) return res.status(400).json({ ok: false, error: 'Write a reply' });
  const c = await col('chats').findOne({ _id: String(req.params.id) });
  if (!c) return res.status(404).json({ ok: false });
  const m = { i: c.messages.length, from: 'agent', text, at: new Date() };
  await col('chats').updateOne({ _id: c._id }, { $push: { messages: m }, $set: { updated: m.at, unread: 0, status: 'open' } });
  await audit(req, 'chat-reply', c._id, { chars: text.length });
  res.json({ ok: true, message: m });
}));

for (const act of ['close', 'reopen']) {
  chatRouter.post(`/admin/chats/:id/${act}`, requireAdmin, ah(async (req, res) => {
    const r = await col('chats').updateOne({ _id: String(req.params.id) }, { $set: { status: act === 'close' ? 'closed' : 'open', updated: new Date() } });
    if (!r.matchedCount) return res.status(404).json({ ok: false });
    await audit(req, 'chat-' + act, req.params.id);
    res.json({ ok: true });
  }));
}
