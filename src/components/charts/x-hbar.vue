<template>
  <echarts
    v-loading="loading"
    element-loading-text="玩儿命加载中..."
    :theme="theme"
    ref="chart"
    class="chart"
    @click="handleChartClick"
    @init="chartInit"
    :auto-resize="true"
    :options="options">
  </echarts>
</template>
<script>
import ChartMixin from '@/components/mixins/chart-mixin';
import { cutStr } from '@/utils/tool';

export default {
  name: 'XHbar',
  mixins: [ChartMixin],
  data() {
    return {
      chart_type: 'x-hbar',
      direction: 'horizontal',
      options: {
        title: {
          show: false,
          text: this.title,
          textStyle: {
            align: 'center',
            verticalAlign: 'middle',
          },
          top: 10,
          left: '10',
        },
        legend: {
          show: true,
          top: 10,
          // data: [],
        },
        tooltip: {
          trigger: 'item',
          axisPointer: {
            type: 'line',
          },
        },
        grid: {
          show: true,
          top: 40,
          left: 20,
          right: 20,
          bottom: 10,
          containLabel: true,
        },
        xAxis: [
          {
            type: 'value',
            position: 'top',
            axisLine: {
              lineStyle: {
                color: '#9FA9BB',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'category',
            axisLine: {
              lineStyle: {
                color: '#9FA9BB',
              },
            },
            inverse: true,
            data: [],
            axisLabel: {
              rotate: 0,
              showMaxLabel: true,
              formatter(params, index) {
                return cutStr(params, 5);
              },
            },
          },
        ],
        series: [],
      },
    };
  },
  methods: {

  },
};
</script>
<style lang="scss" scoped>

</style>
