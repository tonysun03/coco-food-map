import { createApp } from "vue";
import "./style.css";
import App from "./App.tsx";
import "ant-design-vue/dist/reset.css";
import router from "./router";
import pinia from "./store";

createApp(App).use(router).use(pinia).mount("#app");
