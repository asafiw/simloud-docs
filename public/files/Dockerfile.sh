FROM jenkins/jnlp-slave:4.13.2-1-jdk11

WORKDIR /service
COPY config-overrides.js package.json yarn.lock ./
COPY public ./public
COPY src ./src

RUN yarn && yarn build