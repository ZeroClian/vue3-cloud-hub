<template>
  <el-card style="height: 80px">
    <el-form inline="true" class="form">
      <el-form-item label="用户名:">
        <el-input placeholder="请输入用户名" v-model="name">
          {{ name }}
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="userInfo">
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
      添加用户
    </el-button>
    <el-button type="danger" size="default">批量删除</el-button>
    <!-- table展示用户信息 -->
    <el-table :data="userList" style="margin: 10px 0px" border>
      <el-table-column type="selection" align="center"></el-table-column>
      <el-table-column type="index" label="#" align="center"></el-table-column>
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column
        prop="username"
        label="用户账号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="name"
        label="用户名称"
        align="center"
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
          <el-button type="primary" size="small" icon="User">
            分配角色
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="editUser(row)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="Delete"
            @click="deleteUser(row.id)"
          >
            删除
          </el-button>
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
      @size-change="userInfo()"
      @current-change="userInfo()"
    />
  </el-card>
  <!-- 抽屉结构 -->
  <el-drawer v-model="drawer">
    <template #header>
      <h4>{{ userDto.id ? '修改用户' : '新增用户' }}</h4>
    </template>
    <template #default>
      <el-form :model="userDto" :rules="rules" ref="formRef">
        <el-form-item label="用户账号:" prop="username">
          <el-input
            placeholder="请输入登录账号"
            v-model="userDto.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户名称:" prop="name">
          <el-input
            placeholder="请输入用户名"
            v-model="userDto.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户密码:" prop="password" v-if="!userDto.id">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="userDto.password"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确定</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { reqUserList, reqSaveOrUpdateUser, reqDeleteUser } from '@/api/acl/user'
import { UserDto } from '@/api/acl/user/type.ts'
import { ElMessage } from 'element-plus'
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
let total = ref<number>(0)
let userList = ref([])
let drawer = ref<boolean>(false)
let buttonTitle = ref<string>('')
let userDto = reactive<UserDto>({
  id: 0,
  username: '',
  name: '',
  password: '',
})
let name = ref<string>('')
let formRef = ref<any>()
onMounted(() => {
  userInfo()
})
const clearValue = () => {
  name.value = ''
}
const userInfo = async () => {
  const result: any = await reqUserList(
    pageNo.value,
    pageSize.value,
    name.value,
  )
  if (result.code == 200) {
    userList.value = result.data.data
    total.value = result.data.total
  }
}
const addUser = () => {
  drawer.value = true
  buttonTitle.value = '添加'
  Object.assign(userDto, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
const editUser = (row: any) => {
  drawer.value = true
  buttonTitle.value = '修改'
  Object.assign(userDto, JSON.parse(JSON.stringify(row)))
}
const cancelClick = () => {
  drawer.value = false
}
const confirmClick = async () => {
  await formRef.value.validate()
  let result: any = await reqSaveOrUpdateUser(userDto)
  if (result.code == 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userDto.id ? '更新成功' : '添加成功',
    })
    userInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '失败',
    })
  }
}
const deleteUser = async (id: number) => {
  let result: any = await reqDeleteUser(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    userInfo()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
// 数据校验规则
const validatorPassword = (_rule: any, value: any, callback: any) => {
  if (/^[a-zA-Z0-9]\w{5,17}$/.test(value)) {
    callback()
  } else {
    callback('密码只能由字母，数字，下划线“_”组成')
  }
}
const rules = {
  username: [
    { required: true, trigger: 'blur', min: 5, message: '用户账号至少5位' },
  ],
  name: [
    { required: true, trigger: 'blur', min: 5, message: '用户名称至少5位' },
  ],
  password: [
    { required: true, min: 6, message: '密码长度至少6位', trigger: 'blur' },
    { trigger: 'blur', validator: validatorPassword },
  ],
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
