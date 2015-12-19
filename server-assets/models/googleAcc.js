var mongoose = require('mongoose');

var googleSchema = new mongoose.Schema({
  email: {type: String},
  id: {type: String},
  displayName: {type: String},
  token: {type: String},
  tokenSecret: {type: String}
});

module.exports = mongoose.model('GoogleAcc', googleSchema);
