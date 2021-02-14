'use strict';

const AuthorsCtrl = require('../controllers/authors');

module.exports = (app, express) => {
  // create the API routes
  let router = express.Router();

  router.get('/authors/', AuthorsCtrl.findAll);
  router.post('/authors/', AuthorsCtrl.create);
  router.get('/authors/:id', AuthorsCtrl.findOne);
  router.patch('/authors/:id', AuthorsCtrl.update);
  router.delete('/authors/:id', AuthorsCtrl.delete);

  return router;
};