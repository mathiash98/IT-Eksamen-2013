console.log('Hello from index.js');
// set up ========================
var express = require('express');
var app = express(); // create our app w/ express
var mongoose = require('mongoose'); // mongoose for mongodb
var morgan = require('morgan'); // log requests to the console (express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var conf = require('./config/conf.js');
// configuration =================

mongoose.connect(conf.dbUrl); // connect to mongoDB database on modulus.io

app.use(express.static(__dirname + '/app')); // set the static files location /public/img will be /img for users
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

var api = require('./API/api.js');
app.use('/api', api)


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");
