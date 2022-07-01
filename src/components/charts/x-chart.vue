<script lang="ts" setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue';
import { ECBasicOption } from 'echarts/types/dist/shared';
import { ApiData, ChartInstance } from '@/types/interfaces';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const colors = computed(() => appStore.colors);
const emit = defineEmits(['init']);

const props = withDefaults(
    defineProps<{
        isNumber?: boolean;
        chartType: string;
        options: ECBasicOption;
        loading: boolean;
        legend: boolean;
        apiData: ApiData;
        title: string;
        height: number;
        /**
         * whether has axis,
         * for pie,relation chart need set false
         */
        hasAxis: boolean;
    }>(),
    {
        isNumber: false,
        chartType: 'x-bar',
        loading: true,
        legend: true,
        apiData: { columns: [], rows: [] } as any,
        title: '',
        hasAxis: true,
    },
);

const chartOptions = ref<any>(props.options);
const chartRef = ref<HTMLDivElement | null>(null);

const chart = ref<ChartInstance>({
    setOption() {
        // noop
    },
    resize() {
        // noop
    },
});

// render direction
const direction = ref<string>('vertical');

/**
 * init options for vue-echarts
 * switch render mode between canvas and svg
 */
const initOptions = ref<object>({ renderer: 'canvas' });

const xColumn = ref<any>({});

const yColumns = ref<any[]>([]);

const categories = ref<object[]>([]);

const seriesData = ref<object[]>([]);

const number = ref<string>('');
const unit = ref<string>('');
const style = computed(() => {
    return {
        fontSize: `${((props.height - 60) / 160) * 16}px`,
        height: `${props.height - 60}px`,
    };
});

const primaryItemStyle = computed(() => {
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
                        color: colors.value.start, // 0%
                    },
                    {
                        offset: 1,
                        color: colors.value.end, // 100%
                    },
                ],
            },
        },
    };

    if (props.chartType === 'x-bar') {
        defaultItemStyle.normal.color.x2 = 0;
        defaultItemStyle.normal.color.y2 = 1;
    }
    return defaultItemStyle;
});

function handleChartClick(param: any) {
    // eslint-disable-next-line no-console
    console.log(chartRef, param);
}

/**
 * resize chart
 */
function resizeChart() {
    /* eslint-disable no-unused-expressions */
    chart.value?.resize();
}

/**
 * echarts instance init event
 * @param {object} chart echartsInstance
 */
function chartInit(ct: any) {
    chart.value = ct;
    // must resize chart in nextTick
    nextTick(() => {
        resizeChart();
    });
}

/**
 * emit chart component init event
 */
function emitInit() {
    // eslint-disable-next-line
    chart.value = (chartRef.value as any)?.chart;

    emit('init', {
        chart: chart.value,
        chartData: props.apiData,
    });
}

/**
 * convert to echarts option format
 */
function convertData() {
    yColumns.value = [];
    categories.value = [];
    seriesData.value = [];
    props.apiData.columns.forEach((item) => {
        if (item.type === 'x') {
            xColumn.value = item;
        }
        if (item.type === 'y') {
            yColumns.value.push(item);
        }
    });

    const data = props.apiData;

    yColumns.value.forEach((yColumn: any) => {
        const series: any[] = [];
        data.rows.forEach((row: any) => {
            if (xColumn.value && xColumn.value.field) {
                if (categories.value.length < data.rows.length) {
                    categories.value.push(row[xColumn.value.field]);
                }
            }
            if (yColumn && yColumn.field) {
                series.push({
                    ...{
                        name: row[xColumn.value.field],
                        value: row[yColumn.field],
                    },
                    ...row,
                });
            }
        });
        seriesData.value.push(series);
    });
}

/**
 * create series array suit for echarts options
 * @param {string} type chart type
 * @param {string} name chart title
 * @param {Array} data chart data
 * @param {object} itemStyle chart item render style
 */
function createEchartsSeriesItem(
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
function initChart() {
    convertData();

    // if is number card
    if (props.isNumber) {
        number.value = props.apiData.rows[0][yColumns.value[0].field];
        unit.value = yColumns.value[0].unit;

        return;
    }
    chartOptions.value.series = [];
    let itemStyle: any;
    if (props.hasAxis) {
        if (direction.value === 'horizontal') {
            chartOptions.value.yAxis[0].data = categories.value;
        } else {
            chartOptions.value.xAxis[0].data = categories.value;
        }
        // set gradient for single measure
        itemStyle = seriesData.value.length > 1 ? {} : primaryItemStyle.value;
    } else {
        itemStyle = {};
    }

    seriesData.value.forEach((data: any, index) => {
        const series = createEchartsSeriesItem(
            props.chartType,
            yColumns.value[index].name,
            data,
            itemStyle,
        );
        chartOptions.value.series.push(series);
    });
}

watch(
    () => props.apiData,
    () => {
        if (!props.loading) {
            initChart();
        }
    },
);

watch(
    () => colors.value.start,
    () => {
        initChart();
    },
);

watch(
    () => colors.value.end,
    () => {
        initChart();
    },
);

watch(
    () => props.legend,
    (val) => {
        chart.value.setOption({
            legend: {
                show: val,
            },
        });
    },
);

onMounted(() => {
    emitInit();
});
</script>
<template>
    <Echarts
        v-if="!isNumber"
        ref="chart"
        v-loading="loading"
        element-loading-text="Loading..."
        class="chart"
        :autoresize="true"
        :init-options="initOptions"
        :option="chartOptions"
        theme="default"
        @click="handleChartClick"
        @init="chartInit"
    />
    <div v-else class="x-number" :style="style">
        <h3 class="title">{{ title }}</h3>
        <span class="number">{{ loading ? 'Loading...' : number }}</span>
        <span class="unit">{{ unit }}</span>
    </div>
</template>
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
