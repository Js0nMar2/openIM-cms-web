<template>
    <el-container class="layout-container-demo" style="height: 100%">
        <div class="sidebar-box">
            <div class="sidebar-div">
                <el-image style="width: 33px; height: 32px; border-radius: 20px; padding: 6px; position: absolute;"
                    :src="faviconUrl" :fit="fit" />
                <Transition name="slide-fade">
                    <h1 class="sidebar-title" v-if="!isCollapse" v-cloak>万福网络-openIM后台</h1>
                </Transition>
            </div>
            <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-active="menuItem"
                style="top:45px" :collapse="isCollapse">
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><icon-menu /></el-icon><span style="left: 10px;">系统管理</span>
                    </template>
                    <el-menu-item-group v-for="(value, key) in tabSet" :key="key">
                        <el-menu-item @click="menuItemClick" :index="value.index">{{
                            value.title
                        }}</el-menu-item>
                    </el-menu-item-group>
                </el-sub-menu>
            </el-menu>
        </div>
        <div style="width: 100%;height:100%;background-color: rgb(241, 243, 247);">
            <div class="main-header">
                <div class="main-breadcrumb">
                    <div style="top: 4px; right: 8px;cursor: pointer;">
                        <span @click="isCollapse = true">
                            <el-icon :size="20" v-show="!isCollapse">
                                <Expand />
                            </el-icon>
                        </span>
                        <span @click="flodSidebar">
                            <el-icon :size="20" v-show="isCollapse">
                                <Fold />
                            </el-icon>
                        </span>
                    </div>
                    <el-breadcrumb :separator-icon="ArrowRight">
                        <el-breadcrumb-item :to="{ path: '/index/welcome' }"><span>openIM主页</span></el-breadcrumb-item>
                        <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                        <el-breadcrumb-item><span style="color: burlywood;cursor: text;">{{
                            label
                        }}</span></el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="toolbar">
                    <el-image style="width: 45px; height: 45px; border-radius: 20px; cursor: pointer; padding: 5px;"
                        :src="url" :fit="fit" />
                    <el-dropdown style="cursor: pointer;">
                        <span class="username">{{ userName }}</span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </div>
            <div class="main-tabs">
                <el-tabs v-model="editableTabsValue" type="card" class="demo-tabs" closable @tab-remove="removeTab"
                    @tab-click="tabClick" style="width:100%;background-color: rgb(241, 243, 247); border-radius: 5px;">
                    <el-tab-pane v-for="item in editableTabs" :key="item.name" :label="item.title" :name="item.name"
                        :closable="tabClose" style="height: 100%;">
                    </el-tab-pane>
                    <el-main>
                        <!-- <router-view v-slot="{ Component, route: croute }">
                            <keep-alive>
                                <component :is="Component" :key="croute.path" />
                            </keep-alive>
                        </router-view> -->
                        <router-view></router-view>
                    </el-main>
                </el-tabs>
            </div>
        </div>
    </el-container>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { Menu as IconMenu, Message, Setting, ArrowRight, Document, Location, } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router';
import * as auth from '@/assets/auth/auth'
const route = useRouter()
const adminInfo = auth.getStorageObj(auth.ADMIN_INFO)
const userName = adminInfo.userName
const url = '../src/assets/img/hippo4j.ecba1844.gif'
const faviconUrl = 'data:image/png;base64,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'
const fit = 'cover'
let label = ref('')
let menuItem = ref('')
let tabClose = ref<boolean>(false)
let isCollapse = ref(false)
// {  name: 'user', title: '用户管理',}
let tabMap: Map<string, string> = new Map();
// { name: 'user', meta.name: '用户管理'}
let routeMap: Map<string, string> = new Map();
let tabSet: Set<any> = new Set();
const logout = () => {
    ElMessageBox.confirm(
        '确定注销并退出系统吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then((action) => {
        if (action === 'confirm') {
            auth.removeStorage(auth.ADMIN_INFO)
            route.push({ name: 'login' })
        }
    }).catch(() => { })

}
const flodSidebar = () => {
    console.log('flodSidebar')
    isCollapse.value = false
}
const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}

