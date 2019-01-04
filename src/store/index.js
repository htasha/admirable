import Vue from 'vue'
import Vuex from 'vuex'
import clients from '@/store/modules/clients'
import technicians from '@/store/modules/technicians'
import VueSimplePersistPlugin from '@/plugins/vue-simple-persist'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [VueSimplePersistPlugin],
  modules: {
    clients,
    technicians
  }
})