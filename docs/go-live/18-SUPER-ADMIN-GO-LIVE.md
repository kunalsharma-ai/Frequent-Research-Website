# 18 · Super admin: going live (build 82.6)

The super admin is part of the website. It opens at **https://www.frequentresearch.com/admin** and is served by the
same two containers as the site: `frontend` (the website and the admin screens) and `backend` (the API and the
MongoDB database where every admin change is kept). There is nothing separate to install: **when the website goes
live with the backend and MongoDB running, the super admin is live.**

Files: to go live use `frequent-research-GO-LIVE-build82.6.zip` (everything, with the finished website inside;
step by step: `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`). The super admin source alone is in
`frequent-research-source-COMPLETE-build82.6.zip` (the same project, without the finished website), which holds:

| Folder in the zip | What it is |
|---|---|
| `frontend/src/admin/` | Every admin screen (dashboard, onboarding, inbox, pages, website content, marketing, system, access) |
| `frontend/src/app/cms.jsx`, `cms78.jsx`, `cmsBlocks.jsx` | How the website reads the admin's changes |
| `backend/` | The API (Express) with all admin routes, tests and command-line tools |
| `mongo/` | Database start-up script (private database user) |
| `docker-compose.yml`, `.env.example` | The three containers and every setting they read |
| `docs/` | Every document `00`–`20` (super admin: 10, 12, 13, 14, 15, 16, 17, 18, 19; developers' go-live: 20) |
| `frontend/dist/` (GO-LIVE zip) | The finished website and admin screens, so the server builds nothing |
| (next to the zip) `frequent-research-admin-demo-build82.6.html` | Offline demo with sample data, to try every screen (not for upload) |

The full website source zip contains the same files; use either.

## What the super admin can change (build 82.6)

Everything shown on the website can be edited, without touching files:

- **Page video component** (82.4, renamed and extended in 82.5; showcase style in 82.6): the video of every page and **a video design of its
  own for each of the 995 pages** (showcase layout like the Turn2Opinion video window, frame, live card, animated scene, icons, flags, colours, words), all editable;
  the website shows it with two lines (`19-PAGE-VIDEO-COMPONENT.md`).
- **Pages:** every text, picture and link on all 995 pages (Pages & sections, Edit on the page), new pages, header
  and footer menus, logos, legal pages, SEO and redirects, alt text of pictures.
- **Website content:** site settings, contact and WhatsApp, **Team** (all 21 people, photos, LinkedIn, videos),
  **Leadership messages** (new in 82.3: names, roles, photos and every paragraph of the three director messages),
  **Home page numbers** (new in 82.3), **Hero texts** of the home and platform pages (new in 82.3), testimonials,
  blog posts, case studies, products, panel portals, careers, downloads, certifications, associations,
  Accounts & Finance prices, panel numbers, PDFs, forms, page videos, celebration calendar, gallery.
- **Onboarding:** every new client and new vendor submission, their agreements and documents, renewals, the form
  fields of both portals, and the onboarding links shown on the site.
- **Inbox:** leads, contacts, live chat, reviews. **Marketing:** email templates, automations, newsletters, social
  media, AI assistant. **System:** API, connections and keys, files. **Access:** admins, roles, approvals.

Built-in content stays as the default: anything an admin has not changed shows exactly as it does today, and
"Back to the original content" on any screen undoes the admin's changes.

## Go-live steps

1. **Server:** follow `01-GO-LIVE-STEPS.md` (Docker, domain, HTTPS). The admin needs the `backend` and `mongo`
   containers running; the website alone (static files) shows the site but not the admin.
2. **Settings (`.env`, from `.env.example`):** fill at least `PUBLIC_URL`, `MONGO_PASSWORD`, `MONGO_APP_PASSWORD`,
   `KEYS_SECRET`, `DATA_KEY`, `REVIEW_SECRET` and `ADMIN_EMAIL_DOMAINS=frequentresearch.com`. Each secret must be a
   long random value (`openssl rand -hex 32`). Keep a safe copy of `DATA_KEY` and `KEYS_SECRET`: without them the
   encrypted tax, bank and document data cannot be read. Details: `17-SECURITY.md`.
3. **Start:** `docker compose up -d --build` (1–2 minutes with the GO-LIVE zip; all three containers must show
   `healthy` in `docker compose ps`).
4. **First Super Admin:**
   `docker compose exec backend npm run admin -- create-super-admin --email you@frequentresearch.com --name "Your Name"`.
   It prints a one-time setup link: open it, choose a password, scan the QR code with an authenticator app
   (Google Authenticator, Microsoft Authenticator) and save the 10 recovery codes.
5. **Sign in** at `/admin` with email, password and the 6-digit code.
6. **Invite the team** in Access › Admins (each person gets their own account and role; `13-ACCESS-AND-ROLES.md`).
7. **Keys:** type the email, AI, social media, SampCrew and onboarding keys in System › Connections & keys
   (`12-MARKETING-AND-KEYS.md` says where each one comes from; they come from your own accounts).
8. **Backups:** schedule `docker compose exec backend npm run backup` daily and keep the copies off the server.
9. **Check:** change a small text in Pages & sections, Save and publish, reload the page in a private window: the
   change shows. Then use "Back to the original content".

## If something goes wrong

- Lost authenticator: sign in with a recovery code, or another Super Admin resets access; last resort
  `docker compose exec backend npm run admin -- recover --email …`.
- Admin page blank or "API not reachable": the `backend` container is not running or `/api` is not passed to it
  (`docker compose ps`, `docker compose logs backend`).
- Every admin action is recorded in Overview › Activity.
