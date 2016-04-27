var express = require('express');
var router = express.Router();
var passport = require('passport');
var jwt = require('jwt-simple');

var User = require('../../models/user');

router.get('/login', function(req, res) {
  User.findOne({email: req.body.email})
});

router.post('/registrer', function(req, res) {
  var tmpUser = new User({
    email: req.body.email,
    navn: req.body.navn,
    telefon: req.body.telefon,
    pass: req.body.pass
  });
  tmpUser.save(function(err){
    if (err) res.json({type:"error", data:["Det var en feil: "+err]});
    else res.json({type:"success", data:"Du er nå registrert"})
  });
})

module.exports = router;
