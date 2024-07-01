FROM node:22 as builder
WORKDIR /app/medusa
RUN npm install -g yarn
COPY . . 
RUN rm -rf node_modules
RUN yarn install
RUN yarn build

FROM node:22
WORKDIR /app/medusa
RUN mkdir dist
COPY package*.json ./ 
COPY develop.sh .
COPY .env .
COPY medusa-config.js .

RUN npm install -g @medusajs/medusa-cli
RUN yarn install
COPY --from=builder /app/medusa/dist ./dist

EXPOSE 9000

ENTRYPOINT ["./develop.sh", "start"]

## RUN Docker desktop
## Build: 
##    docker build . -t <name>
##    docker build . -t tstore
## Run: 
##    docker run --name <name container> -p <port local>:<port host>/tcp -d <name image>
##    docker run --name tstore_container -p 9000:8000/tcp -d tstore