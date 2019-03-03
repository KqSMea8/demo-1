var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var logger = require('morgan');
var redisStore = require('connect-redis')(session);

var assetRouter = require('./routes/asset');
var userRouter = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 3
    },
    // store: new redisStore({
    //     host: '127.0.0.1',
    //     port: '6397',
    //     db: 0,
    //     pass: '',
    // })
}));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res, next) {
    // if (req.cookie.isFirst || req.session.isFirst) {
    //     res.send('再次欢迎访问');
    //     console.log(req.cookies);
    // }
    // else {
        req.session.isFirst = 1;
        res.cookie('isFirst', 1, {maxAge: 60 * 1000});
        res.send('欢迎第一次访问');
    // }

    next();
});

app.use('/', assetRouter);
app.use('/', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

var debug = require('debug')('my-application'); // debug模块
app.set('port', process.env.PORT || 3000); // 设定监听端口

//启动监听
var server = app.listen(app.get('port'), function () {
    console.log('Express server listening on port localhost:' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});
