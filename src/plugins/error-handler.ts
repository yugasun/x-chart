import { App, nextTick } from 'vue';
import { useErrorStore } from '@/store/error';

export const ErrorHandler = {
    install: (app: App) => {
        app.config.errorHandler = (err: any, vm, info) => {
            nextTick(() => {
                const errorStore = useErrorStore();
                errorStore.addLog({
                    err,
                    vm,
                    info,
                    url: window.location.href,
                });
            });
        };
    },
};
