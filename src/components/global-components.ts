import {
  Loading,
  Notification,
  Message,
  Tooltip,
  Select,
  Option,
} from 'element-ui';

import ECharts from 'vue-echarts';
// custom theme
import themeObj from '../themes/xuetangx.project.json';
// registering custom theme
ECharts.registerTheme(themeObj.themeName, themeObj.theme);

class GlobalComponents {
  static install(V: any): void {
    V.prototype.theme = themeObj.themeName;
    V.component('echarts', ECharts);
    V.prototype.$message = Message;
    V.prototype.$notify = Notification;

    V.use(Loading.directive);
    V.use(Tooltip);
    V.use(Select);
    V.use(Option);
  }
}

export default GlobalComponents;
