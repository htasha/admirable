import Vue from 'vue'
import Vuex from 'vuex'
import clients from '@/store/modules/clients'
import technicians from '@/store/modules/technicians'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clients,
    technicians
  }
})