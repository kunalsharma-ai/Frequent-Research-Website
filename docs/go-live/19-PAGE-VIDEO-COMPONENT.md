# 19 · Page video component: designs, super admin and API (build 82.6)

Build 82.4 called this the "Video web component". In build 82.5 it is renamed **Page video component** and every page
of the website has a **video design of its own**. Everything is managed in the super admin; the website only needs two
lines (section 3). The old addresses (`/api/v1/web-videos…`, `/admin/web-videos`) still answer exactly the same, so
nothing built on 82.4 breaks.

## 1. What is new in 82.6: the showcase style (like the Turn2Opinion video window)

Every page's video now uses the **showcase** style Kunal chose (13 Nov): the words on one side and the video in a
frame on the other, like the Turn2Opinion video window.

- **Left (or right): the words.** A pill with the YouTube mark and the page's label; a big headline with an
  **italic second line** in the accent colour (e.g. "Share your opinion. *Get rewarded.*"); a short description;
  **numbered steps (01, 02, 03) with moving bars**; a big number and country flags; a main **button** (e.g. "Join
  Turn2Opinion", "Get a proposal", "Request this panel") and a red **Subscribe** button to the YouTube channel.
- **The video in a frame:** 17 frames (speech bubble, tablet, laptop, TV, browser, phone, polaroid, film strip,
  scanner corners, gift ribbon, social post, cinema ticket, case-file folder, neon glow, stacked cards, glass panel,
  theatre curtains). Inside, your video's own HD picture (YouTube thumbnail) with a big red play button and a caption;
  before a video is added, a designed screen: big headline in three colours, small tags, the brand badge and a
  moving 3D object.
- **A live card beside the frame:** 15 kinds (survey question, rising chart, chat, ledger, calendar, star rating,
  score gauge, code editor, sales funnel, security shield, checklist, pie chart, search results, social post,
  filed return), chosen to fit the page.
- **Every page different:** no two of the 995 pages share the same frame, live card and animated scene; colours follow
  the page's subject; about one in three pages puts the video on the left.
- **Phones:** the video comes first, then the words and full-width buttons; same animation.
- The video plays **inside the frame** (YouTube, Vimeo, MP4 or an uploaded file).
- New design fields (editable in the super admin): frame, live card, italic second line, big words on the video
  screen, small tags, button words and link, Subscribe on/off. The 12 older layouts (cinema, split …) are still
  available for any page.

### Build 82.5 (still true)

- **995 page designs, all different.** Each page of the website got a video design made from that page itself: its
  headline, short description, key points, a number from the page (e.g. "55 countries"), icons that match the topic,
  the flags of the countries the page talks about, and colours that suit its subject (finance greens, healthcare teals,
  technology violets, and so on). No two pages share the same combination of layout, animated scene and 3D object.
- **12 layouts:** cinema, split, split reversed, center, card, poster, magazine, orbit, ticker, window, stack, spotlight.
- **16 animated scenes:** aurora, particles, grid, waves, bubbles, light rays, hexagons, world map, stars, ribbons,
  bokeh, circuit, pulse, rings, mesh, bars.
- **10 moving 3D objects:** globe, cube, gyroscope, 3D chart, slabs, coins, phone, document, pyramid, atom.
- **75 icons**, all country flags, 3 movement speeds (calm, lively, bold), light and dark tones.
- **Readable by design:** every palette is checked for text contrast (WCAG AA, 4.5:1); the admin warns if a change
  makes text hard to read. Phones get the same animation; people who ask their device for less motion get still
  pictures. Text is never clipped: long headlines get smaller type and line limits.
- **A ready-made player** (`player.js`, about 60 KB, no other files needed) that draws the design and plays the video
  (YouTube, Vimeo, MP4 or an uploaded file) in place.

## 2. The super admin screen

Super admin › Pages › **Page video component** (address `/admin/page-videos`; the old `/admin/web-videos` opens it too).
Rights: area "Pages, sections & page texts" (view to look, edit to change, publish to change the generic settings).

| Tab | What it does |
|---|---|
| **Pages & videos** | Every page with its video: link, title, description, generic template, icon, poster, on/off and custom fields. Shows a live preview of the page's design with the video. Search, filter, Export CSV, Import CSV/JSON, add new page URLs. |
| **Page designs (995 templates)** | Every page's own design as a live, moving preview. Filter by kind of page, layout, scene, 3D object, or "changed by an admin". Click a design to open the design editor. |
| **Generic templates, icons & custom fields** | The template ids, icons and extra fields shared by all pages (as in 82.4). The first template, `page` = "This page's own design", is the default. |
| **Connect the website & API** | The two lines for the website, every endpoint, an example answer, and a live "Try it". |

### The design editor (one page)

Opened from a design card or from "Change this page's design" in a page's video editor. Live desktop and phone
previews update while you type.

- **Look:** layout, frame around the video, live card, animated scene, 3D object, movement speed, light/dark tone.
- **Colours:** background 1 and 2, headline, text, accent, accent 2, glow (colour pickers).
- **Words:** small label, headline, italic second line, big words on the video screen, button words and link, play
  button words, big number and its words, short description, small tags on the video screen, steps (3 shown),
  Subscribe button on/off.
- **Icons:** pick up to 6. **Flags:** two-letter country codes (IN, US, GB …).
- **HD picture (optional):** an `https://` link or an uploaded file; used by picture layouts. Empty: the picture of
  the video itself (YouTube's HD thumbnail) is used. **Alt text** for that picture.
- **Save design:** only what you changed is stored; the website shows it within a minute.
- **Back to the generated design:** removes your changes for that page.

Words shown in the showcase design: the headline, italic line, description and steps come from the design; the video's
own title appears as the caption on the video screen.

## 3. Connect the live website (two lines)

Put these on the page template where the video should appear (for example after the first section):

```html
<script src="/api/v1/page-videos/player.js" defer></script>
<fr-page-video></fr-page-video>
```

That is all. The player looks up the page it is on, gets its video and design, and draws it. When a page has no video
yet, nothing is shown (no empty box, no layout shift).

Options on the tag:

| Attribute | Example | What it does |
|---|---|---|
| `page` | `<fr-page-video page="/about-us">` | Show another page's video and design. |
| `always` | `<fr-page-video always>` | Show the design even before a video is added (play button greyed out). |
| `api` | `api="https://www.frequentresearch.com/api/v1/page-videos"` | Only when the script runs on another domain. |
| `compact` | `<fr-page-video compact>` | Smaller height, for narrow side columns. |

Styling from the page: `fr-page-video { --fr-pv-font: "Inter", sans-serif; max-width: 1100px; margin: 40px auto; }`.
The player sends the event `fr-video-play` (with `detail.page`) when someone plays a video, e.g. for Google Tag Manager:
`document.addEventListener('fr-video-play', e => dataLayer.push({ event: 'page_video_play', page: e.detail.page }))`.

## 4. Public API

Base: `https://www.frequentresearch.com/api/v1`. No sign-in, read-only, CORS open, answers cached 60 seconds.

| Call | Answer |
|---|---|
| `GET /page-videos/player.js` | The ready-made player (cached 5 minutes). |
| `GET /page-videos/flags.webp`, `/page-videos/world-dots.webp` | Pictures the player uses (cached 30 days). |
| `GET /page-videos?page=/about-us` | `{ ok, page, video, template }`; `video` is `null` when the page has none or it is switched off. |
| `GET /page-videos` | `{ ok, count, videos: [ … ] }`: every page with a live video. |
| `GET /page-videos/templates` | Every page's design (summary); `?page=/x` for one design in full. |
| `GET /page-videos/config` | Generic templates, icons, custom fields, and `design`: layouts, scenes, 3D objects, icons, movements. |

Example answer:

```json
{
  "ok": true,
  "page": "/about-us",
  "video": {
    "page": "/about-us", "url": "https://www.youtube.com/watch?v=…", "title": "About Frequent Research",
    "description": "Who we are, in two minutes.", "template": "page", "icon": "play", "poster": "",
    "custom": { "ctaText": "Watch now" }, "updatedAt": "2026-11-13T10:18:51.683Z"
  },
  "template": {
    "id": "pv-about-us", "layout": "showcase", "scene": "stars", "object": "globe", "motion": "lively",
    "palette": { "tone": "dark", "bg1": "#0b1b2d", "bg2": "#301268", "ink": "#ffffff", "muted": "#c3d1df",
                 "accent": "#3678f2", "accent2": "#f14ba4", "glow": "#a356fb" },
    "kicker": "Frequent Research", "headline": "We turn questions into growth.", "subline": "", "tagline": "…",
    "points": ["…", "…"], "stat": { "value": "55", "label": "countries" },
    "icons": ["users", "globe", "handshake"], "flags": [], "cta": "Meet us on video", "image": "", "imageAlt": "",
    "frame": "ticket", "prop": "chat", "em": "Meet the people behind the answers.", "screenText": "",
    "chips": ["55 countries", "Since 2015", "On video"], "subscribe": true, "link": { "label": "Let's talk", "to": "/lets-talk" }
  }
}
```

Your own component instead of the ready-made player: read the same answer and draw it yourself. Always set text with
`textContent` (never `innerHTML`) and only use `video.url` as a video source or link.

## 5. Admin API (signed-in, same rights as the screen)

| Call | What it does |
|---|---|
| `GET /api/v1/admin/page-videos?q=&has=with\|without&skip=&limit=` | all pages with their videos |
| `GET/PUT/DELETE /api/v1/admin/page-videos/item?path=/about-us` | one page's video: read, save `{ video, custom, enabled }`, remove |
| `GET /api/v1/admin/page-videos/templates?q=&layout=&scene=&object=&family=&edited=yes&skip=&limit=` | every page's design |
| `GET/PUT/DELETE /api/v1/admin/page-videos/templates/item?path=/about-us` | one design: read, change (send any template fields), back to generated |
| `POST /api/v1/admin/page-videos/import` | `{ rows: [ { path, url, title, description, template, icon, poster, enabled, <custom keys> } ] }` |
| `GET /api/v1/admin/page-videos/export` | CSV (`?as=json` for JSON) |
| `GET/PUT /api/v1/admin/page-videos/settings` | `{ settings: { templates, icons, fields } }` |
| `POST /api/v1/admin/page-videos/pages` | add new page URLs `{ pages: [ { path, title } ] }`; each gets its own design at once |

Every change is written to the activity log (`page-video.save`, `page-video.template`, …).

## 6. Where it lives (code)

| Part | File |
|---|---|
| All endpoints | `backend/src/routes/pageVideos.js` (rights in `backend/src/lib/access.js`) |
| The design generator | `backend/src/lib/pageTemplates.js` (layouts, scenes, objects, icons, palettes, checks) |
| The 995 designs | `backend/src/data/page-video-templates.json`, made by `node backend/tools/make-page-video-templates.js frontend/dist` after a full website build |
| The player | `backend/src/public/fr-page-video.js` (+ `flags-sprite.webp`, `world-dots.webp`); an identical copy is `frontend/src/admin/pagevideo-player.js` for the admin previews (a test checks they match) |
| Admin screen | `frontend/src/admin/WebVideos.jsx` |
| Database | `web_videos` (videos, `_id` = path), `web_video_settings` (generic settings, added pages), `page_video_templates` (admin changes to designs; only the changed fields) |
| Tests | `backend/test/webvideos.test.js` |

To regenerate all designs after many new pages: run a full website build (`npm run release` in `frontend/`), then
`cd backend && node tools/make-page-video-templates.js ../frontend/dist`. Admin changes are kept (they are stored
separately). Pages added in the admin in between get a unique design on the fly.
