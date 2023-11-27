# Use the official Node.js 14 image as a parent image
FROM node:21.2.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "node", "dist/main.js" ]
