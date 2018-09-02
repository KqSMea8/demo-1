/**
 * @file 路由
 * @author sufubo@baidu.com
 */
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/assets/index';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        }
    ]
});
