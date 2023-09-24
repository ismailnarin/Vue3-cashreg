<template>
  <div class="d-f w-full h-full light-bg flex- row contain">
    <div class="lockScreen" v-if="order.orderPrice > 0">
      Sipariş Sonlanana Kadar Ürün Ekleyemezsiniz!
    </div>
    <div
      class="d-f flex-column w-full"
      style="padding-left: 5px; box-sizing: border-box; overflow-y: scroll"
    >
      <ProductList />
    </div>
    <div class="calculator dark-bg">
      <SelectedCustomer />
      <RunningAcc />
      <OrderList />
      <PaidScreen />
      <calculator />
    </div>
  </div>
</template>

<script>
import Calculator from "@/components/Calculator/CalculatorComp.vue";
import RunningAcc from "@/components/RunningAcc/RunningAcc";
import OrderList from "@/components/OrderList/OrderList";
import SelectedCustomer from "@/components/SelectedCustomer/SelectedCustomer";
import PaidScreen from "@/components/PaidScreen/PaidScreen";
import ProductList from "@/components/ProductList/ProductList";
import { mapGetters } from "vuex";
export default {
  components: {
    Calculator,
    SelectedCustomer,
    RunningAcc,
    OrderList,
    PaidScreen,
    ProductList,
  },
  computed: {
    ...mapGetters({
      order: "Order/_order",
    }),
  },
};
</script>

<style scoped>
.lockScreen {
  display: flex;
  position: absolute;
  height: 100%;
  width: 80%;
  background-color: #a3a3a3ba;
  z-index: 7;
  margin-left: -40px;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 25px;
  font-weight: 700;
}
.calculator {
  display: flex;
  padding: 0px 30px;
  box-sizing: border-box;
  color: #567488;
  font-weight: 600;
  flex-direction: column;
  position: fixed;
  right: 0;
  height: calc(100% - 74px);
  width: 23%;
  z-index: 7;
}
.contain {
  padding: 0px 0px 0px 40px;
  box-sizing: border-box;
  position: relative;
  height: calc(100% - 74px);
}
</style>
