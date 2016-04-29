console.log('Hello from routes.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var schema = require('../models/schema.js');

require('./auth/jwtStrategy.js')(passport);


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    next();
});

//=============================================================================
//API---------------------------------------------------
// Error index:
// 1: Not admin, 2: .find failed, 3: Not owner, 4: .remove or .save failed, 5: populate failed

// League routes. get is unprotected and returns all leagues, only admin can post and del

router.get('/league/', function (req, res) {
  schema.League.find(function (err, leagues) {
    if (err) res.json({err: 2, msg:'Could not find leagues. Err: ' + err});
    else res.json({err: 0, msg: 'Success', data: leagues});
  });
});

//=============================================================================
router.post('/league/', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (!req.user.admin) res.json({err: 1, msg: 'Not an admin'});
  else {
   var league = new schema.League();
   league.name = req.body.name;
   league.save(function (err) {
     if (err) res.json({err: 4 , msg:'Could not save league. Err: ' + err});
     else schema.League.find(function (err, leagues) {
       if (err) res.json({err: 2, msg:'Could not find leagues. Err: ' + err});
       else res.json({err: 0, msg:'Success', data: leagues});
     });
   });
 }
});

//=============================================================================
router.delete('/league/:league_id', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (!req.user.admin) res.json({err: 1, msg: 'Not an admin'});
  else {
    schema.League.remove({_id: req.params.league_id}, function (err, league) {
      if (err) res.json({err: 4, msg:'Could not remove league. Err: ' + err});
      else schema.League.find(function (err, leagues) {
        if (err) res.json({err: 2, msg:'Could not find leagues. Err: ' + err});
        else res.json({err: 0, msg:'Success', data: leagues});
      });
    });
  }
});

//=============================================================================
// Team routes: unprotected get returns all teams, post and del is protected
// myteam provides easy access to just a users teams

router.get('/team/', function (req, res) {
  schema.Team.find().populate('_league')
  .exec(function (err, teams) {
    if (err) res.json({err: 2, msg:'Could not find teams. Err: ' + err});
    else res.json({err: 0, msg:'Success', data: teams});
  });
});

//=============================================================================
router.post('/team/', passport.authenticate('jwt', {session: false}), function (req, res) {
  var team = new schema.Team();
  team.name    = req.body.name;
  team._leader = req.user._id;
  team._league = req.body._league;

  team.save(function (err, team) {
    if (err) {
      console.log();
      res.json({err: 4, msg:'Could not save team. Err: ' + err});
    }
    addPlayers(req.body.players, team._id);
    schema.Team.find({_leader : req.user._id}).populate('_league')
    .exec(function (err, teams) {
      if (err) res.json({err: 2, msg:'Could not find leagues. Err: ' + err});
      else res.json({err: 0, msg:'Success', data: teams});
    });
  });
});

function addPlayers(arr, _team) {
  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i]);
    var player = new schema.Player({
      _team: _team,
      name: arr[i].name,
      number: arr[i].number
    });
    player.save(function (err) {
      if (err) console.log(err);
    })
  }
}
//=============================================================================
router.delete('/team/:team_id', passport.authenticate('jwt', {session: false}), function (req, res) {
  schema.Team.findOne({ _id: req.params.team_id}, function (err, team) {
    if (err || !team) res.json({err: 2, msg: 'Could not find team. Err: ' + err});
    else if (req.user._id.toString() !== team._leader.toString()) res.json({err: 3, msg:'Not your team'});
    else schema.Team.remove(team, function (err, team) {
      if (err) res.json({err: 4, msg: 'Could not remove team. Err: ' + err});
      else schema.Team.find({_leader : req.user._id }).populate('_league')
      .exec(function (err, teams) {
        if (err) res.json({err: 2, msg:'Could not find teams. Err: ' + err});
        else res.json({err: 0, msg:'Success', data: teams});
      });
    });
  });
});

//=============================================================================
router.get('/myteam/', passport.authenticate('jwt', {session: false}), function (req, res) {
  schema.Team.find({_leader : req.user._id}).populate('_league')
  .exec(function (err, teams) {
    if (err) res.json({err: 2, msg:'Could not find teams. Err: ' + err});
    else res.json({err: 0, msg:'Success', data: teams});
  });
});

//=============================================================================
// Player routes: post and del is protected, get takes team param in body and
// only retuns players of that team, get all is also public

router.post('/player/', passport.authenticate('jwt', {session: false}), function (req, res) {
  // You can only post if you own the team, so check if  _team._leader matches user._id
  schema.Team.findOne({ _id: req.body._team }, function (err, team) {
    if (err || !team) res.json({err: 2, msg: 'Could not find team'});
    else if (req.user._id.toString() !== team._leader.toString()) res.json({err: 3, msg:'Not your team'});
    else {
      var player = new schema.Player();
      player.name   = req.body.name;
      player._team  = req.body._team;
      player.number = req.body.number;

      player.save(function (err) {
        if (err) res.json({err: 4 , msg:'Could not save player. Err: ' + err});
        else schema.Player.find({_team : req.body._team}).populate('_team')
        .exec(function (err, players) {
          if (err) res.json({err: 2, msg:'Could not find players. Err: ' + err});
          else res.json({err:0, msg: 'Success', data: players});
        });
      });
    }
  });
});

//=============================================================================
router.get('/player/:team_id', function (req, res) {
  schema.Player.find({ _team : req.params.team_id }).populate('_team')
  .exec(function (err, players) {
    if (err) res.json({err: 2, msg:'Could not find players. Err: ' + err});
    else res.json({err:0, msg: 'Success', data: players});
  });
});

//=============================================================================
router.delete('/player/:player_id', passport.authenticate('jwt', {session : false}), function (req, res) {
  schema.Player.findOne({_id : req.params.player_id}).populate('_team')
  .exec(function (err, player) {
    if (err || !player) res.json({err: 2, msg: 'Could not find player. Err: ' + err});
    else if (player._team._leader.toString() !== req.user._id.toString()) res.json({err: 3, msg:'Not your team'});
    else schema.Player.remove({_id : req.params.playe_id}, function (err) {
      if (err) res.json({err: 4, msg: 'Could not remove player. Err: ' + err});
      else schema.Player.find({_team : player._team }).populate('_team')
      .exec(function (err, players) {
        if (err) res.json({err: 2, msg:'Could not find teams. Err: ' + err});
        else res.json({err: 0, msg:'Success', data: players});
      });
    });
  });
});

//=============================================================================
router.get('/player/', function (req, res) {
  schema.Player.find().populate('_team')
  .exec(function (err, players) {
    if (err) res.json({err: 2, msg:'Could not find teams. Err: ' + err});
    else res.json({err: 0, msg:'Success', data: players});
  });
});


module.exports = router;
