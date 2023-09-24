<template>
  <div class="addProductContainer">
    <div class="popUpClose pt" @click="closePopUp">
      <img src="@/assets/image/runnincAcc/closeIco.svg" alt="" />
    </div>
    <h2>Ürün / Hizmet Ekle</h2>
    <div class="d-f">
      <span>Resim Seç</span>
      <span>
        <input
          type="file"
          accept="image/*"
          ref="fileInput"
          @change="uploadFile"
        />
      </span>
    </div>
    <div class="d-f">
      <span>Kategori Seç</span>
      <span>
        <select name="" id="" v-model="productValue.categoryID">
          <option
            :value="category.id"
            v-for="category in categories"
            :key="category.id"
          >
            {{ category.text }}
          </option>
        </select>
      </span>
    </div>
    <div class="d-f">
      <span> Ürün / Hizmet Adı</span>
      <span><input type="text" v-model="productValue.productName" /></span>
    </div>
    <div class="d-f">
      <span> Ürün Kart Fiyatı</span>
      <span><input type="number" v-model="productValue.productCard" /></span>
    </div>
    <div class="d-f">
      <span> Ürün Nakit Fiyatı</span>
      <span><input type="number" v-model="productValue.productCash" /></span>
    </div>
    <div class="d-f">
      <span> Prim Türünü Seç</span>
      <span
        ><select v-model="productValue.productBonus">
          <option value="1">Yok</option>
          <option value="2">Kota</option>
          <option value="3">Adet</option>
        </select>
      </span>
    </div>
    <div class="d-f" v-if="productValue.productBonus !== '1'">
      <span>Prim Fiyatı</span>
      <span
        ><input
          type="number"
          name=""
          id=""
          v-model="productValue.productBonusPrice"
      /></span>
    </div>
    <div class="d-f" v-if="productValue.productCategory !== 1">
      <span>Paket Ücretlerini Aç</span>
      <span
        ><input
          type="checkbox"
          name=""
          id=""
          :checked="isChecked"
          @change="toggleCheckbox"
      /></span>
    </div>
    <div class="seans space-around" v-if="isChecked()">
      <div>
        <span> Seans Sayısı </span>
        <span>
          <input type="number" v-model="seansNumber" />
        </span>
      </div>
      <div>
        <span> Paket Ücreti (Nakit) </span>
        <span>
          <input type="number" v-model="packagePriceCash" />
        </span>
      </div>
      <div>
        <span> Paket Ücreti (Kart) </span>
        <span style="display: flex; align-items: center">
          <input type="number" v-model="packagePriceCard" />
          <span @click="addSeans" class="addSeans">
            <img src="@/assets/image/runnincAcc/addPackage.svg" alt="" />
          </span>
        </span>
      </div>
    </div>
    <div
      v-if="productValue.packages.length > 0"
      class="d-f w-full space-around"
    >
      <div
        v-for="value in productValue.packages"
        :key="value.id"
        class="d-f w-full"
      >
        <div>Seans Sayısı : {{ value.seansNumber }}</div>
        <div>Kart Fiyatı : {{ value.packagePriceCash }}</div>
        <div>Nakit Fiyatı : {{ value.packagePriceCard }}</div>
        <div style="padding-left: 5px" @click="deleteSeans(value)">
          <img src="@/assets/image/runnincAcc/deleteOrder.svg" alt="" />
        </div>
      </div>
    </div>
    <div class="d-f saveButton">
      <button @click="saveProduct">
        <img src="@/assets/image/runnincAcc/save.svg" alt="" />
        &nbsp;{{ saveButtonText }}
      </button>
    </div>
  </div>
</template>
<style scoped>
.addSeans {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin-left: 34px;
  cursor: pointer;
}
.saveButton {
  display: flex;
  width: 70%;
}
.seans span {
  justify-content: center;
  align-items: center;
  padding-bottom: 5px;
}
.seans {
  color: #567488;
  font-size: 14px;
  display: flex;
}
.seans input {
  background-color: white;
  border: 1px solid #ff9291;
  border-radius: 15px;
  padding: 7px 15px;
  color: #ff9291;
  max-width: 100px;
}
option {
  padding: 10px 0px;
}
select:focus {
  outline: none;
  color: #ff9291;
}
button {
  color: #ff9291;
  display: flex;
  width: 100%;
  padding: 15px 0px;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  font-weight: 600;
  background-color: #fff3f3;
  cursor: pointer;
  border: 2px solid #ff9291;
  border-radius: 6px;
}
input:focus {
  border: 1px solid #ad1e1b;
  outline: none;
}
select {
  width: 150px;
  background-color: white;
  border: 1px solid #ff9291;
  border-radius: 15px;
  padding: 7px;
}

