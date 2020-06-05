# Spotifly (Spotify clone)
Legacy code description:
The application is intendted to be a clone of the UI of spotify. 
The specific component is the related artists that renders a list
of related artists. The app is a microservice of the whole page which
is shown here.

SDC description:
Built two database systems for one express server.These databses are a MongDb and a PostgresQl databse with redis cacheing database for performance. These databases are connected to the front end client via multiple endpoints and have been tested to reach 900 + request per-second. A MVC architecture hs been utilized and is arranged as such.

![Spotifly Page](https://github.com/juicy-fec/related-artists-client/blob/master/FECdemo.png)

## Related Projects

  - https://github.com/juicy-fec/related-artists-proxy - legacy code
  - https://github.com/Spot-A-Fly/SDC-Related-Artists_Module-JOxner - new code

## Table of Contents
1. [Technologies](#Technologies)
1. [Requirements](#Requirements)
1. [Installing](#Installing)
1. [License](#License)

### Technologies
- React
- TravisCI
- Express
- Docker
- AWS
- Styled Components
- mongodb
- postgresql
- redis

### Requirements
- node 10.15.3
- docker-compose 3

### Installing
1. npm install

2. if seeding mongodb npm run seed-mongo-db then mongoimport -d artistsdb -c artists --type csv --file artists.csv --headerline in terminal

3. if seeding postgresql database npm run seed-pg-db

4. using docker-compose
From the root folder of the project
```sh
docker-compose up
```
then when the docker-compose finishes, use the link in browser
```sh
http://localhost:3030/#related
```
### License
refer to the [License](https://github.com/juicy-fec/related-artists-client/blob/master/LICENSE.md)

