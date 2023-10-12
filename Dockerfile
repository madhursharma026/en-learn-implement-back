FROM node:lts-alpine3.18 AS base


FROM base AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

################
## PRODUCTION ##
################
# Build another image named production
FROM base AS production

# Set node env to prod
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}


WORKDIR /usr/src/app


RUN npm install --only=production
COPY --from=development /usr/src/app/dist ./dist


EXPOSE 3000

CMD ["node", "dist/main"]
