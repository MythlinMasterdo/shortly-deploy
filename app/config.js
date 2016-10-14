var mongo = require('mongodb');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  date: Date
});

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  date: Date
});
exports.connect = mongoose.connect('mongodb://127.0.0.1:27017/test');
exports.urlSchema = urlSchema;
exports.userSchema = userSchema;
