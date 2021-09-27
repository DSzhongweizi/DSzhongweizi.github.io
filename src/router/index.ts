import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import docRoutes from "virtual:generated-pages";
import ArticleList from "../views/ArticleList.vue";
import Editor from "../views/Editor.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/:views",
    name: "articleList",
    component: ArticleList,
  },
  {
    path: "/edit",
    name: "editor",
    component: Editor,
  },
  ...docRoutes,
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
