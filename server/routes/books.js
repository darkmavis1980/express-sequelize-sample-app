'use strict';

const BooksCtrl = require('../controllers/books');

module.exports = (app, express) => {
  // create the API routes
  let router = express.Router();

  router.get('/books/', BooksCtrl.findAll);
  router.post('/books/', BooksCtrl.create);
  router.get('/books/:id', BooksCtrl.findOne);
  router.patch('/books/:id', BooksCtrl.update);
  router.delete('/books/:id', BooksCtrl.delete);

  return router;
};