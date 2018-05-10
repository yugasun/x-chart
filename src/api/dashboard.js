import request from '@/utils/request';

/**
 * 获得dashboard 模块
 * @param {number} dashboardId 展示板模块ID
 */
export function fetchDashboard() {
  return request({
    url: '/dashboard/',
    method: 'get',
  });
}

export function fetchChartData(params) {
  return request({
    url: '/chart_data/',
    method: 'get',
    params,
  });
}
