FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
# RUN npm config set //npm.pkg.github.com/:_authToken=43fb630d62fa9b844d62c9faf11f4e6e9b62exxx
# RUN npm config set @webmakaka:registry https://npm.pkg.github.com/webmakaka
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]