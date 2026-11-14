# 07 · Gallery in the super admin panel (build 82.6)

> **Build 67:** the gallery is now edited in the super admin panel (`/admin` › Gallery) and stored in MongoDB.
> Endpoints are under `/api/v1/` (the old `/api/` paths still answer). Where this document says `DATA_DIR/…`, read
> "the database". The format below is unchanged.


The Gallery page (`/gallery`) was redesigned in build 65 update 25 (5 November 2026). **It ships with no photos and no
videos.** Your team adds them as links from the super admin panel. The page has three sections:

| Section id | Shown as | Look |
|---|---|---|
| `festivals` | **Festivals Celebration** | gold and rose, garland, lanterns and diyas |
| `awards` | **Awards & Appreciation** | royal blue and violet, trophy and medal; "Award" / "Spotlight" badges on cards |
| `birthdays` | **Birthdays** | rose and teal, cake and balloons; "Happy birthday" badge and a "this month's birthdays" ribbon |

A section with nothing in it shows a designed "coming soon" frame, so the page never looks broken or empty.

---

## 1. What a gallery item is

You only paste a link. Each item is:

| Field | Required | Meaning |
|---|---|---|
| `id` | recommended | Your own unique id (letters, digits, `-`, `_`; max 64). |
| `section` | yes | `festivals`, `awards` or `birthdays`. |
| `type` | yes | `photo` or `video`. |
| `url` | yes | The photo or video link (must start with `https://`). See section 2. |
| `thumb` | no | A picture to show on the card for a video (`https://`). YouTube and Google Drive thumbnails are found automatically. |
| `title` | no | Short title on the card, max 120 characters (e.g. "Diwali at the office"). |
| `caption` | no | Longer text in the viewer, max 300. |
| `album` | no | Groups items into filter chips inside a section, max 60 (e.g. "Diwali 2026", "Q3 2026 awards", "November 2026"). |
| `person` | no | Who it is about, max 80: the award winner or the birthday person. |
| `date` | no | `YYYY-MM-DD`. Items are shown newest first. Birthdays with a date in the current month appear in the "birthdays this month" ribbon. |
| `featured` | no | `true` puts the item first and shows it large (and a "Spotlight" badge in Awards). |
| `show` | no | `false` hides an item without deleting it. |

The whole gallery is one JSON document: `{ "version": 1, "items": [ item, item, … ] }` (max 3000 items).

## 2. Which links work

* **Photos:** any public `https://` image link (jpg, png, webp, gif), for example from your own server, a CDN, or
  your website's media library. **Google Drive:** a file's share link (`https://drive.google.com/file/d/<id>/view`)
  works if the file is shared as "Anyone with the link".
* **Videos (play inside the page, visitors never leave):** YouTube (`watch?v=`, `youtu.be/`, `shorts/`, `live/`;
  Shorts are shown upright), Vimeo, Google Drive video share links (set `type` to `video`), and direct video files
  (`.mp4`, `.webm`).
* Instagram and Facebook links cannot be shown inside another website. Download the photo or video and upload it to
  your server, Drive or YouTube instead.
* Use good-quality pictures: at least 1600 px wide for photos. Cards are cropped to fill, and the viewer shows the
  whole picture.

## 3. Backend (already built: the backend container, `backend/src/routes/content.js`)

* `GET /api/gallery` returns the saved gallery (`DATA_DIR/gallery.json`), or an empty list.
  Cached for 1 minute.
* `PUT /api/admin/gallery` replaces the whole gallery. Header `Authorization: Bearer <admin session token>`. It checks every
  item (section, type, `https://` links only, lengths, date format, unique ids) and answers `{ ok: true, items: N }`
  or `400 { ok: false, error: "items[3]: url must be an https:// link" }`.
* If your super admin panel has its own database, it only has to serve the same JSON at `GET /api/gallery`.
* Without any backend the page reads `/data/gallery.json` (empty), and every section shows "coming soon".

---

## 4. Prompt for your super admin panel

Copy everything in the box into the tool that builds your super admin panel.

