const db = require('../pgconnection.js');


module.exports = {
  getArtistById: (artistId) => {
    const sqlString = 'SELECT * FROM Artists WHERE artistId = $1';

    return db.query(sqlString, [artistId]);
  },

  getRelatedArtists: (artistId) => {
    console.log(artistId);
    const sqlString = `SELECT
    a.artistname AS main_artist,
    b.artistname AS related_artist_name, 
    b.bio AS related_artist_bio, 
    b.avatar AS related_artist_avatar
    FROM relatedartists AS ra
    JOIN artists as a ON ra.artistid1 = a.artistid
    JOIN artists as b ON ra.artistid2 = b.artistid
    WHERE a.artistid = $1`;

    return db.query(sqlString, [artistId]);
  },

  addNewArtist: (newArtist) => {
    const sqlString = 'INSERT INTO Artists(newArtist) VALUES ($1)';

    return db.query(sqlString, [newArtist]);
  },

  deleteArtistById: (artistId) => {
    const sqlString = 'DELETE FROM Artists WHERE artistId = $1';

    return db.query(sqlString, [artistId]);
  },

  updateArtistById: ({ artistId, artistName, avatar }) => {
    const sqlString = 'UPDATE Artists SET artistName = $2, avatar = $3 WHERE artistId = $1';

    return db.query(sqlString, [artistId, artistName, avatar]);
  },


};
