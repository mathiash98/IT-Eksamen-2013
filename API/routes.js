console.log('Hello from routes.js');
var express = require('express');
var router = express.Router();

var Lag = require('../models/lag');
var Liga = require('../models/liga');
var Spiller = require('../models/spiller');
var Hendelser = require('../models/hendelser');


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
                res.json('Ingen lag påmeldt');
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
                Error: "No liga in db"
            }]);
        } else {
            res.json(liga);
        }
    });
});
//=============================================================================
router.post('/pamelding', function(req, res) {
    console.log('Data: ' + JSON.stringify(req.body));
    // Check if the data recieved is empty
    if (!Object.keys(req.body).length) {
        console.log(req.body);
        res.json({
            type: 'error',
            data: 'Skjemaet ser ut til å være tomt'
        });
    } else {Liga.findOne({
            _id: req.body._liga
        }, function(err, liga) {
            if (err || !liga) res.json({
                type: 'error',
                data: 'Liga ser ut til å være feil, prøv på nytt'
            });
            else {
              var tmpSpiller = new Spiller({

              });
              var tmpLag = new Lag({
                navn: req.body.navn,
                _liga: req.body._liga,
                spillere: req.body.spillere,
                email: req.body.email,
                telefon: req.body.telefon
              });
              tmpLag.save(function(err) {
                if (err) res.send(err);
                else console.log('Successfully inserted');
                res.json({
                  type: 'success',
                  data: [req.body.navn + ' har blitt meldt på']
                });
              });
            }
        })
      }
});
//=============================================================================
router.get('/spillere', function(req, res) {

});

module.exports = router;
