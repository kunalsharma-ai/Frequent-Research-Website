# 25 · Build 83.1: SampConnect, new footer, panel sections removed

This build answers Kunal's brief of 21 Nov 2026, "Complete Website Redesign, Product Integration & Performance
Optimization". Build 83.1 is built on build 83.

The design, logo, animations, one H1 per page and the 10-second celebration banner are unchanged. This follows the standing rule.

## What changed

| Where | What |
|---|---|
| **New page `/products/sampconnect`** | A product page made from the SampConnect showcase. It was rebuilt in the site's own design, not pasted. Sections: hero (logo, badge, demo and tour buttons, real screenshot with live cards and a rotating greeting in several languages, 6 numbers), sticky section menu, Why SampConnect (7 pillars), Product tour (6 tabs with 30 real screens), Calls and meetings, Offline and sync, Client inbox and Cross-org network (both marked "Coming soon", as in the source), the 7 Sampledge modules (each links to its product page), Private AI, Branding and themes, iPhone and Android, Security and trust (9 points plus integrations), How it works (6 steps), Who it is for, the comparison table, Everything inside (88+ capabilities, filterable) and a final call to action. All screens use the fictional demo workspace, and the page says so. |
| **Products menu (header)** | The "All 7 together" tile is replaced by a **SampConnect** tile with its logo and a "New" badge. |
| **Products page and home Sampledge section** | A SampConnect spotlight band (logo, three numbers, "Explore SampConnect"). |
| **Footer** | A new row with two cards: **SampConnect** (logo, line and link) and **YouTube** (red icon, "Open our channel", and "Watch this page's video", which scrolls to the video section). The footer product list also gained SampConnect. The channel link comes from the same social data as the Follow icons, so there is one place to change it. |
| **YouTube video on every page** | The "Watch this page in one video" section from build 82.8 is already at the bottom of every page, including T2O and MFR. SampConnect now has its own entry, with an **empty URL** in the code. The video is set in **Super admin → Page videos → SampConnect**. No video URL was added to the code. |
| **Panel sections removed** | The "Consumers · Professionals · Teens" cards are gone from Turn2Opinion, MyFrequentRewards and Portals. The 9 market research "who takes part" blocks are gone, and so are the header menu entry and the home "Join our research panels" switcher. The Portals page and its menu stay (Kunal's choice). The teen guide, consent, quality, FAQ and comparison stay on the T2O and MFR pages, so no information is lost. T2O shows its earlier "Two research audiences" block again. |
| **Fixes** | On phones, the floating cards on the SampConnect hero no longer overlap. Section links stop below the sticky menu. In dark mode, the section menu is no longer see-through. |

## Not done yet

- **Turn2Opinion and MyFrequentRewards redesign** (hero, overview, consumer, business and teen journeys, features,
  process). Only the SampConnect HTML arrived with the brief. This waits for the two HTML files.
- The SampConnect video URL must be set in the super admin.

## Files

- `src/design83/sampconnect/`: `SampConnect83.jsx` (page), `sc-data.js` (all wording, from the showcase), `sc83.css`,
  `ScMark.jsx` (logo mark and wordmark), `ScSpot.jsx` (spotlight band).
- `src/assets/images/sampconnect/`: 30 screenshots (WebP, lazy-loaded except the hero).
- Edited: `pages/Products65.jsx`, `components/site/Sampledge8.jsx`, `components/site/Footer.jsx`, `styles/footer.css`,
  `app/pages/T2OPage.jsx`, `MFRPage.jsx`, `PortalsPage.jsx`, `app/SiteHeader.jsx`, `app/home/HomePage.jsx`, the 9 service pages,
  `data/PageVideos69.jsx`, `backend/src/data/site-pages.json`.

## Checks (full rebuild of all 996 pages, none skipped)

| Page | Phone | Desktop |
|---|---|---|
| SampConnect | 91–94 | 100 |
| Products | 91 | 100 |
| Portals | 91 | – |
| MyFrequentRewards | 93 | – |
| Turn2Opinion | 96 | 100 |

Accessibility and SEO are 100 on every page tested. Best practices shows 96 only because the test server has no backend
(`/api/v1/site` answers 404 there). Page jumps were fixed on the SampConnect hero (phone 0.20 → 0, desktop 0.10 → 0.04) and on the
Products hero on desktop (0.13 → 0.03). All internal links lead to real pages.
