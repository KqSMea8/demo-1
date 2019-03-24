let express = require('express');
let router = express.Router();
let assetsDao = require('../dao/assetsDao');
var auth = require('../middlewares/auth');

router.use(function (req, res, next) {
    auth.auth(req, res, next);
});

router.get('/', function (req, res, next) {
    res.render('index', {
        title: '用户已登录，欢迎记录资产'
    });
});

router.get('/assetlist', function (req, res, next) {
    assetsDao.queryAll(req, res, next);
});

router.get('/asset', function (req, res, next) {
    assetsDao.queryById(req, res, next);
});

router.post('/add', function (req, res, next) {
    assetsDao.add(req, res, next);
});

router.post('/delete', function (req, res, next) {
    assetsDao.delete(req, res, next);
});

router.post('/update', function (req, res, next) {
    assetsDao.update(req, res, next);
});

module.exports = router;