<template>
  <a-layout-sider
    v-model:collapsed="collapsed"
    :trigger="null"
    collapsible
    width="200"
    style="background: #fff">
    <a-menu
      v-model:openKeys="state.openKeys"
      v-model:selectedKeys="state.selectedKeys"
      mode="inline"
      :items="items"
      @click="onClickItem"></a-menu>
  </a-layout-sider>
</template>

<script setup lang="ts" name="Sider">
import {
  DesktopOutlined,
  UserOutlined,
  LaptopOutlined,
  ToolOutlined,
} from "@ant-design/icons-vue";
import { useRouter, useRoute } from "vue-router";
import { useHomeStore } from "@/store/home";
import { storeToRefs } from "pinia";
import { onBeforeMount, reactive } from "vue";
interface ISider {
  selectedKeys: string[];
  openKeys: string[];
}
const store = useHomeStore();
// 为了从 store 中提取属性时保持其响应性，你需要使用 storeToRefs()。它将为每一个响应式属性创建引用。当你只使用 store 的状态而不调用任何 action 时，它会非常有用。
const { collapsed } = storeToRefs(store); //菜单是否收起状态
const router = useRouter(); //用于返回当前路由实例，常用于实现路由跳转
const route = useRoute(); //用于返回当前路由信息对象，用于接收路由参数
const state = reactive<ISider>({
  selectedKeys: [], //当前选中的菜单项 key 数组
  openKeys: ["sys"], //当前展开的 SubMenu 菜单项 key 数组
});
//页面刷新时，自动高亮左侧菜单并展开当前页所在菜单
onBeforeMount(() => {
  state.selectedKeys = [route.name as string];
  const curOpenKey =
    route.matched.length > 1 ? (route.matched[1].name as string) : "";
  if (curOpenKey && !state.openKeys.includes(curOpenKey)) {
    state.openKeys.push(curOpenKey);
  }
});
//这里目前是静态的，实际工作中通常是从后端接口返回的权限菜单动态构造的
const items = reactive([
  {
    key: "home",
    icon: () => h(DesktopOutlined),
    label: "仪表盘",
    title: "仪表盘",
  },
  {
    key: "user",
    icon: () => h(UserOutlined),
    label: "用户管理",
    title: "用户管理",
    children: [
      {
        key: "user-list",
        label: "用户列表",
        title: "用户列表",
      },
    ],
  },
  {
    key: "courser",
    icon: () => h(LaptopOutlined),
    label: "课程管理",
    title: "课程管理",
    children: [
      {
        key: "courser-list",
        label: "课程列表",
        title: "课程列表",
      },
      {
        key: "courser-category",
        label: "课程分类",
        title: "课程分类",
      },
    ],
  },
  {
    key: "sys",
    icon: () => h(ToolOutlined),
    label: "系统配置",
    title: "系统配置",
    children: [
      {
        key: "base-info",
        label: "基础信息",
        title: "基础信息",
      },
      {
        key: "logout",
        label: "退出登录",
        title: "退出登录",
      },
    ],
  },
]);
//点击菜单
const onClickItem = (item: any) => {
  console.log("item", item); //key keyPath
  router.push({ name: item.key });
};
</script>

<style lang="scss" scoped></style>
