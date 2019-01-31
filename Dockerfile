FROM node:10.15.1-alpine as base

RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install / Build
FROM base as dependencies

COPY package.json .
COPY package-lock.json .
COPY yarn.lock .

RUN yarn --production --ignore-scripts
RUN yarn

ENV CI true
ENV NODE_TLS_REJECT_UNAUTHORIZED 0

COPY .graphqlconfig .
COPY app.ts .
COPY tsconfig.json .
COPY tslint.json .
COPY config/ ./config/
COPY graphql/ ./graphql/
COPY bin/ ./bin/
COPY server/ ./server/

# Run
FROM base as run

COPY --from=dependencies /opt/app .

ENV PORT 3000
ENV ADDR 0.0.0.0
EXPOSE $PORT

ENV NODE_TLS_REJECT_UNAUTHORIZED 0
