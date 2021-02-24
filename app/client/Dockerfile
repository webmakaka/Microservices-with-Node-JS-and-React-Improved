FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "run", "dev"]