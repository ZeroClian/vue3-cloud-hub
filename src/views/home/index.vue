<template>
  <div class="">
    <h1>欢迎回来{{ userStore.username }}</h1>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style scoped></style>
