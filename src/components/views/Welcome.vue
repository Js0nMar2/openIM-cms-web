<template>
    <div style="display: flex;">
        <el-image :src="welcomeUrl" :fit="fit" style="width: 60%;left: 20%;" />
        <div style="font-size: 35px;width: 50%;padding-top: 7%;">
            <h1 style="font-weight: 600;">欢迎进入</h1>
            <h3 style="color: #1890ff;font-weight: 600;">openIM后台管理系统</h3>
        </div>
    </div>

</template>
<script lang="ts" setup>
const welcomeUrl = '../../src/assets/img/backstage_welcome.bf41ebd1.png'
const fit = 'fill'
</script>