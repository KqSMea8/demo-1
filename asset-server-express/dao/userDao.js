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

module.exports = {
    add: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            let param = req.body;
            let name = param.name;
            let password = param.password;

            connection.query($sql.insert, [name, password], function(err, result) {
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
                    }
                }

                jsonnWrite(res, result);

                connection.release();
            });
        });
    },
    login: function (req, res, next) {
        pool.getConnection(function(err, connection) {
            let param = req.body;
            let name = param.name;
            let pwd = param.pwd;

            connection.query($sql.select, [name], function(err, result) {
                if (err) {
                    console.log(err.message);

                }
                console.log(result.insertId);
                console.log(result);
                console.log(err);
                if (result) {
                    result = {
                        status: 0,
                        msg: '查询成功',
                        data: {
                            name: result.name
                        }
                    }
                }
                jsonnWrite(res, result);
                connection.release();
            });
        })
    }
}
