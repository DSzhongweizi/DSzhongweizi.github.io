<template>
  <ArticleItem
    v-for="route in docRoutes?.filter(
      (cur) => RegExp($route.path).test(cur.path) || $route.path == '/home'
    )"
    :key="route.name"
    :articleItem="route"
  />
</template>

<script setup lang="ts">
import ArticleItem from "cp/ArticleItem.vue";
import docRoutes from "virtual:generated-pages";
console.log(docRoutes);
</script>
<style lang="scss" scoped></style>
