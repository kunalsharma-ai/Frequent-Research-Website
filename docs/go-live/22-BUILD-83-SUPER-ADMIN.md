# Build 83: Super Admin additions (page videos, testimonials import, gallery, all pages)

Requested by Kunal on 16 Nov 2026. Everything here is an **addition**. No existing document was changed, no backend
file was changed, and no database change or migration is needed. Existing content saved in the Super Admin keeps working.

Contents

1. [What is new](#1-what-is-new)
2. [What is in the delivery folder](#2-what-is-in-the-delivery-folder)
3. [How to upload and deploy](#3-how-to-upload-and-deploy)
4. [Applying on top of build 82.7](#4-applying-on-top-of-build-827)
5. [Checks after deploying](#5-checks-after-deploying)
6. [How to undo](#6-how-to-undo)
7. [Using the new features](#7-using-the-new-features)
8. [Video template file format (.json)](#8-video-template-file-format-json)
9. [Every file, and why it changed](#9-every-file-and-why-it-changed)

---

## 1. What is new

| Ask | What was done |
|---|---|
| **Page videos for every page** | Super Admin › Page videos now lists **every page of the website (397)**. That includes the main pages, services, products, portals, 148 panel country pages (consumer, B2B/professional and healthcare), industries, blog posts and legal pages. Each page gets its **own design**, made by a **design generator** rather than drawn by hand. The generator combines 32 colour palettes (or the country's flag colours), 34 local patterns, 10 video frames, 4 layouts, 5 fonts, 4 styles of highlights, 8 colour grades, 6 illustrations, icons and 4 music moods, and picks a different mix for each page. All of them follow the Consumer Panel screenshot format: words, numbered points with bars, Request a quote and Subscribe on the left; on the right, a framed video poster with the logo card, a number badge, a tag, a big headline, a red play button and an illustration. Panel country pages use their own flag colours, local patterns (for example seigaiha waves for Japan, mandala for India, kente for Kenya), a local greeting, city names, the panel size and a music scale from that region. A page without a video plays its own **animated video** (5 scenes, about 20 seconds, with music). |
| **Import a video template from outside** | Page videos › **Import video template** accepts four kinds of file. A template file (.json) adds a design that can be used on any page. A video (MP4/WebM) is uploaded and set for the open page. A picture is set as the open page's cover. An Excel/CSV list of pages and video links sets many pages at once. **Export templates** saves all designs to a .json file that can be imported again. |
| **Testimonials import added a "variable" to client names** | Fixed. The old import added a random suffix to any name that was already in the list (for example "Rahul Mehta-k3f"). It also dropped service names it did not know, like "Digital Marketing" or "IT", so those reviews fell back to market research. Names are now kept exactly as typed. A row that is already in the list (same client, same review) is skipped instead of renamed. Services are recognised from any common spelling. Ratings like "4.5/5" or "★★★★★" are understood. Excel's hidden line-break codes (`_x000D_`) are removed. A one-click button removes the codes earlier imports left on names. |
| **Gallery photo alignment** | The website gallery now lays photos out in **justified rows**. Every photo keeps its own shape, rows are filled edge to edge with no gaps or stretched crops, and one or two photos are centred. On phones there are 2 to 3 photos per row. For each photo, the Super Admin can choose what stays in view (click a point on the photo) or show the whole photo. **Many photos at once** uploads a batch into a section. |
| **All web pages in the Super Admin** | New menu item **Pages › All website pages**: a searchable directory of every page, grouped as on the site. Each page has buttons for View, Content & sections, Page video, SEO, Edit on the page, and the data behind it (products, panel numbers, case studies, blog post, legal text and so on). Pages & sections now also lists every page. |

## 2. What is in the delivery folder

`super-admin-build83/` in the project files:

| File | What it is | Who uses it |
|---|---|---|
| `DEVELOPER-GUIDE.md` | This guide | Developer |
| `frequent-research-build83-source.zip` | The whole project (frontend, backend, docs, docker-compose), build 83, without `node_modules` | Developer: the simplest way to deploy |
| `changed-files/` | Only the 20 files that are new or edited (19 code files and the guide), at their real paths (`frontend/src/...`). Copy over the project to upgrade | Developer: upgrading an existing checkout |
| `build83-edits.patch` | The small edits to the 6 existing files as a unified diff | Developer: applying onto 82.7 (section 4) |
| `CHANGED-FILES.md` | The list of every new and edited file, with the reason | Developer / reviewer |
| `frontend-dist-build83.zip` | The built website (`dist/`) for a server that serves static files without Docker | Developer, optional |
| `sample-files/` | A sample video template (.json), a sample testimonials CSV and a sample page-video list (.csv) | Kunal / content team |

## 3. How to upload and deploy

Only the **frontend** changed, so only the frontend container needs a rebuild. The backend and MongoDB keep running.

### A. Docker Compose (how the live site runs)

```bash
# 1. on the server, in the project folder (back it up first)
cp -r frequent-research frequent-research-backup-82

# 2. copy the build 83 files in (either one)
unzip -o frequent-research-build83-source.zip -d .        # the whole project, or
cp -r changed-files/frontend/. frequent-research/frontend/ # only the new and edited files

# 3. rebuild and restart only the website container
cd frequent-research
docker compose build frontend
docker compose up -d frontend
```

The first build takes about 25 to 30 minutes because it pre-renders one HTML page per route. For a quick test build,
use `docker build --build-arg PRERENDER=0 -t fr-frontend ./frontend`.

`.env`, `docker-compose.yml`, the backend and the database are untouched, so don't overwrite `.env`.

### B. Without Docker (static files)

```bash
cd frontend
npm ci
npm run release        # or: npx vite build   (quicker; no pre-rendered pages)
# upload frontend/dist/ to the web server, replacing the old files
```

Alternatively, unzip `frontend-dist-build83.zip` and upload its contents. That is a quick `vite build` without the
pre-rendered SEO pages, so for production `npm run release` is better. Keep the nginx rules from
`frontend/nginx/default.conf.template`: every path serves `index.html`, and `/api/` goes to the backend.

### C. Upload sizes for videos

Uploaded videos go through the existing file API. Its limit is `UPLOAD_MB` (default **20 MB**), and nginx allows
25 MB on that route. For longer videos, either use a **YouTube or Vimeo link** (recommended: faster for visitors),
or raise both limits: set `UPLOAD_MB=200` in `.env` and raise `client_max_body_size` for `/api/v1/` in
`frontend/nginx/default.conf.template`. Both are deployment settings, not part of build 83.

## 4. Applying on top of build 82.7

In the **Frequent-Research-Website** repository, build 83 is already applied on top of build 82.7 (pull request
`build-83-super-admin`). Merging that pull request is all that is needed. Nothing from 82.7 was removed or changed:
the Page video component (82.4 to 82.5), its backend route and collections, the leadership, home numbers and hero
texts sections, the SEO pass and every backend and database setting stay exactly as they were. The one shared file
that 82.7 had also changed, `admin/AdminApp.jsx`, was merged by hand: the build 83 menu items were added next to the
82.7 ones.

Build 83's **Page videos** (the red YouTube button's window on each page) and 82.7's **Page video component** (the
embeddable `<fr-page-video>` player and its API) are separate. They store their data in different places (the content
key `page-videos` and the `web_videos` / `page_video_templates` collections) and do not affect each other.

## 5. Checks after deploying

1. Open the website, press the red YouTube button on Home, a service page and `/downloads/consumer-panel-books/india`.
   Each one should show a different design, and the India one should use the Indian flag colours and patterns.
2. Super Admin › **Page videos**: search "japan", open it, press **Shuffle design**, and check the preview changes.
3. Super Admin › **All website pages**: the count is about 395. Press "Page video" on any page; it opens that page in Page videos.
4. Super Admin › **Client testimonials** › Import from a file: import `sample-files/testimonials-sample.csv`. Names
   must have no suffix, the duplicate row must be skipped, and the IT / Finance rows must show under those services.
5. Website `/gallery`: photos in even rows, nothing stretched; on a phone, 2 to 3 per row.
6. The browser console shows no errors.

## 6. How to undo

Rebuild the frontend from the backup (`frequent-research-backup-82`), or replace `frontend/src` with the old one and
run `docker compose build frontend && docker compose up -d frontend`. Content saved with build 83 stays harmless for
the older build. It ignores the extra fields (`studio`, `look`, gallery `focus`/`fit`/`ratio`). Pages added in Page videos
are simply not shown there.

## 7. Using the new features

**Page videos** (Website content area of the menu)

- Search or filter by group. Open a page to see a live preview of its window.
- **Video**: paste a YouTube, Vimeo or MP4 link, or **Upload video**. Leave it empty and the page plays its animated video.
  "What plays" chooses between this page's video, the parent page's video and the animated video.
- **Cover**: the designed cover, the YouTube thumbnail, or your own picture.
- **Design**: Studio 83 (the generated design) or the page's old classic design. **Shuffle design** picks a new
  combination. Every part (palette, pattern, frame, layout, fonts, highlights, grading, illustration, music, icons,
  your own colours) can be set by hand. **Reset to generated** goes back to the generator's design.
- **Save this design as a template** stores it so other pages can use it (Design › Imported template).
- **Import video template** / **Export templates**: see section 8.
- Nothing is live until **Save and publish**.
- **Page videos (classic list)** keeps the old editor, unchanged.

**Client testimonials** › Import from a file: columns are matched automatically (client name, company, service,
rating, review, country, date), and each can be changed. "Service for rows that do not name one" sets the service
for a sheet that has no service column. If earlier imports left a code on names (e.g. "Rahul Mehta-k3f"), a note
above the list says how many, with a **Remove it from these names** button; then press Save and publish.

**Gallery**: open a photo to see how it looks in a wide, square and tall crop. Click on the photo to choose what
stays in view, or tick **Show the whole photo (no cropping)**. **Many photos at once** uploads several photos into one section.

**All website pages**: one row per page with buttons to everything that can be changed for it.

## 8. Video template file format (.json)

A template file can hold one design or many. The simplest:

```json
{
  "kind": "fr-page-video-templates",
  "version": 83,
  "packs": [
    {
      "id": "diwali-gold",
      "name": "Diwali gold",
      "look": {
        "palette": "saffron",
        "motif": "mandala",
        "frame": "neon",
        "layout": "right",
        "font": "serif",
        "points": "bars",
        "grade": "warm",
        "illus": "orbit",
        "mood": "bright",
        "icons": ["Sparkles", "Users", "Globe", "ChartBar"],
        "colors": { "bg": "#1A0B2E", "bg2": "#3B1452", "a": "#FFC94A", "a2": "#FF4D6D", "p1": "#FFF6E0", "p2": "#FFE2A8", "pink": "#2A0A1E" }
      }
    }
  ]
}
```

Every key in `look` is optional; any key left out stays as the generator chose it for that page. Allowed values:

| Key | Values |
|---|---|
| `palette` | ember lagoon orchid saffron mint cobalt rose aurora copper plum ocean forest magma ice candy sand royal neon terracotta slate jade berry sky lava sage cyber blush indigo tropic garnet steel lilac |
| `colors` | Your own colours, which win over `palette`: `bg`, `bg2` (background), `a`, `a2` (accents), `p1`, `p2` (poster), `pink` (dark text on the poster), as `#RRGGBB` |
| `motif` | seigaiha lattice mandala girih kente papel azulejo aurora tartan bauhaus nouveau mosaic folk iznik batik andean carnival dots koru stars maple swiss temple dancheong hexgrid papyrus circuit grid confetti waves rings diagonal bokeh bars |
| `frame` | glass postcard polaroid tv boarding gallery neon tilt phone billboard |
| `layout` | right left stack tilt |
| `font` | manrope unbounded serif mono inter |
| `points` | bars chips timeline tiles |
| `grade` | warm teal duo mono vivid fade noir pastel |
| `illus` | tiles orbit flag globe stats photo |
| `mood` | bright calm drive epic |
| `icons` | Up to 6 [lucide](https://lucide.dev/icons) icon names, e.g. `Users`, `Globe`, `ChartBar`, `HeartPulse` (the Design card's icon box lists every name available) |
| `country` | A 2-letter country code, to use that country's flag and greeting (e.g. `IN`) |

The file made by **Export templates** also has `entries` (every page's settings). Importing it back restores them.

**Excel/CSV list of videos**: one row per page, with a column for the page's address (e.g. `/market-research` or
the full `https://…/market-research` link; a header such as "Page") and a column for the video link (a header such as
"Video link"). See `sample-files/page-videos-sample.csv`.

## 9. Every file, and why it changed

All paths are under `frontend/src/`.

**New files (13)**

| File | Purpose |
|---|---|
| `data/sitePages83.js` | The list of every page of the site, with group, kind, country and panel |
| `data/pv83Countries.js` | 56 panel countries: flag colours, local pattern, greeting, cities, music scale, which panels each has |
| `data/pv83Looks.js` | The design generator: palettes, patterns, frames, layouts, fonts, grades, illustrations, music moods |
| `data/PageVideos83.js` | Builds a page-video entry for every page; finds the entry for the page being viewed |
| `components/site/PageVideo83.jsx` | The new page-video window, poster, frames and animated video with music (loaded only when the button is pressed) |
| `styles/pagevideo83.css` | Its styles |
| `styles/gallery83.css` | Justified-row gallery layout |
| `admin/PageVideos83.jsx` | Super Admin › Page videos (new editor, import/export) |
| `admin/AllPages83.jsx` | Super Admin › All website pages |
| `admin/Gallery83.jsx` | Gallery photo focus / whole-photo tool and bulk upload |
| `admin/testimonialImport83.js` | The fixed testimonials import |
| `admin/css83.js`, `styles/admin83.css` | Styles for the new Super Admin screens |

**Edited files (6), a few lines each, marked `build 83`**

| File | Edit |
|---|---|
| `components/site/Video21.jsx` | The YouTube button opens the new window (falls back to the old one if it fails to load) |
| `admin/AdminApp.jsx` | Menu items: All website pages, Page videos (new), Page videos (classic list) |
| `admin/Builder.jsx` | Pages & sections lists every page and opens one from a link |
| `admin/Content.jsx` | Testimonials import uses the fixed import; gallery tools added |
| `admin/Import.jsx` | Excel reading ignores hidden phonetic text and `_x000D_` codes; imports can have options and column guesses |
| `pages/Gallery25.jsx` | Gallery uses the justified rows and each photo's focus point |

No backend file changed. The `page-videos`, `testimonials` and `gallery` content keys already existed and accept the
new fields.
