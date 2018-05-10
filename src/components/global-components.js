import {
  Loading,
  Notification,
  Message,
  Tooltip,
  Select,
  Option,
} from 'element-ui';

import ECharts from 'vue-echarts/components/ECharts';
// custom theme
import themeObj from '../themes/xuetangx.project.json';
// registering custom theme
ECharts.registerTheme(themeObj.themeName, themeObj.theme);

const GlobalComponents = {};

GlobalComponents.install = (Vue) => {
  Vue.prototype.theme = themeObj.themeName;
  Vue.component('echarts', ECharts);

  Vue.use(Loading.directive);
  Vue.prototype.$message = Message;
  Vue.prototype.$notify = Notification;

  Vue.use(Tooltip);
  Vue.use(Select);
  Vue.use(Option);
};

export default GlobalComponents;
