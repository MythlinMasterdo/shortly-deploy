var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test');

var urlSchema = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  date: Date
});

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  date: Date
});
// console.log('urlSchema, userSchema in config.js: ' + urlSchema + ', ' + userSchema);
exports.urlSchema = urlSchema;
exports.userSchema = userSchema;

// module.exports = db;