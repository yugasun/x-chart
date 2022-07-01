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
        title: 'Cricle',
    },
);

const chartType = ref('x-line-area');

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
        confine: true,
        // backgroundColor: 'rgba(4,29,49,0.6)'
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
            type: 'category',
            axisLine: {
                lineStyle: {
                    color: '#9FA9BB',
                },
            },
            data: [],
            axisLabel: {
                rotate: 75,
                showMaxLabel: true,
                formatter(params: string) {
                    return cutStr(params, 5);
                },
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#9FA9BB',
                },
            },
        },
    ],
    series: [],
});
</script>
<style lang="scss" scoped></style>
