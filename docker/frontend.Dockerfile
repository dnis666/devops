FROM node:22-alpine AS builder

ARG NEXT_PUBLIC_API_BASE_URL=/api
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

WORKDIR /app

COPY package.json package-lock.json* ./
COPY eslint.config.mjs ./
COPY apps/frontend/package.json apps/frontend/package.json

RUN npm install --workspace @portfolio/frontend --include-workspace-root

COPY apps/frontend apps/frontend

RUN npm run build --workspace @portfolio/frontend

FROM node:22-alpine AS runner

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

WORKDIR /app

COPY --from=builder /app/apps/frontend/.next/standalone ./
COPY --from=builder /app/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /app/apps/frontend/public ./apps/frontend/public

WORKDIR /app/apps/frontend

EXPOSE 3000

CMD ["node", "server.js"]
