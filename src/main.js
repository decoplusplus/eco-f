import "./assets/styles/main.scss";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import VueClipboard from "vue-clipboard2";

import ToastPlugin from "vue-toast-notification";
import { createMetaManager } from "vue-meta";
//import 'vue-toast-notification/dist/theme-default.css';
import "vue-toast-notification/dist/theme-bootstrap.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ToastPlugin);
app.use(VueClipboard);
app.use(createMetaManager());
app.mount("#app");
