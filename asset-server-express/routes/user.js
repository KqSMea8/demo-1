let express = require('express');
let router = express.Router();
let userDao = require('../dao/userDao');

router.post('/adduser', function (req, res, next) {
    userDao.add(req, res, next);
});

router.post('/login', function (req, res, next) {
    userDao.login(req, res, next);
});

module.exports = router;
