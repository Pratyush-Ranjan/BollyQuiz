var LocalStrategy = require('passport-local').Strategy;
var User             = require('../models/user');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.use('local-login', new LocalStrategy({
    passwordField: 'email',
  },
    function(username, email, done) {
      User.findOne({
        username: username,
        email: email
      }, function(err, user) {
      if (!user) {
        console.log('calling passport)');
          var user = new User();
          user.username = username;
          user.email = email;
          user.score= 0;
          user.wrongans= 0;
          user.save(function(err, user) {
            console.log('calling passport)');
            if (err) { return next(err); }
            return done(null, user);
          });
        }
        if (err) { 
          console.log('calling passport)');
          return done(err); }
      return done(null, user);
      });
    }
  ));
};