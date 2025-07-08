FROM node:20 AS build-stage

WORKDIR /app

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm ci

RUN npm run test

RUN npm run build

FROM nginx:1.25-alpine

COPY --from=build-stage /app/dist /usr/share/nginx/html
