<template>
  <div class="topInnerContainer">
    <div class="waitContainer">
      <div class="topButton text-blue text-size pt" @click="addWaiting">
        Beklet
      </div>
      <div class="topButton text-blue text-size pt" @click="callWaiting">
        Çağır
      </div>
    </div>
    <div>
      <div class="topUserContainer text-blue">
        <div class="logoContainer">
          <img src="@/assets/image/top/userLogo.jpg" alt="" />
        </div>
        <div>{{ user[0].user_name }} {{ user[0].user_surname }}</div>

        <div class="openMenuButton pt" @click="openMenu = !openMenu">
          <img src="@/assets/image/top/3dots.svg" alt="" />
        </div>
        <transition>
          <div class="openMenu" v-if="openMenu">
            <div class="openMenuItem" @click="addProduct">
              <img src="@/assets/image/openMenu/addProduct.svg" alt="" /><span
                >Ürün Ekle</span
              >
            </div>
            <div class="openMenuItem" @click="editProduct">
              <img
                src="@/assets/image/runnincAcc/editProduct.svg"
                alt=""
              /><span>Ürünleri Düzenle</span>
            </div>
            <div class="openMenuItem" @click="logOut">
              <span
                ><img src="@/assets/image/openMenu/logOut.svg" alt="" /></span
              >Çıkış Yap
            </div>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<style scoped>
.logoContainer {
  display: flex;
  width: 37px;
  height: 37px;
  border-radius: 37px;
  overflow: hidden;
  border: 3px solid #ff9291;
}
.openMenuItem {
  display: flex;
  -moz-column-gap: 10px;
  column-gap: 10px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}
.openMenuItem:first-child {
  border-bottom: 2px solid #56748885;
}
.openMenu {
  border-radius: 10px;
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 150%;
  background-color: #f5f5f59c;
  padding: 15px 30px;
  box-shadow: 0 0 4px 0px rgb(0 0 0 / 35%);
}
.topUserContainer {
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  -moz-column-gap: 15px;
  column-gap: 15px;
}
.openMenuButton {
  margin-left: 35px;
}
.text-size {
  font-size: 13px;
}
.topButton {
  display: flex;
  padding: 13px;
  border-radius: 9px;
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  min-width: 70px;
  justify-content: center;
}
.waitContainer {
  display: inline-flex;
  flex-direction: row;
  column-gap: 9px;
}
.topInnerContainer {
  padding: 0px 40px;
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-between;
}
</style>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      openMenu: false,
    };
  },
  methods: {
    callWaiting() {
      this.$store.dispatch("PopUp/openPopUp");
      this.$store.dispatch("PopUp/changePopUpComponent", "CallCustomer");
    },
    async addWaiting() {
      if(this.selectedCustomer!==""){

        const packages = {
          selectedCustomer: this.selectedCustomer,
          orderList: this.orderList,
        };
        await this.$store.dispatch("WaitingList/addWaiting", packages);
        this.$store.dispatch("RunningAcc/refreshRunning");
        this.$store.dispatch("SelectedCustomer/refreshSelectedCustomer");
        this.$store.dispatch("Order/resetOrderStore");
        this.$store.dispatch("OrderList/resetOrderList");
        this.$store.dispatch("Customer/refreshCustomerStore");
      }
      else{
        alert("Lütfen Müşteri Seçiniz.");
      }

    },
    addProduct() {
      this.$store.dispatch("PopUp/openPopUp");
      this.$store.dispatch("PopUp/changePopUpComponent", "AddProduct");
    },
    logOut() {
      this.$store.dispatch("Auth/logOut");
      this.$router.push({ name: "login" });
    },
    editProduct() {
      this.$store.dispatch("Product/changeEditProduct");
    },
  },
  computed: {
    ...mapGetters({
      user: "Auth/_getAuthentication",
      selectedCustomer: "SelectedCustomer/_selectedCustomer",
      orderList: "OrderList/_orderList",
    }),
  },
};
</script>
