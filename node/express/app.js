var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const register = require('./routes/register');
const messages = require('./middleware/messages');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var entries = require('./routes/entries');

var app = express();

const User = require('./model/user');
const user = new User({name: 'Example', pass: 'test'});
user.save((err) => {
  if (err) {
    console.error(err);
  }
  console.log('user id %d', user.id);
})

// app.use(express.methodOverride());
// app.use(express.cookieParser());
app.use(messages);
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));


// const validate = require('./middleware/validate');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.set('title', 'my application');
app.get('/post', entries.form);
app.post('/post', entries.submit);
app.use('/', entries.list);

function requireEntryTitle(req, res, next) {
  const title = req.body.entry.title;
  if (title) {
    next();
  }
  else {
    res.error('Title is required');
    res.redirect('back');
  }
}

function requireEntryTitleLengthAbove(len) {
    return (req, res, next) => {
      const title = req.body.entry.title;
      if (title.length > len) {
        next();
      }
      else {
        res.error(`Title must be longer than ${len}`);
        res.redirect('back');
      }
    }
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

app.locals.settings = app.settings;

module.exports = app;
