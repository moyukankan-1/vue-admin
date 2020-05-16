import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router/index.js'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './icons'
import './router/premit'
Vue.use(ElementUI)
Vue.use(VueCompositionApi)

//自定义全局方法
import global from "@/utils/global"
Vue.use(global)



Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
