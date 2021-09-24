<template>
  <el-container>
    <!-- 页面侧边栏 -->
    <el-aside>
      <el-menu>
        <el-menu-item
          v-for="amenu in asideMenu"
          :key="amenu.path"
          :index="amenu.path"
        >
          <i
            :class="`iconfont icon-${amenu.path}`"
            style="margin-right: 8px"
          ></i>
          <template #title>{{ amenu.title }}</template>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <!-- 页面主体 -->
    <el-main>
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElMain, ElMenu, ElMenuItem } from "element-plus";
import { computed, reactive, ref } from "@vue/runtime-core";
import { useStore } from "vuex";
const store = useStore();
const asideMenu = computed(() => store.state.asideMenu);
</script>
<style lang="scss" scoped>
.el-container {
  position: relative;
  top: 60px;
  height: auto;
  .el-aside {
    position: fixed;
    height: 100%;
    background-color: #fff;
  }
  .el-main {
    background-color: #fff;
    opacity: 0.8;
    color: #000;
    max-width: 60%;
    overflow: hidden;
    margin: 0 auto;
    min-height: min-content;
    ::v-deep(.markdown-body) {
      text-align: left;
    }
  }
}

.el-menu-item {
  text-align: left;
}
</style>
