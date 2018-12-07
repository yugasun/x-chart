<template>
    <div
        class="x-number"
        :style="style"
    >
        <h3 class="title">{{ title }}</h3>
        <span class="number">{{ loading ? 'Loading...' : number }}</span>
        <span class="unit">{{ unit }}</span>
    </div>
</template>
<script lang="ts">
import ChartMixin from '@/components/mixins/chart-mixin';
import { mixins } from 'vue-class-component';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class XNumber extends mixins(ChartMixin) {
    @Prop({ required: true })
    height!: any;

    chartType: string = 'x-number';

    number: any = '';

    unit: any = '';

    get style() {
      return {
        fontSize: `${((this.height - 60) / 160) * 16}px`,
        height: `${this.height - 60}px`,
      };
    }

    initChart() {
      this.convertData();
      this.number = this.apiData.rows[0][this.yColumns[0].field];
      this.unit = this.yColumns[0].unit;
    }
}
</script>
<style lang="scss" scoped>
.x-number {
    width: 100%;
    height: 100%;
    color: #fff;
    font-size: 16px;
    overflow: hidden;

    .title {
        font-size: 1.2em;
        margin: 5% auto;
    }

    .number {
        line-height: 2;
        font-size: 3em;
    }
    .unit {
        margin-left: 10px;
        font-size: 1em;
    }
}
</style>
