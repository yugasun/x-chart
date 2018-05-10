<template>
  <div class="x-expand" @click="expandClick">
    <el-tooltip :content="expanded ? '点击退出专注模式' : '点击进入专注模式'" placement="top">
      <i class="icon" :class="{'ion-arrow-expand': !expanded, 'ion-arrow-shrink': expanded}" :style="{color: white ?  '#fff' : '#888'}"></i>
    </el-tooltip>
  </div>
</template>
<script>
export default {
  name: 'ExpandBtn',
  props: {
    white: {
      type: Boolean,
      default: false,
    },
    expandTarget: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      expanded: false,
    };
  },
  methods: {
    expandClick() {
      this.expanded = !this.expanded;
      this.$parent.$emit('expand', {
        expand: this.expanded,
        targetRef: this.expandTarget,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.x-expand {
  z-index: 1000;
  color: #888888;
  &:hover {
    cursor: pointer;
  }

  .icon {
    width: 12px;
    height: 12px;
  }
}
</style>

