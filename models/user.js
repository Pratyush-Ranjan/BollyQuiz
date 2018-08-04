var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: String,
    username: String,
    score: Number,
    wrongans: Number
});

module.exports=mongoose.model('users', UserSchema);