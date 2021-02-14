const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./server/models");
const books = require('./server/models/books');

const app = express();

const apiBaseRoute = '/api';

app.use(cors());

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get(apiBaseRoute, (req, res) => {
  res.json({ message: 'Welcome to the sequelize API' });
});

/**
 * Set static files location
 * used for requests that our frontend will make
 */
app.use('/', express.static(__dirname + '/public'));

/**
 * API routes
 */
const booksRoutes = require('./server/routes/books')(app, express);
app.use(apiBaseRoute, booksRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});