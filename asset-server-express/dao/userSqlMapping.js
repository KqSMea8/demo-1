// https://blog.csdn.net/cramon/article/details/54983591

let user = {
    insert: 'insert into user(id, name, password) value(0, ?, ?);',
    select: "select * from user where name = ?"
};

module.exports = user;