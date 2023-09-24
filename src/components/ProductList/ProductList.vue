<template>
  <div>
    <div class="navContainer">
      <h3>Satış Listesi</h3>
      <NavBar />
    </div>
    <div class="productOut">
      <Product
        v-for="product in productList"
        :key="product.id"
        :productValue="product"
      />
    </div>
  </div>
</template>
<script>
import NavBar from "@/components/NavBar/NavBar.vue";
import Product from "./Product/ProductDiv";
import { mapGetters } from "vuex";
export default {
  components: {
    Product,
    NavBar,
  },
  computed: {
    ...mapGetters({
      productList: "Product/_productList",
    }),
  },
  created() {
    this.$store.dispatch("Product/productFilter", 1);
  },
};
</script>
<style scoped>
h3 {
  color: #575a66;
}
.navContainer {
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: #f7fafc;
  z-index: 6;
  width: 100%;
}
.productOut {
  padding: 6px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 150px;
  width: 70%;
}
</style>
