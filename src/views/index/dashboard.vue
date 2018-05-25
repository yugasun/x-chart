<template>
  <div
    class="dashboard"
    ref='dashboard'
    v-loading.fullscreen="loading"
    element-loading-text="Loading..."
    >
    <grid-layout
      :layout="slices"
      :col-num="gridColNum"
      :row-height="gridRowHeight"
      :is-draggable="gridDraggable"
      :is-resizable="gridResizable"
      :vertical-compact="true"
      :margin="gridMargin"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="item in slices"
        :key="item.slice_id"
        :x.sync="item.x"
        :y.sync="item.y"
        :w.sync="item.w"
        :h.sync="item.h"
        :i="item.i"
        :ref="item.i"
        :style="gridItemBackground(item.chart_type, colorStart, colorEnd)"
        dragIgnoreFrom=".echarts,.x-number,.card-title,.right-buttons"
        @init="initEvent"
        @resized="resizedEvent"
        @moved="movedEvent"
        class="chart-item"
        >
          <Slice
          @expand="handleFocus"
          :item="item"
          :colorStart="colorStart"
          :colorEnd="colorEnd"/>
      </grid-item>
    </grid-layout>

    <!-- focus mode mask -->
    <div class="grip-modal" v-show="showModal"></div>
  </div>
</template>

<script>
import { GridLayout, GridItem } from 'vue-grid-layout';
import Slice from '@/components/common/slice';

export default {
  name: 'Dashboard',
  props: {
    colorStart: {
      type: String,
      default: '#7956EC',
    },
    colorEnd: {
      type: String,
      default: '#3CECCF',
    },
  },
  data() {
    return {
      loading: false,
      showSavePopup: false,

      showModal: false,
      gridDraggable: true,
      gridResizable: true,
      gridColNum: 36,
      gridRowHeight: 10,
      gridMargin: [30, 30, 30, 30],
      cachePosition: {
        x: 0,
        y: 0,
        w: 0,
        h: 0,
      },

      /**
       * https://github.com/yugasun/vue-grid-layout/blob/a7d39f28425cee6a6176388daea40e8c8d9c4826/src/GridLayout.vue#L206-L208
       */
      layoutUpdating: false,
      slices: [], // charts modules
    };
  },
  components: {
    GridLayout,
    GridItem,
    Slice,
  },
  methods: {
    // create gradient background
    gridItemBackground(type, start, stop) {
      return (
        {
          background: type === 'x-number'
            ? `linear-gradient(to right, ${start}, ${stop})`
            : '#fff',
        }
      );
    },

    /** *
     * Get dashboard modules
     */
    async getDashboard() {
      this.loading = true;
      this.layoutUpdating = true;
      try {
        const res = await this.$http.get('/dashboard');
        this.slices = res.data.slices;
        this.loading = false;
      } catch (e) {
        console.log(e);
        this.loading = false;
      }
    },

    /**
     * Calculate popup slice position
     */
    calPopPosition(expandTarget) {
      // set popup number of columns
      const popW = 30;
      // set popup number of rows
      const popH = (popW * 9) / 16;
      // calculate real width for every column
      const colWidth = (expandTarget.$parent.width - (this.gridMargin[0] * (this.gridColNum + 1))) / this.gridColNum;
      // calculate real width for popup slice
      const width = Math.round((colWidth * popW) + (Math.max(0, popW - 1) * this.gridMargin[0]));
      // calculate real height for popup slice
      const height = Math.round((this.gridRowHeight * popH) + (Math.max(0, popH - 1) * this.gridMargin[1]));

      const winH = window.innerHeight;
      // calculate popup slice top
      const top = Math.round((winH - height) / 2) - this.$refs.dashboard.getBoundingClientRect().top;

      // height: Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
      // top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1])
      const popY = (top - this.gridMargin[1]) / (this.gridRowHeight + this.gridMargin[1]);
      const popX = (this.gridColNum - popW) / 2;
      return {
        popX,
        popY,
        popW,
        popH,
        width,
        height,
      };
    },
    /**
     * cache popup slice position
     */
    storePosition(item) {
      this.cachePosition = {
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        width: item.width,
        height: item.height,
      };
    },
    /**
     * restore popup slice position
     */
    restorePosition(item) {
      item.width = this.cachePosition.width;
      item.height = this.cachePosition.height;
      item.x = this.cachePosition.x;
      item.y = this.cachePosition.y;
      item.w = this.cachePosition.w;
      item.h = this.cachePosition.h;
      return item;
    },

    /**
     * go into focus mode
     */
    handleFocus({ expand, targetRef }) {
      const expandTarget = this.$refs[targetRef][0];
      if (expand) {
        this.gridDraggable = false;
        this.gridResizable = false;
        this.$nextTick(() => {
          expandTarget.$el.classList.add('popup');
          this.slices = this.slices.map((item) => {
            if (item.i === targetRef) {
              // 1. 记录当前位置信息
              this.storePosition(item);
              // 2. 计算专注模式位置参数
              const popPosition = this.calPopPosition(expandTarget);
              item.x = popPosition.popX;
              item.y = popPosition.popY;
              item.w = popPosition.popW;
              item.h = popPosition.popH;
              item.width = popPosition.width;
              item.height = popPosition.height;
            }
            return item;
          });
          this.showModal = true;
        });
      } else {
        this.gridDraggable = true;
        this.gridResizable = true;
        this.$nextTick(() => {
          this.slices = this.slices.map((item) => {
            if (item.i === targetRef) {
              item = this.restorePosition(item);
            }
            return item;
          });
          this.showModal = false;
          setTimeout(() => {
            expandTarget.$el.classList.remove('popup');
          }, 1000);
        });
      }
    },

    /**
     *
     * @param i the item id/index
     * @param H height in grid rows
     * @param W width in grid columns
     * @param HPx height in pixels
     * @param WPx width in pixels
     *
     */
    initEvent(i, H, W, HPx, WPx) {
      this.slices = this.slices.map((item) => {
        if (item.i === i) {
          item.width = WPx;
          item.height = HPx;
        }
        return item;
      });
    },

    /**
     * grid resized event
     * @param i the item id/index
     * @param newH new height in grid rows
     * @param newW new width in grid columns
     * @param newHPx new height in pixels
     * @param newWPx new width in pixels
     *
     */
    resizedEvent(i, newH, newW, newHPx, newWPx) {
      this.slices = this.slices.map((item) => {
        if (item.i === i) {
          item.width = newWPx;
          item.height = newHPx;
        }
        return item;
      });
      console.log('resizedEvent');
      this.showSavePopup = true;
    },

    /**
     * grid moved event
     * @param i the item id/index
     * @param newX new x in grid rows
     * @param newY new y in grid columns
     *
     */
    movedEvent(i, newX, newY) {
      console.log('movedEvent');
      this.showSavePopup = true;
    },
  },
  created() {
    this.getDashboard();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dashboard {
  width: 100%;
  // height: 100%;
  min-height: 800px;
}
.grid {
  position: relative;
}
.grip-modal {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  z-index: 50;
  background-color: rgba(0, 0, 0, 0.5);
}
.chart-item {
  z-index: 5;
  display: block;
  border-radius: 6px;
  background-color: #fff;
  color: black;
  box-shadow: 0 0 40px rgba(226, 226, 226, 0.5);
  // overflow: hidden;
  padding: 15px;
  box-sizing: border-box;

  &.cssTransforms {
    transition: all 200ms ease;
    transition-property: box-shadow, transform;
  }

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  &.popup {
    position: absolute !important;
    z-index: 100;
  }
}
</style>
