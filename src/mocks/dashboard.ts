import { RequestParam } from '@/types/interfaces';
import * as DATA from './data';

export default {
    getConfig() {
        return DATA.Dashboard;
    },
    async getChartData(params: RequestParam) {
        const chartType = params.chartType || 'x-line';
        return DATA.Charts[chartType];
    },
};
