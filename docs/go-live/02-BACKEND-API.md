# Backend API (build 82.6)

**Every endpoint of build 78.4, with rights and bodies: `15-API-REFERENCE.md`.**

The backend is its own Express 5 app and container (`backend/`, Node 24). Every endpoint lives under **`/api/v1/`**.
The old `/api/...` addresses still answer for one release (same handlers) and carry a `Deprecation: true` header, so
anything outside the site that still calls them keeps working while you move it over.

All data is in **MongoDB** (the `mongo` container in `docker-compose.yml`, or any hosted MongoDB through `MONGODB_URI`).
Nothing is written to the server's disk any more.

| Collection | What is in it |
|---|---|
| `leads` | every form: enquiries, downloads, case-study downloads, careers applications, chat hand-offs (with status and notes from the admin) |
| `reviews` | Rate & review submissions, their status and your replies |
| `chats` | live chat conversations |
| `visits` | page views for the admin dashboard (IP stored only as a hash; deleted after 400 days) |
| `content`, `content_history` | everything changed in the super admin, plus every earlier version (any change can be undone) |
| `files.files`, `files.chunks` | uploaded photos, logos, PDFs, videos and careers CVs (GridFS) |
| `audit` | every admin sign-in and change (kept 3 years) |

## Public endpoints (the website calls these)

| Endpoint | Used by |
|---|---|
| `POST /api/v1/enquiry` | Let's Talk, service forms, government brief, review prompt |
| `POST /api/v1/resource-download`, `POST /api/v1/case-study-download`, `POST /api/v1/download` | download forms |
| `POST /api/v1/careers` | careers application (multipart: the fields plus the CV, PDF/DOC/DOCX up to 5 MB; the CV is private) |
| `GET /api/v1/captcha` | forms and reviews |
| `GET/POST /api/v1/reviews`, `GET /api/v1/reviews/summary` | Rate & review |
| `POST /api/v1/chat/ask`, `POST /api/v1/chat/start`, `POST /api/v1/chat/:id/message`, `GET /api/v1/chat/:id/messages?token=&since=` | chat and live chat |
| `GET /api/v1/site` | every admin change, loaded once per visit (the site keeps its built-in content for anything not changed) |
| `GET /api/v1/content/:key`, `GET /api/v1/celebrations?year=`, `GET /api/v1/gallery` | content pieces |
| `GET /api/v1/files/:id/:name` | uploaded public files (photos, logos, PDFs) |
| `POST /api/v1/track` | page views for the dashboard (no cookies, bots skipped) |

Rules kept from before: CAPTCHA, the hidden `website` bot trap, 20 leads per IP per hour, CSV formula guard,
valid email required. Set `LEAD_WEBHOOK=https://…` to also send each lead to your CRM or Zapier.

## Admin endpoints (the super admin panel at /admin calls these)
Build 78.3: personal accounts. `POST /api/v1/admin/login {email, password}` answers `{ mfa: true, ticket }`; then
`POST /api/v1/admin/login/mfa {ticket, code}` (6-digit authenticator code, or `{recovery}`) answers the session token
(12 hours, ends after 2 hours without use), sent as `Authorization: Bearer <token>`. 10 tries per 15 minutes; 5 wrong
passwords lock the account for 15 minutes. Every /admin endpoint checks the admin's role and extra access
(`backend/src/lib/access.js`, `lib/auth.js`); sensitive ones answer `403 {stepUp:true}` until
`POST /api/v1/admin/step-up {code}`. Accounts, roles and approvals: `13-ACCESS-AND-ROLES.md`.

`/admin/me`, `/admin/stats`, `/admin/visits`, `/admin/audit`, `/admin/leads` (filters, `?format=csv`, and
`/admin/leads/:id` GET/PATCH/DELETE), `/admin/reviews` (+ publish, hide, delete, edit, reply), `/admin/chats` (+ reply,
close, reopen), `/admin/content` (+ `/:key` GET/PUT/DELETE, `/:key/history`, `/:key/history/:n`, `/:key/history/:n/restore`),
`/admin/files` (upload, list, download, delete), `/admin/celebrations?year=`, `/admin/gallery`.

**Build 78** adds (all admin-only unless marked public):
- Marketing (`routes/marketing.js`): `POST /newsletter` (public sign-up), `GET /mail/unsubscribe` and `GET /mail/o/:id.gif`
  (public unsubscribe page and open pixel), `/admin/marketing/stats`, `/admin/contacts` (filters, `?format=csv`,
  PATCH/DELETE `/:email`, `POST /import`), `/admin/mail/templates`, `/admin/mail/preview`, `/admin/mail/test`,
  `/admin/mail/automations`, `/admin/campaigns` (+ `/:id/send`, `/:id/cancel`), `/admin/mail/queue` (+ `/retry`).
- Social (`routes/social.js`): `/admin/social/status`, `/admin/social/posts` (+ `/:id/publish`, `/:id/approve`),
  `/admin/social/autopilot` (+ `/run`). AI: `POST /admin/ai/write {kind, brief, tone, length, platforms, extra}`.
- Integrations (`routes/integrations.js`): `/admin/integrations`, `POST /admin/integrations/sampcrew/send/:leadId`,
  public `POST /integrations/sampcrew/webhook` (signed with `X-SampCrew-Signature`) and
  `GET /integrations/sampcrew/cv/:leadId?exp=&sig=` (signed CV link). Chats: `/admin/chats/export?format=csv|json`,
  `/admin/chats/:id/export?format=txt|csv|json`.
- New collections: `contacts`, `mail_queue`, `campaigns`, `social_posts`. New content keys (public): `page-blocks`,
  `page-sections`, `custom-pages`, the menu lists (`menu-main`, `menu-about`, `menu-downloads`, `footer-company`,
  `footer-start`, `footer-legal`), `legal`, `legal-company`, `card-templates`; private: `forms-mail`,
  `mail-templates`, `mail-automations`, `mail-settings`. The full list with labels is in `routes/content.js`. Leads may carry `extra` (added form fields) and,
  for careers, `hr` (SampCrew id and stage).

## Moving data from build 66
Build 66 kept data in files (`reviews.json`, `leads.jsonl`, `celebrations*.json`, `gallery.json`). Copy that folder to
the server and run once (safe to run again, nothing is imported twice):

```
docker compose run --rm -v /path/to/old/data:/old backend npm run import-files -- /old
```

## Settings
Root `.env.example` (docker compose) or `backend/.env.example` (local): `MONGO_PASSWORD` (or `MONGODB_URI`),
`MONGODB_DB`, `REVIEW_SECRET`, `ADMIN_EMAIL_DOMAINS`, `PUBLIC_URL`, `PUBLISH_MODE`, `LEAD_WEBHOOK`, `LEADS`, `UPLOAD_MB`, `TRUST_PROXY`;
build 78 adds the email, AI, social media and SampCrew keys listed in `12-MARKETING-AND-KEYS.md`.
Health check: `GET /healthz` (also checks the database). Tests: `cd backend && npm test` (needs a MongoDB on
`MONGODB_URI`; each run uses its own throw-away database).

## Back-ups
Back up MongoDB, not files: `docker compose exec mongo mongodump -u fr -p "$MONGO_PASSWORD" --archive > fr-$(date +%F).archive`
once a day (restore with `mongorestore --archive`). The `fr-mongo` volume holds the data between restarts.
