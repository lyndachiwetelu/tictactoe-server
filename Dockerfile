FROM node:14-alpine as build

WORKDIR /app
COPY package.json yarn.lock /app/
RUN yarn install --prod --silent
RUN yarn global add typescript
COPY . /app
RUN yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /app/ .
RUN yarn global add pm2 typescript
EXPOSE 4001

CMD ["sh", "-c", "pm2-runtime start build/server.js"]
