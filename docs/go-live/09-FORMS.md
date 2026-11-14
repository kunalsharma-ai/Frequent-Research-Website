# Forms on the Frequent Research website: what they are and where they appear (build 82.6)

Checked on 5 November 2026 by opening all 995 pages of the final build (240 forms are on pages directly) and by
reading the code for the forms that open in a pop-up. Every form has a hidden bot trap and a consent tick box. Every
lead goes to the endpoint shown, which the backend saves in MongoDB. Open them in the super admin (`/admin` › Leads),
where you can filter, set a status, add notes and download a spreadsheet. Since build 67 all endpoints are under
`/v1/` (shown below without the prefix). See `02-BACKEND-API.md`.

## A. Enquiry forms (send to `POST /api/enquiry`)

| # | Form | Where it appears | Pages | Main fields |
|---|---|---|---|---|
| 1 | **Let's Talk** (main contact form) | `/lets-talk/`: the "Let's Talk" button in the menu bar and the phone bottom bar opens this page | 1 | **Service area**, then name, work email, phone, company, message |
| 2 | **Market Research enquiry** | Market Research hub and the bottom of its 12 service pages: business panel, consumer panel, healthcare panel, CATI, online and offline data collection, data processing and analytics, qualitative, quantitative, reporting and insights, research consultancy, research design cycle | 13 | **Research service**, **estimated sample size**, then name, email, phone, company, message |
| 3 | **Digital Marketing enquiry** | Bottom of the Digital Marketing hub and its 20 service pages (SEO, Google Ads, social media, content, email, WhatsApp, lead generation and more) | 21 | Service, then name, email, phone, company, timeline, message |
| 4 | **IT & Development enquiry** | Bottom of the IT & Development hub and its 20 service pages (website, apps, CRM, ERP, SaaS, AI, cloud, testing and more) | 21 | Service, then name, email, phone, company, timeline, message |
| 5 | **Accounts & Finance enquiry** | Accounts & Finance hub and its 17 service pages (bookkeeping, GST, TDS, ITR, payroll, virtual CFO, audit and more) | 18 | Service, then name, email, phone, company, message |
| 6 | **Government & Opinion Research brief** (3 steps) | `/government-opinion-research/`, "Have a public-sector research requirement?" | 1 | **Research type**, then name, email, organisation, designation, phone, timeline, requirements |
| 7 | **Careers application** | `/careers/`, near the bottom. Sends to `POST /careers` with the CV (PDF/DOC/DOCX, up to 5 MB, private; before build 67 this endpoint was missing and applications were lost) | 1 | **Department**, then name, email, phone, message, CV |
| 8 | **Chat "Ask us anything"** | Round chat button, bottom right, on every page. It never opens by itself. Without live chat, the question is saved as an enquiry | all | Name, email, question (`/chat/*`, falls back to `/enquiry`) |

## B. Download forms (required before every download)

| # | Form | Where it appears | Pages | Sends to |
|---|---|---|---|---|
| 9 | **Panel book download (country)** | Bottom of every country panel book page (form on the page): 55 consumer, 55 business, 38 healthcare | 148 | `/resource-download` |
| 10 | **Panel book download (region / all countries)** | Bottom of the region pages (Asia-Pacific, Europe, Americas, Middle East & Africa…) and "all countries", for consumer, business and healthcare | 18 | `/resource-download` |
| 11 | **Quality process PDF** | `/downloads/quality-process/` and its 4 pages (market research, digital marketing, IT & development, accounts & finance): pop-up on the download button | 5 | `/resource-download` |
| 12 | **Service brochure** | `/downloads/service-brochures/` and the brochure band above the footer on service pages: pop-up | many | `/resource-download` |
| 13 | **Case study PDF** | Every case study page (`/industries-case-studies/<industry>/<case>/`, 580 pages) and the 58 industry pages ("case study pack"): pop-up | 638 | `/case-study-download` |
| 14 | **Downloads hub** | `/downloads/` and `/downloads/industries-case-studies/`: pop-up on each download | 2 | `/resource-download` |

All download forms use the same fields: first name, last name, work email, phone with country code, company,
designation (optional), country and consent. There is no website URL field.

## C. Reviews

| # | Form | Where it appears | Sends to |
|---|---|---|---|
| 15 | **Rate & review** | `/rates-reviews/` and the round "Rate us" badge on every page (never opens by itself) | `POST /api/reviews` (CAPTCHA; published at once or after approval, depending on `PUBLISH_MODE`) |

## D. Super admin only (not visible on the website)

| Endpoint | Used for |
|---|---|
| `PUT /api/admin/gallery` | Gallery photos and videos (`07-GALLERY-ADMIN.md`) |
| `PUT /api/admin/celebrations?year=YYYY` | Celebration banner days (`06-CELEBRATIONS-ADMIN.md`) |
| `GET /api/admin/leads?format=csv` | Download every enquiry and download lead |
| `GET /api/admin/reviews`, `POST /api/admin/reviews/:id` | Approve, hide or delete reviews |

## Before launch
Send one test from each of these and check it arrives in the leads CSV or your CRM: forms 1, 2, 9 and 13, the
review form (15) and a chat question (8).
