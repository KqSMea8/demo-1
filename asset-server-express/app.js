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
    // name: 'id', 默认connect.sid
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    cookie: {
        user: 'default',
        maxAge: 14 * 24 * 60 * 60 * 1000
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

app.use('/asset/', assetRouter);
app.use('/user/', userRouter);

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
    console.log('Express server listening on port http://localhost:' + server.address().port);
    debug('Express server listening on port ' + server.address().port);
});
