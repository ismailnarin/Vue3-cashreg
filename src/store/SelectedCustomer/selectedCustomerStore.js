export default {
  namespaced: true,
  state: {
    selectedCustomer: "",
  },
  mutations: {
    setSelectedCustomer(state, customer) {
      state.selectedCustomer = customer;
    },
    refreshSelectedCustomer(state) {
      state.selectedCustomer = "";
    },
  },
  getters: {
    _selectedCustomer(state) {
      return state.selectedCustomer;
    },
  },
  actions: {
    changeSelectCustomer({ commit }, customer) {
      commit("setSelectedCustomer", customer);
    },
    refreshSelectedCustomer({ commit }) {
      commit("refreshSelectedCustomer");
    },
  },
};
