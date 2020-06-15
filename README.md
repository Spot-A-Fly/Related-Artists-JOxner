# Spotifly (Spotify clone)
![](MusicManagerDemo.gif)


Legacy code description:
The application is intended to be a clone of the UI of spotify. 
The specific component is the related artists widget that renders a list
of related artists. The app is a microservice of the whole page which
is shown here. The front end is not my work!!!!

SDC description:
Built two back-end database systems for one express server.These databases are a MongDb and a PostgresQl database with Redis cacheing database for performance. The databases are connected to the front-end client via multiple endpoints and have been tested to reach 900 + request per-second locally and over 12000 rps deployed. A MVC architecture hs been utilized and the file structure is arranged as such.

![Legacy Code](https://github.com/juicy-fec/related-artists-client/blob/master/FECdemo.png)

## Related Projects

  - https://github.com/juicy-fec/related-artists-proxy - Legacy code
  - https://github.com/Spot-A-Fly/Related-Artists-JOxner - New code

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

