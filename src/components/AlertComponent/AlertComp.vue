<template>
  <div class="alertContainer">
    <div :class="alertType">
      {{ alertText }}
    </div>
  </div>
</template>
<style scoped>
.alertContainer {
  pointer-events: none;
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 150;
  justify-content: center;
}
.warning {
  display: flex;
  padding: 15px 50px;
  background-color: #ff9291;
  border-radius: 0px 0px 15px 15px;
  color: white;
  font-weight: 700;
  box-shadow: 0 1px 8px red;
}
.success {
  display: flex;
  padding: 15px 50px;
  background-color: #b8deff;
  border-radius: 0px 0px 15px 15px;
  color: #567488;
  font-weight: 700;
  box-shadow: 0 1px 8px #009fff;
}
</style>
<script scoped>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      alertClass: "warning",
    };
  },
  computed: {
    ...mapGetters({
      alertText: "Alert/_alertText",
      alertType: "Alert/_alertType",
    }),
  },
};
</script>
