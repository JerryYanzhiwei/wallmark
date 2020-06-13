import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/http.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/reset.css'

// 混入
import mixin from '@/mixin/index'
Vue.mixin(mixin)

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
