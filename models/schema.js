var mongoose  = require('mongoose'),
    Schema    = mongoose.Schema
;

console.log('schema.js loaded');

module.exports.Event = mongoose.model('Event', new Schema({
  _match: {
    type: Schema.Types.ObjectId,
    ref: 'Match'
  },
  _player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  _team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  playtime: Number,
  time: Date,
  eventType: String
}));

module.exports.Match = mongoose.model('Match', new Schema({
  _homeTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  _guestTeam: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  referee: Array,
  time: Date
}));

module.exports.Player = mongoose.model('Player', new Schema({
  _team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  name: {
    type: String,
    required: true
  },
  number: Number
}));

module.exports.Team = mongoose.model('Team', new Schema({
  _league: {
    type: Schema.Types.ObjectId,
    ref: 'League'
  },
  name: {
    type: String,
    required: true
  },
  _leader: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}));

module.exports.League = mongoose.model('League', new Schema({
  name: String,
  ageGroup: String,
  genderGroup: String
}));
