# 23 · SEOptimer audit of 17 November 2026: why it still shows C+, and how to deploy the fixes

Kunal ran SEOptimer on www.frequentresearch.com again on 17 November 2026 (09:54 UTC): grade **C+**, 23
recommendations. It is the **same report as the 14 November audit** that build 82.7 fixed (`21-SEO.md`): the live page
still has the old 68-character title "Frequent Research | Market Research, Digital Marketing, IT & Finance", a
180-character description, three H1 headings, 173 words and 55 pictures without alt text.

## The cause: the server deploys an old ready-built website

The code on `main` already has every fix. A fresh build of `main` (17 Nov) gives, on the home page:

| SEOptimer item | Live site (audit) | Build of `main` |
|---|---|---|
| Title tag | 68 characters | 60 ("Frequent Research \| Market Research, Marketing, IT & Finance") |
| Meta description | 180 characters | 148 |
| H1 tags | 3 | 1 in the page source, 1 on screen |
| Amount of content | 173 words | about 2,330 words |
| Image alt attributes | 55 of 55 missing | 0 missing (page source and drawn page) |
| Image width / height | missing | set on every picture |
| Inline styles | many | 0 |
| Plain-text e-mail | found | none |
| Facebook / X / Instagram / LinkedIn / YouTube links | not found | all linked |
| Local Business schema | none | ProfessionalService (home, About us, Let's Talk, Scan & Connect, Our reach) |
| Hreflang | none | `en` + `x-default` |

The deploy command `docker compose build frontend` uses **FRONTEND_MODE=ready**: it copies whatever is in
`frontend/dist/` on the server into the container. `frontend/dist/` is not in git, so `git pull` never updates it.
The server's `dist/` is still an older ready-built website from before build 82.7, so every deploy puts the old
pages back, whatever the code on `main` says.

## What changed (build 83.2)

`frontend/Dockerfile` now refuses a `dist/` that was made before the 82.7 SEO pass (it looks for the
`<!--fr-seo-82.7-->` mark that `scripts/seo-pass.cjs` writes into every page). The build stops with a clear message
instead of deploying the old pages; the running site is not touched when the build stops. To deploy an old `dist/`
anyway (not recommended): `docker compose build --build-arg ALLOW_OLD_DIST=1 frontend`.

Nothing else changed: no backend, database, nginx, proxy, SSL or design change.

## Deploy steps for the developer

1. `git pull` on the server (main).
2. Replace the website folder with the current build, either way:
   - **Ready-built (1-2 minutes):** unzip `frequent-research-dist-build83.2.zip` (from the project files) so that
     `frontend/dist/index.html` exists, removing the old `frontend/dist/` first:
     `rm -rf frontend/dist && unzip frequent-research-dist-build83.2.zip -d frontend/`
   - **From source on the server (60-120 minutes, about 4 GB memory):** `FRONTEND_MODE=build docker compose build frontend`
3. `docker compose build frontend && docker compose up -d frontend`
4. Check: `curl -s http://localhost:8080/ | grep -o '<title>[^<]*'` must print
   `<title>Frequent Research | Market Research, Marketing, IT & Finance`.
5. If a cache sits in front of the site, clear its cache for the HTML pages.
6. Run SEOptimer again on `https://www.frequentresearch.com/`.

## Items the website files cannot fix

These are outside the website code and stay as listed in `21-SEO.md`:

- **Implement a redirect to HTTPS** and **HTTP/2**: handled by the proxy in front of the site (Traefik). The site's
  own nginx redirect stays off (`FR_FORCE_HTTPS=off`, build 83.1) because it caused a 301 loop.
- **Improve site load speed** (server response 1.6 s): server distance and the proxy; a CDN helps.
- **Browser caching**: site files are already cached for a year / 30 days; what remains short is the Google tag and
  Google Fonts, which we do not control.
- **Install a Facebook Pixel**: add it as a tag in Google Tag Manager (GTM-TDDKS62), or send the Pixel ID.
- **Execute a link building strategy** (Links: F): off-site marketing work. 363 backlinks share one spam anchor
  ("Expert SEO Links and Backlinks for frequentresearch.com Ranking Growth"): disavow them in Google Search Console.
- **Google Business Profile**: claim and complete it with the same name, address, phone and website.
