<template>
    <div class="x-legend" :class="{ disabled: disabled }" @click="syncData">
        <el-tooltip
            :content="disabled ? `Can Sync after ${count}s` : 'Sync Chart Data'"
            placement="top"
        >
            <i
                class="icon-sync"
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
const emit = defineEmits(['sync']);

const disabled = ref(false);

// sync interval is 3 second
const count = ref(3);
const timer = ref<number | NodeJS.Timer | null>(null);

function syncData() {
    if (disabled.value) {
        return;
    }
    emit('sync');
    disabled.value = true;
    timer.value = setInterval(() => {
        count.value -= 1;
        if (count.value === 0) {
            count.value = 3;
            disabled.value = false;
            clearInterval(timer.value as number);
            timer.value = null;
        }
    }, 1000);
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
