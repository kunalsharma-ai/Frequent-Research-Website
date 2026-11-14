# Frequent Research website, build 82.7: go-live pack (start here)

**Build 82.7 (14 November 2026) is the version to launch.** Developers: start with
**`20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`** and the file **`frequent-research-GO-LIVE-build82.7.zip`**. It is a React + Vite
frontend and an Express + MongoDB backend in Node 24 containers (plus MongoDB), with the super admin panel at `/admin`.
Everything you need is in this folder and next to it in `build82.7/`. What the recent builds added:

- **Build 82.7: SEO for an A+ SEOptimer audit.** One H1 per page, the whole page text readable to search engines
  and audit robots, alt text and sizes on every picture, local business and organisation structured data, a share
  picture, social profile links, the home title at 60 characters, descriptions at most 160, https / www redirect.
  Design and animations unchanged. What the hosting team must set (HTTP/2, https redirect at the proxy, CDN) and what
  marketing must do (backlinks, Facebook Pixel, Google Business Profile): `21-SEO.md`.

- **Build 82.6: showcase video window on every page.** Every page's video now uses the showcase style Kunal chose
  (like the Turn2Opinion video window): the words on one side (pill, big headline with an italic second line,
  description, numbered steps with moving bars, number and flags, main button and red YouTube Subscribe button) and
  the video in a designed frame on the other (17 frames: speech bubble, tablet, laptop, TV, ticket, polaroid …),
  with a live card beside it (15 kinds: survey, chart, chat, gauge …). No two of the 995 pages share frame, card and
  scene; colours follow each page's subject. All new fields are editable in Super admin › Pages › Page video
  component. Details: `19-PAGE-VIDEO-COMPONENT.md`.
- **Build 82.5: go-live fixed, page video designs.**
  - *"The build stops after llms.txt" is fixed.* That was step 4 of the website build (a first-screen copy of each of
    the 995 pages, 60–90 minutes, silent at the start, and able to freeze in Docker's small shared memory). The new
    go-live package contains the finished website, so the server no longer builds anything: the containers are up
    in 1–2 minutes. Building from source still works and now prints every step and its progress, with time limits.
  - *Page video component* (renamed from "Video web component"): every one of the 995 pages has its own animated
    video design (layout, moving scene, 3D object, icons, flags, colours that suit the page), all different, all
    editable in Super admin › Pages › Page video component. The website connects with two lines. Guide:
    `19-PAGE-VIDEO-COMPONENT.md`.
- **Build 82.4: video web component** section in the super admin (now the Page video component).
- **Build 82.3: onboarding links, numbers, certifications, languages, alt text.** Links to the new client and new
  vendor onboarding forms on home, Let's Talk, Scan & Connect and the footer (addresses editable in super admin →
  Onboarding → "Onboarding links on the site"). Numbers band with calm navy cards and line icons. Certification
  badges orbit and float. The language button (130+ languages, sounds and effects) is back in the header. Leadership
  messages keep the build 82.2 card design. Every image has an alt attribute; the full list is in
  `frequent-research-alt-text-build82.4.csv` (in `build82.4/`; unchanged).

- **Build 82: client and vendor onboarding in the super admin.** Two new spaces (Onboarding → Client onboarding,
  Vendor onboarding) show every detail of every submission, editable, with MSAs, documents, renewals, notes and
  history, and let you change the form fields of both portals. How to connect: `16-ONBOARDING-PORTALS.md`.
- **Build 82: security.** Tax and bank numbers and onboarding documents are encrypted in the database, the database
  is on a private network with its own limited user, and the web server and API add security headers and request
  limits. What the server team must do at go-live: `17-SECURITY.md`.
- **Build 81.2: logo and panels.** The original logo with the white inside the letters made transparent; the
  Caregiver and Patient panel tabs show only MyHealthOpinions.
- **Build 81: a new home hero.** Each home slide has its own moving picture: a research lab (Market Research), a
  campaign going live on a phone (Digital Marketing), code becoming an app (IT & Development), a ledger desk with a
  GST stamp (Accounts & Finance) and a 3D universe where the 7 Sampledge products orbit as planets. Slides change every
  4.5 seconds; the lag (live 3D globe, blurred moving background) is gone.
- **Build 80.2: every page opens at once.** Every page except the Sampledge product sites shows a ready-made copy of
  its first screen straight away (like home); PageSpeed on inner pages rose from about 40 to 75–94 on phones and
  from about 65 to 97–100 on desktop (`11-PAGESPEED.md`).
