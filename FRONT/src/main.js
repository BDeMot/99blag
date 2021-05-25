import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuelidate from 'vuelidate'
import store from './store'
import VueTextareaAutosize from 'vue-textarea-autosize'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueTextareaAutosize)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
