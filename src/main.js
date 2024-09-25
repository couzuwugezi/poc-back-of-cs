import Vue from 'vue'
import App from './App.vue'
import router from './router'
import element from 'element-ui'
import * as echarts from 'echarts'
import md5 from 'js-md5';

import moment from 'moment';


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

// 使用moment中文语言包
moment.locale('zh-cn');

Vue.use(element)
Vue.prototype.$md5 = md5;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
