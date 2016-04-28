console.log('Hello from routes.js');
var express = require('express');
var router = express.Router();
var passport = require('passport');

var Lag = require('../models/lag');
var Liga = require('../models/liga');
var Spiller = require('../models/spiller');
var Hendelser = require('../models/hendelser');

require('./auth/jwtStrategy.js')(passport);


// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', new Date());
    next();
});
//=============================================================================
//API---------------------------------------------------
router.get('/lag', function(req, res) {
    console.log('Get api lag');
    Lag.find(function(err, lag) {
            if (err) {
                console.log(err);
                return res.json(err);
            }

        })
        .populate('_liga')
        .exec(function(err, lag) {
            if (err) console.log(err);
            if (!lag.length) {
                res.json({success: true, data: 'Ingen lag påmeldt'});
            } else {
                console.log(new Date());
                res.json(lag);
            }
            // res.json(lag);
        });
});
//=============================================================================
router.get('/liga', function(req, res) {
    Liga.find(function(err, liga) {
        if (err) {
            console.log(err);
            return res.json(err);
        }
        console.log(liga);
        if (!liga.length) {
            res.json([{
                success: false, data: "No liga in db"
            }]);
        } else {
            res.json(liga);
        }
    });
});
//=============================================================================
router.post('/liga', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (req.user.admin) {
    // Checks if form is valid
    if (req.body.navn !== undefined && req.body.navn !== '' && req.body.navn !== ' ') {
      var tmpLiga = new Liga({
        navn: req.body.navn
      });
      tmpLiga.save(function (err, liga) {
        if (err) {
          console.log(err);
          res.json({err:5, data:'Database error: ' + err});
        } else {
          res.json({err:0, data: req.body.navn + ' has blitt lagt til!'})
        }
      })
    } else {
      res.json({err: 7, data: 'Form is empty'});
    }
  } else {
    res.json({err:2, data: 'You are not authorized to do this'});
  }
});
//=============================================================================
router.post('/pamelding', function(req, res) {
    console.log('Data: ' + JSON.stringify(req.body));
    // Check if the data recieved is empty
    if (!Object.keys(req.body).length) {
        console.log(req.body);
        res.json({
            success: false,
            data: 'Skjemaet ser ut til å være tomt'
        });
    } else {
        // Checks if the liga actually exists in the liga collection
        Liga.findOne({
            _id: req.body._liga
        }, function(err, liga) {
            if (err || !liga) {
                res.json({
                    err:4,
                    data: 'Liga ser ut til å være feil, prøv på nytt'
                });
            } else {
              var lagID;
                // Creates a new Lag which will be saved
                var tmpLag = new Lag({
                    navn: req.body.navn,
                    _liga: req.body._liga,
                    email: req.body.email,
                    telefon: req.body.telefon
                });

                tmpLag.save(function(err, lag) {
                    if (err) res.send(err);
                    else {
                        console.log(lag._id);
                        lagID = lag._id;
                        console.log('Successfully inserted lag: ' + req.body.navn);
                    }
                    addPlayers();
                });

                function addPlayers() {
                  // Loop to loop thorugh the players array and then add each player into spiller collection
                  for (var i = 0; i < req.body.spillere.length; i++) {
                    console.log(lagID);
                    console.log(req.body.spillere[i].navn);
                    var tmpSpiller = new Spiller({
                      navn: req.body.spillere[i].navn,
                      draktNr: req.body.spillere[i].draktNr,
                      _lag: lagID
                    });

                    tmpSpiller.save(function(err) {
                      if (err) {
                        res.send({
                          err: 5,
                          data: 'Database error: ' + err
                        });
                      }
                    })
                  };
                }

                res.json({
                    err: 0,
                    data: [req.body.navn + ' har blitt meldt på']
                });
            }
        })
    }
});
//=============================================================================
router.get('/spillere', function(req, res) {
  Spiller.find(function (err, spillere) {
    if (err) {
      console.log(err);
      return res.json(err);
    }
  })
  .populate('_lag')
  .exec(function (err, spillere) {
    if (!spillere.length) {
      res.json({err:3, data: 'Ingen spillere i databasen'});
    } else {
      console.log('Get spillere ' + new Date());
      res.json(spillere);
    }
  });
});
//=============================================================================
router.post('/admin', passport.authenticate('jwt', {session: false}), function (req, res) {
  if (!req.user.admin) res.json({err: 2, data: 'Not admin'});
  else {
    res.json(req.user);
  }
});

module.exports = router;
