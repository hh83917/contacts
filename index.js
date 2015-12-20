var express = require('express'),
  session = require('express-session'),
  app = express(),
  port = 9001,
  bodyParser = require('body-parser'),
  cors = require('cors'),
  mongoUri = 'mongodb://localhost:27017/contacts',
  mongoose = require('mongoose'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  config = require('./config'),
  userCtrl = require('./server-assets/controllers/userCtrl'),
  contactCtrl = require('./server-assets/controllers/contactCtrl');

mongoose.Promise = require('q').Promise;

//Google OAuth2
passport.use(new GoogleStrategy({
    clientID: config.google_clientID,
    clientSecret: config.google_clientSecret,
    callbackURL: "http://localhost:" + port + "/api/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.googleInfo.findOne({ googleId: profile.id }).exec().then(function (user) {
      if (!user.googleInfo) {
  			user.googleInfo = new GoogleAcc({
  				email:
            function () {
              var primaryEmail;
              for (var i = 0; i < profile.emails.length; i++) {
                if (profile.emails[i].type === 'account') {
                  primaryEmail = profile.emails[i].value;
                }
              }
              return primaryEmail;
            },
					id: profile.id,
					displayName: profile.displayName,
					token: token,
					tokenSecret: tokenSecret
  			});
  			user.googleInfo.save().then(function() {
  				done(null, user);
  			});
  		}
    });
  }
));

app.use(cors(),
  bodyParser.json(),
  express.static(__dirname + '/public'),
  session({
    secret: 'Contacts App Session Super Secret',
    resave: false,
    saveUninitialized: false
  }),
  passport.initialize(),
  passport.session());

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
});

// User endpoints
app.get('/api/users', userCtrl.getUsers);
app.get('/api/users/:id', userCtrl.getUser_id);
app.post('/api/users', userCtrl.addUser);
app.patch('/api/users/:id', userCtrl.updateUser);
app.delete('/api/users/:id', userCtrl.archiveUser);
// app.delete('/api/users/:id', userCtrl.removeUser);

// Contact endpoints
app.get('/api/contacts', contactCtrl.getContacts);
app.get('/api/contacts/:id', contactCtrl.getContact_id);
app.post('/api/contacts', contactCtrl.addContact);
app.patch('/api/contacts/:id', contactCtrl.updateContact);
app.delete('/api/contacts/:id', contactCtrl.archiveContact);
// app.delete('/api/contacts/:id', contactCtrl.removeContact);


//Google Get Auth
app.get('/auth/google',
  passport.authenticate('google', { scope: 'https://www.googleapis.com/auth/plus.login' }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/#/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/home/overview');
  }
);


app.listen(port, function() {
  console.log('Server running, listening on port: ', port);
});

mongoose.connect(mongoUri);
mongoose.connection.once('connected', function() {
  console.log('db connected');
});
