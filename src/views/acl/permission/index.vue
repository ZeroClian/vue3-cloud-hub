<template>
  <el-table
    :data="permissionData"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    default-expanded-keys="[2]"
    border
  >
    <el-table-column prop="name" label="名称" sortable />
    <el-table-column prop="code" label="权限值" sortable />
    <el-table-column label="操作" sortable>
      <template #="{ row, $index }">
        <el-button
          type="primary"
          size="small"
          icon="Plus"
          :disabled="row.level == 4 ? true : false"
          @click="addMenu(row)"
          v-has="`btn.Permission.add`"
        >
          {{ row.level == 3 ? '添加功能' : '添加菜单' }}
        </el-button>
        <el-button
          type="warning"
          size="small"
          icon="Edit"
          :disabled="row.level == 1 ? true : false"
          @click="editMenu(row)"
          v-has="`btn.Permission.update`"
        >
          编辑
        </el-button>
        <el-button
          type="danger"
          size="small"
          icon="Delete"
          :disabled="row.level == 1 ? true : false"
          @click="deletePermission(row.id)"
          v-has="`btn.Permission.del`"
        >
          删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加/修改菜单 -->
  <el-dialog
    v-model="dialogVisible"
    :title="menuData.id ? '更新' : '添加'"
    width="30%"
  >
    <el-form label-position="right" label-width="80px">
      <el-form-item label="名称">
        <el-input
          v-model="menuData.name"
          placeholder="请输入菜单名称"
          style="width: 90%"
        ></el-input>
      </el-form-item>
      <el-form-item label="权限值">
        <el-input
          v-model="menuData.code"
          placeholder="请输入权限值"
          style="width: 90%"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="saveOrUpdatePermission">
          确定
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import {
  reqPermissionTree,
  reqSaveOrUpdatePermission,
  reqDeletePermission,
} from '@/api/acl/menu'
import { ElMessage } from 'element-plus'
let permissionData = ref<any>([])
let dialogVisible = ref<boolean>(false)
let menuData = reactive<any>({
  id: null,
  name: '',
  code: '',
  pid: null,
})
onMounted(() => {
  getPermission()
})
//获取菜单
const getPermission = async () => {
  let result: any = await reqPermissionTree()
  if (result.code == 200) {
    permissionData.value = result.data
  }
}
const addMenu = (row: any) => {
  dialogVisible.value = true
  menuData.level = row.level + 1
  menuData.pid = row.id
  menuData.name = ''
  menuData.code = ''
  menuData.id = null
}
const editMenu = (row: any) => {
  dialogVisible.value = true
  Object.assign(menuData, JSON.parse(JSON.stringify(row)))
}
//添加/编辑菜单
const saveOrUpdatePermission = async () => {
  let result: any = await reqSaveOrUpdatePermission(menuData)
  if (result.code == 200) {
    dialogVisible.value = false
    getPermission()
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '添加失败',
    })
  }
}
const deletePermission = async (id: number) => {
  let result: any = await reqDeletePermission(id)
  if (result.code == 200) {
    getPermission()
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
</script>

<style scoped></style>
