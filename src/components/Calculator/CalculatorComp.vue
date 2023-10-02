<template>
  <div class="calculatorContainer">
    <div class="calculatorNumbers">
      <div @click="addOperator('AC')" key="AC" class="calculatorNumberItem">
        AC
      </div>
      <div @click="checkOrder('discount')" key="%" class="calculatorNumberItem">
        <img src="@/assets/image/runnincAcc/discount.svg" alt="" />
      </div>
      <div
        v-for="number in calculateNumbers"
        :key="number"
        @click="addNumber(number)"
        class="calculatorNumberItem"
      >
        {{ number }}
      </div>
    </div>
    <div class="calculatorOperators">
      <div
        v-for="operator in operators"
        :key="operator"
        @click="addOperator(operator)"
        class="calculatorOperatorItems"
      >
        {{ operator }}
      </div>
    </div>
    <div class="paymanentDiv">
      <div class="paymanentInner" @click="addRunning()">Açık Hesap</div>
      <div class="paymanentInner" @click="checkOrder('card')">Kart</div>
      <div class="paymanentInner" @click="checkOrder('cash')">Nakit</div>
    </div>
  </div>
</template>
<style scoped>
.paymanentDiv {
  display: grid;
  row-gap: 10px;
  grid-template-columns: 60px;
  margin: 0px 7px;
}
.paymanentInner {
  font-weight: 700;
  border-radius: 15px;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  background-color: #fff3f3;
  cursor: pointer;
  user-select: none;
  transition: all ease 0.7s;
  text-align: center;
  color: #ff9291;
  box-shadow: 0 0 4px 0px rgb(0 0 0 / 35%);
}
.paymanentInner:hover {
  background: linear-gradient(
    16deg,
    rgb(165, 46, 167) 0%,
    rgb(47 21 21) 50%,
    rgb(165, 46, 167) 100%
  );
}
.calculatorContainer {
  display: flex;
  width: 100%;
  bottom: -94px;
  position: relative;
  right: 0px;
}
.calculatorNumbers {
  grid-template-columns: repeat(3, 60px);
  display: grid;
  gap: 10px;
  grid-template-rows: repeat(5, 60px);
}
.calculatorNumberItem {
  box-shadow: 0 0 4px 0px rgb(0 0 0 / 35%);
  user-select: none;
  cursor: pointer;
  font-weight: 600;
  color: #567488;
  border-radius: 50px;
  display: flex;
  background-color: white;
  justify-content: center;
  align-items: center;
  font-size: 25px;
}
.calculatorNumberItem:hover {
  background-color: #3b3b3b;
}
.calculatorNumberItem:nth-last-child(2) {
  grid-column-start: 1;
  grid-column-end: 3;
}
.calculatorNumberItem:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 3;
}

.calculatorNumberItem:nth-child(1),
.calculatorNumberItem:nth-child(2) {
  background-color: #b8deff;
  color: #567488;
}

