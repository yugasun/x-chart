import ECharts from 'vue-echarts';
import { registerTheme } from 'echarts';
import type { App } from 'vue';

// custom theme
import defaultTheme from '@/themes/default.project.json';

// registering custom theme
registerTheme(defaultTheme.themeName, defaultTheme.theme);

class GlobalComponents {
    static install(app: App): void {
        app.component('Echarts', ECharts);
    }
}

export default GlobalComponents;
