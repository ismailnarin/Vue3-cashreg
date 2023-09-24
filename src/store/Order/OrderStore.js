import axios from "axios";
export default {
  namespaced: true,
  state: {
    order: {
      orderList: "", //
      customerID: "", //
      orderCardAmount: 0, //
      orderCashAmount: 0, //
      orderCashPrice: 0, //
      orderCardPrice: 0, //
      orderIsCard: 0, //
      orderIsCash: 0, //
      orderDiscount: 0,
      orderRunningStatus: 0,
      orderRunningPrice: 0,
      orderPrice: 0,
    },
  },
  mutations: {
    setOrderPrice(state, orderPrice) {
      state.order.orderPrice = orderPrice;
    },
    setOrderCard(state, card) {
      state.order.orderCardAmount = card.orderPrice;
      state.order.orderIsCard = 1;
      state.order.orderCardPrice += card.price;
    },
    setOrderCash(state, card) {
      state.order.orderCashAmount = card.orderPrice;
      state.order.orderIsCash = 1;
      state.order.orderCashPrice += card.price;
    },
    setOrderCus(state, orderCus) {
      state.order.orderList = orderCus.orderLists;
      state.order.customerID = orderCus.cusId;
    },
    resetOrder(state) {
      state.order = {
        orderList: "", //
        customerID: "", //
        orderCardAmount: 0, //
        orderCashAmount: 0, //
        orderCashPrice: 0, //
        orderCardPrice: 0, //
        orderIsCard: 0, //
        orderIsCash: 0, //
        orderDiscount: 0,
        orderRunningStatus: 0,
        orderRunningPrice: 0,
        orderPrice: 0,
      };
    },
    setOrderDiscount(state, discount) {
      state.order.orderDiscount += discount;
    },
    setRunning(state, running) {
      state.order.orderRunningStatus = 1;
      state.order.orderRunningPrice = running;
    },
  },
  getters: {
    _order(state) {
      return state.order;
    },
  },
  actions: {
    setOrderPrice({ commit }, orderPrice) {
      commit("setOrderPrice", orderPrice);
    },
    setOrderCard({ commit }, value) {
      const { orderPrice, price } = value;
      commit("setOrderCard", { orderPrice, price });
    },
    setOrderCash({ commit }, value) {
      const { orderPrice, price } = value;
      commit("setOrderCash", { orderPrice, price });
    },
    setCusAndOrder({ commit }, value) {
      const { orderLists, cusId } = value;
      commit("setOrderCus", { orderLists, cusId });
    },
    resetOrderStore({ commit }) {
      commit("resetOrder");
    },
    setOrderDiscount({ commit }, discount) {
      commit("setOrderDiscount", discount);
    },
    setRunning({ commit }, running) {
      commit("setRunning", running);
    },
    saveOrder(context) {
      axios
        .post("http://backend.laragon/save_order.php", context.state.order)
        .then(() => {
          // context.commit("setProductList", response.data);
        });
    },
  },
};
