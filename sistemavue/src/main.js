import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios'
Vue.config.productionTip = false
//Railway 
axios.defaults.baseURL='https://backsustematicket-production.up.railway.app/'

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
