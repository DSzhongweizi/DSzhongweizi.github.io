<template>
  <el-header>
    <img src="/logo.png" class="logo" @click="$router.push('/')" />
    <el-menu :default-active="currentActiveRoute" mode="horizontal">
      <el-menu-item
        v-for="menu in menus"
        :key="menu.path"
        :index="menu.path"
        @click="$router.push(menu.path)"
        >{{ menu.title }}</el-menu-item
      >
    </el-menu>
    <div class="func">
      <i class="iconfont icon-edit" @click="$router.push('/edit')"></i>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { ElHeader, ElMenu, ElMenuItem } from "element-plus";
import { ref, reactive, watchEffect } from "@vue/runtime-core";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
const store = useStore();
const route = useRoute();
const currentActiveRoute = ref("home");
const menus = reactive([
  {
    path: "/home",
    title: "首页",
  },
  {
    path: "/front-end-dev",
    title: "前端开发",
    children: [
      {
        path: "basic",
        title: "基础",
      },
      {
        path: "vue",
        title: "Vue",
      },
      {
        path: "browser",
        title: "浏览器",
      },
    ],
  },
  {
    path: "/back-end-dev",
    title: "后端开发",
    children: [
      {
        path: "java",
        title: "Java",
      },
    ],
  },
  {
    path: "/science-garden",
    title: "科学园地",
    children: [
      {
        path: "astronomy",
        title: "天文",
      },
      {
        path: "math",
        title: "数学",
      },
      {
        path: "physics",
        title: "物理",
      },
    ],
  },
  {
    path: "/history-world",
    title: "文史天地",
    children: [
      {
        path: "history",
        title: "历史",
      },
      {
        path: "in-a-word",
        title: "一句话",
      },
    ],
  },
]);

watchEffect(() => {
  currentActiveRoute.value = route.path;
  store.commit(
    "setAsideMenu",
    menus.find((cur) => cur.path == route.path)?.children
  );
});
</script>
<style lang="scss" scoped>
.logo {
  position: absolute;
  height: 40px;
  left: 8px;
}
.el-header {
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: #fff;
  box-shadow: 0 3px 8px 6px rgba(7, 17, 27, 0.06);
}
.func {
  position: absolute;
  right: 24px;
  .iconfont {
    color: #000;
    font-size: 24px;
  }
}
</style>
