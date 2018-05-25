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
      :options="options">
    </echarts>
</template>
<script>
import ChartMixin from '@/components/mixins/chart-mixin';
import { cutStr } from '@/utils/tool';
// import { LinearGradient } from 'echarts/lib/util/graphic'

export default {
  name: 'XLineArea',
  mixins: [ChartMixin],
  data() {
    return {
      chart_type: 'x-line-area',
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
              formatter(params, index) {
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
      },
    };
  },
  methods: {
    /**
     * 初始化图形
     */
    // initChart() {
    //   this.convertData();
    //   this.options.series = [];
    //   this.options.xAxis[0].data = this.categories;
    //   this.options.series.push({
    //     name: this.yColumn.name,
    //     type: 'line',
    //     areaStyle: {
    //       normal: {
    //         opacity: 0.3,
    //       },
    //     },
    //     data: this.seriesData,
    //     smooth: true,
    //     itemStyle: this.itemStyle,
    //     cursor: this.apiData.zoom === 1 ? 'pointer' : 'default',
    //   });
    // },
  },
};
</script>
<style lang="scss" scoped>

</style>
