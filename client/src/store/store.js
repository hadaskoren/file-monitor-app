'use strict';

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    username: ''
  },
  mutations: {
    updateUsername(state, payload) {
      state.username = payload;
    }
  },
  actions: {
    updateUsername({commit}, payload) {
      commit('updateUsername', payload);
    }
  }
});
