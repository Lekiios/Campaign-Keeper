FROM node:22-alpine
WORKDIR /app
COPY package.json yarn.lock .yarnrc.yml ./
RUN corepack enable
RUN yarn install
COPY . .
RUN yarn build
CMD ["sh", "-c", "yarn db:migrate:prod && node dist/index.js"]
EXPOSE $SERVER_DOCKER_PORT
