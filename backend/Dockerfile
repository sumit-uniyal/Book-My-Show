FROM node:23.10-alpine

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 9000

CMD [ "npm", "start" ]