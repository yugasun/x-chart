<template>
    <echarts
        v-loading="loading"
        element-loading-text="Loading..."
        :theme="theme"
        ref="chart"
        class="chart"
        @click="handleChartClick"
        @init="chartInit"
        :auto-resize="true"
        :options="options"
    ></echarts>
</template>
<script lang="ts">
import ChartMixin from '@/components/mixins/chart-mixin';
import { cutStr } from '@/utils/tool';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';

export default class XHbar extends mixins(ChartMixin) {
    chartType: string = 'x-hbar';

    direction: string = 'horizontal';

    options: object = {
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
            formatter(params: string) {
              return cutStr(params, 5);
            },
          },
        },
      ],
      series: [],
    };
}
</script>
<style lang="scss" scoped>
</style>
