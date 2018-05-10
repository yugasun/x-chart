import Mock from 'mockjs';
/* eslint-disable */
function param2Obj(url) {
  const search = url.split('?')[1];
  if (!search) {
    return {};
  }
  return JSON.parse(`{"${decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`);
}

export default {
  fetchDashboard: () => {
    const result = require('./json/dashboard.json');
    return result;
  },
  fetchChartData: (config) => {
    const params = param2Obj(config.url);
    const chartType = params.chart_type || 'x-line';
    const result = require(`./json/${chartType}.json`);
    return result;
  },
};
