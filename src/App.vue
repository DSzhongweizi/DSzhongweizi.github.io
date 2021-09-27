<!--
 * @Author: DS
 * @Date: 2021-08-13 23:57:13
 * @LastEditTime: 2021-08-23 00:14:27
 * @LastEditors: DS
 * @Description: desc
 * @FilePath: \myblog\src\App.vue
-->
<template>
  <Index v-if="$route.path == '/'" />
  <template v-else>
    <Header />
    <Container>
      <router-view />
    </Container>
  </template>
</template>

<script setup lang="ts">
import Index from "cp/layout/Index.vue";
import Header from "cp/layout/Header.vue";
import Container from "cp/layout/Container.vue";
</script>

<style lang="scss">
html,
body {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  color: #fff;
  a {
    text-decoration: none;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    background-color: #ecf5ff;
    /* margin-top: 60px; */
    width: 100%;
    height: 100%;
    color: #fff;
    overflow-x: hidden;
  }
}
.el-header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-container {
  height: 100%;
}
.el-aside {
  width: unset !important;
}
</style>
