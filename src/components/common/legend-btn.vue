<template>
    <div class="x-legend" @click="switchLegend">
        <el-tooltip
            :content="`${legend ? 'Hide' : 'Show'} legend`"
            placement="top"
        >
            <i :class="legend ? 'icon-smile' : 'icon-frown'"></i>
        </el-tooltip>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        legend: boolean;
    }>(),
    {
        legend: true,
    },
);
const emit = defineEmits(['update:legend']);

function switchLegend() {
    emit('update:legend', !props.legend);
}
</script>
<style lang="scss" scoped>
.x-legend {
    color: #888888;

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
}
</style>
