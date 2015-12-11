var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  company: {type: String, required: true},
  position: {tyoe: String},
  address_billing: {type: String, ref: 'Address'},
  address_shipping: {type: String, ref: 'Address'},
  email: {type: String, required: true},
  email_other: [{type: String}],
  phone: [{type: String}],
  assignedTo: {type: String, ref: 'User'},
  status: {type: String, enum: ['open', 'won', 'lost']}
  stage: {type: String, enum: ['new', 'contacted','qualified', 'quote', 'active', 'closed', 'inactive', 'future', 'junk'], default: 'new', required: true},
  note: {type: String},
  created: {type: Date},
  modified: {type: Date},
  archive: {type: Boolean, default: false}
});

module.exports = mongoose.model('Contact', userSchema);
