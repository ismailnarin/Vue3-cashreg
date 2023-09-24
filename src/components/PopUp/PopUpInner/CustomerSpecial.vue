<template>
  <div class="CustomerSpecial">
    <div class="popUpClose pt" @click="closePopUp">
      <img src="@/assets/image/runnincAcc/closeIco.svg" alt="" />
    </div>
    <div>
      <div v-if="!emptySeans[0]?.product" style="color: #ff9291">
        Müşterinin seansı bulunmuyor.
      </div>
      <div v-for="(products, index) in emptySeans" :key="index" class="a">
        <div v-for="product in products" :key="product.order_product_id">
          <div class="d-f productDiv">
            <div>
              <span>Ürün Adı : </span
              ><span style="color: #ff9291; font-weight: 600">{{
                product.product_name
              }}</span>
            </div>
            <div><span>Tarih : </span>{{ product.created_at }}</div>
          </div>
          <div>
            <div
              v-for="(seans, index) in product.seans"
              :key="seans.seans_id"
              class="seansDiv"
            >
              <span> Seans {{ index + 1 }} &nbsp;</span>
              <div class="buttonContainer">
                <div>
                  <button
                    :style="
                      seans.seans_status == 1
                        ? 'background-color:#ff9291;pointer-events:none'
                        : ''
                    "
                    @click="updateSeans(seans.seans_id, 1)"
                  ></button>
                </div>
                <div
                  v-if="seans.seans_status == 1"
                  class="pt"
                  @click="updateSeans(seans.seans_id, 0)"
                >
                  <img src="@/assets/image/runnincAcc/reverse.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="runningProduct.order">
      <div class="title">Açık Kalan Siparişler</div>
      <div
        v-for="order in runningProduct.order"
        :key="order.id"
        class="productContainer"
      >
        <div class="innerProduct">
          <div>Sipariş Tarihi : {{ order.created_at }}</div>
          <div>
            Açık Hesap Tutarı :
            <b style="color: red" @click="toggleOrder(order.id)" class="pt"
              >{{ order.order_running_price }} TL</b
            >
            <div class="payThis" v-if="showOrder.includes(order.id)">
              <div @click="updateOrder('cash', order.id)" class="pt">Nakit</div>
              <div @click="updateOrder('card', order.id)" class="pt">
                Kredi Kartı
              </div>
            </div>
          </div>
        </div>
        <div
          v-for="product in order.product"
          :key="product.order_product_id"
          class="innerProduct"
        >
          <div>Ürün/Hizmet Adı: {{ product.product_name }}</div>
          <div>Adet: {{ product.quantity }}</div>
        </div>
      </div>
    </div>
    <div style="color: #ff9291" v-else>Müşterinin açık hesabı bulunmuyor</div>
  </div>
</template>
<style scoped>
.payThis {
  display: flex;
  position: absolute;
  flex-direction: column;
  background: white;
  right: 3%;
  padding: 10px;
  border: 1px solid pink;
  text-align: center;
  border-radius: 10px;
  row-gap: 3px;
}
.payThis div:first-child {
  background-color: lime;
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}
.payThis div:last-child {
  background-color: orange;
  padding: 5px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
}
.buttonContainer {
  min-width: 55px;
  display: flex;
  column-gap: 5px;
}
.innerProduct:first-child {
  border-bottom: 1px solid #dbdbdb;
}
.productContainer {
  border: 1px solid #ff93918a;
  margin-top: 5px;
  padding: 0px 8px;
}
.innerProduct {
  display: flex;
  margin: 15px 0px;
  -moz-column-gap: 90px;
  column-gap: 90px;
  color: #567488;
  font-size: 15px;
  justify-content: space-between;
}
.title {
  margin-top: 25px;
  color: gray;
  font-size: 15px;
  font-weight: 600;
}
.seansDiv {
  color: #ff9291;
  display: flex;
  padding: 10px 0px;
  justify-content: space-around;
  border-bottom: 1px solid #5674884f;
}

.seansDiv button {
  padding: 8px;
  border: 2px solid #ff9291;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
}
.productDiv {
  color: #567488;
  border-bottom: 1px solid #ff9291;
  padding: 10px;
  column-gap: 15px;
}
.CustomerSpecial {
  flex-direction: column;
  background-color: white;
  position: relative;
  padding: 50px;
  border-radius: 10px;
  display: flex;
}
</style>
<script>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showOrder: [],
    };
  },
  methods: {
    toggleOrder(orderId) {
      const index = this.showOrder.indexOf(orderId);
      if (index === -1) {
        this.showOrder.push(orderId);
      } else {
        this.showOrder.splice(index, 1);
      }
    },
    async updateOrder(type, id) {
      const packages = {
        type: type,
        id: id,
      };
      await axios.post(
        "http://backend.laragon/update_orders_running.php",
        packages
      );
      await this.$store.dispatch("Customer/getRunning", this.selectedCustomer);
    },

    closePopUp() {
      this.$store.dispatch("PopUp/openPopUp");
    },
    async updateSeans(seansID, seansStatu) {
      const seans = {
        seansID: seansID,
        status: seansStatu,
      };
      await axios.post("http://backend.laragon/update_seans.php", seans);
      this.$store.dispatch("Customer/getCustomer", this.selectedCustomer);
    },
  },
  computed: {
    ...mapGetters({
      emptySeans: "Customer/_productNotSeans",
      selectedCustomer: "SelectedCustomer/_selectedCustomer",
      runningProduct: "Customer/_runningProduct",
    }),
  },
};
</script>
