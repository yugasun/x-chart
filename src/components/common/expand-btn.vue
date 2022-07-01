<template>
    <div class="x-expand" @click="expandClick">
        <el-tooltip
            :content="expanded ? 'Exit focus mode' : 'Into focus mode'"
            placement="top"
        >
            <i
                class="icon"
                :class="{
                    'icon-fullscreen': !expanded,
                    'icon-fullscreen-exit': expanded,
                }"
                :style="{ color: white ? '#fff' : '#888' }"
            ></i>
        </el-tooltip>
    </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
withDefaults(
    defineProps<{
        white: boolean;
    }>(),
    {
        white: false,
    },
);
const emit = defineEmits(['expand']);

const expanded = ref(false);

function expandClick() {
    expanded.value = !expanded.value;
    emit('expand', expanded.value);
}
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
