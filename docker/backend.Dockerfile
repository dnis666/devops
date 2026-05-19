FROM node:22-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json* ./
COPY eslint.config.mjs ./
COPY apps/backend/package.json apps/backend/package.json

RUN npm install --workspace @portfolio/backend --include-workspace-root

COPY apps/backend apps/backend

RUN npm run build --workspace @portfolio/backend

FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV PORT=4000

WORKDIR /app

COPY package.json package-lock.json* ./
COPY apps/backend/package.json apps/backend/package.json

RUN npm install --omit=dev --workspace @portfolio/backend --include-workspace-root \
  && npm cache clean --force

COPY --from=builder /app/apps/backend/dist apps/backend/dist

WORKDIR /app/apps/backend

EXPOSE 4000

CMD ["node", "dist/server.js"]
