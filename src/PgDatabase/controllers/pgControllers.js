const faker = require('faker');
const path = require('path');
const cache = require('../../redisDatabase/redis-connection');
const model = require('../models/relatedArtists.js');

let idCounter = 10000001;

module.exports = {
  // with redis
  getArtistById: (req, res) => {
    const { artistId } = req.query;

    if (artistId === undefined) {
      res.status(400).json({
        message: 'Bad request - must include artistId',
      });
    } else {
      let modelFunction = '';
      let param = '';
      let cacheKey = '';
      if (artistId !== undefined) {
        modelFunction = model.getArtistById;
        param = artistId;
        cacheKey = `artistId=${artistId}`;
      }

      // With Cache
      cache.retrieveFromCache(cacheKey)
        .then((results) => {
          if (results) {
            res.status(200).json(results);
          } else {
            modelFunction(param)
              .then((artist) => {
                const messageObj = {
                  message: 'Successfully retrieved artist',
                  artist: artist.rows,
                };
                res.status(200).json(messageObj);
                return messageObj;
              })
              .then((value) => cache.addToCache(cacheKey, value))
              .catch((err) => res.status(400).json({
                message: 'Failed to find artist',
                error: err,
              }));
          }
        });

    // // get artists by id from db without redis
    // getArtistById: (req, res) => {
    //   const { artistId } = req.query;
    //   if (artistId === undefined) {
    //     res.status(400).json({
    //       message: 'Bad request - must include artistId',
    //     });
    //   } else {
    //     model.getArtistById(artistId)
    //       .then((artist) => {
    //         res.status(200).json({
    //           message: 'Successfully retrieved artist',
    //           artist: artist.rows,
    //         });
    //       })
    //       .catch((err) => res.status(400).json({
    //         message: 'Failed to find artist',
    //         error: err,
    //       }));
    //   }
    // },
    }
  },
  // with redis
  getRelatedArtists: (req, res) => {
    const { artistId } = req.query;

    if (artistId === undefined) {
      res.status(400).json({
        message: 'Bad request - must include artistId',
      });
    } else {
      let modelFunction = '';
      let param = '';
      let cacheKey = '';
      if (artistId !== undefined) {
        modelFunction = model.getRelatedArtists;
        param = artistId;
        cacheKey = `rel-artistId=${artistId}`;
      }

      // With Cache
      cache.retrieveFromCache(cacheKey)
        .then((results) => {
          if (results) {
            res.status(200).json(results);
          } else {
            modelFunction(param)
              .then((artist) => {
                const messageObj = {
                  message: 'Successfully retrieved artist',
                  artist: artist.rows,
                };
                res.status(200).json(messageObj);
                return messageObj;
              })
              .then((value) => cache.addToCache(cacheKey, value))
              .catch((err) => res.status(400).json({
                message: 'Failed to find artist',
                error: err,
              }));
          }
        });
    }
  // gets artists by ids in related artists table
  // getRelatedArtists: (req, res) => {
  //   const { artistId } = req.query;
  //   if (artistId === undefined) {
  //     res.status(400).json({
  //       message: 'Bad request - must include artistId',
  //     });
  //   } else {
  //     model.getRelatedArtists(artistId)
  //       .then((data) => res.json({
  //         message: 'Success retrieving artists',
  //         artists: data.rows,
  //       }))
  //       .catch((err) => res.status(400).json({
  //         message: 'Failed to find related artists',
  //         error: err,
  //       }));
  //   }
  },

  addNewArtist: (req, res) => {
    let newArtist = { artistName: req.body };
    newArtist.artistId = idCounter;
    newArtist = faker.internet.userName();
    newArtist.bio = 'Artist';
    newArtist.avatar = faker.image.avatar();
    if (newArtist !== undefined) {
      model.addNewArtist(newArtist);
      idCounter += 1;
    } else {
      res.status(400).json({
        message: 'Bad request - must include artistName',
      });
    }
  },

  getImage: (req, res) => {
    res.sendFile(path.join(__dirname, '../../../public/playicon.png'));
  },

  deleteArtistById: (req, res) => {
    const { artistId } = req.query;

    if (artistId !== undefined) {
      model.deleteArtistById(artistId)
        .then(() => res.status(200).json({
          message: 'Successfully deleted artist',
        }))
        .catch((err) => res.status(400).json({
          message: 'Failed to delete artist',
          error: err,
        }));
    } else {
      res.statu(400).json({
        message: 'Bad request - must include an artistId',
      });
    }
  },

  updateArtistById: (req, res) => {
    const { artistId, artistName, avatar } = req.body;

    if (artistId && artistName && avatar) {
      model.updateArtistById({ artistId, artistName, avatar })
        .then(() => res.status(200).json({
          message: 'Successfully updated artist',
        }))
        .catch((err) => res.status(400).json({
          message: 'Failed to update artist',
          error: err,
        }));
    } else {
      res.status(400).json({
        message: 'Bad request - must include artistId, artistName, and avatar',
      });
    }
  },

};
