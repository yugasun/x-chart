<template>
   <echarts
      v-loading="loading"
      element-loading-text="玩儿命加载中..."
      :theme="theme"
      ref="chart"
      class="chart"
      @init="chartInit"
      :auto-resize="true"
      :options="options">
    </echarts>
</template>
<script>
import ChartMixin from '@/components/mixins/chart-mixin';

export default {
  name: 'XCircle',
  mixins: [ChartMixin],

  data() {
    return {
      hasAxis: false,
      chart_type: 'x-circle',
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
      },
    };
  },

  methods: {
    /**
     * 初始化图形
     */
    // initChart() {
    //   this.convertData();
    //   this.options.series = [
    //     {
    //       name: this.yColumn.name,
    //       type: 'pie',
    //       radius: ['50%', '60%'],
    //       data: this.seriesData,
    //       center: ['50%', '50%'],
    //       label: {
    //         normal: {
    //           show: false,
    //           formatter: '{b}: {d}%',
    //           color: '#9FA9BB',
    //         },
    //       },
    //       labelLine: {
    //         normal: {
    //           show: false,
    //           lineStyle: {
    //             color: '#9FA9BB',
    //           },
    //         },
    //       },
    //     },
    //   ];
    //   this.options.legend.data = [this.yColumn.name];
    // },
  },
};
</script>
<style lang="scss" scoped>

</style>
