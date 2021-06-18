FROM node:14.16.0-alpine3.10

COPY . /usr/src/app

WORKDIR /usr/src/app

expose 80

RUN npm install --production

CMD ["npm","run", "start:prod"]