var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
require('../config/pass')(passport);
var User= require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {
res.render('index', { title: 'Bollywood Quiz' });
});

router.get('/api/users', function(req, res, next) {
  User.find(function(err,docs){
    if (err)
    res.send(err);
  else
    res.json(docs);
  });
});

router.get('/api/currentus/:name', function(req, res, next) {
  User.findOne({
    username: req.params.name },
    function(err,docs){
    if (err)
    res.send(err);
    else
    res.json(docs);
    });
});

router.post('/api/rightanswer', function(req, res, next) {
   console.log("aare"+req.body.username + req.body.score);
  User.updateOne({ 
    username: req.body.username },{$set: {score: ++ req.body.score}},
    function(err,docs){
    if (err)
    res.send(err);
  else
    res.json(docs);
  });
});

router.post('/api/wronganswer', function(req, res, next) {
   console.log("aare"+req.body.username + req.body.wrongans);
  User.updateOne({ 
    username: req.body.username },{$set: {wrongans: ++ req.body.wrongans}},
    function(err,docs){
    if (err)
    res.send(err);
  else
    res.json(docs);
  });
});

router.post('/login', function(req, res, next){
  passport.authenticate('local-login', function(err, user){
    if(err){ return next(err); }
req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json(user);
       });
  })(req, res, next);
});

 // handle logout
    router.post("/logout", function(req, res) {
      req.logOut();
      res.send(200);
    });

    // loggedin
    router.get("/loggedin", function(req, res) {
      res.send(req.isAuthenticated() ? req.user : '0');
    });

module.exports = router;
