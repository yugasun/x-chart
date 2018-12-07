<template>
    <div
        ref="container"
        class="slice-wrapper"
    >
        <header
            ref="header"
            class="card-header"
            :class="{center: item.chartType === 'x-number'}"
        >
            <span
                class="card-title"
                v-if="item.chartType !== 'x-number'"
            >{{ item.title }}</span>
            <div class="right-buttons">
                <legend-btn
                    class="x-btn"
                    v-if="canLegendType.indexOf(item.chartType) !== -1"
                    :legend.sync="legend"
                />
                <sync-btn
                    class="x-btn"
                    @sync="getData"
                    :white="item.chartType === 'x-number'"
                />
                <expand-btn
                    class="x-btn"
                    @expand="handleFocus"
                    :expand-target="item.i"
                    :white="item.chartType === 'x-number'"
                />
            </div>
        </header>
        <component
            :loading="loading"
            :is="ChartComponentMap[item.chartType]"
            :legend="legend"
            :api-data="apiData"
            :title="item.title"
            :colorStart="colorStart"
            :colorEnd="colorEnd"
            :width="item.width"
            :height="item.height"
            @init="chartInit"
        />
    </div>
</template>
<script lang="ts">
import ExpandBtn from '@/components/common/expand-btn.vue';
import LegendBtn from '@/components/common/legend-btn.vue';
import SyncBtn from '@/components/common/sync-btn.vue';

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

import { Vue, Component, Prop } from 'vue-property-decorator';

import { ApiData, ExpandPayload, ChartInitPayload } from '@/types/interfaces';

@Component({
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
})
export default class Slice extends Vue {
    @Prop({ default: {} })
    item!: any;

    @Prop({ default: '#7956EC' })
    colorStart!: string;

    @Prop({ default: '#3CECCF' })
    colorEnd!: string;

    loading: boolean = true;

    chart: any = null;

    chartData: ApiData = { columns: [], rows: [] };

    legend: boolean = true;

    // whether show legen
    apiData: any = null;

    ChartComponentMap: any = ChartComponentMap;

    canLegendType: string[] = [
      'x-line',
      'x-line-area',
      'x-bar',
      'x-hbar',
      'x-pie',
      'x-circle',
    ];

    async getData() {
      this.loading = true;
      try {
        const res = await this.$http.get('/chart_data', {
          sliceId: this.item.sliceId,
          chartType: this.item.chartType,
        });

        this.apiData = res.data;
      } catch (e) {
        console.error(e);
      }
      this.loading = false;
    }

    /**
     * handle focus click
     */
    handleFocus(payload: ExpandPayload) {
      this.$emit('expand', payload);
    }

    /**
     * chart initialed
     */
    chartInit(payload: ChartInitPayload) {
      this.chart = payload.chart;
      this.chartData = payload.chartData;
    }

    mounted() {
      this.getData();
    }
}
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
