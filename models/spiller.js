console.log('Hello from spiller.js');
var mongoose = require('mongoose');
var Lag = require('./lag');

var spillerSchema = new mongoose.Schema({
  navn: String,
  _lag: {type: mongoose.Schema.Types.ObjectId, ref: 'Lag'},
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'spiller'});

module.exports = mongoose.model('Spiller', spillerSchema);
