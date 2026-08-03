<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" class="w100" :key="route.path" />
  </router-view>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.w100 {
  width: 100%;
}
</style>
