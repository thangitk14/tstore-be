FROM node:22

WORKDIR /app/medusa

COPY . . 

RUN rm -rf node_modules

RUN rm -rf dist

RUN rm -rf .cache

COPY package*.json ./ 

COPY .env .

COPY medusa-config.js .

RUN npm install -g @medusajs/medusa-cli

RUN npm install -g cross-env

RUN npm install

ENTRYPOINT ["npm", "run", "start"]

## RUN Docker desktop
##
## Fix error Error: getaddrinfo EAI_AGAIN registry.npmjs.org
## vi /etc/docker/daemon.json
## { "dns": ["8.8.8.8", "8.8.4.4"] }
##
## Migrations
## medusa migrations run
##
## Build: 
##    docker build . -t <name>
##    docker build . -t tstore-be
## Run: 
##    docker run --name <name container> -p <port local>:<port host>/tcp -d <name image>
##    docker run --name tstore-be_container -p 9000:9000/tcp -d tstore-be