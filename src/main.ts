import { createApp } from 'vue'
import App from '@/App.vue'
//引入element-plus组件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//@ts-ignore忽略当前文件ts类型的检测否则有红色提示(打包会失败)
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//获取应用实例对象
const app = createApp(App)
app.use(ElementPlus, {
  locale: zhCn,
})
import 'virtual:svg-icons-register'
import globalComponent from '@/components'
app.use(globalComponent)
//svg插件需要配置代码
app.mount('#app')
