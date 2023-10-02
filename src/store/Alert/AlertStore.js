export default {
  namespaced: true,
  state: {
    alertText: "",
    alertStatus: false,
    alertType: "warning",
    timeOut: "",
  },
  mutations: {
    changeAlertStatus(state) {
      state.alertStatus = !state.alertStatus;
    },
    changeAlertContent(state, alertValue) {
      const { alertType, alertText } = alertValue;
      state.alertText = alertText;
      state.alertType =
        alertType !== "" || alertType !== null ? alertType : "warning";
    },
  },
  getters: {
    _alertText(state) {
      return state.alertText;
    },
    _alertStatus(state) {
      return state.alertStatus;
    },
    _alertType(state) {
      return state.alertType;
    },
  },
  actions: {
    openAlert(context) {
      clearTimeout(context.state.timeOut);
      if (!context.state.alertStatus) {
        context.commit("changeAlertStatus");
        context.state.timeOut = setTimeout(() => {
          context.commit("changeAlertStatus");
        }, 2000);
        console.log(context.state.timeOut);
      } else {
        context.commit("changeAlertStatus");
        context.state.timeOut = setTimeout(() => {
          context.commit("changeAlertStatus");
          setTimeout(() => {
            context.commit("changeAlertStatus");
          }, 2000);
        }, 500);
      }
    },
    alertContent({ commit }, alertValue) {
      commit("changeAlertContent", alertValue);
    },
  },
};
