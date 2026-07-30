import { createApp } from "vue";
import pinia from "./store/index";
import "ant-design-vue/dist/antd.css";
import "./style.css";
import App from "./App.vue";
const app = createApp(App);
app.use(pinia);
app.mount("#app");
