<template>
  <el-card style="height: 80px"></el-card>
  <el-card style="margin: 10px 0px">
    <el-button type="primary" size="default" icon="Plus" @click="addJobButton">
      添加任务
    </el-button>
    <!-- table展示用户信息 -->
    <el-table style="margin: 10px 0px" border :data="allJob">
      <el-table-column
        type="index"
        label="序号"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="jobName"
        label="任务名"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="jobGroup"
        label="任务组"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="jobClass"
        label="任务类"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="triggerStatus"
        label="触发器状态"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="cron"
        label="CRON"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="executeTimes"
        label="执行次数"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="lastExecuteTime"
        label="上次执行时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="nextExecuteTime"
        label="下次执行时间"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="lastExecuteStatus"
        label="上次执行状态"
        align="center"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作" width="350px" align="center">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            size="small"
            icon="VideoPause"
            @click="confirmPauseJob(row)"
          >
            暂停
          </el-button>
          <el-button
            type="primary"
            size="small"
            icon="VideoPlay"
            @click="confirmResumeJob(row)"
          >
            恢复
          </el-button>
          <el-button
            type="warning"
            size="small"
            icon="Edit"
            @click="editJob(row)"
          >
            更新
          </el-button>
          <el-popconfirm
            :title="`确定删除${row.jobName}？`"
            width="260px"
            @confirm="confirmDeleteJob(row)"
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
  </el-card>
  <!-- 抽屉结构 -->
  <el-drawer v-model="updateDrawer">
    <template #header>
      <h4>更新任务</h4>
    </template>
    <template #default>
      <el-form :model="updateJobDto" ref="formRef">
        <el-form-item label="CRON:" prop="cron">
          <el-input
            placeholder="请输入CRON表达式"
            v-model="updateJobDto.cron"
          ></el-input>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmUpdateJob">确定</el-button>
      </div>
    </template>
  </el-drawer>
  <el-dialog v-model="dialogFormVisible" title="添加任务">
    <el-form style="width: 80%" :model="addJobDto" ref="formRef">
      <el-form-item label="任务名" label-width="100px" prop="jobName">
        <el-input
          placeholder="请输入任务名"
          v-model="addJobDto.jobName"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务组" label-width="100px" prop="jobGroup">
        <el-input
          placeholder="请输入任务组"
          v-model="addJobDto.jobGroup"
        ></el-input>
      </el-form-item>
      <el-form-item label="任务类" label-width="100px" prop="jobClass">
        <el-input
          placeholder="请输入任务类"
          v-model="addJobDto.jobClass"
        ></el-input>
      </el-form-item>
      <el-form-item label="CRON" label-width="100px" prop="cron">
        <el-input placeholder="请输入CRON" v-model="addJobDto.cron"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="info" size="default" @click="cancelClick">
        取消
      </el-button>
      <el-button type="primary" size="default" @click="confirmAddJob">
        确定
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import {
  reqAllJob,
  reqUpdateJob,
  reqDeleteJob,
  reqPauseJob,
  reqResumeJob,
  reqAddJob,
} from '@/api/background/schedule'
import { updateJob, Job, addJob } from '@/api/background/schedule/type'
import { ElMessage } from 'element-plus'
const formRef = ref()
let allJob = ref<any>([])
let updateDrawer = ref<boolean>(false)
const dialogFormVisible = ref<boolean>(false)
let updateJobDto = reactive<updateJob>({
  jobName: '',
  jobGroup: '',
  cron: '',
})
let addJobDto = reactive<addJob>({
  jobName: '',
  jobGroup: '',
  cron: '',
  jobClass: '',
})
let job = reactive<Job>({
  jobName: '',
  jobGroup: '',
})
onMounted(() => {
  getAllJob()
})
const getAllJob = async () => {
  const result: any = await reqAllJob()
  if (result.code == 200) {
    allJob.value = result.data
  }
}
const addJobButton = () => {
  dialogFormVisible.value = true
  Object.assign(addJobDto, {
    jobName: '',
    jobGroup: '',
    cron: '',
    jobClass: '',
  })
  nextTick(() => {
    formRef.value.clearValidate('jobName')
    formRef.value.clearValidate('jobGroup')
    formRef.value.clearValidate('cron')
    formRef.value.clearValidate('jobClass')
  })
}
const confirmAddJob = async () => {
  let result: any = await reqAddJob(addJobDto)
  if (result.code == 200) {
    dialogFormVisible.value = false
    ElMessage({
      type: 'success',
      message: '操作成功',
    })
    getAllJob()
  } else {
    ElMessage({
      type: 'error',
      message: '操作失败',
    })
  }
}
const editJob = async (row: any) => {
  updateDrawer.value = true
  Object.assign(updateJobDto, JSON.parse(JSON.stringify(row)))
}

const confirmUpdateJob = async () => {
  let result: any = await reqUpdateJob(updateJobDto)
  if (result.code == 200) {
    updateDrawer.value = false
    ElMessage({
      type: 'success',
      message: '更新成功',
    })
    getAllJob()
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '失败',
    })
  }
}
const confirmDeleteJob = async (row: any) => {
  job.jobName = row.jobName
  job.jobGroup = row.jobGroup
  let result: any = await reqDeleteJob(job)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAllJob()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
const confirmPauseJob = async (row: any) => {
  job.jobName = row.jobName
  job.jobGroup = row.jobGroup
  let result: any = await reqPauseJob(job)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '暂停成功',
    })
    getAllJob()
  } else {
    ElMessage({
      type: 'error',
      message: '暂停失败',
    })
  }
}
const confirmResumeJob = async (row: any) => {
  job.jobName = row.jobName
  job.jobGroup = row.jobGroup
  let result: any = await reqResumeJob(job)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '恢复成功',
    })
    getAllJob()
  } else {
    ElMessage({
      type: 'error',
      message: '恢复失败',
    })
  }
}
const cancelClick = () => {
  updateDrawer.value = false
  dialogFormVisible.value = false
}
</script>

<style scoped></style>
