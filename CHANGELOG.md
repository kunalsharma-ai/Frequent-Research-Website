# Frequent Research website: change log

## 2026-11-22 · Build 83.3: equal round floating buttons, SampConnect pop-up to Sampledge

Kunal (22 Nov). Built on 83.2. Full detail: `docs/go-live/27-BUILD-83.3.md`.

- Rate & review, WhatsApp and live chat are now three equal 64 px round icons in one straight column (same right edge,
  same gap). Their words show as a small bubble on hover. Phones keep the bottom dock. File: `frontend/src/styles/fab833.css`.
- SampConnect page: after about two screens of scrolling, the same pop-up as the other Sampledge products appears, with the
  SampConnect logo and a button to sampledge.com (once per visit).
- Footer: the SampConnect and YouTube cards (added in 83.1) are removed (Kunal, 23 Nov).

## 2026-11-22 · Build 83.2: onboarding removed, SampConnect redesigned, one video per page

Kunal (22 Nov). Built on 83.1. Full detail: `docs/go-live/26-BUILD-83.2.md`.

- New client and new vendor onboarding forms, cards and links removed from the whole website (home, Let's talk, Connect,
  footer); super admin menu entry "Onboarding links on the site" removed.
- SampConnect page redesigned: the showcase's 3D globe hero (three.js, loaded after the page) and a moving visual in every section.
- The red YouTube button and the bottom "Watch this page" section now play exactly the same video (one source).

## 2026-11-21 · Build 83.1: SampConnect product page, new footer, panel sections removed

Kunal's brief "Complete Website Redesign, Product Integration & Performance Optimization". Built on 83.
Full detail: `docs/go-live/25-BUILD-83.1.md`.

- New `/products/sampconnect` page from the SampConnect showcase (rebuilt in the site design, 30 real screens).
- SampConnect replaces "All 7 together" in the Products menu; spotlight on Products and home.
- Footer: SampConnect logo card and YouTube card. The SampConnect page video is set in the super admin (no URL in code).
- Consumers/Professionals/Teens cards, "who takes part" blocks, menu entry and home panel switcher removed (Portals kept).

## 2026-11-21 · Build 83: Consumers, Professionals and Teens as three equal panel categories

Kunal's brief "Complete Website Redesign & Team Panel Integration" ("Team" = Teen panel, confirmed). Built on 82.9.
Full detail and the list of gaps to confirm: `docs/go-live/24-BUILD-83.md`.

- Turn2Opinion and MyFrequentRewards: three equal category cards, full Teen panel guide (12 steps, required vs
  optional, if it does not complete, privacy, rewards), consent and responsibilities, quality per stage, 6-tab FAQ,
  T2O vs MFR comparison. Information only: no registration screens; links go to the existing teen pages.
- Portals page, 9 market research service pages ("who takes part"), header Portals menu and footer links.
- Wording aligned with the MINOR-2026.10 terms (guardian-managed payout "where required", privacy wording).

## 2026-11-21 · Build 82.9: logo fix, onboarding switch, speed, AI catalogs, Meta Pixel, teen panel, new portal heroes

Kunal (21 Nov). Built on build 82.8. Full detail: `docs/go-live/23-BUILD-82.9.md`.

- **Logo:** the broken leg of the silver "R" in the dark-mode logo files is restored (design, letters and colours
  unchanged, still transparent, no plate).
- **Onboarding forms switch:** super admin → Onboarding links on the site → client / vendor → show: No takes that
  form's card and footer link off the whole website.
- **Speed:** the 7 Sampledge product pages get a ready-made first screen like every other page (their shadow-root
  product hero is copied too). Phone 27 → 95–99, desktop 50 → 99.
- **AI catalogs:** `/catalog.json`, `/llms-full.txt`, AI section in `/llms.txt`, AI robots named in `/robots.txt`,
  schema.org OfferCatalog on home, All services, team pages and Products (`scripts/ai-catalog.cjs`).
- **Meta Pixel:** loader on every page right after the Google tag, PageView on every page and in-site page change,
  loads after the page; off until the ID is set with `node scripts/set-pixel.cjs <ID> dist`.
- **Google tag GTM-TDDKS62:** checked, once per page, right after `<head>`.
- **Teen panel (13–17, parent or guardian permission):** information only, linking to the existing Turn2Opinion and
  MyFrequentRewards teen pages. It is added to the panel data, the portal pages (a new Teen panel section with the 6-step process and
  safeguards, plus hero, FAQs, features and titles), a new Teen tab in "Join our research panels", the Portals page, and the
  about, reach, market research, data collection, quality and Scan & Connect pages, and to the chat assistant. No sign-up screens were built.
- **Portal heroes:** new full-width moving heroes for Turn2Opinion ("opinion engine"), MyFrequentRewards ("reward
  vault") and MyHealthOpinions ("pulse of care"), each with its own palette, type and headline animation
  (`src/design82/Portal829.jsx`).

## 2026-11-21 · Build 82.8: "Watch this page in one video" at the bottom of every page

Kunal (21 Nov): at the bottom of each page, present the page's YouTube video, persuade visitors to watch the whole
video for clarity, and ask them to like, follow, subscribe and share; a separate, attractive and different design on
every page, with animated headline, 3D graphics, HD pictures, icons, moving elements and varied colours and fonts.
Built on build 82.7. Everything above the new section (design, animations, logo, PageSpeed approach, SEO, one H1) is
unchanged; the celebration banner still stays 10 seconds.

- **New section on all 995 pages** (`src/design82/Watch828.jsx`, `watch828.css`), just above the footer: YouTube
  pill, animated headline naming the page, why-watch line and three reasons, a moving 3D object, the page's video in
  its own Page video component design (HD YouTube cover, plays in place), "Watch the full video on YouTube" and
  "Subscribe to our channel" buttons, "watch it to the end" line, and four action cards: Like, Subscribe, Follow
  (LinkedIn, Facebook, Instagram, X), Share (phone share sheet, or WhatsApp, LinkedIn, Facebook, X, e-mail, copy link).
- **Unique design per page:** 12 backdrops × 8 headline animations × 5 fonts × 6 action decks × 8 3D objects × 10
  wordings, coloured with the page's palette; no two pages share a combination (`scripts/make-watch-data.cjs` →
  `public/data/pv/`). The player inside is the page's own unique design from 82.5/82.6.
- **Video:** the Page video component's video for the page (super admin), else the page's red YouTube button video.
- **Speed:** loads 1.5 s after page load and only near the bottom; loops are transform/opacity only and pause off
  screen; reduce-motion respected; main script +0.3 KB. Left out of the search-engine copy (`prerender.cjs`).
- Docs: `docs/go-live/22-WATCH-THIS-PAGE-VIDEO.md`. GO-LIVE package: the 82.7 finished website with the new
  scripts and data (first-screen copies and search-engine pages are unchanged, so they were not rebuilt).

## 2026-11-14 · Build 82.7: SEO for an A+ SEOptimer audit

Kunal (14 Nov): the SEOptimer audit of www.frequentresearch.com gave C+ with 23 recommendations; fix every SEO item.
Built on build 82.6. Design, animations, logo, page headings and PageSpeed approach unchanged. Item-by-item table and
the hosting-team settings: `docs/go-live/21-SEO.md`.

- **One H1, real page text for robots.** The phone and desktop first-screen copies moved from the page markup into
  the script that puts them in place, so the page source has one H1. The text copy of the page stays readable to
  robots while the copy is shown (inert, out of sight), so the audit reads ~2,400 words instead of 173.
- **Robots get the full site** (Googlebot, Bingbot, inspection tool, social previews): `vite/boot.js`.
- **Head of every page** (`scripts/seo-pass.cjs`, new build step 4b): home title 60 characters (Kunal's choice;
  other titles unchanged), descriptions ≤160 (118 pages shortened, `src/app/seoText.js`, also in the app), share
  picture 1200×630 + large X card + @frequentrfs, hreflang en / x-default, Organization + WebSite structured data with
  address, phone, logo, social profiles; ProfessionalService (local business) on home, About us, Let's Talk,
  Scan & Connect, Our reach.
- **Pictures:** every picture has an alt text and its width and height (build step for the first-screen copy,
  `src/app/altText.js` in the app; decorative pictures stay hidden from screen readers). The header-logo pictures of
  the copy use files sized for 3× screens (−270 KB on the first screen); the logo artwork is untouched.
- **First-screen copy:** inline styles became classes; `?type=…` links and the WhatsApp message wait until the
  first touch; e-mail written as character codes. Social profile links in the page source (`prerender.cjs` keeps the
  labels of icon links). `favicon.ico` added.
- **Server:** the site's nginx sends http and frequentresearch.com (no www) to https://www.frequentresearch.com.
  HTTP/2, the http→https redirect at the proxy and a CDN for the 1.3 s server response are for the hosting team.
- **Off-site (not website files):** backlinks (Links grade F, spam-anchor backlinks to disavow), Facebook Pixel ID,
  Google Business Profile.

## 2026-11-14 · Build 82.6: showcase video window for every page (like the Turn2Opinion video window)

- Player (`fr-page-video.js`): new `showcase` and `showcase-rev` layouts. Words column (YouTube pill, headline with an
  italic second line, description, steps 01–03 with moving bars, big number and flags, main button, red Subscribe
  button) beside the video in a frame (17 frames) with a live card (15 kinds) and moving icons. The video plays inside
  the frame. Phones: video first, then words and full-width buttons; same animation. Reduced motion respected.
- Generator (`pageTemplates.js`): every one of the 995 pages gets a unique frame + live card + scene, an italic line,
  chips, a button link (portal pages link to Turn2Opinion, MyHealthOpinions, MyFrequentRewards), WCAG-checked accent.
- Admin design editor: frame, live card, italic line, big words on the video screen, small tags, button words and
  link, Subscribe on/off. Filters by frame and live card. Old layouts still selectable.
- API: templates now include `frame`, `prop`, `em`, `screenText`, `chips`, `subscribe`, `link`; `/config` lists
  `frames` and `props`. Bad frames and unsafe links are refused (400). Fixed: `subline` edits were not saved.
- Colours: no gold, yellow or brown backgrounds on any page design (those moved to the site's navy blues; warm
  accents stay). Fixed before release: step bars, survey and search cards could be drawn wrongly with some 3D objects
  and scenes.
- Tests: 47 pass. Public website pages unchanged.

## 2026-11-13 · Build 82.5: go-live fixed ("stops after llms.txt"), Page video component with a design per page

Built on build 82.4. The public website pages are unchanged (same look, speed, SEO, one H1, Google tag first in head).

Kunal (13 Nov): a different, attractive, animated video template for every page (3D, HD pictures, icons, moving
elements, flags, colours suited to each page), in the super admin; rename "Video web component" to "Page video
component"; endpoints to connect the live site; all documents; and fix the developers' go-live, which "stops after
the llms.txt file".

- **Go-live fix.** Cause: after llms.txt (step 3) the build runs step 4, a first-screen copy of each of the 995 pages
  in headless Chromium: 60–90 minutes, silent for the first minutes, and liable to freeze in Docker's 64 MB shared
  memory. Fixes: `frontend/Dockerfile` has `FRONTEND_MODE=ready` (default: copy the finished `frontend/dist/` from
  the new GO-LIVE package into nginx, 1–2 minutes, no Node/Chromium on the server) and `FRONTEND_MODE=build` (build
  from source as before); docker-compose passes `FRONTEND_MODE` and gives the build `shm_size: 2gb`; Chromium runs
  with `--disable-dev-shm-usage`; `scripts/step.cjs` prints "step N of 6" banners; phone-shell, site-index and
  prerender print progress with minutes left; every page has a time limit (150 s / 120 s) so one page cannot stop
  the build; `vite build --logLevel warn` keeps Docker's log short. `.dockerignore` no longer drops `dist`.
