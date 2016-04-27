console.log('Hello from api.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var conf = require('../config/conf');

router.use(passport.initialize());
require('./auth/jwsStrategy.js')(passport);

var auth = require('./auth/auth.js');
router.use('/auth/', auth);

var routes = require('./routes');
router.use('/', routes);

module.exports = router;
