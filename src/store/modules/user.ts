//创建用户相关的小仓库
import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { UserState } from './types/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routes'
import {
  loginFormData,
  loginResponseData,
  userInfoResponseData,
} from '@/api/user/type'
const useUserStore = defineStore('User', {
  //存储数据
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRoute, //仓库存储需要生成菜单的路由数组
      avatar: '',
      username: '',
    }
  },
  //逻辑
  actions: {
    async userLogin(data: loginFormData) {
      const result: loginResponseData = await reqLogin(data)
      if (result.code == 200) {
        //本地持久化
        this.token = result.data.token
        SET_TOKEN(result.data.token)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userInfo() {
      const result: userInfoResponseData = await reqUserInfo()
      if (result.code == 200) {
        //本地持久化
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    async userLogout() {
      const result: any = await reqLogout()
      if (result.code == 200) {
        //退出登陆API，后续补充
        this.token = ''
        this.username = ''
        this.avatar = ''
        REMOVE_TOKEN()
        return 'ok'
      } else {
        this.token = ''
        REMOVE_TOKEN()
        return Promise.reject(new Error(result.message))
      }
    },
  },
  getters: {},
})

export default useUserStore
