let express = require('express');
let router = express.Router();
let assetsDao = require('../dao/assetsDao');
var auth = require('../middlewares/auth');

router.all(auth.auth);

router.get('/', function (req, res, next) {
    res.render('index', {
        title: '用户已登录，欢迎记录资产'
    });
});

router.get('/asset/assetlist', function (req, res, next) {
    assetsDao.queryAll(req, res, next);
});

router.get('/asset/asset', function(req, res, next) {
    assetsDao.queryById(req, res, next);
});

router.post('/asset/addAsset', function (req, res, next) {
    assetsDao.add(req, res, next);
});

router.post('/asset/deleteAsset', function(req, res, next) {
    assetsDao.delete(req, res, next);
});

router.post('/asset/updateAsset', function(req, res, next) {
    assetsDao.update(req, res, next);
});

module.exports = router;
