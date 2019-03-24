const crypto = require('crypto');
const mysql = require('mysql');
const $conf = require('../conf/db');
const $sql = require('./userSqlMapping');
const pool = mysql.createPool($conf.mysql);

let jsonnWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            status: 1,
            msg: '操作失败'
        })
    }
    else {
        res.json(ret);
    }
}

function getMD5Password(content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    var d = md5.digest('hex');
    return d;
}

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            if (err) {
                console.log(err.message);
            }

            let param = req.body;
            let name = param.name;
            let password = param.password;

            connection.query($sql.select, [name], (err, result) => {
                if (err) {
                    console.log(err.message);
                }
                else if (result) {
                    result = result[0];
                    if (result && result.name === name) {
                        jsonnWrite(res, {
                            status: 1,
                            msg: '用户名重复',
                            data: {}
                        });

                        connection.release();

                    } else {
                        password = getMD5Password(password);
                        console.log(password, password);
                        connection.query($sql.insert, [name, password], (err, result) => {
                            if (err) {
                                console.log(err.message);
                            }
                            else {
                                if (result) {
                                    req.session.name = name;
                                    req.session.loggedIn = 1;
                                    result = {
                                        status: 0,
                                        msg: '增加成功',
                                        data: {
                                            id: result.insertId
                                        }
                                    }
                                }
                            }

                            jsonnWrite(res, result);

                            connection.release();
                        });
                    }
                }
            });


        });
    },
    login: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            let param = req.body;
            let name = param.name;
            let password = param.password;

            password = getMD5Password(password);

            connection.query($sql.select, [name], (err, result) => {
                if (err) {
                    console.log(err.message);
                } else if (result) {
                    result = result[0];
                    console.log('result')
                    
                    if (result && result.password === password) {
                        result = {
                            status: 0,
                            msg: '查询成功',
                            data: {
                                name: result.name
                            }
                        }

                        req.session.user = name;
                        req.session.isLogin = true;
                        res.cookie('user', name);
                        res.cookie('isLogin', 'true');
                    }
                    else {
                        result = {
                            status: 1,
                            msg: '查询失败，密码不正确',
                            data: {}
                        }
                        req.session.user = name;
                        req.session.isLogin = false;
                        res.cookie('user', name);
                        res.cookie('isLogin', 'false');
                    }
                }

                jsonnWrite(res, result);
                connection.release();
            });
        })
    },
    logout: function (req, res, next) {
        req.session.destroy(function () {
            res.clearCookie('user', {});
            let result = {
                status: 0,
                msg: '登出成功',
                data: {}
            }
            jsonnWrite(res, result);
        })
    },
    queryByName: function (name) {
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                connection.query($sql.select, name, (err, result) => {
                    if (err) {
                        console.error(err);
                        resolve(false);
                    }
                    else {
                        resolve(result)
                    }
                    connection.release();
                })
            });
        });
    },
    getUid: function (name) {
        return new Promise((resolve, reject) => {
            this.queryByName(name).then(result => {
                if (result.length) {
                    resolve(result[0].id);
                }
                else {
                    reject();
                }
            })
        });
    }
}
