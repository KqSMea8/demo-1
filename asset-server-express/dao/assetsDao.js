let mysql = require('mysql');
let $conf = require('../conf/db');
let $sql = require('./assetsSqlMapping');
let userDao = require('./userDao');
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

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            // 参数校验格式非空
            let param = req.body;
            let name = param.name;
            let value = parseInt(param.value);
            console.log(name);
            console.log(value);
            if (name && value) {
                userDao.getUid(req.session.user).then(uid => {
                    console.log('uid', uid);
                    connection.query($sql.insert, [name, value, uid], function(err, result) {
                        if (err) {
                            console.log(err.message);
                        }
                        console.log(result.insertId);
                        console.log(result);
                        console.log(err);
                        if (result) {
                            result = {
                                status: 0,
                                msg: '增加成功',
                                data: {
                                    id: result.insertId
                                }
                            };
                        }
        
                        jsonnWrite(res, result);
                        connection.release();
                    });
                }).catch(() => {
                    let result = {
                        status: 2,
                        msg: '增加失败',
                        data: {}
                    };
                    jsonnWrite(res, result);
                    connection.release();
                });
            }
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            console.log('req.body.id');
            console.log(req.body.id);
            let id = +req.body.id;
            connection.query($sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        status: 0,
                        msg: '删除成功'
                    }
                }
                else {
                    result = void 0;
                }
                jsonnWrite(res, result);

                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        let param = req.body;
        let name = param.name;
        let value = parseFloat(param.value);

        if (param.name == null || param.value == null || param.id == null) {
            jsonnWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [name, value, param.id], function(err, result) {
                if (err) {
                    console.error(err);
                }

                if (result.affectedRows > 0) {
                    result = {
                        status: 0,
                        msg: '更新成功'
                    };

                    jsonnWrite(res, result);
                }
                else {
                    result = {
                        status: 2,
                        msg: '更新失败'
                    };

                    jsonnWrite(result);
                }

                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        let id = +req.query.id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                if (err) {
                    console.error(err);
                }
                else {
                    result = {
                        status: 0,
                        msg: '查询成功',
                        data: result
                    }
                    jsonnWrite(res, result);
                }

                connection.release();
            })

        });
    },
    queryAll: function(req, res, next) {
        // 使用用户名解析用户uid
        userDao.getUid(req.session.user).then(uid => {
            // let uid = user[0].id;
            pool.getConnection(function(err, connection) {
                connection.query($sql.queryAll, uid, function(err, result) {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        result = {
                            status: 0,
                            msg: '查询成功',
                            data: {
                                list: result
                            }
                        }
                        jsonnWrite(res, result);
                    }
    
                    connection.release();
                });
            });
        });
    }
};
