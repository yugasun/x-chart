import {
  Vue, Component, Prop, Watch,
} from 'vue-property-decorator';
import { ApiData, ChartInstance } from '@/types/interfaces';

@Component({})
export default class ChartMixin extends Vue {
  @Prop({ default: true }) loading!: boolean;

  @Prop({ default: true }) legend!: boolean;

  @Prop({ default: { columns: [], rows: [] } }) apiData!: ApiData;

  @Prop({ default: '' }) title!: string;

  @Prop({ default: '#7956EC' }) colorStart!: string;

  @Prop({ default: '#3CECCF' }) colorEnd!: string;

  $refs: any = {
    chart: HTMLDivElement,
  };

  chartType: string = '';

  /**
   * whether has axis,
   * for pie,relation chart need set false
   */
  hasAxis: boolean = true;

  chart: ChartInstance = { setOption() {}, resize() {} };

  // render direction
  direction: string = 'vertical';

  /**
   * init options for vue-echarts
   * switch render mode between canvas and svg
   */
  initOptions: object = { renderer: 'canvas' };

  xColumn: any = {};

  yColumns: any[] = [];

  categories: object[] = [];

  seriesData: object[] = [];

  options: any = {};

  get itemStyle() {
    const defaultItemStyle = {
      normal: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 1,
          y2: 0,
          colorStops: [
            {
              offset: 0,
              color: this.colorStart, // 0%
            },
            {
              offset: 1,
              color: this.colorEnd, // 100%
            },
          ],
        },
      },
    };

    if (this.chartType === 'x-bar') {
      defaultItemStyle.normal.color.x2 = 0;
      defaultItemStyle.normal.color.y2 = 1;
    }
    return defaultItemStyle;
  }

  @Watch('apiData', { immediate: true })
  onApiDataChanged() {
    if (!this.loading) {
      this.initChart();
    }
  }

  @Watch('colorStart')
  onColorStartChanged() {
    this.initChart();
  }

  @Watch('colorEnd')
  onColorEndChanged() {
    this.initChart();
  }

  @Watch('legend')
  onLegendChange(val: boolean) {
    this.chart.setOption({
      legend: {
        show: val,
      },
    });
  }

  handleChartClick(param: any) {
    // eslint-disable-next-line no-console
    console.log(this, param);
  }

  /**
   * echarts instance init event
   * @param {object} chart echartsInstance
   */
  chartInit(chart: any) {
    this.chart = chart;
    // must resize chart in nextTick
    this.$nextTick(() => {
      this.resizeChart();
    });
  }

  /**
   * emit chart component init event
   */
  emitInit() {
    // init chart
    this.chart = this.$refs.chart.chart;

    this.$emit('init', {
      chart: this.chart,
      chartData: this.apiData,
    });
  }

  /**
   * resize chart
   */
  resizeChart() {
    /* eslint-disable no-unused-expressions */
    this.chart && this.chart.resize();
  }

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

    this.yColumns.forEach((yColumn: any) => {
      const series: any[] = [];
      data.rows.forEach((row: any) => {
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
  }

  /**
   * create series array suit for echarts options
   * @param {string} type chart type
   * @param {string} name chart title
   * @param {Array} data chart data
   * @param {object} itemStyle chart item render style
   */
  static createEchartsSeriesItem(
    type: string,
    name: string,
    data: any[],
    itemStyle: any,
  ) {
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
  }

  /**
   * init chart
   */
  initChart() {
    this.convertData();
    this.options.series = [];
    let itemStyle: any;
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

    this.seriesData.forEach((data: any, index) => {
      const series = ChartMixin.createEchartsSeriesItem(
        this.chartType,
        this.yColumns[index].name,
        data,
        itemStyle,
      );
      this.options.series.push(series);
    });
  }

  async mounted() {
    this.emitInit();
  }
}
