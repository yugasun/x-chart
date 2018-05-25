// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'normalize.css';
import '@/styles/app.scss';

// import Echarts modules manually to reduce buidle size
// import 'echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';
// echarts component
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Vue from 'vue';
import stringify from 'qs/lib/stringify';
import VueAxiosPlugin from 'vue-axios-plugin';
import App from './App';
import router from './router';
import store from './store';
import GlobalComponents from './components/global-components';
import { jsonProp } from './utils/tool';

// error handler
import './errorLog';

// mock data
import './mock';

Vue.config.productionTip = false;

Vue.use(VueAxiosPlugin, {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  transformRequest: [
    function a(data) {
      return stringify(jsonProp(data));
    },
  ],
  resHandleFunc: (response) => {
    const data = response.data;
    return {
      status: response.status || 500,
      ...data,
    };
  },
});

Vue.use(GlobalComponents);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
