import { defineStore } from 'pinia';

interface ErrorState {
    logs: any[];
}

export const useErrorStore = defineStore({
    id: 'error',
    state(): ErrorState {
        return {
            logs: [],
        };
    },
    actions: {
        addLog(log: any) {
            this.logs.push(log);
        },
    },
});