- **Page video component** (renamed from Video web component; admin address `/admin/page-videos`, the old one opens
  it too; API `/api/v1/page-videos…`, `/web-videos…` still answers the same).
  - Every one of the 995 pages has its own design (backend/src/lib/pageTemplates.js,
    backend/tools/make-page-video-templates.js → src/data/page-video-templates.json): 12 layouts × 16 animated scenes
    × 10 3D objects, 75 icons, country flags, 3 movement speeds, light/dark palettes suited to the page's subject,
    words taken from the page (headline, line, key points, a number). No two pages share a design; every palette
    passes WCAG AA contrast.
  - Ready-made player `<fr-page-video>` (backend/src/public/fr-page-video.js, served at
    `/api/v1/page-videos/player.js`): plays YouTube/Vimeo/MP4/uploads in place, HD thumbnail picture, phones get the
    same animation, reduced-motion respected, `fr-video-play` event.
  - Admin: tab "Page designs (995 templates)" with live previews and filters; design editor (look, 7 colours, words,
    number, points, icons, flags, HD picture, alt text) with desktop and phone previews, Save and "Back to the generated
    design"; the page video editor shows the page's design; tab "Connect the website & API" with the two-line
    snippet, every endpoint and Try it. Default generic template is now `page` (this page's own design).
  - API: public `/page-videos` answers include `template`; new `/page-videos/templates`, `player.js`, `flags.webp`,
    `world-dots.webp`; admin `/admin/page-videos/templates` and `/templates/item` (GET/PUT/DELETE). Collection
    `page_video_templates` keeps only the fields an admin changed.
  - Tests: 47 backend tests pass (new: designs unique for ≥995 pages, player files, template edit/reset, rights,
    bad values refused, admin player copy equals the website player).
- **Documents:** new `19-PAGE-VIDEO-COMPONENT.md` (replaces 19-VIDEO-WEB-COMPONENT.md) and
  `20-DEVELOPER-GO-LIVE-STEP-BY-STEP.md`; 00, 01, 10, 14, 15, 18, README and SUPER-ADMIN-FILES updated; every
  document now says build 82.5. Admin demo HTML includes the page designs.

## 2026-11-13 · Build 82.4: video web component in the super admin

Built on build 82.3. Only the super admin and the API changed; the public website is the same.

Kunal (13 Nov): his developers are building a web component that shows videos on every page; he wants it managed in
the super admin with APIs, every page URL listed, and custom fields, so videos change without website code changes.

- New admin section Pages › **Video web component** (src/admin/WebVideos.jsx): all 995 page URLs listed; per page
  video URL, title, description, template, icon, poster, show/hide and custom fields; search, filter, Export CSV,
  Import CSV/JSON, add new page URLs; tab "Templates, icons & custom fields" (custom field types: short/long text,
  link, picture link, number, choice list, yes/no, date, colour); tab "API & integration" with endpoints, examples
  and a live "Try it".
- API (backend/src/routes/webVideos.js): public `GET /api/v1/web-videos?page=…`, `GET /api/v1/web-videos`,
  `GET /api/v1/web-videos/config` (CORS open, cached 60 s); admin item read/save/delete, import, export, settings,
  add pages. Rights: "Pages" area. MongoDB collections web_videos and web_video_settings.
- Developer guide: docs/go-live/19-VIDEO-WEB-COMPONENT.md; endpoints added to 15-API-REFERENCE.md and System › API.
- Tests: backend/test/webvideos.test.js (rights, bad links refused, public answer, hide, import, export, new pages).

## 2026-11-13 · Build 82.3: onboarding links, numbers, certifications, languages back, one H1, alt text

Built on build 82.2.

- **Onboarding links** (Kunal, 12 Nov): two animated cards, "Start your client onboarding" and "Register as a vendor",
  each with its steps, time, "secure" and a button that opens the form in a new tab
  (https://newclient.frequentresearch.com, https://vendors.frequentresearch.com). On home (after testimonials),
  Let's Talk, Scan & Connect and the footer. Super admin: Onboarding → "Onboarding links on the site" (content key
  `onboarding-links`, rights area company). Code: src/design82/Ob82.jsx, styles .ob82 in src/design82/x82.css.
- **Numbers band** on home: calm navy cards, thin colour line, professional line icons that draw in, white numbers
  (HomePage.jsx StatsBand, .n83 in x82.css).
- **Certifications**: the badge orbit turns faster and the badges float (Ca82.jsx). The sliding logo strip under it
  was removed on request.
- **Leadership messages**: kept exactly as build 82.2 (the three-card design Kunal chose). All 82.3 trial designs
  were removed. The cards now also turn on phones (only "reduce motion" stops them).
- **Language button back in the header** (Kunal, 12 Nov): the build-66 clean-up had cut the switcher out of
  I18n.jsx, LangSound.jsx and Fx65.jsx. Restored in full: 130+ languages, search, sounds and the switch effect. On
  phones it is a round globe button so the menu button always fits (checked at 320 px wide).
- **One H1 per page**: the 4 platform pages and all 67 service pages had a second, hidden H1 from the older hero
  under the new moving hero. That old title is now a plain block there (src/app/shared/HeroH1.jsx); checked 75 pages.
- **Alt text**: every <img> has an alt attribute (photos and logos described, decorative pictures empty on purpose).
  Full list per page: frequent-research-alt-text-build82.3.csv.
- **Sampledge product sites accessibility**: split headings now read as whole sentences to screen readers
  (SampCode, SampTrek, SampAudience), comparison marks and counters labelled properly (SampBidx, Talk2Tax), the SampTrek
  screen wall no longer repeats each caption twice, and the SampAudience address bar text is easier to read.
- **Super admin** (Kunal, 13 Nov: "put these things into super admin as well"): three new sections in Website content:
  Leadership messages (key `leadership`), Home page numbers (`home-stats`) and Hero texts of the home and platform
  pages (`design79`, which had no screen before). Team already lists all 21 people. Test added (backend 43 pass).
  Go-live guide for the admin: docs/go-live/18-SUPER-ADMIN-GO-LIVE.md.
- Error sweep: desktop and phone crawl of all service, product and main pages: no script errors, no broken images,
  no sideways scrolling.

## 2026-11-12 · Build 82.2: phone preview fix (no more 404), error clean-up

Built on build 82.1 (team photos, onboarding and security included unchanged).

Kunal (12 Nov): "There is 404 error when I open this website in phone. Please make sure to remove all type of error, glitches".

- Cause: an Android phone opens the downloaded one-file preview as a content:// address. The site only recognised
  file:// as "the preview", so it read the phone's file address as a page path and showed the 404 page.
- Fix: any address that is not http(s) (file://, content://, blob: …) now counts as the preview, starts on the home
  page and uses #/ links (src/app/nav.jsx, index.html, vite/fr-site.js, src/app/cms.jsx). Where the phone's address
  cannot be a base for links, a safe fallback keeps every link working (nav.jsx).
- The preview no longer asks the server API for reviews and celebrations (there is none in a file), so it shows no
  console errors (LiveReviews.jsx, Celebrate22.jsx).
- Phone check (Pixel 7 size) of 26 pages of the real site: no script errors, no broken images, no sideways
  scrolling, real pages never show 404 (only wrong addresses do, as they should).

## 2026-11-12 · Build 82.1: new Meet our Team photos

Built on build 82 (onboarding spaces and security are included unchanged).

Kunal (12 Nov): "update photos in meet our team section … each and every photo in attractive way", "remove all
previous photo and replace them with new".

- Every team photo replaced with the new navy constellation portraits (src/assets/images/team82, 480 px round
  webp with transparent corners, about 25 KB each). Used on the team cards, the hero photo wall, the featured
  video, the team map faces and every small avatar (TM_IMG in src/app/pages/GALPage.jsx).
- Leadership section (home and /our-team): Manish Arora, Sachin Gupta and Devashish Roy now use the same new
  portraits (team82/ldr-*.webp, set in src/components/site/Logos13.jsx). The old team26 cut-out is no longer used.
- Team cards: the portrait sits centred in the card with a slow light ring orbiting it (transform only, stops for
  reduced motion; src/design81/hx81.css). Featured video: the play button moved below the face.
- New: Priyanshu, Web DevOps Engineer Intern (Technology & AI); Mayank Rathore, Bidding & Vendor Manager
  (Sales & Bidding, mayank.rathore@frequentresearch.com).
- Om Prakash Tiwari stays, with his new photo (sent later the same day).
- Priyanshu's LinkedIn: https://www.linkedin.com/in/priyanshu-5a0586255/. The team is now 21 people.
- Samiksha Arora's title is now Bidding Head.
- If photos were ever changed in the super admin (Team photos), those saved photos still win over the new ones:
  clear them there after go-live.

## 2026-11-12 · Build 82: client and vendor onboarding in the super admin, security

Built on build 81.2 (its logo, panels fix and files are included unchanged).

Kunal (12 Nov): "create new spaces for new client onboarding and new vendor onboarding forms where I can manipulate
their all information … edit, add, remove, modify fields … complete integration with super admin of my both forms".

- Two new super admin spaces under **Onboarding**: *Client onboarding* and *Vendor onboarding*
  (src/admin/Onboarding.jsx, styles in src/styles/admin82.css, loaded only inside /admin).
  - Submissions: every record with search, filters (status, POC, country, expiring), KPIs, CSV export of every field,
    and "+ Add" for a record typed by hand.
  - Record view: every single field the person filled in (company, addresses, tax, bank, contacts, references, POC,
    services, commercial terms, signature, consent), all editable; add or remove any detail; status, owner, tags;
    MSAs & agreements with start/expiry dates; documents (view, download, rename, delete, upload); notes; full history
    of who changed what.
  - Renewals: agreements expiring soon, overdue ones, and renewal submissions linked to the original.
  - Form fields: change both forms without code: show/hide and required/optional per field, labels, placeholders,
    help text, dropdown options, step titles, a notice at the top, the POC list, extra fields of your own on any step
    and the list of documents. A few key fields (legal name, country, signatory, POC) are locked on.
  - Connect the portal: the two values to paste into each portal.
- Backend: routes/onboarding.js and lib/onboardingFields.js; collections `onboarding` and `onboarding_forms`; files in
  GridFS (private). Signed intake POST /api/v1/integrations/onboarding/:kind (HMAC, same scheme as SampBidx), public
  GET /api/v1/onboarding/form/:kind. New key ONBOARDING_SECRET in Connections & keys. New rights module "onboarding"
  (view, create, edit, delete, export, configure); deleting a record asks for the MFA code again.
- Portals (client and vendor onboarding, shipped next to this build): each submission also goes to the website, with
  retries; the portals read the form set-up from the website. SampBidx forwarding is unchanged.
- Docs: go-live/16-ONBOARDING-PORTALS.md and 17-SECURITY.md (new), 13 and 15 updated. Design, animations and logo files are unchanged.
- Security (Kunal 12 Nov: "high level of security so that no one could hack the database and this site"):
  - Tax and bank numbers and every onboarding document are encrypted in MongoDB (lib/vault.js, AES-256-GCM, key
    DATA_KEY); exact search by GSTIN / PAN / tax ID / account number / IBAN through a keyed hash (sum.ids).
    `npm run admin -- reseal-onboarding` encrypts older records or moves to a new key (DATA_KEY_OLD).
  - MongoDB on an internal Docker network, API signs in as `frapp` (readWrite on its own database only,
    mongo/init/01-app-user.js, MONGO_APP_PASSWORD); API container read-only, all capabilities dropped,
    no-new-privileges everywhere; backups to the fr-backups volume.
  - API: refuses `$…` / prototype keys in bodies, 300 requests a minute per address (admin 1,200), X-Frame-Options DENY.
  - nginx: HSTS, frame-ancestors, Permissions-Policy and COOP on every location (nginx/security-headers.conf), admin
    never framed, hidden/backup files blocked, sign-in 10 a minute, API 20 a second per address; onboarding
    deliveries up to 100 MB.
  - Portals: everything on disk encrypted with DATA_KEY, per-address limits, TRUST_PROXY, stricter headers.
- Package version 82.0.0.

## 2026-11-12 · Build 81.2: logo without white inside the letters, panels list, final go-live files

Kunal (12 Nov): his original logo, unchanged and transparent, but without the white inside the letters.

- The original wordmark images had their letter holes filled with white (the bowl of each R, the inside of Q, the
  small letters of the Fieldwork line). Those holes are now transparent, so the page background shows through, in light
  and dark. Nothing else changed: same letters, colours, metal finish, emblem and animation.
  Script: frontend/tools/brand81/clear_counters.py (originals kept beside it as *.orig.webp); stills rebuilt with
  tools/brand26/make_logo26.py.
- The "— Fieldwork Solutions Private Limited —" line under the logo (footer) is drawn fresh and clean: solid navy on
  light, soft lavender on dark, transparent background, no white fill or speckles (tools/brand81/fieldwork_line.py).
- Home "Join our research panels": the Caregiver and Patient tabs show only MyHealthOpinions (Turn2Opinion and
  MyFrequentRewards removed there; Consumer and Business tabs unchanged).
- Package version 81.2.0. Final files for go-live.

## 2026-11-12 · Build 81.1: moving planet on All services, new intro

Kunal (12 Nov): "attractive hero animation in home page all services, some kind of attractive moving planet" and
"another attractive animated intro, please replace this one".

- All services slide: a moving 3D planet (src/design81/planet81.jsx): the world turns on it, a glowing atmosphere, two
  tilted rings and four moons in the team colours orbiting in real 3D (in front of and behind the planet). The still
  globe picture is gone from the home hero.
- New intro (SP22_Intro in Celebrate22.jsx, styles .i81 in hx81.css): a jump through space (warp streaks), the planet
  rises with the four teams as labelled moons, the logo lands on it, "Frequent Research" builds letter by letter with
  the four promises, and entering zooms into the site. Same rules as before: click anywhere, Enter, Space, Esc or Skip;
  opens by itself after 5 s; once per browser session; not on phones; ?intro=1 shows it.
- Package version 81.1.0.

## 2026-11-12 · Build 81: home hero, a different picture on every slide, fast and smooth

Kunal (12 Nov): home hero "still lagging, glitches, rendering, overlapping"; each slide's design "too same"; Sampledge
as a universe with every product as a planet; slides should move very fast; speed 100 on phone and desktop.

- New pictures (src/design81/hx81.jsx + hx81.css): Market Research = research lab (survey card, people, scanning lens,
  results chart, insight note); Digital Marketing = campaign going live on a phone (likes rising, leads toast, ROAS,
  growth line); IT & Development = code becoming an app (editor, browser build, deploy terminal, servers); Accounts &
  Finance = ledger desk (tax invoice, GST FILED stamp, coin stacks, donut, GSTR-3B); Sampledge = a 3D universe, the 7
  products are planets orbiting the Sampledge sun. All services keeps the globe, now a still picture with light rings
  (the live 3D globe was the main lag).
- Slides change every 4.5 s (was 7 s) and switch in about 0.3 s. Only the slide on screen is built.
- Lag removed: big blurred moving blobs, moving grid, film grain, pointer light, blur/clip-path entrances, glass
  (backdrop-filter) tabs and flowing colour text are gone from the home hero. Test machine: desktop 9–20 fps → 42–61
  fps; phone 61 fps on every slide.
- The first slide no longer builds in a second time when the page comes alive (the "rendering" flash).
- Desktop: hero tabs centred so the round video button no longer covers "All services".
- Hero background is one light linear wash in the slide's colours: four big soft radial gradients cost about 0.5 s of
  painting on a phone (home phone PageSpeed 71 → about 90 on the test machine). Desktop: the picture keeps clear of the
  round floating buttons on the right. Small contrast fix in the Market Research picture.
- Package version 81.0.0.

## 2026-11-11 · Build 80.2: every page opens with a ready-made first screen

Kunal (11 Nov, decision card): "Yes, every page incl. blogs".

- The home page's ready-made first screen (builds 75–76) now applies to every page: `scripts/phone-shell.cjs` makes a
  still copy of each page's first screen (phone and desktop) during the release, and the boot script uses it on any
  page that has one. 986 pages; the admin, 404 and the 9 Sampledge product site pages start as before.
- Headline web fonts are preloaded on each page so the headline does not shift when they arrive.
- PageSpeed (test machine): inner pages 75–94 phone / 97–100 desktop, up from about 36–45 / 58–70. Details in
  docs/go-live/11-PAGESPEED.md. Package version 80.2.0. Release takes about 1 hour longer.

## 2026-11-11 · Build 80.1: no more lag on service, platform and product pages; Sampledge fixes

Kunal (11 Nov): "lot of empty spaces in sam code, samtrek and other products … website is lagging too much … I want
100 percent scoring in desktop and mobile".

- **Lag on every service, platform and All services page**: the build 79 moving background behind the hero (big blurred
  blobs, aurora, beams, rings, grid, dots) was still running under the new scenes and kept the browser repainting the
  whole hero non-stop. It is gone (only a still colour wash stays). Busy time in the first 12 seconds: 9 s → 0.6 s;
  Lighthouse blocking time on CATI (desktop) 17 s → 0.3 s.
- **Sampledge product pages**: their 3D / canvas hero pictures drew 60 frames a second from the first moment; without
  a graphics chip each frame took 100 ms or more. They now draw their first frames at once and start moving on the
  visitor's first mouse move, touch, key or wheel (`products/_shell/pzRaf.js`), the same rule as the home page.
  Blocking time on SampCode (phone) 51 s → 3.6 s.
- **SampBidx (phone)**: the "NEW · The bid desk" badge sat under the site header; the typed headline changed from one
  line to two and pushed the page up and down. Both fixed (the line keeps the height of its longest phrase).
- **SampCrew**: the "one living system" scroll story had about two screens with no words; the headlines now overlap
  the animation and the story is shorter.
- Checked every screen of the 7 product pages on phone and desktop for empty space; the remaining tall parts are
  scroll stories that fill the screen as you scroll.
- **Accessibility**: tab lists on the platform pages and several others (Digital Marketing, IT, MK, Service quality,
  SampAudience tour) now have correct roles.
- PageSpeed after these fixes (local test machine): home 90 phone / 97 desktop; service pages 38 phone / 67 desktop;
  the remaining gap on inner pages is the time until the headline appears on a slow phone (the site's script rebuilds
  the page). Package version 80.1.0.

## 2026-11-11 · Build 80: brand-new story heroes on all 67 services, new platform and Sampledge slides

Kunal (11 Nov): completely new, attention-grabbing hero animations for all 67 service pages, each telling its service's
story, with every previous hero animation removed; attractive moving slides for Market Research, Digital Marketing, IT &
Development, Accounts & Finance and the Sampledge products on the home page and the platform pages; no overlaps.
Samples (Consumer Panel, Social Media Marketing, GST) approved with "go ahead".

- **67 new service heroes** (`src/design80/`): each service has its own animated centre piece that plays a 12-second
  story, with live cards around it (a number that counts up, bars, rings, a checklist, tags, a speech bubble, a toast).
  Examples: CATI shows a call being dialled and answered, SEO a search result climbing to #1, Email Marketing an
  envelope flying out, Payroll a payslip printing and stamped PAID, Investment Planning coin stacks growing.
  The three approved samples are bespoke (`cine80.jsx`); the other 64 are described in `specs80.js` and built from shared
  pieces (`kit80.jsx`, `heroes80*.jsx`; styles `c80.css`, `k80*.css`).
- **Old heroes removed**: the build 79 scenes (`scenes79.jsx`, `sc79.css`, `plat79.jsx`) are no longer used or shipped.
- **Platform pictures** (`plat80.jsx`): Market Research, Digital Marketing, IT & Development and Accounts & Finance each
  show their services orbiting a glowing core that counts their headline figure, with two live cards; used on the home
  slides and on each platform page. The Sampledge slide deals the 7 product cards one after another. All services shows
  the four teams around the 67 services.
- **Phones get the same animations** as desktop, starting after the page has loaded; the picture sits under the headline.
  "Reduce motion" still stops them.
- **No overlaps**: the bottom-right corner is kept clear for the floating buttons; checked all 67 services on desktop
  (light and dark) and phone, the 4 platform pages, All services and the home slides; no console errors.
- Unchanged: titles, descriptions, one H1 per page, the Google tag first in `<head>`, the 10-second festival banner,
  Sampledge product pages, admin. Package version 80.0.0.

## 2026-11-10 · Build 79.2: a different animation for every service, new platform pictures, smoother slides

Kunal (10 Nov, 07:22–09:01): "lot of glitches … give me actual moving animation in all hero pages"; "attractive hero
animation for digital marketing, accounts & finance and IT & development"; "I want 67 totally different animation for each
web page"; "attractive animated hero page for market research as well"; "avoid overlapping"; "very attractive animation
when one slide moves to another"; "each animation should tell a story about their services".

- Glitches: animations had been paused on all phones and on the desktop home (calm mode). Now only "reduce motion" stops them.
- 67 different service animations: 37 new ones (design79/scenes79.jsx + sc79.css), so no two services share one. Each shows
  the service at work (a payslip printing for Payroll, a form filling itself for ITR, bugs being caught for QA, a rocket for
  Performance marketing …). Map in heroes79.js SCENE.
- Frames vary per page: glass panel, laptop screen or free-floating (heroes79.js FRAMES, class s79--fr-*).
- New moving pictures for the four platforms, also used by the home slides (design79/plat79.jsx, ph79.css .pa-*):
  Market Research (3D globe with flags, live survey, responses counter), Digital Marketing (3D phone with live feed),
  IT & Development (code typing while the app builds), Accounts & Finance (spinning ₹ coin, P&L that balances).
- Home slides: the change of slide now swings the old picture away in 3D, sweeps light across and reveals the new headline.
- Overlaps: checked all 67 services on desktop and phone in light and dark, and the home slides; labels moved where they met.

Still only the heroes; Sampledge product heroes unchanged. (Package version stays 79.0.0.)

## 2026-11-10 · Build 79.1: moving home slides, no empty space, every service hero different

Kunal (9 Nov, 18:16–18:26): "Please do not give me empty space along with give me moving slides for each service like all
services, market research, Digital marketing, IT & Development & Accounts & Finance and All sampledge products … fix
alignment and reduce overlapping … Each web page should looks completely different … different color grading, color
composition, color contrast, color pallets, unique design … 3D graphics, hd images, flags where needed, icons …
celebration slide should also move accordingly without overlapping the main hero home animation."

Still only the heroes; Sampledge product heroes unchanged. (Package version stays 79.0.0.)

- **Home hero: 6 moving slides** (`HomeHero79.jsx`, `h79.css`): All services, Market Research, Digital Marketing, IT &
  Development, Accounts & Finance and Sampledge products (the 7 products orbit a core). Each slide has its own headline,
  colours (background, headline gradient, buttons), picture and live card; tabs with a running bar underneath; 7 seconds
  each; pause while pointed at or focused; swipe on phones; arrow keys on the tabs. Slides start moving only after the
  festival banner has gone, so the first slide gets its full time.
- **No empty space**: the room for the festival banner is kept only while the banner is there
  (`.d79-hero:has(> .cb22-wrap)`) and closes smoothly as it leaves. The whole hero, tabs included, fits one laptop screen.
- **Every service hero different** (`SvcHero79.jsx`, `heroes79.js lookOf`, `s79.css`): each of the 67 services has its own
  colours (spread round the colour wheel) and its own mix of layout (split, flipped, wide 3D lean, HD poster with the live
  card over it, glass panel with colour band, isometric plates), background (colour clouds, aurora, light beams, pulsing
  rings, moving stripes, dot mesh), headline style (serif, outline, highlighter, light sweep, capitals with pill) and
  grading (deep, light, two-colour, noir, paper); no two pages share the same mix. 18 new pictures: phone feed, browser,
  WhatsApp chat, email, cart, lead magnet, star reviews, gears, cloud, donut, tax calendar, world map with flags, people
  panel, heartbeat, network nodes, search results, padlock scan, 3D layer stack. Market Research pages carry a strip of
  country flags; Indian tax pages carry the Indian flag (flags from the existing sprite). Floating platform icons on every
  picture. CSS and SVG only.
- `scripts/phone-shell.cjs` leaves the hidden home slides out of the fast first-screen copy when the hero keeps its height.

## 2026-11-09 · Build 79: new animated heroes (home, platforms, All services, every service)

Kunal (9 Nov): "put new animation hero pages which you created … very attractive animation with attractive hero text …
different color grading, color composition and color contrast. Please make sure to put celebration slide for 10 sec.
… Do not change anything apart from these changes", then "go further and add new heroes to every service and product
page", then "Don't change hero of products … keep the same heros for sampledge all products … keep all things like
speed, SEO".

Only the heroes changed; the rest of every page, the Sampledge Products page and the 7 product pages, and the admin are
as in 78.5.

- **Home** (`frontend/src/design79/HomeHero79.jsx`, `h79.css`): the headline builds line by line ("From one question /
  to a world / of answers."), a rotating verb, counters, a live 3D globe on desktops (a still picture first, three.js
  later, `Scene3D.js`) with the four platforms orbiting it, a turning quality seal and a pointer light. Today's festival
  banner stays 10 seconds at the top; the hero keeps room for it so it never covers the headline.
  `scripts/phone-shell.cjs` copies the new hero for the fast first screen on phones and desktops.
- **The 4 platform pages** (`PlatformHero79.jsx`, `ph79.css`): Market Research "Aurora" (teal, live poll), Digital
  Marketing "Neon Pop" (magenta and tangerine, result pop-ups), IT & Development "Terminal" (acid lime and violet, a
  typing terminal), Accounts & Finance "Gilded Ledger" (ivory/navy and gold, a ledger), each with its own 3D scene
  on desktops and a moving ticker.
- **All services and all 67 service pages** (`SvcHero79.jsx`, `heroes79.js`, `s79.css`): the service name with its own
  second line (e.g. "SEO Services / Be found first, by the right people."), what it includes, call to action and
  WhatsApp, and an animated picture made from the service itself (radar, live bars, globe with pins, orbit, call wave,
  chat bubbles, funnel, cards, typing terminal, shield, ledger, coin stacks). Each service has its own colour mix from
  its platform's family, its own grading (deep, light or two-colour) and the picture left or right. CSS and SVG only
  (no 3D library on these pages). Light and dark written by hand.
- Each page's old hero stays in the code but is hidden under the new one (`.h79-swap`, `s79.css`); the prerender leaves
  it out, so each page still has one H1. Titles, descriptions and addresses are unchanged.
- Phones and "reduce motion" get the calm version of every new hero (entrances once, nothing loops).

## 2026-11-09 · Build 78.5: every API inside the super admin

Kunal (9 Nov): "Please share me all frequent research API's", then "Please integrated all API into super admin".

- **System › API** (`frontend/src/admin/Api.jsx`): live status (API and database up, version, Node, running time,
  database answer time, memory, documents per collection, refreshed every 30 s); all 99 endpoints grouped (website,
  account and access, dashboard, content and media, leads, marketing and AI, connections), searchable, filter by method
  and "only what I may use", with what each does and the right it needs; **Try it** sends the request with the admin's
  own sign-in (rights checked by the server, authenticator code asked when needed; changes ask "Are you sure?") and
  shows status, time and the answer; **Copy as curl** (the token is never copied).
- New `GET /api/v1/admin/system` (Connections view right). Docs: `docs/go-live/15-API-REFERENCE.md` (every endpoint).
- Backend tests: 34.

## 2026-11-09 · Build 78.4: attractive admin dashboard and My account, keys in the database, developer guide

Kunal (9 Nov): "Please give me attractive dashboard … very attractive hero page animation along with attractive text
… in my accounts and other things", then "please put key from data base and also give me path for my developer
team". The public website is unchanged.

- **Dashboard** (`frontend/src/admin/Dash.jsx`): greeting hero with date, role and rotating live lines, quick actions
  by right, a 3D orbit with the animated FR logo; KPI cards with counters and sparklines (page views, enquiries,
  changes waiting, admins, job applications, open chats, reviews); traffic and leads charts (7 / 30 / 90 days, hover
  read-out); most visited pages, leads by type, referrers; "Waiting for you"; live activity feed.
- **My account:** profile banner with animated ring, security cards (authenticator, recovery codes left, sessions,
  signed-in until), "What I can do" cards, password change, recovery codes and sessions.
- **Every area its own look:** a banner at the top of every section with the area's colour family, title font, a line
  on what the section is for and its own animated scene (live bars, a browser building itself, pages fanning out,
  ripples and letters, rising sparks, orbiting faces, a circuit with running light, a shield with turning locks)
  (`frontend/src/admin/Areas.jsx`). Softer panels, table hover, sticky drawer headers.
- **Admin photos:** every admin adds their own photo in My account (made a 256 px WebP in the browser, kept with the
  account); shown in the menu, the dashboard and the admins list (`PUT/DELETE /api/v1/admin/account/photo`).
- **Colour palettes:** 10 palettes for the whole panel (Frequent Research area colours, Ocean, Aurora, Sunset, Forest,
  Royal plum, Graphite, Rose gold, Midnight neon, Saffron), chosen in My account or under Colours in the menu, with
  light / dark; saved with the account so they follow the admin (`PUT /api/v1/admin/account/prefs`).
- **Import from a file in every section** (`frontend/src/admin/Import.jsx`): Excel (.xlsx), CSV, JSON rows are matched
  to the section's fields (team, testimonials, products, blog posts, contacts …) with a preview; Word (.docx),
  Markdown, text or HTML becomes a new item (blog posts get their sections from the headings); pictures are made WebP
  and stored in the media library; PDF, video, MP3, Word, Excel, PowerPoint, CSV, TXT and ZIP files can be stored as
  downloads. Nothing goes live until Save (approvals apply).
- **Keys in the database:** Connections & keys now lets the Super Admin or IT Admin (Configure right) type each key
  after the authenticator code. Saved in MongoDB (`settings_keys`), secrets encrypted with AES-256-GCM using the new
  `KEYS_SECRET` (falls back to `REVIEW_SECRET`); a saved key wins over `.env`, Remove falls back to `.env`; works at
  once, every backend re-reads keys every 60 s; secrets are never sent back (last 4 characters only); Activity logs
  names only (`backend/src/lib/keystore.js`, `config.js` `integrationsFrom()`, `routes/integrations.js`).
- **Developer guide** `docs/go-live/14-DEVELOPER-GUIDE.md`: run, folder map with every important path, build and
  release, collections.
- Backend tests: 33 (new `test/keys.test.js`: keys, photos, palettes).

## 2026-11-09 · Build 78.3: admin access by role, page and task, and a new look for the panel

Kunal (9 Nov), the "Super Admin & website CMS management system" brief: the Super Admin gives each admin access to
their own tasks only, with the option to give access to particular fields, "without transferring all access to every
one". Then: "I'm building only admin now" (the public website stays as it is) and an attractive, animated UI for the
super admin. Details: `docs/go-live/13-ACCESS-AND-ROLES.md`.

- **Accounts:** no shared login (`ADMIN_USER` / `ADMIN_TOKEN` removed) and no sign-up. The first Super Admin is made on
  the server (`npm run admin -- create-super-admin`, closed once one exists); others are invited by email (one-time
  link, 72 h) with name, email, mobile, department, designation and role. Password (12+ characters, scrypt) and an
  authenticator app (TOTP, QR code made in the browser), 10 recovery codes. Sessions 12 h / 2 h idle, revocable;
  lockout after 5 wrong passwords; the code is asked again for admins, roles, exports, CVs (10 minutes).
  Suspend, deactivate, reactivate, sign out everywhere, reset access, sessions and activity per admin.
  `npm run admin -- recover` and `list` on the server.
- **Roles and rights:** Super Admin, Website, Content, Marketing, HR, Business, IT and Viewer, each with View / Create /
  Edit / Delete / Publish / Approve / Export / Manage / Configure per area; editable, and new roles can be added.
  **Extra access to particular items or pages** (e.g. only `/blog/*`, only the Team list). Checked on every API
  (`backend/src/lib/access.js`, `lib/auth.js`); nobody can give more than they have.
- **Approvals:** changes by admins without Publish become drafts: waiting for review → under review → approved →
  published, or sent back with a note, or archived; side-by-side view of the change; approvers emailed; nobody
  approves their own change; page changes merge with newer live changes. Rollback from the history as before.
- **Leads:** request type and assignment to a colleague (emailed), "Assigned to me"; enquiries and job applications
  shown by role; CVs only for HR and the Super Admin.
- **Media:** alt text per picture (applied on every page that uses it), Replace keeps the address, big photos are
  turned into WebP before upload. **SEO & redirects** per page (title, description, keywords, canonical, sharing
  card, schema, no-index) and redirects from old addresses.
- **Dashboard:** admins, approvals, drafts, enquiries and job applications this week, leads assigned to me, recent
  activity. **My account:** password, recovery codes, sessions, "what I can do".
- **New look for the panel:** animated Frequent Research logo, a 3D sign-in scene (moving floor, glass cubes, rings,
  light), a calm colour mood per area, animated cards and counters, light / dark / auto theme and soft sounds
  (switches under the menu). Royal blue and white stay the main colours. Only `/admin` changes.
- **Backups:** `npm run backup` (and restore) plus the mongodump schedule in doc 13. Indexes for the new collections.
- The public website looks and works the same until an admin saves an SEO setting, a redirect or alt text.

## 2026-11-09 · Build 78.2: associations and panel book countries in the super admin

Kunal (9 Nov): every Frequent Research detail in the admin, including association logos such as ESOMAR, and the panel
books of every segment and country to add, remove and change.

- **Associations (ESOMAR…)**: new admin section. ESOMAR and MSME (and any association added) with logo, link and text;
  hide, change or add. Shown with the certificates in the footer, on the home page and on the about, legal and other
  pages that carry the badges (`app/shared/Brand.jsx` ASSOCIATIONS, content key `associations`).
- **Certifications**: a certificate added in the admin now shows its own uploaded picture.
- **Panel numbers**: "+ Add a country" to the consumer, business, healthcare professionals, caregivers or patients panel
  (it starts from another country's tables, which are then edited), and "Remove this country". New countries get their
  page and PDF on the website from the next page load.
- The website is unchanged until something is changed in the admin.

## 2026-11-09 · Build 78.1: all the website's content in the super admin

Kunal (9 Nov): "put everything in super admin… each thing should be shown in super admin and we have option to
change, add and remove it." Build 78 listed the site's lists (team, blogs, downloads…) but the page texts themselves
were only reachable through "Edit on the page", which the offline demo cannot show.

- **Every page's content, section by section,** in Pages & sections: all 995 pages (every blog post, service,
  industry and country page too) and the header and footer, with every text and number (about 245,000), picture and
  link. Change, remove or put back any of them; hide, restyle or add sections as before. Works in the admin demo.
- The list is made at build time by the new `scripts/site-index.cjs` (in `npm run prerender`, after phone-shell):
  it opens each page in Chromium and writes `dist/data/site-index.json` and `dist/data/site-index/*.json`. The
  website never loads these files; changes use the same text, picture and link maps as "Edit on the page".
- **Logos** shows every logo as the website draws it now, next to the upload.
- The website itself is unchanged.

## 2026-11-09 · Build 78: super admin with full control

Kunal (9 Nov), 24 points, "Please do changes in super admin only." The public site's design and animations are
unchanged: with no admin changes saved, every page is the same as build 77 (the main stylesheet is byte-identical).
New admin features load only in the panel, or on a page only when the admin has used them there.

- **Pages & sections:** site map of every page; hide or restyle any section; add new sections from 22 types (hero,
  text, cards, numbers, steps, FAQ, video, gallery, logos, plans, quotes, team, table, download, form, newsletter,
  latest posts, own HTML…) anywhere on a page (`src/app/cmsBlocks.jsx`, `cmsBlockTypes.js`, `cms78.jsx`).
- **New pages** at any address, built from the same sections, added to any header, service or footer menu at once.
- **Header & footer menus, Logos** (header, footer, favicon, Sampledge, every portal and product), **Legal & policies**
  (privacy, cookies, data protection, company details).
- **Card designs** for blog and case study cards (7 + 5 designs, per post, or your own CSS); **Case studies** per
  industry; **Products** with new products getting their own page and menu entry; **Blog posts** now lists all 73
  existing posts.
- **Forms:** rename, hide or add fields on every form (extra fields are saved and shown in Leads), team alert
  addresses and reply template per form. **Contacts & form counts** with CSV import and export.
- **Email templates** (15, in 10 animated designs), **automations** (instant reply per form and service, team alert,
  follow-ups, welcome, monthly newsletter, your own), **newsletters** with segments and scheduling, send log.
- **Social media:** one post to Facebook, Instagram, LinkedIn, X (or any tool via webhook) now or scheduled; AI
  autopilot that plans posts and waits for approval. **AI assistant** for blogs, case studies, emails, posts, ads and
  video scripts (drafts stay hidden until published).
- **SampCrew:** careers applications are sent to the HR system with a signed CV link; stages come back by webhook.
- **Live chat** downloads (CSV or text, all or one). **Connections & keys** shows what is connected.
- Backend: `routes/marketing.js`, `social.js`, `integrations.js`, `lib/mailer.js`, `lib/mailtpl.js`, `lib/ai.js`;
  new packages `nodemailer` and `@anthropic-ai/sdk`. Email, AI, social and SampCrew need Frequent Research's own
  keys in `.env` (`docs/go-live/12-MARKETING-AND-KEYS.md`); without them nothing breaks and the panel says what is
  missing.
- **Fixes:** an admin-added list item with missing fields no longer breaks its page (`cms.jsx` fills the shape);
  the panel now loads the site's built-in lists, so existing blog posts and products show in the editors.
- Versions: frontend and backend 78.0.0.

## 2026-11-08 · Build 77: Google tag (GTM-TDDKS62)

Kunal (8 Nov): add the Google tag for container GTM-TDDKS62 to every page, right after `<head>`, one per page.

- Added exactly as given to `frontend/index.html` (first thing in `<head>`); `scripts/prerender.cjs` keeps it first in
  `<head>` of every prerendered page and the 404 page (997 pages checked: one tag each). The preview and admin demo
  files carry it too. The tag loads `async`, so it does not hold up the first paint.
- PageSpeed on this test server (where Google's servers cannot be reached): desktop performance 100, mobile 94–99,
  the same as build 76. The real cost of the tag depends on what is set up inside the GTM container; see
  `docs/go-live/11-PAGESPEED.md`.
- **Fix:** an old shared link such as `/#/careers` opened the home page's ready-made first screen (builds 75 and
  76); it now opens the page it names (`vite/boot.js`).
- Final checks: every page compared with build 73 (993 identical, 2 expected differences), backend tests 13 of 13;
  go-live guide updated (`00-START-HERE.md`, `03-PRE-LAUNCH-TESTS.md`, `08-QA-REPORT.md`).

## 2026-11-08 · Build 76: desktop PageSpeed 100 too

Kunal (8 Nov): desktop performance at 100 as well. Desktop keeps every animation and the same design.

Measured on the release: desktop 100 in every category in every run (TBT 0–50 ms); mobile 100 in every category
except performance 99–100 in most runs (one run in five dipped on this test machine).

- **Web fonts and pictures after the first paint** on the copies: the text shows at once in the fallback font; fonts
  and pictures (other than the logo) are fetched as soon as the page has loaded and been drawn.

- **Ready-made first screen on desktop too.** The home page on a computer opens with a still copy of its first screen
  (menu bar, hero, tabs, floating buttons), like phones since build 75. The full site, with every animation, starts the
  moment the mouse moves (or on a click, key press or wheel scroll) and replaces the copy, which looks the same.
- `scripts/phone-shell.cjs` now makes two copies: phone (412 px, shown up to 767 px) and desktop (1350 px, shown from
  768 px). The desktop copy waits in a `<template>` and is put in place by a small script on wider screens, so phones
  do not pay for it; the dark-theme styles of both copies are added only for dark pages.
- Lighter phone copy (half the size): the tiny product marks behind the bottom bar are left out of the copy.
- Entrance animations are written into the copy at their last frame, so words and cards show as they finish.
- The intro splash on desktop still shows for first-time visitors, as soon as the site starts.

## 2026-11-07 · Build 75: lighter first screen on phones (PageSpeed mobile)

Measured on the release (3 runs each): mobile 100 in every category, all figures green (LCP 1.0 s, TBT 50–70 ms, CLS 0.002); desktop performance 75–84, the other categories 100.

Kunal (7 Nov): a lighter first screen for phones, with a still hero and fewer effects on phones only, to reach 100 on
PageSpeed mobile. Desktop is unchanged.

- **Still hero on phones** (width up to 767 px): the hero slides no longer turn by themselves, the "We do" word stays
  on one service, and the loops in the hero picture stop once its cards have come in (`Hero63.jsx`, the existing
  "calm" mode that reduced-motion visitors already had). The play button still starts the slides.
- **No intro splash on phones** (`Celebrate22.jsx`).
- **Ready-made first screen.** The home page on a phone opens with a copy of its first screen (menu bar, still hero,
  bottom bar, video button) written into `index.html` with only the styles it needs, so it appears at once without
  waiting for the site's script. The full site starts as soon as the visitor touches, taps, types or scrolls with a
  wheel, then replaces the copy with the real page, which looks the same; a button tapped on the copy (menu, chat,
  language…) is tapped again on the real page. The copy is made at build time by `scripts/phone-shell.cjs` (part of
  `npm run release`). Not used for visitors who read the site in another language (they see it as before).
- The celebration banner appears with the full site (after the first touch) and keeps its 10 seconds.

## 2026-11-07 · Build 74: PageSpeed (Lighthouse) work

Kunal (7 Nov): 100 in every PageSpeed category on desktop and mobile, 3/3 in the new AI (Agentic Browsing) check, all
performance figures green. Measured: accessibility, best practices, SEO and AI 3/3 at 100 on desktop and mobile; desktop performance 82–85; mobile performance 44–48 (was 36). Details and what mobile 100 needs in `docs/go-live/11-PAGESPEED.md`.

- **Accessibility 100, AI check 3/3.** Hero tabs, the turning industry sphere, the language, chat, review and video
  buttons now have names that match their visible words; the leaders' dots are 24 px tap targets (same 10 px look);
  the sphere's industries are a clickable picture plus a list of real links for keyboards and screen readers; the
  hero slides use an allowed role; side cards in the leaders' carousel are no longer hidden while holding links.
- **Best practices 100.** No console errors: the backend answers "no admin calendar" with 200 instead of 404
  (`backend/src/routes/content.js`); source maps ship with the build.
- **No layout shift (CLS 0).** The celebration banner floats over the top of the hero instead of pushing it down; it
  drops in and lifts away with transform and opacity only, and is drawn together with the first screen.
- **Home page loads a quarter of the script.** Everything the home page does not need (every other page, the blog,
  case studies, maps) moved to `src/full.jsx`, loaded before the first render on any other page (so those pages start
  as before) and on the home page once the visitor touches, clicks, types or turns the mouse wheel (`src/app/full.js`).
  Home page script: 6.7 MB → 1.7 MB. Shared pieces moved into small modules (`app/shared/PanelMark.jsx`,
  `app/data/serviceBits.jsx`, `govFacts.jsx`, `mkBits.jsx`, `mapIndia.jsx`, `mapRegions.jsx`, `mapWorld.jsx`,
  `components/site/PR5Logo.jsx`, `data/samHero.jsx`, `data/dl5Secs.jsx`, `data/ab17Img.jsx`).
- **Less start-up work.** The home page adds its sections one at a time after the first screen; the first render
  runs in short slices; the stylesheet no longer blocks the first paint; the contrast checker waits until the page has
  settled and ignores parts that move; the industry sphere starts turning only when it is in view.
- **Caching.** `.htaccess` (Apache) keeps the site's files for a year and pictures/fonts for 30 days and serves the
  ready-made Brotli/gzip copies; the nginx config caches pictures and media for 30 days.

## 2026-11-07 · Build 73: new photo of Manish Arora

Kunal (7 Nov): new portrait of Manish Arora (navy blazer, office) for the CEO message and Meet our Team.

- `src/assets/images/team26/manish-ceo.webp`: the CEO message photo (leadership section on the home page and Our
  Team), square 800 px.
- `src/assets/images/team26/manish-team.webp`: the same photo cut out like the other team photos (background and chair
  removed, soft fade at the bottom) for his Meet our Team card.

## 2026-11-06 · Build 72: smoother, faster site; PDF downloads fixed; 10-second festival banner

Kunal (6 Nov): glitches, lag, overlaps and empty spaces across the site and the product pages; the celebration banner
should show for 10 seconds and leave with an attractive animation.

- **Product pages scroll smoothly.** The product sites kept 140-200 animations running (half of them off screen) and
  re-blurred large glow shapes and glass panels on every scrolled frame, which made the browser fall behind (blank,
  late-drawn areas while scrolling). Now each product block pauses its loops while it is off screen
  (`src/products/_shell/ProductSite.jsx`, pzGovernor), big glows are drawn once with a soft fade instead of a live blur,
  glass panels no longer re-blur what scrolls behind them, the full-screen grain layer and dozens of idle GPU layers
  are gone, and the SampBidx globe stops drawing while off screen. All 7 products were scanned screen by screen on
  desktop and phone: no empty screens.
- **Products overview:** a 1.6-second freeze on load is gone (the animation governor in `Perf65.jsx` asked the browser
  for every animation once per element; it now asks once per scan).
- **PDF downloads work again.** Since build 67 every brochure, quality-process and panel-book download stopped with
  "Cannot read properties of undefined (reading 'call')" (the super admin's replaced-PDF rule broke jsPDF's save).
  Fixed in `app/cms.jsx` (cmsPdfPatch) and tested end to end. jsPDF (450 KB) now loads only when a visitor downloads
  (`app/pdf.js`), so every page loads less script.
- **Celebration banner:** shows for 10 seconds on every visit, with a countdown line along its bottom edge (it waits
  while the visitor points at it or has scrolled away), then lifts, blurs and fades out while the hero glides up. It
  opens with a smooth slide instead of pushing the home hero down in one jump, and its calendar starts loading as soon
  as the site's script runs.

## 2026-11-06 · Build 71: a unique video design for every page and every service

Kunal (6 Nov): every web page and every service has its own video, so each needs its own attractive template, like
Government research, Home and About.

- **All 67 service pages have their own design**, chosen to match the service: a live survey card for Online data
  collection, a voice wave for CATI, a search results page for SEO, an inbox for Email marketing, a shield for
  Cybersecurity, a payslip for Payroll, a tax form for ITR filing, and so on (28 new animated scenes plus the 12 page
  designs). Each service window shows its own name, short text, four highlights and the right enquiry button, in its
  service area's colours (Market research, Digital marketing, IT, Accounts & finance), with the layout and tone varied
  from page to page.
- **More pages are ready for a video:** the four service areas, Services, Products and each Sampledge product,
  Industries, Our team, Our reach, Portals, Downloads, Blog, Gallery, Contact, Insights, ESOMAR, Privacy and Reviews.
- **Super admin → Page videos** now lists about 100 pages and offers all 40 designs. Paste a link and the page uses it
  from the next page load; a service without its own video plays its service area's video, then the home video.

## 2026-11-06 · Build 70: every page plays its own video, each in its own design

Kunal (6 Nov): remove the old videos from the YouTube button; every page gets its own video, pasted in the super
admin, and each page shows its video in its own, attractive design.

- **The red YouTube button** (bottom left, every page) now opens the video of the page you are on. The old window with
  highlight films and reels is gone (the Gallery keeps its videos).
- **12 designs** (`src/components/site/PageVideo69.jsx`, `src/styles/pagevideo69.css`): Premiere night (home), Briefing
  room (Government research), Studio wall (About us), North star (Mission & vision), Film strip (Our journey), Backstage
  pass (Careers), Scanner (QR & Connect), Opinion bubbles (Turn2Opinion), Gift box (MyFrequentRewards), Heartbeat
  (MyHealthOpinions), Campaign dashboard (Digital marketing) and Spotlight. Each has its own words, highlights and
  button next to the video. The video loads from YouTube only when the visitor presses play.
- **Kunal's 11 videos are in:** Home, Government research, About us, Mission & vision (plays while that section of
  About us is on screen; the window also offers the other video of the page), Our journey, Careers, QR & Connect,
  Turn2Opinion, MyFrequentRewards, MyHealthOpinions and Digital marketing (also its service pages).
- **Super admin → Page videos** (`src/admin/PageVideos.jsx`): paste a YouTube link per page (any YouTube link form,
  Shorts too, a start time is kept), choose the design, edit the texts, add a page by its address. 26 pages are listed
  ready for a video. A page without a video of its own plays its parent page's video, then the home video. Stored as
  the public content key `page-videos` (backend `src/routes/content.js`).

## 2026-11-06 · Build 69: product pages fixed (empty spaces, overlaps, flicker)

Kunal (6 Nov, after build 68): glitches, empty spaces (SampCode, SampTrek and others), overlaps and lag on the product
pages. Every product page was scrolled screen by screen on desktop, tablet and phone and compared with the product
team's own site.

- **Empty spaces fixed.** The product sites' own `html`/`body` overflow rules made the product area a scroll box, which
  stopped every pinned (sticky) scroll scene: SampCode's lifecycle, SampAudience's "nine moves" and similar scenes
  stood still and left screens of empty background. The product area now never becomes a scroll box
  (`src/products/_shell/ProductSite.jsx`), so each scene plays as on the product's own site.
- **Overlap fixed.** Product background layers that are fixed to the screen (SampCrew's glow, grain and cursor light)
  painted over the questions section below the product, hiding the text. The product area now clips its own layers.
- **Flicker fixed.** The YouTube, Rate & Review, WhatsApp and chat buttons faded out every time the page scrolled; they
  now always stay fully visible (`src/components/site/Perf65.jsx`, `perf.css`).
- **Speed.** Looping animations inside a product now pause when off screen and in a hidden tab, like the rest of the
  site; the 3D scenes already stop off screen. Measured while scrolling, each product page runs as fast as the product
  team's own site.
- **Content.** SampForce's "$0 onboarding fee" figure was replaced with "12 built-in themes" (no prices on this site).
- Checked with no errors: all 7 pages at 1440, 1024 and 390 px wide, moving between products and back, the products
  page, the Products menu and the home page switcher.

## 2026-11-06 · Build 68: the seven new Sampledge products, each with its own full website page

Kunal (6 Nov): replace the existing Sampledge products with the new ones he supplied (SampCode, SampBidx, SampTrek,
SampAudience, SampForce, Talk2Tax, SampCrew), put each product's own web page into this site with all its features,
hero animation and hero text, and remove the old products everywhere.

- **Seven product pages, as built by the product teams.** `/products/<id>` (`sampcode`, `sampbidx`, `samptrek`,
  `sampaudience`, `sampforce`, `talk2tax`, `sampcrew`) now shows that product's own website: its hero animation (3D
  scenes, globes, particle fields), hero text, every section, product screenshots, live demos and lightboxes. Only the
  product site's own top bar and footer are left out, because this site's header and footer are used. Below each
  product: its questions and the rest of the family.
- **How it fits in** (`src/products/`): each product's source sits in `src/products/<id>/` unchanged apart from the
  points below, and loads only on its own page (a separate script chunk, so the rest of the site is not slower). It
  renders in a shadow root (`src/products/_shell/ProductSite.jsx`), so its styles and this site's styles never touch;
  `vite/fr-products.js` compiles it with its own JSX runtime and routes its stylesheets into that shadow root. In-page
  links (`#features`) scroll below this site's header; "Book a demo" opens this site's demo form
  (`/lets-talk?type=demo&product=<name>`).
- **Changes inside the product pages:** old product names in their text now read SampCode, SampBidx, SampTrek and
  SampAudience ("formerly …" notes removed); SampForce's pricing section and competitor price chart are not shown (no
  prices on this site); Talk2Tax's empty demo, e-mail and Sampledge links are filled in.
