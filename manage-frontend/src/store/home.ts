import { defineStore } from "pinia";
import { ref } from "vue";

export const useHomeStore = defineStore(
  "home",
  () => {
    const collapsed = ref(false); // 是否折叠
    const homeData = ref(); // 首页数据
    // 控制面板的折叠展开
    const toggleCollapse = () => {
      collapsed.value = !collapsed.value;
    };

    // 获取首页数据
    const saveHomeData = (data: any) => {
      homeData.value = data;
    };

    return { collapsed, homeData, toggleCollapse, saveHomeData };
  },
  {
    persist: true, // 是否开启持久化， 默认存储到localStorage
  },
);
