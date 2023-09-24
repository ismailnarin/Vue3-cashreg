<template>
  <div>
    <div>{{ secondNumber }}</div>
    <div>{{ operator }}</div>
    <div>{{ firstNumber == "" ? 0 : firstNumber }}</div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      firstNumber: "Calculator/_firstNumber",
      operator: "Calculator/_operator",
      secondNumber: "Calculator/_secondNumber",
    }),
  },
};
</script>
