// eslint-disable-next-line import/order
const config = require('../../config');
require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

const Router = require('../PgDatabase/router/index.js');

// change router to use mongoDb
// const Router = require('../mongoDatabase/router/index.js');

// import database connection
// const mongoDb = require('../mongoDatabase/connection.js');

const app = express();

const PORT = config.app.port;

app.use(express.static(path.join(__dirname, '/../../public')));
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use('/data/artist', Router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
