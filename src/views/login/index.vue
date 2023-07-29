<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form
          class="login_form"
          :model="loginForm"
          :rules="rules"
          ref="loginForms"
        >
          <h1>Hello</h1>
          <h2>欢迎来到 Cloud Hub</h2>
          <el-form-item prop="username">
            <el-input
              placeholder="用户名"
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="密码"
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password="true"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
              :loading="loading"
            >
              登陆
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'

let useStore = useUserStore()
let $router = useRouter()
let loading = ref(false)
let loginForm = reactive({
  username: 'admin',
  password: '111111',
})
let loginForms = ref()
const login = async () => {
  await loginForms.value.validate()
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    $router.push('/')
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: 'Hello，' + getTime() + '好',
    })
    loading.value = false
  } catch (error: any) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: error.message,
    })
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (/^[a-zA-Z0-9]\w{5,17}$/.test(value)) {
    callback()
  } else {
    callback('密码只能由字母，数字，下划线“_”组成')
  }
}
//表单校验的配置对象
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      min: 6,
      message: '密码长度至少6位',
      trigger: 'change',
    },
    {
      validator: validatorPassword,
      trigger: 'change',
    },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}
.login_form {
  width: 80%;
  top: 30vh;
  position: relative;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  h1 {
    color: white;
    font-size: 40px;
  }
  h2 {
    color: white;
    font-size: 20px;
    margin: 20px 0px;
  }
  .login_btn {
    width: 100%;
  }
}
</style>
