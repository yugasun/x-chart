<template>
    <XChart
        :options="options"
        :chart-type="chartType"
        :title="title"
        :has-axis="false"
    />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const props = withDefaults(
    defineProps<{
        title: string;
    }>(),
    {
        title: 'Cricle',
    },
);

const chartType = ref('x-circle');

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
        confine: true,
        // backgroundColor: 'rgba(4,29,49,0.6)'
    },
    grid: {
        show: false,
        top: 40,
        left: 20,
        right: 20,
        bottom: 10,
        containLabel: true,
    },
    series: [],
});
</script>
<style lang="scss" scoped></style>
