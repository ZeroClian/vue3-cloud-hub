<template>
  <div class="box">
    <!-- 图形图标的容器 -->
    <div class="charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let charts = ref()
const props = defineProps(['amount'])
onMounted(() => {
  let mychats = echarts.init(charts.value)
  let option = {
    series: [
      {
        type: 'gauge',
        axisLine: {
          lineStyle: {
            width: 10,
            color: [
              [0.3, '#67e0e3'],
              [0.7, '#37a2da'],
              [1, '#fd666d'],
            ],
          },
        },
        pointer: {
          itemStyle: {
            color: 'auto',
          },
        },
        axisTick: {
          distance: -10,
          length: 5,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        splitLine: {
          distance: -10,
          length: 10,
          lineStyle: {
            color: '#fff',
            width: 2,
          },
        },
        axisLabel: {
          color: 'inherit',
          distance: 10,
          fontSize: 12,
        },
        detail: {
          valueAnimation: true,
          formatter: '开销已达预算{value}%',
          color: 'inherit',
          fontSize: 12,
        },
        data: [
          {
            value: `${props.amount}`,
          },
        ],
      },
    ],
  }
  mychats.setOption(option)
})
</script>

<style scoped lang="scss">
.box {
  .charts {
    height: 100%;
    width: 100%;
  }
}
</style>
