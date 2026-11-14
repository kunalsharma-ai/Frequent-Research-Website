# Search and the first week after launch (build 82.6)

## On launch day
1. Google Search Console: add `https://www.frequentresearch.com`, verify, and submit `/sitemap.xml` (995 pages).
2. Bing Webmaster Tools: submit the same sitemap.
3. `robots.txt` allows everything except `/api/`. `llms.txt` (for AI assistants) is at `/llms.txt`.
4. Old addresses that moved are redirected with 301s in `.htaccess` (and `redirects.json` for other servers). If the
   old site had other URLs that get traffic, add a line for each in the same format.
5. Every page has its own title, description and canonical address in its HTML, so search engines see real content
   without running JavaScript.

## Speed check (live domain)
Run https://pagespeed.web.dev on `/`, `/about-us` and one service page, for mobile and desktop. Expect CLS to pass.
First paint on mobile data will be slow until the app is split per page (see `01-GO-LIVE-STEPS.md`, section 6).

## First week
- Check the enquiry inbox or CRM daily: every form and download should create a lead.
- Search Console → Pages: fix any "Not found (404)" by adding a redirect.
- Moderate new reviews if `PUBLISH_MODE=manual`.
- Back up `reviews.json` weekly.
