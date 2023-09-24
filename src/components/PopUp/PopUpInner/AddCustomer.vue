<template>
  <div class="addCustomer">
    <div class="popUpClose pt" @click="closePopUp">
      <img src="@/assets/image/runnincAcc/closeIco.svg" alt="" />
    </div>
    <div class="title">Müşteri Ekle</div>
    <div>
      <div class="text">İsim</div>
      <div><input type="text" name="" id="" v-model="customer.cusName" /></div>
    </div>
    <div>
      <div class="text">Soy İsim</div>
      <div>
        <input type="text" name="" id="" v-model="customer.cusSurName" />
      </div>
    </div>
    <div>
      <div class="text">Telefon</div>
      <div><input type="text" name="" id="" v-model="customer.cusPhone" /></div>
    </div>
    <div v-if="false">
      <div class="text">Seçili Müşteri Yap</div>
      <div><input type="checkbox" name="" id="" v-model="selectedCus" /></div>
    </div>
    <div>
      <button class="pt" @click="addCustomer()">
        <img src="@/assets/image/runnincAcc/addIcon.svg" alt="" />Ekle
      </button>
    </div>
  </div>
</template>
<style scoped>
.text {
  margin-bottom: 5px;
}
.title {
  color: #567488;
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 20px;
}
button {
  background-color: #fff3f3;
  padding: 7px 30px;
  color: #ff9291;
  font-weight: 700;
  font-size: 15px;
  border-radius: 6px;
  border: 2px solid #ff9291;
}
.addCustomer {
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
input {
  border: none;
  padding: 8px;
  border-radius: 0px 0px 30px 0px;
  margin-bottom: 17px;
}
input:focus {
  outline: none;
}
</style>
<script scoped>
import axios from "axios";
export default {
  data() {
    return {
      customer: {
        cusName: "",
        cusSurName: "",
        cusPhone: "",
      },
      selectedCus: true,
    };
  },
  methods: {
    addCustomer() {
      if (
        this.customer.cusName !== "" &&
        this.customer.cusSurName !== "" &&
        this.customer.cusPhone !== ""
      ) {
        axios.post("http://backend.laragon/add_customer.php", this.customer);
      } else {
        alert("Lütfen Bilgileri Eksiksiz Giriniz.");
      }
    },
    closePopUp() {
      this.$store.dispatch("PopUp/openPopUp");
    },
  },
};
</script>
