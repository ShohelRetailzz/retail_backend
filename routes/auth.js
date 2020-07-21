const router = require('express').Router();
const User = require('../models/User');
const passport = require('passport');
const passportConfig = require('../passport');
const UserController = require('../controllers/UserController');


router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res, next) => {
	try{
		//req.user.fullname = user.name;
		return res.send(req.user);
	} catch(error) { 
		return res.send(error);
	}
});

module.exports = router;