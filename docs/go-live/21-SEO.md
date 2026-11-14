# 21 · SEO (build 82.7): the SEOptimer audit, item by item

Kunal ran SEOptimer on www.frequentresearch.com on 14 November 2026 (report: grade **C+**, 23 recommendations) and
asked for every SEO item to be fixed for an A+ result. This page lists each item, what build 82.7 changed, and what
must be done **outside the website files** (the hosting server in front of the site, DNS, social and Google accounts).
The design and every animation are unchanged: screenshots of the first screen of every page type, phone and desktop,
light and dark, are the same before and after, apart from invisible resampling inside the header logo.

## Why the audit saw so little

To score 99–100 in PageSpeed, every page first shows a ready-made copy of its first screen and starts the full site on
the visitor's first touch, click, key or mouse movement (`11-PAGESPEED.md`). An audit robot never touches the page, so
it saw only the first screen: 173 words, three H1 headings (the phone copy, the desktop copy and the text copy for
search engines were all in the page source), 55 pictures without alt text, inline styles, no social links, and so on.

Build 82.7 keeps that speed and fixes what robots read:

- The two first-screen copies now live inside the small script that already puts the right one in place. The page
  source has **one H1** (in the text copy for search engines) and the drawn page has one H1 (in the first-screen copy).
- The text copy of the whole page (`<div class="prerender">`) stays readable to robots while the first-screen copy is
  shown (out of sight and out of screen readers, `inert`), minus the header and first screen it would repeat. The
  audit now counts about **2,400 words** on the home page instead of 173.
