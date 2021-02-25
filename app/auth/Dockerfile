FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set //npm.pkg.github.com/:_authToken=0c1fa397ef26e1cd63672b7bb20247cfbecdfa82
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]
