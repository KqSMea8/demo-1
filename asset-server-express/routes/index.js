var express = require('express');
var router = express.Router();
var assetsDao = require('../dao/assetsDao');

router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'express'
    })
});

router.get('/assetlist', function (req, res, next) {
    assetsDao.queryAll(req, res, next);
});

router.get('/asset', function(req, res, next) {
    assetsDao.query(req, res, next);
});

router.post('/addAsset', function (req, res, next) {
    assetsDao.add(req, res, next);
});

router.post('/deleteAsset', function(req, res, next) {
    assetsDao.delete(req, res, next);
});

router.post('/updateAsset', function(req, res, next) {
    assetsDao.update(req, res, next);
})

module.exports = router;