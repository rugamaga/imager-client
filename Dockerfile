FROM node:12.6.0-alpine as build-deps
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build

FROM nginx:alpine

# install htpasswd command
RUN apk add --no-cache --update apache2-utils

COPY ./nginx/run.sh /
COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

STOPSIGNAL SIGTERM
EXPOSE 80

CMD ["/run.sh"]
