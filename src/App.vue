<template>
  <div>
    <h1>nihao</h1>
    <SvgIcon name="home"></SvgIcon>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { reqLogin } from './api/user'
onMounted(() => {
  reqLogin({
    username: 'admin',
    password: '111111',
  })
})
</script>

<style scoped lang="scss"></style>