.calculatorOperators {
  margin-left: 10px;
  color: white;
  grid-template-columns: repeat(1, 60px);
  grid-template-rows: repeat(1, 60px);
  display: grid;
  gap: 10px;
}
.calculatorOperatorItems {
  display: flex;
  background-color: #ff9291;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  font-size: 30px;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
}
</style>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      calculateNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."],
      operators: ["+", "-", "/", "x", "="],
      orderType: "",
    };
  },
  computed: {
    ...mapGetters({
      orderList: "OrderList/_orderList",
      selectedCustomer: "SelectedCustomer/_selectedCustomer",
      firstNumber: "Calculator/_firstNumber",
      secondNumber: "Calculator/_secondNumber",
      runningAcc: "RunningAcc/_runningAcc",
      order: "Order/_order",
    }),
  },
  methods: {
    async checkRunning() {
      if (this.runningAcc == 0) {
        await this.$store.dispatch("Order/saveOrder");
        this.$store.dispatch("Alert/openAlert");
        const alertPackage = {
          alertType: "success",
          alertText: "Sipariş Başarıyla Sonlandırıldı",
        };
        this.$store.dispatch("Alert/alertContent", alertPackage);
        this.$store.dispatch("Calculator/refreshCalc");
        this.$store.dispatch("RunningAcc/refreshRunning");
        this.$store.dispatch("SelectedCustomer/refreshSelectedCustomer");
        this.$store.dispatch("Order/resetOrderStore");
        this.$store.dispatch("OrderList/resetOrderList");
        this.$store.dispatch("Customer/refreshCustomerStore");
      }
    },

    async orderTypeCheck(orderType, price) {
      if (orderType == "card") {
        const orderPrice = this.orderList.reduce(function (toplam, order) {
          return toplam + order.cardPrice * order.quantity;
        }, 0);
        await this.setOrderPrice(orderPrice); //
        price = parseInt(price);
        await this.$store.dispatch("Order/setOrderCard", { orderPrice, price });
        if (this.runningAcc > price) {
          price = this.runningAcc - price;
          await this.$store.dispatch("RunningAcc/addRunning", price);
          await this.$store.dispatch("Calculator/refreshCalc");
          this.checkRunning();
        } else if (this.runningAcc <= price) {
          price = price - this.runningAcc;
          await this.$store.dispatch("RunningAcc/addRunning", 0);
          await this.$store.dispatch("Calculator/refreshCalc");
          alert("Para üstü " + price);
          this.checkRunning();
        }
      } else if (orderType == "cash") {
        const orderPrice = this.orderList.reduce(function (toplam, order) {
          return toplam + order.cashPrice * order.quantity;
        }, 0);
        await this.setOrderPrice(orderPrice);
        price = parseInt(price);
        await this.$store.dispatch("Order/setOrderCash", { orderPrice, price });
        if (this.runningAcc > price) {
          price = this.runningAcc - price;
          await this.$store.dispatch("RunningAcc/addRunning", price);
          await this.$store.dispatch("Calculator/refreshCalc");
          this.checkRunning();
        } else if (this.runningAcc <= price) {
          price = price - this.runningAcc;
          await this.$store.dispatch("RunningAcc/addRunning", 0);
          await this.$store.dispatch("Calculator/refreshCalc");
          alert("Para üstü " + price);
          this.checkRunning();
        }
      } else if (orderType == "discount") {
        price = parseInt(price);
        await this.$store.dispatch("Order/setOrderDiscount", price);
        if (this.runningAcc >= price) {
          price = this.runningAcc - price;
          await this.$store.dispatch("RunningAcc/addRunning", price);
          await this.$store.dispatch("Calculator/refreshCalc");
          this.checkRunning();
        } else if (this.runningAcc < price) {
          this.$store.dispatch("Alert/openAlert");
          const alertPackage = {
            alertType: "warning",
            alertText: "Açık Hesap Tutarından Fazla İndirim Giremezsiniz",
          };
          this.$store.dispatch("Alert/alertContent", alertPackage);
        }
      }
    },
    async addRunning() {
      const running = this.runningAcc;
      if (running > 0) {
        await this.$store.dispatch("Order/setRunning", running);
        await this.$store.dispatch("RunningAcc/addRunning", 0);
        await this.$store.dispatch("Calculator/refreshCalc");
        this.checkRunning();
      } else {
        this.$store.dispatch("Alert/openAlert");
        const alertPackage = {
          alertType: "warning",
          alertText: "Açık Hesap Değeri 0TL olmamalıdır",
        };
        this.$store.dispatch("Alert/alertContent", alertPackage);
      }
    },
    async checkOrder(orderType) {
      if (this.selectedCustomer !== "") {
        if (
          this.firstNumber > 0 &&
          (this.secondNumber == "" || this.secondNumber == 0)
        ) {
          this.orderTypeCheck(orderType, this.firstNumber);
        } else if (
          (this.firstNumber == "" || this.firstNumber == 0) &&
          this.secondNumber > 0
        ) {
          this.orderTypeCheck(orderType, this.secondNumber);
        } else {
          this.$store.dispatch("Alert/openAlert");
          const alertPackage = {
            alertType: "warning",
            alertText: "Lütfen Ücreti Girdiğinizden Emin Olunuz",
          };
          this.$store.dispatch("Alert/alertContent", alertPackage);
        }
      } else {
        this.$store.dispatch("Alert/openAlert");
        const alertPackage = {
          alertType: "warning",
          alertText: "Lütfen Müşteri Seçiniz",
        };
        this.$store.dispatch("Alert/alertContent", alertPackage);
      }
    },
    async addNumber(number) {
      await this.$store.dispatch("Calculator/addNumber", number);
    },
    async addOperator(operator) {
      await this.$store.dispatch("Calculator/changeOperator", operator);
    },
    async setOrderPrice(price) {
      if (this.runningAcc == 0) {
        await this.$store.dispatch("RunningAcc/addRunning", price);
        await this.$store.dispatch("Order/setOrderPrice", price);
        const orderLists = this.orderList;
        const cusId = this.selectedCustomer.cus_id;
        await this.$store.dispatch("Order/setCusAndOrder", {
          orderLists,
          cusId,
        });
      }
    },
  },
};
</script>
