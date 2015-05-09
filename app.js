var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/jwt_test');
    //take a look here to figure out how to handle mongoose connection:
    //http://theholmesoffice.com/mongoose-connection-best-practice/
    mongoose.connection.on('error',function(err){
        if(err)
            console.log(err);
    });
    mongoose.connection.on('connected',function(){
        console.log('connection established');
    });

    mongoose.connection.on('disconnected',function(){
        console.log('Disconnected from mongo db');
    });

    mongoose.connection.on('SIGINT',function(){
        //sigint represents the termination of the app
        mongoose.connection.close(function(){
            console.log("Connection to mongo db has been closed because the app terminated");
            process.exit(0);
        });
    });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
