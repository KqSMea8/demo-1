'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
    async index() {
        const ctx = this.ctx;
        const assets = await ctx.service.index.find();
        const res = {};
        res.data = {};
        res.status = 0;
        res.msg = 'ok';
        res.data.list = assets;
        ctx.body = res;
    }
    async saveData() {
        const ctx = this.ctx;
        await ctx.service.index.insert();
    }
}

module.exports = HomeController;
