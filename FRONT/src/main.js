import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueTextareaAutosize)
Vue.use(VueCookies)
const moment = require('moment')
require('moment/locale/fr')

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
