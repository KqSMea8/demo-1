var express = require('express');
var router = express.Router();
var assetsDao = require('../dao/assetsDao');

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'express'
    })
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
})

module.exports = router;