<template>
  <transition>
    <PopUp v-if="popUpStatus" />
  </transition>
  <div class="mainContainer">
    <div class="zindex" v-if="isAuth">
      <LeftMenu />
    </div>
    <div class="d-f w-full flex-column" style="overflow: hidden">
      <div class="topContainer zindex" v-if="isAuth">
        <TopHeader />
      </div>
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.zindex {
  z-index: 10;
}
.topContainer {
  box-shadow: 4px 0px 3px 0px rgb(0 0 0 / 39%);
  display: flex;
  width: 100%;
  min-height: 74px;
}
.mainContainer {
  display: flex;
  height: 100%;
}
</style>
<script>
import { mapGetters } from "vuex";
import LeftMenu from "@/components/LeftMenu/LeftMenu";
import TopHeader from "@/components/TopHeader/TopHeader";
import PopUp from "@/components/PopUp/PopUp";
export default {
  components: {
    LeftMenu,
    TopHeader,
    PopUp,
  },
  computed: {
    ...mapGetters({
      popUpStatus: "PopUp/_popUpStatus",
      isAuth: "Auth/_isAuth",
    }),
  },
};
</script>
