FROM node:alpine
WORKDIR /user/app/client
COPY package.json yarn.lock ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn","start"]