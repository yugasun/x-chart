<template>
    <el-tooltip
        :content="`${legend ? 'Hide' : 'Show'} legend`"
        placement="top"
    >
        <div
            class="x-legend"
            @click="switchLegend"
        >
            <i :class="legend ? 'icon-smile' : 'icon-frown'"></i>
        </div>
    </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class LegentBtn extends Vue {
    @Prop({ default: true })
    legend!: boolean;

    switchLegend() {
      this.$emit('update:legend', !this.legend);
    }
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
