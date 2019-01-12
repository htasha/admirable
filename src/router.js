import Vue from 'vue'
import Router from 'vue-router'
import Clients from '@/views/Clients.vue'
import Company from '@/views/Company.vue'
import Settings from '@/views/Settings.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      component: Clients
    },
    {
      path: '/company',
      component: Company
    },
    {
      path: '/settings',
      component: Settings
    }
  ]
})