import Vue from 'vue'
import Vuex from 'vuex'
import clients from '@/store/modules/clients'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clients
  }
})