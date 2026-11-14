# 06 · Celebrations calendar in the super admin panel (build 82.6)

> **Build 67:** the calendar is now edited in the super admin panel (`/admin` › Celebration calendar) and stored in
> MongoDB. Endpoints are under `/api/v1/` (the old `/api/` paths still answer). Where this document says `DATA_DIR/…`,
> read "the database". The formats below are unchanged.


The home page shows a celebration banner right under the menu bar on special days (festivals, world days, national
days, industry events). On any other day the banner is not there at all.

Build 72: on every visit the banner shows for **10 seconds** (a countdown line runs along its bottom edge and waits while
the visitor points at the banner or has scrolled away from it), then leaves with a lift-and-fade animation. It comes
back the next time someone opens the site.

This document has:

1. how the banner decides what to show,
2. the data format,
3. the backend that is already built,
4. **the prompt to paste into your super admin panel builder**, and
5. how to prepare next year.

---

## 1. How the banner works

* **Calendars for 2026 to 2030 are ready (update 24).** There is one file per year: `/data/celebrations-2026.json`
  (your workbook *Global_Special_Days_Festival_Calendar_2026.xlsx*) and `/data/celebrations-2027.json` …
  `-2030.json`, made by `tools/celebrations/make_years.py` (see section 5). A visitor downloads only the year that is
  showing, and on 1 January the banner switches to the new year's file by itself.
* The site asks `GET /api/celebrations?year=YYYY` for that year. If that fails, it uses the shipped
  `/data/celebrations-YYYY.json`, then `/data/celebrations.json`.
* "Today" is worked out in the calendar's timezone (`Asia/Kolkata` unless you change it), and it is checked again every
  minute, so the banner appears and disappears at midnight by itself.
* If several events fall on the same day, the most important one (major, then high, then medium) becomes the banner and
  the others appear as "Also today" chips (up to 3).
* Visitors can close the banner with ×; it stays closed for the rest of that visit.
* Month-theme fill days from the workbook ("Low (theme)") are **not** special days, so they were left out.
* To check any date without waiting for it: open the home page with `?celebration-date=YYYY-MM-DD`, for example
  `https://www.frequentresearch.com/?celebration-date=2026-11-08` (Diwali).

## 2. Data format

```json
{
  "version": 1,
  "timezone": "Asia/Kolkata",
  "updated": "2026-11-04",
  "events": [
    {
      "date": "2026-11-08",
      "until": "2026-11-09",
      "name": "Diwali / Deepavali – Lakshmi Puja, Kali Puja & Muhurat Trading",
      "title": "Diwali",
      "category": "Festival (India)",
      "region": "India / Global diaspora",
      "importance": "major",
      "motif": "diya",
      "flags": ["IN"],
      "global": true,
      "message": "Happy Diwali! Warm wishes to everyone celebrating, from all of us at Frequent Research.",
      "also": [{ "name": "Guy Fawkes Night", "flags": ["GB"], "motif": "bonfire" }],
      "services": ["MR", "DM"],
      "show": true
    }
  ]
}
```

