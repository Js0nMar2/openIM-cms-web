<template>
    <div class="common-layout">
        <el-container style="height: 100%;">
            <el-aside width="670px" class="login-left">
                <div class="login-left-top">
                    <div class="spanLo">
                        账号登录
                    </div>
                </div>
                <div class="login-left-bottom">
                    <div class="welcome">欢迎登录</div>
                    <div class="span"></div>
                    <div class="info">轻松高效管理海量信息数据</div>
                    <div class="info">让每一次承诺都如约进行</div>
                    <div class="info" style="padding-top: 10px;">
                        Copyright © 2017-2023 wanfu.network All Rights Reserved.</div>
                </div>
            </el-aside>
            <el-main>
                <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px"
                    class="el-form login-form">
                    <h3 class="title">open im 后台管理系统</h3>
                    <el-form-item prop="adminID">
                        <el-input v-model="ruleForm.adminID" type="text" autocomplete="off" placeholder="账号" />
                    </el-form-item>
                    <el-form-item prop="secret">
                        <el-input v-model="ruleForm.secret" type="password" autocomplete="off" placeholder="密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model="remember" label="记住密码" />
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="login(ruleFormRef)" style="width: 100%;">登录</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>

    </div>
</template>

<script lang="ts" setup>
import {
    reactive, ref, onMounted, getCurrentInstance
} from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { adminService } from '@/assets/axios/axios'
import * as auth from '@/assets/auth/auth'

const route = useRouter()

let remember = ref(false)

const ruleFormRef = ref<FormInstance>()

const checkAdminID = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入账号'))
    }
    callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请输入密码'))
    } else {
        callback()
    }
}

const ruleForm = reactive({
    adminID: '',
    secret: '',
    operationID: '0'
})

const rules = reactive({
    adminID: [{ validator: checkAdminID, trigger: 'blur' }],
    secret: [{ validator: validatePass, trigger: 'blur' }],
})

const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid: any) => {
        if (valid) {
            adminService.post("/cms/admin/login", ruleForm).then(result => {
                if (result.data.errCode == 0) {
                    ElMessage.success('登录成功')
                    localStorage.setItem(auth.ADMIN_INFO, JSON.stringify(result.data.data));
                    route.push({ name: 'backend' })
                } else {
                    ElMessage.error('账号或密码不正确')
                }
            })

            if (remember.value) {
                auth.setCookie(ruleForm.adminID, ruleForm.secret, 7)
            } else {
                auth.clearCookie()
            }
        } else {
            console.log('error submit!')
            return false
        }
    })
}


onMounted(() => {
    auth.getCookie(ruleForm, remember)
})
</script>
<style>
.common-layout {
    height: 100%;
}

.login-left {
    background-image: url(../assets/img/bcLeft.bcff90db.png);
    background-color: rgba(255, 255, 255, 0.11);
    background-repeat: no-repeat;
    background-size: cover;
}

.login-left .login-left-bottom {
    display: flex;
    flex-direction: column;
    margin-left: 58px;
    position: absolute;
    bottom: 0;
    left: 0;
}

.login-left .login-left-bottom .welcome {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
}

.login-left .login-left-bottom .info {
    font-size: 18px;
    font-weight: bold;
    color: #ffffff;
}

.login-left .login-left-top .spanLo {
    font-size: 48px;
    font-weight: bold;
    color: #ffffff;
}

.login-left .login-left-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px 0 0 50px;
}

.login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 239px 35px 0;
    margin: 0 auto;
    overflow: hidden;
}

.title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
    font-weight: bold;
}
</style>