var mongoose = require('mongoose');
var schema = new mongoose.Schema({
	username:String,
	password:String
});

var model = mongoose.model('user',schema);

module.exports = model;