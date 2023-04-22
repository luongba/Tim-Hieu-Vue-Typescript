import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import router from "./router";
import vuex from "./vuex";
import { createStore } from "vuex";
const store = createStore(vuex);


createApp(App).use(router).use(store).mount("#app");

