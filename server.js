const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require("./server/models");

const app = express();

app.use(cors());

db.sequelize.sync();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the sequelize API' });
});

// set port, listen for requests
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});