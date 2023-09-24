<template>
  <div class="leftContainer">
    <router-link :to="{ name: 'home' }">
      <div class="logoContainer">
        <img src="@/assets/image/LeftMenu/logo.svg" alt="" />
      </div>
    </router-link>
    <hr />
    <div class="leftMenuContainer">
      <div
        v-for="item in MenuItems"
        :key="item.id"
        class="menuItems"
        @click="openPage(item.component)"
      >
        <span v-if="item.component">
          <img :src="getImagePath(item.image)" alt="" />
        </span>
        <span v-if="item.component" class="text-blue text-medium text-size pt">
          {{ item.text }}
        </span>

        <router-link :to="{ name: item.router }" v-if="!item.component">
          <img :src="getImagePath(item.image)" alt="" />
        </router-link>
        <router-link
          :to="{ name: item.router }"
          class="text-blue text-medium text-size pt"
          v-if="!item.component"
        >
          {{ item.text }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  methods: {
    getImagePath(image) {
      return require(`@/assets/image/LeftMenu/${image}`);
    },
    openPage(component) {
      if (component !== "") {
        this.$store.dispatch("PopUp/openPopUp");
        this.$store.dispatch("PopUp/changePopUpComponent", component);
      }
    },
  },
  computed: {
    ...mapGetters({
      MenuItems: "LeftMenu/_leftMenuItems",
    }),
  },
};
</script>
<style scoped>
.leftContainer {
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  height: 100%;
}
.logoContainer {
  padding: 37px 0px;
  display: flex;
  justify-content: center;
}
hr {
  border-top: 3px solid #ff9291;
}
.leftMenuContainer {
  display: flex;
  flex-direction: column;
  padding: 25px;
  row-gap: 40px;
  width: 213px;
}
.menuItems {
  display: flex;
  align-items: center;
  column-gap: 8px;
  text-decoration: none;
}

.LeftMenuContainer span {
  min-width: 40px;
}
.text-size {
  font-size: 15px;
  text-decoration: none;
}
</style>
