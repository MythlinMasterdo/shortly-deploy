var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,

db.userSchema.methods.hashPassword = function hashPassword(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  // var doc = this;
  return cipher(this['password'], null, null).bind(this)
    .then(function(hash) {
      console.log('hashed password inside userSchema method hashPassword', hash);
      this.password = hash;
      console.log('this password after hash password in pre hook', this.password);
      next();
    });
};

db.userSchema.methods.comparePassword = function comparePassword(attemptedPassword, callback) {
  console.log('attemptedPassword, callback inside userSchema method comparePassword', attemptedPassword, callback, this['password']);
  bcrypt.compare(attemptedPassword, this['password'], function(err, isMatch) {
    console.log('is match ------------', isMatch);
    callback(isMatch);
  });
};

db.userSchema.pre('save', function(next) {
  console.log('pre lifecycle hook hashPassword:', this.hashPassword);
  this.hashPassword(next);
});

// console.log('urlSchema, userSchema in config.js: ' + db.urlSchema + ', ' + db.userSchema)
var User = mongoose.model('user', db.userSchema);

module.exports = User;
