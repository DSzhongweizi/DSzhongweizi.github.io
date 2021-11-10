<template>
  <ArticleItem v-for="route in routes" :key="route.name" :articleItem="route" />
  <el-empty v-if="!routes.length" description="正在努力创作中..."></el-empty>
</template>

<script setup lang="ts">
import { watch, watchEffect, ref } from "@vue/runtime-core";
import ArticleItem from "cp/ArticleItem.vue";
import docRoutes from "virtual:generated-pages";
import { RouteRecordRaw, useRoute } from "vue-router";
const route = useRoute();
const routes = ref<RouteRecordRaw[]>([]);
// 监听路由变化
watchEffect(
  () =>
    (routes.value = docRoutes?.filter(
      (r) => RegExp(route.path).test(r.path) || route.path == "/home"
    ))
);
// 监听路由hash变化
watch(
  () => route.hash,
  (hash) =>
    (routes.value = routes.value?.filter((h) =>
      (h?.meta?.frontmatter as { categories: [] })?.categories?.some((c) =>
        RegExp(hash.slice(1), "i").test(c)
      )
    )),
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
