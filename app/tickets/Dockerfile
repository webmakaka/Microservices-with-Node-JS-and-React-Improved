FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set //npm.pkg.github.com/:_authToken=eb9eae17b23d4b5cf0272708b678703ff84816e9
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]