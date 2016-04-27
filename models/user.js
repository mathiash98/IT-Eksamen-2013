console.log('Hello from user.js');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;

var userSchema = new mongoose.Schema({
  email: {type: String, unique: true, required: true},
  navn: {type: String, required: true},
  telefon: {type: String, required: true},
  pass: {type: String, required: true},
  admin: {type: Boolean},
  added: { type: Date, default: Date.now },
  edited: { type: Date, default: Date.now }
}, {collection: 'users'});

userSchema.pre('save', function(next) {
  var user = this;

  // Check if pass is modified or new
  if (this.isModified('pass') || this.isNew) {
    // Generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
      if (err) return next(err);
      // Hashes the pass with the salt
      bcrypt.hash(user.pass, salt, function (err, hash) {
        if (err) return next(err);
        // Edits the schemas pass
        user.pass = hash;
        next();
      });
    });
  }
  // If not new or edited
  else {
    return next();
  }
});

userSchema.methods.comparePassword = function(userPass, cb) {
  bcrypt.compare(userPass, this.pass, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
}

module.exports = mongoose.model('User', userSchema);
