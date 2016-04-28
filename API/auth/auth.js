console.log('Hello from Auth.js');
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var conf = require('../../config/conf');
var User = require('../../models/user');

router.post('/login', function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) throw err;
        if (!user) res.json({
            success: false,
            err: 1,
            data: 'No user found'
        });
        else {
            user.comparePass(req.body.pass, function(err, isMatch) {
                if (isMatch && !err) {
                    console.log(user);
                    tmpUser = {
                        _id: user._id,
                        navn: user.navn,
                        admin: user.admin,
                        email: user.email
                    };

                    var token = jwt.encode(tmpUser, conf.secret);
                    res.json({
                        success: true,
                        token: 'JWT ' + token
                    });
                } else res.json({
                    success: false,
                    err: 2,
                    data: 'Wrong password'
                })
            });
        }
    })
});

router.post('/registrer', function(req, res) {
    console.log(req.body);
    if (!req.body.email || !req.body.pass) res.json({
        success: false,
        data: 'No pass or email'
    });
    else {
        var tmpUser = new User({
            email: req.body.email,
            navn: req.body.navn,
            telefon: req.body.telefon,
            pass: req.body.pass
        });
        tmpUser.save(function(err) {
            if (err) res.json({
                success: false,
                data: ["Det var en feil: " + err]
            });
            else res.json({
                success: true,
                data: "Du er nå registrert"
            })
        });
    }
})

module.exports = router;
