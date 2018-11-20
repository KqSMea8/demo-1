let mysql = require('mysql');
let $conf = require('../conf/db');
let $sql = require('./userSqlMapping');

let pool = mysql.createPool($conf.mysql);

module.exports = {
    
}