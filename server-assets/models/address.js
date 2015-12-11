var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
  address1: {type: String},
  address2: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  postal_code: {type: String}
});

module.exports = mongoose.model('Address', addressSchema);
