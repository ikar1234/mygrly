var createError = require('http-errors');
const mongoose = require("mongoose");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');
// var schema = require('./data');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var galleriesRouter = require('./routes/galleries');

var app = express();

var dbRoute = "mongodb+srv://user1234:user1234@cluster0.g2jbm.mongodb.net/<dbname>?retryWrites=true&w=majority"

mongoose.connect(
  dbRoute,  
  { useNewUrlParser:true, useUnifiedTopology: true }
);

let db = mongoose.connection;

db.once("open", () => console.log("Connected to database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/galleries',galleriesRouter)

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

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
