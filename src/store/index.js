import Vue from 'vue'
import Vuex from 'vuex'
import clients from '@/store/modules/clients'
import vueSimplePersistPlugin from '@/plugins/vue-simple-persist'
Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [vueSimplePersistPlugin],
  modules: {
    clients
  }
})

/*
utils/
  api/
  models/
    index.js // Create local database and export the instance
    model-1.js
    mode-n.js
store/
  index.js // Assemble the store
  mutation-types.js
  action-types.js
  modules/
    clients/ // Module name
      index.js  // Module state
      mutations.js
      getters.js
      actions.js
*/