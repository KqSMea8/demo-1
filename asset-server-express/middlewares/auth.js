let userDao = require('../dao/userDao');

function auth(req, res, next) {
    let findPattern = {name: "default"};
    let cookie = req.headers.cookie || "";
    cookie = cookie.split(";");
    let cookieUser = "default",
        sessionUser = "default";

    //解析cookie获取cookieUser
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
    
    // 查询数据库逻辑
    userDao.queryByName(sessionUser).then(result => {
        if (result.length) {
            next();
        }
        else {
            res.json({
                status: -1,
                msg: '用户不存在'
            });
        }
    })
}

module.exports = {
    auth
};