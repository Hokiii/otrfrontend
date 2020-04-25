import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/font/iconfont.css'
// 导入全局样式表
import './assets/css/common.css'
// 配置axios
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
