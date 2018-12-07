<template>
    <el-tooltip
        :content="disabled ? `Can Sync after ${count}s` : 'Sync Chart Data'"
        placement="top"
    >
        <div
            class="x-legend"
            :class="{disabled: disabled}"
            @click="syncData"
        >
            <i
                class="icon-sync"
                :style="{color: white ?  '#fff' : '#888'}"
            ></i>
        </div>
    </el-tooltip>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component
export default class SyncBtn extends Vue {
    @Prop({ default: false })
    white!: boolean;

    disabled: boolean = false;

    // sync interval is 3 second
    count: any = 3;

    timer: any = null;

    syncData() {
      if (this.disabled) {
        return;
      }
      this.$emit('sync');
      this.disabled = true;
      this.timer = setInterval(() => {
        this.count -= 1;
        if (this.count === 0) {
          this.count = 3;
          this.disabled = false;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
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

    &.disabled {
        &:hover {
            cursor: not-allowed;
        }
    }
}
</style>
