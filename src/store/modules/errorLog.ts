import { ActionTree, MutationTree } from 'vuex';
import { ErrorLogState } from '@/types/interfaces';

const ErrorState: ErrorLogState = {
  logs: [],
};

const mutations: MutationTree<any> = {
  ADD_ERROR_LOG: (state: ErrorLogState, log) => {
    state.logs.push(log);
  },
};

const actions: ActionTree<any, any> = {
  addErrorLog({ commit }, log) {
    commit('ADD_ERROR_LOG', log);
  },
};

export default {
  state: ErrorState,
  mutations,
  actions,
};
