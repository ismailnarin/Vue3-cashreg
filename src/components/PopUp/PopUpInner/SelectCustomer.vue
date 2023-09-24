<template>
  <div class="selectCustomer">
    <div class="popUpClose pt" @click="closePopUp">
      <img src="@/assets/image/runnincAcc/closeIco.svg" alt="" />
    </div>
    <div class="title">Müşteri Seç</div>
    <table>
      <tr>
        <th><span> İsim </span></th>
        <th><span> Soyisim </span></th>
        <th><span> Telefon </span></th>
        <th></th>
      </tr>
      <tr>
        <th>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ara.."
            v-model="searchName"
            @keyup="searchKey"
          />
        </th>
        <th>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ara.."
            v-model="searchSurName"
            @keyup="searchKey"
          />
        </th>
        <th>
          <input
            type="text"
            name=""
            id=""
            placeholder="Ara.."
            v-model="searchPhone"
            @keyup="searchKey"
          />
        </th>
        <th></th>
      </tr>
      <tr
        class="customerItem pt"
        v-for="customer in filteredCustomer"
        :key="customer.id"
        @click="selectCustomer(customer)"
      >
        <td>{{ customer.cus_name }}</td>
        <td>{{ customer.cus_surname }}</td>
        <td>{{ customer.cus_phone }}</td>
        <td><img src="@/assets/image/runnincAcc/tick.svg" alt="" /></td>
      </tr>
    </table>
  </div>
</template>
<style scoped>
.customerItem {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 28%);
  color: #7a7a7a;
  transition: all ease 0.3s;
}
.customerItem:hover {
  box-shadow: 0 0 5px 0px #98ee2a;
}
td:first-child,
th:first-child {
  border-radius: 10px 0 0 10px;
}

td:last-child,
th:last-child {
  border-radius: 0 10px 10px 0;
}

.customerItem td {
  padding: 14px 20px;
}
table {
  border-collapse: separate;
  border-spacing: 0px 8px;
}
input:focus {
  outline: none;
}
th span {
  display: flex;
  margin-bottom: 10px;
}
th input {
  border: none;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0px rgb(0 0 0 / 28%);
  margin: 14px 0px;
}
th,
td {
  padding: 0px 15px;
}
th {
  color: #567488;
  text-align: left;
  font-weight: normal;
}
.title {
  color: #567488;
  font-size: 20px;
  margin-bottom: 42px;
}
.selectCustomer {
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 22px;
  position: relative;
  max-height: 80vh;
  min-height: 80vh;
  overflow-y: scroll;
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
  data() {
    return {
      searchName: "",
      searchSurName: "",
      searchPhone: "",
      filteredCustomer: [],
    };
  },
  methods: {
    searchKey() {
      this.filteredCustomer = this.customerList.filter(
        (item) =>
          item.cus_name
            .toString()
            .toLowerCase()
            .includes(this.searchName.toString().toLowerCase()) &&
          item.cus_surname
            .toString()
            .toLowerCase()
            .includes(this.searchSurName.toString().toLowerCase()) &&
          item.cus_phone
            .toString()
            .toLowerCase()
            .includes(this.searchPhone.toString().toLowerCase())
      );
    },
    closePopUp() {
      this.$store.dispatch("PopUp/openPopUp");
    },
    async selectCustomer(customer) {
      this.$store.dispatch("SelectedCustomer/changeSelectCustomer", customer);
      this.$store.dispatch("Customer/getCustomer", customer);
      await this.$store.dispatch("Customer/getRunning", customer);

      setTimeout(() => {
        this.closePopUp();
      }, 200);
    },
  },
  async created() {
    await this.$store.dispatch("Customer/getCustomerList");
  },
  computed: {
    ...mapGetters({
      customerList: "Customer/_customerList",
    }),
  },
  watch: {
    customerList() {
      this.filteredCustomer = this.customerList;
    },
  },
};
</script>
