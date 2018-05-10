<template>
  <div ref="container" class="slice-wrapper">
    <header ref="header" class="card-header" :class="{center: item.chart_type === 'x-number'}">
      <span class="card-title" v-if="item.chart_type !== 'x-number'">{{ item.title }}</span>
      <div class="right-buttons">
        <ExpandBtn
          class="x-btn"
          @expand="handleFocus"
          :expand-target="item.i"
          :white="item.chart_type === 'x-number'"/>
      </div>
    </header>
    <component
      :loading="loading"
      :is="ChartComponentMap[item.chart_type]"
      :width="item.width"
      :height="item.height"
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

      apiData: null,
      ChartComponentMap,
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
  },
  methods: {
    /**
     * 获取图形数据
     * @param {boolean} zoom 是否下钻
     */
    async getData(zoom = false) {
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
     * 点击聚焦模式
     */
    handleFocus(payload) {
      this.$emit('expand', payload);
    },

    /**
     * 图形初始化
     */
    chartInit({ chart, chartData }) {
      this.chart = chart;
      this.chartData = chartData;
    },
  },
  mounted() {
    this.getData(false);
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

