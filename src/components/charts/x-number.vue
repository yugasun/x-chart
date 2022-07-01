<template>
    <XChart
        :options="options"
        :chart-type="chartType"
        :is-number="true"
        :title="title"
    />
</template>
<script lang="ts" setup>
import { ref } from 'vue';

withDefaults(
    defineProps<{
        title: string;
    }>(),
    {
        title: 'Cricle',
    },
);
const chartType = ref('x-number');

const options = ref({});
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
