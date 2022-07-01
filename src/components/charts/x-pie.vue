<template>
    <XChart
        :options="options"
        :chart-type="chartType"
        :has-axis="false"
        :title="title"
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

const chartType = ref('x-pie');
const hasAxis = ref(false);

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
        left: 20,
        right: 20,
        bottom: 40,
        containLabel: true,
    },
    series: [],
});
</script>
<style lang="scss" scoped></style>
