# 23 · Build 82.9: what changed and how to use it

Kunal's requests of 21 Nov 2026, built on build 82.8. The design and animations of every other page, the logo design,
one H1 per page and the celebration banner (10 seconds) are unchanged.

| # | Request | What was done | Where |
|---|---|---|---|
| 1 | Fix the logo everywhere | The dark-mode logo files had a broken leg on the silver "R". The white highlights were restored from the day logo. The design, letters and colours are unchanged, the logo stays fully transparent, and there is no plate. | `src/assets/images/brand26/fr-head26-dk.webp`, `fr-full26-dk.webp`, `brand13/fr-i-base-dk.webp`, `fr-f-base-dk.webp`; tool `tools/brand828/fix_r_leg.py` (originals in `tools/brand828/orig/`) |
| 2 | Option to remove the new client / new vendor onboarding forms from the whole website | Each form has its own switch in the super admin, **Onboarding links on the site → client / vendor → show: Yes / No**. When it is No, the card (home, Let's Talk, Scan & Connect) and the footer link disappear everywhere, and the other card fills the space. When both are off, the whole section goes. | `src/design82/Ob82.jsx` (`ob82On`), `components/site/Footer.jsx`, `admin/AdminApp.jsx` |
| 3 | Speed 100 on desktop and phone | The 7 Sampledge product pages now have a ready-made first screen, as every other page already had: their product hero (drawn in its own shadow root) is copied too. Phone scores went from 27 to 95–99 and desktop scores from 50 to 99 (see the table below). | `scripts/phone-shell.cjs`, `scripts/seo-pass.cjs` (fr-sh attaches the shadow root) |
| 4 | Full SEO with AI catalogs | `/catalog.json` (every service by team, Sampledge products and research panels), `/llms-full.txt` (the text of every page), an "AI catalogs" section in `/llms.txt`, AI search robots named and allowed in `/robots.txt` (`/api` and `/admin` stay closed), and a schema.org OfferCatalog on home, All services, the team pages and Products. | `scripts/ai-catalog.cjs` (step 4c of `npm run prerender`) |
| 5 | Meta Pixel on each page | The Pixel loader sits in every page's `<head>`, right after the Google tag. It sends a PageView on every page and on every page change inside the site. To keep the speed scores, the Facebook script loads about 1.5 s after the page has loaded. **It is off until the Pixel ID is set** (see below). | `index.html` (`<script id="fr-pixel">`), `scripts/prerender.cjs` (kept on every page), `scripts/set-pixel.cjs` |
| 6 | Google tag GTM-TDDKS62 on every page, right after `<head>` | It was already there, once per page. This was checked again on all pages. | `index.html`, `scripts/prerender.cjs` |
| 7 | Teen panel everywhere consumers and professionals are mentioned | See "Teen panel on the website" below. **The website shows information only and links to the existing Turn2Opinion and MyFrequentRewards teen pages. No sign-up, login or registration screens were built.** | see below |
| 8 | New attention-grabbing hero animations for the 3 panel portals | New full-width moving heroes, one story each (see below). | `src/design82/Portal829.jsx`, `portal829.css` |

## Turning the Meta Pixel on

1. In Meta Events Manager, copy the Pixel ID (a 15 or 16 digit number).
2. On the built website: `node scripts/set-pixel.cjs <PIXEL_ID> dist`, then `node scripts/compress.cjs dist`, then upload.
   This also writes the ID into `index.html`, so later builds keep it.
3. Check: open any page, wait 3 seconds, and use the Meta Pixel Helper (a Chrome extension) or Events Manager → Test events.

`node scripts/set-pixel.cjs "" dist` switches the Pixel off again. Note for the legal team: the site has no cookie
consent banner. In regions that require consent for advertising cookies (EU/UK), add one before turning the Pixel on.

## Teen panel on the website (information only)

The facts come from Kunal's Turn2Opinion and MyFrequentRewards teen material (`/mnt/project-files/build82.9/teen-panel-context.md`):

- Ages 13 to 17 can join with a parent or legal guardian's permission.
- Under 13 cannot join. From 18, the normal consumer or professional sign-up applies.
- A date of birth from 13 to 17 switches any sign-up to the teen route.
- Studies are age-appropriate only.
- The parent chooses how rewards are paid out.
- No school, address or photos are asked for.

Where it now appears:

- **Turn2Opinion and MyFrequentRewards pages:**
  - In the new hero ("Consumer, Business & Teen Research Panel", the "Made for" line, a Teens 13–17 chip).
  - In a new **Teen panel section**, with a "Teen Panel" tab in the page menu. The section covers:
    - What teen studies are about.
    - The 6 steps: the teen signs up, the parent or guardian is added, consent, the parent's Yes/No email, the teen sets a password, and the welcome survey.
    - 6 safeguards.
    - A button to the existing teen page (turn2opinion.com/teen/, myfrequentrewards.com/paid-surveys-for-teens).
  - Also in the "Who it is for" strip, the trust row, the FAQs ("Can teenagers join?"), the features, the links, the page titles and the descriptions.
- **Home page, "Join our research panels":** a new **Teen** tab with its own animation and steps, pointing to both teen pages.
- **Portals page** intro and hero tags.
- **Panel data:** `PORTALS` in `src/app/data/site.jsx` now has `audience`, `audiences`, `teen`, features and FAQs.
- **Pages:**
  - About us panel cards.
  - About / Our reach panel text.
  - Market research hub ("Teen Panel").
  - Recruitment & data collection audiences.
  - Qualitative audiences.
  - Online data collection panel list.
  - Quality page panel cards and FAQ.
  - Scan & Connect panel cards.
  - The home hero motto for market research.
  - The page video description for MyFrequentRewards.
  - The chat assistant's answer about panels.
- **Not changed, on purpose:** history pages (the 2017 launch), the privacy policy, legal text, and MyHealthOpinions (it has no teen panel).

**Super admin note:** if someone has saved their own copy of the Portals content in the super admin (Content → portals), that saved copy wins on the live site. Open it once and add the teen lines, or delete the saved copy so the new built-in text shows.

**Other languages:** the new teen text shows in English until the language dictionaries (`src/i18n/dict/*.json`) are updated.

## The new portal heroes

| Portal | Story | Look |
|---|---|---|
| Turn2Opinion | "Opinion engine". A consumer (Priya), a professional (Daniel) and a teen with a parent's yes (Aarav) send answers into a spinning 3D "2" core with tilted orbit rings. New products pop out, points rise and a reward unlocks. | Night navy with an electric blue, violet and cyan aurora and a moving perspective grid. Space Grotesk headline "Say it. Shape it. Get rewarded." whose words flip up in 3D, then a light sweep. |
| MyFrequentRewards | "Reward vault". Survey invitations fly in, coins rise, a gold ring fills to the $15 threshold, the vault wheel turns, "Threshold reached" appears, and confetti falls. The profile card shows Consumer, Business and Teen 13–17. | Sunset amber, magenta and plum with rotating sun rays. Headline "Every opinion pays." whose letters drop in with a bounce, then a gold glint runs across them. |
| MyHealthOpinions | "Pulse of care". An ECG line runs across the whole hero, a beating heart draws its own ECG, a DNA helix moves, and the five voices (physician, nurse, pharmacist, patient, caregiver) circle it. A clinical-study card shows live vitals. | Clinical pearl with coral and teal, and a deep teal night in dark mode. Italic Fraunces headline "Every voice in care, heard." uncovered by a scan line, with "heard." beating. |

All three:

- Keep the breadcrumb, the logo plate, the join and researcher buttons, and one H1 (panel name plus headline).
- Show a rotating "Made for …" line.
- Work in day and night modes and play the same animations on phones.
- Move only by transform and opacity, and respect reduce-motion.
- Put their CSS on the page themselves, so the site stylesheet does not grow.

## Speed after this build (Lighthouse 12, local test machine, Google tag blocked)

See the table in the delivery message. On the live server, scores also depend on HTTP/2, compression and the CDN
(`21-SEO.md`, off-site items).
