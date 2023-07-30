<template>
  <el-icon style="margin-right: 10px" @click="changeIcon">
    <component :is="useLayOutSetting.fold ? 'Fold' : 'Expand'"></component>
  </el-icon>
  <el-breadcrumb separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="(item, index) in $router.matched"
      :key="index"
      v-show="item.meta.title"
      :to="item.path"
    >
      <el-icon>
        <component :is="item.meta.icon"></component>
      </el-icon>
      <span>{{ item.meta.title }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
let useLayOutSetting = useLayOutSettingStore()
let $router = useRoute()
//用于控制图标切换
const changeIcon = () => {
  useLayOutSetting.fold = !useLayOutSetting.fold
}
</script>
<script lang="ts">
export default {
  name: 'Breadcrumb',
}
</script>

<style scoped></style>
