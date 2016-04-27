console.log('Hello from maal.js');
var mongoose = require('mongoose');
var Spiller = require('./spiller');
var Kamp = require('./kamp');

var maalSchema = new mongoose.Schema({
  type: String,
  _spiller: {type: mongoose.Schema.Types.ObjectId, ref: 'Spiller'},
  _kamp: {type: mongoose.Schema.Types.ObjectId, ref: 'Kamp'},
  tid: Number,
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'maal'});

module.exports = mongoose.model('Maal', maalSchema);
