import axios from "axios";
export default {
  namespaced: true,
  state: {
    productList: "",
    editProduct: false,
    editProductValue: "",
  },
  mutations: {
    setProductList(state, data) {
      state.productList = data;
    },
    changeEditProduct(state) {
      state.editProduct = !state.editProduct;
    },
    editProductValue(state, value) {
      state.editProductValue = value;
    },
  },
  getters: {
    _productList(state) {
      return state.productList;
    },
    _editProduct(state) {
      return state.editProduct;
    },
    _editProductValue(state) {
      return state.editProductValue;
    },
  },
  actions: {
    async productFilter({ commit }, filter) {
      axios
        .post("http://backend.laragon/get_product.php", filter)
        .then((response) => {
          commit("setProductList", response.data);
        });
    },
    changeEditProduct({ commit }) {
      commit("changeEditProduct");
    },
    editProductValue({ commit }, value) {
      commit("editProductValue", value);
    },
  },
};
