/**
 * @file 资产管理
 */
import Vue from 'vue';
import MintUI from 'mint-ui';
import App from './page/app';
import router from './router/index';
import './utils/base';
import http from './utils/http';

Vue.config.productionTip = false;
Vue.use(MintUI);
Vue.prototype.axios = http;

document.title = '资本记录';

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
