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

export default class XLineArea extends mixins(ChartMixin) {
    chartType: string = 'x-line-area';

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
        confine: true,
        // backgroundColor: 'rgba(4,29,49,0.6)'
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
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#9FA9BB',
            },
          },
          data: [],
          axisLabel: {
            rotate: 75,
            showMaxLabel: true,
            formatter(params: string) {
              return cutStr(params, 5);
            },
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: {
            lineStyle: {
              color: '#9FA9BB',
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
