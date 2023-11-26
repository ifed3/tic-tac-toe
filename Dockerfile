FROM node:alpine

RUN apk update

WORKDIR /forever

COPY ["package*.json", "tsconfig.json", ".env", "./"]

RUN npm install

COPY ./src ./src

RUN npm run build