<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column label="属性名称" width="180">
        <template #default="scope">
          <el-input v-model="scope.row.key" />
        </template>
      </el-table-column>
      <el-table-column label="属性值" width="300">
        <template #default="scope">
          <el-input v-model="scope.row.value" />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="danger" @click="hDel(scope.$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-button type="success" @click="hAdd">+</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const tableData = ref([
    {
      key: '年份',
      value: '2023',
    },
    {
      key: '年份',
      value: '2023',
    },
  ])

  const hAdd = () => {
    tableData.value.push({
      key: '',
      value: '',
    })
  }

  const hDel = (index) => {
    tableData.value.splice(index, 1)
  }
</script>

<style></style>
