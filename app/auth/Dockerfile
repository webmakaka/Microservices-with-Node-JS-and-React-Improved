FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm config set //npm.pkg.github.com/:_authToken=1f4e1ba601c093530ecd394adaa3acce55ea39f9
RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]
