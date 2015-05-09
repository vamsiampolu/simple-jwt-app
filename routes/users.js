var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
			res.redirect('login/'+user.username);
		}	
	})
});

router.get('/login/:username',function(req,res){
	console.log("Inside the get username route");
	var username = req.params.username;
	console.log(username);
	User.findOne({username:username
	},function(err,user){
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
				
	})
});

module.exports = router;
