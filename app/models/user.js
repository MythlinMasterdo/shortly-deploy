var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

db.userSchema.methods.hashPassword = function hashPassword(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this['password'], null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
};

db.userSchema.methods.comparePassword = function comparePassword(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this['password'], function(err, isMatch) {
    callback(isMatch);
  });
};

db.userSchema.pre('save', function(next) {
  this.hashPassword(next);
});

var User = mongoose.model('user', db.userSchema);

module.exports = User;
