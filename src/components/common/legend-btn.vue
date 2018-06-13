<template>
  <el-tooltip :content="`${legend ? 'Hide' : 'Show'} legend`" placement="top">
    <div class="x-legend" @click="switchLegend">
      <i :class="legend ? 'icon-smile' : 'icon-frown'"></i>
    </div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'legend-btn',
  props: {
    legend: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    switchLegend() {
      this.$emit('update:legend', !this.legend);
    },
  },
};
</script>
<style lang="scss" scoped>
.x-legend {
  color: #888888;

  &:hover {
    cursor: pointer;
    opacity: .8;
  }
}
</style>

