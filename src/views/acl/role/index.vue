<template>
  <el-card style="height: 80px">
    <el-form inline="true" class="form">
      <el-form-item label="角色名:">
        <el-input placeholder="请输入用户名" v-model="searchRoleName">
          {{ searchRoleName }}
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="roleInfo">
          搜索
        </el-button>
        <el-button type="info" size="default" @click="clearValue">
          重置
        </el-button>
      </el-form-item>
    </el-form>
  </el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default">添加角色</el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIds.length ? false : true"
    >
      批量删除
    </el-button>
    <!-- table展示用户信息 -->
    <el-table :data="roleList" style="margin: 10px 0px" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button type="primary" size="small" icon="User">
            分配角色
          </el-button>
          <el-button type="warning" size="small" icon="Edit">编辑</el-button>
          <el-popconfirm :title="`确定删除${row.roleName}？`" width="260px">
            <template #reference>
              <el-button type="danger" size="small" icon="Delete">
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[5, 10, 30, 50]"
      :background="true"
      layout="prev, pager, next, jumper, -> ,total, sizes"
      :total="total"
      @size-change="roleInfo()"
      @current-change="roleInfo()"
    />
  </el-card>
  <!-- 抽屉结构 -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { reqAllRoles } from '@/api/acl/role'
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
let searchRoleName = ref<string>('')
let total = ref<number>(0)
let roleList = ref([])
let selectIds = ref<number[]>([])
onMounted(() => {
  roleInfo()
})
const clearValue = () => {
  searchRoleName.value = ''
  roleInfo()
}
const roleInfo = async () => {
  const result: any = await reqAllRoles(
    pageNo.value,
    pageSize.value,
    searchRoleName.value,
  )
  if (result.code == 200) {
    roleList.value = result.data.data
    total.value = result.data.total
  }
}

// 数据校验规则
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
