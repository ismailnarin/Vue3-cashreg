import axios from "axios";
export default {
  namespaced: true,
  state: {
    orderReportList: [],
  },
  mutations: {
    setOrderReportList(state, data) {
      state.orderReportList = data;
    },
    resetOrder(state) {
      state.orderReportList = [];
    },
  },
  getters: {
    _orderReportList(state) {
      return state.orderReportList;
    },
  },
  actions: {
    async getOrderReport({ commit }, dates) {
      axios
        .post("http://backend.laragon/get_order_report.php", dates)
        .then((response) => {
          commit("setOrderReportList", response.data);
        });
    },
    resetOrderReport({ commit }) {
      commit("resetOrder");
    },
  },
};
