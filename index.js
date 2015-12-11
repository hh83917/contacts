var express = require('express'),
  app = express(),
  port = 9001,
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoUri = 'mongodb://localhost:27017/contacts',
  mongoose = require('mongoose'),
  userCtrl = require('./server-assets/controllers/userCtrl.js');

mongoose.Promise = require('q').Promise;

app.use(cors(), bodyParser.json(), express.static(__dirname + '/public'));

// manage users
app.get('/api/users', userCtrl.getUsers);
app.post('/api/users', userCtrl.addUser);
app.patch('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.archiveUser);
// app.delete('/api/users', userCtrl.removeUser);

// manage contacts
// app.get('/api/contacts', contactCtrl.getContacts);
// app.post('api/contacts', contactCtrl.addContact);
// app.patch('/api/contacts', contactCtrl.updateContact);
// app.delete('/api/contacts', contactCtrl.removeContact);


app.listen(port, function() {
  console.log('listening on port: ', port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('connected', function() {
  console.log('db connected');
})