| Field | Required | Meaning |
|---|---|---|
| `date` | yes | `YYYY-MM-DD`. Use `*-MM-DD` for a day that never moves (for example `*-12-25`), so it shows every year. |
| `until` | no | Last day of a multi-day event (`YYYY-MM-DD`). |
| `name` | yes | Full name (max 160 characters). |
| `title` | no | Short headline shown big on the banner. Falls back to `name`. Keep it under 40 characters. |
| `category` | no | One of the categories below (shown as a small label). |
| `importance` | no | `major`, `high` or `medium`. Major days get a glowing border and bunting. |
| `scene` | no | A festival's own hand-drawn animation (list in section 2b). Wins over `icon` and `motif`. |
| `icon` | no | For other days: `[main, accent]` Tabler icon names (https://tabler.io/icons, outline set), for example `["radio","antenna-bars-5"]`. The main icon is drawn big in the medallion; the accent circles around it. Use a main icon no other day uses. |
| `anim` | no | For icon days: `{ "move": 0-11, "back": 0-9, "fx": 0-6, "pal": 0-7 }` = movement, backdrop, particles and colour set. Give every day a different combination. |
| `motif` | no | Older, shared animation (list below). Only used when a day has no `scene` or `icon`. Default `globe`. |
| `flags` | no | Up to 4 ISO country codes, for example `["IN","GB"]`. Only these have HD flags: AE AR AT AU BE BG BR CA CH CL CN CO CR CZ DE DK DZ EG ES FR GB HK ID IE IL IN IR IT JP KE KH KR KW MX MY NG NL NO NZ PE PH PL PT QA RO RU SA SE SG TH TR TW UA US VN ZA. Others are skipped. |
| `global` | no | `true` adds the "Worldwide" badge. |
| `message` | no | One sentence under the headline (max 300 characters; two lines show on phones). |
| `also` | no | Other things on the same day: `{ name, flags, motif }`, up to 3. |
| `services` | no | Internal note: MR, DM, IT, AF. Not shown. |
| `show` | no | `false` hides the event without deleting it. |

Top level: `"enabled": false` switches the banner off on every day without touching the events.

**Categories:** Festival (India) · Global Festival / Holiday · Global Observance (UN / International) · National /
Commemorative Day (India) · Healthcare & Wellness · Finance, Banking & Tax · IT & Technology · Digital Marketing &
E-commerce · Sports & Mega Events · Market Research & Consumer Insights · Industry Event / Conference

### 2b. Every day has its own animation (update 22b)

* **80 festival and national days have a hand-drawn scene** (`scene`): new-years-day, orthodox-christmas, lohri, makar-sankranti, vasant-panchami, republic-day, shab-e-barat, valentines-day, maha-shivaratri, presidents-day, chinese-new-year, ash-wednesday, ramadan-begins, holika-dahan, holi, st-patricks, ugadi, eid-ul-fitr, ram-navami, palm-sunday, mahavir-jayanti, hanuman-jayanti, good-friday, easter-sunday, easter-monday, orthodox-easter, songkran, baisakhi, pohela-boishakh, akshaya-tritiya, buddha-purnima, mothers-day, ascension-day, pentecost, memorial-day, eid-al-adha, islamic-new-year, dragon-boat, muharram, independence-day-usa, bastille-day, rath-yatra, guru-purnima, independence-day-india, onam, raksha-bandhan, janmashtami, labor-day, rosh-hashanah, rosh-hashanah-honey, ganesh-chaturthi, vishwakarma-puja, saudi-national-day, anant-chaturdashi, mid-autumn, german-unity-day, sharad-navratri, thanksgiving-canada, durga-puja, durga-puja-dhak, durga-ashtami, dussehra, sharad-purnima, valmiki-jayanti, karwa-chauth, halloween, ahoi-ashtami, dia-de-muertos, tsunami-day, dhanteras, choti-diwali, diwali, diwali-holiday, govardhan, bhai-dooj, chhath-puja, guru-nanak-jayanti, christmas, boxing-day, new-years-eve.
  Next year, give the same festival the same `scene` on its new date.
* **The other 231 days each have their own subject icon** (`icon`) and their own mix (`anim`):
  - movement: 0 float, 1 swing, 2 heartbeat, 3 flip, 4 bounce, 5 wobble, 6 tilt, 7 zoom, 8 circle, 9 shake, 10 drift, 11 rock;
  - backdrop: 0 rays, 1 ripples, 2 orbits, 3 honeycomb, 4 starburst, 5 petals, 6 radar, 7 pixels, 8 stripes, 9 spiral;
  - particles: 0 rise, 1 fall, 2 drift, 3 twinkle, 4 burst, 5 fly, 6 sway (the particles are small copies of the day's icon);
  - colours: 8 sets from the site palette.
  The icons are built into the site from `tools/celebrations/day_icons.txt` by `make_celebrations.py`. A new icon name
  needs a rebuild (it must exist in the Tabler outline set); the admin panel should offer a searchable icon picker
  limited to the names in `src/data/Icons22.jsx`, or the whole Tabler outline set if the developers include it.

**Motifs (older shared animations, used only when a day has no `scene` or `icon`):**

| Motif | What it shows | Good for |
|---|---|---|
| `diya` | Clay lamp with a flickering flame, a turning ring of rangoli dots and rising embers | Diwali, Dhanteras, Dev Deepawali, Bhai Dooj |
| `colours` | Bursting clouds of colour powder | Holi |
| `tricolour` | Indian flag waving with a turning Ashoka Chakra and saffron/white/green confetti | Republic Day, Independence Day |
| `lotus` | Lotus opening on rippling water with falling petals | Hindu, Buddhist, Jain and Sikh festivals, Jayantis, meditation |
| `crescent` | Crescent moon, twinkling stars and a swinging lantern | Eid, Ramadan, Muharram, Milad |
| `xmas` | Christmas tree with blinking baubles, a spinning star and falling snow | Christmas, Hanukkah |
| `lantern` | Three swinging lanterns with rising lights | Lunar New Year, Mid-Autumn |
| `kite` | Kite swaying on its string | Makar Sankranti, Uttarayan, Pongal |
| `bonfire` | Fire with flickering flames and sparks | Lohri, Holika Dahan, Guy Fawkes |
| `fireworks` | Firework bursts | New Year, national days |
| `halloween` | Glowing pumpkin and bats | Halloween |
| `waves` | Calm sea with a boat and drifting waves | Ocean, water, tsunami and navy days |
| `leaf` | Swaying plant with falling leaves | Earth, environment, wildlife days |
| `ribbon` | Awareness ribbon with soft halos and rising hearts | Health and awareness days |
| `hearts` | Beating heart with orbiting hearts | Mother's, Father's, Women's, Children's, Friendship days |
| `dove` | Dove with an olive branch, flapping wings | Peace, remembrance, martyrs, armed forces |
| `book` | Open book with a turning page and drifting letters | Teachers', literacy, language days |
| `coins` | Rising bars and a coin dropping on a stack | Budget, tax deadlines, banking |
| `tech` | Glowing chip with an orbit and rising bits | Technology, internet, AI, cyber days |
| `sale` | Swinging % tag and a hopping shopping bag | Black Friday, Cyber Monday, shopping days |
| `sport` | Bouncing football and confetti | World Cup, IPL, Olympics |
| `survey` | Clipboard with ticks appearing | Research, consumer and statistics days |
| `globe` | Turning globe with an orbiting satellite | Anything else |

## 3. Backend (already built: the backend container, `backend/src/routes/content.js`)

* `GET /api/celebrations?year=2027` returns, in this order: the admin copy of that year
  (`DATA_DIR/celebrations-2027.json`), the admin's single calendar (`DATA_DIR/celebrations.json`) if it has days in
  2027. Without an admin copy the backend answers 404 and the frontend container's nginx serves the calendar the site ships with (`/data/celebrations-2027.json`, then `/data/celebrations.json`). Cached for 5 minutes.
  Without `?year` it behaves as before (single calendar).
* `PUT /api/admin/celebrations?year=2027` replaces that year's calendar (every date must be in 2027 or `*-MM-DD`).
  Without `?year` it replaces the single calendar. It needs the header
  `Authorization: Bearer <admin session token>` and checks every event (date format, name, motif, flags, message length). It
  answers `{ ok: true, year, events: <count> }`, or `400 { ok: false, error: "events[12]: date must be YYYY-MM-DD …" }`.
* Proxy `/api/` to this service exactly like the reviews endpoints (see 01-GO-LIVE-STEPS.md), (admins sign in with their own account, build 78.3).

If your super admin panel has its own database instead, it only has to serve the same JSON at
`GET /api/celebrations`; the website needs nothing else.

---

## 4. Prompt for your super admin panel

Copy everything in the box into the tool that builds your super admin panel.

```text
Add a new module to the Frequent Research super admin panel called "Celebrations calendar". It controls the
celebration banner on the home page of the website, which appears under the menu bar only on special days.

DATA
- One calendar document in this exact JSON shape (do not rename fields):
  { "version": 1, "timezone": "Asia/Kolkata", "updated": "YYYY-MM-DD", "events": [ Event, ... ] }
  Event = { date, until?, name, title?, category?, region?, importance?, motif?, flags?, global?, message?,
            also?: [{ name, flags?, motif? }], services?, show? }
- date: "YYYY-MM-DD", or "*-MM-DD" for a day that repeats every year. until: optional last day "YYYY-MM-DD".
- importance: "major" | "high" | "medium". motif: one of waves, diya, colours, bonfire, kite, crescent, lantern,
  xmas, tricolour, fireworks, leaf, ribbon, sport, coins, tech, sale, survey, hearts, book, lotus, dove,
  halloween, globe. scene: a festival's own animation id (list in 06-CELEBRATIONS-ADMIN.md section 2b).
  icon: [main, accent] Tabler outline icon names (main must be unique per day). anim: { move 0-11, back 0-9,
  fx 0-6, pal 0-7 } (warn when two days in the same year share the same icon or the same anim combination).
  flags: up to 4 two-letter ISO codes from this list only: AE AR AT AU BE BG BR CA CH CL CN CO
  CR CZ DE DK DZ EG ES FR GB HK ID IE IL IN IR IT JP KE KH KR KW MX MY NG NL NO NZ PE PH PL PT QA RO RU SA SE SG
  TH TR TW UA US VN ZA. message: max 300 characters. name: max 160. title: max 40 (short headline).
  also: max 3 items. show: false hides an event without deleting it.
- Categories: Festival (India); Global Festival / Holiday; Global Observance (UN / International); National /
  Commemorative Day (India); Healthcare & Wellness; Finance, Banking & Tax; IT & Technology; Digital Marketing &
  E-commerce; Sports & Mega Events; Market Research & Consumer Insights; Industry Event / Conference.
- One calendar document per year. Load a year with GET /api/celebrations?year=YYYY. Save it with
  PUT /api/admin/celebrations?year=YYYY (JSON body = that year's full calendar, header
  Authorization: Bearer <admin session token>). 2026 to 2030 are already filled in.
  Show the server's error message if it answers 400. Set "updated" to today's date on every save.

SCREENS
1. Year view: a year selector (current year, next year and any later year that has events) and a 12-month
   calendar grid. Each day with an event shows a coloured dot by importance and the motif icon; clicking a day
   opens its events. A list view beside it with search, and filters for month, category, importance, motif,
   country and shown/hidden.
2. Event editor (drawer or modal) with: date picker plus a "repeats every year" switch (stores *-MM-DD), optional
   end date, name, short title (with a live character counter, warn above 40), category dropdown, region,
   importance (3 buttons), scene picker (festival list), icon picker (searchable Tabler icons with a live preview of
   the main icon and its accent), animation mix (four dropdowns: movement, backdrop, particles, colours, with a
   "Surprise me" button that picks an unused combination), motif picker (fallback only) as a grid of cards with the motif name and the "good for" hint, flag picker
   (searchable list limited to the ISO codes above, max 4, drag to reorder), "Worldwide" switch, message (300
   character counter, with a "Suggest message" button that fills a template by category), up to 3 "Also today"
   items (name, flag, motif), services tags (MR, DM, IT, AF), and a Show / Hide switch.
3. Live preview: an iframe of the live home page at "/?celebration-date=<the event's date>" so the admin sees the
   real banner and animation, with buttons for desktop and phone width. Note: the preview shows the saved calendar,
   so offer "Save and preview".
4. Year tools:
   - "Copy to next year" (for 2031 onwards; 2026 to 2030 are already filled): copies every "repeats every year"
     and fixed-date event to the next year in one click, and lists the moving festivals (lunar or religious dates
     such as Diwali, Holi, Eid, Navratri, Dussehra, Chinese New Year, Easter, Good Friday, Raksha Bandhan,
     Janmashtami, Ganesh Chaturthi, Chhath) as "needs a new date" with an empty date field to fill in. Never guess
     these dates.
   - "Import from Excel": accepts the same workbook layout as Global_Special_Days_Festival_Calendar_2026.xlsx
     (sheet "Full Year …", columns Date, Primary Event / Festival, Category, Region / Audience, Also on this day
     (renowned / relevant), Relevant Services, Importance). Skip rows whose Importance starts with "Low". Map
     "★★★ Major" → major, "★★ High" → high, "★ Medium" → medium. Suggest a motif and flags from the name and
     region, and show everything in a review table before saving (the admin can change any row).
   - "Export": download the calendar as JSON and as Excel in the same layout.
   - A "gaps" report: months of the selected year with no events, and moving festivals of the next year that
     still have no date.
5. Settings: timezone (default Asia/Kolkata; the banner changes at midnight in this timezone), and a master switch
   "Show celebration banner on the website" stored as the top-level field "enabled" (true / false). When it is
   false the website shows no banner on any day, and no events are lost.

RULES
- Only the super admin role can see and edit this module; everyone else gets 403.
- Validate before saving: date format, unique (date + name), title length, message length, max 4 flags, motif in
  the list, also max 3. Block saving with clear messages next to the field.
- Keep an audit log of every change (who, when, what changed) and allow restoring an earlier version of the whole
  calendar (keep at least the last 20 saved versions).
- Show a warning when two "major" events fall on the same day (only one becomes the banner; the other shows as
  "Also today").
- Keep the tone respectful: awareness and remembrance days use the ribbon, dove or waves motifs, never fireworks.
- All dates are shown as "Thursday, 5 November 2026" in the UI and stored as YYYY-MM-DD.
```

---

## 5. Later years (2027 to 2030 are done)

* **2027, 2028, 2029 and 2030 are ready** (update 24). `tools/celebrations/make_years.py` moved every 2026 day to its
  date in each year:
  * fixed days keep their date (World Health Day, Christmas, Republic Day …);
  * weekday rules are worked out (Mother's Day = 2nd Sunday of May, Thanksgiving, Black Friday, Labor Day …);
  * moving festivals are calculated: Hindu festivals and sankrantis with an astronomical panchang for New Delhi
    (`tools/celebrations/panchang.py`; tithi at the time each festival is kept, Lahiri months, Adhik maas), Islamic
    days from the Umm al-Qura calendar with the same India offset as the 2026 sheet, Easter and the days tied to it,
    Orthodox Easter, Jewish and Chinese festivals. Re-deriving 2026 this way matches the 2026 sheet on every moving
    day except Holi 2026 (an eclipse year that moved Holika Dahan by a day). The 2027 to 2030 festival dates were also
    checked against published Indian holiday lists (Calendarific, Office Holidays): Diwali, Holi, Navratri, Dussehra,
    Raksha Bandhan, Janmashtami, Ganesh Chaturthi, Onam, Chhath, Eid and the rest agree. Two to confirm nearer the
    time: Ugadi / Gudi Padwa 2029 (14 April here; one panchang says 16 March because 2029 has an extra Chaitra
    month) and Mahavir Jayanti 2027 (19 April here; one list says 18 April, marked provisional).
  * **Islamic dates depend on the moon being sighted in India and can move by one day.** Check Eid, Bakrid, Muharram
    and Milad a few weeks before, and correct them in the admin panel if needed.
  * one-off or unscheduled events are left out because their future dates are not published yet: CES, Davos, MWC,
    tournaments (FIFA, T20, Olympics, Commonwealth and Asian Games, Wimbledon, French and US Open, Tour de France,
    Super Bowl, Australian Open), RBI policy and US Fed meetings, results season, eclipses and Earth Hour. Add them in
    the admin panel when the dates are announced.
  * Each day keeps its own 2026 animation, so no two days in a year look the same. Days that were only "Also today"
    in 2026 and now stand alone (for example Rose Day, World Wildlife Day, Africa Day) got their own icon.
  * Year labels move on by themselves: "Union Budget 2027-28", "FY 2027-28", "Q1 FY28", "Year of the Goat".
* To add 2031 and later: `python3 tools/celebrations/make_years.py 2031 2035` (needs `pip install ephem hijridate
  pyluach lunardate`), then rebuild and deploy; or use "Copy to next year" in the admin panel.
* To re-check the rules against the 2026 sheet: `python3 tools/celebrations/make_years.py --check`.
