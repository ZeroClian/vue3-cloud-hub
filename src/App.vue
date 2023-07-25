<template>
  <div>
    <h1>nihao</h1>
    <SvgIcon name="home"></SvgIcon>
    <Pagination />
  </div>
</template>

<script setup lang="ts">
import request from '@/utils/request'
import { onMounted } from 'vue'
onMounted(() => {
  request({
    url: '/user/login',
    method: 'post',
    data: {
      username: 'admin',
      password: '111111',
    },
  }).then((res) => {
    console.log(res)
  })
})
</script>

<style scoped lang="scss"></style>
