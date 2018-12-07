import { ActionTree, MutationTree } from 'vuex';

import { AppState, ThemePayload } from '@/types/interfaces';

const appState: AppState = {
  theme: 0,
  pageId: 0,
};

const mutations: MutationTree<any> = {
  UPDATE_THEME(state: AppState, payload: ThemePayload): void {
    state.pageId = payload.theme;
  },
};

const actions: ActionTree<any, any> = {
  updateTheme({ commit }, payload: ThemePayload) {
    commit('UPDATE_THEME', payload);
  },
};

export default {
  state: appState,
  mutations,
  actions,
};
