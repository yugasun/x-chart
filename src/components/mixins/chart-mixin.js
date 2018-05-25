/**
 * chart mixin
 *
 */
export default {
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    legend: {
      type: Boolean,
      default: true,
    },
    apiData: {
      type: Object,
      default() {
        return {
          columns: [],
          rows: [],
        };
      },
    },
    title: {
      type: String,
      default: '',
    },
    colorStart: {
      type: String,
      default: '#7956EC',
    },
    colorEnd: {
      type: String,
      default: '#3CECCF',
    },
  },
  data() {
    return {
      /**
       * whether has axis,
       * for pie,relation chart need set false
       */
      hasAxis: true,

      chart: null,
      // render direction
      direction: 'vertical',
      /**
       * init options for vue-echarts
       * switch render mode between canvas and svg
       */
      initOptions: { renderer: 'canvas' },
      xColumn: {},
      yColumns: [],
      categories: [],
      seriesData: [],
    };
  },
  computed: {
    itemStyle() {
      const defaultItemStyle = {
        normal: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [{
              offset: 0, color: this.colorStart, // 0%
            }, {
              offset: 1, color: this.colorEnd, // 100%
            }],
          },
        },
      };
      if (this.chart_type === 'x-bar') {
        defaultItemStyle.normal.color.x2 = 0;
        defaultItemStyle.normal.color.y2 = 1;
      }
      return defaultItemStyle;
    },
  },
  watch: {
    apiData: {
      // deep: true,
      immediate: true,
      handler(val, oldVal) {
        if (!this.loading) {
          this.initChart();
        }
      },
    },
    colorStart() {
      this.initChart();
    },
    colorEnd() {
      this.initChart();
    },
    legend(val, oldVal) {
      this.chart.setOption({
        legend: {
          show: val,
        },
      });
    },
  },
  methods: {
    handleChartClick(param) {
      console.log(param);
    },

    /**
     * echarts instance init event
     * @param {object} chart echartsInstance
     */
    chartInit(chart) {
      this.chart = chart;
      // must resize chart in nextTick
      this.$nextTick(() => {
        this.resizeChart();
      });
    },

    /**
     * emit chart component init event
     */
    emitInit() {
      this.$emit('init', {
        chart: this.chart,
        chartData: this.apiData,
      });
    },

    /**
     * resize chart
     */
    resizeChart() {
      /* eslint-disable no-unused-expressions */
      this.chart && this.chart.resize();
    },

    /**
     * convert to echarts option format
     */
    convertData() {
      const data = this.apiData;
      this.yColumns = [];
      this.categories = [];
      this.seriesData = [];
      this.apiData.columns.forEach((item) => {
        if (item.type === 'x') {
          this.xColumn = item;
        }
        if (item.type === 'y') {
          this.yColumns.push(item);
        }
      });

      this.yColumns.forEach((yColumn) => {
        const series = [];
        data.rows.forEach((row) => {
          if (this.xColumn && this.xColumn.field) {
            if (this.categories.length < data.rows.length) {
              this.categories.push(row[this.xColumn.field]);
            }
          }
          if (yColumn && yColumn.field) {
            series.push({
              ...{
                name: row[this.xColumn.field],
                value: row[yColumn.field],
              },
              ...row,
            });
          }
        });
        this.seriesData.push(series);
      });
    },

    /**
     * create series array suit for echarts options
     * @param {string} type chart type
     * @param {string} name chart title
     * @param {Array} data chart data
     * @param {object} itemStyle chart item render style
     */
    createEchartsSeriesItem(type, name, data, itemStyle) {
      const seriesItem = {
        name,
        data,
        itemStyle,
        smooth: true,
      };
      let extraOptions;

      switch (type) {
        case 'x-bar':
          extraOptions = {
            type: 'bar',
          };
          break;
        case 'x-hbar':
          extraOptions = {
            type: 'bar',
          };
          break;
        case 'x-line-area':
          extraOptions = {
            type: 'line',
            areaStyle: {
              normal: {
                opacity: 0.3,
              },
            },
          };
          break;
        case 'x-pie':
          extraOptions = {
            type: 'pie',
            radius: '60%',
            center: ['50%', '50%'],
            label: {
              normal: {
                show: false,
                formatter: '{b}: {d}%',
                color: '#9FA9BB',
              },
            },
            labelLine: {
              normal: {
                show: false,
                lineStyle: {
                  color: '#9FA9BB',
                },
              },
            },
          };
          break;
        case 'x-circle':
          extraOptions = {
            type: 'pie',
            radius: ['50%', '60%'],
            center: ['50%', '50%'],
            label: {
              normal: {
                show: false,
                formatter: '{b}: {d}%',
                color: '#9FA9BB',
              },
            },
            labelLine: {
              normal: {
                show: false,
                lineStyle: {
                  color: '#9FA9BB',
                },
              },
            },
          };
          break;
        default:
          extraOptions = {
            type: 'line',
          };
      }

      return Object.assign({}, seriesItem, extraOptions);
    },

    /**
     * init chart
     */
    initChart() {
      this.convertData();
      this.options.series = [];
      let itemStyle;
      if (this.hasAxis) {
        if (this.direction === 'horizontal') {
          this.options.yAxis[0].data = this.categories;
        } else {
          this.options.xAxis[0].data = this.categories;
        }
        // set gradient for single measure
        itemStyle = this.seriesData.length > 1 ? {} : this.itemStyle;
      } else {
        itemStyle = {};
      }

      this.seriesData.forEach((data, index) => {
        const series = this.createEchartsSeriesItem(
          this.chart_type,
          this.yColumns[index].name,
          data,
          itemStyle,
        );
        this.options.series.push(series);
      });
    },

  },

  async mounted() {
    this.emitInit();
  },
};
