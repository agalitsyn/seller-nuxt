FROM node:lts as builder

WORKDIR /app

COPY package*.json ./

RUN npm install -g pnpm

RUN pnpm install --prod

COPY . .

RUN pnpm run build


FROM node:lts

WORKDIR /app

COPY --from=builder /app/.output  /app/.output

ENV NITRO_PORT=80

EXPOSE 80

CMD [ "node", ".output/server/index.mjs" ]