- **Everywhere else:** product data (`src/data/Sampledge65.jsx`, `SampledgeDetails65.jsx`), the Products menu, the home
  page product switcher, the products page, footer list, hero slide, Our journey, chat answers, search and the
  `llms.txt` summary all describe the new products. The logos are the products' own animated logos
  (`npm run logos` rebuilds `src/data/SampledgeLogos65.jsx` from `src/products/<id>/assets/brand`).
- **Old addresses keep working:** `/products/zapx`, `bidzo`, `projexa`, `sampleon`, `dealflow` and `crew` open the
  product that replaced them (and redirect permanently on the server, `src/config/redirects.json`).
- **Offline preview:** `npm run preview-file` builds one-file script output (`dist-single/`) for the double-click preview,
  which cannot load separate script chunks; `npm run admin-demo` uses it.
- New packages: `framer-motion`, `three`, the product fonts (`@fontsource…`) and `lucide-legacy` (the icon set version
  four of the product sites were built with).

## 2026-11-06 · Build 67: form fixes, readable dark and light mode, /api/v1 with MongoDB, super admin panel

Kunal (6 Nov): fix the form glitches, the floating buttons over forms and content, dark-mode text, use browser
routing, validate forms section by section, move the backend to `/api/v1/*` with MongoDB, and build a super admin
panel that controls everything on the site without touching files. Design and animations are unchanged.

- **Forms.** The "Continue" button turned into "Send" during the click, so multi-step forms were sent (and every field
  turned red) before the visitor typed anything; fixed in all 6 multi-step forms. Validation now runs only on the
  current step: a field turns red only after Continue or Send, and errors of later steps appear only on those steps.
  In dark mode the dropdown arrow no longer fills the whole field, and labels in framed fields no longer overlap.
- **Floating buttons** (YouTube videos bottom left; Rate & Review, WhatsApp and chat bottom right) stay in full view on
  every page, as before (Kunal, 6 Nov: do not hide them). An earlier version of this build slid them to the screen edge
  over forms; that is removed.
- **Dark theme home headline:** the generated dark sheet put an old gradient text fill back on "One brief. Four
  engines. Real growth.", which drew stray strokes above the first line. Fixed in `contrast67.css`.
- **Normal page addresses** (`/services/market-research`) with React Router's browser history instead of `#/…`. Old
  `#/…` links shared before still work: they turn into the normal address on load.
- **Readable text in both themes.** Coloured buttons, chips and tabs whose gradients had a pale end get a navy veil over
  the pale part (`contrast67.css`), and a small guard (`contrastGuard.jsx`) corrects any remaining text colour that is
  too faint for what is behind it, in idle time. Pixel-checked on the pages that failed: in dark mode the labels under
  3:1 went from 36 to 1 (plus decorative watermark numbers left faint on purpose). The hand-made sheets are no longer
  fed to the generated dark stylesheet, which had been lightening the veils.
- **Backend: `/api/v1` and MongoDB.** Every endpoint is under `/api/v1/` (the old `/api/` paths answer for one more
  release with a `Deprecation` header). Leads, reviews, chats, visits, uploaded files (GridFS), every admin change with
  its history, and an audit log live in MongoDB; nothing is written to disk. New: careers applications with the CV
  (`POST /api/v1/careers`; it was missing before, so applications were lost), live chat, page-view tracking without
  cookies, and `npm run import-files` to bring build 66 data across. `docker-compose.yml` adds a `mongo:8.0` service.
  `npm test`: 13 API tests on a real MongoDB.
- **Super admin panel at `/admin`** (`frontend/src/admin/`): dashboard, visits, activity log, leads (filters, status,
  notes, CSV, CV download), live chat, reviews, edit-on-the-page for any text, picture or link, site settings
  (WhatsApp, chat, reviews, videos, celebration switches and chat texts), contact and WhatsApp, team with photos,
  testimonials, blog posts, careers, downloads, certifications, portals, Accounts & Finance prices, panel numbers,
  PDF documents, celebration calendar, gallery, files and all content with every earlier version. The site loads the
  saved changes once per visit (`/api/v1/site`) and keeps its built-in content for everything not changed. Sign in
  with a username and password (`ADMIN_USER` / `ADMIN_TOKEN`, default admin / admin as Kunal asked; a red warning
  shows until they are changed). Guide: `docs/go-live/10-SUPER-ADMIN.md`.

## 2026-11-05 · Build 66: React + Vite frontend, Express backend, Node 24 containers

Kunal: "Use Reactjs with vite to build this application, do not use tpl, keep node:24, for backend use expressjs, do not
use monorepo techniques like turbo or node workspace, you can create containers separately for frontend and backend".
Nothing visible changes: design, animation, text and forms are exactly as in build 65 update 26.

- **Two separate apps**, each with its own `package.json` and container, no root package.json, no workspaces, no Turborepo:
  - `frontend/`: React app built with **Vite 8** (`npm run dev | build | prerender | release | preview`). The old
    single-file build (`site-v43.html` + `scripts/build_v44.js` + 12 patch files) is gone: the patched core is now
    `frontend/core/`, and `vite/fr-app.js` compiles every page in `src/` with it. `tpl/` and `retired/` were unused and are removed.
    Images moved from `public/images` to `src/assets/images` and get hashed file names from Vite; the 50 large images that
    were embedded in the core are now files in `public/assets/core/`.
  - `backend/`: **Express 5** port of `server/index.js`, split into `routes/reviews.js`, `routes/leads.js` and
    `routes/content.js`. Same endpoints, same rules (CAPTCHA, honeypot, rate limits, CSV formula guard, admin token).
    Form posts in any content type are read as JSON, like before. `npm test` runs 5 API tests (node:test).
  - `frontend/Dockerfile` (node:24 build with Vite and the search-engine prerender, nginx 1.29 to serve, `/api/` proxied to
    `BACKEND_URL`), `backend/Dockerfile` (node:24-alpine, non-root, `/data` volume, health check), `docker-compose.yml`
    and `.env.example` at the root.
- **Core rewrite, step 1:** React 18.3.1, ReactDOM 18.3.1 and React Router 6.30.6 now come from npm instead of the copy
  compiled into the core (same versions, so behaviour is unchanged). The rest of the core is rewritten as React source
  in the next stages.
- **Core rewrite, step 2** (no visible change): the home page, 36 pages (Market Research services, panel sites,
  services, portals, government, blog, legal and privacy, team, careers, gallery, SEO, downloads), the site data, blog
  posts, case-study trackers, maps, flags, icons and 12 groups of shared parts moved out of the compiled core into
  readable source in `frontend/src/app/`. jsPDF, html2canvas, DOMPurify and canvg come from npm at the same versions,
  and html2canvas, DOMPurify and canvg now load only when a PDF is made. Core: 4.5 MB → 0.2 MB.
  Checked: all 995 pages show the same text as before at desktop and phone width with no script errors, and all ten
  kinds of PDF (panel books, healthcare, quality, brochure, company profile, case studies) are byte for byte the same.
- **Core rewrite, step 3, the last one** (no visible change): the rest of the compiled core (routes, chat answers,
  product, testimonial and certification data, Vite helpers) is source too, and the site is now a normal set of ES
  modules: every file imports what it uses and exports what others use, `src/main.jsx` is the entry point.
  `frontend/core/`, `src/overlay.manifest.js`, `src/main.js` and `vite/fr-app.js` are removed; `vite/fr-site.js` is the
  only plugin left. lucide-react 1.49.0 comes from npm for the industry icons. All the short names the compiler left
  (`Ii`, `Kc`, `xr`, …) have readable names (`findVertical`, `PRODUCTS`, `INDUSTRIES`, …), and the 556 checks of the form
  "is that other file loaded?" that the old shared-scope build needed are gone. About 22,000 lines that nothing used
  any more (old versions of sections replaced in later updates) are removed, along with 4 images only they used; the
  built site was the same size before and after, so none of it was reaching visitors.
