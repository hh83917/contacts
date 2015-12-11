var User = require('../models/user'),
  mongoose = require('mongoose'),
  userSchema = require('../models/user'),
  User = mongoose.model('User', userSchema);

module.exports = {
  getUsers: function(req, res) {
    User.find(req.query).exec().then(function(result) {
      res.status(200).send(result)
    }).catch(function(err) {
      return res.status(500).json(err);
    });
  },
  addUser: function(req, res) {
    var user = req.body;
    User.create(user, function(result) {
      res.status(201).json(result);
    }).catch(function(err) {
      return res.status(500).json(err);
    });
  },
  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.params.id, req.body, function(err, result) {
      if(err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).end();
      }
    });
  },
  removeUser: function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err, result) {
      if(err) {
        res.status(500).send(err);
      }
      else {
        res.status(200).end();
      }
    });
  },
  archiveUser: function(req, res) {
    User.findById(req.params.id).exec().then(function() {
      doc.archive = true;
      return doc.save().then(function(result) {
        console.log('user archived')
        return res.status(200).json(result);
      }).catch(function(err) {
        return res.status(500).json(err);
      });
    });
  }
};
