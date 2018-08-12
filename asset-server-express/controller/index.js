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
