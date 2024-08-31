FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /client
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /client
RUN npm install
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build


FROM base as production
WORKDIR /client

ENV NODE_ENV production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /client/.next ./.next
RUN true
COPY --from=builder /client/node_modules ./node_modules
RUN true
COPY --from=builder /client/package.json ./package.json
RUN true
COPY --from=builder /client/next.config.js ./next.config.js
RUN true
COPY --from=builder /client/public ./public

CMD npm start
