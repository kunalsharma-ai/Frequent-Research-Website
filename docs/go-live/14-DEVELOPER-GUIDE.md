# Developer guide: where everything is (build 82.6)

For the Frequent Research developer team. Paths are relative to the project folder `frequent-research-build82.6/`, which is what the source
zip (`frequent-research-source-COMPLETE-build82.6.zip`) unpacks to. Stack: React 18 + Vite 8 (frontend), Express 5 on
Node 24 (backend), MongoDB 8, each in its own Docker container. No monorepo tools and no workspaces: `frontend/` and
`backend/` are separate npm projects.

## 1. Run it on your machine

```
# MongoDB: any local MongoDB 8 on 127.0.0.1:27017 (or set MONGODB_URI in backend/.env)

# backend  -> http://localhost:8787/api/v1
cd backend && cp .env.example .env     # set REVIEW_SECRET and KEYS_SECRET (openssl rand -hex 32)
npm ci && npm run dev                  # restarts on changes
npm run admin -- create-super-admin --email you@frequentresearch.com --name "Your Name"   # prints a one-time setup link

# frontend -> http://localhost:5173  (the site)  and  http://localhost:5173/admin  (the admin panel)
cd frontend && npm ci && npm run dev   # Vite proxies /api to :8787
```

Everything together, as on the server: `cp .env.example .env`, fill it in, `docker compose up -d --build`
(see `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`). The frontend container uses the finished website in `frontend/dist/`
(`FRONTEND_MODE=ready`, default); without it, run `npm run release` in `frontend/` first or set `FRONTEND_MODE=build`.

## 2. Folder map

| Path | What it is |
|---|---|
| `docker-compose.yml` | mongo + backend + frontend (nginx) containers and their settings |
| `.env.example`, `backend/.env.example` | every setting with a comment; copy to `.env` |
| `docs/go-live/` | these guides (00 start here … 20 developer go-live step by step) |
| `CHANGELOG.md` | what changed in every build |

### Backend (`backend/`)

| Path | What it is |
|---|---|
| `src/server.js` | start-up: connects MongoDB, loads the saved keys, starts the API and background workers |
| `src/app.js` | Express app, `/api/v1` router, the permission guard, order of routers |
| `src/config.js` | every setting read from the environment; `integrationsFrom()` builds the email/AI/social/SampCrew part |
| `src/db.js` | MongoDB connection, collections, indexes, GridFS for uploaded files |
| `src/lib/auth.js` | passwords (scrypt), TOTP authenticator, recovery codes, the modules/rights list and the 8 built-in roles |
| `src/lib/access.js` | **every admin route and the right it needs** (`RULES`); add a line here for each new admin route |
| `src/lib/keystore.js` | build 78.4: connection keys saved in the database, AES-256-GCM, reload every 60 s |
| `src/lib/util.js` | sessions (`sessionUser`, `requireAdmin`), `audit()` for the Activity log, rate limits, CSV |
| `src/lib/mailer.js`, `src/lib/mailtpl.js` | sending email (SMTP, Resend, SendGrid, Brevo) and the email template |
| `src/lib/ai.js` | the AI writer (Anthropic SDK, structured output per kind) |
| `src/lib/captcha.js` | form CAPTCHA |
| `src/routes/users.js` | sign-in, MFA, step-up, setup links, invitations, admins, roles, grants, My account |
| `src/routes/content.js` | site content keys, drafts, approvals, publish, history |
| `src/routes/leads.js` | forms, enquiries, RFQs, careers with CVs, assignment |
| `src/routes/files.js` | media library uploads, alt text, Replace |
| `src/routes/admin.js` | dashboard overview, stats, activity log, SEO, redirects |
| `src/routes/integrations.js` | Connections & keys, AI writer endpoint, SampCrew, chat exports |
| `src/routes/marketing.js` | contacts, email templates, automations, newsletters, mail queue worker |
| `src/routes/social.js` | Facebook, Instagram, LinkedIn, X posting and the autopilot worker |
| `src/routes/chat.js`, `reviews.js`, `track.js` | live chat, reviews, page-view tracking |
| `src/routes/pageVideos.js` | build 82.5–82.6: Page video component API (`/page-videos`, old `/web-videos` too): videos, every page's design, player files |
| `src/lib/pageTemplates.js`, `src/data/page-video-templates.json`, `tools/make-page-video-templates.js` | the design generator, the 995 generated designs, the command that makes them from `frontend/dist` |
| `src/public/fr-page-video.js`, `flags-sprite.webp`, `world-dots.webp` | the ready-made player `<fr-page-video>` and its pictures (served at `/api/v1/page-videos/…`) |
| `src/routes/onboarding.js` | client and vendor onboarding (`16-ONBOARDING-PORTALS.md`) |
| `tools/admin.js` | `npm run admin -- create-super-admin / recover / list` |
| `tools/backup.js` | `npm run backup -- /backups` and `restore` |
| `test/*.test.js` | `npm test` (needs a MongoDB: `MONGODB_URI`) |

API reference: `02-BACKEND-API.md`. Every route is under `/api/v1`.

### Frontend (`frontend/`)

