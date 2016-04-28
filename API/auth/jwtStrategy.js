console.log('Hello from jwtstrategy.js');
var jwt = require('jwt-simple');
var passportJwt = require('passport-jwt');
var JwtStrategy = passportJwt.Strategy;
var ExtractJwt = passportJwt.ExtractJwt;
var User = require('../../models/user');
var conf = require('../../config/conf');

module.exports = function (passport) {
  var opts = {};
  opts.secretOrKey = conf.secret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
    User.findOne({_id: jwt_payload._id}, function (err, user) {
      if (err) return done(err, false);
      if (user) done(null, user);
      else done(null, false);
    });
  }));
};
