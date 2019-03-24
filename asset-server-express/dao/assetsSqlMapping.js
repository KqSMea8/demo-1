var assets = {
    insert: 'INSERT INTO assets(id, name, value, uid) VALUES(0, ?, ?, ?);',
    update: 'UPDATE assets SET name = ?, value = ? WHERE id = ?;',
    delete: 'delete from assets where id=?;',
    queryById: 'select * from assets where id=?;',
    queryAll: 'select * from assets where uid=?;',
    // queryAll: 'select * from assets'
};

module.exports = assets;
