import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus组件与样式
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import 'element-plus/theme-chalk/dark/css-vars.css'
import globalComponent from '@/components'
import router from './router'
import pinia from './store'
import './permission'
import 'element-plus/dist/index.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

//获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})

//安装自定义插件
app.use(globalComponent)
//注册路由
app.use(router)
//安装仓库
app.use(pinia)
//svg插件需要配置代码
app.mount('#app')
