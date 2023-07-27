import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus组件与样式
import ElementPlus from 'element-plus'
//@ts-expect-error忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import globalComponent from '@/components'
import router from './router'
import pinia from './store'
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
