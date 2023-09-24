import axios from "axios";
export default {
  namespaced: true,
  state: {
    personelList: "",
  },
  mutations: {
    setPersonelList(state, data) {
      state.personelList = data;
    },
  },
  getters: {
    _personelList(state) {
      return state.personelList;
    },
    _approvedPersonelList(state) {
      return state.personelList.filter((item) => item.is_approve == 1);
    },
  },
  actions: {
    async personelList({ commit }) {
      axios
        .get("http://backend.laragon/get_personel_list.php")
        .then((response) => {
          commit("setPersonelList", response.data);
        });
    },
  },
};
