// import axios from "axios";
export default {
  namespaced: true,
  state: {
    OrderList: [],
  },
  mutations: {
    setOrderList(state, order) {
      state.OrderList.push(order);
    },
    deleteOrder(state, orderID) {
      state.OrderList = state.OrderList.filter((item) => item.id !== orderID);
    },
    resetOrderList(state) {
      state.OrderList = [];
    },
    waitedList(state, orderList) {
      state.OrderList = orderList;
    },
  },
  getters: {
    _orderList(state) {
      return state.OrderList;
    },
  },
  actions: {
    addOrderSeans({ commit }, order) {
      commit("setOrderList", order);
    },
    deleteOrder({ commit }, orderID) {
      commit("deleteOrder", orderID);
    },
    resetOrderList({ commit }) {
      commit("resetOrderList");
    },
    waitedOrderList({ commit }, orderList) {
      commit("waitedList", orderList);
    },
  },
};
