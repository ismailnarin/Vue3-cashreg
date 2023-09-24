import store from "@/store";
export default {
  namespaced: true,
  state: {
    firstNumber: "",
    secondNumber: "",
    buttonOperator: "",
  },
  mutations: {
    setFirstNumber(state, number) {
      if (state.firstNumber == 0) {
        state.firstNumber = number;
      } else {
        state.firstNumber = state.firstNumber + "" + number;
      }
    },
    resetData(state) {
      state.firstNumber = "";
      state.secondNumber = "";
      state.buttonOperator = "";
    },
    changeOperator(state, operator) {
      if (operator == "AC") {
        state.buttonOperator = "";
        state.result = "";
        state.firstNumber = "";
        state.secondNumber = "";
      } else if (state.firstNumber !== "" && state.secondNumber == "") {
        state.secondNumber = state.firstNumber;
        state.firstNumber = "";
        state.buttonOperator = operator;
      } else if (state.firstNumber !== "" && state.secondNumber !== "") {
        store.commit("Calculator/mathProcess", state.buttonOperator);
        state.buttonOperator = operator;
      } else if (state.firstNumber == "" && state.secondNumber !== "") {
        state.buttonOperator = operator;
      }
    },
    mathProcess(state, operator) {
      switch (operator) {
        case "+":
          state.secondNumber =
            parseFloat(state.secondNumber) + parseFloat(state.firstNumber);
          break;
        case "-":
          state.secondNumber =
            parseFloat(state.secondNumber) - parseFloat(state.firstNumber);
          break;
        case "x":
          state.secondNumber =
            parseFloat(state.secondNumber) * parseFloat(state.firstNumber);
          break;
        case "/":
          state.secondNumber =
            parseFloat(state.secondNumber) / parseFloat(state.firstNumber);
          break;
        case "%":
          state.secondNumber =
            parseFloat(state.secondNumber) -
            parseFloat(state.secondNumber) *
              (parseFloat(state.firstNumber) / 100);
          break;
        case "=":
          state.buttonOperator = "";
          state.firstNumber = "";
          break;
      }
      state.firstNumber = "";
    },
  },
  getters: {
    _firstNumber(state) {
      return state.firstNumber;
    },
    _operator(state) {
      return state.buttonOperator;
    },
    _secondNumber(state) {
      return state.secondNumber;
    },
  },
  actions: {
    addNumber({ commit }, number) {
      commit("setFirstNumber", number);
    },
    changeOperator({ commit }, operator) {
      commit("changeOperator", operator);
    },
    refreshCalc({ commit }) {
      commit("resetData");
    },
  },
};
