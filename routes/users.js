var express = require('express');
var router = express.Router();
var User = require('../models/user');
var jwt = require('jwt-simple');
var secret = 'keyboardcat';
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login',function(req,res){
	res.render('login');
});

router.post('/login',function(req,res){
	var username = req.body.username;
	var password = req.body.password;
	var user = new User({
		username:username,
		password:password
	});

	user.save(function(err,user){
		if(err){
			console.error(err,'\n the stack is',err.stack);
		}
		else
		{
			console.log(user);
			var payload = user._id;
			var token = jwt.encode(payload,secret);
			res.json({
				token:token
			});
		}	
	})
});

router.get('/login/shiny_button',function(req,res){
	var authHeader = req.headers.authorization;
	var regex = /Bearer\s(.+)/;
	var token = authHeader.match(regex)[1];
	var _id = jwt.decode(token,secret);
	console.log("Inside the shiny button route","authorization token",token,"the decoded _id is",_id);
	
	//res.redirect('/users/login/'+_id);
	res.json({
		href:'/users/login/'+_id
	});
});

router.get('/login/:id',function(req,res){
	console.log("Inside the get username route");
	var id = req.params.id;
	console.log(id);
	User.findById(id,function(err,user){
		console.log("Inside the callback function");
		if(err)
			console.error(err,'\n the stack is',err.stack);
		if(!user)
			console.log("User could not be found");
		else
		{
			console.log(user);
			res.render('user',user);
		}			
	});
});

module.exports = router;