export default {
  namespaced: true,
  state: {
    runningAcc: 0,
  },
  mutations: {
    changeRunning(state, cash) {
      state.runningAcc = cash;
    },
    cleanRunning(state) {
      state.runningAcc = 0;
    },
  },
  getters: {
    _runningAcc(state) {
      return state.runningAcc;
    },
  },
  actions: {
    addRunning({ commit }, cash) {
      commit("changeRunning", cash);
    },
    refreshRunning({ commit }) {
      commit("cleanRunning");
    },
  },
};
