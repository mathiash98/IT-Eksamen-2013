console.log('Hello from kamp.js');
var mongoose = require('mongoose');
var Lag = require('./lag');

var kampSchema = new mongoose.Schema({
  hjemme_lag: {type: mongoose.Schema.Types.ObjectId, ref: 'Lag'},
  borte_lag: {type: mongoose.Schema.Types.ObjectId, ref: 'Lag'},
  sted: String,
  tid: Date,
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'kamp'});

module.exports = mongoose.model('Kamp', kampSchema);
