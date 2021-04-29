import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VuePostgrest  from 'vue-postgrest'
import router from './router'

Vue.use(Vuex)

Vue.use(VuePostgrest, {
  apiRoot:  'http://Auroch:3000/'
})


Vue.config.productionTip = false


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