| Path | What it is |
|---|---|
| `src/main.jsx` | entry: loads the public site, or the admin panel on `/admin` |
| `src/app/` | public site shell: `SiteApp.jsx`, header, navigation, `cms*.jsx` (content from the API), `pages/` (one file per page), `home/` |
| `src/components/site/` | shared site components (logos, heroes, footer, chat, celebrations…) |
| `src/design79/` | build 79 heroes: home `HomeHero79.jsx` + `h79.css`; platforms `PlatformHero79.jsx` + `ph79.css`; every service and All services `SvcHero79.jsx` + `s79.css` (texts, pictures and colours per service in `heroes79.js`); `fx.jsx` (effects), `Scene3D.js` (three.js, loaded later), `content.js` (texts) |
| `src/products/` | the 7 Sampledge product sites (each in its own shadow root) |
| `src/data/`, `src/config/` | built-in page data, countries, redirects |
| `src/styles/` | CSS; `admin.css` (base admin), `admin78.css`, `admin783.css` (admin look of 78.3 and 78.4) |
| `src/admin/AdminApp.jsx` | **admin panel shell**: sidebar menu (`NAV`), sections, which right opens which section (`AREA`) |
| `src/admin/api.jsx` | `admApi()` (token header, step-up retry), `admMe()`, `admCan()` |
| `src/design80/` | build 80 hero animations. Services: `cine80.jsx` (3 bespoke scenes + the `CINE` map used by `SvcHero79.jsx`), `specs80.js` (one entry per service: colours, centre piece, live cards), `kit80.jsx` (`makeScene`, card types), centre pieces `heroes80.jsx` (research), `heroes80b.jsx` (marketing), `heroes80c.jsx` (IT), `heroes80d.jsx` (finance). Platforms, Sampledge slide and All services: `plat80.jsx`. Styles `c80.css`, `k80.css`, `k80b.css`, `k80c.css`, `k80d.css` (kept out of the generated dark sheet in `vite/fr-site.js`). To change a service picture, edit its entry in `specs80.js`. |
| `src/design81/` | build 81 home hero pictures: `hx81.jsx` (`Scene81`, one component per slide: `MR`, `DM`, `IT`, `AF`, `SX` universe of products from `PR5_LIST`), `hx81.css` (`.x81*`, every size in cqw; also the lighter home hero shell rules). Used by `design79/HomeHero79.jsx`, which builds only the slide on screen. Slide time `HX_MS` in `HomeHero79.jsx`. |
| `src/products/_shell/pzRaf.js` | build 80.1: `pzRaf` / `pzCancel`, used by each product's 3D or canvas hero loop instead of requestAnimationFrame; draws the first frames, then waits for the first mouse move / touch / key / wheel |
| `src/admin/Dash.jsx` | 78.4 dashboard (hero, KPIs, charts, activity) |
| `src/admin/Access.jsx` | sign-in, setup, admins, roles, approvals, SEO, My account |
| `src/admin/Look.jsx` | animated logo, sign-in scene, light/dark/auto, colour palettes, sounds, area colours, admin photos (`AdmFace`) |
| `src/admin/Areas.jsx` | the banner with colours, font and animated scene at the top of every section |
| `src/admin/Api.jsx` | System › API: live status, every endpoint, Try it (keep its list in step with `backend/src/routes`) |
| `src/admin/Import.jsx` | Import from a file (Excel, CSV, JSON, Word, text, pictures, documents); a section offers its fields with `useAdmImportTarget()` |
| `src/admin/Marketing.jsx` | emails, automations, newsletters, social, AI writer, Connections & keys |
| `src/admin/Inbox.jsx` | leads, live chat, reviews, visits |
| `src/admin/Content.jsx`, `SiteContent.jsx`, `PageEditor.jsx`, `Builder.jsx`, `Fields.jsx` | content editors and form fields |
| `src/admin/WebVideos.jsx`, `pagevideo-player.js` | build 82.5–82.6 (showcase frames, live cards): Pages › Page video component (videos, designs, design editor, website connection); the player copy for previews (must equal `backend/src/public/fr-page-video.js`) |
| `src/admin/System.jsx` | files (media library), activity log |
| `scripts/` | release steps: prerender, sitemap/site index, compression, admin demo, preview file; `step.cjs` prints the "step N of 6" banners |
| `Dockerfile` | build 82.5: `FRONTEND_MODE=ready` copies `dist/` into nginx; `FRONTEND_MODE=build` builds it (Chromium, 60–120 min) |
| `nginx/default.conf.template` | the frontend container's nginx (serves `dist`, proxies `/api` to the backend) |

## 3. Build and release

| Command (in `frontend/`) | Result |
|---|---|
| `npm run build` | `dist/` (quick check only) |
| `npm run release` | full site: build + prerender + sitemap + first-screen copies + admin page index + compression (75 to 90 minutes; prints "step N of 6" and progress) |
| `npm run admin-demo` | `dist-preview/frequent-research-admin-demo.html`: offline admin demo (demo@frequentresearch.com / demo) |

Rules the project keeps:
- the public website's look and animations do not change; admin work stays in `src/admin/` and `admin783.css`;
- `admin.css` is in the main bundle; new admin styles go in `admin783.css` (loaded only by the admin);
- each new admin API route needs a line in `backend/src/lib/access.js` and an `audit()` call when it changes data;
- secrets never go in the code, git or the frontend: in the panel (Connections & keys) or the server `.env`.

## 4. Where the data is (MongoDB collections)

`content` (site content, email templates, settings), `content_history` (every published version), `content_drafts`
(approvals), `leads`, `chats`, `reviews`, `visits`, `audit` (Activity), `admin_users`, `admin_roles`,
`admin_sessions`, `contacts`, `mail_queue`, `campaigns`, `social_posts`, `settings_keys` (78.4: connection keys,
secrets encrypted), `web_videos`, `web_video_settings`, `page_video_templates` (82.5: page videos and design changes),
`onboarding`, `onboarding_forms` (82: onboarding records and form set-ups), and the GridFS bucket `files` for uploads. Backups: `13-ACCESS-AND-ROLES.md` section 8.
