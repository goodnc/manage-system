import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
// 创建
const pinia = createPinia();
// 固化
pinia.use(piniaPluginPersistedState);
// 导出
export default pinia;
