<template>
  <div class="container" v-if="!loginShow">
    <div>
      <div class="title"></div>
      <div class="loginContainer">
        <div class="loginTitle">Giriş Yap</div>
        <div>
          <input
            type="text"
            name=""
            id=""
            v-model="user.userNickName"
            placeholder="Kullanıcı Adı"
            @keypress.enter="login"
          />
        </div>
        <div>
          <input
            type="text"
            name=""
            id=""
            placeholder="Şifre"
            v-model="user.userPassword"
            @keypress.enter="login"
          />
        </div>
        <div>
          <button class="pt" @click="login">Giriş</button>
        </div>
        <div>
          <span @click="loginShow = !loginShow"
            >Personel İçin Kayıt Başvurusu</span
          >
        </div>
      </div>
    </div>
  </div>
  <div class="container personel" v-if="loginShow">
    <div class="loginContainer">
      <div class="loginTitle">Personel Başvuru</div>
      <div>
        <div>İsim</div>
        <div>
          <input type="text" name="" id="" v-model="personel.personelName" />
        </div>
      </div>
      <div>
        <div>Soy İsim</div>
        <div>
          <input type="text" name="" id="" v-model="personel.personelSurName" />
        </div>
      </div>
      <div>
        <div>Telefon</div>
        <div>
          <input type="text" name="" id="" v-model="personel.personelPhone" />
        </div>
      </div>
      <div>
        <div>Kullanıcı Adı</div>
        <div>
          <input
            type="text"
            name=""
            id=""
            v-model="personel.personeUserNickName"
          />
        </div>
      </div>
      <div>
        <div>Şifre</div>
        <div>
          <input
            type="text"
            name=""
            id=""
            v-model="personel.personelPassword"
          />
        </div>
      </div>
      <div>
        <div>Şifre Tekrar</div>
        <div>
          <input
            type="text"
            name=""
            id=""
            v-model="personel.personelRePassword"
          />
        </div>
      </div>
      <div><button @click="savePersonel">Kayıt Ol</button></div>
      <div>
        <span @click="loginShow = !loginShow">Zaten Üye misin? Giriş Yap</span>
      </div>
    </div>
  </div>
</template>
<style scoped>
.personel {
  color: #567488;
}
.personel input {
  margin: 7px 0px 15px 0px;
}
span {
  font-size: 10px;
  text-decoration: underline;
  color: #567488;
}
button {
  letter-spacing: 3px;
  font-family: "Montserrat", sans-serif;
  margin: 0px;
  margin-top: 10px;
  border: none;
  background-color: #567488;
  padding: 10px 41px;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  margin-bottom: 42px;
}
input::placeholder {
  color: #6c6c6c;
  font-weight: lighter;
}
.loginContainer {
  display: flex;
  background-color: white;
  padding: 45px 72px;
  flex-direction: column;
  align-items: center;
  border-radius: 36px;
  box-shadow: 0px 0px 6px 0px rgb(0 0 0 / 36%);
}
.container {
  background-color: #f7fafc;
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
}
.loginTitle {
  color: #567488;
  font-size: 32px;
  font-weight: lighter;
  margin-bottom: 32px;
}
input {
  margin-bottom: 8px;
  padding: 10px;
  font-size: 15px;
  width: 372px;
  text-align: center;
  border: 1px solid #ff9291;
  border-radius: 7px;
  outline: none;
}
</style>
<script scoped>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      loginShow: false,
      user: {
        userNickName: "",
        userPassword: "",
      },
      personel: {
        personelName: "",
        personelSurName: "",
        personelPhone: "",
        personeUserNickName: "",
        personelPassword: "",
        personelRePassword: "",
      },
    };
  },
  methods: {
    login() {
      this.$store.dispatch("Auth/checkUser", this.user);
    },
    clearPersonel() {
      this.personel.personelName = "";
      this.personel.personelSurName = "";
      this.personel.personelPhone = "";
      this.personel.personeUserNickName = "";
      this.personel.personelPassword = "";
      this.personel.personelRePassword = "";
    },
    savePersonel() {
      if (
        this.personel.personelName !== "" &&
        this.personel.personelSurName !== "" &&
        this.personel.personelPhone !== "" &&
        this.personel.personeUserNickName !== "" &&
        this.personel.personelPassword !== "" &&
        this.personel.personelRePassword !== "" &&
        this.personel.personelPassword == this.personel.personelRePassword
      ) {
        axios
          .post("http://backend.laragon/add_personel.php", this.personel)
          .then((response) => {
            if (response.data.status == 200) {
              this.$store.dispatch("Alert/openAlert");
              const alertPackage = {
                alertType: "success",
                alertText: "Kayıt Talebiniz Başarıyla Oluşturuldu",
              };
              this.$store.dispatch("Alert/alertContent", alertPackage);
              this.clearPersonel();
              this.loginShow = !this.loginShow;
            } else {
              this.$store.dispatch("Alert/openAlert");
              const alertPackage = {
                alertType: "warning",
                alertText: "Kayıt İşlemi Sırasında Bir Hata Oluştu",
              };
              this.$store.dispatch("Alert/alertContent", alertPackage);
            }
          });
      } else {
        this.$store.dispatch("Alert/openAlert");
        const alertPackage = {
          alertType: "warning",
          alertText: "Lütfen Bilgileri Kontrol Ediniz",
        };
        this.$store.dispatch("Alert/alertContent", alertPackage);
      }
    },
  },
  computed: {
    ...mapGetters({ isAuth: "Auth/_isAuth" }),
  },
  watch: {
    isAuth() {
      if (this.isAuth) {
        this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
