<template>
  <!-- <Login /> -->
  <el-config-provider :locale="locale">
    <!-- 这里是内容 -->
    <router-view></router-view>
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
let locale = zhCn
</script>

<style>
body {
  display: block;
  margin: 0;
}

#application {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>