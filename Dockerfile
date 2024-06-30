FROM node:20.10.0 as builder

WORKDIR /app/medusa

COPY . . 

RUN rm -rf node_modules

#RUN apt-get update

#RUN apt-get install -y python

#RUN npm install -g npm@latest

RUN npm install --loglevel=error

RUN npm run build


FROM node:20.10.0

WORKDIR /app/medusa

RUN mkdir dist

COPY package*.json ./ 

COPY develop.sh .

COPY .env .

COPY medusa-config.js .

#RUN apt-get update

#RUN apt-get install -y python
# RUN apk add --no-cache python3

RUN npm install @medusajs/medusa-cli

RUN npm i --only=production

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