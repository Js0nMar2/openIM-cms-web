import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/main.css'
import * as auth from '@/assets/auth/auth'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(ElementPlus)
app.use(router)

app.mount('#application')

for (const [key, component] of Object.entries(ElementPlusIconsVue!)) {
  app.component(key, component)
}
//判断是否登录
router.beforeEach(function (to, from, next) {
  if (to.meta.auth) {
    //从localstorage中获取用户信息，判断是否已登录
    if (auth.getStorageObj(auth.ADMIN_INFO).token) {
      next(); //表示已经登录
    } else {
      //未登录
        next({ name: 'login' })
    }
  } else {
    //表示不需要登录
    next();
  }
});