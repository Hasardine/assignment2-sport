//require('dotenv').load();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var passport = require('passport');
const session = require('express-session');
const crypto = require('crypto');
const ensureLogin = require('connect-ensure-login');


var UserModel = require('./api/models/user');
//require('./api/models/db');

// Passport js initialization
const initializePassport = require('./api/config/passport');
initializePassport(passport, (username,cb) => {
  UserModel.findOne({username: username},(err,user) => {
    if (err) {console.log(err);}
    console.log(`findOne called\n${user}`);
    cb(user);
  })
},
(id) => {
  UserModel.findById(id,(err,user) => {
    if (err) {console.log(err);}
    console.log(`findById called\n${user}`);
    return user;
  })
})

// database
mongoose.connect('mongodb+srv://user1:1234@cluster0-g03ww.mongodb.net/assignment1?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
//mongoose.connect('mongodb://user1:123abc@ds343718.mlab.com:43718/fitnessapp?retryWrites=true&w=majority', {useNewUrlParser: true,useUnifiedTopology: true});
var db = mongoose.connection;

// check connection
db.once('open',() => {
  console.log('Connected to DB');
})

// check for db errors
db.on('error', (err) => {
  console.log(err);
})

// closing connection to DB
const gracefulShutdown = (msg,callback) => {
  db.close(() => {
    console.log(`Mongoose disconnected through ${msg}`);
    callback();
  });
};
// nodemon restart
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid,'SIGUSR2');
  });
})
// app termination
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});

var indexRouter = require('./api/routes/index');
var loginRouter = require('./api/routes/login');
var registerRouter = require('./api/routes/register');
var userRouter = require('./api/routes/user');

//var index = require('./server/routes/index');
//var routesApi = require('./api/routes/index');

//var indexRouter = require('./routes/index');
//var usersRouter = require('./routes/users');

var app = express();

// Create link to Angular build directory
var distDir = __dirname + "/./project/dist/";
app.use(express.static(distDir));

// view engine setup
//app.set('views', path.join(__dirname, 'server', 'views'));
//app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: '007',
  resave: true,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//app.use('/', indexRouter);
//app.use('/user', userRouter);
//app.use('/api', routesApi);

// secure routes of users
app.use('/user',ensureLogin.ensureLoggedIn('/login'));

// routers
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
