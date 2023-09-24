<template>
  <div class="selectedCustomer">
    <span> Seçili Müşteri &nbsp;:&nbsp; </span>
    <span
      @click="selectedCustomer !== '' ? openSpecialCustomer() : ''"
      class="pt"
    >
      <span>{{
        selectedCustomer.cus_name ? selectedCustomer.cus_name : "Müşteri"
      }}</span
      >&nbsp;
      <span>{{
        selectedCustomer.cus_surname
          ? selectedCustomer.cus_surname
          : "Seçilmedi"
      }}</span>
      <span class="animateColor" v-if="runningProduct.order">
        ({{ runningProduct.order.length }})
      </span>
    </span>
  </div>
</template>
<style scoped>
.animateColor {
  animation: colorful 2s infinite;
}
@keyframes colorful {
  0% {
    color: red;
  }
  50% {
    color: blue;
  }
  85% {
    color: Red;
  }
}
.selectedCustomer {
  display: flex;
  margin: 21px 0px 11px 0px;
}
span {
  color: #567488;
  font-weight: 600;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    openSpecialCustomer() {
      this.$store.dispatch("PopUp/openPopUp");
      this.$store.dispatch("Customer/getCustomer", this.selectedCustomer);
      this.$store.dispatch("PopUp/changePopUpComponent", "CustomerSpecial");
    },
  },
  computed: {
    ...mapGetters({
      selectedCustomer: "SelectedCustomer/_selectedCustomer",
      runningProduct: "Customer/_runningProduct",
    }),
  },
};
</script>
