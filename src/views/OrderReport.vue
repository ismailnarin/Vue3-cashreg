<template>
  <div class="reportContainer">
    <div class="dataContainer">
      <label for="baslangicTarihi">Başlangıç Tarihi:</label>
      <input
        type="date"
        id="baslangicTarihi"
        name="baslangicTarihi"
        v-model="dates.firstDate"
      /><br /><br />

      <label for="bitisTarihi">Bitiş Tarihi:</label>
      <input
        type="date"
        id="bitisTarihi"
        name="bitisTarihi"
        v-model="dates.secondDate"
      /><br /><br />

      <button @click="getOrderReport()">Aralığı Seç</button>
    </div>
    <div>
      <table>
        <tr>
          <th>ID</th>
          <th>Müşteri</th>
          <th>Telefon</th>
          <th>Nakit Fiyatı</th>
          <th>Kart Fiyatı</th>
          <th>İndirim</th>
          <th>Açık Hesap</th>
          <th>Sipariş Tutarı</th>
          <th>Tarih</th>
        </tr>
        <template v-for="order in orderReportList" :key="order.id">
          <tr @click="openDetail(order.id)">
            <td>{{ order.id }}</td>
            <td>{{ order.cus_name }} {{ order.cus_surname }}</td>
            <td>{{ order.cus_phone }}</td>
            <td>{{ order.order_cash_price }}</td>
            <td>{{ order.order_card_price }}</td>
            <td>{{ order.order_discount }}</td>
            <td>{{ order.order_running_price }}</td>
            <td>{{ order.order_price }}</td>
            <td>{{ order.created_at }}</td>
          </tr>
          <transition name="acordion">
            <tr v-if="openAcordion == order.id">
              <td colspan="9">
                <div class="orderDetail">
                  <div>
                    <span>Müşteri:</span>
                    <span>
                      <select name="" id="" v-model="order.cus_id">
                        <option
                          :value="customer.cus_id"
                          v-for="customer in customerList"
                          :key="customer.cus_id"
                        >
                          {{ customer.cus_name }} {{ customer.cus_surname }}
                        </option>
                      </select>
                    </span>
                  </div>
                  <div>
                    <span>Tarih:</span>
                    <input
                      type="datetime-local"
                      name=""
                      v-model="order.created_at"
                      id=""
                    />
                  </div>
                </div>
              </td>
            </tr>
          </transition>
        </template>
        <tr v-if="orderReportList.length > 0">
          <td colspan="3">Toplam</td>
          <td>{{ cashTotal }}</td>
          <td>{{ cardTotal }}</td>
          <td>{{ discountTotal }}</td>
          <td>{{ runningTotal }}</td>
          <td colspan="2">{{ priceTotal }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<style scoped>
.orderDetail {
  display: flex;
}

.acordion-enter-from,
.acordion-leave-to {
  height: 0px;
  transition: all ease 0.3s;
}
.acordion-enter-to,
.acordion-leave-from {
  transform: scaleY(1);
  transform-origin: top center;
  transition: all ease 0.3s;
}
.dataContainer {
  align-items: center;
}
label {
  color: #567488;
}
th {
  color: #567488;
  font-weight: 500;
}
input[type="date"] {
  margin: 0px 15px;
  height: 25px;
  color: white;
  background-color: #567488;
  border-radius: 20px;
  padding: 0px 20px;
  border: none;
  outline: none;
}
.reportContainer {
  display: flex;
  background-color: #f7fafc;
  flex-direction: column;
  height: 100%;
  align-items: center;
  padding-top: 41px;
  overflow: scroll;
}
table {
  border-collapse: separate;
  border-spacing: 0px 12px;
}
table tr {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  transition: all ease 0.3s;
  cursor: pointer;
}
table th {
  padding: 20px 20px;
}
tr:hover:not(:first-child) {
  box-shadow: 0 0 8px 0px #82ff6d;
}
td {
  padding: 15px 35px;
}
td:not(:last-child) {
  border: 2px solid #0000ff00;
  border-right-width: 1px;
  box-shadow: 5px 0px 0px -4px #ff9291;
}
td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}
.dataContainer {
  display: flex;
}
button {
  padding: 7px 20px;
  background-color: #fff3f3;
  border: 2px solid #ff9291;
  color: #ff9291;
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dates: {
        firstDate: "",
        secondDate: "",
      },
      openAcordion: null,
    };
  },
  methods: {
    openDetail(id) {
      if (this.openAcordion == null || this.openAcordion !== id) {
        this.openAcordion = id;
      } else {
        this.openAcordion = null;
      }
    },
    getOrderReport() {
      this.$store.dispatch("OrderReport/getOrderReport", this.dates);
    },
  },
  computed: {
    ...mapGetters({
      orderReportList: "OrderReport/_orderReportList",
      customerList: "Customer/_customerList",
    }),
    cashTotal() {
      return this.orderReportList.reduce(
        (toplam, order) => toplam + order.order_cash_price,
        0
      );
    },
    cardTotal() {
      return this.orderReportList.reduce(
        (toplam, order) => toplam + order.order_card_price,
        0
      );
    },
    discountTotal() {
      return this.orderReportList.reduce(
        (toplam, order) => toplam + order.order_discount,
        0
      );
    },
    runningTotal() {
      return this.orderReportList.reduce(
        (toplam, order) => toplam + order.order_running_price,
        0
      );
    },
    priceTotal() {
      return this.orderReportList.reduce(
        (toplam, order) => toplam + order.order_price,
        0
      );
    },
  },
  created() {
    this.$store.dispatch("OrderReport/resetOrderReport");
  },
};
</script>
