<template>
  <div>
    <Category :scene="scene" />
    <el-card style="margin: 10px 0px">
      <div v-show="scene == 0">
        <el-button
          type="primary"
          size="default"
          icon="Plus"
          :disabled="!categoryStore.c3Id"
          @click="addAttr"
          v-has="`btn.Attr.add`"
        >
          添加属性
        </el-button>
        <el-table border style="margin: 10px 0px" :data="attrList">
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="name"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, index }">
              <el-tag
                style="margin: 5px"
                v-for="(item, $index) in row.attrValueList"
                :key="item.id"
              >
                {{ item.name }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row, $index }">
              <el-button
                type="warning"
                size="small"
                icon="Edit"
                @click="udpateAttr(row)"
                v-has="`btn.Attr.update`"
              ></el-button>
              <el-popconfirm :title="`确定删除?`" @confirm="deleteById(row.id)">
                <template #reference>
                  <el-button
                    type="danger"
                    size="small"
                    icon="Delete"
                    v-has="`btn.Attr.del`"
                  ></el-button>
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="scene == 1">
        <el-form inline="true">
          <el-form-item label="属性名称">
            <el-input
              v-model="attrParams.attrName"
              placeholder="请输入属性名称"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          :disabled="attrParams.attrName ? false : true"
          type="primary"
          size="default"
          icon="Plus"
          @click="addAttrValue"
        >
          添加属性
        </el-button>
        <el-button type="info" size="small" icon="Refresh"></el-button>
        <el-table
          border
          style="margin: 10px 0px"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            width="80px"
            type="index"
            align="center"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc: any) => (inputArr[$index] = vc)"
                v-if="row.flag"
                v-model="row.name"
                placeholder="请输入属性值名称"
                @blur="toLook(row, $index)"
              ></el-input>
              <div v-else @click="toEdit(row, $index)">{{ row.name }}</div>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="($event) => attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          size="default"
          @click="saveOrUpdate"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="danger" size="default" @click="cancel">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from 'vue'
import {
  reqAttrList,
  reqAddOrUpdateAttr,
  reqDeleteAttr,
} from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
const attrList = ref<any>([])
let scene = ref<number>(0)
let inputArr = ref<any>([])
let attrParams = reactive({
  categoryId: '',
  id: '',
  attrName: '',
  attrValueList: ref<any>([]),
})
watch(
  () => categoryStore.c3Id,
  () => {
    getAttr()
  },
)

const getAttr = async () => {
  attrList.value = []
  scene.value = 0
  if (!categoryStore.c3Id) return
  const result: any = await reqAttrList(categoryStore.c3Id)
  if (result.code == 200) {
    attrList.value = result.data
  }
}

const addAttr = () => {
  Object.assign(attrParams, {
    categoryId: categoryStore.c3Id,
    id: '',
    attrName: '',
    attrValueList: [],
  })
  scene.value = 1
}
const addAttrValue = () => {
  attrParams.attrValueList.push({
    id: '',
    name: '',
    flag: true,
  })
  nextTick(() => {
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
const udpateAttr = (row: any) => {
  scene.value = 1
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
  attrParams.attrName = row.name
}
const cancel = () => {
  scene.value = 0
}
const toLook = (row: any, $index: number) => {
  if (row.name.trim() == '') {
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.name === row.name
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false
}
const toEdit = (row: any, $index: number) => {
  row.flag = true
  nextTick(() => {
    inputArr.value[$index].focus()
  })
}

const saveOrUpdate = async () => {
  const result: any = await reqAddOrUpdateAttr(attrParams)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
const deleteById = async (attrId: any) => {
  const result: any = await reqDeleteAttr(attrId)
  if (result.code == 200) {
    scene.value = 0
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getAttr()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

onBeforeUnmount(() => {
  //清空仓库的数据
  categoryStore.$reset()
})
</script>

<style scoped></style>
