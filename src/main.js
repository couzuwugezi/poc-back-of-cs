import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import * as echarts from 'echarts'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

Vue.use(element)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
