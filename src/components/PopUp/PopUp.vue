<template>
  <div class="modalBack">
    <transition>
      <div v-if="popUpStatus">
        <component :is="popUpComponent" />
      </div>
    </transition>
  </div>
</template>
<style>
.modalBack {
  background-color: #00000075;
  display: flex;
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  align-items: center;
  justify-content: center;
}
</style>
<script>
import { mapGetters } from "vuex";
import AddProduct from "./PopUpInner/AddProduct.vue";
import AddCustomer from "./PopUpInner/AddCustomer.vue";
import CustomerSpecial from "./PopUpInner/CustomerSpecial.vue";
import SelectCustomer from "./PopUpInner/SelectCustomer.vue";
import CallCustomer from "./PopUpInner/CallCustomer";
import EditProduct from "./PopUpInner/EditProduct";
export default {
  computed: {
    ...mapGetters({
      popUpStatus: "PopUp/_popUpStatus",
      popUpComponent: "PopUp/_popUpComponent",
    }),
  },
  components: {
    AddProduct,
    AddCustomer,
    SelectCustomer,
    CustomerSpecial,
    CallCustomer,
    EditProduct,
  },
};
</script>
