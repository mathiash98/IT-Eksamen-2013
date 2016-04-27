console.log('Hello from hendelser.js');
var mongoose = require('mongoose');
var Spiller = require('./spiller');
var Kamp = require('./kamp');

var hendelserSchema = new mongoose.Schema({
  type: String,
  _spiller: {type: mongoose.Schema.Types.ObjectId, ref: 'Spiller'},
  _kamp: {type: mongoose.Schema.Types.ObjectId, ref: 'Kamp'},
  _lag: {type: mongoose.Schema.Types.ObjectId, ref: 'Lag'},
  tid: Number,
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'hendelser'});

module.exports = mongoose.model('Hendelser', hendelserSchema);
