<template>
  <el-card>
    <el-form inline="true">
      <el-form-item label="一级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          placeholder="请选择"
          v-model="categoryStore.c1Id"
          @change="category(2)"
        >
          <el-option
            v-for="(c1, index) in categoryStore.c1Arr"
            :label="c1.name"
            :key="c1.id"
            :value="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          placeholder="请选择"
          v-model="categoryStore.c2Id"
          @change="category(3)"
        >
          <el-option
            v-for="(c2, index) in categoryStore.c2Arr"
            :label="c2.name"
            :key="c2.id"
            :value="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select
          :disabled="scene == 0 ? false : true"
          placeholder="请选择"
          v-model="categoryStore.c3Id"
        >
          <el-option
            v-for="(c3, index) in categoryStore.c3Arr"
            :label="c3.name"
            :key="c3.id"
            :value="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'
let categoryStore = useCategoryStore()
onMounted(() => {
  category(1)
})
const category = (level: number) => {
  switch (level) {
    case 1:
      categoryStore.c1Id = ''
      categoryStore.c2Arr = []
      categoryStore.c2Id = ''
      categoryStore.c3Arr = []
      categoryStore.c3Id = ''
      break
    case 2:
      categoryStore.c2Id = ''
      categoryStore.c3Arr = []
      categoryStore.c3Id = ''
      break
    case 3:
      categoryStore.c3Id = ''
      break
    default:
      break
  }
  categoryStore.category(level)
}

defineProps(['scene'])
</script>

<style scoped></style>
