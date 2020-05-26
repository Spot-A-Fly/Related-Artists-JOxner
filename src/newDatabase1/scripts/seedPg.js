const fs = require('fs');
const faker = require('faker');
// const { Aritst, artistSchema } = require('../models/artists.js');
const writeRelArtists = fs.createWriteStream('rel-artists.csv');
writeRelArtists.write('artistId,relatedId\n', 'utf8');

const writeArtists = fs.createWriteStream('new-artists.csv');
writeArtists.write('artistId,artistName,avatar,bio\n', 'utf8');

function writeUsers(artiststream, relatedstream, encoding, callback) {
  let i = 100;
  let id = 0;
  function write() {
    let ok = true;
    do {
      i -= 1;
      id += 1;
      const artistName = faker.internet.userName();
      const avatar = faker.image.avatar();
      const bio = 'Artist';
      const data = `${id},${artistName},${avatar},${bio}\n`;
      if (i === 0) {
        artiststream.write(data, encoding, callback);
      } else {
        // see if we should continue, or wait
        // don't pass the callback, because we're not done yet.
        ok = artiststream.write(data, encoding);
      }
      const random = Math.ceil(Math.random() * 30);
      for (let j = 0; j < random; j += 1) {
        const artistsId = id;
        const relatedId = Math.ceil(Math.random() * 10000000);
        const otherData = `${artistsId},${relatedId}\n`;
        relatedstream.write(otherData, encoding, callback);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // had to stop early!
      // write some more once it drains
      relatedstream.once('drain', write);
      artiststream.once('drain', write);
    }
  }
  write();
}

writeUsers(writeArtists, writeRelArtists, 'utf-8', () => {
  writeArtists.end();
  writeRelArtists.end();
});