const menuItemClick = (item: any, ev: Event) => {
    menuItem.value = item.index
    route.push({ name: item.index })
    let tabs = editableTabs.value
    const tab = tabMap.get(item.index)!
    let tabEx = tabs.filter((tab) => tab.name == item.index)
    if (tabEx.length > 0) {
        return
    }
    tabs.push({
        title: tab,
        name: item.index
    })
}

let editableTabsValue = ref('welcome')

watch(
    () => route.currentRoute.value,
    (newValue: any) => {
        let tabs = editableTabs.value
        let welcomTab = tabs.filter((tab) => tab.name == newValue.name)
        let tabName: string = tabMap.get(newValue.name)!
        if (welcomTab.length == 0) {
            if (newValue.name == 'welcome') {
                tabs.unshift({
                    title: newValue.meta.name,
                    name: tabName
                })
            } else {
                tabs.push({
                    title: newValue.meta.name,
                    name: tabName
                })
            }

        }
        editableTabsValue.value = tabName
        editableTabsValue = ref(newValue.name)
        label.value = tabName
    },
    // { immediate: true }
)

const tabClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab)
    const path = routeMap.get('' + tab.paneName)!
    route.push({ path })
    label.value = tab.props.label
}

onMounted(() => {
    route.push({ path: '/index/welcome' })
    let tabs = editableTabs.value
    tabs.pop()
    tabs.push({
        title: 'openIM主页',
        name: 'welcome'
    })
    route.getRoutes().forEach((item) => {
        if (item.children.length > 0) {
            item.children.forEach((it: any) => {
                if (it.meta.level != 2) {
                    return
                }
                tabMap.set(it.name, it.meta.name)
                routeMap.set(it.name, it.path)
                if (it.name != 'welcome') {
                    tabSet.add({ index: it.name, title: it.meta.name })
                }
            })
        }
    })
    label.value = 'openIM主页'
})

const editableTabs = ref([
    {
        title: '',
        name: ''
    }
])

const removeTab = (targetName: string) => {
    if (targetName === 'welcome') {
        tabClose.value = true
        return
    }
    const tabs = editableTabs.value
    let activeName = editableTabsValue.value
    if (activeName === targetName) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                }
            }
        })
    }
    editableTabsValue.value = activeName
    editableTabs.value = tabs.filter((tab) => tab.name !== targetName)
    route.push({ name: routeMap.get(activeName) })
    menuItem.value = activeName
}
</script>

<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    right: 20px;
    top: -1px;
}

.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}

.el-tabs {
    --el-tabs-header-height: 45px;
}

.username {
    padding: 5px 3px 0 3px;
    border-radius: 5px;
    color: orange;
    font-weight: 500;
    box-shadow: 1px 1px 2px #6b778c;
    height: 25px;
    background-color: aliceblue;
}

.sidebar-box {
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    height: 100%;
    z-index: 1;
    background-color: white;
    z-index: 2;
}

.sidebar-div {
    position: absolute;
    z-index: 999;
    text-align: center;
    padding-left: 15px;
    padding-top: 5px;
    cursor: pointer;
}

.sidebar-title {
    display: inline-block;
    font-weight: 600;
    font-size: 15px;
    font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
    vertical-align: middle;
    margin: 4px 0 0 30px;
}

:deep(.el-tabs__header) {
    background-color: white;
}

/* :deep(.el-tabs__content) {
    background-color: white;
} */

.el-divider--horizontal {
    display: block;
    height: 1px;
    width: 720px;
    border-top: 1px var(--el-border-color) var(--el-border-style);
    margin-top: 44px;
    position: absolute;
    right: 0;
}

.main-header {
    display: flex;
    justify-content: space-between;
    padding-left: 20px;
    box-shadow: 2px 0 6px rgb(0 21 41 / 35%);
    background-color: white;
    z-index: 1;
    height: 50px;
}

.main-breadcrumb {
    display: inline-flex;
    align-items: center;
}

.main-tabs {
    margin: 10px;
}

.main-box {
    padding: 1em;
    background-color: #f0f2f5;
    position: relative;
}

.slide-fade-enter-active {
    animation: bounce-in 0.3s ease-out 0.3s backwards;
}

@keyframes bounce-in {
    0% {
        transform: translate(0);
        opacity: 0;
    }

    50% {
        transform: translate(0);
        opacity: .5;
    }

    100% {
        transform: translate(0);
        opacity: 1;
    }
}
</style>
