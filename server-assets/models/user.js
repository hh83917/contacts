var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  password: {type: String, required: true},
  email: {type: String, required: true},
  role: {type: String, enum: ['admin', 'manager', 'sales'], default: 'sales', required: true},
  reportTo: {type: String, ref: 'User'},
  date_created: {type: Date, dafault: Date.now},
  date_modified: {type: Date, dafault: Date.now},
  archive: {type: Boolean, default: false}
});

module.exports = mongoose.model('User', userSchema);
