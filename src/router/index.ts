import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Backend from '../components/Backend.vue'
import Welcome from '../components/views/Welcome.vue'
import User from '../components/views/User.vue'
import Message from '../components/views/Message.vue'
import Group from '../components/views/Group.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'backend',
      component: Backend,
      meta: {
        auth: true
      },
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome,
          meta: {
            name: 'openIM主页',
            level: 2
          }
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          meta: {
            name: '用户管理',
            level: 2
          },
        },
        {
          path: 'message',
          name: 'message',
          component: Message,
          meta: {
            name: '消息管理',
            level: 2
          },
        },
        {
          path: 'group',
          name: 'group',
          component: Group,
          meta: {
            name: '群组管理',
            level: 2
          },
        },
      ],
    },
  ]
})

export default router
