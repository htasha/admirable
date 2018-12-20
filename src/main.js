import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/css/global.css'
import MultiFilters from '@/plugins/multi-filters'

Vue.use(MultiFilters)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')