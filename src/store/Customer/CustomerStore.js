import axios from "axios";
export default {
  namespaced: true,
  state: {
    customerList: "",
    customerStore: [],
    productNotSeans: [],
    runningProduct: [],
  },
  mutations: {
    setRunning(state, runningOrders) {
      state.runningProduct = runningOrders;
    },
    setCustomerList(state, customers) {
      state.customerList = customers;
    },
    refreshCustomer(state) {
      state.customerList = "";
    },
    setCustomerStore(state, orders) {
      state.productNotSeans = [];
      state.customerStore = orders;
      console.log(orders);
      if (orders.length > 0) {
        for (var i = 0; i < orders.length; i++) {
          var order = orders[i].order[0];
          var products = order.product;

          for (var j = 0; j < products.length; j++) {
            var product = products[j];
            var seans = product.seans;

            for (var k = 0; k < seans.length; k++) {
              var seansItem = seans[k];
              if (seansItem.seans_status === 0) {
                // Seans_status değeri 0 olan ürünü diziye ekleyin
                state.productNotSeans.push({ product });
                break;
              }
            }
          }
        }
      }
    },
    refreshCustomerSpecial(state) {
      state.customerStore = [];
      state.productNotSeans = [];
      state.runningProduct = [];
    },
  },
  getters: {
    _customerList(state) {
      return state.customerList;
    },
    _productNotSeans(state) {
      return state.productNotSeans;
    },
    _runningProduct(state) {
      return state.runningProduct;
    },
  },
  actions: {
    async getCustomerList({ commit }) {
      commit("refreshCustomer");
      axios.get("http://backend.laragon/get_customer.php").then((response) => {
        commit("setCustomerList", response.data);
      });
    },
    async getCustomer({ commit }, customer) {
      axios
        .post("http://backend.laragon/get_customer_store.php", customer.cus_id)
        .then((response) => {
          console.log(response);
          if (response !== "") {
            commit("setCustomerStore", response.data);
          }
        });
    },
    async getRunning({ commit }, customer) {
      await axios
        .post("http://backend.laragon/get_running.php", customer.cus_id)
        .then((response) => {
          commit("setRunning", response.data);
        });
    },
    refreshCustomerStore({ commit }) {
      commit("refreshCustomerSpecial");
    },
  },
};
