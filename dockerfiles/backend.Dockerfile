# ============ BUILD ============
FROM node:17-slim as build

WORKDIR /app
COPY ./package.json .

WORKDIR /app/common

COPY ./common .
RUN npm install && \ 
    npm run build

WORKDIR /app/backend

COPY ./backend .
RUN npm install && \
    npx prisma generate && \
    npm run build

# ============ PACKAGE ============
FROM node:17-slim as package

WORKDIR /app
COPY ./package.json .

WORKDIR /app/common
COPY ./common/package.json .
RUN npm install --omit=dev

WORKDIR /app/backend
COPY ./backend/package.json .
RUN npm install --omit=dev

# ============ PRODUCTION ============
FROM node:17-slim as production

ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

WORKDIR /app
COPY ./package.json .
COPY --from=package /app/node_modules ./node_modules

WORKDIR /app/common
COPY ./common/package.json .
COPY --from=build /app/common/dist ./dist

WORKDIR /app/backend
COPY ./backend/package.json .
COPY --from=build /app/backend/dist ./dist
COPY ./backend/prisma ./prisma
RUN npx prisma generate

ARG SERVER_PORT=4000
ARG TIMEZONE_OFFSET=3

ENV SERVER_PORT=${SERVER_PORT}
ENV TIMEZONE_OFFSET=${TIMEZONE_OFFSET}

ENTRYPOINT ["npm", "run"]

CMD ["start"]
