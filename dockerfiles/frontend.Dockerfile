# ============ BUILD ============
FROM node:17-slim as build

WORKDIR /app
COPY ./package.json .

WORKDIR /app/common

COPY ./common .
RUN npm install && \ 
    npm run build

WORKDIR /app/frontend

ARG REACT_APP_API_URL=http://localhost:4000
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

COPY ./frontend .
RUN npm install && \
    npm run build

# ============ PRODUCTION ============
FROM nginx:1.19.0 as production

COPY ./frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/frontend/build /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
