<template>
  <el-card>
    <div class="box">
      <img :src="userStore.avatar" alt="" class="avatar" />
      <div class="bottom">
        <h3 class="title">
          {{ getTime() }}好，欢迎回来：{{ userStore.username }}
        </h3>
        <p class="subTitle">Cloud-Hub</p>
      </div>
    </div>
  </el-card>
  <div class="footer">
    <svg-icon name="welcome" width="500px" height="500px"></svg-icon>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped lang="scss">
.box {
  display: flex;
  .avatar {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom {
    margin-left: 20px;
    margin-top: 20px;
    .title {
      font-size: 20px;
      font-weight: 900;
      margin-bottom: 25px;
    }
    .subTitle {
      font-style: italic;
      color: rgb(161, 181, 189);
    }
  }
}
.footer {
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
