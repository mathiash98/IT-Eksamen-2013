console.log('Hello from liga.js');
var mongoose = require('mongoose');

var ligaSchema = new mongoose.Schema({
  navn: String,
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'liga'});

module.exports = mongoose.model('Liga', ligaSchema);
