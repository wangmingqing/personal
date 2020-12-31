import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './styles/index.scss'
import 'font-awesome/css/font-awesome.min.css'
import './plugins/element.js'
import './plugins/vcolorpicker.js'
import echarts from 'echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
