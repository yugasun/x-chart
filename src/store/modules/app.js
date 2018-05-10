const app = {
  state: {
    theme: 0,
  },
  mutations: {
    UPDATE_THEME(state, payload) {
      state.pageId = payload.theme;
    },
  },
  actions: {
    updateTheme({ commit }, payload) {
      commit('UPDATE_THEME', payload);
    },
  },
};

export default app;
