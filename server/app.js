var config = require('./config/config.json');
require('./models/main').connect(config.mongoDbUri);

var express = require('express');
var path = require('path');
var passport = require('passport');
var auth = require('./routes/auth');
var index = require('./routes/index');
var news = require('./routes/news');
var bodyParser = require('body-parser')

var app = express();



// view engine setup
// app.set('views', path.join(__dirname, '../client/build/'));
// app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.options("/*", function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.send(200);
});

// TODO: remove this after development is done
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Authorization, Accept");
    next();
});



app.use(passport.initialize());

var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

const authCheckerMiddleware = require('./middleware/auth_checker');


app.use('/news', authCheckerMiddleware);

app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   res.render('404 not found');
// });
console.log('app init finished');
module.exports = app;
