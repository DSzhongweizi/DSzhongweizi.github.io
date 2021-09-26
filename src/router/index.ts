import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import docRoutes from "virtual:generated-pages";
import ArticleList from "../views/ArticleList.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:views",
    name: "articleList",
    component: ArticleList,
  },
  ...docRoutes,
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
