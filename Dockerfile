FROM node:20 as dev

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY tsconfig.json .env ./
COPY src/ src/

RUN npm run build

FROM node:20 as prod

WORKDIR /prod

COPY package*.json .env ./

RUN npm ci --omit=dev

COPY --from=dev /usr/src/app/dist ./dist