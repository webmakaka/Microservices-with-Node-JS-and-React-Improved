FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set //npm.pkg.github.com/:_authToken=fef028a45797ce214a6507da397ad742758a2450
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]
