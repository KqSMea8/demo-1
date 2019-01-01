const crypto = require('crypto');
let mysql = require('mysql');
let $conf = require('../conf/db');
let $sql = require('./userSqlMapping');

let pool = mysql.createPool($conf.mysql);

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
                    console.log('result', result);
                    if (result.name === name) {
                        jsonnWrite(res, {
                            status: 1,
                            msg: '用户名重复',
                            data: {}
                        });

                        connection.release();

                    } else {
                        password = getMD5Password(password);
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
                    let result = result[0];
                    console.log('result', result);
                    if (result.password === password) {
                        result = {
                            status: 0,
                            msg: '查询成功',
                            data: {
                                name: result.name
                            }
                        }
                    }
                    else {
                        result = {
                            status: 1,
                            msg: '查询失败，密码不正确',
                            data: {}
                        }
                    }
                }

                jsonnWrite(res, result);
                connection.release();
            });
        })
    }
}
