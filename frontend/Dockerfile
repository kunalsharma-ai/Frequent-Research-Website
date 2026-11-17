# Frontend: the website and the super admin screens, served by nginx.
#
# Two ways to make this container (build 82.5):
#
#   FRONTEND_MODE=ready  (default)  Uses the ready-built website in frontend/dist/ that comes in the go-live package.
#                                   No Node, no browser, no build on the server: ready in 1-2 minutes.
#   FRONTEND_MODE=build             Builds the website from source on the server: Vite build, then the search-engine
#                                   pages, llms.txt, the first-screen copies and the admin page index, each in a
#                                   hidden Chromium. Takes 60-120 minutes and needs about 4 GB of memory.
#
#   docker compose up -d --build                                   (ready mode, from the go-live package)
#   FRONTEND_MODE=build docker compose build frontend               (from source; progress is printed per page)
#   docker build -t fr-frontend --build-arg FRONTEND_MODE=build --build-arg PRERENDER=0 ./frontend   (quick, app only)

ARG FRONTEND_MODE=ready

# ---- ready: copy the ready-built website ------------------------------------------------------------------------
FROM alpine:3.22 AS site-ready
WORKDIR /app
# build 83.2: refuse a dist/ made before the 82.7 SEO pass (see the check below); 1 = deploy it anyway
ARG ALLOW_OLD_DIST=0
COPY . /src
RUN if [ ! -f /src/dist/index.html ]; then \
      echo "frontend/dist/ is missing: this folder has no ready-built website."; \
      echo "Use the go-live package (frequent-research-GO-LIVE-*.zip) or build from source: FRONTEND_MODE=build docker compose build frontend"; \
      exit 1; fi \
 && if ! grep -q '<!--fr-seo-82.7-->' /src/dist/index.html; then \
      echo "frontend/dist/ is an OLD website build: it was made before the build 82.7 SEO pass (no <!--fr-seo-82.7--> mark in dist/index.html)."; \
      echo "dist/ is not in git, so 'git pull' never updates it, and deploying it brings back the old SEOptimer results (68-character title, 3 H1s, 173 words, 55 pictures without alt)."; \
      echo "Replace frontend/dist/ with the current ready-built website (docs/go-live/23-SEO-AUDIT-17-NOV.md), or build from source: FRONTEND_MODE=build docker compose build frontend"; \
      echo "To deploy this old build anyway: docker compose build --build-arg ALLOW_OLD_DIST=1 frontend"; \
      if [ "$ALLOW_OLD_DIST" != "1" ]; then exit 1; fi; fi \
 && mv /src/dist /app/dist && rm -rf /src && echo "using the ready-built website: $(find /app/dist -name index.html | wc -l) pages"

# ---- build: build the website from source -----------------------------------------------------------------------
FROM node:24-bookworm-slim AS site-build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
# Chromium is only needed at build time (scripts/prerender.cjs, phone-shell.cjs, site-index.cjs)
ARG PRERENDER=1
RUN if [ "$PRERENDER" = "1" ]; then npx playwright install --with-deps chromium; fi
COPY . .
RUN rm -rf dist && npm run build -- --logLevel warn && if [ "$PRERENDER" = "1" ]; then npm run prerender; fi

FROM site-${FRONTEND_MODE} AS site

# ---- the web server ---------------------------------------------------------------------------------------------
FROM nginx:1.29-alpine
ENV BACKEND_URL=http://backend:8787
# build 83.1: the site's own http -> https / www redirect is off unless this is on (see nginx/default.conf.template)
ENV FR_FORCE_HTTPS=off
COPY nginx/default.conf.template /etc/nginx/templates/default.conf.template
COPY nginx/security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY --from=site /app/dist /usr/share/nginx/html
RUN mkdir -p /etc/nginx/fr \
 && if ls /usr/share/nginx/html/.nginx/*.conf >/dev/null 2>&1; then mv /usr/share/nginx/html/.nginx/*.conf /etc/nginx/fr/; fi \
 && rm -rf /usr/share/nginx/html/.nginx /usr/share/nginx/html/.shell.html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1/healthz || exit 1
