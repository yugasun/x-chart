<script lang="ts" setup>
import { useTimeAgo } from '@vueuse/core';
import ReloadPrompt from '@/pwa/ReloadPrompt.vue';
import Footer from '@/components/footer.vue';

const date = '__DATE__';
const timeAgo = useTimeAgo(date);
</script>

<template>
    <div id="app">
        <router-view />
        <br />
        <div class="build-time">Built at: {{ date }} ({{ timeAgo }})</div>
        <Footer />
        <ReloadPrompt />
    </div>
</template>
<style lang="scss" scoped>
.build-time {
    color: #999;
}
</style>
