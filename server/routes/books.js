'use strict';

const BooksCtrl = require('../controllers/books');

module.exports = (app, express) => {
  // create the API routes
  let router = express.Router();

  router.get('/books/', BooksCtrl.findAll);
  router.post('/books/', BooksCtrl.create);
  router.get('/books/:book_id', BooksCtrl.findOne);
  router.patch('/books/:book_id', BooksCtrl.update);
  router.delete('/books/:book_id', BooksCtrl.delete);

  return router;
};