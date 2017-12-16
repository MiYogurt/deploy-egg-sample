from node:9.2.0

add . /app

expose 8080:7001

workdir /app

run npm i

run npm run start