<template>
  <el-card style="height: 80px">
    <el-form inline="true" class="form">
      <el-form-item label="关键字:">
        <el-input placeholder="请输入用户名" v-model="key">
          {{ key }}
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="search">
          搜索
        </el-button>
        <el-button type="info" size="default" @click="clearValue">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>

  <div v-for="data in dataList" :key="data.id">
    <el-card style="margin: 10px 0px">
      <el-text class="mx-1">{{ data.answer }}</el-text>
      <el-divider />
      <el-text style="white-space: pre-line">{{ data.question }}</el-text>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { reqSearchData } from '@/api/exam/search'
let key = ref<string>('')
let dataList = ref<any>([])
const search = async () => {
  let result: any = await reqSearchData(key.value)
  if (result.code == 200) {
    dataList.value = result.data
  }
}
const clearValue = () => {
  key.value = ''
  dataList.value = []
}
</script>

<style scoped></style>
