# Super admin panel (build 82.6)

Open **https://your-site/admin** and sign in with **your own account**: official email, password, then the 6-digit code
from your authenticator app. There is no shared or default login (build 78.3). The first Super Admin is made on the
server, everyone else is invited from **Access › Admins**: see `13-ACCESS-AND-ROLES.md`.
A sign-in lasts 12 hours (2 hours without use). Each admin sees only the sections their role allows; changes by admins
without the Publish right wait in **Access › Approvals**. Light / dark theme and sounds: the switches under the menu. The panel is hidden from search engines and every action is written to the Activity log.
Nothing in the panel touches the website's files: changes are stored in MongoDB and visitors see them on their next
page load. Every save keeps the earlier version, so anything can be put back (All content › Earlier versions).

## Try it without a server
`frequent-research-admin-demo-build82.6.html` (in `build82.6/`, next to the zips) opens the panel by double-click with SAMPLE leads, visits, chats and
reviews (sign in with demo@frequentresearch.com / demo and any 6-digit code). Everything works, including every page's content in "Pages & sections", except
showing the website inside "Edit on the page" and the field list of "Forms"; changes stay in that browser and never reach the website. Emails,
social posts and AI answer with "not connected" because the demo has no keys. Rebuild it with `cd frontend && npm run build && npm run admin-demo`.

## Sections

