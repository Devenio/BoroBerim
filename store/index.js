export const state = () => ({
  settings : {},
  vuexMenuState: false,
  vuexLogregState: false,
  vuexLogregMobileState: false,
  vuexProfileMenuState: false,
  vuexChackOutMenuState: false
});

export const getters = {
  settings(state) {
    return state.settings;
  },
  vuexMenuState(state) {
    return state.vuexMenuState
  },
  vuexLogregState(state) {
    return state.vuexLogregState
  },
  vuexLogregMobileState(state) {
    return state.vuexLogregMobileState
  },
  vuexProfileMenuState(state) {
    return state.vuexProfileMenuState
  },
  vuexChackOutMenuState(state) {
    return state.vuexChackOutMenuState
  }
};

export const mutations = {
  SET_SETTINGS(state,settings) {
    state.settings = settings;
  },
  SET_VUEX_MENU_STATE(state,vuexMenuState) {
    state.vuexMenuState = vuexMenuState;
  },
  SET_VUEX_LOGREG_STATE(state,vuexLogregState) {
    state.vuexLogregState = vuexLogregState;
  },
  SET_VUEX_LOGREG_MOBILE_STATE(state,vuexLogregMobileState) {
    state.vuexLogregMobileState = vuexLogregMobileState;
  },
  SET_VUEX_PROFILE_MENU_STATE(state,vuexProfileMenuState) {
    state.vuexProfileMenuState = vuexProfileMenuState;
  },
  SET_VUEX_CHECK_OUT_MENU_STATE(state,vuexChackOutMenuState) {
    state.vuexChackOutMenuState = vuexChackOutMenuState;
  },
};

export const actions = {
  async nuxtServerInit({commit}) {
    let settings = await this.$axios.get('api/v1/settings');
    commit("SET_SETTINGS",settings.data.data);
  },
  setVuexMenuState({commit},vuexMenuState) {
    commit('SET_VUEX_MENU_STATE',vuexMenuState);
  },
  setVuexLogregState({commit},vuexLogregState) {
    commit('SET_VUEX_LOGREG_STATE',vuexLogregState);
  },
  setVuexLogregMobileState({commit},vuexLogregMobileState) {
    commit('SET_VUEX_LOGREG_MOBILE_STATE',vuexLogregMobileState);
  },
  setVuexProfileMenuState({commit},vuexProfileMenuState) {
    commit('SET_VUEX_PROFILE_MENU_STATE',vuexProfileMenuState);
  },
  setVuexChackOutMenuState({commit},vuexChackOutMenuState) {
    commit('SET_VUEX_CHECK_OUT_MENU_STATE',vuexChackOutMenuState);
  }
};