h2 {
  color: #567488;
  font-weight: 600;
  text-align: center;
}
.d-f {
  font-size: 15px;
  color: #567488;
}

.d-f input {
  background-color: white;
  border: 1px solid #ff9291;
  border-radius: 15px;
  padding: 7px 15px;
  color: #ff9291;
}

.popUpClose {
  display: flex;
  position: absolute;
  top: 8px;
  right: 8px;
}
div span:first-child {
  display: flex;
  width: 230px;
  align-items: center;
}
.addProductContainer {
  display: flex;
  border-radius: 18px;
  flex-direction: column;
  background-color: #f5f5f5;
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  padding: 32px;
  row-gap: 15px;
  align-items: center;
  justify-content: center;
}
.seans div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
<script scoped>
import axios from "axios";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      addProduct: {
        productCategory: "",
        productPhoto: "",
        productName: "",
        productPriceCash: "",
        productPriceCard: "",
        openPackageCheck: false,
        productBonus: "1",
        productBonusPrice: 0,
        packages: [],
      },
      seansNumber: 0,
      packagePriceCash: 0,
      packagePriceCard: 0,
      selectedFile: "",
      saveButtonText: "Kaydet",
    };
  },
  methods: {
    deleteSeans(value) {
      console.log(value);
      this.productValue.packages = this.productValue.packages.filter(
        (item) => item.seansID !== value.seansID
      );
    },
    isChecked() {
      return this.productValue.openPackageStatus == 1 ? true : false;
    },
    toggleCheckbox() {
      this.productValue.openPackageStatus == "1"
        ? (this.productValue.openPackageStatus = "0")
        : (this.productValue.openPackageStatus = "1");
    },
    closePopUp() {
      this.$store.dispatch("PopUp/openPopUp");
    },
    addSeans() {
      if (
        this.seansNumber !== 0 &&
        this.packagePriceCash !== 0 &&
        this.packagePriceCard !== 0
      ) {
        const addPackage = {
          seansID: Date.now(),
          seansNumber: this.seansNumber,
          packagePriceCash: this.packagePriceCash,
          packagePriceCard: this.packagePriceCard,
        };

        this.productValue.packages.push(addPackage);
        this.seansNumber = 0;
        this.packagePriceCash = 0;
        this.packagePriceCard = 0;
      }
    },
    async uploadImage() {
      const formData = new FormData();
      formData.append("file", this.selectedFile);

      return axios
        .post("http://backend.laragon/add_photo.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.data.status == 200) {
            this.productValue.productPhoto = response.data.file_name;
          }
        });
    },
    saveProduct() {
      if (
        this.selectedFile !== "" &&
        this.productValue.productCategory !== "" &&
        this.productValue.productName !== "" &&
        this.productValue.productPriceCash !== "" &&
        this.productValue.productPriceCard !== "" &&
        ((this.productValue.productBonus !== "1" &&
          this.productValue.productBonusPrice > 0) ||
          this.productValue.productBonus == "1")
      ) {
        this.uploadImage().then(() => {
          this.uploadProduct();
        });
      } else {
        alert("Lütfen Eksik Bilgi Olmadığından Emin Olunuz");
      }
    },
    uploadProduct() {
      axios
        .post("http://backend.laragon/add_product.php", this.addProduct)
        .then(() => {
          this.saveButtonText = "Kaydedildi";
          setTimeout(() => {
            this.closePopUp();
          }, 1000); //
        });
    },
    uploadFile() {
      const fileInput = this.$refs.fileInput;
      this.selectedFile = fileInput.files[0];
    },
  },
  computed: {
    ...mapGetters({
      categories: "NavMenu/_navMenuItems",
      productValue: "Product/_editProductValue",
    }),
  },
  created() {
    console.log(this.productValue);
    this.productValue.packages = JSON.parse(this.productValue.packages);
  },
};
</script>