| Section | What you do there |
|---|---|
| **Dashboard** | page views, visitors and leads per day, most visited pages, where visitors came from, leads by type, most requested downloads, reviews and chats waiting |
| **Visits** | every page view (page, referrer, device, country hash), searchable |
| **Activity** | every sign-in (also wrong passwords) and every change, newest first |
| **Leads** | every form: enquiries, downloads, case studies, careers (with the CV), chat hand-offs. Filter by type, status and date, search, open one to see every field, set a status (new, contacted, qualified, won, lost, spam), add a note, download as CSV for Excel |
| **Live chat** | conversations from the chat window; answer the visitor live, close or reopen a chat |
| **Reviews** | publish, hide, edit or delete Rate & review submissions, and reply publicly |
| **Edit on the page** | open any page of the site, choose Text, Pictures or Links, and click what you want to change. Text changes apply on every page or only on that page. A list of every change with Undo |
| **Site settings** | switch the WhatsApp, chat, live chat, reviews, videos buttons and the celebration banner on or off; the chat greeting and the live chat hand-off message |
| **Contact & WhatsApp** | company name, email, phones, address, WhatsApp number and first message, social links |
| **Team** | everyone on the Our team page with photo, role, email, LinkedIn, team and video; add, hide, reorder |
| **Client testimonials, Blog posts, Careers, Downloads list, Certifications, Panel portals** | every item with all its fields; add, hide, reorder |
| **Accounts & Finance prices** | the 16 Accounts & Finance service pages: prices, plans, offers, FAQs, texts |
| **Panel numbers** | every panel book figure (consumer, business, healthcare professionals, caregivers, patients) by country: panel size, profiles, categories and percentages; the pages and PDFs use them. **Add a country** to any panel (it starts from another country's tables) or **remove** one |
| **PDF documents** | replace any generated PDF with a file you upload (the download form still comes first) |
| **Page videos** | the video the red YouTube button plays on each page: paste the page's YouTube link, pick one of 40 designs (12 page designs such as Premiere night, Briefing room, Studio wall, plus 28 service scenes such as Survey, Phone call, Search results, Payslip) and edit the texts shown beside the video; add any page by its address. All 67 service pages and about 35 other pages are listed, each with its own design already chosen. A page without its own video plays its parent page's video, then the home video |
| **Celebration calendar** | the special days of each year for the home banner |
| **Gallery** | the photos and videos of the three gallery sections |
| **Files** | every uploaded picture, logo, PDF and video (and the private careers CVs); copy a file's address, delete |
| **All content** | for experts: every saved item as data, with its earlier versions |

## New in build 78: full control of pages, menus, forms and marketing

Every change below is stored in MongoDB like the rest of the panel: the website's code and built-in design are not
touched, every save keeps its earlier version, and "Back to the original content" undoes it. New sections use the
site's own fonts, colours and card styles, in light and dark mode and on phones.

| Section | What you do there |
|---|---|
| **Pages & sections** | every page of the website (all 995: home, about pages, every service page, government research, products, portals, industries, every blog post, downloads, legal) and the header and footer. Open a page to see **all of its content, section by section**: every heading, sentence, number, button text, picture and link, each ready to change, remove (and put back). Hide a whole section, give it a different background (soft, navy, gradient, glass, outline) or your own CSS, and **add new sections** anywhere on the page from 22 types: hero, text, text with picture, cards, numbers, steps, FAQ, call to action, video, gallery, logos, pricing plans, quotes, team, checklist, table, download, form, newsletter sign-up, latest blog posts, your own HTML and spacer. "Write with AI" fills a section's texts. The content list is made when the website is built (`npm run release`, or the Docker build with PRERENDER=1); a text changed here is changed on that page only, a header or footer text on every page |
| **Page video component** (build 82.6) | every page's video for the website's `<fr-page-video>` player and **a video design of its own for each of the 995 pages** (82.6: showcase style like the Turn2Opinion video window: words and steps beside the video in one of 17 frames with one of 15 live cards; plus animated scene, icons, flags, colours, words), with a design editor and live desktop/phone previews, CSV import/export, custom fields and the endpoints. Not the same as **Page videos** above (the red YouTube button). Guide: `19-PAGE-VIDEO-COMPONENT.md` |
| **New pages** | create a whole new page at any address (e.g. `/offers/diwali`) from the same section types; title and search description; publish or keep as draft; and tick the menus it appears in (header, About, Downloads, a service menu, any footer column). It shows on the site at once |
| **Header & footer menus** | every header menu, the About and Downloads menus, each service's sub-menu and every footer column: rename, reorder, hide, or add any page or outside link |
| **Associations (ESOMAR…)** | ESOMAR, MSME and any other association shown with the certificates: logo, link and text; hide, change or add a new one |
| **Logos** | the header logo, footer logo, favicon, Sampledge logo and the logo of every portal and product, each shown as it is on the website now, with an upload to replace it |
| **Legal & policies** | the privacy, cookie, data protection and other policy pages (every heading and paragraph, the "last updated" date) and the company details printed on them |
| **Card designs** | choose how blog cards look (standard, glass, minimal, bordered, horizontal, overlay, magazine, navy) and case study cards (standard, cards, glass, minimal, bordered, navy); a different design for a single post; or write your own design in CSS and give it a name |
| **Case studies** | every case study of every industry: edit, hide, add, with numbers and results; "Write with AI" drafts one |
| **Products** | every product in the product menu with all its texts, features and pictures; add a new product and it gets its own page and menu entry |
| **Forms** | every form on the site: rename or hide a field, add new fields (text, long text, email, phone, number, date, web address, dropdown, tick box) that are saved with each submission, who in the team is told about each new entry, and which email template answers it |
| **Contacts & form counts** | everyone who ever sent a form or subscribed, how many people sent each form and each service, filter by form, service, country or tag, subscribe or unsubscribe someone, import and export CSV |
| **Email templates** | 15 ready templates (a reply for each service area, downloads, case studies, careers, chat, welcome, monthly newsletter, two follow-ups, team alert) in 10 animated designs (Aurora, Pulse, Orbit, Confetti, Wave, Spotlight, Editorial, Panel book, Careers, Minimal); edit or add, live preview, send a test; "Write with AI" |
| **Email automations** | what is sent by itself: an instant reply to every form (the template follows the form and the service), the team alert, follow-ups after 3 and 10 days, welcome for new subscribers, the monthly newsletter; add your own (on a form, on subscribe, or weekly/monthly) with several steps and delays |
| **Newsletters** | write a campaign, pick who gets it (forms, services, countries, tags), see how many, send now or schedule; see every email sent, opened, waiting or failed |
| **Social media** | write one post with a text per platform (Facebook, Instagram, LinkedIn, X, or any other via a webhook), post now to all at once or schedule; a calendar of posts with approve, publish, delete; the AI social media manager (autopilot) plans and writes the next two weeks of posts and either waits for approval or posts by itself |
| **AI assistant** | writes blog posts and case studies (saved as hidden drafts to check and publish), emails, newsletters, social posts, a month's social plan, ads and video scripts |
| **Connections & keys** | which outside accounts are connected (email, AI, each social platform, SampCrew), with what each key is for. Keys stay in `.env` on the server, never in the panel |

Also new: **Leads** shows the extra form fields, and each careers application shows whether it reached SampCrew, its
stage there and a "Send to SampCrew" button. **Live chat** downloads every conversation, or one, as CSV or text.
**Blog posts** now lists all the existing posts (73) to edit, hide or add to, with their full text.

The keys to provide for email, AI, social media and SampCrew are in `12-MARKETING-AND-KEYS.md`.

## Good to know
- Two rules stay in force whatever the panel allows: never publish a testimonial without the client's permission,
  and festival dates must be real.
- "Back to the original content" in any section removes your changes there and the site shows its built-in content again.
- Uploads: pictures, PDFs, mp4 and webm up to `UPLOAD_MB` (20 MB by default).
- Change your password in **My account** (needs the current password and an authenticator code; other sessions are
  signed out). Lost phone or password: a Super Admin uses **Reset access** on your account, or the server command
  `npm run admin -- recover --email …` (see `13-ACCESS-AND-ROLES.md`).
- Emails go only to people who ticked consent or subscribed, and each one has a one-click unsubscribe link.
- AI drafts are never published by themselves (social autopilot only posts by itself if you switch that on).
