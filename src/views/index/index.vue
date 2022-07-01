<template>
    <div class="wrapper index-page">
        <h1>x-chart</h1>

        <div class="select-wrapper">
            <!-- Theme select -->
            <el-select
                v-model="colorIndex"
                placeholder="Please select color"
                @change="onThemeChange"
            >
                <el-option
                    v-for="(t, index) in colors"
                    :key="index"
                    :value="index"
                    :label="t.name"
                    :style="{
                        color: 'white',
                        background: `linear-gradient(to right, ${t.start}, ${t.end})`,
                    }"
                />
            </el-select>
        </div>

        <Dashboard />
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Dashboard from '@/views/index/dashboard.vue';
import colors from '@/config/colors';
import { useAppStore } from '@/store/app';

const appStore = useAppStore();
const colorIndex = ref(0);

function onThemeChange(val: string) {
    appStore.updateTheme(+val);
}
</script>

<style lang="scss" scoped>
.logo {
    width: 100px;
}
.select-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 15px;

    // :deep(.el-input__wrapper) {
    //     background: none;
    // }
    // :deep(.el-input__inner) {
    //     color: white;
    // }
}
</style>