- **Build 80.1: smoother pages.** Service, platform and product pages no longer lag (an old moving background is
  gone; the Sampledge 3D pictures start moving on the first touch or mouse move). SampBidx and SampCrew layout fixes.
- **Build 80: new story heroes.** All 67 service pages have a brand-new animated picture that tells that service's
  story in 12 seconds (a call being answered for CATI, a payslip printed for Payroll, a search result climbing for SEO …).
  The four platforms, the Sampledge products and All services have new moving pictures on the home slides and their
  own pages. Phones get the same animations once the page has loaded. Everything else is unchanged.
- **Build 79: new animated heroes.** Home (live 3D globe, headline that builds line by line, the four platforms
  orbiting; the 10-second festival banner on top), the 4 platform pages (each its own personality and 3D scene), All
  services and all 67 service pages (each its own colours, grading and animated picture). Sampledge product heroes,
  the rest of every page and the admin are unchanged.
- **Build 78.5: every API in the admin.** System › API shows live status and all 99 endpoints, with Try it and
  Copy as curl (`15-API-REFERENCE.md`).

- **Build 78.4: an attractive admin, and keys typed in the panel.** A new animated dashboard (greeting hero with a 3D
  orbit, live numbers, traffic and leads charts, waiting approvals, live activity), its own colours and animated
  banner for every area, 10 colour palettes each admin can choose, admin photos, Import from a file in every section
  (Excel, CSV, JSON, Word, pictures, documents), a new My account page, and the
  connection keys (email, AI, social media, SampCrew) typed in **Connections & keys** and saved encrypted in the
  database (`12-MARKETING-AND-KEYS.md`). New `14-DEVELOPER-GUIDE.md`: where every part of the code is. The public
  website is unchanged.

- **Build 78.3: who may do what in the admin.** Personal admin accounts (invitation only, password + authenticator
  app, recovery codes), eight roles plus access to particular items or pages, approvals (draft → review → publish),
  lead assignment, SEO per page and redirects, media alt text, backups, and a new look for the panel (animated logo,
  light / dark theme, sounds). There is no default login any more: make the first Super Admin on the server
  (`13-ACCESS-AND-ROLES.md`). The public website is unchanged.

- **Builds 74 to 76: PageSpeed.** 100 in accessibility, best practices, SEO and the AI check on desktop and mobile;
  performance 100 on desktop and 99 to 100 on mobile (`11-PAGESPEED.md`). The home page opens with a ready-made still
  copy of its first screen; the full site, with every animation, starts on the first touch or mouse movement. Phones
  get a still hero and no intro splash.
- **Build 77: the Google tag (GTM-TDDKS62)** first in `<head>` on every page.
- Earlier: new Sampledge products (68), per-page videos and the super admin "Page videos" (70 to 71), smoother pages
  and working PDF downloads (72), Manish Arora's new photo (73). Every change is listed in `CHANGELOG.md`.

## What you get

| File | What it is | Who |
|---|---|---|
| `frequent-research-GO-LIVE-build82.6.zip` | **The one to put live.** The whole project with the finished website inside (`frontend/dist/`), all documents and `.env.example`. `docker compose up -d --build` is ready in 1–2 minutes. Guide: `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`. | Developers / IT |
| `frequent-research-source-COMPLETE-build82.6.zip` | The whole project without the finished website: `frontend/` (React + Vite, every super admin screen in `src/admin/`), `backend/` (Express, all admin routes), Dockerfiles, `.dockerignore`, `package.json`, `docker-compose.yml`, `.env.example`, `mongo/`, all documents. It is both the source and the complete super admin. Use it to change the code. | Developers |
| Hosting without Docker | Upload the folder `frontend/dist/` from the GO-LIVE zip to any web server (it is the finished website; the `/api` part needs the backend). | Hosting / IT |
| `frequent-research-preview-build82.6.html` | One-file preview for review only. Never upload it, and do not judge speed from it. | Kunal |
| `frequent-research-ALL-DOCUMENTS-build82.6.zip` | Every document (00 to 20, quality checklist, README, change log, file list). | Everyone |
| `frequent-research-admin-demo-build82.6.html` | The super admin with sample data, opens by double-click (demo@frequentresearch.com / demo, any 6-digit code), including the 995 page video designs. Not for upload. | Kunal / admin team |
| `client-onboarding.zip`, `vendor-onboarding.zip` | The new client and new vendor onboarding form sites (their own servers), unchanged since 82.3, in `build82.3/`. Guide: `16-ONBOARDING-PORTALS.md`. | Developers / IT |
| `frequent-research-alt-text-build82.4.csv` (in `build82.4/`) | Alt text of every picture and icon, page by page (unchanged in 82.5). | SEO / content |
| `llms.txt` | The site summary for AI assistants (also inside `frontend/dist/`). | SEO |

