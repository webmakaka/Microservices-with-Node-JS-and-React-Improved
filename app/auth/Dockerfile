FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set //npm.pkg.github.com/:_authToken=1a4a607147fb9eb94f8304b1b9b39d1019c571dc
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]
