import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Clients from '@/views/Clients.vue'
import Company from '@/views/Company.vue'
import Settings from '@/views/Settings.vue'
import store from '@/store';
import {
  FETCH_ALL_DOCUMENTS
} from '@/store/action-types';
import {
  SET_STATE
} from '@/store/mutation-types';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    component: Home,
    children: [{
        path: 'clients',
        component: Clients,
        beforeEnter: async (to, from, next) => {
          let docs = await store.dispatch('clients/' + FETCH_ALL_DOCUMENTS)
          let mappedItems = docs.rows.map(el => el.doc);
          store.commit("clients/" + SET_STATE, mappedItems);
          next()
        }
      },
      {
        path: 'company',
        component: Company
      },
      {
        path: 'settings',
        component: Settings
      }
    ]
  }]
})