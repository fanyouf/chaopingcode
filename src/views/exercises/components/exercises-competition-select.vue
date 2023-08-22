<template>
  <el-select v-model="matchName">
    <el-option label="信息素养大赛" value="信息素养大赛" />
    <el-option label="GESP" value="GESP" />
    <el-option label="蓝桥杯" value="蓝桥杯" />
  </el-select>
  <el-table :data="cTableData" style="width: 100%">
    <el-table-column type="index" label="序号" width="60" />
    <el-table-column label="属性名称" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.key" />
      </template>
    </el-table-column>
    <el-table-column label="属性值" width="180">
      <template #default="scope">
        <el-input v-model="scope.row.value" />
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: object
  }>()
  const matchName = ref('')

  const cTableData = computed(() => {
    return tableData[matchName.value] || []
  })

  const emit = defineEmits(['update:modelValue'])

  const tableData = {
    信息素养大赛: [
      {
        key: '年份',
        value: '2023',
      },
    ],
    GESP: [
      {
        key: '年份',
        value: '2023',
      },
      {
        key: '年份',
        value: '2023',
      },
    ],
    蓝桥杯: [
      {
        key: '年份',
        value: '2023',
      },
      {
        key: '年份',
        value: '2023',
      },
    ],
  }
</script>
