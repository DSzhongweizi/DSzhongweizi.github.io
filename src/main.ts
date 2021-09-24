import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { createHead } from "@vueuse/head";

const app = createApp(App);
const head = createHead();
app.use(head);
app.use(store).use(router).mount("#app");
