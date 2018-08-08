var mysql = require('mysql');
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'mysql',
    connectionLimit: 10
});

pool.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }

    connection.query('SELECT 1 + 1 AS solution',function(err, result){
        connection.release();
        if(err){
            console.log(err);
            return;
        }
        console.log('The solution is: ', result[0].solution);
    })
})

module.exports = mysql;
