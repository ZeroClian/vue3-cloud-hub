import { defineStore } from 'pinia'
import { reqCategoryList } from '@/api/product/attr'
const userCategoryStore = defineStore('Category', {
  state: () => {
    return {
      c1Arr: [],
      c2Arr: [],
      c3Arr: [],
      c1Id: '',
      c2Id: '',
      c3Id: '',
    }
  },
  actions: {
    async category(level: number) {
      let result
      switch (level) {
        case 1:
          result = await reqCategoryList(0)
          if (result.code == 200) {
            this.c1Arr = result.data
          }
          break
        case 2:
          result = await reqCategoryList(this.c1Id)
          if (result.code == 200) {
            this.c2Arr = result.data
          }
          break
        case 3:
          result = await reqCategoryList(this.c2Id)
          if (result.code == 200) {
            this.c3Arr = result.data
          }
          break
        default:
          break
      }
    },
  },
  getters: {},
})

export default userCategoryStore
