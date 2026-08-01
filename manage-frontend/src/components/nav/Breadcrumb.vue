<template>
  <a-breadcrumb style="margin: 16px 0">
    <a-breadcrumb-item v-for="(item, index) in breadcrumbData">
      <span class="no-link" v-if="index === breadcrumbData.length - 1">{{
        item.meta.title
      }}</span>
      <router-link v-else :to="item.path">{{ item.meta.title }}</router-link>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const breadcrumbData = computed(() => {
  return useRoute().matched.filter((f: any) => f.meta && f.meta.title);
});
</script>
