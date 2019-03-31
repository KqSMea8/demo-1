import Vue from 'vue'
import Router from 'vue-router'
import Hoc from '@/components/hoc'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'hoc',
    component: Hoc
  }]
})
