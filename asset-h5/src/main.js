/**
 * @file 资产管理
 */
import Vue from 'vue';
import MintUI from 'mint-ui';
import App from './page/app';
import router from './router/index';
import './utils/base';

Vue.config.productionTip = false;
Vue.use(MintUI);

document.title = '资产管理系统';

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
})
