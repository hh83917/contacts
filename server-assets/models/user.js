var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  password: {type: String},
  email: {type: String, required: true},
  role: {type: String, enum: ['admin', 'manager', 'sales'], default: 'sales', required: true},
  reportTo: {type: String, ref: 'User'},
  assignTo: {type: String, ref: 'Contact'},
  date_created: {type: Date, default: Date.now},
  date_modified: {type: Date, default: Date.now},
  archive: {type: Boolean, default: false},
  googleInfo: {type: String, ref: 'GoogleAcc'}
});

module.exports = mongoose.model('User', userSchema);
