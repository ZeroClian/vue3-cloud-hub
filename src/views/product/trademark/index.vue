<template>
  <el-card class="box-card">
    <el-button type="primary" size="default" icon="Plus">添加品牌</el-button>
    <el-table :data="records" border style="width: 100%; margin: 5px 0px">
      <el-table-column prop="id" label="序号" width="80" align="center" />
      <el-table-column
        prop="name"
        label="品牌名称"
        width="200"
        align="center"
      />
      <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
        <template #default="{ row }">
          <img :src="row.logoUrl" style="width: 100px; height: 100px" />
        </template>
      </el-table-column>
      <el-table-column prop="edit" label="操作" width="200" align="center">
        <template #default="{}">
          <el-button type="warning" size="small" icon="Edit"></el-button>
          <el-button type="danger" size="small" icon="Delete"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 50, 100, 200]"
      :background="background"
      layout="prev, pager, next, jumper, -> , sizes, total"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqHasTrademark } from '@/api/product/trademark'
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const records = ref()
onMounted(() => {
  getHasTrademark(pageNo.value, pageSize.value)
})
const getHasTrademark = async () => {
  const result = await reqHasTrademark(pageNo.value, pageSize.value)
  if (result.code == 200) {
    pageNo.value = result.data.pages
    pageSize.value = result.data.size
    total.value = result.data.total
    records.value = result.data.records
  }
}
</script>

<style scoped></style>