- **Fix: pop-ups on top of the page.** Since step 1, the video player, the "need help?" nudge, the country picker and
  the celebration and gallery pop-ups were drawn inside the page instead of on top of it (the React DOM portal import
  was lost when ReactDOM moved to npm). They open on top again, as in build 65.
- **Fix: images inside plain code.** The ES-module step briefly turned image placeholders that sit in ordinary code
  (not in a JSX attribute) into objects, so 8 images, such as the founder photo and some logos, would not have shown.
  Fixed in `vite/fr-site.js` before any package was made; the page check now also fails a page with a broken image or a
  missing file.
  Checked against the live build in headless Chrome: all 995 pages at 1280 px and at 390 px show the same text, title
  and number of elements, with no script errors, no broken images and no missing files; all ten kinds of PDF are byte
  for byte the same; the intro, video player and product pop-ups open on top of the page; the release build
  prerenders all 995 pages, and the nginx container serves them with the API, the redirects and gzip.
- `llms.txt` no longer calls the products "Project Management Tool" / "DIY Marketplace" (the seven Sampledge products are listed).
- Go-live docs rewritten for the containers (`docs/go-live/00`, `01`, `02`, `08`).

## 2026-11-05 · Build 65 (update 26) — Go-live check, new logo, intro timer, built-in lead capture

- **Full-site check** of all 995 pages at desktop (1280 px) and phone (390 px) widths on the production server: no
  script errors, no failed requests, no sideways scrolling, no broken images, one h1 per page. Fixed what it found:
  - Blog posts: the related-articles list (72 cards) skipped rendering off screen with a guessed height of 800 px, so
    the page grew by ~9000 px while scrolling and the footer jumped away. `.section--tint` no longer uses
    content-visibility (design58.css).
  - Home industries sphere: only the front labels show text now, and the "58 industries" core stays on top, so labels
    no longer pile on each other (golive26.css).
  - Region / all-countries panel books: the combined profile's loading box keeps the room the profile needs, so the
    page below no longer jumps ~550 px when it appears.
- **New Frequent Research logo** (Kunal): the tagline ("Insights · Analytics · Growth"), "We serve the quality you
  expect" and the ISO lines are gone and the wordmark is much bigger. Menu bar = `kind="head"` (emblem + FREQUENT /
  RESEARCH), footer and large copies = `kind="full"` (adds "Fieldwork Solutions Private Limited"). New animation on
  top of the entrance: a light comet circling the globe, a breathing blue halo, the F turning once in 3D every 8 s, a
  twinkling star and a more frequent light sweep (transform/opacity only). Stills: `public/images/brand26/`
  (`tools/brand26/make_logo26.py`). PDFs keep their logo (PDF designs unchanged).
- **Connect page:** brand tabs no longer cut names off ("Frequent Res…", "Tur…"); partner tabs show the logo on top.
- **Smoothness:** the Connect scan line and the Our Team pulsing dot now animate with transform/opacity only.
- **Manish Arora's new portrait** (office with the FR logo): CEO message on the home page and Our Team (`team26/manish-ceo.webp`) and his Meet our Team card (cut out like the other team photos, `team26/manish-team.webp`).
- **Sampledge logos animate everywhere** (menus, hero, home switcher, footer, Products page, Our Journey, About): the old still copies now move too; they pause off screen. The Products page is the heaviest page because of this.
- **Gallery hero:** the previous hero animation is back (family under festival lights, twinkling sky, rolling motto, hearts and petals; `gallery25hero.css`), now leading to the three new sections.
- **Intro** opens the site by itself after 5 seconds if nobody clicks, with a countdown line.
- **Server:** built-in lead capture for `/api/enquiry`, `/api/resource-download`, `/api/case-study-download` and
  `/api/download` (saved to `DATA_DIR/leads.jsonl`, optional `LEAD_WEBHOOK`, CSV export at `/api/admin/leads?format=csv`);
  reads a `.env` file at start-up.
- **Node.js 24 / 26:** tested with 24.22.2 and 26.13.0 (identical build output, all endpoints work); `engines` is now `>=24` and `.nvmrc` pins 24.
- Go-live docs updated (`docs/go-live/00-START-HERE.md`, `08-QA-REPORT.md`, backend and test lists).

## 2026-11-05 · Build 65 (update 25) — New Gallery: Festivals Celebration, Awards & Appreciation, Birthdays

- Kunal asked to redesign the whole gallery, remove every photo and video, and leave sections that the super admin fills with photo and video links.
- **Removed:** all 47 gallery photos (`public/images/gallery`) and 5 videos (`public/media/gallery`), the old albums and YouTube list (`Gallery65.jsx` and `gallery65.css` moved to `retired/`). The old About Us photo mosaic data (no longer shown) was emptied too.
- **New page** `src/pages/Gallery25.jsx` + `src/styles/gallery25.css` (`gx25-`): navy hero "Moments that make us one family" with three animated section doors (garland, lanterns and diyas; trophy and medal; cake and balloons), a sticky section bar, and three sections, each with its own colours, illustration, album chips, a photo/video grid (featured item large), "Show all", and an in-page viewer (keyboard, swipe, thumbnails; videos play on the page). Awards cards get Award / Spotlight badges with the winner's name; Birthdays get a "Happy birthday" badge and a "birthdays this month" ribbon. An empty section shows a designed "coming soon" frame.
- **Links that work:** https images, Google Drive share links (photo or video), YouTube (incl. Shorts), Vimeo, mp4/webm. Only https links are accepted.
- **Data:** `GET /api/gallery` (super admin copy) → fallback `public/data/gallery.json` (shipped empty). `PUT /api/admin/gallery` with validation (`server/index.js`). Format and the admin-panel prompt: `docs/go-live/07-GALLERY-ADMIN.md`.
- Menu text: Gallery = "Festivals, awards and birthdays."

## 2026-11-05 · Build 65 (update 24) — Celebration calendars for 2027, 2028, 2029 and 2030

