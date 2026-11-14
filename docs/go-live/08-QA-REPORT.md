# Go-live QA report (build 82.6)

## Build 78 (9 November 2026): super admin with full control

| Check | Result |
|---|---|
| Every prerendered page (997 HTML files) compared with build 77, with no admin changes saved | **995 identical**; the home page differs only in its list of script files to preload, and Our journey only in its live day counter |
| Main stylesheet | **byte-identical** to build 77 (new styles load only in the panel, or on a page that uses them) |
| Backend tests | **23 of 23 pass** (10 new: emails, automations, newsletters, unsubscribe, social, AI, SampCrew, extra form fields). Run here on a stand-in database, because MongoDB itself could not run on this test machine; run `npm test` once on the server with MongoDB |
| Every admin section, against the backend and in the demo file | opens with **0 page errors**; Blog posts lists all **73** posts |
| On the site (browser): a new page with every section type, its header and footer links, a new section on About us, hidden and restyled sections, a blog card design, an added field on the Let's talk form (step 3), a new product page and menu entry, a policy date change | all shown as set, light and dark, desktop and phone, no sideways scrolling; the form posts its extra field and Leads shows it; the 404 page still works |
| Email, AI, social posting, SampCrew | tested against stand-ins only: they need Frequent Research's own accounts (`12-MARKETING-AND-KEYS.md`). Send one test email, one AI draft, one test post per platform and one test application after adding the keys |

## Build 77 (8 November 2026): final checks before launch

| Check | Result |
|---|---|
| Every page (995) opened at desktop size and compared with build 73 (visible text, title, page errors, broken images, missing files) | **993 identical**; 2 expected differences: the home page (opens with its ready-made first screen until the mouse moves) and a rotating question on About Us |
| Page errors | **0** (the only console messages come from the Google tag, which our test server cannot reach) |
| Backend tests (`backend/`, `npm test`, with MongoDB) | **13 of 13 pass** |
| Google tag GTM-TDDKS62 | first in `<head>` on all **997** HTML files, **once** each |
| Home first screen, phone and desktop, light and dark | appears at once; first touch / mouse movement starts the full site, which looks the same; a tapped button (menu) opens on the real page |
| Old shared links (`/#/careers`) | open the right page (fixed in build 77) |
| PageSpeed (Lighthouse 13.6, home page) | see `11-PAGESPEED.md` |

The rest of this report is the full check of build 66, still valid for everything that has not changed since.

## Build 66 (5 November 2026)

Build 66 is the move to a React + Vite frontend and an Express backend in two Node 24 containers. It was tested
the way it runs in production: the frontend's nginx (same image and configuration as `frontend/Dockerfile`) serving
the Vite build with all 995 search-engine pages, and passing `/api/` to the backend container, in headless Chrome.

## 1. Every page, desktop and phone
All **995 pages** were opened at **1280 px (desktop)** and **390 px (phone)**, scrolled top to bottom, and checked:

| Check | Result |
|---|---|
| JavaScript errors (page errors and console errors) | **0** |
| Failed requests or 4xx/5xx responses from the site | **0** (see note) |
| Sideways scrolling (anything wider than the screen) | **0** |
| Broken images | **0** |
| Pages without exactly one main heading (h1) | **0** |
| Search-engine pages written by the build | **995 of 995**, 0 skipped |

Note: the first run showed one 404, for `/api/celebrations` on the home page: the Express backend answers 404 when
the super admin has not uploaded a calendar. The frontend's nginx now serves the calendar shipped with the site in
that case (as build 65 did), so the request succeeds.

Page-height changes while scrolling were re-checked one page at a time: 4 pages still grow by more than 400 px (a
region panel book and blog posts whose content arrives after the first paint), the same as build 65. The first full
run flagged more because both widths ran at the same time on a shared machine, which slows the first paint.

## 2. Same look as build 65
The site uses the same design, animation, text and forms as build 65 update 26. Screenshots of the header, the open
Services and About menus, the phone menu, a scrolled page and the 404 page were compared pixel by pixel with build 65's
output: the only differences are the animated dot on the "Let's Talk" button and other running animations caught at
a different moment.

## 3. Containers
- Backend image (`node:24-alpine`, runs as the `node` user) and frontend image (Node 24 build, `nginx:1.29-alpine`)
  were built and run together on one Docker network: pages, `/api/` proxying, health checks (`/healthz` on both),
  gzip, cache headers (`/assets/` one year, pages `no-cache`), the trailing-slash 301 and the two service redirects all work.
- The search-engine page step inside the frontend image downloads Chromium and its Debian packages. The test machine
  blocks Debian's package servers, so that step was run with the same script outside Docker; on a normal server
  `docker compose up -d --build` does it inside the image.

## 4. Backend (Express)
`cd backend && npm test`: 5 tests, all pass (lead saved and exported as CSV with the formula guard and without CAPTCHA
fields; invalid email and bot trap; admin endpoints refuse requests without the token; a review with a solved
CAPTCHA is published once and the same CAPTCHA cannot be reused; celebration and gallery admin copies). Also checked
by hand: rate limits (429), bad JSON (400), unknown endpoints (404 JSON), form posts sent as text/plain.

## 5. Node.js
Frontend build and backend run on Node.js **24.22.2 (LTS)**; both Dockerfiles use `node:24` images.

## 6. What still needs a person
- `docker compose up -d --build` on your server, then one real enquiry and one real download on the live domain
  reaching your inbox or CRM (`LEAD_WEBHOOK`).
- Content sign-off items in `04-CONTENT-SIGNOFF.md`.
- Gallery photos and videos, added by your team from the super admin panel.

## 7. Core rewrite, step 2 (evening of 5 November)
Most of the compiled core is now readable React source in `frontend/src/app/` (home page, 36 pages, site data, icons,
shared parts), and jsPDF, html2canvas, DOMPurify and canvg come from npm at the same versions. Checked against the
afternoon build in headless Chrome:

| Check | Result |
|---|---|
| Visible text, page title and script errors on all 995 pages at 1280 px | Same on every page, 0 errors (the only differences were the live "time since 2017" clock on two pages) |
| The same at 390 px (phone) | Same on every page (checked again on the final build, section 8) |
| The ten kinds of PDF (consumer and B2B panel books, healthcare panel book, quality process for 3 services, service brochure, company profile, two case-study PDFs) | Byte for byte the same (creation date and file ID ignored) |

## 8. Core rewrite, final build (6 November)
The compiled core is gone: the whole site is React source in ES modules (`frontend/src/main.jsx` is the entry point).
Checked on the final build against the live build in headless Chrome:

| Check | Result |
|---|---|
| Visible text, page title, element count, script errors, broken images and missing files on all 995 pages at 1280 px | Same on every page, 0 errors, 0 broken images, 0 missing files |
| The same on all 995 pages at 390 px (phone) | Same on every page |
| The ten kinds of PDF (consumer and B2B panel books, healthcare panel book, quality process for 3 services, service brochure, company profile, case study, sector case-study pack) | Byte for byte the same (creation date and file ID ignored) |
| Pop-ups (intro, video player, Sampledge product pop-up) | Drawn on top of the page, as in build 65 |
| `npm run release` | 995 pages prerendered, sitemap, robots, chat knowledge base (1,504 answers), llms.txt, 1,001 files compressed |
| nginx container with the backend | Pages, `/healthz`, `/api/reviews`, `/api/celebrations`, 301 redirects and gzip all answer correctly; 114 key pages checked through it |
| Stylesheets and dark theme | Byte for byte the same as before the rewrite |

