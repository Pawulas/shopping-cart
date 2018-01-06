const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
function(req, username, password, done) {
  req.checkBody('email', 'invalid email').notEmpty().isEmail();
  req.checkBody('password', 'invalid password').notEmpty().isLength({ min: 4});

  var errors = req.validationErrors();
  if (errors) {
    var messages = [];

    errors.forEach(function(error) {
      messages.push(error.msg);
    });

    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email': username}, function(err, user) {
      if (err) {
        return done(err);
      } 
      if (user) {
        return done(null, false, {message: 'Incorect username'});
      }

      var newUser = new User();
      newUser.email = username;
      newUser.password = newUser.encryptPassword(password);
      newUser.save(function(err, result) {
        if (err) {
          return done(err);
        }
        return done(null, newUser);
      });
    }
  );
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  req.checkBody('email', 'invalid email').notEmpty().isEmail();
  req.checkBody('password', 'invalid password').notEmpty();
  var errors = req.validationErrors();
  if (errors) {
    var messages = [];

    errors.forEach(function(error) {
      messages.push(error.msg);
    });

    return done(null, false, req.flash('error', messages));
  }

  User.findOne({'email': email}, function(err, user) {
    if (err) {
      return done(err);
    } 
    if (!user) {
      return done(null, false, {message: 'No user found!'});
    }

    user.validPassword(password, function(err, res) {
      if (err) {
        return done(null, false, {message: 'Wrong password'});
      }

      done(null, user);
    }); 
  });
}));