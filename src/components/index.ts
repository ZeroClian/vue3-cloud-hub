import SvgIcon from './SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
const components: { [name: string]: Component } = { SvgIcon, Pagination }
//对外暴露插件对象
export default {
  install(app: App) {
    Object.keys(components).forEach((key: string) => {
      app.component(key, components[key])
    })
  },
}
