
require('newrelic');

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const config = require('../../config');
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

// app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`));

app.use('/data/artist', Router);

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
