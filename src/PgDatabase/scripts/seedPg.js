/* eslint-disable no-console */
const path = require('path');
const pgdb = require('../pgconnection.js');

const createArtists = () => {
  const sqlString = `CREATE TABLE Artists (
    _id SERIAL PRIMARY KEY,
    artistId INT NOT NULL,
    artistName VARCHAR(80),
    bio VARCHAR (10) NOT NULL,
    avatar VARCHAR (100) NOT NULL
   )`;

  return pgdb.query('DROP TABLE IF EXISTS Artists')
    .then(() => pgdb.query(sqlString));
};

const createRelatedArtists = () => {
  const sqlString = `CREATE TABLE relatedArtists(
    relative_id SERIAL PRIMARY KEY,
    artistId1 INT,
    artistId2 INT
    )`;

  return pgdb.query('DROP TABLE IF EXISTS relatedArtists')
    .then(() => pgdb.query(sqlString));
};

const seedPgDatabase1 = () => {
  const pathToCSV = process.env.NODE_ENV === 'prod' ? '/home/bitnami/seed_files/artists.csv' : path.resolve(__dirname, '../../artists.csv');
  const delimiter = ',';
  const sqlString = `COPY artists(artistId, artistName, avatar, bio) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return pgdb.query(sqlString);
};

const seedPgDatabase2 = () => {
  const pathToCSV = process.env.NODE_ENV === 'prod' ? '/home/bitnami/seed_files/relatedartists.csv' : path.resolve(__dirname, '../../relatedArtists.csv');
  const delimiter = ',';
  const sqlString = `COPY relatedArtists(artistId1, artistId2) FROM '${pathToCSV}' DELIMITER '${delimiter}' CSV HEADER`;
  return pgdb.query(sqlString);
};

const indexArtistId = () => {
  const sqlString = 'CREATE INDEX idx_artistId ON artists(artistId)';

  return pgdb.query(sqlString);
};

const indexArtistId1 = () => {
  const sqlString = 'CREATE INDEX idx_artistId1 ON relatedArtists(artistId1)';

  return pgdb.query(sqlString);
};

createArtists()
  .then(() => console.log('Created table now importing data'))
  .then(seedPgDatabase1)
  .then(() => console.log('Imported all records now creating index on artistId'))
  .then(indexArtistId)
  .catch(console.log);

createRelatedArtists()
  .then(() => console.log('Created  second table now importing data'))
  .then(seedPgDatabase2)
  .then(() => console.log('Imported all records now creating index on artistId1'))
  .then(indexArtistId1)
  .catch(console.log);
