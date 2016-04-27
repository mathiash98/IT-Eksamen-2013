console.log('Hello from api.js');
var express = require('express');
var app = express();
var passport = require('passport');
var conf = require('../config/conf');

app.use(passport.initialize());
require('./auth/jwsStrategy.js')(passport);

var auth = require('./auth/auth');
app.use('/auth', auth);

var routes = require('./routes');
app.use('*', routes);

module.exports(app);
