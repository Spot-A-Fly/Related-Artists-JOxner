/* eslint-disable no-console */
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost/artistsdb', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const mongoDb = mongoose.connection;

// Bind connection to error event (to get notification of connection errors)
mongoDb.on('error', console.error.bind(console, 'MongoDB connection error:'));

mongoDb.on('connected', () => console.log('connected'));


// export db everytime
module.exports = { mongoDb };
