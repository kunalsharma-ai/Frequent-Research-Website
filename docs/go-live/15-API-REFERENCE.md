# Frequent Research API reference (build 82.6)

The same list is inside the admin: **System › API** (live status, search, Try it with your own sign-in, Copy as curl).

Every endpoint the Frequent Research backend has, for the developer team. The backend is `backend/` (Express 5,
Node 24, MongoDB). Code: `backend/src/routes/*.js`; rights: `backend/src/lib/access.js` and `lib/auth.js`.

- **Base address:** `https://www.frequentresearch.com/api/v1` (on the server the frontend's nginx sends `/api` to the
  backend container; locally `http://localhost:8787/api/v1`). Old `/api/...` addresses still answer, with
  `Deprecation: true`.
- **Format:** JSON in and out (`Content-Type: application/json`). Answers have `ok: true|false`; errors also have
  `error` (a sentence you can show). File uploads send the raw file; the careers form is multipart.
- **Health:** `GET /healthz` (outside `/api/v1`) answers 200 when the API and MongoDB are up.
- **Secrets:** none of these answers ever contains a password, authenticator secret, session token (other than your
  own at sign-in) or connection key.

## 1. Signing in (admin)

| Step | Request | Answer |
|---|---|---|
| 1 | `POST /admin/login` `{ email, password }` | `{ mfa: true, ticket }` |
| 2 | `POST /admin/login/mfa` `{ ticket, code }` (6-digit authenticator code) or `{ ticket, recovery }` | `{ token, user, … }` |
| use | header `Authorization: Bearer <token>` on every `/admin/...` call | 401 = sign in again |
| end | `POST /admin/logout` | |

Sessions last 12 hours and end after 2 hours without use. 10 tries per 15 minutes per address; 5 wrong passwords
lock the account 15 minutes. Calls marked **MFA** below answer `403 { stepUp: true }` until
`POST /admin/step-up { code }` (valid 10 minutes). **Right** is the area and action the admin's role (or extra
access) must include; the Super Admin has all. Without the right: `403`.

## 2. Public endpoints (the website calls these; no sign-in)

