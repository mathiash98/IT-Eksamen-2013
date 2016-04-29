console.log('Hello from Auth.js');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var conf = require('../../config/conf');
var User = require('../../models/user');

router.post('/signup', function (req, res) {
  // Checks if it contains enough info for a valid user
  if (!req.body.email || !req.body.pass) res.json({err:1, msg:'No pass or nick'});
  else {
    var newUser = new User({
      name: req.body.name,
      email: req.body.email,
      pass: req.body.pass
      });
    newUser.save(function (err) {
      if (err) return res.json({err:2, msg: 'Error:' +  err});
      res.json({err: 0, msg: 'Success!'});
    });
  }
});

router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) throw err;
    if (!user) res.json({err:1, msg: 'No user found'});
    else user.comparePass(req.body.pass, function (err, isMatch) {
      if (isMatch && !err) {
        var tmpUser = {
          _id   : user._id,
          name  : user.name,
          admin : user.admin
        };

        var token = jwt.encode(tmpUser, conf.secret);
        res.json({err: 0, msg:'Success', token: 'JWT ' + token});
      }
      else res.json({err:2, msg: 'Wrong password'});
    });
  });
});

module.exports = router;
