# NODE | REACT | DOCKER | MONGODB

A Full Stack Project involving

## Technologies

- Node.js
- React
- Docker
- MongoDB

## Procedure

\*DO A GIT CLONE

git clone https://github.com/1sujay1/Docker-FE-BE.git

\*GO INSIDE DIRECTORY

cd DOCKER_FE_BE

\*CREATE A NETWORK

## docker network create goals-net

\*FRONT END BUILD CMD

## docker build -t goals-react

## docker run -d -p 3000:3000 --rm --name goals-fe -it goals-react

\*BACKEND BUILD CMD

## docker build -t goals-node

## docker run -d -p 80:80 --network goals-net --name goals-be goals-node

\*MONGODB CMD

## docker run -d -p 27017:27017 --name mongodb --network goals-net mongo
