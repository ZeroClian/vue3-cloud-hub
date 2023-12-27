<template>
  <div>
    <el-card class="box-card">
      <el-button
        type="primary"
        size="default"
        icon="Plus"
        @click="addTrademark"
      >
        添加题目
      </el-button>
      <el-table :data="questions" border style="width: 100%; margin: 5px 0px">
        <el-table-column prop="id" label="序号" width="80" align="center" />
        <el-table-column
          prop="answer"
          label="答案"
          width="200"
          align="center"
        ></el-table-column>
        <el-table-column prop="question" label="题目"></el-table-column>
        <el-table-column prop="edit" label="操作" width="200" align="center">
          <template #default="{ row, $index }">
            <el-button
              type="warning"
              size="small"
              icon="Edit"
              @click="($event) => updateBank(row)"
            ></el-button>
            <el-button
              type="danger"
              size="small"
              icon="Delete"
              @click="($event) => deleteBank(row.id)"
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
      <el-form style="width: 80%" :model="bank" :rules="rules" ref="formRef">
        <el-form-item label="答案" label-width="100px" prop="answer">
          <el-input placeholder="请输入答案" v-model="bank.answer"></el-input>
        </el-form-item>
        <el-form-item label="题目" label-width="100px" prop="question">
          <el-input
            :autosize="{ minRows: 4, maxRows: 10 }"
            type="textarea"
            placeholder="请输入题目"
            v-model="bank.question"
          ></el-input>
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
  reqSaveOrUpdateQuestion,
  reqPageQuestion,
  reqDeleteQuestion,
} from '@/api/exam/bank'
import { ElMessage } from 'element-plus'
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const total = ref<number>(0)
const questions = ref()
const title = ref()
const dialogFormVisible = ref<boolean>(false)
const formRef = ref()
const bank = reactive<any>({
  id: null,
  answer: '',
  question: '',
})
onMounted(() => {
  getPage(pageNo.value, pageSize.value)
})
const getPage = async (page: number, size: number) => {
  const result = await reqPageQuestion(page, size)
  if (result.code == 200) {
    pageNo.value = result.data.pageNo
    pageSize.value = result.data.pageSize
    total.value = result.data.total
    questions.value = result.data.data
  }
}
const handleCurrentChange = () => {
  getPage(pageNo.value, pageSize.value)
}
const handleSizeChange = () => {
  getPage(1, pageSize.value)
}
//添加，修改
const addTrademark = () => {
  title.value = '新增题目'
  dialogFormVisible.value = true
  Object.assign(bank, {
    id: null,
    answer: '',
    question: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('answer')
    formRef.value.clearValidate('question')
  })
}
const updateBank = (row: any) => {
  dialogFormVisible.value = true
  title.value = '修改题目'
  bank.id = row.id
  bank.answer = row.answer
  bank.question = row.question
  nextTick(() => {
    formRef.value.clearValidate('answer')
    formRef.value.clearValidate('question')
  })
}
const deleteBank = async (id: number) => {
  const result: any = await reqDeleteQuestion(id)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getPage(pageNo.value, pageSize.value)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
  getPage(pageNo.value, pageSize.value)
}
const cancel = () => {
  dialogFormVisible.value = false
}
const confirm = async () => {
  await formRef.value.validate()
  let result: any = await reqSaveOrUpdateQuestion(bank)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getPage(pageNo.value, pageSize.value)
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
}

const validatorAnswer = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('答案不能为空'))
  }
}
const validatorQuestion = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('题目不能为空'))
  }
}
const rules = {
  answer: [{ required: true, trigger: 'blur', validator: validatorAnswer }],
  question: [{ required: true, trigger: 'blur', validator: validatorQuestion }],
}
</script>

<style></style>
