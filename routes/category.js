var express = require('express');
var router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const CategoryController = require('../controllers/CategoryController')

/* GET listing. */
router.get('/', passport.authenticate('jwt', { session: false }), CategoryController.index);

/* find categories */
router.post('/find', passport.authenticate('jwt', { session: false }), CategoryController.find);

/* Create category */
router.post('/', passport.authenticate('jwt', { session: false }), CategoryController.save);

/*Get category by id*/
router.get('/:id\*', passport.authenticate('jwt', { session: false }), CategoryController.edit);

/*Update category*/
router.put('/:id\*', passport.authenticate('jwt', { session: false }), CategoryController.update);

/*Delete category*/
router.delete('/:id\*', passport.authenticate('jwt', { session: false }), CategoryController.delete);

/*Delete category with auth*/
router.post('/:id\*', passport.authenticate('jwt', { session: false }), CategoryController.deleteEntityWithAuth);

/* u categories */
router.post('/deleteEntities', passport.authenticate('jwt', { session: false }), CategoryController.deleteByIds);

module.exports = router;