import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/assets/css/global.css'
import MultiFilters from '@/plugins/multi-filters'
import store from './store'
import dayjs from 'dayjs'
import randomColor from 'randomcolor'

Vue.use(MultiFilters)
Vue.config.productionTip = false
Vue.prototype.$dayjs = dayjs
Vue.prototype.$randomColor = randomColor

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    // Prevent blank screen in Electron builds
    this.$router.push('/')
  }
}).$mount('#app')