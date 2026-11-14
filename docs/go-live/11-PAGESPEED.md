# 11 · PageSpeed (Lighthouse) scores (build 82.6)

Builds 74 to 76, 7 and 8 November 2026. Kunal asked for 100 in every PageSpeed category on desktop and mobile, 3/3
in the AI (Agentic Browsing) check, and every performance figure green.

## Build 82.3 check (13 November 2026, local Lighthouse, same settings as PageSpeed Insights)

| Page | Phone performance | Desktop performance | Accessibility | SEO |
|---|---|---|---|---|
| Home | 94 (LCP 3.1 s, TBT 20 ms, CLS 0) | 100 (LCP 0.7 s) | 100 | 100 |
| A service page (CATI) | 83–91 (LCP 3.1 s, CLS 0–0.10) | 99 (LCP 1.0 s) | 100 | 100 |
| Our Team | 98 (LCP 2.2 s, TBT 100 ms) | 100 (LCP 0.5 s) | 100 | 100 |
| Sampledge product sites | 29–39 | about 63 | 100 after this build's fixes (two read 97 when the test catches a fade-in) | 100 |

- Best practices reads 93–96 here only because this test machine has no API and no internet for the Google tag, so
  the browser logs "failed to load" errors. On the live server with the API running it should be 100 (as in build 76).
- Phones now run the same animations as desktop (Kunal, 11 Nov). That costs phone performance on the home and service
  pages (from about 100 to 83–98). 100 on phones is not reachable with full desktop animations on a phone.
- The Sampledge product sites are separate full apps with 3D and many animations, and they load whole (no ready-made
  first screen). They are the slowest pages; making them fast needs a lighter first screen per product, which is a
  separate piece of work.

## Scores measured on build 76 (home page, Lighthouse 13.6, the same settings as PageSpeed Insights)

| | Performance | Accessibility | Best practices | SEO | AI (Agentic Browsing) |
|---|---|---|---|---|---|
| Mobile | 100 (99–100 most runs) | 100 | 100 | 100 | 100 (3/3) |
| Desktop | 100 | 100 | 100 | 100 | 100 (3/3) |

Mobile figures: FCP 0.9–1.0 s, LCP 0.9–1.0 s, CLS 0–0.002 (green in every run); TBT 40–130 ms in most runs (green), one run in five on this test machine had a 480 ms spike.
Desktop figures: FCP 0.3 s, LCP 0.3 s, TBT 0–50 ms, CLS 0.002, Speed Index 0.3–0.4 s (all green in every run).

Before build 74 (Kunal's screenshot): mobile performance 36, accessibility 89, best practices 96, SEO 100, AI 1/3.

## How the home page starts (builds 75 and 76)

- The home page opens with a ready-made, still copy of its first screen (menu bar, hero, bottom bar or tabs, floating
  buttons), written into `index.html` with only the styles it needs. It appears in about a second on a phone and at
  once on a computer, without waiting for the site's script.
- The full site starts as soon as the visitor touches the screen, moves the mouse, clicks, types or scrolls with a
  wheel, and replaces the copy with the real page, which looks the same. A button tapped on the copy (menu, chat,
  language…) is tapped again on the real page.
- **Phones** (up to 767 px): the hero stays still (no automatic slide change, the "We do" word stays on one service,
  the hero picture's loops stop once its cards are in) and there is no intro splash.
- **Desktop**: every animation, the 3D hero and the intro splash are as before; they start with the full site, on the
  first mouse movement.
- The celebration banner appears with the full site and keeps its 10 seconds.
- Visitors who read the site in another language start as before.

The copies are made by `frontend/scripts/phone-shell.cjs` during `npm run release` (a phone copy at 412 px and a
desktop copy at 1350 px). When the home page's first screen changes, the next release makes new copies by itself.

## Every page starts the same way (build 80.1, Kunal 11 Nov 2026: "every page incl. blogs")

- All 986 other pages (services, platforms, All services, blog list and every blog post, About, Let's talk, portals,
  government, legal…) now open with their own ready-made still copy of the first screen, the same way as home. The
  headline and hero show at once; the moving pictures start on the first touch, mouse move, key or wheel.
- Only what is drawn in the first screen is copied; the web fonts the headline uses are preloaded so it does not jump.
- Left as before: the admin, the 404 page and the 9 Sampledge product site pages (the 7 products, /products/sampledge
  and /products/panel-audience-marketplace), which are drawn inside a shadow root and cannot be copied.
- The copies add about 1 hour to `npm run release` (5 pages at a time; `FR_SHELL_WORKERS` sets how many).
  `FR_SHELL_ONLY=/a,/b node scripts/phone-shell.cjs dist` remakes the copies of chosen pages only.
- Test on a server that maps `/page` to `/page/index.html` (nginx `try_files $uri $uri/ /index.html`). `vite preview`
  does not: without a trailing slash it serves the home file, so test it with `/services/…/` and restart it after a
  release (it keeps old file sizes).

| Test machine, build 80.2 | Phone | Desktop |
|---|---|---|
| Home | 85–91 | 97 |
| A service (CATI) | 87 | 98 |
| A platform (Digital Marketing) | 90 | 98 |
| All services | 89 | 100 |
| Blog list | 94 | 100 |
| About us | 75 | 99 |
| A Sampledge product (SampCode) | 33 | 52 |

Before build 80.1 the inner pages were about 36–45 on phones and 58–70 on desktop. The live site with brotli and a CDN
usually scores higher than this test machine; measure it there (below).

## What reached 100 on both (build 74)

- Accessibility: every button and tab has a name that matches its visible words; tap targets are at least 24 px; the
  turning industry sphere has a real list of links behind it; no hidden blocks hold links; contrast fixed.
- Best practices: no console errors (the backend answers "no admin calendar" with 200, not 404); source maps ship.
- SEO: already 100.
- AI check 3/3: the accessibility tree is clean, layout shift is near zero, `llms.txt` is in place.

## Google tag (build 77)

The Google tag (GTM-TDDKS62) is the first thing in `<head>` on every page and loads `async`, so it does not hold up
the first paint. What it costs depends on the tags set up inside the GTM container: an empty container or one GA4 tag
usually costs a few points of mobile performance (total blocking time) and nothing on desktop; chat widgets, heat maps,
ad pixels or many tags cost more. If the mobile score drops after go-live, check which tags in the container fire on
"All Pages" and set the heavy ones to fire on "Window Loaded" instead. The tag cannot be measured from our test
server (Google's servers are not reachable there), so measure it on the live site.

## How to test it properly

- Test the **live site** (https://www.frequentresearch.com) on https://pagespeed.web.dev/ once the backend is running.
  A preview or a test without the backend shows console errors and waits for the content API, which lowers scores.
- Run each test 3 times and take the middle score: mobile performance moves between 98 and 100 from run to run
  (PageSpeed's own servers vary).
- Test in a private window with no browser extensions.

## Server settings that matter

- **Caching.** The hashed files in `/assets/` are kept for a year (`immutable`), pictures, fonts and videos for 30
  days. In nginx this is in `frontend/nginx/default.conf.template`; on Apache/cPanel the `.htaccess` in the deploy zip
  does it (needs `mod_headers`, `mod_expires`, `mod_rewrite`). `index.html` must not be cached long (it is not).
- **Compression.** The build ships ready-made `.br` and `.gz` copies. nginx serves them with `gzip_static`/`brotli_static`
  where available; the `.htaccess` serves them with rewrite rules.
- **HTTP/2 or HTTP/3** on the live server (most hosts and Cloudflare do this already).
- A CDN such as Cloudflare in front of the site shortens the server response time, which helps both scores.
