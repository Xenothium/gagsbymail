var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongodb = require('express-mongo-db');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var loggerLevel = process.env.LOGGER_LEVEL || 'dev';
app.use(logger(loggerLevel));

app.set('title', 'Gags By Mail');

// Static and Favicon
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')));

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cookie Parser
var secret = process.env.SECRET_KEY || 'randomsecretstring';
app.use(cookieParser(secret, {signed: true}));

//View Engine Setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//MongoDB
var mongodbOptions = {
  hosts: [{
    host: process.env.MONGODB_HOST || '127.0.0.1',
    port: process.env.MONGODB_PORT || '27017'
  }],
  database: process.env.MONGODB_DATABASE || 'gagsbymail',
  username: process.env.MONGODB_USERNAME,
  password: process.env.MONGODB_PASSWORD,
  options: {
    db: {
      native_parser: true,
      recordQueryStats: true,
      retryMiliSeconds: 500,
      numberOfRetries: 10
    },
    server: {
      socketOptions: {
        keepAlive: 1,
        connectTimeoutMS: 10000
      },
      auto_reconnect: true,
      poolSize: 50
    }
  }
};
app.use(mongodb(require('mongodb'), mongodbOptions));

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
