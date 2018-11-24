let express = require('express');
let router = express.Router();
let userDao = require('../dao/userDao');

router.post('/adduser', function (req, res, next) {
    console.log('adduser name', req.body.name);
    console.log('adduser pwd', req.body.pwd);
    userDao.add(req, res, next);
});

module.exports = router;