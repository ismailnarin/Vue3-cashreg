<template>
  <div class="d-f w-full h-full flex-column overflow">
    <div class="container flex-column">
      <div class="title">Personel Düzenle</div>
      <table>
        <tr
          v-for="personel in personelList"
          :key="personel.user_id"
          @click="editPersonel(personel)"
        >
          <td>{{ personel.user_name }}</td>
          <td>{{ personel.user_surname }}</td>
          <td>{{ personel.user_phone }}</td>
          <td>
            <div class="edit" @click="editPersonel(personel)">Düzenle</div>
          </td>
        </tr>
      </table>
    </div>
    <div class="editContainer flex-column">
      <div class="d-f flex-row m-b">
        <div class="d-f flex-column m-r">
          <span>İsim</span>
          <input type="text" name="" id="" v-model="personel.personelName" />
        </div>
        <div class="d-f flex-column m-r">
          <span>Soyisim</span>
          <input type="text" name="" id="" v-model="personel.personelSurName" />
        </div>
      </div>
      <div class="d-f flex-row m-b">
        <div class="d-f flex-column m-r">
          <span>Telefon</span>
          <input type="text" name="" id="" v-model="personel.personelPhone" />
        </div>
        <div class="d-f flex-column m-r">
          <span>Kullanıcı Adı</span>
          <input
            type="text"
            name=""
            id=""
            v-model="personel.personelNickName"
          />
        </div>
      </div>
      <div class="d-f flex-row m-b">
        <div class="d-f flex-column m-r">
          <span>Şifre</span>
          <input
            type="text"
            name=""
            id=""
            v-model="personel.personelPassword"
          />
        </div>
      </div>
      <div class="d-f flex-row m-b">
        <div class="d-f flex-row m-r">
          <input
            type="checkbox"
            name=""
            id=""
            v-model="personel.personelApprove"
          />
          <span>Hesabı Onayla</span>
        </div>
        <div class="d-f flex-column m-r">
          <button class="pt" @click="updatePersonel">
            <img src="@/assets/image/runnincAcc/save.svg" alt="" />Kaydet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
button {
  padding: 10px 35px;
  background-color: #fff3f3;
  border: 2px solid #ff9291;
  color: #ff9291;
  font-weight: 500;
  font-size: 16px;
  border-radius: 6px;
}
input[type="checkbox"] {
  margin-top: -2px;
  margin-right: 10px;
}
input[type="text"] {
  border: none;
  outline: none;
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  padding: 10px 15px;
  border-radius: 0px 0px 30px 0px;
  width: 120%;
  box-sizing: border-box;
}
.overflow {
  overflow: hidden;
}
.m-b {
  margin-bottom: 24px;
}
span {
  display: flex;
  color: #567488;
  font-size: 16px;
  margin-bottom: 5px;
  align-items: center;
}
.m-r {
  margin-right: 100px;
}
.editContainer {
  display: inline-flex;
  background-color: #ebf2f8;
  height: 50%;
  box-sizing: border-box;
  padding: 50px 0px 0px 36px;
}
.edit {
  right: 20px;
  top: 18%;
  position: absolute;
  display: flex;
  background-color: #d9d9d9;
  padding: 7px 15px;
  border-radius: 8px;
  font-weight: 500;
  color: white;
  transition: all ease 0.3s;
}
.container {
  display: flex;
  padding: 30px;
  background-color: #f7fafc;
  width: 100%;
  height: 50%;
  max-height: 50%;
  overflow-y: scroll;
  box-sizing: border-box;
}
.title {
  color: #567488;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 23px;
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
tr:hover {
  box-shadow: 0 0 8px 0px #82ff6d;
}
tr:hover .edit {
  background-color: #82ff6d;
}
td {
  padding: 15px 35px;
}
td:not(:last-child):not(:nth-last-child(2)) {
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
  text-align: end;
  position: relative;
}
</style>
<script scoped>
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  data() {
    return {
      personel: {
        personelName: "",
        personelSurName: "",
        personelPhone: "",
        personelNickName: "",
        personelPassword: "",
        personelApprove: false,
        personelID: "",
      },
    };
  },
  methods: {
    updatePersonel() {
      axios
        .post("http://backend.laragon/edit_personel.php", this.personel)
        .then((response) => {
          if (response.data.status == 200) {
            alert("Başarıyla Güncellendi");
            this.personel.personelName = "";
            this.personel.personelSurName = "";
            this.personel.personelPhone = "";
            this.personel.personelNickName = "";
            this.personel.personelPassword = "";
            this.personel.personelApprove = false;
            this.personel.personelID = "";
          } else {
            alert("hata");
          }
        });
    },
    editPersonel(editPersonel) {
      this.personel.personelName = editPersonel.user_name;
      this.personel.personelSurName = editPersonel.user_surname;
      this.personel.personelPhone = editPersonel.user_phone;
      this.personel.personelNickName = editPersonel.user_nickname;
      this.personel.personelPassword = editPersonel.user_password;
      if (editPersonel.is_approve == "0") {
        this.personel.personelApprove = 0;
      } else {
        this.personel.personelApprove = true;
      }

      this.personel.personelID = editPersonel.user_id;
    },
  },
  created() {
    this.$store.dispatch("PersonelList/personelList");
  },
  computed: {
    ...mapGetters({
      personelList: "PersonelList/_personelList",
    }),
  },
};
</script>
