<template>
    <div ref="container" class="slice-wrapper">
        <header
            ref="header"
            class="card-header"
            :class="{ center: item.chartType === 'x-number' }"
        >
            <span class="card-title" v-if="item.chartType !== 'x-number'">{{
                item.title
            }}</span>
            <div class="right-buttons">
                <legend-btn
                    v-if="canLegendType.indexOf(item.chartType) !== -1"
                    v-model:legend="legend"
                    class="x-btn"
                />
                <sync-btn
                    class="x-btn"
                    :white="item.chartType === 'x-number'"
                    @sync="getData"
                />
                <expand-btn
                    class="x-btn"
                    :white="item.chartType === 'x-number'"
                    @expand="handleFocus"
                />
            </div>
        </header>
        <component
            :is="chartComponentMap[item.chartType]"
            :loading="loading"
            :legend="legend"
            :api-data="apiData"
            :title="item.title"
            :width="item.width"
            :height="item.height"
            @init="chartInit"
        />
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import API from '@/api';
import ExpandBtn from '@/components/common/expand-btn.vue';
import LegendBtn from '@/components/common/legend-btn.vue';
import SyncBtn from '@/components/common/sync-btn.vue';

import ChartComponentMap from '@/config/chart-component-map';

import { ApiData, ChartInitPayload, SliceItem } from '@/types/interfaces';

const props = defineProps<{
    item: SliceItem;
}>();
const emit = defineEmits(['expand']);

const loading = ref(true);
const chart = ref(null);
const legend = ref(true);
// const chartData = ref<ApiData>({ columns: [], rows: [] });
const apiData = ref<ApiData | null>(null);
const chartComponentMap = ref(ChartComponentMap);
const canLegendType = ref([
    'x-line',
    'x-line-area',
    'x-bar',
    'x-hbar',
    'x-pie',
    'x-circle',
]);

async function getData() {
    loading.value = true;
    try {
        const result = await API.getChartData({
            sliceId: props.item.sliceId,
            chartType: props.item.chartType,
        });
        apiData.value = result.data;
    } catch (e) {
        console.error(e);
    }
    loading.value = false;
}

/**
 * handle focus click
 */
function handleFocus(val: boolean) {
    emit('expand', {
        expand: val,
        targetId: props.item.sliceId,
    });
}

/**
 * chart initialed
 */
function chartInit(payload: ChartInitPayload) {
    chart.value = payload.chart;
}

onMounted(() => {
    getData();
});
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
