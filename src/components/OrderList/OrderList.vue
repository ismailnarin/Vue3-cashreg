<template>
  <div>
    <div class="title">Sipariş Listesi</div>
    <div class="tableContainer">
      <table>
        <tr>
          <th>Prs.</th>
          <th>Hizmet / Ürün Adı</th>
          <th>Kart</th>
          <th>Nakit</th>
          <th>Adet</th>
          <th></th>
        </tr>
        <tr v-for="order in orderList" :key="order.id" class="orderItem">
          <td>
            <select name="" v-model="order.personel">
              <option value=""></option>
              <option
                v-for="personel in personelList"
                :value="personel.user_id"
                :key="personel.user_id"
              >
                {{ personel.user_name }} {{ personel.user_surname }}
              </option>
            </select>
          </td>
          <td>{{ order.productText }}({{ order.seansNumber }})</td>
          <td>
            {{ order.cardPrice }}
          </td>
          <td>
            {{ order.cashPrice }}
          </td>
          <td>
            <input
              type="number"
              name=""
              min="1"
              v-model="order.quantity"
              id=""
            />
          </td>
          <td>
            <img
              src="@/assets/image/runnincAcc/deleteOrder.svg"
              alt=""
              @click="deleteOrder(order.id)"
              class="pt"
              v-if="getOrder.orderPrice == 0"
            />
          </td>
        </tr>
        <tr v-if="orderList.length > 0">
          <td></td>
          <td>Toplam</td>
          <td>{{ toplamCardPrice }}</td>
          <td>{{ toplamCashPrice }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
select {
  width: 20px;
  outline: none;
  border: none;
  cursor: pointer;
}
.openPersonel {
  display: flex;
}
input {
  border: none;
  outline: none;
  width: 50px;
  color: #ff9291;
  font-size: 13px;
  font-weight: 500;
}
.title {
  padding-left: 8px;
  margin-bottom: 12px;
}
.orderItem {
  background-color: white;
  color: #ff9291;
  font-size: 13px;
  font-weight: 500;
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  border-radius: 10px;
}
table tr td,
table tr th {
  padding: 8px;
}

td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}

table tr th {
  font-weight: 500;
  font-size: 13px;
  text-align: left;
}
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 8px;
}
.tableContainer {
  padding: 5px;
  display: flex;
  min-height: 200px;
  max-height: 200px;
  width: 100%;
  align-items: flex-start;
  overflow-y: scroll;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    showSelect(orderId) {
      this.$refs["personelSelect_" + orderId].focus();
    },
    deleteOrder(orderID) {
      this.$store.dispatch("OrderList/deleteOrder", orderID);
    },
  },
  computed: {
    ...mapGetters({
      orderList: "OrderList/_orderList",
      personelList: "PersonelList/_approvedPersonelList",
      getOrder: "Order/_order",
    }),
    toplamCardPrice() {
      var toplamCardPrice = this.orderList.reduce(function (toplam, order) {
        return toplam + order.cardPrice * order.quantity;
      }, 0);
      return toplamCardPrice;
    },
    toplamCashPrice() {
      var toplamCashPrice = this.orderList.reduce(function (toplam, order) {
        return toplam + order.cashPrice * order.quantity;
      }, 0);
      return toplamCashPrice;
    },
  },
  created() {
    this.$store.dispatch("PersonelList/personelList");
  },
};
</script>
