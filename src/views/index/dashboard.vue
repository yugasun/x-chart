<template>
    <div
        ref="dashboardRef"
        v-loading.fullscreen="loading"
        class="dashboard"
        element-loading-text="Loading..."
    >
        <grid-layout
            :layout="slices"
            :col-num="gridColNum"
            :row-height="gridRowHeight"
            :is-draggable="isDraggable"
            :is-resizable="true"
            :vertical-compact="true"
            :margin="gridMargin"
            :use-css-transforms="true"
            :responsive="false"
        >
            <grid-item
                v-for="item in slices"
                :key="item.sliceId"
                v-model:layout="slices"
                v-model:x="item.x"
                v-model:y="item.y"
                v-model:w="item.w"
                v-model:h="item.h"
                :data-id="item.sliceId"
                :i="item.i"
                :static="!!item.static"
                :style="
                    gridItemBackground(item.chartType, colors.start, colors.end)
                "
                class=""
                :class="`chart-item ${item.popup ? 'popup' : ''}`"
                drag-allow-from=".card-header"
                @init="initEvent"
                @resized="resizedEvent"
                @moved="movedEvent"
            >
                <Slice :item="item" @expand="handleFocus" />
            </grid-item>
        </grid-layout>

        <!-- focus mode mask -->
        <div v-show="showModal" class="grip-modal"></div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, nextTick, computed } from 'vue';

import { useAppStore } from '@/store/app';
import API from '@/api';

import { ExpandPayload, SliceItem } from '@/types/interfaces';

import Slice from '@/components/common/slice.vue';

const appStore = useAppStore();

const colors = computed(() => appStore.colors);

const dashboardRef = ref<HTMLElement | null>(null);
const loading = ref(false);
const showSavePopup = ref(false);
const showModal = ref(false);
const isDraggable = ref(true);
const isResizable = ref(true);
const gridColNum = ref(36);
const gridRowHeight = ref(10);
const gridMargin = ref([30, 30, 30, 30]);
const cachePosition = reactive({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    width: 0,
    height: 0,
});
const layoutUpdating = ref(false);
const slices = ref<SliceItem[]>([]);

// create gradient background
function gridItemBackground(type: string, start: string, stop: string) {
    return {
        background:
            type === 'x-number'
                ? `linear-gradient(to right, ${start}, ${stop})`
                : '#fff',
    };
}

/** *
 * Get dashboard modules
 */
async function getDashboard() {
    loading.value = true;
    layoutUpdating.value = true;
    try {
        const res = await API.getConfig();
        slices.value = res.data.slices;
        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

/**
 * Calculate popup slice position
 */
function calPopPosition(forcusTarget: HTMLElement) {
    // set popup number of columns
    const popW = 30;
    // set popup number of rows
    const popH = (popW * 9) / 16;
    // calculate real width for every column
    const parentEleWith = forcusTarget.parentElement?.offsetWidth || 0;
    const colWidth =
        (parentEleWith - gridMargin.value[0] * (gridColNum.value + 1)) /
        gridColNum.value;
    // calculate real width for popup slice
    const width = Math.round(
        colWidth * popW + Math.max(0, popW - 1) * gridMargin.value[0],
    );
    // calculate real height for popup slice
    const height = Math.round(
        gridRowHeight.value * popH +
            Math.max(0, popH - 1) * gridMargin.value[1],
    );

    const winH = window.innerHeight;
    // calculate popup slice top
    const top =
        Math.round((winH - height) / 2) -
        dashboardRef.value!.getBoundingClientRect().top;

    // height: Math.round(this.rowHeight * h + Math.max(0, h - 1) * this.margin[1])
    // top: Math.round(this.rowHeight * y + (y + 1) * this.margin[1])
    const popY =
        (top - gridMargin.value[1]) /
        (gridRowHeight.value + gridMargin.value[1]);
    const popX = (gridColNum.value - popW) / 2;
    return {
        popX,
        popY,
        popW,
        popH,
        width,
        height,
    };
}

/**
 * cache popup slice position
 */
function storePosition(item: SliceItem) {
    cachePosition.x = item.x;
    cachePosition.y = item.y;
    cachePosition.w = item.w;
    cachePosition.h = item.h;
    cachePosition.width = item.width;
    cachePosition.height = item.height;
}

/**
 * restore popup slice position
 */
function restorePosition(item: SliceItem) {
    item.width = cachePosition.width;
    item.height = cachePosition.height;
    item.x = cachePosition.x;
    item.y = cachePosition.y;
    item.w = cachePosition.w;
    item.h = cachePosition.h;
    return item;
}

/**
 * go into focus mode
 */
function handleFocus({ expand, targetId }: ExpandPayload) {
    // mark all static
    const gridItems = document.querySelectorAll('.chart-item');
    const [forcusTarget] = Array.prototype.slice
        .call(gridItems, 0)
        .filter((item: HTMLElement) => {
            const id = item.getAttribute('data-id');
            return id && +id === targetId;
        });
    if (expand) {
        isDraggable.value = false;
        isResizable.value = false;
        nextTick(() => {
            slices.value = slices.value.map((item: SliceItem) => {
                item.static = true;
                if (item.sliceId === targetId) {
                    item.popup = true;
                    // 1. 记录当前位置信息
                    storePosition(item);
                    // 2. 计算专注模式位置参数
                    const popPosition = calPopPosition(forcusTarget);
                    item.x = popPosition.popX;
                    item.y = popPosition.popY;
                    item.w = popPosition.popW;
                    item.h = popPosition.popH;
                    item.width = popPosition.width;
                    item.height = popPosition.height;
                }
                return item;
            });
            showModal.value = true;
        });
    } else {
        isDraggable.value = true;
        isResizable.value = true;
        nextTick(() => {
            slices.value = slices.value.map((item: SliceItem) => {
                item.static = false;
                item.popup = false;
                if (item.sliceId === targetId) {
                    item = restorePosition(item);
                }
                return item;
            });
            showModal.value = false;
            setTimeout(() => {
                forcusTarget.classList.remove('popup');
            }, 1000);
        });
    }
}

/**
 *
 * @param i the item id/index
 * @param H height in grid rows
 * @param W width in grid columns
 * @param HPx height in pixels
 * @param WPx width in pixels
 *
 */
function initEvent(i: string, H: number, W: number, HPx: number, WPx: number) {
    slices.value = slices.value.map((item: SliceItem) => {
        if (item.i === i) {
            item.width = WPx;
            item.height = HPx;
        }
        return item;
    });
}

/**
 * grid resized event
 * @param i the item id/index
 * @param newH new height in grid rows
 * @param newW new width in grid columns
 * @param newHPx new height in pixels
 * @param newWPx new width in pixels
 *
 */
function resizedEvent(
    i: string,
    newH: number,
    newW: number,
    newHPx: number,
    newWPx: number,
) {
    slices.value = slices.value.map((item: SliceItem) => {
        if (item.i === i) {
            item.width = newWPx;
            item.height = newHPx;
        }
        return item;
    });
    console.log('resizedEvent');
    showSavePopup.value = true;
}

/**
 * grid moved event
 * @param i the item id/index
 * @param newX new x in grid rows
 * @param newY new y in grid columns
 *
 */
function movedEvent(i: string, newX: number, newY: number) {
    console.log('movedEvent');
    showSavePopup.value = true;
}

onMounted(() => {
    getDashboard();
});
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
