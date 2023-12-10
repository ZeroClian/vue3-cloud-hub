<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加品牌
      </el-button>
      <el-table :data="records" border style="width: 100%; margin: 5px 0px">
        <el-table-column prop="id" label="序号" width="80" align="center" />
        <el-table-column
          prop="name"
          label="品牌名称"
          width="200"
          align="center"
        />
        <el-table-column prop="logoUrl" label="品牌LOGO" align="center">
          <template #default="{ row, $index }">
            <img :src="row.logoUrl" style="width: 100px; height: 100px" />
          </template>
        </el-table-column>
        <el-table-column prop="edit" label="操作" width="200" align="center">
          <template #default="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="($event) => updateTrademark(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="($event) => deleteTrademark(row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 50, 100, 200]"
        layout="prev, pager, next, jumper, -> , sizes, total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="title">
      <el-form
        style="width: 80%"
        :model="trademark"
        :rules="rules"
        ref="formRef"
      >
        <el-form-item label="品牌名称" label-width="100px" prop="name">
          <el-input
            placeholder="请输入品牌名称"
            v-model="trademark.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/file/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademark.logoUrl"
              :src="trademark.logoUrl"
              class="avatar"
              style="width: 200px; height: 200px"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button type="info" size="default" @click="cancel">取消</el-button>
        <el-button type="primary" size="default" @click="confirm">
          确定
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqHasTrademark,
  reqAddOrUpdateTrademark,
  reqDeleteTrademark,
} from '@/api/product/trademark'
import { ElMessage, UploadProps } from 'element-plus'
const pageNo = ref<number>(1)
const pageSize = ref<number>(5)
const total = ref<number>(0)
const records = ref()
const title = ref()
const dialogFormVisible = ref<boolean>(false)
const formRef = ref()
const trademark = reactive<any>({
  id: null,
  name: '',
  logoUrl: '',
})
onMounted(() => {
  getHasTrademark(pageNo.value, pageSize.value)
})
const getHasTrademark = async (page: number, size: number) => {
  const result = await reqHasTrademark(page, size)
  if (result.code == 200) {
    pageNo.value = result.data.current
    pageSize.value = result.data.size
    total.value = result.data.total
    records.value = result.data.records
  }
}
const handleCurrentChange = () => {
  getHasTrademark(pageNo.value, pageSize.value)
}
const handleSizeChange = () => {
  getHasTrademark(1, pageSize.value)
}
//添加，修改
const addTrademark = () => {
  title.value = '新增品牌'
  dialogFormVisible.value = true
  trademark.name = ''
  trademark.logoUrl = ''
  nextTick(() => {
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('logoUrl')
  })
}
const updateTrademark = (row: any) => {
  dialogFormVisible.value = true
  title.value = '修改品牌'
  trademark.id = row.id
  trademark.name = row.name
  trademark.logoUrl = row.logoUrl
  nextTick(() => {
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('logoUrl')
  })
}
const deleteTrademark = async (id: number) => {
  const result: any = await reqDeleteTrademark(id)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getHasTrademark(pageNo.value, pageSize.value)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
  getHasTrademark(pageNo.value, pageSize.value)
}
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqAddOrUpdateTrademark(trademark)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getHasTrademark(pageNo.value, pageSize.value)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 < 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '上传文件大小必须小于4M',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '上传文件格式务必PNG|JPG|GIF',
    })
    return false
  }
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile,
) => {
  trademark.logoUrl = response.data
  formRef.value.clearValidate('logoUrl')
}
const validatorName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称位数需大于等于两位'))
  }
}
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('Logo图片不能为空'))
  }
}
const rules = {
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  logoUrl: [{ required: true, trigger: 'blur', validator: validatorLogoUrl }],
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
