FROM node:18-alpine AS builder

WORKDIR /app

RUN apk add --no-cache python3 build-base

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn run build:locales
RUN yarn run build

FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV production

# Run as non-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production --frozen-lockfile

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["yarn", "run", "start"]