| Method and path | What it does | Body / query |
|---|---|---|
| `GET /captcha` | CAPTCHA challenge for forms and reviews | |
| `POST /enquiry` | Let's Talk, service forms, RFQs, government brief | form fields + `captcha` |
| `POST /download`, `POST /resource-download`, `POST /case-study-download` | download forms | form fields + `captcha` |
| `POST /careers` | job application (multipart, CV PDF/DOC/DOCX up to 5 MB, private) | fields + `cv` file |
| `POST /newsletter` | newsletter sign-up | `{ email, name? }` |
| `GET /mail/unsubscribe`, `POST /mail/unsubscribe` | unsubscribe page and action (signed link from emails) | `?e=&t=` |
| `GET /mail/o/:id.gif` | email open pixel | |
| `GET /reviews`, `GET /reviews/summary`, `POST /reviews` | Rate & review list, summary, new review | |
| `POST /chat/ask` | kept for older pages (the chat answers from the site's own FAQ in the browser) | `{ message }` |
| `POST /chat/start` | hand the chat to a person | visitor details |
| `POST /chat/:id/message`, `GET /chat/:id/messages` | live chat messages | `?token=&since=` |
| `GET /site` | every published admin change, loaded once per visit | |
| `GET /content/:key` | one public content piece | |
| `GET /celebrations?year=`, `GET /gallery` | festival banners, gallery | |
| `GET /files/:id/:name` | public uploaded file (pictures inline; documents as downloads) | |
| `POST /track` | page view (no cookies, bots skipped) | `{ path, ref }` |
| `POST /integrations/sampcrew/webhook` | SampCrew sends a candidate's stage | signed `X-SampCrew-Signature` |
| `GET /integrations/sampcrew/cv/:leadId` | SampCrew downloads a CV | signed `?exp=&sig=` (7 days) |

Form rules: CAPTCHA, hidden `website` bot trap, 20 leads per connection per hour, valid email.
`LEAD_WEBHOOK` (or the same key in Connections & keys) also sends every lead to a CRM.

## 3. Admin endpoints

### Account, setup and access
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/me` | me: user (with `photo`, `prefs`), role, rights, extra access | signed in |
| `POST /admin/step-up` `{ code }` | confirm with the authenticator | signed in |
| `GET /admin/setup/:token`, `POST /admin/setup/:token/password`, `POST /admin/setup/:token/mfa` | one-time setup link: password, authenticator, recovery codes | the link |
| `GET /admin/account/sessions`, `POST /admin/account/sessions/:id/revoke` | my sessions | signed in |
| `POST /admin/account/password` `{ current, password, code }` | change my password | signed in |
| `POST /admin/account/recovery-codes` | new recovery codes | signed in, MFA |
| `PUT /admin/account/photo` `{ photo: "data:image/webp;base64,…" }`, `DELETE` | my photo (max 200 KB) | signed in |
| `PUT /admin/account/prefs` `{ palette?, theme? }` | my colour palette (`areas`, `ocean`, `aurora`, `sunset`, `forest`, `plum`, `graphite`, `rosegold`, `midnight`, `saffron`) and `light`/`dark`/`auto` | signed in |
| `GET /admin/users`, `POST /admin/users` (invite) | admins | users view / create, MFA |
| `PATCH /admin/users/:id` | details, role, extra access | users edit, MFA |
| `POST /admin/users/:id/resend\|suspend\|reactivate\|revoke-sessions\|reset\|deactivate` | account actions | users create / edit / delete, MFA |
| `GET /admin/users/:id/sessions` | someone's sessions | users view |
| `GET /admin/roles`, `PUT /admin/roles/:id`, `DELETE /admin/roles/:id` | roles and rights | users manage, MFA |
| `GET /admin/approvals?status=open\|all`, `GET /admin/approvals/:id` | drafts waiting, with the change | signed in (own area) |
| `POST /admin/approvals/:id/submit\|withdraw\|review\|approve\|reject\|publish\|archive` | approval steps | author / approver / publisher |

### Dashboard and activity
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/overview` | admins, approvals, new enquiries and applications, recent activity | signed in |
| `GET /admin/stats?days=7\|30\|90` | page views, leads per day, top pages, referrers, chats, reviews | dashboard view |
| `GET /admin/visits`, `GET /admin/audit?actor=&action=` | visits, activity log | activity view |
| `GET /admin/system` | API and database status, version, uptime, memory, documents per collection | integrations view |

### Content, pages, SEO, media
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/content` | every content key with its label | signed in |
| `GET /admin/content/:key`, `PUT /admin/content/:key { data }`, `DELETE /admin/content/:key` | read, save (live, or a draft for approval without Publish), back to the original | the key's area |
| `GET /admin/content/:key/history`, `GET …/history/:n`, `POST …/history/:n/restore` | earlier versions, put one back | view / publish |
| `GET /admin/files`, `POST /admin/files?name=&folder=&alt=` (raw file body) | media library list, upload | media view / create |
| `GET /admin/files/:id`, `PUT /admin/files/:id` (replace, same address), `PATCH /admin/files/:id` `{ alt, name }`, `DELETE` | one file | media |
| `PUT /admin/celebrations`, `PUT /admin/gallery` | festival calendar, gallery | settings / company publish |

Upload types: pictures (JPG, PNG, WEBP, GIF, SVG, AVIF), PDF, MP4, WEBM, MP3, Word, Excel, PowerPoint, CSV, TXT, ZIP.
SEO and redirects are the content key `seo` (redirects under `_redirects`); page texts `texts`; page sections
`page-sections`, `page-blocks`, `custom-pages`; menus `menu-*`, `footer-*`. All keys: `backend/src/routes/content.js`.

### Leads, chats, reviews
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/leads?kind=&category=&status=&assignee=&q=&from=&to=&format=csv` | enquiries, RFQs, downloads, job applications | enquiries or careers view (export for CSV) |
| `GET /admin/leads/assignees` | colleagues a lead can go to | enquiries or careers view |
| `GET /admin/leads/:id`, `PATCH /admin/leads/:id` `{ status, note, category, assignee }` (status: new, contacted, qualified, won, lost, spam), `DELETE` | one lead | view / edit / delete |
| `GET /admin/chats`, `GET /admin/chats/:id`, `POST /admin/chats/:id/reply\|close\|reopen` | live chat | enquiries view / edit |
| `GET /admin/chats/export?format=csv\|json\|txt`, `GET /admin/chats/:id/export` | download chats | enquiries export (all: MFA) |
| `GET /admin/reviews`, `PATCH /admin/reviews/:id`, `POST /admin/reviews/:id` | reviews: publish, hide, edit, reply | enquiries |

### Marketing, AI, social media
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/marketing/stats` | contacts and email numbers | marketing view |
| `GET /admin/contacts?format=csv`, `PATCH`/`DELETE /admin/contacts/:email` | contacts | marketing |
| `POST /admin/contacts/import` `{ rows: [{ email, name, company, country, tags }], subscribed }` | import contacts | marketing create, MFA |
| `GET`/`PUT /admin/mail/templates`, `POST /admin/mail/preview`, `POST /admin/mail/test` | email templates | marketing view / edit |
| `GET`/`PUT /admin/mail/automations` | automatic emails after forms | marketing view / publish |
| `GET /admin/mail/queue`, `POST /admin/mail/queue/retry` | sending queue | marketing view / publish |
| `GET`/`POST /admin/campaigns`, `PUT`/`DELETE /admin/campaigns/:id`, `POST …/:id/count\|send\|cancel` | newsletters | marketing |
| `GET /admin/social/status\|posts\|autopilot`, `POST /admin/social/posts`, `PUT`/`DELETE …/:id`, `POST …/:id/publish\|approve`, `PUT /admin/social/autopilot`, `POST …/autopilot/run` | social media | marketing |
| `GET /admin/ai/kinds`, `POST /admin/ai/write` `{ kind, brief, tone, length, platforms, extra }` | AI writer (drafts only) | edit in marketing, blog, pages, company or products |

### Connections and keys
| Method and path | What it does | Right |
|---|---|---|
| `GET /admin/integrations` | what is connected; every key with `set`, `source` (`database`/`server`), last 4 characters of secrets | integrations view |
| `PUT /admin/integrations/keys` `{ values: { NAME: "value" \| null } }` | save keys in the database (secrets encrypted, AES-256-GCM with `KEYS_SECRET`); `null` removes | integrations configure, MFA |
| `POST /admin/integrations/sampcrew/send/:leadId` | send an application to SampCrew again | careers edit |

### Page video component (build 82.6; was "Video web component" in 82.4)
Full guide for developers: `19-PAGE-VIDEO-COMPONENT.md`. Every `/page-videos…` path also answers as `/web-videos…` (the 82.4 name).

| Method and path | What it does | Right |
|---|---|---|
| `GET /page-videos?page=/about-us` | the video of one page: `{ ok, page, video, template }`, `video` is `null` when the page has none or it is hidden; CORS open, cached 60 s | public |
| `GET /page-videos` | every page with a live video: `{ ok, count, videos: [...] }` | public |
| `GET /page-videos/config` | generic templates, icons, custom field definitions, and `design` (layouts, frames, live cards (`props`), scenes, 3D objects, icons, movements) | public |
| `GET /page-videos/player.js` | the ready-made player `<fr-page-video>` (cached 5 min) | public |
| `GET /page-videos/flags.webp`, `/page-videos/world-dots.webp` | pictures the player uses (cached 30 days) | public |
| `GET /page-videos/templates` | every page's design (summary); `?page=/x` for one design in full | public |
| `GET /admin/page-videos?q=&has=with\|without&skip=&limit=` | all website pages (995 + added ones) with their videos, `total`, `pages`, `withVideo` | pages view |
| `GET /admin/page-videos/item?path=` | one page | pages view |
| `PUT /admin/page-videos/item?path=` `{ video: { url, title, description, template, icon, poster }, custom: {}, enabled }` | save one page | pages edit |
| `DELETE /admin/page-videos/item?path=` | remove one page's video | pages delete |
| `POST /admin/page-videos/import` `{ rows: [ { path, url, title, description, template, icon, poster, enabled, <custom keys> } ] }` | save many pages; answer `{ saved, errors }` | pages create |
| `GET /admin/page-videos/export` | CSV of all pages (`?as=json` for JSON) | pages view |
| `GET /admin/page-videos/settings`, `PUT` `{ settings: { templates, icons, fields } }` | templates, icons, custom fields | view / pages publish |
| `POST /admin/page-videos/pages` `{ pages: [ { path, title } ] }` | add new page URLs | pages create |
| `GET /admin/page-videos/templates?q=&layout=&scene=&object=&family=&edited=yes&skip=&limit=` | every page's design, `total`, `edited`, `options` | pages view |
| `GET /admin/page-videos/templates/item?path=` | one design: `template`, `generated`, `changes`, `video`, `warning` | pages view |
| `PUT /admin/page-videos/templates/item?path=` `{ template: { layout, frame, prop, scene, object, motion, palette, kicker, headline, em, subline, tagline, screenText, points, chips, stat, icons, flags, cta, link: { label, to }, subscribe, image, imageAlt } }` (`frame` and `prop` must be from `/config`; `link.to` must start with `/` or `https://`, else 400) | change one design (only differences from the generated design are kept); answers with a readability `warning` | pages edit |
| `DELETE /admin/page-videos/templates/item?path=` | back to the generated design | pages edit |

### Client & vendor onboarding (build 82)
| Method and path | What it does | Right |
|---|---|---|
| `POST /integrations/onboarding/:kind` (kind `client` \| `vendor`) | an onboarding portal backend delivers one submission (JSON, files base64), header `X-FR-Onboarding-Signature: t=<unix>,v1=<hex HMAC-SHA256("<t>.<body>")>` with `ONBOARDING_SECRET`; older than 5 minutes = 401; the same reference twice = `{ duplicate: true }` | public, signed |
| `GET /onboarding/form/:kind` | the form set-up for the portal (fields, documents, steps, extra fields, POC names, notice) | public |
| `GET /admin/onboarding?kind=&q=&status=&poc=&country=&expiring=&limit=&skip=` | submissions with counts per status and agreements expiring in 30 days; `&format=csv` = every field as a column | onboarding view (CSV: export, MFA) |
| `GET /admin/onboarding/:id` | one submission: `data` (every detail), `files`, `missingFiles`, `notes`, `history` | onboarding view |
| `POST /admin/onboarding` `{ kind, data, status }` | add one by hand (starts from the full empty form) | onboarding create |
| `PUT /admin/onboarding/:id` `{ data, status, owner, tags, fileLabels }` | change it; every changed detail is written to its history | onboarding edit |
| `DELETE /admin/onboarding/:id` | delete it with its documents | onboarding delete, MFA |
| `POST /admin/onboarding/:id/notes` `{ text }`, `DELETE …/notes/:nid` | internal notes | onboarding edit |
| `POST /admin/onboarding/:id/files?name=&label=` (the file as the body), `GET`/`DELETE …/files/:fid` (`?inline=1` to view) | documents and signed agreements | onboarding edit / view |
| `GET /admin/onboarding-renewals?kind=&days=` | every agreement with its expiry, days left and state (valid, due, expired, renewed) | onboarding view |
| `GET`/`PUT /admin/onboarding-forms/:kind` `{ config }` | the form set-up and the list of built-in fields; the last 50 versions are kept | onboarding view / configure |

## 4. Example (curl)

```
API=https://www.frequentresearch.com/api/v1
T=$(curl -s $API/admin/login -H 'content-type: application/json' -d '{"email":"you@frequentresearch.com","password":"…"}' | jq -r .ticket)
TOKEN=$(curl -s $API/admin/login/mfa -H 'content-type: application/json' -d "{\"ticket\":\"$T\",\"code\":\"123456\"}" | jq -r .token)
curl -s "$API/admin/leads?kind=enquiry&status=new" -H "authorization: Bearer $TOKEN"
```

Collections, back-ups and settings: `02-BACKEND-API.md`, `13-ACCESS-AND-ROLES.md`, `14-DEVELOPER-GUIDE.md`.
