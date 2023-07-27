//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm } from '@/api/user/type'
const useUserStore = defineStore('User', {
  //存储数据
  state: () => {
    return {
      token: localStorage.getItem('TOKEN'), //用户唯一标识
    }
  },
  //逻辑
  actions: {
    async userLogin(data: loginForm) {
      const result: any = await reqLogin(data)
      if (result.code == 200) {
        //本地持久化
        localStorage.setItem('TOKEN', result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.data.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
