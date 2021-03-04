FROM node:lts-alpine3.13

WORKDIR /app
COPY package.json ./
RUN npm install --only=prod
COPY ./ ./
CMD ["npm", "start"]