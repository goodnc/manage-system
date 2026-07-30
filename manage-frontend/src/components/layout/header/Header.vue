<template>
  <a-layout-header class="header">
    <span
      class="icon-btn"
      @click="toggleCollapsed"
      :title="collapsed ? '展开' : '折叠'">
      <menu-unfold-outlined v-if="collapsed" class="trigger" />
      <menu-fold-outlined v-else class="trigger" />
    </span>
    <div class="logo">
      <img src="../../../assets/hero.png" alt="logo" />
    </div>
    <a-menu theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys">
      <a-menu-item key="1">帮助中心</a-menu-item>
      <a-menu-item key="2">博客首页</a-menu-item>
      <a-menu-item key="3">个人中心</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>

<script setup lang="ts">
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons-vue";
import { useHomeStore } from "@/store/home";
import { storeToRefs } from "pinia";
import { ref } from "vue";
const store = useHomeStore();
const { toggleCollapsed } = store;
const { collapsed } = storeToRefs(store);
const selectedKeys = ref<string[]>(["3"]);
</script>

<style lang="scss" scoped>
.ant-layout-header {
  display: flex;
  padding-left: 0px;
}
.logo {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.2);
  > img {
    height: 100%;
  }
}
.icon-btn {
  display: flex;
  justify-content: center;
  width: 50px;
  color: white;
  align-items: center;
  .anticon {
    font-size: 24px;
    &:hover {
      color: lightblue;
    }
  }
}
</style>
