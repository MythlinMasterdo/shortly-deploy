// var path = require('path');
var mongo = require('mongodb');
var mongoose = require('mongoose');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });

mongoose.connect('mongodb://127.0.0.1:27017/test');

var urls = new mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  date: Date
});
// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var users = new mongoose.Schema({
  username: String,
  password: String,
  date: Date
});

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

var Urls = mongoose.model('urls', urls);
var Users = mongoose.model('users', users);

exports.Urls = Urls;
exports.Users = Users;
// Urls.create({url: 'www.google.com'}, (err, key) => {
//   console.log('err: ', err, 'key: ', key);
// });

// var Users = mongoose.model('users', users); 

// module.exports = db;