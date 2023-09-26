<template>
  <div class="d-f flex-row navBar pt">
    <div
      v-for="item in navMenuItems"
      :key="item.id"
      class="navItem"
      @click="setProductFilter(item.id)"
    >
      <div :style="selected == item.id ? selectedStyle : ''">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>
<style>
.navItem div {
  display: flex;
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0px 5px;
  user-select: none;
}
.navItem {
  width: 170px;
  padding: 0px 30px;
  color: #567488;
  position: relative;
  height: 55px;
}
.navBar {
  box-shadow: 0 0 8px 0px rgb(0 0 0 / 35%);
  border-radius: 16px;
  min-height: 55px;
  align-items: center;
  background-color: white;
  width: 50%;
  overflow: hidden;
  position: relative;
}
</style>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      selected: 1,
      selectedStyle:
        "    background-color: rgb(255, 243, 243);color: rgb(255, 172, 172);",
    };
  },
  methods: {
    setProductFilter(filterID) {
      this.$store.dispatch("Product/productFilter", filterID);
      this.$store.dispatch("Product/changeSelectFilter", filterID);
      this.selected = filterID;
    },
  },
  computed: {
    ...mapGetters({
      navMenuItems: "NavMenu/_navMenuItems",
    }),
  },
};
</script>
