require('dotenv').config();
const passport = require('passport');
const User = require('./models/User');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
//opts.issuer = 'accounts.examplesoft.com';
//opts.audience = 'yoursite.net';
module.exports = passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	//console.log(jwt_payload);
    User.findOne({where: {id: jwt_payload.data.userID}}).then((user) => {
        /*if (err) {
            return done(err, false);
        }*/
        if (user) {
        	console.log(user);
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    }).catch(err => done(err, false));
}));