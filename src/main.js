import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import api from './utils/api.js'
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.prototype.$qs = qs
Vue.prototype.$api = api.commonUrl
axios.defaults.baseURL = '/api'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
