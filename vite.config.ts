import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as path from 'path';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import replace from '@rollup/plugin-replace';

const pwaOptions: Partial<VitePWAOptions> = {
    mode: 'development',
    base: '/',
    includeAssets: ['favicon.svg'],
    manifest: {
        name: 'X-Chart',
        short_name: 'x-chart',
        theme_color: '#ffffff',
        icons: [
            {
                src: 'pwa-192x192.png', // <== don't add slash, for testing
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/pwa-512x512.png', // <== don't remove slash, for testing
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: 'pwa-512x512.png', // <== don't add slash, for testing
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable',
            },
        ],
    },
    devOptions: {
        enabled: process.env.SW_DEV === 'true',
        /* when using generateSW the PWA plugin will switch to classic */
        type: 'module',
        navigateFallback: 'index.html',
    },
};

const replaceOptions = {
    __DATE__: new Date().toISOString(),
    __RELOAD_SW__: '',
};
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';

if (process.env.SW === 'true') {
    pwaOptions.srcDir = 'src';
    pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
    pwaOptions.strategies = 'injectManifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).name =
        'PWA Inject Manifest';
    (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';

if (reload) {
    replaceOptions.__RELOAD_SW__ = 'true';
}

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        dedupe: ['vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/assets/styles/element/index.scss" as *;`,
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),
        VitePWA(pwaOptions),
        replace(replaceOptions),
    ],
    server: {
        port: 8080,
        hmr: {
            host: '127.0.0.1',
            port: 8080,
        },
    },
});
