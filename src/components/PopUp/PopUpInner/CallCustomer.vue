<template>
  <div class="callCustomerContainer">
    <div class="popUpClose pt" @click="closePopUp">
      <img src="@/assets/image/runnincAcc/closeIco.svg" alt="" />
    </div>

    <div v-for="(customer, index) in waitingList" :key="index">
      <div @click="getWaited(customer)" class="waitingList pt">
        {{ customer.selectedCustomer.cus_name }}
        {{ customer.selectedCustomer.cus_surname }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.waitingList {
  margin-bottom: 8px;
  display: flex;
  background-color: white;
  border-radius: 10px;
  padding: 10px 7px;
  justify-content: center;
  align-content: center;
  align-items: center;
  border: 1px solid pink;
}
.callCustomerContainer {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 40px 50px;
  border-radius: 17px;
  position: relative;
  color: #567488;
  font-size: 16px;
}
.popUpClose {
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      waitingList: "WaitingList/_waitingList",
      selectedCustomer: "SelectedCustomer/_selectedCustomer",
      orderList: "OrderList/_orderList",
    }),
  },
  methods: {
    closePopUp() {
      this.$store.dispatch("PopUp/openPopUp");
    },
    async getWaited(customer) {
      console.log(customer.selectedCustomer.cus_id);
      await this.$store.dispatch(
        "WaitingList/deleteWaiting",
        customer.selectedCustomer.cus_id
      );
      if (
        this.selectedCustomer !== "" &&
        this.orderList[0]?.quantity &&
        this.selectedCustomer.cus_id !== customer.selectedCustomer.cus_id
      ) {
        const newPackage = {
          selectedCustomer: this.selectedCustomer,
          orderList: this.orderList,
        };
        await this.$store.dispatch("WaitingList/addWaiting", newPackage);
        await this.$store.dispatch(
          "SelectedCustomer/changeSelectCustomer",
          customer.selectedCustomer
        );

        await this.$store.dispatch(
          "OrderList/waitedOrderList",
          customer.orderList
        );
      } else {
        await this.$store.dispatch(
          "SelectedCustomer/changeSelectCustomer",
          customer.selectedCustomer
        );
        await this.$store.dispatch(
          "OrderList/waitedOrderList",
          customer.orderList
        );
      }
      await this.$store.dispatch("Customer/getCustomer", this.selectedCustomer);
      await this.$store.dispatch("Customer/getRunning", this.selectedCustomer);
      this.closePopUp();
    },
  },
};
</script>
