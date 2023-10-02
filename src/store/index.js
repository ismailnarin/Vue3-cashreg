import { createStore } from "vuex";
import LeftMenu from "./LeftMenu/LeftMenuStore";
import NavMenu from "./NavMenu/NavMenuStore";
import SelectedCustomer from "./SelectedCustomer/selectedCustomerStore";
import RunningAcc from "./RunningAcc/RunningAccStore";
import OrderList from "./OrderList/OrderListStore";
import PopUp from "./PopUp/PopUpStore";
import Product from "./Product/ProductStore";
import Customer from "./Customer/CustomerStore";
import Auth from "./Auth/AuthStore";
import PersonelList from "./PersonelList/PersonelListStore";
import Calculator from "./Calculator/CalculatorStore";
import Order from "./Order/OrderStore";
import OrderReport from "./OrderReport/OrderReport";
import WaitingList from "./WaitingList/WaitingListStore";
import Alert from "./Alert/AlertStore";
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    LeftMenu,
    NavMenu,
    SelectedCustomer,
    RunningAcc,
    OrderList,
    PopUp,
    Product,
    Customer,
    Auth,
    PersonelList,
    Calculator,
    Order,
    OrderReport,
    WaitingList,
    Alert,
  },
  plugins: [createPersistedState()],
});
