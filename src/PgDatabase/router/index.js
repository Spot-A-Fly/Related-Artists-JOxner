const router = require('express').Router();
const relatedArtistControllers = require('../controllers/pgControllers.js');

router.get('/', relatedArtistControllers.getArtistById);

router.get('/related', relatedArtistControllers.getRelatedArtists);

router.get('/icon', relatedArtistControllers.getImage);

router.post('/', relatedArtistControllers.addNewArtist);

router.delete('/', relatedArtistControllers.deleteArtistById);

router.put('/', relatedArtistControllers.updateArtistById);

module.exports = router;
