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
    width: {
      type: [String, Number],
      default: '',
    },
    height: {
      type: [String, Number],
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
      // 是否含有x/y 坐标轴，对于 pie,relation 图形，需要设置为false
      hasAxis: true,

      chart: null,
      // 图形绘制方向
      direction: 'vertical',
      /**
       * vue-echarts 组件初始化配置，
       * 可以切换 canvas 和 svg 两种绘制模式
       */
      initOptions: { renderer: 'canvas' },
      xColumn: {},
      yColumns: [],
      categories: [],
      seriesData: [],
    };
  },
  computed: {
    /**
     * 柱子渐变风格控制
     */
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
              offset: 0, color: this.colorStart, // 0% 处的颜色
            }, {
              offset: 1, color: this.colorEnd, // 100% 处的颜色
            }],
            globalCoord: false, // 缺省为 false
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
    width(val, oldVal) {
      this.resizeChart();
    },
    height(val, oldVal) {
      this.resizeChart();
    },
    colorStart() {
      this.initChart();
    },
    colorEnd() {
      this.initChart();
    },
  },
  methods: {
    handleChartClick(param) {
      console.log(param);
    },

    /**
     * echarts instance init 事件
     * @param {object} chart echartsInstance
     */
    chartInit(chart) {
      this.chart = chart;
      // 这里必须在 nextTick 后 resize chart
      this.$nextTick(() => {
        this.resizeChart();
      });
    },

    /**
     * emit chart component init 事件
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
     * 转换图形数据成 echarts option 格式
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
     * 生成符合 echarts 配置规则的 series 数组元素
     * @param {string} type 图形组件类型
     * @param {string} name 图形组件title
     * @param {Array} data 数据
     * @param {object} itemStyle 数据项绘制风格
     * @param {string,number} zoom 是否可以下钻
     */
    createEchartsSeriesItem(type, name, data, itemStyle, zoom) {
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
     * 初始化图形
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
        // 对于多维图形，不设置渐变，对于单维配置渐变
        itemStyle = this.seriesData.length > 1 ? {} : this.itemStyle;
      } else {
        // 对于非坐标图形，不设置渐变
        itemStyle = {};
      }

      this.seriesData.forEach((data, index) => {
        const series = this.createEchartsSeriesItem(
          this.chart_type,
          this.yColumns[index].name,
          data,
          itemStyle,
          this.apiData.zoom,
        );
        this.options.series.push(series);
        // 这里注释，让echarts自动生成 legend 数据
        // this.options.legend.data.push(this.yColumns[index].name);
      });
    },

  },

  async mounted() {
    this.emitInit();
  },
};
