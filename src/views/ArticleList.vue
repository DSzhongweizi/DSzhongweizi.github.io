<template>
  <ArticleItem v-for="item in articles" :key="item.name" :articleItem="item" />
  <el-empty v-if="!articles.length" description="正在努力创作中..."></el-empty>
</template>

<script setup lang="ts">
interface Article {
 name:string,
}
import {
  watch,
  watchEffect,
  ref,
  onMounted,
  getCurrentInstance,
} from '@vue/runtime-core';
import ArticleItem from 'cp/ArticleItem.vue';
import docRoutes from 'virtual:generated-pages';
import { ComponentInternalInstance } from 'vue';
import { RouteRecordRaw, useRoute } from 'vue-router';
const route = useRoute();
const routes = ref<RouteRecordRaw[]>([]);
const { appContext } = getCurrentInstance() as ComponentInternalInstance
const { proxy } = appContext.config.globalProperties;
const articles = ref([]);
onMounted(async () => {
  await proxy.$http.queryArticle().then((res:any) => console.log(res));
});
// 监听路由变化
watchEffect(
  () =>
    (routes.value = docRoutes?.filter(
      (r) => RegExp(route.path).test(r.path) || route.path == '/home'
    ))
);
// 监听路由hash变化
watch(
  () => route.hash,
  (hash) =>
    (routes.value = routes.value?.filter((h) =>
      (h?.meta?.frontmatter as { categories: [] })?.categories?.some((c) =>
        RegExp(hash.slice(1), 'i').test(c)
      )
    )),
  { immediate: true }
);
</script>
<style lang="scss" scoped></style>
