FROM node:16

WORKDIR /app

ARG VERDACCIO_REGISTRY=${VERDACCIO_REGISTRY}
ARG VERDACCIO_TOKEN=${VERDACCIO_TOKEN}

RUN echo "registry=http://${VERDACCIO_REGISTRY}/" >> ~/.npmrc \
    && echo "//${VERDACCIO_REGISTRY}/:_authToken=${VERDACCIO_TOKEN}" >> ~/.npmrc

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE $PORT

CMD ["node", "build/src/index.js"]