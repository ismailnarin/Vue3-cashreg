<template>
  <div class="runningAcc">
    <span>
      Açık Hesap :
      <span> &nbsp;{{ runningAcc }} </span>
      <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
    </span>
    <img
      class="pt close"
      src="@/assets/image/runnincAcc/closeIco.svg"
      alt="Müşteriyi Kaldır Siparişi İptal Et"
      @click="refreshOrder"
    />
  </div>
</template>
<style scoped>
.close {
  opacity: 0.85;
}
.runningAcc {
  display: flex;
  padding: 20px 15px;
  border-radius: 13px;
  box-shadow: 0 0 4px 0px rgb(0 0 0 / 35%);
  background-color: white;
  margin-bottom: 28px;
  justify-content: space-between;
}
.runningAcc span {
  color: #ff9291;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    refreshOrder() {
      this.$store.dispatch("RunningAcc/refreshRunning");
      this.$store.dispatch("SelectedCustomer/refreshSelectedCustomer");
      this.$store.dispatch("Order/resetOrderStore");
      this.$store.dispatch("OrderList/resetOrderList");
      this.$store.dispatch("Customer/refreshCustomerStore");
    },
  },
  computed: {
    ...mapGetters({
      runningAcc: "RunningAcc/_runningAcc",
      orderList: "OrderList/_orderList",
    }),
  },
};
</script>