- **Search-engine robots** (Googlebot, Bingbot, Google's inspection tool, social previews) get the full site straight
  away, the same as a visitor after the first touch (test in `vite/boot.js`).

## Item by item

| SEOptimer item | Before | Build 82.7 |
|---|---|---|
| Title tag 50–60 characters | 68 | Home: "Frequent Research \| Market Research, Marketing, IT & Finance" (60). Kunal chose this; inner page titles unchanged. |
| Meta description 120–160 | 180 | Home 148. All 118 pages over 160 shortened at whole sentences or list items (`src/app/seoText.js`, same rule in the app). |
| Remove duplicate H1 tags | 3 | 1 in the source, 1 on screen, every page. |
| Amount of content | 173 words | about 2,400 words read on the home page. |
| Image alt attributes | 55 of 55 missing | Every picture has an alt text (first-screen copy at build time, app pictures when they load: `src/app/altText.js`). Decorative pictures stay hidden from screen readers (`aria-hidden`). |
| Image width and height | missing | Set to each picture's own size (no change on screen). |
| Optimize images | big logo files | The header logo and chat-button pictures of the first-screen copy use files sized for 3× screens: 156 KB → 35 KB for the logo, about 270 KB less on the first screen. The logo artwork itself is untouched. |
| Inline styles | 236 style="" | 0: in the first-screen copy they became classes (same strength, same look). |
| Friendly links | `?type=…`, WhatsApp text | Links in the first-screen copy keep their `?type=…` part aside until the visitor's first touch (then exactly as before). |
| Clear text email | info@ in source | Written as HTML character codes; the text copy says "Email us". |
| Facebook / X / Instagram / LinkedIn / YouTube linked | not found | Profile links in the page source (footer of the text copy); the footer icons were dropped from it before (`prerender.cjs` now keeps icon links' labels). |
| Local Business schema | none | `ProfessionalService` with address, phone, logo and profiles on home, About us, Let's Talk, Scan & Connect, Our reach; Organization + WebSite on every page. |
| Open Graph / X cards | no picture | Share picture `/og/frequent-research-og.jpg` (1200×630, the original logo unchanged), large X card, `@frequentrfs`. |
| Hreflang | none | `en` and `x-default` on every page. |
| Rendered content (LLM readability) | 47 % | The page source and the drawn page now hold the same text. |
| Implement a redirect to HTTPS | no | Site web server sends http and `frequentresearch.com` (no www) to `https://www.frequentresearch.com` (needs the proxy header, see below). |
| Make use of HTTP/2 | HTTP/1.1 | **Hosting**: turn on HTTP/2 in OpenResty (below). |
| Improve site load speed (server response 1.3 s) | | **Hosting**: server is in Mumbai (13.126.179.159); use a CDN (below). |
| Browser caching | some short | Site files are cached for a year (`/assets/`) or 30 days (pictures). What remains short is outside our files: the Google tag (15 min) and Google Fonts (1 day). |
| Install a Facebook Pixel | none | **Marketing**: add the Meta Pixel as a tag in Google Tag Manager (GTM-TDDKS62), or send the Pixel ID to add it to the site. |
| Execute a link building strategy (Links: F) | 410 backlinks, domain strength 13 | **Marketing / off-site.** 363 of the backlinks share one spam anchor ("Expert SEO Links and Backlinks for frequentresearch.com Ranking Growth") from .space/.shop/.store/.online sites: disavow them in Google Search Console. Build real links (ESOMAR directory, Quirk's, clients, partners, panel sites Turn2Opinion / MyHealthOpinions / MyFrequentRewards, Sampledge). No website change can fix this grade. |
| Google Business Profile | | **Marketing**: claim / complete the profile with the same name, address, phone and website. |
| SPF, DMARC, SSL, robots.txt, sitemap, llms.txt, analytics, viewport, favicon, minification, no iframes / flash, PageSpeed 99 | pass | Still pass (favicon.ico added too). |

## For the hosting team (OpenResty in front of the site)

The audit shows the site answered by **OpenResty** at 13.126.179.159, which passes requests to the site's own nginx
container. Three settings there:

```nginx
# 1. http -> https, and frequentresearch.com -> www (permanent)
server {
  listen 80;
  server_name frequentresearch.com www.frequentresearch.com;
  return 301 https://www.frequentresearch.com$request_uri;
}
server {
  listen 443 ssl;
  http2 on;                      # 2. HTTP/2 (older OpenResty: "listen 443 ssl http2;")
  server_name frequentresearch.com;
  # ssl_certificate … (same certificate, it must cover both names)
  return 301 https://www.frequentresearch.com$request_uri;
}
server {
  listen 443 ssl;
  http2 on;
  server_name www.frequentresearch.com;
  # ssl_certificate …
  location / {
    proxy_pass http://127.0.0.1:8080;          # the site container
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;   # 3. lets the site redirect http itself as a second guard
  }
}
```

The site container already redirects when it receives `X-Forwarded-Proto: http` or the host `frequentresearch.com`
(`frontend/nginx/default.conf.template`), so either place works; the proxy is the better one.

**Server response time** (1.3 s from the USA): the HTML is a static file, so most of the time is distance and the
TLS handshake to Mumbai. A CDN in front (Cloudflare, CloudFront) with HTTP/2 or HTTP/3 brings it under 0.3 s
worldwide. Do not cache `/api/` or `/admin` at the CDN; HTML may be cached for a few minutes.

## After launch

1. Run SEOptimer again on `https://www.frequentresearch.com` (with www and https).
2. Google Search Console: submit `sitemap.xml`, check "Page indexing", disavow the spam backlinks above.
3. Rich Results Test on the home page: Organization, WebSite and ProfessionalService should all be valid.
4. Share the home page on LinkedIn / X / WhatsApp: the new picture should show.

## Files

- `frontend/scripts/seo-pass.cjs`: the build step (after the first-screen copies; safe to run twice).
- `frontend/src/app/seoText.js`: home title, descriptions, the 160-character rule.
- `frontend/src/app/altText.js`: alt text rules (build and app).
- `frontend/public/og/frequent-research-og.jpg`, `frontend/public/frequent-research-logo.png`, `frontend/public/favicon.ico`.
- `frontend/vite/boot.js`: robots get the full site.
- `frontend/nginx/default.conf.template`: https / www redirect.
