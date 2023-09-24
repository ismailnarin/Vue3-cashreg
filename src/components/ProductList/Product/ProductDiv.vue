<template>
  <div class="withPackages">
    <div
      class="editProduct"
      @click="editProduct(productValue)"
      v-if="isEditProduct"
    >
      <img src="@/assets/image/runnincAcc/editProduct.svg" alt="" />
    </div>
    <div class="productContainer" @click="changeShowPackages">
      <div class="productText pt">{{ productValue.productName }}</div>
      <div class="productImage">
        <img :src="getProductImage(productValue.productPhoto)" alt="" />
      </div>
      <div class="priceText">
        <span>{{ productValue.productCash }}</span>
        <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
      </div>
    </div>
    <div
      class="packages flex-column"
      v-if="showPackages"
      :style="{ 'z-index': zIndex }"
    >
      <div class="title">Paketler</div>
      <div>
        <table>
          <tr @click="addTekSeans(productValue)">
            <td>Tek Seans</td>
            <td>
              Nakit : {{ productValue.productCash }}
              <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
            </td>
            <td>
              Kart : {{ productValue.productCard }}
              <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
            </td>
          </tr>
          <tr
            v-for="seans in productValue.packages"
            :key="seans.seansID"
            @click="addSeansOrder(seans, productValue)"
          >
            <td>Seans&nbsp;:&nbsp;{{ seans.seansNumber }}</td>
            <td>
              Nakit&nbsp;:&nbsp;{{ seans.packagePriceCash }}
              <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
            </td>
            <td>
              Kart&nbsp;:&nbsp;{{ seans.packagePriceCard }}
              <img src="@/assets/image/runnincAcc/tlico.svg" alt="" />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>
<style scoped>
.editProduct {
  display: flex;
  position: absolute;
  z-index: 8;
  right: 5px;
  top: 5px;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 10px;
  color: #567488;
}

table tr {
  cursor: pointer;
  background-color: aliceblue;
  box-shadow: 0 0px 4px 0px rgb(0 0 0 / 39%);
  transition: all ease 0.3s;
  font-weight: 500;
  border-radius: 10px;
}
table tr:hover {
  color: #ff9291;
  box-shadow: 0 0px 5px 0px rgb(0 0 0 / 39%);
  background-color: #fff3f3;
}
table tr td {
  padding: 5px 0px 5px 10px;
}
td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}
.withPackages {
  display: flex;
  position: relative;
  margin: 0px 43px 37px 0px;
}
.title {
  font-weight: 600;
  color: #ff9291;
  margin-bottom: 15px;
  display: inline-flex;
  width: 100%;
  text-align: center;
  justify-content: center;
}
.packages {
  display: flex;
  position: absolute;
  width: 300%;
  height: 150%;
  background-color: white;
  left: 105%;
  box-shadow: 0 0px 6px 0px rgb(0 0 0 / 39%);
  align-content: center;
  border-radius: 15px;
  padding: 10px;
}
.productText,
.priceText {
  color: #ff9291;
  font-size: 15px;
  font-weight: bold;
}
.priceText {
  font-size: 17px;
}
.productImage {
  display: flex;
  width: 69px;
  height: 69px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #ff9291;
}
.productImage img {
  object-fit: contain;
  height: 100%;
}
.productContainer {
  position: relative;
  cursor: pointer;
  display: inline-flex;
  width: 110px;
  height: 141px;
  flex-direction: column;
  border-radius: 14px;
  padding: 14px;
  background-color: white;
  box-shadow: 0 0px 6px 0px rgb(0 0 0 / 39%);
  align-content: center;
  align-items: center;
  justify-content: space-between;
}
</style>
<script scoped>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showPackages: false,
      zIndex: "",
    };
  },
  props: ["productValue"],
  methods: {
    editProduct(value) {
      console.log(value);
      this.$store.dispatch("PopUp/openPopUp");
      this.$store.dispatch("PopUp/changePopUpComponent", "EditProduct");
      this.$store.dispatch("Product/editProductValue", value);
    },
    addTekSeans(product) {
      const order = {
        productID: product.id,
        productText: product.productName,
        id: Date.now(),
        seansNumber: 1,
        cashPrice: product.productCash,
        cardPrice: product.productCard,
        quantity: 1,
        personel: "",
      };
      this.$store.dispatch("OrderList/addOrderSeans", order);
      this.changeShowPackages();
    },
    addSeansOrder(seans, product) {
      const order = {
        productID: product.id,
        seansID: seans.seansID,
        productText: product.productName,
        id: Date.now(),
        seansNumber: seans.seansNumber,
        cashPrice: seans.packagePriceCash,
        cardPrice: seans.packagePriceCard,
        quantity: 1,
        personel: "",
      };
      this.$store.dispatch("OrderList/addOrderSeans", order);
      this.changeShowPackages();
    },
    getJson(data) {
      return JSON.parse(data);
    },
    getProductImage(imageFilePath) {
      return `http://backend.laragon/${imageFilePath}`;
    },
    changeShowPackages() {
      this.showPackages = !this.showPackages;
      this.showPackages ? (this.zIndex = "8") : (this.zIndex = "");
    },
  },
  computed: {
    ...mapGetters({
      isEditProduct: "Product/_editProduct",
    }),
  },
};
</script>
