import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from './store/modules/user'
import pinia from './store'
import setting from './setting'
nprogress.configure({ showSpinner: false })
const userStore = useUserStore(pinia)

//全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  // to and from are both rout e objects. must call `next`.
  document.title = `${setting.title}-${to.meta.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    //用户登陆的判断
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      //成功获取用户信息才能继续访问
      if (username) {
        next()
      } else {
        try {
          await userStore.userInfo()
          next({ ...to })
        } catch (error) {
          await userStore.userLogout()
          // next({ path: '/login', query: { redirect: to.path } })
          next({ path: '/login' })
        }
      }
    }
  } else {
    //用户未登陆的判断
    if (to.path == '/login') {
      next()
    } else {
      // next({ path: '/login', query: { redirect: to.path } })
      next({ path: '/login' })
    }
  }
})
//全局后置守卫
router.afterEach((to: any, from: any) => {
  // to and from are both route objects.
  nprogress.done()
})
