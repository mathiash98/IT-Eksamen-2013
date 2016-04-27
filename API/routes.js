console.log('Hello from routes.js');

var Lag = require('../models/lag');
var Liga = require('../models/liga');
var Maal = require('../models/maal');
var Spiller = require('../models/spiller');

module.exports = function(app) {

    /* GET home page. */
    app.get('/', function(req, res, next) {
        res.sendFile('index.html', {
            root: './app'
        });
    });

    //=============================================================================
    //API---------------------------------------------------
    app.get('/api/lag', function(req, res) {
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
    app.get('/api/liga', function(req, res) {
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
    app.post('/api/pamelding', function(req, res) {
        console.log('Data: ' + JSON.stringify(req.body));
        // Check if the data recieved is empty
        if (!Object.keys(req.body).length) {
            console.log(req.body);
            res.json({
                type: 'error',
                data: 'Skjemaet ser ut til å være tomt'
            });
        } else {
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
    });
    //=============================================================================
    app.get('/api/spillere', function(req, res) {

    });
};
