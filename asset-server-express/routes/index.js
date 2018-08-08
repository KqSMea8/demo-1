var express = require('express');
var router = express.Router();
var mysql = require('../controller/index');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {
        title: 'express'
    })
});

router.get('/assetslist', function (req, res, next) {
    let data = {
        status: 0,
        msg: 'ok',
        data: {
            list: [{'name': '基金', value: 1000}]
        }
    }
    res.send(data)
});

router.post('/assets/add', function (req, res, next) {


    let body = req.body;
    let name = req.name;
    let value = req.value;

    res.send(data)
});

module.exports = router;