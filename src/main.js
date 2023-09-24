import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/MainStyle.css";

const vueApp = createApp(App);
vueApp.use(store);
vueApp.use(router);
vueApp.mount("#app");
