# Super admin: complete files (build 82.6)

The super admin runs inside the website, so this package is the whole buildable project. `docker compose up -d --build`
works straight from this folder (after `cp .env.example .env` and filling it in, see docs/go-live/18-SUPER-ADMIN-GO-LIVE.md).

| Path | What it is |
|---|---|
| `docker-compose.yml`, `.env.example` | The three containers (mongo, backend, frontend) and their settings |
| `frontend/package.json`, `package-lock.json`, `Dockerfile`, `.dockerignore`, `.nvmrc` | Frontend container build (website + admin screens, nginx) |
| `frontend/nginx/` | nginx config used by the frontend Dockerfile (passes /api to the backend) |
| `frontend/src/admin/` | Every super admin screen (incl. Page video component: WebVideos.jsx, pagevideo-player.js) |
| `frontend/src/`, `public/`, `index.html`, `vite.config.js`, `vite/`, `scripts/`, `tools/` | Website source and build scripts (the admin is built with it) |
| `backend/package.json`, `package-lock.json`, `Dockerfile`, `.dockerignore`, `.nvmrc`, `.env.example` | Backend container build |
| `backend/src/`, `backend/test/`, `backend/tools/` | API, all admin routes, page list (`src/data/site-pages.json`), tests, CLI tools |
| `mongo/init/` | Database start-up script (private database user) |
| `docs/go-live/` | All guides; start with 20 (developer go-live step by step), 18 (super admin go-live) and 19 (page video component) |

Not included (made during the build or private): `node_modules`, `.env`. The GO-LIVE zip also has `frontend/dist/`
(the finished website), so `docker compose up -d --build` needs no build on the server.
