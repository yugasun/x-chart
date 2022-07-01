<template>
    <XChart :options="options" :chart-type="chartType" :title="title" />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { cutStr } from '@/utils/index';

const props = withDefaults(
    defineProps<{
        title: string;
    }>(),
    {
        title: 'HBar',
    },
);

const chartType = ref('x-hbar');
const direction = ref('horizontal');

const options = ref({
    title: {
        show: false,
        text: props.title,
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
        axisPointer: {
            type: 'line',
        },
    },
    grid: {
        show: true,
        top: 40,
        left: 20,
        right: 20,
        bottom: 10,
        containLabel: true,
    },
    xAxis: [
        {
            type: 'value',
            position: 'top',
            axisLine: {
                lineStyle: {
                    color: '#9FA9BB',
                },
            },
        },
    ],
    yAxis: [
        {
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#9FA9BB',
                },
            },
            inverse: true,
            data: [],
            axisLabel: {
                rotate: 0,
                showMaxLabel: true,
                formatter(params: string) {
                    return cutStr(params, 5);
                },
            },
        },
    ],
    series: [],
});
</script>
<style lang="scss" scoped></style>
