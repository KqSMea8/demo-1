const Service = require('egg').Service;

class AssetService extends Service {
    async find() {
        const assets = await this.app.mysql.get('assets');
        return {assets};
    }

    async insert() {
        const result = await this.app.mysql.insert('assets', {name: '基金', value: 1000});
        const insertSuccess = result.affectedRows === 1;
        if (insertSuccess) {
            console.log('success');
        }
    }
}

module.exports = AssetService;
