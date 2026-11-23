# 22 · "Watch this page in one video" section (build 82.8)

Kunal (21 Nov 2026): at the bottom of **every** page, a section that presents the page's YouTube video, asks visitors
to watch the whole video for the clearest picture, and to like, subscribe, follow and share. Every page's section
looks different.

## What visitors see (just above the footer, on all 995 pages)

1. **Top:** a red YouTube pill with a live dot, an animated headline that names the page ("Watch the whole of
   Our Reach in one video", "No time to read it all? Watch it instead." …), a short line on why to watch to the
   end, three reasons ("The whole page in one video", "Easiest way to understand it", "Plays on any screen") and a
   moving 3D object.
2. **The video**, in the page's own design from the Page video component (the same 995 unique designs as
   Super admin › Pages › Page video component: frame, live card, scene, colours, HD YouTube cover picture). It plays
   in place (youtube-nocookie, only after the visitor presses play).
3. **Two big buttons:** "Watch the full video on YouTube" and "Subscribe to our channel", and the line "Watch it to
   the end: the last part shows what to do next".
4. **Four action cards:** Like (opens the video on YouTube), Subscribe (channel with the subscribe prompt), Follow
   (LinkedIn, Facebook, Instagram, X), Share (phone share sheet; on computers WhatsApp, LinkedIn, Facebook, X,
   e-mail and copy link, all sharing the YouTube video link).

## A different design on every page

Around the player (which is already unique per page) each page gets its own combination of:

| Part | Choices |
|---|---|
| Animated backdrop | aurora, stars, 3D grid floor, rings, light beams, waves, bokeh, colour mesh, world map with pins, prism stripes, ribbons, comets (12) |
| Headline animation | sweep underline, rise, outline, split, neon, ribbon, typewriter, flip (8) |
| Headline font | Unbounded, Instrument Serif, Manrope, Inter, JetBrains Mono (5) |
| Action deck | cards, orbit arches, tickets, rail, fanned stack, colour tiles (6) |
| 3D object | YouTube cube, extruded play button, gyroscope, film reel, thumbs-up, bell, clapperboard, retro TV (8) |
| Wording | 10 different headline + eyebrow + line sets |

Colours come from the page's own palette (WCAG-checked in the Page video component). No two of the 995 pages share
a combination, and each choice is used about equally (`frontend/scripts/make-watch-data.cjs`).

## Which video plays

1. The video set for the page in **Super admin › Pages › Page video component** (`GET /api/v1/page-videos?page=…`).
   Design changes made there also show here.
2. Otherwise the video of the page's red YouTube button (**Super admin › Page videos**: the page's own link, else
   its parent page's, else the home video).

So adding or changing a video needs no code: paste the YouTube link in the super admin.

## Speed and SEO

- Nothing loads for the first screen. The section's script (11 KB compressed), its styles (inside that script) and
  the player (20 KB) load 1.5 s after the page has loaded and only when the visitor scrolls near the bottom. The
  site stylesheet and first-screen copies are unchanged; the main script grew by about 0.3 KB.
- Loops animate only transform and opacity, stop while the section is off screen, and stop for "reduce motion".
  Phones get the same animations as computers (one column).
- One H1 per page is kept (the section uses H2/H3). The section is left out of the search-engine copy of each
  page (`prerender.cjs`), so 995 pages do not repeat the same text.

## Files

- `frontend/src/design82/Watch828.jsx`, `frontend/src/design82/watch828.css` (prefix `w828` / `w8-`)
- `frontend/src/app/SiteApp.jsx` (`WatchSlot`, between the page and the footer)
- `frontend/scripts/make-watch-data.cjs` → `frontend/public/data/pv/<page>.json` (995 small files; "home" for `/`,
  other paths with `/` written as `--`). Run it again after the page list or
  `backend/src/data/page-video-templates.json` changes.
- `frontend/src/assets/images/w828/` (flags and world map pictures for the player)
- Player: `frontend/src/admin/pagevideo-player.js` (same file as `backend/src/public/fr-page-video.js`).
