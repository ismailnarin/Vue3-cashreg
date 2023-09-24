export default {
  namespaced: true,
  state: {
    PopUpStatus: false,
    PopUpComponent: "",
  },
  mutations: {
    setPopUpStatus(state) {
      state.PopUpStatus = !state.PopUpStatus;
    },
    setPopUpComponent(state, component) {
      state.PopUpComponent = component;
    },
  },

  getters: {
    _popUpStatus(state) {
      return state.PopUpStatus;
    },
    _popUpComponent(state) {
      return state.PopUpComponent;
    },
  },
  actions: {
    openPopUp({ commit }) {
      commit("setPopUpStatus");
    },
    changePopUpComponent({ commit }, component) {
      commit("setPopUpComponent", component);
    },
  },
};
