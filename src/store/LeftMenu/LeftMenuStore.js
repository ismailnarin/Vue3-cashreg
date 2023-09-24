export default {
  namespaced: true,
  state: {
    menuItems: [
      {
        id: 1,
        image: "addCustomer.svg",
        text: "Müşteri Ekle",
        component: "AddCustomer",
      },
      {
        id: 2,
        image: "selectCustomer.svg",
        text: "Müşteri Seç",
        component: "SelectCustomer",
      },
      {
        id: 3,
        image: "personelList.svg",
        text: "Personel Listesi",
        component: "",
        router: "personelList",
      },
      {
        id: 4,
        image: "salesReport.svg",
        text: "Satış Raporu",
        component: "",
        router: "orderReport",
      },
      {
        id: 5,
        image: "dailyReport.svg",
        text: "Günlük Rapor",
        component: "",
      },
    ],
  },
  mutations: {},
  getters: {
    _leftMenuItems(state) {
      return state.menuItems;
    },
  },
  actions: {},
};
