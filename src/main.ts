import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Http from "./api/axios";
import { createHead } from "@vueuse/head";

const app = createApp(App);
const head = createHead();
app.use(head);
app.config.globalProperties.$http = Http
app.use(store).use(router).mount("#app");
