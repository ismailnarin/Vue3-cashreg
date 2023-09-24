export default {
  namespaced: true,
  state: {
    waitingList: [],
  },
  mutations: {
    pushWaitingList(state, waitingList) {
      state.waitingList.push(waitingList);
      console.log(state.waitingList);
    },
    filterWaiting(state, cusID) {
      state.waitingList = state.waitingList.filter(
        (item) => item.selectedCustomer.cus_id !== cusID
      );
    },
  },
  getters: {
    _waitingList(state) {
      return state.waitingList;
    },
  },
  actions: {
    addWaiting({ commit }, waitingList) {
      commit("pushWaitingList", waitingList);
    },
    async deleteWaiting({ commit }, cusID) {
      console.log(cusID);
      await commit("filterWaiting", cusID);
    },
  },
};
