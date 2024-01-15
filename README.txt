FRONT END BUILD CMD

docker run -d -p 3000:3000 --rm --name goals-fe -it goals-react

BACKEND BUILD CMD

docker run -d -p 80:80 --network goals-net --name goals-be goals-node