<template>
  <Index v-if="$route.path == '/'" />
  <template v-else>
    <Header />
    <Container>
      <div class="main-box"><router-view /></div>
    </Container>
  </template>
</template>

<script setup lang="ts"></script>

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
.main-box {
  max-width: 60%;
  background-color: #fff;
  margin: 0 auto;
  padding: 24px;
  text-align: center;
}
</style>
