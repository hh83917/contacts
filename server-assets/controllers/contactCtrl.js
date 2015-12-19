var Contact = require('../models/contact'),
  mongoose = require('mongoose'),
  userSchema = require('../models/user'),
  User = mongoose.model('User', userSchema),
  contactSchema = require('../models/contact'),
  Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  getContacts: function(req, res) {
    Contact.find(req.query)
    .populate('address_billing')
    .populate('address_shipping')
    .populate('assignedTo')
    .exec().then(function(result) {
      res.status(200).send(result);
    }).catch(function(err) {
      return res.status(500).send(err);
    });
  },
  getContact_id: function(req, res) {
    Contact.findById(req.params.id)
    .populate('address_billing')
    .populate('address_shipping')
    .populate('assignedTo')
    .exec().then(function(result) {
      res.status(200).send(result);
    }).catch(function(err) {
      return res.status(500).send(err);
    });
  },
  addContact: function(req, res) {
    var contact = req.body;
    Contact.create(contact, function(result) {
      res.status(201).send(result);
    }).catch(function(err) {
      return res.status(500).json(err);
    });
  },
  updateContact: function(req, res) {
    Contact.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).end();
    });
  },
  removeContact: function(req, res) {
    Contact.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).end();
    });
  },
  archiveContact: function(req, res) {
    Contact.findByIdAndUpdate(req.params.id,
      {
        archive: true,
        date_modified: Date.now()
      },
      function(err, result) {
      if(err) return res.status(500).json(err);
      return res.status(200).end();
    });
  }
};
