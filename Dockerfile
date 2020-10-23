FROM node:12.19.0-alpine

WORKDIR /home/node/app

USER node

RUN npm install

COPY --chown=node:node . .

EXPOSE 3000

CMD [ "npm", "run", "start"]