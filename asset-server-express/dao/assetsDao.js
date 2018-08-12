var mysql = require('mysql');
var $conf = require('../conf/db');
var $sql = require('./assetsSqlMapping');

var pool = mysql.createPool($conf.mysql);

var jsonnWrite = function(res, ret) {
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

            var param = req.body;
            console.log('param', param);

            var name = param.name;
            var value = parseInt(param.value);
            console.log(name);
            console.log(value);

            connection.query($sql.insert, [name, value], function(err, result) {
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
                        id: result.insertId
                    }
                }

                jsonnWrite(res, result);

                connection.release();
            });
        });
    },
    delete: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query($sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        status: 0,
                        msg: '增加成功'
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
        var param = req.body;
        if (param.name == null || param.value == null || param.id == null) {
            jsonnWrite(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query($sql.update, [param.name, param.value, +param.id], function(err, result) {
                if (result.affectedRows > 0) {
                    result = {
                        status: 0,
                        msg: '更新成功'
                    };

                    jsonnWrite(result);
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
        var id = +req.query.id;
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryById, id, function(err, result) {
                jsonnWrite(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query($sql.queryAll, function(err, result) {
                jsonnWrite(res, result);
                connection.release();
            });
        });
    }
};
