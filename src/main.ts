import { createApp } from 'vue';
import { use } from 'echarts/core';
import VueGridLayout from 'vue-grid-layout';

// import ECharts modules manually to reduce bundle size
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
    LegendComponent,
    GridComponent,
    TooltipComponent,
} from 'echarts/components';

import router from '@/router';
import store from '@/store';
import GlobalComponents from '@/plugins/global-components';
import { ErrorHandler } from '@/plugins/error-handler';

import '@/styles/app.scss';

import App from '@/App.vue';

use([
    CanvasRenderer,
    BarChart,
    LineChart,
    PieChart,
    LegendComponent,
    GridComponent,
    TooltipComponent,
]);

async function main() {
    // Start mock server
    if (import.meta.env.DEV || import.meta.env.VITE_IS_VERCEL) {
        const { worker } = await import('./mocks/index');
        worker.start();
    }

    const app = createApp(App);

    // 挂载插件
    app.use(store);
    app.use(router);
    app.use(GlobalComponents);
    app.use(VueGridLayout);
    app.use(ErrorHandler);

    app.mount('#app');
}

main();
