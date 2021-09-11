require('dotenv').config();
const {sequelize} = require('../config');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const {loginValidation, registrationValidation} = require('../validators/UserValidators');

//loggedToken
getLoggedTokent = user => {
	return jwt.sign({
			exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
			data: {userID: user.id}
		}, process.env.JWT_SECRET);
}

module.exports = {
	register: async (req, res, next) => {
		try{
			//check validation
			const {error} = registrationValidation(req.body);
			if (error) return res.status(400).json({error: true, message: error.details[0].message});

			const emailExists = await User.findOne({where: {email: req.body.email} });
			if (emailExists) return res.json({error: true, message: 'Email already exists'});

			const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(req.body.password, salt);

			const user = await User.create({ fullname: req.body.fullname, email: req.body.email, password: hashPassword });
			
			//create and assign token
			const token = getLoggedTokent(user);

			return res.json({error: false, accessToken: token, user: user});
			
		} catch(error) {
			res.status(400).json({error: true, message: error});
		}
	},

	login: async (req, res, next) => {
		try {

			//check validation
			const {error} = loginValidation(req.body);
			if (error) return res.status(400).json({error: true, message: error.details[0].message});

			const user = await User.findOne({where: {email: req.body.email} });
			if (!user) return res.status(400).json({error: true, message: 'Email or password is invalid'});

			//check password
			const validPass = await bcrypt.compare(req.body.password, user.password);

			if (!validPass) return res.status(400).json({error: true, message: 'Invalid password'});

			//create and assign token
			const token = getLoggedTokent(user);

			return res.json({error: false, accessToken: token, user: user});

		} catch(error) {
			return res.status(404).json({error: true, message: error});
		}
	}
}