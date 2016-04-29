console.log('Hello from user.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
      email: {
        type: String,
        unique: true,
        required: true
      },
      pass: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      admin: {
        type: Boolean,
        default: false
      }
    });

userSchema.pre('save', function(next) {
    var user = this;
    if (this.isModified('pass') || this.isNew) {
      bcrypt.hash(user.pass, SALT_WORK_FACTOR, function (err, hash) {
        if (err) return next(err);
        user.pass = hash;
        next();
      });
    } else {
      return next();
    }
});

userSchema.methods.comparePass = function(pass, cb) {
    bcrypt.compare(pass, this.pass, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
