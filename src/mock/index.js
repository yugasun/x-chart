import Mock from 'mockjs';
import dashboardAPI from './dashboard';

Mock.setup({
  timeout: '350-600',
});

// dashboard相关
Mock.mock(/\/dashboard/, 'get', dashboardAPI.fetchDashboard);
Mock.mock(/\/chart_data/, 'get', dashboardAPI.fetchChartData);


export default Mock;
