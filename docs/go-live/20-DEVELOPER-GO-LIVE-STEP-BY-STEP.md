# 20 · Developer go-live, step by step (build 82.7)

The simplest way to put the website **and** the super admin live. Follow the steps in order; each one says what you
should see. Total time with the go-live package: about 15 minutes.

## The problem in build 82.5: "it stops after llms.txt"

Building the website on the server (`docker compose up -d --build` from the source) runs six steps. Step 3 writes
`llms.txt`; **step 4 then makes a first-screen copy of each of the 995 pages in a hidden browser. That step takes
60–90 minutes and printed nothing for the first 5–10 minutes**, so it looked stuck. Inside Docker the hidden browser
could also really freeze, because Docker gives it only 64 MB of shared memory.

Fixed in build 82.5:

1. **No build on the server any more.** The go-live package (`frequent-research-GO-LIVE-build82.7.zip`) contains the
   finished website in `frontend/dist/`. The server only copies it into nginx: the frontend container is ready in
   1–2 minutes. No Node, no browser, no 4 GB of memory needed. This is the default (`FRONTEND_MODE=ready`).
2. If you do build from source (`FRONTEND_MODE=build`): every step prints a banner (`==== step 4 of 6: … ====`) and
   progress every 10–25 pages with minutes left; every page has a time limit, so one bad page can no longer stop the
   build; the browser no longer uses Docker's small shared memory, and the build container gets 2 GB of it
   (`shm_size` in `docker-compose.yml`).

## What you need

- A Linux server with Docker 24+ and Docker Compose v2 (`docker compose version`), 2 CPU, 4 GB memory, 20 GB disk.
- The domain `www.frequentresearch.com` pointing to the server, and HTTPS in front (your load balancer, Cloudflare,
  or a reverse proxy such as Caddy/nginx on the host). The website container listens on port `8080` (`WEB_PORT`).
- The file `frequent-research-GO-LIVE-build82.7.zip`.

## Step 1 · Unpack

```bash
mkdir -p /srv/frequent-research && cd /srv/frequent-research
unzip frequent-research-GO-LIVE-build82.7.zip
ls frontend/dist/index.html      # must exist: this is the ready-built website
```

## Step 2 · Settings

```bash
cp .env.example .env
for k in MONGO_PASSWORD MONGO_APP_PASSWORD KEYS_SECRET DATA_KEY REVIEW_SECRET ONBOARDING_SECRET; do
  sed -i "s|^$k=.*|$k=$(openssl rand -hex 32)|" .env
done
nano .env   # check PUBLIC_URL=https://www.frequentresearch.com and ADMIN_EMAIL_DOMAINS=frequentresearch.com
```

Keep a safe copy of `.env` outside the server (password manager). Without `DATA_KEY` and `KEYS_SECRET` the encrypted
onboarding data and saved keys cannot be read. Never put `.env` in git or email. Mail, AI, social media and SampCrew
keys can be added later in the super admin (System › Connections & keys); they come from your own accounts.

## Step 3 · Start

```bash
docker compose up -d --build
docker compose ps
```

You should see `mongo`, `backend` and `frontend` all `running (healthy)` after about 1–2 minutes. The frontend build
log says `using the ready-built website: 995 pages` (or more).

## Step 4 · Check the website

```bash
curl -s localhost:8080/healthz                               # ok
docker compose exec backend wget -qO- http://127.0.0.1:8787/healthz   # the API and database answer
curl -sI localhost:8080/about-us | head -1                   # HTTP/1.1 200 OK
curl -s "localhost:8080/api/v1/page-videos?page=/about-us" | head -c 200   # {"ok":true,"page":"/about-us",...
curl -sI localhost:8080/api/v1/page-videos/player.js | head -1          # HTTP/1.1 200 OK
```

Then open `https://www.frequentresearch.com` in a browser.

## Step 5 · First Super Admin

```bash
docker compose exec backend npm run admin -- create-super-admin --email you@frequentresearch.com --name "Your Name"
```

It prints a one-time setup link. Open it, choose a password, scan the QR code with an authenticator app and save the
recovery codes. Sign in at `https://www.frequentresearch.com/admin`. Invite the rest of the team in Access › Admins.

## Step 6 · Connect the page videos (optional, any time)

In the website's page template, where the video should appear:

```html
<script src="/api/v1/page-videos/player.js" defer></script>
<fr-page-video></fr-page-video>
```

Add videos in Super admin › Pages › Page video component. Details: `19-PAGE-VIDEO-COMPONENT.md`.

## Step 7 · Backups

```bash
# daily at 02:30, copies kept in the backups volume; copy them off the server too
( crontab -l; echo '30 2 * * * cd /srv/frequent-research && docker compose exec -T backend npm run backup -- /backups' ) | crontab -
```

## Updating later

- **New go-live package:** unpack it over the folder (keep your `.env`), then `docker compose up -d --build`.
  The database and every admin change are kept (they live in the `mongo` volume).
- **Content changes** made in the super admin need no deploy at all.

## Building from source instead (only if you change the website code)

On a developer machine (not the live server), with Node 24:

```bash
cd frontend && npm ci && npx playwright install --with-deps chromium
npm run release           # about 75–90 minutes; prints "step N of 6" banners and progress
```

`frontend/dist/` is then the finished website: copy the whole project (with `dist`) to the server and use Step 3.

Or let Docker build it on the server (slow, needs 4 GB memory):

```bash
FRONTEND_MODE=build docker compose build --progress=plain frontend   # 60–120 minutes
docker compose up -d
```

What you will see and how long each step takes:

| Step | Banner | Time |
|---|---|---|
| — | `vite build` | 1–2 min |
| 1 | search-engine pages | 10–20 min |
| 2 | chat knowledge base | under 1 min |
| 3 | llms.txt | under 1 min |
| 4 | first-screen copies of every page | **60–90 min, the longest step**; progress every 10 pages |
| 5 | admin page index | 10–20 min |
| 6 | compressed copies | 1–2 min |
| done | `website ready in dist/` | |

Quick test build without the pre-made pages (the site works, but search engines get less): add
`--build-arg PRERENDER=0` or set `PRERENDER=0` in `.env`.

## Troubleshooting

| What you see | What to do |
|---|---|
| `frontend/dist/ is missing: this folder has no ready-built website` | You unpacked the source zip, not the go-live package. Use the go-live package, or `FRONTEND_MODE=build`. |
| Build from source seems stuck after `llms.txt` | It is step 4 (60–90 minutes). With `--progress=plain` you see a progress line every 10 pages. If there is truly no line for 5 minutes, check memory (`free -h`; 4 GB needed). |
| `ResourceExhausted` / log cut off in Docker | Use `--progress=plain`; 82.5 already keeps the log short. |
| Admin page says "API not reachable" | `docker compose logs backend`; usually a missing value in `.env`. |
| `backend` restarts with a MongoDB error | `MONGO_PASSWORD`/`MONGO_APP_PASSWORD` changed after the first start. They are fixed at the first start of the `mongo` volume; put the old values back. |
| Page video does not show | The page has no video yet (add one in the admin), or the video is switched off. `curl "…/api/v1/page-videos?page=/that-page"` shows what the website gets. |
| Port 8080 already in use | Set `WEB_PORT=8090` in `.env`. |

More: `01-GO-LIVE-STEPS.md` (server and HTTPS), `17-SECURITY.md`, `18-SUPER-ADMIN-GO-LIVE.md`, `14-DEVELOPER-GUIDE.md`.
