var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
db.urlSchema.pre('save', function(next) {
  console.log('presaving: ', this);
  var shasum = crypto.createHash('sha1');
  shasum.update(this['url']);
  this.code = shasum.digest('hex').slice(0, 5);
  next();
});
//   }
// });
// console.log(db.urlSchema);
var Link = mongoose.model('Link', db.urlSchema);

module.exports = Link;
