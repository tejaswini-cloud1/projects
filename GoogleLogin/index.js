// app.js
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('./db'); // Require the db.js file

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views'); // Ensure the views directory is set correctly

// Middleware setup
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'SECRET'
}));

app.use(passport.initialize());
app.use(passport.session());

let userProfile;

// Define Google OAuth strategy
const GOOGLE_CLIENT_ID = '295150930661-6btjd2bpcjq74l6m0gl24qsqgrsv7t2t.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://oauth.pstmn.io/v1/callback'
  },
  function(accessToken, refreshToken, profile, done) {
    const { id, displayName, emails } = profile;
    const email = emails[0].value;

    // Check if the user exists in the database
    db.query('SELECT * FROM users WHERE google_id = ?', [id], (err, rows) => {
      if (err) return done(err);

      if (rows.length) {
        // User exists, return the user
        return done(null, rows[0]);
      } else {
        // User does not exist, create a new user
        const newUser = { google_id: id, name: displayName, email: email };
        db.query('INSERT INTO users SET ?', newUser, (err, result) => {
          if (err) return done(err);
          newUser.id = result.insertId;
          return done(null, newUser);
        });
      }
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, rows) => {
    if (err) return cb(err);
    cb(null, rows[0]);
  });
});

// Routes
app.get('/', function(req, res) {
  res.render('pages/auth');
});

app.get('/auth/google', 
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/error' }),
  function(req, res) {
    // Successful authentication, redirect success.
    res.redirect('/success');
  }
);

app.get('/success', (req, res) => {
  if (req.isAuthenticated()) {
    res.render('pages/success', { user: req.user });
  } else {
    res.redirect('/');
  }
});

// app.get('/success', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log('App listening on port ' + port));
