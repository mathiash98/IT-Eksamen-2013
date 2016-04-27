console.log('Hello from lag.js');
var mongoose = require('mongoose');
var Liga = require('./liga');
var User = require('./user');

var lagSchema = new mongoose.Schema({
  navn: String,
  _liga: {type: mongoose.Schema.Types.ObjectId, ref: 'Liga'},
  _lagLeder: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'lag'});

module.exports = mongoose.model('Lag', lagSchema);
