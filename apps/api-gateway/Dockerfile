FROM node:18 As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install
RUN npx prisma generate

COPY . .

RUN npm run build api-gateway

CMD [ "node", "dist/src/main" ]
CMD [ "npx", "prisma", "migrate", "dev" ]
CMD [ "npm", "run", "start:migrate:docker" ]

#FROM node:18 as production
#
#ARG NODE_ENV=production
#ENV NODE_ENV=${NODE_ENV}
#
#WORKDIR /usr/src/app
#
#COPY package*.json ./
#
#RUN npm install --only=production
#
#COPY . .
#
#COPY --from=development /usr/src/app/dist ./dist
#
#CMD ["node", "dist/apps/api-gateway/main"]