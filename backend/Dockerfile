FROM node:14-alpine
RUN mkdir -p /app
WORKDIR /app
ADD . /app
RUN yarn install
EXPOSE 8100
CMD [ "yarn", "start" ]