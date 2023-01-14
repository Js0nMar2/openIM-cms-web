<template>
    <div style="background-color: rgb(241, 243, 247);">
        <div style="height:100px;border-radius: 10px;background-color: white;"></div>
        <div style="border-radius: 10px;background-color: white;margin: 20px 0 0 0;">
            <div style="padding: 15px 15px 0 15px;">
                <el-button type="primary">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <span style="padding: 0 2px;">新增</span>
                </el-button>
            </div>
            <div style="margin: 10px 0; padding: 0 15px;">
                <el-table :data="tableData" border
                    :header-cell-style="{ height: '45px', fontWeight: '800', fontSize: '20px', color: 'black', textAlign: 'center', backgroundColor: '#d8e1f1' }"
                    style="width: 100%">
                    <el-table-column prop="userID" label="用户ID" width="180" />
                    <el-table-column prop="nickname" label="昵称" width="180" />
                    <el-table-column prop="phoneNumber" label="手机号" />
                    <el-table-column prop="lastLoginTime" label="上次登录时间" />
                    <el-table-column prop="isBlock" label="是否封禁" />
                </el-table>
            </div>
            <div style="display: flex;justify-content: space-around;height: 80px;">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                    :page-sizes="[10, 20, 50]" :background="background" layout="total, sizes, prev, pager, next, jumper"
                    :total="totalNum" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, watch } from 'vue'
import { userService } from '@/assets/axios/axios'
const totalNum = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)
const background = ref(true)
let tableData = [
    {
        userID: '2016-05-03',
        nickname: 'Tom',
        phoneNumber: 'No. 189, Grove St, Los Angeles',
        lastLogintime: '2016-05-03',
        isBlock: false
    }
]

const userPage = reactive({
    operationID: '0',
    pageNumber: 1,
    showNumber: 10,
})

const handleSizeChange = (val: number) => {
    pageSize.value = val
}
const handleCurrentChange = (val: number) => {
    userPage.operationID = '0'
    userPage.pageNumber = val
    userPage.showNumber = pageSize.value
    getUserPage(userPage)
}
const getUserPage = (userPage: any) => {
    userService.post('/user/get_users', userPage,).then(result => {
        if (result.data.errCode == 0) {
            console.log(result.data.data)
            let data = result.data.data
            totalNum.value = data.totalNum
            pageSize.value = data.showNumber
            currentPage.value = data.currentPage
            tableData = data.userList
        }
    }).catch(err => { })
}
onMounted(() => {
    getUserPage(userPage)
})
</script>
<style scoped>
.demo-pagination-block+.demo-pagination-block {
    margin-top: 10px;
}

.demo-pagination-block .demonstration {
    margin-bottom: 16px;
}

.tableHeader {
    font-size: 15px;
    font-weight: 600;
}
</style>