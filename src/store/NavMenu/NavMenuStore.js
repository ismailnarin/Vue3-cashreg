export default {
  namespaced: true,
  state: {
    menuItems: [
      {
        id: 1,
        text: "Ürünler",
        name: "product",
      },
      {
        id: 2,
        text: "Hizmetler",
        name: "services",
      },
      {
        id: 3,
        text: "Epilasyon",
        name: "epilation",
      },
      {
        id: 4,
        text: "Cilt Bakımı",
        name: "skinCare",
      },
      {
        id: 5,
        text: "Kampanyalar",
        name: "campaign",
      },
    ],
    filter: 1,
  },
  mutations: {},
  getters: {
    _navMenuItems(state) {
      return state.menuItems;
    },
  },
  actions: {},
};
