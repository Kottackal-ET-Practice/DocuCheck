var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var morgan = require('morgan');
//var bcrypt = require('bcrypt');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var session = require('express-session');

var uploads = require('./uploads');

//mongoose connection

mongoose.connect('mongodb://localhost:27017/docucheck');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret:"this is secret"}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser());
app.use(morgan('dev'));
app.use('/uploads', uploads);

// user account schema

var UserSchema = new mongoose.Schema({
	firstname : String,
	lastname : String,
	email : String,
	username: String,
	password: String,
	role : String
}, {collection: "users"});

var User = mongoose.model("User", UserSchema);

//schema for view sharing

var ShareSchema = new mongoose.Schema({
	user : String,
	employer : String,
	request : String,
	response: String
}, {collection: "shares"});

var Share = mongoose.model("Share", ShareSchema);

passport.use(new LocalStrategy(function(username, password, done){
	User.findOne({username : username, password : password},function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false);
		}
		return done(null, user);
	});
}));

passport.serializeUser(function(user, done){
	done(null, user);
});
passport.deserializeUser(function(user, done){
	User.findById(user._id,function(err, user){
		done(err, user);
	});
});

//response to view request

app.put("/rest/verreq/:user/:employer", function(req,res)
{
	Share.findOneAndUpdate({user : req.params.user, employer : req.params.employer},{response : true},function(err,data){
    	res.json(data);
  	});
});


// remove view 

app.put("/rest/viewrem/:user/:employer", function(req,res)
{
	Share.findOneAndUpdate({user : req.params.user, employer : req.params.employer},{response : false,request:false},function(err,data){
    	res.json(data);
  	});
});

//create a view request

app.post("/rest/viewreq/:user/:employer", function(req,res)
{
	var data = {
		user : req.params.user,
		employer : req.params.employer,
		request : true,
		response: false
	}
	Share.create(data, function (err, user) {
		if(err){
			console.log(err);
		}
		else{
			res.send(data);
		}
    });
});

// fetch the views allowed for user

app.get("/rest/perviews/:user", function(req,res)
{
	var p = req.params.user;
	var arr = [];
	Share.find({'user':p,'request':true,'response':true}, function (err, user) {
        for (var i = 0; i < user.length; i++) {
        	arr[i]=user[i].employer;
        }
        User.find({username : { "$in" : arr}}, function (err, usr) {
        	res.send(usr);
    	});
    });
});

// fetch the view requests for user

app.get("/rest/reqviews/:user", function(req,res)
{
	var p = req.params.user;
	var arr = [];
	Share.find({'user':p,'request':true,'response':false}, function (err, user) {
        for (var i = 0; i < user.length; i++) {
        	arr[i]=user[i].employer;
        }
        User.find({username : { "$in" : arr}}, function (err, usr) {
        	res.send(usr);
    	});
    });
});

// view all account for admin

app.get("/rest/viewacc", function(req,res)
{
	User.find({}, function (err, user) {
        res.send(user);
    });
});

// view the permitted views fo employer

app.get("/rest/viewperusers/:user", function(req,res)
{
	var p = req.params.user;
	var arr = [];
	Share.find({'employer':p,'response':true}, function (err, user) {
        for (var i = 0; i < user.length; i++) {
        	arr[i]=user[i].user;
        }
        User.find({username : { "$in" : arr}}, function (err, usr) {
        	res.send(usr);
    	});
    });
});

// fetch all user details in search

app.get("/rest/viewuser/:usr", function(req,res)
{
	var p = req.params.usr;
	User.find({username : p}, function (err, user) {
        res.send(user);
    });
});

// fetch all user account details

app.get("/rest/usersearch/:usr", function(req,res)
{
	var p = req.params.usr;
	User.find({'role':'user'}, function (err, user) {
        res.send(user);
    });
});

// logout function

app.post("/rest/logout", function(req,res)
{
	req.logOut();
	res.send(200);
});

// update user details in userschema

app.put("/rest/update", function(req,res)
{
	var user=req.body;
	User.findById(user._id, function(err,foundUser){
		foundUser.update(req.body,function(err, count){
			res.send(count);
		});
	});
});

// register user

app.post("/rest/register", function(req,res)
{
	console.log('reg server');
	var user=req.body;
	User.create(user,function(err,doc){
			res.json(doc);
	});
});

// login function

app.post("/rest/login", passport.authenticate("local"), function(req,res)
{
	var luser=req.body;
	User.findOne({username: luser.username, password : luser.password}, function(err, foundUser){
		res.json(foundUser);
		// bcrypt.compare(luser.password, foundUser.password, function(err, result){
		// 	if(result){
		// 		res.json(foundUser);
		// 	}
		// });	
	});
});

app.get("/rest/loggedin", function(req, res){
	res.send(req.isAuthenticated() ? req.user : '0');
});

app.listen(4000);