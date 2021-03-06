import Vue from 'vue'
import App from './App.vue'
import VueCompositionApi from '@vue/composition-api'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.use(VueCompositionApi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
