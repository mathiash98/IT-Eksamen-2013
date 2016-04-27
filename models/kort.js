console.log('Hello from kort.js');
var mongoose = require('mongoose');
var Spiller = require('./spiller');
var Kamp = require('./kamp');

var kortSchema = new mongoose.Schema({
  type: String,
  _spiller: {type: mongoose.Schema.Types.ObjectId, ref: 'Spiller'},
  _kamp: {type: mongoose.Schema.Types.ObjectId, ref: 'Kamp'},
  tid: Number,
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'kort'});

module.exports = mongoose.model('Kort', kortSchema);
