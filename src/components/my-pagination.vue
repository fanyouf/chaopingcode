<template>
  <el-pagination
    :current-page="modelValue.pageIndex"
    :page-size="modelValue.pageSize"
    :page-sizes="[20, 30, 50, 100]"
    background
    layout="total, sizes, prev, pager, next, jumper"
    :total="modelValue.total"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script setup lang="ts">
  const props = defineProps<{
    modelValue: {
      total: number
      pageSize: number
      pageIndex: number
    }
    fetchData: () => Promise<object>
  }>()
  const emit = defineEmits(['update:modelValue'])

  const handleSizeChange = (val: number) => {
    const d = { ...props.modelValue, pageSize: val }
    emit('update:modelValue', d)
    setTimeout(() => {
      props.fetchData()
    })
  }
  const handleCurrentChange = (val: number) => {
    const d = { ...props.modelValue, pageIndex: val }

    emit('update:modelValue', d)

    setTimeout(() => {
      props.fetchData()
    })
  }
</script>
