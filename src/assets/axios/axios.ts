import axios from 'axios'
import * as auth from '@/assets/auth/auth'
//创建axios实例
const adminService = axios.create({
    // 设置baseURL地址
    baseURL: 'http://localhost:10006',
    //定义统一的请求头
    headers: {
        'Content-Type': "application/json;charset=UTF-8",
               'token': auth.getStorageObj(auth.ADMIN_INFO).token === null ? null : auth.getStorageObj(auth.ADMIN_INFO).token 
    },
    //配置请求超时时间
    timeout: 1000
})

const userService = axios.create({
    // 设置baseURL地址
    baseURL: 'http://localhost:10002',
    //定义统一的请求头
    headers: {
        'Content-Type': "application/json;charset=UTF-8",
        'token': auth.getStorageObj(auth.ADMIN_INFO).token === null ? null : auth.getStorageObj(auth.ADMIN_INFO).token 
    },
    //配置请求超时时间
    timeout: 1000
})

export {adminService,userService} 