```text
Add a new module to the Frequent Research super admin panel called "Gallery". It controls the Gallery page of
the website (/gallery), which has three sections: Festivals Celebration (id "festivals"), Awards & Appreciation
(id "awards") and Birthdays (id "birthdays"). The website shows only what this module saves.

DATA
- One document in this exact JSON shape (do not rename fields):
  { "version": 1, "items": [ Item, ... ] }   (max 3000 items)
  Item = { id, section, type, url, thumb?, title?, caption?, album?, person?, date?, featured?, show? }
- id: unique, letters/digits/-/_ (generate one, e.g. "g-20261105-0001"). section: "festivals" | "awards" |
  "birthdays". type: "photo" | "video". url and thumb: must start with https://. title max 120, caption max 300,
  album max 60, person max 80. date: YYYY-MM-DD. featured and show: true / false.
- Load with GET /api/gallery. Save the whole document with PUT /api/admin/gallery (header
  Authorization: Bearer <admin session token>). Show the server's error message if it answers 400.

SCREENS
1. Three tabs, one per section, each showing its items as a grid of thumbnails in the order the website uses
   (featured first, then newest date first), with a count of photos and videos. Search by title, person or album;
   filter by album, type and shown / hidden.
2. "Add photos / videos": paste one or many links (one per line). For each link detect the kind and show a live
   preview before saving:
   - YouTube (watch?v=, youtu.be/, shorts/, live/) → video, thumbnail https://i.ytimg.com/vi/<id>/hqdefault.jpg
   - Vimeo → video; Google Drive file link → ask "photo or video" (default photo);
   - .mp4 / .webm → video; any other https link → photo (check that it loads as an image).
   Reject links that are not https, and Instagram / Facebook links (they cannot be shown on another website; tell the
   admin to upload the file instead). Then fill section (pre-selected from the current tab), album (pick an existing
   album or type a new one), date, title, person and caption for all pasted items at once, and allow editing each one.
3. Optional upload: if the panel has file storage, let the admin upload photos or videos, store them, and save the
   resulting https:// link as url (compress photos to max 2400 px wide, WebP or JPEG, under 600 KB).
4. Item editor: all fields, "featured" switch (shows the item large and first; in Awards it gets a "Spotlight"
   badge), "show on website" switch, delete with confirm, and drag-and-drop ordering inside the same date.
5. Preview button: opens https://<site>/gallery#gx25-<section> in a new tab after saving.

RULES
- Only the super admin role can see and edit this module; everyone else gets 403.
- Validate before saving exactly as above and block saving with clear messages next to the field.
- Keep an audit log (who, when, what) and allow restoring any of the last 20 saved versions.
- Birthdays: use the person's first name only unless they agreed to more; never show a birth year.
- Never add photos of people who asked not to appear.
```

---

## 5. Adding items without the panel

Save a file like this as `DATA_DIR/gallery.json` on the server (or as `public/data/gallery.json` before a rebuild):

```json
{
  "version": 1,
  "items": [
    { "id": "diwali-2026-01", "section": "festivals", "type": "photo", "url": "https://cdn.example.com/diwali-2026/team.jpg",
      "title": "Diwali at the office", "album": "Diwali 2026", "date": "2026-11-08", "featured": true },
    { "id": "diwali-2026-v1", "section": "festivals", "type": "video", "url": "https://youtu.be/XXXXXXXXXXX",
      "title": "Diwali highlights", "album": "Diwali 2026", "date": "2026-11-08" },
    { "id": "award-q3-01", "section": "awards", "type": "photo", "url": "https://cdn.example.com/awards/q3-star.jpg",
      "title": "Star performer of the quarter", "person": "Riya", "album": "Q3 2026 awards", "date": "2026-10-15" },
    { "id": "bday-2026-11-05", "section": "birthdays", "type": "photo", "url": "https://drive.google.com/file/d/FILE_ID/view",
      "title": "Birthday cake time", "person": "Aman", "album": "November 2026", "date": "2026-11-05" }
  ]
}
```
