<template>
  <div ref="container" class="slice-wrapper">
    <header ref="header" class="card-header" :class="{center: item.chart_type === 'x-number'}">
      <span class="card-title" v-if="item.chart_type !== 'x-number'">{{ item.title }}</span>
      <div class="right-buttons">
        <legend-btn
          class="x-btn"
          v-if="canLegendType.indexOf(item.chart_type) !== -1"
          :legend.sync="legend"
          />
        <sync-btn
          class="x-btn"
          @sync="getData"
          :white="item.chart_type === 'x-number'"/>
        <expand-btn
          class="x-btn"
          @expand="handleFocus"
          :expand-target="item.i"
          :white="item.chart_type === 'x-number'"/>
      </div>
    </header>
    <component
      :loading="loading"
      :is="ChartComponentMap[item.chart_type]"
      :legend="legend"
      :api-data="apiData"
      :title="item.title"
      :colorStart="colorStart"
      :colorEnd="colorEnd"
      @init="chartInit"
      />
  </div>
</template>
<script>
import ExpandBtn from '@/components/common/expand-btn';
import LegendBtn from '@/components/common/legend-btn';
import SyncBtn from '@/components/common/sync-btn';

import {
  XLine,
  XLineArea,
  XBar,
  XHbar,
  XPie,
  XCircle,
  XNumber,
} from '@/components/charts';

import ChartComponentMap from '@/config/chart-component-map';

export default {
  name: 'Slice',
  props: {
    item: {
      type: Object,
      default() {
        return {};
      },
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
      loading: true,
      chart: null,
      chartData: {},

      legend: true, // whether show legend

      apiData: null,
      ChartComponentMap,

      canLegendType: ['x-line', 'x-line-area', 'x-bar', 'x-hbar', 'x-pie', 'x-circle'],
    };
  },
  components: {
    XLine,
    XLineArea,
    XBar,
    XHbar,
    XPie,
    XCircle,
    XNumber,
    ExpandBtn,
    LegendBtn,
    SyncBtn,
  },
  methods: {
    async getData() {
      this.loading = true;
      try {
        const res = await this.$http.get('/chart_data', {
          slice_id: this.item.slice_id,
          chart_type: this.item.chart_type,
        });
        this.apiData = res.data;
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    },

    /**
     * handle focus click
     */
    handleFocus(payload) {
      this.$emit('expand', payload);
    },

    /**
     * chart initialed
     */
    chartInit({ chart, chartData }) {
      this.chart = chart;
      this.chartData = chartData;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style lang="scss" scoped>
.slice-wrapper {
  width: 100%;
  height: 100%;
}
.card-header {
  font-size: 16px;
  color: #4d4d4d;
  height: 30px;
  line-height: 30px;
  text-align: left;
  position: relative;
  padding: 0 5px;
  &.center {
    text-align: center;
  }

  .right-buttons {
    // width: 60px;
    height: 30px;
    float: right;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    text-align: right;

    .x-btn {
      width: 20px;
    }
  }
}
</style>

