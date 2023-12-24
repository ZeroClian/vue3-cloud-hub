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
    <el-button type="primary" size="default" @click="addUser">
      添加角色
    </el-button>
    <el-button
      type="danger"
      size="default"
      :disabled="selectIds.length ? false : true"
      @click="deleteRoles"
    >
      批量删除
    </el-button>
    <!-- table展示用户信息 -->
    <el-table
      @selection-change="selectChange"
      :data="roleList"
      style="margin: 10px 0px"
      border
    >
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column
        label="序号"
        width="60"
        align="center"
        type="index"
        :index="indexMethod"
      ></el-table-column>
      <el-table-column
        prop="roleName"
        label="用户角色"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="300px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="User"
            @click="showPermission(row.id)"
          >
            分配权限
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="updateRole(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.roleName}？`"
            width="260px"
            @confirm="deleteRole(row.id)"
          >
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
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ roleDto.id ? '修改用户' : '新增用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="roleDto" :rules="rules" ref="formRef">
        <el-form-item label="角色名称:" prop="roleName">
          <el-input
            placeholder="请输入角色名"
            v-model="roleDto.roleName"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="saveOrUpdateRole">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-drawer v-model="drawerPermission">
    <template #header>
      <h4>分配权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="tree"
        :data="permissionData"
        show-checkbox
        node-key="id"
        default-expand-all
        :default-checked-keys="rolePermissionIds"
        :props="defaultProps"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="drawerPermission = false">取消</el-button>
        <el-button type="primary" @click="setPermission">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import {
  reqAllRoles,
  reqSaveOrUpdateRole,
  reqDeleteRoles,
  reqSetRolePermissions,
} from '@/api/acl/role'
import { reqPermissionTree, reqRolePermissions } from '@/api/acl/menu'
import { RoleDto } from '@/api/acl/role/type'
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
let searchRoleName = ref<string>('')
let total = ref<number>(0)
let roleList = ref([])
let selectIds = ref<number[]>([])
let drawer = ref<boolean>(false)
let drawerPermission = ref<boolean>(false)
let formRef = ref<any>()
let roleDto = reactive<RoleDto>({
  id: null,
  roleName: '',
})
let selectRoleId = ref<number>(0)
let tree = ref<any>()
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
const addUser = () => {
  drawer.value = true
  Object.assign(roleDto, {
    id: null,
    roleName: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
const updateRole = (row: any) => {
  drawer.value = true
  Object.assign(roleDto, JSON.parse(JSON.stringify(row)))
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
const cancelClick = () => {
  drawer.value = false
}
//添加or修改
const saveOrUpdateRole = async () => {
  const result: any = await reqSaveOrUpdateRole(roleDto)
  if (result.code == 200) {
    drawer.value = false
    roleInfo()
    ElMessage({
      type: 'success',
      message: roleDto.id ? '修改成功' : '新增成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: roleDto.id ? '修改失败' : '新增失败',
    })
  }
}

//删除
const selectChange = (value: any) => {
  selectIds.value = value.map((item) => item.id)
}
const deleteRole = (id: number) => {
  selectIds.value = [id]
  deleteRoles()
}
const deleteRoles = async () => {
  const result: any = await reqDeleteRoles(selectIds.value)
  if (result.code == 200) {
    roleInfo()
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

// 数据校验规则
const rules = {
  roleName: [
    { required: true, trigger: 'blur', min: 2, message: '用户名称至少2位' },
  ],
}
const indexMethod = (index: number) => {
  return index + 1 + (pageNo.value - 1) * pageSize.value
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
let permissionData = ref<any>({})
let rolePermissionIds = ref<number[]>([])
const showPermission = async (roleId: number) => {
  drawerPermission.value = true
  rolePermissionIds.value = []
  selectRoleId.value = roleId
  const result: any = await reqPermissionTree()
  if (result.code == 200) {
    permissionData.value = result.data
  }
  const result2: any = await reqRolePermissions(roleId)
  if (result2.code == 200) {
    rolePermissionIds.value = result2.data
  }
}
const setPermission = async () => {
  const result: any = await reqSetRolePermissions(
    selectRoleId.value,
    tree.value.getCheckedKeys(),
  )
  if (result.code == 200) {
    drawerPermission.value = false
    ElMessage({
      type: 'success',
      message: '设置成功',
    })
  }
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
