import { createApp } from "vue";
import App from "./App.vue";

import store from "./store";
import ArcoVue from "@arco-design/web-vue";
import "@arco-design/web-vue/dist/arco.css";
import { router } from "@/router";
import "@/access/index";
import ArcoVueIcon from "@arco-design/web-vue/es/icon";
import "bytemd/dist/index.css";

createApp(App)
  .use(store)
  .use(ArcoVue)
  .use(ArcoVueIcon)
  .use(router)
  .mount("#app");
