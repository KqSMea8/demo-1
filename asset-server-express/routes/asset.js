let express = require('express');
let router = express.Router();
let assetsDao = require('../dao/assetsDao');
let userDao = require('../dao/userDao');

router.get('/', function (req, res, next) {
    let findPattern = {name: "default"};
    let cookie = req.headers.cookie || "";
    cookie = cookie.split(";");
    let cookieUser = "default",
        sessionUser = "default";

    //解析cookie获取cookieUser，略去
    let cookieObj = {};
    cookie.forEach(cookie => {
        let parts = cookie.split('=');
        cookieObj[parts[0].trim()] = parts[1].trim();
    });

    cookieUser = cookieObj.user;

    if(req.session && req.session.user){
        sessionUser = req.session.user;
    }

    //防止伪造cookie登录
    if(cookieUser == sessionUser){
        findPattern = {user: sessionUser};
    }
    else {
        res.clearCookie('user', {});
        res.cookie('isLogin', 'false');
    }

    // 查询数据库逻辑，略去
    userDao.queryByName(sessionUser).then(isUserExit => {
        if (isUserExit) {
            res.render('index', {
                title: '用户已登录'
            });
        }
        else {
            res.render('index', {
                title: '用户未登录'
            });
        }
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
