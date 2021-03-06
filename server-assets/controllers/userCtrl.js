var User = require('../models/user'),
  mongoose = require('mongoose'),
  userSchema = require('../models/user'),
  User = mongoose.model('User', userSchema),
  googleSchema = require('../models/googleAcc'),
  GoogleAcc = mongoose.model('GoogleAcc', googleSchema),
  contactSchema = require('../models/contact'),
  Contact = mongoose.model('Contact', contactSchema);

module.exports = {
  getUsers: function(req, res) {
    User.find(req.query)
    .populate('reportTo')
    .populate('googleInfo')
    .populate('assignTo')
    .exec().then(function(result) {
      res.status(200).send(result);
    }).catch(function(err) {
      return res.status(500).send(err);
    });
  },
  getUser_id: function(req, res) {
    User.findById(req.params.id)
    .populate('reportTo')
    .populate('googleInfo')
    .populate('assignTo')
    .exec().then(function(result) {
      res.status(200).send(result);
    }).catch(function(err) {
      return res.status(500).send(err);
    });
  },
  addUser: function(req, res) {
    var user = req.body;
    User.create(user, function(result) {
      res.status(201).send(result);
    }).catch(function(err) {
      return res.status(500).json(err);
    });
  },
  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).end();
    });
  },
  removeUser: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, result) {
      if (err) return res.status(500).json(err);
      return res.status(200).end();
    });
  },
  archiveUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id,
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
