import Vue from 'vue';
import Vuex from 'vuex';

import app from '@/store/modules/app';
import errorLog from '@/store/modules/errorLog';
import getters from '@/store/getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    errorLog,
  },
  getters,
});
