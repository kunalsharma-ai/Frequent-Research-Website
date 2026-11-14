# Backend: the Express API on Node 24.
#   docker build -t fr-backend ./backend
#   docker run -p 8787:8787 -e MONGODB_URI=mongodb://… -e REVIEW_SECRET=… -e ADMIN_TOKEN=… fr-backend
# Everything is stored in MongoDB (MONGODB_URI); the container itself keeps no data.
FROM node:24-alpine
ENV NODE_ENV=production PORT=8787
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY src ./src
COPY tools ./tools
# build 82.1: the container runs read-only; /backups is the one place it may write (a volume in docker-compose.yml)
RUN mkdir -p /backups && chown node:node /backups
USER node
EXPOSE 8787
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://127.0.0.1:8787/healthz || exit 1
CMD ["node", "src/server.js"]
