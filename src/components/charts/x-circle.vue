<template>
    <echarts
        v-loading="loading"
        element-loading-text="Loading..."
        :theme="theme"
        ref="chart"
        class="chart"
        @init="chartInit"
        :auto-resize="true"
        :options="options"
    ></echarts>
</template>
<script lang="ts">
import ChartMixin from '@/components/mixins/chart-mixin';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';

@Component
export default class XCircle extends mixins(ChartMixin) {
    hasAxis: boolean = false;

    chartType: string = 'x-circle';

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
        confine: true,
        // backgroundColor: 'rgba(4,29,49,0.6)'
      },
      grid: {
        show: false,
        top: 40,
        left: 20,
        right: 20,
        bottom: 10,
        containLabel: true,
      },
      series: [],
    };
}
</script>
<style lang="scss" scoped>
</style>
