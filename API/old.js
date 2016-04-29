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
                    data: req.body.navn + ' har blitt meldt på'
                });
            }
        })
    }
});
