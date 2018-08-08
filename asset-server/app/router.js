'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {
        router,
        controller
    } = app;

    router.get('/assetslist', controller.home.index);
    router.post('/assets/add', controller.home.saveData);
};