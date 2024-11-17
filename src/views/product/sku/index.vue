<template>
  <div class="container">
    <!-- 图形图标的容器 -->
    <div class="top">
      <Gauge class="gauge1" :amount="60"></Gauge>
      <Gauge class="gauge3" :amount="70"></Gauge>
    </div>
    <div class="content">
      <FakePie class="pie1"></FakePie>
      <FakePie class="pie2"></FakePie>
    </div>
  </div>
</template>

<script setup lang="ts">
import Gauge from '@/components/echarts/Gauge/index.vue'
import FakePie from '@/components/echarts/FakePie/index.vue'
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  // background-color: black;
  .top {
    width: 100%;
    height: 30%;
    display: flex;
    .gauge1 {
      flex: 1;
    }
    .pie {
      flex: 1;
    }
    .gauge3 {
      flex: 1;
    }
  }
  .content {
    width: 100%;
    height: 70%;
    display: flex;
    .pie1 {
      flex: 1;
    }
    .pie2 {
      flex: 1;
    }
  }
}
</style>