## Read in this order

| # | Document | For | Covers |
|---|---|---|---|
| 1 | `01-GO-LIVE-STEPS.md` | Hosting / IT | The two containers, settings, HTTPS, hosting without Docker, rollback |
| 2 | `02-BACKEND-API.md` | Backend developer | `/api/v1` endpoints, MongoDB collections, moving build 66 data, back-ups |
| 3 | `03-PRE-LAUNCH-TESTS.md` | Kunal / QA | Tick-list to run on the live domain (desktop and phone, light and dark) |
| 4 | `04-CONTENT-SIGNOFF.md` | Kunal | Facts and claims only you can confirm before announcing |
| 5 | `05-SEO-AND-AFTER-LAUNCH.md` | Marketing | Search Console, sitemap, redirects, first-week checks |
| 6 | `06-CELEBRATIONS-ADMIN.md` | Super admin team | Home-page celebration banner 2026–2030 and the prompt for your admin panel |
| 7 | `07-GALLERY-ADMIN.md` | Super admin team | Gallery sections (Festivals, Awards, Birthdays) filled with photo and video links |
| 8 | `08-QA-REPORT.md` | Everyone | What was tested before handover and the results |
| 9 | `09-FORMS.md` | Everyone | Every form on the site, where it appears and where it sends its data |
| 10 | `10-SUPER-ADMIN.md` | Kunal / admin team | The super admin panel at `/admin`: every section and what it controls |
| 11 | `11-PAGESPEED.md` | Kunal / IT | PageSpeed scores, how the home page starts, the Google tag, server settings that matter |
| 12 | `12-MARKETING-AND-KEYS.md` | Kunal / IT | The keys for email, newsletters, AI, social media and SampCrew, where to get each, and how to type them in the panel |
| 13 | `13-ACCESS-AND-ROLES.md` | Kunal / IT | First Super Admin, inviting the team, roles and page-by-page access, approvals, recovery, backups |
| 14 | `14-DEVELOPER-GUIDE.md` | Developers | Where every part of the code is, how to run, build and release |
| 15 | `15-API-REFERENCE.md` | Developers | Every API endpoint: address, what it does, body, the right it needs |
| 16 | `16-ONBOARDING-PORTALS.md` | Developers | Connecting the client and vendor onboarding portals to the super admin |
| 17 | `17-SECURITY.md` | IT | Encryption keys, private database, headers, limits: what to do at go-live |
| 18 | `18-SUPER-ADMIN-GO-LIVE.md` | Developers / IT | The super admin: what it controls and how it goes live with the site |
| 19 | `19-PAGE-VIDEO-COMPONENT.md` | Developers / admin team | Page video designs, the admin screen, the two-line website connection, all endpoints |
| 20 | `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md` | Developers / IT | **The simple go-live, step by step**, with checks and troubleshooting ("stops after llms.txt") |
| – | `QUALITY-CLAIMS-CHECKLIST.md` | Kunal | Quality-process claims to confirm |
| – | `README.md` (in the source zip) | Developers | Project layout, local development, how the build works |

## Launch-day checklist (short version)

1. Back up the current site and any reviews or leads you already collect.
2. Unzip `frequent-research-GO-LIVE-build82.6.zip` on the server, `cp .env.example .env`, set `REVIEW_SECRET`, `KEYS_SECRET`, `PUBLIC_URL`,
   `MONGO_PASSWORD` and (optional) `LEAD_WEBHOOK`. After the first start make the first Super Admin
   (`docker compose exec backend npm run admin -- create-super-admin --email … --name …`, see `13-ACCESS-AND-ROLES.md`). For email, AI, social media and SampCrew type the keys in the panel's Connections & keys,
   see `12-MARKETING-AND-KEYS.md` (they can also be added later). Coming from build 66 with saved leads or reviews: run the import
   in `02-BACKEND-API.md` once.
3. `docker compose up -d --build` (1–2 minutes with the GO-LIVE zip; step by step in `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`), then put HTTPS in front of port 8080.
4. Send one test enquiry and one test download; check they appear in `/admin` › Leads (or your CRM).
5. Run `03-PRE-LAUNCH-TESTS.md` on desktop and phone.
6. Submit `/sitemap.xml` in Google Search Console.
7. Run PageSpeed (https://pagespeed.web.dev/) on the live home page three times, desktop and mobile, and check the
   Google tag fires in Tag Assistant (`11-PAGESPEED.md`).