- Kunal asked for the calendar for the coming years. New `public/data/celebrations-2027.json` … `-2030.json` (279–286 special days a year) beside the 2026 calendar (`celebrations-2026.json`, unchanged from his sheet).
- Made by `tools/celebrations/make_years.py`: fixed days keep their date; weekday rules (Mother's Day, Thanksgiving, Black Friday, Labor Day …) are worked out; moving festivals are calculated (Hindu festivals and sankrantis with an astronomical panchang for New Delhi in `tools/celebrations/panchang.py`, Islamic days from Umm al-Qura with the India offset, Easter and the days tied to it, Orthodox Easter, Jewish and Chinese festivals). Re-deriving 2026 matches the sheet on every moving day except Holi 2026 (eclipse year) and Bakrid 2026 (sheet one day earlier than the published 2027+ pattern). Checked against published Indian holiday lists for 2027–2030.
- One-off or unscheduled events (CES, Davos, MWC, tournaments, RBI and Fed meetings, eclipses, Earth Hour) are left out until their dates are announced.
- Every day keeps its own 2026 animation; days that now stand alone got their own icon, so no two days in a year look the same. Year labels move on (Union Budget 2027-28, FY 2027-28, Q1 FY28, Year of the Goat).
- The site now loads only the current year's file (`/api/celebrations?year=YYYY`, then `/data/celebrations-YYYY.json`) and switches to the new year's file on 1 January by itself. `server/index.js`: `GET /api/celebrations?year=` and `PUT /api/admin/celebrations?year=` keep one admin calendar per year. Docs: `docs/go-live/06-CELEBRATIONS-ADMIN.md` sections 1, 3, 4 and 5.

## 2026-11-05 · Build 65 (update 23) — Intro opening sound, click anywhere, sound switch in the menu bar

- **Opening sound:** entering the site from the intro plays a synthesised opening sound (a soft rising whoosh, a warm chord and a five-note bell cascade, about 2.5 s; Web Audio, no audio files). It replaces the welcome bell for that visit, so the two never play together. It stays silent when sound is switched off.
- **Click anywhere:** a click or tap anywhere on the intro opens the site, as do Enter, Space and Esc. The hint now reads "Tap anywhere to enter". "Skip intro" still works.
- **Sound on/off in the menu bar:** a speaker button sits before the light/dark theme button on desktop and phone (`FRS_HeadToggle` in `Floaters.jsx`, placed by `scripts/v62_patches.js` step 7). It shares the `fr-sound` setting with the footer switch; both update together (`fr-sound` window event, also across tabs).
- Checked: intro opens from a click in an empty corner with the sound playing; with sound off nothing plays; the header and footer switches stay in sync at 1440 px and 375 px; 0 routes with script errors.

## 2026-11-04 · Build 65 (update 22b) — A different animation for every one of the 311 special days

- Kunal asked for a different animation on every special day. The 23 shared motifs are now only a fallback.
- **80 hand-drawn scenes** (`src/components/site/Festivals22.jsx`, `CB22_FEST`): every festival plus Republic Day, Independence Day (India) and Tsunami Day. Examples: Dhanteras coins dropping into a kalash, Choti Diwali diyas lighting one by one, a rangoli mandala the day after Diwali, Govardhan hill lifted in the rain, Ganesha with a moving trunk, Rath Yatra chariot wheels rolling, Onam pookalam rings turning, dandiya sticks clashing for Navratri, the Durga eye and dhak drum, the arrow of Dussehra, the Karwa Chauth sieve and moon, Chhath sunrise over water, the Khanda for Guru Nanak Jayanti, Eid mosques, Easter egg opening, bunny hop, Songkran water splashes, dragon boat rowers, Eiffel tower fireworks, maple leaf, papel picado, a midnight clock for New Year's Eve.
- **231 other days each have their own subject icon** (Tabler icons, MIT, `tools/celebrations/day_icons.txt` → `src/data/Icons22.jsx`) with an orbiting accent icon, and their own mix of movement (12), backdrop (10), particles made from the day's icon (7) and colour set (8). No two days share an icon.
- Solemn days (Good Friday, Ash Wednesday, Muharram, Memorial Day, Hiroshima, Holocaust and other remembrance days) get calm movement, no bunting and a respectful message.
- New calendar fields `scene`, `icon`, `anim`, `solemn`; validated by `PUT /api/admin/celebrations`; documented in `docs/go-live/06-CELEBRATIONS-ADMIN.md` with an updated admin prompt.
- Checked: all 311 dates render with no script errors; 311 different scenes.

## 2026-11-04 · Build 65 (update 22) — Celebration banner, intro animation, celebrations admin

### Celebration banner (home hero, under the menu bar)
- New `Celebrate22.jsx` / `celebrate22.css`. A static banner (it never slides with the hero) that only exists on a special day; on any other day nothing is rendered.
- Calendar: `public/data/celebrations.json`, 311 special days made from Kunal's *Global Special Days & Festival Calendar 2026* by `tools/celebrations/make_celebrations.py` (month-theme fill days are not special days and are skipped).
- 23 animated scenes, one per motif (diya, Holi colours, tricolour flag with turning chakra, lotus, crescent and lantern, Christmas tree, lanterns, kite, bonfire, fireworks, Halloween, calm sea for ocean and tsunami days, leaf, awareness ribbon, hearts, dove, book, coins, chip, sale tag, football, survey, globe), each with its own colour grade and particles (rising embers, snow, petals, confetti, birds, bats…). Major festivals add a glowing border and swinging bunting.
- HD flags of the countries concerned, a "Worldwide" badge, up to two "Also today" chips, and × to hide it for the visit.
- Today is worked out in the calendar's timezone (Asia/Kolkata) and re-checked every minute. `?celebration-date=YYYY-MM-DD` shows any date. The offline preview is pinned to 5 November 2026 (World Tsunami Awareness Day).
- Loops animate transform and opacity only; paused when the hero is off screen; off for reduced motion. Left out of the pre-rendered SEO text.
### Intro animation
- Full-screen "evolve" intro before the site, once per visit: particles converge, the four engine arcs assemble into a ring around the round FR logo, the engines and tagline appear. Click the logo (or Enter, Esc, "Skip intro") and it zooms open into the website. Skipped for search bots and automated browsers (`?intro=1` forces it).
### Celebrations admin
- `server/index.js`: `GET /api/celebrations` (admin copy, else the shipped JSON) and `PUT /api/admin/celebrations` (Bearer ADMIN_TOKEN, validated).
- `docs/go-live/06-CELEBRATIONS-ADMIN.md`: data format, motif guide and the prompt for the super admin panel (year view, editor, live preview, copy to next year, Excel import/export, audit log).
### Checked
- 0 script errors across the main routes; banner checked on 25 dates (one per motif plus Diwali, Christmas, Holi, Republic Day and a day without an event) at 1440 and 390 px; intro open and close at both widths.

## 2026-11-02 · Build 65 (update 21) — Smoother site, round video button, new About Us, go-live pack

### Speed and glitches
- Hidden home hero slides no longer run their animations (they ticked every frame while invisible).
- The "Rate us" badge turns its text ring as one composited layer; spinning the SVG itself re-laid out the button on every frame on every page.
- Small "live" dots pulse with opacity instead of repainting box-shadows.
- Three retired About Us versions (About9, About10, About15) and the old planets slide (Hero19) are out of the build (moved to `retired/`): about 160 KB less CSS and JS on every page.
- Measured on Home with a 4x-slowed CPU: idle main-thread work 3.8 s → about 0.6–1.1 s in every 3 s, scroll long tasks 5.3 s → 2.8–4.0 s, layout shift 0.15 → 0.006. (Headless measurements vary run to run.)
### Round red video button (every page)
- Bottom left on every page (Video21.jsx / video21.css): a red YouTube button with pulse waves, a turning "WATCH ● OUR ● VIDEOS" ring and a heartbeat. It replaces the old "Watch our story" and "Videos" pills.
- Click opens "Lights. Camera. Our story.", a full-screen video cinema: stage lights and dust, a big screen that plays the chosen video in the site (youtube-nocookie, loaded only on play), a 3D shelf of highlight films and a moving strip of reels, plus Subscribe on YouTube and a link to the Gallery. Esc, × or a click outside closes it.
### About Us (rebuilt, About21.jsx / about21.css)
- Hero "holo table": a tilted 3D world map made of light with HD flag pins standing up from 20 markets, a beacon on the New Delhi head office, the four engines floating above, colour-graded night sky, kinetic headline "We turn questions into growth." and a flipping "We are researchers / marketers / engineers / accountants / one team".
- Who we are in one colourful sentence, four fact tiles and a ribbon of years (2015–2023) with a comet.
- Mission and vision as two big 3D cards with spinning emblems over HD artwork, plus five values.
- Core capabilities as "the periodic table of growth": all 67 services, numbered, with unique two-letter symbols, colour-coded by engine, filterable, each linked to its page.
- Then the question path, ISO cards, a flag river to Our reach, our universe of communities and products, and the call to action.
### Go-live pack
- `docs/go-live/` (also delivered as `build65/go-live/`): go-live steps, backend endpoints, pre-launch tests, content sign-off, SEO and first week.
### Checked
- 0 script errors across the main routes; light and dark theme; 1440 and 390 px widths.

## 2026-11-01 · Build 65 (update 20) — New "All services" home slide

- The "All services" slide is now a growth engine room (Hero20.jsx / hero20.css): your brief writes itself in the middle and fires light pulses into four live engine screens. Market Research counts responses on rising bars, Digital Marketing pops notifications and hearts, IT & Development types code and deploys ("Live"), Accounts & Finance stacks coins and ticks off its ledger. A spotlight lifts each screen in turn, and arrows climb from the brief to a glowing "Real growth" badge. The MR, DM, IT, AF and Sampledge slides are unchanged.

## 2026-11-01 · Build 65 (update 19) — New "Our reach" page, About Us rebuilt again, livelier sections

### Our reach (new page, About menu, /our-reach)
- Its own story page (Reach19.jsx / reach19.css), like Our Journey: hero with a rotating audience word ("shoppers", "doctors", "CFOs"...) over a 3D globe ringed by flags and live facts; sticky chapter rail; 01 Regions as five 3D portals; 02 Countries with region tabs, dotted atlas and a flag wall linking each panel book; 03 Sectors and industries; 04 Departments; 05 Job titles (river and explorer); call to action. Added to the About menu, footer, llms.txt and translations.
- The "Our reach" section is removed from About Us.
### About Us (rebuilt, About19.jsx / about19.css)
- Hero: a turning 3D prism of the four engine artworks with a kinetic headline "One company. Four engines. Endless answers." and engine tabs.
- Manifesto lit word by word as you scroll; mission and vision as glowing monoliths; core capabilities as an orbit of every service around each engine (list on phones); odometer numbers; a globe teaser for Our reach. The dials, split-flap board and old capability lists are gone.
### Elsewhere
- Footer: the full animated Frequent Research logo.
- Sampledge product pages: after you scroll a while the page blurs and a pop-up invites you to see the full story on sampledge.com (once per product per visit; Esc or "Keep reading here" closes it).
- Downloads, Industries & case studies: new hero with a 3D ring of case-study books and a glass bookshelf library by sector (Downloads19.jsx).
- Home "All services" slide: a warp tunnel with your brief at the core and the four engines orbiting as 3D planets (Hero19.jsx). The other four slides are unchanged.
### Checked
- 0 script errors across the main routes including /our-reach; light and dark theme; 1440 and 390 px widths.

## 2026-11-01 · Build 65 (update 18) — Faster site, "Our reach", new Industries & Case Studies

### Faster, fewer overlaps
- Less work per frame: the header logo no longer floats, small logos skip their extra sparkle layers, the huge logo mask images are attached only to the layers that use them, list highlights fade instead of repainting, and the motion helpers no longer poll every 1.5 s or on every scroll. Measured on Home at 4x CPU throttle: scrolling long tasks 17.6 s to 9.7 s; Products 20 s to 4.8 s.
- No more pop-ups covering pages: the chat greeting and the review toast no longer open by themselves (their buttons stay), and the large hero "Watch" button is hidden (the small Videos pill stays).
### About Us
- New hero: a tilted 3D orbit of country flags and the four engines circles the particle question, with floating facts (55 countries, 1,108 job titles, 4 engines, 7 products).
- New "Mission & vision" section, plus "Core capabilities": every service of all four engines, each linked to its page.
- New "Our reach" section (About18.jsx / about18.css, data in src/data/Reach18.jsx generated by tools/reach/make_reach.py from the panel workbooks): a 3D globe of all 55 flags with region tabs, a region mix bar and every country (healthcare-panel countries marked +HC, each linked to its panel book), two rivers of flags, 8 sectors with all 58 industries (linked to their case studies), the 34 departments as a periodic table, and an explorer for all 1,108 job titles (audience tabs, job families, search).
### Industries & Case Studies (redesigned)
- Hub (IN6_Hub): night hero with a 3D carousel of industries and an industry ticker; sector shelves with search and colour-coded industry cards (real case counts and market flags); a dotted world atlas (Natural Earth, public domain; tools/map18/make_map.py) with routes from India to every case-study market, pulsing markers sized by case studies, region tabs, a region dial with shares and flag lists, and a river of passport-stamp flags; the 15-point "story arc".
- Industry pages (IN6_Sector): hero with a 3D deck of the industry's case studies that deals itself, insight panels, a market map with flags and counts, ticket-style case cards with team filter.
- Case study pages (CX6_Page): new hero with tag chips, fact tiles, market flags and a live 15-point dial that follows your reading; the 15 sections and the PDF download are unchanged.
- Calm palette by sector group (replaces the per-industry rainbow hues on these pages).
### Checked
- 0 script errors across the main routes; light and dark theme; 1440 and 390 px widths.

## 2026-11-01 · Build 65 (update 17) — Every animation runs again, brand-new About Us

- Animations no longer freeze: the motion governor used to pause every loop after 9 s without scrolling; that idle freeze is removed (off-screen and hidden-tab pausing stay).
- Smooth mode (slower devices) no longer cuts every loop to one play; it only switches off backdrop blur. Logo "calm" caps (3 plays) removed; blog covers animate while on screen; Sampledge logos animate everywhere.
- Animation governor (Perf65.jsx) now watches the nearest still ancestor, so moving or scaling elements (marquees, sweeping lights, sparkles) can no longer get stuck paused.
- Portals page: the three logos in the hero orbit were collapsing to thin slivers; fixed.
- About Us redesigned from scratch as "the question company" (About17.jsx / about17.css): particle hero that morphs ?, !, FR, 55; typed client questions; split-flap "We are" board; 3D carousel of the four engines with rendered HD artwork (public/images/about17); instrument dials; question path with comet; holographic ISO cards; orbiting galaxy of panels and Sampledge products; drifting wall of questions; typed-question call to action. No people photos.

## 2026-11-01 · Build 65 (update 16) — Original menu colours, full logo, partner links, dark header

- Drop-down menus (Services, Products, Portals, About, Downloads) use the original blue palette again; the pearl overrides from update 15 are removed.
- The header shows the full animated Frequent Research logo top-left (night artwork in dark mode).
- Clicking a Turn2Opinion, MyFrequentRewards, MyHealthOpinions or Sampledge logo anywhere opens that brand's website in a new tab.
- Dark theme now turns the header, nav bar, controls and phone menu dark (navy night sky); light theme keeps the pearl header.
- Portals drop-down: logo sits above its description.

## 2026-11-01 · Build 65 (update 15) — Logo fixes, pearl header, tab sounds, new About Us
### Changed
- Turn2Opinion, MyFrequentRewards and MyHealthOpinions are back on the tinted plate from update 13 (Kunal preferred it), made calmer: softer, slower rim and a gentler glow. The free-floating stage from update 14 is gone.
- Frequent Research logo: the small full artwork was hard to read, so every place that showed it now uses a clear lockup: the animated emblem beside a live "FREQUENT / RESEARCH" wordmark (navy on light, white on dark; the footer adds "Insights · Analytics · Growth").
- Header: same effects (drifting aurora, star dots, travelling edge light, active capsule), now in a light pearl-white colour with soft blue, violet and warm glows so it stands apart from the navy site. Drop-down menus and the phone menu match. Portals drop-down shows the three plated logos with their audience.
- Sound: clicking any menu item, drop-down link, phone-menu item or page tab plays the soft "tab" sound (respects the footer sound switch; no double sound where a tab already had one).
- About Us redesigned from scratch (`src/pages/About15.jsx`, `src/styles/about15.css`, prefix `ab15-`): sunrise-graded hero "Curious minds. Clever builds. Real growth." with a rising headline, a cycling verb line and a 3D glass cube (one face per team, the animated emblem on top) inside a tilted orbit of the seven Sampledge marks, glass orbs and word bubbles, all following the pointer; a marquee of the four crafts; an "At a glance" bento (founded, turning dot globe with 55+ countries, four teams, three communities, seven products, flipping ISO coins, one contact) with count-up numbers; "Pick a craft" — the section floods with the team's colour and deals out its services, with mission and vision; a serif promise with a drawn underline; 3D flip tiles for the eleven values; spinning 3D ISO coins with each team's checks; communities and a product honeycomb; a closing band. Dark theme has its own plum-night grade. No photos of people (they stay on Our Team). Our Journey keeps the timeline and the counter.
### Checked
- 0 script errors across the main routes; light and dark theme; 1440 and 390 px widths.

## 2026-11-01 · Build 65 (update 14) — New header, free-floating animated logos
### Changed
- New header and navigation: a deep navy "night sky" bar in light and dark theme with slowly drifting aurora light (blue, violet, teal), a faint star field, a light that travels along the bottom edge, a glowing glass capsule for the active page, a warm accent for Government Research, glass theme and language buttons and a lit "Let's Talk" button. The animated Frequent Research logo is larger and floats free in the bar; it shrinks a little when the page scrolls. Drop-down menus and the phone menu use the same night sky.
- Portals drop-down (the bar Kunal flagged): no cards or white logo boxes any more. The three animated panel logos float side by side with their audience underneath, thin light dividers between them and a coloured glow on hover.
- Every logo now floats free instead of sitting on a plate or box: a soft light pool in the brand's colours, a tilted orbit with a comet, drifting sparks and a floor glow, with a gentle float. Small places (tabs, phone menu) show only the light pool.
- Logos adapt to light and dark: night versions with light lettering were made for the Frequent Research logo, Turn2Opinion and MyFrequentRewards (MyHealthOpinions is vector and recolours itself). Each logo checks the surface behind it and switches automatically, including when the theme changes.
- The animated emblem replaces the still emblem in the chat button, chat and FAQ avatars, the Let's Talk chat bar and every emblem badge (`FRK_Emblem`). The mobile menu and Portals drop-down use the animated logos. Old white logo boxes (consumer panel sources, About communities and others) were removed.
- Files: `src/styles/header14.css` (new, `hd14-`), `src/components/site/Logos13.jsx` (`FRL_Plate` is now the free stage, `frlIsDark`, `FRL_Mark`, `HD14_Sky`), `src/styles/logos13.css`, `public/images/brand13/*-dk.webp` (new night artwork), `scripts/v65_patches.js` (menu logos, header class), `scripts/overlay.config.js`, `scripts/darkcss.js`, `src/components/site/FrKit.jsx`, `Chat.jsx`, `Faq.jsx`, `src/pages/LetsTalk.jsx`.
### Checked
- 0 script errors across the main routes; light and dark theme; 1440, 820 and 390 px widths; phone menu.

## 2026-11-01 · Build 65 (update 13) — New animated logos everywhere
### Changed
- The six new animated logos (Frequent Research full logo and icon, Turn2Opinion, MyFrequentRewards, MyHealthOpinions logo and heart) replace every old logo: header, footer (logo and panel logos), home "Earn" cards and hero prism core, Portals hero orbit and panel cards, About communities and hero emblem, Our Journey, Quality (cards and data aside), Connect (brand spotlight and tabs), panel book ring core, review prompt, chat button.
- No plain white boxes: every logo sits on a "pearl" plate tinted in its brand colour (blue for Frequent Research and Turn2Opinion, warm gold for MyFrequentRewards, rose for MyHealthOpinions) with a slowly turning light rim and soft coloured glow; plates lift on hover.
- Animations play as each logo scrolls into view, pause off screen, follow the pointer with a slight 3D tilt, and settle to the still logo for people who turn motion off. Header and footer logos use a calmer loop.
- Static artwork (PDF covers, quality PDF, social/OG images, favicon) now uses the new logos; the quality PDF panel logo tiles are tinted instead of white.
- Files: `src/components/site/Logos13.jsx` (new), `src/styles/logos13.css` (new, `frl-`), `public/images/brand13/`, `public/images/brand/`, `scripts/overlay.config.js`, `scripts/v65_patches.js`, `scripts/u13_favicon.txt`, `scripts/darkcss.js`, plus the pages listed above.
### Checked
- 0 script errors across the main routes; light and dark theme; desktop and 390 px phone width.

## 2026-11-01 · Build 65 (update 12) — New "All services" home hero
### Changed
- Home hero, first slide ("All services"), redesigned from scratch because the globe version looked busy. New headline "One brief. Four engines. Real growth." (each sentence in its own colour), with the "We do ___" line still flipping through every service and Sampledge product.
- New animation, "the growth prism": a white beam ("Your brief") enters a glass 3D prism carrying the Frequent Research emblem and splits into four team beams (Market Research, Digital Marketing, IT & Development, Accounts & Finance). Light pulses run along every beam; each beam lands on its team card, which rolls through that team's services and shows its service count. The lit team moves down the stack every 3 seconds. Below: services and countries counters and the seven Sampledge marks.
- The numbered steps row was removed from this slide to keep it clean; the four team links stay.
- Files: `src/components/site/Hero63.jsx` (`HZ_All`), `src/styles/hero63.css` (`hzx-`). Loops move only transform and opacity and pause off screen. The other hero slides are unchanged.
### Checked
- 0 script errors; layout shift 0.006; desktop and 390 px phone width.

## 2026-11-01 · Build 65 (update 11) — Region and entire panel books, new panel book heroes, sounds
### Added
- Region pages and region panel books for every panel (consumers, business professionals, healthcare professionals, caregivers, patients): Asia-Pacific, Europe, Middle East & Africa, North America, South America. Address: `/downloads/<section>/region-<asia-pacific|europe|middle-east-africa|north-america|south-america>` (healthcare adds `?seg=hcp|caregivers|patients`).
- Entire panel page and entire panel book for every panel: `/downloads/<section>/all-countries`. Adds a region-by-region chapter with a 3D donut and a divider page for each region.
- Each region / entire page: a hero with a turning 3D ring of flags around the emblem, a giant region code, counters; "Market by market" bars (every bar opens that country); region donut (entire page); the combined profile with chapter tabs, every table showing percentage and whole number; the download at the bottom behind the inline form (form required, no website field).
- New region / entire PDFs (`src/components/site/PanelPdf10.jsx`, `pb10Book10`): night-sky cover with a wall of waving flags, logo and round emblem stamp, KPI tiles; at a glance (flags, key numbers, contents, region share donut); market by market; combined profile with pictograms, 3D columns, donuts and bars; one page per country graded in its flag colours with the waving flag, capital, language and currency coin; a closing page. Tinted pages, emblem watermark and footer on every page. The existing country PDFs are unchanged.
- Sounds (Web Audio, switched off by the footer sound switch): picking a country, opening a region, switching healthcare panel, buttons.
### Changed
- Consumer, business and healthcare panel book sections: new heroes ("Real people. Real voices." with a 3D planet of people; "Decision makers, within reach." with a turning 3D city and role chips; "Every voice in care, heard." with a heartbeat line, three rings and a beating cross), a "Three ways in" section (five region cards plus the entire panel card), and a searchable, sortable country grid with region chips.
- Removed: the healthcare "Three healthcare panels" cards and the "Pick a country. See its whole panel." heads with podium on the business and consumer sections.
- Healthcare country pages: switching between healthcare professionals, caregivers and patients plays a sound, sweeps a colour wash and regrades the page (teal, rose / gold, violet).
- Files: `src/pages/PanelBooks10.jsx`, `src/styles/panelbooks10.css` (`pb10-`), `src/pages/Downloads65.jsx`, `src/pages/PanelCountry65.jsx`, `src/components/site/Floaters.jsx`, `scripts/overlay.config.js`, `scripts/darkcss.js`.
### Checked
- 0 script errors on the three sections, region and entire pages and country pages; no layout shift on region pages; desktop and 390 px phone width.

## 2026-10-31 · Build 65 (update 10) — New "All services" hero, About Us redesigned again, new Products menu
### Changed
- Home hero, first slide ("All services"): new headline "Every service. Every product. One team." (each sentence in its own colour, rising in turn) and a "We do ___" line that flips through every service of all four teams and all seven Sampledge products, with the team named under it. Around the flag globe: the four teams ride a tilted 3D orbit (cards grow at the front and dim at the back, and each card rolls through its own service names), service and product names stream in towards the globe, light rays turn slowly behind it, and the Sampledge marks still circle it. Files: `src/components/site/Hero63.jsx` (`HZ_All`, `HZ_Ticker`, `HZ_Roll`), `src/styles/hero63.css` (`hza9-`).
- About Us redesigned again, no team photos. New file `src/pages/About10.jsx` / `src/styles/about10.css` (`ABX_` / `abx-`), dark and colourful throughout:
  - Hero: "We turn questions / clicks / code / numbers into growth." (the word rolls in each team's colour) over an aurora sky, beside a 3D tower of four turning rings (one ring per team carrying its service names) around a glowing core with the seven Sampledge marks in orbit. Five counters below.
  - Our story: 2015 to 2023 on a glowing spine that draws itself; each milestone card swings in, with the client question that started the team.
  - What we do: four "engine" cards with turning dials and service counts; the chosen engine fills a wall of service chips that flip in (changes on its own until you pick one). The wall keeps a fixed height so the page does not jump.
  - Built by our IT team: the seven Sampledge products are dealt out from one deck into seven equal cards (tilt and light on hover), plus the three research communities.
  - Why we exist: a mission / vision switch beside a 3D gyroscope with the four teams orbiting "You".
  - What we stand for: the eleven values on a 3D carousel that turns to the value you pick (or by itself), with what it means in every team.
  - Quality: a turning certification seal (ISO 20252, ISO 9001, ISO/IEC 27001, ESOMAR, MSME), the certificate badges and four kinds of proof.
  - Still counting: the live clock in a lit frame over a slow "2017" marquee.
  - Four doors: one per team; the doors swing open when you reach them and open wider on hover.
  - Loops move only transform and opacity and pause while their section is off screen.
- Products mega-menu: a lit Sampledge panel (the seven marks circling the Sampledge core, "Compare all products") beside seven equal product cards (mark, name, category, tagline, arrow) that rise in one after another, plus a "compare all seven" card. File: `src/components/site/Sampledge8.jsx` (`SX8_Menu`), `src/styles/sampledge8.css` (`sx9-`).
### Checked
- 0 script errors on home, About Us, Products and Services. About Us: desktop 38 fps without slowdown; phone width 31 fps at 4× CPU slowdown, layout shift 0.03.

## 2026-10-31 · Build 65 (update 9) — Corrected healthcare professional workbooks
### Fixed
- Healthcare professional data replaced with Kunal's corrected workbooks (31 October, evening): 38 countries, the same 38 as the caregiver and patient panels. Countries that are only in the consumer and business panels (for example Australia, Thailand, Chile, Kenya) are no longer listed under healthcare. Previous data kept outside the source in `removed/panel-books-before-u9`.
- Caregiver and patient workbooks re-checked: identical to the ones already loaded (38 countries each), so their pages and PDFs are unchanged. Every healthcare table shows a percentage and a whole number on the page and in the PDF.
### Changed
- About Us redesigned from scratch with no team photos (Kunal's request). New sections in `src/pages/About9.jsx` / `src/styles/about9.css`:
  - Hero: "Insight. Growth. Code. Clarity. All under one roof." with each word rising in its team colour, a turning 3D cube (one face per team plus the Frequent Research emblem) circled by the seven Sampledge product marks, and five counters (services, teams, products, markets, 2015).
  - Who we are: four client questions, each answered by the team it created, joined by a moving light.
  - What we do: every service of all four teams; bars show how many services each team has and the board fills with that team's services (changes on its own until you pick one).
  - Built by us: the seven Sampledge products and Sampledge itself as a honeycomb; hover shows what each product does; the three research communities below.
  - Kept: the ribbon of years, mission and vision, the values table, certifications, the running counter and the four doors. Removed from About Us: office photos, leadership photos, the service ticker, the team ring and the galaxy.
- Panel book PDFs: new cover for every country and panel. The flag fills the top of the page and fades into the deep flag colour, the round Frequent Research emblem sits in a ring in the flag colour, three KPI tiles (panel size, profile tables, currency) carry the flag colours, and capital, languages and region sit below. Inside pages get a soft flag-coloured header wash.

## 2026-10-31 · Build 65 (update 8, part 3) — Home page speed pass
### Speed
- The logo shimmer (it repainted the logos on every frame, all the time) now plays only when a logo is pointed at.
- The home "Data · Research · Insights" steps pulse with a composited tint instead of repainting their colours every frame; the countdown ring steps once a second instead of animating continuously; the Sampledge "live" dot pulses with a transform.
- Measured (headless, 4× CPU slowdown, home page): phone width 17 fps / slowest frames 183 ms before, 18–27 fps / 83–133 ms after; desktop width 51 fps without slowdown. At desktop width with 4× slowdown the headless test stays near 10 fps because software drawing of the large screen dominates there. 0 script errors.

## 2026-10-31 · Build 65 (update 8, part 2) — New country pages, numbers in the panel books, new Downloads hub
### New
- Country pages for all five panels (`/downloads/<consumer|business|healthcare>-panel-books/<country>`) open with a new animated hero: the country name rises letter by letter, the flag turns on a globe with orbit rings and the Frequent Research emblem, three figure chips, flag-coloured light bands and a running ticker of the largest group in each profile (percentage and whole number). The page fades in when it opens. Files: `src/pages/PanelCountry8.jsx`, `src/styles/panelcountry8.css`.
- The panel book download now sits at the bottom of each country page, with the form shown on the page (no pop-up). Every download button scrolls to it. After a download, "Start a new download" clears the form; the form is asked for every download. `FRG_Gate` gained an `inline` option.
- Panel book PDFs print the whole number beside every percentage: pictograms, 3D pies, 3D columns, skylines, bar lists, ribbons, tiles and each card's "largest group" line. The flag colours, charts and round emblem watermark stay.
- Downloads hub (`/downloads`): the six sections are now a dark bento, each tile with its own live visual (people grid, business skyline, heartbeat, quality shield, fanned brochures, industry tiles) and real counts (countries and profiled panel members). Files: `src/pages/Downloads8.jsx`, `src/styles/downloads8.css`.
### Fixed
- Dark theme: the download form's intro card is now dark with light text.
### Measured
- Scrolling at 4× CPU slowdown (1440 px): country page 21 fps (blurred moving layers replaced by gradients), Downloads hub 35 fps. 0 script errors on 10 checked pages; no sideways scroll at 390 px.

## 2026-10-31 · Build 65 (update 8, part 1) — Sampledge products shown one by one, new hero slides, correct healthcare data
### New
- Sampledge products: the Products menu, the home "Technology built for research" section and the footer now show all seven products (ZAPX, BIDZO, PROJEXA, SAMPLEON, DealFlow, Talk2Tax, CREW) equally, each with its own logo on a dark panel. "Project management tool" and "DIY" wording removed. Files: `src/components/site/Sampledge8.jsx`, `src/data/SampledgeDetails65.jsx` (product context from the Sampledge site), `src/styles/sampledge8.css`.
- Home products switcher works like the research panels switcher: seven tabs, a sound when a tab is clicked (respects the sound switch), and an animated scene for each product (ZAPX turns a questionnaire into a live survey, BIDZO scores bids, PROJEXA tracks quotas, SAMPLEON fills a sample order, DealFlow moves deals, Talk2Tax files returns, CREW runs payroll and attendance).
- Hero: a new Products slide with all seven Sampledge logos on a 3D ring around the Sampledge mark, and the All services globe now carries the seven product logos as orbiting moons. Market Research, Digital Marketing, IT & Development and Accounts & Finance slides are unchanged.
- Government research home section redesigned (`src/components/site/Gov8.jsx`, `src/styles/gov8.css`): India map with pulsing field points, a citizen-pulse card (marked illustrative), four figure tiles and eight research types that reveal their methods.
- Every panel table (consumers, business professionals, healthcare professionals, caregivers, patients) shows a percentage and a whole number on country pages.
### Fixed
- Healthcare professional data replaced with the correct workbooks (56 countries, Turkey added with its flag and facts).
- The download form no longer asks for a company website.
- `/products/sampledge` and the old marketplace link now open the right product page.

## 2026-10-31 · Build 65 (update 7) — New panel data, healthcare pages, a quality process and a brochure for every service
### New
- Panel data from the five 2026 workbook sets: consumers (55 countries), business professionals (55), healthcare professionals (55), caregivers (38) and patients (38). Converter: `tools/panel/make_panel_books_v2.py`. Business books now also show region; consumer titles such as dwelling type, luxury, electronics and content creators are placed in the right chapters.
- Healthcare country pages redesigned (`/downloads/healthcare-panel-books/<country>`): pick healthcare professionals, caregivers or patients; a vital-signs strip; one chapter per workbook part (demographics, income, professional profile, job titles and specialisations, AI departments, care recipients, conditions, treatment and access, lifestyle); the country's panel book for the chosen segment at the bottom. Countries without caregiver or patient figures say so and offer feasibility and the all-country book. The healthcare PDFs follow the same chapters in the country's flag colours.
- Quality process pages and PDFs for Digital Marketing, IT & Development and Accounts & Finance (`/downloads/quality-process/<service>`), from the supplied quality documents, in the same family as the market research quality page: philosophy cards, a stage-by-stage framework with its quality gates, searchable service standards (19 / 19 / 17), review ladder, records, security, measures, the corrective-action cycle and the commitment.
- A brochure PDF for every one of the 67 services: what is included, the challenge and our approach, how we work, the quality controls for that service, why Frequent Research, questions and related services. Every service page and service area page now ends with a "Download PDF" band (service brochure and quality process), and Downloads › All services brochures lists all 67 with search.
- The download form now also asks for the company website, and designation is required. The form is filled in again for every download.
### Fixed
- Dark theme: the generated dark stylesheet had been coming out almost empty since the Sampledge logos were added (update 6), because their inline SVG styles live inside script strings and their escaped quotes broke the CSS reader. `scripts/build_v44.js` now skips those blocks, so every page gets its dark colours again (about 15,600 colour declarations). Remaining hard-to-read text found by a page-by-page contrast check was fixed in `src/styles/dark65.css` (service cards, home pillars, blog cards, forms, Let's Talk, 404 links).

### Honesty notes
- The workbooks state that their distributions are modelled estimates, not counts of panel members. Country pages and panel book PDFs now say this.
### Measured
- Scrolling at 4× CPU slowdown (1440 px): Digital Marketing quality page 34 fps, SEO service page 35 fps, no script errors, layout shift under 0.02. No sideways scroll at 390 px on the new pages.

### Unchanged
- No dependency versions changed. Package version is 65.0.0.

## 2026-10-30 · Build 65 (update 6) — Sampledge product logos and pages, new About Us
### New
- Every Sampledge product now shows its own logo from the Sampledge website (ZAPX, BIDZO, PROJEXA, SAMPLEON, DealFlow, Talk2Tax, CREW): Products page, each product page, the Products menu (one tile per product), Our Journey and About Us. Logos are inline SVG (`src/data/SampledgeLogos65.jsx`, generated by `tools/sampledge/mklogos.py`), so they use the site fonts; the light or dark version follows the site theme.
- Product colours, taglines, workflows and questions now match the Sampledge website (logo colours replace the old ones). Product badges link to each product's own page on sampledge.com.
- Each product has its own page at `/products/<id>` with a colour-graded hero (moving 3D grid, glowing orbs, large animated logo), a 3D product stage with floating, product-specific objects, its workflow drawn its own way (ZAPX build terminal, BIDZO sealed envelopes that open, PROJEXA metro line, SAMPLEON boarding pass, DealFlow deal card moving across the board, Talk2Tax printed receipt, CREW lifecycle ring), features, "Built for", five questions and answers, and a product switcher.
- Products page: product marks orbit the Sampledge logo, a moving ribbon of all seven logos, and every product section has its own background pattern and colour grade.
- About Us (`/about-us`) redesigned from scratch (`src/pages/AboutUsX65.jsx`, `src/styles/about65x.css`): a headline whose verb turns on a 3D drum (research / market / build / balance), an isometric city with one tower per team, moving service ticker, story text that lights up while scrolling, 2015–2023 on a folded ribbon, the four teams on a 3D ring, mission and vision as two lenses, the eleven values as a periodic table, office photos, leadership, the Sampledge galaxy with the seven product logos, certifications, and four doors to the teams.
### Speed
- Small and repeated logos are shown still; large ones animate (Products page section logos animate while pointed at). The logos' SVG shimmer is paused off screen. Measured (headless, 4× CPU slowdown, scroll fps; dev build / release build): About Us 18 / 30 (update 5 release: 23); single product pages 38–40 / 20; Products page 20–25 / 18 (it now holds seven 3D stages and seven workflows; it was 42 with plain cards). Layout shift 0 on all three in the release build.
- 0 script errors on the changed pages; no page runs off the edge of a 390 px phone screen.
### Unchanged
- No dependency versions changed. Package version is 65.0.0. The old About page (`AB5_Page`) stays in the source; its content data is reused.

## 2026-10-30 · Build 65 (update 5) — Speed and smoothness pass
### Fixed
- Looping animations now pause whenever their element is off screen, element by element, and everything pauses while the tab is hidden (`Perf65.jsx`). Before, animations inside headers, heroes and `<div>` wrappers kept running and repainting all the way down the page.
- Looping animations that repainted on every frame were replaced with compositor-only versions or stopped. These were: footer brand fill (clip-path), About loop (stroke-dashoffset), panel-page flag and book shine and Government Research scan line (background-position or top), gradient headline shimmer, header nav glow, header logo sweep (now 3 passes), video-button equaliser (height) and the Products funnel stripes.
- Blog covers: off-screen covers are skipped by the browser, and on-screen covers animate while hovered.
- Market research quality page: the hero starfield moves with transforms instead of repainting.
- Layout jumps: the page body keeps a full screen while a route renders, so the footer no longer flashes up and jumps down (seen on most pages). Counting numbers keep their final width, which stops the Industries hero re-wrapping and jumping about ten times while it counted.
- Floating buttons (videos, review, WhatsApp, chat) fade out while the page scrolls and return when it stops, so they no longer sit on top of text.
- About Us mission cards say "tap to read" on touch screens.
### Measured on the release build (headless Chromium without a GPU, 4× CPU slowdown, scrolling the whole page, frames per second; a real phone or laptop with a GPU is faster, so compare before and after, not absolute values)
- Home 8 → 19, Blog 12 → 35, Market research quality 5 → 29, About Us 20 → 23, Our Journey 20 → 21. Layout shift: Industries 1.07 → 0, service pages, Let's Talk and Blog 0.22 → 0.
- 596 pages crawled: 0 script errors; on a 390 px phone screen no text runs off the edge.
### Unchanged
- No dependency versions changed. Package version is 65.0.0. No content or colours changed.

## 2026-10-30 · Build 65 (update 4) — Market research quality process (web + PDF), language and theme switch scenes
### New
- Market research quality process page `/downloads/quality-process/market-research`, one page for the whole market research service (not split by country), written from "Quality process prompt 1.docx": animated globe hero with the three panels, five quality pillars around a shield, the three panels, a 12-stage respondent journey that follows the scroll, B2B / B2C / healthcare recruitment tabs (role wheel, orbit, HCP network and patient/caregiver path), 18 validation checkpoints round a shield, an interactive 0–200 quality-score gauge (illustrative, labelled), demo participation history, before/during/after survey validation, rewards wallet demo, schematic member dashboards, demo client reporting, privacy flow and cards, improvement cycle, 25 searchable FAQs and the PDF download.
- Market research quality process PDF in the panel-book design family (13 pages: cover with globe and panel logos, numbered chapter bands, journey timeline, role wheel, 18-checkpoint diagram and table, score gauge and factor weights, charts, wallet, funnel and donut, privacy cards, improvement cycle, FAQ, closing call to action). Every illustrative or demo figure is labelled as such.
- Downloads › Quality process: the market research card opens the new page and its PDF.
- Language switch scene: picking a language fills the screen with a scene of its own — reveal shape from where the visitor clicked (ripple, curtain, diamond, wave, blinds, bloom, ink or a right-to-left sweep for RTL scripts), flag-tinted colours, floating glyphs from the language's own script, the native name in a letter cascade and a welcome line in that language, plus an air-sweep sound on top of the language's own motif. The page settles in as the scene lifts.
- Theme switch scene: dark brings a moonrise, twinkling stars and shooting stars; light brings a sunrise with rays and warm motes; both with a soft sweep sound, uncovered by the existing circular reveal (now 0.85 s).
### Unchanged
- Reduced motion: both scenes become a short fade (language) or are skipped (theme). Sounds follow the site sound switch.
- No dependency versions changed. Package version is 65.0.0.

## 2026-10-29 · Build 65 (update 3) — Country panel pages, panel book PDFs, healthcare panel, downloads form, dark theme
### New
- Every country has its own page for the consumer, business professional and healthcare panels (55 × 3 pages, e.g. `/downloads/consumer-panel-books/australia`). Each page is graded in the country's flag colours: a waving HD flag, spinning currency coin, capital / currency / languages, an "at a glance" bento, then a chapter per theme with its own chart for every profile (people pictogram, donut, 3D columns with the currency symbol, skyline for company size, ribbon, tiles, meters, podium, bars). Business pages add a sector explorer with every department and job title. The panel book download sits at the bottom of every page.
- Consumer and business sections of Downloads show a country explorer (search, region filter, sort, top-3 podium) that opens the country pages.
- Panel book PDFs redesigned: cover in the flag colours with the HD flag, "in numbers" page, chapter bands and a chart for every profile, Inter font (currency symbols such as ₹ € £ ¥ ₩ ₫ ₺ ₦ ₱ ฿ print correctly), Frequent Research round-logo watermark on every page, header flag band and footer with page numbers.
- Healthcare panel redesigned: three segments (healthcare professionals, caregivers, patients), a hub and a country page for every country. Country figures appear automatically once the data files are added (`public/data/panel-books/hc/<segment>/<country>.json`); until then each segment shows what the book covers and the all-country segment book.
- HD flags (flag-icons 7.6.0, MIT licence) in `public/data/flags-hd.json`; PDF fonts (Inter subset, SIL Open Font Licence) in `public/data/pdf-fonts.json`.
### Changed
- Every download now asks for the visitor's details again, even after an earlier download in the same visit. The form starts blank.
### Fixed
- Dark theme: low-contrast text found on the full-site sweep now uses light tinted colours.
### Unchanged
- No dependency versions changed. Package version is 65.0.0.

## 2026-10-29 · Build 65 (update 2) — Gallery videos & Diwali, QR & Connect, Careers, Downloads heroes
### New
- Gallery redesigned again: no photos in the hero, an animated "one team, one family" scene (figures arm in arm, a drawn heart, lights, rising hearts) with a rotating motto; chapters for Independence Day 2026, Awards, Diwali, Fun Day Friday and Birthdays; sticky chapter bar.
- 27 YouTube videos (Independence Day 2026, Fun Day Friday, Birthday) shown with their thumbnails and played on the site in our own viewer (youtube-nocookie embed, shorts in a vertical frame). Visitors never leave for YouTube.
- Diwali celebration: 8 group photos, 23 gift photos (two-row marquee) and 3 videos, with the camera watermark band cropped.
- QR & Connect "scan studio": a phone scanning each brand's code with orbiting channels, brand switcher, search and channel filters, "All codes" view, viewfinder QR tiles with a scan beam, sticky brand spotlight, direct lines.
- Careers redesigned: typing hero with an orbit of the six teams, bento "why", team explorer with a day-in-the-team timeline, a growth road drawn on scroll, hiring steps, life-at-FR ribbon, FAQ. Same application form.
- Downloads: every section has its own animated hero (branded PDF lifting off a fanned stack, orbiting icons, download tray) with a motto and rotating line; the hub hero has a motto line too.
### Changed
- Colours on the new pages come from the site palette (navy, royal blue, violet) with a few calm accents (warm gold, teal, rose). Downloads section colours and industry group colours no longer cycle through rainbow hues.
### Removed
- Duplicate gallery photos (award group selfie, award hampers 4 and 6, Independence Day tricolour selfie and team group).

## 2026-10-29 · Build 65 — About Us, Our Journey, Careers, Gallery, Downloads, Industries & case studies, Products, Connect, A&F, dark theme
### New
- About Us, Our Journey (with a live years-since-founding counter, also on the home page), Careers (short and clear), Gallery (event albums, no team photos) and Downloads (6 sections) redesigned.
- Industries & case studies moved under Downloads; every case study has 15 factors (industry overview to deliverables) and a downloadable PDF.
- Products page with a section per Sampledge product (ZAPX, BIDZO, PROJEXA, SAMPLEON, DealFlow, Talk2Tax, CREW) and an "All 7 Sampledge products" card in the menu. "Sampledge DIY Marketplace" renamed "SAMPLEON DIY Marketplace". Sampledge plan prices removed from this site; every pricing link goes to www.sampledge.com/pricing.
- QR & Connect redesigned (flip cards, rotating QR cube, brand dock) and Sampledge X (x.com/SampledgeX) added with a decode-verified QR code.
- Red "Watch" YouTube button on every page; panel logos and the Sampledge logo open their websites.
- Sounds on the theme button, WhatsApp, Rate & Review, Join panel and Let's Talk (Web Audio, no files, muted until the visitor interacts).
- Accounts & Finance: all 17 service pages and the hub redrawn again (4 visual worlds, rolling-digit prices, carousel/podium plans, bar/donut capability charts, process rail/wheel/tiles, coupon offers); hub stage no longer overlaps.
- Animated Sampledge logo exported as SVG, MP4, GIF, transparent WebM and PNG (`tools/logo/make_sampledge_logo.js`).
### Fixed
- Dark theme: every text audited on 40 pages; low-contrast text (forms, home, A&F buttons, reviews, case studies, portals, marketplace, team, government research) now uses tinted light colours (`src/styles/dark65.css`).
- Phones: the video-button pulse no longer causes sideways scrolling.
- Accessibility: every image has alt text; unlabeled decorative icons are hidden from screen readers and charts are labelled (`K5_A11y`). Full list in `alt-text.csv`.
### Unchanged
- No dependency versions changed. Package version is 65.0.0.

## 2026-10-27 · Build 64 — A&F motion edition, QR & Connect flip edition
### Changed
- All 17 Accounts & Finance service pages redrawn: every section animated with its own treatment and a different combination per service (odometers, rings, 3D blocks, flip cards, card decks, bar/donut charts, coverflow, bento, drawing road, staircase, payroll dial, honeycomb, marquees, coupons, coin medallions).
- Pricing rebuilt as an animated stage: counting prices, 3D flip / podium / ticket plan cards with full inclusions on the reverse, price-ladder chart, animated comparison table, suggested-plan finder.
- Entrance animations can no longer get stuck half-visible; no text overlaps found by the automated check at 1440, 768 and 390 px.
- QR & Connect: split-flap hero, scanning phone, flip-card QR codes with cascade and occasional flip-flop, flipping panel ID cards, boarding-pass direct lines.
- Hand-written dark theme for both pages; 54 interface strings in 15 languages.

## 2026-10-27 · Build 63 — A&F per-service redesign, new hero, copy protection, QR & Connect
### New
- All 17 Accounts & Finance pages rebuilt from the 17 new service briefs, each with its own concept, palette, typefaces, animated hero visual, section rhythm and a working signature tool (13-week cash runway, debt vs equity lab, NPV/IRR/payback comparator, scenario models, audit checklist, evidence explorer, workflow lab, report explorer, brief builders, document checklist) and a 3-step enquiry form.
- Home hero rebuilt: canvas globe with every country's flag in the site blues (drag to spin, arcs from Delhi HQ); a distinct palette and 3D scene per slide; strict layout so the visual never overlaps the text.
- Site-wide copy protection outside form fields.
- QR & Connect redesigned with a band per brand; Sampledge gets its own QR section (7 codes incl. WhatsApp support); Threads added for Frequent Research and Sampledge (7 new decode-verified codes); footer "Follow us" shows Threads.
- 50 interface strings in 15 languages.
### Removed
- Build-61 hero (`Hero61.jsx`, `hero61.css`) and the build-62 Connect page layout.

## 2026-10-27 · Build 62 — Accounts & Finance, light/dark theme, QR & Connect, flag globe
### New
- Accounts & Finance rebuilt from the service briefs and packages proposal: 17 services, new hub and a data-driven service page with its own palette and 3D scene per service, capability explorer, process, three INR plans with full comparison, deliverables / exclusions, launch offers, bundles and FAQs.
- Light / dark theme button before the language button; dark stylesheet generated at build time and loaded only for dark-theme visitors.
- About Us → QR & Connect: panel studio with website, YouTube, Instagram, LinkedIn, Facebook and WhatsApp-support QR codes for MyHealthOpinions, Turn2Opinion and MyFrequentRewards (18 new decode-verified codes).
- Home hero: 3D globe with the flags of 197 countries at their real positions.
- 71 interface strings in 15 languages.
### Removed
- Business Valuation and Financial Modelling services (not in the briefs or pricing); 301 redirects to Corporate Finance Advisory and Financial Planning & Advisory.

## 2026-10-15 · Build 61 — home hero rebuilt in the site's own look
### Changed
- Home hero redesigned on the site's navy/royal-blue palette with glass cards: copy left, animated visual right, service switcher at the bottom with arrows.
- New visuals: dotted-globe hub (all services), live fieldwork world map with 55 countries (market research), search/funnel/channels cockpit (digital marketing), self-building dashboard + architecture + pipeline (IT), cash-flow waterfall + compliance calendar + reconciliation (finance).
- Three-step "how we work" flow per slide; 40 new strings translated into 15 languages.
### Removed
- Build-60 hero files.

## 2026-10-15 · Build 60 — five-slide home hero
### New
- Home hero replaced by five slides: All services (helix tower of every service), Market Research (3D globe with all 55 covered countries + flag board), Digital Marketing (ripple stage), IT & Development (isometric code city), Accounts & Finance (extruded donut + compliance calendar). New headlines and mottos; new H1 naming the four services.
- Country and month names translated by the browser (Intl) in every language; 35 new strings in the 15 languages.
### Speed
- Hidden slides run no animations; fewer animation start times on the ripple scene.
### Removed
- Build-59 hero files.

## 2026-10-15 · Build 59 — four-slide service hero, language sounds
### New
- Home hero replaced by four moving slides (Market Research, Digital Marketing, IT & Development, Accounts & Finance), each with its own colour world, tagline, motto, audience lines and CSS-3D scene; tabs with progress, pause, keyboard and swipe.
- A unique sound for every language when it is picked (16 hand-designed, all others generated per language).
- 52 hero strings translated into the 15 languages.
### Fixes / speed
- Off-screen base sphere animation loop stopped (it forced every CSS animation on the home page onto the main thread); scroll smoother, less CPU.
- Motion governor no longer freezes the hero mid-animation after 9 s idle.
- All four slides' copy now in the static HTML (prerender keeps `data-pr-keep`).
### Removed
- Build-58 greeting-sphere hero (`hero58.css`, sphere/orbit code in `Hero58.jsx`; the mobile dock stays there).

## 2026-10-15 · Build 58 — 135 languages, new 3D home hero, mobile dock, faster
### New
- Language switch first in the header and in the mobile dock: ~135 languages; 15 hand-translated (zh-CN, zh-TW, es, fr, pt, de, it, ar RTL, hi, ja, ko, ru, id, tr, vi — 1,088 strings each); the rest by free instant translation (browser translator, else Google widget). `?lang=<code>` campaign links; remembers the choice; auto-suggests the browser language.
- Home hero: canvas greeting sphere, 3D orbit of the four teams, fact pills, language chips.
- Colour-graded home sections; scroll-progress line.
- Mobile bottom dock (Services · Chat · Language · WhatsApp · Let's Talk) replaces stacked floating buttons.
### Speed
- Motion governor (pauses off-screen / hidden-tab / idle loops), content-visibility for lower sections, non-blocking Google Fonts, boot splash + early dictionary fetch.
### Fixes
- Header overflow at 1440 px and with long translated labels; translated page-hero titles kept as one sentence.

## 2026-10-15 · Build 57 — review form fields, panel tabs, live chat, footer wordmark, sounds, llms.txt
### Changed
- Review form: Full name, Email, Country, Company required; phone optional with flag/name/code; consumer/professional question and preview cards removed; old test reviews cleared from browsers.
- Rates & Reviews: consumers vs professionals section and filter removed.
- Join our panels: Consumer, Professional, Health Professionals, Caregiver and Patient tabs, each with its own animation and motto.
- Live chat redesigned; "talk to a specialist" is one card with flag country picker and phone code picker.
- Products: new menu and home animations.
- Footer: animated giant wordmark; sound switch.
- Sounds: soft opening bell without a pop-up; notification sound for the Rate & Review prompt.
### New
- `llms.txt` (generated by `npm run llms`, part of `release`).
### Not done (on purpose)
- The 200 reviews in the four attached files were not published (no mention of Frequent Research, same names across files with different jobs, alternating ratings). See README.

## 2026-10-15 · Build 56 — country pickers fixed, speed, consumer/professional reviews, panels section, new sound
### Fixes
- Country and phone-code lists opened behind the download, case-study and review dialogs (could not pick with the mouse) — now above every dialog. Test updated to click with the mouse.
### Speed
- Inline images moved out of the JS bundle; JS/CSS minified (esbuild); pre-compressed .br/.gz assets; compression rules for Apache/nginx; smooth mode for slower devices; static colour blobs.
### New
- Review form asks Consumer or Professional; badges on cards; consumers vs professionals section and filter on /rates-reviews; reviews refresh every 20 s.
- Home: "Join our research panels" with Consumer / Professional worlds and panel sign-up links.
- New welcome sound.

## 2026-10-15 · Build 55 — new download/case-study form, Sampledge products, Our Journey, welcome sound
### Fixes
- Download / case-study form: scroll hint overlapped the consent text; CAPTCHA input too narrow; Privacy Policy link left the form; decorative cursor ring over text fields (native cursor inside forms and dialogs).
### Redesigned / new
- Form rebuilt as a three-step "unlock" with a personalising 3D book, per-step colour grades and a success unlock animation (all downloads + case studies).
- Products: same Sampledge icon on both products — "Sampledge — Project Management Tool" and "Sampledge — DIY Marketplace" (name change; URL unchanged). New mega-menu cards and home section.
- Our Journey page redesigned end to end.
- Welcome notification with an optional, quiet chime (plays after the first interaction where browsers block autoplay; can be muted).
### Checks
- 88-route sweep at 390/1440 px: no errors, overflow, H1 or image problems.

## 2026-10-14 · Build 54 — Rate & Review studio, per-service testimonials, Rates & Reviews page redesign
### Redesigned
- Rate & Review dialog rebuilt as a five-step studio (service portals → per-service rating instrument → per-service writing pad → live reviewer badge → spotlight publish) with a journey-path header, stamp and confetti on success. Same endpoint, fields, validation and timing.
- NEW per-service testimonial formats (`FRT_*`): response deck (Research), phone feed (Digital), terminal log (IT), receipt slips (Finance). Used in home testimonials (service lenses) and on `/rates-reviews`.
- `/rates-reviews` redesigned: 3D prism hero, sticky service dock, four distinct service chapters with their own instruments, star-split rings / share race / flags, wall, per-service CTA.
### Fixes
- Review dialog height now accounts for the overlay padding (bottom was 24 px off-screen at 1366×650).
### Not done (on purpose)
- The 40 reviews pasted in chat were not published (duplicate identities across services, product features FR does not offer, unsubstantiated figures). See README.

## 2026-10-14 · Build 53 — download forms fit every screen, Rates & Reviews page, testimonials, menu colours
### Fixes
- Download modal (and review dialog): on shorter screens the bottom of the form and the Download button were clipped and unreachable. The form now scrolls inside the modal, the Download button stays visible, and a "Scroll for more" hint is shown. Re-tested all 8 download flows at 1440×900, 1366×650 and 390×700.
### New / redesigned
- NEW page `/rates-reviews` "Our Rates & Reviews" (About menu, footer): live per-service scorecards, star split, share donut, countries, filterable wall.
- Home testimonials redesigned (spotlight + 3D review wall) with a "See all rates & reviews" button.
- Rate & Review badge moved to the right, above WhatsApp; links to the reviews page from the dialog and the thank-you screen.
- Menu: selected tab uses the Let's Talk gradient.
- Our Journey hero: new animated milestone road.
### Not done (on purpose)
- `Frequent_Research_real_Rate__Reviews.xlsx` (sheet "500 Review Examples": 62 names reused across 500 rows, 72 distinct texts) was not published. See README.

## 2026-10-14 · Build 52 — download forms, reviews redesign, WhatsApp, heroes, Let's Talk, Scan & Connect, speed
### Fixes
- Download form: icons overlapped typed text (CSS specificity) — fixed; country showed an error just for opening the list — now only after a choice or on submit; designation icon replaced; name fields no spell-check underline.
- "More documents" no longer email anything: Company brochure, Quality process and Healthcare panel book are generated as PDFs in the browser (`Pdfs.jsx` `FRP_DOCS`). Old `?file=` deep links open the same form.
- Social QR codes regenerated to match the footer links (X and Pinterest pointed at older handles).
- Industries hero no longer counts illustrative case studies as published ones.
- Re-running the build on its own output: v46 patches now recognise the build-51/52 versions of their snippets.
### Redesigns / new
- Gate modal: four-step progress rail, sections, success receipt with burst.
- Testimonials (3D carousel + score console + ribbons); Rate & Review (mood face, quick phrases, live tilting preview, new badge).
- Compact WhatsApp button above the chat (right); animated full logo plate (footer, review dialog), header logo sweep, animated "Let's Talk".
- New page heroes for every page using the shared hero; industries orbit; marketplace hero; Our Journey time tunnel.
- Let's Talk rebuilt as a "conversation studio" (same form).
- NEW `/connect` Scan & Connect page + footer QR pop-overs; NEW `tools/qr/make_qr_extra.py` (reportlab + libzbar check).
### Performance
- `perf.css` (loaded last) and `FRP_usePerf`: off-screen sections pause animations; paint-heavy animations replaced by composited ones; marketplace globe throttled to ~24 fps.
### Not done (on purpose)
- The 400 "sample review drafts" were not published (fictional-sample labels in the workbook). See README.

## 2026-10-14 · Build 51 — reviews system, chat assistant, downloads & panel books, case studies, redesigns
### Reviews
- Review form rebuilt (`ReviewPrompt.jsx`): service tick, stars, review, First name\*, Country\* (flag), Email\*,
  optional Last name / Phone (country code + flag) / Designation / Company, CAPTCHA\*, consent, live preview.
- NEW `server/index.js`: `/api/captcha` (signed, single-use) and `/api/reviews` (validation, honeypot, rate limit, spam
  filter, `manual`/`auto` publishing, admin moderation). Falls back to `/api/enquiry` when not deployed.
- Testimonials (`LiveReviews.jsx`) redesigned with four service treatments; submitted reviews appear live.
- NEW `tools/reviews/import_reviews.py` — imports only rows marked `Approved`. **The 400 supplied drafts are marked as
  fictional samples and were not published.**
### Chat
- NEW `Chat.jsx` replaces the base chat: answers from the site's own FAQs and pages (`public/data/chat-kb.json`,
  `scripts/build_chat_kb.js`) with source links and related questions; unknown questions collect full name, email,
  phone (optional) and country; redesigned panel, animations, pop sound. `ChatSound.jsx` and `chat-v50.css` removed.
### Downloads, panel books, case studies
- NEW Downloads page (`Downloads.jsx`): four service brochures, B2C and B2B country panel books (from the ten regional
  workbooks via `tools/panel/make_panel_books.py`), gated by one form (`Gate.jsx`), PDFs generated with the FR watermark
  (`Pdfs.jsx`).
- Case studies: ten per sector (added ones labelled illustrative), redesigned case page (`CaseStudy.jsx`) with watermark,
  charts and a gated PDF.
### Redesigns and new pages
- ESOMAR 37 rendering redesigned (answers unchanged). Sampledge pricing redesigned; yearly = 20% off monthly × 12; all
  plan buttons → sampledge.com/pricing; animated Sampledge logo everywhere it appears.
- Footer redesigned (`Footer.jsx`). NEW Our Journey page (`/our-journey`, About menu). Let's Talk redesigned
  (`LetsTalk.jsx`; same URL and form). FAQs redesigned per service world (`Faq.jsx`; JSON-LD unchanged). Generated animated
  blog covers (`BlogCover.jsx`). Panel Audience Marketplace mark and 3D art (`MarketplaceArt.jsx`). Light treatment for
  the home "Have a business challenge?" band (`home-cta.css`).
### Fixes
- Service FAQ generator keeps acronyms when lower-casing (was "gST services", "tds").
- Footer panel logos sized correctly.
### Build / deploy
- NEW `scripts/make_preview.js` (`npm run preview:file`): single-file offline preview with runtime data embedded.
- `package.json` 51.0.0; new scripts `kb`, `panels`, `serve`, `serve:www`, `server`; `release` now also rebuilds the chat
  knowledge base. `prerender.js` copies `public/data` to `dist/www/data` and leaves the chat/review/download overlays out
  of the static copy. `.env.example` documents the review-server variables; `server/data/` is git-ignored.
- SEO: no URL changed or removed; one new page (`/our-journey`) enters the sitemap through its links. Titles, descriptions,
  canonicals and FAQ JSON-LD of existing pages unchanged (service FAQ text now spells acronyms correctly).

## 2026-10-10 · Build 50 — ESOMAR 37 page, live-review testimonials, chat redesign
### NEW page: ESOMAR 37 (`/esomar-37`)
- `src/pages/Esomar37.jsx` + `src/styles/esomar37.css`. The supplied answers in full, as structured blocks rather than
  paragraphs: definition lists, numbered step rails, figure tiles, certification cards and callouts.
- **Five sections, five visual keys**, so the page never repeats itself: Company Profile is a dossier with colour rails
  and outsized numerals on white; Sample Sources runs down a connected index line on a tinted ground; Data Quality is
  glass panels on deep teal; Policies is soft violet cards; Metrics is a gold board on near-black.
- A sticky toolbar with live search across all answers, section filters, expand/collapse all, and a scroll-progress line.
  The hero carries five fanned section cards that jump into place.
- SEO: unique title (58) and description (157), canonical, one H1, `FAQPage` JSON-LD built from every question and the
  flattened answer text, plus `BreadcrumbList`. Footer link added under Company; the static build picks the page up from
  that link, so it gets its own URL, HTML and sitemap entry.
- **The twelve metrics are published as pending**, not estimated — the board shows each metric and "figure being
  measured". Put the measured figure into `ES_METRICS` to publish it.
### Live reviews in the testimonials section
- NEW `src/components/site/LiveReviews.jsx` + `src/styles/live-reviews.css`. The home page now renders `FR_Testi`
  instead of `HM_Testi` (one-line patch): a featured quote card beside a continuously scrolling rail of every review,
  an aggregate score ring, country flag chips, company names and a pulsing "Live" pill when reviews came from the API.
- Reads `GET /api/reviews` every 60s and merges results ahead of the built-in testimonials. Endpoint spec in README.
  **Publishing is immediate and unmoderated by the owner's decision** — the frontend sanitises and clamps every field and
  renders text only, but the backend is the only real gate. See the warning in README.
- With no endpoint, or on any error, the section shows exactly the testimonials it showed before.
### Chat
- `src/styles/chat-v50.css` restyles the whole widget — gradient launcher with a pulsing ring, sheen and icon nudge;
  glass panel with an animated aura header, presence dot, bubble tails, animated typing dots, gradient reply chips and a
  round send button. CSS only: the base chat JavaScript and its API calls are untouched.
- NEW `src/components/site/ChatSound.jsx`: a synthesised two-note pop when the panel opens (Web Audio, nothing
  downloaded), fired only from the launcher click so it can never autoplay or sound on page load. Speaker toggle beside
  the launcher, remembered in `localStorage`, default on, and silent under `prefers-reduced-motion`.
### Keywords
- Three further FAQs carry the remaining supplied terms in true sentences: project billing and invoicing (stating plainly
  that Sampledge is **not** retail store billing, retail invoice or medical invoicing software); real-time fieldwork and
  geolocation checks; and which market research tools Sampledge does and does not replace.
### Not changed
- No existing URL, route, title, description, canonical, analytics tag or form endpoint. Pricing is unchanged from
  build 49: the yearly badge still shows the saving computed from the published prices.

## 2026-10-09 · Build 49 — Sampledge pricing rebuilt from the application's own plans
### The pricing section (`SAM_Price`, `src/pages/Sampledge.jsx` + `src/styles/sampledge.css`)
Five flat white cards became a **deep indigo band of its own** — a different key from the teal security section above it
and the light form below, so the page changes gear at the point of decision.
- **Monthly / yearly switch** and a **five-currency switch** (INR · USD · EUR · GBP · CAD), both sliding segmented
  controls. Prices are the ones published on the Sampledge pricing screen; nothing is converted or invented.
- **Yearly saving is computed, not typed.** Every yearly price is ten times the monthly one, so the badge reads
  “−17%” (−16% in USD/EUR/CAD) and the line reads “Yearly billing is 2 months free — you pay for 10, you get 12”.
  Change a price and the badge follows. Each yearly card also shows the struck-through twelve-month total and the exact
  amount saved in the selected currency.
- **“Best value” is derived, not asserted** — `SAM_BEST` picks the plan with the most projects per unit of price (Pro),
  and the flag only appears when that plan is actually showing a price.
- **Capacity meters** per plan, and a **project-ceiling curve** drawn under the cards as a small area chart that draws
  itself on scroll (350 → 650 → 1,500 → 2,500 → unlimited).
- 3D: the row sits on a perspective, cards fan toward the centre, step up with the ladder and lift on hover; the price
  read-out rolls in character by character when the period or currency changes.
- **Plan CTAs now open the Sampledge site** (`SAM_APP = https://www.sampledge.com/pricing`, new tab), plus a
  “See all plans on Sampledge” button. A plan with no published price keeps its “Ask for pricing” CTA on this page's
  demo form instead of sending people to a page that does not list it.
- **Unpublished combinations degrade honestly.** A currency with no yearly prices disables the Yearly switch and falls
  back to Monthly; any single missing price shows “Price on request”.
- Below five-across the cards become a swipeable rail with the 3D flattened; all motion is off under
  `prefers-reduced-motion`.
### Structured data
- `offers` rebuilt: one `Offer` per plan **per billing period**, each with a `UnitPriceSpecification` carrying
  `unitCode` MON or ANN, `valueAddedTaxIncluded: false` and the Sampledge URL. Previously only monthly INR was emitted.
### Keywords (SEO)
Three substantial FAQs added, so the terms land in real answers rather than in stuffing, and all three join the
`FAQPage` JSON-LD:
- “Is Sampledge a vendor management system?” — *vendor management system, VMS, sample supplier management*
- “Which data collection methods does Sampledge support?” — *data collection methods, data gathering method, primary
  data collection techniques, data collection methods in research*
- “How does Sampledge compare with a general market research platform?” — *market research platforms, market survey
  software, customer research software, sample database management system*
The existing cost FAQ was rewritten for the new monthly/yearly/currency structure.
### Not changed
- No URL, route, title, description, canonical, sitemap entry, analytics tag or form endpoint.
- Every other section of the page, and every other page of the site.

## 2026-10-09 · Build 48 — hero and home-page screens re-cut as complete windows
The build-47 screens were cropped through the middle of each application window: the vendor dashboard was sliced across
its project table, the bidding dashboard lost its lower panels, and "Live Projects" was a bare strip of table with no
window frame at all. Every hero screen has been re-cut from the supplied high-resolution artwork so that each one is a
**whole window inside its own frame**, with nothing of the neighbouring window or its label baked in.

### Images (`public/images/sampledge/`)
| File | Was | Now | Source |
|---|---|---|---|
| `ui-pm.webp` | 860×654, cut mid "Top 5" row | **1060×702**, ends cleanly below the statistics panel | All-in-One composite |
| `ui-bidding.webp` | 580×408, lower panels cut off | **1060×736**, the whole bidding dashboard | All-in-One composite |
| `ui-vendor.webp` | 560×319, table sliced | **1060×948**, counters, filters, project table and pager | All-in-One composite |
| `ui-create.webp` | — (replaces `ui-projects.webp`) | **1060×641**, Create Project with devices and security checks | Companies/Bids composite |
- `ui-projects.webp` is removed: it was a frameless fragment, and the vendor window already shows the project list. The
  fourth screen is now **Create Project**, which is visually and functionally distinct from the other three.
- 117 KB for the four screens (was 68 KB for four smaller, broken crops). `logo-light.webp` and `logo-dark.webp`
  re-exported from the supplied high-resolution logo files.

### Layout (`src/styles/sampledge.css`)
- Screens enlarged and re-positioned so the four overlap into one layered stack instead of sitting apart: PM 64%,
  Bidding 52%, Vendor 54%, Create Project 58%; the hero grid gives the stage slightly more width.
- `.sam-win--lp` renamed `.sam-win--cp` (the layer is Create Project, not Live Projects).
- Tablet: weaker perspective and tighter widths, so no window bleeds past the stage. Phones: perspective switched off, so
  `translateZ` no longer scales a window past the screen edge. A duplicated `aspect-ratio` declaration was removed.
- Home page: the Sampledge tile's screenshot now fades out at its lower edge instead of ending on a hard line.

### Not changed
- No URL, route, title, description, canonical, JSON-LD, sitemap entry, analytics tag or form endpoint.
- Hero copy, headings, CTAs, the capability chips and every other section of the page are untouched.
- Still not used from the supplied artwork: the panel-size figures and the GDPR / ISO 27001 / encryption badges, and the
  "Faster Turnaround · Higher Accuracy · Global Reach · Competitive Pricing" strip (unsupported comparative claims).

## 2026-10-09 · Build 47 — real Sampledge screens in the hero and on the home page
- **Hero imagery replaced.** The build-46 layers cut from the light promo composite (laptop + four feature cards) are gone.
  The hero now shows four **real Sampledge screens** cut from the supplied dark product artwork at full resolution:
  PM dashboard (large, upper right), bidding dashboard (upper left), vendor dashboard (lower left) and the live projects
  list (lower right) — the arrangement of the supplied artwork, rebuilt in 3D with per-screen depth, idle float, staggered
  reveal, pointer tilt, grid floor, light sweep and the cycling status pill.
- **Screen captions are now HTML**, not baked into the images: "PM Dashboard", "Bidding Dashboard", "Vendor Dashboard",
  "Live Projects" render as text pills, so they stay sharp at any size and are readable by search engines and screen readers.
- NEW `public/images/sampledge/ui-{pm,bidding,vendor,projects}.webp` (68 KB in total). REMOVED the five build-46
  `hero-*.webp` files, which nothing references any more. `logo-light.webp` and `logo-dark.webp` re-exported from the
  supplied high-resolution logo files (same artwork and ratio, crisper).
- **Home page, "Technology built for research & audience intelligence":** the Sampledge tile now shows the real PM
  dashboard, filling the frame edge to edge instead of a small contained picture; both product tiles' art panels are the
  same height so the pair reads as a set. Copy, headings and both CTAs are unchanged base content.
- Phones show three larger screens rather than four unreadable thumbnails; tablet spacing tightened.
- `scripts/v46_patches.js` now accepts several source forms per patch, so a bundle already carrying the build-46 patch is
  upgraded instead of rejected.

## 2026-10-08 · Build 46 — Sampledge hero from the supplied artwork, product branding on the home page and in the menu
### Sampledge page (`src/pages/Sampledge.jsx`, `src/styles/sampledge.css`)
- **Hero rebuilt.** The three stacked interface screenshots (`SAM_Command`) are replaced by `SAM_Stage`, a 3D composition
  assembled from the supplied product artwork: the laptop dashboard (background removed) at the centre with four interface
  cards — Create & Manage Projects, Real-time Fieldwork Tracking, Powerful Analytics, Survey Programming — floating around it
  at separate `translateZ` depths. Pointer-driven tilt, slow idle float, staggered reveal, perspective grid floor, rotating
  aurora, screen light-sweep, drifting light points and a cycling operational-signal pill. All of it CSS; no new dependency.
- **Hero copy.** Added nine platform chips from the artwork (Project Management · Survey Programming · Sample Management ·
  Administration · Fieldwork & Tracking · Billing & Credits · Data & Reporting · Security & Compliance · Analytics & Insights)
  with staggered entrance; kicker is now the brand line "Smarter research. Deeper insights." H1, lead and both CTAs unchanged.
- **Images.** NEW `public/images/sampledge/hero-{laptop,projects,fieldwork,analytics,survey}.webp` (72 KB in total, cropped
  from the supplied composite); `logo-light.webp` re-exported at 1080×204 from the supplied high-resolution logo (same ratio).
  `logo-dark.webp` is no longer referenced, so it is no longer inlined in the bundle (file kept for future use).
- **Removed** the Sampledge link band above the site footer (`SAM_Foot`, Platform / Get started / More). Its three outbound
  links (All products · About Frequent Research · Let's talk) were moved into the closing call to action so no internal link
  is lost. The "Inside Sampledge" screen-by-screen tour is unchanged.
- **Pricing** is no longer five identical lists: Projects and Users now carry a capacity meter scaled against the largest
  numbered plan, Marketplace is a chip, and the cards step up slightly across the range.
### Base bundle (patched — `scripts/v46_patches.js`, idempotent)
- Home page, "Technology built for research & audience intelligence": the Sampledge tile shows the real product interface in
  place of the abstract bars and the Sampledge wordmark inside its `h3`; the marketplace tile keeps its own art, now on its
  own gradient with a slow twinkle, so the pair reads as a designed pair. Headings, copy and both CTAs are base content and
  are unchanged.
- Header "Products" menu: the two entries render as two branded panels, the Sampledge one carrying its logo.
- `scripts/build_v44.js` applies these after the build-44 patches and creates the output directory if it is missing.
- Styles for both live in `src/styles/site-v44.css` (overlay, loaded after the base CSS) — no base stylesheet was edited.
### Not changed
- No URL, route, title, description, canonical, JSON-LD, sitemap entry, analytics tag or form endpoint was altered.
- Not used from the supplied artwork: the panel-size card (5.75M+/3.87M+/1.48M+/2.50M+) and the GDPR / ISO 27001 /
  encryption badges — see *Missing / recommended* in README.md.

## 2026-10-08 · Build 45 — Sampledge product page
- NEW /products/sampledge (same URL, now `SAM_Page` from src/pages/Sampledge.jsx + src/styles/sampledge.css): hero with layered
  real interface screens and cycling status signals; spreadsheet sprawl → one workspace; connected-ecosystem orbit; ten-capability
  map (colour roles Project/Sample/Quality/Alert/Analytics); screen-by-screen interface tour with zoom dialog (12 real screens);
  eight-station workflow; concept operations board (states, no data); WHEN/IF/THEN/NOTIFY/UPDATE/TRIGGER rule builder; "where
  Sampledge is heading" (today vs directions, labelled not available); connection types (no tool names); audiences; use-case tabs;
  before/after slider; friction ledger; security layers (only controls visible in the product); five plans (INR, taxes extra);
  three-question demo request (form `sampledge-demo`, type "Sampledge Demo Request" → POST /api/enquiry); FR + Sampledge origin
  line; philosophy; FAQ (8); closing call to action; Sampledge link band.
- SEO: title "Sample Management Software for Research Teams | Sampledge" (57), description 149, canonical, one H1,
  SoftwareApplication (four priced offers, VAT not included) + BreadcrumbList (Home › Products › Sampledge) + FAQPage JSON-LD.
- Not used: the light promo artwork (unverified panel sizes, respondent counts, "GDPR Compliant", "ISO 27001 Certified").
- Build: `PRODUCT_ROUTES` + `"__IMG:…__"` placeholders (overlay.config.js); product branch in build_v44.js and build_dm.js;
  prerender.js writes those images to /assets/img/<name>.<hash>.webp (long cache in .htaccess) instead of inlining them in
  every page's JavaScript; form test `PRODUCT=1`.

## 2026-10-08 · Build 44.1 — One real URL and HTML file per page (search-engine build)
- NEW scripts/prerender.js (`npm run release`): splits the bundle into cache-busted assets and writes 589 pages to dist/www,
  each at its real path with its own title, description, canonical, Open Graph/Twitter tags, JSON-LD and a readable copy
  of its content with real links; 404.html (HTTP 404, noindex), sitemap.xml (589 URLs), robots.txt, .htaccess and
  nginx.conf.example. An inline boot script hands /path to the existing hash router as /#/path — no app changes, and old
  /#/ links keep working.
- Fixed: Market Research hub linked /blog/market-research-guide (not found) → /blog/market-research-guide-india.
- NEW package.json + package-lock.json for the build tooling (devDependencies: typescript 6.0.3, playwright 1.56.0).
- tools/qr/icons.js resolves react/sharp from node_modules when installed.

## 2026-10-08 · Build 44 — Eight IT pages rethought; branded QR codes; People section and Project Manager wording removed; WhatsApp animation; text tones on dark sections
- NEW pages (same URLs as before — no redirects needed): /services/it-development/it-consulting (ITC_Page),
  /application-maintenance-and-support (AMS_Page), /cloud-and-devops-services (CDO_Page), /ai-and-automation-solutions (AIA_Page),
  /data-analytics-and-dashboard-development (DAD_Page), /software-testing-and-qa (QA_Page), /cybersecurity-services (CYB_Page),
  /website-maintenance-and-support (WMS_Page). Each has its own signature visuals (no shared diagram between the eight pages),
  1 H1, title 53–60 and description 147–160 characters, canonical, Service/Breadcrumb/FAQ JSON-LD, 7–8 FAQs, the existing guide,
  a service-specific chip form (it-consult, app-support, cloud-project, ai-project, analytics-project, qa-project, security-project,
  website-care → POST /api/enquiry) and related links to existing routes. No market-research wording, team, case studies,
  example boxes or invented figures. Sub-sections use h3 (PP_Head/IX_Sec `lv={3}`) so each page keeps a short H2 outline.
- NEW src/components/dm/v44kit.jsx + src/styles/it-v44.css (hero variants, statements, numbered pillars, duo principles, sector
  tags, technology lines, closing CTA, related rail; page styles prefixed itc- ams- cdo- aia- dad- qa- cyb- wms-).
- Scan & connect (rating popup): all 11 QR codes regenerated with the brand logo in the centre (Google, Frequent Research,
  Turn2Opinion, MyFrequentRewards, MyHealthOpinions, LinkedIn, Instagram, YouTube, Facebook, X, Pinterest); explanatory
  captions and paragraphs removed — tiles show code + name. Each code decoded from the rendered page in Chromium.
- Healthcare Panel: "People — The Team Behind Your Healthcare Research" removed (Sectors block kept).
- "Project Manager" promises removed from service content (base bundle patches + Market Research hub): replaced by
  "one point of contact"; Project Manager role entries removed from service-page team lists. Real job titles on the Team
  and leadership pages, careers departments, respondent occupations and case-study text are unchanged.
- WhatsApp button: two soft ripples and a short icon nudge every 6 s; paused on hover/focus; off for reduced motion.
- NEW src/styles/site-v44.css: complementary text tones on dark backgrounds (sky, mist, aqua, gold, lilac; all ≥ 7:1 on navy) —
  gradient section headings, toned footer column headings and links, home and about dark-section accents.
- Build: scripts/overlay.config.js (shared lists + compile), scripts/build_v44.js (incremental, idempotent, with end markers),
  scripts/v44_patches.js (counted base patches); build_dm.js refactored to use them. formtest_dm32.js covers the 8 new forms.

## 2026-10-07 · Build 43 — Text on dark backgrounds made white/light (site-wide contrast pass)
- NEW src/styles/contrast-fixes.css (loaded last by build_dm.js). Overrides only; no markup, content or URL changes.
- White headings on the dark motto and final call-to-action sections of the CRM, ERP, Custom Business Applications, UI/UX,
  API and Market Research hub pages (they were inheriting the dark heading colour).
- Policy pages: "Contact our team" button text was invisible (blue on blue) → white.
- Consumer Panel comparison-table header labels → white; Data Processing & Analytics "Project & sample management" → amber;
  Qualitative Research healthcare audience card text → white.
- Digital Marketing dark sections: blue kicker labels → light teal. Government & Opinion Research: "Coverage" kicker,
  district counts (mobile list) → light teal; programme card numbers more visible.
- Industries: sector tile back face ("We research", "View sector →") → white.
- Method: crawled 251 pages (all except 405 repetitive industry case-study pages; 2 industries' case studies sampled) at
  1280px and 390px, compared each text colour with its background, then checked every hit by screenshot. Left unchanged
  on purpose: large faded background numbers ("01"…), and items that only looked dark mid-animation.

## 2026-10-07 · Build 42 — CRM, ERP, Custom Business Applications, UI/UX Design and API pages rethought; Market Research hub redesigned
- NEW shared visual kit src/components/dm/ixkit.jsx + src/styles/it-ix.css (prefix IX_/ix-): system graph with journeys,
  disconnected↔connected toggle, before/after flows, capability matrix, architecture layers, AI console, decision tree,
  role workspaces, integration ecosystem, options, stack, trust ring, timeline, event cascade, control room, outcomes, motto.
- NEW pages (replace the generic template at the SAME URLs — no URL changes, no redirects needed):
  /services/it-development/crm-development (CRM_Page), /erp-development (ERP_Page), /custom-business-applications (CBA_Page),
  /ui-ux-design (UXD_Page, page-specific visuals in src/styles/it-uxd.css: before/after slider, design-system playground,
  accessibility switches, device views), /api-development-and-integration (APX_Page; brief suggested
  /api-development-integration — existing URL kept to protect SEO).
  Each: unique title (53–60 chars) + description (152–160), canonical, Service/Breadcrumb/FAQ JSON-LD, 8 FAQs, guide link,
  short chip form (crm-project, erp-project, cba-project, uxd-project, api-project → POST /api/enquiry), related services.
  No market-research/panel/survey wording, no case studies, team, examples or statistics on these pages.
- Market Research hub /services/market-research redesigned (MRH_Page, routed via the vertical patch in build_dm.js): decision-first
  hero graph, before/after research flow, 5-group service map linking all 12 existing service pages, AI-assisted/human-led
  console, audiences, data-quality ring, approach tree, the existing 7-step design cycle, outcomes, motto, industries, FAQs
  (existing hub FAQs), form mrh-consult. Individual market research service pages unchanged (rendered text compared with build 41).
- Fixed Accounts & Finance related link on the hub (/services/accounts-finance).
- scripts/formtest_dm32.js: IT list now includes the 5 new forms; MR=1 mode tests the hub form.

## 2026-10-07 · Build 41 — Flags + calling codes for every country in all phone fields; YouTube QR
- NEW country-code picker (src/components/site/CountryPicker.jsx + src/styles/country-picker.css, prefix cc-) replaces the
  country-code dropdowns in every phone field: Let's Talk and all service forms (FM_Phone), the generic enquiry/download/
  government forms (g5) and the rating & review popup. Flag + code on the button; searchable list (name, ISO or digits,
  e.g. "44") with "Popular" (the site's original 19 countries) and "All countries"; keyboard (↑/↓, Home/End, Enter, Esc, Tab);
  rendered on <body> so it is never clipped; opens above the field when there is no room below.
- Country list now covers every country/territory with an E.164 calling code (244 + "Other country"):
  src/config/countries.json, generated by tools/cc/make_countries.py from tools/cc/dial_codes.py and ISO 3166-1 names; the
  original 19 entries keep their exact digit rules; +1 (NANP) countries use 10 digits; others 5–13 digits. Injected by
  build_dm.js in place of the old `io` list (same shape + `fi` flag index), so existing validation and payloads are unchanged
  (countryCode still "+NN").
- Flags: one 320×240 sprite (public/images/flags/flags-sprite.webp, ~110 KB, inlined into CSS at build), rendered from Noto
  Color Emoji (SIL Open Font Licence 1.1) by tools/cc/make_flags.py.
- Review popup: phone digit limits now follow the chosen country.
- Scan & connect → Social: YouTube QR added (https://www.youtube.com/@frequentresearch, the channel already linked in the site
  footer; generated with OpenCV and verified by decoding). The image supplied in the request decodes to the Facebook page.

## 2026-10-07 · Build 40 — "Client Reviews" redesign, notification + delayed random opening, quick-rate stars
- Renamed "Customer Reviews" → "Client Reviews" ("Client rating" on the thank-you screen).
- New layout: dark-blue hero band with drifting orange glow; animated score ring (fills to the average out of 5), stars,
  "N client reviews" + optional source line; 5→1 rows with star icons, gradient bars, count + percentage, count-up, sheen and
  pulsing numbers on 5/4/3; "Rate us now" quick-rate card (hover/focus preview, wave animation) that sets the form's rating and
  jumps to the review box. Removed the "Write a review" button (quick-rate replaces it).
- Empty state (no verified totals yet): no zeros — spinning ring with a beating star, shimmering bar tracks and
  "Every client rating appears here instantly — yours can be the first." Real figures go in RV_SUMMARY (source + counts) or
  come from GET /api/reviews/summary. Numbers are never invented.
- Timing (never on arrival): "Worked with Frequent Research? Rate now" notification slides in at a random 20–35 s; full screen
  opens at a random 50–80 s, or on exit intent after 20 s; postponed while the visitor is typing in another form; once per visit.

## 2026-10-07 · Build 39 — Slim "Rate & Reviews" tab; Customer Reviews panel restyled; live "your rating joins our rating" animation
- Side tab redesigned: slim white tab (≈30 px wide), small orange star, orange edge accent, soft sweep and occasional nudge.
- Customer Reviews panel restyled after the reference (white, black type, orange bars on grey tracks, divider, outlined
  "Write a review" button). Always shown: it starts from the CURRENT totals in RV_SUMMARY (currently 0 in every row, i.e. no
  ratings recorded yet) or from GET /api/reviews/summary when available. Average, stars and counts count up; 5/4/3 rows emphasised.
- After a visitor submits, the thank-you screen shows "Our rating" counting up from the current totals, then their rating is
  added: a star drops into their row, "+1" appears, the count, total and average update. Re-opening in the same visit shows the
  updated totals. Stored totals change only once the backend records the review.
- Removed the build-38 inbox animation (replaced by the rating-bar animation).

## 2026-10-07 · Build 38 — Review popup on exit intent, "Rate & Reviews" tab, Customer Reviews summary, review animation
- Popup no longer opens on arrival. It opens on exit intent, once per visit: desktop = pointer leaves through the top of the
  window after at least 5 s on the site; touch devices = a quick scroll back up after reading (15 s+, 800 px+). Browsers do not
  allow a custom pop-up while a tab is actually closing, so this is the closest reliable trigger. Not shown again in a browser
  that has already sent a review.
- Side tab renamed "Rate us" → "Rate & Reviews"; larger, gold outline, pulsing ring, light sweep, twinkling star and a periodic
  nudge (all disabled under reduced motion).
- NEW "Customer Reviews" summary panel (average, star bar, review count, 5→1 star rows with animated count-up numbers and growing
  bars, emphasis on 5/4/3 rows, "Write a review" button). REAL DATA ONLY: fed from RV_SUMMARY (null) or GET /api/reviews/summary
  ({ ok, counts:{5,4,3,2,1} }); hidden when neither provides real totals. The requested ~4,000 invented reviews were NOT added.
- Thank-you screen: "where your review goes" animation — the visitor's review card (their stars, text, company) flies into a
  Frequent Research inbox, star burst, check mark. Dialog scrolls to top so it is seen.
- Removed the "About us" QR from the Social tab.

## 2026-10-07 · Build 37 — Review popup: QR codes for Google, research panels and social channels
- The Google Business Profile card in the rating & review popup (and its thank-you screen) is now a tabbed "Scan & connect" hub:
  Google (Business Profile QR + "Write a Google review" + Google share-link QR), Our panels (Frequent Research Panels,
  Turn2Opinion, MyFrequentRewards, MyHealthOpinions) and Social (LinkedIn, Instagram, Facebook, X, Pinterest, About us page).
  Each tile is a QR code plus a tap-to-open link (new tab). Keyboard tabs (arrow keys / Home / End), reduced-motion respected.
- 11 QR images supplied by Frequent Research re-rendered as clean 1-bit PNGs (public/images/qr/*.png, ~0.5 KB each, each verified
  to decode to the same URL as the original) and inlined at build time ("__QR:name__" placeholders in build_dm.js).
- Note: the X QR points to x.com/FrequentRe585, while the site footer's X link is x.com/frequentrfs — to be confirmed.

## 2026-10-07 · Build 36 — Chat launcher reduced to a small icon
- The "Chat with us" launcher (bottom-right) is now a 48 px icon-only circle at all screen sizes, matching the WhatsApp icon,
  which sits directly above it (same centre line, 12 px gap). Accessible name "Chat with us" / "Close chat" unchanged; chat panel
  behaviour unchanged. CSS only (src/styles/site-reviews.css).

## 2026-10-07 · Build 35 — WhatsApp icon above chat, dark-blue nav hover, rating & review popup with Google Business Profile QR
- WhatsApp: the "WhatsApp Support" pill (bottom-left) is now a small 48 px WhatsApp icon stacked directly above the chat launcher
  (bottom-right) on all screen sizes; text label hidden, accessible name unchanged, link unchanged (wa.me/918178200573).
- Header nav: hover / open state of every tab (including Government Research) is now the site's dark blue #0B22A8 at 86% opacity
  with white text (was light blue rgba(30,91,255,.08)). Active-page styling unchanged when not hovered.
- NEW site-wide rating & review popup (src/components/site/ReviewPrompt.jsx + src/styles/site-reviews.css, prefix rv-):
  opens with an animation 6 s after a visitor arrives, once per browser session; not auto-shown again in that browser after a
  review is sent. A "Rate us" side tab (right edge) reopens it at any time. 5-star rating (keyboard accessible radiogroup) +
  written review + full name, company name, email, phone (country code) + consent checkbox + honeypot. Submits to
  POST /api/enquiry with type "Website Review" and a numeric rating field. Esc / close / "Maybe later" close it; focus is trapped
  and restored; body scroll locked; bottom-sheet layout on phones; reduced-motion respected.
- Google Business Profile card inside the popup and on the thank-you screen: QR code (public/images/google-business-profile-qr.webp,
  inlined at build time) + "Write a Google review" + "View our Google Business Profile" (place ID ChIJR36zkVYFDTkRXCVhgQK9UqY).
- Build: build_dm.js registers the new module/style, inlines the QR, mounts RV_Prompt beside the WhatsApp float (single mount,
  asserted). Test scripts set sessionStorage fr_review_seen so the popup does not block automated clicks. No dependencies added.

## 2026-10-07 · Build 34 — Digital Marketing reframed: "Digital Growth, Built Around the Business." (phase 1)
- Positioning change: Digital Marketing no longer uses market-research capabilities as its USP. New philosophy "Marketing should move
  the business, not just the metrics."; motto "Turn attention into action. Turn data into better decisions."; first-person
  "how we operate" voice.
- NEW kit src/components/dm/dgkit.jsx + src/styles/dm-growth.css (prefix dg-): hero visuals DGV_ControlRoom (Digital Growth Control
  Room), DGV_Search (Search Landscape), DGV_FlightDeck (Campaign Flight Deck), DGV_Constellation (Conversation Constellation),
  DGV_ContentMap (Content Intelligence Map), DGV_Orbit (Customer Journey Orbit); sections DG_Manifesto, DG_Contrast, DG_Engine
  (Digital Growth Engine wheel), DG_ValueRail, DG_Need, DG_AiLab, DG_TechStack, DG_Signals, DG_Vanity, DG_Loop, DG_Why (motif cards),
  DG_OS, DG_Close, DG_Advantage (split / dark / rule), DG_Changes (ribbons / tiles / ticks / split), DG_Operate (numbers / quotes /
  cols), DG_Accordion, DG_AiPairs, DG_Clusters, DG_Allocate, DG_Momentum, DG_Formats, DG_NextMessage, DG_Next. Radial visuals fall back
  to lists on phones.
- Rewritten (URLs unchanged), each with its own structure: Digital Marketing landing page, SEO Services, Performance Marketing, Social
  Media Marketing, Content Marketing, Email Marketing. SEO title changed from "Research-Led SEO Services | Frequent Research" to
  "SEO Services | Frequent Research".
- Remaining 14 DM pages (interim, before phase 2): market-research positioning removed (research FAQs, research-panel links,
  "Research where it helps" cards, research-led titles/kickers); "Example" badges and labels removed site-wide in DM (hero frames,
  dashboards, path chips, status notes); visual bug fixes (PPC label sizes, e-commerce waterfall labels on mobile, ORM bubble
  overlap, B2B orbit tips, form header wrap). RL_Diff question 3 now "Where data and AI improve it"; RL_Why defaults to "Data + context".
- DK_Hero / DK_Final unchanged in API; dg- styles only. Tests: bug audit (overlap / escaping labels / dead anchors / tiny text),
  formtest_dm32 (20/20 DM, 7/7 IT), regression, links, banned-word scan. No dependencies added.

## 2026-10-07 · Build 33 — IT & Development repositioned: business-first technology partner
- Philosophy: "Build for the business. Design for the user. Engineer for what comes next." Narrative: Business need → Product thinking →
  User experience → Architecture → Engineering → Integration → Intelligence → Measurement → Evolution. No market-research USP on IT pages.
- NEW kit src/components/dm/itkit.jsx + src/styles/it-tx.css (prefix tx-): TX_Page (shared service structure), signature hero visuals
  TXV_Hub, TXV_Website (Page → Experience → Business interface), TXV_Workflow (workflow transformation engine), TXV_Mobile (mobile journey
  simulator), TXV_Commerce (commerce engine), TXV_Process (business workflow → digital product), TXV_Saas (product-to-platform stack);
  sections TX_Diff, TX_Shift, TX_Decide (build / buy / extend / integrate / modernize), TX_Hub (integration ecosystem), TX_Assure
  (security / quality / performance / accessibility / observability), TX_Dash (conceptual product analytics, shapes only), TX_Evolve,
  TX_Value, TX_Make ("What are you trying to make possible?"), TX_Products (six connected product paths).
- Rewritten (URLs unchanged): Website, Web Application, Mobile App, E-commerce and Custom Software Development (build-30 versions trimmed
  from 35–40 sections to ~20; case-study sections removed; strongest visuals kept).
- NEW pages: SaaS Development (SD_Page, /services/it-development/saas-development — previously the generic template; new form #sd-project)
  and the IT & Development landing page (ITH_Page, /services/it-development — replaces the template's "Meet the IT & Development team"
  section and unverified scenario; CollectionPage + ItemList + BreadcrumbList + FAQPage schema).
- Decision-focused FAQs on every page; service-specific CTAs ("Discuss Your Website", "Discuss Your SaaS Product", ...); form ids and
  chip options preserved on existing pages.
- Kit: DK_Hero `secondaryGo` (scrolls to a section), RL_Beyond "it" kind, DK3_Pipe / DK3_Roles neutral default labels (no "Example").
- Mobile app guide text (blog) no longer cites the research practice as the IT differentiator.
- Tests: formtest_dm32.js now also covers the 7 IT pages (IT=1). No dependencies added.
- Open item: the other 13 IT services (CRM, ERP, UI/UX, API, Cloud, AI, Data, QA, Cyber, maintenance, IT consulting) still use the
  generic service template, which contains team sections and an "Example engagement" block.

## 2026-10-07 · Build 32 — All 19 Digital Marketing service pages + landing page repositioned (research-led digital growth partner)
- Positioning: "Research before reach. Intelligence before investment. Understanding before optimisation." Full legal name
  "Frequent Research Fieldwork Solutions Private Limited" in schema and on the landing page.
- Every service page now runs on one shared structure, RL_Page (src/components/dm/kit4.jsx): Hero → statement → capability strip →
  Business problem → Frequent Research perspective (conventional vs research-led + 10-question difference) → Intelligence layer →
  page-specific visuals → The Frequent Research Intelligence-to-Impact Framework (Understand, Discover, Define, Activate, Measure,
  Learn, Improve, Grow) → Capabilities → AI-Assisted. Human-Led. (Data → AI assistance → Human interpretation → Business decision →
  Action → Measurement) → Measurement → Optimisation learning system (Campaign → Signal → Insight → Decision → Experiment → Learning →
  Better campaign) → Marketing as a source of business intelligence → (Beyond the channel journey) → Why Frequent Research →
  Related services with reasons → FAQ → final CTA → form. NO case-study section on any DM page.
- New kit modules: RL_AiLayer, RL_Learn, RL_Intel, RL_Journey, RL_Ecosystem. New unique hero visuals per service:
  src/components/dm/heroes.jsx + src/styles/dm-heroes.css (prefix hv-); WhatsApp keeps its animated WA_Chat.
- Rewritten in this build: SEO, Google Ads/PPC, Social Media Marketing, Social Media Advertising, Content, Performance, Lead Generation,
  B2B, Email, WhatsApp, Influencer, Video, E-commerce, Landing Page & CRO, Consulting, ORM, Marketing Automation, Analytics & Reporting,
  Audit, and the /services/digital-marketing landing page ("One Digital Ecosystem. Multiple Growth Questions."; core statement;
  final "Marketing Challenge. Business Context. Better Direction." with three CTAs). All URLs unchanged.
- Service-specific CTAs and form titles/submit labels (e.g. "Build an Audience-Led Social Strategy", "Improve Your Customer Journey",
  "Turn Your Data Into Decisions"); form ids and chip options preserved (two chips reworded "AI-powered" → "AI-assisted").
- Wording removed: "specialist" hand-offs (WhatsApp chat now "Connecting you to a person now."), "our team", case-study references,
  "AI-Powered", "best"-style claims. Meta descriptions 148–158 chars.
- Kit: DK_Final supports an optional third CTA (to3). CSS fixes: hero grid columns can shrink (mobile overflow), CTA buttons wrap,
  DK_Console steps collapse to 2 columns on mobile, page grid children min-width 0; Video/Influencer root classes renamed
  (vm-svc / in-svc) to avoid collisions with the site's existing .vm / .in rules; duplicate id an-why-h fixed on Analytics.
- Tests: scripts/formtest_dm32.js (generic form test across all 20 DM pages). No dependencies added.
- Open item: the 5 IT & Development pages (build 30) still contain an "Example Scenario" DK_Case section — awaiting decision.

## 2026-10-06 · Build 31 — Research-led repositioning, phase 1 (Digital Marketing landing page, SEO, Google Ads / PPC, Lead Generation, B2B Digital Marketing, Digital Analytics & Reporting, Digital Marketing Audit)
- Strategy: strategy-dm-research-led.md (audit of all 19 pages, differentiation map, repositioning, visual spec, SEO spec, cross-links, rollout). Positioning: "Research Before Reach" / "Digital Marketing Powered by Real Audience Understanding".
- NEW research-led module kit: src/components/dm/kit4.jsx + src/styles/dm-kit4.css (prefix rl-) — RL_Path (hero path with insight rail),
  RL_Versus (conventional vs FR chains), RL_Diff (The Frequent Research Difference — 10 service-specific answers), RL_Layers
  (execution vs + insight layer toggle), RL_Beyond (Beyond the Campaign connections with reasons), RL_Metrics (activity → behaviour →
  conversion → business, objective selector), RL_Loop (clickable Insight-to-Activation Loop), RL_Three (Research · Data · AI),
  RL_System (business-system chain), RL_Services (service ecosystem by goal), RL_Why (data shows what / research explains why).
- Landing page /services/digital-marketing: new DMH_Page (src/pages/DigitalMarketingHub.jsx) for this vertical only, via a guarded patch of
  the vertical template (other verticals unchanged). Removes "each with its own team", "Specialists for each channel" and the unverified scenario.
  Schema: CollectionPage + ItemList + BreadcrumbList + FAQPage.
- SEO /services/digital-marketing/seo-services: new SO_Page (src/pages/SeoServices.jsx) routed instead of the compiled SE_Page (same URL).
  Title "Research-Led SEO Services | Frequent Research". DM_Form replaces the compiled SEO form (same id #seo-consult; budget now optional).
- Rewritten narratives (URLs unchanged; trimmed from 37–55 sections to ~20; preserved scope/FAQ facts and strongest visuals):
  Google Ads / PPC (H1 now "Google Ads & PPC Management"; superseded PP_ components removed), Lead Generation (H1 now "Lead Generation
  Services"; new LG_Fit lead-fit filter over example enquiries), B2B Digital Marketing, Digital Analytics & Reporting, Digital Marketing Audit.
- Kit: DK_AiHuman `humanLead` used ("People stay responsible for:"); DK_Report now accepts plain-string questions — fixes a build-30 bug
  where the IT pages' analytics questions rendered as single letters.
- Rules kept: no team details, no invented results/metrics/clients/partnerships, "Example Scenario — Not a client result" (no
  "Illustrative"), research described as available where needed — never compulsory. No dependencies added.

## 2026-10-06 · Build 30 — IT & Development: Website, Custom Software, Web Application, Mobile App, E-commerce Development
- NEW pages (URLs unchanged, routed to new components ahead of the generic service template):
  - /services/it-development/website-development → WD_Page (src/pages/WebsiteDevelopment.jsx)
  - /services/it-development/custom-software-development → CS_Page (src/pages/CustomSoftwareDevelopment.jsx)
  - /services/it-development/web-application-development → WB_Page (src/pages/WebApplicationDevelopment.jsx)
  - /services/it-development/mobile-app-development → MB_Page (src/pages/MobileAppDevelopment.jsx)
  - /services/it-development/e-commerce-development → ED_Page (src/pages/EcommerceDevelopment.jsx)
  - These replace the generic template on these 5 URLs, which showed "Delivered by our IT & Development team",
    a "Who will work on my … project?" FAQ, the shared case example and the shared digital-marketing consultation form.
- Kit made vertical-aware: DK_Hero `parent` (breadcrumb) + `secondaryTo`; dmSchema `parent` (BreadcrumbList);
  DK_Related `base` + full-path entries + `researchLabel`; DK_AiHuman `humanLead`; DK_Quiz `count` ("yes"/"no");
  DK_Tree `startIcon`; new helpers ppIt, DK_PARENT_DM, DK_PARENT_IT. Defaults keep every existing page unchanged.
- DM_Form: free-text steps (`text: true`, optional, max 300 chars), configurable URL label (`siteLabel`) and success
  next steps (`nextSteps`). Service-specific forms on all 5 pages (no marketing budget on Custom Software, Web App, Mobile).
- NEW kit part 3: src/components/dm/kit3.jsx + src/styles/it-kit.css — DK3_Stack (3D layered stack), DK3_Vitals (Core
  Web Vitals gauges, Google's published thresholds, no site values), DK3_Radar (audit radar, "Assessment not yet
  performed"), DK3_Tech (technology constellation by requirement), DK3_Drivers (relative scope meter — never a price),
  DK3_Lanes (Now/Next/Later/Future), DK3_Pipe (looping example quality pipeline), DK3_Roles (role-based access preview),
  DK3_Pick ("What are you building?" selector), DK3_Fix (problem → cause → response). Blue "Monitoring/Optimise" status.
- Page visuals (src/styles/it-pages.css): WB_App (example web-app window hero), MB_Phone (example mobile journey).
- Build script: IT routes registered with their vertical; guide titles for Website, Mobile and E-commerce guides aligned
  with the briefs (slugs/URLs unchanged); team wording removed from the Mobile and E-commerce guides.
- No team-member details, no invented scores/results/prices/quantities, no platform partnerships or certifications,
  no app-store approval guarantees, no "best/top" claims, no "Illustrative" labels. No dependencies added.

## 2026-10-06 · Build 29 — Digital Marketing Consulting, Digital Marketing Audit, Digital Analytics & Reporting, B2B Digital Marketing
- NEW pages (URLs unchanged, routed to new components):
  - /services/digital-marketing/digital-marketing-consulting → DC_Page (src/pages/DigitalMarketingConsulting.jsx)
  - /services/digital-marketing/digital-marketing-audit → AU_Page (src/pages/DigitalMarketingAudit.jsx)
  - /services/digital-marketing/digital-analytics-and-reporting → AN_Page (src/pages/DigitalAnalyticsReporting.jsx)
  - /services/digital-marketing/b2b-digital-marketing → B2_Page (src/pages/B2bDigitalMarketing.jsx)
- H1 is the service name on all four (per briefs) with a supporting headline: DK_Hero gains an optional `tag` prop.
- Kit 2 additions: DK_Quad (impact × effort matrix), DK_Quiz (yes/no self-assessment — counts only the visitor's
  own answers, nothing stored or sent), neutral "insufficient data" status, light-tone step list.
- Custom visual: B2_Icp (ICP builder — criteria narrow the market to target accounts + buying committee).
- No team-member details or "our team/experts" wording; no invented scores, results, rankings, "top 10/best"
  claims, guaranteed outcomes or platform partnerships; no "Illustrative" labels. No dependencies added.

## 2026-10-06 · Build 28 — Marketing Automation, Landing Page & CRO, Influencer Marketing, Email Marketing, E-commerce Marketing
- NEW pages (URLs unchanged, routed to new components):
  - /services/digital-marketing/marketing-automation → MA_Page (src/pages/MarketingAutomation.jsx)
  - /services/digital-marketing/landing-page-and-cro → LP_Page (src/pages/LandingPageCro.jsx)
  - /services/digital-marketing/influencer-marketing → IN_Page (src/pages/InfluencerMarketing.jsx)
  - /services/digital-marketing/email-marketing → EM_Page (src/pages/EmailMarketing.jsx)
  - /services/digital-marketing/e-commerce-marketing → EC_Page (src/pages/EcommerceMarketing.jsx)
- NEW kit part 2: src/components/dm/kit2.jsx + src/styles/dm-kit2.css — DK_Status, DK_Tree, DK_DoDont, DK_Guide,
  DK_Pyramid, DK_Console, DK_Signals, DK_Anatomy, DK_Split, DK_Gap (generic versions of the ORM visuals + new ones).
  Shared rm- styles in online-reputation-management.css now support variable level/tier counts.
- Page visuals: lead-scoring model (MA), traffic→page hero, message match, form friction toggle, example heatmap,
  A/B versions, CTR explainer (LP), creator-tier spectrum and campaign brief board (IN), behaviour-branching drip (EM),
  profitability waterfall — shapes only (EC).
- DM_Form: new optional `msgLabel` requirement text box (sent as the enquiry message); `optional` steps used for
  platform / market / business model.
- Fixes: pyramid tiers now widest at the bottom (also ORM trust pyramid); chip flows inside heroes now visible.
- No team-member details, no invented results, no platform partnerships / certifications, no "free audit",
  location or course claims, no "Illustrative" labels. No dependencies added.

## 2026-10-06 · Build 27 — Online Reputation Management
- NEW page (URL unchanged, routed to new component):
  - /services/digital-marketing/online-reputation-management → RM_Page (src/pages/OnlineReputationManagement.jsx)
  - Styles: src/styles/online-reputation-management.css (prefix rm-)
- Custom visuals: reputation mirror hero (signals → public perception), reputation health framework
  (status-based, example only, no numbers), generic branded-search mock (labelled example), sentiment
  classifier, monitoring feed (labelled example), crisis console, response decision tree, impact/urgency
  priority matrix, "no empty promises" panel, trust pyramid, guide block, closing statement.
- Kit sections reused: statement, strip, shift, equation, system, loop, tabs, flow, engine, chips, converge,
  AI + human, compare, principles, orbit, timeline, streams, measure, report, matrix, cycle, cards, use cases,
  industries, case (example scenario), tools, FAQ (8), related, final CTA, form.
- DM_Form (shared.jsx): new `optional: true` chip option — the step can be skipped and is sent as
  "(not provided)". Used for the ORM monthly budget. Existing forms unchanged.
- No team-member details, no invented clients/ratings/rankings/results, no guarantees, no "Illustrative" labels.
- No dependencies added.

## 2026-10-06 · Build 26 — Video Marketing, WhatsApp Marketing
- NEW pages (URLs unchanged, routed to new components):
  - /services/digital-marketing/video-marketing → VM_Page (src/pages/VideoMarketing.jsx)
  - /services/digital-marketing/whatsapp-marketing → WA_Page (src/pages/WhatsAppMarketing.jsx)
- Kit additions (dm-kit.css / kit.jsx): DK_UseCases (industry use-case explorer), vm-film (film-strip marquee),
  wa-chat (animated example conversation; height reserved up front so there is no layout shift).
- Video: story-engine hero, Stop→Understand→Believe→Act, purpose orbit, B2B video types tabs, research→video system,
  funnel, platform matrix, video-ads test board, AI + human, responsible-AI principles, measurement layers,
  production vs marketing vs advertising compare, 8 FAQs, enquiry form (needs/goal/budget).
- WhatsApp: consent-first principles (links WhatsApp Business Messaging Policy), journey system, 7-layer stack,
  API chips (links Meta developer docs; no "free/unlimited/cheapest" claims, no provider named),
  provider vs strategy vs implementation vs management compare, campaign-types orbit, automation, CRM flow,
  cost-factor orbit (no prices; links official pricing page, notes pricing can change), 8 FAQs, enquiry form.
- No team-member details, no invented figures/clients/partnerships, no "Illustrative" labels.
- No dependencies added.

## 2026-10-06 · Build 25 — Social Media Advertising, Content Marketing, Performance Marketing, Lead Generation
- NEW pages (URLs unchanged, routed to new components):
  - /services/digital-marketing/social-media-advertising → SMA_Page (src/pages/SocialMediaAdvertising.jsx)
  - /services/digital-marketing/content-marketing → CM_Page (src/pages/ContentMarketing.jsx)
  - /services/digital-marketing/performance-marketing → PFM_Page (src/pages/PerformanceMarketing.jsx)
  - /services/digital-marketing/lead-generation → LGN_Page (src/pages/LeadGeneration.jsx)
- NEW section kit: src/components/dm/kit.jsx + src/styles/dm-kit.css (prefix dk-) — hero, orbit, streams,
  leak-repair funnel, system flow, engine, ladder, funnel, shift, AI+human, cards, compare, flow, loop,
  measurement, report, audit, cycle, converge, principles, case journey, tools, related, final CTA,
  budget allocation, test board, tabs, branch (retargeting), matrix, timeline, equation, chips, orbit section.
- Each page: one H1, title/description within limits, canonical/OG, Service + Breadcrumb + FAQPage JSON-LD,
  8 FAQs, 3 CTA moments, multi-step enquiry form (posts to /api/enquiry), no team-member details,
  no invented figures, no "Illustrative" labels, reduced-motion support.
- Blog: performance guide retitled to "Performance Marketing: From Marketing Spend to Measurable Growth"
  (URL /blog/performance-marketing-guide unchanged).
- Fix: SVG signal dots no longer flash at the corner before their animation starts (all pages).
- No dependencies added.

Build: `node scripts/build_dm.js stage1.html Frequent_Research_Website_25.html`
(stage1.html = build 22 with `scripts/remove_illus.py` applied).

## Build 24 — Social Media Marketing page; named team sections removed from SEO and PPC pages
## Build 23 — Google Ads / PPC page; "Illustrative" labels removed site-wide
