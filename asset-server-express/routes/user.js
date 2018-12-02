let express = require('express');
let router = express.Router();
let userDao = require('../dao/userDao');

router.post('/adduser', function (req, res, next) {
    console.log('adduser name', req.body.name);
    console.log('adduser password', req.body.password);
    userDao.add(req, res, next);
});

router.post('/login', function (req, res, next) {
    console.log('login name', req.body.name);
    console.log('login password', req.body.password);
    userDao.login(req, res, next);
});

module.exports = router;