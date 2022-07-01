import { defineStore } from 'pinia';
import Themes from '@/config/colors';

interface AppState {
    theme: number;
}

export const useAppStore = defineStore({
    id: 'app',
    state(): AppState {
        return {
            theme: 0,
        };
    },

    getters: {
        colors: (state: AppState) : Record<string, any> => Themes[state.theme],
    },

    actions: {
        updateTheme(theme: number) {
            this.theme = theme;
        },
    },
});
