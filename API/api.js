console.log('Hello from api.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var conf = require('../config/conf');

mongoose.connect(conf.dbUrl); // connect to mongoDB database

router.use(passport.initialize());

require('./auth/jwtStrategy.js')(passport);

var auth = require('./auth/auth.js');
router.use('/auth/', auth);

var routes = require('./routes');
router.use('/', routes);

module.exports = router;
