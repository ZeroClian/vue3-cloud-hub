import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: (): any => {
    return {
      fold: false, //用户控制菜单折叠还是收起
      refresh: false, //用户控制刷新
    }
  },
  actions: {},
  getters: {},
})

export default useLayOutSettingStore
