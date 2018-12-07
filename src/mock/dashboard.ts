import { AxiosRequestConfig } from 'axios';
import { RequestParam } from '@/types/interfaces';

function param2Obj(url: string): RequestParam {
  const search = url.split('?')[1];
  if (!search) {
    return {
      chartType: '',
    };
  }
  return JSON.parse(`{"${decodeURIComponent(search)
    .replace(/"/g, '\\"')
    .replace(/&/g, '","')
    .replace(/=/g, '":"')}"}`);
}

/* eslint-disable import/no-dynamic-require,global-require */
export default {
  fetchDashboard() {
    const result = require('./json/dashboard.json');

    return result;
  },
  fetchChartData(config: AxiosRequestConfig) {
    const params: RequestParam = param2Obj(config.url || '');
    const chartType = params.chartType || 'x-line';
    const result = require(`./json/${chartType}.json`);
    return result;
  },
};
