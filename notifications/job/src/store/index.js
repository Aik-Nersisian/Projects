import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    newNotificationsCount: 0,
    newNotifications: null,
    oldNotifications: null,
    loading: false,
  },
  getters: {
    newNotificationsCount: (state) => {
      return state.newNotificationsCount;
    },
    newNotifications: (state) => {
      return state.newNotifications;
    },

    oldNotifications: (state) => {
      return state.oldNotifications;
    },
    loading: (state) => {
      return state.loading;
    },
  },
  mutations: {
    changeNewNotificationsCount: (state, payload) => {
      state.newNotificationsCount = payload;
    },
    addNewNotifications: (state, payload) => {
      state.newNotifications = payload;
    },
    addOldNotifications: (state, payload) => {
      state.oldNotifications = payload;
    },
    deleteNotification: (state, payload) => {
      const i = state.newNotifications
        .map((item) => item.id)
        .indexOf(payload.id);
      state.newNotifications.splice(i, 1);
    },
    setLoading: (state, payload) => {
      state.loading = payload;
    },
  },
  actions: {
    setNewNotificationsCount({ commit }, payload) {
      commit("changeNewNotificationsCount", payload);
    },

    setNewNotifications({ commit }, payload) {
      commit("addNewNotifications", payload);
    },
    setOldNotifications({ commit }, payload) {
      commit("addOldNotifications", payload);
    },

    deleteNotification({ commit }, payload) {
      commit("deleteNotification", payload);
    },
    setLoading({ commit }, payload) {
      commit("setLoading", payload);
    },
  },
  modules: {},
});
