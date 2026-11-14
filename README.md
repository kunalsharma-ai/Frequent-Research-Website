# Frequent Research website (build 82.7)

Two separate applications, each with its own `package.json`, its own `node_modules` and its own container. There is
no root `package.json`, no npm/Node workspaces and no Turborepo. Both run on **Node 24 LTS** (`.nvmrc`).

| Folder | What it is | Run locally | Container |
|---|---|---|---|
| `frontend/` | The website: a React app built with **Vite** | `npm run dev` (http://localhost:5173) | `frontend/Dockerfile`: nginx serving the finished website (`frontend/dist/`, `FRONTEND_MODE=ready`) or building it first (`FRONTEND_MODE=build`), and passing `/api/` to the backend |
| `backend/` | The API under `/api/v1`: **Express** with **MongoDB** (leads, careers, reviews and CAPTCHA, live chat, visits, uploads, every super admin change) | `npm run dev` (http://localhost:8787, needs MongoDB) | `backend/Dockerfile`: Node 24 Alpine |
| `frontend/src/admin/` | The super admin panel, served by the website at `/admin` (guide: `docs/go-live/10-SUPER-ADMIN.md`) | | |
| `backend/src/lib/auth.js`, `lib/access.js`, `routes/users.js`, `tools/admin.js`, `frontend/src/admin/Access.jsx`, `Look.jsx` | Build 78.3: admin accounts, roles and page-by-page access, approvals, the first Super Admin command, the panel's look (`docs/go-live/13-ACCESS-AND-ROLES.md`) | | |
| `backend/src/routes/marketing.js`, `social.js`, `integrations.js`, `lib/ai.js`, `lib/mailtpl.js` | Build 78: email templates, automations and newsletters, social posting, the AI writer and SampCrew. Each needs its own keys in `.env` (`docs/go-live/12-MARKETING-AND-KEYS.md`); without them they wait and say what is missing | | |
| `frontend/scripts/seo-pass.cjs`, `frontend/src/app/seoText.js`, `frontend/src/app/altText.js` | Build 82.7: SEO pass (one H1, text for robots, alt text, structured data, share picture; `docs/go-live/21-SEO.md`) | | |
| `backend/src/routes/pageVideos.js`, `lib/pageTemplates.js`, `public/fr-page-video.js`, `frontend/src/admin/WebVideos.jsx` | Build 82.5–82.6: Page video component: a showcase video design for every page, the player, admin screen and API (`docs/go-live/19-PAGE-VIDEO-COMPONENT.md`) | | |
| `docker-compose.yml` | Starts the frontend, backend and MongoDB containers together | | |
| `docs/go-live/` | Go-live pack: start with `00-START-HERE.md` | | |

## Quick start with Docker
```bash
cp .env.example .env              # set the secrets (openssl rand -hex 32) and PUBLIC_URL: docs/go-live/20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md
docker compose up -d --build      # with frontend/dist/ present (GO-LIVE zip): 1-2 minutes
# from source without frontend/dist/: FRONTEND_MODE=build docker compose build --progress=plain frontend   (60-120 minutes)
open http://localhost:8080
```
Separately, without compose:
```bash
docker build -t fr-backend ./backend
docker build -t fr-frontend ./frontend          # uses frontend/dist/; or --build-arg FRONTEND_MODE=build (add --build-arg PRERENDER=0 for a quick test build)
docker network create fr
docker run -d --name mongo    --network fr -v fr-mongo:/data/db mongo:8.0
docker run -d --name backend  --network fr -e MONGODB_URI=mongodb://mongo:27017 -e REVIEW_SECRET=… -e PUBLIC_URL=https://… fr-backend
docker run -d --name frontend --network fr -p 8080:80 -e BACKEND_URL=http://backend:8787 fr-frontend
```

## Local development
```bash
docker run -d -p 27017:27017 --name mongo mongo:8.0                # local MongoDB
cd backend  && npm ci && cp .env.example .env && npm run dev     # API on :8787 (set DEV=1 to only log form posts)
cd frontend && npm ci && npm run dev                             # site on :5173, /api is proxied to :8787
```
Frontend scripts: `npm run build` (Vite build to `dist/`), `npm run prerender` (one HTML file per route, sitemap, robots,
chat knowledge base, llms.txt, the home page's ready-made first screens for phone and desktop (`scripts/phone-shell.cjs`, see `docs/go-live/11-PAGESPEED.md`), the content list of every page for the super admin (`scripts/site-index.cjs`); needs Chromium: `npx playwright install chromium`), `npm run release` (both),
`npm run preview` (serve `dist/`). Offline single-file preview: `npm run preview-file` (writes `dist-preview/frequent-research-preview.html`). Product pages: `src/products/<id>/` (see CHANGELOG, build 68); product logos: `npm run logos`.
Backend scripts: `npm start`, `npm run dev`, `npm test` (needs MongoDB), `npm run import-files -- <old data folder>`.

## How the frontend is put together
The site is ordinary React source, built by Vite as ES modules. There is no compiled core any more.
- `index.html` is the Vite page and loads `src/main.jsx`, the entry point. `main.jsx` imports every stylesheet, then
  every module of the site in a fixed order (some modules only register things, such as chat answers, scroll effects
  or start-up settings, so they are imported for that), then starts React with the hash router.
- Every file imports what it uses from other files (`import { … } from './x.jsx'`) and exports what other files use.
  Packages from npm: React 18.3.1, ReactDOM, React Router 6.30.6, jsPDF 4.2.1 (with html2canvas and DOMPurify) and
  lucide-react 1.49.0 (industry icons).
- `src/app/`: the site shell and the parts that used to be the compiled core:
  - `SiteApp.jsx` (routes, page titles, not-found page) and `SiteHeader.jsx`;
  - `home/` (home page), `pages/` (service, vertical, blog, legal, portal, government and other pages);
  - `data/` (services, products, blog posts, case-study trackers, industries, phone countries, maps);
  - `shared/` (forms, search, industries, blog covers, globe, reveal effects and other shared parts);
  - `chat/` (chat widget and its answers), `icons/` (industry icons), `startup.jsx` (settings applied once at start).
- `src/pages/` and `src/components/`: the pages and components added in later updates (they import from `src/app/`
  and from each other the same way). Stylesheets: `src/styles/` (`core.css` first).
- `vite/fr-site.js` is the only Vite plugin. It turns image placeholders into asset imports, writes the language files,
  builds the dark theme stylesheet, fills the boot script in `index.html`, writes the nginx redirects and 404 page and
  compresses the output. QA builds (`FR_QA_HOOK=1`) also expose the site's functions to test scripts.
- Images used by the code are in `src/assets/images/` (Vite gives them hashed file names; small ones are inlined).
  Static files served as they are: `public/` (`data/` panel books, chat knowledge base, celebration days, gallery;
  `i18n/` language files written by the build from `src/i18n/dict/`; `media/`; `assets/core/` images of the original
  pages).
- The dark theme stylesheet (`assets/dark.<hash>.css`) is generated at build time and only downloaded by visitors who
  choose dark.
- Removed pages and their 301 targets: `src/config/redirects.json` (nginx rules are generated from it).
- Content tools (Python): `tools/` (panel books, celebration days, QR codes, logos, maps…). They write into `src/` or
  `public/data/`. `tools/qa/` holds the page sweep and animation checks.

Adding a page: create it in `src/pages/`, import what it needs, export the component, add its route in
`src/app/SiteApp.jsx` and add `import './pages/YourPage.jsx';` to `src/main.jsx` if nothing imports it yet.

## Core rewrite (done)
The original core was delivered compiled only. It was rewritten as React source in three stages, without any visible
change: design, animation and text are the same, and every stage was checked page by page against the live build.
1. React, ReactDOM and React Router from npm; header, footer and router as source.
2. The home page, 36 pages, site data, blog posts, case-study trackers, maps, icons and the shared parts as source;
   jsPDF, html2canvas, DOMPurify and canvg from npm (every PDF the site makes is byte for byte the same).
3. The rest of the core as source, every file turned into a normal ES module with imports and exports, `core/`, the
   shared-scope file list and the old `vite/fr-app.js` plugin removed, readable names for everything the compiler had
   shortened, and about 22,000 lines of code that nothing used any more removed (the built site did not change).

Rewrite tools and checks: `frontend/tools/rewrite/README.md`.

## Requirements
Node 24 LTS (tested with 24.22.2). Docker 24 or newer with Compose v2 for the containers.
