import axios from "axios";
export default {
  namespaced: true,
  state: {
    authentication: "",
    isAuth: false,
  },
  mutations: {
    setAuthentication(state, user) {
      state.authentication = user.data;
    },
    setIsAuth(state) {
      state.isAuth = true;
    },
    deleteAuth(state) {
      state.authentication = "";
      state.isAuth = false;
    },
  },
  getters: {
    _getAuthentication(state) {
      return state.authentication;
    },
    _isAuth(state) {
      return state.isAuth;
    },
  },
  actions: {
    checkUser({ commit }, user) {
      axios
        .post("http://backend.laragon/get_user.php", user)
        .then((response) => {
          if (response.data.length > 0) {
            commit("setAuthentication", response);
            commit("setIsAuth");
          } else {
            this.$store.dispatch("Alert/openAlert");
            const alertPackage = {
              alertType: "warning",
              alertText: "Kullanıcı Bulunamadı",
            };
            this.$store.dispatch("Alert/alertContent", alertPackage);
          }
        });
    },
    logOut({ commit }) {
      commit("deleteAuth");
    },
  },
};
