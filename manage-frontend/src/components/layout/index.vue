<template>
  <a-layout>
    <Header></Header>
    <a-layout>
      <Sider></Sider>
      <a-layout style="padding: 0 24px 10px">
        <Breadcrumb></Breadcrumb>
        <a-layout-content>
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script lang="ts" setup>
import Breadcrumb from "../nav/Breadcrumb.vue";
import Header from "./header/Header.vue";
import Sider from "./sider/Sider.vue";
</script>

<style lang="scss" scoped>
.ant-layout-content {
  height: calc(100vh-128px);
  background: #fff;
  padding: 24px;
  margin: 0;
}
</style>
