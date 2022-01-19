FROM node:16-alpine
EXPOSE 9000
WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build
RUN mv .env.example .env
ENTRYPOINT [ "yarn", "start"]
