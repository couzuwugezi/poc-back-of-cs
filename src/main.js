import * as echarts from "echarts";
import element from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import md5 from "js-md5";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import moment from "moment";

Vue.config.productionTip = false;
Vue.prototype.$echarts = echarts;

// 使用moment中文语言包
moment.locale("zh-cn");

Vue.use(element);
Vue.prototype.$md5 = md5;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
