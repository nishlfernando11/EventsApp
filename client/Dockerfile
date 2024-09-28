FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /
COPY package*.json ./
EXPOSE 3000

FROM base as builder
WORKDIR /
RUN npm install
COPY . .

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build


FROM base as production
WORKDIR /

ENV NODE_ENV production
RUN npm ci

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs


COPY --from=builder --chown=nextjs:nodejs /.next ./.next
RUN true
COPY --from=builder /node_modules ./node_modules
RUN true
COPY --from=builder /package.json ./package.json
RUN true
COPY --from=builder /next.config.js ./next.config.js
RUN true
COPY --from=builder /public ./public

CMD npm start
